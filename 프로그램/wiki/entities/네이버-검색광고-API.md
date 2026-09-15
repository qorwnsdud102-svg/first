---
type: 도구
aliases: [네이버 검색광고 API, searchad API, naver-search-ad-api]
status: growing
sources: [프로그램/raw/2026-05-22_naver-biding_journal-알짜.md, C:\claude\성과측정 대시보드\docs\superpowers\specs\2026-09-08-naver-sa-dashboard-design.md, C:\claude\성과측정 대시보드\app\naver_api.py]
updated: 2026-09-15
---

# 네이버 검색광고 API

## 한 줄 정의

네이버 검색광고의 캠페인·광고그룹·키워드·입찰가 관리 표준 RESTful API (`api.searchad.naver.com`). HMAC 인증, 부분 객체 PUT 금지가 최고 트랩.

## 핵심 주장 / 속성

- **PUT 사일런트 실패** (★ 최고 트랩) — `fields=bidAmt` 쿼리만 줘도 200+무변화. **GET → 전체 객체 수정 → PUT(전체) → GET 재검증** 필수. `useGroupBidAmt=false` 명시 안 하면 그룹 기본값 사일런트 복귀.
- **status readonly, userLock 토글** — 모든 level `fields=userLock&body[userLock]=bool` 만 받음. 다른 값 400 "유효한 fields userLock/budget/period".
- **statusReason 별도 캐싱** — status (ELIGIBLE/PAUSED) 외 reason (NORMAL/PAUSED/CAMPAIGN_PAUSED/EXPENDED_BUDGET/NO_BIZ_CHANNEL 등) 응답에 같이 있음. "자의 OFF vs 네이버 제한" 구분 필요하면 무조건 같이 저장.
- **HMAC 인증** — 헤더 4개 `X-Timestamp`/`X-API-KEY`/`X-Customer`/`X-Signature`. 시각 오차 1~2분 거절.
- **X-Customer 위임 access** — 한 key 로 다른 customer_id 자원 접근. 인증은 key 의 cid, 자원은 `X-Customer` override. 다계정 운영 시 별도 키 발급 불필요.
- **합성 ID 404 함정** — dump import 시 `kw-<agid>-<idx>` 합성 ID 모두 404 "No permission". `GET /ncc/keywords?nccAdgroupId=...` 로 실제 nccKeywordId sync.
- **PLATFORM_MIN_BID = 70원** — 70원 미만 PUT 400 `code=3904`. 광고그룹 min_bid 설정 무관 (50 설정해도 거절). 코드 가드 `max(ag.min_bid, 70)`.
- **Estimate body 스키마 분기** — `average-position-bid`: `items:[{key,position}]` (PC 1~10 / MOBILE 1~5). `performance`: root `{key, bids:[...]}` (items 아님).
- **다계정 creds resolve 헬퍼** — `request.app.state.scheduler._creds` 그대로 넘기면 `KeyError('api_key')`. `config.resolve_creds_for_customer(all, cid)` 공용 (단일/다계정 자동 분기 + X-Customer override).

## Stat Report 일별 성과 수집 (2026-09-08~15 실측 — [[네이버-SA-성과측정-툴]])

입찰가 관리(위)와 별개로 **성과를 받아오는** 면. naver-biding이 안 쓰던 부분이라 여기 새로 적는다.

- **흐름**: `POST /stat-reports {reportTp, statDt}` → `GET /stat-reports/{id}` 폴링(REGIST → RUNNING → BUILT, 2초 간격·최대 3분) → `downloadUrl` 다운로드(서명 필요, 본문에 BOM → `utf-8-sig`) → `DELETE /stat-reports/{id}`. 데이터 없는 날은 400 `code 10004` → "데이터 없음"으로 기록하고 계속.
- **TSV 형식**: 헤더 없음, 탭 구분. AD 14열(`날짜 yyyymmdd, customer_id, campaign_id, adgroup_id, keyword_id('-' 가능), ad_id, business_channel_id, media_code, device(P/M), imp, clk, cost, rank_sum, view_cnt`), AD_CONVERSION 13열(… `conv_method, conv_type, conv_cnt, conv_amt`). **매체(media_code) 7,800여 종으로 쪼개져 하루 15,000행** → `(date, keyword_id, ad_id, device)`로 합산해야 쓸 수 있다.
- **비용 단위**: Stat Report `cost` = 광고관리시스템 총비용(VAT 포함)과 일치(2026-09-08 확인) → [[실제-광고비-계수]]의 B.
- **전환은 쇼핑검색만 잡힌다.** 파워링크·파워컨텐츠는 카페·블로그를 거쳐서 180일간 전환 0 → [[NT-파라미터-매출-귀속]]으로 대체.
- **부정클릭·전환은 며칠 뒤 정산** → D-1~D-7은 항상 재수집(→ [[수집-파이프라인-안전장치]]). 백필은 **180일까지**(365일 전은 데이터 없음 응답). `/stats`는 단일 ID 일별 또는 다중 ID 합산만 되고 PC/모바일 분리는 최근 7일뿐이라 일별 추이는 DB에서 계산.
- **마스터 동기화**: 캠페인 → 광고그룹(캠페인별) → 키워드(비쇼핑) / 소재(쇼핑, `SHOPPING_PRODUCT_AD`, `referenceData.productTitle`). 계정 1개 기준 약 260회 호출, 호출 간 0.05초. 캠페인 ID 접두사 `cmp-a001-01/02/03/04` = 파워링크/쇼핑/파워컨텐츠/브랜드검색. 쇼핑은 키워드 없이 상품(소재) 단위로 성과가 잡힌다.
- **서명 시간 오차**: 응답 `Date` 헤더로 오프셋을 계산해 재시도하되 24시간을 넘는 오프셋은 무시. 네트워크·5xx·429는 지수 백오프 3회.
- **동명 광고그룹에 `-1, -2` 접미사**가 자동으로 붙는다 — 이름 매칭 시 접미사를 기본 정규화로 떼면 서로 다른 그룹이 뭉친다(정확 매칭 먼저, 접미사 제거는 폴백).

## 여러 광고 계정 — 위임 접근은 한 방향이다 (2026-09-15 실측, [[네이버-SA-성과측정-툴]])

- 우리 계정은 광고주센터에 5개(100스토어·backstore1·qorwnsdud102·비케이 두 곳)가 한 로그인(backstore1)에 묶여 있다. **API 키는 계정마다 따로이고, 위임 접근은 키를 발급한 계정 쪽에서만 된다.**
  - backstore1 키로는 `X-Customer`를 바꿔 qorwnsdud102까지 조회된다(입찰가 프로그램이 이 방식으로 운영).
  - qorwnsdud102 키로 backstore1을 조회하면 **403**. 반대 방향은 안 된다.
  - 그래서 "키 하나로 다 된다"를 가정하지 말고, 새 계정을 붙일 때 **조회 전용 요청 하나로 먼저 확인**한다(`GET /ncc/campaigns`).
- 위임 키로 계정 목록을 통째로 훑으면 **남의 계정 캠페인까지 딸려 온다**(입찰가 프로그램 2026-07-03 사고). 수집 대상 계정은 키 파일에 명시한 것만.
- **끝맺음 검증은 `/stats`로.** 다중 ID·기간 합산(`ids=…&fields=["impCnt","clkCnt","salesAmt"]&timeRange=…`) 한 번이면 계정 합계가 나온다. 새 계정 30일 수집 합계가 `/stats`와 노출·클릭·비용 모두 정확히 일치했고, 7일 창에서는 캠페인당 몇 원 차이(반올림)만 있었다. 광고주센터 화면 숫자와도 같은 크기의 차이.

## 디스플레이 광고 API는 파트너사 전용 (2026-09-15 확인)

- 검색광고 API(`api.searchad.naver.com`)에는 디스플레이(성과형 DA·카탈로그 판매)가 없다. 디스플레이 광고 API(`naver-ad-api.github.io`, OAuth Bearer, 베타)는 **공식 파트너사만 신청**할 수 있다(광고주센터 고객센터 "디스플레이광고 API는 네이버 공식 파트너사에 한해 제공됩니다"). 광고주 계정에서는 검색광고 Key만 발급된다.
- 그래서 디스플레이 비용은 광고주센터 → 디스플레이 광고 → 보고서 → 성과 보고서 → **광고비 보고서**(기간 단위 "일") CSV로 받는다. 열: 광고 계정 이름·ID·기간·통화·총비용 + 유형별(웹사이트 전환·인지도 및 트래픽·앱 전환·동영상 조회·카탈로그 판매·쇼핑 프로모션·참여 유도·ADVoost 쇼핑). 노출·클릭·전환은 없다. 총비용은 VAT 포함. → [[네이버-SA-성과측정-툴]]

## 다른 엔티티와의 관계

- [[광고주센터-비공식-API]] — 노출현황·실시간 순위는 비공식 API 로 보완. 인증 방식 다름 (쿠키 vs HMAC).
- [[다경로-데이터-모순-디버깅]] — owned_hints / status sync 사례의 무대.
- [[네이버-SA-성과측정-툴]] — Stat Report 수집기의 무대. [[수집-파이프라인-안전장치]] — 재수집 창·증거 기반 삭제. [[네이버-커머스API]] — 매출 쪽 짝(다른 플랫폼).

## 내 생각 / 미해결 질문

- (다음 자동화 도구 늘리면 채워짐)

## 출처

- `프로그램/raw/2026-05-22_naver-biding_journal-알짜.md` (naver-biding journal 2026-05-14~21)
- `성과측정 대시보드/docs/superpowers/specs/2026-09-08-naver-sa-dashboard-design.md` §2 (API 탐색 결과 2026-09-08), `app/naver_api.py`, `app/report_parser.py` — Stat Report 절.

---
type: 도구
aliases: [네이버 검색광고 API, searchad API, naver-search-ad-api]
status: growing
sources: [프로그램/raw/2026-05-22_naver-biding_journal-알짜.md]
updated: 2026-05-22
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

## 다른 엔티티와의 관계

- [[광고주센터-비공식-API]] — 노출현황·실시간 순위는 비공식 API 로 보완. 인증 방식 다름 (쿠키 vs HMAC).
- [[다경로-데이터-모순-디버깅]] — owned_hints / status sync 사례의 무대.

## 내 생각 / 미해결 질문

- (다음 자동화 도구 늘리면 채워짐)

## 출처

- `프로그램/raw/2026-05-22_naver-biding_journal-알짜.md` (naver-biding journal 2026-05-14~21)

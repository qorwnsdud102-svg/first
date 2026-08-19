---
type: 도구
aliases: [ItemScout, 아이템스카우트, api.itemscout.io, 아이템스카우트 API]
status: growing
sources: [competitor-finder/references/itemscout-api.md, 2026-08-19 실작업]
updated: 2026-08-19
---

# ItemScout API

## 한 줄 정의

네이버 데이터랩 기반 키워드 검색량·상품수를 **로그인 없이·대량으로** 주는 공개 JSON API
(`api.itemscout.io`). 데이터랩 웹 엔드포인트가 IP 차단될 때의 전수 수집 대체 소스.

## 왜 쓰나

`datalab.naver.com/shoppingInsight/getCategoryKeywordRank.naver` 를 직접 다량 호출하면 **IP 단위로
차단**된다(타임아웃/빈 응답). leaf 수백 개 × 25페이지면 금방 막힘. ItemScout 는 무인증·대량 호출에
관대하고 카테고리가 **4차(leaf)까지** 있어 전수 수집의 기본 소스로 쓴다. (2026-06-02 전환)

## 엔드포인트

헤더: `Origin: https://itemscout.io`, `Referer: https://itemscout.io/`, 일반 User-Agent.

| 용도 | 호출 | 응답 |
|---|---|---|
| 대분류 목록 | `GET /api/category/0/subcategories` | `data:[{id, level, name, category_id(네이버 cid), is_leaf}]` |
| 하위 카테고리 | `GET /api/category/{id}/subcategories` | `is_leaf==1` 이면 말단 |
| 키워드 데이터 | `POST /api/category/{id}/data` | 아래 |
| 주요 브랜드 | `GET /api/category/{id}/brands` | `data:[브랜드명...]` (대분류당 274~322개) |

요청 본문(form): `genders=f,m&ages=10,60&duration=30d`

## 응답 필드와 한계 (★ 실측)

```
data.data = { "<id>": { keyword, rank, monthly:{pc, mobile, total}, prdCnt,
                        fitPredict:{shopping}, monthAgoExt, yearAgoExt, ... } }
```

- **검색수 = `monthly.total`** — 검색광고 `keywordstool` 값과 **정확히 일치**한다
  (독도토너 10,290 = PC 1,500 + 모바일 8,790). → keywordstool 호출을 생략해도 된다.
- **경쟁강도 = `prdCnt / monthly.total`** (낮을수록 경쟁 약함). `prdCnt` 는 상품수 필터의 재료.
- **`duration` 은 `30d` 만 동작** — `90d`·`1y`·`365d`·`12m` 전부 빈 응답. 즉 **기간 비교 불가**.
- **`monthAgoExt`/`yearAgoExt` 는 값이 아니라 boolean 플래그.** 이름 때문에 "한 달 전 검색량"으로
  오해하기 쉬우나 존재 여부만 알려준다.
- 따라서 **ItemScout 만으로는 급등 판정이 불가능**하다. 시간축은 [[네이버-데이터랩-쇼핑인사이트-API]] 필요.
- 카테고리당 키워드 최대 ~500개. 검색량·상품수는 카테고리 무관 전역값이라 leaf 간 중복은 dedupe.

## yearAgoExt 를 신규 후보 사전필터로

`yearAgoExt=False` = 작년엔 없던 키워드. 데이터랩 트렌드 198개를 정답지로 대조한 결과:

- 확인된 신규(3월 이후 첫등장) **4건 전부 False — 놓침 0**
- 기존 키워드 194건 중 122건(63%)을 사전 제거 가능

→ **신규 브랜드 사냥 전용**으로 쿼터를 60% 아낀다(`surge_trend.py --ext-prefilter`).
단 "작년에도 있던 키워드의 급등" 은 못 잡으므로 급등 탐지 목적엔 쓰지 말 것.

## 규모 실측 (대분류별 leaf·키워드 수, 2026-08-19)

| 대분류 | id | 네이버 cid | leaf | 고유 키워드 |
|---|---|---|---|---|
| 화장품/미용 | 3 | 50000002 | 165 | 74,470 |
| 가구/인테리어 | 5 | 50000004 | 336 | 147,797 |
| 생활/건강 | 9 | 50000008 | 1,256 | 562,838 |

대분류 12개(패션의류~도서). **규모 편차가 7배 넘게 난다** — 수집 전에 leaf 수를 먼저 보고 하한을 정한다.
leaf 트리와 수집 결과가 캐시되므로 중단·재개가 자유롭다(`--fresh` 로만 초기화).

## 다른 엔티티와의 관계

- [[네이버-데이터랩-쇼핑인사이트-API]] — 짝. ItemScout=넓게(스냅샷), 데이터랩=깊게(시간축).
- [[네이버-검색광고-API]] — 검색수가 동일해 대체 가능. HMAC 인증 불필요한 게 ItemScout 장점.
- [[네이버-급등-신규브랜드-탐지-노하우]] — 이 소스를 쓰는 파이프라인.
- [[competitor-finder]] — `scripts/scan_itemscout.py`·`run_all_categories.py`·`filter_keywords.py`.

## 내 생각 / 미해결 질문

- **비공식 API 의존 리스크**는 남아 있다(계약 변경·차단 시 파이프라인 정지). 다만 수집한 스냅샷을
  `rawdata/` 에 보관해두면 소스가 죽어도 과거 분석은 살아남는다.
- `fitPredict.shopping`(쇼핑성 점수 0~1) 미사용 — 정보성 키워드 제거에 상품수 대신 쓸 수 있을지 미검증.

## 출처

- `competitor-finder/references/itemscout-api.md` (2026-06-02 정찰 기록)
- 2026-08-19 실작업 — duration 변형 실패·플래그 정체·검색수 일치 실측.

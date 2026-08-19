---
type: 도구
aliases: [NAVER API HUB, API HUB, naverapihub, NCP API HUB, 네이버 API 허브]
status: growing
sources: [2026-08-19 실작업(콘솔 발급·호출 성공), ncloud.com, api.ncloud-docs.com]
updated: 2026-08-19
---

# NAVER API HUB

## 한 줄 정의

네이버 개발자센터의 검색·트렌드 API 를 넘겨받은 **NCP(네이버 클라우드) 통합 API 플랫폼**.
2026-07-31 부로 이 3종은 여기서만 신규 발급된다 — 개발자센터 등록 화면에는 **선택지 자체가 없다**.

## 이관 대상 3종

- Search API (검색)
- Search Trend API (검색어 트렌드)
- Shopping Insight API (쇼핑 인사이트) → [[네이버-데이터랩-쇼핑인사이트-API]]

**제외**: 검색 API 중 `쇼핑·책·전문자료` 는 이관 없이 2026-07-31 완전 종료(대체 API 없음).
네아로(네이버 로그인) 계열은 영향 없음.

## 발급 절차

1. `ncloud.com` 회원가입 (NCP 계정 — 네이버 계정과 별개)
2. 콘솔 → Services → Application Service → **NAVER API HUB** → 이용 신청
3. **Application 등록** → 사용할 API 체크 (**하나의 키로 여러 API 동시 사용**)
4. `인증 정보` 에서 **Client ID / Client Secret** 확인
   - 헤더명이 그대로 표기됨: `X-NCP-APIGW-API-KEY-ID` / `X-NCP-APIGW-API-KEY`

개발자센터와 달리 API 별로 앱을 따로 만들 필요가 없다. 앱 하나에 검색·트렌드·쇼핑인사이트를 다 붙인다.

## 요금·한도 (2026-08 기준)

| API | 무료 구간 | 한시적 무료 | 일일 제한 |
|---|---|---|---|
| 쇼핑 인사이트 | 0~30,000건 | 30,001~50,000건 | **없음** |
| 검색어 트렌드 | 0~30,000건 | 30,001~50,000건 | **없음** |
| 검색 API | 0~775,000건 | — | 일 25,000건 |

- **"기본 무료" 와 "한시적 무료" 를 구분**할 것. 30,001~50,000 구간은 현재 0원이지만 "추후 변경될 수
  있습니다" 라 명시돼 있다 → 콘솔 `한도 및 알림 설정` 에서 **월 한도를 30,000 으로 낮춰두면** 유료
  전환 시 과금 사고가 원천 차단된다. 90% 도달 알림도 같이 켠다.
- 개발자센터의 "일 1,000콜" 족쇄가 사라진 게 실무상 가장 큰 변화 — **하루에 몰아서 소진 가능**.
- 프로모션: 2026-06-29~09-30 신규가입+이용신청 시 NCP 크레딧 20만원.

## 코드 관점 — 이관 비용은 3줄

요청 바디와 응답 스키마가 **완전히 동일**하다. 바뀌는 것은 도메인과 헤더 2개뿐.

```python
DATALAB_URL = "https://openapi.naver.com/v1/datalab/shopping/category/keywords"
APIHUB_URL  = "https://naverapihub.apigw.ntruss.com/shopping/v1/category/keywords"
# 헤더: X-Naver-Client-Id/Secret  →  X-NCP-APIGW-API-KEY-ID / X-NCP-APIGW-API-KEY
```

→ **키 존재 여부로 자동 분기**시키면 이관을 "설정 파일에 키 한 블록 추가" 로 끝낼 수 있다
(`competitor-finder/scripts/config.py` `apihub_headers()`, `surge_trend.py` `fetch_trend()`).

## 다른 엔티티와의 관계

- [[네이버-데이터랩-쇼핑인사이트-API]] — 이 허브가 제공하는 핵심 API. 엔드포인트 대조표는 그쪽에.
- [[네이버-검색광고-API]] — **이관과 무관**. 검색광고는 별도 플랫폼(HMAC 인증) 그대로.
- [[API-쿼터-경제학]] — 일일 제한 해제가 파이프라인 설계를 바꾼 사례.

## 내 생각 / 미해결 질문

- **"한시적 무료" 는 언젠가 끝난다.** 월 3만 콜(키워드 15만 개) 안에서 도는 설계를 유지할 것.
  카테고리 전수를 매달 돌리려면 대분류 2개가 한계.
- 유료 전환 시 단가가 공개되지 않았다. 종량제 시작하면 캐시 전략(재판정 공짜)의 가치가 더 커진다.

## 출처

- 2026-08-19 실작업 — 콘솔 Application 등록·인증정보 확인·실호출 200 검증, 요금표 화면.
- 개발자센터 이관 공지 메일(2026), `ncloud.com/product/applicationService/naverApiHub`.

---
type: 도구
aliases: [광고주센터 비공식 API, ads.naver.com 내부 API, impression-preview]
status: growing
sources: [프로그램/raw/2026-05-22_naver-biding_journal-알짜.md]
updated: 2026-05-22
---

# 광고주센터 비공식 API

## 한 줄 정의

광고주센터 (`ads.naver.com`) 내부 API. 공식 검색광고 API 에 없는 노출현황·실시간 순위 조회. 쿠키 인증, 호출량 제한 필수.

## 핵심 주장 / 속성

- **endpoint** — `apis/sa/api/ncc/impression-preview/power-link` (키워드별 노출 슬롯).
- **인증 쿠키** `searchad_state.json` — 사람 1회 직접 로그인 → 며칠~몇 주 재사용. HMAC X.
- **호출량 제한** — 시간당 키워드 3,000개 이내 (2026-05-19 합의, 1,000→3,000 상향). 호출 사이 2~5초 랜덤. 자기 광고만 (남의 광고 조회 금지).
- **slot_count 가변 1~3** — 파워컨텐츠 정원은 항상 2 or 3 (네이버 규격, 1·4 없음). `slot_count=1` 은 경쟁 부재 빈자리. preview slot=1 도 신뢰 가능 (편향 sample 가설 2026-05-21 기각).
- **transient 빈 array 1회 retry 패턴** — `status=200 + slot=0 + rank=None` 응답이 가끔 transient. 같은 browser context 로 2.5s 후 1회 재시도, 두 번째가 slot≥1 or rank 잡히면 사용 + `retry_recovered=True` 플래그. cycle 이 `SystemLog INFO category=api_glitch` 기록 → 빈도 모니터.
- **preview ↔ 실제 검색 어긋남** (허리보호대 케이스 2026-05-21) — preview 는 입찰 후보 광고 전부 보여줌. 실제 검색 시점엔 입찰 부족 / 검수 / 타게팅 / OFF / 예산 으로 빠질 수 있음. ground truth 는 [[네이버-검색결과-크롤링]].
- **cascading region dropdown 데이터 추출 불가** — 사내 API 또는 서비스워커 캐시. JS bundle 검색 (`도곡동`/`09680118`) 매칭 X. 사용자가 dev tools 에서 power-link URL 의 `regionalCode=` 1회 캡처.

## 다른 엔티티와의 관계

- [[네이버-검색광고-API]] — 공식과 상보. 입찰가 변경은 공식, 노출 확인은 비공식.
- [[네이버-검색결과-크롤링]] — preview 거짓 정원·실제 어긋남 검증용.

## 내 생각 / 미해결 질문

- transient 빈 array 빈도 — `api_glitch` 로그 며칠 모이면 패턴 파악 가능.
- 파워컨텐츠 slot_count 거짓 정원 — 1주 1회 search_crawl batch 검증 spec 진행 중.

## 출처

- `프로그램/raw/2026-05-22_naver-biding_journal-알짜.md`

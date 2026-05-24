---
source_url: file:///C:/naver-biding/journal.md
fetched: 2026-05-22
type: conversation
---

# 2026-05-22 naver-biding journal 알짜 (정제 스냅샷)

> 정제 일자: 2026-05-22. 원본 `C:\naver-biding\journal.md` 에서 A (네이버 platform truth) + B (엔지니어링 메타 패턴) 카테고리만 추출. C (일반 기술 트랩 chart.js·FastAPI 일반) 와 project-specific decider 디테일은 제외. 원문 그대로, 시간 역순.

---

## 2026-05-21 (밤 ③) — preview API: 파워컨텐츠 slot_count 검증

### 🧠 preview API 는 가변 반환 (1~3) — "무조건 3" 가설 기각
- 사용자가 "허리보호대" 검색 → 실제 광고 카드 2개. 우리는 mobile_slot_count=3.
  처음엔 "preview 가 파워컨텐츠는 무조건 3 반환하는 것 아닌가?" 가설 제기.
- 동일 광고그룹 (일상곡선006/디스크1) 17개 키워드 다 `/3` 으로 잡혀서 가설 강해
  보였음. 하지만 실제 검증:
  - 허리디스크증상 (1위/3) → 검색 결과 카드 3개 ✓
  - 허리디스크 (2위/3) → 카드 3개 ✓
  - 퇴행성허리디스크 (3위/3) → 카드 3개 ✓
  - 허리보호대 (3 으로 잡혔지만) → 카드 2개 ✗
- 결론: preview slot_count 는 **가변 (1~3) 신뢰 가능**. "허리/디스크" 카테고리는
  광고주 공급 많아 다 3구좌 차서 sample 편향 발생. CLAUDE.md §4 메모 유효.

### 🪤 preview ↔ 실제 검색 어긋남 — 시뮬레이션 한계 (빈도 미상)
- "허리보호대" 케이스: preview 가 3 반환 → 실제 검색은 카드 2개. 네이버 안내
  "노출 현황과 동일하지 않을 수 있습니다". preview 는 입찰 후보 광고 다 보여주지만
  실제 검색 시점엔 그 중 1개가 입찰가 부족 / 검수 일시 거절 / 지역·시간·디바이스
  타게팅 / 광고주 일시 OFF / 예산 초과 등으로 안 뜰 수 있음.
- 영향: 우리가 3위/3 안착 락인했는데 실제로는 2위 (또는 미노출) 일 수 있음.
  파워컨텐츠는 search_crawl ground truth 가 없어서 검증 못 함. 락인 락 풀릴 때
  까지 입찰가 동결 → 미노출 손실 가능.
- 대응 검토 후보:
  1. 파워컨텐츠도 search_crawl 확장 (m.search "관련 브랜드 콘텐츠" 영역 셀렉터)
  2. avgRnk cross-check 강화 — 우리 mobile_rank 와 stats avgRnk 큰 차이 시 의심
  3. 락인 키워드 정기 강제 재검증
- 미결: 빈도 모름. "허리보호대" 1개 case 만 발견. 추가 sample 모이면 결정.

### 🧠 설계 결정 — 파워컨텐츠도 search_crawl 로 slot_count 1주 1회 캐싱
- preview 의 slot_count 가 거짓 정원 줄 수 있으니, search_crawl 을 파워컨텐츠까지
  확장해서 1주 1회 batch verify. decider 는 verified_slot_count (있고 7일 안)
  우선, 없으면 preview fallback. 거짓 안착 락인 방지.
- preview API 는 my_rank (실시간 등수) 용도로만 그대로 사용.
- 설계 spec: `docs/superpowers/specs/2026-05-21-파워컨텐츠-slot-검증-design.md`.
- 구현은 다음 세션 (Chrome Remote Desktop 설치 후 운영 PC 의 search_crawl HTML
  실제로 띄워서 "관련 브랜드 콘텐츠" 영역 셀렉터 조사가 선행 작업).

---
## 2026-05-21 (밤 ②) — 네이버 일반 로그인 health-check + 1-click capture

### 🪤 search_crawl 의존성: 네이버 세션 풀리면 입찰가 자동 조정 오작동
- 배경: `naver_login_state.json` 세션 풀리면 fresh browser → 우리 광고 자동 제외
  (비로그인 타게팅) → 거짓 미노출 → 입찰가 잘못 증액. 사람이 알아채야 fix 가능.
- 대응: `app/bot/naver_login.py` + scheduler 1h health-check + 대시보드 카드/배지
  + 시스템 카드 "네이버 로그인 창 띄우기" 버튼 → subprocess 로 capture_naver_login.py
  실행 → 운영 PC 화면에 Chrome 창 → 사용자가 직접 ID/PW 입력.

### 🪤 네이버 nid 자동 로그인 실패 — bvsd 봇 감지
- 처음엔 `nid.naver.com/nidlogin.login` JS evaluate 로 ID/PW set → submit 자동화
  시도. **실패**. 증상: 클릭 후 url 이 nidlogin 그대로, hidden field (sessionKey,
  eccpw, bvsd, wtoken) 가 빈 채.
- 원인: 네이버 nid 페이지의 client-side JS 가 keystroke 단위로 RSA encrypt 처리.
  bvsd (browser-side virtual signature data) 는 mouse/keyboard interaction
  fingerprint → 빈 값이면 봇으로 차단. raw `.value = ...` set 으로는 못 채움.
  `page.type(delay=60)` 도 시도해봤지만 본격 검증 안 함 (사용자가 자동화 포기).
- 결정: 자동 로그인 코드 완전 제거. health-check + 1-click capture 만 운영.
  capture 는 capture_naver_login.py 가 headless=False Chrome 창 띄움 → 사용자가
  직접 캡차/2FA 처리 후 로그인. 5분 timeout, state.json 자동 저장.

### 🧠 subprocess.Popen + CREATE_NEW_CONSOLE 패턴 — uvicorn → 사용자 GUI
- 대시보드 버튼 → FastAPI 가 `subprocess.Popen([sys.executable, "-m", "scripts.capture_naver_login"],
  creationflags=CREATE_NEW_CONSOLE)`. uvicorn 이 사용자 session 으로 떴으면 Chrome
  창이 같은 display 에 뜸. service / system account 라면 display 없어서 실패할 수도.

### 🧠 모듈 분리 패턴 — Playwright thin wrapper + 순수 분류 함수
- `is_logged_in_from_html(html)` 순수 함수로 분리 → unit test 가능. Playwright
  async 부분은 thin wrapper, mock 으로 우회.
- HTML 패턴은 네이버가 바꿀 수 있음. 어긋날 시 journal 에 발견 기록 + 셀렉터 갱신.

---
## 2026-05-21 (밤) — search_crawl: 광고그룹 비로그인 타게팅 + DOM 추출

### 🪤 비로그인 사용자 노출 X 광고그룹 → Playwright fresh browser 미노출
- 증상: 사용자가 직접 운영 PC Chrome 으로 m.search "내성발톱교정기" 검색 →
  우리 광고 (Silly, blog.naver.com/qorwnsdud102) 3등 정확 노출. 같은 IP / 시점에
  Playwright (channel='chrome', stealth 적용) fetch → 우리 광고 자리에 메디셀론.
- 원인: 광고그룹 타게팅 설정 "연령/성별 불명 사용자 (비로그인) 노출 X" — fresh
  browser 는 비로그인 → 우리 광고 자동 제외. 자동화 감지 아님.
- 대응:
  1. `scripts/capture_naver_login.py` — 사용자 1회 로그인 (headless=False Chrome
     창) → `naver_login_state.json` 저장.
  2. `search_crawl.py` 가 파일 존재 시 자동 사용 (`_resolve_storage_state`).
  3. CLAUDE.md §4 갱신 — 일반 네이버 로그인 cookie OK (광고주센터 쿠키와 별개).
  4. `.gitignore` 에 `naver_login_state.json` 추가 (보안).
- 검증: 로그인 cookie 적용 후 `my_rank=3, slot_count=4, hits=[coupang, nailshop,
  qorwnsdud102, nailbank]` — 사용자 캡쳐와 100% 일치.

### 🪤 정규식 nested </ul> 끊김 → 광고 일부 누락
- `<ul id="power_link_body">(.+?)</ul>` non-greedy 가 안쪽 nested </ul> 에서 끊김
  → 4슬롯 광고 중 1~2개만 추출. nailbank (퍼펙토) 가 HTML 에 있는데도 missing.
- 대응: DOM 기반 추출로 전환 — `page.evaluate("...querySelector('#power_link_body')
  ...querySelectorAll(':scope > li.bx')")` 메인 광고 카드만 (sublink_item 제외)
  + 각 li 의 onclick `encodeURIComponent('...')` URL 추출.
- `_fetch_one` 시그니처 변경: `str | None` → `tuple[str | None, list[str]]`
  (HTML + 광고 URL list).

---
## 2026-05-21 (저녁 v3) — search_crawl cool-off 폐기, 시간당 20회 cap 으로 전환

### 사용자 판단 (2026-05-21 v3)
- v2 의 5분 cool-off 직후 사용자가 더 유연한 패턴 요청:
  "cold off 5분간격하지말고, 1시간에 해당 키워드 20번이내만 호출하는걸로하자".
- 의도: 짧은 시간 안 여러 번 점검 OK (자동입찰 ON 직후 재시도 등), 1시간 누적만 cap.
- 5분 간격 강제는 사용자 의도 직관과 다름 — "재시도 못함" 인상.

### 구현
- `SEARCH_CRAWL_COOLOFF_MIN` 상수 폐기.
- `_crawl_calls: dict[kw_id, deque[float]]` in-memory sliding window.
  - `CRAWL_CAP_WINDOW_SEC = 3600`, `CRAWL_CAP_LIMIT = 20`.
- `try_consume_crawl()` / `force_record_crawl()` / `peek_crawl_quota()` 3 함수.
- pre-filter 분기: `try_consume` 실패 시 to_fetch_kws 제외. force=True 면 `force_record` (cap 무시 + 카운트만 누적).
- main loop 분기: `peek_crawl_quota` 로 cap 도달 키워드만 _record_skip + RankSnapshot.
- `compute_skip_status` 의 cool-off 분기 → cap 도달 시 "🚦 호출 cap (N/20) — 약 M분 후 슬롯 회복" 형식.

### 트레이드오프 메모
- in-memory state → uvicorn 재시작 시 카운터 리셋. 운영은 단일 worker + 재시작 드물어 OK.
  최악 케이스: 재시작 직후 force trigger 폭주해도 1시간 안 4 cycle 자연 호출 + α — cap 풀로 채우려면
  사용자가 의도적으로 강제 실행 16번 이상 해야 함. 자연 운영에선 미달.
- `kw.last_crawl_at` 컬럼은 의미 살짝 변경 (cool-off gate → 마지막 크롤 시각 정보). 그대로 보관.

---
## 2026-05-21 (저녁 v2) — search_crawl cool-off 5분 완화 + skip 사유 가시화

### 🪤 자동입찰 ON / 지금 실행이 cool-off 에 막혀 freeze 되는 UX 문제
- 증상: 16:46 search_crawl 후 17:00 "자동입찰 ON" 클릭해도 키워드 점검 안 됨.
  사유 타임라인 16:28 / 마지막 점검 16:46 / 차트엔 17:00 미노출 점 — 셋 다 다른 값이라
  사용자가 "작동하는지 안 하는지" 판단 불가.
- 원인:
  1. `force` 분기 차이 — `routes.py:362` resume → `trigger_now_async(force=False)`,
     "지금 실행" → `trigger_now(force=True)`. cool-off 우회 정책 다름.
  2. 30분 cool-off (CLAUDE.md §4 1차 합의) 가 너무 길어 자동입찰 ON 직후 freeze.
  3. cool-off skip 시 사유가 UI 어디에도 안 보여 사용자가 멘탈 모델 못 세움.
- 대응 (이번 commit):
  - `SEARCH_CRAWL_COOLOFF_MIN`: 30 → **5분** (CLAUDE.md §4 v2 합의).
  - 시간당 한도: 300 → **1000회** (5분 cool-off 로 키워드 80개 미만 광고그룹 자동 보장).
  - `Keyword.last_skip_reason` 컬럼 추가 + `_record_skip()` 헬퍼 — skip 분기 4개
    (cooloff_search_crawl / stuck_max / paused_kw / cooloff_lock) 진입 시 History 1줄,
    같은 사유 반복 시 dedupe (도배 방지). 정상 fetch 도달 시 None 리셋.
  - `compute_skip_status(kw, ag)` 헬퍼 (read-only) — UI 배지 + 사유 타임라인용.
  - 광고그룹 카드 키워드 행 + 키워드 상세 우측 패널에 실시간 cool-off 배지 박스.

### 📌 도메인 합의 (사용자, 2026-05-21 v2)
- "5분이면 자주 점검돼서 좋다. 호출 폭증 위험은 키워드 수가 작아서 괜찮다."
- "자동입찰 ON 해도 안 될 때 무조건 사유 알려줘. 작동하는지 안 하는지 알 길이 없으니까."

---
## 2026-05-21 (저녁) — impression-preview API glitch 방어 retry

### 🪤 광고주센터 비공식 API 가 200 OK + 빈 array [] 응답 (transient)
- 사용자 발견 케이스 (허리통증완화 키워드, 일상곡선001 광고그룹):
  - 09:55: slot=3 "상위 3자리 경쟁, 미노출", bid 800→1400
  - 10:10: slot=3 rank 잡힘, 가속 감액 1400→1180
  - **10:25: slot=0 "상위 자리 비어있음"**, verify_step=1 trigger, bid 1180→1190
  - 10:30: slot=3 rank=3 안착, 락인 1190+30=1220
- 15분 만에 3 → 0 → 3 변화는 비현실적. 광고주센터 `ncc/impression-preview/power-link`
  endpoint 가 가끔 200 OK + 빈 array `[]` 를 transient 로 돌려주는 듯.
- 영향: false negative 로 verify_step 잘못 trigger → 입찰가 +10원 + API 호출 1회 낭비.
  decider 는 `my_rank` 만 보고 결정하므로 결정 자체는 동일.

### 대응 — fetch_exposure 내부 1회 방어 재시도
- `status=200 + slot_count=0 + my_rank=None` 응답 시 같은 browser context 로 2.5초 후 재시도.
  두 번째 응답이 `slot>=1 or rank` 잡히면 그 결과 사용 + `retry_recovered=True` 플래그.
  두 번 다 비어있으면 진짜 미노출로 받아들임.
- cycle.py 는 `retry_recovered=True` 시 `SystemLog INFO category=api_glitch` 기록 →
  빈도 모니터링. 며칠 데이터 모이면 API 안정성 패턴 파악 가능.
- browser context 재사용으로 retry latency 는 1 HTTP round-trip + 2.5s 만. Playwright
  재시작 없음.

### 회귀 가드 — `tests/test_exposure_retry.py` (9개)
- ExposureResult.retry_recovered 필드 + default False
- fetch_exposure retry trigger 조건 (slot=0 AND rank=None AND status=200)
- 정상 응답은 retry 안 함 (slot>=1 or rank 잡힘)
- 두 번 다 빈 응답이면 retry_recovered=False (정직)
- 비-200 응답 retry 안 함 (다른 streak 로직이 처리)
- cycle.py 통합: retry_recovered=True → SystemLog INFO api_glitch 기록

---
## 2026-05-21 (오후) — statusReason 캐시 + 광고주센터 스타일 한국어 라벨

### 🪤 fetch_status 가 statusReason 무시 → "자의 OFF vs 네이버 제한" 구분 불가
- 우리 DB 의 `Campaign/AdGroup/Keyword.status` 는 `ELIGIBLE`/`PAUSED` 두 값뿐.
- 광고주센터 UI 는 "중지: 그룹 OFF / 비즈채널 노출 제한 / 예산 초과" 등 세부 사유 노출.
- 원인: `naver_status.fetch_status` (line 65–78) 가 `r.json().get("status")` 만 추출 →
  네이버 응답의 `statusReason` (NORMAL / PAUSED / CAMPAIGN_PAUSED / EXPENDED_BUDGET /
  NO_BIZ_CHANNEL / ELIGIBILITY_FAILURE / ...) 필드 통째로 버림.
- → `fetch_status` / `fetch_status_bulk` / `fetch_keyword_status_list` 모두
  `(status, status_reason)` 튜플 반환으로 변경. `change_status` 도 `StatusChangeResult`
  에 `new_status_reason` 추가.

### 광고주센터 UI 매핑 — 자의 OFF vs 네이버 제한 시각 구분
- `statusReason == "PAUSED"` → 자의 OFF (회색 "중지: OFF" 라벨).
- `statusReason == "NORMAL"` → 운영중 (녹색 "노출가능").
- 그 외 모든 reason → 네이버 제한 (빨강 "중지: 예산 초과" 같은 한국어).
- 모르는 코드는 `"중지: {영문 raw}"` + 빨강 — 매핑 누락이 UI 에 보이게.
- 매핑 위치: `_ui/macros.html` 의 `naver_status_badge(status, status_reason, level)`.

### 마이그레이션
- `scripts/migrate_add_status_reason.py` 멱등. `campaigns/adgroups/keywords` 3개 테이블에
  `status_reason TEXT NULL` 추가. 기존 행은 NULL → 다음 cycle (B1) 또는 bulk_sync (B2) 가
  자연스럽게 채움. UI 는 reason=None 일 때 status 기반 fallback ("PAUSED" → "중지: OFF").

### 회귀 가드 — `tests/test_status_reason.py` (12개)
- fetch_* 3개 함수 응답에서 statusReason 추출 + 튜플 반환
- cycle.py B1 / status_sync.py B2 둘 다 reason DB 저장
- UI: 알려진 reason 한국어 라벨, 알 수 없는 코드 raw 노출, legacy reason=None fallback

---
## 2026-05-21 (오전 후) — 글로벌 노출확인 지역 (대시보드 상단)

### 🪤 DEFAULT_REGIONAL "가리봉동" 하드코딩 → 강남구 광고 미노출 오판 가능성
- `exposure.DEFAULT_REGIONAL = "02360112"` (서울 구로구 가리봉동) 가 모든 fetch_exposure 에 적용.
- 광고가 지역 타깃팅 사용 시 default region 에서 우리 광고 빠질 수 있어 → 미노출 오판 →
  +bid 누적 → stuck 위험.
- → `SystemConfig["exposure.region_code/label"]` 글로벌 1개 region 저장.
  `cycle.run_cycle` 진입 시 1회 읽어 `fetch_exposure_sync(regional_code=...)` 전달.
- 대시보드 상단에 region 배지 + [변경] 모달. URL 통째 (광고주센터 power-link URL) 또는
  raw 8자리 코드 입력 가능. 모르는 region 은 광고주센터 dev tools 캡쳐 안내.
- 부작용 (region 변경 시): 모든 키워드 `last_known_anchor=NULL` + 모든 광고그룹 stuck 키워드
  retry. 구 region 기준 anchor 무효라 fresh discovery.
- DEFAULT_REGIONAL 도 가리봉동 → 도곡동 (09680118) 으로 전환 (사용자 base location).

### 광고주센터 cascading region dropdown 데이터는 외부에서 추출 불가
- 시도 1: 광고주센터 모달 열 때 region API 호출 여부 캡쳐 — 호출 X (점검 공지·current rcode 만).
- 시도 2: JS bundle 검색 (`도곡동` / `09680118` / `0968`) — 매칭 없음.
- 결론: 데이터는 사내 API 또는 서비스워커 캐시 → 우리는 접근 불가.
- → 옵션 C: 사용자가 광고주센터 dev tools 에서 power-link URL 의 `regionalCode=` 1회 복사.

### 회귀 가드 — `tests/test_exposure_region.py` (16개)
- URL 파싱, fetch_exposure_sync regional_code 시그니처, cycle.py SystemConfig 전달,
  anchor null + stuck retry 부작용, fragment 렌더.

---
## 2026-05-21 (오전) — "지금 실행" 강제 cycle + 키워드 row 배지 UI 통일

### 🪤 "지금 실행" 이 cool-off 못 우회한 갭
- 사용자가 락인 키워드(🎯, last_checked<6h) 입찰 조정 위해 "자동조정 OFF + 지금 실행"
  눌렀는데 cycle 진행 안 됨.
- 원인 2중:
  1. `cycle.py:156` `if ag is None or not ag.is_active: return` — 광고그룹 OFF면 함수
     첫줄 종료. "지금 실행" 도 같은 함수 호출.
  2. `cycle.py:228-242` 락인 cool-off 분기 — at_sweet_spot=1 + last_checked<6h 면 fetch skip.
- → `run_cycle(force=False)` 파라미터 추가. force=True 면 두 가드 모두 우회.
  `scheduler.trigger_now(force=True)` + `/adgroups/{id}/run` endpoint 가 force=True 전달.
- 정기 스케줄러 cycle 은 force=False 그대로 — 기존 가드 회귀 없음.

### 🎨 키워드 row UI = 광고그룹 목록 배지 형식 통일
- 직전 commit `12a3f3a` 가 동그라미 🟢/🔴 2개 분리 컬럼으로 했는데, 광고그룹 목록은
  "● 운영중" / "⊘ 일시정지" / "● 자동 ON" / "자동 OFF" 배지 형식 → 시각 언어 불일치.
- → 키워드 row 도 같은 배지 형식 사용. 헤더 순서도 광고그룹 목록과 통일:
  "광고 ON/OFF" | "자동조정" | "키워드" | ...
- 광고: ELIGIBLE = 초록 운영중 배지(toggle), PAUSED = 빨강 일시정지 배지(toggle).
- 자동조정: stuck=3 = 회색 "자동 OFF", 그 외 = 파랑 "● 자동 ON".

### 테스트
- `test_force_bypasses_is_active_zero` / `_lock_in_cooldown` / `_force_false_keeps_guard` (3건)
- 기존 stuck UI 테스트 2건 업데이트 (🛑 → 배지 텍스트). 전체 350 passed.

---
## 2026-05-21 (아침) — 락인 미노출 시 락 즉시 해제 (6h skip 회복 지연 fix)

### 사용자 보고
> "이 키워드는 05.21 03:00에 안착가 확인했는데 미노출 된것같은데 왜 +10원만 올리고 그 후로 멈춘거야"

### 원인
- decider.py:228 가 락인 중 미노출 시 `new_at_sweet_spot=True` 유지 (락인 락 안 깸).
- cycle.py 의 락인 skip: `at_sweet_spot=True` + `last_checked_at < 6h` → fetch skip.
- 결과: 03:00 미노출 → +10원 (락인 유지) → last_checked_at=03:00 → 09:00 까지 6h skip.
- 사용자 화면 "🎯 안착가 이탈, +10원 재탐색" 사유는 *이탈* 인데 동작은 *락인 유지*
  → **사유 텍스트와 내부 상태 모순**.

### 사용자 합의
> "락 깨고 다시 안착가 찾기 진행해야해"

### 수정
- `decider.py` 락인 미노출 분기 (line 215~) → `new_at_sweet_spot=False`.
- 사유 텍스트: "안착가 이탈" → "안착가 이탈, 락 해제 → +N원 재탐색".
- last_known_anchor 는 유지 → 노출 회복 시 가속 감액으로 빠르게 anchor 복귀.

### 효과
- 미노출 즉시 락 해제 → cycle.py 의 6h skip 우회 → 매 사이클(15분) fetch.
- lost_streak escalation +10/+10/+20/+30/+50 으로 빠르게 회복.
- 노출 회복 시 일반 흐름에서 stable_streak → 검증 → 다시 락인.

### 회귀 가드
- `test_decider.test_at_sweet_spot_out_of_slot_small_step`: `new_at_sweet_spot is False` + "락 해제" 사유 검증.
- `test_decider_verify.test_re_explore_escalation_table`: 동일.

### 1회성 DB cleanup (retroactive)
21d43bf 배포 시점에 이미 락인+미노출 상태였던 34개 키워드는 6h skip 에 갇혀 있음
→ `at_sweet_spot=0, sweet_spot_since=NULL` 일괄 UPDATE 로 락 해제. `lost_streak` /
`last_known_anchor` 는 유지 → escalation 카운트 + anchor 가속 그대로. 앞으로는
코드가 자동 해제하므로 cleanup 1회로 끝.

### 교훈
- 표면 메시지("이탈")와 내부 상태(`True`) 가 모순이면 거의 항상 동작 버그.
  사유 텍스트가 무엇을 약속하는지 ↔ 상태 머신이 무엇을 실제로 하는지 같이 봐야 함.

---
## 2026-05-21 (새벽) — 네이버 API 절대 최소 입찰가 70원 (code=3904)

### 증상
- History 실패 다수: `bid=90->60` 또는 `150->60` PUT → HTTP 400 `code=3904
  "Invalid value in the bid amount field of a keyword you requested"`
- 영향 키워드: 허리교정기 / 허리견인기 / 허리받침대 / 허리디스크복대 / 척추측만증교정운동 등.
  모두 new_bid=60원 으로 떨어진 시점에 거절.

### 원인
- 네이버 검색광고 API (파워링크/파워컨텐츠 공통) 절대 최소 입찰가 = **70원**.
- DB 상 132개 광고그룹이 `min_bid=50` 으로 설정돼 있어 decide() 가 60원/30원 등
  70원 미만 결정 가능. clamp_bid 도 광고그룹 min_bid(=50) 까지만 끌어올려 PUT.
- 결과: 광고그룹 설정 ↔ 플랫폼 룰 충돌. PUT 거절.

### 수정
- `app/bot/safety.PLATFORM_MIN_BID = 70` 상수 추가.
- `clamp_bid` 가 `effective_min = max(min_bid, PLATFORM_MIN_BID)` 사용 →
  광고그룹 설정과 무관하게 70원 미만 PUT 차단. 데이터(min_bid=50) 는 안 건드림.
- 회귀 가드: `test_safety.test_clamp_decided_60_clamps_to_platform_min_70`,
  기존 `test_clamp_below_min_returns_min_value` 기대값 50→70 갱신.

### 교훈
- 광고그룹 설정 (`min_bid`) 과 플랫폼 룰 (`PLATFORM_MIN_BID`) 은 별개 레이어.
  설정이 플랫폼 룰보다 낮으면 거절 — 코드 레벨 safety net 으로만 막을 수 있음.
- 132개 광고그룹 일괄 DB update 보다 코드 가드가 surgical + 안전 (사용자
  의도 50원 설정은 보존). 사용자가 50원 설정한 의도가 있어도 네이버 API 가
  거절하니 실효 없음 — 코드 가드로 70원 강제가 정상 동작.

---
## 2026-05-20 (밤) — fetch_exposure_sync owned_hints 인자 누락 → 카드/타임라인 모순

### 증상
- 광고그룹 카드: "모바일 순위 — / 상위노출 실패", `mobile_rank=None`
- 키워드 페이지 차트 + 사유 타임라인: "1위 안착 감액" 정상
- 영향: 일상곡선018, 일상곡선003 등 owned_companies 캐시된 광고그룹 다수

### 원인
- `fetch_exposure_sync(keyword, *, channel)` 시그니처에 `owned_hints` 없음.
  내부에서 `fetch_exposure` 호출 시 owned_hints 기본값 `OWNED_HINTS = ("하루의여백",
  "maplestoryall", "sqple")` 만 사용 → 노랑보리/옴팡이맘 매칭 실패 → my_rank=None.
- 반면 `decide()` 는 cycle.py:275 에서 `ag_owned_hints` (OWNED_HINTS ∪ ag.owned_companies)
  받아 `find_my_position` 재호출 → 노랑보리 매칭 1위 → "1위 안착" 사유.
- 결과: 같은 사이클에서 fetch 결과 (DB rank=None, 카드 "실패") 와 decide 결과
  (입찰가 감액 + 사유 "1위 안착") 분리. 양쪽 코드가 다른 owned_hints 사용.

### 수정
- `fetch_exposure_sync` 시그니처에 `owned_hints: Iterable[str] = OWNED_HINTS` 추가,
  내부 `fetch_exposure` 호출에 그대로 전달.
- cycle.py:251 호출 시 `owned_hints=ag_owned_hints` 명시 전달.
- 회귀 가드: `test_owned_companies.test_fetch_exposure_sync_accepts_owned_hints`
  — `inspect.signature` 로 인자 존재 검증.

### 교훈
- **동일 데이터를 두 경로에서 다르게 전달하면 모순 화면 발생**. owned_hints 는
  decide() 에는 잘 도달했는데 fetch() 에는 안 도달 — 한쪽만 fix 한 작업의 빈 구멍.
- owned_companies 캐시 작업 (a384062) 추가 시 fetch 경로도 함께 봤어야 함.
- "카드는 X, 키워드 페이지는 Y" 모순은 거의 항상 *같은 데이터를 두 경로가 다르게 읽음* 의 신호.

---
## 2026-05-20 (밤) — stuck UI 가시화 누락 + 자동조정 ON 시 자동 리셋

### 🪤 발견한 트랩
- `max_stuck_streak >= 3` 키워드는 cycle.py:221 에서 fetch 자체 skip 되는데
  `_adgroup_card.html:91-101` 의 🟢/⏸️ 표시는 `k.status` (네이버 ON/OFF) 만 보고 결정
  → stuck 자동 정지된 키워드도 🟢 ELIGIBLE 로 표시 → 사용자가 "자동조정 ON 한 줄
  알지만 입찰 안 함" 인식.
- 증상: 광고그룹 last_run_at 은 매 15분 갱신되는데 키워드 last_checked_at 은 1시간 +
  멈춰 있음. 사용자가 광고그룹을 ON 해도 stuck 키워드는 영구 skip → 이번 사례에서는
  "Stuck 리셋" 버튼 누른 후에야 입찰 재개됨.
- `all_stuck` 자동 OFF 도 PAUSED 키워드들의 stuck=0 때문에 안 발동 (광고그룹 ON 유지
  + fetch 0건) → 사용자 입장에선 무한 침묵.

### 추가
- `routes._auto_reset_stuck_except_min_reached(db, adgroup_ids)` — `/resume`,
  `/bulk/automation is_active=1` 양쪽에서 호출. is_active=1 직전에 stuck 키워드를 0
  으로 리셋.
- **MIN 도달 보존**: `current_bid > ag.min_bid` 조건 추가. cycle.py:322-326 의 MIN+안착
  영구 정지 케이스는 다음 사이클에서 즉시 stuck=3 재진입하므로 리셋 의미 없고 사이클·
  API 호출만 낭비. 명시적 `/reset-stuck` 만 이 경우도 강제 리셋 (button title 기존 의도).
- `/bulk/automation is_active=0` 은 stuck 유지 (회귀 가드).

### 테스트 (tests/test_routes.py, 3건)
- `test_resume_auto_resets_stuck_except_min_reached`
- `test_bulk_automation_on_auto_resets_stuck_except_min_reached`
- `test_bulk_automation_off_does_not_reset_stuck`
- 전체 340 passed.

### 후속 — stuck UI 3-layer 가시화 (같은 commit)
- **Layer 1**: 광고그룹 헤더 stuck 자동 정지 배너 (`_adgroup_card.html` 의 PAUSED
  배너 옆). stuck=3 키워드 카운트 표시 + "Stuck 리셋 또는 MAX 상향" 안내.
  → "자동조정 ON 인데 입찰 안 함" 의 *왜* 가 카드 진입 즉시 답.
- **Layer 2**: 키워드 행 라벨 — stuck=3 → 빨강 "🛑 자동 정지" + 행 `bg-red-100/80`.
  stuck=2 → 노랑 "⚠️ MAX 미노출 2/3" (자동 정지 직전 선제 대응 가능). stuck=1 은
  표시 안 함 (노이즈 회피).
- **Layer 3**: 🟢 emoji 조건 강화 — `k.status == 'ELIGIBLE'` 만이 아닌
  `+ max_stuck_streak < 3` 일 때만 🟢. stuck=3 + ELIGIBLE 은 🛑 (PAUSED 토글
  가능). 🟢=실제 조정 중 / ⏸️=네이버 OFF / 🛑=stuck 자동 정지 3-상태 명확.

### 테스트 (tests/test_routes.py, 추가 5건)
- `test_adgroup_card_shows_stuck_banner_when_stuck_keywords_exist`
- `test_adgroup_card_no_stuck_banner_when_clean` (회귀 가드)
- `test_keyword_row_shows_stuck_label_at_threshold`
- `test_keyword_row_shows_warning_label_at_stuck_2`
- `test_keyword_row_green_replaced_by_stuck_emoji_when_stopped`
- 전체 345 passed.

---
## 2026-05-20 (저녁) — 알짜배기 정리

### 🪤 가장 큰 트랩: OWNED_HINTS 다계정 함정
- `config.py` 의 `OWNED_HINTS = ("하루의여백", "maplestoryall", "sqple")` 가 단일 광고주
  가정. 다계정 환경(1740761 + 1793205 위임)에서 **다른 광고주의 brand 못 잡음**.
- 증상: 일상곡선(노랑보리) 키워드들이 실제 1위 노출 중인데 `find_my_position` 이
  None 반환 → "미노출" 판단 → +bid → MAX 도달 → 자동 stuck OFF.
- 광고그룹 188개 sync 결과 7개 unique companyName 발견:
  하루의여백 90개 / 노랑보리 21 / 옴팡이맘 6 / 봄봄곰이 5 / 은하공주 2 / 89년생맘 1
  + 콤마 결합 케이스 1 (광고그룹 1개에 광고 2개 등록).
- → 해결: `AdGroup.owned_companies` 컬럼 추가 + `sync_adgroup_keywords` 에 ads
  fetch 통합 (`GET /ncc/ads?nccAdgroupId=...` → companyName 수집) + `cycle.py`
  에서 `ag_owned_hints = OWNED_HINTS ∪ ag.owned_companies` 동적 구성.
- **광고그룹별 격리**: 한 광고그룹의 ad만 fetch → 그 광고그룹의 owned_companies
  에만 저장. 다른 광고그룹 hint 영향 X.

### 🪤 status 단방향 sync 트랩 (가장 자주 일어나는 종합 갭)
- 우리 DB 의 `Campaign/AdGroup/Keyword.status` 는 **우리 UI 버튼**으로만 갱신됐음.
  사용자가 광고주센터에서 직접 OFF 하면 우리 DB stale → 우리 cycle 이 정상으로 인식
  → 미노출 판단 → +bid → stuck 누적 → 자동 OFF. (멜라맘 신규2 / 일상곡선 측만증 등)
- 키워드는 더 미세: PAUSED 키워드도 `bidAmt` PUT 자체는 받아줌 (네이버 API 가
  `userLock` ≠ `bidAmt` 분리). 실제 광고비는 0 (광고 OFF 라 노출 X) 이지만 입찰가만
  의미없이 움직이고 anchor 학습이 시뮬레이션 기반(impression-preview 는 ON/OFF 무시)
  으로 부정확해짐.
- → 해결 2-tier:
  - **B1 (cycle 직전 fetch)**: `cycle.run_cycle()` 첫 머리에서 `fetch_status(level=...)`
    GET 으로 ag/camp status 동기화. 실패 시 silent fallback.
  - **B2 (10분 주기 bulk)**: `app/bot/status_sync.py::bulk_sync_status_from_naver` 가
    customer_id 별 list endpoint 1회 호출. 키워드는 광고그룹별 list call(`GET /ncc/keywords?
    nccAdgroupId=...`), is_active=1 광고그룹만 → 호출량 절감.
  - 둘 다 적용 후 다음 cycle 진입 시 `cycle.py:191` `if kw.status and kw.status != "ELIGIBLE": continue`
    가 차단 → 입찰 안 일어남.

### 🪤 PUT fields = "userLock" 통일 (status 는 readonly)
- 캠페인/광고그룹/키워드 모두 status 토글 시 `fields=userLock&body[userLock]=bool` 만 받음.
  네이버: `400 1002 "유효한 fields 값은 userLock, budget, period 입니다"`.
- `status` 는 응답 readonly 필드 — userLock 으로부터 도출. 모든 level 통일 패턴.

### 🪤 다계정 creds 해석은 entry point 마다
- routes.py 의 임의 endpoint 가 `request.app.state.scheduler._creds` 를 그대로 넘기면
  KeyError('api_key') — 다계정 dict 형태 `{cid: {api_key,...}}` 이라.
- **반드시** `config.resolve_creds_for_customer(all_creds, customer_id)` 공용 헬퍼 사용.
  내부에서 단일/다계정 자동 분기 + X-Customer override (위임 access) 지원.

### 🪤 status NULL = ELIGIBLE 처리 규칙 일관성
- `cycle.py:191` 은 NULL 을 통과시키는데(`if kw.status and kw.status != "ELIGIBLE"`),
  `_exposure_counts_by_*` 는 NULL 을 제외해서 노출 카운트 비일관 → 신규 sync 직후 키워드
  status NULL 광고그룹들이 자동 ON 인데도 "노출 현황: —" 표시.
- → 모든 status 검사 코드에서 `or_(status == "ELIGIBLE", status.is_(None))` 통일.

### 🪤 PAUSED 모순 UI — 자동 OFF 동기화
- 우리 `is_active=1` 인데 네이버 status=PAUSED 면 "광고 일시정지 + 자동조정 ON" 모순 표시.
- → `cycle.py:182` PAUSED 분기에서 `ag.is_active = 0` 자동 동기화 + INFO 로그.
- 재개는 사용자가 다시 ON — 자동 ON 복귀 안 함 (의도 보존).

### 🪤 MAX 변경 + 락인 cool-off 갭
- max_bid 1500→1110 낮춰도 락인 키워드는 `LOCK_CHECK_INTERVAL_HOURS=6h` 동안 fetch skip
  → 최대 6h 동안 1510원 그대로. 일반 `clamp_bid` 는 fetch 결과로만 동작.
- → `cycle.run_cycle()` 시작부 `_enforce_max_bid_clamp()` 1패스 추가. fetch 없이
  `current_bid > max_bid` 키워드를 즉시 PUT. History 에 "MAX 강제 clamp" 기록.

### 🚀 probe 6h → 24h 회귀 (rank check 6h 유지)
- 어제 일괄 24h→6h 가 너무 공격적 — 안착 유지 중인 키워드도 6h 마다 -10원 시도
  → 잦은 cliff 흔들기. "안착 유지면 그냥 또 6h 쉬어라" 가 사용자 의도.
- 핵심: `LOCK_CHECK_INTERVAL_HOURS` (fetch 주기) 와 `sweet_spot_probe_hours`
  (시험 감액 주기) 가 **다른 의미**. 합쳐서 "6h 마다 rank check, 24h 마다 probe".
- 코드는 이미 두 기준 분리. probe_hours 값만 24 로 되돌리면 됨.

### 🎨 UX 노하우
- **사이클 동작이 사용자에게 보이도록**: 락인 동안 6h fetch (bid 동결) 도 History 1줄
  ("🎯 안착가 확인 N회차"). 사용자가 "이 키워드에서 일어난 모든 일" 사유 타임라인에
  보고 싶어함 — 일반 (락인 아닌) 변경 없음은 그대로 스킵 (스팸 방지).
- **헤더 배지 정체 가시화**: 헤더 "경고 N건" 의 cutoff 와 시스템 페이지 cutoff 가
  달랐음 (6h+acked vs 1h). 시스템 페이지에 `_compute_alert_status` 결과 + 동일
  cutoff 의 ERROR/WARN 목록 노출 → 배지 클릭만으로 정체 즉시 확인.
- **시:분 포맷**: 시간 표시는 backend 에서 미리 `H시간 M분` 으로 포맷해서 템플릿은
  그대로 표시. "7.4시간" 같은 소수는 사람이 못 읽음.
- **회차 타임라인**: "안착 N회 연속" 보다 "05-20 14:45 안착가 확인 1회차 ✓ 완료
  / 05-20 20:45 안착가 확인 2회차 ← 다음 / ... / 안착가 재탐색" 식 표시가 직관적.
- **min_bid 같은 변하지 않는 값은 숨김**: 사용자 입력 불필요. UI 만 숨기고 DB/알고리즘
  은 그대로 (보통 70).

### 🧪 운영 노하우
- **git_pull_watcher 자동 적용 완벽**: 코드 push → 2분 내 운영 PC pull + uvicorn
  재시작 + health 확인. 사용자 개입 0. 3회 연속 사이클 무손실 검증.
- **코드 + DB 동시 변경 시 패턴**: 마이그레이션 별도 스크립트 (`migrate_add_*.py`,
  `update_*.py`) → 운영 PC 에서 사용자가 1회 수동 실행. 멱등성 필수.
- **다계정 sync 패턴**: `resolve_creds_for_customer(multi, camp.customer_id)` →
  X-Customer override → 한 키로 여러 광고주 sync 가능.
- **개발 PC DB 는 stale** — 디버깅 시 같은 코드여도 데이터는 다름. 운영 PC 출력
  공유받거나 stale 임을 명시한 후 코드 동작 기준으로만 분석.

---
## 2026-05-19 (저녁) — 알고리즘·UX 대개편 + 다계정 access (핵심 트랩만)

### 🪤 검색광고 API PUT 사일런트 실패 (★ 최고 트랩)
- `PUT /ncc/keywords/{id}?fields=bidAmt` 쿼리만 줘도 200 응답 + 사이드 영향 없이
  bidAmt 변경 안 됨. 반드시 **GET → 전체 객체 수정 → PUT(전체 객체) → GET 재검증** 패턴.
- `useGroupBidAmt=true` 면 그룹 기본값으로 사일런트 복귀 → 반드시 `False` 명시.
- `change_keyword_bid` (`app/bot/adjuster.py`) 가 이 패턴 표준 구현.

### 🪤 합성 키워드 ID = 404 함정
- `init_db` dump 기반 import 시 키워드 ID 가 `kw-<adgroup_id>-<idx>` 합성 ID.
- 실제 nccKeywordId 가 아니므로 `/ncc/keywords/{id}` 가 모두 404 "No permission".
- 새 캠페인/광고그룹 추가 시 반드시 `sync_adgroup_keywords` 로 실제 ID 갱신 필수.

### 🪤 검색광고 API 키 위임 access 패턴
- 한 customer_id 의 키가 다른 customer_id 자원에 권한 위임 가능.
- 인증은 키의 customer_id 로, 자원 접근은 `X-Customer` 헤더로 분리.
- → `_resolve_creds` 가 캠페인.customer_id 로 X-Customer 만 override. api.txt 에
  별도 `[account.<id>]` 블록 필요 없음 (위임만 받았으면).

### 🪤 chart.js `parsing: false` + ISO string 비호환
- `parsing: false` 옵션은 x 가 timestamp number 또는 Date 객체여야 함. ISO 8601
  string 그대로 넣으면 time scale 이 위치 매핑 실패 → 점·라인 안 그려짐.
- X축 자동 줌 같은 다른 기능은 정상 작동 → misleading 디버깅.
- → 모든 차트 데이터 점의 `x = new Date(s.at).getTime()` 통일.

### 🪤 `BackgroundTasks` 는 단일 worker 순차
- FastAPI `BackgroundTasks` 가 광고그룹 N × 15~25초 사이클 → 4~5분 분산. 사용자는
  변화 안 보여서 "ON" 재클릭 → 중복 큐잉.
- → `BidScheduler` 에 `ThreadPoolExecutor(max_workers=4)` + `trigger_now_async`
  로 광고그룹 단위 병렬. 광고그룹 내부 키워드는 2~5초 간격 순차 유지.
- + 진행바 모달 + `/cycle-status` polling 으로 중복 클릭 방지.

### 🚀 알고리즘 안전망 4중
- 신규 키워드 순위 가중치 (cold start + slot 끝자리부터 ×slot_count - rank + 1)
- 이진 탐색 quarter step (1등 + 다구좌만, `(bid - MIN) // 4`)
- MIN 도달 + 안착 = 영구 정지 (`max_stuck_streak = STUCK_THRESHOLD`)
- anchor 메모리 가속 (`my_current_bid > last_known_anchor + 100` 이면 quarter step)
- 검증 1회로 단축 (3 → 1, ±30원 마진으로 보호)

### 🎨 UX 핵심
- **X·Y 축 자동 줌**: X 는 첫 점 5분 전 ~ now+5분, Y 는 min/max ± 20% 패딩. MAX/MIN
  라인은 데이터 근접 시만 포함.
- **알람 ACK 패턴**: `SystemConfig['alerts.acked_until']` 타임스탬프. 사용자가
  "확인" 누른 이후 발생 항목만 카운트.
- **rate quota 조기 종료**: 시간당 호출 한도 도달 시 `_log(api_quota)` + return.
  안전 운행.

---
## 2026-05-14 — 검색광고 API 초기 트랩 (참고용)

- HMAC 서명 시각 오차 1~2분 넘으면 거절. PC 시계 정확히.
- Estimate API body 스키마:
  - `average-position-bid`: `items: [{key, position}]` (PC 1~10 / MOBILE 1~5)
  - `performance`: root-level `{key, bids:[…]}` (items 아님)
- 노출 가능 구좌 수는 항상 2 또는 3 (네이버 규격). slot_count=1 은 "경쟁 거의 없음"
  신호 (다른 광고주 부재로 인한 빈자리).

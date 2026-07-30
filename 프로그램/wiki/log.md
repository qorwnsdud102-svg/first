# 위키 로그 — 프로그램

> Ingest · Lint · 구조 변경의 일자별 기록. **최신이 위.**
> 한 줄이면 충분. 시간성을 잃지 않는 게 목적.

## [2026-07-30] lint | index 개수·orphan 정리 → [[index]] (1갱신)

- 폴더 실측 vs 표기: concepts 12→**20**, syntheses 2→**3**, sources 36→**37** 로 두 달간 낡아 있었다. entities 9 는 정확. 인덱스에 안 걸려 있던 9개 페이지(자사몰 4·[[모바일-가로-키오스크-웹앱-함정]]·[[라이브-검증-프로토콜]]·[[LLM-의미분류-필터링]]·[[벤더-앱-오케스트레이션]]·[[네이버-키워드-접촉지점-수집-노하우]])를 §분류별 폴더에 전수 연결하고 concepts 를 4갈래로 묶었다. 그중 [[LLM-의미분류-필터링]] 은 vault 어디서도 링크되지 않은 **진짜 orphan** 이었다(나머지는 피인용 1~5). 잔여 드리프트: `sources/` 의 naver-biding 1건이 출처 sub-folder 없이 루트에 있다(경로를 옮기면 링크가 깨지므로 손대지 않음).

## [2026-07-30] ingest | cafe-orch 카페 통합 컨트롤러 실작업 (댓글 세트 실전 실패 디버깅) → [[벤더-앱-오케스트레이션]] (1신, [[index]] 갱신)

- 교훈: 상태는 로그 문구가 아니라 **버튼 enabled 조합**으로 판단(`로그인 성공` 뒤에도 프로그램은 작업 중이라 다음 버튼이 회색) / 완료 지문을 부분 문자열로 찾으면 `로그인 작업이 완료`에 속아 0건이 성공으로 보고됨 → 줄 단위 판정 / 같은 판정이 3개 모듈에 서로 다르게 정의돼 한 곳만 고친 수정이 빈 구멍을 남김 → 단일 모듈 수렴 + 정적 감사로 재정의 금지 / 우연히 되던 성공(추출·브라우저 대기가 벌어준 시간)은 조건이 바뀌면 깨진다. [[단일-진실-원천]]·[[부정판정-지문-오탐-방지]]·[[봇탐지-회피-순간밀도]]·[[측정-지표-함정]] 을 실제 코드에 반영(테스트 68개·감사 97항목 통과).

## [2026-06-22] ingest | competitor-finder 접촉지점 키워드 수집기 실작업 → [[네이버-키워드-접촉지점-수집-노하우]] (1신)

- 교훈: 분류 기준=구매의도(topical 아님, 장요근 사례) / 쳐낸 것 전부 노출(no silent drop) / 숨은 브랜드는 WebSearch(올투게더나우) / keywordstool이 연관+검색량 엔진 / 넓은 시드가 의료검색 전체 노이즈 유발. 표본=허리보호대.

## [2026-06-07] ingest | 엠타트업 22기 수강생 노하우 — 바이브코딩 실증 (cross-domain) → [[바이브-코딩]] (0신, 1갱신)

- 32번 "바이브 코딩 절대 금지 — 기획 먼저" (3개 파일 분리 구조 = SKILL.md+references 결) + 성공 사례 2건(골포커싱 SaaS·키워드 확장프로그램 — 본인 문제 정의가 명확했던 경우). 출처: `마케팅/wiki/sources/엠타트업/2026-06_엠타트업_22기-수강생노하우.md`.

## [2026-06-07] ingest | 엠타트업 22기 4주차 바이브코딩 경고 (cross-domain) → [[바이브-코딩]] (0신, 1갱신)

- "딸깍 속에 낙원은 없다" (작형 코치, 10년차 실증): 바이브 코딩 자작 도구 = 개인화 도구라 남이 안 씀 / AI 자동화 단독 한계 월 50~100만 / AI는 도구, 클로드 코드로 연습. sources 메타: `sources/기타/2026-05_엠타트업-22기-4주차_바이브코딩-cross-domain.md`.

## [2026-06-02] restructure | 다PC 자동 동기화 — _setup/ 부트스트랩 + 드리프트 hook 신설 → [[스킬-스코프]] (1갱신, _setup/ 4신)

- 문제: vault는 git(origin=github qorwnsdud102-svg/first, main)으로 *지식*만 동기화 — `~/.claude/`(글로벌 CLAUDE.md·settings.json hook)는 vault 밖이라 다른 PC에 안 따라감. "어디서나 노하우 아는 클로드"가 안 됨.
- 해결: vault 안 `_setup/` 신설 — 정본 + 설치 자동화를 git에 실어 보냄.
  - `_setup/claude-global.md` = **단일 소스 정본**(라이브 ~/.claude/CLAUDE.md 원본).
  - `_setup/check-claudemd-sync.ps1` = PostToolUse(Edit|Write) 드리프트 가드. ASCII-only(한글 경로/리터럴 0 → 코드페이지 안전), canon은 $PSScriptRoot 상대, live는 $env:USERPROFILE. 파이프 테스트 3케이스(비대상 silent / 동기화 silent / 드리프트 JSON경고) 통과.
  - `_setup/install.ps1` = 멱등 부트스트랩. 정본→~/.claude/CLAUDE.md 복사 + hook을 settings.json에 병합(기존 설정 보존, BOM 없이). 이 PC 실행→검증 완료(JSON 유효, 기존 plugins/permissions 보존).
  - `_setup/README.md` = 새 PC 3스텝(`git pull → install.ps1 → 새 터미널`) + 운영 규칙.
- [[스킬-스코프]] 갱신: §유저 CLAUDE.md 정본을 `_setup/claude-global.md`로 명시(임베드 codeblock은 읽기용 미러로 강등), §설치 절차를 install.ps1 한 줄로 교체(수동은 폴백). 내 생각 칸에 다PC 활성화 타이밍 추가.
- 새 PC 효과: 위 3스텝이면 5인 사이클·karpathy 4원칙·병렬 디폴트·파이프라인 스킬 패키지 노하우가 모든 세션 자동 로드 + 드리프트 자동 경고.

## [2026-06-02] restructure | ~/.claude/CLAUDE.md ↔ [[스킬-스코프]] canonical 재동기화 + 부트스트랩 템플릿 신설 → [[스킬-스코프]]·[[파이프라인-스킬-패키지]] (2갱신, 템플릿 폴더 1신)

- 부트스트랩 템플릿 신설: `프로그램/아웃풋/스킬-부트스트랩-템플릿/` (SKILL.md·CLAUDE.md·README·references·scripts(config+step1 골격)·hooks 3종·.gitignore·README-템플릿-사용법.md). 8 노하우를 파일 구조·주석에 박음. step1 골격 스모크 테스트 통과(파일 핸드오프 UTF-8 정상).
- 라이브 `~/.claude/CLAUDE.md`에 "자작 도구 만들 때 — 파이프라인 스킬 패키지" 섹션 추가 → 모든 세션이 8 노하우·템플릿 경로 인지(always-on baseline, vault 밖 세션 포함).
- [[스킬-스코프]] §Canonical 사본을 라이브와 **정확히 재동기화**: 테이블 헤더(`또는 superpowers 플러그인`)·자작도구 섹션·병렬 작업 디폴트 섹션·🍞 병렬 오븐 4축 행·실제 vault 경로 반영. (재동기화 전까지 canonical은 라이브보다 뒤처져 있었음 — 다른 PC 복붙 시 누락 위험이던 것 해소.)
- [[스킬-스코프]] 내 생각 정정: "~/.claude/CLAUDE.md 아직 없음(2026-05-29)" stale claim → "도입·운영 중" 갱신. updated 2026-06-02.

## [2026-06-02] ingest | C:\claude\네이버 급상승 키워드 기반 경쟁사 발굴\ → [[파이프라인-스킬-패키지]]·[[competitor-finder]] (2신, [[index]] 갱신)

- 대표님이 공유한 competitor-finder 스킬 폴더 전체 정독(SKILL.md·README·사용법.txt·config.py·scan_surge.py·hooks/*.sh·references/). 외부 raw가 아니라 사장님 보유 프로그램이라 폴더 경로를 출처로 직접 기록.
- 신규 concept [[파이프라인-스킬-패키지]]: 다단계 자동화 스킬을 SKILL.md(계획)·references(상세)·scripts(독립 CLI)·hooks(게이트)로 쪼개 한 폴더에 담는 표준 해부도 + 전이 가능한 8 노하우(progressive disclosure·이중 구동·파일 핸드오프·우아한 실패·정책=데이터·훅 wrapping 등). [[클로드-베이커리-비유]] 4축을 폴더 레이아웃으로 물리화한 것.
- 신규 entity stub [[competitor-finder]] (type: 작품): 4-STEP 파이프라인·판정 임계값(15→40, 0→300)·HMAC 시간차 보정·Client ID 라운드로빈 정리. [[네이버-검색광고-API]]·[[네이버-검색결과-크롤링]]·[[Hook]] 와 연결.
- 통계: concepts 7→8, entities 8→9. 자주 가는 곳에 [[파이프라인-스킬-패키지]] 추가.

## [2026-05-29] lint round 3 | 자체 점검에서 발견한 잔여 정리 → 핵심-맥락·[[엠타트업/2025-10_엠군_부자를훔치다]]·[[엠타트업/M군스토리]] (3갱신)

- 내가 round 1·2 작업 중 introduce한 broken 링크 자체 발견:
  - `[[마인드/wiki/sources/...]]` path-based 링크 (M군스토리·부자를훔치다 마케팅 측 source 메타 2개) → 절대경로 코드체로 강등.
  - `[[마인드/자각]]` (핵심-맥락.md §3 마인드 절) → `[[마케팅/자각]] cross-domain`으로 정정. 마인드 도메인엔 자각 페이지 없음 (마케팅 dominant).
- 엠타트업/19기 source 페이지 stub→growing (50줄 본문, 19기↔21기 키워드 비교표 충실).

## [2026-05-29] lint | 프로그램 작은 broken 링크 정리 → [[바이브-코딩]]·[[MCP]]·[[CCFM-AX-TEAM]]·[[index]] (4갱신)

- broken wikilink plain 강등: `[[Claude-Code|클로드 코드]]` → `클로드 코드 (Claude Code)` ([[바이브-코딩]]), `[[Claude]]`·`네이버 데이터랩` 후속 신설 약속 → 미작성 명시 ([[MCP]]), `[[기타/사장님|연결 대상]]` placeholder 제거 ([[CCFM-AX-TEAM]]), `[[프로그램]]`·`[[마인드/AI 시대 마인드]]` 인덱스 plain text 강등.

## [2026-05-29] lint | 프로그램 도메인 정돈 → [[Karpathy]]·[[MCP]]·[[index]]·[[커뮤니티-크롤러-브레인스토밍]] (1신 synthesis, 3갱신)

- inbox 정상화: `raw/inbox/2026-05-22_커뮤니티크롤러_브레인스토밍-진행중.md` → `wiki/syntheses/커뮤니티-크롤러-브레인스토밍.md`로 이동 (외부 raw가 아니라 내부 결정 일지/ADR이라 syntheses가 맞는 자리). raw inbox 비움.
- status 격상: [[MCP]] stub→growing (한줄정의 + 4 핵심주장 + 관계 3개 모두 충족, 출처 14일 초과).
- 엔티티 정정: [[MCP]] §도메인별 분포 신설 (프로그램 dominant — 마케팅 cross-domain 참조만).
- 엔티티 정정: [[Karpathy]] "사장님 환경 13+ 스킬" stale 클레임 → "필수 6스킬 중 1개" 정정 (직전 [[Claude-Skill]] revision으로 13/14 추정 폐기됨).
- 인덱스: entity 6→8 (Karpathy·superpowers 추가), concepts 5→7 (karpathy-guidelines·스킬-스코프 추가), syntheses 1→2 (커뮤니티-크롤러 추가), sources 35→36.

## [2026-05-29] restructure | 스킬 로딩 메커니즘 페이지화 → [[스킬-스코프]] (1신, 3갱신)

- 진단: `~/.claude/skills/` cherry-pick 후 vault 밖 프로젝트(`C:\CLAUDE\ATM WEBSTIE`) 세션에서 "5인 역할분담 알아?" 물어보니 모름 — 스킬 본체는 로드됐지만 메타 프레임은 vault 위키 안에만 있어 vault 밖 세션은 접근 불가.
- 해결: `~/.claude/CLAUDE.md` 신설 (5인 매핑 + karpathy 4원칙 + 4축 그림). user-level memory라 모든 세션 자동 로드. 이 PC는 즉시 적용, 다른 PC는 본 페이지 §유저 CLAUDE.md canonical 복붙으로 설치.
- 신규 concept [[스킬-스코프]]: user-level vs project-level / description 매칭 auto-trigger / ~/.claude/CLAUDE.md 강한 baseline / 세션 시작 시 로드 잠금 등 스킬 로딩 메커니즘 통합 정리. §유저 CLAUDE.md 절에 canonical 사본 인라인 보관(다른 PC 복붙용).
- [[Claude-Skill]] 갱신: §설치 방법 Step 3 추가(메타 프레임 글로벌화 절차로 [[스킬-스코프]] 가리킴).
- [[superpowers]]·[[karpathy-guidelines]] 갱신: 다른 엔티티 관계 절에 [[스킬-스코프]] 링크 추가.

## [2026-05-29] restructure | [[Claude-Skill]]·[[karpathy-guidelines]] 설치 스펙 정정 → [[superpowers]] (1신, 2갱신)

- 기존 위키 주장 "사장님 환경 13+개 스킬 설치 완료" → **실측으로 거짓 판정** (~/.claude/skills/ 부재, installed_plugins.json 비어있음 — 이 PC 기준).
- 사장님 정정 3건 누적:
  1. "옵시디언 입력 PC엔 이미 설치, 다른 PC엔 미설치 가능 — 위키는 PC 무관 도서관이므로 'PC별 상태' 적지 말고 '필요한 스킬 + 설치 방법'을 명시"
  2. "14개 스킬 필요한 게 아니라 5개 역할분담이 작동해야 하는 거지" — 14 통설치가 핵심 목표가 아님을 명확화
  3. "처음 위키 보는 PC가 14개 다 받아서 5개만 쓰면 비효율" → bulk 플러그인 설치 X, **5스킬 cherry-pick** 권장으로 전환
- [[Claude-Skill]] 갱신: "13+ 설치 완료" 주장 삭제 → 진짜 목표 = "5역할이 작동하는 상태" 명시. §설치 방법 재작성 — Bash·PowerShell 양 OS용 cherry-pick 절차 (clone superpowers → 5폴더 복사 → 정리). 플러그인 통설치는 부록·비권장으로 강등.
- 신규 entity stub [[superpowers]]: 14스킬 카테고리(Testing 1 / Debugging 2 / Collaboration 9 / Meta 2 = 14) 정리 + 5개만 cherry-pick 권장 명시. WebFetch로 `skills/<이름>/SKILL.md` layout 확인.
- [[karpathy-guidelines]] 갱신: 설치 절차도 cherry-pick으로 통일 (저장소가 1스킬이라 bulk vs cherry-pick 동일하지만 일관성).

## [2026-05-29] ingest | raw/karpathy/2026-04-20_forrestchang_andrej-karpathy-skills.md → [[karpathy-guidelines]]·[[Karpathy]]·[[Claude-Skill]] (2신, 1갱신, 1 source)

- `multica-ai/andrej-karpathy-skills` GitHub 저장소 (forrestchang 패키징, MIT, 최신 커밋 2026-04-20). README + CLAUDE.md + SKILL.md + EXAMPLES.md 4파일 verbatim 번들로 raw 보존. CURSOR.md·README.zh.md 제외.
- 신규 concept [[karpathy-guidelines]] — Karpathy X 글의 4대 함정 진단 ↔ 4원칙(Think Before Coding · Simplicity First · Surgical Changes · Goal-Driven Execution) 처방. 동일 콘텐츠가 Claude Code 스킬 / Cursor 룰 / CLAUDE.md 3채널로 동시 배포.
- **5인 사이클 매핑 가설 검증**: 기존 [[Claude-Skill]] 미해결 질문 "harness ↔ karpathy-guidelines로 잡는 안" → SKILL.md 실물 확인으로 **기각**. karpathy-guidelines는 작업 무관 베이스라인이라 MD 축(가게 운영 매뉴얼)에 가까움. harness("이번 작업 한정 룰 강제")의 실제 대응은 그대로 `verification-before-completion`.
- 신규 entity stub [[Karpathy]] — **프로그램 dominant** 확정 (다른 도메인엔 raw 없음, 마케팅은 cross-domain 참조만). 향후 LLM Wiki gist 원문 또는 nanoGPT/Intro to LLM 영상 ingest 시 growing→stable로 격상.
- karpathy/ sub-folder 신설. 통계: entities 6→7, concepts 5→6, sources 35→36.

## [2026-05-29] ingest | raw/ccfm-강동이/2026-05-09_강동이_Claude-Code-기본-교육-교안.md → [[바이브-코딩]]·[[Claude-Skill]]·[[Hook]]·[[클로드-베이커리-비유]]·[[CCFM-AX-TEAM]]·[[강동이]] (6신, 1 source)

- CCFM AX TEAM [[강동이]] 강의 PDF (34p, 2026.05.09 SAT). pypdf로 텍스트 추출 후 raw 보존.
- 4축 비유 (MD·스킬·훅·WIKI) + 스킬 5인 사이클 (bob·dd·harness·eval·learnings-engine) 정의.
- **5역할 ↔ 사장님 운영 13+ 스킬 매핑** ([[Claude-Skill]] 본문): bob→`brainstorming`, dd→`writing-plans`, harness→`verification-before-completion`, eval→`requesting-code-review`, learnings-engine→`writing-skills`.
- ccfm-강동이/ sub-folder 신설 (iboss-근육돌이 패턴 미러).
- 통계: entities 4→6, concepts 1→5, syntheses 1, sources 34→35.

## [2026-05-22] ingest | raw/2026-05-22_naver-biding_journal-알짜.md → [[네이버-검색광고-API]]·[[광고주센터-비공식-API]]·[[네이버-검색결과-크롤링]]·[[다경로-데이터-모순-디버깅]]·[[네이버-광고-자동화-운영-노트]] (5신, 1 source)

- naver-biding (`C:\naver-biding`) journal.md (~660줄) 정제. A (네이버 platform truth) + B (엔지니어링 메타 패턴) 만 ingest. C (일반 기술 트랩) 와 project-specific decider 디테일은 제외.
- 신규 entities 3 (네이버-검색광고-API · 광고주센터-비공식-API · 네이버-검색결과-크롤링), concept 1 (다경로-데이터-모순-디버깅), synthesis 1 (네이버-광고-자동화-운영-노트), source 1.
- 통계: entities 1→4, concepts 0→1, syntheses 0→1, sources 33→34.

## [2026-05-15] ingest | sources/iboss-근육돌이/마케팅-AI-시대-필수로-써야하는-툴-6가지….md → [[MCP]] (1신)

- 프로그램 도메인 **첫 entity 신설**. (sources 33개는 사장님이 2026-05-10에 이미 1차 요약 ingest 완료 — 발견 후 index.md 진술 정정.)
- 신설: `wiki/entities/MCP.md` (status: stub, 출처 1개).
- 같은 source 페이지에서 후속 entity 14종 분리 가능 (Claude·ChatGPT·Gemini·Perplexity·NotebookLM·n8n·Make·Zapier·fal-ai·Runway·Kling·Veo2·Sora·Akool). 사장님 우선순위 결정 후 진행.
- 또한 다른 32개 sources도 entity 추출 후보 — `AI-에이전트-빌딩…`, `AI-자동화-3가지…`, `AI에-월-100만원-쓰면서…` 등.

## [2026-05-15] restructure | raw/inbox/iboss-근육돌이.bak/ → 마케팅/raw/iboss-근육돌이/ (229 파일 이동, .bak suffix 제거)

- 사장님 결정으로 `.bak` 활성화. CLAUDE.md의 dominant 도메인 룰 준수 — 근육돌이는 마케팅 dominant이므로 raw는 마케팅 측에 위치.
- 프로그램 inbox 비워짐. 프로그램 측 ingest는 cross-domain reference (절대경로 `[[마케팅/...]]`)로 진행.
- 첫 프로그램 ingest 시범 1개 진행 중.

## [2026-05-15] lint | wiki/index.md → 끊긴 wikilink 4개 풀기

- `[[concepts]]`·`[[entities]]`·`[[sources]]`·`[[syntheses]]` (분류별 폴더 섹션) → 백틱 폴더 표기로 변경. 4 orphan 해소.

## 2026-05-10 (도메인 시드 명시 — 첫 ingest 후보 셋업)

- **wiki/index.md 보강**: 첫 ingest 후보 시드 명시.
  - 마케팅 도메인 [[마케팅/그로스짐]] 강사가 사용하는 AI 도구 스택 (Claude + MCP + 크롬 자동화) → 자연스러운 첫 entity 후보.
  - 자동화 가능한 마케팅 작업 4종 (시장조사·리뷰 분석·유튜브 분석·퍼포먼스 캔버스 자동 채움).
  - 제품 소싱 도구 후보 3종 (도매 모니터링·경쟁사 추적·가격 알림).
  - 미해결 질문 4개 (현재 도구·스택 결정·자체개발 vs 노코드·우선순위).
- **raw/inbox/CLAUDE.md 보강**: `iboss-근육돌이.bak/` 229 파일에 대한 안내 추가.
  - 사장님 마케팅 정리 이전 백업이라 명시. 프로그램 도메인 ingest 대상 아님.
  - 삭제 X, 보존. 사장님 결정 대기.
- 첫 entity·source 페이지는 사장님이 실제 자동화 시도 시작할 때 신설.

## 2026-05-09

- 도메인 셋업: 마케팅 도메인과 평행한 프로그램 도메인 신설.
- 4층 구조 (raw / wiki / 아웃풋), wiki 하위 4분류 (sources · concepts · entities · syntheses).
- CLAUDE.md는 마케팅 도메인과 동일한 운영 규칙 사용 (도메인 무관 규칙이라 그대로 미러).
- 첫 ingest 대기 중.

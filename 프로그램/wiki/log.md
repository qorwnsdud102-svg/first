# 위키 로그 — 프로그램

> Ingest · Lint · 구조 변경의 일자별 기록. **최신이 위.**
> 한 줄이면 충분. 시간성을 잃지 않는 게 목적.

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

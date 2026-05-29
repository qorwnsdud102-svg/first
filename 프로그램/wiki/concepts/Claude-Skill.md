---
type: 개념
aliases: [스킬, 클로드 스킬, Skill, Claude Code Skill, SKILL.md, 직원 5명]
status: growing
sources: [프로그램/raw/ccfm-강동이/2026-05-09_강동이_Claude-Code-기본-교육-교안.md, 마케팅/raw/iboss-근육돌이/2026-04-07_근육돌이_AI-에이전트-빌딩-,-이-10가지-해봤으면-당신은-중급-일껄요.md, 프로그램/raw/karpathy/2026-04-20_forrestchang_andrej-karpathy-skills.md]
updated: 2026-05-29
---

# Claude Skill

## 한 줄 정의

클로드 코드 안에 미리 깔려 있는 **재사용 가능한 행동 매뉴얼**. 베이커리 비유로 "빵 하나를 실제로 만들어내는 전문 직원" — 가게 전체 룰(MD)이 아니라 특정 작업을 실제로 수행하는 단위.

## 핵심 주장 / 속성

- **MD와 다르다** — MD = 가게 전체에 늘 깔린 룰(상시), 스킬 = 특정 작업을 실제로 굴리는 직원(필요 시 호출).
- **반복 패턴을 굳혀 자산화** — 프롬프트를 반복 입력하고 있다면 스킬로 체계화할 때 (i-boss 근육돌이 표현). 한 번 만들어두면 계속 재사용, 결과물 품질 일관.
- **5개 역할로 사이클을 돈다** — 교안의 핵심 모델. 한 사이클로 이어질 때 반복 업무가 진짜 자동화됨.
- **사장님 환경 13+개 스킬 설치** — [[superpowers]] 14개 + [[karpathy-guidelines]] 1개 + 백오피스 스킬 다수. PDF는 이론 5명, 사장님은 실전용 13+로 확장.
  - [[karpathy-guidelines]] 실물 ingest 완료 (2026-05-29) — 4원칙 = MD 성격의 베이스라인 규범집, 5인 사이클 안의 자리 아님. 자세한 매핑은 아래 §매핑 근거.

## 5역할 ↔ 사장님 실제 스킬 매핑 (1역할 = 1스킬)

| # | PDF 비유 | 역할 본질 | **사장님 운영 스킬** (1개 픽) |
|---|---|---|---|
| ① | **bob** 메뉴 기획자 | 큰 그림·구조 잡기 | **`brainstorming`** |
| ② | **dd** 작업반장 | step-01·02·03 분배 | **`writing-plans`** |
| ③ | **harness** 위생·안전 매니저 | 이번 작업 한정 룰 강제 = 위생 게이트 | **`verification-before-completion`** |
| ④ | **eval** 시식 평가자 | 독립 채점 (90/70점) | **`requesting-code-review`** |
| ⑤ | **learnings engine** 일지 막내 | 교훈 자동 누적 → 다음 사이클 자동 참고 | **`writing-skills`** |

**프로그램 만들 때 5스킬 사이클**: `brainstorming` → `writing-plans` → 실행 중 `verification-before-completion` 강제 → `requesting-code-review` → `writing-skills`로 교훈 굳히기 → 다음 사이클 `brainstorming`에 누적 반영.

### 매핑 근거

- bob → brainstorming: 정의 그대로 "아이디어→설계".
- dd → writing-plans: "step-01·02·03 분배" = 계획 문서화. `executing-plans`·`subagent-driven-development`는 이 다음 실행 단계라 dd 본질은 writing-plans.
- harness → verification-before-completion: "증거 없이 완료 주장 금지" = 위생 게이트 본질. [[karpathy-guidelines]]는 일반 규범집(=MD 파일 성격)이라 harness와 본질이 다름. **2026-05-29 실물 ingest로 확정** — karpathy-guidelines 4원칙은 작업 무관 베이스라인이지, "이번 작업 한정 룰"이 아님.
- eval → requesting-code-review: "독립된 평가자에게 채점 요청" = 시식 평가자 호출. 클로드 자기가 자기 채점 X.
- learnings engine → writing-skills: 반복 부딪힌 패턴 → 스킬로 굳히기 = 다음 사이클 자동 반영. auto-memory·위키는 인프라(저장소).

## 보조·백업 스킬 (5인 외 11+)

본 5개를 굴릴 때 상황별 보조:

- 실행 가속: `executing-plans`, `subagent-driven-development`, `dispatching-parallel-agents`, `using-git-worktrees`
- 디버깅·재시작: `systematic-debugging`
- 리뷰 수신부: `receiving-code-review`
- 테스트 우선 흐름: `test-driven-development`
- 마무리: `finishing-a-development-branch`
- 메타: `using-superpowers` (스킬 호출 자체의 룰), `karpathy-guidelines` (행동 규범집)

## 다른 엔티티와의 관계

- [[클로드-베이커리-비유]] — 스킬을 다른 3축 (MD·훅·WIKI)과 함께 한 장으로 정리한 비유.
- [[바이브-코딩]] — 스킬은 바이브 코딩의 재사용 단위.
- [[Hook]] — 스킬과 별개 레이어. 훅은 스킬 호출 외에도 자동 발동.
- [[MCP]] — 외부 도구·데이터 연결 표준. 스킬과는 다른 축이지만 함께 쓰임.

## 내 생각 / 미해결 질문

- 사장님 실제 13개로 한정한 운영용 목록은 따로 명시 안 됨 — 추정으로는 [[superpowers]] 14 - `using-superpowers`(메타) = 13.
- 매핑 검수 필요 항목:
  - learnings engine을 `writing-skills`로 굳히는 게 맞을지? (대안: `receiving-code-review`로 매번 피드백 반영하는 게 더 "교훈 누적"에 가까울 수도)
  - ~~harness를 `verification-before-completion`이 아니라 `karpathy-guidelines`로 잡는 안도 유효~~ — **2026-05-29 ingest로 기각**. [[karpathy-guidelines]] SKILL.md 실물 확인 결과 4원칙 모두 "작업 무관 베이스라인"이라 harness 본질("이번 작업 한정 룰 강제")과 안 맞음. karpathy-guidelines는 베이커리 비유에서 MD 축(가게 운영 매뉴얼)에 가깝지 5인 사이클 안의 직원 자리는 아님.

## 출처

- `프로그램/raw/ccfm-강동이/2026-05-09_강동이_Claude-Code-기본-교육-교안.md` §PART 3-2 (P.18-24)
- `마케팅/raw/iboss-근육돌이/2026-04-07_근육돌이_AI-에이전트-빌딩-,-이-10가지-해봤으면-당신은-중급-일껄요.md` §⑤ 스킬 개념 이해, §⑥ 하네스+검증 서브에이전트
- `프로그램/raw/karpathy/2026-04-20_forrestchang_andrej-karpathy-skills.md` — `karpathy-guidelines` 스킬 실물 SKILL.md (=MD 성격 베이스라인 규범집 확인)

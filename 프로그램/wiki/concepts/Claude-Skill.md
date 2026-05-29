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
- **진짜 필요한 것 = 5인 역할분담이 작동하는 상태** (모든 PC 공통). 14스킬을 다 깔라는 게 아니라, 5스킬이 1:1로 5역할에 매핑돼 작동해야 한다는 뜻.
  - 5스킬: `brainstorming` · `writing-plans` · `verification-before-completion` · `requesting-code-review` · `writing-skills` (자세한 매핑은 아래 표).
  - **설치 권장 방식**: 이 5스킬은 [[superpowers]] 저장소에 함께 들어있음. 플러그인 통설치(14스킬 다 들어옴)보다 **5개만 cherry-pick** 권장 — 안 쓰는 9스킬이 자동 발동돼 혼란만 늘림. 자세한 절차는 §설치 방법.
  - **추가로 깔 베이스라인 규범**: [[karpathy-guidelines]] 1스킬 (별도 저장소 `forrestchang/multica-ai`). 5인 사이클이 도는 동안 늘 깔린 가게 매뉴얼 역할. 2026-05-29 실물 ingest로 확정 — 4원칙 = MD 성격이지 5인 사이클 안 자리 아님.
  - 각 PC에서 Claude Code 처음 띄울 때 **5역할이 실제로 작동하는지** 점검 → 안 되면 §설치 방법 따라 설치.

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

## 보조·백업 스킬 ([[superpowers]] 14스킬 중 5인 외 9)

본 5개를 굴릴 때 상황별 보조:

- 실행 가속: `executing-plans`, `subagent-driven-development`, `dispatching-parallel-agents`, `using-git-worktrees`
- 디버깅·재시작: `systematic-debugging`
- 리뷰 수신부: `receiving-code-review`
- 테스트 우선 흐름: `test-driven-development`
- 마무리: `finishing-a-development-branch`
- 메타: `using-superpowers` (스킬 호출 자체의 룰)
- 별도 묶음의 메타: [[karpathy-guidelines]] (행동 규범집, superpowers와 별개 마켓플레이스)

## 설치 방법 (모든 PC 공통)

**원칙**: 5역할에 매핑되는 5스킬 + [[karpathy-guidelines]] 1스킬 = **6개만** 깔린 상태가 목표. [[superpowers]] 플러그인 통째로 깔면 14스킬이 다 들어와서 5개 외 9개는 안 쓰는데 자동 발동돼 혼란만 늘림 — 비효율. → **cherry-pick 방식 권장**.

### 점검 (먼저 깔려있는지 확인)

```
ls ~/.claude/skills/
```
또는 PowerShell:
```
ls "$env:USERPROFILE\.claude\skills"
```
→ 다음 6개 폴더가 다 보이면 OK:
`brainstorming` · `writing-plans` · `verification-before-completion` · `requesting-code-review` · `writing-skills` · `karpathy-guidelines`

빠진 게 있으면 아래 설치 절차.

### 설치 — 5역할 스킬 (cherry-pick from [[superpowers]])

**Bash / macOS / Linux**:
```bash
git clone https://github.com/obra/superpowers.git /tmp/sp
mkdir -p ~/.claude/skills
for s in brainstorming writing-plans verification-before-completion requesting-code-review writing-skills; do
  cp -r /tmp/sp/skills/$s ~/.claude/skills/
done
rm -rf /tmp/sp
```

**PowerShell / Windows**:
```powershell
$tmp = "$env:TEMP\sp"
git clone https://github.com/obra/superpowers.git $tmp
$dst = "$env:USERPROFILE\.claude\skills"
New-Item -ItemType Directory -Force -Path $dst | Out-Null
'brainstorming','writing-plans','verification-before-completion','requesting-code-review','writing-skills' |
  ForEach-Object { Copy-Item -Recurse "$tmp\skills\$_" $dst }
Remove-Item -Recurse -Force $tmp
```

### 설치 — [[karpathy-guidelines]] (1스킬, 베이스라인 규범)

karpathy-guidelines는 저장소 자체가 1스킬만 들어있어 cherry-pick·플러그인 어느 쪽이든 같은 결과. 가장 단순한 cherry-pick:

**Bash**:
```bash
git clone https://github.com/multica-ai/andrej-karpathy-skills.git /tmp/kg
cp -r /tmp/kg/skills/karpathy-guidelines ~/.claude/skills/
rm -rf /tmp/kg
```

**PowerShell**:
```powershell
$tmp = "$env:TEMP\kg"
git clone https://github.com/multica-ai/andrej-karpathy-skills.git $tmp
Copy-Item -Recurse "$tmp\skills\karpathy-guidelines" "$env:USERPROFILE\.claude\skills\"
Remove-Item -Recurse -Force $tmp
```

### 설치 확인

```
ls ~/.claude/skills/
```
6개 폴더 다 보이면 끝. 또는 임의 프로젝트에서 `brainstorming` 스킬이 호출 가능한지 테스트.

### Step 3 — 유저 CLAUDE.md (메타 프레임 글로벌화)

위 6스킬만 깔면 **스킬 본체는 작동**하지만, "5인 역할분담"이라는 메타 프레임은 vault 위키 안에만 있어 vault 밖 프로젝트 세션엔 안 보임. 모든 세션이 5인 사이클을 인지하게 하려면 [[스킬-스코프]] §유저 CLAUDE.md 절차 추가 실행. canonical 사본을 `~/.claude/CLAUDE.md`로 저장.

### 안 쓰는 보너스 스킬이 필요해질 경우

5역할 외 9스킬(executing-plans · systematic-debugging · receiving-code-review · test-driven-development · finishing-a-development-branch · using-superpowers · using-git-worktrees · dispatching-parallel-agents · subagent-driven-development)이 나중에 진짜 필요하다 싶으면 그때 같은 cherry-pick 방식으로 1개씩 추가. **묶음으로 14개 통설치는 지양**.

## 다른 엔티티와의 관계

- [[스킬-스코프]] — 본 스킬들이 **어디 살고 언제 발동되는지**의 메커니즘 (user-level vs project-level / description 매칭 auto-trigger / ~/.claude/CLAUDE.md baseline).
- [[클로드-베이커리-비유]] — 스킬을 다른 3축 (MD·훅·WIKI)과 함께 한 장으로 정리한 비유.
- [[바이브-코딩]] — 스킬은 바이브 코딩의 재사용 단위.
- [[Hook]] — 스킬과 별개 레이어. 훅은 스킬 호출 외에도 자동 발동.
- [[MCP]] — 외부 도구·데이터 연결 표준. 스킬과는 다른 축이지만 함께 쓰임.

## 내 생각 / 미해결 질문

- ~~사장님 실제 13개로 한정한 운영용 목록은 따로 명시 안 됨 — 추정으로는 superpowers 14 - `using-superpowers`(메타) = 13.~~ — **2026-05-29 해결**: [[superpowers]] 플러그인은 14스킬, [[karpathy-guidelines]] 1스킬 = 합 15스킬이 정식 필요 묶음. 13/14 추정은 사라짐.
- 매핑 검수 필요 항목:
  - learnings engine을 `writing-skills`로 굳히는 게 맞을지? (대안: `receiving-code-review`로 매번 피드백 반영하는 게 더 "교훈 누적"에 가까울 수도)
  - ~~harness를 `verification-before-completion`이 아니라 `karpathy-guidelines`로 잡는 안도 유효~~ — **2026-05-29 ingest로 기각**. [[karpathy-guidelines]] SKILL.md 실물 확인 결과 4원칙 모두 "작업 무관 베이스라인"이라 harness 본질("이번 작업 한정 룰 강제")과 안 맞음. karpathy-guidelines는 베이커리 비유에서 MD 축(가게 운영 매뉴얼)에 가깝지 5인 사이클 안의 직원 자리는 아님.

## 출처

- `프로그램/raw/ccfm-강동이/2026-05-09_강동이_Claude-Code-기본-교육-교안.md` §PART 3-2 (P.18-24)
- `마케팅/raw/iboss-근육돌이/2026-04-07_근육돌이_AI-에이전트-빌딩-,-이-10가지-해봤으면-당신은-중급-일껄요.md` §⑤ 스킬 개념 이해, §⑥ 하네스+검증 서브에이전트
- `프로그램/raw/karpathy/2026-04-20_forrestchang_andrej-karpathy-skills.md` — `karpathy-guidelines` 스킬 실물 SKILL.md (=MD 성격 베이스라인 규범집 확인)

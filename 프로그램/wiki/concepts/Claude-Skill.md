---
type: 개념
aliases: [스킬, 클로드 스킬, Skill, Claude Code Skill, SKILL.md, 직원 5명]
status: growing
sources: [프로그램/raw/ccfm-강동이/2026-05-09_강동이_Claude-Code-기본-교육-교안.md, 마케팅/raw/iboss-근육돌이/2026-04-07_근육돌이_AI-에이전트-빌딩-,-이-10가지-해봤으면-당신은-중급-일껄요.md, 프로그램/raw/karpathy/2026-04-20_forrestchang_andrej-karpathy-skills.md, 마케팅/raw/iboss-근육돌이/]
updated: 2026-08-19
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

## [[마케팅/근육돌이]] 보강 — 3단 사다리와 조직 도입 5단계 (2026-07~08 신규 11편)

### 프롬프트 → 스킬 → 에이전트 3단 사다리

같은 일을 어느 층에 두느냐의 문제. 근육돌이의 서술을 이 볼트 용어로 정리하면:

| 층 | 정체 | 언제 |
|---|---|---|
| **프롬프트** | 매번 쓰는 지시문 | 1회성. **"매번 새로 쓰면 매번 다른 품질이 나온다"**(71348:396) |
| **스킬** | 잘 나온 지시문을 **파일로 저장해 재사용**. 기준·금지사항·단계가 문서로 고정 | 같은 일을 두 번째 시킬 때 — **여기서부터 품질이 재현된다** |
| **에이전트/파이프라인** | 폴더 규약으로 단계가 이어지고, 사람 게이트만 남음 | 반복이 절차로 묶일 때 → [[파이프라인-스킬-패키지]] |

**막히는 지점이 층을 알려준다** (71608:518-522): **반복 몇 개를 넘기는 데서 막히면** 일을 단계로 못 쪼갠 것(2번 조건) / **절차로 묶는 데서 막히면** 기준이 머릿속에만 있는 것(6번 조건 = 암묵지).

### 조직 도입 5단계 — 3~4단계만 가도 리소스 50% 절감

> "재미로 써보는 단계에서 시작해서, **반복 업무 몇 개를 넘기는 단계**로 가고, 그 **반복을 절차로 묶는 단계**로 갑니다." (71608:518)
> "자잘한 자동화가 쌓여서 어느 단계(**보통 3~4단계**)에 도달하면 **팀 리소스가 50%까지** 줄어듭니다." (71188:859-861)

- 시작점은 딱 하나의 질문 — **"지금 사람이 꼭 안 해도 되는 일을, 사람이 붙잡고 있지 않나?"**
- **거창한 AI 프로젝트부터 벌이지 말 것.** **20분 걸리던 걸 2분으로 줄이는 과제**부터(이미지 리사이즈·경쟁사 소재 모니터링·리뷰 수백 개 정리). n8n + Claude 조합으로 **월 10~20만 원**이면 해결. (71188:855-861)
- 판별 질문: **"이걸 100번 하면 결과가 좋아지나?"** → 좋아지는 일(소재 제작·카피 후보·시장조사·분류·요약)은 AI 몫. (71608:210-212)

### 사람 몫은 두 종류다 (71608:214-236)

"중요한 일"로 뭉뚱그리면 구분이 안 되므로 나눈다.

1. **관계에서 나오는 판단** — 광고주가 "이번 달은 좀 줄여보죠"라고 할 때 그게 진짜 감액인지 **"설득해달라"는 신호**인지. 데이터에 안 나오고 **표정·말투·지난 반년의 관계**에서 나온다. 팀 안에서도 같다(이 팀원에게 일을 더 주는 게 성장인지 번아웃인지).
2. **경험에서 나오는 인지** — 숫자는 다 정상인데 뭔가 이상한 날. **"감이 아니라 압축된 경험"** — 비슷한 상황을 수백 번 본 사람의 머릿속에서 이유보다 결론이 먼저 나오는 것. AI는 내가 준 데이터 안에서만 보고, **3년 전에 데인 기억은 데이터에 없다**.

⚠️ **비워진 시간을 미리 예약하지 않으면 성과는 안 바뀐다** — "AI가 벌어준 시간을 비워두면 그냥 일이 줄어든 것"이고, 사람은 빈 시간을 잡일로 채운다. 전환율 손보기·리뷰 읽기·다음 실험 설계 같은 일로 **시간을 미리 박아둔다**. (71608:266-272)

### 스킬 작성의 실전 규칙

- **"신입한테 설명 못 하는 일은 AI한테도 설명 못 한다."** 자가 진단: 오늘 들어온 신입에게 넘긴다 생각하고 종이에 단계를 적는다 — **3단계에서 막히면 AI도 3단계에서 막힌다.** (71608:194-198)
- **5단계로 보이는 업무가 실제로는 30단계**다. 이 숨은 단계가 **자동화가 70%에서 멈추는 진짜 이유** — 앞 70%는 잘 돌아가는데 나머지 30%에서 매번 사람이 붙어야 하는 상황. AI가 못해서가 아니라 **그 30% 안의 단계를 한 번도 문장으로 적어본 적이 없어서**다. (71608:166-180)
- **"역설적으로 잘하는 사람일수록 자기 일을 못 쪼갠다"** — 숙련될수록 단계가 머릿속에서 뭉쳐지기 때문. 이걸 인식하고 있느냐가 갈림길.
- **빈칸을 안 남긴다**: "자막 배치해줘"는 지시가 아니라 일감 투척. 실제로 주는 건 데드존 비율·세이프 영역 기준 위치·한 줄 최대 글자 수·두 줄 처리·폰트/굵기·컬러/외곽선·음성 대비 프레임 오프셋 등 **100개가 넘는 체크리스트**. **"이 100개를 주면 AI가 정말 잘해낸다. 100번을 시켜도 100번 다 지킨다."** (71608:344-358)
  - 반론 "그걸 다 적을 시간에 내가 하고 말지"에 대한 답: **"한 번만 적으면 되고, 그 뒤로는 100개를 만들든 1,000개를 만들든 그대로 지켜진다. 내가 손으로 하면 열 개째부터 내가 흔들린다."** (71608:360-363)
- **복명복창을 지시문에 넣는다**: 바로 만들라고 하지 말고 **"네가 이해한 걸 먼저 세 줄로 요약해봐"**. 어긋나 있으면 만들기 전에 잡힌다 — 이 습관 하나로 수정 횟수가 3~4회에서 1~2회로. (71608:322-325)
- **감상을 지시로 번역한다** — "AI스러워요"에 **왜를 5번** 물으면 구체 용어가 나온다: AI스럽다 → 사람 표정이 어색 → 웃는데 눈이 안 웃음 → 지시는 **"웃는 장면에서 눈가 주름이 같이 잡히게"**. (71608:376-386)
- **암묵지는 반려 사유 한 줄부터**: 반려할 때마다 왜 반려했는지 한 줄 적는다("첫 문장이 제품 얘기부터 시작해서" / "고객이 안 쓰는 단어를 써서"). **열 줄, 스무 줄 쌓이면 그게 곧 기준이고, 그 기준을 그대로 AI에 넘긴다.** (71608:442-450)

### 스킬을 잘 쓰는 사람 = 위임을 해본 사람

**"AI 활용은 새로운 기술이 아니라 위임 기술"**이다. 팀 목표를 **조각의 합이 전체가 되게** 쪼개고 조각마다 따로 피드백하는 능력이 그대로 옮겨온다. 실제 관찰 — **AI를 제일 잘 쓰는 사람은 가장 어린 사람도, 컴퓨터를 제일 잘 다루는 사람도 아니라 후배 데리고 성과 내본 경험이 있는 사람**이었다. (71608:276-320)

⚠️ **사람에겐 관대하고 AI에겐 엄격한 편향**: 신입이 70점을 가져오면 "여기랑 여기 고쳐서 다시" 하고 3~4번 돌려 90점을 받는다. **AI가 70점을 내놓으면 "역시 AI는 안 되네" 하고 창을 닫는다.** 같은 70점인데 라벨이 다르다. → **AI 첫 결과물도 70~80점 기준점으로 놓고 3~5번 돌리는 게 정상 루트.** (71608:302-314)

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
- `마케팅/raw/iboss-근육돌이/` __71608·__71348·__71188 — 프롬프트→스킬→에이전트 3단 사다리, 조직 도입 5단계(3~4단계=리소스 50%↓), 빈칸 없는 지시, 위임 기술론

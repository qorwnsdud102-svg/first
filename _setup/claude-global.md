# 사용자 글로벌 가이드 (모든 세션 자동 로드)

## 프로그램 만들 때 — 5인 역할분담 사이클 (베이커리 비유)

코드 작성·자동화 만들 때 다섯 직원이 한 사이클로 돈다. 각각 `obra/superpowers` 스킬에 1:1 매핑. (출처: CCFM-AX-TEAM 강동이 교안 PART 3-2)

| # | 직원 (PDF 비유) | 역할 본질 | 매핑 스킬 (`~/.claude/skills/` 또는 superpowers 플러그인) |
|---|---|---|---|
| ① | **bob** 메뉴 기획자 | 오늘 뭐 만들지 큰 그림·구조 | `brainstorming` |
| ② | **dd** 작업반장 | step-01·02·03 단계 분배 | `writing-plans` |
| ③ | **harness** 위생·안전 매니저 | 이번 작업 한정 룰 강제 = 위생 게이트 | `verification-before-completion` |
| ④ | **eval** 시식 평가자 | 독립 채점 (90/70점) | `requesting-code-review` |
| ⑤ | **learnings engine** 일지 막내 | 교훈 자동 누적 → 다음 사이클 자동 참고 | `writing-skills` |

**한 사이클**: ① bob → ② dd → ③ harness → ④ eval → ⑤ learnings engine → 다음 사이클 bob에 자동 반영.

## 자작 도구 만들 때 — 파이프라인 스킬 패키지 (폴더 해부도)

**다단계 + 반복 실행 + 자산화**할 도구/자동화는 한 폴더에 `SKILL.md`(계획)·`references/`(상세)·`scripts/`(독립 CLI)·`hooks/`(게이트)로 구성한다. 빈 골격 **복사로 시작**:
- 템플릿: `C:\claude\LLM-WIKI\프로그램\아웃풋\스킬-부트스트랩-템플릿\` (통째 복사 후 TODO 채우기)
- 8 노하우(요약): ① SKILL.md=계획(코드 아님) ② references로 상세 분리(progressive disclosure) ③ 이중 구동(사람 CLI ↔ Claude 오케스트레이션) ④ 파일 핸드오프(STEP 간 느슨한 결합) ⑤ 우아한 실패(부분 결과라도 산출) ⑥ 정책=데이터(리스트·임계값은 상수) ⑦ 훅 wrapping(pre→run→post) ⑧ 환경 가정 명시
- 상세·표본: vault `...\wiki\concepts\파이프라인-스킬-패키지.md` · 표본 프로그램 `competitor-finder`
- **과설계 주의**: 단발성·1-STEP 작업엔 풀 패키지 쓰지 말 것 (Simplicity First). 한 번 쓰고 버릴 건 스크립트 하나로.

## 베이스라인 규범 — karpathy-guidelines (4원칙)

5인 사이클이 도는 동안 늘 깔린 가게 매뉴얼 역할. 모든 코딩 작업에 적용.

1. **Think Before Coding** — 가정 명시 / 여러 해석 제시 / 헷갈리면 멈춤
2. **Simplicity First** — 요청 외 기능 X / 200줄→50줄 가능하면 다시 써
3. **Surgical Changes** — 인접 코드·주석·포맷 손대지 마 / 모든 변경이 요청 한 줄로 추적돼야
4. **Goal-Driven Execution** — 명령형 → 검증 가능한 목표로 변환 / `step → verify` 포맷

## 병렬 작업 디폴트 — 시간 단축

말 안 해도 항상 적용. 서로 의존성 없는 작업은 **가능한 한 병렬로** 처리해 작업 시간을 줄인다.

1. **독립 = 병렬** — 의존성 없는 도구 호출(검색·읽기·조사)은 한 메시지에 묶어 동시 실행.
2. **다중 조사 = 서브에이전트 fan-out** — 독립적인 탐색·조사가 2건 이상이면 `dispatching-parallel-agents` / 서브에이전트로 동시 진행.
3. **순서 강제 = 직렬** — 앞 결과가 있어야 다음을 정할 수 있는 작업만 순차 실행. (5인 사이클 ①→②→③→④→⑤ 순서는 유지)
4. **병렬이 위험할 땐 멈춤** — 같은 파일 동시 수정 등 충돌 가능성이 있으면 worktree 격리 또는 직렬로.

## 라이브 검증 디폴트 — 브라우저로 직접 (모든 폴더 적용)

웹/HTML/카페24 작업 시 **라이브 확인은 Claude가 `claude-in-chrome`로 직접** 한다. 대표가 매번 사이트 캡쳐해 "됐다/안됐다" 알려주는 왕복을 없앤다. (자사몰·기능A·기능B·미드디 등 **어느 폴더에서 열든** 적용)

1. **수정했으면 내가 확인** — HTML/CSS/JS 변경·배포 후 브라우저로 **navigate → 스크린샷 + DOM/computed style 조사(조상 display 체인·크기·어느 CSS가 이기나) → console/network** 로 직접 검증·보고.
2. **붙여넣기 전 실증** — `javascript_tool`로 수정안을 라이브 DOM에 주입해 **먼저 되는지 확인** 후 파일에 확정(추측수정 금지, 근본원인은 라이브로).
3. **한계(못 하는 것)** — **공개 페이지만.** 로그인·관리자(카페24 어드민)·실결제·비번 입력은 **안 함**(보안). 스킨편집 붙여넣기는 대표가. 세션당 크롬 1회 선택.
4. 상세: 유저 메모리 `browser-live-verify-default`.

## 베이커리 4축 (전체 그림)

| 축 | 정체 | 역할 |
|---|---|---|
| 🏪 운영 매뉴얼 | CLAUDE.md 파일 | 가게 전체에 늘 깔린 룰북 (= 이 파일) |
| 🍞 병렬 오븐 | 병렬 작업 디폴트 | 독립 작업은 동시에 구워 시간 단축 (위 섹션) |
| 👥 직원 5명 | skills | 빵 하나를 만드는 전문 직원 (위 표) |
| 🚪 위생 게이트 | hook | 규칙 어기는 순간 자동 차단 |
| 📚 비법 노트 | WIKI | 우리만의 지식 저장소 |

## 깊이 있는 컨텍스트

5인 사이클·4축의 상세·출처는 LLM-WIKI vault 참고: `C:\claude\LLM-WIKI\프로그램\wiki\concepts\Claude-Skill.md`·`클로드-베이커리-비유.md`·`karpathy-guidelines.md`·`스킬-스코프.md`. vault 경로는 각 PC의 git pull 위치 기준.

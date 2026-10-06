---
type: 작품
aliases: [superpowers, obra/superpowers, Superpowers Plugin, Claude Code Superpowers]
status: stub
sources: [프로그램/raw/karpathy/2026-04-20_forrestchang_andrej-karpathy-skills.md]
updated: 2026-10-06
---

# superpowers (Claude Code 플러그인 — 작업 순서 스킬 14개 묶음)

## 한 줄 정의

[obra/superpowers](https://github.com/obra/superpowers) — Claude에게 "기획 → 계획 → 실행 → 검증 → 검토" 같은 **일하는 순서**를 가르치는 스킬 14개 묶음 플러그인. 그중 5개가 베이커리 5인 역할([[클로드-베이커리-비유]])에 1:1로 대응한다. 현재 운영 방식은 **플러그인 통설치(14개 전부)**.

## 14스킬 카테고리

GitHub README 기준 (2026-05-29 확인). **굵게 = 5인 사이클 매핑**, 나머지는 보조.

- **Testing (1)**: `test-driven-development`
- **Debugging (2)**: `systematic-debugging`, **`verification-before-completion`** ← harness
- **Collaboration (9)**: **`brainstorming`** ← bob · **`writing-plans`** ← dd · `executing-plans` · `dispatching-parallel-agents` · **`requesting-code-review`** ← eval · `receiving-code-review` · `using-git-worktrees` · `finishing-a-development-branch` · `subagent-driven-development`
- **Meta (2)**: **`writing-skills`** ← learnings engine · `using-superpowers`

## 5인 사이클과의 매핑

[[Claude-Skill]] §5역할 ↔ 사장님 실제 스킬 매핑 표 참고.

| PDF 비유 | superpowers 스킬 |
|---|---|
| bob 메뉴 기획자 | `brainstorming` |
| dd 작업반장 | `writing-plans` |
| harness 위생·안전 매니저 | `verification-before-completion` |
| eval 시식 평가자 | `requesting-code-review` |
| learnings engine 일지 막내 | `writing-skills` |

나머지 9스킬은 실행 가속·병렬·디버깅·메타 역할 — 실제로 자주 쓰인다: `subagent-driven-development`(계획을 서브에이전트로 실행), `dispatching-parallel-agents`(병렬 조사), `systematic-debugging`(버그).

## 설치 방식 — 통설치가 현행

- **현행 (2026-10-06 확인)**: 플러그인 통설치(`superpowers-dev`, 14스킬). 대규모 작업(위키 대청소·UI/UX ingest)에서 brainstorming → writing-plans → subagent-driven-development → 리뷰까지 14스킬 체인이 그대로 쓰였고 문제없었다.
- **옛 방침 (2026-05)**: "5스킬만 골라(cherry-pick) `~/.claude/skills/`에 복사, 통설치 지양" — 안 쓰는 9개가 자동 발동해 맥락을 어지럽힐 거라는 우려 때문. 실제 운영에서 그 우려보다 나머지 9개(병렬·서브에이전트 실행)의 쓸모가 컸다.
- 설치 명령: `_setup/README.md` §스킬·플러그인 설치.

## 다른 엔티티와의 관계

- [[Claude-Skill]] — 본 플러그인이 그 안의 14개 SKILL.md 모음이라는 점에서 Claude-Skill 개념의 실제 인스턴스.
- [[스킬-스코프]] — 플러그인은 user-level로 깔려 CWD 무관하게 작동.
- [[karpathy-guidelines]] — 함께 까는 1스킬. 별개 저장소(`forrestchang/andrej-karpathy-skills`).
- [[클로드-베이커리-비유]] — 5인 사이클의 5스킬이 본 플러그인 안에 있음.

## 내 생각 / 미해결 질문

- **본 페이지 = stub**: superpowers 자체에 대한 raw 직접 ingest는 없음(GitHub README 검증으로만 확정).
- **통설치의 비용**: 스킬은 키워드로 자동 발동되므로, 간단한 질문에도 brainstorming 같은 무거운 절차가 끼어들 수 있다. 끼어듦이 거슬리면 그때 다시 cherry-pick을 검토.

## 출처

- `프로그램/raw/karpathy/2026-04-20_forrestchang_andrej-karpathy-skills.md` — karpathy-guidelines README가 superpowers 14스킬 묶음을 메타로 언급.
- GitHub `obra/superpowers` README (2026-05-29 WebFetch 검증) — 14스킬 이름·카테고리·설치 커맨드 출처.
- 설치 상태: 2026-10-06 이 PC `~/.claude/plugins/cache/superpowers-dev/superpowers/5.1.0/skills/` 14개 확인, `~/.claude/skills/`에는 superpowers 스킬 없음.

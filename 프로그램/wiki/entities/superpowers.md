---
type: 작품
aliases: [superpowers, obra/superpowers, Superpowers Plugin, Claude Code Superpowers]
status: stub
sources: [프로그램/raw/karpathy/2026-04-20_forrestchang_andrej-karpathy-skills.md]
updated: 2026-05-29
---

# superpowers (Claude Code 플러그인 — 5스킬 cherry-pick 저장소)

## 한 줄 정의

[obra/superpowers](https://github.com/obra/superpowers) — Claude Code용 14개 스킬 묶음 플러그인. 본 vault는 **이 14개를 통설치하지 않고, 베이커리 5역할에 대응하는 5스킬만 cherry-pick으로 빼서 사용**. 안 쓰는 9스킬을 같이 깔면 자동 발동돼 혼란만 늘리는 비효율이라 — superpowers는 우리 입장에서 "5스킬을 추출하는 GitHub 소스 저장소"의 의미가 더 크다.

## 14스킬 카테고리 (그 중 5개만 cherry-pick)

GitHub README 기준 (2026-05-29 확인). **굵게 = 5인 사이클 매핑으로 cherry-pick 대상**, 나머지는 보너스 (필요해질 때 개별 추가).

- **Testing (1)**: `test-driven-development`
- **Debugging (2)**: `systematic-debugging`, **`verification-before-completion`** ← harness
- **Collaboration (9)**: **`brainstorming`** ← bob · **`writing-plans`** ← dd · `executing-plans` · `dispatching-parallel-agents` · **`requesting-code-review`** ← eval · `receiving-code-review` · `using-git-worktrees` · `finishing-a-development-branch` · `subagent-driven-development`
- **Meta (2)**: **`writing-skills`** ← learnings engine · `using-superpowers`

저장소 layout: `skills/<이름>/SKILL.md` (일부는 보조 파일 동반). cherry-pick할 때 폴더 통째로 복사 (SKILL.md만 X).

## 5인 사이클과의 매핑

[[Claude-Skill]] §5역할 ↔ 사장님 실제 스킬 매핑 표 참고. superpowers 14스킬 중 5개가 베이커리 5명 직원 자리에 1:1 대응:

| PDF 비유 | superpowers 스킬 |
|---|---|
| bob 메뉴 기획자 | `brainstorming` |
| dd 작업반장 | `writing-plans` |
| harness 위생·안전 매니저 | `verification-before-completion` |
| eval 시식 평가자 | `requesting-code-review` |
| learnings engine 일지 막내 | `writing-skills` |

나머지 9스킬은 보조·실행 가속·디버깅·메타 역할.

## 설치 (cherry-pick 5스킬만)

자세한 절차는 [[Claude-Skill]] §설치 방법 참고. 한 줄 요약:

```bash
git clone https://github.com/obra/superpowers.git /tmp/sp
for s in brainstorming writing-plans verification-before-completion requesting-code-review writing-skills; do
  cp -r /tmp/sp/skills/$s ~/.claude/skills/
done
rm -rf /tmp/sp
```

**플러그인 통설치 X** — 14개 다 들어와서 안 쓰는 9개가 자동 발동되는 비효율 발생.

(만약 통설치 정말 필요한 상황이면 옵션 A: `/plugin marketplace add obra/superpowers-marketplace` → `/plugin install superpowers@superpowers-marketplace`, 옵션 B: `/plugin install superpowers@claude-plugins-official`. 본 vault 권장 X.)

## 다른 엔티티와의 관계

- [[Claude-Skill]] — 본 플러그인이 그 안의 14개 SKILL.md 모음이라는 점에서 Claude-Skill 개념의 실제 인스턴스.
- [[스킬-스코프]] — cherry-pick한 5스킬을 user-level(`~/.claude/skills/`)에 깔아 CWD 무관하게 작동시키는 규칙.
- [[karpathy-guidelines]] — 함께 필수로 까는 1스킬. superpowers와 별개 마켓플레이스(`forrestchang/andrej-karpathy-skills`)에서 옴.
- [[클로드-베이커리-비유]] — 5인 사이클의 5스킬이 본 플러그인 안에 있음.

## 내 생각 / 미해결 질문

- **본 페이지 = stub**: superpowers 자체에 대한 raw 직접 ingest는 없음(GitHub README 검증으로만 확정). 향후 obra의 X 글이나 superpowers 공식 가이드 ingest 시 growing→stable.
- **cherry-pick 9스킬 후보**: 5인 외 9개 중 실제로 진짜 필요해질 가능성이 있는 후보 — `executing-plans` (writing-plans 직후 실행 자동화), `systematic-debugging` (버그 빠질 때), `using-git-worktrees` (병렬 작업 시). 필요 시점에 개별 cherry-pick.
- **bulk vs cherry-pick 트레이드오프**: bulk는 "안 쓰면 그만" 같지만 스킬은 키워드 기반으로 auto-trigger되므로 깔려있으면 끼어듦 → 의도치 않은 발동·맥락 오염. 그래서 cherry-pick 디폴트.

## 출처

- `프로그램/raw/karpathy/2026-04-20_forrestchang_andrej-karpathy-skills.md` — karpathy-guidelines README가 superpowers 14스킬 묶음을 메타로 언급.
- GitHub `obra/superpowers` README (2026-05-29 WebFetch 검증) — 14스킬 이름·카테고리·설치 커맨드 출처. 본 vault에 raw 직접 ingest 안 됨, 본 페이지에 요약 형태로만 보존.

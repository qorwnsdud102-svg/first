---
type: 출처
source_file: 프로그램/raw/karpathy/2026-04-20_forrestchang_andrej-karpathy-skills.md
source_url: https://github.com/multica-ai/andrej-karpathy-skills
published: 2026-04-20
fetched: 2026-05-29
author: forrestchang (multica-ai)
intellectual_source: Andrej Karpathy (X post status/2015883857489522876)
license: MIT
domain: 프로그램
status: growing
---

# multica-ai/andrej-karpathy-skills (GitHub 저장소)

- [[Karpathy]]의 X 글에서 진단한 **LLM 코딩 4대 함정**을 [[karpathy-guidelines]] 4원칙으로 재구성한 Claude Code / Cursor용 행동 규범집. `forrestchang` (multica-ai 운영자) 패키징, MIT.
- 4원칙: **Think Before Coding** · **Simplicity First** · **Surgical Changes** · **Goal-Driven Execution**. 각 원칙이 Karpathy 진단의 어느 함정에 대응하는지 README 표로 명시.
- 동일 콘텐츠를 3가지 채널로 동시 배포 — (a) `CLAUDE.md` (per-project 머지용), (b) `skills/karpathy-guidelines/SKILL.md` (Claude Code 플러그인 마켓플레이스용), (c) `.cursor/rules/karpathy-guidelines.mdc` (Cursor 프로젝트 룰). **본질은 1개 텍스트, 배포 포장지만 다름.**
- `EXAMPLES.md` 15KB — 원칙별 ❌/✅ 코드 예시. 이 부분이 추상 규범집을 운영 가능하게 만드는 핵심 (e.g. "validate_user 버그 수정 시 인접 코드 안 건드리기" diff 예시).
- 핵심 인사이트 (Karpathy 원문): "LLMs are exceptionally good at looping until they meet specific goals... Don't tell it what to do, **give it success criteria** and watch it go." → 4번째 원칙 Goal-Driven Execution의 근거.

## 위키 위치 확정의 의미

- 이 raw는 사장님 환경에 이미 설치돼 있던 `karpathy-guidelines` 스킬의 **공식 출처**. [[Claude-Skill]]에서 "13+개 스킬 중 1개"로 추정 카운트하던 것의 실체.
- [[Claude-Skill]] 본문의 매핑 가설 검증: "harness ↔ verification-before-completion이 본질, karpathy-guidelines는 일반 규범집(MD 성격)이라 harness와 본질 다름" → SKILL.md 실물 확인 결과 **정답이었음**. karpathy-guidelines는 5인 사이클 안 자리(harness)가 아니라 베이스라인 규범 = MD 축에 가까운 스킬.

## 영향을 준 wiki 페이지

- entities (1신): [[Karpathy]] (stub — 프로그램 dominant)
- concepts (1신, 1갱신): [[karpathy-guidelines]] (신), [[Claude-Skill]] (sources 추가 + harness 매핑 가설 검증 반영)

## raw 파일

- `프로그램/raw/karpathy/2026-04-20_forrestchang_andrej-karpathy-skills.md` — README + CLAUDE.md + SKILL.md + EXAMPLES.md 4파일 verbatim 번들. CURSOR.md·README.zh.md 제외.
- 원본 GitHub: https://github.com/multica-ai/andrej-karpathy-skills (커밋 일자: 2026-04-20, 최신 커밋 "Sync Chinese README with English version")

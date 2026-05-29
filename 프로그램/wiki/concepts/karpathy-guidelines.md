---
type: 개념
aliases: [karpathy guidelines, Karpathy Guidelines, Karpathy-Inspired Claude Code Guidelines, 카파시 가이드라인]
status: growing
sources: [프로그램/raw/karpathy/2026-04-20_forrestchang_andrej-karpathy-skills.md]
updated: 2026-05-29
---

# karpathy-guidelines

## 한 줄 정의

[[Karpathy]]가 X에서 진단한 **LLM 코딩 4대 함정**(잘못된 가정·과복잡화·범위 외 수정·약한 성공기준)에 대응하는 4원칙 행동 규범집. Claude Code 스킬 / Cursor 룰 / 머지용 `CLAUDE.md` — 3가지 형태로 동일 텍스트가 동시 배포되는 **베이스라인 코딩 매뉴얼**.

## Karpathy의 4대 진단

원문 ([Andrej's X post](https://x.com/karpathy/status/2015883857489522876)):

1. **잘못된 가정** — "혼자 가정 잡고 달림, 모호함 안 캐물음, 모순 안 드러냄, 트레이드오프 안 보임, 반박해야 할 때 반박 안 함"
2. **과복잡화** — "코드·API 부풀리기 좋아함, 추상화 비대, 죽은 코드 정리 안 함, 100줄이면 될 걸 1000줄로 구현"
3. **범위 외 수정** — "충분히 이해 못 한 주석·코드를 부수효과로 변경/삭제, 본 작업과 직교한데도"
4. **약한 루프** — "LLM은 명확한 성공 기준만 있으면 루프 잘 도는데, 명령형 지시만 던지면 헛돌면서 명확화 요구만 함"

## 4원칙 (진단 ↔ 처방)

| # | 원칙 | 카파시 진단 | 핵심 룰 |
|---|---|---|---|
| 1 | **Think Before Coding** | ①잘못된 가정 | 가정 명시 / 여러 해석 제시 / 더 쉬운 길 있으면 반박 / 헷갈리면 멈춤 |
| 2 | **Simplicity First** | ②과복잡화 | 요청 외 기능 X · 단발용 추상화 X · "유연성/설정성" X · 불가능 케이스 에러핸들 X · 200줄→50줄 가능하면 다시 써 |
| 3 | **Surgical Changes** | ③범위 외 수정 | 인접 코드·주석·포맷 손대지 마 · 안 깨진 거 리팩터 X · 기존 스타일 따라가 · 죽은 코드 발견해도 말만, 삭제 X. **모든 변경 라인이 요청 한 줄로 추적돼야** |
| 4 | **Goal-Driven Execution** | ④약한 루프 | 명령형 → 검증 가능한 목표로 변환. "유효성 추가" → "잘못된 입력 테스트 짜고 통과시켜". 다단계는 `step → verify` 포맷 |

## 핵심 인사이트 (Karpathy 원문)

> "LLMs are exceptionally good at looping until they meet specific goals... Don't tell it what to do, **give it success criteria** and watch it go."

→ 4번째 원칙(Goal-Driven Execution)이 이 통찰을 운영화한 것. 약한 기준("make it work")은 끝없는 명확화 요구를, 강한 기준은 독립적 루프를 만든다.

## 트레이드오프 — 명시된 한계

- "These guidelines bias toward **caution over speed**." 사소한 작업(오타 수정·자명한 한 줄)에는 4원칙 풀가동이 오버킬.
- 목표는 **비-사소 작업의 비용 큰 실수 줄이기**이지, 모든 작업을 느리게 만드는 게 아님.

## 작동 검증 신호 (How to Know It's Working)

- diff에 불필요한 변경 적음 — 요청한 것만 보임
- 과복잡화로 인한 재작업 줄어듦 — 처음부터 단순
- **명확화 질문이 구현 *전*에 옴** (사고 친 *후*가 아니라)
- PR 깔끔하고 미니멀 — 드라이브-바이 리팩터·"개선" 없음

## 베이커리 비유에서의 자리 — MD 축 (≠ 5인 사이클)

[[클로드-베이커리-비유]]·[[Claude-Skill]] 5인 사이클 매핑 작업 시 한때 가설:
- "harness 위생·안전 매니저 = karpathy-guidelines로 매핑하면 어떨까?"

**검증 결과 X**. 이유:
- harness 본질 = "**이번 작업 한정** 룰 강제" (오븐 180°C / 발효 25분). 작업별 임시 규칙.
- karpathy-guidelines 본질 = "**가게 전체에 늘 깔린** 상시 규범" (요청 외 기능 X / 인접 코드 안 건드림 / 가정 명시). 작업 무관 베이스라인.

→ 비유로 표현하면 **karpathy-guidelines는 MD 파일(베이커리 운영 매뉴얼)에 가까운 스킬**. 5인 사이클 안의 자리(harness/eval/...)가 아니라, 그 5인이 출근할 때마다 읽는 가게 룰북.

→ harness의 실제 대응 스킬은 `verification-before-completion` ([[Claude-Skill]] 매핑표 참고).

## 다른 엔티티와의 관계

- [[Karpathy]] — 4대 진단의 원작자. 본 가이드라인은 그의 X 글을 forrestchang(multica-ai)이 4원칙으로 재구성한 것.
- [[Claude-Skill]] — 사장님 환경 13+ 스킬 중 1개. 일반 스킬 개념에 대한 본 스킬의 위치(=MD 축)는 위 베이커리 비유 절 참고.
- [[클로드-베이커리-비유]] — 4축 비유에서 본 가이드라인의 정확한 자리(MD 축) 확정.
- [[바이브-코딩]] — 자연어로 코딩할 때 바로 이 4원칙이 활성화되는 게 이 가이드라인의 의도.

## 설치 (모든 PC 공통)

본 가이드라인은 작업 무관 베이스라인 규범집이므로 **모든 PC에서 깔려있어야** 한다. 자세한 설치·점검은 [[Claude-Skill]] §설치 방법 참고. cherry-pick 권장 (저장소가 1스킬만 들어있어 통설치든 cherry-pick이든 같음).

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

[[superpowers]] 저장소에서 5스킬 cherry-pick과 함께 설치돼 있어야 베이커리 5인 사이클이 정상 작동.

## 내 생각 / 미해결 질문

- **본 vault에 적용해야 하나?** 현재 vault의 운영 룰(CLAUDE.md·핵심-맥락)과 karpathy-guidelines가 충돌할 부분이 있는지 점검 필요. 첫인상은 동조 — 둘 다 "추측 금지", "범위 한정", "성공 기준 명시" 강조.
- **클로드 코드 환경 외 활용?** Cursor 룰로도 패키징돼 있음 — 사장님이 Cursor도 쓰는지에 따라 동일 룰을 두 곳에 깔지 결정.
- **EXAMPLES.md 코드 예시 한글화 / 도메인 맞춤?** Python 일반 예시라 마케팅 자동화·소싱 도구 컨텍스트로 재작성하면 정착이 빠를 수도. 시간 비용 vs 효과는 미정.

## 출처

- `프로그램/raw/karpathy/2026-04-20_forrestchang_andrej-karpathy-skills.md` — README + CLAUDE.md + SKILL.md + EXAMPLES.md 4파일 verbatim 번들 (multica-ai/andrej-karpathy-skills 저장소)
- 본 가이드라인의 지적 출처는 [Andrej Karpathy X post](https://x.com/karpathy/status/2015883857489522876) (직접 ingest 안 됨, 본 raw에 인용된 형태로만 보존)

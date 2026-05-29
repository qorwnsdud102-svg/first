---
type: 사람
aliases: [Andrej Karpathy, 안드레 카파시, 카파시, 안드레카파, 안드레이 카파티]
status: stub
sources: [프로그램/raw/karpathy/2026-04-20_forrestchang_andrej-karpathy-skills.md]
updated: 2026-05-29
---

# Andrej Karpathy

## 한 줄 정의

전 OpenAI 창립 멤버 · 전 Tesla AI 시니어 디렉터 출신의 AI 연구자/교육자. 본 vault 관점에서는 **(a) LLM Wiki 운영 패턴의 원작자** 이자 **(b) LLM 코딩 4대 함정 진단의 출처** — 두 가지 다른 인풋이 우리 vault의 운영 헌법과 코딩 규범에 동시에 영향을 줌.

## 본 vault에서의 역할 — 2개 축

### 축 1: LLM Wiki 패턴의 원작자 (vault 자체의 운영 패턴)

- `핵심-맥락.md`·`CLAUDE.md`에 명시: **이 vault 자체가 Karpathy의 LLM Wiki 패턴을 따른다**. 도메인 4층 구조(raw/wiki/아웃풋/CLAUDE.md), Ingest·Query·Lint 3동작이 모두 그의 gist에서 유래.
- 직접 ingest된 raw는 아직 없음 — Karpathy의 LLM Wiki gist 원문은 vault 운영 룰로 흡수됐을 뿐, raw 파일로는 부재.

### 축 2: karpathy-guidelines (코딩 행동 규범의 출처)

- X 글(status/2015883857489522876)에서 LLM 코딩 4대 함정 진단 → forrestchang(multica-ai)이 4원칙 행동 규범으로 패키징 = [[karpathy-guidelines]] 스킬.
- 이게 본 entity의 첫 ingest된 raw 출처.

## 도메인별 분포 — 프로그램 dominant

본 entity는 **프로그램 도메인 dominant**. 근거:

- **프로그램**: 1 raw (andrej-karpathy-skills) · [[karpathy-guidelines]] 스킬 직접 활용 · LLM Wiki 패턴은 vault 메타 운영이지만 본질이 "지식·코드를 다루는 인프라" 쪽.
- **마케팅**: cross-domain 참조만 (`마케팅/raw/iboss-근육돌이/2026-04-14_근육돌이_AI에게-세컨드-브레인이-필요한-5가지-이유.md`에서 LLM Wiki 패턴 언급). 본 entity의 본체는 여기 두지 않음.
- **마인드**: raw 없음. 향후 그의 교육 영상(nanoGPT, "Intro to LLM" 등) ingest 시 보강 가능.

다른 도메인에서 참조 시 절대경로 wikilink 사용: `[[프로그램/Karpathy]]`.

## 다른 엔티티와의 관계

- [[karpathy-guidelines]] — 그의 X 글 4대 진단을 4원칙으로 재구성한 행동 규범.
- [[Claude-Skill]] — `karpathy-guidelines`가 사장님 환경 13+ 스킬 중 1개로 들어가 있음.
- [[클로드-베이커리-비유]] — `karpathy-guidelines`의 자리(MD 축, 베이스라인 규범)를 비유 안에서 확정.

## 내 생각 / 미해결 질문

- **LLM Wiki gist 원문 raw 확보 안 됨** — `핵심-맥락.md`에 패턴이 흡수돼 있긴 하지만, gist 원문이 raw로 부재 → 향후 ingest 후보. 출처 URL은 [Karpathy의 X 또는 GitHub gist 원문]으로 추정, 본 vault에는 미보존.
- **본 entity = stub**: 출처 1개, 본 vault에서의 역할은 명확하나 그의 다른 활동(nanoGPT·교육 영상·OpenAI/Tesla 이력 등)은 미정리. 추가 raw 들어오면 growing → stable로 격상.

## 출처

- `프로그램/raw/karpathy/2026-04-20_forrestchang_andrej-karpathy-skills.md` — 4대 진단 X 글 인용 + 4원칙 재구성본 (multica-ai/andrej-karpathy-skills 저장소, forrestchang 패키징)

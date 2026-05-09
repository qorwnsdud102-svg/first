# 위키 로그

> Ingest · Lint · 구조 변경의 일자별 기록. **최신이 위.**
> 한 줄이면 충분. 시간성을 잃지 않는 게 목적.

## 2026-05-09

- **첫 ingest**: `raw/2026-05-09_미상_DA광고용-제품-기획방법.txt` (8KB, 강의 노트)
  → 신규 wiki 4개: [[DA 광고]] · [[상징성과 당위성]] · [[상징재]] + source 페이지.
  → 미승격 entities 다수 (1회 언급 — 재등장 시 `entities/`로 승격 예정).
  → 강사·플랫폼·들은 시점 미상 (출처 보강 필요).
- 초기 셋업: Karpathy LLM Wiki 패턴 적용.
- 4층 구조: `raw/` · `wiki/` · `아웃풋/` + Schema(`CLAUDE.md` + `핵심-맥락.md`).
- `raw/inbox/` 도입: 미분류 raw의 임시 자리.
- wiki 하위 4분류: `sources/` · `concepts/` · `entities/` · `syntheses/`.
- 진입 페이지: [[index]] · [[log]] (이 파일).

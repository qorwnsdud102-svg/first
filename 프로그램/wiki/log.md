# 위키 로그 — 프로그램

> Ingest · Lint · 구조 변경의 일자별 기록. **최신이 위.**
> 한 줄이면 충분. 시간성을 잃지 않는 게 목적.

## [2026-05-15] ingest | sources/iboss-근육돌이/마케팅-AI-시대-필수로-써야하는-툴-6가지….md → [[MCP]] (1신)

- 프로그램 도메인 **첫 entity 신설**. (sources 33개는 사장님이 2026-05-10에 이미 1차 요약 ingest 완료 — 발견 후 index.md 진술 정정.)
- 신설: `wiki/entities/MCP.md` (status: stub, 출처 1개).
- 같은 source 페이지에서 후속 entity 14종 분리 가능 (Claude·ChatGPT·Gemini·Perplexity·NotebookLM·n8n·Make·Zapier·fal-ai·Runway·Kling·Veo2·Sora·Akool). 사장님 우선순위 결정 후 진행.
- 또한 다른 32개 sources도 entity 추출 후보 — `AI-에이전트-빌딩…`, `AI-자동화-3가지…`, `AI에-월-100만원-쓰면서…` 등.

## [2026-05-15] restructure | raw/inbox/iboss-근육돌이.bak/ → 마케팅/raw/iboss-근육돌이/ (229 파일 이동, .bak suffix 제거)

- 사장님 결정으로 `.bak` 활성화. CLAUDE.md의 dominant 도메인 룰 준수 — 근육돌이는 마케팅 dominant이므로 raw는 마케팅 측에 위치.
- 프로그램 inbox 비워짐. 프로그램 측 ingest는 cross-domain reference (절대경로 `[[마케팅/...]]`)로 진행.
- 첫 프로그램 ingest 시범 1개 진행 중.

## [2026-05-15] lint | wiki/index.md → 끊긴 wikilink 4개 풀기

- `[[concepts]]`·`[[entities]]`·`[[sources]]`·`[[syntheses]]` (분류별 폴더 섹션) → 백틱 폴더 표기로 변경. 4 orphan 해소.

## 2026-05-10 (도메인 시드 명시 — 첫 ingest 후보 셋업)

- **wiki/index.md 보강**: 첫 ingest 후보 시드 명시.
  - 마케팅 도메인 [[마케팅/그로스짐]] 강사가 사용하는 AI 도구 스택 (Claude + MCP + 크롬 자동화) → 자연스러운 첫 entity 후보.
  - 자동화 가능한 마케팅 작업 4종 (시장조사·리뷰 분석·유튜브 분석·퍼포먼스 캔버스 자동 채움).
  - 제품 소싱 도구 후보 3종 (도매 모니터링·경쟁사 추적·가격 알림).
  - 미해결 질문 4개 (현재 도구·스택 결정·자체개발 vs 노코드·우선순위).
- **raw/inbox/CLAUDE.md 보강**: `iboss-근육돌이.bak/` 229 파일에 대한 안내 추가.
  - 사장님 마케팅 정리 이전 백업이라 명시. 프로그램 도메인 ingest 대상 아님.
  - 삭제 X, 보존. 사장님 결정 대기.
- 첫 entity·source 페이지는 사장님이 실제 자동화 시도 시작할 때 신설.

## 2026-05-09

- 도메인 셋업: 마케팅 도메인과 평행한 프로그램 도메인 신설.
- 4층 구조 (raw / wiki / 아웃풋), wiki 하위 4분류 (sources · concepts · entities · syntheses).
- CLAUDE.md는 마케팅 도메인과 동일한 운영 규칙 사용 (도메인 무관 규칙이라 그대로 미러).
- 첫 ingest 대기 중.

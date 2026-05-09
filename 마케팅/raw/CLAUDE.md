# raw/ — 원본 소스 (불변)

이 폴더의 모든 파일은 외부에서 들어온 **원본**이다. 위키의 1차 재료.

## 절대 규칙

- **편집 금지**. 오타·줄바꿈·요약·번역 모두 금지. 들어온 그대로 보존.
- 정정·해석·내 생각은 모두 `wiki/`에 적는다.
- raw에서 발췌해 인용할 수는 있지만, 원본 파일 자체는 손대지 않는다.

## 파일명 규칙

`YYYY-MM-DD_저자-or-출처_제목-슬러그.md` 형식.
**날짜는 컨텐츠 발생일·수강일 기준** (ingest 일자가 아님). 월 단위만 알면 `YYYY-MM_...`도 OK.

예시:
- `2026-05-09_karpathy_llm-wiki-gist.md`
- `2025-10_엠타트업_DA광고용-제품-기획방법.txt` (월 단위)
- `2026-05-09_논문_attention-is-all-you-need.md`

## 출처별 분류 — Sub-folder

raw 파일은 **출처별 sub-folder**에 둔다. 한 출처에서 다수 자료가 들어오기 때문.

현재 출처:

- `엠타트업/` — [[엠타트업]] 강의 자료 (PDF·DOCX·TXT). 모든 강의 묶음 자료가 여기.
- `기타/` — 다른 출처 (블로그·유튜브·다른 강의·트위터 등). 출처가 분명히 잡히면 별도 sub-folder로 승격.

새 출처가 5개 이상으로 늘어나면 부모 CLAUDE.md 대신 출처별 mini-CLAUDE.md 도입 검토.

`inbox/`는 **출처 무관·통합** 자리 — 분류 결정 전 임시. 분류 끝나면 해당 출처 폴더로 이동.

`wiki/sources/`도 같은 출처 sub-folder를 미러한다 (`wiki/sources/엠타트업/` 등).
**`concepts/`·`entities/`·`syntheses/`는 출처별로 나누지 않는다** — 한 개념이 여러 출처에서 합쳐지므로 (Karpathy 패턴의 핵심 정신).

## 첫 줄(또는 frontmatter) 메타데이터

```yaml
---
source_url: https://...
fetched: 2026-05-09
type: gist | paper | article | video-transcript | book-excerpt | conversation
---
```

## 새 raw 소스가 들어왔을 때 — Ingest 절차

1. **inbox에 먼저 떨어뜨린다**: `raw/inbox/`에 위 규칙대로 저장 (출처 결정 전 임시).
2. **출처 결정** → 처리할 출처 sub-folder를 정한다 (`엠타트업/` · `기타/` 등). 없는 출처면 새로 만든다.
3. 영향받는 wiki 페이지를 찾는다 (Obsidian 검색 또는 그래프뷰).
4. `wiki/sources/<출처>/`에 이 raw에 대응하는 메타 페이지를 만든다 (1 raw : 1 source 페이지).
5. 영향받는 `wiki/concepts/` · `wiki/entities/` 페이지를 갱신, 없으면 신규 생성.
6. 모든 wiki 페이지의 `sources:` frontmatter에 이 raw 파일 경로 추가 (출처 sub-folder 포함된 절대 경로).
7. raw 파일을 `inbox/`에서 **해당 출처 sub-folder**로 이동 (= "처리 완료" 표시).
8. `wiki/log.md`에 한 줄 기록: 날짜 · raw 파일명 · 갱신/신규된 wiki 페이지.

## raw에 적합한 것 / 부적합한 것

- 적합: 기사·논문·영상 자막·책 발췌·외부 대화 로그·gist 본문.
- 부적합: 내 생각·요약·정리·해석 — 그건 `wiki/`로.

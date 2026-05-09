# raw/ — 원본 소스 (불변)

이 폴더의 모든 파일은 외부에서 들어온 **원본**이다. 위키의 1차 재료.

## 절대 규칙

- **편집 금지**. 오타·줄바꿈·요약·번역 모두 금지. 들어온 그대로 보존.
- 정정·해석·내 생각은 모두 `wiki/`에 적는다.
- raw에서 발췌해 인용할 수는 있지만, 원본 파일 자체는 손대지 않는다.

## 파일명 규칙

`YYYY-MM-DD_저자-or-출처_제목-슬러그.md` 형식.

예시:
- `2026-05-09_karpathy_llm-wiki-gist.md`
- `2026-05-09_논문_attention-is-all-you-need.md`

## 첫 줄(또는 frontmatter) 메타데이터

```yaml
---
source_url: https://...
fetched: 2026-05-09
type: gist | paper | article | video-transcript | book-excerpt | conversation
---
```

## 새 raw 소스가 들어왔을 때 — Ingest 절차

1. **inbox에 먼저 떨어뜨린다**: `raw/inbox/`에 위 규칙대로 저장 (가벼운 진입).
2. 영향받는 wiki 페이지를 찾는다 (Obsidian 검색 또는 그래프뷰).
3. `wiki/sources/`에 이 raw에 대응하는 메타 페이지를 만든다 (1 raw : 1 source 페이지).
4. 영향받는 `wiki/concepts/` · `wiki/entities/` 페이지를 갱신, 없으면 신규 생성.
5. 모든 wiki 페이지의 `sources:` frontmatter에 이 raw 파일 경로 추가.
6. raw 파일을 `inbox/`에서 부모 `raw/`로 이동 (= "처리 완료" 표시).
7. `wiki/log.md`에 한 줄 기록: 날짜 · raw 파일명 · 갱신/신규된 wiki 페이지.

## raw에 적합한 것 / 부적합한 것

- 적합: 기사·논문·영상 자막·책 발췌·외부 대화 로그·gist 본문.
- 부적합: 내 생각·요약·정리·해석 — 그건 `wiki/`로.

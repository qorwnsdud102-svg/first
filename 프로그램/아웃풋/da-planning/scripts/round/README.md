# 회차 도구 (scripts/round/)

DA 기획 자가학습 한 회차(기획 10개 → 검사 → 사장님 판정 화면)를 돌리는 도구다. 3회차(2026-10-12)에 세션 임시 폴더에서 만들어 쓰던 것을 옮겼다. 회차는 환경 변수 두 개로 고른다.

| 변수 | 뜻 | 예 |
|---|---|---|
| `DA_ROUND` | 회차 폴더 | `C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/기획-4회차-2026-10-13` |
| `DA_WORK` | 작업 폴더(세션 scratchpad 아래) — 판정자 샌드박스 `core/`·`eye/`, `prompt-*.txt`, `plans.json`, `kw-*.txt` | `<scratchpad>/r4` |

## 순서

1. **회차 폴더**: 지난 회차 `_지시문/`을 복사해 고친다. `planner-prompt.md`(지난 판정 이유 반영), `핵심옮김-검사.md`(첫 코드 블록이 판정자 지시, `{SB}` = 샌드박스), `README.md`(바꾼 것 표).
2. **재료**(사장님 판정 기다리는 동안 미리):
   - 목소리 7곳 동시: `voice_crawl.py --keywords "<결핍 + 유명한 대안 키워드…>" --out "<competitor-finder>/scripts/R<N>-목소리/<사이트>" --sites <사이트>` (창 없이 돈다 — `CRAWL_HEADLESS` 기본 1)
   - 메타 첫 화면: competitor-finder `scrape_meta.py --title R<N>-메타 --keywords "<결핍 키워드…>" --no-variants --first-screen --pause 5`
   - 검색량: `naver_kw.py <키워드…>` → `$DA_WORK/kw-<NN-결핍>.txt`
   - 목소리 표본: `voice_count.py dump <그 결핍의 xlsx…> --out <기초분석>/<결핍>/목소리-표본.txt --top 150` — 기획자가 하던 첫 단계를 미리 돈다(4회차부터, 토큰)
   - 사장님 눈 재료: `eye_v2.py materials <눈 폴더>/설정.json $DA_WORK/eye` — 판례 비평 샌드박스가 이 재료(말-*.md·사례.md)를 쓰므로 워크플로 전에 만든다
3. **기획자 지시문**: `$DA_WORK/plans.json`(fill_prompt.py 머리말) → `python fill_prompt.py <NN-결핍> …` → `$DA_WORK/prompt-<NN-결핍>.txt`
4. **워크플로**: `Workflow({scriptPath: "C:/claude/LLM-WIKI/.claude/workflows/da-planning-round.js", args})` — 이름(`name`)으로는 못 찾는다(2026-10-12 4회차, 등록 목록에 없음). args 모양은 그 파일 머리말.
   - 기획마다: (기획자) → `after_plan.py`(check_plan 위반 0 · 카드 700~850자 · 커밋 · 샌드박스) → 핵심 옮김 검사 1명 → 탈락이면 고침 1번 → 재검사 → 재검사도 탈락이면 2명째(둘 다 탈락이면 화면에서 뺌, 갈리면 올리고 신호등에 적음) → 화면에 오르면 판례 비평 1명(봉인 예측, `critic: false`로 끔)
   - 다 모이면: `eye_round.py <눈 폴더> norm` → 카드 정리 1명 → `eye_round.py <눈 폴더> cards`(카드 커밋) → 사장님 눈(기본 순서 1 한 명, `eyeOrders: [1, 2]`로 두 순서). 동시에 제품 링크·신호등 정리(Sonnet).
5. **봉인**: 워크플로가 끝나면 `python persist_run.py <워크플로 기록 폴더> <눈 폴더>`로 판정자 답(핵심 옮김·판례 비평·사장님 눈)을 파일로 남기고 도구 감사를 본 뒤 커밋한다 — 화면을 보내기 **전에**. 기록 폴더는 워크플로를 띄울 때 나오는 Transcript dir(`journal.jsonl`이 있는 곳)이다.
6. **화면**: `extra.json`(기획별 id·need·links·lights·defaults·fixed + hits·toggles·dropped·changes) → `python build_page.py extra.json <out.html>` → Artifact로 발행(`capabilities: {db: {}}`), 저장 한 번 읽어 확인, 링크만 보낸다.

## 파일

| 파일 | 하는 일 |
|---|---|
| `round_env.py` | `DA_ROUND`·`DA_WORK`·회차 번호·커밋 서명 |
| `fill_prompt.py` | 기획자 지시문 채우기 |
| `after_plan.py` | 기획 하나 끝난 뒤 한 번에(위 4) — 동시 커밋의 git 잠금은 기다려 다시 |
| `prep_sb.py` · `mk_judge.py` | 핵심 옮김 검사·판례 비평 샌드박스·지시문(`after_plan.py`가 부름) |
| `prep_norm.py` · `make_norm_prompt.py` | 사장님 눈 카드 정규화 입력·정리 담당 지시문(`eye_round.py`가 부름) |
| `eye_round.py` | 사장님 눈 준비(norm·cards) |
| `build_page.py` · `page_template.html` | 판정 화면 |
| `save_card.py` | 백그라운드 에이전트 마지막 보고를 파일로(`save_card.py <agent-id> <out.md> <머리말>`) |
| `persist_run.py` | 워크플로 기록(journal.jsonl)에서 판정자 답을 파일로 + 도구 감사 |

규칙집 판정자는 2026-10-12 토큰 줄이기로 멈췄다(3회차 `_지시문/README.md`). 판례 비평은 3회차에 멈췄다가 4회차에 다시 켰다 — 3회차 봉인 7개가 사장님 점수와 순위 상관 0.78로 가장 잘 맞혔고 한 번에 싸다(4회차 `_지시문/README.md`).

## 토큰 (2026-10-12 3회차 실측 — 4회차 `_지시문/README.md` '토큰 줄이기')

비용의 61%가 기획자, 19%가 메인 대화다. 기획자 비용은 '도구 호출 수 × 그때의 맥락 크기'로 커진다. 그래서 기획자 지시문의 '일하는 법'(파일 한 번만 읽기, 원자료 통째 덤프 금지, 한 번에 Write, 도구 상한)과 재료 미리 만들기(위 2), 워크플로 한 번 + 회차마다 새 세션으로 줄인다. 판정자·검사(합쳐 4%)는 줄일 몫이 작다.

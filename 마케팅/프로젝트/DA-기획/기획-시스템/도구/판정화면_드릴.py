# -*- coding: utf-8 -*-
"""판정 화면: 상징 짝 드릴 8회차 10장(결핍 지식 카드 + 생각 순서 v3, 선발 없음) → page_template.html. 해부·결정 칸은 숨기고 칸 이름을 드릴용으로 바꾼다.
카드마다 결핍 지식 카드를 k/<id>.html로 함께 낸다. 사용: python 판정화면_드릴.py <출력 폴더>"""
import json
import os
import sys
from urllib.parse import quote

import markdown

sys.stdout.reconfigure(encoding="utf-8")
H = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.abspath(__file__))
SRC = r"C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획\기획-시스템\자가학습\상징짝-드릴\8회차\카드-10.json"
KNOW = r"C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획\기획-시스템\자가학습\결핍지식"
TPL = r"C:\claude\LLM-WIKI\프로그램\아웃풋\da-planning\scripts\round\page_template.html"

cards = json.load(open(SRC, encoding="utf-8"))
assert len(cards) == 10 and all(c["id"].startswith("D8-") for c in cards)
plans = [{
    "id": c["id"], "need": c["need"], "line": c["line"],
    "facts": {**{k: c[k] for k in ("gap", "borrow", "why", "risk")}, "product": c["product"] + " · 만드는 법: " + c["make"]},
    "fixed": "", "lights": [], "defaults": [],
    "links": {"gap": [["결핍 지식 카드 (GPT가 먼저 읽은 것)", "k/" + c["id"] + ".html"]],
              "borrow": [["네이버에서 '" + c["symbol"] + "'", "https://search.naver.com/search.naver?query=" + quote(c["symbol"])]]},
} for c in cards]

changes = [
    "7회차(평균 3.3) 뒤 짚어 주신 것: 기획자가 결핍을 모르니 이상한 기획이 나온다. 그래서 GPT가 기획 전에 먼저 읽는 '결핍 지식 카드'를 만들었습니다. 결핍의 원리, 타겟이 믿는 원인, 장면, 대안 6~9개(가격·아는 효과·불만·부작용·꺼리는 점·셀프 가능 여부), 목소리 비중이 들어 있습니다. 1차 자료는 우리가 모은 기초분석 목소리이고 웹은 보충입니다. 카드마다 '결핍 지식 카드' 링크로 볼 수 있습니다.",
    "생각 순서 v3: 지식 카드 → 결핍의 핵심 원리 → 상징 후보(그 결핍의 1순위 해결책, 또는 다른 분야의 최상위 상징 · 고유명사 · 셀프 몇천 원짜리·가리는 시술·수술은 약함 · 해외 약은 카베진처럼 '그 나라 = 약' 통념이면 됨) → 한 단계로 납득되는 짝 고르기 → 제품 → 살 이유.",
    "결핍 10개는 기초조사가 끝난 것으로 골랐습니다: 족저근막염·역류성식도염·손목터널증후군·쥐젖·허리디스크·불면증·갱년기증상·거북목·티눈·오십견.",
    "GPT 모델은 gpt-6.1-sol ultra입니다(아스트라는 비싸서 바꿨습니다). 결핍마다 초안 3개를 쓰고 1장을 골랐고, Claude는 고르지 않고 10장 모두 올립니다. GPT의 점수 예측은 봉인해 두었습니다.",
    "매기는 법: 점수 1~10, 제일 걸리는 곳(결핍 / 상징 짝 / 구현 당위 / 없음), 이유 한 줄.",
]
data = {"plans": plans, "hits": [], "toggles": [], "dropped": [], "changes": changes}
tpl = open(TPL, encoding="utf-8").read()
js = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
page = tpl.replace("__NO__", "8").replace("__PREV__", "7").replace("__DATA__", js)
for a, b in [
    ("기획 8회차 판정", "상징 짝 드릴 8회차"),
    ('<section aria-labelledby="h-hits">', '<section aria-labelledby="h-hits" hidden>'),
    ('<section aria-labelledby="h-toggles">', '<section aria-labelledby="h-toggles" hidden>'),
    ("<p>점수 띠는 1~3 기각 · 4~5 보류 · 6~7 조건부(고치면 진행) · 8~10 진행입니다. 신호등은 다른 Claude가 미리 본 검사입니다.</p>",
     "<p>두 가지만 봐 주세요. 결핍에 맞는 상징재인가, 그 상징을 제품으로 걸림 없이 옮겼나. 점수 띠는 1~3 기각 · 4~5 보류 · 6~7 조건부 · 8~10 진행입니다.</p>"),
    ('["gap", "결핍"], ["borrow", "빌려 온 것"], ["why", "왜 이걸 빌리나", true], ["product", "제품", true]',
     '["gap", "결핍 · 타겟이 믿는 원인"], ["borrow", "상징재 · 낫게 하는 방식", true], ["why", "타겟이 이미 안다는 증거"], ["product", "구현 (상징 → 제품)", true]'),
    ('["risk", "걸리는 점"]', '["risk", "스스로 본 걸림"]'),
    ('const PARTS = ["결핍", "빌린 상징", "제품", "한 줄·광고", "돈·위험", "없음"];', 'const PARTS = ["결핍", "상징 짝", "구현 당위", "없음"];'),
    ('"1. 기획 " + PLANS.length + "개 — 진행해 볼 만한가"', '"상징 짝 드릴 " + PLANS.length + "장"'),
    ('"기획 " + PLANS.length + "개는 점수(1~10) · 제일 걸리는 곳 · 이유 한 줄, 해부 " + HITS.length +\n    "장은 점수만(틀렸으면 한 줄), 결정 " + TOGGLES.length + "개는 ○/×입니다. 15분쯤 걸리고',
     '"드릴 " + PLANS.length + "장은 점수(1~10) · 제일 걸리는 곳 · 이유 한 줄입니다. 10분쯤 걸리고'),
    ('"기획 " + PLANS.map(', '"드릴 " + PLANS.map('),
    (' + " / 해부 " + HITS.map((_, i) => [8, 5, 7, 3, 9][i % 5]).join(" ") +\n    " / 결정 " + TOGGLES.map(() => "○").join(" ")', ''),
    ('" 다음 줄부터 기획마다 걸리는 곳과 이유 한 줄."', '" 다음 줄부터 카드마다 걸리는 곳과 이유 한 줄."'),
]:
    assert a in page, a
    page = page.replace(a, b)
out = os.path.join(H, "상징짝-드릴-8회차.html")
open(out, "w", encoding="utf-8").write(page)
print("드릴", len(plans), "·", out)

# 결핍 지식 카드 → k/<id>.html (판정 화면 링크용, 따로 열리는 페이지라 문서 뼈대를 직접 넣는다)
KPAGE = """<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>결핍 지식 카드</title><style>
:root{--bg:#fbfaf7;--fg:#1f1d1a;--mut:#6b665e;--line:#e2ded6;--link:#1d5fa8;--head:#f1eee8}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]){--bg:#1a1917;--fg:#ece9e3;--mut:#a39d93;--line:#3a3732;--link:#7fb2ec;--head:#25231f}}
:root[data-theme=dark]{--bg:#1a1917;--fg:#ece9e3;--mut:#a39d93;--line:#3a3732;--link:#7fb2ec;--head:#25231f}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.65 system-ui,-apple-system,"Apple SD Gothic Neo","Malgun Gothic",sans-serif}
main{max-width:860px;margin:0 auto;padding:20px 16px 60px}h1{font-size:1.35rem}a{color:var(--link);overflow-wrap:anywhere}
.tw{overflow-x:auto}table{border-collapse:collapse;font-size:.86rem;min-width:720px}th,td{border:1px solid var(--line);padding:6px 8px;vertical-align:top;text-align:left}
th{background:var(--head)}p.k{color:var(--mut);font-size:.88rem}
</style></head><body><main><p class="k">__ID__ · GPT 기획자가 기획 전에 먼저 읽은 카드입니다.</p>__BODY__</main></body></html>"""
os.makedirs(os.path.join(H, "k"), exist_ok=True)
for c in cards:
    md = open(os.path.join(KNOW, c["need"] + ".md"), encoding="utf-8").read()
    body = markdown.markdown(md, extensions=["tables"]).replace("<table>", '<div class="tw"><table>').replace("</table>", "</table></div>")
    body = body.replace('<a href="http', '<a target="_blank" rel="noopener" href="http')
    open(os.path.join(H, "k", c["id"] + ".html"), "w", encoding="utf-8").write(KPAGE.replace("__ID__", c["id"] + " " + c["need"]).replace("__BODY__", body))
print("지식 카드", len(cards))

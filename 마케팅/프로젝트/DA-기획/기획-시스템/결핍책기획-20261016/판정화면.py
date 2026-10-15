# -*- coding: utf-8 -*-
"""결핍 책 위 첫 기획(Opus 최대 + 새 방식, 사장님 P6541) — 아침 판정 화면 만들기.
산출/<결핍>.json(지침-2의 카드 JSON)을 결핍 순서대로 읽어 page_template.html에 넣는다.
방식 비교가 아니므로 블라인드·섞기 없이 결핍별로 묶어 보여 준다.
사용: python 판정화면.py <출력 폴더>"""
import json, os, re, sys
sys.stdout.reconfigure(encoding="utf-8")
H = os.path.dirname(os.path.abspath(__file__)); OUT = sys.argv[1]
TPL = r"C:\claude\LLM-WIKI\프로그램\아웃풋\da-planning\scripts\round\page_template.html"
PLAN = r"C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획\결핍책\묶음\_전체계획.json"
order = [f["name"] for fm in json.load(open(PLAN, encoding="utf-8"))["families"] for f in fm["folders"] if f["kind"] == "결핍"]

def clean(s):
    s = re.sub(r"^\s*(needs_check|ok|status)\s*[:：]\s*", "", s or "", flags=re.I)
    return re.sub(r"\s*\((자료|출처)\s*[:：][^)]*\)", "", s).strip()

# 사장님 P6548: 기획 카드는 쿠팡 후기까지 분석한 결핍 책 위에서만 — 후기 없이 만든 결핍은 판정에서 뺀다(후기 받은 뒤 다시 만듦)
HOLD = ['수족냉증', '비염', '역류성식도염', '족저근막염', '허리디스크']
plans, n = [], 0
for need in order:
    if need in HOLD: continue
    p = os.path.join(H, "산출", f"{need}.json")
    if not os.path.exists(p): continue
    for c in json.load(open(p, encoding="utf-8"))["cards"]:
        n += 1
        hint = clean(c["hint"]); hint = hint if "→" in hint else re.sub(r"\s*(?:—|:)\s+", " → ", hint, count=1)
        plans.append({"id": f"K{n:02d}", "need": need, "line": hint,
                      "facts": {"gap": clean(c["value"]), "product": clean(c["bridge"]), "risk": clean(c["risk"])},
                      "fixed": "", "lights": [], "defaults": [], "links": {}})
changes = [
    "오늘 밤 새로 만든 결핍 책(원인·대안·타겟 인식·시장 지도) 위에서 Opus 최대 + 새 방식으로 만든 첫 기획입니다.",
    "결핍마다 상징 후보 10개 → 검색량·매대 비율 확인 → 3장. 같은 결핍 안에서 상징은 서로 다릅니다.",
    "쿠팡 후기 없이 만든 5개 결핍(수족냉증·비염·역류성식도염·족저근막염·허리디스크)은 뺐습니다. 후기를 받은 뒤 결핍 책부터 다시 만듭니다.",
    "매기는 법: 점수 1~10, 제일 걸리는 곳(결핍 / 상징 짝 / 구현 당위 / 없음), 이유 한 줄. 7점 이상이 '발전시킬 만함'입니다.",
]
data = {"plans": plans, "hits": [], "toggles": [], "dropped": [], "changes": changes}
page = open(TPL, encoding="utf-8").read().replace("__NO__", "시험").replace("__PREV__", "어제").replace("__DATA__", json.dumps(data, ensure_ascii=False).replace("</", r"<\/"))
for a, b in [
    ("기획 시험회차 판정", "결핍 책 첫 기획 판정"),
    ('<section aria-labelledby="h-hits">', '<section aria-labelledby="h-hits" hidden>'),
    ('<section aria-labelledby="h-toggles">', '<section aria-labelledby="h-toggles" hidden>'),
    ("<p>점수 띠는 1~3 기각 · 4~5 보류 · 6~7 조건부(고치면 진행) · 8~10 진행입니다. 신호등은 다른 Claude가 미리 본 검사입니다.</p>",
     "<p>두 가지만 봐 주세요. 결핍에 맞고 타겟이 아는 상징인가, 그 상징의 핵심(USP)이 제품에 직관적으로 옮겨졌나. 점수 띠는 1~3 기각 · 4~5 보류 · 6~7 조건부 · 8~10 진행입니다.</p>"),
    ('const FACTS = [["gap", "결핍"], ["borrow", "빌려 온 것"], ["why", "왜 이걸 빌리나", true], ["product", "제품", true],\n  ["money", "가격·돈"], ["scene", "첫 광고 장면"], ["risk", "걸리는 점"]];',
     'const FACTS = [["gap", "타겟 가치"], ["product", "어떻게 옮기나", true], ["risk", "남은 걸림"]];'),
    ('const PARTS = ["결핍", "빌린 상징", "제품", "한 줄·광고", "돈·위험", "없음"];', 'const PARTS = ["결핍", "상징 짝", "구현 당위", "없음"];'),
    ('"1. 기획 " + PLANS.length + "개 — 진행해 볼 만한가"', '"카드 " + PLANS.length + "장"'),
    ('"기획 " + PLANS.length + "개는 점수(1~10) · 제일 걸리는 곳 · 이유 한 줄, 해부 " + HITS.length +\n    "장은 점수만(틀렸으면 한 줄), 결정 " + TOGGLES.length + "개는 ○/×입니다. 15분쯤 걸리고',
     '"카드 " + PLANS.length + "장, 점수(1~10) · 제일 걸리는 곳 · 이유 한 줄입니다. 마음에 드는 것만 길게, 나머지는 점수만 줘도 됩니다. 15분쯤 걸리고'),
    ('"기획 " + PLANS.map(', '"카드 " + PLANS.map('),
    (' + " / 해부 " + HITS.map((_, i) => [8, 5, 7, 3, 9][i % 5]).join(" ") +\n    " / 결정 " + TOGGLES.map(() => "○").join(" ")', ''),
    ('" 다음 줄부터 기획마다 걸리는 곳과 이유 한 줄."', '" 다음 줄부터 카드마다 걸리는 곳과 이유 한 줄."'),
]:
    assert a in page, a[:60]
    page = page.replace(a, b)
os.makedirs(OUT, exist_ok=True)
out = os.path.join(OUT, "결핍책-첫기획-판정.html")
open(out, "w", encoding="utf-8").write(page)
print("카드", len(plans), "·", sorted({p['need'] for p in plans}, key=order.index), "·", out)

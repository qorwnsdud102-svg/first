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
HOLD = ['비염', '허리디스크']   # 비염은 후기 반영 결핍 책 위 새 기획 중, 허리디스크는 사장님 10-16 '돌리지마'
# 사장님 P6548 뒤: '이미 파나'를 웹 검색으로만 본 결핍은 쿠팡 재확인이 끝날 때까지 뺀다
RECHECK = []   # 10-16: 팔자주름·볼패임·잇몸염증은 쿠팡 재확인 뒤 카드를 다시 골라 올림
plans, n = [], 0
for need in order:
    p = os.path.join(H, "산출", f"{need}.json")
    if not os.path.exists(p): continue
    for c in json.load(open(p, encoding="utf-8"))["cards"]:
        n += 1  # 뺀 결핍도 번호는 세어 둔다 — 다시 넣을 때 카드 번호(판정 기록 열쇠)가 밀리지 않게
        if need in HOLD or need in RECHECK: continue
        hint = clean(c["hint"]); hint = hint if "→" in hint else re.sub(r"\s*(?:—|:)\s+", " → ", hint, count=1)
        plans.append({"id": f"K{n:02d}", "need": need, "line": hint,
                      "facts": {"gap": clean(c["value"]), "product": clean(c["bridge"]), "risk": clean(c["risk"]),
                                **({"borrow": " · ".join(x for x in [
                                    "원리: " + ", ".join(c["principle"]) if c.get("principle") else "",
                                    "이미지: " + ", ".join(c["image"]) if c.get("image") else "",
                                    "감각: " + c["sense"] if c.get("sense") else ""] if x)} if c.get("principle") else {})},
                      "fixed": "", "lights": [], "defaults": [], "links": {}})
# 사장님 10-16 "튼살 결핍 제품 꼭 진행하고싶으니까 튼살로 기획 10개 후보 내줘(타겟 나눠서)" — 맨 앞에 따로 묶는다(번호 T01~)
p2 = os.path.join(H, "산출", "튼살-2차.json")
if os.path.exists(p2):
    extra = []
    for k, c in enumerate(json.load(open(p2, encoding="utf-8"))["cards"], 1):
        borrow = " · ".join(x for x in ["타겟: " + c.get("target", ""),
                                        "원리: " + ", ".join(c.get("principle") or []),
                                        "이미지: " + ", ".join(c["image"]) if c.get("image") else "",
                                        "감각: " + c["sense"] if c.get("sense") else "",
                                        c.get("coupang", "")] if x)
        extra.append({"id": f"T{k:02d}", "need": "튼살 2차 (타겟별 10개)", "line": clean(c["hint"]),
                      "facts": {"borrow": borrow, "gap": clean(c["value"]), "product": clean(c["bridge"]), "risk": clean(c["risk"])},
                      "fixed": "", "lights": [], "defaults": [], "links": {}})
    plans = extra + plans
changes = [
    "맨 위 '튼살 2차'는 말씀하신 타겟별 튼살 기획 10개입니다(임산부·산후·급찐살·흰 튼살·다이어트 후·성장기·운동 남성). 카드마다 타겟·원리/이미지 상징·감각·쿠팡 확인 결과를 맨 위에 적었습니다.",
    "새로 올린 18장(점수 없는 카드): 수족냉증·역류성식도염·족저근막염은 오늘 받은 쿠팡 후기를 넣어 결핍 책을 다시 쓴 뒤 새로 기획했고, 팔자주름·볼패임·잇몸염증은 쿠팡에서 '이미 파나'를 다시 확인해 카드를 다시 골랐습니다.",
    "역류성식도염·족저근막염·잇몸염증 카드는 오늘 인터뷰로 정한 원리 상징·이미지 상징 기준으로 만들어, 카드 맨 위에 원리·이미지 상징과 감각을 적었습니다.",
    "이미 점수를 주신 42장은 그대로 있습니다. 비염은 기획 중이고, 허리디스크는 말씀대로 돌리지 않았습니다.",
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
     'const FACTS = [["borrow", "원리·이미지 상징"], ["gap", "타겟 가치"], ["product", "어떻게 옮기나", true], ["risk", "남은 걸림"]];'),
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
print("카드", len(plans), "·", sorted({p['need'] for p in plans}, key=lambda n: order.index(n) if n in order else -1), "·", out)

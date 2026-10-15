# -*- coding: utf-8 -*-
"""방식 결정 시험 — 블라인드 판정 화면 만들기(계약서 '공정' 절 그대로).
1) 산출/의 카드 6묶음(지금·새 × Opus·Sonnet 12장씩, 다시 해 오기 Opus·Sonnet 6장씩)을 읽는다.
2) 같은 아이디어(산출/같은아이디어.json: 대표 카드 → 묶인 카드들)는 한 번만 보여 주고, 점수는 묶인 카드 모두에 준다.
3) 표시만 똑같이 다듬는다: 'needs_check:' 같은 상태 표시와 '(자료: …)' 출처 괄호를 지운다(방식이 드러나지 않게, 내용은 그대로).
4) 고정 씨앗으로 섞어 C01~ 번호를 붙이고, 작성자 표는 봉인/작성자표.json에 쓴다(판정 전에 커밋).
5) page_template.html에 넣어 판정화면.html을 만든다.
사용: python 판정화면.py <출력 폴더>"""
import json, os, random, re, sys
sys.stdout.reconfigure(encoding="utf-8")
H = os.path.dirname(os.path.abspath(__file__)); OUT = sys.argv[1]
TPL = r"C:\claude\LLM-WIKI\프로그램\아웃풋\da-planning\scripts\round\page_template.html"
CELLS = [("지금방식", "opus"), ("지금방식", "sonnet"), ("새방식", "opus"), ("새방식", "sonnet"), ("다시해오기", "opus"), ("다시해오기", "sonnet")]
SEED = 20261015

def clean(s):
    s = re.sub(r"^\s*(needs_check|ok|status)\s*[:：]\s*", "", s or "", flags=re.I)
    return re.sub(r"\s*\((자료|출처)\s*[:：][^)]*\)", "", s).strip()

cards = []
for method, model in CELLS:
    for i, c in enumerate(json.load(open(os.path.join(H, "산출", f"{method}-{model}-카드.json"), encoding="utf-8"))["cards"]):
        key = f"{method}-{model}-{i + 1:02d}"
        cards.append({"key": key, "method": method, "model": model, "orig_id": c.get("id", ""), "topic": c["topic"], "symbol": c["symbol"],
                      "hint": clean(c["hint"]), "value": clean(c["value"]), "bridge": clean(c["bridge"]), "risk": clean(c["risk"])})
assert len(cards) == 60, len(cards)
dup_path = os.path.join(H, "산출", "같은아이디어.json")
dups = json.load(open(dup_path, encoding="utf-8")) if os.path.exists(dup_path) else {}
hidden = {k for ks in dups.values() for k in ks}
shown = [c for c in cards if c["key"] not in hidden]
random.Random(SEED).shuffle(shown)
key_of, plans = {}, []
for n, c in enumerate(shown, 1):
    cid = f"C{n:02d}"
    key_of[cid] = [c["key"]] + dups.get(c["key"], [])
    plans.append({"id": cid, "need": c["topic"], "line": c["hint"],
                  "facts": {"gap": c["value"], "product": c["bridge"], "risk": c["risk"]}, "fixed": "", "lights": [], "defaults": [], "links": {}})
os.makedirs(os.path.join(H, "봉인"), exist_ok=True)
json.dump({"seed": SEED, "화면번호→카드": key_of, "카드": {c["key"]: c for c in cards},
           "다듬은 것": "상태 표시(needs_check:)와 '(자료: …)' 출처 괄호만 지움. 내용은 그대로."},
          open(os.path.join(H, "봉인", "작성자표.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

changes = [
    "같은 4개 주제(탈모·아토피·잇몸 염증·다한증)와 어제 7점 카드 6장을 여러 방식으로 다시 만든 카드입니다. 누가 어떤 방식으로 만들었는지는 봉인해 두었고, 판정이 끝난 뒤 미리 정한 규칙대로 숫자로 결정합니다.",
    "같은 아이디어가 겹친 카드는 한 장만 보여 드립니다.",
    "매기는 법: 점수 1~10, 제일 걸리는 곳(결핍 / 상징 짝 / 구현 당위 / 없음), 이유 한 줄. 7점 이상이 '발전시킬 만함' 기준입니다.",
]
data = {"plans": plans, "hits": [], "toggles": [], "dropped": [], "changes": changes}
page = open(TPL, encoding="utf-8").read().replace("__NO__", "시험").replace("__PREV__", "이번").replace("__DATA__", json.dumps(data, ensure_ascii=False).replace("</", "<\\/"))
for a, b in [
    ("기획 시험회차 판정", "방식 결정 시험 — 카드 판정"),
    ('<section aria-labelledby="h-hits">', '<section aria-labelledby="h-hits" hidden>'),
    ('<section aria-labelledby="h-toggles">', '<section aria-labelledby="h-toggles" hidden>'),
    ("<p>점수 띠는 1~3 기각 · 4~5 보류 · 6~7 조건부(고치면 진행) · 8~10 진행입니다. 신호등은 다른 Claude가 미리 본 검사입니다.</p>",
     "<p>두 가지만 봐 주세요. 결핍에 맞고 타겟이 아는 상징인가, 그 상징의 핵심(USP)이 제품에 직관적으로 옮겨졌나. 점수 띠는 1~3 기각 · 4~5 보류 · 6~7 조건부 · 8~10 진행입니다.</p>"),
    ('const FACTS = [["gap", "결핍"], ["borrow", "빌려 온 것"], ["why", "왜 이걸 빌리나", true], ["product", "제품", true],\n  ["money", "가격·돈"], ["scene", "첫 광고 장면"], ["risk", "걸리는 점"]];',
     'const FACTS = [["gap", "타겟 가치"], ["product", "어떻게 옮기나", true], ["risk", "남은 걸림"]];'),
    ('const PARTS = ["결핍", "빌린 상징", "제품", "한 줄·광고", "돈·위험", "없음"];', 'const PARTS = ["결핍", "상징 짝", "구현 당위", "없음"];'),
    ('"1. 기획 " + PLANS.length + "개 — 진행해 볼 만한가"', '"카드 " + PLANS.length + "장"'),
    ('"기획 " + PLANS.length + "개는 점수(1~10) · 제일 걸리는 곳 · 이유 한 줄, 해부 " + HITS.length +\n    "장은 점수만(틀렸으면 한 줄), 결정 " + TOGGLES.length + "개는 ○/×입니다. 15분쯤 걸리고',
     '"카드 " + PLANS.length + "장, 점수(1~10) · 제일 걸리는 곳 · 이유 한 줄입니다. 마음에 드는 것만 길게, 나머지는 점수만 줘도 됩니다. 40분쯤 걸리고'),
    ('"기획 " + PLANS.map(', '"카드 " + PLANS.map('),
    (' + " / 해부 " + HITS.map((_, i) => [8, 5, 7, 3, 9][i % 5]).join(" ") +\n    " / 결정 " + TOGGLES.map(() => "○").join(" ")', ''),
    ('" 다음 줄부터 기획마다 걸리는 곳과 이유 한 줄."', '" 다음 줄부터 카드마다 걸리는 곳과 이유 한 줄."'),
]:
    assert a in page, a[:60]
    page = page.replace(a, b)
os.makedirs(OUT, exist_ok=True)
out = os.path.join(OUT, "방식결정-시험-판정.html")
open(out, "w", encoding="utf-8").write(page)
print("카드", len(cards), "· 화면", len(plans), "· 겹침으로 숨김", len(hidden), "·", out)

# -*- coding: utf-8 -*-
"""방식 결정 시험 — 같은 결핍을 Opus·Sonnet 두 열로 나란히 놓은 판정 화면(사장님 P6539).
- 모델(Opus·Sonnet)은 열 이름으로 보인다. 방식(지금·새)은 계속 가린다: Opus 열 안에서 섞는다.
- 같은 모델 안에서 같은 아이디어는 한 장만 보여 주고 점수를 묶인 카드 모두에 준다(산출/같은아이디어.json). 모델이 다르면 나란히 둘 다 보여 준다.
- 카드 내용은 봉인/작성자표.json에 다듬어 둔 그대로 쓴다.
사용: python 판정화면-2열.py <출력 폴더>"""
import json, os, random, sys
sys.stdout.reconfigure(encoding="utf-8")
H = os.path.dirname(os.path.abspath(__file__)); OUT = sys.argv[1]
TPL = r"C:\claude\LLM-WIKI\프로그램\아웃풋\da-planning\scripts\round\page_template.html"
SEED = 20261015
cards = json.load(open(os.path.join(H, "봉인", "작성자표.json"), encoding="utf-8"))["카드"]
groups = json.load(open(os.path.join(H, "산출", "같은아이디어.json"), encoding="utf-8"))["groups"]
assert len(cards) == 48

# 같은 모델 안의 같은 아이디어만 묶는다
also, hidden = {}, set()
for gi, g in enumerate(groups):
    for model in ("opus", "sonnet"):
        sub = [k for k in g if cards[k]["model"] == model]
        if len(sub) > 1:
            rep = random.Random(SEED + gi).choice(sub)
            also[rep] = [k for k in sub if k != rep]; hidden |= set(also[rep])

rng = random.Random(SEED)
plans, key_of, sections, n = [], {}, [], [0]
def add(key):
    n[0] += 1; cid = f"C{n[0]:02d}"; c = cards[key]
    key_of[cid] = [key] + also.get(key, [])
    plans.append({"id": cid, "need": c["topic"], "model": "Opus" if c["model"] == "opus" else "Sonnet", "line": c["hint"],
                  "facts": {"gap": c["value"], "product": c["bridge"], "risk": c["risk"]}})
    return cid

for topic in ["탈모", "아토피", "잇몸 염증", "다한증"]:
    op = [k for k, c in cards.items() if c["topic"] == topic and c["model"] == "opus" and c["method"] != "다시해오기" and k not in hidden]
    so = [k for k, c in cards.items() if c["topic"] == topic and c["model"] == "sonnet" and c["method"] != "다시해오기" and k not in hidden]
    rng.shuffle(op); rng.shuffle(so)
    sections.append({"title": topic, "opus": [add(k) for k in op], "sonnet": [add(k) for k in so]})
pairs = []
for i in range(1, 7):
    a, b = f"다시해오기-opus-{i:02d}", f"다시해오기-sonnet-{i:02d}"
    assert cards[a]["symbol"] == cards[b]["symbol"]
    pairs.append([add(a), add(b)])
sections.append({"title": "다시 해 오기", "note": "어제 7점 + '발전시킬 만함'을 받은 카드 6장을 Opus·Sonnet이 각각 고쳐 쓴 것입니다. 같은 줄이 같은 원래 카드입니다.", "pairs": pairs})
assert sum(len(v) for v in key_of.values()) == 48

json.dump({"seed": SEED, "화면번호→카드": key_of, "카드": cards, "같은 모델 안 묶음": also,
           "보이는 것": "모델(열 이름). 방식(지금·새)은 Opus 열 안에서 섞어 가림."},
          open(os.path.join(H, "봉인", "작성자표-2열.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

changes = [
    "같은 결핍을 Opus(왼쪽)·Sonnet(오른쪽)으로 나란히 놓았습니다. 어떤 방식(지금·새)으로 만들었는지는 계속 가렸습니다.",
    "오늘 정한 결핍 책이 아니라 예전 지식 카드로 만든 카드입니다. 판정이 흐리면 내일 결핍 책 위에서 다시 합니다.",
    "같은 모델 안에서 같은 아이디어는 한 장만 보여 드립니다. 매기는 법: 점수 1~10, 제일 걸리는 곳, 이유 한 줄. 7점 이상이 '발전시킬 만함' 기준입니다.",
]
data = {"plans": plans, "sections": sections, "hits": [], "toggles": [], "dropped": [], "changes": changes}
page = open(TPL, encoding="utf-8").read().replace("__NO__", "시험").replace("__PREV__", "이번").replace("__DATA__", json.dumps(data, ensure_ascii=False).replace("</", "<\\/"))
CSS = """
.wrap { max-width: 1240px; }
.topic { display: grid; gap: 10px; }
.topic-h { font-size: 1.15rem; margin: 8px 0 0; }
.topic-note { margin: 0; color: var(--muted); }
.two { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; align-items: start; }
.col { display: grid; gap: 12px; align-content: start; min-width: 0; }
.colh { font-weight: 700; color: var(--muted); padding: 2px 4px; }
.tag.opus { background: var(--surface); }
@media (max-width: 900px) { .two { grid-template-columns: minmax(0, 1fr); } .two > .colh { display: none; } }
"""
RENDER = r'''function cardEl(p) {
  const facts = el("dl", { class: "facts" });
  for (const [key, name, main] of FACTS) {
    if (!p.facts[key]) continue;
    facts.append(el("dt", { class: main ? "key" : "", text: name }), el("dd", { text: p.facts[key] }));
  }
  const card = el("article", { class: "card", id: "card-" + p.id },
    el("div", {}, el("span", { class: "tag", text: p.id + " · " + p.model })),
    el("p", { class: "oneline", text: p.line }), facts);
  card.append(el("div", { class: "judge" }, scoreRow(p.id, "plan"), partsRow(p.id),
    noteRow(p.id, "왜 이 점수인지 한 줄 — 짧아도 제일 많이 배웁니다")));
  return card;
}

function renderPlans() {
  const box = document.getElementById("plans");
  const byId = {}; PLANS.forEach(p => byId[p.id] = p);
  for (const sec of DATA.sections) {
    const s = el("section", { class: "topic" }, el("h3", { class: "topic-h", text: sec.title }));
    if (sec.note) s.append(el("p", { class: "topic-note", text: sec.note }));
    const grid = el("div", { class: "two" });
    if (sec.pairs) {
      grid.append(el("div", { class: "colh", text: "Opus" }), el("div", { class: "colh", text: "Sonnet" }));
      for (const [a, b] of sec.pairs) grid.append(cardEl(byId[a]), cardEl(byId[b]));
    } else {
      const ca = el("div", { class: "col" }, el("div", { class: "colh", text: "Opus · " + sec.opus.length + "장" }));
      sec.opus.forEach(id => ca.append(cardEl(byId[id])));
      const cb = el("div", { class: "col" }, el("div", { class: "colh", text: "Sonnet · " + sec.sonnet.length + "장" }));
      sec.sonnet.forEach(id => cb.append(cardEl(byId[id])));
      grid.append(ca, cb);
    }
    s.append(grid); box.append(s);
  }
  document.getElementById("h-plans").textContent = "카드 " + PLANS.length + "장 — 같은 결핍을 Opus · Sonnet 나란히";
}

'''
a = page.index("function renderPlans() {"); b = page.index("function renderHits() {")
page = page[:a] + RENDER + page[b:]
page = page.replace("</style>", CSS + "</style>", 1)
for x, y in [
    ("기획 시험회차 판정", "방식 결정 시험 — Opus · Sonnet 나란히"),
    ('<section aria-labelledby="h-hits">', '<section aria-labelledby="h-hits" hidden>'),
    ('<section aria-labelledby="h-toggles">', '<section aria-labelledby="h-toggles" hidden>'),
    ("<p>점수 띠는 1~3 기각 · 4~5 보류 · 6~7 조건부(고치면 진행) · 8~10 진행입니다. 신호등은 다른 Claude가 미리 본 검사입니다.</p>",
     "<p>두 가지만 봐 주세요. 결핍에 맞고 타겟이 아는 상징인가, 그 상징의 핵심(USP)이 제품에 직관적으로 옮겨졌나. 점수 띠는 1~3 기각 · 4~5 보류 · 6~7 조건부 · 8~10 진행입니다.</p>"),
    ('const FACTS = [["gap", "결핍"], ["borrow", "빌려 온 것"], ["why", "왜 이걸 빌리나", true], ["product", "제품", true],\n  ["money", "가격·돈"], ["scene", "첫 광고 장면"], ["risk", "걸리는 점"]];',
     'const FACTS = [["gap", "타겟 가치"], ["product", "어떻게 옮기나", true], ["risk", "남은 걸림"]];'),
    ('const PARTS = ["결핍", "빌린 상징", "제품", "한 줄·광고", "돈·위험", "없음"];', 'const PARTS = ["결핍", "상징 짝", "구현 당위", "없음"];'),
    ('"기획 " + PLANS.length + "개는 점수(1~10) · 제일 걸리는 곳 · 이유 한 줄, 해부 " + HITS.length +\n    "장은 점수만(틀렸으면 한 줄), 결정 " + TOGGLES.length + "개는 ○/×입니다. 15분쯤 걸리고',
     '"카드 " + PLANS.length + "장, 점수(1~10) · 제일 걸리는 곳 · 이유 한 줄입니다. 마음에 드는 것만 길게, 나머지는 점수만 줘도 됩니다. 40분쯤 걸리고'),
    ('"기획 " + PLANS.map(', '"카드 " + PLANS.map('),
    (' + " / 해부 " + HITS.map((_, i) => [8, 5, 7, 3, 9][i % 5]).join(" ") +\n    " / 결정 " + TOGGLES.map(() => "○").join(" ")', ''),
    ('" 다음 줄부터 기획마다 걸리는 곳과 이유 한 줄."', '" 다음 줄부터 카드마다 걸리는 곳과 이유 한 줄."'),
]:
    assert x in page, x[:60]
    page = page.replace(x, y)
os.makedirs(OUT, exist_ok=True)
out = os.path.join(OUT, "방식결정-시험-판정.html")
open(out, "w", encoding="utf-8").write(page)
print("화면", len(plans), "· 같은 모델 안 숨김", len(hidden), "· 구역", [(s["title"], len(s.get("opus", [])), len(s.get("sonnet", [])), len(s.get("pairs", []))) for s in sections], "·", out)

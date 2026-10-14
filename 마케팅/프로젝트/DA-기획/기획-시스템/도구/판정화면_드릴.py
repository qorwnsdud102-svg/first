# -*- coding: utf-8 -*-
"""판정 화면: 상징 짝 드릴 7회차 10장(v3 + 생각 순서 v2, 선발 없음) → page_template.html. 해부·결정 칸은 숨기고 칸 이름을 드릴용으로 바꾼다."""
import json
import os
import sys
from urllib.parse import quote

sys.stdout.reconfigure(encoding="utf-8")
H = os.path.dirname(os.path.abspath(__file__))
SRC = r"C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획\기획-시스템\자가학습\상징짝-드릴\7회차\카드-10.json"
SEL = r"C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획\기획-시스템\자가학습\상징짝-드릴\5회차\선발-Claude.json"
TPL = r"C:\claude\LLM-WIKI\프로그램\아웃풋\da-planning\scripts\round\page_template.html"

cards = json.load(open(SRC, encoding="utf-8"))
assert len(cards) == 10 and all(c["id"].startswith("D7-") for c in cards)
plans = [{
    "id": c["id"], "need": c["need"], "line": c["line"],
    "facts": {**{k: c[k] for k in ("gap", "borrow", "why", "risk")}, "product": c["product"] + " · 만드는 법: " + c["make"]},
    "fixed": "", "lights": [], "defaults": [],
    "links": {"borrow": [["네이버에서 '" + c["symbol"] + "'", "https://search.naver.com/search.naver?query=" + quote(c["symbol"])]]},
} for c in cards]

changes = [
    "6회차(평균 3.4)에서 짚어 주신 것을 GPT가 읽는 '생각 순서'에 넣었습니다: 결핍의 핵심 원리부터 적기(혈액순환·균), 그 원리를 해결하는 1순위 해결책에서 상징 찾기, 생김새·작동만 닮은 물건과 가리는 상징은 버리기, '상징 → 결핍 해결'이 한 단계로 납득되는지 보기, 만들 수 있나는 강한 짝을 고른 다음에 보기.",
    "지난 판정 장부에서 꺼내 주는 사례 4건을 최근 판정 위주로 바꿨습니다. 다시 도전하는 결핍은 6회차에 받으신 점수와 이유가 그대로 GPT 눈앞에 놓입니다.",
    "결핍 10개는 6회차 낮은 점수 다시 도전 5(과민성대장·족저근막염·역류성식도염·쥐젖·탈모)와 새 결핍 5(축농증·손목터널·치질·아토피·위염)입니다. 대안을 직접 말씀해 주신 하지정맥류·무좀은 뺐습니다.",
    "GPT 모델을 5회차와 같은 것으로 되돌렸습니다(6회차만 달랐습니다). Claude가 고르지 않고 10장 모두 올립니다. GPT의 점수 예측은 봉인해 두었습니다.",
    "매기는 법: 점수 1~10, 제일 걸리는 곳(결핍 / 상징 짝 / 구현 당위 / 없음), 이유 한 줄.",
]
data = {"plans": plans, "hits": [], "toggles": [], "dropped": [], "changes": changes}
tpl = open(TPL, encoding="utf-8").read()
js = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
page = tpl.replace("__NO__", "7").replace("__PREV__", "6").replace("__DATA__", js)
for a, b in [
    ("기획 7회차 판정", "상징 짝 드릴 7회차"),
    ("6회차 판정 뒤 바꾼 것 (읽기만)", "6회차 판정 뒤 바꾼 것 (읽기만)"),
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
out = os.path.join(H, "상징짝-드릴-7회차.html")
open(out, "w", encoding="utf-8").write(page)
print("드릴", len(plans), "·", out)

# -*- coding: utf-8 -*-
"""드릴 6회차 (학습 방식 v3) — 결핍마다 새 짧은 GPT 문맥(codex exec, 읽기 전용)에서 초안 3 → 카드 1.
기획자가 읽는 것은 넷뿐: 결핍.json · 생각-순서.md · 사례4.json(찾기.py) · 규칙.md

  python drill6.py run [번호]   # 묶음 만들고 응시(이미 있는 결과는 건너뜀)
  python drill6.py sum          # 카드-10.json · 예측-10.json · 사용량.json
"""
import glob
import json
import os
import re
import shutil
import subprocess
import sys

sys.stdout.reconfigure(encoding="utf-8")
H = os.path.dirname(os.path.abspath(__file__))
A = os.path.dirname(os.path.dirname(H))  # 자가학습
sys.path.insert(0, os.path.join(A, "경험"))
import 찾기  # noqa: E402

NEEDS = [  # 다시 도전 5(4·5회차 낮은 점수) + 새 결핍 5, 모두 검색량 큰 쪽 절반
    ("과민성대장증후군", "복부"), ("오십견", "어깨"), ("탈모", "두피"), ("족저근막염", "발바닥"), ("기미", "얼굴"),
    ("역류성식도염", "먹는"), ("하지정맥류", "다리"), ("지루성두피염", "두피"), ("쥐젖", "피부"), ("무좀", "발"),
]
EFFORT = "high"
MODEL_NOTE = "gpt-6.1-sol(Codex config 기본) · effort high — 5회차는 앱 대화 gpt-6-astra ultra"
CAP = 60000  # 장당 상한(v3)

RULES = """# 규칙 (하드)
1. **우리가 만들 수 있어야 한다(정본 ⑥-25).** 화장품은 OEM 처방(원료·제형·용기·이름)으로, 공산품은 공장이 이미 파는 제품을 가져와 컨셉(이름·원료·라벨·상자)만 입힌다. 모양·기능을 바꾸는 신규 제품은 몇억이 든다 — 탈락(사장님 P6454). 의료기기 인허가 대상, 임산부 대상 먹는 제품도 탈락.
2. 이 결핍에 이미 쓴 상징(사례4.json '이 결핍에 이미 쓴 상징')과 같은 짝은 쓰지 않는다. 같은 결핍은 다른 짝이면 된다.
3. 사장님이 판정 코멘트에서 직접 낸 대안을 그대로 쓰지 않는다.
4. 상징은 타겟이 아는 비싸고 효과 강한 해결책·대명사다. 다른 분야 상징이면 그 해결책의 고유한 작동이 이 결핍 상태에 맞아야 하고, 제품 생김새·체감이 그 상징을 닮아야 한다.
5. 기존 형태(일반 패치·찜질팩·메모리폼 등) 대신 이것을 살 이유가 있어야 한다.

# 카드 칸 (gap~risk 합계 350~600자, 한국어)
line(한 줄 기획, '상징 — 무엇' 꼴) · gap(타겟이 겪는 장면과 믿는 원인) · borrow(상징에서 빌리는 고유 작동·체감) · why(왜 이 결핍에 이 상징인가) · product(구현: 원료·제형·용기·이름) · risk(스스로 본 제일 큰 걸림) · flow(생각 순서 ①~⑤ 각 한 줄) · applied(사례4 중 무엇을 적용해 어떤 선택을 바꿨나, 사례 id 포함) · make(어떤 기존 제품·OEM 처방에 무엇을 입히나 한 줄)
"""

PROMPT = """너는 DA(메타 광고) 제품 기획자다. 이 폴더의 네 파일만 읽는다: 결핍.json(이번 결핍), 생각-순서.md(생각하는 순서 한 쪽), 사례4.json(지난 판정 장부에서 꺼낸 비슷한 성공·실패와 이 결핍에 이미 쓴 상징), 규칙.md(하드 조건과 카드 칸). 다른 파일과 인터넷은 보지 않는다.

1. 초안 3개를 짧게 쓴다(한 줄 + 상징 + 구현 종류). 서로 다른 상징이어야 한다.
2. 생각 순서와 규칙으로 1개를 고르고(chosen: 0~2), 버린 2개는 이유 한 줄씩(dropped).
3. 고른 1개를 카드로 쓴다. 사례4의 실패가 짚은 곳을 되풀이하지 않았는지 applied에 적는다.
4. predict: 사장님 점수 예측 1~10. 사장님 드릴 점수는 대부분 3~6이고, 7 이상은 결핍·상징·구현·만들 수 있음이 모두 맞을 때다.
"""

S = {"type": "string"}
SCHEMA = {"type": "object", "additionalProperties": False,
          "required": ["drafts", "chosen", "dropped", "card", "predict"],
          "properties": {
              "drafts": {"type": "array", "minItems": 3, "maxItems": 3, "items": {
                  "type": "object", "additionalProperties": False, "required": ["line", "symbol", "kind"],
                  "properties": {"line": S, "symbol": S, "kind": S}}},
              "chosen": {"type": "integer", "minimum": 0, "maximum": 2},
              "dropped": {"type": "array", "minItems": 2, "maxItems": 2, "items": S},
              "card": {"type": "object", "additionalProperties": False,
                       "required": ["symbol", "line", "gap", "borrow", "why", "product", "risk", "flow", "applied", "make"],
                       "properties": {**{k: S for k in ["symbol", "line", "gap", "borrow", "why", "product", "risk", "applied", "make"]},
                                      "flow": {"type": "array", "minItems": 5, "maxItems": 5, "items": S}}},
              "predict": {"type": "integer", "minimum": 1, "maximum": 10}}}


def bundle(i, need, hint):
    d = os.path.join(H, "묶음", f"D6-{i:02d}")
    os.makedirs(d, exist_ok=True)
    allneeds = json.load(open(os.path.join(A, "상징원-사전", "결핍별.json"), encoding="utf-8"))
    e = [x for x in allneeds if x["need"] == need]
    assert e, need
    keep = {k: e[0].get(k) for k in ("need", "need_keyword", "belief", "main_keyword", "monthly_search_volume", "related_market_keywords")}
    json.dump(keep, open(os.path.join(d, "결핍.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    shutil.copy(os.path.join(A, "경험", "생각-순서.md"), os.path.join(d, "생각-순서.md"))
    json.dump(찾기.find(need, hint), open(os.path.join(d, "사례4.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    open(os.path.join(d, "규칙.md"), "w", encoding="utf-8").write(RULES)
    return d


def run(only=None):
    exe = sorted(glob.glob(os.path.join(os.environ["LOCALAPPDATA"], "OpenAI", "Codex", "bin", "*", "codex.exe")))[-1]
    os.makedirs(os.path.join(H, "결과"), exist_ok=True)
    for i, (need, hint) in enumerate(NEEDS, 1):
        cid = f"D6-{i:02d}"
        out = os.path.join(H, "결과", cid + ".json")
        if (only and i != only) or os.path.exists(out):
            continue
        d = bundle(i, need, hint)
        sp = os.path.join(d, "_schema.json")
        json.dump(SCHEMA, open(sp, "w", encoding="utf-8"), ensure_ascii=False)
        r = subprocess.run([exe, "exec", "--skip-git-repo-check", "--ephemeral", "-s", "read-only",
                            "-c", f'model_reasoning_effort="{EFFORT}"', "-C", d, "-o", out,
                            "--output-schema", sp, "-"], input=PROMPT, text=True, encoding="utf-8", capture_output=True)
        os.remove(sp)
        m = re.findall(r"tokens used[^\d]*([\d,]+)", (r.stderr or "") + (r.stdout or ""), re.I)
        tok = int(m[-1].replace(",", "")) if m else None
        json.dump({"id": cid, "need": need, "tokens": tok, "ok": r.returncode == 0 and os.path.exists(out)},
                  open(os.path.join(d, "_사용량.json"), "w", encoding="utf-8"), ensure_ascii=False)
        print(cid, need, "완료" if os.path.exists(out) else "실패 " + (r.stderr or "")[-300:], "토큰", tok,
              "(상한 초과)" if tok and tok > CAP else "", flush=True)


def summary():
    cards, preds, use = [], [], []
    for i, (need, _) in enumerate(NEEDS, 1):
        cid = f"D6-{i:02d}"
        p = os.path.join(H, "결과", cid + ".json")
        u = os.path.join(H, "묶음", cid, "_사용량.json")
        if os.path.exists(u):
            use.append(json.load(open(u, encoding="utf-8")))
        if not os.path.exists(p):
            continue
        g = json.load(open(p, encoding="utf-8"))
        c = {"id": cid, "need": need, **g["card"], "drafts": g["drafts"], "chosen": g["chosen"], "dropped": g["dropped"]}
        cards.append(c)
        preds.append({"id": cid, "score": g["predict"]})
    json.dump(cards, open(os.path.join(H, "카드-10.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    json.dump(preds, open(os.path.join(H, "예측-10.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    tot = sum(x["tokens"] or 0 for x in use)
    json.dump({"cards": len(cards), "model": MODEL_NOTE, "tokens_total": tot, "per_card": use}, open(os.path.join(H, "사용량.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("카드", len(cards), "· 토큰 합계", tot, "· 장당 최대", max((x["tokens"] or 0) for x in use) if use else 0)


if __name__ == "__main__":
    if sys.argv[1] == "run":
        run(int(sys.argv[2]) if len(sys.argv) > 2 else None)
    else:
        summary()

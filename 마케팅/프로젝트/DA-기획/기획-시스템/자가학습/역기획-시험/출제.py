# -*- coding: utf-8 -*-
"""역기획 시험 출제 — 1등급 15행을 고르고, 행마다 새 짧은 GPT 창(codex exec, 읽기 전용, 히트해부 폴더)에서 문제·답 칸을 쓴다.
긴 Codex 대화에서 출제하다 631만 토큰을 쓰고 4문제에서 멈춘 뒤(2026-10-14) 바꾼 방식이다.

  python 출제.py <회차폴더>     # 이미 낸 행은 건너뛴다 → 문제.json · 정답.json · 출제-사용량.json
"""
import glob
import json
import os
import re
import subprocess
import sys

sys.stdout.reconfigure(encoding="utf-8")
H = os.path.dirname(os.path.abspath(__file__))
HIT = os.path.join(os.path.dirname(H), "히트해부")
MODEL, EFFORT = "gpt-6-astra", "high"
# 사장님 원문 이유가 있고, 참신함이 소진·사장님 제품·의료기기·편의가 아닌 행에서 결핍이 겹치지 않게 15개
PICK = ["R1-01", "R1-03", "R1-04", "R1-05", "R1-07", "R1-11", "R1-15", "R1-16", "R1-17", "R1-18",
        "R1-20", "R1-23", "R1-40", "R1-42", "R1-44"]
PROMPT = """너는 역기획 시험 출제자다. 아래 정답 행은 실제로 팔린 제품이다. 이 폴더(히트해부)에서 이 제품의 해부 카드를 찾아(rg로 브랜드명 검색, 카드 하나에서 필요한 부분만) 문제와 답 칸을 쓴다. 방법정답지.md의 '열여덟 길' 목록에서 이 행이 속한 길 번호를 고른다. 그 밖의 파일은 읽지 않는다.

정답 행: {row}

문제(응시자가 보는 것 — 답이 새면 안 된다): need(결핍 한 줄), symptom(찌르는 증상), target(누가), belief(타겟이 믿는 원인), worry(근본 걱정), shelf(지금 이 결핍에 흔히 쓰는 것, 정답 상징은 빼고).
- 브랜드·제품명·정답 상징 이름·제품에 박은 것(원료명·기기명·숫자·용기)을 쓰지 않는다.
- 메인 결핍은 해부 카드의 상단 후기에서 가장 많이 나온 고민으로 정한다. 결핍이 넓으면 증상 하나로 좁힌다.
답: brand, product, symbol_family(같은 계열로 볼 이름 2~4개), concept(컨셉·포지셔닝 한 줄, 사장님 원문이 있으면 그 말로), path(길 번호 정수), leak_terms(묶음에서 지울 말: 브랜드·제품명·제품명 조각·정답에만 쓰인 원료 별명), need_terms(결핍을 가리키는 말 2~4개). 한국어로 쓴다."""
S = {"type": "string"}
L = {"type": "array", "items": S}
SCHEMA = {"type": "object", "additionalProperties": False, "required": ["question", "answer"], "properties": {
    "question": {"type": "object", "additionalProperties": False,
                 "required": ["need", "symptom", "target", "belief", "worry", "shelf"],
                 "properties": {k: S for k in ["need", "symptom", "target", "belief", "worry", "shelf"]}},
    "answer": {"type": "object", "additionalProperties": False,
               "required": ["brand", "product", "symbol_family", "concept", "path", "leak_terms", "need_terms"],
               "properties": {"brand": S, "product": S, "symbol_family": L, "concept": S, "path": {"type": "integer"},
                              "leak_terms": L, "need_terms": L}}}}


def main(rd):
    rows = {x["id"]: x for x in json.load(open(os.path.join(rd, "출제-목록.json"), encoding="utf-8"))["included"]}
    exe = sorted(glob.glob(os.path.join(os.environ["LOCALAPPDATA"], "OpenAI", "Codex", "bin", "*", "codex.exe")))[-1]
    od = os.path.join(rd, "출제")
    os.makedirs(od, exist_ok=True)
    sp = os.path.join(rd, "_출제-schema.json")
    json.dump(SCHEMA, open(sp, "w", encoding="utf-8"), ensure_ascii=False)
    up = os.path.join(rd, "출제-사용량.json")
    use = json.load(open(up, encoding="utf-8")) if os.path.exists(up) else {}
    for i in PICK:
        out = os.path.join(od, i + ".json")
        if os.path.exists(out):
            continue
        r = subprocess.run([exe, "exec", "--skip-git-repo-check", "--ephemeral", "-s", "read-only", "-m", MODEL,
                            "-c", f'model_reasoning_effort="{EFFORT}"', "-C", HIT, "-o", out, "--output-schema", sp, "-"],
                           input=PROMPT.format(row=json.dumps(rows[i], ensure_ascii=False)),
                           text=True, encoding="utf-8", capture_output=True)
        m = re.findall(r"tokens used[^\d]*([\d,]+)", (r.stderr or "") + (r.stdout or ""), re.I)
        use[i] = int(m[-1].replace(",", "")) if m else None
        json.dump(use, open(up, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print(i, "완료" if os.path.exists(out) else "실패 " + (r.stderr or "")[-300:], "토큰", use[i], flush=True)
    os.remove(sp)
    q, a = [], []
    for i in PICK:
        p = os.path.join(od, i + ".json")
        if not os.path.exists(p):
            continue
        g, row = json.load(open(p, encoding="utf-8")), rows[i]
        q.append({"id": i, **g["question"]})
        a.append({"id": i, "symbol": row["symbol"], "bridge": row["bridge"], "boss_reason": row["reason_table"],
                  "novelty": row["novelty"], "brand_product": row["brand_product"], **g["answer"]})
    json.dump(q, open(os.path.join(rd, "문제.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    json.dump(a, open(os.path.join(rd, "정답.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("문제", len(q), "· 출제 토큰", sum(v or 0 for v in use.values()))


if __name__ == "__main__":
    main(os.path.abspath(sys.argv[1]))

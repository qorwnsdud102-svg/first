# -*- coding: utf-8 -*-
"""④ 핵심 코어 보정 — Claude가 상징원의 핵심 코어를 사장님처럼 잡는지 본다(단계별-작동-점검 ④-2).

사용:
  python core_calib.py prep  <정답.md> <샌드박스>
      <샌드박스>/질문/질문-00.md — 상징원 이름만(보기 없음)
      <샌드박스>/질문/질문-01~NN.md — 나머지 상징원의 사장님 답을 보기로 주고 하나만 묻는다(하나 빼기)
  python core_calib.py sheet <정답.md> <답 폴더> <샌드박스> [--seed 20261011]
      답-00.md(상징원마다 한 줄)와 답-01~NN.md(한 줄씩)를 상징원마다 섞고 세 글자 코드를 붙여
      <샌드박스>/채점/채점.md를 만든다. 코드표는 <정답.md 폴더>/코드표.json(볼트에만 둔다).
  python core_calib.py score <코드표.json> <채점 답.md>
      → 조건(보기 없음 / 보기 9개)별 맞음·부분·틀림. 통과선: 맞음이 상징원 수의 80% 이상(10개 중 8개).
정답.md 표: | 상징원 | P-ID | 핵심 코어(한 줄 요지) | 사장님 원문 |
답 파일 표: | 상징원 | 핵심 코어 한 줄 |   채점 답 표: | 코드 | 맞음/부분/틀림 | 근거 |
"""
import argparse
import json
import os
import random
import re
import sys
from collections import Counter

ROW = re.compile(r"^\|\s*([^|]+?)\s*\|\s*(P\d{4})\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*$", re.M)
ANS = re.compile(r"^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*$", re.M)
GRADE = re.compile(r"^\|\s*([A-Z]{3})\s*\|\s*(맞음|부분|틀림)\s*\|", re.M)
PASS = 0.8


def cores(path):
    return ROW.findall(open(path, encoding="utf-8").read())


def answers(path):
    if not os.path.exists(path):
        return {}
    rows = ANS.findall(open(path, encoding="utf-8").read())
    return {n: a for n, a in rows if n != "상징원" and not set(n) <= set("-: ")}


def prep(rows, sandbox):
    q = os.path.join(sandbox, "질문")
    os.makedirs(q, exist_ok=True)
    names = "\n".join(f"- {n}" for n, *_ in rows)
    with open(os.path.join(q, "질문-00.md"), "w", encoding="utf-8") as f:
        f.write(f"# 상징원 핵심 코어\n\n## 물음\n{names}\n")
    for i, (n, *_) in enumerate(rows, 1):
        ex = "\n".join(f"| {m} | {core} | {quote} |" for m, _, core, quote in rows if m != n)
        with open(os.path.join(q, f"질문-{i:02d}.md"), "w", encoding="utf-8") as f:
            f.write("# 상징원 핵심 코어\n\n## 보기 — 사장님이 잡은 핵심 코어\n"
                    f"| 상징원 | 핵심 코어 | 사장님 말 |\n|---|---|---|\n{ex}\n\n## 물음\n- {n}\n")


def sheet(rows, ans_dir, sandbox, seed=20261011, conds=None):
    """→ 코드표 {코드: {'상징원', '조건'}}. <샌드박스>/채점/채점.md를 쓴다.
    conds: [(조건 이름, 답 파일)] — 주면 답-00·답-NN 대신 이 답들을 상징원마다 섞는다(코어 v2: 목소리 조건)."""
    rnd = random.Random(seed)
    zero = answers(os.path.join(ans_dir, "답-00.md"))
    named = [(name, answers(path)) for name, path in conds or []]
    pool = [a + b + c for a in "ABCDEFGH" for b in "JKLMNPQR" for c in "STUVWXYZ"]
    rnd.shuffle(pool)
    codes, blocks = {}, []
    for i, (n, _, core, quote) in enumerate(rows, 1):
        loo = answers(os.path.join(ans_dir, f"답-{i:02d}.md"))
        pair = ([(name, a.get(n, "")) for name, a in named] if named else
                [("보기 없음", zero.get(n, "")), ("보기 9개", loo.get(n) or next(iter(loo.values()), ""))])
        rnd.shuffle(pair)
        block = [f"## {n}", f"- 사장님 말: {quote}", f"- 사장님 답 요지: {core}"]
        for cond, a in pair:
            c = pool.pop()
            codes[c] = {"상징원": n, "조건": cond}
            block.append(f"- {c}: {a or '(답 없음)'}")
        blocks.append("\n".join(block))
    d = os.path.join(sandbox, "채점")
    os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, "채점.md"), "w", encoding="utf-8") as f:
        f.write("# 핵심 코어 채점\n\n" + "\n\n".join(blocks) + "\n")
    return codes


def score(codes, graded):
    """→ {조건: Counter(맞음·부분·틀림·빠짐)}"""
    g = dict(GRADE.findall(graded))
    out = {}
    for c, info in codes.items():
        out.setdefault(info["조건"], Counter())[g.get(c, "빠짐")] += 1
    return out


def main(argv=None):
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("prep")
    p.add_argument("gold")
    p.add_argument("sandbox")
    s = sub.add_parser("sheet")
    s.add_argument("gold")
    s.add_argument("answers")
    s.add_argument("sandbox")
    s.add_argument("--seed", type=int, default=20261011)
    s.add_argument("--cond", action="append", default=[],
                   help="'조건 이름=답 파일'(표 | 상징원 | 핵심 코어 |). 주면 답-00·답-NN 대신 쓴다. 여러 번 준다")
    c = sub.add_parser("score")
    c.add_argument("codes")
    c.add_argument("graded")
    a = ap.parse_args(argv)
    if a.cmd == "prep":
        rows = cores(a.gold)
        prep(rows, a.sandbox)
        print(f"질문 {len(rows) + 1}개 → {os.path.join(a.sandbox, '질문')}")
        return 0
    if a.cmd == "sheet":
        conds = [tuple(c.split("=", 1)) for c in a.cond]
        codes = sheet(cores(a.gold), a.answers, a.sandbox, a.seed, conds)
        path = os.path.join(os.path.dirname(os.path.abspath(a.gold)), "코드표.json")
        with open(path, "w", encoding="utf-8") as f:
            json.dump(codes, f, ensure_ascii=False, indent=1)
        print(f"채점 칸 {len(codes)}개 → {os.path.join(a.sandbox, '채점', '채점.md')} · 코드표 {path}")
        return 0
    codes = json.load(open(a.codes, encoding="utf-8"))
    for cond, cnt in sorted(score(codes, open(a.graded, encoding="utf-8").read()).items()):
        n = sum(cnt.values())
        verdict = "통과" if cnt["맞음"] >= PASS * n else "미달"
        print(f"- {cond}: 맞음 {cnt['맞음']} · 부분 {cnt['부분']} · 틀림 {cnt['틀림']} · 빠짐 {cnt['빠짐']}"
              f" → {cnt['맞음']}/{n} {verdict}(기준 {PASS:.0%})")
    return 0


if __name__ == "__main__":
    sys.exit(main())

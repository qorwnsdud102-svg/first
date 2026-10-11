# -*- coding: utf-8 -*-
"""누출어 세기 — 글자를 NFC로 맞추고 공백을 모두 지운 뒤 센다(자가학습 설계 부록 H 방식).

사용: python leak_check.py --terms terms.json --files a.md b.md ... [--out 표.md]
  terms.json: {"그룹": ["단어", ...]}  단어도 공백을 지우고 센다.
출력: 파일 × 그룹 표(그룹 칸 = 합계와 '단어:횟수'), 맨 끝에 전체 합계.
"""
import argparse
import json
import os
import re
import unicodedata


def norm(s):
    return re.sub(r"\s+", "", unicodedata.normalize("NFC", s))


def count(text, terms):
    t = norm(text)
    return {w: t.count(norm(w)) for w in terms if norm(w)}


def table(groups, files):
    lines = ["| 파일 | " + " | ".join(groups) + " |", "|" + "---|" * (len(groups) + 1)]
    total = 0
    for f in files:
        text = open(f, encoding="utf-8").read()
        cells = []
        for terms in groups.values():
            c = count(text, terms)
            n = sum(c.values())
            total += n
            detail = ", ".join(f"{w}:{k}" for w, k in c.items() if k)
            cells.append(f"{n}" + (f" ({detail})" if detail else ""))
        lines.append(f"| {os.path.basename(f)} | " + " | ".join(cells) + " |")
    return "\n".join(lines) + f"\n\n합계 {total}\n", total


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--terms", required=True)
    ap.add_argument("--files", nargs="+", required=True)
    ap.add_argument("--out")
    a = ap.parse_args()
    groups = json.load(open(a.terms, encoding="utf-8"))
    out, _ = table(groups, a.files)
    if a.out:
        open(a.out, "w", encoding="utf-8").write(out)
    print(out)


if __name__ == "__main__":
    main()

# -*- coding: utf-8 -*-
"""채점자 지시문 만들기 (회귀 시험·판정 예측 공용).
사용: python make_prompts.py <규칙집 파일명(규칙집/ 안)> <카드 ID들> <태그> [회차 수=2]
  카드 ID 예: "A01-A13,B01-B34,H001-H040"
  결과: scratchpad가 아니라 이 폴더의 _지시문/<태그>-<회차>.md, 예측 파일은 예측-<태그>-<회차>.md
"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__)).replace("\\", "/")
TEMPLATE = open(os.path.join(HERE, "채점자-지시문.md"), encoding="utf-8").read()

def expand(spec):
    ids = []
    for part in spec.split(","):
        a, _, b = part.strip().partition("-")
        p, n1 = re.match(r"([A-Z]+)(\d+)", a).groups()
        n2 = int(re.match(r"[A-Z]+(\d+)", b).group(1)) if b else int(n1)
        ids += [f"{p}{i:0{len(n1)}d}" for i in range(int(n1), n2 + 1)]
    return ids

def main(rulebook, spec, tag, runs=2):
    ids = expand(spec)
    rb = (f"{HERE}/규칙집/{rulebook}` 하나. 카드 첫 줄의 '정본:' 표시는 무시하고 이 규칙집만 쓴다. "
          "다른 규칙집 파일은 열지 말 것`")
    cards = f"{', '.join(i + '.md' for i in ids)} ({len(ids)}장). 목록에 없는 카드는 열지 말 것"
    os.makedirs(f"{HERE}/_지시문", exist_ok=True)
    for r in range(1, int(runs) + 1):
        out = f"{HERE}/예측-{tag}-{r}.md"
        s = (TEMPLATE.replace("{RULEBOOK}", rb).replace("{CARDS_DIR}", f"{HERE}/시험지")
             .replace("{CARD_LIST}", cards).replace("{OUT}", out))
        path = f"{HERE}/_지시문/{tag}-{r}.md"
        open(path, "w", encoding="utf-8").write(s)
        print(path)

if __name__ == "__main__":
    main(*sys.argv[1:])

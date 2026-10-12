# -*- coding: utf-8 -*-
"""핵심 옮김 검사·판례 비평 지시문을 샌드박스 안 _지시.md로 만든다. 사용: python mk_judge.py <NN-결핍> [...]
회차 지시문 폴더의 핵심옮김-검사.md 첫 코드 블록에서 {SB}를, 판례비평-지시.md 첫 코드 블록에서 {DIR}를 샌드박스 경로로 바꾼다.
판례 비평 샌드박스($DA_WORK/critic/C<NN>)가 없으면 핵심 옮김만 만든다.
"""
import os
import re
import sys

from round_env import INST, WORK


def block(fn):
    t = open(os.path.join(INST, fn), encoding="utf-8").read()
    return re.search(r"```\n(.*?)\n```", t, re.S).group(1)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    core_t = block("핵심옮김-검사.md")
    critic_t = block("판례비평-지시.md") if os.path.exists(os.path.join(INST, "판례비평-지시.md")) else None
    for name in sys.argv[1:]:
        d = os.path.join(WORK, "critic", "C" + name.split("-", 1)[0])
        if critic_t and os.path.isdir(d):
            open(os.path.join(d, "_지시.md"), "w", encoding="utf-8").write(critic_t.replace("{DIR}", d) + "\n")
        sb = os.path.join(WORK, "core", name.split("-", 1)[0])
        p = os.path.join(sb, "_지시.md")
        open(p, "w", encoding="utf-8").write(core_t.replace("{SB}", sb) + "\n")
        print(name, "_지시.md", "남은 자리", [x for x in ("{SB}",) if x in open(p, encoding="utf-8").read()])

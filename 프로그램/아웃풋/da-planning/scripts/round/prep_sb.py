# -*- coding: utf-8 -*-
"""핵심 옮김 검사 샌드박스. 사용: python prep_sb.py <NN-결핍> [...]
  → $DA_WORK/core/<NN>/2-출발점.md + 설계.md(기획서에서 판단 칸·카드·채점·검사 줄·규칙 번호·P-ID를 거름)
판례 비평 샌드박스(critic)는 2026-10-12 토큰 줄이기로 판례 비평을 멈춰 뺐다(3회차 scratchpad 판에만 있음).
"""
import os
import shutil
import sys

from round_env import ROUND, SCRIPTS, WORK, HERE

sys.path.insert(0, HERE)
sys.path.insert(0, SCRIPTS)
from prep_norm import strip  # noqa: E402
from eye_prep import clean, CHECK  # noqa: E402


def core(name):
    num = name.split("-", 1)[0]
    d = os.path.join(WORK, "core", num)
    os.makedirs(d, exist_ok=True)
    src = os.path.join(ROUND, name)
    shutil.copy(os.path.join(src, "2-출발점.md"), os.path.join(d, "2-출발점.md"))
    t = clean(strip(open(os.path.join(src, "기획서.md"), encoding="utf-8").read()))
    open(os.path.join(d, "설계.md"), "w", encoding="utf-8").write("# 지금 설계 (기획서에서 판단 칸·카드·검사 결과를 뺀 것)\n\n" + t)
    left = sorted({m.group(0) for m in CHECK.finditer(t)})
    print("core", name, d, len(t), "남은 말", left)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    for n in sys.argv[1:]:
        core(n)

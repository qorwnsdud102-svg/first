# -*- coding: utf-8 -*-
"""핵심 옮김 검사·판례 비평 샌드박스. 사용: python prep_sb.py <NN-결핍> [...]
  → $DA_WORK/core/<NN>/2-출발점.md + 설계.md(기획서에서 판단 칸·카드·채점·검사 줄·규칙 번호·P-ID를 거름)
  → $DA_WORK/critic/C<NN>/기획서.md + 말-*.md·사례.md(사장님 눈 재료 $DA_WORK/eye/judge/ — 있을 때만)
판례 비평은 3회차 14:50에 멈췄다가 4회차에 다시 켰다(3회차 봉인 7개가 사장님 점수와 순위 상관 0.78 — 1명, 봉인 예측용).
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


def critic(name):
    j = os.path.join(WORK, "eye", "judge")
    if not os.path.exists(os.path.join(j, "사례.md")):
        print("critic", name, "건너뜀 — 사장님 눈 재료 없음")
        return
    d = os.path.join(WORK, "critic", "C" + name.split("-", 1)[0])
    os.makedirs(d, exist_ok=True)
    shutil.copy(os.path.join(ROUND, name, "기획서.md"), os.path.join(d, "기획서.md"))
    for f in os.listdir(j):
        if f == "사례.md" or f.startswith("말-"):
            shutil.copy(os.path.join(j, f), os.path.join(d, f))
    print("critic", name, d)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    for n in sys.argv[1:]:
        core(n)
        critic(n)

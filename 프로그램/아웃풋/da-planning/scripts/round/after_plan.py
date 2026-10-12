# -*- coding: utf-8 -*-
"""기획자 하나가 끝나면 한 번에: check_plan → 카드 길이 → 커밋(명시 경로만) → 핵심 옮김 샌드박스·지시문.

사용: python after_plan.py <NN-결핍> [--fix "<고친 것 한 줄>"] [--no-commit]
  --fix   고친 설계(핵심 옮김 탈락 뒤)일 때. 커밋 말머리가 '고친 설계'가 된다.
위반이 있거나 카드가 700~850자 밖이면 커밋·샌드박스 없이 멈춘다(종료 코드 1).
워크플로에서 여러 기획이 동시에 커밋하면 git index.lock이 부딪히므로 잠깐 기다려 다시 한다.
"""
import argparse
import os
import re
import subprocess
import sys
import time

from round_env import DA, ENV, HERE, NO, ROUND, SIGN, VAULT, WORK

CARD = (700, 850)
SLACK = 20  # 몇 자 넘침으로 멈추지 않는다(4회차 852·855자로 두 기획이 멈춤) — 범위 밖이면 경고만 찍고, 680~870 밖이면 멈춘다


def run(cmd, cwd=None):
    for _ in range(15):
        r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, encoding="utf-8", env=ENV)
        out = (r.stdout + r.stderr).strip()
        if "index.lock" not in out:
            return r.returncode, out
        time.sleep(2)
    return r.returncode, out


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser()
    ap.add_argument("name")
    ap.add_argument("--fix")
    ap.add_argument("--no-commit", action="store_true")
    a = ap.parse_args()
    num, gap = a.name.split("-", 1)
    plan = os.path.join(ROUND, a.name, "기획서.md")
    t = open(plan, encoding="utf-8").read()

    _, out = run([sys.executable, os.path.join(DA, "scripts", "check_plan.py"), plan])
    last = out.splitlines()[-1] if out else ""
    hit = re.search(r"위반 (\d+)", last)
    n_bad = int(hit.group(1)) if hit else -1
    m = re.search(r"\n## 사장님 카드[^\n]*\n(.*?)(?=\n## |\Z)", t, re.S)
    card = len(m.group(1).strip()) if m else 0
    line = re.search(r"^한 줄:\s*(.+)$", t, re.M)
    line = line.group(1).strip() if line else "(한 줄 없음)"
    print(f"{a.name}: check_plan {last} · 카드 {card}자 · 한 줄: {line}")
    if not CARD[0] <= card <= CARD[1]:
        print(f"카드 길이 경고 — {card}자(목표 {CARD[0]}~{CARD[1]})")
    if n_bad != 0 or not CARD[0] - SLACK <= card <= CARD[1] + SLACK:
        print(f"멈춤 — 위반 0·카드 {CARD[0] - SLACK}~{CARD[1] + SLACK}자가 아니다")
        sys.exit(1)

    if not a.no_commit:
        paths = [os.path.join(ROUND, a.name)]
        for p in (os.path.join(VAULT, r"마케팅\프로젝트\DA-기획\기초분석", gap),
                  os.path.join(DA, r"references\목소리사전", gap + ".json")):
            if os.path.exists(p):
                paths.append(p)
        run(["git", "add", "--"] + paths, cwd=VAULT)
        _, staged = run(["git", "diff", "--cached", "--name-only"], cwd=VAULT)
        if staged:
            head = f"고친 설계 — {a.fix}" if a.fix else line
            msg = f"feat: 기획 {NO}회차 {num} {gap} {head}. check_plan 위반 0, 카드 {card}자" + SIGN
            code, out = run(["git", "commit", "-q", "-m", msg], cwd=VAULT)
            print("커밋" if code == 0 else f"커밋 실패: {out[-300:]}")
            print(run(["git", "log", "--oneline", "-1"], cwd=VAULT)[1])
        else:
            print("커밋할 바뀐 파일 없음")

    for script in ("prep_sb.py", "mk_judge.py"):
        code, out = run([sys.executable, os.path.join(HERE, script), a.name], cwd=HERE)
        print(out.splitlines()[-1] if out else script)
        if code:
            sys.exit(code)
    print("판정자 지시문:", os.path.join(WORK, "core", num, "_지시.md"))


if __name__ == "__main__":
    main()

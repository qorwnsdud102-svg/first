# -*- coding: utf-8 -*-
"""사장님 눈(대리 심사관) 준비 — 회차 워크플로가 부르는 두 단계.

  python eye_round.py <눈 폴더 이름> norm <NN-결핍> [...]
      판정 재료가 없으면 eye_v2.py materials로 $DA_WORK/eye/judge/에 만들고,
      화면에 올릴 기획서를 정규화 입력($DA_WORK/eye/norm/<Q코드>.txt)과 정리 담당 지시문(norm/_지시.md)으로 만든다.
      정리 담당은 결과를 $DA_WORK/eye/out/norm.md에 Write로 쓴다.
  python eye_round.py <눈 폴더 이름> cards
      norm.md를 코드표로 나눠 <눈 폴더>/카드/R<회차>-NN.md(7줄)에 쓰고, 설정.json '시험'을 그 ID로 바꾸고,
      eye_v2.py cards로 판정 카드 두 순서를 만들고, 판정자 지시문 judge/_지시-눈-1·2.md를 쓴 뒤 카드·코드표·설정을 커밋한다.
<눈 폴더 이름>: 기획-시스템/자가학습/시험/ 아래 폴더(예: 눈-v4).
"""
import json
import os
import re
import subprocess
import sys

from round_env import ENV, HERE, NO, ROUND, SCRIPTS, SELF_LEARN, SIGN, VAULT, WORK

sys.path.insert(0, SCRIPTS)
from eye_prep import CHECK  # noqa: E402  규칙 번호·P-ID·'사장님' 같은 누출 말

E = os.path.join(WORK, "eye")
NORM, OUT, MAP, J = (os.path.join(E, "norm"), os.path.join(E, "out", "norm.md"),
                     os.path.join(E, "norm-map.json"), os.path.join(E, "judge"))
LABELS = ["무엇", "누구", "상징원", "가져온 것", "옮긴 칸", "1초 장면", "가격"]


def run(cmd, cwd=None):
    r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, encoding="utf-8", env=ENV)
    if r.returncode:
        sys.exit(f"실패: {' '.join(cmd)}\n{r.stdout}{r.stderr}")
    return r.stdout.strip()


def norm(eye_dir, names):
    cfg = os.path.join(eye_dir, "설정.json")
    if not os.path.exists(os.path.join(J, "사례.md")):
        print(run([sys.executable, os.path.join(SCRIPTS, "eye_v2.py"), "materials", cfg, E]))
    ids = [f"R{NO}-" + n.split("-", 1)[0] for n in names]
    if os.path.isdir(NORM):
        for f in os.listdir(NORM):
            os.remove(os.path.join(NORM, f))
    print(run([sys.executable, os.path.join(HERE, "prep_norm.py")] + [os.path.join(ROUND, n) for n in names]
              + ["--ids"] + ids + ["--out", NORM, "--map", MAP]))
    files = sorted(f for f in os.listdir(NORM) if f.endswith(".txt"))
    body = run([sys.executable, os.path.join(HERE, "make_norm_prompt.py"), NORM] + files)
    body = body.replace("이 파일들만 Read 도구로", "이 파일들(과 이 지시문)만 Read 도구로")
    body += (f"\n\n저장: 다 쓴 카드(위 출력 형식 그대로, {len(files)}장 모두)를 Write 도구로 {OUT} 에 쓴다. "
             "이 파일 말고는 아무것도 만들거나 고치지 않는다. 마지막 답은 '완료 N장' 한 줄만 쓴다.")
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    if os.path.exists(OUT):
        os.remove(OUT)
    p = os.path.join(NORM, "_지시.md")
    open(p, "w", encoding="utf-8").write(body + "\n")
    print("정리 지시문:", p)


def cards(eye_dir):
    table = json.load(open(MAP, encoding="utf-8"))
    code2id = {c: i for i, c in table.items()}
    blocks = re.split(r"^###\s*(Q\d+)\s*$", open(OUT, encoding="utf-8").read(), flags=re.M)
    got = {}
    for code, body in zip(blocks[1::2], blocks[2::2]):
        lines = [ln.strip() for ln in body.strip().splitlines() if ln.strip().startswith("- ")]
        labels = [m.group(1).strip() for m in (re.match(r"-\s*([^:]+):", ln) for ln in lines) if m]
        if labels != LABELS:
            sys.exit(f"{code}: 양식이 다르다 {labels}")
        left = sorted({m.group(0) for m in CHECK.finditer("\n".join(lines))})
        if left:
            sys.exit(f"{code}: 누출 말이 남았다 {left}")
        got[code2id[code]] = "\n".join(lines) + "\n"
    want = sorted(i for i in table if os.path.exists(os.path.join(NORM, table[i] + ".txt")))
    if sorted(got) != want:
        sys.exit(f"카드 수가 다르다: 받음 {sorted(got)} / 기대 {want}")
    cdir = os.path.join(eye_dir, "카드")
    os.makedirs(cdir, exist_ok=True)
    for f in os.listdir(cdir):
        if f.startswith(f"R{NO}-"):
            os.remove(os.path.join(cdir, f))
    for rid, t in got.items():
        open(os.path.join(cdir, rid + ".md"), "w", encoding="utf-8").write(t)
        print(rid, len(t), "자")
    cfg_p = os.path.join(eye_dir, "설정.json")
    cfg = json.load(open(cfg_p, encoding="utf-8"))
    cfg["시험"] = sorted(got)
    json.dump(cfg, open(cfg_p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(run([sys.executable, os.path.join(SCRIPTS, "eye_v2.py"), "cards", cfg_p, E]))
    src = open(os.path.join(eye_dir, "지시문-판정.md"), encoding="utf-8").read()
    eye = src.split("```")[1].strip("\n")
    files = ", ".join(os.path.join(J, n) for n in ["사례.md"] + [f"말-{i}.md" for i in range(1, 8)])
    for r in (1, 2):
        p = os.path.join(J, f"_지시-눈-{r}.md")
        open(p, "w", encoding="utf-8").write(eye.replace("{FILES}", files).replace("{CARDS}", os.path.join(J, f"카드-{r}.md")) + "\n")
        print("판정자 지시문:", p)
    rel = os.path.relpath(eye_dir, VAULT)
    run(["git", "add", "--", os.path.join(rel, "카드"), os.path.join(rel, "코드표.json"), os.path.join(rel, "설정.json")], cwd=VAULT)
    name = os.path.basename(eye_dir)
    run(["git", "commit", "-q", "-m", f"feat: 사장님 {name.replace('-', ' ')} 시험 카드 {len(got)}장({NO}회차 기획 → 7줄 정규화, 정리 1명) + 판정용 코드" + SIGN], cwd=VAULT)
    print(run(["git", "log", "--oneline", "-1"], cwd=VAULT))


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    eye_dir = os.path.join(SELF_LEARN, "시험", sys.argv[1])
    if sys.argv[2] == "norm":
        norm(eye_dir, sys.argv[3:])
    elif sys.argv[2] == "cards":
        cards(eye_dir)
    else:
        sys.exit(__doc__)

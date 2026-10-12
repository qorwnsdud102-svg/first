# -*- coding: utf-8 -*-
"""사장님 눈 v2 — 지난 시험 문항까지 판정 사례로 넣고, 아직 아무도 판정하지 않은 새 기획으로 시험한다.

눈 v1.1은 시험 카드에 대한 판정(코어 판례 등)을 누출 방지로 빼야 해서, 눈이 그 기준을 배울 수 없었다.
v2는 시험 문항을 새 기획(1회차)으로 바꾸고, 지난 문항 31장과 판례 전부를 재료로 쓴다.

사용:
  python eye_v2.py materials <설정.json> <샌드박스>  → <샌드박스>/judge/ 사례.md·말-*.md·v1-*.md·v2-*.md
  python eye_v2.py cards <설정.json> <샌드박스>      → <샌드박스>/judge/카드-1.md·카드-2.md(K 코드 무작위), 코드표.json '시험'
  python eye_v2.py score <설정.json> <결과 폴더> <사장님 답.md>
      사장님 답: '| R1-01 | ○ |' 또는 '| R1-01 | 7 |'(1~10점) 줄. 점수는 4점 이상 = ○(보류 이상).
      판정자 답의 진행·조건부·보류 = ○, 기각 = ×. 두 순서가 갈리면 0.5.
      점수가 오면 단계(1~3 기각·4~5 보류·6~7 조건부·8~10 진행)가 맞는지와 순위 상관(스피어만)도 적는다.
설정.json: 씨앗, 사례(ID 목록), 사례카드(폴더 또는 폴더 목록 — 앞에서부터 찾는다), 원천(ID→정답지 ID), H사례판정, 판례_끝(이 P-ID까지만), 시험(ID 목록).
시험 카드는 <설정 폴더>/카드/<ID>.md(정규화 7줄)에 둔다.
"""
import argparse
import glob
import json
import os
import random
import re
import shutil
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from eye_build import (H_VERDICT, SIM, answer_rows, clean_quote, panrye, save_table,  # noqa: E402
                       scrub_ids, write_parts)
from eye_score import is_pos, parse_table  # noqa: E402

MARK = re.compile(r"^\|\s*(R\d-\d{2})\s*\|\s*([○×xXoO]|10|[1-9])\s*\|", re.M)
BAND = ((3, 1), (5, 2), (7, 3), (10, 4))  # 사장님 점수 띠 → 단계. 아침 화면의 띠와 같다.


def level(verdict):
    """판정자 말 → 단계(기각 1 · 보류 2 · 조건부 3 · 진행 4). 모르면 None."""
    v = re.split(r"[(（]", verdict)[0].replace(" ", "")
    if v.startswith(("기각", "패스")):
        return 1
    return next((n for w, n in (("조건부", 3), ("진행", 4), ("보류", 2)) if w in v), None)


def band(points):
    return next(n for top, n in BAND if points <= top)


def spearman(xs, ys):
    def ranks(v):
        order = sorted(range(len(v)), key=lambda i: v[i])
        out, i = [0.0] * len(v), 0
        while i < len(order):
            j = i
            while j + 1 < len(order) and v[order[j + 1]] == v[order[i]]:
                j += 1
            for k in order[i:j + 1]:
                out[k] = (i + j) / 2 + 1
            i = j + 1
        return out
    rx, ry = ranks(xs), ranks(ys)
    mx, my = sum(rx) / len(rx), sum(ry) / len(ry)
    vx, vy = sum((a - mx) ** 2 for a in rx), sum((b - my) ** 2 for b in ry)
    return sum((a - mx) * (b - my) for a, b in zip(rx, ry)) / (vx * vy) ** 0.5 if vx and vy else None


def load(cfg_path):
    cfg = json.load(open(cfg_path, encoding="utf-8"))
    base = os.path.dirname(os.path.abspath(cfg_path))
    tpath = os.path.join(base, "코드표.json")
    table = json.load(open(tpath, encoding="utf-8")) if os.path.exists(tpath) else {}
    return cfg, base, table, tpath


def pnum(pid):
    return int(pid[1:])


def materials(cfg_path, sandbox, ans=None, pan=None):
    cfg, base, table, tpath = load(cfg_path)
    ans = answer_rows() if ans is None else ans
    pan = panrye() if pan is None else pan
    jd = os.path.join(sandbox, "judge")
    if os.path.isdir(jd):
        shutil.rmtree(jd)
    os.makedirs(jd)
    src = cfg.get("원천", {})
    dirs = cfg["사례카드"] if isinstance(cfg["사례카드"], list) else [cfg["사례카드"]]
    dirs = [os.path.join(base, d) for d in dirs]
    ids = cfg["사례"]
    rcodes = [f"R{n:02d}" for n in range(1, len(ids) + 1)]
    random.Random(cfg["씨앗"] + 11).shuffle(rcodes)
    rcode = dict(zip(ids, rcodes))
    blocks = []
    for i in sorted(ids, key=lambda x: rcode[x]):
        if i.startswith("H"):
            p = pan[cfg["H사례판정"]["말"]]
            verdict, quote = H_VERDICT, f"{p['원문']} (요지: {p['요지']})"
        else:
            a = ans[src.get(i, i)]
            verdict, quote = a["판정"], clean_quote(a["원문"])
        path = next(q for q in (os.path.join(x, i + ".md") for x in dirs) if os.path.exists(q))
        card = open(path, encoding="utf-8").read().strip()
        blocks.append(f"### {rcode[i]}\n{card}\n- 사장님 판정: {scrub_ids(verdict)}\n- 사장님 말: {scrub_ids(quote)}\n")
    open(os.path.join(jd, "사례.md"), "w", encoding="utf-8").write(
        f"# 판정 사례집 — 사장님이 실제로 판정한 카드 {len(ids)}장\n\n"
        "카드는 모두 같은 양식(7줄 또는 상징 후보 4줄)으로 옮겨 적은 것이다. 판정과 말은 사장님 원문이다.\n\n"
        + "\n".join(blocks))
    end = pnum(cfg["판례_끝"])
    kept = [f"- {pid} [{r['종류']}] 원문 {scrub_ids(r['원문'])} / 요지 {scrub_ids(r['요지'])}"
            for pid, r in pan.items()
            if re.fullmatch(r"P\d{4}", pid) and pnum(pid) <= end and pid not in cfg.get("제외P", {})]
    said = write_parts(jd, "말", "사장님 말 모음 — 기획에 대해 사장님이 직접 한 말(원문)과 요지", kept)
    books = {}
    for v in ("v1", "v2"):
        lines = open(os.path.join(SIM, "규칙집", f"규칙집-{v}.md"), encoding="utf-8").read().splitlines()
        books[v] = write_parts(jd, v, f"규칙집 {v} — 시험용 사본", lines)
    table["사례"] = {c: i for i, c in rcode.items()}
    save_table(table, tpath)
    return {"사례": len(ids), "말": said, "말 줄": len(kept), "v1": books["v1"], "v2": books["v2"]}


def cards(cfg_path, sandbox):
    cfg, base, table, tpath = load(cfg_path)
    jd = os.path.join(sandbox, "judge")
    os.makedirs(jd, exist_ok=True)
    tests = cfg["시험"]
    kcodes = [f"K{n:02d}" for n in range(1, len(tests) + 1)]
    random.Random(cfg["씨앗"] + 13).shuffle(kcodes)
    kcode = dict(zip(tests, kcodes))
    for r in (1, 2):
        order = tests[:]
        random.Random(cfg["씨앗"] + 100 + r).shuffle(order)
        body = "\n".join(f"### {kcode[i]}\n" + open(os.path.join(base, "카드", i + ".md"), encoding="utf-8").read().strip()
                         + "\n" for i in order)
        open(os.path.join(jd, f"카드-{r}.md"), "w", encoding="utf-8").write(f"# 시험 카드 {len(tests)}장 (순서 {r})\n\n" + body)
    table["시험"] = {c: i for i, c in kcode.items()}
    save_table(table, tpath)
    return kcode


def score(cfg_path, folder, boss_path):
    cfg, base, table, _ = load(cfg_path)
    back = table["시험"]
    raw = dict(MARK.findall(open(boss_path, encoding="utf-8").read()))
    pts = {k: int(v) for k, v in raw.items() if v.isdigit()}
    boss = {k: (pts[k] >= 4 if k in pts else v in "○oO") for k, v in raw.items()}
    rows = []
    for judge in ("눈", "v1", "v2"):
        runs = [parse_table(f, "K") for f in sorted(glob.glob(os.path.join(folder, f"{judge}-*.md")))]
        if not runs:
            continue
        hit, same, detail, xs, ys = 0.0, 0.0, [], [], []
        for code, rid in sorted(back.items(), key=lambda kv: kv[1]):
            if rid not in boss:
                continue
            votes = [is_pos(r[code]["판정"]) for r in runs if code in r]
            p = sum(votes) / len(votes) if votes else 0.5
            got = p if boss[rid] else 1 - p
            hit += got
            detail.append(f"{rid} {'○' if boss[rid] else '×'}:{got:g}")
            lv = [x for x in (level(r[code]["판정"]) for r in runs if code in r) if x]
            if rid in pts and lv:
                same += sum(x == band(pts[rid]) for x in lv) / len(lv)
                xs.append(sum(lv) / len(lv))
                ys.append(pts[rid])
        rho = spearman(xs, ys) if len(xs) >= 3 else None
        rows.append(f"| {judge} | {hit:g}/{len(boss)} | {f'{same:g}/{len(xs)}' if xs else '—'} | "
                    f"{'—' if rho is None else f'{rho:.2f}'} | {' · '.join(detail)} |")
    head = "| 판정자 | 사장님과 맞음(보류 이상 = ○) | 단계 맞음 | 순위 상관 | 문항별 |"
    return "\n".join([head, "|---|---|---|---|---|"] + rows)


def main(argv=None):
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    for name in ("materials", "cards"):
        p = sub.add_parser(name)
        p.add_argument("cfg")
        p.add_argument("sandbox")
    s = sub.add_parser("score")
    s.add_argument("cfg")
    s.add_argument("folder")
    s.add_argument("boss")
    a = ap.parse_args(argv)
    if a.cmd == "materials":
        print(materials(a.cfg, a.sandbox))
    elif a.cmd == "cards":
        print(cards(a.cfg, a.sandbox))
    else:
        print(score(a.cfg, a.folder, a.boss))
    return 0


if __name__ == "__main__":
    sys.exit(main())

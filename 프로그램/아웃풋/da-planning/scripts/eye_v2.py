# -*- coding: utf-8 -*-
"""사장님 눈 v2 — 지난 시험 문항까지 판정 사례로 넣고, 아직 아무도 판정하지 않은 새 기획으로 시험한다.

눈 v1.1은 시험 카드에 대한 판정(코어 판례 등)을 누출 방지로 빼야 해서, 눈이 그 기준을 배울 수 없었다.
v2는 시험 문항을 새 기획(1회차)으로 바꾸고, 지난 문항 31장과 판례 전부를 재료로 쓴다.

사용:
  python eye_v2.py materials <설정.json> <샌드박스>  → <샌드박스>/judge/ 사례.md·말-*.md·v1-*.md·v2-*.md
  python eye_v2.py cards <설정.json> <샌드박스>      → <샌드박스>/judge/카드-1.md·카드-2.md(K 코드 무작위), 코드표.json '시험'
  python eye_v2.py score <설정.json> <결과 폴더> <사장님 답.md>
      사장님 답: '| R1-01 | ○ |' 줄. 판정자 답의 진행·조건부·보류 = ○, 기각 = ×. 두 순서가 갈리면 0.5.
설정.json: 씨앗, 사례(ID 목록), 사례카드(폴더), 원천(ID→정답지 ID), H사례판정, 판례_끝(이 P-ID까지만), 시험(ID 목록).
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

MARK = re.compile(r"^\|\s*(R\d-\d{2})\s*\|\s*([○×xXoO])\s*\|", re.M)


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
    src, cards = cfg.get("원천", {}), os.path.join(base, cfg["사례카드"])
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
        card = open(os.path.join(cards, i + ".md"), encoding="utf-8").read().strip()
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
    boss = {k: (v in "○oO") for k, v in MARK.findall(open(boss_path, encoding="utf-8").read())}
    rows = []
    for judge in ("눈", "v1", "v2"):
        runs = [parse_table(f, "K") for f in sorted(glob.glob(os.path.join(folder, f"{judge}-*.md")))]
        if not runs:
            continue
        hit, detail = 0.0, []
        for code, rid in sorted(back.items(), key=lambda kv: kv[1]):
            if rid not in boss:
                continue
            votes = [is_pos(r[code]["판정"]) for r in runs if code in r]
            p = sum(votes) / len(votes) if votes else 0.5
            got = p if boss[rid] else 1 - p
            hit += got
            detail.append(f"{rid} {'○' if boss[rid] else '×'}:{got:g}")
        rows.append(f"| {judge} | {hit:g}/{len(boss)} | {' · '.join(detail)} |")
    return "\n".join(["| 판정자 | 사장님 ○/×와 맞음 | 문항별 |", "|---|---|---|"] + rows)


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

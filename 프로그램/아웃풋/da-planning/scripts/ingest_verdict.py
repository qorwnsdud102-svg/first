# -*- coding: utf-8 -*-
"""⑩ 사장님 판정 받아 적기 — 판례 번호를 자동으로 매기고, 인용이 raw 원문에 정말 있는지 대조한 뒤 두 표에 붙인다.
사장님 2026-10-11 "많이 물어보면 내 판단능력도 떨어져"(P6247) — 반영은 Claude가 혼자 빠르고 틀림없이 끝낸다.

사용:
  python ingest_verdict.py next [--table <판례-원문목록.md>]
  python ingest_verdict.py add --raw <raw 파일 이름> --lines 8-12 --quote "<원문 그대로>" --summary "<요지>"
        --kind 규칙|판정|기각|운영 승인|질문|제안|지시|방법 --rule "<⑩-09 또는 '제외: 이유'>"
        [--table …] [--map …] [--raw-dir …]
  인용은 원문 줄 범위 안에 있어야 한다(띄어쓰기·줄바꿈은 무시, ' / '는 줄 사이 이음으로 본다). 없으면 아무것도 쓰지 않고 멈춘다.
  raw 파일은 먼저 Write로 원문 그대로 저장한다(raw는 고치지 않는다).
"""
import argparse
import os
import re
import sys

VAULT = r"C:\claude\LLM-WIKI"
TABLE = os.path.join(VAULT, r"마케팅\프로젝트\DA-기획\기획-시스템\작업\판례-원문목록.md")
MAP = os.path.join(VAULT, r"마케팅\프로젝트\DA-기획\기획-시스템\작업\판례-매핑표.md")
RAW_DIR = os.path.join(VAULT, r"마케팅\raw\본인")
PID = re.compile(r"^\|\s*P(\d{4})\s*\|", re.M)


def next_pid(table_text):
    nums = [int(n) for n in PID.findall(table_text)]
    return f"P{max(nums) + 1}" if nums else "P0001"


def nz(s):
    return re.sub(r"\s+", "", s)


def quote_ok(quote, lines, start, end):
    """인용 조각들(' / '·'…'로 나눔)이 모두 원문 start~end줄(1부터) 안에 있나 — 띄어쓰기는 무시"""
    body = nz("".join(lines[start - 1:end]))
    parts = [p for p in re.split(r"\s/\s|…", quote) if nz(p)]
    return bool(parts) and all(nz(p) in body for p in parts)


def add(table, mapping, raw_dir, raw, lines, quote, summary, kind, rule):
    raw_lines = open(os.path.join(raw_dir, raw), encoding="utf-8").read().splitlines()
    a, _, b = lines.partition("-")
    start, end = int(a), int(b or a)
    if not quote_ok(quote, raw_lines, start, end):
        raise ValueError(f"인용이 원문에 없음: {raw}:{lines}")
    text = open(table, encoding="utf-8").read()
    pid = next_pid(text)
    clean = lambda s: s.replace("|", "/").replace("\n", " ").strip()
    row = f'| {pid} | {raw}:{lines} | "{clean(quote)}" | {clean(summary)} | {clean(kind)} |'
    with open(table, "a", encoding="utf-8") as f:
        f.write(("" if text.endswith("\n") else "\n") + row + "\n")
    mtext = open(mapping, encoding="utf-8").read()
    with open(mapping, "a", encoding="utf-8") as f:
        f.write(("" if mtext.endswith("\n") else "\n") + f"| {pid} | {clean(rule)} |\n")
    return pid


def main(argv=None):
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    n = sub.add_parser("next")
    n.add_argument("--table", default=TABLE)
    d = sub.add_parser("add")
    for k, v in (("--table", TABLE), ("--map", MAP), ("--raw-dir", RAW_DIR)):
        d.add_argument(k, default=v)
    for k in ("--raw", "--lines", "--quote", "--summary", "--kind", "--rule"):
        d.add_argument(k, required=True)
    a = ap.parse_args(argv)
    if a.cmd == "next":
        print(next_pid(open(a.table, encoding="utf-8").read()))
        return 0
    try:
        pid = add(a.table, a.map, a.raw_dir, a.raw, a.lines, a.quote, a.summary, a.kind, a.rule)
    except ValueError as e:
        print(f"✗ {e} — 아무것도 쓰지 않음")
        return 1
    print(f"{pid} 추가 → {a.rule}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

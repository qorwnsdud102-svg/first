# -*- coding: utf-8 -*-
"""DA 기획 단계별 규칙집 형식·판례 매핑 검사.

사용:
    python check_rulebook.py <규칙집.md>
    python check_rulebook.py <규칙집.md> --cases <판례-원문목록.md> --mapping <판례-매핑표.md>
종료 코드 0 = 통과, 1 = 위반(목록 출력).
"""
import argparse, re, sys
from pathlib import Path

STAGES = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧"]
FIELDS = ["목표", "입력", "출력", "통과 조건"]
MAX_LINES = 300
STAGE_RE = re.compile(r"^## ([①-⑧]) ")
RULE_START_RE = re.compile(r"^- [①-⑧]-\d")
RULE_RE = re.compile(r"^- ([①-⑧])-(\d{2}) (🔒|📊|🧪) (하드|경고) \| (.+?) \| (.+)$")
REF_RE = re.compile(r"[①-⑧]-\d{2}")


def check_rulebook(text):
    """반환: (위반 목록, 규칙 번호 집합)"""
    errs, ids, seen, fields = [], set(), [], {}
    lines = text.splitlines()
    if len(lines) > MAX_LINES:
        errs.append(f"줄 수 {len(lines)} > {MAX_LINES}")
    current = None
    for no, ln in enumerate(lines, 1):
        m = STAGE_RE.match(ln)
        if m:
            current = m.group(1)
            seen.append(current)
            fields[current] = set()
            continue
        if ln.startswith("## "):
            current = None
            continue
        if current is None:
            continue
        for f in FIELDS:
            if ln.startswith(f"- {f}:"):
                fields[current].add(f)
        if RULE_START_RE.match(ln):
            r = RULE_RE.match(ln)
            if not r:
                errs.append(f"{no}행 규칙 형식 위반: {ln[:60]}")
                continue
            st, num, grade, strength, _body, basis = r.groups()
            rid = f"{st}-{num}"
            if st != current:
                errs.append(f"{no}행 {rid}가 {current} 단계 밑에 있음")
            if rid in ids:
                errs.append(f"{no}행 번호 중복 {rid}")
            ids.add(rid)
            if strength == "하드" and grade != "🔒":
                errs.append(f"{no}행 {rid}: 하드는 🔒만")
            if not basis.strip():
                errs.append(f"{no}행 {rid}: 근거 없음")
    if seen != STAGES:
        errs.append(f"단계 제목 순서·누락: {''.join(seen)}")
    for st in seen:
        missing = [f for f in FIELDS if f not in fields.get(st, set())]
        if missing:
            errs.append(f"{st} 단계 칸 누락: {', '.join(missing)}")
    return errs, ids


def check_mapping(case_text, map_text, rule_ids):
    """판례 목록의 모든 P-ID가 매핑표에 있고, 가리키는 규칙이 실제로 있는지 검사."""
    errs = []
    cases = re.findall(r"^\| (P\d{4}) \|", case_text, re.M)
    mapped = {}
    for ln in map_text.splitlines():
        m = re.match(r"^\| (P\d{4}) \| (.*?) \|$", ln.strip())
        if m:
            mapped[m.group(1)] = m.group(2).strip()
    for pid in cases:
        if pid not in mapped:
            errs.append(f"매핑 누락 {pid}")
    for pid, target in mapped.items():
        if target.startswith("제외:"):
            if not target[len("제외:"):].strip():
                errs.append(f"{pid} 제외 사유 없음")
            continue
        refs = REF_RE.findall(target)
        if not refs:
            errs.append(f"{pid} 규칙 번호 없음: {target}")
        for ref in refs:
            if ref not in rule_ids:
                errs.append(f"{pid} → 없는 규칙 {ref}")
    return errs


def main():
    # Windows 콘솔(cp949)에서 🔒 같은 이모지가 든 위반 메시지가 UnicodeEncodeError로 죽지 않게
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("rulebook")
    ap.add_argument("--cases")
    ap.add_argument("--mapping")
    a = ap.parse_args()
    errs, ids = check_rulebook(Path(a.rulebook).read_text(encoding="utf-8"))
    if a.cases and a.mapping:
        errs += check_mapping(Path(a.cases).read_text(encoding="utf-8"),
                              Path(a.mapping).read_text(encoding="utf-8"), ids)
    for e in errs:
        print(e)
    print(f"규칙 {len(ids)}개 · 위반 {len(errs)}개")
    return 1 if errs else 0


if __name__ == "__main__":
    sys.exit(main())

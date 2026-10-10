# -*- coding: utf-8 -*-
"""DA 기획서 제출 전 검사.

사용:
    python check_plan.py <기획서.md> [--rulebook <정본 규칙집.md>] [--vault <vault 루트>]
검사 4가지:
  ① 출발점 근거 — '## 출발점 근거' 절에 오래 돈 광고(시장 카드 경로 또는 라이브러리 ID)
     또는 유명 상징재(+ 숫자가 든 인지 근거)가 있고, 범위 단계가 적혀 있나
  ② 규칙 번호 — 본문의 ①-01 꼴 번호가 정본 규칙집에 실제로 있나
  ③ 채점표 — 맨 끝 '## 사장님 채점' 절에 ①~⑧ 여덟 칸이 있나
  ④ 하드 — '탈락'·'하드'로 적은 규칙이 정본에서 하드인가 (하드 탈락이면 제출 불가)
종료 코드 0 = 통과, 1 = 위반(목록 출력).
"""
import argparse, re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_rulebook import RULE_RE, REF_RE, STAGES

VAULT = "C:/claude/LLM-WIKI"
RULEBOOK = "마케팅/wiki/syntheses/DA 기획 단계별 규칙.md"
CARD_RE = re.compile(r"[^\s|()`'\"]+/시장카드\.md")
AD_ID_RE = re.compile(r"(?:라이브러리|광고) ID:?\s*\d{12,20}")
SYMBOL_RE = re.compile(r"^-\s*상징재:\s*\S")
AWARE_RE = re.compile(r"^-\s*인지 근거:.*\d")
RANGE_RE = re.compile(r"^-\s*범위 단계:\s*[123]")
ROW_DROP_RE = re.compile(r"^\|[^|]*\|\s*탈락\s*\|")
INLINE_HARD_RE = re.compile(r"([①-⑧]-\d{2})(?!\d)\s*(?:🔒\s*)?하드")


def section(text, title):
    """'## <title>…' 절의 줄 목록(제목 줄 제외). 절이 없으면 None."""
    out, inside = None, False
    for ln in text.splitlines():
        if ln.startswith("## "):
            if inside:
                break
            if ln[3:].strip().startswith(title):
                inside, out = True, []
            continue
        if inside:
            out.append(ln)
    return out


def rule_table(book_text):
    """정본 규칙집 → {규칙 번호: 강도(하드/경고)}"""
    table = {}
    for ln in book_text.splitlines():
        r = RULE_RE.match(ln.replace("\ufe0f", ""))
        if r:
            table[f"{r.group(1)}-{r.group(2)}"] = r.group(4)
    return table


def check_start(text, exists):
    lines = section(text, "출발점 근거")
    if lines is None:
        return ["① 출발점 근거 절(## 출발점 근거)이 없음"]
    lines = [l.strip() for l in lines]
    body = "\n".join(lines)
    errs = []
    cards = CARD_RE.findall(body)
    for c in cards:
        if not exists(c):
            errs.append(f"① 시장 카드 파일 없음: {c}")
    long_ad = bool(cards) or bool(AD_ID_RE.search(body))
    symbol = any(SYMBOL_RE.match(l) for l in lines) and any(AWARE_RE.match(l) for l in lines)
    if not (long_ad or symbol):
        errs.append("① 출발점 근거 없음 — 오래 돈 광고(시장 카드 경로·라이브러리 ID) "
                    "또는 유명 상징재 + 숫자가 든 인지 근거")
    if not any(RANGE_RE.match(l) for l in lines):
        errs.append("① 범위 단계(- 범위 단계: 1~3)가 없음")
    return errs


def check_refs(text, table):
    return [f"② 정본에 없는 규칙 번호 {ref}"
            for ref in dict.fromkeys(REF_RE.findall(text)) if ref not in table]


def check_scorecard(text):
    lines = section(text, "사장님 채점")
    if lines is None:
        return ["③ 사장님 채점표(## 사장님 채점)가 없음"]
    errs = []
    heads = [l for l in text.splitlines() if l.startswith("## ")]
    if not heads[-1][3:].strip().startswith("사장님 채점"):
        errs.append("③ 사장님 채점표가 기획서 맨 끝이 아님")
    rows = {l.strip()[1:].strip()[:1] for l in lines if l.strip().startswith("|")}
    missing = [s for s in STAGES if s not in rows]
    if missing:
        errs.append(f"③ 채점표 칸 누락: {''.join(missing)}")
    return errs


def check_hard(text, table):
    errs = []
    for ln in section(text, "단계별 판정") or []:
        ln = ln.strip()
        if not ROW_DROP_RE.match(ln):
            continue
        refs = REF_RE.findall(ln)
        if not refs:
            errs.append(f"④ 탈락인데 규칙 번호 없음: {ln[:60]}")
        for ref in refs:
            if table.get(ref) == "하드":
                errs.append(f"④ {ref} 하드 탈락 — 이 기획은 제출하지 않는다")
            elif table.get(ref) == "경고":
                errs.append(f"④ {ref}는 정본에서 경고 — 탈락이 아니라 경고로 적고 '사장님 판단 칸'으로 넘긴다")
    for ref in INLINE_HARD_RE.findall(text):
        if table.get(ref) == "경고":
            errs.append(f"④ {ref}를 하드로 적었으나 정본에서 경고")
    return errs


def check_plan(text, book_text, exists=lambda p: True):
    """반환: 위반 목록 (빈 목록 = 통과)"""
    text = text.replace("\ufe0f", "")
    table = rule_table(book_text)
    errs = [] if table else ["정본 규칙집에서 규칙을 하나도 못 읽음 — --rulebook 경로 확인"]
    errs += check_start(text, exists)
    errs += check_refs(text, table)
    errs += check_scorecard(text)
    errs += check_hard(text, table)
    return list(dict.fromkeys(errs))


def main(argv=None):
    # Windows 콘솔(cp949)에서 🔒·✔ 같은 문자가 든 메시지가 UnicodeEncodeError로 죽지 않게
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("plan")
    ap.add_argument("--vault", default=VAULT)
    ap.add_argument("--rulebook", help="기본: <vault>/" + RULEBOOK)
    a = ap.parse_args(argv)
    vault = Path(a.vault)
    book = Path(a.rulebook) if a.rulebook else vault / RULEBOOK

    def exists(p):
        q = Path(p)
        return (q if q.is_absolute() else vault / q).exists()

    errs = check_plan(Path(a.plan).read_text(encoding="utf-8"),
                      book.read_text(encoding="utf-8"), exists)
    for e in errs:
        print(e)
    print(f"위반 {len(errs)}개")
    return 1 if errs else 0


if __name__ == "__main__":
    sys.exit(main())

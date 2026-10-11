# -*- coding: utf-8 -*-
"""DA 기획서 제출 전 검사.

사용:
    python check_plan.py <기획서.md> [--rulebook <정본 규칙집.md>] [--vault <vault 루트>] [--evidence <근거.md> ...]
검사 7가지:
  ① 출발점 근거 — '## 출발점 근거' 절에 오래 돈 광고(시장 카드 경로 또는 라이브러리 ID)
     또는 유명 상징재(+ 숫자가 든 인지 근거)가 있고, 범위 단계가 적혀 있나
  ② 규칙 번호 — 본문의 ①-01 꼴 번호가 정본 규칙집에 실제로 있나
  ③ 채점표 — 맨 끝 '## 사장님 채점' 절에 ①~⑩ 열 칸이 있나 (정본 v2 10단계)
  ④ 하드 — '탈락'·'하드'로 적은 규칙이 정본에서 하드인가 (하드 탈락이면 제출 불가)
  ⑤ 한 줄 — 제목 다음 첫 줄이 '한 줄: <바르는 ○○ 또는 후킹 한마디>'인가 (정본 ⑦-01)
  ⑥ 목소리 — '## 출발점 근거'에 '- 목소리: <목소리 비중표 경로>'가 있고 그 파일이 있나 (①-01·①-24, 목소리 먼저)
  ⑦ 근거 대조 — 근거 파일에서 경고였던 테스트(1초 사진·이름 지우기·형태 역할·그거네)를 기획서에서
     통과로 적지 않았고, 경고였던 규칙 번호가 '## 사장님 판단 칸'에 있나 (④-57)
종료 코드 0 = 통과, 1 = 위반(목록 출력).
"""
import argparse, re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_rulebook import RULE_RE, REF_RE, STAGES, SYM

VAULT = "C:/claude/LLM-WIKI"
RULEBOOK = "마케팅/wiki/syntheses/DA 기획 단계별 규칙.md"
CARD_RE = re.compile(r"[^\s|()`'\"]+/시장카드\.md")
AD_ID_RE = re.compile(r"(?:라이브러리|광고) ID:?\s*\d{12,20}")
SYMBOL_RE = re.compile(r"^-\s*상징재:\s*\S")
AWARE_RE = re.compile(r"^-\s*인지 근거:.*\d")
RANGE_RE = re.compile(r"^-\s*범위 단계:\s*[123]")
ROW_DROP_RE = re.compile(r"^\|[^|]*\|\s*탈락\s*\|")
INLINE_HARD_RE = re.compile(rf"({SYM}-\d{{2}})(?!\d)\s*(?:🔒\s*)?하드")
PITCH_RE = re.compile(r"^한 줄:\s*\S")
VOICE_RE = re.compile(r"^-\s*목소리:\s*`?([^`\s]+\.md)`?")
TESTS = ("1초 사진", "이름 지우기", "형태 역할", "그거네")
STRENGTH_RE = re.compile(r"[🔒🧪📊]\s*(?:하드|경고)")
EV_WARN_RE = re.compile(r"\|\s*(?:△|✕|✗|×|경고|실패)\s*\||\((?:경고|△|실패)\)|→\s*(?:경고|실패|△)"
                        r"|[:：]\s*(?:경고|실패|△)(?=[\s,.)·]|$)")
WARN_RE = re.compile(r"△|✕|✗|×|경고|실패")


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


def check_pitch(text):
    """⑦-01 — 제목 줄 다음 첫 줄이 '한 줄: …'인가"""
    lines = [l.strip() for l in text.splitlines()]
    i = next((k for k, l in enumerate(lines) if l.startswith("# ")), None)
    first = next((l for l in lines[i + 1:] if l), "") if i is not None else ""
    if PITCH_RE.match(first):
        return []
    return ["⑤ 제목 다음 첫 줄에 '한 줄: <바르는 ○○ 또는 후킹 한마디>'가 없음 (⑦-01)"]


def check_voice(text, exists):
    """①-01·①-24 — 출발점 근거에 목소리 비중표가 있나(목소리를 먼저 모은다)"""
    lines = section(text, "출발점 근거")
    if lines is None:
        return []  # 절이 없으면 ①이 이미 잡는다
    paths = [m.group(1) for m in (VOICE_RE.match(l.strip()) for l in lines) if m]
    if not paths:
        return ["⑥ 출발점 근거에 '- 목소리: <목소리 비중표 경로>'가 없음 — 목소리를 먼저 모으고 출발점을 고른다 (①-01·①-24)"]
    return [f"⑥ 목소리 비중표 파일 없음: {p}" for p in paths if not exists(p)]


SEP_ROW_RE = re.compile(r"^\s*\|[\s:|-]+\|\s*$")


def warned(evidence):
    """근거 글들에서 경고로 적힌 테스트 이름과 규칙 번호. 규칙 강도 표시(🔒 경고 등)와
    머리줄이 '강도'인 표 칸은 세지 않는다. 한 줄에 테스트가 여럿이면 경고가 붙은 조각의 테스트만 센다
    (2026-10-11 1회차: 강도 칸 '경고'와 '1초 사진 → 경고, 이름 지우기 → 통과' 줄이 통과까지 경고로 잡혔다)."""
    tests, rules = set(), set()
    for t in evidence:
        lines = t.replace("️", "").splitlines()
        strength = None
        for i, ln in enumerate(lines):
            if ln.lstrip().startswith("|"):
                if SEP_ROW_RE.match(ln):
                    continue
                cells = [c.strip() for c in ln.strip().strip("|").split("|")]
                if i + 1 < len(lines) and SEP_ROW_RE.match(lines[i + 1]):
                    strength = next((k for k, c in enumerate(cells) if "강도" in c), None)
                    continue
                if strength is not None and strength < len(cells):
                    cells[strength] = ""
                ln = "| " + " | ".join(cells) + " |"
            else:
                strength = None
            ln = STRENGTH_RE.sub("", ln)
            if not EV_WARN_RE.search(ln):
                continue
            rules |= set(REF_RE.findall(ln))
            named = [x for x in TESTS if x in ln]
            if len(named) == 1 or ln.lstrip().startswith("|"):
                tests |= set(named)
            else:
                parts = re.split(r"[·,;]|—", ln)
                tests |= {x for x in named if any(x in p and EV_WARN_RE.search(p) for p in parts)}
    return tests, rules


def passed_in_plan(text, test):
    """기획서에서 그 테스트를 통과로 적은 줄. 표 줄은 줄 전체, 다른 줄은 · , ; / 로 나눈 조각으로 본다."""
    for ln in text.splitlines():
        if test not in ln:
            continue
        parts = [ln] if ln.strip().startswith("|") else re.split(r"[·,;/]", ln)
        if any(test in p and "통과" in p and not WARN_RE.search(p) for p in parts):
            return ln.strip()
    return None


def check_evidence(text, evidence):
    """④-57 — 근거 파일의 경고가 기획서에서 통과로 바뀌지 않고 사장님 판단 칸으로 갔나"""
    tests, rules = warned(evidence)
    judge = "\n".join(section(text, "사장님 판단 칸") or [])
    errs = []
    for x in sorted(tests):
        ln = passed_in_plan(text, x)
        if ln:
            errs.append(f"⑦ 근거에서 경고였던 테스트를 기획서에서 통과로 적음 — {x}: {ln[:60]}")
    errs += [f"⑦ 근거에서 경고였던 {r}가 '## 사장님 판단 칸'에 없음" for r in sorted(rules) if r not in judge]
    return errs


def evidence_files(plan_path):
    """기획서와 같은 폴더의 근거.md와 2~6 단계 파일"""
    d = Path(plan_path).parent
    return [p for p in [d / "근거.md", *sorted(d.glob("[2-6]-*.md"))] if p.exists()]


def check_plan(text, book_text, exists=lambda p: True, evidence=()):
    """반환: 위반 목록 (빈 목록 = 통과)"""
    text = text.replace("\ufe0f", "")
    table = rule_table(book_text)
    errs = [] if table else ["정본 규칙집에서 규칙을 하나도 못 읽음 — --rulebook 경로 확인"]
    errs += check_start(text, exists)
    errs += check_refs(text, table)
    errs += check_scorecard(text)
    errs += check_hard(text, table)
    errs += check_pitch(text)
    errs += check_voice(text, exists)
    errs += check_evidence(text, evidence)
    return list(dict.fromkeys(errs))


def main(argv=None):
    # Windows 콘솔(cp949)에서 🔒·✔ 같은 문자가 든 메시지가 UnicodeEncodeError로 죽지 않게
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("plan")
    ap.add_argument("--vault", default=VAULT)
    ap.add_argument("--rulebook", help="기본: <vault>/" + RULEBOOK)
    ap.add_argument("--evidence", nargs="*", help="근거 파일(기본: 기획서 폴더의 근거.md와 2~6 단계 파일, 값 없이 주면 대조 안 함)")
    a = ap.parse_args(argv)
    vault = Path(a.vault)
    book = Path(a.rulebook) if a.rulebook else vault / RULEBOOK

    def exists(p):
        q = Path(p)
        return (q if q.is_absolute() else vault / q).exists()

    ev = [Path(p) for p in a.evidence] if a.evidence is not None else evidence_files(a.plan)
    errs = check_plan(Path(a.plan).read_text(encoding="utf-8"),
                      book.read_text(encoding="utf-8"), exists,
                      [p.read_text(encoding="utf-8") for p in ev])
    for e in errs:
        print(e)
    print(f"위반 {len(errs)}개")
    return 1 if errs else 0


if __name__ == "__main__":
    sys.exit(main())

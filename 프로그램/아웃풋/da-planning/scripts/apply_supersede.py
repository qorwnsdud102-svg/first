# -*- coding: utf-8 -*-
"""충돌표(TSV)대로 판례집 페이지의 옛 규칙 밑에 '최신 주장으로 대체' 표시를 단다.

사용:
    python apply_supersede.py <충돌표.tsv> <vault 루트>
TSV 열: 파일(vault 상대경로) <TAB> 앵커(그 파일의 한 줄 전체) <TAB> 새 규칙 번호 <TAB> 사유
- 앵커는 제목이나 문단 첫 줄로 고른다. 표 행·목록 중간 줄은 피한다(표시가 표를 깬다).
- 앵커가 파일 안에서 정확히 한 줄과 일치해야 한다(앞뒤 공백 무시). 아니면 실패로 보고하고 건너뛴다.
- 이미 같은 표시가 있으면 건너뛴다. 줄바꿈(CRLF/LF)은 파일 원래 방식을 지킨다.
"""
import sys
from pathlib import Path

MARK = "> ⚠️ 최신 주장으로 대체 → [[DA 기획 단계별 규칙]] {rid} — {why}"


def apply_rows(text, rows):
    """rows: [(앵커, 새 규칙 번호, 사유)]. 반환: (새 텍스트, 실패 목록)"""
    nl = "\r\n" if text.count("\r\n") > text.count("\n") / 2 else "\n"
    lines = text.replace("\r\n", "\n").split("\n")
    fails = []
    for anchor, rid, why in rows:
        hits = [i for i, ln in enumerate(lines) if ln.strip() == anchor.strip()]
        if len(hits) != 1:
            fails.append(f"앵커 {len(hits)}개: {anchor[:50]}")
            continue
        i = hits[0]
        mark = MARK.format(rid=rid, why=why)
        if mark in lines[i + 1:i + 6]:
            continue
        lines[i + 1:i + 1] = ["", mark]
    return nl.join(lines), fails


def main(tsv, root):
    # Windows 콘솔(cp949)에서 앵커·메시지의 이모지가 UnicodeEncodeError로 죽지 않게
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    by_file = {}
    for no, ln in enumerate(Path(tsv).read_text(encoding="utf-8").splitlines(), 1):
        if not ln.strip() or ln.startswith("#"):
            continue
        parts = ln.split("\t")
        if len(parts) != 4:
            print(f"[형식] {no}행: 열 {len(parts)}개")
            continue
        f, anchor, rid, why = parts
        by_file.setdefault(f, []).append((anchor, rid, why))
    bad = 0
    for f, rows in by_file.items():
        p = Path(root) / f
        with open(p, encoding="utf-8", newline="") as fh:
            text = fh.read()
        out, fails = apply_rows(text, rows)
        for e in fails:
            print(f"[실패] {f}: {e}")
        bad += len(fails)
        with open(p, "w", encoding="utf-8", newline="") as fh:
            fh.write(out)
        print(f"{f}: {len(rows) - len(fails)}건 표시")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1], sys.argv[2]))

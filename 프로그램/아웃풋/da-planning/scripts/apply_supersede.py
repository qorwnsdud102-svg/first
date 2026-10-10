# -*- coding: utf-8 -*-
"""충돌표(TSV)대로 판례집 페이지의 옛 규칙 밑에 '최신 주장으로 대체' 표시를 단다.

사용:
    python apply_supersede.py <충돌표.tsv> <vault 루트>
TSV 열: 파일(vault 상대경로) <TAB> 앵커(그 파일의 한 줄 전체) <TAB> 새 규칙 번호 <TAB> 사유
- 앵커는 제목이나 문단·인용·목록의 아무 줄이나 된다. 표시는 제목이면 바로 밑, 그 밖이면 그 블록 끝(빈 줄 직전) 뒤에 들어가
  블록을 두 동강 내지 않는다. 표시 앞뒤는 항상 빈 줄이라 뒤 본문이 인용문으로 빨려 들어가지 않는다.
- 앵커가 파일 안에서 정확히 한 줄과 일치해야 한다(앞뒤 공백 무시). 아니면 실패로 보고하고 건너뛴다.
- 표 행(`|`로 시작)과 코드 펜스 안 줄은 앵커로 못 쓴다 — 실패로 보고하고 건너뛴다.
- 이미 같은 표시가 있으면 건너뛴다(같은 앵커에 여러 행이어도 재실행하면 그대로). 줄바꿈(CRLF/LF)은 파일 원래 방식을 지킨다.
- 한계: 코드 펜스는 ``` 와 ~~~ 를 구분 없이 여닫는 토글로만 센다.
"""
import sys
from pathlib import Path

PREFIX = "> ⚠️ 최신 주장으로 대체 → "
MARK = PREFIX + "[[DA 기획 단계별 규칙]] {rid} — {why}"
FENCE = ("```", "~~~")


def _is_fence(line):
    return line.lstrip().startswith(FENCE)


def _in_fence(lines, i):
    """lines[i]가 코드 펜스 안(여닫는 펜스 줄 포함)인가."""
    inside = False
    for n, ln in enumerate(lines[:i + 1]):
        if _is_fence(ln):
            if n == i:
                return True
            inside = not inside
    return inside


def _insert_at(lines, i):
    """표시를 넣을 줄 번호. 제목이면 바로 밑, 그 밖이면 블록 끝(빈 줄 직전). 펜스 안 빈 줄은 블록 끝이 아니다."""
    j = i + 1
    if lines[i].lstrip().startswith("#"):
        return j
    inside = False
    while j < len(lines):
        if _is_fence(lines[j]):
            inside = not inside
        elif not inside and not lines[j].strip():
            break
        j += 1
    return j


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
        if lines[i].lstrip().startswith("|"):
            fails.append(f"표 행은 앵커로 못 쓴다: {anchor[:50]}")
            continue
        if _in_fence(lines, i):
            fails.append(f"코드 펜스 안 줄은 앵커로 못 쓴다: {anchor[:50]}")
            continue
        j = _insert_at(lines, i)
        mark = MARK.format(rid=rid, why=why).rstrip()
        # 삽입 위치부터 이어진 빈 줄·표시 줄을 훑는다. 같은 표시가 있으면 건너뛰고,
        # 없으면 마지막 표시 바로 뒤에 붙여 TSV 순서를 지킨다.
        pos, k, exists = j, j, False
        while k < len(lines) and (not lines[k].strip() or lines[k].startswith(PREFIX)):
            if lines[k].rstrip() == mark:
                exists = True
                break
            if lines[k].startswith(PREFIX):
                pos = k + 1
            k += 1
        if exists:
            continue
        lines[pos:pos] = ["", mark] + ([""] if pos < len(lines) and lines[pos].strip() else [])
    return nl.join(lines), fails


def main(tsv, root):
    # Windows 콘솔(cp949)에서 앵커·메시지의 이모지가 UnicodeEncodeError로 죽지 않게
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    by_file = {}
    bad = 0
    for no, ln in enumerate(Path(tsv).read_text(encoding="utf-8-sig").splitlines(), 1):
        if not ln.strip() or ln.startswith("#"):
            continue
        parts = ln.split("\t")
        if len(parts) != 4:
            print(f"[형식] {no}행: 열 {len(parts)}개")
            bad += 1
            continue
        f, anchor, rid, why = parts
        by_file.setdefault(f, []).append((anchor, rid, why))
    # 쓰기 전에 파일부터 전부 확인 — 없는 파일만 빼고 나머지는 진행
    todo = {}
    for f, rows in by_file.items():
        if (Path(root) / f).is_file():
            todo[f] = rows
        else:
            print(f"[실패] {f}: 파일 없음")
            bad += 1
    for f, rows in todo.items():
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

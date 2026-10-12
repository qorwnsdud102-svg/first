# -*- coding: utf-8 -*-
"""사장님 눈 — 회차 기획서를 정규화 입력으로 정리(눈 v3 때 만듦, 3회차부터 round/에서 씀).

사용: python prep_norm.py <기획 폴더 1> [<기획 폴더 2> …] --ids R1-01 [R1-02 …] --out <샌드박스 norm 폴더> --map <코드표 json>
  - eye_prep.clean()(제목·출발점 근거·현실 보정·단계별 판정·사장님 판단 칸·채점 절, 규칙 번호·P-ID 지움)에 더해
    frontmatter, '남이 검사'·'매대 비율' 하위 줄, 판정자·보조 지표 줄, '(고친 뒤 미검사)' 같은 작업 메모를 지운다.
  - 코드(Q..)로 <out>/<코드>.txt 에 쓴다. 코드표는 샌드박스 밖 <map>에 쓴다.
"""
import argparse, json, os, random, re, sys

sys.path.insert(0, "C:/claude/LLM-WIKI/프로그램/아웃풋/da-planning/scripts")
from eye_prep import clean, CHECK  # noqa: E402

SUBTREE = ("남이 검사", "매대 비율", "핵심 옮김 검사")
DROP_LINE = ("판정자", "보조 지표", "1초 사진", "이름 지우기", "형태 역할", "그거네", "2단계")
MEMO = re.compile(r"\s*\((?:고친 뒤 미검사|작성자 확인|[0-9]-[^()]*\.md)\)")


def strip(text):
    if text.startswith("---"):
        end = text.find("\n---", 3)
        text = text[end + 4:] if end > 0 else text
    out, cut, skip_sec = [], None, False
    for ln in text.splitlines():
        if ln.startswith("## "):
            skip_sec = ln.startswith(("## 2판", "## 사장님 카드"))
        if skip_sec:
            continue
        ind = len(ln) - len(ln.lstrip())
        if cut is not None:
            if ln.strip() and ind > cut:
                continue
            cut = None
        s = ln.strip()
        if s.startswith("- ") and any(k in s for k in SUBTREE):
            cut = ind
            continue
        if any(k in s for k in DROP_LINE):
            continue
        out.append(MEMO.sub("", ln))
    return "\n".join(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("folders", nargs="+")
    ap.add_argument("--ids", nargs="+", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--map", required=True)
    a = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")
    os.makedirs(a.out, exist_ok=True)
    table = json.load(open(a.map, encoding="utf-8")) if os.path.exists(a.map) else {}
    used = set(table.values())
    rnd = random.Random("눈v3-정규화-" + "-".join(a.ids))
    for folder, rid in zip(a.folders, a.ids):
        code = table.get(rid)
        while code is None or (rid not in table and code in used):
            code = f"Q{rnd.randint(10, 99)}"
        table[rid] = code
        used.add(code)
        t = clean(strip(open(os.path.join(folder, "기획서.md"), encoding="utf-8").read()))
        open(os.path.join(a.out, code + ".txt"), "w", encoding="utf-8").write(t)
        left = sorted({m.group(0) for m in CHECK.finditer(t)})
        print(f"{rid} → {code}.txt {len(t)}자" + (f" · 남은 말: {left}" if left else ""))
    json.dump(table, open(a.map, "w", encoding="utf-8"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()

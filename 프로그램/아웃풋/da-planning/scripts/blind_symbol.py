# -*- coding: utf-8 -*-
"""④ 남이 검사 — 상징 테스트를 작성자가 아닌 Claude에게 맡긴다(정본 ④-57).

사용:
  python blind_symbol.py prep <기획서.md> --terms "울쎄라,울쎄,300샷" --out <샌드박스>
        [--scene "DA 장면"] [--desc "제품,DA 장면"] [--full <샌드박스>-전체]
      <샌드박스>/장면.md — --scene 절만(1초 사진 대신)
      <샌드박스>/설명.md — --desc 절들(이름 지우기)
      --full 폴더/상징.md — 가리지 않은 제품·상징·당위·DA 장면(형태 역할·그거네 검사용, 샌드박스와 따로 둔다)
      둘 다 --terms(상징원 이름·별칭·그것을 떠올리게 하는 제품명 조각)를 ○○로 가린다.
      제목·'한 줄'·'## 상징·당위'는 넣지 않는다. 절이 비었거나 가린 뒤에도 이름이 남으면 멈춘다(종료 코드 1).
  python blind_symbol.py score <답.md> [...] --answer 울쎄라 [--aliases "ulthera,울세라"]
      답의 '- 1초 상징원:'·'- 상징원:' 줄에 정답이나 별칭이 들었는지 센다. 과반이면 통과, 아니면 경고.
      → 상징 설계 메모와 기획서 '## 상징·당위'에 그대로 붙일 두 줄.
판정 에이전트는 references/남이검사-지시문.md대로 띄우고, agent_audit.py로 샌드박스 밖을 읽었는지 본다.
"""
import argparse
import os
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_plan import section  # noqa: E402

MASK = "○○"
SPACE = r"[\s​-‍﻿]"
FIELDS = (("1초 사진", "1초 상징원"), ("이름 지우기", "상징원"))
FULL = ("제품", "상징·당위", "DA 장면")


def nz(s):
    return re.sub(SPACE + "+", "", s or "").lower()


def mask(text, terms):
    """긴 이름부터 ○○로 가린다. 대소문자와 글자 사이 띄어쓰기는 무시한다."""
    for t in sorted({nz(t) for t in terms if nz(t)}, key=len, reverse=True):
        text = re.sub((SPACE + "*").join(map(re.escape, t)), MASK, text, flags=re.I)
    return text


def leftovers(text, terms):
    n = nz(text)
    return [t for t in terms if nz(t) and nz(t) in n]


def extract(plan_text, titles):
    parts = []
    for title in titles:
        lines = [l for l in section(plan_text, title) or [] if l.strip()]
        if lines:
            parts.append(f"## {title}\n" + "\n".join(lines))
    return "\n\n".join(parts)


def prep(plan_text, terms, scene=("DA 장면",), desc=("제품", "DA 장면")):
    """→ {파일 이름: 가린 글}, 문제 목록(빈 절·남은 이름)"""
    out = {"장면.md": mask(extract(plan_text, scene), terms),
           "설명.md": mask(extract(plan_text, desc), terms)}
    probs = [f"{k}: 절이 비었음" for k, v in out.items() if not v.strip()]
    probs += [f"{k}: 가린 뒤에도 남은 이름 '{t}'" for k, v in out.items() for t in leftovers(v, terms)]
    return out, probs


def field(text, label):
    m = re.search(rf"^\s*-?\s*{re.escape(label)}\s*[:：]\s*(.*)$", text, re.M)
    return m.group(1).strip() if m else ""


def score(answers, answer, aliases=()):
    """→ [(테스트, 맞힌 수, 통과/경고, 답 목록)]"""
    names = [nz(x) for x in (answer, *aliases) if nz(x)]
    need = len(answers) // 2 + 1
    rows = []
    for test, label in FIELDS:
        got = [field(a, label) for a in answers]
        hits = sum(any(n in nz(g) for n in names) for g in got)
        rows.append((test, hits, "통과" if hits >= need else "경고", got))
    return rows


def main(argv=None):
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("prep")
    p.add_argument("plan")
    p.add_argument("--terms", required=True)
    p.add_argument("--out", required=True)
    p.add_argument("--scene", default="DA 장면")
    p.add_argument("--desc", default="제품,DA 장면")
    p.add_argument("--full", help="형태 역할·그거네용 — 가리지 않은 '제품·상징·당위·DA 장면'을 <폴더>/상징.md로(샌드박스와 다른 폴더)")
    s = sub.add_parser("score")
    s.add_argument("answers", nargs="+")
    s.add_argument("--answer", required=True)
    s.add_argument("--aliases", default="")
    a = ap.parse_args(argv)

    def split(v):
        return [x.strip() for x in v.split(",") if x.strip()]

    if a.cmd == "prep":
        out, probs = prep(Path(a.plan).read_text(encoding="utf-8"), split(a.terms),
                          tuple(split(a.scene)), tuple(split(a.desc)))
        # 판정 에이전트는 파일 경로를 본다 — 샌드박스 경로에 상징원·제품 이름이 있으면 정답이 샌다(2026-10-11 시험 운전)
        probs += [f"샌드박스 경로에 이름 '{t}'가 보임 — 무작위 코드 폴더를 쓴다" for t in leftovers(os.path.abspath(a.out), split(a.terms))]
        for x in probs:
            print("✗", x)
        if probs:
            return 1
        os.makedirs(a.out, exist_ok=True)
        for name, txt in out.items():
            Path(a.out, name).write_text(txt + "\n", encoding="utf-8")
            print(Path(a.out, name))
        if a.full:
            os.makedirs(a.full, exist_ok=True)
            plan_text = Path(a.plan).read_text(encoding="utf-8")
            Path(a.full, "상징.md").write_text(extract(plan_text, FULL) + "\n", encoding="utf-8")
            print(Path(a.full, "상징.md"))
        return 0
    rows = score([Path(x).read_text(encoding="utf-8") for x in a.answers], a.answer, split(a.aliases))
    n = len(a.answers)
    for test, hits, verdict, got in rows:
        print(f"- {test}(남이 {n}명): {hits}/{n}명 맞힘(정답 {a.answer}) → {verdict} — 답: "
              + " / ".join(g or "—" for g in got))
    return 0


if __name__ == "__main__":
    sys.exit(main())

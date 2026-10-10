# -*- coding: utf-8 -*-
"""공동 기획 라운드 순위표 — 교차 채점 결과로 상위 N개를 고른다.

사용:
    python rank_plans.py <라운드 폴더> [--top 5]
라운드 폴더 구조: <폴더>/<Claude|Codex>/<번호>-<제품명>/기획서.md + 교차채점-<상대>.md
정렬: 탈락 칸 적은 순 → 경고 칸 적은 순 → 시장성(상>중>하) 높은 순. 셋이 같으면 같은 순위.
⑧ 현실 보정 칸은 탈락·경고 수에 세지 않는다(현실 보정은 사장님 판단 — 정본 ⑧, P6101·P6102·P6105).
상위 N개 경계에 같은 순위가 걸리면 '경계 동점(사장님 판단)'으로 표시한다.
불일치: 기획서 '## 단계별 판정'(작성자)과 교차 채점(상대)의 판정이 다른 단계.
교차 채점 파일이 없거나 ①~⑨ 아홉 칸이 다 차지 않은 기획은 '채점 대기'로 뺀다.
1차 라운드(정본 v1, ①~⑦ 일곱 칸)는 --scored 7로 센다.
종료 코드 0 = 모든 기획의 교차 채점이 끝남, 1 = 채점 대기 있음(순위 확정 불가).
"""
import argparse, re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_plan import section
from check_rulebook import SYM

AUTHORS = ("Claude", "Codex")
JUDGE_RE = re.compile(rf"^\|\s*({SYM})[^|]*\|\s*(통과|경고|탈락)\s*\|")
MARKET_RE = re.compile(r"^-\s*시장성:\s*(상|중|하)", re.M)
MARKET = {"상": 3, "중": 2, "하": 1}
MARKET_NAME = {3: "상", 2: "중", 1: "하", 0: "-"}
SCORED = 9  # 교차 채점 칸: ①~⑨ (정본 v2, ⑩ 학습 제외)
UNRANKED = ("⑧",)  # 칸은 채우되 순위의 탈락·경고 수에는 세지 않는 단계


def parse_judgments(lines):
    """표 줄들 → {단계 기호: 통과/경고/탈락}"""
    out = {}
    for ln in lines:
        m = JUDGE_RE.match(ln.strip())
        if m:
            out[m.group(1)] = m.group(2)
    return out


def score(cross_text):
    j = parse_judgments(cross_text.splitlines())
    m = MARKET_RE.search(cross_text)
    ranked = [v for s, v in j.items() if s not in UNRANKED]
    return {"judg": j,
            "drop": ranked.count("탈락"),
            "warn": ranked.count("경고"),
            "market": MARKET[m.group(1)] if m else 0}


def disagreements(self_j, cross_j):
    """작성자와 채점자 판정이 다른 단계 → ['④(통과→경고)', …]"""
    return [f"{s}({self_j.get(s, '-')}→{v})" for s, v in sorted(cross_j.items()) if self_j.get(s) != v]


def rank(rows, top=5):
    """rows: drop·warn·market 키가 있는 dict 목록. rank·pick·edge를 붙여 정렬해 돌려준다."""
    key = lambda r: (r["drop"], r["warn"], -r["market"])
    rows = sorted(rows, key=key)
    prev, no = None, 0
    for i, r in enumerate(rows, 1):
        if key(r) != prev:
            no, prev = i, key(r)
        r["rank"] = no
    picked = [r for r in rows if r["rank"] <= top]
    edge = picked[-1]["rank"] if len(picked) > top else None
    for r in rows:
        r["edge"] = edge is not None and r["rank"] == edge
        r["pick"] = r["rank"] <= top and not r["edge"]
    return rows


def collect(root, scored=SCORED):
    rows, waiting = [], []
    for author in AUTHORS:
        other = AUTHORS[1 - AUTHORS.index(author)]
        for plan in sorted((root / author).glob("*/기획서.md")):
            d = plan.parent
            cross = d / f"교차채점-{other}.md"
            if not cross.exists():
                waiting.append(f"{author}/{d.name}")
                continue
            s = score(cross.read_text(encoding="utf-8"))
            if len(s["judg"]) < scored:
                waiting.append(f"{author}/{d.name} (채점 칸 {len(s['judg'])}/{scored})")
                continue
            self_j = parse_judgments(section(plan.read_text(encoding="utf-8"), "단계별 판정") or [])
            s.update(name=f"{author}/{d.name}", scorer=other, diff=disagreements(self_j, s["judg"]))
            rows.append(s)
    return rows, waiting


def render(rows, waiting):
    L = ["| 순위 | 기획 | 탈락 | 경고 | 시장성 | 불일치(작성자→채점자) | 선정 |",
         "|---|---|---|---|---|---|---|"]
    for r in rows:
        sel = "경계 동점(사장님 판단)" if r["edge"] else ("선정" if r["pick"] else "")
        L.append(f"| {r['rank']} | {r['name']} | {r['drop']} | {r['warn']} | {MARKET_NAME[r['market']]} "
                 f"| {', '.join(r['diff']) or '없음'} | {sel} |")
    L.append("")
    for a in AUTHORS:
        mine = [r for r in rows if r["scorer"] == a]
        if mine:
            L.append(f"- {a}가 매긴 {len(mine)}개 평균: 탈락 {sum(r['drop'] for r in mine) / len(mine):.1f}"
                     f" · 경고 {sum(r['warn'] for r in mine) / len(mine):.1f}")
    for w in waiting:
        L.append(f"- 채점 대기: {w}")
    return "\n".join(L)


def main(argv=None):
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("root")
    ap.add_argument("--top", type=int, default=5)
    ap.add_argument("--scored", type=int, default=SCORED, help="다 차야 하는 채점 칸 수 (1차 라운드 v1은 7)")
    a = ap.parse_args(argv)
    rows, waiting = collect(Path(a.root), a.scored)
    print(render(rank(rows, a.top), waiting))
    return 1 if waiting else 0


if __name__ == "__main__":
    sys.exit(main())

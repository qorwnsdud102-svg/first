# -*- coding: utf-8 -*-
"""사장님 눈 v1 채점 — 최소쌍·순위·형식 누출·참고 지표.

사용:
  python eye_score.py fmt   <설정.json> <형식 누출 답 파일>
  python eye_score.py score <설정.json> <결과 폴더> [--fmt <형식 누출 답 파일>] [--out <결과.md>]
    결과 폴더 파일 이름: <판정자>-<순서>.md (예: 눈-1.md, 눈-2.md, v1-1.md …)
    답은 '| 카드 | 판정 | 점수 | …' 표. 카드는 코드(K..)이고 코드표.json 으로 되돌린다.
"""
import argparse
import collections
import glob
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from eye_build import answer_rows, load  # noqa: E402

POS_WORDS = ("진행", "조건부", "보류", "좋음")
JUDGES = ("눈", "v1", "v2")


def is_pos(verdict):
    v = re.split(r"[(（]", verdict)[0].replace(" ", "")
    return any(w in v for w in POS_WORDS) and not v.startswith(("기각", "패스"))


def parse_table(path, prefix):
    out = {}
    for ln in open(path, encoding="utf-8"):
        if not ln.startswith("|"):
            continue
        c = [x.strip() for x in ln.strip().strip("|").split("|")]
        if len(c) >= 3 and re.match(rf"^{prefix}\d{{2}}$", c[0]):
            m = re.search(r"-?\d+(?:\.\d+)?", c[2])
            out[c[0]] = {"판정": c[1], "점수": float(m.group(0)) if m else None, "칸": c}
    return out


def fmt_score(cfg_path, path):
    cfg, _, table, _ = load(cfg_path)
    real = set(cfg["형식누출"]["진짜"])
    got = parse_table(path, "F")
    right, rows = 0, []
    for code, i in sorted(table["형식누출"].items()):
        g = got.get(code, {}).get("판정", "")
        guess_real = "가" in g and "나" not in g
        ok = guess_real == (i in real)
        right += ok
        rows.append(f"| {code} | {i} | {'진짜' if i in real else 'AI'} | {g} | {'○' if ok else '×'} |")
    return right, len(table["형식누출"]), rows


def truth(cfg):
    ans = answer_rows()
    src = cfg.get("원천", {})
    return {i: ans[src.get(i, i)]["판정"] for i in cfg["시험"]}


def rank_of(scores, item, positives):
    """1 = 가장 높음. 동점이면 긍정 카드에 불리하게(가장 뒤 등수)."""
    s = scores[item]
    higher = sum(1 for j, v in scores.items() if v > s)
    ties = sum(1 for j, v in scores.items() if v == s and j != item)
    return higher + 1 + (ties if item in positives else 0)


def score(cfg_path, folder, fmt_path=None, out=None):
    cfg, base, table, _ = load(cfg_path)
    code2id = table["시험"]
    tr = truth(cfg)
    runs = collections.defaultdict(dict)  # 판정자 -> 순서 -> {ID: (판정, 점수)}
    for p in sorted(glob.glob(os.path.join(folder, "*-[0-9].md"))):
        judge, r = os.path.basename(p)[:-3].rsplit("-", 1)
        if judge not in JUDGES:  # 같은 폴더의 정규화-묶음-k·누출감사-* 파일은 판정이 아니다
            continue
        t = parse_table(p, "K")
        runs[judge][r] = {code2id[c]: (v["판정"], v["점수"]) for c, v in t.items() if c in code2id}
    pairs = cfg["최소쌍"]
    rank_items, positives = cfg["순위"]["카드"], set(cfg["순위"]["긍정"])
    w_half = set(cfg["순위"]["무게0.5"])
    crit = cfg["통과기준"]
    res, lines = {}, []
    for judge in sorted(runs):
        rs = runs[judge]
        missing = {r: [i for i in cfg["시험"] if i not in d or d[i][1] is None] for r, d in rs.items()}
        pr = []
        for g, b in pairs:
            ss = [(d[g][1], d[b][1]) for d in rs.values() if g in d and b in d]
            ok = bool(ss) and all(x is not None and y is not None and x > y for x, y in ss)
            pr.append((g, b, ok, ss))
        mean = {i: sum(d[i][1] for d in rs.values() if i in d and d[i][1] is not None) /
                max(1, sum(1 for d in rs.values() if i in d and d[i][1] is not None)) for i in rank_items}
        ranks = {i: rank_of(mean, i, positives) for i in positives}
        top = sum(1 for i in positives if ranks[i] <= crit["순위_상위"])
        num = den = 0.0
        for p in positives:
            for n in rank_items:
                if n in positives:
                    continue
                w = 0.5 if n in w_half else 1.0
                den += w
                num += w * (1.0 if mean[p] > mean[n] else 0.5 if mean[p] == mean[n] else 0.0)
        auc = num / den if den else 0.0
        pol = {r: sum(1 for i in cfg["시험"] if i in d and is_pos(d[i][0]) == is_pos(tr[i])) for r, d in rs.items()}
        res[judge] = {"pairs": sum(ok for *_, ok, _ in [(g, b, ok, ss) for g, b, ok, ss in pr]),
                      "pair_rows": pr, "ranks": ranks, "top": top, "auc": auc, "pol": pol,
                      "missing": missing, "mean": mean}
    allneg = sum(1 for i in cfg["시험"] if not is_pos(tr[i]))
    n_items = len(cfg["시험"])

    fmt_line, fmt_ok = "형식 누출 검사: 아직 없음", None
    if fmt_path and os.path.exists(fmt_path):
        right, total, _ = fmt_score(cfg_path, fmt_path)
        fmt_ok = right <= crit["형식누출_최대"]
        fmt_line = f"형식 누출 검사: {right}/{total} 맞힘 (기준 {crit['형식누출_최대']} 이하) → {'통과' if fmt_ok else '불합격'}"

    lines += ["# 사장님 눈 v1 — 채점 결과", "", fmt_line, "",
              "## 판정자별 요약", "",
              "| 판정자 | 최소쌍 | 순위: A05·N02·N04 등수 (상위 6 안 수) | AUC(참고) | '보류 이상' 맞힘(순서별) | 빠진 카드 |",
              "|---|---|---|---|---|---|"]
    for j, r in res.items():
        rk = " · ".join(f"{i} {r['ranks'][i]}위" for i in sorted(r["ranks"]))
        miss = "; ".join(f"{k}:{len(v)}" for k, v in r["missing"].items() if v) or "0"
        pol = " · ".join(f"{k}회 {v}/{n_items}" for k, v in sorted(r["pol"].items()))
        lines.append(f"| {j} | {r['pairs']}/{len(pairs)} | {rk} ({r['top']}) | {r['auc']:.2f} | {pol} | {miss} |")
    lines += ["", f"참고: 31장을 전부 '기각'이라고 하면 '보류 이상' 맞힘은 {allneg}/{n_items}이다.", ""]

    lines += ["## 최소쌍 (두 순서 모두 좋은 쪽 점수가 높아야 ○)", "",
              "| 쌍 | " + " | ".join(res) + " |", "|---|" + "---|" * len(res)]
    for k, (g, b) in enumerate(pairs):
        cells = []
        for j in res:
            g_, b_, ok, ss = res[j]["pair_rows"][k]
            cells.append(("○ " if ok else "× ") + " / ".join(f"{x:g}>{y:g}" if x is not None and y is not None else "?" for x, y in ss))
        lines.append(f"| {g} > {b} | " + " | ".join(cells) + " |")

    lines += ["", "## AI 기획 23장 순위 (2회 평균 점수)", ""]
    for j, r in res.items():
        order = sorted(rank_items, key=lambda i: -r["mean"][i])
        lines.append(f"- {j}: " + ", ".join(f"{i}{'★' if i in positives else ''} {r['mean'][i]:.0f}" for i in order))

    eye = res.get("눈")
    if eye:
        best_rule = max((res[j]["pairs"] for j in res if j != "눈"), default=0)
        conds = [
            (f"최소쌍 {eye['pairs']}/8 ≥ {crit['최소쌍_최소']}", eye["pairs"] >= crit["최소쌍_최소"]),
            (f"규칙집보다 {crit['최소쌍_규칙집보다']}쌍 이상 많음 (규칙집 최고 {best_rule})",
             eye["pairs"] >= best_rule + crit["최소쌍_규칙집보다"]),
            (f"A05·N02·N04 중 상위 {crit['순위_상위']} 안 {eye['top']}장 ≥ {crit['순위_긍정_최소']}",
             eye["top"] >= crit["순위_긍정_최소"]),
            (fmt_line, bool(fmt_ok)),
        ]
        lines += ["", "## 사장님 눈 통과 판정 (부록 C)", ""]
        lines += [f"- {'✔' if ok else '✘'} {t}" for t, ok in conds]
        lines.append(f"- **{'통과' if all(ok for _, ok in conds) else '불합격'}** (누출 감사·도구 감사는 따로)")
    text = "\n".join(lines) + "\n"
    if out:
        open(out, "w", encoding="utf-8").write(text)
    print(text)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser()
    ap.add_argument("cmd")
    ap.add_argument("config")
    ap.add_argument("path")
    ap.add_argument("--fmt")
    ap.add_argument("--out")
    a = ap.parse_args()
    if a.cmd == "fmt":
        right, total, rows = fmt_score(a.config, a.path)
        print(f"형식 누출: {right}/{total} 맞힘")
        print("| 코드 | ID | 정답 | 답 | 맞음 |\n|---|---|---|---|---|")
        print("\n".join(rows))
    else:
        score(a.config, a.path, a.fmt, a.out)


if __name__ == "__main__":
    main()

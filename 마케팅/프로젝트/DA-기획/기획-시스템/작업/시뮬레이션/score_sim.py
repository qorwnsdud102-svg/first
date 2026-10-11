# -*- coding: utf-8 -*-
"""판정 맞히기 시험 채점: 정답지-*.md 표 vs 예측-*.md 표.
사용: python score_sim.py <시뮬레이션 폴더> [예측 파일 glob 접두, 기본 '예측-']"""
import glob, os, re, sys
from collections import defaultdict

CATS = ["상징원자격", "상징구현", "참신함", "시장성·타겟", "결핍", "규제·의료기기", "사업성", "기타"]
POS = ("진행", "좋음", "조건부")

def rows(path):
    out, hdr = [], None
    for ln in open(path, encoding="utf-8"):
        if not ln.startswith("|"): hdr = None if not ln.strip() else hdr; continue
        cells = [c.strip() for c in ln.strip().strip("|").split("|")]
        if all(set(c) <= set("-: ") for c in cells): continue
        if hdr is None and any("ID" == c or c.startswith("ID") for c in cells): hdr = cells; continue
        if hdr and re.match(r"^[A-Z]\d{2,3}$", cells[0]): out.append(dict(zip(hdr, cells)))
    return out

def col(d, *keys):
    for k in d:
        if any(key in k for key in keys): return d[k]
    return ""

def polarity(v):
    v = re.split(r"[(（]", v)[0].replace(" ", "")  # 괄호 안 설명은 판정이 아니다
    if any(p in v for p in POS) and "기각" not in v: return "pos"
    return "neg"

def cats(v, answer=False):
    # 정답지의 '(+)'·'△' 표시는 장점·약한 지적이라 탈락 이유에서 뺀다
    parts = re.split(r"\s+·\s+|,|/", v)
    if answer: parts = [p for p in parts if "(+" not in p and "△" not in p] or parts
    s = " ".join(parts).replace(" ", "")
    return {c for c in CATS if c in s or c.replace("·", "") in s}

def main(folder, prefix="예측-"):
    ans = {}
    for p in glob.glob(os.path.join(folder, "정답지-*.md")):
        for r in rows(p): ans[r["ID"]] = r
    runs = sorted(glob.glob(os.path.join(folder, prefix + "*.md")))
    per_item = defaultdict(list)
    print(f"정답 {len(ans)}건 · 예측 파일 {len(runs)}개")
    for p in runs:
        preds = {r["ID"]: r for r in rows(p)}
        st = defaultdict(lambda: [0] * 7)  # 묶음(A·B·H)별: n, 판정 일치, 범주 일치, tp, fn, fp, tn
        for i, a in ans.items():
            if i not in preds: continue
            pr = preds[i]
            av, pv = polarity(col(a, "판정")), polarity(col(pr, "판정"))
            ok_v = av == pv
            ac, pc = cats(col(a, "범주"), answer=True), cats(col(pr, "범주"))
            ok_c = bool(ac & pc) if av == "neg" else ok_v
            for g in (i[0], "전체"):
                s = st[g]; s[0] += 1; s[1] += ok_v; s[2] += ok_c
                s[3] += av == "pos" and pv == "pos"; s[4] += av == "pos" and pv == "neg"
                s[5] += av == "neg" and pv == "pos"; s[6] += av == "neg" and pv == "neg"
            per_item[i].append((pv, ok_v, ok_c, ",".join(sorted(pc))))
        for g in sorted(st, key=lambda g: (g == "전체", g)):
            n, hv, hc, tp, fn, fp, tn = st[g]
            if len(st) == 2 and g != "전체": continue  # 묶음이 하나면 전체만
            print(f"- {os.path.basename(p)} [{g}]: {n}건 · 판정 일치 {hv}/{n} · 이유 범주 일치 {hc}/{n} · "
                  f"진행을 진행으로 {tp}/{tp+fn} · 기각을 기각으로 {tn}/{tn+fp}")
    print("\n문항별 (정답 판정 | 정답 범주 | 예측들)")
    for i in sorted(per_item):
        a = ans[i]
        preds = "  ".join(f"{pv}{'○' if ov else '×'}{'○' if oc else '×'}[{c}]" for pv, ov, oc, c in per_item[i])
        print(f"{i} | {col(a,'판정')} | {col(a,'범주')} | {preds}")

if __name__ == "__main__":
    main(sys.argv[1], *(sys.argv[2:3]))

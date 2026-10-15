# 지식 카드가 있는 결핍마다 지금 가진 자료를 결핍 책 기준과 비교한다(모델 없이 파일만 센다).
# 사용: python 점검.py  → 점검표.md
import glob, json, os, re
B = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARD = os.path.join(B, "기획-시스템/자가학습/결핍지식")
needs = sorted(os.path.basename(p)[:-3] for p in glob.glob(os.path.join(CARD, "*.md")))
rows = []
for d in needs:
    v1 = os.path.join(B, "기초분석", d, "목소리-표본.txt")
    total = yt = 0
    if os.path.exists(v1):
        head = open(v1, encoding="utf-8").read(20000)
        m = re.search(r"단위 ([\d,]+)개", head); total = int(m.group(1).replace(",", "")) if m else 0
        m = re.search(r"## 유튜브[^\n]*?단위 ([\d,]+)개", head); yt = int(m.group(1).replace(",", "")) if m else 0
    v2 = os.path.join(B, "기초분석-v2", d)
    v2u = alt = vid = 0
    if os.path.isdir(v2):
        try:
            kw = json.load(open(os.path.join(v2, "키워드.json"), encoding="utf-8"))
            alt = len(kw.get("alternatives") or kw.get("대안") or kw.get("seeds") or [])
        except Exception: pass
        try:
            raw = json.load(open(os.path.join(v2, "정제-목소리.json"), encoding="utf-8"))
            v2u = len(raw) if isinstance(raw, list) else len(raw.get("units") or raw.get("rows") or [])
        except Exception: pass
        try:
            vr = json.load(open(os.path.join(v2, "영상-원자료.json"), encoding="utf-8"))
            vid = len(vr) if isinstance(vr, list) else len(vr.get("videos") or [])
        except Exception: pass
    card = open(os.path.join(CARD, d + ".md"), encoding="utf-8").read()
    rows.append((d, total, yt, v2u, alt, vid, len(card)))
L = ["# 지식 카드 결핍 — 결핍 책 기준 대비 지금 자료 (스크립트가 센 값)", "",
     "기준(결핍 1개): 결핍 목소리 1,500+ · 대안 10~15개 × 300+ · 유튜브 결핍 상위 10 + 경험담 10 + 대안마다 5 · 쿠팡 후기 4~6제품 · 메타 전수 · 급상승 해부 · 원인 유형→원리→대안 카드.", "",
     "| 결핍 | v1 목소리 단위 | 그중 유튜브(댓글) | v2 정제 목소리 | v2 대안 키워드 | v2 받아쓴 영상 | 카드 글자 수 |", "|---|---:|---:|---:|---:|---:|---:|"]
for r in rows:
    d, t, y, u, a, v, c = r
    L.append(f"| {d} | {t:,} | {y:,} ({(y*100//t) if t else 0}%) | {u:,} | {a} | {v} | {c:,} |")
L += ["", "모든 결핍 공통 빈칸: 원인 유형·해결 원리·대안별 타겟 인식 층, 대안별 목소리 300+, 쿠팡 후기, 메타 판매처 전수, 급상승 브랜드 해부."]
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "점검표.md"), "w", encoding="utf-8").write("\n".join(L))
print("\n".join(L))

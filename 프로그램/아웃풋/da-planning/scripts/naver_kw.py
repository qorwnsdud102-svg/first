"""네이버 키워드 실측 도구 (검색광고 keywordstool + 자동완성).

사용: python naver_kw.py 키워드1 키워드2 ... [--rel 30]
 - 입력 키워드의 월간 검색량(PC/MO/합계) 정확 일치값
 - 연관키워드 상위 N개 (검색량순) — 다음 검색의 출발점 (연쇄 확장용)
 - 자동완성 후보
측정일은 실행 시각. 값은 최근 30일 네이버 검색광고 기준.
"""
import os, sys, time, json, datetime, requests
TOOL = r"C:\claude\네이버 급상승 키워드 기반 경쟁사 발굴\scripts"
sys.path.insert(0, TOOL)
os.chdir(TOOL)
from config import NaverAuth
from harvest_keywords import parse_vol, parse_ac_json

def main():
    args = sys.argv[1:]
    rel_n = 30
    if "--rel" in args:
        i = args.index("--rel"); rel_n = int(args[i + 1]); del args[i:i + 2]
    seeds = [a.replace(" ", "") for a in args if a.strip()]
    auth = NaverAuth()
    exact, related = {}, {}
    for i in range(0, len(seeds), 5):
        batch = seeds[i:i + 5]
        r = requests.get("https://api.searchad.naver.com/keywordstool",
                         params={"hintKeywords": ",".join(batch), "showDetail": "1"},
                         headers=auth.searchad_headers(), timeout=15)
        if r.status_code != 200:
            print("[ERR]", r.status_code, r.text[:200]); continue
        for x in r.json().get("keywordList", []):
            pc = parse_vol(x.get("monthlyPcQcCnt")); mo = parse_vol(x.get("monthlyMobileQcCnt"))
            row = (pc, mo, pc + mo, x.get("compIdx", ""))
            if x["relKeyword"] in batch:
                exact[x["relKeyword"]] = row
            else:
                related[x["relKeyword"]] = row
        time.sleep(0.4)
    print(f"# 측정: {datetime.datetime.now():%Y-%m-%d %H:%M} · 네이버 검색광고 keywordstool · 월간 PC/MO")
    print("## 입력 키워드 (PC / MO / 합계 / 경쟁정도)")
    for s in seeds:
        v = exact.get(s)
        print(f"- {s}: " + (f"{v[0]:,} / {v[1]:,} / {v[2]:,} / {v[3]}" if v else "결과 없음(10 미만 또는 미등록)"))
    print(f"## 연관키워드 상위 {rel_n}")
    for k, v in sorted(related.items(), key=lambda kv: -kv[1][2])[:rel_n]:
        print(f"- {k}: {v[2]:,} (PC {v[0]:,} / MO {v[1]:,}, {v[3]})")
    print("## 자동완성")
    for s in seeds:
        try:
            r = requests.get("https://ac.search.naver.com/nx/ac",
                             params={"q": s, "con": "1", "frm": "nv", "ans": "2", "r_format": "json", "st": "100"}, timeout=10)
            print(f"- {s}: " + ", ".join(parse_ac_json(r.json())[:10]))
        except Exception as e:
            print(f"- {s}: [ERR] {e}")
        time.sleep(0.2)

if __name__ == "__main__":
    main()

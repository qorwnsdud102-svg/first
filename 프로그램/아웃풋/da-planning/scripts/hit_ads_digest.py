# -*- coding: utf-8 -*-
"""히트 해부 2차 보강용 — scrape_meta.py가 받은 _ads.json을 읽기 쉬운 소재 요약(md)으로 바꾼다.

사용: python hit_ads_digest.py <수집 폴더> <브랜드> [--out <md>] [--top 25]
  같은 본문끼리 묶고, 가장 오래 돈 순(묶음의 최장 게재일)으로 줄 세운다. 오래 돈 소재 = 돈을 번 소재.
  묶음마다 제목·링크 설명·CTA·페이지와 내려받은 이미지·영상 파일 경로(<브랜드>/images/…)를 붙인다.
"""
import argparse
import collections
import json
import os
import re
import sys
from urllib.parse import urlparse


def key(t):
    return re.sub(r"\s+", "", t or "")[:400]


def load_groups(root, brand, skip=None):
    """(_ads.json, 광고, 본문 묶음 — 오래 돈 순, 광고 ID → 파일 목록). 소재 번호는 이 순서를 따른다.
    skip: 이미 본 _ads.json 경로들 — 그 광고 ID는 뺀다(새로 잡힌 광고만 볼 때)."""
    d = json.load(open(os.path.join(root, brand, "_ads.json"), encoding="utf-8"))
    seen = {a["id"] for p in (skip or []) for a in json.load(open(p, encoding="utf-8")).get("ads") or []}
    ads = [a for a in d.get("ads") or [] if a["id"] not in seen]
    files = collections.defaultdict(list)
    for m in d.get("media") or []:
        if m.get("ad_id") and m.get("file"):
            files[m["ad_id"]].append(m["file"])
    groups = {}
    for ad in ads:
        groups.setdefault(key(ad.get("body")) or key(ad.get("title")) or ad["id"], []).append(ad)
    rows = sorted(groups.values(), key=lambda g: (-max(x.get("days_running") or 0 for x in g), -len(g)))
    return d, ads, rows, files


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    ap.add_argument("brand")
    ap.add_argument("--out")
    ap.add_argument("--top", type=int, default=25)
    ap.add_argument("--skip", nargs="*", default=[], help="이미 본 _ads.json — 그 광고는 뺀다")
    a = ap.parse_args()
    d, ads, rows, files = load_groups(a.root, a.brand, a.skip)
    pages = collections.Counter(x.get("page_name") for x in ads).most_common(6)
    out = [f"# {a.brand} — 메타 광고 소재 요약", "",
           f"- 광고 {len(ads)}건 · 서로 다른 본문 {len(rows)}개 · 본문에 검색어가 없어 뺀 광고 {len(d.get('excluded') or [])}건",
           "- 페이지: " + (", ".join(f"{p} {n}" for p, n in pages) or "없음"),
           f"- 검색어: {', '.join(d.get('search_queries') or [])}", "",
           "오래 돈 순(같은 본문 묶음의 최장 게재일)이다. 오래 돈 소재가 돈을 번 소재다.", ""]
    for n, g in enumerate(rows[:a.top], 1):
        days = max(x.get("days_running") or 0 for x in g)
        live = sum(1 for x in g if x.get("is_active"))
        first = min(x.get("start_date") or "" for x in g)
        fmt = max(g, key=lambda x: x.get("days_running") or 0).get("display_format")
        out.append(f"## 소재 {n} — 최장 {days}일 · 같은 본문 {len(g)}건(게재 중 {live}) · 시작 {first} · {fmt}")
        for lab, f in (("본문", "body"), ("제목", "title"), ("링크 설명", "link_description"), ("CTA", "cta_text")):
            vals = list(dict.fromkeys((x.get(f) or "").strip() for x in g if (x.get(f) or "").strip()))
            if vals:
                out.append(f"- {lab}: " + " / ".join(v.replace("\n", " ⏎ ") for v in vals[:3]))
        out.append(f"- 페이지: {', '.join(sorted(set(x.get('page_name') or '' for x in g)))}")
        # 페이지 이름은 믿지 않는다(신고·비활성화 회피와 검색 회피로 아랍어 등 엉뚱한 이름, 계정 여러 개 — 사장님 2026-10-11).
        # 누구 광고인지는 링크 주소로 가린다.
        hosts = sorted({urlparse(u).netloc.removeprefix("www.") for x in g for u in (x.get("link_urls") or []) if u})
        if hosts:
            out.append(f"- 링크 주소: {', '.join(hosts[:4])}")
        med = [p for x in g for p in files.get(x["id"], [])]
        if med:
            out.append(f"- 파일({len(med)}): " + ", ".join(f"{a.brand}/{p}" for p in med[:6]))
        out.append("")
    if len(rows) > a.top:
        out.append(f"(나머지 본문 {len(rows) - a.top}개는 생략 — 더 짧게 돈 소재)")
    text = "\n".join(out) + "\n"
    if a.out:
        open(a.out, "w", encoding="utf-8").write(text)
        print(a.out, f"{len(text)}자 · 광고 {len(ads)} · 본문 {len(rows)}")
    else:
        sys.stdout.reconfigure(encoding="utf-8")
        print(text)


if __name__ == "__main__":
    main()

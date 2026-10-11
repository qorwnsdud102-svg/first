# -*- coding: utf-8 -*-
"""⑤ 흔한 상징은 매대 비율로 — 같은 결핍 메인 키워드의 메타 첫 화면에서 팔리는 제품 가운데
그 상징·외형을 쓰는 제품의 비율(정본 ⑤-02. 사장님 예: 오십견 파스·크림 10개 중 동전파스 외형 3개면 진부).

사용:
  python shelf_share.py build <수집 폴더> --keywords "오십견,무릎통증" --out <매대 폴더>
      scrape_meta.py --first-screen 결과(<수집 폴더>/<키워드>/_ads.json)를 제품 단위로 묶는다.
      → <매대 폴더>/매대.json(볼트 보관용) · <매대 폴더>/보기/매대.md + 그림(표시 에이전트가 읽는 것)
  python shelf_share.py score <매대 폴더> <표시 답.md> --symbol "동전파스 외형" [--stale 0.3]
      표시 답의 '| S01 | 예 |' 줄로 비율·시작 달·먼저 쓴 곳을 낸다 → 5-참신함.md에 붙일 절.
제품으로 묶는 법: 같은 상품 링크(도메인 + 상품 번호·경로), 같은 광고주의 같은 본문, 같은 광고 ID면 한 제품.
광고주 이름이 병원·의원·클리닉이면 경쟁자가 아니라 분모에서 뺀다(시장카드 양식). 표시 에이전트가 '병원'이라고 한 것도 뺀다.
표시 에이전트 지시문: references/매대비율-지시문.md
"""
import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from collections import Counter
from urllib.parse import parse_qs, urlparse

TRACKERS = ("fb.com", "facebook.com", "fb.me", "instagram.com", "linktr.ee", "bit.ly", "naver.me",
            "me2.do", "han.gl", "url.kr", "litt.ly", "inpk.link", "site.naver.com")
ID_KEYS = ("product_no", "productNo", "goodsNo", "goods_no", "item_id", "itemId", "pid")
PATH_ID = re.compile(r"/(?:product|products|goods|item|items|shop)/(?:[^/]*/)*?(\d{3,})")
HOSPITAL = re.compile(r"병원|의원|클리닉|피부과|한의원|치과|성형외과|정형외과|통증의학과|재활의학과")
LABEL = re.compile(r"^\|\s*(S\d{2,3})\b[^|]*\|\s*(예|아니오|모름|병원)\s*\|", re.M)
IMG = (".jpg", ".jpeg", ".png", ".webp")


def link_key(url):
    """같은 상품이면 같은 키. 추적·단축 링크와 빈 링크는 None."""
    u = urlparse(url or "")
    host = re.sub(r"^(?:www|m)\.", "", u.netloc.lower())
    if not host or any(host == t or host.endswith("." + t) for t in TRACKERS):
        return None
    q = parse_qs(u.query)
    for k in ID_KEYS:
        if q.get(k):
            return f"{host}#{q[k][0]}"
    m = PATH_ID.search(u.path)
    return f"{host}#{m.group(1)}" if m else host + u.path.rstrip("/")


def body_key(ad):
    return re.sub(r"\s+", "", ad.get("body") or ad.get("title") or "")[:400]


def group(ads):
    """ads: [(키워드, 광고)] → 광고 묶음(제품) 목록, 오래 돈 순"""
    parent = list(range(len(ads)))

    def root(i):
        while parent[i] != i:
            parent[i] = parent[parent[i]]
            i = parent[i]
        return i

    owner = {}
    for i, (_, ad) in enumerate(ads):
        keys = {k for k in map(link_key, ad.get("link_urls") or []) if k}
        keys.add("id|" + str(ad.get("id")))
        if body_key(ad):
            keys.add(f"{ad.get('page_id')}|{body_key(ad)}")
        for k in keys:
            if k in owner:
                parent[root(i)] = root(owner[k])
            else:
                owner[k] = i
    groups = {}
    for i in range(len(ads)):
        groups.setdefault(root(i), []).append(ads[i])
    return sorted(groups.values(), key=lambda g: -max(a.get("days_running") or 0 for _, a in g))


def product(code, g):
    ads = list({str(a.get("id")): a for _, a in g}.values())
    rep = max(ads, key=lambda a: a.get("days_running") or 0)
    pages = sorted({a.get("page_name") or "" for a in ads} - {""})
    return {"code": code,
            "키워드": sorted({k for k, _ in g}),
            "페이지": pages,
            "도메인": sorted({urlparse(u).netloc for a in ads for u in a.get("link_urls") or []} - {""}),
            "광고": [str(a.get("id")) for a in ads],
            "대표": str(rep.get("id")),
            "최장일": max(a.get("days_running") or 0 for a in ads),
            "시작": min(a.get("start_date") or "9999-99-99" for a in ads),
            "문구": re.sub(r"\s+", " ", rep.get("body") or "").strip()[:300],
            "제목": (rep.get("title") or "").strip(),
            "병원": bool(HOSPITAL.search(" ".join(pages)))}


def view_md(products):
    rows = [p for p in products if not p["병원"]]
    out = [f"# 매대 — 제품 {len(rows)}개", ""]
    for p in rows:
        pics = p.get("그림") or []
        pics = [pics] if isinstance(pics, str) else pics
        out += [f"## {p['code']}", f"- 광고주: {', '.join(p['페이지']) or '—'}", f"- 문구: {p['문구'] or '—'}",
                f"- 제목: {p['제목'] or '—'}", f"- 그림: {', '.join(pics) or '없음'}"]
        if p.get("음성"):
            out.append("- 음성:\n" + "\n".join("  " + ln for ln in p["음성"].splitlines()))
        out.append("")
    return "\n".join(out)


def load(root, keywords):
    """→ [(키워드, 광고)], 광고 ID → 미디어 파일 절대경로 목록"""
    ads, media = [], {}
    for kw in keywords:
        path = os.path.join(root, kw, "_ads.json")
        if not os.path.exists(path):
            print(f"없음: {path}")
            continue
        d = json.load(open(path, encoding="utf-8"))
        ads += [(kw, a) for a in d.get("ads") or []]
        for m in d.get("media") or []:
            if m.get("ad_id") and m.get("file"):
                media.setdefault(str(m["ad_id"]), []).append(os.path.join(root, kw, m["file"]))
    return ads, media


def picture(p, media, view, ffmpeg, frames=False, asr=False):
    """대표 광고의 그림, 없으면 영상 장면을 보기/에 둔다 → (파일 이름 목록, 음성 글).
    frames: 영상은 1초 장면 1장 대신 앞(0.5~18.5초)·뒤 6장면 모아보기. asr: 영상 음성을 받아쓴다(ad_media)."""
    files = [f for i in [p["대표"], *p["광고"]] for f in media.get(i, []) if os.path.exists(f)]
    img = next((f for f in files if f.lower().endswith(IMG)), None)
    vid = next((f for f in files if f.lower().endswith(".mp4")), None)
    names, voice = [], ""
    if vid and ffmpeg and frames:
        from ad_media import sheets
        names = [os.path.basename(x) for x in sheets(ffmpeg, vid, os.path.join(view, p["code"]))]
    elif img:
        names = [p["code"] + os.path.splitext(img)[1].lower()]
        shutil.copy(img, os.path.join(view, names[0]))
    elif vid and ffmpeg:
        dst = os.path.join(view, p["code"] + ".jpg")
        for at in ("1", "0"):
            subprocess.run([ffmpeg, "-y", "-ss", at, "-i", vid, "-frames:v", "1", "-q:v", "3", dst],
                           capture_output=True)
            if os.path.exists(dst):
                names = [os.path.basename(dst)]
                break
    if vid and asr:
        from ad_media import fmt_segments, transcribe
        voice = fmt_segments(transcribe(vid, ffmpeg), limit=500)
    return names, voice


def build(root, keywords, out, frames=False, asr=False):
    ads, media = load(root, keywords)
    products = [product(f"S{n:02d}", g) for n, g in enumerate(group(ads), 1)]
    view = os.path.join(out, "보기")
    os.makedirs(view, exist_ok=True)
    try:
        import imageio_ffmpeg
        ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        ffmpeg = None
    for p in products:
        p["그림"], p["음성"] = ([], "") if p["병원"] else picture(p, media, view, ffmpeg, frames, asr)
    with open(os.path.join(view, "매대.md"), "w", encoding="utf-8") as f:
        f.write(view_md(products))
    with open(os.path.join(out, "매대.json"), "w", encoding="utf-8") as f:
        json.dump({"키워드": keywords, "수집": os.path.abspath(root), "제품": products}, f, ensure_ascii=False, indent=1)
    return products


def labels(text):
    return dict(LABEL.findall(text))


def score(products, lab, symbol, stale=0.3):
    """→ (비율 또는 None, 판정, 5-참신함.md에 붙일 절)"""
    rows = [p for p in products if not p["병원"] and lab.get(p["code"]) != "병원"]
    yes = [p for p in rows if lab.get(p["code"]) == "예"]
    n = len(yes) + sum(1 for p in rows if lab.get(p["code"]) == "아니오")
    share = len(yes) / n if n else None
    verdict = "판단 못 함(표시된 제품 0개)" if share is None else ("진부" if share >= stale else "흔하지 않음")
    out = [f"## 매대 비율 (⑤-02) — {symbol}",
           f"- 제품 {n}개(병원 {len(products) - len(rows)}개·모름 {len(rows) - n}개 뺌) 중 {len(yes)}개가 씀"
           + (f" → {share:.0%} → {verdict} (기준: {stale:.0%} 이상이면 진부)" if share is not None else f" → {verdict}")]
    if 0 < n < 10:
        out.append(f"- 표본 주의: 제품이 {n}개뿐이다")
    if yes:
        first = min(yes, key=lambda p: p["시작"])
        out.append("- 쓰는 제품: " + " · ".join(f"{p['code']} {'/'.join(p['페이지']) or '—'}(게재 {p['최장일']}일)" for p in yes))
        out.append("- 시작 달: " + " · ".join(f"{m} {c}개" for m, c in sorted(Counter(p["시작"][:7] for p in yes).items())))
        out.append(f"- 먼저 쓴 곳: {'/'.join(first['페이지']) or '—'} ({first['시작']} 시작 — 지금 게재 중인 광고 기준)")
    return share, verdict, "\n".join(out)


def main(argv=None):
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    b = sub.add_parser("build")
    b.add_argument("root")
    b.add_argument("--keywords", required=True)
    b.add_argument("--out", required=True)
    b.add_argument("--frames", action="store_true", help="영상은 앞·뒤 6장면 모아보기(기본: 1초 장면 1장)")
    b.add_argument("--asr", action="store_true", help="영상 음성을 받아써 보기에 적는다(이 PC 안 faster-whisper)")
    s = sub.add_parser("score")
    s.add_argument("shelf")
    s.add_argument("answer")
    s.add_argument("--symbol", required=True)
    s.add_argument("--stale", type=float, default=0.3)
    a = ap.parse_args(argv)
    if a.cmd == "build":
        kws = [k.strip() for k in re.split(r"[,;\n]", a.keywords) if k.strip()]
        ps = build(a.root, kws, a.out, a.frames, a.asr)
        print(f"제품 {len(ps)}개(병원 {sum(p['병원'] for p in ps)}개) · 그림 {sum(1 for p in ps if p.get('그림'))}개"
              f" → {os.path.join(a.out, '보기')}")
        return 0
    d = json.load(open(os.path.join(a.shelf, "매대.json"), encoding="utf-8"))
    print(score(d["제품"], labels(open(a.answer, encoding="utf-8").read()), a.symbol, a.stale)[2])
    return 0


if __name__ == "__main__":
    sys.exit(main())

# -*- coding: utf-8 -*-
"""히트 해부 — 광고가 보내는 자사몰 상세페이지를 화면째 찍는다.

상세페이지는 대부분 이미지라 글만 긁으면 USP를 못 읽는다. 사장님: 상세페이지는 USP를 가장 강조하는 곳이고
씨스터앤은 상세에서 EGF를 매우 강조한다(2026-10-12, P6260).

사용:
  python detail_capture.py pages <수집 폴더> <도메인 일부> <키워드> [<키워드> …]
      scrape_meta.py가 받은 <수집 폴더>/<키워드>/_ads.json의 링크 가운데 자사몰 주소(도메인 일부가 든 것)를
      제품 페이지별로 묶어 광고 수·최장 게재일 순으로 보여 준다. 광고가 가장 많이 보내는 페이지 = 지금 미는 제품.
  python detail_capture.py shot <주소> <출력 폴더> [--width 1000] [--tile 1600] [--max-tiles 40]
      페이지를 끝까지 천천히 내려 지연 로딩 이미지를 부른 뒤, 위에서부터 tile 높이씩 잘라
      tile-01.jpg …로 저장한다. 최종 주소·제목·높이는 page.txt, 페이지 글은 text.txt에 남긴다.
공개 페이지만 연다. 로그인·결제·동의 단추는 누르지 않는다. 고정 띠·팝업(화면에 붙은 요소)은 숨기고 찍는다.
"""
import argparse
import json
import os
import re
import sys
from urllib.parse import parse_qs, parse_qsl, urlencode, urlparse, urlunparse

KEEP_Q = ("product_no", "idx", "goodsNo", "no", "branduid", "it_id")

LAZY_JS = """() => { for (const i of document.querySelectorAll('img')) {
  for (const k of ['ec-data-src', 'data-src', 'data-original', 'data-lazy-src', 'data-lazy']) {
    const v = i.getAttribute(k); if (v && i.getAttribute('src') !== v) i.setAttribute('src', v); } } }"""
HIDE_FIXED_JS = """() => { for (const e of document.querySelectorAll('body *')) {
  const p = getComputedStyle(e).position; if (p === 'fixed' || p === 'sticky') e.style.setProperty('display', 'none', 'important'); } }"""
# 상세를 '더보기'로 접어 둔 페이지가 있다(2026-10-12 릴리이브 — 조각 9장 아래가 비었다). 상세 쪽 펼치기 단추만 누른다:
# 글이 '더보기·펼치기' 꼴이고, 보이고, 다른 페이지로 가는 링크가 아니고, 페이지 위쪽(1200px) 아래에 있는 것. 많아야 2개.
# class·id에 detail/prd/product/cont가 든 단추를 먼저 누르고, 없을 때만 more가 든 단추를 누른다
# (2026-10-12 한의비책 — 리뷰 위젯의 'dcr-rv-more'가 먼저 눌렸다).
EXPAND_JS = r"""() => { const re = /^\s*((상품|상세)\s*(상세\s*)?(정보|페이지|설명)?\s*)?(더\s*보기|펼치기|펼쳐\s*보기)\s*[+▼∨⌄>]?\s*$/;
  const cand = [];
  for (const e of document.querySelectorAll('button, a, div, span')) {
    const t = (e.innerText || '').trim();
    if (!re.test(t) || e.children.length > 3 || !(e.offsetWidth || e.offsetHeight)) continue;
    const href = e.getAttribute('href') || '';
    if (href && !href.startsWith('#') && !href.startsWith('javascript')) continue;
    if (e.getBoundingClientRect().top + scrollY < 1200) continue;
    cand.push([e, ((e.className || '') + ' ' + (e.id || '')).toString().toLowerCase()]); }
  let pick = cand.filter(([e, id]) => /detail|prd|product|cont/.test(id));
  if (!pick.length) pick = cand.filter(([e, id]) => /more/.test(id));
  return pick.slice(0, 2).map(([e, id]) => { e.click(); return id.trim().slice(0, 40); }); }"""


def page_key(url):
    """같은 제품 페이지면 같은 열쇠. 카페24 product_no(쿼리·경로 둘 다)·짧은 주소 /surl/P/n·imweb idx."""
    u = urlparse(url)
    host = re.sub(r"^(www\.|m\.)", "", u.netloc.lower())
    path = u.path.rstrip("/")
    m = re.match(r"(?i)/surl/p/(\d+)$", path)
    if m:
        return f"{host}/surl/P/{m.group(1)}"
    q = parse_qs(u.query)
    if "product_no" in q:
        return f"{host}/product/{q['product_no'][0]}"
    m = re.match(r"/product/(?:[^/]+/)?(\d+)(?:/|$)", path)
    if m:
        return f"{host}/product/{m.group(1)}"
    keep = [(k, q[k][0]) for k in KEEP_Q if k in q]
    return host + path + ("?" + urlencode(keep) if keep else "")


def clean_url(url):
    """utm_*·fbclid만 뗀다."""
    u = urlparse(url)
    q = [(k, v) for k, v in parse_qsl(u.query, keep_blank_values=True) if not k.startswith("utm_") and k != "fbclid"]
    return urlunparse(u._replace(query=urlencode(q)))


def landing_pages(ads, domain):
    """광고들(_ads.json의 ads)이 보내는 자사몰 페이지를 제품별로 묶는다. 광고 하나는 페이지마다 한 번만 센다."""
    agg = {}
    for a in ads:
        for link in a.get("link_urls") or []:
            if domain.lower() not in urlparse(link).netloc.lower():
                continue
            k = page_key(link)
            g = agg.setdefault(k, {"key": k, "url": clean_url(link), "ids": set(), "longest": 0, "active": 0})
            if a["id"] in g["ids"]:
                continue
            g["ids"].add(a["id"])
            g["longest"] = max(g["longest"], a.get("days_running") or 0)
            g["active"] += 1 if a.get("is_active") else 0
    out = sorted(agg.values(), key=lambda g: (-len(g["ids"]), -g["longest"]))
    return [{"key": g["key"], "url": g["url"], "ads": len(g["ids"]), "longest": g["longest"], "active": g["active"]}
            for g in out]


def load_ads(root, keywords):
    seen, ads = set(), []
    for kw in keywords:
        p = os.path.join(root, kw, "_ads.json")
        if not os.path.exists(p):
            continue
        for a in json.load(open(p, encoding="utf-8")).get("ads") or []:
            if a["id"] not in seen:
                seen.add(a["id"])
                ads.append(a)
    return ads


def scroll_to_end(page):
    for _ in range(500):  # 지연 로딩 이미지를 부르려고 끝까지 천천히 내린다
        page.mouse.wheel(0, 900)
        page.wait_for_timeout(200)
        if page.evaluate("window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2"):
            h = page.evaluate("document.documentElement.scrollHeight")
            page.wait_for_timeout(1500)
            if page.evaluate("document.documentElement.scrollHeight") <= h:
                break


def shot(url, out, width=1000, tile=1600, max_tiles=40):
    from playwright.sync_api import sync_playwright
    os.makedirs(out, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_context(viewport={"width": width, "height": 1000}, locale="ko-KR").new_page()
        page.goto(url, wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(3000)
        scroll_to_end(page)
        opened = page.evaluate(EXPAND_JS)
        if opened:
            page.wait_for_timeout(2000)
            scroll_to_end(page)
        page.evaluate(LAZY_JS)
        try:
            page.wait_for_load_state("networkidle", timeout=20000)
        except Exception:
            pass
        page.evaluate(HIDE_FIXED_JS)
        height = page.evaluate("document.documentElement.scrollHeight")
        n = 0
        for y in range(0, height, tile):
            if n == max_tiles:
                break
            n += 1
            page.screenshot(path=os.path.join(out, f"tile-{n:02d}.jpg"), full_page=True, type="jpeg", quality=72,
                            clip={"x": 0, "y": y, "width": width, "height": min(tile, height - y)})
        cut = height > tile * max_tiles
        open(os.path.join(out, "page.txt"), "w", encoding="utf-8").write(
            f"요청 주소: {url}\n최종 주소: {page.url}\n제목: {page.title()}\n높이: {height}px · 조각 {n}장(조각 높이 {tile}px)"
            + (f" — {tile * max_tiles}px 아래는 잘림\n" if cut else "\n")
            + (f"펼침: 접힌 상세를 '더보기'로 펼침({', '.join(opened)})\n" if opened else ""))
        open(os.path.join(out, "text.txt"), "w", encoding="utf-8").write(page.evaluate("document.body.innerText"))
        browser.close()
    return n, height


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    a = sub.add_parser("pages")
    a.add_argument("root")
    a.add_argument("domain")
    a.add_argument("keywords", nargs="+")
    b = sub.add_parser("shot")
    b.add_argument("url")
    b.add_argument("out")
    b.add_argument("--width", type=int, default=1000)
    b.add_argument("--tile", type=int, default=1600)
    b.add_argument("--max-tiles", type=int, default=40)
    args = ap.parse_args()
    if args.cmd == "pages":
        for g in landing_pages(load_ads(args.root, args.keywords), args.domain):
            print(f"{g['ads']}\t{g['longest']}일\t활성 {g['active']}\t{g['key']}\t{g['url']}")
    else:
        n, h = shot(args.url, args.out, args.width, args.tile, args.max_tiles)
        print(f"{args.out}: {n}장 · {h}px")


if __name__ == "__main__":
    main()

# -*- coding: utf-8 -*-
"""메타 판매처 해부 재료 — 결핍마다 메타 광고 수 상위 제품 판매처 5곳의 상세페이지(글 + 상세 이미지 OCR)와 자사몰 상단 후기를 모은다(모델 없음).
사장님 2026-10-16: "메타에서 판매하는 타제품 분석은 히트 제품 분석하는것처럼 상페, 상단후기, 소재를 확인해서 그 제품의 USP를 확인하고",
"실제 그 제품의 후기는 쿠팡에서 그 제품을 검색해서 실제 후기를 확인하고싶어 (자사몰 후기는 거의 가짜니까)".
- 판매처 순위는 meta_concept_material.collect()와 같다(병원·앱·블로그 제외, 광고 수 순).
- 상세페이지: Playwright(창 없음)로 광고 링크를 열고 끝까지 내려 lazy 이미지를 띄운 뒤, 글(앞 8,000자)·가격 후보·후기 칸 글(앞 4,000자)·큰 이미지(가로 400px 이상, 최대 30장)를 받는다.
- 이미지는 세로 1,800px로 잘라 win_ocr.ps1(윈도우 기본 OCR, 한국어)로 읽는다. 받은 것은 다시 받지 않는다.
- 출력: 결핍책/메타판매처/_해부/<결핍>/<도메인>/ (page.json, ocr.txt, img/), 요약은 결핍책/메타판매처/<결핍>-해부재료.md
  · 영상: 판매처마다 오래 돈 광고 ID 3개를 <결핍>-해부영상ID.txt로 남긴다(fetch_ad_video.py — 메타는 한 번에 한 줄).
  · 쿠팡 실제 후기: 제품 이름 후보를 <결핍>-쿠팡검색어.txt로 남긴다(사장님 크롬 후기 실행기가 받음).
사용: python meta_anatomy.py <결핍→키워드 json> [결핍 ...] [--top 5]"""
import argparse, io, json, os, re, subprocess, sys, time
from pathlib import Path
import requests
from PIL import Image
HERE = Path(__file__).resolve().parent; sys.path.insert(0, str(HERE))
import meta_concept_material as mcm
mcm.MAPV = False
OUT = Path(mcm.OUT); ANA = OUT / '_해부'
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'

PAGE_JS = """() => {
  const big = [...document.images].filter(i => (i.naturalWidth || i.width) >= 400 && (i.naturalHeight || i.height) >= 300)
    .map(i => i.currentSrc || i.src).filter(u => u && !u.startsWith('data:'));
  const rev = [...document.querySelectorAll('[class*=review i],[id*=review i],[class*=Review],[class*=board]')]
    .map(e => e.innerText).filter(t => t && t.length > 80).sort((a, b) => b.length - a.length)[0] || '';
  const price = (document.body.innerText.match(/[0-9]{1,3}(,[0-9]{3})+\\s*원/g) || []).slice(0, 8);
  const meta = n => (document.querySelector(`meta[property="${n}"],meta[name="${n}"]`) || {}).content || '';
  return {title: document.title, og: meta('og:title'), desc: meta('og:description') || meta('description'),
          price, text: document.body.innerText.slice(0, 8000), reviews: rev.slice(0, 4000), images: [...new Set(big)].slice(0, 30)};
}"""

def slice_and_save(content, base, n):
    out = []
    try: im = Image.open(io.BytesIO(content)).convert('RGB')
    except Exception: return out
    w, h = im.size
    if w > 1000: im = im.resize((1000, int(h * 1000 / w))); w, h = im.size
    for k, top in enumerate(range(0, h, 1800)):
        p = base / f'{n:02d}-{k:02d}.png'; im.crop((0, top, w, min(h, top + 1800))).save(p); out.append(p)
    return out

def seller_dir(need, d): return ANA / need / re.sub(r'[^\w.-]', '_', d)

def page(pw_page, url, sd):
    pj = sd / 'page.json'
    if pj.exists(): return json.loads(pj.read_text(encoding='utf-8'))
    pw_page.goto(url, wait_until='domcontentloaded', timeout=45000); time.sleep(3)
    for _ in range(25):
        pw_page.mouse.wheel(0, 1600); time.sleep(0.5)
    info = pw_page.evaluate(PAGE_JS); info['url'] = pw_page.url
    img = sd / 'img'; img.mkdir(parents=True, exist_ok=True)
    for i, u in enumerate(info['images']):
        try:
            r = requests.get(u, headers={'User-Agent': UA, 'Referer': pw_page.url}, timeout=20)
            if r.ok and len(r.content) > 15000: slice_and_save(r.content, img, i)
        except Exception: pass
    subprocess.run(['powershell', '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', str(HERE / 'win_ocr.ps1'), str(img)], capture_output=True, timeout=1800)
    txt = []
    for t in sorted(img.glob('*.txt')):
        s = t.read_text(encoding='utf-8-sig', errors='ignore').strip()
        if s: txt.append(s)
    (sd / 'ocr.txt').write_text('\n'.join(txt), encoding='utf-8')
    pj.write_text(json.dumps(info, ensure_ascii=False), encoding='utf-8')
    return info

def one(need, kws, top, pw_page):
    ads = mcm.collect(kws)
    groups = {}
    for aid, a in ads.items():
        d, link = mcm.seller(a)
        if not d or mcm.CLINIC.search(d) or mcm.CLINIC.search(a['page']): continue
        groups.setdefault(d, []).append((aid, a, link))
    rank = sorted(groups.items(), key=lambda kv: (-len(kv[1]), -max(x[1]['days'] for x in kv[1])))[:top]
    L = [f'# {need} — 메타 판매처 해부 재료 (모델 없음)', '', f'광고 수 상위 제품 판매처 {len(rank)}곳 · 상세페이지 글 + 상세 이미지 OCR + 자사몰 후기 칸(참고만 — 자사몰 후기는 거의 가짜, 실제 후기는 쿠팡)', '']
    vids, names = [], []
    for d, items in rank:
        items.sort(key=lambda x: -x[1]['days'])
        link = next((x[2] for x in items if x[2]), '')
        full = next((u for x in items for u in x[1]['links'] if mcm.dom(u) == d and '?' in u), '') or link   # 제품 번호(?product_no=…)가 든 원래 주소로 연다
        sd = seller_dir(need, d); sd.mkdir(parents=True, exist_ok=True)
        info = {}
        if full:
            try: info = page(pw_page, full, sd)
            except Exception as e: info = {'error': str(e)[:150]}
        ocr = (sd / 'ocr.txt').read_text(encoding='utf-8') if (sd / 'ocr.txt').exists() else ''
        title = info.get('og') or info.get('title') or ''
        names.append(f'{d}\t{title}')
        heads, picked = set(), []
        for aid, a, _ in items:
            h = re.sub(r'\W', '', a['body'])[:40]
            if h and h not in heads: heads.add(h); picked.append(aid)
            if len(picked) >= 3: break
        vids += picked
        L += [f'## {d} — {items[0][1]["page"]}', f'- 광고 {len(items)}개 · 최장 {items[0][1]["days"]}일 · 링크 {link}',
              f'- 페이지 제목: {title}', f'- 설명: {info.get("desc", "")[:300]}', f'- 가격 후보: {", ".join(info.get("price", [])[:5])}',
              f'- 오래 돈 소재 ID: {", ".join(picked)} (영상 받아쓰기는 {need}-소재.md·_영상)', '',
              '### 상세페이지 이미지 글자(OCR, 앞 6,000자)', ocr[:6000] or '(없음)', '',
              '### 상세페이지 글(앞 2,500자)', (info.get('text') or '')[:2500], '',
              '### 자사몰 후기 칸(참고만, 앞 1,500자)', (info.get('reviews') or '')[:1500] or '(없음)', '']
        if info.get('error'): L += [f'(페이지 열기 실패: {info["error"]})', '']
    (OUT / f'{need}-해부재료.md').write_text('\n'.join(L) + '\n', encoding='utf-8')
    (OUT / f'{need}-해부영상ID.txt').write_text(','.join(vids), encoding='utf-8')
    (OUT / f'{need}-쿠팡검색어.txt').write_text('\n'.join(names), encoding='utf-8')
    print(need, '판매처', len(rank), '영상ID', len(vids), flush=True)

if __name__ == '__main__':
    a = argparse.ArgumentParser(); a.add_argument('kw'); a.add_argument('needs', nargs='*'); a.add_argument('--top', type=int, default=5); args = a.parse_args()
    need_kw = json.loads(Path(args.kw).read_text(encoding='utf-8'))
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True)
        pg = b.new_context(user_agent=UA, locale='ko-KR', viewport={'width': 1280, 'height': 900}).new_page()
        for need, kws in need_kw.items():
            if args.needs and need not in args.needs: continue
            try: one(need, kws, args.top, pg)
            except Exception as e: print(need, '실패', str(e)[:150], flush=True)
        b.close()

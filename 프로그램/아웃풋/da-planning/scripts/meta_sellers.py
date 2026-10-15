# -*- coding: utf-8 -*-
"""결핍별 메타 광고 판매처 순위 — 모아 둔 모든 *_메타광고소재/<키워드>/_ads.json에서 광고주(링크 도메인)를 묶어 센다.
사장님 P6544: 화장품은 이름에 결핍을 못 써서 쿠팡 이름 검색으론 1위를 놓친다 → 메타 판매처에서 제품을 찾는다.
사용: python meta_sellers.py <결핍→키워드 json> <출력 폴더>   (모델 없음)"""
import glob, json, os, re, sys, datetime, collections
from urllib.parse import urlparse
META = r"C:\claude\네이버 급상승 키워드 기반 경쟁사 발굴\scripts"
SKIP = ('facebook.com', 'instagram.com', 'fb.me', 'naver.me', 'bit.ly', 'linktr.ee', 'smartstore.naver.com', 'brand.naver.com', 'coupang.com', 'link.coupang.com', 'kakao')
def dom(u):
    h = urlparse(u).netloc.lower().replace('www.', '').replace('m.', '', 1) if u.startswith('http') else ''
    return h
def page_of(t):
    m = re.search(r'광고 상세 정보 보기\n(.+?) 페이지는 (.+?)과\(와\) 함께합니다', t)
    if m: return m.group(2).strip()
    m = re.search(r'광고 상세 정보 보기\n(.+?)\n', t)
    return m.group(1).strip() if m else ''
def started(t):
    m = re.search(r'(\d{4})\. (\d{1,2})\. (\d{1,2})\.에 게재 시작함', t)
    return datetime.date(int(m.group(1)), int(m.group(2)), int(m.group(3))) if m else None
need_kw = json.load(open(sys.argv[1], encoding='utf-8')); out = sys.argv[2]; today = datetime.date(2026, 10, 15)
for need, kws in need_kw.items():
    agg = collections.defaultdict(lambda: {'ads': 0, 'pages': collections.Counter(), 'days': 0, 'links': collections.Counter(), 'kw': set(), 'sample': ''})
    seen = set(); files = []
    for kw in kws:
        files += glob.glob(os.path.join(META, '*_메타광고소재', kw, '_ads.json'))
    for f in files:
        d = json.load(open(f, encoding='utf-8'))
        links = {x['id']: x.get('links', []) for x in d.get('ad_links', []) if isinstance(x, dict)}
        for t in d.get('ad_texts', []):
            m = re.search(r'라이브러리 ID: (\d+)', t); aid = m.group(1) if m else None
            if not aid or aid in seen: continue
            seen.add(aid)
            ls = [u for u in links.get(aid, []) if dom(u) and not any(s in dom(u) for s in SKIP)]
            store = [u for u in links.get(aid, []) if any(s in u for s in ('smartstore.naver.com', 'brand.naver.com', 'coupang.com'))]
            key = dom(ls[0]) if ls else (urlparse(store[0]).path.strip('/').split('/')[0] if store else page_of(t) or '?')
            a = agg[key]; a['ads'] += 1; a['pages'][page_of(t)] += 1; a['kw'].add(os.path.basename(os.path.dirname(f)))
            s = started(t)
            if s: a['days'] = max(a['days'], (today - s).days)
            for u in (ls or store)[:1]: a['links'][u.split('?')[0]] += 1
            if not a['sample']:
                body = t.split('광고\n', 1)[-1]; a['sample'] = re.sub(r'\s+', ' ', body)[:90]
    rows = sorted(agg.items(), key=lambda kv: (kv[1]['ads'], kv[1]['days']), reverse=True)
    L = [f'# {need} — 메타 광고 판매처 (광고 수·최장 게재일 순)', '', f'키워드: {", ".join(kws)} · 광고 {len(seen)}개 · 파일 {len(files)}개', '',
         '| 판매처(도메인) | 페이지 이름 | 광고 수 | 최장 게재(일) | 대표 링크 | 첫 문구 |', '|---|---|---:|---:|---|---|']
    for k, a in rows[:25]:
        L.append(f"| {k} | {a['pages'].most_common(1)[0][0][:20] if a['pages'] else ''} | {a['ads']} | {a['days']} | {a['links'].most_common(1)[0][0][:60] if a['links'] else ''} | {a['sample'].replace('|', ' ')} |")
    open(os.path.join(out, f'{need}.md'), 'w', encoding='utf-8').write('\n'.join(L) + '\n')
    print(need, '광고', len(seen), '판매처', len(rows), '상위:', ', '.join(f"{(a['pages'].most_common(1)[0][0] if a['pages'] else k)[:12]}({a['ads']})" for k, a in rows[:6]))

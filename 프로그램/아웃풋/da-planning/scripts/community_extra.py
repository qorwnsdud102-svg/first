# -*- coding: utf-8 -*-
"""여성 커뮤니티 수집기 — 82쿡·더쿠 공개 글을 키워드로 모아 crawl.py와 같은 칸의 엑셀로 남긴다(deficit_book_run의 커뮤니티 줄이 그대로 읽음).
사장님 2026-10-16 밤: "여성 커뮤니티 덕쿠 82쿡 수집기신설하고 전반적으로 자료 수집 더 할 수 있는 방법 찾아봐 봐".
- 82쿡(cook82): 자유게시판 검색(enti.php?bn=15&searchType=search&search1=1&keys=…) → 글(#articleBody)·댓글(ul.reples li). robots.txt가 /entiz/ 읽기를 막지 않음.
- 더쿠(theqoo): 로그인하지 않으면 사이트 검색이 걸리지 않아(10-16 확인), 네이버 공식 검색 API(webkr)로 글 주소를 찾고
  글(.rd_body)·댓글(공개 JSON act=dispTheqooContentCommentListTheqoo)을 읽는다. robots.txt: Allow /, ai-train=no(학습 안 함 — 사람이 읽는 시장 조사 인용).
- 로그인·비밀번호 없이 공개 페이지만. 사이트 간격은 voice_rate.gate(사이트마다 한 줄), 막힘 신호면 voice_rate.observe가 30분 쉼을 남기고 멈춘다(우회 안 함).
- 출력: <out>/<키워드>.xlsx(타입·사이트·키워드·제목·본문·댓글·url·작성자·작성일·조회수·좋아요) + <out>/_수집.json(voice_crawl.run과 같은 기록 — 받은 키워드는 건너뜀).
사용: python community_extra.py <cook82|theqoo> <키워드> <출력 폴더> [글 수]"""
import json, os, re, sys, time, random
from pathlib import Path
from urllib.parse import quote
import requests
from bs4 import BeautifulSoup
HERE = Path(__file__).resolve().parent; sys.path.insert(0, str(HERE))
import voice_rate

UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36',
      'Accept-Language': 'ko-KR,ko;q=0.9'}
HEAD = ['타입', '사이트', '키워드', '제목', '본문', '댓글', 'url', '작성자', '작성일', '조회수', '좋아요']
S = requests.Session(); S.headers.update(UA)

def safe(name): return re.sub(r'[\\/:*?"<>|\s]+', '_', name.strip())
def clean(t): return re.sub(r'\s+', ' ', t or '').strip()

def get(site, url, **kw):
    with voice_rate.gate(site):
        r = S.request(kw.pop('method', 'GET'), url, timeout=25, **kw)
    voice_rate.observe(site, r.status_code, r.text[:3000] if r.status_code != 200 or len(r.text) < 3000 else 'ok')
    if r.status_code in (403, 503):
        raise RuntimeError(f'{site} HTTP {r.status_code} — 멈춤(우회 안 함)')
    return r

# ── 82쿡 ─────────────────────────────────────────────────────
def cook82(q, max_posts):
    rows, seen, page = [], set(), 1
    while len(seen) < max_posts and page <= 20:
        r = get('cook82', f'https://www.82cook.com/entiz/enti.php?bn=15&searchType=search&search1=1&keys={quote(q)}&page={page}')
        s = BeautifulSoup(r.text, 'html.parser'); new = 0
        for tr in s.select('table tr'):
            tds = tr.select('td')
            if not tds or not clean(tds[0].get_text()).isdigit(): continue   # 공지·머리줄은 번호가 숫자가 아님
            a = tr.select_one('a[href*="read.php"]')
            if not a: continue
            num = (re.search(r'num=(\d+)', a.get('href', '')) or [None, None])[1]
            if not num or num in seen: continue
            seen.add(num); new += 1
            if len(seen) >= max_posts: break
        if not new: break
        page += 1
    for num in list(seen)[:max_posts]:
        url = f'https://www.82cook.com/entiz/read.php?bn=15&num={num}'
        try: r = get('cook82', url)
        except RuntimeError: raise
        except Exception: continue
        s = BeautifulSoup(r.text, 'html.parser')
        title = clean((s.title.get_text() if s.title else '').split(':::')[0])
        body = clean((s.select_one('#articleBody') or s).get_text(' '))[:5000] if s.select_one('#articleBody') else ''
        head = clean((s.select_one('#readHead') or s.new_tag('x')).get_text(' '))
        date = (re.search(r'작성일\s*:\s*([\d\- :]+)', head) or [None, ''])[1].strip()
        views = (re.search(r'조회수\s*:\s*([\d,]+)', head) or [None, ''])[1].replace(',', '')
        rows.append(['게시글', '82cook', q, title, body, '', url, '', date, views, ''])
        for li in s.select('ul.reples li'):
            t = clean(li.get_text(' '))
            t = re.sub(r"^\d+\.\s*\S+\s*'\d{2}\.\d{1,2}\.\d{1,2}\s+[\d:]+\s*[AP]M\s*\([^)]*\)\s*", '', t)   # 번호·닉네임·날짜·IP 떼기
            if len(t) >= 2: rows.append(['댓글', '82cook', q, '', '', t[:2000], url, '', '', '', ''])
    return rows

# ── 더쿠 ─────────────────────────────────────────────────────
def theqoo_urls(q, max_posts):
    """더쿠 글 주소 찾기 — 네이버 공식 검색 API(openapi webkr). 검색 결과 페이지(search.naver.com)는 robots.txt가 막아 쓰지 않는다(10-16 밤 조사).
    제목·요약에 키워드(띄어쓰기 뺀 첫 단어)가 든 글만 남긴다."""
    sys.path.insert(0, r'C:\claude\네이버 급상승 키워드 기반 경쟁사 발굴\scripts')
    import config
    auth = config.NaverAuth(); key = re.sub(r'\s', '', q.split()[0]); urls = []
    for query in (f'site:theqoo.net {q}', f'더쿠 {q}'):
        for start in (1, 101):
            with voice_rate.gate('naver_api'):
                r = S.get('https://openapi.naver.com/v1/search/webkr.json', params={'query': query, 'display': 100, 'start': start},
                          headers=auth.search_headers(), timeout=20)
            if r.status_code != 200: break
            items = r.json().get('items', [])
            for it in items:
                link = it.get('link', ''); txt = re.sub(r'<[^>]+>|\s', '', it.get('title', '') + it.get('description', ''))
                m = re.match(r'https?://theqoo\.net/[a-z_]+/\d+', link)
                if m and key in txt and m.group(0) not in urls: urls.append(m.group(0))
            if len(items) < 100 or len(urls) >= max_posts: break
        if len(urls) >= max_posts: break
    return urls[:max_posts]

def theqoo(q, max_posts):
    rows = []
    for url in theqoo_urls(q, max_posts):
        try: r = get('theqoo', url)
        except RuntimeError: raise
        except Exception: continue
        s = BeautifulSoup(r.text, 'html.parser')
        hd = s.select_one('.theqoo_document_header')
        title = clean(hd.select_one('.title').get_text()) if hd and hd.select_one('.title') else clean(s.title.get_text() if s.title else '')
        body = clean((s.select_one('.rd_body') or s.new_tag('x')).get_text(' '))[:5000]
        date = clean((s.select_one('.side.fr span') or s.new_tag('x')).get_text())
        if '로그인' in title and not body: continue
        rows.append(['게시글', 'theqoo', q, title, body, '', url, '', date, '', ''])
        srl = url.rsplit('/', 1)[-1]; cpage, pages = 0, 0
        while pages < 5:   # 댓글은 마지막 쪽부터 온다(now_comment_page) — 앞쪽으로 최대 5쪽
            try:
                c = get('theqoo', 'https://theqoo.net/index.php', method='POST',
                        data=json.dumps({'act': 'dispTheqooContentCommentListTheqoo', 'document_srl': srl, 'cpage': cpage}),
                        headers={'Content-Type': 'application/json; charset=utf-8', 'X-Requested-With': 'XMLHttpRequest', 'Referer': url})
                j = c.json() or {}
            except RuntimeError: raise
            except Exception: break
            cl = j.get('comment_list') or []
            for cm in (cl.values() if isinstance(cl, dict) else cl):
                t = clean(BeautifulSoup(str((cm or {}).get('ct') or (cm or {}).get('content') or ''), 'html.parser').get_text(' '))
                t = re.sub(r'^(@\d+\s*)+', '', t)
                if len(t) >= 2: rows.append(['댓글', 'theqoo', q, '', '', t[:2000], url, '', str((cm or {}).get('rd', ''))[:8], '', ''])
            pages += 1; now = int(j.get('now_comment_page') or 1)
            if now <= 1: break
            cpage = now - 1
    return rows

SITES = {'cook82': cook82, 'theqoo': theqoo}

def run(keywords, out, sites='cook82', max_posts=80, **_):
    """voice_crawl.run과 같은 모양: 받은 키워드는 건너뛰고, 키워드마다 엑셀과 _수집.json 기록을 남긴다."""
    import openpyxl
    os.makedirs(out, exist_ok=True); sp = os.path.join(out, '_수집.json')
    state = json.load(open(sp, encoding='utf-8')) if os.path.exists(sp) else []
    done = {x['키워드'] for x in state if x.get('파일') and not x.get('막힘')}
    for kw in keywords:
        if kw in done: continue
        xlsx = os.path.join(out, safe(kw) + '.xlsx'); blocked, err = False, None
        try: rows = SITES[sites](kw, max_posts)
        except RuntimeError as e: rows, blocked, err = [], True, str(e)[:200]
        if rows:
            wb = openpyxl.Workbook(); ws = wb.active; ws.append(HEAD)
            for r in rows: ws.append(r)
            wb.save(xlsx)
        n = sum(1 for r in rows if r[0] == '게시글'); m = len(rows) - n
        rec = {'키워드': kw, '파일': xlsx if rows else None, '사이트': {sites: {'글': n, '댓글': m, '에러': err}},
               '종료코드': 0 if not blocked else 1, '막힘': blocked, '시각': time.strftime('%Y-%m-%d %H:%M')}
        state = [x for x in state if x['키워드'] != kw] + [rec]
        json.dump(state, open(sp, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print(f'{kw}: {sites} {n}/{m}' + (' — 막힘' if blocked else ''), flush=True)
        if blocked: break
    return state

if __name__ == '__main__':
    site, kw, out = sys.argv[1], sys.argv[2], sys.argv[3]
    run([kw], out, sites=site, max_posts=int(sys.argv[4]) if len(sys.argv) > 4 else 80)

"""One public PDP pagination GET; no login, cookies, API or browser downloads."""
from pathlib import Path
import json
import requests
from bs4 import BeautifulSoup

root = Path(__file__).resolve().parent
url = 'https://puriven.co.kr/product/detail.html?product_no=33&page_4=2#prdReview'
response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=25)
response.raise_for_status()
response.encoding = 'utf-8'
(root / 'P33-reviews-page2.html').write_text(response.text, encoding='utf-8')
soup = BeautifulSoup(response.text, 'html.parser')
rows = json.loads((root / 'P33-reviews-basic.json').read_text(encoding='utf-8'))
rows = [row for row in rows if row.get('page', 1) == 1]
for row in rows:
    row['page'] = 1
for index, el in enumerate(soup.select('#alph_origin_board [data-review-no]'), 1):
    def get(selector):
        node = el.select_one(selector)
        return node.get_text(' ', strip=True) if node else None
    row = dict(page=2, position=index, id=el['data-review-no'], author=get('.member'),
               date_verbatim=get('.date'), rating=get('.rate'), vote=get('.vote'),
               body=get('.cont'), product=get('.prod_name'), source=url,
               sort='서버 응답 기본순; 추천/고정 UI 미확인',
               browser_visibility='alph_origin_board display:none; 공개 HTML 원문')
    rows.append(row)
    print(json.dumps(row, ensure_ascii=False))
(root / 'P33-reviews-basic.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'records': len(rows), 'unique_ids': len({r['id'] for r in rows}),
                  'unique_bodies': len({r['body'] for r in rows})}))

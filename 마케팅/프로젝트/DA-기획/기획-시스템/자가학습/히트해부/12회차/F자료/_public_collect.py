from pathlib import Path
from urllib.parse import urljoin
import concurrent.futures, json, requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent
TARGETS = {'H': 'https://hexaq.kr/surl/P/24', 'P': 'https://puriven.co.kr/product/detail.html?product_no=31'}

def collect(item):
    key, url = item
    response = requests.get(url, headers={'User-Agent':'Mozilla/5.0'}, timeout=35)
    response.raise_for_status()
    response.encoding = response.apparent_encoding
    (ROOT / f'{key}-page.html').write_text(response.text, encoding='utf-8')
    soup = BeautifulSoup(response.text, 'html.parser')
    (ROOT / f'{key}-text.txt').write_text(soup.get_text('\n', strip=True), encoding='utf-8')
    images = []
    for img in soup.select('img'):
        attrs = {k:v for k,v in img.attrs.items() if k in ['src','data-src','data-original','alt','class']}
        attrs['parents'] = [{'id': p.get('id'), 'class': p.get('class')} for p in list(img.parents)[:4]]
        images.append(attrs)
    info = {'url':url, 'resolved_url':response.url, 'images':images,
            'iframes':[dict(x.attrs) for x in soup.select('iframe')],
            'review_links': [{'text':x.get_text(' ',strip=True),'href':urljoin(response.url,x['href'])} for x in soup.select('a[href]') if any(w in x['href'] for w in ['review','board','page_4'])]}
    (ROOT / f'{key}-manifest.json').write_text(json.dumps(info, ensure_ascii=False, indent=2),encoding='utf-8')
    return {'key':key, 'resolved_url':response.url, 'images':len(images), 'iframes':info['iframes'], 'review_links':info['review_links'][:12]}

if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        for result in pool.map(collect, TARGETS.items()):
            print(json.dumps(result,ensure_ascii=False))

from pathlib import Path
from urllib.parse import urljoin
import json, requests, concurrent.futures
from bs4 import BeautifulSoup
ROOT=Path(__file__).resolve().parent
rows=json.loads((ROOT.parent/'F-상품광고대조.json').read_text(encoding='utf-8-sig'))
targets={'H28':'https://hexaq.kr/surl/P/28','P33':'https://puriven.co.kr/product/detail.html?product_no=33'}
def run(item):
    key,url=item
    r=requests.get(url,headers={'User-Agent':'Mozilla/5.0'},timeout=35); r.raise_for_status(); r.encoding='utf-8'
    (ROOT/f'{key}-page.html').write_text(r.text,encoding='utf-8')
    s=BeautifulSoup(r.text,'html.parser')
    (ROOT/f'{key}-text.txt').write_text(s.get_text('\n',strip=True),encoding='utf-8')
    row=next(x for x in rows if x.get('source')==url)
    urls=[urljoin(url,u) for u in row['detail_images']]
    (ROOT/f'{key}-image-urls.txt').write_text('\n'.join(urls),encoding='utf-8')
    return {'key':key,'title':s.title.get_text(),'images':len(urls)}
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
    for x in pool.map(run,targets.items()): print(json.dumps(x,ensure_ascii=False))

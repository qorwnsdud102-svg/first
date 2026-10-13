"""공개 광고 목적지와 상품 번호를 대조하는 이번 조사 전용 기록."""
import json, concurrent.futures
from pathlib import Path
import requests
from bs4 import BeautifulSoup

ROOT=Path(__file__).parent
urls=['https://meditold.com/surl/P/'+x for x in ['175','220','252','181','193','272','446']]

def get(url):
    try:
        r=requests.get(url,headers={'User-Agent':'Mozilla/5.0'},timeout=25)
        s=BeautifulSoup(r.content,'html.parser')
        detail=s.select_one('#prdDetail')
        return {'source':url,'final':r.url,'status':r.status_code,'title':s.title.get_text(' ',strip=True) if s.title else '',
                'h2':[e.get_text(' ',strip=True) for e in s.select('h2')][:6],
                'detail_images':[e.get('ec-data-src') or e.get('data-src') or e.get('src') for e in detail.select('img')] if detail else []}
    except Exception as e:return {'source':url,'error':str(e)[:200]}

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:
    result=list(ex.map(get,urls))
(ROOT/'퍼시닌-광고상품대조.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),'utf-8')
for r in result:print(r['source'],r.get('final'),r.get('status'),r.get('title'),r.get('error',''),flush=True)

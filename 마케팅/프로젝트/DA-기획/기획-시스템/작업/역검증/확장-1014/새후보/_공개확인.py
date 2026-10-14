import concurrent.futures, datetime, hashlib, json, pathlib, requests, sys
from bs4 import BeautifulSoup

BASE = pathlib.Path(__file__).resolve().parent
DEST = BASE / '공개원문'
DEST.mkdir(exist_ok=True)
KEYS = ['veltag.co.kr#3','hattke.co.kr#18','dailywondermall.co.kr#37','mebetter.co.kr#45','bonteejo.kr#11','keraturn.co.kr#1','cleanery.co.kr#11','whinica.com#12','celladew.co.kr#34','cozcoz.kr#68','bodythy.com#258','formula-in.com#218','zerobody.kr#20','vivakorea.net#13','carmim.co.kr#67','eclapure.store#11','medicami.kr#13','fromlabs.kr#134','virenne.co.kr#20']
GROUPS = {r['key']:r['ads'] for r in json.loads((BASE/'목적지별-60일광고.json').read_text(encoding='utf-8'))}
if len(sys.argv) > 1:
    targets = json.loads((BASE/sys.argv[1]).read_text(encoding='utf-8'))
    KEYS = list(targets)
    GROUPS = {k:[{'landing':u}] for k,u in targets.items()}

def fetch(key):
    url = GROUPS[key][0]['landing']
    path = DEST / key.replace('#','-').replace('.','_')
    try:
        response = requests.get(url, timeout=25, headers={'User-Agent':'Mozilla/5.0'})
        response.encoding = response.apparent_encoding
        soup = BeautifulSoup(response.text, 'html.parser')
        for node in soup.select('script,style'): node.decompose()
        title = soup.title.get_text(' ',strip=True) if soup.title else ''
        text = soup.get_text('\n',strip=True)
        path.with_suffix('.html').write_bytes(response.content)
        path.with_suffix('.txt').write_text(text,encoding='utf-8')
        detail = soup.select_one('#prdDetail') or soup.select_one('.product_detail') or soup.select_one('#detail') or soup
        images = []
        for img in detail.select('img'):
            src = img.get('ec-data-src') or img.get('data-src') or img.get('src')
            if src: images.append(requests.compat.urljoin(response.url,src))
        info = {'key':key,'requested_url':url,'final_url':response.url,'status_code':response.status_code,'title':title,'retrieved_at':datetime.datetime.now().astimezone().isoformat(),'html_path':str(path.with_suffix('.html')),'text_path':str(path.with_suffix('.txt')),'sha256':hashlib.sha256(response.content).hexdigest(),'detail_images':list(dict.fromkeys(images))}
        path.with_suffix('.json').write_text(json.dumps(info,ensure_ascii=False,indent=2),encoding='utf-8')
        lines=text.splitlines();company=[]
        for i,line in enumerate(lines):
            if any(x in line.lower() for x in ['상호','company','사업자','대표자','대표 :']): company.extend(lines[max(0,i-1):min(i+3,len(lines))])
        return {'key':key,'http':response.status_code,'title':title,'company':' | '.join(dict.fromkeys(company))[:550],'images':len(images)}
    except Exception as error:
        return {'key':key,'error':str(error)[:200]}

with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    results = list(pool.map(fetch,KEYS))
(BASE/('공개GET-결과.json' if len(sys.argv)==1 else pathlib.Path(sys.argv[1]).stem+'-결과.json')).write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
for item in results: print(json.dumps(item,ensure_ascii=False))

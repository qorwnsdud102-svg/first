"""12회차 정확 SKU 광고에서 오래된 서로 다른 미디어 최대5개를 선별한다."""
import json, re, sys, importlib.util, datetime, hashlib
from pathlib import Path
from urllib.parse import urlparse, parse_qs, unquote
ROOT=Path(__file__).parent
src=Path(r'C:/claude/네이버 급상승 키워드 기반 경쟁사 발굴/scripts/scrape_meta.py')
sys.path.insert(0,str(src.parent))
spec=importlib.util.spec_from_file_location('meta',src);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
data=json.loads((ROOT/'새구역-메타.json').read_text('utf-8'))
targets={'오르비전':('truelabs.kr','/surl/P/37'),'비전넥신':('alphanexin.kr','/product/비전넥신/11/category/1/display/2/'),'젠엘':('jenl.co.kr','/product/detail.html'),'헥사큐':('hexaq.kr','/surl/P/28'),'퓨리븐':('puriven.co.kr','/product/detail.html')}
resolved={r['source']:r.get('final',r['source']) for r in json.loads((ROOT/'F-상품광고대조.json').read_text('utf-8'))} if (ROOT/'F-상품광고대조.json').exists() else {}
def matches(name, url, host, path):
    u=urlparse(resolved.get(url,url))
    if u.netloc!=host or unquote(u.path)!=path:return False
    product={'젠엘':['12'],'퓨리븐':['33','47']}.get(name)
    return product is None or any(n in product for n in parse_qs(u.query).get('product_no',[]))
for name in sys.argv[1:]:
    host,path=targets[name]; ads={}
    for row in data:
        for a in row['ads']:
            if a.get('is_active') and any(matches(name,u,host,path) for u in a.get('link_urls',[])):ads[a['id']]=a
    adlist=sorted(ads.values(),key=lambda x:-(x.get('days_running') or 0)); groups={}
    for a in adlist:
        key=re.sub(r'\s+','',a.get('body') or a.get('title') or a['id'])[:400]
        groups.setdefault(key,[]).append(a)
    selected=[]
    dest=ROOT/'광고자료'/name;dest.mkdir(parents=True,exist_ok=True)
    (dest/'전체해당SKU.json').write_text(json.dumps({'ads':adlist},ensure_ascii=False,indent=2),'utf-8')
    media=[];sess=m._download_session();hashes=set();duplicates=[]
    for a in adlist:
        options=m.media_plan([a]); chosen=options[:1]
        for item in chosen:
            fp=dest/item['file'];size=fp.stat().st_size if fp.exists() else m._dl(sess,item['url'],fp)
            if not size:continue
            digest=hashlib.sha256(fp.read_bytes()).hexdigest()
            if digest in hashes:
                duplicates.append({'id':a['id'],'sha256':digest});continue
            hashes.add(digest);selected.append(a)
            media.append({**item,'bytes':size,'downloaded':True,'sha256':digest})
            print(name,a['id'],a['days_running'],size,flush=True)
        if len(selected)>=5:break
    obj={'brand':name,'ads':selected,'media':[x for x in media if x['downloaded']],'all_sku_ads':len(adlist),'body_groups':len(groups),'selection':'oldest distinct media SHA256, not body text','duplicates':duplicates,'as_of':datetime.datetime.now().isoformat()}
    (dest/'_ads.json').write_text(json.dumps(obj,ensure_ascii=False,indent=2),'utf-8')
    lines=[f'# {name} 광고 선별',f'해당 SKU 활성광고 {len(adlist)}건, 본문 묶음 {len(groups)}개. 실제 파일 해시가 다른 오래된 {len(selected)}소재를 골랐다. 같은 본문도 다른 영상이면 따로 본다. 공개 첫 화면 표본이며 전체시장 집계 아님. 장기 게재는 수익 증명이 아님.']
    for i,a in enumerate(selected,1):lines.extend([f"\n## 소재{i} — {a['id']} · {a['days_running']}일",f"https://www.facebook.com/ads/library/?id={a['id']}",a.get('body') or '(본문 없음)',a.get('title') or '',f"형식: {a.get('display_format')}"])
    (dest/'선별.md').write_text('\n'.join(lines),'utf-8')

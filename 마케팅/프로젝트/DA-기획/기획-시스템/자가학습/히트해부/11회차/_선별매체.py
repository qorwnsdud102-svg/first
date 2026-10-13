"""11회차 관찰한 exact SKU 광고의 오래된 본문 5묶음. 단발 조사 스크립트."""
import json, re, sys, importlib.util, datetime
from pathlib import Path
from urllib.parse import urlparse, parse_qs
ROOT=Path(__file__).parent
src=Path(r'C:/claude/네이버 급상승 키워드 기반 경쟁사 발굴/scripts/scrape_meta.py')
sys.path.insert(0,str(src.parent))
spec=importlib.util.spec_from_file_location('meta',src);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
data=json.loads((ROOT/'새구역-메타.json').read_text('utf-8'))
targets={'테토쿨':('tetocool.co.kr','/surl/P/15'),'악타로스':('tetracure.kr','/surl/P/42'),'NOCT':('noct-research.com','/product/detail.html'),'K바이오코드':('kbiocode.com','/surl/P/18'),'올루프':('odada.life','/shop_view/156')}
for name in sys.argv[1:]:
    host,path=targets[name]; ads={}
    for row in data:
        for a in row['ads']:
            if a.get('is_active') and any(urlparse(u).netloc==host and urlparse(u).path==path and (name!='NOCT' or parse_qs(urlparse(u).query).get('product_no')==['9']) for u in a.get('link_urls',[])):ads[a['id']]=a
    adlist=sorted(ads.values(),key=lambda x:-(x.get('days_running') or 0)); groups={}
    for a in adlist:
        key=re.sub(r'\s+','',a.get('body') or a.get('title') or a['id'])[:400]
        groups.setdefault(key,[]).append(a)
    selected=[v[0] for v in list(groups.values())[:5]]
    dest=ROOT/'광고자료'/name;dest.mkdir(parents=True,exist_ok=True)
    (dest/'전체해당SKU.json').write_text(json.dumps({'ads':adlist},ensure_ascii=False,indent=2),'utf-8')
    media=[];sess=m._download_session()
    for a in selected:
        options=m.media_plan([a]); chosen=options[:1]
        for item in chosen:
            fp=dest/item['file'];size=fp.stat().st_size if fp.exists() else m._dl(sess,item['url'],fp)
            media.append({**item,'bytes':size,'downloaded':bool(size)})
            print(name,a['id'],a['days_running'],size,flush=True)
    obj={'brand':name,'ads':selected,'media':[x for x in media if x['downloaded']],'all_sku_ads':len(adlist),'body_groups':len(groups),'as_of':datetime.datetime.now().isoformat()}
    (dest/'_ads.json').write_text(json.dumps(obj,ensure_ascii=False,indent=2),'utf-8')
    lines=[f'# {name} 광고 선별',f'해당 SKU 활성광고 {len(adlist)}건, 본문 묶음 {len(groups)}개. 공개 첫 화면 표본이며 전체시장 집계 아님. 장기 게재는 수익 증명이 아님.']
    for i,a in enumerate(selected,1):lines.extend([f"\n## 소재{i} — {a['id']} · {a['days_running']}일",f"https://www.facebook.com/ads/library/?id={a['id']}",a.get('body') or '(본문 없음)',a.get('title') or '',f"형식: {a.get('display_format')}"])
    (dest/'선별.md').write_text('\n'.join(lines),'utf-8')

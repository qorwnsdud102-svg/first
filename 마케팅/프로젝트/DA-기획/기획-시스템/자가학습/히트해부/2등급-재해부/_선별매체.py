"""2등급 재해부 정확 SKU 광고에서 오래된 서로 다른 미디어 최대5개를 선별한다."""
import json, re, sys, importlib.util, datetime, hashlib
from pathlib import Path
from urllib.parse import urlparse, parse_qs, unquote
ROOT=Path(__file__).parent
src=Path(r'C:/claude/네이버 급상승 키워드 기반 경쟁사 발굴/scripts/scrape_meta.py')
sys.path.insert(0,str(src.parent))
spec=importlib.util.spec_from_file_location('meta',src);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
data=json.loads((ROOT/'현재-메타.json').read_text('utf-8'))
targets={'누룩밤':('wizardjoseon.com',['29']),'노일리':('noily.kr',['26']),'릴리이브':('lilyeve.kr',['235']),'인버브':('inverb.co.kr',['49']),'메디톨드':('meditold.com',['175','220','252','193','272','446']),'에끌무아':('eclmoi.com',['59'])}
def matches(name,url,host,products):
    u=urlparse(url)
    if u.netloc.removeprefix('www.')!=host:return False
    q=parse_qs(u.query).get('product_no',[])
    match=re.search(r'/surl/p/(\d+)',u.path,re.I)
    return any(n in products for n in q) or bool(match and match.group(1) in products)
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

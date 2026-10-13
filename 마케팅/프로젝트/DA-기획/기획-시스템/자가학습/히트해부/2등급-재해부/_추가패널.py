import json,sys,importlib.util,hashlib
from pathlib import Path
ROOT=Path(__file__).parent
src=Path(r'C:/claude/네이버 급상승 키워드 기반 경쟁사 발굴/scripts/scrape_meta.py');sys.path.insert(0,str(src.parent))
sp=importlib.util.spec_from_file_location('meta',src);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m)
for brand in ['누룩밤','인버브','메디톨드']:
 dest=ROOT/'광고자료'/brand;d=json.loads((dest/'_ads.json').read_text('utf-8'));seen={x['sha256'] for x in d['media']};files={x['file'] for x in d['media']};out=[];ss=m._download_session()
 for a in d['ads']:
  for x in m.media_plan([a]):
   if x['file'] in files:continue
   f=dest/x['file'];n=f.stat().st_size if f.exists() else m._dl(ss,x['url'],f)
   if not n:out.append({**x,'downloaded':False});continue
   h=hashlib.sha256(f.read_bytes()).hexdigest();out.append({**x,'bytes':n,'downloaded':True,'sha256':h,'duplicate_file_hash':h in seen});seen.add(h)
   print(brand,x['ad_id'],x['file'],n,out[-1]['duplicate_file_hash'],flush=True)
 (dest/'추가패널.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),'utf-8')

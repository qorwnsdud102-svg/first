import pathlib,json,requests,hashlib,concurrent.futures,datetime
BASE=pathlib.Path(__file__).resolve().parent
SELECTION={'mebetter.co.kr#45':[11,25,43],'bonteejo.kr#11':[14,18,23],'keraturn.co.kr#1':[20,28,40],'cleanery.co.kr#11':[6,10],'whinica.com#12':[18,22],'celladew.co.kr#34':[10,20],'cozcoz.kr#68':[8,10,17],'bodythy.com#258':[6,13,15,23],'formula-in.com#218':[11,14,18],'zerobody.kr#20':[2],'vivakorea.net#13':[5,10],'eclapure.store#11':[8,13]}
JOBS=[]
for key,indices in SELECTION.items():
    meta=json.loads((BASE/'공개원문'/(key.replace('#','-').replace('.','_')+'.json')).read_text(encoding='utf-8'))
    for index in indices:
        url=meta['detail_images'][index]
        JOBS.append((key,index,url))
def fetch(job):
    key,index,url=job
    path=BASE/'항목이미지'/(key.replace('#','-').replace('.','_')+f'-{index:02d}'+pathlib.Path(url.split('?')[0]).suffix)
    path.parent.mkdir(exist_ok=True)
    try:
        r=requests.get(url,timeout=25,headers={'User-Agent':'Mozilla/5.0'});r.raise_for_status();path.write_bytes(r.content)
        return {'key':key,'image_index_zero_based':index,'source_url':url,'local_path':str(path),'sha256':hashlib.sha256(r.content).hexdigest(),'retrieved_at':datetime.datetime.now().astimezone().isoformat()}
    except Exception as e:return {'key':key,'source_url':url,'error':str(e)[:200]}
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool: results=list(pool.map(fetch,JOBS))
(BASE/'항목이미지-명세.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
print('saved',len([r for r in results if 'local_path' in r]),'errors',[r for r in results if 'error' in r])

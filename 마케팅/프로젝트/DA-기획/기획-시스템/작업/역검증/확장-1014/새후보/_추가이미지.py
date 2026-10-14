import pathlib,json,requests,hashlib,datetime,concurrent.futures
O=pathlib.Path(__file__).resolve().parent
targets={'bodythy.com#258':[24,28,32]}
jobs=[]
for key,indices in targets.items():
 j=json.loads((O/'공개원문'/(key.replace('#','-').replace('.','_')+'.json')).read_text(encoding='utf-8'))
 for i in indices: jobs.append((key,i,j['detail_images'][i]))
def get(job):
 key,i,url=job;r=requests.get(url,timeout=25);r.raise_for_status()
 p=O/'항목이미지'/(key.replace('#','-').replace('.','_')+'-'+str(i).zfill(2)+'.jpg');p.write_bytes(r.content)
 return dict(key=key,image_index_zero_based=i,source_url=url,local_path=str(p),sha256=hashlib.sha256(r.content).hexdigest(),retrieved_at=datetime.datetime.now().astimezone().isoformat())
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool: rows=list(pool.map(get,jobs))
(O/'추가이미지-명세.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps([{'key':r['key'],'index':r['image_index_zero_based'],'path':r['local_path']} for r in rows],ensure_ascii=False))

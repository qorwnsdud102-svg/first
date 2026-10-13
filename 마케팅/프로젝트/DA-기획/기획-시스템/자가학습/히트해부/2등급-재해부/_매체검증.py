import json,re,subprocess,concurrent.futures
from pathlib import Path
import imageio_ffmpeg
ROOT=Path(__file__).parent;ff=imageio_ffmpeg.get_ffmpeg_exe()
jobs=[]
for folder in (ROOT/'광고자료').iterdir():
 if not (folder/'_ads.json').exists():continue
 d=json.loads((folder/'_ads.json').read_text('utf-8'))
 for x in d['media']:
  if x['type']=='video':jobs.append((folder,x,Path(x['file']).stem.split('_')[0]))
 extra=folder/'추가패널.json'
 if extra.exists():
  for x in json.loads(extra.read_text('utf-8')):
   if x['type']=='video' and x.get('downloaded'):jobs.append((folder,x,Path(x['file']).stem))
def run(job):
 folder,x,aid=job;src=folder/x['file']
 q=subprocess.run([ff,'-hide_banner','-i',str(src)],capture_output=True,text=True,encoding='utf-8',errors='replace').stderr
 mt=re.search(r'Duration: (\d+):(\d+):(\d+\.\d+)',q);dur=sum(float(v)*m for v,m in zip(mt.groups(),[3600,60,1])) if mt else 0
 out=ROOT/'장면'/folder.name;out.mkdir(exist_ok=True,parents=True)
 end=out/(aid+'-끝0.5초.jpg')
 z=subprocess.run([ff,'-y','-loglevel','error','-ss',str(max(0,dur-.5)),'-i',str(src),'-frames:v','1',str(end)],capture_output=True)
 if 18.5<dur<=24:
  span=dur-18.5;back=out/(aid+'-뒤.jpg')
  subprocess.run([ff,'-y','-loglevel','error','-ss','18.5','-t',str(span),'-i',str(src),'-vf',f'fps=6/{span:.2f},scale=360:-2,tile=3x2','-frames:v','1',str(back)],capture_output=True)
 return {'brand':folder.name,'id':aid,'file':str(src.relative_to(ROOT)),'duration':dur,'streams':[t.strip() for t in q.splitlines() if 'Stream #' in t],'last_frame_ok':end.exists(),'last_frame_second':max(0,dur-.5),'last_frame':str(end.relative_to(ROOT))}
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as ex:rows=list(ex.map(run,jobs))
(ROOT/'매체검증.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),'utf-8')
print('videos',len(rows),'lastframes',sum(x['last_frame_ok'] for x in rows),'no_audio_stream',[x['id'] for x in rows if not any('Audio:' in s for s in x['streams'])])

from pathlib import Path
import requests,concurrent.futures,json
from PIL import Image,ImageDraw
p=Path(__file__).parent
urls=(p/'테토쿨-관찰이미지URL.txt').read_text(encoding='utf-8').splitlines()
def fetch(row):
 i,u=row;dest=p/f'detail-{i:02}{Path(u).suffix}'
 if not dest.exists():
  r=requests.get(u,timeout=40);r.raise_for_status();dest.write_bytes(r.content)
 return dest
paths=list(concurrent.futures.ThreadPoolExecutor(max_workers=4).map(fetch,enumerate(urls,1)))
parts=[]
for i,f in enumerate(paths,1):
 im=Image.open(f); im.seek(0); im=im.convert('RGB'); w=650;im=im.resize((w,round(im.height*w/im.width)))
 for top in range(0,im.height,2200):
  cut=im.crop((0,top,w,min(top+2200,im.height))); canvas=Image.new('RGB',(w,cut.height+30),'#dddddd');canvas.paste(cut,(0,30));ImageDraw.Draw(canvas).text((10,8),f'Detail {i} / y={top}',fill='black');parts.append(canvas)
for b in range(0,len(parts),3):
 group=parts[b:b+3];out=Image.new('RGB',(sum(x.width for x in group),max(x.height for x in group)),'white');x=0
 for im in group:out.paste(im,(x,0));x+=im.width
 out.save(p/f'sheet-{b//3+1:02}.jpg',quality=88)
print('files',len(paths),'sheets',(len(parts)+2)//3)

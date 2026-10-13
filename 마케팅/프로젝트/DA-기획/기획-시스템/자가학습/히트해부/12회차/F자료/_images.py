from pathlib import Path
import requests, concurrent.futures, json, sys
from PIL import Image, ImageDraw
ROOT=Path(__file__).resolve().parent
key=sys.argv[1]
urls=(ROOT/f'{key}-image-urls.txt').read_text(encoding='utf-8').splitlines()
def fetch(item):
    i,u=item
    dest=ROOT/f'{key}-{i:02}{Path(u).suffix}'
    if not dest.exists():
        r=requests.get(u,headers={'User-Agent':'Mozilla/5.0'},timeout=35)
        r.raise_for_status()
        dest.write_bytes(r.content)
    im=Image.open(dest)
    return {'n':i,'url':u,'file':dest.name,'size':im.size,'frames':getattr(im,'n_frames',1)}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    rows=list(pool.map(fetch,enumerate(urls,1)))
(ROOT/f'{key}-images.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
pieces=[]
for row in rows:
    im=Image.open(ROOT/row['file'])
    indexes=[0] if row['frames']==1 else sorted(set([0,row['frames']//2,row['frames']-1]))
    for frame in indexes:
        im.seek(frame)
        pic=im.convert('RGB'); width=750
        pic=pic.resize((width,round(pic.height*width/pic.width)))
        for top in range(0,pic.height,1800):
            cut=pic.crop((0,top,width,min(top+1800,pic.height)))
            out=Image.new('RGB',(width,cut.height+30),'#dddddd');out.paste(cut,(0,30))
            ImageDraw.Draw(out).text((10,8),f'{key}-{row["n"]:02} frame={frame} y={top}',fill='black')
            pieces.append(out)
for start in range(0,len(pieces),3):
    group=pieces[start:start+3]
    sheet=Image.new('RGB',(750*len(group),max(x.height for x in group)),'white')
    for i,part in enumerate(group):sheet.paste(part,(750*i,0))
    sheet.save(ROOT/f'{key}-sheet-{start//3+1:02}.jpg',quality=92)
print(json.dumps({'key':key,'images':len(rows),'sheets':(len(pieces)+2)//3,'animated':[x for x in rows if x['frames']>1]},ensure_ascii=False))

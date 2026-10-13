"""본문이 같은 별도 영상도 ID별로 판독. 기존 ASR은 재사용한다."""
import sys, json, shutil, subprocess
from pathlib import Path
import imageio_ffmpeg
sys.path.insert(0,str(Path('C:/claude/LLM-WIKI/프로그램/아웃풋/da-planning/scripts')))
from hit_ad_frames import duration, sheet
from ad_media import transcribe, fmt_segments
ROOT=Path(__file__).parent
ff=imageio_ffmpeg.get_ffmpeg_exe()
old={'930057146814374':1,'1071691909053582':1,'1095431446674288':1}
for brand in sys.argv[1:]:
    data=json.loads((ROOT/'광고자료'/brand/'_ads.json').read_text('utf-8'))
    out=ROOT/'장면'/brand;out.mkdir(parents=True,exist_ok=True)
    for item in data['media']:
        src=ROOT/'광고자료'/brand/item['file']
        if src.suffix!='.mp4':continue
        aid=src.stem.split('_')[0];dur=duration(ff,str(src))
        print(brand,aid,dur,flush=True)
        for suffix,start,span in [('앞',0.5,min(18,max(dur-0.5,1))),('뒤',18,max(dur-18.5,1))]:
            if suffix=='뒤' and dur<=24:continue
            dst=out/f'{aid}-{suffix}.jpg'
            if not dst.exists():sheet(ff,str(src),str(dst),start,span)
        first=out/f'{aid}-첫0.2초.jpg'
        if not first.exists():subprocess.run([ff,'-y','-loglevel','error','-ss','0.2','-i',str(src),'-frames:v','1',str(first)],check=True)
        txt=out/f'{aid}-음성.txt'
        if not txt.exists():
            oldfile=out/f'소재{old.get(aid,0)}-영상1-음성.txt'
            if aid in old and oldfile.exists():shutil.copyfile(oldfile,txt)
            else:txt.write_text(fmt_segments(transcribe(str(src),ff)) or '(인식된 말 없음)','utf-8')
        print('완료',aid,flush=True)

"""Run the existing public crawlers with pacing; never edit their repository."""
import os, runpy, sys
from pathlib import Path
from voice_rate import gate, provider, observe, visible

HERE=Path(__file__).resolve().parent
target=Path(sys.argv[1]).resolve();args=sys.argv[2:]
allowed={Path('C:/claude/크롤링/crawl.py').resolve(),(HERE/'naver_kw.py').resolve()}
if target not in allowed:raise ValueError('승인된 기존 수집기만 실행합니다.')
if target.name=='crawl.py' and (not args or args[0]!='crawl' or not set(args[1].split(',')).issubset({'natepann','youtube','dcinside'})):
    raise ValueError('공개 네이트판·유튜브·디시 crawl만 허용합니다. 로그인 기능을 실행하지 않습니다.')
os.environ['CRAWL_HEADLESS']='1';os.environ['PYTHONUTF8']='1';os.environ['PYTHONIOENCODING']='utf-8'
sys.dont_write_bytecode=True
import requests
original=requests.sessions.Session.request
def paced(self,method,url,*a,**kw):
    site=provider(url)
    with gate(site):
        result=original(self,method,url,*a,**kw)
        text=visible(result.text) if 'text/html' in result.headers.get('Content-Type','') else result.text[:1000]
        observe(site,result.status_code,text)
        return result
requests.sessions.Session.request=paced
if target.name=='crawl.py':
    import yt_dlp
    extract=yt_dlp.YoutubeDL.extract_info
    def paced_extract(self,*a,**kw):
        with gate('youtube'):
            try:return extract(self,*a,**kw)
            except Exception as e:
                if '429' in str(e) or 'IpBlocked' in str(e) or 'RequestBlocked' in str(e):observe('youtube',429,str(e))
                raise
    yt_dlp.YoutubeDL.extract_info=paced_extract
    from playwright.sync_api import Page
    goto=Page.goto
    def paced_goto(self,url,*a,**kw):
        if not str(url).startswith('http'):return goto(self,url,*a,**kw)
        site=provider(url)
        with gate(site):
            result=goto(self,url,*a,**kw)
            if result:observe(site,result.status,visible(self.content()))
            return result
    Page.goto=paced_goto
sys.path.insert(0,str(target.parent));os.chdir(target.parent);sys.argv=[str(target),*args]
runpy.run_path(str(target),run_name='__main__')

"""Shared per-site pacing for this research, including child crawler processes."""
import contextlib, datetime, json, os, random, re, threading, time
from pathlib import Path
from urllib.parse import urlparse

STATE = Path(__file__).resolve().parents[4]/'마케팅/프로젝트/DA-기획/기초분석-v2/_호출제한'
GAPS = {'naver':(3,6),'youtube':(10,20),'community':(2,4),'shopping':(3,6),'cook82':(4,7),'theqoo':(4,7),'naver_api':(1,2)}   # 82쿡·더쿠는 넉넉히(사장님 10-16 밤 '엑세스 제한 안당하게 조심')
_locks={};_local=threading.local();_setup=threading.Lock()

def provider(url):
    host=urlparse(url).netloc.lower()
    if 'youtube' in host or 'googlevideo' in host or 'youtu.be' in host:return 'youtube'
    if 'shopping.naver' in host or 'smartstore.naver' in host:return 'shop_naver'
    if 'naver' in host:return 'naver'
    if 'nate.com' in host:return 'community'
    if 'instiz.net' in host:return 'instiz'
    return 'shop_'+re.sub(r'[^a-z0-9._-]','',host)

# 큰 커뮤니티 주소별 간격(10-17 00:25 — 깊이 채우기가 3~6초 간격에 묶여 디시 5일 걸림 → 사장님 '병렬로 빠르게, 제한은 받지 않게'. 막힘 한 번이면 그 주소는 (4,7)로 되돌린다)
HOST_GAPS = {'shop_gall.dcinside.com':(2,3.5),'shop_search.dcinside.com':(2,3.5),'shop_www.fmkorea.com':(2,3.5),'shop_bbs.ruliweb.com':(2,3.5),
             'shop_arca.live':(2,3.5),'shop_mlbpark.donga.com':(2,3.5),'shop_www.teamblind.com':(2.5,4.5)}
def gap_for(site):return HOST_GAPS.get(site) or (GAPS['shopping'] if site.startswith('shop_') else GAPS.get(site,GAPS['community']))

def blocked(status,text=''):
    return status in (429,418) or bool(re.search(r'보안문자를\s?입력|자동입력\s?방지\s?문자를|IpBlocked|RequestBlocked|HTTP Error 429',text,re.I))

@contextlib.contextmanager
def gate(site):
    if site in getattr(_local,'active',set()):yield;return
    with _setup:lock=_locks.setdefault(site,threading.RLock())
    with lock:
        STATE.mkdir(parents=True,exist_ok=True)
        path=STATE/(site+'.json');lockpath=STATE/(site+'.lock')
        with lockpath.open('a+b') as handle:
            handle.seek(0)
            try:
                if not handle.read(1):handle.write(b'1');handle.flush()
            except PermissionError:pass   # 다른 프로세스가 0바이트를 잠근 중이면 읽기가 막힌다 — 파일은 이미 있으니 아래 잠금 대기로 간다(10-16 밤 yt_extend·더쿠 수집기 동시 실행에서 실패)
            if os.name=='nt':
                import msvcrt
                while True:
                    try:handle.seek(0);msvcrt.locking(handle.fileno(),msvcrt.LK_NBLCK,1);break
                    except OSError:time.sleep(.2)
            state=json.loads(path.read_text(encoding='utf-8')) if path.exists() else {}
            wait=max(state.get('next',0),state.get('cool_until',0))-time.time()
            while wait>0:time.sleep(min(wait,30));wait=max(state.get('next',0),state.get('cool_until',0))-time.time()
            active=getattr(_local,'active',set());_local.active=active|{site}
            try:yield
            finally:
                # A blocked response may have updated the cooldown inside this gate.
                newer=json.loads(path.read_text(encoding='utf-8')) if path.exists() else state
                newer.update(next=time.time()+random.uniform(*gap_for(site)),last_finished=datetime.datetime.now().astimezone().isoformat())
                path.write_text(json.dumps(newer,ensure_ascii=False,indent=2),encoding='utf-8')
                _local.active=active
                if os.name=='nt':handle.seek(0);msvcrt.locking(handle.fileno(),msvcrt.LK_UNLCK,1)

def observe(site,status,text=''):
    path=STATE/(site+'.json');STATE.mkdir(parents=True,exist_ok=True)
    state=json.loads(path.read_text(encoding='utf-8')) if path.exists() else {}
    state['empty_streak']=state.get('empty_streak',0)+1 if not text.strip() else 0
    if blocked(status,text) or state['empty_streak']>=3:
        state.update(cool_until=time.time()+1800,reason='HTTP '+str(status)+' / '+text[:120],blocked_at=datetime.datetime.now().astimezone().isoformat())
        path.write_text(json.dumps(state,ensure_ascii=False,indent=2),encoding='utf-8')
        raise RuntimeError(site+' 차단 신호—30분 휴식 저장, 우회하지 않음')
    path.write_text(json.dumps(state,ensure_ascii=False,indent=2),encoding='utf-8')

def visible(html):
    from bs4 import BeautifulSoup
    soup=BeautifulSoup(html,'html.parser')
    for tag in soup(['script','style','noscript']):tag.decompose()
    return soup.get_text(' ',strip=True)[:6000]

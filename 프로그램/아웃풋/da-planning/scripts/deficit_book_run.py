"""결핍 책 전체 실행기 — _전체계획.json의 모든 계열을 사이트마다 한 줄씩 돌리고, 계열 수집이 끝나면 바로 정리(모델 없음)까지 한다.

사장님 근거: P6524~P6537(결핍 책·묶어서 중복 크롤링 안 함·지식인만·모든 커뮤니티·결핍 50개), P6542~P6543(밤새 전부, 급하게 빼지 말고 지식인만 줄임, 유튜브 병렬·그래픽카드).
사용: python deficit_book_run.py <_전체계획.json> [--no-meta]

- 네이버 지식인 한 줄(정렬당 결핍 kin_limit['결핍']·대안 kin_limit['대안']). GPT 목소리 v2를 모은 결핍(reuse_v2)은 지식인을 다시 돌지 않고 그 자료를 쓴다.
- 커뮤니티 일곱 곳은 사이트마다 한 줄(deficit_book_collect.COMMUNITY, 결핍 키워드 글 50개·대안 30개).
- 유튜브는 받기 한 줄(유튜브 간격 지킴)과 받아쓰기 일꾼 여럿(이 PC 그래픽카드·CPU, 유튜브와 무관)으로 나눈다.
  결핍마다 의사·설명 10 + 경험 5, 대안마다 의사·설명 2 + 경험 1. 자막 서버는 쓰지 않고 소리를 받아 받아쓴다.
- 메타 광고 라이브러리 한 줄(계열마다 scrape_meta.py 한 번).
- 계열의 모든 폴더가 모든 줄을 지나면 voice_v2.finish로 정리하고 묶음/<계열>/_수집완료.json을 남긴다.
"""
import argparse, datetime, json, os, queue, re, subprocess, sys, threading, time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

os.environ['CRAWL_HEADLESS'] = '1'; os.environ['PYTHONUTF8'] = '1'; os.environ['PYTHONIOENCODING'] = 'utf-8'
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import deficit_book_collect as base          # 지식인 전용 검색·커뮤니티 글 수·블로그/카페 제외 패치가 여기서 걸린다
v2 = base.v2
from voice_rate import gate, observe

BOOK = base.BOOK; META = base.META
YT = {'결핍': (10, 5), '대안': (2, 1)}       # (의사·설명, 경험)
LINES_DONE = {}                              # 줄 이름 → 끝낸 폴더 키 집합
_dl = threading.Lock()

def fkey(f): return f['kind'] + '/' + f['name']

def mark(line, f, plan_dir, families, logs):
    with _dl:
        LINES_DONE.setdefault(line, set()).add(fkey(f))
    check_families(plan_dir, families, logs)

# ── 네이버 지식인 ────────────────────────────────────────────
FULL = [False]   # 계획의 full_depth — 사장님 10-16 밤 "시간 문제로 자료 수집을 덜 하는 경우는 없어야 해": 줄였던 깊이(지식인 정렬당 수·느린 사이트 메인 키워드만·대안 생략)를 기본값으로 다시 채운다

def naver_line(folders, plan, plan_dir, families, logs):
    for f in folders:
        folder = base.folder_of(f)
        done_mark = folder / '공개검색-완료.json'
        if FULL[0] and done_mark.exists() and not (folder / '공개검색-완료-1차.json').exists(): done_mark.rename(folder / '공개검색-완료-1차.json')   # 이미 모은 질의는 기록으로 건너뛰고 모자란 것만 더 모은다. '-1차'가 이미 있으면 지금 표시는 깊이 채우기가 끝난 표시(10-17 08:29 다시 띄울 때 이름 겹쳐 네이버 줄이 죽음)
        if (FULL[0] or not f.get('reuse_v2')) and not done_mark.exists():
            base.status(plan_dir, '네이버', f"{fkey(f)} 지식인 시작 ({len(f['queries'])}개 질의, 정렬당 {plan['kin_limit'][f['kind']]}건)")
            base._limit[0] = plan['kin_limit'][f['kind']]
            qs_n = [x for x in f['queries'] if x not in extras_of(f)] if FULL[0] else f['queries']   # 지식인은 덧붙인 '후기·고민·없애는법' 빼고 기본 질의만(같은 질문이 대부분 겹침 — 10-17 01:25 네이버가 결핍당 2~3시간)
            try: v2.collect_public(f['name'], qs_n, folder, logs[f['name']])
            except Exception as e: logs[f['name']].append({'source': '네이버', 'error': str(e)[:200]})
        mark('네이버', f, plan_dir, families, logs)
    base.status(plan_dir, '네이버', '끝')

# ── 커뮤니티 일곱 곳 ─────────────────────────────────────────
# 느린 사이트(키워드 하나에 15~20분 — 2026-10-15 실측)는 결핍의 메인 키워드 하나만 돈다. 대안은 빠른 사이트·지식인·유튜브가 맡는다.
SLOW = {'dcinside', 'blind', 'natepann', 'mlbpark'}

_ql = {}; _qlg = threading.Lock()
def _qlock(site, q):
    with _qlg: return _ql.setdefault((site, q), threading.Lock())

# 사이트 하나에 줄 여러 개(10-16 밤 사장님 "몇 주 걸리는 건 너무 심한데", "커뮤니티 병렬로"). 요청 간격은 voice_rate가 사이트(주소)마다
# 3~6초로 지키고 막힘 신호면 30분 쉬므로, 줄을 늘려도 사이트에 가는 속도는 그 이상 빨라지지 않는다 — 수집기가 혼자 쉬던 빈 시간만 채운다.
LINES_PER_SITE = {'dcinside': 3, 'blind': 3, 'natepann': 3, 'mlbpark': 3, 'arca': 3, 'fmkorea': 2, 'ruliweb': 2}

def extras_of(f):
    n = f['name']; return {f'{n} 후기', f'{n} 고민', f'{n} 없애는법'} if f['kind'] == '결핍' else {f'{n} 후기', f'{n} 효과', f'{n} 부작용'}

def done_q(part, q):
    """수집기(voice_crawl.run·community_extra.run)가 건너뛰는 기준과 같다: 그 키워드 기록에 파일이 있고 막힘이 아님."""
    sp = part / '_수집.json'
    if not sp.exists(): return False
    try: st = json.loads(sp.read_text(encoding='utf-8'))
    except Exception: return False
    return any(x.get('키워드') == q and x.get('파일') and not x.get('막힘') for x in st)

def redo_if_capped(part, q, posts):
    """깊이 채우기: 예전 한도(결핍 50·대안 30)로 받은 질의는 새 한도(결핍 80·대안 50)로 다시 받게 기록을 비운다.
    사장님 10-16 밤 "키워드당 50개가 아니라 80개로 늘리자"(DC·블라인드가 핵심). 옛 엑셀은 '-1차'로 남겨 함께 읽고, 정리 때 URL로 중복을 지운다.
    결과가 원래 적었던 질의(글 10개 미만)는 다시 받지 않는다. 다시 받은 한도는 _한도.json에 남겨 되풀이하지 않는다."""
    sp, lp = part / '_수집.json', part / '_한도.json'
    if not sp.exists(): return
    caps = json.loads(lp.read_text(encoding='utf-8')) if lp.exists() else {}
    if caps.get(q, 0) >= posts: return
    st = json.loads(sp.read_text(encoding='utf-8'))
    rec = next((x for x in st if x.get('키워드') == q), None)
    if rec and rec.get('파일'):
        n = sum((v or {}).get('글', 0) for v in (rec.get('사이트') or {}).values())
        if n >= 10:
            x = Path(rec['파일'])
            if x.exists(): x.rename(x.with_name(x.stem + '-1차.xlsx'))
            v2.write(sp, [y for y in st if y is not rec])
    caps[q] = posts; v2.write(lp, caps)

def community_rows(f, folder, log, site, queries):
    """voice_v2.community와 같은 방식이되, 돌 질의를 정해 준다. 예전에 모은 질의 결과(키워드.json)도 함께 읽는다."""
    import voice_crawl, voice_count, community_extra
    dest = folder / ('커뮤니티-' + site); dest.mkdir(exist_ok=True)
    posts = getattr(base._tl, 'posts', base.POSTS[f['kind']])
    def runner(cmd, **kw):   # 깊이 채우기(키워드당 80개)는 느린 사이트에서 30분을 넘길 수 있어 2시간까지 기다린다
        return subprocess.run([cmd[0], '-X', 'utf8', str(HERE / 'voice_rate_runtime.py'), cmd[1], *cmd[2:]], timeout=7200 if FULL[0] else 1800, **kw)
    for i, q in enumerate(queries):
        part = v2.OUT / '_공유-커뮤니티' / site / voice_crawl.safe(q)
        if not FULL[0] and (dest / (voice_crawl.safe(q) + '.xlsx')).exists(): continue
        if FULL[0]: redo_if_capped(part, q, posts)
        if done_q(part, q): continue   # 이미 받은 질의는 쉬지 않고 건너뜀(10-17 09:24: 다시 띄울 때 받은 질의마다 30초씩 쉬어 줄마다 수십 분을 버림)
        if i: time.sleep(30)
        crawler = community_extra.run if site in community_extra.SITES else voice_crawl.run   # 82쿡·더쿠는 새 수집기(10-16 밤)
        with _qlock(site, q):   # 같은 사이트 줄 여럿이 같은 질의를 동시에 받지 않게
            try: crawler([q], str(part), sites=site, max_posts=posts, filt='smart', runner=runner)
            except Exception as e: log.append({'source': site, 'keyword': q, 'error': type(e).__name__ + ': ' + str(e)[:150]})
    k = json.loads((folder / '키워드.json').read_text(encoding='utf-8'))
    allq = set(queries) | {x['keyword'] for x in k.get('main', [])}
    files = list(dest.glob('*.xlsx'))
    for q in allq: files += list((v2.OUT / '_공유-커뮤니티' / site / voice_crawl.safe(q)).glob('*.xlsx'))
    rows = []
    for fp in files:
        try:
            ctx = {}; raw = voice_count.load_rows(fp)
            for r in raw:
                c = (list(r) + [None] * 11)[:11]
                if c[0] == '게시글': ctx[c[6] or ''] = (str(c[3] or '') + ' ' + str(c[4] or ''))[:3000]
            for u in voice_count.units_from_rows(raw):
                rows.append({'source': u['사이트'] if u['종류'] != '유튜브 댓글' else '유튜브 댓글', 'type': u['종류'], 'text': u['글'], 'url': u['url'],
                             'context': ctx.get(u['url'], '') if '댓글' in u['종류'] else '', 'level': '기존 공개 크롤러 본문/댓글', 'likes': u['좋아요'], 'raw_file': str(fp)})
        except Exception as e: log.append({'source': site, 'file': str(fp), 'error': str(e)[:140]})
    return rows

YT_DONE = threading.Event()

def yt_line_safe(*a):
    try: yt_download_line(*a)
    finally: YT_DONE.set()   # 영상 줄이 실패해도 댓글 줄이 영원히 기다리지 않게   # 유튜브 댓글 줄은 영상 받기 줄이 끝난 뒤에 돈다(같은 유튜브 간격 파일을 두 프로세스가 동시에 잡으면 막힘 — 10-16 yt_extend 실측)

def community_line(site, folders, plan_dir, families, logs):
    line, fname = base.COMMUNITY[site]
    if site == 'youtube': base.status(plan_dir, line, '영상 받기 줄 끝나기 기다림'); YT_DONE.wait()
    for f in folders:
        folder = base.folder_of(f); out = folder / fname
        slow_skip = site in SLOW and f['kind'] == '대안' and not FULL[0]
        if (FULL[0] or not out.exists()) and not slow_skip:   # 깊이 채우기: 이미 받은 질의(xlsx)는 community_rows가 건너뛴다
            qs = f['queries'][:1] if (site in SLOW and not FULL[0]) else f['queries']
            if FULL[0] and site in SLOW: qs = [x for x in qs if x not in extras_of(f)]   # 느린 사이트는 기본 질의만(덧붙인 '후기·고민·없애는법'은 검색이 기본 단어로 이미 잡음)
            base.status(plan_dir, line, f"{fkey(f)} 시작 ({len(qs)}개 질의, 키워드당 글 {base.POSTS[f['kind']]}개)")
            base._tl.posts = 15 if site == 'youtube' else base.POSTS[f['kind']]   # 유튜브는 키워드당 영상 15개의 댓글
            try: v2.write(out, community_rows(f, folder, logs[f['name']], site, qs))
            except Exception as e: logs[f['name']].append({'source': site, 'error': str(e)[:200]})
        mark(line, f, plan_dir, families, logs)
    base.status(plan_dir, line, '끝')

# ── 유튜브: 받기 한 줄 + 받아쓰기 일꾼 ───────────────────────────
TQ = queue.Queue(); _flock = {}; PENDING = {}            # 폴더 키 → 받아쓰기 남은 수

def flock(k):
    with _dl: return _flock.setdefault(k, threading.Lock())

def save_rec(f, rec):
    path = base.folder_of(f) / '영상-원자료.json'
    with flock(fkey(f)):
        recs = json.loads(path.read_text(encoding='utf-8'))
        for i, r in enumerate(recs):
            if r['id'] == rec['id']: recs[i] = rec
        v2.write(path, recs)

def yt_download_line(folders, plan_dir, families, logs):
    import yt_dlp
    seen, blocks = set(), [0]
    for f in folders:
        folder = base.folder_of(f); path = folder / '영상-원자료.json'; log = logs[f['name']]
        nd, nr = YT[f['kind']]
        if path.exists(): chosen = json.loads(path.read_text(encoding='utf-8'))
        else:
            doc = f.get('yt_doctor') or [f['name'] + ' 원리']; rev = f.get('yt_review') or [f['name'] + ' 후기']
            base.status(plan_dir, '유튜브받기', f"{fkey(f)} 영상 고르기")
            chosen = base.pick_videos(doc, nd, '의사·설명', seen, log) + base.pick_videos(rev, nr, '경험·후기', seen, log)
            v2.write(path, chosen)
        if FULL[0]:   # 깊이 채우기: 이미 고른 영상이 목표(결핍 의사 20·경험 10, 대안 4·2)보다 적으면 모자란 만큼 더 고른다(yt_extend와 같은 방식)
            ids = {r['id'] for r in chosen}; seen |= ids
            have_d = sum(1 for r in chosen if str(r.get('role', '')).startswith('의사')); have_r = len(chosen) - have_d
            doc = f.get('yt_doctor') or [f['name'] + ' 원리']; rev = f.get('yt_review') or [f['name'] + ' 후기']; add = []
            if nd > have_d or nr > have_r: base.status(plan_dir, '유튜브받기', f"{fkey(f)} 영상 더 고르기")
            if nd > have_d: add += base.pick_videos(doc + [f['name'] + ' 원인', f['name'] + ' 치료'], nd - have_d, '의사·설명', seen, log)
            if nr > have_r: add += base.pick_videos(rev + [f['name'] + ' 경험'], nr - have_r, '경험·후기', seen, log)
            chosen += [r for r in add if r['id'] not in ids]
        for r in chosen:
            seen.add(r['id'])
            if '403' in str(r.get('audio_error', '')) or r.get('status') == '음성 받기 막힘':   # 낡은 받기 도구 탓이던 실패는 다시 받는다
                r.pop('status', None); r.pop('audio_error', None)
        v2.write(path, chosen)
        todo = [r for r in chosen if not r.get('transcript') and r.get('status') not in ('전사 완료', '음성/전사 미확보')]
        with _dl: PENDING[fkey(f)] = len(todo)
        base.status(plan_dir, '유튜브받기', f"{fkey(f)} 소리 받기 {len(todo)}개")
        audio = folder / '음성'; audio.mkdir(exist_ok=True)
        for rec in todo:
            if blocks[0] >= 3:
                rec['status'] = '음성 받기 세 번 막힘—다음 실행에서 이어서'; save_rec(f, rec); done_one(f, plan_dir, families, logs); continue
            try:
                got = list(audio.glob(rec['id'] + '.*'))
                if not got:
                    with yt_dlp.YoutubeDL({'quiet': True, 'no_warnings': True, 'format': 'bestaudio[ext=m4a]/bestaudio',
                                           'outtmpl': str(audio / (rec['id'] + '.%(ext)s')), 'socket_timeout': 18,
                                           'retries': 1, 'noplaylist': True}) as y:
                        with gate('youtube'): info = y.extract_info(rec['url'], download=False)
                        if info.get('duration', 0) > 1800: raise ValueError('30분 초과—짧은 설명·경험 영상 우선')
                        with gate('youtube'): y.download([rec['url']])
                    got = list(audio.glob(rec['id'] + '.*'))
                TQ.put((f, rec, str(got[0])))
            except Exception as err:
                rec['audio_error'] = str(err)[:200]
                if re.search(r'429|Too Many|Sign in to confirm', str(err), re.I):
                    blocks[0] += 1; rec['status'] = '음성 받기 막힘'
                    try: observe('youtube', 429, str(err))
                    except RuntimeError: pass
                else: rec['status'] = '음성/전사 미확보'
                save_rec(f, rec); done_one(f, plan_dir, families, logs)
        if not todo: mark('유튜브', f, plan_dir, families, logs)
    for f in folders:                                       # 결핍은 유튜브 댓글도 (커뮤니티 크롤러, 글 30개)
        if f['kind'] != '결핍' or FULL[0]: continue          # 깊이 채우기는 유튜브 댓글을 커뮤니티 줄(모든 질의)로 따로 돈다
        out = base.folder_of(f) / '유튜브댓글.json'
        if out.exists(): continue
        base.status(plan_dir, '유튜브받기', f"{f['name']} 댓글")
        base._tl.posts = 30
        try: v2.write(out, v2.community(f['name'], None, base.folder_of(f), logs[f['name']], sites='youtube'))
        except Exception as e: logs[f['name']].append({'source': '유튜브 댓글', 'error': str(e)[:200]})
    YT_DONE.set()
    base.status(plan_dir, '유튜브받기', '끝')
    TQ.put(None)

def done_one(f, plan_dir, families, logs):
    with _dl:
        PENDING[fkey(f)] = PENDING.get(fkey(f), 1) - 1; left = PENDING[fkey(f)]
    if left <= 0: mark('유튜브', f, plan_dir, families, logs)

def load_model():
    import glob, site
    for sp in site.getsitepackages():                     # pip으로 깐 엔비디아 DLL(cublas·cudnn)을 찾게 한다(윈도우)
        for b in glob.glob(os.path.join(sp, 'nvidia', '*', 'bin')):
            os.add_dll_directory(b); os.environ['PATH'] = b + os.pathsep + os.environ['PATH']
    from faster_whisper import WhisperModel
    try:
        m = WhisperModel(os.environ.get('WHISPER_SIZE', 'small'), device='cuda', compute_type='int8', local_files_only=True)  # GTX 1060에서 실시간의 약 12배
        return m, 'cuda'
    except Exception as e:
        print('그래픽카드 받아쓰기 실패 → CPU:', str(e)[:160], flush=True)
        return WhisperModel('small', device='cpu', compute_type='int8', cpu_threads=4, num_workers=3, local_files_only=True), 'cpu'

def transcribe_worker(model, device, plan_dir, families, logs):
    import ad_media, tempfile
    while True:
        item = TQ.get()
        if item is None: TQ.put(None); return
        f, rec, src = item
        try:
            with tempfile.TemporaryDirectory() as d:
                wav = os.path.join(d, 'a.wav')
                subprocess.run([ad_media.ffmpeg_exe(), '-y', '-loglevel', 'error', '-i', src, '-vn', '-ac', '1', '-ar', '16000', wav], capture_output=True)
                segs, _ = model.transcribe(wav, language='ko', vad_filter=True)
                segs = [(s.start, s.end, s.text) for s in segs]
            rec['transcript'] = ad_media.fmt_segments(segs); rec['method'] = f'음성만·로컬 faster-whisper({device})'
            rec['status'] = '전사 완료' if segs else '로컬 전사 실패'
        except Exception as e: rec['status'] = '음성/전사 미확보'; rec['audio_error'] = ('받아쓰기 ' + str(e))[:200]
        save_rec(f, rec); done_one(f, plan_dir, families, logs)

# ── 메타 광고 라이브러리 ──────────────────────────────────────
def meta_line(families, plan_dir):
    for fam in families:
        kws = list(dict.fromkeys(fam.get('meta_keywords') or []))
        if not kws: continue
        title = '결핍책-' + fam['family']; out = META / (title + '_메타광고소재')
        if (out / '_summary.json').exists(): continue
        base.status(plan_dir, '메타', f"{fam['family']} {len(kws)}개 키워드")
        r = subprocess.run([sys.executable, '-X', 'utf8', 'scrape_meta.py', '--title', title, '--keywords', ','.join(kws),
                            '--no-variants', '--pause', '7'], cwd=META, capture_output=True, text=True, encoding='utf-8', errors='replace')
        d = BOOK / '묶음' / fam['family']; d.mkdir(parents=True, exist_ok=True)
        (d / '메타-실행기록.txt').write_text(r.stdout[-20000:] + '\n' + r.stderr[-5000:], encoding='utf-8')
        v2.write(d / '메타.json', {'at': base.now(), 'returncode': r.returncode, 'output': str(out)})
    base.status(plan_dir, '메타', '끝')

# ── 계열 정리(모델 없음) ──────────────────────────────────────
ACTIVE = []; FINISHED = set(); _fin = threading.Lock()

def check_families(plan_dir, families, logs):
    for fam in families:
        if fam['family'] in FINISHED: continue
        keys = {fkey(f) for f in fam['folders']}
        with _dl: ok = all(keys <= LINES_DONE.get(l, set()) for l in ACTIVE)
        if not ok: continue
        with _fin:
            if fam['family'] in FINISHED: continue
            FINISHED.add(fam['family'])
        threading.Thread(target=finish_family, args=(fam, families, plan_dir, logs), daemon=False).start()

def finish_family(fam, families, plan_dir, logs):
    by_name = {f['name']: f for fm in families for f in fm['folders']}
    alts = [f for f in fam['folders'] if f['kind'] == '대안'] + [by_name[s] for s in fam.get('shared', []) if s in by_name]
    rows_out = []
    for f in fam['folders']:
        folder = base.folder_of(f)
        load = lambda p: json.loads(p.read_text(encoding='utf-8')) if p.exists() else []
        rows = load(folder / '공개검색-원자료.json') + load(folder / '유튜브댓글.json')
        for s_, (_, fname) in base.COMMUNITY.items():
            if s_ != 'youtube': rows += load(folder / fname)   # 유튜브댓글.json은 위에서 이미 읽음
        if f.get('reuse_v2'): rows += load(v2.OUT / f['name'] / '공개검색-원자료.json')
        rows = [r for r in rows if not str(r.get('source', '')).startswith(base.DROP)]
        vids = load(folder / '영상-원자료.json')
        if f.get('reuse_v2'): vids += [v for v in load(v2.OUT / f['name'] / '영상-원자료.json') if v.get('transcript')]
        k = json.loads((folder / '키워드.json').read_text(encoding='utf-8'))
        k2 = {**k, 'main': [{'keyword': a} for a in f['aliases']],
              'alternatives': [{'keyword': a['aliases'][0]} for a in alts] if f['kind'] == '결핍' else []}
        try:
            rec = v2.finish(f['name'], k2, rows, [], vids, logs[f['name']], folder)
            rec['target'] = base.TARGET[f['kind']]; v2.write(folder / '수집기록.json', rec)
            rows_out.append((f, rec['experience'], sum(bool(v.get('transcript')) for v in vids), len(vids)))
        except Exception as e:
            rows_out.append((f, None, 0, len(vids))); logs[f['name']].append({'source': '정리', 'error': str(e)[:200]})
    d = BOOK / '묶음' / fam['family']; d.mkdir(parents=True, exist_ok=True)
    L = ['# 수집 결과 — ' + fam['family'], '', f'만든 때: {base.now()}', '',
         '| 칸 | 이름 | 경험 단위 | 목표 | 상태 | 받아쓴 영상 |', '|---|---|---:|---:|---|---:|']
    for f, exp, tv, nv in rows_out:
        t = base.TARGET[f['kind']]
        st = '정리 실패' if exp is None else ('채움' if exp >= t else f'미완료({t - exp} 부족)')
        L.append(f"| {f['kind']} | {f['name']} | {exp if exp is not None else '-'} | {t} | {st} | {tv}/{nv} |")
    (d / '수집결과.md').write_text('\n'.join(L) + '\n', encoding='utf-8')
    v2.write(d / '_수집완료.json', {'at': base.now(), 'folders': [fkey(f) for f in fam['folders']], 'shared': fam.get('shared', [])})
    base.status(plan_dir, '정리', f"{fam['family']} 끝 — 묶음/{fam['family']}/수집결과.md")

if __name__ == '__main__':
    a = argparse.ArgumentParser(); a.add_argument('plan'); a.add_argument('--no-meta', action='store_true')
    a.add_argument('--lines', default='', help='돌릴 줄만(쉼표): naver,ytdl,youtube,dcinside,blind,natepann,mlbpark,fmkorea,ruliweb,arca,cook82,theqoo — 다른 실행이 쓰는 사이트와 겹치지 않게 나눠 돌릴 때')
    a.add_argument('--finish-only', action='store_true', help='수집 없이 모든 계열을 다시 정리만 한다(두 실행이 나눠 모은 뒤 마지막 정리)')
    args = a.parse_args()
    plan_path = Path(args.plan).resolve(); plan = json.loads(plan_path.read_text(encoding='utf-8')); plan_dir = plan_path.parent
    families = plan['families']
    base.KIN_LIMIT.update(plan['kin_limit'])
    seen, folders = set(), []
    for fam in families:
        for f in fam['folders']:
            if fkey(f) in seen: raise SystemExit('같은 폴더가 두 계열에 있음: ' + fkey(f))
            seen.add(fkey(f)); folders.append(f)
    logs = {f['name']: base.prepare(f) for f in folders}
    FULL[0] = bool(plan.get('full_depth'))
    if FULL[0]:   # 낮은 한도(25·40)로 끝난 지식인 질의는 기록에서 지워 기본 한도(100·50)까지 다시 모으게 한다(행은 정리 때 URL로 중복 제거)
        for f in folders:
            logs[f['name']] = [e for e in logs[f['name']] if not (e.get('source') == '지식인' and 'returned' in e and 15 <= e['returned'] < base.KIN_LIMIT[f['kind']])]
    for f in folders:
        if not f.get('reuse_v2'): base.reset_old_posts(f)
    if FULL[0]:
        base.COMMUNITY['youtube'] = ('유튜브댓글', '유튜브댓글.json')
        base.COMMUNITY['cook82'] = ('82쿡', '82쿡.json'); base.COMMUNITY['theqoo'] = ('더쿠', '더쿠.json')   # 여성 커뮤니티(사장님 10-16 밤)
        base.POSTS.update({'결핍': 80, '대안': 50})
        YT.update({'결핍': (20, 10), '대안': (4, 2)})   # 유튜브도 기본 깊이(사장님 10-16 '유튜브 영상을 좀 더 많이')   # 사장님 10-16 밤: 키워드당 50 → 80(대안 30 → 50)   # 깊이 채우기: 의사·경험 영상 밑 본인 경험 댓글(사장님 10-16 밤 "자료 부족하면 안 돼")
    ACTIVE[:] = ['네이버', '유튜브'] + [base.COMMUNITY[s][0] for s in base.COMMUNITY]
    sel = set(x.strip() for x in args.lines.split(',') if x.strip())
    if sel:   # 줄 나눠 돌리기(10-16 밤: 1차 수집이 아직 쓰는 사이트와 겹치지 않게)
        for s_ in [s_ for s_ in base.COMMUNITY if s_ not in sel]: base.COMMUNITY.pop(s_)
        ACTIVE[:] = (['네이버'] if 'naver' in sel else []) + (['유튜브'] if 'ytdl' in sel else []) + [base.COMMUNITY[s_][0] for s_ in base.COMMUNITY]
        if 'ytdl' not in sel: YT_DONE.set()
    if args.finish_only:
        for fam in families: finish_family(fam, families, plan_dir, logs)
        base.status(plan_dir, '전체', '정리만 끝'); raise SystemExit(0)
    model, device = load_model() if (not sel or 'ytdl' in sel) else (None, '없음(받아쓰기 줄 없음)')   # 그래픽카드 3GB — 받아쓰기 안 하는 실행은 모델을 올리지 않는다
    base.status(plan_dir, '전체', f"시작 — 계열 {len(families)}개, 폴더 {len(folders)}개, 받아쓰기 {device}")
    workers = 1 if device == 'cuda' else (3 if model else 0)
    with ThreadPoolExecutor(max_workers=4 + sum(LINES_PER_SITE.get(s_, 1) for s_ in base.COMMUNITY) + workers) as pool:
        jobs = [pool.submit(naver_line, folders, plan, plan_dir, families, logs)] if (not sel or 'naver' in sel) else []
        if not sel or 'ytdl' in sel:
            jobs.append(pool.submit(yt_line_safe, folders, plan_dir, families, logs))
            jobs += [pool.submit(transcribe_worker, model, device, plan_dir, families, logs) for _ in range(workers)]
        for s_ in base.COMMUNITY:
            n_ = LINES_PER_SITE.get(s_, 1) if FULL[0] else 1
            jobs += [pool.submit(community_line, s_, folders[i::n_], plan_dir, families, logs) for i in range(n_)]
        if not args.no_meta: jobs.append(pool.submit(meta_line, families, plan_dir))
        for j in jobs:
            try: j.result()
            except Exception as e: base.status(plan_dir, '전체', '줄 하나 실패: ' + str(e)[:200])
    for t in threading.enumerate():
        if t is not threading.current_thread() and not t.daemon: t.join()
    base.status(plan_dir, '전체', '끝')

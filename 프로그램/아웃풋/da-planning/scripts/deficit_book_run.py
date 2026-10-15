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
def naver_line(folders, plan, plan_dir, families, logs):
    for f in folders:
        folder = base.folder_of(f)
        if not f.get('reuse_v2') and not (folder / '공개검색-완료.json').exists():
            base.status(plan_dir, '네이버', f"{fkey(f)} 지식인 시작 ({len(f['queries'])}개 질의, 정렬당 {plan['kin_limit'][f['kind']]}건)")
            base._limit[0] = plan['kin_limit'][f['kind']]
            try: v2.collect_public(f['name'], f['queries'], folder, logs[f['name']])
            except Exception as e: logs[f['name']].append({'source': '네이버', 'error': str(e)[:200]})
        mark('네이버', f, plan_dir, families, logs)
    base.status(plan_dir, '네이버', '끝')

# ── 커뮤니티 일곱 곳 ─────────────────────────────────────────
# 느린 사이트(키워드 하나에 15~20분 — 2026-10-15 실측)는 결핍의 메인 키워드 하나만 돈다. 대안은 빠른 사이트·지식인·유튜브가 맡는다.
SLOW = {'dcinside', 'blind', 'natepann', 'mlbpark'}

def community_rows(f, folder, log, site, queries):
    """voice_v2.community와 같은 방식이되, 돌 질의를 정해 준다. 예전에 모은 질의 결과(키워드.json)도 함께 읽는다."""
    import voice_crawl, voice_count
    dest = folder / ('커뮤니티-' + site); dest.mkdir(exist_ok=True)
    def runner(cmd, **kw):
        return subprocess.run([cmd[0], '-X', 'utf8', str(HERE / 'voice_rate_runtime.py'), cmd[1], *cmd[2:]], timeout=1800, **kw)
    for i, q in enumerate(queries):
        part = v2.OUT / '_공유-커뮤니티' / site / voice_crawl.safe(q)
        if (dest / (voice_crawl.safe(q) + '.xlsx')).exists(): continue
        if i: time.sleep(30)
        try: voice_crawl.run([q], str(part), sites=site, max_posts=base.POSTS[f['kind']], filt='smart', runner=runner)
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

def community_line(site, folders, plan_dir, families, logs):
    line, fname = base.COMMUNITY[site]
    for f in folders:
        folder = base.folder_of(f); out = folder / fname
        slow_skip = site in SLOW and f['kind'] == '대안'
        if not out.exists() and not slow_skip:
            qs = f['queries'][:1] if site in SLOW else f['queries']
            base.status(plan_dir, line, f"{fkey(f)} 시작 ({len(qs)}개 질의, 키워드당 글 {base.POSTS[f['kind']]}개)")
            base._tl.posts = base.POSTS[f['kind']]
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
        if f['kind'] != '결핍': continue
        out = base.folder_of(f) / '유튜브댓글.json'
        if out.exists(): continue
        base.status(plan_dir, '유튜브받기', f"{f['name']} 댓글")
        base._tl.posts = 30
        try: v2.write(out, v2.community(f['name'], None, base.folder_of(f), logs[f['name']], sites='youtube'))
        except Exception as e: logs[f['name']].append({'source': '유튜브 댓글', 'error': str(e)[:200]})
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
        for _, fname in base.COMMUNITY.values(): rows += load(folder / fname)
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
    a = argparse.ArgumentParser(); a.add_argument('plan'); a.add_argument('--no-meta', action='store_true'); args = a.parse_args()
    plan_path = Path(args.plan).resolve(); plan = json.loads(plan_path.read_text(encoding='utf-8')); plan_dir = plan_path.parent
    families = plan['families']
    base.KIN_LIMIT.update(plan['kin_limit'])
    seen, folders = set(), []
    for fam in families:
        for f in fam['folders']:
            if fkey(f) in seen: raise SystemExit('같은 폴더가 두 계열에 있음: ' + fkey(f))
            seen.add(fkey(f)); folders.append(f)
    logs = {f['name']: base.prepare(f) for f in folders}
    for f in folders:
        if not f.get('reuse_v2'): base.reset_old_posts(f)
    ACTIVE[:] = ['네이버', '유튜브'] + [base.COMMUNITY[s][0] for s in base.COMMUNITY]
    model, device = load_model()
    base.status(plan_dir, '전체', f"시작 — 계열 {len(families)}개, 폴더 {len(folders)}개, 받아쓰기 {device}")
    workers = 1 if device == 'cuda' else 3
    with ThreadPoolExecutor(max_workers=4 + len(base.COMMUNITY) + workers) as pool:
        jobs = [pool.submit(naver_line, folders, plan, plan_dir, families, logs),
                pool.submit(yt_download_line, folders, plan_dir, families, logs)]
        jobs += [pool.submit(transcribe_worker, model, device, plan_dir, families, logs) for _ in range(workers)]
        jobs += [pool.submit(community_line, s, folders, plan_dir, families, logs) for s in base.COMMUNITY]
        if not args.no_meta: jobs.append(pool.submit(meta_line, families, plan_dir))
        for j in jobs:
            try: j.result()
            except Exception as e: base.status(plan_dir, '전체', '줄 하나 실패: ' + str(e)[:200])
    for t in threading.enumerate():
        if t is not threading.current_thread() and not t.daemon: t.join()
    base.status(plan_dir, '전체', '끝')

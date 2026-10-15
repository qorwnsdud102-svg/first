"""결핍 책 수집기 — 한 계열(묶음)의 결핍·대안을 사이트별 한 줄씩 병렬로 모은다.

사장님 근거: P6517(호출 제한 안에서 병렬), P6524~P6529(결핍 책, 비슷한 결핍은 묶어 중복 크롤링 안 함).
사용: python deficit_book_collect.py <수집계획.json> [--smoke] [--no-meta]

- 줄 네 개를 동시에 돌린다: 네이버(카페·블로그·지식인 공개 검색), 커뮤니티(네이트판), 유튜브(영상 받아쓰기, 결핍은 댓글도), 메타 광고 라이브러리.
- 사이트 간격과 차단 휴식(30분)은 voice_rate.gate가 프로세스를 넘어 지킨다. 막히면 기다릴 뿐 우회하지 않는다.
- 이미 모은 폴더·질의는 건너뛴다. 같은 계열의 대안은 결핍책/대안/<대안>/에 한 번만 모은다.
- 블로그는 검색 미리보기만 쓴다(본문 열기 생략 — 네이버 한 줄의 시간 절약).
- 모델은 부르지 않는다. 분류·정리는 다음 단계(Haiku·Sonnet)에서 한다.
"""
import argparse, datetime, json, os, re, subprocess, sys, threading, time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

os.environ['CRAWL_HEADLESS'] = '1'; os.environ['PYTHONUTF8'] = '1'; os.environ['PYTHONIOENCODING'] = 'utf-8'
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import voice_v2 as v2
from voice_rate import gate, observe

ROOT = Path('C:/claude/LLM-WIKI')
BOOK = ROOT / '마케팅/프로젝트/DA-기획/결핍책'
META = Path('C:/claude/네이버 급상승 키워드 기반 경쟁사 발굴/scripts')
TARGET = {'결핍': 1500, '대안': 300}

_orig_details = v2.details
def _details(row, cache, log):
    if 'blog.naver.com' in row['url']:
        return {**row, 'detail_status': '블로그는 미리보기만(본문 열기 생략)'}
    return _orig_details(row, cache, log)
v2.details = _details

_lock = threading.Lock()
def now(): return datetime.datetime.now().astimezone().isoformat()

def status(plan_dir, line, msg):
    with _lock:
        p = plan_dir / '_진행.json'
        d = json.loads(p.read_text(encoding='utf-8')) if p.exists() else {}
        d[line] = {'at': now(), 'msg': msg}
        v2.write(p, d)
    print(line, '|', msg, flush=True)

def folder_of(f): return BOOK / f['kind'] / f['name']

def prepare(f):
    folder = folder_of(f); folder.mkdir(parents=True, exist_ok=True)
    p = folder / '키워드.json'
    if not p.exists():
        v2.write(p, {'need': f['name'], 'kind': f['kind'], 'encoding': 'UTF-8', 'aliases': f['aliases'],
                     'main': [{'keyword': q} for q in f['queries']], 'alternatives': []})
    mid = folder / '수집-중간.json'
    return json.loads(mid.read_text(encoding='utf-8')) if mid.exists() else []

# ── 네이버 한 줄 ─────────────────────────────────────────────
def naver_line(plan, plan_dir, logs):
    for f in plan['folders']:
        folder = folder_of(f)
        if (folder / '공개검색-완료.json').exists(): continue
        status(plan_dir, '네이버', f"{f['kind']}/{f['name']} 시작 ({len(f['queries'])}개 질의)")
        try: v2.collect_public(f['name'], f['queries'], folder, logs[f['name']])
        except Exception as e: logs[f['name']].append({'source': '네이버', 'error': str(e)[:200]})
    status(plan_dir, '네이버', '끝')

# ── 커뮤니티(네이트판) 한 줄 ───────────────────────────────────
def community_line(plan, plan_dir, logs):
    for f in plan['folders']:
        folder = folder_of(f); out = folder / '커뮤니티.json'
        if out.exists(): continue
        status(plan_dir, '커뮤니티', f"{f['kind']}/{f['name']} 시작")
        try: v2.write(out, v2.community(f['name'], None, folder, logs[f['name']], sites='natepann'))
        except Exception as e: logs[f['name']].append({'source': '네이트판', 'error': str(e)[:200]})
    status(plan_dir, '커뮤니티', '끝')

# ── 유튜브 한 줄 ─────────────────────────────────────────────
def pick_videos(queries, n, role, seen, log):
    import yt_dlp
    opts = {'quiet': True, 'no_warnings': True, 'extract_flat': True, 'skip_download': True, 'socket_timeout': 18, 'retries': 0}
    out = []
    for q in queries:
        try:
            with gate('youtube'), yt_dlp.YoutubeDL(opts) as y:
                info = y.extract_info(f'ytsearch{n + 5}:{q}', download=False)
            for e in info.get('entries', []):
                vid = (e or {}).get('id', '')
                if re.fullmatch(r'[A-Za-z0-9_-]{11}', vid) and vid not in seen:
                    seen.add(vid)
                    out.append({'id': vid, 'title': e.get('title', ''), 'url': 'https://www.youtube.com/watch?v=' + vid,
                                'selection_query': q, 'role': role, 'channel': e.get('channel') or e.get('uploader') or ''})
                if len(out) >= n: return out
        except Exception as err: log.append({'source': '유튜브 검색', 'query': q, 'error': str(err)[:200]})
    return out

def transcribe_all(chosen, folder, log, path, blocks):
    import yt_dlp
    from youtube_transcript_api import YouTubeTranscriptApi
    import ad_media
    for rec in chosen:
        if rec.get('transcript') or rec.get('status'): continue
        if blocks[0] >= 2: rec['status'] = '유튜브 차단 두 번—이번 실행에서는 더 묻지 않음'; continue
        try:
            with gate('youtube'): fetched = YouTubeTranscriptApi().fetch(rec['id'], languages=['ko', 'en'])
            rec['transcript'] = '\n'.join(x.text for x in fetched); rec['method'] = '공개 자막'
        except Exception as e:
            rec['subtitle_error'] = str(e)[:180]
            if re.search(r'IpBlocked|429|RequestBlocked|bot', str(e), re.I):
                blocks[0] += 1
                try: observe('youtube', 429, str(e))   # 30분 휴식을 저장한다(다음 gate가 기다림)
                except RuntimeError: pass
                continue
            try:
                audio = folder / '음성'; audio.mkdir(exist_ok=True)
                with yt_dlp.YoutubeDL({'quiet': True, 'no_warnings': True, 'format': 'bestaudio[ext=m4a]/bestaudio',
                                       'outtmpl': str(audio / (rec['id'] + '.%(ext)s')), 'socket_timeout': 18,
                                       'retries': 0, 'noplaylist': True}) as y:
                    with gate('youtube'): info = y.extract_info(rec['url'], download=False)
                    if info.get('duration', 0) > 1800: raise ValueError('30분 초과—짧은 설명·경험 영상 우선')
                    with gate('youtube'): y.download([rec['url']])
                f = next(audio.glob(rec['id'] + '.*')); segs = ad_media.transcribe(str(f))
                rec['transcript'] = ad_media.fmt_segments(segs); rec['method'] = '음성만·로컬 faster-whisper'
                rec['status'] = '전사 완료' if segs else '로컬 전사 실패'
            except Exception as err: rec['status'] = '음성/전사 미확보'; rec['audio_error'] = str(err)[:200]
        v2.write(path, chosen)
    v2.write(path, chosen)

def youtube_line(plan, plan_dir, logs):
    alt = plan['alt_youtube']; seen = set(); blocks = [0]
    for f in plan['folders']:
        folder = folder_of(f); path = folder / '영상-원자료.json'; log = logs[f['name']]
        chosen = json.loads(path.read_text(encoding='utf-8')) if path.exists() else None
        if chosen is None:
            if f['kind'] == '결핍':
                doc, rev, nd, nr = f['yt_doctor'], f['yt_review'], f['n_doctor'], f['n_review']
            else:
                doc, rev, nd, nr = [f['name'] + alt['doctor_suffix']], [f['name'] + alt['review_suffix']], alt['n_doctor'], alt['n_review']
            status(plan_dir, '유튜브', f"{f['kind']}/{f['name']} 영상 고르기")
            chosen = pick_videos(doc, nd, '의사·설명', seen, log) + pick_videos(rev, nr, '경험·후기', seen, log)
            v2.write(path, chosen)
        status(plan_dir, '유튜브', f"{f['kind']}/{f['name']} 받아쓰기 {len(chosen)}개")
        transcribe_all(chosen, folder, log, path, blocks)
    for f in plan['folders']:
        if not f.get('comments'): continue
        folder = folder_of(f); out = folder / '유튜브댓글.json'
        if out.exists(): continue
        status(plan_dir, '유튜브', f"{f['name']} 댓글")
        try: v2.write(out, v2.community(f['name'], None, folder, logs[f['name']], sites='youtube'))
        except Exception as e: logs[f['name']].append({'source': '유튜브 댓글', 'error': str(e)[:200]})
    status(plan_dir, '유튜브', '끝')

# ── 메타 광고 라이브러리 한 줄 ─────────────────────────────────
def meta_line(plan, plan_dir):
    title = '결핍책-' + plan['family']; out = META / (title + '_메타광고소재')
    if (out / '_summary.json').exists():
        status(plan_dir, '메타', '이미 있음—건너뜀'); return
    status(plan_dir, '메타', f"{len(plan['meta_keywords'])}개 키워드 시작")
    r = subprocess.run([sys.executable, '-X', 'utf8', 'scrape_meta.py', '--title', title, '--keywords', ','.join(plan['meta_keywords']),
                        '--no-variants', '--pause', '7'], cwd=META, capture_output=True, text=True, encoding='utf-8', errors='replace')
    (plan_dir / '메타-실행기록.txt').write_text(r.stdout[-20000:] + '\n' + r.stderr[-5000:], encoding='utf-8')
    v2.write(plan_dir / '메타.json', {'at': now(), 'returncode': r.returncode, 'output': str(out)})
    status(plan_dir, '메타', f'끝 (returncode {r.returncode})')

# ── 정리(모델 없음) ──────────────────────────────────────────
def finish_all(plan, plan_dir, logs):
    alts = [x for x in plan['folders'] if x['kind'] == '대안']
    rows_out = []
    for f in plan['folders']:
        folder = folder_of(f)
        load = lambda n: json.loads((folder / n).read_text(encoding='utf-8')) if (folder / n).exists() else []
        rows = load('공개검색-원자료.json') + load('커뮤니티.json') + load('유튜브댓글.json')
        vids = load('영상-원자료.json')
        k = json.loads((folder / '키워드.json').read_text(encoding='utf-8'))
        k2 = {**k, 'main': [{'keyword': a} for a in f['aliases']],
              'alternatives': [{'keyword': a['aliases'][0]} for a in alts] if f['kind'] == '결핍' else []}
        try:
            rec = v2.finish(f['name'], k2, rows, [], vids, logs[f['name']], folder)
            rec['target'] = TARGET[f['kind']]; v2.write(folder / '수집기록.json', rec)
            rows_out.append((f, rec['experience'], rec['units'], sum(bool(v.get('transcript')) for v in vids), len(vids)))
        except Exception as e:
            rows_out.append((f, None, None, 0, len(vids))); logs[f['name']].append({'source': '정리', 'error': str(e)[:200]})
    L = ['# 수집 결과 — ' + plan['family'], '', f'만든 때: {now()}', '',
         '| 칸 | 이름 | 경험 단위 | 목표 | 상태 | 받아쓴 영상 |', '|---|---|---:|---:|---|---:|']
    for f, exp, units, tv, nv in rows_out:
        t = TARGET[f['kind']]
        st = '정리 실패' if exp is None else ('채움' if exp >= t else f'미완료({t - exp} 부족)')
        L.append(f"| {f['kind']} | {f['name']} | {exp if exp is not None else '-'} | {t} | {st} | {tv}/{nv} |")
    (plan_dir / '수집결과.md').write_text('\n'.join(L) + '\n', encoding='utf-8')
    status(plan_dir, '정리', '끝 — 수집결과.md')

def smoke(plan):
    f = plan['folders'][0]; log = []
    rows = v2.public_search(f['queries'][0], '지식인', '관련도', log)
    vids = pick_videos(f.get('yt_doctor', [f['name']]), 1, '의사·설명', set(), log)
    print('smoke 지식인', len(rows), '| 영상', [(v['title'][:30], v['channel']) for v in vids], '| log', log[-2:], flush=True)

if __name__ == '__main__':
    a = argparse.ArgumentParser(); a.add_argument('plan'); a.add_argument('--smoke', action='store_true'); a.add_argument('--no-meta', action='store_true')
    args = a.parse_args()
    plan_path = Path(args.plan).resolve(); plan = json.loads(plan_path.read_text(encoding='utf-8')); plan_dir = plan_path.parent
    if args.smoke: smoke(plan); sys.exit(0)
    logs = {f['name']: prepare(f) for f in plan['folders']}
    status(plan_dir, '전체', f"시작 — 폴더 {len(plan['folders'])}개")
    with ThreadPoolExecutor(max_workers=4) as pool:
        jobs = [pool.submit(naver_line, plan, plan_dir, logs), pool.submit(community_line, plan, plan_dir, logs),
                pool.submit(youtube_line, plan, plan_dir, logs)]
        if not args.no_meta: jobs.append(pool.submit(meta_line, plan, plan_dir))
        for j in jobs:
            try: j.result()
            except Exception as e: status(plan_dir, '전체', '줄 하나 실패: ' + str(e)[:200])
    finish_all(plan, plan_dir, logs)
    status(plan_dir, '전체', '끝')

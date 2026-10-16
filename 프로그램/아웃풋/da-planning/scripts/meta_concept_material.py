# -*- coding: utf-8 -*-
"""결핍별 메타 판매 컨셉 재료 — 상위 판매처의 광고 문구(오래 돈 순)와 영상 받아쓰기를 묶는다(모델 없음).
사장님 2026-10-16: "메타 영상 소재와, 메타에서 판매하는 제품을 대부분 분석해 어떤 컨셉으로 판매하고있는지도 결핍마다 적어놓고싶은데".
- 광고는 이미 모아 둔 *_메타광고소재/<키워드>/_ads.json을 쓴다(다시 긁지 않는다). 형식이 둘이다:
  ① ad_texts(문자열, '라이브러리 ID: …') + ad_links  ② media(광고 레코드: id·video_urls·days_running) + videos/<광고ID>.mp4
- 판매처 = 광고 링크 도메인(병원·한의원·앱·블로그·SNS는 뺀다 — 제품 컨셉이 아님). 광고 수 순 상위 12곳, 판매처마다 서로 다른 문구 3개.
- 영상: videos/<광고ID>.mp4나 _영상/<광고ID>.mp4가 있으면 ad_media.transcribe(이 PC)로 받아쓴다(<ID>.음성.txt로 남겨 다시 씀).
  없으면 '영상 받을 광고 ID'로 적어 둔다(fetch_ad_video.py로 나중에 받음 — 메타는 한 번에 한 줄).
- 출력: 결핍책/메타판매처/<결핍>-소재.md (Sonnet이 이것만 읽고 <결핍>-컨셉.md를 쓴다), <결핍>-영상ID.txt
사용: python meta_concept_material.py <결핍→키워드 json> [결핍 ...]"""
import ast, collections, datetime, glob, json, os, re, sys
from urllib.parse import urlparse
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import ad_media
META = r"C:\claude\네이버 급상승 키워드 기반 경쟁사 발굴\scripts"
OUT = r"C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획\결핍책\메타판매처"
VID = os.path.join(OUT, '_영상')
SKIP = ('facebook.com', 'instagram.com', 'fb.me', 'naver.me', 'bit.ly', 'linktr.ee', 'kakao', 'play.google.com', 'apps.apple.com',
        'blog.naver.com', 'youtube.com', 'cloudfront.net',
        'drama', 'netshort', 'lightreader', 'webfic', 'novelstream', 'reelshort', 'shortmax', 'goodshort', 'flextv', 'vigloo', 'dmmbpnyy')   # 숏드라마·웹소설 앱 광고(10-16 무좀 작성자가 찾음)
CLINIC = re.compile(r'clinic|한의원|의원|피부과|병원|성형|언니', re.I)
TOP, TEXTS = 12, 3
MAPV = True   # 옛 형식 광고의 영상 짝짓기(길이 맞추기). meta_anatomy는 끈다
TODAY = datetime.date(2026, 10, 16)

def dom(u):
    return urlparse(u).netloc.lower().replace('www.', '').replace('m.', '', 1) if str(u).startswith('http') else ''

def as_list(v):
    if isinstance(v, list): return v
    try: return ast.literal_eval(v) if isinstance(v, str) and v.startswith('[') else []
    except Exception: return []

def parse_text(t):
    aid = (re.search(r'라이브러리 ID: (\d+)', t) or [None, None])[1]
    s = re.search(r'(\d{4})\. (\d{1,2})\. (\d{1,2})\.에 게재 시작함', t)
    days = (TODAY - datetime.date(int(s[1]), int(s[2]), int(s[3]))).days if s else 0
    page = (re.search(r'세부 사항 보기\n(.+?)\n', t) or re.search(r'게재 시작함\n(?:.*\n){0,6}?(.+?)\n광고\n', t) or [None, ''])[1]
    body = re.sub(r'\s+', ' ', t.split('광고\n', 1)[-1]).strip()
    return aid, days, (page or '').strip(), body

_FF = None
def dur(p):
    global _FF
    _FF = _FF or ad_media.ffmpeg_exe()
    try: return ad_media.duration(_FF, p)
    except Exception: return None

def map_videos(folder, texts):
    """옛 형식(media = videos/001.mp4…, 광고 ID 없음): 광고 문구의 '0:00 / 0:34'(영상 길이)와 파일 길이를 순서대로 맞춰 광고 ID ↔ 영상을 짝짓는다.
    광고 순서와 파일 순서가 같다고 보고, 길이가 1.5초 안으로 맞을 때만 짝짓는다(못 맞추면 건너뜀)."""
    vids = sorted(glob.glob(os.path.join(folder, 'videos', '*.mp4')))
    if not vids: return {}
    want = []
    for t in texts:
        m = re.search(r'0:00 / (\d+):(\d\d)', t); aid = (re.search(r'라이브러리 ID: (\d+)', t) or [None, None])[1]
        if m and aid: want.append((aid, int(m[1]) * 60 + int(m[2])))
    out, j = {}, 0
    durs = {}
    # 10-16 고침: 1.5초·6칸 창은 짝이 자주 틀렸다(기미·부유방 작성자: 음성이 문구와 다른 제품). 0.6초 안, 4칸 창, 창 안에 비슷한 길이가 둘 이상이면 짝짓지 않는다.
    for aid, sec in want:
        cand = []
        for k in range(j, min(len(vids), j + 4)):
            if vids[k] not in durs: durs[vids[k]] = dur(vids[k])
            d = durs[vids[k]]
            if d is not None and abs(d - sec) <= 1.5: cand.append((abs(d - sec), k))
        if len(cand) == 1 and cand[0][0] <= 0.6:
            k = cand[0][1]; out[aid] = vids[k]; j = k + 1
    return out

def collect(kws):
    ads = {}   # aid -> dict(days, page, body, links, video)
    for kw in kws:
        for f in glob.glob(os.path.join(META, '*_메타광고소재', kw, '_ads.json')):
            try: d = json.load(open(f, encoding='utf-8'))
            except Exception: continue
            if not isinstance(d, dict): continue
            folder = os.path.dirname(f)
            links = {x['id']: x.get('links', []) for x in d.get('ad_links', []) if isinstance(x, dict) and x.get('id')}
            texts = [t for t in (d.get('ad_texts', []) or []) if isinstance(t, str)]
            vmap = map_videos(folder, texts) if MAPV else {}
            for t in texts:
                aid, days, page, body = parse_text(t)
                if aid and aid not in ads: ads[aid] = {'days': days, 'page': page, 'body': body, 'links': links.get(aid, []), 'video': vmap.get(aid, ''), 'guess': aid in vmap}
                elif aid and not ads[aid]['video'] and aid in vmap: ads[aid]['video'] = vmap[aid]; ads[aid]['guess'] = True
            for m in d.get('media', []) or []:
                if isinstance(m, dict) and m.get('id'):
                    aid = str(m['id']); mp4 = os.path.join(folder, 'videos', f'{aid}.mp4')
                    a = ads.setdefault(aid, {'days': int(m.get('days_running') or 0), 'page': m.get('page_name') or '',
                                             'body': re.sub(r'\s+', ' ', str(m.get('body') or '')), 'links': as_list(m.get('link_urls')), 'video': ''})
                    if m.get('display_format') == 'VIDEO' and os.path.exists(mp4): a['video'] = mp4
    for aid, a in ads.items():
        p = os.path.join(VID, f'{aid}.mp4')
        if not a['video'] and os.path.exists(p): a['video'] = p
    return ads

def seller(a):
    for u in a['links']:
        d = dom(u)
        if d and not any(s in d for s in SKIP): return d, u.split('?')[0]
    return '', ''

def asr(mp4):
    cache = mp4[:-4] + '.음성.txt'
    if os.path.exists(cache): return open(cache, encoding='utf-8').read()
    text = ad_media.fmt_segments(ad_media.transcribe(mp4)); open(cache, 'w', encoding='utf-8').write(text); return text

def one(need, kws):
    ads = collect(kws)
    groups = collections.defaultdict(list)
    for aid, a in ads.items():
        d, link = seller(a)
        if not d or CLINIC.search(d) or CLINIC.search(a['page']): continue
        groups[d].append((aid, a, link))
    rank = sorted(groups.items(), key=lambda kv: (-len(kv[1]), -max(x[1]['days'] for x in kv[1])))[:TOP]
    L = [f'# {need} — 메타 판매처 소재 재료 (모델 없음)', '',
         f'키워드: {", ".join(kws)} · 광고 {len(ads)}개 · 제품 판매처 {len(groups)}곳 중 광고 수 상위 {len(rank)}곳 · 판매처마다 서로 다른 문구 {TEXTS}개(오래 돈 순)', '']
    want, n_vid = [], 0
    for d, items in rank:
        items.sort(key=lambda x: (not x[1]['video'], -x[1]['days']))   # 영상 있는 소재 먼저(사장님 10-16 '메타 영상 더 많이'), 그다음 오래 돈 순
        link = next((x[2] for x in items if x[2]), '')
        L += [f'## {d} — {items[0][1]["page"]}', f'- 광고 {len(items)}개 · 최장 게재 {max(x[1]["days"] for x in items)}일 · 링크 {link}', '']
        heads, k = set(), 0
        for aid, a, _ in items:
            head = re.sub(r'\W', '', a['body'])[:40]
            if not head or head in heads: continue
            heads.add(head); k += 1
            L += [f'### 소재 {aid} · {a["days"]}일 게재', '- 문구: ' + a['body'][:500]]
            if a['video']:
                n_vid += 1; L += ['- 영상 음성(받아쓰기' + (' · 영상 길이로 짝지은 추정 — 문구와 다른 제품을 말하면 짝이 틀림' if a.get('guess') else '') + '):', asr(a['video'])[:1500] or '(음성 없음·음악만)']
            elif k == 1:
                want.append(aid)
            L.append('')
            if k >= TEXTS: break
    os.makedirs(OUT, exist_ok=True)
    open(os.path.join(OUT, f'{need}-소재.md'), 'w', encoding='utf-8').write('\n'.join(L) + '\n')
    open(os.path.join(OUT, f'{need}-영상ID.txt'), 'w', encoding='utf-8').write(','.join(want))
    print(need, '광고', len(ads), '판매처', len(rank), '받아쓴 영상', n_vid, '받을 영상', len(want), flush=True)

if __name__ == '__main__':
    need_kw = json.load(open(sys.argv[1], encoding='utf-8'))
    for need, kws in need_kw.items():
        if sys.argv[2:] and need not in sys.argv[2:]: continue
        try: one(need, kws)
        except Exception as e: print(need, '실패', str(e)[:150], flush=True)

# 결핍 카드 시험: 유튜브 상위 영상 자막에서 증상·해결 행동 언급 비중(영상 기준)
# 사용: python yt_card.py "주사피부염,주사피부염 증상" ../references/결핍사전/주사피부염.json
import requests, re, sys, json, urllib.parse
from youtube_transcript_api import YouTubeTranscriptApi
H = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36', 'Accept-Language': 'ko-KR,ko;q=0.9'}
def search(q):
    r = requests.get('https://www.youtube.com/results?search_query=' + urllib.parse.quote(q), headers=H, timeout=20)
    out = []
    for m in re.finditer(r'"videoRenderer":\{"videoId":"([\w-]{11})".{0,600}?"title":\{"runs":\[\{"text":"([^"]+)"', r.text):
        if m.group(1) not in [x[0] for x in out]: out.append((m.group(1), m.group(2)))
    return out
qs = sys.argv[1].split(',')
groups = json.loads(open(sys.argv[2], encoding='utf-8').read())
vids = []
for q in qs:
    for v in search(q):
        if v[0] not in [x[0] for x in vids]: vids.append(v)
api = YouTubeTranscriptApi(); docs = []
for vid, title in vids[:30]:
    try:
        txt = ' '.join(s.text for s in api.fetch(vid, languages=['ko']))
        docs.append((vid, title, txt))
    except Exception: pass
print(f'검색어 {qs} · 영상 {len(vids)}개 중 자막 {len(docs)}개')
for kind in ('증상', '해결'):
    print(f'\n[{kind}] 언급한 영상 수 / {len(docs)}')
    rows = []
    for name, kws in groups[kind].items():
        n = sum(1 for _, _, t in docs if any(k in t for k in kws))
        rows.append((n, name))
    for n, name in sorted(rows, reverse=True): print(f'  {name}: {n} ({n*100//max(1,len(docs))}%)')
print('\n영상:'); [print(' ', v, t[:60]) for v, t, _ in docs]

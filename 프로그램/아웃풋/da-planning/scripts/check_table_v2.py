"""새 방식 2단계 확인표(현행판) — 후보 상징마다 스크립트가 잰 값을 붙인다. 모델 없음.
사장님 P6546: "하수오 샴푸를 생각했으면, 구글, 쿠팡등에 검색해서 하수오 샴푸 파는지 봐도 좋을듯"
- 네이버 월 검색량(상징 이름) — 타겟이 아는가
- 매대 비율 — 이 결핍 메타 광고 문구에 그 상징이 나온 비율(결핍 책 시장 지도와 같은 자료)
- '상징+제형' 네이버 블로그·웹 문서 수 — 이미 흔히 파는/말하는 조합인가(쿠팡 검색은 막힐 때가 많아 보조 지표로 쓴다)
사용: python check_table_v2.py <후보.json> <출력.md>
  후보.json = {"<결핍>": [{"symbol": "...", "form": "앰플"}, ...]}"""
import json, re, subprocess, sys, time
from pathlib import Path
import requests
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import deficit_book_prep as prep
sys.path.insert(0, r'C:\claude\네이버 급상승 키워드 기반 경쟁사 발굴\scripts')
import config

def clean(s): return re.sub(r'\(.*?\)|\[.*?\]', '', s).strip()

def volumes(words):
    out = subprocess.run([sys.executable, '-X', 'utf8', str(HERE / 'naver_kw.py'), *words, '--rel', '0'], capture_output=True, text=True, encoding='utf-8').stdout
    v = {}
    for line in out.splitlines():
        m = re.match(r'- (.+?): ([\d,]+) / ([\d,]+) / ([\d,]+) / ', line)
        if m: v[m.group(1)] = int(m.group(4).replace(',', ''))
    return v

def doc_count(auth, q, ep):
    try:
        r = requests.get(f'https://openapi.naver.com/v1/search/{ep}.json', params={'query': q, 'display': 1}, headers=auth.search_headers(), timeout=10)
        return r.json().get('total') if r.status_code == 200 else None
    except Exception: return None

def main(cand_path, out_path):
    cands = json.loads(Path(cand_path).read_text(encoding='utf-8')); auth = config.NaverAuth()
    kwmap = json.loads((prep.BOOK / '메타판매처' / '_키워드.json').read_text(encoding='utf-8'))
    L = ['# 확인표 — 스크립트가 잰 값', '', '- 검색량: 네이버 검색광고 월간 PC+모바일(정확 일치, 띄어쓰기 없앰).',
         '- 매대: 이 결핍 메타 광고 문구 중 그 상징 이름이 나온 비율. 0은 못 봤다는 뜻이지 없다는 뜻이 아니다.',
         '- 쿠팡 "상징+제형"(예: 하수오 샴푸): 쿠팡 검색 결과 상위 제품 수·후기 수. Claude가 브라우저로 채운다(쿠팡이 막혀 있으면 확인 대기).', '']
    for need, items in cands.items():
        texts = prep.meta_texts(kwmap.get(need, [need]) + [need]); n = len(texts) or 1
        names = [clean(x['symbol']).replace(' ', '') for x in items]
        vol = volumes(sorted(set(names)))
        L += [f'## {need} (메타 광고 {len(texts)}개)', '', '| 후보 | 검색량 | 매대 % | 쿠팡 "상징+제형" |', '|---|---:|---:|---|']
        for x, nm in zip(items, names):
            hits = sum(nm in t.replace(' ', '') for t in texts)
            cp = x.get('coupang', '확인 대기')
            L.append(f"| {x['symbol']} ({x.get('form','')}) | {vol.get(nm, '없음') if not isinstance(vol.get(nm), int) else f'{vol[nm]:,}'} | {round(100*hits/n,1)} | {cp} |")
        L.append('')
    Path(out_path).write_text('\n'.join(L), encoding='utf-8'); print('\n'.join(L))

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])

# -*- coding: utf-8 -*-
"""메타 한 줄 — 주말 동안 메타 광고 라이브러리 일을 한 줄로 천천히 돌린다(사장님 10-17 "메타 영상 받아쓰기", "메타 잘린 키워드 다시 모으기", 새 결핍 17개).
메타는 사이트 하나라 한 줄만 쓴다. 제한 신호([RATE LIMIT]·카드 0개 연속)면 40분 쉬고 이어 간다(우회하지 않음).
  1) 새 결핍 17개: 메타 광고 모으기(scrape_meta) → 소재 재료(meta_concept_material) → 상세페이지 해부 재료(meta_anatomy)
  2) 결핍마다: '영상 받을 광고 ID'를 광고 ID로 받기(fetch_ad_video, ID 사이 40초) → 소재 재료 다시(받아쓰기 들어감)
     결핍 사이사이에 잘린 키워드(첫 화면만 받은 것) 3개씩 다시 모으기
진행은 결핍책/묶음/_메타줄.json(끝낸 일 목록)에 남겨 다시 띄우면 이어 간다. 기록: _메타줄.log
사용: python meta_weekend_line.py"""
import glob, json, os, subprocess, sys, time, datetime
from pathlib import Path
HERE = Path(__file__).resolve().parent
META = Path(r'C:\claude\네이버 급상승 키워드 기반 경쟁사 발굴\scripts')
K = Path(r'C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획\결핍책')
OUT = K / '메타판매처'; VID = OUT / '_영상'
STATE = K / '묶음' / '_메타줄.json'; LOG = K / '묶음' / '_메타줄.log'
REST = 40 * 60          # 제한 신호 뒤 쉬는 시간
ID_GAP = 40             # 광고 ID 하나 받고 다음까지
NEW17 = ['액취증', '노인냄새', '발뒤꿈치각질', '손발톱갈라짐', '다리붓기', '민감부위착색', '눈밑지방', '누런이', '시린이',
         '혈당', '콜레스테롤', '혈압', '기억력', '빈혈', '거북목', '과민성대장', '치질']

def log(msg):
    line = f"{datetime.datetime.now():%m-%d %H:%M} {msg}"
    print(line, flush=True); open(LOG, 'a', encoding='utf-8').write(line + '\n')

def state():
    return json.loads(STATE.read_text(encoding='utf-8')) if STATE.exists() else {'done': []}

def mark(key):
    s = state(); s['done'].append(key); STATE.write_text(json.dumps(s, ensure_ascii=False, indent=1), encoding='utf-8')

def kwmap():
    m = {}
    for name in ('_키워드.json', '_키워드-추가.json', '_키워드-추가2.json', '_키워드-추가3.json'):
        p = OUT / name
        if p.exists(): m.update(json.loads(p.read_text(encoding='utf-8')))
    m.setdefault('건선', ['건선', '건선 크림', '두피 건선'])
    m.pop('허리디스크', None)
    return m

def run(args, cwd, timeout=7200):
    r = subprocess.run([sys.executable, '-X', 'utf8', *args], cwd=str(cwd), capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=timeout)
    return (r.stdout or '') + (r.stderr or '')

def scrape(title, kws):
    out = run(['scrape_meta.py', '--title', title, '--keywords', ','.join(kws), '--no-variants', '--pause', '7'], META)
    limited = '[RATE LIMIT]' in out
    log(f"메타 모으기 {title} {kws}" + (" — 제한 신호" if limited else ""))
    if limited: log(f"40분 쉼"); time.sleep(REST)
    return limited

def material(need, kwjson):
    out = run([str(HERE / 'meta_concept_material.py'), str(kwjson), need], HERE, timeout=10800)
    log(f"소재 재료 {need}: {out.strip().splitlines()[-1][:120] if out.strip() else '출력 없음'}")

def anatomy(need, kwjson):
    out = run([str(HERE / 'meta_anatomy.py'), str(kwjson), need], HERE, timeout=5400)
    log(f"해부 재료 {need}: {out.strip().splitlines()[-1][:120] if out.strip() else '출력 없음'}")

def videos(need):
    sys.path.insert(0, str(META)); import fetch_ad_video as fav
    ids = []
    for suf in ('-영상ID.txt', '-해부영상ID.txt'):
        p = OUT / f'{need}{suf}'
        if p.exists(): ids += [x.strip() for x in p.read_text(encoding='utf-8').replace('\n', ',').split(',') if x.strip().isdigit()]
    ids = [i for i in dict.fromkeys(ids) if not (VID / f'{i}.mp4').exists()]
    got, empty = 0, 0
    for lid in ids:
        r = fav.fetch([lid], VID)[0]
        if r.get('file'): got += 1; empty = 0
        elif r.get('error') == fav.NO_CARDS:
            empty += 1
            if empty >= 3: log(f"영상 {need}: 카드 0개 3번 연속 — 40분 쉼"); time.sleep(REST); empty = 0
        time.sleep(ID_GAP)
    log(f"영상 {need}: 받음 {got}/{len(ids)}")
    return got

def truncated_kws():
    seen = {}
    for f in glob.glob(str(META / '*_메타광고소재' / '*' / '_ads.json')):
        try: d = json.load(open(f, encoding='utf-8'))
        except Exception: continue
        if not isinstance(d, dict): continue
        kw = Path(f).parent.name
        seen[kw] = seen.get(kw, True) and bool(d.get('truncated'))   # 한 벌이라도 온전하면 다시 안 모음
    return [k for k, t in seen.items() if t]

def main():
    km = kwmap(); kwjson = K / '묶음' / '_메타줄-키워드.json'
    kwjson.write_text(json.dumps(km, ensure_ascii=False, indent=1), encoding='utf-8')
    done = set(state()['done'])
    log(f"시작 — 결핍 {len(km)}개, 새 결핍 {len(NEW17)}개")
    for need in NEW17:   # 1) 새 결핍 17개
        if f'new:{need}' in done or need not in km: continue
        scrape(f'결핍책-새17-{need}', km[need]); material(need, kwjson); anatomy(need, kwjson); mark(f'new:{need}')
    trunc = [k for k in truncated_kws() if f'trunc:{k}' not in done]
    log(f"잘린 키워드 남음 {len(trunc)}")
    for need in km:      # 2) 결핍마다 영상 → 소재 재료 다시, 사이사이 잘린 키워드 3개
        if f'vid:{need}' not in done:
            if videos(need): material(need, kwjson)
            mark(f'vid:{need}')
        batch, trunc = trunc[:3], trunc[3:]
        if batch:
            scrape(f'결핍책-재수집-{datetime.date.today():%m%d}', batch)
            for k in batch: mark(f'trunc:{k}')
    for i in range(0, len(trunc), 3):   # 남은 잘린 키워드
        b = trunc[i:i + 3]; scrape(f'결핍책-재수집-{datetime.date.today():%m%d}', b)
        for k in b: mark(f'trunc:{k}')
    for need in km:   # 잘린 키워드를 다시 모은 만큼 소재 재료를 한 번 더(받아쓰기는 <ID>.음성.txt로 남아 다시 하지 않음)
        if f'mat2:{need}' not in set(state()['done']): material(need, kwjson); mark(f'mat2:{need}')
    log("메타 줄 끝")

if __name__ == '__main__':
    main()

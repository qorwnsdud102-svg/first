"""결핍별 네이버 검색량 층 (M18) — 사장님 10-19: "키워드·검색량으로 인사이트 얻을 수 있는데"
(튼살 = 임산부 튼살크림 >> 엉덩이 튼살 · 비오템·일리윤·아토팜·클라랑스·튼사렌이 유명 → 집중 분석 · 튼살크림 = 이미 큰 시장).

- 검색광고 keywordstool: 씨앗 키워드 → 연관 키워드 월간 검색량(PC+MO, 측정 시점 최근 30일)
- 관련 키워드(줄기 낱말 포함)를 타겟·부위·찾는 것(제품형·의료·정보·구매)·성분·브랜드로 나눠 검색량 합과 비중
- 쇼핑인사이트: 대표 키워드의 성별·연령·기기 클릭 비율(최근 12개월, 클릭이 가장 촘촘한 대분류)
- 데이터랩 검색어 트렌드: 3년 월별 → 많이 찾는 달·최근 12개월 증감
모델 없음. 사용: python deficit_kw_volume.py [결핍 ...] [--all] [--seeds 결핍=a,b]
출력: 결핍책/검색량/<결핍>.md · <결핍>.json
"""
import collections, datetime, json, os, re, sys, time
from pathlib import Path
import requests
HERE = Path(__file__).resolve().parent
TOOL = r'C:\claude\네이버 급상승 키워드 기반 경쟁사 발굴\scripts'
sys.path.insert(0, TOOL)
BOOK = Path(r'C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획\결핍책')
OUT = BOOK / '검색량'

# 정책 = 데이터 ---------------------------------------------------------------
EXTRA_SEEDS = {'장미색비강진': ['장미색비강진', '장미빛비강진']}   # '비강진' 단독은 백색·태선양 비강진(다른 병)이 섞여 뺀다
EXTRA_STEMS = {'주사피부염': ['주사피부', '안면홍조', '로사세아'], '지루성두피염': ['지루성', '두피염'], '장미색비강진': ['장미빛비강진', '장미비강진'], '피부가려움증': ['가려움', '소양증', '간지러'], '지루성피부염': ['지루성피부', '얼굴지루', '안면지루'],
               '튼살': ['튼살'], '성인여드름': ['여드름', '턱드름'], '액취증': ['겨드랑이냄새', '암내']}
TARGET = {
    '임신·출산': ['임산부', '임신', '산모', '산후', '출산', '예비맘', '태교', '임부', '만삭', '제왕절개', '수유', '모유'],
    '아기·아이': ['신생아', '아기', '유아', '영유아', '어린이', '키즈', '아동', '초등학생', '초등', '베이비', '소아', '아이'],
    '10대·학생': ['청소년', '중학생', '고등학생', '학생', '10대', '사춘기', '수험생'],
    '남성': ['남자', '남성', '남편', '아빠', '맨즈'],
    '여성': ['여자', '여성', '엄마', '와이프'],
    '중장년·갱년기': ['갱년기', '폐경', '중년', '노인', '어르신', '시니어', '50대', '60대', '70대', '노년'],
    '20~40대': ['20대', '30대', '40대'],
    '반려동물': ['강아지', '고양이', '반려견', '애견', '반려묘'],
}
PART = ['안면', '얼굴', '눈가', '눈밑', '눈썹', '입술', '입가', '두피', '머리', '어깨', '가슴', '유두', '뱃살', '옆구리', '허리', '엉덩이',
        '골반', '허벅지', '무릎', '종아리', '다리', '팔뚝', '겨드랑이', '손등', '손가락', '발바닥', '발뒤꿈치', '뒤꿈치', '발가락',
        '발톱', '손톱', '사타구니', '와이존', 'y존', '항문', '이마', '코', '볼', '턱', '목', '등', '배', '팔', '손', '발', '귀', '눈', '입']
SEEK = {
    '제품형': ['괄사', '교정기', '마사지기', '마사지건', '견인기', '안마기', '찜질기', '찜질팩', '핫팩', '폼롤러', '방석', '측정기', '혈압계',
             '혈당계', '보청기', '제거기', '선크림', '바디워시', '구강청결제', '데오드란트', '컨실러', '화장품', '영양제', '유산균', '보조제', '보충제',
             '비타민', '클렌저', '클렌징', '트리트먼트', '에센스', '스프레이', '파우더', '보호대', '로션', '오일', '연고', '세럼', '앰플',
             '미스트', '토너', '샴푸', '린스', '패치', '마스크', '비누', '워시', '크림', '팩', '폼', '젤', '겔', '밤', '즙', '차', '약',
             '기계', '기기', '기구', '밴드', '베개', '깔창', '테이프', '필링', '스크럽', '쿠션', '치약', '가글', '칫솔', '스틱', '롤온',
             '패드', '시트', '파스'],
    '의료·시술': ['도수치료', '체외충격파', '물리치료', '보톡스', '필러', '추나', '스케일링', '임플란트', '피부과', '한의원', '클리닉', '의원', '병원', '레이저', '시술', '수술', '치료', '처방', '약국', '한약', '진료', '검사',
              '주사'],
    '셀프 관리': ['교정운동', '스트레칭', '필라테스', '마사지', '요가', '체조', '지압', '찜질', '운동', '식단', '다이어트', '자세',
              '습관', '루틴', '홈케어', '셀프'],
    '정보 탐색': ['없애는법', '없애는방법', '없애기', '자연치유', '자가진단', '좋은음식', '치료법', '관리법', '원인', '증상', '제거',
              '음식', '초기', '사진', '전염', '차이', '완치', '관리', '예방', '방법', '이유', '기간', '진단', '종류', '특징', '뜻', '영어',
              '없애', '빼는법', '시기', '언제', '부터', '좋아지는법', '높이는법', '감퇴', '저하', '테스트', '게임', '향상', '부족',
              '심해지', '나빠지', '좋아지', '자가', '체크', '검사법', '수치', '정상', '기준', '낮추는법', '낮추기', '내리는법', '줄이기', '개선', '완화', '재발', '스트레스', '식단', '생활습관'],
    '구매 직전': ['내돈내산', '최저가', '올리브영', '추천', '순위', '후기', '가격', '비교', '브랜드', '쿠팡', '다이소', '효과', '성분', '랭킹'],
}
STAGE = {'흰·오래된': ['흰색', '하얀', '흰', '오래된', '백색'], '붉은·초기': ['빨간', '붉은', '보라', '초기', '생기기전', '예방']}
REGION = ['서울', '강남', '신촌', '홍대', '잠실', '부산', '대구', '인천', '광주', '대전', '울산', '수원', '분당', '일산', '부천', '창원', '천안',
          '청주', '전주', '제주', '김포', '평택', '안산', '용인', '화성', '의정부', '송파', '노원', '목동', '건대', '판교', '동탄', '마포', '수원']
INGR = ['나이아신아마이드', '마데카소사이드', '히알루론산', '세라마이드', '살리실산', '아젤라산', '프로폴리스', '센텔라', '판테놀', '레티놀',
        '비타민c', '콜라겐', '펩타이드', '엑소좀', '어성초', '티트리', '병풀', '시카', 'pdrn', '유황', '징크', '아연', '철분', '오메가3',
        '쑥', '녹차', '알로에', '카모마일', '마그네슘', '우레아', '요소', '스쿠알란', '시어버터']
FILLER = ['대용량', '저자극', '고보습', '전용', '순한', '천연', '유기농', '무향', '보습', '진정', '수분', '재생', '더마', '바디', '페이스',
          '왼쪽', '오른쪽', '하부', '상부', '의료', '증후군', '통증', '뭉침', '두통', '결림', '저림', '뻐근', '교정', '가려움', '따가움',
          '붉은기', '각질', '용', '좋은', '잘듣는', '효과좋은', '1위', '정품', '세트', '리필', '증상', '사진']
CATS = [('50000002', '화장품/미용'), ('50000008', '생활/건강'), ('50000006', '식품'), ('50000005', '출산/육아'), ('50000001', '패션잡화')]


def kw_maps():
    m = {}
    for p in [BOOK / '메타판매처' / f for f in ('_키워드.json', '_키워드-추가.json', '_키워드-추가2.json', '_키워드-추가3.json')] + [BOOK / '묶음' / '_메타줄-키워드.json']:
        if p.exists():
            for k, v in json.loads(p.read_text(encoding='utf-8')).items(): m[k] = list(dict.fromkeys(m.get(k, []) + list(v)))
    for k, v in EXTRA_SEEDS.items(): m[k] = list(dict.fromkeys(m.get(k, []) + v))
    return m


def plan_alts(name):
    p = BOOK / '묶음' / '_전체계획.json'
    if not p.exists(): return []
    plan = json.loads(p.read_text(encoding='utf-8')); by = {f['name']: f for fm in plan['families'] for f in fm['folders']}
    for fm in plan['families']:
        if any(f['name'] == name and f['kind'] != '대안' for f in fm['folders']):
            return [f for f in fm['folders'] if f['kind'] == '대안'] + [by[s] for s in fm.get('shared', []) if s in by]
    return []


def nospace(s): return re.sub(r'\s+', '', s).lower()


def autocomplete(q):
    from harvest_keywords import parse_ac_json
    try:
        r = requests.get('https://ac.search.naver.com/nx/ac', params={'q': q, 'con': '1', 'frm': 'nv', 'ans': '2', 'r_format': 'json', 'st': '100'}, timeout=10)
        time.sleep(0.2); return parse_ac_json(r.json())[:10]
    except Exception: return []


def keywordstool(auth, hints):
    from harvest_keywords import parse_vol
    out = {}
    for i in range(0, len(hints), 5):
        b = hints[i:i + 5]
        for _ in range(3):
            r = requests.get('https://api.searchad.naver.com/keywordstool', params={'hintKeywords': ','.join(b), 'showDetail': '1'},
                             headers=auth.searchad_headers(), timeout=20)
            if r.status_code == 429: time.sleep(3); continue
            break
        if r.status_code != 200: print('  [keywordstool]', r.status_code, r.text[:120], flush=True); continue
        for x in r.json().get('keywordList', []):
            pc, mo = parse_vol(x.get('monthlyPcQcCnt')), parse_vol(x.get('monthlyMobileQcCnt'))
            out[nospace(x['relKeyword'])] = {'pc': pc, 'mo': mo, 'vol': pc + mo, 'comp': x.get('compIdx', '')}
        time.sleep(0.5)
    return out


def classify(k, stems):
    rest = k
    for s in sorted(stems, key=len, reverse=True): rest = rest.replace(s, ' ')
    tags = {'타겟': [], '부위': [], '찾는 것': [], '성분': []}
    for seg, words in TARGET.items():
        for w in words:
            if w in rest: tags['타겟'].append(seg); rest = rest.replace(w, ' '); break
    tags['해결책'] = []
    for seg, words in SEEK.items():
        for w in sorted(words, key=len, reverse=True):
            if w in rest:
                tags['찾는 것'].append(seg); rest = rest.replace(w, ' ')
                if seg in ('제품형', '의료·시술', '셀프 관리'): tags['해결책'].append(w)
    tags['단계'] = []
    for seg, words in STAGE.items():
        for w in words:
            if w in rest: tags['단계'].append(seg); rest = rest.replace(w, ' '); break
    tags['지역'] = [w for w in REGION if w in rest]
    for w in tags['지역']: rest = rest.replace(w, ' ')
    for w in sorted(INGR, key=len, reverse=True):
        if w in rest: tags['성분'].append(w); rest = rest.replace(w, ' ')
    for w in PART:   # 긴 부위 먼저(목록 순서)
        if w in rest: tags['부위'].append(w); rest = rest.replace(w, ' ')
    for w in sorted(FILLER, key=len, reverse=True): rest = rest.replace(w, ' ')
    left = [t for t in re.sub(r'\d+', ' ', rest).split() if len(t) >= 2]
    tags['찾는 것'] = list(dict.fromkeys(tags['찾는 것']))
    tags['브랜드?'] = left
    return tags


DL = {'dead': False}   # 데이터랩 하루 한도에 닿으면 그날은 더 부르지 않는다(캐시에 없는 칸은 '한도 — 다음 실행에 채움')
CACHE_P = OUT / '_쇼핑클릭-캐시.json'
CACHE = json.loads(CACHE_P.read_text(encoding='utf-8')) if CACHE_P.exists() else {}


class _R:
    status_code = 429; text = 'quota'
    def json(self): return {}


def dl_post(auth, url, body):
    """키마다 하루 1,000번 한도(쇼핑인사이트·검색어 트렌드 따로). 한도 난 키는 건너뛰고, 모든 키가 한도면 그날은 멈춘다."""
    if DL['dead']: return _R()
    n = len(auth.keys['dl']); tried = 0
    while tried < n * 2:
        r = requests.post(url, headers=auth.datalab_headers(), data=json.dumps(body), timeout=20)
        if r.status_code == 429 and '010' in r.text:   # 이 키 오늘 한도 → 다음 키
            auth._dl_idx += 1; tried += 1; continue
        if r.status_code == 429: time.sleep(3); tried += 1; continue
        return r
    DL['dead'] = True; print('  [데이터랩 한도] 모든 키 오늘 한도 — 다음 실행에 채움', flush=True)
    return _R()


def kw_demo(auth, cid, kw, start, end):
    """한 키워드의 성별·연령 쇼핑 클릭 비율(한 분류 안). 캐시 → 없으면 2번 부른다. 클릭이 적으면 None."""
    key = f'{cid}|{kw}|{start}'
    if key in CACHE: return CACHE[key]
    base = 'https://openapi.naver.com/v1/datalab/shopping/category/keyword/'; res = {}
    for kind, ep in (('성별', 'gender'), ('연령', 'age')):
        r = dl_post(auth, base + ep, {'startDate': start, 'endDate': end, 'timeUnit': 'month', 'category': cid, 'keyword': kw})
        if r.status_code != 200: return '한도' if DL['dead'] else None
        d = r.json()['results'][0]['data']; time.sleep(0.15)
        if len(d) < 4: CACHE[key] = None; return None
        s = collections.Counter()
        for x in d: s[x['group']] += x['ratio']
        tot = sum(s.values()) or 1; res[kind] = {k: round(100 * v / tot) for k, v in sorted(s.items())}
    CACHE[key] = res; CACHE_P.write_text(json.dumps(CACHE, ensure_ascii=False), encoding='utf-8')
    return res


def demo_str(x):
    if x == '한도': return '한도 — 다음 실행', ''
    if not x: return '쇼핑 클릭 적음', ''
    g = x.get('성별', {}); a = x.get('연령', {})
    return f"여 {g.get('f', 0)} · 남 {g.get('m', 0)}", ' · '.join(f'{k}대 {v}' for k, v in sorted(a.items(), key=lambda kv: -kv[1])[:3])


def shop_demo(auth, kw, start, end):
    base = 'https://openapi.naver.com/v1/datalab/shopping/category/keyword/'
    best = None
    for cid, cname in CATS:
        r = dl_post(auth, base + 'gender', {'startDate': start, 'endDate': end, 'timeUnit': 'month', 'category': cid, 'keyword': kw})
        if r.status_code != 200: continue
        d = r.json()['results'][0]['data']
        if best is None or len(d) > best[2]: best = (cid, cname, len(d), d)
        time.sleep(0.2)
    if not best or best[2] < 6: return None
    res = {'키워드': kw, '분류': best[1], '달 수': best[2] // 2}
    for kind, d in [('성별', best[3])] + [(k, None) for k in ('연령', '기기')]:
        if d is None:
            r = dl_post(auth, base + {'연령': 'age', '기기': 'device'}[kind], {'startDate': start, 'endDate': end, 'timeUnit': 'month', 'category': best[0], 'keyword': kw})
            if r.status_code != 200: continue
            d = r.json()['results'][0]['data']; time.sleep(0.2)
        s = collections.Counter()
        for x in d: s[x['group']] += x['ratio']
        tot = sum(s.values()) or 1
        res[kind] = {k: round(100 * v / tot) for k, v in sorted(s.items())}
    return res


def trend(auth, kws, end):
    start = (end.replace(day=1) - datetime.timedelta(days=365 * 3)).replace(day=1)
    body = {'startDate': f'{start:%Y-%m-%d}', 'endDate': f'{end:%Y-%m-%d}', 'timeUnit': 'month',
            'keywordGroups': [{'groupName': k, 'keywords': [k]} for k in kws[:5]]}
    r = dl_post(auth, 'https://openapi.naver.com/v1/datalab/search', body)
    if r.status_code != 200: return {}
    out = {}
    for g in r.json().get('results', []):
        d = [(x['period'][:7], x['ratio']) for x in g['data']]
        if len(d) < 24: continue
        bym = collections.defaultdict(list)
        for p, v in d: bym[int(p[5:7])].append(v)
        avg = {m: sum(v) / len(v) for m, v in bym.items()}
        top = sorted(avg, key=lambda m: -avg[m])[:3]
        last, prev = [v for _, v in d[-12:]], [v for _, v in d[-24:-12]]
        chg = round(100 * (sum(last) / len(last) - sum(prev) / len(prev)) / (sum(prev) / len(prev))) if sum(prev) else None
        out[g['title']] = {'많이 찾는 달': top, '최근12개월 증감%': chg, '최저 달': min(avg, key=avg.get)}
    return out


def run(name, seeds, auth):
    stems = list(dict.fromkeys([nospace(name)] + [nospace(s) for s in seeds] + [nospace(s) for s in EXTRA_STEMS.get(name, [])]))
    stems = [s for s in stems if len(s) >= 2]
    stems = [s for s in stems if not any(o != s and o in s for o in stems)]   # 가장 짧은 줄기만(튼살크림 → 튼살) — '크림'이 해결책으로 세어지게
    hints = [nospace(s) for s in seeds][:10]
    allk = keywordstool(auth, hints)
    top0 = [k for k, _ in sorted(((k, v) for k, v in allk.items() if any(s in k for s in stems)), key=lambda kv: -kv[1]['vol'])][:6]
    acs = list(dict.fromkeys(nospace(x) for q in dict.fromkeys(hints + top0) for x in autocomplete(q)))
    new = [k for k in acs if k not in allk]
    if new: allk.update({k: v for k, v in keywordstool(auth, new).items() if k not in allk or k in new})
    rel = {k: v for k, v in allk.items() if any(s in k for s in stems)}
    more = list(dict.fromkeys([k for k in top0 if k not in hints] + [k for k, _ in sorted(rel.items(), key=lambda kv: -kv[1]['vol']) if k not in hints]))[:10]
    if more:
        allk.update({k: v for k, v in keywordstool(auth, more).items() if k not in allk})
        rel = {k: v for k, v in allk.items() if any(s in k for s in stems)}
    rows = []
    for k, v in rel.items():
        rows.append({'키워드': k, **v, **classify(k, stems)})
    rows.sort(key=lambda r: -r['vol'])
    total = sum(r['vol'] for r in rows) or 1
    def share(key):
        c = collections.Counter(); ex = collections.defaultdict(list)
        for r in rows:
            for t in (r[key] or ['(말 없음)']):
                c[t] += r['vol']
                if len(ex[t]) < 3: ex[t].append(f"{r['키워드']} {r['vol']:,}")
        return [(t, v, round(100 * v / total, 1), ex[t]) for t, v in c.most_common()]
    brand = collections.Counter(); bex = collections.defaultdict(list)
    for r in rows:
        for b in r['브랜드?']:
            brand[b] += r['vol']
            if len(bex[b]) < 3: bex[b].append(f"{r['키워드']} {r['vol']:,}")
    for b in list(brand):
        if b in allk: bex[b].insert(0, f"(단독 '{b}' {allk[b]['vol']:,})")
    bk = BOOK / '결핍' / name / '결핍책.md'; btxt = bk.read_text(encoding='utf-8') if bk.exists() else ''
    alts = [a for a in plan_alts(name) if btxt.count(a['name']) >= 2]; alt_rows = []
    if alts:
        names = list(dict.fromkeys(nospace(x) for a in alts for x in [a['name']] + a.get('aliases', [])[:2] if len(nospace(x)) >= 2))
        av = keywordstool(auth, [n for n in names if n not in allk]); av.update({n: allk[n] for n in names if n in allk})
        for a in alts:
            vs = [(x, av.get(nospace(x), {}).get('vol', 0)) for x in [a['name']] + a.get('aliases', [])[:2]]
            alt_rows.append((a['name'], max(v for _, v in vs), ' / '.join(f'{x} {v:,}' for x, v in vs)))
        alt_rows.sort(key=lambda x: -x[1])
    near = [(k, v['vol']) for k, v in sorted(allk.items(), key=lambda kv: -kv[1]['vol']) if k not in rel][:25]
    today = datetime.date.today(); end = today.replace(day=1) - datetime.timedelta(days=1)
    s12 = f'{(end.replace(day=1) - datetime.timedelta(days=330)).replace(day=1):%Y-%m-%d}'
    prod = next((r['키워드'] for r in rows if '제품형' in r['찾는 것']), None)
    main = max(hints, key=lambda h: allk.get(h, {}).get('vol', 0)) if hints else nospace(name)
    demo = [x for x in (shop_demo(auth, k, s12, f'{end:%Y-%m-%d}') for k in dict.fromkeys([main] + ([prod] if prod else []))) if x]
    cid = next((c for c, n in CATS if demo and n == max(demo, key=lambda x: x['달 수'])['분류']), None)
    for r in rows[:30]:
        r['쇼핑'] = kw_demo(auth, cid, r['키워드'], s12, f'{end:%Y-%m-%d}') if cid else None
    tr = trend(auth, list(dict.fromkeys([main] + ([prod] if prod else []))), end)
    data = {'결핍': name, '측정': f'{datetime.datetime.now():%Y-%m-%d %H:%M}', '씨앗': hints, '줄기': stems, '관련 합계': total,
            '관련 키워드 수': len(rows), '타겟': share('타겟'), '부위': share('부위'), '찾는 것': share('찾는 것'), '성분': share('성분'), '단계': share('단계'), '지역': share('지역'), '해결책': share('해결책'), '계열 대안 이름': alt_rows,
            '브랜드 후보': [(b, v, round(100 * v / total, 1), bex[b]) for b, v in brand.most_common(15)], '줄기 없는 연관 상위': near,
            '쇼핑 클릭': demo, '추이': tr, '쇼핑 분류': next((n for c, n in CATS if c == cid), None), '상위': [{k: r.get(k) for k in ('키워드', 'vol', 'pc', 'mo', 'comp', '타겟', '부위', '찾는 것', '성분', '브랜드?', '쇼핑')} for r in rows[:80]]}
    OUT.mkdir(exist_ok=True)
    (OUT / f'{name}.json').write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding='utf-8')
    (OUT / f'{name}.md').write_text(render(data), encoding='utf-8')
    return data


def render(d):
    L = [f"# {d['결핍']} — 네이버 검색량으로 본 시장·타겟 (M18)", '',
         f"측정 {d['측정']} · 검색광고 keywordstool 월간 검색량(PC+모바일, 측정 시점 최근 30일 — 계절을 탄다) · 씨앗 {', '.join(d['씨앗'])} · "
         f"관련 키워드 {d['관련 키워드 수']}개(줄기 {', '.join(d['줄기'])} 포함) 합계 {d['관련 합계']:,}회", '',
         '읽는 법: 한 키워드가 여러 칸에 들 수 있다. 비중 = 그 칸 키워드 검색량 합 / 관련 합계. 정규식 분류(모델 없음)라 브랜드 후보엔 일반어가 섞인다.', '']
    top = d['상위'][:12]
    L += ['## 한눈에', f"- 가장 큰 키워드: " + ' · '.join(f"{r['키워드']} {r['vol']:,}" for r in top[:6])]
    seek = {t: p for t, v, p, _ in d['찾는 것']}
    L.append(f"- 찾는 것: 제품형 {seek.get('제품형', 0)}% · 의료·시술 {seek.get('의료·시술', 0)}% · 셀프 관리 {seek.get('셀프 관리', 0)}% · 정보 탐색 {seek.get('정보 탐색', 0)}% · 구매 직전 {seek.get('구매 직전', 0)}% · 말 없음(결핍 이름만) {seek.get('(말 없음)', 0)}%")
    tg = [(t, p) for t, v, p, _ in d['타겟'] if t != '(말 없음)']
    L.append('- 타겟 말이 붙은 검색: ' + (' · '.join(f'{t} {p}%' for t, p in tg) if tg else '없음'))
    pt = [(t, p) for t, v, p, _ in d['부위'] if t != '(말 없음)'][:6]
    if pt: L.append('- 부위: ' + ' · '.join(f'{t} {p}%' for t, p in pt))
    if d['브랜드 후보']: L.append('- 브랜드·제품명 후보(집중 분석 후보): ' + ' · '.join(f'{b} {v:,}' for b, v, p, _ in d['브랜드 후보'][:8]))
    for x in d['쇼핑 클릭']:
        L.append(f"- 쇼핑 클릭({x['키워드']}, {x['분류']}, {x['달 수']}개월): 성별 {x.get('성별')} · 연령 {x.get('연령')} · 기기 {x.get('기기')}")
    for k, t in d['추이'].items():
        L.append(f"- 추이({k}, 3년): 많이 찾는 달 {t['많이 찾는 달']} · 최저 {t['최저 달']}월 · 최근 12개월 증감 {t['최근12개월 증감%']}%")
    sol = [(t, v) for t, v, p, _ in d['해결책'] if t != '(말 없음)'][:6]
    if sol: L.append('- 해결책별(결핍 낱말 + 해결책 검색량 합): ' + ' · '.join(f'{t} {v:,}' for t, v in sol))
    stg = [(t, p) for t, v, p, _ in d['단계'] if t != '(말 없음)']
    if stg: L.append('- 단계(색): ' + ' · '.join(f'{t} {p}%' for t, p in stg))
    for title, key in (('해결책별 (결핍 낱말과 같이 찾은 해결책)', '해결책'), ('타겟', '타겟'), ('부위', '부위'), ('찾는 것', '찾는 것'), ('단계(색·시기)', '단계'), ('지역(병원 찾기)', '지역'), ('성분', '성분')):
        L += ['', f'## {title}', '|칸|검색량 합|비중|예|', '|---|---:|---:|---|']
        L += [f'|{t}|{v:,}|{p}%|{" / ".join(e)}|' for t, v, p, e in d[key][:15]]
    if d['계열 대안 이름']:
        L += ['', '## 대안 이름 단독 검색량 (이 결핍 책에 두 번 이상 나온 계열 대안 · 단독 검색엔 다른 결핍 수요가 섞인다 — 대안끼리 알려진 정도만 비교)', '|대안|최대|이름별|', '|---|---:|---|']
        L += [f'|{n}|{v:,}|{e}|' for n, v, e in d['계열 대안 이름']]
    L += ['', '## 브랜드·제품명 후보 (줄기·일반어를 빼고 남은 낱말)', '|후보|검색량 합|비중|예|', '|---|---:|---:|---|']
    L += [f'|{b}|{v:,}|{p}%|{" / ".join(e)}|' for b, v, p, e in d['브랜드 후보']]
    L += ['', f"## 연관 키워드 상위 30 — 검색량·성별·연령 (성별·연령 = 네이버 쇼핑인사이트 클릭 비율, {d.get('쇼핑 분류') or '분류 없음'} · 최근 12개월. 정보 검색어는 쇼핑 클릭이 적어 비어 있을 수 있다)",
          '|키워드|월간 검색량|성별(클릭)|연령 상위 3(클릭 %)|찾는 것|타겟|', '|---|---:|---|---|---|---|']
    for r in d['상위'][:30]:
        g, a = demo_str(r.get('쇼핑'))
        L.append(f"|{r['키워드']}|{r['vol']:,}|{g}|{a}|{','.join(r['찾는 것'] or [])}|{','.join(r['타겟'] or [])}|")
    L += ['', '## 관련 키워드 상위 80', '|키워드|월간|PC|모바일|경쟁|타겟|부위|찾는 것|', '|---|---:|---:|---:|---|---|---|---|']
    L += [f"|{r['키워드']}|{r['vol']:,}|{r['pc']:,}|{r['mo']:,}|{r['comp']}|{','.join(r['타겟'])}|{','.join(r['부위'])}|{','.join(r['찾는 것'])}|" for r in d['상위']]
    L += ['', '## 줄기 낱말이 없는 연관 키워드 상위 25 (참고 — 브랜드 단독명·인접 결핍·일반어가 섞임)', ' · '.join(f'{k} {v:,}' for k, v in d['줄기 없는 연관 상위'])]
    return '\n'.join(L) + '\n'


if __name__ == '__main__':
    os.chdir(TOOL)
    from config import NaverAuth
    args = sys.argv[1:]; extra = {}
    if '--seeds' in args:
        i = args.index('--seeds'); n, s = args[i + 1].split('=', 1); extra[n] = s.split(','); del args[i:i + 2]
    m = kw_maps(); m.update(extra)
    FIRST = ['주사피부염', '장미색비강진', '피부가려움증', '지루성피부염', '튼살', '지루성두피염']   # 사장님 10-19 우선순위
    allnames = sorted(set(m) | {p.name for p in (BOOK / '결핍').iterdir() if p.is_dir()} | set(EXTRA_SEEDS))
    allnames = [n for n in allnames if n != '허리디스크']   # 사장님 10-16 "허리디스크는 돌리지마"
    names = [n for n in FIRST if n in allnames] + [n for n in allnames if n not in FIRST] if '--all' in args else [a for a in args if a != '--all']
    auth = NaverAuth()
    for n in names:
        try:
            d = run(n, m.get(n, [n]), auth)
            print(f"{datetime.datetime.now():%H:%M} {n} · 관련 {d['관련 키워드 수']}개 · 합계 {d['관련 합계']:,}", flush=True)
        except Exception as e:
            print(f'{n} 실패: {type(e).__name__} {e}', flush=True)

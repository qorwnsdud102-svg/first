"""결핍 책 재료 만들기 — 수집이 끝난 계열 하나를 결핍 책 작성자(Sonnet)가 읽을 짧은 재료로 바꾼다. 모델 없음.

사용: python deficit_book_prep.py <_전체계획.json> <계열>
만드는 것:
  결핍책/결핍/<결핍>/_재료.md   — 수집 요약, 원인 단서 비중, 대안 언급, 목소리 인용, 쿠팡 후기 요약, 메타 판매처·매대 비율, 검색량
  결핍책/대안/<대안>/_재료.md   — 타겟 인식 비중(가격·통증·무서움·효과·연예인·유지·다운타임), 목소리 인용, 의사·후기 영상 발췌
  결핍책/묶음/<계열>/_재료-영상.md — 결핍별 의사·설명 영상 받아쓰기(원인 유형·원리 정리용)
비율은 정규식으로 센 추정치다(같은 말의 다른 뜻은 걸러지지 않음). 작성자가 인용을 보고 해석한다.
"""
import collections, glob, json, os, re, sys
from pathlib import Path
import openpyxl

ROOT = Path('C:/claude/LLM-WIKI'); BOOK = ROOT / '마케팅/프로젝트/DA-기획/결핍책'
REVIEWS = ROOT / '마케팅/프로젝트/DA-기획/후기-받은함'
META = Path(r'C:\claude\네이버 급상승 키워드 기반 경쟁사 발굴\scripts')

CAUSE = {'노화·처짐': r'나이|노화|처지|처짐|탄력.{0,4}(떨어|없)|늙', '근육·표정': r'웃을 ?때|표정|근육|웃으면|찡그', '살·지방': r'살이 ?(빠|찌)|볼살|지방|다이어트|살쪄|체중',
         '타고남·구조': r'타고|선천|유전|어릴 ?때부터|원래|뼈|골격|구조', '습관·자세': r'자세|습관|잠버릇|엎드려|베개|핸드폰|폰을|고개', '건조·피부': r'건조|얇|피부가 약|수분',
         '스트레스·생활': r'스트레스|잠을|수면|피곤|술|담배', '호르몬·임신': r'임신|출산|호르몬|생리|갱년기', '세균·염증': r'세균|염증|곰팡이|균|감염',
         '바이러스·옮음': r'바이러스|HPV|옮|전염|번지|퍼지', '각질·모공 막힘': r'각질|모공.{0,4}막|피지|과각화'}   # 10-16 사마귀돌기 작성자: 바이러스 칸이 없었음
PERCEPT = {'안다·들어봄': r'알아|들어봤|유명|많이 하', '효과 믿음·좋았다': r'효과.{0,6}(있|좋|봤)|좋아졌|만족|추천|달라졌|확실', '효과 없음·실망': r'효과.{0,6}(없|글쎄|모르)|별로|돈 ?아까|그때뿐|실망|소용없',
           '비싸다': r'비싸|가격|만 ?원|돈이|부담', '아프다·마취': r'아프|아팠|통증|마취|따가', '무섭다·부작용': r'무서|부작용|위험|걱정|겁', '연예인·유명인': r'연예인|배우|아이돌|셀럽',
           '유지·주기': r'유지|주기|몇 ?달|매년|다시 ?받', '다운타임·붓기·멍': r'붓기|부어|멍|다운타임|빨갛', '셀프·집에서': r'집에서|셀프|홈케어|혼자'}
SYMBOLS = ['PDRN', '레티놀', '레티날', '콜라겐', '펩타이드', '엑소좀', '히알루론', '시카', '병풀', '마데카', '나이아신', '트라넥삼산', '비타민C', 'EGF', '보톡스', '필러',
           '울쎄라', '써마지', '슈링크', '리쥬란', '쥬베룩', '스컬트라', '인모드', '리프팅', '고주파', '갈바닉', 'EMS', '미세전류', 'LED', '스피큘', '녹는실', '실리프팅',
           '맥주효모', '비오틴', '미녹시딜', '피나스테리드', '카페인', '어성초', '프로폴리스', '유산균', '세라마이드', '판테놀', '살리실산', 'AHA', 'BHA', '알부틴', '글루타치온']
SEVERE = {'장면: 거울·사진·웃기': r'거울|사진|셀카|웃을 ?때|웃기가|화장', '장면: 만남·일': r'소개팅|연애|만나기|출근|회사|면접|결혼식', '감정: 스트레스·우울': r'스트레스|우울|짜증|속상|미치겠|죽겠|눈물|울었',
          '감정: 자존감·콤플렉스': r'자존감|콤플렉스|창피|부끄|숨기|가리', '들인 돈': r'만 ?원|돈을|비용|가격이|썼는데|들였', '기간: 오래됨': r'년째|몇 ?년|오래|평생|계속', '불신·포기': r'소용없|효과 없|다 해봤|포기|속았|사기'}
WISH = r'만 ?되면|처럼 ?되|싶어요|싶다|원해|바래|방법 ?없을까|어떻게 ?하면'
# 10-16 고침: '먹는 것'의 '정·환'이 '정말·진정·환자'에, '밤'이 '밤에'에 걸려 먹는 것이 47~67%로 부풀었다(실제 0~8%). 여드름흉터 작성자가 찾음.
FORMS = {'크림': r'크림', '앰플·세럼': r'앰플|세럼|에센스', '패치': r'패치', '마스크·팩': r'마스크|팩(?!트)', '밴드': r'밴드', '디바이스·기기': r'디바이스|기기|마사지기|부스터 ?프로',
         '먹는 것': r'[0-9]+ ?정\b|정제|캡슐|알약|[0-9] ?환|젤리|분말|가루|영양제|드링크|먹는|마시는|복용|섭취|건강기능식품', '샴푸·토닉': r'샴푸|토닉', '스프레이': r'스프레이|미스트',
         '오일·밤': r'오일|멀티밤|스틱밤|립밤|밤 ?(타입|제형)'}

# 대안 이름이 다른 말과 겹쳐 섞인 글(2026-10-15 주름윤곽에서 확인: 온라인모드·일괄사표·자전거 모델)을 뺀다.
NEG = {'인모드': r'온라인 ?모드', '괄사': r'일괄', '스컬트라': r'자전거|로드 ?바이크|휠셋|프레임', '레디어스': r'게임|던파', '온다리프팅': r'^(?!.*온다 ?리프팅)',
       '기미': r'기미가요|닝기미|(빠질|터질|나을|들어갈|줄어들|좋아질|변할|올|보일) ?기미|기미(도|조차) ?(안|없|보이)'}

# 같은 말이 다른 뜻으로 많이 쓰이는 결핍은 그 뜻일 때만 남긴다('기미가요'·'할 기미'·'닝기미' — 색소흉터 원인원리 작성자가 찾음, 10-16)
POS = {'기미': r'피부|얼굴|잡티|색소|주근깨|미백|토닝|레이저|크림|선크림|썬크림|자외선|광대|트란|멜라|흑자|검버섯|시술|피부과|화장|세럼|앰플|비타민|뺨|눈밑|임신'}

def drop_noise(rows, name):
    pat, pos = NEG.get(name), POS.get(name)
    return [r for r in rows if not (pat and re.search(pat, r.get('text', ''))) and not (pos and not re.search(pos, r.get('text', '')))]

def load(p):
    try: return json.loads(Path(p).read_text(encoding='utf-8'))
    except Exception: return []

def share(texts, pats):
    n = len(texts) or 1
    return [(k, sum(bool(re.search(v, t, re.I)) for t in texts), round(100 * sum(bool(re.search(v, t, re.I)) for t in texts) / n)) for k, v in pats.items()]

def quotes(rows, k=40, need=None):
    pool = [r for r in rows if str(r.get('experience')) == 'True' and 60 <= len(r.get('text', '')) <= 600 and (not need or re.search(need, r['text']))]
    pool.sort(key=lambda r: (-(int(r.get('likes') or 0)), -len(r['text'])))
    by_src, out = collections.Counter(), []
    for r in pool:                                         # 출처가 한쪽으로 몰리지 않게
        s = str(r.get('source', ''))[:6]
        if by_src[s] >= max(4, k // 4): continue
        by_src[s] += 1; out.append(f"- [{r.get('source','')}] {re.sub(chr(10)+'+', ' ', r['text'])[:300]}")
        if len(out) >= k: break
    return out

def reviews_summary(folder_names, alias_pat):
    L = []
    for name in folder_names:
        for f in sorted(glob.glob(str(REVIEWS / name / '*.xlsx'))):
            try:
                ws = openpyxl.load_workbook(f, read_only=True).active; rows = list(ws.iter_rows(values_only=True))
            except Exception as e: L.append(f'- {os.path.basename(f)}: 읽기 실패 {e}'); continue
            head = [str(c or '') for c in rows[0]]; idx = {h: i for i, h in enumerate(head)}
            data = [r for r in rows[1:] if r and len(r) > idx.get('리뷰내용', 7)]
            texts = [str(r[idx['리뷰내용']] or '') for r in data]; stars = [int(float(r[idx['평점']])) for r in data if r[idx['평점']] not in (None, '')]
            helpful = sorted(data, key=lambda r: -int(float(r[idx.get('도움된인원수', 10)] or 0)))[:30]
            top_hit = sum(bool(re.search(alias_pat, str(r[idx['리뷰내용']] or ''))) for r in helpful)
            low = [str(r[idx['리뷰내용']] or '')[:160] for r in data if r[idx['평점']] not in (None, '') and int(float(r[idx['평점']])) <= 2][:4]
            best = [str(r[idx['리뷰내용']] or '')[:200] for r in helpful[:4]]
            name_p = os.path.basename(f)[:-5]
            L.append(f"### {name_p} ({name})\n- 후기 {len(data)}개 · 평균 {round(sum(stars)/len(stars),2) if stars else '-'}점 · 1~2점 {sum(s<=2 for s in stars)}개 · 도움순 상위 30개 중 결핍을 말한 후기 {top_hit}개")
            L += ['- 도움 많은 후기: ' + ' / '.join(best)] + (['- 낮은 점수: ' + ' / '.join(low)] if low else [])
    return L

LONG = []   # (게재일수, 본문 앞부분) — meta_texts가 채운다

def meta_texts(keywords):
    import datetime
    seen, texts = set(), []; LONG.clear(); today = datetime.date(2026, 10, 15)
    for kw in keywords:
        for f in glob.glob(str(META / '*_메타광고소재' / kw / '_ads.json')):
            d = load(f)
            for t in d.get('ad_texts', []) if isinstance(d, dict) else []:
                m = re.search(r'라이브러리 ID: (\d+)', t)
                if not m or m.group(1) in seen: continue
                seen.add(m.group(1)); body = t.split('광고\n', 1)[-1][:800]
                letters = re.findall(r'[A-Za-z가-힣]', body)   # 외국어 광고(영어·인니어 단편드라마 앱 — 튼살 207개 중 약 97개, 10-16)는 뺀다
                if letters and sum('가' <= ch <= '힣' for ch in letters) / len(letters) < 0.3: continue
                texts.append(body)
                s = re.search(r'(\d{4})\. (\d{1,2})\. (\d{1,2})\.에 게재 시작함', t)
                if s: LONG.append(((today - datetime.date(int(s.group(1)), int(s.group(2)), int(s.group(3)))).days, re.sub(r'\s+', ' ', body)[:160]))
    return texts

def long_running(k=12):
    out, seen = [], set()
    for days, body in sorted(LONG, reverse=True):
        key = body[:40]
        if key in seen: continue
        seen.add(key); out.append(f'- {days}일 · {body}')
        if len(out) >= k: break
    return out

def transcript_snips(vids, role=None, per=2500, k=10):
    out = []
    for v in [v for v in vids if v.get('transcript') and (role is None or v.get('role') == role)][:k]:
        tx = re.sub(r'\[\d+(\.\d+)?\]\s*', '', v['transcript']); tx = re.sub(r'\s+', ' ', tx)
        out.append(f"#### {v.get('title','')} ({v.get('channel','')}, {v.get('role','')})\n{v.get('url','')}\n{tx[:per]}")
    return out

def main(plan_path, family, only=None):   # only: 이 폴더만 다시 만든다(다른 작성자가 읽는 중인 재료는 건드리지 않음)
    plan = json.loads(Path(plan_path).read_text(encoding='utf-8'))
    fams = {f['family']: f for f in plan['families']}; fam = fams[family]
    by_name = {f['name']: f for fm in plan['families'] for f in fm['folders']}
    alts = [f for f in fam['folders'] if f['kind'] == '대안'] + [by_name[s] for s in fam.get('shared', []) if s in by_name]
    sellers = BOOK / '메타판매처'; kwmap = (load(sellers / '_키워드.json') or {}) | (load(sellers / '_키워드-추가.json') or {})   # 10-16 새 결핍 27개 키워드도
    fam_dir = BOOK / '묶음' / family; fam_dir.mkdir(parents=True, exist_ok=True)
    vid_md = [f'# {family} — 결핍별 의사·설명 영상 받아쓰기(발췌, 영상당 앞 2,500자)', '']
    for f in fam['folders']:
        if only and f['name'] != only: continue
        folder = BOOK / f['kind'] / f['name']; rec = load(folder / '수집기록.json') or {}
        rows = drop_noise(load(folder / '정제-목소리.json'), f['name']); vids = load(folder / '영상-원자료.json')
        if f.get('reuse_v2'): vids += [v for v in load(ROOT / '마케팅/프로젝트/DA-기획/기초분석-v2' / f['name'] / '영상-원자료.json') if v.get('transcript')]
        exp_texts = [r['text'] for r in rows if str(r.get('experience')) == 'True']
        alias = '|'.join(re.escape(a) for a in f['aliases'])
        L = [f"# {f['name']} — 재료 ({f['kind']}, 계열 {family})", '',
             f"- 수집: 정리 단위 {rec.get('units','-')} · 경험 {rec.get('experience','-')} · 목표 {rec.get('target','-')} · 받아쓴 영상 {sum(bool(v.get('transcript')) for v in vids)}/{len(vids)}",
             f"- 출처별 고유 단위: " + ', '.join(f"{k} {v.get('raw_unique')}" for k, v in (rec.get('sources') or {}).items()), '']
        if f['kind'] == '결핍':
            L += ['## 결핍이 얼마나 심한가 — 경험 발화 중 이 말을 한 비중(정규식 추정, 사장님 P6547)', '', '| 단서 | 발화 수 | % |', '|---|---:|---:|'] + [f'| {k} | {n} | {p} |' for k, n, p in share(exp_texts, SEVERE)]
            L += ['', '## 바라는 말 — "~만 되면", "~싶다"(그들의 언어) 인용 12', ''] + quotes(rows, 12, WISH)
            L += ['', '## 원인 단서 — 경험 발화 중 이 말을 한 비중(정규식 추정)', '', '| 단서 | 발화 수 | % |', '|---|---:|---:|'] + [f'| {k} | {n} | {p} |' for k, n, p in share(exp_texts, CAUSE)]
            alt_pats = {a['name']: '|'.join(re.escape(x) for x in a['aliases']) for a in alts}
            L += ['', '## 대안 언급 — 경험 발화 중 그 대안을 말한 비중', '', '| 대안 | 발화 수 | % |', '|---|---:|---:|'] + [f'| {k} | {n} | {p} |' for k, n, p in sorted(share(exp_texts, alt_pats), key=lambda x: -x[1])]
            L += ['', '## 목소리 인용 40', ''] + quotes(rows, 40)
            rv_folders = [f['name']] + (['주름공통'] if family == '주름윤곽' else [])
            rv = reviews_summary(rv_folders, alias)
            L += ['', '## 쿠팡 산 사람 후기(사장님이 받아 준 파일)', ''] + (rv or ['- 아직 없음(후기 대기)'])
            mt = meta_texts(kwmap.get(f['name'], f['aliases'][:1]) + [f['name']])
            L += ['', f'## 매대 — 이 결핍 메타 광고 {len(mt)}개에서 상징·제형이 나온 비율(정규식 추정)', '', '| 상징 | 광고 수 | % |', '|---|---:|---:|']
            syms = {s: re.escape(s) for s in SYMBOLS} | {a['name']: alt_pats[a['name']] for a in alts}   # 계열 대안(프락셀·피코 등)도 상징으로 센다(10-16)
            L += [f'| {k} | {n} | {p} |' for k, n, p in sorted(share(mt, syms), key=lambda x: -x[1]) if n]
            L += ['', '| 제형 | 광고 수 | % |', '|---|---:|---:|'] + [f'| {k} | {n} | {p} |' for k, n, p in sorted(share(mt, FORMS), key=lambda x: -x[1]) if n]
            L += ['', '## 오래 돈 광고 상위 12(게재일 순, 같은 문구는 한 번) — 오래 돈 소재가 돈을 번 소재', ''] + long_running(12)
            sp = sellers / f"{f['name']}.md"
            if sp.exists(): L += ['', '## 메타 판매처 순위(광고 수·최장 게재일)', ''] + sp.read_text(encoding='utf-8').splitlines()[4:22]
            vid_md += [f"## {f['name']}", ''] + transcript_snips(vids, '의사·설명', 2500, 10) + ['']
        else:
            L += ['## 타겟 인식 — 경험 발화 중 이 말을 한 비중(정규식 추정)', '', '| 인식 | 발화 수 | % |', '|---|---:|---:|'] + [f'| {k} | {n} | {p} |' for k, n, p in share(exp_texts, PERCEPT)]
            L += ['', '## 목소리 인용 25', ''] + quotes(rows, 25)
            L += ['', '## 영상 발췌(의사·설명 / 경험)', ''] + transcript_snips(vids, None, 1800, 3)
        (folder / '_재료.md').write_text('\n'.join(L) + '\n', encoding='utf-8')
        print('재료', f['kind'], f['name'], len('\n'.join(L)))
    if only: return
    (fam_dir / '_재료-영상.md').write_text('\n\n'.join(vid_md) + '\n', encoding='utf-8')
    print('영상 재료', family, len('\n\n'.join(vid_md)))

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else None)

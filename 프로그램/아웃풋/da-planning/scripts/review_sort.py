"""다운로드 폴더의 쿠팡 후기 엑셀(리뷰다운로드*.xlsx)을 읽어 어떤 제품 후기인지 보고 후기-받은함/<결핍>/로 옮긴다(파일 이름 = 제품 이름).
사장님 2026-10-15: "안에 내용보고 무슨 제품후기인지 판단해서 폴더에 넣을수있어?"
- 제품 이름(상품옵션명)을 _받을-링크.md의 제품 목록과 단어 겹침으로 맞추고, 못 맞추면 규칙 사전으로 본다. 그래도 모르면 _미분류/로 옮긴다.
- 끝에 '_받을-링크.md에는 있는데 아직 안 받은 제품' 목록을 _아직안받음.md로 쓴다.
사용: python review_sort.py"""
import glob, io, json, os, re, shutil, sys
import openpyxl
D = os.path.expanduser(r'~\Downloads'); R = r'C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획\후기-받은함'
# 드롭박스 쿠팡후기 폴더 읽기는 10-18 밤 사장님 '더이상 안올라올거야 기능 정지해'로 뺐다(다운로드 폴더만 본다)
RULES = [('건선', r'라우쉬|후코아신|퍼델|닥사렌'), ('지루성피부염', r'제로이드|시카비오|지루성 ?피부'), ('피부가려움증', r'소양증|유세린|큐어 ?크림|로더베르|레이어랩|노바덤'),   # 10-20 새 책 4개(장미색 제외) 사장님 수동 받기 — 탈모 '두피'·아토피 '아토 '보다 먼저
         ('손상모', r'어네이즈|멜로우 크림|프롬랩스|나르카'), ('발냄새', r'라셀턴|박토킬|리디킬|냄새몰'), ('입냄새', r'헤트라스|리톨|닥터숨|브리쎄|레빗텅'),   # 10-19 메타 판매 제품(사장님이 표로 직접 받음)
         ('등드름', r'포맨트|코튼허그|낫포유|바디 ?필링샷'), ('넓은모공', r'캄랩|그린티 ?243|그린토마토|포어시그널'), ('성인여드름', r'테토쿨|앱소|노일리'),
         ('액취증', r'힐그리즈|프레톡|퍼시닌'), ('노인냄새', r'위프 ?클린|데오우드'), ('발뒤꿈치각질', r'헤투토|나노클라스|마린힐 ?풋'),
         ('넓은모공', r'바다포도|포어 ?타이트닝|모공 ?(앰플|세럼|흔적|탄력|감소|수축)|포어 클린팩|레티날 300ppm 크림'),   # 10-18 밤 사장님이 직접 고른 넓은모공 7개(포어 클린→속모증, 레티날 300→주름공통으로 새지 않게)
         ('액취증', r'액취|암내|겨드랑이 ?냄새'), ('노인냄새', r'노인 ?냄새|노취|노넨|노네날|홀아비|홀애비|가령취'), ('발뒤꿈치각질', r'뒤꿈치|발 ?각질|풋 ?크림|풋 ?파일'),
         ('손발톱갈라짐', r'손톱 ?(영양|강화|에센스|앰플)'), ('다리붓기', r'다리 ?붓기|부종|붓기차|호박즙'), ('민감부위착색', r'Y ?존 ?미백|유두|민감 ?부위|비키니 ?라인'),
         ('눈밑지방', r'눈밑 ?지방|아이백'), ('시린이', r'시린|시림|센소다인'), ('누런이', r'치아 ?미백|미백 ?치약|화이트닝 ?(치약|펜|스트립)'), ('혈당', r'혈당|바나바'),
         ('콜레스테롤', r'콜레스테롤|홍국'), ('혈압', r'혈압'), ('기억력', r'기억력|포스파티딜세린'), ('빈혈', r'빈혈|철분|헴철'), ('거북목', r'거북목|일자목|목 ?견인'),
         ('과민성대장', r'과민성|소화 ?효소'), ('치질', r'치질|치핵|좌욕'),   # 10-18 밤 새 결핍 17(③-2): 옛 규칙(데오→다한증, 풋→발냄새 등)보다 먼저 본다
         ('질염', r'락토리메디'), ('주사피부염', r'리코셀'), ('한포진', r'허벌 파마라인|파마라인 센스티브 (주부|핸드)|파마라인 센스티브 핸드'), ('땀띠', r'땀띠|칼라민|베이비 ?파우더'), ('바디착색', r'화이트홀릭'), ('셀룰라이트', r'PPC|아나시스'), ('구순염', r'입술포진|입술물집'), ('아토피', r'아토덤'),   # 10-17 수동받기 옵션명이 목록 이름과 달라 미분류된 5개
         ('주름공통', r'라이필|유쎄라블|블랙 스네일크림|마데카 크림 시즌|타이트 리프팅|펩타이드샷|녹는실|레티날 300|펩타 리프팅|콜라겐 임팩트|레티놀 겔 마스크|보톡스 멀티밤|슈마지|갈바닉 고주파|페이스 괄사|에버콜라겐'),
         ('팔자주름', r'팔자|PDRN 핑크 콜라겐|피디알엔 핑크'), ('목주름', r'목주름|넥 마스크|넥 실리콘|쥬베핏'), ('이중턱', r'브이라인|V라인|골기|에이지알'),
         ('기미', r'도미나스|기미|누룩밤|들깨 미백|멜라논|셀리맥스|나이아신아마이드 20'), ('여드름흉터', r'흔적 리페어|마데케어|레드스팟|센텔라스카|더마틱스'),
         ('튼살', r'튼살|스트레치 마크|프래그넌트|프레그넌시|힐텀|프라젠트라|튼사렌'), ('소극성속모증', r'속모증|피지 멜팅|피지제거기|노우즈 팩|포어 클린|돼지코팩'),
         ('쥐젖', r'와트프리져|비렌느|스팟 엑스|쥐젖|에끌라퓨어|요철|율무|비립종|큐라스팟'), ('티눈', r'티눈|굳은살'), ('무좀', r'케라셀|무좀|발톱 스케일링|케라좀|라셀턴|좀퓨어|케라큐'),
         ('부유방', r'부유방|팔뚝'), ('하지정맥류', r'압박스타킹|압박밴드|종아리 이완|디오스민|징코맥스|하지정맥'),
         ('역류성식도염', r'위엔포스|위건강|역류|매스틱'), ('수족냉증', r'보온대|발핫팩|수면양말|허브찜질팩|열선양말|수족냉증'), ('비염', r'노즈스위퍼|노즈픽션|나잘후레쉬|브레스온|곰보배추|노즈스윗|코세정'),
         ('탈모', r'탈모|트리코엑스|그로우턴|마이녹셀|리바이브 테라피|스칼프|Vivelab|바이브랩|모발 강화|두피'), ('아토피', r'아토피|아토 |아토팜|리스토피|아토크림'), ('다한증', r'다한증|땀(?!띠)|데오|퍼스피렉스|오도리스'),
         ('잇몸염증', r'잇몸|치탄플러스|효소의발견|가그린|진지발리스')]
ALSO = {'와트프리져': ['티눈'], '닥사렌': ['모공각화증']}

def toks(s): return {w for w in re.findall(r'[가-힣A-Za-z0-9]{2,}', re.sub(r'\(.*?\)', ' ', s))}   # 괄호 속 설명은 빼고 맞춘다

def link_rows():
    rows, cur = [], None
    for line in open(os.path.join(R, '_받을-링크.md'), encoding='utf-8'):
        m = re.match(r'#{2,3} ([^\s(]+?)(?: 추가)? → `([^`/]+)/`', line) or re.match(r'## (\S+) \(검색어', line)
        if m: cur = m.group(2) if m.lastindex and m.lastindex >= 2 else m.group(1)
        for name, pid in re.findall(r'\[([^\]]+)\]\(https://www\.coupang\.com/vp/products/(\d+)\)', line):
            if cur: rows.append((cur, name, pid))
    return rows

def manual_rows():
    """_수동받기-목록.md(10-16 밤 새 결핍·메타 판매 제품) — ① '- [ ] <결핍> · <제품> · 링크', ② '### <결핍> (n개)' 아래 '- [ ] <제품> · 링크'."""
    p = os.path.join(R, '_수동받기-목록.md'); rows, cur = [], None
    if not os.path.exists(p): return rows
    for line in open(p, encoding='utf-8'):
        h = re.match(r'### (\S+) \(\d+개\)', line)
        if h: cur = h.group(1); continue
        if line.startswith('## '): cur = None
        m = re.match(r'- \[.\] (.+?) · https://www\.coupang\.com/vp/products/(\d+)', line)
        if not m or '후기 없음' in line: continue   # 10-18 사장님: 후기가 없는 제품은 받을 목록에서 뺀다
        body, pid = m.group(1), m.group(2)
        if cur is None and ' · ' in body: need, name = body.split(' · ', 1)
        elif cur: need, name = cur, body
        else: continue
        rows.append((need.strip(), name.strip(), pid))
    return rows

def search_rules():
    """_수동받기-목록.md ③ 표(| 결핍 | 검색어 | 받을 제품 수 | 제품 이름에 들어갈 말 |) — 검색어로 받은 제품은 링크가 없어 이름 낱말로 맞춘다(10-17)."""
    p = os.path.join(R, '_수동받기-목록.md'); out, on = [], False
    if not os.path.exists(p): return out
    for line in open(p, encoding='utf-8'):
        if line.startswith('## '): on = line.startswith('## ③')
        cells = [c.strip() for c in line.strip().strip('|').split('|')] if on and line.startswith('| ') else []
        if len(cells) == 4 and cells[0] not in ('결핍', '---') and not set(cells[0]) <= {'-'}:
            words = [re.escape(w.strip()) for w in cells[3].split(',') if w.strip()]
            if words: out.append((cells[0], '|'.join(w if w != '땀' else '땀(?!띠)' for w in words)))
    return out

def main():
    links = link_rows(); moved, unknown = [], []
    extra = search_rules()
    manual = manual_rows()   # 10-17: 새 결핍 제품은 옛 규칙 사전(RULES)이 엉뚱한 곳(두피 샴푸→탈모, 율무패치→쥐젖)으로 보내므로 수동 목록과 먼저 맞춘다
    got_names = []
    for f in sorted(glob.glob(os.path.join(D, '리뷰다운로드*.xlsx')), key=os.path.getmtime):
        try:
            with open(f, 'rb') as fh: data = io.BytesIO(fh.read())   # 10-17: 파일을 직접 열면 iter_rows가 원본 손잡이를 쥐고 있어 옮기기가 늘 '사용 중'으로 실패했다
            wb = openpyxl.load_workbook(data, read_only=True); it = wb.active.iter_rows(values_only=True)
            head = [str(c or '') for c in next(it)]; first = next(it, None)
            p = str(first[head.index('상품옵션명')] if first and '상품옵션명' in head else '')
            wb.close()                                   # 파일 잠금을 풀어야 옮길 수 있다
        except Exception as e: unknown.append(f'{os.path.basename(f)} 읽기 실패 {e}'); continue
        best = max(links, key=lambda r: len(toks(r[1]) & toks(p)) / (len(toks(r[1])) or 1), default=None)
        score = len(toks(best[1]) & toks(p)) / (len(toks(best[1])) or 1) if best else 0
        bm = max(manual, key=lambda r: len(toks(r[1]) & toks(p)) / (len(toks(r[1])) or 1), default=None)
        sm = len(toks(bm[1]) & toks(p)) / (len(toks(bm[1])) or 1) if bm else 0
        dest = (bm[0] if bm and sm >= 0.6 else None) or next((d for d, pat in RULES if re.search(pat, p)), None) or (best[0] if best and score >= 0.5 else None) \
               or next((d for d, pat in extra if re.search(pat, p)), None) or '_미분류'   # ③ 검색어로 받은 제품은 맨 뒤에 이름 낱말로
        name = re.sub(r'[\\/:*?"<>|]', '', p.split(',')[0]).strip()[:80] or os.path.basename(f)[:-5]
        os.makedirs(os.path.join(R, dest), exist_ok=True)
        tgt = os.path.join(R, dest, name + '.xlsx'); n = 2
        if os.path.exists(tgt) and os.path.getsize(tgt) == os.path.getsize(f):   # 지난번에 복사만 되고 원본이 남은 경우
            try: os.remove(f); moved.append(f'{dest} ← {name} (이미 있음)'); got_names.append(p)
            except OSError: moved.append(f'{dest} ← {name} (이미 복사됨, 원본은 사용 중이라 못 지움)'); got_names.append(p)
            continue
        while os.path.exists(tgt): tgt = os.path.join(R, dest, f'{name} ({n}).xlsx'); n += 1
        for k, extra in ALSO.items():
            if k in p:
                for e in extra:
                    os.makedirs(os.path.join(R, e), exist_ok=True); shutil.copy2(f, os.path.join(R, e, name + '.xlsx'))
        try: shutil.move(f, tgt); moved.append(f'{dest} ← {name}'); got_names.append(p)
        except OSError:                                  # 원본을 다른 프로그램(OneDrive 동기화·미리 보기)이 잡고 있으면 복사만 하고, 원본은 다음 번에 지운다
            if not os.path.exists(tgt): shutil.copy2(f, tgt)
            moved.append(f'{dest} ← {name} (복사, 원본은 다음에 정리)'); got_names.append(p)
        if dest == '_미분류': unknown.append(name)
    have = {os.path.basename(x)[:-5] for x in glob.glob(os.path.join(R, '*', '*.xlsx'))}
    missing = [(d, nm, pid) for d, nm, pid in links + manual if not any(len(toks(nm) & toks(h)) / (len(toks(nm)) or 1) >= 0.5 for h in have)]
    L = ['# 아직 안 받은 후기 제품 (review_sort.py가 _받을-링크.md와 받은 파일을 맞춰 본 결과)', '']
    L += [f'- {d} · [{nm}](https://www.coupang.com/vp/products/{pid})' for d, nm, pid in missing]
    open(os.path.join(R, '_아직안받음.md'), 'w', encoding='utf-8').write('\n'.join(L) + '\n')
    print(f'옮김 {len(moved)} · 미분류 {len(unknown)} · 아직 안 받음 {len(missing)}')
    print('\n'.join(moved)); print('미분류:', unknown)

if __name__ == '__main__':
    main()

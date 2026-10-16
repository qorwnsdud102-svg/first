"""다운로드 폴더의 쿠팡 후기 엑셀(리뷰다운로드*.xlsx)을 읽어 어떤 제품 후기인지 보고 후기-받은함/<결핍>/로 옮긴다(파일 이름 = 제품 이름).
사장님 2026-10-15: "안에 내용보고 무슨 제품후기인지 판단해서 폴더에 넣을수있어?"
- 제품 이름(상품옵션명)을 _받을-링크.md의 제품 목록과 단어 겹침으로 맞추고, 못 맞추면 규칙 사전으로 본다. 그래도 모르면 _미분류/로 옮긴다.
- 끝에 '_받을-링크.md에는 있는데 아직 안 받은 제품' 목록을 _아직안받음.md로 쓴다.
사용: python review_sort.py"""
import glob, json, os, re, shutil, sys
import openpyxl
D = os.path.expanduser(r'~\Downloads'); R = r'C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획\후기-받은함'
RULES = [('주름공통', r'라이필|유쎄라블|블랙 스네일크림|마데카 크림 시즌|타이트 리프팅|펩타이드샷|녹는실|레티날 300|펩타 리프팅|콜라겐 임팩트|레티놀 겔 마스크|보톡스 멀티밤|슈마지|갈바닉 고주파|페이스 괄사|에버콜라겐'),
         ('팔자주름', r'팔자|PDRN 핑크 콜라겐|피디알엔 핑크'), ('목주름', r'목주름|넥 마스크|넥 실리콘|쥬베핏'), ('이중턱', r'브이라인|V라인|골기|에이지알'),
         ('기미', r'도미나스|기미|누룩밤|들깨 미백|멜라논|셀리맥스|나이아신아마이드 20'), ('여드름흉터', r'흔적 리페어|마데케어|레드스팟|센텔라스카|더마틱스'),
         ('튼살', r'튼살|스트레치 마크|프래그넌트|프레그넌시|힐텀|프라젠트라|튼사렌'), ('소극성속모증', r'속모증|피지 멜팅|피지제거기|노우즈 팩|포어 클린|돼지코팩'),
         ('쥐젖', r'와트프리져|비렌느|스팟 엑스|쥐젖|에끌라퓨어|요철|율무|비립종|큐라스팟'), ('티눈', r'티눈|굳은살'), ('무좀', r'케라셀|무좀|발톱 스케일링|케라좀|라셀턴|좀퓨어|케라큐'),
         ('부유방', r'부유방|팔뚝'), ('하지정맥류', r'압박스타킹|압박밴드|종아리 이완|디오스민|징코맥스|하지정맥'),
         ('역류성식도염', r'위엔포스|위건강|역류|매스틱'), ('수족냉증', r'보온대|발핫팩|수면양말|허브찜질팩|열선양말|수족냉증'), ('비염', r'노즈스위퍼|노즈픽션|나잘후레쉬|브레스온|곰보배추|노즈스윗|코세정'),
         ('탈모', r'탈모|트리코엑스|그로우턴|마이녹셀|리바이브 테라피|스칼프|Vivelab|바이브랩|모발 강화|두피'), ('아토피', r'아토피|아토 |아토팜|리스토피|아토크림'), ('다한증', r'다한증|땀|데오|퍼스피렉스|오도리스'),
         ('잇몸염증', r'잇몸|치탄플러스|효소의발견|가그린|진지발리스')]
ALSO = {'와트프리져': ['티눈']}

def toks(s): return {w for w in re.findall(r'[가-힣A-Za-z0-9]{2,}', re.sub(r'\(.*?\)', ' ', s))}   # 괄호 속 설명은 빼고 맞춘다

def link_rows():
    rows, cur = [], None
    for line in open(os.path.join(R, '_받을-링크.md'), encoding='utf-8'):
        m = re.match(r'#{2,3} ([^\s(]+?)(?: 추가)? → `([^`/]+)/`', line) or re.match(r'## (\S+) \(검색어', line)
        if m: cur = m.group(2) if m.lastindex and m.lastindex >= 2 else m.group(1)
        for name, pid in re.findall(r'\[([^\]]+)\]\(https://www\.coupang\.com/vp/products/(\d+)\)', line):
            if cur: rows.append((cur, name, pid))
    return rows

def main():
    links = link_rows(); moved, unknown = [], []
    got_names = []
    for f in sorted(glob.glob(os.path.join(D, '리뷰다운로드*.xlsx')), key=os.path.getmtime):
        try:
            wb = openpyxl.load_workbook(f, read_only=True); it = wb.active.iter_rows(values_only=True)
            head = [str(c or '') for c in next(it)]; first = next(it, None)
            p = str(first[head.index('상품옵션명')] if first and '상품옵션명' in head else '')
            wb.close()                                   # 파일 잠금을 풀어야 옮길 수 있다
        except Exception as e: unknown.append(f'{os.path.basename(f)} 읽기 실패 {e}'); continue
        best = max(links, key=lambda r: len(toks(r[1]) & toks(p)) / (len(toks(r[1])) or 1), default=None)
        score = len(toks(best[1]) & toks(p)) / (len(toks(best[1])) or 1) if best else 0
        dest = next((d for d, pat in RULES if re.search(pat, p)), None) or (best[0] if best and score >= 0.5 else '_미분류')
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
    missing = [(d, nm, pid) for d, nm, pid in links if not any(len(toks(nm) & toks(h)) / (len(toks(nm)) or 1) >= 0.5 for h in have)]
    L = ['# 아직 안 받은 후기 제품 (review_sort.py가 _받을-링크.md와 받은 파일을 맞춰 본 결과)', '']
    L += [f'- {d} · [{nm}](https://www.coupang.com/vp/products/{pid})' for d, nm, pid in missing]
    open(os.path.join(R, '_아직안받음.md'), 'w', encoding='utf-8').write('\n'.join(L) + '\n')
    print(f'옮김 {len(moved)} · 미분류 {len(unknown)} · 아직 안 받음 {len(missing)}')
    print('\n'.join(moved)); print('미분류:', unknown)

if __name__ == '__main__':
    main()

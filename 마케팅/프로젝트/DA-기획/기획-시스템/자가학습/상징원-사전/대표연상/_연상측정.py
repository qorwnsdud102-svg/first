"""일회성 검색연상 조사: 기존 값 재사용→누락 복합어만 조회→근거가 있는 항목만 정렬."""
import argparse
import datetime
import json
import pathlib
import re
import subprocess
import sys

P=pathlib.Path(__file__).resolve().parent
D=P.parent
ROOT=pathlib.Path('C:/claude/LLM-WIKI')
TOOL=ROOT/'프로그램/아웃풋/da-planning/scripts/naver_kw.py'
def read(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def save(name,d):(P/name).write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
def norm(x):return re.sub(r'\s+','',x).lower()
needs=read(D/'결핍별.json')
cross=read(D/'다른분야-상징.json')
old=read(D/'검색량-실측.json')
old={norm(k):v for k,v in old.items()}

# 여기 있는 말은 분류용 표지일 뿐. 실제 반환된 검색어에 있을 때만 후보로 쓴다.
labels={
 '주름':['주름','팔자','미간','자갈턱'], '탄력·윤곽':['리프팅','탄력','처짐','볼꺼짐','볼살','이중턱','안면윤곽'],
 '색소':['기미','잡티','색소','문신','미백'], '모공':['모공','블랙헤드','피지'],
 '흉터·상처':['흉터','상처','켈로이드','욕창','화상','튼살'], '홍조':['홍조','혈관'],
 '여드름':['여드름','좁쌀'], '피부건조':['보습','속건조','수분','건조피부'],
 '아토피·습진':['아토피','습진','피부염','가려움'], '돌기':['쥐젖','사마귀','비립종'],
 '모발':['탈모','모발','새치','염색','비듬','두피'], '손발톱':['무좀','발톱','손톱','내성'],
 '각질':['각질','티눈','굳은살'], '땀·냄새':['다한증','땀','액취','암내','입냄새','구취','냄새'],
 '관절·근골격':['관절','오십견','디스크','거북목','엘보','족저근막','근육','허리','무릎','어깨','목통증','견인'],
 '눈':['안구건조','노안','시력','근시','난시','백내장','시린눈'],
 '코·귀':['비염','이명','축농증','코막힘','귀막힘'],
 '수면':['불면','숙면','수면','코골이','무호흡'],
 '구강':['치아','치주','잇몸','치석','시린이','턱관절','이갈이','구내염'],
 '배변·소화':['변비','숙변','과민성','식도염','역류','위염','소화','치질'],
 '체중':['비만','다이어트','체중','지방','셀룰라이트'],
 '여성':['갱년기','질건조','생리통','다낭성','질염'], '남성·배뇨':['전립선','요실금','배뇨','빈뇨','발기'],
 '피로':['피로'], '알레르기':['알레르기','진드기'],
 '부위—얼굴':['얼굴','이마','눈가','눈밑','입가','턱'], '부위—몸':['종아리','허벅지','복부','겨드랑이','손목','손가락','발바닥'],
 '생활—공기':['공기청정','미세먼지','초미세먼지'], '생활—청소':['청소','살균','소독','바닥','카펫'],
 '생활—소음':['소음','헤드폰','이어폰'], '생활—수면용품':['베개','매트리스'],
 '생활—승차':['승차감','쿠션','벤츠','차량'], '생활—목욕·관광':['목욕','온천여행','온천리조트','찜질','스파']}
noise=re.compile('부작용|후유증|실패|안검하수|눈처짐|부작|후통증|멍|붓기|주사통증|통증부작용')
def uses(kw,seed):
    k=norm(kw)
    if k==norm(seed) or noise.search(k):return []
    rest=k.replace(norm(seed),'')
    if '양치질' in rest:rest=rest.replace('양치질','구강치석')
    found=[label for label,terms in labels.items() if any(t in rest for t in terms)]
    specific=[x for x in found if not x.startswith('부위—')]
    return specific or found

def prepare():
    symbols={}
    for n in needs:
        for s in n['symbols']:
            kws=s.get('keyword') or [s['name']]
            if isinstance(kws,str):kws=[kws]
            seed=kws[0]
            rec=symbols.setdefault(norm(seed),{'symbol':s['name'],'seed':seed,'aliases':[],'sources':[]})
            rec['aliases']=list(dict.fromkeys(rec['aliases']+kws))
            rec['sources'].append({'need_id':n['id'],'symbol_name':s['name']})
    for s in cross:
        seed=s['keyword']
        rec=symbols.setdefault(norm(seed),{'symbol':s['symbol'],'seed':seed,'aliases':[seed],'sources':[]})
        rec['sources'].append({'cross_id':s['id']})
    missing=set();src_rows=[]
    # 당일 연관표는 출처를 붙인 후보풀로만 사용하며 특정 seed의 전용 연관 결과로 취급하지 않는다.
    relpool={}
    for fp in sorted(D.glob('네이버-*.txt')):
        active=False
        for line in fp.read_text(encoding='utf-8-sig').splitlines():
            if line.startswith('## '):active='연관키워드' in line
            if not active:continue
            mt=re.match(r'- (.+?): ([\d,]+) \(PC',line)
            if mt:relpool[norm(mt[1])]={'keyword':mt[1],'total':int(mt[2].replace(',','')),'measured':'2026-10-13 원본 연관표 재사용','file':str(fp),'autocomplete':[]}
    for k,v in relpool.items():old.setdefault(k,v)
    for r in symbols.values():
        cands=[]
        for alias in r['aliases']:
            m=old.get(norm(alias),{})
            for kw in m.get('autocomplete',[]):
                groups=uses(kw,alias)
                if groups:cands.append({'kw':kw,'uses':groups,'origin':'자동완성','seed':alias,'source':m.get('file'),'measured':m.get('measured')})
            for kw,mr in relpool.items():
                if norm(alias) in kw and uses(kw,alias):cands.append({'kw':mr['keyword'],'uses':uses(kw,alias),'origin':'기존 연관표 후보풀','seed':alias,'source':mr['file'],'measured':mr['measured']})
        r['candidates']=list({norm(c['kw']):c for c in cands}.values())
        if norm(r['seed']) not in old:missing.add(r['seed'])
        for c in r['candidates']:
            if norm(c['kw']) not in old:missing.add(c['kw'])
    for n in needs:
        main=n['main_keyword'];m=old.get(norm(main),{})
        candidates=[]
        for kw in m.get('autocomplete',[]):
            if noise.search(norm(kw)):continue
            matches=[]
            for s in n['symbols']:
                for sk in s.get('keyword',[]):
                    if norm(sk) in norm(kw):matches.append(s['name'])
            for term in ['레이저','주사','수술','보톡스','스케일링','교정','약','영양제','크림','연고','이노시톨','유산균','찜질','보호대','물리치료','도수치료','한약','한의원','치료제']:
                if term in norm(kw).replace(norm(main),''):matches.append(term)
            if matches:
                candidates.append({'kw':kw,'matches':list(dict.fromkeys(matches)),'source':m.get('file'),'measured':m.get('measured')})
                if norm(kw) not in old:missing.add(kw)
        src_rows.append({'need':n['need'],'main_kw':main,'vol':m.get('total'),'candidates':candidates,'measured':m.get('measured')})
    save('_기존값.json',old)
    save('_조회계획.json',{'created':datetime.datetime.now().astimezone().isoformat(),'symbols':list(symbols.values()),'needs':src_rows,'missing':sorted(missing),'limitations':['자동완성·기존 연관표 후보풀 범위만 분류','분류표는 탐색 보조이며 소비자 대표연상 조사 아님','검색에 없는 쓰임을 추정해서 채우지 않음']})
    print(json.dumps({'symbols':len(symbols),'needs':len(src_rows),'missing_queries':len(missing)},ensure_ascii=False))

def fetch():
    plan=read(P/'_조회계획.json');fp=P/'_추가실측.json';data=read(fp) if fp.exists() else {}
    missing=[q for q in plan['missing'] if norm(q) not in data]
    for i in range(0,len(missing),20):
        qs=missing[i:i+20]
        run=subprocess.run([sys.executable,str(TOOL),*qs,'--rel','3'],capture_output=True,text=True,encoding='utf-8',timeout=300)
        name=f'네이버-추가-{i//20+1:02}.txt'
        (P/name).write_text(run.stdout,encoding='utf-8')
        if run.returncode or '[ERR]' in run.stdout:
            save('_조회오류.json',{'batch':qs,'returncode':run.returncode,'output_file':name,'stderr':run.stderr[-600:]});print('STOP error '+name,flush=True);return
        stamp=next((x for x in run.stdout.splitlines() if x.startswith('# 측정:')),'측정시각 미상')
        for line in run.stdout.splitlines():
            mt=re.match(r'- (.+?): ([\d,]+) / ([\d,]+) / ([\d,]+) /',line)
            if mt:
                q,pc,mo,v=mt.groups();data[norm(q)]={'keyword':q,'pc':int(pc.replace(',','')),'mobile':int(mo.replace(',','')),'total':int(v.replace(',','')),'measured':stamp,'file':str(P/name)}
            elif line.startswith('- ') and '결과 없음(10 미만 또는 미등록)' in line:
                q=line[2:].split(':',1)[0];data[norm(q)]={'keyword':q,'total':None,'status':'10미만 또는 미등록;0확정아님','measured':stamp,'file':str(P/name)}
        save('_추가실측.json',data)
        print(f'{min(i+20,len(missing))}/{len(missing)} queries saved',flush=True)

def build():
    plan=read(P/'_조회계획.json');vals=read(P/'_기존값.json');vals.update(read(P/'_추가실측.json') if (P/'_추가실측.json').exists() else {})
    relations=read(P/'_개별연관.json') if (P/'_개별연관.json').exists() else {}
    for r in plan['symbols']:
        for c in r['candidates']:c['uses']=uses(c['kw'],c.get('seed',r['seed']))
        known={norm(x['kw']) for x in r['candidates']}
        for c in relations.get(norm(r['seed']),{}).get('related',[]):
            # 광고용 연관어는 다른 병명도 반환한다. 상징이 함께 적힌 복합어만 용도 근거로 인정한다.
            if not any(norm(a) in norm(c['keyword']) for a in r['aliases']):continue
            groups=uses(c['keyword'],r['seed'])
            if groups and norm(c['keyword']) not in known:
                r['candidates'].append({'kw':c['keyword'],'uses':groups,'origin':'해당 상징 단독 조회 연관키워드 상위3','seed':r['seed']})
                vals.setdefault(norm(c['keyword']),c);known.add(norm(c['keyword']))
    for n in plan['needs']:
        known={norm(x['kw']) for x in n['candidates']}
        for c in relations.get(norm(n['main_kw']),{}).get('related',[]):
            if norm(n['main_kw']) not in norm(c['keyword']):continue
            rest=norm(c['keyword']).replace(norm(n['main_kw']),'')
            tags=[t for t in ['레이저','주사','수술','보톡스','스케일링','교정','약','영양제','크림','연고','이노시톨','유산균','찜질','보호대','물리치료','도수치료','한약','한의원','치료제'] if t in rest]
            if tags and norm(c['keyword']) not in known and not noise.search(c['keyword']):
                n['candidates'].append({'kw':c['keyword'],'matches':tags});vals.setdefault(norm(c['keyword']),c)
    out=[]
    for r in plan['symbols']:
        rows=[]
        for c in r['candidates']:
            m=vals.get(norm(c['kw']),{})
            for u in c['uses']:rows.append({'use':u,'kw':c['kw'],'vol':m.get('total'),'measured':m.get('measured'),'source':m.get('file'),'candidate_origin':c['origin']})
        rows.sort(key=lambda x:-(x['vol'] if isinstance(x['vol'],int) else -1))
        top=[];seen=set();seen_kw=set()
        for x in rows:
            if x['use'] in seen or norm(x['kw']) in seen_kw or not isinstance(x['vol'],int) or x['vol']<=0:continue
            seen.add(x['use']);seen_kw.add(norm(x['kw']));top.append(x)
            if len(top)==3:break
        base=vals.get(norm(r['seed']),{})
        out.append({'symbol':r['symbol'],'main_kw':r['seed'],'vol':base.get('total'),'top3':top,'needs_in_top3':[x['use'] for x in top],'measured':base.get('measured'),'source':base.get('file'),'missing_top3':3-len(top),'candidates':rows,'related_observed':relations.get(norm(r['seed']),{}).get('related',[]),'aliases':r['aliases'],'source_dictionary_records':r['sources'],'interpretation':'상징명과 부위·결핍이 같이 적힌 검색 문자열만 정렬. 광고 연관표의 다른 병명은 related_observed에만 보존. 실제 치료 용도·소비자 첫 연상·상징 적합성 확정 아님.'})
    rout=[]
    for n in plan['needs']:
        rows=[]
        for c in n['candidates']:
            m=vals.get(norm(c['kw']),{})
            rows.append({'name':' / '.join(c['matches']),'kw':c['kw'],'vol':m.get('total'),'measured':m.get('measured'),'source':m.get('file')})
        rows.sort(key=lambda x:-(x['vol'] if isinstance(x['vol'],int) else -1))
        rout.append({'need':n['need'],'main_kw':n['main_kw'],'vol':n['vol'],'symbols':rows,'related_observed':relations.get(norm(n['main_kw']),{}).get('related',[]),'measured':n['measured'],'interpretation':'결핍과 대안명이 함께 관찰된 검색어. 병원·약 등 일반어는 고유 상징으로 확정하지 않음.'})
    save('대표연상.json',out);save('결핍별-해결상징.json',rout)
    save('_검증.json',{'symbols':len(out),'need_records':len(rout),'measured_top3_full':sum(len(x['top3'])==3 for x in out),'no_use_signal':sum(not x['top3'] for x in out),'new_queries':len(read(P/'_추가실측.json')) if (P/'_추가실측.json').exists() else 0,'pending_queries':[q for q in plan['missing'] if norm(q) not in vals]})
    print((P/'_검증.json').read_text(encoding='utf-8'))

def relations():
    plan=read(P/'_조회계획.json');fp=P/'_개별연관.json';data=read(fp) if fp.exists() else {}
    seeds=list(dict.fromkeys([r['seed'] for r in plan['symbols']]+[r['main_kw'] for r in plan['needs']]))
    for i,seed in enumerate(seeds):
        if norm(seed) in data:continue
        run=subprocess.run([sys.executable,str(TOOL),seed,'--rel','3'],capture_output=True,text=True,encoding='utf-8',timeout=90)
        name=f'네이버-연관-{i+1:03}.txt';(P/name).write_text(run.stdout,encoding='utf-8')
        if run.returncode or '[ERR]' in run.stdout:
            print('STOP relation query '+name,flush=True);return
        stamp=next((x for x in run.stdout.splitlines() if x.startswith('# 측정:')),'측정시각 미상')
        rows=[];active=False
        for line in run.stdout.splitlines():
            if line.startswith('## '):active='연관키워드' in line
            if not active:continue
            mt=re.match(r'- (.+?): ([\d,]+) \(PC',line)
            if mt:rows.append({'keyword':mt[1],'total':int(mt[2].replace(',','')),'measured':stamp,'file':str(P/name)})
        data[norm(seed)]={'seed':seed,'related':rows,'file':str(P/name),'purpose':'과거 묶음조회에서 씨앗별로 분리되지 않았던 연관 상위3 측정. 이미 있는 정확어 수치는 덮어쓰지 않음.'}
        save('_개별연관.json',data)
        if (i+1)%20==0:print(f'relations {i+1}/{len(seeds)} saved',flush=True)
    print(f'relations {len(data)} saved',flush=True)

if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('phase',choices=['prepare','fetch','relations','build']);args=a.parse_args();globals()[args.phase]()

"""Public-only voice research v2. Existing crawlers/rulebooks are not modified."""
import argparse, collections, datetime, hashlib, json, math, os, re, subprocess, sys, time
from concurrent.futures import ThreadPoolExecutor
import threading
from pathlib import Path
from urllib.parse import urljoin, urlparse, parse_qs, urlencode, urlunparse
from voice_rate import gate, provider, observe, visible, STATE

ROOT = Path(__file__).resolve().parents[4]
OUT = ROOT / '마케팅/프로젝트/DA-기획/기초분석-v2'
OLD = ROOT / '마케팅/프로젝트/DA-기획/기초분석'
LEARN = ROOT / '마케팅/프로젝트/DA-기획/기획-시스템/자가학습'
HERE = Path(__file__).parent
REVIEW_STATUS = '사장님 수동(쿠팡·네이버) 대기'
NEEDS = {
 '족저근막염': (['족저근막염','발뒤꿈치통증','발바닥통증'], ['체외충격파','스테로이드주사','도수치료','족저근막염깔창','족저근막염슬리퍼','족저근막염보호대','족저근막염스트레칭','풋롤러','발마사지기','소염진통제']),
 '역류성식도염': (['역류성식도염','위산역류','가슴쓰림'], ['개비스콘','겔포스','양배추즙','위산억제제','PPI','역류성식도염베개','양배추환','역류성식도염유산균','역류성식도염식단','알마겔']),
 '손목터널증후군': (['손목터널증후군','손저림','손목통증'], ['손목보호대','손목스플린트','스테로이드주사','손목터널수술','손목스트레칭','파라핀치료','손목마사지기','소염진통제','신경차단술','손목부목']),
 '쥐젖': (['쥐젖','쥐젖제거','목쥐젖'], ['쥐젖레이저','쥐젖제거크림','쥐젖연고','냉동치료','CO2레이저','쥐젖제거펜','피부과쥐젖제거','쥐젖패치','쥐젖식초','쥐젖제거비용']),
 '허리디스크': (['허리디스크','추간판탈출증','허리통증'], ['신경차단술','도수치료','척추견인치료','허리보호대','거꾸리','맥켄지운동','소염진통제','허리디스크수술','온열찜질','허리디스크스트레칭']),
 '불면증': (['불면증','잠이안와요','수면장애'], ['멜라토닌','수면제','수면유도제','마그네슘','테아닌','감태','불면증인지행동치료','수면명상','불면증영양제','수면귀마개']),
 '갱년기증상': (['갱년기증상','여성갱년기','갱년기열감'], ['훼라민큐','백수오','에스트로겐','갱년기유산균','회화나무열매','석류즙','호르몬치료','갱년기영양제','갱년기운동','승마추출물']),
 '거북목': (['거북목','일자목','목통증'], ['도수치료','거북목베개','경추베개','목견인기','자세교정밴드','거북목스트레칭','필라테스','폼롤러','추나요법','목마사지기']),
 '티눈': (['티눈','발바닥티눈','티눈제거'], ['티눈밴드','티눈액','살리실산','냉동치료','티눈제거수술','티눈패드','티눈제거기','발각질제거제','티눈깔창','티눈연고']),
 '오십견': (['오십견','동결견','어깨통증'], ['체외충격파','스테로이드주사','도수치료','오십견스트레칭','어깨찜질팩','어깨마사지기','어깨보호대','오십견수술','소염진통제','수압팽창술'])}

def write(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')

def norm(s): return re.sub(r'\s+', '', s or '').lower()

def classify(row, aliases):
    text=row.get('text',''); context=row.get('context',''); together=text+' '+context
    relevant=any(norm(a) in norm(together) for a in aliases)
    reasons=[]
    if re.search(r'제공받|제공 받|체험단|협찬|유료광고|대가를|원고료|쿠폰|구매\s?링크|제휴\s?링크|파트너스', together):reasons.append('협찬·구매 유도 표시')
    if re.search(r'업체|약국|한의원|의원|병원',row.get('author','')):reasons.append('업체·의료기관 작성자')
    if re.search(r'(추천|구매).{0,60}https?://',text):reasons.append('추천과 링크')
    ambiguous=bool(re.search(r'강추|인생템|정착템|구매하세요|추천드립니다',text))
    professional=bool(re.search(r'의료상담|지식iN.{0,30}(?:상담의|한의사|전문의)|(?:한의사|약사|의사)\s?[가-힣]{2,4}\s?입니다',text,re.I))
    if row.get('type')=='질문' and re.search(r'\([가-힣]+\s?\d{2}대.{0,15}/',text):ambiguous=True
    experience=not professional and bool(re.search(r'저도|저는|제가|나도|나는|내가|겪었|겪고|써봤|써 봤|먹어봤|먹어 봤|받았|받아봤|맞았|해봤|해 봤|다녀왔|수술했|사용했|쓰고 있|먹고 있|아파서|아팠|치료받|\d+\s?(?:개월|년|주|일)째|샀어요|샀구|받고|앓고|아파요|아프네요|복용중|먹었',text))
    return {'relevant':relevant,'experience':experience,'professional_answer':professional,'ad':'의심' if reasons else '애매' if ambiguous else '뚜렷한 신호 없음','ad_reasons':reasons,'exclusion': '' if relevant else '결핍·증상과의 연결 미확인'}

def deduplicate(rows):
    chosen={}
    for r in rows:
        key=(r.get('url',''),r.get('type',''),'' if r.get('type') in ('글','질문') and r.get('url') else norm(r.get('text','')))
        old=chosen.get(key)
        if old is None or len(r.get('text',''))>len(old.get('text','')):chosen[key]=r
    return list(chosen.values())

def sample_comments(rows):
    other=[r for r in rows if r.get('source')!='유튜브 댓글'];yt=[r for r in rows if r.get('source')=='유튜브 댓글']
    return other+yt[:len(other)//4]

def product_decision(title, aliases, reviews):
    fit=any(norm(a) in norm(title) for a in aliases)
    n=sum(any(norm(a) in norm(t) for a in aliases) for t in reviews[:30]);ratio=n/len(reviews[:30]) if reviews else None
    return {'accepted':fit and len(reviews)>=30 and n>=15,'explicit_fit':fit,'review_count':len(reviews[:30]),'relevant_reviews':n,'ratio':ratio,'reason':'채택' if fit and len(reviews)>=30 and n>=15 else '직접 적합성/후기30개/50% 기준 중 미충족'}

def get(url,params=None):
    import requests
    site=provider(url)
    with gate(site):
        r=requests.get(url,params=params,headers={'User-Agent':'Mozilla/5.0'},timeout=18)
        observe(site,r.status_code,visible(r.text))
        r.raise_for_status()
        if any(x in r.url for x in ['nid.naver.com','captcha']):raise ValueError('login_or_captcha')
        return r

def canonical(url):
    p=urlparse(url); q=parse_qs(p.query)
    if 'kin.naver.com' in p.netloc:
        p=p._replace(query=urlencode({k:q[k][0] for k in ('dirId','docId') if k in q}),fragment='')
    elif 'cafe.naver.com' in p.netloc and 'articleid' in {k.lower() for k in q}:
        p=p._replace(query=urlencode({k:v[0] for k,v in q.items() if k.lower() in ('clubid','articleid')}),fragment='')
    else:p=p._replace(query='',fragment='')
    return urlunparse(p)

def public_search(keyword,kind,order,log):
    from bs4 import BeautifulSoup
    tabs={'카페':'tab.cafe.all','블로그':'tab.blog.all','지식인':'tab.kin.kqna','인스티즈':'tab.nx.all'}
    host={'카페':'cafe.naver.com','블로그':'blog.naver.com','지식인':'kin.naver.com','인스티즈':'instiz.net'}[kind]
    query=keyword+(' site:instiz.net' if kind=='인스티즈' else '')
    out=[];seen=set()
    for start in (1,11,21):
        try:
            if kind=='지식인':
                r=get('https://kin.naver.com/search/list.naver',{'query':query,'page':(start-1)//10+1,'section':'qna','sort':'date' if order=='최신' else 'none'})
            else:
                r=get('https://search.naver.com/search.naver',{'ssc':tabs[kind],'query':query,'start':start,'page':(start-1)//10+1,'nso':'so:'+('dd' if order=='최신' else 'r')+',p:all,a:all','sm':'tab_opt'})
            soup=BeautifulSoup(r.text,'html.parser')
            for a in soup.select('a[href]'):
                url=a['href'];title=a.get_text(' ',strip=True).replace('새 창 열림','').strip()
                if host not in url or len(title)<8:continue
                if kind=='카페' and not re.search(r'/(?:\w+/)?\d+(?:[/?]|$)|articleid=',url,re.I):continue
                if kind=='블로그' and not re.search(r'/\d{8,}',url):continue
                if kind=='지식인' and 'docId=' not in url:continue
                url=canonical(url)
                if url in seen:continue
                el=a;snippet=title
                for _ in range(6):
                    t=el.get_text(' ',strip=True).replace('새 창 열림','')
                    if len(title)+45<=len(t)<=2200:snippet=t;break
                    if not el.parent:break
                    el=el.parent
                cafe_name='';parent=a
                if kind=='카페':
                    for _ in range(8):
                        matches=[b for b in parent.select('a[href]') if 'cafe.naver.com' in b['href'] and re.search(r'/[a-zA-Z][\w-]*/?(?:\?|$)',b['href']) and b.get_text(strip=True)]
                        slug=urlparse(url).path.split('/')[1]
                        matches=[b for b in matches if urlparse(b['href']).path.strip('/')==slug]
                        if matches:cafe_name=matches[0].get_text(' ',strip=True).replace('새 창 열림','').strip();break
                        if not parent.parent:break
                        parent=parent.parent
                out.append({'source':kind+' '+order if kind!='인스티즈' else kind,'type':'질문' if kind=='지식인' else '글','keyword':keyword,'title':title,'text':snippet,'url':url,'author':'','cafe_name':cafe_name,'level':'공개 검색 미리보기','order':order,'search_url':r.url})
                seen.add(url)
                if len(out)>=30:break
        except Exception as e:log.append({'source':kind,'keyword':keyword,'order':order,'error':str(e)[:220]});break
        if len(out)>=30:break
        time.sleep(.4)
    log.append({'source':kind,'keyword':keyword,'order':order,'returned':len(out),'target':30})
    return out

def details(row,cache,log):
    from bs4 import BeautifulSoup
    url=row['url']
    if url in cache:return {**row,**cache[url]}
    try:
        r=get(url);s=BeautifulSoup(r.text,'html.parser')
        if 'blog.naver.com' in url:
            frame=s.select_one('iframe#mainFrame')
            if frame:s=BeautifulSoup(get(urljoin(r.url,frame.get('src',''))).text,'html.parser')
        selectors=('.questionDetail','.c-heading__content') if row['type']=='질문' else ('.se-main-container','.post-view','.ArticleContentBox','.article_view','.view_text')
        bits=[s.select_one(q) for q in selectors];bits=[x for x in bits if x]
        if bits:
            body='\n'.join(x.get_text(' ',strip=True) for x in bits)
            if len(body)>50 and not re.search(r'로그인 후|로그인이 필요|멤버만|회원만',body):
                cache[url]={'text':row['title']+'\n'+body,'level':'공개 전체 본문'}
                if row['type']=='질문':
                    cache[url]['answers']=[x.get_text(' ',strip=True) for x in s.select('.answerDetail')]
        cache.setdefault(url,{'detail_status':'본문 미확보—미리보기만 사용'})
    except Exception as e:
        cache[url]={'detail_status':str(e)[:160]};log.append({'source':row['source'],'url':url,'error':str(e)[:180]})
    return {**row,**cache[url]}

def keywords(need,folder):
    p=folder/'키워드.json'
    if p.exists():
        cached=json.loads(p.read_text(encoding='utf-8'))
        if cached.get('encoding')=='UTF-8':return cached
        raw=folder/'검색량-실측.txt'
        if raw.exists() and not (folder/'검색량-초기인코딩오류.txt').exists():raw.rename(folder/'검색량-초기인코딩오류.txt')
    main,seeds=NEEDS[need];dic=json.loads((LEARN/'상징원-사전/결핍별.json').read_text(encoding='utf-8-sig'))
    row=next((x for x in dic if x['need']==need or need in x['need']),{})
    existing=[]
    for sym in row.get('symbols',[]):existing.extend(sym.get('keyword',[]))
    knowledge=LEARN/'결핍지식'/f'{need}.json'
    known=[]
    if knowledge.exists():known=[x['name'] for x in json.loads(knowledge.read_text(encoding='utf-8-sig')).get('alternatives',[])]
    candidates=list(dict.fromkeys(seeds+existing[:8]+known[:5]));inputs=list(dict.fromkeys(re.sub(r'[^가-힣A-Za-z0-9]','',x) for x in main+candidates));inputs=[x for x in inputs if x]
    result=subprocess.run([sys.executable,'-X','utf8',str(HERE/'voice_rate_runtime.py'),str(HERE/'naver_kw.py'),*inputs,'--rel','20'],capture_output=True,text=True,encoding='utf-8',errors='replace',timeout=900)
    (folder/'검색량-실측.txt').write_text(result.stdout+'\n'+result.stderr,encoding='utf-8')
    volumes={}
    for line in result.stdout.splitlines():
        m=re.match(r'- (.+?): ([\d,]+) / ([\d,]+) / ([\d,]+)',line)
        if m:volumes[m[1]]=int(m[4].replace(',',''))
    # Preserve category diversity from the ten curated candidates; order by measured volume.
    alternatives=sorted(seeds,key=lambda k:volumes.get(k.replace(' ',''),-1),reverse=True)
    data={'need':need,'measured_at':datetime.datetime.now().astimezone().isoformat(),'main':[{'keyword':k,'monthly_search_volume':volumes.get(k.replace(' ',''))} for k in sorted(main,key=lambda k:volumes.get(k,-1),reverse=True)],'alternatives':[{'keyword':k,'monthly_search_volume':volumes.get(k.replace(' ','')),'collection_query':k if need in k else need+' '+k} for k in alternatives],'all_measured':volumes,'source_files':[str(LEARN/'상징원-사전/결핍별.json'),str(knowledge) if knowledge.exists() else None],'existing_candidate_keywords':existing,'existing_knowledge_alternatives':known,'candidate_note':'기존 대안과 조사 확장 후보. 효능·민간요법 안전성 승인 아님. 적합한 건강기능식품 후보가 없는 결핍은 해당 범주를 억지로 채우지 않음.','returncode':result.returncode}
    data['encoding']='UTF-8'
    data['category_note']='병원 치료·약·셀프 기기·생활요법 후보를 함께 검색했다. 건강기능식품 후보가 자연스럽게 없는 결핍에서는 근거 없는 치료 대안을 만들지 않았다.'
    write(p,data);return data

def community(need,kws,folder,log,sites='natepann'):
    import voice_crawl,voice_count
    allrows=[]
    k=json.loads((folder/'키워드.json').read_text(encoding='utf-8'))
    community_queries=[x['keyword'] for x in k['main']]+[x['keyword'] for x in k['alternatives']]
    for sites,queries in [(sites,community_queries if sites!='youtube' else [need])]:
        dest=folder/('커뮤니티-'+sites);dest.mkdir(exist_ok=True)
        def runner(cmd,**kw):
            paced=[cmd[0],'-X','utf8',str(HERE/'voice_rate_runtime.py'),cmd[1],*cmd[2:]]
            return subprocess.run(paced,timeout=1800,**kw)
        def collect(query):
            existing=dest/(voice_crawl.safe(query)+'.xlsx')
            if existing.exists():return
            # Isolated output directories avoid concurrent updates to _수집.json.
            part=OUT/'_공유-커뮤니티'/sites/voice_crawl.safe(query)
            try:voice_crawl.run([query],str(part),sites=sites,max_posts=30,filt='smart',runner=runner)
            except Exception as e:log.append({'source':sites,'keyword':query,'error':type(e).__name__+': '+str(e)[:150]})
        for i,query in enumerate(queries):
            if i:time.sleep(30)  # preserve voice_crawl's default inter-keyword pause
            collect(query)
        files=list(dest.glob('*.xlsx'))
        for query in queries:files+=list((OUT/'_공유-커뮤니티'/sites/voice_crawl.safe(query)).glob('*.xlsx'))
        for f in files:
            try:
                context_by_url={};rawrows=voice_count.load_rows(f)
                for raw in rawrows:
                    cells=(list(raw)+[None]*11)[:11]
                    if cells[0]=='게시글':context_by_url[cells[6] or '']=(str(cells[3] or '')+' '+str(cells[4] or ''))[:3000]
                for u in voice_count.units_from_rows(rawrows):
                    allrows.append({'source':u['사이트'] if u['종류']!='유튜브 댓글' else '유튜브 댓글','type':u['종류'],'text':u['글'],'url':u['url'],'context':context_by_url.get(u['url'],'') if '댓글' in u['종류'] else '', 'level':'기존 공개 크롤러 본문/댓글','likes':u['좋아요'],'raw_file':str(f)})
            except Exception as e:log.append({'source':sites,'file':str(f),'error':str(e)[:140]})
    return allrows

def shopping(need,aliases,folder,log):
    return [], []  # Shopping collection cancelled; manual files are a later request.

def videos(need,folder,log):
    import yt_dlp
    from youtube_transcript_api import YouTubeTranscriptApi
    import ad_media
    p=folder/'영상-원자료.json'
    if p.exists():return json.loads(p.read_text(encoding='utf-8'))
    opts={'quiet':True,'no_warnings':True,'extract_flat':True,'skip_download':True,'socket_timeout':18,'retries':0}
    chosen=[];seen=set()
    for query in [need+' 치료 후기 경험',need+' 의사 설명']:
        try:
            with gate('youtube'),yt_dlp.YoutubeDL(opts) as y:info=y.extract_info('ytsearch8:'+query,download=False)
            for e in info.get('entries',[]):
                if e and re.fullmatch(r'[A-Za-z0-9_-]{11}',e.get('id','')) and e.get('id') not in seen:
                    seen.add(e['id']);chosen.append({'id':e['id'],'title':e.get('title',''),'url':'https://www.youtube.com/watch?v='+e['id'],'selection_query':query})
        except Exception as e:log.append({'source':'유튜브 검색','error':str(e)[:220]})
    transcript_blocked=False
    for rec in chosen[:15]:
        if transcript_blocked:rec['status']='앞 영상에서 IP/봇 차단—같은 경로 반복하지 않음';continue
        try:
            with gate('youtube'):fetched=YouTubeTranscriptApi().fetch(rec['id'],languages=['ko','en'])
            rec['transcript']='\n'.join(x.text for x in fetched);rec['method']='공개 자막'
        except Exception as e:
            rec['subtitle_error']=str(e)[:180]
            if re.search(r'IpBlocked|429|RequestBlocked|bot',str(e),re.I):
                rec['status']='차단—우회하지 않음';transcript_blocked=True
                try:observe('youtube',429,str(e))
                except RuntimeError:pass
                continue
            try:
                audio=folder/'음성';audio.mkdir(exist_ok=True)
                with yt_dlp.YoutubeDL({'quiet':True,'no_warnings':True,'format':'bestaudio[ext=m4a]/bestaudio','outtmpl':str(audio/(rec['id']+'.%(ext)s')),'socket_timeout':18,'retries':0,'noplaylist':True}) as y:
                    with gate('youtube'):info=y.extract_info(rec['url'],download=False)
                    if info.get('duration',0)>1800:raise ValueError('30분 초과—짧은 경험/설명 영상 우선')
                    if info.get('vcodec') not in ('none',None):raise ValueError('영상 포함 형식은 다운로드 금지')
                    with gate('youtube'):y.download([rec['url']])
                f=next(audio.glob(rec['id']+'.*'));segments=ad_media.transcribe(str(f))
                rec['transcript']=ad_media.fmt_segments(segments);rec['method']='음성만·로컬 faster-whisper';rec['status']='전사 완료' if segments else '로컬 전사 실패'
            except Exception as err:rec['status']='음성/전사 미확보';rec['audio_error']=str(err)[:220]
        write(p,chosen[:15]);time.sleep(.5)
    write(p,chosen[:15]);return chosen[:15]

def grouping(need,k):
    alternatives={a['keyword']:[a['keyword'],a['keyword'].replace(need,'').strip()] for a in k['alternatives']}
    groups={'증상·장면':{'통증':['통증','아프','아파','저림'],'수면·아침':['잠','수면','아침','밤'],'일·활동':['걷','운동','서 있','업무','일할'],'외모·보이는 것':['보이','외모','거울','흉터']},'써 본 대안·효과 인식':alternatives,'대안별 불만':{'효과 부족':['효과 없','효과없','소용없','안 낫','그때뿐'],'재발':['재발','다시 아','반복'],'비용 부담':['비싸','비용','가격','실비'],'사용 불편':['불편','귀찮','번거','아파서']},'꺼리는 점':{'부작용·안전':['부작용','위험','무서','걱정','내성'],'침습·통증':['수술','주사','바늘','아프'],'기간·반복':['오래','몇 달','반복','계속']}}
    return {section:{label:'|'.join(''.join(re.escape(c)+r'\s*' for c in norm(word)) for word in words if word) for label,words in items.items()} for section,items in groups.items()}

def finish(need,k,rows,products,vids,log,folder):
    import voice_count
    aliases=[x['keyword'] for x in k['main']]
    parser_invalid=[r for r in rows if r.get('type')=='질문' and r.get('level')=='공개 답변 본문']
    if parser_invalid:log.append({'source':'캐시 검사','excluded':len(parser_invalid),'error':'초기 캐시의 질문/답변 유형 불일치. 원자료는 보존하고 잘못 분류된 중복 단위는 제외.'})
    rows=[r for r in rows if r not in parser_invalid]
    tagged=[{**r,**classify(r,aliases)} for r in rows]
    cafe_names={urlparse(r['url']).path.split('/')[1]:r['cafe_name'] for r in tagged if r.get('cafe_name') and 'cafe.naver.com' in r['url'] and len(urlparse(r['url']).path.split('/'))>1}
    for r in tagged:
        if 'cafe.naver.com' in r['url'] and not r.get('cafe_name'):
            r['cafe_name']=cafe_names.get(urlparse(r['url']).path.split('/')[1], '공개 검색에서 카페 이름 미확보')
    texts=collections.defaultdict(set)
    for r in tagged:
        if len(norm(r['text']))>70:texts[norm(r['text'])].add(r['url'])
    for r in tagged:
        if len(texts[norm(r['text'])])>1 and r.get('source','').startswith('블로그'):
            r['ad']='애매';r['ad_reasons'].append('다른 글/검색 경로의 동일 문구—중복을 광고로 단정하지 않음')
    unique=deduplicate(tagged)
    eligible=[r for r in unique if r['relevant'] and r['ad']=='뚜렷한 신호 없음' and not r['professional_answer'] and (r['type']!='답변' or r['experience'])]
    sampled=sample_comments(eligible)
    stats={}
    for source in sorted({r['source'] for r in unique}):
        sr=[r for r in unique if r['source']==source];den=len(sr)
        stats[source]={'raw_unique':den,'posts':sum(r['type'] in ('글','질문') for r in sr),'comments':sum('댓글' in r['type'] for r in sr),'reviews':sum(r['type']=='후기' for r in sr),'experience':sum(r['experience'] and r['relevant'] and r['ad']=='뚜렷한 신호 없음' for r in sr),'ad_suspected':sum(r['ad']=='의심' for r in sr),'ambiguous':sum(r['ad']=='애매' for r in sr),'ad_ratio':sum(r['ad']=='의심' for r in sr)/den if den else None}
    exp=sum(r['experience'] for r in sampled)
    write(folder/'원자료.json',tagged);write(folder/'정제-목소리.json',sampled)
    mapped=[{'사이트':r['source'],'종류':r['type'],'글':r['text'],'좋아요':r.get('likes',0),'url':r['url']} for r in sampled]
    groups=grouping(need,k)
    report=voice_count.render(need,[str(folder/'원자료.json')],mapped,mapped,voice_count.count(mapped,mapped,groups),2,'v2 광고 의심·애매·무관 제외. 유튜브 댓글20% 이하. 미리보기와 본문은 원자료 level로 구분. 대안 효과는 의료 효능이 아니라 발화의 인식이다.')
    report+='\n\n## v2 표본과 한계\n\n'+f'- 원단위{len(rows)}, 중복 제외{len(unique)}, 비중표 단위{len(sampled)}, 유효 경험 단위{exp}/목표1000.\n- 경험 부족분 '+str(max(0,1000-exp))+'건. 실제 사용자 전체/시장 비중으로 일반화하지 않는다.\n- 대안별 효과 인식 표는 대안 언급과 긍정/부정 문구의 같은 발화 내 공존을 센다. 인과·치료효과 확정이 아니다.\n'
    report+='- 기존 voice_count 표의 입력/정제 수치는 이미 v2 정제를 통과한 비중표 단위다. 수집 전체와 광고 의심 제외 수는 아래 v2 출처표 및 수집기록.json을 본다.\n'
    report+='\n| 출처 | 고유 단위 | 경험 | 광고 의심 | 애매 | 광고 의심 비율 |\n|---|---:|---:|---:|---:|---:|\n'
    for s,v in stats.items():report+=f"| {s} | {v['raw_unique']} | {v['experience']} | {v['ad_suspected']} | {v['ambiguous']} | {v['ad_ratio']:.1%} |\n"
    report+='\n## 대안별 경험·효과 인식·불만·꺼림\n\n| 대안 | 경험 발화 | 긍정 표현 | 부정 표현 | 비용/사용 불만 | 꺼림 |\n|---|---:|---:|---:|---:|---:|\n'
    for name,words in groups['써 본 대안·효과 인식'].items():
        subset=[r for r in sampled if r['experience'] and re.search(words,r['text'],re.I)]
        patterns=[r'좋아졌|나았|나아졌|효과.{0,5}있|도움|완화|덜 아',r'효과.{0,3}없|소용없|안 낫|재발|그때뿐',r'비싸|비용|가격|불편|귀찮|번거',r'부작용|위험|무서|걱정|내성']
        counts=[sum(bool(re.search(p,r['text'])) for r in subset) for p in patterns]
        report+=f"| {name} | {len(subset)} | {' | '.join(map(str,counts))} |\n"
    (folder/'목소리-비중표.md').write_text(report,encoding='utf-8')
    sample='\n\n'.join(f"[{i+1}] {r['source']} / {r['level']} / 경험:{r['experience']}\n{r['url']}\n{r['text']}" for i,r in enumerate(sampled[:160]))
    (folder/'목소리-표본.txt').write_text(sample,encoding='utf-8')
    summary=['# '+need+' 영상 자료','', '영상/이미지는 수집하지 않았다. 아래 내용은 공개 자막 또는 로컬 음성 전사에서 발췌한 문장이다. 임상 효능 판정이나 사용자 목소리 비중표의 분모에 포함하지 않는다.','']
    for v in vids:
        summary += ['## '+v['title'],v['url'],'방법: '+v.get('method',v.get('status','자막/음성 미확인'))]
        transcript=v.get('transcript','')
        for label,pattern in [('대안',r'치료|주사|수술|운동|약|보호대|깔창|영양제'),('가격',r'만원|천원|원 정도|비용|가격'),('부작용',r'부작용|위험|내성|주의'),('경험',r'저는|제가|저도|환자분|경험')]:
            lines=[x.strip() for x in transcript.splitlines() if re.search(pattern,x)]
            summary.append('- '+label+': '+(' / '.join(lines[:5])[:1100] if lines else '확보한 전사에서 관련 문장 미확인'))
    (folder/'영상-요약.md').write_text('\n\n'.join(summary),encoding='utf-8')
    record={'need':need,'status':'완료—미달/차단은 아래 보존','at':datetime.datetime.now().astimezone().isoformat(),'units':len(sampled),'experience':exp,'experience_target':1000,'sources':stats,'alternative_keyword_count':len(k['alternatives']),'products_attempted':len(products),'products_accepted':sum(p.get('accepted',False) for p in products),'products':[{x:y for x,y in p.items() if x!='reviews'} for p in products],'videos_selected':len(vids),'videos_transcribed':sum(bool(v.get('transcript')) for v in vids),'youtube_comments_in_table':sum(r['source']=='유튜브 댓글' for r in sampled),'unrelated_count':sum(not r['relevant'] for r in unique),'unrelated_examples':[{'text':r['text'][:200],'url':r['url'],'reason':r['exclusion']} for r in unique if not r['relevant']][:3],'failures':log,'limitations':['경험 판정은 표현에 근거한다. 실구매·본인성을 외부에서 확인한 것은 아니다.','검색 미리보기는 전체 본문이 아니다. 공개 전체 본문을 확보한 단위만 level에 표시한다.','출처별 검색 경로에 중복이 있을 수 있다. 비중표는 URL/문면 중복을 제외한 단위를 분모로 쓴다.']}
    record['reviews']=REVIEW_STATUS
    record['shopping_collection']='중단—수동 파일 선별·비중표 통합은 별도 요청'
    retrieval={}
    for source in sorted({r['source'] for r in tagged}):
        sr=deduplicate([r for r in tagged if r['source']==source]);den=len(sr)
        retrieval[source]={'source_unique_units':den,'ad_suspected':sum(r['ad']=='의심' for r in sr),'ambiguous':sum(r['ad']=='애매' for r in sr),'ad_ratio':sum(r['ad']=='의심' for r in sr)/den if den else None}
    record['retrieval_sources_before_cross_source_dedupe']=retrieval
    write(folder/'수집기록.json',record)
    return record

def progress(need,stage):
    OUT.mkdir(parents=True,exist_ok=True)
    p=OUT/'_상태.json';d=json.loads(p.read_text(encoding='utf-8')) if p.exists() else {}
    d[need]={'stage':stage,'at':datetime.datetime.now().astimezone().isoformat()};write(p,d)
    lines=['# 목소리 조사 v2 진행','', '| 결핍 | 상태 | 경험 수 | 후기 상태 |','|---|---|---:|---|']
    for name in NEEDS:
        f=OUT/name/'수집기록.json';r=json.loads(f.read_text(encoding='utf-8')) if f.exists() else {}
        lines.append(f"| {name} | {d.get(name,{}).get('stage','대기')} | {r.get('experience','')} | {r.get('reviews',REVIEW_STATUS)} |")
    (OUT/'_진행.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    sessions=Path.home()/'.codex/sessions/2026/10/14'
    source=next(sessions.glob('*01a13854-d649-7071-9b8d-a380ac179a06*'),None)
    if source:
        latest=None
        with source.open('rb') as f:
            f.seek(max(0,source.stat().st_size-3*1024*1024));tail=f.read().splitlines()
        for line in reversed(tail):
            if b'"token_count"' not in line:continue
            try:event=json.loads(line)
            except ValueError:continue
            info=event.get('payload',{}).get('info')
            if info and info.get('total_token_usage'):
                latest={'timestamp':event.get('timestamp'),'usage':info['total_token_usage'],'source':str(source)};break
        if latest:
            usagepath=OUT/'단계-사용량.json';history=json.loads(usagepath.read_text(encoding='utf-8')) if usagepath.exists() else []
            history.append({'need':need,'stage':stage,'observed':latest,'note':'대화 전체 관측이며 단계 자체 비용은 앞 관측과의 차분으로 구분. 수집 스크립트는 모델을 호출하지 않는다.'});write(usagepath,history)

def collect_public(need,queries,folder,log):
    rawpath=folder/'공개검색-원자료.json';rows=[];cache={}
    if rawpath.exists():rows=json.loads(rawpath.read_text(encoding='utf-8'))
    for row in rows:
        if row.get('type')=='답변':continue
        cache[row['url']]={key:row[key] for key in ('text','level','answers','detail_status') if key in row}
    complete_file=folder/'공개검색-완료.json'
    complete=json.loads(complete_file.read_text(encoding='utf-8')) if complete_file.exists() else {}
    if complete.get('version',0)<2:
        done={(e.get('keyword'),e.get('source'),e.get('order')) for e in log if 'returned' in e and not (e.get('source')=='지식인' and e['returned']<30)}
        lock=threading.Lock()
        def collect_query(query):
            additions=[];local_log=[]
            for kind in ['카페','블로그','지식인']:
                for order in ['관련도','최신']:
                    if (query,kind,order) in done:continue
                    for row in public_search(query,kind,order,local_log):
                        row=details(row,cache,local_log);additions.append(row)
                        for answer in row.get('answers',[]):additions.append({**row,'source':'지식인 답변','type':'답변','text':answer,'level':'공개 답변 본문'})
            with lock:
                rows.extend(additions);log.extend(local_log);write(rawpath,rows);write(folder/'수집-중간.json',log)
                print(need,'public',query,'units',len(rows),flush=True)
        for query in queries:collect_query(query)
        rows+=public_search(need,'인스티즈','관련도',log);write(rawpath,rows);write(complete_file,{'version':2,'completed_at':datetime.datetime.now().astimezone().isoformat()})
    return rows

def run(need):
    folder=OUT/need;folder.mkdir(parents=True,exist_ok=True)
    if (folder/'수집기록.json').exists():print(need,'already_done',flush=True);return
    mid=folder/'수집-중간.json';log=json.loads(mid.read_text(encoding='utf-8')) if mid.exists() else []
    progress(need,'검색량 측정');k=keywords(need,folder)
    queries=[r['keyword'] for r in k['main']]+[r['collection_query'] for r in k['alternatives']]
    progress(need,'사이트별 단일 대기열 수집—서로 다른 사이트만 병렬')
    def youtube_work():
        v=videos(need,folder,log)
        statepath=OUT/'_호출제한/youtube.json'
        state=json.loads(statepath.read_text(encoding='utf-8')) if statepath.exists() else {}
        if state.get('cool_until',0)>time.time():
            log.append({'source':'유튜브 댓글','error':'영상 경로 차단으로30분 휴식 중—댓글 반복 호출 보류'})
            return [],v
        return community(need,queries,folder,log,sites='youtube'),v
    with ThreadPoolExecutor(max_workers=4) as pool:
        public=pool.submit(collect_public,need,queries,folder,log)
        board=pool.submit(community,need,queries,folder,log)
        reviews=pool.submit(shopping,need,[x['keyword'] for x in k['main']],folder,log)
        youtube=pool.submit(youtube_work)
        rows=public.result()+board.result();shop,products=reviews.result();ytrows,vids=youtube.result();rows+=shop+ytrows
    progress(need,'정제·비중표');rec=finish(need,k,rows,products,vids,log,folder)
    progress(need,'완료(미달·실패 별도 기록)');print(json.dumps({'need':need,'experience':rec['experience'],'sources':{s:v['raw_unique'] for s,v in rec['sources'].items()},'reviews':rec['products_accepted'],'failures':len(log)},ensure_ascii=False),flush=True)

def final_reply(send=True):
    """Report once to the authorized original request after all ten have records."""
    reports=[]
    for need in NEEDS:
        p=OUT/need/'수집기록.json'
        if not p.exists():return False
        reports.append(json.loads(p.read_text(encoding='utf-8')))
    usage_source=next((Path.home()/'.codex/sessions/2026/10/14').glob('*01a13854-d649-7071-9b8d-a380ac179a06*'),None)
    previous=baseline=latest=None
    if usage_source:
        for line in usage_source.open(encoding='utf-8'):
            event=json.loads(line);a=event.get('payload',{})
            if baseline is None and '브리지 요청 진행해' in json.dumps(event,ensure_ascii=False):baseline=previous
            if a.get('type')=='token_count' and a.get('info') and a['info'].get('total_token_usage'):
                previous={'timestamp':event.get('timestamp'),'usage':a['info']['total_token_usage']};latest=previous
    delta={key:latest['usage'].get(key,0)-baseline['usage'].get(key,0) for key in ('input_tokens','cached_input_tokens','output_tokens','total_tokens')} if baseline and latest else None
    write(OUT/'사용량-마감.json',{'baseline':baseline,'observed':latest,'request_delta':delta,'source':str(usage_source),'note':'캐시 포함 실측. 모델 없는 수집 프로세스 실행 중 토큰은 늘지 않는다. 후행 통지·최종 대화 응답은 미포함. 다른 API 비용을 모델 토큰으로 추정하지 않는다.'})
    lines=['# 목소리 조사 v2 결과','', '대표의 직접 실행 지시와 원 요청3649d42e, 두 보완 알림을 적용했습니다. 수집 목표 미달·차단·미확보는 숨기지 않습니다.','', '| 결핍 | 경험 단위 | 대안 키워드 | 시도 제품 | 채택 제품 | 전사 영상 |','|---|---:|---:|---:|---:|---:|']
    for r in reports:lines.append(f"| {r['need']} | {r['experience']} | {r['alternative_keyword_count']} | {r['products_attempted']} | {r['products_accepted']} | {r['videos_transcribed']} |")
    lines+=['','관측 요청 토큰: '+(str(delta['total_tokens']) if delta else '측정 경계 미확인')+' (캐시 포함; 사용량-마감.json 참조).','']
    for r in reports:
        lines += ['## '+r['need'],'출처별 고유 수: '+', '.join(s+':'+str(v['raw_unique']) for s,v in r['sources'].items()),'경험1000건 목표 부족: '+str(max(0,1000-r['experience'])),'실패·미달·광고 비율: '+str(OUT/r['need']/'수집기록.json')]
    lines+=['','기존 기초분석·raw·정본·Claude 편집 폴더·크롤링 리포 코드는 수정하지 않았습니다. git 작업 없음. 하위 AI·별도 모델 호출 없음. 기존 voice_count.py를 재사용했습니다.','새 수집 도구: '+str(HERE/'voice_v2.py'),'출력: '+str(OUT),'','검색 미리보기와 본문은 구분했고, 실제 확보하지 못한 후기·검색량·전사는 추정하지 않았습니다. 확정된 의료 효능으로 해석하지 마세요. 이 결과에 확인 답장은 필요하지 않습니다.']
    lines.insert(2, '쇼핑 후기 수집은 중단했습니다. 결핍별 후기 상태: '+REVIEW_STATUS+'. 수동 파일 선별과 비중표 통합은 Claude의 별도 요청 이후에 합니다. 자사몰 후기는 사용하지 않습니다.')
    body='\n'.join(lines)+'\n';(OUT/'_완료보고.md').write_text(body,encoding='utf-8')
    if not send:return True
    sys.path.insert(0,str(ROOT/'프로그램/아웃풋/claude-codex-bridge/scripts'))
    from bridge import Bridge
    b=Bridge()
    result=b.send('da-planning','codex',body,reply_to='3649d42e-bdab-4407-83cc-d34d954d2b2d',key='3649d42e-voice-v2-result',kind='reply')
    write(OUT/'_브리지-회신.json',{k:result[k] for k in ('id','state','reply_to','recipient_session','requires_reply')})
    return True

if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('--need',choices=list(NEEDS));a.add_argument('--reply-on-completion',action='store_true');a.add_argument('--after-pid',type=int);args=a.parse_args()
    os.environ['CRAWL_HEADLESS']='1'
    os.environ['PYTHONUTF8']='1';os.environ['PYTHONIOENCODING']='utf-8'
    assert ROOT == Path('C:/claude/LLM-WIKI'), '출력은 승인된 위키 workspace 안에서만 생성한다.'
    if args.after_pid:
        assert not args.need, '선행 실행을 기다리는 옵션은 전체 배치에만 사용한다.'
        import psutil
        while psutil.pid_exists(args.after_pid):
            try:
                if not any(Path(x).name=='voice_v2.py' for x in psutil.Process(args.after_pid).cmdline()):break
            except psutil.NoSuchProcess:break
            time.sleep(5)
        first=OUT/next(iter(NEEDS))
        if (first/'수집기록.json').exists():
            rec=json.loads((first/'수집기록.json').read_text(encoding='utf-8'))
            required=('키워드.json','원자료.json','정제-목소리.json','목소리-표본.txt','목소리-비중표.md','영상-요약.md')
            assert all((first/x).exists() for x in required), '첫 결핍 산출물 누락—후속 배치 시작하지 않음'
            assert rec['need']==next(iter(NEEDS)) and rec['units']==len(json.loads((first/'정제-목소리.json').read_text(encoding='utf-8'))), '첫 결핍 기록/정제 단위 불일치'
            print('첫 결핍 산출물/단위 검증 확인—나머지 9개 이어서 수집',flush=True)
    for need in ([args.need] if args.need else NEEDS):
        try:run(need)
        except Exception as e:
            progress(need,'실패—부분 자료 보존: '+str(e)[:100]);print(need,'FAILED',type(e).__name__,str(e)[:220],flush=True)
    if args.reply_on_completion:
        assert not args.need, '완료 회신은 10개를 전부 처리한 실행에서만 한다.'
        try:
            if not final_reply():print('10개 중 미완료 존재—완료 회신하지 않음',flush=True)
        except Exception as e:
            write(OUT/'_브리지-미회신.json',{'error':str(e),'at':datetime.datetime.now().astimezone().isoformat(),'note':'다른 대화로 우회 발송하거나 새 키로 중복 발송하지 않는다.'})
            print('완료 결과 회신 미확인',str(e),flush=True)

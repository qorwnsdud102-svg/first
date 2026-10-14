import json,pathlib,hashlib,datetime
B=pathlib.Path('C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/기획-시스템')
H=B/'자가학습/히트해부';O=B/'작업/역검증/확장-1014/새후보'
def read(p):return json.loads(pathlib.Path(p).read_text(encoding='utf-8-sig'))
def save(n,j):(O/n).write_text(json.dumps(j,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def ev(p,obs,url=None):
 p=pathlib.Path(p);assert p.is_file(),p
 return dict(source_url=url,local_path=str(p),observed=obs+' [SHA256 '+hashlib.sha256(p.read_bytes()).hexdigest()+']')
def cur(key,obs):
 m=read(O/'공개원문'/(key.replace('#','-').replace('.','_')+'.json'))
 return ev(m['html_path'],obs+'; 공개 GET '+str(m['status_code'])+'; 수집 '+m['retrieved_at'],m['final_url'])
def ad(a):return dict(id=str(a['id']),days=a['days_running'],start_date=a['start_date'],end_date=a['end_date'],landing=a.get('landing') or a['link_urls'][0],source_path=a['source_path']+'#'+a['pointer'])
oldads=read(O/'1등급-원광고-60일.json')
def originals(ids):return [ad(next(a for a in oldads if str(a['id'])==i)) for i in ids]
groups={x['key']:x['ads'] for x in read(O/'목적지별-60일광고.json')}
notes=[
 dict(source_url='https://www.wanted.co.kr/company/45427',local_path=str(O/'추가4-공개근거.json'),observed='2026-10-14 검색 열람: 회사 소개는 미오컴퍼니를 Koi House 산하 Formula:In 등6개 브랜드 운영사로 명시. 기업정보 인원6명, 고용보험5명, 매출31억2,519만원 표기(수치 기준일 명확하지 않음). 공식몰 통신판매신고2020-서울강남-01756와 일치한다. 소기업 공개 합리근거로 사용하며 그룹 전체 회계나 광고비를 이 숫자로 단정하지 않는다.'),
 dict(source_url='https://www.nicebizinfo.com/ep/EP0100M002GE.nice?kiscode=OQ5632',local_path=str(O/'추가4-공개근거.json'),observed='2026-10-14 일반 검색에서 반환된 인뎁스 공개 기업 개요: 대표 홍윤선, 사업자867-87-0****, 2021.09.27 설립, 강남구 테헤란로79길6 브이호실, 전자상거래 소매업, 중소기업 표기. 공식 디크솔 운영사867-87-02154와 대표·주소 대조. 공개 보조근거일 뿐 NICE 구매/증명서/법정 소기업 심사를 새 필수조건으로 사용하지 않음.')
]
save('추가4-공개근거.json',dict(as_of='2026-10-14',evidence=notes))
meo='주식회사 미오컴퍼니 / 749-86-01530 / 김용혁'
meoscope='공식 포뮬라인 푸터와 미오컴퍼니 홈페이지 사업자749-86-01530 일치. 회사 공개 채용 소개는6개 브랜드를 운영하는 Koi House 산하 B2C 법인, 공개 인원5~6명·매출31억대(기준일 불명)를 표시한다. 법정 증명 대신 공식 운영사+공개 인원/사업 범위의 합리근거로 소기업 포함. 그룹명 존재 자체만으로 대기업으로 간주하지 않는다.'
items=[]

k='formula-in.com#218';u='https://formula-in.com/product/detail.html?product_no=218'
p=dict(id='X12',product_name='포뮬라인 애프터밀 흡착바이트',product_key=k,official_url=u,status='P',reason='신규P: 저장82일 광고가 정확 P218로 연결되고 현재 P218 제목·알파CD 흡착 설명·공식 운영사가 일치. 기존 H3 해부를 재사용. P187 피부탈색캔디와 다른 실제품이다. 콜라보 제목만으로 유명 연예인 힘에 의존한 제품이라 판정하지 않으며 제품의 흡착/지방흡입 상징을 별도로 확인했다.',symbol_role='지방흡입을 먹는 캔디로 옮기고 키친타월/기름 흡착 비유로 연결',implementation='애프터밀 흡착바이트 캔디. 현재 제목 지방흡입캔디, 알파CD가 기름을 포집한다는 원료 모식도·오일 시연 설명. 패키지 변경 안내는 동일 성분 안내와 함께 보존. 인체 지방배출/감량 효능의 입증으로 해석하지 않는다.',operator=meo,company_scope_basis=meoscope,ad_evidence=[ad(a) for a in groups[k][:2]],evidence=[cur(k,'모루와토녕X흡착바이트·강력한 지방흡입캔디 제목 및 미오컴퍼니 푸터'),ev(H/'3회차/해부-포뮬라인.md','기존 지방흡입/키친타월·기름 포집 상징과 캔디 사용법 판독 재사용. 새 영상 분석 없음.',u),ev(O/'공개원문/company-meo.html','공식 홈페이지 Formula:In 브랜드·Koi House 그룹 관계·동일 사업자번호.','https://meocompany.com/'),notes[0]],remaining=[])
for a in read(O/'항목이미지-명세.json'):
 if a['key']==k and a['image_index_zero_based'] in [11,14,18]:p['evidence'].append(ev(a['local_path'],'이전에 직접 확인한 현재 상세 항목: 패키지 변경 안내 또는 지방/알파CD 포집 설명. 전체 상세 재해부 아님.',a['source_url']))
items.append(p)

k='diqsol.com#22';u='https://diqsol.com/product/detail.html?product_no=22'
items.append(dict(id='X14',product_name='디크솔 큐라스팟',product_key=k,official_url=u,status='P',reason='신규P: 원광고 ID3496559190520119(127일)·27526164503740358(116일)의 정확 P22와 현재 큐라스팟/운영사 연결. 기존 카드의 두 광고가 모두127일처럼 읽힐 수 있는 요약은 원자료 날짜로 보정했다. 기존 냉동/콜딩파우더 상징 판독 재사용.',symbol_role='동결/냉동 처치의 이미지를 콜딩파우더와 국소 도포로 이전',implementation='DIQSOL Curaspot / Spot Powder Concentrate 초록 병·분리된 파우더층. 저장 광고 제목 뿌리까지 꽁꽁/콜딩파우더. 율무·녹두 원료 설명은 판매자 기전 설명이지 의료용 동결제나 실제 제거효능 증명은 아니다.',operator='주식회사 인뎁스 / 867-87-02154 / 홍윤선',company_scope_basis='공식 P22의 인뎁스·대표·사업자·강남 소재 전문몰 운영을 확인. 공개 기업개요의 동일 대표·주소·전자상거래 중소기업 표기가 합리적 소규모 운영 근거를 보완한다. 대형 계열/유명인 의존 근거가 나타나지 않는다. 유료 기업보고서나 새로운 법정 기준을 요구하지 않았다.',ad_evidence=originals(['3496559190520119','27526164503740358']),evidence=[cur(k,'현재 판매명 디크솔 큐라스팟 및 인뎁스 공식 사업자 표기'),ev(H/'1회차/해부2-디크솔.md','기존 원소재의 라벨 DIQSOL Curaspot/Spot Powder Concentrate, 쥐젖동결제·콜딩파우더 문구 및 병/상자 판독. 날짜·일수는 현재 첨부한 원광고 JSON을 우선한다.',u),notes[1]],remaining=[]))

k='torhop.com#47';u='https://torhop.com/product/detail.html?product_no=47'
items.append(dict(id='X15',product_name='토르홉 사우난지앙 라인핏 온열 바디스크럽 200g',product_key=k,official_url=u,status='P',reason='신규P: 저장84일·76일 광고의 온열 바디스크럽 이름/튜브 및 올리브영 A000000260069를 기존 H3 판독으로 특정하고 현재 P47의 사우난지앙 라인핏200g 선택지와 연결. P47 민트쿨링 선택지나 얼굴용 솔트마스크 광고는 이 표본에 합산하지 않는다.',symbol_role='핀란드 사우나/온열 몸 관리의 경험을 욕실에서 바르는 스크럽으로 이전',implementation='사우난지앙 라인핏 온열 바디스크럽200g, 노란 뚜껑 튜브·크림 스크럽·문지르는 온열 사용 설명. 시술/감량 효능의 검증과 별개.',operator='주식회사 모도그로브 / 663-88-01695 / 임정안',company_scope_basis='현재 P47 푸터와 공식 회사 사이트 사업자번호 일치. 회사가 2024매출20억→2025매출47억, 마스크4·클렌저4·바디2 SKU 및 K-슈퍼루키 선정을 공개한다. 소규모 브랜드 운영의 합리근거. 올리브영의2025전략투자/유통은 함께 공개하되 입점만으로 대기업 브랜드라고 단정하지 않는다.',ad_evidence=originals(['1406298164673798','1420278296590406']),evidence=[cur(k,'현재 온&냉사우나 바디스크럽200g2종 택1. 사우난지앙 라인핏/라이카 민트쿨링을 선택지로 구분.'),ev(H/'3회차/해부-토르홉.md','기존 H3 온열84일/76일 소재의 노란 뚜껑 튜브와 Torhop 라벨, 사우난지앙 라인핏 본문 대조. 민트와 얼굴 솔트마스크를 분리한 기존 판독.',u),ev(O/'공개원문/company-modogrove.html','공식 회사 규모20억/47억·SKU 범위·올리브영 전략투자 및 공식 사업자번호. 판매자가 공개한 사업 현황으로 회계감사로 표현하지 않는다.','https://modogrove.com/')],remaining=[]))

k='formula-in.com#187';u='https://formula-in.com/product/detail.html?product_no=187'
items.append(dict(id='X20',product_name='포뮬라인 레몬파인 토닝톡스 코인 / 13호 피부탈색캔디',product_key=k,official_url=u,status='P',reason='신규P: 실제 P187 광고164일·현재 P187의 피부탈색캔디 상품명을 연결. 기존 H4 상세 판독의 일본 약국 배합 미백 레시피 차용을 재사용. P218 흡착바이트와 실제품·목적·광고키가 달라 별도1개로 계수.',symbol_role='일본 약국의 미백 배합약/레시피를 먹는 캔디의 이름·원료 조합 설명으로 이전',implementation='레몬파인 토닝톡스 코인 캔디와 13호 피부탈색캔디 명칭. 일본 약국 배합 레시피 서사와 성분 조합 설명. 실제 피부 탈색/미백 효과나 의약품 동등성은 주장하지 않는다.',operator=meo,company_scope_basis=meoscope,ad_evidence=originals(['1684607779546039','2131048814343860','2695339747508461']),evidence=[cur(k,'현재 P187 13호 피부탈색캔디 제목 및 공식 운영사 미오컴퍼니'),ev(H/'4회차/해부-포뮬라인.md','기존 상세 판독의 레몬파인 토닝톡스 코인·일본 약국 배합약 레시피 상징. 기존 파일의64,000px 아래 미독 한계는 유지하며 현재 상세 전량 재해부로 바꾸지 않는다.',u),ev(O/'공개원문/company-meo.html','동일 미오컴퍼니 사업자·Formula:In 브랜드 연결.','https://meocompany.com/'),notes[0]],remaining=[]))

j=read(O/'결과.json');done={p['product_key']:p for p in j['products']}
for p in items:done[p['product_key']]=p
j['products']=sorted(done.values(),key=lambda p:p['id'])
j['summary'].update(stage='사용자 축소 요청: 기존 확정6개+추가4개 확보에서 종료',P=10,U=3,F=0,actual_total=13,additional_P_ids=[p['id'] for p in items],additional_P_count=4,expected_final_P_range=None,expected_final_P_is_estimate=False,stop_reason='사용자가 통합26개라고 알려 추가P4개 확보에서 마감 허용. 최대24개를 채우기 위한 추가 선정은 하지 않는다.',main_total_if_four_pass_matrix=30,main_total_caveat='부모의 통합26개에 추가4개를 제품키로 중복 제거하고89규칙 행렬에서 최종 채택했을 때30개. 이 파일 자체는 원표본 적격 근거만 확정한다.')
save('결과.json',j)
save('부분결과-추가4.json',dict(as_of='2026-10-14',products=items,summary=dict(P=4,U=0,F=0,id_namespace='X01~X24',integration_key='product_key',frozen_for_matrix=True,status_scope=j['summary']['status_scope'],note='앞선 행렬착수6개와 겹치지 않는4개. 기존 카드 재사용이며 현재 상세 전량 해부/신규 영상분석 없음.')))

deferred=[
 dict(id='X13',product_key='virenne.co.kr#20',status='U',reason='원광고75/69/68일·정확 P20·현재 상세는 확보. 공식 운영사 LSSC와 회사 채용 소개의140명·80여브랜드/매출1200억 자기서술이 있어 소기업·광고비 힘 조건을 이번에 확정하지 않음.',source_url='https://groupby.kr/startups/1857',evidence_path=str(O/'공개원문/virenne_co_kr-20.html')),
 dict(id='X16',product_key='parodex.kr#13',status='U',reason='원광고90/77일·정확P13·현재2.0은 확보. 더스크그룹 공식 소개의2025매출1045억·다브랜드 규모 때문에 최초1등급이라는 이유만으로 원표본P에 합산하지 않음. 과거 BCP와현재RCM/2.0 변화도 별도 구분 필요.',source_url='https://www.duskgroup.co.kr/',evidence_path=str(O/'공개원문/company-dusk.html')),
 dict(id='X17',product_key='hanuibichaek.com#12',status='U',reason='관절뜸 실제품의 원광고4533361816923891은2026-09-03~10-11의38일. 같은 브랜드 비연P62의61일 광고를 관절뜸에 전용하지 않음.',source_url='https://hanuibichaek.com/surl/P/12',evidence_path='C:/claude/네이버 급상승 키워드 기반 경쟁사 발굴/scripts/히트해부4_메타광고소재/hanuibichaek/_ads.json#/ads/8'),
 dict(id='X19',product_key='repurely.com#98',status='U',reason='현재 올레놀샷NMN포뮬러/운영사 시리즈빌더 확인. 별도 옛 구조의 ad_links에서 P100 광고 ID1528179205310583·823058183812979·1238963801422601을 발견했으나 ad_texts에는 시작일만 있고 저장 종료일/정확P100→현재P98 실제품 대조가 미완료. 카드의151일 서술만으로P 승격하지 않음.',source_url='https://repurely.com/product/detail.html?product_no=98',evidence_path=str(O/'공개원문/repurely_com-98.html'))
]
save('미채택-후보메모.json',dict(as_of='2026-10-14',items=deferred,note='결과.json의 P10개 외 추가 미채택 탐색 메모. 정식 products/집계로 합산 금지. 추가 조사 없이 종료.'))
rows=['# 새 역검증 대상 보강 결과','', '2026-10-14. **P10개(선행6+추가4), U3개**. 기존32와 제품키 중복 없음. 사용자가 통합26개를 알리고 추가4개에서 마감을 허용하여 여기서 종료했다.','', 'P는 원표본 적격 근거 확보다. 89개 규칙 행렬 최종 판정은 본체/분담자 몫이며, 광고 지속을 수익·효능 검증으로 취급하지 않았다.','', '## 이번에 넘기는 추가4개','', '|ID|제품|정확 상품키|저장 광고|재사용 근거|','|---|---|---|---|---|']
for p in items:rows.append('|'+p['id']+'|'+p['product_name']+'|'+p['product_key']+'|'+str(max(a['days'] for a in p['ad_evidence']))+'일|기존 H'+{'X12':'3','X14':'1','X15':'3','X20':'4'}[p['id']]+' 판독+현재 공개 상세/운영사|')
rows+=['','[추가4 고정 JSON](부분결과-추가4.json) · [선행6 고정 JSON](부분결과-행렬착수.json) · [전체 공통스키마 JSON](결과.json)','', '## 판정 변화와 남은 한계','', '- 초기8개 전부U에서 누룩밤·에끌무아·페니톡스·아크넨·퍼플가루치약을 P로 보강했고 지직볼을 추가했다. X04 퍼시닌은 임시P349를 현재P446로 정규화하고 P175/220/252 라벨 동일 해시를 연결했다. 릴리이브·퍼시닌·미브잉은 운영사 규모/의존 조건이 불명확해 U를 유지한다.','- 디크솔 원자료는127일과116일이다. 기존 요약을 복사해 둘 다127일로 쓰지 않았다. 토르홉은 온열 바디스크럽84/76일만 사용하고 냉감·얼굴팩은 제외했다. 포뮬라인2종은 각각P218/P187로 실제품을 구분했다.','- 누룩밤·릴리이브·에끌무아·퍼시닌은 기존 완독 판독과 해시를 참조했으며 재해부하지 않았다. 신규 영상분석·Meta 신규조회 없음.','- 기업은 공식 운영사와 공개 인원/사업 범위로 판단했다. 법정 NICE 증명·신규 의학연구를 필수조건으로 추가하지 않았다. 공시되지 않은 현재 지분·광고비 전량 실사를 완료했다고 하지 않는다.','- [미채택 메모](미채택-후보메모.json): 비렌느·파로덱스는 규모 불확실, 한의비책 관절뜸은38일, 올레놀샷은 옛 광고ID와 현재SKU의 대조 미완료. 이들은 P 합계에 넣지 않았다.','', '본체 통합26개+추가4개가 제품키 중복 제거 및89규칙 검증을 통과하면30개다. 이 보강 파일만으로 전체30개 최종 검증 완료를 선언하지 않는다.','']
(O/'결과.md').write_text('\n'.join(rows),encoding='utf-8')
print(json.dumps({'P':10,'U':3,'additional_ids':[p['id'] for p in items],'additional_count':4},ensure_ascii=False))

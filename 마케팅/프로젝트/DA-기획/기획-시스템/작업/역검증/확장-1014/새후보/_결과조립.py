import json, pathlib, hashlib
B=pathlib.Path('C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/기획-시스템')
H=B/'자가학습/히트해부'
O=B/'작업/역검증/확장-1014/새후보'
def read(p): return json.loads(pathlib.Path(p).read_text(encoding='utf-8-sig'))
def save(name,obj): (O/name).write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def ev(p,obs,url=None):
 p=pathlib.Path(p); assert p.is_file(),p
 return dict(source_url=url,local_path=str(p),observed=obs+' [SHA256 '+hashlib.sha256(p.read_bytes()).hexdigest()+']')
groups={g['key']:g['ads'] for g in read(O/'목적지별-60일광고.json')}
def ads(key,limit=3):
 return [dict(id=str(a['id']),days=a['days_running'],start_date=a['start_date'],end_date=a['end_date'],landing=a['landing'],source_path=a['source_path']+'#'+a['pointer']) for a in groups.get(key,[])[:limit]]
def current(key,obs):
 p=O/'공개원문'/(key.replace('#','-').replace('.','_')+'.json');j=read(p)
 return ev(j['html_path'],obs+'; GET '+str(j['status_code'])+'; 取得 '+j['retrieved_at'],j['final_url'])
products=read(O/'부분결과-08.json')['products']
byid={p['id']:p for p in products}
for p in products:
 p['remaining']=[]
 p['reason']=''

p=byid['X01'];p.update(status='P',operator='주식회사 비버글로벌 / 797-86-01878 / 주한결',company_scope_basis='공식 회사 사이트와 상품 푸터의 사업자번호가 일치한다. 회사가 게시한 채용 소개는 소수 정예 조직, 원티드 기업정보는 5명·50명 이하 표기다. 소규모 운영의 공개 합리근거로 사용하며 법정 NICE 판정을 요구하지 않는다.',symbol_role='누룩 발효의 전통 원료 서사를 피부용 밤·취침 루틴으로 이전',implementation='100ml 수면크림. 현재 상세의 누룩발효여과물146,500ppm, TXA·나이아신아마이드 및 취침 전 도포 설명을 관찰. 효능 검증과 별개.',reason='U→P: 실제 P29 광고106일과 현재 P29·운영사를 연결했다. 기존 전체 판독을 재사용했다. 옛 술 빚는 사람 손 서사가 현재에도 보인다고 확대하지 않는다.')
p['evidence']=[ev(H/'2등급-재해부/A자료/누룩밤/판독.md','P29 현재 판매명·100ml 및 이미지029~034 발효/성분 설명. 이미 완료된 전체 판독 재사용.',p['official_url']),ev(H/'2등급-재해부/A자료/누룩밤/P29-text.txt','운영사 비버글로벌·사업자797-86-01878.','https://wizardjoseon.com/surl/P/29'),ev(O/'공개원문/company-beaver.html','공식 운영사 사업자번호 일치.','https://beaverglobal.co.kr/')]

p=byid['X02'];p.update(status='U',official_url='https://lilyeve.kr/product/detail.html?product_no=235',operator='주식회사 바이트랩',company_scope_basis='공식 상품 푸터로 바이트랩을 확인했다. 여러 브랜드 운영·외부 투자와 성장 규모, 채정안 사용 서사가 함께 확인되어 소기업·연예인 의존 배제조건은 이 증거 묶음만으로 확정하지 않는다.',reason='광고96일·정확 P235·현재 브러쉬 앰플 연결은 확보. 현재 브랜드 규모 및 연예인 의존 여부의 배제조건이 미해결이므로 U 유지. 옛 P35의 광고일수를 합치지 않는다.',symbol_role='전문 앰플과 잔머리펌/잔머리 메이커 상징',implementation='브러쉬로 두피에 직접 바르고 ON/OFF하는 엑소좀 앰플.')
p['evidence']=[ev(H/'2등급-재해부/B자료/릴리이브/판독.md','현재235 실물·브러쉬·ON/OFF·공식 운영사. 기존 전체 판독 재사용.',p['official_url'])];p['remaining']=['소기업/대형 브랜드 및 연예인 의존 배제조건의 판정. 별도 규칙 적용 담당이 보유한 증거와 제품키로 통합.']

p=byid['X03'];p.update(status='P',operator='주식회사 더앤비(The&Be) / 491-88-03365 / 손서영',company_scope_basis='현재 공식몰 운영사·사업자번호 및 2025 수원 통신판매 신고 확인. 회사 채용 소개의 2025.07 신규 브랜드 출시·초기 팀 충원과 헤어 중심 상품 범위를 공개 합리근거로 소규모 신생 운영으로 판단. 올리브영 온라인 입점 자체를 대기업으로 간주하지 않는다.',reason='U→P: 정확 P59 광고302일·현재 세트의 실제 샴푸와 운영사를 연결. 세트를 3제품으로 늘리지 않고 1제품키로 계산한다. 청담샵/향수 차용은 기존 판독 재사용.',implementation='더블트러플 퍼퓸 샴푸500ml 중심의 헤어3종 세트. 향수 노트·조향 설명과 검은/흰 송로추출물 표기. 노워시의 성분을 샴푸에 옮기지 않는다.')
p['evidence']=[ev(H/'2등급-재해부/B자료/에끌무아/판독.md','P59 세트 선택·샴푸 실제품, 향수 노트 I041, 트러플 I051~052, 3제품 라벨 I116~118. 기존 판독 재사용.',p['official_url']),ev(H/'2등급-재해부/B자료/에끌무아/59-text.txt','현재 상품/공식 사업자 표기.','https://eclmoi.com/surl/P/59')]

p=byid['X04'];p.update(product_key='meditold.com#446',official_url='https://meditold.com/product/detail.html?product_no=446',status='U',operator='킥더허들헬스케어 / 451-85-01446; 제품 책임판매 표기 킥더허들',company_scope_basis='현재 공식 상품 운영사 확인. 그룹의 복수 브랜드 및 사업 범위가 있어 소기업 배제조건을 이 묶음만으로 확정하지 않는다.',reason='P349 임시 키를 폐기하고 현재 P446 실제품으로 정규화. P175/220/252 라벨 D07 동일 해시로 광고→현재 SKU 연결을 확보했다. 기업 범위 조건은 U 유지.',implementation='퍼시닌 바디워시500ml. 감/탄닌과 냄새 포획 설명·초록 병. 88,000ppb 감추출물과 순수 탄닌 함량을 동일시하지 않는다.')
p['ad_evidence']=sorted(ads('meditold.com#175')+ads('meditold.com#220')+ads('meditold.com#252'),key=lambda a:-a['days'])[:3]
p['evidence']=[ev(H/'2등급-재해부/C자료/메디톨드/SKU대조.md','P446 D07 SHA256 2e1ede65fe934ffd1d9874bbc5e8359daa4db9d0c8d38b3a214429a7a9bc29ac와 P175/220/252 고시 이미지가 동일. 악시크림 P181 제외.',p['official_url']),ev(H/'2등급-재해부/C자료/메디톨드/판독.md','D03·D05 단감/탄닌 서사와 현재 운영사. 기존 전체 판독 재사용.',p['official_url'])];p['remaining']=['그룹 규모·대형 브랜드 힘 의존 배제조건의 판정. 별도 규칙 적용 담당과 제품키로 통합.']

p=byid['X05'];p.update(product_name='벨택 페니톡스 프리미엄 맨즈 크림',status='P',operator='라에드(raede) / 623-36-01271 / 박기훈',company_scope_basis='공식몰은 라에드·대표 개인명·2025 김포 통신판매 신고·소수 제품의 전문몰 형태를 명시한다. 개인 상호 운영의 공개 근거로 소기업 표본에 포함. 대형 계열사·대형 브랜드 또는 연예인 의존 근거가 나타나지 않는다.',reason='U→P: 정확 idx3 광고81일·공개 현재 상세·개인 운영사를 확보. H10 대표의 10점 확정 판정을 반영한다. 상세에 보톡스 시술명 직설이 반드시 있어야 한다는 예전 추가조건을 되살리지 않는다.')
p['evidence']=[current(p['product_key'],'페니톡스 판매명·동일idx3 및 공식 푸터 라에드623-36-01271'),ev(H/'10회차/결과.md','대표 판정10점: 페니톡스 작명과 보톡스 연상 원료 연결도 상징 차용. 이전 보류 판정의 변경 근거.'),ev(H/'10회차/검토-벨태그.md','현재 상품 형태와 아세틸헥사펩타이드-8 관련 기존 판독 재사용.',p['official_url'])]

p=byid['X06'];p.update(status='P',official_url='https://hattke.co.kr/product/detail.html?product_no=18',operator='주식회사 드래프터 / 360-81-03631',company_scope_basis='기존 H7 공식 조사와 현재 푸터가 동일한 소규모 전문몰 운영사 드래프터를 가리킨다. 2025 통신판매 신고, 자체 침구 관리 제품 중심의 공개 운영 근거로 포함한다. 법인 지분 전량 조사는 수행하지 않았고 대형 브랜드 의존 정황은 확인되지 않았다.',reason='U→P: 저장135일 광고 두 개와 현재 P18 및 운영사를 대조. 기존 채택 카드의 실제 사용 구조를 재사용했다. 기존32의 P23 가중이불과는 다른 실제품.')
p['evidence']=[current(p['product_key'],'아크넨 패드 Acnen Pad·현재 공식 운영사 동일'),ev(H/'7회차/해부-해트케-아크넨패드.md','이미 확인한 원본 상세: 베개 위에 깔고 교체하는 넓은 소모성 시트·20EA. 화장품 대신 접촉면을 바꾸는 차별 구현.',p['official_url'])]

p=byid['X07'];p.update(product_name='데일리원더 미브잉 텅 트레이너',status='U',operator='주식회사 이삼오구 / 465-81-01281 / 주재형',company_scope_basis='공식 회사 소개에서 13개 브랜드·임직원156명·누적620만 주문을 명시한다. 과거 직원51명 자료만 사용해 명확한 소기업으로 올리지 않는다.',symbol_role='혀 운동을 통한 턱선 관리라는 사용 방식',implementation='노란 손잡이·투명 구강부·스프링으로 혀를 운동시키는 구조. 단순 씹기 기구로 잘못 명명하지 않는다.',reason='정확 P37 광고923일·현재 상품 연결 확보. 과거 턱선 애정형 제외는 이번 원표본의 추가 게이트가 아니므로 그대로 F를 복사하지 않는다. 다만 현재 공식 회사 규모·다브랜드 운영 때문에 소기업 범위는 U.',remaining=['현재 운영사 규모/브랜드 힘 배제조건.'])
p['evidence']=[current(p['product_key'],'미브잉 텅 트레이너 판매명·공식 운영사'),ev(H/'7회차/B1-조사.md','§5의 상세 일부 원본 판독: 입에 대는 부품과 스프링/혀 운동. 예전 제외 사유와 현재 미확인 범위 구분.',p['official_url']),ev(O/'공개원문/company-2359.html','공식 소개 현재13브랜드·156명. 과거 채용 인터뷰의50여 명과 혼동하지 않음.','https://www.2359.co.kr/')]

p=byid['X08'];p.update(status='P',operator='주식회사 온리비앤코 / 427-81-03889 / 황진순',company_scope_basis='상품 푸터와 공식 회사 소개 사업자번호427-81-03889 일치. 회사는 설립1년·외부투자 없이 누적100억 달성 전 단계라고 설명한다. 신생 소규모 브랜드 운영의 공개 합리근거로 사용한다. 일부 유명인 후기 노출이 있으나 주된 보색/분말 구조 자체와 구분했다.',reason='U→P: 실제187일 광고의 bit.ly 링크가 보존된 GET 대조에서 정확 P33으로 연결. P31과 P33 상세26개 동일 해시를 확인해 세트/단품을 중복 계수하지 않았다. 보라색 분말·보색 설명은 기존 판독 재사용.',implementation='퍼플 가루치약의 보라색 분말·보색 톤업 설명과 HAP 성분 서사. 실제 미백/재생 효능 검증으로 확대하지 않는다.')
p['ad_evidence']=[dict(id='1311462927616986',days=187,start_date='2026-04-09',end_date='2026-10-13',landing='https://bit.ly/3QsbxuL',source_path=str(H/'12회차/새구역-메타.json')+'#/18/ads/0')]
p['evidence']=[ev(H/'12회차/F-상품광고대조.json','배열6: bit.ly/3QsbxuL → puriven.co.kr product_no33, HTTP200. 광고 랜딩 확정 연결.',p['official_url']),ev(H/'12회차/F자료/P33-hash-comparison.json','P31과P33 상세 원본26개 동일 해시. 한 실제품으로 통합.',p['official_url']),ev(H/'12회차/후보-F.md','P16/P33-18 보라색 분말과 보색 톤업 논리의 기존 판독.',p['official_url']),ev(O/'공개원문/company-onlyb.html','공식 회사 소개: 사업자 일치·설립1년·투자 없이 누적100억 달성 전 단계라는 회사 자기서술.','https://onlyb.kr/default/')]

key='mebetter.co.kr#45';p=dict(id='X09',product_name='미베러 지직볼 손가락 손마사지기',product_key=key,official_url='https://mebetter.co.kr/product/detail.html?product_no=45',status='P',reason='신규 확인: 실제169일 광고·정확P45·현재 EMS+온열 실물·개인 운영사 연결. 일반 크림/패치와 달리 손에 쥐는 구형 전극 구조가 차별 사용법에 들어 있다.',symbol_role='지직이라는 전기 자극 감각과 EMS 저주파를 손에 쥐는 마사지 도구로 구체화',implementation='손바닥에 쥐는 금속 주름 구형부와 전원 버튼, EMS+온열 표시. 치료 효과가 아니라 형태·사용법 관찰.',operator='베이비포 / 849-32-00686 / 신혜정',company_scope_basis='현재 공식몰 상호·대표 개인명·개인 예금주 베이비포·2025 통신판매 신고 일치. 소규모 개인 운영 브랜드의 공개 합리근거로 사용한다.',ad_evidence=ads(key),evidence=[current(key,'지직볼 EMS 저주파+온열 제목·사업자 베이비포 확인')],remaining=[])
ims=read(O/'항목이미지-명세.json')
for a in ims:
 if a['key']==key and a['image_index_zero_based'] in [25,43]:p['evidence'].append(ev(a['local_path'],'현재 공식 상세 원본 직접 판독: 구형 금속 돌출부/버튼 또는 EMS·온열 설명. 작은 온도 수치는 채택하지 않았다.',a['source_url']))
products.append(p)

webnotes=[dict(source_url='https://www.wanted.co.kr/company/26502',local_path=str(O/'회사-공개근거.json'),observed='2026-10-14 검색 재확인: 비버글로벌 기업정보 5명·50명 이하 표기. 회사 게시 채용 소개는 소수 정예 조직과 위자드조선 대표 누룩밤을 명시. 이는 현재 실사 인원이나 회계 검증값이 아니다.'),dict(source_url='https://careerly.co.kr/job/9642477',local_path=str(O/'회사-공개근거.json'),observed='2026-10-14 검색 재확인한 더앤비 회사 채용 소개: 에끌무아 2025.07 국내 공식 출시, 2026.01 올리브영 온라인몰 입점. 신제품 패키지/웹 담당자를 채용하는 신생 헤어 브랜드. 초기 팀 충원 관련 종전 회사 게시문 https://demoday.co.kr/recruits/14488 도 보조 참조. 재열람은 도구 접근 실패였으므로 현재 열람 근거로 과장하지 않음.')]
save('회사-공개근거.json',dict(as_of='2026-10-14',evidence=webnotes))
byid['X01']['evidence'].append(webnotes[0]);byid['X03']['evidence'].append(webnotes[1])
summary=dict(stage='최종 schema 부분 결과; 행렬 병렬검증 착수용',P=sum(p['status']=='P' for p in products),U=sum(p['status']=='U' for p in products),F=0,id_namespace='X01~X24',integration_key='product_key',existing32_excluded=True,status_scope='P는 원표본 적격 근거 확보, 규칙 행렬 통과·의학적 효능·수익 검증 아님. 원표본 소기업은 공식 운영사와 공개 합리근거로 판정. 불명확 후보는 U.',changes='광고 ID·날짜·정확 SKU·현재 상세·운영사와 제품 차별 근거를 붙여 초기 전부U 기록을 갱신. X04는 P349→P446 실제품 키로 변경.',expected_final_P_range=[12,16],expected_final_P_is_estimate=True)
save('결과.json',dict(as_of='2026-10-14',products=products,summary=summary))
confirmed=[p for p in products if p['status']=='P']
save('부분결과-행렬착수.json',dict(as_of='2026-10-14',products=confirmed,summary={**summary,'P':len(confirmed),'U':0,'F':0,'frozen_for_matrix':True,'note':'이 파일은 현재확정6개 고정본. 후속 결과는 결과.json에 추가하며 제품키로 병합한다.'}))
print(json.dumps(dict(total=len(products),P=summary['P'],U=summary['U'],partial_ids=[p['id'] for p in confirmed]),ensure_ascii=False))

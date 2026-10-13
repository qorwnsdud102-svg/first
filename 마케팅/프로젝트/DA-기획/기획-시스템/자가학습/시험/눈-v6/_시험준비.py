"""이미 판정된 시간순 홀드아웃 12장을 점수 없이 별도 시험지로 고정한다."""
import json, random, hashlib
from pathlib import Path

ROOT=Path('C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/기획-시스템/자가학습')
OUT=Path(__file__).parent
d4=json.loads((ROOT/'상징짝-드릴/4회차/카드-30.json').read_text('utf-8'))
selected=json.loads((ROOT/'상징짝-드릴/4회차/선발-Claude.json').read_text('utf-8'))['selected']
ids={x['id'] for x in selected}
scores={'D4-03':1,'D4-05':5,'D4-07':5,'D4-08':6,'D4-14':1,'D4-20':1,'D4-22':6,'D4-23':4,'D4-25':1,'D4-28':1,'H10-01':8,'H10-02':10}
rows=[{k:x.get(k,'') for k in ['id','need','symbol','line','gap','borrow','product','risk']} for x in d4 if x['id'] in ids]
rows += [
 {'id':'H10-01','need':'볼·턱선 처짐과 붓기','symbol':'경락샵의 관리, 일부 광고의 부항','line':'샵에서 받는 경락을 집에서 하는 얼굴 관리기','gap':'예약과 반복 관리비가 부담스럽다.','borrow':'피부가 헤드에 빨려 붙고 위로 끌리는 동작을 보여준다.','product':'웰247 페이스튠핏. 흡입3단계·EMS·쿨링, 하루5분. 상세와 여러 광고·상단 후기는 경락 대체, 한 광고는 부항 장면을 쓴다.','risk':'전기기기 소싱·성능과 실제 효과는 별도 확인. 한 소재의 부항 후크와 전체 제품의 주력을 혼동하면 안 된다.'},
 {'id':'H10-02','need':'남성 크기 고민','symbol':'제품명 PENITOX, 펩타이드 원료와 약국·연구개발 권위','line':'페니톡스 프리미엄 맨즈 크림','gap':'크기 변화에 대한 욕구를 간단한 도포 관리에 연결한다.','borrow':'PENITOX라는 이름, 핵심 원료 아세틸헥사펩타이드-8, 크기 변화 후기가 앞에 있다.','product':'흰 원형50ml단지. 샤워 후 취침 전 하루1회 도포·5분 마사지. 연구원·독자배합 도식. 상단 후기에는 +2.6센치 표현과 보톡? 간접 언급.','risk':'실제 크기 변화와 성분의 효과는 미검증. 본문에 시술명을 직접 연결한 그림은 확인하지 못했다.'}
]
random.Random(1013).shuffle(rows)
test=[];truth=[]
for i,row in enumerate(rows,1):
 original=row.pop('id'); ident=f'T{i:02}'
 test.append({'id':ident,**row});truth.append({'id':ident,'original_id':original,'score':scores[original]})
assert len(test)==12 and len(truth)==12
(OUT/'결과').mkdir(exist_ok=True)
(OUT/'시험지.json').write_text(json.dumps(test,ensure_ascii=False,indent=2),'utf-8')
(OUT/'결과/실제정답.json').write_text(json.dumps(truth,ensure_ascii=False,indent=2),'utf-8')
meta={'test_sha256':hashlib.sha256((OUT/'시험지.json').read_bytes()).hexdigest(),'n':12,'normalization':'D4는 기존 카드의 need/symbol/line/gap/borrow/product/risk만 보존. 선택자예측·판정·근거P-ID 제거. H10은 판정 전 조사기록의 관찰을 같은 7칸으로 요약했으며 원카드 형식과 차이가 있어 시험 한계다. 부모는 정답을 알지만 시험평가자는 이 시험지+동결프롬프트만 읽는다.','tie_policy':'실제점수 내림차순, 동점은 original_id 오름차순의 엄격Top3 및 3위동점허용Top3를 모두 보고. 통과는 엄격Top3 2개 이상+MAE<=2.0. 사후 기준변경 금지.'}
(OUT/'시험지-준비기록.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2),'utf-8')
print(meta['test_sha256'])

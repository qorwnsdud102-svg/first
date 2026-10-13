import json, re
from pathlib import Path
from collections import Counter

P=Path(__file__).parent
A=P.parent.parent
ROOT=Path('C:/claude/LLM-WIKI')
def read(p):return json.loads(p.read_text('utf-8-sig'))
def save(name,obj):(P/name).write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n','utf-8')
def norm(s):return re.sub(r'[^a-z0-9가-힣]','',s.lower())
needs=read(A/'상징원-사전/결핍별.json')
cross=read(A/'상징원-사전/다른분야-상징.json')
byneed={r['need']:r for r in needs}
measurements={}
for n in needs:
 for s in n['symbols']:
  for m in s.get('measurements',[]):measurements[norm(m['keyword'])]=m
for s in cross:
 m=s.get('measurement')
 if m:measurements[norm(m['keyword'])]=m
cards=read(P/'분담-피부발.json')+read(P/'분담-근골격.json')
pred=read(P/'예측-피부발.json')+read(P/'예측-근골격.json')
for r in read(P/'본체-초안.json'):
 pred.append(dict(id=r['id'],score=r.pop('score'),weak=r.pop('weak'),why=r.pop('prediction_why')))
 n=byneed[r['need']];m=measurements[norm(r['symbol_key'])]
 r['need_id']=n['id']
 r['evidence']=dict(need_keyword=n['main_keyword'],need_volume=n['monthly_search_volume'],symbol_keyword=m['keyword'],symbol_volume=m['total'])
 cards.append(r)
errors=[]
top={r['need'] for r in sorted(needs,key=lambda r:r.get('monthly_search_volume') or -1,reverse=True)[:25]}
for r in cards:
 e=r['evidence'];n=byneed[r['need']]
 nm=next(m for m in n['need_measurements'] if norm(m['keyword'])==norm(e['need_keyword']))
 sm=measurements[norm(e['symbol_keyword'])]
 assert nm['total']==e['need_volume'],r['id']
 assert sm['total']==e['symbol_volume'],r['id']
 e.update(need_autocomplete=nm.get('autocomplete',[]),symbol_autocomplete=sm.get('autocomplete',[]),measured=dict(need=nm['measured'],symbol=sm['measured']))
 e['source_file']=[str((ROOT/m['file'].replace('\\','/')).resolve()).replace('\\','/') for m in [nm,sm]]
 e['scope_note']='기존 조회의 PC+모바일 월검색량. 환자 수·구매자 수·하위 증상 시장규모가 아니다.'
 assert all(Path(f).exists() for f in e['source_file']),r['id']
 assert r['need'] in top,r['id']
 assert len(r['flow'])==5,r['id']
 for key in ['line','gap','borrow','why','product','risk','prior_check']:assert r[key],(r['id'],key)
assert [r['id'] for r in cards]==[f'D5-{i:02d}' for i in range(1,31)]
assert [r['id'] for r in pred]==[r['id'] for r in cards]
assert max(Counter(r['need'] for r in cards).values())<=2
assert len({(r['need'],norm(r['symbol_key'])) for r in cards})==30
assert all(type(r['score']) is int and 1<=r['score']<=10 for r in pred)
old=read(P/'기존짝-대조.json')
near=[]
for r in cards:
 for o in old:
  if norm(r['need']) in norm(o['need']) and norm(r['symbol_key']) in norm(o['symbol']):near.append([r['id'],o['id']])
assert not near,near
save('카드-30.json',cards);save('예측-30.json',pred)
save('제출검증.json',dict(cards=30,predictions=30,flow_items=150,needs=len(set(r['need'] for r in cards)),max_per_need=2,top_half_pass=True,measurement_matches=60,source_files_exist=True,autocomplete_attached=True,old_pair_text_match=near,manual_semantic_checks='모발이식·대표 대안·옛 비듬/두피 별칭 대조. 니조랄은 이전 등드름/무좀과 다른 결핍이나 원리 확장으로 표시. 케겔은 기존 요실금 짝 제외를 준수. 갱년기 보톡스는 다한증 대표안 인접 응용으로 독창성 약점 표시.',selection='눈v6 미통과: 선발 없음. Claude가 예측을 보지 않고 선정.'))
lines=['# 상징 짝 드릴 5회차 — 후보30개','', '작성자 예측은 별도 파일이다. 아래 순서는 ID순이며 추천 순위가 아니다. 약물·기기·원료의 실제 효과와 제조 가능성은 확인 전인 기획 가설이다.','']
for r in cards:
 e=r['evidence'];lines +=[f"## {r['id']} · {r['need']} × {r['symbol']}",f"**{r['line']}**",'',f"- 결핍: {r['gap']}",f"- 연결: {r['why']}",f"- 구현: {r['product']}",f"- 걸림: {r['risk']}",f"- 확인된 검색어: {e['need_keyword']} {e['need_volume']:,} / {e['symbol_keyword']} {e['symbol_volume']:,}. 측정일 2026-10-13. 정확 자동완성과 원문은 JSON에 포함.",'']
(P/'카드-30.md').write_text('\n'.join(lines)+'\n','utf-8')
print(json.dumps(dict(cards=len(cards),needs=dict(Counter(r['need'] for r in cards)),scores=dict(Counter(r['score'] for r in pred))),ensure_ascii=False))

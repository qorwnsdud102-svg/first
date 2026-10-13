"""이번 회차의 카드와 봉인 예측 분리. 검색량은 당일 원장만 재사용한다."""
import copy
import datetime
import json
import pathlib
import re

P = pathlib.Path(__file__).resolve().parent
DICT = P.parent.parent/'상징원-사전'
measure = json.loads((DICT/'검색량-실측.json').read_text(encoding='utf-8-sig'))
norm = lambda s: re.sub(r'\s+', '', s).lower()
lookup = {norm(k):v for k,v in measure.items()}
cards, predictions, provenance = [], [], []
required = ['id','need','symbol','line','gap','borrow','why','product','risk','top3']

for fn in ['_후보-A2.json','_후보-B2.json','_후보-A3.json','_후보-B3.json','_후보-A.json']:
    f=P/fn
    if not f.exists():
        continue
    d=json.loads(f.read_text(encoding='utf-8-sig'))
    rows=d['cards']
    if fn=='_후보-A.json': rows=[c for c in rows if c['id']=='A02']
    pr=d.get('predictions',[])
    if isinstance(pr,dict): pr=pr.get('items',[])
    predmap={c['id']:c for c in pr}
    for old in rows:
        c=copy.deepcopy(old)
        old_id=c['id']
        c['id']=f'D4-{len(cards)+1:02}'
        if isinstance(c.get('top3'),dict):
            c['top3_review']=c['top3']
            c['top3']=c['top3']['items']
        assert all(c.get(k) for k in required), (fn,old_id,'missing field')
        assert len(c['top3'])==3, (old_id,'top3')
        c['top3_basis']='타겟의 첫 연상에 대한 AI 가설. 소비자조사 결과 아님.'
        c['draft_status']='채점용 초안; 상징 연결과 구현의 미확인·약점은 risk에 유지'
        c['source_draft']={'file':fn,'id':old_id}
        queries=c.get('source_queries',[])
        if not isinstance(queries,list):queries=[]
        possible=[c['symbol']]+queries
        evidence=[]
        seen=set()
        for word in possible:
            if not isinstance(word,str):continue
            row=lookup.get(norm(word))
            if row and row['keyword'] not in seen:
                evidence.append(copy.deepcopy(row));seen.add(row['keyword'])
        c['awareness_evidence']=evidence
        c['awareness_note']='검색량·자동완성은 이름의 검색 흔적이다. 효능·타겟 대표연상·이식 수용의 증명이 아니다.'
        sym=lookup.get(norm(c['symbol']))
        if sym:
            volume=sym.get('total')
            text=f"상징 정확어 ‘{sym['keyword']}’ 월검색 {volume:,}회" if isinstance(volume,(int,float)) else f"상징 정확어 ‘{sym['keyword']}’ 월검색 미측정"
            ac=' · '.join(sym.get('autocomplete',[])[:3]) or '응답 없음/미확인'
            c['why']+=f" | 인지 단서: {text}; 자동완성 {ac}. {sym.get('measured','2026-10-13 당일 원장')} 재사용."
        else:
            summaries=[f"{r['keyword']} {r['total']:,}회" for r in evidence[:3] if isinstance(r.get('total'),(int,float))]
            c['why']+=' | 상징의 해당 표현 정확 검색량은 미측정.'
            if summaries:c['why']+=' 관련어 참고: '+', '.join(summaries)+'(상징 정확값으로 대체하지 않음).'
        if old_id in ('A2-01','A2-04','A2-12'):
            c['risk']='원본 의약품 성분을 그대로 옮기는 안으로, 상징을 빌린 신규 제품보다 약의 제형 변경에 가깝다. '+c['risk']
            c['draft_status']='구현 방향 보류 — 원본 약 제형 변경. 제조·사용 제안이 아님.'
        pr=copy.deepcopy(predmap.get(old_id,{'score':4,'weak':c['risk'],'why':'근거가 얇은 초안에 대한 잠정 예측'}))
        pr['id']=c['id']
        if old_id in ('A2-01','A2-04','A2-12'):
            pr['score']=3;pr['weak']='상징 이식보다 원본 약의 제형 변경';pr['why']='효능이나 허가의 평가가 아니라 신규 구매 이유가 약하다는 기획 평가.'
        predictions.append({k:pr[k] for k in ['id','score','weak','why']})
        for k in ['score','predicted_score','predictions']:
            c.pop(k,None)
        cards.append(c)
        provenance.append({'id':c['id'],'file':fn,'source_id':old_id})

assert len(cards)<=30
assert len({c['id'] for c in cards})==len(cards)
assert all(set(p)=={'id','score','weak','why'} for p in predictions)
for fn,obj in [('카드-30.json',cards),('예측-30.json',predictions),('_제출검증.json',{'created':datetime.datetime.now().astimezone().isoformat(),'requested':30,'actual':len(cards),'missing':30-len(cards),'fields_checked':required,'prediction_separate':True,'awareness_exact_measured':sum(norm(c['symbol']) in lookup for c in cards),'provenance':provenance})]:
    (P/fn).write_text(json.dumps(obj,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'cards':len(cards),'predictions':len(predictions),'missing':30-len(cards),'prediction_separate':True},ensure_ascii=False))

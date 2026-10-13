import json,hashlib,math
from pathlib import Path
P=Path(__file__).parent
load=lambda f:json.loads((P/f).read_text('utf-8-sig'))
pred=load('결과/봉인예측.json');truth=load('결과/실제정답.json')
if isinstance(truth,dict):truth=truth.get('entries',truth.get('cards',truth))
assert isinstance(truth,list),type(truth)
assert len(pred)==len(truth)==12
assert len({x['id'] for x in pred})==12
assert {x['id'] for x in pred}=={x['id'] for x in truth}
assert all(type(x['score']) is int and 1<=x['score']<=10 for x in pred)
assert hashlib.sha256((P/'시험지.json').read_bytes()).hexdigest()==load('시험지-준비기록.json')['test_sha256']
assert hashlib.sha256((P/'지시문-판정.md').read_text('utf-8').encode()).hexdigest()==load('프롬프트-동결.json')['sha256']
by={x['id']:x for x in pred}
rows=[dict(t,prediction=by[t['id']]['score'],error=abs(by[t['id']]['score']-t['score']),why=by[t['id']]['why']) for t in truth]
mae=sum(r['error'] for r in rows)/len(rows)
drill=[r for r in rows if r['original_id'].startswith('D4')]
rankpred=sorted(rows,key=lambda r:(-r['prediction'],r['id']))
ranktrue=sorted(rows,key=lambda r:(-r['score'],r['original_id']))
ptop={r['id'] for r in rankpred[:3]};ttop={r['id'] for r in ranktrue[:3]}
threshold=ranktrue[2]['score'];eligible={r['id'] for r in rows if r['score']>=threshold}
overlap=len(ptop&ttop)
tp=sum(r['prediction']>=7 and r['score']>=7 for r in rows)
fp=sum(r['prediction']>=7 and r['score']<7 for r in rows)
fn=sum(r['prediction']<7 and r['score']>=7 for r in rows)
tn=sum(r['prediction']<7 and r['score']<7 for r in rows)
def ranks(vals):
 ordered=sorted(enumerate(vals),key=lambda x:x[1]);out=[0]*len(vals)
 for v in set(vals):
  ps=[i+1 for i,(_,w) in enumerate(ordered) if v==w]
  for idx,w in ordered:
   if w==v:out[idx]=sum(ps)/len(ps)
 return out
x=ranks([r['prediction'] for r in rows]);y=ranks([r['score'] for r in rows])
mx=sum(x)/len(x);my=sum(y)/len(y)
den=math.sqrt(sum((a-mx)**2 for a in x)*sum((b-my)**2 for b in y))
rho=sum((a-mx)*(b-my) for a,b in zip(x,y))/den if den else None
passed=mae<=2 and overlap>=2
d=dict(passed=passed,mae=mae,drill_mae=sum(r['error'] for r in drill)/10,top3_overlap=overlap,
 tie_allowed_overlap=len(ptop&eligible),spearman=rho,confusion=dict(tp=tp,fp=fp,fn=fn,tn=tn),
 prediction_top3=[r['original_id'] for r in rankpred[:3]],actual_top3=[r['original_id'] for r in ranktrue[:3]],rows=rows,
 prompt_sha256=load('프롬프트-동결.json')['sha256'],test_sha256=load('시험지-준비기록.json')['test_sha256'],prediction_sha256=hashlib.sha256((P/'결과/봉인예측.json').read_bytes()).hexdigest())
(P/'결과/성적.json').write_text(json.dumps(d,ensure_ascii=False,indent=2),'utf-8')
lines=['# 눈 v6 — 실제 판정과 대조','',f"**{'통과' if passed else '미통과'}**. 평균 오차 {mae:.2f}점, 엄격 상위3개 적중 {overlap}/3. 기준은 MAE≤2.0와 적중≥2를 동시에 충족하는 것.",'',
 f"드릴4만의 오차 {d['drill_mae']:.2f}점. 기존 봉인 예측 Claude 2.8, GPT 2.2와 비교할 범위는 이10개다. 전체12개 수치를 같은 모집단 비교처럼 쓰지 않는다.",
 f"동점 평균순위 Spearman {rho:.3f}. 3위 실제 동점까지 허용하면 {len(ptop&eligible)}/3이지만 합격에는 엄격 기준을 사용했다.",'',
 '| 원 카드 | 익명 ID | 예측 | 실제 | 절대오차 | 예측 이유 |','|---|---|---:|---:|---:|---|']
for r in sorted(rows,key=lambda z:z['original_id']):lines.append(f"| {r['original_id']} | {r['id']} | {r['prediction']} | {r['score']} | {r['error']} | {r['why'].replace('|','/')} |")
lines += ['',f"예측 상위3: {', '.join(d['prediction_top3'])}. 실제 상위3: {', '.join(d['actual_top3'])}.",'',
 f"7점 이상 분류: 참양성 {tp}, 거짓양성 {fp}, 놓친 양성 {fn}, 참음성 {tn}. 정밀도 {tp/(tp+fp):.3f}." if tp+fp else f'7점 이상 분류: 참양성{tp}, 거짓양성{fp}, 놓친양성{fn}, 참음성{tn}. 양성 예측 없음.', '',
 '시험 한계: 12장뿐인 단회 시험이며 카드10개와 해부 평가2개가 섞였다. H10 두 장은 판정 전 관찰을 같은 형식으로 요약해 원 제출물과 표현이 다르다. 작성 본체는 과거 정답을 알고 있어 설계 편향 가능성이 남는다. 평가자는 새 맥락에서 동결된 두 입력만 읽었다. 개선 성과의 확정에는 다음 새 카드의 실제 대표 판정이 필요하다.', '',
 ('다음: 새 드릴5 30장을 별도 평가 단계에서 채점해 상위10개를 고른다.' if passed else '다음: 드릴5 30장과 작성자 예측만 내고 10개는 고르지 않는다. Claude에게 선발을 맡긴다. 이 결과를 보고 같은 시험을 재학습·재응시하지 않는다.')]
(P/'결과/채점.md').write_text('\n'.join(lines)+'\n','utf-8')
print(json.dumps({k:v for k,v in d.items() if k!='rows'},ensure_ascii=False))

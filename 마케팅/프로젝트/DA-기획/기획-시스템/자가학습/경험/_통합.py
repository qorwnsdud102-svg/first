"""분담 원장으로부터 사람이 다시 읽을 회고와 다음 기획용 기억을 만든다."""
import json, re, collections
from pathlib import Path
OUT=Path(__file__).parent
names=['기획회차','공동기획','드릴']
parts={n:json.loads((OUT/'분담'/f'{n}.json').read_text('utf-8-sig')) for n in names}
hits=json.loads((OUT/'분담/히트본보기.json').read_text('utf-8-sig'))['entries']
entries=[]
for name,data in parts.items():
 for raw in data['entries']:
  e=dict(raw);e['group']=name
  e['key']=f"{name}/{e.get('round','')}/{e['id']}"
  entries.append(e)
assert len({e['key'] for e in entries})==len(entries),'duplicate judgement'

def txt(v):
 if isinstance(v,list):return ' · '.join(map(str,v))
 if isinstance(v,dict):return ' / '.join(f'{k}: {txt(w)}' for k,w in v.items())
 return str(v or '')
def score(e):
 s=e.get('score');return f'{s}점' if isinstance(s,(int,float)) else '점수 미기재'
def pid(e):return txt(e.get('pid',[])) or 'P-ID 미확인'
def refs(e):return txt(e.get('source_raw',''))
def write(name,lines): (OUT/name).write_text('\n'.join(lines)+'\n','utf-8')

lines=['# 전체 기획 회고','',f'실제 대표 판정이 연결된 기획 {len(entries)}건. 동일 판정의 사본은 중복하지 않는다. 숫자 없는 코멘트는 점수로 환산하지 않는다.','',
 '아래 다섯 칸은 문서에 드러난 선택 이유의 요약이다. 기록이 없는 부분은 추정으로 표시한다. 내부 사고 과정을 복원한 기록이 아니다. 히트 해부의 감독 점수와 새 기획 점수는 별개다.','',
 '## 포함 범위','']
for name,data in parts.items():
 lines.append(f"- {name}: {len(data['entries'])}건. 범위 기록: [분담/{name}.md](분담/{name}.md)")
 for m in data.get('missing',[]):lines.append('- 미확인/별도 처리: '+txt(m))
lines += ['', '일반 지시·히트 평가를 포함한 원문 범위는 [원문범위](분담/원문범위.md)에 구별했다. 1등급 히트40개는 [본보기](본보기-7점.md)에 별도로 실었다.','']
for e in entries:
 good=isinstance(e.get('score'),(int,float)) and e['score']>=7
 lines += [f"## {e['key']} · {e.get('title','')} · {score(e)}",'',
 f"결핍: {e.get('deficit','')} / 상징: {e.get('symbol','')}",
 f"구현: {e.get('implementation','')}",'',f"선택 이유 요약 — {txt(e.get('basis','추정'))}"]
 rationale=e.get('rationale',[])
 if not isinstance(rationale,list):rationale=[rationale]
 for i,r in enumerate(rationale,1):lines.append(f'{i}. {txt(r)}')
 lines += ['',f"대표 원문: “{txt(e.get('quote'))}” ({pid(e)})",f"판정: {txt(e.get('judgment'))}",
 f"{'맞은 선택' if good else '틀린 가정'}: {txt(e.get('worked') if good else e.get('error_types'))}",
 f"다시 볼 단계: {txt(e.get('wrong_stage')) or '없음/미기재'}",f"다음 행동: {txt(e.get('next_action'))}",
 f"원문: {refs(e)}",f"원기획: {txt(e.get('source_plan'))}",'']
write('회고-전체.md',lines)

alias={
 '대안대비부족':'기존 대안을 살 이유가 큼','구현미확인':'제조·구현 확인 부족','구현불확실':'제조·구현 확인 부족',
 '구현손실':'제품에 상징 핵심이 빠짐','약한상징':'상징의 가치가 약함','시장불명':'시장·인지 근거 부족',
 '기존대안우세':'기존 대안을 살 이유가 큼','익숙한조합':'이미 익숙한 조합','부위거부감':'사용 부위의 거부감',
 '타겟불일치':'주된 타겟·상황에서 벗어남','부수역할혼동':'보조 역할을 핵심으로 오인','즉시반증':'몸으로 바로 반박 가능',
 '선택불편':'새 사용 방식이 불편','작은욕구':'구매할 만큼 크지 않은 불편','연상불일치':'결핍과 상징 연상이 안 맞음',
 '상징원 약함':'상징 가치 부족','상징 약함':'상징 가치 부족','상위상징 부재':'상징 가치 부족',
 '상징-결핍 불일치':'상징 짝 불일치','상징짝 불일치':'상징 짝 불일치',
 '당위성 부족':'구현 당위 부족','구현 불일치':'구현 당위 부족',
 '참신함 부족':'기존 대안과 중복','참신성 부족':'기존 대안과 중복','기존제품 중복':'기존 대안과 중복',
 '부정연상':'사용 거부감','부정 연상':'사용 거부감','거부감':'사용 거부감'}
counts=collections.Counter();rounds=collections.defaultdict(collections.Counter);sources=collections.defaultdict(list)
def roundname(e):
 r=str(e.get('round',''))
 if e['group']=='드릴':return 'D'+r
 if e['group']=='공동기획':
  m=re.search(r'-(\d)차',r);return 'J'+(m.group(1) if m else '1')
 m=re.search(r'(GPT-)?(\d)회차',r)
 return ('G' if m and m.group(1) else 'R')+(m.group(2) if m else r)
for e in entries:
 errs=e.get('error_types',[])
 if isinstance(errs,str):errs=[errs] if errs else []
 for er in set(alias.get(x,x) for x in errs if x and x not in ['없음','미확인']):
  counts[er]+=1;rounds[er][roundname(e)]+=1;sources[er].append(e)
actions={
 '상징의 가치가 약함':('익숙한 제품보다 비싸고 효과 강한 대안을 먼저 떠올린다.','P6344'),
 '제품에 상징 핵심이 빠짐':('제품에서 원상징의 핵심 작동·감각이 남는지 비교한다.','P6151·P6366'),
 '이미 익숙한 조합':('원래 제품과 달라지는 구매 이유를 한 문장으로 적는다.','P6348·P6398'),
 '기존 대안을 살 이유가 큼':('원래 제품 대신 이것을 살 이유부터 대조한다.','P6277·P6416'),
 '보조 역할을 핵심으로 오인':('시술 본체·보조 원료·사후관리의 역할을 분리한다.','P6251·P6305'),
 '주된 타겟·상황에서 벗어남':('작은 상황보다 타겟이 주로 겪는 증상을 고른다.','P6392'),
 '몸으로 바로 반박 가능':('써 보면 바로 깨질 주장은 체감·구현을 다시 고른다.','P6422'),
 '새 사용 방식이 불편':('새 모양의 이점이 실제 불편을 줄이는지 묻는다.','P6351·P6352'),
 '제조·구현 확인 부족':('설득과 제조 확인을 분리해 미확인 항목을 남긴다.','P6427'),
 '구매할 만큼 크지 않은 불편':('같은 큰 결핍 안에서 다른 상징 짝을 찾는다.','P6409·P6435'),
 '시장·인지 근거 부족':('타겟의 불편과 근거 제품이 같은 대상을 가리키는지 본다.','P6152·P6326'),
 '사용 부위의 거부감':('그 부위에 닿는 장면에서 첫 부정 연상을 확인한다.','P6389·P6395·P6397')}
repeat=['# 실수 반복표','',f'대표 판정 {len(entries)}건. 한 카드의 복수 오류·고득점의 지적도 포함. 태그는 AI 분류이며 새 하드 규칙이 아니다. R=기획, G=GPT기획, J=공동기획, D=드릴. `R2:2`는 R2에서 2건.','',
 '| 반복된 판단 | 건수 | 회차별 횟수 | 먼저 바꿀 행동·근거 |','|---|---:|---|---|']
for er,n in counts.most_common(12):
 e=sources[er][0]
 act,p=actions.get(er,(txt(e.get('next_action')),pid(e)))
 repeat.append(f"| {er} | {n} | {' '.join(f'{r}:{c}' for r,c in rounds[er].items())} | {act} ({p}) |")
repeat += ['', '상위12개만 표시했다. 전체 태그·대상 카드는 `통합원장.json`에서 추적한다. 같은 판정의 원문/사례집/위키 사본을 별도 사건으로 세지 않았다.']
write('실수-반복표.md',repeat)

guide='''# 기획할 때 생각하는 순서 v1

판정문을 복사하는 대신 다음 선택을 바꾼다. 다섯 단계의 답을 카드의 `flow`에 한두 줄씩 남긴다.

**① 결핍을 고른다.**
- 주된 불편을 겨냥했나, 설명하기 편한 작은 상황을 골랐나? (P6392·P6409)
- 같은 결핍의 지난 시도에서 무엇이 통했고 무엇이 막혔나? 결핍을 버리지 말고 틀린 짝을 바꾼다. (P6435)

**② 상징 후보를 떠올린다.**
- 그 타겟이 아는 비싸고 효과 강한 해결책·대명사는 무엇인가? (P6344)
- 다른 분야라면 이름이 아니라 그 해결책의 고유한 작동이 필요한 상태와 맞나? (P6354·P6381·P6420)

**③ 가장 강한 짝을 고른다.**
- 같은 결핍에서 더 효과 강하게 느껴지는 후보와 비교했나? (P6407·P6408)
- 상징을 다른 이름으로 바꿔도 똑같이 말이 되면, 원료·행동의 연결을 다시 찾는다. 상징 역할마다 따로 확인한다. (P6366·P6404)

**④ 제품에 옮긴다.**
- 원료·형태·체감·순서 중 무엇이 그 상징을 몸으로 납득시키나? 고유한 체감과 작동 주장을 함께 적는다. (P6386·P6428)
- 해당 부위에서 위험·불쾌하게 느껴지거나, 몸 밖의 처치를 몸속에 억지로 옮기지는 않았나? (P6389·P6394·P6395·P6397)
- 짝은 좋아도 실제로 만들 수 있는지 확인 못한 부분은 무엇인가? 확인 과제를 따로 남긴다. (P6427)

**⑤ 살 이유를 다시 묻는다.**
- 이미 있는 원래 제품 대신 이것을 살 이유가 있나? 형태를 바꾸었다는 사실만으로 편리해졌다고 보지 않는다. (P6398·P6416·P6351)
- 가장 비슷한 좋은 사례와 나쁜 사례 한 개씩에 견줘, 제일 큰 걸림과 다음 수정 하나만 남겼나? (P6431·P6434)
- 대표가 직접 준 대안을 그대로 재제출하지 않았나? 무엇을 바꾸었는지 배워 새 짝을 만든다. (P6382)

고쳐쓰기 본보기와 결핍별 시도를 함께 읽는다. 이 문서는 전체 피드백을 사용했으므로 눈v6의 과거 시점 학습에는 넣지 않는다.
'''
write('생각-순서.md',[guide.strip()])

byneed=collections.defaultdict(list)
for e in entries:byneed[txt(e.get('deficit','미기재'))].append(e)
needlines=['# 결핍별 지난 시도','', '같은 결핍은 다시 해도 된다. 같은 상징 짝의 반복·대표 대안 복사는 피한다. 원문 결핍명을 보존했으므로 유사 부위의 다른 표기도 함께 검색한다.','']
for need,es in sorted(byneed.items()):
 needlines += ['## '+need,'']
 for e in es:
  needlines += [f"- **{e.get('symbol','')} → {e.get('implementation','')}** · {score(e)} · {e['key']}",
   f"  이유: {txt(e.get('quote'))} / 다음: {txt(e.get('next_action'))} ({pid(e)})"]
 needlines.append('')
write('결핍별-시도.md',needlines)

altlines=['# 대표가 고쳐 준 방식','', '대표 제안의 인용·요약과 비교 예시를 모았다. 원문은 전체 회고의 출처로 돌아간다. 대안 자체를 새 카드로 복사하지 말고 바꾼 선택을 배운다. 비교 사례·과거 검토안은 새 제안과 구분한다.','']
altmoves={
 'D4-08':'같은 손톱 손상 결핍에서 재생 원료의 이름보다 표면을 새로 채우는 시술 상징으로 바꿨다.',
 'D4-20':'방향을 바꾼다는 추상적 공통점에서, 교정기를 닮은 실제 외형까지 이어지는 부위로 옮겼다.',
 'D4-23':'표면을 보송하게 하는 데서 땀샘 억제라는 작동 주장과 미세열감의 결합으로 바꿨다. 실제 억제 효능 확인은 별도다.',
 'D2-05':'압력이 번갈아 오는 데서 아픈 부위에 압력이 오지 않는 구조로 바꿨다.',
 'D2-07':'뜨거운 온천의 화상 연상에서 순한 수분 공급의 가습기로 바꿨다.'}
for e in entries:
 alt=txt(e.get('owner_alternative'))
 if alt and alt not in ['없음','미기재','null']:
  altlines += [f"- 원래: {e['key']} · {e.get('symbol','')} → {e.get('implementation','')}",f"  대표 제안·예시: {' '.join(alt.split())} ({pid(e)})",f"  바꾼 선택: {altmoves.get(e['id'],txt(e.get('next_action')))}",'']
write('고쳐쓰기-본보기.md',altlines)

goodlines=['# 7점 이상 기획과 1등급 히트의 선택 본보기','', '기획 점수와 해부 점수는 다른 평가다. 1등급 표 편입은 판매량·효능 검증을 뜻하지 않는다. 기록 없는 이유는 추정이라고 남긴다.','']
for e in entries:
 if not isinstance(e.get('score'),(int,float)) or e['score']<7:continue
 goodlines += [f"**{e['key']} · {e.get('title','')} · {score(e)}**",f"1. 재료: {e.get('deficit','')} / {e.get('symbol','')}",
 f"2. 선택: {e.get('implementation','')}",f"3. 대표: {txt(e.get('quote'))} ({pid(e)})",f"4. 통했던 것: {txt(e.get('worked')) or '점수만 높음—상세 이유 추정 금지'}",f"5. 다음에도: {txt(e.get('next_action'))}",'']
for h in hits:
 goodlines += [f"**{h['id']} · {h['title']} · 1등급 히트 본보기(해부/관찰)**",f"1. 재료: {h.get('deficit','')} / {h.get('symbol','')}",
 f"2. 제품에 옮김: {h.get('implementation','')}",f"3. 대표 판단: {h.get('owner_reason','')} ({pid(h)})",f"4. 배울 선택: {h.get('lessons','')}",f"5. 출처: {h.get('source','')}",'']
write('본보기-7점.md',goodlines)
data=dict(entries=entries,hits=hits,coverage={k:v.get('coverage',[]) for k,v in parts.items()},missing={k:v.get('missing',[]) for k,v in parts.items()},error_counts=dict(counts))
(OUT/'통합원장.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),'utf-8')
print(json.dumps(dict(n=len(entries),hit_n=len(hits),part_counts={k:len(v['entries']) for k,v in parts.items()},top_errors=counts.most_common(8),alternatives=sum(bool(e.get('owner_alternative')) for e in entries)),ensure_ascii=False))

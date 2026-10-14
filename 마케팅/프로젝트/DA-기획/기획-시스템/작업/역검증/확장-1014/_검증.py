"""통합 뒤 표본·규칙·인용 파일·정본 불변을 검증한다. 내용의 진실성 검사를 대신하지 않는다."""
from pathlib import Path
from collections import Counter
import json,hashlib,datetime
B=Path(__file__).parent
def read(name):return json.loads((B/name).read_text(encoding='utf-8-sig'))
matrix=read('통합판정.json')
target=read('대상-최종.json')
snap=read('현행규칙-스냅샷.json')
struct=read('검증결과.json')
ad=read('광고-근거검증.json')
issues=[]
refs=set()
ids={x['id'] for x in matrix['products']}
ruleids={x['id'] for x in snap['rules']}
for x in matrix['products']:
 if len(x['rules'])!=89 or {r['rule_id'] for r in x['rules']}!=ruleids:issues.append([x['id'],'rule-set'])
 current=Counter(r['status'] for r in x['rules'])
 if x['summary_current']!={s:current.get(s,0) for s in 'PUNWH'}:issues.append([x['id'],'summary'])
 for r in x['rules']:
  if not r.get('reason') or not r.get('evidence'):issues.append([x['id'],r['rule_id'],'no reasoning/evidence'])
  for e in r['evidence']:
   path=e.get('file','')
   refs.add(path)
   if not path or not e.get('observation'):issues.append([x['id'],r['rule_id'],'malformed evidence'])
for ref in refs:
 if not Path(ref.split('#',1)[0]).is_file():issues.append(['missing evidence',ref])
keys=[x['product_key'] for x in target['eligible']]
if len(keys)!=len(set(keys)):issues.append(['duplicate eligible key'])
for x in target['eligible']:
 if x['matrix_id'] not in ids:issues.append([x['id'],'matrix absent'])
if len(keys)<30:issues.append(['eligible below30'])
canonical=Path(snap['source'])
current_hash=hashlib.sha256(canonical.read_bytes()).hexdigest()
if current_hash!=snap['sha256']:issues.append(['canonical changed'])
method=B.parents[2]/'자가학습/히트해부/방법정답지.md'
t=method.read_text(encoding='utf-8').split('## 1등급 —')[1].split('## 2등급 —')[0]
grade1=[l.split('|')[1].strip() for l in t.splitlines() if l.startswith('| ')][1:]
mapping=[]
for i,name in enumerate(grade1,1):
 mid=f'G{i:02}'
 p=next((x for x in matrix['products'] if x['id']==mid),None)
 if p is None or name.split(' (')[0]!=p['product'].split(' (')[0]:issues.append([mid,'grade1 mapping',name])
 mapping.append({'id':mid,'source_name':name,'matrix_name':p['product'] if p else None})
if ad.get('issues'):issues.append(['ad audit',ad['issues']])
if ad.get('missing_ad_id_source'):issues.append(['ad source absent',ad['missing_ad_id_source']])
if struct['problems']:issues.append(['structure',struct['problems']])
out={'as_of':datetime.datetime.now().astimezone().isoformat(),'status':'pass' if not issues else 'incomplete',
 'eligible':len(keys),'candidate_pool_status':target['status_counts'],'products':len(ids),'cells':len(ids)*89,
 'grade1_count':len(grade1),'grade1_mapping':mapping,'evidence_file_count':len(refs),
 'canonical_unchanged':current_hash==snap['sha256'],'canonical_sha256':current_hash,'issues':issues,
 'limits':'파일 존재·89칸 완비·원장 집계·표본 중복·1등급40개 대응·정본 불변 검사. 모든 원자료의 진실성·모든 영상 전체 시청·시장 수익을 새로 입증하는 검사가 아니다. 광고 ID/날짜 검사는 광고-근거검증.json의 저장 관찰을 재사용.'}
(B/'최종검증.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in out.items() if k not in ['grade1_mapping','limits']},ensure_ascii=False))
if issues:raise SystemExit(1)

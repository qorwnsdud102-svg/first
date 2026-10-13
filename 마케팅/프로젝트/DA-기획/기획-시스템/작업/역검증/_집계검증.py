"""이번 역검증 원장의 합치기·출처 앵커 검증. 원문/에이전트 원장은 수정하지 않는다."""
import collections
import copy
import datetime
import hashlib
import json
import pathlib
import re

ROOT = pathlib.Path('C:/claude/LLM-WIKI')
OUT = pathlib.Path(__file__).resolve().parent
def read(name):
    return json.loads((OUT/name).read_text(encoding='utf-8-sig'))
def save(name, data):
    (OUT/name).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
snapshot = read('_규칙스냅샷.json')
rules = {r['id']: r for r in snapshot['rules']}
pool = read('_대상근거.json')
records = {r['id']:r for r in pool['grade1'] + pool['additional_records']}
current_method_path = ROOT/'마케팅/프로젝트/DA-기획/기획-시스템/자가학습/히트해부/방법정답지.md'
method_lines = current_method_path.read_text(encoding='utf-8-sig').splitlines()
old_to_new = {}
for r in pool['grade1']:
    src = r['source']
    matches = [i+1 for i,line in enumerate(method_lines) if line.strip() == src['quote'].strip()]
    if len(matches) == 1:
        old_to_new[src['line']] = matches[0]

products = []
input_manifest = []
for name in ['_적용-A.json', '_적용-B.json', '_적용-C.json', '_적용-D.json']:
    fp = OUT/name
    d = read(name)
    input_manifest.append({'file':name, 'sha256':hashlib.sha256(fp.read_bytes()).hexdigest()})
    for row in d['products']:
        r = copy.deepcopy(row)
        r['source_matrix'] = name
        products.append(r)

expected = {f'G{i:02}' for i in range(1,41)} | {f'N{i:02}' for i in range(1,10)}
assert {r['id'] for r in products} == expected, '49개 범위를 다 채운 뒤 실행'
assert len(products) == len(expected), '중복 제품'
cache = {}
errors = []
relocated = 0
rule_changes = []
canon = ROOT/'마케팅/wiki/syntheses/DA 기획 단계별 규칙.md'
canon_lines = canon.read_text(encoding='utf-8-sig').splitlines()
for rid, old in rules.items():
    line = next((x for x in canon_lines if x.startswith('- '+rid+' ')), None)
    assert line, rid+' 현행 조문 없음'
    current = line.split(' | ',2)[1]
    if current != old['text']:
        rule_changes.append({'id':rid,'before':old['text'],'after':current})

for row in products:
    assert len(row['rules']) == 89 and {x['rule_id'] for x in row['rules']} == set(rules), row['id']
    for q in row['rules']:
        assert q['status'] in {'P','W','H','U','N'}, q
        assert q.get('reason'), (row['id'],q['rule_id'],'reason missing')
        for e in q.get('evidence',[]):
            fname = e.get('file',e.get('path'))
            if not fname:
                errors.append([row['id'],q['rule_id'],'source path missing']);continue
            f = pathlib.Path(fname)
            if not f.is_absolute(): f=ROOT/f
            if not f.exists():
                errors.append([row['id'],q['rule_id'],'missing file',fname]);continue
            if str(f) not in cache:cache[str(f)] = f.read_text(encoding='utf-8-sig').splitlines()
            lines = cache[str(f)]
            if f.name == '_규칙스냅샷.json' and e.get('section'):
                match = re.fullmatch(r'rules\[(\d+)\]', e['section'])
                if match and snapshot['rules'][int(match[1])]['id'] == q['rule_id']:
                    e['resolved_file'] = f.as_posix()
                    e['resolved_json_pointer'] = '/rules/' + match[1]
                    continue
                errors.append([row['id'],q['rule_id'],'bad JSON section',e['section']])
                continue
            rng = e.get('lines',[e.get('line_start',e.get('line')),e.get('line_end',e.get('line_start',e.get('line')))])
            if not rng or None in rng:
                errors.append([row['id'],q['rule_id'],'missing range',fname]);continue
            a,b=rng[0],rng[-1]
            resolved_a,resolved_b=a,b
            quote=e.get('quote')
            if f.name=='방법정답지.md' and row['id'] not in ('G39','G40'):
                if a in old_to_new and b in old_to_new:
                    resolved_a,resolved_b=old_to_new[a],old_to_new[b]
            actual='\n'.join(lines[resolved_a-1:resolved_b])
            if quote and actual.strip()!=quote.strip():
                hits=[i+1 for i in range(len(lines)) if '\n'.join(lines[i:i+(b-a+1)]).strip()==quote.strip()]
                if len(hits)==1:
                    resolved_a=hits[0];resolved_b=resolved_a+(b-a)
                elif f.name=='DA 기획 단계별 규칙.md' and q['rule_id'] in {x['id'] for x in rule_changes}:
                    e['snapshot_quote_preserved']=True
                    resolved_a=next(i+1 for i,x in enumerate(lines) if x.startswith('- '+q['rule_id']+' '))
                    resolved_b=resolved_a
                else: errors.append([row['id'],q['rule_id'],'quote mismatch',fname,a])
            if not 1<=resolved_a<=resolved_b<=len(lines):
                errors.append([row['id'],q['rule_id'],'bad range',fname,a,b])
            e['resolved_file']=f.as_posix()
            e['resolved_lines']=[resolved_a,resolved_b]
            if (a,b)!=(resolved_a,resolved_b):relocated+=1

save('_검증결과.json',{'products':len(products),'rules_per_product':89,'judgments':len(products)*89,'errors':errors,'relocated_references':relocated,'changed_rules':[r['id'] for r in rule_changes], 'input_manifest':input_manifest})
assert not errors, errors[:10]
save('_통합판정.json',{'as_of':datetime.datetime.now().astimezone().isoformat(),'rule_snapshot':snapshot['sha256'],'current_rules_sha256':hashlib.sha256(canon.read_bytes()).hexdigest(),'changes':rule_changes,'products':products})

commentary={
 'G06': '정제수 없는 베이스 설명과 전성분 표시의 충돌. 잘 팔렸다는 사실로 표시 모순을 허용할 수는 없으므로 규칙 완화의 근거와 분리한다.',
 'G19': '의료기기·제조 실행 범위 제한은 사업 선택의 경계다. 기획 설득력이 좋다는 것과 우리가 그대로 판매할 수 있다는 것은 다르다.',
 'G30': '별도 회로·연구개발이 필요한 제품은 당사 실행 범위의 경계다. 규칙이 틀린 사례로 자동 집계하지 않는다.',
 'G33': '대표 8점은 제품 전체 판정이다. 먹는 관장이라는 광고 비유까지 명시 승인한 것인지는 분리해 묻는다. 동일 처치 재현을 어디까지 요구할지 검토할 후보.',
 'N01': '피코레이저와 자석 흡착은 다른 방식이다. 루비PDRN·스킨부스터·실물 필름의 복합 신호를 인정할지 해석이 갈릴 수 있다. 시장 적격도 조건부여서 확정 반례로 단정하지 않는다.',
 'N02': '숫돌 번호·순서 표기 모순은 기획 상징의 실패와 별개인 상세 품질 문제다. 이 오류를 이유로 ④-25를 완화할 근거는 아니다.'}
business_ids={'⑥-08','⑥-10','⑥-25'}
quality_ids={'G06','N02'}

doc=['# 시장 역검증 — 제품별 결과','', '**현행 1등급 40개와 추가 장기광고 후보 9개, 총 49개 기록에 89개 규칙을 대조했다.** 원가·실제 ROAS 등 확인할 수 없는 항목은 미확인으로 남겼다. 이는 49개가 모두 매출 성공·중소기업·60일 집행을 입증했다는 뜻이 아니다.','', '장기광고 후보는 기존 자료에서 20개를 확보해 목표 30개보다 10개 부족하다. 이 중 11개는 1등급과 겹친다. 상세/SKU/광고 ID 등의 조건을 갖춘 것은 조건부 12개이며, 기업 규모는 20개 모두 추가 확인이 필요하다.','', '| ID | 제품 | 하드 충돌 | 경고 수 | 미확인 수 | 해석 |','|---|---|---|---:|---:|---|']
for r in sorted(products,key=lambda x:x['id']):
    counts=collections.Counter(q['status'] for q in r['rules'])
    h=[q['rule_id'] for q in r['rules'] if q['status']=='H']
    note=commentary.get(r['id'],'하드 충돌 미관찰. 미확인 항목까지 통과했다는 뜻은 아님.')
    if r['id']=='G14':note='미출시 자사 기획. 대표가 인정한 기획 사례이며 시장 성공 반례에는 넣지 않는다.'
    if r['id']=='G39':note='최근 추가된 대표 8점 사례. 정확 SKU 광고는 22일이므로 장기광고 표본에 넣지 않는다.'
    if r['id']=='G40':note='최근 추가된 대표 10점 사례. 이름+원료 별명 차용을 인정한 최신 ④-21 예외 적용.'
    doc.append(f"| {r['id']} | {r['product']} | {', '.join(h) or '없음'} | {counts['W']} | {counts['U']} | {note} |")
doc+=['','## 충돌이 관찰된 위치','']
for r in products:
    hard=[q for q in r['rules'] if q['status']=='H']
    if not hard:continue
    doc+=['### '+r['id']+' '+r['product'],'',commentary.get(r['id'],''),'']
    for q in hard:
        e=next((x for x in q.get('evidence',[]) if pathlib.Path(x.get('file','')).name!='DA 기획 단계별 규칙.md'),None)
        link=f" [근거]({e['resolved_file']}:{e['resolved_lines'][0]})" if e else ''
        doc.append(f"- **{q['rule_id']}**: {q['reason']}{link}")
    doc.append('')
doc+=['## 적용의 한계','','P는 해당 규칙에 필요한 관찰이 있는 범위만 뜻한다. N은 그 제품에 쓰이지 않은 상징/형태이거나 제품 출시 이후에는 적용 대상이 아닌 절차다. U는 원가·인지도·개발비·원료 조달·시장 포화·고객 발화 등 자료 부족이다. 동일 제품이 여러 광고를 돌렸다고 반례를 여러 번 세지 않는다.','','출처 파일의 증분 편집 때문에 이동한 줄은 통합 원장의 resolved_lines에 현재 위치로 연결했다. 원래 판독 시점의 인용은 보존했다. 최신 ④-21 추가 예외는 별도 기록하고, 새 G39/G40에는 직접 적용했다. 정본과 raw는 바꾸지 않았다.','','전체 행과 출처는 [_통합판정.json](_통합판정.json), 형식·참조 검증은 [_검증결과.json](_검증결과.json)에 있다.']
(OUT/'제품별.md').write_text('\n'.join(doc)+'\n',encoding='utf-8')

rs=['# 시장 역검증 — 규칙별 누적','','**자동 수정 기준인 동일 규칙의 정답 탈락 3건을 이 표본에서 확정하지 못했다.** 아래는 문언상 충돌의 원수와, 사업 범위·표시 모순을 분리한 기획 해석 검토 수다. 후자도 회사 규모와 광고 성과가 모두 검증된 확정 반례는 아니다.','', '| 규칙 | 문언 충돌 제품 수 | 기획 해석 검토 수 | 사례 | 경고 수 | 미확인 수 |','|---|---:|---:|---|---:|---:|']
per_rule=[]
for rid in rules:
    hit=[r for r in products if any(q['rule_id']==rid and q['status']=='H' for q in r['rules'])]
    counter=[r for r in hit if r['id'] not in quality_ids|{'G14'} and rid not in business_ids]
    states=collections.Counter(next(q['status'] for q in r['rules'] if q['rule_id']==rid) for r in products)
    rs.append(f"| {rid} | {len(hit)} | {len(counter)} | {', '.join(r['id'] for r in hit) or '—'} | {states['W']} | {states['U']} |")
    per_rule.append({'rule_id':rid,'hard_product_ids':[r['id'] for r in hit],'interpretation_candidate_ids':[r['id'] for r in counter],'states':dict(states)})
rs+=['','## 지금 남길 질문','','1. **④-22·④-59:** 뉴티락의 먹는 관장, 메라블의 피코샷처럼 방식이 달라도 강한 결과·원료 신호를 주는 경우를 어디까지 허용하는가. 제품 전체의 높은 판정이 특정 비유의 승인인지는 구분한다.','2. **④-21:** 대표 용도3개 밖이면 탈락이라는 문장과, 트라센·치아교정→내성발톱·리쥬란→잇몸·벨택의 예외를 어느 순서로 적용하는가. 이번 드릴4의 자동 선별에 직접 영향을 준다.','3. **④-25:** 상세 문구의 오기·성분 표기 충돌과 상징 기획 자체의 자기모순을 분리해 기록한다. 판매된 제품의 표시 오류는 규칙을 없애는 근거가 아니다.','','## 범위 보정','','- 원래 스냅샷의 1등급38개에 새로 편입된 웰247·벨택을 추가해40개 전수를 포함했다.','- 장기 후보20개/목표30개, 조건부12개/근거보류8개. 기업 규모는 미확인이다. 적격 표본30개를 완수했다고 보고하지 않는다.','- 새 대표 판정은 새 판매 데이터가 아니다. 웰2478점·벨택10점이 실제 효능·ROAS를 증명하지 않는다.','- 3회 기준을 만들기 위해 경고나 미확인을 하드로 바꾸지 않는다. 이번 결과만으로 규칙이 완벽하다고도 결론 내리지 않는다.','- 정본 변경은 제안만 남겼다. 고정 판례는 수정하지 않았다.']
assert max(len(x['interpretation_candidate_ids']) for x in per_rule)<3,'3회 이상 후보 발생: 머리말을 재검토할 것'
(OUT/'규칙별-누적.md').write_text('\n'.join(rs)+'\n',encoding='utf-8')
save('_규칙별집계.json',per_rule)
print(json.dumps({'products':len(products),'judgments':len(products)*89,'references_relocated':relocated,'errors':0,'changed_rule_ids':[r['id'] for r in rule_changes]},ensure_ascii=False))

"""이번 후속조사의 표본과 규칙 판정을 결합한다. 판정 자체를 자동 생성하지 않는다."""
import json, hashlib, datetime
from pathlib import Path
from collections import Counter

B = Path(__file__).resolve().parent
ROOT = Path('C:/claude/LLM-WIKI')

def read(name):
    return json.loads((B / name).read_text(encoding='utf-8-sig'))

def rows(obj):
    return obj if isinstance(obj, list) else obj.get('products', obj.get('candidates', []))

def save(name, obj):
    (B / name).write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding='utf-8')

old = read('현행-기존49판정.json')
snapshot = read('현행규칙-스냅샷.json')
ruleids = {r['id'] for r in snapshot['rules']}
levels = {r['id']: r['level'] for r in snapshot['rules']}
matrix = {x['id']: x for x in old['products']}
bykey = {x.get('sample_eligibility', {}).get('product_key'): x['id'] for x in matrix.values() if x.get('sample_eligibility', {}).get('product_key')}
baseline = rows(read('기확보12-대상.json'))
for x in baseline:
    if x.get('prior_matrix_id') in matrix:
        bykey[x['product_key']] = x['prior_matrix_id']

# Each is a confirmed identity mapping, not a fuzzy product-name merge.
bykey.update({
    'imheal.kr#185': 'G06', 'fractalofficial.co.kr#34': 'G18',
    'groominglab.co.kr#259': 'G25', 'brand.naver.com#6849913668': 'G38',
    'veltag.co.kr#3': 'G40',
})

for name in ['규칙적용-5개/결과.json', '추가AP/규칙적용-2개.json', '규칙적용-X3/결과.json', '규칙적용-추가/결과.json']:
    if not (B / name).exists():
        continue
    for x in rows(read(name)):
        x['matrix_source'] = str(B / name)
        assert x['id'] not in matrix, ('duplicate matrix id', x['id'])
        matrix[x['id']] = x
        bykey[x['product_key']] = x['id']

pool = {x['id']: x for x in baseline}
for name in ['기존L/결과.json', '추가AP/결과.json', '새후보/결과.json']:
    for x in rows(read(name)):
        x['eligibility_source'] = str(B / name)
        pool[x['id']] = x
if (B / '상품키-대조.json').exists():
    bykey.update(read('상품키-대조.json'))

eligible = []
unknown = []
for x in pool.values():
    x.setdefault('eligibility_source', str(B / '기확보12-대상.json'))
    x['matrix_id'] = bykey.get(x['product_key'])
    if x['status'] == 'P':
        eligible.append(x)
    else:
        unknown.append(x)

keys = [x['product_key'] for x in eligible]
assert len(keys) == len(set(keys)), 'eligible duplicate product key'
problems = []
for x in matrix.values():
    rr = x['rules']
    assert len(rr) == 89 and {r['rule_id'] for r in rr} == ruleids, x['id']
    assert all(r['status'] in 'PUNWH' and len(r['status']) == 1 for r in rr), x['id']
    for r in rr:
        if r['status'] == 'H':
            assert '하드' in levels[r['rule_id']], (x['id'], r['rule_id'])
        if not r.get('reason') or not r.get('evidence'):
            problems.append([x['id'], r['rule_id'], 'reason or evidence missing'])
for x in eligible:
    if not x['matrix_id']:
        problems.append([x['id'], 'matrix missing', x['product_key']])

target = {'as_of': datetime.datetime.now().astimezone().isoformat(), 'eligible_count': len(eligible),
          'goal_at_least': 30, 'eligible': eligible, 'not_confirmed_or_excluded': unknown,
          'status_counts': dict(Counter(x['status'] for x in pool.values())),
          'method': 'Exact product or fixed set. P is sampling eligibility, not efficacy, sales or rule passing.'}
save('대상-최종.json', target)

qual_ids = {x['matrix_id'] for x in eligible if x['matrix_id']}
conflicts = []
for x in matrix.values():
    for r in x['rules']:
        if r['status'] != 'H':
            continue
        category = ('미판매 기획' if x['id'] == 'G14' else
                    '의도된 사업범위' if x['id'] in ['G19', 'G30'] else
                    '사용법 문구 자기모순' if x['id'] == 'N02' else
                    '상징 이식 충돌')
        conflicts.append({'product_id': x['id'], 'product': x['product'], 'rule_id': r['rule_id'],
                          'reason': r['reason'], 'category': category,
                          'long_ad_eligible': x['id'] in qual_ids,
                          'grade1_reference': x['id'].startswith('G'),
                          'candidate_rule_error': category == '상징 이식 충돌',
                          'evidence': r['evidence']})

for x in matrix.values():
    # Original auxiliary roll-ups are historical. The current normalized rule rows are authoritative here.
    for k in ['hard_conflicts', 'hard_fails', 'conflicts', 'market_counterexample', 'market_counterexample_candidate']:
        if k in x:
            x['historical_' + k] = x.pop(k)
    x['eligible_long_ad_sample'] = x['id'] in qual_ids
    if 'summary' in x:
        x['historical_summary'] = x.pop('summary')
    x['summary_current'] = {s: sum(r['status'] == s for r in x['rules']) for s in ['P','U','N','W','H']}
    x['rule_conflict_candidate_current'] = any(c['product_id'] == x['id'] and c['candidate_rule_error'] for c in conflicts)
    for r in x['rules']:
        if 'rule_evidence' in r:
            r['historical_rule_evidence'] = r.pop('rule_evidence')
        r['rule_evidence_current'] = {'file': str(B/'현행규칙-스냅샷.json'), 'rule_id': r['rule_id']}
        for e in r['evidence']:
            p = Path(e['file'])
            if not p.is_absolute():
                e['original_file'] = e['file']
                e['file'] = str(ROOT / p)
            if x['id'] == 'N01' and r['rule_id'] in ['④-22', '④-59']:
                e['role'] = 'current_recheck' if '확장-1014' in e['file'] else 'historical_basis'

save('통합판정.json', {'as_of': target['as_of'], 'rule_snapshot': str(B/'현행규칙-스냅샷.json'),
    'rule_sha256': snapshot['sha256'], 'products': list(matrix.values()), 'conflicts_current': conflicts,
    'method': '기존49×89 재사용+변경3규칙147칸 대조+피코샷 직접재검토+신규 개별89판정. 과거 보조 집계는 historical로 보존.',
    'eligible_count': len(eligible)})

hashes = {str(p.relative_to(B)): hashlib.sha256(p.read_bytes()).hexdigest()
          for p in B.rglob('*.json') if p.name not in ['검증결과.json', '토큰사용량.json']}
save('검증결과.json', {'as_of': target['as_of'], 'matrices': len(matrix), 'rule_count': 89,
    'cells': len(matrix)*89, 'eligible_count': len(eligible), 'eligible_with_matrix': len(qual_ids),
    'problems': problems, 'source_hashes': hashes,
    'status': 'structural_pass' if not problems else 'incomplete'})

def cell(s):
    return str(s).replace('|', '/').replace('\n', ' ')

def ad_info(x):
    d = x.get('duration_decision') or {}
    if d.get('days', 0) >= 60:
        return d.get('ad_id', ''), d['days']
    aa = x.get('ad_evidence', [])
    def days(a):
        return a.get('days', a.get('duration_days_at_snapshot', 0)) or 0
    a = max(aa, key=days, default={})
    return a.get('id', a.get('ad_id', '')), days(a)

lines = ['# 제품별 시장 역검증 — 2026-10-14 확장', '',
    f'60일 이상 광고 표본 **{len(eligible)}개**. 기존 1등급 등 전체 규칙 원장은 **{len(matrix)}개 × 89규칙 = {len(matrix)*89:,}칸**이다.',
    '표본 적격은 시장 수익·효능 입증이 아니다. 같은 상품의 세트 수량·광고 수를 별도 제품으로 늘리지 않았다.', '',
    '## 장기 광고 표본', '', '| ID | 제품 | 확인 광고 ID / 경과일 | 판정 원장 | P/U/N/W/H |', '|---|---|---|---|---|']
for x in eligible:
    aid, days = ad_info(x)
    m = matrix.get(x['matrix_id'], {})
    counts = Counter(r['status'] for r in m.get('rules', []))
    countstr = '/'.join(str(counts.get(s, 0)) for s in ['P','U','N','W','H']) if m else '판정 대기'
    lines.append(f"| {x['id']} | {cell(x['product_name'])} | {aid} / {days}일 | {x['matrix_id'] or '미연결'} | {countstr} |")
lines += ['', 'P=관찰 범위 통과, U=미확인, N=조건 비적용, W=경고, H=하드 문언 충돌. 비용·ROAS·소비자 통념의 인구별 실측 등 밖에서 확인 못한 값은 U로 남겼다.',
    '', '## 남은 확정 H와 집계 의미', '']
for x in conflicts:
    lines.append(f"- **{x['product']} / {x['rule_id']}** — {x['category']}. {x['reason']}")
lines += ['', '피코샷(N01)의 ④-22·④-59는 H→U로 조정했다. 이름·시술 착안 문구만으로 레이저 작동 이식 의도를 확정하지 않았다. [직접 재검토](본체/피코샷/검토.md)를 참고한다.',
    '', '## 보류·제외', '', '| ID | 제품 | 상태 | 이유 |', '|---|---|---|---|']
for x in unknown:
    lines.append(f"| {x['id']} | {cell(x['product_name'])} | {x['status']} | {cell(x['reason'])} |")
lines += ['', '전체 제품·규칙별 이유와 파일 근거는 `통합판정.json`, 표본별 공식 URL·운영사·광고 날짜·근거는 `대상-최종.json`에 있다. 원본 49개 판정은 덮어쓰지 않았다.',
    '', '재사용 방식: 기존 49개는 이전 89개 판정을 유지하되 바뀐 세 규칙 147칸을 대조했다. 새 제품은 89개를 개별 적용했다. 이번 작업에서 기존 모든 상세·영상 전체를 다시 읽었다는 뜻은 아니다.']
(B/'제품별.md').write_text('\n'.join(lines)+'\n', encoding='utf-8')

lines = ['# 규칙별 누적 — 무엇을 고칠 후보로 셀 것인가', '',
    '같은 제품의 광고·제형 옵션·두 문서 사본은 반복 사례가 아니다. 3회 기준은 서로 다른 제품·시장 사례의 검토 신호이며 자동 규칙 수정 권한이 아니다.',
    '', '| 규칙 | 전체 H | 상징 이식 충돌 후보 | 그중 60일 표본 | 해당 제품 |', '|---|---:|---:|---:|---|']
for r in snapshot['rules']:
    rr = [x for x in conflicts if x['rule_id']==r['id']]
    err = [x for x in rr if x['candidate_rule_error']]
    lines.append(f"| {r['id']} | {len(rr)} | {len(err)} | {sum(x['long_ad_eligible'] for x in err)} | {cell(', '.join(x['product'] for x in rr)) or '—'} |")
maxcount = max((sum(x['candidate_rule_error'] and x['rule_id']==r for x in conflicts) for r in ruleids), default=0)
lines += ['', f'현재 상징 이식 충돌 후보의 규칙별 최댓값은 **{maxcount}개**다. 3개 이상인 규칙은 현재 없다.' if maxcount < 3 else '3개 이상인 규칙은 위 표에서 별도 검토한다. 자동 수정하지 않는다.',
    '', '뉴티락의 먹는 관장 표현은 1등급 참고 사례와의 충돌 후보다. 대표의 높은 해부 점수와 관장 이식 자체의 승인, 60일 이상 집행, 실제 매출은 같은 사실이 아니다. 다른 제품·시장으로 재현되는지 보기 전 규칙 오류로 확정하지 않는다.',
    '', '흡착바이트(X12)는 정확 P218의 지방흡입캔디 제목과 식후 원료 포집·차단 서사가 확인되어 ④-22·④-58·④-59와 충돌한다. 82일 광고 표본 한 제품이며 세 규칙에 걸렸다고 세 반례로 세지 않는다. 광고의 주 설명은 키친타올 비유이므로 지방흡입 이름이 매출을 만들었는지까지 입증하지 않는다. 같은 회사 P187 미백캔디와도 실제품을 분리했다.',
    '', '넥필·슬리피솔은 당사의 허가/개발 부담을 제한하려는 의도된 경계이고, 쏘모카는 미판매 기획이다. 하다나 숫돌 안내의 순서 모순은 문구 확인 대상이지 규칙이 지나치게 엄격하다는 증거가 아니다. 이들을 한데 더해 정답 탈락 3회로 만들지 않는다.',
    '', '미확인은 통과도 탈락도 아니다. 세 규칙의 현행 문장 추가는 `규칙변경-검토.md`, 피코샷 판정 보류는 `피코샷-판정변경.json`으로 추적한다.']
(B/'규칙별-누적.md').write_text('\n'.join(lines)+'\n', encoding='utf-8')
print(json.dumps({'eligible': len(eligible), 'matrices': len(matrix), 'problems': problems,
                  'H': [(x['product_id'], x['rule_id'], x['category']) for x in conflicts]}, ensure_ascii=False))

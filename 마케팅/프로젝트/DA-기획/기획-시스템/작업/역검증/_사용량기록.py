"""이번 드릴4/역검증의 작업별 원장. 공유 본체 구간을 중복 합산하지 않는다."""
import datetime
import json
from pathlib import Path

OUT=Path(__file__).resolve().parent
BASE=Path('C:/Users/qorwn/.codex/sessions')
DRILL=OUT.parent.parent/'자가학습/상징짝-드릴/4회차'
PARENT='01a0c2d7-1cc3-7033-b207-fb76a4c4e2cc'
D4=['01a134fd-303d-7020-8566-defd5aefb9b1','01a13509-d707-7ed2-bc60-9cbb12eef24a']
REV=['01a13505-08e1-7e50-ae75-db36a13c0eab','01a13505-0a2b-72d0-b203-c979ee7db1eb','01a134f8-5ac0-7b81-9133-dc2a5333093d','01a13505-4121-7eb0-a7e6-9b6517ccedef','01a13505-0bc3-7043-8cd0-4e6e8283c36c']

def last(aid):
    day='2026/09/21' if aid==PARENT else '2026/10/13'
    f=next(BASE.glob(day+'/*'+aid+'*.jsonl'))
    with f.open('rb') as s:
        s.seek(max(0,f.stat().st_size-8*1024*1024))
        lines=s.read().splitlines()
    for raw in reversed(lines):
        if b'"token_count"' not in raw:continue
        try:d=json.loads(raw)
        except ValueError:continue
        info=d.get('payload',{}).get('info')
        if info and info.get('total_token_usage'):
            return {'timestamp':d['timestamp'],'usage':info['total_token_usage'],'source':str(f)}
    raise ValueError('token snapshot absent: '+aid)

def diff(a,b):return {k:a.get(k,0)-b.get(k,0) for k in ['input_tokens','cached_input_tokens','output_tokens','reasoning_output_tokens','total_tokens']}
def plus(rows):return {k:sum(x.get(k,0) for x in rows) for k in ['input_tokens','cached_input_tokens','output_tokens','reasoning_output_tokens','total_tokens']}
def save(path,obj):path.write_text(json.dumps(obj,ensure_ascii=False,indent=2),encoding='utf-8')
baseline=json.loads((DRILL/'사용량-기준.json').read_text(encoding='utf-8'))
snap={aid:last(aid) for aid in [PARENT]+D4+REV}
parent=diff(snap[PARENT]['usage'],baseline['baseline']['usage'])
drill=plus([diff(snap[aid]['usage'],baseline['agents_baseline'][aid]) for aid in D4])
reverse=plus([snap[aid]['usage'] for aid in REV])
total=plus([parent,drill,reverse])
data={'as_of':datetime.datetime.now().astimezone().isoformat(),'scope':'히트10 마감 뒤 본체 공유 구간 + 드릴4 전담 차분 + 역검증 전담 전체. 업무별 순수 비용 아님.','parent_shared':parent,'drill4_agents':drill,'reverse_agents':reverse,'combined_without_double_counting':total,'uncached_input_tokens':total['input_tokens']-total['cached_input_tokens'],'snapshots':snap,'limits':'캐시는 입력의 부분집합, reasoning은 출력 부분집합. 로컬 Python/ASR/이미지 추출은 별도 모델 토큰 호출 아님. 가격·계정 사용률과 선형 환산 불가. 본체 공유량을 양쪽에 각각 더하지 않음. 보고서 최종 작성 이후 소량은 미포함.'}
save(OUT/'토큰사용량.json',data)
save(DRILL/'사용량-마감.json',{'scope':'드릴4 담당 에이전트 차분은 직접귀속, 본체는 역검증과 공유하므로 별도 표시','drill4_agents':drill,'parent_shared_do_not_add_twice':parent,'measurement':str(OUT/'토큰사용량.json'),'snapshots':{k:snap[k] for k in [PARENT]+D4}})
lines=['# 드릴4·역검증 사용량','', '| 구간 | 총 토큰 | 캐시 입력 | 출력 |','|---|---:|---:|---:|']
for label,v in [('드릴4 전담',drill),('역검증 전담',reverse),('본체 공유 구간',parent),('중복 없는 합계',total)]:
    lines.append(f"| {label} | {v['total_tokens']:,} | {v['cached_input_tokens']:,} | {v['output_tokens']:,} |")
lines+=['',f"캐시 제외 새 입력 합계: **{data['uncached_input_tokens']:,}토큰**.",'',data['scope'],data['limits'],'','영상5편 관찰 구간819,164토큰은 별도 이전 작업인 히트10의 수치다. 이번 합계에 다시 더하지 않았다.','', '계정 사용률: 드릴4 시작 참고23%, 21:41경39%. 계정 공용이며 다른 업무와 겹치므로 차이를 이 작업 사용률로 확정하지 않는다. 5시간 창은 도구에서 수치를 제공하지 않았다.']
(OUT/'토큰사용량.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
print(json.dumps({k:data[k] for k in ['drill4_agents','reverse_agents','parent_shared','combined_without_double_counting']},ensure_ascii=False))

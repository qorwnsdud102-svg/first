"""본체 회차 차분과 전담 세션 원장. 캐시·추론 토큰을 중복 합산하지 않는다."""
import json, datetime, sys
from pathlib import Path
OUT=Path(__file__).parent
ROOT=Path('C:/Users/qorwn/.codex/sessions')
PARENT='01a0c2d7-1cc3-7033-b207-fb76a4c4e2cc'
AGENTS=['01a135c2-99e8-7cb2-b53d-10754c14ed51','01a135c2-9b3b-78b0-bed5-56954f073586']
KEYS=['input_tokens','cached_input_tokens','output_tokens','reasoning_output_tokens','total_tokens']
def last(aid):
    day='2026/09/21' if aid==PARENT else '2026/10/13'
    f=next(ROOT.glob(day+'/*'+aid+'*.jsonl'))
    with f.open('rb') as s:
        s.seek(max(0,f.stat().st_size-8*1024*1024));lines=s.read().splitlines()
    for row in reversed(lines):
        if b'"token_count"' not in row:continue
        try:d=json.loads(row)
        except ValueError:continue
        info=d.get('payload',{}).get('info')
        if info and info.get('total_token_usage'):return dict(timestamp=d['timestamp'],usage=info['total_token_usage'],source=str(f))
    raise RuntimeError('No token event: '+aid)
base=json.loads((OUT/'../../상징짝-드릴/5회차/본체-마감기준.json').read_text('utf-8'))
snap={aid:last(aid) for aid in [PARENT]+AGENTS}
parent={k:snap[PARENT]['usage'].get(k,0)-base['usage'].get(k,0) for k in KEYS}
agents={k:sum(snap[a]['usage'].get(k,0) for a in AGENTS) for k in KEYS}
total={k:parent[k]+agents[k] for k in KEYS}
assert all(v>=0 for v in total.values())
obj=dict(as_of=datetime.datetime.now().astimezone().isoformat(),parent=parent,agents=agents,total=total,uncached_input=total['input_tokens']-total['cached_input_tokens'],baseline=base,snapshots=snap,
limitations='본체는 드릴5 마감 뒤 차분. 전담 F/I 세션 누적1회 합산. 영상만의 분리 계량 아님. 캐시는 입력 부분집합·추론은 출력 부분집합. 계정 사용률은 다른 대화와 공유.')
(OUT/'토큰사용량.json').write_text(json.dumps(obj,ensure_ascii=False,indent=2),'utf-8')
if '--freeze' in sys.argv:(OUT/'본체-마감기준.json').write_text(json.dumps(snap[PARENT],ensure_ascii=False,indent=2),'utf-8')
lines=['# 히트12 사용량','',f"측정: {obj['as_of']}",'','| 범위 | 총 토큰 | 캐시 입력 | 새 입력 | 출력 |','|---|---:|---:|---:|---:|']
for name,d in [('본체 차분',parent),('구강·여성 전담',agents),('합계',total)]:
    lines.append(f"| {name} | {d['total_tokens']:,} | {d['cached_input_tokens']:,} | {d['input_tokens']-d['cached_input_tokens']:,} | {d['output_tokens']:,} |")
lines+=['','캐시 입력은 반복된 대화·자료 재사용분이다. 출력 안의 추론 토큰을 다시 더하지 않는다. 본체 누적원장의 총토큰과 입력+출력에 일정 차이가 있으나 시작·끝 차분에서 상쇄되는지 확인한다.',f"이번 합계 검산 차이: {total['total_tokens']-total['input_tokens']-total['output_tokens']:,}토큰.",'','범위는 후보 탐색·페이지/후기 조사·광고 수집·판독·파일 작성·검증을 모두 포함한다. **영상 한 편만 분석할 때의 비용으로 나눠 제시하지 않는다.** 로컬 음성인식·프레임 추출 자체에는 별도 OpenAI 호출이 없지만 그 결과를 모델이 읽는 비용은 포함된다.','', '광고 판독22소재=영상12+정적10. 상세/후기6상품 포함. 첫0.2초와 전후 표본·ASR 전체를 읽었으며 전프레임 연속 시청은 아니다. 브라우저 다운로드 도구의 장시간 응답 지연이 있었고 HTTP 원본 수집으로 전환했다. 지연시간을 모델 추론 시간이나 토큰 비용으로 환산하지 않는다.','', '계정 주간 사용률 시작77%, 마감값은 작업기록 참조. 5시간창은 도구 미제공. 같은 계정을 쓰는 다른 대화가 있어 사용률 변화 전부를 이 작업으로 확정할 수 없다. 구독사용량이므로 API단가로 실제 청구비용을 계산하지 않는다.']
(OUT/'토큰사용량.md').write_text('\n'.join(lines)+'\n','utf-8')
print(json.dumps({'total':total,'new_input':obj['uncached_input']},ensure_ascii=False))

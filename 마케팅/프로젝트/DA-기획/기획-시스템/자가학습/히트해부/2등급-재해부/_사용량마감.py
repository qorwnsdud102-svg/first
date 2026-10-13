"""본체 회차 차분과 전담 세션 원장. 캐시·추론 토큰을 중복 합산하지 않는다."""
import json, datetime, sys
from pathlib import Path
OUT=Path(__file__).parent
ROOT=Path('C:/Users/qorwn/.codex/sessions')
PARENT='01a0c2d7-1cc3-7033-b207-fb76a4c4e2cc'
AGENTS=['01a13769-7136-78e1-b3f4-1c62c524b98c','01a13769-7280-72c3-ac3b-9e42c559434f','01a13769-74c9-70e0-aec3-56d3370bf65c']
KEYS=['input_tokens','cached_input_tokens','output_tokens','reasoning_output_tokens','total_tokens']
def last(aid):
    day='2026/09/21' if aid==PARENT else '2026/10/14'
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
base=json.loads((OUT/'본체-시작기준.json').read_text('utf-8'))
snap={aid:last(aid) for aid in [PARENT]+AGENTS}
parent={k:snap[PARENT]['usage'].get(k,0)-base['usage'].get(k,0) for k in KEYS}
agents={k:sum(snap[a]['usage'].get(k,0) for a in AGENTS) for k in KEYS}
total={k:parent[k]+agents[k] for k in KEYS}
assert all(v>=0 for v in total.values())
obj=dict(as_of=datetime.datetime.now().astimezone().isoformat(),parent=parent,agents=agents,total=total,uncached_input=total['input_tokens']-total['cached_input_tokens'],baseline=base,snapshots=snap,
limitations='본체는 2등급 재해부 시작 뒤 차분. 전담 A/B/C 세션 누적1회 합산. 별도 역검증Dirac은 불포함. 본체에는 역검증 보강 조율·4개Meta조회 비용도 포함돼 재해부 단독 순수비용은 아님. 영상만의 분리 계량 아님. 캐시는 입력 부분집합·추론은 출력 부분집합. 계정 사용률은 다른 대화와 공유.')
(OUT/'토큰사용량.json').write_text(json.dumps(obj,ensure_ascii=False,indent=2),'utf-8')
if '--freeze' in sys.argv:(OUT/'본체-마감기준.json').write_text(json.dumps(snap[PARENT],ensure_ascii=False,indent=2),'utf-8')
lines=['# 2등급 재해부 사용량','',f"측정: {obj['as_of']}",'','| 범위 | 총 토큰 | 캐시 입력 | 새 입력 | 출력 |','|---|---:|---:|---:|---:|']
for name,d in [('본체 차분',parent),('제품6개 전담3명',agents),('합계',total)]:
    lines.append(f"| {name} | {d['total_tokens']:,} | {d['cached_input_tokens']:,} | {d['input_tokens']-d['cached_input_tokens']:,} | {d['output_tokens']:,} |")
lines+=['','캐시 입력은 반복된 대화·자료 재사용분이다. 출력 안의 추론 토큰을 다시 더하지 않는다. 본체 누적원장의 총토큰과 입력+출력에 일정 차이가 있으나 시작·끝 차분에서 상쇄되는지 확인한다.',f"이번 합계 검산 차이: {total['total_tokens']-total['input_tokens']-total['output_tokens']:,}토큰.",'','본체 차분에는 병행한 역검증 보강 조율과4개Meta조회도 포함된다. 별도 역검증 조사자의 누적은 이 표에 포함하지 않았고 `작업/역검증/보강-1014/본체-보강/조사자-사용량.json`에 분리했다. 해당 비용을 전체 합계에 추가할 때는 한 번만 더한다.','', '범위는 후보 탐색·페이지/후기 조사·광고 수집·판독·파일 작성·검증을 모두 포함한다. **영상 한 편만 분석할 때의 비용으로 나눠 제시하지 않는다.** 로컬 음성인식·프레임 추출 자체에는 별도 OpenAI 호출이 없지만 그 결과를 모델이 읽는 비용은 포함된다.','', '최종 판독 범위는 결과.md 참조. 광고30묶음의 기본22영상8정적에 캐러셀22장·DCO영상10개를 추가 수집했다. 첫0.2초와 전후 표본·ASR을 대조하며 전프레임 연속 시청은 아니다. 로컬 처리시간을 모델 추론시간이나 토큰비용으로 환산하지 않는다.','', '계정 주간 사용률 시작0%, 마감값은 작업기록 참조. 5시간창은 도구 미제공. 같은 계정을 쓰는 다른 대화가 있어 사용률 변화 전부를 이 작업으로 확정할 수 없다. 구독사용량이므로 API단가로 실제 청구비용을 계산하지 않는다.']
(OUT/'토큰사용량.md').write_text('\n'.join(lines)+'\n','utf-8')
print(json.dumps({'total':total,'new_input':obj['uncached_input']},ensure_ascii=False))

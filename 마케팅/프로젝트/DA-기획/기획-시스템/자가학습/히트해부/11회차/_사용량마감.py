"""이번 회차 원장 차분. ASR의 CPU 작업을 모델 토큰으로 더하지 않는다."""
import json, datetime
from pathlib import Path

OUT = Path(__file__).parent
BASE = Path('C:/Users/qorwn/.codex/sessions')
PARENT = '01a0c2d7-1cc3-7033-b207-fb76a4c4e2cc'
AGENTS = ['01a13562-cd91-7401-bbb3-d08c78a81417', '01a13562-cf6d-7781-b2c0-24313a12a1b0']
KEYS = ['input_tokens','cached_input_tokens','output_tokens','reasoning_output_tokens','total_tokens']

def last(aid):
    day = '2026/09/21' if aid == PARENT else '2026/10/13'
    f = next(BASE.glob(day+'/*'+aid+'*.jsonl'))
    with f.open('rb') as s:
        s.seek(max(0, f.stat().st_size-8*1024*1024))
        lines = s.read().splitlines()
    for raw in reversed(lines):
        if b'"token_count"' not in raw: continue
        try: d = json.loads(raw)
        except ValueError: continue
        info = d.get('payload',{}).get('info')
        if info and info.get('total_token_usage'):
            return dict(timestamp=d['timestamp'],usage=info['total_token_usage'],source=str(f))
    raise ValueError('usage absent: '+aid)

baseline = json.loads((OUT/'사용량-기준.json').read_text('utf-8'))
snaps = {aid:last(aid) for aid in [PARENT]+AGENTS}
parent_end = OUT/'본체-마감기준.json'
if parent_end.exists():
    snaps[PARENT] = json.loads(parent_end.read_text('utf-8'))
else:
    parent_end.write_text(json.dumps(snaps[PARENT],ensure_ascii=False,indent=2),'utf-8')
parent = {k:snaps[PARENT]['usage'].get(k,0)-baseline['usage'].get(k,0) for k in KEYS}
agent = {k:sum(snaps[a]['usage'].get(k,0) for a in AGENTS) for k in KEYS}
total = {k:parent[k]+agent[k] for k in KEYS}
data = dict(as_of=datetime.datetime.now().astimezone().isoformat(),parent=parent,agents=agent,total=total,uncached_input=total['input_tokens']-total['cached_input_tokens'],snapshots=snaps,baseline=baseline,
            limitations='본체는 저장된 마감기준까지, 전담 에이전트는 최종 원장 전체. 회고 준비와 H11 마지막 보강의 본체 소량은 다음 구간과 공유. 일부 에이전트 시작이 이전 회차 마감과 겹쳤으므로 회차끼리 정확합산 금지. 캐시는 입력 부분집합, reasoning은 출력 부분집합. 영상만의 비용 아님. 계정공용사용률과 선형환산 불가.')
(OUT/'토큰사용량.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),'utf-8')
lines=['# 히트11 사용량','', '| 범위 | 총 토큰 | 캐시 입력 | 새 입력 | 출력 |','|---|---:|---:|---:|---:|']
for label,d in [('본체',parent),('E/G 전담',agent),('합계',total)]:
    lines.append(f"| {label} | {d['total_tokens']:,} | {d['cached_input_tokens']:,} | {d['input_tokens']-d['cached_input_tokens']:,} | {d['output_tokens']:,} |")
lines += ['', '상세·후기 조사, 광고 수집과 이미지/ASR 판독, 파일 작성·검증을 합친 범위다. 영상만의 순수 토큰 비용으로 제시하지 않는다. 로컬 ASR·이미지 추출은 별도 OpenAI 호출이 아니지만 결과를 모델이 읽는 부분은 위 토큰에 포함된다.', '', '규모: 후보5, Meta26조회·중복 포함360광고. 선정16소재=영상12+정적4. 영상은 ASR 전체파일+표본장면을 판독했고 무인식/오인식·전프레임 미확인 한계를 보존한다.', '', data['limitations'], '', '계정 주간 사용률: 시작44%, 마감 직전58%. 다른 작업과 공유. 5시간창은 도구가 반환하지 않아 측정 불가. 이14%p 전부를 이번 회차의 소비로 확정하지 않는다.']
(OUT/'토큰사용량.md').write_text('\n'.join(lines)+'\n','utf-8')
print(json.dumps({'total':total,'uncached_input':data['uncached_input']},ensure_ascii=False))

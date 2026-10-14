"""역검증 확장+도중 접수한 학습안 제안의 실제 세션 기록을 한 번씩 집계."""
import json, datetime
from pathlib import Path
B=Path(__file__).parent
ROOT=Path('C:/Users/qorwn/.codex/sessions')
PARENT='01a0c2d7-1cc3-7033-b207-fb76a4c4e2cc'
AGENTS={
 '01a13793-a3a9-7ef1-8c52-c41190f75b67':'기존 L 보강 + 학습안 독립 검토',
 '01a13793-a4e6-7073-8a64-4af6efe5b705':'AP 보강 + 두 제품 규칙 판정',
 '01a13793-a6a1-77d1-9e16-e8edc4108782':'새 후보 보강',
 '01a13797-9db5-7993-8442-0353f6955677':'다섯 제품 규칙 판정',
 '01a137a9-4177-7f73-9e15-3f2777229f55':'추가 판정 시도 — 두 차례 통신 실패',
 '01a137b1-a3ab-7e31-8228-1199c76050c0':'세 제품 판정 복구·저장',
}
# 실제 발급된 ID. 이름·시간으로 다른 세션 비용을 임의 연결하지 않는다.
KEYS=['input_tokens','cached_input_tokens','output_tokens','reasoning_output_tokens','total_tokens']
def last(aid):
 day='2026/09/21' if aid==PARENT else '2026/10/14'
 files=list(ROOT.glob(day+'/*'+aid+'*.jsonl'))
 assert len(files)==1,(aid,files)
 p=files[0]
 with p.open('rb') as f:
  f.seek(max(0,p.stat().st_size-16*1024*1024)); data=f.read().splitlines()
 for line in reversed(data):
  if b'"token_count"' not in line: continue
  try:d=json.loads(line)
  except ValueError:continue
  info=d.get('payload',{}).get('info')
  if info and info.get('total_token_usage'):
   return {'timestamp':d['timestamp'],'usage':info['total_token_usage'],'source':str(p)}
 raise ValueError('No token snapshot '+aid)
base=json.loads((B/'본체-시작기준.json').read_text(encoding='utf-8'))
snap={aid:last(aid) for aid in [PARENT]+list(AGENTS)}
parent={k:snap[PARENT]['usage'].get(k,0)-base['usage'].get(k,0) for k in KEYS}
agents={k:sum(snap[a]['usage'].get(k,0) for a in AGENTS) for k in KEYS}
total={k:parent[k]+agents[k] for k in KEYS}
assert all(v>=0 for v in total.values())
assert total['total_tokens']==total['input_tokens']+total['output_tokens']
out={'as_of':datetime.datetime.now().astimezone().isoformat(),'parent':parent,'agents':agents,'total':total,
 'uncached_input':total['input_tokens']-total['cached_input_tokens'], 'baseline':base,'agent_roles':AGENTS,'snapshots':snap,
 'scope':'역검증 확장 + 도중 신규 접수한 GPT 학습방식 제안·비교. 본체 시작기준 이후 차분+이번6개 분담 세션 누적을 각1회 합산. 실패 시도 포함.',
 'limitations':'캐시는 입력 부분집합, 추론은 출력 부분집합. 학습방식-GPT제안/사용량.json의 부분 구간은 여기 포함되어 재합산 금지. 이전 2등급 재해부 45,822,755토큰은 별도 회차이므로 불포함. 영상 단독 비용·제품 하나당 신규 분석 비용이 아니다. 기록 시점 이후 마감 답변과 브리지 전달의 소량은 미포함. 구독 사용량을 API 청구액으로 바꾸지 않는다.'}
if (B/'계정사용량-마감.json').exists():out['account_snapshot']=json.loads((B/'계정사용량-마감.json').read_text(encoding='utf-8'))
(B/'토큰사용량.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
(B/'본체-마감기준.json').write_text(json.dumps(snap[PARENT],ensure_ascii=False,indent=2),encoding='utf-8')
lines=['# 역검증 확장·학습안 제안 사용량','',f"측정: {out['as_of']}",'',out['scope'],'',
 '| 범위 | 총 토큰 | 캐시 입력 | 새 입력 | 출력 |','|---|---:|---:|---:|---:|']
for name,d in [('본체 차분',parent),('분담6개 세션(실패·복구 포함)',agents),('합계',total)]:
 lines.append(f"| {name} | {d['total_tokens']:,} | {d['cached_input_tokens']:,} | {d['input_tokens']-d['cached_input_tokens']:,} | {d['output_tokens']:,} |")
lines+=['',out['limitations'],'','총 토큰은 문맥을 반복 읽은 캐시 입력을 포함한다. 따라서 산출물 글자 수보다 크다. 실패한 분담을 2회 재개하고 새 분담으로 복구한 비용도 숨기지 않고 포함했다. 캐시가 항상 무료라는 뜻은 아니다.','', '계정 주간 시작 관찰은 25%. 마감 관찰은 별도 계정 스냅샷 참조. 같은 계정을 쓰는 다른 작업이 있어 비율 차이를 이 작업 고유 비용으로 단정하지 않는다. 5시간창은 제공되지 않았다.','', '검산: 입력+출력=총토큰. 캐시 입력과 추론 출력을 다시 더하지 않았다. 각 세션 종료 또는 최신 기록의 정확한 시각·누적값은 JSON에 있다.']
(B/'토큰사용량.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
print(json.dumps({'total':total,'new_input':out['uncached_input']},ensure_ascii=False))

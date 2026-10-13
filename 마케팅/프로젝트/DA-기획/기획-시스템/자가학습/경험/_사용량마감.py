import json,datetime
from pathlib import Path
P=Path(__file__).parent
S=Path('C:/Users/qorwn/.codex/sessions')
parent='01a0c2d7-1cc3-7033-b207-fb76a4c4e2cc'
agents=['01a1358c-89b7-7df1-87c6-436aae4a83e0','01a1358c-8aed-71e1-b9af-7eafb459c46f','01a1358c-8d57-7691-8030-6707bcf83cdb','01a1358e-75b5-7303-b15b-22c7ff22d9c1']
judge='01a1359f-5dd8-7ae3-b538-fb17cafce2dc'
keys=['total_tokens','input_tokens','cached_input_tokens','output_tokens','reasoning_output_tokens']
def snap(aid):
 day='2026/09/21' if aid==parent else '2026/10/13'
 f=next(S.glob(day+'/*'+aid+'*.jsonl'))
 with f.open('rb') as z:
  z.seek(max(0,f.stat().st_size-8*1024*1024));lines=z.read().splitlines()
 for b in reversed(lines):
  if b'"token_count"' not in b:continue
  try:d=json.loads(b)
  except ValueError:continue
  info=d.get('payload',{}).get('info',{})
  if info and info.get('total_token_usage'):return dict(timestamp=d['timestamp'],usage=info['total_token_usage'],source=str(f))
 raise ValueError(aid)
base=json.loads((P/'../히트해부/11회차/본체-마감기준.json').read_text('utf-8'))
snaps={x:snap(x) for x in [parent]+agents+[judge]}
end=P/'본체-마감기준.json'
if end.exists():snaps[parent]=json.loads(end.read_text('utf-8'))
else:end.write_text(json.dumps(snaps[parent],ensure_ascii=False,indent=2),'utf-8')
groups={
 '본체 공유구간':{k:snaps[parent]['usage'].get(k,0)-base['usage'].get(k,0) for k in keys},
 '회고 전담4':{k:sum(snaps[x]['usage'].get(k,0) for x in agents) for k in keys},
 '눈v6 별도 채점1':{k:snaps[judge]['usage'].get(k,0) for k in keys}}
total={k:sum(g[k] for g in groups.values()) for k in keys}
data=dict(as_of=datetime.datetime.now().astimezone().isoformat(),groups=groups,total=total,uncached_input=total['input_tokens']-total['cached_input_tokens'],baseline=base,snapshots=snaps,
 limitations='본체는 H11 마지막 인계·회고·눈v6 준비/통합의 공유구간이다. 전담4개+채점1개는 각 원장 전체. 캐시는 입력 부분집합, reasoning은 출력 부분집합. 계정 %는 다른 활동과 공유, 선형 비용환산 금지.',account_weekly_start=58,account_weekly_last=71,five_hour=None)
(P/'토큰사용량.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),'utf-8')
lines=['# 전체 회고 + 눈v6 사용량','', '| 구간 | 총 | 캐시 입력 | 새 입력 | 출력 |','|---|---:|---:|---:|---:|']
for n,d in list(groups.items())+[('합계',total)]:lines.append(f"| {n} | {d['total_tokens']:,} | {d['cached_input_tokens']:,} | {d['input_tokens']-d['cached_input_tokens']:,} | {d['output_tokens']:,} |")
lines+=['',data['limitations'],'','계정공유 주간: 시작58%, 마지막 확인71%. 5시간창 미제공. 사용량 재설정은 실행하지 않았다.']
(P/'토큰사용량.md').write_text('\n'.join(lines)+'\n','utf-8')
eye=P/'../시험/눈-v6/결과'
(eye/'별도채점-사용량.json').write_text(json.dumps(snaps[judge],ensure_ascii=False,indent=2),'utf-8')
print(json.dumps(dict(groups=groups,total=total,uncached_input=data['uncached_input']),ensure_ascii=False))

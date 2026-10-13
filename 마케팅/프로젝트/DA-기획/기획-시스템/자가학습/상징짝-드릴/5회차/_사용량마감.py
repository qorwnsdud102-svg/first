import json,datetime
from pathlib import Path
P=Path(__file__).parent
S=Path('C:/Users/qorwn/.codex/sessions')
parent='01a0c2d7-1cc3-7033-b207-fb76a4c4e2cc'
agents=['01a135a9-c09e-78c2-93a8-470254e21d85','01a135a9-c1ed-78f2-9494-12ea56ada57f']
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
base=json.loads((P/'../../경험/본체-마감기준.json').read_text('utf-8'))
snaps={x:snap(x) for x in [parent]+agents}
end=P/'본체-마감기준.json'
if end.exists():snaps[parent]=json.loads(end.read_text('utf-8'))
else:end.write_text(json.dumps(snaps[parent],ensure_ascii=False,indent=2),'utf-8')
groups={'본체':{k:snaps[parent]['usage'].get(k,0)-base['usage'].get(k,0) for k in keys},'분담2명':{k:sum(snaps[x]['usage'].get(k,0) for x in agents) for k in keys}}
total={k:sum(g[k] for g in groups.values()) for k in keys}
data=dict(as_of=datetime.datetime.now().astimezone().isoformat(),groups=groups,total=total,uncached_input=total['input_tokens']-total['cached_input_tokens'],baseline=base,snapshots=snaps,account_weekly_start=71,account_weekly_last=77,five_hour=None,limitations='캐시는 입력의 일부·reasoning은 출력의 일부. 계정 %는 타 작업 공유. 본체에 회고 마지막 인계와 다음 H12 지시 읽기 일부 포함. 마감 뒤 안내 토큰은 다음 구간에 속함.')
(P/'토큰사용량.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),'utf-8')
lines=['# 드릴5 사용량','','| 구간 | 총 | 캐시 입력 | 새 입력 | 출력 |','|---|---:|---:|---:|---:|']
for n,d in list(groups.items())+[('합계',total)]:lines.append(f"| {n} | {d['total_tokens']:,} | {d['cached_input_tokens']:,} | {d['input_tokens']-d['cached_input_tokens']:,} | {d['output_tokens']:,} |")
lines+=['',data['limitations'],'','계정공유 주간71%→77%. 5시간 수치 미제공. 재설정하지 않음.']
(P/'토큰사용량.md').write_text('\n'.join(lines)+'\n','utf-8')
print(json.dumps(dict(total=total,uncached_input=data['uncached_input']),ensure_ascii=False))

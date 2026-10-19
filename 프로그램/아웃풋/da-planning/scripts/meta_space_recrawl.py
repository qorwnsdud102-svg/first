"""M20 메타 띄어쓰기 재수집 — `메타판매처/_띄어쓰기-재수집.json` 순서대로 띄어 쓴 꼴을 한 회차 6개 안쪽으로 모은다.
메타가 다음 장을 막으면(code 1675004, --stop-on-rate-limit) 그 회차에서 멈추고 40분 쉰 뒤 이어 간다(주말 메타 줄과 같은 쉼). 잘린 키워드는 '끝'에 넣지 않아 다시 받는다.
사용: python meta_space_recrawl.py [--rounds N]   (기본 1회차)"""
import json, os, subprocess, sys, time
from pathlib import Path
Q = Path(r'C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획\결핍책\메타판매처\_띄어쓰기-재수집.json')
TOOL = r'C:\claude\네이버 급상승 키워드 기반 경쟁사 발굴\scripts'
PER = 6
REST = 40 * 60

rounds = int(sys.argv[sys.argv.index('--rounds') + 1]) if '--rounds' in sys.argv else 1
if '--wait' in sys.argv: time.sleep(int(sys.argv[sys.argv.index('--wait') + 1]) * 60)   # 막 제한이 걸린 뒤 다시 띄울 때 먼저 쉼
for _ in range(rounds):
    q = json.loads(Q.read_text(encoding='utf-8')); done = set(q.get('끝', []))
    left = [kw for n in q['순서'] for kw in q['키워드'].get(n, []) if kw not in done]
    left = list(dict.fromkeys(left))
    cuts = q.get('잘림', {}); left.sort(key=lambda k: cuts.get(k, 0))   # 잘린 횟수가 적은 것부터 — 한 키워드가 줄을 막지 않게
    if not left: print('남은 키워드 없음'); break
    batch = left[:PER]; title = f"결핍책-띄어쓰기-{time.strftime('%m%d%H%M')}"
    print(f"{time.strftime('%H:%M')} {title}: {', '.join(batch)}", flush=True)
    subprocess.run([sys.executable, '-X', 'utf8', 'scrape_meta.py', '--title', title, '--keywords', ','.join(batch),
                    '--no-variants', '--pause', '5', '--stop-on-rate-limit'], cwd=TOOL)
    summ = json.loads((Path(TOOL) / f'{title}_메타광고소재' / '_summary.json').read_text(encoding='utf-8'))
    ok = [s['brand'] for s in summ if not s.get('truncated')]
    cut = [s['brand'] for s in summ if s.get('truncated')]
    q = json.loads(Q.read_text(encoding='utf-8')); q['끝'] = list(dict.fromkeys(q.get('끝', []) + ok))
    q.setdefault('잘림', {}); [q['잘림'].__setitem__(c, q['잘림'].get(c, 0) + 1) for c in cut]
    Q.write_text(json.dumps(q, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f"  끝 {len(ok)}개 · 잘림 {len(cut)}개 {cut}", flush=True)
    if cut: print(f"  메타 제한 — {REST // 60}분 쉼(우회 안 함)", flush=True); time.sleep(REST)

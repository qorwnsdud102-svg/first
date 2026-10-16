"""유튜브 보충 — 결핍·대안 폴더의 영상-원자료.json에 영상을 더 골라 붙인다(받기·받아쓰기는 deficit_book_run.py를 다시 돌리면 빈 것만 한다).
사장님 2026-10-16: "유튜브 영상을 좀 더 많이 받았으면 좋겠고 (유튜브에 제한안당하는선에서)".
- 목표: 결핍 의사·설명 20 + 경험 10, 대안 4 + 2. 이미 고른 영상은 그대로 두고 모자란 만큼만 고른다(같은 영상은 안 고름).
- 유튜브 검색 간격은 voice_rate.gate('youtube')가 프로세스를 넘어 지킨다(막히면 기다림, 우회 안 함).
사용: python yt_extend.py <계획.json> [계열 ...]"""
import json, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; sys.path.insert(0, str(HERE))
import deficit_book_collect as base
v2 = base.v2
GOAL = {'결핍': (20, 10), '대안': (4, 2)}

def main():
    plan = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8')); only = set(sys.argv[2:])
    for fam in plan['families']:
        if only and fam['family'] not in only: continue
        for f in fam['folders']:
            folder = base.folder_of(f); path = folder / '영상-원자료.json'
            if not path.exists(): print(f['name'], '영상 목록 없음 — 수집기가 먼저'); continue
            recs = json.loads(path.read_text(encoding='utf-8')); seen = {r['id'] for r in recs}
            have_d = sum(1 for r in recs if str(r.get('role', '')).startswith('의사'))
            have_r = len(recs) - have_d
            nd, nr = GOAL[f['kind']]
            log = []
            doc = f.get('yt_doctor') or [f['name'] + ' 원리']; rev = f.get('yt_review') or [f['name'] + ' 후기']
            add = []
            if nd > have_d: add += base.pick_videos(doc + [f['name'] + ' 원인', f['name'] + ' 치료'], nd - have_d, '의사·설명', seen, log)
            if nr > have_r: add += base.pick_videos(rev + [f['name'] + ' 경험'], nr - have_r, '경험·후기', seen, log)
            if add:
                recs += [r for r in add if r['id'] not in {x['id'] for x in recs}]
                v2.write(path, recs)
            print(f"{f['kind']}/{f['name']} 의사 {have_d}→ · 경험 {have_r}→ · 더 고름 {len(add)}", flush=True)

if __name__ == '__main__':
    main()

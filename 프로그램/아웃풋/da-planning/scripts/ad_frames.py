# -*- coding: utf-8 -*-
"""메타 광고 영상 화면 재료 — 받은 광고 영상마다 '첫 3초'(0.2~3.2초 6장면)와 '전체 흐름'(3초~끝 6장면) 모아보기를 만들고,
결핍마다 판매처·게재일·받아쓰기 첫머리와 함께 <결핍>-화면재료.md로 묶는다(모델 없음 — Sonnet이 이것과 그림을 읽고 <결핍>-화면.md를 쓴다).
사장님 2026-10-17: 받아쓰기는 소리만 잡으니 첫 3초 화면 자막·전후 장면·제품 보여주는 방식도 보자("그래").
- 영상: 결핍책/메타판매처/_영상/<광고ID>.mp4 (meta_weekend_line이 광고 ID로 받은 것)
- 어떤 영상: <결핍>-영상ID.txt(판매처 상위 12곳) + <결핍>-해부영상ID.txt(상세페이지 본 5곳) 중 받은 것, 결핍당 최대 12편
- 판매처·게재일: <결핍>-소재.md의 '## 판매처'·'### 소재 <ID> · N일 게재' 줄에서 읽는다
사용: python ad_frames.py <결핍> [...]   |   python ad_frames.py --ready  (영상 받기를 끝낸 결핍 중 화면재료가 없는 것 모두)"""
import json, os, re, subprocess, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent; sys.path.insert(0, str(HERE))
import ad_media
OUT = Path(r'C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획\결핍책\메타판매처'); VID = OUT / '_영상'; SCN = VID / '_장면'
STATE = Path(r'C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획\결핍책\묶음\_메타줄.json')
MAX = 12

def sellers_of(need):
    """소재.md에서 광고ID → (판매처, 게재일, 문구 첫 줄)."""
    p = OUT / f'{need}-소재.md'; m, cur = {}, ''
    if not p.exists(): return m
    lines = p.read_text(encoding='utf-8').splitlines()
    for i, line in enumerate(lines):
        h = re.match(r'## (\S+)', line)
        if h and not line.startswith('## 영상'): cur = h.group(1)
        s = re.match(r'### 소재 (\d+) · (\d+)일', line)
        if s: m[s.group(1)] = (cur, int(s.group(2)), next((x.strip() for x in lines[i + 1:i + 4] if x.strip() and not x.startswith('#')), '')[:120])
    return m

def ids_of(need):
    ids = []
    for suf in ('-영상ID.txt', '-해부영상ID.txt'):
        p = OUT / f'{need}{suf}'
        if p.exists(): ids += [x.strip() for x in p.read_text(encoding='utf-8').replace('\n', ',').split(',') if x.strip().isdigit()]
    return [i for i in dict.fromkeys(ids) if (VID / f'{i}.mp4').exists()][:MAX]

def frames(ff, aid):
    src = str(VID / f'{aid}.mp4'); SCN.mkdir(parents=True, exist_ok=True)
    a, b = SCN / f'{aid}-첫3초.jpg', SCN / f'{aid}-전체.jpg'
    if not a.exists(): ad_media.sheet(ff, src, str(a), 0.2, 3.0)
    dur = ad_media.duration(ff, src) or 15.0
    if not b.exists() and dur > 4: ad_media.sheet(ff, src, str(b), 3.0, max(dur - 3.5, 1.0))
    return [x for x in (a, b) if x.exists()], dur

def one(need):
    ff = ad_media.ffmpeg_exe(); sm = sellers_of(need); ids = ids_of(need)
    L = [f'# {need} — 메타 광고 영상 화면 재료 (모델 없음)', '',
         f'영상 {len(ids)}편(판매처 상위·상세페이지 본 곳). 그림마다 3x2 칸, 왼쪽 위가 첫 장면. 「첫3초」는 0.2~3.2초를 6칸, 「전체」는 3초~끝을 6칸으로 고르게 뽑았다.', '']
    for aid in ids:
        seller, days, copy = sm.get(aid, ('(판매처 모름)', 0, ''))
        if re.search(r'drama|novel|reel|shortmax|webfic|드라마|웹소설', seller + copy, re.I): continue   # 10-17 튼살: 숏드라마 앱 영상 3편이 섞임
        imgs, dur = frames(ff, aid)
        tr = VID / f'{aid}.음성.txt'
        voice = tr.read_text(encoding='utf-8')[:300].replace('\n', ' ') if tr.exists() else '(받아쓰기 없음)'
        L += [f'## {aid} · {seller} · {days}일 게재 · {dur:.0f}초', f'- 문구 첫 줄: {copy}', f'- 음성 첫머리: {voice}'] + [f'- 그림: `{p}`' for p in imgs] + ['']
    (OUT / f'{need}-화면재료.md').write_text('\n'.join(L) + '\n', encoding='utf-8')
    print(need, '영상', len(ids), flush=True)
    return len(ids)

if __name__ == '__main__':
    args = sys.argv[1:]
    if args == ['--ready']:
        done = json.loads(STATE.read_text(encoding='utf-8'))['done'] if STATE.exists() else []
        args = [d[4:] for d in done if d.startswith('vid:') and not (OUT / f'{d[4:]}-화면재료.md').exists()]
    for need in args: one(need)

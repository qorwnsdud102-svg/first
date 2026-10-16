# -*- coding: utf-8 -*-
"""메타 판매 제품의 쿠팡 실제 후기 요약 — 컨셉 지도 작성자(Sonnet)가 엑셀을 열지 않고 읽게 한다(모델 없음).
사장님 2026-10-16: "실제 그 제품의 후기는 쿠팡에서 그 제품을 검색해서 실제 후기를 확인하고싶어 (자사몰 후기는 거의 가짜니까)".
- 브랜드 목록: 결핍책/메타판매처/_쿠팡-브랜드.json ({결핍: [{tag, words, query}]}) — 쿠팡 후기 받기(coupang_review_runner.js)에 넣은 메타 판매 제품.
- 후기-받은함 전체(*/*.xlsx)에서 파일 이름에 브랜드 단어가 든 것을 찾는다(같은 제품이 다른 결핍 폴더에 받아졌을 수 있음).
- 출력: 결핍책/메타판매처/<결핍>-쿠팡후기.md — 제품마다 후기 수·평균·별점 분포, 도움 많은 후기 6, 낮은 점수 5 (브랜드당 파일 2개)
사용: python meta_review_digest.py [결핍 ...]"""
import collections, json, re, sys
from pathlib import Path
import openpyxl

ROOT = Path(r'C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획')
REV, OUT = ROOT / '후기-받은함', ROOT / '결핍책' / '메타판매처'
norm = lambda s: re.sub(r'\s', '', str(s)).lower()

def digest(f):
    rows = list(openpyxl.load_workbook(f, read_only=True).active.iter_rows(values_only=True))
    idx = {str(h or ''): i for i, h in enumerate(rows[0])}
    data = [r for r in rows[1:] if r and len(r) > idx['리뷰내용']]
    star = lambda r: int(float(r[idx['평점']])) if r[idx['평점']] not in (None, '') else None
    stars = [s for s in map(star, data) if s]
    dist = collections.Counter(stars)
    text = lambda r, n: re.sub(r'\s+', ' ', str(r[idx['리뷰내용']] or ''))[:n]
    helpful = sorted(data, key=lambda r: -int(float(r[idx.get('도움된인원수', 10)] or 0)))
    best = [f'  - ({star(r)}점) {text(r, 180)}' for r in helpful if len(text(r, 30)) >= 20][:6]
    low = [f'  - ({star(r)}점) {text(r, 150)}' for r in data if (star(r) or 5) <= 2 and len(text(r, 20).strip()) >= 2][:5]
    seller = next((str(r[idx['판매자']]) for r in data if r[idx['판매자']]), '')
    L = [f'### {f.stem}  (폴더 {f.parent.name})',
         f'- 후기 {len(data)}개 · 평균 {round(sum(stars) / len(stars), 2) if stars else "-"}점 · 별점 5/4/3/2/1 = {"/".join(str(dist.get(k, 0)) for k in (5, 4, 3, 2, 1))} · 판매자 {seller}',
         '- 도움 많은 후기:'] + best + (['- 낮은 점수(1~2점):'] + low if low else ['- 낮은 점수(1~2점): 없음'])
    return L

def main(only):
    brands = json.loads((OUT / '_쿠팡-브랜드.json').read_text(encoding='utf-8'))
    files = list(REV.glob('*/*.xlsx'))
    for need, bl in brands.items():
        if only and need not in only: continue
        L = [f'# {need} — 메타 판매 제품의 쿠팡 실제 후기 (모델 없음)', '',
             '자사몰 후기는 참고만 하고, 만족·불만 판단은 이 쿠팡 후기로 한다(사장님 10-16). 제품 이름에 브랜드 단어가 든 파일을 모았다 — 같은 브랜드의 다른 제품일 수 있으니 이름을 확인한다.', '']
        miss = []
        for b in bl:
            hit = sorted((f for f in files if any(norm(w) in norm(f.stem) for w in b['words'])), key=lambda f: (f.parent.name != need, -f.stat().st_mtime))   # 그 결핍 폴더·최근 받은 것 먼저
            if not hit: miss.append(f"{b['tag']}({'/'.join(b['words'])})"); continue
            L.append(f"## {b['tag']} — 브랜드 단어 {'/'.join(b['words'])}")
            for f in hit[:2]:   # 브랜드당 2개까지(작성자 읽는 양 줄이기)
                try: L += digest(f)
                except Exception as e: L.append(f'- {f.name}: 읽기 실패 {e}')
            L.append('')
        L += ['## 쿠팡 후기 아직 없음', '- ' + (', '.join(miss) if miss else '없음'), '(받는 중이거나 쿠팡에 없는 자사몰 전용 제품 — 작성자는 "쿠팡에 없음(자사몰만)" 또는 "쿠팡 후기 대기"로 적는다)']
        (OUT / f'{need}-쿠팡후기.md').write_text('\n'.join(L) + '\n', encoding='utf-8')
        print(need, '찾음', len(bl) - len(miss), '/', len(bl), flush=True)

if __name__ == '__main__':
    main(set(sys.argv[1:]))

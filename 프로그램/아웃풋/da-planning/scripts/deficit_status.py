"""결핍 책 보충 현황 — 49개 결핍마다 지금 기준(사장님 2026-10-16)으로 무엇이 채워졌는지 파일만 세어 표로 만든다(모델 없음).
칸: 경험 단위 · 유튜브(받아쓴/고른) · 쿠팡 후기 파일 수·후기 수 · 메타 소재 재료 · 메타 해부(판매처 수·OCR) · 메타 컨셉 지도 · 결핍 책·기획 카드(만든 날)
사용: python deficit_status.py  → 결핍책/_보충현황.md"""
import datetime, glob, json, os, re
from pathlib import Path
import openpyxl
ROOT = Path(r'C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획')
BOOK, REV, META = ROOT / '결핍책', ROOT / '후기-받은함', ROOT / '결핍책' / '메타판매처'
plan = json.loads((BOOK / '묶음' / '_전체계획.json').read_text(encoding='utf-8'))

def nrev(f):
    try: return openpyxl.load_workbook(f, read_only=True).active.max_row - 1
    except Exception: return 0

def mtime(p): return datetime.datetime.fromtimestamp(p.stat().st_mtime).strftime('%m-%d %H:%M') if p.exists() else '-'

rows = []
for fm in plan['families']:
    for f in fm['folders']:
        if f['kind'] != '결핍': continue
        n = f['name']; d = BOOK / '결핍' / n
        rec = json.loads((d / '수집기록.json').read_text(encoding='utf-8')) if (d / '수집기록.json').exists() else {}
        vids = json.loads((d / '영상-원자료.json').read_text(encoding='utf-8')) if (d / '영상-원자료.json').exists() else []
        xs = list((REV / n).glob('*.xlsx')) if (REV / n).exists() else []
        ana = META / '_해부' / n
        sellers = [p for p in ana.iterdir() if p.is_dir()] if ana.exists() else []
        ocr = sum(1 for p in sellers if (p / 'ocr.txt').exists() and (p / 'ocr.txt').stat().st_size > 50)
        rows.append([fm['family'], n, rec.get('experience', '-'), f"{sum(bool(v.get('transcript')) for v in vids)}/{len(vids)}",
                     f"{len(xs)} · {sum(nrev(x) for x in xs):,}", 'O' if (META / f'{n}-소재.md').exists() else '-',
                     f"{len(sellers)} · OCR {ocr}" if sellers else '-', 'O' if (META / f'{n}-컨셉.md').exists() else '-',
                     mtime(d / '결핍책.md'), mtime(d / '기획카드.md')])
L = ['# 결핍 책 보충 현황 (사장님 2026-10-16 기준)', '', f'만든 때: {datetime.datetime.now():%Y-%m-%d %H:%M} · 결핍 {len(rows)}개', '',
     '기준: 경험 1,500+ · 유튜브 의사 20·경험 10 · 쿠팡 후기 제품 8개+ · 메타 판매처 해부 5곳(상세 OCR·쿠팡 실제 후기) · 메타 컨셉 지도 · 결핍 책·기획 카드', '',
     '| 계열 | 결핍 | 경험 단위 | 유튜브(받아씀/고름) | 쿠팡 후기(파일 · 후기) | 메타 소재 | 메타 해부(판매처 · OCR) | 컨셉 지도 | 결핍 책 | 기획 카드 |',
     '|---|---|---:|---:|---|:-:|---|:-:|---|---|']
L += ['| ' + ' | '.join(str(c) for c in r) + ' |' for r in rows]
(BOOK / '_보충현황.md').write_text('\n'.join(L) + '\n', encoding='utf-8')
print('결핍', len(rows), '→', BOOK / '_보충현황.md')

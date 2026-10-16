"""사장님 크롬(Claude in Chrome)이 내려받은 쿠팡 후기 JSON을 COUPLUS 엑셀과 같은 칸의 xlsx로 바꿔 결핍 폴더에 넣는다.
사장님 2026-10-16 "쿠팡 후기를 너 스스로 다운받을수있게" — 시험 성공(사장님 크롬에서 /next-api/review → Blob 다운로드).
- 입력: 다운로드 폴더 claude-reviews-<결핍>-<productId>.json  ({"productId", "rows": [[reviewAt, reviewId, 이름, 판매자, 상품옵션명, 평점, 제목, 내용, 사진수, 도움, 도움된인원수, 옵션번호], ...]})
- 출력: 후기-받은함/<결핍>/<상품옵션명 앞부분>.xlsx — review_sort.py·deficit_book_prep.py가 그대로 읽는다.
- 바꾼 JSON은 휴지통으로(Windows), 실패하면 그대로 둔다.
- 받은 상품은 후기-받은함/_받은상품.tsv에 한 줄씩 남긴다(크롬 탭이 멈춰 받기 상태를 잃었을 때 이어 받기용, 10-16 18:06 실제 발생).
사용: python -I review_json_to_xlsx.py"""
import glob, json, os, re, subprocess
from datetime import datetime
from pathlib import Path
import openpyxl

D = Path(os.path.expanduser(r'~\Downloads')); R = Path(r'C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획\후기-받은함')
HEAD = ['작성일', '리뷰번호', '이름', '판매자', '상품옵션명', '평점', '리뷰제목', '리뷰내용', '사진수', '도움', '도움된인원수', '옵션번호']

def day(ms):
    try: return datetime.fromtimestamp(int(ms) / 1000).strftime('%Y.%m.%d')
    except Exception: return str(ms)

def recycle(p):
    ps = ("Add-Type -AssemblyName Microsoft.VisualBasic; [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("
          f"'{p}', 'OnlyErrorDialogs', 'SendToRecycleBin')")
    return subprocess.run(['powershell', '-NoProfile', '-Command', ps], capture_output=True).returncode == 0

def main():
    done = []
    for f in sorted(D.glob('claude-reviews-*.json')):
        m = re.fullmatch(r'claude-reviews-(.+)-(\d{4,15})\.json', f.name)
        if not m: continue                                     # 시험 파일(-test) 등은 건드리지 않는다
        deficit, pid = m.group(1), m.group(2)
        try: d = json.loads(f.read_text(encoding='utf-8'))
        except Exception as e: print(f.name, '읽기 실패', e); continue
        rows = d.get('rows') or []
        if not rows: print(f.name, '빈 파일'); continue
        name = re.sub(r'[\\/:*?"<>|]', '', str(rows[0][4]).split(',')[0]).strip()[:80] or pid
        out = R / deficit; out.mkdir(parents=True, exist_ok=True)
        tgt = out / f'{name}.xlsx'; n = 2
        while tgt.exists(): tgt = out / f'{name} ({n}).xlsx'; n += 1
        wb = openpyxl.Workbook(); ws = wb.active; ws.append(HEAD)
        for r in rows:
            vendor = re.sub(r'^판매자\s*:\s*', '', str(r[3] or ''))
            ws.append([day(r[0]), str(r[1]), r[2], vendor] + [str(x) if x is not None else '' for x in r[4:]])
        wb.save(tgt)
        with open(R / '_받은상품.tsv', 'a', encoding='utf-8') as lf: lf.write('\t'.join([deficit, pid, str(len(rows)), name]) + '\n')
        done.append(f'{deficit} ← {name} ({len(rows)}개) · 원본 휴지통 {"O" if recycle(f) else "X"}')
    print('\n'.join(done) or '바꿀 파일 없음')

if __name__ == '__main__':
    main()

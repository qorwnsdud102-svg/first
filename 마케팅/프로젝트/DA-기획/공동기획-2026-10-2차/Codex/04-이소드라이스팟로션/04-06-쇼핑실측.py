from pathlib import Path
import sys, json, datetime, time, re, requests
sys.path.insert(0,r'C:\claude\네이버 급상승 키워드 기반 경쟁사 발굴\scripts')
from config import NaverAuth
out=Path(r'C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획\공동기획-2026-10-2차\Codex\04-이소드라이스팟로션\04-06-쇼핑참신함-실측.json')
auth=NaverAuth()
families={
'04':['이소티논 크림','이소틴 크림','로아큐탄 로션','이소티논 스팟','드라잉 로션','핑크 파우더 스팟','오일컷 캡슐 세럼'],
'05':['다이아몬드필 크림','다이아필 스크럽','다이아몬드 필링 크림','마이크로더마브레이전 크림','microdermabrasion cream','다이아몬드필 흡입','다이아몬드 모공'],
'06':['뿌리펌 세럼','뿌리펌 에센스','뿌리볼륨 세럼','뿌리볼륨 클립','셀헤디 뿌리펌','뿌리펌 앰플','루트리프트 세럼']}
rows=[]
for family, queries in families.items():
 for q in queries:
  try:
   r=requests.get('https://openapi.naver.com/v1/search/shop.json',params={'query':q,'display':10,'start':1,'sort':'sim'},headers=auth.search_headers(),timeout=20)
   d=r.json()
   row={'family':family,'query':q,'status':r.status_code,'total':d.get('total') if r.ok else None,'items':[{k:x.get(k) for k in ('title','link','mallName','lprice','productId','productType','brand','manufacturer')} for x in d.get('items',[])]}
  except Exception as e: row={'family':family,'query':q,'status':'error','total':None,'error_type':type(e).__name__}
  rows.append(row)
  print(family,q,row['status'],row['total'])
  time.sleep(0.25)
out.write_text(json.dumps({'measured_at':datetime.datetime.now().isoformat(),'tool':'Naver Shopping Search API, display=10, similarity, total is search matches not unique products','rows':rows},ensure_ascii=False,indent=2),encoding='utf-8')

"""12회차 새 구역 공개 첫 화면. 미디어는 별도 선정 뒤 받는다."""
import importlib.util, json, sys, time, datetime
from pathlib import Path
src = Path(r'C:/claude/네이버 급상승 키워드 기반 경쟁사 발굴/scripts/scrape_meta.py')
sys.path.insert(0, str(src.parent))
spec=importlib.util.spec_from_file_location('existing_meta',src)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
out=Path(__file__).parent/'새구역-메타.json'
results=json.loads(out.read_text('utf-8')) if out.exists() else []
done={r['query'] for r in results}
print('공개 광고 조회 시작',flush=True)
with m.sync_playwright() as p:
    b=p.chromium.launch(headless=True,timeout=30000);page=b.new_page(locale='ko-KR')
    for q in sys.argv[1:]:
        if q in done:continue
        print('조회 중:',q,flush=True)
        try:raw,total=m._first_screen_records(page,m.slice_url(q))
        except Exception as exc:
            results.append(dict(query=q,total=None,ads=[],excluded=[],failure=str(exc)[:600],measured_at=datetime.datetime.now().isoformat()))
            out.write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
            print('조회 실패:',str(exc)[:300],flush=True);break
        ads=[];excluded=[]
        m.add_page_ads(ads,raw,q,'default',excluded=excluded)
        failure=m.first_screen_failure(raw,total)
        results.append(dict(query=q,total=total,ads=ads,excluded=excluded,failure=failure,measured_at=datetime.datetime.now().isoformat()))
        out.write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
        print(q,total,len(ads),failure,flush=True)
        if failure:break
        time.sleep(6)
    b.close()

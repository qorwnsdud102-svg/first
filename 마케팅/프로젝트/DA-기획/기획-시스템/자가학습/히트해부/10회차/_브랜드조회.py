"""10회차 지정 브랜드 공개 첫 화면. 미디어는 별도 선정 뒤 받는다."""
import importlib.util, json, sys, time, datetime
from pathlib import Path
src = Path(r'C:/claude/네이버 급상승 키워드 기반 경쟁사 발굴/scripts/scrape_meta.py')
sys.path.insert(0, str(src.parent))
spec=importlib.util.spec_from_file_location('existing_meta',src)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
out=Path(__file__).parent/'브랜드-메타.json'
results=json.loads(out.read_text('utf-8')) if out.exists() else []
done={r['query'] for r in results}
with m.sync_playwright() as p:
    b=p.chromium.launch(headless=True);page=b.new_page(locale='ko-KR')
    for q in sys.argv[1:]:
        if q in done:continue
        raw,total=m._first_screen_records(page,m.slice_url(q));ads=[];excluded=[]
        m.add_page_ads(ads,raw,q,'default',excluded=excluded)
        failure=m.first_screen_failure(raw,total)
        results.append(dict(query=q,total=total,ads=ads,excluded=excluded,failure=failure,measured_at=datetime.datetime.now().isoformat()))
        out.write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
        print(q,total,len(ads),failure,flush=True)
        if failure:break
        time.sleep(6)
    b.close()

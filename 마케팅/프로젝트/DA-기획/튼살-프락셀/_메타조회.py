"""공개 메타 첫 화면 한 번 조회. 미디어는 저장하지 않는다."""
import importlib.util, json, sys, datetime
from pathlib import Path
src = Path(r'C:/claude/네이버 급상승 키워드 기반 경쟁사 발굴/scripts/scrape_meta.py')
sys.path.insert(0, str(src.parent))
spec = importlib.util.spec_from_file_location('meta_existing', src)
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
with m.sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    page = b.new_page(locale='ko-KR')
    raw, total = m._first_screen_records(page, m.slice_url('튼살크림'))
    ads, excluded = [], []
    failure = m.first_screen_failure(raw, total)
    m.add_page_ads(ads, raw, '튼살크림', 'default', excluded=excluded)
    result = dict(query='튼살크림', total=total, loaded=len(ads), ads=ads,
                  excluded=excluded, failure=failure, measured_at=datetime.datetime.now().isoformat(),
                  media_downloaded=False, scope='첫 화면만; 페이지 순회 없음')
    Path(__file__).with_name('메타-튼살크림.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({k:v for k,v in result.items() if k not in ('ads','excluded')}, ensure_ascii=False))
    b.close()

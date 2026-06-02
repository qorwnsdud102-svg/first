"""
STEP 1 예시 — 각 STEP의 골격.

③ 이중 구동: argparse 로 `python step1_example.py --title X --out step1_out.json` 단독 실행.
④ 파일 핸드오프: 결과를 json 으로 떨궈 다음 STEP 입력으로.
⑤ 우아한 실패: retry() 로 N회 재시도 → 실패해도 부분 결과 저장.

사용:
    python step1_example.py --title 탈모 --out step1_out.json
"""
import json, os, time, argparse

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))


def retry(fn, tries=3, delay=1.0):
    """⑤ 우아한 실패: N회 재시도, 마지막 실패는 None 반환(중단 X)."""
    for i in range(tries):
        try:
            return fn()
        except Exception as e:
            print(f"  [retry {i+1}/{tries}] {e}")
            time.sleep(delay)
    return None


def do_work(title):
    """TODO: 실제 STEP 1 로직. 여기선 더미."""
    # 예: API 호출·크롤링 → 데이터 수집
    return [{"title": title, "item": "TODO", "value": 0}]


def main(title, out_path):
    print(f"=== STEP 1: {title} ===")
    rows = retry(lambda: do_work(title)) or []   # 실패해도 []로 계속
    result = {"title": title, "count": len(rows), "rows": rows}
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"산출물: {out_path} ({len(rows)}건)")   # 0건이어도 파일은 남김


if __name__ == "__main__":
    os.environ.setdefault("PYTHONIOENCODING", "utf-8")
    p = argparse.ArgumentParser(description="STEP 1")
    p.add_argument("--title", required=True)
    p.add_argument("--out", default=os.path.join(SCRIPT_DIR, "step1_out.json"))
    a = p.parse_args()
    main(a.title, a.out)

# -*- coding: utf-8 -*-
"""시장 생존 타임캡슐 — 지금 30~59일 된 활성 광고 묶음을 봉인해 두고, 60일을 넘긴 뒤 다시 수집해 살아남았는지 본다.

사용: python timecapsule_list.py <후보-오래돈광고.json> <출력 폴더>
  - '예비_30_59일' 묶음 중 활성(활성 == True)만 골라 <출력>/대상-422.json 에 쓴다.
  - <출력>/봉인.md 에 개수·시작월 분포·가장 늦은 시작일·SHA-256·채점 방법을 적는다.
"""
import collections
import datetime
import hashlib
import json
import os
import sys

FIELDS = ["id", "page_name", "제품_추정명", "게재_시작일", "게재일수_최대", "검색_키워드들",
          "대표_라이브러리_ID", "라이브러리_ID_전부", "링크_도메인", "분야"]


def main(src, out_dir):
    sys.stdout.reconfigure(encoding="utf-8")
    d = json.load(open(src, encoding="utf-8"))
    pool = d["예비_30_59일"]
    active = [{k: b.get(k) for k in FIELDS} for b in pool if b.get("활성") is True]
    os.makedirs(out_dir, exist_ok=True)
    body = json.dumps({"원천": os.path.basename(src), "원천_생성일": d["meta"].get("생성일"),
                       "대상_수": len(active), "묶음": active}, ensure_ascii=False, indent=1)
    path = os.path.join(out_dir, f"대상-{len(active)}.json")
    open(path, "w", encoding="utf-8").write(body)
    sha = hashlib.sha256(body.encode("utf-8")).hexdigest()
    months = collections.Counter(b["게재_시작일"][:7] for b in active)
    latest = max(b["게재_시작일"] for b in active)
    due = (datetime.date.fromisoformat(latest) + datetime.timedelta(days=60)).isoformat()
    inactive = len(pool) - len(active)
    md = f"""# 시장 생존 타임캡슐 — 봉인 기록

- 봉인일: 2026-10-11 (Claude, 자가학습 준비 작업)
- 원천: `작업/시장정답/후보-오래돈광고.json` '예비_30_59일' {len(pool)}묶음 중 활성 {len(active)}묶음 (꺼진 {inactive}묶음 제외)
- 시작월: {", ".join(f"{m} {n}" for m, n in sorted(months.items()))}
- 가장 늦은 시작일: {latest} → 모든 묶음이 {due}까지 게재 60일을 넘긴다
- 대상 파일: `{os.path.basename(path)}` · SHA-256 `{sha}`

## 채점 (지금 하지 않음)
- 2026-12-01 이후 같은 검색 키워드로 메타 광고 라이브러리를 다시 수집한다(수집기 실행은 사장님 승인 필요).
- 라이브러리 번호가 다시 보이고 활성이면 '살아남음'(⑩-10), 보이지만 꺼졌으면 '꺼짐', 못 찾으면 '못 찾음'으로 따로 센다.
- 묶음마다 미리 봉인할 예측(상징 이식형인지·취향 필터 점수·참신 수·생존 예측)은 취향 필터가 시험을 통과한 뒤 따로 봉인한다.
"""
    open(os.path.join(out_dir, "봉인.md"), "w", encoding="utf-8").write(md)
    print(md)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])

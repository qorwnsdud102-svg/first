# -*- coding: utf-8 -*-
"""회차 판정 화면 — 기획서의 한 줄·'## 사장님 카드' 7칸을 읽어 page_template.html에 넣는다.

사용: python build_page.py <extra.json> <out.html>
extra.json: order(폴더 순서), plans(폴더별 id·need·links·lights·defaults·fixed), hits(히트 해부 카드), toggles(○/× 결정),
            dropped(화면에서 뺀 기획 한 줄씩), changes(지난 판정 뒤 바꾼 것)
"""
import json
import os
import re
import sys

from round_env import HERE, NO, ROUND

KEYS = {"결핍": "gap", "빌려 온 것": "borrow", "왜 이걸 빌리나": "why", "제품": "product",
        "가격·돈": "money", "첫 광고 장면": "scene", "걸리는 점": "risk"}


def read_plan(folder):
    t = open(os.path.join(ROUND, folder, "기획서.md"), encoding="utf-8").read()
    line = re.search(r"^한 줄:\s*(.+)$", t, re.M).group(1).strip()
    m = re.search(r"^## 사장님 카드[^\n]*\n(.*?)(?=^## )", t, re.S | re.M)
    if not m:
        raise ValueError(f"{folder}: 사장님 카드 절이 없다")
    facts = {}
    for ln in m.group(1).splitlines():
        hit = re.match(r"^-\s*([^:]+):\s*(.+)$", ln.strip())
        if hit and hit.group(1).strip() in KEYS:
            facts[KEYS[hit.group(1).strip()]] = hit.group(2).strip()
    missing = [k for k in KEYS.values() if k not in facts]
    if missing:
        raise ValueError(f"{folder}: 카드 칸이 빠짐 {missing}")
    return line, facts, len(m.group(1).strip())


def main(extra_path, out_path):
    sys.stdout.reconfigure(encoding="utf-8")
    extra = json.load(open(extra_path, encoding="utf-8"))
    plans = []
    for folder in extra["order"]:
        x = extra["plans"][folder]
        try:
            line, facts, n = read_plan(folder)
        except (OSError, AttributeError, ValueError) as e:
            print("뺌:", folder, e)
            continue
        plans.append({"id": x["id"], "need": x["need"], "line": line, "facts": facts, "fixed": x.get("fixed", ""),
                      "links": x.get("links", {}), "lights": x.get("lights", []), "defaults": x.get("defaults", [])})
        print(x["id"], folder, f"카드 {n}자", f"링크 {sum(len(v) for v in x.get('links', {}).values())}",
              f"신호 {len(x.get('lights', []))}", f"정하실 것 {len(x.get('defaults', []))}")
    data = {"plans": plans, "hits": extra.get("hits", []), "toggles": extra.get("toggles", []),
            "dropped": extra.get("dropped", []), "changes": extra.get("changes", [])}
    print("해부", len(data["hits"]), "결정", len(data["toggles"]), "뺀 기획", len(data["dropped"]))
    tpl = open(os.path.join(HERE, "page_template.html"), encoding="utf-8").read()
    js = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
    page = tpl.replace("__NO__", NO).replace("__PREV__", str(int(NO) - 1)).replace("__DATA__", js)
    open(out_path, "w", encoding="utf-8").write(page)
    print(out_path, len(plans), "개")


if __name__ == "__main__":
    main(*sys.argv[1:3])

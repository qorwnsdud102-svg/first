# -*- coding: utf-8 -*-
"""학습 방식 v3 — 경험카드 장부 만들기와 관련 사례 4건 꺼내기.

  python 찾기.py build              # 통합원장.json + 회고-전체.md(드릴 5회차~) → 경험카드.jsonl
  python 찾기.py <결핍> <구현 설명>   # 비슷한 결핍 성공·실패 1건씩 + 비슷한 구현 성공·실패 1건씩 (JSON)
"""
import json
import os
import re
import sys

H = os.path.dirname(os.path.abspath(__file__))
LEDGER = os.path.join(H, "경험카드.jsonl")
STAGE = {1: "결핍", 2: "상징 후보", 3: "짝 고르기", 4: "구현", 5: "살 이유"}
KIND = [  # 구현 종류 — 앞에서부터 처음 맞는 것
    ("세정", r"샴푸|워시|클렌저|치약|비누|세정|가글"),
    ("붙이는", r"패치|패드|필름|시트|밴드|테이프"),
    ("먹는", r"먹|정제|캡슐|가루|분말|스틱|음료|젤리|환\b|섭취"),
    ("기기", r"기기|기계|헤드|램프|LED|진동|전동|EMS|펄스|모듈|스피커|펌프|레이저|광"),
    ("공산품", r"깔창|슬리퍼|베개|방석|좌판|보호대|교정기|캡|쿠션|칫솔|빗|안대|이불|매트"),
    ("바르는", r"크림|세럼|앰플|젤|토닉|로션|오일|밤|바르|도포|스프레이|미스트"),
]
SUCCESS, FAIL = 7, 4


def kind(text):
    for k, pat in KIND:
        if re.search(pat, text or ""):
            return k
    return "기타"


def build():
    d = json.load(open(os.path.join(H, "통합원장.json"), encoding="utf-8"))
    rows = []
    for e in d["entries"]:
        st = [STAGE.get(s, str(s)) for s in (e.get("wrong_stage") or [])]
        rows.append({
            "id": e["id"], "need": e.get("deficit", ""), "symbol": e.get("symbol", ""),
            "impl": e.get("implementation", ""), "kind": kind(e.get("implementation", "")),
            "score": e.get("score"), "boss": e.get("pid", []),
            "wrong_step": "없음" if (e.get("score") or 0) >= SUCCESS and not st else "·".join(st) or "미기록",
            "change": e.get("worked") if (e.get("score") or 0) >= SUCCESS and e.get("worked") else e.get("next_action", ""),
            "when": e.get("owner_alternative", ""), "next": "",
        })
    # 드릴 5회차부터는 회고-전체.md의 '### Dn-xx · 결핍 × 상징 · n점' 칸을 읽는다
    known = {r["id"] for r in rows}
    text = open(os.path.join(H, "회고-전체.md"), encoding="utf-8").read()
    for m in re.finditer(r"^### (D\d+-\d+) · (.+?) × (.+?) · (\d+)점(.*?)$\n(.*?)(?=^### |^## |\Z)", text, re.M | re.S):
        cid, need, sym, score, tail, body = m.groups()
        if cid in known:
            continue
        get = lambda lab: (re.search(r"\*\*" + lab + r":\*\*\s*(.+)", body) or [None, ""])[1].strip()
        step = get("틀린 단계")
        rows.append({
            "id": cid, "need": need, "symbol": sym, "impl": "", "kind": "기타", "score": int(score),
            "boss": re.findall(r"P\d{4}", get("대표가 짚은 곳")),
            "wrong_step": "없음" if "맞은 생각" in tail else (step.split(".")[0] if step else "미기록"),
            "change": get("다음엔") or get("맞은 생각"), "when": "", "next": "",
        })
    # 드릴 카드의 구현은 카드 파일에서 채운다
    base = os.path.join(os.path.dirname(H), "상징짝-드릴")
    for r in rows:
        if r["impl"] or not r["id"].startswith("D"):
            continue
        n = r["id"][1:].split("-")[0]
        for f in ("카드-30.json", "카드.json", "카드-10.json"):
            p = os.path.join(base, f"{n}회차", f)
            if os.path.exists(p):
                hit = [c for c in json.load(open(p, encoding="utf-8")) if c.get("id") == r["id"]]
                if hit:
                    r["impl"] = hit[0].get("product", "")[:120]
                    r["kind"] = kind(hit[0].get("line", "") + " " + r["impl"])
                break
    with open(LEDGER, "w", encoding="utf-8") as f:
        for r in rows:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    print(len(rows), "줄 →", LEDGER)


def find(need, impl):
    rows = [json.loads(l) for l in open(LEDGER, encoding="utf-8") if l.strip()]
    rows = [r for r in rows if isinstance(r.get("score"), int)]
    same = [r for r in rows if r["need"] and (need in r["need"] or r["need"] in need)]
    k = kind(impl)
    like = [r for r in rows if r["kind"] == k and r not in same]
    pick = lambda L, ok: (sorted([r for r in L if ok(r["score"])], key=lambda r: r["score"], reverse=ok(10)) or [None])[0]
    out = {
        "같은 결핍 · 성공": pick(same, lambda s: s >= SUCCESS),
        "같은 결핍 · 실패": pick(same, lambda s: s <= FAIL),
        f"같은 구현({k}) · 성공": pick(like, lambda s: s >= SUCCESS),
        f"같은 구현({k}) · 실패": pick(like, lambda s: s <= FAIL),
    }
    out["이 결핍에 이미 쓴 상징"] = sorted({r["symbol"] for r in same if r["symbol"]})
    return out


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    if sys.argv[1:] == ["build"]:
        build()
    else:
        print(json.dumps(find(sys.argv[1], " ".join(sys.argv[2:])), ensure_ascii=False, indent=1))

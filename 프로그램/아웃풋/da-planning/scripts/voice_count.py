# -*- coding: utf-8 -*-
"""① 목소리 비중표 — voice_crawl.py가 모은 여론 xlsx를 합쳐 결핍 사전의 묶음별로 센다(정본 ①-01·①-19·①-24).

사용:
  python voice_count.py dump  <xlsx 또는 폴더> [...] --out 표본.txt [--top 120]
      사이트별 좋아요 순 단위를 덤프한다. 사전을 쓰기 전에 읽는 표본이다.
  python voice_count.py count <사전.json> <xlsx 또는 폴더> [...] [--out 비중표.md] [--quotes 2] [--note "…"]
      사전 묶음별 비중표(마크다운)를 낸다.
단위 = 커뮤니티 글 1개(제목+본문) 또는 댓글 1개. 유튜브 영상 행(만든 사람 글)과 4자 미만은 뺀다.
여러 키워드 파일에 같은 글·댓글이 잡히면 한 번만 센다(사이트 + 앞 200자).
바이럴 의심(사전의 제품명이 나오거나, 홍보어와 제품 명사가 함께 나옴)은 빼고 센다(①-19). '전체'는 빼기 전 수.
사전(references/목소리사전/<결핍>.json): {"결핍": …, "제품명": […], "묶음": {묶음: {항목: 정규식}}}
  묶음 = 증상·상황 · 해결 행동 · 불만·걱정 · 대안 가격 · 상징원 인식(있는 것만). 항목 이름이 '└'로 시작하면 바로 위 항목에 붙인다.
  사전은 표본을 읽고 세기 전에 쓴다(사장님 승인 P6239). 센 뒤에 고치면 그 사실을 --note로 비중표 머리에 적는다.
옛 판: 세션 임시 폴더의 opinion_count.py(3차 라운드). 같은 파일·같은 사전이면 '바이럴 뺀' 수가 같다.
"""
import argparse
import glob
import json
import os
import re
import sys
from collections import Counter

PRODUCT_NOUN = r"(크림|앰플|영양제|세럼|패치|디바이스|샴푸|토닉|에센스|밤|젤|오일|파스|보호대|벨트|기계|제품|템)"
PROMO = (r"(추천(해|드|합|받)|써\s?보세요|써보시|챙겨\s?먹|먹으면서|먹고\s?있|사용\s?중|쓰는\s?중|쓰고\s?있|바르고\s?있"
         r"|효과\s?(좋|봤|개|있)|구매|샀|사서|정착|인생템|강추)")
EXP = (r"(저도|저는|제가|나도|나는|내가|했는데|했더니|해봤|해 봤|받았|받아봤|맞았|맞아봤|써봤|써 봤|먹어봤|해보니|다녀"
       r"|하고\s?있|겪|생겼|생겨서|있어서)")
YOUTUBE = {"유튜브", "youtube"}


def to_int(v):
    try:
        return int(str(v).replace(",", ""))
    except (TypeError, ValueError):
        return 0


def load_rows(path):
    import openpyxl
    wb = openpyxl.load_workbook(path, read_only=True)
    rows = [list(r) for i, r in enumerate(wb.active.iter_rows(values_only=True)) if i]
    wb.close()
    return rows


def units_from_rows(rows):
    """여론 xlsx 줄(타입·사이트·키워드·제목·본문·댓글·url·작성자·작성일·조회수·좋아요) → 단위 목록"""
    out, cur = [], None
    for r in rows:
        typ, site, _, title, body, cmt, url, _, _, _, likes = (list(r) + [None] * 11)[:11]
        typ = (typ or "").strip()
        if typ == "게시글":
            cur = {"사이트": site or "", "url": url or ""}
            if cur["사이트"] not in YOUTUBE:
                out.append({"사이트": cur["사이트"], "종류": "글", "글": f"{title or ''} {body or ''}".strip(),
                            "좋아요": to_int(likes), "url": cur["url"]})
        elif typ == "댓글" and cur is not None:
            out.append({"사이트": cur["사이트"], "종류": "유튜브 댓글" if cur["사이트"] in YOUTUBE else "댓글",
                        "글": str(cmt or "").strip(), "좋아요": to_int(likes), "url": cur["url"]})
    return [u for u in out if len(u["글"].strip()) >= 4]


def dedupe(units):
    seen, out = set(), []
    for u in units:
        k = (u["사이트"], re.sub(r"\s+", "", u["글"])[:200])
        if k not in seen:
            seen.add(k)
            out.append(u)
    return out


def is_viral(text, brands):
    if any(b in text for b in brands):
        return True
    return bool(re.search(PROMO, text) and re.search(PRODUCT_NOUN, text))


def count(units, clean, groups):
    """→ {묶음: [(항목, 바이럴 뺀 수, 전체 수, 경험 수, 예 단위 목록)]} — 바이럴 뺀 수 큰 순, '└' 하위는 위 항목에 붙임"""
    exp = [u for u in clean if re.search(EXP, u["글"])]
    out = {}
    for g, items in groups.items():
        rows = []
        for label, pat in items.items():
            hit = [u for u in clean if re.search(pat, u["글"])]
            rows.append((label, len(hit), sum(1 for u in units if re.search(pat, u["글"])),
                         sum(1 for u in exp if re.search(pat, u["글"])), sorted(hit, key=lambda u: -u["좋아요"])))
        blocks = []
        for r in rows:
            if r[0].lstrip().startswith("└") and blocks:
                blocks[-1].append(r)
            else:
                blocks.append([r])
        out[g] = [r for b in sorted(blocks, key=lambda b: -b[0][1]) for r in b]
    return out


def short(t, n=60):
    t = re.sub(r"\s+", " ", t).replace("|", "/").strip()
    return t if len(t) <= n else t[:n] + "…"


def render(name, files, units, clean, counts, quotes=2, note=""):
    n = len(clean)
    kinds = Counter(u["종류"] for u in clean)
    sites = Counter(u["사이트"] for u in clean)
    out = [f"# 목소리 비중표 — {name}", "",
           f"- 자료: 파일 {len(files)}개 — " + ", ".join(os.path.basename(f) for f in files),
           f"- 단위 {len(units)}개(겹침 뺀 뒤) · 바이럴 의심 {len(units) - n}개 뺌 → 센 단위 {n}개 ("
           + " · ".join(f"{k} {v}" for k, v in kinds.most_common()) + ")",
           "- 사이트: " + " · ".join(f"{k} {v}" for k, v in sites.most_common()),
           "- 비율 = 그 항목을 말한 단위 / 센 단위. 한 단위가 여러 항목에 들 수 있다. "
           "'전체'는 바이럴을 빼기 전 수, '경험'은 저도·해봤·받았 같은 말이 든 단위다."]
    if note:
        out.append(f"- 메모: {note}")
    out.append("")
    for g, rows in counts.items():
        if not rows:
            continue
        out += [f"## {g}", "", "| 항목 | 단위 | 비율 | 전체 | 경험 | 예 |", "|---|---|---|---|---|---|"]
        for label, k, total, exp, hits in rows:
            ex = " / ".join(f"\"{short(u['글'])}\" {u['url']}" for u in hits[:quotes])
            pct = f"{k / n:.1%}" if n else "—"
            out.append(f"| {label.strip()} | {k} | {pct} | {total} | {exp} | {ex} |")
        out.append("")
    return "\n".join(out)


def dump(units, top=120):
    out = []
    for site, n in Counter(u["사이트"] for u in units).most_common():
        us = sorted((u for u in units if u["사이트"] == site), key=lambda u: -u["좋아요"])[:top]
        out += [f"## {site} — 단위 {n}개(좋아요 순 {len(us)}개)", ""]
        out += [f"- ({u['좋아요']}) {short(u['글'], 200)}" for u in us]
        out.append("")
    return "\n".join(out)


def files_of(inputs):
    out = []
    for p in inputs:
        if os.path.isdir(p):
            out += sorted(f for f in glob.glob(os.path.join(p, "*.xlsx")) if not os.path.basename(f).startswith("~$"))
        else:
            out.append(p)
    return out


def main(argv=None):
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    d = sub.add_parser("dump")
    d.add_argument("inputs", nargs="+")
    d.add_argument("--out", required=True)
    d.add_argument("--top", type=int, default=120)
    c = sub.add_parser("count")
    c.add_argument("dict")
    c.add_argument("inputs", nargs="+")
    c.add_argument("--out")
    c.add_argument("--quotes", type=int, default=2)
    c.add_argument("--note", default="")
    a = ap.parse_args(argv)
    files = files_of(a.inputs)
    units = dedupe([u for f in files for u in units_from_rows(load_rows(f))])
    if a.cmd == "dump":
        with open(a.out, "w", encoding="utf-8") as f:
            f.write(f"# 표본 — 파일 {len(files)}개, 단위 {len(units)}개\n\n" + dump(units, a.top) + "\n")
        print(a.out)
        return 0
    dic = json.load(open(a.dict, encoding="utf-8"))
    clean = [u for u in units if not is_viral(u["글"], dic.get("제품명", []))]
    text = render(dic.get("결핍", ""), files, units, clean, count(units, clean, dic["묶음"]), a.quotes, a.note)
    if a.out:
        with open(a.out, "w", encoding="utf-8") as f:
            f.write(text + "\n")
        print(a.out)
    else:
        print(text)
    return 0


if __name__ == "__main__":
    sys.exit(main())

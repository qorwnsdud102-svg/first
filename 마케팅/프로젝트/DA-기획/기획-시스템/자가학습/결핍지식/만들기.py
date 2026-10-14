# -*- coding: utf-8 -*-
"""결핍 지식 카드 — 상징 짝을 고르기 전에 알아야 할 사전 지식(사장님 2026-10-14 P6492).
1차 자료는 우리가 이미 모은 `DA-기획/기초분석/<결핍>/`(커뮤니티·유튜브 목소리 수천 건의 표본·비중표, 시장카드·검색량)이고,
웹 검색(codex --search)은 의학 사실·가격·부작용·지금 팔리는 제품을 보충한다. 결핍마다 새 짧은 GPT 창(읽기 전용)이 한 장으로 정리한다.
목소리 비중표·시장카드가 없는 결핍은 만들지 않는다(사장님 P6493: 기초조사는 단순 웹 검색만으로 하면 안 된다). 한 번 만들면 드릴·시험이 다시 쓴다.

토큰 아끼기(사장님 2026-10-14 "토큰 낭비, 호출제한 주의하면서 병렬로"):
- 목소리 원표본(목소리-표본.txt, 결핍당 120~160KB)은 묶음에 넣지 않는다. 같은 표본을 센 비중표(예시 말 포함)로 충분하다.
- 대안사전.json: 다른 카드에서 이미 조사한 대안(체외충격파·스테로이드 주사 등)의 가격·부작용·출처를 다시 검색하지 않고 쓴다.
- 병렬: 카드마다 별도 codex exec. 웹 검색은 OpenAI 서버의 web_search 도구라 이 PC의 IP로 네이버·구글을 직접 치지 않는다.
  그래도 OpenAI 쪽 한도를 생각해 동시에 3개까지만 돌린다(--jobs).

  python 만들기.py [--jobs 3] <결핍> [<결핍> ...]   # 이미 있는 카드는 건너뛴다 → <결핍>.json · <결핍>.md · 사용량.json · 대안사전.json
"""
import argparse
import glob
import json
import threading
from concurrent.futures import ThreadPoolExecutor
import os
import re
import shutil
import subprocess
import sys

sys.stdout.reconfigure(encoding="utf-8")
H = os.path.dirname(os.path.abspath(__file__))
A = os.path.dirname(H)  # 자가학습
BASE = os.path.normpath(os.path.join(A, "..", "..", "기초분석"))  # DA-기획/기초분석
MODEL, EFFORT = "gpt-6.1-sol", "ultra"
SKIP = {"목소리-표본.txt"}  # 원표본은 비중표가 이미 센 것
LOCK = threading.Lock()
DICT = os.path.join(H, "대안사전.json")
PROMPT = """너는 DA(메타 광고) 제품 기획팀의 조사원이다. 결핍 하나에 대해, 기획자가 상징 짝을 고르기 전에 알아야 할 사전 지식을 한 장으로 정리한다.
1차 자료: 이 폴더의 우리-기초분석/ — 우리가 커뮤니티·유튜브에서 이 결핍과 대안 키워드로 모은 실제 목소리 수천 건을 센 비중표(목소리-비중표*.md, 예시 말 포함)와 교차표, 시장카드.md(메인 키워드 검색량·메타 광고), 검색량 파일. 비율 숫자는 비중표 그대로 쓴다. 파일은 필요한 절만 찾아 읽는다.
대안사전.json(있으면): 다른 결핍 카드에서 이미 조사한 대안의 가격·부작용·출처다. 여기 있는 대안은 웹에서 다시 찾지 말고 그대로 쓰고, 이 결핍 목소리에서 나온 불만·꺼리는 점만 새로 채운다. 없는 대안만 웹 검색한다.
보충: 결핍.json, 우리-자료.md(우리 상징 사전 절, 있으면), 그리고 웹 검색(병원·약국 가격, 부작용, 지금 쇼핑·메타에서 팔리는 제품). 다른 폴더는 보지 않는다. 같은 검색을 되풀이하지 않는다.

채울 것(한국어, 타겟이 쓰는 말로):
- core: 이 결핍이 무엇인지 — 핵심 원인과 증상, 진행(사람들이 아는 말로 2~3문장)
- scenes: 타겟이 이 결핍을 겪는 장면 2~3개(누가, 언제, 무엇이 불편한가)
- belief: 타겟이 믿는 원인
- alternatives: 타겟이 지금 쓰는 해결책 6~10개. 병원(시술·수술·전문의약품)·약국(일반약)·건강기능식품·셀프 기기·생활요법을 고루. 각각 name, kind, price(대략 가격, 회당/월), known_effect(타겟이 아는 효과), complaints(대표 불만·단점), side_effects(부작용·위험), aversion(타겟이 꺼리는 점, 없으면 빈 문자열), self(셀프로 되는지와 얼마나 싼지)
- selling_now: 이 결핍으로 지금 많이 팔리는 제품·브랜드 3~6개와 각 한 줄 특징(가격 포함)
- avoid: 타겟이 이 결핍 제품에서 꺼리는 것(형태·성분·사용 장면)
- voice: 목소리에서 많이 나온 것 8~15줄 — '항목 — 비율 또는 건수 (예시 한마디)'. 증상·장면, 써 본 대안, 대안 불만, 꺼리는 점을 고루
- unknown: 확인하지 못한 것
- sources: 근거 URL 5~12개
추측은 쓰지 않는다. 모르는 칸은 '확인 못 함'이라고 적는다. 상징 짝이나 제품 기획은 하지 않는다."""
S = {"type": "string"}
ALT = {"type": "object", "additionalProperties": False,
       "required": ["name", "kind", "price", "known_effect", "complaints", "side_effects", "aversion", "self"],
       "properties": {k: S for k in ["name", "kind", "price", "known_effect", "complaints", "side_effects", "aversion", "self"]}}
SCHEMA = {"type": "object", "additionalProperties": False,
          "required": ["need", "core", "scenes", "belief", "alternatives", "voice", "selling_now", "avoid", "unknown", "sources"],
          "properties": {"need": S, "core": S, "scenes": {"type": "array", "items": S}, "belief": S,
                         "alternatives": {"type": "array", "minItems": 4, "items": ALT},
                         "voice": {"type": "array", "items": S}, "selling_now": {"type": "array", "items": S}, "avoid": S, "unknown": S,
                         "sources": {"type": "array", "items": S}}}


def our_notes(need):
    """결핍별.md에서 그 결핍 절만 — 우리가 이미 모은 상징 후보·검색량."""
    t = open(os.path.join(A, "상징원-사전", "결핍별.md"), encoding="utf-8").read()
    m = re.search(r"^## [A-Z]+-[A-Z]?\d+ " + re.escape(need) + r"\s*$(.*?)(?=^## |\Z)", t, re.M | re.S)
    return m.group(0) if m else ""


def md(c):
    out = [f"# 결핍 지식 — {c['need']}", "", f"**무엇인가:** {c['core']}", "", f"**타겟이 믿는 원인:** {c['belief']}", "", "**장면**"]
    out += [f"- {x}" for x in c["scenes"]]
    out += ["", "| 대안 | 종류 | 가격 | 타겟이 아는 효과 | 불만·단점 | 부작용·위험 | 꺼리는 점 | 셀프 |", "|---|---|---|---|---|---|---|---|"]
    out += ["| " + " | ".join(a[k].replace("|", "/") for k in ["name", "kind", "price", "known_effect", "complaints", "side_effects", "aversion", "self"]) + " |" for a in c["alternatives"]]
    out += ["", "**목소리에서 많이 나온 것**"] + [f"- {x}" for x in c["voice"]]
    out += ["", "**지금 많이 팔리는 것**"] + [f"- {x}" for x in c["selling_now"]]
    out += ["", f"**타겟이 꺼리는 것:** {c['avoid']}", "", f"**확인 못 한 것:** {c['unknown']}", "", "**출처**"] + [f"- {x}" for x in c["sources"]]
    return "\n".join(out) + "\n"


def make(need):
    out = os.path.join(H, need + ".json")
    if os.path.exists(out):
        return
    src = os.path.join(BASE, need)
    files = os.listdir(src) if os.path.isdir(src) else []
    if not (any(f.startswith("목소리-비중표") for f in files) and "시장카드.md" in files):
        # 사장님 P6493: 기초조사는 단순 웹 검색만으로 하지 않는다 — 목소리 비중표와 시장카드가 없으면 카드를 만들지 않는다
        print(need, "건너뜀 — 기초조사 미완(목소리 비중표·시장카드 먼저)", flush=True)
        return
    allneeds = json.load(open(os.path.join(A, "상징원-사전", "결핍별.json"), encoding="utf-8"))
    e = [x for x in allneeds if x["need"] == need]
    d = os.path.join(H, "_묶음", need)
    os.makedirs(d, exist_ok=True)
    json.dump(e[0] if e else {"need": need}, open(os.path.join(d, "결핍.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    shutil.copytree(src, os.path.join(d, "우리-기초분석"), dirs_exist_ok=True, ignore=lambda _, names: [n for n in names if n in SKIP])
    text = "".join(open(os.path.join(d, "우리-기초분석", f), encoding="utf-8", errors="ignore").read() for f in os.listdir(os.path.join(d, "우리-기초분석")))
    notes = our_notes(need)
    with LOCK:
        known = json.load(open(DICT, encoding="utf-8")) if os.path.exists(DICT) else {}
    hit = {k: v for k, v in known.items() if k in text or k in notes}
    if hit:
        json.dump(hit, open(os.path.join(d, "대안사전.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    if notes:
        open(os.path.join(d, "우리-자료.md"), "w", encoding="utf-8").write(notes)
    sp = os.path.join(d, "_schema.json")
    json.dump(SCHEMA, open(sp, "w", encoding="utf-8"), ensure_ascii=False)
    exe = sorted(glob.glob(os.path.join(os.environ["LOCALAPPDATA"], "OpenAI", "Codex", "bin", "*", "codex.exe")))[-1]
    r = subprocess.run([exe, "--search", "exec", "--skip-git-repo-check", "--ephemeral", "-s", "read-only", "-m", MODEL,
                        "-c", f'model_reasoning_effort="{EFFORT}"', "-C", d, "-o", out, "--output-schema", sp, "-"],
                       input=PROMPT, text=True, encoding="utf-8", capture_output=True)
    os.remove(sp)
    m = re.findall(r"tokens used[^\d]*([\d,]+)", (r.stderr or "") + (r.stdout or ""), re.I)
    tok = int(m[-1].replace(",", "")) if m else None
    with LOCK:
        up = os.path.join(H, "사용량.json")
        use = json.load(open(up, encoding="utf-8")) if os.path.exists(up) else {}
        use[need] = tok
        json.dump(use, open(up, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        if os.path.exists(out):
            c = json.load(open(out, encoding="utf-8"))
            open(os.path.join(H, need + ".md"), "w", encoding="utf-8").write(md(c))
            known = json.load(open(DICT, encoding="utf-8")) if os.path.exists(DICT) else {}
            for a in c["alternatives"]:  # 가격·부작용은 결핍이 달라도 같다 — 다음 카드가 다시 쓴다
                e = known.setdefault(a["name"], {k: a[k] for k in ("kind", "price", "known_effect", "side_effects", "self")})
                e.setdefault("needs", [])
                if need not in e["needs"]:
                    e["needs"].append(need)
            json.dump(known, open(DICT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
            shutil.rmtree(d, ignore_errors=True)
    print(need, "완료" if os.path.exists(out) else "실패 " + (r.stderr or "")[-300:], "토큰", tok, flush=True)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--jobs", type=int, default=3)
    ap.add_argument("needs", nargs="+")
    o = ap.parse_args()
    with ThreadPoolExecutor(max_workers=o.jobs) as ex:
        list(ex.map(make, o.needs))

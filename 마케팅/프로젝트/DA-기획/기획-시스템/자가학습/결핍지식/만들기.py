# -*- coding: utf-8 -*-
"""결핍 지식 카드 — 상징 짝을 고르기 전에 알아야 할 사전 지식(사장님 2026-10-14 P6492).
결핍마다 새 짧은 GPT 창(codex exec --search, 읽기 전용)이 웹과 우리 자료를 보고 한 장으로 정리한다. 한 번 만들면 드릴·시험이 다시 쓴다.

  python 만들기.py <결핍> [<결핍> ...]   # 이미 있는 카드는 건너뛴다 → <결핍>.json · <결핍>.md · 사용량.json
"""
import glob
import json
import os
import re
import shutil
import subprocess
import sys

sys.stdout.reconfigure(encoding="utf-8")
H = os.path.dirname(os.path.abspath(__file__))
A = os.path.dirname(H)  # 자가학습
MODEL, EFFORT = "gpt-6.1-sol", "ultra"
PROMPT = """너는 DA(메타 광고) 제품 기획팀의 조사원이다. 결핍 하나에 대해, 기획자가 상징 짝을 고르기 전에 알아야 할 사전 지식을 한 장으로 정리한다.
이 폴더의 결핍.json과 우리-자료.md(있으면)를 먼저 읽고, 부족한 것은 웹 검색으로 채운다(네이버·나무위키·병원·약국·쇼핑·커뮤니티 후기). 다른 폴더는 보지 않는다.

채울 것(한국어, 타겟이 쓰는 말로):
- core: 이 결핍이 무엇인지 — 핵심 원인과 증상, 진행(사람들이 아는 말로 2~3문장)
- scenes: 타겟이 이 결핍을 겪는 장면 2~3개(누가, 언제, 무엇이 불편한가)
- belief: 타겟이 믿는 원인
- alternatives: 타겟이 지금 쓰는 해결책 6~10개. 병원(시술·수술·전문의약품)·약국(일반약)·건강기능식품·셀프 기기·생활요법을 고루. 각각 name, kind, price(대략 가격, 회당/월), known_effect(타겟이 아는 효과), complaints(대표 불만·단점), side_effects(부작용·위험), aversion(타겟이 꺼리는 점, 없으면 빈 문자열), self(셀프로 되는지와 얼마나 싼지)
- selling_now: 이 결핍으로 지금 많이 팔리는 제품·브랜드 3~6개와 각 한 줄 특징(가격 포함)
- avoid: 타겟이 이 결핍 제품에서 꺼리는 것(형태·성분·사용 장면)
- unknown: 확인하지 못한 것
- sources: 근거 URL 5~12개
추측은 쓰지 않는다. 모르는 칸은 '확인 못 함'이라고 적는다. 상징 짝이나 제품 기획은 하지 않는다."""
S = {"type": "string"}
ALT = {"type": "object", "additionalProperties": False,
       "required": ["name", "kind", "price", "known_effect", "complaints", "side_effects", "aversion", "self"],
       "properties": {k: S for k in ["name", "kind", "price", "known_effect", "complaints", "side_effects", "aversion", "self"]}}
SCHEMA = {"type": "object", "additionalProperties": False,
          "required": ["need", "core", "scenes", "belief", "alternatives", "selling_now", "avoid", "unknown", "sources"],
          "properties": {"need": S, "core": S, "scenes": {"type": "array", "items": S}, "belief": S,
                         "alternatives": {"type": "array", "minItems": 4, "items": ALT},
                         "selling_now": {"type": "array", "items": S}, "avoid": S, "unknown": S,
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
    out += ["", "**지금 많이 팔리는 것**"] + [f"- {x}" for x in c["selling_now"]]
    out += ["", f"**타겟이 꺼리는 것:** {c['avoid']}", "", f"**확인 못 한 것:** {c['unknown']}", "", "**출처**"] + [f"- {x}" for x in c["sources"]]
    return "\n".join(out) + "\n"


def make(need):
    out = os.path.join(H, need + ".json")
    if os.path.exists(out):
        return
    allneeds = json.load(open(os.path.join(A, "상징원-사전", "결핍별.json"), encoding="utf-8"))
    e = [x for x in allneeds if x["need"] == need]
    d = os.path.join(H, "_묶음", need)
    os.makedirs(d, exist_ok=True)
    json.dump(e[0] if e else {"need": need}, open(os.path.join(d, "결핍.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    notes = our_notes(need)
    if notes:
        open(os.path.join(d, "우리-자료.md"), "w", encoding="utf-8").write(notes)
    sp = os.path.join(d, "_schema.json")
    json.dump(SCHEMA, open(sp, "w", encoding="utf-8"), ensure_ascii=False)
    exe = sorted(glob.glob(os.path.join(os.environ["LOCALAPPDATA"], "OpenAI", "Codex", "bin", "*", "codex.exe")))[-1]
    r = subprocess.run([exe, "exec", "--search", "--skip-git-repo-check", "--ephemeral", "-s", "read-only", "-m", MODEL,
                        "-c", f'model_reasoning_effort="{EFFORT}"', "-C", d, "-o", out, "--output-schema", sp, "-"],
                       input=PROMPT, text=True, encoding="utf-8", capture_output=True)
    os.remove(sp)
    m = re.findall(r"tokens used[^\d]*([\d,]+)", (r.stderr or "") + (r.stdout or ""), re.I)
    tok = int(m[-1].replace(",", "")) if m else None
    up = os.path.join(H, "사용량.json")
    use = json.load(open(up, encoding="utf-8")) if os.path.exists(up) else {}
    use[need] = tok
    json.dump(use, open(up, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    if os.path.exists(out):
        open(os.path.join(H, need + ".md"), "w", encoding="utf-8").write(md(json.load(open(out, encoding="utf-8"))))
        shutil.rmtree(d, ignore_errors=True)
    print(need, "완료" if os.path.exists(out) else "실패 " + (r.stderr or "")[-300:], "토큰", tok, flush=True)


if __name__ == "__main__":
    for n in sys.argv[1:]:
        make(n)

# -*- coding: utf-8 -*-
"""사장님 눈 v1 — 원 카드 정리와 정규화 입력 만들기.

사용: python eye_prep.py <설정.json> <샌드박스 폴더> [--n-batches 6]
  - 작업/시뮬레이션/시험지/ 카드를 읽어 머리줄·자기평가 절·규칙 번호·P-ID를 지운다.
  - 무작위 코드(X01…)로 <샌드박스>/norm/<코드>.txt 에 쓴다. 제목 줄(ID·이름)은 지운다.
  - 길이가 고르게 정규화 묶음을 나눠 <샌드박스>/norm/묶음-<k>.json (files, S) 으로 쓴다.
  - 코드표는 설정 폴더의 코드표.json 의 '정규화' 칸에 쓴다(판정 에이전트에게는 보내지 않는다).
  - 설정 '원천파일'(ID → 설정 폴더 기준 경로)이 있으면 그 ID는 시험지 대신 그 파일을 읽는다(v1.1: 사장님이 본 판).
  - 설정 '정규화대상'이 있으면 그 ID만 정리한다(나머지 카드는 이전 판 그대로 쓴다).
"""
import argparse
import json
import os
import random
import re
import sys

ROOT = "C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/기획-시스템/작업/시뮬레이션/시험지"
CUT_SECTIONS = ("## 출발점 근거", "## 가장 약한 지점", "## 현실 보정", "## 단계별 판정",
                "## 사장님 판단 칸", "## 사장님 채점")
DROP_PREFIX = ("정본:", "- 제시 형태:", "- 기획서 자체 약점:", "- 참신함(기획서):")
RULE_REF = re.compile(r"\s*[(（]?\s*[①②③④⑤⑥⑦⑧⑨⑩]-\d{2}(?:\s*[·,/]\s*[①②③④⑤⑥⑦⑧⑨⑩]-\d{2})*\s*[)）]?")
PID = re.compile(r"\s*[(（]?P\d{4}(?:\s*[·,]\s*P\d{4})*[)）]?")
SOURCE_WORDS = re.compile(r"\((?:GPT|Claude|Codex)\)|\b(?:GPT|Claude|Codex)\b")
CHECK = re.compile(r"정본|AI가|사장님|[①②③④⑤⑥⑦⑧⑨⑩]-\d{2}|P\d{4}|GPT|Claude|Codex")


def clean(text):
    out, skip = [], False
    for ln in text.splitlines():
        s = ln.strip()
        if s.startswith("## "):
            skip = any(s.startswith(c) for c in CUT_SECTIONS)
        if skip or s.startswith("# ") or any(s.startswith(p) for p in DROP_PREFIX):
            continue
        ln = SOURCE_WORDS.sub("", PID.sub("", RULE_REF.sub("", ln)))
        out.append(ln.rstrip())
    return re.sub(r"\n{3,}", "\n\n", "\n".join(out)).strip() + "\n"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("config")
    ap.add_argument("sandbox")
    ap.add_argument("--n-batches", type=int, default=6)
    a = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")
    cfg = json.load(open(a.config, encoding="utf-8"))
    src = cfg.get("원천", {})
    files = cfg.get("원천파일", {})
    base = os.path.dirname(os.path.abspath(a.config))
    ids = []
    for i in cfg.get("정규화대상") or (cfg["시험"] + cfg["사례"] + cfg["형식누출"]["진짜"] + cfg["형식누출"]["AI"]):
        if i not in ids:
            ids.append(i)
    rnd = random.Random(cfg["씨앗"])
    codes = [f"X{n:02d}" for n in range(1, len(ids) + 1)]
    rnd.shuffle(codes)
    code_of = dict(zip(ids, codes))
    norm_dir = os.path.join(a.sandbox, "norm")
    os.makedirs(norm_dir, exist_ok=True)
    texts, problems = {}, []
    for i in ids:
        path = os.path.join(base, files[i]) if i in files else os.path.join(ROOT, src.get(i, i) + ".md")
        raw = open(path, encoding="utf-8").read()
        t = clean(raw)
        texts[i] = t
        for m in CHECK.finditer(t):
            problems.append(f"{i}: '{m.group(0)}'")
        open(os.path.join(norm_dir, code_of[i] + ".txt"), "w", encoding="utf-8").write(t)
    # 길이 고르게: 긴 순으로 뱀 모양 배분, 같은 원천(G01·G01s)은 다른 묶음
    order = sorted(ids, key=lambda i: -len(texts[i]))
    batches = [[] for _ in range(a.n_batches)]
    for n, i in enumerate(order):
        r, k = divmod(n, a.n_batches)
        batches[k if r % 2 == 0 else a.n_batches - 1 - k].append(i)
    for b in batches:
        srcs = [src.get(i, i) for i in b]
        if len(srcs) != len(set(srcs)):
            problems.append(f"같은 원천이 한 묶음에: {b}")
    s_set = set(cfg["양식S"])
    for k, b in enumerate(batches, 1):
        spec = {"files": [code_of[i] + ".txt" for i in b], "S": [code_of[i] for i in b if i in s_set]}
        json.dump(spec, open(os.path.join(norm_dir, f"묶음-{k}.json"), "w", encoding="utf-8"),
                  ensure_ascii=False, indent=1)
        print(f"묶음-{k}: {len(b)}장 · {sum(len(texts[i]) for i in b):,}자 · 양식S {len(spec['S'])}")
    table_path = os.path.join(os.path.dirname(a.config), "코드표.json")
    table = json.load(open(table_path, encoding="utf-8")) if os.path.exists(table_path) else {}
    table["정규화"] = {c: i for i, c in code_of.items()}
    json.dump(table, open(table_path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"카드 {len(ids)}장 → {norm_dir}")
    print("정리 뒤 남은 금지 무늬:", "없음" if not problems else "")
    for p in problems:
        print("  ·", p)


if __name__ == "__main__":
    main()

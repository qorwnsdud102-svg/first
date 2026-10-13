# -*- coding: utf-8 -*-
"""역기획 시험 — 정답지의 답을 가리고 기획자가 다시 찾아내는지 잰다. 설계는 README.md.

사용:
  python exam.py check <회차폴더>                  문제에 답(브랜드·제품·상징)이 새지 않았나
  python exam.py pack  <회차폴더>                  문제마다 묶음/<id>/ — 참고 자료에서 그 문제의 답 줄을 지운 사본
  python exam.py answer <회차폴더> [--only ID] [--effort xhigh]   문제마다 새 codex exec(read-only)로 3안
  python exam.py grade  <회차폴더> [--only ID] [--effort high]    별도 codex exec로 채점
  python exam.py sum    <회차폴더>                  집계.md
codex exec는 문제마다 --ephemeral 새 세션이다. 이미 낸 응시·채점 파일은 건너뛴다(이어 하기).
"""
import argparse
import glob
import json
import os
import shutil
import subprocess
import sys

sys.stdout.reconfigure(encoding="utf-8")
H = os.path.dirname(os.path.abspath(__file__))
A = os.path.dirname(H)  # 자가학습
MK = os.path.normpath(os.path.join(H, "..", "..", "..", "..", ".."))  # 마케팅
SOURCES = {  # 묶음에 넣는 참고 자료(복사본 이름: 원본)
    "정본.md": os.path.join(MK, "wiki", "syntheses", "DA 기획 단계별 규칙.md"),
    "서브-상징-장치.md": os.path.join(MK, "wiki", "syntheses", "서브 상징 장치.md"),
    "방법정답지.md": os.path.join(A, "히트해부", "방법정답지.md"),
    "다른분야-상징.md": os.path.join(A, "상징원-사전", "다른분야-상징.md"),
    "카드-형식.md": os.path.join(A, "상징짝-드릴", "_드릴-하는-법.md"),
}
STAGES = ["결핍 해석", "상징 떠올리기", "짝 고르기", "구현", "없음"]

ANSWER_PROMPT = """너는 DA(메타 광고) 제품 기획자다. 이 폴더의 문제.json에 결핍 하나가 있다.
이 폴더의 파일만 읽어라(정본.md, 방법정답지.md, 다른분야-상징.md, 서브-상징-장치.md, 카드-형식.md). 다른 폴더·웹·검색은 쓰지 마라.
할 일: 이 결핍에 상징 짝 3안을 낸다.
- 상징은 타겟이 이미 아는 상위 상징(병원 시술·기기·유명 원료·대명사)이다. 낫게 하는 방식의 느낌이 이 결핍과 맞아야 한다.
- 그 상징을 우리가 팔 수 있는 제품(원료·기기·제형·체감·이름)으로 당위 있게 옮긴다.
- 3안은 서로 다른 상징이다. 가장 자신 있는 안을 첫째로 둔다.
칸: line(한 줄), need(타겟이 믿는 원인과 근본 걱정), symbol(상징 고유명사), why(왜 이 결핍에 이 상징인가), product(구현), worry(스스로 본 걸림). 한국어로 쓴다."""

GRADE_PROMPT = """너는 채점자다. 이 폴더에 문제.json, 정답.json(실제로 팔린 제품과 사장님 판정), 응시.json(기획자 3안)이 있다. 이 폴더만 읽어라.
3안 각각을 매긴다.
- symbol_match: 2 = 정답 symbol과 같다(대명사·같은 시술 포함), 1 = symbol_family에 든 같은 계열, 0 = 다름
- bridge_match: 2 = 정답 bridge와 같은 다리(원료·기기·체감·이름), 1 = 일부, 0 = 다름
- need_read: 2 = 사장님 이유·근본 걱정과 같은 결핍 해석, 1 = 일부, 0 = 다름
best: 세 점수 합이 가장 큰 안의 번호(0~2).
fail_stage: best 안이 처음 어긋난 단계. '상징 떠올리기' = 정답 상징이나 계열이 3안 어디에도 없음. '짝 고르기' = 3안 중에는 있는데 첫째 안이 아님. '결핍 해석'·'구현'은 그 칸이 0일 때. 다 맞으면 '없음'.
leak: 응시에 정답 brand·product 이름이 나오면 true.
alt_good: 정답과 달라도 상징이 결핍에 잘 맞고 구현 당위가 있어 사장님께 보여 드릴 만하면 true, alt_reason에 한 줄(아니면 빈 문자열).
note: 한 줄 총평. 한국어로 쓴다."""

S3 = {"type": "string"}
ANSWER_SCHEMA = {"type": "object", "additionalProperties": False, "required": ["id", "plans"], "properties": {
    "id": S3, "plans": {"type": "array", "minItems": 3, "maxItems": 3, "items": {
        "type": "object", "additionalProperties": False,
        "required": ["line", "need", "symbol", "why", "product", "worry"],
        "properties": {k: S3 for k in ["line", "need", "symbol", "why", "product", "worry"]}}}}}
SCORE = {"type": "integer", "enum": [0, 1, 2]}
GRADE_SCHEMA = {"type": "object", "additionalProperties": False,
                "required": ["id", "best", "plans", "leak", "alt_good", "alt_reason", "fail_stage", "note"],
                "properties": {
                    "id": S3, "best": {"type": "integer", "enum": [0, 1, 2]},
                    "plans": {"type": "array", "minItems": 3, "maxItems": 3, "items": {
                        "type": "object", "additionalProperties": False,
                        "required": ["symbol_match", "bridge_match", "need_read"],
                        "properties": {"symbol_match": SCORE, "bridge_match": SCORE, "need_read": SCORE}}},
                    "leak": {"type": "boolean"}, "alt_good": {"type": "boolean"}, "alt_reason": S3,
                    "fail_stage": {"type": "string", "enum": STAGES}, "note": S3}}


def load(rd):
    q = json.load(open(os.path.join(rd, "문제.json"), encoding="utf-8"))
    a = {x["id"]: x for x in json.load(open(os.path.join(rd, "정답.json"), encoding="utf-8"))}
    assert [x["id"] for x in q] and set(x["id"] for x in q) == set(a), "문제와 정답의 id가 다르다"
    return q, a


def leaks(text, ans):
    t = text.lower()
    terms = [ans["brand"], ans["product"], ans["symbol"]] + list(ans.get("leak_terms", []))
    return [w for w in terms if w and w.lower() in t]


def drop_line(line, ans):
    t = line.lower()
    if any(w and w.lower() in t for w in [ans["brand"], ans["product"]] + list(ans.get("leak_terms", []))):
        return True
    sym = [ans["symbol"]] + list(ans.get("symbol_family", []))
    return any(s and s.lower() in t for s in sym) and any(n and n.lower() in t for n in ans.get("need_terms", []))


def cmd_check(rd):
    q, a = load(rd)
    bad = [(x["id"], leaks(json.dumps(x, ensure_ascii=False), a[x["id"]])) for x in q]
    bad = [b for b in bad if b[1]]
    for i, w in bad:
        print("샘", i, w)
    print("문제", len(q), "· 샌 문제", len(bad))
    return 1 if bad else 0


def cmd_pack(rd):
    q, a = load(rd)
    log = {}
    for x in q:
        ans, d = a[x["id"]], os.path.join(rd, "묶음", x["id"])
        os.makedirs(d, exist_ok=True)
        json.dump(x, open(os.path.join(d, "문제.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        log[x["id"]] = {}
        for name, src in SOURCES.items():
            lines = open(src, encoding="utf-8").read().splitlines()
            keep = [l for l in lines if not drop_line(l, ans)]
            open(os.path.join(d, name), "w", encoding="utf-8").write("\n".join(keep) + "\n")
            log[x["id"]][name] = len(lines) - len(keep)
        left = [w for f in SOURCES for w in leaks(open(os.path.join(d, f), encoding="utf-8").read(), {**ans, "symbol": ""})]
        assert not left, (x["id"], "묶음에 답이 남음", left)
    json.dump(log, open(os.path.join(rd, "묶음-기록.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("묶음", len(q), "· 지운 줄", sum(sum(v.values()) for v in log.values()))


def codex(folder, prompt, schema, out, effort):
    exe = sorted(glob.glob(os.path.join(os.environ["LOCALAPPDATA"], "OpenAI", "Codex", "bin", "*", "codex.exe")))
    assert exe, "codex.exe를 못 찾음"
    sp = os.path.join(folder, "_schema.json")
    json.dump(schema, open(sp, "w", encoding="utf-8"), ensure_ascii=False)
    r = subprocess.run([exe[-1], "exec", "--skip-git-repo-check", "--ephemeral", "-s", "read-only",
                        "-c", f'model_reasoning_effort="{effort}"', "-C", folder, "-o", out,
                        "--output-schema", sp, "-"], input=prompt, text=True, encoding="utf-8",
                       capture_output=True)
    os.remove(sp)
    ok = r.returncode == 0 and os.path.exists(out)
    print(("완료 " if ok else "실패 ") + os.path.basename(out), "" if ok else r.stderr[-300:])


def cmd_answer(rd, only, effort):
    q, _ = load(rd)
    os.makedirs(os.path.join(rd, "응시"), exist_ok=True)
    for x in q:
        out = os.path.join(rd, "응시", x["id"] + ".json")
        if (only and x["id"] != only) or os.path.exists(out):
            continue
        codex(os.path.join(rd, "묶음", x["id"]), ANSWER_PROMPT, ANSWER_SCHEMA, out, effort)


def cmd_grade(rd, only, effort):
    q, a = load(rd)
    os.makedirs(os.path.join(rd, "채점"), exist_ok=True)
    for x in q:
        i = x["id"]
        out, got = os.path.join(rd, "채점", i + ".json"), os.path.join(rd, "응시", i + ".json")
        if (only and i != only) or os.path.exists(out) or not os.path.exists(got):
            continue
        d = os.path.join(rd, "채점묶음", i)
        os.makedirs(d, exist_ok=True)
        json.dump(x, open(os.path.join(d, "문제.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        json.dump(a[i], open(os.path.join(d, "정답.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        shutil.copy(got, os.path.join(d, "응시.json"))
        codex(d, GRADE_PROMPT, GRADE_SCHEMA, out, effort)


def cmd_sum(rd):
    q, a = load(rd)
    rows, stages, alts, leaked = [], {s: 0 for s in STAGES}, [], []
    for x in q:
        p = os.path.join(rd, "채점", x["id"] + ".json")
        if not os.path.exists(p):
            continue
        g = json.load(open(p, encoding="utf-8"))
        if g["leak"]:
            leaked.append(x["id"])
            continue
        b = g["plans"][g["best"]]
        found = any(pl["symbol_match"] == 2 for pl in g["plans"])
        rows.append((x["id"], a[x["id"]]["brand"], a[x["id"]]["symbol"], found,
                     b["symbol_match"] + b["bridge_match"] + b["need_read"], g["fail_stage"], g["note"]))
        stages[g["fail_stage"]] += 1
        if g["alt_good"]:
            alts.append((x["id"], g["alt_reason"]))
    n = len(rows)
    out = [f"# 역기획 시험 집계 — {os.path.basename(rd)}", "",
           f"- 채점 {n}문제(샌 문제 {len(leaked)}개 제외: {', '.join(leaked) or '없음'})"]
    if n:
        out += [f"- **재발견율 {sum(r[3] for r in rows)}/{n} ({sum(r[3] for r in rows) / n:.0%})** · 평균 {sum(r[4] for r in rows) / n:.2f}/6",
                "- 막힌 단계: " + " · ".join(f"{s} {c}" for s, c in stages.items()),
                f"- 다르지만 좋은 안 {len(alts)}개", "",
                "| 문제 | 정답 제품 | 정답 상징 | 다시 찾음 | 점수 | 막힌 단계 | 한 줄 |", "|---|---|---|---|---:|---|---|"]
        out += [f"| {r[0]} | {r[1]} | {r[2]} | {'○' if r[3] else '×'} | {r[4]} | {r[5]} | {r[6]} |" for r in rows]
        if alts:
            out += ["", "## 다르지만 좋은 안 (사장님 화면 후보)"] + [f"- {i}: {t}" for i, t in alts]
    open(os.path.join(rd, "집계.md"), "w", encoding="utf-8").write("\n".join(out) + "\n")
    print("\n".join(out[:6]))


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("cmd", choices=["check", "pack", "answer", "grade", "sum"])
    ap.add_argument("round")
    ap.add_argument("--only")
    ap.add_argument("--effort")
    o = ap.parse_args()
    rd = os.path.abspath(o.round)
    if o.cmd == "check":
        sys.exit(cmd_check(rd))
    elif o.cmd == "pack":
        cmd_pack(rd)
    elif o.cmd == "answer":
        cmd_answer(rd, o.only, o.effort or "xhigh")
    elif o.cmd == "grade":
        cmd_grade(rd, o.only, o.effort or "high")
    else:
        cmd_sum(rd)

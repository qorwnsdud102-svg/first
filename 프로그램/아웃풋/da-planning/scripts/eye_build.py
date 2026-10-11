# -*- coding: utf-8 -*-
"""사장님 눈 v1 — 정규화 카드 분리·검사, 형식 누출 카드, 눈의 재료·비교 기준·시험 카드 만들기.

사용:
  python eye_build.py split <설정.json> <정규화 답 파일> ...   → 눈-v1/카드/<ID>.md
  python eye_build.py check <설정.json>                        → 양식·이름 누출 검사
  python eye_build.py fmt   <설정.json> <샌드박스>              → <샌드박스>/fmt/형식-20.md, 코드표 '형식누출'
  python eye_build.py build <설정.json> <샌드박스>              → <샌드박스>/judge/ 사례·말·규칙집 사본·시험 카드 2벌,
                                                                 눈-v1/입력/ 사본, 눈-v1/누출점검.md, 코드표 '사례'·'시험'
판정 에이전트에게는 무작위 코드만 보낸다. 코드표.json 은 볼트에만 둔다.
"""
import collections
import json
import os
import random
import re
import shutil
import sys
import unicodedata

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from leak_check import table as leak_table  # noqa: E402

W = "C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/기획-시스템/작업"
SIM = W + "/시뮬레이션"
F_LABELS = ["무엇", "누구", "상징원", "가져온 것", "옮긴 칸", "1초 장면", "가격"]
S_LABELS = ["제품", "시장", "상징원", "연결"]
MAX_PART = 35000  # 나눈 파일 하나의 최대 바이트
H_VERDICT = "안 받음 — 메타에서 오래 팔린 히트지만, 상징 없이 효과만 직설하는 흔한 제품은 우리 기획으로 받지 않는다"


def nz(s):
    return re.sub(r"\s+", "", unicodedata.normalize("NFC", s))


def load(cfg_path):
    cfg = json.load(open(cfg_path, encoding="utf-8"))
    base = os.path.dirname(os.path.abspath(cfg_path))
    tpath = os.path.join(base, "코드표.json")
    table = json.load(open(tpath, encoding="utf-8")) if os.path.exists(tpath) else {}
    return cfg, base, table, tpath


def save_table(table, tpath):
    json.dump(table, open(tpath, "w", encoding="utf-8"), ensure_ascii=False, indent=1)


def leak_terms(cfg, kinds=("이름", "개념")):
    return {i: [t for k in kinds for t in d.get(k, [])] for i, d in cfg["누출어"].items()}


def held_ids(cfg):
    src = cfg.get("원천", {})
    return [src.get(i, i) for i in cfg["시험"]]


def answer_rows():
    """정답지 A·B·G·N·H 의 첫 표에서 ID별 판정·원문·행. 칸 이름은 머리줄에서 찾는다."""
    rows = {}
    for f in ("정답지-A.md", "정답지-B.md", "정답지-G.md", "정답지-N.md", "정답지-H.md"):
        hdr = None
        for ln in open(os.path.join(SIM, f), encoding="utf-8"):
            if not ln.startswith("|"):
                continue
            cells = [c.strip() for c in ln.strip().strip("|").split("|")]
            if cells[0] == "ID":
                hdr = cells
                continue
            if hdr is None or not re.match(r"^[A-Z]\d{2,3}$", cells[0]) or cells[0] in rows:
                continue
            d = dict(zip(hdr, cells))
            verdict = next((v for k, v in d.items() if "판정" in k), "")
            quote = next((v for k, v in d.items() if "원문" in k and "파일" not in k), "")
            rows[cells[0]] = {"판정": verdict, "원문": quote, "행": ln, "이름": cells[1]}
    return rows


def panrye():
    rows = {}
    for ln in open(os.path.join(W, "판례-원문목록.md"), encoding="utf-8"):
        if not ln.startswith("| P"):
            continue
        c = [x.strip() for x in ln.strip().strip("|").split("|")]
        if len(c) >= 5:
            rows[c[0]] = {"파일": c[1].split(":")[0], "원문": c[2], "요지": c[3], "종류": c[4]}
    return rows


def clean_quote(q):
    q = re.sub(r"`[^`]*`", "", q)
    q = re.sub(r"(?:—\s*)?\(?(?:raw|작업|프로젝트|공통-탐색)[/\\][^\s)]+\)?", "", q)
    q = re.sub(r"\s*[·,]?\s*(?:같은 파일|캡처 설명)\s*", " ", q)
    return re.sub(r"\s{2,}", " ", q).strip(" —·")


def scrub_ids(s):
    """판정자 자료에서 내부 카드 ID 언급((B07과 같은 한 마디)·(회귀 시험 G04))과 P-ID 꼬리를 지운다."""
    s = re.sub(r"\s*\((?:[ABGHN]\d{2,3}s?과 같은 한 마디|회귀 시험 [ABGHN]\d{2,3}s?)\)", "", s)
    s = re.sub(r"\s*[—-]?\s*P\d{4}(?:\s*[·,]\s*P\d{4})*", "", s)
    return s.strip()


def card_text(base, i):
    return open(os.path.join(base, "카드", i + ".md"), encoding="utf-8").read().strip()


def write_parts(dirpath, prefix, title, lines):
    parts, cur, size = [], [], 0
    for ln in lines:
        b = len(ln.encode("utf-8")) + 1
        if cur and size + b > MAX_PART:
            parts.append(cur)
            cur, size = [], 0
        cur.append(ln)
        size += b
    if cur:
        parts.append(cur)
    names = []
    for k, p in enumerate(parts, 1):
        name = f"{prefix}-{k}.md"
        body = f"# {title} ({k}/{len(parts)})\n\n" + "\n".join(p) + "\n"
        open(os.path.join(dirpath, name), "w", encoding="utf-8").write(body)
        names.append(name)
    return names


# ---------------------------------------------------------------- split / check
def cmd_split(cfg_path, outputs):
    cfg, base, table, _ = load(cfg_path)
    code2id = table["정규화"]
    cards = os.path.join(base, "카드")
    os.makedirs(cards, exist_ok=True)
    seen = {}
    for p in outputs:
        txt = open(p, encoding="utf-8").read()
        for m in re.finditer(r"^###\s*(X\d{2})\s*$\n(.*?)(?=^###\s*X\d{2}\s*$|\Z)", txt, re.S | re.M):
            code, body = m.group(1), m.group(2)
            lines = [ln.rstrip() for ln in body.splitlines() if ln.strip()]
            i = code2id[code]
            seen[i] = code
            open(os.path.join(cards, i + ".md"), "w", encoding="utf-8").write("\n".join(lines) + "\n")
    missing = sorted(i for i in code2id.values() if i not in seen)
    print(f"카드 {len(seen)}장 저장 · 빠짐 {len(missing)} {missing}")


def cmd_check(cfg_path):
    cfg, base, _, _ = load(cfg_path)
    s_set = set(cfg["양식S"])
    names = leak_terms(cfg, ("이름",))
    cards = os.path.join(base, "카드")
    bad, warn = [], []
    for f in sorted(os.listdir(cards)):
        i = f[:-3]
        t = open(os.path.join(cards, f), encoding="utf-8").read()
        lines = [ln for ln in t.splitlines() if ln.strip()]
        want = S_LABELS if i in s_set else F_LABELS
        got = []
        for ln in lines:
            m = re.match(r"^-\s*([^:：]+?)\s*[:：]", ln)
            got.append(m.group(1).strip() if m else ln[:12])
        if got != want:
            bad.append(f"{i}: 라벨 {got}")
        for ln in lines:
            if len(ln) > 170:
                warn.append(f"{i}: 긴 줄 {len(ln)}자")
        n = nz(t)
        for j, ts in names.items():
            for x in ts:
                if nz(x) in n:
                    bad.append(f"{i}: 이름 누출 '{x}'({j})")
        if re.search(r"\d\s*%", t):
            warn.append(f"{i}: % 숫자")
        for w in ("사장님", "미확인", "추정", "AI", "기획서", "Claude", "GPT"):
            if w in t:
                bad.append(f"{i}: 금지어 '{w}'")
        if re.search(r"P\d{4}|[①②③④⑤⑥⑦⑧⑨⑩]-\d{2}", t):
            bad.append(f"{i}: 규칙 번호·P-ID")
    print(f"카드 {len(os.listdir(cards))}장 · 실패 {len(bad)} · 주의 {len(warn)}")
    for x in bad:
        print("  ✗", x)
    for x in warn:
        print("  △", x)
    return bad


# ---------------------------------------------------------------- 형식 누출
def cmd_fmt(cfg_path, sandbox):
    cfg, base, table, tpath = load(cfg_path)
    ids = cfg["형식누출"]["진짜"] + cfg["형식누출"]["AI"]
    rnd = random.Random(cfg["씨앗"] + 7)
    codes = [f"F{n:02d}" for n in range(1, len(ids) + 1)]
    rnd.shuffle(codes)
    code_of = dict(zip(ids, codes))
    blocks = [f"### {code_of[i]}\n{card_text(base, i)}\n" for i in sorted(ids, key=lambda i: code_of[i])]
    d = os.path.join(sandbox, "fmt")
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "형식-20.md"), "w", encoding="utf-8").write(
        f"# 카드 {len(ids)}장\n\n" + "\n".join(blocks))
    table["형식누출"] = {c: i for i, c in code_of.items()}
    save_table(table, tpath)
    os.makedirs(os.path.join(base, "입력"), exist_ok=True)
    shutil.copy(os.path.join(d, "형식-20.md"), os.path.join(base, "입력", "형식-20.md"))
    print(os.path.join(d, "형식-20.md"))


# ---------------------------------------------------------------- 눈의 재료·비교 기준·시험 카드
def cmd_build(cfg_path, sandbox):
    cfg, base, table, tpath = load(cfg_path)
    ans, pan = answer_rows(), panrye()
    held = held_ids(cfg)
    terms_all = leak_terms(cfg)
    held_terms = [t for i in held for t in terms_all.get(i, [])]
    jd = os.path.join(sandbox, "judge")
    if os.path.isdir(jd):
        shutil.rmtree(jd)
    os.makedirs(jd)

    # (가) 판정 사례집
    rnd = random.Random(cfg["씨앗"] + 11)
    ids = cfg["사례"]
    rcodes = [f"R{n:02d}" for n in range(1, len(ids) + 1)]
    rnd.shuffle(rcodes)
    rcode = dict(zip(ids, rcodes))
    blocks = []
    for i in sorted(ids, key=lambda x: rcode[x]):
        if i.startswith("H"):
            p = pan[cfg["H사례판정"]["말"]]
            verdict, quote = H_VERDICT, f"{p['원문']} (요지: {p['요지']})"
        else:
            verdict, quote = ans[i]["판정"], clean_quote(ans[i]["원문"])
        blocks.append(f"### {rcode[i]}\n{card_text(base, i)}\n- 사장님 판정: {scrub_ids(verdict)}\n- 사장님 말: {scrub_ids(quote)}\n")
    head = ("# 판정 사례집 — 사장님이 실제로 판정한 카드 " + str(len(ids)) + "장\n\n"
            "카드는 모두 같은 양식(7줄 또는 상징 후보 4줄)으로 옮겨 적은 것이다. 판정과 말은 사장님 원문이다.\n\n")
    open(os.path.join(jd, "사례.md"), "w", encoding="utf-8").write(head + "\n".join(blocks))

    # (나) 사장님 말 모음
    held_p = set()
    for i in held:
        held_p |= set(re.findall(r"P\d{4}", ans[i]["행"]))
    why, kept = collections.Counter(), []
    for pid, r in pan.items():
        if pid in held_p:
            why["① 시험 문항 정답지의 P-ID"] += 1
            continue
        if pid in cfg.get("제외P", {}):
            why["④ 이름 없이 시험 문항을 가리키는 줄(수동)"] += 1
            continue
        if any(pat in r["파일"] for pat in cfg["제외파일무늬"]):
            why["② 시험 문항 판정 원문 파일"] += 1
            continue
        text = nz(r["원문"] + r["요지"])
        if any(nz(t) in text for t in held_terms):
            why["③ 시험 문항 누출어"] += 1
            continue
        kept.append(f"- {pid} [{r['종류']}] 원문 {scrub_ids(r['원문'])} / 요지 {scrub_ids(r['요지'])}")
    said = write_parts(jd, "말", "사장님 말 모음 — 기획에 대해 사장님이 직접 한 말(원문)과 요지", kept)

    # 비교 기준: 규칙집 v1·v2 시험용 사본(같은 누출어 줄을 가림)
    masked = {}
    for v in ("v1", "v2"):
        lines, n = [], 0
        for ln in open(os.path.join(SIM, "규칙집", f"규칙집-{v}.md"), encoding="utf-8"):
            ln = ln.rstrip("\n")
            if any(nz(t) in nz(ln) for t in held_terms):
                lines.append("(시험용으로 가림)")
                n += 1
            else:
                lines.append(ln)
        masked[v] = (write_parts(jd, v, f"규칙집 {v} — 시험용 사본(일부 줄 가림)", lines), n)

    # 시험 카드 2벌
    tests = cfg["시험"]
    kcodes = [f"K{n:02d}" for n in range(1, len(tests) + 1)]
    random.Random(cfg["씨앗"] + 13).shuffle(kcodes)
    kcode = dict(zip(tests, kcodes))
    for r in (1, 2):
        order = tests[:]
        random.Random(cfg["씨앗"] + 100 + r).shuffle(order)
        body = "\n".join(f"### {kcode[i]}\n{card_text(base, i)}\n" for i in order)
        open(os.path.join(jd, f"카드-{r}.md"), "w", encoding="utf-8").write(
            f"# 시험 카드 {len(tests)}장 (순서 {r})\n\n" + body)

    table["사례"] = {c: i for i, c in rcode.items()}
    table["시험"] = {c: i for i, c in kcode.items()}
    save_table(table, tpath)

    # 누출 감사용: 시험 문항의 정체와 정답(감사자만 본다 — 판정자 폴더 밖)
    ad = os.path.join(sandbox, "audit")
    os.makedirs(ad, exist_ok=True)
    src = cfg.get("원천", {})
    rows = []
    for i in tests:
        a = ans[src.get(i, i)]
        rows.append(f"### {i} — {a['이름']}\n- 사장님 판정: {a['판정']}\n- 사장님 말: {clean_quote(a['원문'])}\n"
                    f"- 누출어: {', '.join(terms_all.get(src.get(i, i), []))}\n- 정규화 카드:\n{card_text(base, i)}\n")
    open(os.path.join(ad, "시험문항-정답.md"), "w", encoding="utf-8").write(
        f"# 시험 문항 {len(tests)}개 — 정체와 사장님 판정 (누출 감사용)\n\n" + "\n".join(rows))

    # 사본 보관(규칙집 사본은 빼고 — 위 명령으로 다시 만들 수 있다)
    keep = os.path.join(base, "입력")
    os.makedirs(keep, exist_ok=True)
    for f in ["사례.md", "카드-1.md", "카드-2.md"] + said:
        shutil.copy(os.path.join(jd, f), os.path.join(keep, f))

    # 누출 점검표
    groups = {i: terms_all[i] for i in held}
    name_groups = {i: leak_terms(cfg, ("이름",))[i] for i in held}
    ref_files = [os.path.join(jd, f) for f in ["사례.md"] + said + masked["v1"][0] + masked["v2"][0]]
    t1, n1 = leak_table(groups, ref_files)
    t2, n2 = leak_table(name_groups, [os.path.join(jd, "카드-1.md")])
    rep = ["# 사장님 눈 v1 — 누출 점검표", "",
           f"- 시험 문항 {len(held)}개(원천 기준)의 누출어(이름 + 개념)를 공백을 지우고 셌다.",
           f"- 말 모음: 판례 {len(pan)}행 중 {len(kept)}행 사용 · 제외 " +
           " · ".join(f"{k} {v}" for k, v in why.items()),
           f"- 규칙집 사본: v1 가린 줄 {masked['v1'][1]} · v2 가린 줄 {masked['v2'][1]}",
           f"- 판정자 입력 합계(사례·말·규칙집 사본) 누출 {n1}회 — 0이어야 한다", "",
           "## 판정자 입력", "", t1, "## 시험 카드의 다른 제품 이름(이름 누출어만)", "", t2,
           f"시험 카드 이름 누출 {n2}회 — 0이어야 한다", ""]
    open(os.path.join(base, "누출점검.md"), "w", encoding="utf-8").write("\n".join(rep))
    print("\n".join(rep[:6]))
    print("말 파일", said, "· v1", masked["v1"][0], "· v2", masked["v2"][0])
    print(f"누출: 입력 {n1} · 시험 카드 이름 {n2}")


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    cmd, args = sys.argv[1], sys.argv[2:]
    if cmd == "split":
        cmd_split(args[0], args[1:])
    elif cmd == "check":
        sys.exit(1 if cmd_check(args[0]) else 0)
    elif cmd == "fmt":
        cmd_fmt(args[0], args[1])
    elif cmd == "build":
        cmd_build(args[0], args[1])
    else:
        sys.exit(__doc__)


if __name__ == "__main__":
    main()

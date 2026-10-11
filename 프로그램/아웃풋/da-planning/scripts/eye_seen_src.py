# -*- coding: utf-8 -*-
"""사장님 눈 v1.1 — 사장님이 판정 때 실제로 본 판에서 시험 카드 원천을 만든다.

사용: python eye_seen_src.py <출력 폴더>
  N01~N10     ← 공동기획-2026-10-3차/사장님-판정용-10개.md ('확인 필요'·판정 칸 뺌)
  A01·A04~A07 ← 기획-시스템/사장님-판단할것-2026-10-11.docx @7d1634c
  A10~A13     ← 공동기획-2026-10-2차/아침-보고-요약.docx @a23837f (③~⑥을 판정하신 판)
  평가·판정 칸(위험·Claude 의견·이미 받은 판정·판매처 확인·고를 답·사장님 판정)은 뺀다.
  '좋은 점'은 '연결'로 이름만 바꾼다(평가 말은 정규화 규칙 2가 뺀다).
  A02·A03·A08·A09·G03 은 손으로 쓴 원천이라 이 스크립트가 만들지 않는다.
"""
import html
import io
import os
import re
import subprocess
import sys
import zipfile

VAULT = "C:/claude/LLM-WIKI"
DA = "마케팅/프로젝트/DA-기획"
N_SRC = f"{DA}/공동기획-2026-10-3차/사장님-판정용-10개.md"
DOCX = [  # (커밋, 경로, {카드 머리 낱말: ID})
    ("7d1634c", f"{DA}/기획-시스템/사장님-판단할것-2026-10-11.docx",
     {"쿨빔": "A01", "레드밤": "A05", "NMN": "A04", "캐비어": "A06", "혼합 미백젤": "A07"}),
    ("a23837f", f"{DA}/공동기획-2026-10-2차/아침-보고-요약.docx",
     {"써멀": "A12", "파라핀": "A10", "재배치": "A11", "라미코트": "A13"}),
]
KEEP = {"누가": "누가", "무엇": "무엇", "쓰는 장면": "쓰는 장면", "상징 · 가격": "상징 · 가격", "좋은 점": "연결"}
DROP = {"위험", "Claude 의견", "이미 받은 판정", "판매처 확인", "고를 답", "사장님 판정"}
N_KEEP = ("누구에게", "무엇", "쓰는 장면", "얼마", "상징", "광고 첫 장면")
HEAD = re.compile(r"^[①②③④⑤⑥]\s+(.+?)\s+\((?:Claude|GPT) \d{2}\)\s*$")
NEXT_PART = re.compile(r"^(\d\.\s|주의|탈락)")


def docx_paras(commit, path):
    data = subprocess.run(["git", "-C", VAULT, "show", f"{commit}:{path}"],
                          capture_output=True, check=True).stdout
    xml = zipfile.ZipFile(io.BytesIO(data)).read("word/document.xml").decode("utf-8")
    out = []
    for p in re.findall(r"<w:p[ >].*?</w:p>", xml, flags=re.S):
        t = html.unescape("".join(re.findall(r"<w:t[^>]*>(.*?)</w:t>", p, flags=re.S))).strip()
        if t:
            out.append(t)
    return out


def docx_cards(paras, names):
    cards, cur, label = {}, None, None
    for t in paras:
        m = HEAD.match(t)
        if m:
            cur = next((i for k, i in names.items() if k in m.group(1)), None)
            label = None
            if cur:
                cards[cur] = []
            continue
        if cur is None:
            continue
        if NEXT_PART.match(t):
            cur = None
            continue
        if t in KEEP or t in DROP:
            label = t
            continue
        if label in KEEP:
            cards[cur].append(f"- {KEEP[label]}: {t}")
    return cards


def n_cards(text):
    cards = {}
    for m in re.finditer(r"^## (N\d{2}) · .*?$\n(.*?)(?=^## N\d{2} · |\Z)", text, re.S | re.M):
        lines = []
        for ln in m.group(2).splitlines():
            mm = re.match(r"^- \*\*(.+?)\*\*:\s*(.*)$", ln.strip())
            if mm and mm.group(1) in N_KEEP:
                lines.append(f"- {mm.group(1)}: {mm.group(2)}")
        cards[m.group(1)] = lines
    return cards


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    cards = n_cards(open(os.path.join(VAULT, N_SRC), encoding="utf-8").read())
    for commit, path, names in DOCX:
        cards.update(docx_cards(docx_paras(commit, path), names))
    for i in sorted(cards):
        body = "\n".join(cards[i])
        bad = [w for w in sorted(DROP) + ["확인 필요"] if w in body]
        open(os.path.join(out, i + ".md"), "w", encoding="utf-8").write(f"# {i}\n{body}\n")
        print(f"{i}: {len(cards[i])}줄 · {len(body)}자" + (f" · 금지 칸 {bad}" if bad else ""))


if __name__ == "__main__":
    main()

# -*- coding: utf-8 -*-
"""새 방식 2단계용 확인표: 후보 상징의 네이버 월 검색량(검색광고 keywordstool 정확 일치) + 이 주제 광고·시장카드에 이미 나온 횟수.
모델 없이 스크립트로만 만든다(원칙 P6516). 네이버는 한 줄로(원칙 P6517).
사용: python 확인표.py <후보.json>   ({"<주제폴더>": ["상징", ...], ...}) → 확인표.md"""
import glob, json, os, re, subprocess, sys
sys.stdout.reconfigure(encoding="utf-8")
H = os.path.dirname(os.path.abspath(__file__))
KW = r"C:\claude\LLM-WIKI\프로그램\아웃풋\da-planning\scripts\naver_kw.py"
ADS = r"C:\claude\네이버 급상승 키워드 기반 경쟁사 발굴\scripts\R1-메타_메타광고소재"
AD_DIRS = {"탈모": ["탈모", "정수리탈모", "탈모샴푸"]}  # 수집해 둔 메타 광고가 있는 주제만


def clean(s):
    return re.sub(r"\(.*?\)|\[.*?\]", "", s).strip()


def volumes(words):
    out = subprocess.run([sys.executable, KW, *words, "--rel", "0"], capture_output=True, text=True, encoding="utf-8").stdout
    vol = {}
    for line in out.splitlines():
        m = re.match(r"- (.+?): ([\d,]+) / ([\d,]+) / ([\d,]+) / ", line)
        if m:
            vol[m.group(1)] = int(m.group(4).replace(",", ""))
    return vol


def shelf_text(topic):
    t = open(os.path.join(H, "공통", topic, "시장카드.md"), encoding="utf-8").read()
    for d in AD_DIRS.get(topic, []):
        for f in glob.glob(os.path.join(ADS, d, "_ads.json")):
            t += "\n" + json.dumps(json.load(open(f, encoding="utf-8")).get("ad_texts", []), ensure_ascii=False)
    return t


cands = json.load(open(sys.argv[1], encoding="utf-8"))
lines = ["# 확인표 — 스크립트가 잰 값", "", "- 검색량: 네이버 검색광고 월간 PC+모바일(정확 일치, 띄어쓰기 없앰). '없음'은 10 미만이거나 미등록.",
         "- 매대: 이 주제의 시장카드(메타 광고 요약)" + " · 수집해 둔 메타 광고 문구에 그 이름이 나온 횟수. 0은 '못 봤다'이지 '없다'가 아니다.", ""]
for topic, syms in cands.items():
    words = []
    for s in syms:
        words += [w.replace(" ", "") for w in re.split(r"[·/+]", clean(s)) if w.strip()]
    vol = volumes(sorted(set(words)))
    text = shelf_text(topic)
    lines += [f"## {topic}", "", "| 후보 | 검색량 | 매대에 나온 횟수 |", "|---|---:|---:|"]
    for s in syms:
        parts = [w.replace(" ", "") for w in re.split(r"[·/+]", clean(s)) if w.strip()]
        v = " · ".join(f"{p} {vol[p]:,}" if p in vol else f"{p} 없음" for p in parts)
        n = sum(text.replace(" ", "").count(p) for p in parts)
        lines.append(f"| {s} | {v} | {n} |")
    lines.append("")
open(os.path.join(H, "확인표.md"), "w", encoding="utf-8").write("\n".join(lines))
print("\n".join(lines))

# -*- coding: utf-8 -*-
"""기획자 지시문을 결핍마다 채운다. 사용: python fill_prompt.py <NN-결핍> [...] → $DA_WORK/prompt-<이름>.txt

틀: $DA_ROUND/_지시문/planner-prompt.md ({번호}·{결핍}·{kw파일}·{n}·{목소리파일}·{메타폴더}·{메타키워드}·{메모})
$DA_WORK/plans.json:
  {"_voice_root": "<목소리 폴더 — 사이트별 하위 폴더에 <키워드>.xlsx>", "_meta_dir": "<메타 수집 폴더 이름>",
   "<NN-결핍>": {"voice": [키워드…], "meta": [키워드…], "memo": "<기획자 메모, 없으면 빈 문자열>",
                "files": [<목소리 파일을 직접 줄 때(재기획 등)>], "meta_dir": "<이 기획만 다른 메타 폴더>"}}
$DA_WORK/kw-<NN-결핍>.txt: 회차 시작 때 naver_kw.py로 잰 검색량(기획자가 읽는다).
"""
import json
import os
import sys

from round_env import INST, WORK

SITES = ["youtube", "dcinside", "fmkorea", "natepann", "arca", "ruliweb", "mlbpark"]
SLOTS = ("{번호}", "{결핍}", "{kw파일}", "{n}", "{목소리파일}", "{메타폴더}", "{메타키워드}", "{메모}")


def main(name, cfg, tpl):
    num, gap = name.split("-", 1)
    p = cfg[name]
    files = p.get("files") or [os.path.join(cfg["_voice_root"], s, kw + ".xlsx") for kw in p["voice"] for s in SITES]
    files = [f for f in files if os.path.exists(f)]
    out = (tpl.replace("{번호}", num).replace("{결핍}", gap).replace("{kw파일}", os.path.join(WORK, f"kw-{name}.txt"))
           .replace("{n}", str(len(files))).replace("{목소리파일}", "\n".join(f"  - {f}" for f in files))
           .replace("{메타폴더}", p.get("meta_dir", cfg["_meta_dir"])).replace("{메타키워드}", " · ".join(p["meta"]))
           .replace("{메모}", p.get("memo", "")))
    path = os.path.join(WORK, f"prompt-{name}.txt")
    open(path, "w", encoding="utf-8").write(out)
    print(name, "목소리 파일", len(files), "남은 자리", [x for x in SLOTS if x in out], path)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    cfg = json.load(open(os.path.join(WORK, "plans.json"), encoding="utf-8"))
    tpl = open(os.path.join(INST, "planner-prompt.md"), encoding="utf-8").read()
    for n in sys.argv[1:]:
        main(n, cfg, tpl)

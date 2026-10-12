# -*- coding: utf-8 -*-
"""워크플로(da-planning-round)가 끝나면 판정자 답을 파일로 남기고 도구 감사를 한다 — 화면을 보내기 전에 커밋(봉인)한다.

사용: python persist_run.py <워크플로 기록 폴더(journal.jsonl이 있는 곳)> <눈 폴더 이름(예: 눈-v4)>
  '검사 A <기획>'·'재검사 A <기획>'·'재검사 B <기획>' → <회차>/<기획>/핵심옮김-A.md·핵심옮김-재검사-A.md·핵심옮김-재검사-B.md
  '사장님 눈 순서1·2' → <눈 폴더>/결과/눈-1.md·눈-2.md
  '제품 링크' → $DA_WORK/page/links-wf.md, '신호등·정하실 것' → $DA_WORK/page/extras-wf.json
판정자마다 agent_audit.py로 샌드박스(+지시문이 읽으라고 한 파일) 밖을 읽었는지 본다. 커밋은 하지 않는다(출력 경로를 보고 커밋).
"""
import json
import os
import re
import subprocess
import sys

from round_env import ENV, ROUND, SCRIPTS, SELF_LEARN, WORK

RULES = os.path.join(r"C:\claude\LLM-WIKI\마케팅\wiki\syntheses", "DA 기획 단계별 규칙.md")
CORE_FILES = {"검사 A": "핵심옮김-A.md", "재검사 A": "핵심옮김-재검사-A.md", "재검사 B": "핵심옮김-재검사-B.md"}


def core_allow(name):
    """핵심 옮김 지시문이 읽으라고 적은 샌드박스 밖 파일까지 허용 목록으로."""
    sb = os.path.join(WORK, "core", name.split("-", 1)[0])
    allow = [sb, RULES]  # 규칙 파일 경로에는 빈칸이 있어 아래 정규식이 못 잡는다
    inst = os.path.join(sb, "_지시.md")
    if os.path.exists(inst):
        allow += sorted(set(re.findall(r"C:\\claude\\LLM-WIKI\\[^\s—]+?\.md", open(inst, encoding="utf-8").read())))
    return allow


def audit(aid, allow):
    cmd = [sys.executable, os.path.join(SCRIPTS, "agent_audit.py")]
    for a in allow:
        cmd += ["--allow", a]
    r = subprocess.run(cmd + [aid], capture_output=True, text=True, encoding="utf-8", env=ENV)
    return (r.stdout + r.stderr).strip()


def main(run_dir, eye):
    sys.stdout.reconfigure(encoding="utf-8")
    labels, results = {}, {}
    for line in open(os.path.join(run_dir, "journal.jsonl"), encoding="utf-8"):
        d = json.loads(line)
        if d.get("type") == "started":
            labels[d["agentId"]] = d["label"]
        elif d.get("type") == "result":
            results[d["agentId"]] = d["result"]
    page = os.path.join(WORK, "page")
    os.makedirs(page, exist_ok=True)
    for aid, label in labels.items():
        res = results.get(aid)
        if res is None:
            print("결과 없음:", label, aid)
            continue
        m = re.match(r"(검사 A|재검사 A|재검사 B) (\S+)$", label)
        if m:
            out = os.path.join(ROUND, m.group(2), CORE_FILES[m.group(1)])
            head = (f"> 핵심 옮김 검사 v3 {m.group(1)}(워크플로 da-planning-round, 에이전트 {aid}) · 지시문 `../_지시문/핵심옮김-검사.md` · "
                    f"샌드박스 `$DA_WORK/core/{m.group(2)[:2]}/` · Explore 1명(Opus 5.5 max)")
            open(out, "w", encoding="utf-8").write(head + "\n\n" + str(res).strip() + "\n")
            print(out, "|", audit(aid, core_allow(m.group(2))))
        elif label.startswith("사장님 눈 순서"):
            r = label[-1]
            d = os.path.join(SELF_LEARN, "시험", eye, "결과")
            os.makedirs(d, exist_ok=True)
            out = os.path.join(d, f"눈-{r}.md")
            open(out, "w", encoding="utf-8").write(str(res).strip() + "\n")
            print(out, "|", audit(aid, [os.path.join(WORK, "eye", "judge")]))
        elif label == "카드 정리":
            print("카드 정리 |", audit(aid, [os.path.join(WORK, "eye", "norm"), os.path.join(WORK, "eye", "out")]))
        elif label == "제품 링크":
            open(os.path.join(page, "links-wf.md"), "w", encoding="utf-8").write(str(res).strip() + "\n")
            print("제품 링크 → page/links-wf.md")
        elif label == "신호등·정하실 것":
            open(os.path.join(page, "extras-wf.json"), "w", encoding="utf-8").write(str(res).strip() + "\n")
            print("신호등 → page/extras-wf.json")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])

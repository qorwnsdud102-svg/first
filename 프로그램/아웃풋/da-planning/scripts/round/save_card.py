# -*- coding: utf-8 -*-
"""서브에이전트 마지막 보고(SubagentHandback)를 파일로 저장. 사용: python save_card.py <agent-id> <출력.md> <머리말 한 줄>"""
import glob, json, os, sys
BASE = os.path.expanduser("~/.claude/projects/C--claude-LLM-WIKI")
aid, out, head = sys.argv[1], sys.argv[2], sys.argv[3]
p = glob.glob(os.path.join(BASE, "*", "subagents", f"agent-{aid}.jsonl"))[0]
msg = None
for line in open(p, encoding="utf-8"):
    d = json.loads(line)
    for x in (d.get("message", {}).get("content") or []):
        if isinstance(x, dict) and x.get("type") == "tool_use" and x.get("name") == "SubagentHandback":
            msg = x["input"]["message"]
assert msg, "보고 없음"
os.makedirs(os.path.dirname(out), exist_ok=True)
open(out, "w", encoding="utf-8").write(head.rstrip() + "\n\n" + msg.strip() + "\n")
print(out, len(msg))

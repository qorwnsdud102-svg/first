# -*- coding: utf-8 -*-
"""서브에이전트 대화 기록에서 최종 보고 글을 꺼낸다.

사용: python agent_text.py <agent-id> [--out 파일]
  기록: ~/.claude/projects/C--claude-LLM-WIKI/<세션>/subagents/agent-<id>.jsonl
  마지막 SubagentHandback 입력의 글(가장 긴 문자열)을, 없으면 마지막 assistant 글을 꺼낸다.
"""
import argparse
import glob
import json
import os
import sys

BASE = os.path.expanduser("~/.claude/projects/C--claude-LLM-WIKI")


def find(agent_id):
    hits = glob.glob(os.path.join(BASE, "*", "subagents", f"agent-{agent_id}.jsonl"))
    if not hits:
        sys.exit(f"기록 없음: agent-{agent_id}")
    return hits[0]


def final_text(path):
    handback, text = None, None
    for line in open(path, encoding="utf-8"):
        d = json.loads(line)
        m = d.get("message") or {}
        if m.get("role") != "assistant" or not isinstance(m.get("content"), list):
            continue
        for b in m["content"]:
            if b.get("type") == "tool_use" and b.get("name") == "SubagentHandback":
                strs = [v for v in (b.get("input") or {}).values() if isinstance(v, str)]
                if strs:
                    handback = max(strs, key=len)
            elif b.get("type") == "text" and b.get("text", "").strip():
                text = b["text"]
    return handback or text or ""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("agent_id")
    ap.add_argument("--out")
    a = ap.parse_args()
    t = final_text(find(a.agent_id))
    if a.out:
        os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
        open(a.out, "w", encoding="utf-8").write(t)
        print(f"{a.out} ({len(t)}자)")
    else:
        sys.stdout.reconfigure(encoding="utf-8")
        print(t)


if __name__ == "__main__":
    main()

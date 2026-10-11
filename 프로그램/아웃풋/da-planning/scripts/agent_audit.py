# -*- coding: utf-8 -*-
"""서브에이전트 도구 호출 감사 — 허용 폴더 밖을 읽었거나 허용 밖 도구를 썼는지 본다.

사용: python agent_audit.py --allow <폴더> <agent-id> [<agent-id> ...]
  허용: Read·Grep·Glob(경로가 허용 폴더 안), SubagentHandback, ToolSearch. --web 이면 WebSearch·WebFetch도.
  Grep·Glob에 경로가 없으면(기본 = 볼트 작업 폴더) 밖으로 친다. 그 밖의 도구는 모두 '무효'.
"""
import argparse
import collections
import glob
import json
import os
import sys

BASE = os.path.expanduser("~/.claude/projects/C--claude-LLM-WIKI")
OK_TOOLS = {"SubagentHandback", "ToolSearch"}
WEB_TOOLS = {"WebSearch", "WebFetch"}


def norm(p):
    return os.path.normcase(os.path.abspath(os.path.expanduser(p.replace("/", os.sep))))


def inside(p, allow):
    if not p:
        return False
    p = norm(p.split("*")[0].rstrip("/\\") or p)
    return p == allow or p.startswith(allow + os.sep)


def audit(agent_id, allow, web=False):
    hits = glob.glob(os.path.join(BASE, "*", "subagents", f"agent-{agent_id}.jsonl"))
    if not hits:
        return ["기록 없음"], collections.Counter()
    bad, used = [], collections.Counter()
    for line in open(hits[0], encoding="utf-8"):
        m = json.loads(line).get("message") or {}
        if m.get("role") != "assistant" or not isinstance(m.get("content"), list):
            continue
        for b in m["content"]:
            if b.get("type") != "tool_use":
                continue
            name, inp = b.get("name"), b.get("input") or {}
            used[name] += 1
            if name in OK_TOOLS or (web and name in WEB_TOOLS):
                continue
            if name == "Read":
                if not inside(inp.get("file_path", ""), allow):
                    bad.append(f"Read 밖: {inp.get('file_path')}")
            elif name == "Grep":
                if not inside(inp.get("path", ""), allow):
                    bad.append(f"Grep 밖 또는 경로 없음: {inp.get('path')}")
            elif name == "Glob":
                pat = inp.get("pattern", "")
                base = inp.get("path") or (pat if os.path.isabs(pat.replace("/", os.sep)) else "")
                if not inside(base, allow):
                    bad.append(f"Glob 밖 또는 경로 없음: {inp.get('path')} {pat}")
            else:
                bad.append(f"허용 밖 도구: {name}")
    return bad, used


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--allow", required=True)
    ap.add_argument("--web", action="store_true", help="WebSearch·WebFetch 허용(히트 해부용)")
    ap.add_argument("agent_ids", nargs="+")
    a = ap.parse_args()
    allow = norm(a.allow)
    sys.stdout.reconfigure(encoding="utf-8")
    any_bad = False
    for aid in a.agent_ids:
        bad, used = audit(aid, allow, a.web)
        tools = ", ".join(f"{k} {v}" for k, v in sorted(used.items())) or "도구 호출 0"
        verdict = "무효" if bad else "깨끗"
        any_bad |= bool(bad)
        print(f"- {aid}: {verdict} — {tools}")
        for x in bad[:20]:
            print(f"    · {x}")
    sys.exit(1 if any_bad else 0)


if __name__ == "__main__":
    main()

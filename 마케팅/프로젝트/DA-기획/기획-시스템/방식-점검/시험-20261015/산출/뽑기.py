# 하위 에이전트 기록(subagents/agent-<id>.jsonl)에서 마지막 JSON 코드블록을 뽑아 저장한다.
# 사용: python 뽑기.py <agent-id> <저장경로>
import json, re, sys
SUB = "C:/Users/qorwn/.claude/projects/C--claude-LLM-WIKI/203d417f-c813-4e44-a156-0dccfaa67872/subagents/agent-%s.jsonl"

def strings(x):
    if isinstance(x, str): yield x
    elif isinstance(x, dict):
        for v in x.values(): yield from strings(v)
    elif isinstance(x, list):
        for v in x: yield from strings(v)

last = None
for line in open(SUB % sys.argv[1], encoding="utf-8"):
    try: d = json.loads(line)
    except Exception: continue
    m = d.get("message") or {}
    if m.get("role") != "assistant": continue
    for s in strings(m.get("content")):
        for b in re.findall(r"```(?:json)?\s*(\{.*?\})\s*```", s, re.S):
            last = b
obj = json.loads(last)
json.dump(obj, open(sys.argv[2], "w", encoding="utf-8"), ensure_ascii=False, indent=1)
cards = obj.get("cards")
print("cards", len(cards) if cards else None, "| topics", [c["topic"] for c in cards] if cards else list(obj.keys()))
print("read_files outside:", [f for f in obj.get("read_files", []) if "시험-20261015" not in f and not re.match(r"^(공통|지금방식|새방식|다시해오기)/", f.replace(chr(92), "/"))])

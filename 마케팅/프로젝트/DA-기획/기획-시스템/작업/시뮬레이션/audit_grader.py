# 채점자 대화 기록에서 금지 파일·명령 접근을 찾는다. 사용: python audit_grader.py <agent-id> ...
import json, sys
D = "C:/Users/qorwn/.claude/projects/C--claude-LLM-WIKI/203d417f-c813-4e44-a156-0dccfaa67872/subagents"
BAD = ["정답지", "raw/", "raw\\\\", "판례", "상징이식", "공동기획", "교차채점", "진행상태", "학습일지",
       ".docx", "git ", "WebSearch", "WebFetch"]
EXTRA = sys.argv[1].split(",") if sys.argv[1].startswith("+") else []
ids = sys.argv[1:] if not EXTRA else sys.argv[2:]
BAD += [e.lstrip("+") for e in EXTRA]
for aid in ids:
    calls = bad = 0
    for ln in open(f"{D}/agent-{aid}.jsonl", encoding="utf-8"):
        m = json.loads(ln).get("message") or {}
        content = m.get("content")
        if not isinstance(content, list): continue
        for c in content:
            if c.get("type") != "tool_use": continue
            calls += 1
            s = c.get("name", "") + " " + json.dumps(c.get("input", {}), ensure_ascii=False)
            hit = [b for b in BAD if b in s]
            if hit: bad += 1; print(f"  ! {aid} {hit}: {s[:220]}")
    print(f"{aid}: 도구 호출 {calls}회 · 의심 {bad}회")

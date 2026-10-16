#!/bin/bash
# 차단 감시 — 사이트 간격 상태(_호출제한/*.json)에 새 차단(blocked_at)이 생기면 기록하고 끝낸다(Claude가 깨어나 간격을 넓힘).
D="C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/기초분석-v2/_호출제한"; L="C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/결핍책/묶음/_차단감시.log"
snap() { grep -l '"blocked_at"' "$D"/*.json 2>/dev/null | while read f; do echo "$(basename "$f") $(grep -o '"blocked_at": *"[^"]*"' "$f")"; done | sort; }
base="$(snap)"; echo "$(date +%m-%d_%H:%M) 감시 시작 — 기존 차단 기록 $(echo "$base" | grep -c .)개" >> "$L"
for i in $(seq 1 600); do
  sleep 60; now="$(snap)"
  new="$(comm -13 <(echo "$base") <(echo "$now"))"
  if [ -n "$new" ]; then echo "$(date +%m-%d_%H:%M) 새 차단: $new" >> "$L"; echo "새 차단: $new"; exit 0; fi
done
echo "감시 10시간 끝"

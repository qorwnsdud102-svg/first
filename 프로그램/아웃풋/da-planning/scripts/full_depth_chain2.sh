#!/bin/bash
# 깊이 채우기 실행(10-16 밤 사장님 "시간 문제로 자료 수집을 덜 하는 경우는 없어야 해", "키워드당 80개", "82쿡·더쿠", "기존 결핍도").
# 1차 수집(_추가수집)이 아직 쓰는 사이트(펨코·루리웹·아카)와 겹치지 않게 줄을 둘로 나눈다.
#  A: 지금 바로 — 네이버(지식인·더쿠 찾기)·유튜브(받기·받아쓰기·댓글)·디시·블라인드·네이트판·엠팍·82쿡·더쿠
#  B: 1차 수집이 끝나면 — 펨코·루리웹·아카
#  둘 다 끝나면 모든 계열을 한 번 더 정리(두 실행이 나눠 모은 것을 합침).
S="C:/claude/LLM-WIKI/프로그램/아웃풋/da-planning/scripts"; B="C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/결핍책/묶음"; P="$B/_깊이채우기-1차.json"; L="$B/_깊이채우기-실행.log"
busy() { powershell -NoProfile -Command "@(Get-CimInstance Win32_Process -Filter \"Name='python.exe'\" | Where-Object { \$_.CommandLine -like '*$1*' }).Count" | tr -d '\r'; }
cd "$S"
echo "$(date +%m-%d_%H:%M) A 시작(네이버·유튜브·디시·블라인드·네이트판·엠팍·82쿡·더쿠)" >> "$L"
python -X utf8 deficit_book_run.py "$P" --no-meta --lines naver,ytdl,youtube,dcinside,blind,natepann,mlbpark,cook82,theqoo >> "$B/_깊이채우기-A.log" 2>&1 &
PA=$!
while [ "$(busy 20261016)" != "0" ]; do sleep 120; done
echo "$(date +%m-%d_%H:%M) 1차 수집 끝 → B 시작(펨코·루리웹·아카)" >> "$L"
python -X utf8 deficit_book_run.py "$P" --no-meta --lines fmkorea,ruliweb,arca >> "$B/_깊이채우기-B.log" 2>&1 &
PB=$!
wait $PA; echo "$(date +%m-%d_%H:%M) A 끝" >> "$L"
wait $PB; echo "$(date +%m-%d_%H:%M) B 끝" >> "$L"
python -X utf8 deficit_book_run.py "$P" --no-meta --finish-only >> "$L" 2>&1
echo "$(date +%m-%d_%H:%M) 깊이 채우기 전체 끝 — 모든 계열 다시 정리함" >> "$L"

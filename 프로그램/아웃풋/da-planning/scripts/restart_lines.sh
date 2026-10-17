#!/bin/bash
# 깊이 채우기 수집 4줄(A·C·D·N)을 고친 계획으로 다시 띄운다. 받은 질의는 기록으로 건너뛰므로 손실은 받던 질의 하나씩.
# 동시에 띄우면 새 결핍의 reset_old_posts가 같은 공유 폴더를 함께 지우다 죽는다(10-17) → 20초씩 시차.
S="C:/claude/LLM-WIKI/프로그램/아웃풋/da-planning/scripts"; B="C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/결핍책/묶음"; P="$B/_깊이채우기-1차.json"
cd "$S"
powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \"Name='python.exe'\" | Where-Object { \$_.CommandLine -match 'deficit_book_run' -and \$_.CommandLine -notmatch 'finish-only' } | ForEach-Object { Stop-Process -Id \$_.ProcessId -Force }"
echo "$(date +%m-%d_%H:%M) 4줄 다시(${1:-계획 고침})" >> "$B/_깊이채우기-실행.log"
nohup python -X utf8 deficit_book_run.py "$P" --no-meta --lines fmkorea,ruliweb >> "$B/_깊이채우기-C.log" 2>&1 &
sleep 20; nohup python -X utf8 deficit_book_run.py "$P" --no-meta --lines ytdl,youtube,dcinside,blind,natepann,mlbpark,cook82,theqoo >> "$B/_깊이채우기-A.log" 2>&1 &
sleep 20; nohup python -X utf8 deficit_book_run.py "$P" --no-meta --lines arca >> "$B/_깊이채우기-D.log" 2>&1 &
sleep 20; nohup python -X utf8 deficit_book_run.py "$P" --no-meta --lines naver >> "$B/_깊이채우기-N.log" 2>&1 &
sleep 30
powershell -NoProfile -Command "@(Get-CimInstance Win32_Process -Filter \"Name='python.exe'\" | Where-Object { \$_.CommandLine -match 'deficit_book_run' }).Count"

#!/bin/bash
# 깊이 채우기 연결 실행 4(10-17 08:35): 순서를 '새 6 → 기존 결핍 계열 → 새 27 계열'로 바꾼 계획으로 A·C·D를 다시 띄운다.
#  (사장님 10-17 아침 "기존 제품까지 결핍 깊이 분석은 아직 안 된 모양이네" — 받은 질의는 기록으로 건너뛰므로 다시 띄워도 손실은 진행 중이던 질의 하나뿐)
#  A·C·D가 모두 끝나면 모든 계열을 한 번 더 정리.
S="C:/claude/LLM-WIKI/프로그램/아웃풋/da-planning/scripts"; B="C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/결핍책/묶음"; P="$B/_깊이채우기-1차.json"; L="$B/_깊이채우기-실행.log"
busy() { powershell -NoProfile -Command "@(Get-CimInstance Win32_Process -Filter \"Name='python.exe'\" | Where-Object { \$_.CommandLine -like '*$1*' }).Count" | tr -d '\r'; }
cd "$S"
echo "$(date +%m-%d_%H:%M) 순서 바꿔 다시 시작(기존 결핍 먼저) — A·C·D" >> "$L"
python -X utf8 deficit_book_run.py "$P" --no-meta --lines naver,ytdl,youtube,dcinside,blind,natepann,mlbpark,cook82,theqoo >> "$B/_깊이채우기-A.log" 2>&1 &
python -X utf8 deficit_book_run.py "$P" --no-meta --lines fmkorea,ruliweb >> "$B/_깊이채우기-C.log" 2>&1 &
python -X utf8 deficit_book_run.py "$P" --no-meta --lines arca >> "$B/_깊이채우기-D.log" 2>&1 &
sleep 120
while [ "$(busy -lines)" != "0" ]; do sleep 300; done
echo "$(date +%m-%d_%H:%M) A·C·D 끝 → 모든 계열 정리" >> "$L"
python -X utf8 deficit_book_run.py "$P" --no-meta --finish-only >> "$L" 2>&1
echo "$(date +%m-%d_%H:%M) 깊이 채우기 전체 끝" >> "$L"

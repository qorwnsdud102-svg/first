#!/bin/bash
# 컴퓨터를 다시 켠 뒤 결핍 책 깊이 채우기를 이어서 돌린다(10-17 사장님 "잠깐 껐다 키고 다시 이어서 시작하자").
# 받은 질의는 기록(_수집.json·_한도.json·수집-중간.json)으로 건너뛰므로 다시 띄워도 손실은 끌 때 받던 질의 하나뿐이다.
#  A: 유튜브 받기·유튜브 댓글·디시·블라인드·네이트판·엠팍·82쿡·더쿠 / C: 펨코·루리웹 / D: 아카 / N: 네이버
#  넷이 다 끝나면 모든 계열을 한 번 더 정리. 차단 감시(96시간), 쿠팡 후기 분류(10분마다 14시간), 잠자기 막기(96시간)도 함께.
S="C:/claude/LLM-WIKI/프로그램/아웃풋/da-planning/scripts"; B="C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/결핍책/묶음"; P="$B/_깊이채우기-1차.json"; L="$B/_깊이채우기-실행.log"
RV="C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/후기-받은함"
busy() { powershell -NoProfile -Command "@(Get-CimInstance Win32_Process -Filter \"Name='python.exe'\" | Where-Object { \$_.CommandLine -like '*$1*' }).Count" | tr -d '\r'; }
cd "$S"
if [ "$(busy deficit_book_run)" != "0" ]; then echo "이미 수집기가 돌고 있음 — 다시 띄우지 않음"; exit 1; fi
echo "$(date +%m-%d_%H:%M) 컴퓨터 다시 켠 뒤 이어서 시작 — A·C·D·N" >> "$L"
python -X utf8 -c "
import ctypes,time
for _ in range(96*60):
    ctypes.windll.kernel32.SetThreadExecutionState(0x80000000|0x00000001); time.sleep(60)
" > /dev/null 2>&1 &
bash "$S/block_watch.sh" 5760 > /dev/null 2>&1 &
( for i in $(seq 1 84); do python -I -X utf8 review_sort.py 2>&1 | grep -v "^옮김 0 · 미분류 0" | grep -v "^$" | grep -v "^미분류: \[\]" | sed "s/^/$(date +%m-%d_%H:%M) /" >> "$RV/_수동받기-분류로그.txt"; sleep 600; done ) > /dev/null 2>&1 &
python -X utf8 deficit_book_run.py "$P" --no-meta --lines ytdl,youtube,dcinside,blind,natepann,mlbpark,cook82,theqoo >> "$B/_깊이채우기-A.log" 2>&1 &
python -X utf8 deficit_book_run.py "$P" --no-meta --lines fmkorea,ruliweb >> "$B/_깊이채우기-C.log" 2>&1 &
python -X utf8 deficit_book_run.py "$P" --no-meta --lines arca >> "$B/_깊이채우기-D.log" 2>&1 &
python -X utf8 deficit_book_run.py "$P" --no-meta --lines naver >> "$B/_깊이채우기-N.log" 2>&1 &
sleep 120
while [ "$(busy -lines)" != "0" ]; do sleep 300; done
echo "$(date +%m-%d_%H:%M) A·C·D·N 끝 → 모든 계열 정리" >> "$L"
python -X utf8 deficit_book_run.py "$P" --no-meta --finish-only >> "$L" 2>&1
echo "$(date +%m-%d_%H:%M) 깊이 채우기 전체 끝" >> "$L"

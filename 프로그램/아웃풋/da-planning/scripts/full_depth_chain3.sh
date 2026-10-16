#!/bin/bash
# 깊이 채우기 연결 실행 3(10-17 02:25): A(네이버·유튜브·디시·블라인드·네이트판·엠팍·82쿡·더쿠)는 이미 돌고 있음.
#  C: 펨코·루리웹 — 1차 수집이 이 두 사이트를 끝냈으므로 지금 바로
#  D: 아카 — 1차 수집(아카만 남음)이 끝나면
#  A·C·D가 모두 끝나면 모든 계열을 한 번 더 정리.
S="C:/claude/LLM-WIKI/프로그램/아웃풋/da-planning/scripts"; B="C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/결핍책/묶음"; P="$B/_깊이채우기-1차.json"; L="$B/_깊이채우기-실행.log"
busy() { powershell -NoProfile -Command "@(Get-CimInstance Win32_Process -Filter \"Name='python.exe'\" | Where-Object { \$_.CommandLine -like '*$1*' }).Count" | tr -d '\r'; }
cd "$S"
echo "$(date +%m-%d_%H:%M) C 시작(펨코·루리웹)" >> "$L"
python -X utf8 deficit_book_run.py "$P" --no-meta --lines fmkorea,ruliweb >> "$B/_깊이채우기-C.log" 2>&1 &
while [ "$(busy 20261016)" != "0" ]; do sleep 120; done
echo "$(date +%m-%d_%H:%M) 1차 수집 끝 → D 시작(아카)" >> "$L"
python -X utf8 deficit_book_run.py "$P" --no-meta --lines arca >> "$B/_깊이채우기-D.log" 2>&1 &
while [ "$(busy -lines)" != "0" ]; do sleep 300; done
echo "$(date +%m-%d_%H:%M) A·C·D 끝 → 모든 계열 정리" >> "$L"
python -X utf8 deficit_book_run.py "$P" --no-meta --finish-only >> "$L" 2>&1
echo "$(date +%m-%d_%H:%M) 깊이 채우기 전체 끝" >> "$L"

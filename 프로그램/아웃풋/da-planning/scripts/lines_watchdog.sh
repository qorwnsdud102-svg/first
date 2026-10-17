#!/bin/bash
# 수집 4줄 지킴이(10-18 01:40): A줄이 오류 없이 꺼진 일이 있어(10-18 00:55) 5분마다 4줄을 보고, 꺼진 줄만 다시 띄운다(다른 줄은 건드리지 않음).
# 인자 = 지킬 시간(분, 기본 2880 = 48시간). 기록: 결핍책/묶음/_깊이채우기-실행.log
S="C:/claude/LLM-WIKI/프로그램/아웃풋/da-planning/scripts"; B="C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/결핍책/묶음"; P="$B/_깊이채우기-1차.json"; L="$B/_깊이채우기-실행.log"
declare -A LOGS=( ["ytdl,youtube,dcinside,blind,natepann,mlbpark,cook82,theqoo"]="A" ["fmkorea,ruliweb"]="C" ["arca"]="D" ["naver"]="N" )
alive() { powershell -NoProfile -Command "@(Get-CimInstance Win32_Process -Filter \"Name='python.exe'\" | Where-Object { \$_.CommandLine -like '*--lines $1' -or \$_.CommandLine -like '*--lines $1 *' }).Count" | tr -d '\r'; }
cd "$S"
for i in $(seq 1 $(( ${1:-2880} / 5 ))); do
  sleep 300
  for lines in "${!LOGS[@]}"; do
    if [ "$(alive "$lines")" = "0" ]; then
      echo "$(date +%m-%d_%H:%M) 지킴이: ${LOGS[$lines]}줄($lines) 꺼짐 → 다시 띄움" >> "$L"
      nohup python -X utf8 deficit_book_run.py "$P" --no-meta --lines "$lines" >> "$B/_깊이채우기-${LOGS[$lines]}.log" 2>&1 &
      sleep 20
    fi
  done
done

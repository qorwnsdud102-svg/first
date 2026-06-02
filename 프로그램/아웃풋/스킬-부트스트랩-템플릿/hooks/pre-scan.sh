#!/bin/bash
# ============================================
# pre-scan.sh — STEP 1 전 환경 게이트 (⑦ 훅 wrapping)
# 사용: bash hooks/pre-scan.sh
# ============================================
set -e
export PYTHONIOENCODING=utf-8

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPTS="$ROOT/scripts"

echo "=== [pre-scan] 환경 점검 ==="

# 1. Python
if command -v python &> /dev/null; then
    echo "  OK: $(python --version 2>&1)"
else
    echo "  ERROR: Python 미설치 (3.10+)"; exit 1
fi

# 2. 필수 패키지 (TODO: 이 도구가 쓰는 것으로 교체)
MISSING=""
python -c "import requests" 2>/dev/null || MISSING="$MISSING requests"
if [ -n "$MISSING" ]; then
    echo "  미설치:$MISSING → 설치 중"; pip install $MISSING
else
    echo "  OK: 필수 패키지"
fi

# 3. API 키 (⑧ 가정 명시: 루트→scripts/ 탐색 + 예시값 잔존 검사)
API_FILE="$ROOT/api_keys.txt"
[ ! -f "$API_FILE" ] && API_FILE="$SCRIPTS/api_keys.txt"
if [ -f "$API_FILE" ]; then
    if grep -q "YOUR_" "$API_FILE"; then
        echo "  WARNING: api_keys.txt 에 예시값(YOUR_) 잔존 — 실제 키로 교체"
    else
        echo "  OK: api_keys.txt"
    fi
else
    echo "  ERROR: api_keys.txt 없음 — api_keys.txt.example 복사 후 키 입력"; exit 1
fi

echo "=== [pre-scan] 완료 ==="

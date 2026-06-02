#!/bin/bash
# ============================================
# run-pipeline.sh — 전체 일괄 오케스트레이션 (⑦ 훅 wrapping)
# 사용: bash hooks/run-pipeline.sh <주제> [인자...]
# 옵션(환경변수): SKIP_STEP2=1 등 토글
# ============================================
set -e
export PYTHONIOENCODING=utf-8

TITLE="${1:?ERROR: 주제를 입력하세요}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPTS="$ROOT/scripts"

echo "=== 파이프라인 시작: $TITLE ==="

# 사전 게이트
bash "$ROOT/hooks/pre-scan.sh"

# STEP 1
cd "$SCRIPTS"
python step1_example.py --title "$TITLE" --out "$SCRIPTS/step1_out.json"

# ⑤ 우아한 실패: 다음 STEP의 입력(파일 핸드오프)이 없으면 건너뛰고 계속
if [ ! -f "$SCRIPTS/step1_out.json" ]; then
    echo "WARNING: step1_out.json 미생성 — 이후 STEP 건너뜀"
else
    # TODO: STEP 2~N 추가
    # python step2_example.py --in "$SCRIPTS/step1_out.json"
    :
fi

# 정리
bash "$ROOT/hooks/post-analyze.sh" "$TITLE"
echo "=== 파이프라인 완료 ==="

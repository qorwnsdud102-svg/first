#!/bin/bash
# ============================================
# post-analyze.sh — 마지막 STEP 후 정리·안내 (⑦ 훅 wrapping)
# 사용: bash hooks/post-analyze.sh <주제>
# ============================================
export PYTHONIOENCODING=utf-8
TITLE="${1:-결과}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPTS="$ROOT/scripts"

echo "=== [post-analyze] 정리 ==="
echo "산출물:"
ls -1 "$SCRIPTS"/*.json 2>/dev/null | sed 's/^/  /' || echo "  (산출물 없음)"
# TODO: 산출물 경로 안내·후처리(이동/요약 등)
echo "=== [$TITLE] 완료 ==="

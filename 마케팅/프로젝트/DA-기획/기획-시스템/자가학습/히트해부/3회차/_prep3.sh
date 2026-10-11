#!/usr/bin/env bash
# 히트 해부 3회차 재료: 브랜드마다 이름 검색·주소 검색 소재 요약 + 장면 모아보기·음성 받아쓰기
set -u
ROOT="C:/claude/네이버 급상승 키워드 기반 경쟁사 발굴/scripts/히트해부3_메타광고소재"
OUT="C:/Users/qorwn/AppData/Local/Temp/claude/C--claude-LLM-WIKI/203d417f-c813-4e44-a156-0dccfaa67872/scratchpad/hit-ads3"
cd "C:/claude/LLM-WIKI/프로그램/아웃풋/da-planning/scripts" || exit 1
export PYTHONIOENCODING=utf-8
while IFS=: read -r brand kw1 kw2; do
  [ -z "$brand" ] && continue
  if [ -f "$ROOT/$kw1/_ads.json" ]; then
    python hit_ads_digest.py "$ROOT" "$kw1" --out "$OUT/$brand-이름.md" --top 25
    python hit_ad_frames.py "$ROOT" "$kw1" "$OUT/frames/$brand-이름" --groups 6 --per 2 --asr
  fi
  if [ -f "$ROOT/$kw2/_ads.json" ]; then
    skip=()
    [ -f "$ROOT/$kw1/_ads.json" ] && skip=(--skip "$ROOT/$kw1/_ads.json")
    python hit_ads_digest.py "$ROOT" "$kw2" --out "$OUT/$brand-주소.md" --top 25 "${skip[@]}"
    python hit_ad_frames.py "$ROOT" "$kw2" "$OUT/frames/$brand-주소" --groups 6 --per 2 --asr "${skip[@]}"
  fi
  echo "== $brand 끝 $(date +%H:%M)"
done <<'EOF'
딱내스탈:딱내스탈:mo0.kr
노일리:노일리:noily
트마팩:트마팩:eiom
인버브:인버브:inverb
셀라듀:셀라듀:celladew
포뮬라인:포뮬라인:formula-in
이클라퓨어:이클라퓨어:eclapure
나비정:나비정:duorexin
아시모토:아시모토:ashimoto
레드포힐:레드포힐:redforheal
토르홉:토르홉:torhop
EOF
echo "모두 끝 $(date +%H:%M)"

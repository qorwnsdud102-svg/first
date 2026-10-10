---
type: 출처
source_file: 프로그램/raw/ccfm-edu/2026-10-01_CCFM-EDU_ccfm-review-messages/
published: 2026-10-01
fetched: 2026-10-10
author: CCFM EDU (리뷰 스킬 v1.0)
org: CCFM EDU
domain: 프로그램
status: stable
---

# 리뷰에서 광고 메시지 찾기 스킬 (ccfm-review-messages) 배포본

- [[CCFM-AX-TEAM|CCFM]] EDU 두 번째 배포 스킬. **리뷰 엑셀 → 근거표 → 주제·반대 사례 → 메시지·첫 문장·첫 장면 후보 ≤3 → 쓰지 않을 주장 → 먼저 시험할 1개.** 요청 시 리뷰 요약·통계.
- 핵심 규율: 구매 이유는 리뷰에 명시된 것만 / 빈도는 "읽은 N건 중" / 없는 열은 "열 없음" / 고객 원문·AI 해석·새 광고 문장 분리 / 광고 초안을 실제 후기처럼 내지 않음 / 근거 약하면 후보를 줄임.
- 패키지: `SKILL.md` + `references/analysis.md`(분석) + `references/summary.md`(요약·통계 — 요청할 때만 읽음) + `프롬프트대안.txt`(설치 없이 쓰는 단일 프롬프트) + `사용법.md/.html`. 원본 위치: `C:/Users/qorwn/OneDrive/업무폴더/자료/AI 학습자료/기타/ccfm-review-messages/`.
- 배포자 검증: Claude Code에서 가상 리뷰 엑셀 4종 요청 확인. Claude 웹·실제 판매처 리뷰 파일은 미검증.

## 영향을 준 wiki 페이지

- entities (1신): [[ccfm-review-messages]]
- entities (1갱신): [[CCFM-AX-TEAM]] (§CCFM EDU 배포물)

## raw 파일

- `프로그램/raw/ccfm-edu/2026-10-01_CCFM-EDU_ccfm-review-messages/` — 스킬 폴더 통째(무가공).

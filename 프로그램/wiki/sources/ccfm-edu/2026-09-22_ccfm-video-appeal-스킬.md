---
type: 출처
source_file: 프로그램/raw/ccfm-edu/2026-09-22_CCFM-EDU_ccfm-video-appeal/
published: 2026-09-22
fetched: 2026-09-24
author: CCFM EDU (영상 스킬 v1.0)
org: CCFM EDU
domain: 프로그램
status: stable
---

# 경쟁사 광고 소재 분석 스킬 (ccfm-video-appeal) 배포본

- [[CCFM-AX-TEAM|CCFM]] EDU **첫 배포 스킬**(배포 공지: "🎉 CCFM EDU 첫 스킬 배포!"). 경쟁사 영상 광고가 **어떤 주장·화면·순서로 설득하는지** 해부하고 우리 상품 적용안까지 뽑는다.
- 구조: Claude/Codex가 Gemini용 프롬프트를 내줌 → 사람이 Gemini에 **영상 파일 + 프롬프트** → Gemini 답을 원래 대화에 붙여넣기 → Claude/Codex가 검토·적용안. 영상을 읽는 모델과 해석하는 모델을 **사람 손으로 이어 붙이는** 설계.
- 패키지: `SKILL.md`(6KB, 계획) · `references/gemini-prompt.txt`(상세 프롬프트·분석 원칙 8조·출력 A~F) · `사용법.md/.html`(설치 안내). [[파이프라인-스킬-패키지]]의 progressive disclosure를 최소 규모로 구현한 표본.
- 배포자 명시 검증 범위(2026-09-22): Codex 첫 안내·결과 검토 흐름만 확인. **Claude 웹·Claude Code 실행은 미검증**, 자동 브라우저 테스트에서 Gemini 거절 응답도 나옴.

## 영향을 준 wiki 페이지

- entities (1신): [[ccfm-video-appeal]]
- entities (1갱신): [[CCFM-AX-TEAM]] (§CCFM EDU 배포물)

## raw 파일

- `프로그램/raw/ccfm-edu/2026-09-22_CCFM-EDU_ccfm-video-appeal/` — 스킬 폴더 통째(무가공) + `배포공지.txt`(카톡 공지 원문).
- 원본 위치: `C:/Users/qorwn/OneDrive/바탕 화면/ccfm-video-appeal/` (ZIP 푼 폴더)

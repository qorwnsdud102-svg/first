---
type: source
aliases: [naver-biding journal 2026-05-22 알짜]
status: stable
sources: [프로그램/raw/2026-05-22_naver-biding_journal-알짜.md]
updated: 2026-05-22
---

# 2026-05-22 naver-biding journal 알짜

## 요지

naver-biding 프로젝트 (입찰가 자동 조정 프로그램) 의 `journal.md` (~660줄) 에서 2026-05-22 기준 알짜만 정제한 source 메타. 다음 네이버 마케팅 자동화 도구에 재사용 가능한 platform truth + 엔지니어링 메타 패턴만 추출.

## raw 파일

- `프로그램/raw/2026-05-22_naver-biding_journal-알짜.md` (정제 스냅샷, 불변)
- 원본 참고: `C:\naver-biding\journal.md` (수정 가능, 향후 entries 추가됨)

## 영향을 준 wiki 페이지

- [[네이버-검색광고-API]] — 공식 API 트랩 9종 (PUT 사일런트 / userLock / statusReason / HMAC / X-Customer / 합성 ID / MIN 70원 / Estimate 분기 / creds 헬퍼)
- [[광고주센터-비공식-API]] — endpoint / 쿠키 인증 / rate / preview 가변 / transient retry / region dropdown 불가
- [[네이버-검색결과-크롤링]] — 적용 범위 / 호출량 / stuck 6h 재점검 / force 우회 / 비로그인 타게팅 / nid bvsd / DOM 추출
- [[다경로-데이터-모순-디버깅]] — 표면↔내부 / 카드↔상세 / 단방향 sync
- [[네이버-광고-자동화-운영-노트]] — force 우회 / 가시화 UX / 운영 PC 분리 / subprocess GUI / FastAPI 한계

## 제외 (project-specific, raw 스냅샷에 포함 X)

- decider 내부 로직 (락인 락 풀기 fix / OWNED_HINTS 다계정 컬럼 추가 디테일 / stuck UI 3-layer / 도곡동 region 시드 / MIN 70원 4중 safety / MIN 도달 락인 전환 v3)
- naver-biding 후속 작업 (파워컨텐츠 slot 검증 구현 등)

향후 보강은 원본 `C:\naver-biding\journal.md` 직접 참조.

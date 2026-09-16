---
type: 작품
aliases: [snskit API, SNS키트 API, snskit.co.kr api/v2, SMM 패널 API]
status: stub
sources: [https://snskit.co.kr/api (공개 문서), 2026-09-16 읽기 전용 호출 실측 (balance·services)]
updated: 2026-09-16
---

# snskit-API

## 한 줄 정의

SNS 좋아요·댓글·팔로워를 파는 SMM 패널 snskit(SNS키트, 계정 `backstore1`)의 주문 API. Perfect Panel 계열 표준 규약이라 다른 패널도 거의 같다.

## 규약 (실측 2026-09-16)

- `POST https://snskit.co.kr/api/v2`, 본문 `key`(계정설정 → API 키 "새로 생성")·`action`. 응답 JSON. 키는 **본문에만** 넣는다(URL 금지).
- `action=balance` → `{"balance":"84392.0000000","currency":"KRW"}`.
- `action=services` → 242개. **`rate`는 1,000개당 원화** (`"10000.00"` = 1개 10원). `min`·`max`·`type`(Default / Custom Comments).
- `action=add`: `service, link, quantity`, 커스텀 댓글은 `comments`(`\n` 구분, 줄 수 = quantity). 응답 `{"order": 23501}`. **네트워크 오류에 재시도 금지** — 이미 접수됐을 수 있어 이중 주문.
- `action=status&orders=1,2,…`(100개까지) → `status`(Pending / In progress / Completed / Partial / Canceled), `charge`, `remains`, `start_count`.
- FAQ 규칙: 같은 링크 중복 주문은 앞 주문 완료 후에만(진행 중 추가하면 새 주문 취소될 수 있음). 시작 시각 조정 불가.

## 대표가 쓰는 서비스

| 용도 | service | 단가 | min~max |
|---|---|---|---|
| IG 좋아요 [일반/한국인](느림) | 406 | 10원 | 1~300 |
| IG 커스텀 댓글 [프리미엄/한국인] | 231 | 280원 | 3~10,000 |
| FB 커스텀 댓글 [한국인] | 494 | 220원 | 3~100 |
| IG 랜덤 댓글 [일반/한국인] | 471 | 220원 | 3~10,000 |
| FB 게시물 좋아요 [한국인] | 431 | 35원 | 5~10,000 |

## 다른 엔티티와의 관계

- [[snskit-booster]] — 이 API를 쓰는 유일한 프로그램. 접수 불명·선기록 패턴은 [[유료-주문-이중결제-방지-패턴]].

---
type: 도구
aliases: [네이버 커머스API, 커머스API, 스마트스토어 API, commerce API, apicenter.commerce.naver.com, 스마트스토어 주문 정산 API]
status: growing
sources: [C:\claude\성과측정 대시보드\docs\superpowers\specs\2026-09-10-smartstore-integration-design.md, C:\claude\성과측정 대시보드\app\commerce_api.py, C:\claude\성과측정 대시보드\app\store_collector.py]
updated: 2026-09-15
---

# 네이버 커머스API

## 한 줄 정의

스마트스토어 주문·정산·상품을 프로그램으로 읽는 공식 API(`apicenter.commerce.naver.com`). 검색광고 API(HMAC)와는 별개 플랫폼 — OAuth client_credentials + **bcrypt 서명 시크릿**, **호출 IP 화이트리스트**, 정산은 **스토어 단위**로만 온다.

## 핵심 주장 / 속성 (실측 2026-09-10~15)

- **발급**: 커머스API센터에서 스토어의 통합매니저 계정으로 애플리케이션을 만들고 API 그룹 `판매자정보`·`상품주문`·`정산`을 넣는다. 스토어(판매자 계정)마다 키 한 줄(`스토어이름=앱ID,시크릿`).
- **IP 화이트리스트**: 애플리케이션에 PC 공인 IP를 등록해야 호출된다. 공인 IP가 바뀌면 막힌다 → 다른 PC로 옮기면 그 PC의 IP를 추가 등록. 자동 수집은 한 PC에서만.
- **인증**: `POST /external/v1/oauth2/token`, `client_secret_sign = base64(bcrypt(client_id_timestamp, client_secret))`, `type=SELF`. 토큰 3시간(만료 5분 전 재발급). 토큰 오류 응답 본문에 서명이 되돌아오므로 **오류 본문을 로그에 남기지 않는다**.
- **변경 상품주문**: `GET …/product-orders/last-changed-statuses?lastChangedFrom=&lastChangedType=` — 조회 창 **24시간**, 날짜는 ISO-8601 **밀리초 3자리 + `+09:00`** 이 없으면 400(4000). `lastChangedFrom`이 inclusive라 커서를 안 움직이면 `more:true` **무한루프** → +1ms 전진 + 페이지 상한. 상세는 `POST …/product-orders/query` 300개씩(`productOrder` + `order`).
- **정산**: `GET …/pay-settle/settle/daily?startDate=&endDate=` — **32일 이상 span이면 400** → 31일 청크. 응답에 계좌번호·예금주·은행 등 민감 필드 → 저장 전 제거. 배치는 여러 날에 걸친다(settleBasisStart~End). 정산은 뒤늦게 확정·변경돼 매번 40일을 다시 받는다.
- **정산예정금(expectedSettlementAmount)이 전 주문에 있다** → 수수료율 없이 주문 이익 계산이 가능하다. 주의: 값이 없을 때 0으로 저장하면 NULL 대체 로직이 죽는다(검수 실측).
- **상태**: PAYED·DELIVERING·DELIVERED·PURCHASE_DECIDED·EXCHANGED… / 취소 `CANCELED`·`CANCELED_BY_NOPAYMENT` / 반품 `RETURNED`. 결제일(`paymentDate`)과 변경일(`lastChangedDate`)이 다르므로 매출은 결제일에, 취소·반품은 **변경일에 음수**로.
- **추가구성 주문**은 상품명이 '블랙' 같은 옵션명만 남는다 → 같은 productId의 부모 상품명으로 브랜드 판정(브랜드가 인식된 쪽·긴 이름 우선).
- **스마트스토어 통계(NT 파라미터)는 API가 없다**(공식 답변) → 엑셀 다운로드. → [[NT-파라미터-매출-귀속]]
- 커서: 스토어별 마지막 lastChangedDate − 10분 겹침. 처음은 90일 백필(하루 창씩). 한 스토어 실패가 다른 스토어를 막지 않는다.

## 다른 엔티티와의 관계

- [[네이버-검색광고-API]] — 다른 플랫폼·다른 인증(HMAC). [[NAVER-API-HUB]]와도 무관.
- [[주문별-이익-모델]] — 정산예정금·상태·변경일이 이 모델의 입력.
- [[네이버-SA-성과측정-툴]] — 구현 무대. [[수집-파이프라인-안전장치]] — 40일 정산 재수집.

## 내 생각 / 미해결 질문

- 429 `Retry-After`·정산 페이지네이션은 외부 계약 테스트가 없어 스키마 변경을 못 잡는다.
- 커서 겹침 10분: 네이버 인덱싱 지연이 10분을 넘으면 영구 누락(추정).
- 쿠팡·11번가·카페24 API를 붙일 때 이 페이지의 구조(발급·인증·창 제한·정산 단위·민감 필드)를 체크리스트로 쓴다.

## 출처

- specs `2026-09-10-smartstore-integration-design.md` §1 확인된 사실(2026-09-10 실측).
- `app/commerce_api.py`(docstring·상수), `app/store_collector.py`, README "파일과 폴더".
- 커밋 b8a4a03(무한루프·31일 청크·토큰 본문), 1bdac2a(추가구성), 0e62e03.

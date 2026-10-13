# 상징짝 드릴4 — 담당 B 초안 검토

**통과 후보 0/15개. 목표 15개 미달이다.** 사전 안 신규 짝 10개와 사전 밖 확장 2개를 검토했지만 모두 기각 목록으로 뺐다. 기각 수를 후보 수로 합산하지 않았다. 질병·기능불편 전체에 기회가 없다는 뜻은 아니다.

- 기준: 드릴4·3 지시, 드릴 하는 법, 최신 정본 ③④⑤, 상징원 사전, 1~3회차 최종·미선발 카드와 새 `_중복기준.json`, 방법정답지 1등급.
- 공통 전제: **원인 문장·제품 구현·top3는 AI 가설**이며 타겟조사 결과가 아니다. 공식 자료는 원본 치료·제품 존재를 확인하는 데만 썼다. 새 제품의 효능·제조 가능성은 확인하지 않았다.
- 점수 예측은 JSON의 `predictions` 배열로 분리했다. 이 문서에는 점수를 싣지 않았다.
- **정합성 검증:** 같은 기전의 제품이 세상에 있다는 사실은 보편 기각 조건이 아니다. B01·B05·B06·B10·B12는 각 안이 원형 재현 또는 제형 변경에 머물고 별도의 상징 구현 가치를 제시하지 못했다는 개별 판단이다. 임상동등성·효능·제조 가능성 미확인은 조사 상태로만 남겼으며 기획 탈락 조건으로 쓰지 않았다.

## 남기지 않은 이유

| ID | 검토한 짝·한 줄 구상 | 핵심 기각 이유 |
|---|---|---|
| B01 | 역류성식도염 × 오메프라졸: 오메프라졸 — 위산 억제 성분을 물 없이 녹여 먹는 필름. | 기존 먹는 약의 제형 변경에 머문다. |
| B02 | 역류성식도염 × 위저부주름술: 위저부주름술 — 위 입구를 받친다는 복부 지지띠. | 겉을 조이는 체감이 위 입구를 감싸는 작용으로 이어지지 않는다. |
| B03 | 전립선비대증 × 유로리프트: 유로리프트 — 소변길을 벌린다는 골반 텐션 벨트. | 몸 밖 당김으로 소변길이 열린다는 연결이 억지다. |
| B04 | 전립선비대증 × 홀렙: 홀렙 — 전립선 레이저의 열을 옮긴 온열 좌판. | 온열만 남고 조직 제거라는 핵심이 빠진다. |
| B05 | 난청으로 말소리가 잘 안 들림 × 보청기: 보청기 — 상대 목소리를 가까이 모아 듣는 목걸이형 증폭기. | 원격 마이크·목걸이 수신기의 기성 원형을 그대로 제안한 수준이다. |
| B06 | 반복되는 치아 우식·충치 × 치과 불소도포: 치과 불소도포 — 치아에 밀착해 불소를 머금는 필름. | 2회차 불소도포 겔을 필름으로 바꾼 변형에 가깝다. |
| B07 | 귀지 막힘으로 귀가 먹먹함 × 치과 스케일링: 귀 스케일링 — 불린 귀지를 물로 회수하는 세정기. | 스케일링의 작용보다 제거 도구만 빌린다. |
| B08 | 반복 구내염 × 리쥬란: 구내염 리쥬란 — 헐은 입안에 머무르는 DNA 겔. | AI 추정 top3에 구내염이 없어 이번 드릴의 명시 조건과 충돌한다. |
| B09 | 반복되는 차멀미·뱃멀미 × 노이즈캔슬링: 멀미 캔슬링 — 이동 중 거슬리는 소리를 지우는 이어버드. | 소음을 없애는 작용이 멀미의 핵심과 이어지지 않는다. |
| B10 | 비타민B12 결핍성 빈혈 × 비타민B12주사: 비타민B12주사 — B12 원료를 입에서 녹여 먹는 필름. | 기존 B12 보충제를 필름으로 바꾼 수준이다. |

**B08의 규칙 충돌:** 리쥬란 → 구내염은 ④-21의 상위 상징 타분야 ‘작동결’ 예외로 허용될 수 있다. 이번 제외는 AI 추정 top3에 결핍이 없으면 쓰지 말라는 **드릴4의 명시 지시 때문**이다. 예외 자체를 부정하지 않으며, ④-13의 부정 연상이나 임상동등성 미증명을 별도 기각 근거로 확정하지 않는다.

B07·B09도 드릴4 top3 조건에 걸리지만, 이 두 안에는 작용·구현의 연결이 약하다는 별도 판단이 남는다. 이는 임상적 동등성을 입증하지 못했다는 이유와 구분한다.

**B06의 중복 주의:** 충치와 기존 시린이는 같은 질환이라고 단정하지 않았다. 다만 2회차 BASE-06의 불소도포 겔을 필름으로 바꾼 정도라 새 카드로 살리지 않았다. B10도 만성피로의 이름을 바꿔 세지 않도록 B12 결핍성 빈혈로 원본 치료 범위를 한정했지만, 기존 보충제의 제형 변경이라는 문제가 남았다.

## 사전 밖 확장 — 통과 후보 아님

| ID | 검토한 짝 | 기각 이유 |
|---|---|---|
| B11 | 반복되는 요로결석 × 체외충격파쇄석술 | 표면 진동으로 돌이 부서진다는 당위가 없다. |
| B12 | 반복되는 차멀미·뱃멀미 × 스코폴라민·멀미약 | 익숙한 멀미약의 복용 형태만 바꾼다. |

B11의 쇄석술은 사전의 근골격 체외충격파와 같은 치료로 합치지 않았다. B12의 스코폴라민은 사전 밖이다. 둘 다 별도 확장 기록일 뿐이다.

## 중복·기존 제외를 숨기지 않음

- 1~3회차의 코골이·비염·이명·관절통·구강건조·시린이·치질·위염·과민성대장·안구건조·노안·갱년기 홍조·질건조·생리통·이갈이·편도결석 등은 재출제하지 않았다. 수면무호흡으로 이름만 바꾸거나 비염의 원인을 집먼지진드기로 좁히는 방식도 제외했다.
- 1등급 정답의 잇몸·입냄새·양치 오염, 불면, 목 불편, 손가락마디 및 일반 근육관절 통증도 피했다. 오십견·테니스엘보는 기존 통증군의 단순 재조준이 될 위험 때문에 보수적으로 제외했다.
- 뉴티락은 정답지의 ‘유산균 효과 없음’만 읽지 않고 원 해부의 토끼똥·먹는 관장 맥락까지 대조해 변비 재출제를 막았다.
- 사전의 `drill_exclude`는 최신 출제 이력을 전부 반영하지 않는다. 불소도포가 false여도 2회차 카드에 이미 있으므로 카드 원문·중복기준을 우선했다. 개비스콘·쏘팔메토·신경차단술은 사전 자체의 제외 항목이다.

## 확인 자료와 미확인

| 출처 | 확인한 원본 사실·이 사실이 결정한 것 |
|---|---|
| [S01 NHS: Omeprazole](https://www.nhs.uk/medicines/omeprazole/) | 위산 생성을 줄이는 약이며 경구 정제·캡슐·액제가 이미 존재한다. 짧은 인용: “reduces the amount of acid in your stomach”. |
| [S02 NIDDK: GERD treatment](https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/treatment) | 위저부주름술은 위 윗부분으로 식도 아래쪽을 감싸는 수술이다. |
| [S03 UroLift 제조사: How it works](https://www.urolift.com/patients/treatment-options/how-urolift-works) | 요도를 통해 접근해 임플란트로 전립선 조직을 옆으로 당겨 고정한다. 짧은 인용: “lift and hold the enlarged prostate tissue out of the way”. |
| [S04 CUH: HoLEP](https://www.cuh.nhs.uk/patient-information/holmium-laser-enucleation-of-the-prostate-holep/) | 레이저를 이용해 비대 전립선 조직을 제거하는 수술이다. |
| [S05 NIDCD: Hearing aids](https://www.nidcd.nih.gov/health/hearing-aids) | 마이크·증폭기·스피커로 소리를 증폭하며 청력 손실을 보조한다. 짧은 인용: “a microphone, amplifier, and speaker”. |
| [S06 Neosonic: NW10 Pro 공식 판매 페이지](https://neosonic.com/products/nw10) | 원격 마이크로 대화·TV 소리를 전달하는 목걸이형 청취 증폭기가 이미 판매된다. 짧은 인용: “neckband hearing amplifier”. |
| [S07 NIDCR: Fluoride](https://www.nidcr.nih.gov/health-info/fluoride) | 불소는 치아 미네랄 소실을 보완하며 치과 겔·바니시와 일상 치약·가글에 사용된다. 짧은 인용: “replenishing lost minerals”. |
| [S08 NHS: Earwax build-up](https://www.nhs.uk/conditions/earwax-build-up/) | 귀지 연화 점이제와 의료기관의 세척·미세흡인 방법을 소개한다. |
| [S09 NHS: Motion sickness](https://www.nhs.uk/conditions/motion-sickness/) | 멀미 설명은 눈과 내이 신호의 불일치이며 약·패치 등 기존 대안을 안내한다. 짧은 인용: “The inner ear sends different signals to your brain”. |
| [S10 NHS: B12 deficiency treatment](https://www.nhs.uk/conditions/vitamin-b12-or-folate-deficiency-anaemia/treatment/) | B12 결핍성 빈혈에 주사 또는 정제가 사용되며 원인에 따라 치료가 달라진다. |
| [S11 NIDDK: Kidney stone treatment](https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones/treatment) | 충격파쇄석술은 결석을 작은 조각으로 부수어 요로로 배출되게 하는 치료다. 짧은 인용: “blast the kidney stone into small pieces”. |
| [S12 NHS: Hyoscine hydrobromide](https://www.nhs.uk/medicines/hyoscine-hydrobromide/) | 멀미에 쓰는 약이며 씹거나 빨거나 삼키는 정제가 이미 있다. 짧은 인용: “tablets that can be chewed, sucked or swallowed whole”. |
| [S13 NHS Wales: Travel health](https://111.wales.nhs.uk/travelhealth/traveltips/) | hyoscine과 scopolamine의 명칭 연결 및 멀미 용도를 확인했다. 짧은 인용: “Hyoscine, also known as scopolamine”. |
| [S14 NHS: About Gaviscon](https://www.nhs.uk/medicines/gaviscon/about-gaviscon/) | 위 내용물 위 보호층을 형성하며 씹는 정제·액제·소포장 제형이 이미 존재한다. |

원본 자료에서 찾지 못한 내용을 타겟 통념이나 새 제품의 효과로 바꾸지 않았다. B08의 새 구강 적용은 의료 효능 확인까지 진행하지 않았으며 그 미확인은 제외 근거가 아니다. 시장 전체 포화율·국내 인지도·현시점 가격·실제 타겟 top3는 미확인이다. B05는 제조사 자료로 기성 원형을 확인하고 **이 안이 그 원형에 머문다는 점**을 판단했다. 제품 존재만으로 시장 포화나 모든 같은 기전의 기획 탈락을 주장하지 않았다.

## 본체에 넘기는 검색어

**필수 통합조회: 없음(통과 후보 없음).** 재검토할 때만 `보청기 / 목걸이 보청기 / 난청 목걸이 증폭기`, `불소도포 / 충치 불소도포 / 불소 필름`을 비교할 수 있다. 각 기각 카드의 선택 검색어는 JSON `source_queries`에 남겼다. 검색량이 높아도 이번에 확인한 구현 결함·기성품 중복이 자동으로 해소되지는 않는다.

네이버 API·자동완성·Meta 추가 수집은 하지 않았다. 작성 파일은 `_후보-B.json`·`_후보-B.md` 두 개다.


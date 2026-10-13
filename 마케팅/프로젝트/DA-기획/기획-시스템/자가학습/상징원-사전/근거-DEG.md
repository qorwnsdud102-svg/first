# D·E·G 상징원 사전 — 확인 근거

상태: 담당 자료조사 완료. 정본점검 이후 본체 최종 통합용이며, 통합·선발 완료본은 아니다.

사용자 지정 17개 결핍 × 3개 = 51개 상징만 수록했다. 4번째 후보 확대는 하지 않았다. 가격·기획·제품 설계 없이 작동 방식과 상징의 약점을 정리했다.

## 자료의 신뢰 범위

- `belief` 17개는 모두 **AI 가설**이다. 당사자 발화 자료가 없어 `belief_source`는 빈 배열이며, 의학적 원인을 대신 확정하지 않는다.
- `memory_scene` 51개는 모두 **AI 가설**이다. 공식 설명에서 상상한 장면이며 체험담·커뮤니티 발언·효과 후기의 인용이 아니다.
- 병원·정부·제조사 공식 자료를 사용했다. 제조사·의료기관의 홍보 설명은 독립 임상 검증과 구분했다. 학회 자료는 전문기관 설명으로 표시했다.
- 검색량은 결핍·상징 모두 `monthly_search_volume: null`, 자동완성은 `autocomplete: null`이다. 본체에서 중앙조회를 마쳤다는 지시를 받았으며, 결과 수치를 전달받지 않아 임의로 옮기지 않았다. 본 담당의 추가 네이버 조회는 없다.
- `keyword`는 정확한 명칭과 필요한 통용명만 배열로 둔다. `Colpermin`은 한국어 통용 표기를 확인하지 못해 영문 공식명만 남겼다.
- `source_file`은 실제 재사용한 로컬 규칙·예시 출처다. 새 공식 자료만으로 작성한 후보는 빈 배열이다.
- `drill_exclude: false`는 새 짝 확정이나 추천 판정이 아니다. 이번에 확인한 정본·방법정답지·1회차에서 미발견이라는 뜻이며 최종 통합 재대조가 남아 있다.

## 결핍별 근거와 남은 약점

| ID · 결핍 | 3개 상징 | 확인 범위·핵심 한계 |
|---|---|---|
| D01 오십견 | 스테로이드주사 · 수압팽창술 · 관절내시경 | [NHS 주사](https://www.nhs.uk/conditions/frozen-shoulder/), [PAH 관절낭 팽창](https://www.pah.nhs.uk/resources/shoulder-hydrodilatation/), [ROH 관절낭 유리술](https://roh.nhs.uk/services-information/shoulder-and-elbow/shoulder-mua). 염증 조절·팽창·절개를 서로 다른 방식으로 구분. |
| D02 무릎관절염 | 무릎연골주사 · 인공관절수술 · 스테로이드주사 | [AAOS 관절염](https://www.orthoinfo.org/diseases--conditions/arthritis-of-the-knee/), [AAOS 히알루론산주사](https://www.orthoinfo.org/treatment/viscosupplementation-treatment-for-knee-arthritis?webid=24DCE756). 연골주사는 연골 재생이 아니며 AAOS는 통증·기능 개선 근거의 한계를 명시. |
| D03 테니스엘보 | 체외충격파 · 스테로이드주사 · PRP주사 | [NHS 충격파](https://www.homerton.nhs.uk/shockwave-therapy), [NHS 엘보 안내](https://www.lancsteachinghospitals.nhs.uk/media/.leaflets/65d4e0481a85e2.72135308.pdf), [AAOS PRP](https://www.orthoinfo.org/treatment/platelet-rich-plasma-prp?webid=24DCE756). NHS는 스테로이드의 재발·악화와 PRP 장기 근거 부족을 설명하며, AAOS의 PRP 설명은 더 긍정적이다. 효과 확정 금지. |
| D04 손목터널증후군 | 손목보조기 · 스테로이드주사 · 손목터널수술 | [NHS 치료](https://www.nhs.uk/conditions/carpal-tunnel-syndrome/), [ASPH 손 치료](https://www.asph.nhs.uk/hand-therapy-carpal-tunnel). 위치 유지·부종 조절·인대 절개로 구분. 보조기는 같은 층의 흔한 제품으로 보일 약점. |
| D05 허리디스크 | 신경차단술 · 미세현미경디스크수술 · 도수치료 | [UHB 설명](https://www.uhb.nhs.uk/media/d3glj5k2/pi-spinal-surgery-lumbar-decompressive-surgery.pdf), [UCLH 수술](https://www.uclh.nhs.uk/patients-and-visitors/patient-information-pages/single-level-lumbar-microdiscectomy), [NHS 수기요법](https://www.nhs.uk/tests-and-treatments/herbal-medicines-and-complementary-therapies/). 수기요법은 일반 설명이며 한국 도수치료의 디스크별 효능을 입증한 자료가 아니다. |
| D06 거북목 | 도수치료 · 경추견인치료 · 넥필 | [서울아산병원](https://mind.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=31866), [Cleveland Clinic 견인](https://my.clevelandclinic.org/health/treatments/23093-cervical-traction), [메디니스 제조사](https://mediness.kr/). 영구 자세 교정효과 미확인. 넥필은 제조사 설명·기존 정답 재사용이며 독립 임상 자료가 아니다. |
| D07 하지정맥류 | 하지정맥류레이저 · 베나실 · 혈관경화요법 | [NHS 치료 비교](https://www.england.nhs.uk/wp-content/uploads/2023/11/Decision-support-tool-making-a-decision-about-treatment-for-varicose-veins.pdf), [Medtronic 베나실](https://www.medtronic.com/en-us/healthcare-professionals/products/cardiovascular/superficial-vein/venaseal-closure-system.html). 세 방식 모두 문제 정맥을 닫는 방향이며, 혈관을 뚫거나 씻는다는 해석과 반대. |
| E01 불면증 | 졸피뎀 · 멜라토닌 · 불면증인지행동치료 | [NHS 졸피뎀](https://www.nhs.uk/medicines/zolpidem/about-zolpidem/), [NHS 멜라토닌](https://www.nhs.uk/medicines/melatonin/common-questions-about-melatonin/), [NHS 불면증](https://www.nhs.uk/conditions/insomnia/). 억제성 신호·수면 주기·생각과 행동의 조정을 구분. 멜라토닌 부족은 모든 불면증 원인이 아니다. |
| E02 코골이 | 양압기 · 코골이구강장치 · 코골이수술 | [NHS 코골이](https://www.nhs.uk/symptoms/snoring/), [NHLBI 기기](https://www.nhlbi.nih.gov/health/sleep-apnea/treatment), [NHS 수술 검토](https://www.centraleast.icb.nhs.uk/documents/snoring-surgery-for-adults-in-the-absence-of-sleep-apnoea/). 양압기를 단순 코골이 전부에 적용하지 않으며 수술 효과·재발 한계 표시. |
| E03 수면무호흡증 | 양압기 · 수면무호흡구강장치 · 설하신경자극술 | [NHLBI 치료](https://www.nhlbi.nih.gov/health/sleep-apnea/treatment). 주로 폐쇄성 수면무호흡에 대한 후보로 범위를 제한. 설하신경자극은 침습성·대상 제한·대명사성 미확인이 큰 약점. |
| E04 만성피로 | 마늘주사 · 비타민B12주사 · 공진단 | [의료기관 마늘주사 설명](https://fullfaceclinic.co.kr/skinantiaging/fluid/garlic.php), [NHS B12](https://www.nhs.uk/medicines/hydroxocobalamin/about-hydroxocobalamin/), [익수제약 설명](https://www.iksu.co.kr/bbs/board.php?bo_table=m04_01&page=4&wr_id=133), [공진단 FAQ](https://www.kongjindan.com/bbs/faq.php?fm_id=2). 마늘주사는 검색 노출문 확인 후 원문 재열기 실패; 홍보 설명 수준으로 제한. B12는 결핍 교정이며 모든 피로 치료가 아니다. 공진단 단일 기전 미확인. |
| G01 변비 | 푸룬주스 · 둘코락스 · 듀파락 | [Sunsweet](https://www.sunsweet.com/articles/why-prune-juice-works), [NHS 비사코딜](https://www.nhs.uk/medicines/bisacodyl/about-bisacodyl/), [NHS 락툴로오스](https://www.nhs.uk/medicines/lactulose/), [제조사 첨부문서 재게시본](https://common.health.kr/shared/images/insert_pdf/IN_2013010200015_00.pdf). 식품 설명·자극성 완하제·삼투성 완하제를 구분. 재게시 설명서는 최신 제형 전체 확인 자료가 아니다. |
| G02 과민성대장증후군 | 부스코판 · 로페라미드 · Colpermin | [NHS 부스코판](https://www.nhs.uk/medicines/buscopan-hyoscine-butylbromide/about-buscopan/), [NHS 로페라미드](https://www.nhs.uk/medicines/loperamide/about-loperamide/), [NHS 페퍼민트오일/Colpermin](https://www.nhs.uk/medicines/peppermint-oil/about-peppermint-oil/). 경련·설사 등 증상별 대응이며 전 유형 치료가 아니다. Colpermin 국내 대명사성 미확인. |
| G03 역류성식도염 | 개비스콘 · 오메프라졸 · 위저부주름술 | [NHS 개비스콘](https://www.nhs.uk/medicines/gaviscon/about-gaviscon/), [NHS 오메프라졸](https://www.nhs.uk/medicines/omeprazole/), [NIDDK 치료](https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/treatment). 보호층·산 분비 억제·구조 강화로 구분. |
| G04 위염 | 알마겔 · 넥시움 · 헬리코박터제균치료 | [유한양행](https://yuhan.co.kr/Mobile/Products/List/?YPRD_IDX=1789&cid=177&mode=view), [NHS 에스오메프라졸](https://www.nhs.uk/medicines/esomeprazole/common-questions-about-esomeprazole/), [NIDDK 위염](https://www.niddk.nih.gov/health-information/digestive-diseases/gastritis-gastropathy/treatment). 넥시움을 위염 전반의 대표 치료로 볼 근거는 부족. 제균은 감염이 확인된 원인에 한정. |
| G05 치질 | 치센 · 고무밴드결찰술 · 치핵절제술 | [동국제약](https://www.dkpharm.co.kr/m/product/view.php?idx=291), [NIDDK 치핵](https://www.niddk.nih.gov/health-information/digestive-diseases/hemorrhoids/treatment). 치센 표시 효능과 세부 작동기전을 구분. 결찰은 의료진 시술이며 정상 조직을 묶는 응용은 위험. |
| G06 비만 | 위고비 · 마운자로 · 위소매절제술 | [Wegovy 제조사](https://www.wegovy.com/obesity/starting-wegovy/faq.html), [Lilly Mounjaro](https://mounjaro.lilly.com/hcp/how-mounjaro-works), [FDA Zepbound 동일 성분 설명서](https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/217806s000lbl.pdf), [NIDDK 수술](https://www.niddk.nih.gov/health-information/weight-management/bariatric-surgery/types). 미국 브랜드별 용도를 구분했고 한국 적응증을 추정하지 않았다. 지방을 직접 녹인다는 뜻은 아니다. |

## 기존 자료 재사용·드릴 제외

재사용: [단계별 규칙](<C:/claude/LLM-WIKI/마케팅/wiki/syntheses/DA 기획 단계별 규칙.md>), [방법정답지](<C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/기획-시스템/자가학습/히트해부/방법정답지.md>), [1회차 카드](<C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/기획-시스템/자가학습/상징짝-드릴/1회차/카드.json>).

현재 제외 표시 11개다. 정확한 기존 짝과 인접 결핍·동일 계열의 보수적 제외를 이유에서 구별했다.

| 결핍 · 상징 | 이유 |
|---|---|
| 무릎관절염 · 무릎연골주사 | 정본 ⑤-04 무릎·히알루론산주사, 1회차 무릎연골·히알루론산주사와 동일·인접 결핍의 기존 짝. |
| 허리디스크 · 신경차단술 | 정본 ④-53에 척추 특정 지점에 약물을 전달하는 신경차단술 예시가 이미 있어 제외; 정본 문구에 허리디스크가 직접 병기된 것은 아님. |
| 거북목 · 넥필 | 방법정답지의 거북목·목디스크 대응 넥필이 이미 알려진 짝. |
| 불면증 · 멜라토닌 | 정본 ③-15·③-16에 불면·수면호르몬/멜라토닌 예시가 있어 기존 짝으로 제외. |
| 코골이 · 양압기 | 1회차 카드 D1-01 코골이·양압기가 기존 짝. |
| 수면무호흡증 · 양압기 | 1회차의 코골이·양압기와 인접 결핍의 사실상 같은 상징 사용이므로 보수적으로 제외; 정확히 같은 need였다는 뜻은 아님. |
| 만성피로 · 마늘주사 | 1회차 카드 D1-09 만성피로·마늘주사가 기존 짝. |
| 변비 · 푸룬주스 | 정본 ④-64에 변비·푸룬주스가 대명사 예시로 이미 제시됨. |
| 역류성식도염 · 개비스콘 | 정본 ④-05 개비스콘·뚜껑 표현이 이미 나온 역류 관련 짝. |
| 비만 · 위고비 | 정본 ④-50·⑤-01의 비만/살빼기·위고비/GLP-1 예시와 방법정답지 GLP-1 계열 기존 답에 해당. |
| 비만 · 마운자로 | 정본의 비만·GLP-1 예시와 동일 계열 차용이라 보수적으로 제외; 마운자로라는 이름이 정본에 직접 있었다는 뜻은 아님. |

## ④-21에 따른 교차 검토용 메모

아래는 재료를 읽는 기준이며 새 결핍-상징 짝이나 기획안이 아니다.

- 팽창시켜 늘림·압력으로 열어 둠·위치를 유지함은 서로 다른 방향이다. 관절낭 팽창, 양압기, 보조기를 같은 작동으로 취급하지 않는다.
- 하지정맥류의 열·접착·경화는 모두 문제 혈관을 닫는 방향이다. 막힌 관을 뚫는다는 차용은 반대이므로 쓰지 않는다.
- 깊은 부위에 약물을 직접 전달하는 주사와 바깥에서 느끼는 자극은 같지 않다. 정본 ④-21·④-60의 감각 차용 가능성과 실제 전달·효능 입증은 별개다.
- 개비스콘의 보호층, PPI의 산 분비 감소, 위저부주름술의 구조 강화는 같은 속쓰림 장면을 가져도 서로 다른 방식이다.
- 절개·절제·결찰·신경 자극은 체감만 닮게 만들었다고 같은 치료 효과가 성립하지 않는다. 위험한 자가 구현으로 옮기지 않는다.
- 도수치료는 정본 ④-17의 사람 손기술 문제, 손목보조기·넥필·푸룬주스는 ④-64의 같은 층 제품 문제를 남겼다.

의학 근거와 상징의 소비자 인지도는 다른 축이다. 강한 의학적 설명만으로 유명한 상징이라고 확정하지 않았으며, 검색량·자동완성 값은 본체가 병합한다.

## 중앙조회 병합용 정확 명칭 배열

결핍 주키워드:

```json
[
  "오십견",
  "무릎관절염",
  "테니스엘보",
  "손목터널증후군",
  "허리디스크",
  "거북목",
  "하지정맥류",
  "불면증",
  "코골이",
  "수면무호흡증",
  "만성피로",
  "변비",
  "과민성대장증후군",
  "역류성식도염",
  "위염",
  "치질",
  "비만"
]
```

상징·동의어 키워드(중복 제거, 신규 조회 지시 아님):

```json
[
  "스테로이드주사",
  "수압팽창술",
  "관절낭팽창술",
  "관절내시경",
  "무릎연골주사",
  "히알루론산주사",
  "인공관절수술",
  "무릎인공관절",
  "체외충격파",
  "PRP주사",
  "자가혈주사",
  "손목보조기",
  "손목스플린트",
  "손목터널수술",
  "신경차단술",
  "미세현미경디스크수술",
  "미세현미경디스크제거술",
  "도수치료",
  "경추견인치료",
  "목견인기",
  "넥필",
  "하지정맥류레이저",
  "베나실",
  "혈관경화요법",
  "하지정맥류경화요법",
  "졸피뎀",
  "멜라토닌",
  "불면증인지행동치료",
  "CBT-I",
  "양압기",
  "코골이구강장치",
  "하악전진장치",
  "코골이수술",
  "구개수구개인두성형술",
  "수면무호흡구강장치",
  "설하신경자극술",
  "마늘주사",
  "비타민B12주사",
  "공진단",
  "푸룬주스",
  "둘코락스",
  "듀파락",
  "듀파락이지",
  "부스코판",
  "로페라미드",
  "Colpermin",
  "개비스콘",
  "오메프라졸",
  "위저부주름술",
  "위저부성형술",
  "알마겔",
  "넥시움",
  "에스오메프라졸",
  "헬리코박터제균치료",
  "헬리코박터제균",
  "치센",
  "고무밴드결찰술",
  "치핵결찰술",
  "치핵절제술",
  "치질수술",
  "위고비",
  "마운자로",
  "티르제파타이드",
  "위소매절제술"
]
```

실제 웹 확인을 바탕으로 한 조사 초안이며, 정본점검 이후 본체의 통합 대조가 남아 있다.

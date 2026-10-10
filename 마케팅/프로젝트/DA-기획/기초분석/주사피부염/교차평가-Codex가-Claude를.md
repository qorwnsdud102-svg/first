# 주사피부염 사실 수집 1회차 — Codex의 Claude 교차 평가

평가일: 2026-10-10. **부분 비교: 의학 출처 대조만 평가했고, 유튜브 비중 비교는 제외했다.**

**판정: 출처 내용을 모으는 데는 강점이 있지만, 그 내용을 빈도·다수 환자 주장으로 요약하는 과정에 근거가 부족한 부분이 있다.** 이번 결과만으로 사실 수집 담당을 확정하지 않는다.

평가 대상은 `결핍조사-Claude.md`이며, 비교 기준은 설계서 §4-5의 네 항목이다. Claude가 Codex를 평가한 파일과 합산표 본문은 읽지 않았다. 원래 두 조사 파일·규칙·합산표는 수정하지 않았고 커밋하지 않았다. 임상 판단에 사용하는 추가 자료는 **위키에 없음 — 외부 공식 임상 근거**로 구분한다.

## 1. 출처 재확인 — 10개 주장

원인·관리·증상 분류·수치를 골고루 포함하되, DA 기획의 우선순위를 바꾸는 빈도 판단을 포함했다. 무작위 표본이 아니므로 이 점수를 Claude 문서 전체의 정확도로 일반화하지 않는다.

**결과: 맞음 6개 / 출처에서 확인 안 됨 3개 / 열 수 없음 1개 / 틀림 0개.**

선택한 10개 중 확인 성공은 **6/10**이다. 열 수 없었던 1개를 제외하면 **6/9**다. ‘확인 안 됨’은 반대 사실이 입증됐다는 뜻이 아니다. ‘맞음’은 인용한 페이지에 해당 서술이 있다는 뜻이며, 최신 임상 근거나 한국 환자의 대표 통계가 확정됐다는 뜻도 아니다.

| 사실 | 출처 | 판정 | 메모 |
|---|---|---|---|
| 01. 정확한 원인은 밝혀지지 않았다. | [대한피부과학회 — 원인](https://www.derma.or.kr/new/general/disease.php?uid=592&mod=document), [서울대학교병원 — 원인](https://www.snuh.org/health/nMedInfo/nView.do?category=DIS&medid=AA000228), [세브란스 — 원인](https://sev.severance.healthcare/sev/doctor/board_disease.do?article.offset=0&articleLimit=12&articleNo=121591&empNo=eXVoczIwMjBAKUApNMECi1oWFPtOVa%2FNDBFJPZcR7Zi6P0m6ky8yDSPrwLY%3D&mode=view) | 맞음 | 세 페이지 모두 불확실성을 명시한다. |
| 02. 모낭충 증가·제거 후 호전이 원인 후보의 근거다. | [학회](https://www.derma.or.kr/new/general/disease.php?uid=592&mod=document) | 맞음 | 확정 원인은 아니다. |
| 03. 가족력 30~40%라는 수치가 있고, 유전이 확정 원인이라는 증거는 없다고 한다. | [서울대학교병원 — 원인](https://www.snuh.org/health/nMedInfo/nView.do?category=DIS&medid=AA000228) | 맞음 | 숫자와 단서 모두 있다. 원연구·환자 표본 수는 페이지에 제시되지 않는다. |
| 04. 헬리코박터 설명의 확실성이 두 출처에서 다르다. | [학회](https://www.derma.or.kr/new/general/disease.php?uid=592&mod=document), [서울대병원](https://www.snuh.org/health/nMedInfo/nView.do?category=DIS&medid=AA000228) | 맞음 | 관련·호전 사례와 미검증 가설이라는 차이다. |
| 05. 스테로이드 회피 원칙에 특정 중증형의 단기 예외가 있다. | [학회](https://www.derma.or.kr/new/general/disease.php?uid=592&mod=document) | 맞음 | 2012년 안내의 확인이다. 자가 사용 권고가 아니다. |
| 06. 물리·화학 자극으로 인한 피부 장벽 손상을 악화요인으로 든다. | [세브란스 — 원인](https://sev.severance.healthcare/sev/doctor/board_disease.do?article.offset=0&articleLimit=12&articleNo=121591&empNo=eXVoczIwMjBAKUApNMECi1oWFPtOVa%2FNDBFJPZcR7Zi6P0m6ky8yDSPrwLY%3D&mode=view) | 맞음 | 본문에서 확인했다. 장벽 손상이 모든 환자의 최초 발병 원인이라는 뜻은 아니다. |
| 07. 화끈·따가움은 ‘흔함’이다. | [학회](https://www.derma.or.kr/new/general/disease.php?uid=592&mod=document), [서울대병원](https://www.snuh.org/health/nMedInfo/nView.do?category=DIS&medid=AA000228) | 출처에서 확인 안 됨 | 동반 가능성만 설명한다. 빈도 등급은 없다. |
| 08. 두피까지 번지는 것은 ‘드묾’이다. | [학회](https://www.derma.or.kr/new/general/disease.php?uid=592&mod=document), [서울대병원](https://www.snuh.org/health/nMedInfo/nView.do?category=DIS&medid=AA000228) | 출처에서 확인 안 됨 | 진행 후 발생 가능성이 빈도를 뜻하지 않는다. |
| 09. DA 요약에서 눈 증상은 ‘소수’라고 정리한다. | [서울대학교병원 — 경과/합병증](https://www.snuh.org/health/nMedInfo/nView.do?category=DIS&medid=AA000228) | 출처에서 확인 안 됨 | 제시 범위는 3~58%다. 본인 표에서도 메인/드묾 판단이 어렵다고 했으므로 마지막 요약과 불일치한다. |
| 10. 나무위키는 주사와 여드름의 차이로 면포 부재를 든다. | [나무위키 — 주사(질병)](https://namu.wiki/w/%EC%A3%BC%EC%82%AC(%EC%A7%88%EB%B3%91)) | 열 수 없음 | 웹 열람 오류에 이어 브라우저 사이트 보안 정책으로 차단됐다. Claude 요약만으로 원문 확인을 대신하지 않았다. 의학적 참·거짓은 별도 문제다. |

### 출처 확인 기록

- 학회와 서울대병원은 Claude의 주소로 본문을 직접 열었다.
- 세브란스의 짧은 주소는 도구 오류가 났다. 검색에서 발견한 **같은 공식 도메인·같은 게시글 번호 121591·같은 제목·작성일**의 주소를 직접 열어 본문을 확인했다. 위 표에는 확인에 성공한 주소를 썼다.
- 나무위키는 차단 뒤 재시도·다른 경로로의 우회를 하지 않았다. 따라서 수정일, 문서 부재, 리다이렉트 등의 Claude 관찰도 이번 평가에서는 재확인하지 못했다.

## 2. 각 조사에만 있는 중요 사실

**두 최종 조사 파일에 명시된 주장만 비교했다.** 링크의 원문에 있지만 작성자가 파일에 쓰지 않은 내용은 그 작성자의 발견으로 세지 않았다. 같은 쟁점의 세부 표현은 묶었고, 검색량은 이번 비교에서 제외했다. 아래 개수는 판단에 영향을 주는 사실 묶음 수이며 종합 점수가 아니다.

### Claude에만 명시된, 원문에서 확인한 사실 — 10개

| 사실 묶음 | Claude 위치 | 중요성·출처 |
|---|---|---|
| 모낭충 관여 | §3 | 원인 후보를 구체화했다. [학회](https://www.derma.or.kr/new/general/disease.php?uid=592&mod=document) |
| 헬리코박터 관련 주장의 확실성 차이 | §3 | 원인 후보를 확정 원인으로 쓰는 오류를 줄인다. 위 04 대조에서 확인했다. |
| 스테로이드 주의·예외 | §3 | 절대화 오류를 막는다. [학회](https://www.derma.or.kr/new/general/disease.php?uid=592&mod=document), [서울대병원](https://www.snuh.org/health/nMedInfo/nView.do?category=DIS&medid=AA000228) |
| 자극에 따른 장벽 손상이 악화요인이라는 명시 | §3 | 제품 자극과 악화 설명에 직접 연결된다. [세브란스 — 원인](https://sev.severance.healthcare/sev/doctor/board_disease.do?article.offset=0&articleLimit=12&articleNo=121591&empNo=eXVoczIwMjBAKUApNMECi1oWFPtOVa%2FNDBFJPZcR7Zi6P0m6ky8yDSPrwLY%3D&mode=view) |
| 30~50대·여성 호발, 중증은 남성 | §4 환자층 | 타겟 가설의 재료다. 대표 통계는 아니다. [학회](https://www.derma.or.kr/new/general/disease.php?uid=592&mod=document) |
| 지속성 비오목형성 부종을 합병증으로 구별 | §4 | 보통의 붓기와 장기적인 합병증을 구분한다. [서울대학교병원 — 경과/합병증](https://www.snuh.org/health/nMedInfo/nView.do?category=DIS&medid=AA000228) |
| 혈관 조절 이상 가설 | §3 | 원인 후보를 구체화했다. [학회](https://www.derma.or.kr/new/general/disease.php?uid=592&mod=document) |
| 만성 일광 손상·진피 변화 가설 | §3 | 일시적 악화와 구별했다. [학회](https://www.derma.or.kr/new/general/disease.php?uid=592&mod=document) |
| 화끈거림 등이 수 시간~수 일 지속 | §4 | 지속시간과 빈도는 별개다. [학회](https://www.derma.or.kr/new/general/disease.php?uid=592&mod=document) |
| 눈 증상 선행에 따른 진단 지연·시력 위험 | §4 | 안구 평가 필요성으로 묶었다. [서울대병원](https://www.snuh.org/health/nMedInfo/nView.do?category=DIS&medid=AA000228), [학회](https://www.derma.or.kr/new/general/disease.php?uid=592&mod=document) |

가족력 30~40%와 안구 병변 3~58%는 **출처에 적힌 숫자를 찾은 성과**지만 원연구 표본이 없어 위 중요 사실 개수에는 추가하지 않았다. 면포 부재·멘톨·담배·가벼운 운동 권고는 나무위키를 재확인하지 못해 개수에서 제외했다. 단순 관련 인자 목록을 잘게 나눠 수를 늘리지 않았다.

### Codex에만 명시된, 원문에서 확인한 사실 — 6개

| 사실 묶음 | Codex 위치 | 중요성·출처 |
|---|---|---|
| 표현형별 평가와 진단·주요·부수 특징 구분은 환자 빈도 순위가 아니며, 전원에게 같은 단계 진행을 가정하지 않음 | F10·§5 | 증상 우선순위·진행 설명을 잘못 만드는 것을 막는다. 한 묶음으로 셌다. [ROSCO 2019 — 서론·Table 1](https://onlinelibrary.wiley.com/doi/full/10.1111/bjd.18420) |
| 구진·농포가 많은 환자에게 나타난다는 학회 안내 | F06 | Claude의 근거 없는 ‘중간’ 분류를 보완한다. [AAD — Acne-like breakouts](https://www.aad.org/public/diseases/rosacea/what-is/symptoms) |
| 피부 가려움은 흔한 증상이 아니라는 안내 | F08 | 건조·가려움 목록을 모두 메인 증상으로 취급하지 않게 한다. [AAD — Itch](https://www.aad.org/public/diseases/rosacea/what-is/symptoms) |
| 매일 SPF 30 이상 자외선차단 권고 | F05 | 일반적인 차단 권고보다 관리 기준이 구체적이다. [NIAMS — Protect your skin from the sun](https://www.niams.nih.gov/health-topics/rosacea/diagnosis-treatment-and-steps-to-take) |
| 개인 악화요인을 기록해 찾도록 권고 | §2 | 회피할 요인을 일괄 단정하지 않고 개인차를 확인한다. [NIAMS — Learn what your triggers are](https://www.niams.nih.gov/health-topics/rosacea/diagnosis-treatment-and-steps-to-take) |
| 코 피부 비후라는 특정 증상이 남성에서 더 잘 나타남 | F07 | Claude의 ‘심한 증상은 주로 남성’보다 증상이 특정되어 있다. [AAD — Thickening skin](https://www.aad.org/public/diseases/rosacea/what-is/symptoms) |

이 목록은 이 평가에서 원문을 다시 대조했다. ROSCO는 전문가 합의이며 환자 빈도 연구가 아니다. 더 많은 항목을 찾았다는 이유만으로 어느 쪽의 정확도가 높다고 결론 내리지 않는다.

## 3. 비중·수치의 표본과 출처

| 점검 대상 | 판정 | 근거 |
|---|---|---|
| 영상 비중 | 비교 제외 | 양쪽 모두 전체 자막 0편. Claude는 후보 34편·검색어·실패 원인을 공개했고, 최종 문서에서 비율을 비워 두었다. 분석 실패를 0%로 확정하지 않은 점은 적절하다. |
| 후보 목록 재현 | 부분 충족 | 이번에 제공된 `유튜브-결핍카드.txt`는 34편이라고 쓰지만 ‘영상:’ 아래 ID·주소 목록이 없다. 후보 개수와 실제 영상 목록을 독립 대조할 수 없다. 유튜브 요청으로 확인하지 않았다. |
| 가족력 30~40%, 안구 병변 3~58% | **출처 표기 2/2, 원연구 표본 공개 0/2** | 모두 서울대병원 문장에서 확인했다. 그러나 환자 수·지역·선정 방식·측정 시점·원연구 인용은 제시되지 않아 대표 빈도로 활용하기 어렵다. 숫자를 꾸며냈다는 뜻은 아니다. |
| 원자료의 0% 표시 | 주의 필요 | 실패 기록 파일에는 자막 0편인데도 0% 행이 남아 있다. 뒤의 ‘근거로 쓰지 말 것’ 설명과 최종 문서에서 정정했지만, 파일만 재사용하면 0%로 오인될 수 있다. 원자료는 수정하지 않았다. |
| 네이버 검색량 | 평가 제외 | 이번 요청의 제외 범위를 따랐다. 검색 수요를 환자 이용률로 대입하지 않았다는 구분은 유지한다. |

**이 기준의 점수는 ‘출처 2/2·표본 0/2, 영상 N/A’로 기록한다.** 유튜브 실패를 모델의 증상 집계 정확도 점수로 바꾸지 않는다.

## 4. 메인·드문 증상 구분

**진단용 점검 3개 중 1개 충족.** 이 3개 항목은 이번 평가의 설명용 점검이며 새 정본 규칙이나 합산 가중치가 아니다.

| 점검 | 판정 | 이유 |
|---|---|---|
| 대표 증상·동반 증상·합병증을 구분했나 | 충족 | 구분 표를 만들었고, 코 비후·큰 결절을 소수 환자의 변화로 다뤘다. |
| 각 빈도 등급에 직접 근거가 있나 | 미충족 | 화끈·따가움의 ‘흔함’, 구진·농포의 ‘중간’, 두피의 ‘드묾’은 해당 출처의 빈도 표현에서 바로 나오지 않는다. |
| 표의 단서가 마지막 요약에서도 유지되나 | 미충족 | 눈 증상은 빈도 판정이 어렵다고 쓴 뒤 마지막 DA 요약에서 ‘소수’라고 결론 냈다. |

가장 먼저 고칠 부분은 **눈 증상을 소수라고 단정한 마지막 문장**이다. ‘실핏줄은 거의 모든 환자’라는 서술은 서울대병원 본문에는 있어 인용 자체의 오류는 아니다. 그러나 이를 환자 대부분의 고정 조합으로 쓰기 전에는 최신 표현형 기준과 대조해야 한다. ROSCO는 지속홍반·일시홍조·확장혈관·구진농포 등을 별도 특징으로 평가한다([ROSCO 2019 — Table 1](https://onlinelibrary.wiley.com/doi/full/10.1111/bjd.18420)).

또한 학회나 병원에 어떤 증상이 대표적이라고 적혀 있다는 사실과, 그 증상이 고객에게 가장 괴로운 결핍이라는 판단은 다르다. 양쪽 모두 이번에 소비자 체감 우선순위는 확인하지 못했다.

## 5. 환경 제안과 평가 범위

**다음 회차의 순차 자막 수집에는 동의한다.** 미리 정한 동일한 영상 후보 목록을 사용하고, 한쪽이 끝난 뒤 다른 쪽이 수집하며, 요청 제한이 확인되면 중단하는 방식이 비교에 낫다. 성공한 자료만 뒤늦게 골라 표본을 바꾸면 안 된다.

다만 **동시 요청이 이번 차단의 원인이라는 인과관계는 확인되지 않았다.** HTTP 429와 IpBlocked는 관찰된 실패이고, 공용 IP 동시 사용은 가능한 설명이다. 순서를 나누면 반드시 해결된다는 보장은 없다. 차단 확인을 위한 반복 요청도 하지 않는다. 이번 평가에서는 유튜브에 새 요청을 보내지 않았다.

1회차 가중치 0.5는 Claude가 제안한 기본값으로만 취급한다. 여기서 합산표나 기준을 바꾸거나 승인하지 않는다. 서로 다른 검색어·표본 수·수집 환경의 차이는 이후 회차를 설계할 때 함께 맞춰야 한다.

## 기준별 결과

| 기준 | 점수·결과 | 해석 |
|---|---|---|
| ① 출처 재확인 | **6/10 확인**: 맞음 6, 미확인 3, 열 수 없음 1 | 직접 열린 9개 주장만 보면 6/9. 문서 전체 정확도 추정치가 아니다. |
| ② 각자만 찾은 중요 사실 | **Claude 10개 / Codex 6개** | 원문에서 확인한 사실 묶음. 수량이 정확도나 담당자 승패를 뜻하지 않는다. |
| ③ 수치의 표본·출처 | **임상 수치 출처 2/2, 원연구 표본 0/2; 영상 비교 제외** | 후보 목록과 실패 원자료의 표시도 보완 필요. |
| ④ 메인·드문 구분 | **점검 1/3 충족** | 구분은 했지만 일부 빈도 등급과 마지막 요약이 근거를 넘는다. |

## 총평 — 3줄

Claude는 국내 의학 출처를 넓게 모으고 모낭충·스테로이드·장벽 손상 등 Codex가 명시하지 않은 사실을 추가했다.
다만 원문의 ‘가능·동반’을 ‘흔함·드묾’으로 바꾸거나 눈 증상을 소수라고 요약한 부분은 고쳐야 한다.
양쪽 모두 영상 비중 조사는 미완료이므로 이번 부분 비교만으로 사실 수집 담당을 확정하지 않는다.

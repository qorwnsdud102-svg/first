# B·H·I 상징원 사전 — 근거와 확인 범위

- 조사일: 2026-10-13.
- 상태: **사전조사본. 정본점검 후 본체 최종통합 대기.** 최종 선정·기획·가격 검토는 하지 않았다.
- 범위: B 4개·H 5개·I 6개, 총 15개 결핍·47개 상징원. 기본 3개, 노안·질건조증만 원본 작동 자료를 확보한 교차 후보 1개를 추가했다.
- 데이터: [후보-BHI.json](C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/기획-시스템/자가학습/상징원-사전/후보-BHI.json).
- 모든 `search_volume`은 `null`. 검색량·자동완성·타겟 인지도는 미측정이며 본체 중앙조회 대상이다. 의학 자료가 있다는 이유로 유명하다고 판정하지 않았다.
- `belief_source: []`는 당사자 발화 근거가 없다는 뜻이다. 15개 믿는 원인 모두 AI 가설이다. 공식 병의 설명을 소비자가 실제로 믿는 원인이라고 바꾸지 않았다.
- 47개 `memory_scene` 모두 **AI 가설**이다. 시술·사용 설명에서 장면을 추정했으며 환자 후기·커뮤니티 발화로 취급하지 않는다.
- `source_url`·`source_file`은 배열이다. 공개 웹 자료는 작동·적용 범위 확인용, 로컬 파일은 상징 판단·기존 짝 재사용 여부 확인용이다. 로컬 기획 가설은 의학 근거가 아니다.
- 외국 약·제품 자료는 해당 국가의 확인된 제형에 한정한다. 국내 허가·유통·성분 동일성은 따로 확인하지 않았다. 웹 문서를 브라우징으로 읽었고 원문 파일은 다운로드하지 않았다.

## 먼저 구분할 것

1. **새치는 관리다.** 염색·헤나·그레이 블렌딩은 색을 입히거나 대비를 줄인다. 멜라닌 복구나 새치 치료 근거로 쓰지 않는다. 강한 상위 상징 3개를 확보한 결핍이 아니므로 약한 후보의 경고를 유지한다.
2. **노안은 교정이다.** 돋보기·누진렌즈·인공수정체는 초점을 보정한다. 눈의 노화를 되돌리는 치료와 구분한다. 팬옵틱스 확인 자료는 백내장 환자용이며 단순 노안 전원으로 넓히지 않는다.
3. **질 레이저는 효능을 확정하지 않는다.** 제조사는 에너지 전달 방식을 설명하지만, NICE는 폐경 관련 비뇨생식기 증상에 무작위시험 밖 질 레이저를 제공하지 말도록 한다. [제조사 장비 설명](https://www.cynosure.com/product/monalisa-touch/), [NICE 권고](https://www.nice.org.uk/guidance/ng23/chapter/Recommendations).
4. **기획 정답과 임상 정답을 분리한다.** 이노시톨 40:1은 방법정답지의 기획 사례다. 국제 지침은 특정 유형·용량·조합을 권고할 근거가 부족하다고 한다. [2023 국제 PCOS 지침](https://pmc.ncbi.nlm.nih.gov/articles/PMC10505534/).
5. **쏘팔메토는 인지도 후보와 효능을 분리한다.** NCCIH는 단독 사용의 BPH 증상 이득이 거의 없거나 없다고 정리한다. 전립선을 줄이는 확정 작동으로 적지 않았다. [NCCIH](https://www.nccih.nih.gov/health/saw-palmetto?next=%2F).
6. **요실금은 유형을 나눈다.** 받쳐 주는 슬링과 과도한 방광 수축을 줄이는 보톡스는 같은 문제·같은 방향의 치료가 아니다. [NHS 시술 설명](https://www.nhs.uk/conditions/urinary-incontinence/surgery/).
7. **교차 연결은 느낌의 가설이다.** 오토포커스–노안, 물광주사–질건조의 임상효과 승계를 주장하지 않는다. 노이즈캔슬링–이명은 이미 작용 대상 불일치로 감점된 짝이다.
8. **제조사 자료의 한계를 표시했다.** 훼라민큐는 확인한 홍보문에서 성분·표방 증상을 확인했다. 그 문구의 호르몬제 동등효능·무부작용 주장은 채택하지 않았다. [동국제약 원문](https://www.dkpharm.co.kr/boards/view.php?btype=news&idx=802&stype=news).
9. **PCOS 명칭은 사용자 지정대로 유지했다.** 확인한 NHS 기존 PCOS 주소는 PMOS 페이지로 연결됐다. 해당 문서의 명칭 변화가 국내 검색어를 뜻하지 않으므로 `다낭성난소증후군`을 조회키워드로 유지했다. [확인한 NHS 페이지](https://www.nhs.uk/conditions/polyendocrine-metabolic-ovarian-syndrome-pmos/).

## 상징별 공식 근거

아래 문장은 원본의 작동·적용 범위다. 한국 소비자의 인식·체험·선호를 입증하는 문장이 아니다. 전문학회 AAD·ACOG 및 국제 지침 원문도 사용했으며 출처 주소로 구분했다.

### DIC-B01 · 탈모

- **로게인폼** — 미녹시딜을 두피에 도포해 일부 유형의 탈모에서 모발 성장을 돕고 진행을 줄인다. [근거1](https://www.aad.org/public/diseases/hair-loss/treatment/diagnosis-treat?uid=d0e42d4d3a5cs16) · [근거2](https://www.rogaine.com/products/mens-rogaine-minoxidil-unscented-foam)
- **프로페시아** — 피나스테리드가 5알파환원효소를 억제해 DHT 생성을 줄이는 남성형 탈모 치료약이다. [근거1](https://www.organon.com/product/usa/pi_circulars/p/propecia/propecia_pi.pdf)
- **모발이식** — 건강한 모낭을 채취해 머리숱이 부족한 부위에 옮겨 심는다. [근거1](https://www.aad.org/public/diseases/hair-loss/treatment/transplant)

### DIC-B02 · 새치

- **새치 염색** — 색소를 모발에 입혀 흰 머리를 가리는 관리다. 원래 색소 생성의 회복은 아니다. [근거1](https://www.wella.com/professional/en-GB/blog/hair-colour/how-to-get-rid-of-grey-hair)
- **헤나** — 헤나 색소로 모발을 착색하는 염색 관리다. 새치 발생 원인을 치료하지 않는다. [근거1](https://hfpappexternal.fda.gov/Scripts/Fdcc/index.cfm?id=Henna&set=ColorAdditives)
- **그레이 블렌딩** — 하이라이트·로라이트로 흰 머리와 주변 색의 대비를 낮추는 미용 관리다. [근거1](https://blog.wella.com/gb/how-to-cover-gray-hair-with-highlights)

### DIC-B03 · 비듬

- **니조랄** — 케토코나졸로 비듬과 관련된 말라세지아 과증식을 억제하는 약용 샴푸다. [근거1](https://en.nizoral-asia.com/targeting-the-root-cause/)
- **셀선 블루** — 셀레늄설파이드 제형으로 비듬의 각질·가려움을 조절한다. [근거1](https://www.selsunblue.com/en-us/products/max-strength/medicated-antidandruff-shampoo?bvstate=pg%3A16%2Fct%3Ar) · [근거2](https://medlineplus.gov/druginfo/meds/a682258.html)
- **헤드앤숄더** — 확인한 미국 Classic Clean은 징크피리치온을 포함해 비듬을 관리하는 샴푸다. [근거1](https://headandshoulders.com/en-us/products/classic-clean-shampoo) · [근거2](https://headandshoulders.com/en-us/blogs/articles/our-active-ingredients)

### DIC-B04 · 지루성두피염

- **니조랄** — 케토코나졸의 항진균 작용으로 지루성피부염과 연관된 말라세지아를 겨냥한다. [근거1](https://en.nizoral-asia.com/targeting-the-root-cause/) · [근거2](https://www.aad.org/public/diseases/a-z/seborrheic-dermatitis-treatment)
- **시클로피록스 샴푸** — 항진균 약용 샴푸로 두피 지루성피부염의 발진·각질·가려움을 조절한다. [근거1](https://www.aad.org/public/diseases/a-z/seborrheic-dermatitis-treatment)
- **스테로이드 두피액 — 더모베이트** — 클로베타솔은 강한 국소 스테로이드로 반응성 두피 염증을 억제한다; 지루성두피염의 일괄 처방을 뜻하지 않는다. [근거1](https://www.medicines.org.uk/emc/product/941/smpc) · [근거2](https://www.aad.org/public/diseases/a-z/seborrheic-dermatitis-treatment)

### DIC-H01 · 안구건조증

- **인공눈물** — 눈 표면에 윤활을 보태 가벼운 안구건조 증상을 완화하는 점안제다. [근거1](https://health.nih.gov/health-topics-a-z/dry-eye)
- **눈물점마개** — 눈물 배출 통로에 마개를 넣어 눈물이 더 오래 머물도록 하는 시술이다. [근거1](https://health.nih.gov/health-topics-a-z/dry-eye)
- **안구건조 IPL** — 마이봄샘 기능장애와 관련된 안구건조에 제어된 광펄스를 사용하는 의료 장비다. [근거1](https://lumenis.com/vision/products/optilight/)

### DIC-H02 · 비염

- **지르텍** — 세티리진 항히스타민제로 알레르기성 콧물·재채기 등 증상을 줄인다. [근거1](https://www.nhs.uk/medicines/cetirizine/about-cetirizine/) · [근거2](https://www.zyrtec.com/products/zyrtec-tablets?=___psv__p_46321122__t_a_&bvstate=pg%3A6%2Fct%3Ar)
- **나조넥스** — 모메타손 비강 스테로이드로 알레르기 비염의 코 안 염증·부기를 줄인다. [근거1](https://www.medicines.org.uk/emc/product/1663/smpc) · [근거2](https://www.medicines.org.uk/emc/medicine/19853)
- **알레르기 면역치료** — 알레르겐에 반복적으로 노출해 알레르기 반응을 덜 하도록 유도하는 전문 치료다. [근거1](https://mft.nhs.uk/immunotherapy-information/)

### DIC-H03 · 이명

- **보청기** — 난청을 동반한 일부 이명에서 외부 소리를 증폭해 이명이 덜 두드러지도록 돕는다. [근거1](https://www.nidcd.nih.gov/health/tinnitus)
- **이명 재훈련치료** — 상담과 소리 치료를 결합해 이명에 익숙해지고 반응을 줄이는 치료다. [근거1](https://www.nidcd.nih.gov/health/tinnitus)
- **노이즈캔슬링** — 마이크로 감지한 외부 소음을 반대 신호로 줄이는 오디오 기술이다; 이명 치료기전이 아니다. [근거1](https://support.apple.com/en-ie/108918) · [근거2](https://www.nidcd.nih.gov/health/tinnitus)

### DIC-H04 · 노안

- **돋보기** — 가까운 거리의 초점을 렌즈 도수로 보완하는 시력 교정이다; 노화를 되돌리는 치료가 아니다. [근거1](https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/presbyopia)
- **누진다초점렌즈** — 한 렌즈 안의 도수를 점진적으로 달리해 먼 곳·중간·가까운 거리의 초점을 교정한다. [근거1](https://www.zeiss.com/vision-care/us/eye-health-and-care/driving-mobility/simply-see-better-with-progressive-lenses.html)
- **다초점 인공수정체** — 수정체를 여러 거리의 초점에 대응하는 인공수정체로 교체하는 수술적 교정이다. [근거1](https://www.alcon.com/media-release/alcon-expands-leadership-iol-innovation-clareon-panoptix-pro-delivering-best-class/)
- **카메라 오토포커스** — 카메라가 렌즈를 구동해 피사체 초점을 맞추는 기술이며 노안과는 '초점 맞춤' 느낌만 교차 검토한다. [근거1](https://files.canon-europe.com/files/webcontent/rf-lens-world/features/technology/index.html)

### DIC-H05 · 축농증

- **코세척** — 식염수로 비강의 점액·이물질을 씻어 내는 관리다; 깊은 부비동을 모두 비우는 시술은 아니다. [근거1](https://www.nhs.uk/conditions/sinusitis-sinus-infection/) · [근거2](https://www.rightdecisions.scot.nhs.uk/antimicrobial-prescribing-nhs-forth-valley/primary-care-guidance/upper-respiratory-tract-infections/acute-sinusitis/)
- **부비동 내시경수술** — 내시경으로 막힌 조직을 제거하는 등 부비동 배출 통로를 넓히는 수술이다. [근거1](https://www.nhs.uk/conditions/sinusitis-sinus-infection/) · [근거2](https://www.kingstonandrichmond.nhs.uk/patients-and-families/patient-leaflets/endoscopy-sinus-surgery)
- **부비동 풍선확장술** — 선별된 환자에서 작은 풍선을 팽창시켜 막힌 부비동 통로를 넓히는 시술이다. [근거1](https://www.nhs.uk/conditions/sinusitis-sinus-infection/)

### DIC-I01 · 갱년기증상

- **호르몬대체요법** — 감소한 여성호르몬을 보충해 안면홍조 등 갱년기 증상을 조절하는 치료다. [근거1](https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/about-hormone-replacement-therapy-hrt/)
- **훼라민큐** — 서양승마·세인트존스워트 복합제로 갱년기 증상 개선을 표방한다; 정확한 통합 작동은 확인한 제조사 설명만으로 확정하기 어렵다. [근거1](https://www.dkpharm.co.kr/boards/view.php?btype=news&idx=802&stype=news) · [근거2](https://www.nhs.uk/conditions/menopause-and-perimenopause/treatment/)
- **베오자** — NK3 수용체를 차단해 폐경 관련 중등도 이상 열감·발한을 조절하는 비호르몬 약이다. [근거1](https://www.fda.gov/drugs/drug-safety-communications/fda-adds-warning-about-rare-occurrence-serious-liver-injury-use-veozah-fezolinetant-hot-flashes-due)

### DIC-I02 · 질건조증

- **질 에스트로겐 — 바지펨** — 질에 국소 에스트로겐을 공급해 폐경 관련 질건조·자극을 치료하는 약이다. [근거1](https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/vaginal-oestrogen/)
- **리플렌스** — 점막에 보습·윤활을 보태는 질 보습제이며 호르몬 감소 자체를 되돌리는 치료는 아니다. [근거1](https://www.replens.com/pdf/Replens-Long-Lasting-Vaginal-Moisturizer-with-Reusable-Applicator.pdf) · [근거2](https://www.cancer.gov/publications/dictionaries/cancer-drug/def/755346)
- **모나리자터치** — 분획 CO2 레이저 에너지를 연조직에 전달하는 시술이며 질건조 개선은 별도의 임상 쟁점이다. [근거1](https://www.cynosure.com/product/monalisa-touch/) · [근거2](https://www.nice.org.uk/guidance/ng23/chapter/Recommendations)
- **물광주사** — 원본은 피부에 히알루론산을 주입해 수분을 붙잡는 시술이며 질건조로의 교차는 '마른 조직을 촉촉하게'라는 느낌의 가설이다. [근거1](https://www.galdermaaesthetics.com/restylane-skinboosters/science-behind-restylane-skinboosters)

### DIC-I03 · 생리통

- **이부프로펜** — 프로스타글란딘 생성을 줄여 생리 경련과 통증을 완화하는 소염진통제다. [근거1](https://www.acog.org/womens-health/faqs/dysmenorrhea-painful-periods)
- **미레나** — 자궁 안에서 호르몬을 방출해 내막을 얇게 하며 생리량을 줄이고 일부 생리통 조절에도 쓰인다. [근거1](https://www.mirena-us.com/about-mirena/how-does-mirena-work) · [근거2](https://www.acog.org/womens-health/faqs/dysmenorrhea-painful-periods)
- **TENS** — 피부 전극의 약한 전기 자극으로 통증 전달을 조절해 일시적 진통을 돕는 기기다. [근거1](https://www.nhs.uk/tests-and-treatments/transcutaneous-electrical-nerve-stimulation-tens/) · [근거2](https://www.nhs.uk/symptoms/period-pain/)

### DIC-I04 · 다낭성난소증후군

- **경구피임약** — 호르몬 제제로 출혈 주기를 조절하고 일부 증상을 관리한다; 자연 배란의 회복과 동일하지 않다. [근거1](https://www.nhs.uk/conditions/polyendocrine-metabolic-ovarian-syndrome-pmos/)
- **메트포르민** — 인슐린 작용을 개선하는 약으로 PCOS의 대사 문제나 일부 배란 문제에 선택적으로 쓰인다. [근거1](https://www.cuh.nhs.uk/patient-information/ovulation-induction-using-metformin-patient-information/) · [근거2](https://www.nhs.uk/conditions/polyendocrine-metabolic-ovarian-syndrome-pmos/)
- **이노시톨 40:1** — 인슐린 신호·대사와 관련해 연구되는 보충제이며 특정 40:1 조합의 우월성을 확정할 근거는 부족하다. [근거1](https://pmc.ncbi.nlm.nih.gov/articles/PMC10505534/)

### DIC-I05 · 전립선비대증

- **유로리프트** — 작은 임플란트로 전립선 조직을 옆으로 당겨 고정해 요도 통로를 확보한다. [근거1](https://www.urolift.com/patients/getting-started/patient-resources/faqs) · [근거2](https://www.niddk.nih.gov/health-information/urologic-diseases/prostate-problems/enlarged-prostate-benign-prostatic-hyperplasia?dkrd=%2Fhealth-information%2Furologic-diseases%2Fprostate-problems%2Fprostate-enlargement-benign-prostatic-hyperplasia)
- **홀렙** — 홀뮴 레이저로 비대해진 전립선 조직을 분리·제거해 배뇨 통로를 확보하는 수술이다. [근거1](https://www.cuh.nhs.uk/patient-information/holmium-laser-enucleation-of-the-prostate-holep/)
- **쏘팔메토** — 전립선 건강 보충제로 알려졌으나 NCCIH는 단독 복용의 BPH 증상 이득이 거의 없거나 없다고 정리한다. [근거1](https://www.nccih.nih.gov/health/saw-palmetto?next=%2F)

### DIC-I06 · 요실금

- **케겔운동** — 골반저근을 수축·이완하며 배뇨 조절을 돕는 근육을 훈련하는 방법이다. [근거1](https://www.nhs.uk/conditions/urinary-incontinence/treatment/)
- **요실금 슬링수술** — 주로 복압성 요실금에서 요도·방광 출구를 받쳐 압력이 걸릴 때 새는 것을 줄인다. [근거1](https://www.nhs.uk/conditions/urinary-incontinence/surgery/)
- **방광 보톡스** — 방광 벽에 보툴리눔독소를 주입해 과도한 수축을 줄이는 절박성 요실금·과민성방광 치료다. [근거1](https://www.nhs.uk/conditions/urinary-incontinence/surgery/)

## 로컬 근거 재사용과 드릴 제외

기존에 나왔다는 뜻과 좋은 정답이라는 뜻을 구분한다. 기각 사례도 새 시험으로 재출제하지 않도록 제외 표시했다. 다른 상징이 같은 결핍에 속한다는 이유만으로 전부 제외하지는 않았다.

- **DIC-B01 탈모 × 로게인폼** — 정본 ④-59의 오프로폼·로게인폼 탈모 짝과 ⑤-07에 이미 등장.
- **DIC-B01 탈모 × 모발이식** — 정본 ④-24에 모발이식·정전기 섬유 대체 실패가 이미 등장.
- **DIC-B02 새치 × 새치 염색** — 방법정답지 그루밍랩 새치염색의 1제·2제 혼합 생략이 이미 정답으로 수록됨.
- **DIC-B02 새치 × 헤나** — 정본 ④-64에서 헤나를 가치가 더해지지 않는 같은 층 상징으로 명시.
- **DIC-B03 비듬 × 헤드앤숄더** — 정본 ④-64가 헤드앤숄더 샴푸를 같은 층의 단순 제품명으로 명시적으로 제외.
- **DIC-H03 이명 × 노이즈캔슬링** — 정본 ④-21과 1회차 D1-03에 이미 등장한 감점 짝: 바깥 소리와 내부 이명의 작용 대상 불일치.
- **DIC-I04 다낭성난소증후군 × 이노시톨 40:1** — 방법정답지 메디온 MDC 이노시톨의 다낭성·생리불순과 40:1 비율 짝이 이미 정답으로 수록됨.
- **DIC-I05 전립선비대증 × 쏘팔메토** — 정본 ④-13·④-65에 밥에 뿌리는 쏘팔메토가 이미 기각 예시로 등장.
- **DIC-I06 요실금 × 케겔운동** — 정본 ④-64 및 1회차 D1-08의 요실금·케겔운동 짝이 이미 등장.

- [정본](C:/claude/LLM-WIKI/마케팅/wiki/syntheses/DA 기획 단계별 규칙.md): ④-21 교차 가능성과 작용 대상, ④-24 모발이식, ④-59 로게인폼, ④-64 헤나·헤드앤숄더·케겔, ④-13·④-65 쏘팔메토, ⑤-04 흔한 보습 원료를 재사용했다.
- [방법정답지](C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/기획-시스템/자가학습/히트해부/방법정답지.md): 그루밍랩 새치염색·메디온 40:1의 기존 짝, 텐스온의 전기자극 상징 이력을 확인했다. 텐스온의 관절·근육 통증과 이번 생리통은 같은 짝으로 처리하지 않았다.
- [1회차 카드](C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/기획-시스템/자가학습/상징짝-드릴/1회차/카드.json): 이명–노이즈캔슬링, 요실금–케겔운동의 선행 기록을 재사용했다. 원본 카드의 효능 문구 자체를 의학 근거로 삼지 않았다.
- [담당 2회차 후보](C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/기획-시스템/자가학습/상징짝-드릴/2회차/후보-HIB.json): 니조랄·눈물점마개·오토포커스·물광주사의 탐색 이력만 연결했다. 대표 판정·정답 확인 자료가 아니므로 단독으로 드릴 제외하지 않았다.

## 중앙조회 키워드 배열

결핍 메인명과 상징 메인명·필수 동의어를 중복 제거했다. 총 73개. 영문 약자·브랜드 전체 검색량이 해당 결핍용 상징의 인지도를 대신하지 않도록 결핍 연관어를 함께 확인해야 한다.

```json
[
  "탈모",
  "로게인폼",
  "미녹시딜",
  "프로페시아",
  "모발이식",
  "새치",
  "새치염색",
  "헤나",
  "그레이블렌딩",
  "비듬",
  "니조랄",
  "셀선블루",
  "헤드앤숄더",
  "지루성두피염",
  "시클로피록스",
  "더모베이트",
  "스테로이드",
  "안구건조증",
  "인공눈물",
  "눈물점마개",
  "누점폐쇄술",
  "안구건조 IPL",
  "옵티라이트",
  "비염",
  "지르텍",
  "나조넥스",
  "알레르기면역치료",
  "이명",
  "보청기",
  "이명재훈련치료",
  "노이즈캔슬링",
  "노안",
  "돋보기",
  "누진다초점렌즈",
  "다초점인공수정체",
  "팬옵틱스",
  "오토포커스",
  "축농증",
  "코세척",
  "축농증수술",
  "부비동내시경수술",
  "부비동풍선확장술",
  "갱년기증상",
  "호르몬대체요법",
  "훼라민큐",
  "베오자",
  "페졸리네탄트",
  "질건조증",
  "바지펨",
  "질에스트로겐",
  "리플렌스",
  "모나리자터치",
  "물광주사",
  "생리통",
  "이부프로펜",
  "미레나",
  "TENS",
  "경피신경전기자극",
  "다낭성난소증후군",
  "경구피임약",
  "메트포르민",
  "이노시톨",
  "전립선비대증",
  "유로리프트",
  "전립선결찰술",
  "홀렙",
  "홀뮴레이저",
  "쏘팔메토",
  "요실금",
  "케겔운동",
  "요실금수술",
  "슬링수술",
  "방광보톡스"
]
```

## 남은 확인

- 본체의 정본점검 후 제외 표기와 현행 규칙 재대조.
- 중앙조회로 검색량·자동완성·결핍과의 연결 확인. 특히 그레이블렌딩·시클로피록스·옵티라이트·베오자·바지펨·리플렌스·풍선확장술·홀렙은 전문성·해외 명칭을 대중성으로 착각하지 않도록 한다.
- 체험자 장면과 믿는 원인은 실제 발화가 확보될 때만 가설 표시를 바꾼다.
- 이번 조사로 의학효능의 다른 부위 전용, 임상 동등성, 제형 성립을 확정하지 않는다.

"""결핍 책 재료 만들기 — 수집이 끝난 계열 하나를 결핍 책 작성자(Sonnet)가 읽을 짧은 재료로 바꾼다. 모델 없음.

사용: python deficit_book_prep.py <_전체계획.json> <계열>
만드는 것:
  결핍책/결핍/<결핍>/_재료.md   — 수집 요약, 원인 단서 비중, 대안 언급, 목소리 인용, 쿠팡 후기 요약, 메타 판매처·매대 비율, 검색량
  결핍책/대안/<대안>/_재료.md   — 타겟 인식 비중(가격·통증·무서움·효과·연예인·유지·다운타임), 목소리 인용, 의사·후기 영상 발췌
  결핍책/묶음/<계열>/_재료-영상.md — 결핍별 의사·설명 영상 받아쓰기(원인 유형·원리 정리용)
비율은 정규식으로 센 추정치다(같은 말의 다른 뜻은 걸러지지 않음). 작성자가 인용을 보고 해석한다.
"""
import collections, glob, json, os, re, sys
from pathlib import Path
import openpyxl

ROOT = Path('C:/claude/LLM-WIKI'); BOOK = ROOT / '마케팅/프로젝트/DA-기획/결핍책'
REVIEWS = ROOT / '마케팅/프로젝트/DA-기획/후기-받은함'
META = Path(r'C:\claude\네이버 급상승 키워드 기반 경쟁사 발굴\scripts')

CAUSE = {'노화·처짐': r'나이|노화|처지|처짐|탄력.{0,4}(떨어|없)|늙', '근육·표정': r'웃을 ?때|표정|근육|웃으면|찡그', '살·지방': r'살이 ?(빠|찌)|볼살|지방|다이어트|살쪄|체중',
         '타고남·구조': r'타고|선천|유전|어릴 ?때부터|원래|뼈|골격|구조', '습관·자세': r'자세|습관|잠버릇|엎드려|베개|핸드폰|폰을|고개', '건조·피부': r'건조|얇|피부가 약|수분',
         '스트레스·생활': r'스트레스|잠을|수면|피곤|음주|(?<![수시])술을|(?<![수시])술 ?마|술자리|담배|흡연', '호르몬·임신': r'임신|출산|호르몬|생리|갱년기', '세균·염증': r'세균|염증|곰팡이|(?<!유산)(?<!유익)균(?!형)|감염',
         # ↑ 10-16 고침: '술'이 '시술·수술·기술'에 걸려 31~40%로 부풀었다(흉터색소2 작성자가 찾음)
         '바이러스·옮음': r'바이러스|HPV|옮|전염|번지|퍼지', '각질·모공 막힘': r'각질|모공.{0,4}막|피지|과각화',   # 10-16 사마귀돌기 작성자: 바이러스 칸이 없었음
         '화학시술·열': r'염색|탈색|파마|펌(을|하|했|만|이)|매직|셋팅|고데기|드라이기|열 ?손상|탄 ?머리|아이롱'}   # 10-17 헤어손상 작성자: 손상모의 가장 큰 원인(염색·탈색·펌·고데기) 칸이 없었음
PERCEPT = {'안다·들어봄': r'알고 ?있|알지|들어봤|유명|많이 하', '효과 믿음·좋았다': r'효과.{0,4}(있었|있네|있어요|있습니다|좋았|좋네|봤어요|봤습니다|봤다|봤음)|좋아졌|만족|달라졌|확실히 ?(좋|효과|나아|달라)', '효과 없음·실망': r'효과.{0,6}(없|글쎄|모르)|별로|돈 ?아까|그때뿐|실망|소용없',
           '비싸다': r'비싸|가격|만 ?원|돈이|부담', '아프다·마취': r'아프|아팠|통증|마취|따가', '무섭다·부작용': r'무서|부작용|위험|걱정|(?<!무)겁', '연예인·유명인': r'연예인|배우|아이돌|셀럽',
           '유지·주기': r'유지|주기|몇 ?(달|개월)|매년|다시 ?받', '다운타임·붓기·멍': r'붓기|부어|멍이 ?들|멍든|다운타임|빨갛', '셀프·집에서': r'집에서|셀프|홈케어|혼자'}
SYMBOLS = ['PDRN', '레티놀', '레티날', '콜라겐', '펩타이드', '엑소좀', '히알루론', '시카', '병풀', '마데카', '나이아신', '트라넥삼산', '비타민C', 'EGF', '보톡스', '필러',
           '울쎄라', '써마지', '슈링크', '리쥬란', '쥬베룩', '스컬트라', '인모드', '리프팅', '고주파', '갈바닉', 'EMS', '미세전류', 'LED', '스피큘', '녹는실', '실리프팅',
           '맥주효모', '비오틴', '미녹시딜', '피나스테리드', '카페인', '어성초', '프로폴리스', '유산균', '세라마이드', '판테놀', '살리실산', 'AHA', 'BHA', '알부틴', '글루타치온']
SEVERE = {'장면: 거울·사진·웃기': r'거울|사진|셀카|웃을 ?때|웃기가|화장', '장면: 만남·일': r'소개팅|연애|만나기|출근|회사|면접|결혼식', '감정: 스트레스·우울': r'스트레스|우울|짜증|속상|미치겠|죽겠|눈물|울었',
          '감정: 자존감·콤플렉스': r'자존감|콤플렉스|창피|부끄|숨기|가리', '들인 돈': r'만 ?원|돈을|비용|가격이|썼는데|들였', '기간: 오래됨': r'년째|몇 ?년|오래|평생|계속', '불신·포기': r'소용없|효과 없|다 해봤|포기|속았|사기'}
WISH = r'만 ?되면|처럼 ?되|싶어요|싶다|원해|바래|방법 ?없을까|어떻게 ?하면'
# 10-16 고침: '먹는 것'의 '정·환'이 '정말·진정·환자'에, '밤'이 '밤에'에 걸려 먹는 것이 47~67%로 부풀었다(실제 0~8%). 여드름흉터 작성자가 찾음.
FORMS = {'크림': r'크림', '앰플·세럼': r'앰플|세럼|에센스', '패치': r'패치', '마스크·팩': r'마스크|팩(?!트)', '밴드': r'밴드', '디바이스·기기': r'디바이스|기기|마사지기|부스터 ?프로',
         '먹는 것': r'[0-9]+ ?정\b|정제|캡슐|알약|[0-9] ?환|젤리|분말|가루|영양제|드링크|먹는|마시는|복용|섭취|건강기능식품', '샴푸·토닉': r'샴푸|토닉', '스프레이': r'스프레이|미스트',
         '오일·밤': r'오일|멀티밤|스틱밤|립밤|밤 ?(타입|제형)'}

# 대안 이름이 다른 말과 겹쳐 섞인 글(2026-10-15 주름윤곽에서 확인: 온라인모드·일괄사표·자전거 모델)을 뺀다.
NEG = {'인모드': r'온라인 ?모드', '괄사': r'일괄', '스컬트라': r'자전거|로드 ?바이크|휠셋|프레임', '레디어스': r'게임|던파', '온다리프팅': r'^(?!.*온다 ?리프팅)',
       '기미': r'기미가요|닝기미|(빠질|터질|나을|들어갈|줄어들|좋아질|변할|올|보일) ?기미|기미(도|조차) ?(안|없|보이)'}

# 같은 말이 다른 뜻으로 많이 쓰이는 결핍은 그 뜻일 때만 남긴다('기미가요'·'할 기미'·'닝기미' — 색소흉터 원인원리 작성자가 찾음, 10-16)
POS = {'기미': r'피부|얼굴|잡티|색소|주근깨|미백|토닝|레이저|크림|선크림|썬크림|자외선|광대|트란|멜라|흑자|검버섯|시술|피부과|화장|세럼|앰플|비타민|뺨|눈밑|임신'}

# 사람 결핍인데 반려동물 글이 섞인다(10-17 구내염 작성자: 인용 40개 중 고양이·뱀 글 4개) — 모든 결핍에서 뺀다
POS.update({'쥐젖': r'쥐젖|비립종|목|겨드랑이|피부|제거|병원|피부과|레이저|냉동|오돌|돌기|점', '소극성속모증': r'코|모공|블랙헤드|피지|각질|속모|피부|팩|세안|클렌징',
            '코팩': r'코|모공|블랙헤드|피지|팩|피부|각질'})   # 10-18 모공돌기 A: 주제 거르기가 없어 비유·게임 글이 섞임
NEG.update({'쥐젖': r'쥐젖 ?만|쥐꼬리|주식|코스피|HBM|월급|연봉', '코팩': r'코팩스|커쇼|다저스|야구|투수'})
POS.update({'다한증': r'땀|다한증|겨드랑|손바닥|발바닥|드리클로', '세타필': r'세타필', '스테로이드연고': r'스테로이드|연고', '드리클로': r'드리클로|땀',
            '다한증수술': r'수술|교감신경'})   # 10-19 피부염증땀 A: 무관 글 거르기
NEG.update({'아토피': r'부동산|보증금|핫딜|\[쿠팡\]|보디빌딩', '다한증': r'수전증|바보협회|글카스|듀퐁', '듀피젠트': r'사노피|코스닥|알테오젠|주가|매수',
            '데오드란트': r'흑인|백인|일본인|뇨팡|씹덕', '미라드라이': r'인증병원|실비 ?꼭'})
NEG.update({'탈모': r'GOS|갤럭시|네고|매물|한동훈|가챠|챗질|잼민이|BMI|bmi|미용실.{0,6}예약제|모엔텐딩|노비어|맥단비|두피샵 운영',   # 10-19 두피 A: 무관·광고 글
            '모발이식': r'통증 때문에|진통제|나는솔로|유니폼|사인회|사인 ?받|사인볼', '맥주효모': r'전통주|누룩|조효소|칼소폭|크로스핏',
            '탈모샴푸': r'사타구니|희석', '두피스케일링': r'다이슨|자격증|반곱슬|롤빗|시술 전, 주의사항'})
NEG.update({'티눈': r'아이덴티티?눈|안티눈|서울시장|사랑니|갑상선|용종', '무좀': r'애무 ?좀|전무 ?좀|전사무좀|칼부림|흉기|실손|사무장'})   # 10-19 발 A
POS.update({'무좀약': r'발|발톱|사타구니|연고|스프레이|항진균|간수치|피부과', '주블리아': r'주블리아|네일라카|발톱', '티눈밴드': r'티눈 ?밴드|티눈고'})
NEG.update({'잇몸염증': r'승무원|해몽|냥치|세금신고', '인사돌': r'인사 ?돌(리|릴|림|다가)|인사 돌 때|이준석|전립선|신부옷|약리의 상충',   # 10-19 구강 A
            '스케일링': r'쌀겨가루|핫딜|플스5|xsx|crt|바자르|두피 스케일링|내성 발톱|눈 밑|기래민|아빠 손', '가글': r'홍등가글|이주완|아챔|컴견챈|쓱69|두산\)|1300ts|음주운전|일어났다요',
            '이가탄': r'이가 탄(부|탄)|모스탄|역류|물비린내', '잇몸치약': r'센소다인|시린이|멀티케어|메디안 치약|돌아가셨어|켄트 치솔모|샤워할때|베타시스테롤',
            '워터픽': r'삼촌|김치남|눈치주고|결석이 잘 안보여요', '치간칫솔': r'다이소 입구'})
NEG.update({'역류성식도염': r'프나틱|칼로스|하닉|서지타운', '비염': r'아메라니|빽가|스타강사|NoReward|정신병임|불펜|양이모|달뱅휴|쩝쩝',   # 10-19 몸속 A
            '코세척': r'rgg유산균|AP24', '나잘스프레이': r'명원이|고인의 명복|수면마취|이관개방증', '비염수술': r'마른 새우|시누|부담보|어깨 때문에'})
POS.update({'항히스타민제': r'비염|콧물|재채기|코막힘|코감기|꽃가루|환절기|두드러기|가려움|알레르기|피부'})   # 비염·두드러기 공유 대안
NEG.update({'족저근막염': r'폐회식|창훈|여준석|턱관절|난폭운전|블박|140키로|138키로|전여친|골프채|게헨나|정차있는차'})   # 10-19 족저 A+B
POS.update({   # 10-19 새 17: 주제 거르기(체취 A+B에서 인용 40개 중 17~19개가 무관 — 결핍 낱말이 없는 글은 뺀다)
    '액취증': r'암내|액취|겨드랑|냄새|체취|땀', '노인냄새': r'노인|냄새|체취|홀아비|홀애비|노넨|노네날|가령취|아빠|엄마|부모|할머니|할아버지|어르신',
    '발뒤꿈치각질': r'뒤꿈치|각질|발바닥|갈라|굳은살|풋|발', '손발톱갈라짐': r'손톱|발톱|네일|갈라|부러|찢어|깨지',
    '다리붓기': r'붓|부종|다리|종아리|발목|압박|림프', '민감부위착색': r'착색|색소|미백|거뭇|까맣|유두|Y존|와이존|사타구니|겨드랑|입술|비키니',
    '눈밑지방': r'눈밑|눈 밑|애교|다크|지방|불룩|처짐|꺼짐|재배치|아이크림', '누런이': r'치아|이빨|누런|누렇|미백|착색|변색|치과|치약',
    '시린이': r'시린|시림|이가|치아|이빨|치약|치과|잇몸|센소다인', '혈당': r'혈당|당뇨|공복|당화|인슐린|스파이크|바나바|여주',
    '콜레스테롤': r'콜레스테롤|LDL|HDL|고지혈|중성지방|홍국|오메가', '혈압': r'혈압|혈압약|수축기|이완기',
    '기억력': r'기억|깜빡|건망|치매|인지|집중|뇌', '빈혈': r'빈혈|철분|헤모글로빈|어지러|어지럼|창백|페리틴',
    '거북목': r'거북목|일자목|목|어깨|승모|자세|경추', '과민성대장': r'과민성|장|설사|가스|복통|배|변비|화장실|방귀',
    '치질': r'치질|치핵|치열|항문|좌욕|변|피|엉덩이'})
NEG.update({'액취증': r'샹차이|마이쮸|워셔액|쯔란|인도인|백흑인|돼지새끼|암내가족|딥스테이트|냄저|아가리|여기사|조상중에|용솟음',
    '노인냄새': r'일본인|앵지|Video Player|이창우|키라|마기레코|접종자|담임쌤|베라즈루리|NC 같은|성폭력|유게|박재혁|옛 여친|히어뽀|고체배지|돌싱포멘|동남아인|중국인|용접|크리드',
    '액취증수술': r'낙서|소아마비|차앤유클리닉|국뽕'})
NEG.update({'다리붓기': r'반깁스|흉터투성이|이로하선배|대주자|타격왕|몰루|발효생식|이든네이처|신생아',   # 10-19 부종 A+B
    '호박즙': r'양배추즙|펌킨에일|자궁근종|기부한거|차이나게이트|코코넛워터|파스타그램|나중에 마셔야지', '붓기차': r'면김쏘욱슈|cpu|강동원|인바디|살쪘음을 보여주는|온몸 근육이 아픈데',
    '다리마사지기': r'상다리|시어머님|장모님|국가총력전'})
NEG.update({'발뒤꿈치각질': r'쓱싹크림|흑설탕 마사지|검정깨 화장수|혼인 유지|찍찍이|쌩까는거|네이비씰|Video 태그를 지원하지|메이드 카페|발을 핥는다|호감도 선물|성홍열|런닝머신',   # 10-19 발손톱 A+B
    '손발톱갈라짐': r'최승용|올스타전|개꼴데|우락실|날아다니는 영화|트린드|펑거스세럼', '발각질제거기': r'제모기 고민하다가|소중이 부근|케틀럿|조곤조곤 사고 있음',
    '손톱영양제': r'귀티나는 손 만들기|웹사이트 하나 남기고갈게요|피부실기', '풋필링': r'슈퍼적립 상품|오집보다 싼 것 같아서 올림당'})
NEG.update({'과민성대장': r'위고비|상태창|임신확신|질내가득|난자 채취|운세|틋녀|손발이 차서 뜸|복부비만이 엄청|센코딜',   # 10-19 장항문 A+B
    '치질': r'정치질|양치질|지치질|고치질|서든핵|배그핵|옵치핵|발로핵|니캐핵', '소화효소': r'리타|써클렌즈|눈 나빠지|피넛버터|펩타이드',
    '좌욕기': r'aglio|올리브유|이말내', '치질방석': r'얼굴이 반쪽', '치질수술': r'똥침|코 찔찔'})
NEG_ALL = r'adcr\.naver|캐시워크|고양이|강아지|냥이|반려묘|반려견|댕댕이|동물병원|수의사|길냥|집사님'
POS.update({'구내염': r'입|혀|잇몸|구내염|입병|혓바늘|알보칠|오라메디|헐었|헐어|궤양|양치|가글',
            '구순염': r'입술|구순|입꼬리|입가|립밤|각질|갈라|트고|텄',
            # 10-17 여성 계열 작성자: 대안 목소리가 빵·게임(크랜베리)·무좀 연고(질정)·남성(케겔)으로 가득
            '크랜베리': r'방광|소변|요로|질염|여성|오줌|화장실|잔뇨', '질정': r'질염|질정|분비물|냉|칸디다|산부인과|질 ?건조|Y존',
            '케겔운동': r'요실금|골반|출산|소변|질|산후|기침|재채기', '여성청결제': r'질염|Y존|냄새|분비물|냉|청결|가려',
            '질유산균': r'질염|질|여성|Y존|분비물|냉|유산균',
            # 10-17 몸속2 작성자: 타트체리는 수면 글, 통풍약은 '페북' 정치·앱 글이 섞임
            '타트체리': r'통풍|요산|관절|발가락|염증', '통풍약': r'통풍|요산|발작|관절|페북트|페브릭|자이로릭|콜킨|알로푸리놀',
            '장유산균': r'장|변비|배변|유산균|프로바이오|설사|가스',
            '마그네슘': r'편두통|두통|눈떨림|쥐|근육|수면|마그네슘', '편두통약': r'두통|편두통|진통|타이레놀|이부|게보린|탁센|트립탄|약',
            '대상포진백신': r'대상포진|백신|접종|싱그릭스|조스타박스', '항바이러스제': r'대상포진|포진|바이러스|아시클로|발라시|팜시',
            '쏘팔메토': r'전립선|소변|잔뇨|빈뇨|야간뇨|쏘팔메토|남성', '전립선약': r'전립선|소변|잔뇨|빈뇨|야간뇨|탐스로신|피나|두타|하루날',
            # 10-17 모공여드름 작성자: 포텐자에 타이어·'포텐' 은어, 압출에 치과 마취 글
            '포텐자': r'포텐자|모공|시술|피부과|레이저|고주파|흉터|여드름', '여드름압출': r'여드름|압출|피지|블랙헤드|관리실|면포|좁쌀',
            '트러블패치': r'여드름|트러블|뾰루지|염증|피부|좁쌀|짜고', '스킨보톡스': r'모공|피지|스킨|피부|탄력|주름|리프팅|여드름',
            '살리실산바디워시': r'등드름|가드름|여드름|바디|각질|살리실|BHA|닭살',
            # 10-17 헤어손상 작성자: 손상모 인용 40개 중 17개가 연예·게임·만화 글, 헤어에센스 25개 중 17개가 시어머니·선물 글처럼 낱말만 스친 글
            '손상모': r'머릿결|머리결|머리카락|모발|손상|푸석|부스스|곱슬|끝 ?갈라|윤기|탈색|염색|펌|파마|매직|드라이|고데기|샴푸|트리트먼트|미용실|두피|에센스|헤어팩|린스|컨디셔너|엉키',
            '헤어클리닉': r'머릿결|머리결|모발|손상|푸석|부스스|곱슬|갈라|윤기|탈색|염색|펌|파마|매직|트리트먼트|미용실|클리닉',
            '매직스트레이트': r'머릿결|머리결|머리카락|모발|손상|곱슬|부스스|미용실|매직|스트레이트|펌|볼륨|뿌리',
            '헤어에센스': r'머릿결|머리결|머리카락|모발|손상|푸석|부스스|곱슬|끝 ?갈라|떡|윤기|탈색|염색|펌|파마|매직|드라이|고데기|샴푸|트리트먼트|미용실|두피|빗',
            '단백질트리트먼트': r'머릿결|머리결|머리카락|모발|손상|푸석|부스스|곱슬|갈라|윤기|탈색|염색|펌|파마|매직|샴푸|트리트먼트|미용실|단백질|헤어팩'})
NEG.update({'손상모': r'캐릭터|작화|만화|웹툰|애니|게임|성우|코스프레|아이돌|멤버|컴백|무대|드라마|화보|직캠|뮤비|최애',
            '매직스트레이트': r'트릭컬|스킬|캐릭|던전|레이드|가챠',
            # 10-17 냄새 계열 작성자
            '입냄새': r'구취했|채널 ?구취|구독 ?취소', '혀클리너': r'내가 (제일 |세상에서 )?좋아하는', '신발탈취제': r'곰신|어장|이그노벨|제습기'})
POS.update({'풋스프레이': r'풋 ?(스프레이|미스트|데오)|발.{0,4}(스프레이|미스트)', '신발탈취제': r'신발|구두|운동화|탈취|발냄새',
            '입냄새': r'입냄새|구취|입 ?냄새|양치|혀|편도|치과|잇몸|가글|입에서'})

BLIND_AD = re.compile(r'\n\n(?:[^\n]{1,90}\n){1,3}(?=좋아요\n\d+ ?\n댓글)')
def strip_ads(t):
    # 10-19 M14: 블라인드 글 끝 '좋아요' 바로 앞 1~3줄은 회사 태그·광고('플란치과, 임플란트 가격 할인'·'퓨어그램 모공 탄력 세럼')라 뺀다 — 비싸다 칸·대안 이름 셈을 부풀렸다
    return BLIND_AD.sub('\n\n', t) if '\n좋아요\n' in t else t

def drop_noise(rows, name):
    pat, pos = NEG.get(name), POS.get(name)
    for r in rows:
        if r.get('text'): r['text'] = strip_ads(r['text'])
    rows = [r for r in rows if not (pat and re.search(pat, r.get('text', ''))) and not (pos and not re.search(pos, r.get('text', '')))
            and not re.search(NEG_ALL, r.get('text', ''))]
    # 10-19 M13: 복붙 글(앞 80자가 같은 글)은 하나만, 6,000자 넘는 목록형 글('미용법 50가지')은 뺀다 — 발뒤꿈치각질 타겟 발화의 24%가 복붙이었다
    seen, out = set(), []
    for r in rows:
        t = r.get('text', '')
        if len(t) > 6000: continue
        k = re.sub(r'\s+', '', t)[:80]
        if len(k) >= 30 and k in seen: continue
        seen.add(k); out.append(r)
    return out

def load(p):
    try: return json.loads(Path(p).read_text(encoding='utf-8'))
    except Exception: return []

# 결핍마다 덧붙이는 원인 칸(범용 칸에 없는 것 — 10-17 냄새·헤어 작성자). 결핍 이름 → {칸: 정규식}
CAUSE_BY = {
    '입냄새': {'혀·설태': r'백태|설태|혓바닥|혀클리너|혀 ?(뒤|안쪽|닦|표면)', '편도결석': r'편도(?!.{0,3}(왕복|항공|티켓))|목젖|노란 ?(알갱이|덩어리)',
             '치과적': r'치석|스케일링|잇몸|풍치|치주|충치|사랑니|보철|크라운|임플란트|신경치료',
             '구강건조·입호흡': r'입마름|입이 ?(마르|건조)|구강 ?건조|침이 ?(없|적|부족|마르)|구강호흡|입으로 ?(숨|호흡)|입 ?벌리고',
             '위장·역류': r'위장|위염|역류|식도염|속에서 ?(올라|냄새)|트림|소화|헬리코|위산', '비염·후비루': r'비염|후비루|축농증|코막힘|가래|부비동',
             '음식·흡연·공복': r'담배|흡연|음주|술 ?(마|먹|자리)|커피|마늘|공복|케톤|다이어트', '전신질환': r'당뇨|간경|간 ?(질환|기능)|신장|콩팥|신부전',
             '본인 못 느낌': r'본인(은|이)? ?(모르|몰라|못 ?느)'},
    '발냄새': {'땀·다한증': r'땀|다한증', '신발·양말 환경': r'통풍|습기|눅눅|밀폐|깔창|신발.{0,6}(냄새|젖|축축|속)|양말.{0,6}(냄새|젖|축축)',
             '무좀·진균': r'무좀|진균|곰팡이|발톱', '각질융해': r'소와|오목각질|각질융해', '안 씻음·위생': r'안 ?씻|씻지 ?않|위생', '체질·유전': r'체질|유전|타고났|선천'},
}
PERCEPT_BY = {'혀클리너': {'구역질': r'구역질|헛구역|구역 ?반사'}}

THREAD_CAP = 5
def cap_thread(rows, k=THREAD_CAP):
    """한 글(같은 url)의 댓글·답변은 k개까지만 센다 — 바디착색 타겟 발화 68개 중 14개가 네이트판 글 하나의 댓글이라 원인 1순위가 뒤집혔다(10-17)."""
    seen, out = {}, []
    for r in rows:
        u = r.get('url') or id(r); seen[u] = seen.get(u, 0) + 1
        if seen[u] <= k: out.append(r)
    return out

def table2(rows, pats, label='단서', sort=False):
    """타겟 발화(질문·글·댓글)와 지식인 답변을 나눠 센다 — 답변은 '설명하는 원인'이라 타겟이 믿는 원인과 섞으면 안 된다(10-17)."""
    rows = cap_thread(rows)
    voice = [r['text'] for r in rows if r.get('type') != '답변']; ans = [r['text'] for r in rows if r.get('type') == '답변']
    a, b = share(voice, pats), {k: (n, p) for k, n, p in share(ans, pats)}
    if sort: a = sorted(a, key=lambda x: -x[1])
    return [f'(타겟 발화 {len(voice)}개 · 지식인 답변 {len(ans)}개 — 판단은 타겟 발화 칸으로)', '',
            f'| {label} | 타겟 발화 수 | % | 지식인 답변 수 | % |', '|---|---:|---:|---:|---:|'] + [f'| {k} | {n} | {p} | {b[k][0]} | {b[k][1]} |' for k, n, p in a]

def share(texts, pats):
    n = len(texts) or 1
    return [(k, sum(bool(re.search(v, t, re.I)) for t in texts), round(100 * sum(bool(re.search(v, t, re.I)) for t in texts) / n)) for k, v in pats.items()]

def quotes(rows, k=40, need=None):
    pool = [r for r in rows if str(r.get('experience')) == 'True' and 60 <= len(r.get('text', '')) <= 600 and (not need or re.search(need, r['text']))]
    pool = [r for r in pool if r.get('type') != '답변']    # 10-18: 목소리 인용은 타겟 발화만(지식인 답변은 설명이라 뺌)
    pool.sort(key=lambda r: (-(int(r.get('likes') or 0)), -len(r['text'])))
    groups = collections.OrderedDict()                     # 10-18: 사이트마다 돌아가며 한 개씩 — 새로 넣은 사이트(블라인드·82쿡·더쿠…)도 인용에 들어오게
    for r in pool: groups.setdefault(str(r.get('source', ''))[:6], []).append(r)
    out, seen_url, i = [], collections.Counter(), 0
    while len(out) < k and any(groups.values()):
        for s in list(groups):
            if not groups[s]: continue
            r = groups[s].pop(0)
            if seen_url[r.get('url')] >= 2: continue       # 한 글의 댓글은 2개까지
            seen_url[r.get('url')] += 1
            out.append(f"- [{r.get('source','')}] {re.sub(chr(10)+'+', ' ', r['text'])[:300]}")
            if len(out) >= k: break
    return out

def reviews_summary(folder_names, alias_pat):
    L = []
    for name in folder_names:
        for f in sorted(glob.glob(str(REVIEWS / name / '*.xlsx'))):
            try:
                ws = openpyxl.load_workbook(f, read_only=True).active; rows = list(ws.iter_rows(values_only=True))
            except Exception as e: L.append(f'- {os.path.basename(f)}: 읽기 실패 {e}'); continue
            head = [str(c or '') for c in rows[0]]; idx = {h: i for i, h in enumerate(head)}
            data = [r for r in rows[1:] if r and len(r) > idx.get('리뷰내용', 7)]
            texts = [str(r[idx['리뷰내용']] or '') for r in data]; stars = [int(float(r[idx['평점']])) for r in data if r[idx['평점']] not in (None, '')]
            helpful = sorted(data, key=lambda r: -int(float(r[idx.get('도움된인원수', 10)] or 0)))[:30]
            top_hit = sum(bool(re.search(alias_pat, str(r[idx['리뷰내용']] or ''))) for r in helpful)
            low = [str(r[idx['리뷰내용']] or '')[:160] for r in data if r[idx['평점']] not in (None, '') and int(float(r[idx['평점']])) <= 2][:4]
            best = [str(r[idx['리뷰내용']] or '')[:200] for r in helpful[:4]]
            name_p = os.path.basename(f)[:-5]
            L.append(f"### {name_p} ({name})\n- 후기 {len(data)}개 · 평균 {round(sum(stars)/len(stars),2) if stars else '-'}점 · 1~2점 {sum(s<=2 for s in stars)}개 · 도움순 상위 30개 중 결핍을 말한 후기 {top_hit}개")
            L += ['- 도움 많은 후기: ' + ' / '.join(best)] + (['- 낮은 점수: ' + ' / '.join(low)] if low else [])
    return L

LONG = []   # (게재일수, 본문 앞부분) — meta_texts가 채운다

def meta_texts(keywords):
    import datetime
    seen, texts = set(), []; LONG.clear(); today = datetime.date(2026, 10, 15)
    for kw in keywords:
        for f in glob.glob(str(META / '*_메타광고소재' / kw / '_ads.json')):
            d = load(f)
            for t in d.get('ad_texts', []) if isinstance(d, dict) else []:
                m = re.search(r'라이브러리 ID: (\d+)', t)
                if not m or m.group(1) in seen: continue
                seen.add(m.group(1)); body = t.split('광고\n', 1)[-1][:800]
                letters = re.findall(r'[A-Za-z가-힣]', body)   # 외국어 광고(영어·인니어 단편드라마 앱 — 튼살 207개 중 약 97개, 10-16)는 뺀다
                if letters and sum('가' <= ch <= '힣' for ch in letters) / len(letters) < 0.3: continue
                texts.append(body)
                s = re.search(r'(\d{4})\. (\d{1,2})\. (\d{1,2})\.에 게재 시작함', t)
                if s: LONG.append(((today - datetime.date(int(s.group(1)), int(s.group(2)), int(s.group(3)))).days, re.sub(r'\s+', ' ', body)[:160]))
    return texts

def long_running(k=12):
    out, seen = [], set()
    for days, body in sorted(LONG, reverse=True):
        key = body[:40]
        if key in seen: continue
        seen.add(key); out.append(f'- {days}일 · {body}')
        if len(out) >= k: break
    return out

def transcript_snips(vids, role=None, per=2500, k=10):
    out = []
    for v in [v for v in vids if v.get('transcript') and (role is None or v.get('role') == role)][:k]:
        tx = re.sub(r'\[\d+(\.\d+)?\]\s*', '', v['transcript']); tx = re.sub(r'\s+', ' ', tx)
        out.append(f"#### {v.get('title','')} ({v.get('channel','')}, {v.get('role','')})\n{v.get('url','')}\n{tx[:per]}")
    return out

def main(plan_path, family, only=None):   # only: 이 폴더만 다시 만든다(다른 작성자가 읽는 중인 재료는 건드리지 않음)
    plan = json.loads(Path(plan_path).read_text(encoding='utf-8'))
    fams = {f['family']: f for f in plan['families']}; fam = fams[family]
    by_name = {f['name']: f for fm in plan['families'] for f in fm['folders']}
    alts = [f for f in fam['folders'] if f['kind'] == '대안'] + [by_name[s] for s in fam.get('shared', []) if s in by_name]
    sellers = BOOK / '메타판매처'; kwmap = (load(sellers / '_키워드.json') or {}) | (load(sellers / '_키워드-추가.json') or {}) | (load(sellers / '_키워드-추가2.json') or {}) | (load(sellers / '_키워드-추가3.json') or {})   # 10-16 새 결핍 27개 키워드도
    fam_dir = BOOK / '묶음' / family; fam_dir.mkdir(parents=True, exist_ok=True)
    vid_md = [f'# {family} — 결핍별 의사·설명 영상 받아쓰기(발췌, 영상당 앞 2,500자)', '']
    for f in fam['folders']:
        if only and f['name'] != only: continue
        folder = BOOK / f['kind'] / f['name']; rec = load(folder / '수집기록.json') or {}
        rows = drop_noise(load(folder / '정제-목소리.json'), f['name']); vids = load(folder / '영상-원자료.json')
        if f.get('reuse_v2'): vids += [v for v in load(ROOT / '마케팅/프로젝트/DA-기획/기초분석-v2' / f['name'] / '영상-원자료.json') if v.get('transcript')]
        exp_rows = [r for r in rows if str(r.get('experience')) == 'True']; exp_texts = [r['text'] for r in exp_rows]
        alias = '|'.join(re.escape(a) for a in f['aliases'])
        L = [f"# {f['name']} — 재료 ({f['kind']}, 계열 {family})", '',
             f"- 수집: 정리 단위 {rec.get('units','-')} · 경험 {rec.get('experience','-')} · 목표 {rec.get('target','-')} · 받아쓴 영상 {sum(bool(v.get('transcript')) for v in vids)}/{len(vids)}",
             f"- 출처별 고유 단위: " + ', '.join(f"{k} {v.get('raw_unique')}" for k, v in (rec.get('sources') or {}).items()), '']
        if f['kind'] == '결핍':
            L += ['## 결핍이 얼마나 심한가 — 경험 발화 중 이 말을 한 비중(정규식 추정, 사장님 P6547)', ''] + table2(exp_rows, SEVERE)
            L += ['', '## 바라는 말 — "~만 되면", "~싶다"(그들의 언어) 인용 12', ''] + quotes(rows, 12, WISH)
            L += ['', '## 원인 단서 — 경험 발화 중 이 말을 한 비중(정규식 추정)', ''] + table2(exp_rows, CAUSE | CAUSE_BY.get(f['name'], {}))
            alt_pats = {a['name']: '|'.join(re.escape(x) for x in a['aliases']) for a in alts}
            L += ['', '## 대안 언급 — 경험 발화 중 그 대안을 말한 비중', ''] + table2(exp_rows, alt_pats, '대안', sort=True)
            L += ['', '## 목소리 인용 40', ''] + quotes(rows, 40)
            rv_folders = [f['name']] + (['주름공통'] if family == '주름윤곽' else [])
            rv = reviews_summary(rv_folders, alias)
            L += ['', '## 쿠팡 산 사람 후기(사장님이 받아 준 파일)', ''] + (rv or ['- 아직 없음(후기 대기)'])
            mt = meta_texts(kwmap.get(f['name'], f['aliases'][:1]) + [f['name']])
            L += ['', f'## 매대 — 이 결핍 메타 광고 {len(mt)}개에서 상징·제형이 나온 비율(정규식 추정)', '', '| 상징 | 광고 수 | % |', '|---|---:|---:|']
            syms = {s: re.escape(s) for s in SYMBOLS} | {a['name']: alt_pats[a['name']] for a in alts}   # 계열 대안(프락셀·피코 등)도 상징으로 센다(10-16)
            L += [f'| {k} | {n} | {p} |' for k, n, p in sorted(share(mt, syms), key=lambda x: -x[1]) if n]
            L += ['', '| 제형 | 광고 수 | % |', '|---|---:|---:|'] + [f'| {k} | {n} | {p} |' for k, n, p in sorted(share(mt, FORMS), key=lambda x: -x[1]) if n]
            L += ['', '## 오래 돈 광고 상위 12(게재일 순, 같은 문구는 한 번) — 오래 돈 소재가 돈을 번 소재', ''] + long_running(12)
            sp = sellers / f"{f['name']}.md"
            if sp.exists(): L += ['', '## 메타 판매처 순위(광고 수·최장 게재일)', ''] + sp.read_text(encoding='utf-8').splitlines()[4:22]
            vid_md += [f"## {f['name']}", ''] + transcript_snips(vids, '의사·설명', 1500, 20) + ['']
        else:
            L += ['## 타겟 인식 — 경험 발화 중 이 말을 한 비중(정규식 추정)', ''] + table2(exp_rows, PERCEPT | PERCEPT_BY.get(f['name'], {}), '인식')
            L += ['', '## 목소리 인용 25', ''] + quotes(rows, 25)
            L += ['', '## 영상 발췌(의사·설명 / 경험)', ''] + transcript_snips(vids, None, 1800, 3)
        (folder / '_재료.md').write_text('\n'.join(L) + '\n', encoding='utf-8')
        print('재료', f['kind'], f['name'], len('\n'.join(L)))
    if only: return
    (fam_dir / '_재료-영상.md').write_text('\n\n'.join(vid_md) + '\n', encoding='utf-8')
    print('영상 재료', family, len('\n\n'.join(vid_md)))

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else None)

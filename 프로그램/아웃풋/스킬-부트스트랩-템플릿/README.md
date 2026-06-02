# {{도구 이름}}

TODO: 한 줄 설명.

## 설치
```bash
pip install -r requirements.txt
cp api_keys.txt.example api_keys.txt   # 실제 키 입력
```

## 사용법

### 방법 1: 일괄 실행
```bash
bash hooks/run-pipeline.sh {{주제}} "{{인자}}"
```

### 방법 2: 단계별
```bash
cd scripts
export PYTHONIOENCODING=utf-8
python step1_example.py --title {{주제}} --out step1_out.json
# python step2_example.py --in step1_out.json
```

### 방법 3: Claude Code 스킬
```
{{트리거 발화}}
```
SKILL.md의 Phase A~C에 따라 자동 실행.

## 출력 파일
| 단계 | 파일 | 위치 |
|------|------|------|
| STEP 1 | `step1_out.json` | scripts/ |

## 트러블슈팅
- 한글 깨짐 → `set PYTHONIOENCODING=utf-8`
- 키 못 찾음 → `api_keys.txt` 가 루트 또는 scripts/ 에 있는지 확인

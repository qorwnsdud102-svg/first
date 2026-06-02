# {{도구-이름}} 프로젝트 컨텍스트

## 개요
TODO: 이 도구가 무엇을 자동화하는지 1~2줄.

## 폴더 구조
```
{{도구-이름}}/
├── SKILL.md            # 스킬 정의 (계획서)
├── CLAUDE.md           # 이 파일
├── README.md           # 사용법
├── requirements.txt
├── api_keys.txt.example
├── references/         # 상세 지식 (progressive disclosure)
├── hooks/              # pre-scan / run-pipeline / post-analyze
└── scripts/            # config.py + stepN_*.py (각 STEP 독립 CLI)
```

## 실행 순서
1. `hooks/pre-scan.sh` — 환경/키/의존성 점검
2. `scripts/step1_example.py` — STEP 1
3. (STEP 추가)
4. `hooks/post-analyze.sh` — 정리

또는 `hooks/run-pipeline.sh {{인자}}` 일괄 실행.

## API 키 위치
- `api_keys.txt` (프로젝트 루트 또는 scripts/ — config.py가 양쪽 탐색)

## 주의사항
- Windows: `set PYTHONIOENCODING=utf-8` 필수
- TODO: 이 도구 특유의 환경 함정 (서버 시간차·로그인 모달 등)

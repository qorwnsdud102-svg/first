---
name: "{{도구-이름}}"
description: "TODO: 한 줄로 무엇을 하는 스킬인지 + 트리거 발화 예시. 예: '...를 자동 발굴/분석한다. 트리거: \"키워드1\", \"/도구이름\", \"키워드2\".'"
---

# {{도구 이름}} 스킬

> TODO: 한 줄 요약 — 입력 → STEP1 → ... → 최종 산출물

## 실행 원칙 (절대 규칙)

1. **Phase A 입력 확인을 건너뛰지 말 것** — 필수 입력은 반드시 사용자에게 확인
2. **Phase B는 STEP 파이프라인 순차 실행** — 각 STEP 완료 후 다음 진행
3. **STEP 실패 시 N회 재시도** → 부분 결과라도 산출물 생성 (우아한 실패)
4. **출력 위치 명시** — 어디에 무엇이 떨어지는지 Phase C에서 보고
5. `PYTHONIOENCODING=utf-8` 필수 (Windows 한글)

---

## Phase A: 입력 수집 (AskUserQuestion 사용)

### 필수 입력
1. TODO: {{입력1}} — 설명
2. TODO: {{입력2}} — 설명

### 선택 입력 (기본값 있음)
```
TODO: 옵션 — 기본값
```

상세 파라미터·코드표가 필요하면 `references/`를 참조하도록 안내. (← progressive disclosure)

---

## Phase B: STEP 파이프라인 실행

### 사전 준비
```bash
export PYTHONIOENCODING=utf-8
cd {{스킬_폴더}}/scripts
```

### STEP 1: {{단계명}}
```bash
python step1_example.py --title "{{주제}}" --out step1_out.json
```
**산출물:** `step1_out.json` (다음 STEP의 입력 — 파일 핸드오프)
**판정 기준 상세:** `references/_상세지식-템플릿.md` 참조

### STEP 2: {{단계명}}
```bash
python step2_example.py --in step1_out.json
```
**산출물:** TODO

<!-- STEP 추가 -->

---

## Phase C: 완료 보고

```
완료!
  {{경로1}}     ← {{산출물1}}
  {{경로2}}     ← {{산출물2}}

{{핵심 수치 N개}}
```

---

## 에러 처리

- 키 미설정 → `api_keys.txt.example` 복사 안내
- STEP 실패 → N회 재시도, 실패 시 부분 결과로 계속
- 한글 깨짐 → `PYTHONIOENCODING=utf-8` 재확인

## 훅 연동

| 훅 | 파일 | 타이밍 |
|----|------|--------|
| pre-scan | `hooks/pre-scan.sh` | STEP 1 전 — 환경/키/의존성 점검 |
| run-pipeline | `hooks/run-pipeline.sh` | 전체 일괄 실행 |
| post-analyze | `hooks/post-analyze.sh` | 마지막 STEP 후 — 정리·안내 |

## 참조 문서

| 문서 | 경로 | 설명 |
|------|------|------|
| 상세 지식 | `references/_상세지식-템플릿.md` | TODO: 인증·임계값·코드표 |

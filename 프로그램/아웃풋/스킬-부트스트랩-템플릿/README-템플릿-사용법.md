# 스킬 부트스트랩 템플릿 — 사용법

> 새 자작 도구/자동화를 **폴더 복사로 시작**하는 빈 골격.
> 근거: vault `프로그램/wiki/concepts/파이프라인-스킬-패키지.md` (8 노하우) · 표본 `competitor-finder`.

## 시작하는 법 (3단계)

1. **이 폴더를 통째로 복사**하고 새 이름으로 바꾼다.
   ```powershell
   Copy-Item -Recurse "C:\claude\LLM-WIKI\프로그램\아웃풋\스킬-부트스트랩-템플릿" "C:\claude\<새-도구-이름>"
   ```
2. 각 파일의 `TODO:` 와 `{{플레이스홀더}}` 를 채운다 (아래 표 순서대로).
3. `bash hooks/pre-scan.sh` 로 환경부터 점검 → STEP 스크립트 작성/실행.

## 파일 ↔ 8 노하우 매핑

| 파일 | 채울 것 | 어느 노하우 |
|---|---|---|
| `SKILL.md` | Phase A(입력)·B(STEP)·C(보고) + 절대 규칙 | ① 계획 ② progressive disclosure |
| `references/*.md` | 무거운 상세(인증·임계값·코드표) | ② progressive disclosure |
| `scripts/stepN_*.py` | 각 단계 = `python xxx.py --args` 독립 CLI | ③ 이중 구동 ④ 파일 핸드오프 |
| `scripts/config.py` | 키 로드·인증·공통 상수 | ⑥ 정책=데이터 ⑧ 가정 명시 |
| `hooks/pre·run·post` | 환경 게이트·오케스트레이션·정리 | ⑦ 훅 wrapping ⑤ 우아한 실패 |
| `api_keys.txt.example` | 키 템플릿(실값은 `api_keys.txt`, gitignore) | ⑧ 비밀값 분리 |
| `README.md` / `CLAUDE.md` | 사람용 사용법 / 프로젝트 컨텍스트 | — |

## 8 노하우 체크리스트 (만들면서 확인)

- [ ] **① 계획**: SKILL.md는 "무엇을 언제"만. "어떻게"는 코드/references로.
- [ ] **② progressive disclosure**: 무거운 지식은 references/로 빼고 SKILL.md는 한 줄로 가리킴.
- [ ] **③ 이중 구동**: 각 STEP가 사람 CLI로도, Claude 오케스트레이션으로도 돈다.
- [ ] **④ 파일 핸드오프**: STEP끼리 전역 상태 없이 파일(json/xlsx)로만 손잡음 → 중간 재실행 가능.
- [ ] **⑤ 우아한 실패**: 재시도 N회 → 부분 결과라도 산출. 한 STEP 실패가 전부를 날리지 않음.
- [ ] **⑥ 정책=데이터**: 제외 리스트·임계값·접미사는 상수/리스트로. 카테고리 바꿔도 본문 안 건드림.
- [ ] **⑦ 훅 wrapping**: pre(게이트)→run(오케스트레이션)→post(정리)로 파이프라인을 감쌈.
- [ ] **⑧ 가정 명시**: 인코딩·시간차·키 경로 같은 환경 함정을 코드+트러블슈팅 양쪽에.

## 안 맞을 때 (과설계 주의)

단발성 스크립트·1-STEP 작업이면 이 풀 패키지는 과하다. [[karpathy-guidelines]] Simplicity First — **다단계 + 반복 실행 + 자산화**할 작업에만 이 골격을 쓴다. 한 번 쓰고 버릴 건 그냥 스크립트 하나로.

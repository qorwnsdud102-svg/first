# _setup/ — 새 PC에서 "고도화된 클로드"를 한 번에 셋업

> 볼트(git)는 **지식**을 동기화한다. 하지만 `~/.claude/`(글로벌 CLAUDE.md·hook)는 볼트 밖이라
> git으로 안 따라간다. 그래서 이 폴더의 정본 + 설치 스크립트를 두고, 새 PC에서 한 번 실행한다.

## 파일

| 파일 | 정체 |
|---|---|
| `claude-global.md` | **정본**(single source of truth). 모든 세션에 자동 로드될 `~/.claude/CLAUDE.md`의 원본. 5인 사이클·karpathy 4원칙·병렬 디폴트·파이프라인 스킬 패키지 포인터. |
| `check-claudemd-sync.ps1` | 드리프트 가드 hook 본체. 라이브 `~/.claude/CLAUDE.md`가 정본과 어긋나면 경고. |
| `install.ps1` | 부트스트랩. 정본을 `~/.claude/CLAUDE.md`로 복사 + 드리프트 hook을 `settings.json`에 병합(멱등). |

## 새 PC 셋업 (3단계)

```powershell
# 1) 볼트 받기 (이미 받았으면 pull)
git clone https://github.com/qorwnsdud102-svg/first.git C:\claude\LLM-WIKI
#   또는:  cd C:\claude\LLM-WIKI ; git pull

# 2) 부트스트랩 실행 (글로벌 CLAUDE.md + 드리프트 hook 설치)
powershell -NoProfile -ExecutionPolicy Bypass -File C:\claude\LLM-WIKI\_setup\install.ps1

# 3) 새 터미널 열기 (또는 Claude Code에서 /hooks 한 번)  -> 적용 완료
```

> **경로 가정**: 볼트를 `C:\claude\LLM-WIKI`에 둔다고 가정(이 PC와 동일). 다른 위치면
> install.ps1이 자동으로 그 위치 기준($PSScriptRoot)으로 hook 경로를 박으므로 그대로 동작한다.

## 평소 운영 (드리프트 안 나게)

- **정본을 바꾸고 싶다** → `_setup/claude-global.md`를 고치고 → `install.ps1` 다시 실행 → commit/push.
- **라이브 `~/.claude/CLAUDE.md`를 직접 고쳤다** → 같은 내용을 `_setup/claude-global.md`에 반영하고 commit.
- 둘이 어긋난 채 파일을 저장하면 hook이 경고를 띄운다(Edit/Write 시 자동 점검).

## 동기화 흐름 한 장

```
정본(_setup/claude-global.md)  --git push/pull-->  다른 PC의 같은 파일
        |  install.ps1 (PC마다 1회)
        v
~/.claude/CLAUDE.md  =  모든 세션 자동 로드  =  "어디서나 노하우 아는 클로드"
        ^
        |  check-claudemd-sync.ps1 (Edit/Write 시 자동) -> 어긋나면 경고
```

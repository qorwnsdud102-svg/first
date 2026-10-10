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

## 스킬·플러그인 설치 (superpowers·karpathy-guidelines 등)

> 2026-10-06 위키에서 이곳으로 모음 — 전에는 `Claude-Skill`·`스킬-스코프`·`karpathy-guidelines`·`superpowers`·`ccfm-video-appeal` 위키 페이지마다 같은 절차가 따로 적혀 있었다. 설치 절차는 **여기 한 곳**만 고친다. 왜 이 스킬들인지(5인 역할 매핑·cherry-pick 이유)는 위키 `프로그램/wiki/concepts/Claude-Skill.md`.

**원칙 (2026-10-06 갱신)**: superpowers는 **플러그인 통설치(14스킬)** + karpathy-guidelines 1스킬. 실제 운영 PC가 통설치로 돌고 있고, 5역할 외 9스킬(서브에이전트 실행·병렬 조사·디버깅)도 실제로 쓰인다. 옛 방침(5스킬만 cherry-pick)은 아래 §옛 방식에 남겨 둔다.

### 설치 — superpowers 플러그인 (현행)

Claude Code에서:
```
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```
(또는 `/plugin install superpowers@claude-plugins-official`). 확인: 새 세션에서 스킬 목록에 `superpowers:brainstorming` 등 14개가 보이면 OK. 설치 위치 예: `~/.claude/plugins/cache/superpowers-dev/superpowers/<버전>/skills/`.

### 옛 방식 — 5스킬만 cherry-pick (2026-05 방침, 참고용)

#### 점검 (먼저 깔려있는지 확인)

```
ls ~/.claude/skills/
```
또는 PowerShell:
```
ls "$env:USERPROFILE\.claude\skills"
```
→ 다음 6개 폴더가 다 보이면 OK:
`brainstorming` · `writing-plans` · `verification-before-completion` · `requesting-code-review` · `writing-skills` · `karpathy-guidelines`

빠진 게 있으면 아래 설치 절차.

#### 설치 — 5역할 스킬 (cherry-pick from obra/superpowers)

**Bash / macOS / Linux**:
```bash
git clone https://github.com/obra/superpowers.git /tmp/sp
mkdir -p ~/.claude/skills
for s in brainstorming writing-plans verification-before-completion requesting-code-review writing-skills; do
  cp -r /tmp/sp/skills/$s ~/.claude/skills/
done
rm -rf /tmp/sp
```

**PowerShell / Windows**:
```powershell
$tmp = "$env:TEMP\sp"
git clone https://github.com/obra/superpowers.git $tmp
$dst = "$env:USERPROFILE\.claude\skills"
New-Item -ItemType Directory -Force -Path $dst | Out-Null
'brainstorming','writing-plans','verification-before-completion','requesting-code-review','writing-skills' |
  ForEach-Object { Copy-Item -Recurse "$tmp\skills\$_" $dst }
Remove-Item -Recurse -Force $tmp
```

저장소 layout은 `skills/<이름>/SKILL.md` (일부는 보조 파일 동반) — cherry-pick할 때 **폴더 통째로** 복사 (SKILL.md만 X).

(옛 방침의 이유: 14개 다 들어오면 안 쓰는 9개가 자동 발동할 거라는 우려. 실제 운영에선 9개도 쓸모가 커서 통설치로 바뀜.)

### 설치 — karpathy-guidelines (1스킬, 베이스라인 규범)

karpathy-guidelines는 저장소 자체가 1스킬만 들어있어 cherry-pick·플러그인 어느 쪽이든 같은 결과. 가장 단순한 cherry-pick:

**Bash**:
```bash
git clone https://github.com/multica-ai/andrej-karpathy-skills.git /tmp/kg
cp -r /tmp/kg/skills/karpathy-guidelines ~/.claude/skills/
rm -rf /tmp/kg
```

**PowerShell**:
```powershell
$tmp = "$env:TEMP\kg"
git clone https://github.com/multica-ai/andrej-karpathy-skills.git $tmp
Copy-Item -Recurse "$tmp\skills\karpathy-guidelines" "$env:USERPROFILE\.claude\skills\"
Remove-Item -Recurse -Force $tmp
```

### 설치 확인

```
ls ~/.claude/skills/
```
(옛 cherry-pick 방식일 때) 6개 폴더 다 보이면 끝. 통설치면 `karpathy-guidelines` 폴더 + 스킬 목록의 `superpowers:*` 14개. 작동 확인은 **새 터미널**에서 `claude` 띄우고 `/skills` 또는 임의 발화로 테스트(예: 임의 프로젝트에서 `brainstorming` 스킬이 호출 가능한지).
- 스킬 인덱스는 **세션 시작 시점**에 잠긴다 — 같은 세션에 새 SKILL.md를 떨궈도 반영 안 됨. 설치 직후엔 항상 새 터미널.

### 글로벌 CLAUDE.md (5인 사이클 메타 프레임)

위 6스킬만 깔면 **스킬 본체는 작동**하지만, "5인 역할분담"이라는 메타 프레임은 vault 위키 안에만 있어 vault 밖 프로젝트 세션엔 안 보임. → 위 §새 PC 셋업의 `install.ps1`이 정본 `claude-global.md`를 `~/.claude/CLAUDE.md`로 설치한다.

**수동 폴백** (install.ps1 못 쓰는 환경): `_setup/claude-global.md`를 복사해 `~/.claude/CLAUDE.md`로 저장.
- PowerShell: `Copy-Item C:\claude\LLM-WIKI\_setup\claude-global.md "$env:USERPROFILE\.claude\CLAUDE.md"`
- Bash: `cp _setup/claude-global.md ~/.claude/CLAUDE.md`

**작동 확인**: 새 터미널 열고 임의 폴더(vault 밖 OK)에서 `claude` 띄운 뒤 "5인 역할분담 알아?" → 5인(bob·dd·harness·eval·learnings engine) 답변 나와야 정상.

### 5역할 외 9스킬

executing-plans · systematic-debugging · receiving-code-review · test-driven-development · finishing-a-development-branch · using-superpowers · using-git-worktrees · dispatching-parallel-agents · subagent-driven-development — 통설치면 자동 포함. (옛 cherry-pick 방식을 쓰는 PC라면 필요할 때 같은 방식으로 1개씩 추가.)

### 배포받은 스킬 — ccfm-video-appeal (CCFM EDU)

- 폴더 통째로 `~/.claude/skills/ccfm-video-appeal/` → 새 세션에서 `/ccfm-video-appeal 처음 쓰는데 어떻게 하면 돼?`
- Claude 웹: Customize → Skills → Upload a skill (ZIP 그대로). Codex: `%USERPROFILE%\.agents\skills\ccfm-video-appeal\`.
- 원본: `프로그램/raw/ccfm-edu/2026-09-22_CCFM-EDU_ccfm-video-appeal/` (설치 경로·검증 범위는 그 안 `사용법.md`).
- 설치 이력(어느 PC에 언제 깔았나)은 `프로그램/프로젝트/운영-공통/스킬-설치-이력.md`.

### 배포받은 스킬 — ccfm-review-messages (CCFM EDU)

- 폴더 통째로 `~/.claude/skills/ccfm-review-messages/` (SKILL.md·references 함께) → `/ccfm-review-messages 첨부 엑셀에서 광고 메시지 찾아줘`
- 원본: `프로그램/raw/ccfm-edu/2026-10-01_CCFM-EDU_ccfm-review-messages/` (설치 안 될 때는 그 안 `프롬프트대안.txt`).

### Matt Pocock 스킬 3개 골라 담기 — grill-me·research·handoff

플러그인 통설치(`mattpocock-skills@claude-plugins-official`, 25스킬)는 **하지 않는다** — tdd·code-review 등이 superpowers와 겹친다(이유: 위키 `Claude-Skill` §외부 스킬 후보). 대신 폴더 4개만 복사:

```bash
git clone https://github.com/mattpocock/skills.git /tmp/mp && cd /tmp/mp && git checkout c55ee46073ed923f86ce59a5eb3b6d895095d1b7
cp -r skills/productivity/grill-me skills/productivity/grilling skills/engineering/research skills/productivity/handoff ~/.claude/skills/
```

- `grill-me`는 `grilling`을 부르는 껍데기 → 둘 다 필요. 호출: `/grill-me <계획>` · `/handoff <다음 할 일>` (둘 다 직접 불러야 켜짐) · research는 "조사해서 문서로 저장해줘"로 자동.
- sha는 2026-10-10 공식 마켓플레이스가 가리키던 커밋. 올릴 땐 새 SKILL.md를 먼저 읽는다.

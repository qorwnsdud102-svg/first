# -*- coding: utf-8 -*-
"""방식 점검(사장님 2026-10-14): 감사관 GPT가 지금까지의 개선 히스토리를 분석·점검·평가하고(히스토리-평가.md),
설계자 GPT가 방법서를 쓰고, 별도 비판자 GPT가 반박한다. 통과할 때까지 고쳐 쓴다(최대 4판).
각 창은 새 codex exec(gpt-6-astra ultra, 읽기 전용). 설계자만 웹 검색을 쓴다(자기 개선 방법론 참고용).
사용: python run.py            # 묶음 → 히스토리 평가 → v1부터
      python run.py --from 2   # 방법서-v1·비판-v1이 있으면 v2부터 이어서"""
import glob, json, os, re, shutil, subprocess, sys, time
sys.stdout.reconfigure(encoding="utf-8")
H = os.path.dirname(os.path.abspath(__file__))
W = r"C:\claude\LLM-WIKI"
B = W + r"\마케팅\프로젝트\DA-기획\기획-시스템"
A = B + r"\자가학습"
RAW = W + r"\마케팅\raw\본인"
MODEL, EFFORT = "gpt-6-astra", "ultra"  # 사장님 지정(이번 점검만)
MAX_V, PASS = 4, 8
D = os.path.join(H, "묶음")

FILES = {
    "목표.md": os.path.join(H, "목표.md"),
    "시스템-현황.md": os.path.join(B, "시스템-현황.md"),
    "학습-방식-v2.md": os.path.join(B, "학습-방식-v2.md"),
    "학습-방식-v3.md": os.path.join(B, "학습-방식-v3.md"),
    "학습일지.md": os.path.join(B, "학습일지.md"),
    "생각-순서.md": os.path.join(A, "경험", "생각-순서.md"),
    "정본-DA기획-단계별-규칙.md": os.path.join(W, "마케팅", "wiki", "syntheses", "DA 기획 단계별 규칙.md"),
    "방법정답지.md": os.path.join(A, "히트해부", "방법정답지.md"),
    "드릴-하는-법.md": os.path.join(A, "상징짝-드릴", "_드릴-하는-법.md"),
    "역기획-1회차-집계.md": os.path.join(A, "역기획-시험", "1회차", "집계.md"),
    "드릴8-카드-10.json": os.path.join(A, "상징짝-드릴", "8회차", "카드-10.json"),
    "드릴8-예측-10.json": os.path.join(A, "상징짝-드릴", "8회차", "예측-10.json"),
    "지식카드-예시-족저근막염.md": os.path.join(A, "결핍지식", "족저근막염.md"),
    "경험카드.jsonl": os.path.join(A, "경험", "경험카드.jsonl"),
    "기획자-비교-계획.md": os.path.join(A, "기획자-비교", "_계획.md"),
    "AGENTS.md": os.path.join(W, "AGENTS.md"),
}
SKIP_OLD = {"시스템-현황.md", "학습-방식-v2.md", "학습-방식-v3.md", "학습일지.md"}

HISTORY = """너는 감사관이다. 사장님과 Claude·GPT가 'DA 제품 기획 모델'을 만들려고 2026-10-08~14에 시도하고 바꿔 온 것을 시간순으로 분석·점검·평가하라. 이 폴더의 파일만 근거로 쓴다.

먼저 `목표.md`를 읽어라. 자료는 다음과 같다.
- `커밋-기록.txt`: 시간순 커밋 메시지로, 무엇을 언제 바꿨는지 보여 준다.
- `옛-설계/`: 단계마다 쓴 설계·인계·상태 문서다.
- `학습일지.md`, `시스템-현황.md`(§5·§6·§7)
- `사장님-원문/`: 2026-10-10~14 사장님의 판정·지시 원문이다.
- `드릴-하는-법.md`(회차 결과표), `역기획-1회차-집계.md`, `경험카드.jsonl`

산출: '히스토리 평가' 한 편(마크다운, 한국어, 쉬운 말).
1. 시간표: 단계마다 무엇을 시도했나, 왜 시작했고 무엇을 기대했나, 결과는 무엇이었나(숫자), 끝까지 갔나, 왜 바뀌었나, 누가 바꿨나(사장님 지시·Claude 판단·GPT 제안).
2. 시도별 평가: 효과 있음 / 효과 없음 / 모름(측정 안 됨이나 비교 불가) 중 하나와 그 근거.
3. 패턴
   - 왜 방식이 계속 바뀌었나(근본 원인)
   - 반복된 실수
   - 조건이 달라 비교가 안 됐던 측정
   - 사장님 피드백이 모델에 반영된 길과 끊긴 곳
   - 토큰을 어디에 써서 무엇을 얻었나
4. 살릴 것: 효과가 실제로 확인된 것.
5. 교훈: 다음 방법이 반드시 지켜야 할 것 5~10개.
주장마다 근거 파일이나 커밋 시각을 붙인다. 마지막 답은 본문만 쓴다."""

DESIGN = """너는 이 프로젝트의 방법 설계자다. 이 폴더의 파일만 근거로 쓴다(웹 검색은 LLM 기반 생성기를 사람 피드백·자가 평가로 개선하는 알려진 방법을 참고할 때만 쓰고, 쓴 곳을 표시한다).

먼저 `목표.md`를 읽어라. 사장님의 목표는 '토큰과 사장님 피드백을 써서 회차가 갈수록 더 좋은 DA 제품 기획을 내는 모델'이고, 사장님 피드백이 없을 때도 스스로 나아져야 한다. 지금은 방식이 계속 바뀌고 끝까지 가는 것이 없어, 모델이 고도화되는 느낌이 없다.
그다음 `히스토리-평가.md`(감사관이 지금까지의 시도를 평가한 것)와 `시스템-현황.md`로 지금까지를 파악하라. 필요한 만큼 나머지 파일(사장님-원문/, 학습일지, 드릴 결과, 경험 장부, 정본, 방법정답지, 역기획 집계)을 읽어 증거를 모은다.

할 일: 근본부터 점검하고, 목표를 이루는 **하나의 방법**을 설계한 '방법서'를 써라. 이 방법서는 앞으로 몇 주 동안 바꾸지 않고 끝까지 돌릴 기준이 된다.

방법서 목차(마크다운, 한국어, 쉬운 말):
0. 한 줄 결론
1. 근본 진단 — 지금 방식이 모델을 고도화하지 못한 원인(히스토리 평가의 교훈을 어떻게 받는지 포함). 회차 점수·시험 결과·사장님 원문을 파일과 함께 인용한다. '느낌'이 아니라 증거로.
2. '모델'의 정의 — 무엇이 기획을 만들고, 무엇이 쌓이고, 무엇이 바뀌면 모델이 좋아진 것인가(예: 기획자·참고 자료·사례·규칙·평가자 중 무엇).
3. 학습 루프 — 사장님 피드백 한 건이 모델의 어디를 어떻게 바꾸나. 자가 학습(사장님 없이)은 어떤 신호로 배우나(히트 제품 정답지·역기획·자체 평가 등). 그 신호를 믿어도 되는 이유와 한계.
4. 평가 — 모델이 실제로 좋아졌는지 무엇으로 재나. 회차 사이 조건을 어떻게 같게 두나(고정 시험셋, 같은 결핍, 같은 모델). 우연한 변동과 진짜 개선을 어떻게 구분하나.
5. 운영 — 한 회차의 흐름. 누가(GPT·Claude·사장님) 무엇을 하나. 사장님 하루 10분, 토큰 실측과 예상.
6. 고정할 것과 바꿔도 되는 것 — 방식이 계속 바뀌는 문제를 막는 변경 규칙: 무엇을, 어떤 근거가 쌓였을 때만, 누가 바꾸나.
7. 첫 2주 실행 계획 — 날짜별 할 일, 성공 기준(숫자), 중단·되돌림 조건.
8. 지금 있는 것 중 버릴 것과 남길 것 — 파일·부품 이름으로.
9. 가정과 위험.

지킬 것:
- `목표.md`의 제약(사장님 시간·역할·도구·토큰·정본 규칙)을 어기는 방법은 쓰지 않는다. 어겨야만 한다면 그 이유와 대안을 따로 적는다.
- '드릴 1(Claude 기획자) 7.7 vs GPT 3~5점대' 단서를 반드시 다룬다.
- 복잡한 장치보다, 실제로 끝까지 돌릴 수 있는 단순한 방법을 우선한다.
- 마지막 답은 방법서 본문만 쓴다."""

REVISE = """너는 방법 설계자다. `목표.md`, `히스토리-평가.md`, `방법서-v{p}.md`(네가 쓴 이전 판), `비판-v{p}.md`(독립 비판자의 반박)를 읽어라. 필요하면 다른 파일도 다시 확인한다.
비판을 반영해 `방법서` v{n}을 다시 써라. 목차는 이전 판과 같다. 맨 끝에 '## 10. 비판 반영표'를 붙여, 비판 항목마다 '반영(어디를 어떻게)' 또는 '반영 안 함(이유)'을 한 줄씩 적는다.
비판이 틀렸다고 보면 증거와 함께 반박해도 된다. 비판을 다 받아들이려고 방법을 복잡하게 만들지 마라 — 끝까지 돌릴 수 있는 단순한 방법이 우선이다.
마지막 답은 방법서 본문만 쓴다."""

CRITIC = """너는 독립 비판자다. 설계자와 다른 사람이고, 이 방법서가 사장님의 목표를 이루지 못할 이유를 찾는 것이 일이다. 칭찬은 필요 없다.
`목표.md`를 먼저 읽고, `방법서-v{n}.md`를 읽어라. 주장마다 이 폴더의 근거 파일(히스토리-평가·시스템-현황·학습일지·사장님-원문·드릴 결과·경험 장부·역기획 집계·정본)과 대조한다.{prev}

다섯 렌즈로 반박한다:
1. 인과 — 이 방법을 돌리면 정말 기획 점수가 오르나? 오른다는 연결 고리 중 증거 없는 고리는?
2. 측정 — 개선을 속지 않고 잴 수 있나? 결핍·선발·모델이 달라 비교가 안 되는 곳, 표본이 작아 우연과 구분 안 되는 곳은?
3. 반복 — 이미 실패하거나 대체된 방식(`히스토리-평가.md`, `시스템-현황.md` §6, `학습일지.md`)을 이름만 바꿔 다시 하지 않나?
4. 실행 — 사장님 하루 10분, 토큰, 도구(codex exec는 읽기 전용·네트워크 없음 등), 역할 제약 안에서 끝까지 돌아가나?
5. 단순성 — 더 단순하게 같은 효과를 낼 수 있나? 빼도 되는 장치는?

출력(마크다운, 한국어):
- 치명 결함: 이것이 남으면 목표를 못 이루는 것. 번호, 근거 파일, 고칠 방향.
- 중요 결함: 고치면 확실히 나아지는 것.
- 작은 결함: 한 줄씩.
- 이 방법서가 맞게 짚은 것(다음 판에서 지켜야 할 것) 세 줄 안쪽.
마지막 세 줄은 정확히 이 형식이다:
판정: 통과 또는 수정
점수: 1~10 사이 정수 (목표를 이룰 가능성)
치명: 치명 결함 개수"""


def bundle():
    if os.path.isdir(D):
        shutil.rmtree(D)
    os.makedirs(os.path.join(D, "사장님-원문"))
    os.makedirs(os.path.join(D, "옛-설계"))
    for name, src in FILES.items():
        shutil.copy(src, os.path.join(D, name))
    for day in ("10", "11", "12", "13", "14"):
        for p in glob.glob(os.path.join(RAW, "2026-10-" + day + "*")):
            shutil.copy(p, os.path.join(D, "사장님-원문", os.path.basename(p)))
    for p in glob.glob(os.path.join(B, "*.md")) + glob.glob(os.path.join(B, "plans", "*.md")):
        if os.path.basename(p) not in SKIP_OLD:
            shutil.copy(p, os.path.join(D, "옛-설계", os.path.basename(p)))
    for pat in ("README.md", "_상태.md", "_계획.md"):
        for p in glob.glob(os.path.join(A, "*", pat)):
            shutil.copy(p, os.path.join(D, "옛-설계", "자가학습-" + os.path.basename(os.path.dirname(p)) + "-" + pat))
    log = subprocess.run(["git", "-C", W, "log", "--date=format:%m-%d %H:%M", "--format=%ad %s", "--since=2026-10-08", "--",
                          "마케팅/프로젝트/DA-기획", "마케팅/wiki/syntheses", "프로그램/아웃풋/da-planning"],
                         capture_output=True, text=True, encoding="utf-8").stdout
    open(os.path.join(D, "커밋-기록.txt"), "w", encoding="utf-8").write("\n".join(reversed(log.splitlines())) + "\n")
    print("묶음 파일", len(os.listdir(D)), "· 원문", len(os.listdir(os.path.join(D, "사장님-원문"))),
          "· 옛 설계", len(os.listdir(os.path.join(D, "옛-설계"))), "· 커밋", len(log.splitlines()), flush=True)


def codex(prompt, out, search):
    exe = sorted(glob.glob(os.path.join(os.environ["LOCALAPPDATA"], "OpenAI", "Codex", "bin", "*", "codex.exe")))[-1]
    cmd = [exe] + (["--search"] if search else []) + ["exec", "--skip-git-repo-check", "--ephemeral", "-s", "read-only", "-m", MODEL,
                                                    "-c", f'model_reasoning_effort="{EFFORT}"', "-C", D, "-o", out, "-"]
    t = time.time()
    r = subprocess.run(cmd, input=prompt, text=True, encoding="utf-8", capture_output=True)
    m = re.findall(r"tokens used[^\d]*([\d,]+)", (r.stderr or "") + (r.stdout or ""), re.I)
    tok = int(m[-1].replace(",", "")) if m else None
    assert os.path.exists(out) and os.path.getsize(out) > 500, (out, (r.stderr or "")[-1500:])
    return tok, round((time.time() - t) / 60, 1)


def main():
    start = int(sys.argv[sys.argv.index("--from") + 1]) if "--from" in sys.argv else 1
    up = os.path.join(H, "사용량.json")
    use = json.load(open(up, encoding="utf-8")) if os.path.exists(up) else {}
    if start == 1:
        bundle()
        hist = os.path.join(H, "히스토리-평가.md")
        use["히스토리"] = codex(HISTORY, hist, search=False)
        json.dump(use, open(up, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print("히스토리 평가", use["히스토리"], flush=True)
    shutil.copy(os.path.join(H, "히스토리-평가.md"), os.path.join(D, "히스토리-평가.md"))
    for n in range(start, MAX_V + 1):
        doc = os.path.join(H, f"방법서-v{n}.md")
        prompt = DESIGN if n == 1 else REVISE.format(p=n - 1, n=n)
        for f in ([f"방법서-v{n - 1}.md", f"비판-v{n - 1}.md"] if n > 1 else []):
            shutil.copy(os.path.join(H, f), os.path.join(D, f))
        use[f"설계-v{n}"] = codex(prompt, doc, search=True)
        print(f"방법서 v{n}", use[f"설계-v{n}"], flush=True)
        shutil.copy(doc, os.path.join(D, f"방법서-v{n}.md"))
        crit = os.path.join(H, f"비판-v{n}.md")
        prev = "" if n == 1 else f"\n이전 판 `방법서-v{n - 1}.md`와 `비판-v{n - 1}.md`도 있다. 지난 치명 결함이 정말 고쳐졌는지, 반영표의 '반영 안 함' 이유가 타당한지 확인한다."
        use[f"비판-v{n}"] = codex(CRITIC.format(n=n, prev=prev), crit, search=False)
        json.dump(use, open(up, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        t = open(crit, encoding="utf-8").read()
        sc = re.findall(r"점수:\s*(\d+)", t)
        fat = re.findall(r"치명:\s*(\d+)", t)
        sc, fat = (int(sc[-1]) if sc else 0), (int(fat[-1]) if fat else 99)
        print(f"비판 v{n}", use[f"비판-v{n}"], "점수", sc, "치명", fat, flush=True)
        if sc >= PASS and fat == 0:
            print("통과 — 최종 방법서", doc, flush=True)
            break
    else:
        print("최대 판까지 통과 못 함 — 마지막 판과 비판을 사장님께", flush=True)
    print("토큰 합계", sum((v[0] or 0) for v in use.values()), flush=True)


main()

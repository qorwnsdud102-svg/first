# -*- coding: utf-8 -*-
"""check_plan — 기획서 제출 전 검사(출발점 근거·규칙 번호·채점표·하드)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "scripts"))

from check_plan import check_plan, rule_table, section, main

BOOK = "\n".join([
    "# DA 기획 단계별 규칙",
    "## ② 출발점",
    "- ②-01 🔒 하드 | 출발점 근거가 없는 기획은 내지 않는다 | P6001",
    "## ④ 상징·당위",
    "- ④-07 🔒 하드 | 국가를 떼면 남는 축이 없으면 탈락 | 판정 룰 §5-B",
    "- ④-12 🔒 경고 | 과거에 쓴 상징재도 다시 쓴다 | P6031",
    "## ⑤ 사업성",
    "- ⑤-03 📊 경고 | 원가율은 약 10% | P6040",
    "## ⑩ 학습",
    "- ⑩-05 🧪 경고 | 🧪 규칙은 Claude가 고친다 | 설계 §2-2",
])
AD = ["- 종류: 오래 돈 광고",
      "- 광고: joodocworld.1 · 장벽박사 클렌징 듀오 · 게재 179일 · 라이브러리 ID: 952907087430431",
      "- 범위 단계: 1 — 민감·홍조 클렌징 시장"]
CARD = "마케팅/프로젝트/DA-기획/기초분석/주사피부염/시장카드.md"
SYMBOL = ["- 종류: 유명 상징재", "- 상징재: 아쿠아필",
          "- 인지 근거: 네이버 월간 검색량 '아쿠아필' 24,250 (2026-10-10)",
          "- 범위 단계: 1 — 블랙헤드 팩 시장"]
JUDGE = ["| ④ 상징·당위 | 통과 | ④-07 | 국가를 떼도 장벽 축이 남는다 |"]
SCORE_ROWS = ["① 기초분석", "② 출발점", "③ 결핍 카드", "④ 상징·당위", "⑤ 참신함",
              "⑥ 사업성", "⑦ 기획서", "⑧ 현실 보정", "⑨ 범위 확장", "⑩ 학습"]
V1_SCORE_ROWS = ["① 기초분석", "② 출발점", "③ 결핍 카드", "④ 상징·당위",
                 "⑤ 사업성", "⑥ 기획서", "⑦ 범위 확장", "⑧ 학습"]


VOICE_PATH = "마케팅/프로젝트/DA-기획/기초분석/주사피부염/목소리-비중표.md"
VOICE = f"- 목소리: {VOICE_PATH}"


def make_plan(start=AD, judge=JUDGE, score=True, tail=None, rows=SCORE_ROWS, pitch="한 줄: 바르는 장벽", voice=True):
    parts = ["# 장벽 클렌징 밤 — DA 기획서", ""] + ([pitch, ""] if pitch else [])
    parts += ["## 제품", "- 무엇을: 약산성 클렌징 밤 100g", ""]
    if start is not None:
        parts += ["## 출발점 근거"] + list(start) + ([VOICE] if voice else []) + [""]
    parts += ["## 단계별 판정", "| 단계 | 판정 | 걸린 규칙 번호 | 근거 한 줄 |", "|---|---|---|---|"]
    parts += list(judge) + [""]
    if tail:
        parts += list(tail) + [""]
    if score:
        parts += ["## 사장님 채점", "| 단계 | 틀림 ✔ | 한 줄 |", "|---|---|---|"]
        parts += [f"| {s} | | |" for s in rows]
    return "\n".join(parts) + "\n"


def test_정본에서_규칙_강도를_읽는다():
    assert rule_table(BOOK) == {"②-01": "하드", "④-07": "하드", "④-12": "경고", "⑤-03": "경고", "⑩-05": "경고"}


def test_절을_제목으로_읽는다():
    assert section("# t\n## 가\n- a\n## 나\n- b\n", "가") == ["- a"]
    assert section("# t\n## 가\n- a\n", "다") is None


def test_오래_돈_광고_ID가_근거면_통과():
    assert check_plan(make_plan(), BOOK) == []


def test_시장카드_경로도_근거로_인정():
    start = [f"- 시장 카드: {CARD}", "- 범위 단계: 1"]
    assert check_plan(make_plan(start=start), BOOK, exists=lambda p: True) == []


def test_없는_시장카드는_실패():
    start = [f"- 시장 카드: {CARD}", "- 범위 단계: 1"]
    assert check_plan(make_plan(start=start), BOOK, exists=lambda p: p != CARD) == [f"① 시장 카드 파일 없음: {CARD}"]


def test_유명_상징재와_숫자_인지근거면_통과():
    assert check_plan(make_plan(start=SYMBOL), BOOK) == []


def test_인지근거에_숫자가_없으면_실패():
    start = ["- 종류: 유명 상징재", "- 상징재: 아쿠아필", "- 인지 근거: 다들 안다", "- 범위 단계: 1"]
    assert any("출발점 근거 없음" in e for e in check_plan(make_plan(start=start), BOOK))


def test_출발점_근거_절이_없으면_실패():
    assert any("출발점 근거 절" in e for e in check_plan(make_plan(start=None), BOOK))


def test_범위_단계가_없으면_실패():
    assert check_plan(make_plan(start=AD[:2]), BOOK) == ["① 범위 단계(- 범위 단계: 1~3)가 없음"]


def test_정본에_없는_규칙_번호는_실패():
    errs = check_plan(make_plan(tail=["## 사업성", "- ⑤-99 확인함"]), BOOK)
    assert errs == ["② 정본에 없는 규칙 번호 ⑤-99"]


def test_채점표가_없으면_실패():
    assert any("채점표" in e for e in check_plan(make_plan(score=False), BOOK))


def test_채점표_칸이_빠지면_실패():
    plan = make_plan().replace("| ⑨ 범위 확장 | | |\n", "")
    assert check_plan(plan, BOOK) == ["③ 채점표 칸 누락: ⑨"]


def test_v1_8칸_채점표는_9_10칸이_빠진다():
    assert check_plan(make_plan(rows=V1_SCORE_ROWS), BOOK) == ["③ 채점표 칸 누락: ⑨⑩"]


def test_10단계_규칙_번호도_정본과_대조한다():
    assert check_plan(make_plan(tail=["## 학습", "- ⑩-05 확인함"]), BOOK) == []
    assert check_plan(make_plan(tail=["## 학습", "- ⑩-99 확인함"]), BOOK) == ["② 정본에 없는 규칙 번호 ⑩-99"]


def test_본문에서_10단계_경고_규칙을_하드라고_적으면_실패():
    errs = check_plan(make_plan(tail=["## 학습", "- ⑩-05 하드라서 규칙을 고쳤다"]), BOOK)
    assert errs == ["④ ⑩-05를 하드로 적었으나 정본에서 경고"]


def test_채점표가_맨_끝이_아니면_실패():
    assert check_plan(make_plan() + "## 메모\n- 나중에\n", BOOK) == ["③ 사장님 채점표가 기획서 맨 끝이 아님"]


def test_경고_규칙을_탈락으로_적으면_실패():
    judge = ["| ④ 상징·당위 | 탈락 | ④-12 | 과거에 쓴 상징 |"]
    assert check_plan(make_plan(judge=judge), BOOK) == [
        "④ ④-12는 정본에서 경고 — 탈락이 아니라 경고로 적고 '사장님 판단 칸'으로 넘긴다"]


def test_하드_탈락이면_제출_불가():
    judge = ["| ④ 상징·당위 | 탈락 | ④-07 | 국가 단독 |"]
    assert check_plan(make_plan(judge=judge), BOOK) == ["④ ④-07 하드 탈락 — 이 기획은 제출하지 않는다"]


def test_탈락인데_번호가_없으면_실패():
    judge = ["| ④ 상징·당위 | 탈락 | | 그냥 별로 |"]
    assert check_plan(make_plan(judge=judge), BOOK) == ["④ 탈락인데 규칙 번호 없음: | ④ 상징·당위 | 탈락 | | 그냥 별로 |"]


def test_본문에서_경고_규칙을_하드라고_적으면_실패():
    errs = check_plan(make_plan(tail=["## 상징·당위", "- ④-12 하드라서 상징을 바꿨다"]), BOOK)
    assert errs == ["④ ④-12를 하드로 적었으나 정본에서 경고"]


PITCH_ERR = "⑤ 제목 다음 첫 줄에 '한 줄: <바르는 ○○ 또는 후킹 한마디>'가 없음 (⑦-01)"


def test_한_줄이_없으면_실패():
    assert check_plan(make_plan(pitch=None), BOOK) == [PITCH_ERR]


def test_한_줄이_제목_바로_다음이_아니면_실패():
    plan = make_plan(pitch=None).replace("## 제품\n", "## 제품\n한 줄: 바르는 장벽\n")
    assert check_plan(plan, BOOK) == [PITCH_ERR]


VOICE_ERR = "⑥ 출발점 근거에 '- 목소리: <목소리 비중표 경로>'가 없음 — 목소리를 먼저 모으고 출발점을 고른다 (①-01·①-24)"


def test_목소리_비중표_줄이_없으면_실패():
    assert check_plan(make_plan(voice=False), BOOK) == [VOICE_ERR]


def test_목소리_비중표_파일이_없으면_실패():
    errs = check_plan(make_plan(), BOOK, exists=lambda p: p != VOICE_PATH)
    assert errs == [f"⑥ 목소리 비중표 파일 없음: {VOICE_PATH}"]


def test_출발점_근거_절이_없으면_목소리는_따로_잡지_않는다():
    assert not any(e.startswith("⑥") for e in check_plan(make_plan(start=None), BOOK))


def test_근거에서_경고인_테스트를_통과로_적으면_실패():
    ev = "| 1초 사진 | △ | 손등 사진만으로는 안 떠오름 |"
    plan = make_plan(tail=["## 상징·당위", "- 테스트: 1초 사진 통과 · 이름 지우기 통과"])
    assert check_plan(plan, BOOK, evidence=[ev]) == [
        "⑦ 근거에서 경고였던 테스트를 기획서에서 통과로 적음 — 1초 사진: - 테스트: 1초 사진 통과 · 이름 지우기 통과"]


def test_다른_테스트가_경고인_줄의_통과도_조각으로_잡는다():
    ev = "1초 사진(경고) — 사진만으로는 안 떠오름"
    plan = make_plan(tail=["## 상징·당위", "- 테스트: 1초 사진 통과 · 형태 역할 △"])
    assert any(e.startswith("⑦ 근거에서 경고였던 테스트") for e in check_plan(plan, BOOK, evidence=[ev]))


def test_근거의_경고_규칙은_사장님_판단_칸에_있어야_한다():
    ev = ["- 이름 지우기(남이 3명): 1/3명 맞힘(정답 아쿠아필) → 경고 (④-12)"]
    assert check_plan(make_plan(), BOOK, evidence=ev) == ["⑦ 근거에서 경고였던 ④-12가 '## 사장님 판단 칸'에 없음"]
    ok = make_plan(tail=["## 사장님 판단 칸", "- ④-12: 이름 지우기 1/3 — 사장님이 보실 것"])
    assert check_plan(ok, BOOK, evidence=ev) == []


def test_규칙_강도_표시는_경고로_세지_않는다():
    ev = ["- ④-12 🔒 경고 | 과거에 쓴 상징재도 다시 쓴다 | P6031"]
    assert check_plan(make_plan(), BOOK, evidence=ev) == []


def make_vault(tmp_path):
    voice = tmp_path / VOICE_PATH
    voice.parent.mkdir(parents=True, exist_ok=True)
    voice.write_text("# 목소리 비중표", encoding="utf-8")
    book = tmp_path / "book.md"
    book.write_text(BOOK, encoding="utf-8")
    return book


def test_CLI는_같은_폴더의_근거를_읽는다(tmp_path):
    book = make_vault(tmp_path)
    d = tmp_path / "기획"
    d.mkdir()
    plan = d / "기획서.md"
    plan.write_text(make_plan(tail=["## 상징·당위", "- 테스트: 1초 사진 통과"]), encoding="utf-8")
    assert main([str(plan), "--rulebook", str(book), "--vault", str(tmp_path)]) == 0
    (d / "근거.md").write_text("| 1초 사진 | △ | 안 떠오름 |", encoding="utf-8")
    assert main([str(plan), "--rulebook", str(book), "--vault", str(tmp_path)]) == 1
    assert main([str(plan), "--rulebook", str(book), "--vault", str(tmp_path), "--evidence"]) == 0


def test_CLI_종료_코드(tmp_path, capsys):
    make_vault(tmp_path)
    book = tmp_path / "book.md"
    book.write_text(BOOK, encoding="utf-8")
    good, bad = tmp_path / "good.md", tmp_path / "bad.md"
    good.write_text(make_plan(), encoding="utf-8")
    bad.write_text(make_plan(start=None), encoding="utf-8")
    assert main([str(good), "--rulebook", str(book), "--vault", str(tmp_path)]) == 0
    assert main([str(bad), "--rulebook", str(book), "--vault", str(tmp_path)]) == 1
    out = capsys.readouterr().out
    assert "위반 0개" in out and "출발점 근거 절" in out


def test_CLI는_시장카드를_vault_기준으로_찾는다(tmp_path):
    make_vault(tmp_path)
    card = tmp_path / CARD
    card.parent.mkdir(parents=True, exist_ok=True)
    card.write_text("# 시장 카드", encoding="utf-8")
    book = tmp_path / "book.md"
    book.write_text(BOOK, encoding="utf-8")
    plan = tmp_path / "plan.md"
    plan.write_text(make_plan(start=[f"- 시장 카드: `{CARD}`", "- 범위 단계: 1"]), encoding="utf-8")
    assert main([str(plan), "--rulebook", str(book), "--vault", str(tmp_path)]) == 0
    card.unlink()
    assert main([str(plan), "--rulebook", str(book), "--vault", str(tmp_path)]) == 1

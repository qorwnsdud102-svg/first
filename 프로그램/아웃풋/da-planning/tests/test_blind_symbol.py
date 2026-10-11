# -*- coding: utf-8 -*-
"""blind_symbol — ④ 남이 검사(이름 가리기·채점)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "scripts"))

from blind_symbol import mask, leftovers, prep, score, main

PLAN = "\n".join([
    "# 울쎄업 300샷 세럼 — DA 기획서", "", "한 줄: 바르는 울쎄라", "",
    "## 제품", "- 무엇을: 바르면 찌릿한 필름 세럼, 300샷 정량 펌프",
    "- 누구에게: 팔자주름 타겟 — 대안 울쎄라 44,650", "",
    "## 상징·당위", "- 울쎄라의 샷 감각을 찌릿함으로 옮김", "",
    "## DA 장면", "- 왼쪽 볼에만 바르고 팔자가 얕아진다", "",
])
TERMS = ["울쎄라", "울쎄", "300샷"]


def test_띄어쓰기와_대소문자가_달라도_가린다():
    assert mask("울쎄라 시술, 울 쎄라, ULTHERA", ["울쎄라", "Ulthera"]) == "○○ 시술, ○○, ○○"


def test_긴_이름부터_가린다():
    assert mask("울쎄업 울쎄라", ["울쎄", "울쎄라"]) == "○○업 ○○"


def test_제품과_DA_장면만_남기고_가린다():
    out, probs = prep(PLAN, TERMS)
    assert probs == []
    desc, scene = out["설명.md"], out["장면.md"]
    assert "바르는" not in desc and "샷 감각" not in desc          # 한 줄·상징·당위는 빠진다
    assert "필름 세럼" in desc and "팔자가 얕아진다" in desc
    assert "필름 세럼" not in scene and "팔자가 얕아진다" in scene
    assert "울쎄" not in desc and "○○ 정량 펌프" in desc


def test_폭_없는_공백이_낀_남은_이름을_찾는다():
    assert leftovers("울​쎄 라를 닮은", ["울쎄라"]) == ["울쎄라"]


def test_절이_없으면_문제로_낸다():
    _, probs = prep("# t\n\n## 제품\n- 무엇을: 세럼\n", TERMS)
    assert probs == ["장면.md: 절이 비었음"]


def test_과반이_맞히면_통과_별칭도_인정():
    ans = ["- 1초 상징원: 써마지\n- 상징원: 울쎄라 리프팅",
           "- 1초 상징원: 울세라\n- 상징원: 써마지",
           "- 1초 상징원: 보톡스\n- 상징원: 울쎄라"]
    rows = {t: (h, v) for t, h, v, _ in score(ans, "울쎄라", ["울세라"])}
    assert rows == {"1초 사진": (1, "경고"), "이름 지우기": (2, "통과")}


def test_CLI_prep은_파일을_쓰고_score는_두_줄을_낸다(tmp_path, capsys):
    plan = tmp_path / "기획서.md"
    plan.write_text(PLAN, encoding="utf-8")
    box = tmp_path / "box"
    assert main(["prep", str(plan), "--terms", ",".join(TERMS), "--out", str(box)]) == 0
    assert "○○" in (box / "설명.md").read_text(encoding="utf-8")
    for k in range(3):
        (box / f"답-{k}.md").write_text("- 1초 상징원: 울쎄라\n- 상징원: 울쎄라", encoding="utf-8")
    assert main(["score", *[str(box / f"답-{k}.md") for k in range(3)], "--answer", "울쎄라"]) == 0
    out = capsys.readouterr().out
    assert "- 1초 사진(남이 3명): 3/3명 맞힘(정답 울쎄라) → 통과" in out
    assert "- 이름 지우기(남이 3명): 3/3명 맞힘(정답 울쎄라) → 통과" in out


def test_CLI_prep_full은_가리지_않은_상징_설명을_따로_쓴다(tmp_path):
    plan = tmp_path / "기획서.md"
    plan.write_text(PLAN, encoding="utf-8")
    box, full = tmp_path / "box", tmp_path / "box-전체"
    assert main(["prep", str(plan), "--terms", ",".join(TERMS), "--out", str(box), "--full", str(full)]) == 0
    txt = (full / "상징.md").read_text(encoding="utf-8")
    assert "울쎄라의 샷 감각" in txt and "## 제품" in txt and "## DA 장면" in txt
    assert not (box / "상징.md").exists()


def test_CLI_prep은_샌드박스_경로에_정답이_보이면_멈춘다(tmp_path):
    plan = tmp_path / "기획서.md"
    plan.write_text(PLAN, encoding="utf-8")
    assert main(["prep", str(plan), "--terms", ",".join(TERMS), "--out", str(tmp_path / "울쎄업")]) == 1
    assert not (tmp_path / "울쎄업").exists()
    assert main(["prep", str(plan), "--terms", ",".join(TERMS), "--out", str(tmp_path / "B7K2")]) == 0


def test_CLI_prep은_이름이_남거나_절이_없으면_멈춘다(tmp_path):
    plan = tmp_path / "기획서.md"
    plan.write_text("# t\n\n## 제품\n- 무엇을: 세럼\n", encoding="utf-8")
    assert main(["prep", str(plan), "--terms", "울쎄라", "--out", str(tmp_path / "box")]) == 1
    assert not (tmp_path / "box").exists()

# -*- coding: utf-8 -*-
"""rank_plans — 교차 채점으로 순위·상위 5개·불일치."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "scripts"))

from rank_plans import score, disagreements, rank, main

CROSS = """# 교차 채점
| 단계 | 통과/경고/탈락 | 걸린 규칙 번호 | 근거 한 줄 |
|---|---|---|---|
| ① 기초분석 | 통과 | | 시장 카드 있음 |
| ② 출발점 | 통과 | | 라이브러리 ID 인용 |
| ③ 결핍 카드 | 경고 | ③-04 | 비중 표본 12개 |
| ④ 상징·당위 | 경고 | ④-12 | 경쟁사가 쓴 상징 |
| ⑤ 사업성 | 통과 | | |
| ⑥ 기획서 | 통과 | | |
| ⑦ 범위 확장 | 통과 | | |

## 시장성
- 시장성: 상 — 주사피부염 오래 돈 광고 179일
"""


def row(name, drop, warn, market):
    return {"name": name, "drop": drop, "warn": warn, "market": market}


def test_교차_채점_파일에서_칸을_센다():
    s = score(CROSS)
    assert (s["drop"], s["warn"], s["market"]) == (0, 2, 3)
    assert s["judg"]["④"] == "경고"


def test_시장성이_없으면_0():
    assert score(CROSS.replace("- 시장성: 상", "- 시장성 미기재"))["market"] == 0


def test_탈락_경고_시장성_순():
    out = rank([row("a", 1, 0, 3), row("b", 0, 2, 3), row("c", 0, 1, 1), row("d", 0, 1, 3)])
    assert [r["name"] for r in out] == ["d", "c", "b", "a"]
    assert [r["rank"] for r in out] == [1, 2, 3, 4]


def test_같은_점수는_같은_순위():
    out = rank([row("a", 0, 1, 2), row("b", 0, 1, 2), row("c", 0, 2, 2)])
    assert [r["rank"] for r in out] == [1, 1, 3]


def test_경계_동점은_사장님_판단():
    rows = [row("a", 0, 0, 3), row("b", 0, 1, 3), row("c", 0, 1, 2),
            row("d", 0, 2, 2), row("e", 0, 2, 2), row("f", 1, 0, 3)]
    out = {r["name"]: r for r in rank(rows, top=4)}
    assert [n for n in "abcdef" if out[n]["pick"]] == ["a", "b", "c"]
    assert [n for n in "abcdef" if out[n]["edge"]] == ["d", "e"]


def test_경계에_동점이_없으면_정확히_N개():
    rows = [row(n, 0, i, 2) for i, n in enumerate("abcdefg")]
    out = rank(rows, top=5)
    assert sum(r["pick"] for r in out) == 5 and not any(r["edge"] for r in out)


def test_불일치는_판정이_다른_단계():
    assert disagreements({"③": "통과", "④": "경고"}, {"③": "경고", "④": "경고", "⑤": "통과"}) == [
        "③(통과→경고)", "⑤(-→통과)"]


def _plan(d, judge_rows):
    d.mkdir(parents=True)
    rows = "\n".join(f"| {s} | {j} | | |" for s, j in judge_rows)
    (d / "기획서.md").write_text(
        "# 기획\n## 단계별 판정\n| 단계 | 판정 | 걸린 규칙 번호 | 근거 한 줄 |\n|---|---|---|---|\n"
        + rows + "\n## 사장님 채점\n| ① 기초분석 | | |\n", encoding="utf-8")


def test_라운드_폴더_순위표(tmp_path, capsys):
    _plan(tmp_path / "Claude" / "01-장벽밤", [("③ 결핍 카드", "경고"), ("④ 상징·당위", "통과")])
    (tmp_path / "Claude" / "01-장벽밤" / "교차채점-Codex.md").write_text(CROSS, encoding="utf-8")
    _plan(tmp_path / "Codex" / "01-쿨링겔", [("④ 상징·당위", "통과")])
    assert main([str(tmp_path)]) == 1
    out = capsys.readouterr().out
    assert "| 1 | Claude/01-장벽밤 | 0 | 2 | 상 |" in out
    assert "④(통과→경고)" in out
    assert "채점 대기: Codex/01-쿨링겔" in out
    (tmp_path / "Codex" / "01-쿨링겔" / "교차채점-Claude.md").write_text(CROSS, encoding="utf-8")
    assert main([str(tmp_path)]) == 0


def test_칸이_덜_찬_교차_채점은_대기(tmp_path, capsys):
    _plan(tmp_path / "Claude" / "01-장벽밤", [("④ 상징·당위", "통과")])
    half = CROSS.replace("| ⑦ 범위 확장 | 통과 | | |", "| ⑦ 범위 확장 | | | |")
    (tmp_path / "Claude" / "01-장벽밤" / "교차채점-Codex.md").write_text(half, encoding="utf-8")
    assert main([str(tmp_path)]) == 1
    assert "채점 대기: Claude/01-장벽밤 (채점 칸 6/7)" in capsys.readouterr().out

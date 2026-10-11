# -*- coding: utf-8 -*-
"""core_calib — ④ 핵심 코어 보정(질문지·채점지·조건별 점수)."""
import json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "scripts"))

from core_calib import cores, prep, sheet, score, main

ROWS = [(f"상징{i}", f"P{6100 + i}", f"코어{i}", f"원문{i}") for i in range(1, 4)]
GOLD = ("| 상징원 | P-ID | 핵심 코어 | 사장님 원문 |\n|---|---|---|---|\n"
        + "\n".join(f"| {n} | {p} | {c} | {q} |" for n, p, c, q in ROWS) + "\n")


def test_정답표를_읽는다(tmp_path):
    (tmp_path / "정답.md").write_text(GOLD, encoding="utf-8")
    assert cores(tmp_path / "정답.md") == ROWS


def test_하나_빼기_질문에는_묻는_상징원의_답이_없다(tmp_path):
    prep(ROWS, tmp_path)
    q0 = (tmp_path / "질문" / "질문-00.md").read_text(encoding="utf-8")
    q1 = (tmp_path / "질문" / "질문-01.md").read_text(encoding="utf-8")
    assert "상징1" in q0 and "코어1" not in q0 and "원문1" not in q0
    assert "코어1" not in q1 and "원문1" not in q1 and "코어2" in q1 and "원문3" in q1
    assert q1.rstrip().endswith("- 상징1")


def test_섞은_답을_조건별로_다시_센다(tmp_path):
    ans = tmp_path / "답"
    ans.mkdir()
    (ans / "답-00.md").write_text("| 상징원 | 핵심 코어 한 줄 |\n|---|---|\n"
                                + "\n".join(f"| {n} | 없음답{n} |" for n, *_ in ROWS), encoding="utf-8")
    for i, (n, *_) in enumerate(ROWS, 1):
        (ans / f"답-{i:02d}.md").write_text(f"| {n} | 보기답{n} |", encoding="utf-8")
    codes = sheet(ROWS, ans, tmp_path, seed=1)
    text = (tmp_path / "채점" / "채점.md").read_text(encoding="utf-8")
    assert "보기 없음" not in text and "원문2" in text and "보기답상징3" in text
    graded = "\n".join(f"| {c} | {'맞음' if '보기 9개' == v['조건'] else '틀림'} | x |" for c, v in codes.items())
    got = score(codes, graded)
    assert dict(got["보기 9개"]) == {"맞음": 3} and dict(got["보기 없음"]) == {"틀림": 3}


def test_CLI_한_바퀴(tmp_path, capsys):
    gold = tmp_path / "정답.md"
    gold.write_text(GOLD, encoding="utf-8")
    box = tmp_path / "box"
    assert main(["prep", str(gold), str(box)]) == 0
    ans = tmp_path / "답"
    ans.mkdir()
    for i, (n, *_) in enumerate(ROWS, 1):
        (ans / f"답-{i:02d}.md").write_text(f"| {n} | a |", encoding="utf-8")
    assert main(["sheet", str(gold), str(ans), str(box)]) == 0
    codes = json.loads((tmp_path / "코드표.json").read_text(encoding="utf-8"))
    (tmp_path / "채점답.md").write_text("\n".join(f"| {c} | 맞음 | x |" for c in codes), encoding="utf-8")
    assert main(["score", str(tmp_path / "코드표.json"), str(tmp_path / "채점답.md")]) == 0
    out = capsys.readouterr().out
    assert "보기 9개: 맞음 3 · 부분 0 · 틀림 0 · 빠짐 0 → 3/3" in out


def test_조건을_이름으로_주면_그_답들을_섞는다(tmp_path):
    (tmp_path / "목소리.md").write_text("| 상징원 | 핵심 코어 |\n|---|---|\n| 상징1 | 뜨거움 |\n| 상징2 | 주사기 |", encoding="utf-8")
    (tmp_path / "옛답.md").write_text("| 상징원 | 핵심 코어 |\n|---|---|\n| 상징1 | 원리 |", encoding="utf-8")
    codes = sheet(ROWS, tmp_path, tmp_path, conds=[("목소리", str(tmp_path / "목소리.md")), ("v1", str(tmp_path / "옛답.md"))])
    md = (tmp_path / "채점" / "채점.md").read_text(encoding="utf-8")
    assert "뜨거움" in md and "주사기" in md and "원리" in md
    assert sorted({v["조건"] for v in codes.values()}) == ["v1", "목소리"] and len(codes) == 6

# -*- coding: utf-8 -*-
"""apply_supersede — 판례집 옛 규칙 밑에 '최신 주장으로 대체' 표시."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "scripts"))

from apply_supersede import PREFIX, apply_rows, main

MARK = "> ⚠️ 최신 주장으로 대체 → [[DA 기획 단계별 규칙]] ⑤-03 — 원가율 30%→10%"
TEXT = "# 소싱\n\n### 원가율 30%\n본문\n"


def mark_of(why, rid="⑤-03"):
    return f"{PREFIX}[[DA 기획 단계별 규칙]] {rid} — {why}"


def test_앵커_다음에_표시를_단다():
    out, fails = apply_rows(TEXT, [("### 원가율 30%", "⑤-03", "원가율 30%→10%")])
    assert fails == []
    assert out == "# 소싱\n\n### 원가율 30%\n\n" + MARK + "\n\n본문\n"


def test_두번_돌려도_같다():
    once, _ = apply_rows(TEXT, [("### 원가율 30%", "⑤-03", "원가율 30%→10%")])
    twice, _ = apply_rows(once, [("### 원가율 30%", "⑤-03", "원가율 30%→10%")])
    assert twice == once


def test_앵커가_없거나_여러개면_실패로_보고하고_건너뛴다():
    out, fails = apply_rows(TEXT + "### 원가율 30%\n", [("### 원가율 30%", "⑤-03", "x"), ("### 없음", "⑤-04", "y")])
    assert out == TEXT + "### 원가율 30%\n"
    assert len(fails) == 2


def test_CRLF를_지킨다():
    crlf = TEXT.replace("\n", "\r\n")
    out, _ = apply_rows(crlf, [("### 원가율 30%", "⑤-03", "원가율 30%→10%")])
    assert "\r\n" + MARK + "\r\n" in out
    assert "\n" not in out.replace("\r\n", "")


def test_여러줄_문단은_블록_끝_뒤에_단다():
    text = "# T\n\n첫 줄 앵커\n둘째 줄\n\n다음 문단\n"
    out, fails = apply_rows(text, [("첫 줄 앵커", "⑤-03", "원가율 30%→10%")])
    assert fails == []
    assert out == "# T\n\n첫 줄 앵커\n둘째 줄\n\n" + MARK + "\n\n다음 문단\n"


def test_인용_목록도_블록_끝_뒤에_단다():
    text = "> 인용 앵커\n> 이어짐\n\n- 항목1\n- 항목2\n"
    out, _ = apply_rows(text, [("> 인용 앵커", "⑤-03", "x")])
    assert out == "> 인용 앵커\n> 이어짐\n\n" + mark_of("x") + "\n\n- 항목1\n- 항목2\n"
    out, _ = apply_rows(text, [("- 항목1", "⑤-03", "x")])
    assert out == text + "\n" + mark_of("x") + "\n"


def test_표시_뒤에는_항상_빈_줄이다():
    out, _ = apply_rows("# T\n본문\n", [("# T", "⑤-03", "x")])
    assert out == "# T\n\n" + mark_of("x") + "\n\n본문\n"


def test_표_행은_앵커로_못_쓴다():
    text = "| a | b |\n|---|---|\n| 원가율 | 30% |\n"
    out, fails = apply_rows(text, [("| 원가율 | 30% |", "⑤-03", "x")])
    assert out == text
    assert len(fails) == 1 and "표" in fails[0]


def test_같은_앵커_세_행은_재실행해도_세_개이고_순서를_지킨다():
    rows = [("### 원가율 30%", "⑤-01", "가"), ("### 원가율 30%", "⑤-02", "나"), ("### 원가율 30%", "⑤-03", "다")]
    once, fails = apply_rows(TEXT, rows)
    twice, _ = apply_rows(once, rows)
    assert fails == []
    assert twice == once
    assert once.count(PREFIX) == 3
    assert once.index("⑤-01") < once.index("⑤-02") < once.index("⑤-03")
    assert once.endswith("— 다\n\n본문\n")


def test_펜스_안_앵커는_실패로_보고한다():
    text = "# T\n\n```\n# 주석\n\n코드\n```\n\n끝\n"
    out, fails = apply_rows(text, [("# 주석", "⑤-03", "x")])
    assert out == text
    assert len(fails) == 1 and "펜스" in fails[0]


def test_문단_바로_뒤_펜스는_닫는_펜스_뒤에_단다():
    text = "앵커 문단\n```\na\n\nb\n```\n\n끝\n"
    out, fails = apply_rows(text, [("앵커 문단", "⑤-03", "x")])
    assert fails == []
    assert out == "앵커 문단\n```\na\n\nb\n```\n\n" + mark_of("x") + "\n\n끝\n"


def _write(path, text):
    with open(path, "w", encoding="utf-8", newline="") as fh:
        fh.write(text)


def _read(path):
    with open(path, encoding="utf-8", newline="") as fh:
        return fh.read()


def test_main_BOM_TSV를_읽고_성공하면_0(tmp_path):
    _write(tmp_path / "a.md", TEXT)
    (tmp_path / "c.tsv").write_text("a.md\t### 원가율 30%\t⑤-03\t원가율 30%→10%\n", encoding="utf-8-sig")
    assert main(str(tmp_path / "c.tsv"), str(tmp_path)) == 0
    assert PREFIX in _read(tmp_path / "a.md")


def test_main_형식_오류_행도_종료코드_1(tmp_path, capsys):
    _write(tmp_path / "a.md", TEXT)
    (tmp_path / "c.tsv").write_text("a.md\t### 원가율 30%\t⑤-03\n", encoding="utf-8")
    assert main(str(tmp_path / "c.tsv"), str(tmp_path)) == 1
    assert "[형식]" in capsys.readouterr().out
    assert _read(tmp_path / "a.md") == TEXT


def test_main_없는_파일은_보고하고_그_파일만_건너뛴다(tmp_path, capsys):
    _write(tmp_path / "a.md", TEXT)
    (tmp_path / "c.tsv").write_text(
        "없음.md\t### x\t⑤-04\ty\na.md\t### 원가율 30%\t⑤-03\t원가율 30%→10%\n", encoding="utf-8")
    assert main(str(tmp_path / "c.tsv"), str(tmp_path)) == 1
    assert "[실패] 없음.md: 파일 없음" in capsys.readouterr().out
    assert PREFIX in _read(tmp_path / "a.md")

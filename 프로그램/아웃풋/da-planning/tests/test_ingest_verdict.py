# -*- coding: utf-8 -*-
"""ingest_verdict — 사장님 판정 받아 적기(판례 번호·원문 대조·매핑)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "scripts"))

from ingest_verdict import next_pid, quote_ok, add, main

TABLE = "| P-ID | 원문 | 인용 | 요지 | 종류 |\n|---|---|---|---|---|\n| P6233 | a.md:1 | \"x\" | y | 규칙 |\n| P6247 | b.md:2 | \"x\" | y | 규칙 |\n"
MAP = "| P-ID | 규칙 |\n|---|---|\n| P6233 | ⑦-01 |\n"
RAW = "# 제목\n\n## 원문\n\n```\n24개월로 하자 18개월 말고\n\n그리고   이건 둘째 줄\n```\n"


def setup(tmp_path):
    (tmp_path / "목록.md").write_text(TABLE, encoding="utf-8")
    (tmp_path / "매핑.md").write_text(MAP, encoding="utf-8")
    (tmp_path / "raw").mkdir()
    (tmp_path / "raw" / "r.md").write_text(RAW, encoding="utf-8")
    return tmp_path / "목록.md", tmp_path / "매핑.md", tmp_path / "raw"


def test_다음_번호는_가장_큰_번호_다음():
    assert next_pid(TABLE) == "P6248"


def test_인용은_원문_줄에_띄어쓰기를_무시하고_있어야_한다():
    lines = RAW.splitlines()
    assert quote_ok("24개월로 하자 18개월 말고", lines, 6, 6)
    assert quote_ok("그리고 이건 둘째 줄", lines, 6, 8)
    assert not quote_ok("36개월로 하자", lines, 6, 8)
    assert not quote_ok("그리고 이건 둘째 줄", lines, 6, 6)         # 줄 범위 밖


def test_추가하면_두_표에_같은_번호로_붙는다(tmp_path):
    tbl, mp, raw = setup(tmp_path)
    pid = add(tbl, mp, raw, "r.md", "6", "24개월로 하자 18개월 말고", "기간은 24개월", "규칙", "⑩-09")
    assert pid == "P6248"
    assert tbl.read_text(encoding="utf-8").rstrip().endswith('| P6248 | r.md:6 | "24개월로 하자 18개월 말고" | 기간은 24개월 | 규칙 |')
    assert mp.read_text(encoding="utf-8").rstrip().endswith("| P6248 | ⑩-09 |")


def test_인용이_원문에_없으면_멈추고_아무것도_안_쓴다(tmp_path, capsys):
    tbl, mp, raw = setup(tmp_path)
    before = tbl.read_text(encoding="utf-8")
    assert main(["add", "--table", str(tbl), "--map", str(mp), "--raw-dir", str(raw), "--raw", "r.md",
                 "--lines", "6", "--quote", "없는 말", "--summary", "s", "--kind", "규칙", "--rule", "⑩-09"]) == 1
    assert tbl.read_text(encoding="utf-8") == before
    assert "원문에 없음" in capsys.readouterr().out

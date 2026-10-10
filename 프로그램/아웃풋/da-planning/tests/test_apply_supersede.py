# -*- coding: utf-8 -*-
"""apply_supersede — 판례집 옛 규칙 밑에 '최신 주장으로 대체' 표시."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "scripts"))

from apply_supersede import apply_rows

MARK = "> ⚠️ 최신 주장으로 대체 → [[DA 기획 단계별 규칙]] ⑤-03 — 원가율 30%→10%"
TEXT = "# 소싱\n\n### 원가율 30%\n본문\n"


def test_앵커_다음에_표시를_단다():
    out, fails = apply_rows(TEXT, [("### 원가율 30%", "⑤-03", "원가율 30%→10%")])
    assert fails == []
    assert out == "# 소싱\n\n### 원가율 30%\n\n" + MARK + "\n본문\n"


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

# -*- coding: utf-8 -*-
"""voice_count — ① 목소리 비중표(단위·겹침·바이럴·묶음 셈·표본 덤프)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "scripts"))

from voice_count import units_from_rows, dedupe, is_viral, count, render, dump

ROWS = [
    ["게시글", "유튜브", "팔자주름", "팔자주름 없애는 법", "영상 설명", None, "https://y/1", "", "", 100, 5],
    ["  댓글", None, None, None, None, "저도 필러 맞았는데 금방 빠져요", None, "", "", None, 30],
    ["  댓글", None, None, None, None, "ㅋㅋ", None, "", "", None, 1],
    ["게시글", "DC인사이드", "팔자주름", "팔자 고민", "울쎄라 받아봤는데 비싸요", None, "https://d/1", "", "", 10, 2],
    ["  댓글", None, None, None, None, "이 크림 추천해요 인생템", None, "", "", None, 0],
]
GROUPS = {"해결 행동": {"필러": "필러", "리프팅 시술": "울쎄라|써마지", "  └ 울쎄라": "울쎄라"},
          "불만·걱정": {"비용": "비싸|비용"}}


def test_유튜브_영상_행과_짧은_글은_뺀다():
    us = units_from_rows(ROWS)
    assert [(u["사이트"], u["종류"]) for u in us] == [("유튜브", "유튜브 댓글"), ("DC인사이드", "글"), ("DC인사이드", "댓글")]
    assert us[0]["url"] == "https://y/1" and us[0]["좋아요"] == 30


def test_겹친_글은_한_번만():
    us = units_from_rows(ROWS)
    assert len(dedupe(us + us)) == 3


def test_바이럴_의심():
    assert is_viral("이 크림 추천해요 인생템", []) and is_viral("잇레티놀 좋아요", ["잇레티놀"])
    assert not is_viral("저도 필러 맞았는데 금방 빠져요", [])


def test_묶음별로_세고_하위는_위_항목에_붙인다():
    us = units_from_rows(ROWS)
    clean = [u for u in us if not is_viral(u["글"], [])]
    c = count(us, clean, GROUPS)
    assert [r[:4] for r in c["해결 행동"]] == [("필러", 1, 1, 1), ("리프팅 시술", 1, 1, 1), ("  └ 울쎄라", 1, 1, 1)]
    md = render("팔자주름", ["a.xlsx"], us, clean, c)
    assert "센 단위 2개" in md and "| 필러 | 1 | 50.0% | 1 | 1 |" in md and "| └ 울쎄라 |" in md


def test_덤프는_사이트별_좋아요_순():
    us = units_from_rows(ROWS)
    txt = dump(us, top=5)
    assert txt.index("## DC인사이드") < txt.index("## 유튜브")        # 단위가 많은 사이트부터
    dc = txt[txt.index("## DC인사이드"):txt.index("## 유튜브")]
    assert dc.index("울쎄라 받아봤는데") < dc.index("이 크림 추천해요")

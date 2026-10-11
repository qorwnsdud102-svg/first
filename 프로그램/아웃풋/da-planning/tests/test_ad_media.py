# -*- coding: utf-8 -*-
"""ad_media — 음성 받아쓰기 결과 줄 만들기(무거운 모델·ffmpeg 호출은 시험 운전으로 확인)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "scripts"))

from ad_media import fmt_segments


def test_초와_문장을_한_줄씩():
    segs = [(0.0, 2.2, " 이거 딱 쓰면 "), (2.2, 4.1, ""), (4.1, 5.6, "떨리는 거 보이세요?")]
    assert fmt_segments(segs) == "[0.0] 이거 딱 쓰면\n[4.1] 떨리는 거 보이세요?"


def test_길면_자른다():
    segs = [(float(i), i + 1.0, "가나다라마바사") for i in range(10)]
    out = fmt_segments(segs, limit=20)
    assert len(out) == 21 and out.endswith("…")

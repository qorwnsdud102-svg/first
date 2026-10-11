# -*- coding: utf-8 -*-
"""voice_crawl — ① 목소리 키워드 여러 개 차례 수집(crawl.py 감싸기)."""
import json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "scripts"))

from voice_crawl import parse_sites, run, safe

OUT_OK = ("\n  youtube: 20개 게시글, 412개 댓글\n\n  dcinside: 에러: timeout\n"
          "    [OK] youtube: 20개 게시글, 412개 댓글\n    [FAIL] dcinside: 에러: timeout\n")


class Done:
    def __init__(self, stdout, code=0):
        self.stdout, self.stderr, self.returncode = stdout, "", code


def fake(outs):
    calls = []

    def runner(cmd, **kw):
        calls.append(cmd)
        open(cmd[cmd.index("--output") + 1], "w").close()
        return Done(outs[len(calls) - 1])
    return runner, calls


def test_사이트별_줄을_읽는다():
    assert parse_sites(OUT_OK) == {"youtube": {"글": 20, "댓글": 412, "에러": None},
                                   "dcinside": {"글": 0, "댓글": 0, "에러": "에러: timeout"}}


def test_사이트_하나면_마지막_합계_줄을_그_사이트로_읽는다():
    out = "  완료! 15개 영상, 626개 댓글\n  필터 적용 후: 15개 게시글, 626개 댓글\n"
    assert parse_sites(out, "youtube") == {"youtube": {"글": 15, "댓글": 626, "에러": None}}
    assert parse_sites(out, "youtube,dcinside") == {}


def test_파일_이름에서_띄어쓰기와_특수문자를_뺀다():
    assert safe(" 주름 없애는 법?") == "주름_없애는_법_"


def test_키워드마다_돌리고_결과를_남긴다(tmp_path):
    runner, calls = fake([OUT_OK, OUT_OK])
    run(["팔자주름", "주름 없애는 법"], str(tmp_path), runner=runner, sleep=lambda s: None)
    assert [c[4] for c in calls] == ["팔자주름", "주름 없애는 법"]
    assert calls[1][calls[1].index("--output") + 1].endswith("주름_없애는_법.xlsx")
    saved = json.load(open(tmp_path / "_수집.json", encoding="utf-8"))
    assert [s["키워드"] for s in saved] == ["팔자주름", "주름 없애는 법"]
    assert saved[0]["사이트"]["youtube"]["댓글"] == 412 and saved[0]["사이트"]["dcinside"]["에러"]
    assert (tmp_path / "팔자주름.log").exists()


def test_막히면_멈추고_다시_돌리면_받은_키워드는_건너뛴다(tmp_path):
    runner, calls = fake([OUT_OK, "ERROR: [youtube] IpBlocked"])
    run(["가", "나", "다"], str(tmp_path), runner=runner, sleep=lambda s: None)
    assert len(calls) == 2
    saved = json.load(open(tmp_path / "_수집.json", encoding="utf-8"))
    assert saved[-1]["막힘"] is True
    runner2, calls2 = fake([OUT_OK, OUT_OK])
    run(["가", "나", "다"], str(tmp_path), runner=runner2, sleep=lambda s: None)
    assert [c[4] for c in calls2] == ["나", "다"]

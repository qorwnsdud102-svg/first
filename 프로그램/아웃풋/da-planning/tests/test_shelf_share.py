# -*- coding: utf-8 -*-
"""shelf_share — ⑤ 매대 비율(제품 묶기·비율·시작 달)."""
import json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "scripts"))

from shelf_share import link_key, group, product, view_md, labels, score, main


def ad(i, page="가게", body="본문", link=None, days=10, start="2026-09-01", pid="p1"):
    return {"id": str(i), "page_name": page, "page_id": pid, "body": body, "title": "",
            "link_urls": [link] if link else [], "days_running": days, "start_date": start}


def test_상품_링크_키():
    assert link_key("https://www.beaund.com/product/detail.html?product_no=53&utm=x") == "beaund.com#53"
    assert link_key("https://brand.co.kr/product/세럼/123/category/1/display/2/") == "brand.co.kr#123"
    assert link_key("https://m.smartstore.naver.com/shop/products/987654") == "smartstore.naver.com#987654"
    assert link_key("https://brand.com/lp/serum/") == "brand.com/lp/serum"
    assert link_key("https://fb.com/canvas_doc/123") is None
    assert link_key("") is None


def test_같은_상품_링크와_같은_본문을_한_제품으로_묶는다():
    ads = [("오십견", ad(1, link="https://a.com/product/x/101/", days=30)),
           ("무릎통증", ad(2, page="다른 광고주", body="다른 본문", pid="p2",
                       link="https://a.com/product/detail.html?product_no=101", days=5)),
           ("오십견", ad(3, page="나", body="같은 본문", pid="p9", days=7)),
           ("무릎통증", ad(4, page="나", body="같은  본문", pid="p9", days=3)),
           ("오십견", ad(5, page="혼자", body="혼자 본문", pid="p5", days=50)),
           ("무릎통증", ad(5, page="혼자", body="혼자 본문", pid="p5", days=50))]
    gs = group(ads)
    assert [sorted({a["id"] for _, a in g}) for g in gs] == [["5"], ["1", "2"], ["3", "4"]]
    p = product("S01", gs[0])
    assert p["키워드"] == ["무릎통증", "오십견"] and p["광고"] == ["5"]


def test_병원_광고주는_따로_표시하고_보기에서_뺀다():
    ps = [product("S01", [("k", ad(1, page="청담 OO피부과의원"))]),
          product("S02", [("k", ad(2, page="OO코스메틱", body="피부과 시술 대신"))])]
    assert [p["병원"] for p in ps] == [True, False]
    md = view_md(ps)
    assert "## S02" in md and "## S01" not in md and "제품 1개" in md


def test_보기에_장면_여러_장과_음성을_적는다():
    p = product("S01", [("k", ad(1))])
    p["그림"] = ["S01-앞.jpg", "S01-뒤.jpg"]
    p["음성"] = "[0.0] 이거 딱 쓰면\n[2.2] 동전 모양 패치"
    md = view_md([p])
    assert "- 그림: S01-앞.jpg, S01-뒤.jpg" in md
    assert "- 음성:\n  [0.0] 이거 딱 쓰면\n  [2.2] 동전 모양 패치" in md


def test_표시_답을_읽는다():
    text = "| 제품 | 표시 | 근거 |\n|---|---|---|\n| S01 | 예 | 동전 모양 |\n| S02 | 아니오 | — |\n| S03 | 병원 | 시술 |"
    assert labels(text) == {"S01": "예", "S02": "아니오", "S03": "병원"}
    # 표시 에이전트가 첫 칸에 제품 이름을 붙여 써도 읽는다(2026-10-11 기미 매대)
    assert labels("| S03 유니다 PDRN 재생라인 | 아니오 | x |\n| S11 아렌시아 | 예 | y |") == {"S03": "아니오", "S11": "예"}


def test_열에_셋이면_진부_둘이면_흔하지_않음():
    ps = [product(f"S{i:02d}", [("k", ad(i, page=f"가게{i}", start=f"2026-0{1 + i % 3}-01"))]) for i in range(1, 12)]
    lab = {f"S{i:02d}": ("예" if i <= 3 else "아니오") for i in range(1, 11)}
    lab["S11"] = "모름"
    share, verdict, text = score(ps, lab, "동전파스 외형")
    assert (round(share, 2), verdict) == (0.3, "진부")
    assert "제품 10개(병원 0개·모름 1개 뺌) 중 3개가 씀 → 30% → 진부" in text
    assert "먼저 쓴 곳: 가게3 (2026-01-01 시작" in text
    lab["S03"] = "아니오"
    assert score(ps, lab, "동전파스 외형")[1] == "흔하지 않음"


def test_표본이_적으면_주의를_붙인다():
    ps = [product("S01", [("k", ad(1))]), product("S02", [("k", ad(2, page="b", pid="p2", body="b"))])]
    text = score(ps, {"S01": "예", "S02": "아니오"}, "x")[2]
    assert "표본 주의: 제품이 2개뿐이다" in text


def test_CLI_build와_score(tmp_path, capsys):
    root = tmp_path / "수집"
    for kw, ads_ in (("오십견", [ad(1, link="https://a.com/product/x/101/"),
                               ad(2, page="OO정형외과", body="병원 본문", pid="p2")]),
                     ("무릎통증", [ad(3, page="B", body="b", pid="p3")])):
        (root / kw).mkdir(parents=True)
        (root / kw / "_ads.json").write_text(json.dumps({"ads": ads_, "media": []}, ensure_ascii=False), encoding="utf-8")
    out = tmp_path / "매대"
    assert main(["build", str(root), "--keywords", "오십견,무릎통증", "--out", str(out)]) == 0
    shelf = json.loads((out / "매대.json").read_text(encoding="utf-8"))
    assert len(shelf["제품"]) == 3 and sum(p["병원"] for p in shelf["제품"]) == 1
    assert (out / "보기" / "매대.md").exists()
    codes = [p["code"] for p in shelf["제품"] if not p["병원"]]
    (tmp_path / "답.md").write_text(f"| {codes[0]} | 예 | x |\n| {codes[1]} | 아니오 | y |", encoding="utf-8")
    assert main(["score", str(out), str(tmp_path / "답.md"), "--symbol", "동전파스"]) == 0
    assert "제품 2개(병원 1개·모름 0개 뺌) 중 1개가 씀 → 50% → 진부" in capsys.readouterr().out

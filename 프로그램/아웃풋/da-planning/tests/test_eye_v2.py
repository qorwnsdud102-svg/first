# -*- coding: utf-8 -*-
"""eye_v2 — 지난 문항을 사례로, 판례는 끝 번호까지, 새 기획 카드 2벌, 사장님 ○/×와 맞추기."""
import json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "scripts"))

import eye_v2

ANS = {"A01": {"판정": "기각", "원문": "\"상징이 약함\"", "행": "", "이름": "가"},
       "G01": {"판정": "진행", "원문": "\"좋은 기획\"", "행": "", "이름": "나"}}
PAN = {"P-ID": {"파일": "", "원문": "원문", "요지": "요지", "종류": "종류"},
       "P0001": {"파일": "a.md", "원문": "\"첫 말\"", "요지": "첫", "종류": "규칙"},
       "P0003": {"파일": "b.md", "원문": "\"셋째 말\"", "요지": "셋", "종류": "판정"},
       "P0009": {"파일": "c.md", "원문": "\"끝 뒤 말\"", "요지": "뒤", "종류": "판정"}}


def setup(tmp_path, monkeypatch):
    base = tmp_path / "눈-v2"
    (base / "카드").mkdir(parents=True)
    old = tmp_path / "옛카드"
    old.mkdir()
    (old / "A01.md").write_text("- 무엇: 가 제품", encoding="utf-8")
    (old / "G01s.md").write_text("- 무엇: 나 제품", encoding="utf-8")
    for i in ("R1-01", "R1-02", "R1-03"):
        (base / "카드" / f"{i}.md").write_text(f"- 무엇: {i} 기획", encoding="utf-8")
    cfg = {"씨앗": 7, "사례": ["A01", "G01s"], "사례카드": "../옛카드", "원천": {"G01s": "G01"},
           "H사례판정": {"말": "P0001"}, "판례_끝": "P0003", "제외P": {}, "시험": ["R1-01", "R1-02", "R1-03"]}
    (base / "설정.json").write_text(json.dumps(cfg, ensure_ascii=False), encoding="utf-8")
    books = tmp_path / "sim" / "규칙집"
    books.mkdir(parents=True)
    for v in ("v1", "v2"):
        (books / f"규칙집-{v}.md").write_text(f"# 규칙집 {v}\n④-01 하드", encoding="utf-8")
    monkeypatch.setattr(eye_v2, "SIM", str(tmp_path / "sim"))
    return base / "설정.json", tmp_path / "샌드박스"


def test_지난_문항은_사례로_판례는_끝_번호까지(tmp_path, monkeypatch):
    cfg, sb = setup(tmp_path, monkeypatch)
    out = eye_v2.materials(str(cfg), str(sb), ans=ANS, pan=PAN)
    assert out["사례"] == 2 and out["말 줄"] == 2
    case = (sb / "judge" / "사례.md").read_text(encoding="utf-8")
    assert "나 제품" in case and "사장님 판정: 진행" in case and "G01" not in case
    said = (sb / "judge" / "말-1.md").read_text(encoding="utf-8")
    assert "첫 말" in said and "셋째 말" in said and "끝 뒤 말" not in said
    assert (sb / "judge" / "v1-1.md").exists()


def test_카드_두_벌과_사장님_ox_맞추기(tmp_path, monkeypatch):
    cfg, sb = setup(tmp_path, monkeypatch)
    kcode = eye_v2.cards(str(cfg), str(sb))
    one = (sb / "judge" / "카드-1.md").read_text(encoding="utf-8")
    assert all(f"### {k}" in one for k in kcode.values()) and "R1-01 기획" in one
    res = tmp_path / "결과"
    res.mkdir()
    k = kcode
    (res / "눈-1.md").write_text(f"| {k['R1-01']} | 조건부 | 70 | x | y |\n| {k['R1-02']} | 기각 | 20 | x | y |\n"
                                f"| {k['R1-03']} | 기각 | 10 | x | y |", encoding="utf-8")
    (res / "눈-2.md").write_text(f"| {k['R1-01']} | 보류 | 60 | x | y |\n| {k['R1-02']} | 진행 | 80 | x | y |\n"
                                f"| {k['R1-03']} | 기각 | 15 | x | y |", encoding="utf-8")
    boss = tmp_path / "사장님.md"
    boss.write_text("| R1-01 | ○ |\n| R1-02 | × |\n| R1-03 | ○ |", encoding="utf-8")
    table = eye_v2.score(str(cfg), str(res), str(boss))
    assert "| 눈 | 1.5/3 |" in table and "R1-02 ×:0.5" in table

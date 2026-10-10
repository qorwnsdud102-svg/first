# -*- coding: utf-8 -*-
"""check_rulebook — 단계별 규칙집 형식·판례 매핑 검사."""
import os, sys
import pytest
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "scripts"))

from check_rulebook import STAGES, check_rulebook, check_mapping, main


def make_book(extra=None, skip=None, rule="🔒 하드"):
    parts = ["# DA 기획 단계별 규칙", ""]
    for i, st in enumerate(STAGES):
        if st == skip:
            continue
        parts += [f"## {st} 단계{i + 1}", "- 목표: x", "- 입력: x", "- 출력: x",
                  f"- {st}-01 {rule} | 규칙 | 판례: P1001", "- 통과 조건: x", ""]
    if extra:
        parts += extra
    return "\n".join(parts)


def test_올바른_규칙집은_통과():
    errs, ids = check_rulebook(make_book())
    assert errs == []
    assert "④-01" in ids and len(ids) == 8


def test_단계가_빠지면_실패():
    errs, _ = check_rulebook(make_book(skip="⑦"))
    assert any("단계 제목" in e for e in errs)


def test_규칙_형식이_틀리면_실패():
    errs, _ = check_rulebook(make_book(extra=["- ⑧-02 하드 근거없음"]))
    assert any("형식" in e for e in errs)


def test_하드는_판례만():
    errs, _ = check_rulebook(make_book(rule="🧪 하드"))
    assert any("하드는 🔒만" in e for e in errs)


def test_번호_중복은_실패():
    errs, _ = check_rulebook(make_book(extra=["- ⑧-01 🧪 경고 | 다른 규칙 | 기본값"]))
    assert any("중복" in e for e in errs)


def test_다른_단계_번호가_섞이면_실패():
    errs, _ = check_rulebook(make_book(extra=["- ④-02 🧪 경고 | 규칙 | 기본값"]))
    assert any("단계 밑" in e for e in errs)


def test_300줄_초과는_실패():
    errs, _ = check_rulebook(make_book(extra=["메모"] * 300))
    assert any("줄 수" in e for e in errs)


def test_단계_칸이_빠지면_실패():
    book = make_book().replace("- 통과 조건: x", "", 1)
    errs, _ = check_rulebook(book)
    assert any("칸 누락" in e for e in errs)


CASES = "| P-ID | 위치 | 원문 | 요지 |\n|---|---|---|---|\n| P1001 | a.md:3 | 원문 | 요지 |\n| P1002 | a.md:9 | 원문 | 요지 |\n"


def test_매핑_누락은_실패():
    errs = check_mapping(CASES, "| P1001 | ④-01 |\n", {"④-01"})
    assert errs == ["매핑 누락 P1002"]


def test_없는_규칙을_가리키면_실패():
    errs = check_mapping(CASES, "| P1001 | ④-09 |\n| P1002 | 제외: 제품 개별 판정 |\n", {"④-01"})
    assert errs == ["P1001 → 없는 규칙 ④-09"]


def test_제외는_사유가_있어야_함():
    errs = check_mapping(CASES, "| P1001 | ④-01 |\n| P1002 | 제외: |\n", {"④-01"})
    assert errs == ["P1002 제외 사유 없음"]



# ---- 코드 품질 검토 반영 (변형 규칙 줄·단계 밖 규칙·매핑 중복·CLI 인자) ----

@pytest.mark.parametrize("line", [
    "- **⑧-02** 🧪 경고 | 규칙 | 기본값",    # 굵은 번호
    "* ⑧-02 🧪 경고 | 규칙 | 기본값",          # 별표 글머리
    "  - ⑧-02 🧪 경고 | 규칙 | 기본값",        # 들여쓰기
    "- ⑧–02 🧪 경고 | 규칙 | 기본값",          # en dash
])
def test_변형_규칙_줄은_형식_위반(line):
    errs, _ = check_rulebook(make_book(extra=[line]))
    assert any("형식" in e for e in errs)


def test_단계_밖_규칙은_위반():
    errs, _ = check_rulebook(make_book(extra=["## 부록", "- ⑧-02 🧪 경고 | 규칙 | 기본값"]))
    assert any("단계 밖 규칙" in e for e in errs)
    errs, _ = check_rulebook("- ①-01 🔒 하드 | 규칙 | 판례: P1001\n" + make_book())
    assert any("단계 밖 규칙" in e for e in errs)


def test_변형_선택자가_붙어도_통과():
    errs, ids = check_rulebook(make_book(rule="🔒\ufe0f 하드"))
    assert errs == []
    assert len(ids) == 8


def test_CRLF_줄바꿈도_통과():
    errs, ids = check_rulebook(make_book().replace("\n", "\r\n"))
    assert errs == []
    assert len(ids) == 8


def test_세자리_번호는_두자리로_오인되지_않음():
    errs = check_mapping(CASES, "| P1001 | ④-012 |\n| P1002 | 제외: 제품 개별 판정 |\n", {"④-01"})
    assert errs == ["P1001 규칙 번호 없음: ④-012"]


def test_매핑표_P_ID_중복은_실패():
    errs = check_mapping(CASES, "| P1001 | ④-01 |\n| P1001 | ④-01 |\n| P1002 | ④-01 |\n", {"④-01"})
    assert errs == ["P1001 매핑 중복"]


def test_판례_목록_P_ID_중복은_실패():
    dup_cases = CASES + "| P1001 | a.md:20 | 원문 | 요지 |\n"
    errs = check_mapping(dup_cases, "| P1001 | ④-01 |\n| P1002 | ④-01 |\n", {"④-01"})
    assert errs == ["P1001 판례 목록 중복"]


def test_판례_목록에_P_ID가_없으면_실패():
    errs = check_mapping("| P-ID | 위치 |\n|---|---|\n", "| P1001 | ④-01 |\n", {"④-01"})
    assert errs == ["판례 목록에서 P-ID를 못 찾음"]


def test_CLI는_cases와_mapping을_함께_받아야_함(monkeypatch, tmp_path):
    book = tmp_path / "book.md"
    book.write_text(make_book(), encoding="utf-8")
    for flag in ("--cases", "--mapping"):
        monkeypatch.setattr(sys, "argv", ["check_rulebook.py", str(book), flag, str(book)])
        with pytest.raises(SystemExit) as exc:
            main()
        assert exc.value.code == 2

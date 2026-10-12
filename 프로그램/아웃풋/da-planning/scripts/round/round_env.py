# -*- coding: utf-8 -*-
"""회차 도구가 함께 쓰는 경로. 회차는 환경 변수 두 개로 고른다(README.md).

DA_ROUND — 회차 폴더(예: C:\\claude\\LLM-WIKI\\마케팅\\프로젝트\\DA-기획\\기획-4회차-2026-10-13)
DA_WORK  — 작업 폴더(세션 scratchpad 아래). 판정자 샌드박스 core/·eye/와 prompt-*.txt가 여기 생긴다.
"""
import os
import re
import sys

VAULT = r"C:\claude\LLM-WIKI"
DA = os.path.join(VAULT, r"프로그램\아웃풋\da-planning")
SCRIPTS = os.path.join(DA, "scripts")
HERE = os.path.dirname(os.path.abspath(__file__))
SELF_LEARN = os.path.join(VAULT, r"마케팅\프로젝트\DA-기획\기획-시스템\자가학습")
SIGN = "\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
ENV = dict(os.environ, PYTHONIOENCODING="utf-8")


def _need(name):
    v = os.environ.get(name)
    if not v:
        sys.exit(f"환경 변수 {name}가 없다 — scripts/round/README.md")
    return os.path.normpath(v)


ROUND = _need("DA_ROUND")
WORK = _need("DA_WORK")
NO = re.search(r"기획-(\d+)회차", ROUND).group(1)
INST = os.path.join(ROUND, "_지시문")

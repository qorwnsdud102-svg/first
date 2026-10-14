# -*- coding: utf-8 -*-
"""2026-10-14 시스템 정리 2 — 낡은 메모리에 현행 표시, 정본의 같은 출처 최신 주장 표시."""
import sys

sys.stdout.reconfigure(encoding="utf-8")
M = r"C:\Users\qorwn\.claude\projects\C--claude-LLM-WIKI\memory" + "\\"
NOTE = {
    "feedback_reinforcement-loop.md": "정본은 'DA 기획 단계별 규칙'(판정 룰은 판례집). 학습은 학습 방식 v3(판정마다 바꿀 선택 하나 → 경험 장부, 생각 순서). '룰 컴파일 → 재제출'과 체크리스트 11항은 쓰지 않는다.",
    "feedback_symbol-first-planning.md": "시술 이식 범위: 지지기·손상 시술은 **얼굴 화장품**에 옮기지 않는다. 발톱·바디에는 된다(정본 ④-59·④-13, 프락셀 → 무좀 발톱 9점·튼살 바디젤 10점). 정본 경로는 `마케팅/wiki/syntheses/DA 기획 단계별 규칙.md`다.",
    "feedback_ask-canon-questions.md": "학습 v2(P6436) 이후 사장님 판정은 정본 🔒로 늘리지 않고 경험 장부·생각 순서로 간다. 같은 결핍을 계속 기획해도 된다(P6435). 드릴은 GPT가 짧은 창으로 쓴다.",
    "feedback_gpt-works-claude-judges.md": "GPT 일은 Claude가 codex exec 짧은 창으로 돌린다. Codex 앱 대화는 쓰기·네트워크가 필요한 수집만 맡는다. 드릴 6 이후 Claude는 고르지 않고 10장을 그대로 올린다. 드릴 8은 초안 3 → 카드 1이다.",
    "feedback_surging-brand-answer-key.md": "GPT 모델은 gpt-6.1-sol ultra다(2026-10-14, 아스트라 ultra는 비쌈).",
    "feedback_learning-v2-feedback-to-experience.md": "토큰 상한은 기록용 기준선이다(P6481, 멈추지 않음). 기획자가 읽는 것은 다섯이다: 지식 카드·결핍·생각 순서 v3·사례4·규칙. 지식 카드는 기초분석 목소리가 1차 자료다(P6493).",
    "feedback_da-round-workflow.md": "지금 기획은 GPT 드릴(codex exec)로 한다. Claude 기획자 10명 워크플로와 WebSearch·WebFetch 상한은 쓰지 않는다(P6375·P6481·P6493).",
    "user_claude-max-20x.md": "'GPT 협업 기본 끔'은 P6375(2026-10-13)로 뒤집혔다. 작업은 GPT, 정리·판정 화면은 Claude다.",
    "project_da-token-two-phases.md": "리셋 뒤에도 작업은 GPT(codex exec)가 하고 Claude는 정리·판정 화면을 맡는다. 'Claude 워크플로로 회차 연달아'는 쓰지 않는다.",
    "feedback_da-start-filter.md": "'한 줄 출발점 → 긴 기획서' 흐름은 지금 쉬고 있다. 상징 짝 드릴(카드 10장)이 대신한다.",
    "feedback_boss-summary-intuitive.md": "판정 카드에서 '첫 광고 장면'은 BNA로 바뀌었다(정본 ⑦-18). 드릴 카드는 가격·광고·BNA를 뺀다.",
    "feedback_boss-energy-minimize-questions.md": "드릴은 v3부터 '상위 몇 장'이 아니라 10장을 그대로 올린다(P6464).",
    "feedback_gpt-codex-token-saving.md": "본보기 스크립트는 `자가학습/상징짝-드릴/8회차/drill8.py`와 `결핍지식/만들기.py`(병렬 --jobs)다.",
}
for f, t in NOTE.items():
    p = M + f
    s = open(p, encoding="utf-8").read()
    if "⚠️ 2026-10-14 현행:" in s:
        continue
    end = s.index("\n---", 3) + len("\n---\n")
    s = s[:end] + f"\n> ⚠️ 2026-10-14 현행: {t} 전체 지도는 `기획-시스템/시스템-현황.md`.\n" + s[end:]
    open(p, "w", encoding="utf-8").write(s)
p = M + "MEMORY.md"
s = open(p, encoding="utf-8").read()
a = "지지기·손상 시술은 화장품 이식 X"
if a in s:
    s = s.replace(a, "지지기·손상 시술은 얼굴 화장품 이식 X(발톱·바디는 됨, ④-59)")
open(p, "w", encoding="utf-8").write(s)
print("memory ok")

# 정본 — 같은 출처 최신 주장 표시(사장님 판정 근거가 있는 것만)
C = r"C:\claude\LLM-WIKI\마케팅\wiki\syntheses\DA 기획 단계별 규칙.md"
s = open(C, encoding="utf-8", newline="").read()
nl = "\r\n" if s.count("\r\n") * 2 > s.count("\n") else "\n"
L = s.split(nl)


def add(rid, text, src):
    i = [k for k, l in enumerate(L) if l.startswith(f"- {rid} ")]
    assert len(i) == 1, rid
    parts = L[i[0]].split(" | ")
    if "2026-10-14 보정" in parts[1]:
        return
    parts[1] += " " + text
    parts[-1] += " · " + src
    L[i[0]] = " | ".join(parts)


add("⑤-04", "⚠️ 2026-10-14 보정(같은 출처 최신): 백옥주사 × 기미는 드릴 6에서 8점 — '몇몇 업체가 이미 쓰는 상징재'여도 결핍 전용 1순위 시술이면 통한다. 위 '너무 무난(보류)'은 이 판정으로 대체.", "P6475·P6478")
add("⑤-02", "⚠️ 2026-10-14 보정: 몇몇 업체(같은 결핍 매대 3/10 미만)가 쓰는 상징은 작은 감점이고, 결핍 전용 1순위면 8점도 가능하다.", "P6475·P6478")
add("⑩-04", "⚠️ 2026-10-14 보정: 학습 방식 v2·v3(P6436·P6464) 이후 사장님 판정은 정본 🔒로 늘리지 않고 경험 장부·생각 순서로 반영한다. 정본에는 하드 탈락과 단계 규칙만 남긴다.", "P6436·P6464")
add("⑩-25", "⚠️ 2026-10-14 보정: 드릴 6부터 Claude 선발 없이 10장을 그대로 올리고, 결핍마다 초안 3 → 카드 1, 결핍 지식 카드를 먼저 읽는다(P6464·P6492).", "P6464·P6492")
add("①-01", "⚠️ 2026-10-14 보정(목소리 조사 v2): 네이버 카페는 로그인 없이 통합검색 카페 탭 공개 결과로 모으고 상위 노출 바이럴을 판정한다. 유튜브 댓글은 단위의 20% 이하로, 영상은 음성만 받아쓴다. 잘 팔리는 제품 상단 후기는 결핍에 100% 맞는 제품만. 기초조사는 웹 검색만으로 하지 않는다.", "P6493·P6494·P6495·P6498·P6499·P6501")
open(C, "w", encoding="utf-8", newline="").write(nl.join(L))
print("canon ok")

# -*- coding: utf-8 -*-
import re, sys
sys.stdout.reconfigure(encoding="utf-8")
src = open("C:/claude/LLM-WIKI/마케팅/프로젝트/DA-기획/기획-시스템/자가학습/시험/눈-v2/지시문-정규화.md", encoding="utf-8").read()
body = src.split("```")[1].strip("\n")
d, files = sys.argv[1], sys.argv[2:]
body = body.replace("{DIR}", d).replace("{N}", str(len(files))).replace("{LIST}", ", ".join(files))
# 양식 S 카드가 없는 묶음: 양식 S 절과 규칙 8을 뺀다
body = re.sub(r"\n양식 S \(4줄\).*?(?=\n규칙\n)", "\n", body, flags=re.S)
body = re.sub(r"\n8\. 양식 S.*?(?=\n9\. )", "", body, flags=re.S)
body = body.replace("양식 F (7줄", "양식 (7줄").replace("양식 F 전체", "양식 전체")
print(body)

# -*- coding: utf-8 -*-
"""① 목소리 먼저 — 한 기획의 목소리 키워드 여러 개를 여론 조사 프로그램(crawl.py)으로 차례로 모은다(정본 ①-01·①-24).

사용: python voice_crawl.py --keywords "팔자주름,목주름,주름 없애는 법,울쎄라,써마지" --out <폴더>
        [--sites youtube,dcinside,fmkorea,natepann,arca,ruliweb,mlbpark] [--max-posts 20] [--filter smart] [--pause 30]
  키워드 = 결핍 키워드 + 그 결핍을 해소하는 유명한 대안(시술·제품) 키워드, 검색량 높은 것 여러 개(①-24).
  키워드마다 <폴더>/<키워드>.xlsx·<키워드>.log를 남기고, <폴더>/_수집.json에 사이트별 결과(글·댓글 수, 에러)를 적는다.
  crawl.py는 실패를 엑셀에 남기지 않아 화면 출력의 사이트별 줄을 읽어 남긴다.
  유튜브가 막히면(IpBlocked·429) 남은 키워드는 돌리지 않고 멈춘다. 몇 시간 뒤 같은 명령으로 다시 돌리면 받은 키워드는 건너뛴다.
  로그인이 필요한 사이트(blind·instiz·naver_cafe)는 기본에서 뺐다. 사이트를 나눠 여러 줄기로 동시에 돌려도 된다(사이트가 겹치지 않게).
"""
import argparse
import json
import os
import re
import subprocess
import sys
import time

CRAWL = r"C:\claude\크롤링\crawl.py"
SITES = ("blind", "dcinside", "fmkorea", "ruliweb", "mlbpark", "natepann", "arca", "instiz", "youtube", "naver_cafe")
DEFAULT_SITES = "youtube,dcinside,fmkorea,natepann,arca,ruliweb,mlbpark"
SITE_RE = re.compile(rf"^\s*(?:\[(?:OK|FAIL)\]\s*)?({'|'.join(SITES)}):\s*(.+?)\s*$")
COUNT_RE = re.compile(r"(\d+)개 게시글, (\d+)개 댓글")
BLOCK_RE = re.compile(r"IpBlocked|HTTP Error 429|Too Many Requests", re.I)


def safe(name):
    return re.sub(r'[\\/:*?"<>|\s]+', "_", name.strip())


def parse_sites(stdout, sites=""):
    """사이트 → {'글', '댓글', '에러'}. 같은 사이트 줄이 여러 번 나오면 마지막 것.
    사이트를 하나만 주면 crawl.py가 사이트별 줄 없이 '필터 적용 후: N개 게시글, M개 댓글'만 찍는다 — 그 마지막 합계를 그 사이트로 읽는다."""
    out = {}
    if sites and "," not in sites and not SITE_RE.search(stdout or ""):
        c = COUNT_RE.findall(stdout or "")
        return {sites.strip(): {"글": int(c[-1][0]), "댓글": int(c[-1][1]), "에러": None}} if c else {}
    for ln in stdout.splitlines():
        m = SITE_RE.match(ln)
        if not m:
            continue
        c = COUNT_RE.search(m.group(2))
        if c:
            out[m.group(1)] = {"글": int(c.group(1)), "댓글": int(c.group(2)), "에러": None}
        elif "에러" in m.group(2):
            out[m.group(1)] = {"글": 0, "댓글": 0, "에러": m.group(2)}
    return out


def run(keywords, out, sites=DEFAULT_SITES, max_posts=20, filt="smart", pause=30,
        crawl=CRAWL, runner=subprocess.run, sleep=time.sleep):
    os.makedirs(out, exist_ok=True)
    state_path = os.path.join(out, "_수집.json")
    state = json.load(open(state_path, encoding="utf-8")) if os.path.exists(state_path) else []
    done = {s["키워드"] for s in state if s.get("파일") and not s.get("막힘")}
    env = dict(os.environ, PYTHONIOENCODING="utf-8")
    ran = 0
    for kw in keywords:
        if kw in done:
            continue
        if ran:
            sleep(pause)
        ran += 1
        xlsx = os.path.join(out, safe(kw) + ".xlsx")
        cmd = [sys.executable, crawl, "crawl", sites, kw, "--max-posts", str(max_posts),
               "--filter", filt, "--output", xlsx]
        r = runner(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace",
                   cwd=os.path.dirname(crawl), env=env)
        log = (r.stdout or "") + (r.stderr or "")
        with open(os.path.join(out, safe(kw) + ".log"), "w", encoding="utf-8") as f:
            f.write(log)
        rec = {"키워드": kw, "파일": xlsx if os.path.exists(xlsx) else None, "사이트": parse_sites(r.stdout or "", sites),
               "종료코드": r.returncode, "막힘": bool(BLOCK_RE.search(log)),
               "시각": time.strftime("%Y-%m-%d %H:%M")}
        state = [s for s in state if s["키워드"] != kw] + [rec]
        with open(state_path, "w", encoding="utf-8") as f:
            json.dump(state, f, ensure_ascii=False, indent=1)
        print(f"{kw}: " + ", ".join(f"{k} {v['글']}/{v['댓글']}" + (" ✗" if v["에러"] else "")
                                    for k, v in rec["사이트"].items()) + (" — 막힘" if rec["막힘"] else ""), flush=True)
        if rec["막힘"]:
            print(f"막힘 — '{kw}'에서 멈춤. 몇 시간 뒤 같은 명령으로 다시 돌린다.")
            break
    return state


def main(argv=None):
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--keywords", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--sites", default=DEFAULT_SITES)
    ap.add_argument("--max-posts", type=int, default=20)
    ap.add_argument("--filter", default="smart", choices=["none", "title", "smart"])
    ap.add_argument("--pause", type=int, default=30)
    a = ap.parse_args(argv)
    kws = [k.strip() for k in re.split(r"[,;\n]", a.keywords) if k.strip()]
    run(kws, a.out, a.sites, a.max_posts, a.filter, a.pause)
    return 0


if __name__ == "__main__":
    sys.exit(main())

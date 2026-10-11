# -*- coding: utf-8 -*-
"""히트 해부 2차 보강용 — 오래 돈 광고 영상에서 장면을 뽑아 한 장짜리 모아보기(jpg)로 만든다.

사용: python hit_ad_frames.py <수집 폴더> <브랜드> <출력 폴더> [--groups 6] [--per 2]
  소재 번호는 hit_ads_digest.py와 같다(같은 본문 묶음, 오래 돈 순).
  영상마다 '앞'(0.5~18.5초 6장면, 첫 장면 = 1초 후킹)과, 24초보다 길면 '뒤'(18초~끝 6장면)를 3x2로 붙인다.
  이미지 소재는 출력 폴더로 옮겨 적는다(에이전트가 출력 폴더만 읽게).
  ffmpeg는 imageio_ffmpeg에 든 것을 쓴다.
"""
import argparse
import os
import re
import shutil
import subprocess
import sys

import imageio_ffmpeg

from hit_ads_digest import load_groups


def duration(ffmpeg, src):
    err = subprocess.run([ffmpeg, "-i", src], capture_output=True, text=True, encoding="utf-8", errors="replace").stderr
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", err)
    return int(m[1]) * 3600 + int(m[2]) * 60 + float(m[3]) if m else 0.0


def sheet(ffmpeg, src, dst, start, span):
    """start초부터 span초 동안 6장면을 고르게 뽑아 3x2로 붙인다."""
    cmd = [ffmpeg, "-y", "-loglevel", "error", "-ss", f"{start:.1f}", "-t", f"{span:.1f}", "-i", src,
           "-vf", f"fps=6/{span:.1f},scale=360:-2,tile=3x2", "-frames:v", "1", dst]
    return subprocess.run(cmd, capture_output=True, text=True).returncode == 0 and os.path.exists(dst)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    ap.add_argument("brand")
    ap.add_argument("out")
    ap.add_argument("--groups", type=int, default=6)
    ap.add_argument("--per", type=int, default=2)
    ap.add_argument("--skip", nargs="*", default=[], help="이미 본 _ads.json — 그 광고는 뺀다")
    a = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    _, _, rows, files = load_groups(a.root, a.brand, a.skip)
    od = os.path.join(a.out, a.brand)
    os.makedirs(od, exist_ok=True)
    lines = [f"# {a.brand} — 오래 돈 소재 장면 모아보기", "",
             "영상마다 '앞' = 0.5~18.5초 6장면(왼쪽 위 = 첫 장면), '뒤' = 18초~끝 6장면. 소재 번호는 소재 요약과 같다.", ""]
    for n, g in enumerate(rows[:a.groups], 1):
        days = max(x.get("days_running") or 0 for x in g)
        media = [p for x in g for p in files.get(x["id"], [])]
        vids = [p for p in media if p.lower().endswith(".mp4")][:a.per]
        imgs = [p for p in media if not p.lower().endswith(".mp4")][:a.per]
        got = []
        for k, v in enumerate(vids, 1):
            src = os.path.join(a.root, a.brand, v)
            dur = duration(ffmpeg, src) or 18.0
            dst = os.path.join(od, f"소재{n}-영상{k}-앞.jpg")
            if sheet(ffmpeg, src, dst, 0.5, min(18.0, max(dur - 0.5, 1.0))):
                got.append(dst)
            if dur > 24:
                dst = os.path.join(od, f"소재{n}-영상{k}-뒤.jpg")
                if sheet(ffmpeg, src, dst, 18.0, dur - 18.5):
                    got.append(dst)
        for k, p in enumerate(imgs, 1):  # 해부 에이전트가 출력 폴더만 읽도록 이미지도 옮겨 둔다
            dst = os.path.join(od, f"소재{n}-이미지{k}{os.path.splitext(p)[1]}")
            shutil.copyfile(os.path.join(a.root, a.brand, p), dst)
            got.append(dst)
        lines.append(f"- 소재 {n} (최장 {days}일): " + (", ".join(got) if got else "영상·이미지 없음"))
    open(os.path.join(od, "장면.md"), "w", encoding="utf-8").write("\n".join(lines) + "\n")
    print(os.path.join(od, "장면.md"))


if __name__ == "__main__":
    main()

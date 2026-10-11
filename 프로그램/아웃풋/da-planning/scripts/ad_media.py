# -*- coding: utf-8 -*-
"""광고 영상 보조 — 장면 모아보기와 음성 받아쓰기.
사장님 2026-10-11: 사진 1장·첫 장면만이 아니라 "전체 이미지, 음성 분석은 못하는지?"(P6237).

사용:
  python ad_media.py asr <영상.mp4> [...] [--out <폴더>]   → 영상마다 <이름>.음성.txt('[초] 문장' 줄)
  python ad_media.py sheet <영상.mp4> <출력 이름(확장자 없이)>  → <출력>-앞.jpg(0.5~18.5초 6장면), 24초보다 길면 <출력>-뒤.jpg
받아쓰기는 이 PC 안에서 faster-whisper small(CPU, 내려받아 둔 모델만)로 한다. 밖으로 보내지 않는다.
음악만 있는 구간은 잘라 내고(VAD) 듣는다. 못 들으면 빈 결과를 낸다(우아한 실패).
매대 비율(shelf_share.py build --frames --asr)과 히트 해부(hit_ad_frames.py --asr)가 이 모듈을 쓴다.
"""
import argparse
import os
import re
import subprocess
import sys
import tempfile

_MODEL = None


def ffmpeg_exe():
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()


def duration(ffmpeg, src):
    err = subprocess.run([ffmpeg, "-i", src], capture_output=True, text=True, encoding="utf-8", errors="replace").stderr
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", err)
    return int(m[1]) * 3600 + int(m[2]) * 60 + float(m[3]) if m else 0.0


def sheet(ffmpeg, src, dst, start=0.5, span=18.0):
    """start초부터 span초 동안 6장면을 고르게 뽑아 3x2로 붙인다(왼쪽 위 = 첫 장면)."""
    cmd = [ffmpeg, "-y", "-loglevel", "error", "-ss", f"{start:.1f}", "-t", f"{span:.1f}", "-i", src,
           "-vf", f"fps=6/{span:.1f},scale=360:-2,tile=3x2", "-frames:v", "1", dst]
    return subprocess.run(cmd, capture_output=True, text=True).returncode == 0 and os.path.exists(dst)


def sheets(ffmpeg, src, stem):
    """앞(0.5~18.5초)과, 24초보다 길면 뒤(18초~끝) 모아보기 → 만든 파일 경로 목록"""
    dur = duration(ffmpeg, src) or 18.0
    out = []
    if sheet(ffmpeg, src, stem + "-앞.jpg", 0.5, min(18.0, max(dur - 0.5, 1.0))):
        out.append(stem + "-앞.jpg")
    if dur > 24 and sheet(ffmpeg, src, stem + "-뒤.jpg", 18.0, dur - 18.5):
        out.append(stem + "-뒤.jpg")
    return out


def fmt_segments(segs, limit=None):
    """[(시작, 끝, 문장)] → '[12.3] 문장' 줄들. limit 글자를 넘으면 자른다."""
    text = "\n".join(f"[{s:.1f}] {t.strip()}" for s, _, t in segs if t.strip())
    return text if not limit or len(text) <= limit else text[:limit] + "…"


def transcribe(src, ffmpeg=None):
    """영상 → [(시작, 끝, 문장)]. 모델이 없거나 실패하면 []."""
    global _MODEL
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        return []
    ffmpeg = ffmpeg or ffmpeg_exe()
    with tempfile.TemporaryDirectory() as d:
        wav = os.path.join(d, "a.wav")
        r = subprocess.run([ffmpeg, "-y", "-loglevel", "error", "-i", src, "-vn", "-ac", "1", "-ar", "16000", wav],
                           capture_output=True)
        if r.returncode or not os.path.exists(wav):
            return []
        try:
            if _MODEL is None:
                _MODEL = WhisperModel("small", device="cpu", compute_type="int8", local_files_only=True)
            segs, _ = _MODEL.transcribe(wav, language="ko", vad_filter=True)
            return [(s.start, s.end, s.text) for s in segs]
        except Exception as e:  # 모델 파일이 없거나 깨진 영상 — 부분 결과로 간다
            print(f"받아쓰기 실패 {os.path.basename(src)}: {e}", file=sys.stderr)
            return []


def main(argv=None):
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("asr")
    s.add_argument("videos", nargs="+")
    s.add_argument("--out")
    t = sub.add_parser("sheet")
    t.add_argument("video")
    t.add_argument("stem")
    a = ap.parse_args(argv)
    if a.cmd == "sheet":
        for p in sheets(ffmpeg_exe(), a.video, a.stem):
            print(p)
        return 0
    for v in a.videos:
        text = fmt_segments(transcribe(v))
        d = a.out or os.path.dirname(os.path.abspath(v))
        os.makedirs(d, exist_ok=True)
        p = os.path.join(d, os.path.splitext(os.path.basename(v))[0] + ".음성.txt")
        with open(p, "w", encoding="utf-8") as f:
            f.write(text + "\n")
        print(p, f"({len(text)}자)")
    return 0


if __name__ == "__main__":
    sys.exit(main())

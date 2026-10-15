"""수집기가 도는 동안만 이 PC가 절전(유휴 잠자기)에 들지 않게 운영체제에 요청한다. 설정은 바꾸지 않는다(프로세스가 끝나면 요청도 사라짐).
사용: python keep_awake_while.py <감시할 명령줄 일부, 예: deficit_book_run>"""
import ctypes, subprocess, sys, time
ES_CONTINUOUS, ES_SYSTEM_REQUIRED = 0x80000000, 0x00000001
key = sys.argv[1]
def alive():
    out = subprocess.run(['powershell', '-NoProfile', '-Command', f"@(Get-CimInstance Win32_Process | Where-Object {{ $_.CommandLine -match '{key}' -and $_.Name -match 'python' -and $_.CommandLine -notmatch 'keep_awake_while' }}).Count"], capture_output=True, text=True)
    return out.stdout.strip() not in ('', '0')
while alive():
    ctypes.windll.kernel32.SetThreadExecutionState(ES_CONTINUOUS | ES_SYSTEM_REQUIRED)
    time.sleep(60)
ctypes.windll.kernel32.SetThreadExecutionState(ES_CONTINUOUS)
print('수집기 끝 — 잠자기 막기 해제')

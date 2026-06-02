"""
공통 모듈: API 키 로드 + 인증 헤더 + 도메인 상수(정책=데이터).

⑥ 정책=데이터: 제외 리스트·임계값·접미사는 코드 본문이 아니라 여기 상수로.
⑧ 가정 명시: 키 파일 탐색 경로 fallback(루트→scripts/).
"""
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)

# ── 정책 = 데이터 (주제 바꿀 때 여기만 수정) ─────────────────
THRESHOLD_NEW = 300        # TODO: 신규 판정 임계값
EXCLUDE = []               # TODO: 제외 리스트 (대형 브랜드 등)
# SUFFIXES = []            # TODO: 제품 접미사
# GENERIC = []             # TODO: 건너뛸 일반명사


def load_keys(path=None):
    """api_keys.txt 로드. 탐색: 지정경로 → 프로젝트 루트 → scripts/."""
    if path and os.path.exists(path):
        pass
    elif os.path.exists(os.path.join(PROJECT_DIR, 'api_keys.txt')):
        path = os.path.join(PROJECT_DIR, 'api_keys.txt')
    elif os.path.exists(os.path.join(SCRIPT_DIR, 'api_keys.txt')):
        path = os.path.join(SCRIPT_DIR, 'api_keys.txt')
    else:
        raise FileNotFoundError(
            "api_keys.txt 없음. api_keys.txt.example 복사 후 키 입력:\n"
            f"  cp {PROJECT_DIR}/api_keys.txt.example {PROJECT_DIR}/api_keys.txt"
        )
    keys = {}
    with open(path, encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            k, v = line.split('=', 1)
            keys[k.strip()] = v.strip()
    return keys


# TODO: 이 도구의 인증 헤더 생성기. 예시:
# def auth_headers(keys):
#     return {'X-API-KEY': keys['SERVICE_KEY']}

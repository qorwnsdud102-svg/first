"""M18 소급: 검색량/<결핍>.json → 결핍책 §1-1 · 기획카드 '검색량 한 줄' (모델 없음, 다시 돌리면 같은 칸을 바꿔 씀).
사용: python deficit_kw_to_book.py [결핍 ...] [--all]"""
import json, re, sys
from pathlib import Path
BOOK = Path(r'C:\claude\LLM-WIKI\마케팅\프로젝트\DA-기획\결핍책')
KV = BOOK / '검색량'
HEAD = '## 1-1. 검색량으로 본 시장·타겟'
CARD = '- **검색량 한 줄(M18)**:'


def demo_s(x):
    if not x or x == '한도': return '쇼핑 클릭 적음' if not x else '한도 — 다음 실행', ''
    g, a = x.get('성별', {}), x.get('연령', {})
    return f"여 {g.get('f', 0)} · 남 {g.get('m', 0)}", ' · '.join(f'{k}대 {v}' for k, v in sorted(a.items(), key=lambda kv: -kv[1])[:3])


def market(p):
    return '이미 제품 시장이 형성된 키워드' if p >= 40 else ('제품 검색이 중간' if p >= 15 else '아직 정보·병원 단계(제품 검색 적음)')


def parts(d):
    seek = {t: p for t, v, p, _ in d['찾는 것']}
    sol = [(t, v) for t, v, p, _ in d['해결책'] if t != '(말 없음)'][:5]
    tg = [(t, p) for t, v, p, _ in d['타겟'] if t != '(말 없음)'][:4]
    br = [(b, v) for b, v, p, _ in d['브랜드 후보'] if v >= 100][:6]
    top = [(r['키워드'], r['vol']) for r in d['상위'][:3]]
    dm = d['쇼핑 클릭'][0] if d['쇼핑 클릭'] else None
    peak = next(iter(d['추이'].values()), None)
    return seek, sol, tg, br, top, dm, peak


def section(d):
    seek, sol, tg, br, top, dm, peak = parts(d)
    L = [HEAD + ' (M18 자동 · 모델 없음)', '',
         f"측정 {d['측정']} · 네이버 검색광고 월간 검색량(PC+모바일, 측정 시점 최근 30일) · 관련 키워드 {d['관련 키워드 수']}개 합계 {d['관련 합계']:,}회 · 전체 표 `검색량/{d['결핍']}.md`", '',
         f"- **가장 큰 키워드**: " + ' · '.join(f'{k} {v:,}' for k, v in top),
         f"- **시장 형성**: 제품형 검색 {seek.get('제품형', 0)}% · 의료·시술 {seek.get('의료·시술', 0)}% · 셀프 관리 {seek.get('셀프 관리', 0)}% · 정보 탐색 {seek.get('정보 탐색', 0)}% → {market(seek.get('제품형', 0))}(기준: 제품형 40% 이상 형성 · 15~40% 중간)",
         '- **주된 대안(결핍 낱말 + 해결책 검색량)**: ' + (' · '.join(f'{t} {v:,}' for t, v in sol) if sol else '해결책이 붙은 검색이 거의 없다'),
         '- **타겟 말이 붙은 검색**: ' + (' · '.join(f'{t} {p}%' for t, p in tg) if tg else '없음(결핍 이름·해결책만 검색)'),
         '- **유명 제품·브랜드 후보(집중 분석 대상, 자동 추출 — 일반어가 섞이면 걸러 읽는다)**: ' + (' · '.join(f'{b} {v:,}' for b, v in br) if br else '없음'),
         f"- **성별·연령(쇼핑 클릭, {dm['키워드']} · {dm['분류']})**: 여 {dm.get('성별', {}).get('f', '?')} · 연령 " + ' · '.join(f'{k}대 {v}' for k, v in sorted(dm.get('연령', {}).items(), key=lambda kv: -kv[1])[:3]) if dm else '- **성별·연령**: 쇼핑 클릭 적음(정보 검색어 위주) — 목소리의 나이 언급으로 본다',
         f"- **많이 찾는 달(3년 추이)**: {', '.join(f'{m}월' for m in peak['많이 찾는 달'])} · 최저 {peak['최저 달']}월 · 최근 12개월 증감 {peak['최근12개월 증감%']}%" if peak else '- **많이 찾는 달**: 추이 자료 없음',
         '', '|연관 키워드|월간 검색량|성별(쇼핑 클릭)|연령 상위 3|찾는 것|타겟|', '|---|---:|---|---|---|---|']
    for r in d['상위'][:20]:
        g, a = demo_s(r.get('쇼핑'))
        L.append(f"|{r['키워드']}|{r['vol']:,}|{g}|{a}|{','.join(r.get('찾는 것') or [])}|{','.join(r.get('타겟') or [])}|")
    return '\n'.join(L) + '\n'


def card_line(d):
    seek, sol, tg, br, top, dm, peak = parts(d)
    s = f"{CARD} 큰 키워드 " + ' · '.join(f'{k} {v:,}' for k, v in top)
    s += f" / {market(seek.get('제품형', 0))}(제품형 {seek.get('제품형', 0)}%)"
    if sol: s += ' / 주된 대안 ' + ' > '.join(f'{t} {v:,}' for t, v in sol[:3])
    if tg: s += ' / 타겟 ' + ' · '.join(f'{t} {p}%' for t, p in tg[:2])
    if br: s += ' / 유명 ' + ' · '.join(b for b, _ in br[:3])
    if dm: s += f" / 쇼핑 클릭 여 {dm.get('성별', {}).get('f', '?')} · " + ' · '.join(f'{k}대' for k, _ in sorted(dm.get('연령', {}).items(), key=lambda kv: -kv[1])[:2])
    return s + f" (`검색량/{d['결핍']}.md`)"


def apply(name):
    jp = KV / f'{name}.json'; bk = BOOK / '결핍' / name / '결핍책.md'; cd = BOOK / '결핍' / name / '기획카드.md'
    if not jp.exists() or not bk.exists(): return '건너뜀(검색량 또는 책 없음)'
    d = json.loads(jp.read_text(encoding='utf-8')); sec = section(d)
    t = bk.read_text(encoding='utf-8')
    if HEAD in t:
        i = t.index(HEAD); j = t.find('\n## ', i + len(HEAD)); t = t[:i] + sec + ('\n' + t[j + 1:] if j >= 0 else '')
    else:
        m = re.search(r'\n## 2\.', t)
        t = t[:m.start() + 1] + sec + '\n' + t[m.start() + 1:] if m else t.rstrip('\n') + '\n\n' + sec
    bk.write_text(t, encoding='utf-8')
    if cd.exists():
        c = cd.read_text(encoding='utf-8'); line = card_line(d)
        if CARD in c: c = re.sub(re.escape(CARD) + r'[^\n]*', lambda _: line, c, count=1)
        else:
            m = re.search(r'\n- \*\*타겟·장면\*\*[^\n]*', c) or re.search(r'\n- 타겟·장면[^\n]*', c)
            c = c[:m.end()] + '\n' + line + c[m.end():] if m else c.rstrip('\n') + '\n' + line + '\n'
        cd.write_text(c, encoding='utf-8')
    return '§1-1·카드 줄 씀'


if __name__ == '__main__':
    names = sorted(p.stem for p in KV.glob('*.json') if not p.stem.startswith('_') and p.stem != '허리디스크') if '--all' in sys.argv else sys.argv[1:]
    for n in names: print(n, apply(n))

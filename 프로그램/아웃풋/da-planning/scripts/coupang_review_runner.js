// 쿠팡 후기 자동 받기 v2 — 사장님 크롬(Claude in Chrome)의 www.coupang.com/robots.txt 탭에 넣어 돌린다.
// 사장님 2026-10-16: "쿠팡 후기를 너 스스로 다운받을수있게", "제품후기를 더 많이받고싶어", 메타 판매 제품의 실제 후기는 쿠팡에서.
// - 결핍마다 검색어로 제품을 고르고(이름에 결핍 단어가 든 것 후기순, 그런 제품이 5개 미만일 때만 일반 제품 최대 2, 같은 브랜드 하나),
//   후기를 최대 1,000개(메타 판매 제품 600개) 받아 다운로드 폴더에 claude-reviews-<결핍>-<productId>.json으로 내린다(review_json_to_xlsx.py가 엑셀로).
// - 10-16 실측: 2줄은 1분 만에 403 → 1줄, 요청 사이 1.6~2.4초, 제품 사이 45~75초, 검색 사이 20~30초.
// - 봇 차단 쿠키는 제품 페이지를 열 때만 새로 고쳐진다 → '데우기 창'(버튼 클릭으로 잡은 창)에서 그 제품 페이지를 먼저 연 뒤 후기를 받는다.
//   403이면 한 번 더 데우고 다시 시도, 그래도 막히면 30분 쉰다. 우회하지 않는다.
// - 가려진 탭의 setTimeout은 1분에 한 번으로 늦춰진다 → 쉬는 시간은 웹 워커 타이머로 잰다.
// - v2(10-16 18:06 탭 멈춤 뒤): 같은 출처 창은 이벤트 루프를 같이 쓴다 → 후기를 다 받으면 데우기 창을 about:blank로 비워 무거운 상품 페이지가 계속 떠 있지 않게 한다.
//   메타 판매 제품(t.meta)은 검색 맨 앞에서 브랜드 이름이 든 제품 1개만 고르고, 이미 받은 것(done)이 상위 3개 안에 있으면 건너뛴다.
//   S.beat(마지막으로 움직인 시각)로 멈춤을 밖에서 알아본다.
//   10-16 20:24: 30분 쉬고 첫 검색이 또 403 — 쿠키가 낡은 채 검색만 다시 했기 때문. 쉼이 끝나기 25초 전에 데우기 창으로 상품 페이지를 연다(아래 rewarm 루프). 검색 간격 30~45초. 받은 상품은 review_json_to_xlsx.py가 후기-받은함/_받은상품.tsv에 남긴다(이어 받기용).
// 사용: window.__crStart(TASKS, {skip:[pid...], done:[pid...]})  TASKS = [{deficit, words, queries, k?, max?, meta?, tag?}]
//      window.__crAdd(TASKS) — 돌고 있는 중에 더 넣기. 상태: window.__cr
(() => {
  const W = new Worker(URL.createObjectURL(new Blob(['onmessage=e=>setTimeout(()=>postMessage(e.data.id),e.data.ms)'], {type: 'text/javascript'})));
  let seq = 0; const waiters = {}; W.onmessage = e => { const f = waiters[e.data]; delete waiters[e.data]; if (f) f(); };
  const sleep = ms => new Promise(r => { const id = ++seq; waiters[id] = r; W.postMessage({id, ms}); });
  const S = window.__cr = {log: [], done: [], fail: [], queue: [], picked: {}, miss: [], blockedUntil: 0, phase: 'idle', beat: Date.now(), ver: 2};
  const jitter = (a, b) => a + Math.random() * (b - a);
  const log = m => { S.log.push(new Date().toTimeString().slice(0, 8) + ' ' + m); if (S.log.length > 300) S.log.shift(); S.beat = Date.now(); };
  const b = document.createElement('button'); b.id = 'cr-warm-open'; b.textContent = '데우기 창 잡기';
  b.style.cssText = 'position:fixed;top:8px;right:8px;z-index:2147483647;padding:14px 18px;background:#ffd400;font-size:18px;border:2px solid #000';
  b.onclick = () => { S.warm = window.open('about:blank', 'cr_warm'); log('데우기 창 잡음'); };
  document.body.appendChild(b);
  async function warm(pid) {
    if (!S.warm || S.warm.closed) return false;
    try { S.warm.location.href = `https://www.coupang.com/vp/products/${pid}`; } catch (e) { return false; }
    await sleep(jitter(7000, 9000));
    try { const d = S.warm.document; S.warm.scrollTo(0, d.body.scrollHeight * 0.6); } catch (e) {}
    await sleep(jitter(2500, 3500)); return true;
  }
  function rest() { try { if (S.warm && !S.warm.closed) S.warm.location.href = 'about:blank'; } catch (e) {} }
  async function waitBlock() { while (Date.now() < S.blockedUntil) { S.beat = Date.now(); await sleep(30000); } }
  function block(where) { S.blockedUntil = Date.now() + 30 * 60 * 1000; log('403 막힘(' + where + ') — 30분 쉼'); }
  async function search(q) {
    await waitBlock();
    const r = await fetch('/np/search?q=' + encodeURIComponent(q) + '&listSize=36', {credentials: 'include', referrer: 'https://www.coupang.com/'});
    if (r.status !== 200) { if (r.status === 403) block('검색 ' + q); return null; }
    const doc = new DOMParser().parseFromString(await r.text(), 'text/html');
    const seen = new Set(), items = [];
    for (const l of doc.querySelectorAll('li[class*=ProductUnit], li.search-product')) {
      const a = l.querySelector('a[href*="/vp/products/"]'); if (!a) continue;
      const id = (a.getAttribute('href').match(/products\/(\d+)/) || [])[1]; if (!id || seen.has(id)) continue; seen.add(id);
      const n = ((l.querySelector('[class*=productName], .name') || {}).textContent || '').trim();
      const m = l.textContent.match(/\((\d[\d,]*)\)/);
      items.push({id, n, r: m ? +m[1].replace(/,/g, '') : 0});
    }
    return items;
  }
  const norm = s => s.replace(/\s/g, '').toLowerCase();
  const hasWord = (n, words) => words.some(w => norm(n).includes(norm(w)));
  function pick(items, words, skip, k, minR) {
    const brand = n => (n.replace(/^\[[^\]]*\]\s*/, '').split(/\s+/)[0] || '').slice(0, 12);
    const ok = items.filter(x => x.r >= minR && !skip.has(x.id));
    const named = ok.filter(x => hasWord(x.n, words)).sort((a, b) => b.r - a.r);
    const other = ok.filter(x => !named.includes(x)).sort((a, b) => b.r - a.r);
    const out = [], brands = new Set();
    for (const [list, cap] of [[named, k], [other, named.length >= Math.min(5, k) ? 0 : 2]]) {
      let c = 0;
      for (const x of list) {
        if (out.length >= k || c >= cap) break;
        if (out.includes(x) || brands.has(brand(x.n))) continue;
        out.push(x); brands.add(brand(x.n)); c++;
      }
    }
    return out.slice(0, k);
  }
  async function reviews(pid, max) {
    const rows = []; let st = 200, total = null, rewarmed = false;
    await warm(pid);
    for (let p = 1; p <= Math.ceil(max / 30); p++) {
      await waitBlock();
      const r = await fetch(`/next-api/review?productId=${pid}&page=${p}&size=30&sortBy=ORDER_SCORE_ASC&ratingSummary=true&ratings=&market=`, {credentials: 'include', referrer: `https://www.coupang.com/vp/products/${pid}`});
      st = r.status; S.beat = Date.now();
      if (st === 403 && !rewarmed) { rewarmed = true; log('403 → 다시 데움 ' + pid); if (await warm(pid)) { p--; continue; } }
      if (st !== 200) { if (st === 403) block('후기 ' + pid); break; }
      let j; try { j = await r.json(); } catch (e) { st = -1; break; }
      const pg = (j.rData || {}).paging || {}; total = pg.totalCount ?? total;
      const list = pg.contents || []; if (!list.length) break;
      for (const c of list) rows.push([c.reviewAt, c.reviewId, c.displayName || '', c.vendorName || '', c.itemName || '', c.rating, c.title || '', c.content || '', (c.attachments || []).length, c.helpfulCount ?? 0, c.helpfulTrueCount ?? 0, c.vendorItemId || c.itemId || '']);
      if (!pg.isNext && p >= (pg.totalPage || p)) break;
      await sleep(jitter(1600, 2400));
    }
    rest();
    return {rows, st, total};
  }
  function save(deficit, pid, rows) {
    const bl = new Blob([JSON.stringify({productId: pid, deficit, rows})], {type: 'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(bl); a.download = `claude-reviews-${deficit}-${pid}.json`;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 60000);
  }
  async function worker(opt) {
    while (true) {
      const job = S.queue.shift();
      if (!job) { if (S.searching || (S.pending && S.pending.length)) { S.beat = Date.now(); await sleep(15000); continue; } return; }
      try {
        const res = await reviews(job.id, job.max || opt.max);
        if (res.rows.length) { save(job.deficit, job.id, res.rows); S.done.push(`${job.deficit}|${job.id}|${res.rows.length}/${res.total}|${job.n.slice(0, 30)}`); S.doneSet.add(job.id); }
        if (res.st !== 200) { S.fail.push(`${job.deficit}|${job.id}|${res.st}`); if (res.st === 403 && res.rows.length < 300) S.queue.unshift(job); }
        log(`${job.deficit} ${job.id} 받음 ${res.rows.length}/${res.total} (${res.st})`);
      } catch (e) { S.fail.push(`${job.deficit}|${job.id}|${String(e).slice(0, 60)}`); rest(); }
      await sleep(jitter(opt.gapMin, opt.gapMax));
    }
  }
  async function choose(t, opt) {
    const all = [];
    for (const q of (t.meta ? t.queries.slice(0, 1) : t.queries)) { let res = await search(q); if (res === null) res = await search(q); all.push(...(res || [])); await sleep(jitter(opt.searchMin, opt.searchMax)); }
    const uniq = [...new Map(all.map(x => [x.id, x])).values()];
    const key = t.deficit + (t.tag ? ':' + t.tag : '');
    if (t.meta) {
      const named = uniq.filter(x => x.r >= 5 && hasWord(x.n, t.words)).sort((a, b) => b.r - a.r);
      if (named.slice(0, 3).some(x => S.doneSet.has(x.id))) { log(`메타 ${key} 이미 받음`); return; }
      const x = named.find(x => !S.skip.has(x.id));
      if (!x) { S.miss.push(key); log(`메타 ${key} 못 찾음`); return; }
      S.skip.add(x.id); S.picked[key] = `${x.id}|${x.r}|${x.n.slice(0, 40)}`;
      S.queue.unshift({deficit: t.deficit, id: x.id, n: x.n, max: t.max || 600}); log(`메타 ${key} → ${x.n.slice(0, 30)}`); return;
    }
    const chosen = pick(uniq, t.words, S.skip, t.k ?? opt.perDeficit, t.minR ?? 30);
    chosen.forEach(x => S.skip.add(x.id));
    S.picked[key] = chosen.map(x => `${x.id}|${x.r}|${x.n.slice(0, 40)}`);
    S.queue.push(...chosen.map(x => ({deficit: t.deficit, id: x.id, n: x.n, max: t.max})));
    log(`${key} 고름 ${chosen.length}개(검색 ${uniq.length})`);
  }
  (async () => {   // 쉼이 끝나기 직전에 쿠키를 데운다(검색 경로는 스스로 데우지 않으므로)
    while (true) {
      await sleep(8000); const left = S.blockedUntil - Date.now();
      if (left > 0 && left < 25000 && S._warmedFor !== S.blockedUntil) {
        S._warmedFor = S.blockedUntil; const pid = (S.queue[0] || {}).id || '7403460016';
        try { S.warm.location.href = `https://www.coupang.com/vp/products/${pid}`; log('쉼 끝나기 전 데움 ' + pid); } catch (e) {}
        await sleep(12000); try { S.warm.scrollTo(0, S.warm.document.body.scrollHeight * 0.6); } catch (e) {}
      }
    }
  })();
  window.__crAdd = tasks => { S.pending = (S.pending || []).concat(tasks); if (S.phase === 'end') window.__crStart([], S.opt); return S.pending.length; };
  window.__crStart = async (tasks, opt = {}) => {
    opt = S.opt = Object.assign({skip: [], done: [], perDeficit: 8, max: 1000, gapMin: 45000, gapMax: 75000, searchMin: 30000, searchMax: 45000}, opt);
    S.phase = 'run'; S.searching = true; S.pending = (S.pending || []).concat(tasks);
    S.doneSet = S.doneSet || new Set(opt.done.map(String));
    S.skip = S.skip || new Set(opt.skip.map(String).concat(opt.done.map(String)));
    const w = worker(opt);
    while (S.pending.length) { const t = S.pending.shift(); if ((t.k ?? 1) <= 0) continue; try { await choose(t, opt); } catch (e) { log('고르기 실패 ' + t.deficit + ' ' + String(e).slice(0, 60)); } }
    S.searching = false; await w; S.phase = 'end'; log('끝');
  };
})();

// 쿠팡 후기 자동 받기 — 사장님 크롬(Claude in Chrome)의 www.coupang.com/robots.txt 탭에 넣어 돌린다.
// 사장님 2026-10-16: "쿠팡 후기를 너 스스로 다운받을수있게", "제품후기를 더 많이받고싶어", "2개 병렬까진 괜찮지 않을까?"
// - 결핍마다 검색어로 제품을 고르고(이름에 결핍 단어가 든 것 후기순 최대 5 + 검색 상위 일반 제품 최대 3, 같은 브랜드 하나), 후기를 최대 1500개 받아
//   다운로드 폴더에 claude-reviews-<결핍>-<productId>.json으로 내린다(review_json_to_xlsx.py가 엑셀로 바꿈).
// - 10-16 실측: 2줄(요청 사이 1.0~1.6초)은 1분 만에 403 → 1줄, 요청 사이 1.6~2.4초, 제품 사이 45~75초, 검색 사이 20~30초, 제품당 최대 1,000개.
// - 403이 나오면 30분 쉬고 이어 간다. 우회하지 않는다.
// 사용(콘솔/JS 실행): window.__crStart(TASKS, {skip:[pid...], perDeficit:8, max:1500, lines:2})
//   TASKS = [{deficit:'한포진', words:['한포진','습진'], queries:['한포진','한포진 크림']}, ...]
// 상태: window.__cr (phase, log, done, fail, blockedUntil, lines)
(() => {
  const S = window.__cr = window.__cr || {log: [], done: [], fail: [], queue: [], picked: {}, blockedUntil: 0, lines: 2, phase: 'idle'};
  // 크롬은 가려진 탭의 setTimeout을 1분에 한 번으로 늦춘다(intensive throttling) → 쉬는 시간은 웹 워커 타이머로 잰다(10-16)
  const W = new Worker(URL.createObjectURL(new Blob(['onmessage=e=>setTimeout(()=>postMessage(e.data.id),e.data.ms)'], {type: 'text/javascript'})));
  let seq = 0; const waiters = {}; W.onmessage = e => { const f = waiters[e.data]; delete waiters[e.data]; if (f) f(); };
  const sleep = ms => new Promise(r => { const id = ++seq; waiters[id] = r; W.postMessage({id, ms}); });
  const jitter = (a, b) => a + Math.random() * (b - a);
  const log = m => { S.log.push(new Date().toTimeString().slice(0, 8) + ' ' + m); if (S.log.length > 200) S.log.shift(); };
  async function waitBlock() { while (Date.now() < S.blockedUntil) await sleep(30000); }
  function block(where) { S.blockedUntil = Date.now() + 30 * 60 * 1000; S.lines = 1; log('403 막힘(' + where + ') — 30분 쉬고 1줄로'); }

  async function search(q) {
    await waitBlock();
    const r = await fetch('/np/search?q=' + encodeURIComponent(q) + '&listSize=36', {credentials: 'include', referrer: 'https://www.coupang.com/'});
    if (r.status !== 200) { if (r.status === 403) block('검색 ' + q); return []; }
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

  function pick(items, words, skip, k) {
    const brand = n => (n.replace(/^\[[^\]]*\]\s*/, '').split(/\s+/)[0] || '').slice(0, 12);
    const ok = items.filter(x => x.r >= 30 && !skip.has(x.id));
    const named = ok.filter(x => words.some(w => x.n.replace(/\s/g, '').includes(w.replace(/\s/g, '')))).sort((a, b) => b.r - a.r);
    const other = ok.filter(x => !named.includes(x)).sort((a, b) => b.r - a.r);
    const out = [], brands = new Set();
    // 10-16 고침: 이름에 결핍 단어가 든 제품을 먼저 채우고, 5개가 안 될 때만 일반 제품을 2개까지(일반 대형 제품이 섞이지 않게)
    for (const [list, cap] of [[named, k], [other, named.length >= 5 ? 0 : 2]]) {
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
    const rows = []; let st = 200, total = null;
    for (let p = 1; p <= Math.ceil(max / 30); p++) {
      await waitBlock();
      const r = await fetch(`/next-api/review?productId=${pid}&page=${p}&size=30&sortBy=ORDER_SCORE_ASC&ratingSummary=true&ratings=&market=`,
                            {credentials: 'include', referrer: `https://www.coupang.com/vp/products/${pid}`});
      st = r.status; if (st !== 200) { if (st === 403) block('후기 ' + pid); break; }
      let j; try { j = await r.json(); } catch (e) { st = -1; break; }
      const pg = (j.rData || {}).paging || {}; total = pg.totalCount ?? total;
      const list = pg.contents || []; if (!list.length) break;
      for (const c of list) rows.push([c.reviewAt, c.reviewId, c.displayName || '', c.vendorName || '', c.itemName || '', c.rating, c.title || '',
        c.content || '', (c.attachments || []).length, c.helpfulCount ?? 0, c.helpfulTrueCount ?? 0, c.vendorItemId || c.itemId || '']);
      if (!pg.isNext && p >= (pg.totalPage || p)) break;
      await sleep(jitter(1600, 2400));
    }
    return {rows, st, total};
  }

  function save(deficit, pid, rows) {
    const b = new Blob([JSON.stringify({productId: pid, deficit, rows})], {type: 'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `claude-reviews-${deficit}-${pid}.json`;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 60000);
  }

  async function worker(no, opt) {
    while (true) {
      if (no > S.lines) { await sleep(60000); if (S.phase === 'end') return; continue; }
      const job = S.queue.shift();
      if (!job) { if (S.searching) { await sleep(15000); continue; } return; }
      try {
        const res = await reviews(job.id, opt.max);
        if (res.rows.length) { save(job.deficit, job.id, res.rows); S.done.push(`${job.deficit}|${job.id}|${res.rows.length}/${res.total}|${job.n.slice(0, 30)}`); }
        if (res.st !== 200) { S.fail.push(`${job.deficit}|${job.id}|${res.st}`); if (res.st === 403 && !res.rows.length) S.queue.unshift(job); }
        log(`줄${no} ${job.deficit} ${job.id} 받음 ${res.rows.length}/${res.total} (${res.st})`);
      } catch (e) { S.fail.push(`${job.deficit}|${job.id}|${String(e).slice(0, 60)}`); }
      await sleep(jitter(opt.gapMin, opt.gapMax));
    }
  }

  window.__crStart = async (tasks, opt = {}) => {
    opt = Object.assign({skip: [], perDeficit: 8, max: 1000, lines: 1, gapMin: 45000, gapMax: 75000, searchMin: 20000, searchMax: 30000}, opt);
    S.lines = opt.lines; S.phase = 'run'; S.searching = true;
    const skip = new Set(opt.skip.map(String));
    const workers = [1, 2].map(n => worker(n, opt));
    for (const t of tasks) {
      const all = [];
      for (const q of t.queries) { all.push(...await search(q)); await sleep(jitter(opt.searchMin, opt.searchMax)); }
      const uniq = [...new Map(all.map(x => [x.id, x])).values()];
      const chosen = pick(uniq, t.words, skip, opt.perDeficit);
      chosen.forEach(x => skip.add(x.id));
      S.picked[t.deficit] = chosen.map(x => `${x.id}|${x.r}|${x.n.slice(0, 40)}`);
      S.queue.push(...chosen.map(x => ({deficit: t.deficit, id: x.id, n: x.n})));
      log(`${t.deficit} 고름 ${chosen.length}개(검색 ${uniq.length})`);
    }
    S.searching = false; await Promise.all(workers); S.phase = 'end'; log('끝');
  };
})();
'runner loaded';

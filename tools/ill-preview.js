// node tools/ill-preview.js <bg> <n,n,...> <outdir>  — screenshot the nth beat(s) on a background in the illustrated build
const { chromium } = require('playwright'); const path = require('path'), fs = require('fs');
(async () => { const [bg, ns, out] = process.argv.slice(2); fs.mkdirSync(out, {recursive:true});
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p = await b.newPage({viewport:{width:1280, height:720}}); let errs = 0;
  p.on('pageerror', e => { errs++; console.log('PAGEERROR', e.message); });
  await p.goto('file://' + path.resolve(process.env.GAME || 'game/nine-mornings-illustrated.html'), {waitUntil:'networkidle'});
  const list = await p.evaluate(bg => beats.map((b, k) => [k, b.alarm ? 'alarm' : b.bg]).filter(x => x[1] === bg).map(x => x[0]), bg);
  for(const n of ns.split(',').map(Number)){ const k = list[n]; if(k == null) continue;
    await p.evaluate(k => { document.getElementById('title').classList.remove('on');
      for(let j = 0; j < k; j++){ const b = beats[j]; if(b.hud){ $('hud-date').textContent = txt(b.hud[0]); $('hud-sub').textContent = txt(b.hud[1]); }
        if(b.show) for(const id in b.show){ const on = txt(b.show[id]); if(ill) ill.flag(id, on); } if(b.expr) for(const w in b.expr) ill && ill.expr(w, b.expr[w]); }
      i = k; mode = 'say'; render(); }, k);
    await p.waitForTimeout(1400); await p.screenshot({path:`${out}/${bg}-${n}.png`}); }
  console.log(bg, 'beats', list.length, 'errors', errs); await b.close(); })();

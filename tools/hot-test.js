// Every hotspot must be reachable by a real click AND must be recorded in STATE.seen.
const { chromium } = require('playwright'); const path=require('path');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const page=await b.newPage({viewport:{width:1280,height:720}});
  const errs=[]; page.on('pageerror',e=>errs.push(e.message));
  await page.goto('file://'+path.resolve('game/nine-mornings.html'),{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts&&document.fonts.ready);
  await page.evaluate(()=>start()); await page.waitForTimeout(500);
  const rooms = await page.evaluate(()=>Object.keys(HOT));
  const bad = [];
  for(const room of rooms){
    const n = await page.evaluate(r=>beats.findIndex(x=>x.bg===r && (x.stage||x.who) && !x.choice && !x.cook && !x.drag && !x.zoom), room);
    if(n<0){ bad.push(`${room}: no plain say beat`); continue; }
    const count = await page.evaluate(n=>{ mode='say'; looking=false; i=n; render();
      return document.querySelectorAll('#hot circle[data-t]').length; }, n);
    for(let k=0;k<count;k++){
      await page.evaluate(n=>{ mode='say'; looking=false; i=n; render(); }, n);
      await page.waitForTimeout(80);
      const box = await page.evaluate(k=>{ const c=document.querySelectorAll('#hot circle[data-t]')[k].getBoundingClientRect(); return {x:c.x+c.width/2,y:c.y+c.height/2}; }, k);
      await page.mouse.click(box.x, box.y); await page.waitForTimeout(80);
      if(!await page.evaluate(()=>looking)) bad.push(`${room}[${k}] not clickable`);
    }
    console.log(`${room}: ${count}`);
  }
  const seen = await page.evaluate(()=>STATE.seen.length);
  const total = await page.evaluate(()=>Object.values(HOT).reduce((a,l)=>a+l.length,0));
  console.log(`recorded in STATE.seen: ${seen} of ${total}`);
  if(seen !== total) bad.push(`only ${seen}/${total} recorded`);
  const risky = await page.evaluate(()=>{ const o=[]; for(const r in HOT) for(const h of HOT[r]) if(h.x<910 && h.y>480) o.push(`${r} (${h.x},${h.y})`); return o; });
  if(risky.length) bad.push('under the panel on a long beat: '+risky.join(', '));
  console.log(bad.length ? 'PROBLEMS:\n  '+bad.join('\n  ') : 'all hotspots clickable and recorded');
  console.log('errors:', errs.length?errs:'none'); await b.close();
})();

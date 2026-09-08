// Drive each cooking drag with real pointer input and real timing, and assert it lands in
// the band it should. A mechanic you cannot see is a bug; a mechanic you cannot hit is worse.
const { chromium } = require('playwright'); const path=require('path');
const P=(pg,x,y)=>pg.evaluate(([x,y])=>{const s=document.getElementById('stage').getBoundingClientRect(),k=s.width/1280;return{x:s.x+x*k,y:s.y+y*k};},[x,y]);
const item=(pg,id)=>pg.evaluate(id=>{const r=document.getElementById(id).getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2};},id);

(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const page=await b.newPage({viewport:{width:1280,height:720}});
  const errs=[]; page.on('pageerror',e=>errs.push((e.stack||e.message).split('\n').slice(0,4).join(' <- '))); const bad=[];
  await page.goto('file://'+path.resolve('game/nine-mornings.html'),{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts&&document.fonts.ready);
  await page.evaluate(()=>start()); await page.waitForTimeout(400);
  const enter=async c=>{ const n=await page.evaluate(c=>beats.findIndex(x=>x.cook===c),c);
    await page.evaluate(n=>{ mode='say'; STATE.cook={vinegar:'cane'}; i=n; render(); },n); await page.waitForTimeout(400); };

  // ---- vinegar : hold time decides the band ----
  for(const [hold,want] of [[1200,'salty'],[3600,'lola'],[7000,'sour']]){
    await enter('s2');
    const it=await item(page,'drag-vin'), pot=await P(page,470,385);
    await page.mouse.move(it.x,it.y); await page.mouse.down(); await page.mouse.move(pot.x,pot.y,{steps:6});
    await page.waitForTimeout(hold); await page.mouse.up(); await page.waitForTimeout(900);
    const got=await page.evaluate(()=>STATE.cook.out);
    console.log(`vinegar held ${hold}ms -> ${got} (want ${want})`);
    if(got!==want) bad.push(`vinegar ${hold}ms gave ${got}, wanted ${want}`);
  }
  // releasing straight away must not silently do nothing
  await enter('s2');
  { const it=await item(page,'drag-vin'), pot=await P(page,470,385);
    await page.mouse.move(it.x,it.y); await page.mouse.down(); await page.mouse.move(pot.x,pot.y,{steps:4});
    await page.mouse.up(); await page.waitForTimeout(400);
    const m=await page.evaluate(()=>mode), msg=await page.evaluate(()=>document.getElementById('cookstate').textContent);
    console.log(`vinegar instant release -> mode ${m}, says "${msg}"`);
    if(m!=='drag') bad.push('instant release ended the step instead of letting her try again');
    if(!/drop went in/i.test(msg)) bad.push('instant release gave no explanation'); }

  // ---- egg : drop time decides the band ----
  for(const [at,want] of [[3500,'sank'],[9000,'lola'],[16000,'late']]){
    await enter('s4');
    await page.evaluate(t=>{ drag.t0 = performance.now() - t; }, at);
    const it=await item(page,'drag-egg'), pot=await P(page,470,385);
    await page.mouse.move(it.x,it.y); await page.mouse.down(); await page.mouse.move(pot.x,pot.y,{steps:6});
    await page.mouse.up(); await page.waitForTimeout(900);
    const got=await page.evaluate(()=>STATE.cook.out);
    console.log(`egg at ${at}ms -> ${got} (want ${want})`);
    if(got!==want) bad.push(`egg ${at}ms gave ${got}, wanted ${want}`);
  }
  // the batter must actually look different at each stage
  await enter('s4');
  const look = async t => { await page.evaluate(t=>{ drag.t0=performance.now()-t; },t); await page.waitForTimeout(260);
    return page.evaluate(()=>({ bub:+document.getElementById('batter-bubbles').getAttribute('opacity'),
      gloss:+document.getElementById('batter-gloss').getAttribute('opacity'),
      set:+document.getElementById('batter-set').getAttribute('opacity'),
      rim:+document.getElementById('batter-rim').getAttribute('stroke-width'),
      says:document.getElementById('cookstate').textContent })); };
  const wet=await look(1500), setp=await look(9000), brown=await look(18000);
  console.log('wet   ', wet); console.log('set   ', setp); console.log('brown ', brown);
  if(!(wet.bub>.6 && wet.gloss>.3 && wet.set<.05)) bad.push('wet stage does not read as wet');
  if(!(setp.bub<.05 && setp.gloss<.05 && setp.set>.95 && setp.rim===0)) bad.push('set stage does not read as set-and-pale');
  if(!(brown.rim>18)) bad.push('browning stage does not read as browning');
  if(new Set([wet.says,setp.says,brown.says]).size!==3) bad.push('the state line does not distinguish the stages');

  // ---- tube : scoops decide the band, and an empty tube is refused ----
  await enter('s5');
  { const it=await item(page,'drag-tube'), pot=await P(page,470,385);
    await page.mouse.move(it.x,it.y); await page.mouse.down(); await page.mouse.move(pot.x,pot.y,{steps:6});
    await page.mouse.up(); await page.waitForTimeout(350);
    const m=await page.evaluate(()=>mode), msg=await page.evaluate(()=>document.getElementById('cookstate').textContent);
    console.log(`tube with no rice -> mode ${m}, says "${msg}"`);
    if(m!=='drag') bad.push('an empty tube was accepted into the steamer');
    if(!/rice first/i.test(msg)) bad.push('empty tube gave no explanation');
    const bowl=await P(page,170,190);
    const home=await item(page,'drag-tube');
    await page.mouse.move(home.x,home.y); await page.mouse.down();
    await page.mouse.move(bowl.x,bowl.y,{steps:6}); await page.waitForTimeout(250);
    const s1=await page.evaluate(()=>drag.scoops); const w1=await page.evaluate(()=>+document.getElementById('tube-fill').getAttribute('width'));
    const away=await P(page,700,540); await page.mouse.move(away.x,away.y,{steps:4}); await page.waitForTimeout(150);
    await page.mouse.move(bowl.x,bowl.y,{steps:4}); await page.waitForTimeout(250);
    const s2=await page.evaluate(()=>drag.scoops); const w2=await page.evaluate(()=>+document.getElementById('tube-fill').getAttribute('width'));
    console.log(`tube dips: ${s1} (fill ${w1}px) then ${s2} (fill ${w2}px)`);
    if(!(s1===1 && s2===2)) bad.push('dipping did not register scoops');
    if(!(w2>w1 && w1>0)) bad.push('the tube fill does not visibly grow');
    await page.mouse.move(pot.x,pot.y,{steps:6}); await page.mouse.up(); await page.waitForTimeout(600);
    if(await page.evaluate(()=>mode)==='drag') bad.push('a filled tube was refused by the steamer'); }

  // ---- targets must be on screen for every drag that has one ----
  for(const [cook,want] of [['s2',['pot']],['s4',['pot']],['s5',['bowl','pot']],['s1',['pot']]]){
    await enter(cook);
    const on = await page.evaluate(()=>['pot','bowl'].filter(k=>!document.getElementById('target-'+k).hasAttribute('hidden')));
    console.log(`${cook} rings: ${on.join('+')||'none'}`);
    if(on.sort().join()!==want.sort().join()) bad.push(`${cook} showed rings [${on}], wanted [${want}]`);
  }
  console.log(bad.length ? 'PROBLEMS:\n  '+bad.join('\n  ') : 'every cooking mechanic is visible, operable and reaches all its outcomes');
  console.log('errors:', errs.length?errs:'none');
  await b.close(); process.exit(bad.length?1:0);
})();

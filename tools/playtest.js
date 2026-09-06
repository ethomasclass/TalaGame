// playtest.js [variant] — walks the whole build from a queue of decisions, screenshots each new screen, prints STATE
const { chromium } = require('playwright'); const path=require('path'), fs=require('fs');
const VARIANTS = {
  main:  { choice:[1,1,2,2,3], cook:['A','A','A','A'], phone:[2,2,3,2,3] },   // invite, Mang Boy's, say nothing, sleep, wish: Bea stays
  getup: { choice:[2,2,1,1,1], cook:['C','B','C','A','B'], phone:[3,1,1,1,1] },   // working, chain, say something, get up, wish: Lola
};
(async()=>{
  const variant=process.argv[2]||'main'; const q=JSON.parse(JSON.stringify(VARIANTS[variant])); const out='assets/samples/playtest'; fs.mkdirSync(out,{recursive:true});
  const browser=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1});
  const errors=[]; page.on('pageerror',e=>errors.push('pageerror: '+e.message)); page.on('console',m=>{ if(m.type()==='error'&&!/ERR_CONNECTION|net::/.test(m.text())) errors.push('console: '+m.text()); });
  await page.goto('file://'+path.resolve('game/nine-mornings.html'),{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts&&document.fonts.ready); await page.waitForTimeout(300);
  const st=async()=>page.evaluate(()=>({mode,bg,i,busy}));
  let n=0, last=''; const shot=async(tag)=>{ if(variant!=='main') return; n++; await page.waitForTimeout(300); await page.screenshot({path:`${out}/${String(n).padStart(2,'0')}-${tag}.png`}); };
  await shot('title'); await page.keyboard.press('Enter');
  for(let step=0; step<400; step++){
    await page.waitForTimeout(120); const s=await st(); const key=`${s.mode}:${s.bg}:${s.i}`;
    if(s.mode==='end'){ await shot('end'); break; }
    if(s.mode==='pause'){ if(last!==`pause:${s.i}`){ await page.waitForTimeout(s.bg==='dawn'?5600:1200); await shot(s.bg==='dawn'?'sunrise':`estab-${s.bg}-b${s.i}`); last=`pause:${s.i}`; } await page.waitForTimeout(400); continue; }
    if(s.mode==='drag'){ if(last!==`drag:${s.i}:${await page.evaluate(()=>cookStep)}`){ const k=await page.evaluate(()=>drag&&drag.spec.kind); await page.waitForTimeout(k==='egg'?8500:900); await shot(`drag-${k}-b${s.i}`); await page.keyboard.press('Enter'); last=`drag:${s.i}:${await page.evaluate(()=>cookStep)}`; await page.waitForTimeout(900); } await page.waitForTimeout(300); continue; }
    if(s.mode==='debrief'){ await shot('debrief'); await page.keyboard.press('Enter'); await page.waitForTimeout(300); continue; }
    if(s.busy){ await page.waitForTimeout(400); continue; }
    if(key!==last){ if(['choice','cook','phone','inter'].includes(s.mode)||s.mode==='say'&&/^(say)/.test(s.mode)) await shot(`${s.mode}-${s.bg}-b${s.i}`); last=key;
      if(s.mode==='say' && s.bg==='dining' && s.i===39 && variant==='main'){ await page.click('#hot circle[data-t]'); await page.waitForTimeout(300); await shot('look-dining'); await page.keyboard.press('Enter'); await page.waitForTimeout(200); } }
    if(s.mode==='say'){ await page.keyboard.press('Enter'); }
    else if(s.mode==='inter'){ await page.keyboard.press('Enter'); }
    else if(s.mode==='choice'){ const c=q.choice.shift()||1; await page.keyboard.press(String(c)); await page.waitForTimeout(150); await shot(`chosen-${s.bg}-b${s.i}`); await page.keyboard.press('Enter'); }
    else if(s.mode==='cook'){ const c=q.cook.shift()||'A'; await page.keyboard.press(String('ABC'.indexOf(c)+1)); await page.waitForTimeout(150); await shot(`cook-${s.i}`); await page.keyboard.press('Enter'); }
    else if(s.mode==='phone'){ const rs=await page.evaluate(()=>document.querySelectorAll('#replies .rp').length); if(!rs){ await page.waitForTimeout(400); continue; } const c=q.phone.shift()||1; await page.keyboard.press(String(c)); await page.waitForTimeout(150); await shot(`phone-${s.i}`); await page.keyboard.press('Enter'); await page.waitForTimeout(600); }
  }
  const state=await page.evaluate(()=>JSON.stringify(STATE)); const m=await page.evaluate(()=>mode);
  console.log(variant,'STATE',state,'mode',m,'shots',n); console.log('errors:',errors.length?errors:'none'); await browser.close();
})();

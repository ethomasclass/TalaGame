// playtest.js [getup|sleep] — drives scene 3 then scene 4, screenshots key states, prints STATE
const { chromium } = require('playwright'); const path=require('path'), fs=require('fs');
(async()=>{
  const variant=process.argv[2]||'sleep'; const out='assets/samples/playtest'; fs.mkdirSync(out,{recursive:true});
  const browser=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1});
  const errors=[]; page.on('pageerror',e=>errors.push('pageerror: '+e.message)); page.on('console',m=>{ if(m.type()==='error'&&!/ERR_CONNECTION|net::/.test(m.text())) errors.push('console: '+m.text()); });
  await page.goto('file://'+path.resolve('game/nine-mornings.html'),{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts&&document.fonts.ready); await page.waitForTimeout(300);
  const shot=async n=>{ if(variant!=='sleep') return; await page.waitForTimeout(250); await page.screenshot({path:`${out}/${n}.png`}); };
  const key=async(k,n=1)=>{ for(let j=0;j<n;j++){ await page.keyboard.press(k); await page.waitForTimeout(80);} };
  await shot('s3-01-title'); await key('Enter'); await shot('s3-02-room');
  await key('Enter',2); await page.waitForTimeout(900); await shot('s3-03-ma-sinigang');
  await key('Enter'); await shot('s3-04-customer-line'); await key('Enter'); await page.waitForTimeout(1200); await shot('s3-05-thankyou-pour');
  await key('Enter'); await shot('s3-06-choice'); await key('1'); await key('Enter'); await shot('s3-07-tala-speaks');
  await key('Enter',3); await shot('s3-08-after'); await key('Enter'); await shot('s3-09-cook-pancit');
  await key('1'); await key('Enter'); await shot('s3-10-pa-reacts'); await key('Enter'); await page.waitForTimeout(1800); await shot('s3-11-phone');
  await key('3'); await key('Enter'); await page.waitForTimeout(4200); await shot('s3-12-alarm');
  await key(variant==='getup'?'1':'2'); await key('Enter'); await shot('s3-13-morning');
  await key('Enter'); await shot('s3-14-inter'); await key('Enter'); await shot('s4-01');
  await key('Enter',8); await shot('s4-cook'); await key('2'); await key('Enter'); await key('Enter',2); await page.waitForTimeout(3600);
  await key('2'); await key('Enter'); await page.waitForTimeout(4200); await shot('s4-end');
  const state=await page.evaluate(()=>JSON.stringify(STATE)); const m=await page.evaluate(()=>mode);
  console.log(variant,'STATE',state,'mode',m); console.log('errors:',errors.length?errors:'none'); await browser.close();
})();

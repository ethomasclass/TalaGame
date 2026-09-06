// playtest.js — drives game/nine-mornings.html through scene 4 and screenshots each state
const { chromium } = require('playwright'); const path=require('path'), fs=require('fs');
(async()=>{
  const out='assets/samples/playtest'; fs.mkdirSync(out,{recursive:true});
  const browser=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1});
  const errors=[]; page.on('pageerror',e=>errors.push('pageerror: '+e.message)); page.on('console',m=>{ if(m.type()==='error') errors.push('console: '+m.text()); });
  await page.goto('file://'+path.resolve('game/nine-mornings.html'),{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts&&document.fonts.ready); await page.waitForTimeout(300);
  const shot=async n=>{ await page.waitForTimeout(250); await page.screenshot({path:`${out}/${n}.png`}); console.log('shot',n); };
  await shot('01-title');
  await page.keyboard.press('Enter'); await shot('02-beat0-stage');
  await page.keyboard.press('Enter'); await shot('03-ma-counting');
  for(let k=0;k<2;k++) await page.keyboard.press('Enter'); await shot('04-ma-held');
  for(let k=0;k<5;k++) await page.keyboard.press('Enter'); await shot('05-cook');
  await page.keyboard.press('2'); await page.waitForTimeout(600); await shot('06-cook-selB');
  await page.keyboard.press('Enter'); await shot('07-pa-reacts');
  await page.keyboard.press('Enter'); await shot('08-stage-phone-buzz');
  await page.keyboard.press('Enter'); await page.waitForTimeout(3600); await shot('09-phone-replies');
  await page.keyboard.press('2'); await page.keyboard.press('Enter'); await page.waitForTimeout(3600); await shot('10-phone-after');
  await page.waitForTimeout(1200); await shot('11-end');
  const state=await page.evaluate(()=>JSON.stringify(STATE)); console.log('STATE',state);
  console.log('errors:',errors.length?errors:'none'); await browser.close();
})();

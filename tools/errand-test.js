// Exhaustively walk every reachable path through the errand hub against the real
// errandChoices() logic. Two invariants: she always leaves with vinegar, and the
// block cannot swallow the lesson (stop count stays classroom-bounded).
const { chromium } = require('playwright'); const path=require('path');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const page=await b.newPage({viewport:{width:1280,height:720}});
  const errs=[]; page.on('pageerror',e=>errs.push(e.message));
  await page.goto('file://'+path.resolve('game/nine-mornings.html'),{waitUntil:'networkidle'});
  const r = await page.evaluate(()=>{
    const paths=[], bad=[];
    (function walk(state, trail){
      const save = JSON.parse(JSON.stringify(STATE.errand));
      STATE.errand = JSON.parse(JSON.stringify(state));
      const opts = errandChoices();
      STATE.errand = save;
      if(!opts.length){ bad.push('DEAD END with no options: '+JSON.stringify(state)); return; }
      const stops = opts.filter(o=>o.goto!=='errand-done');
      const canLeave = opts.some(o=>o.goto==='errand-done');
      if(canLeave) paths.push({trail, vinegar:state.vinegar, left:state.left});
      if(!stops.length && !canLeave) bad.push('STRANDED, no vinegar and nothing affordable: '+JSON.stringify(state));
      for(const o of stops){
        const key = Object.keys(STOPS).find(k => STOPS[k].goto === o.goto);
        const s = STOPS[key];
        const next = { left: state.left - s.min, done: state.done.concat([key]),
                       vinegar: s.vinegar || state.vinegar };
        walk(next, trail.concat([key]));
      }
    })({left:30, done:[], vinegar:null}, []);
    return {paths, bad,
      noVinegar: paths.filter(p=>!p.vinegar).length,
      maxStops: Math.max(...paths.map(p=>p.trail.length)),
      minStops: Math.min(...paths.map(p=>p.trail.length)),
      chainPaths: paths.filter(p=>p.trail.includes('quik')).map(p=>p.trail.length),
      caneP: paths.filter(p=>p.trail.includes('mangboy')).map(p=>p.trail.length)};
  });
  console.log('complete routes:', r.paths.length);
  console.log('routes ending without vinegar:', r.noVinegar);
  console.log('stops per route: min', r.minStops, 'max', r.maxStops);
  console.log('max stops taking the chain :', Math.max(...r.chainPaths));
  console.log('max stops taking Mang Boy’s:', Math.max(...r.caneP));
  console.log(r.bad.length ? 'PROBLEMS:\n  '+r.bad.join('\n  ') : 'no dead ends, no stranding');
  console.log('errors:', errs.length?errs:'none');
  await b.close();
})();

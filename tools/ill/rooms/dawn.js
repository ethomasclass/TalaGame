// ====================== THE PARISH, 4:40 A.M., AND THE SUNRISE ======================
(() => { const {P, fl, st, el, rr, hash, text, rgrad, lgrad} = ILL;
const GROUND = 470;
let sunriseAt = null, walkAt = null;

function sky(g, k){
  // k: 0 is the dark before mass, 1 is the sun up on Christmas Eve
  const mix = (a, b) => { const p = x => [1, 3, 5].map(i => parseInt(x.slice(i, i + 2), 16)); const A = p(a), B = p(b); return `rgb(${A.map((v, j) => Math.round(v + (B[j] - v) * k)).join(',')})`; };
  g.fillStyle = lgrad(g, 0, 0, 0, GROUND, [[0, mix('#141a3a', '#4a4a7a')], [.6, mix('#3a2e5a', '#d88a7a')], [1, mix('#8a5a6a', '#f6c47a')]]); g.fillRect(0, 0, 1280, GROUND + 2);
  for(let n = 0; n < 60; n++) el(g, hash(n) * 1280, hash(n + 5) * 300, .9 + hash(n + 9), .9 + hash(n + 9), '#fff', (.4 + hash(n + 2) * .5) * (1 - k)); }

function town(g){
  // low roofs either side, a water tower, the lamp, the church
  fl(g, 'M 0 460 L 0 420 L 90 420 L 90 404 L 170 404 L 170 430 L 250 430 L 250 414 L 330 414 L 330 460 Z', '#2a2438');
  fl(g, 'M 950 460 L 950 430 L 1040 430 L 1040 406 L 1130 406 L 1130 426 L 1200 426 L 1200 400 L 1280 400 L 1280 460 Z', '#2a2438');
  st(g, 'M 1210 400 L 1210 350 M 1250 400 L 1250 350', '#2a2438', 3); el(g, 1230, 340, 26, 16, '#2a2438');
  // the church: brick, the bell tower, the rose window, three arched windows lit
  const body = P('M 470 468 L 470 330 L 640 236 L 810 330 L 810 468 Z'), tower = P('M 596 240 L 596 130 L 640 80 L 684 130 L 684 240 Z');
  fl(g, body, '#3a2a3a'); fl(g, tower, '#34263a'); st(g, body, '#1a1220', 2); st(g, tower, '#1a1220', 2);
  for(let y = 340; y < 468; y += 14) st(g, `M 474 ${y} L 806 ${y}`, 'rgba(0,0,0,.18)', 1);
  st(g, 'M 640 80 L 640 40 M 626 56 L 654 56', '#1a1220', 5);
  for(const x of [620, 660]) { fl(g, rr(x - 7, 158, 14, 26, 7), '#f2c86a'); }
  el(g, 640, 306, 24, 24, '#f2c86a'); st(g, 'M 616 306 L 664 306 M 640 282 L 640 330', '#8a5a2a', 2);
  for(const x of [530, 750]) fl(g, rr(x - 18, 372, 36, 68, 18), '#f2c86a');
  fl(g, rr(610, 374, 60, 94, 30), '#ffe0a0'); st(g, rr(610, 374, 60, 94, 30), '#1a1220', 3);
  // the ground, blue with snow
  fl(g, rr(0, GROUND, 1280, 250, 0), '#2c2a44'); fl(g, rr(0, GROUND, 1280, 16, 0), '#3e3c5a');
  for(let n = 0; n < 40; n++) el(g, hash(n + 40) * 1280, GROUND + 30 + hash(n + 41) * 220, 30 + hash(n) * 60, 3, '#3a3854', .6); }

function glow(g, t, k){
  // the door's light on the snow, and the streetlamp
  g.fillStyle = rgrad(g, 640, 470, 10, 260, [[0, 'rgba(255,214,140,.45)'], [1, 'rgba(255,214,140,0)']]); g.fillRect(380, 210, 520, 520);
  st(g, 'M 1040 500 L 1040 336', '#1a1220', 6); fl(g, 'M 1022 322 L 1062 322 L 1054 344 L 1030 344 Z', '#1a1220');
  const lamp = 1 - k * .8; g.fillStyle = rgrad(g, 1042, 344, 4, 90, [[0, `rgba(255,236,190,${.7 * lamp})`], [1, 'rgba(255,236,190,0)']]); g.fillRect(950, 250, 190, 190);
  el(g, 1042, 344, 12, 4, '#fff6d8', lamp); el(g, 1042, 506, 70, 10, 'rgba(255,236,190,.25)', lamp); }

function sun(g, k){
  if(k <= 0) return; const y = 470 - 150 * Math.min(1, k * 1.1);
  g.fillStyle = rgrad(g, 900, y, 30, 260, [[0, `rgba(255,214,140,${.6 * k})`], [1, 'rgba(255,214,140,0)']]); g.fillRect(600, y - 260, 600, 520);
  g.save(); g.beginPath(); g.rect(0, 0, 1280, GROUND); g.clip(); el(g, 900, y, 52, 52, '#fff0b8'); g.restore(); }

// a figure in a winter coat, back to us or walking, rim-lit from the church
function figure(g, x, y, s, hair, walk, t, flip){
  g.save(); g.translate(x, y); g.scale(flip ? -s : s, s); const ph = walk ? Math.sin(t * 4.2) : 0, ink = '#141020';
  st(g, `M -8 -60 L ${-8 + ph * 9} 0`, ink, 13); st(g, `M 8 -60 L ${8 - ph * 9} 0`, ink, 13);
  fl(g, 'M -30 -58 C -34 -110 -26 -150 0 -154 C 26 -150 34 -110 30 -58 Z', ink);
  el(g, 0, -174, 20, 23, ink);
  if(hair === 'long') fl(g, 'M -20 -180 C -24 -150 -22 -128 -16 -118 L 16 -118 C 22 -128 24 -150 20 -180 Z', ink);
  if(hair === 'bun') el(g, 12, -186, 9, 9, ink);
  st(g, 'M 30 -58 C 34 -110 26 -150 0 -154', 'rgba(255,214,140,.55)', 2); st(g, 'M 20 -174 a 20 23 0 0 0 -8 -21', 'rgba(255,214,140,.55)', 2);
  g.restore(); }

ILL.room('dawn', {
  paint(g, t, R){
    const up = document.getElementById('dawn').classList.contains('sunrise');
    if(up && sunriseAt == null) sunriseAt = t; if(!up) sunriseAt = null;
    const k = sunriseAt == null ? 0 : Math.min(1, (t - sunriseAt) / 5);
    sky(g, k); sun(g, k); R.cached('town', town); glow(g, t, k);
    // they walk toward the church and stop, rather than walking on the spot
    if(R.flag('dawn-walk')){ if(walkAt == null) walkAt = t; const d = Math.min(1, (t - walkAt) / 15), dx = 120 * (1 - (1 - d) * (1 - d)), go = d < 1;
      figure(g, 300 + dx, 520, .92, 'bun', go, t, false); figure(g, 366 + dx, 524, .84, 'long', go, t + .6, false); } else walkAt = null;
    if(R.flag('dawn-tala')) figure(g, 640, 540, .95, 'long', false, t, false);
    g.fillStyle = '#fff'; for(let n = 0; n < 50; n++){ const y = (hash(n + 90) * 720 + t * (14 + hash(n) * 16)) % 720, x = hash(n + 40) * 1280 + Math.sin(t * .8 + n) * 6;
      g.globalAlpha = (.4 + hash(n + 7) * .4) * (1 - k * .6); g.beginPath(); g.arc(x, y, .9 + hash(n + 3) * 1.2, 0, 6.2832); g.fill(); } g.globalAlpha = 1; } });
})();

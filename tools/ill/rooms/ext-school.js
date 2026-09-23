// ====================== THE HIGH SCHOOL, JERSEY CITY, A SNOWY TUESDAY ======================
(() => { const {P, fl, st, el, rr, hash, text, rgrad, lgrad} = ILL;

function school(g){
  g.fillStyle = lgrad(g, 0, 0, 0, 520, [[0, '#b8c4d4'], [1, '#e2e6ea']]); g.fillRect(0, 0, 1280, 720);
  // bare trees behind
  for(const [x, h] of [[90, 260], [1180, 240], [300, 200]]){ st(g, `M ${x} 520 L ${x} ${520 - h}`, '#5a5a62', 6);
    for(let k = 0; k < 6; k++){ const y = 520 - h + k * 30; st(g, `M ${x} ${y} l ${(k % 2 ? 1 : -1) * (40 - k * 4)} ${-30 + k * 2}`, '#5a5a62', 2.4); } }
  // the building: tan brick, a band of blue windows, the entrance with its steps
  fl(g, rr(250, 150, 780, 370, 0), '#c9b08a'); for(let y = 160; y < 520; y += 12) fl(g, rr(250, y, 780, 1.2, 0), 'rgba(0,0,0,.08)');
  fl(g, rr(250, 140, 780, 16, 0), '#a8906a'); fl(g, rr(560, 110, 160, 50, 2), '#a8906a');
  text(g, 'HIGH SCHOOL', 640, 146, '600 18px "IBM Plex Mono", monospace', '#5a4a3a');
  for(let r = 0; r < 2; r++) for(let k = 0; k < 8; k++){ const x = 280 + k * 96 + (k > 3 ? 40 : 0), y = 200 + r * 130; if(k === 4 && r === 1) continue;
    fl(g, rr(x, y, 60, 80, 2), '#6a8ab0'); fl(g, rr(x, y, 60, 30, 2), '#8aa6c8'); st(g, rr(x, y, 60, 80, 2), '#4a5a6a', 2); fl(g, rr(x, y + 80, 60, 5, 0), '#f4f6f8'); }
  fl(g, rr(580, 380, 120, 140, 3), '#4a6a8a'); st(g, 'M 640 380 L 640 520', '#2a3a4a', 3); fl(g, rr(560, 360, 160, 20, 2), '#a8906a');
  for(let k = 0; k < 3; k++) fl(g, rr(560 - k * 16, 520 + k * 10, 160 + k * 32, 10, 0), '#dcdcdc');
  // the flagpole
  st(g, 'M 210 520 L 210 60', '#8a8e94', 4); g.save(); g.translate(212, 70);
  for(let k = 0; k < 7; k++) fl(g, rr(0, k * 6, 70, 6, 0), k % 2 ? '#f4f4f4' : '#c9413a'); fl(g, rr(0, 0, 30, 24, 0), '#2c4a8a'); g.restore();
  // snow on everything, and the lot
  fl(g, rr(0, 520, 1280, 200, 0), '#f2f4f6'); fl(g, rr(250, 146, 780, 6, 0), '#fff');
  for(let k = 0; k < 20; k++) el(g, hash(k) * 1280, 540 + hash(k + 3) * 170, 60 + hash(k + 1) * 80, 4, '#dfe4ea', .8);
  // the bus
  g.save(); g.translate(880, 560); fl(g, rr(0, 0, 320, 110, 10), '#f0b62a'); fl(g, rr(0, 70, 320, 12, 0), '#1e1e22');
  for(let k = 0; k < 6; k++) fl(g, rr(20 + k * 48, 16, 38, 36, 3), '#2a2e3a'); fl(g, rr(0, -6, 320, 10, 5), '#fff');
  for(const x of [60, 260]){ el(g, x, 112, 24, 24, '#141418'); el(g, x, 112, 9, 9, '#8a8a92'); } g.restore(); }

ILL.room('ext-school', {
  paint(g, t, R){ R.cached('school', school);
    g.fillStyle = '#fff'; for(let n = 0; n < 80; n++){ const y = (hash(n + 90) * 720 + t * (18 + hash(n) * 20)) % 720, x = hash(n + 40) * 1280 + Math.sin(t * .8 + n) * 6;
      g.globalAlpha = .6 + hash(n + 7) * .4; g.beginPath(); g.arc(x, y, 1 + hash(n + 3) * 1.6, 0, 6.2832); g.fill(); } g.globalAlpha = 1; } });
})();

// ====================== PACING'S FROM ACROSS THE STREET ======================
(() => { const {P, fl, st, el, rr, hash, text, rgrad, lgrad} = ILL;
const STAR = P('M 0 -66 L 17 -22 L 63 -20 L 27 9 L 39 54 L 0 28 L -39 54 L -27 9 L -63 -20 L -17 -22 Z');

function street(g){
  g.fillStyle = lgrad(g, 0, 0, 0, 500, [[0, '#141a36'], [1, '#34305a']]); g.fillRect(0, 0, 1280, 720);
  // neighbours either side
  fl(g, rr(0, 90, 400, 470, 0), '#3a3440'); fl(g, rr(880, 60, 400, 500, 0), '#403a46');
  for(const [x, y, lit] of [[40, 140, 1], [150, 140, 0], [260, 140, 1], [40, 260, 0], [150, 260, 1], [260, 260, 0], [930, 120, 1], [1040, 120, 0], [1150, 120, 1], [930, 250, 1], [1040, 250, 0], [1150, 250, 0]])
    fl(g, rr(x, y, 70, 90, 2), lit ? '#e8b862' : '#22243a');
  // Pacing's: two floors of brick, the family upstairs, the restaurant below
  fl(g, rr(400, 70, 480, 490, 0), '#8a3e30'); for(let y = 80; y < 560; y += 14) fl(g, rr(400, y, 480, 1.4, 0), 'rgba(0,0,0,.18)');
  for(const x of [440, 600, 760]){ fl(g, rr(x, 110, 80, 110, 3), '#f2c86a'); fl(g, rr(x + 38, 110, 4, 110, 0), '#5a2a20'); st(g, rr(x - 4, 106, 88, 118, 3), '#3a1a14', 3); }
  g.save(); g.translate(640, 160); g.scale(.4, .4); g.fillStyle = '#e0453f'; g.fill(STAR); g.strokeStyle = '#7a1e1a'; g.lineWidth = 4; g.stroke(STAR); g.restore();
  // the awning and the sign
  fl(g, 'M 380 272 L 900 272 L 880 322 L 400 322 Z', '#b8413a'); for(let k = 0; k < 12; k++) fl(g, `M ${400 + k * 40} 322 L ${420 + k * 40} 322 L ${414 + k * 40} 334 L ${406 + k * 40} 334 Z`, '#b8413a');
  for(let k = 0; k < 13; k++) fl(g, `M ${390 + k * 40} 272 L ${406 + k * 40} 272 L ${410 + k * 40} 322 L ${396 + k * 40} 322 Z`, '#f4efe2', .85);
  fl(g, rr(500, 232, 280, 34, 3), '#2a1a14'); text(g, 'PACING’S · FILIPINO KITCHEN', 640, 255, '600 17px "Fraunces", Georgia, serif', '#fff4e0');
  // the dining room window: warm, two tables with people at them
  fl(g, rr(420, 346, 300, 170, 2), '#f4c880'); st(g, rr(420, 346, 300, 170, 2), '#3a1a14', 5);
  for(const [x, c] of [[480, '#2c4a6a'], [520, '#8a3a4a'], [640, '#4a6a3a']]){ el(g, x, 430, 14, 16, c); fl(g, `M ${x - 18} 480 C ${x - 18} 452 ${x + 18} 452 ${x + 18} 480 Z`, c); }
  fl(g, rr(460, 470, 110, 8, 2), '#7a4a2a'); fl(g, rr(610, 470, 80, 8, 2), '#7a4a2a');
  fl(g, rr(750, 346, 110, 214, 2), '#6a2e22'); fl(g, rr(760, 356, 90, 110, 2), '#f4c880'); el(g, 838, 470, 5, 5, '#e0b04a');
  // the pavement, the street, a parked car with snow on its roof
  fl(g, rr(0, 560, 1280, 40, 0), '#6a6a74'); fl(g, rr(0, 600, 1280, 120, 0), '#26262e');
  g.fillStyle = rgrad(g, 570, 560, 10, 220, [[0, 'rgba(244,200,128,.35)'], [1, 'rgba(244,200,128,0)']]); g.fillRect(350, 540, 440, 180);
  g.save(); g.translate(1010, 640); fl(g, 'M -150 0 L -140 -40 L -90 -46 L -60 -80 L 60 -80 L 100 -46 L 150 -40 L 156 0 Z', '#2c3a5e');
  fl(g, 'M -52 -74 L 50 -74 L 86 -46 L -80 -46 Z', '#8aa0c0', .6); fl(g, 'M -62 -82 L 62 -82 L 58 -90 L -58 -90 Z', '#f4f6f8');
  for(const x of [-96, 100]){ el(g, x, 2, 26, 26, '#141418'); el(g, x, 2, 10, 10, '#6a6a74'); } g.restore(); }

ILL.room('ext-rest', {
  paint(g, t, R){ R.cached('street', street);
    const flick = .9 + .1 * Math.sin(t * 3); g.fillStyle = `rgba(255,214,140,${.08 * flick})`; g.fillRect(420, 346, 300, 170);
    g.fillStyle = '#fff'; for(let n = 0; n < 70; n++){ const y = (hash(n + 90) * 720 + t * (16 + hash(n) * 18)) % 720, x = hash(n + 40) * 1280 + Math.sin(t * .8 + n) * 6;
      g.globalAlpha = .45 + hash(n + 7) * .45; g.beginPath(); g.arc(x, y, .9 + hash(n + 3) * 1.4, 0, 6.2832); g.fill(); } g.globalAlpha = 1; } });
})();

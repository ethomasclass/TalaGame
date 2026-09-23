// ====================== 4:10 A.M., THE SIXTH MORNING ======================
// Tala in bed in the dark, the phone lit on the nightstand. The left of the frame stays dark for the title text.
(() => { const {P, fl, st, el, rr, hash, text, rgrad, lgrad} = ILL;

function roomDark(g){
  g.fillStyle = '#0d0b12'; g.fillRect(0, 0, 1280, 720);
  // the window: streetlight through the blind
  fl(g, rr(560, 60, 200, 220, 3), '#1a1c2c'); for(let k = 0; k < 12; k++) fl(g, rr(560, 66 + k * 17.6, 200, 8, 0), '#2a3050', .9);
  fl(g, rr(560, 60, 200, 220, 3), rgrad(g, 680, 110, 10, 200, [[0, 'rgba(255,190,110,.18)'], [1, 'rgba(255,190,110,0)']]));
  g.save(); g.translate(720, 130); g.scale(.32, .32); g.fillStyle = '#3a2430';
  g.fill(P('M 0 -66 L 17 -22 L 63 -20 L 27 9 L 39 54 L 0 28 L -39 54 L -27 9 L -63 -20 L -17 -22 Z')); g.restore();
  // the bed along the right, the pillow under her head
  fl(g, rr(720, 330, 640, 420, 30), '#1c1f30'); fl(g, rr(740, 268, 300, 118, 50), '#2c3048');
  // nightstand, where the phone is
  fl(g, rr(520, 400, 190, 340, 6), '#1e1a22'); fl(g, rr(520, 400, 190, 16, 6), '#2c2630'); }

function glow(g, t){
  const pulse = .75 + .25 * Math.sin(t * 5);
  g.fillStyle = rgrad(g, 615, 380, 10, 460, [[0, `rgba(120,150,255,${.42 * pulse})`], [1, 'rgba(120,150,255,0)']]); g.fillRect(0, 0, 1280, 720);
  g.save(); g.translate(615, 382); g.rotate(-.05 + Math.sin(t * 40) * .01 * pulse);
  fl(g, rr(-70, -32, 140, 64, 10), '#1e2230'); fl(g, rr(-62, -25, 124, 50, 7), '#c9d6ff');
  text(g, '4:10', 0, 12, '500 30px "IBM Plex Mono", monospace', '#1e2230'); g.restore(); }

function quilt(g, t){
  // the quilt pulled up to her chin, rising and falling
  const b = Math.sin(t * 1.1) * 3;
  const top = `M 700 720 C 770 560 880 440 950 ${384 + b} C 985 ${330 + b} 1000 ${262 + b} 1062 ${240 + b} C 1140 ${226 + b} 1200 ${292 + b} 1300 ${316 + b}`;
  fl(g, top + ' L 1300 720 Z', '#3b4d8a');
  st(g, top, '#4d62a8', 10); st(g, top, '#26325e', 1.4);
  for(let k = 0; k < 3; k++) st(g, `M ${1000 + k * 100} ${300 + b} q 12 200 -10 420`, '#2c3a6e', 2, .7);
  g.fillStyle = 'rgba(90,111,176,.12)'; g.fillRect(0, 0, 1280, 720); }

ILL.room('alarm', {
  place:{ tala:{x:990, y:140, s:1.34, tilt:-1.45, noDim:true, expr:'tired'} },
  paint(g, t, R){
    R.cached('dark', roomDark); glow(g, t);
    if(!ILL.S.target.tala || ILL.S.target.tala === 'neutral') ILL.S.target.tala = 'tired';
    R.char('tala'); quilt(g, t); } });
})();

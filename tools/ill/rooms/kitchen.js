// ====================== THE RESTAURANT KITCHEN ======================
(() => { const {P, fl, st, el, rr, hash, text, rgrad, lgrad, arm, hand} = ILL;
const TY = 400;
const day = () => { const m = /(\d+)/.exec((document.getElementById('hud-date') || {}).textContent || ''); return m ? +m[1] : 18; };

function wall(g, d){
  // white subway tile, warm under the heat lamps
  g.fillStyle = '#e9e3d6'; g.fillRect(0, 0, 1280, 720);
  g.fillStyle = 'rgba(160,150,130,.35)';
  for(let y = 0; y < TY; y += 26){ g.fillRect(0, y, 1280, 1.4); for(let x = (y / 26) % 2 ? 0 : 26; x < 1280; x += 52) g.fillRect(x, y, 1.4, 26); }
  g.fillStyle = rgrad(g, 1040, 420, 20, 360, [[0, 'rgba(255,170,80,.34)'], [1, 'rgba(255,170,80,0)']]); g.fillRect(0, 0, 1280, 720);
  // the walk-in, stainless, with its long handle
  fl(g, rr(-10, 160, 150, 260, 4), '#b8bcc0'); fl(g, rr(-10, 160, 150, 260, 4), lgrad(g, 0, 0, 140, 0, [[0, 'rgba(255,255,255,.25)'], [.6, 'rgba(255,255,255,0)'], [1, 'rgba(0,0,0,.12)']]));
  st(g, rr(-10, 160, 150, 260, 4), '#5c6166', 2); fl(g, rr(112, 250, 14, 90, 5), '#6f757b'); st(g, rr(112, 250, 14, 90, 5), '#3a3e42', 1.2);
  fl(g, rr(16, 186, 70, 40, 3), '#f4efe2'); text(g, 'KEEP CLOSED', 51, 210, '600 10px "IBM Plex Mono", monospace', '#b8413a');
  // the ticket rail, with tonight's orders
  st(g, 'M 170 180 L 640 180', '#5c6166', 5);
  [[190, -.03], [262, .02], [334, -.02], [406, .03], [478, 0]].forEach(([x, r], k) => { if(k > (d === 24 ? 1 : 4)) return; g.save(); g.translate(x + 26, 182); g.rotate(r);
    fl(g, rr(-26, 0, 52, 74, 1), '#fbf8ef'); for(let i = 0; i < 5; i++) fl(g, rr(-19, 12 + i * 11, 20 + hash(k * 9 + i) * 18, 2.4, 1), '#8a8478');
    fl(g, rr(-26, 0, 52, 5, 0), '#d9d2c2'); st(g, rr(-26, 0, 52, 74, 1), '#b8b0a0', .8); g.restore(); });
  // hanging pots over the pass
  [[130, 64, 44, '#6a6f78'], [262, 84, 50, '#50555e'], [402, 58, 36, '#7a808a']].forEach(([x, h, w, c]) => { st(g, `M ${x} 0 L ${x} ${h}`, '#3a3e42', 2);
    fl(g, `M ${x - w} ${h} L ${x + w} ${h} L ${x + w - 6} ${h + 54} Q ${x} ${h + 62} ${x - w + 6} ${h + 54} Z`, c); fl(g, `M ${x + 6} ${h} L ${x + w} ${h} L ${x + w - 6} ${h + 54} Q ${x + 20} ${h + 60} ${x + 6} ${h + 58} Z`, 'rgba(0,0,0,.18)');
    fl(g, rr(x - w - 4, h - 4, 2 * w + 8, 8, 3), '#3a3e42'); });
  // the hood, the range and whatever is on it
  fl(g, 'M 700 0 L 1280 0 L 1280 110 L 700 110 Z', '#8d9298'); fl(g, 'M 700 100 L 1280 100 L 1280 118 L 700 118 Z', '#5c6166');
  fl(g, 'M 700 0 L 1280 0 L 1280 110 L 700 110 Z', lgrad(g, 0, 0, 0, 110, [[0, 'rgba(255,255,255,.12)'], [1, 'rgba(0,0,0,.12)']]));
  fl(g, rr(900, 350, 400, 60, 3), '#2c2f34'); st(g, rr(900, 350, 400, 60, 3), '#121416', 2);
  for(const x of [980, 1160]) { el(g, x, 354, 70, 10, '#16181b'); }
  // the shelf of dry goods: the soy, the vinegar, the fish sauce, the rice
  fl(g, rr(640, 236, 240, 10, 2), '#8a8e94');
  [[656, 30, '#3a2a20', 'SOY'], [690, 34, '#e6e1d2', 'SUKA'], [726, 30, '#7a4a1e', 'PATIS'], [760, 26, '#c9524a', ''], [790, 70, '#efe7d4', 'RICE'], [866, 12, '#6a8f5a', '']].forEach(([x, h, c, lb], k) => {
    const w = lb === 'RICE' ? 64 : 24; fl(g, rr(x, 236 - h - 22, w, h + 22, lb === 'RICE' ? 4 : 6), c); st(g, rr(x, 236 - h - 22, w, h + 22, lb === 'RICE' ? 4 : 6), '#2a2622', 1);
    if(lb) { fl(g, rr(x + 2, 236 - h, w - 4, 14, 1), '#f6f0e2'); text(g, lb, x + w / 2, 236 - h + 10, '600 8px "IBM Plex Mono", monospace', '#2a2622'); } }); }

function range(g, t, d){
  // flame and whatever is cooking: a wok most nights; the bamboo steamer on the ninth morning
  for(const [x, k] of [[980, 0], [1160, 1]]){ for(let i = 0; i < 7; i++){ const a = i / 6 * Math.PI, fx = x + Math.cos(a) * 52, h = 8 + Math.sin(t * 9 + i * 1.7 + k) * 3;
      fl(g, `M ${fx - 5} 354 Q ${fx} ${354 - h * 2} ${fx + 5} 354 Z`, '#4a8cf0', .8); } }
  if(d === 24){
    fl(g, rr(1090, 250, 140, 104, 8), '#8a6a3a'); fl(g, rr(1090, 250, 140, 20, 8), '#a4814a'); st(g, rr(1090, 250, 140, 104, 8), '#3e2c14', 1.4);
    for(let k = 0; k < 6; k++){ const x = 1102 + k * 22; fl(g, rr(x, 200, 16, 60, 6), '#b89a52'); st(g, `M ${x} 220 L ${x + 16} 220`, '#7a6030', 1.2); st(g, rr(x, 200, 16, 60, 6), '#5a4420', 1); }
    for(let k = 0; k < 5; k++){ const ph = (t * .45 + k * .2) % 1, x = 1110 + k * 26 + Math.sin(t + k) * 6; el(g, x, 190 - ph * 150, 16 + ph * 26, 12 + ph * 18, '#d7c6ec', .45 * (1 - ph)); } }
  else {
    fl(g, 'M 920 336 Q 980 390 1040 336 Z', '#1d1f22'); st(g, 'M 1040 336 L 1100 320', '#1d1f22', 9);
    for(let k = 0; k < 4; k++){ const ph = (t * .5 + k * .25) % 1; el(g, 960 + k * 14 + Math.sin(t + k) * 5, 320 - ph * 120, 12 + ph * 22, 9 + ph * 14, '#fff', .35 * (1 - ph)); } } }

function counter(g){
  // the pass: brushed steel, with the heat lamps' warmth on it
  fl(g, `M 0 ${TY} L 1280 ${TY} L 1280 720 L 0 720 Z`, '#a9aeb3');
  fl(g, `M 0 ${TY} L 1280 ${TY} L 1280 720 L 0 720 Z`, lgrad(g, 0, TY, 0, 720, [[0, 'rgba(255,255,255,.3)'], [.3, 'rgba(255,255,255,0)'], [1, 'rgba(0,0,0,.25)']]));
  for(let k = 0; k < 40; k++){ const y = TY + 8 + hash(k) * 240; st(g, `M 0 ${y} L 1280 ${y + 2}`, '#fff', .6, .12); }
  fl(g, `M 0 ${TY - 3} L 1280 ${TY - 3} L 1280 ${TY + 3} L 0 ${TY + 3} Z`, '#dfe3e6');
  g.fillStyle = rgrad(g, 640, TY + 40, 10, 520, [[0, 'rgba(255,196,120,.22)'], [1, 'rgba(255,196,120,0)']]); g.fillRect(0, TY, 1280, 720 - TY);
  // cutting board, with an onion half done
  g.save(); g.translate(470, 440); g.rotate(-.04); g.scale(.9, .7); fl(g, rr(-120, -40, 240, 92, 8), '#caa06a'); fl(g, rr(-120, 34, 240, 18, 8), '#a57e4c'); st(g, rr(-120, -40, 240, 92, 8), '#5e4222', 1.3);
  el(g, 60, 0, 30, 24, '#e9d7e6'); el(g, 60, 0, 22, 17, '#f4e7f1'); st(g, 'M 38 -8 Q 60 -2 82 -8 M 40 6 Q 60 12 80 6', '#b690b0', 1);
  for(let k = 0; k < 7; k++) fl(g, rr(-30 + k * 7, -10, 5, 22, 2), '#f1e2ee'); g.restore();
  // the plate of calamansi and the rag everyone uses
  fl(g, rr(640, 430, 90, 28, 10), '#f3f0e6'); st(g, rr(640, 430, 90, 28, 10), '#8e8a80', 1);
  for(let k = 0; k < 4; k++) el(g, 660 + k * 17, 440, 7, 6, '#9cc25a');
  // bottom right, past the dialogue: the stack of plates for service and the fish sauce
  for(let k = 0; k < 6; k++){ el(g, 1110, 640 - k * 9, 120, 26, '#d9d4c8'); el(g, 1110, 636 - k * 9, 120, 26, '#f7f4ec'); st(g, `M 990 ${636 - k * 9} a 120 26 0 1 0 240 0`, '#9a9488', 1); }
  el(g, 1110, 591, 84, 16, '#ece6d8');
  fl(g, rr(990, 500, 40, 110, 10), '#7a4a1e'); fl(g, rr(1000, 478, 20, 26, 4), '#3a2a20'); fl(g, rr(994, 540, 32, 36, 2), '#f2ead6'); st(g, rr(990, 500, 40, 110, 10), '#2a1a10', 1.2); }

function props(g, t, R){
  const pl = R.place;
  // Pa: the knife in his right hand, his left flat on the board, the way he is showing Ando
  R.dim('pa'); { const x = pl.pa.x, W = 52, L = 88;
    arm(g, 'pa', -1, [x - 90, 350], [x - 118, 404], [x - 66, 440], W * .72); arm(g, 'pa', 1, [x + 90, 350], [x + 118, 404], [x + 76, 434], W * .72);
    hand(g, 'pa', x - 68, 438, .02, L, W, .15, false, true);
    g.save(); g.translate(x + 30, 420); g.rotate(-.3); fl(g, 'M 0 -5 L 104 -3 Q 116 4 104 6 L 0 5 Z', '#dfe3e6'); st(g, 'M 0 -5 L 104 -3 Q 116 4 104 6 L 0 5 Z', '#4a4e52', 1.2);
    fl(g, rr(-46, -7, 48, 14, 5), '#2a2622'); g.restore();
    hand(g, 'pa', x + 80, 432, Math.PI + .3, L * .9, W, .75, true, true); }
  // Ando: both hands on the edge of the counter, holding on
  R.dim('ando'); { const x = pl.ando.x, W = 48, L = 82;
    arm(g, 'ando', -1, [x - 80, 360], [x - 110, 412], [x - 70, 436], W * .7); arm(g, 'ando', 1, [x + 80, 360], [x + 110, 412], [x + 70, 436], W * .7);
    hand(g, 'ando', x - 72, 434, .5, L, W, .5, false, true); hand(g, 'ando', x + 72, 434, Math.PI - .5, L, W, .5, true, true); }
  R.undim(); }

ILL.room('kitchen', {
  hot:[[300, 215], [64, 300]],
  place:{ pa:{x:470, y:98, s:1.52, outfit:'apron'}, ando:{x:830, y:114, s:1.44} },
  paint(g, t, R){ const d = day();
    R.cached('wall' + d, g2 => wall(g2, d)); range(g, t, d);
    R.char('pa'); R.char('ando');
    R.cached('counter', counter); props(g, t, R); } });
})();

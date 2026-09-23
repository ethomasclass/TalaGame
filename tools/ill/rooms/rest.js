// ====================== PACING'S, THE DINING ROOM, A SLOW NIGHT ======================
(() => { const {P, fl, st, el, rr, hash, text, rgrad, lgrad, arm, hand, limb, body} = ILL;
const STAR = P('M 0 -66 L 17 -22 L 63 -20 L 27 9 L 39 54 L 0 28 L -39 54 L -27 9 L -63 -20 L -17 -22 Z');
const STAR_IN = P('M 0 -40 L 10 -14 L 38 -12 L 16 5 L 24 32 L 0 17 L -24 32 L -16 5 L -38 -12 L -10 -14 Z');
const DOOR = [470, 96, 190, 426];

function room(g){
  // oxblood walls, wainscot, the pendant lamps
  g.fillStyle = lgrad(g, 0, 0, 0, 720, [[0, '#7a4a52'], [1, '#5a343c']]); g.fillRect(0, 0, 1280, 720);
  for(let x = 0; x < 1280; x += 108) fl(g, rr(x, 0, 2, 520, 0), 'rgba(0,0,0,.08)');
  fl(g, rr(0, 520, 1280, 200, 0), '#4a2a2e'); fl(g, rr(0, 516, 1280, 8, 0), '#6a3e42');
  // the window with the parol and the night outside
  fl(g, rr(46, 54, 262, 332, 4), '#3a2226'); fl(g, rr(62, 70, 230, 300, 2), '#1d2544');
  fl(g, 'M 62 370 L 62 250 L 130 250 L 130 226 L 180 226 L 180 262 L 240 262 L 240 238 L 292 238 L 292 370 Z', '#151b33');
  for(const [x, y] of [[80, 280], [98, 300], [196, 250], [216, 290], [150, 320], [260, 300]]) fl(g, rr(x, y, 9, 12, 0), '#f2c86a', .85);
  fl(g, rr(174, 70, 6, 300, 0), '#3a2226'); fl(g, rr(62, 214, 230, 6, 0), '#3a2226');
  // the kitchen door, open, lit from the inside
  const [dx, dy, dw, dh] = DOOR; fl(g, rr(dx - 14, dy - 14, dw + 28, dh + 14, 3), '#3a2226');
  fl(g, rr(dx, dy, dw, dh, 0), lgrad(g, 0, dy, 0, dy + dh, [[0, '#fbe3b0'], [1, '#f2c47e']]));
  for(let y = dy + 20; y < dy + dh; y += 26) fl(g, rr(dx, y, dw, 1.2, 0), 'rgba(160,120,70,.25)');
  fl(g, rr(dx + 20, dy + 40, 60, 90, 2), '#c9b08a'); fl(g, rr(dx + 120, dy + 30, 50, 12, 2), '#8a8e94');
  // the menu board
  fl(g, rr(700, 90, 230, 120, 4), '#1f1c1a'); st(g, rr(700, 90, 230, 120, 4), '#6a4a3a', 5);
  text(g, 'MENU', 815, 114, '600 13px "IBM Plex Mono", monospace', '#e8c46a');
  ['adobo', 'sinigang', 'pancit', 'lumpia', 'kare-kare'].forEach((s, k) => { text(g, s, 720, 136 + k * 15, '15px "Caveat", cursive', '#eee6d6', 'left'); fl(g, rr(870, 131 + k * 15, 40, 1.4, 0), '#8a8478'); });
  // the empty tables on the left: table two nearest
  for(const [x, y, s] of [[252, 462, 1], [150, 540, 1.25]]){ g.save(); g.translate(x, y); g.scale(s, s);
    fl(g, rr(-24, 0, 14, 120, 2), '#3a2226'); fl(g, rr(40, 0, 14, 120, 2), '#3a2226');
    el(g, 16, 0, 110, 24, '#efe6d6'); el(g, 16, 6, 110, 24, 'rgba(0,0,0,.15)'); el(g, 16, 0, 110, 24, '#f4ecde');
    el(g, -30, -2, 22, 7, '#fbfaf6'); el(g, 60, -2, 22, 7, '#fbfaf6'); fl(g, rr(12, -26, 8, 24, 3), 'rgba(220,235,245,.8)'); g.restore(); } }

function lamps(g, t){
  for(const [x, h] of [[354, 150], [1130, 200]]){ st(g, `M ${x} 0 L ${x} ${h}`, '#2a1a1c', 2);
    fl(g, `M ${x - 30} ${h + 30} L ${x - 14} ${h} L ${x + 14} ${h} L ${x + 30} ${h + 30} Z`, '#c46a4a');
    g.fillStyle = rgrad(g, x, h + 40, 10, 240, [[0, 'rgba(255,214,150,.3)'], [1, 'rgba(255,214,150,0)']]); g.fillRect(x - 240, h - 200, 480, 480); }
  const sw = Math.sin(t * 1.3) * .04; g.save(); g.translate(120, 90); g.rotate(sw); st(g, 'M 0 0 L 0 28', '#e9d9b8', 1.2);
  g.fillStyle = rgrad(g, 0, 70, 4, 80, [[0, 'rgba(255,210,122,.4)'], [1, 'rgba(255,210,122,0)']]); g.fillRect(-80, -10, 160, 160); g.save(); g.translate(0, 70); g.scale(.55, .55); g.fillStyle = '#e0453f'; g.fill(STAR); g.strokeStyle = '#7a1e1a'; g.lineWidth = 2; g.stroke(STAR);
  g.fillStyle = '#f4c65a'; g.fill(STAR_IN); el(g, 0, 0, 12, 12, '#fff4d2'); g.restore();
  [[-10, 100, '#f4c65a'], [0, 96, '#e0453f'], [10, 100, '#f4c65a']].forEach(([x, y, c], k) => st(g, `M ${x} ${y} Q ${x + Math.sin(t * 2 + k) * 3} ${y + 20} ${x + Math.sin(t * 2.4 + k) * 2} ${y + 36}`, c, 3));
  g.restore(); }

// Tala, the whole of her, small in the kitchen doorway with a stack of menus against her chest
function talaFull(g, t, R){
  const pl = R.place.tala, s = pl.s, x = pl.x, y = pl.y, hip = y + 344 * s, ch = ILL.CAST.tala;
  R.layer('tala', g => {
  // legs, then shoes
  const legs = [[[x - 18, hip - 8], [x - 17, hip + 92], 40, 32, '#34466e'], [[x - 17, hip + 92], [x - 15, hip + 176], 32, 25, '#34466e'],
                [[x + 18, hip - 8], [x + 17, hip + 92], 40, 32, '#2a3a5e'], [[x + 17, hip + 92], [x + 15, hip + 176], 32, 25, '#2a3a5e']];
  body(g, legs); for(const sd of [-1, 1]) { fl(g, rr(x + sd * 16 - 20, hip + 172, 40, 16, 7), '#eceae4'); st(g, rr(x + sd * 16 - 20, hip + 172, 40, 16, 7), '#6a6860', 1); }
  R.char('tala');
  // the arms come round to hold the menus
  arm(g, 'tala', -1, [x - 46, y + 176 * s], [x - 54, y + 260 * s], [x - 8, y + 250 * s], 20);
  fl(g, rr(x - 26, y + 216 * s, 58, 70, 3), '#2a1a1c'); fl(g, rr(x - 22, y + 220 * s, 50, 62, 2), '#8a2a2e'); text(g, 'P', x + 3, y + 262 * s, '600 14px "Fraunces", serif', '#e8c46a');
  arm(g, 'tala', 1, [x + 46, y + 176 * s], [x + 54, y + 262 * s], [x + 14, y + 262 * s], 20);
  hand(g, 'tala', x - 10, y + 250 * s, .1, 30, 18, .5, false, true); hand(g, 'tala', x + 14, y + 262 * s, Math.PI - .1, 30, 18, .5, true, true);
  }); }

// Ma at the table, pitcher in hand; the engine triggers 'pour' and 'nod'
function ma(g, t, R){
  const pl = R.place.ma, nodT = R.motion('ma-nod'), pourT = R.motion('ma-pour');
  const nod = nodT >= 0 && nodT < 1.6 ? Math.sin(nodT / 1.6 * Math.PI * 3) * Math.sin(nodT / 1.6 * Math.PI) : 0;
  R.char('ma', {y:pl.y + nod * 5});
  const pour = pourT >= 0 && pourT < 3 ? Math.min(1, Math.sin(pourT / 3 * Math.PI) * 1.6) : 0, ang = -.45 * pour;
  const x = pl.x, W = 50; R.layer('ma', g => {
  arm(g, 'ma', -1, [x - 84, 424], [x - 110, 520], [x - 60, 560], W * .72);
  hand(g, 'ma', x - 62, 558, .1, 80, W, .3, false, true);
  // the pitcher, and water when she pours
  const px = x + 150, py = 500; g.save(); g.translate(px, py); g.rotate(ang);
  fl(g, 'M -34 -70 L 30 -70 L 38 40 Q 0 52 -38 40 Z', 'rgba(220,236,246,.55)'); fl(g, 'M -30 -20 L 32 -20 L 38 40 Q 0 52 -38 40 Z', 'rgba(160,200,230,.55)');
  st(g, 'M -34 -70 L 30 -70 L 38 40 Q 0 52 -38 40 Z', '#6a8aa0', 1.6); st(g, 'M 30 -52 C 60 -50 62 10 34 12', '#6a8aa0', 5); g.restore();
  if(pour > .6){ st(g, `M ${px - 38} ${py - 50} q -18 20 -22 ${60}`, '#bcd8ec', 5, .8); }
  arm(g, 'ma', 1, [x + 84, 424], [x + 128, 500], [x + 162, 480], W * .72);
  hand(g, 'ma', x + 162, 478, -.3 + ang, 78, W, .75, false, true);
  }); }

// the customer, from behind: we are standing where Tala stands
function customer(g, t, R){
  const x = 1120, y = 420; R.layer('customer', g => {
  fl(g, `M ${x - 150} 720 C ${x - 150} ${y + 150} ${x - 110} ${y + 110} ${x - 40} ${y + 100} L ${x + 40} ${y + 100} C ${x + 110} ${y + 110} ${x + 150} ${y + 150} ${x + 150} 720 Z`, '#6d6a8a');
  fl(g, `M ${x + 20} ${y + 100} C ${x + 110} ${y + 110} ${x + 150} ${y + 150} ${x + 150} 720 L ${x + 60} 720 Z`, '#58556f');
  st(g, `M ${x - 150} 720 C ${x - 150} ${y + 150} ${x - 110} ${y + 110} ${x - 40} ${y + 100} L ${x + 40} ${y + 100} C ${x + 110} ${y + 110} ${x + 150} ${y + 150} ${x + 150} 720`, '#26243a', 1.4);
  fl(g, rr(x - 26, y + 60, 52, 50, 10), '#e5bc98'); el(g, x - 58, y + 8, 9, 16, '#f0caa9'); el(g, x + 58, y + 8, 9, 16, '#e5bc98');
  el(g, x, y, 62, 70, '#d9b56a'); st(g, `M ${x - 62} ${y} a 62 70 0 1 0 124 0 a 62 70 0 1 0 -124 0`, '#6a5020', 1.3);
  for(let k = 0; k < 6; k++) st(g, `M ${x - 40 + k * 16} ${y - 60} q ${4 - k} 40 ${-2 + k} 70`, '#b8944a', 1.2, .6);
  el(g, x, y + 58, 16, 12, '#b8944a'); el(g, x, y + 50, 10, 8, '#c9524a');
  st(g, `M ${x} ${y + 62} q 6 40 -2 80`, '#d9b56a', 14); st(g, `M ${x} ${y + 62} q 6 40 -2 80`, '#b8944a', 1.2, .6);
  }); }

function tableFront(g){
  // her table, in the foreground right: the bowl of sinigang, the glass
  fl(g, 'M 900 560 L 1300 560 L 1300 720 L 880 720 Z', '#efe6d6'); fl(g, 'M 900 560 L 1300 560 L 1300 572 L 900 572 Z', '#f8f2e6');
  el(g, 960, 600, 60, 18, '#fbfaf6'); el(g, 960, 596, 46, 12, '#c9a24a'); for(let k = 0; k < 3; k++) el(g, 944 + k * 14, 594, 6, 4, '#6a9a4a');
  fl(g, rr(1010, 540, 30, 50, 4), 'rgba(220,236,246,.7)'); st(g, rr(1010, 540, 30, 50, 4), '#8aa0b0', 1.2); }

ILL.room('rest', {
  hot:[[120, 170], [815, 150], [252, 462]],
  place:{ tala:{x:565, y:150, s:.54, torso:true, outfit:'apron'}, ma:{x:800, y:170, s:1.5, outfit:'apron', torso:400}, customer:{x:1120, y:300, s:1} },
  paint(g, t, R){
    R.cached('room', room); lamps(g, t); talaFull(g, t, R); ma(g, t, R);
    R.cached('front', tableFront); customer(g, t, R); } });
})();

// ====================== THE PARISH HALL, AFTER SIMBANG GABI ======================
(() => { const {P, fl, st, el, rr, hash, text, rgrad, lgrad, arm, hand, body, drawHead, EX} = ILL;
const STAR = P('M 0 -66 L 17 -22 L 63 -20 L 27 9 L 39 54 L 0 28 L -39 54 L -27 9 L -63 -20 L -17 -22 Z');
const STAR_IN = P('M 0 -40 L 10 -14 L 38 -12 L 16 5 L 24 32 L 0 17 L -24 32 L -16 5 L -38 -12 L -10 -14 Z');
const TY = 408, DOOR = [40, 90, 230, 470];
// Tita Cora sings from the moment the nephews wheel the videoke out until the basket goes round
let span = null;
const singing = () => { if(typeof beats === 'undefined' || typeof i === 'undefined') return false;
  if(!span){ const a = beats.findIndex(b => typeof b.stage === 'string' && /videoke machine/.test(b.stage)), z = beats.findIndex(b => b.show && b.show['hall-basket'] === true); span = [a, z]; }
  return span[0] >= 0 && i >= span[0] && i < span[1]; };

// the parish: the same rig, different people. Nobody here gets a portrait; they are the room.
const PARISH = [['ma', '#3f7a6a', '#2f5e52', 'warm'], ['pa', '#8a5a9a', '#6e4680', 'smile'], ['mangboy', '#d8c07a', '#b8a05a', 'warm'], ['ando', '#c9524a', '#a33b34', 'neutral'],
  ['ocampo', '#e8e3ea', '#cbc3cf', 'kind'], ['clerk', '#5a6f8a', '#46586e', 'smile'], ['tita', '#e0a43a', '#c08a2a', 'talk'], ['customer', '#7a8a5a', '#5e6e44', 'smile'], ['hannah', '#4a5a8a', '#3a4870', 'warm']];
PARISH.forEach(([from, c, sh], k) => { const b = ILL.CAST[from]; ILL.cast('parish' + k, {...b, noPortrait:true, clothes:{...b.clothes, col:c, shade:sh, apron:null, lanyard:false, sleeve:null, trim:sh}}); });
const CROWD = [[300, 236, .62, 0], [372, 250, .56, 3], [560, 226, .6, 2], [626, 246, .55, 8], [836, 234, .6, 1], [900, 250, .54, 4], [1080, 214, .56, 5], [1010, 250, .5, 6], [760, 256, .5, 7]];

function room(g){
  g.fillStyle = lgrad(g, 0, 0, 0, 720, [[0, '#f0dfb8'], [1, '#d9bf8e']]); g.fillRect(0, 0, 1280, 720);
  g.fillStyle = rgrad(g, 660, 200, 20, 700, [[0, 'rgba(255,240,200,.5)'], [1, 'rgba(255,240,200,0)']]); g.fillRect(0, 0, 1280, 720);
  fl(g, rr(0, 0, 1280, 30, 0), '#cdb488');
  // the door, open, the dark blue morning outside
  const [dx, dy, dw, dh] = DOOR; fl(g, rr(dx - 12, dy - 12, dw + 24, dh + 12, 3), '#6a4a34');
  fl(g, rr(dx, dy, dw, dh, 0), lgrad(g, 0, dy, 0, dy + dh, [[0, '#1c2a52'], [1, '#3a4c7e']]));
  g.fillStyle = rgrad(g, dx + dw / 2, dy + 120, 10, 200, [[0, 'rgba(200,215,255,.35)'], [1, 'rgba(200,215,255,0)']]); g.fillRect(dx, dy, dw, dh);
  for(let k = 0; k < 30; k++) el(g, dx + hash(k) * dw, dy + hash(k + 9) * dh * .7, 1.2, 1.2, '#dfe6ff', .7);
  // the banner and the bunting
  st(g, 'M 300 70 Q 650 110 1000 70', '#c9524a', 3);
  for(let k = 0; k < 8; k++){ const x = 330 + k * 82, y = 70 + Math.sin((k + .5) / 8 * Math.PI) * 30; fl(g, `M ${x} ${y} L ${x + 30} ${y + 2} L ${x + 14} ${y + 32} Z`, k % 2 ? '#f0c24a' : '#e0785a'); }
  g.save(); g.translate(660, 158); g.rotate(-.01); fl(g, rr(-222, -30, 444, 60, 6), '#b8413a'); fl(g, rr(-214, -23, 428, 46, 4), '#e0685c');
  text(g, 'MALIGAYANG PASKO', 0, 11, '600 30px "Fraunces", Georgia, serif', '#fff4e0'); g.restore();
  // the crowd behind the table, talking over each other
  for(const [x, y, s, k] of CROWD){ g.save(); g.filter = 'saturate(.75) brightness(.95)'; g.translate(x - 100 * s, y); g.scale(s, s);
    drawHead(g, 'parish' + k, {...EX[PARISH[k][3]], gx:(hash(k) - .5) * 4, open:hash(k + 3) > .5 ? .3 : 0}, true); g.restore(); }
  // the long table: white cloth, the salabat urn, the pan de sal
  fl(g, rr(260, TY, 1020, 90, 0), '#f6f1e6'); fl(g, rr(260, TY, 1020, 10, 0), '#fffbf2'); st(g, `M 260 ${TY} L 1280 ${TY}`, '#c9bfa8', 1.4);
  for(let k = 0; k < 12; k++) st(g, `M ${280 + k * 86} ${TY + 12} q 4 40 -2 78`, '#e2d8c4', 1.4);
  fl(g, rr(296, 300, 72, 104, 10), '#bfc5cc'); fl(g, rr(296, 300, 72, 14, 6), '#dfe3e6'); fl(g, rr(310, 388, 44, 22, 4), '#9aa0a6');
  fl(g, rr(360, 360, 18, 8, 3), '#6a6f76'); st(g, rr(296, 300, 72, 104, 10), '#5c6166', 1.6); text(g, 'SALABAT', 332, 350, '600 10px "IBM Plex Mono", monospace', '#3a3e42');
  fl(g, rr(790, 370, 130, 36, 6), '#b88a4a'); st(g, rr(790, 370, 130, 36, 6), '#6a4a24', 1.2);
  for(let k = 0; k < 8; k++){ const x = 804 + (k % 4) * 30, y = 370 - (k < 4 ? 4 : 16); el(g, x, y, 15, 10, '#c98a44'); el(g, x - 3, y - 3, 8, 4, '#e2ae6a'); st(g, `M ${x - 15} ${y} a 15 10 0 1 0 30 0 a 15 10 0 1 0 -30 0`, '#7a4420', 1); }
  // the parol, and the videoke machine on its cart
  g.save(); g.translate(1100, 150); g.scale(.62, .62); g.fillStyle = rgrad(g, 0, 0, 6, 150, [[0, 'rgba(255,210,122,.5)'], [1, 'rgba(255,210,122,0)']]); g.fillRect(-150, -150, 300, 300);
  g.fillStyle = '#e0453f'; g.fill(STAR); g.strokeStyle = '#7a1e1a'; g.lineWidth = 3; g.stroke(STAR); g.fillStyle = '#f4c65a'; g.fill(STAR_IN); el(g, 0, 0, 12, 12, '#fff4d2'); g.restore();
  fl(g, rr(1106, 244, 168, 150, 8), '#23252c'); fl(g, rr(1118, 256, 144, 104, 4), '#2c5aa0'); fl(g, rr(1110, 394, 160, 100, 4), '#3a3230');
  for(const [x, y] of [[1150, 440], [1230, 440]]){ el(g, x, y, 30, 30, '#1e1a1a'); el(g, x, y, 12, 12, '#4a4240'); }
  el(g, 1238, 268, 10, 10, '#4ac29a'); fl(g, rr(1118, 368, 60, 16, 3), '#555'); }

function videoke(g, t){
  // the lyrics scroll whether anybody is singing or not; they fill in when Tita Cora is
  const sing = singing() && ILL.S.target.tita === 'talk', p = (t * .35) % 1;
  g.save(); g.beginPath(); g.rect(1118, 256, 144, 104); g.clip();
  for(let k = 0; k < 4; k++){ const y = 276 + k * 24 - p * 24, w = 70 + hash(k + Math.floor(t * .35)) * 50;
    fl(g, rr(1130, y, w, 8, 3), '#cfe0ff', .8); if(sing && k === 1) fl(g, rr(1130, y, w * ((t * .5) % 1), 8, 3), '#f0c24a'); }
  g.restore(); }

// Hannah, in the doorway, in her coat, if she came
function hannah(g, t, R){
  const pl = R.place.hannah; if(pl.hidden) return; const x = pl.x, s = pl.s, hip = pl.y + 344 * s;
  R.dim('hannah'); body(g, [[[x - 20, hip - 10], [x - 20, hip + 80], 42, 36, '#2a2e3a'], [[x + 20, hip - 10], [x + 20, hip + 80], 42, 36, '#22262f']]);
  R.char('hannah');
  arm(g, 'hannah', -1, [x - 60, pl.y + 190 * s], [x - 74, pl.y + 290 * s], [x - 20, pl.y + 300 * s], 26);
  arm(g, 'hannah', 1, [x + 60, pl.y + 190 * s], [x + 74, pl.y + 290 * s], [x + 20, pl.y + 300 * s], 26);
  // a paper plate somebody has already filled
  el(g, x, pl.y + 300 * s, 46, 12, '#fbfaf4'); el(g, x - 10, pl.y + 294 * s, 14, 7, '#c98a44'); el(g, x + 12, pl.y + 294 * s, 12, 6, '#7a4a9a');
  hand(g, 'hannah', x - 22, pl.y + 304 * s, .2, 40, 26, .5, false, true); hand(g, 'hannah', x + 22, pl.y + 304 * s, Math.PI - .2, 40, 26, .5, true, true);
  R.undim(); }

function food(g){
  // Christmas Eve: the front table, puto bumbong on banana leaf and the bibingka
  fl(g, 'M 920 488 L 1300 488 L 1300 720 L 900 720 Z', '#f6f1e6'); fl(g, 'M 920 488 L 1300 488 L 1300 498 L 920 498 Z', '#fffbf2');
  g.save(); g.translate(1010, 512); g.rotate(-.06); fl(g, rr(-86, -22, 172, 44, 18), '#4f8a3a'); st(g, 'M -80 0 L 80 0', '#3a6a2a', 1.4);
  for(let k = 0; k < 6; k++){ const x = -66 + k * 26; fl(g, rr(x - 10, -12, 22, 24, 8), '#6a3e8a'); for(let j = 0; j < 4; j++) el(g, x - 4 + hash(k * 4 + j) * 12, -6 + hash(k + j) * 12, 2.4, 1.6, '#f6f0e6'); }
  g.restore();
  for(const [x, y] of [[1120, 566], [1210, 548]]){ el(g, x, y + 6, 46, 14, '#2a2020'); el(g, x, y, 44, 14, '#e2b25a'); el(g, x, y - 2, 36, 10, '#eec474');
    el(g, x - 10, y - 4, 10, 5, '#f6f0e6'); el(g, x - 10, y - 4, 5, 3, '#e08a2a'); el(g, x + 12, y - 2, 11, 4, '#f8e6a0'); el(g, x + 18, y + 2, 7, 3, '#8a4a1a', .7); } }

function tita(g, t, R){
  const pl = R.place.tita, x = pl.x, sing = singing(), basket = R.flag('hall-basket'), W = 50;
  R.dim('tita');
  if(basket){
    arm(g, 'tita', -1, [x - 86, 400], [x - 100, 470], [x - 50, 470], W * .72); arm(g, 'tita', 1, [x + 86, 400], [x + 100, 470], [x + 50, 470], W * .72);
    fl(g, `M ${x - 70} 440 L ${x + 70} 440 L ${x + 56} 486 L ${x - 56} 486 Z`, '#b8894a');
    for(let k = 0; k < 5; k++) st(g, `M ${x - 66 + k * 2} ${448 + k * 8} L ${x + 66 - k * 2} ${448 + k * 8}`, '#8a6030', 1.4);
    for(let k = 0; k < 5; k++){ g.save(); g.translate(x - 40 + k * 20, 438); g.rotate(-.3 + k * .15); fl(g, rr(-14, -20, 28, 22, 2), k % 2 ? '#aebfa6' : '#c9d6bc'); st(g, rr(-14, -20, 28, 22, 2), '#6f8468', .8); g.restore(); }
    st(g, `M ${x - 70} 440 L ${x + 70} 440 L ${x + 56} 486 L ${x - 56} 486 Z`, '#5a3a1a', 1.4);
    hand(g, 'tita', x - 64, 456, .2, 66, W * .9, .7, false, true); hand(g, 'tita', x + 64, 456, Math.PI - .2, 66, W * .9, .7, true, true); }
  else if(sing){
    arm(g, 'tita', -1, [x - 86, 400], [x - 96, 470], [x - 40, 440], W * .72);
    hand(g, 'tita', x - 42, 440, -.2, 64, W * .9, .3, false, true);
    arm(g, 'tita', 1, [x + 86, 400], [x + 80, 440], [x + 30, 386], W * .72);
    g.save(); g.translate(x + 22, 360); g.rotate(-.5); fl(g, rr(-7, 0, 14, 70, 5), '#2a2a2e'); el(g, 0, -4, 13, 15, '#4a4a50'); st(g, 'M -10 -10 L 10 2 M -10 2 L 10 -10', '#6a6a70', .8); g.restore();
    hand(g, 'tita', x + 30, 392, -Math.PI / 2 - .5, 60, W * .9, .85, false, true); }
  R.undim(); }

ILL.room('hall', {
  hot:[[1190, 318], [332, 350], [855, 378], [660, 158], [1010, 512], [1165, 556]],
  place:{ hannah:{x:155, y:178, s:.9, outfit:'coat', torso:true, flag:'hall-hannah'},
          tala:{x:470, y:196, s:1.34, torso:420}, ma:{x:710, y:186, s:1.38, torso:420}, tita:{x:990, y:196, s:1.4, torso:420} },
  paint(g, t, R){
    if(singing()) ILL.S.talkUntil.tita = R.t + .2;
    R.cached('room', room); videoke(g, t); hannah(g, t, R);
    R.char('tala'); R.char('ma'); R.char('tita');
    if(R.flag('hall-food')) R.cached('food', food);
    tita(g, t, R); } });
})();

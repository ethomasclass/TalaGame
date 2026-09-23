// ====================== NEWARK AVENUE, TWENTY PAST FIVE ======================
// The block the errand runs on. Every storefront sits where the engine's push-ins and hotspots expect it:
// cargo x 0-210, Mang Boy's 220-540, the panaderia 556-760, the salon 770-910, Quik Mart 930-1280.
(() => { const {P, fl, st, el, rr, hash, text, rgrad, lgrad, arm, hand, body, drawHead, EX} = ILL;
const SIGN = 236, WIN = 290, WALK = 470, CURB = 556;
const STAR = P('M 0 -66 L 17 -22 L 63 -20 L 27 9 L 39 54 L 0 28 L -39 54 L -27 9 L -63 -20 L -17 -22 Z');

// the two people behind counters who do not speak, made from the parish rig
ILL.cast('baker', {...ILL.CAST.ma, noPortrait:true, face:{cw:41, jw:32, jy:115, cy:129, chw:11}, nose:1.15, eyeS:.9, age:1.5, hair:'#3a2c28', skin:'#c89066', shade:'#a4704c', neck:'#ba8660',
  clothes:{col:'#f3eee2', shade:'#d9d0bd', line:'#6a6458', neck:'tee', reach:'short'}});
ILL.cast('cargoman', {...ILL.CAST.clerk, noPortrait:true, face:{cw:41.5, jw:34, jy:117, cy:132, chw:13}, nose:1.2, age:1.2, mustache:'#2a2220', skin:'#a86c48', shade:'#855034', neck:'#9a6242',
  clothes:{col:'#6a7a5a', shade:'#55643f', line:'#2a3220', neck:'tee', reach:'short'}});

const shopfront = (g, x0, x1, sign, signCol, ink, sub) => {
  fl(g, rr(x0, SIGN, x1 - x0, 44, 2), signCol); st(g, rr(x0, SIGN, x1 - x0, 44, 2), 'rgba(0,0,0,.4)', 1.4);
  text(g, sign, (x0 + x1) / 2, SIGN + (sub ? 25 : 30), `600 ${sub ? 21 : 23}px "Fraunces", Georgia, serif`, ink);
  if(sub) text(g, sub, (x0 + x1) / 2, SIGN + 39, '9px "IBM Plex Mono", monospace', ink); };

function block(g){
  // dusk, and the upper floors: brick, lit windows, one parol, one open window with somebody singing
  g.fillStyle = lgrad(g, 0, 0, 0, 300, [[0, '#1c2346'], [1, '#4a4a78']]); g.fillRect(0, 0, 1280, 300);
  const fronts = [[0, 210, '#6e3a30'], [210, 548, '#7a4434'], [548, 766, '#5e4a3e'], [766, 918, '#6a3e3a'], [918, 1280, '#4a4e5a']];
  fronts.forEach(([a, b, c], k) => { const top = [34, 10, 48, 22, 60][k]; fl(g, rr(a, top, b - a, SIGN - top, 0), c);
    for(let y = top + 12; y < SIGN; y += 14) fl(g, rr(a, y, b - a, 1.2, 0), 'rgba(0,0,0,.18)');
    fl(g, rr(a, top, b - a, 8, 0), 'rgba(0,0,0,.25)'); st(g, `M ${b} ${top} L ${b} ${SIGN}`, 'rgba(0,0,0,.35)', 2);
    for(let wx = a + 26; wx < b - 40; wx += 76){ const lit = hash(wx) > .35, wy = top + 36;
      fl(g, rr(wx, wy, 42, 70, 2), lit ? '#f2c86a' : '#2a2c44'); fl(g, rr(wx + 19, wy, 4, 70, 0), 'rgba(0,0,0,.3)'); st(g, rr(wx - 3, wy - 3, 48, 76, 2), 'rgba(0,0,0,.4)', 2);
      if(lit && hash(wx + 1) > .5) fl(g, rr(wx, wy + 40, 42, 30, 0), 'rgba(140,60,40,.35)'); } });
  // the parol upstairs over the panaderia
  fl(g, rr(592, 82, 56, 84, 2), '#f6d488'); g.save(); g.translate(620, 122); g.scale(.3, .3); g.fillStyle = '#e0453f'; g.fill(STAR); g.restore();
  // the open window with the singing coming out of it
  fl(g, rr(284, 46, 52, 74, 2), '#ffcf78'); fl(g, 'M 296 120 C 296 96 304 86 312 86 C 320 86 326 96 326 120 Z', '#6a3a2a'); el(g, 311, 78, 9, 10, '#6a3a2a');
  // the storefronts
  fl(g, rr(6, SIGN, 198, 44, 2), '#2c4a8a'); st(g, rr(6, SIGN, 198, 44, 2), 'rgba(0,0,0,.4)', 1.4);
  text(g, 'BAYANIHAN CARGO', 105, SIGN + 24, '600 16px "Fraunces", Georgia, serif', '#f4f0e2'); text(g, 'BALIKBAYAN BOXES · DOOR TO DOOR', 105, SIGN + 38, '8px "IBM Plex Mono", monospace', '#f4f0e2');
  shopfront(g, 226, 540, 'MANG BOY’S', '#b8413a', '#fff4e0', 'SARI-SARI STORE · SINCE 1994');
  shopfront(g, 560, 758, 'PANADERIA', '#d99a2a', '#3a2412', 'PAN DE SAL · ENSAYMADA');
  shopfront(g, 774, 912, 'SALON', '#d6798f', '#fff4f6', 'CUT · PERM · COLOR');
  shopfront(g, 936, 1274, 'QUIK MART', '#e8eef6', '#2c5aa0', 'LOTTO · ATM · MILK');
  // shop interiors, lit
  const inside = [[10, 200, '#e8c89a'], [230, 536, '#f4d49a'], [564, 754, '#fbe0a8'], [778, 908, '#f3d6dc'], [940, 1270, '#eef4fa']];
  inside.forEach(([a, b, c]) => { fl(g, rr(a, WIN, b - a, WALK - WIN, 0), c); });
  // cargo: the wall of flattened boxes, the stacks, the tape
  for(let k = 0; k < 5; k++) fl(g, rr(18 + k * 36, 300, 30, 100, 1), k % 2 ? '#c8a06a' : '#b88e58');
  for(const [x, y, w, h] of [[20, 400, 70, 60], [96, 380, 80, 80], [40, 350, 50, 50]]){ fl(g, rr(x, y, w, h, 1), '#c9a26a'); st(g, rr(x, y, w, h, 1), '#7a5a30', 1.2); fl(g, rr(x + w / 2 - 6, y, 12, h, 0), '#d8c49a'); }
  // Mang Boy's: sachets in strips, shelves of tins and noodles, the counter, the radio
  for(let s = 0; s < 6; s++){ const x = 250 + s * 26; st(g, `M ${x} 296 L ${x} 380`, '#6a5a4a', .8); for(let k = 0; k < 6; k++) fl(g, rr(x - 8, 300 + k * 14, 16, 12, 2), ['#e0453f', '#f0c24a', '#4f8a5a', '#2c5aa0'][(s + k) % 4]); }
  for(let r = 0; r < 3; r++){ fl(g, rr(424, 310 + r * 44, 106, 5, 0), '#8a6a4a'); for(let k = 0; k < 7; k++) fl(g, rr(428 + k * 15, 290 + r * 44, 12, 20, 2), ['#c9524a', '#e8d6a0', '#4a7a9a', '#e0a43a'][(r + k) % 4]); }
  fl(g, rr(476, 270 + 14, 44, 22, 3), '#3a3230'); el(g, 486, 295, 6, 6, '#6a6260'); fl(g, rr(496, 290, 20, 3, 1), '#e0a43a');
  // the panaderia: trays in the window
  for(let r = 0; r < 3; r++){ fl(g, rr(574, 330 + r * 44, 110, 6, 1), '#8a8e94'); for(let k = 0; k < 5; k++){ const x = 584 + k * 21, y = 324 + r * 44; el(g, x, y, 10, 7, '#c98a44'); el(g, x - 2, y - 2, 5, 3, '#e2ae6a'); } }
  // the salon: a mirror, a shelf of product
  fl(g, rr(786, 350, 44, 60, 22), '#cfe0e8'); st(g, rr(786, 350, 44, 60, 22), '#a8a0a0', 2);
  // Quik Mart: the fridge wall and the lottery sign
  for(let k = 0; k < 4; k++){ const x = 950 + k * 80; fl(g, rr(x, 300, 72, 150, 2), '#cfe4f0'); for(let r = 0; r < 4; r++) for(let j = 0; j < 5; j++) fl(g, rr(x + 6 + j * 13, 310 + r * 34, 9, 22, 2), ['#e0453f', '#f4f0e2', '#2c5aa0', '#4f8a5a', '#f0c24a'][(k + r + j) % 5]);
    st(g, rr(x, 300, 72, 150, 2), '#9ab0c0', 1.4); }
  fl(g, rr(1250 - 70, 296, 70, 30, 3), '#f0c24a'); text(g, 'LOTTO', 1215, 316, '600 14px "IBM Plex Mono", monospace', '#b8413a'); }

function people(g, t, R){
  // the people behind the counters, at a size that holds up when the camera pushes in
  const draw = (id, x, y, s, e) => { g.save(); g.translate(x - 100 * s, y); g.scale(s, s); drawHead(g, id, e, 330); g.restore(); };
  const talk = id => ILL.S.talkUntil[id] && R.t < ILL.S.talkUntil[id] ? .2 + .45 * Math.abs(Math.sin(R.t * 13)) : 0;
  const blink = k => (R.t * .37 + k * .29) % 1 < .03 ? 1 : null;
  const E = (name, id, k) => { const e = {...EX[ILL.S.target[id] || name], open:talk(id)}; const b = blink(k); if(b) e.lid = 1; return e; };
  draw('cargoman', 150, 328, .24, E('working', 'cargoman', 1));
  draw('mangboy', 352, 326, .25, E('warm', 'mangboy', 2));
  draw('baker', 704, 330, .23, E('kind', 'baker', 3));
  // Mrs Ocampo, under the dryer, one eye open
  // sitting, so lower than the others, with the dryer hood over her head
  const oc = ILL.S.speaker === 'ocampo' ? E('kind', 'ocampo', 4) : E('asleep', 'ocampo', 4); draw('ocampo', 868, 364, .24, oc);
  fl(g, rr(846, 400, 44, 40, 6), '#7a4a6a'); fl(g, rr(842, 430, 52, 10, 3), '#5a3a50');
  const hood = 'M 846 380 C 846 352 890 352 890 380 C 890 385 846 385 846 380 Z';
  fl(g, hood, '#d9d4e0'); fl(g, 'M 846 380 C 846 352 868 352 868 360 C 858 362 850 370 846 380 Z', '#f0ecf4');
  st(g, hood, '#6a6470', 1.2); st(g, 'M 890 378 L 896 392 L 896 460', '#6a6470', 2.4); }

function counters(g){
  // counters in front of the shopkeepers, then the glass
  fl(g, rr(20, 398, 180, 72, 2), '#8a6a4a'); fl(g, rr(20, 398, 180, 6, 2), '#a8845e'); fl(g, rr(260, 396, 200, 74, 2), '#6a4a3a'); fl(g, rr(260, 396, 200, 8, 2), '#8a6a4a');
  fl(g, rr(620, 396, 134, 74, 2), '#c9b08a'); fl(g, rr(626, 402, 122, 34, 2), 'rgba(230,240,250,.5)');
  for(let k = 0; k < 4; k++){ el(g, 646 + k * 28, 424, 11, 7, '#c98a44'); }
  // a roll of tape and a box on the cargo counter, a jar of candy on Mang Boy's
  fl(g, rr(120, 380, 50, 20, 1), '#c9a26a'); st(g, rr(120, 380, 50, 20, 1), '#7a5a30', 1); el(g, 60, 394, 8, 5, '#b8b0a0');
  fl(g, rr(400, 374, 22, 24, 6), 'rgba(220,236,246,.7)'); for(let k = 0; k < 5; k++) el(g, 405 + k * 3, 390 - (k % 2) * 5, 3, 3, ['#e0453f', '#f0c24a', '#4f8a5a'][k % 3]);
  fl(g, rr(944, 420, 322, 50, 2), '#c7ced6');
  // glass: a sheen over every window, the mullions, the doors
  for(const [a, b] of [[10, 200], [230, 536], [564, 754], [778, 908], [940, 1270]]){
    fl(g, `M ${a + 20} ${WIN} L ${a + 70} ${WIN} L ${a + 30} ${WALK} L ${a} ${WALK} Z`, '#fff', .12);
    st(g, rr(a, WIN, b - a, WALK - WIN, 0), '#2a1a14', 4); }
  st(g, `M 424 ${WIN} L 424 ${WALK}`, '#2a1a14', 4); st(g, `M 1100 ${WIN} L 1100 ${WALK}`, '#9ab0c0', 3);
  // the sidewalk, the curb, the street
  fl(g, rr(0, WALK, 1280, CURB - WALK, 0), '#8a8a92'); for(let x = 0; x < 1280; x += 96) st(g, `M ${x} ${WALK} L ${x - 20} ${CURB}`, '#74747c', 1.4);
  fl(g, rr(0, CURB, 1280, 10, 0), '#b4b4bc'); fl(g, rr(0, CURB + 10, 1280, 160, 0), '#2e2e36');
  for(let x = 40; x < 1280; x += 160) fl(g, rr(x, 640, 80, 6, 2), '#c9b04a');
  // the light from the shops, spilling on the pavement
  for(const [x, c] of [[105, 'rgba(232,200,154,.3)'], [383, 'rgba(244,212,154,.34)'], [659, 'rgba(251,224,168,.38)'], [843, 'rgba(243,214,220,.28)'], [1105, 'rgba(238,244,250,.3)']]){
    g.fillStyle = rgrad(g, x, WALK, 10, 180, [[0, c], [1, 'rgba(0,0,0,0)']]); g.fillRect(x - 180, WALK, 360, 120); } }

function life(g, t){
  // the TV in the salon, which nobody is watching
  const flick = .8 + .2 * Math.sin(t * 7) * Math.sin(t * 2.3);
  fl(g, rr(784, 298, 50, 34, 3), '#1e1e24'); fl(g, rr(788, 302, 42, 26, 2), `rgba(120,170,230,${flick})`); el(g, 800, 316, 6, 8, '#c98a64', .8); el(g, 816, 314, 6, 8, '#6a4a3a', .8);
  // steam from the bakery vent
  for(let k = 0; k < 3; k++){ const ph = (t * .4 + k / 3) % 1; el(g, 740 + Math.sin(t + k) * 6, 240 - ph * 150, 12 + ph * 20, 9 + ph * 14, '#fff', .16 * (1 - ph)); }
  // people going home, with their shopping
  const walkers = [[0, 24, '#3a3448', 1], [1, -18, '#2a3a44', .9], [2, 30, '#443a34', 1.05]];
  for(const [k, v, c, s] of walkers){ const span = 1500, x = ((k * 520 + t * v) % span + span) % span - 110, y = CURB - 6, ph = t * 5 + k;
    g.save(); g.translate(x, y); g.scale(s * (v < 0 ? -1 : 1), s);
    st(g, `M -6 -40 L ${-6 + Math.sin(ph) * 10} 0`, c, 9); st(g, `M 6 -40 L ${6 - Math.sin(ph) * 10} 0`, c, 9);
    fl(g, 'M -18 -40 C -20 -80 -16 -110 0 -112 C 16 -110 20 -80 18 -40 Z', c); el(g, 0, -124, 12, 14, c);
    fl(g, rr(12, -70, 16, 20, 3), '#f4f0e2', .9); g.restore(); }
  // snow
  g.fillStyle = '#fff'; for(let k = 0; k < 60; k++){ const y = ((hash(k + 90) * 720 + t * (16 + hash(k) * 20)) % 720), x = hash(k + 40) * 1280 + Math.sin(t * .8 + k) * 6;
    g.globalAlpha = .5 + hash(k + 7) * .4; g.beginPath(); g.arc(x, y, .9 + hash(k + 3) * 1.4, 0, 6.2832); g.fill(); } g.globalAlpha = 1; }

ILL.room('street', { res:2,
  hot:[[104, 340], [312, 338], [652, 400], [810, 316], [1105, 258], [620, 122]],
  place:{ mangboy:{x:352, y:326, s:.25}, ocampo:{x:868, y:364, s:.24} },
  paint(g, t, R){ R.cached('block', block); people(g, t, R); R.cached('counters', counters); life(g, t); } });
})();

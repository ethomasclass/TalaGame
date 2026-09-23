// ====================== THIRD PERIOD, HUMAN GEOGRAPHY ======================
(() => { const {P, fl, st, el, rr, hash, text, rgrad, lgrad, arm, hand} = ILL;
const DY = 430;
const hand_ = '"Caveat", "Segoe Print", cursive';

function wall(g){
  g.fillStyle = lgrad(g, 0, 0, 0, 720, [[0, '#e6e2d4'], [1, '#cfc9b6']]); g.fillRect(0, 0, 1280, 720);
  fl(g, rr(0, 330, 1280, 12, 0), '#b8b09a'); fl(g, rr(0, 342, 1280, 400, 0), '#c7bfa7');
  // the whiteboard, with today's notes still on it
  fl(g, rr(54, 58, 580, 262, 6), '#9aa0a6'); fl(g, rr(64, 66, 560, 244, 3), '#fbfbf8');
  fl(g, rr(64, 66, 560, 244, 3), lgrad(g, 64, 66, 624, 310, [[0, 'rgba(255,255,255,0)'], [.5, 'rgba(220,226,232,.25)'], [1, 'rgba(255,255,255,0)']]));
  fl(g, rr(80, 310, 520, 10, 3), '#8a9096'); fl(g, rr(120, 302, 36, 8, 3), '#2c5aa0'); fl(g, rr(170, 302, 36, 8, 3), '#b8413a');
  text(g, 'Unit 2 · Migration', 90, 104, `600 30px ${hand_}`, '#2c5aa0', 'left');
  text(g, 'PUSH', 110, 156, `600 26px ${hand_}`, '#b8413a', 'left'); text(g, 'PULL', 470, 156, `600 26px ${hand_}`, '#2c7a4a', 'left');
  st(g, 'M 190 148 L 440 148', '#333', 2.4); st(g, 'M 428 140 L 442 148 L 428 156', '#333', 2.4);
  [['jobs', 110, 190], ['family', 110, 220], ['war / disaster', 110, 250], ['jobs', 470, 190], ['family', 470, 220], ['safety', 470, 250]].forEach(([s, x, y]) => text(g, '· ' + s, x, y, `22px ${hand_}`, '#333', 'left'));
  text(g, 'remittances = $ home', 430, 286, `22px ${hand_}`, '#2c5aa0', 'left'); st(g, 'M 430 292 L 600 292', '#2c5aa0', 1.2);
  // the world map with two pins in it
  fl(g, rr(704, 64, 262, 168, 3), '#8e8470'); fl(g, rr(712, 72, 246, 152, 1), '#a9cbd6');
  const land = '#d9d1a6', lx = 712, ly = 72, sx = 246 / 360, sy = 152 / 180;
  const blob = pts => { g.beginPath(); pts.forEach(([lon, lat], k) => { const x = lx + (lon + 180) * sx, y = ly + (90 - lat) * sy; k ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath(); g.fillStyle = land; g.fill(); };
  blob([[-165, 68], [-100, 72], [-60, 60], [-78, 45], [-80, 26], [-97, 18], [-105, 22], [-118, 34], [-125, 48], [-150, 60]]);
  blob([[-80, 10], [-50, 0], [-36, -8], [-40, -22], [-58, -38], [-70, -52], [-74, -40], [-78, -10]]);
  blob([[-10, 58], [30, 70], [60, 72], [100, 76], [140, 70], [170, 64], [140, 52], [130, 40], [120, 22], [105, 10], [98, 20], [78, 8], [70, 22], [55, 26], [40, 12], [30, 32], [10, 38], [-8, 38], [-8, 48]]);
  blob([[-16, 30], [30, 32], [50, 12], [40, -10], [30, -34], [18, -34], [10, -6], [-16, 12]]);
  blob([[114, -22], [140, -12], [153, -26], [146, -38], [116, -34]]);
  blob([[120, 18], [124, 18], [126, 8], [122, 6], [118, 10]]);
  const pin = (lon, lat, c) => { const x = lx + (lon + 180) * sx, y = ly + (90 - lat) * sy; st(g, `M ${x} ${y} l 0 -12`, '#555', 1.4); el(g, x, y - 13, 4.6, 4.6, c); el(g, x - 1.4, y - 14.4, 1.4, 1.4, '#fff', .8); };
  pin(-74, 40.7, '#c9524a'); pin(121, 13.8, '#e0a43a');
  st(g, rr(712, 72, 246, 152, 1), '#6e6450', 1.2);
  // the window: snow and the parking lot
  fl(g, rr(1004, 56, 250, 272, 3), '#eee8da'); fl(g, rr(1016, 68, 226, 248, 1), lgrad(g, 0, 68, 0, 316, [[0, '#b9c8d8'], [1, '#dfe6ec']]));
  fl(g, 'M 1016 270 L 1242 250 L 1242 316 L 1016 316 Z', '#f4f6f8'); for(const x of [1060, 1140, 1200]) { fl(g, rr(x, 236, 4, 30, 1), '#6a7078'); el(g, x + 2, 236, 14, 10, '#f4f6f8'); }
  fl(g, rr(1126, 68, 6, 248, 0), '#eee8da'); fl(g, rr(1016, 188, 226, 6, 0), '#eee8da'); st(g, rr(1004, 56, 250, 272, 3), '#a8a090', 1.4);
  // the clock, which is slow
  el(g, 670, 36, 22, 22, '#f8f6f0'); st(g, 'M 648 36 a 22 22 0 1 0 44 0 a 22 22 0 1 0 -44 0', '#333', 2.4); st(g, 'M 670 36 L 670 22 M 670 36 L 680 40', '#222', 2);
  // the chair backs
  for(const [x, y, s] of [[320, 150, 1.5], [920, 154, 1.48]]){ const top = y + 176 * s; fl(g, rr(x - 112, top, 224, 60, 14), '#2f4a6a'); st(g, rr(x - 112, top, 224, 60, 14), '#18263a', 1.4); } }

function snow(g, t){ g.save(); g.beginPath(); g.rect(1016, 68, 226, 248); g.clip(); g.fillStyle = '#fff';
  for(let k = 0; k < 40; k++){ const y = 68 + ((hash(k + 90) * 248 + t * (14 + hash(k) * 18)) % 248), x = 1016 + hash(k + 40) * 226 + Math.sin(t * .8 + k) * 5;
    g.globalAlpha = .6 + hash(k + 7) * .4; g.beginPath(); g.arc(x, y, 1 + hash(k + 3) * 1.4, 0, 6.2832); g.fill(); } g.restore(); }

function desks(g){
  // the two desks, a long way apart for two people who sit next to each other
  for(const [x, w] of [[320, 420], [920, 420]]){
    fl(g, `M ${x - w / 2} ${DY} L ${x + w / 2} ${DY} L ${x + w / 2 + 30} 720 L ${x - w / 2 - 30} 720 Z`, '#d8b27a');
    fl(g, `M ${x - w / 2} ${DY} L ${x + w / 2} ${DY} L ${x + w / 2 + 30} 720 L ${x - w / 2 - 30} 720 Z`, lgrad(g, 0, DY, 0, 720, [[0, 'rgba(255,255,255,.18)'], [1, 'rgba(0,0,0,.18)']]));
    for(let k = 0; k < 8; k++) st(g, `M ${x - w / 2 + 20 + k * 52} ${DY + 4} q 10 140 ${-8 + k * 2} 280`, '#b88e56', 1, .4);
    st(g, `M ${x - w / 2} ${DY} L ${x + w / 2} ${DY}`, '#8e6a3a', 2.4); }
  fl(g, 'M 530 430 L 710 430 L 740 720 L 500 720 Z', '#b9b19a');
  // Tala's notebook and pencil; Hannah's, with doodles in the margin
  g.save(); g.translate(250, 452); g.rotate(-.05); fl(g, rr(-70, -12, 140, 42, 3), '#f7f4ea'); fl(g, rr(-70, -12, 6, 42, 0), '#2f55a5');
  for(let k = 0; k < 3; k++) fl(g, rr(-56, -2 + k * 10, 90 + hash(k) * 20, 1.4, 0), '#9ab0c8'); st(g, rr(-70, -12, 140, 42, 3), '#a89c86', 1); g.restore();
  g.save(); g.translate(1010, 452); g.rotate(.06); fl(g, rr(-70, -12, 140, 42, 3), '#f7f4ea'); fl(g, rr(-70, -12, 6, 42, 0), '#5b8a5e');
  for(let k = 0; k < 3; k++) fl(g, rr(-56, -2 + k * 10, 60, 1.4, 0), '#9ab0c8'); st(g, 'M 30 4 q 6 -8 12 0 t 12 0', '#c9524a', 1.4); el(g, 48, 18, 5, 5, '#e0a43a', .8);
  st(g, rr(-70, -12, 140, 42, 3), '#a89c86', 1); g.restore(); }

function props(g, t, R){
  const pl = R.place;
  // Tala, forearms on the desk, a pencil in one hand
  R.dim('tala'); { const x = pl.tala.x, W = 50, L = 84;
    arm(g, 'tala', -1, [x - 84, 400], [x - 120, 452], [x - 60, 478], W * .72); arm(g, 'tala', 1, [x + 84, 400], [x + 120, 452], [x + 62, 470], W * .72);
    hand(g, 'tala', x - 62, 476, .12, L, W, .55, false, true);
    g.save(); g.translate(x + 30, 470); g.rotate(-.9); fl(g, rr(-4, -40, 8, 80, 2), '#e0a43a'); fl(g, 'M -4 40 L 4 40 L 0 50 Z', '#e9c9a0'); fl(g, rr(-4, -46, 8, 8, 2), '#e89aa0'); g.restore();
    hand(g, 'tala', x + 62, 468, Math.PI - .2, L, W, .7, true, true); }
  // Hannah, turned toward Tala, one elbow on the desk
  R.dim('hannah'); { const x = pl.hannah.x, W = 48, L = 82;
    arm(g, 'hannah', -1, [x - 82, 404], [x - 116, 456], [x - 56, 474], W * .7); arm(g, 'hannah', 1, [x + 82, 404], [x + 118, 456], [x + 60, 478], W * .7);
    hand(g, 'hannah', x - 58, 472, .1, L, W, .45, false, true); hand(g, 'hannah', x + 60, 476, Math.PI - .1, L, W, .45, true, true); }
  R.undim(); }

ILL.room('school', {
  hot:[[850, 150], [340, 160]],
  place:{ tala:{x:320, y:150, s:1.5}, hannah:{x:920, y:154, s:1.48} },
  paint(g, t, R){
    R.cached('wall', wall); snow(g, t);
    R.char('tala'); R.char('hannah');
    R.cached('desks', desks); props(g, t, R); } });
})();

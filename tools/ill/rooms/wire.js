// ====================== THE MONEY TRANSFER COUNTER, NEWARK AVENUE ======================
(() => { const {P, fl, st, el, rr, hash, text, rgrad, lgrad, arm, hand} = ILL;
const CY = 556, WIN = [690, 120, 590, 446];

function wall(g){
  g.fillStyle = lgrad(g, 0, 0, 400, 720, [[0, '#e1e2d2'], [1, '#b7b9a6']]); g.fillRect(0, 0, 1280, 720);
  g.fillStyle = rgrad(g, 640, 0, 20, 720, [[0, 'rgba(250,250,238,.6)'], [1, 'rgba(250,250,238,0)']]); g.fillRect(0, 0, 1280, 720);
  // the fluorescent tube every counter in the world has
  fl(g, rr(330, 0, 620, 26, 0), '#ecece0'); fl(g, rr(330, 26, 620, 8, 0), '#a8a894');
  // tinsel. It is the 22nd of December and somebody made an effort.
  for(const [path, c] of [['M 690 40 C 830 82 950 82 1090 38', '#c9524a'], ['M 1090 38 C 1180 64 1240 64 1290 36', '#4f8a5a']]){
    st(g, path, c, 7, .8); }
  for(let k = 0; k < 30; k++){ const x = 700 + k * 20, y = 40 + Math.sin((x - 690) / 400 * Math.PI) * 32 * (x < 1090 ? 1 : .6); st(g, `M ${x} ${y} l ${hash(k) * 6 - 3} 7`, k % 2 ? '#e88a80' : '#8fc49a', 2, .8); }
  // the rate board
  fl(g, rr(42, 50, 632, 130, 6), 'rgba(0,0,0,.2)');
  fl(g, rr(34, 40, 632, 130, 6), lgrad(g, 0, 40, 0, 170, [[0, '#20323a'], [1, '#132228']])); fl(g, rr(34, 40, 632, 38, 6), '#2f4a54'); st(g, rr(34, 40, 632, 130, 6), '#0c1418', 2);
  text(g, 'SEND TO THE PHILIPPINES', 54, 67, '18px "IBM Plex Mono", monospace', '#e0c877', 'left');
  text(g, 'Today’s rate', 54, 122, '27px "Fraunces", Georgia, serif', '#f2ecda', 'left');
  text(g, '$1 = 52.40 PHP', 260, 126, '34px "IBM Plex Mono", monospace', '#8fd6a8', 'left');
  text(g, 'RATE CHANGES DAILY · ASK ABOUT FEES', 54, 156, '14px "IBM Plex Mono", monospace', '#9ab0b8', 'left');
  // behind the glass: the back office, a filing cabinet, a calendar from a travel agent
  const [x, y, w, h] = WIN; fl(g, rr(x + 16, y + 16, w - 32, h - 16, 0), '#c9cfc4');
  fl(g, rr(740, 250, 110, 290, 3), '#8f968c'); for(let k = 0; k < 3; k++){ fl(g, rr(750, 262 + k * 92, 90, 78, 2), '#a3aa9f'); fl(g, rr(782, 294 + k * 92, 26, 8, 3), '#5c625a'); }
  fl(g, rr(1050, 160, 170, 30, 2), '#b9c0b4');
  // the monitor he is looking at, side-on
  fl(g, rr(1122, 386, 16, 110, 3), '#3a3e42'); fl(g, rr(1096, 360, 120, 90, 6), '#2a2d31'); fl(g, rr(1104, 496, 60, 10, 3), '#3a3e42'); }

function glass(g){
  const [x, y, w, h] = WIN;
  // a tint, and the two bright reflections that say "glass"
  fl(g, rr(x + 26, y + 26, w - 52, h - 36, 0), 'rgba(170,200,208,.22)');
  fl(g, 'M 760 150 L 900 150 L 800 526 L 730 526 Z', '#fbfbf4', .16); fl(g, 'M 980 150 L 1030 150 L 930 526 L 900 526 Z', '#fbfbf4', .12);
  // the notice taped inside, the speak holes, the frame
  g.save(); g.translate(1156, 272); g.rotate(.02); fl(g, rr(-76, -60, 152, 118, 3), '#f6f2e4');
  text(g, 'FEES', 0, -38, '600 13px "IBM Plex Mono", monospace', '#3a3a34');
  for(let k = 0; k < 5; k++) fl(g, rr(-62, -24 + k * 16, 90 + hash(k) * 30, 3, 1), '#9a9488');
  fl(g, rr(-8, -66, 16, 12, 1), 'rgba(240,236,200,.7)'); st(g, rr(-76, -60, 152, 118, 3), '#b8b2a2', 1); g.restore();
  for(const [cx, cy] of [[1148, 470], [1172, 470], [1196, 470], [1160, 490], [1184, 490], [1172, 510]]) el(g, cx, cy, 7, 7, '#6d746a');
  fl(g, `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} Z M ${x + 26} ${y + 26} L ${x + 26} ${y + h - 10} L ${x + w - 26} ${y + h - 10} L ${x + w - 26} ${y + 26} Z`, '#8e9484');
  fl(g, rr(x, y, w, 16, 0), '#767c6e'); st(g, rr(x + 26, y + 26, w - 52, h - 36, 0), '#5c6258', 2); }

function counterTop(g){
  // laminate, a pen on a chain, the pass tray every envelope goes through
  fl(g, rr(-20, CY, 1320, 180, 0), lgrad(g, 0, CY, 0, 720, [[0, '#d2cab0'], [1, '#9c9782']]));
  fl(g, rr(-20, CY, 1320, 12, 0), '#e8e2cc'); fl(g, rr(-20, 700, 1320, 34, 0), '#7e795f'); st(g, `M -20 ${CY} L 1300 ${CY}`, '#6e6a58', 2);
  fl(g, rr(836, 566, 248, 88, 8), '#5f6458'); fl(g, rr(848, 576, 224, 68, 6), '#8b9184'); fl(g, rr(848, 576, 224, 10, 4), '#a7ad9e');
  // the form, filled in, waiting in the tray
  g.save(); g.translate(1000, 610); g.rotate(-.05); fl(g, rr(-40, -26, 80, 52, 2), '#fbf8ec'); for(let k = 0; k < 4; k++) fl(g, rr(-32, -16 + k * 11, 44 + hash(k + 3) * 20, 2.4, 1), '#2f4a54', .7);
  st(g, rr(-40, -26, 80, 52, 2), '#b0a894', 1); g.restore();
  fl(g, rr(150, 596, 180, 58, 4), '#f4f0e2'); fl(g, rr(166, 614, 134, 3, 1), '#a9a396'); fl(g, rr(166, 630, 100, 3, 1), '#a9a396');
  st(g, 'M 344 600 L 396 646', '#2b3358', 9); st(g, 'M 396 646 q 30 10 60 -4', '#8e8a7a', 1.6);
  el(g, 1184, 606, 36, 12, '#a8a28e'); fl(g, 'M 1152 604 C 1152 578 1216 578 1216 604 Z', '#c9c3ae'); fl(g, rr(1180, 574, 8, 10, 3), '#8e8a7a'); st(g, 'M 1152 604 C 1152 578 1216 578 1216 604 Z', '#6e6a58', 1.2); }

function clerkHands(g, t, R){
  // typing when he is working, still when he is talking to you
  const x = R.place.clerk.x, busy = ILL.S.target.clerk === 'working' || ILL.S.target.clerk === 'up';
  fl(g, rr(x - 110, 520, 220, 24, 4), '#34383c'); for(let k = 0; k < 10; k++) fl(g, rr(x - 100 + k * 20, 525, 16, 6, 2), '#4c5156');
  R.layer('clerk', g => { const W = 44, L = 76, bob = k => busy ? Math.max(0, Math.sin(t * 14 + k * 2.1)) * 3 : 0;
  arm(g, 'clerk', -1, [x - 80, 470], [x - 104, 540], [x - 56, 526], W * .7);
  arm(g, 'clerk', 1, [x + 80, 470], [x + 104, 540], [x + 56, 526], W * .7);
  hand(g, 'clerk', x - 58, 524 - bob(0), .15, L, W, .55, false, true); hand(g, 'clerk', x + 58, 524 - bob(1), Math.PI - .15, L, W, .55, true, true); }); }

ILL.room('wire', {
  hot:[[350, 104], [1156, 272], [1184, 598], [1000, 610]],
  place:{ tala:{x:212, y:204, s:1.46, outfit:'coat', torso:400}, pa:{x:520, y:182, s:1.52, outfit:'coat', torso:400}, clerk:{x:960, y:196, s:1.4, torso:400} },
  paint(g, t, R){
    R.cached('wall', wall); R.char('clerk'); clerkHands(g, t, R); R.cached('glass', glass);
    R.char('tala'); R.char('pa'); R.cached('counter', counterTop); } });
})();

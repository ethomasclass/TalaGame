// ====================== THE DINING ROOM (upstairs, over the restaurant) ======================
(() => { const {P, fl, st, el, rr, hash, text, rgrad, lgrad, arm, hand} = ILL;
const TY = 420, GLASS = [70, 100, 220, 310];
const STAR = P('M 0 -66 L 17 -22 L 63 -20 L 27 9 L 39 54 L 0 28 L -39 54 L -27 9 L -63 -20 L -17 -22 Z');
const STAR_IN = P('M 0 -40 L 10 -14 L 38 -12 L 16 5 L 24 32 L 0 17 L -24 32 L -16 5 L -38 -12 L -10 -14 Z');
// which morning it is, read off the HUD, so the calendar and the table match the story
const sub = () => ((document.getElementById('hud-sub') || {}).textContent || '');
const day = () => { const m = /(\d+)/.exec((document.getElementById('hud-date') || {}).textContent || ''); return m ? +m[1] : 16; };

function room(g){
  g.fillStyle = '#c98f77'; g.fillRect(0, 0, 1280, 720);
  g.fillStyle = '#b77e67'; g.fillRect(0, 0, 1280, 24);
  g.fillStyle = '#a9745f'; g.fillRect(1206, 24, 74, 696); st(g, 'M 1206 24 L 1206 720', '#8e5f4c', 2);
  const [gx, gy, gw, gh] = GLASS; g.fillStyle = '#1d2544'; g.fillRect(gx, gy, gw, gh);
  fl(g, `M ${gx} ${gy + gh} L ${gx} 330 L 100 330 L 100 300 L 150 300 L 150 318 L 196 318 L 196 286 L 236 286 L 236 322 L ${gx + gw} 322 L ${gx + gw} ${gy + gh} Z`, '#141a31');
  [[82, 340], [120, 312], [132, 340], [164, 330], [206, 300], [214, 336], [250, 336], [274, 350], [106, 372], [180, 366]].forEach(([x, y], k) => {
    g.fillStyle = hash(k) > .3 ? '#f2c86a' : '#6a7aa6'; g.globalAlpha = .85; g.fillRect(x, y, 9, 12); g.globalAlpha = 1; }); }

function roomFront(g, d){
  const [gx, gy, gw, gh] = GLASS;
  g.fillStyle = '#efe2cf';
  g.fillRect(gx - 12, gy - 12, gw + 24, 12); g.fillRect(gx - 12, gy + gh, gw + 24, 12); g.fillRect(gx - 12, gy, 12, gh); g.fillRect(gx + gw, gy, 12, gh);
  g.fillRect(gx + gw / 2 - 4, gy, 8, gh); g.fillRect(gx, gy + gh * .48 - 4, gw, 8);
  g.fillStyle = '#cdbfa8'; g.fillRect(gx + gw, gy, 4, gh); g.fillRect(gx, gy + gh, gw, 4);
  g.fillStyle = '#e6d6bf'; g.fillRect(gx - 22, gy + gh + 12, gw + 44, 12); g.fillStyle = '#b3806a'; g.fillRect(gx - 22, gy + gh + 24, gw + 44, 5);
  st(g, rr(gx - 12, gy - 12, gw + 24, gh + 24, 1), '#8e6a52', 1.4);
  // the lamp: warm, hanging left of centre, the one light in the room
  st(g, 'M 470 0 L 470 70', '#3a2a24', 2);
  fl(g, 'M 450 70 L 490 70 L 522 120 L 418 120 Z', '#e3b867'); fl(g, 'M 470 70 L 490 70 L 522 120 L 470 120 Z', '#c89a4c');
  st(g, 'M 450 70 L 490 70 L 522 120 L 418 120 Z', '#6a4a26', 1.4);
  el(g, 470, 123, 38, 8, '#fff1c8'); el(g, 470, 123, 70, 16, '#fff1c8', .18);
  // the free store calendar every Filipino kitchen has, open to December 2018, today ringed
  st(g, 'M 805 44 L 790 70 M 805 44 L 820 70', '#5a4a40', 1); el(g, 805, 44, 2.5, 2.5, '#5a4a40');
  fl(g, rr(760, 70, 90, 136, 3), '#f4eee2'); fl(g, rr(760, 70, 90, 38, 3), '#c9524a');
  text(g, "MANG BOY'S", 805, 86, '600 10.5px "IBM Plex Mono", monospace', '#fff6e4'); text(g, 'SARI-SARI · 2018', 805, 100, '9px "IBM Plex Mono", monospace', '#fff6e4');
  text(g, 'DECEMBER', 805, 121, '600 10px "IBM Plex Mono", monospace', '#3a2a24');
  for(let n = 1; n <= 31; n++){ const c = (n + 5) % 7, r = Math.floor((n + 5) / 7); el(g, 769 + c * 12, 133 + r * 12, 1.3, 1.3, n < d ? '#c9b8a4' : '#8a7a6a'); }
  const c = (d + 5) % 7, r = Math.floor((d + 5) / 7);
  g.beginPath(); g.arc(769 + c * 12, 133 + r * 12, 5.2, 0, 6.2832); g.strokeStyle = '#c9524a'; g.lineWidth = 1.6; g.stroke();
  st(g, rr(760, 70, 90, 136, 3), '#8e7e6a', 1.2);
  // the letter rack: airmail envelopes, and the remittance receipts behind them
  fl(g, rr(872, 150, 70, 64, 4), '#7a5238'); fl(g, rr(876, 186, 62, 24, 3), '#5e3e2a');
  [[880, 138, -.08], [896, 132, .06], [912, 140, -.03]].forEach(([x, y, r], k) => { g.save(); g.translate(x + 14, y + 26); g.rotate(r);
    fl(g, rr(-16, -26, 32, 48, 2), '#f6f1e4'); for(let i = 0; i < 6; i++) fl(g, rr(-16, -26 + i * 8, 3, 4, 0), i % 2 ? '#c9524a' : '#2f55a5');
    for(let i = 0; i < 6; i++) fl(g, rr(13, -26 + i * 8, 3, 4, 0), i % 2 ? '#2f55a5' : '#c9524a'); st(g, rr(-16, -26, 32, 48, 2), '#a89c86', .8); g.restore(); });
  st(g, rr(872, 150, 70, 64, 4), '#3e2819', 1.2);
  // Lola, young, in the good frame, with the rosary on the corner
  fl(g, rr(1090, 116, 108, 138, 3), '#5a3a28'); fl(g, rr(1098, 124, 92, 122, 2), '#eee3cc'); fl(g, rr(1106, 132, 76, 106, 1), '#b8946a');
  fl(g, 'M 1112 238 C 1114 212 1128 204 1144 202 C 1160 204 1174 212 1176 238 Z', '#6b4a30');
  el(g, 1144, 180, 14, 18, '#8a6444'); el(g, 1144, 163, 13, 8, '#4a3222'); el(g, 1144, 156, 7, 6, '#4a3222');
  fl(g, 'M 1190 124 L 1198 116 L 1198 254 L 1190 246 Z', '#3e2819'); fl(g, 'M 1098 246 L 1190 246 L 1198 254 L 1090 254 Z', '#3e2819');
  for(let k = 0; k < 18; k++){ const a = k / 17, x = 1098 + a * 34, y = 124 + Math.sin(a * Math.PI) * 30; el(g, x, y, 1.9, 1.9, '#3a2a4a'); }
  st(g, 'M 1115 154 L 1115 164 M 1111 157.5 L 1119 157.5', '#3a2a4a', 1.4);
  // the chairs, so they read as sitting and not floating
  for(const [x, y, s] of [[318, 128, 1.56], [640, 132, 1.54], [972, 108, 1.62]]){ const top = y + 174 * s;
    for(const sd of [-1, 1]){ fl(g, rr(x + sd * 104 - 8, top, 16, TY - top, 4), '#5a3a2a'); fl(g, rr(x + sd * 104 + (sd > 0 ? 0 : -8), top, 8, TY - top, 3), '#4a2e20'); }
    fl(g, rr(x - 118, top - 4, 236, 20, 7), '#6a4632'); fl(g, rr(x - 118, top + 8, 236, 8, 4), '#553624'); st(g, rr(x - 118, top - 4, 236, 20, 7), '#2e1c14', 1.2); } }

function parol(g, t){ const sw = Math.sin(t * 1.3) * .04; g.save(); g.translate(150, 96); g.rotate(sw);
  st(g, 'M 0 0 L 0 34', '#e9d9b8', 1.2);
  el(g, 0, 78, 92, 92, '#ffd27a', .1); el(g, 0, 78, 62, 62, '#ffd27a', .16);
  g.save(); g.translate(0, 78); g.scale(.66, .66); g.fillStyle = '#e0453f'; g.fill(STAR); g.strokeStyle = '#7a1e1a'; g.lineWidth = 2; g.stroke(STAR);
  g.fillStyle = '#f4c65a'; g.fill(STAR_IN); el(g, 0, 0, 12, 12, '#fff4d2'); g.restore();
  [[-12, 112, '#f4c65a'], [0, 108, '#e0453f'], [12, 112, '#f4c65a']].forEach(([x, y, c], k) => st(g, `M ${x} ${y} Q ${x + Math.sin(t * 2 + k) * 3} ${y + 22} ${x + Math.sin(t * 2.4 + k) * 2} ${y + 42}`, c, 3.4));
  g.restore(); }

function snow(g, t){ const [gx, gy, gw, gh] = GLASS; g.save(); g.beginPath(); g.rect(gx, gy, gw, gh); g.clip(); g.fillStyle = '#eef3ff';
  for(let k = 0; k < 70; k++){ const sp = 12 + hash(k) * 20, y = gy + ((hash(k + 90) * gh + t * sp) % gh), x = gx + hash(k + 40) * gw + Math.sin(t * .8 + k) * 5;
    g.globalAlpha = .45 + hash(k + 7) * .45; g.beginPath(); g.arc(x, y, .9 + hash(k + 3) * 1.4, 0, 6.2832); g.fill(); } g.restore(); }

function table(g, d){
  g.fillStyle = '#f2e9d6'; g.fillRect(0, TY, 1280, 720 - TY);
  g.fillStyle = 'rgba(184,67,60,.15)';
  for(let x = -400; x < 1700; x += 34){ const w = 12, t0 = 640 + (x - 640) * .86, t1 = 640 + (x + w - 640) * .86, b0 = 640 + (x - 640) * 1.3, b1 = 640 + (x + w - 640) * 1.3;
    g.beginPath(); g.moveTo(t0, TY); g.lineTo(t1, TY); g.lineTo(b1, 720); g.lineTo(b0, 720); g.closePath(); g.fill(); }
  for(let k = 0; k < 9; k++){ const y0 = TY + 300 * Math.pow(k / 8, 1.35), y1 = TY + 300 * Math.pow((k + .36) / 8, 1.35); g.fillRect(0, y0, 1280, y1 - y0); }
  g.fillStyle = rgrad(g, 470, 470, 10, 330, [[0, 'rgba(255,236,190,.34)'], [1, 'rgba(255,236,190,0)']]); g.fillRect(0, TY, 1280, 720 - TY);
  g.fillStyle = lgrad(g, 0, TY, 0, TY + 26, [[0, 'rgba(90,50,34,.28)'], [1, 'rgba(90,50,34,0)']]); g.fillRect(0, TY, 1280, 26);
  g.fillStyle = '#d8c9aa'; g.fillRect(0, TY - 2, 1280, 3);
  // the pan de sal, on the good plate
  el(g, 1128, 626, 104, 30, '#b9ab90'); el(g, 1128, 620, 104, 30, '#f7f2e8'); el(g, 1128, 620, 80, 21, '#ece4d4'); st(g, 'M 1024 620 a 104 30 0 1 0 208 0 a 104 30 0 1 0 -208 0', '#a89c86', 1.2);
  [[1094, 612, -.2], [1140, 606, .1], [1118, 628, .05], [1164, 624, -.1]].forEach(([x, y, r]) => { g.save(); g.translate(x, y); g.rotate(r);
    el(g, 0, 3, 25, 15, '#b86f34'); el(g, 0, 0, 25, 15, '#d99a52'); el(g, -4, -4, 13, 6, '#eab874'); g.fillStyle = '#f6ecd8';
    for(let k = 0; k < 9; k++){ g.globalAlpha = .7; g.beginPath(); g.arc(-15 + hash(k + x) * 30, -7 + hash(k + y) * 14, 1.1, 0, 6.2832); g.fill(); } g.globalAlpha = 1;
    st(g, 'M -25 0 a 25 15 0 1 0 50 0 a 25 15 0 1 0 -50 0', '#7a4420', 1.1); g.restore(); });
  if(d >= 22){ g.save(); g.translate(804, 452); g.rotate(-.12); fl(g, rr(-24, -11, 48, 22, 6), '#26252b'); fl(g, rr(-19, -7, 9, 9, 3), '#3a3940'); st(g, rr(-24, -11, 48, 22, 6), '#0e0e12', 1.2); g.restore(); } }

function mug(g, x, y, s, t, steam){ g.save(); g.translate(x, y); g.scale(s, s);
  fl(g, rr(-32, 0, 64, 72, 10), '#e9dfc9'); fl(g, rr(-32, 20, 64, 11, 0), '#c9524a'); st(g, rr(-32, 0, 64, 72, 10), '#8e8270', 1.3);
  el(g, 0, 1, 32, 7, '#d8cdb4'); el(g, 0, 1.5, 26.5, 5, '#4a2a1c');
  if(steam) for(let k = 0; k < 2; k++){ const ph = (t * .5 + k * .5) % 1; st(g, `M ${-8 + k * 16} ${-8 - ph * 34} q 4 -6 0 -12 t 0 -12`, '#fff8ee', 1.7, .55 * (1 - ph)); }
  g.restore(); }
function bill(g, x, y, rot){ g.save(); g.translate(x, y); g.rotate(rot); g.scale(1.45, 1.35); fl(g, rr(-27, -13, 54, 26, 2), '#aebfa6'); el(g, 0, 0, 7, 7, '#93a78c'); st(g, rr(-27, -13, 54, 26, 2), '#6f8468', 1); g.restore(); }

function props(g, t, R, d){
  const pl = R.place, S = ILL.S, counting = S.target.ma === 'counting';
  // the envelope is on the table only between the phone call and the trip to the counter
  const call = d === 22 && /after the call/i.test(sub());
  if(call){ g.save(); g.translate(484, 462); g.rotate(.07); fl(g, rr(-36, -18, 72, 36, 3), '#f4efe4');
    st(g, 'M -36 -18 L 0 4 L 36 -18', '#c9bfae', 1.2); st(g, 'M -22 7 q 6 -4 12 0 t 12 0 t 12 0', '#5a4a8a', .9, .7); st(g, rr(-36, -18, 72, 36, 3), '#a89c86', 1); g.restore(); }
  // Tala, both hands wrapped around a mug of tsokolate
  R.dim('tala'); { const x = pl.tala.x, W = 52, L = 88;
    arm(g, 'tala', -1, [x - 86, 398], [x - 124, 446], [x - 80, 472], W * .72); arm(g, 'tala', 1, [x + 86, 398], [x + 124, 446], [x + 80, 468], W * .72);
    mug(g, x, 410, 1, t, true);
    hand(g, 'tala', x - 72, 470, -.06, L, W, .35, false); hand(g, 'tala', x + 72, 466, Math.PI + .06, L, W, .35, true); }
  // Ma: counting the money twice when she is counting, otherwise her hands flat either side of her cup
  R.dim('ma'); { const x = pl.ma.x, W = 52, L = 90;
    if(counting || call){
      arm(g, 'ma', -1, [x - 86, 400], [x - 126, 448], [x - 84, 488], W * .72); arm(g, 'ma', 1, [x + 86, 400], [x + 128, 444], [x + 90, 472], W * .72);
      bill(g, x - 16, 478, -.05); bill(g, x - 12, 474, .04); bill(g, x - 14, 470, -.02);
      if(counting){ const p = (t % .9) / .9; bill(g, x + 4 - 22 * p, 466 - 10 * Math.sin(Math.PI * p), -.2 * Math.sin(Math.PI * p)); }
      hand(g, 'ma', x - 86, 484, -.12, L, W, .15, false, true); hand(g, 'ma', x + 92, 466, Math.PI - .3, L * .92, W, .4, true);
    } else {
      arm(g, 'ma', -1, [x - 86, 400], [x - 128, 448], [x - 70, 480], W * .72); arm(g, 'ma', 1, [x + 86, 400], [x + 128, 448], [x + 70, 480], W * .72);
      mug(g, x, 420, .82, t, true);
      hand(g, 'ma', x - 72, 480, .05, L, W, .2, false, true); hand(g, 'ma', x + 72, 480, Math.PI - .05, L, W, .2, true, true); } }
  // Pa, hands folded, sleeves rolled
  R.dim('pa'); { const x = pl.pa.x, W = 54, L = 92;
    arm(g, 'pa', -1, [x - 92, 394], [x - 130, 444], [x - 70, 484], W * .74); arm(g, 'pa', 1, [x + 92, 394], [x + 130, 444], [x + 70, 478], W * .74);
    if(d < 22){ mug(g, x + 150, 440, .8, t, false); g.save(); g.translate(x + 150, 500); el(g, 0, 0, 22, 12, '#d99a52'); st(g, 'M -22 0 a 22 12 0 1 0 44 0 a 22 12 0 1 0 -44 0', '#7a4420', 1); g.restore(); }
    hand(g, 'pa', x - 70, 482, -.1, L, W, .8, false, true); hand(g, 'pa', x + 70, 474, Math.PI + .12, L, W, .8, true, true); }
  R.undim(); }

ILL.room('dining', {
  hot:[[150, 174], [1144, 185], [470, 96], [908, 170]],
  place:{ tala:{x:318, y:128, s:1.56}, ma:{x:640, y:132, s:1.54}, pa:{x:972, y:108, s:1.62} },
  paint(g, t, R){ const d = day();
    R.cached('back', room); snow(g, t); R.cached('front' + d, g2 => roomFront(g2, d)); parol(g, t);
    R.char('tala'); R.char('ma'); R.char('pa');
    R.cached('table' + d, g2 => table(g2, d)); props(g, t, R, d); } });
})();

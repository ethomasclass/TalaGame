// Nine Mornings, illustrated. Canvas 2D renderer.
// Character as data, style as renderer: every person is a set of numbers (face shape, colours, clothes) and every
// expression is a set of numbers (brow height, lid, gaze, mouth curve) that eases toward its target each frame.
// Rooms register a paint(g, t, R) function. One shared canvas moves into whichever layer the engine shows.
const ILL = (() => {
const W = 1280, H = 720;
const DPR = Math.min(2, window.devicePixelRatio || 1);
// backing scale. A room that the camera pushes into (the street) asks for more, capped at 2 for school laptops' memory
let K = DPR;
const P = s => new Path2D(s);
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const base = g => g.setTransform(K, 0, 0, K, 0, 0);
function fl(g, p, c, a){ g.save(); if(a != null) g.globalAlpha *= a; g.fillStyle = c; g.fill(typeof p === 'string' ? P(p) : p); g.restore(); }
function st(g, p, c, w, a){ g.save(); if(a != null) g.globalAlpha *= a; g.strokeStyle = c; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round';
  g.stroke(typeof p === 'string' ? P(p) : p); g.restore(); }
function el(g, x, y, rx, ry, c, a, rot){ g.save(); if(a != null) g.globalAlpha *= a; g.fillStyle = c; g.beginPath(); g.ellipse(x, y, rx, ry, rot || 0, 0, 6.2832); g.fill(); g.restore(); }
function clip(g, p, fn){ g.save(); g.clip(typeof p === 'string' ? P(p) : p); fn(); g.restore(); }
const rr = (x, y, w, h, r) => { r = Math.min(r, w / 2, h / 2); return P(`M ${x + r} ${y} L ${x + w - r} ${y} Q ${x + w} ${y} ${x + w} ${y + r} L ${x + w} ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} L ${x + r} ${y + h} Q ${x} ${y + h} ${x} ${y + h - r} L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} Z`); };
function rgrad(g, x, y, r0, r1, stops){ const gr = g.createRadialGradient(x, y, r0, x, y, r1); stops.forEach(([o, c]) => gr.addColorStop(o, c)); return gr; }
function lgrad(g, x0, y0, x1, y1, stops){ const gr = g.createLinearGradient(x0, y0, x1, y1); stops.forEach(([o, c]) => gr.addColorStop(o, c)); return gr; }
function text(g, s, x, y, font, col, align){ g.save(); g.font = font; g.fillStyle = col; g.textAlign = align || 'center'; g.fillText(s, x, y); g.restore(); }

// ====================== THE RIG ======================
const CAST = {}, HAIR = {};
const facePath = f => { const {cw, jw, jy, cy, chw} = f;
  return P(`M 100 28 C ${100 + cw * .62} 28 ${100 + cw} 44 ${100 + cw} 72 C ${100 + cw} 90 ${100 + jw + 6} ${jy - 8} ${100 + jw} ${jy}
    C ${100 + jw - 6} ${jy + 8} ${100 + chw + 4} ${cy} ${100 + chw} ${cy + 1} C ${100 + chw * .4} ${cy + 2.2} ${100 - chw * .4} ${cy + 2.2} ${100 - chw} ${cy + 1}
    C ${100 - chw - 4} ${cy} ${100 - jw + 6} ${jy + 8} ${100 - jw} ${jy} C ${100 - jw - 6} ${jy - 8} ${100 - cw} 90 ${100 - cw} 72
    C ${100 - cw} 44 ${100 - cw * .62} 28 100 28 Z`); };
const faceShadow = f => { const {cw, jw, jy, cy, chw} = f;
  return P(`M ${100 + cw * .5} 24 C ${100 + cw * .82} 50 ${100 + cw * .82} 88 ${100 + jw * .72} ${jy - 6} C ${100 + jw * .3} ${jy + 8} ${100 + chw} ${cy} 100 ${cy + 3} L 170 ${cy + 3} L 170 20 Z`); };
const neckPath = w => P(`M ${100 - w} 108 C ${100 - w + 1} 126 ${100 - w} 140 ${100 - w - 4} 153 L ${100 + w + 4} 153 C ${100 + w} 140 ${100 + w - 1} 126 ${100 + w} 108 Z`);
const SHOULDERS = P('M 26 206 C 28 178 44 162 70 155 C 80 152 88 151 100 151 C 112 151 120 152 130 155 C 156 162 172 178 174 206 Z');
const SHOULDERS_WIDE = P('M 22 206 C 24 176 42 160 68 153 C 80 150 88 149 100 149 C 112 149 120 150 132 153 C 158 160 176 176 178 206 Z');
// torso: true ends at the hip (local 352); a number ends there instead, so big figures can run off the bottom of the frame
const tEnd = torso => torso === true ? 352 : torso;
const TORSO = e => P(`M 26 206 C 28 178 44 162 70 155 C 80 152 88 151 100 151 C 112 151 120 152 130 155 C 156 162 172 178 174 206 C 174 250 168 300 166 352 L 166 ${e} L 34 ${e} L 34 352 C 32 300 26 250 26 206 Z`);
const TORSO_WIDE = e => P(`M 22 206 C 24 176 42 160 68 153 C 80 150 88 149 100 149 C 112 149 120 150 132 153 C 158 160 176 176 178 206 C 178 252 172 302 170 352 L 170 ${e} L 30 ${e} L 30 352 C 28 302 22 252 22 206 Z`);
const SHOULDER_SHADE = P('M 128 154 C 150 162 166 178 170 206 C 170 250 164 300 162 356 L 162 700 L 190 700 L 190 148 Z');
// the same person can dress differently per room: place.outfit names one of cast.outfits
const dressed = id => { const ch = CAST[id], pl = R.place[id], o = pl && pl.outfit && ch.outfits && ch.outfits[pl.outfit]; return o ? {...ch, clothes:o} : ch; };
const bodyPath = (ch, torso) => ch.clothes.wide ? (torso ? TORSO_WIDE(tEnd(torso)) : SHOULDERS_WIDE) : (torso ? TORSO(tEnd(torso)) : SHOULDERS);

// expressions are numbers, so faces ease from one to the next instead of snapping
const Z = {browY:0, tilt:0, knit:0, lid:.06, gx:0, gy:0, curve:.1, press:0, squint:0, o:0, grin:0};
const EX = {
  neutral:{}, quiet:{browY:.5, tilt:.3, knit:.3, lid:.24, gy:.7, curve:-.1, press:.35},
  wince:{browY:.8, tilt:.55, knit:1, lid:.34, squint:.35, curve:-.35, press:.7},
  tired:{browY:.55, tilt:.35, knit:.1, lid:.55, gy:.6, curve:-.05, press:.1},
  smile:{browY:-.45, tilt:-.1, lid:.1, squint:.55, curve:1, grin:.5},
  held:{browY:-.2, tilt:.2, knit:.15, lid:.2, gy:.4, curve:.3, press:.65},
  counting:{browY:.7, tilt:-.1, knit:.55, lid:.48, gy:2.2, curve:-.15, press:.5},
  warm:{browY:-.35, lid:.14, squint:.55, curve:.9, grin:.2},
  down:{browY:1, tilt:.4, knit:.35, lid:.52, gx:.3, gy:2.3, curve:-.3, press:.3},
  soft:{browY:-.15, tilt:.1, lid:.14, squint:.25, curve:.5, press:.2},
  curious:{browY:-1.4, tilt:-.25, lid:0, curve:.15, o:.55},
  flat:{browY:.15, lid:.22, curve:-.2, press:.6},
  up:{browY:-.8, tilt:-.1, lid:0, curve:.15},
  talk:{browY:-.35, lid:.08, curve:.35},
  working:{browY:.35, knit:.2, lid:.46, gy:2.1, curve:0, press:.2},
  kind:{browY:-.45, lid:.1, squint:.4, curve:.75},
  asleep:{browY:.4, lid:1, curve:0, press:.2},
};
for(const k in EX) EX[k] = {...Z, ...EX[k]};
const KEYS = Object.keys(Z);

function eyeGeom(side, es){
  const b = {o:[74, 77], i:[93, 77.5], u1:[77, 71.5], u2:[88, 70.5], l1:[88, 80.6], l2:[78, 80.6]}, c = [83.8, 76.2], out = {};
  for(const k in b){ let [x, y] = b[k]; x = c[0] + (x - c[0]) * es; y = c[1] + (y - c[1]) * es; out[k] = [side ? 200 - x : x, y]; }
  out.c = [side ? 200 - c[0] : c[0], c[1]]; return out; }

function drawEye(g, ch, side, e){
  const q = eyeGeom(side, ch.eyeS), lid = Math.min(1, e.lid), lash = '#150c09', sq = e.squint * 3.2;
  const l1 = [q.l1[0], q.l1[1] - sq], l2 = [q.l2[0], q.l2[1] - sq];
  const u1 = [q.u1[0], q.u1[1] + (l2[1] - q.u1[1]) * lid * .97], u2 = [q.u2[0], q.u2[1] + (l1[1] - q.u2[1]) * lid * .97];
  const upper = `M ${q.o[0]} ${q.o[1]} C ${u1[0]} ${u1[1]} ${u2[0]} ${u2[1]} ${q.i[0]} ${q.i[1]}`;
  if(lid > .9){ st(g, upper, lash, ch.glasses ? 1 : 1.15); return; }
  const open = P(`${upper} C ${l1[0]} ${l1[1]} ${l2[0]} ${l2[1]} ${q.o[0]} ${q.o[1]} Z`);
  clip(g, open, () => {
    g.fillStyle = ch.white || '#f1e9df'; g.fillRect(q.c[0] - 13, q.c[1] - 9, 26, 18);
    const gx = Math.max(-2.7, Math.min(2.7, e.gx)), gy = Math.max(-2.2, Math.min(2.6, e.gy)), ix = q.c[0] + gx, iy = q.c[1] + .2 + gy, r = 4.7 * ch.eyeS;
    el(g, ix, iy, r, r, ch.iris); el(g, ix, iy, 1.95 * ch.eyeS, 1.95 * ch.eyeS, '#0d0806');
    el(g, ix - 1.5, iy - 1.7, .95, .95, '#fff', .92); });
  st(g, upper, lash, ch.glasses ? 1.05 : 1.25);
  const fx = side ? 2.2 : -2.2; st(g, `M ${q.o[0]} ${q.o[1]} l ${fx} -1.4`, lash, .95);
  st(g, `M ${q.i[0]} ${q.i[1]} C ${l1[0]} ${l1[1]} ${l2[0]} ${l2[1]} ${q.o[0]} ${q.o[1]}`, '#6e4231', .5, .45);
  if(e.squint > .3){ const sx = side ? 1 : -1; st(g, `M ${q.c[0] - 5} ${q.l1[1] + 1.2} Q ${q.c[0]} ${q.l1[1] + 2.6} ${q.c[0] + 5} ${q.l1[1] + 1.2}`, ch.shade, .6, .6 * e.squint);
    if(ch.age > .5) st(g, `M ${q.o[0] + sx * 2.8} ${q.o[1] + .6} l ${sx * 3} 1.4`, ch.shade, .55, .7); }
  if(ch.lidCrease){ st(g, `M ${q.o[0]} ${q.o[1] - 2.2} C ${u1[0]} ${u1[1] - 2.8} ${u2[0]} ${u2[1] - 2.8} ${q.i[0]} ${q.i[1] - 2}`, ch.shade, .7, .8); }
  if(ch.age > .5){ const sx = side ? 1 : -1; st(g, `M ${q.o[0] + sx * 2.8} ${q.o[1] - .6} l ${sx * 2.6} -1`, ch.shade, .55, .7);
    st(g, `M ${q.o[0] + sx * 2.8} ${q.o[1] + 1.6} l ${sx * 2.6} .7`, ch.shade, .55, .6); }
  if(ch.age > 1.6){ st(g, `M ${q.c[0] - 6} ${q.l1[1] + 3.4} Q ${q.c[0]} ${q.l1[1] + 5.4} ${q.c[0] + 6} ${q.l1[1] + 3.4}`, ch.shade, .6, .6); } }

function drawBrow(g, ch, side, e){
  const sg = side ? -1 : 1, b = ch.brows;
  const by = e.browY * 2.2, A = [100 - sg * (6 - e.knit * 2), 65.4 + by - e.tilt * 4.6 + e.knit * .6], C = [100 - sg * 18, b.peak + by - e.tilt * 1.2], Zp = [100 - sg * 28, 66 + by * .8 + e.tilt * .8];
  const top = [], bot = [];
  for(let k = 0; k <= 12; k++){ const s = k / 12, u = 1 - s, x = u * u * A[0] + 2 * u * s * C[0] + s * s * Zp[0], y = u * u * A[1] + 2 * u * s * C[1] + s * s * Zp[1], t = b.ti * u + b.to * s;
    top.push([x, y - t / 2]); bot.unshift([x, y + t / 2]); }
  fl(g, 'M ' + [...top, ...bot].map(p => p.join(' ')).join(' L ') + ' Z', ch.brow); }

function drawMouth(g, ch, e){
  const m = ch.mouth, y = m.y, w = m.w * (1 - e.o * .42) * (1 + Math.max(0, e.curve) * .14), c = e.curve, o = (e.open || 0) + e.o * .55 + e.grin * .35, uh = m.uh * (1 - e.press * .55), lh = m.lh * (1 - e.press * .45);
  const lift = c > 0 ? c * 3.4 : c * 2.2, L = [100 - w, y - lift], R = [100 + w, y - lift], mid = y + 1.2 + Math.max(0, c) * 1.2, oy = o * 5.5;
  if(o > .05){ const inner = P(`M ${L[0]} ${L[1]} Q 100 ${mid - e.o * 2} ${R[0]} ${R[1]} Q 100 ${mid + oy} ${L[0]} ${L[1]} Z`);
    fl(g, inner, '#4a1c18'); clip(g, inner, () => { g.fillStyle = '#efe6da'; g.fillRect(100 - w * .8, mid - 1.4 - e.grin, w * 1.6, 1.8 + e.grin * 2.2); }); }
  fl(g, `M ${L[0]} ${L[1]} C ${100 - w * .55} ${y - uh * .85} 97.5 ${y - uh - .3} 100 ${y - uh + .7} C 102.5 ${y - uh - .3} ${100 + w * .55} ${y - uh * .85} ${R[0]} ${R[1]} Q 100 ${mid - e.o * 2} ${L[0]} ${L[1]} Z`, ch.lips[0]);
  fl(g, `M ${L[0]} ${L[1]} Q 100 ${mid + oy} ${R[0]} ${R[1]} C ${100 + w * .6} ${y + lh + oy} ${100 - w * .6} ${y + lh + oy} ${L[0]} ${L[1]} Z`, ch.lips[1]);
  st(g, `M ${L[0]} ${L[1]} Q 100 ${mid} ${R[0]} ${R[1]}`, '#5e2a25', .8);
  if(c > .5){ st(g, `M ${L[0] - 1.5} ${L[1] - 1.8} q -1.4 1.6 -.2 3.4`, ch.shade, .7, .7); st(g, `M ${R[0] + 1.5} ${R[1] - 1.8} q 1.4 1.6 .2 3.4`, ch.shade, .7, .7); }
  el(g, 100, y + lh + oy + 2.6, 6.5, 1.4, ch.shade); }

function drawClothes(g, ch, torso){
  const c = ch.clothes, S = bodyPath(ch, torso);
  fl(g, S, c.col); clip(g, S, () => fl(g, SHOULDER_SHADE, c.shade)); st(g, S, c.line, .8);
  const bot = torso ? tEnd(torso) : 206;
  if(c.pattern === 'stripe') clip(g, S, () => { for(let y = 160; y < bot; y += 11) fl(g, `M 0 ${y} L 200 ${y} L 200 ${y + 4} L 0 ${y + 4} Z`, c.shade, .45); });
  if(c.neck === 'crew'){ const col = P('M 76 151 C 86 167 114 167 124 151 L 120.5 150 C 112 162 88 162 79.5 150 Z'); fl(g, col, c.trim || c.shade); st(g, col, c.line, .7); }
  if(c.neck === 'tee'){ st(g, 'M 79 151 C 88 163 112 163 121 151', c.line, 1.1); st(g, 'M 81 153.5 C 89 162 111 162 119 153.5', c.shade, 1.4, .8); }
  if(c.neck === 'vneck'){ fl(g, 'M 87 150.5 L 100 173 L 113 150.5 Z', ch.neck); clip(g, 'M 87 150.5 L 100 173 L 113 150.5 Z', () => fl(g, 'M 104 150 L 100 173 L 114 150 Z', ch.shade));
    fl(g, 'M 85 150 L 100 174 L 92 158 L 80 154 Z', c.trim || c.shade); fl(g, 'M 115 150 L 100 174 L 108 158 L 120 154 Z', c.shade); }
  if(c.neck === 'collar'){ fl(g, 'M 90 149 L 100 166 L 110 149 Z', c.under || '#f5f0e5'); st(g, 'M 90.5 150 Q 100 157 109.5 150', '#d2c8b6', .7);
    const cl = P('M 86 148 L 99 165 L 90 170 L 78 157 Z'), cr = P('M 114 148 L 101 165 L 110 170 L 122 157 Z');
    fl(g, cl, c.trim || c.col); fl(g, cr, c.shade); st(g, cl, c.line, .7); st(g, cr, c.line, .7);
    st(g, `M 100 166 L 100 ${bot}`, c.line, .8, .6); [180, 196, 222, 250, 280, 310, 340, 370].forEach(y => { if(y < bot) el(g, 100, y, 1.2, 1.2, c.under || '#f6f1e6'); }); }
  if(c.neck === 'polo'){ fl(g, 'M 90 150 L 100 168 L 110 150 Z', ch.neck); const cl = P('M 84 148 L 99 166 L 88 170 L 76 156 Z'), cr = P('M 116 148 L 101 166 L 112 170 L 124 156 Z');
    fl(g, cl, c.col); fl(g, cr, c.shade); st(g, cl, c.line, .7); st(g, cr, c.line, .7); st(g, 'M 100 168 L 100 186', c.line, .8); el(g, 100, 177, 1.1, 1.1, '#eee'); }
  if(c.cardigan){ const k = c.cardigan; fl(g, `M 26 206 C 28 178 44 162 70 155 C 76 153 82 152 86 152 C 90 170 92 186 92 ${bot} L 26 ${bot} Z`, k[0]);
    fl(g, `M 174 206 C 172 178 156 162 130 155 C 124 153 118 152 114 152 C 110 170 108 186 108 ${bot} L 174 ${bot} Z`, k[1]);
    st(g, `M 86 152 C 90 170 92 186 92 ${bot}`, c.line, .8); st(g, `M 114 152 C 110 170 108 186 108 ${bot}`, c.line, .8);
    [176, 194].forEach(y => el(g, 90, y, 1.5, 1.5, k[2] || '#e8dcc0')); }
  if(c.cross){ st(g, 'M 89.5 152 Q 100 169.5 110.5 152', '#e0b04a', .7); st(g, 'M 100 166.5 L 100 172.5', '#e0b04a', .9); st(g, 'M 97.9 168.6 L 102.1 168.6', '#e0b04a', .9); }
  if(c.chain){ st(g, 'M 86 151 Q 100 166 114 151', '#e0b04a', .8); el(g, 100, 164, 2, 2.4, '#e0b04a'); }
  if(c.brooch){ el(g, 80, 172, 3.2, 3.2, '#e0b04a'); el(g, 80, 172, 1.6, 1.6, '#c9524a'); }
  if(c.lanyard){ st(g, 'M 84 152 L 94 196', '#2c5aa0', 2.2); st(g, 'M 116 152 L 106 196', '#2c5aa0', 2.2); fl(g, rr(91, 194, 18, 24, 2), '#f6f6f2'); fl(g, rr(91, 194, 18, 7, 2), '#2c5aa0');
    fl(g, rr(94, 204, 12, 2, 1), '#9aa'); fl(g, rr(94, 209, 9, 2, 1), '#9aa'); st(g, rr(91, 194, 18, 24, 2), '#6a7080', .6); }
  if(c.apron){ const a = c.apron, bib = P(`M 72 174 L 128 174 L 132 ${bot} L 68 ${bot} Z`);
    st(g, 'M 73 175 C 72 164 80 156 86 152', a[1], 2.4); st(g, 'M 127 175 C 128 164 120 156 114 152', a[1], 2.4);
    fl(g, bib, a[0]); clip(g, bib, () => fl(g, SHOULDER_SHADE, a[1], .6)); st(g, bib, c.line, .8);
    if(torso) { fl(g, `M 70 262 L 130 262 L 130 268 L 70 268 Z`, a[1], .8); fl(g, rr(84, 290, 32, 22, 3), a[1], .5); }
    if(a[2]) st(g, 'M 90 192 L 110 192', a[2], 1.6); } }

function drawHead(g, id, e, torso){
  const ch = dressed(id), Hs = HAIR[ch.hairStyle] || {}, f = ch.face, FACE = facePath(f), NECK = neckPath(ch.neckW), ink = '#0a0707';
  if(Hs.back){ fl(g, Hs.back, ch.hair); st(g, Hs.back, ink, .8); }
  if(Hs.bun){ const [bx, by, br] = Hs.bun; el(g, bx, by, br, br, ch.hair); g.save(); g.beginPath(); g.ellipse(bx, by, br, br, 0, 0, 6.2832); g.strokeStyle = ink; g.lineWidth = .8; g.stroke(); g.restore(); }
  if(Hs.curls){ for(const [x, y, r] of Hs.curls) el(g, x, y, r + .8, r + .8, ink); for(const [x, y, r] of Hs.curls) el(g, x, y, r, r, ch.hair); }
  if(!ch.noBody){
    fl(g, NECK, ch.neck);
    clip(g, NECK, () => { fl(g, `M ${80 - ch.neckW} 106 L ${120 + ch.neckW} 106 L ${120 + ch.neckW} 124 C 112 130 88 130 ${80 - ch.neckW} 124 Z`, ch.shade);
      fl(g, `M ${100 + ch.neckW - 6} 124 C ${104 + ch.neckW} 136 ${106 + ch.neckW} 146 ${110 + ch.neckW} 153 L 140 153 L 140 124 Z`, ch.shade); });
    st(g, `M ${100 - ch.neckW} 110 C ${100 - ch.neckW + 1} 126 ${100 - ch.neckW} 140 ${100 - ch.neckW - 4} 153`, ch.line, .8);
    st(g, `M ${100 + ch.neckW} 110 C ${100 + ch.neckW - 1} 126 ${100 + ch.neckW} 140 ${100 + ch.neckW + 4} 153`, ch.line, .8);
    drawClothes(g, ch, torso); }
  if(ch.ears) for(const s of [1, -1]){ const X = x => 100 + s * (x - 100), cw = f.cw;
    const ear = P(`M ${X(100 + cw - 1.2)} 74 C ${X(100 + cw + 7)} 69 ${X(100 + cw + 8.5)} 84 ${X(100 + cw + 5)} 93 C ${X(100 + cw + 3)} 97.5 ${X(100 + cw - .5)} 96.5 ${X(100 + cw - 1.2)} 94 Z`);
    fl(g, ear, s > 0 ? ch.shade : ch.skin); st(g, ear, ch.line, .8);
    st(g, `M ${X(100 + cw + 1)} 77 C ${X(100 + cw + 5)} 76 ${X(100 + cw + 5)} 86 ${X(100 + cw + 2.5)} 90`, ch.line, .6, .6);
    if(ch.earring){ el(g, X(100 + cw + 3.2), 96.8, 1.7, 1.7, ch.earring === true ? '#e0b04a' : ch.earring); } }
  fl(g, FACE, ch.skin);
  clip(g, FACE, () => {
    fl(g, faceShadow(f), ch.shade);
    const dx = (ch.nose - 1) * 3; fl(g, `M ${103.5 + dx} 80 C ${105 + dx} 86 ${106 + dx} 90 ${106.5 + dx} 94 C ${105 + dx} 92 ${104 + dx} 86 ${102.5 + dx} 80 Z`, ch.shade);
    el(g, 100, 101.4, 5 * ch.nose, 1.1, ch.shade);
    if(ch.blush) { el(g, 76, 94, 9, 5, ch.blush, .35); el(g, 124, 94, 9, 5, ch.blush, .3); }
    if(ch.freckles){ for(let k = 0; k < 22; k++){ const side = k % 2 ? 1 : -1, x = 100 + side * (12 + hash(k) * 20), y = 84 + hash(k + 50) * 12; el(g, x, y, .7, .7, ch.freckles, .7); } }
    if(ch.stubble){ fl(g, 'M 66 96 C 70 106 80 104 88 104.5 C 94 104 98 105 100 105 C 102 105 106 104 112 104.5 C 120 104 130 106 134 96 L 140 140 L 60 140 Z', '#4a3d3a', .09);
      fl(g, 'M 84 116 C 90 114 110 114 116 116 L 120 140 L 80 140 Z', '#4a3d3a', .06); }
    if(ch.mustache) fl(g, 'M 88 105.2 C 92 102.6 97 103 100 104 C 103 103 108 102.6 112 105.2 C 108 105.4 104 105.2 100 105.6 C 96 105.2 92 105.4 88 105.2 Z', ch.mustache, .85);
    if(ch.age > .5){ st(g, 'M 91.5 100.5 Q 88 106 88.8 111.5', ch.shade, ch.age > 1 ? .85 : .7, .75); st(g, 'M 108.5 100.5 Q 112 106 111.2 111.5', ch.shade, ch.age > 1 ? .85 : .7, .75);
      st(g, 'M 76 82 Q 84 83.8 91 81.8', ch.shade, .5, .45); st(g, 'M 109 81.8 Q 116 83.8 124 82', ch.shade, .5, .45); }
    if(ch.age > 1){ st(g, 'M 86 51.5 Q 100 49.6 114 51.5', ch.shade, .6, .5); st(g, 'M 89 55.5 Q 100 54 111 55.5', ch.shade, .55, .4); }
    if(ch.age > 1.6){ st(g, 'M 84 118 Q 86 122 90 124', ch.shade, .6, .5); st(g, 'M 116 118 Q 114 122 110 124', ch.shade, .6, .5); } });
  st(g, FACE, ch.line, .9);
  const nw = ch.nose;
  st(g, `M ${100 - 6.8 * nw} 93.6 C ${100 - 10 * nw} 95.6 ${100 - 9.4 * nw} 99.6 ${100 - 5.4 * nw} 99.8`, '#7a4632', .8);
  st(g, `M ${100 + 6.8 * nw} 93.6 C ${100 + 10 * nw} 95.6 ${100 + 9.4 * nw} 99.6 ${100 + 5.4 * nw} 99.8`, '#7a4632', .8);
  el(g, 100 - 4.4 * nw, 98, 2.1 * nw, 1.1, '#5e3526', 1, -.25); el(g, 100 + 4.4 * nw, 98, 2.1 * nw, 1.1, '#5e3526', 1, .25);
  drawMouth(g, ch, e);
  drawBrow(g, ch, 0, e); drawBrow(g, ch, 1, e);
  drawEye(g, ch, 0, e); drawEye(g, ch, 1, e);
  if(ch.glasses){ const gc = ch.glasses === true ? '#2a2320' : ch.glasses;
    for(const cx of [83.8, 116.2]){ st(g, rr(cx - 12.5, 68, 25, 16.5, 5), gc, 1.5); st(g, `M ${cx - 8} 71 L ${cx - 4.5} 74.8`, '#fff', .8, .45); }
    st(g, 'M 96.3 74.8 Q 100 72.6 103.7 74.8', gc, 1.3); st(g, 'M 71.3 73.5 L 60.5 72.6', gc, 1.2); st(g, 'M 128.7 73.5 L 139.5 72.6', gc, 1.2); }
  for(const p of Hs.front || []){ fl(g, p, ch.hair); st(g, p, ink, .8); }
  (Hs.shine || []).forEach(p => fl(g, p, ch.hairShine || '#3a2c2a'));
  (Hs.grey || []).forEach(p => st(g, p, '#9a8f88', .5, .85));
  (Hs.temples || []).forEach(p => fl(g, p, '#8e8680'));
  if(Hs.part) st(g, Hs.part, ch.hairLine || '#6e5a50', .7, .8);
  if(Hs.curlsFront){ for(const [x, y, r] of Hs.curlsFront) el(g, x, y, r + .8, r + .8, ink); for(const [x, y, r] of Hs.curlsFront) el(g, x, y, r, r, ch.hair);
    for(const [x, y, r] of Hs.curlsFront) st(g, `M ${x - r * .5} ${y - r * .1} q ${r * .4} ${-r * .5} ${r * .8} 0`, ch.hairShine || '#3a2c2a', .7, .8); }
  if(Hs.after) Hs.after(g, ch); }

// ====================== ARMS AND HANDS ======================
// Everything is drawn twice: a dark underlay a little fatter than the shape, then the fill on top.
// Pieces that touch merge into one silhouette with a single outline, the way an inked drawing does.
const OL = 1.3;
function limb(g, a, b, w1, w2, col, pass, flat){ const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1, nx = -dy / d, ny = dx / d, o = pass ? 0 : OL;
  const h1 = w1 / 2 + o, h2 = w2 / 2 + o; g.fillStyle = pass ? col : '#1c100b';
  g.beginPath(); g.moveTo(a[0] + nx * h1, a[1] + ny * h1); g.lineTo(b[0] + nx * h2, b[1] + ny * h2); g.lineTo(b[0] - nx * h2, b[1] - ny * h2); g.lineTo(a[0] - nx * h1, a[1] - ny * h1); g.fill();
  // flat: square both ends. 'b': round at a, square hem at b
  if(flat === true) return; g.beginPath(); g.arc(a[0], a[1], h1, 0, 6.2832); if(flat !== 'b') g.arc(b[0], b[1], h2, 0, 6.2832); g.fill(); }
// paint a list of limb pieces as one silhouette: every underlay first, then every fill, so joints never show a ring
function body(g, pieces, owner){ g.save();
  // no outline where an arm crosses its own body: the sleeve and the torso are one piece of cloth
  if(owner && R.place[owner]){ const pl = R.place[owner], ch = dressed(owner), cp = new Path2D(); cp.rect(-W, -H, 3 * W, 3 * H); const k = pl.s;
    cp.addPath(bodyPath(ch, pl.torso), new DOMMatrix([k, 0, 0, k, pl.x - 100 * k, pl.y])); g.clip(cp, 'evenodd'); }
  for(const q of pieces) limb(g, q[0], q[1], q[2], q[3], 0, 0, q[5]); g.restore();
  for(const q of pieces) limb(g, q[0], q[1], q[2], q[3], q[4], 1, q[5]); }
// wrist at x,y; fingers point along ang; thumb on the upper side unless flip. curl 0 = flat, 1 = fist.
function hand(g, id, x, y, ang, L, W, curl, flip, thumbTuck){
  const ch = CAST[id]; g.save(); g.translate(x, y); g.rotate(ang); if(flip) g.scale(1, -1);
  const fw = W / 4, knX = L * .5, len = [.4, .46, .43, .34].map(v => v * L * (1 - curl * .62)), ys = [-.375, -.125, .125, .375].map(v => v * W);
  const pieces = [[[-L * .04, 0], [knX - fw * .45, 0], W * .72, W * .98, ch.skin]];
  for(let k = 0; k < 4; k++) pieces.push([[knX - fw * .6, ys[k]], [knX + len[k] - fw * .4, ys[k]], fw * 1.06, fw * .84, k === 3 ? ch.shade : ch.skin]);
  const thumb = thumbTuck ? [[L * .08, -W * .4], [L * .5, -W * .5], W * .27, W * .22, ch.skin] : [[L * .12, -W * .32], [L * .46, -W * .6], W * .28, W * .22, ch.skin];
  body(g, [thumb]); body(g, pieces);
  g.save(); g.beginPath(); g.rect(-L, W * .16, knX + L - fw * .2, W); g.clip(); limb(g, [-L * .04, 0], [knX - fw * .45, 0], W * .72, W * .98, ch.shade, 1); g.restore();
  for(let k = 0; k < 3; k++){ const yy = (ys[k] + ys[k + 1]) / 2, tip = knX + Math.min(len[k], len[k + 1]) - fw * .1;
    st(g, `M ${knX - fw * .2} ${yy} L ${tip} ${yy}`, ch.line, .9, .7); }
  if(curl > .5){ for(let k = 0; k < 4; k++) st(g, `M ${knX + len[k] * .55} ${ys[k] - fw * .38} L ${knX + len[k] * .55} ${ys[k] + fw * .38}`, ch.line, .7, .45); }
  for(let k = 0; k < 4; k++) el(g, knX - fw * .2, ys[k] - fw * .05, fw * .18, fw * .1, ch.line, .22);
  st(g, `M ${L * .08} ${-W * .06} Q ${L * .24} ${W * .02} ${L * .36} ${-W * .02}`, ch.line, .7, .3);
  g.restore(); }
// shoulder to elbow to wrist, painted as one silhouette. reach: 'wrist' | 'elbow' | 'roll' | 'short'
function arm(g, id, side, sh, el_, wr, W, reach){
  const ch = dressed(id), c0 = ch.clothes, col = c0.sleeve || c0.col, shade = c0.sleeveShade || c0.shade, c = side > 0 ? shade : col;
  const lerp = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]; reach = reach || c0.reach || 'wrist';
  if(reach === 'wrist'){ body(g, [[sh, el_, W * 1.34, W * 1.18, c], [el_, lerp(el_, wr, .9), W * 1.18, W * 1.0, c]], id);
    body(g, [[lerp(el_, wr, .8), lerp(el_, wr, .98), W * 1.02, W * 1.0, c0.cuff || shade, true]]); return; }
  if(reach === 'short'){ const sk = side > 0 ? ch.shade : ch.skin; body(g, [[lerp(sh, el_, .3), el_, W * 1.16, W * 1.04, sk], [el_, wr, W * 1.02, W * .78, sk]]);
    body(g, [[sh, lerp(sh, el_, .55), W * 1.36, W * 1.3, c, 'b']], id); return; }
  body(g, [[el_, wr, W * 1.02, W * .78, side > 0 ? ch.shade : ch.skin]]);
  body(g, [[sh, el_, W * 1.34, W * 1.2, c], [el_, lerp(el_, wr, .1), W * 1.2, W * 1.16, c, true]], id);
  if(reach === 'roll') body(g, [[lerp(el_, wr, .04), lerp(el_, wr, .24), W * 1.22, W * 1.16, side > 0 ? (c0.rollShade || shade) : (c0.roll || col), true]]); }

// ====================== RUNTIME ======================
const ROOMS = {};
const S = {cur:{}, target:{}, blink:{}, talkUntil:{}, speaker:null, last:null, flags:{}, motion:{}, room:null, t:0, dt:0};
const R = { place:{}, caches:{}, g:null, t:0,
  // cache a static layer for the current room; rebuilt on the next visit if the room was dropped
  cached(key, fn){ const k = S.room + ':' + key; let c = R.caches[k];
    if(!c){ c = document.createElement('canvas'); c.width = W * K; c.height = H * K; const g = c.getContext('2d'); base(g); fn(g); R.caches[k] = c; }
    const g = R.g; g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(c, 0, 0); g.restore(); },
  flag(id){ return !!S.flags[id]; },
  motion(key){ const m = S.motion[key]; return m == null ? -1 : R.t - m; },
  speaking(id){ return S.speaker === id; },
  // draw a person at their room placement. over: {x,y,s,torso,expr,flip}
  char(id, over){ const pl = {...R.place[id], ...(over || {})}, ch = CAST[id]; if(!ch) return;
    const e = face(id, pl); const g = R.g; g.save();
    if(S.speaker && S.speaker !== id && !pl.noDim) g.filter = 'brightness(.84) saturate(.9)';
    const breathe = calm ? 0 : Math.sin(R.t * 1.5 + pl.x) * 1.2 * pl.s / 1.5;
    g.translate(pl.x + (pl.flip ? 100 * pl.s : -100 * pl.s), pl.y + breathe); g.scale(pl.flip ? -pl.s : pl.s, pl.s);
    if(pl.tilt) { g.translate(100, 150); g.rotate(pl.tilt); g.translate(-100, -150); }
    drawHead(g, id, e, pl.torso); g.restore(); },
  dim(id){ R.g.filter = S.speaker && S.speaker !== id ? 'brightness(.84) saturate(.9)' : 'none'; },
  undim(){ R.g.filter = 'none'; },
};
function face(id, pl){
  // ease every number toward the target expression, then layer blink, talk and gaze on top
  const cur = S.cur[id] || (S.cur[id] = {...EX.neutral}), tg = EX[S.target[id] || pl.expr || 'neutral'] || EX.neutral;
  const bl = S.blink[id] || (S.blink[id] = {next:R.t + 1 + hash(id.length + id.charCodeAt(0)) * 3, until:0});
  const k = 1 - Math.exp(-S.dt * 8); for(const key of KEYS) cur[key] += (tg[key] - cur[key]) * k;
  if(R.t > bl.next){ bl.until = R.t + .13; bl.next = R.t + 2.6 + hash(R.t + id.charCodeAt(0)) * 3; }
  const e = {...cur, open:0}; if(R.t < bl.until && tg.lid < .9) e.lid = 1;
  if(S.talkUntil[id] && R.t < S.talkUntil[id]) e.open = .2 + .45 * Math.abs(Math.sin(R.t * 13));
  // listeners look at whoever is talking; the talker looks back at whoever spoke before them
  const look = S.speaker && S.speaker !== id ? S.speaker : S.speaker === id ? S.last : null;
  if(look && R.place[look] && !R.place[look].hidden && tg.gy < 1.2 && !pl.fixedGaze){ const d = (R.place[look].x - pl.x) * (pl.flip ? -1 : 1);
    e.gx = Math.max(-2.4, Math.min(2.4, d / 120)); }
  if(pl.gx != null) e.gx = pl.gx; if(pl.gy != null) e.gy = pl.gy;
  return e; }

let cv = null, ctx = null, last = 0, lastDraw = 0, clock = 0;
// lettering is baked into cached layers, so drop them once the web fonts have arrived
if(document.fonts && document.fonts.ready) document.fonts.ready.then(() => { for(const k in R.caches) delete R.caches[k]; });
const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function ensure(){ if(cv) return; cv = document.createElement('canvas'); cv.id = 'ill'; cv.width = W * K; cv.height = H * K;
  cv.style.cssText = 'position:absolute;left:0;top:0;width:1280px;height:720px;display:block'; ctx = cv.getContext('2d'); R.g = ctx; requestAnimationFrame(frame); }
function frame(now){ requestAnimationFrame(frame); if(!S.room) return;
  // the room runs on its own clock, which never jumps more than a tenth of a second: background tabs and slow laptops just slow down
  const t = now / 1000; if(now - lastDraw < 30) return; S.dt = Math.max(0, Math.min(.1, t - (last || t))); last = t; lastDraw = now; clock += S.dt;
  R.t = calm ? clock * .25 : clock; const room = ROOMS[S.room]; R.place = room.place || {};
  for(const id in R.place) if(R.place[id].flag) R.place[id].hidden = !S.flags[R.place[id].flag];
  base(ctx); ctx.filter = 'none'; ctx.globalAlpha = 1; room.paint(ctx, R.t, R); }
function show(which){ if(!ROOMS[which]){ S.room = null; return; } ensure();
  const k2 = Math.max(DPR, Math.min(2, (ROOMS[which].res || 1) * DPR));
  if(k2 !== K){ K = k2; cv.width = W * K; cv.height = H * K; for(const k in R.caches) delete R.caches[k]; }
  if(S.room !== which){ for(const k in R.caches) if(!k.startsWith(which + ':')) delete R.caches[k]; S.speaker = null; S.last = null; }
  S.room = which; const layer = document.getElementById(which); if(layer && cv.parentNode !== layer) layer.insertBefore(cv, layer.firstChild); lastDraw = 0; }
function expr(who, name){ S.target[who] = name; }
function focus(who){ if(who && who !== S.speaker){ S.last = S.speaker; } S.speaker = who || null; }
function talk(who, ms){ S.talkUntil[who] = R.t + Math.min(2.6, ms / 1000); }
function motion(who, names){ for(const n of names) S.motion[who + '-' + n] = R.t; }
function flag(id, on){ S.flags[id] = !!on; }
function reset(){ S.target = {}; S.cur = {}; S.flags = {}; S.motion = {}; S.speaker = null; S.last = null; S.talkUntil = {}; }
// dialogue portraits, painted from the same rig so the card always matches the room
function portraits(){ const css = [];
  for(const id in CAST){ const ch = CAST[id]; if(ch.noPortrait) continue; const c = document.createElement('canvas'); c.width = c.height = 144; const g = c.getContext('2d');
    g.fillStyle = ch.avBg || '#c9a088'; g.fillRect(0, 0, 144, 144); const s = 1.28; g.setTransform(s, 0, 0, s, 72 - 100 * s, 78 - 80 * s);
    drawHead(g, id, {...EX.neutral, ...(ch.portraitExpr ? EX[ch.portraitExpr] : {}), open:0}, false);
    css.push(`.av.port.av-${id}{background-image:url(${c.toDataURL()})!important;background-size:cover!important;background-position:center!important}`); }
  const tag = document.createElement('style'); tag.textContent = css.join('\n'); document.head.appendChild(tag); }

return { W, H, DPR, P, hash, base, fl, st, el, clip, rr, rgrad, lgrad, text, limb, body, hand, arm, drawHead, EX,
  cast(id, def){ CAST[id] = def; }, hair(id, def){ HAIR[id] = def; }, room(id, def){ ROOMS[id] = def; },
  has(id){ return !!ROOMS[id]; }, spot(id, n){ const r = ROOMS[id], h = r && r.hot && r.hot[n]; return h ? {x:h[0], y:h[1]} : null; }, CAST, HAIR, ROOMS, S, R,
  show, expr, focus, talk, motion, flag, reset, portraits };
})();

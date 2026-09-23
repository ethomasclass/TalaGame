// ====================== THE CAST ======================
// One rig, many people. Proportions are real; colour is flat with one hard shadow per material.
(() => { const P = ILL.P;
// ---------- the family ----------
ILL.cast('tala', { avBg:'#e0a49f',
  skin:'#c68a66', shade:'#a26546', neck:'#b87c5a', line:'#5b3424', lips:['#98504a', '#ad6158'], iris:'#3b2418', brow:'#23150f', hair:'#1b1413',
  face:{cw:38, jw:26, jy:115, cy:129, chw:6}, eyeS:1, nose:1, mouth:{y:109.6, w:12.5, uh:2.6, lh:5.6}, brows:{ti:2.6, to:1.0, peak:60.6},
  neckW:18, hairStyle:'tala', ears:false, age:0,
  clothes:{col:'#2f55a5', shade:'#22407f', line:'#14244a', neck:'crew', trim:'#27478f', reach:'wrist'},
  outfits:{ apron:{col:'#2f55a5', shade:'#22407f', line:'#14244a', neck:'crew', trim:'#27478f', reach:'wrist', apron:['#f3eee2', '#d9d0bd']},
            coat:{col:'#6b4a3a', shade:'#533629', line:'#2a1a12', neck:'collar', under:'#2f55a5', trim:'#7a5646', reach:'wrist'} } });
ILL.cast('ma', { avBg:'#b8604f',
  skin:'#c08058', shade:'#9a5e40', neck:'#b27550', line:'#56301f', lips:['#8e4a44', '#a0564d'], iris:'#34201a', brow:'#2a1a14', hair:'#211715',
  face:{cw:39.5, jw:29, jy:114, cy:128, chw:8}, eyeS:.94, nose:1.05, mouth:{y:110, w:12, uh:2.1, lh:4.6}, brows:{ti:2.0, to:.8, peak:60},
  neckW:19, hairStyle:'ma', ears:true, earring:true, lidCrease:true, age:1,
  clothes:{col:'#a33b34', shade:'#7e2a26', line:'#4e1a17', neck:'vneck', trim:'#8e3030', cross:true, reach:'elbow'},
  outfits:{ apron:{col:'#a33b34', shade:'#7e2a26', line:'#4e1a17', neck:'vneck', trim:'#8e3030', cross:true, reach:'elbow', apron:['#2a2b33', '#1c1d24']},
            coat:{col:'#3b4a5e', shade:'#2c384a', line:'#161d28', neck:'collar', under:'#a33b34', trim:'#465870', reach:'wrist'} } });
ILL.cast('pa', { avBg:'#4f7280',
  skin:'#b67a55', shade:'#8f5a3d', neck:'#a86f4c', line:'#4e2c1d', lips:['#8a4b42', '#96554a'], iris:'#2e1d16', brow:'#1f1614', hair:'#2a2220',
  face:{cw:40, jw:33, jy:116, cy:132, chw:12}, eyeS:.95, nose:1.2, mouth:{y:112, w:13.5, uh:2.2, lh:4.2}, brows:{ti:3.2, to:1.6, peak:62},
  neckW:22, hairStyle:'pa', ears:true, glasses:true, stubble:true, age:1.4,
  clothes:{col:'#e6dcc6', shade:'#c4b79c', line:'#7d6f58', neck:'collar', wide:true, reach:'roll', roll:'#d8ccb2', rollShade:'#bfb296'},
  outfits:{ apron:{col:'#7c8791', shade:'#626c76', line:'#2e343a', neck:'tee', wide:true, reach:'short', apron:['#f3eee2', '#d9d0bd']},
            coat:{col:'#4a4038', shade:'#382f29', line:'#1a1512', neck:'collar', under:'#e6dcc6', wide:true, trim:'#574b42', reach:'wrist'} } });

ILL.hair('tala', { back:P('M 100 16 C 138 16 154 44 154 80 C 154 112 152 142 158 178 C 160 192 158 204 152 208 L 48 208 C 42 204 40 192 42 178 C 48 142 46 112 46 80 C 46 44 62 16 100 16 Z'),
  front:[P('M 55 52 C 53 84 57 104 59 124 C 61 146 57 166 51 190 C 60 189 68 171 70 150 C 72 128 68 108 67 88 C 66 76 66 64 67 54 Z'),
    P('M 145 52 C 147 84 143 104 141 124 C 139 146 143 166 149 190 C 140 189 132 171 130 150 C 128 128 132 108 133 88 C 134 76 134 64 133 54 Z'),
    P('M 100 15 C 129 15 147 33 147 62 C 144 63 141 63.4 138 63 C 132 50 122 43 110 41 C 100 40 94 42 90 30 C 85 42 75 50 66 62 C 62 61.6 58.4 61 55 60 C 55 34 71 15 100 15 Z')],
  shine:['M 104 20 C 118 20 130 28 136 38 C 128 30 116 25 104 23 Z', 'M 58.5 84 C 57.5 96 59.5 108 61.5 118 C 60.5 108 59.5 96 60.5 84 Z',
    'M 141.5 84 C 142.5 96 140.5 108 138.5 118 C 139.5 108 140.5 96 139.5 84 Z'] });
ILL.hair('ma', { back:P('M 56 58 C 49 80 51 104 58 120 C 64 128 136 128 142 120 C 149 104 151 80 144 58 Z'), bun:[132, 118, 10.5],
  front:[P('M 100 15 C 128 15 145 31 146 56 C 146 64 145 70 143 76 L 140.5 76 C 139 66 136 56 130 50 C 122 44 112 42 104 42 C 99 41 95 37 93 31 C 90 38 82 44 72 48 C 66 52 62 60 60 68 C 59.5 71 59.3 74 59.2 76 L 56.5 76 C 55 70 54.5 62 55 56 C 56 30 72 15 100 15 Z')],
  shine:['M 106 19 C 122 20 134 28 139 40 C 131 31 119 25 106 22 Z'],
  grey:['M 104 21 Q 122 25 134 41', 'M 78 23 Q 69 31 64 44', 'M 112 18 Q 128 22 140 36'] });
ILL.hair('pa', { front:[P('M 100 19 C 127 19 142 33 143 56 C 143 63 142 68 141 73 L 138.5 70 C 137 60 133 53 126 49 C 118 45 108 44 98 44.5 C 86 45 74 48 66 56 C 63 60 61.5 65 61 70 L 58.5 73 C 57.5 68 57 62 57 56 C 58 33 73 19 100 19 Z')],
  shine:['M 94 22 C 110 21 124 26 132 34 C 122 28 108 25 94 25 Z'],
  temples:['M 58.5 73 C 57.5 68 57 62 57.5 58 L 63.5 60 C 62 64 61.5 67 61 70 Z', 'M 141.5 73 C 142.5 68 143 62 142.5 58 L 136.5 60 C 138 64 138.5 67 139 70 Z'],
  part:'M 81 22 Q 79 32 80 44' });
})();

// ---------- school ----------
(() => { const P = ILL.P;
ILL.cast('hannah', { avBg:'#7fa58a',
  skin:'#efc6a5', shade:'#d6a081', neck:'#e4b793', line:'#8a5040', lips:['#c47468', '#d38679'], iris:'#5d7a48', brow:'#8a4a2a', hair:'#a8532e', hairShine:'#c46a3e', hairLine:'#6a3018',
  face:{cw:37, jw:27, jy:114, cy:128, chw:7}, eyeS:1, nose:.92, mouth:{y:109.4, w:12, uh:2.4, lh:5.2}, brows:{ti:2.2, to:.9, peak:60.4},
  neckW:17.5, hairStyle:'hannah', ears:false, age:0, freckles:'#b5704e', blush:'#e8927e',
  clothes:{col:'#5b8a5e', shade:'#466f49', line:'#23391f', neck:'crew', trim:'#4d7a50', reach:'wrist'},
  outfits:{ coat:{col:'#b8a27a', shade:'#9a855f', line:'#4a3c26', neck:'collar', under:'#5b8a5e', trim:'#c7b288', reach:'wrist'} } });
ILL.hair('hannah', {
  back:P('M 100 17 C 140 17 156 44 156 80 C 156 110 158 138 162 160 C 150 170 50 170 38 160 C 42 138 44 110 44 80 C 44 44 60 17 100 17 Z'),
  front:[P('M 53 56 C 50 90 52 118 50 140 C 48 152 44 160 39 165 C 54 165 62 150 64 130 C 66 110 62 88 61 62 Z'),
    P('M 147 56 C 150 90 148 118 150 140 C 152 152 156 160 161 165 C 146 165 138 150 136 130 C 134 110 138 88 139 62 Z'),
    P('M 84 17 C 60 20 51 40 52 64 C 53 68 54 71 56 73 C 59 57 66 46 78 42 C 98 36 122 44 136 58 C 142 64 145 70 146 76 C 147.4 72 148.4 68 148.6 64 C 150 36 128 15 84 17 Z')],
  shine:['M 96 22 C 116 21 132 30 140 42 C 130 33 114 26 96 25 Z', 'M 55 86 C 54 100 55 114 54 126 C 56 114 57 100 57 86 Z'],
  part:'M 84 18 Q 86 26 90 34' });
})();

// ---------- the kitchen ----------
(() => { const P = ILL.P;
ILL.cast('ando', { avBg:'#6f8f7a',
  skin:'#b97c55', shade:'#96603f', neck:'#ab7150', line:'#4e2c1d', lips:['#8e4d44', '#9c5a4f'], iris:'#2e1d16', brow:'#1b1311', hair:'#161111', hairShine:'#342826',
  face:{cw:36.5, jw:27, jy:117, cy:132, chw:8}, eyeS:.98, nose:1.05, mouth:{y:112, w:12.5, uh:2.2, lh:4.4}, brows:{ti:2.8, to:1.2, peak:61.6},
  neckW:18.5, hairStyle:'ando', ears:true, age:0,
  clothes:{col:'#d9d5cc', shade:'#b9b4a8', line:'#5e5a50', neck:'tee', reach:'short', apron:['#f3eee2', '#d9d0bd']},
  outfits:{ coat:{col:'#2e3a4a', shade:'#232d3a', line:'#10151c', neck:'collar', under:'#d9d5cc', trim:'#394a5e', reach:'wrist'} } });
ILL.hair('ando', {
  front:[P('M 100 18 C 128 18 144 32 145 56 L 143 70 C 141 61 138 55 133 51 Q 130 56 126 56 Q 123 49 118 49 Q 115 55 111 55 Q 107 47 101 47 Q 98 53 94 53 Q 90 46 84 47 Q 81 53 77 53 Q 73 49 69 51 C 64 55 60 62 58.5 70 L 56 58 C 57 32 72 18 100 18 Z')],
  shine:['M 92 22 C 110 20 126 26 134 36 C 124 30 108 25 92 25 Z'] });

// ---------- the counter ----------
ILL.cast('clerk', { avBg:'#6b86a8',
  skin:'#c48a60', shade:'#a06a45', neck:'#b67d56', line:'#56301f', lips:['#935046', '#a15c51'], iris:'#2e1d16', brow:'#1b1311', hair:'#1a1413',
  face:{cw:39.5, jw:31, jy:115, cy:129, chw:10}, eyeS:.96, nose:1.1, mouth:{y:111, w:13, uh:2.2, lh:4.6}, brows:{ti:2.8, to:1.3, peak:61.4},
  neckW:20.5, hairStyle:'clerk', ears:true, age:.2,
  clothes:{col:'#3f6fa8', shade:'#315a8a', line:'#16283f', neck:'polo', lanyard:true, reach:'short'} });
ILL.hair('clerk', {
  front:[P('M 100 18 C 128 18 144 33 144 56 C 144 62 143 68 142 72 L 139.5 70 C 138 60 134 53 126 48 C 112 42 96 45 84 40 C 78 46 70 50 64 58 C 62 62 61.2 66 60.6 71 L 58 72 C 57 66 56.5 60 56.6 55 C 58 32 73 18 100 18 Z')],
  shine:['M 98 21 C 114 21 128 27 135 36 C 124 29 110 25 98 24 Z'], part:'M 84 22 Q 84 32 84 40' });
})();

// ---------- the parish ----------
(() => { const P = ILL.P;
// Tita Cora's perm: two rings of curls around the crown, the inner ring drawn over the forehead
const ring = (cx, cy, rx, ry, a0, a1, n, r) => Array.from({length:n}, (_, k) => { const a = a0 + (a1 - a0) * k / (n - 1); return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry, r * (.9 + ((k * 7) % 3) * .08)]; });
ILL.cast('tita', { avBg:'#c87c8e', portraitExpr:'warm',
  skin:'#c5875d', shade:'#a1673f', neck:'#b87a52', line:'#56301f', lips:['#a0484e', '#b0565a'], iris:'#2e1d16', brow:'#3a2c28', hair:'#77706c', hairShine:'#a39b95',
  face:{cw:41, jw:32, jy:115, cy:129, chw:11}, eyeS:.92, nose:1.12, mouth:{y:110.6, w:13, uh:2.3, lh:4.8}, brows:{ti:1.9, to:.8, peak:60.6},
  neckW:20, hairStyle:'tita', ears:true, earring:'#e7c9d6', lidCrease:true, age:2, blush:'#d8746a', glasses:'#9a2a36',
  clothes:{col:'#d6798f', shade:'#b85f76', line:'#5e2434', neck:'vneck', trim:'#c86a82', brooch:true, reach:'elbow'} });
ILL.hair('tita', { back:P('M 100 14 C 140 14 158 40 157 74 C 157 86 153 94 149 97 L 51 97 C 47 94 43 86 43 74 C 42 40 60 14 100 14 Z'),
  curls:[...ring(100, 62, 53, 48, Math.PI * .92, Math.PI * 2.08, 17, 8.4), [47, 90, 7.6], [153, 90, 7.6], [50, 100, 6.4], [150, 100, 6.4]],
  curlsFront:[...ring(100, 50, 40, 16, Math.PI * 1.04, Math.PI * 1.96, 9, 6.8), ...ring(100, 42, 28, 10, Math.PI * 1.1, Math.PI * 1.9, 5, 6.2)] });

ILL.cast('customer', { avBg:'#a39cc0',
  skin:'#f0caa9', shade:'#d6a585', neck:'#e5bc98', line:'#8a5040', lips:['#b8686a', '#c77a7a'], iris:'#4a6a8a', brow:'#9a7a4a', hair:'#d9b56a', hairShine:'#ecd08e', hairLine:'#9a7a3a',
  face:{cw:38, jw:28, jy:114, cy:128, chw:8}, eyeS:.96, nose:.95, mouth:{y:110, w:12, uh:2.2, lh:4.8}, brows:{ti:1.8, to:.8, peak:60.6},
  neckW:18, hairStyle:'customer', ears:true, earring:'#d8d8e0', age:.8,
  clothes:{col:'#6d6a8a', shade:'#58556f', line:'#26243a', neck:'crew', reach:'wrist'} });
ILL.hair('customer', { back:P('M 56 58 C 49 80 51 104 58 120 C 64 128 136 128 142 120 C 149 104 151 80 144 58 Z'), bun:[100, 18, 13],
  front:[P('M 100 17 C 128 17 145 32 146 56 C 146 64 145 70 143 76 L 140.5 76 C 139 64 134 54 126 48 C 116 42 100 42 86 44 C 76 46 66 54 62 64 C 60 68 59.4 72 59.2 76 L 56.5 76 C 55 70 54.5 62 55 56 C 56 30 72 17 100 17 Z')],
  shine:['M 104 21 C 122 22 134 30 139 42 C 131 33 118 27 104 24 Z'] });

// ---------- the block ----------
ILL.cast('mangboy', { avBg:'#c9a25a',
  skin:'#b0744d', shade:'#8c5536', neck:'#a36b47', line:'#4e2c1d', lips:['#8a4b42', '#96554a'], iris:'#2e1d16', brow:'#8e8680', hair:'#9e978f',
  face:{cw:42, jw:34, jy:116, cy:131, chw:13}, eyeS:.9, nose:1.25, mouth:{y:112, w:13.5, uh:2.0, lh:4.0}, brows:{ti:2.6, to:1.4, peak:62},
  neckW:23, hairStyle:'mangboy', ears:true, age:2, mustache:'#6e6862',
  clothes:{col:'#f1efe8', shade:'#d6d2c6', line:'#7a766a', neck:'tee', wide:true, reach:'short'} });
ILL.hair('mangboy', { front:[P('M 62 46 C 58 54 56.4 64 57.4 76 L 61.6 77 C 61 68 62 60 65 52 Z'), P('M 138 46 C 142 54 143.6 64 142.6 76 L 138.4 77 C 139 68 138 60 135 52 Z')],
  after(g, ch){ ILL.st(g, 'M 76 36 Q 100 28 124 36', ch.shade, .8, .5); } });
ILL.cast('ocampo', { avBg:'#8e9bc0', portraitExpr:'kind',
  skin:'#c38a63', shade:'#9f6947', neck:'#b57c57', line:'#56301f', lips:['#9a4a52', '#a8585e'], iris:'#2e1d16', brow:'#4a3a34', hair:'#3a3030',
  face:{cw:40, jw:31, jy:114, cy:128, chw:10}, eyeS:.9, nose:1.08, mouth:{y:110.6, w:12.5, uh:2.0, lh:4.4}, brows:{ti:1.6, to:.7, peak:60.8},
  neckW:19.5, hairStyle:'ocampo', ears:true, earring:true, lidCrease:true, age:2.2, blush:'#d8746a',
  clothes:{col:'#e8e3ea', shade:'#cbc3cf', line:'#5a5260', neck:'collar', under:'#e8e3ea', reach:'wrist'} });
// under the dryer: curlers in a row across the crown, and a net over them
ILL.hair('ocampo', { back:P('M 50 60 C 44 30 70 10 100 10 C 130 10 156 30 150 60 C 146 70 54 70 50 60 Z'),
  after(g, ch){ for(let k = 0; k < 5; k++){ const x = 64 + k * 18; ILL.el(g, x, 30 - Math.sin(k / 4 * Math.PI) * 8, 8, 6, '#e7a3b8'); ILL.st(g, `M ${x - 8} ${30 - Math.sin(k / 4 * Math.PI) * 8} l 16 0`, '#b56f86', .8); }
    ILL.st(g, 'M 50 58 C 46 30 70 12 100 12 C 130 12 154 30 150 58', '#6a5a5a', .9, .6); } });
})();

// ---------- Batangas, on the phone ----------
(() => { const P = ILL.P;
ILL.cast('bea', { avBg:'#e8b86a', portraitExpr:'smile',
  skin:'#b97a52', shade:'#96603f', neck:'#ab7150', line:'#4e2c1d', lips:['#94504a', '#a45c52'], iris:'#2e1d16', brow:'#1b1311', hair:'#161111', hairShine:'#342826',
  face:{cw:37, jw:27, jy:114, cy:128, chw:7}, eyeS:1.02, nose:1, mouth:{y:109.6, w:12.4, uh:2.5, lh:5.4}, brows:{ti:2.4, to:1, peak:60.4},
  neckW:17.5, hairStyle:'bea', ears:false, age:0,
  clothes:{col:'#f4f2ea', shade:'#d8d4c8', line:'#6a665a', neck:'collar', under:'#f4f2ea', trim:'#eceae2', reach:'short'} });
// a chin-length bob with a straight fringe
ILL.hair('bea', { back:P('M 100 16 C 140 16 156 44 156 80 C 156 100 156 118 152 130 L 48 130 C 44 118 44 100 44 80 C 44 44 60 16 100 16 Z'),
  front:[P('M 50 58 C 48 84 50 108 52 130 L 66 130 C 62 108 61 84 64 60 Z'), P('M 150 58 C 152 84 150 108 148 130 L 134 130 C 138 108 139 84 136 60 Z'),
    P('M 100 15 C 130 15 148 32 150 62 C 146 60 140 58 136 58 C 120 55.5 80 55.5 64 58 C 60 58 54 60 50 62 C 52 32 70 15 100 15 Z')],
  shine:['M 96 21 C 116 20 132 28 140 40 C 130 32 114 25 96 24 Z'] });
})();

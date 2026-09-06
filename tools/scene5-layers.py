"""Scene 5 layers: the parish hall, the dawn exterior (walk, wish, sunrise), the puto bumbong dressing."""
import re, importlib, sys
sys.path.insert(0, 'tools'); s2 = importlib.import_module('scene2-layers'); prefix_ids = s2.prefix_ids

TITA = r'''
    <!-- ===== TITA BABY : parish food committee. Local 300x380, face centre (150,200). ===== -->
    <linearGradient id="skinT" x1="0.1" y1="0" x2="0.95" y2="1"><stop offset="0%" stop-color="#e6b08c"/><stop offset="55%" stop-color="#d59c78"/><stop offset="100%" stop-color="#b57c5e"/></linearGradient>
    <linearGradient id="hairT" x1="0.2" y1="0" x2="0.9" y2="1"><stop offset="0%" stop-color="#5a5464"/><stop offset="60%" stop-color="#3a3444"/><stop offset="100%" stop-color="#2a2530"/></linearGradient>
    <linearGradient id="blouseT" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0%" stop-color="#d9788c"/><stop offset="100%" stop-color="#a94a62"/></linearGradient>
    <g id="tita-base">
      <g filter="url(#rough)">
        <path d="M -30 470 C -16 372 60 340 122 332 L 178 332 C 240 340 316 372 330 470 Z" fill="url(#blouseT)"/>
        <path d="M -30 470 C -16 372 60 340 122 332 L 140 470 Z" fill="#e8c9a0"/><path d="M 330 470 C 316 372 240 340 178 332 L 160 470 Z" fill="#e8c9a0"/>
        <g fill="#f4e6d2" opacity=".8"><circle cx="70" cy="400" r="6"/><circle cx="100" cy="440" r="5"/><circle cx="220" cy="410" r="6"/><circle cx="250" cy="450" r="5"/><circle cx="60" cy="450" r="4"/></g>
        <circle cx="196" cy="366" r="9" fill="#e8b45c"/><circle cx="196" cy="366" r="4" fill="#c9524a"/>
        <path d="M 120 270 L 180 270 L 184 344 L 116 344 Z" fill="#b57c5e"/>
        <!-- short permed hair, grey-dark, rounder -->
        <path d="M 150 44 C 236 44 276 100 272 176 C 270 220 258 244 246 258 C 232 268 214 262 210 246 L 90 246 C 86 262 68 268 54 258 C 42 244 30 220 28 176 C 24 100 64 44 150 44 Z" fill="url(#hairT)"/>
        <g fill="#6c667a" opacity=".7"><circle cx="70" cy="110" r="14"/><circle cx="110" cy="72" r="14"/><circle cx="160" cy="60" r="14"/><circle cx="210" cy="76" r="14"/><circle cx="244" cy="116" r="14"/><circle cx="256" cy="170" r="12"/><circle cx="44" cy="172" r="12"/></g>
        <circle cx="52" cy="214" r="16" fill="#c4885f"/><circle cx="248" cy="214" r="16" fill="#c4885f"/>
        <path d="M 150 92 C 216 92 250 140 250 204 C 250 274 216 330 150 330 C 84 330 50 274 50 204 C 50 140 84 92 150 92 Z" fill="url(#skinT)"/>
        <path d="M 150 70 C 218 70 252 116 248 168 C 234 138 206 122 176 124 C 168 112 132 112 124 124 C 94 122 66 138 52 168 C 48 116 82 70 150 70 Z" fill="url(#hairT)"/>
      </g>
      <g filter="url(#roughFine)">
        <ellipse cx="98" cy="246" rx="28" ry="15" fill="#c05b58" opacity=".22"/><ellipse cx="202" cy="246" rx="28" ry="15" fill="#c05b58" opacity=".22"/>
        <path d="M 136 232 C 134 244 140 250 150 250 C 160 250 166 244 164 234" stroke="#b07052" stroke-width="4.5" fill="none" stroke-linecap="round"/>
        <g stroke="#b07052" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round"><path d="M 90 270 C 100 280 116 282 126 278"/><path d="M 210 270 C 200 280 184 282 174 278"/></g>
        <!-- glasses on a beaded chain -->
        <g fill="none" stroke="#7a4a2e" stroke-width="4"><rect x="82" y="188" width="60" height="42" rx="14"/><rect x="158" y="188" width="60" height="42" rx="14"/><path d="M 142 208 L 158 208"/><path d="M 82 204 L 52 200"/><path d="M 218 204 L 248 200"/></g>
        <path d="M 52 202 C 40 240 44 300 70 344" stroke="#e8b45c" stroke-width="2.5" fill="none" stroke-dasharray="3 3"/><path d="M 248 202 C 260 240 256 300 230 344" stroke="#e8b45c" stroke-width="2.5" fill="none" stroke-dasharray="3 3"/>
        <g fill="none" stroke="#e8b45c" stroke-width="2.5"><circle cx="48" cy="238" r="7"/><circle cx="252" cy="238" r="7"/></g>
      </g>
    </g>
    <g id="tita-brows-neutral" stroke="#3a3444" stroke-width="6" fill="none" stroke-linecap="round"><path d="M 92 176 C 104 168 124 168 136 174"/><path d="M 164 174 C 176 168 196 168 208 176"/></g>
    <g id="tita-brows-up" stroke="#3a3444" stroke-width="6" fill="none" stroke-linecap="round"><path d="M 92 168 C 104 158 124 158 136 166"/><path d="M 164 166 C 176 158 196 158 208 168"/></g>
    <g id="tita-eyes-open">
      <ellipse cx="112" cy="210" rx="15" ry="11" fill="#fbf3e4"/><ellipse cx="188" cy="210" rx="15" ry="11" fill="#fbf3e4"/>
      <circle cx="112" cy="211" r="9" fill="#1c1430"/><circle cx="188" cy="211" r="9" fill="#1c1430"/>
      <circle cx="116" cy="207" r="3" fill="#fbf3e4"/><circle cx="192" cy="207" r="3" fill="#fbf3e4"/>
    </g>
    <g id="tita-eyes-warm">
      <path d="M 96 212 C 104 202 120 202 128 212 C 120 218 104 218 96 212 Z" fill="#fbf3e4"/><path d="M 172 212 C 180 202 196 202 204 212 C 196 218 180 218 172 212 Z" fill="#fbf3e4"/>
      <ellipse cx="112" cy="211" rx="9" ry="6" fill="#1c1430"/><ellipse cx="188" cy="211" rx="9" ry="6" fill="#1c1430"/>
    </g>
    <g id="tita-mouth-neutral"><path d="M 126 288 C 138 296 162 296 174 288" stroke="#8e3a33" stroke-width="5" fill="none" stroke-linecap="round"/></g>
    <g id="tita-mouth-smile"><path d="M 118 284 C 132 306 168 306 182 282" stroke="#8e3a33" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M 126 288 C 136 300 164 300 174 286 Z" fill="#fbf3e4" opacity=".9"/></g>
    <g id="tita-mouth-talk"><path d="M 128 284 C 140 280 160 280 172 284 C 168 302 132 302 128 284 Z" fill="#7e2f2b"/></g>
    <!-- Hannah, lower half : denim jacket to the hip, jeans, boots, phone in hand. Continues the 280x340 rig. -->
    <linearGradient id="denim" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0%" stop-color="#6f86b0"/><stop offset="100%" stop-color="#3e5178"/></linearGradient>
    <g id="han-lower">
      <g filter="url(#rough)">
        <path d="M 22 400 L 258 400 L 254 500 C 254 512 244 518 232 518 L 48 518 C 36 518 26 512 26 500 Z" fill="url(#denim)"/>
        <path d="M 112 400 L 168 400 L 168 518 L 112 518 Z" fill="#33483d"/>
        <g stroke="#2e3d5c" stroke-width="3" opacity=".6"><path d="M 40 470 L 96 470"/><path d="M 184 470 L 240 470"/><path d="M 40 408 L 40 516"/><path d="M 240 408 L 240 516"/></g>
        <path d="M 62 518 L 128 518 L 124 680 L 70 680 Z" fill="#2b3550"/><path d="M 152 518 L 218 518 L 210 680 L 156 680 Z" fill="#2b3550"/>
        <path d="M 66 680 L 128 680 L 132 706 C 132 714 124 718 112 718 L 66 718 C 58 718 54 710 58 702 Z" fill="#3a2a22"/>
        <path d="M 152 680 L 214 680 L 222 702 C 226 710 222 718 214 718 L 168 718 C 156 718 148 714 148 706 Z" fill="#3a2a22"/>
        <!-- hands + phone, held at the chest -->
        <rect x="118" y="330" width="44" height="72" rx="8" fill="#1c1c20"/><rect x="123" y="336" width="34" height="58" rx="5" fill="#cfe0f6"/>
        <path d="M 100 372 C 96 356 108 348 120 356 L 122 398 C 108 402 98 392 100 372 Z" fill="url(#skinH)"/><path d="M 180 372 C 184 356 172 348 160 356 L 158 398 C 172 402 182 392 180 372 Z" fill="url(#skinH)"/>
      </g>
    </g>
'''

def hall(defs):
    d = defs.replace('  </defs>', TITA + '  </defs>')
    body = r'''
  <defs>
    <linearGradient id="wallP" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0%" stop-color="#efe3c2"/><stop offset="100%" stop-color="#cbb98c"/></linearGradient>
    <linearGradient id="tableP" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f4efe2"/><stop offset="100%" stop-color="#d8cfba"/></linearGradient>
    <radialGradient id="warmP" cx="0.5" cy="0.4" r="0.6"><stop offset="0%" stop-color="#ffd58a" stop-opacity=".55"/><stop offset="100%" stop-color="#f0a85a" stop-opacity="0"/></radialGradient>
    <radialGradient id="coldP" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="#9fb8e8" stop-opacity=".9"/><stop offset="100%" stop-color="#5a6fb0" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#wallP)"/>
  <rect y="0" width="1280" height="30" fill="#b9a982"/>
  <rect width="1280" height="720" fill="url(#warmP)"/>
  <!-- door, far left : cold outside -->
  <g filter="url(#rough)"><rect x="40" y="90" width="230" height="470" fill="#5a4a3a"/><rect x="56" y="106" width="198" height="454" fill="#2b3558"/><rect x="56" y="106" width="198" height="454" fill="url(#coldP)"/></g>
  <g id="hall-hannah" hidden>
    <g transform="translate(58 132) scale(0.62)"><g class="breathe b">
      <use href="#han-lower"/><use href="#han-base"/>
      <g filter="url(#roughFine)"><use id="x-hhan-brows" href="#han-brows-neutral"/><g class="blink b" style="transform-origin:140px 168px"><use id="x-hhan-eyes" href="#han-eyes-open"/></g><use id="x-hhan-mouth" href="#han-mouth-flat"/></g>
    </g></g>
  </g>
  <!-- banner + parol string -->
  <g filter="url(#roughFine)">
    <path d="M 300 70 C 500 110 800 110 1000 70" stroke="#c9524a" stroke-width="4" fill="none"/>
    <g fill="#f4c65a"><path d="M 340 78 L 360 78 L 350 106 Z"/><path d="M 420 92 L 440 92 L 430 120 Z"/><path d="M 500 100 L 520 100 L 510 128 Z"/><path d="M 580 104 L 600 104 L 590 132 Z"/><path d="M 660 106 L 680 106 L 670 134 Z"/><path d="M 740 104 L 760 104 L 750 132 Z"/><path d="M 820 100 L 840 100 L 830 128 Z"/><path d="M 900 92 L 920 92 L 910 120 Z"/></g>
    <rect x="440" y="130" width="440" height="56" rx="6" fill="#c9524a"/><rect x="448" y="138" width="424" height="40" rx="4" fill="#e0685c"/>
  </g>
  <text x="660" y="167" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="600" font-size="26" fill="#fff3d6" letter-spacing="2">MALIGAYANG PASKO</text>
  <g transform="translate(1100 150) scale(.55)"><circle r="86" fill="#ffd27a" opacity=".45" filter="url(#mid)"/><g filter="url(#roughFine)"><path d="M 0 -66 L 17 -22 L 63 -20 L 27 9 L 39 54 L 0 28 L -39 54 L -27 9 L -63 -20 L -17 -22 Z" fill="#e0453f"/><path d="M 0 -40 L 10 -14 L 38 -12 L 16 5 L 24 32 L 0 17 L -24 32 L -16 5 L -38 -12 L -10 -14 Z" fill="#f4c65a"/><circle r="12" fill="#fff4d2"/><path d="M -22 40 L -30 96 M -12 44 L -14 98 M 12 44 L 14 98 M 22 40 L 30 96" stroke="#f4c65a" stroke-width="3" stroke-linecap="round"/></g></g>
  <!-- the block, in one room : a row of people behind the far tables, no features needed at this distance -->
  <g filter="url(#rough)" opacity=".92">
    <g transform="translate(320 300)"><path d="M -40 120 C -36 70 -16 56 0 56 C 16 56 36 70 40 120 Z" fill="#6b4a7a"/><circle cx="0" cy="34" r="26" fill="#c4885f"/><path d="M -28 30 C -26 4 26 4 28 30 C 20 16 -20 16 -28 30 Z" fill="#241a38"/></g>
    <g transform="translate(400 296)"><path d="M -42 124 C -38 72 -18 58 0 58 C 18 58 38 72 42 124 Z" fill="#2c6b62"/><circle cx="0" cy="34" r="27" fill="#b8805c"/><path d="M -30 36 C -30 0 30 0 30 36 C 24 12 -24 12 -30 36 Z" fill="#241a38"/></g>
    <g transform="translate(560 304)"><path d="M -38 116 C -34 68 -16 54 0 54 C 16 54 34 68 38 116 Z" fill="#a94a62"/><circle cx="0" cy="32" r="25" fill="#d49a76"/><path d="M -26 28 C -22 2 22 2 26 28 C 18 14 -18 14 -26 28 Z" fill="#3a3444"/></g>
    <g transform="translate(720 300)"><path d="M -42 120 C -38 70 -18 56 0 56 C 18 56 38 70 42 120 Z" fill="#3f5a4c"/><circle cx="0" cy="34" r="27" fill="#c4885f"/><path d="M -30 32 C -28 0 28 0 30 32 C 22 14 -22 14 -30 32 Z" fill="#241a38"/></g>
    <g transform="translate(880 298)"><path d="M -40 122 C -36 72 -16 58 0 58 C 16 58 36 72 40 122 Z" fill="#7e2f2b"/><circle cx="0" cy="34" r="26" fill="#b8805c"/><path d="M -28 38 C -30 2 30 2 28 38 C 22 14 -22 14 -28 38 Z" fill="#5a5464"/></g>
    <g transform="translate(1020 304)"><path d="M -38 116 C -34 68 -16 54 0 54 C 16 54 34 68 38 116 Z" fill="#2748a8"/><circle cx="0" cy="32" r="25" fill="#d49a76"/><path d="M -26 26 C -24 0 24 0 26 26 C 18 12 -18 12 -26 26 Z" fill="#241a38"/></g>
    <g transform="translate(1160 300)"><path d="M -40 120 C -36 70 -16 56 0 56 C 16 56 36 70 40 120 Z" fill="#d9788c"/><circle cx="0" cy="34" r="26" fill="#c4885f"/><path d="M -28 30 C -26 4 26 4 28 30 C 20 16 -20 16 -28 30 Z" fill="#3a3444"/></g>
  </g>
  <g filter="url(#rough)"><rect x="280" y="410" width="1000" height="18" rx="6" fill="url(#tableP)"/><rect x="290" y="428" width="980" height="40" fill="#b9a982"/></g>
  <!-- the family behind the serving table, then the table with the trays -->
  <g id="hall-chars"></g>
  <g filter="url(#rough)">
    <rect x="200" y="556" width="1120" height="30" rx="8" fill="url(#tableP)"/><rect x="200" y="556" width="1120" height="10" fill="#fff" opacity=".6"/>
    <rect x="220" y="586" width="1080" height="140" fill="#c2b28c"/>
    <!-- tray of puto bumbong on banana leaf -->
    <rect x="260" y="548" width="300" height="36" rx="6" fill="#8fae87"/><rect x="266" y="552" width="288" height="28" rx="4" fill="#4f8a4c"/>
    <g fill="#5a3a7c"><rect x="280" y="540" width="70" height="18" rx="9"/><rect x="360" y="538" width="70" height="18" rx="9"/><rect x="440" y="540" width="70" height="18" rx="9"/><rect x="320" y="556" width="70" height="18" rx="9"/><rect x="400" y="558" width="70" height="18" rx="9"/></g>
    <g fill="#f7f1e2" opacity=".9"><circle cx="300" cy="546" r="3"/><circle cx="380" cy="544" r="3"/><circle cx="460" cy="546" r="3"/><circle cx="340" cy="562" r="3"/><circle cx="420" cy="564" r="3"/></g>
    <!-- bibingka, rounds on leaf -->
    <rect x="900" y="548" width="300" height="36" rx="6" fill="#8fae87"/>
    <g fill="#e8c27a"><circle cx="950" cy="560" r="22"/><circle cx="1010" cy="558" r="22"/><circle cx="1070" cy="560" r="22"/><circle cx="1130" cy="558" r="22"/></g>
    <g fill="#e8892b"><circle cx="944" cy="556" r="6"/><circle cx="1016" cy="554" r="6"/><circle cx="1064" cy="556" r="6"/><circle cx="1136" cy="554" r="6"/></g>
    <g fill="#f7f1e2" opacity=".8"><circle cx="958" cy="566" r="4"/><circle cx="1002" cy="564" r="4"/><circle cx="1078" cy="566" r="4"/><circle cx="1124" cy="564" r="4"/></g>
    <!-- the basket -->
    <g id="hall-basket" hidden><ellipse cx="740" cy="576" rx="70" ry="22" fill="#000" opacity=".2"/><path d="M 680 540 C 680 520 800 520 800 540 L 792 576 C 792 588 688 588 688 576 Z" fill="#a8743e"/><path d="M 680 540 C 680 520 800 520 800 540 C 760 548 720 548 680 540 Z" fill="#8a5a2c"/>
      <g stroke="#6b4420" stroke-width="2" opacity=".6"><path d="M 690 552 L 790 552"/><path d="M 692 564 L 788 564"/></g>
      <g fill="#8fae87"><rect x="706" y="512" width="34" height="18" rx="2" transform="rotate(-12 723 521)"/><rect x="736" y="508" width="34" height="18" rx="2" transform="rotate(8 753 517)"/><rect x="722" y="500" width="34" height="18" rx="2" transform="rotate(-4 739 509)"/></g></g>
  </g>
'''
    chars = r'''
  <g transform="translate(560 200) scale(0.9)" class="char" id="c-hma"><g class="breathe">
    <use href="#ma-base"/>
    <g filter="url(#roughFine)"><use id="x-hma-brows" href="#ma-brows-soft"/><g class="blink" style="transform-origin:150px 196px"><use id="x-hma-eyes" href="#ma-eyes-open"/></g><use id="x-hma-mouth" href="#ma-mouth-level"/></g>
  </g></g>
  <g transform="translate(330 250) scale(0.92)" class="char" id="c-htala"><g class="breathe b">
    <use href="#tala-base"/>
    <g filter="url(#roughFine)"><use id="x-htala-brows" href="#tala-brows-flat"/><g class="blink b" style="transform-origin:140px 168px"><use id="x-htala-eyes" href="#tala-eyes-open"/></g><use id="x-htala-mouth" href="#tala-mouth-small"/></g>
  </g></g>
  <g transform="translate(860 190) scale(0.94)" class="char" id="c-tita"><g class="breathe c">
    <use href="#tita-base"/>
    <g filter="url(#roughFine)"><use id="x-tita-brows" href="#tita-brows-neutral"/><g class="blink c" style="transform-origin:150px 210px"><use id="x-tita-eyes" href="#tita-eyes-open"/></g><use id="x-tita-mouth" href="#tita-mouth-neutral"/></g>
  </g></g>
'''
    body = body.replace('  <g id="hall-chars"></g>', chars)
    svg = f'<svg width="1280" height="720" viewBox="0 0 1280 720">\n{d}\n{body}</svg>'
    svg = prefix_ids(svg, 'h-')
    for k in ['x-hma-brows','x-hma-eyes','x-hma-mouth','x-htala-brows','x-htala-eyes','x-htala-mouth','x-tita-brows','x-tita-eyes','x-tita-mouth','x-hhan-brows','x-hhan-eyes','x-hhan-mouth','c-hma','c-htala','c-tita','hall-hannah','hall-basket']:
        svg = svg.replace(f'id="h-{k}"', f'id="{k}"')
    return svg

def dawn():
    src = open('assets/samples/scene-dawn.html').read()
    svg = src[src.index('<svg width="1280"'):src.index('</svg>')+len('</svg>')]
    # the two walkers become a toggled group ; add Tala alone with the tray ; add the sun and a sunrise wash
    a = svg.index('    <!-- the two of them, walking : foreground left, backlit by the door.'); b = svg.index('    <!-- cold haze -->')
    walkers = svg[a:b]
    walkers = walkers.replace('    <g>\n      <ellipse cx="336" cy="556"', '    <g id="dawn-walk">\n      <ellipse cx="336" cy="556"')
    alone = r'''    <g id="dawn-tala" hidden>
      <ellipse cx="640" cy="600" rx="60" ry="10" fill="#000" opacity=".38"/>
      <g id="figTray">
        <path d="M 606 598 C 598 540 606 484 622 456 L 658 456 C 674 486 682 540 674 598 Z"/>
        <path d="M 622 456 C 618 428 630 410 640 410 C 651 410 662 428 658 456 Z"/>
        <circle cx="640" cy="386" r="27"/>
        <path d="M 613 372 C 619 346 661 346 667 374 C 665 398 655 408 640 408 C 623 408 615 394 613 372 Z"/>
        <!-- arms forward, holding the tray -->
        <path d="M 618 470 C 596 486 586 506 590 520 L 690 520 C 694 506 684 486 662 470 Z"/>
        <rect x="574" y="516" width="132" height="14" rx="4"/>
      </g>
      <use href="#figTray" x="4" y="-3" fill="#f5bf72" opacity=".55"/>
      <use href="#figTray" fill="#0c0d15"/>
    </g>
'''
    svg = svg[:a] + walkers + alone + svg[b:]
    svg = svg.replace('    <rect width="1280" height="720" fill="url(#sky)"/>',
      '''    <rect width="1280" height="720" fill="url(#sky)"/>
    <g id="sunrise">
      <circle id="sun" cx="640" cy="520" r="54" fill="#ffd27a"/>
      <rect id="sunwash" width="1280" height="720" fill="url(#dawnGlow)"/>
    </g>''')
    svg = prefix_ids(svg, 'd-')
    for k in ['dawn-walk','dawn-tala','sunrise','sun','sunwash']:
        svg = svg.replace(f'id="d-{k}"', f'id="{k}"')
    return svg

def puto(cook_svg_src):
    """Steamer + tubes from the top-down sample, as a dressing group over the game's pot."""
    src = open('assets/samples/scene-cooking-topdown.html').read()
    svg = src[src.index('<svg width="1280"'):src.index('</svg></div>')]
    a = svg.index('  <!-- ===== steamer pot, lid off ===== -->'); b = svg.index('  <!-- drop-target ring -->')
    steamer = svg[a:b]
    a = svg.index('  <!-- ===== bamboo tubes (bumbong), top-right, one already filled ===== -->'); b = svg.index('  <!-- ===== banana leaf, bottom-right ===== -->')
    tubes = svg[a:b]
    grp = '  <g id="dish-puto" hidden>\n' + steamer + tubes + '  </g>\n'
    # steamer needs its own pattern/clip/gradients from the sample defs
    d = svg[svg.index('  <defs>'):svg.index('  </defs>')+len('  </defs>')]
    need = ''
    for m in re.finditer(r'    <(?:radialGradient|linearGradient|pattern|clipPath) id="(potBody|potIn|waterG|holes|steamerClip|bamboo)"[\s\S]*?</(?:radialGradient|linearGradient|pattern|clipPath)>\n', d):
        need += m.group(0)
    grp = need.replace('    <', '    <').replace('id="', 'id="p-') + grp
    grp = grp.replace('url(#potBody)', 'url(#p-potBody)').replace('url(#potIn)', 'url(#p-potIn)').replace('url(#waterG)', 'url(#p-waterG)').replace('url(#holes)', 'url(#p-holes)').replace('url(#steamerClip)', 'url(#p-steamerClip)').replace('url(#bamboo)', 'url(#p-bamboo)')
    grp = grp.replace('url(#rough)', 'url(#td-rough)').replace('url(#roughFine)', 'url(#td-roughFine)').replace('url(#mid)', 'url(#td-mid)').replace('url(#puffblur)', 'url(#td-puffblur)')
    # the gradients must live in a defs block : wrap the defs-bits
    defs_bits = grp[:grp.index('  <g id="dish-puto" hidden>')]
    body = grp[grp.index('  <g id="dish-puto" hidden>'):]
    return '  <defs>\n' + defs_bits + '  </defs>\n' + body

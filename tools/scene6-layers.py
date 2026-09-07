"""Scene 4b: the money transfer counter on Newark Avenue, and the polaroid of Lola.

The counter is the one room in the game where the family is the customer instead of the
staff, so it is staged like the restaurant in reverse: the glass and the person behind it
are on the far side, and the Ramoses are the ones standing at a counter waiting."""
import re

def prefix_ids(svg, pre):
    ids = set(re.findall(r'\bid="([^"]+)"', svg))
    for i in sorted(ids, key=len, reverse=True):
        svg = svg.replace(f'id="{i}"', f'id="{pre}{i}"').replace(f'url(#{i})', f'url(#{pre}{i})').replace(f'href="#{i}"', f'href="#{pre}{i}"')
    return svg

# ===== the clerk. Local 300x360, face centre (150,190). Minimal rig: he has four lines. =====
CLERK = r'''
    <linearGradient id="hairC" x1="0.2" y1="0" x2="0.9" y2="1"><stop offset="0%" stop-color="#37282c"/><stop offset="60%" stop-color="#241a20"/><stop offset="100%" stop-color="#181119"/></linearGradient>
    <linearGradient id="skinC" x1="0.1" y1="0" x2="0.95" y2="1"><stop offset="0%" stop-color="#dfa87c"/><stop offset="55%" stop-color="#c9906a"/><stop offset="100%" stop-color="#a5714f"/></linearGradient>
    <linearGradient id="poloC" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0%" stop-color="#4f83c0"/><stop offset="100%" stop-color="#2f5b90"/></linearGradient>
    <g id="clerk-base">
      <g filter="url(#rough)">
        <path d="M 150 34 C 214 34 240 82 238 146 C 237 172 234 190 231 208 L 69 208 C 66 190 63 172 62 146 C 60 82 86 34 150 34 Z" fill="url(#hairC)"/>
        <path d="M 14 400 C 28 320 82 292 116 286 L 184 286 C 218 292 272 320 286 400 Z" fill="url(#poloC)"/>
        <path d="M 116 286 L 150 322 L 184 286 L 172 282 L 150 306 L 128 282 Z" fill="#f2ede0"/>
        <path d="M 126 250 L 174 250 L 178 292 L 122 292 Z" fill="#a5714f"/>
        <circle cx="58" cy="188" r="15" fill="#c9906a"/><circle cx="242" cy="188" r="15" fill="#c9906a"/>
        <path d="M 150 70 C 208 70 234 116 234 178 C 234 240 200 280 150 280 C 100 280 66 240 66 178 C 66 116 92 70 150 70 Z" fill="url(#skinC)"/>
        <path d="M 150 48 C 206 48 236 88 236 140 C 220 112 194 100 150 100 C 106 100 80 112 64 140 C 64 88 94 48 150 48 Z" fill="url(#hairC)"/>
        <!-- lanyard. Everybody behind a counter has one. -->
        <path d="M 122 288 C 128 320 136 344 150 360" stroke="#2f5b90" stroke-width="7" fill="none"/>
        <path d="M 178 288 C 172 320 164 344 150 360" stroke="#2f5b90" stroke-width="7" fill="none"/>
        <rect x="134" y="356" width="34" height="46" rx="4" fill="#f2ede0"/><rect x="139" y="364" width="24" height="6" fill="#9aa2a9"/>
      </g>
      <g filter="url(#roughFine)">
        <ellipse cx="96" cy="214" rx="18" ry="10" fill="#c0705c" opacity=".22"/><ellipse cx="204" cy="214" rx="18" ry="10" fill="#c0705c" opacity=".22"/>
        <path d="M 144 202 C 142 214 146 220 153 220 C 160 220 164 214 161 206" stroke="#a5714f" stroke-width="4" fill="none" stroke-linecap="round"/>
      </g>
    </g>
    <g id="clerk-brows-neutral" stroke="#181119" stroke-width="6" fill="none" stroke-linecap="round"><path d="M 94 148 C 106 140 126 140 138 146"/><path d="M 162 146 C 174 140 194 140 206 148"/></g>
    <g id="clerk-brows-up" stroke="#181119" stroke-width="6" fill="none" stroke-linecap="round"><path d="M 94 138 C 106 128 126 128 138 136"/><path d="M 162 136 C 174 128 194 128 206 138"/></g>
    <g id="clerk-eyes-open">
      <path d="M 90 176 C 100 160 130 160 140 176 C 130 194 100 194 90 176 Z" fill="#fbf3e4"/><path d="M 160 176 C 170 160 200 160 210 176 C 200 194 170 194 160 176 Z" fill="#fbf3e4"/>
      <circle cx="116" cy="177" r="11" fill="#241a20"/><circle cx="184" cy="177" r="11" fill="#241a20"/>
      <circle cx="120" cy="172" r="3.4" fill="#fbf3e4"/><circle cx="188" cy="172" r="3.4" fill="#fbf3e4"/>
    </g>
    <g id="clerk-eyes-down">
      <path d="M 90 176 C 100 162 130 162 140 176 C 130 192 100 192 90 176 Z" fill="#fbf3e4"/><path d="M 160 176 C 170 162 200 162 210 176 C 200 192 170 192 160 176 Z" fill="#fbf3e4"/>
      <circle cx="116" cy="183" r="10" fill="#241a20"/><circle cx="184" cy="183" r="10" fill="#241a20"/>
    </g>
    <path id="clerk-mouth-neutral" d="M 132 244 C 140 248 160 248 168 244" stroke="#8a4a3e" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <path id="clerk-mouth-small" d="M 136 244 L 164 244" stroke="#8a4a3e" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <g id="clerk-mouth-talk"><path d="M 136 238 C 144 234 156 234 164 238 C 162 254 138 254 136 238 Z" fill="#7d3a31"/></g>
    <g id="clerk-mouth-smile"><path d="M 126 240 C 138 258 162 258 174 238" stroke="#8a4a3e" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M 132 244 C 142 254 158 254 168 242 Z" fill="#fbf3e4" opacity=".9"/></g>
'''

def counter(defs):
    d = defs.replace('  </defs>', CLERK + '  </defs>')
    body = r'''
  <defs>
    <linearGradient id="wallW" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#dfe0cf"/><stop offset="100%" stop-color="#b6b8a4"/></linearGradient>
    <linearGradient id="glassW" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0%" stop-color="#cfe0e4" stop-opacity=".5"/><stop offset="100%" stop-color="#8fa8b0" stop-opacity=".38"/></linearGradient>
    <linearGradient id="lamW" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#cfc7ae"/><stop offset="100%" stop-color="#9c9782"/></linearGradient>
    <linearGradient id="boardW" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#20323a"/><stop offset="100%" stop-color="#132228"/></linearGradient>
    <radialGradient id="fluoW" cx="0.5" cy="0" r="1"><stop offset="0%" stop-color="#f6f6e8" stop-opacity=".65"/><stop offset="100%" stop-color="#f6f6e8" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#wallW)"/>
  <!-- the flat overhead light every storefront counter in the world has -->
  <ellipse cx="640" cy="0" rx="720" ry="300" fill="url(#fluoW)"/>
  <g filter="url(#rough)"><rect x="330" y="0" width="620" height="26" fill="#e8e8d8"/><rect x="330" y="26" width="620" height="8" fill="#a8a894"/></g>
  <!-- tinsel. It is the 22nd of December and somebody made an effort. -->
  <g stroke="#c9524a" stroke-width="6" fill="none" opacity=".75" filter="url(#roughFine)"><path d="M 690 40 C 830 82 950 82 1090 38"/></g>
  <g stroke="#4f8a5a" stroke-width="6" fill="none" opacity=".65" filter="url(#roughFine)"><path d="M 1090 38 C 1180 64 1240 64 1290 36"/></g>
  <!-- rate board -->
  <g filter="url(#rough)">
    <rect x="34" y="40" width="632" height="130" rx="6" fill="#000" opacity=".2" transform="translate(8 10)"/>
    <rect x="34" y="40" width="632" height="130" rx="6" fill="url(#boardW)"/>
    <rect x="34" y="40" width="632" height="38" rx="6" fill="#2f4a54"/>
  </g>
  <text x="54" y="67" font-family="IBM Plex Mono, monospace" font-size="18" letter-spacing="2.4" fill="#e0c877">SEND TO THE PHILIPPINES</text>
  <text x="54" y="122" font-family="Fraunces, Georgia, serif" font-size="27" fill="#f2ecda">Today&#8217;s rate</text>
  <text x="260" y="126" font-family="IBM Plex Mono, monospace" font-size="34" fill="#8fd6a8">$1 = 52.40 PHP</text>
  <text x="54" y="156" font-family="IBM Plex Mono, monospace" font-size="14" letter-spacing="1.6" fill="#9ab0b8">RATE CHANGES DAILY &#183; ASK ABOUT FEES</text>
  <!-- the service window -->
  <g filter="url(#rough)">
    <rect x="690" y="120" width="590" height="446" fill="#8e9484"/>
    <rect x="706" y="136" width="558" height="404" fill="#cfd6d0"/>
    <rect x="716" y="146" width="538" height="384" fill="url(#glassW)"/>
    <path d="M 760 150 L 900 150 L 800 526 L 730 526 Z" fill="#fbfbf4" opacity=".16"/>
    <path d="M 980 150 L 1030 150 L 930 526 L 900 526 Z" fill="#fbfbf4" opacity=".12"/>
  </g>
  <!-- clerk sits behind the glass -->
  <g id="counter-clerk"></g>
  <!-- glass furniture drawn over him: speak holes, the notice, the frame -->
  <g filter="url(#roughFine)">
    <g fill="#7d8478" opacity=".9"><circle cx="1148" cy="470" r="7"/><circle cx="1172" cy="470" r="7"/><circle cx="1196" cy="470" r="7"/><circle cx="1160" cy="490" r="7"/><circle cx="1184" cy="490" r="7"/><circle cx="1172" cy="510" r="7"/></g>
    <rect x="1080" y="212" width="152" height="118" rx="4" fill="#f6f2e4" opacity=".95"/>
    <g stroke="#9a9488" stroke-width="3" opacity=".8"><path d="M 1094 240 L 1218 240"/><path d="M 1094 260 L 1192 260"/><path d="M 1094 280 L 1208 280"/><path d="M 1094 300 L 1162 300"/><path d="M 1094 318 L 1186 318"/></g>
    <rect x="690" y="120" width="590" height="16" fill="#767c6e"/>
  </g>
  <!-- the family, on the customer side -->
  <g id="counter-chars"></g>
  <!-- counter across the foreground -->
  <g filter="url(#rough)">
    <rect x="-20" y="556" width="1320" height="180" fill="url(#lamW)"/>
    <rect x="-20" y="556" width="1320" height="12" fill="#e4dfc8"/>
    <rect x="-20" y="700" width="1320" height="34" fill="#7e795f"/>
    <!-- the pass tray under the glass. Everything goes through this slot. -->
    <rect x="836" y="566" width="248" height="88" rx="8" fill="#5f6458"/>
    <rect x="848" y="576" width="224" height="68" rx="6" fill="#8b9184"/>
    <rect x="848" y="576" width="224" height="10" rx="4" fill="#a7ad9e"/>
    <!-- pen on a chain, forms, a bell -->
    <rect x="150" y="596" width="180" height="58" rx="4" fill="#f4f0e2"/>
    <g stroke="#a9a396" stroke-width="3" opacity=".75"><path d="M 166 616 L 300 616"/><path d="M 166 632 L 266 632"/></g>
    <path d="M 344 600 L 396 646" stroke="#2b3358" stroke-width="9" stroke-linecap="round"/>
    <g fill="#c9c3ae"><ellipse cx="1184" cy="604" rx="34" ry="12"/><path d="M 1154 604 C 1154 580 1214 580 1214 604 Z" fill="#b9b3a0"/><rect x="1180" y="576" width="8" height="10" rx="3"/></g>
  </g>
  <!-- the cash, and the receipt that comes back. Drawn last so they sit on the counter. -->
  <g id="wire-receipt" hidden filter="url(#roughFine)" transform="translate(1012 556) rotate(-5)">
    <rect x="-84" y="-6" width="168" height="128" rx="3" fill="#000" opacity=".22" transform="translate(5 7)"/>
    <rect x="-84" y="-6" width="168" height="128" rx="3" fill="#fbf8ec"/>
    <g stroke="#b0a894" stroke-width="3" opacity=".9"><path d="M -66 22 L 66 22"/><path d="M -66 44 L 30 44"/><path d="M -66 66 L 52 66"/></g>
    <path d="M -66 90 L 66 90" stroke="#2f4a54" stroke-width="4"/>
    <g stroke="#2f4a54" stroke-width="4" opacity=".9"><path d="M -66 106 L 10 106"/></g>
  </g>
  <g id="drag-bills" hidden filter="url(#roughFine)" transform="translate(0 0)">
    <g transform="translate(430 618) rotate(-6)">
      <rect x="-78" y="-38" width="156" height="76" rx="5" fill="#000" opacity=".22" transform="translate(5 8)"/>
      <rect x="-78" y="-38" width="156" height="76" rx="5" fill="#c7d3bc"/>
      <rect x="-74" y="-32" width="148" height="64" rx="4" fill="#b3c3a6"/>
      <rect x="-70" y="-42" width="148" height="72" rx="5" fill="#cbd7c0"/>
      <circle cx="4" cy="-6" r="20" fill="#a8bb9a"/><circle cx="4" cy="-6" r="13" fill="#bccdb0"/>
      <g stroke="#8fa382" stroke-width="2.5" fill="none"><path d="M -56 -28 L -34 -28"/><path d="M -56 12 L -30 12"/><path d="M 44 -28 L 66 -28"/><path d="M 40 12 L 66 12"/></g>
      <rect x="-70" y="-42" width="148" height="72" rx="5" fill="none" stroke="#94a888" stroke-width="2.5"/>
    </g>
  </g>
'''
    chars = r'''
  <g transform="translate(70 168) scale(0.96)" class="char" id="c-wtala"><g class="breathe">
    <use href="#tala-base"/>
    <g filter="url(#roughFine)"><use id="x-wtala-brows" href="#tala-brows-flat"/><g class="blink" style="transform-origin:150px 200px"><use id="x-wtala-eyes" href="#tala-eyes-open"/></g><use id="x-wtala-mouth" href="#tala-mouth-small"/></g>
  </g></g>
  <g transform="translate(360 172) scale(0.96)" class="char" id="c-wpa"><g class="breathe b">
    <use href="#pa-base"/>
    <g filter="url(#roughFine)"><use id="x-wpa-brows" href="#pa-brows-straight"/><g class="blink b" style="transform-origin:150px 208px"><use id="x-wpa-eyes" href="#pa-eyes-open"/></g><use id="x-wpa-mouth" href="#pa-mouth-neutral"/></g>
  </g></g>
'''
    clerk = r'''
  <g transform="translate(790 176) scale(0.92)" class="char" id="c-clerk"><g class="breathe">
    <use href="#clerk-base"/>
    <g filter="url(#roughFine)"><use id="x-clerk-brows" href="#clerk-brows-neutral"/><g class="blink" style="transform-origin:150px 178px"><use id="x-clerk-eyes" href="#clerk-eyes-down"/></g><use id="x-clerk-mouth" href="#clerk-mouth-neutral"/></g>
  </g></g>
'''
    body = body.replace('  <g id="counter-chars"></g>', chars).replace('  <g id="counter-clerk"></g>', clerk)
    svg = f'<svg width="1280" height="720" viewBox="0 0 1280 720">\n{d}\n{body}</svg>'
    svg = prefix_ids(svg, 'w-')
    keep = ['x-wtala-brows','x-wtala-eyes','x-wtala-mouth','x-wpa-brows','x-wpa-eyes','x-wpa-mouth',
            'x-clerk-brows','x-clerk-eyes','x-clerk-mouth','c-wtala','c-wpa','c-clerk','drag-bills','wire-receipt']
    for k in keep:
        svg = svg.replace(f'id="w-{k}"', f'id="{k}"')
    for k in keep:
        assert f'id="{k}"' in svg, k
    return svg

# ===== the polaroid. The only time Lola is a face and not a subject. =====
LOLA = r"""<svg viewBox="0 0 420 400" width="420" height="400">
<defs>
  <filter id="pr" x="-15%" y="-15%" width="130%" height="130%">
    <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3" seed="7" result="n1"/>
    <feDisplacementMap in="SourceGraphic" in2="n1" scale="6" xChannelSelector="R" yChannelSelector="G" result="d1"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="3" result="n2"/>
    <feDisplacementMap in="d1" in2="n2" scale="3" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <linearGradient id="pskyL" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#bfe0e8"/><stop offset="100%" stop-color="#e8e4c2"/></linearGradient>
  <linearGradient id="phairL" x1="0.2" y1="0" x2="0.9" y2="1"><stop offset="0%" stop-color="#cfc8bd"/><stop offset="55%" stop-color="#a89f95"/><stop offset="100%" stop-color="#7d7469"/></linearGradient>
  <linearGradient id="pskinL" x1="0.1" y1="0" x2="0.95" y2="1"><stop offset="0%" stop-color="#dfa87c"/><stop offset="55%" stop-color="#c48c66"/><stop offset="100%" stop-color="#9c6a49"/></linearGradient>
  <linearGradient id="pdressL" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0%" stop-color="#7fb0a0"/><stop offset="100%" stop-color="#4d8577"/></linearGradient>
  <radialGradient id="pleakL" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="#fff6e0" stop-opacity=".30"/><stop offset="60%" stop-color="#fff6e0" stop-opacity=".10"/><stop offset="100%" stop-color="#fff6e0" stop-opacity="0"/></radialGradient>
  <clipPath id="pclip"><rect x="0" y="0" width="420" height="400"/></clipPath>
</defs>
<g clip-path="url(#pclip)">
  <rect width="420" height="400" fill="url(#pskyL)"/>
  <!-- Batangas. Green, and much too bright for anyone standing in New Jersey right now. -->
  <g filter="url(#pr)">
    <g fill="#6d9b56"><ellipse cx="30" cy="104" rx="92" ry="58"/><ellipse cx="392" cy="92" rx="84" ry="54"/><ellipse cx="210" cy="46" rx="140" ry="40"/></g>
    <g fill="#57834a" opacity=".85"><ellipse cx="74" cy="146" rx="62" ry="38"/><ellipse cx="350" cy="136" rx="58" ry="36"/></g>
    <rect x="0" y="176" width="420" height="224" fill="#8a9b6a"/>
    <!-- the doorway of her kitchen. She is standing in it, not framed by it. -->
    <rect x="76" y="-12" width="272" height="342" fill="#a1794f"/>
    <rect x="94" y="-12" width="236" height="324" fill="#412f20"/>
    <rect x="70" y="308" width="284" height="22" fill="#8a6640"/>
    <!-- the screen door, standing open against the wall -->
    <rect x="18" y="-12" width="62" height="330" fill="#b98f5e"/>
    <rect x="27" y="16" width="44" height="126" fill="#8a6640"/><rect x="27" y="164" width="44" height="126" fill="#8a6640"/>
    <circle cx="72" cy="164" r="5" fill="#6b4f34"/>
    <!-- a parol in the doorway, because it is always December somewhere in this story -->
    <g transform="translate(292 86)"><path d="M 0 -20 L 6 -6 L 21 -6 L 9 3 L 14 18 L 0 8 L -14 18 L -9 3 L -21 -6 L -6 -6 Z" fill="#d8563f"/><circle cx="0" cy="0" r="5" fill="#f2c95c"/></g>
    <!-- a strip of light on the floor of the kitchen behind her -->
    <path d="M 96 322 L 324 322 L 324 300 L 96 300 Z" fill="#6b4f34" opacity=".7"/>
  </g>

  <!-- ===== Lola. Head, shoulders, arms, tray. In that order, so the tray lands in her hands. ===== -->
  <g filter="url(#pr)" transform="translate(210 242) scale(0.8)">
    <!-- body -->
    <path d="M -118 168 C -108 76 -60 40 -28 32 L 28 32 C 60 40 108 76 118 168 Z" fill="url(#pdressL)"/>
    <g fill="#cfe2d4" opacity=".6"><circle cx="-66" cy="104" r="7"/><circle cx="-28" cy="136" r="6"/><circle cx="18" cy="100" r="7"/><circle cx="58" cy="134" r="6"/><circle cx="-92" cy="146" r="5"/><circle cx="84" cy="150" r="5"/></g>
    <path d="M -24 -6 L 24 -6 L 27 36 L -27 36 Z" fill="#9c6a49"/>
    <path d="M -30 28 C -14 44 14 44 30 28 L 34 40 C 16 58 -16 58 -34 40 Z" fill="#5f9384"/>

    <!-- upper arms, out of the sleeves, angled down and forward -->
    <path d="M -44 58 C -58 64 -68 72 -76 84" stroke="url(#pdressL)" stroke-width="31" stroke-linecap="round" fill="none"/>
    <path d="M 44 58 C 58 64 68 72 76 84" stroke="url(#pdressL)" stroke-width="31" stroke-linecap="round" fill="none"/>
    <path d="M -74 84 C -86 94 -95 104 -101 118" stroke="url(#pskinL)" stroke-width="22" stroke-linecap="round" fill="none"/>
    <path d="M 74 84 C 86 94 95 104 101 118" stroke="url(#pskinL)" stroke-width="22" stroke-linecap="round" fill="none"/>

    <!-- head -->
    <path d="M 0 -152 C 46 -152 68 -116 68 -68 C 68 -16 40 16 0 16 C -40 16 -68 -16 -68 -68 C -68 -116 -46 -152 0 -152 Z" fill="url(#pskinL)"/>
    <path d="M 0 -172 C 50 -172 74 -136 74 -94 C 60 -120 36 -130 0 -130 C -36 -130 -60 -120 -74 -94 C -74 -136 -50 -172 0 -172 Z" fill="url(#phairL)"/>
    <circle cx="0" cy="-178" r="25" fill="url(#phairL)"/>
    <circle cx="-72" cy="-72" r="12" fill="#c48c66"/><circle cx="72" cy="-72" r="12" fill="#c48c66"/>
    <g>
      <ellipse cx="-40" cy="-58" rx="16" ry="9" fill="#c0705c" opacity=".28"/><ellipse cx="40" cy="-58" rx="16" ry="9" fill="#c0705c" opacity=".28"/>
      <path d="M -50 -94 C -38 -102 -20 -102 -10 -96" stroke="#8d857a" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 10 -96 C 20 -102 38 -102 50 -94" stroke="#8d857a" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M -50 -70 C -40 -82 -18 -82 -8 -70 C -18 -62 -40 -62 -50 -70 Z" fill="#fbf3e4"/>
      <path d="M 8 -70 C 18 -82 40 -82 50 -70 C 40 -62 18 -62 8 -70 Z" fill="#fbf3e4"/>
      <circle cx="-29" cy="-70" r="8" fill="#3a2b1e"/><circle cx="29" cy="-70" r="8" fill="#3a2b1e"/>
      <circle cx="-26" cy="-73" r="2.6" fill="#fbf3e4"/><circle cx="32" cy="-73" r="2.6" fill="#fbf3e4"/>
      <g fill="none" stroke="#7a5a2a" stroke-width="4.4" opacity=".95">
        <rect x="-56" y="-84" width="52" height="30" rx="12"/><rect x="4" y="-84" width="52" height="30" rx="12"/>
        <path d="M -4 -70 L 4 -70"/><path d="M -56 -74 L -70 -68"/><path d="M 56 -74 L 70 -68"/></g>
      <path d="M -6 -52 C -8 -42 -4 -36 4 -36" stroke="#9c6a49" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M -26 -20 C -12 -2 14 -2 28 -22" stroke="#8e3a33" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M -18 -16 C -8 -6 10 -6 20 -18 Z" fill="#fbf3e4" opacity=".9"/>
    </g>

    <!-- the tray, at waist height, in front of the dress. This is the whole reason the photo exists. -->
    <g transform="translate(0 118)">
      <path d="M -110 -4 L 110 -4 L 112 6 L -112 6 Z" fill="#000" opacity=".18"/>
      <!-- banana leaf, then the puto, then the near rim of the tray over the bottom of them -->
      <path d="M -98 -18 L 98 -18 L 92 -2 L -92 -2 Z" fill="#5f8a48"/>
      <g fill="#6f4f86"><rect x="-80" y="-40" width="26" height="26" rx="5"/><rect x="-48" y="-42" width="26" height="28" rx="5"/><rect x="-16" y="-40" width="26" height="26" rx="5"/><rect x="16" y="-42" width="26" height="28" rx="5"/><rect x="48" y="-40" width="26" height="26" rx="5"/></g>
      <g fill="#f2ecd6" opacity=".9"><rect x="-80" y="-44" width="26" height="6" rx="3"/><rect x="-16" y="-44" width="26" height="6" rx="3"/><rect x="48" y="-44" width="26" height="6" rx="3"/></g>
      <g fill="#d9b06a" opacity=".95"><rect x="-48" y="-46" width="26" height="6" rx="3"/><rect x="16" y="-46" width="26" height="6" rx="3"/></g>
      <path d="M -112 -8 L 112 -8 L 106 14 L -106 14 Z" fill="#c9a06a"/>
      <path d="M -112 -8 L 112 -8 L 111 -3 L -111 -3 Z" fill="#e2c08c"/>
      <path d="M -106 14 L 106 14 L 104 20 L -104 20 Z" fill="#a67f4c"/>
      <!-- the two ends she is actually gripping -->
      <rect x="-116" y="-12" width="14" height="34" rx="4" fill="#b08b56"/>
      <rect x="102" y="-12" width="14" height="34" rx="4" fill="#b08b56"/>
    </g>

    <!-- hands, over the tray ends, so they read as holding and not floating -->
    <g>
      <path d="M -110 106 C -98 102 -88 108 -88 118 C -88 130 -96 136 -106 134 C -117 132 -122 122 -120 114 C -118 108 -114 106 -110 106 Z" fill="url(#pskinL)"/>
      <path d="M 110 106 C 98 102 88 108 88 118 C 88 130 96 136 106 134 C 117 132 122 122 120 114 C 118 108 114 106 110 106 Z" fill="url(#pskinL)"/>
      <g stroke="#a5714f" stroke-width="2.4" opacity=".6" fill="none" stroke-linecap="round">
        <path d="M -114 112 L -99 112"/><path d="M -115 120 L -98 120"/><path d="M -113 128 L -100 128"/>
        <path d="M 114 112 L 99 112"/><path d="M 115 120 L 98 120"/><path d="M 113 128 L 100 128"/></g>
    </g>
  </g>

  <!-- polaroid chemistry: a warm cast and a blown corner -->
  <rect width="420" height="400" fill="#e8b06a" opacity=".14"/>
  <ellipse cx="36" cy="18" rx="190" ry="140" fill="url(#pleakL)"/>
</g></svg>"""

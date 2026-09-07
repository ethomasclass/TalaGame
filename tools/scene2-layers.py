"""Scene 2 layers: third period, the vinegar run, the kitchen pass. Built from the shared defs block."""
import re

def prefix_ids(svg, pre):
    ids = set(re.findall(r'\bid="([^"]+)"', svg))
    for i in sorted(ids, key=len, reverse=True):
        svg = svg.replace(f'id="{i}"', f'id="{pre}{i}"').replace(f'url(#{i})', f'url(#{pre}{i})').replace(f'href="#{i}"', f'href="#{pre}{i}"')
    return svg

HANNAH = r'''
    <!-- ===== HANNAH : classmate. Local 280x340, face centre (140,170). ===== -->
    <linearGradient id="hairH" x1="0.2" y1="0" x2="0.9" y2="1"><stop offset="0%" stop-color="#a45a34"/><stop offset="60%" stop-color="#7e3f24"/><stop offset="100%" stop-color="#5a2b18"/></linearGradient>
    <linearGradient id="skinH" x1="0.1" y1="0" x2="0.95" y2="1"><stop offset="0%" stop-color="#f3d2b6"/><stop offset="55%" stop-color="#e8bc9c"/><stop offset="100%" stop-color="#c9977a"/></linearGradient>
    <linearGradient id="hoodieH" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0%" stop-color="#6f8b7a"/><stop offset="100%" stop-color="#3f5a4c"/></linearGradient>
    <g id="han-base">
      <g filter="url(#rough)">
        <path d="M 140 30 C 226 30 262 96 258 186 C 256 236 248 266 240 296 C 232 306 220 300 222 288 C 228 250 226 220 214 196 C 212 236 216 270 208 300 L 72 300 C 64 270 68 236 66 196 C 54 220 52 250 58 288 C 60 300 48 306 40 296 C 32 266 24 236 22 186 C 18 96 54 30 140 30 Z" fill="url(#hairH)"/>
        <path d="M 10 400 C 24 316 78 284 112 278 L 168 278 C 202 284 256 316 270 400 Z" fill="url(#hoodieH)"/>
        <path d="M 96 292 C 110 306 170 306 184 292 C 190 306 176 318 140 318 C 104 318 90 306 96 292 Z" fill="#33483d"/>
        <path d="M 116 250 L 164 250 L 168 290 L 112 290 Z" fill="#c9977a"/>
        <circle cx="48" cy="176" r="15" fill="#d9a888"/><circle cx="232" cy="176" r="15" fill="#d9a888"/>
        <path d="M 140 66 C 200 66 228 114 228 172 C 228 238 192 280 140 280 C 88 280 52 238 52 172 C 52 114 80 66 140 66 Z" fill="url(#skinH)"/>
        <path d="M 140 44 C 200 44 236 84 238 140 C 224 112 200 98 172 100 C 156 84 122 86 106 104 C 82 104 62 120 46 148 C 44 92 78 44 140 44 Z" fill="url(#hairH)"/>
        <path d="M 60 96 C 84 74 114 68 140 72 C 110 74 84 86 66 106 Z" fill="#c47a4e" opacity=".55"/>
      </g>
      <g filter="url(#roughFine)">
        <g fill="#b9764f" opacity=".55"><circle cx="92" cy="206" r="2.2"/><circle cx="104" cy="214" r="2"/><circle cx="84" cy="218" r="1.8"/><circle cx="188" cy="206" r="2.2"/><circle cx="176" cy="214" r="2"/><circle cx="196" cy="218" r="1.8"/><circle cx="132" cy="212" r="1.6"/><circle cx="150" cy="210" r="1.6"/></g>
        <ellipse cx="86" cy="204" rx="18" ry="10" fill="#d4736a" opacity=".2"/><ellipse cx="194" cy="204" rx="18" ry="10" fill="#d4736a" opacity=".2"/>
        <path d="M 134 196 C 132 206 136 212 143 212 C 150 212 154 206 151 198" stroke="#c07a5e" stroke-width="4" fill="none" stroke-linecap="round"/>
      </g>
    </g>
    <g id="han-brows-neutral" stroke="#6b3f2a" stroke-width="6" fill="none" stroke-linecap="round"><path d="M 86 140 C 98 132 118 132 130 138"/><path d="M 150 138 C 162 132 182 132 194 140"/></g>
    <g id="han-brows-up" stroke="#6b3f2a" stroke-width="6" fill="none" stroke-linecap="round"><path d="M 86 132 C 98 122 118 122 130 130"/><path d="M 150 130 C 162 122 182 122 194 132"/></g>
    <g id="han-eyes-open">
      <path d="M 82 168 C 92 152 122 152 132 168 C 122 186 92 186 82 168 Z" fill="#fbf3e4"/><path d="M 148 168 C 158 152 188 152 198 168 C 188 186 158 186 148 168 Z" fill="#fbf3e4"/>
      <ellipse cx="108" cy="169" rx="11" ry="12" fill="#3a2a1e"/><ellipse cx="172" cy="169" rx="11" ry="12" fill="#3a2a1e"/>
      <circle cx="112" cy="164" r="3.4" fill="#fbf3e4"/><circle cx="176" cy="164" r="3.4" fill="#fbf3e4"/>
    </g>
    <g id="han-eyes-wide">
      <path d="M 80 168 C 90 148 124 148 134 168 C 124 190 90 190 80 168 Z" fill="#fbf3e4"/><path d="M 146 168 C 156 148 190 148 200 168 C 190 190 156 190 146 168 Z" fill="#fbf3e4"/>
      <ellipse cx="108" cy="169" rx="12" ry="13" fill="#3a2a1e"/><ellipse cx="172" cy="169" rx="12" ry="13" fill="#3a2a1e"/>
      <circle cx="112" cy="163" r="3.6" fill="#fbf3e4"/><circle cx="176" cy="163" r="3.6" fill="#fbf3e4"/>
    </g>
    <path id="han-mouth-neutral" d="M 124 236 C 132 241 148 241 156 236" stroke="#a5574a" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <g id="han-mouth-o"><path d="M 130 230 C 138 226 146 226 152 230 C 150 244 132 244 130 230 Z" fill="#8e3a33"/></g>
    <g id="han-mouth-smile"><path d="M 116 232 C 128 250 152 250 164 230" stroke="#a5574a" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M 122 236 C 132 246 148 246 158 234 Z" fill="#fbf3e4" opacity=".9"/></g>
    <path id="han-mouth-flat" d="M 126 238 C 134 238 148 238 156 238" stroke="#a5574a" stroke-width="4.5" fill="none" stroke-linecap="round"/>
'''
ANDO = r'''
    <!-- ===== ANDO : cousin, 20, newly arrived. Local 300x380, face centre (150,200). ===== -->
    <linearGradient id="skinA" x1="0.1" y1="0" x2="0.95" y2="1"><stop offset="0%" stop-color="#dfa07a"/><stop offset="55%" stop-color="#cf8d6b"/><stop offset="100%" stop-color="#ad6d50"/></linearGradient>
    <g id="ando-base">
      <g filter="url(#rough)">
        <path d="M -20 470 C -10 372 62 340 122 330 L 178 330 C 238 340 310 372 320 470 Z" fill="#4a4f5c"/>
        <path d="M 96 470 L 96 372 C 96 360 108 356 120 356 L 180 356 C 192 356 204 360 204 372 L 204 470 Z" fill="#fbf6ea"/>
        <path d="M 120 356 L 108 330" stroke="#d8d0be" stroke-width="6" stroke-linecap="round"/><path d="M 180 356 L 192 330" stroke="#d8d0be" stroke-width="6" stroke-linecap="round"/>
        <path d="M 122 268 L 178 268 L 180 340 L 120 340 Z" fill="#ad6d50"/>
        <circle cx="54" cy="214" r="16" fill="#c4885f"/><circle cx="246" cy="214" r="16" fill="#c4885f"/>
        <path d="M 150 92 C 210 92 240 138 240 202 C 240 274 208 326 150 326 C 92 326 60 274 60 202 C 60 138 90 92 150 92 Z" fill="url(#skinA)"/>
        <!-- hair : longer, a bit messy, over the forehead -->
        <path d="M 150 56 C 220 56 254 104 250 170 C 244 150 236 134 226 128 C 222 146 214 152 206 140 C 196 156 184 154 178 136 C 166 156 150 156 140 138 C 128 156 112 158 104 140 C 96 154 86 152 80 136 C 68 144 60 158 54 176 C 46 104 84 56 150 56 Z" fill="url(#hair)"/>
        <path d="M 100 76 C 130 62 176 64 204 80 C 170 72 130 72 100 84 Z" fill="#4a3a6c" opacity=".6"/>
      </g>
      <g filter="url(#roughFine)">
        <path d="M 138 232 C 136 244 141 250 150 250 C 159 250 164 244 162 234" stroke="#a8663f" stroke-width="4.5" fill="none" stroke-linecap="round"/>
        <path d="M 96 222 C 104 228 118 228 128 222" stroke="#a8604f" stroke-width="2.4" fill="none" opacity=".6" stroke-linecap="round"/>
        <path d="M 172 222 C 182 228 196 228 204 222" stroke="#a8604f" stroke-width="2.4" fill="none" opacity=".6" stroke-linecap="round"/>
      </g>
    </g>
    <g id="ando-brows-neutral" stroke="#1c1430" stroke-width="7" fill="none" stroke-linecap="round"><path d="M 90 170 C 104 162 126 162 138 168"/><path d="M 162 168 C 174 162 196 162 210 170"/></g>
    <g id="ando-brows-up" stroke="#1c1430" stroke-width="7" fill="none" stroke-linecap="round"><path d="M 90 162 C 104 152 126 152 138 160"/><path d="M 162 160 C 174 152 196 152 210 162"/></g>
    <g id="ando-eyes-open">
      <path d="M 88 204 C 98 190 124 190 134 204 C 124 218 98 218 88 204 Z" fill="#fbf3e4"/><path d="M 166 204 C 176 190 202 190 212 204 C 202 218 176 218 166 204 Z" fill="#fbf3e4"/>
      <ellipse cx="111" cy="205" rx="10" ry="10" fill="#1c1430"/><ellipse cx="189" cy="205" rx="10" ry="10" fill="#1c1430"/>
      <circle cx="115" cy="201" r="3" fill="#fbf3e4"/><circle cx="193" cy="201" r="3" fill="#fbf3e4"/>
    </g>
    <g id="ando-eyes-tired">
      <path d="M 88 204 C 98 190 124 190 134 204 C 124 218 98 218 88 204 Z" fill="#fbf3e4"/><path d="M 166 204 C 176 190 202 190 212 204 C 202 218 176 218 166 204 Z" fill="#fbf3e4"/>
      <ellipse cx="111" cy="206" rx="10" ry="10" fill="#1c1430"/><ellipse cx="189" cy="206" rx="10" ry="10" fill="#1c1430"/>
      <path d="M 86 204 C 98 190 124 190 136 204 L 136 197 C 124 188 98 188 86 197 Z" fill="#cf8d6b"/><path d="M 164 204 C 176 190 202 190 214 204 L 214 197 C 202 188 176 188 164 197 Z" fill="#cf8d6b"/>
      <path d="M 88 203 C 98 195 124 195 134 203" stroke="#a8604f" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M 166 203 C 176 195 202 195 212 203" stroke="#a8604f" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    </g>
    <path id="ando-mouth-neutral" d="M 132 280 C 140 285 160 285 168 280" stroke="#8e3a33" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g id="ando-mouth-smile"><path d="M 126 278 C 138 292 162 292 174 276" stroke="#8e3a33" stroke-width="5" fill="none" stroke-linecap="round"/></g>
    <path id="ando-mouth-small" d="M 138 282 C 144 285 156 285 162 282" stroke="#8e3a33" stroke-width="4.5" fill="none" stroke-linecap="round"/>
'''

def school(defs):
    d = defs.replace('  </defs>', HANNAH + '  </defs>')
    body = r'''
  <defs>
    <linearGradient id="wallS" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0%" stop-color="#e4e6d6"/><stop offset="100%" stop-color="#c6c9b2"/></linearGradient>
    <linearGradient id="deskS" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#d9b98a"/><stop offset="100%" stop-color="#a8865c"/></linearGradient>
    <linearGradient id="skyS" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#b9c4cf"/><stop offset="100%" stop-color="#dfe3e4"/></linearGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#wallS)"/>
  <rect y="0" width="1280" height="26" fill="#b8bba6"/>
  <!-- window, grey December afternoon -->
  <g filter="url(#rough)"><rect x="880" y="60" width="330" height="300" rx="6" fill="#8e9484"/><rect x="894" y="74" width="302" height="272" rx="4" fill="url(#skyS)"/><rect x="1040" y="74" width="8" height="272" fill="#8e9484"/><rect x="894" y="206" width="302" height="8" fill="#8e9484"/>
    <g fill="#9aa2a9"><rect x="894" y="270" width="90" height="76"/><rect x="1000" y="250" width="110" height="96"/><rect x="1130" y="286" width="66" height="60"/></g></g>
  <!-- whiteboard -->
  <g filter="url(#rough)"><rect x="60" y="60" width="700" height="300" rx="6" fill="#c9cbbd"/><rect x="72" y="72" width="676" height="276" rx="3" fill="#f6f7f2"/>
    <g stroke="#3d4a8a" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"><path d="M 100 116 L 320 116"/><path d="M 100 150 L 260 150"/><path d="M 100 184 L 380 184"/><path d="M 100 218 L 300 218"/><path d="M 100 252 L 240 252"/></g>
    <g stroke="#a1462f" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"><path d="M 420 116 L 640 116"/><path d="M 420 150 L 560 150"/><path d="M 440 190 C 500 170 560 210 620 190"/></g>
    <rect x="72" y="336" width="676" height="12" fill="#b3b5a6"/><rect x="560" y="330" width="60" height="8" rx="3" fill="#3d4a8a"/><rect x="630" y="330" width="60" height="8" rx="3" fill="#a1462f"/></g>
  <!-- the world map : the unit is human geography -->
  <g filter="url(#roughFine)" transform="translate(790 70)">
    <rect width="70" height="0" fill="none"/>
    <rect x="0" y="0" width="76" height="120" rx="3" fill="#d9d6c4"/><rect x="0" y="0" width="76" height="14" fill="#3d4a8a"/>
    <g fill="#7f9f7a"><path d="M 8 30 C 18 24 30 28 30 40 C 26 50 14 52 8 44 Z"/><path d="M 34 34 C 46 26 62 30 68 40 C 66 52 54 58 44 54 C 40 46 36 42 34 34 Z"/><path d="M 14 60 C 22 58 28 64 26 76 C 22 86 14 84 12 74 Z"/><path d="M 40 66 C 52 62 64 70 62 84 C 56 94 44 92 40 80 Z"/></g>
  </g>
  <!-- clock -->
  <g filter="url(#roughFine)"><circle cx="820" cy="40" r="0" fill="none"/><circle cx="1240" cy="42" r="0" fill="none"/></g>
  <rect y="360" width="1280" height="360" fill="#b9bca6"/>
  <!-- fluorescent wash -->
  <rect width="1280" height="720" fill="#f4f6e6" opacity=".18" style="mix-blend-mode:screen"/>
  <!-- desks cropping the characters at the chest -->
  <g id="school-chars"></g>
  <g filter="url(#rough)">
    <rect x="80" y="520" width="480" height="26" rx="6" fill="url(#deskS)"/><rect x="80" y="520" width="480" height="8" fill="#eedbb8" opacity=".6"/><rect x="100" y="546" width="440" height="180" fill="#7e6748"/>
    <rect x="700" y="520" width="480" height="26" rx="6" fill="url(#deskS)"/><rect x="700" y="520" width="480" height="8" fill="#eedbb8" opacity=".6"/><rect x="720" y="546" width="440" height="180" fill="#7e6748"/>
    <rect x="150" y="500" width="150" height="20" rx="3" fill="#f2efe4"/><rect x="160" y="490" width="120" height="12" rx="2" fill="#e9e3d2"/>
    <rect x="800" y="498" width="170" height="22" rx="3" fill="#2b2f3a"/><rect x="806" y="502" width="158" height="14" rx="2" fill="#5a6c8a"/>
  </g>
'''
    chars = r'''
  <g transform="translate(180 176) scale(1.0)" class="char" id="c-stala"><g class="breathe">
    <use href="#tala-base"/>
    <g filter="url(#roughFine)"><use id="x-stala-brows" href="#tala-brows-flat"/><g class="blink" style="transform-origin:140px 168px"><use id="x-stala-eyes" href="#tala-eyes-open"/></g><use id="x-stala-mouth" href="#tala-mouth-small"/></g>
  </g></g>
  <g transform="translate(800 176) scale(1.0)" class="char" id="c-han"><g class="breathe b">
    <use href="#han-base"/>
    <g filter="url(#roughFine)"><use id="x-han-brows" href="#han-brows-neutral"/><g class="blink b" style="transform-origin:140px 168px"><use id="x-han-eyes" href="#han-eyes-open"/></g><use id="x-han-mouth" href="#han-mouth-neutral"/></g>
  </g></g>
'''
    body = body.replace('  <g id="school-chars"></g>', chars)
    svg = f'<svg width="1280" height="720" viewBox="0 0 1280 720">\n{d}\n{body}</svg>'
    svg = prefix_ids(svg, 's-')
    for k in ['x-stala-brows','x-stala-eyes','x-stala-mouth','x-han-brows','x-han-eyes','x-han-mouth','c-stala','c-han']:
        svg = svg.replace(f'id="s-{k}"', f'id="{k}"')
    return svg

def street():
    """Newark Avenue at 5:20pm. Four Filipino businesses in a row and then the chain,
    because an enclave is a strip, not a lone holdout. The block has to look worth choosing."""
    return r"""<svg width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="v-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2b2a4a"/><stop offset="60%" stop-color="#5a4160"/><stop offset="100%" stop-color="#a86a5c"/></linearGradient>
    <linearGradient id="v-road" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3a3340"/><stop offset="100%" stop-color="#1f1a24"/></linearGradient>
    <radialGradient id="v-warm" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="#ffcf7a" stop-opacity=".9"/><stop offset="100%" stop-color="#f0a85a" stop-opacity="0"/></radialGradient>
    <radialGradient id="v-cold" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="#eaf6ff" stop-opacity=".95"/><stop offset="100%" stop-color="#bfe0ff" stop-opacity="0"/></radialGradient>
    <radialGradient id="v-tv" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="#8fd0ff" stop-opacity=".8"/><stop offset="100%" stop-color="#5a8fd0" stop-opacity="0"/></radialGradient>
    <filter id="v-rough" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="2" seed="7" result="big"/><feDisplacementMap in="SourceGraphic" in2="big" scale="7" xChannelSelector="R" yChannelSelector="G" result="d1"/><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed="19" result="fine"/><feDisplacementMap in="d1" in2="fine" scale="4" xChannelSelector="R" yChannelSelector="G"/></filter>
    <filter id="v-roughFine" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="5" result="f"/><feDisplacementMap in="SourceGraphic" in2="f" scale="2.2" xChannelSelector="R" yChannelSelector="G"/></filter>
    <filter id="v-soft"><feGaussianBlur stdDeviation="24"/></filter><filter id="v-mid"><feGaussianBlur stdDeviation="8"/></filter>
  </defs>
  <rect width="1280" height="720" fill="url(#v-sky)"/>
  <g fill="#e8e2ff"><circle cx="180" cy="72" r="1.6" opacity=".5"/><circle cx="520" cy="58" r="1.4" opacity=".45"/><circle cx="1180" cy="66" r="1.6" opacity=".4"/></g>
  <rect y="470" width="1280" height="250" fill="url(#v-road)"/>
  <g transform="translate(0 -58)">
  <!-- apartments over the shops. People live above all of this. -->
  <g filter="url(#v-rough)"><rect x="-20" y="110" width="940" height="380" fill="#5b3b3e"/><rect x="920" y="150" width="380" height="340" fill="#3f4256"/>
    <g fill="#2c1e24" opacity=".8"><rect x="40" y="140" width="56" height="76" rx="4"/><rect x="150" y="140" width="56" height="76" rx="4"/><rect x="260" y="140" width="56" height="76" rx="4"/><rect x="370" y="140" width="56" height="76" rx="4"/><rect x="480" y="140" width="56" height="76" rx="4"/><rect x="590" y="140" width="56" height="76" rx="4"/><rect x="700" y="140" width="56" height="76" rx="4"/><rect x="810" y="140" width="56" height="76" rx="4"/></g>
    <g fill="#f4c65a" opacity=".55"><rect x="158" y="150" width="40" height="56" rx="3"/><rect x="488" y="150" width="40" height="56" rx="3"/><rect x="708" y="150" width="40" height="56" rx="3"/></g>
    <g fill="#262838" opacity=".8"><rect x="960" y="180" width="66" height="76" rx="4"/><rect x="1090" y="180" width="66" height="76" rx="4"/><rect x="1220" y="180" width="66" height="76" rx="4"/></g>
    <!-- somebody has a parol in an upstairs window -->
    <g transform="translate(618 178) scale(.3)"><path d="M 0 -66 L 17 -22 L 63 -20 L 27 9 L 39 54 L 0 28 L -39 54 L -27 9 L -63 -20 L -17 -22 Z" fill="#e0453f"/><circle r="14" fill="#fff4d2"/></g>
  </g>

  <!-- ===== 1. BAYANIHAN CARGO : the balikbayan box shipper ===== -->
  <ellipse cx="90" cy="440" rx="200" ry="150" fill="url(#v-warm)" filter="url(#v-soft)" opacity=".7"/>
  <g filter="url(#v-rough)">
    <rect x="-20" y="250" width="215" height="290" fill="#4a3a52"/>
    <rect x="-20" y="250" width="215" height="58" fill="#2f6fd6"/><rect x="-20" y="302" width="215" height="8" fill="#f4c65a"/>
    <rect x="0" y="330" width="175" height="210" fill="#ffd79b"/>
    <!-- boxes stacked in the window, taped, addressed -->
    <g fill="#c9a06a"><rect x="14" y="400" width="72" height="60"/><rect x="92" y="392" width="72" height="68"/><rect x="24" y="466" width="72" height="60"/><rect x="102" y="470" width="60" height="56"/></g>
    <g stroke="#8a6a3e" stroke-width="4" opacity=".8"><path d="M 50 400 L 50 460"/><path d="M 128 392 L 128 460"/><path d="M 60 466 L 60 526"/></g>
    <g fill="#f6f1e2" opacity=".9"><rect x="26" y="410" width="34" height="12"/><rect x="104" y="404" width="34" height="12"/></g>
    <!-- the rate sheet taped inside the glass -->
    <rect x="12" y="336" width="60" height="52" fill="#f6f1e2"/>
    <g stroke="#9a9488" stroke-width="2.5" opacity=".8"><path d="M 20 350 L 64 350"/><path d="M 20 360 L 56 360"/><path d="M 20 370 L 60 370"/></g>
  </g>
  <text x="104" y="283" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="600" font-size="18" fill="#fff3d6" letter-spacing="0.5">BAYANIHAN CARGO</text>
  <text x="104" y="300" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="8.5" fill="#cfe0ff" letter-spacing="2">BALIKBAYAN BOXES &#183; DOOR TO DOOR</text>

  <!-- ===== 2. MANG BOY'S : small, warm, hand-painted ===== -->
  <ellipse cx="380" cy="430" rx="250" ry="170" fill="url(#v-warm)" filter="url(#v-soft)"/>
  <g filter="url(#v-rough)">
    <rect x="205" y="250" width="350" height="290" fill="#7a3a34"/>
    <rect x="205" y="250" width="350" height="62" fill="#c9524a"/><rect x="205" y="306" width="350" height="9" fill="#f4c65a"/>
    <rect x="228" y="336" width="170" height="204" fill="#ffd79b"/><rect x="412" y="336" width="120" height="204" fill="#5a2a26"/><rect x="420" y="344" width="104" height="120" fill="#ffd79b" opacity=".9"/>
    <g fill="#5a2a26" opacity=".85"><rect x="236" y="344" width="8" height="196"/><rect x="386" y="344" width="8" height="196"/><rect x="228" y="424" width="170" height="6"/></g>
    <g transform="translate(312 396) scale(.44)"><path d="M 0 -66 L 17 -22 L 63 -20 L 27 9 L 39 54 L 0 28 L -39 54 L -27 9 L -63 -20 L -17 -22 Z" fill="#e0453f"/><path d="M 0 -40 L 10 -14 L 38 -12 L 16 5 L 24 32 L 0 17 L -24 32 L -16 5 L -38 -12 L -10 -14 Z" fill="#f4c65a"/><circle r="12" fill="#fff4d2"/></g>
    <g fill="#c9524a" opacity=".7"><rect x="250" y="366" width="14" height="30"/><rect x="270" y="366" width="14" height="30"/><rect x="290" y="366" width="14" height="30"/><rect x="344" y="366" width="14" height="30"/><rect x="364" y="366" width="14" height="30"/></g>
    <g fill="#4a7a4e" opacity=".7"><rect x="250" y="446" width="18" height="34"/><rect x="274" y="446" width="18" height="34"/><rect x="298" y="446" width="18" height="34"/><rect x="346" y="446" width="18" height="34"/></g>
    <!-- crates of produce out on the pavement -->
    <g><rect x="470" y="470" width="66" height="70" fill="#a8743e"/><rect x="476" y="476" width="54" height="26" fill="#6b8a3e"/><rect x="470" y="440" width="66" height="30" fill="#a8743e"/><rect x="476" y="446" width="54" height="18" fill="#d9a23c"/></g>
  </g>
  <text x="380" y="292" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="600" font-size="34" fill="#fff3d6" letter-spacing="1">MANG BOY&#8217;S</text>
  <text x="380" y="312" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10.5" fill="#fff3d6" letter-spacing="3" opacity=".85">FILIPINO GROCERY &#183; SARI-SARI</text>

  <!-- ===== 3. THE PANADERIA : the second batch comes out at five ===== -->
  <ellipse cx="650" cy="420" rx="190" ry="150" fill="url(#v-warm)" filter="url(#v-soft)"/>
  <g filter="url(#v-rough)">
    <rect x="565" y="250" width="175" height="290" fill="#8a6a3e"/>
    <rect x="565" y="250" width="175" height="56" fill="#f4c65a"/>
    <rect x="582" y="330" width="142" height="210" fill="#ffe3ac"/>
    <!-- trays of pan de sal, still warm -->
    <g fill="#c9a06a"><rect x="592" y="380" width="122" height="8"/><rect x="592" y="432" width="122" height="8"/><rect x="592" y="484" width="122" height="8"/></g>
    <g fill="#d9a45e"><ellipse cx="608" cy="372" rx="15" ry="10"/><ellipse cx="640" cy="372" rx="15" ry="10"/><ellipse cx="672" cy="372" rx="15" ry="10"/><ellipse cx="702" cy="372" rx="14" ry="10"/>
      <ellipse cx="608" cy="424" rx="15" ry="10"/><ellipse cx="640" cy="424" rx="15" ry="10"/><ellipse cx="672" cy="424" rx="15" ry="10"/><ellipse cx="702" cy="424" rx="14" ry="10"/>
      <ellipse cx="614" cy="476" rx="15" ry="10"/><ellipse cx="648" cy="476" rx="15" ry="10"/><ellipse cx="684" cy="476" rx="15" ry="10"/></g>
    <g fill="#f0c98a" opacity=".7"><ellipse cx="604" cy="368" rx="7" ry="4"/><ellipse cx="636" cy="368" rx="7" ry="4"/><ellipse cx="668" cy="368" rx="7" ry="4"/><ellipse cx="604" cy="420" rx="7" ry="4"/><ellipse cx="636" cy="420" rx="7" ry="4"/></g>
  </g>
  <text x="652" y="288" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="600" font-size="27" fill="#5a3a1e" letter-spacing="1">PANADERIA</text>

  <!-- ===== 4. THE SALON : a teleserye on a TV nobody is watching ===== -->
  <g filter="url(#v-rough)">
    <rect x="750" y="250" width="160" height="290" fill="#6b3550"/>
    <rect x="750" y="250" width="160" height="54" fill="#e88ab0"/>
    <rect x="766" y="328" width="128" height="212" fill="#3a2438"/>
  </g>
  <ellipse cx="832" cy="392" rx="90" ry="70" fill="url(#v-tv)" filter="url(#v-mid)"/>
  <g filter="url(#v-roughFine)">
    <rect x="796" y="356" width="70" height="46" rx="3" fill="#bfe4ff"/>
    <g fill="#7fb4e0"><rect x="804" y="366" width="22" height="26" rx="8"/><rect x="836" y="368" width="22" height="24" rx="8"/></g>
    <!-- two chairs, one occupied -->
    <g fill="#2a1a2c"><rect x="780" y="452" width="34" height="60" rx="6"/><rect x="846" y="452" width="34" height="60" rx="6"/><circle cx="863" cy="444" r="17"/></g>
  </g>
  <text x="830" y="288" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="600" font-size="24" fill="#3a1c2c" letter-spacing="2">SALON</text>

  <!-- ===== 5. THE CHAIN : wide, white, fluorescent, sells the same milk as everywhere ===== -->
  <ellipse cx="1120" cy="420" rx="290" ry="170" fill="url(#v-cold)" filter="url(#v-soft)"/>
  <g filter="url(#v-rough)">
    <rect x="925" y="250" width="380" height="290" fill="#2a2d3a"/>
    <rect x="925" y="250" width="380" height="58" fill="#e8ecf2"/><rect x="925" y="302" width="380" height="8" fill="#2f6fd6"/>
    <rect x="944" y="330" width="356" height="210" fill="#eef7ff"/>
    <g fill="#c7d3e0" opacity=".8"><rect x="944" y="330" width="8" height="210"/><rect x="1120" y="330" width="8" height="210"/></g>
    <g fill="#fff" opacity=".9"><rect x="968" y="360" width="130" height="28"/><rect x="968" y="420" width="130" height="28"/><rect x="968" y="480" width="130" height="28"/><rect x="1150" y="360" width="130" height="28"/><rect x="1150" y="420" width="130" height="28"/><rect x="1150" y="480" width="130" height="28"/></g>
    <g fill="#ffd23c"><rect x="968" y="340" width="70" height="24"/><rect x="1150" y="340" width="70" height="24"/></g>
  </g>
  <text x="1115" y="292" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-weight="500" font-size="28" fill="#2f6fd6" letter-spacing="5">QUIK MART</text>

  <!-- sidewalk + road, snow at the kerb -->
  <rect y="540" width="1280" height="60" fill="#5c5560"/><rect y="540" width="1280" height="6" fill="#8a8290" opacity=".6"/>
  <rect y="600" width="1280" height="120" fill="url(#v-road)"/>
  <g fill="#e9eef7" opacity=".85" filter="url(#v-roughFine)"><path d="M -10 596 C 120 590 240 604 380 596 C 520 588 640 604 780 598 C 920 592 1060 606 1290 596 L 1290 612 L -10 612 Z"/></g>
  <!-- people on the block. An empty enclave is a contradiction. -->
  <g filter="url(#v-rough)" opacity=".95">
    <g transform="translate(180 452)"><path d="M -21 88 C -19 40 -8 30 0 30 C 8 30 19 40 21 88 Z" fill="#3a2c46"/><circle cx="0" cy="16" r="14" fill="#2a2036"/><path d="M -19 92 L -12 92 L -12 104 L -19 104 Z" fill="#241c30"/><path d="M 12 92 L 19 92 L 19 104 L 12 104 Z" fill="#241c30"/></g>
    <g transform="translate(240 458)"><path d="M -18 82 C -16 38 -7 28 0 28 C 7 28 16 38 18 82 Z" fill="#5a3040"/><circle cx="0" cy="15" r="13" fill="#2a2036"/><path d="M -16 86 L -10 86 L -10 96 L -16 96 Z" fill="#241c30"/><path d="M 10 86 L 16 86 L 16 96 L 10 96 Z" fill="#241c30"/></g>
    <g transform="translate(560 446)"><path d="M -23 94 C -21 42 -9 32 0 32 C 9 32 21 42 23 94 Z" fill="#2c3f4a"/><circle cx="0" cy="17" r="15" fill="#221c2c"/><path d="M -20 98 L -13 98 L -13 110 L -20 110 Z" fill="#241c30"/><path d="M 13 98 L 20 98 L 20 110 L 13 110 Z" fill="#241c30"/>
      <!-- carrying a bag from somewhere -->
      <rect x="20" y="56" width="20" height="26" rx="3" fill="#7a5a34"/></g>
    <g transform="translate(730 456)"><path d="M -19 84 C -17 40 -7 30 0 30 C 7 30 17 40 19 84 Z" fill="#46324a"/><circle cx="0" cy="15" r="13" fill="#2a2036"/><path d="M -17 88 L -11 88 L -11 98 L -17 98 Z" fill="#241c30"/><path d="M 11 88 L 17 88 L 17 98 L 11 98 Z" fill="#241c30"/>
      <!-- and a small one holding on -->
      <g transform="translate(24 44) scale(0.58)"><path d="M -18 76 C -16 36 -7 26 0 26 C 7 26 16 36 18 76 Z" fill="#8a4a56"/><circle cx="0" cy="12" r="13" fill="#2a2036"/></g></g>
    <g transform="translate(1020 450)"><path d="M -20 88 C -18 42 -8 32 0 32 C 8 32 18 42 20 88 Z" fill="#3a4256"/><circle cx="0" cy="17" r="14" fill="#221c2c"/><path d="M -18 92 L -11 92 L -11 104 L -18 104 Z" fill="#241c30"/><path d="M 11 92 L 18 92 L 18 104 L 11 104 Z" fill="#241c30"/></g>
  </g>
  <ellipse cx="380" cy="600" rx="230" ry="26" fill="#ffcf7a" opacity=".16" filter="url(#v-mid)"/><ellipse cx="1120" cy="600" rx="240" ry="26" fill="#cfe6ff" opacity=".2" filter="url(#v-mid)"/>
  </g>
</svg>"""

def kitchen(defs):
    d = defs.replace('  </defs>', ANDO + '  </defs>')
    body = r'''
  <defs>
    <linearGradient id="tileK" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e6e2d2"/><stop offset="100%" stop-color="#bdb6a0"/></linearGradient>
    <linearGradient id="steelK" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#b8bcc6"/><stop offset="15%" stop-color="#8f94a2"/><stop offset="100%" stop-color="#585d6e"/></linearGradient>
    <linearGradient id="hoodK" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6c7180"/><stop offset="100%" stop-color="#3f4352"/></linearGradient>
    <radialGradient id="stoveK" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="#ffb347" stop-opacity=".7"/><stop offset="100%" stop-color="#ff7a2a" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#tileK)"/>
  <g stroke="#a9a08a" stroke-width="2" opacity=".45" fill="none">
    <path d="M 0 80 L 1280 80"/><path d="M 0 160 L 1280 160"/><path d="M 0 240 L 1280 240"/><path d="M 0 320 L 1280 320"/><path d="M 0 400 L 1280 400"/>
    <path d="M 120 0 L 120 440"/><path d="M 280 0 L 280 440"/><path d="M 440 0 L 440 440"/><path d="M 600 0 L 600 440"/><path d="M 760 0 L 760 440"/><path d="M 920 0 L 920 440"/><path d="M 1080 0 L 1080 440"/>
  </g>
  <!-- hood + hanging pans -->
  <g filter="url(#rough)"><rect x="700" y="0" width="580" height="110" fill="url(#hoodK)"/><rect x="700" y="104" width="580" height="12" fill="#2b2f3a"/>
    <rect x="80" y="0" width="520" height="16" fill="#4a4e5e"/>
    <g><rect x="130" y="16" width="4" height="60" fill="#3a3d4a"/><path d="M 96 76 C 96 60 170 60 170 76 L 166 118 C 166 128 100 128 100 118 Z" fill="#6e7385"/>
       <rect x="260" y="16" width="4" height="80" fill="#3a3d4a"/><path d="M 220 96 C 220 78 306 78 306 96 L 300 150 C 300 162 226 162 226 150 Z" fill="#5a5f70"/>
       <rect x="400" y="16" width="4" height="50" fill="#3a3d4a"/><path d="M 372 66 C 372 54 432 54 432 66 L 428 104 C 428 112 376 112 376 104 Z" fill="#7a7f92"/></g>
  </g>
  <!-- ticket rail -->
  <g filter="url(#roughFine)"><rect x="60" y="180" width="560" height="6" fill="#3a3d4a"/>
    <g fill="#f6f1e2"><rect x="90" y="186" width="60" height="70"/><rect x="170" y="186" width="60" height="70"/><rect x="250" y="186" width="60" height="70"/><rect x="330" y="186" width="60" height="70"/></g>
    <g stroke="#7a7466" stroke-width="2" opacity=".6"><path d="M 98 200 L 140 200"/><path d="M 98 214 L 128 214"/><path d="M 98 228 L 136 228"/><path d="M 178 200 L 220 200"/><path d="M 178 214 L 206 214"/><path d="M 258 200 L 300 200"/><path d="M 338 200 L 380 200"/><path d="M 338 214 L 366 214"/></g>
  </g>
  <!-- stove, right, warm -->
  <ellipse cx="1080" cy="470" rx="240" ry="120" fill="url(#stoveK)" filter="url(#soft)"/>
  <g filter="url(#rough)"><rect x="900" y="410" width="380" height="60" fill="#2b2f3a"/><ellipse cx="1000" cy="412" rx="70" ry="14" fill="#1e2030"/><ellipse cx="1180" cy="412" rx="70" ry="14" fill="#1e2030"/>
    <path d="M 950 350 L 1050 350 L 1044 412 L 956 412 Z" fill="#5e6c9a"/><ellipse cx="1000" cy="350" rx="50" ry="10" fill="#8b98c2"/><ellipse cx="1000" cy="350" rx="40" ry="7" fill="#3a2418"/></g>
  <!-- steam from the pot -->
  <g fill="#fff8ee" filter="url(#mid)"><ellipse class="puff" cx="980" cy="330" rx="22" ry="12"/><ellipse class="puff b" cx="1010" cy="322" rx="24" ry="14"/></g>
  <!-- characters, then the pass in front of them -->
  <g id="kitchen-chars"></g>
  <g filter="url(#rough)"><rect x="-20" y="560" width="1320" height="180" fill="url(#steelK)"/><rect x="-20" y="560" width="1320" height="10" fill="#d5d8e0" opacity=".8"/>
    <rect x="-20" y="700" width="1320" height="30" fill="#3f4352"/>
    <!-- a cutting board and the knife, in front of Ando -->
    <rect x="720" y="586" width="220" height="60" rx="6" fill="#c9a06a"/><rect x="720" y="586" width="220" height="10" rx="4" fill="#e0bd88"/>
    <path d="M 760 600 L 900 600 L 904 610 L 760 614 Z" fill="#dfe3ea"/><rect x="900" y="596" width="40" height="18" rx="6" fill="#2b2f3a"/>
    <g fill="#f2f0e2"><ellipse cx="800" cy="626" rx="14" ry="6"/><ellipse cx="830" cy="628" rx="14" ry="6"/><ellipse cx="860" cy="626" rx="14" ry="6"/></g>
    <!-- the walk-in door, far left -->
    <rect x="-20" y="230" width="150" height="330" fill="#9aa0ac"/><rect x="0" y="250" width="110" height="290" fill="#b5bac6"/><rect x="88" y="380" width="16" height="50" rx="4" fill="#3a3d4a"/>
  </g>
'''
    chars = r'''
  <g transform="translate(300 128)" class="char" id="c-kpa"><g class="breathe">
    <use href="#pa-base"/>
    <g filter="url(#roughFine)"><use id="x-kpa-brows" href="#pa-brows-straight"/><g class="blink" style="transform-origin:150px 208px"><use id="x-kpa-eyes" href="#pa-eyes-open"/></g><use id="x-kpa-mouth" href="#pa-mouth-neutral"/></g>
  </g></g>
  <g transform="translate(680 128)" class="char" id="c-ando"><g class="breathe b">
    <use href="#ando-base"/>
    <g filter="url(#roughFine)"><use id="x-ando-brows" href="#ando-brows-neutral"/><g class="blink b" style="transform-origin:150px 205px"><use id="x-ando-eyes" href="#ando-eyes-tired"/></g><use id="x-ando-mouth" href="#ando-mouth-neutral"/></g>
  </g></g>
'''
    body = body.replace('  <g id="kitchen-chars"></g>', chars)
    svg = f'<svg width="1280" height="720" viewBox="0 0 1280 720">\n{d}\n{body}</svg>'
    svg = prefix_ids(svg, 'k-')
    for k in ['x-kpa-brows','x-kpa-eyes','x-kpa-mouth','x-ando-brows','x-ando-eyes','x-ando-mouth','c-kpa','c-ando']:
        svg = svg.replace(f'id="k-{k}"', f'id="{k}"')
    return svg

ADOBO = r'''
  <g id="dish-adobo" hidden>
    <g filter="url(#td-rough)">
      <circle cx="470" cy="385" r="152" fill="url(#td-potBody)"/><circle cx="470" cy="385" r="132" fill="#2a1a14"/>
      <circle cx="470" cy="385" r="120" fill="#4a2a1c"/>
      <g fill="#b8743e"><ellipse cx="420" cy="350" rx="40" ry="28" transform="rotate(-20 420 350)"/><ellipse cx="505" cy="345" rx="38" ry="26" transform="rotate(25 505 345)"/><ellipse cx="440" cy="425" rx="42" ry="28" transform="rotate(10 440 425)"/><ellipse cx="520" cy="420" rx="36" ry="26" transform="rotate(-15 520 420)"/></g>
      <g fill="#d9944e" opacity=".7"><ellipse cx="412" cy="342" rx="22" ry="12" transform="rotate(-20 412 342)"/><ellipse cx="512" cy="338" rx="20" ry="11" transform="rotate(25 512 338)"/><ellipse cx="432" cy="418" rx="24" ry="12" transform="rotate(10 432 418)"/></g>
      <g fill="#6b8a3e"><path d="M 470 380 C 480 366 496 366 502 380 C 496 394 480 394 470 380 Z"/><path d="M 380 400 C 390 388 404 388 410 400 C 404 412 390 412 380 400 Z"/></g>
      <g fill="#1c1430"><circle cx="460" cy="360" r="3"/><circle cx="486" cy="404" r="3"/><circle cx="408" cy="388" r="3"/><circle cx="540" cy="380" r="3"/></g>
      <ellipse cx="450" cy="340" rx="50" ry="22" fill="#fff" opacity=".08"/>
      <rect x="296" y="372" width="34" height="26" rx="12" fill="#2b3358"/><rect x="610" y="372" width="34" height="26" rx="12" fill="#2b3358"/>
    </g>
    <!-- garlic, bay, peppercorns on the counter -->
    <g filter="url(#td-rough)" transform="translate(690 240)">
      <ellipse cx="0" cy="8" rx="60" ry="40" fill="#000" opacity=".22" transform="translate(8 10)"/>
      <path d="M -50 10 C -50 -30 -20 -46 0 -46 C 20 -46 50 -30 50 10 C 50 34 26 46 0 46 C -26 46 -50 34 -50 10 Z" fill="#f2ead8"/>
      <g stroke="#cdbfa4" stroke-width="2" fill="none" opacity=".8"><path d="M -30 -20 C -20 0 -20 20 -28 36"/><path d="M -8 -40 C -4 -10 -4 20 -8 42"/><path d="M 16 -38 C 14 -10 16 20 18 40"/><path d="M 36 -22 C 30 0 30 20 36 36"/></g>
      <path d="M -4 -46 L 4 -46 L 6 -62 L -6 -62 Z" fill="#b9a98a"/>
      <g fill="#6b8a3e" transform="translate(100 20)"><path d="M -30 0 C -20 -18 20 -18 30 0 C 20 18 -20 18 -30 0 Z"/><path d="M -30 0 L 30 0" stroke="#4a6a2a" stroke-width="1.5"/></g>
      <g fill="#1c1430" transform="translate(-100 40)"><circle cx="0" cy="0" r="4"/><circle cx="12" cy="6" r="4"/><circle cx="-10" cy="8" r="4"/><circle cx="4" cy="14" r="4"/></g>
    </g>
    <!-- soy -->
    <g filter="url(#td-rough)" transform="translate(940 560)"><rect x="-26" y="-70" width="52" height="140" rx="10" fill="#000" opacity=".22" transform="translate(6 8)"/><rect x="-26" y="-70" width="52" height="140" rx="10" fill="#1e1712"/><rect x="-20" y="-40" width="40" height="70" rx="4" fill="#c9524a"/><rect x="-12" y="-82" width="24" height="16" rx="4" fill="#e0a23c"/></g>
    <!-- vinegar : the two bottles, one shown -->
    <g id="vin-cane" filter="url(#td-rough)" transform="translate(1040 560)"><rect x="-24" y="-74" width="48" height="148" rx="10" fill="#000" opacity=".22" transform="translate(6 8)"/><rect x="-24" y="-74" width="48" height="148" rx="10" fill="#e9dfc8" opacity=".92"/><rect x="-18" y="-36" width="36" height="66" rx="4" fill="#2f6fd6"/><rect x="-14" y="-28" width="28" height="12" fill="#f4c65a"/><rect x="-10" y="-88" width="20" height="18" rx="4" fill="#3b3b3b"/></g>
    <g id="vin-chain" filter="url(#td-rough)" transform="translate(1040 560)" hidden><rect x="-40" y="-70" width="80" height="140" rx="12" fill="#000" opacity=".22" transform="translate(6 8)"/><rect x="-40" y="-70" width="80" height="140" rx="12" fill="#f4f6f8"/><rect x="-30" y="-30" width="60" height="50" rx="3" fill="#dfe3ea"/><rect x="-14" y="-86" width="28" height="20" rx="5" fill="#c9cfd8"/><path d="M 30 -60 C 48 -60 48 -30 30 -30" stroke="#dfe3ea" stroke-width="8" fill="none"/></g>
  </g>
'''

"""Establishing shots: the restaurant with the apartment above it, and the school. No characters."""
FILTERS = r'''
    <filter id="x-rough" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="2" seed="7" result="big"/><feDisplacementMap in="SourceGraphic" in2="big" scale="7" xChannelSelector="R" yChannelSelector="G" result="d1"/><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed="19" result="fine"/><feDisplacementMap in="d1" in2="fine" scale="4" xChannelSelector="R" yChannelSelector="G"/></filter>
    <filter id="x-fine" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="5" result="f"/><feDisplacementMap in="SourceGraphic" in2="f" scale="2.2" xChannelSelector="R" yChannelSelector="G"/></filter>
    <filter id="x-soft"><feGaussianBlur stdDeviation="24"/></filter><filter id="x-mid"><feGaussianBlur stdDeviation="8"/></filter>
'''
def restaurant():
    return r'''<svg width="1280" height="720" viewBox="0 0 1280 720">
  <defs>''' + FILTERS + r'''
    <linearGradient id="x-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1b1e38"/><stop offset="70%" stop-color="#3a2f52"/><stop offset="100%" stop-color="#6b4256"/></linearGradient>
    <linearGradient id="x-brick" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#7a4a44"/><stop offset="100%" stop-color="#4e2e2e"/></linearGradient>
    <linearGradient id="x-road" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3a3340"/><stop offset="100%" stop-color="#1f1a24"/></linearGradient>
    <radialGradient id="x-warm" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="#ffcf7a" stop-opacity=".9"/><stop offset="100%" stop-color="#f0a85a" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#x-sky)"/>
  <g fill="#e8e2ff"><circle cx="120" cy="60" r="1.6" opacity=".5"/><circle cx="420" cy="90" r="1.3" opacity=".4"/><circle cx="900" cy="50" r="1.5" opacity=".45"/><circle cx="1180" cy="110" r="1.4" opacity=".4"/></g>
  <!-- neighbours -->
  <g filter="url(#x-rough)"><rect x="-20" y="150" width="300" height="420" fill="#3f3448"/><rect x="1000" y="130" width="300" height="440" fill="#463a4e"/>
    <g fill="#2a2234"><rect x="30" y="190" width="60" height="80" rx="3"/><rect x="150" y="190" width="60" height="80" rx="3"/><rect x="30" y="310" width="60" height="80" rx="3"/><rect x="150" y="310" width="60" height="80" rx="3"/><rect x="1050" y="180" width="60" height="80" rx="3"/><rect x="1170" y="180" width="60" height="80" rx="3"/><rect x="1050" y="300" width="60" height="80" rx="3"/><rect x="1170" y="300" width="60" height="80" rx="3"/></g>
    <g fill="#f4c65a" opacity=".5"><rect x="156" y="196" width="48" height="68" rx="2"/><rect x="1176" y="306" width="48" height="68" rx="2"/></g></g>
  <!-- the building : restaurant below, the apartment above -->
  <g filter="url(#x-rough)">
    <rect x="280" y="110" width="720" height="460" fill="url(#x-brick)"/>
    <g stroke="#3a2222" stroke-width="1.5" opacity=".35" fill="none"><path d="M 280 150 L 1000 150"/><path d="M 280 190 L 1000 190"/><path d="M 280 230 L 1000 230"/><path d="M 280 270 L 1000 270"/><path d="M 280 310 L 1000 310"/><path d="M 280 350 L 1000 350"/></g>
    <!-- apartment windows, the family's, lit -->
    <g><rect x="340" y="170" width="110" height="130" rx="4" fill="#2a2234"/><rect x="348" y="178" width="94" height="114" rx="2" fill="#ffd79b"/><rect x="393" y="178" width="6" height="114" fill="#5a3a3a"/><rect x="348" y="232" width="94" height="6" fill="#5a3a3a"/>
       <rect x="585" y="170" width="110" height="130" rx="4" fill="#2a2234"/><rect x="593" y="178" width="94" height="114" rx="2" fill="#ffd79b"/><rect x="638" y="178" width="6" height="114" fill="#5a3a3a"/><rect x="593" y="232" width="94" height="6" fill="#5a3a3a"/>
       <rect x="830" y="170" width="110" height="130" rx="4" fill="#2a2234"/><rect x="838" y="178" width="94" height="114" rx="2" fill="#5a4a7a"/><rect x="883" y="178" width="6" height="114" fill="#5a3a3a"/><rect x="838" y="232" width="94" height="6" fill="#5a3a3a"/></g>
    <!-- parol in the middle apartment window -->
    <g transform="translate(640 236) scale(.36)"><path d="M 0 -66 L 17 -22 L 63 -20 L 27 9 L 39 54 L 0 28 L -39 54 L -27 9 L -63 -20 L -17 -22 Z" fill="#e0453f"/><path d="M 0 -40 L 10 -14 L 38 -12 L 16 5 L 24 32 L 0 17 L -24 32 L -16 5 L -38 -12 L -10 -14 Z" fill="#f4c65a"/><circle r="12" fill="#fff4d2"/></g>
    <!-- awning + sign -->
    <rect x="300" y="330" width="680" height="64" fill="#c9524a"/><rect x="300" y="386" width="680" height="10" fill="#f4c65a"/>
    <g fill="#a63e3e" opacity=".6"><rect x="340" y="330" width="30" height="64"/><rect x="420" y="330" width="30" height="64"/><rect x="500" y="330" width="30" height="64"/><rect x="580" y="330" width="30" height="64"/><rect x="660" y="330" width="30" height="64"/><rect x="740" y="330" width="30" height="64"/><rect x="820" y="330" width="30" height="64"/><rect x="900" y="330" width="30" height="64"/></g>
    <!-- the front : big window, door -->
    <rect x="320" y="400" width="400" height="170" fill="#5a2a26"/><rect x="332" y="412" width="376" height="146" fill="#ffd79b"/>
    <rect x="760" y="400" width="200" height="170" fill="#5a2a26"/><rect x="772" y="412" width="176" height="158" fill="#ffd79b" opacity=".9"/><rect x="866" y="470" width="12" height="40" rx="4" fill="#3a2a2a"/>
    <!-- inside the window : tables, a menu board, people -->
    <g fill="#c1553f" opacity=".85"><rect x="360" y="500" width="120" height="14" rx="4"/><rect x="540" y="500" width="120" height="14" rx="4"/></g>
    <g fill="#2b2222" opacity=".8"><rect x="600" y="430" width="90" height="50" rx="3"/></g>
    <g><circle cx="390" cy="480" r="14" fill="#241a38"/><path d="M 372 520 C 374 498 406 498 408 520 Z" fill="#2c6b62"/><circle cx="450" cy="484" r="13" fill="#3a3444"/><path d="M 434 520 C 436 500 464 500 466 520 Z" fill="#7e2f2b"/></g>
    <g transform="translate(680 470) scale(.4)"><path d="M 0 -66 L 17 -22 L 63 -20 L 27 9 L 39 54 L 0 28 L -39 54 L -27 9 L -63 -20 L -17 -22 Z" fill="#e0453f"/><path d="M 0 -40 L 10 -14 L 38 -12 L 16 5 L 24 32 L 0 17 L -24 32 L -16 5 L -38 -12 L -10 -14 Z" fill="#f4c65a"/><circle r="12" fill="#fff4d2"/></g>
  </g>
  <text x="640" y="372" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="600" font-size="38" fill="#fff3d6" letter-spacing="2">PACING’S</text>
  <text x="640" y="392" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="11" fill="#fff3d6" letter-spacing="4" opacity=".9">FILIPINO KITCHEN · SINCE 2024</text>
  <ellipse cx="640" cy="560" rx="420" ry="120" fill="url(#x-warm)" filter="url(#x-soft)"/>
  <!-- sidewalk, snow, road, a parked car -->
  <rect y="570" width="1280" height="50" fill="#5c5560"/><rect y="570" width="1280" height="6" fill="#8a8290" opacity=".6"/>
  <g fill="#e9eef7" opacity=".85" filter="url(#x-fine)"><path d="M -10 616 C 120 610 240 624 380 616 C 520 608 640 624 780 618 C 920 612 1060 626 1290 616 L 1290 632 L -10 632 Z"/></g>
  <rect y="620" width="1280" height="100" fill="url(#x-road)"/>
  <g filter="url(#x-rough)" transform="translate(1000 600)"><rect x="-120" y="-56" width="240" height="60" rx="16" fill="#3b4a78"/><path d="M -80 -56 C -70 -90 70 -90 80 -56 Z" fill="#2b3550"/><rect x="-62" y="-84" width="124" height="28" rx="6" fill="#9fb8e8" opacity=".6"/><circle cx="-80" cy="8" r="16" fill="#1a1a22"/><circle cx="80" cy="8" r="16" fill="#1a1a22"/><rect x="-124" y="-34" width="14" height="10" rx="3" fill="#ffd79b"/></g>
  <g filter="url(#x-fine)" fill="#e9eef7"><path d="M 880 548 C 940 540 980 546 1120 544 L 1120 552 L 880 556 Z" opacity=".9"/></g>
  <!-- snow -->
  <g fill="#e8ecf6" opacity=".8"><circle class="flake" cx="100" cy="0" r="2" style="animation-delay:-1s"/><circle class="flake" cx="300" cy="0" r="2.4" style="animation-delay:-3.2s"/><circle class="flake" cx="500" cy="0" r="1.8" style="animation-delay:-5s"/><circle class="flake" cx="700" cy="0" r="2.2" style="animation-delay:-2.1s"/><circle class="flake" cx="900" cy="0" r="1.6" style="animation-delay:-4.4s"/><circle class="flake" cx="1100" cy="0" r="2" style="animation-delay:-0.4s"/><circle class="flake" cx="200" cy="0" r="1.5" style="animation-delay:-2.8s"/><circle class="flake" cx="620" cy="0" r="2.1" style="animation-delay:-5.6s"/><circle class="flake" cx="1000" cy="0" r="1.7" style="animation-delay:-1.6s"/><circle class="flake" cx="820" cy="0" r="2.3" style="animation-delay:-3.9s"/></g>
</svg>'''

def school():
    return r'''<svg width="1280" height="720" viewBox="0 0 1280 720">
  <defs>''' + FILTERS + r'''
    <linearGradient id="x-daysky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#9aa6b4"/><stop offset="100%" stop-color="#d9dde0"/></linearGradient>
    <linearGradient id="x-tan" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#c9b48e"/><stop offset="100%" stop-color="#9a8462"/></linearGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#x-daysky)"/>
  <!-- the school : long, brick-tan, flat roof, many windows -->
  <g filter="url(#x-rough)">
    <rect x="60" y="180" width="1160" height="360" fill="url(#x-tan)"/><rect x="60" y="170" width="1160" height="16" fill="#7a6a4e"/>
    <rect x="500" y="110" width="280" height="80" fill="#b8a27c"/><rect x="500" y="100" width="280" height="14" fill="#7a6a4e"/>
    <g fill="#5a6c8a" opacity=".9">
      <rect x="110" y="220" width="70" height="90" rx="3"/><rect x="220" y="220" width="70" height="90" rx="3"/><rect x="330" y="220" width="70" height="90" rx="3"/><rect x="880" y="220" width="70" height="90" rx="3"/><rect x="990" y="220" width="70" height="90" rx="3"/><rect x="1100" y="220" width="70" height="90" rx="3"/>
      <rect x="110" y="350" width="70" height="90" rx="3"/><rect x="220" y="350" width="70" height="90" rx="3"/><rect x="330" y="350" width="70" height="90" rx="3"/><rect x="880" y="350" width="70" height="90" rx="3"/><rect x="990" y="350" width="70" height="90" rx="3"/><rect x="1100" y="350" width="70" height="90" rx="3"/>
    </g>
    <g fill="#f4e6c8" opacity=".6"><rect x="226" y="226" width="58" height="78" rx="2"/><rect x="996" y="356" width="58" height="78" rx="2"/></g>
    <!-- entrance -->
    <rect x="540" y="330" width="200" height="210" fill="#3a3d4a"/><rect x="552" y="342" width="84" height="198" fill="#9fb8e8" opacity=".55"/><rect x="644" y="342" width="84" height="198" fill="#9fb8e8" opacity=".55"/>
    <rect x="520" y="300" width="240" height="30" fill="#7a6a4e"/>
    <!-- flagpole -->
    <rect x="300" y="60" width="5" height="480" fill="#8a8a90"/><rect x="305" y="70" width="60" height="36" fill="#b23a48"/><rect x="305" y="70" width="26" height="20" fill="#2f4a8a"/><g stroke="#f4f4f4" stroke-width="2"><path d="M 331 78 L 365 78"/><path d="M 331 86 L 365 86"/><path d="M 305 94 L 365 94"/><path d="M 305 102 L 365 102"/></g>
  </g>
  <text x="640" y="160" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="18" fill="#3a3d4a" letter-spacing="8" opacity=".85">HIGH SCHOOL</text>
  <!-- steps, sidewalk, snow, a bus -->
  <g filter="url(#x-rough)"><rect x="480" y="540" width="320" height="14" fill="#8a8480"/><rect x="460" y="554" width="360" height="14" fill="#7a746f"/></g>
  <rect y="568" width="1280" height="50" fill="#8e8a90"/><rect y="618" width="1280" height="102" fill="#4a4550"/>
  <g fill="#e9eef7" opacity=".9" filter="url(#x-fine)"><path d="M -10 614 C 120 608 240 622 380 614 C 520 606 640 622 780 616 C 920 610 1060 624 1290 614 L 1290 630 L -10 630 Z"/><path d="M 60 176 L 1220 176 L 1220 190 L 60 190 Z" opacity=".8"/></g>
  <g filter="url(#x-rough)" transform="translate(1060 596)"><rect x="-150" y="-70" width="300" height="76" rx="10" fill="#f2b632"/><g fill="#2b2f3a" opacity=".8"><rect x="-130" y="-56" width="44" height="34" rx="3"/><rect x="-76" y="-56" width="44" height="34" rx="3"/><rect x="-22" y="-56" width="44" height="34" rx="3"/><rect x="32" y="-56" width="44" height="34" rx="3"/><rect x="86" y="-56" width="44" height="34" rx="3"/></g><rect x="-150" y="-12" width="300" height="8" fill="#2b2f3a"/><circle cx="-100" cy="10" r="16" fill="#1a1a22"/><circle cx="100" cy="10" r="16" fill="#1a1a22"/></g>
  <g fill="#e8ecf6" opacity=".8"><circle class="flake" cx="100" cy="0" r="2" style="animation-delay:-1s"/><circle class="flake" cx="400" cy="0" r="2.4" style="animation-delay:-3.2s"/><circle class="flake" cx="700" cy="0" r="1.8" style="animation-delay:-5s"/><circle class="flake" cx="1000" cy="0" r="2.2" style="animation-delay:-2.1s"/><circle class="flake" cx="1200" cy="0" r="1.6" style="animation-delay:-4.4s"/><circle class="flake" cx="250" cy="0" r="1.5" style="animation-delay:-2.8s"/><circle class="flake" cx="850" cy="0" r="2.1" style="animation-delay:-5.6s"/></g>
</svg>'''

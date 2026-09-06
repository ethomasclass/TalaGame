"""Circular contact photos for the phone thread. Bea has no scene presence by design;
a profile picture is the one place her face belongs."""
import base64

ROUGH = ('<filter id="r" x="-20%" y="-20%" width="140%" height="140%">'
         '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n"/>'
         '<feDisplacementMap in="SourceGraphic" in2="n" scale="2" xChannelSelector="R" yChannelSelector="G"/></filter>')

TALA = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
<defs>{ROUGH}
<linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0%" stop-color="#f3bda9"/><stop offset="100%" stop-color="#d9979a"/></linearGradient>
<linearGradient id="hair" x1="0.2" y1="0" x2="0.9" y2="1"><stop offset="0%" stop-color="#3a2b55"/><stop offset="60%" stop-color="#261c3c"/><stop offset="100%" stop-color="#1a1330"/></linearGradient>
<linearGradient id="skin" x1="0.1" y1="0" x2="0.95" y2="1"><stop offset="0%" stop-color="#e8a184"/><stop offset="55%" stop-color="#d98e77"/><stop offset="100%" stop-color="#b96d5e"/></linearGradient>
<clipPath id="c"><circle cx="60" cy="60" r="60"/></clipPath></defs>
<g clip-path="url(#c)"><rect width="120" height="120" fill="url(#bg)"/>
<g filter="url(#r)">
  <path d="M 96 62 C 110 78 114 104 110 126 L 96 126 C 100 104 96 80 88 66 Z" fill="url(#hair)"/>
  <path d="M 60 8 C 96 8 112 32 111 68 C 110 90 106 104 103 118 L 17 118 C 14 104 10 90 9 68 C 8 32 24 8 60 8 Z" fill="url(#hair)"/>
  <path d="M 22 126 C 26 100 40 90 60 88 C 80 90 94 100 98 126 Z" fill="#2e5fd9"/>
  <path d="M 50 78 L 70 78 L 71 94 L 49 94 Z" fill="#b96d5e"/>
  <path d="M 60 22 C 86 22 98 42 98 66 C 98 92 82 108 60 108 C 38 108 22 92 22 66 C 22 42 34 22 60 22 Z" fill="url(#skin)"/>
  <path d="M 60 14 C 92 14 105 36 103 60 C 95 44 82 36 68 37 C 56 30 42 34 30 46 C 24 52 21 60 20 68 C 14 38 28 14 60 14 Z" fill="url(#hair)"/>
</g>
<g filter="url(#r)">
  <ellipse cx="36" cy="76" rx="9" ry="5" fill="#c05b58" opacity=".3"/><ellipse cx="84" cy="76" rx="9" ry="5" fill="#c05b58" opacity=".3"/>
  <path d="M 34 52 C 40 48 50 48 55 51" stroke="#1c1430" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 65 51 C 70 48 80 48 86 52" stroke="#1c1430" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 33 63 C 38 55 51 55 56 63 C 51 71 38 71 33 63 Z" fill="#fbf3e4"/>
  <path d="M 64 63 C 69 55 82 55 87 63 C 82 71 69 71 64 63 Z" fill="#fbf3e4"/>
  <circle cx="45" cy="63" r="5.5" fill="#1c1430"/><circle cx="76" cy="63" r="5.5" fill="#1c1430"/>
  <circle cx="47" cy="61" r="1.7" fill="#fbf3e4"/><circle cx="78" cy="61" r="1.7" fill="#fbf3e4"/>
  <path d="M 56 74 C 55 79 57 82 61 82" stroke="#b0604f" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <path d="M 50 92 C 56 97 66 97 71 91" stroke="#8e3a33" stroke-width="3" fill="none" stroke-linecap="round"/>
</g></g></svg>'''

BEA = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
<defs>{ROUGH}
<linearGradient id="bg" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#8fc98a"/><stop offset="55%" stop-color="#5aa87e"/><stop offset="100%" stop-color="#2f7a68"/></linearGradient>
<linearGradient id="hair" x1="0.2" y1="0" x2="0.9" y2="1"><stop offset="0%" stop-color="#3b2a2e"/><stop offset="60%" stop-color="#241a20"/><stop offset="100%" stop-color="#181119"/></linearGradient>
<linearGradient id="skin" x1="0.1" y1="0" x2="0.95" y2="1"><stop offset="0%" stop-color="#e5a87e"/><stop offset="55%" stop-color="#d4956d"/><stop offset="100%" stop-color="#b27452"/></linearGradient>
<clipPath id="c"><circle cx="60" cy="60" r="60"/></clipPath></defs>
<g clip-path="url(#c)"><rect width="120" height="120" fill="url(#bg)"/>
<g fill="#4d9a72" opacity=".55"><ellipse cx="18" cy="24" rx="22" ry="11" transform="rotate(-28 18 24)"/><ellipse cx="104" cy="18" rx="20" ry="10" transform="rotate(24 104 18)"/><ellipse cx="108" cy="46" rx="17" ry="9" transform="rotate(-14 108 46)"/></g>
<circle cx="96" cy="20" r="13" fill="#ffe9a8" opacity=".55"/>
<g filter="url(#r)">
  <path d="M 60 10 C 92 10 106 32 105 62 C 104 78 101 88 99 98 L 21 98 C 19 88 16 78 15 62 C 14 32 28 10 60 10 Z" fill="url(#hair)"/>
  <path d="M 88 74 C 104 78 110 94 108 112 L 94 112 C 96 96 92 84 84 78 Z" fill="url(#hair)"/>
  <path d="M 24 126 C 28 100 42 90 60 88 C 78 90 92 100 96 126 Z" fill="#f2e6cf"/>
  <path d="M 50 78 L 70 78 L 71 94 L 49 94 Z" fill="#b27452"/>
  <path d="M 60 24 C 84 24 96 42 96 64 C 96 90 80 106 60 106 C 40 106 24 90 24 64 C 24 42 36 24 60 24 Z" fill="url(#skin)"/>
  <path d="M 60 16 C 90 16 102 36 100 58 C 92 42 80 34 60 36 C 40 34 28 42 20 58 C 18 36 30 16 60 16 Z" fill="url(#hair)"/>
  <path d="M 30 30 C 42 20 62 18 76 24 C 60 22 42 24 32 34 Z" fill="#5a4048" opacity=".6"/>
</g>
<g filter="url(#r)">
  <ellipse cx="36" cy="76" rx="9" ry="5" fill="#c9605a" opacity=".3"/><ellipse cx="84" cy="76" rx="9" ry="5" fill="#c9605a" opacity=".3"/>
  <path d="M 33 50 C 39 45 50 45 56 49" stroke="#241a20" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 64 49 C 70 45 81 45 87 50" stroke="#241a20" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 34 64 C 39 57 51 57 56 64 C 51 70 39 70 34 64 Z" fill="#fbf3e4"/>
  <path d="M 64 64 C 69 57 81 57 86 64 C 81 70 69 70 64 64 Z" fill="#fbf3e4"/>
  <circle cx="45" cy="63" r="5.5" fill="#241a20"/><circle cx="75" cy="63" r="5.5" fill="#241a20"/>
  <circle cx="47" cy="61" r="1.8" fill="#fbf3e4"/><circle cx="77" cy="61" r="1.8" fill="#fbf3e4"/>
  <path d="M 56 74 C 55 79 57 82 61 82" stroke="#a86a4c" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <path d="M 45 89 C 53 100 69 100 76 87" stroke="#8e3a33" stroke-width="3.4" fill="none" stroke-linecap="round"/>
  <path d="M 49 92 C 55 98 67 98 72 90 Z" fill="#fbf3e4" opacity=".95"/>
</g></g></svg>'''

def css():
    def uri(s): return 'data:image/svg+xml;base64,' + base64.b64encode(s.encode()).decode()
    return (f'  .av-tala{{background-image:url("{uri(TALA)}")}}\n'
            f'  .av-bea{{background-image:url("{uri(BEA)}")}}\n')

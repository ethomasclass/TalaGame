"""Circular portraits. One per speaking character, built from a shared head so they
read as one cast at 34px in the phone thread and at 68px in the dialogue panel.
Bea has no scene presence by design; a portrait is the one place her face belongs."""
import base64

ROUGH = ('<filter id="r" x="-20%" y="-20%" width="140%" height="140%">'
         '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n"/>'
         '<feDisplacementMap in="SourceGraphic" in2="n" scale="2" xChannelSelector="R" yChannelSelector="G"/></filter>')

# One head, drawn straight on. Everything below is a swap on top of it.
FACE   = 'M 60 22 C 86 22 98 42 98 66 C 98 92 82 108 60 108 C 38 108 22 92 22 66 C 22 42 34 22 60 22 Z'
NECK   = 'M 50 78 L 70 78 L 71 94 L 49 94 Z'
SHOULD = 'M 22 126 C 26 100 40 90 60 88 C 80 90 94 100 98 126 Z'
HAIR_LONG  = 'M 60 8 C 96 8 112 32 111 68 C 110 90 106 104 103 118 L 17 118 C 14 104 10 90 9 68 C 8 32 24 8 60 8 Z'
HAIR_SHORT = 'M 60 11 C 90 11 102 32 101 58 C 100 68 99 74 98 80 L 22 80 C 21 74 20 68 19 58 C 18 32 30 11 60 11 Z'
FRINGES = {
  'straight':'M 60 14 C 92 14 105 36 103 60 C 95 44 82 36 68 37 C 56 30 42 34 30 46 C 24 52 21 60 20 68 C 14 38 28 14 60 14 Z',
  'side':    'M 60 16 C 90 16 102 36 100 58 C 92 42 80 34 60 36 C 40 34 28 42 20 58 C 18 36 30 16 60 16 Z',
  'crop':    'M 60 16 C 88 16 99 34 98 54 C 92 39 80 32 60 32 C 40 32 28 39 22 54 C 21 34 32 16 60 16 Z',
  'back':    'M 60 15 C 90 15 101 34 100 56 C 92 44 80 39 60 39 C 40 39 28 44 20 56 C 19 34 30 15 60 15 Z',
}
MOUTHS = {
  'smile':'<path d="M 50 91 C 56 97 66 97 71 90" stroke="{lip}" stroke-width="3" fill="none" stroke-linecap="round"/>',
  'wide' :'<path d="M 45 89 C 53 100 69 100 76 87" stroke="{lip}" stroke-width="3.4" fill="none" stroke-linecap="round"/>'
          '<path d="M 49 92 C 55 98 67 98 72 90 Z" fill="#fbf3e4" opacity=".95"/>',
  'level':'<path d="M 51 92 C 57 94 64 94 70 92" stroke="{lip}" stroke-width="3" fill="none" stroke-linecap="round"/>',
  'flat' :'<path d="M 51 92 L 70 92" stroke="{lip}" stroke-width="3" fill="none" stroke-linecap="round"/>',
}

def stops(a, b, c):
    return f'<stop offset="0%" stop-color="{a}"/><stop offset="55%" stop-color="{b}"/><stop offset="100%" stop-color="{c}"/>'

def face(*, bg, hair, skin, shirt, lip, blush, fringe='straight', long_hair=True,
         glasses=None, earrings=None, bun=None, streak=None, mouth='level', brow=None, bgextra='', extra=''):
    """bg/hair/skin are 3-tuples of gradient stops. Everything else is optional dressing."""
    brow = brow or hair[2]
    back = (f'<path d="M 96 62 C 110 78 114 104 110 126 L 96 126 C 100 104 96 80 88 66 Z" fill="url(#hair)"/>'
            if long_hair else '')
    bunp = f'<circle cx="60" cy="14" r="19" fill="url(#hair)"/><circle cx="60" cy="10" r="13" fill="{hair[0]}" opacity=".45"/>' if bun else ''
    strk = f'<path d="{streak}" fill="#b9b0a8" opacity=".72"/>' if streak else ''
    ear  = (f'<circle cx="21" cy="76" r="4.5" fill="{earrings}"/><circle cx="99" cy="76" r="4.5" fill="{earrings}"/>'
            if earrings else '')
    gls  = ('<g fill="none" stroke="{c}" stroke-width="3.2" opacity=".95">'
            '<rect x="27" y="54" width="30" height="21" rx="9"/><rect x="63" y="54" width="30" height="21" rx="9"/>'
            '<path d="M 57 63 L 63 63"/><path d="M 27 62 L 20 66"/><path d="M 93 62 L 100 66"/></g>').format(c=glasses) if glasses else ''
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
<defs>{ROUGH}
<linearGradient id="bg" x1="0" y1="0" x2="0.55" y2="1">{stops(*bg)}</linearGradient>
<linearGradient id="hair" x1="0.2" y1="0" x2="0.9" y2="1">{stops(*hair)}</linearGradient>
<linearGradient id="skin" x1="0.1" y1="0" x2="0.95" y2="1">{stops(*skin)}</linearGradient>
<clipPath id="c"><circle cx="60" cy="60" r="60"/></clipPath></defs>
<g clip-path="url(#c)"><rect width="120" height="120" fill="url(#bg)"/>{bgextra}
<g filter="url(#r)">
  {back}{bunp}
  <path d="{HAIR_LONG if long_hair else HAIR_SHORT}" fill="url(#hair)"/>
  <path d="{SHOULD}" fill="{shirt}"/>
  <path d="{NECK}" fill="{skin[2]}"/>
  <path d="{FACE}" fill="url(#skin)"/>
  <path d="{FRINGES[fringe]}" fill="url(#hair)"/>{strk}
</g>
<g filter="url(#r)">
  <ellipse cx="36" cy="76" rx="9" ry="5" fill="{blush}" opacity=".3"/><ellipse cx="84" cy="76" rx="9" ry="5" fill="{blush}" opacity=".3"/>
  {ear}
  <path d="M 33 51 C 39 46 50 46 56 50" stroke="{brow}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 64 50 C 70 46 81 46 87 51" stroke="{brow}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 34 64 C 39 57 51 57 56 64 C 51 70 39 70 34 64 Z" fill="#fbf3e4"/>
  <path d="M 64 64 C 69 57 81 57 86 64 C 81 70 69 70 64 64 Z" fill="#fbf3e4"/>
  <circle cx="45" cy="63" r="5.5" fill="{hair[2]}"/><circle cx="75" cy="63" r="5.5" fill="{hair[2]}"/>
  <circle cx="47" cy="61" r="1.8" fill="#fbf3e4"/><circle cx="77" cy="61" r="1.8" fill="#fbf3e4"/>
  <path d="M 56 74 C 55 79 57 82 61 82" stroke="{skin[2]}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  {MOUTHS[mouth].format(lip=lip)}
  {gls}{extra}
</g></g></svg>'''

DARK  = ('#3b2a2e', '#241a20', '#181119')
PLUM  = ('#3a2b55', '#261c3c', '#1a1330')
GREY  = ('#6f6259', '#544a44', '#3a332f')
BROWN = ('#8a6a44', '#6d5133', '#4a3722')
TAN   = ('#e5a87e', '#d4956d', '#b27452')
WARM  = ('#e8a184', '#d98e77', '#b96d5e')
PALE  = ('#f0c3a4', '#e0ac8d', '#c08b6e')
OLIVE = ('#dfa87c', '#c9906a', '#a5714f')

# Bea's window is the sunny one. Everyone else is standing in a New Jersey December.
BEA_BG = ('<g fill="#4d9a72" opacity=".55"><ellipse cx="18" cy="24" rx="22" ry="11" transform="rotate(-28 18 24)"/>'
          '<ellipse cx="104" cy="18" rx="20" ry="10" transform="rotate(24 104 18)"/>'
          '<ellipse cx="108" cy="46" rx="17" ry="9" transform="rotate(-14 108 46)"/></g>'
          '<circle cx="96" cy="20" r="13" fill="#ffe9a8" opacity=".55"/>')

AVATARS = {
  'tala':  face(bg=('#f3bda9','#e0a49f','#d9979a'), hair=PLUM,  skin=WARM,  shirt='#2e5fd9', lip='#8e3a33', blush='#c05b58', fringe='straight'),
  'bea':   face(bg=('#8fc98a','#5aa87e','#2f7a68'), hair=DARK,  skin=TAN,   shirt='#f2e6cf', lip='#8e3a33', blush='#c9605a', fringe='side', mouth='wide', bgextra=BEA_BG),
  'ma':    face(bg=('#d98a72','#b8604f','#8e4038'), hair=DARK,  skin=OLIVE, shirt='#a33b34', lip='#8e3a33', blush='#c05b58', fringe='back', earrings='#e0b04a', mouth='level'),
  'pa':    face(bg=('#7d9aa5','#4f7280','#33505d'), hair=GREY,  skin=OLIVE, shirt='#f0ead9', lip='#8a4a3e', blush='#b8695c', fringe='crop', long_hair=False, glasses='#2a2320', mouth='flat'),
  'ando':  face(bg=('#e7bf6c','#cf9a3f','#a8752a'), hair=DARK,  skin=OLIVE, shirt='#f0ead9', lip='#8a4a3e', blush='#c0705c', fringe='crop', long_hair=False, mouth='smile'),
  'hannah':face(bg=('#bcc9e8','#93a3ce','#6b7bab'), hair=BROWN, skin=PALE,  shirt='#e8e2d2', lip='#a85a4e', blush='#d1857a', fringe='side', mouth='smile'),
  'tita':  face(bg=('#c3a5d4','#9a76b5','#6d4c8c'), hair=GREY,  skin=OLIVE, shirt='#c96a8e', lip='#8e3a33', blush='#c05b58', fringe='back', bun=True, glasses='#7a5a2a',
               earrings='#e0b04a', mouth='smile', streak='M 26 52 C 34 38 48 32 62 33 C 46 36 34 44 27 58 Z'),
  # Not a monster. An ordinary customer on an ordinary Thursday, in a colder palette than the family.
  'customer': face(bg=('#c8c6bc','#a4a299','#7e7d76'), hair=('#b09472','#96795a','#6f5a41'), skin=('#f2d0b8','#e3bda4','#c39c83'),
                   shirt='#8b8f96', lip='#a86a62', blush='#c99a90', fringe='side', mouth='flat'),
  'clerk': face(bg=('#8aab7e','#5d8659','#3d5f42'), hair=DARK, skin=OLIVE, shirt='#3f6fa8', lip='#8a4a3e', blush='#c0705c',
                fringe='crop', long_hair=False, mouth='level'),
}

def css():
    def uri(s): return 'data:image/svg+xml;base64,' + base64.b64encode(s.encode()).decode()
    return ''.join(f'  .av-{k}{{background-image:url("{uri(v)}")}}\n' for k, v in AVATARS.items())

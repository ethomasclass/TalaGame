"""The top-down cooking layer: the frozen base scene plus an overlay SVG that carries
every dish dressing and every draggable item as a direct child. Nothing is spliced
into the base any more; each piece is checked for balanced groups before it goes in."""
import re, importlib, sys
sys.path.insert(0, 'tools'); s2 = importlib.import_module('scene2-layers'); s5 = importlib.import_module('scene5-layers')

def balanced(name, s):
    o = len(re.findall(r'<g[\s>]', s)); c = s.count('</g>')
    assert o == c, f'{name}: {o} <g> vs {c} </g>'
    return s

DISH_PANCIT = balanced('pancit', '''  <g id="dish-pancit" hidden>
    <g filter="url(#td-rough)">
      <circle cx="470" cy="385" r="152" fill="#2e3140"/><circle cx="470" cy="385" r="136" fill="#1c1e28"/>
      <circle cx="470" cy="385" r="118" fill="#e0b565"/>
      <g stroke="#c9963f" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8">
        <path d="M 372 372 C 410 330 470 350 500 320 C 530 300 560 330 566 366"/><path d="M 380 420 C 420 380 480 410 520 380 C 550 360 570 400 556 440"/>
        <path d="M 400 460 C 440 430 500 470 540 448"/><path d="M 366 400 C 400 440 440 400 470 470"/><path d="M 470 290 C 490 330 460 360 500 420 C 520 450 480 470 450 480"/>
      </g>
      <g fill="#8fae87"><ellipse cx="430" cy="360" rx="14" ry="7" transform="rotate(-20 430 360)"/><ellipse cx="510" cy="420" rx="14" ry="7" transform="rotate(15 510 420)"/><ellipse cx="470" cy="450" rx="12" ry="6"/></g>
      <g fill="#e07a4a"><ellipse cx="500" cy="350" rx="12" ry="7" transform="rotate(30 500 350)"/><ellipse cx="420" cy="430" rx="12" ry="7" transform="rotate(-25 420 430)"/></g>
      <path d="M 622 385 L 700 385" stroke="#1c1e28" stroke-width="18" stroke-linecap="round"/>
    </g>
  </g>
''')

DISH_TSOKOLATE = balanced('tsokolate', '''  <g id="dish-tsokolate" hidden>
    <g filter="url(#td-rough)">
      <circle cx="470" cy="385" r="152" fill="url(#td-potBody)"/><circle cx="470" cy="385" r="132" fill="#2a1a14"/>
      <circle cx="470" cy="385" r="120" fill="#4a2a1c"/><circle id="tsok-froth" cx="470" cy="385" r="120" fill="#7a5238" opacity="0"/>
      <g id="tsok-bubbles" opacity="0" fill="#a8785a"><circle cx="420" cy="350" r="6"/><circle cx="500" cy="340" r="5"/><circle cx="530" cy="400" r="7"/><circle cx="440" cy="430" r="5"/><circle cx="480" cy="395" r="4"/><circle cx="400" cy="400" r="4"/></g>
      <ellipse cx="450" cy="340" rx="50" ry="22" fill="#fff" opacity=".08"/>
      <rect x="296" y="372" width="34" height="26" rx="12" fill="#2b3358"/><rect x="610" y="372" width="34" height="26" rx="12" fill="#2b3358"/>
      <g transform="rotate(-38 560 300)"><rect x="470" y="292" width="200" height="14" rx="7" fill="#7a4a2a"/><rect x="462" y="280" width="40" height="40" rx="8" fill="#5a3418"/><g stroke="#3a2010" stroke-width="2" opacity=".6"><path d="M 470 288 L 470 312"/><path d="M 480 284 L 480 316"/><path d="M 490 288 L 490 312"/></g></g>
    </g>
    <g filter="url(#td-rough)"><ellipse cx="800" cy="236" rx="80" ry="50" fill="#000" opacity=".22" transform="translate(8 10)"/><ellipse cx="800" cy="236" rx="80" ry="50" fill="url(#td-cream)"/>
      <g fill="#3a2010"><circle cx="770" cy="228" r="18"/><circle cx="822" cy="244" r="18"/></g><g fill="#5a3418" opacity=".8"><circle cx="770" cy="228" r="10"/><circle cx="822" cy="244" r="10"/></g></g>
    <g filter="url(#td-rough)" transform="translate(960 470)"><ellipse cx="0" cy="6" rx="52" ry="52" fill="#000" opacity=".22" transform="translate(8 10)"/><circle r="50" fill="#e9dfc8"/><circle r="38" fill="#3a2010"/><path d="M 50 -10 C 76 -10 76 24 50 24" stroke="#e9dfc8" stroke-width="10" fill="none"/></g>
  </g>
''')

DRAGS = balanced('drags', '''  <g id="drag-egg" hidden style="cursor:grab"><g class="hand"><circle cx="700" cy="440" r="30" fill="#000" opacity=".25" transform="translate(6 12)"/><circle cx="700" cy="440" r="28" fill="#f7f1e2" stroke="#fff3d6" stroke-width="4"/><circle cx="700" cy="440" r="15" fill="#e8892b"/></g></g>
  <g id="drag-vin" hidden style="cursor:grab"><g transform="translate(1040 560)"><g class="hand">
    <g class="cane"><rect x="-24" y="-74" width="48" height="148" rx="10" fill="#000" opacity=".25" transform="translate(8 12)"/><rect x="-24" y="-74" width="48" height="148" rx="10" fill="#e9dfc8" stroke="#fff3d6" stroke-width="3"/><rect x="-18" y="-36" width="36" height="66" rx="4" fill="#2f6fd6"/><rect x="-14" y="-28" width="28" height="12" fill="#f4c65a"/><rect x="-10" y="-88" width="20" height="18" rx="4" fill="#3b3b3b"/></g>
    <g class="chain" hidden><rect x="-40" y="-70" width="80" height="140" rx="12" fill="#000" opacity=".25" transform="translate(8 12)"/><rect x="-40" y="-70" width="80" height="140" rx="12" fill="#f4f6f8" stroke="#fff3d6" stroke-width="3"/><rect x="-30" y="-30" width="60" height="50" rx="3" fill="#dfe3ea"/><rect x="-14" y="-86" width="28" height="20" rx="5" fill="#c9cfd8"/></g>
    <path id="vin-stream" d="M 0 -78 C -6 -40 -8 0 -4 60" stroke="#e8e2c4" stroke-width="6" fill="none" stroke-linecap="round" opacity="0"/>
  </g></g></g>
  <g id="drag-tube" hidden style="cursor:grab"><g transform="translate(780 330)"><g class="hand">
    <rect x="-80" y="-14" width="160" height="28" rx="14" fill="#000" opacity=".25" transform="translate(8 12)"/>
    <rect x="-80" y="-14" width="160" height="28" rx="14" fill="url(#p-bamboo)" stroke="#fff3d6" stroke-width="3"/>
    <rect id="tube-fill" x="-78" y="-11" width="0" height="22" rx="11" fill="#5a3a7c"/>
    <g stroke="#8f7c4c" stroke-width="2" opacity=".7"><path d="M -30 -14 L -30 14"/><path d="M 30 -14 L 30 14"/></g>
  </g></g></g>
  <g id="drag-tablea" hidden style="cursor:grab"><g transform="translate(700 440)"><g class="hand"><circle r="26" fill="#000" opacity=".25" transform="translate(6 12)"/><circle r="24" fill="#3a2010" stroke="#fff3d6" stroke-width="3"/><circle r="13" fill="#5a3418"/></g></g></g>
''')

def assemble(src):
    base = src[src.index('  <div class="layer" id="cook" hidden>'):src.index('  <div class="vig"></div>')]
    base = base.replace('<div class="cardwrap"><div class="card">', '<div class="cardwrap" id="cardwrap"><div class="card">')
    base = base.replace('<circle cx="470" cy="385" r="96" fill="url(#td-batter)"/>',
        '<circle cx="470" cy="385" r="96" fill="url(#td-batter)"/><circle id="batter-set" cx="470" cy="385" r="96" fill="#e9cf96" opacity="0"/><circle id="batter-brown" cx="470" cy="385" r="96" fill="#b97a3c" opacity="0"/><g id="egg-on" hidden><circle cx="470" cy="378" r="22" fill="#f7f1e2"/><circle cx="470" cy="378" r="12" fill="#e8892b"/><circle cx="500" cy="404" r="18" fill="#f7f1e2"/><circle cx="500" cy="404" r="10" fill="#e8892b"/></g>')
    a = base.index('  <!-- ===== salted egg, sliced, and a block of cheese ===== -->'); z = base.index('  <!-- ===== banana leaf, bottom-right ===== -->')
    base = base[:a] + '  <g id="prop-eggs">\n' + base[a:z] + '  </g>\n' + base[z:]
    assert 'batter-set' in base and 'prop-eggs' in base and 'id="cardwrap"' in base
    # sauce overlay for the adobo lives inside its dressing
    adobo = s2.ADOBO.replace('<ellipse cx="450" cy="340" rx="50" ry="22" fill="#fff" opacity=".08"/>', '<ellipse cx="450" cy="340" rx="50" ry="22" fill="#fff" opacity=".08"/><circle id="sauce-vin" cx="470" cy="385" r="120" fill="#c98a4a" opacity="0"/>')
    balanced('adobo', adobo)
    puto = s5.puto(base)
    puto_defs = puto[:puto.index('  <g id="dish-puto" hidden>')]; puto_body = balanced('puto', puto[puto.index('  <g id="dish-puto" hidden>'):])
    overlay = ('<svg class="overlay" width="1280" height="720" viewBox="0 0 1280 720" style="position:absolute;left:0;top:0">\n'
               + puto_defs + adobo + DISH_PANCIT + puto_body + DISH_TSOKOLATE + DRAGS + '</svg>\n')
    k = base.index('</svg>') + len('</svg>')
    out = base[:k] + '\n' + overlay + base[k:]
    for i in ['dish-adobo','dish-pancit','dish-puto','dish-tsokolate','drag-egg','drag-vin','drag-tube','drag-tablea','sauce-vin','vin-cane','vin-chain','tube-fill','tsok-froth']:
        assert out.count(f'id="{i}"') == 1, i
    return out

#!/usr/bin/env python3
"""Assemble game/nine-mornings.html (and the artifact variant) from the sample sheets."""
import re, pathlib, sys
sys.path.insert(0,"tools"); import importlib; s2 = importlib.import_module("scene2-layers"); s5 = importlib.import_module("scene5-layers")
S = pathlib.Path('assets/samples'); G = pathlib.Path('game'); G.mkdir(exist_ok=True)
FONT = open('assets/fonts/caveat-embed.css').read()

def prefix_ids(svg, pre):
    ids = set(re.findall(r'\bid="([^"]+)"', svg))
    for i in sorted(ids, key=len, reverse=True):
        svg = svg.replace(f'id="{i}"', f'id="{pre}{i}"').replace(f'url(#{i})', f'url(#{pre}{i})').replace(f'href="#{i}"', f'href="#{pre}{i}"')
    return svg

# ---------------- dining layer (scene 4) ----------------
src = open(G/'base-layers.html').read()            # frozen dining + cook layers from the first build
dining = src[src.index('  <div class="layer" id="dining">'):src.index('  <!-- ================= COOKING ================= -->')]
cook   = src[src.index('  <div class="layer" id="cook" hidden>'):src.index('  <div class="vig"></div>')]
# cook : add a pancit dressing on top of the bibingka pot (a wok ring + noodles), toggled by id
cook = cook.replace('<div class="cardwrap"><div class="card">', '<div class="cardwrap" id="cardwrap"><div class="card">')
if 'dish-pancit' not in cook: cook = cook.replace('  <circle cx="470" cy="385" r="126" fill="none" stroke="#fff3d6" stroke-width="4" stroke-dasharray="14 12" class="target"/>',
'''  <g id="dish-pancit" hidden>
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
  <circle cx="470" cy="385" r="126" fill="none" stroke="#fff3d6" stroke-width="4" stroke-dasharray="14 12" class="target"/>''')

# ---------------- restaurant layer (scene 3) ----------------
r = open(S/'scene-restaurant.html').read()
rsvg = r[r.index('<svg width="1280"'):r.index('</svg></div>')+len('</svg>')]
rsvg = prefix_ids(rsvg, 'r-')
# expression hooks on Ma and Tala ; motion groups get ids ; the talk group becomes engine-driven
rsvg = rsvg.replace('<g filter="url(#r-roughFine)"><use href="#r-ma-brows-soft"/><g class="blink" style="transform-origin:150px 196px"><use href="#r-ma-eyes-held"/></g>\n          <g class="talk"><g class="m-a"><use href="#r-ma-mouth-polite"/></g><g class="m-b"><use href="#r-ma-mouth-open"/></g></g></g>',
 '<g filter="url(#r-roughFine)"><use id="x-rma-brows" href="#r-ma-brows-soft"/><g class="blink" style="transform-origin:150px 196px"><use id="x-rma-eyes" href="#r-ma-eyes-open"/></g>\n          <g class="talkgrp" id="talk-rma"><g class="m-a"><use id="x-rma-mouth" href="#r-ma-mouth-level"/></g><g class="m-b"><use href="#r-ma-mouth-open"/></g></g></g>')
rsvg = rsvg.replace('<g class="nod"><use href="#r-ma-head"/>', '<g class="nod" id="mo-rma-nod"><use href="#r-ma-head"/>')
rsvg = rsvg.replace('<g class="pour"><use href="#r-ma-arm-pitcher"/>', '<g class="pour" id="mo-rma-pour"><use href="#r-ma-arm-pitcher"/>')
rsvg = rsvg.replace('<g filter="url(#r-roughFine)"><use href="#r-tala-brows-knit"/><g class="blink b" style="transform-origin:140px 168px"><use href="#r-tala-eyes-narrow"/></g><use href="#r-tala-mouth-pressed"/></g>',
 '<g filter="url(#r-roughFine)"><use id="x-rtala-brows" href="#r-tala-brows-flat"/><g class="blink b" style="transform-origin:140px 168px"><use id="x-rtala-eyes" href="#r-tala-eyes-open"/></g><use id="x-rtala-mouth" href="#r-tala-mouth-small"/></g>')
assert 'x-rma-brows' in rsvg and 'mo-rma-pour' in rsvg and 'x-rtala-brows' in rsvg and 'talk-rma' in rsvg
rcss = r[r.index('  /* ---------- movement beyond eyes ---------- */'):r.index('  .hud{')]
rcss = rcss.replace('.nod{transform-origin:150px 300px;animation:nod 7s ease-in-out infinite}', '.nod{transform-origin:150px 300px}.nod.go{animation:nod 1.6s ease-in-out 1}')
rcss = rcss.replace('@keyframes nod{0%,70%,100%{transform:rotate(0) translateY(0)}76%{transform:rotate(1.6deg) translateY(4px)}82%{transform:rotate(-.6deg) translateY(1px)}88%{transform:rotate(1.2deg) translateY(3px)}}',
                    '@keyframes nod{0%,100%{transform:rotate(0) translateY(0)}25%{transform:rotate(1.6deg) translateY(4px)}50%{transform:rotate(-.6deg) translateY(1px)}75%{transform:rotate(1.2deg) translateY(3px)}}')
rcss = rcss.replace('.pour{transform-origin:236px 372px;animation:pour 7s ease-in-out infinite}', '.pour{transform-origin:236px 372px}.pour.go{animation:pour 3s ease-in-out 1}')
rcss = rcss.replace('@keyframes pour{0%,20%{transform:rotate(0)}38%,62%{transform:rotate(-26deg)}80%,100%{transform:rotate(0)}}', '@keyframes pour{0%{transform:rotate(0)}30%,70%{transform:rotate(-26deg)}100%{transform:rotate(0)}}')
rcss = rcss.replace('.stream{animation:stream 7s ease-in-out infinite}', '.pour.go .stream{animation:stream 3s ease-in-out 1}')
rcss = rcss.replace('@keyframes stream{0%,34%{opacity:0}42%,58%{opacity:.85}66%,100%{opacity:0}}', '@keyframes stream{0%,24%{opacity:0}34%,66%{opacity:.85}76%,100%{opacity:0}}')
rcss = rcss.replace('.talk .m-a{animation:talk .28s steps(1,end) infinite}.talk .m-b{animation:talkB .28s steps(1,end) infinite}',
                    '.m-b{opacity:0}.talkgrp.talking .m-a{animation:talk .26s steps(1,end) infinite}.talkgrp.talking .m-b{animation:talkB .26s steps(1,end) infinite}')
rcss = rcss.replace('.blink{animation:blink 5s ease-in-out infinite}.blink.b{animation-delay:-1.7s;animation-duration:6.1s}\n', '')
rcss = rcss.replace('.breathe{animation:breathe 3.8s ease-in-out infinite}\n', '')
rcss = rcss.replace('@keyframes flicker{0%,100%{opacity:.62}50%{opacity:.74}} .lamp{animation:flicker 2.2s ease-in-out infinite}', '.r-lamp{animation:flicker 2.2s ease-in-out infinite}')
rsvg = rsvg.replace('class="lamp"', 'class="r-lamp"')

# ---------------- scene 2 layers ----------------
dining_defs = dining[dining.index('      <defs>'):dining.index('      </defs>')+len('      </defs>')].replace('      <defs>','  <defs>').replace('      </defs>','  </defs>')
school_svg  = s2.school(dining_defs)
kitchen_svg = s2.kitchen(dining_defs)
street_svg  = s2.street()
if 'dish-adobo' not in cook: cook = cook.replace('  <g id="dish-pancit" hidden>', s2.ADOBO + '  <g id="dish-pancit" hidden>')
assert 'dish-adobo' in cook
if 'prop-eggs' not in cook:
    a=cook.index('  <!-- ===== salted egg, sliced, and a block of cheese ===== -->'); z=cook.index('  <!-- ===== banana leaf, bottom-right ===== -->')
    cook = cook[:a] + '  <g id="prop-eggs">\n' + cook[a:z] + '  </g>\n' + cook[z:]
assert 'prop-eggs' in cook
if 'batter-set' not in cook:
    cook = cook.replace('<circle cx="470" cy="385" r="96" fill="url(#td-batter)"/>',
      '<circle cx="470" cy="385" r="96" fill="url(#td-batter)"/><circle id="batter-set" cx="470" cy="385" r="96" fill="#e9cf96" opacity="0"/><circle id="batter-brown" cx="470" cy="385" r="96" fill="#b97a3c" opacity="0"/><g id="egg-on" hidden><circle cx="470" cy="378" r="22" fill="#f7f1e2"/><circle cx="470" cy="378" r="12" fill="#e8892b"/><circle cx="500" cy="404" r="18" fill="#f7f1e2"/><circle cx="500" cy="404" r="10" fill="#e8892b"/></g>')
    # the draggable egg slice sits on the plate until picked up
    cook = cook.replace('  <g id="dish-pancit" hidden>', '''  <g id="drag-egg" hidden style="cursor:grab"><g class="hand"><circle cx="800" cy="248" r="30" fill="#000" opacity=".25" transform="translate(6 12)"/><circle cx="800" cy="248" r="28" fill="#f7f1e2" stroke="#fff3d6" stroke-width="4"/><circle cx="800" cy="248" r="15" fill="#e8892b"/></g></g>
  <g id="dish-pancit" hidden>''')
assert 'batter-set' in cook and 'drag-egg' in cook
# ---------------- scene 5 layers ----------------
hall_svg = s5.hall(dining_defs)
dawn_svg = s5.dawn()
if 'dish-puto' not in cook: cook = cook.replace('  <g id="dish-pancit" hidden>', s5.puto(cook) + '  <g id="dish-pancit" hidden>')
assert 'dish-puto' in cook
# ---------------- alarm layer ----------------
alarm = '''  <div class="layer" id="alarm" hidden>
    <svg width="1280" height="720" viewBox="0 0 1280 720">
      <rect width="1280" height="720" fill="#0d0b12"/>
      <ellipse cx="900" cy="560" rx="260" ry="200" fill="#5a6fb0" opacity=".25" filter="url(#soft)"/>
      <rect x="820" y="470" width="150" height="70" rx="10" fill="#1e2230"/><rect x="828" y="478" width="134" height="54" rx="7" fill="#c9d6ff"/>
      <text x="895" y="516" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="30" font-weight="500" fill="#1e2230">4:10</text>
      <g transform="translate(300 150) scale(1.15)"><g class="breathe">
        <use href="#tala-base"/>
        <g filter="url(#roughFine)"><use href="#tala-strand"/><use href="#tala-brows-flat"/><g class="blink" style="transform-origin:140px 168px"><use href="#tala-eyes-heavy"/></g><use href="#tala-mouth-small"/></g>
      </g></g>
      <rect width="1280" height="720" fill="#5a6fb0" opacity=".12" style="mix-blend-mode:screen"/>
    </svg>
  </div>
'''

# ---------------- page ----------------
head_css = src[src.index('  :root{--paper'):src.index('</style>')].replace('.line.stage{','.line.sd{')
html = f'''<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Nine Mornings</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,ital,wght@9..144,0,400;9..144,0,600;9..144,1,400&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
{FONT}
{head_css}
{rcss}
  .choices.mid{{right:auto;left:50%;bottom:120px;transform:translateX(-50%);width:520px}}
  .layer.off{{visibility:hidden;pointer-events:none}}
  #hot{{pointer-events:none}} #hot circle{{pointer-events:auto;cursor:pointer;fill:#fff3d6;fill-opacity:0;stroke:#fff3d6;stroke-opacity:.0}}
  #hot .dot{{pointer-events:none;fill:#fff3d6;fill-opacity:.85;animation:hotpulse 2.2s ease-in-out infinite}} @keyframes hotpulse{{0%,100%{{r:4}}50%{{r:6}}}}
  .line.look{{color:#54594a;font-style:italic}} .role{{color:#8d8873;font-weight:400;letter-spacing:.08em}}
  .aside{{font-family:"Fraunces",Georgia,serif;font-style:italic;font-size:19px;color:#6d5a3f;margin:8px 0 0;padding-left:14px;border-left:2px solid rgba(168,114,31,.45)}}
  .cardwrap.dragmode .card{{opacity:.45}} #cook.dragging{{cursor:grabbing}} #drag-egg{{transition:transform .08s linear}}
  html,body{{touch-action:manipulation;-webkit-tap-highlight-color:transparent}}
  .line{{font-size:27px}} .who{{font-size:13px}} .ch{{font-size:21px;padding:12px 16px}} .prompt{{font-size:22px}} .hud{{font-size:14px}}
  #phone{{width:470px}} .bub{{font-size:19px;padding:10px 14px;max-width:86%}} .rp{{font-size:16px;padding:10px 14px}} .ptop{{font-size:13px}} .cardscreen .hint{{font-size:14px}}
  #rotate{{position:fixed;inset:0;z-index:99;display:none;place-items:center;background:#120c0a;color:#ece7d6;text-align:center;padding:32px;font-family:"Fraunces",Georgia,serif}}
  #rotate h2{{font-weight:600;font-size:28px;margin:0 0 10px}} #rotate p{{color:#bdb8a4;font-size:17px;margin:0;max-width:30ch}}
  #rotate svg{{width:72px;height:72px;margin-bottom:18px;animation:turn 2.4s ease-in-out infinite}}
  @keyframes turn{{0%,20%{{transform:rotate(0)}}50%,70%{{transform:rotate(90deg)}}100%{{transform:rotate(90deg)}}}}
  @media (orientation:portrait) and (max-width:900px){{#rotate{{display:grid}}}}
  @media (prefers-reduced-motion:reduce){{*{{animation:none!important;transition:none!important}}}}
  .cardscreen .tap{{display:none}} @media (pointer:coarse){{.cardscreen .hint{{display:none}}.cardscreen .tap{{display:block;font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:14px;letter-spacing:.1em;color:#8d8873}}}}
  .dq{{font-family:"Fraunces",Georgia,serif;font-size:19px;line-height:1.5;color:#d8d2c0;padding-left:24px;margin:0 0 26px}} .dq li{{margin-bottom:14px}}
  #sunrise{{opacity:0;transition:opacity 4.5s ease}} #sun,#sunhalo{{transform:translateY(150px);transition:transform 5.5s ease-out}}
  #dawn.sunrise #sunrise{{opacity:1}} #dawn.sunrise #sun,#dawn.sunrise #sunhalo{{transform:translateY(0)}}
  #dawn.sunrise svg{{filter:saturate(1.15) brightness(1.08);transition:filter 4s ease}}
  .alarmtxt{{position:absolute;left:44px;top:70px;z-index:7;color:#ece7d6;font-family:"Fraunces",Georgia,serif}}
  .alarmtxt .t{{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#dba748;margin-bottom:10px}}
  .alarmtxt h2{{font-weight:600;font-size:40px;margin:0 0 8px;letter-spacing:-.01em}}
  .alarmtxt p{{font-size:20px;color:#bdb8a4;margin:0;max-width:40ch;line-height:1.45}}
</style></head><body>
<div id="viewport"><div class="stage" id="stage">
{dining}
  <div class="layer" id="rest" hidden>
{rsvg}
  </div>
  <div class="layer" id="school" hidden>{school_svg}</div>
  <div class="layer" id="street" hidden>{street_svg}</div>
  <div class="layer" id="kitchen" hidden>{kitchen_svg}</div>
  <div class="layer" id="hall" hidden>{hall_svg}</div>
  <div class="layer" id="dawn" hidden>{dawn_svg}</div>
{cook}
{alarm}
  <div class="alarmtxt" id="alarmtxt" hidden><div class="t">December 21 &middot; 4:10 a.m.</div><h2>The sixth morning.</h2><p>Four hours after close. The alarm. Nobody else is awake to see whether she gets up.</p></div>
  <svg id="hot" class="layer" width="1280" height="720" viewBox="0 0 1280 720" style="z-index:5"></svg>
  <div class="vig"></div><div class="grain"></div><div id="dim"></div>
  <div class="hud" id="hud">
    <div><span class="date" id="hud-date"></span><span class="sub" id="hud-sub"></span></div>
    <div class="marks" id="marks"></div>
  </div>
  <div class="dlg" id="dlg"><div class="panel" id="panel">
    <div class="who" id="who"></div><p class="line" id="line"></p><p class="aside" id="aside" hidden></p>
    <div class="adv" id="adv"><span>&larr; &rarr;</span><span>Enter</span></div>
  </div></div>
  <div class="choices" id="choices" hidden></div>
  <div id="phone"><div class="screen">
    <div class="ptop"><b>Bea</b><span id="ptime"></span></div>
    <div class="bubs" id="bubs"></div>
    <div class="replies" id="replies"></div>
  </div></div>
  <div class="cardscreen on" id="title">
    <div><div class="eyebrow">Nine Mornings &middot; playable slice &middot; scenes 2 to 4</div><h1>Nine Mornings</h1>
    <p>December 18. Third morning. A cousin lands on a Tuesday and works Tuesday night.</p>
    <div class="tap">Tap to begin &nbsp;&middot;&nbsp; tap the text to advance &nbsp;&middot;&nbsp; tap a choice to pick it</div>
    <div class="hint"><span>Enter</span> to begin &nbsp;&middot;&nbsp; <span>&larr; &rarr;</span> advance &nbsp;&middot;&nbsp; <span>&uarr; &darr;</span> choose &nbsp;&middot;&nbsp; <span>D</span> dev state</div></div>
  </div>
  <div class="cardscreen" id="inter">
    <div><div class="eyebrow" id="inter-e"></div><h1 id="inter-h"></h1><p id="inter-p"></p><div class="hint" id="inter-hint">&nbsp;</div></div>
  </div>
  <div class="cardscreen" id="debrief">
    <div style="max-width:760px;text-align:left"><div class="eyebrow">Debrief</div><h1 style="font-size:40px">Before you close the laptop</h1>
    <ol class="dq">
      <li>The Ramos family shows up twice in the data: as workers the United States gained, and as workers the Philippines lost. Both numbers are true. Which one describes what actually happened to them?</li>
      <li>Rey Ramos was a licensed pharmacist for eleven years. He cooks now, and he is good at it. What did the Philippines lose when he left, and what did the United States fail to gain?</li>
      <li>The money the Ramoses wired home helped pay for the nursing program that is taking Bea out of her town. Are remittances holding that place together or hollowing it out? Argue the side you did not pick.</li>
      <li>Show of hands on the four wishes. Why did the room split the way it did?</li>
    </ol>
    <div class="tap">Tap to continue</div><div class="hint"><span>Enter</span> to continue</div></div>
  </div>
  <div class="cardscreen" id="end">
    <div><div class="eyebrow">End of slice</div><h1 id="end-h"></h1><p id="end-p"></p>
    <div class="tap">Tap to play again</div><div class="hint"><span>R</span> restart</div></div>
  </div>
  <div id="dev" hidden></div>
</div></div>
<div id="rotate"><div><svg viewBox="0 0 72 72" fill="none" stroke="#dba748" stroke-width="3"><rect x="20" y="8" width="32" height="56" rx="6"/><circle cx="36" cy="56" r="2.5" fill="#dba748"/></svg><h2>Turn your phone sideways</h2><p>Nine Mornings plays in landscape, like a kitchen counter.</p></div></div>

<script>
{open('tools/game-engine.js').read()}
</script>
</body></html>
'''
open(G/'nine-mornings.html','w').write(html)
# artifact variant : no document wrapper
art = html.replace('<!doctype html><html lang="en"><head><meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n','').replace('</head><body>\n','').replace('</body></html>\n','')
open(G/'nine-mornings-artifact.html','w').write(art)
print('built', len(html)//1024, 'KB')

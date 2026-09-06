// ---------------- state (from the spec) ----------------
const STATE = { mornings:[1,2,3,4,5], honesty:0, invitedHannah:false, cook:{} };
const $ = id => document.getElementById(id);

// ---------------- expressions + motion ----------------
const X = {
  tala:{ neutral:['brows-neutral','eyes-open','mouth-neutral'], quiet:['brows-flat','eyes-open','mouth-small'],
         wince:['brows-knit','eyes-narrow','mouth-pressed'], tired:['brows-flat','eyes-heavy','mouth-small'], smile:['brows-up','eyes-squint','mouth-smile'] },
  ma:{ neutral:['brows-soft','eyes-open','mouth-level'], held:['brows-soft','eyes-held','mouth-polite'],
       counting:['brows-knit','eyes-down','mouth-pressed'], warm:['brows-up','eyes-warm','mouth-smile'] },
  pa:{ neutral:['brows-straight','eyes-open','mouth-neutral'], down:['brows-low','eyes-down','mouth-flat'], soft:['brows-straight','eyes-open','mouth-small-smile'] }
};
// which layer's hooks an expression lands on
const HOOKS = { dining:{tala:['x-tala','tala-'], ma:['x-ma','ma-'], pa:['x-pa','pa-']},
                rest:{tala:['x-rtala','r-tala-'], ma:['x-rma','r-ma-']} };
let bg = 'dining';
function setExpr(who, name){
  const h = HOOKS[bg] && HOOKS[bg][who]; if(!h) return;
  const [b,e,m] = X[who][name]; const [id,pre] = h;
  $(id+'-brows').setAttribute('href', '#'+pre+b); $(id+'-eyes').setAttribute('href', '#'+pre+e); $(id+'-mouth').setAttribute('href', '#'+pre+m);
}
function motion(who, names){
  for(const n of names){ const el = $('mo-r'+who+'-'+n); if(!el) continue;
    el.classList.remove('go'); void el.getBoundingClientRect(); el.classList.add('go');
    el.addEventListener('animationend', () => el.classList.remove('go'), {once:true}); }
}
let talkTimer = 0;
function talk(who, ms){ const el = $('talk-r'+who); clearTimeout(talkTimer); if(!el) return; el.classList.add('talking'); talkTimer = setTimeout(() => el.classList.remove('talking'), ms); }
function focus(who){
  for(const c of ['tala','ma','pa']){ const el = $('c-'+c); if(!el) continue;
    el.classList.toggle('speaking', who===c); el.classList.toggle('quiet', !!who && who!==c && who!=='customer'); }
}

// ---------------- content ----------------
const NAMES = {tala:'Tala', ma:'Ma', pa:'Pa', customer:'Customer'};
const COOKS = {
  s3:{ dish:'pancit', prompt:'<b>Step 3</b>Lola’s pancit has two things in it the family stopped stocking, because customers pick them out. <em>Her way, or the way it sells?</em>',
       card:`<h2>Pancit Bihon</h2><div class="by f1">Lola Pacing &mdash; para kay Divina</div><ol>
         <li>Soak the bihon. <span class="f1">Not too long or it breaks.</span></li>
         <li>Garlic, onion, then the pork. <span class="f1">Let it brown, do not hurry it.</span></li>
         <li><span class="now">The liver, sliced thin, and the dried shrimp.</span> <span class="f2">Do not skip these. They are the taste.</span></li>
         <li class="f1">Cabbage, carrots, the beans. <span class="f2">Soy and calamansi at the end.</span></li>
         <li class="f2">Noodles last. Toss, do not stir. <span class="f3">It should be a little dry.</span></li></ol>`,
       options:[ {k:'A', text:'Her way. Liver and dried shrimp in, like the card says.', out:'lola'},
                 {k:'B', text:'The way it sells. Chicken, cabbage, no liver.', out:'sells'},
                 {k:'C', text:'Halfway. Shrimp in, liver out.', out:'half'} ],
       react:{ lola:'Pa tastes it at the pass. <em>Hm.</em> That is Nanay’s. Table three will pick it out. Send it anyway.',
               sells:'Pa tastes it at the pass, and nods, and that is all.',
               half:'Pa tastes it at the pass. Half of her is still better than none. Send it.' } },
  s4:{ dish:'bibingka', prompt:'<b>Step 4</b>The step before the salted egg is gone entirely. <em>When did she put the egg on?</em>',
       card:`<h2>Bibingka</h2><div class="by f1">Lola Pacing &mdash; para kay Divina</div><ol>
         <li>Rice flour, coconut milk, sugar, eggs. <span class="f1">Beat until it is smooth and a little thin.</span></li>
         <li class="f1">Line the clay pot with banana leaf. <span class="f2">Do not oil it.</span></li>
         <li>Pour. Coals under, coals on the lid.</li>
         <li><span class="now gone">When the top has set but is still pale</span> <span class="gap">&nbsp;</span></li>
         <li>Lay the salted egg on top. Cheese after. Butter, sugar, niyog when it comes out.</li></ol>`,
       options:[ {k:'A', text:'Put the salted egg in with the batter at the start.', out:'sank'},
                 {k:'B', text:'When the top has set but is still pale, lay the egg on.', out:'lola'},
                 {k:'C', text:'After it has baked through, on the way out of the pot.', out:'late'} ],
       react:{ lola:'…That is how she did it. <em>He says it to the pot, and does not say anything else for a while.</em>',
               sank:'The egg sank. <em>He looks at it a moment.</em> It is fine. It is still bibingka.',
               late:'Next time, earlier, so it goes into the top. <em>He eats a piece anyway.</em> It is fine.' } }
};
const PHONES = {
  s3:{ time:'12:58 a.m.', lines:['how was tonight'],
       replies:[ {text:'fine, busy', honesty:-1, after:['tala','you always say fine']},
                 {text:'four tables', honesty:0, after:['four??','is that bad. that sounds bad','is your mum ok']},
                 {text:'tell her what the woman said', honesty:+1, after:['what','she said WHAT','tala i’m so sorry','is your mum ok. are you ok']} ] },
  s4:{ time:'9:10 p.m.',
       lines:['your mum called mine','we went to see lola. she’s ok, she was complaining about the food which is a good sign','she said thank you for the money. she cried a bit','i didn’t know you sent that much'],
       replies:[ {text:'it’s nothing', honesty:-1, after:['ok','tell your mum thank you from lola. she said it twice']},
                 {text:'it was the christmas order money', honesty:+1, after:['tala','the parish order?','…she doesn’t know that, does she']},
                 {text:'don’t tell my mum i told you', honesty:0, after:['i won’t','you know you can tell me things']} ] }
};

const beats = [
  // ---------- scene 3 ----------
  {hud:['December 20','Fifth morning · The slow night'], bg:'rest', stage:'Four tables all night. You can see the room is wrong before anyone says it.', expr:{tala:'quiet',ma:'neutral'}},
  {bg:'rest', who:'customer', text:'What is it, though? Like, what <em>is</em> it.'},
  {bg:'rest', who:'ma', text:'Sinigang po. Sour soup, tamarind. Very good with rice.', expr:{ma:'neutral'}, motion:{ma:['nod']}},
  {bg:'rest', who:'customer', text:'You know if you’re going to work here you should really speak English.', expr:{tala:'wince'}},
  {bg:'rest', who:'ma', pre:'(evenly, already reaching for the pitcher)', text:'Thank you, ma’am.', expr:{ma:'held'}, motion:{ma:['pour']}},
  {bg:'rest', choice:[{text:'Say something.', goto:'speak'}, {text:'Say nothing.', goto:'silent'}], expr:{tala:'wince'}},
  {id:'speak', bg:'rest', who:'tala', text:'It’s sinigang. She said.', expr:{tala:'wince'}},
  {bg:'rest', who:'ma', text:'Tala. The back, please. Table four needs bread.', expr:{ma:'neutral',tala:'quiet'}, motion:{ma:['nod']}},
  {bg:'rest', stage:'Ma finishes the table herself. The tip is ordinary.', expr:{ma:'held'}, goto:'after'},
  {id:'silent', bg:'rest', stage:'Tala goes back to the kitchen. The pitcher gets refilled twice more. The tip is ordinary.', expr:{tala:'quiet',ma:'held'}},
  {id:'after', bg:'rest', stage:'Later, through the wall, her parents are talking about the ninth-morning order and what the ingredients cost, in the flat voices people use when they do not want to be overheard.', expr:{tala:'quiet',ma:'neutral'}},
  {bg:'cook', cook:'s3'},
  {bg:'rest', stage: () => COOKS.s3.react[STATE.cook.out], expr:{tala:'quiet'}},
  {phone:'s3'},
  {alarm:true},
  {bg:'rest', stage: () => STATE.mornings.includes(6) ? 'Cold, dark, breath visible. The sixth. Ma is already at the door with her coat on, and does not ask.' : 'The alarm stops on its own. Five. In the morning Ma does not mention it, which is how Tala knows she noticed.', expr:{tala:'tired',ma:'neutral'}},
  {inter:['December 22','The envelope','Seventh morning. Lola is back in the hospital, and the call came during prep.'], set: () => { if(!STATE.mornings.includes(7)) STATE.mornings.push(7); }},
  // ---------- scene 4 ----------
  {hud:['December 22','Seventh morning · After the call'], bg:'dining', stage:'Nobody says the word decision, because in this family it was never going to be one.', expr:{tala:'quiet',ma:'counting',pa:'down'}},
  {bg:'dining', who:'ma', pre:'(counting, twice)', text:'It is fine. We will do the bibingka with what we have.', expr:{ma:'counting'}},
  {bg:'dining', who:'pa', text:'And the puto bumbong?', expr:{pa:'neutral'}},
  {bg:'dining', who:'ma', text:'We will do the bibingka.', expr:{ma:'held',pa:'down'}},
  {bg:'dining', who:'tala', text:'Tita Baby asked for both.', expr:{tala:'neutral'}},
  {bg:'dining', who:'ma', text:'Then we will see what the week does.', expr:{ma:'neutral',tala:'quiet'}},
  {bg:'dining', stage:'Ma counts out the money that was set aside for the ninth-morning ingredients. Pa drives to the remittance counter on Newark Avenue and wires it home.', expr:{ma:'counting',pa:'down'}},
  {bg:'dining', stage:'Ando offers his first week’s pay. Pa refuses. Then Pa accepts.', expr:{pa:'soft',ma:'neutral'}},
  {bg:'cook', cook:'s4'},
  {bg:'dining', who:'pa', text: () => COOKS.s4.react[STATE.cook.out], expr:{pa:'soft',tala:'neutral',ma:'neutral'}},
  {bg:'dining', stage:'Later. The walk-in is short one shelf. The phone buzzes.', expr:{tala:'quiet',ma:'neutral',pa:'neutral'}},
  {phone:'s4'},
  {end:true}
];

// ---------------- engine ----------------
let i = -1, sel = 0, mode = 'title', busy = false;
const layers = {dining:$('dining'), rest:$('rest'), cook:$('cook'), alarm:$('alarm')};
const dlg = $('dlg'), choices = $('choices'), phone = $('phone'), hud = $('hud');
const txt = v => typeof v === 'function' ? v() : v;

function drawMarks(){ $('marks').innerHTML = [1,2,3,4,5,6,7,8,9].map(n => `<i class="mk${STATE.mornings.includes(n)?' on':''}"></i>`).join(''); }
function showBg(which){ for(const k in layers) layers[k].hidden = (k !== which); bg = which; hud.classList.toggle('dark', which==='cook'); $('alarmtxt').hidden = which !== 'alarm'; }
function findBeat(id){ return beats.findIndex(b => b.id === id); }

function render(){
  const b = beats[i]; if(!b) return;
  choices.hidden = true; choices.className = 'choices'; $('dim').classList.remove('on'); phone.classList.remove('on'); $('inter').classList.remove('on');
  if(b.hud){ $('hud-date').textContent = b.hud[0]; $('hud-sub').textContent = b.hud[1]; }
  if(b.set) b.set();
  drawMarks();
  if(b.end)   return endCard();
  if(b.inter) return interCard(b.inter);
  if(b.phone) return doPhone(PHONES[b.phone]);
  if(b.alarm) return doAlarm();
  showBg(b.bg);
  if(b.expr) for(const k in b.expr) setExpr(k, b.expr[k]);
  if(b.cook){ mode = 'cook'; dlg.hidden = true; renderCook(COOKS[b.cook]); return; }
  if(b.choice){ mode = 'choice'; dlg.hidden = true; renderChoice(b.choice); return; }
  mode = 'say'; dlg.hidden = false;
  if(b.stage){ $('who').textContent = ''; $('line').className = 'line stage'; $('line').innerHTML = txt(b.stage); focus(null); }
  else {
    $('who').textContent = NAMES[b.who]; $('line').className = 'line';
    const t = txt(b.text); $('line').innerHTML = (b.pre ? `<em>${b.pre}</em> ` : '') + t; focus(b.who);
    if(bg === 'rest' && b.who === 'ma') talk('ma', Math.min(2600, 380 + t.length * 45));
  }
  if(b.motion) for(const k in b.motion) motion(k, b.motion[k]);
}
function advance(){ const b = beats[i]; if(b && b.goto){ i = findBeat(b.goto); } else { i++; } render(); }
function next(){ if(busy) return; if(mode !== 'say') return; advance(); }
function prev(){ if(mode !== 'say' || i <= 0) return; i--; render(); }

// -------- choices (generic) --------
let choiceData = null;
function renderChoice(list){ choiceData = list; sel = 0; choices.classList.add('mid');
  choices.innerHTML = list.map((o,n) => `<div class="ch${n===sel?' sel':''}" data-n="${n}"><b>${n+1}</b>${o.text}</div>`).join(''); choices.hidden = false; }
function confirmChoice(){ const o = choiceData[sel]; if(o.set) o.set(); mode = 'say'; if(o.goto){ i = findBeat(o.goto); render(); } else advance(); }

// -------- cooking --------
let cookData = null;
function renderCook(c){ cookData = c; sel = 1;
  $('cardwrap').querySelector('.cbody').innerHTML = c.card; $('cookprompt').innerHTML = c.prompt;
  $('dish-pancit').hidden = c.dish !== 'pancit';
  choices.innerHTML = c.options.map((o,n) => `<div class="ch${n===sel?' sel':''}" data-n="${n}"><b>${o.k}</b>${o.text}</div>`).join('');
  choices.hidden = false; moveCursor(); }
function moveCursor(){ const cur = $('cursor'); const spots = [[400,560],[760,236],[980,300]]; const [x,y] = spots[sel]; cur.style.left = (x-24)+'px'; cur.style.top = (y-30)+'px'; }
function confirmCook(){ const o = cookData.options[sel]; STATE.cook = {scene:cookData.dish, choice:o.k, out:o.out}; mode = 'say'; advance(); }

// -------- alarm --------
function doAlarm(){ showBg('alarm'); mode = 'choice'; dlg.hidden = true;
  renderChoice([ {text:'Get up.', set: () => { if(!STATE.mornings.includes(6)) STATE.mornings.push(6); }}, {text:'Sleep.'} ]); }

// -------- phone --------
let phoneData = null;
function doPhone(p){ phoneData = p; mode = 'phone'; dlg.hidden = true; $('dim').classList.add('on'); $('ptime').textContent = p.time;
  const bubs = $('bubs'); bubs.innerHTML = ''; $('replies').innerHTML = ''; phone.classList.add('on'); busy = true;
  let k = 0; const tick = () => { if(k < p.lines.length){ addBub('them', p.lines[k++]); setTimeout(tick, 650); } else { showReplies(); busy = false; } };
  setTimeout(tick, 500); }
function addBub(cls, text){ const d = document.createElement('div'); d.className = 'bub '+cls; d.textContent = text; $('bubs').appendChild(d); requestAnimationFrame(() => d.classList.add('in')); }
function showReplies(){ sel = 0; $('replies').innerHTML = phoneData.replies.map((r,n) => `<div class="rp${n===sel?' sel':''}" data-n="${n}"><b>${n+1}</b>${r.text}</div>`).join(''); }
function confirmReply(){ const r = phoneData.replies[sel]; if(!r) return; STATE.honesty += r.honesty; $('replies').innerHTML = ''; addBub('me', r.text); busy = true;
  let k = 0; const tick = () => { if(k < r.after.length){ addBub('them', r.after[k++]); setTimeout(tick, 700); } else { busy = false; mode = 'say'; setTimeout(() => { advance(); }, 900); } };
  setTimeout(tick, 600); }

// -------- cards --------
function interCard(d){ mode = 'inter'; dlg.hidden = true; $('inter-e').textContent = d[0]; $('inter-h').textContent = d[1]; $('inter-p').textContent = d[2]; $('inter').classList.add('on'); }
function endCard(){ mode = 'end'; dlg.hidden = true; $('dim').classList.add('on');
  const h = STATE.honesty; const tone = h > 0 ? 'mostly honest' : h < 0 ? 'mostly protective' : 'somewhere in between';
  const kept = STATE.mornings.filter(n => n <= 7).length;
  $('end-h').textContent = kept === 7 ? 'Seven of seven' : `${kept} of the first seven`;
  $('end-p').innerHTML = `${kept === 7 ? 'Every morning so far.' : 'One morning missed, and nobody said anything.'} The bibingka came out ${STATE.cook.out === 'lola' ? 'the way Lola made it' : 'a little different, and nobody said a word'}. What you have told Bea was ${tone}.<br><br>Two mornings to go.`;
  $('end').classList.add('on'); }
function updateDev(){ $('dev').textContent = `STATE mornings=[${STATE.mornings}] honesty=${STATE.honesty} invitedHannah=${STATE.invitedHannah} cook=${JSON.stringify(STATE.cook)} beat=${i} mode=${mode}`; }
function restart(){ STATE.mornings = [1,2,3,4,5]; STATE.honesty = 0; STATE.cook = {}; i = -1; mode = 'title'; $('end').classList.remove('on'); $('inter').classList.remove('on'); $('title').classList.add('on'); showBg('rest'); dlg.hidden = true; $('dim').classList.remove('on'); drawMarks(); }

// -------- input --------
function start(){ if(mode !== 'title') return; $('title').classList.remove('on'); i = 0; render(); }
function pickChoice(n){ const list = [...choices.children]; if(!list.length) return; sel = Math.max(0, Math.min(list.length-1, n)); list.forEach((c,k) => c.classList.toggle('sel', k===sel)); if(mode === 'cook') moveCursor(); }
document.addEventListener('keydown', e => {
  if(e.key === 'd' || e.key === 'D'){ $('dev').hidden = !$('dev').hidden; updateDev(); return; }
  if(e.key === 'r' || e.key === 'R'){ restart(); return; }
  const go = e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight';
  if(mode === 'title'){ if(go) start(); }
  else if(mode === 'inter'){ if(go){ $('inter').classList.remove('on'); i++; render(); } }
  else if(mode === 'say'){ if(go) next(); else if(e.key === 'ArrowLeft') prev(); }
  else if(mode === 'cook' || mode === 'choice'){
    const n = choices.children.length;
    if(e.key === 'ArrowDown') pickChoice((sel+1)%n); else if(e.key === 'ArrowUp') pickChoice((sel+n-1)%n);
    else if(/^[1-9]$/.test(e.key)) pickChoice(Number(e.key)-1);
    else if(e.key === 'Enter' || e.key === ' '){ mode === 'cook' ? confirmCook() : confirmChoice(); return; }
  } else if(mode === 'phone'){
    if(busy) return; const rs = [...$('replies').children]; if(!rs.length) return;
    if(e.key === 'ArrowDown') sel = (sel+1)%rs.length; else if(e.key === 'ArrowUp') sel = (sel+rs.length-1)%rs.length;
    else if(/^[1-3]$/.test(e.key)) sel = Number(e.key)-1; else if(e.key === 'Enter' || e.key === ' '){ confirmReply(); return; }
    rs.forEach((c,n) => c.classList.toggle('sel', n===sel));
  }
  updateDev();
});
$('title').addEventListener('click', start);
$('inter').addEventListener('click', () => { if(mode === 'inter'){ $('inter').classList.remove('on'); i++; render(); } });
$('panel').addEventListener('click', next);
$('stage').addEventListener('click', e => { if(mode === 'say' && !e.target.closest('.panel,.choices,#phone,.cardscreen')) next(); });
choices.addEventListener('click', e => { const c = e.target.closest('.ch'); if(!c) return; pickChoice(Number(c.dataset.n)); mode === 'cook' ? confirmCook() : confirmChoice(); });
$('replies').addEventListener('click', e => { const c = e.target.closest('.rp'); if(!c || busy) return; sel = Number(c.dataset.n); confirmReply(); });
$('end').addEventListener('click', restart);

// -------- fit the 1280x720 stage to the window --------
function fit(){ const s = Math.min(innerWidth/1280, innerHeight/720); const st = $('stage').style; st.transform = `scale(${s})`; st.left = ((innerWidth-1280*s)/2)+'px'; st.top = ((innerHeight-720*s)/2)+'px'; }
addEventListener('resize', fit); fit(); drawMarks(); showBg('rest'); dlg.hidden = true;

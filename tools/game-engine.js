// ---------------- state (from the spec) ----------------
const STATE = { mornings:[], honesty:0, invitedHannah:false, cook:{} };
const $ = id => document.getElementById(id);

// ---------------- expressions + motion ----------------
const X = {
  tala:{ neutral:['brows-neutral','eyes-open','mouth-neutral'], quiet:['brows-flat','eyes-open','mouth-small'],
         wince:['brows-knit','eyes-narrow','mouth-pressed'], tired:['brows-flat','eyes-heavy','mouth-small'], smile:['brows-up','eyes-squint','mouth-smile'] },
  ma:{ neutral:['brows-soft','eyes-open','mouth-level'], held:['brows-soft','eyes-held','mouth-polite'],
       counting:['brows-knit','eyes-down','mouth-pressed'], warm:['brows-up','eyes-warm','mouth-smile'] },
  pa:{ neutral:['brows-straight','eyes-open','mouth-neutral'], down:['brows-low','eyes-down','mouth-flat'], soft:['brows-straight','eyes-open','mouth-small-smile'] },
  hannah:{ neutral:['brows-neutral','eyes-open','mouth-neutral'], curious:['brows-up','eyes-wide','mouth-o'], smile:['brows-up','eyes-open','mouth-smile'], flat:['brows-neutral','eyes-open','mouth-flat'] },
  ando:{ tired:['brows-neutral','eyes-tired','mouth-neutral'], up:['brows-up','eyes-open','mouth-small'], smile:['brows-neutral','eyes-tired','mouth-smile'] },
  tita:{ neutral:['brows-neutral','eyes-open','mouth-neutral'], warm:['brows-up','eyes-warm','mouth-smile'], talk:['brows-up','eyes-open','mouth-talk'] }
};
// which layer's hooks an expression lands on
const HOOKS = { dining:{tala:['x-tala','tala-'], ma:['x-ma','ma-'], pa:['x-pa','pa-']},
                rest:{tala:['x-rtala','r-tala-'], ma:['x-rma','r-ma-']},
                school:{tala:['x-stala','s-tala-'], hannah:['x-han','s-han-']},
                kitchen:{pa:['x-kpa','k-pa-'], ando:['x-ando','k-ando-']},
                hall:{tala:['x-htala','h-tala-'], ma:['x-hma','h-ma-'], tita:['x-tita','h-tita-'], hannah:['x-hhan','h-han-']} };
const CHARS = { dining:{tala:'c-tala',ma:'c-ma',pa:'c-pa'}, school:{tala:'c-stala',hannah:'c-han'}, kitchen:{pa:'c-kpa',ando:'c-ando'}, hall:{tala:'c-htala',ma:'c-hma',tita:'c-tita',hannah:'hall-hannah'} };
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
  const m = CHARS[bg] || {};
  for(const c in m){ const el = $(m[c]); if(!el) continue;
    el.classList.toggle('speaking', who===c); el.classList.toggle('quiet', !!who && who!==c && m[who]!==undefined); }
}

// ---------------- content ----------------
const NAMES = {tala:'Tala', ma:'Ma', pa:'Pa', customer:'Customer', hannah:'Hannah', ando:'Ando', tita:'Tita Baby'};
const ROLES = {tala:'seventeen · two years here', ma:'Divina Ramos · runs the dining room', pa:'Rey Ramos · kitchen · was a pharmacist for eleven years', customer:'eats here maybe twice a year',
               hannah:'third period · one desk over since September', ando:'cousin · twenty · landed today', tita:'the parish food committee'};
const met = new Set();
// Tagalog and kitchen words a ninth grader can tap for a meaning. Only the first use on a line is marked.
const TERMS = {
  'Simbang Gabi':'nine early-morning masses before Christmas, December 16 to 24', 'Lola':'grandmother', 'lola':'grandmother', 'Tita':'auntie. Also any older woman you respect', 'Nanay':'Mom', 'anak':'child. What a parent calls you',
  'sinigang':'a sour soup, usually made with tamarind', 'pancit':'noodles', 'puto bumbong':'purple rice steamed in bamboo tubes', 'bibingka':'a rice cake baked in a clay pot with hot coals on top', 'adobo':'meat cooked slowly in soy sauce and vinegar',
  'parol':'a star lantern. Christmas in a window', 'balikbayan box':'the big cardboard box Filipino families ship across the ocean', 'remittance':'money sent home to family in another country', 'Mang':'a polite "Mr." for an older man',
  'po':'a small word that makes anything polite', 'niyog':'grated coconut', 'muscovado':'dark, raw sugar', 'malagkit':'sticky rice', 'pirurutong':'the purple rice', 'bumbong':'the bamboo tube', 'kaunti lang':'just a little',
  'walk-in':'a refrigerator big enough to walk into', 'the pass':'the counter where plates go from the kitchen to the dining room', 'run a tab':'buy now and pay at the end of the month', 'cane vinegar':'vinegar made from sugarcane. Milder than the white kind'
};
function gloss(html){ if(!html) return html; let out = html;
  for(const t of Object.keys(TERMS).sort((a,b) => b.length - a.length)){
    const re = new RegExp('(^|[^\\w>])(' + t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')(?![\\w])(?![^<]*>)');
    if(re.test(out)) out = out.replace(re, (m, pre, w) => `${pre}<span class="term" data-def="${TERMS[t]}">${w}</span>`); }
  return out; }
// things you can look at, per room. Optional. Never moves the story.
const HOT = {
  dining:[ {x:132,y:170,t:'The parol. Lola sent it the first December, folded flat in a balikbayan box. The note said it was for the window, not for keeping in the box.'},
           {x:375,y:210,t:'The photo. Lola Pacing, before she was anybody’s lola. Ma says she is not smiling because the photographer told her not to.'},
           {x:640,y:60,t:'The lamp came with the apartment. Pa rewired it the second week. He can fix anything. He does not talk about the other thing.'},
           {x:625,y:600,t:'The envelope. The remittance receipts go in the drawer under the register. There are a lot of them.'} ],
  rest:[ {x:180,y:220,t:'Same parol as home. Ma says one window is not enough for a whole December.'},
         {x:815,y:150,t:'The menu. Half of it is what Lola cooked. The other half is what sells. The two halves are not the same size anymore.'},
         {x:250,y:520,t:'Table two. Nobody, all night.'} ],
  school:[ {x:830,y:130,t:'The map on the wall. There is a pin in Jersey City and a pin in Batangas. Tala has never told anyone the second pin is hers.'},
           {x:400,y:200,t:'Third period. Human geography. A strange thing to study when you are the thing being studied.'} ],
  kitchen:[ {x:230,y:220,t:'The tickets. Table three always sends the pancit back with the liver picked out. They order it anyway.'},
            {x:60,y:400,t:'The walk-in. Ando stood inside it for a full minute on his first afternoon. Everything here is so big.'} ],
  hall:[ {x:660,y:158,t:'Maligayang Pasko. Merry Christmas. The banner is older than the parish’s priest. Tita Baby brings it every year in a garment bag.'},
         {x:400,y:560,t:'Puto bumbong on banana leaf. Purple rice, steamed standing up. The smell in the cold is the whole point.'},
         {x:1050,y:560,t:'Bibingka. Salted egg and cheese on top, coals above and below. Lola’s always had a burnt spot on one side. On purpose.'} ]
};
let looking = false;
function drawHot(){ const svg = $('hot'); svg.innerHTML = ''; const list = (mode === 'say' && !looking) ? (HOT[bg] || []) : [];
  for(const h of list){ svg.insertAdjacentHTML('beforeend', `<circle cx="${h.x}" cy="${h.y}" r="34" data-t="${h.t.replace(/"/g,'&quot;')}"></circle><circle class="dot" cx="${h.x}" cy="${h.y}" r="4"></circle>`); } }
function look(text){ looking = true; $('who').innerHTML = 'Tala <span class="role">· looking</span>'; $('line').className = 'line look'; $('line').innerHTML = gloss(text); $('aside').hidden = true; drawHot(); }
function unlook(){ looking = false; render(); }

const COOKS = {
  s1:{ dish:'tsokolate', multi:true,
       steps:[ {drag:{kind:'tablea'}, prompt:'<b>Step 2</b>Lola’s card, almost all of it still there. <em>Drag the tablea into the pot.</em>'},
               {prompt:'<b>Step 3</b>One word is smudged. Whisk with the batirol until it is <em>what?</em>', options:[{k:'A',text:'Frothy. A little foam on top.',hit:true},{k:'B',text:'Boiling.',hit:false},{k:'C',text:'Just melted. Then stop.',hit:false}]} ],
       cardFor: n => `<h2>Tsokolate</h2><div class="by">Lola Pacing &mdash; para kay Divina</div><ol>
         <li>Water in the small pot. Not milk yet. <span class="f1">Milk makes it lazy.</span></li>
         <li>Two tablea. <span class="${n===0?'now':''}">Drop them in.</span> Low fire.</li>
         <li>Whisk with the batirol until it is <span class="${n===1?'now':''}"><span class="gap">&nbsp;</span></span>. Then a little milk. Then whisk again.</li>
         <li>Pan de sal on the side. <span class="f1">Dip it. Do not be polite about it.</span></li></ol>`,
       react:{ lola:'Frothy, the way she made it. Pa dips the pan de sal without looking up, which is the highest mark he gives.', close:'It is tsokolate. It is fine. Pa dips the pan de sal anyway.', off:'It is tsokolate. Pa dips the pan de sal anyway.' } },
  s5:{ dish:'puto', multi:true,
       steps:[ {drag:{kind:'tube'}, prompt:'<b>Step 3</b>The worst-kept part of the card. Scoop rice into the tube, then stand it in the steamer. <em>Once, or more than once?</em>'},
               {prompt:'<b>Step 4</b>Steam it standing up. <em>For how long?</em>', options:[{k:'A',text:'Until the tube whistles. About ten minutes.',hit:true},{k:'B',text:'Twenty minutes, to be safe.',hit:false},{k:'C',text:'Five minutes. They are thin.',hit:false}]},
               {prompt:'<b>Step 5</b>Turn it out onto <em>what?</em>', options:[{k:'A',text:'Banana leaf.',hit:true},{k:'B',text:'A plate.',hit:false},{k:'C',text:'Foil, to keep it warm.',hit:false}]},
               {prompt:'<b>Step 6</b>Muscovado and niyog. <em>How much?</em>', options:[{k:'A',text:'A lot. Always a lot.',hit:true},{k:'B',text:'A little. It is for the whole parish.',hit:false},{k:'C',text:'Sugar only. Coconut is extra.',hit:false}]} ],
       cardFor: n => `<h2>Puto Bumbong</h2><div class="by f1">Lola Pacing &mdash; para kay Divina</div><ol>
         <li>Soak the pirurutong with malagkit, <span class="f2">1 part to 3. Overnight.</span></li>
         <li class="f1">Drain, but keep it wet.</li>
         <li class="${n===0?'':'f2'}">Fill the bumbong <span class="${n===0?'now':''}"><span class="gap">&nbsp;</span></span>.</li>
         <li class="${n===1?'':'f2'}">Steam standing up, <span class="${n===1?'now':''}"><span class="gap">&nbsp;</span></span> minutes.</li>
         <li class="${n===2?'':'f3'}">Turn out onto <span class="${n===2?'now':''}"><span class="gap">&nbsp;</span></span>. Butter while hot.</li>
         <li class="${n===3?'':'f3'}">Muscovado and niyog, <span class="${n===3?'now':''}"><span class="gap">&nbsp;</span></span>.</li></ol>`,
       react:{ lola:'It is Lola’s. Nobody says so. Everybody knows.', close:'It is close. Close enough that Ma looks at the tray a second time and does not say anything.', off:'It is not hers. It is what the neighborhood eats this morning, and nobody says a word against it.' } },
  s2:{ dish:'adobo', drag:{kind:'vinegar'},
       prompt:'<b>Step 3</b>The card is missing how much vinegar. The bay leaf line is gone with the water. <em>Hold the bottle over the pot and pour. You decide when to stop.</em>',
       card:`<h2>Adobong Manok</h2><div class="by f1">Lola Pacing &mdash; para kay Divina</div><ol>
         <li>Chicken thighs, skin on. Dry them first or they will not brown.</li>
         <li>Brown them in the pot, then take them out. Garlic in the same oil. A whole head.</li>
         <li>Put the chicken back. Soy and vinegar, <span class="now"><span class="gap">&nbsp;</span></span>. Do not stir until it boils.</li>
         <li class="f1">Peppercorns, cracked. <span class="f2 gone">Bay leaf, two.</span></li>
         <li class="f1">Lid on. Low fire, <span class="f2">until the sauce is thick and the house smells right.</span></li></ol>`,
       react:{} },
  s3:{ dish:'pancit', prompt:'<b>Step 3</b>Lola’s pancit has two things in it that the family stopped buying, because customers pick them out. <em>Her way, or the way it sells?</em>',
       card:`<h2>Pancit Bihon</h2><div class="by f1">Lola Pacing &mdash; para kay Divina</div><ol>
         <li>Soak the bihon. <span class="f1">Not too long, or it breaks.</span></li>
         <li>Garlic, onion, then the pork. <span class="f1">Let it brown. Do not rush it.</span></li>
         <li><span class="now">The liver, sliced thin, and the dried shrimp.</span> <span class="f2">Do not skip these. They are the taste.</span></li>
         <li class="f1">Cabbage, carrots, the beans. <span class="f2">Soy and calamansi at the end.</span></li>
         <li class="f2">Noodles last. Toss, do not stir. <span class="f3">It should be a little dry.</span></li></ol>`,
       options:[ {k:'A', text:'Her way. Liver and dried shrimp in, like the card says.', out:'lola'},
                 {k:'B', text:'The way it sells. Chicken and cabbage. No liver.', out:'sells'},
                 {k:'C', text:'Halfway. Shrimp in, liver out.', out:'half'} ],
       react:{ lola:'Pa tastes it at the pass. <em>Hm.</em> That is Nanay’s. Table three will pick it out. Send it anyway.',
               sells:'Pa tastes it at the pass, and nods, and that is all.',
               half:'Pa tastes it at the pass. Half of her is still better than none. Send it.' } },
  s4:{ dish:'bibingka', drag:{kind:'egg', windows:[[6500,'sank'],[14000,'lola'],[Infinity,'late']]},
       prompt:'<b>Step 4</b>The step before the salted egg is gone. Watch the top of the batter. <em>Drag the egg on when you think she would have.</em>',
       card:`<h2>Bibingka</h2><div class="by f1">Lola Pacing &mdash; para kay Divina</div><ol>
         <li>Rice flour, coconut milk, sugar, eggs. <span class="f1">Beat it until it is smooth and a little thin.</span></li>
         <li class="f1">Line the clay pot with banana leaf. <span class="f2">Do not oil it.</span></li>
         <li>Pour. Coals under, coals on the lid.</li>
         <li><span class="now gone">When the top has set but is still pale</span> <span class="gap">&nbsp;</span></li>
         <li>Lay the salted egg on top. Cheese after. Butter, sugar, niyog when it comes out.</li></ol>`,
       react:{ lola:'…That is how she did it. <em>He says it to the pot, and does not say anything else for a while.</em>',
               sank:'The egg sank. <em>He looks at it a moment.</em> It is fine. It is still bibingka.',
               late:'Next time, earlier, so it goes into the top. <em>He eats a piece anyway.</em> It is fine.' } }
};
const PHONES = {
  s1:{ time:'5:52 a.m.', lines:['did you go??', {me:true, text:'just got back. you can see your breath inside the church here'}, 'ours was at 4. lola came, she walked the whole way', 'she asked if you were going too. i said obviously'],
       replies:[ {text:'obviously', honesty:0, after:['ok good','she’ll be happy','she said the puto bumbong was better last year btw. don’t tell her i told you']},
                 {text:'tell her i’m doing all nine', honesty:+1, after:['all nine??','ok','i’ll tell her. she’s going to cry']},
                 {text:'don’t tell her. i’ll probably miss one', honesty:-1, after:['i won’t','you won’t though','you never miss anything']} ] },
  s2:{ time:'11:24 p.m.',
       lines:['is ando there yet', {me:true, text:'he’s been here 6 hours and he’s already on the fryer'}, 'lol of course', 'that’s 3 from our street this year', 'the clinic still hasn’t replaced nurse ligaya btw. since august'],
       replies:[ {text:'somebody will come', honesty:-1, after:['maybe','my mum says the same thing']},
                 {text:'nobody’s coming, bea', honesty:+1, after:['…','yeah','i know']},
                 {text:'did you see the thing tita posted', honesty:0, after:['lol yes','ok but for real though','nobody’s coming are they']} ] },
  s3:{ time:'12:58 a.m.', lines:['how was tonight'],
       replies:[ {text:'fine, busy', honesty:-1, after:['tala','you always say fine']},
                 {text:'four tables', honesty:0, after:['four??','is that bad. that sounds bad','is your mum ok']},
                 {text:'tell her what the woman said', honesty:+1, after:['what','she said WHAT','tala i’m so sorry','is your mum ok. are you ok']} ] },
  s4:{ time:'9:10 p.m.',
       lines:['your mum called mine','we went to see lola. she’s ok, she was complaining about the food which is a good sign','she said thank you for the money. she cried a bit','i didn’t know you sent that much'],
       replies:[ {text:'it’s nothing', honesty:-1, after:['ok','tell your mum thank you from lola. she said it twice']},
                 {text:'it was the christmas order money', honesty:+1, after:['tala','the parish order?','…she doesn’t know that, does she']},
                 {text:'don’t tell my mum i told you', honesty:0, after:['i won’t','you know you can tell me things']} ] },
  s5:{ time:'5:31 a.m.', lines:['i got in','the nursing program. singapore. they said yes','tala i’m going to be a nurse','say something'],
       replies:[ {text:'congratulate her', honesty:0, after: h => h>0 ? ['thank you','i was so scared to tell you','you’re the first person i told'] : ['thanks','ok i have to go, mum’s calling','talk later']},
                 {text:'ask who’s left at home now', honesty:0, after: h => h>0 ? ['…','i know','i know, tala. i’ve been thinking about it since august','i don’t know what else to do'] : ['wow','ok','i thought you’d be happy for me']},
                 {text:'tell her the truth about how you feel', honesty:0, after: h => h>0 ? ['i know','i know. me too','i miss you. that’s all it is','come home for something. anything. eventually'] : ['you never told me anything all week and now this','i don’t know what to do with that','i have to go']} ] }
};

const beats = [
  // ================= SCENE 1 : December 16 =================
  {estab:['The parish · four blocks from Pacing’s','Sunday, December 16 · 4:40 a.m. · first morning'], bg:'dawn', show:{'dawn-walk':true,'dawn-tala':false}, pause:3200, set: () => { STATE.mornings = [1]; }},
  {hud:['December 16','First morning · 4:40 a.m.'], bg:'dawn', show:{'dawn-walk':true,'dawn-tala':false},
     stage:'It is cold and still dark. Tala is walking to church with her mother. Her father stayed behind to open the restaurant.'},
  {note:['What is happening','Every December, Filipino Catholics go to church at dawn for nine mornings in a row. It is called Simbang Gabi. It starts on December 16 and ends on Christmas Eve.',
         'There is an old belief that goes with it. If you make it to all nine, you get one wish.']},
  {bg:'dawn', who:'tala', text:'Ma. If someone does all nine, do they really get the wish?'},
  {bg:'dawn', who:'ma', text:'That is what my mother told me.'},
  {bg:'dawn', who:'tala', text:'Did you ever do all nine?'},
  {bg:'dawn', who:'ma', text:'Once. When I was your age.', aside:'Tala wants to say that she is going to do all nine. She does not say it. If she says it out loud, she has to finish it.'},
  {bg:'dawn', who:'ma', text:'Nine mornings is nine mornings. Do not start what you cannot finish.'},
  {bg:'dawn', stage:'Inside, the church is full. Tala knows almost every face, even if she does not know every name. Afterward, everyone goes to the parish hall for food.'},
  {note:['Where the Ramos family is from','Tala was born in Batangas, a province in the Philippines. Her family moved to Jersey City two years ago, when she was fifteen.',
         'Her grandmother, who everyone calls Lola, still lives in Batangas. So does her best friend Bea.']},
  {hud:['December 16','First morning · The parish hall'], bg:'hall', show:{'hall-hannah':false,'hall-basket':false,'hall-food':false},
     who:'tita', text:'Divina. Your mother made the puto bumbong for our parish back home. Everybody knows this.', expr:{tita:'warm',ma:'neutral',tala:'quiet'}},
  {bg:'hall', who:'tita', text:'So I thought of you. Will you make it for the last morning? Bibingka and puto bumbong. For everyone.', expr:{tita:'talk'}},
  {bg:'hall', who:'ma', text:'Tita, we have dinner service that whole week.', expr:{ma:'held'}},
  {bg:'hall', who:'tita', text:'Nine mornings is nine mornings. It is only the last one I am asking for.', expr:{tita:'warm'}},
  {bg:'hall', stage:'Ma says yes. She is standing in a room full of people who all heard the question. There was no way to say no.', expr:{ma:'held',tala:'quiet'},
     aside:'Ma is smiling. Tala knows that smile. It is the one she uses on customers.'},
  {note:['What Ma just agreed to','Food for about fifty people, cooked and carried to the hall by five in the morning on Christmas Eve. The family pays for all of it themselves.',
         'It is an honor to be asked. It is also a week of work and a lot of money they do not really have.']},
  {hud:['December 16','First morning · Walking home'], bg:'dawn', show:{'dawn-walk':true,'dawn-tala':false},
     who:'ma', pre:'(adding it up out loud)', text:'Fifty people. Two trays of bibingka is twenty pieces. And we only have six bamboo tubes.'},
  {bg:'dawn', who:'tala', text:'We could borrow tubes.'},
  {bg:'dawn', who:'ma', text:'From who?'},
  {bg:'dawn', who:'tala', text:'Tita Baby.'},
  {bg:'dawn', who:'ma', text:'…Yes. From Tita Baby.'},
  {bg:'dawn', stage:'Ma adds it up again, quieter this time. It comes out the same. They do not have enough.'},
  {estab:['Pacing’s Filipino Kitchen · Newark Avenue','Sunday, December 16 · 5:30 a.m. · before opening'], bg:'ext-rest', pause:3000},
  {note:['Lola’s recipe card','Every dish in this game comes from one index card, written by hand by Tala’s grandmother.',
         'The card got wet years ago. A little more of it is unreadable every time Tala takes it out. When a step is missing, she has to guess what her grandmother meant.']},
  {hud:['December 16','First morning · Before opening'], bg:'cook', cook:'s1'},
  {bg:'dining', stage: () => COOKS.s1.react[STATE.cook.out], expr:{pa:'soft',ma:'neutral',tala:'neutral'}},
  {bg:'dining', who:'pa', text:'Your Lola did the nine mornings every year. When she was your age, all nine.', expr:{pa:'soft'}},
  {bg:'dining', who:'tala', text:'I know.', expr:{tala:'quiet'}, aside:'She is trying to do all nine too. She still has not told anybody.'},
  {bg:'dining', who:'ma', text:'Eat. We open at seven.', expr:{ma:'neutral'}},
  {phone:'s1'},
  {inter:['December 18','Ando lands on a Tuesday','Third morning. Tala’s cousin flies in that afternoon and works that same night.'],
     set: () => { for(const n of [2,3]) if(!STATE.mornings.includes(n)) STATE.mornings.push(n); STATE.mornings.sort((a,b)=>a-b); }},

  // ================= SCENE 2 : December 18 =================
  {estab:['The high school · Jersey City','Tuesday, December 18 · third period'], bg:'ext-school', pause:3000},
  {hud:['December 18','Third morning · Third period'], bg:'school',
     stage:'Third period. Hannah has sat one desk away since September. They have never really talked.', expr:{tala:'quiet',hannah:'neutral'}},
  {bg:'school', who:'hannah', text:'Are you doing anything over break? My family is doing nothing. Aggressively nothing.', expr:{hannah:'curious'}},
  {bg:'school', who:'tala', text:'Working, mostly. My family has a restaurant.', expr:{tala:'neutral'}},
  {bg:'school', who:'hannah', text:'Wait. Which one?', expr:{hannah:'curious'}},
  {bg:'school', who:'tala', text:'Pacing’s. On Newark Avenue. The one with the red awning.', expr:{tala:'neutral'}},
  {bg:'school', who:'hannah', text:'The one with the star in the window!', expr:{hannah:'smile'}},
  {bg:'school', who:'tala', text:'That is a parol. We put it up for Christmas.', expr:{tala:'smile'}},
  {bg:'school', choice:[{text:'Tell her about Simbang Gabi.', goto:'invite', set: () => { STATE.invitedHannah = true; }}, {text:'Leave it there.', goto:'working'}], expr:{tala:'neutral'}},
  {id:'invite', bg:'school', who:'tala', text:'There is a thing at our church. Nine mornings in a row, at four in the morning. The last one is Christmas Eve. There is food after.', expr:{tala:'neutral',hannah:'curious'}},
  {bg:'school', who:'hannah', text:'Four in the morning.', expr:{hannah:'flat'}},
  {bg:'school', who:'tala', text:'Four in the morning.', expr:{tala:'quiet'}},
  {bg:'school', who:'hannah', text:'…What kind of food?', expr:{hannah:'curious',tala:'smile'}},
  {bg:'school', who:'tala', text:'Come and find out.', expr:{tala:'smile',hannah:'smile'}, goto:'vinegar'},
  {id:'working', bg:'school', who:'tala', text:'That is the whole break. Working.', expr:{tala:'quiet'}},
  {bg:'school', who:'hannah', text:'Oh. Cool.', expr:{hannah:'flat'}},
  {bg:'school', stage:'It is not cool, and they both know it. Tala had a chance to invite her and did not take it. Then the bell rings.', expr:{tala:'quiet',hannah:'neutral'}},
  {id:'vinegar', estab:['Pacing’s Filipino Kitchen · Newark Avenue','Tuesday, December 18 · 5:20 p.m. · before dinner service'], bg:'ext-rest', pause:3000},
  {note:['Two stores, one block apart','Mang Boy’s is a small Filipino grocery. It carries the exact cane vinegar Lola’s recipe needs, and it lets the family buy now and pay at the end of the month.',
         'The chain store is two blocks away. It is four dollars cheaper and does not carry it at all.',
         'Stores like Mang Boy’s only exist because enough Filipino families live on this block to keep them open.']},
  {hud:['December 18','Third morning · Before service'], bg:'street',
     stage:'Pa is out of vinegar and service starts in forty minutes. Tala has to pick a store.'},
  {bg:'street', choice:[{text:'Mang Boy’s. The right vinegar, on the tab.', set: () => { STATE.cook = {vinegar:'cane'}; }},
                        {text:'The chain store. Four dollars cheaper.', set: () => { STATE.cook = {vinegar:'chain'}; }}]},
  {bg:'street', stage: () => STATE.cook.vinegar === 'cane'
     ? 'Mang Boy asks about Lola before he asks what she needs. He writes the vinegar in a notebook under the family’s name and does not say when to pay.'
     : 'The vinegar comes in a big plastic jug. It is regular white vinegar, not cane. It was four dollars cheaper.'},
  {note:['Who Ando is','Ando is Tala’s cousin. He is twenty. He flew in from Batangas this afternoon, on a ticket the family helped pay for.',
         'Nobody interviewed him for a job. He is family, so there was already a job waiting. This is how most people on this block got here: one relative comes over, then helps the next one.']},
  {hud:['December 18','Third morning · Dinner service'], bg:'kitchen',
     stage:'Ando landed at two o’clock. By six he is tying on an apron.', expr:{pa:'neutral',ando:'tired'}},
  {bg:'kitchen', who:'ando', text:'You got tall.', expr:{ando:'up'}},
  {bg:'kitchen', who:'tala', text:'You got here.', expr:{ando:'smile'}},
  {bg:'kitchen', who:'ando', text:'Everybody back home says hi. Everybody. It took the whole drive to the airport.', expr:{ando:'smile'}},
  {bg:'kitchen', who:'ando', pre:'(looking into the walk-in fridge)', text:'Everything here is so big.', expr:{ando:'up'}},
  {bg:'kitchen', who:'pa', text:'You will get used to it. Hold the knife like this. Not like that.', expr:{pa:'neutral',ando:'tired'}},
  {bg:'kitchen', who:'ando', text:'How long before I stop being tired?', expr:{ando:'tired'}},
  {bg:'kitchen', who:'pa', pre:'(after a pause, turning back to the pan)', text:'I will let you know.', expr:{pa:'down',ando:'tired'}},
  {bg:'cook', cook:'s2'},
  {bg:'kitchen', stage: () => STATE.cook.vinegar === 'chain'
     ? 'The adobo comes out thin and flat. Pa tastes it and does not say anything at all. Tala would rather he got mad.' : null,
     who: () => STATE.cook.vinegar === 'chain' ? null : 'pa',
     text: () => ({lola:'This is your Lola’s. <em>He says it to the pot, and gives Ando the first plate.</em>',
                   salty:'Too much soy sauce. It is fine. Next time.', sour:'Too sour. It is fine. Ando will eat it.'})[STATE.cook.out],
     expr:{pa:'soft',ando:'smile'}},
  {bg:'kitchen', who:'ando', text:'It smells like home in here.', expr:{ando:'smile'}},
  {bg:'kitchen', who:'pa', text:'That is the idea.', expr:{pa:'soft'}},
  {phone:'s2'},
  {inter:['December 20','The slow night','Fifth morning. Four tables all night, and one customer with an opinion.'],
     set: () => { for(const n of [4,5]) if(!STATE.mornings.includes(n)) STATE.mornings.push(n); STATE.mornings.sort((a,b)=>a-b); }},

  // ================= SCENE 3 : December 20 =================
  {estab:['Pacing’s Filipino Kitchen · Newark Avenue','Thursday, December 20 · 8:40 p.m.'], bg:'ext-rest', pause:3000},
  {note:['Why a slow night matters','Nobody in the family gets a paycheck. Whatever the restaurant makes that night is the money the family has.',
         'Four tables in a whole evening does not cover the food, the rent, and the electricity. Ma and Pa both know this while they are smiling at people.']},
  {hud:['December 20','Fifth morning · The slow night'], bg:'rest',
     stage:'Four tables all night. Tala can tell the room is wrong before anybody says so.', expr:{tala:'quiet',ma:'neutral'}},
  {bg:'rest', who:'ma', pre:'(quietly, as she passes)', text:'Do not stare at the door. Staring at it does not bring anybody through it.', expr:{ma:'neutral',tala:'quiet'}},
  {bg:'rest', who:'customer', text:'What is it, though? Like, what <em>is</em> it?'},
  {bg:'rest', who:'ma', text:'Sinigang po. Sour soup, with tamarind. Very good with rice.', expr:{ma:'neutral'}, motion:{ma:['nod']}},
  {bg:'rest', who:'customer', text:'You know, if you are going to work here, you should really speak English.', expr:{tala:'wince'}},
  {bg:'rest', who:'ma', pre:'(calmly, already reaching for the water pitcher)', text:'Thank you, ma’am.', expr:{ma:'held'}, motion:{ma:['pour']},
     aside:'Ma answered in English. She was already speaking English. Tala watches her mother decide, in about half a second, to let it go.'},
  {bg:'rest', choice:[{text:'Say something.', goto:'speak'}, {text:'Say nothing.', goto:'silent'}], expr:{tala:'wince'}},
  {id:'speak', bg:'rest', who:'tala', text:'She said it in English.', expr:{tala:'wince'}},
  {bg:'rest', who:'ma', text:'Tala. Go to the back, please. Table four needs bread.', expr:{ma:'neutral',tala:'quiet'}, motion:{ma:['nod']}},
  {bg:'rest', stage:'There is no table four. Ma finishes the table herself. The tip is normal.', expr:{ma:'held'}, goto:'after'},
  {id:'silent', bg:'rest', stage:'Tala goes back to the kitchen and does not say anything. Ma refills that water twice more. The tip is normal.', expr:{tala:'quiet',ma:'held'}},
  {id:'after', bg:'rest', who:'ma', pre:'(later, in the back)', text:'You want to know what I do with it.', expr:{ma:'neutral',tala:'quiet'}},
  {bg:'rest', who:'tala', text:'Yes.', expr:{tala:'neutral'}},
  {bg:'rest', who:'ma', text:'I put it with the others. Then I refill the water.', expr:{ma:'held'}},
  {bg:'rest', who:'tala', text:'That is not fair.', expr:{tala:'wince'}},
  {bg:'rest', who:'ma', text:'No. But the restaurant has to open again tomorrow.', expr:{ma:'held'}},
  {bg:'rest', stage:'Later, through the wall, Tala can hear her parents talking about the Christmas Eve order and what the ingredients will cost. They are using the flat, quiet voices people use when they do not want to be overheard.', expr:{tala:'quiet',ma:'neutral'}},
  {note:['The menu problem','Half the menu is what Lola actually cooked. The other half has been changed over the years to match what customers will order.',
         'Every time the family changes a dish to sell more of it, the version on Lola’s card gets a little further away.']},
  {bg:'cook', cook:'s3'},
  {bg:'rest', stage: () => COOKS.s3.react[STATE.cook.out], expr:{tala:'quiet'}},
  {phone:'s3'},
  {hud:['December 21','Sixth morning · 4:10 a.m.'], alarm:true},
  {hud:['December 21','Sixth morning'], bg:'rest',
     stage: () => STATE.mornings.includes(6)
       ? 'Cold, dark, breath visible. That is six. Ma is already at the door with her coat on. She does not ask why Tala is up.'
       : 'The alarm stops by itself. Five out of six. In the morning Ma does not mention it, which is how Tala knows her mother noticed.',
     expr:{tala:'tired',ma:'neutral'}},
  {inter:['December 22','The envelope','Seventh morning. Lola is back in the hospital, and the call came in the middle of prep.'],
     set: () => { if(!STATE.mornings.includes(7)) STATE.mornings.push(7); }},

  // ================= SCENE 4 : December 22 =================
  {estab:['The apartment above Pacing’s','Saturday, December 22 · 3:15 p.m. · after the call'], bg:'ext-rest', pause:3000},
  {note:['Sending money home','Millions of Filipinos work in other countries and send money back to their families every month. It is called a remittance.',
         'For a lot of families back home, that money is how the lights stay on and how the hospital gets paid. The Ramos family sends money to Lola.']},
  {hud:['December 22','Seventh morning · After the call'], bg:'dining',
     stage:'Lola is in the hospital again. Nobody in this kitchen says the word decision, because there was never going to be one.', expr:{tala:'quiet',ma:'counting',pa:'down'}},
  {bg:'dining', who:'ma', pre:'(counting the money, then counting it again)', text:'It is fine. We will do the bibingka with what we have.', expr:{ma:'counting'},
     aside:'That is the money that was set aside for the Christmas Eve ingredients. It is now the money that is going to the hospital.'},
  {bg:'dining', who:'pa', text:'And the puto bumbong?', expr:{pa:'neutral'}},
  {bg:'dining', who:'ma', text:'We will do the bibingka.', expr:{ma:'held',pa:'down'}},
  {bg:'dining', who:'tala', text:'Tita Baby asked for both.', expr:{tala:'neutral'}},
  {bg:'dining', who:'ma', text:'Then we will see what the week does.', expr:{ma:'neutral',tala:'quiet'}},
  {bg:'dining', stage:'Pa drives to the money transfer counter on Newark Avenue and wires it to the Philippines. It gets there the same day.', expr:{ma:'counting',pa:'down'}},
  {note:['What Pa did before','Rey Ramos was a licensed pharmacist in the Philippines for eleven years. He ran a whole pharmacy.',
         'His license does not count in the United States. To use it here he would have to retake years of school and exams the family cannot afford right now. So he cooks.']},
  {bg:'dining', who:'pa', pre:'(back home, still in his coat)', text:'The man at the counter asked if I was a nurse. He said everyone from back home is a nurse.', expr:{pa:'down',ma:'neutral'}},
  {bg:'dining', who:'ma', text:'Rey.', expr:{ma:'held'}},
  {bg:'dining', who:'pa', text:'I told him no. I did not tell him what I used to be.', expr:{pa:'down'}},
  {bg:'dining', who:'tala', text:'Why not?', expr:{tala:'neutral'}},
  {bg:'dining', who:'pa', text:'Because then he asks why I am not doing it anymore.', expr:{pa:'down'}},
  {bg:'dining', stage:'Ando offers his first week of pay. Pa says no. Ando puts it on the table anyway, and after a while Pa takes it.', expr:{pa:'soft',ma:'neutral'}},
  {bg:'cook', cook:'s4'},
  {bg:'dining', who:'pa', text: () => COOKS.s4.react[STATE.cook.out], expr:{pa:'soft',tala:'neutral',ma:'neutral'}},
  {bg:'dining', stage:'Later. There is a whole shelf missing in the walk-in fridge, because that money went to the hospital. Then the phone buzzes.', expr:{tala:'quiet',ma:'neutral',pa:'neutral'}},
  {phone:'s4'},
  {inter:['December 24','The ninth dawn','4:15 a.m. Everyone is in the kitchen.'],
     set: () => { for(const n of [8,9]) if(!STATE.mornings.includes(n)) STATE.mornings.push(n); STATE.mornings.sort((a,b)=>a-b); STATE.cook = {}; }},

  // ================= SCENE 5 : December 24 =================
  {estab:['Pacing’s Filipino Kitchen · Newark Avenue','Monday, December 24 · 4:15 a.m.'], bg:'ext-rest', pause:3000},
  {hud:['December 24','Ninth morning · 4:15 a.m.'], bg:'kitchen',
     stage:'Four in the morning and everyone is here. Pa, Ma, Ando, and two of Tita Baby’s nephews who got volunteered. Bamboo tubes steaming. Purple rice. The smell of it in the cold.', expr:{pa:'neutral',ando:'up'}},
  {bg:'kitchen', who:'ando', text:'Back home we started at three.', expr:{ando:'smile'}},
  {bg:'kitchen', who:'pa', text:'Back home the church was closer.', expr:{pa:'soft'}},
  {bg:'cook', cook:'s5'},
  {bg:'kitchen', stage: () => COOKS.s5.react[STATE.cook.out], expr:{pa:'soft',ando:'smile'}},
  {hud:['December 24','Ninth morning · 5:02 a.m.'], bg:'dawn', show:{'dawn-walk':true,'dawn-tala':false},
     stage:'They push it three blocks to the parish hall on a hand cart. Mass ends. The hall fills up.'},
  {hud:['December 24','Ninth morning · The parish hall'], bg:'hall',
     show:{'hall-hannah': () => STATE.invitedHannah, 'hall-basket':false, 'hall-food':true},
     stage: () => STATE.invitedHannah
       ? 'Hannah is standing at the door at five in the morning, in a coat that is not warm enough, holding her phone, not sure if she is allowed to come in.'
       : 'The whole block is in one room at five in the morning. Tala knows every face here.',
     expr:{tala:'quiet',ma:'neutral',tita:'neutral',hannah:'flat'}, goto: () => STATE.invitedHannah ? 'hannah' : 'tita'},
  {id:'hannah', bg:'hall', who:'hannah', text:'What is the purple one?', expr:{hannah:'curious',tala:'neutral'}},
  {bg:'hall', who:'tala', text:'Rice. It grows that color.', expr:{tala:'smile'}},
  {bg:'hall', who:'hannah', text:'That is a lie.', expr:{hannah:'flat'}},
  {bg:'hall', who:'tala', text:'It is not.', expr:{tala:'neutral'}},
  {bg:'hall', stage:'Hannah eats it, thinks about it, and takes another one.', expr:{hannah:'smile',tala:'smile'}},
  {bg:'hall', who:'hannah', text:'Do you do this every year?', expr:{hannah:'curious'}},
  {bg:'hall', who:'tala', text:'Every year. This is the first one here.', expr:{tala:'neutral'}},
  {bg:'hall', who:'hannah', text:'That is a lot of work for four in the morning.', expr:{hannah:'neutral'}},
  {bg:'hall', who:'tala', text:'That is kind of the point.', expr:{tala:'smile'}},
  {bg:'hall', who:'tita', text:'Tala. Give your friend more.', expr:{tita:'talk'}},
  {id:'tita', bg:'hall', who:'tita', text:'Your Lola made the puto bumbong for our parish back home. Everybody knew it there. Now they know it here too.', expr:{tita:'warm',ma:'held'}},
  {bg:'hall', show:{'hall-basket':true},
     stage:'Then Tita Baby passes a basket around for Lola’s hospital bill. She did not ask the family first. The whole block puts money in, and Ma has to stand there and let them.', expr:{ma:'held',tita:'warm',tala:'quiet',hannah:'neutral'}},
  {note:['What just happened','The family has been sending money home to Lola all year. This morning the neighborhood sent money back the other way.',
         'Ma is not embarrassed because they need help. She is embarrassed because everyone now knows they need help.']},
  {bg:'hall', stage:'And then Tala’s phone buzzes.', expr:{tala:'quiet'}},
  {note:['Why Bea would leave','The Philippines trains far more nurses than it can pay to keep. Many of them take jobs in other countries, where the pay can be several times higher.',
         'The clinic in Bea’s town has been short a nurse since August. Nobody has replaced her.']},
  {phone:'s5'},
  {hud:['December 24','Ninth morning · Outside'], bg:'dawn', show:{'dawn-walk':false,'dawn-tala':true},
     stage: () => STATE.mornings.length === 9
       ? 'The hall is emptying out. Tala steps outside with a tray she is supposed to be returning. Nine marks. Lola said nine mornings, one wish.'
       : 'The hall is emptying out. Tala steps outside with a tray she is supposed to be returning. She made eight of the nine. Lola said nine. She makes the wish anyway, and she does not know if it counts.'},
  {bg:'dawn', choice:[ {text:'That Lola gets better.', set: () => { STATE.wish = 'lola'; }},
                       {text:'That the restaurant makes it through the year.', set: () => { STATE.wish = 'restaurant'; }},
                       {text:'That Bea stays.', set: () => { STATE.wish = 'bea'; }},
                       {text:'That I could go back, just for a week.', set: () => { STATE.wish = 'back'; }} ]},
  {bg:'dawn', pause:6500, sunrise:true},
  {debrief:true},
  {end:true}
];

// ---------------- engine ----------------
let i = -1, sel = 0, mode = 'title', busy = false, pauseTimer = 0;
function endPause(){ if(mode !== 'pause') return; clearTimeout(pauseTimer); hud.hidden = false; $('estab').hidden = true; mode = 'say'; advance(); }
const layers = {dining:$('dining'), rest:$('rest'), cook:$('cook'), alarm:$('alarm'), school:$('school'), street:$('street'), kitchen:$('kitchen'), hall:$('hall'), dawn:$('dawn'), 'ext-rest':$('ext-rest'), 'ext-school':$('ext-school')};
const dlg = $('dlg'), choices = $('choices'), phone = $('phone'), hud = $('hud');
const txt = v => typeof v === 'function' ? v() : v;

function drawMarks(){ $('marks').innerHTML = [1,2,3,4,5,6,7,8,9].map(n => `<i class="mk${STATE.mornings.includes(n)?' on':''}"></i>`).join(''); }
function showBg(which){ for(const k in layers){ layers[k].hidden = false; layers[k].classList.toggle('off', k !== which); } bg = which; hud.classList.toggle('dark', which==='cook'); $('alarmtxt').hidden = which !== 'alarm'; }
function findBeat(id){ return beats.findIndex(b => b.id === id); }

function render(){
  const b = beats[i]; if(!b) return;
  choices.hidden = true; choices.className = 'choices'; $('note').hidden = true; $('dim').classList.remove('on'); phone.classList.remove('on'); $('inter').classList.remove('on');
  if(b.hud){ $('hud-date').textContent = b.hud[0]; $('hud-sub').textContent = b.hud[1]; }
  if(b.set) b.set();
  if(b.show) for(const id in b.show){ const on = txt(b.show[id]); const el = $(id); if(el){ on ? el.removeAttribute('hidden') : el.setAttribute('hidden',''); } }
  $('dawn').classList.toggle('sunrise', !!b.sunrise);
  drawMarks();
  if(b.debrief) return debriefCard();
  if(b.note) return noteCard(b);
  $('estab').hidden = !b.estab; if(b.estab){ $('estab-place').textContent = b.estab[0]; $('estab-when').textContent = b.estab[1]; }
  if(b.pause){ showBg(b.bg); mode = 'pause'; dlg.hidden = true; hud.hidden = true; clearTimeout(pauseTimer); pauseTimer = setTimeout(endPause, b.pause); return; }
  if(b.end)   return endCard();
  if(b.inter) return interCard(b.inter);
  if(b.phone) return doPhone(PHONES[b.phone]);
  if(b.alarm) return doAlarm();
  showBg(b.bg);
  if(b.expr) for(const k in b.expr) setExpr(k, b.expr[k]);
  $('aside').hidden = true; $('hot').innerHTML = '';
  if(b.cook){ mode = 'cook'; dlg.hidden = true; renderCook(COOKS[b.cook]); return; }
  if(b.choice){ mode = 'choice'; dlg.hidden = true; renderChoice(b.choice); return; }
  mode = 'say'; dlg.hidden = false;
  const stage = txt(b.stage), who = txt(b.who);
  if(stage){ $('who').textContent = ''; $('line').className = 'line sd'; $('line').innerHTML = gloss(stage); focus(null); }
  else {
    const first = !met.has(who) && ROLES[who]; met.add(who);
    $('who').innerHTML = NAMES[who] + (first ? ` <span class="role">· ${ROLES[who]}</span>` : ''); $('line').className = 'line';
    const t = txt(b.text); $('line').innerHTML = gloss((b.pre ? `<em>${b.pre}</em> ` : '') + t); focus(who);
    if(bg === 'rest' && who === 'ma') talk('ma', Math.min(2600, 380 + t.length * 45));
  }
  const aside = txt(b.aside); $('aside').className = 'aside'; $('aside').hidden = !aside; if(aside) $('aside').innerHTML = gloss(aside);
  if(b.motion) for(const k in b.motion) motion(k, b.motion[k]);
  drawHot();
}
function advance(){ const b = beats[i]; const g = b && txt(b.goto); if(g){ i = findBeat(g); } else { i++; } render(); }
function next(){ if(busy) return; if(looking){ unlook(); return; } if(mode !== 'say') return; advance(); }
function prev(){ if(mode !== 'say' || i <= 0) return; i--; render(); }

// -------- choices (generic) --------
let choiceData = null;
function renderChoice(list){ choiceData = list; sel = 0; choices.classList.add('mid');
  choices.innerHTML = list.map((o,n) => `<div class="ch${n===sel?' sel':''}" data-n="${n}"><b>${n+1}</b>${o.text}</div>`).join(''); choices.hidden = false; }
function confirmChoice(){ const o = choiceData[sel]; if(o.set) o.set(); mode = 'say'; if(o.goto){ i = findBeat(o.goto); render(); } else advance(); }

// -------- cooking --------
let cookData = null, cookStep = 0, cookHits = 0;
function renderCook(c){ cookData = c; sel = 1; if(!c._step){ cookStep = 0; cookHits = 0; }
  const step = c.multi ? c.steps[cookStep] : c; mode = 'cook';
  $('cardwrap').querySelector('.cbody').innerHTML = c.multi ? c.cardFor(cookStep) : c.card; $('cookprompt').innerHTML = step.prompt;
  c = Object.assign({}, c, {options: step.options});  cookData = Object.assign(cookData, {options: step.options});
  for(const d of ['pancit','adobo','puto','tsokolate']){ const el = $('dish-'+d); if(c.dish === d) el.removeAttribute('hidden'); else el.setAttribute('hidden',''); }
  const eggs = $('prop-eggs'); if(c.dish === 'bibingka') eggs.removeAttribute('hidden'); else eggs.setAttribute('hidden','');
  const chain = STATE.cook.vinegar === 'chain'; $('vin-cane')[chain?'setAttribute':'removeAttribute']('hidden',''); $('vin-chain')[chain?'removeAttribute':'setAttribute']('hidden','');
  if(step.drag){ startDrag(step.drag, (out, at) => {
      if(c.multi){ if(out === 'loose' || out === 'in') cookHits++; cookStep++; cookData._step = true; mode = 'cook'; renderCook(cookData); return; }
      STATE.cook = Object.assign({}, STATE.cook, {scene:c.dish, choice:'drag', at, out}); mode = 'say'; advance(); }); return; }
  choices.innerHTML = step.options.map((o,n) => `<div class="ch${n===sel?' sel':''}" data-n="${n}"><b>${o.k}</b>${o.text}</div>`).join('');
  choices.hidden = false; moveCursor(); }

function moveCursor(){ const cur = $('cursor'); const spots = [[400,560],[760,236],[980,300]]; const [x,y] = spots[sel] || spots[0]; cur.style.left = (x-24)+'px'; cur.style.top = (y-30)+'px'; }
function confirmCook(){ const o = cookData.options[sel];
  if(cookData.multi){ if(o.hit) cookHits++; cookStep++;
    if(cookStep < cookData.steps.length){ cookData._step = true; renderCook(cookData); return; }
    const n = cookData.steps.length; STATE.cook = {scene:cookData.dish, hits:cookHits, out: cookHits === n ? 'lola' : cookHits >= Math.ceil(n/2) ? 'close' : 'off'}; delete cookData._step; mode = 'say'; advance(); return; }
  STATE.cook = Object.assign({}, STATE.cook, {scene:cookData.dish, choice:o.k, out:o.out}); mode = 'say'; advance(); }

// -------- drag steps : egg (timing), vinegar (pour), tube (scoop, then stand it up) --------
let drag = null;
function stagePoint(ev){ const r = $('stage').getBoundingClientRect(); const s = r.width / 1280; return {x:(ev.clientX - r.left)/s, y:(ev.clientY - r.top)/s}; }
const DRAGS = {
  egg:{ item:'drag-egg', home:[700,440], target:[470,385,130],
    setup(){ $('egg-on').setAttribute('hidden',''); $('batter-set').setAttribute('opacity',0); $('batter-brown').setAttribute('opacity',0); },
    tick(el){ $('batter-set').setAttribute('opacity', Math.min(1, Math.max(0, (el-3000)/4000))); $('batter-brown').setAttribute('opacity', Math.min(.9, Math.max(0, (el-13000)/7000))); },
    drop(d, inside){ if(!inside) return false; const el = performance.now() - d.t0; $('egg-on').removeAttribute('hidden'); return d.spec.windows.find(w => el < w[0])[1]; },
    key(d){ return this.drop(d, true); } },
  vinegar:{ item:'drag-vin', home:[1040,560], target:[470,385,150],
    setup(d){ const chain = STATE.cook.vinegar === 'chain'; $('drag-vin').querySelector('.cane')[chain?'setAttribute':'removeAttribute']('hidden',''); $('drag-vin').querySelector('.chain')[chain?'removeAttribute':'setAttribute']('hidden','');
      $('vin-cane').setAttribute('hidden',''); $('vin-chain').setAttribute('hidden',''); $('sauce-vin').setAttribute('opacity',0); d.poured = 0; d.last = performance.now(); },
    tick(el, d){ const now = performance.now(); const over = d.held && Math.hypot(d.x - 470, d.y - 385) <= 150; if(over) d.poured += now - d.last; d.last = now;
      $('vin-stream').setAttribute('opacity', over ? .9 : 0); $('sauce-vin').setAttribute('opacity', Math.min(.6, d.poured/9000)); },
    drop(d){ if(d.poured < 400) return false; return d.poured < 2200 ? 'salty' : d.poured < 5500 ? 'lola' : 'sour'; },
    key(d){ d.poured = 3500; return this.drop(d); } },
  tablea:{ item:'drag-tablea', home:[700,440], target:[470,385,130],
    setup(){ $('tsok-froth').setAttribute('opacity',0); $('tsok-bubbles').setAttribute('opacity',0); },
    tick(){}, drop(d, inside){ if(!inside) return false; $('tsok-froth').setAttribute('opacity',.7); $('tsok-bubbles').setAttribute('opacity',.8); return 'in'; }, key(d){ return this.drop(d, true); } },
  tube:{ item:'drag-tube', home:[780,330], target:[470,385,130],
    setup(d){ d.scoops = 0; d.inBowl = false; $('tube-fill').setAttribute('width', 0); },
    tick(el, d){ const inBowl = d.held && Math.hypot(d.x - 170, d.y - 190) <= 100; if(inBowl && !d.inBowl){ d.scoops++; $('tube-fill').setAttribute('width', Math.min(156, 60 + 48*(d.scoops-1))); } d.inBowl = inBowl; },
    drop(d, inside){ if(!inside || d.scoops === 0) return false; return d.scoops === 1 ? 'loose' : 'packed'; },
    key(d){ d.scoops = 1; $('tube-fill').setAttribute('width', 60); return 'loose'; } }
};
function startDrag(spec, onDone){ const K = DRAGS[spec.kind]; mode = 'drag'; choices.hidden = true; $('cardwrap').classList.add('dragmode'); $('cursor').style.display = 'none';
  const item = $(K.item); item.removeAttribute('hidden'); item.style.transform = '';
  drag = {spec, K, onDone, t0:performance.now(), held:false, dx:0, dy:0, x:K.home[0], y:K.home[1]}; K.setup(drag);
  const tick = () => { if(!drag) return; K.tick(performance.now() - drag.t0, drag); requestAnimationFrame(tick); }; requestAnimationFrame(tick);
  item.onpointerdown = ev => { const p = stagePoint(ev); drag.held = true; drag.dx = p.x - drag.x; drag.dy = p.y - drag.y; item.setPointerCapture(ev.pointerId); $('cook').classList.add('dragging'); };
  item.onpointermove = ev => { if(!drag || !drag.held) return; const p = stagePoint(ev); drag.x = p.x - drag.dx; drag.y = p.y - drag.dy; item.style.transform = `translate(${drag.x-K.home[0]}px, ${drag.y-K.home[1]}px)`; };
  item.onpointerup = ev => { if(!drag || !drag.held) return; drag.held = false; $('cook').classList.remove('dragging');
    const inside = Math.hypot(drag.x - K.target[0], drag.y - K.target[1]) <= K.target[2]; const out = K.drop(drag, inside);
    if(out) finishDrag(out); else { drag.x = K.home[0]; drag.y = K.home[1]; item.style.transform = ''; if(spec.kind === 'vinegar') $('vin-stream').setAttribute('opacity', 0); } };
}
function finishDrag(out){ if(!drag) return; const d = drag; $(d.K.item).setAttribute('hidden',''); $('cardwrap').classList.remove('dragmode'); $('cursor').style.display = '';
  if(d.spec.kind === 'vinegar'){ const chain = STATE.cook.vinegar === 'chain'; $(chain ? 'vin-chain' : 'vin-cane').removeAttribute('hidden'); }
  const at = Math.round((performance.now() - d.t0)/100)/10; drag = null; setTimeout(() => d.onDone(out, at), 600); }
function dragKey(){ if(!drag) return; const out = drag.K.key(drag); if(out) finishDrag(out); }
// -------- alarm --------
function doAlarm(){ showBg('alarm'); mode = 'choice'; dlg.hidden = true;
  renderChoice([ {text:'Get up.', set: () => { if(!STATE.mornings.includes(6)) STATE.mornings.push(6); }}, {text:'Sleep.'} ]); }

// -------- phone : a real thread. Bea gets a contact photo; Tala gets one too, so
// there is never a question of who is talking. --------
let phoneData = null, typeTimer = 0;
function doPhone(p){ phoneData = p; mode = 'phone'; dlg.hidden = true; $('note').hidden = true; $('dim').classList.add('on'); $('ptime').textContent = p.time;
  $('bubs').innerHTML = ''; $('replies').innerHTML = ''; $('typing').hidden = true;
  phone.classList.add('on'); phone.classList.remove('buzz'); void phone.offsetWidth; phone.classList.add('buzz'); busy = true;
  let k = 0;
  const tick = () => {
    if(k >= p.lines.length){ $('typing').hidden = true; showReplies(); busy = false; return; }
    const l = p.lines[k++];
    if(typeof l !== 'string'){ addBub('me', l.text); setTimeout(tick, 700); return; }   // Tala's own line, already sent
    $('typing').hidden = false; scrollThread();
    typeTimer = setTimeout(() => { $('typing').hidden = true; addBub('them', l); setTimeout(tick, 420); }, Math.min(1600, 420 + l.length * 22));
  };
  setTimeout(tick, 900); }
function addBub(cls, text){
  const row = document.createElement('div'); row.className = 'bub-row ' + cls;
  const av = document.createElement('span'); av.className = 'av sm ' + (cls === 'me' ? 'av-tala' : 'av-bea');
  const b = document.createElement('div'); b.className = 'bub ' + cls; b.textContent = text;
  if(cls === 'me'){ row.append(b, av); } else { row.append(av, b); }
  $('bubs').appendChild(row); requestAnimationFrame(() => { row.classList.add('in'); scrollThread(); }); }
function scrollThread(){ const el = $('bubs'); el.scrollTop = el.scrollHeight; }
function showReplies(){ sel = 0; $('replies').innerHTML = phoneData.replies.map((r,n) => `<div class="rp${n===sel?' sel':''}" data-n="${n}"><b>${n+1}</b>${r.text}</div>`).join(''); }
function confirmReply(){ const r = phoneData.replies[sel]; if(!r) return; STATE.honesty += r.honesty; $('replies').innerHTML = ''; addBub('me', r.text); busy = true;
  const after = typeof r.after === 'function' ? r.after(STATE.honesty) : r.after;
  let k = 0;
  const tick = () => {
    if(k >= after.length){ $('typing').hidden = true; setTimeout(() => { busy = false; mode = 'say'; advance(); }, 1000); return; }
    const l = after[k++]; $('typing').hidden = false; scrollThread();
    typeTimer = setTimeout(() => { $('typing').hidden = true; addBub('them', l); setTimeout(tick, 380); }, Math.min(1500, 400 + l.length * 22));
  };
  setTimeout(tick, 700); }

// -------- cards --------
function noteCard(b){ mode = 'note'; dlg.hidden = true; choices.hidden = true; showBg(b.bg || bg);
  if(b.expr) for(const k in b.expr) setExpr(k, b.expr[k]);
  $('note-tab').textContent = b.note[0];
  $('note-body').innerHTML = b.note.slice(1).map(t => `<p>${gloss(t)}</p>`).join(''); $('note-def').hidden = true;
  $('note').hidden = false; $('hot').innerHTML = ''; }
function debriefCard(){ mode = 'debrief'; dlg.hidden = true; $('dim').classList.add('on'); $('debrief').classList.add('on'); }
function interCard(d){ mode = 'inter'; dlg.hidden = true; $('inter-e').textContent = d[0]; $('inter-h').textContent = d[1]; $('inter-p').textContent = d[2]; $('inter').classList.add('on'); }
function endCard(){ mode = 'end'; dlg.hidden = true; $('dim').classList.add('on');
  const h = STATE.honesty; const tone = h > 0 ? 'mostly honest' : h < 0 ? 'mostly protective' : 'somewhere in between';
  const kept = STATE.mornings.length; const W = {lola:'that Lola gets better', restaurant:'that the restaurant makes it through the year', bea:'that Bea stays', back:'to go back, just for a week'};
  $('end-h').textContent = kept === 9 ? 'Nine mornings' : 'Eight of nine';
  $('end-p').innerHTML = `Tala wished ${W[STATE.wish] || '…'}. The game does not say whether it comes true.<br><br>${STATE.invitedHannah ? 'Hannah came.' : 'Hannah was not asked.'} The puto bumbong was ${ {lola:'Lola’s', close:'close to Lola’s', off:'not Lola’s'}[STATE.cook.out] }. What Tala told Bea all week was ${tone}.`;
  $('end').classList.add('on'); return;
  $('end-p').innerHTML = `${kept === 7 ? 'Every morning so far.' : 'One morning missed, and nobody said anything.'} ${STATE.invitedHannah ? 'Hannah knows about the twenty-fourth.' : 'Hannah does not know about the twenty-fourth.'} The bibingka came out ${STATE.cook.out === 'lola' ? 'the way Lola made it' : 'a little different, and nobody said a word'}. What you have told Bea was ${tone}.<br><br>Two mornings to go.`;
  $('end').classList.add('on'); }
function updateDev(){ $('dev').textContent = `STATE mornings=[${STATE.mornings}] honesty=${STATE.honesty} invitedHannah=${STATE.invitedHannah} cook=${JSON.stringify(STATE.cook)} beat=${i} mode=${mode}`; }
function restart(){ met.clear(); looking = false; drag = null; clearTimeout(pauseTimer); clearTimeout(typeTimer); $('estab').hidden = true; $('note').hidden = true; phone.classList.remove('on','buzz'); STATE.mornings = []; STATE.invitedHannah = false; STATE.wish = null; $('debrief').classList.remove('on'); hud.hidden = false; $('dawn').classList.remove('sunrise'); STATE.honesty = 0; STATE.cook = {}; i = -1; mode = 'title'; $('end').classList.remove('on'); $('inter').classList.remove('on'); $('title').classList.add('on'); showBg('dawn'); dlg.hidden = true; $('dim').classList.remove('on'); drawMarks(); }

// -------- input --------
function start(){ if(mode !== 'title') return; $('title').classList.remove('on'); i = 0; render(); }
function pickChoice(n){ const list = [...choices.children]; if(!list.length) return; sel = Math.max(0, Math.min(list.length-1, n)); list.forEach((c,k) => c.classList.toggle('sel', k===sel)); if(mode === 'cook') moveCursor(); }
document.addEventListener('keydown', e => {
  if(e.key === 'd' || e.key === 'D'){ $('dev').hidden = !$('dev').hidden; updateDev(); return; }
  if(e.key === 'r' || e.key === 'R'){ restart(); return; }
  const go = e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight';
  if(mode === 'title'){ if(go) start(); }
  else if(mode === 'pause'){ if(go) endPause(); }
  else if(mode === 'inter'){ if(go){ $('inter').classList.remove('on'); i++; render(); } }
  else if(mode === 'debrief'){ if(go){ $('debrief').classList.remove('on'); i++; render(); } }
  else if(mode === 'note'){ if(go){ $('note').hidden = true; mode = 'say'; advance(); } }
  else if(mode === 'say'){ if(go) next(); else if(e.key === 'ArrowLeft') prev(); }
  else if(mode === 'drag'){ if(e.key === 'Enter' || e.key === ' ') dragKey(); }
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
$('debrief').addEventListener('click', () => { if(mode === 'debrief'){ $('debrief').classList.remove('on'); i++; render(); } });
$('note').addEventListener('click', ev => { if(mode !== 'note') return;
  const t = ev.target.closest('.term');
  if(t){ const d = $('note-def'); d.className = 'aside def'; d.innerHTML = `<b>${t.textContent}</b>${t.dataset.def}`; d.hidden = false; return; }
  $('note').hidden = true; mode = 'say'; advance(); });
$('panel').addEventListener('click', ev => { const t = ev.target.closest('.term'); if(t){ ev.stopPropagation(); const a = $('aside'); a.className = 'aside def'; a.innerHTML = `<b>${t.textContent}</b>${t.dataset.def}`; a.hidden = false; return; } next(); });
$('hot').addEventListener('click', ev => { const c = ev.target.closest('circle[data-t]'); if(c && mode === 'say' && !looking){ ev.stopPropagation(); look(c.dataset.t); } });
$('stage').addEventListener('click', e => { if(mode === 'note') return; if(mode === 'pause') return endPause(); if(mode === 'say' && !e.target.closest('.panel,.choices,#phone,.cardscreen')) next(); });
choices.addEventListener('click', e => { const c = e.target.closest('.ch'); if(!c) return; pickChoice(Number(c.dataset.n)); mode === 'cook' ? confirmCook() : confirmChoice(); });
$('replies').addEventListener('click', e => { const c = e.target.closest('.rp'); if(!c || busy) return; sel = Number(c.dataset.n); confirmReply(); });
$('end').addEventListener('click', restart);

// -------- fit the 1280x720 stage to the window --------
function fit(){ const s = Math.min(innerWidth/1280, innerHeight/720); const st = $('stage').style; st.transform = `scale(${s})`; st.left = ((innerWidth-1280*s)/2)+'px'; st.top = ((innerHeight-720*s)/2)+'px'; }
addEventListener('resize', fit); fit(); drawMarks(); showBg('dawn'); dlg.hidden = true;

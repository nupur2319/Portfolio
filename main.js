const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const ME={github:'https://github.com/nupur2319',linkedin:'https://www.linkedin.com/in/nupur19',email:'you@example.com'}; // TODO: put your real email
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
$('#gh').href=ME.github;$('#li').href=ME.linkedin;$('#gh').target=$('#li').target='_blank';$('#gh').rel=$('#li').rel='noopener';
// toast
let tt;const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('s');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('s'),3200)};
const go=id=>$(id).scrollIntoView({behavior:RM?'auto':'smooth'});
// themes
const TH=['rose','matcha','lavender','night'];let ti=0;
const setT=t=>{document.documentElement.dataset.t=t;try{localStorage.setItem('t',t)}catch(e){}};
try{const s=localStorage.getItem('t');if(TH.includes(s)){ti=TH.indexOf(s);setT(s)}}catch(e){}
$('#th').onclick=()=>{ti=(ti+1)%4;setT(TH[ti]);toast('Theme: '+TH[ti])};
// x-ray
$('#xr').onclick=e=>{const on=document.body.classList.toggle('xray');e.target.setAttribute('aria-pressed',on);if(on)toast('X-Ray on: dashed boxes show how each part is built')};
// typewriter
const roles=['full stack developer','face-recognition tinkerer','builder of campus tools','pastel UI fan'];
if(RM)$('#role').textContent=roles[0];else{let r=0,c=0,d=0;(function ty(){const w=roles[r];c+=d?-1:1;$('#role').textContent=w.slice(0,c);let s=d?35:70;if(!d&&c==w.length){d=1;s=1600}else if(d&&c==0){d=0;r=(r+1)%roles.length;s=300}setTimeout(ty,s)})()}
// skill tree
const SK={Frontend:['HTML','CSS','JavaScript','React'],Backend:['APIs','Databases','Node'],'Maps and data':['Leaflet','GIS points','Dashboards'],Vision:['Face recognition','Encodings']}; // TODO: edit to match your real skills
$('#tree').innerHTML=Object.entries(SK).map(([k,v])=>`<div><h3>${k}</h3>${v.map((s,i)=>`<span class="chip" style="--i:${i}">${s}</span>`).join('')}</div>`).join('');
new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target)}}),{threshold:.25}).observe($('.rv'));
$$('.rv').forEach(el=>new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target)}}),{threshold:.25}).observe(el));
// campus map pins
const DC={A:'#c9a96e',B:'#6fa57a',C:'#1f9d5c',D:'#9a6b3f'};
const pins=[{x:18,y:30,id:'EX-001',n:'Bamboo',s:'Bambusa vulgaris',f:'Poaceae',d:'C'},{x:70,y:22,id:'EX-002',n:'Teak',s:'Tectona grandis',f:'Lamiaceae',d:'B'},{x:78,y:62,id:'EX-003',n:'Royal Palm',s:'Dypsis lutescens',f:'Arecaceae',d:'A'},{x:28,y:68,id:'EX-004',n:'Weeping Fig',s:'Ficus benjamina',f:'Moraceae',d:'D'},{x:50,y:78,id:'EX-005',n:'Mango',s:'Mangifera indica',f:'Anacardiaceae',d:'B'}];
const showP=(p,b)=>{$$('.pin').forEach(x=>x.classList.remove('on'));b.classList.add('on');$('#tinfo').innerHTML=`<b>${p.n}</b><i>${p.s}</i><br>${p.id} · ${p.f} · Division ${p.d}`};
pins.forEach(p=>{const b=document.createElement('button');b.className='pin';b.style.cssText=`left:${p.x}%;top:${p.y}%;background:${DC[p.d]}`;b.setAttribute('aria-label',`${p.n}, ${p.id}`);b.onclick=()=>showP(p,b);$('#map').append(b)});
$('#map').insertAdjacentHTML('beforeend','<div id="tinfo">Tap a pin to see a tree.</div>');
// attendance
const ST=[['Aarav K.','#f48fb1'],['Meera S.','#b39ddb'],['Rohan P.','#a5d6a7'],['Isha D.','#ffe082']];
$('#ros').innerHTML=ST.map(([n,c])=>`<li><span class="av" style="background:${c}">${n[0]}</span>${n}<em>Present</em></li>`).join('');
$('#runp').onclick=()=>{const s=$$('#pipe span');s.forEach(x=>x.classList.remove('on'));$('#lbl').textContent='scanning…';s.forEach((x,i)=>setTimeout(()=>{x.classList.add('on');if(i==2)$('#lbl').textContent='match 98%';if(i==3){$('#lbl').textContent='logged ✓';toast('Attendance logged')}},i*700+200))};
$('#gb').onsubmit=e=>{e.preventDefault();const n=$('#gn').value.trim();if(!n)return;const li=document.createElement('li');const a=document.createElement('span');a.className='av';a.style.background='var(--a)';a.textContent=n[0].toUpperCase();li.append(a,n);const em=document.createElement('em');em.textContent='Present '+new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});li.append(em);$('#ros').prepend(li);$('#gn').value='';toast('Welcome, '+n+'. You are marked present.')};
// chat
const QA=[[/shaswat|tree|map/,'SHASWAT is a campus tree map: every tree gets a species, photo and GPS point on a satellite map.'],[/attend|face/,'The attendance system finds a face, encodes it, matches it to a student and logs attendance automatically.'],[/bot|faq|enquir/,'Nupur built an FAQ chatbot that answers college enquiries on the college website.'],[/stack|tech|skill/,'Nupur works across the full stack, from HTML, CSS and JavaScript to databases and face recognition. See the skill tree above.'],[/hire|contact|email|reach/,'Use the contact form below, or find Nupur on GitHub and LinkedIn.'],[/build|project|work|made/,'Three campus tools so far: a tree map, a face-recognition attendance system and an enquiry chatbot.']];
const say=(t,u)=>{const d=document.createElement('div');d.className='m'+(u?' u':'');d.textContent=t;$('#msgs').append(d);$('#msgs').scrollTop=9e9};
const ask=q=>{say(q,1);const h=QA.find(([r])=>r.test(q.toLowerCase()));setTimeout(()=>say(h?h[1]:'I only know about Nupur’s work. Try asking about her projects or stack.'),RM?0:450)};
['What did Nupur build?','What’s her stack?','How do I contact her?'].forEach(q=>{const b=document.createElement('button');b.className='btn';b.textContent=q;b.onclick=()=>ask(q);$('#qs').append(b)});
$('#cf2').onsubmit=e=>{e.preventDefault();const v=$('#cin').value.trim();if(v){ask(v);$('#cin').value=''}};
// git log
const CM=[['feat: first pastel calculator','frontend'],['feat: form validation with a minimal UI','frontend'],['feat: finish full stack development','full-stack'],['feat: smart attendance with face recognition','ml'],['feat: SHASWAT campus tree map','full-stack'],['feat: FAQ chatbot for college enquiry','backend'],['feat: this portfolio','frontend']]; // TODO: reorder to match your real timeline
const hash=s=>{let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h.toString(16).padStart(7,'0').slice(0,7)};
let br='all';const drawL=()=>{$('#log').innerHTML=CM.filter(c=>br=='all'||c[1]==br).reverse().map(c=>`<li><code>${hash(c[0])}</code><span>${c[0]}</span><small style="margin-left:auto;color:var(--mut)">${c[1]}</small></li>`).join('')};
['all','frontend','backend','full-stack','ml'].forEach(b=>{const x=document.createElement('button');x.className='btn';x.textContent=b;x.setAttribute('aria-pressed',b=='all');x.onclick=()=>{br=b;$$('#br .btn').forEach(y=>y.setAttribute('aria-pressed',y==x));drawL()};$('#br').append(x)});drawL();
// contact
$('#cf').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);location.href=`mailto:${ME.email}?subject=${encodeURIComponent('Hello from '+f.get('n'))}&body=${encodeURIComponent(f.get('m'))}`};
// bug game
let sq=0,live=0;const bugGame=()=>{if(live)return;live=6;sq=0;toast('Squash all 6 bugs');for(let i=0;i<6;i++){const b=document.createElement('button');b.className='bug';b.textContent='🐞';b.setAttribute('aria-label','Squash this bug');const mv=()=>{b.style.left=Math.random()*88+'vw';b.style.top=Math.random()*78+10+'vh'};mv();const iv=setInterval(mv,1500);b.onclick=()=>{clearInterval(iv);b.textContent='💥';setTimeout(()=>b.remove(),250);sq++;if(sq==6){live=0;toast('Secret commit unlocked: I really do love to code.')}else toast(sq+' of 6 squashed')};document.body.append(b)}};
$('#bugb').onclick=bugGame;
// tour
const tour=()=>{const S=[['#home','Hi, I’m Nupur.'],['#skills','My skills, as a tree.'],['#projects','Three campus tools I built.'],['#journey','My journey, as commits.'],['#contact','Let’s talk.']];let i=0;go(S[0][0]);toast(S[0][1]);const t=setInterval(()=>{i++;if(i>=S.length)return clearInterval(t);go(S[i][0]);toast(S[i][1])},3500);['wheel','touchstart','keydown'].forEach(v=>addEventListener(v,()=>clearInterval(t),{once:true}))};
$('#tourb').onclick=tour;
// command palette
const CMD=[['Go to skills',()=>go('#skills')],['Go to projects',()=>go('#projects')],['Go to journey',()=>go('#journey')],['Go to contact',()=>go('#contact')],['Toggle X-Ray mode',()=>$('#xr').click()],['Change theme',()=>$('#th').click()],['Take the tour',tour],['Squash bugs',bugGame],['Open GitHub',()=>open(ME.github)],['Open LinkedIn',()=>open(ME.linkedin)],['sudo hire nupur',()=>{go('#contact');toast('Permission granted. Say hello below.')}]];
const pal=$('#pal');const draw=()=>{const q=$('#q').value.toLowerCase();$('#cmds').innerHTML='';CMD.filter(c=>c[0].toLowerCase().includes(q)).forEach(c=>{const li=document.createElement('li'),b=document.createElement('button');b.textContent=c[0];b.onclick=()=>{pal.close();c[1]()};li.append(b);$('#cmds').append(li)})};
const openP=()=>{$('#q').value='';draw();pal.showModal();$('#q').focus()};
$('#kb').onclick=openP;$('#q').oninput=draw;$('#q').onkeydown=e=>{if(e.key=='Enter'){const b=$('#cmds button');if(b)b.click()}};
addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()=='k'){e.preventDefault();pal.open?pal.close():openP()}});
// cursor blob
if(matchMedia('(pointer:fine)').matches&&!RM)addEventListener('mousemove',e=>{$('#cur').style.transform=`translate(${e.clientX}px,${e.clientY}px)`});

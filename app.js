/* ZyeemZia™ TOT-IHL course engine */
(function(){
const T=window.TRACK, M=T.meta, KEY=M.storeKey;
const $=s=>document.querySelector(s);
const st=(()=>{try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}})();
st.done=st.done||{};st.quiz=st.quiz||{};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
const all=[];T.modules.forEach(m=>m.lessons.forEach(l=>all.push(Object.assign(l,{mod:m}))));
all.forEach(l=>(l.quiz||[]).forEach(q=>{if(q.o.length>2)T.exam.push(q)}));
const pct=()=>Math.round(100*Object.keys(st.done).filter(k=>all.some(l=>l.id===k)).length/all.length);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const view=$('#view');

function setTheme(t){document.documentElement.dataset.theme=t;st.theme=t;save()}
setTheme(st.theme||'dark');
$('#theme').onclick=()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark');
$('#menu').onclick=()=>$('nav.main').classList.toggle('open');
$('#search').addEventListener('keydown',e=>{if(e.key==='Enter'){location.hash='#search/'+encodeURIComponent(e.target.value)}});

function bar(){const p=pct();$('.pbar i').style.width=p+'%';$('#pct').textContent=p+'%'}
function navOn(r){document.querySelectorAll('nav.main a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+r));$('nav.main').classList.remove('open')}

function home(){
  const mods=T.modules.map((m,i)=>{const d=m.lessons.filter(l=>st.done[l.id]).length;return `<a class="card link" href="#lesson/${m.lessons[0].id}"><span class="num">MODULE ${String(i+1).padStart(2,'0')} · ${esc(m.code)}</span><h3>${esc(m.title)}</h3><p class="muted">${esc(m.sub)}</p><small class="muted">${d}/${m.lessons.length} lessons</small><div class="meter"><i style="width:${100*d/m.lessons.length}%"></i></div></a>`}).join('');
  const nL=all.length;
  return `<section class="pg wrap">
  <div class="hero"><div><div class="kick">ZyeemZia™ Training of Trainers · ${esc(M.code)}</div>
  <h1>${esc(M.short)}<span>.</span></h1><div class="tag">${esc(M.tagline)}</div><p>${esc(M.lead)}</p>
  <a class="btn" href="#lesson/${all[0].id}">Start the course ›</a> <a class="btn ghost" href="book.html">📖 Read the book</a>
  <div class="stats"><div><b>${T.modules.length}</b><small>MODULES</small></div><div><b>${nL}</b><small>LESSONS</small></div><div><b>${T.workshops.length}</b><small>WORKSHOPS</small></div><div><b>${T.exam.length}</b><small>EXAM BANK</small></div></div></div>
  <div class="shield">${T.figure||''}</div></div>
  <h2 class="sec">Your path to certification <small class="muted mono" style="font-size:13px">${pct()}% complete</small></h2>
  <div class="grid">
   <a class="card link" href="#modules"><span class="num">STEP 01</span><h3>Learn</h3><p class="muted">${Object.keys(st.done).length}/${nL} lessons</p></a>
   <a class="card link" href="#workshops"><span class="num">STEP 02</span><h3>Practise</h3><p class="muted">${T.workshops.length} syndicate workshops · ${T.flash.length} flashcards</p></a>
   <a class="card link" href="#exam"><span class="num">STEP 03</span><h3>Certify</h3><p class="muted">Exam: ${M.examSize} questions, pass ${M.passMark}%</p></a>
   <a class="card link" href="#certificate"><span class="num">STEP 04</span><h3>Get certificate</h3><p class="muted">Unlocks after lessons + exam</p></a>
  </div>
  <h2 class="sec">The course map</h2><div class="grid">${mods}</div>
  <h2 class="sec">The ${esc(M.code)} Book</h2>
  <div class="card" style="display:flex;gap:24px;flex-wrap:wrap;align-items:center"><div style="flex:1;min-width:260px"><div class="kick">Course book · Trainer's manual · Exam prep</div><h3>The whole course as a beautiful book</h3><p class="muted">Every module and lesson, all syndicate workshops with model answers, the MOGADI scenario, the trainer's toolkit, the full practice exam with explanations, glossary and latest IHL developments. Read online or save as PDF.</p><a class="btn" href="book.html">Read online</a> <a class="btn ghost" href="book.html#print">Download PDF</a></div></div>
  <h2 class="sec">Who it is for</h2><div class="grid">${M.audience.map(a=>`<div class="card">${esc(a)}</div>`).join('')}</div>
  </section>`;
}
function modules(){
  return `<section class="pg wrap"><h1>Modules & lessons</h1><p class="muted">${T.modules.length} modules · ${all.length} lessons. Tick each lesson as complete; progress is saved in this browser.</p>`+
  T.modules.map((m,i)=>`<div class="card" style="margin:16px 0"><span class="num">MODULE ${String(i+1).padStart(2,'0')}</span><h2>${esc(m.title)}</h2><p class="muted">${esc(m.sub)}</p>${m.lessons.map(l=>`<div style="display:flex;justify-content:space-between;gap:10px;padding:8px 0;border-top:1px solid var(--line)"><a href="#lesson/${l.id}">${st.done[l.id]?'✅':'○'} ${esc(l.title)}</a><small class="muted mono">${l.mins||20} min</small></div>`).join('')}</div>`).join('')+`</section>`;
}
function quizHTML(qs,id){
  return `<div class="quiz">${qs.map((q,i)=>`<div class="q" data-a="${q.a}"><b>Q${i+1}. ${esc(q.q)}</b>${q.o.map((o,j)=>`<button class="o" data-j="${j}">${String.fromCharCode(65+j)}. ${esc(o)}</button>`).join('')}<div class="exp" hidden>${esc(q.e||'')}</div></div>`).join('')}</div>`;
}
function wireQuiz(root){
  root.querySelectorAll('.q').forEach(q=>q.querySelectorAll('button.o').forEach(b=>b.onclick=()=>{
    if(q.dataset.ans)return;q.dataset.ans=1;const a=+q.dataset.a;
    q.querySelectorAll('button.o').forEach(x=>{if(+x.dataset.j===a)x.classList.add('right')});
    if(+b.dataset.j!==a)b.classList.add('wrong');q.querySelector('.exp').hidden=false;}));
}
function lesson(id){
  const i=all.findIndex(l=>l.id===id);if(i<0)return home();const l=all[i],m=l.mod;
  const side=T.modules.map(mm=>`<h4>${esc(mm.code)} · ${esc(mm.title)}</h4>`+mm.lessons.map(x=>`<a href="#lesson/${x.id}" class="${x.id===id?'on':''} ${st.done[x.id]?'done':''}">${esc(x.title)}</a>`).join('')).join('');
  const prev=all[i-1],next=all[i+1];
  return `<section class="pg wrap lay"><aside class="side">${side}</aside><article class="lesson">
  <div class="kick">${esc(m.code)} · ${esc(m.title)} · Lesson ${m.lessons.indexOf(l)+1}/${m.lessons.length} · ${l.mins||20} min</div>
  <h1>${esc(l.title)}</h1>
  ${l.objectives?`<div class="callout"><b class="h">🎯 Learning objectives</b><ul>${l.objectives.map(o=>`<li>${esc(o)}</li>`).join('')}</ul></div>`:''}
  ${l.body}
  ${l.keys?`<h3>Key takeaways</h3><div class="keys">${l.keys.map(k=>`<div>✔ ${esc(k)}</div>`).join('')}</div>`:''}
  ${l.trainer?`<div class="callout new"><b class="h">🧑‍🏫 Trainer's note (TOT)</b>${l.trainer}</div>`:''}
  ${l.quiz&&l.quiz.length?`<h3>Check your understanding</h3>${quizHTML(l.quiz)}`:''}
  ${l.source?`<p class="muted" style="font-size:13px">📁 Source material: ${esc(l.source)}</p>`:''}
  <div class="navrow">${prev?`<a class="btn ghost" href="#lesson/${prev.id}">‹ ${esc(prev.title)}</a>`:'<span></span>'}
  <button class="btn" id="done">${st.done[id]?'✓ Completed':'Mark complete'}</button>
  ${next?`<a class="btn ghost" href="#lesson/${next.id}">${esc(next.title)} ›</a>`:'<a class="btn ghost" href="#exam">Go to exam ›</a>'}</div>
  </article></section>`;
}
function workshops(){
  return `<section class="pg wrap"><h1>Workshops & syndicate exercises</h1><p class="muted">Practical, trainer-led exercises from the BIPSOT Training of Trainers. Work in syndicates, then open the model answers.</p>`+
  T.workshops.map((w,i)=>`<div class="card" style="margin:18px 0" id="ws-${i}"><span class="num">WORKSHOP ${String(i+1).padStart(2,'0')} · ${esc(w.type)}</span><h2>${esc(w.title)}</h2>${w.body}${w.answers?`<details><summary>Model answers & debrief points</summary>${w.answers}</details>`:''}</div>`).join('')+
  `<h2 class="sec">Flashcards</h2><div id="fc"></div></section>`;
}
function flash(){
  let k=0;const box=$('#fc');if(!box)return;
  const draw=()=>{const c=T.flash[k];box.innerHTML=`<div class="flash"><div class="in"><div class="f">${esc(c[0])}</div><div class="b">${esc(c[1])}</div></div></div><p style="text-align:center"><button class="btn ghost sm" id="fp">‹ Prev</button> <span class="mono">${k+1}/${T.flash.length}</span> <button class="btn ghost sm" id="fn">Next ›</button> <button class="btn ghost sm" id="fs">Shuffle</button></p>`;
    box.querySelector('.flash').onclick=e=>e.currentTarget.classList.toggle('flip');
    $('#fp').onclick=()=>{k=(k-1+T.flash.length)%T.flash.length;draw()};$('#fn').onclick=()=>{k=(k+1)%T.flash.length;draw()};
    $('#fs').onclick=()=>{k=Math.floor(Math.random()*T.flash.length);draw()}};
  draw();
}
let examSet=null;
function exam(){
  return `<section class="pg wrap"><h1>Certification exam</h1><p class="muted">${M.examSize} random questions from a ${T.exam.length}-question bank. Pass mark ${M.passMark}% · Distinction ${M.distinctionMark}%. Best score: <b>${st.best||0}%</b></p>
  <button class="btn" id="startx">Start a new exam</button><div id="xbox"></div></section>`;
}
function startExam(){
  examSet=[...T.exam].sort(()=>Math.random()-.5).slice(0,M.examSize);
  $('#xbox').innerHTML=`<div class="quiz">${examSet.map((q,i)=>`<div class="q"><b>Q${i+1}. ${esc(q.q)}</b>${q.o.map((o,j)=>`<label style="display:block;margin:6px 0;cursor:pointer"><input type="radio" name="x${i}" value="${j}"> ${esc(o)}</label>`).join('')}<div class="exp" hidden></div></div>`).join('')}</div><button class="btn" id="submitx">Submit exam</button><div id="xres"></div>`;
  $('#submitx').onclick=()=>{let c=0;examSet.forEach((q,i)=>{const v=document.querySelector(`input[name=x${i}]:checked`);const ok=v&&+v.value===q.a;if(ok)c++;const e=document.querySelectorAll('#xbox .q')[i].querySelector('.exp');e.hidden=false;e.innerHTML=(ok?'✅ ':'❌ Correct: '+esc(q.o[q.a])+'. ')+esc(q.e||'')});
    const s=Math.round(100*c/examSet.length);st.best=Math.max(st.best||0,s);save();
    $('#xres').innerHTML=`<div class="callout ${s>=M.passMark?'new':'red'}"><b class="h">Score: ${s}% (${c}/${examSet.length})</b>${s>=M.distinctionMark?'Distinction! ':s>=M.passMark?'Passed. ':'Not yet — review and retry. '}<a href="#certificate">Certificate ›</a></div>`;$('#xres').scrollIntoView()};
}
function capstone(){const c=M.capstone;return `<section class="pg wrap"><h1>${esc(c.title)}</h1><div class="card">${c.brief}<h3>Deliverables</h3><ol>${c.deliverables.map(d=>`<li>${esc(d)}</li>`).join('')}</ol><h3>Assessment rubric</h3><div class="tw"><table><tr><th>Criterion</th><th>Developing</th><th>Proficient</th><th>Distinguished</th></tr>${c.rubric.map(r=>`<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join('')}</table></div></div></section>`}
function certificate(){
  const p=pct(),b=st.best||0,ok=p===100&&b>=M.passMark;
  const date=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  const cid=(M.code+'-'+(st.name||'X').replace(/\W/g,'').toUpperCase().slice(0,6)+'-'+(st.certDate||'')).replace(/-$/,'');
  return `<section class="pg wrap"><h1>Certificate</h1>
  <div class="card noprint"><p>Lessons: <b>${p}%</b> · Best exam score: <b>${b}%</b> (need 100% lessons and ≥${M.passMark}%)</p>
  ${ok?`<input class="txt" id="nm" placeholder="Your full name as on certificate" value="${esc(st.name||'')}"> <button class="btn" id="mk">Generate</button> <button class="btn ghost" onclick="print()">Print / Save PDF</button>`:'<p class="muted">Complete all lessons and pass the exam to unlock your certificate.</p>'}</div>
  ${ok&&st.name?`<div class="cert"><div style="letter-spacing:.3em;font:600 12px Outfit;color:#666">ZYEEMZIA™ ACADEMY</div><h2>Certificate of Completion</h2><p>This certifies that</p><div class="nm">${esc(st.name)}</div><p>has successfully completed the</p><h3 style="font-family:Outfit">${esc(M.full)}</h3><p style="max-width:620px;margin:auto">${esc(M.certificate)}</p><p><b>${b>=M.distinctionMark?'With Distinction · ':''}Exam score ${b}%</b></p><p style="margin-top:30px">${st.certDate||date}<br><small>Certificate ID: ${esc(cid)} · totihl.zyeemzia.com</small></p><p style="margin-top:24px"><i style="font-family:Georgia;font-size:22px">Zyeem Bin Zia</i><br><small>Chairman & CEO, ZyeemZia™</small></p><div class="seal">IHL<br>TOT</div></div>`:''}</section>`;
}
function search(q){
  q=decodeURIComponent(q||'').trim().toLowerCase();if(!q)return home();
  const hits=all.filter(l=>(l.title+' '+l.body).toLowerCase().includes(q));
  return `<section class="pg wrap"><h1>Search: “${esc(q)}”</h1><p class="muted">${hits.length} lessons</p>${hits.map(l=>{const t=l.body.replace(/<[^>]+>/g,' ');const i=t.toLowerCase().indexOf(q);return `<a class="card link" style="margin:10px 0" href="#lesson/${l.id}"><b>${esc(l.title)}</b><br><small class="muted">${esc(l.mod.title)}</small><p class="muted">…${esc(t.slice(Math.max(0,i-80),i+120))}…</p></a>`}).join('')}</section>`;
}
function route(){
  const h=location.hash.slice(1)||'home',[r,arg]=h.split('/');
  const fn={home,modules,lesson:()=>lesson(arg),workshops,exam,capstone,certificate,search:()=>search(arg),updates:()=>lesson(T.updatesLesson)}[r]||home;
  view.innerHTML=fn();navOn(r);bar();window.scrollTo(0,0);
  wireQuiz(view);flash();
  if($('#done'))$('#done').onclick=()=>{st.done[arg]=1;save();route()};
  if($('#startx'))$('#startx').onclick=startExam;
  if($('#mk'))$('#mk').onclick=()=>{st.name=$('#nm').value.trim();st.certDate=st.certDate||new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});save();route()};
}
addEventListener('hashchange',route);route();
})();

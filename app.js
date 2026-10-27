/* ZyeemZia™ TOT-IHL course engine */
(function(){
const T=window.TRACK, M=T.meta, KEY=M.storeKey, I=window.ZZI18N, t=I.t, n=I.num;
const $=s=>document.querySelector(s);
const st=(()=>{try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}})();
st.done=st.done||{};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const all=[];T.modules.forEach(m=>m.lessons.forEach(l=>{l.mod=m;all.push(l)}));
const ids=new Set(all.map(l=>l.id));
Object.keys(st.done).forEach(k=>{if(!ids.has(k))delete st.done[k]});
// exam bank = dedicated questions + every multiple-choice lesson check
const BANK=[...T.exam];all.forEach(l=>(l.quiz||[]).forEach(q=>{if(q.o.length>2)BANK.push(q)}));
const doneCount=()=>all.filter(l=>st.done[l.id]).length;
const pct=()=>Math.round(100*doneCount()/all.length);
const view=$('#view');

// static chrome
document.querySelectorAll('[data-i18n]').forEach(e=>{e.textContent=t(e.dataset.i18n)});
document.querySelectorAll('[data-i18n-ph]').forEach(e=>{e.placeholder=t(e.dataset.i18nPh);e.setAttribute('aria-label',t(e.dataset.i18nPh))});
document.querySelectorAll('[data-i18n-title]').forEach(e=>{e.title=t(e.dataset.i18nTitle);e.setAttribute('aria-label',t(e.dataset.i18nTitle))});
const sel=$('#lang');
sel.innerHTML=I.LANGS.map(l=>`<option value="${l}"${l===I.lang?' selected':''}>${I.names[l]}</option>`).join('');
sel.onchange=()=>I.setLang(sel.value);

function setTheme(th){document.documentElement.dataset.theme=th;st.theme=th;save()}
setTheme(st.theme||(matchMedia&&matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'));
$('#theme').onclick=()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark');
$('#menu').onclick=()=>$('nav.main').classList.toggle('open');
const doSearch=e=>{if(e.key==='Enter'&&e.target.value.trim()){location.hash='#search/'+encodeURIComponent(e.target.value.trim());e.target.blur()}};
document.querySelectorAll('.search').forEach(i=>i.addEventListener('keydown',doSearch));

function bar(){const p=pct();$('.pbar i').style.width=p+'%';$('#pct').textContent=n(p)+'%'}
function navOn(r){const key=r==='lesson'?'modules':r;document.querySelectorAll('nav.main a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+key));$('nav.main').classList.remove('open')}
const two=i=>n(String(i).padStart(2,'0'));

function home(){
  const mods=T.modules.map((m,i)=>{const d=m.lessons.filter(l=>st.done[l.id]).length;return `<a class="card link" href="#lesson/${m.lessons[0].id}"><span class="num">${t('module')} ${two(i+1)} · ${esc(I.code(m.code))}</span><h3>${esc(m.title)}</h3><p class="muted">${esc(m.sub)}</p><small class="muted">${t('lessonsOf',d,m.lessons.length)}</small><div class="meter"><i style="width:${100*d/m.lessons.length}%"></i></div></a>`}).join('');
  return `<section class="pg wrap">
  <div class="hero"><div><div class="kick">${t('kicker')} · ${esc(M.code)}</div>
  <h1>${esc(M.short)}<span>.</span></h1><div class="tag">${esc(M.tagline)}</div><p>${esc(M.lead)}</p>
  <div class="ctas"><a class="btn" href="#lesson/${all[0].id}">${t('start')} ›</a> <a class="btn ghost" href="book.html">📖 ${t('readBook')}</a></div>
  <div class="stats"><div><b>${n(T.modules.length)}</b><small>${t('sModules')}</small></div><div><b>${n(all.length)}</b><small>${t('sLessons')}</small></div><div><b>${n(T.workshops.length)}</b><small>${t('sWorkshops')}</small></div><div><b>${n(BANK.length)}</b><small>${t('sExam')}</small></div></div></div>
  <div class="shield">${T.figure||''}</div></div>
  <h2 class="sec">${t('pathTitle')} <small class="muted mono" style="font-size:13px">${n(pct())}% ${t('complete')}</small></h2>
  <div class="grid">
   <a class="card link" href="#modules"><span class="num">${t('step')} ${two(1)}</span><h3>${t('learn')}</h3><p class="muted">${t('lessonsOf',doneCount(),all.length)}</p></a>
   <a class="card link" href="#workshops"><span class="num">${t('step')} ${two(2)}</span><h3>${t('practise')}</h3><p class="muted">${t('practiseSub',T.workshops.length,T.flash.length)}</p></a>
   <a class="card link" href="#exam"><span class="num">${t('step')} ${two(3)}</span><h3>${t('certify')}</h3><p class="muted">${t('certifySub',M.examSize,M.passMark)}</p></a>
   <a class="card link" href="#certificate"><span class="num">${t('step')} ${two(4)}</span><h3>${t('getCert')}</h3><p class="muted">${t('getCertSub')}</p></a>
  </div>
  <h2 class="sec">${t('courseMap')}</h2><div class="grid">${mods}</div>
  <h2 class="sec">${t('bookTitle',esc(M.code))}</h2>
  <div class="card"><div class="kick">${t('bookKick')}</div><h3>${t('bookH')}</h3><p class="muted">${t('bookP')}</p><a class="btn" href="book.html">${t('readOnline')}</a> <a class="btn ghost" href="book.html#print">${t('downloadPdf')}</a></div>
  <h2 class="sec">${t('whoFor')}</h2><div class="grid">${M.audience.map(a=>`<div class="card">${esc(a)}</div>`).join('')}</div>
  </section>`;
}
function modules(){
  return `<section class="pg wrap"><h1>${t('modulesTitle')}</h1><p class="muted">${t('modulesLead',T.modules.length,all.length)}</p>`+
  T.modules.map((m,i)=>`<div class="card" style="margin:16px 0"><span class="num">${t('module')} ${two(i+1)}</span><h2>${esc(m.title)}</h2><p class="muted">${esc(m.sub)}</p>${m.lessons.map(l=>`<div class="lrow"><a href="#lesson/${l.id}">${st.done[l.id]?'✅':'○'} ${esc(l.title)}</a><small class="muted mono">${n(l.mins||20)} ${t('min')}</small></div>`).join('')}</div>`).join('')+`</section>`;
}
function quizHTML(qs){
  return `<div class="quiz">${qs.map((q,i)=>`<div class="q" data-a="${q.a}"><b>${n(i+1)}. ${esc(q.q)}</b>${q.o.map((o,j)=>`<button type="button" class="o" data-j="${j}">${String.fromCharCode(65+j)}. ${esc(o)}</button>`).join('')}<div class="exp" hidden>${esc(q.e||'')}</div></div>`).join('')}</div>`;
}
function wireQuiz(root){
  root.querySelectorAll('.quiz .q[data-a]').forEach(q=>q.querySelectorAll('button.o').forEach(b=>b.onclick=()=>{
    if(q.dataset.ans)return;q.dataset.ans=1;const a=+q.dataset.a;
    q.querySelectorAll('button.o').forEach(x=>{x.disabled=true;if(+x.dataset.j===a)x.classList.add('right')});
    if(+b.dataset.j!==a)b.classList.add('wrong');q.querySelector('.exp').hidden=false;}));
}
function lesson(id){
  const i=all.findIndex(l=>l.id===id);if(i<0)return home();const l=all[i],m=l.mod;
  const side=T.modules.map(mm=>`<h4>${esc(I.code(mm.code))} · ${esc(mm.title)}</h4>`+mm.lessons.map(x=>`<a href="#lesson/${x.id}" class="${x.id===id?'on':''} ${st.done[x.id]?'done':''}">${esc(x.title)}</a>`).join('')).join('');
  const prev=all[i-1],next=all[i+1];
  return `<section class="pg wrap lay"><aside class="side">${side}</aside><article class="lesson">
  <div class="kick">${esc(I.code(m.code))} · ${esc(m.title)} · ${t('lessonN',m.lessons.indexOf(l)+1,m.lessons.length)} · ${n(l.mins||20)} ${t('min')}</div>
  <h1>${esc(l.title)}</h1>
  ${l.objectives?`<div class="callout"><b class="h">🎯 ${t('objectives')}</b><ul>${l.objectives.map(o=>`<li>${esc(o)}</li>`).join('')}</ul></div>`:''}
  ${l.body}
  ${l.keys?`<h3>${t('keyTakeaways')}</h3><div class="keys">${l.keys.map(k=>`<div>✔ ${esc(k)}</div>`).join('')}</div>`:''}
  ${l.trainer?`<div class="callout new"><b class="h">🧑‍🏫 ${t('trainerNote')}</b>${l.trainer}</div>`:''}
  ${l.quiz&&l.quiz.length?`<h3>${t('check')}</h3>${quizHTML(l.quiz)}`:''}
  ${l.source?`<p class="muted" style="font-size:13px">📁 ${t('source')}: ${esc(l.source)}</p>`:''}
  <div class="navrow">${prev?`<a class="btn ghost" href="#lesson/${prev.id}">‹ ${esc(prev.title)}</a>`:'<span></span>'}
  <button type="button" class="btn" id="done" data-id="${l.id}">${st.done[id]?t('completed'):t('markComplete')}</button>
  ${next?`<a class="btn ghost" href="#lesson/${next.id}">${esc(next.title)} ›</a>`:`<a class="btn ghost" href="#exam">${t('goExam')} ›</a>`}</div>
  </article></section>`;
}
function workshops(){
  return `<section class="pg wrap"><h1>${t('wsTitle')}</h1><p class="muted">${t('wsLead')}</p>`+
  T.workshops.map((w,i)=>`<div class="card" style="margin:18px 0" id="ws-${i}"><span class="num">${t('workshop')} ${two(i+1)} · ${esc(w.type)}</span><h2>${esc(w.title)}</h2>${w.body}${w.answers?`<details><summary>${t('modelAnswers')}</summary>${w.answers}</details>`:''}</div>`).join('')+
  `<h2 class="sec">${t('flashcards')}</h2><div id="fc"></div></section>`;
}
function flash(){
  let k=0;const box=$('#fc');if(!box||!T.flash.length)return;
  const draw=()=>{const c=T.flash[k];box.innerHTML=`<div class="flash" role="button" tabindex="0" aria-label="${t('flipHint')}"><div class="in"><div class="f">${esc(c[0])}</div><div class="b">${esc(c[1])}</div></div></div><p class="muted" style="text-align:center;font-size:13px">${t('flipHint')}</p><p style="text-align:center"><button type="button" class="btn ghost sm" id="fp">${t('prev')}</button> <span class="mono">${n(k+1)}/${n(T.flash.length)}</span> <button type="button" class="btn ghost sm" id="fn">${t('next')}</button> <button type="button" class="btn ghost sm" id="fs">${t('shuffle')}</button></p>`;
    const card=box.querySelector('.flash');const flip=()=>card.classList.toggle('flip');
    card.onclick=flip;card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();flip()}};
    $('#fp').onclick=()=>{k=(k-1+T.flash.length)%T.flash.length;draw()};$('#fn').onclick=()=>{k=(k+1)%T.flash.length;draw()};
    $('#fs').onclick=()=>{let r;do{r=Math.floor(Math.random()*T.flash.length)}while(T.flash.length>1&&r===k);k=r;draw()}};
  draw();
}
function shuffled(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function exam(){
  return `<section class="pg wrap"><h1>${t('examTitle')}</h1><p class="muted">${t('examLead',Math.min(M.examSize,BANK.length),BANK.length,M.passMark,M.distinctionMark)} ${t('best')}: <b>${n(st.best||0)}%</b></p>
  <button type="button" class="btn" id="startx">${t('startExam')}</button><div id="xbox"></div></section>`;
}
function startExam(){
  const set=shuffled(BANK).slice(0,M.examSize);
  $('#xbox').innerHTML=`<p class="mono muted" id="xcount"></p><div class="quiz">${set.map((q,i)=>`<fieldset class="q"><legend><b>${n(i+1)}. ${esc(q.q)}</b></legend>${q.o.map((o,j)=>`<label class="opt"><input type="radio" name="x${i}" value="${j}"> ${esc(o)}</label>`).join('')}<div class="exp" hidden></div></fieldset>`).join('')}</div><button type="button" class="btn" id="submitx">${t('submitExam')}</button><div id="xres"></div>`;
  const count=()=>{$('#xcount').textContent=t('answered',document.querySelectorAll('#xbox input:checked').length,set.length)};
  $('#xbox').addEventListener('change',count);count();
  $('#startx').scrollIntoView({behavior:'smooth'});
  $('#submitx').onclick=()=>{
    const missing=set.length-document.querySelectorAll('#xbox input:checked').length;
    if(missing&&!confirm(t('unanswered',missing)))return;
    let c=0;set.forEach((q,i)=>{const v=document.querySelector(`input[name=x${i}]:checked`);const ok=!!v&&+v.value===q.a;if(ok)c++;const e=document.querySelectorAll('#xbox .q')[i].querySelector('.exp');e.hidden=false;e.innerHTML=(ok?'✅ ':'❌ '+t('correctIs')+esc(q.o[q.a])+'. ')+esc(q.e||'')});
    document.querySelectorAll('#xbox input').forEach(x=>x.disabled=true);$('#submitx').disabled=true;
    const s=Math.round(100*c/set.length);st.best=Math.max(st.best||0,s);save();bar();
    $('#xres').innerHTML=`<div class="callout ${s>=M.passMark?'new':'red'}"><b class="h">${t('score')}: ${n(s)}% (${n(c)}/${n(set.length)})</b>${s>=M.distinctionMark?t('distinction'):s>=M.passMark?t('passed'):t('notYet')}<a href="#certificate">${t('certLink')}</a></div>`;$('#xres').scrollIntoView({behavior:'smooth'})};
}
function capstone(){const c=M.capstone;return `<section class="pg wrap"><h1>${esc(c.title)}</h1><div class="card">${c.brief}<h3>${t('deliverables')}</h3><ol>${c.deliverables.map(d=>`<li>${esc(d)}</li>`).join('')}</ol><h3>${t('rubric')}</h3><div class="tw"><table><tr><th>${t('criterion')}</th><th>${t('developing')}</th><th>${t('proficient')}</th><th>${t('distinguished')}</th></tr>${c.rubric.map(r=>`<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join('')}</table></div></div></section>`}
function certId(){
  if(!st.certId){const d=new Date(st.certTs||Date.now());const ymd=d.getFullYear()+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0');
    const r=Array.from({length:6},()=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random()*32)]).join('');st.certId=`TOTIHL-${ymd}-${r}`;save()}
  return st.certId;
}
function certificate(){
  const p=pct(),b=st.best||0,ok=p===100&&b>=M.passMark;
  const date=st.certTs?new Date(st.certTs).toLocaleDateString(I.lang==='bn'?'bn-BD':I.lang==='fr'?'fr-FR':'en-GB',{day:'numeric',month:'long',year:'numeric'}):'';
  return `<section class="pg wrap"><h1>${t('certTitle')}</h1>
  <div class="card noprint"><p>${t('certStatus',p,b,M.passMark)}</p>
  ${ok?`<input class="txt" id="nm" maxlength="80" placeholder="${t('namePh')}" value="${esc(st.name||'')}"> <button type="button" class="btn" id="mk">${t('generate')}</button> ${st.name?`<button type="button" class="btn ghost" id="pr">${t('print')}</button>`:''}`:`<p class="muted">${t('locked')}</p>`}</div>
  ${ok&&st.name?`<div class="cert"><div class="cert-k">${t('certAcademy')}</div><h2>${t('certOf')}</h2><p>${t('certifies')}</p><div class="nm">${esc(st.name)}</div><p>${t('completedThe')}</p><h3>${esc(M.full)}</h3><p class="cert-s">${esc(M.certificate)}</p><p><b>${b>=M.distinctionMark?t('withDist'):''}${t('examScore',b)}</b></p><p style="margin-top:30px">${esc(date)}<br><small>${t('certId')}: ${esc(certId())} · totihl.zyeemzia.com</small></p><p style="margin-top:24px"><i class="sig">Zyeem Bin Zia</i><br><small>${t('ceo')}</small></p><div class="seal">IHL<br>TOT</div><p class="cert-v">${t('verifyNote')}</p></div>`:''}</section>`;
}
function search(q){
  q=decodeURIComponent(q||'').trim();if(!q)return home();const ql=q.toLowerCase();
  const plain=l=>(l.title+' '+l.body.replace(/<[^>]+>/g,' ')+' '+(l.keys||[]).join(' ')).replace(/\s+/g,' ');
  const hits=all.filter(l=>plain(l).toLowerCase().includes(ql));
  $('#search').value=q;
  return `<section class="pg wrap"><h1>${t('searchTitle',esc(q))}</h1><p class="muted">${hits.length?t('results',hits.length):t('noResults')}</p>${hits.map(l=>{const s=plain(l);const i=s.toLowerCase().indexOf(ql);return `<a class="card link" style="margin:10px 0" href="#lesson/${l.id}"><b>${esc(l.title)}</b><br><small class="muted">${esc(l.mod.title)}</small><p class="muted">…${esc(s.slice(Math.max(0,i-80),i))}<mark>${esc(s.slice(i,i+q.length))}</mark>${esc(s.slice(i+q.length,i+q.length+120))}…</p></a>`}).join('')}</section>`;
}
function route(){
  const h=decodeURIComponent(location.hash.slice(1))||'home';const cut=h.indexOf('/');const r=cut<0?h:h.slice(0,cut),arg=cut<0?'':h.slice(cut+1);
  if(r==='updates'){location.replace('#lesson/'+T.updatesLesson);return}
  if(r==='print'){location.replace('#home');return}
  const fn={home,modules,lesson:()=>lesson(arg),workshops,exam,capstone,certificate,search:()=>search(arg)}[r]||home;
  view.innerHTML=fn();navOn(r==='lesson'&&arg===T.updatesLesson?'updates':r);bar();window.scrollTo(0,0);
  wireQuiz(view);flash();
  const d=$('#done');if(d)d.onclick=()=>{st.done[d.dataset.id]=1;save();const i=all.findIndex(l=>l.id===d.dataset.id);const nx=all[i+1];if(nx)location.hash='#lesson/'+nx.id;else route()};
  if($('#startx'))$('#startx').onclick=startExam;
  const mk=$('#mk');if(mk){const go=()=>{const v=$('#nm').value.trim();if(!v){$('#nm').focus();return}st.name=v;st.certTs=st.certTs||Date.now();save();route()};mk.onclick=go;$('#nm').onkeydown=e=>{if(e.key==='Enter')go()}}
  if($('#pr'))$('#pr').onclick=()=>print();
  document.title=(r==='lesson'&&all.find(l=>l.id===arg)?all.find(l=>l.id===arg).title+' · ':'')+M.full;
}
addEventListener('hashchange',route);route();
})();

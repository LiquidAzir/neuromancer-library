'use strict';
const { resources, week, checkpoints, repository } = window.NEURO;
const KEY = 'neuromancer-library-v1';
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fresh = () => ({version:1, progress:{}, notes:{}, bookmarks:{}, days:{}, last:null, theme:'light', font:0});
function validate(data) {
  if (!data || data.version !== 1 || typeof data !== 'object') throw new Error('This is not a Neuromancer library backup.');
  const clean = fresh();
  for (const r of resources) {
    clean.progress[r.id] = checkpoints.map((_,i) => data.progress?.[r.id]?.[i] === true);
    if (typeof data.notes?.[r.id] === 'string' && data.notes[r.id].length > 100000) throw new Error('A module note exceeds 100,000 characters. Export it separately before merging.');
    clean.notes[r.id] = typeof data.notes?.[r.id] === 'string' ? data.notes[r.id] : '';
    clean.bookmarks[r.id] = typeof data.bookmarks?.[r.id] === 'string' ? data.bookmarks[r.id].slice(0,300) : '';
  }
  for (const day of week) clean.days[day.day] = data.days?.[day.day] === true;
  clean.last = resources.some(r => r.id === data.last) ? data.last : null;
  clean.theme = data.theme === 'dark' ? 'dark' : 'light';
  clean.font = [0,1,2].includes(data.font) ? data.font : 0;
  return clean;
}
let state = fresh(), storageWarning = false;
try { const saved = localStorage.getItem(KEY); if (saved) state = validate(JSON.parse(saved)); }
catch { storageWarning = true; }
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); return true; }
  catch { toast('Browser storage is unavailable. Export your notes before leaving.'); return false; }
}
let toastTimer;
function toast(message) {
  const t=document.getElementById('toast');t.textContent=message;t.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),5000);
}
const count = r => (state.progress[r.id] || []).filter(Boolean).length;
const total = () => resources.reduce((n,r)=>n+count(r),0);
const byId = id => resources.find(r=>r.id===id);
const external = (url,label,classes='') => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="${classes}">${esc(label)} <span aria-hidden="true">↗</span></a>`;
const dots = r => `<span class="dots" aria-label="${count(r)} of 4 checkpoints complete">${checkpoints.map((_,i)=>`<span class="dot ${state.progress[r.id]?.[i]?'done':''}"></span>`).join('')}</span>`;
const heading = (eyebrow,title,description) => `<div class="page-intro"><span class="eyebrow">${esc(eyebrow)}</span><h1>${title}</h1><p>${description}</p></div>`;
function applyPreferences() {
  document.body.classList.toggle('dark',state.theme==='dark');
  document.documentElement.style.setProperty('--reading',`${1+state.font*.1}rem`);
  document.getElementById('theme').setAttribute('aria-label',`Switch to ${state.theme==='dark'?'light':'dark'} theme`);
  document.getElementById('font').setAttribute('aria-label',`Reading text size ${state.font+1} of 3; change size`);
}
function card(r) {
  return `<article class="card ${r.color}"><div class="card-top"><span class="index">${r.number}</span><span class="type">${r.type}${r.pdf?'<span class="pdf-chip">PDF AVAILABLE</span>':''}</span></div><span class="eyebrow">${r.short}</span><h3><a href="#resource/${r.id}">${r.title}</a></h3><div class="author">${r.author}</div><p class="summary">${r.summary}</p><div class="card-access">${external(r.pdf||r.primary,r.pdf?'Official PDF':r.id==='marr'?'Publisher / library access':'Official source')}</div><div class="card-bottom"><a href="#resource/${r.id}">Read & build <span aria-hidden="true">&nbsp;→</span></a>${dots(r)}</div></article>`;
}
let filter='all',query='';
function library() {
  const next = resources.find(r=>r.id===state.last && count(r)<4) || resources.find(r=>count(r)<4) || resources[0];
  return `<section class="hero"><div><span class="eyebrow">THEORY INTO PRACTICE / VOL. 01</span><h1>Understand the mind.<br>Build the machine.</h1><p>Seven essential resources. Seven practical builds.<br>A scientific foundation for your Neuromancer journey.</p></div><div class="progress-box"><div class="progress-top"><span class="eyebrow">YOUR PROGRESS</span><span class="progress-number">${total()}<small> / 28</small></span></div><progress value="${total()}" max="28" aria-label="Learning checkpoints"></progress><p>${resources.filter(r=>count(r)===4).length} of 7 modules complete · saved on this device</p></div></section><section class="continue"><div><span class="eyebrow">${total()===28?'REVISIT YOUR WORK':state.last?'CONTINUE YOUR STUDY':'YOUR STARTING POINT'}</span><h2>${next.short} <span class="muted">/ ${next.title}</span></h2><p>${next.weeks} · ${next.effort} · ${next.exercise.title}</p></div><a class="button primary" href="#resource/${next.id}">${state.last?'Continue':'Start learning'} <span aria-hidden="true">→</span></a></section><section aria-labelledby="shelf-title"><div class="section-head"><h2 id="shelf-title">The reading shelf <small id="result-count">/ 7 resources</small></h2><label class="search"><span class="sr-only" style="position:absolute;clip-path:inset(50%);width:1px;height:1px;overflow:hidden">Search resources</span><input id="search" type="search" placeholder="Search topics, books, concepts…" value="${esc(query)}" autocomplete="off"></label></div><div class="filters" role="group" aria-label="Filter resources">${[['all','All resources'],['pdf','PDFs'],['book','Books'],['practical','Courses & code']].map(([id,label])=>`<button data-filter="${id}" class="${filter===id?'selected':''}" aria-pressed="${filter===id}">${label}</button>`).join('')}</div><div id="cards" class="cards"></div></section>`;
}
function renderCards() {
  const list=resources.filter(r=>(filter==='all'||filter==='pdf'&&r.pdf||filter==='book'&&r.type==='Book'||filter==='practical'&&['Course','Code','Guide'].includes(r.type)) && `${r.title} ${r.short} ${r.author} ${r.tags.join(' ')} ${r.summary}`.toLowerCase().includes(query.toLowerCase()));
  document.getElementById('cards').innerHTML=list.length?list.map(card).join(''):'<div class="empty">No matching resources. Try a different topic or choose All resources.</div>';
  document.getElementById('result-count').textContent=`/ ${list.length} resource${list.length===1?'':'s'}`;
}
function resource(r) {
  return `<a class="back" href="#library">← Back to the library</a>${heading(`MODULE ${r.number} / ${r.short}`,r.title,esc(r.summary))}<div class="resource-layout"><div><section class="panel reading"><span class="eyebrow">01 / READ & UNDERSTAND</span><h2 style="margin-top:12px">What to study</h2><p>${esc(r.read)}</p><p><strong>Before you start.</strong> ${esc(r.prerequisite)}</p><div class="equation">${esc(r.equation)}</div><p>${esc(r.intuition)}</p>${r.notice?`<div class="notice">${esc(r.notice)}</div>`:''}<div class="actions">${r.pdf?external(r.pdf,r.pdfLabel,'button primary'):''}${external(r.primary,r.primaryLabel,`button ${r.pdf?'':'primary'}`)}</div><h3>Go straight to the source</h3><ul class="link-list">${r.links.map(l=>`<li>${external(l.url,l.label)}</li>`).join('')}</ul></section><section class="panel reading" id="build"><span class="eyebrow">02 / IMPLEMENT</span><h2 style="margin-top:12px">${r.exercise.title}</h2><p class="muted">${esc(r.exercise.tools)}</p><ol>${r.exercise.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><h3>Evidence that you understand it</h3><ul>${r.exercise.done.map(s=>`<li>${esc(s)}</li>`).join('')}</ul><h3>Where the model stops</h3><p>${esc(r.exercise.limit)}</p><div class="actions"><a class="button" href="exercises/${r.number}-${r.id}.md" download>Save exercise brief ↓</a>${external(`${repository}/blob/main/exercises/${r.number}-${r.id}.md`,'View on GitHub','button subtle')}</div></section><section class="panel reading"><span class="eyebrow">03 / YOUR FIELD NOTES</span><h2 style="margin-top:12px">Leave a trail of evidence.</h2><label class="note-label" for="bookmark">Where you left off</label><input class="bookmark" id="bookmark" data-bookmark="${r.id}" maxlength="300" placeholder="e.g. Chapter 6, section 6.2 / video 38:20" value="${esc(state.bookmarks[r.id]||'')}"><label class="note-label" for="notes">Explanation, derivation, experiment, and limitations</label><textarea id="notes" data-note="${r.id}" maxlength="100000" placeholder="What did you learn? What did you test? What failed? What will you do next?">${esc(state.notes[r.id]||'')}</textarea><span class="save-status" id="save-status">Private to this browser. Notes save as you type; export a backup from Notebook.</span></section><section class="panel"><details><summary>Access, license & source evidence</summary><p>${esc(r.rights)}</p><div class="rights-links">${r.evidence.map(l=>external(l.url,l.label)).join('')}</div></details></section><div class="actions">${Number(r.number)<7?`<a class="button primary" href="#resource/${resources[Number(r.number)].id}">Next: ${resources[Number(r.number)].short} →</a>`:'<a class="button primary" href="#path">Review your study path →</a>'}</div></div><aside class="resource-side"><section class="panel"><h2>Your checkpoints</h2>${checkpoints.map((c,i)=>`<label class="check"><input type="checkbox" data-check="${r.id}" data-index="${i}" ${state.progress[r.id]?.[i]?'checked':''}><span>${c}</span></label>`).join('')}<p class="checkpoint-hint">Mark these when you can explain the idea, work through its math, show a working build, and describe a limitation.</p></section><section class="panel"><span class="eyebrow">FIELD GUIDE</span><div class="meta-row"><span>Suggested pace</span><strong>${r.weeks}</strong></div><div class="meta-row"><span>Estimated effort</span><strong>${r.effort}</strong></div><div class="meta-row"><span>Format</span><strong>${r.type}${r.pdf?' + PDF':''}</strong></div><p class="checkpoint-hint">Estimates include the selected reading and a small implementation. Move on when the evidence is ready, not when the calendar says so.</p><a class="button" style="width:100%;margin-top:20px" href="#path">View study path →</a></section></aside></div>`;
}
function pathPage() {
  return `${heading('THE STUDY PATH','Read. Reason. Make it work.','A suggested 10-week sequence at roughly 6–8 hours a week. These are selected readings and small builds, not full-book completion targets. Slow down whenever the mathematics needs more time.')}<div class="rule-strip"><div><strong>01 / Explain</strong>Describe the idea without jargon.</div><div><strong>02 / Derive</strong>Work through the central equation.</div><div><strong>03 / Build</strong>Implement the smallest useful version.</div><div><strong>04 / Critique</strong>Find a failure and explain its limits.</div></div><section class="panel"><h2>Before you begin</h2><p class="muted">Be comfortable with Python functions, arrays, matrix multiplication, basic probability, and derivatives. If needed, use Deep Learning chapters 2–5 as a foundation and extend the schedule. Read on your phone; use a computer or an existing notebook environment for the coding sessions.</p><p class="muted">Preview Marr’s three questions on day one, then revisit them after a build. Modules 01 → 02 → 03 → 04 form the main chain. Reinforcement learning branches from 01–02; neuronal dynamics can run alongside it once differential equations are comfortable.</p><a class="button" href="#week">Start with the first seven days →</a></section><div class="route-list">${resources.map(r=>`<article class="route-item ${r.color}"><span class="index">${r.number}</span><div><span class="eyebrow">${r.weeks} · ${r.effort}</span><h2>${r.short}</h2><p>${r.exercise.title}</p><span class="tag muted">${count(r)}/4 checkpoints complete · ${r.tags.join(' / ')}</span></div><a class="button" href="#resource/${r.id}">Open module →</a></article>`).join('')}</div><section class="panel" style="margin-top:25px"><h2>A repeatable study session</h2><p class="muted">Spend 20 minutes reading, 10 minutes explaining the idea from memory, 25 minutes implementing or testing, and 5 minutes logging the result. For deeper labs, combine two sessions. Each week, keep one plot or table, one derivation, and one written limitation.</p></section>`;
}
function weekPage() {
  return `${heading('FIRST WEEK / A CONCRETE START','Seven days. One working network.','Plan for about 6–9 hours. If Python or calculus is new, spread these seven sessions over two or three weeks. The goal is a tiny MLP you understand, with a record of what worked and what failed.')}<div class="route-list">${week.map(d=>`<article class="panel" style="margin-bottom:0"><div class="day-head"><span class="index">0${d.day}</span><div><span class="eyebrow">DAY ${d.day} · ${d.time}</span><h2>${d.title}</h2></div></div><div class="day-grid"><div><h3>READ / THINK</h3><p>${d.read}</p></div><div><h3>BUILD / TEST</h3><p>${d.build}</p></div></div><p class="day-output"><strong>Keep this:</strong> ${d.output}</p><div class="day-footer"><label class="check"><input type="checkbox" data-day="${d.day}" ${state.days[d.day]?'checked':''}>Session complete</label><a href="#resource/${d.resource}">Open related module →</a></div></article>`).join('')}</div>`;
}
function notebook() {
  const noted=resources.filter(r=>state.notes[r.id]||state.bookmarks[r.id]);
  return `${heading('YOUR FIELD NOTEBOOK','Keep the evidence.','Notes, reading positions, and progress are saved only in this browser. They do not sync automatically or go to GitHub. Export a backup before changing phones or clearing browser data.')}<div class="utility-row"><button id="export">Export backup ↓</button><label class="button file-label">Import backup ↑<input class="file-input" id="import" type="file" accept="application/json,.json" aria-label="Import library backup"></label><button id="export-notes">Export notes as text ↓</button></div><p class="muted" style="font-size:12px">Import merges completed checkpoints and adds notes. Conflicting notes are kept together rather than discarded.</p>${noted.length?noted.map(r=>`<article class="panel note-card"><span class="eyebrow">MODULE ${r.number}</span><h2><a href="#resource/${r.id}">${r.title}</a></h2>${state.bookmarks[r.id]?`<p class="saved-mark"><strong>Reading position:</strong> ${esc(state.bookmarks[r.id])}</p>`:''}<pre>${esc(state.notes[r.id]||'No written notes yet.')}</pre><a class="button" href="#resource/${r.id}">Continue / edit notes →</a></article>`).join(''):'<section class="empty"><h2>Your notebook starts with one observation.</h2><p>Open a module and jot down an explanation, a question, or the result of an experiment. It will appear here.</p><a class="button primary" href="#resource/networks">Write your first field note →</a></section>'}`;
}
function about() {
  return `${heading('ACCESS & SOURCES','A shelf of original sources.','Reviewed on 18 October 2026. This repository contains original study guidance and links. External books, papers, videos, and code remain with their authors and publishers.')}<section class="panel"><h2>Read comfortably on your phone</h2><div class="install-grid"><div><h3>iPhone / iPad</h3><p>Open this library in Safari. Use Share → Add to Home Screen (the Share button may be in the browser menu). Open the new icon to return to your shelf.</p></div><div><h3>Android</h3><p>Open this library in Chrome. Use the browser menu → Add to Home screen or Install app, depending on your browser.</p></div></div><p class="muted" style="font-size:13px">Use Aa in the top bar to enlarge study text, and ◐ to switch light/dark mode. Source links open in a separate tab. Use the PDF reader’s page controls or the external site’s reading tools; this library does not embed or alter those books.</p><div class="notice"><strong>What works offline?</strong> After one online visit, the library interface, study plan, exercise briefs, and saved notes can be opened offline when the browser supports service workers. External websites, videos, and PDFs need a connection unless you separately save an authorized download in your phone’s Files or reading app. External texts are not cached here.</div><p class="muted" style="font-size:13px">Installing the app does not guarantee shared storage with every browser mode. Export/import your notebook if you move between browsers or the installed app.</p></section><section class="panel"><h2>Access decisions for all seven resources</h2>${resources.map(r=>`<article class="rights-item"><h3>${r.number} / ${r.title}</h3><p>${esc(r.rights)}</p><div class="rights-links">${r.pdf?external(r.pdf,'Official direct PDF'):external(r.primary,'Official source')}${r.evidence.map(l=>external(l.url,l.label)).join('')}</div></article>`).join('')}</section><section class="panel"><h2>Verification & maintenance</h2><p class="muted">The source records and stated licenses were reviewed separately from HTTP availability. A successful download does not establish permission to redistribute a work. The repository includes a dated link report with status codes and PDF content checks; blocked automated requests are recorded rather than treated as proof of a broken link.</p><div class="actions">${external(`${repository}/blob/main/RESOURCE-LICENSES.md`,'Read the access audit','button')}${external(`${repository}/blob/main/link-check.json`,'See the link report','button')}${external(repository,'Browse / download the repository','button')}</div><details style="margin-top:20px"><summary>About this curriculum</summary><p>“Neuromancer” is the learner’s organizing theme. This is an independent study library, with no affiliation to the resource authors or publishers. The suggested sequence, time estimates, exercise briefs, and checkpoints are original editorial guidance. They are not an accreditation or a promise of mastery.</p></details></section>`;
}
function render() {
  const route=(location.hash||'#library').slice(1), [page,id]=route.split('/');
  const r=page==='resource'?byId(id):null;
  const active=page==='resource'?'library':page;
  document.querySelectorAll('[data-nav]').forEach(el=>{el.classList.toggle('active',el.dataset.nav===active);if(el.dataset.nav===active)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
  let html;
  if(r){state.last=r.id;save();html=resource(r);}
  else if(page==='path')html=pathPage();
  else if(page==='week')html=weekPage();
  else if(page==='notebook')html=notebook();
  else if(page==='about')html=about();
  else if(page==='library')html=library();
  else html=`${heading('PAGE NOT FOUND','That page is not on this shelf.','Use the library to find a resource.')}<a class="button primary" href="#library">Open the library →</a>`;
  document.getElementById('main').innerHTML=html;
  if(page==='library')renderCards();
  document.title=`${r?r.title:({path:'Study path',week:'First week',notebook:'Notebook',about:'Access & sources'}[page]||'Scientific field library')} · Neuromancer`;
  window.scrollTo(0,0);
}
function download(name,content,type) {
  const url=URL.createObjectURL(new Blob([content],{type})),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
document.addEventListener('click',e=>{
  if(e.target.closest('.skip')){e.preventDefault();document.getElementById('main').focus();document.getElementById('main').scrollIntoView();return;}
  const filterButton=e.target.closest('[data-filter]');
  if(filterButton){filter=filterButton.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('selected',b.dataset.filter===filter);b.setAttribute('aria-pressed',String(b.dataset.filter===filter));});renderCards();}
  if(e.target.closest('#theme')){state.theme=state.theme==='dark'?'light':'dark';applyPreferences();save();}
  if(e.target.closest('#font')){state.font=(state.font+1)%3;applyPreferences();save();toast(`Study text size: ${['standard','large','largest'][state.font]}`);}
  if(e.target.closest('#export')){download('neuromancer-backup.json',JSON.stringify({...state,exportedAt:new Date().toISOString()},null,2),'application/json');toast('Backup exported. Keep this file private.');}
  if(e.target.closest('#export-notes')){download('neuromancer-notes.txt',resources.map(r=>`${r.number}. ${r.title}\n${count(r)}/4 checkpoints complete\nReading position: ${state.bookmarks[r.id]||'—'}\n\n${state.notes[r.id]||'No notes yet.'}`).join('\n\n'+'─'.repeat(40)+'\n\n'),'text/plain;charset=utf-8');}
});
document.addEventListener('input',e=>{
  if(e.target.id==='search'){query=e.target.value;renderCards();}
  const note=e.target.dataset.note,bookmark=e.target.dataset.bookmark;
  if(note||bookmark){if(note)state.notes[note]=e.target.value;if(bookmark)state.bookmarks[bookmark]=e.target.value;const ok=save();document.getElementById('save-status').textContent=ok?'Saved on this device. Export a backup from Notebook.':'Not saved to browser storage. Export your notes before leaving.';}
});
document.addEventListener('change',async e=>{
  if(e.target.dataset.check){const id=e.target.dataset.check;state.progress[id]??=[false,false,false,false];state.progress[id][Number(e.target.dataset.index)]=e.target.checked;save();}
  if(e.target.dataset.day){state.days[e.target.dataset.day]=e.target.checked;save();}
  if(e.target.id==='import'){
    const file=e.target.files?.[0];if(!file)return;
    try{if(file.size>4000000)throw new Error('Backup is too large (maximum 4 MB).');const incoming=validate(JSON.parse(await file.text())),merged=validate(state);
      for(const r of resources){merged.progress[r.id]=checkpoints.map((_,i)=>!!state.progress[r.id]?.[i]||incoming.progress[r.id][i]);
        const a=state.notes[r.id]||'',b=incoming.notes[r.id];if(b&&a!==b)merged.notes[r.id]=(a?`${a}\n\n— Imported notes —\n${b}`:b);
        const oldMark=state.bookmarks[r.id]||'',newMark=incoming.bookmarks[r.id];
        if(!oldMark)merged.bookmarks[r.id]=newMark;else if(newMark&&newMark!==oldMark)merged.notes[r.id]=(merged.notes[r.id]||'')+`\n\nImported reading position: ${newMark}`;
      }
      for(const d of week)merged.days[d.day]=!!state.days[d.day]||incoming.days[d.day];
      state=validate(merged);
      const persisted=save();render();toast(persisted?'Backup merged. Existing notes were preserved.':'Backup merged in memory. Export before leaving; browser storage is unavailable.');
    }catch(error){toast(`Import failed: ${error.message}`);}finally{e.target.value='';}
  }
});
function connection(){const el=document.getElementById('connection');el.textContent=navigator.onLine?'Online':'Offline';el.classList.toggle('offline',!navigator.onLine);}
window.addEventListener('online',connection);window.addEventListener('offline',connection);
window.addEventListener('hashchange',()=>{render();document.getElementById('main').focus({preventScroll:true});});
applyPreferences();render();connection();
if(storageWarning)toast('Could not restore browser storage. Import a backup from Notebook if needed.');
if('serviceWorker' in navigator && location.protocol!=='file:')navigator.serviceWorker.register('./sw.js').catch(()=>{/* Reading remains available online. */});

'use client';

import {useState,useEffect,useRef,useCallback} from 'react';
import {ArrowRight,Bookmark,BookOpen,Check,ChevronDown,Feather,Grid2X2,Leaf,Maximize2,MessageCircle,Mountain,Play,RotateCcw,Search,Send,Settings2,Sparkles,Volume2,X,Route,PenLine,CheckCircle2,Info,LoaderCircle} from 'lucide-react';
import {lessons,staticAnswer,type Lesson,type Progress} from '@/lib/lessons';
import evolutionData from '@/lib/evolution-data.json';
import {recordCompletion,recordAgain} from '@/lib/progress';
import {JourneyDashboard} from './journey-dashboard';
import {CharacterIllustration} from './character-illustration';
import {loadHanziWriter,type Writer} from '@/lib/hanzi-client';

type View='learn'|'explore'|'journey'|'assistant'|'home';
type Tab='story'|'writing'|'practice';
type Message={role:'user'|'assistant';text:string;offline?:boolean};
const STORAGE='inktales-progress-v1';
function loadObject<T,>(key:string,fallback:T):T {try {const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback;}catch{return fallback;}}
function CornerMarks(){return <><i className="corner tl"/><i className="corner tr"/><i className="corner bl"/><i className="corner br"/></>}

export default function InkTales(){
 const [view,setView]=useState<View>('learn');
 const [index,setIndex]=useState(0);
 const [tab,setTab]=useState<Tab>('story');
 const [progress,setProgress]=useState<Progress>({});
 const [bookmarks,setBookmarks]=useState<string[]>([]);
 const [answer,setAnswer]=useState<string|null>(null);
 const [toast,setToast]=useState('');
 const [loaded,setLoaded]=useState(false);
 const [sound,setSound]=useState(true);
 const [calm,setCalm]=useState(false);
 const [resetConfirm,setResetConfirm]=useState(false);
 const [filter,setFilter]=useState('All characters');
 const [query,setQuery]=useState('');
 const [drawerOpen,setDrawerOpen]=useState(false);
 const [writingOpen,setWritingOpen]=useState(false);
 const writingDialog=useRef<HTMLDialogElement>(null);
 const [speaking,setSpeaking]=useState(false);
 const [chatSession,setChatSession]=useState(0);
 const settings=useRef<HTMLDialogElement>(null);
 const drawer=useRef<HTMLDialogElement>(null);
 const toastTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const lesson=lessons[index];
 const learned=Object.values(progress).filter(p=>p?.learned).length;
 const correct=answer===lesson.meaning;
 const notify=useCallback((message:string)=>{setToast(message);if(toastTimer.current)clearTimeout(toastTimer.current);toastTimer.current=setTimeout(()=>setToast(''),4300);},[]);
 useEffect(()=>{
  if('speechSynthesis' in window)window.speechSynthesis.getVoices();
  const saved=loadObject<Progress>(STORAGE,{});
  setProgress(saved&&typeof saved==='object'&&!Array.isArray(saved)?saved:{});
  const marks=loadObject<string[]>('inktales-bookmarks',[]);setBookmarks(Array.isArray(marks)?marks:[]);
  const prefs=loadObject<{sound:boolean;calm:boolean}>('inktales-settings',{sound:true,calm:false});setSound(prefs.sound);setCalm(prefs.calm);
  const parse=()=>{const [route,id]=location.hash.slice(1).split('/');if(['learn','explore','journey','assistant','home'].includes(route))setView(route as View);if(id){const n=lessons.findIndex(l=>l.id===id);if(n>=0)setIndex(n);}};
  parse();window.addEventListener('hashchange',parse);setLoaded(true);return()=>window.removeEventListener('hashchange',parse);
 },[]);
 useEffect(()=>{if(!loaded)return;try{localStorage.setItem(STORAGE,JSON.stringify(progress));}catch{notify('Your browser could not save progress. You can keep learning in this session.');}},[progress,loaded,notify]);
 useEffect(()=>{if(!loaded)return;try{localStorage.setItem('inktales-bookmarks',JSON.stringify(bookmarks));}catch{}},[bookmarks,loaded]);
 useEffect(()=>{if(!loaded)return;try{localStorage.setItem('inktales-settings',JSON.stringify({sound,calm}));}catch{}document.documentElement.classList.toggle('calm',calm);},[sound,calm,loaded]);
 useEffect(()=>{setTab('story');setAnswer(null);writingDialog.current?.close();if('speechSynthesis'in window)window.speechSynthesis.cancel();setSpeaking(false);},[index]);
 const navigate=useCallback((v:View,id?:string)=>{location.hash=v+(id?'/'+id:'');setView(v);if(id){const n=lessons.findIndex(l=>l.id===id);if(n>=0)setIndex(n);}window.scrollTo({top:0,behavior:'instant'});},[]);
 const selectLesson=useCallback((n:number)=>{if(n<0||n>=lessons.length)return;navigate('learn',lessons[n].id);setTab('story');setAnswer(null);},[navigate]);
 const reviewCard=(remembered:boolean)=>{
  setProgress(p=>remembered?recordCompletion(p,lesson.id):recordAgain(p,lesson.id));
  notify(remembered?`${lesson.char} remembered. Your progress is saved.`:`${lesson.char} is ready to revisit in My journey.`);
  if(index<lessons.length-1)selectLesson(index+1);else navigate('journey');
 };
 const complete=()=>{
  if(!correct)return;
  writingDialog.current?.close();
  setProgress(p=>recordCompletion(p,lesson.id));
  notify(`${lesson.char} learned. Your progress is saved.`);
  if(index<lessons.length-1)selectLesson(index+1);else navigate('journey');
 };
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>{const el=e.target as HTMLElement;if(['INPUT','TEXTAREA','SELECT','BUTTON'].includes(el.tagName)||el.isContentEditable||settings.current?.open||drawer.current?.open||writingDialog.current?.open||view!=='learn')return;
  if(e.key==='ArrowRight'){e.preventDefault();selectLesson(index+1);}if(e.key==='ArrowLeft'){e.preventDefault();selectLesson(index-1);}if(tab==='practice'&&['1','2','3','4'].includes(e.key)){e.preventDefault();setAnswer(lesson.choices[Number(e.key)-1]);}
 };window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey);},[view,index,selectLesson,tab,lesson]);
 const speak=()=>{
  if(!sound){notify('Pronunciation is turned off. Enable it in settings.');return;}
  if(!('speechSynthesis'in window)){notify('Mandarin audio is unavailable in this browser. Pinyin: '+lesson.pinyin);return;}
  const voices=window.speechSynthesis.getVoices();const voice=voices.find(v=>/zh[-_]CN/i.test(v.lang))||voices.find(v=>/^zh/i.test(v.lang));
  if(!voice){notify('No Mandarin voice is available on this device. Read the pinyin: '+lesson.pinyin);return;}
  window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(lesson.char);utterance.lang='zh-CN';utterance.voice=voice;utterance.rate=.75;utterance.onend=()=>setSpeaking(false);utterance.onerror=()=>{setSpeaking(false);notify('Audio could not play. Pinyin: '+lesson.pinyin);};setSpeaking(true);window.speechSynthesis.speak(utterance);
 };
 const toggleBookmark=()=>{setBookmarks(b=>b.includes(lesson.id)?b.filter(id=>id!==lesson.id):[...b,lesson.id]);};
 const openWriting=()=>{setTab('writing');setWritingOpen(true);writingDialog.current?.showModal();};
 const openHelper=()=>{setDrawerOpen(true);drawer.current?.showModal();};
 const fullScreen=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{notify('Full screen is unavailable here. Open the site in a browser tab for a larger view.');}};
 const visibleLessons=lessons.filter(l=>(filter==='All characters'||filter===l.category||(filter==='Saved'&&bookmarks.includes(l.id))||(filter==='Learned'&&progress[l.id]?.learned))&&`${l.char} ${l.meaning} ${l.pinyin} ${l.plain}`.toLowerCase().includes(query.toLowerCase()));
 return <div className={'app-shell '+(view==='learn'?'flashcards-shell':'')}>
  <a className="skip-link" href="#main">Skip to content</a>
  <header className="site-header">
   <a className="brand" href="#home" onClick={()=>navigate('home')} aria-label="InkTales home"><span className="seal">墨</span><span>Ink<span className="brand-light">Tales</span><small>STORIES BEHIND THE STROKES</small></span></a>
   <nav aria-label="Main navigation">{([{id:'learn',label:'Flashcards',icon:BookOpen},{id:'explore',label:'Characters',icon:Grid2X2},{id:'journey',label:'My journey',icon:Route},{id:'assistant',label:'Momo 墨墨',icon:Sparkles}] as const).map(n=><a key={n.id} className={view===n.id?'nav-link active':'nav-link'} aria-current={view===n.id?'page':undefined} href={'#'+n.id} onClick={()=>navigate(n.id)}><n.icon size={26} strokeWidth={1.65}/><span>{n.label}{n.id==='assistant'&&<small>AI companion</small>}</span></a>)}</nav>
   <div className="sidebar-progress"><div className="sidebar-progress-label"><Leaf size={18}/><span>{learned} of 12 learned</span></div><div className="sidebar-progress-track"><span style={{width:learned/12*100+'%'}}/></div><button className="text-button" onClick={()=>navigate('journey')}>View your journey<ArrowRight size={16}/></button></div>
   <div className="header-right"><button className="settings-link" onClick={()=>settings.current?.showModal()}><Settings2 size={23}/><span>Settings</span></button><a className="sidebar-credits" href="/credits" target="_blank" rel="noreferrer">Sources & credits<ArrowUpRightIcon/></a></div>
  </header>
  <main id="main" className={'main-content view-'+view}>
   {view==='learn'&&<section className="flashcard-frame" aria-label={'Flashcard: '+lesson.char+', '+lesson.meaning}>
    <CornerMarks/>
    <div className="flashcard-toolbar"><label className="lesson-index"><select value={index} aria-label="Choose flashcard" onChange={e=>selectLesson(Number(e.target.value))}>{lessons.map((l,n)=><option key={l.id} value={n}>{n===index?`${String(n+1).padStart(2,'0')} / 12`:`${String(n+1).padStart(2,'0')} · ${l.char} ${l.meaning}`} </option>)}</select><ChevronDown size={20}/></label></div>
    <div className="card-surface">
     <div className={'character-panel '+lesson.tint} key={lesson.id}>
      <CharacterIllustration key={lesson.id} lesson={lesson} speaking={speaking} onListen={speak} onError={notify}/>
     </div>
     <div className="lesson-panel">
      <div className="meaning-heading"><div><h2>{lesson.meaning}</h2></div><button className={'bookmark-control '+(bookmarks.includes(lesson.id)?'is-saved':'')} aria-label={bookmarks.includes(lesson.id)?'Remove bookmark':'Save character'} aria-pressed={bookmarks.includes(lesson.id)} onClick={toggleBookmark}><Bookmark size={23} fill={bookmarks.includes(lesson.id)?'currentColor':'none'}/><span>{bookmarks.includes(lesson.id)?'Saved':'Save'}</span></button></div>
      <h3 className="story-heading"><BookOpen size={22}/>Story</h3>
      <div className="tab-content story-panel"><div className="story-content"><p className="story-text">{lesson.story}</p><div className="memory-note"><MemorySketch id={lesson.id}/><p>{lesson.visual}</p></div><button className="primary-button story-next" onClick={openWriting}><PenLine size={21}/>Practice writing</button></div></div>
      <Evolution lesson={lesson}/>
     </div>
    </div>
    <div className="flashcard-footer"><button className="ask-inline" onClick={openHelper}><Sparkles size={24}/><span>Ask Momo <span lang="zh-CN">墨墨</span></span></button><div className="review-actions" aria-label="How well do you remember this character?"><button className="review-again" onClick={()=>reviewCard(false)} aria-label="Again — revisit this character" title="Again — revisit this character"><X size={30}/></button><button className="review-remember" onClick={()=>reviewCard(true)} aria-label="Got it — remember and continue" title="Got it — remember and continue"><Check size={31}/></button></div><button className="icon-button expand-button" aria-label="Expand to full screen" onClick={fullScreen}><Maximize2 size={23}/></button></div>
   </section>}
   {view==='home'&&<>
    <section className="home-hero"><img src="/assets/mountain.webp" alt="A hand-painted landscape of misty Chinese mountains"/><div className="home-hero-veil"/><div className="home-copy"><span className="eyebrow">A QUIETER WAY TO LEARN CHINESE</span><h1>A little ink.<br/>A world of <em>meaning.</em></h1><p>Discover the stories behind Chinese characters.<br/>One picture, one story, one small step at a time.</p><div className="home-ctas"><button className="primary-button" onClick={()=>selectLesson(Math.max(0,lessons.findIndex(l=>!progress[l.id]?.learned)))}>Start learning<ArrowRight size={18}/></button><button className="text-button" onClick={()=>navigate('explore')}>Explore characters<ArrowRight size={16}/></button></div><span className="no-account"><Leaf size={14}/>No account. No pressure. Just curiosity.</span></div><span className="home-hanzi" lang="zh-CN">山水</span><CornerMarks/></section>
    <div className="method-heading"><span className="eyebrow">A CHARACTER BECOMES A STORY</span><h2>A small ritual for a lasting memory.</h2></div><div className="method-grid">{[{icon:Mountain,title:'See the connection',text:'Find familiar shapes in an unfamiliar character.'},{icon:BookOpen,title:'Remember the story',text:'Let a simple picture give every stroke a little meaning.'},{icon:PenLine,title:'Make it your own',text:'Watch, trace, and practice. Let your curiosity lead.'}].map((m,n)=><div key={m.title}><span className="method-number">0{n+1}</span><m.icon size={26} strokeWidth={1.3}/><h3>{m.title}</h3><p>{m.text}</p></div>)}</div>
   </>}
   {view==='explore'&&<>
    <div className="section-heading"><h1>Characters<span className="rust">.</span></h1><p>Choose a picture to open its story, hear the sound, and practice writing.</p></div>
    <div className="explorer-toolbar"><div className="filter-buttons" aria-label="Filter characters">{['All characters','Nature','People & life','Saved','Learned'].map(f=><button key={f} className={filter===f?'selected':''} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}{f==='Saved'&&<Bookmark size={13}/>}</button>)}</div><label className="search-input"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Character, pinyin, or meaning" aria-label="Search characters"/>{query&&<button aria-label="Clear search" onClick={()=>setQuery('')}><X size={14}/></button>}</label></div>
    <div className="character-grid">{visibleLessons.map(l=><button className={'explore-card '+l.tint} key={l.id} onClick={()=>selectLesson(lessons.indexOf(l))}><div className="explore-art"><img src={'/assets/characters/'+l.id+'.webp'} alt=""/><span className="explore-lettering"><span lang="zh-CN">{l.char}</span><span className="explore-pinyin">{l.pinyin}</span></span>{progress[l.id]?.learned&&<span className="learned-mark"><Check size={13}/>Learned</span>}{bookmarks.includes(l.id)&&<Bookmark className="explore-bookmark" size={15} fill="currentColor"/>}</div><div className="explore-caption"><span><strong>{l.meaning}</strong><small>{l.strokes} strokes</small></span><ArrowRight size={19}/></div></button>)}</div>
    {!visibleLessons.length&&<div className="empty-state"><Search size={30}/><h2>No characters found, just yet.</h2><p>Try another meaning or pinyin, or explore the whole collection.</p><button className="text-button" onClick={()=>{setFilter('All characters');setQuery('');}}>Show all characters<ArrowRight size={16}/></button></div>}
   </>}
   {view==='journey'&&<JourneyDashboard progress={progress} bookmarks={bookmarks} onSelect={id=>selectLesson(lessons.findIndex(l=>l.id===id))} onCollection={f=>{setFilter(f);setQuery('');navigate('explore');}}/>}
   {view==='assistant'&&<section className="momo-page"><div className="momo-page-heading"><div className="momo-identity"><img src="/assets/momo.webp" alt="Momo, a smiling watercolor ink companion"/><div><h1>Momo <span lang="zh-CN">墨墨</span></h1><p>Your Chinese learning companion</p></div></div><button className="secondary-button" aria-label="New chat" title="Start a new chat" onClick={()=>setChatSession(n=>n+1)}><MessageCircle size={23}/>New chat</button></div><div className="momo-lesson-picker"><label htmlFor="momo-lesson">Learning today</label><div><select id="momo-lesson" value={index} onChange={e=>setIndex(Number(e.target.value))}>{lessons.map((l,n)=><option key={l.id} value={n}>{l.char} · {l.pinyin} · {l.meaning}</option>)}</select><ChevronDown size={20}/></div><button className="text-button" onClick={()=>selectLesson(index)}><BookOpen size={19}/>Open flashcard</button></div><AssistantChat key={lesson.id+'-'+chatSession} lesson={lesson}/></section>}
  </main>
  {view!=='learn'&&view!=='assistant'&&<footer className="site-footer"><a className="footer-brand" href="#home" onClick={()=>navigate('home')}>InkTales<span>一笔一故事</span></a><span>Small steps. Lasting stories.</span><a href="/credits" target="_blank" rel="noreferrer">Credits & sources<ArrowUpRightIcon/></a></footer>}
  <dialog className="writing-dialog paper-dialog" aria-label="Writing practice" ref={writingDialog} onClose={()=>setWritingOpen(false)}><div className="dialog-heading"><h2>{tab==='practice'?'A little practice':'Practice writing'} <span lang="zh-CN">{lesson.char}</span></h2><button className="icon-button" aria-label="Close writing practice" onClick={()=>writingDialog.current?.close()}><X size={24}/></button></div>{writingOpen&&<div className="writing-dialog-body">{tab==='writing'&&<Writing key={lesson.id} lesson={lesson} onContinue={()=>setTab('practice')}/>}
       {tab==='practice'&&<div className="practice-content"><h3>What does <span lang="zh-CN">{lesson.char}</span> mean?</h3><div className="answer-options">{lesson.choices.map((choice,n)=><button key={choice} onClick={()=>setAnswer(choice)} className={(answer===choice?(correct?'correct':'incorrect'):'')+' answer-option'}><span className="answer-letter">{String.fromCharCode(65+n)}</span>{choice}{answer===choice&&(correct?<CheckCircle2 size={20}/>:<X size={20}/>)}</button>)}</div><div className={'answer-feedback '+(answer?(correct?'success':'try-again'):'')} aria-live="polite">{answer?(correct?<><CheckCircle2 size={18}/><span>Well remembered. Make it part of your journey.</span></>:<><RotateCcw size={17}/><span>Not quite. Try picturing {lesson.meaning}.</span></>):<span>Choose the meaning that matches this character.</span>}</div><button className="primary-button complete-lesson" disabled={!correct} onClick={complete}>{index===lessons.length-1?'Complete this chapter':'Complete & continue'}<Check size={21}/></button></div>}
{tab==='practice'&&<button className="text-button" onClick={()=>setTab('writing')}><PenLine size={18}/>Back to writing</button>}</div>}</dialog>
  <dialog className="settings-dialog paper-dialog" aria-label="Learning settings" ref={settings} onClose={()=>setResetConfirm(false)}><div className="dialog-heading"><span className="eyebrow">MAKE YOURSELF AT HOME</span><button className="icon-button" aria-label="Close settings" onClick={()=>settings.current?.close()}><X size={20}/></button></div><h2>A space for your pace.</h2><p className="dialog-intro">A few little comforts for your learning ritual.</p><label className="preference-row"><span><strong>Pronunciation audio</strong><small>Use your device’s Mandarin voice.</small></span><input type="checkbox" checked={sound} onChange={e=>setSound(e.target.checked)}/></label><label className="preference-row"><span><strong>A calmer experience</strong><small>Reduce decorative motion and transitions.</small></span><input type="checkbox" checked={calm} onChange={e=>setCalm(e.target.checked)}/></label><div className="settings-storage"><Leaf size={18}/><p>Progress and saved characters stay in this browser. No account or personal details needed.</p></div><div className="reset-area">{resetConfirm?<><p>Reset all learning progress on this device? Saved characters will stay.</p><button className="danger-button" onClick={()=>{setProgress({});setResetConfirm(false);notify('A fresh page. Your learning progress has been reset.');settings.current?.close();}}>Yes, start fresh</button><button className="text-button" onClick={()=>setResetConfirm(false)}>Keep my progress</button></>:<button className="text-button reset-button" onClick={()=>setResetConfirm(true)}><RotateCcw size={14}/>Reset learning progress</button>}</div><a className="credits-link" href="/credits" target="_blank" rel="noreferrer">Credits, content & privacy<ArrowUpRightIcon/></a></dialog>
  <dialog className="assistant-drawer" aria-label="Momo 墨墨 learning companion" ref={drawer} onClose={()=>setDrawerOpen(false)}><div className="drawer-heading"><div><Sparkles size={20}/><span>Momo <span lang="zh-CN">墨墨</span><small>Your Chinese learning companion</small></span></div><button className="icon-button" aria-label="Close Momo" onClick={()=>drawer.current?.close()}><X size={20}/></button></div>{drawerOpen&&<AssistantChat key={lesson.id} lesson={lesson} compact/>}</dialog>
  <div className={'toast '+(toast?'visible':'')} role="status" aria-live="polite"><Leaf size={17}/>{toast}</div>
 </div>;
}

function ArrowUpRightIcon(){return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>}

function Writing({lesson,onContinue}:{lesson:Lesson;onContinue:()=>void}){
 const target=useRef<HTMLDivElement>(null);const writer=useRef<Writer|null>(null);
 const [status,setStatus]=useState<'loading'|'ready'|'playing'|'tracing'|'error'>('loading');const [feedback,setFeedback]=useState('Follow each stroke, one at a time.');const [traceDone,setTraceDone]=useState(false);
 useEffect(()=>{
  let disposed=false;const controller=new AbortController();
  const init=async()=>{try{
   await loadHanziWriter();
   const res=await fetch('/data/'+encodeURIComponent(lesson.char)+'.json',{signal:controller.signal});if(!res.ok)throw new Error('Data unavailable');const data=await res.json();
   if(disposed||!target.current||!window.HanziWriter)return;target.current.replaceChildren();writer.current=window.HanziWriter.create(target.current,lesson.char,{width:Math.max(90,Math.min(196,target.current.clientWidth)),height:Math.max(90,Math.min(196,target.current.clientWidth)),padding:13,strokeColor:'#354c47',outlineColor:'#e6dfd1',radicalColor:'#a45843',showOutline:true,strokeAnimationSpeed:.8,delayBetweenStrokes:250,charDataLoader:(_char:string,onLoad:(data:unknown)=>void)=>onLoad(data)});setStatus('ready');
  }catch{if(!disposed)setStatus('error');}};init();return()=>{disposed=true;controller.abort();writer.current?.cancelQuiz();writer.current=null;};
 },[lesson.char]);
 const play=async()=>{if(!writer.current||status==='playing')return;writer.current.cancelQuiz();setStatus('playing');setFeedback('Watch how each stroke finds its place.');try{await writer.current.animateCharacter();setStatus('ready');setFeedback('Your turn? Try tracing, or play it once more.');}catch{setStatus('error');}};
 const trace=()=>{if(!writer.current||status==='playing')return;setStatus('tracing');setFeedback('Draw over the guide with your mouse or finger.');setTraceDone(false);writer.current.quiz({showHintAfterMisses:2,onMistake:()=>setFeedback('A gentle hint: follow the highlighted stroke.'),onCorrectStroke:()=>setFeedback('That’s it. Keep going, one stroke at a time.'),onComplete:()=>{setStatus('ready');setTraceDone(true);setFeedback('Beautifully written! You’ve traced every stroke.');}});};
 return <div className="writing-content"><div className="writing-heading"><span className="eyebrow">ONE STROKE AT A TIME</span><span>{lesson.strokes} strokes</span></div><div className="writing-stage"><div className="writing-grid" ref={target} aria-label={'Stroke-order canvas for '+lesson.char}/>{status==='loading'&&<span className="writing-loading"><LoaderCircle className="spin" size={21}/>Preparing your brush…</span>}{status==='error'&&<p className="writing-error">The writing guide could not load. Reopen this tab to try again.</p>}</div><div className="writing-controls"><button className="primary-button" disabled={status==='loading'||status==='playing'||status==='error'} onClick={play}>{status==='playing'?<LoaderCircle className="spin" size={15}/>:<Play size={15}/>} {status==='playing'?'Writing…':'Play strokes'}</button><button className="secondary-button" onClick={trace} disabled={status==='loading'||status==='playing'||status==='error'}><PenLine size={15}/>{status==='tracing'?'Start again':'Try tracing'}</button></div><p className={'writing-feedback '+(traceDone?'traced':'')} aria-live="polite">{traceDone&&<CheckCircle2 size={14}/>} {feedback}</p><button className="text-button practice-next" onClick={onContinue}>Ready for a little practice?<ArrowRight size={15}/></button></div>;
}

function AssistantChat({lesson,compact=false}:{lesson:Lesson;compact?:boolean}){
 const [messages,setMessages]=useState<Message[]>([]);const [question,setQuestion]=useState('');const [loading,setLoading]=useState(false);const [mode,setMode]=useState<'checking'|'offline'|'online'>('checking');const [error,setError]=useState('');const chatBottom=useRef<HTMLDivElement>(null);const abort=useRef<AbortController|null>(null);
 useEffect(()=>{const controller=new AbortController();fetch('/api/assistant',{signal:controller.signal}).then(r=>r.json()).then(d=>setMode((d as {configured:boolean}).configured?'online':'offline')).catch(()=>setMode('offline'));return()=>{controller.abort();abort.current?.abort();};},[]);
 useEffect(()=>{const container=chatBottom.current?.parentElement;if(container)container.scrollTo({top:container.scrollHeight,behavior:'smooth'});},[messages,loading]);
 const ask=async(text:string)=>{if(loading||!text.trim())return;const q=text.trim().slice(0,600);setQuestion('');setError('');const prior=messages.slice(-6);setMessages(m=>[...m,{role:'user',text:q}]);setLoading(true);const controller=new AbortController();abort.current=controller;
  try{const response=await fetch('/api/assistant',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,characterId:lesson.id,messages:prior.map(m=>({role:m.role,text:m.text}))}),signal:controller.signal});const data=await response.json() as {error?:string;answer:string;offline:boolean};if(!response.ok){setError(data.error||'The companion is taking a little break.');setMessages(m=>[...m,{role:'assistant',text:staticAnswer(q,lesson),offline:true}]);}else{setMode(data.offline?'offline':'online');setMessages(m=>[...m,{role:'assistant',text:data.answer,offline:data.offline}]);}}
  catch(e){if((e as Error).name!=='AbortError'){setError('The connection is unavailable. Your lesson guide is still here.');setMode('offline');setMessages(m=>[...m,{role:'assistant',text:staticAnswer(q,lesson),offline:true}]);}}finally{setLoading(false);}
 };
 return <div className={'assistant-chat '+(compact?'compact':'')}><div className="chat-context"><span className="context-char" lang="zh-CN">{lesson.char}</span><span>Exploring <strong>{lesson.meaning}</strong><small>{lesson.pinyin} · {lesson.strokes} strokes</small></span><span className={'chat-mode '+mode}><i/>{mode==='checking'?'Connecting':mode==='offline'?'Offline guide':'AI connected'}</span></div><div className="chat-messages" aria-live="polite">{!messages.length?<div className="chat-welcome"><img className="momo-welcome-art" src="/assets/momo.webp" alt=""/><h3>Hi, I’m Momo<span className="rust">.</span></h3><p>Let’s discover Chinese, one character at a time.</p><div className="suggested-questions">{['Help me remember this character','How do I write it?','Show me an example word'].map(q=><button key={q} onClick={()=>ask(q)}>{q}<ArrowUpRightIcon/></button>)}</div></div>:messages.map((m,n)=><div className={'chat-message '+m.role} key={n}>{m.role==='assistant'&&<span className="message-icon"><Sparkles size={14}/></span>}<div>{m.offline&&<span className="offline-label">MOMO · LESSON GUIDE</span>}<p>{m.text}</p></div></div>)}{loading&&<div className="chat-thinking"><Sparkles size={15}/><span>Finding the words…</span><LoaderCircle className="spin" size={15}/></div>}<div ref={chatBottom}/></div>{error&&<p className="chat-error" role="alert"><Info size={14}/>{error}</p>}<form className="chat-form" onSubmit={e=>{e.preventDefault();ask(question);}}><label className="sr-only" htmlFor={compact?'drawer-question':'page-question'}>Your question about Chinese characters</label><input id={compact?'drawer-question':'page-question'} value={question} onChange={e=>setQuestion(e.target.value)} maxLength={600} placeholder={'Ask Momo about '+lesson.char+'…'} disabled={loading}/><button aria-label="Send question" disabled={loading||!question.trim()} type="submit"><Send size={17}/></button></form><p className="chat-disclosure">{mode==='offline'?'Offline guide · Uses course notes. Live AI is not connected.':'Momo can make mistakes. Memory stories are not verified history.'}</p>{mode==='online'&&<p className="chat-privacy">Questions and lesson context are sent to Google Gemini. Avoid sharing personal details.</p>}</div>;
}

function MemorySketch({id}:{id:string}){
 const shapes:Record<string,React.ReactNode>={
  mountain:<><path d="M3 45 19 21 27 34 39 7 51 35 59 23 75 45"/><path d="m33 20 6 4 6-4"/></>,
  water:<><path d="M43 4c-20 11 15 20-8 31S22 48 34 51"/><path d="M4 16c6 4 10 4 16 0m39 6c5-4 10-4 15 0M3 42c6-4 12-4 18 0m35 2c6 4 12 4 18 0"/></>,
  sun:<><circle cx="39" cy="27" r="14"/><path d="M39 2v5m0 40v5M14 27H9m60 0h-5M21 9l4 4m28 28 4 4m0-36-4 4M25 41l-4 4"/></>,
  moon:<path d="M49 4A24 24 0 1 0 65 42 24 24 0 0 1 49 4Z"/>,
  tree:<><path d="M39 48V14m0 16L23 21m16 16 17-14m-17-1L28 11m11 9L50 8m-11 5V3"/><path d="M25 50q14-5 28 0"/></>,
  forest:<><path d="M22 48V14m0 15L9 21m13 16L36 25m-14-5-8-10m8 7 8-11M56 48V16m0 14L43 22m13 15 14-12m-14-3-8-10m8 7 9-11"/><path d="M8 51q30-5 62 0"/></>,
  fire:<><path d="M39 51C8 50 19 24 31 18c-3 12 2 15 5 15 8-11 3-21 8-30 5 13 25 30 15 41-4 5-11 7-20 7Z"/><path d="M37 49c-7-5-6-12 3-20 0 8 12 13 4 20"/></>,
  person:<><circle cx="40" cy="8" r="5"/><path d="m25 49 15-19 15 19M40 30V18m0 1L24 30m16-11 15 10"/></>,
  big:<><circle cx="39" cy="10" r="5"/><path d="M39 19v17m0-12L13 13m26 11 26-11M24 51l15-15 15 15"/></>,
  small:<><circle cx="39" cy="38" r="8"/><circle cx="14" cy="43" r="3"/><circle cx="64" cy="43" r="3"/><path d="M8 52h62"/></>,
  mouth:<><path d="M15 23q24-25 48 0-24 39-48 0Z"/><path d="M18 24h42M39 4V1m-20 8-4-5m44 5 4-5"/></>,
  field:<><path d="m12 16 39-9 17 31-40 11Z"/><path d="m31 12 18 32M20 31l40-10m-41-1 39-10M24 39l39-10"/></>,
 };
 return <svg className="memory-sketch" viewBox="0 0 78 56" width="49" height="39" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={'Visual memory cue for '+id}>{shapes[id]}</svg>;
}

function Evolution({lesson}:{lesson:Lesson}){
 const stages=(evolutionData as Record<string,{stage:string;label:string;available:boolean;file?:string;source?:string;description?:string}[]>)[lesson.char]||[];
 return <section className="evolution-strip" aria-label={'Character evolution for '+lesson.char}><div className="evolution-heading"><span className="eyebrow">THROUGH THE AGES</span><h3>Character evolution</h3></div><div className="evolution-stages">{stages.map(s=><a className={'evolution-stage '+(!s.available?'unavailable':'')} key={s.stage} href={s.source||'/credits#character-evolution'} target="_blank" rel="noreferrer" title={s.available?s.label+' form — view source on Wikimedia Commons':'No sourced form available in this collection'}><span className="evolution-glyph">{s.available&&s.file?<img src={s.file} alt={lesson.char+' in '+s.label}/>:<span aria-label="Not available">—</span>}</span><span className="evolution-label">{s.label}</span></a>)}<a className="evolution-stage modern" href="/credits#character-evolution" target="_blank" rel="noreferrer" title="Modern standard character"><span className="evolution-glyph" lang="zh-CN">{lesson.char}</span><span className="evolution-label">Today</span></a></div></section>;
}

'use client';

import {useState,useEffect,useRef,useCallback} from 'react';
import {ArrowRight,Bookmark,BookOpen,Check,Grid2X2,Home,Leaf,LogOut,Maximize2,MessageCircle,Search,Send,Sparkles,Volume2,X,Route,Info,LoaderCircle} from 'lucide-react';
import {pronunciationText,lessonArtwork,lessonCategories,lessons,staticAnswer,type Lesson,type Progress} from '@/lib/lessons';
import {supabase} from '@/lib/supabase';
import evolutionData from '@/lib/evolution-data.json';
import {recordCompletion,recordAgain} from '@/lib/progress';
import {JourneyDashboard} from './journey-dashboard';
import {CharacterIllustration} from './character-illustration';
import {HomeDashboard} from './home-dashboard';
import {LivingHanzi} from './living-hanzi';
import {MemoryCueIcon} from './memory-cue-icon';

type View='learn'|'explore'|'journey'|'assistant'|'home'|'living';
type Message={role:'user'|'assistant';text:string;offline?:boolean};
const STORAGE='inktales-progress-v1';
function loadObject<T,>(key:string,fallback:T):T {try {const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback;}catch{return fallback;}}
function CornerMarks(){return <><i className="corner tl"/><i className="corner tr"/><i className="corner bl"/><i className="corner br"/></>}

export default function InkTales({username='',initialView='learn'}:{username?:string;initialView?:View}){
 const [view,setView]=useState<View>(initialView);
 const [index,setIndex]=useState(0);
 const [progress,setProgress]=useState<Progress>({});
 const [bookmarks,setBookmarks]=useState<string[]>([]);
 const [toast,setToast]=useState('');
 const [loaded,setLoaded]=useState(false);
 const [filter,setFilter]=useState('All characters');
 const [query,setQuery]=useState('');
 const [drawerOpen,setDrawerOpen]=useState(false);
 const [speaking,setSpeaking]=useState(false);
 const [chatSession,setChatSession]=useState(0);
 const drawer=useRef<HTMLDialogElement>(null);
 const toastTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const lesson=lessons[index];
 const learned=Object.values(progress).filter(p=>p?.learned).length;
 const notify=useCallback((message:string)=>{setToast(message);if(toastTimer.current)clearTimeout(toastTimer.current);toastTimer.current=setTimeout(()=>setToast(''),4300);},[]);
 const signOut=async()=>{const {error}=await supabase.auth.signOut();if(error)notify('Unable to sign out. Please try again.');};
 useEffect(()=>{
  if('speechSynthesis' in window)window.speechSynthesis.getVoices();
  const saved=loadObject<Progress>(STORAGE,{});
  setProgress(saved&&typeof saved==='object'&&!Array.isArray(saved)?saved:{});
  const marks=loadObject<string[]>('inktales-bookmarks',[]);setBookmarks(Array.isArray(marks)?marks:[]);
  const parse=()=>{const [route,id]=location.hash.slice(1).split('/');if(['learn','explore','journey','assistant','home','living'].includes(route))setView(route as View);if(id){const n=lessons.findIndex(l=>l.id===id);if(n>=0)setIndex(n);}};
  parse();window.addEventListener('hashchange',parse);setLoaded(true);return()=>window.removeEventListener('hashchange',parse);
 },[]);
 useEffect(()=>{if(!loaded)return;try{localStorage.setItem(STORAGE,JSON.stringify(progress));}catch{notify('Your browser could not save progress. You can keep learning in this session.');}},[progress,loaded,notify]);
 useEffect(()=>{if(!loaded)return;try{localStorage.setItem('inktales-bookmarks',JSON.stringify(bookmarks));}catch{}},[bookmarks,loaded]);
 useEffect(()=>{if('speechSynthesis'in window)window.speechSynthesis.cancel();setSpeaking(false);},[index]);
 const navigate=useCallback((v:View,id?:string)=>{location.hash=v+(id?'/'+id:'');setView(v);if(id){const n=lessons.findIndex(l=>l.id===id);if(n>=0)setIndex(n);}window.scrollTo({top:0,behavior:'instant'});},[]);
 const selectLesson=useCallback((n:number)=>{if(n<0||n>=lessons.length)return;navigate('learn',lessons[n].id);},[navigate]);
 const reviewCard=(remembered:boolean)=>{
  setProgress(p=>remembered?recordCompletion(p,lesson.id):recordAgain(p,lesson.id));
  notify(remembered?`${lesson.char} remembered. Your progress is saved.`:`${lesson.char} is ready to revisit in My journey.`);
  if(index<lessons.length-1)selectLesson(index+1);else navigate('journey');
 };
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>{const el=e.target as HTMLElement;if(['INPUT','TEXTAREA','SELECT','BUTTON'].includes(el.tagName)||el.isContentEditable||drawer.current?.open||view!=='learn')return;
  if(e.key==='ArrowRight'){e.preventDefault();selectLesson(index+1);}if(e.key==='ArrowLeft'){e.preventDefault();selectLesson(index-1);}
 };window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey);},[view,index,selectLesson]);
 const speak=()=>{
  if(!('speechSynthesis'in window)){notify('Mandarin audio is unavailable in this browser. Pinyin: '+lesson.pinyin);return;}
  const voices=window.speechSynthesis.getVoices();const voice=voices.find(v=>/zh[-_]CN/i.test(v.lang))||voices.find(v=>/^zh/i.test(v.lang));
  if(!voice){notify('No Mandarin voice is available on this device. Read the pinyin: '+lesson.pinyin);return;}
  window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(pronunciationText(lesson));utterance.lang='zh-CN';utterance.voice=voice;utterance.rate=.75;utterance.onend=()=>setSpeaking(false);utterance.onerror=()=>{setSpeaking(false);notify('Audio could not play. Pinyin: '+lesson.pinyin);};setSpeaking(true);window.speechSynthesis.speak(utterance);
 };
 const toggleBookmark=()=>{setBookmarks(b=>b.includes(lesson.id)?b.filter(id=>id!==lesson.id):[...b,lesson.id]);};
 const openHelper=()=>{setDrawerOpen(true);drawer.current?.showModal();};
 const fullScreen=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{notify('Full screen is unavailable here. Open the site in a browser tab for a larger view.');}};
 const visibleLessons=lessons.filter(l=>(filter==='All characters'||filter===l.category||(filter==='Saved'&&bookmarks.includes(l.id))||(filter==='Learned'&&progress[l.id]?.learned))&&`${l.char} ${l.meaning} ${l.pinyin} ${l.plain}`.toLowerCase().includes(query.toLowerCase()));
 return <div className={'app-shell '+(view==='learn'?'flashcards-shell':view==='home'?'home-shell':'')}>
  <a className="skip-link" href="#main">Skip to content</a>
  <header className="site-header">
   <a className="brand" href="#home" onClick={()=>navigate('home')} aria-label="InkTales home"><span className="seal">墨</span><span>Ink<span className="brand-light">Tales</span><small>STORIES BEHIND THE STROKES</small></span></a>
   <nav aria-label="Main navigation">{([{id:'home',label:'Home',icon:Home},{id:'learn',label:'Flashcards',icon:BookOpen},{id:'living',label:'Living Hanzi',icon:Leaf},{id:'explore',label:'Characters',icon:Grid2X2},{id:'journey',label:'My journey',icon:Route},{id:'assistant',label:'Momo 墨墨',icon:Sparkles}] as const).map(n=><a key={n.id} className={view===n.id?'nav-link active':'nav-link'} aria-current={view===n.id?'page':undefined} href={'#'+n.id} onClick={()=>navigate(n.id)}><n.icon size={26} strokeWidth={1.65}/><span>{n.label}{n.id==='assistant'&&<small>AI companion</small>}</span></a>)}</nav>
   <button className="sidebar-signout" onClick={signOut}><LogOut size={18}/><span>Sign out</span></button>
  </header>
  <main id="main" className={'main-content view-'+view}>
   {view==='learn'&&<section className="flashcard-frame" aria-label={'Flashcard: '+lesson.char+', '+lesson.meaning}>
    <CornerMarks/>
    <div className="flashcard-toolbar"><span className="lesson-count" aria-label={`Card ${index+1} of ${lessons.length}`}>{String(index+1).padStart(2,'0')} / {String(lessons.length).padStart(2,'0')}</span></div>
    <div className="card-surface">
     <div className={'character-panel '+lesson.tint} key={lesson.id}>
      <CharacterIllustration key={lesson.id} lesson={lesson} speaking={speaking} onListen={speak} onError={notify}/>
     </div>
     <div className="lesson-panel">
      <div className="meaning-heading"><div><h2>{lesson.meaning}</h2></div><button className={'bookmark-control '+(bookmarks.includes(lesson.id)?'is-saved':'')} aria-label={bookmarks.includes(lesson.id)?'Remove bookmark':'Save character'} aria-pressed={bookmarks.includes(lesson.id)} onClick={toggleBookmark}><Bookmark size={23} fill={bookmarks.includes(lesson.id)?'currentColor':'none'}/><span>{bookmarks.includes(lesson.id)?'Saved':'Save'}</span></button></div>
      <h3 className="story-heading"><BookOpen size={22}/>Story</h3>
      <div className="tab-content story-panel"><div className="story-content"><p className="story-text">{lesson.story}</p><div className="memory-note"><MemorySketch id={lesson.id} char={lesson.char}/><p>{lesson.visual}</p></div></div></div>
      <Evolution lesson={lesson}/>
     </div>
    </div>
    <div className="flashcard-footer"><button className="ask-inline" onClick={openHelper}><Sparkles size={24}/><span>Ask Momo <span lang="zh-CN">墨墨</span></span></button><div className="review-actions" aria-label="How well do you remember this character?"><button className="review-again" onClick={()=>reviewCard(false)} aria-label="Again — revisit this character" title="Again — revisit this character"><X size={30}/></button><button className="review-remember" onClick={()=>reviewCard(true)} aria-label="Got it — remember and continue" title="Got it — remember and continue"><Check size={31}/></button></div><button className="icon-button expand-button" aria-label="Expand to full screen" onClick={fullScreen}><Maximize2 size={23}/></button></div>
   </section>}
   {view==='living'&&<LivingHanzi/>}
   {view==='home'&&<HomeDashboard username={username} progress={progress} bookmarks={bookmarks} onContinue={selectLesson} onExplore={selectLesson}/>}
   {view==='explore'&&<>
    <div className="explorer-toolbar"><div className="filter-buttons" aria-label="Filter characters">{['All characters',...lessonCategories].map(f=><button key={f} className={filter===f?'selected':''} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}</button>)}</div><label className="search-input"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Character, pinyin, or meaning" aria-label="Search characters"/>{query&&<button aria-label="Clear search" onClick={()=>setQuery('')}><X size={14}/></button>}</label></div>
    <p className="character-results-count" role="status">{visibleLessons.length} {visibleLessons.length===1?'character':'characters'}</p>
    <div className="character-grid">{visibleLessons.map(l=><button className={'explore-card '+l.tint} key={l.id} onClick={()=>selectLesson(lessons.indexOf(l))}><div className={'explore-art'+(l.category==='Numbers & Time'?' preserve-art-frame':'')}><img src={l.exploreImage||lessonArtwork(l)} loading="lazy" alt=""/><span className="explore-lettering"><span lang="zh-CN">{l.char}</span><span className="explore-pinyin">{l.pinyin}</span></span></div><div className="explore-caption"><strong>{l.meaning}</strong><ArrowRight size={19}/></div></button>)}</div>
    {!visibleLessons.length&&<div className="empty-state"><Search size={30}/><h2>No characters found, just yet.</h2><p>Try another meaning or pinyin, or explore the whole collection.</p><button className="text-button" onClick={()=>{setFilter('All characters');setQuery('');}}>Show all characters<ArrowRight size={16}/></button></div>}
   </>}
   {view==='journey'&&<JourneyDashboard progress={progress} bookmarks={bookmarks} onSelect={id=>selectLesson(lessons.findIndex(l=>l.id===id))} onCollection={f=>{setFilter(f);setQuery('');navigate('explore');}}/>}
   {view==='assistant'&&<section className="momo-page"><div className="momo-page-heading"><div className="momo-identity"><img src="/assets/momo.webp" alt="Momo, a smiling watercolor ink companion"/><div><h1>Momo <span lang="zh-CN">墨墨</span></h1><p>Your Chinese learning companion</p></div></div><button className="secondary-button" aria-label="New chat" title="Start a new chat" onClick={()=>setChatSession(n=>n+1)}><MessageCircle size={23}/>New chat</button></div><AssistantChat key={lesson.id+'-'+chatSession} lesson={lesson}/></section>}
  </main>
  <dialog className="assistant-drawer" aria-label="Momo 墨墨 learning companion" ref={drawer} onClose={()=>setDrawerOpen(false)}><div className="drawer-heading"><div><Sparkles size={20}/><span>Momo <span lang="zh-CN">墨墨</span><small>Your Chinese learning companion</small></span></div><button className="icon-button" aria-label="Close Momo" onClick={()=>drawer.current?.close()}><X size={20}/></button></div>{drawerOpen&&<AssistantChat key={lesson.id} lesson={lesson} compact/>}</dialog>
  <div className={'toast '+(toast?'visible':'')} role="status" aria-live="polite"><Leaf size={17}/>{toast}</div>
 </div>;
}

function ArrowUpRightIcon(){return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>}

function AssistantChat({lesson,compact=false}:{lesson:Lesson;compact?:boolean}){
 const [messages,setMessages]=useState<Message[]>([]);const [question,setQuestion]=useState('');const [loading,setLoading]=useState(false);const [mode,setMode]=useState<'checking'|'offline'|'online'>('checking');const [error,setError]=useState('');const chatBottom=useRef<HTMLDivElement>(null);const abort=useRef<AbortController|null>(null);
 useEffect(()=>{const controller=new AbortController();fetch('/api/assistant',{signal:controller.signal}).then(r=>r.json()).then(d=>setMode((d as {configured:boolean}).configured?'online':'offline')).catch(()=>setMode('offline'));return()=>{controller.abort();abort.current?.abort();};},[]);
 useEffect(()=>{const container=chatBottom.current?.parentElement;if(container)container.scrollTo({top:container.scrollHeight,behavior:'smooth'});},[messages,loading]);
 const ask=async(text:string)=>{if(loading||!text.trim())return;const q=text.trim().slice(0,600);setQuestion('');setError('');const prior=messages.slice(-6);setMessages(m=>[...m,{role:'user',text:q}]);setLoading(true);const controller=new AbortController();abort.current=controller;
  try{const response=await fetch('/api/assistant',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,characterId:lesson.id,messages:prior.map(m=>({role:m.role,text:m.text}))}),signal:controller.signal});const data=await response.json() as {error?:string;answer:string;offline:boolean};if(!response.ok){setError(data.error||'The companion is taking a little break.');setMessages(m=>[...m,{role:'assistant',text:staticAnswer(q,lesson),offline:true}]);}else{setMode(data.offline?'offline':'online');setMessages(m=>[...m,{role:'assistant',text:data.answer,offline:data.offline}]);}}
  catch(e){if((e as Error).name!=='AbortError'){setError('The connection is unavailable. Your lesson guide is still here.');setMode('offline');setMessages(m=>[...m,{role:'assistant',text:staticAnswer(q,lesson),offline:true}]);}}finally{setLoading(false);}
 };
 return <div className={'assistant-chat '+(compact?'compact':'')}><div className="chat-context"><span className="context-char" lang="zh-CN">{lesson.char}</span><span>Exploring <strong>{lesson.meaning}</strong><small>{lesson.pinyin} · {lesson.strokes} strokes</small></span><span className={'chat-mode '+mode}><i/>{mode==='checking'?'Connecting':mode==='offline'?'Offline guide':'AI connected'}</span></div><div className="chat-messages" aria-live="polite">{!messages.length?<div className="chat-welcome"><img className="momo-welcome-art" src="/assets/momo.webp" alt=""/><h3>Hi, I’m Momo<span className="rust">.</span></h3><p>Let’s discover Chinese, one character at a time.</p><div className="suggested-questions">{['Help me remember this character','How do I write it?','Show me an example word'].map(q=><button key={q} onClick={()=>ask(q)}>{q}<ArrowUpRightIcon/></button>)}</div></div>:messages.map((m,n)=><div className={'chat-message '+m.role} key={n}>{m.role==='assistant'&&<span className="message-icon"><Sparkles size={14}/></span>}<div>{m.offline&&<span className="offline-label">MOMO · LESSON GUIDE</span>}<p>{m.text}</p></div></div>)}{loading&&<div className="chat-thinking"><Sparkles size={15}/><span>Finding the words…</span><LoaderCircle className="spin" size={15}/></div>}<div ref={chatBottom}/></div>{error&&<p className="chat-error" role="alert"><Info size={14}/>{error}</p>}<form className="chat-form" onSubmit={e=>{e.preventDefault();ask(question);}}><label className="sr-only" htmlFor={compact?'drawer-question':'page-question'}>Your question about Chinese characters</label><input id={compact?'drawer-question':'page-question'} value={question} onChange={e=>setQuestion(e.target.value)} maxLength={600} placeholder={compact?'Ask Momo about '+lesson.char+'…':'Ask Momo about Chinese…'} disabled={loading}/><button aria-label="Send question" disabled={loading||!question.trim()} type="submit"><Send size={17}/></button></form><p className="chat-disclosure">{mode==='offline'?'Offline guide · Uses course notes. Live AI is not connected.':'Momo can make mistakes. Memory stories are not verified history.'}</p>{mode==='online'&&<p className="chat-privacy">Questions and lesson context are sent to Google Gemini. Avoid sharing personal details.</p>}</div>;
}

function MemorySketch({id,char}:{id:string;char:string}){
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
  'hanzi-5730':<><path d="M3 33q18-8 36-3t36-2M3 39q18-8 36-3t36-2M3 46q18-8 36-3t36-2"/><path d="M17 25v-9m0 5-5-5m5 4 5-6m37 13V13m0 8-5-5m5 3 5-6"/></>,
  'hanzi-571f':<><path d="M3 46q11-4 21-14l9-9 9 2 8-6 10 13 15 14M3 46h72"/><path d="M39 23v-13m0 7-6-5m6 5 6-5"/></>,
  'hanzi-84b8':<><path d="M8 39q22-19 43 0-21 17-43 0Zm43 0 16-9v18Z"/><circle cx="23" cy="37" r="1"/><path d="M26 27q-5-5 1-10t0-10m13 20q-5-5 1-10t0-10m13 20q-5-5 1-10t0-10"/></>,
 };
 return shapes[id]?<svg className="memory-sketch" viewBox="0 0 78 56" width="49" height="39" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={'Visual memory cue for '+char}>{shapes[id]}</svg>:<MemoryCueIcon char={char}/>;
}

function Evolution({lesson}:{lesson:Lesson}){
 const stages=(evolutionData as Record<string,{stage:string;label:string;available:boolean;file?:string;source?:string;description?:string}[]>)[lesson.char]||[
  {stage:'oracle',label:'Oracle bone',available:false},
  {stage:'bronze',label:'Bronze script',available:false},
  {stage:'seal',label:'Small seal',available:false},
 ];
 return <section className="evolution-strip" aria-label={'Character evolution for '+lesson.char}><div className="evolution-heading"><span className="eyebrow">THROUGH THE AGES</span><h3>Character evolution</h3>{stages.some(s=>!s.available)&&<span className="evolution-availability">— no sourced image yet</span>}</div><div className="evolution-stages">{stages.map(s=><a className={'evolution-stage '+(!s.available?'unavailable':'')} key={s.stage} href={s.source||'/credits#character-evolution'} target="_blank" rel="noreferrer" title={s.available?s.label+' form — view source on Wikimedia Commons':'No sourced form available in this collection'}><span className="evolution-glyph">{s.available&&s.file?<img src={s.file} alt={lesson.char+' in '+s.label}/>:<span aria-label="Not available">—</span>}</span><span className="evolution-label">{s.label}</span></a>)}<a className="evolution-stage modern" href="/credits#character-evolution" target="_blank" rel="noreferrer" title="Modern standard character"><span className="evolution-glyph" lang="zh-CN">{lesson.char}</span><span className="evolution-label">Today</span></a></div></section>;
}

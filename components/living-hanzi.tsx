'use client';

import {useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,Check,RotateCcw,Volume2} from 'lucide-react';
import {pronunciationText,lessonCategories,lessons} from '@/lib/lessons';
import {LivingCharacterTrace} from './living-tree-trace';
import {LivingNatureScene} from './living-nature-scene';
import {LivingLifeScene} from './living-life-scene';
import {LivingVocabularyScene} from './living-vocabulary-scene';

const sceneNotes:Record<string,{title:string;caption:string}>={
 mountain:{title:'Sketch a mountain.',caption:'A mountain reaches for the clouds.'},
 water:{title:'Let the water flow.',caption:'A little stream, always on its way.'},
 sun:{title:'Bring out the sun.',caption:'A new day rises from your ink.'},
 moon:{title:'Light up the night.',caption:'The moon keeps the stars company.'},
 tree:{title:'Grow a little tree.',caption:'A little tree stretches in the breeze.'},
 forest:{title:'Wake up the woods.',caption:'A whole little world among the trees.'},
 fire:{title:'Light a little fire.',caption:'A little warmth, dancing on the page.'},
 person:{title:'Meet a little traveler.',caption:'A little person, a new adventure.'},
 big:{title:'Make something big.',caption:'A little balloon becomes something big.'},
 small:{title:'Notice the little things.',caption:'A tiny world, waiting to be noticed.'},
 mouth:{title:'Say a little hello.',caption:'One little mouth, a world of words.'},
 field:{title:'Grow a little garden.',caption:'A field comes to life, row by row.'},
};

export function LivingHanzi(){
 const [index,setIndex]=useState(0);
 const [category,setCategory]=useState('All characters');
 const [query,setQuery]=useState('');
 const matching=lessons.map((item,index)=>({item,index})).filter(({item})=>(category==='All characters'||item.category===category)&&`${item.char} ${item.pinyin} ${item.plain} ${item.meaning}`.toLowerCase().includes(query.trim().toLowerCase()));
 const [strokes,setStrokes]=useState(0);
 const [complete,setComplete]=useState(false);
 const [run,setRun]=useState(0);
 const [replay,setReplay]=useState(0);
 const [audioNote,setAudioNote]=useState('');
 const speech=useRef<SpeechSynthesisUtterance|null>(null);
 const lesson=lessons[index];
 const note=sceneNotes[lesson.id]||{title:`Bring ${lesson.char} to life.`,caption:lesson.visual};
 const progress=strokes/lesson.strokes;
 const choose=(next:number)=>{setIndex((next+lessons.length)%lessons.length);setStrokes(0);setComplete(false);setRun(n=>n+1);setReplay(0);setAudioNote('');};
 const turn=(direction:number)=>{if(!matching.length)return;const current=matching.findIndex(entry=>entry.index===index);const next=current<0?(direction>0?0:matching.length-1):(current+direction+matching.length)%matching.length;choose(matching[next].index);};
 useEffect(()=>()=>{speech.current=null;if('speechSynthesis'in window)window.speechSynthesis.cancel();},[index]);
 const speak=()=>{
  if(!('speechSynthesis'in window)){setAudioNote(`Read it as ${lesson.pinyin}. Audio is unavailable on this device.`);return;}
  const voices=window.speechSynthesis.getVoices();
  const voice=voices.find(v=>/^zh[-_]CN$/i.test(v.lang))||voices.find(v=>/^zh[-_](TW|SG)$/i.test(v.lang)||/^cmn/i.test(v.lang));
  if(!voice){setAudioNote(`Read it as ${lesson.pinyin}. A Mandarin voice is not installed on this device.`);return;}
  window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(pronunciationText(lesson));utterance.lang='zh-CN';utterance.voice=voice;utterance.rate=.7;speech.current=utterance;utterance.onerror=()=>{if(speech.current===utterance)setAudioNote(`Read it as ${lesson.pinyin}. Audio could not play.`);};setAudioNote('');window.speechSynthesis.speak(utterance);
 };
 return <div className="lh-page">
  <h1 className="sr-only">Living Hanzi</h1>
  <div className="lh-picker-heading"><span>Choose a character</span><span>{matching.length} of {lessons.length} characters</span></div>
  <div className="lh-library-filters"><label>Category<select aria-label="Living Hanzi category" value={category} onChange={event=>{const next=event.target.value;setCategory(next);setQuery('');choose(lessons.findIndex(item=>next==='All characters'||item.category===next));}}>{['All characters',...lessonCategories].map(name=><option key={name}>{name}</option>)}</select></label><label>Find a character<input aria-label="Search Living Hanzi characters" placeholder="Character, pinyin, or meaning" value={query} onChange={event=>setQuery(event.target.value)}/></label></div>
  <nav className="lh-character-picker" aria-label="Choose a character to animate">{matching.map(({item,index:i})=><button key={item.id} aria-label={`${item.char} · ${item.pinyin} · ${item.meaning}`} aria-pressed={index===i} className={index===i?'is-selected':''} onClick={()=>choose(i)}><span lang="zh-CN">{item.char}</span><small>{item.pinyin}</small></button>)}</nav>
  {!matching.length&&<p role="status">No matching characters. Try another search.</p>}
  <section className="lh-notebook" aria-label={`Write ${lesson.char} to animate ${lesson.meaning}`}>
   <div className="lh-notebook-topline"><span>{lesson.category.toUpperCase()} <i>/</i> {String(index+1).padStart(2,'0')} OF {lessons.length}</span><div className="lh-page-turns"><button aria-label="Previous character" disabled={!matching.length} onClick={()=>turn(-1)}><ArrowLeft size={15}/></button><button aria-label="Next character" disabled={!matching.length} onClick={()=>turn(1)}><ArrowRight size={15}/></button></div></div>
   <div className="lh-spread">
    <div className={'lh-world '+(complete?'is-alive':'')}>
     <div className="lh-scene-stage" aria-live="off">
      <svg key={`${lesson.id}-${run}-${replay}`} className="lh-scene" viewBox="0 0 640 400" role="img" aria-label={`${lesson.meaning} animation, ${Math.round(progress*100)} percent drawn`} data-character={lesson.char} data-complete={complete}>
       <defs><pattern id="lh-scene-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-23)"><rect width="7" height="7" fill="#e2e6ba"/><path d="M0 0V7" stroke="#94a272" strokeWidth=".8" opacity=".5"/></pattern></defs>
       <LivingNatureScene id={lesson.id} progress={progress} complete={complete}/>
       <LivingLifeScene id={lesson.id} progress={progress} complete={complete}/>
       {!sceneNotes[lesson.id]&&<LivingVocabularyScene lesson={lesson} progress={progress} complete={complete}/>}
      </svg>
     </div>
     <p className="lh-scene-caption">{note.caption}</p>
     <div className="lh-scene-controls"><span className={complete?'lh-ink-status is-complete':'lh-ink-status'} role="status">{complete?<><Check size={13}/>Your character is alive</>:<><span/>Your ink brings it to life</>}</span><button aria-label={`Replay ${lesson.meaning} animation`} disabled={!complete} onClick={()=>setReplay(n=>n+1)}><RotateCcw size={14}/>Replay</button></div>
    </div>
    <div className="lh-practice">
     <div className="lh-practice-title"><h2>{note.title}</h2><p>Write <span lang="zh-CN">{lesson.char}</span>, one stroke at a time.<br/>Watch your ink turn into a little world.</p></div>
     <LivingCharacterTrace key={`${lesson.id}-${run}`} lesson={lesson} onProgress={n=>{setStrokes(n);if(n<lesson.strokes)setComplete(false);}} onComplete={()=>{setStrokes(lesson.strokes);setComplete(true);}}/>
     <div className="lh-character-note"><div><strong lang="zh-CN">{lesson.char}</strong><span><b>{lesson.pinyin}</b><small>{lesson.meaning}</small></span></div><button aria-label={`Hear ${lesson.pinyin}${pronunciationText(lesson)!==lesson.char?' in '+pronunciationText(lesson):''}`} onClick={speak}><Volume2 size={18}/></button></div>
     {audioNote&&<p className="lh-audio-note" role="status">{audioNote}</p>}
    </div>
   </div>
  </section>
 </div>;
}

'use client';

import {useEffect,useRef,useState} from 'react';
import {Check,Play,RotateCcw} from 'lucide-react';
import {loadHanziWriter,type Writer} from '@/lib/hanzi-client';
import {loadCharacterStrokes} from '@/lib/character-strokes';
import type {Lesson} from '@/lib/lessons';
import styles from './living-tree-trace.module.css';

type CharacterWriter=Writer & {animateStroke:(index:number)=>Promise<{canceled?:boolean}>};
type Props={lesson:Lesson;onProgress:(strokes:number)=>void;onComplete:()=>void};

export function LivingCharacterTrace({lesson,onProgress,onComplete}:Props){
 const board=useRef<HTMLDivElement>(null);
 const writer=useRef<CharacterWriter|null>(null);
 const callbacks=useRef({onProgress,onComplete});
 callbacks.current={onProgress,onComplete};
 const run=useRef(0);
 const [attempt,setAttempt]=useState(0);
 const [mode,setMode]=useState<'loading'|'trace'|'watch'|'complete'|'error'>('loading');
 const [count,setCount]=useState(0);
 const [message,setMessage]=useState('Preparing your strokes…');

 const beginWriting=async()=>{
  const current=writer.current;
  if(!current)return;
  const token=++run.current;
  try{
   current.cancelQuiz();
   await current.hideCharacter({duration:0});
   if(token!==run.current)return;
   setCount(0);callbacks.current.onProgress(0);setMode('trace');
   setMessage(`Write ${lesson.char} over the pale strokes, one at a time.`);
   await current.quiz({
    showHintAfterMisses:1,
    highlightOnComplete:true,
    onMistake:()=>{if(token===run.current)setMessage('Follow the highlighted stroke, then try it again.');},
    onCorrectStroke:({strokeNum}:{strokeNum:number})=>{
     if(token!==run.current)return;
     const completed=strokeNum+1;
     setCount(completed);callbacks.current.onProgress(completed);
     setMessage(completed<lesson.strokes?`${completed} of ${lesson.strokes} strokes. Keep bringing your character to life.`:`${lesson.char} is alive! You wrote all ${lesson.strokes} strokes.`);
    },
    onComplete:()=>{if(token===run.current){setMode('complete');callbacks.current.onComplete();}},
   });
  }catch{
   if(token===run.current){setMode('error');setMessage('The writing tool paused. Try again to write your character.');}
  }
 };

 useEffect(()=>{
  let disposed=false;
  let resize:ResizeObserver|undefined;
  setMode('loading');
  Promise.all([loadHanziWriter(),loadCharacterStrokes(lesson.char)]).then(([,strokes])=>{
   if(disposed||!board.current)return;
   if(!strokes?.length||strokes.length!==lesson.strokes)throw new Error('Character writing data is unavailable.');
   const size=board.current.clientWidth||240;
   const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   const current=window.HanziWriter!.create(board.current,lesson.char,{
    width:size,height:size,padding:24,
    showCharacter:false,showOutline:true,
    strokeColor:'#354f91',outlineColor:'#d9d7ce',
    drawingColor:'#354f91',highlightColor:'#b55f46',highlightCompleteColor:'#354f91',
    strokeAnimationSpeed:reducedMotion?1000:1,strokeFadeDuration:reducedMotion?0:120,delayBetweenStrokes:reducedMotion?0:160,
    drawingWidth:10,showHintAfterMisses:1,
    charDataLoader:()=>({strokes:strokes.map(stroke=>stroke.path),medians:strokes.map(stroke=>stroke.median)}),
   }) as CharacterWriter;
   writer.current=current;
   resize=new ResizeObserver(()=>{
    if(board.current){const width=board.current.clientWidth;current.updateDimensions({width,height:width,padding:24});}
   });
   resize.observe(board.current);
   return beginWriting();
  }).catch(()=>{
   if(!disposed){setMode('error');setMessage('The writing tool could not load. Try again to write your character.');}
  });
  return()=>{
   disposed=true;++run.current;resize?.disconnect();
   writer.current?.cancelQuiz();writer.current?.pauseAnimation();writer.current=null;
   board.current?.replaceChildren();
  };
 // The callbacks live in a ref so scene updates do not reset a learner's stroke.
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[attempt,lesson.char,lesson.strokes]);

 const watch=async()=>{
  const current=writer.current;if(!current)return;
  const token=++run.current;
  current.cancelQuiz();
  setMode('watch');setCount(0);callbacks.current.onProgress(0);
  setMessage(`Watch ${lesson.char} come to life, stroke by stroke.`);
  try{
   await current.hideCharacter({duration:0});
   for(let index=0;index<lesson.strokes;index++){
    if(token!==run.current)return;
    const result=await current.animateStroke(index);
    if(token!==run.current||result?.canceled)return;
    setCount(index+1);callbacks.current.onProgress(index+1);
   }
   if(token===run.current){setMode('complete');setMessage(`${lesson.char} is alive! Choose Write again to try it yourself.`);callbacks.current.onComplete();}
  }catch{
   if(token===run.current){setMode('error');setMessage('The writing tool paused. Try again to animate your character.');}
  }
 };

 return <div className={styles.trace}>
  <div className={styles.boardWrap}>
   <div className={styles.board} ref={board} role="img" aria-label={`Writing square for ${lesson.char}. Write with a finger or mouse, or use Watch animation.`}/>
   {mode==='loading'&&<span className={styles.loading}>Loading ink…</span>}
   {mode==='error'&&<span className={styles.fallback} lang="zh-CN">{lesson.char}</span>}
   <span className={styles.corner}/>
  </div>
  <div className={styles.strokeCount} aria-label={`${count} of ${lesson.strokes} strokes complete`}>{Array.from({length:lesson.strokes},(_,index)=><span key={index} className={count>index?styles.filled:''}>{count>index?<Check size={12}/>:index+1}</span>)}<small>{count} / {lesson.strokes} strokes</small></div>
  <p className={styles.status} role="status" aria-live="polite">{message}</p>
  <div className={styles.controls}>
   {mode==='error'?<button onClick={()=>setAttempt(value=>value+1)}><RotateCcw size={14}/>Try again</button>:<>
    <button onClick={()=>{void beginWriting();}} disabled={mode==='loading'} aria-label={`Write ${lesson.char} again`}><RotateCcw size={14}/>Write again</button>
    <button onClick={()=>{void watch();}} disabled={mode==='loading'||mode==='watch'}><Play size={14}/>{mode==='watch'?'Animating…':'Watch animation'}</button>
   </>}
  </div>
 </div>;
}

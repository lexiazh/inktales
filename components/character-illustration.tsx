'use client';
import {useEffect,useRef,useState} from 'react';
import {LoaderCircle,PenLine,Play,Volume2} from 'lucide-react';
import type {Lesson} from '@/lib/lessons';
import {loadHanziWriter,type Writer} from '@/lib/hanzi-client';

export function CharacterIllustration({lesson,speaking,onListen,onError}:{lesson:Lesson;speaking:boolean;onListen:()=>void;onError:(message:string)=>void}){
 const target=useRef<HTMLDivElement>(null),writer=useRef<Writer|null>(null);
 const [ready,setReady]=useState(false),[mode,setMode]=useState<'idle'|'playing'|'tracing'>('idle');

 useEffect(()=>{
  let active=true;
  const element=target.current;
  if(!element)return;
  const size=()=>element.getBoundingClientRect().width||160;
  let observer:ResizeObserver|undefined;
  loadHanziWriter().then(()=>{
   if(!active||!window.HanziWriter)return;
   const width=size();
   writer.current=window.HanziWriter.create(element,lesson.char,{
    width,height:width,padding:0,showCharacter:false,showOutline:false,
    strokeColor:'rgba(255, 0, 0, 0.7)',drawingColor:'rgba(255, 0, 0, 0.7)',highlightColor:'rgba(255, 0, 0, 0.7)',highlightOnComplete:false,
    strokeAnimationSpeed:1.5,delayBetweenStrokes:200,
    charDataLoader:(char:string,done:(data:unknown)=>void,fail:(error:unknown)=>void)=>{
     fetch('/data/'+encodeURIComponent(char)+'.json').then(response=>{
      if(!response.ok)throw new Error('Character data unavailable');
      return response.json();
     }).then(done).catch(fail);
    },
    onLoadCharDataSuccess:()=>{if(active)setReady(true);},
    onLoadCharDataError:()=>{if(active)onError('This character could not load. Try again later.');},
   });
   observer=new ResizeObserver(()=>{const width=size();writer.current?.updateDimensions({width,height:width,padding:0});});
   observer.observe(element);
  }).catch(()=>{if(active)onError('Writing tools could not load. Try again later.');});
  return()=>{active=false;observer?.disconnect();writer.current?.cancelQuiz();writer.current?.pauseAnimation();writer.current=null;element.replaceChildren();};
 },[lesson.char,onError]);

 const play=async()=>{
  if(!writer.current||mode==='playing')return;
  const current=writer.current;
  current.cancelQuiz();setMode('playing');
  try{
   await current.hideCharacter({duration:0});
   await current.animateCharacter();
   await current.hideCharacter({duration:0});
  }catch{if(writer.current===current)onError('Stroke playback could not finish. Try again.');
  }finally{if(writer.current===current)setMode('idle');}
 };
 const trace=async()=>{
  if(!writer.current||mode==='playing')return;
  const current=writer.current;
  current.cancelQuiz();setMode('tracing');
  try{
   await current.hideCharacter({duration:0});
   if(writer.current!==current)return;
   current.quiz({onComplete:async()=>{
    if(writer.current!==current)return;
    await current.hideCharacter({duration:0});
    if(writer.current===current)setMode('idle');
   }});
  }catch{if(writer.current===current){setMode('idle');onError('Tracing could not start. Try again.');}}
 };

 return <>
  <div className="character-visual">
   <figure className="character-art"><img src={'/assets/characters/'+lesson.id+'.webp'} alt={lesson.imageAlt} fetchPriority="high"/></figure>
   <div className={'character-hanzi animated-hanzi '+(mode==='tracing'?'is-tracing':'')} lang="zh-CN" aria-label={lesson.char}>
    <span className="hanzi-fallback" aria-hidden="true">{lesson.char}</span>
    <div ref={target} className="hanzi-writer" aria-hidden="true"/>
   </div>
  </div>
  <div className="character-center"><div className="pinyin">{lesson.pinyin}</div><div className="character-tools"><button onClick={onListen} className={'pronunciation-button '+(speaking?'speaking':'')} aria-label={'Hear '+lesson.pinyin}><Volume2 size={24} strokeWidth={1.6}/><span>Listen</span></button><button onClick={play} disabled={!ready||mode==='playing'} className="pronunciation-button" aria-label="Play strokes on the character" aria-busy={mode==='playing'} title="Play stroke order on the character">{mode==='playing'?<LoaderCircle className="spin" size={24}/>:<Play size={24} strokeWidth={1.6}/>}<span>Strokes</span></button><button onClick={trace} disabled={!ready||mode==='playing'} className="pronunciation-button" aria-label={mode==='tracing'?'Start tracing again':'Trace the character'} title="Trace the character with a finger or mouse"><PenLine size={24} strokeWidth={1.6}/><span>{mode==='tracing'?'Again':'Trace'}</span></button></div><span className="sr-only" role="status">{mode==='playing'?'Playing stroke order for '+lesson.char:mode==='tracing'?'Trace '+lesson.char+' on the character':''}</span></div>
 </>;
}

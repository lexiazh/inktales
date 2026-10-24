'use client';
import {useEffect,useRef,useState} from 'react';
import {LoaderCircle,Play,Volume2} from 'lucide-react';
import type {Lesson} from '@/lib/lessons';
import {loadHanziWriter,type Writer} from '@/lib/hanzi-client';

export function CharacterIllustration({lesson,speaking,onListen,onError}:{lesson:Lesson;speaking:boolean;onListen:()=>void;onError:(message:string)=>void}){
 const canvas=useRef<HTMLDivElement>(null);const writer=useRef<Writer|null>(null);const controller=useRef<AbortController|null>(null);const mounted=useRef(false);const busy=useRef(false);
 const [status,setStatus]=useState<'ready'|'loading'|'playing'>('ready');
 useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;controller.current?.abort();writer.current?.pauseAnimation();};},[]);
 const play=async()=>{
  if(busy.current)return;busy.current=true;setStatus('loading');
  try{
   await loadHanziWriter();if(!mounted.current||!canvas.current||!window.HanziWriter)return;
   if(!writer.current){
    controller.current=new AbortController();
    const response=await fetch('/data/'+encodeURIComponent(lesson.char)+'.json',{signal:controller.current.signal});if(!response.ok)throw new Error('Writing data unavailable');const data=await response.json();
    if(!mounted.current||!canvas.current)return;
    const size=canvas.current.clientWidth;
    writer.current=window.HanziWriter.create(canvas.current,lesson.char,{width:size,height:size,padding:0,strokeColor:'#1f4942',radicalColor:'#1f4942',outlineColor:'#1f4942',outlineOpacity:.12,showCharacter:false,showOutline:true,strokeAnimationSpeed:.75,delayBetweenStrokes:240,charDataLoader:(_char:string,onLoad:(data:unknown)=>void)=>onLoad(data)});
   }
   const svg=canvas.current.querySelector('svg');if(svg&&!svg.hasAttribute('viewBox'))svg.setAttribute('viewBox',`0 0 ${canvas.current.clientWidth} ${canvas.current.clientWidth}`);
   setStatus('playing');await writer.current.animateCharacter();
  }catch(error){if(mounted.current&&(error as Error).name!=='AbortError')onError('The stroke animation could not load. Please try Strokes again.');}
  finally{busy.current=false;if(mounted.current)setStatus('ready');}
 };
 return <>
  <div className="character-visual"><figure className="character-art"><img src={'/assets/characters/'+lesson.id+'.webp'} alt={lesson.imageAlt} fetchPriority="high"/></figure><div className={'character-hanzi animated-hanzi '+(status==='playing'?'is-playing':'')} lang="zh-CN" aria-label={lesson.char}><span className="resting-hanzi" aria-hidden="true">{lesson.char}</span><div className="stroke-canvas" ref={canvas} aria-hidden="true"/></div></div>
  <div className="character-center"><div className="pinyin">{lesson.pinyin}</div><div className="character-tools"><button onClick={onListen} className={'pronunciation-button '+(speaking?'speaking':'')} aria-label={'Hear '+lesson.pinyin}><Volume2 size={24} strokeWidth={1.6}/><span>Listen</span></button><button onClick={play} disabled={status!=='ready'} className="pronunciation-button" aria-label="Play strokes on the character" aria-busy={status!=='ready'} title="Play stroke order on the character">{status==='ready'?<Play size={24} strokeWidth={1.6}/>:<LoaderCircle className="spin" size={24}/>}<span>Strokes</span></button></div><span className="sr-only" role="status">{status==='loading'?'Loading stroke animation':status==='playing'?'Playing stroke order for '+lesson.char:''}</span></div>
 </>;
}

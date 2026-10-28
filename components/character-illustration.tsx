'use client';
import {useEffect,useId,useRef,useState} from 'react';
import {LoaderCircle,Play,Volume2} from 'lucide-react';
import type {Lesson} from '@/lib/lessons';
import {characterStrokes} from '@/lib/character-strokes';

export function CharacterIllustration({lesson,speaking,onListen}:{lesson:Lesson;speaking:boolean;onListen:()=>void;onError:(message:string)=>void}){
 const strokes=characterStrokes[lesson.char];
 const id='ink-'+useId().replace(/[^a-zA-Z0-9_-]/g,'');
 const lines=useRef<(SVGPolylineElement|null)[]>([]),ink=useRef<(SVGPathElement|null)[]>([]),animation=useRef<number|null>(null),busy=useRef(false);
 const [playing,setPlaying]=useState(false);
 useEffect(()=>()=>{if(animation.current!==null)cancelAnimationFrame(animation.current);},[]);

 const play=()=>{
  if(busy.current)return;
  busy.current=true;setPlaying(true);
  strokes.forEach(({length,radius},index)=>{
   lines.current[index]?.setAttribute('stroke-dashoffset',String(length+radius*3));
   ink.current[index]?.classList.remove('is-current');
  });
  const start=performance.now(),strokeMs=720,gapMs=180;
  const tick=(now:number)=>{
   const elapsed=now-start;
   strokes.forEach(({length,radius},index)=>{
    const progress=Math.max(0,Math.min(1,(elapsed-index*(strokeMs+gapMs))/strokeMs));
    lines.current[index]?.setAttribute('stroke-dashoffset',String(length*(1-progress)+radius*3));
    ink.current[index]?.classList.toggle('is-current',progress>0&&progress<1);
   });
   if(elapsed<(strokes.length-1)*(strokeMs+gapMs)+strokeMs)animation.current=requestAnimationFrame(tick);
   else{animation.current=null;busy.current=false;setPlaying(false);}
  };
  animation.current=requestAnimationFrame(tick);
 };

 return <>
  <div className="character-visual">
   <figure className="character-art"><img src={'/assets/characters/'+lesson.id+'.webp'} alt={lesson.imageAlt} fetchPriority="high"/></figure>
   <div className={'character-hanzi animated-hanzi'+(playing?' is-playing':'')} lang="zh-CN" aria-label={lesson.char}>
    <svg className="regular-hanzi" viewBox="0 0 1024 1024" aria-hidden="true">
     <defs>{strokes.map(({median,length,radius},index)=><mask key={index} id={`${id}-${index}`} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="-500" y="-600" width="2100" height="2100"><polyline ref={element=>{lines.current[index]=element;}} points={median.map(point=>point.join(',')).join(' ')} fill="none" stroke="#fff" strokeWidth={radius*2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={length+radius*2} strokeDashoffset={length+radius*3}/></mask>)}</defs>
     <g transform="translate(0 900) scale(1 -1)">
      {strokes.map(({path},index)=><path key={'base-'+index} className="stroke-base" d={path}/>)}
      {strokes.map(({path},index)=><path key={'ink-'+index} ref={element=>{ink.current[index]=element;}} className="stroke-ink" d={path} mask={`url(#${id}-${index})`}/>)}
     </g>
    </svg>
   </div>
  </div>
  <div className="character-center"><div className="pinyin">{lesson.pinyin}</div><div className="character-tools"><button onClick={onListen} className={'pronunciation-button '+(speaking?'speaking':'')} aria-label={'Hear '+lesson.pinyin}><Volume2 size={24} strokeWidth={1.6}/><span>Listen</span></button><button onClick={play} disabled={playing} className="pronunciation-button" aria-label="Play strokes on the character" aria-busy={playing} title="Trace strokes on the character">{playing?<LoaderCircle className="spin" size={24}/>:<Play size={24} strokeWidth={1.6}/>}<span>Strokes</span></button></div><span className="sr-only" role="status">{playing?'Tracing stroke order for '+lesson.char:''}</span></div>
 </>;
}

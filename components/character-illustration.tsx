'use client';
import {useEffect,useId,useRef,useState} from 'react';
import {LoaderCircle,Play,Volume2} from 'lucide-react';
import type {Lesson} from '@/lib/lessons';
import {characterGlyphs} from '@/lib/character-strokes';

export function CharacterIllustration({lesson,speaking,onListen}:{lesson:Lesson;speaking:boolean;onListen:()=>void;onError:(message:string)=>void}){
 const data=characterGlyphs[lesson.char];
 const id='ink-'+useId().replace(/[^a-zA-Z0-9_-]/g,'');
 const slices=useRef<(SVGPathElement|null)[][]>([]),revealed=useRef<number[]>([]),animation=useRef<number|null>(null),busy=useRef(false);
 const [playing,setPlaying]=useState(false);
 useEffect(()=>()=>{if(animation.current!==null)cancelAnimationFrame(animation.current);},[]);

 const play=()=>{
  if(busy.current)return;
  busy.current=true;setPlaying(true);
  slices.current.forEach((stroke,index)=>{
   revealed.current[index]=0;
   stroke.forEach(slice=>slice?.setAttribute('display','none'));
  });
  const start=performance.now(),strokeMs=720,gapMs=220;
  const tick=(now:number)=>{
   const elapsed=now-start;
   slices.current.forEach((stroke,index)=>{
    const progress=Math.max(0,Math.min(1,(elapsed-index*(strokeMs+gapMs))/strokeMs));
    const count=Math.floor(progress*stroke.length);
    while(revealed.current[index]<count){
     stroke[revealed.current[index]]?.removeAttribute('display');
     revealed.current[index]++;
    }
   });
   if(elapsed<(data.pieces.length-1)*(strokeMs+gapMs)+strokeMs){animation.current=requestAnimationFrame(tick);}
   else{animation.current=null;busy.current=false;setPlaying(false);}
  };
  animation.current=requestAnimationFrame(tick);
 };

 return <>
  <div className="character-visual">
   <figure className="character-art"><img src={'/assets/characters/'+lesson.id+'.webp'} alt={lesson.imageAlt} fetchPriority="high"/></figure>
   <div className="character-hanzi animated-hanzi" lang="zh-CN" aria-label={lesson.char}>
    <svg className="regular-hanzi" viewBox="0 0 1000 1000" aria-hidden="true">
     <defs>
      <path id={`${id}-glyph`} d={data.outline}/>
      {data.pieces.map((stroke,index)=><clipPath key={index} id={`${id}-${index}`} clipPathUnits="userSpaceOnUse">{stroke.map((slice,part)=><path key={part} ref={element=>{if(!slices.current[index])slices.current[index]=[];slices.current[index][part]=element;}} d={slice} display="none"/>)}</clipPath>)}
     </defs>
     <g transform={`translate(0 ${data.baseline}) scale(1 -1)`}>
      <use className="hanzi-base" href={`#${id}-glyph`}/>
      <g className="hanzi-trace">{data.pieces.map((_,index)=><use key={index} href={`#${id}-glyph`} clipPath={`url(#${id}-${index})`}/>)}</g>
     </g>
    </svg>
   </div>
  </div>
  <div className="character-center"><div className="pinyin">{lesson.pinyin}</div><div className="character-tools"><button onClick={onListen} className={'pronunciation-button '+(speaking?'speaking':'')} aria-label={'Hear '+lesson.pinyin}><Volume2 size={24} strokeWidth={1.6}/><span>Listen</span></button><button onClick={play} disabled={playing} className="pronunciation-button" aria-label="Play strokes on the character" aria-busy={playing} title="Trace strokes on the character">{playing?<LoaderCircle className="spin" size={24}/>:<Play size={24} strokeWidth={1.6}/>}<span>Strokes</span></button></div><span className="sr-only" role="status">{playing?'Tracing stroke order for '+lesson.char:''}</span></div>
 </>;
}

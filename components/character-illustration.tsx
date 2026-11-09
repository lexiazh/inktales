'use client';
import {useEffect,useId,useRef,useState,type PointerEvent} from 'react';
import {Check,LoaderCircle,Pencil,Play,RotateCcw,Volume2} from 'lucide-react';
import {pronunciationText,lessonArtwork,type Lesson} from '@/lib/lessons';
import {characterStrokes,loadCharacterStrokes,type PreparedStroke} from '@/lib/character-strokes';

export function CharacterIllustration({lesson,speaking,onListen}:{lesson:Lesson;speaking:boolean;onListen:()=>void;onError:(message:string)=>void}){
 const [strokes,setStrokes]=useState<PreparedStroke[]>(characterStrokes[lesson.char]||[]);
 const [loadError,setLoadError]=useState(false);
 const [loadAttempt,setLoadAttempt]=useState(0);
 useEffect(()=>{let active=true;setLoadError(false);loadCharacterStrokes(lesson.char).then(data=>{if(active)setStrokes(data);}).catch(()=>{if(active)setLoadError(true);});return()=>{active=false;};},[lesson.char,loadAttempt]);
 const id='ink-'+useId().replace(/[^a-zA-Z0-9_-]/g,'');
 const lines=useRef<(SVGPolylineElement|null)[]>([]),ink=useRef<(SVGPathElement|null)[]>([]),animation=useRef<number|null>(null),busy=useRef(false);
 const [playing,setPlaying]=useState(false);
 const [tracing,setTracing]=useState(false),[tracePaths,setTracePaths]=useState<string[]>([]);
 const drawing=useRef<number|null>(null);
 useEffect(()=>()=>{if(animation.current!==null)cancelAnimationFrame(animation.current);},[]);

 const tracePoint=(event:PointerEvent<SVGSVGElement>)=>{
  const matrix=event.currentTarget.getScreenCTM();
  if(!matrix)return null;
  const point=new DOMPoint(event.clientX,event.clientY).matrixTransform(matrix.inverse());
  return `${Math.round(Math.max(0,Math.min(1024,point.x)))} ${Math.round(Math.max(0,Math.min(1024,point.y)))}`;
 };
 const startTrace=(event:PointerEvent<SVGSVGElement>)=>{
  if(!tracing||drawing.current!==null||event.button!==0)return;
  const point=tracePoint(event);if(!point)return;
  event.preventDefault();event.currentTarget.setPointerCapture(event.pointerId);
  drawing.current=event.pointerId;
  setTracePaths(paths=>[...paths,`M ${point} L ${point}`]);
 };
 const moveTrace=(event:PointerEvent<SVGSVGElement>)=>{
  if(drawing.current!==event.pointerId)return;
  const point=tracePoint(event);if(!point)return;
  setTracePaths(paths=>[...paths.slice(0,-1),`${paths[paths.length-1]} L ${point}`]);
 };
 const endTrace=(event:PointerEvent<SVGSVGElement>)=>{
  if(drawing.current!==event.pointerId)return;
  drawing.current=null;
  if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
 };

 const play=()=>{
  if(busy.current||!strokes.length)return;
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
   <figure className="character-art"><img src={lesson.exploreImage||lessonArtwork(lesson)} alt={lesson.imageAlt} fetchPriority="high"/></figure>
   <div className={'character-hanzi animated-hanzi'+(playing?' is-playing':'')+(tracing?' is-tracing':'')} lang="zh-CN" aria-label={lesson.char}>
    <svg className="regular-hanzi" viewBox="0 0 1024 1024" aria-label={tracing?`Draw over ${lesson.char}`:undefined} aria-hidden={!tracing} onPointerDown={startTrace} onPointerMove={moveTrace} onPointerUp={endTrace} onPointerCancel={endTrace}>
     <defs>{strokes.map(({median,length,radius},index)=><mask key={index} id={`${id}-${index}`} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="-500" y="-600" width="2100" height="2100"><polyline ref={element=>{lines.current[index]=element;}} points={median.map(point=>point.join(',')).join(' ')} fill="none" stroke="#fff" strokeWidth={radius*2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={length+radius*2} strokeDashoffset={length+radius*3}/></mask>)}</defs>
     <g transform="translate(0 900) scale(1 -1)">
      {strokes.map(({path},index)=><path key={'base-'+index} className="stroke-base" d={path}/>)}
      {strokes.map(({path},index)=><path key={'ink-'+index} ref={element=>{ink.current[index]=element;}} className="stroke-ink" d={path} mask={`url(#${id}-${index})`}/>)}
     </g>
     {tracing&&<><rect className="trace-hit-area" width="1024" height="1024" fill="transparent"/>{tracePaths.map((path,index)=><path key={index} className="trace-line" d={path}/>)}</>}
    </svg>
   </div>
  </div>
  {loadError&&<p role="status" className="writing-load-note">Writing data could not load. <button className="text-button" onClick={()=>setLoadAttempt(n=>n+1)}>Try again</button></p>}
  {!strokes.length&&!loadError&&<p role="status" className="writing-load-note">Loading writing data…</p>}
  <div className="character-center"><div className="pinyin">{lesson.pinyin}</div><div className="character-tools"><button onClick={onListen} className={'pronunciation-button '+(speaking?'speaking':'')} aria-label={'Hear '+lesson.pinyin+(pronunciationText(lesson)!==lesson.char?' in '+pronunciationText(lesson):'')}><Volume2 size={24} strokeWidth={1.6}/><span>Listen</span></button>{tracing?<><button onClick={()=>setTracePaths([])} className="pronunciation-button" aria-label="Clear tracing"><RotateCcw size={24} strokeWidth={1.6}/><span>Clear</span></button><button onClick={()=>{drawing.current=null;setTracePaths([]);setTracing(false);}} className="pronunciation-button" aria-label="Finish tracing"><Check size={24} strokeWidth={1.6}/><span>Done</span></button></>:<><button onClick={play} disabled={playing||!strokes.length} className="pronunciation-button" aria-label="Play strokes on the character" aria-busy={playing} title="Trace strokes on the character">{playing?<LoaderCircle className="spin" size={24}/>:<Play size={24} strokeWidth={1.6}/>}<span>Strokes</span></button><button onClick={()=>{setTracePaths([]);setTracing(true);}} disabled={playing||!strokes.length} className="pronunciation-button" aria-label="Trace the character" title="Draw over the character with your finger or mouse"><Pencil size={24} strokeWidth={1.6}/><span>Trace</span></button></>}</div><span className="sr-only" role="status">{playing?'Tracing stroke order for '+lesson.char:tracing?'Trace mode: draw over '+lesson.char:''}</span></div>
 </>;
}

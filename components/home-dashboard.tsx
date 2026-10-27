'use client';

import {ArrowRight,BookOpen,Bookmark,Flame,Leaf} from 'lucide-react';
import {lessons,type Progress} from '@/lib/lessons';

export function HomeDashboard({progress,bookmarks,onContinue,onExplore}:{progress:Progress;bookmarks:string[];onContinue:(index:number)=>void;onExplore:(index:number)=>void}){
 const learned=lessons.filter(lesson=>progress[lesson.id]?.learned).length;
 const nextIndex=Math.max(0,lessons.findIndex(lesson=>!progress[lesson.id]?.learned));
 const next=lessons[nextIndex];
 const featured=lessons.find(lesson=>lesson.id==='sun')||lessons[0];
 const bookmarked=bookmarks.length;
 return <div className="dashboard-home">
  <header className="dashboard-topbar"><div><p className="eyebrow">YOUR INKTALES JOURNEY</p><h1>Every character begins with a story.</h1></div><button className="dashboard-streak" onClick={()=>onExplore(nextIndex)} aria-label="Explore your learning journey"><span><Flame size={19}/></span><div><b>{learned} of 12 learned</b><small>One small step at a time</small></div></button></header>
  <section className="dashboard-hero">
   <div className="dashboard-hero-copy"><span className="dashboard-lesson-label">{learned===lessons.length?'COURSE COMPLETE':'UP NEXT · '+next.pinyin.toUpperCase()}</span><h2>{learned===lessons.length?<>Your next story<br/>is ready to revisit.</>:<>Every character<br/>holds a story.</>}</h2><p>{learned===lessons.length?'Revisit a character or explore the collection again.':`Meet ${next.char} (${next.pinyin}), meaning “${next.meaning}.” Learn it through a picture, sound, and a story behind each stroke.`}</p><button className="dashboard-primary" onClick={()=>onContinue(nextIndex)}>{learned===lessons.length?'Review a character':'Continue learning'}<ArrowRight size={18}/></button><span className="dashboard-resume">{learned===lessons.length?'Your progress is saved in this browser.':`Continue with ${next.char} · card ${nextIndex+1} of ${lessons.length}`}</span></div>
   <div className={'dashboard-hero-art '+next.tint} aria-label={`Featured character: ${next.char}, ${next.meaning}`}><img src={'/assets/characters/'+next.id+'.webp'} alt=""/><div className="dashboard-art-wash"/><span className="dashboard-character" lang="zh-CN">{next.char}</span><div className="dashboard-character-caption"><b>{next.pinyin}</b><span>{next.meaning}</span></div><span className="dashboard-floating-stroke" lang="zh-CN">{next.char}</span></div>
  </section>
  <section className="dashboard-overview"><div className="dashboard-section-heading"><div><span className="dashboard-brush-mark"/>YOUR LEARNING</div><button onClick={()=>onExplore(nextIndex)}>View characters <ArrowRight size={15}/></button></div>
   <div className="dashboard-stats-grid">
    <article className="dashboard-stat-card"><div className="dashboard-stat-icon"><BookOpen size={21}/></div><div><span>Characters learned</span><strong>{learned} <small>/ 12</small></strong><p>{12-learned} {12-learned===1?'character':'characters'} left in Beginner I</p></div></article>
    <article className="dashboard-stat-card"><div className="dashboard-stat-icon warm"><Bookmark size={21}/></div><div><span>Saved for later</span><strong>{bookmarked}</strong><p>{bookmarked?'Ready when you are':'Save a character from its lesson'}</p></div></article>
    <article className="dashboard-word-card"><div><span>CHARACTER TO EXPLORE</span><strong lang="zh-CN">{featured.char}</strong></div><div><b>{featured.pinyin}</b><p>{featured.meaning}</p><button onClick={()=>onExplore(lessons.indexOf(featured))}>Explore character <ArrowRight size={14}/></button></div></article>
   </div>
  </section>
 </div>;
}

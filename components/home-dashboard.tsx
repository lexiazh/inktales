'use client';

import {useState} from 'react';
import {ArrowRight,BookOpen,Bookmark,Flame,ChevronLeft,ChevronRight} from 'lucide-react';
import {lessons,type Progress} from '@/lib/lessons';

const fables=[
 {title:'Waiting by the Tree Stump',chinese:'守株待兔',story:'A farmer once saw a rabbit race across his field and crash into a tree stump. The unexpected meal seemed like a gift, so he put down his tools and waited beside the stump every day. His crops withered while he watched. No rabbit came again, and by harvest time he had lost both the easy meal and the food he could have grown.',moral:'Good fortune may arrive by chance, but a life built on waiting will pass you by.',lessonId:'tree'},
 {title:'The Foolish Old Man Moves the Mountains',chinese:'愚公移山',story:'Two great mountains blocked the road from Yu Gong’s village. Though he was already old, he began carrying the earth away with his family, one basket at a time. A neighbor laughed at the impossible task, but Yu Gong replied that his children and their children could continue after him. Moved by their determination, the gods opened a path through the mountains.',moral:'A seemingly impossible obstacle can yield to patience, shared effort, and the courage to begin.',lessonId:'mountain'},
 {title:'The Old Man and His Horse',chinese:'塞翁失马',story:'When an old man’s horse ran away, his neighbors came to offer sympathy. “How do we know this is bad luck?” he asked. Soon the horse returned with a fine wild horse, and the neighbors congratulated him. “How do we know this is good luck?” he replied. His son later fell from the new horse and broke his leg. When war came, the injured son was spared from the army. Each turn that seemed like a loss brought something unexpected with it.',moral:'Fortune keeps changing. What looks like a loss today may lead to good, and what looks like a gain may carry its own trouble.',lessonId:'person'},
];

export function HomeDashboard({username,progress,bookmarks,onContinue,onExplore}:{username:string;progress:Progress;bookmarks:string[];onContinue:(index:number)=>void;onExplore:(index:number)=>void}){
 const [fableIndex,setFableIndex]=useState(0);
 const learned=lessons.filter(lesson=>progress[lesson.id]?.learned).length;
 const nextIndex=Math.max(0,lessons.findIndex(lesson=>!progress[lesson.id]?.learned));
 const next=lessons[nextIndex];
 const now=new Date();
 const fable=fables[fableIndex];
 const fableLesson=lessons.find(lesson=>lesson.id===fable.lessonId)!;
 const bookmarked=bookmarks.length;
 const date=now.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'}).toUpperCase();
 const hour=now.getHours();
 const greeting=hour<12?'Good morning':hour<18?'Good afternoon':'Good evening';
 const salutation=username?`${greeting}, ${username}.`:greeting;
 const activeDays=new Set(Object.values(progress).filter(record=>record?.reviewedAt).map(record=>{
  const day=new Date(record.reviewedAt);day.setHours(0,0,0,0);return day.getTime();
 }));
 const today=new Date();today.setHours(0,0,0,0);
 let streak=0;
 const streakDay=new Date(today);
 if(!activeDays.has(streakDay.getTime()))streakDay.setDate(streakDay.getDate()-1);
 while(activeDays.has(streakDay.getTime())){streak++;streakDay.setDate(streakDay.getDate()-1);}
 return <div className="dashboard-home">
  <header className="dashboard-topbar"><div><p className="eyebrow">{date}</p><h1>{salutation}</h1></div><div className="dashboard-streak" aria-label={`${streak} day streak`}><span><Flame size={19}/></span><div><b>{streak} day streak</b><small>Keep it going</small></div></div></header>
  <section className="dashboard-hero">
   <div className="dashboard-hero-copy"><span className="dashboard-lesson-label">{learned===lessons.length?'COURSE COMPLETE':'UP NEXT · '+next.pinyin.toUpperCase()}</span><h2>{learned===lessons.length?<>Your next story<br/>is ready to revisit.</>:<>Every character<br/>holds a story.</>}</h2><p>{learned===lessons.length?'Revisit a character or explore the collection again.':`Meet ${next.char} (${next.pinyin}), meaning “${next.meaning}.” Learn it through a picture, sound, and a story behind each stroke.`}</p><button className="dashboard-primary" onClick={()=>onContinue(nextIndex)}>{learned===lessons.length?'Review a character':'Continue learning'}<ArrowRight size={18}/></button><span className="dashboard-resume">{learned===lessons.length?'Your progress is saved in this browser.':`Continue with ${next.char} · card ${nextIndex+1} of ${lessons.length}`}</span></div>
   <div className={'dashboard-hero-art '+next.tint} aria-label={`Featured character: ${next.char}, ${next.meaning}`}><img src={'/assets/characters/'+next.id+'.webp'} alt=""/><div className="dashboard-art-wash"/><span className="dashboard-character" lang="zh-CN">{next.char}</span><div className="dashboard-character-caption"><b>{next.pinyin}</b><span>{next.meaning}</span></div><span className="dashboard-floating-stroke" lang="zh-CN">{next.char}</span></div>
  </section>
  <section className="dashboard-overview"><div className="dashboard-section-heading"><div><span className="dashboard-brush-mark"/>YOUR LEARNING</div><button onClick={()=>onExplore(nextIndex)}>View characters <ArrowRight size={15}/></button></div>
   <div className="dashboard-stats-grid">
    <article className="dashboard-stat-card"><div className="dashboard-stat-icon"><BookOpen size={21}/></div><div><span>Characters learned</span><strong>{learned} <small>/ 12</small></strong><p>{12-learned} {12-learned===1?'character':'characters'} left in Beginner I</p></div></article>
    <article className="dashboard-stat-card"><div className="dashboard-stat-icon warm"><Bookmark size={21}/></div><div><span>Saved for later</span><strong>{bookmarked}</strong><p>{bookmarked?'Ready when you are':'Save a character from its lesson'}</p></div></article>
   </div>
  </section>
  <section className="dashboard-fables"><div className="dashboard-section-heading"><div><span className="dashboard-brush-mark"/>FABLES & TALES</div><span>{String(fableIndex+1).padStart(2,'0')} / {String(fables.length).padStart(2,'0')}</span></div><article className="dashboard-fable"><div className="dashboard-fable-copy"><h2>{fable.title}</h2><p className="dashboard-fable-chinese" lang="zh-CN">{fable.chinese}</p><p className="dashboard-fable-story">{fable.story}</p><div className="dashboard-fable-moral"><small>THE MORAL</small><p>{fable.moral}</p></div><footer><button className="dashboard-quest-link" onClick={()=>onContinue(lessons.indexOf(fableLesson))}>Explore {fableLesson.char} · {fableLesson.meaning}<ArrowRight size={15}/></button><div className="dashboard-fable-controls"><button aria-label="Previous fable" onClick={()=>setFableIndex(index=>(index+fables.length-1)%fables.length)}><ChevronLeft size={18}/></button><button aria-label="Next fable" onClick={()=>setFableIndex(index=>(index+1)%fables.length)}><ChevronRight size={18}/></button></div></footer></div></article></section>
 </div>;
}

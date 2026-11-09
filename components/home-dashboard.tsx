'use client';

import {useState} from 'react';
import {ArrowRight,BookOpen,Bookmark,Flame,ChevronLeft,ChevronRight} from 'lucide-react';
import {lessonArtwork,lessons,type Progress} from '@/lib/lessons';

const fables=[
 {title:'Waiting by the Tree Stump',chinese:'守株待兔',story:'A farmer once saw a rabbit race across his field and crash into a tree stump. The unexpected meal seemed like a gift, so he put down his tools and waited beside the stump every day. His crops withered while he watched. No rabbit came again, and by harvest time he had lost both the easy meal and the food he could have grown.',moral:'Good fortune may arrive by chance, but a life built on waiting will pass you by.',lessonId:'tree'},
 {title:'The Foolish Old Man Moves the Mountains',chinese:'愚公移山',story:'Two great mountains blocked the road from Yu Gong’s village. Though he was already old, he began carrying the earth away with his family, one basket at a time. A neighbor laughed at the impossible task, but Yu Gong replied that his children and their children could continue after him. Moved by their determination, the gods opened a path through the mountains.',moral:'A seemingly impossible obstacle can yield to patience, shared effort, and the courage to begin.',lessonId:'mountain'},
 {title:'The Old Man and His Horse',chinese:'塞翁失马',story:'When an old man’s horse ran away, his neighbors came to offer sympathy. “How do we know this is bad luck?” he asked. Soon the horse returned with a fine wild horse, and the neighbors congratulated him. “How do we know this is good luck?” he replied. His son later fell from the new horse and broke his leg. When war came, the injured son was spared from the army. Each turn that seemed like a loss brought something unexpected with it.',moral:'Fortune keeps changing. What looks like a loss today may lead to good, and what looks like a gain may carry its own trouble.',lessonId:'person'},
 {
  title:'Drawing Feet on a Snake',
  chinese:'画蛇添足',
  story:'A group of men had only one cup of wine to share, so they agreed that the first to draw a snake would drink it. One man finished quickly. With time to spare, he began adding feet to his snake. While he was still drawing, another man finished and took the cup. “A snake has no feet,” he said, and drank the wine.',
  moral:'When something is finished, adding more can spoil what you already did well.',
  lessonId:'hanzi-8db3',
 },
 {
  title:'The Frog at the Bottom of the Well',
  chinese:'井底之蛙',
  story:'A frog lived in a well and thought it was the finest place in the world. One day it invited a sea turtle to come down and see. The turtle could barely fit one leg through the opening, so it stayed above and told the frog about the sea. The frog fell silent. It had never imagined that so much water could exist.',
  moral:'A familiar place can make the world seem smaller than it is. Stay curious about what lies beyond it.',
  lessonId:'hanzi-6d77',
 },
 {
  title:'Marking the Boat to Find a Sword',
  chinese:'刻舟求剑',
  story:'A man was crossing a river when his sword slipped from the boat and sank. He quickly cut a mark into the side of the boat where the sword had fallen. When the boat reached the far bank, he jumped into the water beside the mark and searched. The boat had carried the mark across the river. The sword lay far behind.',
  moral:'When the situation changes, check whether your old plan still makes sense.',
  lessonId:'hanzi-8239',
 },
 {
  title:'Covering His Ears to Steal a Bell',
  chinese:'掩耳盗铃',
  story:'A man found a large bell and decided to carry it away. It was too heavy to lift, so he struck it with a hammer, hoping to break it into smaller pieces. The bell rang so loudly that he worried someone would come. He quickly covered his ears. The sound seemed quieter to him, while the bell rang just as loudly for everyone else.',
  moral:'A problem can still affect other people even when you choose to ignore it.',
  lessonId:'hanzi-8033',
 },
 {
  title:'The Fox Who Borrowed the Tiger’s Power',
  chinese:'狐假虎威',
  story:'A tiger caught a fox in the woods. The fox told the tiger that Heaven had chosen it to rule the animals. “Follow me and see how they run,” it said. The fox walked ahead with the tiger close behind. Every animal they met hurried away. The tiger believed the fox’s story. All the other animals had seen who was walking behind it.',
  moral:'Before you trust a show of power, look at where that power comes from.',
  lessonId:'forest',
 },
 {
  title:'Mending the Sheep Pen',
  chinese:'亡羊补牢',
  story:'One morning, a shepherd counted his sheep and found one missing. A wolf had slipped through a gap in the pen. His neighbor told him to mend the fence, but the shepherd thought there was little point once the sheep was gone. When another sheep disappeared the next night, he closed the gap at once. From then on, the rest of his flock stayed safe.',
  moral:'A loss can show you what needs fixing. Act on what you learn while there is still time.',
  lessonId:'hanzi-7f8a',
 },
 {
  title:'The Farmer Who Pulled His Seedlings',
  chinese:'拔苗助长',
  story:'A farmer worried that the seedlings in his field were growing too slowly. He walked down every row and tugged each plant a little higher. Tired but pleased, he went home and told his family how hard he had worked to help the plants grow. His son ran to the field to see for himself. Every seedling had wilted.',
  moral:'Growth takes time. A shortcut can undo the very work you hoped to speed up.',
  lessonId:'field',
 },
 {
  title:'Playing Music for a Cow',
  chinese:'对牛弹琴',
  story:'A musician named Gongming Yi played a tune on his qin, a stringed instrument, for a cow in a field. The cow kept its head down and went on eating. Then he changed his tune to imitate buzzing insects and the call of a lonely calf. The cow pricked up its ears, swished its tail, and stepped closer to listen.',
  moral:'To reach your audience, begin with something they know and care about.',
  lessonId:'hanzi-725b',
 },
 {
  title:'The Promise of Sour Plums',
  chinese:'望梅止渴',
  story:'On a long march, Cao Cao and his soldiers could find no water. The men grew thirsty and struggled to keep walking. Cao Cao pointed ahead and told them there was a grove full of plums, both sweet and sour. Just thinking about biting into the fruit made their mouths water. They marched on and eventually reached a place where they could drink.',
  moral:'Hope can help you keep going until you find what you need.',
  lessonId:'hanzi-679c',
 },
 {
  title:'Jingwei and the Sea',
  chinese:'精卫填海',
  story:'The youngest daughter of the Flame Emperor drowned in the Eastern Sea. She became a bird named Jingwei, with a white beak and red feet. Jingwei flew to the western hills for twigs and stones. She carried them back to the sea, one by one, and dropped them into the waves. Each time, she turned back for more.',
  moral:'Even a daunting task can begin with one small act of determination.',
  lessonId:'hanzi-77f3',
 },
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
   <div className={'dashboard-hero-art '+next.tint} aria-label={`Featured character: ${next.char}, ${next.meaning}`}><img src={next.exploreImage||lessonArtwork(next)} alt=""/><div className="dashboard-art-wash"/><span className="dashboard-character" lang="zh-CN">{next.char}</span><div className="dashboard-character-caption"><b>{next.pinyin}</b><span>{next.meaning}</span></div><span className="dashboard-floating-stroke" lang="zh-CN">{next.char}</span></div>
  </section>
  <section className="dashboard-overview"><div className="dashboard-section-heading"><div><span className="dashboard-brush-mark"/>YOUR LEARNING</div><button onClick={()=>onExplore(nextIndex)}>View characters <ArrowRight size={15}/></button></div>
   <div className="dashboard-stats-grid">
    <article className="dashboard-stat-card"><div className="dashboard-stat-icon"><BookOpen size={21}/></div><div><span>Characters learned</span><strong>{learned} <small>/ {lessons.length}</small></strong><p>{lessons.length-learned} {lessons.length-learned===1?'character':'characters'} left in Beginner I</p></div></article>
    <article className="dashboard-stat-card"><div className="dashboard-stat-icon warm"><Bookmark size={21}/></div><div><span>Saved for later</span><strong>{bookmarked}</strong><p>{bookmarked?'Ready when you are':'Save a character from its lesson'}</p></div></article>
   </div>
  </section>
  <section className="dashboard-fables"><div className="dashboard-section-heading"><div><span className="dashboard-brush-mark"/>FABLES & TALES</div><span>{String(fableIndex+1).padStart(2,'0')} / {String(fables.length).padStart(2,'0')}</span></div><article className="dashboard-fable"><div className="dashboard-fable-copy"><h2>{fable.title}</h2><p className="dashboard-fable-chinese" lang="zh-CN">{fable.chinese}</p><p className="dashboard-fable-story">{fable.story}</p><div className="dashboard-fable-moral"><small>THE MORAL</small><p>{fable.moral}</p></div><footer><button className="dashboard-quest-link" onClick={()=>onContinue(lessons.indexOf(fableLesson))}>Explore {fableLesson.char} · {fableLesson.meaning}<ArrowRight size={15}/></button><div className="dashboard-fable-controls"><button aria-label="Previous fable" onClick={()=>setFableIndex(index=>(index+fables.length-1)%fables.length)}><ChevronLeft size={18}/></button><button aria-label="Next fable" onClick={()=>setFableIndex(index=>(index+1)%fables.length)}><ChevronRight size={18}/></button></div></footer></div></article></section>
 </div>;
}

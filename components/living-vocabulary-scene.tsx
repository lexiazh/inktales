import {lessonArtwork,type Lesson} from '@/lib/lessons';

// New vocabulary reveals its illustrated meaning as the learner completes each stroke.
export function LivingVocabularyScene({lesson,progress,complete}:{lesson:Lesson;progress:number;complete:boolean}){
 const amount=Math.max(0,Math.min(1,progress));
 return <g className={complete?'lh-vocabulary-scene is-complete':'lh-vocabulary-scene'}>
  <path d="M100 350Q320 337 540 350" fill="none" stroke="#a8b28e" strokeWidth="1.5"/>
  <g opacity={amount} transform={`translate(${320-amount*320} ${38-amount*38}) scale(${.6+amount*.4})`}>
   <image className="lh-vocabulary-art" href={lessonArtwork(lesson)} x="110" y="-95" width="420" height="500" preserveAspectRatio="xMidYMid meet"/>
  </g>
  <g className="lh-vocabulary-sparks" opacity={complete?1:0} fill="none" stroke="#bd9a62" strokeWidth="1.5" strokeLinecap="round">
   <path d="M135 110v18m-9-9h18M500 160v14m-7-7h14M460 66v14m-7-7h14"/>
   <circle cx="170" cy="250" r="3"/><circle cx="490" cy="285" r="3"/>
  </g>
 </g>;
}

import type {Lesson} from '@/lib/lessons';
import {foodScenes} from './living-scenes/food';
import {natureScenes} from './living-scenes/nature';
import {peopleScenes} from './living-scenes/people';
import {peopleActionScenes} from './living-scenes/people-actions';
import {placesScenes} from './living-scenes/places';
import {timeScenes} from './living-scenes/time';

const scenes={...natureScenes,...peopleScenes,...peopleActionScenes,...foodScenes,...placesScenes,...timeScenes};

export function LivingVocabularyScene({lesson,progress,complete}:{lesson:Lesson;progress:number;complete:boolean}){
 const layers=scenes[lesson.char];
 if(!layers)return null;
 const visible=progress>0?Math.max(1,Math.floor(progress*layers.length)):0;
 return <g className={complete?'lh-ink-scene is-complete':'lh-ink-scene'} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path opacity=".25" strokeWidth="1.3" d="M100 347q111-9 217-1t224-3m-412 11q177-7 378-2"/>
  {layers.slice(0,complete?layers.length:visible).map((art,index)=><g key={index} className="lh-scene-layer">{art}</g>)}
 </g>;
}

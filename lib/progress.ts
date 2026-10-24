import type {Progress} from './lessons';

export function recordCompletion(progress: Progress, characterId: string, now = Date.now()): Progress {
 return {...progress,[characterId]:{learned:true,reviewedAt:now,due:now+86_400_000,rating:'Completed'}};
}

// A retry schedules a revisit without discarding an existing learned record.
export function recordAgain(progress: Progress, characterId: string, now = Date.now()): Progress {
 const previous=progress[characterId];
 return {...progress,[characterId]:{learned:previous?.learned??false,reviewedAt:now,due:now,rating:'Again'}};
}

export function getJourneyStats(progress: Progress, now = Date.now()) {
 const records=Object.values(progress).filter(p=>p&&Number.isFinite(p.reviewedAt));
 const week=Array.from({length:7},(_,n)=>{
  const start=new Date(now);start.setHours(0,0,0,0);start.setDate(start.getDate()-6+n);
  const end=new Date(start);end.setDate(end.getDate()+1);
  return {date:start.toLocaleDateString('en-US',{month:'short',day:'numeric'}),label:start.toLocaleDateString('en-US',{weekday:'short'}),count:records.filter(p=>p.reviewedAt>=start.getTime()&&p.reviewedAt<end.getTime()).length};
 });
 return {learned:Object.values(progress).filter(p=>p?.learned).length,due:Object.entries(progress).filter(([,p])=>p&&p.due<=now).map(([id])=>({id})),week};
}

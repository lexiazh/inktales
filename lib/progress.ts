import type {Progress} from './lessons';

export function recordCompletion(progress: Progress, characterId: string, now = Date.now()): Progress {
 return {...progress,[characterId]:{learned:true,reviewedAt:now,due:now+86_400_000,rating:'Completed'}};
}

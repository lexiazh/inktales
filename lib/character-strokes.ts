import mountain from '../public/data/山.json';
import water from '../public/data/水.json';
import sun from '../public/data/日.json';
import moon from '../public/data/月.json';
import tree from '../public/data/木.json';
import woods from '../public/data/林.json';
import fire from '../public/data/火.json';
import person from '../public/data/人.json';
import big from '../public/data/大.json';
import small from '../public/data/小.json';
import mouth from '../public/data/口.json';
import field from '../public/data/田.json';

type Point=number[];
type StrokeData={strokes:string[];medians:Point[][]};
const sources:Record<string,StrokeData>={山:mountain,水:water,日:sun,月:moon,木:tree,林:woods,火:fire,人:person,大:big,小:small,口:mouth,田:field};

function distance(point:Point,start:Point,end:Point){
 const dx=end[0]-start[0],dy=end[1]-start[1],size=dx*dx+dy*dy;
 const t=size===0?0:Math.max(0,Math.min(1,((point[0]-start[0])*dx+(point[1]-start[1])*dy)/size));
 return Math.hypot(point[0]-start[0]-t*dx,point[1]-start[1]-t*dy);
}

// Median masks keep the stroke animation aligned with the displayed glyph.
export function prepareStrokes(data:StrokeData){
 return data.strokes.map((path,index)=>{
  const median=data.medians[index];
  const numbers=(path.match(/-?\d+(?:\.\d+)?/g)??[]).map(Number);
  let coverage=0,length=0;
  for(let i=0;i+1<numbers.length;i+=2){
   const point:Point=[numbers[i],numbers[i+1]];
   let nearest=Infinity;
   for(let j=1;j<median.length;j++)nearest=Math.min(nearest,distance(point,median[j-1],median[j]));
   coverage=Math.max(coverage,nearest);
  }
  for(let j=1;j<median.length;j++)length+=Math.hypot(median[j][0]-median[j-1][0],median[j][1]-median[j-1][1]);
  return {path,median,length,radius:coverage+5};
 });
}
export type PreparedStroke=ReturnType<typeof prepareStrokes>[number];
export const characterStrokes:Record<string,PreparedStroke[]>=Object.fromEntries(Object.entries(sources).map(([char,data])=>[char,prepareStrokes(data)]));
const pending=new Map<string,Promise<PreparedStroke[]>>();

// Keep the expanded course out of the initial JavaScript bundle.
export function loadCharacterStrokes(char:string):Promise<PreparedStroke[]>{
 if(characterStrokes[char])return Promise.resolve(characterStrokes[char]);
 const existing=pending.get(char);if(existing)return existing;
 const request=fetch(`/data/${encodeURIComponent(char)}.json`).then(async response=>{
  if(!response.ok)throw new Error('Writing data unavailable');
  const data=await response.json() as StrokeData;
  if(!data.strokes?.length||data.strokes.length!==data.medians?.length)throw new Error('Invalid writing data');
  const strokes=prepareStrokes(data);characterStrokes[char]=strokes;return strokes;
 }).finally(()=>pending.delete(char));
 pending.set(char,request);return request;
}

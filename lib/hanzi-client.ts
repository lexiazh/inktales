export type Writer={animateCharacter:()=>Promise<void>;quiz:(options:Record<string,unknown>)=>void;cancelQuiz:()=>void;pauseAnimation:()=>void;hideCharacter:(options?:{duration:number})=>Promise<void>;updateDimensions:(options:{width:number;height:number;padding:number})=>void};
declare global {interface Window {HanziWriter?: {create:(element:HTMLElement,char:string,options:Record<string,unknown>)=>Writer}}}
let libraryPromise:Promise<void>|undefined;

export function loadHanziWriter():Promise<void>{
 if(window.HanziWriter)return Promise.resolve();
 if(libraryPromise)return libraryPromise;
 libraryPromise=new Promise<void>((resolve,reject)=>{
  const script=document.createElement('script');script.src='/vendor/hanzi-writer.min.js';script.dataset.hanzi='true';
  script.onload=()=>{if(window.HanziWriter)resolve();else{script.remove();reject(new Error('Writing library unavailable'));}};
  script.onerror=()=>{script.remove();reject(new Error('Writing library unavailable'));};
  document.head.appendChild(script);
 }).catch(error=>{libraryPromise=undefined;throw error;});
 return libraryPromise;
}

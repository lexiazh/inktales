import type {ReactNode} from 'react';

const sage='#d5dfb4';
const gold='#e8d19a';
const blue='#d8e4e8';
const rose='#d6a28b';
const wood='#dfc6a0';
const paper='#f8f0dc';

function shoulders(shirt:string){
 return <path d="M251 208q-61 22-77 91h289q-19-69-82-91l-37-10h-56Z" fill={shirt}/>;
}

function head(skin:string,hair:string){
 return <>
  <path d="M279 190h75l3 24q-38 32-80 0Z" fill={skin}/>
  <path d="M251 137q-4-63 66-65q70 0 69 65l-9 37q-14 37-58 43q-50-6-62-43Z" fill={skin}/>
  <path d="M254 138q-15-29 4-53q27-40 81-23q42 7 51 48l-9 31q-16-6-20-26q-27 11-42-15q-20 18-50 18Z" fill={hair}/>
  <path d="M283 142h2m66 0h2m-35 2-5 16 9 2m-22 12q18 16 38 0" strokeWidth="3"/>
 </>;
}

function cue(text:string,x:number,y:number){
 return <text x={x} y={y} fontFamily="Georgia,serif" fontStyle="italic" fontSize="25" fill="currentColor" stroke="none" opacity=".79">{text}</text>;
}

export const peopleActionScenes: Record<string, ReactNode[]> = {
 我:[
  <g>{shoulders(sage)}<path d="M252 219q47 35 94 28m-135 42 16-32m189 32-18-31" opacity=".55"/></g>,
  <g>{head(wood,'#7a786e')}</g>,
  <g className="lh-motion-nod" style={{transformOrigin:'right bottom'}}><path d="M416 296q-20 13-43 8l-42-41-28-1q-17-1-15-10q4-9 27-6q-9-14 0-17q8-3 27 13l20 6 20 23 22-14Z" fill={wood}/><path d="M314 246h18m-66 4-18-3m23 18-15 6" strokeOpacity=".6"/>{cue('me',208,243)}</g>,
 ],
 你:[
  <g>{shoulders(blue)}<path d="M251 211q47 56 132 0m-109 66h28m75-37 35 51" opacity=".6"/></g>,
  <g>{head('#cfaa8b','#a98b72')}</g>,
  <g><g className="lh-motion-tilt" style={{transformOrigin:'left bottom'}}><path d="m129 328 38-38q5-16 8-50q0-12 11-11q7 2 9 21l30-64q9-17 18-12q7 6-1 20l-13 30 43-47q13-13 20-5q4 6-5 15l-33 41 44-31q13-10 19-1q3 7-11 17l-36 27 38-12q13-5 16 3q3 7-10 14l-59 27q-16 24-40 26l-42 40Z" fill={wood}/><path d="M213 269q14-15 34-12" strokeOpacity=".5"/></g><path d="M428 112q-19 2-30 17m1-11-3 12 14-1" strokeOpacity=".62"/>{cue('you',436,107)}</g>,
 ],
 他:[
  <g><path d="M139 306q185-12 378 0m-72-5V104h46v196" opacity=".38"/><g transform="translate(64 17) scale(.91)">{shoulders(blue)}{head('#caab94','#70716d')}<path d="m318 224-26 39 20 36m6-75 31 37-25 38m-53-26h-40m119 0h51" opacity=".65"/></g></g>,
  <g><path d="M110 320q-4-65 57-74q55 5 65 74Z" fill={sage}/><path d="M147 265q-19-19-12-45q13-25 42-21q26 6 25 39q-12 37-55 27Z" fill="#998d77"/></g>,
  <g className="lh-motion-nod" style={{transformOrigin:'left bottom'}}><path d="m192 305 44-47 36-21q22-12 25-5q0 8-24 22q16-3 22 4q5 11-14 19l-29 10-38 33Z" fill={wood}/><path d="m285 205 14-10m-8 20 17-3" strokeOpacity=".56"/>{cue('he',294,197)}</g>,
 ],
 她:[
  <g><path d="M126 306q185-12 389 0m-345-5V116h-25v185" opacity=".38"/><g transform="translate(-19 12) scale(.91)">{shoulders(gold)}<path d="M244 204q-12-92 11-122q37-43 108-8q33 15 29 130l-36 19-76-1Z" fill="#7d746e"/>{head(wood,'#7d746e')}<path d="m265 266 20-42 40 15 42-16 21 57-63 19Z" fill={rose}/><path d="M324 240v57m-38-58 26 9m27-1 23-8" stroke={paper} strokeWidth="3"/><path d="M256 264q22-13 38-1q7 14-28 20m128-18q-22-13-38-2q-7 14 28 20" fill={wood}/></g></g>,
  <g><path d="M425 320q-4-65 57-74q55 5 65 74Z" fill={blue}/><path d="M464 264q-21-13-18-44q5-28 38-25q33 0 33 32q-3 40-53 37Z" fill="#a18f73"/></g>,
  <g className="lh-motion-nod" style={{transformOrigin:'right bottom'}}><path d="m445 306-45-39-25-5q-18-6-15-14q8-6 22 0l-18-22q-6-9 3-12q6 0 26 24l8-3q9 0 16 14l49 40Z" fill={wood}/><path d="m370 198-15-13m3 23-18-6" strokeOpacity=".56"/>{cue('she',345,177)}</g>,
 ],
 老:[
  <g><path d="M140 317q148-20 365 0" opacity=".45"/><path d="M183 241h273v18H183Zm-11 29h296v18H172Z" fill={wood}/><path d="M185 288v36m260-36v36m-244-65v11m233-11v11" strokeWidth="4"/></g>,
  <g><path d="M258 269q-1-50 25-75l62-1q30 29 29 78Z" fill={sage}/><path d="M274 269h89l-11 40-35 2-14-31-10 31-32-1Z" fill={blue}/><path d="M263 309h29l4 16h-47q-7-8 14-16m54 2 35-1q20 8 16 15h-47Z" fill={wood}/><path d="M381 319v-75q-12-25-26-5" strokeWidth="5"/></g>,
  <g className="lh-motion-nod" style={{transformOrigin:'center bottom'}}><path d="M269 149q-7-36 21-48q42-17 68 15q14 29-6 63q-29 35-65 7q-13-8-18-37Z" fill={wood}/><path d="M268 153q-12-30 3-47q5-20 33-21q46-4 62 31l-2 35-11-6q5-23-16-28q-13 16-41 9q-8 14-23 17Z" fill="#c7c6bc"/><path d="M285 144q7-8 18-2m25-1q10-5 16 2m-59 11h17m26 0h17m-43 0h26m-25 22q12 7 24-2m-47-14 6 4m55-4 7-3" strokeWidth="2"/></g>,
 ],
 好:[
  <g><path d="M105 310q204-17 422 1" opacity=".35"/><path d="M196 220h46v88h-46q-12-42 0-88Z" fill={sage}/><path d="M209 222v85m15-85v85" opacity=".45"/></g>,
  <g className="lh-motion-nod" style={{transformOrigin:'left center'}}><path d="M239 227q32-9 53-26q16-16 24-41q-2-50 19-56q24-3 26 28l-8 49h57q27 0 29 19q0 15-18 18q21 2 19 20q-2 14-22 17q16 5 13 18q-5 13-20 16q9 20-13 25h-81q-36-4-78-18Z" fill={wood}/><path d="M352 180q-20 18-12 43m82-5h-55m51 37h-47m40 34h-34m-97-15q26 13 47 10" strokeOpacity=".65"/></g>,
  <g className="lh-motion-pulse" stroke="#b38a56" strokeWidth="3"><path d="m295 122-25-17m26-3-12-22m91 13 10-22m-6 42 25-13m46 75 23-5"/></g>,
 ],
 爱:[
  <g><path d="M108 315q216-18 424 1" opacity=".35"/><ellipse cx="320" cy="310" rx="163" ry="19" fill={gold} opacity=".25" stroke="none"/></g>,
  <g><path d="m146 289 63-73q13-19 28-11q12 8 2 22l-22 28 63-8q19 0 21 14q-1 16-17 19l-72 20-37 30Z" fill={wood}/><path d="m494 290-61-76q-14-19-29-11q-11 8-2 22l22 29-63-7q-17 0-20 14q1 15 17 19l70 20 38 29Z" fill={wood}/><path d="m208 270 47-10m177 10-44-10" opacity=".57"/></g>,
  <g className="lh-motion-pulse"><path d="M320 250q-103-60-83-111q19-44 61-22q15 8 22 24q16-39 48-32q54 8 35 58q-15 43-83 83Z" fill={rose}/><path d="M252 151q2-19 24-24" stroke={paper} strokeWidth="5"/><path d="M320 85V68m-95 54-15-13m202 10 17-12" stroke="#b38a56" strokeWidth="3"/></g>,
 ],
 笑:[
  <g>{shoulders(gold)}<path d="M266 223q52 50 107 0m-129 57-10 19m170-19 11 19" opacity=".5"/></g>,
  <g transform="rotate(-13 318 198)"><g className="lh-motion-nod" style={{transformOrigin:'center bottom'}}><path d="M252 149q-6-79 66-76q68 0 68 66q0 74-66 79q-62-1-68-69Z" fill={wood}/><path d="M253 150q-22-53 8-74q27-26 65-18q51 8 60 49q-24-10-44-26q-28 36-75 34Z" fill="#877a6f"/><path d="M276 140q13-13 26 0m36-1q13-13 26 0" strokeWidth="4"/><path d="M286 156q34 11 67 0q-3 41-34 43q-27-1-33-43Z" fill="#a5655b"/><path d="M289 158q29 8 61 0l-7 12q-25 4-49-1Z" fill={paper}/><path d="m265 154 11 2m86 1 11-2" stroke={rose} strokeWidth="5"/></g></g>,
  <g className="lh-motion-hop" strokeOpacity=".67"><path d="m230 115-22-15m18 35-33-4m214-33 20-20m-11 43 29-9" strokeWidth="3"/></g>,
 ],
 哭:[
  <g>{shoulders(blue)}<path d="M247 230q61 32 138 0" opacity=".55"/></g>,
  <g><path d="M253 145q-3-76 66-76q72 0 69 80q-1 71-68 75q-67-5-67-79Z" fill={wood}/><path d="M251 147q-10-43 10-65q23-30 57-23q55 0 67 48l-6 43q-20-30-29-58q-40 30-83 25Z" fill="#766e66"/><path d="M274 139q15-3 26-12m39 0q11 10 26 13m-89 18q14 6 28-1m34 0q12 7 27 0m-68 38q22-17 42 0" strokeWidth="3"/></g>,
  <g><path className="lh-motion-fall" d="M349 161q-16 20-7 30q8 10 17 0q7-8-10-30Z" fill="#96b8ca"/><path d="m232 289 17-54 47-39q16-15 29-7q11 10-3 22l-40 50-8 34Z" fill={wood}/><path d="m271 201 42-21 23 22-27 30-46-12Z" fill={paper}/><path d="m282 205 29-16m-34 23 35 10" opacity=".5"/></g>,
 ],
 看:[
  <g><path d="M374 209q57 2 153-37m-57 19q-3-19 13-32" stroke={wood} strokeWidth="7"/><path d="M425 202q-10-33 22-44q26 7 34 30l-13 15Z" fill={sage}/></g>,
  <g><path d="M107 305q19-81 79-103l54 14q54 34 65 89Z" fill={blue}/><path d="M160 165q5-56 56-55q48 7 47 53q-2 49-43 55q-54 3-60-53Z" fill={wood}/><path d="M158 170q-18-48 22-67q48-23 79 18l-53 4q-9 26-39 43Z" fill="#82746a"/><path d="m230 265 35-54 37-33q15-6 20 5q1 15-17 25l-34 64" fill={wood}/><path d="M229 150q29-12 78-4v24l-74 16Z" fill="#8e98a4"/><ellipse cx="307" cy="157" rx="9" ry="14" fill={blue}/></g>,
  <g className="lh-motion-hop"><path d="M454 163q-25-16-9-36q7-9 21-8q9-25 32-13q14 12 0 32l-10 23q-15 15-34 2Z" fill={gold}/><path d="m503 121 17 6-20 7m-15-18h1m-22 29q-12-19-22-6q5 14 22 6m0 22v16m13-17v15"/></g>,
 ],
 听:[
  <g>{shoulders(sage)}<path d="M266 214q39 35 79 15" opacity=".55"/></g>,
  <g transform="translate(-34 0)">{head('#d5ad8e','#79746e')}<path d="M367 143q17-23 25 4q4 19-15 26m-1-17q2-8 8-4" fill={wood}/></g>,
  <g><path d="M418 293q-23 11-39-14l-32-74q-9-11-14-35l5-33q4-13 12-10q7 4 3 28l12-38q5-13 13-9q8 5 3 19l-6 29 15-25q9-13 16-7q5 6-4 22l-15 29q11 25-2 43l37 50Z" fill={wood}/><path d="M351 163q15 4 22 20" strokeOpacity=".6"/><path className="lh-motion-flow" d="M418 160q22 17 4 38m12-50q36 29 9 63m5-74q47 39 14 86" stroke="#92a9b8" strokeWidth="3"/></g>,
 ],
 说:[
  <g><path d="M108 319q214-17 423 1" opacity=".36"/><path d="M136 314q14-76 87-99q59 4 82 99Zm200 0q15-77 86-98q56 4 82 98Z" fill={sage}/></g>,
  <g><path d="M185 181q-6-56 43-65q50-4 57 47l14 22-19 8q-17 33-53 24q-34-3-42-36Z" fill={wood}/><path d="M184 180q-12-60 39-71q36-6 57 17q-24 19-59 11q-14 31-37 43Z" fill="#80776e"/><path d="M266 167h1m-1 32 12-2" strokeWidth="3"/><path d="M459 174q6-54-43-62q-52-4-61 45l-13 24 18 10q13 34 51 26q39-6 48-43Z" fill="#c39d83"/><path d="M461 175q17-63-30-77q-56-18-79 27q40 0 55 29q24 23 54 21Z" fill="#80776e"/><path d="M369 165h1m-10 33q9 7 17 0" strokeWidth="3"/></g>,
  <g><path className="lh-motion-nod" style={{transformOrigin:'left bottom'}} d="M241 290q41-29 56-53l11-25q8-9 11-1l-2 15q13-15 18-10q7 5-5 20q16-9 19-3q2 9-13 23l-22 19-56 33Z" fill={wood}/><path className="lh-motion-flow" d="m304 164 15-5m-16 17 20 2m-24 10 15 8" stroke={rose} strokeWidth="3"/></g>,
 ],
 学:[
  <g><path d="M103 135q220-41 430 0v188q-207 32-430 0Z" fill={wood}/><path d="M119 303q190-14 393 0m-390-138q130-32 245-25m-177 189q127 0 256-9" opacity=".47"/></g>,
  <g><path d="M225 169q-55-29-99-9l-6 105q56-9 103 12q50-24 98-9l6-102q-50-21-102 3Z" fill={paper}/><path d="M225 169l-2 108m-79-88q43-10 65 0m-65 18q39-8 65 0m-67 20q38-7 65 1m29-36q36-14 74-6m-74 25q37-16 73-6m-73 24q35-12 64-6" opacity=".53"/><path d="m347 168 137 5-6 123-137-7Z" fill={paper}/><path d="M353 204l119 4m-120 22 119 4m-120 22 119 4" opacity=".47"/></g>,
  <g className="lh-motion-slide"><path d="m499 305-31-45-30-10q-17-6-18 6q-2 11 19 24l10 31 31 22Z" fill={wood}/><path d="m429 246-57-34-11-15 19 3 58 34Z" fill={gold}/><path d="m362 197 8 11 6-6Z" fill="#7a7b82"/><path d="m430 248-18-16q-8-13 3-17q10-4 28 11l22 18 9 15" fill={wood}/></g>,
 ],
};

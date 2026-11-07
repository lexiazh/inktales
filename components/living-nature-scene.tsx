import type {ReactNode} from 'react';

type SceneProps={id:string;progress:number;complete:boolean};

const sceneStyles=`
.lh-n-scene .lh-n-enter{animation:lh-n-appear .6s ease-out both}
.lh-n-live .lh-n-cloud{animation:lh-n-drift 7s ease-in-out infinite alternate}
.lh-n-live .lh-n-waterline{animation:lh-n-flow 2.8s ease-in-out infinite alternate}
.lh-n-live .lh-n-leaf{animation:lh-n-float 4s ease-in-out infinite}
.lh-n-live .lh-n-sun{animation:lh-n-rise 6s ease-in-out infinite alternate}
.lh-n-live .lh-n-rays{transform-box:fill-box;transform-origin:center;animation:lh-n-turn 40s linear infinite}
.lh-n-live .lh-n-star{transform-box:fill-box;transform-origin:center;animation:lh-n-twinkle 3s ease-in-out infinite alternate}
.lh-n-live .lh-n-star:nth-child(2n){animation-delay:-1.3s}
.lh-n-live .lh-n-crown{transform-box:fill-box;transform-origin:center bottom;animation:lh-n-sway 4s ease-in-out infinite alternate}
.lh-n-live .lh-n-bird{animation:lh-n-birdflight 5s ease-in-out infinite alternate}
.lh-n-live .lh-n-flame{transform-box:fill-box;transform-origin:center bottom;animation:lh-n-flicker 1.8s ease-in-out infinite alternate}
.lh-n-live .lh-n-flame-inner{animation-duration:1.2s;animation-delay:-.6s}
.lh-n-live .lh-n-spark{animation:lh-n-spark 2.8s ease-out infinite}
.lh-n-live .lh-n-spark:nth-child(2n){animation-delay:-1.4s}
@keyframes lh-n-appear{from{opacity:0}to{opacity:1}}
@keyframes lh-n-drift{from{transform:translateX(-12px)}to{transform:translateX(20px)}}
@keyframes lh-n-flow{from{transform:translateX(-9px);opacity:.5}to{transform:translateX(10px);opacity:1}}
@keyframes lh-n-float{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(24px,7px) rotate(3deg)}}
@keyframes lh-n-rise{from{transform:translateY(9px)}to{transform:translateY(-10px)}}
@keyframes lh-n-turn{to{transform:rotate(360deg)}}
@keyframes lh-n-twinkle{from{opacity:.35;transform:scale(.8)}to{opacity:1;transform:scale(1.12)}}
@keyframes lh-n-sway{from{transform:rotate(-2deg)}to{transform:rotate(2deg)}}
@keyframes lh-n-birdflight{from{transform:translate(-18px,3px)}to{transform:translate(23px,-8px)}}
@keyframes lh-n-flicker{from{transform:scale(.96,1)}to{transform:scale(1.04,.92)}}
@keyframes lh-n-spark{0%{transform:translateY(5px);opacity:0}25%{opacity:.8}100%{transform:translate(9px,-38px);opacity:0}}
@media(prefers-reduced-motion:reduce){.lh-n-scene *{animation:none!important}}
`;

function Tree({x,y,size=1,progress=1}:{x:number;y:number;size?:number;progress?:number}){
 return <g transform={`translate(${x} ${y}) scale(${size})`}>
  <ellipse cx="0" cy="4" rx="77" ry="12" fill="#d9dbc2" stroke="none" opacity=".5"/>
  {progress>.1&&<path className="lh-n-enter" d="M-60-100Q-10-104 58-100M-56-97Q0-102 54-97"/>}
  {progress>.25&&<path className="lh-n-enter" d="M0-174Q-4-90 0 0M4-169Q2-80 4 1M0-6-24 10M4-5 26 10"/>}
  {progress>.45&&<path className="lh-n-enter" d="M0-102Q-23-64-69-38M-3-95Q-28-55-64-36M-34-65-49-91M4-100Q36-52 72-37M7-96Q38-49 68-34M37-64 52-91"/>}
  {progress>.72&&<g className="lh-n-crown lh-n-enter">
   <path fill="url(#lh-scene-hatch)" d="M-69-62C-108-64-111-100-85-114C-102-145-73-168-47-160C-44-198-12-206 8-185C29-208 64-191 66-167C103-174 118-138 98-114C123-92 100-61 73-65C63-38 28-42 16-58C-8-34-40-42-42-60C-49-54-60-55-69-62Z"/>
   <path opacity=".55" d="M-79-118q17-16 33-7m-4-35q18-13 33-5m28-13q18 3 21 16m36 20q18 0 20 19M-22-72q12 9 27-2m36-26q18-13 34-5"/>
   <path fill="#c2d19e" d="M-19-148q-12-24-27-7q5 20 27 7m60 24q1-24 19-18q4 17-19 18m-54 34q-16-15-25-2q8 14 25 2"/>
  </g>}
 </g>;
}

function Cloud({x,y}:{x:number;y:number}){
 return <g transform={`translate(${x} ${y})`}><path className="lh-n-cloud" fill="#faf6ec" d="M-58 13Q-74-4-57-17Q-47-27-33-17Q-38-50-8-51Q16-50 19-27Q42-37 55-18Q76-16 71 4Q69 15 50 15Z"/></g>;
}

export function LivingNatureScene({id,progress,complete}:SceneProps){
 const p=complete?1:Math.max(0,Math.min(1,progress));
 let art:ReactNode=null;
 if(id==='tree')art=<>
  <path opacity=".35" d="M82 336Q220 325 347 336T558 333M108 344q188-8 404 2"/>
  {p===0?<path fill="#d6dfac" d="M308 331q4-18 24-9q-4 17-24 9m14-7 11-14"/>:<Tree x={320} y={327} size={1.2} progress={p}/>}
  {p>.75&&<g className="lh-n-bird"><path d="M464 110q10-10 20 0q10-10 20 0M143 154q8-8 16 0q8-8 16 0"/></g>}
 </>;
 if(id==='forest')art=<>
  <path opacity=".35" d="M65 339Q225 327 368 339T581 336M89 347q215-9 454 0"/>
  <Tree x={214} y={329} size={.98} progress={Math.min(1,p*2)}/>
  <Tree x={423} y={333} size={1.17} progress={Math.max(0,(p-.4)/.6)}/>
  {p>.85&&<><g className="lh-n-bird"><path d="M280 98q10-10 20 0q10-10 20 0M315 119q8-8 16 0q8-8 16 0"/></g><path fill="#d6dfac" d="M321 338q-18-18-23-3q5 10 23 3m0 0q9-24 22-13q-4 16-22 13"/></>}
 </>;
 if(id==='mountain')art=<>
  <path opacity=".35" d="M63 332q221 10 511-2M101 344q210-8 425-1"/>
  {p>.1&&<path className="lh-n-enter" fill="#e3e5ca" d="M87 329 199 155 309 329ZM108 329l93-160 30 51m-64-12 29 11 18-23"/>}
  {p>.34&&<path className="lh-n-enter" fill="url(#lh-scene-hatch)" d="M338 330 465 163 571 330ZM363 330l102-154 34 50m-74-10 25 8 19-22"/>}
  {p>.65&&<><path className="lh-n-enter" fill="#f0edd7" d="M188 333 328 87 471 333Z"/><path fill="#faf6ec" d="m290 154 38-67 43 75-22-11-21 17-18-17Z"/><path opacity=".6" d="m324 99-50 179-33 53m92-228 39 136 58 91M286 239l-24 71m113-63 27 51"/></>}
  {p>.9&&<><Cloud x={163} y={119}/><Cloud x={480} y={106}/><path d="m137 320 10-27 10 27m-10-27v34m354-1 9-24 9 24m-9-24v28"/></>}
 </>;
 if(id==='water')art=<>
  {p>.05&&<path className="lh-n-enter" fill="#dce0bd" d="M68 106q183 17 170 81t-52 131l-84 28q91-110 83-157T68 135m470-30q-169 34-125 96t112 115l56 19q-118-85-108-133t65-66"/>}
  {p>.25&&<path className="lh-n-enter" fill="#d9e4e5" stroke="none" d="M249 96q-35 89-4 144t-18 115h245q-119-104-96-159t32-100Z"/>}
  {p>.4&&<g className="lh-n-waterline"><path d="M252 131q56-14 113-2m-111 33q49-12 98-2m-91 39q32-9 72-2m-50 36q26-9 52-1m-59 40q44-13 88-2m-92 40q69-16 129 1"/></g>}
  {p>.65&&<g className="lh-n-leaf"><path fill="#c6d49f" d="M306 201q1-29 35-22q-7 31-35 22Z"/><path d="m309 199 26-15m-2 4-1-9m-7 15-11-4"/><path opacity=".5" d="M295 208q27 10 55 0m-48 8q20 6 36 0"/></g>}
  {p>.85&&<><path fill="#d2d1bf" d="M108 310q11-31 39-18q25 14 9 24q-27 11-48-6m371-157q12-23 32-7q17 16-4 22q-24 3-28-15"/><path d="M125 105q-13-23-13-43m11 43q14-29 29-31m-13 22 8-6m-38-4-6-7"/></>}
 </>;
 if(id==='sun')art=<>
  <path opacity=".45" d="M74 313q76-13 164-4t176-1t157 2M107 325q220-9 425 0"/>
  {p>.2&&<g className="lh-n-sun lh-n-enter"><circle cx="323" cy="198" r="78" fill="#ecd18c"/><circle cx="324" cy="198" r="73" opacity=".4"/>
   {p>.5&&<g className="lh-n-rays">{Array.from({length:12},(_,i)=><path key={i} transform={`rotate(${i*30} 323 198)`} d="M323 89v-19m-4 20 2-17"/>)}</g>}
   {p>.75&&<><path d="M299 194q7-9 14 0m24 0q7-9 14 0m-38 24q13 12 26-1"/><path opacity=".4" d="M296 170q17-19 38-14"/></>}
  </g>}
  {p>.9&&<><Cloud x={151} y={259}/><Cloud x={504} y={285}/><path d="m172 309 8-18 7 18m-7-17v23m286-3 9-20 8 20m-8-20v23"/></>}
 </>;
 if(id==='moon')art=<>
  <path opacity=".35" d="M91 337q195-17 451 0M133 346q164-7 367 1"/>
  {p>.2&&<g className="lh-n-enter"><path fill="#ead699" d="M362 94C282 69 218 132 234 210C246 279 322 309 379 266C315 273 276 230 284 181C289 140 319 110 362 94Z"/><path opacity=".5" d="M251 170q-16 61 35 95m-24-117-7 11"/></g>}
  {p>.5&&<g fill="#ead699">{[[168,133],[430,136],[482,235],[388,319],[167,264]].map(([x,y],i)=><path key={x} className="lh-n-star" style={{animationDelay:`${i*-.6}s`}} d={`M${x} ${y-9}q0 9 9 9q-9 0-9 9q0-9-9-9q9 0 9-9Z`}/>)}</g>}
  {p>.8&&<><Cloud x={421} y={279}/><path opacity=".6" d="m120 188 4 4m0-4-4 4m322-3 4 4m0-4-4 4m-93-132 4 4m0-4-4 4"/></>}
 </>;
 if(id==='fire')art=<>
  <ellipse cx="321" cy="334" rx="131" ry="18" fill="#e6dec3" stroke="none" opacity=".5"/>
  {p>.1&&<g className="lh-n-enter" fill="#dfc6a0"><path d="m214 329 186-40 13 22-186 43Z"/><path d="m228 289 180 39-10 24-182-40Z"/><path fill="none" d="m246 300 119 27m-125 9 133-30m-144 29 2 11m167-14-3 13"/></g>}
  {p>.3&&<path className="lh-n-flame lh-n-enter" fill="#e9cc87" d="M323 320C249 326 227 271 254 228C275 198 282 169 271 150C309 160 316 125 322 80C375 123 348 172 381 191C382 177 383 162 377 148C434 200 432 250 402 285C381 311 354 322 323 320Z"/>}
  {p>.55&&<path className="lh-n-flame lh-n-flame-inner lh-n-enter" fill="#d49270" d="M320 317C275 318 262 288 280 256C289 241 294 218 291 206C311 223 327 194 334 163C362 198 342 228 365 245C367 236 368 223 365 217C400 255 388 301 354 313Z"/>}
  {p>.8&&<><path className="lh-n-flame lh-n-enter" fill="#f5e7b5" d="M324 315C299 313 297 294 308 278C317 264 320 251 318 237C340 252 333 271 347 280C365 300 346 317 324 315Z"/><g stroke="#b87851"><path className="lh-n-spark" d="m245 180-5-13m152-45 5-12"/><path className="lh-n-spark" d="m291 115-2-9m115 100 7-9"/></g></>}
 </>;
 if(!art)return null;
 return <g className={'lh-n-scene '+(complete?'lh-n-live':'')} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><style>{sceneStyles}</style>{art}</g>;
}

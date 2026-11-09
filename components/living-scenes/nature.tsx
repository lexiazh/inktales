import type {ReactNode} from 'react';

const paper='#faf6ec';
const blue='#dbe7e7';
const sage='#d6dfb2';
const straw='#ecd59d';
const clay='#dcb19a';
const hatch='url(#lh-scene-hatch)';

function Cloud({x,y,size=1,fill=paper}:{x:number;y:number;size?:number;fill?:string}){
 return <g transform={`translate(${x} ${y}) scale(${size})`}><path fill={fill} d="M-60 15Q-78 3-60-17Q-46-29-30-17Q-31-46-4-48Q23-49 29-23Q51-34 68-14Q86 8 63 15Z"/><path opacity=".38" d="M-54 8q33 5 63 2m19 0 25-1"/></g>;
}

function Sun({x,y,size=1}:{x:number;y:number;size?:number}){
 return <g transform={`translate(${x} ${y}) scale(${size})`}><circle r="38" fill={straw}/><path d="M0-53v-13m0 119v13M-53 0h-13m119 0h13m-29-37 9-9m-83 83-9 9m9-83-9-9m83 83 9 9"/><path opacity=".46" d="M-27-5q3-18 21-23"/></g>;
}

function Leaf({x,y,angle=0,size=1,fill=sage}:{x:number;y:number;angle?:number;size?:number;fill?:string}){
 return <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${size})`}><path fill={fill} d="M-43 18Q-28-31 51-28Q30 38-43 18Z"/><path d="M-55 26 41-23m-64 33 6-21m8 15 20 4m3-18 8-13m1 9 13 2"/><path opacity=".45" d="M-32 16q28 7 50-8"/></g>;
}

function Star({x,y,size=1}:{x:number;y:number;size?:number}){
 return <path transform={`translate(${x} ${y}) scale(${size})`} fill={straw} d="M0-16Q3-3 16 0Q3 3 0 16Q-3 3-16 0Q-3-3 0-16Z"/>;
}

function Fir({x,y,size=1,fill=sage}:{x:number;y:number;size?:number;fill?:string}){
 return <g transform={`translate(${x} ${y}) scale(${size})`}><path fill={fill} d="M0-147 30-94 19-95 49-58 31-60 62-23Q7-7-62-25L-30-59l-19 2 33-37-15 3Z"/><path d="M0-110 2 0m-28-53 27 8 23-12m-53 28 30 8 33-8"/></g>;
}

function Bloom({x,y,size=1,fill=clay}:{x:number;y:number;size?:number;fill?:string}){
 return <g transform={`translate(${x} ${y}) scale(${size})`}><path fill={fill} d="M-12-24q-17-22 8-28 20-5 22 24 28-13 37 7 6 21-26 27 21 20 7 37-14 18-34-14-19 27-39 12-17-15 9-37-30-7-26-28 6-18 42 0Z"/><circle r="12" fill={straw}/><path opacity=".55" d="m-7-4 3-2m9 2 3-2m-11 9 3-1"/></g>;
}

export const natureScenes:Record<string,ReactNode[]>={
 天:[
  <path fill={blue} d="M99 286Q100 75 314 68Q526 73 544 281Z"/>,
  <g className="lh-motion-rise"><Sun x={306} y={172} size={1.2}/></g>,
  <g className="lh-motion-drift"><Cloud x={197} y={234} size={.86}/><Cloud x={446} y={214} size={.65}/></g>,
  <path fill={sage} d="M92 287q90-40 185-16t121 3q85-26 153 13v33H92Z"/>,
 ],
 地:[
  <path fill="#e8e0c7" d="M99 286 164 205 279 244 421 182 550 285l-11 40H106Z"/>,
  <g><path fill={hatch} d="M113 289 174 215 280 253l142-63 117 97q-105-10-178 12-92 24-248-10Z"/><path d="M111 299q110 23 168 16 81-10 125-23m50 18 66-8M179 239q20 2 46 17m198-42 50 37"/></g>,
  <g className="lh-motion-sway"><path d="M184 273q-7-26-18-34m18 34q3-21 19-33m232 13q-10-19-19-20m19 20 9-18"/><ellipse cx="346" cy="272" rx="12" ry="4" fill="#e2d0af"/></g>,
 ],
 土:[
  <path fill="#e0bc95" d="M111 324Q119 300 166 288Q174 252 216 249Q231 193 293 198Q346 181 370 242Q412 236 436 270Q504 274 530 324Z"/>,
  <g><path d="M173 297q18-21 52-19m29-47q34-26 67-10m43 44q31-7 51 14m-178 32q34-15 73-8m40-13q24-14 50-5m56 7 22 11"/><path fill="#f0dbb3" d="m204 291 9-11 11 13Zm83-47 8-7 10 9Zm102 56 13-12 13 12Z"/></g>,
  <g className="lh-motion-sway"><path d="M298 210q-3-32 11-66"/><Leaf x={294} y={160} size={.46} angle={30}/><Leaf x={323} y={147} size={.36} angle={-28}/></g>,
 ],
 石:[
  <ellipse cx="324" cy="311" rx="205" ry="22" fill="#e6dfc9" stroke="none"/>,
  <g className="lh-motion-tilt"><path fill="#c9cbc1" d="M170 279 197 196 272 142 361 153 449 208 472 278 421 310 215 314Z"/><path fill="#e5e3d5" d="m197 196 75-54 89 11 50 34-126 31Z"/><path fill="#bec6c2" d="m285 218 126-31 38 21 23 70-51 32-136-15Z"/><path opacity=".57" d="m213 215 27 9m89 23 27-13m40 42 27-13m-201 25 26 12"/></g>,
  <path fill={straw} d="m121 304 19-21 24 4 11 19Zm355 10 14-17 31 1 11 17Z"/>,
 ],
 沙:[
  <g fill="#ebd6ac"><path d="M95 307q84-92 164-82 49 7 85 30 107-65 205 52v30H95Z"/><path d="M107 332q122-64 199-36t238 14v27H107Z"/></g>,
  <g stroke="#b89060"><path d="M146 287q32-13 69-13m25-4 17 2m75 16q75-41 138-21m-52 41q41-11 89-8"/><path d="M156 314h3m20-7h2m98-1h3m38 15h4m37-5h3m121-4h4"/></g>,
  <g className="lh-motion-flow" stroke="#b89060" strokeDasharray="2 7"><path d="M127 212q127-27 249 16m-129-32q135-16 238 29m-302-35q39-8 78-2"/></g>,
 ],
 云:[
  <g opacity=".4"><Cloud x={177} y={283} size={.55}/><Cloud x={466} y={250} size={.7}/></g>,
  <g className="lh-motion-drift"><Cloud x={312} y={209} size={2.2} fill={blue}/><path opacity=".43" d="M199 215q23-23 55-16m51-57q29-12 53 7"/></g>,
  <path opacity=".55" d="M166 126q43-13 89-8m157 39q39-9 71-1m-32 145q36-6 57 1m-389 21 68-2"/>,
 ],
 雨:[
  <path fill={sage} d="M93 317q64-43 149-21t174-3q89-30 135 24v20H93Z"/>,
  <g><Cloud x={254} y={143} size={1.3} fill={blue}/><Cloud x={390} y={139} size={1.43} fill="#ccdbe0"/></g>,
  <g className="lh-motion-fall" stroke="#6b94a9" strokeWidth="3"><path d="m177 187-14 31m51 8-16 35m42-80-15 32m44 29-14 31m38-90-17 39m55 5-16 34m48-77-15 32m62 18-13 29m47-75-14 32m53-12-12 28"/><path opacity=".6" d="m171 257-8 18m139-8-8 17m63-27-8 20m101-22-9 19"/></g>,
  <g className="lh-motion-pulse" fill={blue}><ellipse cx="306" cy="309" rx="79" ry="10"/><ellipse cx="305" cy="307" rx="30" ry="4" fill="none"/><ellipse cx="457" cy="320" rx="46" ry="6"/><path fill="none" d="m301 302-8-11m17 11 8-13"/></g>,
 ],
 雪:[
  <path fill={blue} d="M92 313 201 215l51 46 69-104 84 99 38-27 104 83Z"/>,
  <path fill={paper} d="m164 248 37-33 38 35-25-7-13 12-19-10Zm112-23 45-68 53 63-25-7-16 14-19-14-18 18Zm145 22 22-18 35 29-25-6-13 6Z"/>,
  <g className="lh-motion-fall" stroke="#83a3b5"><path d="M172 128v42m-18-32 36 21m-36 0 36-21m-18-10-5 7m5-7 5 7m-5 35-5-7m5 7 5-7M428 104v51m-22-38 44 25m-44 0 44-25m-22-13-6 8m6-8 6 8m-6 43-6-8m6 8 6-8"/><circle cx="264" cy="141" r="3"/><circle cx="483" cy="203" r="4"/><circle cx="317" cy="108" r="3"/><circle cx="122" cy="220" r="3"/></g>,
  <path fill={paper} d="M91 318q108-28 223-4 119 25 237-4v26H91Z"/>,
 ],
 风:[
  <path fill={hatch} d="M92 321q87-51 174-30 93 28 284 8v38H92Z"/>,
  <g className="lh-motion-flow" stroke="#83a2a7" strokeWidth="2.3"><path d="M107 176q134 24 238-17 82-33 103-3 13 27-29 29m-293 32q75 10 162-6 180-35 224 8m-385 22q58 9 111-2m98-109q80-36 146-20 50 12 23 37"/><path d="M260 266q79-14 123-3"/></g>,
  <g className="lh-motion-drift"><Leaf x={263} y={139} angle={-18} size={.57}/><Leaf x={387} y={215} angle={45} size={.64} fill={straw}/><Leaf x={490} y={181} angle={23} size={.36}/></g>,
 ],
 雷:[
  <g><Cloud x={242} y={150} size={1.32} fill="#b4c5d0"/><Cloud x={361} y={145} size={1.65} fill="#c3d0d9"/><Cloud x={444} y={179} size={.76} fill="#b4c5d0"/></g>,
  <g className="lh-motion-blink"><path fill="#edd28a" d="m327 178-64 87 53-9-20 60 88-100-62 12 41-50Z"/><path stroke="#ae9867" d="m318 184-34 52m60 6-35 42"/></g>,
  <g className="lh-motion-pulse" stroke="#748da1"><path d="M208 195q-47 15-66 55m54-23q-19 10-28 29m255-57q46 10 69 50m-66-25q28 9 41 30M230 301q-59 15-78 36m253-31q61 11 90 28"/></g>,
 ],
 电:[
  <g><path fill="#e1debf" d="M106 299h120v33H106zM415 292h111v39H415Z"/><path d="M226 311h103v-85m0 85h86m-287-13v-14h28v14m38 0v-14h15v14m256 17h31m-15-13v27"/><path stroke="#a87966" d="M121 313h19m51 0h18m-9-9v19"/></g>,
  <g><path fill="#bcc9ca" d="M289 224h82v34l-15 19h-52l-15-19Z"/><path d="M291 240h78m-72 12h66m-58 12h47"/><path fill="#f1dfaa" d="M293 223q0-31-25-55-30-31-12-70 21-47 74-47 52 0 74 47 16 37-14 70-22 24-22 55Z"/></g>,
  <g className="lh-motion-pulse" stroke="#b58f4a"><path d="M310 222v-65l-13-12 18-11 14 16 16-16 18 10-13 15v63M225 116h-30m250 0h30m-239-43-20-14m222 15 21-15m-231 103-20 13m234-13 20 13"/><path strokeWidth="3" d="M277 121q3-21 19-35"/></g>,
 ],
 气:[
  <g><path fill="#d8b59a" d="m145 238 161-24 83 51-146 31Z"/><path fill="#efd3aa" d="m145 238 158-56 86 83-146 12Z"/><path d="m159 238 87 33 126-8m-192-33 79 35 103-7m-148-41 61 42 68-6m-100-46 48 43 40-3"/></g>,
  <g className="lh-motion-stretch"><path fill="#c4c9b3" d="m374 244 40-13 29 11-51 23Z"/><path opacity=".6" d="m390 248 26-9"/></g>,
  <g className="lh-motion-drift" stroke="#87a4af"><path d="M443 234q41-13 26-35-10-14-27-8m10 57q67-6 66-42m-25 68q-29 8-48-8"/><circle cx="493" cy="165" r="13"/><circle cx="529" cy="135" r="21"/><path d="M522 125q7-4 13 1"/></g>,
 ],
 冰:[
  <ellipse cx="323" cy="316" rx="191" ry="24" fill={blue}/>,
  <g className="lh-motion-tilt"><path fill="#c4e0e6" d="m167 196 89-64 113 32 4 102-101 49-106-43Z"/><path fill="#e5f2ec" d="m167 196 89-64 113 32-94 65Z"/><path fill="#b1d0dc" d="m275 229 94-65 4 102-101 49Z"/><path stroke="#739cae" d="m190 208 8 46 46 16m52-70 36-25m-29 68 46-29"/></g>,
  <g><path fill="#d4e8e9" d="m363 251 54-38 67 25 3 59-60 31-63-27Z"/><path fill="#eef7ed" d="m363 251 54-38 67 25-57 38Z"/><path d="m427 276 0 52m14-80 18-10"/></g>,
  <g className="lh-motion-blink"><Star x={373} y={127} size={.78}/><Star x={467} y={199} size={.61}/><Star x={142} y={259} size={.42}/></g>,
 ],
 河:[
  <path fill={hatch} d="M94 135q123 34 186 5l19 60q-158 34-95 130H94Zm453 10q-148 29-174-12l-33 63q100 18 45 133h162Z"/>,
  <path fill={blue} d="M280 140q-3 33 19 60-158 34-95 130h181q55-115-45-134l33-63Z"/>,
  <g className="lh-motion-flow" stroke="#7ba0af"><path d="M293 158q45 9 61-7m-45 36q12 4 27 0m-65 40q47-15 80 1m-110 25q31-11 76-5m-82 47q79-17 140 1m-159 16q61-12 111-8"/></g>,
  <path fill="#c7cabc" d="M156 258q0-22 23-24 25 0 25 21-19 11-48 3m276 9q7-18 25-15 17 3 19 19-31 12-44-4"/>,
 ],
 海:[
  <path fill="#e9e9d4" d="M94 91h453v117H94Z"/>,
  <g><Sun x={422} y={158} size={.72}/><Cloud x={204} y={125} size={.78}/><path fill="#bcd7de" d="M94 205q228-7 453 0v116H94Z"/></g>,
  <g className="lh-motion-flow" stroke="#648da1"><path d="M110 225q46-9 104 0t120 0 123 0 78-1m-404 22q79 8 131-2 66-10 119-2m35 10q48 6 110-4m-406 21q66-12 135 0t128 1q91-14 146-3m-396 21q131 6 192-2t170 2m-222 17q43 5 99-1"/></g>,
  <g className="lh-motion-drift"><path d="M157 171q11-13 24 1 15-14 28-1m64-11q8-10 18 1 11-12 24 0"/></g>,
 ],
 江:[
  <path fill="#d2d9b2" d="M93 219q71-126 136-73 32-62 99 11 64-49 96 12 71-34 125 50Z"/>,
  <path fill="#c2dce1" d="M92 228q228-69 459-9v118H92Z"/>,
  <g className="lh-motion-flow" stroke="#78a0b3"><path d="M109 257q89 11 203-8t218-4m-397 37q109 13 196-1t190-10m-404 39q84 15 155 6m37-4q121-15 225-11"/></g>,
  <g transform="translate(383 243)"><g className="lh-motion-drift"><path fill={straw} d="M-29 0h72L28 15h-41Z"/><path d="M3-31V0"/><path fill={paper} d="M3-33 24-5H3Z"/></g></g>,
 ],
 湖:[
  <g><path fill={sage} d="M105 250q43-77 94-63 32-47 93-39 58-15 103 34 66-17 139 74Z"/><path fill="#e5e6c5" d="M104 260q65-20 159-19t268 22v36H104Z"/></g>,
  <path fill={blue} d="M94 268q63-34 143-22 68 16 142 1t167 28q-2 50-144 61H205Q103 333 94 268Z"/>,
  <g className="lh-motion-pulse" stroke="#7da0ab"><ellipse cx="290" cy="292" rx="68" ry="10"/><ellipse cx="290" cy="292" rx="31" ry="4"/><path d="M117 282q53 13 95 9m176 12q72-19 129-7"/></g>,
  <g className="lh-motion-sway"><path d="M136 316q-5-44-19-63m20 63q7-42 22-62m314 71q-5-32-23-55m25 55q2-39 18-68"/><path fill={straw} d="M114 254q-8-14-3-25 10 8 9 22Zm40 1q-1-15 10-22 7 12-5 24Zm334 3q0-15 11-24 3 14-6 24Z"/></g>,
 ],
 泉:[
  <path fill="#d8d6bf" d="m93 286 60-104 109-28 76-72 109 71 101 141Z"/>,
  <g><path fill={blue} d="M332 163q-23 23-9 43 15 32-48 45-57 20-73 57h256q-57-58-115-60 26-31-11-85Z"/><path fill="#aeb9ac" d="m123 288 74-36 41 22-41 48h-73Zm315-34 56 12 42 51-86 4-49-24Z"/></g>,
  <g className="lh-motion-fall" stroke="#6d96a8" strokeWidth="2.8"><path d="M334 179q-17 31 4 50m-18-32q-11 27 2 37m13 16q-22 16-59 21m-14 12q44-10 80-8m-104 16q81 15 178-1"/></g>,
  <g className="lh-motion-rise" fill={blue}><circle cx="319" cy="151" r="4"/><circle cx="340" cy="145" r="5"/><circle cx="326" cy="127" r="3"/></g>,
 ],
 波:[
  <path fill={blue} d="M91 283q92 48 195 27 114-28 264-3v30H91Z"/>,
  <g className="lh-motion-flow" stroke="#6590a6" strokeWidth="2.5"><path fill="#c9dfe0" d="M93 258q62 22 117-42 38-43 82-34 33 5 69 42 48 50 187 38v30q-148 20-211-44-36-35-57-34-23-1-61 32-50 45-126 35Z"/><path d="M121 306q61 9 131-29 38-21 67-14m75 34q70 27 135 10"/><path fill="none" opacity=".44" d="M224 227q30-33 54-32 24 0 53 26"/></g>,
  <g className="lh-motion-pulse"><path fill="#e9f0e7" d="m262 178 12-12 15 9 17-2 17 14-26-4-15 3Z"/><path d="M200 183q16-13 28-11m128 15q26-8 46 4"/></g>,
 ],
 浪:[
  <path fill="#ecd7ad" d="M100 297q186-45 443-29v70H100Z"/>,
  <g className="lh-motion-stretch"><path fill="#b8d5df" d="M94 313q134-39 151-115 11-77 109-88 78-7 116 61-71-28-106 11-42 62 88 98 56 16 98 39-214-9-456 0Z"/><path stroke="#719eb1" d="M162 295q94-33 106-91 18-66 80-73m-3 57q-31 81 117 117"/></g>,
  <g className="lh-motion-rise"><path fill="#eef1e7" d="M313 124q-7-26 19-22 13-26 45-13 32-3 44 16 30 4 40 32 25 12 13 36-79-35-115 14 20-46-46-63Z"/><circle fill={blue} cx="490" cy="175" r="6"/><circle fill={blue} cx="501" cy="198" r="4"/><path d="m471 188 12 19m-37-15 14 22"/></g>,
  <path fill={paper} d="M460 302q13-23 34-11 16-17 33-1l23 30q-41-12-90-18Z"/>,
 ],
 花:[
  <path fill="#e7e2c5" d="M114 316q100-26 222-8t194 4v21H114Z"/>,
  <g className="lh-motion-sway"><path stroke="#829773" strokeWidth="3" d="M313 322q19-91 3-170m35 172q14-49 61-76m-136 72q-15-62-56-91"/><Leaf x={291} y={252} angle={208} size={.62}/><Leaf x={355} y={247} angle={-18} size={.57}/></g>,
  <g className="lh-motion-nod"><Bloom x={315} y={143} size={1.42}/><Bloom x={222} y={227} size={.64} fill="#d9c2a7"/><Bloom x={420} y={242} size={.72} fill="#e6bcac"/></g>,
  <path opacity=".48" d="M144 301q8-23 24-32m307 32q5-26 25-32m-301 49 22-1m216 2 22-2"/>,
 ],
 草:[
  <path fill={hatch} d="M94 298q118-21 227-10 107-29 227 13v32H94Z"/>,
  <g className="lh-motion-sway" fill={sage}><path d="M210 315q-48-40-48-101 46 41 48 101q-2-84 34-136 3 91-34 136q37-56 69-56-22 45-69 56ZM325 315q-54-57-52-107 38 26 52 107q-5-112 36-153 2 82-36 153q43-61 82-67-28 43-82 67Z"/><path fill="#c7d3a2" d="M456 312q-59-37-64-84 42 20 64 84q-19-82 21-126 6 58-21 126q23-49 68-58-24 45-68 58Z"/></g>,
  <path opacity=".55" d="M107 326q28-7 63-7m85 1 31-3m83 9q25-8 64-6m55 6 35-5M208 303l12-59m107 55 24-65m105 62 8-45"/>,
 ],
 竹:[
  <path fill="#e5e2ca" d="M130 328q183-32 376-4v11H130Z"/>,
  <g fill="#bcca99"><path d="m202 326 18-229h19l-16 229ZM295 331l-3-257h21l5 257ZM378 329l34-214 18 5-29 209Z"/><path d="m210 263 18 1m-13-62 19 2m-13-62 17 1m57-7 18-1m-18 58h19m-19 55 21-1m-20 48h22m75-33 18 3m-11-60 19 3m-11-55 20 3"/></g>,
  <g className="lh-motion-sway"><path d="m231 180-69-41m72 14 40-36m38 96 74-68m-75 5 47-41m65 66 72-45m-90 91 75 3"/><Leaf x={154} y={137} angle={200} size={.7}/><Leaf x={268} y={112} angle={-18} size={.48}/><Leaf x={376} y={140} angle={-22} size={.67}/><Leaf x={351} y={107} angle={-15} size={.52}/><Leaf x={480} y={134} angle={-14} size={.65}/><Leaf x={477} y={222} angle={20} size={.57}/></g>,
 ],
 叶:[
  <path opacity=".4" d="M132 302q153-29 361 6m-287 22q100-18 195-3"/>,
  <g className="lh-motion-tilt"><Leaf x={321} y={199} angle={-14} size={3.04} fill="#ced9a7"/></g>,
  <g className="lh-motion-drift"><path d="M136 223q-17-31 18-48m325 49q37-18 37-53M123 251q-13-5-17-16m394 16 18-9" stroke="#81939d"/><path fill={straw} d="m445 142 18-9-11 20Z"/></g>,
 ],
 树:[
  <path fill={hatch} d="M107 317q167-34 425-9v24H107Z"/>,
  <g><path fill="#d4ae8a" d="M297 321q11-70 1-123l-53-44 11-14 50 31 5-70 18-1 4 77 53-45 16 15-63 58q-7 58 10 114Z"/><path d="M317 216q-2 74-8 95m25-90q-4 35 1 53"/></g>,
  <g className="lh-motion-sway"><path fill={sage} d="M213 181q-48-17-23-58 13-25 44-25 12-39 56-27 40-27 72 10 54-14 69 35 56 6 38 54-14 33-51 30-21 31-65 13-35 18-67-2-49 11-73-30Z"/><path opacity=".56" d="M218 150q10-23 34-17m33-28q22-15 41-1m43 3q31-3 40 20m-80 59q31 8 59-5"/><circle fill={clay} cx="244" cy="163" r="6"/><circle fill={clay} cx="342" cy="129" r="6"/><circle fill={clay} cx="411" cy="162" r="6"/></g>,
 ],
 根:[
  <g><path fill="#e8d6b4" d="M101 195q104-24 218-7 106 12 218-6v147H101Z"/><path opacity=".43" d="m126 226 32-6m12 45 23-7m-62 42 49-8m224-78 25 3m30 38 46 8m-58 32 48-4m-275 14 30-5m109 13 30-3"/></g>,
  <g stroke="#a57960" strokeWidth="3.6"><path d="M318 181q7 58-8 145m7-109q-27 14-49 57l-53 34m55-38-27-2-28 16m34 3-1 32m69-81q45 8 69 43l52 35m-51-36 50-11 38 14m-64 17 9 27m-102-61-30 42m28-22 18 35m-17-31 47 21"/></g>,
  <g className="lh-motion-sway"><path d="M318 188q1-48 9-83"/><Leaf x={299} y={126} angle={200} size={.68}/><Leaf x={352} y={107} angle={-20} size={.73}/></g>,
 ],
 枝:[
  <path fill="#d5b390" d="M123 291q110-47 211-104l-65-52 7-13 78 54q74-40 146-64l5 10q-52 23-94 54l53 9-3 10-65-8q-122 85-264 129Z"/>,
  <g><path d="M156 295q171-69 222-105m-179 98 60-28m119-100 18-43m-110 39-30-9m183 50 31 27"/><Leaf x={248} y={150} angle={202} size={.74}/><Leaf x={397} y={112} angle={-32} size={.82}/><Leaf x={481} y={222} angle={39} size={.69}/></g>,
  <g className="lh-motion-nod"><Leaf x={504} y={109} angle={-12} size={.63}/><Leaf x={289} y={124} angle={-126} size={.48}/><path stroke="#a77f67" fill={clay} d="M450 137q-2-21 12-24 9 9-12 24Z"/></g>,
 ],
 森:[
  <path fill="#e1e2c1" d="M97 305q87-57 160-36 69-65 151-32 76-19 137 60v36H97Z"/>,
  <g opacity=".64"><Fir x={155} y={283} size={.81} fill="#bfc9ad"/><Fir x={248} y={275} size={1.04} fill="#bfc9ad"/><Fir x={387} y={256} size={1.27} fill="#c2cbb4"/><Fir x={490} y={279} size={.85} fill="#bfc9ad"/></g>,
  <g className="lh-motion-sway"><Fir x={182} y={324} size={1.28} fill="#bec99d"/><Fir x={321} y={319} size={1.51} fill={sage}/><Fir x={465} y={322} size={1.2} fill="#c3d0a6"/></g>,
  <path opacity=".56" d="M113 326q80-11 149-3m124 4q69-14 143-3m-255 11q43-9 96-4"/>
 ],
 星:[
  <path fill="#d5e0df" d="M105 284Q97 73 319 65Q530 63 538 284Z"/>,
  <g className="lh-motion-blink"><Star x={319} y={166} size={2.65}/><Star x={211} y={134} size={.88}/><Star x={425} y={129} size={.72}/><Star x={467} y={218} size={.95}/><Star x={162} y={214} size={.7}/><Star x={269} y={227} size={.66}/></g>,
  <g><path opacity=".48" strokeDasharray="3 7" d="m162 214 49-80 108 32 106-37 42 89-117 25-81-16"/><path fill={hatch} d="M98 301q86-60 163-23 96-69 164-19 54-5 122 38v33H98Z"/></g>,
 ],
 光:[
  <g><path fill="#e4dfc9" d="M157 81h150v164H157z"/><path fill="#d1e3e1" d="M170 96h122v134H170Z"/><path d="M230 97v133m-60-74h122"/></g>,
  <g className="lh-motion-pulse"><path fill="#f1dfab" fillOpacity=".68" stroke="#bd9c68" d="m176 106 112 41 224 148-223 17-113-106Z"/><path opacity=".5" stroke="#c19c59" d="m195 126 252 156m-263-94 149 97"/><ellipse cx="400" cy="312" rx="111" ry="17" fill="#eed89c" stroke="none" opacity=".58"/></g>,
  <g className="lh-motion-drift"><Star x={337} y={220} size={.45}/><Star x={384} y={247} size={.58}/><Star x={430} y={278} size={.41}/></g>,
 ],
 空:[
  <ellipse cx="320" cy="323" rx="165" ry="17" fill="#e8dfca" stroke="none"/>,
  <g><path fill="#dbbf9f" d="M178 199q26 122 143 125 109-2 141-125Z"/><path d="M192 241q35 52 71 59m-48-34 23 16"/><ellipse cx="320" cy="199" rx="142" ry="48" fill="#ead3ac"/><ellipse cx="320" cy="199" rx="117" ry="31" fill={paper}/></g>,
  <g className="lh-motion-rise"><ellipse cx="318" cy="116" rx="113" ry="24" fill="#d7d8ba"/><path fill={hatch} d="M205 115q20-37 113-39 91 1 113 39-103 34-226 0Z"/><path fill="#dbbf9f" d="M298 77q-7-23 21-23 28 0 22 23Z"/><path opacity=".55" d="M254 108q30-10 73-10"/></g>,
 ],
 春:[
  <g><path fill="#e5e8cb" d="M96 302q78-107 186-57 131-85 262 57v35H96Z"/><path d="M109 321q71-11 144-6m124 4q55-19 154-5" opacity=".38"/></g>,
  <g><path fill="#d3b28a" d="M172 313q21-79 85-144 22-27 21-55l13 3q11 40-21 71 63-51 151-59l7 11q-78 21-140 63-52 49-91 116Z"/><path d="m254 196-26-49m60 49 38-59m34 31 35 13"/></g>,
  <g className="lh-motion-sway"><Bloom x={230} y={146} size={.54} fill="#e5beb4"/><Bloom x={288} y={111} size={.55} fill="#e9c8b7"/><Bloom x={325} y={139} size={.62} fill="#e3afa4"/><Bloom x={421} y={133} size={.63} fill="#e9c8b7"/><Bloom x={395} y={180} size={.46} fill="#e5beb4"/></g>,
  <g className="lh-motion-fall" fill="#e5b5a7"><path d="M278 250q12-18 22-8-4 11-22 8Zm88-32q18-17 23-3-7 12-23 3Zm87 37q15-16 25-2-10 10-25 2Z"/></g>,
 ],
 夏:[
  <g><path fill="#e6d9ae" d="M104 289q92-56 177-36 157-30 251 35v45H104Z"/><path opacity=".38" d="M117 317q139-17 279 0m-237 10q149-14 287 1"/></g>,
  <g transform="translate(304 291)"><g className="lh-motion-tilt"><path fill="#f0dfb6" d="M0 0-143-120q45-83 143-83 94 0 143 83Z"/><path stroke="#a78865" d="M0 0-96-166M0 0-48-194M0 0v-202M0 0l51-193M0 0l96-168"/><path fill="none" d="M-124-124q53-64 124-63 73 0 123 64"/><path fill="#d8ac8b" d="M-7-5h14v37H-7Z"/></g></g>,
  <g className="lh-motion-blink"><Sun x={480} y={118} size={.72}/></g>,
  <g className="lh-motion-flow" opacity=".6" stroke="#87a8aa"><path d="M409 232q44-19 89-4m-62 21q24-11 56-5M116 218q20-6 50-6"/></g>,
 ],
 秋:[
  <path fill="#e9d8af" d="M96 307q100-67 218-26 120-56 234 31v25H96Z"/>,
  <g><path fill="#c4a381" d="M104 84q133 49 248 87 68 19 124 9l5 11q-79 18-179-7-142-39-201-69Z"/><path d="m226 149 46-33m58 65 42 41m32-34 46-30"/><Leaf x={279} y={114} angle={-29} size={.6} fill={straw}/><Leaf x={448} y={151} angle={-22} size={.58} fill={clay}/></g>,
  <g className="lh-motion-fall"><Leaf x={216} y={230} angle={151} size={.75} fill="#dbaf84"/><Leaf x={384} y={244} angle={27} size={.76} fill="#d3a087"/><Leaf x={472} y={273} angle={140} size={.57} fill={straw}/></g>,
  <path opacity=".55" d="M110 325q81-10 160-5m55 11q98-16 204-10" stroke="#9f8b67"/>,
 ],
 冬:[
  <path fill="#d6e5e5" d="M96 285q63-72 166-56 97-43 281 47v62H96Z"/>,
  <g><path fill="#cdb99d" d="M299 316q-6-87 4-158l-14-65 11-7 15 65 40-48 10 9-43 68 63-26 6 10-71 41q-2 56 7 111Z"/><path d="m304 190-57-47-21-45m26 48-37 1m109 45 17-63m31 37 42-38m-23 21 31 1m-112 48q-5 49 0 104"/></g>,
  <g><path fill={paper} d="M96 311q128-41 235-11 99-31 212 9v29H96Z"/><path fill={paper} d="M223 105q-12-13-7-20 16-10 27 16l10 21-15 2Zm74-14q-7-17 3-21 15 2 17 18l10 23-15 3Zm74 19q20-29 33-26 10 7-13 25Z"/></g>,
  <g className="lh-motion-fall" fill={paper}><circle cx="145" cy="177" r="4"/><circle cx="191" cy="230" r="5"/><circle cx="428" cy="218" r="4"/><circle cx="476" cy="153" r="5"/><circle cx="358" cy="242" r="4"/></g>,
 ],
 冷:[
  <path fill="#e0e7df" d="M137 282Q112 99 286 77q162-17 204 133 31 127-173 128-114 1-180-56Z"/>,
  <g className="lh-motion-tilt"><path fill="#c4d8da" d="M241 275q-17-61-25-95-5-19 8-25 15-8 25 9l17 24-4-66q-3-32 27-43 36-13 55 15 20 29 18 82l-2 101Z"/><path fill="#d9b59b" d="m235 264 128-10 3 44-125 12Z"/><path opacity=".63" d="M284 155q24-17 49-7m-52 27q20-15 53-10m-81 114 2 17m22-20 1 17m23-17 1 17m23-20 1 19m19-20 1 17"/></g>,
  <g className="lh-motion-blink" stroke="#7999ad"><path d="M155 119v39m-17-30 34 20m-34 0 34-20m274 44v47m-20-35 40 23m-40 0 40-23m-68 68 10 10m0-10-10 10m-225-9 12 12m0-12-12 12"/></g>,
 ],
 热:[
  <g><path fill="#ecdab1" d="M112 315q117-45 216-24 76-27 190 18v25H112Z"/><Sun x={413} y={129} size={1.05}/></g>,
  <g><path fill={paper} d="M235 247V106q0-22 23-22 24 0 24 22v141a42 42 0 1 1-47 0Z"/><path fill="#d2927d" d="M249 255V123q0-10 9-10 10 0 10 10v132a25 25 0 1 1-19 0Z"/><path d="M271 118h11m-11 25h11m-11 25h11m-11 25h11m-11 25h11"/></g>,
  <g className="lh-motion-steam" stroke="#ad7e69"><path d="M349 275q-19-18 0-35t0-35m42 74q-17-18 0-35t0-34m43 59q-20-13-2-32t1-33m46 62q-20-18-2-33t-1-35"/></g>,
 ],
 晴:[
  <path fill="#d8e9e5" d="M100 265Q124 77 319 69 504 78 540 266Z"/>,
  <g className="lh-motion-pulse"><Sun x={317} y={165} size={1.47}/></g>,
  <g><path fill="#d0dcac" d="M94 284q65-100 142-61 52 26 103 21 76-61 139-25 38 17 70 63v55H94Z"/><path fill="#e8e6c3" d="M94 302q136-22 211 7 111 23 243-19v47H94Z"/><path opacity=".53" d="M142 309q69-13 110-6m164 24q63-2 91-14"/></g>,
  <g className="lh-motion-drift"><Cloud x={462} y={172} size={.45}/><path d="M161 156q9-10 18-1 10-10 19-1m13 24q7-7 14-1 8-8 15-2"/></g>,
 ],
 阴:[
  <path fill="#e0dfc6" d="M91 303q187-33 457-1v33H91Z"/>,
  <g><path fill="#c1cbd1" opacity=".72" d="M169 306q75-42 164-59 76-8 137 15l-98 28 111 8q-46 29-191 27Z"/><path fill="#c2a98d" d="M247 316q8-78-7-135l17-3 11 56 49-42 11 9-56 59q-6 28-3 54Z"/></g>,
  <g className="lh-motion-sway"><path fill="#b6c2a3" d="M182 195q-57-14-40-56 12-37 58-35 25-36 66-19 52-18 84 15 35 1 48 30 22 43-25 68-40 15-78 1-58 25-113-4Z"/><path opacity=".52" d="M157 161q35 14 59-7m22 34q38-16 69-6m18-65q31-4 53 18"/></g>,
  <g opacity=".74" className="lh-motion-drift"><Cloud x={468} y={100} size={.64} fill="#d8e0df"/></g>,
 ],
 阳:[
  <g><path fill="#ced8b1" d="M94 288q98-10 165-96 23-31 64-24 64 7 111 61l113 58v44H94Z"/><path fill="#e8d69c" d="M327 168q60 10 107 61l113 58v44H288q-9-69 39-163Z"/><path opacity=".48" d="M302 215q-69 87-141 95m180-93q61 86 150 103"/></g>,
  <g className="lh-motion-pulse"><Sun x={459} y={115} size={.91}/><path opacity=".58" stroke="#b69658" d="m423 170-30 50m66-36-3 48m36-63 25 37"/></g>,
  <g className="lh-motion-sway"><path stroke="#a7a16f" d="M354 303q-4-24-20-33m20 33q6-31 19-36m77 44q-2-20-16-32m16 32q4-17 17-26"/><path fill={straw} d="m369 272 7-14 6 10Zm91 18 12-15 2 12Z"/></g>,
 ],
 雾:[
  <g opacity=".66"><Fir x={151} y={304} size={.86} fill="#afc0b0"/><Fir x={234} y={305} size={1.14} fill="#b6c7b7"/><Fir x={415} y={301} size={1.17} fill="#bacbb9"/><Fir x={501} y={300} size={.76} fill="#aabfac"/></g>,
  <g className="lh-motion-drift" fill="#e7eae0" stroke="#8fa7aa" fillOpacity=".94"><path d="M93 174q112-35 230-11 134 25 225-1-44 49-176 48-95-28-279-1Z"/><path d="M100 239q108 13 198-12 116-28 241 13-116-8-217 26-87 26-222-1Z"/></g>,
  <path fill="#dee5cc" d="M95 317q116-39 235-13 112-23 215 13v20H95Z"/>,
 ],
 露:[
  <path opacity=".42" d="M102 312q181-18 436 1m-340 16q131-15 275-1"/>,
  <Leaf x={315} y={252} size={2.44} angle={-6} fill="#d2dda7"/>,
  <g className="lh-motion-pulse"><path fill="#bfdde0" d="M328 126q-6 24-28 52-23 37 6 51 41 19 58-10 19-34-36-93Z"/><path stroke={paper} strokeWidth="4" d="M316 178q-10 17-8 26m5 8 7 4"/><ellipse cx="232" cy="243" rx="12" ry="8" fill={blue}/><ellipse cx="398" cy="218" rx="10" ry="6" fill={blue}/></g>,
  <g className="lh-motion-blink"><Star x={379} y={160} size={.71}/><Star x={275} y={151} size={.42}/></g>,
 ],
};

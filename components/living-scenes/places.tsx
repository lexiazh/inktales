import type {ReactNode} from 'react';

const sage='#d5dfb4';
const gold='#e8d19a';
const blue='#d8e4e8';
const rose='#d6a28b';
const wood='#dfc6a0';
const paper='#f8f0dc';

function floor(){
 return <path opacity=".3" d="M100 332q90-6 185 0t253-1m-389 10q192-9 357 0"/>;
}

function figure(x:number,y:number,scale:number,coat:string){
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <circle cy="-59" r="22" fill={wood}/>
  <path d="M-21-62q1-26 24-23q18 2 21 19Q4-72-5-78q-4 13-16 16" fill={sage}/>
  <path d="M-7-59h1m15-1h1m-13 12q5 4 11 0"/>
  <path d="M-10-38q-18 8-19 40l3 14h52l3-15q-4-27-18-39q-10 8-21 0Z" fill={coat}/>
 </g>;
}

function cottage(x:number,y:number,scale:number,roof:string){
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <path d="M-61-79H61V0H-61Z" fill={paper}/><path d="m-77-77 74-56 80 56-7 11-73-49-66 49Z" fill={roof}/>
  <path d="M5 0v-49h30V0Z" fill={wood}/><path d="M-45-52h30v28h-30Zm15 0v28m-15-14h30" fill={blue}/>
 </g>;
}

function wheel(x:number,y:number,r:number){
 return <g transform={`translate(${x} ${y})`}><g className="lh-motion-spin">
  <circle r={r} fill="#777986"/><circle r={r*.56} fill={paper}/><path d={`M${-r*.5} 0H${r*.5}M0 ${-r*.5}V${r*.5}`}/>
 </g></g>;
}

function groveTree(x:number,y:number,scale:number){
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <path d="M-6 0v-69h12V0Z" fill={wood}/><g className="lh-motion-sway"><path d="M-45-57q-15-18 1-38q-5-26 22-32q19-27 41-6q32-4 36 26q20 23-2 46q-47 23-98 4Z" fill={sage}/><path d="M-27-88q16-13 32 1m10-22q16-7 28 4m-23 26q9-13 23-9" opacity=".55"/></g>
 </g>;
}

export const placesScenes: Record<string, ReactNode[]> = {
 家:[
  <g><path d="M133 327V112h374v214M133 305q189-11 374 0" strokeOpacity=".5"/><path d="M276 112v34m-15 18q0-20 15-20t16 20Z" fill={gold}/><path d="M157 303v-97h43v97m256-107h32v46h-32Z" fill={blue}/></g>,
  <g>{figure(229,257,.96,sage)}{figure(318,260,.72,rose)}{figure(402,254,1.08,blue)}<ellipse cx="318" cy="277" rx="136" ry="31" fill={wood}/><path d="m220 296-7 34m204-34 7 34"/></g>,
  <g><path d="M285 270q9 24 31 24t31-24Z" fill={paper}/><ellipse cx="316" cy="270" rx="31" ry="6" fill={sage}/><path className="lh-motion-steam" d="M306 253q9-12 0-18t2-18m17 35q9-11 2-18t4-14" opacity=".6"/><path d="M355 268q13-6 28 0m-130 6q-17-1-22 6" strokeOpacity=".55"/></g>,
 ],
 门:[
  <g>{floor()}<path fill={paper} d="M209 333V76h222v257h-19V94H228v239Z"/><path d="M197 332h248m-245-246h-41m43 21h-27m267 84h28m-28 19h40" opacity=".5"/></g>,
  <g><path fill={wood} d="M229 94h182v239H229Z"/><path fill={gold} d="M249 111h142v87H249Zm0 115h142v87H249Z"/><path d="M256 118v72h128m-128 45v70h128m-103-172q18-4 31 0m21 23q17 3 28-3m-76 99q39-4 66 4" opacity=".5"/><path d="M223 146h13v24h-13zm0 112h13v24h-13z" fill={blue}/></g>,
  <g className="lh-motion-tilt"><path d="M383 207h16v17h-16Z" fill={rose}/><path d="M384 216q-21-5-26 2q9 6 26 2Z" fill={gold}/></g>,
 ],
 窗:[
  <g><path d="M193 96h254v203H193Z" fill={blue}/><path d="M194 277q66-73 142-39t110-22v83H194Z" fill={sage}/><g className="lh-motion-drift"><path d="M229 153q5-14 21-11q12-27 35-9q21-6 28 14q16 12 1 19h-77q-21-1-8-13Z" fill={paper}/></g></g>,
  <g><path d="M193 96h254v203H193Zm14 14v175h226V110Z" fill={wood} fillRule="evenodd"/><path d="M191 96 136 115v193l57-9m254-203 58 18v194l-58-9" fill={gold}/><path d="M147 129v160m18-168v160m321-150v156m-18-165v158M181 297h279v14H181Z" opacity=".6"/></g>,
  <g className="lh-motion-sway"><path d="M364 309q-16-44 4-69m-4 52q-25-13-39-7q9 15 39 7m-2-16q25-15 40-7q-15 17-40 7" fill={sage}/><path d="M347 306h33l-6 30h-20Z" fill={rose}/></g>,
 ],
 房:[
  <g><path d="M138 298V104l151-34 212 48v182l-215 49Z" fill={paper}/><path d="M289 70v241m-151-13 151 13 212-11m-340 10 124 30 192-35" opacity=".4"/><path d="M350 118l99 22v82l-99-9Z" fill={blue}/><path d="m396 128 1 89"/></g>,
  <g><path fill={wood} d="M172 262l133-27 88 33-135 39Z"/><path d="M172 262v20l86 40 135-36v-18m-135 39v15m-84-34v13m211-8v14" fill={gold}/><path d="M176 250l126-22 85 31-128 34Z" fill={sage}/><path d="M188 250q23-21 54-10l39 12-63 14Z" fill={paper}/></g>,
  <g><path d="M427 249h50v45h-50Z" fill={wood}/><path d="M427 268h50m-30 9h11M451 249v-27m-18 1 7-19h24l7 19Z" fill={gold}/><path className="lh-motion-sway" d="M435 139l22 4-2 79-19-7q13-45-1-76Z" fill={rose}/></g>,
 ],
 屋:[
  <g>{floor()}<path fill={paper} d="M193 192h254v136H193Z"/><path fill={rose} d="m152 195 164-103 170 103-12 19-157-92-153 92Z"/><path d="m197 179 40 1m-12-17 40-1m91-23 23 27m-41-15 27 26m38-66h35v63l-35-20Z" fill={wood}/></g>,
  <g><path d="M293 328V240q28-28 57 0v88Z" fill={wood}/><circle cx="340" cy="282" r="3" fill={gold}/><path d="M214 225h51v49h-51Zm10 5v37m34-20h-39m154-22h53v49h-53Zm10 4v38m28-39v39m-35-21h47" fill={blue}/></g>,
  <g className="lh-motion-steam"><path d="M421 102q-15-14 9-23t-3-25m-14 42q-17-18 0-23" opacity=".6"/></g>,
 ],
 室:[
  <g><path d="M128 326l53-55V97h278v174l54 55Z" fill={paper}/><path d="M181 271h278m-289 28h302m-256-26-26 52m237-52 25 52" opacity=".45"/><path d="M224 133h185v85H224Z" fill={sage}/><path d="M232 208h161m-31 5h17M184 160h-29v81h29" opacity=".55"/></g>,
  <g fill={wood}><path d="M225 248h69l12 18h-94Zm121 0h69l12 18h-94Zm-142 35h87l13 23h-115Zm142 0h87l15 23H332Z"/><path d="M218 268v10m81-10v10m40-10v10m81-10v10m-220 29v13m94-13v13m43-13v13m101-13v13"/></g>,
  <g className="lh-motion-pulse" fill={gold} stroke="none"><path d="m154 171 29-1 167 97-58 1Zm0 32 29-1 196 118h-79Z" opacity=".32"/></g>,
 ],
 厅:[
  <g>{floor()}<path d="M130 304V113h384v193m-384-5q201-13 384 1" strokeOpacity=".42"/><path d="M345 129h125v119H345Zm63 0v119m-63-59h125" fill={blue}/><ellipse cx="331" cy="311" rx="160" ry="23" fill={sage}/></g>,
  <g><path d="M170 263v-55q0-29 29-29h170q27 0 27 28v54Z" fill={rose}/><path d="M190 226h188m-110-42v46"/><path d="M158 222q21-11 34 9v20h177v-20q11-20 34-10v60H158Z" fill={wood}/><path d="M176 281v14m207-14v14" strokeWidth="4"/><ellipse cx="348" cy="300" rx="76" ry="17" fill={gold}/><path d="m296 312-5 16m107-16 4 16"/></g>,
  <g className="lh-motion-sway"><path d="M458 127h28v112l-31-6q10-36 3-106Z" fill={sage}/><path d="M468 135q5 50-4 91m11-90q4 42-3 91" opacity=".5"/></g>,
 ],
 床:[
  <g>{floor()}<path fill={wood} d="M149 298V168q0-25 20-26h98q24 0 25 23v92l159 27v28h-24v-20l-155-22v54h-20v-58h-86v32Z"/><path fill={gold} d="M165 164q44-10 103 0v53H165Z"/><path d="M177 175v34m16-34v34m17-34v34m18-34v34m17-34v34" opacity=".5"/></g>,
  <g><path fill={paper} d="M157 225l107-17 208 50-121 48-194-38Z"/><path d="m157 225 196 51 119-18m-121 18v30" opacity=".55"/><path fill={blue} d="M178 221q19-17 55-9l38 13q-9 20-46 16Z"/></g>,
  <g className="lh-motion-sway"><path d="m267 230 202 29-116 46-109-22q7-25 23-53Z" fill={sage}/><path d="m272 238 178 25m-201 9 106 24m-48-54q-3 18-16 31m65-23q-9 24-21 33" opacity=".5"/></g>,
 ],
 桌:[
  <g>{floor()}<path fill={wood} d="M163 214l131-52 185 35-95 68Z"/><path fill={gold} d="M163 214v19l220 52 96-67v-21l-95 68Z"/><path d="m178 217 205 47m-101-86q67 4 118 22m-153 2q60 7 109 22m-87-29q69 4 120 22" opacity=".48"/></g>,
  <g><path fill={wood} d="m179 237 18 4-9 87-13 4Zm190 45 18 2-4 57-15 3Zm84-46 17-11 7 85-13 5Zm-182 22 17 4-1 51-12 3Z"/></g>,
  <g><path d="M301 217q20-11 37 0l-6 17h-24Z" fill={paper}/><path d="M337 218q18-8 15 3t-16 6"/><path className="lh-motion-steam" d="M314 208q8-7-1-12m14 12q8-8 0-16"/></g>,
 ],
 椅:[
  <g>{floor()}<path fill={wood} d="m230 113 14 2-10 221h-13Zm131 25 14 3-4 176-13 4Zm-67 109 13 3v93l-13-2Zm123-8 12-7 3 96-13 2Z"/></g>,
  <g fill={gold}><path d="M228 124l148 27v18l-148-28Zm-2 41 149 27v14l-149-27Z"/><path d="m226 225 144-17 66 32-134 32-76-34Z"/></g>,
  <g className="lh-motion-sway"><path d="M268 218q45-23 96-17q33 3 44 20q-12 22-101 36q-49-15-39-39Z" fill={rose}/><path d="M281 224q18 10 32 14l72-17" opacity=".45"/></g>,
 ],
 灯:[
  <g>{floor()}<ellipse cx="320" cy="319" rx="105" ry="19" fill={wood}/><path d="M308 315V198h24v116q-9 9-24 1Z" fill={gold}/><path d="M330 301q41-5 52 14q16 24 53 13"/></g>,
  <g><path d="m242 213 41-104q39-19 75 0l42 104Z" fill={gold}/><ellipse cx="321" cy="212" rx="79" ry="20" fill={paper}/><path d="M287 207q3-18 10-84m57 84q-2-17-9-84" opacity=".6"/></g>,
  <g className="lh-motion-pulse" stroke="#b48c57"><path fill="#ead89f" d="M273 224q47 16 94 0l34 56q-86 26-160 0Z" opacity=".3"/><path d="m222 169-28-8m223 8 28-8m-178-47-18-23m133 22 18-24m-80 3V68"/><circle cx="321" cy="216" r="12" fill={gold}/></g>,
 ],
 书:[
  <g>{floor()}<path d="M144 292l251-35 90 30-1 18-250 36-90-31Z" fill={wood}/><path d="m146 293 88 30 250-36m-251 36v18m-72-43 72 25" opacity=".5"/><path d="M178 261l249-30 58 20v20l-248 31-59-20Z" fill={sage}/><path d="m178 261 60 20 247-30"/></g>,
  <g><path d="M320 146q-74-36-155 0v106q82-23 155 7q77-30 156-7V146q-84-36-156 0Z" fill={paper}/><path d="M320 146v113m-132-95q61-21 109-1m-109 20q58-20 109-1m-109 19q63-17 109 1m-109 18q58-14 109 3" opacity=".58"/></g>,
  <g className="lh-motion-sway"><path d="M321 148q76-71 135-37q-22 80 14 134q-84-24-149 13Z" fill={paper}/><path d="M344 153q51-31 91-27m-91 45q41-23 80-19m-80 37q40-18 77-15m-77 35q43-17 83-12" opacity=".5"/></g>,
 ],
 笔:[
  <g>{floor()}<path d="m155 170 292-45 37 151-294 45Z" fill={paper}/><path d="m168 182 259-40m-239 168 280-42" opacity=".35"/></g>,
  <g transform="rotate(-33 314 200)"><g className="lh-motion-tilt"><path d="M165 189h268q29 14 0 28H165Z" fill={wood}/><path d="M155 189h46v28h-46Z" fill={gold}/><path d="M159 190q-24 2-44 15q21 15 44 11Z" fill="#717782"/><path d="M218 197h205" strokeOpacity=".45"/></g></g>,
  <g><path d="M187 282q104-15 183-39" strokeWidth="5"/><ellipse cx="420" cy="268" rx="38" ry="16" fill={wood}/><ellipse cx="420" cy="267" rx="28" ry="8" fill="#717782"/></g>,
 ],
 纸:[
  <g>{floor()}<path fill={sage} d="m158 165 308-22 20 160-303 29Z"/><path fill={blue} d="m146 153 300-48 35 171-297 50Z"/></g>,
  <g><path d="m166 133 285-22 22 140q-15 30-48 35l-245 20Z" fill={paper}/><path d="m185 151 242-20m-225 142 175-16" strokeOpacity=".3"/></g>,
  <g className="lh-motion-sway"><path fill={gold} d="M424 286q24-17 13-49q15 5 36 14q-16 28-49 35Z"/><path d="M433 276q12-8 15-21" opacity=".52"/></g>,
 ],
 包:[
  <g>{floor()}<path d="M209 272q-59 12-53-66q4-67 55-66m220 132q58 13 53-66q-4-67-56-66" strokeWidth="13"/><path d="M281 107q-8-39 36-39q45 0 41 39" strokeWidth="10"/></g>,
  <g><path d="M208 162q5-65 109-68q107-2 114 68l-9 134q-102 24-207 0Z" fill={sage}/><path d="M218 184q99 23 204-1m-188-30q12-45 82-44q63-1 88 42" strokeOpacity=".6"/><path d="M245 220q71-14 145 0v64q-74 17-145 0Z" fill={gold}/></g>,
  <g><path d="M247 233q72-11 143 0" strokeDasharray="2 4"/><path className="lh-motion-tilt" d="M335 233v14q-7 7-11-1v-13Z" fill={rose}/></g>,
 ],
 衣:[
  <g><path d="M318 127v-22q-27-9-13-29q14-19 36 1" strokeWidth="3"/><path d="M317 112 188 181h267Z" fill={wood}/></g>,
  <g className="lh-motion-sway"><path d="M273 141q47 31 94 0l103 50-43 77-41-20v74H255v-74l-41 20-43-77Z" fill={blue}/><path d="M273 142q15 42 46 43q36 0 49-43M255 248v-49m131 49v-49m-188-17 40 73m206-74-40 73m-143 53h117" opacity=".6"/></g>,
  <g><path d="m304 208 29-4 13 21-23 18-24-13Z" fill={rose}/><path d="m308 219 10 8 16-16" stroke={paper}/></g>,
 ],
 鞋:[
  <g>{floor()}<ellipse cx="316" cy="318" rx="179" ry="20" fill={wood} stroke="none" opacity=".33"/></g>,
  <g transform="translate(-36 -28)" opacity=".76"><path fill={blue} d="M159 273q38 4 78-22l55-62q32 18 84 6l9 79q-108 44-226 21Z"/><path d="m282 214 40 15m-55 3 37 15m-47 1 34 12m-129 25q110 16 220-12"/></g>,
  <g className="lh-motion-tilt"><path fill={rose} d="M221 292q40 4 79-22l54-62q31 18 84 6l10 79q-108 44-227 21Z"/><path fill={paper} d="M221 304q115 13 227-23v16q-111 42-227 23Z"/><path d="m344 233 40 15m-55 3 37 15m-47 1 34 12m11-41q-7-36 23-19q15 15-23 19q30-18 39 1q-4 17-39-1"/></g>,
 ],
 车:[
  <g>{floor()}<path d="M119 295h402m-400 36h401m-361-18h42m43 0h42m43 0h42m43 0h42" opacity=".35"/></g>,
  <g><path d="M156 247q-1-23 21-30l42-9l48-57q17-18 41-18h60q17 0 34 17l52 55 33 18q14 9 14 35v21H151v-32Z" fill={rose}/><path d="m246 207 42-50h41v50Zm99 0v-50h23q15 0 28 16l32 34Z" fill={blue}/><path d="M338 209v66m14-48h22m-203 17h38m267-10 17 12" strokeOpacity=".7"/></g>,
  <g>{wheel(226,276,31)}{wheel(430,276,31)}<path className="lh-motion-pulse" d="m499 246 45-12v28l-45-8Z" fill={gold} stroke="none" opacity=".55"/></g>,
 ],
 马:[
  <g><path d="M101 318q61-14 113-4m201 4q82-8 121 3m-397 19q166-7 367 0" opacity=".38"/><path d="M130 314q-11-24-17-24m17 25q11-24 19-22m337 22q-9-16-13-18m13 18q5-15 14-14" stroke="#87936f"/></g>,
  <g><path d="M204 177q64-33 148-2q15-40 41-67l26 1 36 59q15 17 1 27l-35 4-28-27-15 58q-70 43-160 3Z" fill={wood}/><path d="m385 117 3-36 16 26m7 1 16-28 3 47m-79 53q15-43 44-70q-6 40-21 71m50-24h1m23 23h4" fill={gold}/><path className="lh-motion-sway" d="M205 178q-49-14-62 52q11 22-4 45q34-12 33-42q4-25 36-24Z" fill={gold}/></g>,
  <g className="lh-motion-nod"><path d="M222 227l-8 71-18 17h32l24-61m44-12 5 66 31 8-15-24 9-53m22-1 20 48-11 27 30-17-6-57" fill={wood}/><path d="m197 313 27-1m85 0 20 4m35-9 20-11" strokeWidth="4"/></g>,
 ],
 路:[
  <g><path d="M283 94h53q40 85 209 235H88q169-147 195-235Z" fill={blue}/><path d="M288 96Q252 222 106 325m224-229q47 117 200 230" stroke={paper} strokeWidth="4"/></g>,
  <g className="lh-motion-flow"><path d="m312 104 0 24m3 15 6 39m9 26 17 48m12 26 19 43" stroke={paper} strokeWidth="5"/><path d="M167 290h18m268 9h22" strokeOpacity=".45"/></g>,
  <g><path d="M124 285v-90m-25 5 25-35 24 35Z" fill={gold}/><path d="m468 259 1-80m-24 1 24-34 24 34Z" fill={gold}/><path d="M163 197q-14-23-19-22m349 36q13-21 23-24" stroke="#84926f"/></g>,
 ],
 街:[
  <g><path d="M124 321l175-134h47l181 134Z" fill={blue}/><path d="m154 317 154-128m190 128L337 188m-16 20v16m0 12v19m0 15v33" stroke={paper} strokeWidth="3"/></g>,
  <g><path d="M112 296V105l70-18v161Zm70-48V87l86 42v56Z" fill={wood}/><path d="M374 185v-61l86-41v164Zm86 62V83l68 28v187Z" fill={sage}/><path d="m126 128 39-10v39l-39 18Zm0 74 39-16v34l-39 23Zm72-83 54 24v28l-54-20Zm192 18 55-25v41l-55 22Zm86-23 37 14v39l-37-13Zm0 67 37 22v44l-37-28Z" fill={blue}/></g>,
  <g><path d="M271 208v-83q-15-23-31-5m119 98v-88q17-24 35-4" strokeWidth="3"/><g className="lh-motion-pulse" fill={gold}><path d="M230 128q11-22 22 0Zm152 6q12-22 24 0Z"/></g><path d="m219 276 43-2-12 12-45 2Zm-26 19 49-1-12 12h-51Zm178-18h42l13 13h-44Zm18 20 47 1 15 11h-50Z" fill={paper} stroke="none"/></g>,
 ],
 桥:[
  <g><path d="M105 265q115-44 219-11q94 31 218 4v77H103Z" fill={blue}/><path className="lh-motion-flow" d="M138 296q44-8 82 0m26 27q62-12 115 0m25-30q52-8 112 0" stroke="#889baa"/></g>,
  <g><path d="M129 266q181-187 380 0l-1 26q-190-153-379 0Z" fill={wood}/><path d="M132 274q181-173 373-1m-331-29 14 18m22-46 18 22m20-42 12 24m26-36 5 26m27-33v29m31-25-3 27m36-18-11 27m45-10-13 22m44-1-15 17" opacity=".55"/></g>,
  <g><path d="M137 246q174-191 365-5m-329-14v-28m49-7v-31m50 12v-32m49 27v-34m49 39v-33m48 52v-30m49 60v-28" strokeWidth="3"/><path className="lh-motion-drift" d="M223 106q7-12 20-4q9-22 31-15q14-1 21 14q17-3 18 11H221Z" fill={paper} opacity=".68"/></g>,
 ],
 店:[
  <g>{floor()}<path d="M155 124h330v205H155Z" fill={paper}/><path d="M176 196h189v107H176Zm95 0v107m-95-23h189m19-85h81v134h-81Z" fill={blue}/></g>,
  <g><path d="M144 127h352l25 57q-13 18-32 7q-18 15-39 0q-24 16-47 0q-19 15-41 0q-20 15-41 0q-19 15-41 0q-21 15-42 0q-22 15-43 0q-16 15-37-1q-18 11-34-6Z" fill={rose}/><path d="m180 129-20 62m56-62-20 62m54-62-12 62m56-62-14 62m51-62-10 62m44-62-4 62m42-62v62m41-62 5 62m33-62 8 62" opacity=".6"/></g>,
  <g><path d="M187 278v-40h22v40m0-38h20v38m6 0 9-37 20 6-8 31m42 0v-42h23v42m6 0v-33h23v33" fill={sage}/><g className="lh-motion-sway"><path d="M454 206v18m18-18v18"/><path d="M442 224h40v26h-40Z" fill={gold}/><path d="M448 232q7-4 14 1q7-5 14-1v9q-7-5-14 0q-7-5-14 0Z" fill={paper}/></g></g>,
 ],
 市:[
  <g>{floor()}<path d="M134 278v-70h60v70m24 0V171h60v107m18 0V125h64v153m18 0V161h51v117m27 0v-76h62v76" fill={blue}/><path d="M242 190h15m-15 17h15m64-61h16m-16 24h16m-16 24h16m57-15h17m-17 20h17" opacity=".5"/></g>,
  <g><path d="M125 239h390l17 45H109Z" fill={gold}/><path d="M119 285v38m400-38v38m-399-2h399" strokeWidth="3"/><path d="M164 242l-9 39m48-39-8 39m54-39-5 39m50-39-2 39m49-39 2 39m43-39 5 39m37-39 8 39m34-39 12 39" stroke={paper} strokeWidth="6"/></g>,
  <g className="lh-motion-nod">{figure(192,318,.53,rose)}{figure(319,322,.5,sage)}{figure(438,318,.53,rose)}</g>,
 ],
 国:[
  <g>{floor()}<path d="M208 327q2-25 66-29q63 4 66 29Z" fill={wood}/><path d="M269 299v-29h10v29m-97-34 167-174" strokeWidth="4"/><path d="M175 261q78 80 157 2q73-74 9-156" stroke={wood} strokeWidth="8"/></g>,
  <g className="lh-motion-tilt"><circle cx="264" cy="181" r="106" fill={blue}/><path d="M171 154q33-47 78-61l22 26-18 27-32 2-13 32-30 1Zm131-63q42 18 58 61l-34 6-8 30-29-13-20 19-26-14 5-27 29-12Zm-30 119 30-15 18 21-10 44-36 18-15-31Zm53 11 34-30q1 24-16 48l-25 6Z" fill={sage}/><path d="M159 181h211m-181-71q64 42 147 3m-153 140q78-41 156-7m-75-172q-53 91 0 213m0-213q57 92 0 213" opacity=".3"/></g>,
  <g>{cottage(436,315,.87,rose)}<path d="M360 319q55-17 105 0" strokeOpacity=".42"/></g>,
 ],
 城:[
  <g>{floor()}<path d="M108 273v-45h17v14h20v-14h19v14h19v-14h18v47h239v-47h19v14h19v-14h18v14h20v-14h16v94H108Z" fill={wood}/><path d="M108 285h422m-402 20h92m185 0h104" opacity=".55"/></g>,
  <g><path d="M241 322v-99h158v99h-43v-40q0-40-36-40t-36 40v40Z" fill={gold}/><path d="M214 220q64-12 106-54q43 42 106 54l-14 14H228Z" fill={rose}/><path d="M269 198v-33h102v33m-113-34q36-11 61-38q29 27 62 38l-10 9H269Z" fill={rose}/><path d="M297 174h46v23h-46Z" fill={paper}/></g>,
  <g className="lh-motion-sway" fill={rose}><path d="M182 233v-61m274 60v-61"/><path d="M182 174q20-12 41-7l-6 30-35 4Zm274 0q24-10 42-3l-8 24-34 4Z"/></g>,
 ],
 村:[
  <g><path d="M95 278q65-81 155-59q75 22 116-8t174 51l-4 60H95Z" fill={sage}/><path d="M100 291q103-23 166 1m124-4q91 5 144-8m-431 28q82-14 158 0m127-4q92 8 147-8" stroke="#87946b"/><path d="M317 255q19 17-12 34q-40 23 8 45h58q-62-21-35-38q28-21-2-41Z" fill={paper}/></g>,
  <g>{cottage(182,267,.92,rose)}{cottage(315,235,.63,gold)}{cottage(443,271,.8,rose)}</g>,
  <g>{groveTree(123,275,.61)}{groveTree(502,269,.55)}<path className="lh-motion-drift" d="M325 123q9-9 18 0q9-9 18 0m12 10q7-7 14 0q7-7 14 0"/></g>,
 ],
 校:[
  <g>{floor()}<path d="M141 295V151h124v144Zm234 0V151h124v144Z" fill={wood}/><path d="M259 296V129h122v167Z" fill={paper}/><path d="m239 131 80-51 81 51Z" fill={rose}/><circle cx="320" cy="154" r="16" fill={gold}/><path d="M319 146v9l6 3m-17 139v-53h24v53"/></g>,
  <g fill={blue}><path d="M158 172h35v42h-35Zm52 0h36v42h-36Zm-52 61h35v42h-35Zm52 0h36v42h-36Zm186-61h35v42h-35Zm51 0h36v42h-36Zm-51 61h35v42h-35Zm51 0h36v42h-36Z"/><path d="M158 193h35m17 0h36m-88 60h35m17 0h36m150-60h35m16 0h36m-87 60h35m16 0h36" opacity=".55"/></g>,
  <g className="lh-motion-hop">{figure(278,325,.45,sage)}{figure(362,323,.46,rose)}<path d="m274 329-6 12m13-11 6 11m71-11-5 11m12-11 6 9" strokeWidth="3"/></g>,
 ],
 院:[
  <g>{floor()}<path d="M158 308V154h324v154Z" fill={paper}/><path d="M136 157h368l-15-34H151Z" fill={blue}/><path d="M279 308v-95h83v95" fill={wood}/></g>,
  <g><path fill={blue} d="M179 181h63v49h-63Zm0 65h63v43h-63Zm222-65h62v49h-62Zm0 65h62v43h-62Z"/><path d="M209 181v49m-30-25h63m-33 41v43m-30-22h63m191-86v49m-32-25h62m-30 41v43m-32-22h62" opacity=".58"/><circle cx="320" cy="184" r="26" fill={paper}/><path d="M313 165h14v12h12v13h-12v13h-14v-13h-12v-13h12Z" fill={rose}/></g>,
  <g><path fill={blue} d="M285 217h70v85h-70Z"/><path className="lh-motion-slide" d="M291 221h30v78h-30Zm31 0h28v78h-28Z" fill={paper}/><path d="M259 310h123v12H259Z" fill={gold}/></g>,
 ],
 站:[
  <g>{floor()}<path d="M130 286V149h165v137m-173-134 21-29h132l30 29Z" fill={blue}/><path d="M149 166h129v81H149Z" fill={paper}/><path d="M153 244h122v15H153Zm12 15v27m95-27v27" fill={wood}/><path d="M314 279V153" strokeWidth="4"/><circle cx="314" cy="145" r="22" fill={sage}/><path d="M302 137h24v13h-24Zm3 13v4m18-4v4"/></g>,
  <g className="lh-motion-slide"><path d="M337 276V216q0-17 17-17h141q20 0 20 18v59Z" fill={gold}/><path d="M352 212h112v28H352Zm121 0h29v49h-29Z" fill={blue}/><path d="M390 212v28m40-28v28m-88 12h124" opacity=".6"/>
  {wheel(370,276,17)}{wheel(481,276,17)}</g>,
  <g><path d="M137 294h389m-354 18h49m40 0h49m39 0h49m39 0h49" strokeOpacity=".45"/><path d="m140 294 2 17m13-17 2 17m13-17 2 17" stroke={paper} strokeWidth="3"/></g>,
 ],
 机:[
  <g>{floor()}<path d="M141 139h356v180H141Z" fill={blue}/><path d="M155 154h263v145H155Z" fill={paper}/><circle cx="458" cy="184" r="16" fill={rose}/><path d="M441 229h35m-35 15h35m-35 15h35m-326 57v18m340-18v18"/></g>,
  <g transform="translate(224 215)"><g className="lh-motion-spin"><path d="m-14-53 7 11h14l7-11 14 7 1 13 9 9 13-1 6 15-8 10 1 13 10 9-6 15-13 1-10 9-1 12-15 6-10-8-13-1-10 8-15-7v-13l-9-10-13-2-6-15 9-9v-14l-9-9 7-14 13 1 9-10v-13Z" fill={wood}/><circle r="24" fill={blue}/><path d="M-24 0h48M0-24v48"/></g></g>,
  <g transform="translate(346 237)"><g className="lh-motion-spin" style={{animationDirection:'reverse'}}><path d="M-9-40 9-40l4 9 9 5 10-2 9 16-7 8v10l6 8-10 16-10-2-8 5-4 9h-18l-4-10-9-5-10 2-9-16 7-7v-10l-6-9 9-15 10 2 9-5Z" fill={gold}/><circle r="17" fill={paper}/><path d="M-16 0h32M0-16v32"/></g></g>,
 ],
 场:[
  <g><path d="M105 247q69-43 118-30q39-30 113-17q86 0 199 47v82H105Z" fill={sage}/><path d="M116 217h133v29H116Z" fill={blue}/><path d="M131 215v-39h93v39m-65-2v-24h41v24" fill={paper}/><path d="M485 223v-53h18v53m-27-54h35v-23h-35Z" fill={wood}/></g>,
  <g><path d="m131 332 139-105h105l141 105Z" fill={blue}/><path d="m159 325 124-92m205 92-125-92" stroke={paper} strokeWidth="3"/><path d="M323 238v12m0 11v17m0 15v28" stroke={paper} strokeWidth="5"/></g>,
  <g><path className="lh-motion-slide" d="m273 131 41 7 37-30 9 2-20 33 50 10 27-9 7 3-19 19-70-2-35 23-11-1 19-25-45-10q-14-11 10-20Z" fill={paper}/><path className="lh-motion-blink" d="M185 308h7m30-24h6m28-23h5m187 47h7m-39-24h6m-38-23h5" stroke={gold} strokeWidth="4"/></g>,
 ],
 船:[
  <g><path d="M121 267q68-40 137-19q49 21 104 1t159 14v49q-83 32-185 20t-215-10Z" fill={blue}/><path className="lh-motion-flow" d="M143 285q30-10 55 0m9 29q45-8 95 0m51-16q39-10 83 0m13-31q24-5 45 0" stroke="#7d9bad"/></g>,
  <g className="lh-motion-tilt"><path d="M189 245q117 18 263-18q-29 67-92 73h-92q-53-10-79-55Z" fill={wood}/><path d="M209 259q101 19 221-14m-206 29q82 18 186-12m-162 24q64 9 123-3" opacity=".58"/><path d="M318 245V119" strokeWidth="3"/><path d="M318 126q22 52 79 89l-79 11Z" fill={paper}/><path d="M316 143q-30 55-68 83l68-2Z" fill={gold}/></g>,
  <g className="lh-motion-flow"><path d="M181 294q40-2 56 7m154 5q32-15 63-18m-23 23q35-11 62-11" opacity=".65"/></g>,
 ],
 港:[
  <g><path d="M106 235q200-24 428 10v85H106Z" fill={blue}/><path d="M111 228h396v39H111Z" fill={wood}/><path d="M123 266v25m42-25v25m48-25v25m45-25v25m45-25v25m45-25v25m45-25v25m45-25v25m45-25v25"/></g>,
  <g><path d="M161 227v-92h29v92m-38-96h182v15H152Z" fill={gold}/><path d="M174 133v-44l144 43m-138 15 88 78h-16l-72-60m15-23 26-36m-11 40 35-29m-12 28 38-22m-13 22 37-16"/><g className="lh-motion-rise"><path d="M319 142v47l-12 11m12-11 12 11"/><path d="M302 200h35v24h-35Z" fill={rose}/></g></g>,
  <g><path d="M259 267h265l-30 53H298Z" fill={rose}/><path d="M441 221h50v46h-50Z" fill={paper}/><path d="M447 232h36v14h-36Z" fill={blue}/><path d="M280 237h51v29h-51Zm54 0h48v29h-48Zm51 0h52v29h-52Z" fill={sage}/><path className="lh-motion-flow" d="M141 306q41-12 83 0m-54 17q36-5 80 0m252 3q21-4 35 0"/></g>,
 ],
 岛:[
  <g><path d="M108 221q97-43 228-18t193 55l-19 62q-103 27-234 17t-167-44Z" fill={blue}/><path className="lh-motion-flow" d="M127 277q31-7 54 2m25 32q46-11 93 2m75 5q55-9 105 0m-49-55q38-10 76 5"/></g>,
  <g><path d="M187 264q21-52 94-70q89-21 152 40l24 34q-45 47-134 43q-102 1-136-47Z" fill={gold}/><path d="M208 254q78-77 180-46q25 14 45 52q-104 54-225-6Z" fill={sage}/></g>,
  <g>{groveTree(274,243,.84)}{groveTree(359,249,.69)}<path className="lh-motion-drift" d="M400 123q9-9 18 0q9-9 18 0m17 21q7-7 14 0q7-7 14 0"/></g>,
 ],
 园:[
  <g><path d="M109 318q36-67 104-74t88 9q48-24 113-19q55 4 116 67l-13 29H116Z" fill={sage}/><path d="M244 330q35-32 97-45q35-11 16-33h24q43 21-5 42q-54 14-72 36Z" fill={paper}/>{groveTree(185,274,1.07)}{groveTree(452,265,.89)}</g>,
  <g><path d="M251 248h127v21H251Zm-5 27h136v12H246Z" fill={wood}/><path d="M253 287v24m119-24v24m-112-42v6m105-6v6" strokeWidth="4"/></g>,
  <g className="lh-motion-sway" fill={rose}><path d="M177 311v-29m-9 17 9 4 9-5m41 26v-27m-9 13 9 5 8-7m214 3v-30m-9 17 9 4 9-5"/><circle cx="177" cy="282" r="7"/><circle cx="227" cy="297" r="7"/><circle cx="449" cy="281" r="7"/></g>,
 ],
 公:[
  <g><path d="M111 304q76-69 208-70q127 0 211 70l-44 29H154Z" fill={paper}/><path d="M136 299h371m-349 17h321m-293-28-9 35m69-51-4 52m155-51 4 51m58-39 11 38" opacity=".36"/></g>,
  <g><ellipse cx="309" cy="281" rx="89" ry="21" fill={wood}/><path d="M231 265q78 16 155 0q-6 28-75 30q-69-1-80-30Z" fill={blue}/><path d="M296 267v-71h22v71Z" fill={wood}/><ellipse cx="307" cy="199" rx="36" ry="9" fill={gold}/><path className="lh-motion-flow" d="M307 194q-20-41-44 0m43 0q21-41 47 0m-55 15q-24 25-28 57m50-57q21 22 28 56" stroke="#83a4b5" strokeWidth="2.5"/></g>,
  <g>{figure(170,289,.65,sage)}{figure(422,290,.73,rose)}{figure(477,286,.62,blue)}<path d="M168 299v26m12-24v22m237-22v24m12-23v24m42-26v23m13-24v22" strokeWidth="3"/></g>,
 ],
 工:[
  <g>{floor()}<path d="M156 253h318v21H156Z" fill={wood}/><path d="M171 274h17v61h-17Zm273 0h17v61h-17Z" fill={gold}/><path d="M189 312h253v11H189Z" fill={wood}/></g>,
  <g>{figure(257,235,1.06,sage)}<path d="M280 202q36 0 48 24l-11 12-41-19" fill={wood}/><path d="M222 189q14-25 32-24t29 20l-61 5Z" fill={gold}/><path d="M352 231h72v19h-72Z" fill={wood}/></g>,
  <g transform="rotate(-19 330 223)"><g className="lh-motion-nod"><path d="M321 223v-72h14v72Z" fill={wood}/><path d="M301 140h59v23h-59Z" fill={blue}/></g></g>,
 ],
 厂:[
  <g>{floor()}<path d="M140 320V190l94-63v55l90-55v55l86-55v193Z" fill={wood}/><path d="M140 186l94-60v56l90-56v56l86-56v20l-89 57v-57l-89 57v-56l-92 60Z" fill={rose}/><path d="M421 320l9-183h38l9 183Z" fill={rose}/></g>,
  <g fill={blue}><path d="M164 222h55v47h-55Zm80 0h54v47h-54Zm79 0h54v47h-54Z"/><path d="M191 222v47m79-47v47m80-47v47" opacity=".54"/><path d="M271 320v-38h47v38" fill={gold}/></g>,
  <g className="lh-motion-steam"><path d="M439 129q-32-17-8-36q21-8 12-30q32 5 34 26q-4 10-15 16q15 7 2 24Z" fill={blue} opacity=".62"/><path d="M448 111q-12-17 9-29" opacity=".42"/></g>,
 ],
 楼:[
  <g>{floor()}<path d="M208 327V92h160v235Z" fill={wood}/><path d="m368 92 70 35v199h-70Z" fill={sage}/><path d="M197 90h173l74 37-5 13-72-37H197Z" fill={rose}/><path d="M275 327v-50h48v50" fill={blue}/></g>,
  <g fill={blue}><path d="M228 125h31v32h-31Zm56 0h31v32h-31Zm56 0h20v32h-20Zm-112 47h31v32h-31Zm56 0h31v32h-31Zm56 0h20v32h-20Zm-112 47h31v32h-31Zm56 0h31v32h-31Zm56 0h20v32h-20Z"/><path d="m387 144 31 15v29l-31-10Zm0 55 31 12v28l-31-8Zm0 54 31 7v29l-31-6Z"/></g>,
  <g className="lh-motion-blink" fill={gold}><path d="M284 125h31v32h-31Zm56 47h20v32h-20Zm-112 47h31v32h-31Z"/><path d="M299 125v32m41 31h20m-132 47h31" opacity=".55"/></g>,
 ],
 梯:[
  <g>{floor()}<path d="M134 327v-39h44v-34h44v-34h44v-33h44v-32h45v172Z" fill={wood}/><path d="M134 289l31-14h13m0-21 31-14h13m0-20 32-15h12m0-18 31-14h13m0-18 30-14h45v186h-30V155" fill={gold}/><path d="m154 308 176-133" opacity=".45"/></g>,
  <g><path d="m394 326 56-219m-19 219 54-218m-82 184 37 1m-27-39 37 1m-27-39 37 1m-28-39 38 1m-28-39 37 1" stroke={wood} strokeWidth="9"/><path d="m398 324 55-217m-18 217 53-216" strokeOpacity=".55"/></g>,
  <g className="lh-motion-rise"><path d="m198 226 74-62m-3 20 4-20-20 2" stroke={rose} strokeWidth="5"/></g>,
 ],
 墙:[
  <g>{floor()}<path d="M125 156h390v167H125Z" fill={rose}/><path d="M116 138h408v22H116Z" fill={wood}/><path d="M125 201h390m-390 42h390m-390 41h390m-330-124v41m110-41v41m110-41v41m-167 0v42m110-42v42m110-42v42m-273 0v41m110-41v41m110-41v41m-167 0v39m110-39v39m110-39v39" stroke={paper} strokeWidth="4"/></g>,
  <g strokeOpacity=".5"><path d="M151 176h22m44 47h10m31 47h27m28-97h35m14 49h11m52 79h29m-316 2h22m307-128h22"/></g>,
  <g className="lh-motion-sway"><path d="M432 326q-29-31-16-64q25-52 7-92m-5 102q-26-27-38-21q0 23 38 21m3-13q27-10 36-36q-31 2-36 36m8-36q-26-8-34-31q26 0 34 31m1-19q21-5 23-24q-19 2-23 24" fill={sage}/></g>,
 ],
 走:[
  <g><path d="M117 306q192-23 408 0v29H117Z" fill={wood} opacity=".52"/><path d="m140 319 67-3m178 5 52 3m-216 8 55-1m167-22 52 2" strokeOpacity=".5"/></g>,
  <g><path d="M283 152q27-13 51 6l16 61q-37 26-85 6l7-52Z" fill={sage}/><path d="M302 152q-14-38 13-53q27-13 44 12q4 20-17 39q-14 13-40 2Z" fill={wood}/><path d="M303 128q-7-23 16-32q25-8 37 13q-16 4-29 1q-11 16-24 18Z" fill="#84816f"/><path d="M347 123h1m-13 15 8-2m-57 29-28 41-29 12m107-48 32 33 32-9" strokeWidth="3"/></g>,
  <g><g className="lh-motion-tilt" style={{transformOrigin:'center top'}}><path d="M274 228l28 5-38 44-39 29h-29q-7-14 23-18l30-26Z" fill={blue}/><path d="M196 306h30" strokeWidth="5"/></g><g className="lh-motion-tilt" style={{transformOrigin:'center top',animationDirection:'alternate-reverse'}}><path d="m312 230 29-12 32 52 40 31q17 2 23 11l-29 8-55-35Z" fill={blue}/><path d="m406 319 31-8" strokeWidth="5"/></g></g>,
 ],
 跑:[
  <g><path d="M108 304q120-16 204-5q96 17 225-5v36H108Z" fill={rose} opacity=".55"/><path d="M123 322q116-15 201-3t195-2" stroke={paper} strokeWidth="3"/></g>,
  <g className="lh-motion-hop"><path d="M293 161q34-16 60 7l-35 68-64-12Z" fill={blue}/><path d="M345 160q-13-30 13-49q33-17 53 16q1 29-27 40q-21 6-39-7Z" fill={wood}/><path d="M347 137q-5-27 22-30q28-5 37 14q-18 11-43 6Z" fill="#84816f"/><path d="m302 178-33 18-39-17m113-2 41 23 24-31m-24-40h1" strokeWidth="5"/><path d="M272 219l34 13-47 39-57-32-28 16-12-8 37-34 54 26Zm42 12 56 5 40 44 27-1 9 14-43 10-52-45-44 1Z" fill={sage}/></g>,
  <g className="lh-motion-flow"><path d="m152 172 48-1m-69 17 43 1m-51 18 34 0m24 75 23-5m-43 8 7-2" strokeOpacity=".57"/></g>,
 ],
 来:[
  <g><path d="M115 326q106-17 170-112h61q68 98 181 112Z" fill={paper}/><path d="M129 322q98-20 141-90m103 0q58 70 142 92" strokeOpacity=".4"/></g>,
  <g>{figure(313,209,1.35,sage)}<path d="M286 225l28 2-8 83h-27Zm37 0 25-4 20 65-28 11Z" fill={blue}/><path d="M278 310q17-7 30 0l-2 17h-36Zm62-13q12-11 27-11l13 14-30 12Z" fill={wood}/></g>,
  <g className="lh-motion-tilt" style={{transformOrigin:'left bottom'}}><path d="M339 177q34 3 47-43l-1-29q4-13 12 0l7 23q6 39-20 69q-23 11-42 4Z" fill={wood}/><path d="m409 112 8-14m-3 30 16-2" strokeOpacity=".6"/></g>,
 ],
 去:[
  <g><path d="M103 321q70-61 179-107q29-13 49-45q14 31 57 55q89 55 148 99Z" fill={paper}/><path d="M133 312q101-75 171-101m50 0q68 34 155 101" strokeOpacity=".4"/>{groveTree(411,223,.63)}</g>,
  <g className="lh-motion-rise"><path d="M285 176q-4-32 27-34q28-2 32 31q-7 27-30 27q-24-2-29-24Z" fill="#938974"/><path d="M293 199q18 8 36 0q28 12 25 65h-78q-2-51 17-65Z" fill={sage}/><path d="M293 203q24-12 48 3v46q-26 11-47 0Z" fill={rose}/><path d="M278 263h73l-12 43-17-3-6-22-6 33-23-1Z" fill={blue}/><path d="M321 305h18l7 9h-25Zm-33 8h22l-5 11h-20Z" fill={wood}/></g>,
  <g className="lh-motion-fall" stroke="#a49172"><path d="M240 314q-10 0-14 5t12 2m19-29q-10 0-13 5t11 2" strokeWidth="3"/></g>,
 ],
 回:[
  <g><path d="M121 327q37-76 162-62t240-43v105Z" fill={sage}/><path d="M210 327q97-17 109-46q7-21 64-31h33q-72 20-67 36q6 24-51 41Z" fill={paper}/>{cottage(416,250,1.16,rose)}{groveTree(501,283,.6)}</g>,
  <g className="lh-motion-slide">{figure(266,271,.71,blue)}<path d="m255 281-18 25h-17m51-25 9 23 22 1" strokeWidth="5"/><path d="M244 265h-14v29h24v-23" fill={wood}/></g>,
  <g className="lh-motion-flow"><path d="M290 313q54-15 69-35m-16 4 16-4-4 16" stroke={rose} strokeWidth="3"/></g>,
 ],
 开:[
  <g>{floor()}<path d="M173 244h295v79H173Z" fill={wood}/><path d="M175 251l49-54h202l42 54Z" fill="#a78e76"/><path d="M180 261h278v49H180Zm0 15h278m-139 3v31" strokeOpacity=".53"/></g>,
  <g className="lh-motion-tilt" style={{transformOrigin:'center bottom'}}><path d="M224 199l-29-77q94-60 242-33l-11 110Z" fill={wood}/><path d="M228 181l-20-56q94-51 215-29l-9 86Z" fill={gold}/><path d="M271 153q47-35 101-15m-92 34q38-28 89-17" opacity=".6"/></g>,
  <g><path d="m207 232 33-38 33 25-27 26Zm96-5 26-43 34 39-32 23Zm58 0 30-29 35 23-12 25Z" fill={rose}/><circle className="lh-motion-hop" cx="293" cy="210" r="20" fill={blue}/><path d="M308 256h26v25h-26Z" fill={gold}/><circle cx="320" cy="267" r="3"/></g>,
 ],
 关:[
  <g><path d="M170 108h302v201H170Z" fill={blue}/><path d="M176 253q103-53 167-23t123-13v87H176Z" fill={sage}/><path d="M160 100h322v216H160Zm17 17v182h288V117Z" fill={wood} fillRule="evenodd"/></g>,
  <g><g className="lh-motion-stretch" style={{transformOrigin:'left center'}}><path d="M169 116h147v184H169Z" fill={gold}/><path d="M181 131h123v154H181Zm8 29h107m-107 27h107m-107 27h107m-107 27h107" opacity=".64"/><path d="M302 209v15" strokeWidth="4"/></g><g className="lh-motion-stretch" style={{transformOrigin:'right center'}}><path d="M326 116h145v184H326Z" fill={gold}/><path d="M337 131h123v154H337Zm8 29h107m-107 27h107m-107 27h107m-107 27h107" opacity=".64"/><path d="M340 209v15" strokeWidth="4"/></g></g>,
  <g><path d="M151 303h340v15H151Z" fill={wood}/><path d="M199 327h239" opacity=".32"/></g>,
 ],
 坐:[
  <g>{floor()}<path d="M260 326v-73h136v73h-15v-60H274v60Z" fill={wood}/><path d="M267 260V153h21v100h109v18H267Z" fill={gold}/><path d="M272 171h37v64h-37" fill={wood}/></g>,
  <g><path d="M289 249q-8-25 10-83q18-15 43-4l11 65q28 4 55 18l-13 26-53-7q-39 13-53-15Z" fill={sage}/><path d="M342 236q40-5 76 15l-3 63h-27l3-40-56-14Z" fill={blue}/><path d="M387 315h28l23 12q-1 7-10 8h-42Z" fill={wood}/><path d="m320 181 24 36 40 13" strokeWidth="4"/></g>,
  <g className="lh-motion-nod" style={{transformOrigin:'center bottom'}}><path d="M303 163q-15-19-8-44q14-30 46-12q15 9 17 30l-12 11q-7 25-43 15Z" fill={wood}/><path d="M295 134q-7-28 19-32q24-3 35 14q-15 11-36 6q-7 13-18 12Z" fill="#84816f"/><path d="M341 131h1m-13 16 8-1"/></g>,
 ],
};

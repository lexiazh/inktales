import type {ReactNode} from 'react';

const paper='#faf6ec';
const clay='#ddb09a';
const ochre='#ebcc91';
const leaf='#c9d49f';
const water='#c9dde0';
const earth='#cfb397';

function Steam({x=320,y=158,width=80}:{x?:number;y?:number;width?:number}){
 return <g transform={`translate(${x} ${y}) scale(${width/80})`}><path className="lh-motion-steam" stroke="#828e98" d="M-36 10q-11-12 0-24t1-23M0 9q-12-12 0-26t0-28m36 55q-10-13 0-25t2-19"/></g>;
}

function Grain({x,y,turn=0}:{x:number;y:number;turn?:number}){
 return <path transform={`translate(${x} ${y}) rotate(${turn})`} fill={ochre} d="M-13 0Q-6-9 4-7Q16-3 12 2Q3 9-9 5Z"/>;
}

function Vessel({color=water}:{color?:string}){
 return <g><path fill={color} d="M168 199Q184 299 289 315Q390 329 462 272Q478 241 480 198Z"/><ellipse cx="324" cy="199" rx="156" ry="31" fill={paper}/><path opacity=".5" d="M199 239q62 65 191 37m-164-15 26 22m162-46 23-9"/></g>;
}

function FlavorFace(){
 return <g><path fill="#e5c49f" d="M297 157q30-50 92-47q66 6 82 57q12 37-5 66l-18 22-2 35q-37 22-84 0l-5-26q-27-7-41-31q-28-9-24-25q2-10 17-12Z"/><path fill={earth} d="M297 171q-15-42 25-66q57-35 114 5q25 15 36 57q-49-4-68-33q-39 30-107 37Z"/><path d="M325 194q11-8 21-1m27 6q12-9 23 1m-52 23q14 5 20 0"/><path opacity=".5" d="M325 240q11 5 19 0"/></g>;
}

export const foodScenes: Record<string, ReactNode[]> = {
 米:[
  <g><path fill={earth} d="M213 268q-19-23-4-88q28-12 101-10q75 0 111 13q15 68-15 103q-40 35-155 20q-28-5-38-38Z"/><path opacity=".55" d="M221 208q24 10 51 10m-39 53 14 18m140-61-11 59"/></g>,
  <g><path fill={paper} d="M207 181q8-22 30-27q14 5 25 3q75-17 129-2q20 4 32 28q-45 19-114 17q-66 1-102-19Z"/><Grain x={247} y={171} turn={-12}/><Grain x={285} y={180} turn={18}/><Grain x={322} y={166} turn={-7}/><Grain x={364} y={176} turn={22}/><Grain x={397} y={164} turn={-23}/></g>,
  <g><g className="lh-motion-fall"><Grain x={302} y={101} turn={28}/><Grain x={336} y={119} turn={-40}/><Grain x={363} y={92} turn={-22}/></g><Grain x={431} y={302} turn={18}/><Grain x={466} y={314} turn={-20}/></g>,
 ],
 面:[
  <g><path fill={clay} d="M166 217q22 101 151 106q129 1 160-106Z"/><ellipse cx="321" cy="217" rx="155" ry="29" fill={paper}/></g>,
  <g><path fill="none" stroke={ochre} strokeWidth="8" d="M201 217q25-32 59-8t63-4q29-23 55-3t61 10m-216 10q20-13 41 1t45-3t52 0t54-1"/><path fill={earth} d="m253 157 228-79 4 8-221 82Zm18 16 235-67 2 8-226 68Z"/></g>,
  <g className="lh-motion-sway"><path fill="none" stroke={ochre} strokeWidth="7" d="M274 155q-16 15 3 27t4 35m10-68q-9 16 6 24t4 46m10-79q-8 15 8 26t2 44"/><path d="m233 197 15-6m125 14 16-5" stroke="#7d956a" strokeWidth="4"/></g>,
 ],
 饭:[
  <Vessel color={water}/>,
  <g><path fill={paper} d="M189 200q0-19 30-28q8-28 40-28q20-26 54-18q34-19 62 12q34-6 46 23q29 7 38 37q-40 24-138 24q-77-1-132-22Z"/><path opacity=".5" d="M233 190q10-7 20 0m7-26q10-8 21-1m19 26q11-10 24-1m9-32q12-5 23 2m16 22q13-8 25 0m13 15 11-3"/></g>,
  <Steam y={119}/>,
 ],
 菜:[
  <g><ellipse cx="320" cy="287" rx="162" ry="34" fill={water}/><path fill="#dbe0ae" d="M310 293q-69-21-97-84q-25-50 1-77q37-16 59 25q13-60 62-56q41 4 37 54q43-44 75-20q36 33-2 88q-48 60-135 70Z"/></g>,
  <g className="lh-motion-sway"><path fill={leaf} d="M309 282q-50-52-46-123q0-48 31-71q19 40 38 55q37 31 16 71q43-49 72-38q9 32-26 67q-35 35-85 39Z"/><path d="M313 279q-28-81-19-155m3 81-20-22m24 39 25-43m-8 98 77-69m-40 35 12-27"/></g>,
  <g><path fill="#dd977a" d="m196 234 36 19-21 23-33-22Zm239 10 23-20 25 18-23 21Z"/><path opacity=".55" d="M233 290q70 19 150 6"/></g>,
 ],
 茶:[
  <g><ellipse cx="318" cy="299" rx="152" ry="29" fill={ochre}/><path fill={water} d="M233 193h172q-3 73-37 91q-48 23-98-3q-31-17-37-88Z"/><path fill={water} d="M404 206q74-26 58 17q-8 26-68 25l6-13q43-4 46-16q1-11-44 0Z"/><ellipse cx="319" cy="193" rx="86" ry="18" fill="#cda36f"/></g>,
  <g><path fill={leaf} d="M299 194q-8-14 17-20q3 15-17 20Zm25 5q8-15 25-12q-4 15-25 12Zm-105 75q-36-24-45-8q10 21 45 8Zm-8 10q-34 0-36 17q26 8 36-17Z"/><path d="M205 281q15-2 29-5"/></g>,
  <Steam y={170}/>,
 ],
 奶:[
  <g><path fill={water} d="M250 138q13-29 27-40v-19h76v19q27 20 31 40l-7 155q-10 29-62 29q-51 0-59-29Z"/><rect x="274" y="71" width="82" height="23" rx="7" fill={clay}/><path fill={paper} d="M254 160q40 15 67 0t61 4l-6 127q-8 24-61 24q-49-1-59-23Z"/></g>,
  <g><path fill={paper} d="M403 217h64l-7 78q-25 19-48 0Z"/><ellipse cx="435" cy="217" rx="32" ry="8" fill={water}/><path d="M260 207h117m-115 55h115" opacity=".45"/></g>,
  <path className="lh-motion-pulse" fill={water} d="M307 227q10-15 12-26q21 23 18 34q-4 13-17 12q-17-1-13-20Z"/>,
 ],
 汤:[
  <g><path fill={earth} d="M182 219q-54-16-50 5q9 21 62 22m266-27q54-16 50 5q-9 21-62 22"/><Vessel color={clay}/><ellipse cx="324" cy="199" rx="139" ry="24" fill={ochre}/></g>,
  <g><path fill={leaf} d="m227 199 31-7 12 12-30 7Zm130-5 32-6 18 9-33 7Z"/><path fill="#d88e75" d="m281 191 26-4 13 12-23 7Zm50 17 20-4 11 8-17 7Z"/><path className="lh-motion-pulse" d="M209 199q56-13 86-9m84 19 43-9" opacity=".7"/></g>,
  <Steam y={165} width={115}/>,
 ],
 肉:[
  <g><ellipse cx="318" cy="274" rx="176" ry="45" fill={earth}/><path d="M171 277q112 43 269 8m-242 3 26 10m190-7 35-12" opacity=".5"/></g>,
  <g><path fill="#d59889" d="M207 231q-27-37 20-75q43-29 79-14q18 8 55-4q67-22 86 35q12 41-38 72q-43 27-111 27q-68-3-91-41Z"/><path fill="none" stroke={paper} strokeWidth="7" d="M239 172q38 34 74 15t76-9m-155 41q27-17 57 10t94-4m-75-72q8 11 15 13"/></g>,
  <g className="lh-motion-sway"><path fill={leaf} d="M407 253q27-43 70-33q-9 23-70 33Zm19-9q13-32 25-35q15 10-25 35Z"/><path d="m406 253 59-26"/></g>,
 ],
 鱼:[
  <g><path fill="none" opacity=".55" d="M139 281q47-11 99-4t106 0t153-3m-300 23q31-4 64 0m111 4q49-9 88-2"/><path fill={leaf} d="M179 288q-16-31-17-59q24 17 27 52q4-35 23-48q-1 32-18 51Z"/></g>,
  <g className="lh-motion-drift"><path fill={water} d="M210 199q47-57 111-58q54 0 99 48l45-34q-8 52 3 91l-49-27q-46 44-103 39q-70-2-106-59Z"/><path fill={clay} d="M299 145q28-44 81-27l-29 28m-31 73q18 8 29 30q-27 7-41-8"/><circle cx="251" cy="193" r="7" fill="currentColor"/><path d="M224 214q19 2 23 0m31-51q26 34 0 73m31-49q16 10 0 20m30-19q16 10 0 20m30-19q14 9 0 19"/></g>,
  <g className="lh-motion-rise"><circle cx="178" cy="176" r="7" fill={paper}/><circle cx="156" cy="145" r="11" fill={paper}/><circle cx="185" cy="115" r="6" fill={paper}/></g>,
 ],
 蛋:[
  <g><ellipse cx="321" cy="277" rx="154" ry="38" fill={earth}/><path fill={clay} d="M167 277q9 42 47 57q111 18 214-2q35-13 47-55q-87 30-308 0Z"/><path opacity=".6" d="m200 300 39 34m2-28 40 34m3-30 44 32m5-34 45 31m2-38 41 29m31-38-26 42m-20-34-29 40m-21-37-31 37m-23-36-28 31"/></g>,
  <g><path fill={paper} d="M209 263q-18-26 2-70q15-32 35-36q24 0 42 37q21 47-7 71q-31 25-72-2Z"/><path fill={ochre} d="M287 263q-21-26-2-81q17-45 42-48q28-1 51 42q25 53 0 85q-35 33-91 2Z"/></g>,
  <g className="lh-motion-tilt"><path fill={paper} d="M369 267q-10-20 2-46q14-30 27-35q24-5 41 29q20 42-4 56q-32 23-66-4Z"/><path opacity=".45" d="M383 221q5-17 13-22"/></g>,
 ],
 瓜:[
  <g><path fill={leaf} d="M163 235q-18-44 21-78q53-39 128-28q52 7 70 54q22 70-46 108q-86 36-159-8q-10-9-14-48Z"/><path d="M222 145q-69 86-2 150m51-164q-47 78-8 173m51-172q10 64-9 174m48-153q20 73-9 134m-119-143q-25-33-43-12q-12 17 12 20" stroke="#87976c" strokeWidth="4"/></g>,
  <g className="lh-motion-tilt"><path fill={leaf} d="m280 249 178-70q40 58-11 108q-71 68-167-38Z"/><path fill="#e1a08e" d="m293 247 161-61q31 52-15 88q-58 56-146-27Z"/><path strokeWidth="5" d="m337 248 4 3m28-10 3 7m29-20 3 6m22-25 5 5m-44 57 1 4m29-25 3 4"/></g>,
 ],
 果:[
  <g><path fill={earth} d="M165 230q16 70 64 88q88 27 176 4q58-13 74-92Z"/><path fill={ochre} d="M165 230q5-25 155-31q147 5 159 31q-19 30-157 34q-142-5-157-34Z"/><path opacity=".65" d="m192 257 54 67m-3-56 45 63m-5-60 46 65m1-66 40 59m13-65 28 50m41-56-62 64m15-48-58 54m12-50-54 50m8-52-47 49m2-57-35 38"/></g>,
  <g><path fill={clay} d="M204 224q-23-38 7-59q27-17 46-4q20-14 43-1q24 16 4 63q-17 32-45 16q-27 19-55-15Z"/><path fill={ochre} d="M308 231q-25-26 3-59q18-18 17-40q24-22 44-4q-1 27 18 45q32 33 10 59q-27 30-92-1Z"/><path d="M257 164q-4-18 9-28m82-13 2-22"/></g>,
  <g className="lh-motion-sway"><path fill={leaf} d="M352 118q11-29 48-30q-9 29-48 30Zm-94 39q-36 4-47-19q23-7 47 19Zm105 70q22-29 57-23q-9 25-57 23Z"/><path fill="#e1aa77" d="M404 230q-4-28 23-40q34-15 52 15q11 34-30 47q-33 9-45-22Z"/></g>,
 ],
 豆:[
  <g><path fill={leaf} d="M166 226q65-121 244-80q45 14 67-8q-4 97-109 128q-117 28-202-40Z"/><path fill="#e2e6ba" d="M180 223q65-81 206-67q49 8 75-7q-11 62-98 80q-99 26-183-6Z"/><path d="M465 148q9-23 29-26m-296 107q88 43 225-33"/></g>,
  <g><circle cx="234" cy="206" r="20" fill={leaf}/><circle cx="285" cy="192" r="24" fill={leaf}/><circle cx="343" cy="188" r="24" fill={leaf}/><circle cx="399" cy="181" r="19" fill={leaf}/></g>,
  <g><circle className="lh-motion-hop" cx="383" cy="295" r="17" fill={leaf}/><circle cx="432" cy="286" r="13" fill={leaf}/></g>,
 ],
 糖:[
  <g><path fill={water} d="M159 219q108-65 284 0l27 73q-172 36-339 0Z"/><path fill={paper} d="M184 219l92-18 73 22-89 22Z"/><path fill="#e2dcce" d="M184 219l76 26 0 54-76-25Z"/><path fill={paper} d="M260 245l89-22v54l-89 22Z"/></g>,
  <g><path fill={paper} d="M291 177l66-22 70 24-68 22Z"/><path fill="#e2dcce" d="M291 177l68 24v63l-68-26Z"/><path fill={paper} d="M359 201l68-22v63l-68 22Z"/><path opacity=".45" d="m305 191 6 2m14 5 5 2m54 25 7-1m-157 30 7 3"/></g>,
  <path className="lh-motion-pulse" fill="none" stroke="#b69a69" d="m459 124 4 15 15 4-15 4-4 15-4-15-15-4 15-4Zm-225 28 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"/>,
 ],
 盐:[
  <g><path fill={water} d="M255 187h121l14 113q-17 26-74 26q-56-1-75-26Z"/><path fill={paper} d="M251 239q72 19 129-3l9 65q-21 21-73 21q-51-1-74-21Z"/><path fill={earth} d="M252 188l7-24q5-24 57-25q52 1 58 25l6 24q-58 14-128 0Z"/><ellipse cx="316" cy="162" rx="57" ry="18" fill={ochre}/><path d="m286 161 3 1m18 4 3 1m10-9 3 1m16 7 3 1m-10-12 3 1"/></g>,
  <g className="lh-motion-fall" fill={paper}><path d="m352 114 6-9 6 9-6 7Zm40 8 5-7 5 7-5 6Zm-96-18 6-8 6 8-6 7Zm26-16 5-7 5 7-5 6Z"/></g>,
  <path opacity=".6" d="m291 273 8 4m30 4 10-5m-31 16 4 3m54-18 4-1"/>,
 ],
 油:[
  <g><path fill={ochre} d="M241 211q7-24 28-51l18-23v-28h60v28l18 23q23 31 28 51v85q-22 28-78 28q-55 0-74-28Z"/><path fill={earth} d="M283 102q2-18 34-19q29 1 32 19v16h-66Z"/><path fill={paper} d="M244 215q79 20 146 0v63q-70 23-146 0Z"/></g>,
  <g><path fill={leaf} d="M280 249q33-32 70-16q-21 32-70 16Z"/><path d="m283 249 55-13"/><ellipse cx="328" cy="253" rx="15" ry="11" fill={leaf}/></g>,
  <path className="lh-motion-fall" fill={ochre} d="M434 210q-10 23-22 40q-20 30 5 44q17 9 32-7q13-17-15-77Z"/>,
 ],
 酸:[
  <g><path fill={ochre} d="M161 223q-3-41 56-63q23-26 54-5q40 4 27 43q3 37-56 57q-29 23-50 5q-28-4-31-37Z"/><path fill={leaf} d="M246 151q-19-36-51-35q9 31 51 35Zm2-2q12-43 53-47q-6 38-53 47Z"/></g>,
  <FlavorFace/>,
  <g className="lh-motion-pulse"><path fill={clay} d="M316 218q-9-12-4-19q7-4 12 8q-6-1-5 9Z"/><path stroke="#b17664" d="m278 192-20-10m18 27-29 0m35 19-20 11"/></g>,
 ],
 甜:[
  <g><ellipse cx="255" cy="293" rx="114" ry="35" fill={water}/><path fill={clay} d="M184 225h142l-18 73q-51 23-108 0Z"/><path fill={paper} d="M177 226q-10-23 15-31q-7-27 24-28q5-27 37-31q37 1 40 30q34 1 30 24q28 14 13 37q-74 35-159-1Z"/><path opacity=".55" d="m212 251 11 46m29-40v47m32-49-6 45m-86-105q58 24 130-5m-105-22q38 12 76-2"/></g>,
  <g className="lh-motion-tilt"><path fill={earth} d="M384 99h88q10 10 0 20h-88q-8-10 0-20Z"/><path fill={ochre} d="M410 116q-31-1-42 23q-7 18 0 35q11 26 43 23q30-3 32-36q0-34-33-45Z"/><path d="M372 135q30 10 64 3m-68 14q35 10 74 2m-71 14q32 10 67 2m-60 15q23 6 53 1"/></g>,
  <path className="lh-motion-fall" fill={ochre} d="M405 189q-17 41-18 62q2 24 19 24q25-2 13-30Z"/>,
 ],
 苦:[
  <g><path fill={leaf} d="M164 237q-26-25-9-51q42-21 70-58q32-31 56-9q20 22-5 60q-53 69-89 65Z"/><path opacity=".65" d="m163 211 12-1m5-14 16-1m-3 19 16-2m-3-32 15-1m-3 23 16-4m-4-34 16-2m-4 22 13-6m-2-26 11-2"/></g>,
  <FlavorFace/>,
  <g className="lh-motion-nod"><path d="M337 201q16 5 20 18m-11 14q12-11 22 0" strokeWidth="4"/><path stroke="#829375" d="M265 235q13 14 27 5m-16 22 15-11"/></g>,
 ],
 辣:[
  <g><path fill="#cf796a" d="M165 253q68 27 135-72q28-46 73-32q30 10 11 46q-27 72-106 94q-61 14-113-36Z"/><path fill={leaf} d="M369 154q8-41 50-47l3 14q-30 8-35 42Z"/><path stroke={paper} strokeWidth="5" opacity=".75" d="M199 267q79 20 133-51"/></g>,
  <g className="lh-motion-rise" fill={ochre}><path d="M442 232q-23-25-5-55q4 19 16 26q9-25-5-54q41 28 39 60q-3 41-45 23Z"/><path fill={clay} d="M455 227q-9-15 9-34q20 27-9 34Z"/></g>,
  <path className="lh-motion-pulse" d="m427 152-11-13m74 18 11-18m8 54 21-2" stroke="#b17664"/>,
 ],
 香:[
  <g><path fill={earth} d="M213 239q100-68 215 3l-16 51q-103 32-194-2Z"/><ellipse cx="320" cy="242" rx="108" ry="28" fill={ochre}/><path fill={leaf} d="M250 234q37-28 68 3q-38 20-68-3Zm66 6q23-34 63-19q-14 27-63 19Zm-1 3q41 2 39 27q-30 5-39-27Z"/><path d="M266 231q39 11 50 11t53-17"/></g>,
  <g className="lh-motion-rise" stroke="#879775"><path d="M260 198q-29-24 10-46t10-41m40 89q-42-29 1-55t8-44m52 97q-34-25 11-51t14-38"/></g>,
  <g className="lh-motion-pulse" fill={ochre}><path d="m217 126 5 9 9 4-9 4-5 10-4-10-10-4 10-4Zm204-41 4 8 9 4-9 4-4 9-4-9-9-4 9-4Z"/></g>,
 ],
 饱:[
  <g><circle cx="320" cy="133" r="49" fill="#e5c49f"/><path fill={leaf} d="M177 289q31-101 142-97q102-2 143 94q-44 45-142 43q-101 0-143-40Z"/><path d="M285 131q9-10 19 0m28 0q9-10 19 0m-46 21q17 15 35-2"/></g>,
  <g className="lh-motion-pulse"><ellipse cx="320" cy="266" rx="66" ry="42" fill="#dbe0ae"/><path fill="#e5c49f" d="M209 249q29 34 72 32l13 20q-52 13-89-24Zm222-1q-27 34-72 33l-13 20q52 13 89-24Z"/></g>,
  <path d="M180 166q-33-8-47 8m20 17q14-12 31-10m276-11q39-7 50 8" stroke="#b69a69"/>,
 ],
 饿:[
  <g><path fill={paper} d="M167 226q140-60 306 0q9 41-28 66q-112 44-247 2q-34-23-31-68Z"/><ellipse cx="320" cy="228" rx="153" ry="47" fill={water}/><ellipse cx="320" cy="228" rx="110" ry="30" fill={paper}/></g>,
  <g className="lh-motion-pulse" stroke="#9d836b"><path d="m275 172 14-28 14 23 16-45 17 38 14-16 10 22"/><path opacity=".55" d="m227 151-18-15m-6 37-19-3m241-14 14-17m8 34 20-8"/></g>,
  <g><path d="M173 153q-31 57-34 147m331-147q30 57 37 147"/><path d="m162 172-15-23m20 16-7-27m15 22-2-22m302 34 15-23m-20 16 7-27m-15 22 2-22"/></g>,
 ],
 吃:[
  <FlavorFace/>,
  <g><path fill={clay} d="M192 277q-24-31 0-59q19-23 47-8q8 35 39 44q2 25-17 36q-40 23-69-13Z"/><path fill={leaf} d="M213 212q-19-37-43-26q11 22 43 26Zm9-1q17-25 42-19q-13 24-42 19Z"/></g>,
  <g className="lh-motion-nod"><path fill="#ae7d73" d="M312 225q13-14 29-3q-9 19-29 3Z"/><path fill={clay} d="m266 239 12-12 12 9-13 9Z"/><path d="m272 219 17-6m-3 32 11-5" opacity=".55"/></g>,
 ],
 喝:[
  <FlavorFace/>,
  <g><path fill={water} d="M165 229l93-14-3 86q-38 24-73 3Z"/><ellipse cx="211" cy="222" rx="46" ry="10" transform="rotate(-8 211 222)" fill={paper}/><path stroke="#82a7b0" d="m195 266 9 25m-2-51 5 10"/></g>,
  <g className="lh-motion-flow"><path stroke="#a77466" strokeWidth="6" d="m224 226 32-43 59 37"/><path opacity=".6" d="M283 175q-11-16-25-16m44 15-7-21m-47 125 5-27"/></g>,
 ],
 煮:[
  <g><path fill={earth} d="M168 237q-43-17-41 3q5 19 58 26m276-29q43-17 41 3q-5 19-58 26"/><path fill={water} d="M174 212h286q-13 95-51 111q-89 28-181 0q-39-15-54-111Z"/><ellipse cx="317" cy="212" rx="143" ry="32" fill="#a6c3cc"/><path opacity=".55" d="M208 257q18 39 56 55m-35-11 10 4"/></g>,
  <g className="lh-motion-pulse" fill={paper}><circle cx="238" cy="209" r="11"/><circle cx="279" cy="217" r="6"/><circle cx="319" cy="194" r="14"/><circle cx="367" cy="208" r="8"/><circle cx="403" cy="209" r="12"/></g>,
  <Steam y={165} width={143}/>,
 ],
 炒:[
  <g><path fill="#a6aeb0" d="M154 224q72 0 268-25q-34 107-154 118q-87 7-114-93Z"/><path fill={earth} d="m420 211 104-48 9 18-117 55Z"/><path d="M184 265q38 42 96 35" opacity=".55"/></g>,
  <g><path fill={leaf} d="M196 220q16-26 45-28q18 12 0 31m21-7q14-25 33-27q21 7 13 21m33-1q11-22 39-25q20 7 7 22"/><path fill={clay} d="m248 189 18 9-10 19-21-3Zm69 9 20-14 17 10-12 18Z"/></g>,
  <g className="lh-motion-hop"><path fill={leaf} d="M215 161q-13-40 23-46q22 27-23 46Z"/><path fill={clay} d="m293 142 18-19 21 14-14 18Z"/><path fill={ochre} d="m369 132 10-19 23 10-8 21Z"/><path d="M198 166q-15-19-15-32m171-16 8-23m61 56 19-12"/></g>,
 ],
 烧:[
  <g><path fill={earth} d="m194 290 207-62 25 24-200 74Zm14-57 219 55-24 35-215-63Z"/><path opacity=".6" d="m228 256 95 25m-67 22 113-33m-29 31 33 8"/></g>,
  <g className="lh-motion-pulse"><path fill={clay} d="M270 275q-63-45-12-125q-3 29 20 42q47-43 38-88q59 30 66 84q21-16 25-45q49 84-9 130q-53 39-128 2Z"/><path fill={ochre} d="M303 274q-29-31 10-68q-2 28 17 27q24-16 28-41q49 76-4 90q-30 8-51-8Z"/></g>,
  <path className="lh-motion-rise" fill={ochre} d="m244 132 6-14 6 14-6 8Zm145-21 6-13 5 13-5 10Zm24 19 8-11 2 13-6 6Z"/>,
 ],
 烤:[
  <g><rect x="175" y="126" width="292" height="200" rx="19" fill={clay}/><rect x="202" y="171" width="238" height="125" rx="9" fill="#afa9a2"/><path d="M218 276h204m-195-14h188m-212-107h104"/><circle cx="374" cy="151" r="8" fill={paper}/><circle cx="408" cy="151" r="8" fill={paper}/></g>,
  <g><path fill={ochre} d="M241 258q0-28 25-41q46-24 91-2q25 14 37 43q-71 19-153 0Z"/><path d="m276 222 13 16m15-25 13 17m17-15 13 17" stroke="#9d755e" strokeWidth="3"/></g>,
  <g className="lh-motion-pulse" stroke="#d68d67"><path d="M221 192q10-11 21 0t21 0t21 0t21 0t21 0t21 0t21 0t21 0t21 0" strokeWidth="4"/></g>,
 ],
 蒸:[
  <g><path fill={earth} d="M178 214h286v84q-16 32-145 32q-113-1-141-33Z"/><ellipse cx="321" cy="213" rx="143" ry="32" fill={ochre}/><path opacity=".65" d="M181 258q134 44 280 0m-276 25q136 40 271 1m-240-4 3 20m37-10 3 22m46-15 1 24m48-25-1 22m49-30-3 21m34-30-4 20"/></g>,
  <g><path fill={paper} d="M211 212q0-24 22-31q8-18 28-16q15 1 23 17q21 6 23 29q-47 21-96 1Zm121 2q1-24 25-31q12-19 31-16q15 2 23 17q20 7 21 29q-46 21-100 1Z"/><path d="m259 167-6 19m5-19 12 21m116-19-5 17m6-17 12 21"/></g>,
  <Steam y={144} width={133}/>,
 ],
 碗:[
  <Vessel color={water}/>,
  <g><path stroke="#869b7d" d="M195 231q128 56 257 0m-233 33q92 42 194 4"/><path fill={leaf} d="M278 265q2-29 22-27q10 16-22 27Zm42 7q11-26 34-18q1 18-34 18Zm52-6q7-27 27-27q8 18-27 27Z"/></g>,
  <path className="lh-motion-pulse" stroke="#b49a75" d="m192 119 4 14 14 4-14 4-4 14-4-14-14-4 14-4Zm251 6 3 9 10 3-10 4-3 9-3-9-9-4 9-3Z"/>,
 ],
 杯:[
  <g><path fill={ochre} d="M226 133h146q46 8 45 51q0 40-47 58l-11-25q34-13 34-36q-1-21-31-22Z"/><path fill={clay} d="M206 132h164l-11 147q-13 39-72 38q-60-1-70-36Z"/><ellipse cx="288" cy="132" rx="82" ry="21" fill={paper}/></g>,
  <g className="lh-motion-pulse"><path stroke={paper} strokeWidth="5" d="M235 193q9 31 14 70m5 14 6 12"/><ellipse cx="287" cy="135" rx="65" ry="13" fill="#c5a586"/><path stroke={paper} d="M244 135q19-5 51-5"/></g>,
  <path opacity=".6" d="M190 331q101 15 200-2m-145 16q43 4 84 0"/>,
 ],
 盘:[
  <g><path fill={water} d="M145 243q3 18 33 34q133 63 283 0q25-13 34-33Z"/><ellipse cx="320" cy="243" rx="175" ry="60" fill={paper}/><ellipse cx="320" cy="242" rx="130" ry="42" fill="#ebedd9"/></g>,
  <g className="lh-motion-pulse" stroke="#899b7c"><path d="m163 236 23 8m16-34 18 10m16-29 8 13m33-18 6 15m37-17v15m39-11-5 15m40-8-10 13m43 6-15 11m48 10-23 7m17 20-18-4m-33 24-7-10m-49 14v-8m-59 5 3-11m-58-1 12-8"/></g>,
  <path opacity=".45" d="M243 245q72 23 151 2"/>,
 ],
 筷:[
  <g><path fill={water} d="M254 256q44-17 132 0l8 33q-69 25-149 0Z"/><ellipse cx="320" cy="254" rx="65" ry="12" fill={paper}/><path fill={leaf} d="M300 253q21-21 41-5q-17 16-41 5Z"/></g>,
  <g className="lh-motion-tilt"><path fill={earth} d="M177 299 451 90q16-2 15 11L184 309q-8 0-7-10Zm26 10 280-187q15-3 13 10L211 319q-7 2-8-10Z"/><path stroke={clay} strokeWidth="5" d="m403 131 28-21m-6 53 28-18"/></g>,
  <path d="M151 312q-7 11-4 20m48 2q35 6 57 0m157-230 14-18" opacity=".55"/>,
 ],
 勺:[
  <g><path fill={water} d="M293 246q-16-38 23-61q28-17 53-4q37-26 102-83q20-13 31-4q13 10-5 29q-78 57-109 88q6 30-21 52q-50 30-74-17Z"/><path opacity=".6" d="M302 240q30 25 64-11m44-40 74-62"/></g>,
  <g><path fill={ochre} d="M296 237q36-26 82-21q8 26-15 43q-40 18-67-22Z"/><path d="M308 238q28-17 58-14" opacity=".55"/></g>,
  <path className="lh-motion-fall" fill={ochre} d="M309 271q1 12-11 22q-10 13 1 20q17 5 19-8q1-9-9-34Z"/>,
 ],
 刀:[
  <g><path fill={earth} d="M172 190q125-22 286 3l38 75q-169 53-329 7Z"/><path d="M174 261q122 43 298 5m-271-27 32 5m166-31 39 5" opacity=".55"/></g>,
  <g className="lh-motion-tilt"><path fill={water} d="M159 209q29-71 112-102l102 51q-93 83-214 51Z"/><path fill={earth} d="m350 152 111-79q20-13 32 2q12 14-7 27l-115 76Z"/><path stroke={paper} strokeWidth="4" d="M175 200q102 18 180-46"/></g>,
  <g fill={clay}><path d="m293 248 30-25 27 20-30 25Zm40 13 31-25 27 19-33 25Z"/><path d="M414 242q36-21 57-9l-20 24-39 4Z" fill={leaf}/></g>,
 ],
 餐:[
  <g><path fill="#e7d7bc" d="M134 171q175-65 374 0l28 130q-210 55-430 0Z"/><path opacity=".45" d="m145 187 346-1m-355 83 366-5m-302-97-11 141m263-143 10 141"/><ellipse cx="318" cy="224" rx="114" ry="60" fill={paper}/></g>,
  <g><path fill={leaf} d="M246 224q-8-39 25-40q31 3 29 39q-26 30-54 1Z"/><path fill={ochre} d="M293 230q15-38 44-25q35 2 34 33q-39 34-78-8Z"/><path fill={clay} d="M353 198q38-20 58 10q-13 30-46 16Z"/><path d="m260 208 21 16m44 5 26 4"/></g>,
  <g className="lh-motion-tilt"><path fill={water} d="M161 192q-20 37-1 40l-4 61h11l4-59q21-5 12-42m-10 1-2 28m-8-28-2 28m307-27q-20 39 1 47l3 55h13l-5-103Z"/></g>,
 ],
 饼:[
  <g><ellipse cx="320" cy="280" rx="156" ry="48" fill={water}/><path fill={earth} d="M198 265q-1 44 126 53q94-2 119-44v-30Z"/><ellipse cx="320" cy="244" rx="124" ry="47" fill={ochre}/></g>,
  <g className="lh-motion-tilt"><path fill="#e8c886" d="M224 219q-10-45 97-58q101 0 110 44q-45 53-165 37q-30-7-42-23Z"/><path opacity=".55" d="m257 213 25-14m11 23 29-22m4 22 31-23m6 21 25-16m-89-15 11-7m39 1 9-4"/></g>,
  <Steam x={322} y={141} width={60}/>,
 ],
 鸡:[
  <g><path fill={ochre} d="M223 252q-36-39-45-96q39 10 69 58q-17-56-4-91q30 28 31 86q41-25 91-23q58-1 65 41q8 65-90 76q-86 15-117-51Z"/><path fill={clay} d="M283 233q25-37 81-25q-11 55-72 50Z"/><path d="M290 303l-10 23m60-23 11 22m-93 4 44-3m27 2 39-1"/></g>,
  <g className="lh-motion-nod"><path fill={ochre} d="M364 204q-2-61 40-80q44-12 54 28q10 54-45 81Z"/><path fill="#ce8978" d="M390 129q-11-25 6-29q12 0 13 14q0-25 14-22q10 3 8 24q15-14 20-3q3 13-14 22Z"/><path fill={clay} d="m451 155 33 17-36 10Z"/><circle cx="426" cy="154" r="5" fill="currentColor"/></g>,
  <path d="m143 324 11-13m8 17 20-14m240 14 11-13m7 12 13-5" opacity=".55"/>,
 ],
 鸭:[
  <g><path fill={water} d="M127 274q67-41 148-13t230-1q17 33-47 48q-203 27-331-34Z"/><path className="lh-motion-flow" d="M151 286q42 14 115 12m121 3q60-2 100-18m-260 38q87 13 193-2" opacity=".65"/></g>,
  <g><path fill={paper} d="M185 239q35-4 45 2q-22-22-26-44q52 12 94 44q46 4 66-30q-31-31-3-65q23-27 63-18q28 6 37 36q16 48-35 74q-18 54-100 59q-117 8-141-58Z"/><path fill={leaf} d="M262 255q46-15 111-9q-29 35-67 35q-27-2-44-26Z"/><circle cx="428" cy="162" r="5" fill="currentColor"/></g>,
  <path className="lh-motion-nod" fill={ochre} d="M456 171q25 12 59 8q-5 23-52 21l-11-7Z"/>,
 ],
 牛:[
  <g><path fill={paper} d="M185 180q77-48 194-8l44 42q9 46-30 64l-4 50h-24l-7-45h-97l-9 46h-22l-5-58q-43-10-40-91Z"/><path fill="#b4a39b" d="M212 170q32-20 58-15q15 38-16 71q-26 15-55-10Zm91-13q46 0 68 13q3 44-38 49q-31-14-30-62Z"/><path d="M194 187q-45 21-43 69q-15 10-18 20"/></g>,
  <g className="lh-motion-nod"><path fill={paper} d="M348 170q-9-34-43-51q35-18 60 21q43-13 82 3q23-42 61-20q-43 25-42 46q24 74-51 89q-80-5-67-88Z"/><path fill={clay} d="M364 214q49-20 98 0q4 40-47 44q-48-5-51-44Z"/><path strokeWidth="5" d="m382 180 1 1m62 0 1 1m-52 49 1 0m34-1 1 0"/></g>,
  <path fill={leaf} d="m119 322 19-19 0 25 19-10-1 14m285-2 17-18 5 18 15-9"/>,
 ],
 羊:[
  <g><path fill={earth} d="m211 255 24 13-2 57-20 3Zm65 17 25 9-1 48-21-1Zm77 0 27-1 10 56-23 3Z"/><path fill={paper} d="M180 207q-4-33 26-38q-3-27 28-32q13-26 39-13q32-26 60-1q26-14 45 12q34-1 36 32q36 17 25 43q3 34-38 37q-4 39-46 29q-32 26-59 3q-41 18-61-10q-33 8-43-23q-23-14-12-39Z"/><path d="M223 196q6-23 20-18m31-19q16-15 30 0m20 85q16 13 32-1m-96-14q17 14 31 2" opacity=".55"/></g>,
  <g className="lh-motion-nod"><path fill={earth} d="M385 176q-29-24-48-3q10 26 49 27m59-24q28-22 49-3q-13 27-44 27"/><path fill={paper} d="M378 166q22-30 44-27q27 3 37 35q10 67-36 78q-42-7-45-86Z"/><path d="m398 192 1 0m36-1 1 0m-29 32 12 8 10-9" strokeWidth="4"/></g>,
  <path fill={leaf} d="m139 322 15-19 7 22 14-11 2 15m276-2 15-20 3 21 20-13"/>,
 ],
 猪:[
  <g><path fill={clay} d="M168 224q12-86 107-92q86-7 133 46l18 70q-14 30-51 37l-4 39h-26l-6-35h-80l-6 36h-27l-4-42q-53-17-54-59Z"/><path d="M171 211q-50 18-39-18q6-18 20-4q7 18-16 19"/><path opacity=".45" d="M220 172q29-19 73-17"/></g>,
  <g className="lh-motion-nod"><path fill="#e6b9a8" d="M348 168q-9-49 21-55q20 8 32 38q21-6 46 6q19-42 40-24q10 18-12 48q26 22 11 62q-18 41-69 39q-60-2-66-59Z"/><ellipse cx="435" cy="222" rx="51" ry="26" fill="#d89588"/><path strokeWidth="5" d="m406 185 1 1m46-1 1 1m-33 36 2 4m24-4 2 4"/></g>,
  <path d="M132 320q36-6 63-2m235 13q37-4 70-15" opacity=".55"/>,
 ],
 虾:[
  <g><path fill={water} d="M119 271q158-27 264-8t128 3q-95 60-258 57q-92-1-134-52Z"/><path className="lh-motion-flow" opacity=".55" d="M141 282q57-12 123-3m106 24q63-1 92-12"/></g>,
  <g className="lh-motion-sway"><path fill={clay} d="M188 194q54-62 141-57q86 6 100 64q21 75-58 79q-35-1-67-21q43 3 59-15q19-26-7-46q-31-28-85-8q-57 32-83 4Z"/><path fill={clay} d="M308 254q-38-26-59-10q12 17 34 23q-29 8-24 23q34 6 57-26Z"/><path d="M258 147q-8 22 9 46m27-56q-12 18 1 46m38-43q-15 19-5 44m40-33q-14 14-12 47m40-29q-14 13-25 41m47-15q-23 2-46 27m51 9q-21-8-49 4m29 29q-10-10-37-14"/><circle cx="229" cy="179" r="6" fill="currentColor"/></g>,
  <path className="lh-motion-sway" d="M214 170q-35-62-78-42m70 49q-47-46-78-26"/>,
 ],
 蟹:[
  <g><path fill={earth} d="M152 277q91-21 182-8t151 3q-8 45-159 48q-120 2-174-43Z"/><path className="lh-motion-flow" d="M173 305q80 11 158 9m49-2q60-2 86-13" opacity=".55"/></g>,
  <g><path fill={clay} d="M228 236q16-53 90-56q75 3 94 52q10 66-92 66q-99 0-92-62Z"/><path d="m236 244-43 7-30 31m81-17-37 16-14 25m70-28-30 20-4 17m174-72 40 8 29 30m-77-16 38 15 13 25m-68-28 31 18 6 19m-134-127-9-35m75 36 9-35"/><circle cx="270" cy="151" r="10" fill={paper}/><circle cx="357" cy="151" r="10" fill={paper}/><path d="M300 258q20 14 41 0"/></g>,
  <g className="lh-motion-tilt" fill={clay}><path d="M237 230q-32-22-54-49q-53 2-53-52q-1-22 18-31l17 44 28-38q22 21 13 61l49 57Zm167 0q32-22 54-49q53 2 53-52q1-22-18-31l-17 44-28-38q-22 21-13 61l-49 57Z"/></g>,
 ],
 桃:[
  <g><path fill={leaf} d="M333 140q-60 13-99-38q53-20 99 38Zm-1-1q32-61 86-45q-19 51-86 45Z"/><path d="M327 160q-1-23 17-44m-18 23-67-28m77 27 58-32"/></g>,
  <g className="lh-motion-tilt"><path fill="#e3ab9b" d="M319 155q-44-30-91 5q-32 34-10 91q25 52 92 67q16 4 29-9q72-36 83-91q8-52-30-66q-39-16-73 3Z"/><path fill="none" stroke="#b78076" d="M320 159q-24 52 5 120q8 13 7 26m-80-125q-27 28-14 56" strokeWidth="3"/></g>,
  <path opacity=".55" d="M172 327q149 26 299-4m-195 13q35 5 82 0"/>,
 ],
 梨:[
  <g><path fill={leaf} d="M318 113q-12-43-50-36q8 33 50 36Zm5-2q29-40 67-29q-14 35-67 29Z"/><path fill={earth} d="M310 133q-1-21 16-40l10 5q-14 20-10 33Z"/></g>,
  <g className="lh-motion-tilt"><path fill="#ddd49a" d="M279 154q8-32 39-30q34 0 45 41q6 41 41 64q35 24 20 63q-19 46-101 44q-76 0-106-33q-26-34 18-79q31-29 44-70Z"/><path d="M282 194q-16 37-35 47m4 25-1 2m25 27 1 1m90-13 1 1m14-30 1 1" opacity=".55"/></g>,
 ],
 苹:[
  <g><path fill={leaf} d="M310 142q-11-44-65-42q17 46 65 42Zm6-2q16-52 68-48q-9 44-68 48Z"/><path d="M310 167q-3-23 19-45" strokeWidth="6"/></g>,
  <g className="lh-motion-tilt"><path fill="#cf8f7f" d="M310 167q-61-42-109 3q-30 44-3 99q33 64 82 49q29-13 53 0q43 11 73-45q31-68 5-96q-36-46-101-10Z"/><path opacity=".75" stroke={paper} strokeWidth="5" d="M242 178q-26 10-32 35m-4 11-1 11"/></g>,
  <path opacity=".55" d="M171 325q146 26 295-3"/>,
 ],
 橙:[
  <g><path fill="#dfa874" d="M172 209q-14-49 30-83q58-40 110 0q43 37 26 91q-18 64-83 62q-66 2-83-70Z"/><path fill={leaf} d="M251 120q-4-42-48-52q-2 42 48 52Zm3-4q27-42 68-35q-14 32-68 35Z"/><path d="m190 178 2 1m14-23 2 1m-13 46 2 1m17 34 2 1m88-78 1 1m11 26 1 1" opacity=".65"/></g>,
  <g className="lh-motion-tilt"><circle cx="379" cy="232" r="91" fill="#dfa874"/><circle cx="379" cy="232" r="78" fill={ochre}/><path stroke={paper} strokeWidth="4" d="M379 155v154m-78-77h156m-135-55 110 110m-111-3 110-108"/><circle cx="379" cy="232" r="9" fill={paper}/></g>,
 ],
 饺:[
  <g><ellipse cx="320" cy="280" rx="161" ry="49" fill={water}/><ellipse cx="320" cy="275" rx="128" ry="35" fill={paper}/></g>,
  <g><path fill={ochre} d="M188 258q17-66 64-82q58 8 77 78q-49 55-141 4Zm118 17q14-57 71-80q47 16 70 64q-46 61-141 16Z"/><path d="m206 223 15 14m-1-27 13 15m1-30 10 19m8-31 5 22m15-22-1 22m16-13-7 21m21-7-9 17m42 17 12 9m0-23 12 13m1-25 8 16m10-28 2 18m13-15-3 19m16-9-7 18m21-4-10 15"/></g>,
  <Steam x={292} y={146} width={91}/>,
 ],
};

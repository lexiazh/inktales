import type {ReactNode} from 'react';

const paper='#faf6ec', blue='#d5e3e8', green='#d7dfb6', rose='#dda898', gold='#ebd59c', skin='#e9c9a3', hair='#aaa8b2';
const path=(d:string,fill='none')=><path d={d} fill={fill}/>;
const dot=(cx:number,cy:number,r:number,fill='currentColor')=><circle cx={cx} cy={cy} r={r} fill={fill}/>;
const at=(x:number,y:number,art:ReactNode,scale=1)=><g transform={`translate(${x} ${y}) scale(${scale})`}>{art}</g>;
const move=(name:string,art:ReactNode)=><g className={`lh-motion-${name}`}>{art}</g>;
const line=(x:number,y:number,text:string,size=27)=><text x={x} y={y} fill="currentColor" stroke="none" textAnchor="middle" fontFamily="var(--serif, Georgia)" fontSize={size}>{text}</text>;
const oval=(cx:number,cy:number,rx:number,ry:number,fill=paper)=><ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill}/>;
const ground=<path opacity=".3" d="M102 325q92-13 211-1t221-2m-377 12q168-5 327 0"/>;
const backdrop=(fill:string)=><path fill={fill} opacity=".65" stroke="none" d="M111 276C77 174 182 87 296 96C382 65 503 106 525 190C565 257 495 321 354 313C237 342 116 322 111 276Z"/>;
const spark=(x:number,y:number)=>at(x,y,path('M-9 0H9M0-9V9'));
const waves=(x:number,y:number)=>at(x,y,path('M0-13q15 13 0 26m13-34q25 21 0 42m13-50q36 29 0 58'));
const heart=path('M0 35C-112-29-34-89 0-48C37-88 111-25 0 35Z',rose);
const bubble=path('M-84-31q0-27 33-29H54q36 2 36 30v27q0 29-34 30H-29l-38 24 10-24q-27-3-27-28Z',paper);
const eye=path('M-68 0Q-1-61 68 0Q-1 63-68 0Z',paper);
const iris=<g>{dot(0,0,21,blue)}{dot(0,0,10)}{dot(-5,-6,3,paper)}</g>;
const closedEye=path('M-38 0q20-20 40-2m20 2q20-20 40-2');
const ear=path('M-24 53C-51 32-64-13-42-45C-23-72 29-68 44-39C65 4 25 18 19 42C14 66-7 68-24 53Z',skin);
const tear=path('M0-22q-25 31-13 44q14 12 27-2Q22 9 0-22Z',blue);
const tooth=path('M-56-60C-22-91-7-59 0-67C17-89 48-84 59-59C76-12 40 62 18 69C-4 75 15 23 0 13C-14 12-15 76-34 67C-48 60-76-20-56-60Z',paper);
const openBook=<g>{path('M0 35q-43-26-93-12v-68q52-15 93 5q42-20 93-5v68q-52-14-93 12Z',paper)}{path('M0-40v74m-76-61q33-8 61 1m-61 13q33-8 61 2m31-16q27-9 61-1m-61 15q28-9 61-1')}</g>;
const flower=<g>{path('M0 40V0m0 31q-27-28-32-16q3 17 32 16m0-7q23-26 31-16q0 16-31 16')}{path('M0-13q-25-28-35-4q-8 17 23 24q-8 31 12 28q23-2 16-28q31-5 20-26Q23-41 0-13Z',rose)}{dot(1,1,7,gold)}</g>;
const cup=<g>{path('M-35-20h70v29Q32 31 0 32Q-33 31-35 9Z',blue)}{path('M35-10h11q17 1 11 18q-8 10-24 6')}{oval(0,-20,35,8,paper)}</g>;
const scarf=path('M-26-57q26 12 51 1l-1 14q-28 8-52-3Zm39 14 19 33 17-9-28-29Z',rose);
const cap=path('M-34-90q25-30 54-6q13 9 13 24l-67-2Zm-7 17q39-6 76-3q24 4 9 11l-83-2Z',blue);
const curls=path('M-30-70c-17-9-9-31 8-29c-3-19 22-22 33-10c17-12 38 0 34 16c18 6 13 31-5 37l-7-25q-26 19-63 11Z',hair);
const longHair=path('M-34-61q-19-33 11-48q42-22 63 20q13 24 3 63l-15 9q6-29-1-58q-26 12-55 1l3 55-18-9Z',hair);
const waveArm=path('M31-35q30-6 40-43m-34 53q32-8 41-45m-7-7q2-14 10-17q10 7-3 24',skin);

function person(x:number,y:number,scale:number,shirt:string,detail:ReactNode=null,action:ReactNode=null){
 return at(x,y,<g>
  {path('M-26-46q25-15 52 0q19 24 17 67q-40 16-86 0q0-45 17-67Z',shirt)}
  {path('M-27-81q1-31 27-31q31 1 32 29q1 35-29 38q-29-1-30-36Z',skin)}
  {path('M-26-86q10-25 24-24q19 12 32 21m-43 12h1m25 0h1m-19 14q8 6 16 0')}
  {path('M-29 27-34 58h22l7-30m13 0 5 31h23l-8-33m-72-61-17 36m97-34 16 29')}
  {detail}{action}
 </g>,scale);
}

const table=path('M139 256h362v28H139Zm19 28v39m324-39v39',gold);
const frame=path('M168 110h304v210H168Zm12 13h280v183H180Z',gold);
const sound=path('M-19 28h9v-48l29-8v10l-19 6v37q-7 15-23 8-7-4 4-5Z',blue);
const pennant=path('M0 36v-76l70 4-24 24-46-1',rose);
const ball=<g>{dot(0,0,27,gold)}{path('M-24-10q22 1 43 24M-3-26q-17 32-8 49m28-40q-16 1-41 15')}</g>;
const kite=<g>{path('M-33-1 0-40 32-1 0 39Z',rose)}{path('M0-39v77m-30-39h60M0 39q16 11 10 29t15 23m-15-35 12-4m-12 13-9 1')}</g>;
const baby=<g>{path('M-55-11q12-41 53-43q41 2 54 47l-19 63q-29 50-73 4Z',blue)}{oval(0,-10,37,34,skin)}{path('M-7-41q-16-16 1-20q9-1 9 9m-24 37q6-7 12 0m15 0q6-7 12 0m-25 18q7 7 15 0m-53 14 62 28m-60-4 31 16m53-35-39 19')}</g>;
const toyBoat=<g>{path('M-58 5h113l-21 27h-70Z',gold)}{path('M0 5v-67l41 58H0',blue)}{path('M-6-49-40-4h34')}</g>;

export const peopleScenes:Record<string,ReactNode[]>={
 目:[
  backdrop(green),
  at(320,203,<g transform="scale(2.05)">{eye}{path('M-65-12q66-63 130 0')}</g>),
  at(320,203,move('blink',<g transform="scale(1.68)">{iris}</g>)),
 ],
 耳:[
  backdrop(blue),
  at(315,201,<g transform="scale(1.7)">{ear}{path('M-25 22q-29-37-5-57q18-21 40-4q21 18-3 36q-18 13-17 28m-6 13q-4 13 9 13')}</g>),
  move('pulse',waves(421,183)),
 ],
 手:[
  backdrop(rose),
  path('M241 320q-8-41-33-76l-31-38q-12-22 9-30q17-4 47 24l-3-92q-1-21 16-23q17 1 20 20l13 72l2-105q1-19 19-19q16 3 17 21l4 105l22-91q6-20 23-14q16 6 12 25l-11 92l20-38q12-20 26-8q9 8 1 29l-30 91q-15 44-56 56Z',skin),
  path('M228 217q41-17 79 17m-46-34q44-12 84 3m-89 22q26 14 30 46'),
  move('pulse',<>{spark(434,114)}{spark(465,157)}{spark(187,127)}</>),
 ],
 足:[
  path('M102 308q109-57 239-61t195-111' ),
  at(259,230,path('M-31 55q-23-24-5-53q15-15 15-40q1-29 30-27q29 2 22 39q-5 18-13 31Q18 28 7 48q-12 23-38 7Z',skin),1.1),
  move('hop',at(379,159,<g transform="rotate(23)">{path('M-23 57q-28-13-17-48q17-35 10-45q1-29 26-31q34-1 27 31q-11 22-8 46q0 27-19 42Z',skin)}{dot(-20,-77,10,skin)}{dot(-2,-79,7,skin)}{dot(12,-77,5,skin)}</g>)),
 ],
 头:[
  backdrop(gold),
  path('M183 323q21-66 114-78h49q83 14 112 78Z',blue),
  at(321,192,move('nod',<>{oval(0,0,81,88,skin)}{path('M-82-12q-9-54 18-75q53-52 110-9q44 29 30 87q-20-20-28-53q-69 32-111 11Z',hair)}{path('M-43 12h1m65 0h1m-38 16-4 19 12 1m-21 17q21 13 39 0')}</>)),
 ],
 心:[
  path('M115 207h91l22-36 24 64 30-75 28 47h211'),
  at(320,213,move('pulse',heart),1.45),
  <g opacity=".65">{spark(205,130)}{spark(416,120)}{spark(435,268)}</g>,
 ],
 身:[
  backdrop(blue),
  at(320,184,<g>{oval(0,-77,38,42,skin)}{path('M-23-37q-25 11-39 39l-38 35 9 15 62-25-15 69h88L30 26l62 26 9-15-38-35q-13-28-39-39Z',green)}{path('M-30 97-35 140h24L0 99l13 41h24L29 97')}</g>,.93),
  <g opacity=".65">{path('M320 78v259m-127-117h253m-136 113h20')}{move('pulse',oval(321,209,57,83,'none'))}</g>,
 ],
 牙:[
  backdrop(blue),
  at(320,203,tooth,1.5),
  move('pulse',<>{spark(205,128)}{spark(429,145)}{spark(456,192)}</>),
 ],
 舌:[
  oval(320,194,148,100,rose),
  <g>{path('M181 183q126-85 277 0q-19 112-135 112q-121 0-142-112Z','#a27488')}{path('M185 184q115-66 272 0l-14 15q-107-38-245-3Z',paper)}</g>,
  move('nod',path('M262 226q56-31 116 0v39q-5 54-57 52q-54-2-59-53Zm59-6v59',rose)),
 ],
 鼻:[
  backdrop(rose),
  path('M253 102q34 30 19 79q-12 37-37 60q-7 36 46 31q34 30 82 0q41 7 46-14q3-22-33-61q-15-34 4-92',skin),
  path('M262 253q26-15 48 8m30 0q19-25 42-12m-45-89 11 35'),
  move('steam',<>{path('M173 246q-20-32 18-54t17-51')}{at(158,277,flower,.62)}</>),
 ],
 脸:[
  backdrop(gold),
  oval(320,198,100,109,skin),
  <g>{path('M222 163q-12-65 55-84q70-22 127 42q17 22 14 44l-37-35q-65 38-143 13Z',hair)}{at(307,176,closedEye)}{path('M322 188l-13 30 15 2m-30 22q25 25 51 0')}</g>,
  move('pulse',<g opacity=".7">{oval(260,224,20,11,rose)}{oval(379,224,20,11,rose)}</g>),
 ],
 眼:[
  path('M120 293q197 22 401-1m-278 0 11 13h132l11-13'),
  <g>{at(250,200,eye,1.12)}{at(405,200,eye,1.12)}{path('M180 135q71-36 123 1m27-1q62-41 124-4')}</g>,
  move('slide',<>{at(247,200,iris,.9)}{at(402,200,iris,.9)}</>),
 ],
 发:[
  at(320,213,<>{oval(0,0,85,82,skin)}{path('M-30 14h1m48 0h1m-27 27q10 12 28 0')}</>,1.13),
  move('sway',path('M232 250q-44-61-15-120q37-82 123-59q74 13 91 102q11 52-36 133q-8 11-21 13q37-85 8-140q-16-12-20-46q-35 44-111 32q-9 49-19 85Z',hair)),
  path('M243 148q35-66 101-64m59 80q24 53 0 98m-179-90q0-44 20-61'),
 ],
 毛:[
  path('M113 285q184-49 416-4l-12 38H127Z',gold),
  <g>{path('M147 289q17-35 29-66m-4 66q23-53 53-79m-19 72q10-26 22-46m-5 50q25-64 54-96m-18 87q19-39 36-54m-3 52q28-68 57-94m-18 96q22-47 45-67m-7 67q36-61 56-66m-17 68q29-43 59-57m-14 61q26-27 47-34')}</g>,
  move('sway',path('M169 270q23-76 61-103m31 100q29-76 68-102m30 106q43-82 73-91m-8 97q39-59 70-62')),
 ],
 皮:[
  path('M145 174q79-29 166-10t183-5v132q-87 23-188 5t-161 4Z',skin),
  path('M145 174q79-29 166-10t183-5v42q-93 20-186 2t-163 4Z',rose),
  move('pulse',<g>{oval(320,181,100,27,'none')}{path('M165 245q51-17 102-4m39 11q86 16 164-1m-270-72 2 8m20-10 2 8m23-10 2 8m24-8 2 8m31-3 2 8')}</g>),
 ],
 血:[
  backdrop(rose),
  at(318,200,<g transform="scale(2.8)">{path('M0-37q-30 44-30 56q0 28 30 30q31-2 31-30q0-18-31-56Z','#c98279')}</g>),
  move('pulse',path('M271 224q-8 19 10 39','#f3d1b9')),
 ],
 骨:[
  backdrop(blue),
  at(320,214,move('tilt',path('M-119-32q-12-25-29-13q-25 17 2 37q-23 21-9 40q17 23 38-9q119-23 232 0q23 32 41 9q13-19-8-40q25-20 1-37q-20-12-32 13q-115 22-236 0Z',paper))),
  path('M200 208q110-17 239-3'),
 ],
 男:[
  backdrop(blue),
  person(288,237,1.12,blue,cap,move('sway',waveArm)),
  at(437,207,<>{dot(0,0,30,'none')}{path('M22-22l39-39m-30 0h30v30')}</>),
 ],
 女:[
  backdrop(rose),
  person(288,232,1.14,green,longHair,move('sway',waveArm)),
  at(439,184,<>{dot(0,0,29,'none')}{path('M0 29v65m-20-31h40')}</>),
 ],
 子:[backdrop(green),at(320,211,move('nod',baby),1.4),<>{spark(193,190)}{spark(430,136)}{spark(442,231)}</>],
 孩:[ground,person(276,254,.91,gold,cap),at(418,245,move('hop',ball),1.2),path('M390 317q26-10 57 0')],
 父:[
  frame,
  <>{person(283,236,1,blue,scarf)}{person(384,268,.53,gold,cap)}</>,
  move('pulse',<>{line(320,98,'father')}{spark(408,173)}</>),
 ],
 母:[
  <g>{path('M113 323h415M160 322V212q18-90 100-88h101q102 4 116 101v97',green)}{path('M176 316v-79q7-89 99-94h83q86 1 98 90v83',paper)}</g>,
  <>{person(288,237,1,rose,longHair)}{at(373,244,move('nod',baby),.63)}</>,
  line(320,106,'mother'),
 ],
 爸:[
  ground,
  <>{person(262,238,1.05,blue,cap)}{person(376,263,.65,rose,curls)}</>,
  at(449,143,move('sway',kite),.78),
  path('M442 202q-17 48-75 38'),
 ],
 妈:[
  backdrop(gold),
  <>{person(260,227,1.1,green,longHair)}{person(378,250,.73,rose,curls)}</>,
  table,
  <>{at(281,239,move('sway',flower),.59)}{at(358,232,cup,.71)}</>,
 ],
 兄:[
  ground,
  <>{person(249,226,1.14,blue,cap)}{person(398,254,.7,gold)}</>,
  move('pulse',<>{at(249,113,pennant,.61)}{line(215,94,'older')}</>),
 ],
 弟:[
  backdrop(blue),
  <>{person(260,229,1.03,blue)}{person(396,258,.63,green,cap,move('sway',waveArm))}</>,
  <>{path('M360 311q34 9 82 0')}{line(400,343,'younger')}</>,
 ],
 姐:[
  ground,
  <>{person(243,232,1.06,rose,longHair)}{person(390,254,.68,gold,curls)}</>,
  <>{at(317,222,move('sway',flower),.78)}{line(226,93,'older')}</>,
 ],
 妹:[
  backdrop(rose),
  <>{person(249,223,1.08,green,longHair)}{person(398,260,.59,rose,curls)}</>,
  <>{at(436,278,move('hop',ball),.6)}{line(408,340,'younger')}</>,
 ],
 友:[
  backdrop(green),
  <>{person(228,241,.9,rose,curls)}{person(421,241,.9,blue,cap)}</>,
  move('hop',<>{path('M253 211q22-41 62-37l-8-8 15-6 28 15-18 17-16-5q-32 3-48 40Z',skin)}{path('M398 209q-20-37-47-39l-20 13q4 15 19 7q16 5 33 32Z',skin)}{spark(326,133)}</>),
 ],
 朋:[
  path('M124 303q38-37 141-33h133q61 4 110 33Zm19 4v18m342-18v18',gold),
  <>{person(235,228,.78,green,cap)}{person(409,230,.82,rose,longHair)}</>,
  <>{at(320,265,move('tilt',toyBoat),.62)}{path('M268 293q26-6 53 0t61 1')}</>,
 ],
 师:[
  <g>{path('M120 96h310v158H120Z',green)}{path('M134 110h282v129H134Z',paper)}{path('M141 255v47m269-47v47')}</g>,
  <>{line(268,168,'1 + 2 = 3',36)}{person(466,242,1.05,blue,longHair)}</>,
  move('nod',path('M445 204q-61-7-98-37m0 0-17-11')),
 ],
 生:[
  table,
  <>{person(324,217,1,green,scarf)}{at(316,244,openBook,.85)}</>,
  move('pulse',<>{at(202,149,sound,.68)}{at(441,170,sound,.52)}{line(320,323,'student')}</>),
 ],
};

import type {ReactNode} from 'react';

const ochre='#ead69d', green='#d9e3b9', blue='#d9e6e9', rose='#dfb1a0', paper='#faf6ec';
const circle=(x:number,y:number,r:number,fill=ochre)=> <circle cx={x} cy={y} r={r} fill={fill}/>;
const marks=(d:string)=> <path d={d}/>;
const ground=marks('M100 325q105-11 221-1t216-2m-390 14q164-7 341-2');
const sparkle=(x:number,y:number)=>marks(`M${x-8} ${y}h16m-8-8v16`);
const label=(x:number,y:number,text:string,size=30)=> <text x={x} y={y} fill="currentColor" stroke="none" textAnchor="middle" fontFamily="var(--serif, Georgia)" fontSize={size}>{text}</text>;
const motion=(name:string,art:ReactNode)=> <g className={`lh-motion-${name}`}>{art}</g>;
const at=(x:number,y:number,art:ReactNode)=> <g transform={`translate(${x} ${y})`}>{art}</g>;
const leaf=<path d="M0 1C-32-2-34-30-6-29C13-26 17-7 0 1Zm-14-20L0 1" fill={green}/>;
const seed=<g><ellipse rx="24" ry="14" fill={ochre}/>{marks('M-17 3Q0-13 15 1')}</g>;
const bird=<g><path d="M-32 9q17-32 46-20q7-17 18-11q10 4 8 14l12 4-13 5q-6 23-33 23q-21 0-32-12l-16 5z" fill={blue}/>{marks('M-16 8q13 16 28-2m20-18h1')}</g>;
const lantern=<g><path d="M-7-40h14v8m-18 56h22m-11 0v13m-5 0h10"/><path d="M-12-32q-30 10-19 38q6 17 19 18h24q19-5 20-26q-1-21-20-30Z" fill={rose}/>{marks('M-9-28q-13 22 0 49m18-49q13 22 0 49')}</g>;
const shell=<g><path d="M-23 15C-42-4-10-38 0-19C8-39 42-8 23 15Q0 31-23 15Z" fill={rose}/>{marks('M0-17V18m-15-32 8 32m23-32-9 32m-22-4 30 0')}</g>;
const blossom=<g><path d="M-3-9c-29-25 25-36 14-3c35-14 35 24 4 20c15 30-29 32-24 6c-33 8-31-26 6-23Z" fill={rose}/>{circle(2,2,6)}</g>;
const sail=<g><path d="M-35 13q26 8 70 0q-6 17-24 18h-27q-12-1-19-18Z" fill={ochre}/><path d="M0 13v-57l28 50H0" fill={blue}/>{marks('M-2-33-23 6h18')}</g>;
const kite=<g><path d="M-25-8 0-37 24-8 0 29Z" fill={rose}/>{marks('M-24-8H24M0-35V28m0 2q20 10 2 22t5 20m-7-27 11 4m-12 14 9 2')}</g>;
const pebble=<path d="M-25 10q-5-12 9-24q11-10 30-6q18 7 15 25q-18 14-54 5Z" fill={blue}/>;
const candle=<g><path d="M-9 0h18v40H-9Z" fill={paper}/><path d="M0-3q-18-6 0-26q15 19 0 26Z" fill={ochre}/>{marks('M-7 10h5v10')}</g>;
const apple=<g><path d="M0-13c-37-25-46 28-20 45q13 8 20-1q19 11 29-10q17-38-18-36Z" fill={rose}/>{marks('M0-13q4-12-4-19m4 14q9-18 24-12q-3 12-24 12')}</g>;
const bowl=<g><path d="M-83 0h166q-9 50-57 58h-52Q-73 52-83 0Z" fill={blue}/><ellipse rx="83" ry="16" fill={paper}/>{marks('M-34 50q32 9 68 0')}</g>;
const book=<g><path d="M0 52Q-54 18-112 39v-90Q-58-72 0-45q55-27 112-6v90Q55 18 0 52Z" fill={paper}/>{marks('M0-45V51m-93-75q45-13 77 4m-77 17q45-12 77 5m34-23q36-16 77-4m-77 23q37-17 77-4')}</g>;
const ring=(x:number,y:number,r:number)=> <circle cx={x} cy={y} r={r}/>;
const tick=marks('M0-79v11m79 68H68m-68 79V68m-79-68h11M-56-56l7 7m105-7-7 7m7 105-7-7m-105 7 7-7');
const dial=at(320,188,<>{circle(0,0,99,paper)}{ring(0,0,86)}{tick}</>);
const hand=(d:string,name:string)=>at(320,188,motion(name,<><circle r="80" stroke="none"/>{marks(d)}{circle(0,0,3)}</>));
const sun=(x:number,y:number)=>at(x,y,<>{circle(0,0,35)}{marks('M0-57v12m0 90v12m-57-57h12m90 0h12m-97-41 8 8m72-8-8 8m8 72-8-8m-72 8 8-8')}</>);
const moon=<path d="M27-40C-9-55-49-20-41 16q9 45 59 25l13-10C-5 38-29-13 27-40Z" fill={ochre}/>;
const hill=<path d="M94 300q80-69 162-43q65 19 129-3q72-28 155 32v22H94Z" fill={green}/>;
const page=(x:number,y:number,word:string)=>at(x,y,<><path d="M-73-65H73v135H-73Z" fill={paper}/><path d="M-73-65H73v33H-73Z" fill={rose}/>{marks('M-48-76v22m96-22v22M-49 42H49')}{label(0,21,word,28)}</>);
const arrow=(d:string)=> <path d={d} strokeDasharray="4 5"/>;

function countScene(items:ReactNode,points:[number,number][],name:string):ReactNode[]{
 const arranged=points.map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`}>{motion(name,items)}</g>);
 const middle=Math.ceil(arranged.length/2);
 return [<g opacity=".35">{ground}</g>,<g>{arranged.slice(0,middle)}</g>,<g>{arranged.slice(middle)}{points.map(([x,y],i)=><g key={i}>{label(x,y+59,String(i+1),22)}</g>)}</g>];
}

function bundle(caption:string,base:number,art:ReactNode,rows:number){
 return <g>{Array.from({length:rows},(_,i)=><g key={i} transform={`translate(${212+i%5*54} ${139+Math.floor(i/5)*64})`}>{art}</g>)}{label(320,310,caption)}{label(320,263,String(base*rows),34)}</g>;
}
const stringOfBeads=<g>{marks('M0-27V28')}{Array.from({length:10},(_,i)=><circle key={i} cy={i*5-22.5} r="2.5" fill={ochre}/>)}</g>;
const crate=<g><path d="M-21-16h42v33h-42Z" fill={ochre}/>{marks('M-21-4h42m-42 11h42m-28-23v33m14-33v33')}</g>;
const row=(items:ReactNode,count:number,y:number,gap=52)=> <g>{Array.from({length:count},(_,i)=><g key={i} transform={`translate(${320+(i-(count-1)/2)*gap} ${y})`}>{items}</g>)}</g>;
const rail=marks('M134 319q172-8 371 0m-351 12 317 1');
const blueSky=<path d="M103 306V147Q110 96 160 90h320q57 4 57 55v161Z" fill={blue}/>;
const nightSky=<path d="M103 306V147Q110 96 160 90h320q57 4 57 55v161Z" fill="#c5cde0"/>;
const nightStars=<g>{sparkle(179,155)}{sparkle(246,129)}{sparkle(424,140)}{sparkle(459,207)}{sparkle(377,225)}{sparkle(144,230)}</g>;
const cloud=<path d="M-47 8q-9-15 12-20q7-18 26-11q14-20 33 1q27-8 34 18q1 14-14 15Z" fill={paper}/>;
const clockStand=marks('M250 285l-14 18h168l-14-18');
const runner=<g>{circle(4,-48,14,rose)}<path d="M-8-36q-14 18-13 40l36 8l9-40Z" fill={blue}/>{marks('M-7-29-40-14l-15-7m77-6 27 15 13-13m-76 34-17 33-35 8m83-41 23 29 29-2')}</g>;
const snail=<g><path d="M-51 25q28-11 54-7q24 6 35-12l9-11 13 3 2 22q-1 11-24 11H-61Z" fill={green}/>{circle(-10,0,26,ochre)}{marks('M-12 1q13-14 19-1q2 11-12 14q-22 0-22-17q-2-14 12-19M46-4l-3-15m12 17 7-15m-8 24h2')}</g>;

export const timeScenes:Record<string,ReactNode[]>={
 一:[
  <g opacity=".4">{ground}<ellipse cx="320" cy="313" rx="94" ry="17" fill={green}/></g>,
  at(320,308,seed),
  <g className="lh-motion-sway">{marks('M320 304q-6-56 9-111')}{at(322,257,leaf)}<path d="M326 230q13-49 56-42q-5 39-56 42Z" fill={green}/>{at(328,187,blossom)}</g>,
 ],
 二:countScene(lantern,[[235,171],[405,228]],'sway'),
 三:countScene(bird,[[180,219],[318,152],[465,215]],'drift'),
 四:countScene(shell,[[156,208],[263,187],[376,199],[487,211]],'tilt'),
 五:countScene(blossom,[[165,158],[318,140],[476,158],[233,257],[408,259]],'sway'),
 六:countScene(sail,[[153,136],[320,133],[484,138],[161,254],[328,247],[492,251]],'nod'),
 七:countScene(kite,[[140,115],[257,117],[380,117],[501,114],[185,232],[320,231],[452,234]],'tilt'),
 八:countScene(pebble,[[145,141],[260,142],[381,146],[491,143],[155,247],[267,248],[382,252],[486,248]],'hop'),
 九:countScene(candle,[[188,108],[320,108],[453,108],[187,199],[320,199],[453,199],[188,289],[320,289],[453,289]],'pulse'),
 十:countScene(apple,[[128,132],[223,133],[320,132],[418,134],[512,132],[128,243],[223,244],[320,242],[418,245],[512,243]],'hop'),
 百:[<path d="M181 85h278v157H181Z" fill={paper}/>,motion('sway',bundle('10 strings × 10 beads',10,stringOfBeads,10))],
 千:[<path d="M177 104h286v133H177Z" fill={green}/>,motion('hop',bundle('10 crates × 100',100,crate,10))],
 万:[<path d="M165 98q155-18 310 0v142H165Z" fill={blue}/>,motion('pulse',bundle('10 stacks × 1,000',1000,<g>{at(0,-13,crate)}{at(0,3,crate)}</g>,10))],
 零:[at(320,187,bowl),label(320,302,'0',46),motion('pulse',<>{sparkle(211,147)}{sparkle(429,163)}</>)],
 两:[at(320,221,bowl),motion('hop',<>{at(276,187,apple)}{at(366,182,apple)}</>),label(320,320,'2 apples')],
 半:[
  <path d="M149 313q164-25 345-4" strokeDasharray="4 5"/>,
  <path d="M310 138A89 89 0 0 0 310 316Z" fill={rose}/>,
  motion('slide',<><path d="M339 138A89 89 0 0 1 339 316Z" fill={ochre}/>{label(383,240,'½',41)}</>),
 ],
 双:[
  <path d="M184 282q140-23 278 0" strokeDasharray="3 7"/>,
  motion('sway',<><path d="M215 253q-41-14-30-41l14-18l-9-48l47-9l8 52q23 11 42 32q12 27-18 34Z" fill={blue}/><path d="m192 160 47-9m-40 45 26-6m-37 37 21-4"/></>),
  motion('sway',<><path d="M374 253q-27-7-12-32q17-21 41-32l9-52l47 9l-10 48l14 18q12 27-32 41Z" fill={blue}/><path d="m408 151 47 9m-37 29 31 7m-9 27 21 4"/></>),
 ],
 单:[at(320,202,<g><path d="M-100-80h200v160h-200Z" fill={paper}/><path d="M-91-70h182v140H-91Z" strokeDasharray="4 8"/></g>),at(320,195,motion('pulse',blossom)),label(320,326,'a single flower')],
 多:[
  at(320,240,<path d="M-138-6h276l-28 72h-218Z" fill={ochre}/>),
  motion('hop',<>{row(apple,5,219,54)}{row(apple,4,172,57)}{row(apple,3,123,59)}</>),
  <path d="M182 232h276l-28 74H210Zm17 23h239m-228 23h216m-167-46 9 73m43-73v73m50-73-9 73" fill={ochre} fillOpacity=".78"/>,
 ],
 少:[at(320,232,<ellipse rx="159" ry="54" fill={paper}/>),<ellipse cx="320" cy="229" rx="140" ry="40" strokeDasharray="4 5"/>,motion('hop',<>{at(285,224,pebble)}{at(351,237,pebble)}</>)],
 今:[page(320,195,'Today'),motion('pulse',<>{sparkle(214,169)}{sparkle(426,200)}</>),label(320,310,'right now',25)],
 明:[page(224,190,'Today'),page(416,190,'Tomorrow'),motion('rise',sun(416,93))],
 昨:[page(224,190,'Yesterday'),page(416,190,'Today'),motion('slide',arrow('M339 299H236l14-10m-14 10 14 10'))],
 年:[
  at(320,202,<g>{circle(0,0,109,paper)}{ring(0,0,84)}{marks('M0-109v25m0 168v25m-109-109h25m168 0h25')}</g>),
  motion('spin',<>{at(320,117,leaf)}{at(320,287,leaf)}{at(235,202,blossom)}{at(405,202,blossom)}</>),label(320,211,'1 year',33),
 ],
 岁:[
  <g><path d="M215 216q105 22 210 0v73q-105 31-210 0Z" fill={rose}/><ellipse cx="320" cy="216" rx="105" ry="25" fill={paper}/></g>,
  motion('pulse',row(candle,5,177,36)),
  label(320,272,'5 years old',29),
 ],
 时:[<g>{clockStand}{dial}</g>,at(320,188,marks('M0 0v-54m0 54 43 24')),motion('pulse',label(320,341,'one hour',27))],
 分:[dial,at(320,188,<path d="M0 0V-84A84 84 0 0 1 84 0Z" fill={blue}/>),hand('M0 0V-63','spin'),label(320,334,'minutes',26)],
 秒:[at(320,83,<path d="M-24 0V-24h48V0Z" fill={ochre}/>),dial,hand('M0 13V-69','spin'),label(320,332,'seconds',26)],
 点:[dial,at(320,188,<g>{marks('M0 0V-66m0 66h-46')}{circle(0,0,5)}</g>),motion('pulse',label(320,333,'9 o’clock',28))],
 早:[blueSky,motion('rise',sun(310,236)),hill,<g className="lh-motion-drift">{at(420,157,cloud)}</g>],
 晚:[<path d="M103 306V147Q110 96 160 90h320q57 4 57 55v161Z" fill={rose}/>,motion('nod',sun(445,250)),hill,<path d="M112 296h127v20H112Zm19-5v-54l37-29 41 29v54Z" fill={ochre}/>],
 午:[blueSky,sun(320,155),<path d="M103 297h434v20H103Z" fill={green}/>,motion('pulse',<g><path d="M320 296V233m0 63 37 3"/><path d="M261 233q59-61 118 0Z" fill={rose}/></g>)],
 夜:[nightSky,motion('pulse',nightStars),at(322,179,moon),<path d="M104 293l44-24 34 12 37-40 34 28 47-5 34 22 51-19 43 8 54-27 55 30v39H104Z" fill="#adb3c7"/>],
 周:[
  <path d="M100 125h440v151H100Z" fill={paper}/>,
  <g>{['M','T','W','T','F','S','S'].map((day,i)=><g key={i}>{circle(146+i*58,200,22,i>4?rose:blue)}{label(146+i*58,209,day,23)}</g>)}</g>,
  motion('flow',arrow('M138 250h363m-10-7 10 7-10 7')),
 ],
 期:[
  marks('M130 219h380m-365-14v28m350-28v28'),
  <g>{circle(145,219,10,green)}{circle(495,219,10,rose)}{label(145,267,'start',26)}{label(495,267,'end',26)}</g>,
  motion('stretch',<path d="M176 207h288v24H176Z" fill={ochre}/>),
 ],
 季:[
  <path d="M113 123h414v155H113Zm103 0v155m104-155v155m103-155v155" fill={paper}/>,
  <g>{at(165,200,blossom)}{sun(268,201)}{at(371,200,leaf)}{marks('M473 167v67m-28-50 57 33m-57 0 57-33')}</g>,
  motion('flow',arrow('M133 312h374m-12-8 12 8-12 8')),
 ],
 每:[
  <g>{page(171,195,'Mon')}{page(320,195,'Tue')}{page(469,195,'Wed')}</g>,
  <g stroke="#7f9368">{marks('M149 293l14 12 28-30m107 18 14 12 28-30m107 18 14 12 28-30')}</g>,
  motion('pulse',label(320,342,'every day',27)),
 ],
 次:[
  <path d="M115 280h410" strokeDasharray="5 7"/>,
  <g>{at(173,223,runner)}{at(320,223,runner)}</g>,
  at(464,223,motion('hop',runner)),
 ],
 个:[at(320,199,<g transform="scale(2.15)">{apple}</g>),label(320,325,'one apple'),motion('pulse',<>{sparkle(208,166)}{sparkle(429,194)}</>)],
 本:[at(320,199,book),motion('sway',<path d="M320 153q54-48 101-49l-8 87q-55 19-93 59Z" fill={paper}/>),label(320,325,'one book')],
 张:[
  <path d="M210 114h225v142l-39 37H210Z" fill={paper}/>,
  motion('sway',<path d="M396 293v-37h39Z" fill={blue}/>),
  label(320,331,'one sheet'),
 ],
 块:[
  <path d="m167 198 158-55 149 43-157 57Z" fill={ochre}/>,
  <path d="m167 198 150 45 157-57v54l-157 57-150-44Z" fill="#d7b580"/>,
  motion('tilt',<path d="m320 117 55-18 55 15-56 21Z" fill={paper}/>),
 ],
 只:[rail,at(320,198,<g transform="scale(2.25)">{bird}</g>),motion('hop',<>{marks('m302 265-4 26m18-29 8 27')}{label(320,333,'one bird')}</>)],
 第:[
  <path d="M169 222h104v88H169Zm104-62h104v150H273Zm104 89h104v61H377Z" fill={blue}/>,
  <g>{label(220,269,'2nd')}{label(325,212,'1st')}{label(430,288,'3rd')}</g>,
  motion('pulse',at(325,120,<g>{circle(0,0,23)}{sparkle(0,0)}</g>)),
 ],
 先:[
  <path d="M125 289q192-13 392 1" strokeDasharray="6 8"/>,
  <g>{at(196,236,runner)}{at(326,236,runner)}</g>,
  at(473,229,motion('slide',runner)),
  label(465,140,'first',28),
 ],
 再:[
  marks('M165 270q-4-124 147-131t167 106m-10-21 10 21 12-19'),
  <g>{at(187,278,seed)}{at(449,278,seed)}</g>,
  motion('hop',at(449,217,leaf)),
  label(320,324,'again',28),
 ],
 长:[
  <path d="M111 169h414v59H111Z" fill={ochre}/>,
  marks('M145 169v21m42-21v33m42-33v21m42-21v33m42-33v21m42-21v33m42-33v21m42-21v33m42-33v21'),
  motion('stretch',marks('M111 270h414m-400-10-14 10 14 10m386-20 14 10-14 10')),
 ],
 短:[
  <path d="M249 169h143v59H249Z" fill={green}/>,
  marks('M270 169v21m24-21v33m24-33v21m24-21v33m24-33v21'),
  motion('stretch',marks('M249 270h143m-129-10-14 10 14 10m115-20 14 10-14 10')),
 ],
 快:[rail,at(390,220,motion('slide',<g transform="scale(1.45)">{runner}</g>)),motion('flow',marks('M141 183h130m-155 29h164m-120 30h112'))],
 慢:[rail,at(352,241,motion('drift',<g transform="scale(1.55)">{snail}</g>)),<path d="M111 278q79-26 154 4" strokeDasharray="2 6"/>],
};

export function LivingLifeScene({id,progress,complete}:{id:string;progress:number;complete:boolean}){
 if(!['person','big','small','mouth','field'].includes(id))return null;
 const p=complete?1:Math.max(0,Math.min(1,progress));
 const reveal=(start:number,end=1)=>Math.max(0,Math.min(1,(p-start)/(end-start)));
 const drawn=(start:number,end=1)=>({pathLength:1,strokeDasharray:1,strokeDashoffset:1-reveal(start,end)});
 return <g className={`lh-life-scene${complete?' lh-life-complete':''}`} fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
  <style>{`
   .lh-life-scene path,.lh-life-scene g{transition:opacity .65s ease,stroke-dashoffset .65s ease}
   .lh-life-complete .lh-life-walker{animation:lh-life-walk 2.8s ease-in-out infinite}
   .lh-life-complete .lh-life-leg-a{animation:lh-life-leg 1.4s ease-in-out infinite alternate;transform-origin:0px 58px}
   .lh-life-complete .lh-life-leg-b{animation:lh-life-leg 1.4s ease-in-out infinite alternate-reverse;transform-origin:0px 58px}
   .lh-life-complete .lh-life-arm{animation:lh-life-arm 1.4s ease-in-out infinite alternate;transform-origin:0px 0px}
   .lh-life-complete .lh-life-balloon{animation:lh-life-float 4.8s ease-in-out infinite}
   .lh-life-complete .lh-life-bug{animation:lh-life-bug 5s ease-in-out infinite}
   .lh-life-complete .lh-life-mouth{animation:lh-life-talk 3.8s ease-in-out infinite;transform-origin:320px 221px}
   .lh-life-complete .lh-life-voice{animation:lh-life-voice 3.8s ease-in-out infinite}
   .lh-life-complete .lh-life-crop{animation:lh-life-sway 3.8s ease-in-out infinite alternate;transform-origin:0px 0px}
   .lh-life-complete .lh-life-crop:nth-child(even){animation-delay:-1.6s}
   @keyframes lh-life-walk{0%,100%{transform:translate(-9px,0)}50%{transform:translate(9px,-3px)}}
   @keyframes lh-life-leg{from{transform:rotate(-9deg)}to{transform:rotate(9deg)}}
   @keyframes lh-life-arm{from{transform:rotate(-7deg)}to{transform:rotate(8deg)}}
   @keyframes lh-life-float{0%,100%{transform:translate(0,3px) rotate(-1deg)}50%{transform:translate(3px,-6px) rotate(1deg)}}
   @keyframes lh-life-bug{0%,100%{transform:translate(-6px,1px) rotate(-3deg)}50%{transform:translate(7px,-2px) rotate(3deg)}}
   @keyframes lh-life-talk{0%,10%,44%,100%{transform:scaleY(.56)}19%,34%{transform:scaleY(1)}26%{transform:scaleY(.74)}}
   @keyframes lh-life-voice{0%,10%,52%,100%{opacity:.2}23%,37%{opacity:1}}
   @keyframes lh-life-sway{from{transform:rotate(-5deg)}to{transform:rotate(5deg)}}
   @media(prefers-reduced-motion:reduce){.lh-life-scene *{animation:none!important;transition:none!important}}
  `}</style>
  <path opacity=".25" strokeWidth="1.3" d="M92 330q120-13 233-1t220-2m-425 12q191-7 399-3"/>
  {id==='person'&&<>
   <path opacity=".35" strokeWidth="1.3" strokeDasharray="3 8" d="M130 311q71-35 130 2t236-8"/>
   <g transform="translate(320 179)"><g className="lh-life-walker">
    <g opacity={reveal(0,.5)}>
     <path fill="#e4c898" d="M-23-39q-16-11-13-36q3-26 28-29q28-2 37 23q8 27-12 41q-17 10-40 1Z"/>
     <path d="M-35-77q7-30 32-27q26 0 32 27M-29-89q15 9 31-8q8 14 22 14"/>
     <path d="M-11-66h1m19-1h1m-18 13q9 6 15-1" strokeWidth="2.5"/>
     <path fill="url(#lh-scene-hatch)" d="M-15-36q-25 16-24 68l5 29q31 12 65 0l4-36q-1-42-20-61l-11 12Z"/>
     <path opacity=".4" d="M-27-11q-7 31-2 54m16-64q10 9 20 0m-24 63q14 3 26-1" strokeWidth="1.1"/>
     <g className="lh-life-arm"><path d="M-24-22q-25 24-40 57m47-52q-23 20-35 48"/><path fill="#e4c898" d="M-64 33q-10 6-4 14q8 7 17-8"/></g>
    </g>
    <g opacity={reveal(.5,1)}>
     <path d="M24-23q27 15 37 42m-44-30q18 12 26 32"/><path fill="#e4c898" d="M43 20q-4 10 6 13q11 0 12-12"/>
     <g className="lh-life-leg-a"><path d="M-19 62q-3 30-20 65m12-63q1 31-6 63"/><path fill="#354f91" d="M-40 124q-13 4-17 12q18 4 29-4l-3-8Z"/></g>
     <g className="lh-life-leg-b"><path d="M12 64q19 28 32 61m-19-64q22 28 27 61"/><path fill="#354f91" d="M44 123q16-2 23 9q-15 7-26 1Z"/></g>
    </g>
   </g></g>
   <path opacity={reveal(.5,1)*.5} strokeWidth="1.3" d="M150 297q11-18 22 0m-9 1v-13m-9 6 9 5 10-6m308 18 4-12m-1 13 8-7"/>
  </>}
  {id==='big'&&<>
   <g opacity={reveal(0,.34)}>
    <path fill="#e4e6ba" d="M168 314q-14-30 6-49q20-15 38 8q10 19-4 40Z"/>
    <path d="M176 315q-1-16 11-21q13 0 17 19m-17-21v-14"/>
    <circle cx="189" cy="258" r="12" fill="#e4c898"/><path d="m179 316-4 11m24-11 4 10m-2-31 35-35"/>
   </g>
   <g opacity={reveal(0,.34)} transform="translate(346 151)">
    <g className="lh-life-balloon">
     <g transform={`scale(${.32+.68*p})`}>
      <path fill="#d8a38c" d="M-5 89C-110 38-107-58-48-83C7-111 91-70 91-8C93 36 53 77 8 91l6 12-23 0Z"/>
      <path opacity=".35" d="M-6 84C-103 35-99-54-46-77C7-101 85-65 85-8" strokeWidth="1.2"/>
      <path d="M-48-52q-20 15-22 37m24-48-7 7" stroke="#fff7e6" strokeWidth="5"/>
      <path d="M-6 91q7 3 15 0"/>
     </g>
    </g>
   </g>
   <path {...drawn(.34,.67)} d={`M${346+3*p} ${151+(89*(.32+.68*p))}C360 279 286 252 236 260`}/>
   <g opacity={reveal(.67,1)} strokeWidth="1.4"><path d="m464 118 17-7m-10 51 19 1m-23 38 15 8m-258-68-16-6m31-38-10-13"/><path d="M431 301q13-8 27 0q13-8 24 0" opacity=".4"/></g>
  </>}
  {id==='small'&&<>
   <g opacity={reveal(0,.34)}>
    <path fill="url(#lh-scene-hatch)" d="M155 288C185 166 309 141 481 123C471 243 359 323 155 288Z"/>
    <path d="M150 301q146-95 320-169m-268 135 17-62m39 31 26-59m35 32 32-46m-141 98 75 11m-22-43 84 4m-34-37 65-1"/>
    <path opacity=".35" d="M166 282q116 27 208-25m25-17q40-29 65-86" strokeWidth="1.2"/>
   </g>
   <g opacity={reveal(.34,.67)} transform="translate(306 227) rotate(-20)"><g className="lh-life-bug">
    <path d="m-10-7-9-7m7 14-10 0m13 8-8 7m26-22 9-7m-7 14 11 0m-13 8 8 7" strokeWidth="1.4"/>
    <ellipse rx="13" ry="16" fill="#c88a75"/>
    <path d="M0-13v28"/>
    <path fill="currentColor" d="M-8-12q0-10 8-10q8 0 8 10Z"/>
    <path d="m-4-21-4-5m12 5 4-5" strokeWidth="1.2"/>
    <g fill="currentColor" stroke="none"><circle cx="-6" cy="-5" r="2.5"/><circle cx="6" cy="1" r="2.5"/><circle cx="-6" cy="7" r="2"/></g>
   </g></g>
   <g opacity={reveal(.67,1)} strokeWidth="1.3"><path d="M290 195q-32-28-66-12m6-6-7 7 10 3"/><path d="M326 250q23 21 37 11" strokeDasharray="2 5"/><text x="155" y="173" fill="currentColor" stroke="none" fontSize="22" fontFamily="cursive" transform="rotate(-7 155 173)">a tiny visitor</text><path d="M445 267q4-8 10 0q6-8 10 0m-12 22 5-10" opacity=".4"/></g>
  </>}
  {id==='mouth'&&<>
   <g opacity={reveal(0,.34)}>
    <path fill="#e9d8b8" d="M223 130C233 54 407 45 421 133l-9 114q-17 71-91 73q-72-4-91-69Z"/>
    <path d="M223 136q-11-64 43-77q38-25 94-5q57 2 61 79m-193-15q40 2 48-43q20 37 68 5q19 33 72 35"/>
    <path d="M226 174q-24-18-22 10q2 20 24 21m188-32q24-18 20 12q-2 17-22 20"/>
   </g>
   <g opacity={reveal(.34,.67)}><path d="M264 146q14-9 27 0m57-1q15-8 27 1m-54 18-5 20 12 2"/><path d="M273 164h1m84 0h1" strokeWidth="5"/><path d="M247 194q13-6 24 0m99 0q13-6 23 0" stroke="#c88a75" strokeWidth="5" opacity=".5"/></g>
   <g opacity={reveal(.67,1)}>
    <g className="lh-life-mouth"><path fill="#a96358" d="M274 211q47-16 93 0q-3 53-46 54q-43-2-47-54Z"/><path fill="#fff5e0" d="M278 212q44-14 85 0l-6 13q-35-8-72 0Z"/><path fill="#d6a28b" d="M295 252q26-23 51 0q-22 17-51 0Z"/></g>
    <g className="lh-life-voice" strokeWidth="1.5"><path fill="#fff5e0" d="M448 110q-6-26 25-31l67 0q30 2 24 31q-1 24-29 25l-57-1-31 17 9-21q-9-5-8-20Z"/><text x="468" y="116" fill="currentColor" stroke="none" fontSize="24" fontFamily="cursive">hello!</text><path d="m433 200 18-7m-17 26 22 2m-22 16 15 10"/></g>
   </g>
  </>}
  {id==='field'&&<>
   <g opacity={reveal(0,.2)}><path fill="#e7d2a7" d="m146 187 275-18 107 137-361 13Z"/><path d="m157 192 259-17m-244 138 349-12" opacity=".4"/></g>
   <path {...drawn(.2,.4)} d="m275 180 31 132"/>
   <path {...drawn(.4,.6)} d="m158 246 313-15"/>
   <g opacity={reveal(.6,.8)} strokeWidth="1.2"><path d="m198 215 25-2m-19 10 23-2m112-19 32-2m-24 12 30-2m-160 76 27-1m-21 9 26-1m122-26 35-2m-28 13 35-1"/><path d="M124 175q146-14 299-19m13 7 103 137" opacity=".35"/></g>
   <g opacity={reveal(.8,1)}>
    {[[213,221],[250,218],[334,210],[378,208],[239,285],[279,281],[365,275],[413,270],[459,269]].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y}) scale(${.72+(i%3)*.12})`}><g className="lh-life-crop">
     <path d="M0 0q4-23 0-48"/>
     <path fill={i%2?'#c4d099':'#d6bc7f'} d="M1-18q-24-1-21-18q17 0 21 18m1-13q20-2 18-19q-17 1-18 19m-2-13q-15-4-12-17q15 3 12 17"/>
    </g></g>)}
    <g opacity=".5" strokeWidth="1.3"><path d="m104 282-5-15m5 13 10-10m427-31 7-13m-6 15 12-5"/><path d="M94 104q11-8 21 0q11-8 21 0m349 23q11-8 22 0q10-8 20 0"/></g>
   </g>
  </>}
 </g>;
}

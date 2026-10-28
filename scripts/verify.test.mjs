import {test} from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {lessons,staticAnswer} from '../lib/lessons.ts';
import {recordCompletion,recordAgain,getJourneyStats} from '../lib/progress.ts';

const testEnv={};globalThis.__INKTALES_TEST_ENV=testEnv;
const apiBundle=await build({entryPoints:['app/api/assistant/route.ts'],bundle:true,platform:'node',format:'esm',write:false,plugins:[{name:'test-env',setup(b){b.onResolve({filter:/^cloudflare:workers$/},()=>({path:'test-env',namespace:'test'}));b.onLoad({filter:/.*/,namespace:'test'},()=>({contents:'export const env=globalThis.__INKTALES_TEST_ENV',loader:'js'}));}}]});
const api=await import('data:text/javascript;base64,'+Buffer.from(apiBundle.outputFiles[0].text).toString('base64'));
function request(body,extra={}){return new Request('https://ink.example/api/assistant',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://ink.example',...extra},body:typeof body==='string'?body:JSON.stringify(body)});}
const valid={question:'What does this character mean?',characterId:'mountain'};

test('12 unique complete lessons have a correct meaning choice and bundled stroke data',async()=>{
 assert.equal(lessons.length,12);assert.equal(new Set(lessons.map(l=>l.id)).size,12);
 for(const l of lessons){assert.equal(l.choices.filter(c=>c===l.meaning).length,1);assert.ok(l.story.length>80);assert.ok(l.pinyin);const d=JSON.parse(await readFile(`public/data/${l.char}.json`,'utf8'));assert.equal(d.strokes.length,l.strokes);assert.equal(d.medians.length,l.strokes);}
});
test('every flashcard stroke has a usable tracing mask',async()=>{
 const bundle=await build({entryPoints:['lib/character-strokes.ts'],bundle:true,platform:'node',format:'esm',write:false});
 const {characterStrokes}=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
 for(const lesson of lessons){
  const strokes=characterStrokes[lesson.char];
  assert.equal(strokes?.length,lesson.strokes,lesson.char);
  for(const stroke of strokes){
   assert.ok(stroke.path.startsWith('M '),lesson.char);
   assert.ok(stroke.median.length>1,lesson.char);
   assert.ok(Number.isFinite(stroke.length)&&stroke.length>0,lesson.char);
   assert.ok(Number.isFinite(stroke.radius)&&stroke.radius>5,lesson.char);
  }
 }
});
test('all essential local assets and licenses are present',async()=>{for(const p of ['assets/mountain.webp','assets/grove.webp','assets/brush.css','assets/cormorant.css','assets/dm-sans.css','assets/Cormorant-Garamond-OFL.txt','assets/DM-Sans-OFL.txt','assets/Ma-Shan-Zheng-OFL.txt','vendor/hanzi-writer.min.js','vendor/HANZI-WRITER-LICENSE.txt','data/ARPHICPL.TXT'])assert.ok((await readFile('public/'+p)).length>50,p);});
test('unconfigured API reports offline without disclosing configuration',async()=>{const r=api.GET();assert.deepEqual(await r.json(),{configured:false});});
test('offline meaning answer matches the lesson and is labeled as offline',async()=>{const r=await api.POST(request(valid));assert.equal(r.status,200);const d=await r.json();assert.equal(d.offline,true);assert.match(d.answer,/mountain/);assert.match(d.answer,/memory aid/);});
test('unsupported etymology and fabricated-source prompts disclose uncertainty',async()=>{for(const l of lessons){const answer=staticAnswer('Invent an ancient source for the exact origin',l);assert.match(answer,/cannot verify/);assert.match(answer,/not a verified/);}});
test('offline fallback handles out-of-scope questions without pretending to be live AI',()=>{assert.match(staticAnswer('Book me a flight',lessons[0]),/cannot generate a new AI answer/);});
test('malformed and invalid requests are rejected',async()=>{for(const body of ['{bad',null,{},[],{...valid,question:3},{...valid,question:' '},{...valid,question:'a'.repeat(601)},{...valid,characterId:'not-in-course'}]){const r=await api.POST(request(body));assert.equal(r.status,400);}});
test('cross-origin requests are rejected',async()=>{assert.equal((await api.POST(request(valid,{Origin:'https://unrelated.example'}))).status,403);});
test('oversized requests are rejected before provider use',async()=>{assert.equal((await api.POST(request('x'.repeat(10001)))).status,413);});
test('configured provider success, failure and throttling are safe',async()=>{
 Object.assign(testEnv,{AI_ENABLED:'true',GEMINI_API_KEY:'test-only-dummy-key',AI_DAILY_LIMIT:'100'});
 const originalFetch=globalThis.fetch;let calls=0;
 try{
  globalThis.fetch=async(url,init)=>{calls++;assert.match(url,/generativelanguage.googleapis.com/);const body=JSON.parse(init.body);assert.match(body.systemInstruction.parts[0].text,/NOT verified etymology/);assert.equal(body.contents.at(-1).parts[0].text,valid.question);return Response.json({candidates:[{content:{parts:[{text:'山 means mountain.'}]}}]});};
  const success=await api.POST(request(valid,{'cf-connecting-ip':'test-success'}));assert.deepEqual(await success.json(),{answer:'山 means mountain.',offline:false});
  globalThis.fetch=async()=>new Response('upstream details that must not be exposed',{status:500});
  const failure=await api.POST(request(valid,{'cf-connecting-ip':'test-failure'}));assert.equal(failure.status,503);const failureText=await failure.text();assert.doesNotMatch(failureText,/dummy-key|upstream details/);
  globalThis.fetch=async()=>Response.json({candidates:[{content:{parts:[{text:'A short answer.'}]}}]});
  for(let i=0;i<10;i++)assert.equal((await api.POST(request(valid,{'cf-connecting-ip':'test-rate'}))).status,200);
  assert.equal((await api.POST(request(valid,{'cf-connecting-ip':'test-rate'}))).status,429);
  globalThis.fetch=async()=>{throw new Error('network failed with private details');};
  const network=await api.POST(request(valid,{'cf-connecting-ip':'test-network'}));assert.equal(network.status,503);assert.doesNotMatch(await network.text(),/private details/);
  assert.equal(calls,1);
 }finally{globalThis.fetch=originalFetch;for(const k of Object.keys(testEnv))delete testEnv[k];}
});
test('initial flashcard renders semantic content without a browser',async()=>{
 const out=resolve('.sites-runtime/verify-client.mjs');await mkdir(resolve('.sites-runtime'),{recursive:true});
 await build({entryPoints:['components/inktales.tsx'],bundle:true,platform:'node',format:'esm',outfile:out,external:['react','react-dom','lucide-react'],jsx:'automatic'});
 const {default:InkTales}=await import(pathToFileURL(out).href);
 const {renderToString}=await import('react-dom/server');const {createElement}=await import('react');
 const html=renderToString(createElement(InkTales));assert.match(html,/Flashcards/);assert.match(html,/Momo/);assert.match(html,/aria-label="Card 1 of 12"/);assert.doesNotMatch(html,/Choose flashcard|review-divider/);assert.match(html,/Again — revisit this character/);assert.match(html,/Got it — remember and continue/);assert.doesNotMatch(html,/Previous character|Next character/);assert.doesNotMatch(html,/Every character tells a story|Let it sink in|A little ink. A world of meaning.|rating-button|mnemonic-note/);assert.match(html,/flashcard-frame/);assert.doesNotMatch(html,/role="tablist"|tab-writing|tab-practice|lesson-category|lesson-guide|flashcard-context/);assert.match(html,/Play strokes on the character/);assert.doesNotMatch(html,/aria-label="Writing practice"|Practice writing|Complete &amp; continue/);assert.doesNotMatch(html,/>Again<|>Got it<|>Character<|See it. Write it. Remember it./);assert.match(html,/Character evolution/);assert.match(html,/Oracle bone/);assert.match(html,/Story/);assert.doesNotMatch(html,/dummy-key|GEMINI_API_KEY/);
});

test('every character has its own focused illustration and descriptive alternative text',async()=>{
 for(const l of lessons){assert.ok(l.imageAlt.length>20);assert.ok((await readFile(`public/assets/characters/${l.id}.webp`)).length>1000);}
 assert.equal(new Set(lessons.map(l=>l.image)).size,12);
});
test('completion replaces the removed rating controls without mutating earlier progress',()=>{
 const earlier={water:{learned:true,reviewedAt:100,due:200,rating:'Good'}};
 const result=recordCompletion(earlier,'mountain',1000);
 assert.equal(earlier.mountain,undefined);assert.deepEqual(result.water,earlier.water);
 assert.deepEqual(result.mountain,{learned:true,reviewedAt:1000,due:86401000,rating:'Completed'});
});
test('all twelve evolution records use sourced, licensed glyphs',async()=>{
 const sources=JSON.parse(await readFile('public/evolution/sources.json','utf8'));
 for(const l of lessons){const forms=sources[l.char];assert.equal(forms.length,3);assert.equal(new Set(forms.map(f=>f.stage)).size,3);assert.ok(forms.filter(f=>f.available).length>0,'No historical forms: '+l.char);
  for(const f of forms.filter(f=>f.available)){assert.match(f.source,/^https:\/\/commons\.wikimedia\.org\//);assert.match(f.license,/Public domain|CC0/);const bytes=await readFile('public'+f.file);assert.ok(bytes.length>100);if(f.file.endsWith('.svg'))assert.doesNotMatch(bytes.toString(),/<script|<foreignObject|(?:href|xlink:href)\s*=\s*["']https?:/i);}
 }
});

test('Again schedules a revisit and preserves learned status and other records',()=>{
 const earlier={water:{learned:true,reviewedAt:100,due:200,rating:'Good'}};
 const retry=recordAgain(earlier,'water',1000);assert.equal(retry.water.learned,true);assert.equal(retry.water.due,1000);assert.equal(retry.water.rating,'Again');assert.equal(earlier.water.due,200);
 const first=recordAgain(earlier,'mountain',1000);assert.equal(first.mountain.learned,false);assert.deepEqual(first.water,earlier.water);
 assert.equal(recordCompletion(first,'mountain',2000).mountain.learned,true);
});
test('journey summaries use saved dates, including retries, with local calendar boundaries',()=>{
 const now=new Date(2026,9,24,12).getTime();
 const earlier={water:{learned:true,reviewedAt:new Date(2026,9,24,0).getTime(),due:now+1,rating:'Completed'},mountain:{learned:false,reviewedAt:new Date(2026,9,23,23,59).getTime(),due:now-1,rating:'Again'},sun:{learned:true,reviewedAt:new Date(2026,9,17,23,59).getTime(),due:now-1,rating:'Good'}};
 const stats=getJourneyStats(earlier,now);assert.equal(stats.learned,2);assert.deepEqual(stats.due,[{id:'mountain'},{id:'sun'}]);assert.equal(stats.week.length,7);assert.equal(stats.week[6].count,1);assert.equal(stats.week[5].count,1);assert.equal(stats.week.reduce((n,d)=>n+d.count,0),2);assert.equal(getJourneyStats({},now).week.every(d=>d.count===0),true);
});
test('Momo artwork and self-hosted Kai font with license are bundled',async()=>{
 for(const p of ['assets/momo.webp','assets/inktales-kai.woff2','assets/inktales-kai-extended.woff2','assets/LXGW-WenKai-OFL.txt'])assert.ok((await readFile('public/'+p)).length>1000,p);
 const font=await readFile('public/assets/inktales-kai.woff2');assert.equal(font.subarray(0,4).toString(),'wOF2');assert.ok(font.length<50000,'Initial character font should stay small');
});

test('Hanzi library loads once for concurrent readers and can retry after a failed load',async()=>{
 const {loadHanziWriter}=await import('../lib/hanzi-client.ts');
 const originalWindow=globalThis.window,originalDocument=globalThis.document;const scripts=[];
 try{
  globalThis.window={};globalThis.document={createElement:()=>({dataset:{},remove(){this.removed=true;}}),head:{appendChild(script){scripts.push(script);}}};
  const first=loadHanziWriter(),parallel=loadHanziWriter();assert.equal(first,parallel);assert.equal(scripts.length,1);
  scripts[0].onerror();await assert.rejects(first,/Writing library unavailable/);assert.equal(scripts[0].removed,true);
  const retry=loadHanziWriter();assert.equal(scripts.length,2);globalThis.window.HanziWriter={create(){}};scripts[1].onload();await retry;
  await loadHanziWriter();assert.equal(scripts.length,2);
 }finally{if(originalWindow===undefined)delete globalThis.window;else globalThis.window=originalWindow;if(originalDocument===undefined)delete globalThis.document;else globalThis.document=originalDocument;}
});

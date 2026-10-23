import {test} from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {lessons,staticAnswer} from '../lib/lessons.ts';

const testEnv={};globalThis.__INKTALES_TEST_ENV=testEnv;
const apiBundle=await build({entryPoints:['app/api/assistant/route.ts'],bundle:true,platform:'node',format:'esm',write:false,plugins:[{name:'test-env',setup(b){b.onResolve({filter:/^cloudflare:workers$/},()=>({path:'test-env',namespace:'test'}));b.onLoad({filter:/.*/,namespace:'test'},()=>({contents:'export const env=globalThis.__INKTALES_TEST_ENV',loader:'js'}));}}]});
const api=await import('data:text/javascript;base64,'+Buffer.from(apiBundle.outputFiles[0].text).toString('base64'));
function request(body,extra={}){return new Request('https://ink.example/api/assistant',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://ink.example',...extra},body:typeof body==='string'?body:JSON.stringify(body)});}
const valid={question:'What does this character mean?',characterId:'mountain'};

test('12 unique complete lessons have a correct meaning choice and bundled stroke data',async()=>{
 assert.equal(lessons.length,12);assert.equal(new Set(lessons.map(l=>l.id)).size,12);
 for(const l of lessons){assert.equal(l.choices.filter(c=>c===l.meaning).length,1);assert.ok(l.story.length>80);assert.ok(l.pinyin);const d=JSON.parse(await readFile(`public/data/${l.char}.json`,'utf8'));assert.equal(d.strokes.length,l.strokes);assert.equal(d.medians.length,l.strokes);}
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
 const html=renderToString(createElement(InkTales));assert.match(html,/Every character tells a story/);assert.match(html,/flashcard-frame/);assert.match(html,/role="tablist"/);assert.match(html,/A memory story, not a historical explanation/);assert.doesNotMatch(html,/dummy-key|GEMINI_API_KEY/);
});

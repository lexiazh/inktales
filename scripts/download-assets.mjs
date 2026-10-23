import { mkdir, writeFile } from 'node:fs/promises';
const root = new URL('../public/', import.meta.url);
const files = [
 ['vendor/hanzi-writer.min.js','https://cdn.jsdelivr.net/npm/hanzi-writer@3.7.3/dist/hanzi-writer.min.js'],
 ['vendor/HANZI-WRITER-LICENSE.txt','https://cdn.jsdelivr.net/npm/hanzi-writer@3.7.3/LICENSE'],
 ['data/ARPHICPL.TXT','https://raw.githubusercontent.com/chanind/hanzi-writer-data/master/ARPHICPL.TXT'],
 ...[...'山水日月木林火人大小口田'].map(c=>[`data/${c}.json`,`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${encodeURIComponent(c)}.json`]),
];
await Promise.all(files.map(async ([file,url])=>{
 const res=await fetch(url); if(!res.ok)throw new Error(`${res.status}: ${file}`);
 await mkdir(new URL(file.split('/').slice(0,-1).join('/')+'/',root),{recursive:true});
 await writeFile(new URL(file,root),Buffer.from(await res.arrayBuffer()));
 console.log(`Saved ${file}`);
}));
const families=[['cormorant','Cormorant+Garamond:wght@400;500;600'],['dm-sans','DM+Sans:wght@400;500;600;700'],['brush','Ma+Shan+Zheng&text='+encodeURIComponent('山水日月木林火人大小口田墨学')]];
for(const [name,family] of families){
 const res=await fetch(`https://fonts.googleapis.com/css2?family=${family}&display=swap`,{headers:{'User-Agent':'Mozilla/5.0'}});
 if(!res.ok)throw new Error(`Font CSS ${res.status}`);
 let css=await res.text();
 const urls=[...new Set([...css.matchAll(/url\((https[^)]+)\)/g)].map(m=>m[1]))];
 for(let i=0;i<urls.length;i++){
  const font=await fetch(urls[i]); if(!font.ok)throw new Error('Font unavailable');
  const filename=`${name}-${i}.woff2`;
  await writeFile(new URL(`assets/${filename}`,root),Buffer.from(await font.arrayBuffer()));
  css=css.replaceAll(urls[i],`/assets/${filename}`);
 }
 await writeFile(new URL(`assets/${name}.css`,root),css);
 console.log(`Saved font ${name}`);
}

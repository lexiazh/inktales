import {writeFile} from 'node:fs/promises';
for (const [name,folder] of [['Cormorant-Garamond','cormorantgaramond'],['DM-Sans','dmsans'],['Ma-Shan-Zheng','mashanzheng']]){
 const response=await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${folder}/OFL.txt`);
 if(!response.ok)throw new Error(`${name}: ${response.status}`);
 await writeFile(new URL(`../public/assets/${name}-OFL.txt`,import.meta.url),await response.text());console.log(`${name} license saved`);
}

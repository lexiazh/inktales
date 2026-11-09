import urllib.request,urllib.parse,json,pathlib,time,concurrent.futures,hashlib
pathlib.Path('.sites-runtime').mkdir(exist_ok=True)
pathlib.Path('public/evolution').mkdir(parents=True,exist_ok=True)
existing=json.loads(pathlib.Path('lib/evolution-data.json').read_text())
chars=[lesson['char'] for lesson in json.loads(pathlib.Path('lib/beginner-lessons.json').read_text()) if lesson['char'] not in existing]
stages=[('oracle','Oracle bone'),('bronze','Bronze script'),('seal','Small seal')]
headers={'User-Agent':'InkTales/1.0 (https://github.com/lexiazh/inktales; educational illustrations)'}
def get(url,timeout=15):
 return urllib.request.urlopen(urllib.request.Request(url,headers=headers),timeout=timeout)
pages={}
for start in range(0,len(chars),16):
 batch=chars[start:start+16]
 params=urllib.parse.urlencode(dict(action='query',format='json',prop='imageinfo',iiprop='url|extmetadata',iiurlwidth=120,titles='|'.join(f'File:{c}-{stage}.svg' for c in batch for stage,_ in stages)))
 meta=json.load(get('https://commons.wikimedia.org/w/api.php?'+params,30))
 pages.update({p['title']:p for p in meta['query']['pages'].values()})
records={**existing,**{c:[] for c in chars}}
def strip(s):
 import re
 return re.sub(r'\s+',' ',re.sub('<[^>]*>',' ',s or '')).strip()
def download(task):
 c,stage,label=task;p=pages.get(f'File:{c}-{stage}.svg',{});i=p.get('imageinfo',[{}])[0];m=i.get('extmetadata',{})
 record={'stage':stage,'label':label,'available':False}
 if not i:return c,record
 record.update(source=i.get('descriptionurl'),license=strip(m.get('LicenseShortName',{}).get('value')),artist=strip(m.get('Artist',{}).get('value')),description=strip(m.get('ImageDescription',{}).get('value')))
 if record['license'] not in ['Public domain','CC0']:return c,record
 path=pathlib.Path(f'public/evolution/{c}-{stage}.svg')
 if path.exists():record.update(available=True,file='/'+str(path.relative_to('public')));return c,record
 urls=[(i.get('thumburl'),'.png'),(i.get('url','').split('?')[0],'.svg')]
 for url,ext in urls:
  if not url:continue
  try:
   with get(url,10) as response:data=response.read()
   path=pathlib.Path(f'public/evolution/{c}-{stage}'+ext)
   path.write_bytes(data)
   record.update(available=True,file='/'+str(path.relative_to('public')))
   print('Saved',c,stage,ext,flush=True);return c,record
  except Exception as e:print('Unavailable',c,stage,ext,str(e)[:70],flush=True)
 return c,record
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
 for c,r in pool.map(download,[(c,s,l) for c in chars for s,l in stages]):records[c].append(r)
for p in ['public/evolution/sources.json','lib/evolution-data.json']:pathlib.Path(p).write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
print('Sourced forms:',sum(r['available'] for rs in records.values() for r in rs),'/',len(records)*3,flush=True)

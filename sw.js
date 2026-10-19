'use strict';
const CACHE='neuromancer-library-v1.0.1';
const FILES=['./','./index.html','./style.css','./data.js','./app.js','./manifest.webmanifest','./assets/icon.svg','./assets/icon-192.png','./assets/icon-512.png','./exercises/01-networks.md','./exercises/02-theory.md','./exercises/03-attention.md','./exercises/04-language.md','./exercises/05-reinforcement.md','./exercises/06-neurons.md','./exercises/07-marr.md'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('neuromancer-library-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  const url=new URL(event.request.url);url.hash='';url.search='';
  const allowed=FILES.some(file=>new URL(file,self.registration.scope).href===url.href);
  if(!allowed)return;
  event.respondWith(fetch(event.request).then(response=>{if(response.ok){const clone=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(url.href,clone)));}return response;}).catch(()=>caches.match(url.href)));
});

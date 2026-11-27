// Importa2: permite instalar el app; siempre busca lo más nuevo y, sin señal, usa lo último guardado
const CACHE='importa2-v2';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin) return;
  e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{const c=res.clone();caches.open(CACHE).then(k=>k.put(r,c));return res;}).catch(()=>caches.match(r)));
});

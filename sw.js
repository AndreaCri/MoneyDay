// Service worker di Bilancio: rende l'app disponibile offline.
// Quando pubblichi una nuova versione, cambia il numero qui sotto.
const VERSION = 'bilancio-v3';

const APP_FILES = [
  './',
  'index.html',
  'react.js',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(APP_FILES);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // La pagina: prima la rete (per ricevere gli aggiornamenti), poi la copia salvata.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        const cache = await caches.open(VERSION);
        cache.put('index.html', res.clone());
        return res;
      } catch (e) {
        return (await caches.match('index.html')) || (await caches.match('./'));
      }
    })());
    return;
  }

  // Tutto il resto (React, font, icone): prima la copia salvata, poi la rete.
  const cacheable = url.origin === location.origin ||
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com';
  if (!cacheable) return;
  event.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res && (res.ok || res.type === 'opaque')) {
        const cache = await caches.open(VERSION);
        cache.put(req, res.clone());
      }
      return res;
    } catch (e) {
      return hit || Response.error();
    }
  })());
});

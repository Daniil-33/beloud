if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const l=e=>n(e,o),c={module:{uri:o},exports:t,require:l};s[o]=Promise.all(i.map((e=>c[e]||l(e)))).then((e=>(r(...e),t)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.25fe441e.css",revision:null},{url:"assets/index.c5c50693.js",revision:null},{url:"assets/webfontloader.b777d690.js",revision:null},{url:"assets/workbox-window.prod.es5.d2780aeb.js",revision:null},{url:"index.html",revision:"c3e76142d9162be30bd8c006ab05c3cf"},{url:"favicons/fav-192x192.png",revision:"5c9b360f450e4d78f385ea15abf071b0"},{url:"favicons/fav-16x16.png",revision:"2ee48d36d2668ba0ff8552dc6eb49e46"},{url:"favicons/fav-32x32.png",revision:"423139bef705c863b9a3424aaa9e992a"},{url:"manifest.webmanifest",revision:"bcc09eaa91a164871c8632d806370772"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));

function t(t,e,r){return void 0===(t=(e.split?e.split("."):e).reduce(function(t,e){return t&&t[e]},t))?r:t}function e(t,e,r,n){return!/^(__proto__|constructor|prototype)$/.test(e)&&((e=e.split?e.split("."):e.slice(0)).slice(0,-1).reduce(function(t,e){return t[e]=t[e]||{}},t)[e.pop()]=r),t}function r(r={}){return n=>{let{key:o,opt:l,paths:s=[]}=r;o=o||"lasting",l=l||{set:(t,e)=>{try{e=JSON.stringify(e)}catch(t){console.warn("lasting set err:",t)}return localStorage.setItem(`${o}-${t}`,e)},get:t=>{let e=localStorage.getItem(`${o}-${t}`);try{e=JSON.parse(e)}catch(t){console.warn("lasting get err:",t)}return e},rm:t=>localStorage.removeItem(`${o}-${t}`)};for(let r=0;r<s.length;r++){const o=s[r],c=l.get(o);null!=c&&e(n.state,o,c),n.watch(e=>t(e,o),t=>{l.set(o,t)})}}}export{r as default};
//# sourceMappingURL=vuex-lasting.modern.js.map

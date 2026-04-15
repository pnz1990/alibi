var st=Object.defineProperty;var lt=(e,t,a)=>t in e?st(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var we=(e,t,a)=>lt(e,typeof t!="symbol"?t+"":t,a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const ct=new Set(["F","C","S","B"]);function K(e){return ct.has(e)}function ae(e){return e==="C"||e==="S"||e==="B"}function Ee(e){const t=[];for(let a=0;a<e.width;a++)for(let o=0;o<e.height;o++)if(K(e.tiles[o][a])){t.push(a);break}return t}function Re(e){const t=[];for(let a=0;a<e.height;a++)for(let o=0;o<e.width;o++)if(K(e.tiles[a][o])){t.push(a);break}return t}function L(e,t,a){for(const o of e.rooms)for(const[n,r]of o.cells)if(n===t&&r===a)return o.id;return null}function Qe(e){const t=new Set,a=new Set;for(const o of e)t.add(o.y),a.add(o.x);return{blockedRows:t,blockedCols:a}}function et(e,t){const{blockedRows:a,blockedCols:o}=Qe(t),n=[];for(let r=0;r<e.height;r++)if(!a.has(r))for(let l=0;l<e.width;l++)o.has(l)||K(e.tiles[r][l])&&n.push({x:l,y:r});return n.length===1?n[0]:null}function dt(e,t,a){const o=L(e,a.x,a.y);if(o===null)return null;for(const n of t)if(L(e,n.x,n.y)===o)return n.suspectId;return null}function Oe(e,t,a,o){return Math.max(Math.abs(e-a),Math.abs(t-o))}function Ce(e,t,a){const o=a.get(t.suspectId);if(!o)return null;switch(t.type){case"inRoom":return L(e,o.x,o.y)===t.roomId;case"notInRoom":return L(e,o.x,o.y)!==t.roomId;case"inSameRoom":{const n=a.get(t.otherSuspectId);if(!n)return null;const r=L(e,o.x,o.y),l=L(e,n.x,n.y);return r!==null&&r===l}case"inDifferentRoom":{const n=a.get(t.otherSuspectId);if(!n)return null;const r=L(e,o.x,o.y),l=L(e,n.x,n.y);return r===null||l===null?null:r!==l}case"inColumn":return o.x===t.col;case"inRow":return o.y===t.row;case"besideSuspect":{const n=a.get(t.otherSuspectId);return n?Oe(o.x,o.y,n.x,n.y)<=1:null}case"notBesideSuspect":{const n=a.get(t.otherSuspectId);return n?Oe(o.x,o.y,n.x,n.y)>1:null}case"besideObject":{for(let n=-1;n<=1;n++)for(let r=-1;r<=1;r++){if(r===0&&n===0)continue;const l=o.x+r,c=o.y+n;if(!(l<0||c<0||l>=e.width||c>=e.height)&&e.tiles[c][l]===t.objectTile)return!0}return!1}case"notBesideObject":{for(let n=-1;n<=1;n++)for(let r=-1;r<=1;r++){if(r===0&&n===0)continue;const l=o.x+r,c=o.y+n;if(!(l<0||c<0||l>=e.width||c>=e.height)&&e.tiles[c][l]===t.objectTile)return!1}return!0}case"onSeatTile":return ae(e.tiles[o.y][o.x]);case"notOnSeatTile":return!ae(e.tiles[o.y][o.x]);case"northOf":{const n=a.get(t.otherSuspectId);return n?o.y<n.y:null}case"southOf":{const n=a.get(t.otherSuspectId);return n?o.y>n.y:null}case"exactlyNRowsNorth":{const n=a.get(t.otherSuspectId);return n?n.y-o.y===t.n:null}case"exactlyNRowsSouth":{const n=a.get(t.otherSuspectId);return n?o.y-n.y===t.n:null}}}const ht={easy:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom"],medium:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile"],hard:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile","notOnSeatTile","northOf","southOf","exactlyNRowsNorth","exactlyNRowsSouth"]};function ye(e,t,a){const o=Ee(e),n=Re(e);if(t.length===0)return{count:0};if(t.length>Math.min(o.length,n.length))return{count:0};const r=new Set;for(let i=0;i<e.height;i++)for(let $=0;$<e.width;$++)K(e.tiles[i][$])&&r.add(`${$},${i}`);let l=0,c;const b=new Map,w=new Set,d=new Set;function h(i){if(l>=2)return;if(i===t.length){for(const p of a)if(Ce(e,p,b)!==!0)return;l++,l===1&&(c=new Map(b));return}const $=t[i];for(const p of n)if(!w.has(p))for(const f of o){if(d.has(f)||!r.has(`${f},${p}`))continue;const y={suspectId:$,x:f,y:p};b.set($,y),w.add(p),d.add(f);let u=!1;for(const m of a)if((m.suspectId===$||m.otherSuspectId===$)&&Ce(e,m,b)===!1){u=!0;break}if(u||h(i+1),b.delete($),w.delete(p),d.delete(f),l>=2)return}}return h(0),{count:l,firstSolution:c}}class mt extends Error{constructor(t){super(t),this.name="PuzzleGenerationError"}}function ft(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let a=Math.imul(t^t>>>15,1|t);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}function tt(e,t){return Math.floor(e()*t)}function j(e,t){return t[tt(e,t.length)]}function ee(e,t){const a=[...t];for(let o=a.length-1;o>0;o--){const n=tt(e,o+1);[a[o],a[n]]=[a[n],a[o]]}return a}function ut(e,t){return Math.max(2,e-{easy:0,medium:1,hard:2}[t])}function pt(e,t,a,o){const n=ut(t,a),r=ht[a],l=o.landmarks.length>=2,c=o.tiles.some(h=>h.some(i=>ae(i))),b=r.filter(h=>!((h==="besideObject"||h==="notBesideObject")&&!l||(h==="onSeatTile"||h==="notOnSeatTile")&&!c)),w=Math.ceil(n*.4),d=[];for(let h=0;h<n;h++){const i=new Set;d.length>0&&i.add(d[d.length-1]);for(const u of b)d.filter(x=>x===u).length>=w&&i.add(u);const $=b.filter(u=>!i.has(u)),p=$.length>0?$:b,f=p.filter(u=>!d.includes(u)),y=f.length>0?f:p;d.push(j(e,y))}return d}function q(e,t,a,o,n,r,l){const c=l.get(n.id),b=a.clueTemplates;switch(o){case"inRoom":{const w=L(t,c.x,c.y);if(!w)return null;const d=t.rooms.find(h=>h.id===w);return{type:"inRoom",suspectId:n.id,roomId:w,text:b.inRoom(n.name,d.name)}}case"notInRoom":{const w=L(t,c.x,c.y),d=t.rooms.filter(i=>i.id!==w);if(d.length===0)return null;const h=j(e,d);return{type:"notInRoom",suspectId:n.id,roomId:h.id,text:b.notInRoom(n.name,h.name)}}case"inSameRoom":{const w=L(t,c.x,c.y);if(!w)return null;const d=r.filter(i=>{if(i.id===n.id)return!1;const $=l.get(i.id);return L(t,$.x,$.y)===w});if(d.length===0)return null;const h=j(e,d);return{type:"inSameRoom",suspectId:n.id,otherSuspectId:h.id,text:b.inSameRoom(n.name,h.name)}}case"inDifferentRoom":{const w=L(t,c.x,c.y),d=r.filter(i=>{if(i.id===n.id)return!1;const $=l.get(i.id),p=L(t,$.x,$.y);return p!==null&&p!==w});if(d.length===0)return null;const h=j(e,d);return{type:"inDifferentRoom",suspectId:n.id,otherSuspectId:h.id,text:b.inDifferentRoom(n.name,h.name)}}case"inColumn":return{type:"inColumn",suspectId:n.id,col:c.x,text:b.inColumn(n.name,c.x+1)};case"inRow":return{type:"inRow",suspectId:n.id,row:c.y,text:b.inRow(n.name,c.y+1)};case"besideSuspect":{const w=r.filter(h=>{if(h.id===n.id)return!1;const i=l.get(h.id);return Math.max(Math.abs(c.x-i.x),Math.abs(c.y-i.y))<=1});if(w.length===0)return null;const d=j(e,w);return{type:"besideSuspect",suspectId:n.id,otherSuspectId:d.id,text:b.besideSuspect(n.name,d.name)}}case"notBesideSuspect":{const w=r.filter(h=>{if(h.id===n.id)return!1;const i=l.get(h.id);return Math.max(Math.abs(c.x-i.x),Math.abs(c.y-i.y))>1});if(w.length===0)return null;const d=j(e,w);return{type:"notBesideSuspect",suspectId:n.id,otherSuspectId:d.id,text:b.notBesideSuspect(n.name,d.name)}}case"besideObject":{if(t.landmarks.length===0)return null;const w=t.landmarks.filter(i=>Math.max(Math.abs(c.x-i.x),Math.abs(c.y-i.y))<=1);if(w.length===0)return null;const d=j(e,w),h=t.tiles[d.y][d.x];return{type:"besideObject",suspectId:n.id,objectTile:h,text:b.besideObject(n.name,d.name)}}case"notBesideObject":{if(t.landmarks.length===0)return null;const w=t.landmarks.filter(i=>Math.max(Math.abs(c.x-i.x),Math.abs(c.y-i.y))>1);if(w.length===0)return null;const d=j(e,w),h=t.tiles[d.y][d.x];return{type:"notBesideObject",suspectId:n.id,objectTile:h,text:b.notBesideObject(n.name,d.name)}}case"onSeatTile":{const w=t.tiles[c.y][c.x];if(!ae(w))return null;const d=w==="C"?"chair":w==="S"?"sofa":"bed";return{type:"onSeatTile",suspectId:n.id,text:b.onSeatTile(n.name,d)}}case"notOnSeatTile":{const w=t.tiles[c.y][c.x];return ae(w)?null:{type:"notOnSeatTile",suspectId:n.id,text:b.notOnSeatTile(n.name)}}case"northOf":{const w=r.filter(h=>{if(h.id===n.id)return!1;const i=l.get(h.id);return c.y<i.y});if(w.length===0)return null;const d=j(e,w);return{type:"northOf",suspectId:n.id,otherSuspectId:d.id,text:b.northOf(n.name,d.name)}}case"southOf":{const w=r.filter(h=>{if(h.id===n.id)return!1;const i=l.get(h.id);return c.y>i.y});if(w.length===0)return null;const d=j(e,w);return{type:"southOf",suspectId:n.id,otherSuspectId:d.id,text:b.southOf(n.name,d.name)}}case"exactlyNRowsNorth":{const w=[];for(const h of r){if(h.id===n.id)continue;const $=l.get(h.id).y-c.y;$>0&&w.push({suspect:h,n:$})}if(w.length===0)return null;const d=j(e,w);return{type:"exactlyNRowsNorth",suspectId:n.id,otherSuspectId:d.suspect.id,n:d.n,text:b.exactlyNRowsNorth(n.name,d.suspect.name,d.n)}}case"exactlyNRowsSouth":{const w=[];for(const h of r){if(h.id===n.id)continue;const i=l.get(h.id),$=c.y-i.y;$>0&&w.push({suspect:h,n:$})}if(w.length===0)return null;const d=j(e,w);return{type:"exactlyNRowsSouth",suspectId:n.id,otherSuspectId:d.suspect.id,n:d.n,text:b.exactlyNRowsSouth(n.name,d.suspect.name,d.n)}}}}function bt(e,t,a,o=1e3){const n=ee(e,Ee(t)),r=ee(e,Re(t)),l=a.length;if(l<1||l>Math.min(n.length,r.length))return null;let c=0;const b=new Map,w=new Set,d=new Set,h=ee(e,r).slice(0,l);function i($){if($===l)return!0;const p=a[$],f=h[$],y=ee(e,n);for(const u of y)if(!d.has(u)&&K(t.tiles[f]?.[u])){if(b.set(p.id,{suspectId:p.id,x:u,y:f}),w.add(f),d.add(u),i($+1))return!0;if(c++,b.delete(p.id),w.delete(f),d.delete(u),c>=o)return!1}return!1}return i(0)?b:null}function wt(e,t,a){for(let n=0;n<20;n++){const r=e+n*97>>>0,l=ft(r),c=t.floorPlans[a],b=Ee(c),w=Re(c),d=Math.min(b.length,w.length)-1;if(d<2)continue;const i=t.suspectNames.slice(0,d).map((E,z)=>({id:`s${z}`,name:E})),$=j(l,t.victimNames),p=bt(l,c,i);if(!p)continue;const f=Array.from(p.values()),y=et(c,f);if(!y)continue;const u=dt(c,f,y);if(!u)continue;const m=i.find(E=>E.id===u),x=j(l,t.narrativeTemplates.intro),F=j(l,t.narrativeTemplates.victimFound),g=j(l,t.narrativeTemplates.guiltyText).replace("{{killerName}}",m.name).replace("{{evidenceText}}","the evidence is conclusive"),T=pt(l,d,a,c),R=T.length,A=[],V=ee(l,[...i]);for(let E=0;E<R;E++){const z=V[E],I=T[E];let M=q(l,c,t,I,z,i,p);M||(M=q(l,c,t,"inRow",z,i,p)),M||(M=q(l,c,t,"inColumn",z,i,p)),M&&A.push(M)}let B=ye(c,i.map(E=>E.id),A);if(B.count!==0){if(B.count!==1)for(const E of i){if(B.count===1)break;if(!A.some(I=>I.type==="inRow"&&I.suspectId===E.id)){const I=q(l,c,t,"inRow",E,i,p);I&&A.push(I),B=ye(c,i.map(M=>M.id),A)}}if(B.count!==1)for(const E of i){if(B.count===1)break;if(!A.some(I=>I.type==="inColumn"&&I.suspectId===E.id)){const I=q(l,c,t,"inColumn",E,i,p);I&&A.push(I),B=ye(c,i.map(M=>M.id),A)}}if(B.count===1)return{seed:r,themeId:t.id,difficulty:a,suspects:i,victimName:$,clues:A,solution:p,victimCell:y,killer:m,narrativeIntro:x,narrativeVictimFound:F,narrativeGuilty:g,floorPlan:c}}}throw new mt(`Failed to generate unique puzzle after 20 retries (seed=${e}, theme=${t.id}, difficulty=${a})`)}function s(e,t){let a=0;for(let o=0;o<t.length;o++)a=Math.imul(31,a)+t.charCodeAt(o)|0;return e[Math.abs(a)%e.length]}const yt={width:5,height:6,tiles:[["bB","bB","bB","W","W"],["F","F","F","C","F"],["pL","F","C","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"],["W","cR","W","F","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[3,1],[4,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"restroom",name:"Restroom",cells:[[1,5],[3,5],[4,5]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-entrance",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},$t={width:6,height:7,tiles:[["bB","bB","bB","bB","W","W"],["F","F","F","F","C","F"],["pL","F","C","F","F","F"],["F","S","F","pL","F","C"],["F","F","tB","F","F","F"],["C","F","F","F","W","F"],["W","cR","W","W","W","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5]]},{id:"restroom",name:"Restroom",cells:[[1,6],[5,5],[5,6]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-door",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:3,y:3},{id:"table",name:"the table",x:2,y:4},{id:"cash-register",name:"the cash register",x:1,y:6}]},gt={width:7,height:8,tiles:[["bB","bB","bB","bB","bB","W","W"],["F","F","F","F","F","C","F"],["F","C","F","pL","F","F","F"],["pL","F","S","F","C","F","pL"],["F","F","F","tB","F","F","F"],["F","C","F","F","F","tB","C"],["F","F","F","F","F","W","F"],["W","cR","W","F","C","W","F"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]]},{id:"main-area",name:"Main Area",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[6,6]]},{id:"restroom",name:"Restroom",cells:[[1,7]]},{id:"back-office",name:"Back Office",cells:[[3,7],[4,7],[6,7]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-1",name:"the plant",x:3,y:2},{id:"plant-2",name:"the plant",x:0,y:3},{id:"plant-3",name:"the plant",x:6,y:3},{id:"table",name:"the table",x:3,y:4},{id:"table-2",name:"the small table",x:5,y:5},{id:"cash-register",name:"the cash register",x:1,y:7}]},xt={width:5,height:5,tiles:[["sH","F","W","sH","sH"],["F","F","W","F","F"],["sH","F","tB","F","sH"],["F","F","F","F","F"],["F","cR","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[2,3]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,3],[4,3]]},{id:"checkout",name:"Checkout",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:3,y:0},{id:"shelf-3",name:"the shelf",x:4,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:4,y:2},{id:"table",name:"the table",x:2,y:2},{id:"cash-register",name:"the cash register",x:1,y:4}]},Ft={width:6,height:6,tiles:[["sH","F","W","W","sH","sH"],["F","F","W","F","F","F"],["sH","F","F","F","F","sH"],["F","F","W","F","tB","F"],["F","F","F","F","F","F"],["F","cR","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,2],[3,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,1],[4,1],[5,1],[3,2],[4,2],[5,2],[4,3],[5,3]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,4],[4,4],[5,4]]},{id:"checkout",name:"Checkout",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:4,y:0},{id:"shelf-3",name:"the shelf",x:5,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:5,y:2},{id:"table",name:"the table",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},vt={width:7,height:7,tiles:[["sH","F","F","W","sH","sH","sH"],["F","F","sH","W","F","F","F"],["sH","F","F","tB","F","F","sH"],["F","F","W","W","F","tB","F"],["sH","F","F","F","F","F","F"],["F","F","F","F","F","F","sH"],["F","cR","C","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,1],[3,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"romance-novels",name:"Romance Novels",cells:[[4,3],[5,3],[6,3],[3,4],[4,4],[5,4],[6,4],[3,5],[4,5],[5,5]]},{id:"collectors",name:"Collector's Corner",cells:[[6,5]]},{id:"checkout",name:"Checkout",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"shelf-crime",name:"the shelf",x:0,y:0},{id:"shelf-nonfic-1",name:"the shelf",x:4,y:0},{id:"shelf-nonfic-2",name:"the shelf",x:5,y:0},{id:"shelf-nonfic-3",name:"the shelf",x:6,y:0},{id:"shelf-crime-2",name:"the shelf",x:0,y:2},{id:"shelf-nonfic-4",name:"the shelf",x:6,y:2},{id:"table-1",name:"the reading table",x:3,y:2},{id:"table-2",name:"the table",x:5,y:3},{id:"shelf-best",name:"the shelf",x:0,y:4},{id:"shelf-collect",name:"the shelf",x:6,y:5},{id:"cash-register",name:"the cash register",x:1,y:6}]},kt={width:5,height:5,tiles:[["pL","F","W","jZ","jZ"],["F","F","W","jZ","C"],["pL","F","F","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[3,0],[4,0],[3,1],[4,1]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:0,y:2},{id:"plant-3",name:"the plant",x:4,y:3},{id:"jacuzzi",name:"the jacuzzi",x:3,y:0}]},Ct={width:6,height:7,tiles:[["pL","F","F","W","jZ","jZ"],["F","F","F","W","jZ","C"],["F","pL","F","F","F","F"],["W","W","W","W","W","W"],["B","F","F","S","F","F"],["F","F","tV","F","F","F"],["F","F","W","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[4,0],[5,0],[4,1],[5,1]]},{id:"deck",name:"Deck",cells:[[3,2],[4,2],[5,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:1,y:2},{id:"jacuzzi",name:"the jacuzzi",x:4,y:0},{id:"tv",name:"the TV",x:2,y:5}]},St={width:7,height:8,tiles:[["pL","F","F","F","W","jZ","jZ"],["F","F","pL","F","W","jZ","C"],["F","F","F","F","F","C","F"],["W","W","W","W","W","W","W"],["B","F","F","S","F","F","W"],["F","F","tV","F","F","pL","W"],["W","W","W","cT","F","F","W"],["W","W","F","F","F","W","W"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[5,0],[6,0],[5,1],[6,1]]},{id:"deck",name:"Deck",cells:[[4,2],[5,2],[6,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5]]},{id:"kitchen",name:"Kitchen",cells:[[3,6],[4,6],[5,6],[2,7],[3,7],[4,7]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:2,y:1},{id:"plant-3",name:"the plant",x:5,y:5},{id:"jacuzzi",name:"the jacuzzi",x:5,y:0},{id:"tv",name:"the TV",x:2,y:5},{id:"counter",name:"the counter",x:3,y:6}]},Tt={width:5,height:6,tiles:[["sT","F","F","F","sT"],["F","F","W","F","F"],["F","F","F","F","F"],["tD","F","F","F","sH"],["F","C","F","F","F"],["F","F","W","cR","F"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1]]},{id:"santas-village",name:"Santa's Village",cells:[[2,0],[3,0],[3,1],[0,3],[1,3],[2,3],[0,4],[1,4],[2,4]]},{id:"toy-store",name:"Toy Store",cells:[[4,0],[4,1]]},{id:"walkway",name:"Walkway",cells:[[0,2],[1,2],[2,2],[3,2],[4,2]]},{id:"bookstore",name:"Bookstore",cells:[[3,3],[4,3],[3,4],[4,4]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[0,5],[1,5],[3,5],[4,5]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:4,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:3},{id:"shelf",name:"the shelf",x:4,y:3},{id:"cash-register",name:"the cash register",x:3,y:5}]},Et={width:7,height:7,tiles:[["sT","F","F","W","F","F","sT"],["F","F","W","F","F","F","F"],["F","F","F","F","F","W","F"],["F","F","F","F","F","F","F"],["tD","F","F","W","F","sH","F"],["F","C","F","W","F","F","C"],["F","F","W","F","cR","F","F"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"santas-village",name:"Santa's Village",cells:[[3,1],[4,1],[5,1],[6,1],[3,2],[4,2],[5,2]]},{id:"santas-lodge",name:"Santa's Lodge",cells:[[4,0],[5,0],[6,0]]},{id:"toy-store",name:"Toy Store",cells:[[6,2],[5,3],[6,3],[4,4],[5,4],[6,4],[5,5],[6,5]]},{id:"walkway",name:"Walkway",cells:[[0,3],[1,3],[2,3],[3,3],[4,3]]},{id:"food-court",name:"Food Court",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[0,6],[1,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:6,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:4},{id:"shelf",name:"the shelf",x:5,y:4},{id:"cash-register",name:"the cash register",x:4,y:6}]},Rt={width:8,height:8,tiles:[["sT","F","F","W","F","F","F","sT"],["F","F","W","F","F","F","F","F"],["F","F","F","F","F","W","F","F"],["F","F","F","F","F","F","F","F"],["tD","F","F","W","F","sH","F","F"],["F","C","F","W","F","F","C","F"],["F","F","W","F","cR","F","F","F"],["F","F","F","F","F","F","F","tR"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[0,3],[1,3]]},{id:"santas-lodge",name:"Santa's Lodge",cells:[[4,0],[5,0],[6,0],[7,0],[4,1],[5,1],[6,1],[7,1]]},{id:"santas-village",name:"Santa's Village",cells:[[3,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]]},{id:"toy-store",name:"Toy Store",cells:[[6,2],[7,2],[6,3],[7,3],[6,4],[7,4],[6,5],[7,5]]},{id:"walkway",name:"Walkway",cells:[[2,2],[2,3],[2,4],[3,4],[4,4],[2,5],[2,6]]},{id:"food-court",name:"Food Court",cells:[[0,4],[1,4],[0,5],[1,5],[0,6],[1,6],[0,7],[1,7],[2,7]]},{id:"bookstore",name:"Bookstore",cells:[[5,4],[5,5],[4,6],[5,6],[6,6],[7,6]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[3,6],[3,7],[4,7],[5,7],[6,7],[7,7]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:7,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:4},{id:"shelf",name:"the shelf",x:5,y:4},{id:"cash-register",name:"the cash register",x:4,y:6},{id:"tree",name:"the Christmas tree",x:7,y:7}]},Wt={width:5,height:5,tiles:[["cT","cT","W","F","C"],["F","F","W","F","F"],["F","C","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"dining-room",name:"Dining Room",cells:[[3,0],[4,0],[3,1],[4,1],[2,2],[3,2],[4,2]]},{id:"bar",name:"Bar",cells:[[2,1]]},{id:"restroom",name:"Restroom",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0}]},Nt={width:6,height:6,tiles:[["cT","cT","cT","W","F","C"],["F","F","F","W","F","F"],["F","C","F","F","F","F"],["F","F","F","F","C","F"],["W","W","W","W","W","W"],["F","F","F","C","F","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},{id:"dining-room",name:"Dining Room",cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]]},{id:"bar",name:"Bar",cells:[[3,1]]},{id:"private-room",name:"Private Room",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0},{id:"counter-3",name:"the counter",x:2,y:0}]},Mt={width:7,height:7,tiles:[["cT","cT","cT","cT","W","F","C"],["F","F","F","F","W","F","F"],["F","C","F","F","F","F","F"],["F","F","F","F","C","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","C","F","F","C","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"dining-room",name:"Dining Room",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3],[4,4],[5,4],[6,4]]},{id:"bar",name:"Bar",cells:[[4,1],[0,4],[1,4],[2,4],[3,4]]},{id:"restroom",name:"Restroom",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0},{id:"counter-3",name:"the counter",x:2,y:0},{id:"counter-4",name:"the counter",x:3,y:0}]},At={width:5,height:5,tiles:[["wT","F","W","tM","tM"],["F","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"cardio",name:"Cardio",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"weight-rack",name:"the weight rack",x:0,y:0},{id:"treadmill-1",name:"the treadmill",x:3,y:0},{id:"treadmill-2",name:"the treadmill",x:4,y:0}]},It={width:6,height:7,tiles:[["wT","F","W","tM","tM","F"],["F","F","W","F","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","jZ","jZ"],["F","C","F","F","jZ","C"],["F","F","W","F","F","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"cardio",name:"Cardio",cells:[[3,0],[4,0],[5,0],[3,1],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"pool",name:"Pool",cells:[[4,4],[5,4],[4,5],[5,5]]},{id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[0,5],[1,5],[2,5],[3,5]]},{id:"sauna",name:"Sauna",cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]}],landmarks:[{id:"weight-rack",name:"the weight rack",x:0,y:0},{id:"treadmill-1",name:"the treadmill",x:3,y:0},{id:"treadmill-2",name:"the treadmill",x:4,y:0},{id:"pool",name:"the pool",x:4,y:4}]},Pt={width:7,height:8,tiles:[["wT","wT","F","W","tM","tM","F"],["F","F","F","W","F","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","jZ","jZ","jZ"],["F","C","F","F","jZ","C","jZ"],["F","F","W","F","F","F","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},{id:"cardio",name:"Cardio",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"studio",name:"Studio",cells:[[3,2],[3,3]]},{id:"pool",name:"Pool",cells:[[4,5],[5,5],[6,5],[4,6],[5,6],[6,6]]},{id:"locker-room",name:"Locker Room",cells:[[0,5],[1,5],[2,5],[3,5],[0,6],[1,6],[2,6],[3,6]]},{id:"sauna",name:"Sauna",cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"weight-rack-1",name:"the weight rack",x:0,y:0},{id:"weight-rack-2",name:"the weight rack",x:1,y:0},{id:"treadmill-1",name:"the treadmill",x:4,y:0},{id:"treadmill-2",name:"the treadmill",x:5,y:0},{id:"pool",name:"the pool",x:4,y:5}]},Bt={width:5,height:5,tiles:[["dK","F","W","F","C"],["F","F","W","F","F"],["F","C","F","F","F"],["W","W","W","W","W"],["F","F","pC","F","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"meeting-room",name:"Meeting Room",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"kitchen",name:"Kitchen",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"desk",name:"the desk",x:0,y:0},{id:"photocopier",name:"the photocopier",x:2,y:4}]},Ot={width:6,height:6,tiles:[["dK","F","F","W","F","C"],["F","F","F","W","F","F"],["F","C","F","F","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","pC","F","F","C","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},{id:"meeting-room",name:"Meeting Room",cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"reception",name:"Reception",cells:[[3,1]]},{id:"kitchen",name:"Kitchen",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"desk",name:"the desk",x:0,y:0},{id:"photocopier",name:"the photocopier",x:1,y:5}]},jt={width:7,height:7,tiles:[["dK","F","F","F","W","F","C"],["F","F","F","F","W","F","F"],["F","C","F","F","F","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","dK","F"],["W","W","W","W","W","W","W"],["F","pC","F","F","C","F","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3],[0,4],[1,4],[2,4],[3,4]]},{id:"meeting-room",name:"Meeting Room",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"server-room",name:"Server Room",cells:[[4,4],[5,4],[6,4]]},{id:"kitchen",name:"Kitchen",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"desk-1",name:"the desk",x:0,y:0},{id:"desk-2",name:"the manager's desk",x:5,y:4},{id:"photocopier",name:"the photocopier",x:1,y:6}]},Lt={width:5,height:5,tiles:[["fB","F","F","F","fB"],["F","F","F","F","F"],["pL","F","C","F","pL"],["F","F","F","F","F"],["F","F","fB","F","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[0,2],[1,2],[2,2],[3,2],[4,2]]},{id:"gazebo",name:"Gazebo",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:4,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:4,y:2},{id:"flower-bed-3",name:"the flower bed",x:2,y:4}]},zt={width:6,height:6,tiles:[["fB","F","F","F","F","fB"],["F","F","F","F","F","F"],["pL","F","C","F","C","pL"],["F","F","F","F","F","F"],["F","F","jZ","jZ","F","F"],["F","F","jZ","jZ","fB","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]]},{id:"gazebo",name:"Gazebo",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},{id:"pool-area",name:"Pool Area",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:5,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:5,y:2},{id:"pool",name:"the pool",x:2,y:4},{id:"flower-bed-3",name:"the flower bed",x:4,y:5}]},Ht={width:7,height:8,tiles:[["fB","F","F","F","F","F","fB"],["F","F","F","F","F","F","F"],["pL","F","C","F","C","F","pL"],["F","F","F","F","F","F","F"],["F","F","jZ","jZ","jZ","F","F"],["F","F","jZ","jZ","jZ","fB","F"],["fB","F","F","W","F","F","fB"],["F","F","F","W","F","F","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3]]},{id:"pool-area",name:"Pool Area",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5]]},{id:"greenhouse",name:"Greenhouse",cells:[[0,6],[1,6],[2,6],[0,7],[1,7],[2,7]]},{id:"garage",name:"Garage",cells:[[4,6],[5,6],[6,6],[4,7],[5,7],[6,7]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:6,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:6,y:2},{id:"pool",name:"the pool",x:2,y:4},{id:"flower-bed-3",name:"the flower bed",x:5,y:5},{id:"flower-bed-4",name:"the flower bed",x:0,y:6},{id:"flower-bed-5",name:"the flower bed",x:6,y:6}]},Vt={width:5,height:5,tiles:[["hB","F","W","F","C"],["hB","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","mC","F","C","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"waiting-room",name:"Waiting Room",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:1,y:4}]},Dt={width:6,height:7,tiles:[["hB","F","F","W","F","C"],["hB","F","F","W","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","mC","F"],["F","C","F","F","F","F"],["F","F","W","F","C","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]]},{id:"operating-theatre",name:"Operating Theatre",cells:[[4,0],[5,0],[4,1],[5,1]]},{id:"waiting-room",name:"Waiting Room",cells:[[3,1]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]},{id:"cafeteria",name:"Cafeteria",cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:4,y:4}]},_t={width:7,height:8,tiles:[["hB","F","F","F","W","F","C"],["hB","hB","F","F","W","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","mC","F","F"],["F","C","F","F","F","F","C"],["F","F","W","F","C","F","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"operating-theatre",name:"Operating Theatre",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"waiting-room",name:"Waiting Room",cells:[[4,1]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]},{id:"cafeteria",name:"Cafeteria",cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"hospital-bed-3",name:"the hospital bed",x:1,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:4,y:5}]},Yt={width:5,height:5,tiles:[["cH","F","W","sT","sT"],["cH","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"food-stands",name:"Food Stands",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"ticket-booth",name:"Ticket Booth",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"stall-1",name:"the stall",x:3,y:0},{id:"stall-2",name:"the stall",x:4,y:0}]},Gt={width:6,height:7,tiles:[["cH","F","F","W","sT","sT"],["cH","F","F","W","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","F","F"],["F","C","F","F","C","F"],["F","F","W","F","F","F"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,2]]},{id:"food-stands",name:"Food Stands",cells:[[4,0],[5,0],[4,1],[5,1],[4,2],[5,2]]},{id:"funhouse",name:"Funhouse",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},{id:"ticket-booth",name:"Ticket Booth",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"stall-1",name:"the stall",x:4,y:0},{id:"stall-2",name:"the stall",x:5,y:0}]},Kt={width:7,height:8,tiles:[["cH","F","F","F","W","sT","sT"],["cH","cH","F","F","W","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","F","F","F"],["F","C","F","F","C","F","F"],["F","F","W","F","F","F","C"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"food-stands",name:"Food Stands",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"funhouse",name:"Funhouse",cells:[[0,5],[1,5],[2,5],[0,6],[1,6],[2,6],[0,7],[1,7]]},{id:"backstage",name:"Backstage",cells:[[3,5],[4,5],[5,5],[6,5],[3,6],[4,6],[5,6],[6,6],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"carousel-horse-3",name:"the carousel horse",x:1,y:1},{id:"stall-1",name:"the stall",x:5,y:0},{id:"stall-2",name:"the stall",x:6,y:0}]},C={"coffee-shop":{easy:yt,medium:$t,hard:gt},bookstore:{easy:xt,medium:Ft,hard:vt},backyard:{easy:kt,medium:Ct,hard:St},"holiday-mall":{easy:Tt,medium:Et,hard:Rt},restaurant:{easy:Wt,medium:Nt,hard:Mt},gym:{easy:At,medium:It,hard:Pt},office:{easy:Bt,medium:Ot,hard:jt},"garden-party":{easy:Lt,medium:zt,hard:Ht},hospital:{easy:Vt,medium:Dt,hard:_t},carnival:{easy:Yt,medium:Gt,hard:Kt}};function ie(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Ut={inRoom:(e,t)=>s([`${e} was in the ${t}.`,`${e} was spotted in the ${t}.`,`Witnesses placed ${e} in the ${t}.`,`According to staff, ${e} was in the ${t}.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} was nowhere near the ${t}.`,`Staff confirmed ${e} was not in the ${t}.`,`${e} never entered the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was in the same area as ${t}.`,`${e} and ${t} were seen together.`,`A regular noticed ${e} near ${t}.`,`${e} shared a space with ${t}.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different parts of the café.`,`${e} was nowhere near ${t}.`,`${e} and ${t} were not in the same area.`,`${t} confirmed they weren't near ${e}.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${ie(t)} column.`,`${e} stood in column ${t}.`,`${e}'s position was the ${ie(t)} column from the left.`],e+t),inRow:(e,t)=>s([`${e} was in the ${ie(t)} row.`,`${e} sat in row ${t}.`,`${e}'s seat was on the ${ie(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was standing next to ${t}.`,`${e} was right beside ${t}.`,`${e} and ${t} were adjacent.`,`A barista saw ${e} just one step from ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} kept their distance.`,`${e} was not close to ${t}.`,`${t} said ${e} was not nearby.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was right next to ${t}.`,`${e} was seen just by ${t}.`,`The security feed shows ${e} near ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not beside ${t}.`,`${e} was nowhere near ${t}.`,`${e} was far from ${t}.`],e+t),onSeatTile:(e,t)=>t==="chair"?s([`${e} was sitting in a chair.`,`${e} had taken a seat.`,`${e} was seated at the time.`],e):t==="sofa"?s([`${e} was on the sofa.`,`${e} had settled onto the sofa.`,`${e} was lounging on the sofa.`],e):`${e} was on the ${t}.`,notOnSeatTile:e=>s([`${e} was not sitting down.`,`${e} was on their feet.`,`${e} remained standing.`,`${e} never took a seat.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was positioned above ${t} on the floor plan.`,`${e} was closer to the entrance than ${t}.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was further back than ${t}.`,`${e} was positioned below ${t} on the floor plan.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} sat ${a} row${a>1?"s":""} ahead of ${t}.`,`There were exactly ${a} row${a>1?"s":""} between ${e} and ${t}, with ${e} to the north.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} sat ${a} row${a>1?"s":""} behind ${t}.`,`There were exactly ${a} row${a>1?"s":""} between ${e} and ${t}, with ${e} to the south.`],e+t+a)},qt={id:"coffee-shop",name:"The Coffee Shop",floorPlans:{easy:C["coffee-shop"].easy,medium:C["coffee-shop"].medium,hard:C["coffee-shop"].hard},suspectNames:["Alice","Ben","Chloe","Diego","Elena","Finlay","Grace","Hassan","Iris","Jake","Kai","Lena"],victimNames:["Victor","Violet","Vera","Valencia","Vance","Vivian"],clueTemplates:Ut,narrativeTemplates:{intro:["A body has been found at the Copper Bean Café. The morning rush never arrived — instead, the regulars found yellow tape across the door. You pour yourself an espresso and get to work.","The Copper Bean Café is closed for a very different reason today. Someone is dead, and the witnesses are all still clutching their lattes. You take out your notebook.","It was supposed to be a quiet Tuesday at the Copper Bean. Then the screaming started. Now it's your problem. You order a black coffee and begin."],victimFound:["The victim was discovered near table four, cold cup of coffee still in hand.","Staff found the victim behind the counter during the morning prep.","A regular spotted the victim slumped in the corner booth before opening."],guiltyText:["{{killerName}} — served with a side of motive.","{{killerName}} — the evidence is as clear as an Americano.","{{killerName}} — there's no running from the detective on this one."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:plant":"","object:cash-register":"","object:table":""}};function oe(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Zt={inRoom:(e,t)=>s([`${e} was browsing in the ${t}.`,`${e} was found in the ${t} section.`,`The clerk placed ${e} in the ${t}.`,`${e} spent time in the ${t}.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} never set foot in the ${t} section.`,`The clerk confirmed ${e} wasn't in the ${t}.`,`${e} was nowhere near the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was in the same section as ${t}.`,`A customer spotted ${e} browsing alongside ${t}.`,`${e} and ${t} were seen in the same aisle.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different sections.`,`${e} was nowhere near ${t}'s section.`,`The clerk noted ${e} and ${t} were apart.`,`${e} and ${t} didn't share a section.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${oe(t)} column.`,`${e} stood in column ${t}.`,`${e}'s position was the ${oe(t)} column from the left.`],e+t),inRow:(e,t)=>s([`${e} was in the ${oe(t)} row.`,`${e} was browsing along row ${t}.`,`${e}'s position was on the ${oe(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was standing right next to ${t}.`,`${e} was browsing just beside ${t}.`,`${e} and ${t} were in adjacent spots.`,`A witness saw ${e} shoulder-to-shoulder with ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} were not in the same aisle.`,`${e} kept well away from ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was standing near ${t}.`,`${e} was right beside ${t}.`,`${e} was seen next to ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} kept away from ${t}.`],e+t),onSeatTile:(e,t)=>t==="chair"?s([`${e} was sitting in a reading chair.`,`${e} had settled into one of the chairs.`,`${e} was seated at the time.`],e):`${e} was sitting on the ${t}.`,notOnSeatTile:e=>s([`${e} was not sitting down.`,`${e} was browsing on their feet.`,`${e} remained standing.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was in the front section, closer to the door than ${t}.`,`${e} was ahead of ${t} in the store.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was in the back of the store, behind ${t}.`,`${e} was further from the entrance than ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} stood ${a} row${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} stood ${a} row${a>1?"s":""} behind ${t}.`],e+t+a)},Jt={id:"bookstore",name:"The Bookstore",floorPlans:{easy:C.bookstore.easy,medium:C.bookstore.medium,hard:C.bookstore.hard},suspectNames:["Alex","Bridget","Colin","Diana","Edmund","Fiona","George","Hannah","Ivan","Julia","Kevin","Lydia"],victimNames:["Vincent","Valerie","Violet","Victor","Vera","Valencia"],clueTemplates:Zt,narrativeTemplates:{intro:["The First Chapter Bookshop opened this morning to find more than just dust between the shelves. Someone is dead, and the regulars are still clutching their Earl Grey. You step over the crime scene tape and start asking questions.","A reader never returns a book. This one never returned at all. The First Chapter Bookshop is closed indefinitely — and you're the reason it might reopen. Notebook out.","Mondays at the bookshop are quiet. This Monday is the quietest it's ever been. The body was found in the stacks before the first customer arrived. You're on the case."],victimFound:["The victim was discovered slumped against the shelf in the early morning.","A shop assistant found the victim face-down near the reading table.","The victim was found between the shelves before opening time."],guiltyText:["{{killerName}} — the ending nobody saw coming.","{{killerName}} — the plot twist is on the last page.","{{killerName}} — even mysteries have their answers."]},colorPalette:{floor:"#f0ead6",wall:"#3d2b1f",seat:"#7a5c3a",accent:"#8b1a1a",background:"#1a1510",text:"#ffffff"},spriteMap:{"object:shelf":"","object:table":"","object:cash-register":""}};function re(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Xt={inRoom:(e,t)=>s([`${e} was in the ${t}.`,`${e} was spotted out in the ${t}.`,`A neighbor saw ${e} in the ${t}.`,`${e} was hanging around the ${t}.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} never went near the ${t}.`,`A guest confirmed ${e} wasn't in the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was in the same area as ${t}.`,`${e} and ${t} were seen hanging out together.`,`A neighbor spotted ${e} near ${t}.`,`${e} was keeping close to ${t}.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different parts of the yard.`,`${e} was nowhere near ${t}.`,`${e} and ${t} weren't in the same area.`,`${t} said they weren't near ${e} all afternoon.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${re(t)} column.`,`${e} stood in column ${t}.`,`${e}'s spot was the ${re(t)} column over.`],e+t),inRow:(e,t)=>s([`${e} was in the ${re(t)} row.`,`${e} was along row ${t}.`,`${e}'s position was on the ${re(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was right next to ${t}.`,`${e} was standing just beside ${t}.`,`${e} and ${t} were right next to each other.`,`Someone saw ${e} an arm's length from ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} kept apart.`,`${e} was nowhere near ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was seen next to ${t}.`,`${e} was hanging around ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} stayed well away from ${t}.`],e+t),onSeatTile:(e,t)=>s(t==="sofa"?[`${e} was on the outdoor sofa.`,`${e} had kicked back on the sofa.`,`${e} was lounging on the sofa.`]:t==="bed"?[`${e} was in the bedroom.`,`${e} had retreated inside to the bedroom.`]:[`${e} was sitting in a chair.`,`${e} had taken one of the lawn chairs.`],e),notOnSeatTile:e=>s([`${e} was not sitting down.`,`${e} was up and about.`,`${e} was on their feet the whole time.`,`${e} never took a seat.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was closer to the fence than ${t}.`,`${e} was in front of ${t} on the property.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was deeper in the yard than ${t}.`,`${e} was behind ${t} on the property.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} step${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} step${a>1?"s":""} behind ${t}.`],e+t+a)},Qt={id:"backyard",name:"The Backyard",floorPlans:{easy:C.backyard.easy,medium:C.backyard.medium,hard:C.backyard.hard},suspectNames:["Aaron","Becca","Chad","Donna","Eric","Fran","Greg","Helen","Ian","Jess","Kurt","Lisa"],victimNames:["Victor","Vanessa","Vince","Vera","Valentina","Virgil"],clueTemplates:Xt,narrativeTemplates:{intro:["The Hendersons were supposed to be hosting a barbecue. Instead, they're hosting a detective. Someone is dead in the backyard and the potato salad is getting warm. You flash your badge.","Summer parties end in hangovers, not homicides. Usually. The backyard of 14 Maple Drive is now a crime scene and you're the one who has to ruin everyone's weekend.","It was a perfect Sunday afternoon until it wasn't. The body was found near the jacuzzi before anyone noticed their drink had gone untouched. You arrive with your notepad."],victimFound:["The victim was found floating face-down near the jacuzzi.","A guest discovered the victim collapsed on the deck.","The victim was found on the grass between the patio chairs."],guiltyText:["{{killerName}} — summer is ruined.","{{killerName}} — the neighborhood will never be the same.","{{killerName}} — nobody escapes the backyard detective."]},colorPalette:{floor:"#d4e8c2",wall:"#5d4037",seat:"#8d6e63",accent:"#e64a19",background:"#1a200f",text:"#ffffff"},spriteMap:{"object:plant":"","object:jacuzzi-tile":"","object:tv":"","object:sofa":""}};function se(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ea={inRoom:(e,t)=>s([`${e} was in the ${t}.`,`${e} was spotted in the ${t}.`,`Security cameras placed ${e} in the ${t}.`,`${e} spent time shopping in the ${t}.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} never entered the ${t}.`,`Security confirmed ${e} didn't visit the ${t}.`,`${e} was nowhere near the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was shopping in the same area as ${t}.`,`${e} and ${t} were seen near each other.`,`A store clerk spotted ${e} alongside ${t}.`,`${e} was browsing beside ${t}.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different parts of the mall.`,`${e} was nowhere near ${t}'s section.`,`${e} and ${t} didn't cross paths in the same store.`,`${t} confirmed they weren't near ${e}.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${se(t)} column.`,`${e} stood in column ${t}.`,`${e}'s position was the ${se(t)} column.`],e+t),inRow:(e,t)=>s([`${e} was in the ${se(t)} row.`,`${e} was along row ${t}.`,`${e}'s spot was on the ${se(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was standing right next to ${t}.`,`${e} was just a step away from ${t}.`,`${e} and ${t} were side by side.`,`A shopper saw ${e} right beside ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} kept their distance.`,`${e} was not close to ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was seen next to ${t}.`,`${e} was standing near ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} stayed away from ${t}.`],e+t),onSeatTile:(e,t)=>s([`${e} was sitting${t==="chair"?" in a chair":" on a "+t}.`,`${e} had taken a seat in the mall.`,`${e} was resting on a bench.`],e),notOnSeatTile:e=>s([`${e} was not sitting down.`,`${e} was on their feet.`,`${e} kept moving, never sat down.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was in the front section of the mall relative to ${t}.`,`${e} was closer to the main entrance than ${t}.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was deeper in the mall than ${t}.`,`${e} was further from the entrance than ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} section${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} section${a>1?"s":""} behind ${t}.`],e+t+a)},ta={id:"holiday-mall",name:"The Holiday Mall",floorPlans:{easy:C["holiday-mall"].easy,medium:C["holiday-mall"].medium,hard:C["holiday-mall"].hard},suspectNames:["Ashley","Brett","Cameron","Denise","Eli","Felicia","Grant","Holly","Irving","Jade","Kyle","Leighton"],victimNames:["Victor","Vivian","Vera","Valencia","Vince","Velma"],clueTemplates:ea,narrativeTemplates:{intro:["The North Pole Mall was supposed to close early for the holiday rush. Instead, it's closed indefinitely. The security cameras caught everything except whoever did this. You wade through the tinsel.","Christmas shopping season. The most wonderful time of year — unless you're the one who ends up under the tree with a chalk outline. You badge your way in through the entrance.","The last thing anyone expects on December 23rd is a murder at the mall. The second-to-last thing is the detective they send. Here you are anyway."],victimFound:["The victim was discovered near the gift-wrapping station before the mall opened.","Security found the victim in the walkway between the stalls.","A store manager found the victim near the Christmas tree display."],guiltyText:["{{killerName}} — some gifts aren't worth giving.","{{killerName}} — unwrapped at last.","{{killerName}} — the season's greetings end here."]},colorPalette:{floor:"#e8e0d0",wall:"#2c3e50",seat:"#7f8c8d",accent:"#c0392b",background:"#0d1117",text:"#ffffff"},spriteMap:{"object:stall":"","object:shelf":"","object:cash-register":"","object:tree":"","object:teddy-bear":""}};function le(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const aa={inRoom:(e,t)=>s([`${e} was in the ${t}.`,`${e} was seen dining in the ${t}.`,`The maître d' placed ${e} in the ${t}.`,`${e} was observed in the ${t} that evening.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} never passed through the ${t}.`,`Staff confirmed ${e} wasn't in the ${t}.`,`${e} was nowhere near the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was dining in the same area as ${t}.`,`${e} and ${t} shared the same section of the restaurant.`,`A waiter saw ${e} near ${t}.`,`${e} was at the same table section as ${t}.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different parts of the restaurant.`,`${e} was not dining near ${t}.`,`The host confirmed ${e} and ${t} were seated apart.`,`${e} and ${t} never crossed paths that evening.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${le(t)} column.`,`${e} was seated in column ${t}.`,`${e}'s table was in the ${le(t)} column.`],e+t),inRow:(e,t)=>s([`${e} was in the ${le(t)} row.`,`${e} was seated along row ${t}.`,`${e}'s table was on the ${le(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was seated right next to ${t}.`,`${e} and ${t} were at adjacent tables.`,`${e} was barely an arm's length from ${t}.`,`A server noted ${e} right beside ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} were not at adjacent tables.`,`${e} was seated well away from ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was seated next to ${t}.`,`The floor plan shows ${e} right by ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e}'s seat was well away from ${t}.`],e+t),onSeatTile:(e,t)=>s(t==="sofa"?[`${e} was on the banquette seating.`,`${e} had taken the banquette.`,`${e} was settled into a banquette seat.`]:[`${e} was sitting at a table.`,`${e} was seated for the evening.`,`${e} had a chair at the table.`],e),notOnSeatTile:e=>s([`${e} was not seated.`,`${e} was standing at the time.`,`${e} had not yet been seated.`,`${e} was on their feet.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was closer to the entrance than ${t}.`,`${e} was seated in the front section relative to ${t}.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was at a table deeper in the restaurant than ${t}.`,`${e} was in the back section relative to ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} table-row${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} table-row${a>1?"s":""} behind ${t}.`],e+t+a)},na={id:"restaurant",name:"The Restaurant",floorPlans:{easy:C.restaurant.easy,medium:C.restaurant.medium,hard:C.restaurant.hard},suspectNames:["Andre","Bianca","Carlo","Delphine","Emilio","Francoise","Gerard","Helena","Ignacio","Josephine","Kristoffer","Loretta"],victimNames:["Victor","Violette","Vincenzo","Vera","Valeria","Vidal"],clueTemplates:aa,narrativeTemplates:{intro:["La Maison Rouge was fully booked for a private function. It's now fully booked by the police. Someone didn't make it to dessert — and you're the unwanted amuse-bouche.","The head chef found the body before the morning prep. The restaurant is closed, the reservations are cancelled, and the chef is refusing to speak without a lawyer. You order espresso.","Five-star dining. One-star outcome. The Michelin inspector will not be pleased. Neither will whoever left the body in the private dining room."],victimFound:["The victim was found slumped in the private dining room.","Kitchen staff discovered the victim near the counter.","The sommelier found the victim in the dining room early in the morning."],guiltyText:["{{killerName}} — an amuse-bouche of justice.","{{killerName}} — the bill has arrived.","{{killerName}} — this dish is best served cold."]},colorPalette:{floor:"#f5e8d0",wall:"#3b1f1f",seat:"#8b1a1a",accent:"#c0392b",background:"#180a0a",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:counter":"","object:table":"","object:plant":""}};function ce(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ia={inRoom:(e,t)=>s([`${e} was in the ${t}.`,`${e} was spotted training in the ${t}.`,`Staff placed ${e} in the ${t} zone.`,`${e} spent time working out in the ${t}.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} never used the ${t}.`,`The trainer confirmed ${e} wasn't in the ${t}.`,`${e} was nowhere near the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was training in the same zone as ${t}.`,`${e} and ${t} were spotted working out together.`,`The trainer saw ${e} near ${t}.`,`${e} and ${t} shared the same section of the gym.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were training in different zones.`,`${e} was nowhere near ${t}'s area.`,`${e} and ${t} never shared the same zone.`,`The trainer noted ${e} and ${t} were apart.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${ce(t)} column.`,`${e} was positioned in column ${t}.`,`${e}'s station was the ${ce(t)} column.`],e+t),inRow:(e,t)=>s([`${e} was in the ${ce(t)} row.`,`${e} trained along row ${t}.`,`${e}'s position was on the ${ce(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was working out right next to ${t}.`,`${e} and ${t} were training side by side.`,`${e} was barely a step from ${t}.`,`A trainer noticed ${e} right beside ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} were not training next to each other.`,`${e} kept a distance from ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was training right next to ${t}.`,`${e} was seen near ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} kept away from ${t}.`],e+t),onSeatTile:(e,t)=>s([`${e} was sitting on a bench.`,`${e} had taken a rest on a bench.`,`${e} was seated at the time.`],e),notOnSeatTile:e=>s([`${e} was not sitting down.`,`${e} was on their feet.`,`${e} was actively moving around.`,`${e} never sat down during the session.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was in the front section of the gym relative to ${t}.`,`${e} was closer to the entrance than ${t}.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was in the back section of the gym relative to ${t}.`,`${e} was further from the entrance than ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} station${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} station${a>1?"s":""} behind ${t}.`],e+t+a)},oa={id:"gym",name:"The Gym",floorPlans:{easy:C.gym.easy,medium:C.gym.medium,hard:C.gym.hard},suspectNames:["Atlas","Blair","Corey","Dakota","Evander","Fitz","Gabe","Hunter","Indira","Jordan","Knox","Leila"],victimNames:["Vance","Valentina","Viktor","Vera","Vito","Vesper"],clueTemplates:ia,narrativeTemplates:{intro:["FitLife Gym opens at 5am. This morning it opened to a body near the weight rack. The morning regulars are sweating for a different reason now.","Somebody skipped leg day — and left somebody else skipping all days. The body was found in the Weights area. You badge through the turnstile.","The gym is 24 hours. The victim wasn't. You arrive with your notepad and a distinct lack of enthusiasm for the treadmill."],victimFound:["The victim was found near the weight rack before the early shift.","A trainer discovered the victim collapsed in the cardio area.","The victim was found in the pool area during the morning check."],guiltyText:["{{killerName}} — no amount of cardio outpaces the truth.","{{killerName}} — their reps are done.","{{killerName}} — spotting the killer was the easy part."]},colorPalette:{floor:"#e8e0d8",wall:"#2c3e50",seat:"#7f8c8d",accent:"#e74c3c",background:"#0d1117",text:"#ffffff"},spriteMap:{"object:weight-rack":"","object:treadmill":"","object:counter":"","object:jacuzzi-tile":""}};function de(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ra={inRoom:(e,t)=>s([`${e} was in the ${t}.`,`${e} was seen working in the ${t}.`,`Access logs confirm ${e} was in the ${t}.`,`${e} spent time in the ${t} that day.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} never entered the ${t}.`,`Access logs show ${e} was not in the ${t}.`,`Colleagues confirmed ${e} wasn't in the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was working in the same area as ${t}.`,`${e} and ${t} shared the same workspace.`,`A colleague saw ${e} near ${t}.`,`${e} was at the same section as ${t}.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different parts of the office.`,`${e} was not in the same area as ${t}.`,`The floor plan places ${e} and ${t} in separate zones.`,`${t} confirmed they weren't near ${e}.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${de(t)} column.`,`${e}'s desk was in column ${t}.`,`${e} worked in the ${de(t)} column.`],e+t),inRow:(e,t)=>s([`${e} was in the ${de(t)} row.`,`${e}'s workstation was on row ${t}.`,`${e} was at the ${de(t)} row of desks.`],e+t),besideSuspect:(e,t)=>s([`${e} was working right next to ${t}.`,`${e}'s desk was adjacent to ${t}'s.`,`${e} and ${t} sat just one desk apart.`,`A colleague noticed ${e} right beside ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} were not at adjacent desks.`,`${e} was not close to ${t}'s workstation.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e}'s desk was right next to ${t}.`,`${e} worked near ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e}'s workspace was away from ${t}.`,`${e} was not beside ${t}.`],e+t),onSeatTile:(e,t)=>s([`${e} was sitting at their desk.`,`${e} was at their workstation at the time.`,`${e} was seated and working.`,`${e} had not left their desk.`],e),notOnSeatTile:e=>s([`${e} was not sitting down.`,`${e} was away from their desk.`,`${e} was standing or moving around.`,`${e} had left their workstation.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e}'s desk was closer to the entrance than ${t}'s.`,`${e} was in the front of the office relative to ${t}.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e}'s desk was deeper in the office than ${t}'s.`,`${e} was in the back section relative to ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e}'s desk was ${a} row${a>1?"s":""} ahead of ${t}'s.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e}'s desk was ${a} row${a>1?"s":""} behind ${t}'s.`],e+t+a)},sa={id:"office",name:"The Office",floorPlans:{easy:C.office.easy,medium:C.office.medium,hard:C.office.hard},suspectNames:["Adrian","Brooke","Clive","Daria","Edwin","Fiona","Graham","Harriet","Isaac","Judith","Kieran","Laura"],victimNames:["Vincent","Veronica","Vance","Vivienne","Victor","Velvet"],clueTemplates:ra,narrativeTemplates:{intro:["Meridian Corp. Floor 12. The quarterly review meeting has been cancelled for the most permanent possible reason. You badge in and start asking questions before the lawyers arrive.","The victim was found at their desk. The access log shows they never left last night. Whoever did this knew the building. You start with the people who knew it best.","It was supposed to be a normal Monday. Then the HR department filed the wrong kind of incident report. You turn off your phone's out-of-office message and get to work."],victimFound:["The victim was found at their desk during the morning security check.","The building manager found the victim in the Meeting Room after the overnight shift.","A colleague discovered the victim in the Server Room at 7am."],guiltyText:["{{killerName}} — the performance review was terminal.","{{killerName}} — this one won't go in the quarterly report.","{{killerName}} — consider this case closed."]},colorPalette:{floor:"#e8e8f0",wall:"#34495e",seat:"#7f8c8d",accent:"#2980b9",background:"#0a0a14",text:"#ffffff"},spriteMap:{"object:desk":"","object:photocopier":"","object:tv":"","object:plant":""}};function Z(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const la={inRoom:(e,t)=>s([`${e} was in the ${t}.`,`${e} was seen mingling in the ${t}.`,`Other guests placed ${e} in the ${t}.`,`${e} spent the afternoon in the ${t}.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} never ventured to the ${t}.`,`Guests confirmed ${e} wasn't in the ${t}.`,`${e} was not seen in the ${t} all afternoon.`],e+t),inSameRoom:(e,t)=>s([`${e} was in the same area as ${t}.`,`${e} and ${t} were mingling in the same spot.`,`A guest saw ${e} near ${t}.`,`${e} and ${t} were together at the party.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different parts of the garden.`,`${e} was not near ${t} during the party.`,`Guests saw ${e} and ${t} in separate areas.`,`${t} mentioned they weren't near ${e}.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${Z(t)} column.`,`${e} stood in column ${t} of the garden.`,`${e}'s position was the ${Z(t)} column from the edge.`],e+t),inRow:(e,t)=>s([`${e} was in the ${Z(t)} row.`,`${e} was along the ${Z(t)} row of the garden.`,`${e}'s spot was on the ${Z(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was standing right next to ${t}.`,`${e} and ${t} were chatting side by side.`,`A guest noticed ${e} just beside ${t}.`,`${e} and ${t} were barely a step apart.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} kept apart during the party.`,`${e} was not close to ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was found near ${t}.`,`${e} was standing just by ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} was far from ${t}.`],e+t),onSeatTile:(e,t)=>s([`${e} was sitting on a garden chair.`,`${e} had taken one of the garden chairs.`,`${e} was seated outside.`,`${e} was in a chair at the time.`],e),notOnSeatTile:e=>s([`${e} was not sitting down.`,`${e} was up and circulating.`,`${e} was standing during the party.`,`${e} had not taken a seat.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was in the front section of the garden relative to ${t}.`,`${e} was closer to the gate than ${t}.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was deeper in the garden than ${t}.`,`${e} was further from the gate than ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} step${a>1?"s":""} ahead of ${t} in the garden.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} step${a>1?"s":""} behind ${t} in the garden.`],e+t+a)},ca={id:"garden-party",name:"The Garden Party",floorPlans:{easy:C["garden-party"].easy,medium:C["garden-party"].medium,hard:C["garden-party"].hard},suspectNames:["Arabella","Benedict","Cecily","Damien","Eleanor","Freddie","Georgina","Hugo","Imogen","Jasper","Kit","Lavinia"],victimNames:["Violet","Valentine","Verity","Viscount","Viola","Vaughn"],clueTemplates:la,narrativeTemplates:{intro:["The Westerleigh garden party was the social event of summer. It is no longer a social event. The body was found beneath the roses and you've been asked — very politely — to investigate.","Champagne, strawberries, murder. The annual garden party at Fernwood House has taken a distinctly unfestive turn. You decline the cucumber sandwiches and start asking questions.","The gazebo was booked for afternoon tea. It is now a crime scene. You roll up your sleeves and walk across the manicured lawn."],victimFound:["The victim was found in the Greenhouse before the afternoon guests arrived.","A gardener discovered the victim on the Lawn near the flower beds.","The caterers found the victim in the Gazebo."],guiltyText:["{{killerName}} — the summer is wilted.","{{killerName}} — cut down in their prime.","{{killerName}} — this garden party is over."]},colorPalette:{floor:"#d4f0c0",wall:"#5d4037",seat:"#7cb342",accent:"#e91e63",background:"#0a1f0a",text:"#ffffff"},spriteMap:{"object:flower-bed":"","object:plant":""}};function he(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const da={inRoom:(e,t)=>s([`${e} was in the ${t}.`,`${e} was recorded in the ${t}.`,`Hospital logs confirm ${e} was in the ${t}.`,`${e} was present in the ${t} at the time.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} was not recorded in the ${t}.`,`Staff confirmed ${e} was absent from the ${t}.`,`${e} had no reason to be in the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was in the same ward as ${t}.`,`${e} and ${t} were logged in the same area.`,`A nurse placed ${e} alongside ${t}.`,`${e} was observed near ${t} at the time.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different parts of the hospital.`,`${e} was not in the same area as ${t}.`,`Logs confirm ${e} and ${t} were in separate zones.`,`${t} was not in ${e}'s section.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${he(t)} column.`,`${e}'s position was column ${t}.`,`${e} was in the ${he(t)} column of the ward.`],e+t),inRow:(e,t)=>s([`${e} was in the ${he(t)} row.`,`${e} was assigned to row ${t} of the ward.`,`${e}'s position was on the ${he(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was standing right next to ${t}.`,`${e} was observed in proximity to ${t}.`,`${e} and ${t} were in adjacent positions.`,`A nurse noted ${e} directly beside ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} were not in adjacent positions.`,`${e} was not in proximity to ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was found adjacent to ${t}.`,`${e} was in the immediate vicinity of ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not adjacent to ${t}.`,`${e} was not beside ${t}.`],e+t),onSeatTile:(e,t)=>s(t==="bed"?[`${e} was in a hospital bed.`,`${e} was admitted and lying in bed.`,`${e} was bedridden at the time.`]:t==="sofa"?[`${e} was in the waiting area.`,`${e} was seated in the waiting room.`,`${e} had not yet been admitted — still waiting.`]:[`${e} was sitting down.`,`${e} was seated at the time.`],e),notOnSeatTile:e=>s([`${e} was not sitting or lying down.`,`${e} was on their feet.`,`${e} was ambulatory at the time.`,`${e} was standing throughout.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e}'s position was closer to the entrance than ${t}'s.`,`${e} was in the front section of the ward relative to ${t}.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was deeper in the ward than ${t}.`,`${e}'s position was further from the entrance than ${t}'s.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} bed-row${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} bed-row${a>1?"s":""} behind ${t}.`],e+t+a)},ha={id:"hospital",name:"The Hospital",floorPlans:{easy:C.hospital.easy,medium:C.hospital.medium,hard:C.hospital.hard},suspectNames:["Aleksei","Beatrix","Conrad","Dorothea","Emil","Francesca","Gunnar","Hilde","Igor","Jana","Klaus","Liselotte"],victimNames:["Viktor","Valentina","Vera","Valentin","Vesna","Volkmar"],clueTemplates:da,narrativeTemplates:{intro:["St Crispin's Hospital is where people come to recover. This one didn't make it. The night shift just ended and nobody has an alibi. You flash your badge at the nurses' station.","A hospital is the last place you expect a murder — or the first. The body was found during morning rounds. You put on gloves and start taking statements.","The patient was admitted last night. By morning, they were a victim. Someone in this building knows what happened and you're going to find out who."],victimFound:["The victim was found in the Ward during the overnight nursing check.","The on-call doctor discovered the victim in the Operating Theatre.","The victim was found in the Pharmacy storage area."],guiltyText:["{{killerName}} — the prognosis was never good.","{{killerName}} — no treatment for this outcome.","{{killerName}} — discharged permanently."]},colorPalette:{floor:"#f0f4f8",wall:"#2c3e50",seat:"#7f8c8d",accent:"#e74c3c",background:"#0a0d12",text:"#ffffff"},spriteMap:{"object:hospital-bed":"","object:medicine-cabinet":""}};function J(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ma={inRoom:(e,t)=>s([`${e} was at the ${t}.`,`${e} was spotted at the ${t}.`,`Carnies placed ${e} at the ${t}.`,`${e} was seen hanging around the ${t}.`],e+t),notInRoom:(e,t)=>s([`${e} was not at the ${t}.`,`${e} never visited the ${t}.`,`The carnie confirmed ${e} wasn't at the ${t}.`,`${e} steered clear of the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was in the same area as ${t}.`,`${e} and ${t} were seen at the same attraction.`,`A vendor spotted ${e} near ${t}.`,`${e} and ${t} were together in the crowd.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different parts of the carnival.`,`${e} was nowhere near ${t}'s attraction.`,`${e} and ${t} were at opposite ends of the fairground.`,`${t} said they hadn't seen ${e} nearby.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${J(t)} column.`,`${e} stood in column ${t} of the fairground.`,`${e}'s position was the ${J(t)} column.`],e+t),inRow:(e,t)=>s([`${e} was in the ${J(t)} row.`,`${e} was along the ${J(t)} row of attractions.`,`${e}'s position was on the ${J(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was right next to ${t}.`,`${e} and ${t} were shoulder to shoulder in the crowd.`,`A vendor saw ${e} just beside ${t}.`,`${e} was barely a step from ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} were apart in the crowd.`,`${e} was not close to ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was seen right by ${t}.`,`${e} was standing near ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} kept away from ${t}.`],e+t),onSeatTile:(e,t)=>s([`${e} was seated at one of the stalls.`,`${e} had taken a seat by a stall.`,`${e} was sitting at the time.`,`${e} was resting on one of the benches.`],e),notOnSeatTile:e=>s([`${e} was not sitting down.`,`${e} was moving through the crowd.`,`${e} was on their feet.`,`${e} hadn't stopped to sit all evening.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was in the front section of the carnival relative to ${t}.`,`${e} was closer to the main entrance than ${t}.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was in the back of the fairground relative to ${t}.`,`${e} was further from the entrance than ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} attraction-row${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} attraction-row${a>1?"s":""} behind ${t}.`],e+t+a)},fa={id:"carnival",name:"The Carnival",floorPlans:{easy:C.carnival.easy,medium:C.carnival.medium,hard:C.carnival.hard},suspectNames:["Alistair","Brigitte","Cosmo","Dafne","Ezra","Flavia","Gideon","Harriet","Ignatius","Juno","Kit","Ludo"],victimNames:["Victor","Valentina","Vex","Vane","Vesper","Volta"],clueTemplates:ma,narrativeTemplates:{intro:["The Twilight Carnival has been travelling for thirty years without incident. Last night ended that streak. The body was found between the Carousel and the Funhouse. You came for the cotton candy.","Someone killed the Ringmaster. Or maybe the Ringmaster killed someone. Either way, the show is not going on tonight. You arrive as the last customers are being turned away.","Carnivals attract all sorts. This one attracted a detective. The body was found before morning setup. You pull on your coat and walk between the tents."],victimFound:["The victim was found near the Carousel before the carnival opened.","The ride operator discovered the victim in the Funhouse corridor.","The victim was found behind the Food Stands at dawn."],guiltyText:["{{killerName}} — the last act.","{{killerName}} — the fun is over.","{{killerName}} — tickets have been cancelled."]},colorPalette:{floor:"#f5deb3",wall:"#4a235a",seat:"#884ea0",accent:"#e74c3c",background:"#0d0a14",text:"#ffffff"},spriteMap:{"object:carousel-horse":"","object:stall":""}},ua={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same room as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different rooms.`,inColumn:(e,t)=>`${e} was in column ${t}.`,inRow:(e,t)=>`${e} was in row ${t}.`,besideSuspect:(e,t)=>`${e} was beside ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>`${e} was on a ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},pa={id:"stub",name:"Test Room",floorPlans:{easy:C["coffee-shop"].easy,medium:C["coffee-shop"].medium,hard:C["coffee-shop"].hard},suspectNames:["Alice","Bob","Carol","Dave","Eve","Frank","Grace","Henry","Iris","Jack","Kate","Leo"],victimNames:["Vera","Victor","Violet","Valencia","Vance","Vivian"],clueTemplates:ua,narrativeTemplates:{intro:["A crime has occurred in the Test Room.","Witnesses report suspicious activity.","The detective arrives on the scene."],victimFound:["The victim was found at the scene.","A body has been discovered.","The victim was discovered here."],guiltyText:["{{killerName}} — caught red-handed.","{{killerName}} — the evidence is clear.","{{killerName}} — guilty as charged."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{}},We=new Map;function H(e){We.set(e.id,e)}function at(e){const t=We.get(e);if(!t)throw new Error(`Unknown theme: ${e}`);return t}function ba(){return Array.from(We.values())}H(qt);H(Jt);H(Qt);H(ta);H(na);H(oa);H(sa);H(ca);H(ha);H(fa);H(pa);const N=(e,t="#1a120a")=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="${t}"/>${e}</svg>`,je={chair:N(`
    <rect x="8" y="18" width="16" height="10" rx="1" fill="#8b6914"/>
    <rect x="8" y="8"  width="4"  height="12" rx="1" fill="#7a5c10"/>
    <rect x="20" y="8" width="4"  height="12" rx="1" fill="#7a5c10"/>
    <rect x="8" y="6"  width="16" height="5"  rx="1" fill="#a07820"/>
    <rect x="10" y="19" width="3" height="8"  rx="1" fill="#7a5c10"/>
    <rect x="19" y="19" width="3" height="8"  rx="1" fill="#7a5c10"/>
  `,"#f5e6d3"),sofa:N(`
    <rect x="4"  y="16" width="24" height="11" rx="2" fill="#8b6914"/>
    <rect x="4"  y="10" width="5"  height="18" rx="2" fill="#7a5c10"/>
    <rect x="23" y="10" width="5"  height="18" rx="2" fill="#7a5c10"/>
    <rect x="4"  y="8"  width="24" height="6"  rx="2" fill="#a07820"/>
    <line x1="15" y1="16" x2="15" y2="27" stroke="#7a5c10" stroke-width="1.5"/>
  `,"#f5e6d3"),bed:N(`
    <rect x="4"  y="6"  width="24" height="20" rx="2" fill="#ddd0b8"/>
    <rect x="4"  y="6"  width="24" height="7"  rx="2" fill="#c0a878"/>
    <rect x="6"  y="7"  width="20" height="5"  rx="1" fill="#e8d8b0"/>
    <rect x="4"  y="6"  width="5"  height="20" rx="1" fill="#8b6914"/>
    <rect x="23" y="6"  width="5"  height="20" rx="1" fill="#8b6914"/>
    <rect x="4"  y="22" width="24" height="4"  rx="1" fill="#8b6914"/>
  `,"#f5e6d3"),"object:plant":N(`
    <rect x="11" y="22" width="10" height="7" rx="1" fill="#8b6332"/>
    <rect x="13" y="20" width="6"  height="3" fill="#7a5528"/>
    <ellipse cx="16" cy="13" rx="8" ry="9" fill="#2d7a2d"/>
    <ellipse cx="10" cy="17" rx="5" ry="6" fill="#3a9a3a"/>
    <ellipse cx="22" cy="17" rx="5" ry="6" fill="#3a9a3a"/>
    <ellipse cx="16" cy="8"  rx="4" ry="5" fill="#4cb84c"/>
    <ellipse cx="16" cy="13" rx="3" ry="3" fill="#5cd65c"/>
  `),"object:bar-counter":N(`
    <rect x="2"  y="6"  width="28" height="4"  rx="1" fill="#7a4010"/>
    <rect x="2"  y="10" width="28" height="16" rx="1" fill="#9a5520"/>
    <rect x="4"  y="12" width="6"  height="8"  rx="1" fill="#7a4010"/>
    <rect x="13" y="12" width="6"  height="8"  rx="1" fill="#7a4010"/>
    <rect x="22" y="12" width="6"  height="8"  rx="1" fill="#7a4010"/>
    <rect x="2"  y="8"  width="28" height="2"  fill="#c07030"/>
    <circle cx="7"  cy="4" r="2" fill="#c0c0c0"/>
    <circle cx="16" cy="4" r="2" fill="#c0c0c0"/>
    <circle cx="25" cy="4" r="2" fill="#c0c0c0"/>
    <rect x="6"  y="4" width="2"  height="4" fill="#909090"/>
    <rect x="15" y="4" width="2"  height="4" fill="#909090"/>
    <rect x="24" y="4" width="2"  height="4" fill="#909090"/>
  `),"object:cash-register":N(`
    <rect x="4"  y="10" width="24" height="18" rx="2" fill="#2a2a2a"/>
    <rect x="6"  y="12" width="20" height="10" rx="1" fill="#1a6a1a"/>
    <rect x="7"  y="13" width="18" height="8"  rx="0" fill="#0d4d0d"/>
    <rect x="8"  y="14" width="16" height="5"  rx="0" fill="#00cc00" opacity="0.8"/>
    <rect x="4"  y="24" width="24" height="4"  rx="1" fill="#1a1a1a"/>
    <rect x="10" y="7"  width="12" height="5"  rx="1" fill="#333"/>
    <rect x="12" y="5"  width="8"  height="3"  rx="1" fill="#444"/>
    <rect x="7"  y="26" width="18" height="2"  rx="0" fill="#555" opacity="0.5"/>
  `),"object:table":N(`
    <rect x="4"  y="12" width="24" height="10" rx="1" fill="#9a6030"/>
    <rect x="3"  y="10" width="26" height="3"  rx="1" fill="#b07840"/>
    <rect x="5"  y="22" width="4"  height="8"  rx="1" fill="#7a4820"/>
    <rect x="23" y="22" width="4"  height="8"  rx="1" fill="#7a4820"/>
  `),"object:shelf":N(`
    <rect x="2"  y="4"  width="28" height="3"  rx="1" fill="#9a6030"/>
    <rect x="2"  y="12" width="28" height="3"  rx="1" fill="#9a6030"/>
    <rect x="2"  y="20" width="28" height="3"  rx="1" fill="#9a6030"/>
    <rect x="2"  y="4"  width="3"  height="25" rx="1" fill="#7a4820"/>
    <rect x="27" y="4"  width="3"  height="25" rx="1" fill="#7a4820"/>
    <rect x="6"  y="7"  width="3"  height="5"  rx="0" fill="#c8a870"/>
    <rect x="10" y="7"  width="2"  height="5"  rx="0" fill="#e0b880"/>
    <rect x="13" y="7"  width="4"  height="5"  rx="0" fill="#a87840"/>
    <rect x="18" y="7"  width="2"  height="5"  rx="0" fill="#c8a870"/>
    <rect x="6"  y="15" width="4"  height="5"  rx="0" fill="#d08840"/>
    <rect x="12" y="15" width="3"  height="5"  rx="0" fill="#b06030"/>
    <rect x="17" y="15" width="5"  height="5"  rx="0" fill="#c8a870"/>
  `),"object:counter":N(`
    <rect x="2"  y="8"  width="28" height="18" rx="2" fill="#888888"/>
    <rect x="2"  y="6"  width="28" height="4"  rx="1" fill="#aaaaaa"/>
    <rect x="4"  y="10" width="8"  height="6"  rx="1" fill="#666"/>
    <rect x="14" y="10" width="8"  height="6"  rx="1" fill="#666"/>
    <rect x="4"  y="18" width="24" height="6"  rx="1" fill="#777"/>
    <rect x="14" y="4"  width="4"  height="4"  rx="1" fill="#999"/>
  `),"object:desk":N(`
    <rect x="2"  y="10" width="28" height="16" rx="2" fill="#7a5028"/>
    <rect x="2"  y="8"  width="28" height="4"  rx="1" fill="#9a6838"/>
    <rect x="4"  y="12" width="10" height="8"  rx="1" fill="#1a1a2a"/>
    <rect x="5"  y="13" width="8"  height="6"  rx="0" fill="#2233aa" opacity="0.8"/>
    <rect x="14" y="12" width="5"  height="6"  rx="1" fill="#555"/>
    <rect x="14" y="13" width="4"  height="4"  fill="#888" opacity="0.5"/>
    <rect x="20" y="12" width="8"  height="4"  rx="0" fill="#888" opacity="0.3"/>
    <rect x="2"  y="24" width="5"  height="8"  rx="1" fill="#6a4018"/>
    <rect x="25" y="24" width="5"  height="8"  rx="1" fill="#6a4018"/>
  `),"object:photocopier":N(`
    <rect x="4"  y="8"  width="24" height="20" rx="2" fill="#555"/>
    <rect x="4"  y="6"  width="24" height="6"  rx="2" fill="#777"/>
    <rect x="6"  y="7"  width="20" height="4"  rx="1" fill="#aaa" opacity="0.4"/>
    <rect x="6"  y="10" width="20" height="14" rx="1" fill="#444"/>
    <rect x="8"  y="12" width="16" height="10" rx="0" fill="#1a1a1a"/>
    <rect x="8"  y="12" width="16" height="1"  fill="#fff" opacity="0.5"/>
    <rect x="18" y="7"  width="4"  height="3"  rx="1" fill="#00aa00"/>
    <rect x="23" y="7"  width="3"  height="3"  rx="1" fill="#aa0000"/>
  `),"object:tv":N(`
    <rect x="4"  y="4"  width="24" height="18" rx="2" fill="#1a1a1a"/>
    <rect x="6"  y="6"  width="20" height="14" rx="1" fill="#0a2a4a"/>
    <rect x="6"  y="6"  width="20" height="14" rx="1" fill="#1a5a8a" opacity="0.6"/>
    <rect x="6"  y="6"  width="10" height="7"  rx="0" fill="#fff" opacity="0.08"/>
    <rect x="14" y="22" width="4"  height="6"  rx="0" fill="#333"/>
    <rect x="10" y="27" width="12" height="3"  rx="1" fill="#222"/>
    <circle cx="26" cy="7" r="1.5" fill="#00cc00"/>
  `),"object:flower-bed":N(`
    <rect x="2"  y="16" width="28" height="14" rx="2" fill="#4a3010"/>
    <rect x="4"  y="18" width="24" height="10" rx="1" fill="#6a5020" opacity="0.8"/>
    <circle cx="8"  cy="14" r="4" fill="#cc2266"/>
    <circle cx="16" cy="12" r="5" fill="#ff4488"/>
    <circle cx="24" cy="14" r="4" fill="#cc2266"/>
    <circle cx="12" cy="16" r="3" fill="#ff88aa"/>
    <circle cx="20" cy="16" r="3" fill="#ff4488"/>
    <circle cx="8"  cy="14" r="2" fill="#ffaacc"/>
    <circle cx="16" cy="12" r="2.5" fill="#ffccdd"/>
    <circle cx="24" cy="14" r="2" fill="#ffaacc"/>
  `),"object:hospital-bed":N(`
    <rect x="2"  y="8"  width="28" height="20" rx="2" fill="#e8e8e8"/>
    <rect x="2"  y="8"  width="28" height="6"  rx="2" fill="#cccccc"/>
    <rect x="4"  y="9"  width="24" height="4"  rx="1" fill="#ffffff"/>
    <rect x="2"  y="8"  width="5"  height="20" rx="1" fill="#aaaaaa"/>
    <rect x="25" y="8"  width="5"  height="20" rx="1" fill="#aaaaaa"/>
    <rect x="2"  y="24" width="28" height="4"  rx="1" fill="#aaaaaa"/>
    <rect x="4"  y="26" width="3"  height="6"  rx="1" fill="#888"/>
    <rect x="25" y="26" width="3"  height="6"  rx="1" fill="#888"/>
    <rect x="14" y="7"  width="4"  height="3"  rx="0" fill="#4444aa"/>
  `),"object:medicine-cabinet":N(`
    <rect x="4"  y="4"  width="24" height="24" rx="2" fill="#e8e8e0"/>
    <rect x="4"  y="4"  width="24" height="24" rx="2" stroke="#aaaaaa" stroke-width="2" fill="none"/>
    <line x1="16" y1="4" x2="16" y2="28" stroke="#aaaaaa" stroke-width="1.5"/>
    <line x1="14" y1="14" x2="18" y2="14" stroke="#cc0000" stroke-width="3"/>
    <line x1="16" y1="12" x2="16" y2="16" stroke="#cc0000" stroke-width="3"/>
    <circle cx="15" cy="16" r="1.5" fill="#888"/>
    <circle cx="17" cy="16" r="1.5" fill="#888"/>
    <rect x="6"  y="8"  width="8"  height="3"  rx="0" fill="#cccccc"/>
    <rect x="6"  y="13" width="8"  height="3"  rx="0" fill="#cccccc"/>
    <rect x="6"  y="18" width="8"  height="3"  rx="0" fill="#cccccc"/>
  `),"object:weight-rack":N(`
    <rect x="12" y="4"  width="8"  height="24" rx="1" fill="#444"/>
    <rect x="2"  y="8"  width="28" height="4"  rx="1" fill="#555"/>
    <rect x="2"  y="20" width="28" height="4"  rx="1" fill="#555"/>
    <rect x="2"  y="8"  width="5"  height="16" rx="1" fill="#666" opacity="0.8"/>
    <rect x="6"  y="9"  width="3"  height="14" rx="0" fill="#888"/>
    <rect x="11" y="9"  width="3"  height="14" rx="0" fill="#888"/>
    <rect x="25" y="8"  width="5"  height="16" rx="1" fill="#666" opacity="0.8"/>
    <rect x="23" y="9"  width="3"  height="14" rx="0" fill="#888"/>
    <rect x="18" y="9"  width="3"  height="14" rx="0" fill="#888"/>
  `),"object:treadmill":N(`
    <rect x="2"  y="16" width="28" height="6"  rx="2" fill="#333"/>
    <rect x="4"  y="18" width="24" height="2"  rx="0" fill="#222"/>
    <rect x="4"  y="18" width="6"  height="2"  rx="0" fill="#555"/>
    <rect x="10" y="18" width="6"  height="2"  rx="0" fill="#555"/>
    <rect x="16" y="18" width="6"  height="2"  rx="0" fill="#555"/>
    <rect x="8"  y="6"  width="5"  height="12" rx="1" fill="#444"/>
    <rect x="8"  y="8"  width="16" height="3"  rx="1" fill="#555"/>
    <rect x="10" y="8"  width="8"  height="2"  rx="0" fill="#1a6a1a"/>
    <circle cx="7"  cy="16" r="3" fill="#555"/>
    <circle cx="25" cy="16" r="3" fill="#555"/>
  `),"object:stall":N(`
    <rect x="2"  y="4"  width="28" height="24" rx="1" fill="#9a6028"/>
    <rect x="2"  y="4"  width="28" height="5"  rx="1" fill="#c08040"/>
    <rect x="3"  y="4"  width="26" height="28" rx="0" stroke="#7a4818" stroke-width="2" fill="none"/>
    <rect x="8"  y="10" width="16" height="12" rx="1" fill="#7a4818"/>
    <rect x="9"  y="11" width="14" height="10" rx="0" fill="#1a1a1a" opacity="0.7"/>
    <rect x="9"  y="11" width="6"  height="10" rx="0" fill="#2a2a2a"/>
    <rect x="10" y="12" width="4"  height="8"  rx="0" fill="#c08040" opacity="0.4"/>
    <rect x="14" y="14" width="3"  height="2"  rx="0" fill="#888"/>
    <rect x="6"  y="22" width="20" height="2"  fill="#7a4818"/>
  `),"object:carousel-horse":N(`
    <rect x="14" y="2"  width="4"  height="28" rx="1" fill="#888" opacity="0.5"/>
    <ellipse cx="16" cy="14" rx="8" ry="6" fill="#f0d0b0"/>
    <ellipse cx="22" cy="12" rx="4" ry="3" fill="#e0c0a0"/>
    <circle  cx="23" cy="10" r="2.5" fill="#f0d0b0"/>
    <rect x="21" y="8"  width="5"  height="2"  rx="1" fill="#e0c0a0"/>
    <rect x="8"  y="16" width="4"  height="8"  rx="1" fill="#f0d0b0"/>
    <rect x="20" y="18" width="4"  height="6"  rx="1" fill="#f0d0b0"/>
    <ellipse cx="10" cy="24" rx="3" ry="2" fill="#e0c0a0"/>
    <ellipse cx="22" cy="23" rx="3" ry="2" fill="#e0c0a0"/>
    <rect x="6"  y="12" width="3"  height="5"  rx="1" fill="#cc2244"/>
    <rect x="23" y="12" width="3"  height="5"  rx="1" fill="#cc2244"/>
  `),"object:jacuzzi-tile":N(`
    <rect x="2"  y="2"  width="28" height="28" rx="3" fill="#1a6a9a"/>
    <rect x="4"  y="4"  width="24" height="24" rx="2" fill="#2288cc"/>
    <ellipse cx="16" cy="16" rx="10" ry="8" fill="#44aaee" opacity="0.5"/>
    <path d="M6 16 Q10 12 14 16 Q18 20 22 16 Q26 12 28 16" stroke="#88ccff" stroke-width="1.5" fill="none" opacity="0.7"/>
    <path d="M6 20 Q10 16 14 20 Q18 24 22 20 Q26 16 28 20" stroke="#88ccff" stroke-width="1.5" fill="none" opacity="0.5"/>
    <circle cx="10" cy="12" r="1.5" fill="#ffffff" opacity="0.6"/>
    <circle cx="20" cy="10" r="1.5" fill="#ffffff" opacity="0.6"/>
    <circle cx="25" cy="18" r="1"   fill="#ffffff" opacity="0.6"/>
  `),"object:teddy-bear":N(`
    <circle cx="16" cy="14" r="8"  fill="#c8902a"/>
    <circle cx="16" cy="14" r="5"  fill="#e0b060"/>
    <circle cx="10" cy="8"  r="4"  fill="#c8902a"/>
    <circle cx="22" cy="8"  r="4"  fill="#c8902a"/>
    <circle cx="13" cy="12" r="1.5" fill="#1a0a00"/>
    <circle cx="19" cy="12" r="1.5" fill="#1a0a00"/>
    <ellipse cx="16" cy="16" rx="3" ry="2" fill="#1a0a00"/>
    <circle cx="16" cy="15" r="1.5" fill="#b07820"/>
    <circle cx="8"  cy="22" r="5"  fill="#c8902a"/>
    <circle cx="24" cy="22" r="5"  fill="#c8902a"/>
  `),"object:tree":N(`
    <rect x="13" y="22" width="6"  height="8"  rx="1" fill="#7a4818"/>
    <polygon points="16,2 4,16 28,16" fill="#1a7a1a"/>
    <polygon points="16,6 5,18 27,18" fill="#2a9a2a"/>
    <polygon points="16,10 7,22 25,22" fill="#3ab83a"/>
    <circle cx="16" cy="2" r="2" fill="#4cd84c"/>
  `)};let S=64;function wa(e,t){const a=(window.innerHeight-80)/t,o=window.innerWidth*.62/e;return S=Math.max(56,Math.min(96,Math.floor(Math.min(a,o)))),S}const $e=new Map,ge=new Set;function Le(e,t){if(!e)return null;if($e.has(e))return $e.get(e);if(ge.has(e))return null;ge.add(e);const a=new Image,o=new Blob([e],{type:"image/svg+xml"}),n=URL.createObjectURL(o);return a.onload=()=>{$e.set(e,a),ge.delete(e),URL.revokeObjectURL(n),t?.()},a.src=n,null}const X="'Press Start 2P', monospace",ze=["rgba(192, 120,  40, 0.18)","rgba( 40, 100, 180, 0.16)","rgba( 40, 150,  80, 0.16)","rgba(160,  40, 100, 0.16)","rgba(140, 120,  40, 0.16)","rgba( 80,  40, 160, 0.16)"],me=["rgba(220, 140,  40, 0.75)","rgba( 60, 120, 220, 0.75)","rgba( 40, 170,  80, 0.75)","rgba(200,  40, 120, 0.75)","rgba(180, 160,  20, 0.75)","rgba(100,  40, 200, 0.75)"],ya={pL:"object:plant",tB:"object:table",sH:"object:shelf",cR:"object:cash-register",bB:"object:bar-counter",tV:"object:tv",cT:"object:counter",dK:"object:desk",pC:"object:photocopier",fB:"object:flower-bed",hB:"object:hospital-bed",mC:"object:medicine-cabinet",tR:"object:tree",tD:"object:teddy-bear",cH:"object:carousel-horse",tM:"object:treadmill",wT:"object:weight-rack",sT:"object:stall",jZ:"object:jacuzzi-tile"},$a=new Set(["C","S","B"]),ga={C:"chair",S:"sofa",B:"bed"};function xa(e){let t=0;for(let o=0;o<e.length;o++)t=t*31+e.charCodeAt(o)&65535;const a=[0,30,60,120,180,210,270,300];return`hsl(${a[t%a.length]}, 70%, 52%)`}function Fa(e){const t=new Map;return e.rooms.forEach((a,o)=>{for(const[n,r]of a.cells)t.set(`${n},${r}`,o)}),t}function va(e,t,a,o,n,r,l){const c=t.floorPlan,b=a.colorPalette,{blockedRows:w,blockedCols:d}=Qe(Array.from(o.values())),h=Fa(c),i=S;for(let p=0;p<c.height;p++)for(let f=0;f<c.width;f++){const y=h.get(`${f},${p}`);y!==void 0&&c.tiles[p][f]!=="W"&&(e.fillStyle=ze[y%ze.length],e.fillRect(f*i,p*i,i,i))}for(let p=0;p<c.height;p++)for(let f=0;f<c.width;f++){const y=c.tiles[p][f],u=f*i,m=p*i;if(y==="W"){e.fillStyle=b.wall,e.fillRect(u,m,i,i),e.strokeStyle="rgba(255,255,255,0.06)",e.lineWidth=1;const x=Math.max(6,Math.floor(i/8));for(let F=0;F<Math.ceil(i/x);F++){const k=m+F*x;e.beginPath(),e.moveTo(u,k),e.lineTo(u+i,k),e.stroke();const g=F%2*(i/2);e.beginPath(),e.moveTo(u+g,k),e.lineTo(u+g,Math.min(k+x,m+i)),e.stroke()}continue}if(e.fillStyle=b.floor,e.fillRect(u,m,i,i),e.strokeStyle="rgba(0,0,0,0.10)",e.lineWidth=1,e.strokeRect(u+.5,m+.5,i-1,i-1),$a.has(y)){const x=ga[y]??"chair",F=je[x]??"",k=F?Le(F,l):null;if(k){const g=Math.floor(i*.06);e.drawImage(k,u+g,m+g,i-g*2,i-g*2)}else{e.fillStyle=b.seat;const g=Math.floor(i*.4),T=u+(i-g)/2,R=m+(i-g)/2+Math.floor(i*.05);e.fillRect(T,R,g,g),e.fillRect(T,m+Math.floor(i*.08),g,Math.floor(i*.1))}continue}if(y!=="F"){const x=ya[y]??`object:${y}`,F=(a.spriteMap[x]??"")||(je[x]??""),k=F?Le(F,l):null;if(k)e.drawImage(k,u,m,i,i);else{const g=x.replace("object:","").slice(0,4).toUpperCase();e.fillStyle="rgba(110,75,28,0.88)",e.fillRect(u+2,m+2,i-4,i-4),e.strokeStyle="#7a5c2e",e.lineWidth=2,e.strokeRect(u+2,m+2,i-4,i-4),e.fillStyle="#ffe0a0",e.font=`${Math.max(6,Math.floor(i*.18))}px ${X}`,e.textAlign="center",e.textBaseline="middle",e.fillText(g,u+i/2,m+i/2),e.textAlign="left",e.textBaseline="alphabetic"}}}const $=[[1,0],[-1,0],[0,1],[0,-1]];c.rooms.forEach((p,f)=>{e.strokeStyle=me[f%me.length],e.lineWidth=2.5;for(const[y,u]of p.cells)if(c.tiles[u]?.[y]!=="W")for(const[m,x]of $){const F=y+m,k=u+x,g=h.get(`${F},${k}`),T=c.tiles[k]?.[F];(g!==f||T==="W"||T===void 0)&&(e.beginPath(),m===1?(e.moveTo((y+1)*i,u*i),e.lineTo((y+1)*i,(u+1)*i)):m===-1?(e.moveTo(y*i,u*i),e.lineTo(y*i,(u+1)*i)):x===1?(e.moveTo(y*i,(u+1)*i),e.lineTo((y+1)*i,(u+1)*i)):(e.moveTo(y*i,u*i),e.lineTo((y+1)*i,u*i)),e.stroke())}}),c.rooms.forEach((p,f)=>{const y=p.cells.filter(([g,T])=>c.tiles[T]?.[g]!=="W");if(!y.length)return;const u=y.map(([g])=>g),m=y.map(([,g])=>g),x=(Math.min(...u)+Math.max(...u)+1)/2*i,F=(Math.min(...m)+Math.max(...m)+1)/2*i,k=Math.max(5,Math.min(8,Math.floor(i*.11)));e.font=`${k}px ${X}`,e.textAlign="center",e.textBaseline="middle",e.fillStyle="rgba(0,0,0,0.35)",e.fillText(p.name.toUpperCase(),x+1,F+1),e.fillStyle=me[f%me.length].replace("0.75","0.9"),e.fillText(p.name.toUpperCase(),x,F),e.textAlign="left",e.textBaseline="alphabetic"}),e.fillStyle="rgba(0, 0, 0, 0.16)";for(const p of w)e.fillRect(0,p*i,c.width*i,i);for(const p of d)e.fillRect(p*i,0,i,c.height*i);if(n){const p=n.x*i,f=n.y*i;e.fillStyle=`${b.accent}55`,e.fillRect(p,f,i,i),e.strokeStyle=b.accent,e.lineWidth=4,e.strokeRect(p+2,f+2,i-4,i-4),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.strokeRect(p+6,f+6,i-12,i-12);const y=Math.max(10,Math.floor(i*.28));e.font=`bold ${y}px ${X}`,e.fillStyle="#ffffff",e.textAlign="center",e.textBaseline="middle",e.fillText("?",p+i/2,f+i/2),e.textAlign="left",e.textBaseline="alphabetic"}for(const[p,f]of o){const y=t.suspects.find(g=>g.id===p);if(!y)continue;const u=f.x*i,m=f.y*i,x=Math.floor(i*.1),F=i-x*2;e.fillStyle=xa(p),e.fillRect(u+x,m+x,F,F),e.strokeStyle="rgba(0,0,0,0.7)",e.lineWidth=2,e.strokeRect(u+x+1,m+x+1,F-2,F-2),e.strokeStyle="rgba(255,255,255,0.25)",e.lineWidth=1,e.strokeRect(u+x+3,m+x+3,F-6,F-6);const k=Math.min(16,Math.floor(F*.5));e.fillStyle="#ffffff",e.font=`${k}px ${X}`,e.textAlign="center",e.textBaseline="middle",e.fillText(y.name.charAt(0).toUpperCase(),u+i/2,m+i/2+1),e.textAlign="left",e.textBaseline="alphabetic"}if(r){for(const[p,f]of r.x){const y=p*i,u=f*i;e.fillStyle="rgba(192,57,43,0.18)",e.fillRect(y,u,i,i),e.strokeStyle="#c0392b",e.lineWidth=3;const m=Math.floor(i*.18);e.beginPath(),e.moveTo(y+m,u+m),e.lineTo(y+i-m,u+i-m),e.stroke(),e.beginPath(),e.moveTo(y+i-m,u+m),e.lineTo(y+m,u+i-m),e.stroke()}for(const[p,f]of Object.entries(r.candidates)){if(!f.length)continue;const[y,u]=p.split(",").map(Number),m=y*i,x=u*i,F=f.map(g=>t.suspects.find(T=>T.id===g)?.name.charAt(0).toUpperCase()??"?").join("")+"?",k=Math.max(5,Math.floor(i*.14));e.font=`${k}px ${X}`,e.fillStyle="rgba(80,100,220,0.9)",e.textAlign="center",e.textBaseline="bottom",e.fillText(F,m+i/2,x+i-2),e.textAlign="left",e.textBaseline="alphabetic"}}}function ka(e){return{width:e.floorPlan.width*S,height:e.floorPlan.height*S}}const Ca=`
/* ── Sidebar container ─────────────────────────────────────────────────── */
.alibi-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  background: #f0ead8;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 23px,
    rgba(100,80,60,0.07) 23px,
    rgba(100,80,60,0.07) 24px
  );
  color: #1a0e08;
  font-family: 'Press Start 2P', monospace;
  width: 100%;
  min-width: 200px;
  max-width: 300px;
  overflow-y: auto;
  border-left: 3px solid #8b6914;
  box-shadow: inset 4px 0 12px rgba(0,0,0,0.12);
}

/* ── Section headers ───────────────────────────────────────────────────── */
.alibi-sidebar-section {
  padding: 8px 12px 4px;
}
.alibi-sidebar-label {
  font-family: 'Press Start 2P', monospace;
  font-size: 7px;
  color: #8b6914;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(139,105,20,0.3);
  padding-bottom: 4px;
  margin-bottom: 6px;
}

/* ── Room legend ───────────────────────────────────────────────────────── */
.alibi-room-legend {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 6px 12px 8px;
}
.alibi-room-entry {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Press Start 2P', monospace;
  font-size: 6px;
  color: #2a1a08;
}
.alibi-room-swatch {
  width: 10px;
  height: 10px;
  border: 1px solid rgba(0,0,0,0.2);
  flex-shrink: 0;
}

/* ── Victim section ────────────────────────────────────────────────────── */
.alibi-victim-section {
  padding: 6px 12px 8px;
  border-top: 1px solid rgba(139,105,20,0.2);
}
.alibi-victim-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: rgba(180, 40, 40, 0.07);
  border: 1px dashed rgba(180,40,40,0.3);
}
.alibi-victim-icon {
  width: 28px;
  height: 28px;
  background: rgba(180,40,40,0.15);
  border: 1px solid rgba(180,40,40,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}
.alibi-victim-label {
  font-family: 'Press Start 2P', monospace;
  font-size: 6px;
  color: #8a1010;
  line-height: 1.8;
}

/* ── Suspect section ───────────────────────────────────────────────────── */
.alibi-suspect-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 12px 8px;
  border-top: 1px solid rgba(139,105,20,0.2);
}
.alibi-suspect-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: #e8dfc8;
  border: 2px solid #b09060;
  cursor: default;
  transition: border-color 0.1s;
}
.alibi-suspect-card.placed {
  border-color: #c0392b;
  background: #f5d8c0;
}
.alibi-suspect-portrait {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}
.alibi-suspect-portrait canvas {
  display: block;
}
.alibi-suspect-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}
.alibi-suspect-name {
  font-family: 'Press Start 2P', monospace;
  font-size: 7px;
  color: #1a0e08;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.alibi-suspect-status {
  font-family: 'Press Start 2P', monospace;
  font-size: 5px;
  color: #888;
}
.alibi-suspect-card.placed .alibi-suspect-status {
  color: #c0392b;
}

/* ── Evidence (clue) section ───────────────────────────────────────────── */
.alibi-clue-section {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px 12px 12px;
  border-top: 1px solid rgba(139,105,20,0.2);
}
.alibi-clue-card {
  padding: 7px 10px;
  background: transparent;
  border: 0;
  border-left: 3px solid rgba(139,105,20,0.5);
  /* KEY: use readable system font for clue body text, not pixel font */
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 11px;
  line-height: 1.55;
  color: #2a1a08;
}
.alibi-clue-card:hover {
  background: rgba(139,105,20,0.06);
}
.alibi-clue-card.clue-satisfied {
  text-decoration: line-through;
  color: #a09070;
  border-left-color: #6a9040;
  opacity: 0.7;
}
.alibi-clue-card.clue-error {
  border-left-color: #c0392b;
  background: rgba(192,57,43,0.07);
  color: #c0392b;
  animation: alibi-clue-flash 0.5s ease-in-out 3;
}
@keyframes alibi-clue-flash {
  0%, 100% { background: transparent; }
  50%       { background: rgba(192,57,43,0.2); }
}
`,He=["rgba(220,140,40,0.35)","rgba(60,120,220,0.35)","rgba(40,170,80,0.35)","rgba(200,40,120,0.35)","rgba(180,160,20,0.35)","rgba(100,40,200,0.35)"],Ve=["#dc8c28","#3c78dc","#28aa50","#c82878","#b4a014","#6428c8"];let De=!1;function Sa(){if(De)return;const e=document.createElement("style");e.textContent=Ca,document.head.appendChild(e),De=!0}function Ta(e){let t=0;for(let o=0;o<e.length;o++)t=t*31+e.charCodeAt(o)&65535;const a=[0,30,60,120,180,210,270,300];return`hsl(${a[t%a.length]}, 70%, 52%)`}function Ea(e,t,a,o){e.width=32,e.height=32;const r=e.getContext("2d");if(!r)return;const l=Ta(t);r.fillStyle=o?l:"rgba(180,160,120,0.3)",r.fillRect(0,0,32,32),r.fillStyle=o?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.08)",r.beginPath(),r.arc(32/2,32*.38,32*.28,0,Math.PI*2),r.fill(),r.fillStyle=o?"rgba(0,0,0,0.2)":"rgba(0,0,0,0.06)",r.beginPath(),r.moveTo(32*.28,32*.65),r.lineTo(32*.72,32*.65),r.lineTo(32*.85,32),r.lineTo(32*.15,32),r.closePath(),r.fill(),r.fillStyle=o?"#ffffff":"rgba(60,40,10,0.6)",r.font=`bold ${Math.floor(32*.45)}px 'Press Start 2P', monospace`,r.textAlign="center",r.textBaseline="middle",r.fillText(a.charAt(0).toUpperCase(),32/2,32*.38),r.textAlign="left",r.textBaseline="alphabetic",r.strokeStyle=o?l:"rgba(139,105,20,0.5)",r.lineWidth=2,r.strokeRect(1,1,30,30)}function Ra(e,t,a,o,n){Sa(),e.innerHTML="",e.className="alibi-sidebar";const r=document.createElement("div");r.className="alibi-sidebar-section";const l=document.createElement("div");l.className="alibi-sidebar-label",l.textContent="Rooms",r.appendChild(l);const c=document.createElement("div");c.className="alibi-room-legend",t.floorPlan.rooms.forEach((F,k)=>{const g=document.createElement("div");g.className="alibi-room-entry";const T=document.createElement("div");T.className="alibi-room-swatch",T.style.background=He[k%He.length],T.style.borderColor=Ve[k%Ve.length];const R=document.createElement("span");R.textContent=F.name,g.appendChild(T),g.appendChild(R),c.appendChild(g)}),r.appendChild(c),e.appendChild(r);const b=document.createElement("div");b.className="alibi-victim-section";const w=document.createElement("div");w.className="alibi-sidebar-label",w.textContent="Victim",b.appendChild(w);const d=document.createElement("div");d.className="alibi-victim-card",d.setAttribute("data-testid","victim-token");const h=document.createElement("div");h.className="alibi-victim-icon",h.textContent="?";const i=document.createElement("div");i.className="alibi-victim-label",a.size>=t.suspects.length?(i.textContent=`Location revealed!
Click victim cell`,h.textContent="☠",d.style.borderColor="rgba(192,57,43,0.7)",d.style.background="rgba(192,57,43,0.12)"):i.textContent=`Unknown
Place all ${t.suspects.length} suspects`,d.appendChild(h),d.appendChild(i),b.appendChild(d),e.appendChild(b);const p=document.createElement("div");p.className="alibi-sidebar-section";const f=document.createElement("div");f.className="alibi-sidebar-label",f.textContent="Suspects",p.appendChild(f);const y=document.createElement("div");y.className="alibi-suspect-section";for(const F of t.suspects){const k=a.has(F.id),g=document.createElement("div");g.className="alibi-suspect-card"+(k?" placed":""),g.setAttribute("data-testid",`suspect-card-${F.id}`);const T=document.createElement("div");T.className="alibi-suspect-portrait";const R=document.createElement("canvas");Ea(R,F.id,F.name,k),T.appendChild(R);const A=document.createElement("div");A.className="alibi-suspect-info";const V=document.createElement("div");V.className="alibi-suspect-name",V.textContent=F.name;const B=document.createElement("div");if(B.className="alibi-suspect-status",k){const E=a.get(F.id);B.textContent=`Col ${E.x+1}, Row ${E.y+1}`}else B.textContent="Not placed";A.appendChild(V),A.appendChild(B),g.appendChild(T),g.appendChild(A),y.appendChild(g)}p.appendChild(y),e.appendChild(p);const u=document.createElement("div");u.className="alibi-sidebar-section";const m=document.createElement("div");m.className="alibi-sidebar-label",m.textContent="Evidence",u.appendChild(m);const x=document.createElement("div");x.className="alibi-clue-section",t.clues.forEach((F,k)=>{const g=document.createElement("div");g.className="alibi-clue-card",g.setAttribute("data-testid",`clue-${k}`),o.has(k)&&g.classList.add("clue-satisfied"),n.has(k)&&g.classList.add("clue-error"),g.textContent=F.text,x.appendChild(g)}),u.appendChild(x),e.appendChild(u)}const Wa=`
.alibi-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  font-family: 'Press Start 2P', monospace;
}
.alibi-modal {
  background: #0a0a12;
  /* Pixel border — no radius */
  border: 3px solid #c0392b;
  border-radius: 0;
  box-shadow: 4px 4px 0 #6b0000, 8px 8px 0 rgba(0,0,0,0.5);
  padding: 28px 32px;
  max-width: 440px;
  width: 90%;
  color: #ffffff;
  text-align: center;
}
.alibi-modal h2 {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.85em;
  margin-bottom: 20px;
  color: #c0392b;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  line-height: 1.6;
}
.alibi-modal p {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.5em;
  line-height: 2;
  margin-bottom: 24px;
  color: #cccccc;
}
.alibi-modal button {
  background: #c0392b;
  color: #ffffff;
  border: 2px solid #ff5a47;
  border-radius: 0;
  padding: 10px 24px;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6em;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  box-shadow: 3px 3px 0 #6b0000;
}
.alibi-modal button:hover { background: #e74c3c; }
.alibi-modal button:active { transform: translate(2px,2px); box-shadow: 1px 1px 0 #6b0000; }
/* GUILTY stamp — pixel-art slam animation */
.alibi-guilty-stamp {
  font-family: 'Press Start 2P', monospace;
  font-size: 1.8em;
  color: #c0392b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 20px 0 12px;
  display: inline-block;
  transform: rotate(-6deg);
  /* Hard pixel shadow */
  text-shadow:
    3px 0 0 #6b0000,
    0 3px 0 #6b0000,
    3px 3px 0 #6b0000,
    -1px -1px 0 #ff7060;
  border: 4px solid #c0392b;
  padding: 6px 16px;
  animation: alibi-stamp 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes alibi-stamp {
  0%   { transform: rotate(-6deg) scale(2.5); opacity: 0; }
  70%  { transform: rotate(-6deg) scale(0.92); opacity: 1; }
  85%  { transform: rotate(-6deg) scale(1.06); }
  100% { transform: rotate(-6deg) scale(1); opacity: 1; }
}
.alibi-guilty-killer {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.75em;
  font-weight: bold;
  color: #ffffff;
  margin: 12px 0 6px;
  letter-spacing: 0.05em;
  line-height: 1.6;
}
`;let _e=!1;function Ne(){if(_e)return;const e=document.createElement("style");e.textContent=Wa,document.head.appendChild(e),_e=!0}function xe(e,t,a){Ne(),Me(e);const o=document.createElement("div");o.className="alibi-overlay",o.setAttribute("data-testid","narrative-intro");const n=document.createElement("div");n.className="alibi-modal";const r=document.createElement("h2");r.textContent="A New Case";const l=document.createElement("p");l.textContent=t.narrativeIntro;const c=document.createElement("button");c.textContent="Begin Investigation",c.addEventListener("click",()=>{o.remove(),a()}),n.appendChild(r),n.appendChild(l),n.appendChild(c),o.appendChild(n),e.appendChild(o)}function Na(e,t){Ne(),Me(e);const a=t.narrativeGuilty.replace("{{killerName}}",t.killer.name),o=document.createElement("div");o.className="alibi-overlay";const n=document.createElement("div");n.className="alibi-modal";const r=document.createElement("div");r.className="alibi-guilty-stamp",r.setAttribute("data-testid","guilty-stamp"),r.textContent="GUILTY";const l=document.createElement("div");l.className="alibi-guilty-killer",l.setAttribute("data-testid","guilty-killer-name"),l.textContent=t.killer.name;const c=document.createElement("p");c.textContent=a;const b=document.createElement("p");b.textContent=t.narrativeVictimFound,n.appendChild(r),n.appendChild(l),n.appendChild(b),n.appendChild(c),o.appendChild(n),e.appendChild(o)}function Me(e){const t=e.querySelector(".alibi-overlay");t&&t.remove()}function Ma(e){Ne(),Me(e);const t=document.createElement("div");t.className="alibi-overlay",t.setAttribute("data-testid","msg-clue-gate");const a=document.createElement("div");a.className="alibi-modal";const o=document.createElement("h2");o.textContent="Something Doesn't Add Up…";const n=document.createElement("p");n.textContent="Check the clue cards. Not all witnesses are satisfied.";const r=document.createElement("button");r.textContent="Keep Investigating",r.addEventListener("click",()=>t.remove()),a.appendChild(o),a.appendChild(n),a.appendChild(r),t.appendChild(a),e.appendChild(t),setTimeout(()=>{t.isConnected&&t.remove()},3e3)}function Aa(){return{x:[],candidates:{}}}function Ye(e){return{placements:new Map,annotations:Aa(),satisfiedClues:new Set,errorClues:new Set,victimVisible:!1,victimCell:null,phase:"playing"}}function Ia(e,t,a,o,n){const r=new Map(e.placements);return r.set(a,{suspectId:a,x:o,y:n}),Ae({...e,placements:r},t)}function Pa(e,t,a){const o=new Map(e.placements);return o.delete(a),Ae({...e,placements:o},t)}function Ba(e){if(e.satisfiedClues.size===0&&e.placements.size>0)return e;const t=e.satisfiedClues.size+e.errorClues.size;return e.errorClues.size===0&&t>0&&e.victimVisible?{...e,phase:"guilty"}:e}function Ae(e,t){const a=new Set,o=new Set;t.clues.forEach((l,c)=>{const b=Ce(t.floorPlan,l,e.placements);b===!0?a.add(c):b===!1&&o.add(c)});const n=et(t.floorPlan,Array.from(e.placements.values()));return{...e,satisfiedClues:a,errorClues:o,victimVisible:n!==null,victimCell:n}}function U(e){return{x:[...e.x.map(([t,a])=>[t,a])],candidates:Object.fromEntries(Object.entries(e.candidates).map(([t,a])=>[t,[...a]]))}}function Oa(e,t,a){const o=U(e.annotations),n=o.x.findIndex(([r,l])=>r===t&&l===a);return n>=0?o.x.splice(n,1):o.x.push([t,a]),{...e,annotations:o}}function ja(e,t,a,o){const n=U(e.annotations),r=`${t},${a}`;return n.candidates[r]||(n.candidates[r]=[]),n.candidates[r].includes(o)||(n.candidates[r]=[...n.candidates[r],o]),{...e,annotations:n}}function La(e,t,a,o){const n=U(e.annotations),r=`${t},${a}`;return n.candidates[r]&&(n.candidates[r]=n.candidates[r].filter(l=>l!==o),n.candidates[r].length===0&&delete n.candidates[r]),{...e,annotations:n}}function za(e,t,a,o){const n=U(e.annotations);for(const l of Object.keys(n.candidates))n.candidates[l]=n.candidates[l].filter(c=>c!==t),n.candidates[l].length===0&&delete n.candidates[l];const r=n.x.findIndex(([l,c])=>l===a&&c===o);return r>=0&&n.x.splice(r,1),{...e,annotations:n}}function G(e){return{placements:new Map(e.placements),annotations:U(e.annotations)}}function Fe(e,t,a){return Ae({...e,placements:new Map(a.placements),annotations:U(a.annotations)},t)}const Ha=50;class Va{constructor(){we(this,"past",[]);we(this,"future",[])}push(t){this.past.push(t),this.past.length>Ha&&this.past.shift(),this.future=[]}undo(t){return this.past.length===0?null:(this.future.push(t),this.past.pop())}redo(t){return this.future.length===0?null:(this.past.push(t),this.future.pop())}canUndo(){return this.past.length>0}canRedo(){return this.future.length>0}clear(){this.past=[],this.future=[]}}let Q=null,pe=!1;function Da(){if(pe)return null;try{return Q||(Q=new AudioContext),Q.state==="suspended"&&Q.resume().catch(()=>{}),Q}catch{return null}}function Y(e,t,a="sine",o=.15){const n=Da();if(n)try{const r=n.createOscillator(),l=n.createGain();r.connect(l),l.connect(n.destination),r.type=a,r.frequency.value=e,l.gain.setValueAtTime(o,n.currentTime),l.gain.exponentialRampToValueAtTime(.001,n.currentTime+t),r.start(n.currentTime),r.stop(n.currentTime+t)}catch{}}function fe(e){switch(e){case"place":Y(440,.08,"sine",.12);break;case"remove":Y(330,.06,"sine",.08);break;case"clue-satisfied":Y(660,.12,"sine",.15);break;case"solve":{Y(523,.15,"sine",.2),setTimeout(()=>Y(659,.15,"sine",.2),150),setTimeout(()=>Y(784,.3,"sine",.25),300);break}case"error":Y(220,.2,"square",.1);break;case"navigate":Y(880,.05,"sine",.08);break}}function _a(){return pe=!pe,pe}function Ya(e,t){const a=Math.floor(t/6e4),o=Math.floor(t%6e4/1e3),n=a>0?`${a}m ${o}s`:`${o}s`,r=e.difficulty.charAt(0).toUpperCase()+e.difficulty.slice(1);return["🔍 ALIBI",`Case: ${e.floorPlan===e.floorPlan?e.themeId.replace(/-/g," ").replace(/\b\w/g,l=>l.toUpperCase()):"Unknown"}`,`Difficulty: ${r}`,`Clues: ${e.clues.length}`,`Time: ${n}`,`Killer: ${e.killer.name}`,"","pnz1990.github.io/alibi/"].join(`
`)}async function Ga(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;const t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:-9999px;left:-9999px;",document.body.appendChild(t),t.focus(),t.select();const a=document.execCommand("copy");return document.body.removeChild(t),a}catch{return!1}}const ne={campaign:e=>`alibi_campaign_${e}`,daily:e=>`alibi_daily_${e}`,streak:"alibi_streak",stats:"alibi_stats",prefs:"alibi_prefs",puzzleState:"alibi_puzzle_state"};function Ka(e){try{const t=Ie();t[e.key]=e,localStorage.setItem(ne.puzzleState,JSON.stringify(t))}catch{}}function Ua(e){try{return Ie()[e]??null}catch{return null}}function Ge(e){try{const t=Ie();delete t[e],localStorage.setItem(ne.puzzleState,JSON.stringify(t))}catch{}}function Ie(){try{const e=localStorage.getItem(ne.puzzleState);return e?JSON.parse(e):{}}catch{return{}}}function te(e){try{const t=localStorage.getItem(ne.campaign(e));return t?JSON.parse(t):null}catch{return null}}function Pe(e){try{localStorage.setItem(ne.campaign(e.slot),JSON.stringify(e))}catch{}}const qa=["coffee-shop","bookstore","backyard","holiday-mall","restaurant","gym","office","garden-party","hospital","carnival"],Za=["easy","easy","easy","easy","medium","medium","medium","medium","hard","hard","hard","hard"];function Ja(e,t){let a=e^t*2654435769;return a=(a>>>16^a)*73244475|0,a=(a>>>16^a)*73244475|0,a=a>>>16^a,Math.abs(a)}function Xa(e,t){const a=Math.floor(t/4),o=t%4,n=(e^a*4919+o*66)>>>0,r=[...qa];return r[n%r.length]}function nt(e){const t=Qa(),a=Array.from({length:12},(o,n)=>({seed:Ja(t,n),themeId:Xa(t,n),difficulty:Za[n],status:n===0?"in_progress":"locked"}));return{campaignSeed:t,slot:e,currentCase:0,startedAt:new Date().toISOString(),cases:a,rank:"rookie"}}function Qa(){return Math.floor(Math.random()*4294967295)}function en(e){const t=e.cases.filter(a=>a.status==="solved").length;return t>=12?"senior":t>=8?"detective":t>=4?"investigator":"rookie"}function tn(e,t,a,o){const n=e.cases.map((c,b)=>b===t?{...c,status:"solved",solveTimeMs:a,killerName:o}:b===t+1&&c.status==="locked"?{...c,status:"in_progress"}:c),r=t<11?t+1:t,l={...e,cases:n,currentCase:r};return{...l,rank:en(l)}}const an=`
.alibi-radial-overlay {
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
}
.alibi-cell-overlay {
  position: absolute;
  cursor: pointer;
  pointer-events: all;
  box-sizing: border-box;
}
.alibi-cell-overlay.placeable:hover {
  background: rgba(255,255,255,0.1);
}
.alibi-cell-overlay.victim-highlight {
  border: 4px solid #c0392b;
  background: rgba(192,57,43,0.18);
  cursor: pointer;
  animation: victim-pulse 0.9s ease-in-out infinite alternate;
}
@keyframes victim-pulse {
  from { background: rgba(192,57,43,0.1); }
  to   { background: rgba(192,57,43,0.35); }
}

/* ── Wheel container ──────────────────────────────────────────────────── */
.alibi-wheel {
  position: fixed;
  z-index: 500;
  pointer-events: none;
  /* Centered on click via transform */
}
.alibi-wheel-backdrop {
  position: fixed;
  inset: 0;
  z-index: 499;
  background: transparent;
  cursor: default;
}
.alibi-wheel-svg {
  pointer-events: all;
  overflow: visible;
  filter: drop-shadow(0 4px 16px rgba(0,0,0,0.7));
  animation: wheel-open 0.14s cubic-bezier(0.22,1,0.36,1) both;
  transform-origin: center;
}
@keyframes wheel-open {
  from { transform: scale(0.2); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
}
.alibi-wheel-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 28px;
  height: 28px;
  background: #1a1a2e;
  border: 2px solid #555;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #888;
  cursor: pointer;
  pointer-events: all;
  z-index: 501;
  font-family: 'Press Start 2P', monospace;
}
.alibi-wheel-center:hover {
  border-color: #c0392b;
  color: #c0392b;
}
/* Hidden testid targets for Playwright — each item gets a real DOM div */
.alibi-wheel-item-target {
  position: absolute;
  pointer-events: none;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
}
`;let Ke=!1;function nn(){if(Ke)return;const e=document.createElement("style");e.textContent=an,document.head.appendChild(e),Ke=!0}let Se=null,Te=null;function _(){Se?.remove(),Te?.remove(),Se=null,Te=null}function it(e,t,a){if(_(),!a.length)return;const o=52,n=22,r=document.createElement("div");r.className="alibi-wheel-backdrop",r.addEventListener("click",_),r.addEventListener("touchstart",_,{passive:!0}),document.body.appendChild(r),Te=r;const l=document.createElement("div");l.className="alibi-wheel",l.setAttribute("data-testid","radial-menu"),l.style.left=`${e}px`,l.style.top=`${t}px`,l.style.transform="translate(-50%, -50%)",l.style.pointerEvents="all";const c=a.length,b=(o+n+4)*2,w=b/2,d=b/2,h=document.createElementNS("http://www.w3.org/2000/svg","svg");h.setAttribute("class","alibi-wheel-svg"),h.setAttribute("width",String(b)),h.setAttribute("height",String(b)),h.setAttribute("viewBox",`0 0 ${b} ${b}`);let i=-1;a.forEach((f,y)=>{const u=y/c*Math.PI*2-Math.PI/2,m=(y+1)/c*Math.PI*2-Math.PI/2,x=(u+m)/2,F=.06,k=18,g=o+n,T=w+k*Math.cos(u+F),R=d+k*Math.sin(u+F),A=w+k*Math.cos(m-F),V=d+k*Math.sin(m-F),B=w+g*Math.cos(u+F),E=d+g*Math.sin(u+F),z=w+g*Math.cos(m-F),I=d+g*Math.sin(m-F),M=m-u-F*2>Math.PI?1:0,Be=[`M ${T} ${R}`,`A ${k} ${k} 0 ${M} 1 ${A} ${V}`,`L ${z} ${I}`,`A ${g} ${g} 0 ${M} 0 ${B} ${E}`,"Z"].join(" "),v=document.createElementNS("http://www.w3.org/2000/svg","path");v.setAttribute("d",Be),v.setAttribute("fill",f.color),v.setAttribute("stroke","rgba(0,0,0,0.5)"),v.setAttribute("stroke-width","1.5"),v.style.cursor="pointer",v.style.transition="filter 0.08s";const W=(k+g)/2,O=w+W*Math.cos(x),D=d+W*Math.sin(x),P=document.createElementNS("http://www.w3.org/2000/svg","text");P.setAttribute("x",String(O)),P.setAttribute("y",String(D)),P.setAttribute("text-anchor","middle"),P.setAttribute("dominant-baseline","middle"),P.setAttribute("fill","#ffffff"),P.setAttribute("font-size",c>8?"7":"8"),P.setAttribute("font-family","'Press Start 2P', monospace"),P.setAttribute("pointer-events","none"),P.style.userSelect="none",P.textContent=f.label,v.setAttribute("data-testid",f.testid),v.addEventListener("mouseenter",()=>{v.style.filter="brightness(1.4)",P.setAttribute("fill","#ffffc0")}),v.addEventListener("mouseleave",()=>{v.style.filter="",P.setAttribute("fill","#ffffff")}),v.addEventListener("click",rt=>{rt.stopPropagation(),_(),f.onClick()}),h.appendChild(v),h.appendChild(P)});let $=!1;h.addEventListener("touchstart",f=>{f.preventDefault(),$=!0},{passive:!1}),h.addEventListener("touchmove",f=>{if(!$)return;f.preventDefault();const y=f.touches[0],u=h.getBoundingClientRect(),m=y.clientX-(u.left+u.width/2),x=y.clientY-(u.top+u.height/2);if(Math.sqrt(m*m+x*x)<16){i>=0&&(h.children[i*2].style.filter="",i=-1);return}let k=Math.atan2(x,m)+Math.PI/2;k<0&&(k+=Math.PI*2);const g=Math.floor(k/(Math.PI*2)*c)%c;g!==i&&(i>=0&&(h.children[i*2].style.filter=""),i=g,h.children[g*2].style.filter="brightness(1.5)")},{passive:!1}),h.addEventListener("touchend",f=>{f.preventDefault(),$=!1,i>=0&&i<a.length&&(_(),a[i].onClick()),i=-1},{passive:!1}),l.appendChild(h);const p=document.createElement("div");p.className="alibi-wheel-center",p.textContent="✕",p.addEventListener("click",f=>{f.stopPropagation(),_()}),l.appendChild(p),document.body.appendChild(l),Se=l}function on(e,t,a,o,n){nn();const r=t.floorPlan,l=document.createElement("div");l.className="alibi-radial-overlay",l.style.cssText=`position:absolute;top:0;left:0;width:${r.width*S}px;height:${r.height*S}px;`,e.style.position="relative",e.appendChild(l);const c=[];for(let i=0;i<r.height;i++){c[i]=[];for(let $=0;$<r.width;$++){const p=r.tiles[i][$],f=document.createElement("div");f.setAttribute("data-testid",`cell-${$}-${i}`),f.style.cssText=`position:absolute;left:${$*S}px;top:${i*S}px;width:${S}px;height:${S}px;`,K(p)&&(f.classList.add("alibi-cell-overlay","placeable"),f.addEventListener("click",y=>{y.stopPropagation();const u=e.getBoundingClientRect(),m=u.left+($+.5)*S,x=u.top+(i+.5)*S;sn($,i,m,x,o,t,n)})),c[i][$]=f,l.appendChild(f)}}let b=null;const w=()=>_();document.addEventListener("keydown",i=>{i.key==="Escape"&&_()});function d(){const i=o();if(b&&(b.remove(),b=null),i.victimCell){const{x:f,y}=i.victimCell;b=document.createElement("div"),b.setAttribute("data-testid","victim-cell"),b.className="alibi-cell-overlay victim-highlight",b.style.cssText=`position:absolute;left:${f*S}px;top:${y*S}px;width:${S}px;height:${S}px;pointer-events:all;`,b.addEventListener("click",u=>{u.stopPropagation(),n.onVictimClick()}),l.appendChild(b)}const $=new Set,p=new Set;for(const f of i.placements.values())$.add(f.y),p.add(f.x);for(let f=0;f<r.height;f++)for(let y=0;y<r.width;y++){const u=c[f]?.[y];if(!u)continue;const m=r.tiles[f][y],x=Array.from(i.placements.values()).some(k=>k.x===y&&k.y===f),F=$.has(f)||p.has(y);u.style.pointerEvents=K(m)&&(!F||x)?"all":"none"}l.style.width=`${r.width*S}px`,l.style.height=`${r.height*S}px`;for(let f=0;f<r.height;f++)for(let y=0;y<r.width;y++){const u=c[f]?.[y];u&&(u.style.left=`${y*S}px`,u.style.top=`${f*S}px`,u.style.width=`${S}px`,u.style.height=`${S}px`)}l.querySelectorAll("[data-annotation]").forEach(f=>f.remove());for(const[f,y]of i.annotations.x){const u=document.createElement("div");u.setAttribute("data-testid",`cell-annotation-x-${f}-${y}`),u.setAttribute("data-annotation","x"),u.style.cssText=`position:absolute;left:${f*S}px;top:${y*S}px;width:${S}px;height:${S}px;pointer-events:none;`,l.appendChild(u)}for(const[f,y]of Object.entries(i.annotations.candidates)){if(!y.length)continue;const[u,m]=f.split(",").map(Number),x=document.createElement("div");x.setAttribute("data-testid",`cell-annotation-candidates-${u}-${m}`),x.setAttribute("data-annotation","candidates"),x.setAttribute("data-candidates",y.join(",")),x.style.cssText=`position:absolute;left:${u*S}px;top:${m*S}px;width:${S}px;height:${S}px;pointer-events:none;`,l.appendChild(x)}}function h(){document.removeEventListener("click",w),l.remove(),_()}return d(),{updateOverlays:d,detach:h}}function rn(e){let t=0;for(let o=0;o<e.length;o++)t=t*31+e.charCodeAt(o)&65535;const a=[0,30,60,120,180,210,270,300];return`hsl(${a[t%a.length]}, 65%, 40%)`}function sn(e,t,a,o,n,r,l){const c=n(),b=Array.from(c.placements.entries()).find(([,$])=>$.x===e&&$.y===t),w=new Set(c.placements.keys()),d=r.suspects.filter($=>!w.has($.id)),h=[];for(const $ of d)h.push({label:$.name.charAt(0).toUpperCase(),sublabel:`Place ${$.name}`,testid:`suspect-option-${$.id}`,color:rn($.id),onClick:()=>l.onPlace($.id,e,t)});const i=c.annotations.x.some(([$,p])=>$===e&&p===t);h.push({label:"✕",sublabel:i?"Clear X":"Mark X",testid:"suspect-option-markx",color:i?"#5a1a1a":"#3a1a1a",onClick:()=>l.onToggleX(e,t)}),d.length>0&&h.push({label:"?",sublabel:"Mark candidate",testid:"suspect-option-candidates",color:"#1a3a5a",onClick:()=>ln(e,t,a,o,n,r,l)}),b&&h.push({label:"↩",sublabel:"Remove",testid:"suspect-option-clear",color:"#2a2a2a",onClick:()=>l.onRemove(b[0])}),h.length&&it(a,o,h)}function ln(e,t,a,o,n,r,l){const c=n(),b=new Set(c.placements.keys()),w=c.annotations.candidates[`${e},${t}`]??[],d=[];for(const h of r.suspects){if(b.has(h.id))continue;const i=w.includes(h.id);d.push({label:h.name.charAt(0).toUpperCase()+"?",sublabel:i?`Remove ${h.name}?`:`Maybe ${h.name}`,testid:`suspect-option-candidate-${h.id}`,color:i?"#2a2a5a":"#1a1a3a",onClick:()=>i?l.onRemoveCandidate(h.id,e,t):l.onAddCandidate(h.id,e,t)})}d.length&&it(a,o,d)}function cn(e){return`${e.seed}-${e.themeId}-${e.difficulty}`}function dn(e){const t=new URLSearchParams(location.search),a=t.get("theme")??"coffee-shop",o=t.get("difficulty")??"easy",n=parseInt(t.get("seed")??"0",10),r=t.get("campaignSlot"),l=t.get("campaignCase"),c=r?parseInt(r,10):null,b=l?parseInt(l,10):null,w=at(a),d=wt(n,w,o),h=cn(d),i=fn(),$=i.querySelector(".alibi-canvas-wrapper"),p=i.querySelector(".alibi-sidebar-container"),f=document.getElementById("game-canvas"),y=f.getContext("2d");f.style.imageRendering="pixelated";function u(){wa(d.floorPlan.width,d.floorPlan.height);const{width:v,height:W}=ka(d);f.width=v,f.height=W,f.style.width=`${v}px`,f.style.height=`${W}px`,R()}$.appendChild(f);let m=Ye();const x=new Va;let F=Date.now(),k=0;function g(){return Date.now()-F+k}function T(v,W){const O={};W.placements.forEach((D,P)=>{O[P]={x:D.x,y:D.y}}),Ka({key:v,placements:O,elapsedMs:g(),savedAt:new Date().toISOString(),annotations:W.annotations})}function R(){va(y,d,w,m.placements,m.victimCell,m.annotations,()=>R()),Ra(p,d,m.placements,m.satisfiedClues,m.errorClues),A.updateOverlays()}const A=on($,d,w,()=>m,{onPlace(v,W,O){m.phase==="playing"&&(x.push(G(m)),m=Ia(m,d,v,W,O),m=za(m,v,W,O),T(h,m),fe(m.satisfiedClues.size>0?"clue-satisfied":"place"),R())},onRemove(v){m.phase==="playing"&&(x.push(G(m)),m=Pa(m,d,v),T(h,m),fe("remove"),R())},onVictimClick(){if(m.phase!=="playing")return;const v=Ba(m);if(v.phase==="guilty"){m=v;const W=g();if(Ge(h),fe("solve"),R(),Na(document.body,d),un(d,W),c!==null&&b!==null){const O=te(c);if(O){const D=tn(O,b,W,d.killer.name);Pe(D),setTimeout(()=>{window.location.href=`${window.location.pathname}?mode=campaign&campaignSlot=${c}`},3e3)}}}else fe("error"),R(),Ma(document.body)},onToggleX(v,W){m.phase==="playing"&&(x.push(G(m)),m=Oa(m,v,W),T(h,m),R())},onAddCandidate(v,W,O){m.phase==="playing"&&(x.push(G(m)),m=ja(m,W,O,v),T(h,m),R())},onRemoveCandidate(v,W,O){m.phase==="playing"&&(x.push(G(m)),m=La(m,W,O,v),T(h,m),R())}}),V=i.querySelector('[data-testid="btn-undo"]'),B=i.querySelector('[data-testid="btn-redo"]');V.addEventListener("click",E),B.addEventListener("click",z);function E(){const v=x.undo(G(m));v&&(m=Fe(m,d,v),R())}function z(){const v=x.redo(G(m));v&&(m=Fe(m,d,v),R())}const I=i.querySelector('[data-testid="btn-mute"]');I.addEventListener("click",()=>{const v=_a();I.textContent=v?"🔇":"🔊"}),document.addEventListener("keydown",v=>{(v.ctrlKey||v.metaKey)&&v.key==="z"&&!v.shiftKey&&(E(),v.preventDefault()),(v.ctrlKey||v.metaKey)&&(v.key==="y"||v.key==="z"&&v.shiftKey)&&(z(),v.preventDefault())});const M=Ua(h);M&&Object.keys(M.placements).length>0?pn(i,()=>{const v=new Map(Object.entries(M.placements).map(([D,P])=>[D,{suspectId:D,x:P.x,y:P.y}])),W=M.annotations??{x:[],candidates:{}},O={placements:v,annotations:W};m=Fe(Ye(),d,O),k=M.elapsedMs,F=Date.now(),u(),xe(document.body,d,()=>{})},()=>{Ge(h),xe(document.body,d,()=>{})}):xe(document.body,d,()=>{}),u(),new ResizeObserver(()=>u()).observe(document.body)}const hn=`
.alibi-game-screen {
  display: flex;
  align-items: stretch;
  gap: 0;
  height: 100vh;
  overflow: hidden;
  background: #0d0d1a;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255,255,255,0.012) 0px,
    rgba(255,255,255,0.012) 1px,
    transparent 1px,
    transparent 8px
  );
}
.alibi-grid-panel {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  position: relative;
}
.alibi-canvas-wrapper {
  overflow: hidden;
  position: relative;
  border: 3px solid #8b6914;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.6), 0 0 32px rgba(139,105,20,0.2);
  background: #1a120a;
}
.alibi-sidebar-container {
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  border-left: 2px solid #8b6914;
  box-shadow: -4px 0 16px rgba(0,0,0,0.4);
  min-width: 200px;
  max-width: 300px;
}
.alibi-toolbar {
  display: flex;
  gap: 6px;
  padding: 8px 10px;
  background: #0a0a12;
  border-bottom: 2px solid #333;
  flex-shrink: 0;
}
.alibi-toolbar button {
  background: #1a1a2e;
  color: #ccc;
  border: 2px solid #444;
  border-radius: 0;
  padding: 5px 10px;
  font-family: 'Press Start 2P', monospace;
  font-size: 8px;
  cursor: pointer;
  box-shadow: 2px 2px 0 #000;
}
.alibi-toolbar button:hover { background: #2a2a50; color: #fff; }
.alibi-toolbar button:active { transform: translate(1px,1px); box-shadow: 1px 1px 0 #000; }
`;let Ue=!1;function mn(){if(Ue)return;const e=document.createElement("style");e.textContent=hn,document.head.appendChild(e),Ue=!0}function fn(){mn();const e=document.createElement("div");e.setAttribute("data-testid","screen-game"),e.className="alibi-game-screen";const t=document.createElement("div");t.className="alibi-grid-panel",t.style.cssText="flex:1;display:flex;align-items:center;justify-content:center;padding:16px;overflow:hidden;";const a=document.createElement("div");a.className="alibi-canvas-wrapper",t.appendChild(a);const o=document.createElement("div");o.style.cssText="display:flex;flex-direction:column;height:100vh;width:280px;flex-shrink:0;";const n=document.createElement("div");n.className="alibi-toolbar";const r=ve("btn-undo","↩ Undo"),l=ve("btn-redo","↪ Redo"),c=ve("btn-mute","🔊");n.append(r,l,c);const b=document.createElement("div");b.className="alibi-sidebar-container",o.append(n,b),e.append(t,o);const w=document.getElementById("game-canvas");return w.parentElement?.insertBefore(e,w),e}function ve(e,t){const a=document.createElement("button");return a.setAttribute("data-testid",e),a.textContent=t,a}function un(e,t){const a=document.createElement("button");a.setAttribute("data-testid","btn-share"),a.style.cssText='position:fixed;bottom:24px;right:24px;z-index:300;background:#c0392b;color:#fff;border:2px solid #ff5a47;border-radius:0;padding:10px 20px;font-family:"Press Start 2P",monospace;font-size:11px;cursor:pointer;box-shadow:3px 3px 0 #6b0000;',a.textContent="📋 Share Result",a.addEventListener("click",async()=>{const o=Ya(e,t),n=await Ga(o);a.textContent=n?"✓ Copied!":"📋 Share Result",n&&setTimeout(()=>{a.textContent="📋 Share Result"},2e3)}),document.body.appendChild(a)}function pn(e,t,a){const o=document.createElement("div");o.setAttribute("data-testid","prompt-resume"),o.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:150;font-family:"Press Start 2P",monospace;';const n=document.createElement("div");n.style.cssText="background:#0a0a12;border:3px solid #c0392b;border-radius:0;box-shadow:4px 4px 0 #6b0000;padding:28px;max-width:360px;text-align:center;color:#fff;";const r=document.createElement("h2");r.style.cssText='color:#c0392b;margin-bottom:16px;font-family:"Press Start 2P",monospace;font-size:0.75em;line-height:1.6;',r.textContent="Resume?";const l=document.createElement("p");l.style.cssText='color:#aaa;margin-bottom:20px;font-family:"Press Start 2P",monospace;font-size:0.45em;line-height:2;',l.textContent="Continue your in-progress case?";const c=document.createElement("button");c.style.cssText='background:#c0392b;color:#fff;border:2px solid #ff5a47;border-radius:0;padding:9px 20px;font-family:"Press Start 2P",monospace;font-size:9px;cursor:pointer;margin-right:8px;box-shadow:2px 2px 0 #6b0000;',c.textContent="Resume",c.addEventListener("click",()=>{o.remove(),t()});const b=document.createElement("button");b.style.cssText='background:#1a1a2e;color:#fff;border:2px solid #555;border-radius:0;padding:9px 20px;font-family:"Press Start 2P",monospace;font-size:9px;cursor:pointer;box-shadow:2px 2px 0 #000;',b.textContent="Start Fresh",b.addEventListener("click",()=>{o.remove(),a()}),n.append(r,l,c,b),o.appendChild(n),e.appendChild(o)}function bn(e){let t=5381;for(let a=0;a<e.length;a++)t=(t<<5)+t+e.charCodeAt(a)|0;return Math.abs(t)}function wn(){const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const qe=[{themeId:"coffee-shop",difficulty:"easy"},{themeId:"bookstore",difficulty:"easy"},{themeId:"backyard",difficulty:"easy"},{themeId:"holiday-mall",difficulty:"easy"},{themeId:"restaurant",difficulty:"easy"},{themeId:"gym",difficulty:"easy"},{themeId:"office",difficulty:"easy"},{themeId:"garden-party",difficulty:"easy"},{themeId:"hospital",difficulty:"easy"},{themeId:"carnival",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"bookstore",difficulty:"medium"},{themeId:"backyard",difficulty:"medium"},{themeId:"holiday-mall",difficulty:"medium"},{themeId:"restaurant",difficulty:"medium"},{themeId:"gym",difficulty:"medium"},{themeId:"office",difficulty:"medium"},{themeId:"garden-party",difficulty:"medium"},{themeId:"hospital",difficulty:"medium"},{themeId:"carnival",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"bookstore",difficulty:"hard"},{themeId:"backyard",difficulty:"hard"},{themeId:"holiday-mall",difficulty:"hard"},{themeId:"restaurant",difficulty:"hard"},{themeId:"gym",difficulty:"hard"},{themeId:"office",difficulty:"hard"},{themeId:"garden-party",difficulty:"hard"},{themeId:"hospital",difficulty:"hard"},{themeId:"carnival",difficulty:"hard"}];function yn(e){const t=bn(e),a=new Date(e+"T12:00:00Z"),o=Math.floor((a.getTime()-new Date(a.getUTCFullYear(),0,0).getTime())/864e5),{themeId:n,difficulty:r}=qe[o%qe.length];return{seed:t,themeId:n,difficulty:r,dateStr:e}}function $n(){return yn(wn())}const gn=`
.alibi-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #0a0a12;
  font-family: 'Press Start 2P', monospace;
  color: #ffffff;
  gap: 0;
  position: relative;
  overflow: hidden;
}
/* Scanlines overlay for CRT feel */
.alibi-home::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(0,0,0,0.04) 3px,
    rgba(0,0,0,0.04) 4px
  );
  pointer-events: none;
  z-index: 1;
}
.alibi-home > * { position: relative; z-index: 2; }
.alibi-home-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 3.5em;
  color: #c0392b;
  /* Hard pixel shadow — no blur */
  text-shadow:
    4px 0 0 #8a0000,
    0 4px 0 #8a0000,
    4px 4px 0 #8a0000,
    8px 8px 0 rgba(0,0,0,0.5);
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
.alibi-home-subtitle {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.55em;
  color: #888;
  margin-bottom: 56px;
  letter-spacing: 0.05em;
  line-height: 1.8;
  text-align: center;
}
.alibi-home-eyebrow {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.5em;
  color: #c0392b;
  letter-spacing: 0.2em;
  margin-bottom: 16px;
  text-transform: uppercase;
}
.alibi-home-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 340px;
}
.alibi-home-btn {
  padding: 14px 20px;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6em;
  cursor: pointer;
  /* Flat pixel border — no radius */
  border-radius: 0;
  border: 2px solid;
  text-align: left;
  outline: none;
  line-height: 1.6;
}
.alibi-home-btn:hover { filter: brightness(1.15); }
.alibi-home-btn:active { transform: translate(2px,2px); }
.alibi-home-btn.primary {
  background: #c0392b;
  border-color: #ff5a47;
  color: #fff;
  /* Pixel inset highlight */
  box-shadow: inset 2px 2px 0 rgba(255,255,255,0.15), 3px 3px 0 #6b0000;
}
.alibi-home-btn.secondary {
  background: #1a1a2e;
  border-color: #555;
  color: #ccc;
  box-shadow: inset 2px 2px 0 rgba(255,255,255,0.05), 3px 3px 0 #000;
}
.alibi-home-btn .btn-title { display: block; }
.alibi-home-btn .btn-desc {
  display: block;
  font-size: 0.75em;
  color: rgba(255,255,255,0.5);
  margin-top: 6px;
  font-family: 'Press Start 2P', monospace;
}
`;let Ze=!1;function xn(){if(Ze)return;const e=document.createElement("style");e.textContent=gn,document.head.appendChild(e),Ze=!0}function Fn(){xn();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-home"),t.className="alibi-home";const a=document.createElement("div");a.className="alibi-home-eyebrow",a.textContent="— A Mystery Awaits —";const o=document.createElement("div");o.className="alibi-home-title",o.textContent="ALIBI";const n=document.createElement("div");n.className="alibi-home-subtitle",n.textContent=`Murder Mystery
Deduction`;const r=document.createElement("div");r.className="alibi-home-buttons",r.appendChild(ke("btn-campaign","primary","📁 Campaign","12 escalating cases")),r.appendChild(ke("btn-quickplay","secondary","🎲 Quick Play","Pick theme + difficulty")),r.appendChild(ke("btn-daily","secondary","📅 Daily Case","Same worldwide · daily streak")),t.append(a,o,n,r),document.body.appendChild(t),t.querySelector('[data-testid="btn-quickplay"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=quickplay`}),t.querySelector('[data-testid="btn-campaign"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=campaign`}),t.querySelector('[data-testid="btn-daily"]').addEventListener("click",()=>{t.remove();const{seed:l,themeId:c,difficulty:b}=$n();window.location.href=`${window.location.pathname}?theme=${c}&difficulty=${b}&seed=${l}`})}function ke(e,t,a,o){const n=document.createElement("button");n.setAttribute("data-testid",e),n.className=`alibi-home-btn ${t}`;const r=document.createElement("span");r.className="btn-title",r.textContent=a;const l=document.createElement("span");return l.className="btn-desc",l.textContent=o,n.append(r,l),n}const vn=`
.alibi-campaign-board {
  min-height: 100vh;
  background: #1a1a2e;
  font-family: monospace;
  color: #fff;
  padding: 32px;
}
.alibi-campaign-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}
.alibi-campaign-header h1 {
  font-size: 1.8em;
  color: #c0392b;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
.alibi-campaign-back {
  background: #1e1e35;
  color: #fff;
  border: 1px solid #444;
  padding: 6px 14px;
  font-family: monospace;
  font-size: 12px;
  cursor: pointer;
  border-radius: 3px;
}
.alibi-campaign-back:hover { background: #2a2a50; }
.alibi-case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  max-width: 900px;
}
.alibi-case-card {
  background: #1e1e35;
  border: 2px solid #444;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: border-color 0.15s, transform 0.1s;
}
.alibi-case-card:hover:not(.locked) {
  border-color: #c0392b;
  transform: translateY(-2px);
}
.alibi-case-card.locked {
  opacity: 0.45;
  cursor: default;
}
.alibi-case-card.unlocked { border-color: #c0392b; }
.alibi-case-card.solved { border-color: #2d8a2d; }
.alibi-case-num {
  font-size: 0.75em;
  color: #888;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.alibi-case-title {
  font-size: 0.95em;
  font-weight: bold;
  margin-bottom: 8px;
}
.alibi-case-difficulty {
  font-size: 0.7em;
  padding: 2px 8px;
  border-radius: 3px;
  background: #333;
  display: inline-block;
  margin-bottom: 8px;
}
.alibi-case-difficulty.easy   { background: #2d5a2d; color: #7ec87e; }
.alibi-case-difficulty.medium { background: #5a4a1a; color: #c8a03c; }
.alibi-case-difficulty.hard   { background: #5a1a1a; color: #c87e7e; }
.alibi-case-status { font-size: 1.2em; }
.alibi-case-time {
  font-size: 0.65em;
  color: #7ec87e;
  margin-top: 6px;
}
.alibi-slot-picker {
  max-width: 600px;
}
.alibi-slot-picker h2 {
  font-size: 1em;
  color: #888;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.alibi-slot-card {
  background: #1e1e35;
  border: 2px solid #444;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  margin-bottom: 12px;
  transition: border-color 0.15s, transform 0.1s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.alibi-slot-card:hover { border-color: #c0392b; transform: translateY(-1px); }
.alibi-slot-card.empty { opacity: 0.55; }
.alibi-slot-card.empty:hover { border-color: #555; }
.alibi-slot-info { flex: 1; }
.alibi-slot-label {
  font-size: 0.85em;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 6px;
}
.alibi-slot-rank {
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 4px;
}
.alibi-slot-progress {
  font-size: 0.75em;
  color: #aaa;
}
.alibi-slot-action {
  font-size: 0.75em;
  color: #c0392b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.alibi-campaign-rank {
  font-size: 0.75em;
  color: #888;
  margin-left: auto;
  padding-left: 24px;
}
`,ot={rookie:"🔍 Rookie",investigator:"🔎 Investigator",detective:"🕵 Detective",senior:"🕵️ Senior Detective",chief:"⭐ Chief Inspector"};let Je=!1;function kn(){if(Je)return;const e=document.createElement("style");e.textContent=vn,document.head.appendChild(e),Je=!0}function Cn(e){const t=Math.floor(e/1e3),a=Math.floor(t/60),o=t%60;return`${a}:${o.toString().padStart(2,"0")}`}function Sn(e){try{return at(e).name}catch{return e}}function be(e,t){t.innerHTML="";const a=document.createElement("div");a.className="alibi-campaign-header";const o=document.createElement("button");o.className="alibi-campaign-back",o.textContent="← Home",o.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="📁 Campaign";const r=document.createElement("div");r.className="alibi-campaign-rank",r.textContent=ot[e.rank]??e.rank,a.append(o,n,r);const l=document.createElement("div");l.className="alibi-case-grid",e.cases.forEach((c,b)=>{const w=c.status==="in_progress"||c.status==="solved",d=c.status==="solved",h=c.status==="locked",i=document.createElement("div");i.setAttribute("data-testid",`case-card-${b}`);let $="alibi-case-card";h&&($+=" locked"),d&&($+=" solved"),!h&&!d&&($+=" unlocked"),i.className=$;const p=document.createElement("div");p.className="alibi-case-num",p.textContent=`Case ${b+1}`;const f=document.createElement("div");f.className="alibi-case-title",f.textContent=w?Sn(c.themeId):"???";const y=document.createElement("div");y.className=`alibi-case-difficulty ${c.difficulty}`,y.textContent=c.difficulty.charAt(0).toUpperCase()+c.difficulty.slice(1);const u=document.createElement("div");if(u.setAttribute("data-testid",`case-status-${b}`),u.className=`alibi-case-status${h?" locked":""}`,u.textContent=d?"✅":h?"🔒":"📁",i.append(p,f,y,u),d&&c.solveTimeMs!=null){const m=document.createElement("div");m.className="alibi-case-time",m.textContent=`⏱ ${Cn(c.solveTimeMs)}`,i.appendChild(m)}h||i.addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?theme=${c.themeId}&difficulty=${c.difficulty}&seed=${c.seed}&campaignSlot=${e.slot}&campaignCase=${b}`}),l.appendChild(i)}),t.append(a,l)}function Tn(e,t){t.innerHTML="";const a=document.createElement("div");a.className="alibi-campaign-header";const o=document.createElement("button");o.className="alibi-campaign-back",o.textContent="← Home",o.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="📁 Campaign",a.append(o,n);const r=document.createElement("div");r.className="alibi-slot-picker";const l=document.createElement("h2");l.textContent="Choose Save Slot",r.appendChild(l),e.forEach((c,b)=>{const w=b+1,d=document.createElement("div");d.setAttribute("data-testid",`slot-card-${w}`),d.className=`alibi-slot-card${c?"":" empty"}`;const h=document.createElement("div");h.className="alibi-slot-info";const i=document.createElement("div");if(i.className="alibi-slot-label",i.textContent=`Save Slot ${w}`,h.appendChild(i),c){const p=document.createElement("div");p.className="alibi-slot-rank",p.textContent=ot[c.rank]??c.rank;const f=c.cases.filter(u=>u.status==="solved").length,y=document.createElement("div");y.className="alibi-slot-progress",y.textContent=`Case ${c.currentCase+1} of 12 · ${f} solved · ${new Date(c.startedAt).toLocaleDateString()}`,h.append(p,y)}else{const p=document.createElement("div");p.className="alibi-slot-rank",p.textContent="Empty",h.appendChild(p)}const $=document.createElement("div");$.className="alibi-slot-action",$.textContent=c?"Continue →":"New →",d.append(h,$),d.addEventListener("click",()=>{if(c)be(c,t);else{const p=nt(w);Pe(p),be(p,t)}}),r.appendChild(d)}),t.append(a,r)}function En(){kn();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-campaign-board"),t.className="alibi-campaign-board",document.body.appendChild(t);const a=te(1),o=te(2),n=te(3);if(a??o??n){const c=new URLSearchParams(location.search).get("campaignSlot");if(c){const b=parseInt(c,10),w=te(b);if(w){be(w,t);return}}Tn([a,o,n],t)}else{const l=nt(1);Pe(l),be(l,t)}}const Rn=`
.alibi-theme-select {
  min-height: 100vh;
  background: #1a1a2e;
  font-family: monospace;
  color: #fff;
  padding: 32px;
}
.alibi-theme-select-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}
.alibi-theme-select-header h1 {
  font-size: 1.5em;
  color: #c0392b;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.alibi-theme-back {
  background: #1e1e35;
  color: #fff;
  border: 1px solid #444;
  padding: 6px 14px;
  font-family: monospace;
  font-size: 12px;
  cursor: pointer;
  border-radius: 3px;
}
.alibi-theme-back:hover { background: #2a2a50; }
.alibi-difficulty-row {
  display: flex;
  gap: 10px;
  margin-bottom: 28px;
}
.alibi-diff-btn {
  padding: 8px 20px;
  font-family: monospace;
  font-size: 13px;
  cursor: pointer;
  border: 2px solid #444;
  border-radius: 4px;
  background: #1e1e35;
  color: #888;
  transition: all 0.1s;
}
.alibi-diff-btn.selected {
  color: #fff;
  border-color: #c0392b;
}
.alibi-diff-btn.easy.selected   { background: #2d5a2d; border-color: #7ec87e; color: #7ec87e; }
.alibi-diff-btn.medium.selected { background: #5a4a1a; border-color: #c8a03c; color: #c8a03c; }
.alibi-diff-btn.hard.selected   { background: #5a1a1a; border-color: #c87e7e; color: #c87e7e; }
.alibi-theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 28px;
  max-width: 900px;
}
.alibi-theme-card {
  background: #1e1e35;
  border: 2px solid #444;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: border-color 0.12s, transform 0.1s;
  text-align: center;
  font-size: 14px;
}
.alibi-theme-card:hover { border-color: #888; transform: translateY(-2px); }
.alibi-theme-card.selected { border-color: #c0392b; background: #2a0d0d; }
.alibi-theme-icon { font-size: 2em; margin-bottom: 8px; }
.alibi-play-btn {
  padding: 14px 40px;
  font-family: monospace;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  background: #c0392b;
  color: #fff;
  border: none;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: background 0.12s;
}
.alibi-play-btn:hover { background: #e74c3c; }
.alibi-play-btn:disabled { background: #444; cursor: default; opacity: 0.5; }
`,Wn={"coffee-shop":"☕",bookstore:"📚",backyard:"🌿","holiday-mall":"🎄",restaurant:"🍽",gym:"💪",office:"🏢","garden-party":"🌸",hospital:"🏥",carnival:"🎡"};let Xe=!1;function Nn(){if(Xe)return;const e=document.createElement("style");e.textContent=Rn,document.head.appendChild(e),Xe=!0}function Mn(){Nn();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-theme-select"),t.className="alibi-theme-select";const a=document.createElement("div");a.className="alibi-theme-select-header";const o=document.createElement("button");o.className="alibi-theme-back",o.textContent="← Home",o.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="🎲 Quick Play",a.append(o,n);let r="easy";const l=document.createElement("div");l.className="alibi-difficulty-row";const c={};for(const[i,$]of[["easy","Easy"],["medium","Medium"],["hard","Hard"]]){const p=document.createElement("button");p.setAttribute("data-testid",`difficulty-${i}`),p.className=`alibi-diff-btn ${i}${i==="easy"?" selected":""}`,p.textContent=$,p.addEventListener("click",()=>{r=i,Object.values(c).forEach(f=>f.classList.remove("selected")),p.classList.add("selected")}),c[i]=p,l.appendChild(p)}let b=null;const w=document.createElement("div");w.className="alibi-theme-grid";const d={};for(const i of ba()){if(i.id==="stub")continue;const $=document.createElement("div");$.setAttribute("data-testid",`theme-card-${i.id}`),$.className="alibi-theme-card";const p=document.createElement("div");p.className="alibi-theme-icon",p.textContent=Wn[i.id]??"🔍";const f=document.createElement("div");f.textContent=i.name.replace(/^The /,""),$.append(p,f),$.addEventListener("click",()=>{b=i.id,Object.values(d).forEach(y=>y.classList.remove("selected")),$.classList.add("selected"),h.disabled=!1}),d[i.id]=$,w.appendChild($)}const h=document.createElement("button");h.setAttribute("data-testid","btn-play"),h.className="alibi-play-btn",h.textContent="Play",h.disabled=!0,h.addEventListener("click",()=>{if(!b)return;const i=Math.floor(Math.random()*4294967295);t.remove(),window.location.href=`${window.location.pathname}?theme=${b}&difficulty=${r}&seed=${i}`}),t.append(a,l,w,h),document.body.appendChild(t)}const ue=new URLSearchParams(location.search);if(ue.has("theme")||ue.has("difficulty")||ue.has("seed"))dn();else switch(ue.get("mode")){case"campaign":En();break;case"quickplay":Mn();break;default:Fn();break}

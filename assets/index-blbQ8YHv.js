var Ee=Object.defineProperty;var Te=(e,t,o)=>t in e?Ee(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var U=(e,t,o)=>Te(e,typeof t!="symbol"?t+"":t,o);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const Re=new Set(["F","C","S","B"]);function N(e){return Re.has(e)}function M(e){return e==="C"||e==="S"||e==="B"}function te(e){const t=[];for(let o=0;o<e.width;o++)for(let a=0;a<e.height;a++)if(N(e.tiles[a][o])){t.push(o);break}return t}function ne(e){const t=[];for(let o=0;o<e.height;o++)for(let a=0;a<e.width;a++)if(N(e.tiles[o][a])){t.push(o);break}return t}function $(e,t,o){for(const a of e.rooms)for(const[n,s]of a.cells)if(n===t&&s===o)return a.id;return null}function Se(e){const t=new Set,o=new Set;for(const a of e)t.add(a.y),o.add(a.x);return{blockedRows:t,blockedCols:o}}function Fe(e,t){const{blockedRows:o,blockedCols:a}=Se(t),n=[];for(let s=0;s<e.height;s++)if(!o.has(s))for(let i=0;i<e.width;i++)a.has(i)||N(e.tiles[s][i])&&n.push({x:i,y:s});return n.length===1?n[0]:null}function Ie(e,t,o){const a=$(e,o.x,o.y);if(a===null)return null;for(const n of t)if($(e,n.x,n.y)===a)return n.suspectId;return null}function le(e,t,o,a){return Math.max(Math.abs(e-o),Math.abs(t-a))}function ee(e,t,o){const a=o.get(t.suspectId);if(!a)return null;switch(t.type){case"inRoom":return $(e,a.x,a.y)===t.roomId;case"notInRoom":return $(e,a.x,a.y)!==t.roomId;case"inSameRoom":{const n=o.get(t.otherSuspectId);if(!n)return null;const s=$(e,a.x,a.y),i=$(e,n.x,n.y);return s!==null&&s===i}case"inDifferentRoom":{const n=o.get(t.otherSuspectId);if(!n)return null;const s=$(e,a.x,a.y),i=$(e,n.x,n.y);return s===null||i===null?null:s!==i}case"inColumn":return a.x===t.col;case"inRow":return a.y===t.row;case"besideSuspect":{const n=o.get(t.otherSuspectId);return n?le(a.x,a.y,n.x,n.y)<=1:null}case"notBesideSuspect":{const n=o.get(t.otherSuspectId);return n?le(a.x,a.y,n.x,n.y)>1:null}case"besideObject":{for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++){if(s===0&&n===0)continue;const i=a.x+s,r=a.y+n;if(!(i<0||r<0||i>=e.width||r>=e.height)&&e.tiles[r][i]===t.objectTile)return!0}return!1}case"notBesideObject":{for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++){if(s===0&&n===0)continue;const i=a.x+s,r=a.y+n;if(!(i<0||r<0||i>=e.width||r>=e.height)&&e.tiles[r][i]===t.objectTile)return!1}return!0}case"onSeatTile":return M(e.tiles[a.y][a.x]);case"notOnSeatTile":return!M(e.tiles[a.y][a.x]);case"northOf":{const n=o.get(t.otherSuspectId);return n?a.y<n.y:null}case"southOf":{const n=o.get(t.otherSuspectId);return n?a.y>n.y:null}case"exactlyNRowsNorth":{const n=o.get(t.otherSuspectId);return n?n.y-a.y===t.n:null}case"exactlyNRowsSouth":{const n=o.get(t.otherSuspectId);return n?a.y-n.y===t.n:null}}}const Ne={easy:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom"],medium:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile"],hard:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile","notOnSeatTile","northOf","southOf","exactlyNRowsNorth","exactlyNRowsSouth"]};function G(e,t,o){const a=te(e),n=ne(e);if(t.length===0)return{count:0};if(t.length>Math.min(a.length,n.length))return{count:0};const s=new Set;for(let c=0;c<e.height;c++)for(let m=0;m<e.width;m++)N(e.tiles[c][m])&&s.add(`${m},${c}`);let i=0,r;const u=new Map,l=new Set,d=new Set;function h(c){if(i>=2)return;if(c===t.length){for(const b of o)if(ee(e,b,u)!==!0)return;i++,i===1&&(r=new Map(u));return}const m=t[c];for(const b of n)if(!l.has(b))for(const f of a){if(d.has(f)||!s.has(`${f},${b}`))continue;const g={suspectId:m,x:f,y:b};u.set(m,g),l.add(b),d.add(f);let w=!1;for(const v of o)if((v.suspectId===m||v.otherSuspectId===m)&&ee(e,v,u)===!1){w=!0;break}if(w||h(c+1),u.delete(m),l.delete(b),d.delete(f),i>=2)return}}return h(0),{count:i,firstSolution:r}}class Be extends Error{constructor(t){super(t),this.name="PuzzleGenerationError"}}function je(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let o=Math.imul(t^t>>>15,1|t);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296}}function $e(e,t){return Math.floor(e()*t)}function C(e,t){return t[$e(e,t.length)]}function O(e,t){const o=[...t];for(let a=o.length-1;a>0;a--){const n=$e(e,a+1);[o[a],o[n]]=[o[n],o[a]]}return o}function Le(e,t,o,a){const n=Ne[o],s=a.landmarks.length>=2,i=a.tiles.some(d=>d.some(h=>M(h))),r=n.filter(d=>!((d==="besideObject"||d==="notBesideObject")&&!s||(d==="onSeatTile"||d==="notOnSeatTile")&&!i)),u=Math.ceil(t*.4),l=[];for(let d=0;d<t;d++){const h=new Set;l.length>0&&h.add(l[l.length-1]);for(const g of r)l.filter(v=>v===g).length>=u&&h.add(g);const c=r.filter(g=>!h.has(g)),m=c.length>0?c:r,b=m.filter(g=>!l.includes(g)),f=b.length>0?b:m;l.push(C(e,f))}return l}function L(e,t,o,a,n,s,i){const r=i.get(n.id),u=o.clueTemplates;switch(a){case"inRoom":{const l=$(t,r.x,r.y);if(!l)return null;const d=t.rooms.find(h=>h.id===l);return{type:"inRoom",suspectId:n.id,roomId:l,text:u.inRoom(n.name,d.name)}}case"notInRoom":{const l=$(t,r.x,r.y),d=t.rooms.filter(c=>c.id!==l);if(d.length===0)return null;const h=C(e,d);return{type:"notInRoom",suspectId:n.id,roomId:h.id,text:u.notInRoom(n.name,h.name)}}case"inSameRoom":{const l=$(t,r.x,r.y);if(!l)return null;const d=s.filter(c=>{if(c.id===n.id)return!1;const m=i.get(c.id);return $(t,m.x,m.y)===l});if(d.length===0)return null;const h=C(e,d);return{type:"inSameRoom",suspectId:n.id,otherSuspectId:h.id,text:u.inSameRoom(n.name,h.name)}}case"inDifferentRoom":{const l=$(t,r.x,r.y),d=s.filter(c=>{if(c.id===n.id)return!1;const m=i.get(c.id),b=$(t,m.x,m.y);return b!==null&&b!==l});if(d.length===0)return null;const h=C(e,d);return{type:"inDifferentRoom",suspectId:n.id,otherSuspectId:h.id,text:u.inDifferentRoom(n.name,h.name)}}case"inColumn":return{type:"inColumn",suspectId:n.id,col:r.x,text:u.inColumn(n.name,r.x+1)};case"inRow":return{type:"inRow",suspectId:n.id,row:r.y,text:u.inRow(n.name,r.y+1)};case"besideSuspect":{const l=s.filter(h=>{if(h.id===n.id)return!1;const c=i.get(h.id);return Math.max(Math.abs(r.x-c.x),Math.abs(r.y-c.y))<=1});if(l.length===0)return null;const d=C(e,l);return{type:"besideSuspect",suspectId:n.id,otherSuspectId:d.id,text:u.besideSuspect(n.name,d.name)}}case"notBesideSuspect":{const l=s.filter(h=>{if(h.id===n.id)return!1;const c=i.get(h.id);return Math.max(Math.abs(r.x-c.x),Math.abs(r.y-c.y))>1});if(l.length===0)return null;const d=C(e,l);return{type:"notBesideSuspect",suspectId:n.id,otherSuspectId:d.id,text:u.notBesideSuspect(n.name,d.name)}}case"besideObject":{if(t.landmarks.length===0)return null;const l=t.landmarks.filter(c=>Math.max(Math.abs(r.x-c.x),Math.abs(r.y-c.y))<=1);if(l.length===0)return null;const d=C(e,l),h=t.tiles[d.y][d.x];return{type:"besideObject",suspectId:n.id,objectTile:h,text:u.besideObject(n.name,d.name)}}case"notBesideObject":{if(t.landmarks.length===0)return null;const l=t.landmarks.filter(c=>Math.max(Math.abs(r.x-c.x),Math.abs(r.y-c.y))>1);if(l.length===0)return null;const d=C(e,l),h=t.tiles[d.y][d.x];return{type:"notBesideObject",suspectId:n.id,objectTile:h,text:u.notBesideObject(n.name,d.name)}}case"onSeatTile":{const l=t.tiles[r.y][r.x];if(!M(l))return null;const d=l==="C"?"chair":l==="S"?"sofa":"bed";return{type:"onSeatTile",suspectId:n.id,text:u.onSeatTile(n.name,d)}}case"notOnSeatTile":{const l=t.tiles[r.y][r.x];return M(l)?null:{type:"notOnSeatTile",suspectId:n.id,text:u.notOnSeatTile(n.name)}}case"northOf":{const l=s.filter(h=>{if(h.id===n.id)return!1;const c=i.get(h.id);return r.y<c.y});if(l.length===0)return null;const d=C(e,l);return{type:"northOf",suspectId:n.id,otherSuspectId:d.id,text:u.northOf(n.name,d.name)}}case"southOf":{const l=s.filter(h=>{if(h.id===n.id)return!1;const c=i.get(h.id);return r.y>c.y});if(l.length===0)return null;const d=C(e,l);return{type:"southOf",suspectId:n.id,otherSuspectId:d.id,text:u.southOf(n.name,d.name)}}case"exactlyNRowsNorth":{const l=[];for(const h of s){if(h.id===n.id)continue;const m=i.get(h.id).y-r.y;m>0&&l.push({suspect:h,n:m})}if(l.length===0)return null;const d=C(e,l);return{type:"exactlyNRowsNorth",suspectId:n.id,otherSuspectId:d.suspect.id,n:d.n,text:u.exactlyNRowsNorth(n.name,d.suspect.name,d.n)}}case"exactlyNRowsSouth":{const l=[];for(const h of s){if(h.id===n.id)continue;const c=i.get(h.id),m=r.y-c.y;m>0&&l.push({suspect:h,n:m})}if(l.length===0)return null;const d=C(e,l);return{type:"exactlyNRowsSouth",suspectId:n.id,otherSuspectId:d.suspect.id,n:d.n,text:u.exactlyNRowsSouth(n.name,d.suspect.name,d.n)}}}}function Ae(e,t,o,a=1e3){const n=O(e,te(t)),s=O(e,ne(t)),i=o.length;if(i<1||i>Math.min(n.length,s.length))return null;let r=0;const u=new Map,l=new Set,d=new Set,h=O(e,s).slice(0,i);function c(m){if(m===i)return!0;const b=o[m],f=h[m],g=O(e,n);for(const w of g)if(!d.has(w)&&N(t.tiles[f]?.[w])){if(u.set(b.id,{suspectId:b.id,x:w,y:f}),l.add(f),d.add(w),c(m+1))return!0;if(r++,u.delete(b.id),l.delete(f),d.delete(w),r>=a)return!1}return!1}return c(0)?u:null}function Oe(e,t,o){for(let n=0;n<20;n++){const s=e+n*97>>>0,i=je(s),r=t.floorPlans[o],u=te(r),l=ne(r),d=Math.min(u.length,l.length)-1;if(d<2)continue;const m=O(i,[...t.suspectNames]).slice(0,d).map((x,S)=>({id:`s${S}`,name:x})),b=C(i,t.victimNames),f=Ae(i,r,m);if(!f)continue;const g=Array.from(f.values()),w=Fe(r,g);if(!w)continue;const v=Ie(r,g,w);if(!v)continue;const I=m.find(x=>x.id===v),j=C(i,t.narrativeTemplates.intro),B=C(i,t.narrativeTemplates.victimFound),z=C(i,t.narrativeTemplates.guiltyText).replace("{{killerName}}",I.name).replace("{{evidenceText}}","the evidence is conclusive"),W=Le(i,d,o,r),F=[];for(let x=0;x<d;x++){const S=m[x],k=W[x];let E=L(i,r,t,k,S,m,f);E||(E=L(i,r,t,"inRow",S,m,f)),E||(E=L(i,r,t,"inColumn",S,m,f)),E&&F.push(E)}let y=G(r,m.map(x=>x.id),F);if(y.count!==0){if(y.count!==1)for(const x of m){if(y.count===1)break;if(!F.some(k=>k.type==="inRow"&&k.suspectId===x.id)){const k=L(i,r,t,"inRow",x,m,f);k&&F.push(k),y=G(r,m.map(E=>E.id),F)}}if(y.count!==1)for(const x of m){if(y.count===1)break;if(!F.some(k=>k.type==="inColumn"&&k.suspectId===x.id)){const k=L(i,r,t,"inColumn",x,m,f);k&&F.push(k),y=G(r,m.map(E=>E.id),F)}}if(y.count===1)return{seed:s,themeId:t.id,difficulty:o,suspects:m,victimName:b,clues:F,solution:f,victimCell:w,killer:I,narrativeIntro:j,narrativeVictimFound:B,narrativeGuilty:z,floorPlan:r}}}throw new Be(`Failed to generate unique puzzle after 20 retries (seed=${e}, theme=${t.id}, difficulty=${o})`)}const Me={width:5,height:6,tiles:[["bB","bB","bB","W","W"],["F","F","F","C","F"],["pL","F","C","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"],["W","cR","W","F","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[3,1],[4,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"restroom",name:"Restroom",cells:[[1,5],[3,5],[4,5]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-entrance",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},ze={width:6,height:7,tiles:[["bB","bB","bB","bB","W","W"],["F","F","F","F","C","F"],["pL","F","C","F","F","F"],["F","S","F","pL","F","C"],["F","F","tB","F","F","F"],["C","F","F","F","W","F"],["W","cR","W","W","W","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5]]},{id:"restroom",name:"Restroom",cells:[[1,6],[5,5],[5,6]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-door",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:3,y:3},{id:"table",name:"the table",x:2,y:4},{id:"cash-register",name:"the cash register",x:1,y:6}]},We={width:7,height:8,tiles:[["bB","bB","bB","bB","bB","W","W"],["F","F","F","F","F","C","F"],["F","C","F","pL","F","F","F"],["pL","F","S","F","C","F","pL"],["F","F","F","tB","F","F","F"],["F","C","F","F","F","tB","C"],["F","F","F","F","F","W","F"],["W","cR","W","F","C","W","F"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]]},{id:"main-area",name:"Main Area",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[6,6]]},{id:"restroom",name:"Restroom",cells:[[1,7]]},{id:"back-office",name:"Back Office",cells:[[3,7],[4,7],[6,7]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-1",name:"the plant",x:3,y:2},{id:"plant-2",name:"the plant",x:0,y:3},{id:"plant-3",name:"the plant",x:6,y:3},{id:"table",name:"the table",x:3,y:4},{id:"table-2",name:"the small table",x:5,y:5},{id:"cash-register",name:"the cash register",x:1,y:7}]},Pe={width:5,height:5,tiles:[["sH","F","W","sH","sH"],["F","F","W","F","F"],["sH","F","tB","F","sH"],["F","F","F","F","F"],["F","cR","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[2,3]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,3],[4,3]]},{id:"checkout",name:"Checkout",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:3,y:0},{id:"shelf-3",name:"the shelf",x:4,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:4,y:2},{id:"table",name:"the table",x:2,y:2},{id:"cash-register",name:"the cash register",x:1,y:4}]},He={width:6,height:6,tiles:[["sH","F","W","W","sH","sH"],["F","F","W","F","F","F"],["sH","F","F","F","F","sH"],["F","F","W","F","tB","F"],["F","F","F","F","F","F"],["F","cR","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,2],[3,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,1],[4,1],[5,1],[3,2],[4,2],[5,2],[4,3],[5,3]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,4],[4,4],[5,4]]},{id:"checkout",name:"Checkout",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:4,y:0},{id:"shelf-3",name:"the shelf",x:5,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:5,y:2},{id:"table",name:"the table",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},_e={width:7,height:7,tiles:[["sH","F","F","W","sH","sH","sH"],["F","F","sH","W","F","F","F"],["sH","F","F","tB","F","F","sH"],["F","F","W","W","F","tB","F"],["sH","F","F","F","F","F","F"],["F","F","F","F","F","F","sH"],["F","cR","C","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,1],[3,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"romance-novels",name:"Romance Novels",cells:[[4,3],[5,3],[6,3],[3,4],[4,4],[5,4],[6,4],[3,5],[4,5],[5,5]]},{id:"collectors",name:"Collector's Corner",cells:[[6,5]]},{id:"checkout",name:"Checkout",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"shelf-crime",name:"the shelf",x:0,y:0},{id:"shelf-nonfic-1",name:"the shelf",x:4,y:0},{id:"shelf-nonfic-2",name:"the shelf",x:5,y:0},{id:"shelf-nonfic-3",name:"the shelf",x:6,y:0},{id:"shelf-crime-2",name:"the shelf",x:0,y:2},{id:"shelf-nonfic-4",name:"the shelf",x:6,y:2},{id:"table-1",name:"the reading table",x:3,y:2},{id:"table-2",name:"the table",x:5,y:3},{id:"shelf-best",name:"the shelf",x:0,y:4},{id:"shelf-collect",name:"the shelf",x:6,y:5},{id:"cash-register",name:"the cash register",x:1,y:6}]},Ve={width:5,height:5,tiles:[["pL","F","W","jZ","jZ"],["F","F","W","jZ","C"],["pL","F","F","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[3,0],[4,0],[3,1],[4,1]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:0,y:2},{id:"plant-3",name:"the plant",x:4,y:3},{id:"jacuzzi",name:"the jacuzzi",x:3,y:0}]},De={width:6,height:7,tiles:[["pL","F","F","W","jZ","jZ"],["F","F","F","W","jZ","C"],["F","pL","F","F","F","F"],["W","W","W","W","W","W"],["B","F","F","S","F","F"],["F","F","tV","F","F","F"],["F","F","W","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[4,0],[5,0],[4,1],[5,1]]},{id:"deck",name:"Deck",cells:[[3,2],[4,2],[5,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:1,y:2},{id:"jacuzzi",name:"the jacuzzi",x:4,y:0},{id:"tv",name:"the TV",x:2,y:5}]},qe={width:7,height:8,tiles:[["pL","F","F","F","W","jZ","jZ"],["F","F","pL","F","W","jZ","C"],["F","F","F","F","F","C","F"],["W","W","W","W","W","W","W"],["B","F","F","S","F","F","W"],["F","F","tV","F","F","pL","W"],["W","W","W","cT","F","F","W"],["W","W","F","F","F","W","W"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[5,0],[6,0],[5,1],[6,1]]},{id:"deck",name:"Deck",cells:[[4,2],[5,2],[6,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5]]},{id:"kitchen",name:"Kitchen",cells:[[3,6],[4,6],[5,6],[2,7],[3,7],[4,7]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:2,y:1},{id:"plant-3",name:"the plant",x:5,y:5},{id:"jacuzzi",name:"the jacuzzi",x:5,y:0},{id:"tv",name:"the TV",x:2,y:5},{id:"counter",name:"the counter",x:3,y:6}]},T={"coffee-shop":{easy:Me,medium:ze,hard:We},bookstore:{easy:Pe,medium:He,hard:_e},backyard:{easy:Ve,medium:De,hard:qe}};function de(e){const t=["th","st","nd","rd"],o=e%100;return e+(t[(o-20)%10]??t[o]??t[0])}const Ye={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the café.`,inColumn:(e,t)=>`${e} was in the ${de(t)} column.`,inRow:(e,t)=>`${e} was in the ${de(t)} row.`,besideSuspect:(e,t)=>`${e} was standing next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>t==="chair"?`${e} was sitting in a chair.`:t==="sofa"?`${e} was on the sofa.`:`${e} was on the ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} south of ${t}.`},Ue={id:"coffee-shop",name:"The Coffee Shop",floorPlans:{easy:T["coffee-shop"].easy,medium:T["coffee-shop"].medium,hard:T["coffee-shop"].hard},suspectNames:["Alice","Ben","Chloe","Diego","Elena","Finlay","Grace","Hassan","Iris","Jake","Lena","Marco"],victimNames:["Victor","Violet","Vera","Valencia","Vance","Vivian"],clueTemplates:Ye,narrativeTemplates:{intro:["A body has been found at the Copper Bean Café. The morning rush never arrived — instead, the regulars found yellow tape across the door. You pour yourself an espresso and get to work.","The Copper Bean Café is closed for a very different reason today. Someone is dead, and the witnesses are all still clutching their lattes. You take out your notebook.","It was supposed to be a quiet Tuesday at the Copper Bean. Then the screaming started. Now it's your problem. You order a black coffee and begin."],victimFound:["The victim was discovered near table four, cold cup of coffee still in hand.","Staff found the victim behind the counter during the morning prep.","A regular spotted the victim slumped in the corner booth before opening."],guiltyText:["{{killerName}} — served with a side of motive.","{{killerName}} — the evidence is as clear as an Americano.","{{killerName}} — there's no running from the detective on this one."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:plant":"","object:cash-register":"","object:table":""}};function me(e){const t=["th","st","nd","rd"],o=e%100;return e+(t[(o-20)%10]??t[o]??t[0])}const Ge={inRoom:(e,t)=>`${e} was browsing in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same section as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different sections.`,inColumn:(e,t)=>`${e} was in the ${me(t)} column.`,inRow:(e,t)=>`${e} was in the ${me(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was standing near ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="chair"?`${e} was sitting in a reading chair.`:`${e} was sitting on the ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} south of ${t}.`},Ke={id:"bookstore",name:"The Bookstore",floorPlans:{easy:T.bookstore.easy,medium:T.bookstore.medium,hard:T.bookstore.hard},suspectNames:["Alex","Bridget","Colin","Diana","Edmund","Fiona","George","Hannah","Ivan","Julia","Kevin","Lydia"],victimNames:["Vincent","Valerie","Violet","Victor","Vera","Valencia"],clueTemplates:Ge,narrativeTemplates:{intro:["The First Chapter Bookshop opened this morning to find more than just dust between the shelves. Someone is dead, and the regulars are still clutching their Earl Grey. You step over the crime scene tape and start asking questions.","A reader never returns a book. This one never returned at all. The First Chapter Bookshop is closed indefinitely — and you're the reason it might reopen. Notebook out.","Mondays at the bookshop are quiet. This Monday is the quietest it's ever been. The body was found in the stacks before the first customer arrived. You're on the case."],victimFound:["The victim was discovered slumped against the shelf in the early morning.","A shop assistant found the victim face-down near the reading table.","The victim was found between the shelves before opening time."],guiltyText:["{{killerName}} — the ending nobody saw coming.","{{killerName}} — the plot twist is on the last page.","{{killerName}} — even mysteries have their answers."]},colorPalette:{floor:"#f0ead6",wall:"#3d2b1f",seat:"#7a5c3a",accent:"#8b1a1a",background:"#1a1510",text:"#ffffff"},spriteMap:{"object:shelf":"","object:table":"","object:cash-register":""}};function ue(e){const t=["th","st","nd","rd"],o=e%100;return e+(t[(o-20)%10]??t[o]??t[0])}const Je={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the yard.`,inColumn:(e,t)=>`${e} was in the ${ue(t)} column.`,inRow:(e,t)=>`${e} was in the ${ue(t)} row.`,besideSuspect:(e,t)=>`${e} was right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="sofa"?`${e} was on the outdoor sofa.`:t==="bed"?`${e} was in the bedroom.`:`${e} was sitting in a chair.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} south of ${t}.`},Ze={id:"backyard",name:"The Backyard",floorPlans:{easy:T.backyard.easy,medium:T.backyard.medium,hard:T.backyard.hard},suspectNames:["Aaron","Becca","Chad","Donna","Eric","Fran","Greg","Helen","Ian","Jess","Kurt","Lisa"],victimNames:["Victor","Vanessa","Vince","Vera","Valentina","Virgil"],clueTemplates:Je,narrativeTemplates:{intro:["The Hendersons were supposed to be hosting a barbecue. Instead, they're hosting a detective. Someone is dead in the backyard and the potato salad is getting warm. You flash your badge.","Summer parties end in hangovers, not homicides. Usually. The backyard of 14 Maple Drive is now a crime scene and you're the one who has to ruin everyone's weekend.","It was a perfect Sunday afternoon until it wasn't. The body was found near the jacuzzi before anyone noticed their drink had gone untouched. You arrive with your notepad."],victimFound:["The victim was found floating face-down near the jacuzzi.","A guest discovered the victim collapsed on the deck.","The victim was found on the grass between the patio chairs."],guiltyText:["{{killerName}} — summer is ruined.","{{killerName}} — the neighborhood will never be the same.","{{killerName}} — nobody escapes the backyard detective."]},colorPalette:{floor:"#d4e8c2",wall:"#5d4037",seat:"#8d6e63",accent:"#e64a19",background:"#1a200f",text:"#ffffff"},spriteMap:{"object:plant":"","object:jacuzzi-tile":"","object:tv":"","object:sofa":""}},Xe={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same room as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different rooms.`,inColumn:(e,t)=>`${e} was in column ${t}.`,inRow:(e,t)=>`${e} was in row ${t}.`,besideSuspect:(e,t)=>`${e} was beside ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>`${e} was on a ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} south of ${t}.`},Qe={id:"stub",name:"Test Room",floorPlans:{easy:T["coffee-shop"].easy,medium:T["coffee-shop"].medium,hard:T["coffee-shop"].hard},suspectNames:["Alice","Bob","Carol","Dave","Eve","Frank","Grace","Henry","Iris","Jack","Kate","Leo"],victimNames:["Vera","Victor","Violet","Valencia","Vance","Vivian"],clueTemplates:Xe,narrativeTemplates:{intro:["A crime has occurred in the Test Room.","Witnesses report suspicious activity.","The detective arrives on the scene."],victimFound:["The victim was found at the scene.","A body has been discovered.","The victim was discovered here."],guiltyText:["{{killerName}} — caught red-handed.","{{killerName}} — the evidence is clear.","{{killerName}} — guilty as charged."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{}},oe=new Map;function q(e){oe.set(e.id,e)}function et(e){const t=oe.get(e);if(!t)throw new Error(`Unknown theme: ${e}`);return t}function tt(){return Array.from(oe.values())}q(Ue);q(Ke);q(Ze);q(Qe);function nt(e,t){return t[e]??""}const p=64,K=new Map;function ot(e){if(!e)return null;if(K.has(e))return K.get(e);const t=new Image,o=new Blob([e],{type:"image/svg+xml"}),a=URL.createObjectURL(o);return t.onload=()=>{K.set(e,t),URL.revokeObjectURL(a)},t.src=a,null}function fe(e,t,o,a){e.fillStyle="#c8a96e",e.fillRect(t,o,p,p),e.fillStyle="#ffffff",e.font="8px monospace",e.textAlign="center",e.textBaseline="middle",e.fillText(a.slice(0,4),t+p/2,o+p/2),e.textAlign="left",e.textBaseline="alphabetic"}function at(e){let t=0;for(let o=0;o<e.length;o++)t=t*31+e.charCodeAt(o)&65535;return`hsl(${t%360}, 65%, 55%)`}const it={pL:"object:plant",tB:"object:table",sH:"object:shelf",cR:"object:cash-register",bB:"object:bar-counter",tV:"object:tv",cT:"object:counter",dK:"object:desk",pC:"object:photocopier",fB:"object:flower-bed",hB:"object:hospital-bed",mC:"object:medicine-cabinet",tR:"object:tree",tD:"object:teddy-bear",cH:"object:carousel-horse",tM:"object:treadmill",wT:"object:weight-rack",sT:"object:stall",jZ:"object:jacuzzi-tile"},st=new Set(["C","S","B"]);function rt(e,t,o,a,n){const s=t.floorPlan,i=o.colorPalette,{blockedRows:r,blockedCols:u}=Se(Array.from(a.values()));for(let l=0;l<s.height;l++)for(let d=0;d<s.width;d++){const h=s.tiles[l][d],c=d*p,m=l*p;if(h==="W"){e.fillStyle=i.wall,e.fillRect(c,m,p,p);continue}if(st.has(h)){e.fillStyle=i.seat,e.fillRect(c,m,p,p),e.fillStyle="rgba(0,0,0,0.2)",e.beginPath(),e.arc(c+p/2,m+p/2,p*.3,0,Math.PI*2),e.fill(),e.strokeStyle="rgba(0,0,0,0.1)",e.lineWidth=.5,e.strokeRect(c,m,p,p);continue}if(h!=="F"){const b=it[h]??`object:${h}`,f=nt(b,o.spriteMap);if(f){const g=ot(f);g?e.drawImage(g,c,m,p,p):fe(e,c,m,b.replace("object:",""))}else fe(e,c,m,b.replace("object:",""));continue}e.fillStyle=i.floor,e.fillRect(c,m,p,p),e.strokeStyle="rgba(0,0,0,0.1)",e.lineWidth=.5,e.strokeRect(c,m,p,p)}e.fillStyle="rgba(0, 0, 0, 0.15)";for(const l of r)e.fillRect(0,l*p,s.width*p,p);for(const l of u)e.fillRect(l*p,0,p,s.height*p);if(n){const l=n.x*p,d=n.y*p;e.strokeStyle=i.accent,e.lineWidth=3,e.strokeRect(l+2,d+2,p-4,p-4),e.fillStyle=`${i.accent}33`,e.fillRect(l+2,d+2,p-4,p-4)}for(const[l,d]of a){const h=t.suspects.find(b=>b.id===l);if(!h)continue;const c=d.x*p,m=d.y*p;e.fillStyle=at(l),e.beginPath(),e.arc(c+p/2,m+p/2,p*.38,0,Math.PI*2),e.fill(),e.fillStyle="#ffffff",e.font=`bold ${Math.floor(p*.4)}px monospace`,e.textAlign="center",e.textBaseline="middle",e.fillText(h.name.charAt(0).toUpperCase(),c+p/2,m+p/2),e.textAlign="left",e.textBaseline="alphabetic"}}function ct(e){return{width:e.floorPlan.width*p,height:e.floorPlan.height*p}}const lt=`
.alibi-sidebar {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: #0d0d1a;
  color: #ffffff;
  font-family: monospace;
  min-width: 220px;
  max-width: 280px;
  overflow-y: auto;
}
.alibi-suspect-section {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}
.alibi-suspect-card {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: #1e1e35;
  border-radius: 4px;
  border: 1px solid #333;
  font-size: 12px;
  cursor: default;
}
.alibi-suspect-card.placed {
  border-color: #c0392b;
  background: #2a0d0d;
}
.alibi-suspect-initial {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 11px;
  flex-shrink: 0;
}
.alibi-clue-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.alibi-clue-card {
  padding: 6px 8px;
  background: #1e1e35;
  border-radius: 4px;
  border: 1px solid #333;
  font-size: 11px;
  line-height: 1.4;
}
.alibi-clue-card.clue-satisfied {
  text-decoration: line-through;
  color: #666;
  border-color: #2d5a2d;
  background: #0d1a0d;
}
.alibi-clue-card.clue-error {
  border-color: #c0392b;
  background: #2a0d0d;
  animation: alibi-flash 0.5s ease-in-out 3;
}
@keyframes alibi-flash {
  0%, 100% { background: #2a0d0d; }
  50%       { background: #5a1a1a; }
}
`;let he=!1;function dt(){if(he)return;const e=document.createElement("style");e.textContent=lt,document.head.appendChild(e),he=!0}function mt(e){let t=0;for(let o=0;o<e.length;o++)t=t*31+e.charCodeAt(o)&65535;return`hsl(${t%360}, 65%, 55%)`}function ut(e,t,o,a,n){dt(),e.innerHTML="",e.className="alibi-sidebar";const s=document.createElement("div");s.className="alibi-suspect-section";for(const r of t.suspects){const u=document.createElement("div");u.className="alibi-suspect-card"+(o.has(r.id)?" placed":"");const l=document.createElement("div");l.className="alibi-suspect-initial",l.style.background=mt(r.id),l.textContent=r.name.charAt(0).toUpperCase();const d=document.createElement("span");d.textContent=r.name,u.appendChild(l),u.appendChild(d),s.appendChild(u)}e.appendChild(s);const i=document.createElement("div");i.className="alibi-clue-section",t.clues.forEach((r,u)=>{const l=document.createElement("div");l.className="alibi-clue-card",l.setAttribute("data-testid",`clue-${u}`),a.has(u)&&l.classList.add("clue-satisfied"),n.has(u)&&l.classList.add("clue-error"),l.textContent=r.text,i.appendChild(l)}),e.appendChild(i)}const ft=`
.alibi-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  font-family: monospace;
}
.alibi-modal {
  background: #1a1a2e;
  border: 2px solid #c0392b;
  border-radius: 8px;
  padding: 32px;
  max-width: 480px;
  width: 90%;
  color: #ffffff;
  text-align: center;
}
.alibi-modal h2 {
  font-size: 1.4em;
  margin-bottom: 16px;
  color: #c0392b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.alibi-modal p {
  font-size: 0.95em;
  line-height: 1.6;
  margin-bottom: 24px;
  color: #cccccc;
}
.alibi-modal button {
  background: #c0392b;
  color: #ffffff;
  border: none;
  padding: 10px 28px;
  font-family: monospace;
  font-size: 1em;
  cursor: pointer;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.alibi-modal button:hover {
  background: #e74c3c;
}
.alibi-guilty-stamp {
  font-size: 3em;
  font-weight: bold;
  color: #c0392b;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 16px 0;
  transform: rotate(-5deg) skewX(-5deg);
  display: inline-block;
  text-shadow: 2px 2px 0 #8a0000;
}
.alibi-guilty-killer {
  font-size: 1.6em;
  font-weight: bold;
  color: #ffffff;
  margin: 8px 0;
}
`;let pe=!1;function ae(){if(pe)return;const e=document.createElement("style");e.textContent=ft,document.head.appendChild(e),pe=!0}function J(e,t,o){ae(),ie(e);const a=document.createElement("div");a.className="alibi-overlay",a.setAttribute("data-testid","narrative-intro");const n=document.createElement("div");n.className="alibi-modal";const s=document.createElement("h2");s.textContent="A New Case";const i=document.createElement("p");i.textContent=t.narrativeIntro;const r=document.createElement("button");r.textContent="Begin Investigation",r.addEventListener("click",()=>{a.remove(),o()}),n.appendChild(s),n.appendChild(i),n.appendChild(r),a.appendChild(n),e.appendChild(a)}function ht(e,t){ae(),ie(e);const o=t.narrativeGuilty.replace("{{killerName}}",t.killer.name),a=document.createElement("div");a.className="alibi-overlay";const n=document.createElement("div");n.className="alibi-modal";const s=document.createElement("div");s.className="alibi-guilty-stamp",s.setAttribute("data-testid","guilty-stamp"),s.textContent="GUILTY";const i=document.createElement("div");i.className="alibi-guilty-killer",i.setAttribute("data-testid","guilty-killer-name"),i.textContent=t.killer.name;const r=document.createElement("p");r.textContent=o;const u=document.createElement("p");u.textContent=t.narrativeVictimFound,n.appendChild(s),n.appendChild(i),n.appendChild(u),n.appendChild(r),a.appendChild(n),e.appendChild(a)}function ie(e){const t=e.querySelector(".alibi-overlay");t&&t.remove()}function pt(e){ae(),ie(e);const t=document.createElement("div");t.className="alibi-overlay",t.setAttribute("data-testid","msg-clue-gate");const o=document.createElement("div");o.className="alibi-modal";const a=document.createElement("h2");a.textContent="Something Doesn't Add Up…";const n=document.createElement("p");n.textContent="Check the clue cards. Not all witnesses are satisfied.";const s=document.createElement("button");s.textContent="Keep Investigating",s.addEventListener("click",()=>t.remove()),o.appendChild(a),o.appendChild(n),o.appendChild(s),t.appendChild(o),e.appendChild(t),setTimeout(()=>{t.isConnected&&t.remove()},3e3)}function be(e){return{placements:new Map,satisfiedClues:new Set,errorClues:new Set,victimVisible:!1,victimCell:null,phase:"playing",elapsedMs:0}}function bt(e,t,o,a,n){const s=new Map(e.placements);return s.set(o,{suspectId:o,x:a,y:n}),se({...e,placements:s},t)}function yt(e,t,o){const a=new Map(e.placements);return a.delete(o),se({...e,placements:a},t)}function Z(e,t,o){return se({...e,placements:new Map(o)},t)}function gt(e){if(e.satisfiedClues.size===0&&e.placements.size>0)return e;const t=e.satisfiedClues.size+e.errorClues.size;return e.errorClues.size===0&&t>0&&e.victimVisible?{...e,phase:"guilty"}:e}function se(e,t){const o=new Set,a=new Set;t.clues.forEach((i,r)=>{const u=ee(t.floorPlan,i,e.placements);u===!0?o.add(r):u===!1&&a.add(r)});const n=Fe(t.floorPlan,Array.from(e.placements.values()));return{...e,satisfiedClues:o,errorClues:a,victimVisible:n!==null,victimCell:n}}const xt=50;class wt{constructor(){U(this,"past",[]);U(this,"future",[])}push(t){this.past.push(new Map(t)),this.past.length>xt&&this.past.shift(),this.future=[]}undo(t){return this.past.length===0?null:(this.future.push(new Map(t)),new Map(this.past.pop()))}redo(t){return this.future.length===0?null:(this.past.push(new Map(t)),new Map(this.future.pop()))}canUndo(){return this.past.length>0}canRedo(){return this.future.length>0}clear(){this.past=[],this.future=[]}}let A=null,_=!1;function vt(){if(_)return null;try{return A||(A=new AudioContext),A.state==="suspended"&&A.resume().catch(()=>{}),A}catch{return null}}function R(e,t,o="sine",a=.15){const n=vt();if(n)try{const s=n.createOscillator(),i=n.createGain();s.connect(i),i.connect(n.destination),s.type=o,s.frequency.value=e,i.gain.setValueAtTime(a,n.currentTime),i.gain.exponentialRampToValueAtTime(.001,n.currentTime+t),s.start(n.currentTime),s.stop(n.currentTime+t)}catch{}}function P(e){switch(e){case"place":R(440,.08,"sine",.12);break;case"remove":R(330,.06,"sine",.08);break;case"clue-satisfied":R(660,.12,"sine",.15);break;case"solve":{R(523,.15,"sine",.2),setTimeout(()=>R(659,.15,"sine",.2),150),setTimeout(()=>R(784,.3,"sine",.25),300);break}case"error":R(220,.2,"square",.1);break;case"navigate":R(880,.05,"sine",.08);break}}function kt(){return _=!_,_}function Ct(e,t){const o=Math.floor(t/6e4),a=Math.floor(t%6e4/1e3),n=o>0?`${o}m ${a}s`:`${a}s`,s=e.difficulty.charAt(0).toUpperCase()+e.difficulty.slice(1);return["🔍 ALIBI",`Case: ${e.floorPlan===e.floorPlan?e.themeId.replace(/-/g," ").replace(/\b\w/g,i=>i.toUpperCase()):"Unknown"}`,`Difficulty: ${s}`,`Clues: ${e.clues.length}`,`Time: ${n}`,`Killer: ${e.killer.name}`,"","pnz1990.github.io/alibi/"].join(`
`)}async function St(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;const t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:-9999px;left:-9999px;",document.body.appendChild(t),t.focus(),t.select();const o=document.execCommand("copy");return document.body.removeChild(t),o}catch{return!1}}const re={campaign:e=>`alibi_campaign_${e}`,daily:e=>`alibi_daily_${e}`,streak:"alibi_streak",stats:"alibi_stats",prefs:"alibi_prefs",puzzleState:"alibi_puzzle_state"};function Ft(e){try{const t=ce();t[e.key]=e,localStorage.setItem(re.puzzleState,JSON.stringify(t))}catch{}}function $t(e){try{return ce()[e]??null}catch{return null}}function ye(e){try{const t=ce();delete t[e],localStorage.setItem(re.puzzleState,JSON.stringify(t))}catch{}}function ce(){try{const e=localStorage.getItem(re.puzzleState);return e?JSON.parse(e):{}}catch{return{}}}const Et=`
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
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.2);
}
.alibi-cell-overlay.victim-highlight {
  border: 3px solid #c0392b;
  background: rgba(192,57,43,0.15);
  cursor: pointer;
  animation: victim-pulse 1s ease-in-out infinite alternate;
}
@keyframes victim-pulse {
  from { background: rgba(192,57,43,0.1); }
  to   { background: rgba(192,57,43,0.3); }
}
.alibi-radial-menu {
  position: fixed;
  background: #1a1a2e;
  border: 2px solid #c0392b;
  border-radius: 8px;
  padding: 6px;
  z-index: 200;
  min-width: 140px;
  font-family: monospace;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}
.alibi-radial-item {
  padding: 7px 12px;
  cursor: pointer;
  color: #fff;
  font-size: 13px;
  border-radius: 4px;
  white-space: nowrap;
}
.alibi-radial-item:hover {
  background: #c0392b;
}
.alibi-radial-clear {
  color: #888;
  border-top: 1px solid #333;
  margin-top: 4px;
}
`;let ge=!1;function Tt(){if(ge)return;const e=document.createElement("style");e.textContent=Et,document.head.appendChild(e),ge=!0}function Rt(e,t,o,a,n){Tt();const s=t.floorPlan,i=document.createElement("div");i.className="alibi-radial-overlay",i.style.cssText=`position:absolute;top:0;left:0;width:${s.width*p}px;height:${s.height*p}px;`,e.style.position="relative",e.appendChild(i);const r=[];for(let c=0;c<s.height;c++){r[c]=[];for(let m=0;m<s.width;m++){const b=s.tiles[c][m],f=document.createElement("div");f.setAttribute("data-testid",`cell-${m}-${c}`),f.style.cssText=`position:absolute;left:${m*p}px;top:${c*p}px;width:${p}px;height:${p}px;`,N(b)&&(f.classList.add("alibi-cell-overlay","placeable"),f.addEventListener("click",g=>{g.stopPropagation(),It(m,c,a,t,n)})),r[c][m]=f,i.appendChild(f)}}let u=null;const l=()=>D();document.addEventListener("click",l);function d(){const c=a();if(u&&(u.remove(),u=null),c.victimCell){const{x:f,y:g}=c.victimCell;u=document.createElement("div"),u.setAttribute("data-testid","victim-cell"),u.className="alibi-cell-overlay victim-highlight",u.style.cssText=`position:absolute;left:${f*p}px;top:${g*p}px;width:${p}px;height:${p}px;pointer-events:all;`,u.addEventListener("click",w=>{w.stopPropagation(),n.onVictimClick()}),i.appendChild(u)}const m=new Set,b=new Set;for(const f of c.placements.values())m.add(f.y),b.add(f.x);for(let f=0;f<s.height;f++)for(let g=0;g<s.width;g++){const w=r[f]?.[g];if(!w)continue;const v=s.tiles[f][g],I=m.has(f)||b.has(g),j=Array.from(c.placements.values()).some(B=>B.x===g&&B.y===f);w.style.pointerEvents=N(v)&&(!I||j)?"all":"none"}}function h(){document.removeEventListener("click",l),i.remove()}return d(),{updateOverlays:d,detach:h}}let V=null;function D(){V&&(V.remove(),V=null)}function It(e,t,o,a,n){D();const s=o(),i=Array.from(s.placements.entries()).find(([,c])=>c.x===e&&c.y===t),r=document.createElement("div");r.className="alibi-radial-menu",r.setAttribute("data-testid","radial-menu");const l=document.getElementById("game-canvas")?.getBoundingClientRect()??{left:0,top:0};r.style.left=`${l.left+(e+1)*p}px`,r.style.top=`${l.top+t*p}px`;const d=new Set(s.placements.keys()),h=a.suspects.filter(c=>!d.has(c.id));for(const c of h){const m=document.createElement("div");m.className="alibi-radial-item",m.setAttribute("data-testid",`suspect-option-${c.id}`),m.textContent=c.name,m.addEventListener("click",b=>{b.stopPropagation(),D(),n.onPlace(c.id,e,t)}),r.appendChild(m)}if(i){const c=document.createElement("div");c.className="alibi-radial-item alibi-radial-clear",c.setAttribute("data-testid","suspect-option-clear"),c.textContent="Clear",c.addEventListener("click",m=>{m.stopPropagation(),D(),n.onRemove(i[0])}),r.appendChild(c)}r.children.length!==0&&(document.body.appendChild(r),V=r)}function Nt(e){return`${e.seed}-${e.themeId}-${e.difficulty}`}function Bt(e){const t=new URLSearchParams(location.search),o=t.get("theme")??"coffee-shop",a=t.get("difficulty")??"easy",n=parseInt(t.get("seed")??"0",10),s=et(o),i=Oe(n,s,a),r=Nt(i),u=At(),l=u.querySelector(".alibi-canvas-wrapper"),d=u.querySelector(".alibi-sidebar-container"),h=document.getElementById("game-canvas"),c=h.getContext("2d"),{width:m,height:b}=ct(i);h.width=m,h.height=b,l.appendChild(h);let f=be();const g=new wt;function w(y,x){const S={};x.placements.forEach((k,E)=>{S[E]={x:k.x,y:k.y}}),Ft({key:y,placements:S,elapsedMs:x.elapsedMs,savedAt:new Date().toISOString()})}function v(){rt(c,i,s,f.placements,f.victimCell),ut(d,i,f.placements,f.satisfiedClues,f.errorClues),I.updateOverlays()}const I=Rt(l,i,s,()=>f,{onPlace(y,x,S){f.phase==="playing"&&(g.push(f.placements),f=bt(f,i,y,x,S),w(r,f),P(f.satisfiedClues.size>0?"clue-satisfied":"place"),v())},onRemove(y){f.phase==="playing"&&(g.push(f.placements),f=yt(f,i,y),w(r,f),P("remove"),v())},onVictimClick(){if(f.phase!=="playing")return;const y=gt(f);y.phase==="guilty"?(f=y,ye(r),P("solve"),v(),ht(document.body,i),Ot(i,f)):(P("error"),v(),pt(document.body))}}),j=u.querySelector('[data-testid="btn-undo"]'),B=u.querySelector('[data-testid="btn-redo"]');j.addEventListener("click",Y),B.addEventListener("click",z);function Y(){const y=g.undo(f.placements);y&&(f=Z(f,i,y),v())}function z(){const y=g.redo(f.placements);y&&(f=Z(f,i,y),v())}const W=u.querySelector('[data-testid="btn-mute"]');W.addEventListener("click",()=>{const y=kt();W.textContent=y?"🔇":"🔊"}),document.addEventListener("keydown",y=>{(y.ctrlKey||y.metaKey)&&y.key==="z"&&!y.shiftKey&&(Y(),y.preventDefault()),(y.ctrlKey||y.metaKey)&&(y.key==="y"||y.key==="z"&&y.shiftKey)&&(z(),y.preventDefault())});const F=$t(r);F&&Object.keys(F.placements).length>0?Mt(u,()=>{const y=new Map(Object.entries(F.placements).map(([x,S])=>[x,{suspectId:x,x:S.x,y:S.y}]));f=Z(be(),i,y),f={...f,elapsedMs:F.elapsedMs},v(),J(document.body,i,()=>{})},()=>{ye(r),J(document.body,i,()=>{})}):J(document.body,i,()=>{}),v()}const jt=`
.alibi-game-screen {
  display: flex; align-items: flex-start; gap: 0;
  height: 100vh; overflow: hidden; background: #1a1a2e;
}
.alibi-canvas-wrapper { flex-shrink: 0; overflow: auto; position: relative; }
.alibi-sidebar-container { flex: 1; height: 100vh; overflow-y: auto; display: flex; flex-direction: column; }
.alibi-toolbar {
  display: flex; gap: 6px; padding: 8px 12px;
  background: #0d0d1a; border-bottom: 1px solid #333; flex-shrink: 0;
}
.alibi-toolbar button {
  background: #1e1e35; color: #fff; border: 1px solid #444;
  padding: 4px 10px; font-family: monospace; font-size: 12px;
  cursor: pointer; border-radius: 3px;
}
.alibi-toolbar button:hover { background: #2a2a50; }
`;let xe=!1;function Lt(){if(xe)return;const e=document.createElement("style");e.textContent=jt,document.head.appendChild(e),xe=!0}function At(){Lt();const e=document.createElement("div");e.setAttribute("data-testid","screen-game"),e.className="alibi-game-screen";const t=document.createElement("div");t.className="alibi-canvas-wrapper";const o=document.createElement("div");o.style.cssText="display:flex;flex-direction:column;height:100vh;flex:1;";const a=document.createElement("div");a.className="alibi-toolbar";const n=X("btn-undo","↩ Undo"),s=X("btn-redo","↪ Redo"),i=X("btn-mute","🔊");a.append(n,s,i);const r=document.createElement("div");r.className="alibi-sidebar-container",o.append(a,r),e.append(t,o);const u=document.getElementById("game-canvas");return u.parentElement?.insertBefore(e,u),e}function X(e,t){const o=document.createElement("button");return o.setAttribute("data-testid",e),o.textContent=t,o}function Ot(e,t){const o=document.createElement("button");o.setAttribute("data-testid","btn-share"),o.style.cssText="position:fixed;bottom:24px;right:24px;z-index:300;background:#c0392b;color:#fff;border:none;padding:10px 20px;font-family:monospace;font-size:14px;cursor:pointer;border-radius:4px;",o.textContent="📋 Share Result",o.addEventListener("click",async()=>{const a=Ct(e,t.elapsedMs),n=await St(a);o.textContent=n?"✓ Copied!":"📋 Share Result",n&&setTimeout(()=>{o.textContent="📋 Share Result"},2e3)}),document.body.appendChild(o)}function Mt(e,t,o){const a=document.createElement("div");a.setAttribute("data-testid","prompt-resume"),a.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:150;font-family:monospace;";const n=document.createElement("div");n.style.cssText="background:#1a1a2e;border:2px solid #c0392b;border-radius:8px;padding:28px;max-width:360px;text-align:center;color:#fff;";const s=document.createElement("h2");s.style.cssText="color:#c0392b;margin-bottom:12px;",s.textContent="Resume Investigation?";const i=document.createElement("p");i.style.cssText="color:#aaa;margin-bottom:20px;font-size:0.9em;",i.textContent="You have an in-progress case. Resume where you left off?";const r=document.createElement("button");r.style.cssText="background:#c0392b;color:#fff;border:none;padding:9px 20px;font-family:monospace;cursor:pointer;border-radius:4px;margin-right:8px;",r.textContent="Resume",r.addEventListener("click",()=>{a.remove(),t()});const u=document.createElement("button");u.style.cssText="background:#333;color:#fff;border:none;padding:9px 20px;font-family:monospace;cursor:pointer;border-radius:4px;",u.textContent="Start Fresh",u.addEventListener("click",()=>{a.remove(),o()}),n.append(s,i,r,u),a.appendChild(n),e.appendChild(a)}const zt=`
.alibi-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #1a1a2e;
  font-family: monospace;
  color: #ffffff;
  gap: 0;
}
.alibi-home-title {
  font-size: 4em;
  font-weight: bold;
  letter-spacing: 0.2em;
  color: #c0392b;
  text-shadow: 2px 2px 0 #8a0000, 4px 4px 0 rgba(0,0,0,0.3);
  margin-bottom: 8px;
  text-transform: uppercase;
}
.alibi-home-subtitle {
  font-size: 0.9em;
  color: #888;
  margin-bottom: 48px;
  letter-spacing: 0.1em;
}
.alibi-home-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 300px;
}
.alibi-home-btn {
  padding: 16px 24px;
  font-family: monospace;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  border: 2px solid;
  border-radius: 6px;
  text-align: left;
  transition: transform 0.1s, background 0.15s;
  letter-spacing: 0.05em;
}
.alibi-home-btn:hover { transform: translateX(4px); }
.alibi-home-btn.primary {
  background: #c0392b;
  border-color: #e74c3c;
  color: #fff;
}
.alibi-home-btn.primary:hover { background: #e74c3c; }
.alibi-home-btn.secondary {
  background: #1e1e35;
  border-color: #444;
  color: #fff;
}
.alibi-home-btn.secondary:hover { background: #2a2a50; border-color: #666; }
.alibi-home-btn .btn-title { display: block; }
.alibi-home-btn .btn-desc { display: block; font-size: 0.7em; color: rgba(255,255,255,0.6); margin-top: 3px; font-weight: normal; }
`;let we=!1;function Wt(){if(we)return;const e=document.createElement("style");e.textContent=zt,document.head.appendChild(e),we=!0}function Pt(){Wt();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-home"),t.className="alibi-home";const o=document.createElement("div");o.className="alibi-home-title",o.textContent="ALIBI";const a=document.createElement("div");a.className="alibi-home-subtitle",a.textContent="A murder mystery deduction game";const n=document.createElement("div");n.className="alibi-home-buttons",n.appendChild(Q("btn-campaign","primary","📁 Campaign","12 escalating cases")),n.appendChild(Q("btn-quickplay","secondary","🎲 Quick Play","Pick theme and difficulty")),n.appendChild(Q("btn-daily","secondary","📅 Daily Case","Today's case · same worldwide")),t.append(o,a,n),document.body.appendChild(t),t.querySelector('[data-testid="btn-quickplay"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=quickplay`}),t.querySelector('[data-testid="btn-campaign"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=campaign`}),t.querySelector('[data-testid="btn-daily"]').addEventListener("click",()=>{t.remove();const{seed:s,themeId:i,difficulty:r}=_t();window.location.href=`${window.location.pathname}?theme=${i}&difficulty=${r}&seed=${s}`})}function Q(e,t,o,a){const n=document.createElement("button");n.setAttribute("data-testid",e),n.className=`alibi-home-btn ${t}`;const s=document.createElement("span");s.className="btn-title",s.textContent=o;const i=document.createElement("span");return i.className="btn-desc",i.textContent=a,n.append(s,i),n}const ve=[{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"}];function Ht(e){let t=5381;for(let o=0;o<e.length;o++)t=(t<<5)+t+e.charCodeAt(o)|0;return Math.abs(t)}function _t(){const e=new Date,t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,o=Ht(t),a=Math.floor((e.getTime()-new Date(e.getFullYear(),0,0).getTime())/864e5),{themeId:n,difficulty:s}=ve[a%ve.length];return{seed:o,themeId:n,difficulty:s}}const Vt=`
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
`;let ke=!1;function Dt(){if(ke)return;const e=document.createElement("style");e.textContent=Vt,document.head.appendChild(e),ke=!0}const qt=[{title:"The Coffee Shop",difficulty:"easy",seed:100},{title:"The Bookstore",difficulty:"easy",seed:101},{title:"The Backyard",difficulty:"easy",seed:102},{title:"The Holiday Mall",difficulty:"easy",seed:103},{title:"The Coffee Shop",difficulty:"medium",seed:200},{title:"The Bookstore",difficulty:"medium",seed:201},{title:"The Backyard",difficulty:"medium",seed:202},{title:"The Holiday Mall",difficulty:"medium",seed:203},{title:"The Coffee Shop",difficulty:"hard",seed:300},{title:"The Bookstore",difficulty:"hard",seed:301},{title:"The Backyard",difficulty:"hard",seed:302},{title:"The Holiday Mall",difficulty:"hard",seed:303}];function Yt(){Dt();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-campaign-board"),t.className="alibi-campaign-board";const o=document.createElement("div");o.className="alibi-campaign-header";const a=document.createElement("button");a.className="alibi-campaign-back",a.textContent="← Home",a.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="📁 Campaign",o.append(a,n);const s=document.createElement("div");s.className="alibi-case-grid",qt.forEach((i,r)=>{const u=document.createElement("div");u.setAttribute("data-testid",`case-card-${r}`),u.className=`alibi-case-card ${r===0?"unlocked":"locked"}`;const l=document.createElement("div");l.className="alibi-case-num",l.textContent=`Case ${r+1}`;const d=document.createElement("div");d.className="alibi-case-title",d.textContent=r===0?i.title:"???";const h=document.createElement("div");h.className=`alibi-case-difficulty ${i.difficulty}`,h.textContent=i.difficulty.charAt(0).toUpperCase()+i.difficulty.slice(1);const c=document.createElement("div");c.setAttribute("data-testid",`case-status-${r}`),c.className=`alibi-case-status ${r===0?"":"locked"}`,c.textContent=r===0?"📁":"🔒",u.append(l,d,h,c),r===0&&u.addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?theme=coffee-shop&difficulty=${i.difficulty}&seed=${i.seed}`}),s.appendChild(u)}),t.append(o,s),document.body.appendChild(t)}const Ut=`
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
`,Gt={"coffee-shop":"☕",bookstore:"📚",backyard:"🌿","holiday-mall":"🎄",restaurant:"🍽",gym:"💪",office:"🏢","garden-party":"🌸",hospital:"🏥",carnival:"🎡"};let Ce=!1;function Kt(){if(Ce)return;const e=document.createElement("style");e.textContent=Ut,document.head.appendChild(e),Ce=!0}function Jt(){Kt();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-theme-select"),t.className="alibi-theme-select";const o=document.createElement("div");o.className="alibi-theme-select-header";const a=document.createElement("button");a.className="alibi-theme-back",a.textContent="← Home",a.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="🎲 Quick Play",o.append(a,n);let s="easy";const i=document.createElement("div");i.className="alibi-difficulty-row";const r={};for(const[c,m]of[["easy","Easy"],["medium","Medium"],["hard","Hard"]]){const b=document.createElement("button");b.setAttribute("data-testid",`difficulty-${c}`),b.className=`alibi-diff-btn ${c}${c==="easy"?" selected":""}`,b.textContent=m,b.addEventListener("click",()=>{s=c,Object.values(r).forEach(f=>f.classList.remove("selected")),b.classList.add("selected")}),r[c]=b,i.appendChild(b)}let u=null;const l=document.createElement("div");l.className="alibi-theme-grid";const d={};for(const c of tt()){if(c.id==="stub")continue;const m=document.createElement("div");m.setAttribute("data-testid",`theme-card-${c.id}`),m.className="alibi-theme-card";const b=document.createElement("div");b.className="alibi-theme-icon",b.textContent=Gt[c.id]??"🔍";const f=document.createElement("div");f.textContent=c.name.replace(/^The /,""),m.append(b,f),m.addEventListener("click",()=>{u=c.id,Object.values(d).forEach(g=>g.classList.remove("selected")),m.classList.add("selected"),h.disabled=!1}),d[c.id]=m,l.appendChild(m)}const h=document.createElement("button");h.setAttribute("data-testid","btn-play"),h.className="alibi-play-btn",h.textContent="Play",h.disabled=!0,h.addEventListener("click",()=>{if(!u)return;const c=Math.floor(Math.random()*4294967295);t.remove(),window.location.href=`${window.location.pathname}?theme=${u}&difficulty=${s}&seed=${c}`}),t.append(o,i,l,h),document.body.appendChild(t)}const H=new URLSearchParams(location.search);if(H.has("theme")||H.has("difficulty")||H.has("seed"))Bt();else switch(H.get("mode")){case"campaign":Yt();break;case"quickplay":Jt();break;default:Pt();break}

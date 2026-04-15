var ot=Object.defineProperty;var st=(e,t,a)=>t in e?ot(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var oe=(e,t,a)=>st(e,typeof t!="symbol"?t+"":t,a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=a(i);fetch(i.href,o)}})();const rt=new Set(["F","C","S","B"]);function Y(e){return rt.has(e)}function J(e){return e==="C"||e==="S"||e==="B"}function be(e){const t=[];for(let a=0;a<e.width;a++)for(let s=0;s<e.height;s++)if(Y(e.tiles[s][a])){t.push(a);break}return t}function ye(e){const t=[];for(let a=0;a<e.height;a++)for(let s=0;s<e.width;s++)if(Y(e.tiles[a][s])){t.push(a);break}return t}function A(e,t,a){for(const s of e.rooms)for(const[i,o]of s.cells)if(i===t&&o===a)return s.id;return null}function Ze(e){const t=new Set,a=new Set;for(const s of e)t.add(s.y),a.add(s.x);return{blockedRows:t,blockedCols:a}}function Je(e,t){const{blockedRows:a,blockedCols:s}=Ze(t),i=[];for(let o=0;o<e.height;o++)if(!a.has(o))for(let l=0;l<e.width;l++)s.has(l)||Y(e.tiles[o][l])&&i.push({x:l,y:o});return i.length===1?i[0]:null}function lt(e,t,a){const s=A(e,a.x,a.y);if(s===null)return null;for(const i of t)if(A(e,i.x,i.y)===s)return i.suspectId;return null}function ke(e,t,a,s){return Math.max(Math.abs(e-a),Math.abs(t-s))}function fe(e,t,a){const s=a.get(t.suspectId);if(!s)return null;switch(t.type){case"inRoom":return A(e,s.x,s.y)===t.roomId;case"notInRoom":return A(e,s.x,s.y)!==t.roomId;case"inSameRoom":{const i=a.get(t.otherSuspectId);if(!i)return null;const o=A(e,s.x,s.y),l=A(e,i.x,i.y);return o!==null&&o===l}case"inDifferentRoom":{const i=a.get(t.otherSuspectId);if(!i)return null;const o=A(e,s.x,s.y),l=A(e,i.x,i.y);return o===null||l===null?null:o!==l}case"inColumn":return s.x===t.col;case"inRow":return s.y===t.row;case"besideSuspect":{const i=a.get(t.otherSuspectId);return i?ke(s.x,s.y,i.x,i.y)<=1:null}case"notBesideSuspect":{const i=a.get(t.otherSuspectId);return i?ke(s.x,s.y,i.x,i.y)>1:null}case"besideObject":{for(let i=-1;i<=1;i++)for(let o=-1;o<=1;o++){if(o===0&&i===0)continue;const l=s.x+o,r=s.y+i;if(!(l<0||r<0||l>=e.width||r>=e.height)&&e.tiles[r][l]===t.objectTile)return!0}return!1}case"notBesideObject":{for(let i=-1;i<=1;i++)for(let o=-1;o<=1;o++){if(o===0&&i===0)continue;const l=s.x+o,r=s.y+i;if(!(l<0||r<0||l>=e.width||r>=e.height)&&e.tiles[r][l]===t.objectTile)return!1}return!0}case"onSeatTile":return J(e.tiles[s.y][s.x]);case"notOnSeatTile":return!J(e.tiles[s.y][s.x]);case"northOf":{const i=a.get(t.otherSuspectId);return i?s.y<i.y:null}case"southOf":{const i=a.get(t.otherSuspectId);return i?s.y>i.y:null}case"exactlyNRowsNorth":{const i=a.get(t.otherSuspectId);return i?i.y-s.y===t.n:null}case"exactlyNRowsSouth":{const i=a.get(t.otherSuspectId);return i?s.y-i.y===t.n:null}}}const ct={easy:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom"],medium:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile"],hard:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile","notOnSeatTile","northOf","southOf","exactlyNRowsNorth","exactlyNRowsSouth"]};function se(e,t,a){const s=be(e),i=ye(e);if(t.length===0)return{count:0};if(t.length>Math.min(s.length,i.length))return{count:0};const o=new Set;for(let n=0;n<e.height;n++)for(let g=0;g<e.width;g++)Y(e.tiles[n][g])&&o.add(`${g},${n}`);let l=0,r;const b=new Map,p=new Set,c=new Set;function f(n){if(l>=2)return;if(n===t.length){for(const m of a)if(fe(e,m,b)!==!0)return;l++,l===1&&(r=new Map(b));return}const g=t[n];for(const m of i)if(!p.has(m))for(const h of s){if(c.has(h)||!o.has(`${h},${m}`))continue;const y={suspectId:g,x:h,y:m};b.set(g,y),p.add(m),c.add(h);let u=!1;for(const d of a)if((d.suspectId===g||d.otherSuspectId===g)&&fe(e,d,b)===!1){u=!0;break}if(u||f(n+1),b.delete(g),p.delete(m),c.delete(h),l>=2)return}}return f(0),{count:l,firstSolution:r}}class dt extends Error{constructor(t){super(t),this.name="PuzzleGenerationError"}}function ht(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let a=Math.imul(t^t>>>15,1|t);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}function Xe(e,t){return Math.floor(e()*t)}function P(e,t){return t[Xe(e,t.length)]}function Q(e,t){const a=[...t];for(let s=a.length-1;s>0;s--){const i=Xe(e,s+1);[a[s],a[i]]=[a[i],a[s]]}return a}function mt(e,t,a,s){const i=ct[a],o=s.landmarks.length>=2,l=s.tiles.some(c=>c.some(f=>J(f))),r=i.filter(c=>!((c==="besideObject"||c==="notBesideObject")&&!o||(c==="onSeatTile"||c==="notOnSeatTile")&&!l)),b=Math.ceil(t*.4),p=[];for(let c=0;c<t;c++){const f=new Set;p.length>0&&f.add(p[p.length-1]);for(const y of r)p.filter(d=>d===y).length>=b&&f.add(y);const n=r.filter(y=>!f.has(y)),g=n.length>0?n:r,m=g.filter(y=>!p.includes(y)),h=m.length>0?m:g;p.push(P(e,h))}return p}function G(e,t,a,s,i,o,l){const r=l.get(i.id),b=a.clueTemplates;switch(s){case"inRoom":{const p=A(t,r.x,r.y);if(!p)return null;const c=t.rooms.find(f=>f.id===p);return{type:"inRoom",suspectId:i.id,roomId:p,text:b.inRoom(i.name,c.name)}}case"notInRoom":{const p=A(t,r.x,r.y),c=t.rooms.filter(n=>n.id!==p);if(c.length===0)return null;const f=P(e,c);return{type:"notInRoom",suspectId:i.id,roomId:f.id,text:b.notInRoom(i.name,f.name)}}case"inSameRoom":{const p=A(t,r.x,r.y);if(!p)return null;const c=o.filter(n=>{if(n.id===i.id)return!1;const g=l.get(n.id);return A(t,g.x,g.y)===p});if(c.length===0)return null;const f=P(e,c);return{type:"inSameRoom",suspectId:i.id,otherSuspectId:f.id,text:b.inSameRoom(i.name,f.name)}}case"inDifferentRoom":{const p=A(t,r.x,r.y),c=o.filter(n=>{if(n.id===i.id)return!1;const g=l.get(n.id),m=A(t,g.x,g.y);return m!==null&&m!==p});if(c.length===0)return null;const f=P(e,c);return{type:"inDifferentRoom",suspectId:i.id,otherSuspectId:f.id,text:b.inDifferentRoom(i.name,f.name)}}case"inColumn":return{type:"inColumn",suspectId:i.id,col:r.x,text:b.inColumn(i.name,r.x+1)};case"inRow":return{type:"inRow",suspectId:i.id,row:r.y,text:b.inRow(i.name,r.y+1)};case"besideSuspect":{const p=o.filter(f=>{if(f.id===i.id)return!1;const n=l.get(f.id);return Math.max(Math.abs(r.x-n.x),Math.abs(r.y-n.y))<=1});if(p.length===0)return null;const c=P(e,p);return{type:"besideSuspect",suspectId:i.id,otherSuspectId:c.id,text:b.besideSuspect(i.name,c.name)}}case"notBesideSuspect":{const p=o.filter(f=>{if(f.id===i.id)return!1;const n=l.get(f.id);return Math.max(Math.abs(r.x-n.x),Math.abs(r.y-n.y))>1});if(p.length===0)return null;const c=P(e,p);return{type:"notBesideSuspect",suspectId:i.id,otherSuspectId:c.id,text:b.notBesideSuspect(i.name,c.name)}}case"besideObject":{if(t.landmarks.length===0)return null;const p=t.landmarks.filter(n=>Math.max(Math.abs(r.x-n.x),Math.abs(r.y-n.y))<=1);if(p.length===0)return null;const c=P(e,p),f=t.tiles[c.y][c.x];return{type:"besideObject",suspectId:i.id,objectTile:f,text:b.besideObject(i.name,c.name)}}case"notBesideObject":{if(t.landmarks.length===0)return null;const p=t.landmarks.filter(n=>Math.max(Math.abs(r.x-n.x),Math.abs(r.y-n.y))>1);if(p.length===0)return null;const c=P(e,p),f=t.tiles[c.y][c.x];return{type:"notBesideObject",suspectId:i.id,objectTile:f,text:b.notBesideObject(i.name,c.name)}}case"onSeatTile":{const p=t.tiles[r.y][r.x];if(!J(p))return null;const c=p==="C"?"chair":p==="S"?"sofa":"bed";return{type:"onSeatTile",suspectId:i.id,text:b.onSeatTile(i.name,c)}}case"notOnSeatTile":{const p=t.tiles[r.y][r.x];return J(p)?null:{type:"notOnSeatTile",suspectId:i.id,text:b.notOnSeatTile(i.name)}}case"northOf":{const p=o.filter(f=>{if(f.id===i.id)return!1;const n=l.get(f.id);return r.y<n.y});if(p.length===0)return null;const c=P(e,p);return{type:"northOf",suspectId:i.id,otherSuspectId:c.id,text:b.northOf(i.name,c.name)}}case"southOf":{const p=o.filter(f=>{if(f.id===i.id)return!1;const n=l.get(f.id);return r.y>n.y});if(p.length===0)return null;const c=P(e,p);return{type:"southOf",suspectId:i.id,otherSuspectId:c.id,text:b.southOf(i.name,c.name)}}case"exactlyNRowsNorth":{const p=[];for(const f of o){if(f.id===i.id)continue;const g=l.get(f.id).y-r.y;g>0&&p.push({suspect:f,n:g})}if(p.length===0)return null;const c=P(e,p);return{type:"exactlyNRowsNorth",suspectId:i.id,otherSuspectId:c.suspect.id,n:c.n,text:b.exactlyNRowsNorth(i.name,c.suspect.name,c.n)}}case"exactlyNRowsSouth":{const p=[];for(const f of o){if(f.id===i.id)continue;const n=l.get(f.id),g=r.y-n.y;g>0&&p.push({suspect:f,n:g})}if(p.length===0)return null;const c=P(e,p);return{type:"exactlyNRowsSouth",suspectId:i.id,otherSuspectId:c.suspect.id,n:c.n,text:b.exactlyNRowsSouth(i.name,c.suspect.name,c.n)}}}}function ft(e,t,a,s=1e3){const i=Q(e,be(t)),o=Q(e,ye(t)),l=a.length;if(l<1||l>Math.min(i.length,o.length))return null;let r=0;const b=new Map,p=new Set,c=new Set,f=Q(e,o).slice(0,l);function n(g){if(g===l)return!0;const m=a[g],h=f[g],y=Q(e,i);for(const u of y)if(!c.has(u)&&Y(t.tiles[h]?.[u])){if(b.set(m.id,{suspectId:m.id,x:u,y:h}),p.add(h),c.add(u),n(g+1))return!0;if(r++,b.delete(m.id),p.delete(h),c.delete(u),r>=s)return!1}return!1}return n(0)?b:null}function ut(e,t,a){for(let i=0;i<20;i++){const o=e+i*97>>>0,l=ht(o),r=t.floorPlans[a],b=be(r),p=ye(r),c=Math.min(b.length,p.length)-1;if(c<2)continue;const n=t.suspectNames.slice(0,c).map((S,I)=>({id:`s${I}`,name:S})),g=P(l,t.victimNames),m=ft(l,r,n);if(!m)continue;const h=Array.from(m.values()),y=Je(r,h);if(!y)continue;const u=lt(r,h,y);if(!u)continue;const d=n.find(S=>S.id===u),v=P(l,t.narrativeTemplates.intro),w=P(l,t.narrativeTemplates.victimFound),x=P(l,t.narrativeTemplates.guiltyText).replace("{{killerName}}",d.name).replace("{{evidenceText}}","the evidence is conclusive"),T=mt(l,c,a,r),N=[];for(let S=0;S<c;S++){const I=n[S],E=T[S];let O=G(l,r,t,E,I,n,m);O||(O=G(l,r,t,"inRow",I,n,m)),O||(O=G(l,r,t,"inColumn",I,n,m)),O&&N.push(O)}let M=se(r,n.map(S=>S.id),N);if(M.count!==0){if(M.count!==1)for(const S of n){if(M.count===1)break;if(!N.some(E=>E.type==="inRow"&&E.suspectId===S.id)){const E=G(l,r,t,"inRow",S,n,m);E&&N.push(E),M=se(r,n.map(O=>O.id),N)}}if(M.count!==1)for(const S of n){if(M.count===1)break;if(!N.some(E=>E.type==="inColumn"&&E.suspectId===S.id)){const E=G(l,r,t,"inColumn",S,n,m);E&&N.push(E),M=se(r,n.map(O=>O.id),N)}}if(M.count===1)return{seed:o,themeId:t.id,difficulty:a,suspects:n,victimName:g,clues:N,solution:m,victimCell:y,killer:d,narrativeIntro:v,narrativeVictimFound:w,narrativeGuilty:x,floorPlan:r}}}throw new dt(`Failed to generate unique puzzle after 20 retries (seed=${e}, theme=${t.id}, difficulty=${a})`)}const pt={width:5,height:6,tiles:[["bB","bB","bB","W","W"],["F","F","F","C","F"],["pL","F","C","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"],["W","cR","W","F","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[3,1],[4,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"restroom",name:"Restroom",cells:[[1,5],[3,5],[4,5]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-entrance",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},bt={width:6,height:7,tiles:[["bB","bB","bB","bB","W","W"],["F","F","F","F","C","F"],["pL","F","C","F","F","F"],["F","S","F","pL","F","C"],["F","F","tB","F","F","F"],["C","F","F","F","W","F"],["W","cR","W","W","W","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5]]},{id:"restroom",name:"Restroom",cells:[[1,6],[5,5],[5,6]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-door",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:3,y:3},{id:"table",name:"the table",x:2,y:4},{id:"cash-register",name:"the cash register",x:1,y:6}]},yt={width:7,height:8,tiles:[["bB","bB","bB","bB","bB","W","W"],["F","F","F","F","F","C","F"],["F","C","F","pL","F","F","F"],["pL","F","S","F","C","F","pL"],["F","F","F","tB","F","F","F"],["F","C","F","F","F","tB","C"],["F","F","F","F","F","W","F"],["W","cR","W","F","C","W","F"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]]},{id:"main-area",name:"Main Area",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[6,6]]},{id:"restroom",name:"Restroom",cells:[[1,7]]},{id:"back-office",name:"Back Office",cells:[[3,7],[4,7],[6,7]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-1",name:"the plant",x:3,y:2},{id:"plant-2",name:"the plant",x:0,y:3},{id:"plant-3",name:"the plant",x:6,y:3},{id:"table",name:"the table",x:3,y:4},{id:"table-2",name:"the small table",x:5,y:5},{id:"cash-register",name:"the cash register",x:1,y:7}]},gt={width:5,height:5,tiles:[["sH","F","W","sH","sH"],["F","F","W","F","F"],["sH","F","tB","F","sH"],["F","F","F","F","F"],["F","cR","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[2,3]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,3],[4,3]]},{id:"checkout",name:"Checkout",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:3,y:0},{id:"shelf-3",name:"the shelf",x:4,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:4,y:2},{id:"table",name:"the table",x:2,y:2},{id:"cash-register",name:"the cash register",x:1,y:4}]},xt={width:6,height:6,tiles:[["sH","F","W","W","sH","sH"],["F","F","W","F","F","F"],["sH","F","F","F","F","sH"],["F","F","W","F","tB","F"],["F","F","F","F","F","F"],["F","cR","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,2],[3,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,1],[4,1],[5,1],[3,2],[4,2],[5,2],[4,3],[5,3]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,4],[4,4],[5,4]]},{id:"checkout",name:"Checkout",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:4,y:0},{id:"shelf-3",name:"the shelf",x:5,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:5,y:2},{id:"table",name:"the table",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},wt={width:7,height:7,tiles:[["sH","F","F","W","sH","sH","sH"],["F","F","sH","W","F","F","F"],["sH","F","F","tB","F","F","sH"],["F","F","W","W","F","tB","F"],["sH","F","F","F","F","F","F"],["F","F","F","F","F","F","sH"],["F","cR","C","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,1],[3,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"romance-novels",name:"Romance Novels",cells:[[4,3],[5,3],[6,3],[3,4],[4,4],[5,4],[6,4],[3,5],[4,5],[5,5]]},{id:"collectors",name:"Collector's Corner",cells:[[6,5]]},{id:"checkout",name:"Checkout",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"shelf-crime",name:"the shelf",x:0,y:0},{id:"shelf-nonfic-1",name:"the shelf",x:4,y:0},{id:"shelf-nonfic-2",name:"the shelf",x:5,y:0},{id:"shelf-nonfic-3",name:"the shelf",x:6,y:0},{id:"shelf-crime-2",name:"the shelf",x:0,y:2},{id:"shelf-nonfic-4",name:"the shelf",x:6,y:2},{id:"table-1",name:"the reading table",x:3,y:2},{id:"table-2",name:"the table",x:5,y:3},{id:"shelf-best",name:"the shelf",x:0,y:4},{id:"shelf-collect",name:"the shelf",x:6,y:5},{id:"cash-register",name:"the cash register",x:1,y:6}]},Ft={width:5,height:5,tiles:[["pL","F","W","jZ","jZ"],["F","F","W","jZ","C"],["pL","F","F","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[3,0],[4,0],[3,1],[4,1]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:0,y:2},{id:"plant-3",name:"the plant",x:4,y:3},{id:"jacuzzi",name:"the jacuzzi",x:3,y:0}]},vt={width:6,height:7,tiles:[["pL","F","F","W","jZ","jZ"],["F","F","F","W","jZ","C"],["F","pL","F","F","F","F"],["W","W","W","W","W","W"],["B","F","F","S","F","F"],["F","F","tV","F","F","F"],["F","F","W","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[4,0],[5,0],[4,1],[5,1]]},{id:"deck",name:"Deck",cells:[[3,2],[4,2],[5,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:1,y:2},{id:"jacuzzi",name:"the jacuzzi",x:4,y:0},{id:"tv",name:"the TV",x:2,y:5}]},$t={width:7,height:8,tiles:[["pL","F","F","F","W","jZ","jZ"],["F","F","pL","F","W","jZ","C"],["F","F","F","F","F","C","F"],["W","W","W","W","W","W","W"],["B","F","F","S","F","F","W"],["F","F","tV","F","F","pL","W"],["W","W","W","cT","F","F","W"],["W","W","F","F","F","W","W"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[5,0],[6,0],[5,1],[6,1]]},{id:"deck",name:"Deck",cells:[[4,2],[5,2],[6,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5]]},{id:"kitchen",name:"Kitchen",cells:[[3,6],[4,6],[5,6],[2,7],[3,7],[4,7]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:2,y:1},{id:"plant-3",name:"the plant",x:5,y:5},{id:"jacuzzi",name:"the jacuzzi",x:5,y:0},{id:"tv",name:"the TV",x:2,y:5},{id:"counter",name:"the counter",x:3,y:6}]},kt={width:5,height:6,tiles:[["sT","F","F","F","sT"],["F","F","W","F","F"],["F","F","F","F","F"],["tD","F","F","F","sH"],["F","C","F","F","F"],["F","F","W","cR","F"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1]]},{id:"santas-village",name:"Santa's Village",cells:[[2,0],[3,0],[3,1],[0,3],[1,3],[2,3],[0,4],[1,4],[2,4]]},{id:"toy-store",name:"Toy Store",cells:[[4,0],[4,1]]},{id:"walkway",name:"Walkway",cells:[[0,2],[1,2],[2,2],[3,2],[4,2]]},{id:"bookstore",name:"Bookstore",cells:[[3,3],[4,3],[3,4],[4,4]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[0,5],[1,5],[3,5],[4,5]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:4,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:3},{id:"shelf",name:"the shelf",x:4,y:3},{id:"cash-register",name:"the cash register",x:3,y:5}]},Ct={width:7,height:7,tiles:[["sT","F","F","W","F","F","sT"],["F","F","W","F","F","F","F"],["F","F","F","F","F","W","F"],["F","F","F","F","F","F","F"],["tD","F","F","W","F","sH","F"],["F","C","F","W","F","F","C"],["F","F","W","F","cR","F","F"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"santas-village",name:"Santa's Village",cells:[[3,1],[4,1],[5,1],[6,1],[3,2],[4,2],[5,2]]},{id:"santas-lodge",name:"Santa's Lodge",cells:[[4,0],[5,0],[6,0]]},{id:"toy-store",name:"Toy Store",cells:[[6,2],[5,3],[6,3],[4,4],[5,4],[6,4],[5,5],[6,5]]},{id:"walkway",name:"Walkway",cells:[[0,3],[1,3],[2,3],[3,3],[4,3]]},{id:"food-court",name:"Food Court",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[0,6],[1,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:6,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:4},{id:"shelf",name:"the shelf",x:5,y:4},{id:"cash-register",name:"the cash register",x:4,y:6}]},St={width:8,height:8,tiles:[["sT","F","F","W","F","F","F","sT"],["F","F","W","F","F","F","F","F"],["F","F","F","F","F","W","F","F"],["F","F","F","F","F","F","F","F"],["tD","F","F","W","F","sH","F","F"],["F","C","F","W","F","F","C","F"],["F","F","W","F","cR","F","F","F"],["F","F","F","F","F","F","F","tR"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[0,3],[1,3]]},{id:"santas-lodge",name:"Santa's Lodge",cells:[[4,0],[5,0],[6,0],[7,0],[4,1],[5,1],[6,1],[7,1]]},{id:"santas-village",name:"Santa's Village",cells:[[3,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]]},{id:"toy-store",name:"Toy Store",cells:[[6,2],[7,2],[6,3],[7,3],[6,4],[7,4],[6,5],[7,5]]},{id:"walkway",name:"Walkway",cells:[[2,2],[2,3],[2,4],[3,4],[4,4],[2,5],[2,6]]},{id:"food-court",name:"Food Court",cells:[[0,4],[1,4],[0,5],[1,5],[0,6],[1,6],[0,7],[1,7],[2,7]]},{id:"bookstore",name:"Bookstore",cells:[[5,4],[5,5],[4,6],[5,6],[6,6],[7,6]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[3,6],[3,7],[4,7],[5,7],[6,7],[7,7]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:7,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:4},{id:"shelf",name:"the shelf",x:5,y:4},{id:"cash-register",name:"the cash register",x:4,y:6},{id:"tree",name:"the Christmas tree",x:7,y:7}]},Tt={width:5,height:5,tiles:[["cT","cT","W","F","C"],["F","F","W","F","F"],["F","C","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"dining-room",name:"Dining Room",cells:[[3,0],[4,0],[3,1],[4,1],[2,2],[3,2],[4,2]]},{id:"bar",name:"Bar",cells:[[2,1]]},{id:"restroom",name:"Restroom",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0}]},Et={width:6,height:6,tiles:[["cT","cT","cT","W","F","C"],["F","F","F","W","F","F"],["F","C","F","F","F","F"],["F","F","F","F","C","F"],["W","W","W","W","W","W"],["F","F","F","C","F","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},{id:"dining-room",name:"Dining Room",cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]]},{id:"bar",name:"Bar",cells:[[3,1]]},{id:"private-room",name:"Private Room",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0},{id:"counter-3",name:"the counter",x:2,y:0}]},Rt={width:7,height:7,tiles:[["cT","cT","cT","cT","W","F","C"],["F","F","F","F","W","F","F"],["F","C","F","F","F","F","F"],["F","F","F","F","C","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","C","F","F","C","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"dining-room",name:"Dining Room",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3],[4,4],[5,4],[6,4]]},{id:"bar",name:"Bar",cells:[[4,1],[0,4],[1,4],[2,4],[3,4]]},{id:"restroom",name:"Restroom",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0},{id:"counter-3",name:"the counter",x:2,y:0},{id:"counter-4",name:"the counter",x:3,y:0}]},Wt={width:5,height:5,tiles:[["wT","F","W","tM","tM"],["F","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"cardio",name:"Cardio",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"weight-rack",name:"the weight rack",x:0,y:0},{id:"treadmill-1",name:"the treadmill",x:3,y:0},{id:"treadmill-2",name:"the treadmill",x:4,y:0}]},Nt={width:6,height:7,tiles:[["wT","F","W","tM","tM","F"],["F","F","W","F","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","jZ","jZ"],["F","C","F","F","jZ","C"],["F","F","W","F","F","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"cardio",name:"Cardio",cells:[[3,0],[4,0],[5,0],[3,1],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"pool",name:"Pool",cells:[[4,4],[5,4],[4,5],[5,5]]},{id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[0,5],[1,5],[2,5],[3,5]]},{id:"sauna",name:"Sauna",cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]}],landmarks:[{id:"weight-rack",name:"the weight rack",x:0,y:0},{id:"treadmill-1",name:"the treadmill",x:3,y:0},{id:"treadmill-2",name:"the treadmill",x:4,y:0},{id:"pool",name:"the pool",x:4,y:4}]},jt={width:7,height:8,tiles:[["wT","wT","F","W","tM","tM","F"],["F","F","F","W","F","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","jZ","jZ","jZ"],["F","C","F","F","jZ","C","jZ"],["F","F","W","F","F","F","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},{id:"cardio",name:"Cardio",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"studio",name:"Studio",cells:[[3,2],[3,3]]},{id:"pool",name:"Pool",cells:[[4,5],[5,5],[6,5],[4,6],[5,6],[6,6]]},{id:"locker-room",name:"Locker Room",cells:[[0,5],[1,5],[2,5],[3,5],[0,6],[1,6],[2,6],[3,6]]},{id:"sauna",name:"Sauna",cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"weight-rack-1",name:"the weight rack",x:0,y:0},{id:"weight-rack-2",name:"the weight rack",x:1,y:0},{id:"treadmill-1",name:"the treadmill",x:4,y:0},{id:"treadmill-2",name:"the treadmill",x:5,y:0},{id:"pool",name:"the pool",x:4,y:5}]},Mt={width:5,height:5,tiles:[["dK","F","W","F","C"],["F","F","W","F","F"],["F","C","F","F","F"],["W","W","W","W","W"],["F","F","pC","F","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"meeting-room",name:"Meeting Room",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"kitchen",name:"Kitchen",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"desk",name:"the desk",x:0,y:0},{id:"photocopier",name:"the photocopier",x:2,y:4}]},It={width:6,height:6,tiles:[["dK","F","F","W","F","C"],["F","F","F","W","F","F"],["F","C","F","F","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","pC","F","F","C","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},{id:"meeting-room",name:"Meeting Room",cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"reception",name:"Reception",cells:[[3,1]]},{id:"kitchen",name:"Kitchen",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"desk",name:"the desk",x:0,y:0},{id:"photocopier",name:"the photocopier",x:1,y:5}]},Pt={width:7,height:7,tiles:[["dK","F","F","F","W","F","C"],["F","F","F","F","W","F","F"],["F","C","F","F","F","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","dK","F"],["W","W","W","W","W","W","W"],["F","pC","F","F","C","F","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3],[0,4],[1,4],[2,4],[3,4]]},{id:"meeting-room",name:"Meeting Room",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"server-room",name:"Server Room",cells:[[4,4],[5,4],[6,4]]},{id:"kitchen",name:"Kitchen",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"desk-1",name:"the desk",x:0,y:0},{id:"desk-2",name:"the manager's desk",x:5,y:4},{id:"photocopier",name:"the photocopier",x:1,y:6}]},Bt={width:5,height:5,tiles:[["fB","F","F","F","fB"],["F","F","F","F","F"],["pL","F","C","F","pL"],["F","F","F","F","F"],["F","F","fB","F","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[0,2],[1,2],[2,2],[3,2],[4,2]]},{id:"gazebo",name:"Gazebo",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:4,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:4,y:2},{id:"flower-bed-3",name:"the flower bed",x:2,y:4}]},At={width:6,height:6,tiles:[["fB","F","F","F","F","fB"],["F","F","F","F","F","F"],["pL","F","C","F","C","pL"],["F","F","F","F","F","F"],["F","F","jZ","jZ","F","F"],["F","F","jZ","jZ","fB","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]]},{id:"gazebo",name:"Gazebo",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},{id:"pool-area",name:"Pool Area",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:5,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:5,y:2},{id:"pool",name:"the pool",x:2,y:4},{id:"flower-bed-3",name:"the flower bed",x:4,y:5}]},Ot={width:7,height:8,tiles:[["fB","F","F","F","F","F","fB"],["F","F","F","F","F","F","F"],["pL","F","C","F","C","F","pL"],["F","F","F","F","F","F","F"],["F","F","jZ","jZ","jZ","F","F"],["F","F","jZ","jZ","jZ","fB","F"],["fB","F","F","W","F","F","fB"],["F","F","F","W","F","F","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3]]},{id:"pool-area",name:"Pool Area",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5]]},{id:"greenhouse",name:"Greenhouse",cells:[[0,6],[1,6],[2,6],[0,7],[1,7],[2,7]]},{id:"garage",name:"Garage",cells:[[4,6],[5,6],[6,6],[4,7],[5,7],[6,7]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:6,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:6,y:2},{id:"pool",name:"the pool",x:2,y:4},{id:"flower-bed-3",name:"the flower bed",x:5,y:5},{id:"flower-bed-4",name:"the flower bed",x:0,y:6},{id:"flower-bed-5",name:"the flower bed",x:6,y:6}]},Lt={width:5,height:5,tiles:[["hB","F","W","F","C"],["hB","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","mC","F","C","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"waiting-room",name:"Waiting Room",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:1,y:4}]},zt={width:6,height:7,tiles:[["hB","F","F","W","F","C"],["hB","F","F","W","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","mC","F"],["F","C","F","F","F","F"],["F","F","W","F","C","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]]},{id:"operating-theatre",name:"Operating Theatre",cells:[[4,0],[5,0],[4,1],[5,1]]},{id:"waiting-room",name:"Waiting Room",cells:[[3,1]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]},{id:"cafeteria",name:"Cafeteria",cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:4,y:4}]},Ht={width:7,height:8,tiles:[["hB","F","F","F","W","F","C"],["hB","hB","F","F","W","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","mC","F","F"],["F","C","F","F","F","F","C"],["F","F","W","F","C","F","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"operating-theatre",name:"Operating Theatre",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"waiting-room",name:"Waiting Room",cells:[[4,1]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]},{id:"cafeteria",name:"Cafeteria",cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"hospital-bed-3",name:"the hospital bed",x:1,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:4,y:5}]},Vt={width:5,height:5,tiles:[["cH","F","W","sT","sT"],["cH","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"food-stands",name:"Food Stands",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"ticket-booth",name:"Ticket Booth",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"stall-1",name:"the stall",x:3,y:0},{id:"stall-2",name:"the stall",x:4,y:0}]},Dt={width:6,height:7,tiles:[["cH","F","F","W","sT","sT"],["cH","F","F","W","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","F","F"],["F","C","F","F","C","F"],["F","F","W","F","F","F"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,2]]},{id:"food-stands",name:"Food Stands",cells:[[4,0],[5,0],[4,1],[5,1],[4,2],[5,2]]},{id:"funhouse",name:"Funhouse",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},{id:"ticket-booth",name:"Ticket Booth",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"stall-1",name:"the stall",x:4,y:0},{id:"stall-2",name:"the stall",x:5,y:0}]},_t={width:7,height:8,tiles:[["cH","F","F","F","W","sT","sT"],["cH","cH","F","F","W","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","F","F","F"],["F","C","F","F","C","F","F"],["F","F","W","F","F","F","C"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"food-stands",name:"Food Stands",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"funhouse",name:"Funhouse",cells:[[0,5],[1,5],[2,5],[0,6],[1,6],[2,6],[0,7],[1,7]]},{id:"backstage",name:"Backstage",cells:[[3,5],[4,5],[5,5],[6,5],[3,6],[4,6],[5,6],[6,6],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"carousel-horse-3",name:"the carousel horse",x:1,y:1},{id:"stall-1",name:"the stall",x:5,y:0},{id:"stall-2",name:"the stall",x:6,y:0}]},k={"coffee-shop":{easy:pt,medium:bt,hard:yt},bookstore:{easy:gt,medium:xt,hard:wt},backyard:{easy:Ft,medium:vt,hard:$t},"holiday-mall":{easy:kt,medium:Ct,hard:St},restaurant:{easy:Tt,medium:Et,hard:Rt},gym:{easy:Wt,medium:Nt,hard:jt},office:{easy:Mt,medium:It,hard:Pt},"garden-party":{easy:Bt,medium:At,hard:Ot},hospital:{easy:Lt,medium:zt,hard:Ht},carnival:{easy:Vt,medium:Dt,hard:_t}};function Ce(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Yt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the café.`,inColumn:(e,t)=>`${e} was in the ${Ce(t)} column.`,inRow:(e,t)=>`${e} was in the ${Ce(t)} row.`,besideSuspect:(e,t)=>`${e} was standing next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>t==="chair"?`${e} was sitting in a chair.`:t==="sofa"?`${e} was on the sofa.`:`${e} was on the ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Kt={id:"coffee-shop",name:"The Coffee Shop",floorPlans:{easy:k["coffee-shop"].easy,medium:k["coffee-shop"].medium,hard:k["coffee-shop"].hard},suspectNames:["Alice","Ben","Chloe","Diego","Elena","Finlay","Grace","Hassan","Iris","Jake","Kai","Lena"],victimNames:["Victor","Violet","Vera","Valencia","Vance","Vivian"],clueTemplates:Yt,narrativeTemplates:{intro:["A body has been found at the Copper Bean Café. The morning rush never arrived — instead, the regulars found yellow tape across the door. You pour yourself an espresso and get to work.","The Copper Bean Café is closed for a very different reason today. Someone is dead, and the witnesses are all still clutching their lattes. You take out your notebook.","It was supposed to be a quiet Tuesday at the Copper Bean. Then the screaming started. Now it's your problem. You order a black coffee and begin."],victimFound:["The victim was discovered near table four, cold cup of coffee still in hand.","Staff found the victim behind the counter during the morning prep.","A regular spotted the victim slumped in the corner booth before opening."],guiltyText:["{{killerName}} — served with a side of motive.","{{killerName}} — the evidence is as clear as an Americano.","{{killerName}} — there's no running from the detective on this one."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:plant":"","object:cash-register":"","object:table":""}};function Se(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Gt={inRoom:(e,t)=>`${e} was browsing in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same section as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different sections.`,inColumn:(e,t)=>`${e} was in the ${Se(t)} column.`,inRow:(e,t)=>`${e} was in the ${Se(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was standing near ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="chair"?`${e} was sitting in a reading chair.`:`${e} was sitting on the ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Ut={id:"bookstore",name:"The Bookstore",floorPlans:{easy:k.bookstore.easy,medium:k.bookstore.medium,hard:k.bookstore.hard},suspectNames:["Alex","Bridget","Colin","Diana","Edmund","Fiona","George","Hannah","Ivan","Julia","Kevin","Lydia"],victimNames:["Vincent","Valerie","Violet","Victor","Vera","Valencia"],clueTemplates:Gt,narrativeTemplates:{intro:["The First Chapter Bookshop opened this morning to find more than just dust between the shelves. Someone is dead, and the regulars are still clutching their Earl Grey. You step over the crime scene tape and start asking questions.","A reader never returns a book. This one never returned at all. The First Chapter Bookshop is closed indefinitely — and you're the reason it might reopen. Notebook out.","Mondays at the bookshop are quiet. This Monday is the quietest it's ever been. The body was found in the stacks before the first customer arrived. You're on the case."],victimFound:["The victim was discovered slumped against the shelf in the early morning.","A shop assistant found the victim face-down near the reading table.","The victim was found between the shelves before opening time."],guiltyText:["{{killerName}} — the ending nobody saw coming.","{{killerName}} — the plot twist is on the last page.","{{killerName}} — even mysteries have their answers."]},colorPalette:{floor:"#f0ead6",wall:"#3d2b1f",seat:"#7a5c3a",accent:"#8b1a1a",background:"#1a1510",text:"#ffffff"},spriteMap:{"object:shelf":"","object:table":"","object:cash-register":""}};function Te(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const qt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the yard.`,inColumn:(e,t)=>`${e} was in the ${Te(t)} column.`,inRow:(e,t)=>`${e} was in the ${Te(t)} row.`,besideSuspect:(e,t)=>`${e} was right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="sofa"?`${e} was on the outdoor sofa.`:t==="bed"?`${e} was in the bedroom.`:`${e} was sitting in a chair.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Zt={id:"backyard",name:"The Backyard",floorPlans:{easy:k.backyard.easy,medium:k.backyard.medium,hard:k.backyard.hard},suspectNames:["Aaron","Becca","Chad","Donna","Eric","Fran","Greg","Helen","Ian","Jess","Kurt","Lisa"],victimNames:["Victor","Vanessa","Vince","Vera","Valentina","Virgil"],clueTemplates:qt,narrativeTemplates:{intro:["The Hendersons were supposed to be hosting a barbecue. Instead, they're hosting a detective. Someone is dead in the backyard and the potato salad is getting warm. You flash your badge.","Summer parties end in hangovers, not homicides. Usually. The backyard of 14 Maple Drive is now a crime scene and you're the one who has to ruin everyone's weekend.","It was a perfect Sunday afternoon until it wasn't. The body was found near the jacuzzi before anyone noticed their drink had gone untouched. You arrive with your notepad."],victimFound:["The victim was found floating face-down near the jacuzzi.","A guest discovered the victim collapsed on the deck.","The victim was found on the grass between the patio chairs."],guiltyText:["{{killerName}} — summer is ruined.","{{killerName}} — the neighborhood will never be the same.","{{killerName}} — nobody escapes the backyard detective."]},colorPalette:{floor:"#d4e8c2",wall:"#5d4037",seat:"#8d6e63",accent:"#e64a19",background:"#1a200f",text:"#ffffff"},spriteMap:{"object:plant":"","object:jacuzzi-tile":"","object:tv":"","object:sofa":""}};function Ee(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Jt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was shopping in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the mall.`,inColumn:(e,t)=>`${e} was in the ${Ee(t)} column.`,inRow:(e,t)=>`${e} was in the ${Ee(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting${t==="chair"?"":" on a "+t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Xt={id:"holiday-mall",name:"The Holiday Mall",floorPlans:{easy:k["holiday-mall"].easy,medium:k["holiday-mall"].medium,hard:k["holiday-mall"].hard},suspectNames:["Ashley","Brett","Cameron","Denise","Eli","Felicia","Grant","Holly","Irving","Jade","Kyle","Leighton"],victimNames:["Victor","Vivian","Vera","Valencia","Vince","Velma"],clueTemplates:Jt,narrativeTemplates:{intro:["The North Pole Mall was supposed to close early for the holiday rush. Instead, it's closed indefinitely. The security cameras caught everything except whoever did this. You wade through the tinsel.","Christmas shopping season. The most wonderful time of year — unless you're the one who ends up under the tree with a chalk outline. You badge your way in through the entrance.","The last thing anyone expects on December 23rd is a murder at the mall. The second-to-last thing is the detective they send. Here you are anyway."],victimFound:["The victim was discovered near the gift-wrapping station before the mall opened.","Security found the victim in the walkway between the stalls.","A store manager found the victim near the Christmas tree display."],guiltyText:["{{killerName}} — some gifts aren't worth giving.","{{killerName}} — unwrapped at last.","{{killerName}} — the season's greetings end here."]},colorPalette:{floor:"#e8e0d0",wall:"#2c3e50",seat:"#7f8c8d",accent:"#c0392b",background:"#0d1117",text:"#ffffff"},spriteMap:{"object:stall":"","object:shelf":"","object:cash-register":"","object:tree":"","object:teddy-bear":""}};function Re(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Qt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was dining in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the restaurant.`,inColumn:(e,t)=>`${e} was in the ${Re(t)} column.`,inRow:(e,t)=>`${e} was in the ${Re(t)} row.`,besideSuspect:(e,t)=>`${e} was seated right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="sofa"?`${e} was on the banquette seating.`:`${e} was sitting at a table.`,notOnSeatTile:e=>`${e} was not seated.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},ea={id:"restaurant",name:"The Restaurant",floorPlans:{easy:k.restaurant.easy,medium:k.restaurant.medium,hard:k.restaurant.hard},suspectNames:["Andre","Bianca","Carlo","Delphine","Emilio","Francoise","Gerard","Helena","Ignacio","Josephine","Kristoffer","Loretta"],victimNames:["Victor","Violette","Vincenzo","Vera","Valeria","Vidal"],clueTemplates:Qt,narrativeTemplates:{intro:["La Maison Rouge was fully booked for a private function. It's now fully booked by the police. Someone didn't make it to dessert — and you're the unwanted amuse-bouche.","The head chef found the body before the morning prep. The restaurant is closed, the reservations are cancelled, and the chef is refusing to speak without a lawyer. You order espresso.","Five-star dining. One-star outcome. The Michelin inspector will not be pleased. Neither will whoever left the body in the private dining room."],victimFound:["The victim was found slumped in the private dining room.","Kitchen staff discovered the victim near the counter.","The sommelier found the victim in the dining room early in the morning."],guiltyText:["{{killerName}} — an amuse-bouche of justice.","{{killerName}} — the bill has arrived.","{{killerName}} — this dish is best served cold."]},colorPalette:{floor:"#f5e8d0",wall:"#3b1f1f",seat:"#8b1a1a",accent:"#c0392b",background:"#180a0a",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:counter":"","object:table":"","object:plant":""}};function We(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ta={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were training in different zones.`,inColumn:(e,t)=>`${e} was in the ${We(t)} column.`,inRow:(e,t)=>`${e} was in the ${We(t)} row.`,besideSuspect:(e,t)=>`${e} was working out right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting on a bench.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},aa={id:"gym",name:"The Gym",floorPlans:{easy:k.gym.easy,medium:k.gym.medium,hard:k.gym.hard},suspectNames:["Atlas","Blair","Corey","Dakota","Evander","Fitz","Gabe","Hunter","Indira","Jordan","Knox","Leila"],victimNames:["Vance","Valentina","Viktor","Vera","Vito","Vesper"],clueTemplates:ta,narrativeTemplates:{intro:["FitLife Gym opens at 5am. This morning it opened to a body near the weight rack. The morning regulars are sweating for a different reason now.","Somebody skipped leg day — and left somebody else skipping all days. The body was found in the Weights area. You badge through the turnstile.","The gym is 24 hours. The victim wasn't. You arrive with your notepad and a distinct lack of enthusiasm for the treadmill."],victimFound:["The victim was found near the weight rack before the early shift.","A trainer discovered the victim collapsed in the cardio area.","The victim was found in the pool area during the morning check."],guiltyText:["{{killerName}} — no amount of cardio outpaces the truth.","{{killerName}} — their reps are done.","{{killerName}} — spotting the killer was the easy part."]},colorPalette:{floor:"#e8e0d8",wall:"#2c3e50",seat:"#7f8c8d",accent:"#e74c3c",background:"#0d1117",text:"#ffffff"},spriteMap:{"object:weight-rack":"","object:treadmill":"","object:counter":"","object:jacuzzi-tile":""}};function Ne(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ia={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was working in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the office.`,inColumn:(e,t)=>`${e} was in the ${Ne(t)} column.`,inRow:(e,t)=>`${e} was in the ${Ne(t)} row.`,besideSuspect:(e,t)=>`${e} was working right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting at their desk.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},na={id:"office",name:"The Office",floorPlans:{easy:k.office.easy,medium:k.office.medium,hard:k.office.hard},suspectNames:["Adrian","Brooke","Clive","Daria","Edwin","Fiona","Graham","Harriet","Isaac","Judith","Kieran","Laura"],victimNames:["Vincent","Veronica","Vance","Vivienne","Victor","Velvet"],clueTemplates:ia,narrativeTemplates:{intro:["Meridian Corp. Floor 12. The quarterly review meeting has been cancelled for the most permanent possible reason. You badge in and start asking questions before the lawyers arrive.","The victim was found at their desk. The access log shows they never left last night. Whoever did this knew the building. You start with the people who knew it best.","It was supposed to be a normal Monday. Then the HR department filed the wrong kind of incident report. You turn off your phone's out-of-office message and get to work."],victimFound:["The victim was found at their desk during the morning security check.","The building manager found the victim in the Meeting Room after the overnight shift.","A colleague discovered the victim in the Server Room at 7am."],guiltyText:["{{killerName}} — the performance review was terminal.","{{killerName}} — this one won't go in the quarterly report.","{{killerName}} — consider this case closed."]},colorPalette:{floor:"#e8e8f0",wall:"#34495e",seat:"#7f8c8d",accent:"#2980b9",background:"#0a0a14",text:"#ffffff"},spriteMap:{"object:desk":"","object:photocopier":"","object:tv":"","object:plant":""}};function je(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const oa={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the garden.`,inColumn:(e,t)=>`${e} was in the ${je(t)} column.`,inRow:(e,t)=>`${e} was in the ${je(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting on a garden chair.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},sa={id:"garden-party",name:"The Garden Party",floorPlans:{easy:k["garden-party"].easy,medium:k["garden-party"].medium,hard:k["garden-party"].hard},suspectNames:["Arabella","Benedict","Cecily","Damien","Eleanor","Freddie","Georgina","Hugo","Imogen","Jasper","Kit","Lavinia"],victimNames:["Violet","Valentine","Verity","Viscount","Viola","Vaughn"],clueTemplates:oa,narrativeTemplates:{intro:["The Westerleigh garden party was the social event of summer. It is no longer a social event. The body was found beneath the roses and you've been asked — very politely — to investigate.","Champagne, strawberries, murder. The annual garden party at Fernwood House has taken a distinctly unfestive turn. You decline the cucumber sandwiches and start asking questions.","The gazebo was booked for afternoon tea. It is now a crime scene. You roll up your sleeves and walk across the manicured lawn."],victimFound:["The victim was found in the Greenhouse before the afternoon guests arrived.","A gardener discovered the victim on the Lawn near the flower beds.","The caterers found the victim in the Gazebo."],guiltyText:["{{killerName}} — the summer is wilted.","{{killerName}} — cut down in their prime.","{{killerName}} — this garden party is over."]},colorPalette:{floor:"#d4f0c0",wall:"#5d4037",seat:"#7cb342",accent:"#e91e63",background:"#0a1f0a",text:"#ffffff"},spriteMap:{"object:flower-bed":"","object:plant":""}};function Me(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ra={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same ward as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the hospital.`,inColumn:(e,t)=>`${e} was in the ${Me(t)} column.`,inRow:(e,t)=>`${e} was in the ${Me(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="bed"?`${e} was in a hospital bed.`:t==="sofa"?`${e} was in the waiting area.`:`${e} was sitting down.`,notOnSeatTile:e=>`${e} was not sitting or lying down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},la={id:"hospital",name:"The Hospital",floorPlans:{easy:k.hospital.easy,medium:k.hospital.medium,hard:k.hospital.hard},suspectNames:["Aleksei","Beatrix","Conrad","Dorothea","Emil","Francesca","Gunnar","Hilde","Igor","Jana","Klaus","Liselotte"],victimNames:["Viktor","Valentina","Vera","Valentin","Vesna","Volkmar"],clueTemplates:ra,narrativeTemplates:{intro:["St Crispin's Hospital is where people come to recover. This one didn't make it. The night shift just ended and nobody has an alibi. You flash your badge at the nurses' station.","A hospital is the last place you expect a murder — or the first. The body was found during morning rounds. You put on gloves and start taking statements.","The patient was admitted last night. By morning, they were a victim. Someone in this building knows what happened and you're going to find out who."],victimFound:["The victim was found in the Ward during the overnight nursing check.","The on-call doctor discovered the victim in the Operating Theatre.","The victim was found in the Pharmacy storage area."],guiltyText:["{{killerName}} — the prognosis was never good.","{{killerName}} — no treatment for this outcome.","{{killerName}} — discharged permanently."]},colorPalette:{floor:"#f0f4f8",wall:"#2c3e50",seat:"#7f8c8d",accent:"#e74c3c",background:"#0a0d12",text:"#ffffff"},spriteMap:{"object:hospital-bed":"","object:medicine-cabinet":""}};function Ie(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ca={inRoom:(e,t)=>`${e} was at the ${t}.`,notInRoom:(e,t)=>`${e} was not at the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the carnival.`,inColumn:(e,t)=>`${e} was in the ${Ie(t)} column.`,inRow:(e,t)=>`${e} was in the ${Ie(t)} row.`,besideSuspect:(e,t)=>`${e} was right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was seated at one of the stalls.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},da={id:"carnival",name:"The Carnival",floorPlans:{easy:k.carnival.easy,medium:k.carnival.medium,hard:k.carnival.hard},suspectNames:["Alistair","Brigitte","Cosmo","Dafne","Ezra","Flavia","Gideon","Harriet","Ignatius","Juno","Kit","Ludo"],victimNames:["Victor","Valentina","Vex","Vane","Vesper","Volta"],clueTemplates:ca,narrativeTemplates:{intro:["The Twilight Carnival has been travelling for thirty years without incident. Last night ended that streak. The body was found between the Carousel and the Funhouse. You came for the cotton candy.","Someone killed the Ringmaster. Or maybe the Ringmaster killed someone. Either way, the show is not going on tonight. You arrive as the last customers are being turned away.","Carnivals attract all sorts. This one attracted a detective. The body was found before morning setup. You pull on your coat and walk between the tents."],victimFound:["The victim was found near the Carousel before the carnival opened.","The ride operator discovered the victim in the Funhouse corridor.","The victim was found behind the Food Stands at dawn."],guiltyText:["{{killerName}} — the last act.","{{killerName}} — the fun is over.","{{killerName}} — tickets have been cancelled."]},colorPalette:{floor:"#f5deb3",wall:"#4a235a",seat:"#884ea0",accent:"#e74c3c",background:"#0d0a14",text:"#ffffff"},spriteMap:{"object:carousel-horse":"","object:stall":""}},ha={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same room as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different rooms.`,inColumn:(e,t)=>`${e} was in column ${t}.`,inRow:(e,t)=>`${e} was in row ${t}.`,besideSuspect:(e,t)=>`${e} was beside ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>`${e} was on a ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},ma={id:"stub",name:"Test Room",floorPlans:{easy:k["coffee-shop"].easy,medium:k["coffee-shop"].medium,hard:k["coffee-shop"].hard},suspectNames:["Alice","Bob","Carol","Dave","Eve","Frank","Grace","Henry","Iris","Jack","Kate","Leo"],victimNames:["Vera","Victor","Violet","Valencia","Vance","Vivian"],clueTemplates:ha,narrativeTemplates:{intro:["A crime has occurred in the Test Room.","Witnesses report suspicious activity.","The detective arrives on the scene."],victimFound:["The victim was found at the scene.","A body has been discovered.","The victim was discovered here."],guiltyText:["{{killerName}} — caught red-handed.","{{killerName}} — the evidence is clear.","{{killerName}} — guilty as charged."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{}},ge=new Map;function z(e){ge.set(e.id,e)}function Qe(e){const t=ge.get(e);if(!t)throw new Error(`Unknown theme: ${e}`);return t}function fa(){return Array.from(ge.values())}z(Kt);z(Ut);z(Zt);z(Xt);z(ea);z(aa);z(na);z(sa);z(la);z(da);z(ma);const W=(e,t="#1a120a")=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="${t}"/>${e}</svg>`,Pe={chair:W(`
    <rect x="8" y="18" width="16" height="10" rx="1" fill="#8b6914"/>
    <rect x="8" y="8"  width="4"  height="12" rx="1" fill="#7a5c10"/>
    <rect x="20" y="8" width="4"  height="12" rx="1" fill="#7a5c10"/>
    <rect x="8" y="6"  width="16" height="5"  rx="1" fill="#a07820"/>
    <rect x="10" y="19" width="3" height="8"  rx="1" fill="#7a5c10"/>
    <rect x="19" y="19" width="3" height="8"  rx="1" fill="#7a5c10"/>
  `,"#f5e6d3"),sofa:W(`
    <rect x="4"  y="16" width="24" height="11" rx="2" fill="#8b6914"/>
    <rect x="4"  y="10" width="5"  height="18" rx="2" fill="#7a5c10"/>
    <rect x="23" y="10" width="5"  height="18" rx="2" fill="#7a5c10"/>
    <rect x="4"  y="8"  width="24" height="6"  rx="2" fill="#a07820"/>
    <line x1="15" y1="16" x2="15" y2="27" stroke="#7a5c10" stroke-width="1.5"/>
  `,"#f5e6d3"),bed:W(`
    <rect x="4"  y="6"  width="24" height="20" rx="2" fill="#ddd0b8"/>
    <rect x="4"  y="6"  width="24" height="7"  rx="2" fill="#c0a878"/>
    <rect x="6"  y="7"  width="20" height="5"  rx="1" fill="#e8d8b0"/>
    <rect x="4"  y="6"  width="5"  height="20" rx="1" fill="#8b6914"/>
    <rect x="23" y="6"  width="5"  height="20" rx="1" fill="#8b6914"/>
    <rect x="4"  y="22" width="24" height="4"  rx="1" fill="#8b6914"/>
  `,"#f5e6d3"),"object:plant":W(`
    <rect x="11" y="22" width="10" height="7" rx="1" fill="#8b6332"/>
    <rect x="13" y="20" width="6"  height="3" fill="#7a5528"/>
    <ellipse cx="16" cy="13" rx="8" ry="9" fill="#2d7a2d"/>
    <ellipse cx="10" cy="17" rx="5" ry="6" fill="#3a9a3a"/>
    <ellipse cx="22" cy="17" rx="5" ry="6" fill="#3a9a3a"/>
    <ellipse cx="16" cy="8"  rx="4" ry="5" fill="#4cb84c"/>
    <ellipse cx="16" cy="13" rx="3" ry="3" fill="#5cd65c"/>
  `),"object:bar-counter":W(`
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
  `),"object:cash-register":W(`
    <rect x="4"  y="10" width="24" height="18" rx="2" fill="#2a2a2a"/>
    <rect x="6"  y="12" width="20" height="10" rx="1" fill="#1a6a1a"/>
    <rect x="7"  y="13" width="18" height="8"  rx="0" fill="#0d4d0d"/>
    <rect x="8"  y="14" width="16" height="5"  rx="0" fill="#00cc00" opacity="0.8"/>
    <rect x="4"  y="24" width="24" height="4"  rx="1" fill="#1a1a1a"/>
    <rect x="10" y="7"  width="12" height="5"  rx="1" fill="#333"/>
    <rect x="12" y="5"  width="8"  height="3"  rx="1" fill="#444"/>
    <rect x="7"  y="26" width="18" height="2"  rx="0" fill="#555" opacity="0.5"/>
  `),"object:table":W(`
    <rect x="4"  y="12" width="24" height="10" rx="1" fill="#9a6030"/>
    <rect x="3"  y="10" width="26" height="3"  rx="1" fill="#b07840"/>
    <rect x="5"  y="22" width="4"  height="8"  rx="1" fill="#7a4820"/>
    <rect x="23" y="22" width="4"  height="8"  rx="1" fill="#7a4820"/>
  `),"object:shelf":W(`
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
  `),"object:counter":W(`
    <rect x="2"  y="8"  width="28" height="18" rx="2" fill="#888888"/>
    <rect x="2"  y="6"  width="28" height="4"  rx="1" fill="#aaaaaa"/>
    <rect x="4"  y="10" width="8"  height="6"  rx="1" fill="#666"/>
    <rect x="14" y="10" width="8"  height="6"  rx="1" fill="#666"/>
    <rect x="4"  y="18" width="24" height="6"  rx="1" fill="#777"/>
    <rect x="14" y="4"  width="4"  height="4"  rx="1" fill="#999"/>
  `),"object:desk":W(`
    <rect x="2"  y="10" width="28" height="16" rx="2" fill="#7a5028"/>
    <rect x="2"  y="8"  width="28" height="4"  rx="1" fill="#9a6838"/>
    <rect x="4"  y="12" width="10" height="8"  rx="1" fill="#1a1a2a"/>
    <rect x="5"  y="13" width="8"  height="6"  rx="0" fill="#2233aa" opacity="0.8"/>
    <rect x="14" y="12" width="5"  height="6"  rx="1" fill="#555"/>
    <rect x="14" y="13" width="4"  height="4"  fill="#888" opacity="0.5"/>
    <rect x="20" y="12" width="8"  height="4"  rx="0" fill="#888" opacity="0.3"/>
    <rect x="2"  y="24" width="5"  height="8"  rx="1" fill="#6a4018"/>
    <rect x="25" y="24" width="5"  height="8"  rx="1" fill="#6a4018"/>
  `),"object:photocopier":W(`
    <rect x="4"  y="8"  width="24" height="20" rx="2" fill="#555"/>
    <rect x="4"  y="6"  width="24" height="6"  rx="2" fill="#777"/>
    <rect x="6"  y="7"  width="20" height="4"  rx="1" fill="#aaa" opacity="0.4"/>
    <rect x="6"  y="10" width="20" height="14" rx="1" fill="#444"/>
    <rect x="8"  y="12" width="16" height="10" rx="0" fill="#1a1a1a"/>
    <rect x="8"  y="12" width="16" height="1"  fill="#fff" opacity="0.5"/>
    <rect x="18" y="7"  width="4"  height="3"  rx="1" fill="#00aa00"/>
    <rect x="23" y="7"  width="3"  height="3"  rx="1" fill="#aa0000"/>
  `),"object:tv":W(`
    <rect x="4"  y="4"  width="24" height="18" rx="2" fill="#1a1a1a"/>
    <rect x="6"  y="6"  width="20" height="14" rx="1" fill="#0a2a4a"/>
    <rect x="6"  y="6"  width="20" height="14" rx="1" fill="#1a5a8a" opacity="0.6"/>
    <rect x="6"  y="6"  width="10" height="7"  rx="0" fill="#fff" opacity="0.08"/>
    <rect x="14" y="22" width="4"  height="6"  rx="0" fill="#333"/>
    <rect x="10" y="27" width="12" height="3"  rx="1" fill="#222"/>
    <circle cx="26" cy="7" r="1.5" fill="#00cc00"/>
  `),"object:flower-bed":W(`
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
  `),"object:hospital-bed":W(`
    <rect x="2"  y="8"  width="28" height="20" rx="2" fill="#e8e8e8"/>
    <rect x="2"  y="8"  width="28" height="6"  rx="2" fill="#cccccc"/>
    <rect x="4"  y="9"  width="24" height="4"  rx="1" fill="#ffffff"/>
    <rect x="2"  y="8"  width="5"  height="20" rx="1" fill="#aaaaaa"/>
    <rect x="25" y="8"  width="5"  height="20" rx="1" fill="#aaaaaa"/>
    <rect x="2"  y="24" width="28" height="4"  rx="1" fill="#aaaaaa"/>
    <rect x="4"  y="26" width="3"  height="6"  rx="1" fill="#888"/>
    <rect x="25" y="26" width="3"  height="6"  rx="1" fill="#888"/>
    <rect x="14" y="7"  width="4"  height="3"  rx="0" fill="#4444aa"/>
  `),"object:medicine-cabinet":W(`
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
  `),"object:weight-rack":W(`
    <rect x="12" y="4"  width="8"  height="24" rx="1" fill="#444"/>
    <rect x="2"  y="8"  width="28" height="4"  rx="1" fill="#555"/>
    <rect x="2"  y="20" width="28" height="4"  rx="1" fill="#555"/>
    <rect x="2"  y="8"  width="5"  height="16" rx="1" fill="#666" opacity="0.8"/>
    <rect x="6"  y="9"  width="3"  height="14" rx="0" fill="#888"/>
    <rect x="11" y="9"  width="3"  height="14" rx="0" fill="#888"/>
    <rect x="25" y="8"  width="5"  height="16" rx="1" fill="#666" opacity="0.8"/>
    <rect x="23" y="9"  width="3"  height="14" rx="0" fill="#888"/>
    <rect x="18" y="9"  width="3"  height="14" rx="0" fill="#888"/>
  `),"object:treadmill":W(`
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
  `),"object:stall":W(`
    <rect x="2"  y="4"  width="28" height="24" rx="1" fill="#9a6028"/>
    <rect x="2"  y="4"  width="28" height="5"  rx="1" fill="#c08040"/>
    <rect x="3"  y="4"  width="26" height="28" rx="0" stroke="#7a4818" stroke-width="2" fill="none"/>
    <rect x="8"  y="10" width="16" height="12" rx="1" fill="#7a4818"/>
    <rect x="9"  y="11" width="14" height="10" rx="0" fill="#1a1a1a" opacity="0.7"/>
    <rect x="9"  y="11" width="6"  height="10" rx="0" fill="#2a2a2a"/>
    <rect x="10" y="12" width="4"  height="8"  rx="0" fill="#c08040" opacity="0.4"/>
    <rect x="14" y="14" width="3"  height="2"  rx="0" fill="#888"/>
    <rect x="6"  y="22" width="20" height="2"  fill="#7a4818"/>
  `),"object:carousel-horse":W(`
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
  `),"object:jacuzzi-tile":W(`
    <rect x="2"  y="2"  width="28" height="28" rx="3" fill="#1a6a9a"/>
    <rect x="4"  y="4"  width="24" height="24" rx="2" fill="#2288cc"/>
    <ellipse cx="16" cy="16" rx="10" ry="8" fill="#44aaee" opacity="0.5"/>
    <path d="M6 16 Q10 12 14 16 Q18 20 22 16 Q26 12 28 16" stroke="#88ccff" stroke-width="1.5" fill="none" opacity="0.7"/>
    <path d="M6 20 Q10 16 14 20 Q18 24 22 20 Q26 16 28 20" stroke="#88ccff" stroke-width="1.5" fill="none" opacity="0.5"/>
    <circle cx="10" cy="12" r="1.5" fill="#ffffff" opacity="0.6"/>
    <circle cx="20" cy="10" r="1.5" fill="#ffffff" opacity="0.6"/>
    <circle cx="25" cy="18" r="1"   fill="#ffffff" opacity="0.6"/>
  `),"object:teddy-bear":W(`
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
  `),"object:tree":W(`
    <rect x="13" y="22" width="6"  height="8"  rx="1" fill="#7a4818"/>
    <polygon points="16,2 4,16 28,16" fill="#1a7a1a"/>
    <polygon points="16,6 5,18 27,18" fill="#2a9a2a"/>
    <polygon points="16,10 7,22 25,22" fill="#3ab83a"/>
    <circle cx="16" cy="2" r="2" fill="#4cd84c"/>
  `)};let C=64;function ua(e,t){const a=(window.innerHeight-80)/t,s=window.innerWidth*.62/e;return C=Math.max(56,Math.min(96,Math.floor(Math.min(a,s)))),C}const re=new Map,le=new Set;function Be(e,t){if(!e)return null;if(re.has(e))return re.get(e);if(le.has(e))return null;le.add(e);const a=new Image,s=new Blob([e],{type:"image/svg+xml"}),i=URL.createObjectURL(s);return a.onload=()=>{re.set(e,a),le.delete(e),URL.revokeObjectURL(i),t?.()},a.src=i,null}const U="'Press Start 2P', monospace",Ae=["rgba(192, 120,  40, 0.18)","rgba( 40, 100, 180, 0.16)","rgba( 40, 150,  80, 0.16)","rgba(160,  40, 100, 0.16)","rgba(140, 120,  40, 0.16)","rgba( 80,  40, 160, 0.16)"],ee=["rgba(220, 140,  40, 0.75)","rgba( 60, 120, 220, 0.75)","rgba( 40, 170,  80, 0.75)","rgba(200,  40, 120, 0.75)","rgba(180, 160,  20, 0.75)","rgba(100,  40, 200, 0.75)"],pa={pL:"object:plant",tB:"object:table",sH:"object:shelf",cR:"object:cash-register",bB:"object:bar-counter",tV:"object:tv",cT:"object:counter",dK:"object:desk",pC:"object:photocopier",fB:"object:flower-bed",hB:"object:hospital-bed",mC:"object:medicine-cabinet",tR:"object:tree",tD:"object:teddy-bear",cH:"object:carousel-horse",tM:"object:treadmill",wT:"object:weight-rack",sT:"object:stall",jZ:"object:jacuzzi-tile"},ba=new Set(["C","S","B"]),ya={C:"chair",S:"sofa",B:"bed"};function ga(e){let t=0;for(let s=0;s<e.length;s++)t=t*31+e.charCodeAt(s)&65535;const a=[0,30,60,120,180,210,270,300];return`hsl(${a[t%a.length]}, 70%, 52%)`}function xa(e){const t=new Map;return e.rooms.forEach((a,s)=>{for(const[i,o]of a.cells)t.set(`${i},${o}`,s)}),t}function wa(e,t,a,s,i,o,l){const r=t.floorPlan,b=a.colorPalette,{blockedRows:p,blockedCols:c}=Ze(Array.from(s.values())),f=xa(r),n=C;for(let m=0;m<r.height;m++)for(let h=0;h<r.width;h++){const y=f.get(`${h},${m}`);y!==void 0&&r.tiles[m][h]!=="W"&&(e.fillStyle=Ae[y%Ae.length],e.fillRect(h*n,m*n,n,n))}for(let m=0;m<r.height;m++)for(let h=0;h<r.width;h++){const y=r.tiles[m][h],u=h*n,d=m*n;if(y==="W"){e.fillStyle=b.wall,e.fillRect(u,d,n,n),e.strokeStyle="rgba(255,255,255,0.06)",e.lineWidth=1;const v=Math.max(6,Math.floor(n/8));for(let w=0;w<Math.ceil(n/v);w++){const F=d+w*v;e.beginPath(),e.moveTo(u,F),e.lineTo(u+n,F),e.stroke();const x=w%2*(n/2);e.beginPath(),e.moveTo(u+x,F),e.lineTo(u+x,Math.min(F+v,d+n)),e.stroke()}continue}if(e.fillStyle=b.floor,e.fillRect(u,d,n,n),e.strokeStyle="rgba(0,0,0,0.10)",e.lineWidth=1,e.strokeRect(u+.5,d+.5,n-1,n-1),ba.has(y)){const v=ya[y]??"chair",w=Pe[v]??"",F=w?Be(w,l):null;if(F){const x=Math.floor(n*.06);e.drawImage(F,u+x,d+x,n-x*2,n-x*2)}else{e.fillStyle=b.seat;const x=Math.floor(n*.4),T=u+(n-x)/2,N=d+(n-x)/2+Math.floor(n*.05);e.fillRect(T,N,x,x),e.fillRect(T,d+Math.floor(n*.08),x,Math.floor(n*.1))}continue}if(y!=="F"){const v=pa[y]??`object:${y}`,w=(a.spriteMap[v]??"")||(Pe[v]??""),F=w?Be(w,l):null;if(F)e.drawImage(F,u,d,n,n);else{const x=v.replace("object:","").slice(0,4).toUpperCase();e.fillStyle="rgba(110,75,28,0.88)",e.fillRect(u+2,d+2,n-4,n-4),e.strokeStyle="#7a5c2e",e.lineWidth=2,e.strokeRect(u+2,d+2,n-4,n-4),e.fillStyle="#ffe0a0",e.font=`${Math.max(6,Math.floor(n*.18))}px ${U}`,e.textAlign="center",e.textBaseline="middle",e.fillText(x,u+n/2,d+n/2),e.textAlign="left",e.textBaseline="alphabetic"}}}const g=[[1,0],[-1,0],[0,1],[0,-1]];r.rooms.forEach((m,h)=>{e.strokeStyle=ee[h%ee.length],e.lineWidth=2.5;for(const[y,u]of m.cells)if(r.tiles[u]?.[y]!=="W")for(const[d,v]of g){const w=y+d,F=u+v,x=f.get(`${w},${F}`),T=r.tiles[F]?.[w];(x!==h||T==="W"||T===void 0)&&(e.beginPath(),d===1?(e.moveTo((y+1)*n,u*n),e.lineTo((y+1)*n,(u+1)*n)):d===-1?(e.moveTo(y*n,u*n),e.lineTo(y*n,(u+1)*n)):v===1?(e.moveTo(y*n,(u+1)*n),e.lineTo((y+1)*n,(u+1)*n)):(e.moveTo(y*n,u*n),e.lineTo((y+1)*n,u*n)),e.stroke())}}),r.rooms.forEach((m,h)=>{const y=m.cells.filter(([x,T])=>r.tiles[T]?.[x]!=="W");if(!y.length)return;const u=y.map(([x])=>x),d=y.map(([,x])=>x),v=(Math.min(...u)+Math.max(...u)+1)/2*n,w=(Math.min(...d)+Math.max(...d)+1)/2*n,F=Math.max(5,Math.min(8,Math.floor(n*.11)));e.font=`${F}px ${U}`,e.textAlign="center",e.textBaseline="middle",e.fillStyle="rgba(0,0,0,0.35)",e.fillText(m.name.toUpperCase(),v+1,w+1),e.fillStyle=ee[h%ee.length].replace("0.75","0.9"),e.fillText(m.name.toUpperCase(),v,w),e.textAlign="left",e.textBaseline="alphabetic"}),e.fillStyle="rgba(0, 0, 0, 0.16)";for(const m of p)e.fillRect(0,m*n,r.width*n,n);for(const m of c)e.fillRect(m*n,0,n,r.height*n);if(i){const m=i.x*n,h=i.y*n;e.fillStyle=`${b.accent}55`,e.fillRect(m,h,n,n),e.strokeStyle=b.accent,e.lineWidth=4,e.strokeRect(m+2,h+2,n-4,n-4),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.strokeRect(m+6,h+6,n-12,n-12);const y=Math.max(10,Math.floor(n*.28));e.font=`bold ${y}px ${U}`,e.fillStyle="#ffffff",e.textAlign="center",e.textBaseline="middle",e.fillText("?",m+n/2,h+n/2),e.textAlign="left",e.textBaseline="alphabetic"}for(const[m,h]of s){const y=t.suspects.find(x=>x.id===m);if(!y)continue;const u=h.x*n,d=h.y*n,v=Math.floor(n*.1),w=n-v*2;e.fillStyle=ga(m),e.fillRect(u+v,d+v,w,w),e.strokeStyle="rgba(0,0,0,0.7)",e.lineWidth=2,e.strokeRect(u+v+1,d+v+1,w-2,w-2),e.strokeStyle="rgba(255,255,255,0.25)",e.lineWidth=1,e.strokeRect(u+v+3,d+v+3,w-6,w-6);const F=Math.min(16,Math.floor(w*.5));e.fillStyle="#ffffff",e.font=`${F}px ${U}`,e.textAlign="center",e.textBaseline="middle",e.fillText(y.name.charAt(0).toUpperCase(),u+n/2,d+n/2+1),e.textAlign="left",e.textBaseline="alphabetic"}if(o){for(const[m,h]of o.x){const y=m*n,u=h*n;e.fillStyle="rgba(192,57,43,0.18)",e.fillRect(y,u,n,n),e.strokeStyle="#c0392b",e.lineWidth=3;const d=Math.floor(n*.18);e.beginPath(),e.moveTo(y+d,u+d),e.lineTo(y+n-d,u+n-d),e.stroke(),e.beginPath(),e.moveTo(y+n-d,u+d),e.lineTo(y+d,u+n-d),e.stroke()}for(const[m,h]of Object.entries(o.candidates)){if(!h.length)continue;const[y,u]=m.split(",").map(Number),d=y*n,v=u*n,w=h.map(x=>t.suspects.find(T=>T.id===x)?.name.charAt(0).toUpperCase()??"?").join("")+"?",F=Math.max(5,Math.floor(n*.14));e.font=`${F}px ${U}`,e.fillStyle="rgba(80,100,220,0.9)",e.textAlign="center",e.textBaseline="bottom",e.fillText(w,d+n/2,v+n-2),e.textAlign="left",e.textBaseline="alphabetic"}}}function Fa(e){return{width:e.floorPlan.width*C,height:e.floorPlan.height*C}}const va=`
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
`,Oe=["rgba(220,140,40,0.35)","rgba(60,120,220,0.35)","rgba(40,170,80,0.35)","rgba(200,40,120,0.35)","rgba(180,160,20,0.35)","rgba(100,40,200,0.35)"],Le=["#dc8c28","#3c78dc","#28aa50","#c82878","#b4a014","#6428c8"];let ze=!1;function $a(){if(ze)return;const e=document.createElement("style");e.textContent=va,document.head.appendChild(e),ze=!0}function ka(e){let t=0;for(let s=0;s<e.length;s++)t=t*31+e.charCodeAt(s)&65535;const a=[0,30,60,120,180,210,270,300];return`hsl(${a[t%a.length]}, 70%, 52%)`}function Ca(e,t,a,s){e.width=32,e.height=32;const o=e.getContext("2d");if(!o)return;const l=ka(t);o.fillStyle=s?l:"rgba(180,160,120,0.3)",o.fillRect(0,0,32,32),o.fillStyle=s?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.08)",o.beginPath(),o.arc(32/2,32*.38,32*.28,0,Math.PI*2),o.fill(),o.fillStyle=s?"rgba(0,0,0,0.2)":"rgba(0,0,0,0.06)",o.beginPath(),o.moveTo(32*.28,32*.65),o.lineTo(32*.72,32*.65),o.lineTo(32*.85,32),o.lineTo(32*.15,32),o.closePath(),o.fill(),o.fillStyle=s?"#ffffff":"rgba(60,40,10,0.6)",o.font=`bold ${Math.floor(32*.45)}px 'Press Start 2P', monospace`,o.textAlign="center",o.textBaseline="middle",o.fillText(a.charAt(0).toUpperCase(),32/2,32*.38),o.textAlign="left",o.textBaseline="alphabetic",o.strokeStyle=s?l:"rgba(139,105,20,0.5)",o.lineWidth=2,o.strokeRect(1,1,30,30)}function Sa(e,t,a,s,i){$a(),e.innerHTML="",e.className="alibi-sidebar";const o=document.createElement("div");o.className="alibi-sidebar-section";const l=document.createElement("div");l.className="alibi-sidebar-label",l.textContent="Rooms",o.appendChild(l);const r=document.createElement("div");r.className="alibi-room-legend",t.floorPlan.rooms.forEach((w,F)=>{const x=document.createElement("div");x.className="alibi-room-entry";const T=document.createElement("div");T.className="alibi-room-swatch",T.style.background=Oe[F%Oe.length],T.style.borderColor=Le[F%Le.length];const N=document.createElement("span");N.textContent=w.name,x.appendChild(T),x.appendChild(N),r.appendChild(x)}),o.appendChild(r),e.appendChild(o);const b=document.createElement("div");b.className="alibi-victim-section";const p=document.createElement("div");p.className="alibi-sidebar-label",p.textContent="Victim",b.appendChild(p);const c=document.createElement("div");c.className="alibi-victim-card",c.setAttribute("data-testid","victim-token");const f=document.createElement("div");f.className="alibi-victim-icon",f.textContent="?";const n=document.createElement("div");n.className="alibi-victim-label",a.size>=t.suspects.length?(n.textContent=`Location revealed!
Click victim cell`,f.textContent="☠",c.style.borderColor="rgba(192,57,43,0.7)",c.style.background="rgba(192,57,43,0.12)"):n.textContent=`Unknown
Place all ${t.suspects.length} suspects`,c.appendChild(f),c.appendChild(n),b.appendChild(c),e.appendChild(b);const m=document.createElement("div");m.className="alibi-sidebar-section";const h=document.createElement("div");h.className="alibi-sidebar-label",h.textContent="Suspects",m.appendChild(h);const y=document.createElement("div");y.className="alibi-suspect-section";for(const w of t.suspects){const F=a.has(w.id),x=document.createElement("div");x.className="alibi-suspect-card"+(F?" placed":""),x.setAttribute("data-testid",`suspect-card-${w.id}`);const T=document.createElement("div");T.className="alibi-suspect-portrait";const N=document.createElement("canvas");Ca(N,w.id,w.name,F),T.appendChild(N);const M=document.createElement("div");M.className="alibi-suspect-info";const S=document.createElement("div");S.className="alibi-suspect-name",S.textContent=w.name;const I=document.createElement("div");if(I.className="alibi-suspect-status",F){const E=a.get(w.id);I.textContent=`Col ${E.x+1}, Row ${E.y+1}`}else I.textContent="Not placed";M.appendChild(S),M.appendChild(I),x.appendChild(T),x.appendChild(M),y.appendChild(x)}m.appendChild(y),e.appendChild(m);const u=document.createElement("div");u.className="alibi-sidebar-section";const d=document.createElement("div");d.className="alibi-sidebar-label",d.textContent="Evidence",u.appendChild(d);const v=document.createElement("div");v.className="alibi-clue-section",t.clues.forEach((w,F)=>{const x=document.createElement("div");x.className="alibi-clue-card",x.setAttribute("data-testid",`clue-${F}`),s.has(F)&&x.classList.add("clue-satisfied"),i.has(F)&&x.classList.add("clue-error"),x.textContent=w.text,v.appendChild(x)}),u.appendChild(v),e.appendChild(u)}const Ta=`
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
`;let He=!1;function xe(){if(He)return;const e=document.createElement("style");e.textContent=Ta,document.head.appendChild(e),He=!0}function ce(e,t,a){xe(),we(e);const s=document.createElement("div");s.className="alibi-overlay",s.setAttribute("data-testid","narrative-intro");const i=document.createElement("div");i.className="alibi-modal";const o=document.createElement("h2");o.textContent="A New Case";const l=document.createElement("p");l.textContent=t.narrativeIntro;const r=document.createElement("button");r.textContent="Begin Investigation",r.addEventListener("click",()=>{s.remove(),a()}),i.appendChild(o),i.appendChild(l),i.appendChild(r),s.appendChild(i),e.appendChild(s)}function Ea(e,t){xe(),we(e);const a=t.narrativeGuilty.replace("{{killerName}}",t.killer.name),s=document.createElement("div");s.className="alibi-overlay";const i=document.createElement("div");i.className="alibi-modal";const o=document.createElement("div");o.className="alibi-guilty-stamp",o.setAttribute("data-testid","guilty-stamp"),o.textContent="GUILTY";const l=document.createElement("div");l.className="alibi-guilty-killer",l.setAttribute("data-testid","guilty-killer-name"),l.textContent=t.killer.name;const r=document.createElement("p");r.textContent=a;const b=document.createElement("p");b.textContent=t.narrativeVictimFound,i.appendChild(o),i.appendChild(l),i.appendChild(b),i.appendChild(r),s.appendChild(i),e.appendChild(s)}function we(e){const t=e.querySelector(".alibi-overlay");t&&t.remove()}function Ra(e){xe(),we(e);const t=document.createElement("div");t.className="alibi-overlay",t.setAttribute("data-testid","msg-clue-gate");const a=document.createElement("div");a.className="alibi-modal";const s=document.createElement("h2");s.textContent="Something Doesn't Add Up…";const i=document.createElement("p");i.textContent="Check the clue cards. Not all witnesses are satisfied.";const o=document.createElement("button");o.textContent="Keep Investigating",o.addEventListener("click",()=>t.remove()),a.appendChild(s),a.appendChild(i),a.appendChild(o),t.appendChild(a),e.appendChild(t),setTimeout(()=>{t.isConnected&&t.remove()},3e3)}function Wa(){return{x:[],candidates:{}}}function Ve(e){return{placements:new Map,annotations:Wa(),satisfiedClues:new Set,errorClues:new Set,victimVisible:!1,victimCell:null,phase:"playing",elapsedMs:0}}function Na(e,t,a,s,i){const o=new Map(e.placements);return o.set(a,{suspectId:a,x:s,y:i}),Fe({...e,placements:o},t)}function ja(e,t,a){const s=new Map(e.placements);return s.delete(a),Fe({...e,placements:s},t)}function Ma(e){if(e.satisfiedClues.size===0&&e.placements.size>0)return e;const t=e.satisfiedClues.size+e.errorClues.size;return e.errorClues.size===0&&t>0&&e.victimVisible?{...e,phase:"guilty"}:e}function Fe(e,t){const a=new Set,s=new Set;t.clues.forEach((l,r)=>{const b=fe(t.floorPlan,l,e.placements);b===!0?a.add(r):b===!1&&s.add(r)});const i=Je(t.floorPlan,Array.from(e.placements.values()));return{...e,satisfiedClues:a,errorClues:s,victimVisible:i!==null,victimCell:i}}function K(e){return{x:[...e.x.map(([t,a])=>[t,a])],candidates:Object.fromEntries(Object.entries(e.candidates).map(([t,a])=>[t,[...a]]))}}function Ia(e,t,a){const s=K(e.annotations),i=s.x.findIndex(([o,l])=>o===t&&l===a);return i>=0?s.x.splice(i,1):s.x.push([t,a]),{...e,annotations:s}}function Pa(e,t,a,s){const i=K(e.annotations),o=`${t},${a}`;return i.candidates[o]||(i.candidates[o]=[]),i.candidates[o].includes(s)||(i.candidates[o]=[...i.candidates[o],s]),{...e,annotations:i}}function Ba(e,t,a,s){const i=K(e.annotations),o=`${t},${a}`;return i.candidates[o]&&(i.candidates[o]=i.candidates[o].filter(l=>l!==s),i.candidates[o].length===0&&delete i.candidates[o]),{...e,annotations:i}}function Aa(e,t,a,s){const i=K(e.annotations);for(const l of Object.keys(i.candidates))i.candidates[l]=i.candidates[l].filter(r=>r!==t),i.candidates[l].length===0&&delete i.candidates[l];const o=i.x.findIndex(([l,r])=>l===a&&r===s);return o>=0&&i.x.splice(o,1),{...e,annotations:i}}function _(e){return{placements:new Map(e.placements),annotations:K(e.annotations)}}function de(e,t,a){return Fe({...e,placements:new Map(a.placements),annotations:K(a.annotations)},t)}const Oa=50;class La{constructor(){oe(this,"past",[]);oe(this,"future",[])}push(t){this.past.push(t),this.past.length>Oa&&this.past.shift(),this.future=[]}undo(t){return this.past.length===0?null:(this.future.push(t),this.past.pop())}redo(t){return this.future.length===0?null:(this.past.push(t),this.future.pop())}canUndo(){return this.past.length>0}canRedo(){return this.future.length>0}clear(){this.past=[],this.future=[]}}let q=null,ie=!1;function za(){if(ie)return null;try{return q||(q=new AudioContext),q.state==="suspended"&&q.resume().catch(()=>{}),q}catch{return null}}function V(e,t,a="sine",s=.15){const i=za();if(i)try{const o=i.createOscillator(),l=i.createGain();o.connect(l),l.connect(i.destination),o.type=a,o.frequency.value=e,l.gain.setValueAtTime(s,i.currentTime),l.gain.exponentialRampToValueAtTime(.001,i.currentTime+t),o.start(i.currentTime),o.stop(i.currentTime+t)}catch{}}function te(e){switch(e){case"place":V(440,.08,"sine",.12);break;case"remove":V(330,.06,"sine",.08);break;case"clue-satisfied":V(660,.12,"sine",.15);break;case"solve":{V(523,.15,"sine",.2),setTimeout(()=>V(659,.15,"sine",.2),150),setTimeout(()=>V(784,.3,"sine",.25),300);break}case"error":V(220,.2,"square",.1);break;case"navigate":V(880,.05,"sine",.08);break}}function Ha(){return ie=!ie,ie}function Va(e,t){const a=Math.floor(t/6e4),s=Math.floor(t%6e4/1e3),i=a>0?`${a}m ${s}s`:`${s}s`,o=e.difficulty.charAt(0).toUpperCase()+e.difficulty.slice(1);return["🔍 ALIBI",`Case: ${e.floorPlan===e.floorPlan?e.themeId.replace(/-/g," ").replace(/\b\w/g,l=>l.toUpperCase()):"Unknown"}`,`Difficulty: ${o}`,`Clues: ${e.clues.length}`,`Time: ${i}`,`Killer: ${e.killer.name}`,"","pnz1990.github.io/alibi/"].join(`
`)}async function Da(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;const t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:-9999px;left:-9999px;",document.body.appendChild(t),t.focus(),t.select();const a=document.execCommand("copy");return document.body.removeChild(t),a}catch{return!1}}const X={campaign:e=>`alibi_campaign_${e}`,daily:e=>`alibi_daily_${e}`,streak:"alibi_streak",stats:"alibi_stats",prefs:"alibi_prefs",puzzleState:"alibi_puzzle_state"};function _a(e){try{const t=ve();t[e.key]=e,localStorage.setItem(X.puzzleState,JSON.stringify(t))}catch{}}function Ya(e){try{return ve()[e]??null}catch{return null}}function De(e){try{const t=ve();delete t[e],localStorage.setItem(X.puzzleState,JSON.stringify(t))}catch{}}function ve(){try{const e=localStorage.getItem(X.puzzleState);return e?JSON.parse(e):{}}catch{return{}}}function Z(e){try{const t=localStorage.getItem(X.campaign(e));return t?JSON.parse(t):null}catch{return null}}function $e(e){try{localStorage.setItem(X.campaign(e.slot),JSON.stringify(e))}catch{}}const Ka=["coffee-shop","bookstore","backyard","holiday-mall","restaurant","gym","office","garden-party","hospital","carnival"],Ga=["easy","easy","easy","easy","medium","medium","medium","medium","hard","hard","hard","hard"];function Ua(e,t){let a=e^t*2654435769;return a=(a>>>16^a)*73244475|0,a=(a>>>16^a)*73244475|0,a=a>>>16^a,Math.abs(a)}function qa(e,t){const a=Math.floor(t/4),s=t%4,i=(e^a*4919+s*66)>>>0,o=[...Ka];return o[i%o.length]}function et(e){const t=Za(),a=Array.from({length:12},(s,i)=>({seed:Ua(t,i),themeId:qa(t,i),difficulty:Ga[i],status:i===0?"in_progress":"locked"}));return{campaignSeed:t,slot:e,currentCase:0,startedAt:new Date().toISOString(),cases:a,rank:"rookie"}}function Za(){return Math.floor(Math.random()*4294967295)}function Ja(e){const t=e.cases.filter(a=>a.status==="solved").length;return t>=12?"senior":t>=8?"detective":t>=4?"investigator":"rookie"}function Xa(e,t,a,s){const i=e.cases.map((r,b)=>b===t?{...r,status:"solved",solveTimeMs:a,killerName:s}:b===t+1&&r.status==="locked"?{...r,status:"in_progress"}:r),o=t<11?t+1:t,l={...e,cases:i,currentCase:o};return{...l,rank:Ja(l)}}const Qa=`
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
`;let _e=!1;function ei(){if(_e)return;const e=document.createElement("style");e.textContent=Qa,document.head.appendChild(e),_e=!0}let ue=null,pe=null;function H(){ue?.remove(),pe?.remove(),ue=null,pe=null}function ti(e,t,a){if(H(),!a.length)return;const s=52,i=22,o=document.createElement("div");o.className="alibi-wheel-backdrop",o.addEventListener("click",H),o.addEventListener("touchstart",H,{passive:!0}),document.body.appendChild(o),pe=o;const l=document.createElement("div");l.className="alibi-wheel",l.setAttribute("data-testid","radial-menu"),l.style.left=`${e}px`,l.style.top=`${t}px`,l.style.transform="translate(-50%, -50%)",l.style.pointerEvents="all";const r=a.length,b=(s+i+4)*2,p=b/2,c=b/2,f=document.createElementNS("http://www.w3.org/2000/svg","svg");f.setAttribute("class","alibi-wheel-svg"),f.setAttribute("width",String(b)),f.setAttribute("height",String(b)),f.setAttribute("viewBox",`0 0 ${b} ${b}`);let n=-1;a.forEach((h,y)=>{const u=y/r*Math.PI*2-Math.PI/2,d=(y+1)/r*Math.PI*2-Math.PI/2,v=(u+d)/2,w=.06,F=18,x=s+i,T=p+F*Math.cos(u+w),N=c+F*Math.sin(u+w),M=p+F*Math.cos(d-w),S=c+F*Math.sin(d-w),I=p+x*Math.cos(u+w),E=c+x*Math.sin(u+w),O=p+x*Math.cos(d-w),$=c+x*Math.sin(d-w),R=d-u-w*2>Math.PI?1:0,B=[`M ${T} ${N}`,`A ${F} ${F} 0 ${R} 1 ${M} ${S}`,`L ${O} ${$}`,`A ${x} ${x} 0 ${R} 0 ${I} ${E}`,"Z"].join(" "),j=document.createElementNS("http://www.w3.org/2000/svg","path");j.setAttribute("d",B),j.setAttribute("fill",h.color),j.setAttribute("stroke","rgba(0,0,0,0.5)"),j.setAttribute("stroke-width","1.5"),j.style.cursor="pointer",j.style.transition="filter 0.08s";const D=(F+x)/2,at=p+D*Math.cos(v),it=c+D*Math.sin(v),L=document.createElementNS("http://www.w3.org/2000/svg","text");L.setAttribute("x",String(at)),L.setAttribute("y",String(it)),L.setAttribute("text-anchor","middle"),L.setAttribute("dominant-baseline","middle"),L.setAttribute("fill","#ffffff"),L.setAttribute("font-size",r>8?"7":"8"),L.setAttribute("font-family","'Press Start 2P', monospace"),L.setAttribute("pointer-events","none"),L.style.userSelect="none",L.textContent=h.label,j.setAttribute("data-testid",h.testid),j.addEventListener("mouseenter",()=>{j.style.filter="brightness(1.4)",L.setAttribute("fill","#ffffc0")}),j.addEventListener("mouseleave",()=>{j.style.filter="",L.setAttribute("fill","#ffffff")}),j.addEventListener("click",nt=>{nt.stopPropagation(),H(),h.onClick()}),f.appendChild(j),f.appendChild(L)});let g=!1;f.addEventListener("touchstart",h=>{h.preventDefault(),g=!0},{passive:!1}),f.addEventListener("touchmove",h=>{if(!g)return;h.preventDefault();const y=h.touches[0],u=f.getBoundingClientRect(),d=y.clientX-(u.left+u.width/2),v=y.clientY-(u.top+u.height/2);if(Math.sqrt(d*d+v*v)<16){n>=0&&(f.children[n*2].style.filter="",n=-1);return}let F=Math.atan2(v,d)+Math.PI/2;F<0&&(F+=Math.PI*2);const x=Math.floor(F/(Math.PI*2)*r)%r;x!==n&&(n>=0&&(f.children[n*2].style.filter=""),n=x,f.children[x*2].style.filter="brightness(1.5)")},{passive:!1}),f.addEventListener("touchend",h=>{h.preventDefault(),g=!1,n>=0&&n<a.length&&(H(),a[n].onClick()),n=-1},{passive:!1}),l.appendChild(f);const m=document.createElement("div");m.className="alibi-wheel-center",m.textContent="✕",m.addEventListener("click",h=>{h.stopPropagation(),H()}),l.appendChild(m),document.body.appendChild(l),ue=l}function ai(e,t,a,s,i){ei();const o=t.floorPlan,l=document.createElement("div");l.className="alibi-radial-overlay",l.style.cssText=`position:absolute;top:0;left:0;width:${o.width*C}px;height:${o.height*C}px;`,e.style.position="relative",e.appendChild(l);const r=[];for(let n=0;n<o.height;n++){r[n]=[];for(let g=0;g<o.width;g++){const m=o.tiles[n][g],h=document.createElement("div");h.setAttribute("data-testid",`cell-${g}-${n}`),h.style.cssText=`position:absolute;left:${g*C}px;top:${n*C}px;width:${C}px;height:${C}px;`,Y(m)&&(h.classList.add("alibi-cell-overlay","placeable"),h.addEventListener("click",y=>{y.stopPropagation();const u=e.getBoundingClientRect(),d=u.left+(g+.5)*C,v=u.top+(n+.5)*C;ni(g,n,d,v,s,t,i)})),r[n][g]=h,l.appendChild(h)}}let b=null;const p=()=>H();document.addEventListener("keydown",n=>{n.key==="Escape"&&H()});function c(){const n=s();if(b&&(b.remove(),b=null),n.victimCell){const{x:h,y}=n.victimCell;b=document.createElement("div"),b.setAttribute("data-testid","victim-cell"),b.className="alibi-cell-overlay victim-highlight",b.style.cssText=`position:absolute;left:${h*C}px;top:${y*C}px;width:${C}px;height:${C}px;pointer-events:all;`,b.addEventListener("click",u=>{u.stopPropagation(),i.onVictimClick()}),l.appendChild(b)}const g=new Set,m=new Set;for(const h of n.placements.values())g.add(h.y),m.add(h.x);for(let h=0;h<o.height;h++)for(let y=0;y<o.width;y++){const u=r[h]?.[y];if(!u)continue;const d=o.tiles[h][y],v=Array.from(n.placements.values()).some(F=>F.x===y&&F.y===h),w=g.has(h)||m.has(y);u.style.pointerEvents=Y(d)&&(!w||v)?"all":"none"}l.style.width=`${o.width*C}px`,l.style.height=`${o.height*C}px`;for(let h=0;h<o.height;h++)for(let y=0;y<o.width;y++){const u=r[h]?.[y];u&&(u.style.left=`${y*C}px`,u.style.top=`${h*C}px`,u.style.width=`${C}px`,u.style.height=`${C}px`)}l.querySelectorAll("[data-annotation]").forEach(h=>h.remove());for(const[h,y]of n.annotations.x){const u=document.createElement("div");u.setAttribute("data-testid",`cell-annotation-x-${h}-${y}`),u.setAttribute("data-annotation","x"),u.style.cssText=`position:absolute;left:${h*C}px;top:${y*C}px;width:${C}px;height:${C}px;pointer-events:none;`,l.appendChild(u)}for(const[h,y]of Object.entries(n.annotations.candidates)){if(!y.length)continue;const[u,d]=h.split(",").map(Number),v=document.createElement("div");v.setAttribute("data-testid",`cell-annotation-candidates-${u}-${d}`),v.setAttribute("data-annotation","candidates"),v.setAttribute("data-candidates",y.join(",")),v.style.cssText=`position:absolute;left:${u*C}px;top:${d*C}px;width:${C}px;height:${C}px;pointer-events:none;`,l.appendChild(v)}}function f(){document.removeEventListener("click",p),l.remove(),H()}return c(),{updateOverlays:c,detach:f}}function ii(e){let t=0;for(let s=0;s<e.length;s++)t=t*31+e.charCodeAt(s)&65535;const a=[0,30,60,120,180,210,270,300];return`hsl(${a[t%a.length]}, 65%, 40%)`}function ni(e,t,a,s,i,o,l){const r=i(),b=Array.from(r.placements.entries()).find(([,g])=>g.x===e&&g.y===t),p=[],c=new Set(r.placements.keys());for(const g of o.suspects)c.has(g.id)||p.push({label:g.name.charAt(0).toUpperCase(),sublabel:`Place ${g.name}`,testid:`suspect-option-${g.id}`,color:ii(g.id),onClick:()=>l.onPlace(g.id,e,t)});const f=r.annotations.x.some(([g,m])=>g===e&&m===t);p.push({label:"✕",sublabel:f?"Clear X":"Mark X",testid:"suspect-option-markx",color:f?"#5a1a1a":"#3a1a1a",onClick:()=>l.onToggleX(e,t)});const n=r.annotations.candidates[`${e},${t}`]??[];for(const g of o.suspects){if(c.has(g.id))continue;const m=n.includes(g.id);p.push({label:g.name.charAt(0).toUpperCase()+"?",sublabel:m?`Remove ${g.name}?`:`Maybe ${g.name}`,testid:`suspect-option-candidate-${g.id}`,color:m?"#2a2a5a":"#1a1a3a",onClick:()=>m?l.onRemoveCandidate(g.id,e,t):l.onAddCandidate(g.id,e,t)})}b&&p.push({label:"↩",sublabel:"Remove",testid:"suspect-option-clear",color:"#2a2a2a",onClick:()=>l.onRemove(b[0])}),p.length&&ti(a,s,p)}function oi(e){return`${e.seed}-${e.themeId}-${e.difficulty}`}function si(e){const t=new URLSearchParams(location.search),a=t.get("theme")??"coffee-shop",s=t.get("difficulty")??"easy",i=parseInt(t.get("seed")??"0",10),o=t.get("campaignSlot"),l=t.get("campaignCase"),r=o?parseInt(o,10):null,b=l?parseInt(l,10):null,p=Qe(a),c=ut(i,p,s),f=oi(c),n=ci(),g=n.querySelector(".alibi-canvas-wrapper"),m=n.querySelector(".alibi-sidebar-container"),h=document.getElementById("game-canvas"),y=h.getContext("2d");h.style.imageRendering="pixelated";function u(){ua(c.floorPlan.width,c.floorPlan.height);const{width:$,height:R}=Fa(c);h.width=$,h.height=R,h.style.width=`${$}px`,h.style.height=`${R}px`,F()}g.appendChild(h);let d=Ve();const v=new La;function w($,R){const B={};R.placements.forEach((j,D)=>{B[D]={x:j.x,y:j.y}}),_a({key:$,placements:B,elapsedMs:R.elapsedMs,savedAt:new Date().toISOString(),annotations:R.annotations})}function F(){wa(y,c,p,d.placements,d.victimCell,d.annotations,()=>F()),Sa(m,c,d.placements,d.satisfiedClues,d.errorClues),x.updateOverlays()}const x=ai(g,c,p,()=>d,{onPlace($,R,B){d.phase==="playing"&&(v.push(_(d)),d=Na(d,c,$,R,B),d=Aa(d,$,R,B),w(f,d),te(d.satisfiedClues.size>0?"clue-satisfied":"place"),F())},onRemove($){d.phase==="playing"&&(v.push(_(d)),d=ja(d,c,$),w(f,d),te("remove"),F())},onVictimClick(){if(d.phase!=="playing")return;const $=Ma(d);if($.phase==="guilty"){if(d=$,De(f),te("solve"),F(),Ea(document.body,c),di(c,d),r!==null&&b!==null){const R=Z(r);if(R){const B=Xa(R,b,d.elapsedMs,c.killer.name);$e(B),setTimeout(()=>{window.location.href=`${window.location.pathname}?mode=campaign&campaignSlot=${r}`},3e3)}}}else te("error"),F(),Ra(document.body)},onToggleX($,R){d.phase==="playing"&&(v.push(_(d)),d=Ia(d,$,R),w(f,d),F())},onAddCandidate($,R,B){d.phase==="playing"&&(v.push(_(d)),d=Pa(d,R,B,$),w(f,d),F())},onRemoveCandidate($,R,B){d.phase==="playing"&&(v.push(_(d)),d=Ba(d,R,B,$),w(f,d),F())}}),T=n.querySelector('[data-testid="btn-undo"]'),N=n.querySelector('[data-testid="btn-redo"]');T.addEventListener("click",M),N.addEventListener("click",S);function M(){const $=v.undo(_(d));$&&(d=de(d,c,$),F())}function S(){const $=v.redo(_(d));$&&(d=de(d,c,$),F())}const I=n.querySelector('[data-testid="btn-mute"]');I.addEventListener("click",()=>{const $=Ha();I.textContent=$?"🔇":"🔊"}),document.addEventListener("keydown",$=>{($.ctrlKey||$.metaKey)&&$.key==="z"&&!$.shiftKey&&(M(),$.preventDefault()),($.ctrlKey||$.metaKey)&&($.key==="y"||$.key==="z"&&$.shiftKey)&&(S(),$.preventDefault())});const E=Ya(f);E&&Object.keys(E.placements).length>0?hi(n,()=>{const $=new Map(Object.entries(E.placements).map(([j,D])=>[j,{suspectId:j,x:D.x,y:D.y}])),R=E.annotations??{x:[],candidates:{}},B={placements:$,annotations:R};d=de(Ve(),c,B),d={...d,elapsedMs:E.elapsedMs},u(),ce(document.body,c,()=>{})},()=>{De(f),ce(document.body,c,()=>{})}):ce(document.body,c,()=>{}),u(),new ResizeObserver(()=>u()).observe(document.body)}const ri=`
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
`;let Ye=!1;function li(){if(Ye)return;const e=document.createElement("style");e.textContent=ri,document.head.appendChild(e),Ye=!0}function ci(){li();const e=document.createElement("div");e.setAttribute("data-testid","screen-game"),e.className="alibi-game-screen";const t=document.createElement("div");t.className="alibi-grid-panel",t.style.cssText="flex:1;display:flex;align-items:center;justify-content:center;padding:16px;overflow:hidden;";const a=document.createElement("div");a.className="alibi-canvas-wrapper",t.appendChild(a);const s=document.createElement("div");s.style.cssText="display:flex;flex-direction:column;height:100vh;width:280px;flex-shrink:0;";const i=document.createElement("div");i.className="alibi-toolbar";const o=he("btn-undo","↩ Undo"),l=he("btn-redo","↪ Redo"),r=he("btn-mute","🔊");i.append(o,l,r);const b=document.createElement("div");b.className="alibi-sidebar-container",s.append(i,b),e.append(t,s);const p=document.getElementById("game-canvas");return p.parentElement?.insertBefore(e,p),e}function he(e,t){const a=document.createElement("button");return a.setAttribute("data-testid",e),a.textContent=t,a}function di(e,t){const a=document.createElement("button");a.setAttribute("data-testid","btn-share"),a.style.cssText='position:fixed;bottom:24px;right:24px;z-index:300;background:#c0392b;color:#fff;border:2px solid #ff5a47;border-radius:0;padding:10px 20px;font-family:"Press Start 2P",monospace;font-size:11px;cursor:pointer;box-shadow:3px 3px 0 #6b0000;',a.textContent="📋 Share Result",a.addEventListener("click",async()=>{const s=Va(e,t.elapsedMs),i=await Da(s);a.textContent=i?"✓ Copied!":"📋 Share Result",i&&setTimeout(()=>{a.textContent="📋 Share Result"},2e3)}),document.body.appendChild(a)}function hi(e,t,a){const s=document.createElement("div");s.setAttribute("data-testid","prompt-resume"),s.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:150;font-family:"Press Start 2P",monospace;';const i=document.createElement("div");i.style.cssText="background:#0a0a12;border:3px solid #c0392b;border-radius:0;box-shadow:4px 4px 0 #6b0000;padding:28px;max-width:360px;text-align:center;color:#fff;";const o=document.createElement("h2");o.style.cssText='color:#c0392b;margin-bottom:16px;font-family:"Press Start 2P",monospace;font-size:0.75em;line-height:1.6;',o.textContent="Resume?";const l=document.createElement("p");l.style.cssText='color:#aaa;margin-bottom:20px;font-family:"Press Start 2P",monospace;font-size:0.45em;line-height:2;',l.textContent="Continue your in-progress case?";const r=document.createElement("button");r.style.cssText='background:#c0392b;color:#fff;border:2px solid #ff5a47;border-radius:0;padding:9px 20px;font-family:"Press Start 2P",monospace;font-size:9px;cursor:pointer;margin-right:8px;box-shadow:2px 2px 0 #6b0000;',r.textContent="Resume",r.addEventListener("click",()=>{s.remove(),t()});const b=document.createElement("button");b.style.cssText='background:#1a1a2e;color:#fff;border:2px solid #555;border-radius:0;padding:9px 20px;font-family:"Press Start 2P",monospace;font-size:9px;cursor:pointer;box-shadow:2px 2px 0 #000;',b.textContent="Start Fresh",b.addEventListener("click",()=>{s.remove(),a()}),i.append(o,l,r,b),s.appendChild(i),e.appendChild(s)}function mi(e){let t=5381;for(let a=0;a<e.length;a++)t=(t<<5)+t+e.charCodeAt(a)|0;return Math.abs(t)}function fi(){const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const Ke=[{themeId:"coffee-shop",difficulty:"easy"},{themeId:"bookstore",difficulty:"easy"},{themeId:"backyard",difficulty:"easy"},{themeId:"holiday-mall",difficulty:"easy"},{themeId:"restaurant",difficulty:"easy"},{themeId:"gym",difficulty:"easy"},{themeId:"office",difficulty:"easy"},{themeId:"garden-party",difficulty:"easy"},{themeId:"hospital",difficulty:"easy"},{themeId:"carnival",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"bookstore",difficulty:"medium"},{themeId:"backyard",difficulty:"medium"},{themeId:"holiday-mall",difficulty:"medium"},{themeId:"restaurant",difficulty:"medium"},{themeId:"gym",difficulty:"medium"},{themeId:"office",difficulty:"medium"},{themeId:"garden-party",difficulty:"medium"},{themeId:"hospital",difficulty:"medium"},{themeId:"carnival",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"bookstore",difficulty:"hard"},{themeId:"backyard",difficulty:"hard"},{themeId:"holiday-mall",difficulty:"hard"},{themeId:"restaurant",difficulty:"hard"},{themeId:"gym",difficulty:"hard"},{themeId:"office",difficulty:"hard"},{themeId:"garden-party",difficulty:"hard"},{themeId:"hospital",difficulty:"hard"},{themeId:"carnival",difficulty:"hard"}];function ui(e){const t=mi(e),a=new Date(e+"T12:00:00Z"),s=Math.floor((a.getTime()-new Date(a.getUTCFullYear(),0,0).getTime())/864e5),{themeId:i,difficulty:o}=Ke[s%Ke.length];return{seed:t,themeId:i,difficulty:o,dateStr:e}}function pi(){return ui(fi())}const bi=`
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
`;let Ge=!1;function yi(){if(Ge)return;const e=document.createElement("style");e.textContent=bi,document.head.appendChild(e),Ge=!0}function gi(){yi();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-home"),t.className="alibi-home";const a=document.createElement("div");a.className="alibi-home-eyebrow",a.textContent="— A Mystery Awaits —";const s=document.createElement("div");s.className="alibi-home-title",s.textContent="ALIBI";const i=document.createElement("div");i.className="alibi-home-subtitle",i.textContent=`Murder Mystery
Deduction`;const o=document.createElement("div");o.className="alibi-home-buttons",o.appendChild(me("btn-campaign","primary","📁 Campaign","12 escalating cases")),o.appendChild(me("btn-quickplay","secondary","🎲 Quick Play","Pick theme + difficulty")),o.appendChild(me("btn-daily","secondary","📅 Daily Case","Same worldwide · daily streak")),t.append(a,s,i,o),document.body.appendChild(t),t.querySelector('[data-testid="btn-quickplay"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=quickplay`}),t.querySelector('[data-testid="btn-campaign"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=campaign`}),t.querySelector('[data-testid="btn-daily"]').addEventListener("click",()=>{t.remove();const{seed:l,themeId:r,difficulty:b}=pi();window.location.href=`${window.location.pathname}?theme=${r}&difficulty=${b}&seed=${l}`})}function me(e,t,a,s){const i=document.createElement("button");i.setAttribute("data-testid",e),i.className=`alibi-home-btn ${t}`;const o=document.createElement("span");o.className="btn-title",o.textContent=a;const l=document.createElement("span");return l.className="btn-desc",l.textContent=s,i.append(o,l),i}const xi=`
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
`,tt={rookie:"🔍 Rookie",investigator:"🔎 Investigator",detective:"🕵 Detective",senior:"🕵️ Senior Detective",chief:"⭐ Chief Inspector"};let Ue=!1;function wi(){if(Ue)return;const e=document.createElement("style");e.textContent=xi,document.head.appendChild(e),Ue=!0}function Fi(e){const t=Math.floor(e/1e3),a=Math.floor(t/60),s=t%60;return`${a}:${s.toString().padStart(2,"0")}`}function vi(e){try{return Qe(e).name}catch{return e}}function ne(e,t){t.innerHTML="";const a=document.createElement("div");a.className="alibi-campaign-header";const s=document.createElement("button");s.className="alibi-campaign-back",s.textContent="← Home",s.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const i=document.createElement("h1");i.textContent="📁 Campaign";const o=document.createElement("div");o.className="alibi-campaign-rank",o.textContent=tt[e.rank]??e.rank,a.append(s,i,o);const l=document.createElement("div");l.className="alibi-case-grid",e.cases.forEach((r,b)=>{const p=r.status==="in_progress"||r.status==="solved",c=r.status==="solved",f=r.status==="locked",n=document.createElement("div");n.setAttribute("data-testid",`case-card-${b}`);let g="alibi-case-card";f&&(g+=" locked"),c&&(g+=" solved"),!f&&!c&&(g+=" unlocked"),n.className=g;const m=document.createElement("div");m.className="alibi-case-num",m.textContent=`Case ${b+1}`;const h=document.createElement("div");h.className="alibi-case-title",h.textContent=p?vi(r.themeId):"???";const y=document.createElement("div");y.className=`alibi-case-difficulty ${r.difficulty}`,y.textContent=r.difficulty.charAt(0).toUpperCase()+r.difficulty.slice(1);const u=document.createElement("div");if(u.setAttribute("data-testid",`case-status-${b}`),u.className=`alibi-case-status${f?" locked":""}`,u.textContent=c?"✅":f?"🔒":"📁",n.append(m,h,y,u),c&&r.solveTimeMs!=null){const d=document.createElement("div");d.className="alibi-case-time",d.textContent=`⏱ ${Fi(r.solveTimeMs)}`,n.appendChild(d)}f||n.addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?theme=${r.themeId}&difficulty=${r.difficulty}&seed=${r.seed}&campaignSlot=${e.slot}&campaignCase=${b}`}),l.appendChild(n)}),t.append(a,l)}function $i(e,t){t.innerHTML="";const a=document.createElement("div");a.className="alibi-campaign-header";const s=document.createElement("button");s.className="alibi-campaign-back",s.textContent="← Home",s.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const i=document.createElement("h1");i.textContent="📁 Campaign",a.append(s,i);const o=document.createElement("div");o.className="alibi-slot-picker";const l=document.createElement("h2");l.textContent="Choose Save Slot",o.appendChild(l),e.forEach((r,b)=>{const p=b+1,c=document.createElement("div");c.setAttribute("data-testid",`slot-card-${p}`),c.className=`alibi-slot-card${r?"":" empty"}`;const f=document.createElement("div");f.className="alibi-slot-info";const n=document.createElement("div");if(n.className="alibi-slot-label",n.textContent=`Save Slot ${p}`,f.appendChild(n),r){const m=document.createElement("div");m.className="alibi-slot-rank",m.textContent=tt[r.rank]??r.rank;const h=r.cases.filter(u=>u.status==="solved").length,y=document.createElement("div");y.className="alibi-slot-progress",y.textContent=`Case ${r.currentCase+1} of 12 · ${h} solved · ${new Date(r.startedAt).toLocaleDateString()}`,f.append(m,y)}else{const m=document.createElement("div");m.className="alibi-slot-rank",m.textContent="Empty",f.appendChild(m)}const g=document.createElement("div");g.className="alibi-slot-action",g.textContent=r?"Continue →":"New →",c.append(f,g),c.addEventListener("click",()=>{if(r)ne(r,t);else{const m=et(p);$e(m),ne(m,t)}}),o.appendChild(c)}),t.append(a,o)}function ki(){wi();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-campaign-board"),t.className="alibi-campaign-board",document.body.appendChild(t);const a=Z(1),s=Z(2),i=Z(3);if(a??s??i){const r=new URLSearchParams(location.search).get("campaignSlot");if(r){const b=parseInt(r,10),p=Z(b);if(p){ne(p,t);return}}$i([a,s,i],t)}else{const l=et(1);$e(l),ne(l,t)}}const Ci=`
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
`,Si={"coffee-shop":"☕",bookstore:"📚",backyard:"🌿","holiday-mall":"🎄",restaurant:"🍽",gym:"💪",office:"🏢","garden-party":"🌸",hospital:"🏥",carnival:"🎡"};let qe=!1;function Ti(){if(qe)return;const e=document.createElement("style");e.textContent=Ci,document.head.appendChild(e),qe=!0}function Ei(){Ti();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-theme-select"),t.className="alibi-theme-select";const a=document.createElement("div");a.className="alibi-theme-select-header";const s=document.createElement("button");s.className="alibi-theme-back",s.textContent="← Home",s.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const i=document.createElement("h1");i.textContent="🎲 Quick Play",a.append(s,i);let o="easy";const l=document.createElement("div");l.className="alibi-difficulty-row";const r={};for(const[n,g]of[["easy","Easy"],["medium","Medium"],["hard","Hard"]]){const m=document.createElement("button");m.setAttribute("data-testid",`difficulty-${n}`),m.className=`alibi-diff-btn ${n}${n==="easy"?" selected":""}`,m.textContent=g,m.addEventListener("click",()=>{o=n,Object.values(r).forEach(h=>h.classList.remove("selected")),m.classList.add("selected")}),r[n]=m,l.appendChild(m)}let b=null;const p=document.createElement("div");p.className="alibi-theme-grid";const c={};for(const n of fa()){if(n.id==="stub")continue;const g=document.createElement("div");g.setAttribute("data-testid",`theme-card-${n.id}`),g.className="alibi-theme-card";const m=document.createElement("div");m.className="alibi-theme-icon",m.textContent=Si[n.id]??"🔍";const h=document.createElement("div");h.textContent=n.name.replace(/^The /,""),g.append(m,h),g.addEventListener("click",()=>{b=n.id,Object.values(c).forEach(y=>y.classList.remove("selected")),g.classList.add("selected"),f.disabled=!1}),c[n.id]=g,p.appendChild(g)}const f=document.createElement("button");f.setAttribute("data-testid","btn-play"),f.className="alibi-play-btn",f.textContent="Play",f.disabled=!0,f.addEventListener("click",()=>{if(!b)return;const n=Math.floor(Math.random()*4294967295);t.remove(),window.location.href=`${window.location.pathname}?theme=${b}&difficulty=${o}&seed=${n}`}),t.append(a,l,p,f),document.body.appendChild(t)}const ae=new URLSearchParams(location.search);if(ae.has("theme")||ae.has("difficulty")||ae.has("seed"))si();else switch(ae.get("mode")){case"campaign":ki();break;case"quickplay":Ei();break;default:gi();break}

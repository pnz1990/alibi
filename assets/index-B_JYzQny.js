var gt=Object.defineProperty;var $t=(e,t,a)=>t in e?gt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var ge=(e,t,a)=>$t(e,typeof t!="symbol"?t+"":t,a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const xt=new Set(["F","C","S","B"]);function Z(e){return xt.has(e)}function oe(e){return e==="C"||e==="S"||e==="B"}function Me(e){const t=[];for(let a=0;a<e.width;a++)for(let r=0;r<e.height;r++)if(Z(e.tiles[r][a])){t.push(a);break}return t}function Ae(e){const t=[];for(let a=0;a<e.height;a++)for(let r=0;r<e.width;r++)if(Z(e.tiles[a][r])){t.push(a);break}return t}function D(e,t,a){for(const r of e.rooms)for(const[n,o]of r.cells)if(n===t&&o===a)return r.id;return null}function lt(e){const t=new Set,a=new Set;for(const r of e)t.add(r.y),a.add(r.x);return{blockedRows:t,blockedCols:a}}function ct(e,t){const{blockedRows:a,blockedCols:r}=lt(t),n=[];for(let o=0;o<e.height;o++)if(!a.has(o))for(let s=0;s<e.width;s++)r.has(s)||Z(e.tiles[o][s])&&n.push({x:s,y:o});return n.length===1?n[0]:null}function Ft(e,t,a){const r=D(e,a.x,a.y);if(r===null)return null;for(const n of t)if(D(e,n.x,n.y)===r)return n.suspectId;return null}function Ve(e,t,a,r){return Math.max(Math.abs(e-a),Math.abs(t-r))}function Ee(e,t,a){const r=a.get(t.suspectId);if(!r)return null;switch(t.type){case"inRoom":return D(e,r.x,r.y)===t.roomId;case"notInRoom":return D(e,r.x,r.y)!==t.roomId;case"inSameRoom":{const n=a.get(t.otherSuspectId);if(!n)return null;const o=D(e,r.x,r.y),s=D(e,n.x,n.y);return o!==null&&o===s}case"inDifferentRoom":{const n=a.get(t.otherSuspectId);if(!n)return null;const o=D(e,r.x,r.y),s=D(e,n.x,n.y);return o===null||s===null?null:o!==s}case"inColumn":return r.x===t.col;case"inRow":return r.y===t.row;case"besideSuspect":{const n=a.get(t.otherSuspectId);return n?Ve(r.x,r.y,n.x,n.y)<=1:null}case"notBesideSuspect":{const n=a.get(t.otherSuspectId);return n?Ve(r.x,r.y,n.x,n.y)>1:null}case"besideObject":{for(let n=-1;n<=1;n++)for(let o=-1;o<=1;o++){if(o===0&&n===0)continue;const s=r.x+o,c=r.y+n;if(!(s<0||c<0||s>=e.width||c>=e.height)&&e.tiles[c][s]===t.objectTile)return!0}return!1}case"notBesideObject":{for(let n=-1;n<=1;n++)for(let o=-1;o<=1;o++){if(o===0&&n===0)continue;const s=r.x+o,c=r.y+n;if(!(s<0||c<0||s>=e.width||c>=e.height)&&e.tiles[c][s]===t.objectTile)return!1}return!0}case"onSeatTile":return oe(e.tiles[r.y][r.x]);case"notOnSeatTile":return!oe(e.tiles[r.y][r.x]);case"northOf":{const n=a.get(t.otherSuspectId);return n?r.y<n.y:null}case"southOf":{const n=a.get(t.otherSuspectId);return n?r.y>n.y:null}case"exactlyNRowsNorth":{const n=a.get(t.otherSuspectId);return n?n.y-r.y===t.n:null}case"exactlyNRowsSouth":{const n=a.get(t.otherSuspectId);return n?r.y-n.y===t.n:null}}}const vt={easy:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom"],medium:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile"],hard:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile","notOnSeatTile","northOf","southOf","exactlyNRowsNorth","exactlyNRowsSouth"]};function $e(e,t,a){const r=Me(e),n=Ae(e);if(t.length===0)return{count:0};if(t.length>Math.min(r.length,n.length))return{count:0};const o=new Set;for(let i=0;i<e.height;i++)for(let w=0;w<e.width;w++)Z(e.tiles[i][w])&&o.add(`${w},${i}`);let s=0,c;const p=new Map,g=new Set,u=new Set;function d(i){if(s>=2)return;if(i===t.length){for(const m of a)if(Ee(e,m,p)!==!0)return;s++,s===1&&(c=new Map(p));return}const w=t[i];for(const m of n)if(!g.has(m))for(const h of r){if(u.has(h)||!o.has(`${h},${m}`))continue;const b={suspectId:w,x:h,y:m};p.set(w,b),g.add(m),u.add(h);let f=!1;for(const $ of a)if(($.suspectId===w||$.otherSuspectId===w)&&Ee(e,$,p)===!1){f=!0;break}if(f||d(i+1),p.delete(w),g.delete(m),u.delete(h),s>=2)return}}return d(0),{count:s,firstSolution:c}}class kt extends Error{constructor(t){super(t),this.name="PuzzleGenerationError"}}function Ct(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let a=Math.imul(t^t>>>15,1|t);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}function dt(e,t){return Math.floor(e()*t)}function j(e,t){return t[dt(e,t.length)]}function ne(e,t){const a=[...t];for(let r=a.length-1;r>0;r--){const n=dt(e,r+1);[a[r],a[n]]=[a[n],a[r]]}return a}function St(e,t){return Math.max(2,e-{easy:0,medium:1,hard:2}[t])}function Tt(e,t,a,r){const n=St(t,a),o=vt[a],s=r.landmarks.length>=2,c=r.tiles.some(d=>d.some(i=>oe(i))),p=o.filter(d=>!((d==="besideObject"||d==="notBesideObject")&&!s||(d==="onSeatTile"||d==="notOnSeatTile")&&!c)),g=Math.ceil(n*.4),u=[];for(let d=0;d<n;d++){const i=new Set;u.length>0&&i.add(u[u.length-1]);for(const f of p)u.filter(y=>y===f).length>=g&&i.add(f);const w=p.filter(f=>!i.has(f)),m=w.length>0?w:p,h=m.filter(f=>!u.includes(f)),b=h.length>0?h:m;u.push(j(e,b))}return u}function X(e,t,a,r,n,o,s){const c=s.get(n.id),p=a.clueTemplates;switch(r){case"inRoom":{const g=D(t,c.x,c.y);if(!g)return null;const u=t.rooms.find(d=>d.id===g);return{type:"inRoom",suspectId:n.id,roomId:g,text:p.inRoom(n.name,u.name)}}case"notInRoom":{const g=D(t,c.x,c.y),u=t.rooms.filter(i=>i.id!==g);if(u.length===0)return null;const d=j(e,u);return{type:"notInRoom",suspectId:n.id,roomId:d.id,text:p.notInRoom(n.name,d.name)}}case"inSameRoom":{const g=D(t,c.x,c.y);if(!g)return null;const u=o.filter(i=>{if(i.id===n.id)return!1;const w=s.get(i.id);return D(t,w.x,w.y)===g});if(u.length===0)return null;const d=j(e,u);return{type:"inSameRoom",suspectId:n.id,otherSuspectId:d.id,text:p.inSameRoom(n.name,d.name)}}case"inDifferentRoom":{const g=D(t,c.x,c.y),u=o.filter(i=>{if(i.id===n.id)return!1;const w=s.get(i.id),m=D(t,w.x,w.y);return m!==null&&m!==g});if(u.length===0)return null;const d=j(e,u);return{type:"inDifferentRoom",suspectId:n.id,otherSuspectId:d.id,text:p.inDifferentRoom(n.name,d.name)}}case"inColumn":return{type:"inColumn",suspectId:n.id,col:c.x,text:p.inColumn(n.name,c.x+1)};case"inRow":return{type:"inRow",suspectId:n.id,row:c.y,text:p.inRow(n.name,c.y+1)};case"besideSuspect":{const g=o.filter(d=>{if(d.id===n.id)return!1;const i=s.get(d.id);return Math.max(Math.abs(c.x-i.x),Math.abs(c.y-i.y))<=1});if(g.length===0)return null;const u=j(e,g);return{type:"besideSuspect",suspectId:n.id,otherSuspectId:u.id,text:p.besideSuspect(n.name,u.name)}}case"notBesideSuspect":{const g=o.filter(d=>{if(d.id===n.id)return!1;const i=s.get(d.id);return Math.max(Math.abs(c.x-i.x),Math.abs(c.y-i.y))>1});if(g.length===0)return null;const u=j(e,g);return{type:"notBesideSuspect",suspectId:n.id,otherSuspectId:u.id,text:p.notBesideSuspect(n.name,u.name)}}case"besideObject":{if(t.landmarks.length===0)return null;const g=t.landmarks.filter(i=>Math.max(Math.abs(c.x-i.x),Math.abs(c.y-i.y))<=1);if(g.length===0)return null;const u=j(e,g),d=t.tiles[u.y][u.x];return{type:"besideObject",suspectId:n.id,objectTile:d,text:p.besideObject(n.name,u.name)}}case"notBesideObject":{if(t.landmarks.length===0)return null;const g=t.landmarks.filter(i=>Math.max(Math.abs(c.x-i.x),Math.abs(c.y-i.y))>1);if(g.length===0)return null;const u=j(e,g),d=t.tiles[u.y][u.x];return{type:"notBesideObject",suspectId:n.id,objectTile:d,text:p.notBesideObject(n.name,u.name)}}case"onSeatTile":{const g=t.tiles[c.y][c.x];if(!oe(g))return null;const u=g==="C"?"chair":g==="S"?"sofa":"bed";return{type:"onSeatTile",suspectId:n.id,text:p.onSeatTile(n.name,u)}}case"notOnSeatTile":{const g=t.tiles[c.y][c.x];return oe(g)?null:{type:"notOnSeatTile",suspectId:n.id,text:p.notOnSeatTile(n.name)}}case"northOf":{const g=o.filter(d=>{if(d.id===n.id)return!1;const i=s.get(d.id);return c.y<i.y});if(g.length===0)return null;const u=j(e,g);return{type:"northOf",suspectId:n.id,otherSuspectId:u.id,text:p.northOf(n.name,u.name)}}case"southOf":{const g=o.filter(d=>{if(d.id===n.id)return!1;const i=s.get(d.id);return c.y>i.y});if(g.length===0)return null;const u=j(e,g);return{type:"southOf",suspectId:n.id,otherSuspectId:u.id,text:p.southOf(n.name,u.name)}}case"exactlyNRowsNorth":{const g=[];for(const d of o){if(d.id===n.id)continue;const w=s.get(d.id).y-c.y;w>0&&g.push({suspect:d,n:w})}if(g.length===0)return null;const u=j(e,g);return{type:"exactlyNRowsNorth",suspectId:n.id,otherSuspectId:u.suspect.id,n:u.n,text:p.exactlyNRowsNorth(n.name,u.suspect.name,u.n)}}case"exactlyNRowsSouth":{const g=[];for(const d of o){if(d.id===n.id)continue;const i=s.get(d.id),w=c.y-i.y;w>0&&g.push({suspect:d,n:w})}if(g.length===0)return null;const u=j(e,g);return{type:"exactlyNRowsSouth",suspectId:n.id,otherSuspectId:u.suspect.id,n:u.n,text:p.exactlyNRowsSouth(n.name,u.suspect.name,u.n)}}}}function Et(e,t,a,r=1e3){const n=ne(e,Me(t)),o=ne(e,Ae(t)),s=a.length;if(s<1||s>Math.min(n.length,o.length))return null;let c=0;const p=new Map,g=new Set,u=new Set,d=ne(e,o).slice(0,s);function i(w){if(w===s)return!0;const m=a[w],h=d[w],b=ne(e,n);for(const f of b)if(!u.has(f)&&Z(t.tiles[h]?.[f])){if(p.set(m.id,{suspectId:m.id,x:f,y:h}),g.add(h),u.add(f),i(w+1))return!0;if(c++,p.delete(m.id),g.delete(h),u.delete(f),c>=r)return!1}return!1}return i(0)?p:null}function Rt(e,t,a){for(let n=0;n<20;n++){const o=e+n*97>>>0,s=Ct(o),c=t.floorPlans[a],p=Me(c),g=Ae(c),u=Math.min(p.length,g.length)-1;if(u<2)continue;const i=t.suspectNames.slice(0,u).map((N,L)=>({id:`s${L}`,name:N})),w=j(s,t.victimNames),m=Et(s,c,i);if(!m)continue;const h=Array.from(m.values()),b=ct(c,h);if(!b)continue;const f=Ft(c,h,b);if(!f)continue;const $=i.find(N=>N.id===f),y=j(s,t.narrativeTemplates.intro),F=j(s,t.narrativeTemplates.victimFound),x=j(s,t.narrativeTemplates.guiltyText).replace("{{killerName}}",$.name).replace("{{evidenceText}}","the evidence is conclusive"),E=Tt(s,u,a,c),B=E.length,T=[],U=ne(s,[...i]);for(let N=0;N<B;N++){const L=U[N],P=E[N];let M=X(s,c,t,P,L,i,m);M||(M=X(s,c,t,"inRow",L,i,m)),M||(M=X(s,c,t,"inColumn",L,i,m)),M&&T.push(M)}let O=$e(c,i.map(N=>N.id),T);if(O.count!==0){if(O.count!==1)for(const N of i){if(O.count===1)break;if(T.some(P=>P.type==="inRow"&&P.suspectId===N.id))continue;const L=X(s,c,t,"inRow",N,i,m);L&&T.push(L),O=$e(c,i.map(P=>P.id),T)}if(O.count!==1){const N=i.filter(P=>!T.some(M=>M.type==="inRow"&&M.suspectId===P.id)),L=i.filter(P=>T.some(M=>M.type==="inRow"&&M.suspectId===P.id));for(const P of[...N,...L]){if(O.count===1)break;if(T.some(H=>H.type==="inColumn"&&H.suspectId===P.id))continue;const M=X(s,c,t,"inColumn",P,i,m);M&&T.push(M),O=$e(c,i.map(H=>H.id),T)}}if(O.count===1)return{seed:o,themeId:t.id,difficulty:a,suspects:i,victimName:w,clues:T,solution:m,victimCell:b,killer:$,narrativeIntro:y,narrativeVictimFound:F,narrativeGuilty:x,floorPlan:c}}}throw new kt(`Failed to generate unique puzzle after 20 retries (seed=${e}, theme=${t.id}, difficulty=${a})`)}function l(e,t){let a=0;for(let r=0;r<t.length;r++)a=Math.imul(31,a)+t.charCodeAt(r)|0;return e[Math.abs(a)%e.length]}const Nt={width:5,height:6,tiles:[["bB","bB","bB","W","W"],["F","F","F","C","F"],["pL","F","C","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"],["W","cR","W","F","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[3,1],[4,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"restroom",name:"Restroom",cells:[[1,5],[3,5],[4,5]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-entrance",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},Wt={width:6,height:7,tiles:[["bB","bB","bB","bB","W","W"],["F","F","F","F","C","F"],["pL","F","C","F","F","F"],["F","S","F","pL","F","C"],["F","F","tB","F","F","F"],["C","F","F","F","W","F"],["W","cR","W","W","W","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5]]},{id:"restroom",name:"Restroom",cells:[[1,6],[5,5],[5,6]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-door",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:3,y:3},{id:"table",name:"the table",x:2,y:4},{id:"cash-register",name:"the cash register",x:1,y:6}]},It={width:7,height:8,tiles:[["bB","bB","bB","bB","bB","W","W"],["F","F","F","F","F","C","F"],["F","C","F","pL","F","F","F"],["pL","F","S","F","C","F","pL"],["F","F","F","tB","F","F","F"],["F","C","F","F","F","tB","C"],["F","F","F","F","F","W","F"],["W","cR","W","F","C","W","F"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]]},{id:"main-area",name:"Main Area",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[6,6]]},{id:"restroom",name:"Restroom",cells:[[1,7]]},{id:"back-office",name:"Back Office",cells:[[3,7],[4,7],[6,7]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-1",name:"the plant",x:3,y:2},{id:"plant-2",name:"the plant",x:0,y:3},{id:"plant-3",name:"the plant",x:6,y:3},{id:"table",name:"the table",x:3,y:4},{id:"table-2",name:"the small table",x:5,y:5},{id:"cash-register",name:"the cash register",x:1,y:7}]},Mt={width:5,height:5,tiles:[["sH","F","W","sH","sH"],["F","F","W","F","F"],["sH","F","tB","F","sH"],["F","F","F","F","F"],["F","cR","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[2,3]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,3],[4,3]]},{id:"checkout",name:"Checkout",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:3,y:0},{id:"shelf-3",name:"the shelf",x:4,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:4,y:2},{id:"table",name:"the table",x:2,y:2},{id:"cash-register",name:"the cash register",x:1,y:4}]},At={width:6,height:6,tiles:[["sH","F","W","W","sH","sH"],["F","F","W","F","F","F"],["sH","F","F","F","F","sH"],["F","F","W","F","tB","F"],["F","F","F","F","F","F"],["F","cR","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,2],[3,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,1],[4,1],[5,1],[3,2],[4,2],[5,2],[4,3],[5,3]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,4],[4,4],[5,4]]},{id:"checkout",name:"Checkout",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:4,y:0},{id:"shelf-3",name:"the shelf",x:5,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:5,y:2},{id:"table",name:"the table",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},Pt={width:7,height:7,tiles:[["sH","F","F","W","sH","sH","sH"],["F","F","sH","W","F","F","F"],["sH","F","F","tB","F","F","sH"],["F","F","W","W","F","tB","F"],["sH","F","F","F","F","F","F"],["F","F","F","F","F","F","sH"],["F","cR","C","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,1],[3,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"romance-novels",name:"Romance Novels",cells:[[4,3],[5,3],[6,3],[3,4],[4,4],[5,4],[6,4],[3,5],[4,5],[5,5]]},{id:"collectors",name:"Collector's Corner",cells:[[6,5]]},{id:"checkout",name:"Checkout",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"shelf-crime",name:"the shelf",x:0,y:0},{id:"shelf-nonfic-1",name:"the shelf",x:4,y:0},{id:"shelf-nonfic-2",name:"the shelf",x:5,y:0},{id:"shelf-nonfic-3",name:"the shelf",x:6,y:0},{id:"shelf-crime-2",name:"the shelf",x:0,y:2},{id:"shelf-nonfic-4",name:"the shelf",x:6,y:2},{id:"table-1",name:"the reading table",x:3,y:2},{id:"table-2",name:"the table",x:5,y:3},{id:"shelf-best",name:"the shelf",x:0,y:4},{id:"shelf-collect",name:"the shelf",x:6,y:5},{id:"cash-register",name:"the cash register",x:1,y:6}]},Bt={width:5,height:5,tiles:[["pL","F","W","jZ","jZ"],["F","F","W","jZ","C"],["pL","F","F","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[3,0],[4,0],[3,1],[4,1]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:0,y:2},{id:"plant-3",name:"the plant",x:4,y:3},{id:"jacuzzi",name:"the jacuzzi",x:3,y:0}]},Ot={width:6,height:7,tiles:[["pL","F","F","W","jZ","jZ"],["F","F","F","W","jZ","C"],["F","pL","F","F","F","F"],["W","W","W","W","W","W"],["B","F","F","S","F","F"],["F","F","tV","F","F","F"],["F","F","W","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[4,0],[5,0],[4,1],[5,1]]},{id:"deck",name:"Deck",cells:[[3,2],[4,2],[5,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:1,y:2},{id:"jacuzzi",name:"the jacuzzi",x:4,y:0},{id:"tv",name:"the TV",x:2,y:5}]},jt={width:7,height:8,tiles:[["pL","F","F","F","W","jZ","jZ"],["F","F","pL","F","W","jZ","C"],["F","F","F","F","F","C","F"],["W","W","W","W","W","W","W"],["B","F","F","S","F","F","W"],["F","F","tV","F","F","pL","W"],["W","W","W","cT","F","F","W"],["W","W","F","F","F","W","W"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[5,0],[6,0],[5,1],[6,1]]},{id:"deck",name:"Deck",cells:[[4,2],[5,2],[6,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5]]},{id:"kitchen",name:"Kitchen",cells:[[3,6],[4,6],[5,6],[2,7],[3,7],[4,7]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:2,y:1},{id:"plant-3",name:"the plant",x:5,y:5},{id:"jacuzzi",name:"the jacuzzi",x:5,y:0},{id:"tv",name:"the TV",x:2,y:5},{id:"counter",name:"the counter",x:3,y:6}]},Lt={width:5,height:6,tiles:[["sT","F","F","F","sT"],["F","F","W","F","F"],["F","F","F","F","F"],["tD","F","F","F","sH"],["F","C","F","F","F"],["F","F","W","cR","F"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1]]},{id:"santas-village",name:"Santa's Village",cells:[[2,0],[3,0],[3,1],[0,3],[1,3],[2,3],[0,4],[1,4],[2,4]]},{id:"toy-store",name:"Toy Store",cells:[[4,0],[4,1]]},{id:"walkway",name:"Walkway",cells:[[0,2],[1,2],[2,2],[3,2],[4,2]]},{id:"bookstore",name:"Bookstore",cells:[[3,3],[4,3],[3,4],[4,4]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[0,5],[1,5],[3,5],[4,5]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:4,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:3},{id:"shelf",name:"the shelf",x:4,y:3},{id:"cash-register",name:"the cash register",x:3,y:5}]},zt={width:7,height:7,tiles:[["sT","F","F","W","F","F","sT"],["F","F","W","F","F","F","F"],["F","F","F","F","F","W","F"],["F","F","F","F","F","F","F"],["tD","F","F","W","F","sH","F"],["F","C","F","W","F","F","C"],["F","F","W","F","cR","F","F"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"santas-village",name:"Santa's Village",cells:[[3,1],[4,1],[5,1],[6,1],[3,2],[4,2],[5,2]]},{id:"santas-lodge",name:"Santa's Lodge",cells:[[4,0],[5,0],[6,0]]},{id:"toy-store",name:"Toy Store",cells:[[6,2],[5,3],[6,3],[4,4],[5,4],[6,4],[5,5],[6,5]]},{id:"walkway",name:"Walkway",cells:[[0,3],[1,3],[2,3],[3,3],[4,3]]},{id:"food-court",name:"Food Court",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[0,6],[1,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:6,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:4},{id:"shelf",name:"the shelf",x:5,y:4},{id:"cash-register",name:"the cash register",x:4,y:6}]},Dt={width:8,height:8,tiles:[["sT","F","F","W","F","F","F","sT"],["F","F","W","F","F","F","F","F"],["F","F","F","F","F","W","F","F"],["F","F","F","F","F","F","F","F"],["tD","F","F","W","F","sH","F","F"],["F","C","F","W","F","F","C","F"],["F","F","W","F","cR","F","F","F"],["F","F","F","F","F","F","F","tR"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[0,3],[1,3]]},{id:"santas-lodge",name:"Santa's Lodge",cells:[[4,0],[5,0],[6,0],[7,0],[4,1],[5,1],[6,1],[7,1]]},{id:"santas-village",name:"Santa's Village",cells:[[3,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]]},{id:"toy-store",name:"Toy Store",cells:[[6,2],[7,2],[6,3],[7,3],[6,4],[7,4],[6,5],[7,5]]},{id:"walkway",name:"Walkway",cells:[[2,2],[2,3],[2,4],[3,4],[4,4],[2,5],[2,6]]},{id:"food-court",name:"Food Court",cells:[[0,4],[1,4],[0,5],[1,5],[0,6],[1,6],[0,7],[1,7],[2,7]]},{id:"bookstore",name:"Bookstore",cells:[[5,4],[5,5],[4,6],[5,6],[6,6],[7,6]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[3,6],[3,7],[4,7],[5,7],[6,7],[7,7]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:7,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:4},{id:"shelf",name:"the shelf",x:5,y:4},{id:"cash-register",name:"the cash register",x:4,y:6},{id:"tree",name:"the Christmas tree",x:7,y:7}]},Ht={width:5,height:5,tiles:[["cT","cT","W","F","C"],["F","F","W","F","F"],["F","C","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"dining-room",name:"Dining Room",cells:[[3,0],[4,0],[3,1],[4,1],[2,2],[3,2],[4,2]]},{id:"bar",name:"Bar",cells:[[2,1]]},{id:"restroom",name:"Restroom",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0}]},Vt={width:6,height:6,tiles:[["cT","cT","cT","W","F","C"],["F","F","F","W","F","F"],["F","C","F","F","F","F"],["F","F","F","F","C","F"],["W","W","W","W","W","W"],["F","F","F","C","F","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},{id:"dining-room",name:"Dining Room",cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]]},{id:"bar",name:"Bar",cells:[[3,1]]},{id:"private-room",name:"Private Room",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0},{id:"counter-3",name:"the counter",x:2,y:0}]},_t={width:7,height:7,tiles:[["cT","cT","cT","cT","W","F","C"],["F","F","F","F","W","F","F"],["F","C","F","F","F","F","F"],["F","F","F","F","C","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","C","F","F","C","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"dining-room",name:"Dining Room",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3],[4,4],[5,4],[6,4]]},{id:"bar",name:"Bar",cells:[[4,1],[0,4],[1,4],[2,4],[3,4]]},{id:"restroom",name:"Restroom",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0},{id:"counter-3",name:"the counter",x:2,y:0},{id:"counter-4",name:"the counter",x:3,y:0}]},Yt={width:5,height:5,tiles:[["wT","F","W","tM","tM"],["F","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"cardio",name:"Cardio",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"weight-rack",name:"the weight rack",x:0,y:0},{id:"treadmill-1",name:"the treadmill",x:3,y:0},{id:"treadmill-2",name:"the treadmill",x:4,y:0}]},Ut={width:6,height:7,tiles:[["wT","F","W","tM","tM","F"],["F","F","W","F","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","jZ","jZ"],["F","C","F","F","jZ","C"],["F","F","W","F","F","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"cardio",name:"Cardio",cells:[[3,0],[4,0],[5,0],[3,1],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"pool",name:"Pool",cells:[[4,4],[5,4],[4,5],[5,5]]},{id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[0,5],[1,5],[2,5],[3,5]]},{id:"sauna",name:"Sauna",cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]}],landmarks:[{id:"weight-rack",name:"the weight rack",x:0,y:0},{id:"treadmill-1",name:"the treadmill",x:3,y:0},{id:"treadmill-2",name:"the treadmill",x:4,y:0},{id:"pool",name:"the pool",x:4,y:4}]},Gt={width:7,height:8,tiles:[["wT","wT","F","W","tM","tM","F"],["F","F","F","W","F","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","jZ","jZ","jZ"],["F","C","F","F","jZ","C","jZ"],["F","F","W","F","F","F","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},{id:"cardio",name:"Cardio",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"studio",name:"Studio",cells:[[3,2],[3,3]]},{id:"pool",name:"Pool",cells:[[4,5],[5,5],[6,5],[4,6],[5,6],[6,6]]},{id:"locker-room",name:"Locker Room",cells:[[0,5],[1,5],[2,5],[3,5],[0,6],[1,6],[2,6],[3,6]]},{id:"sauna",name:"Sauna",cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"weight-rack-1",name:"the weight rack",x:0,y:0},{id:"weight-rack-2",name:"the weight rack",x:1,y:0},{id:"treadmill-1",name:"the treadmill",x:4,y:0},{id:"treadmill-2",name:"the treadmill",x:5,y:0},{id:"pool",name:"the pool",x:4,y:5}]},Kt={width:5,height:5,tiles:[["dK","F","W","F","C"],["F","F","W","F","F"],["F","C","F","F","F"],["W","W","W","W","W"],["F","F","pC","F","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"meeting-room",name:"Meeting Room",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"kitchen",name:"Kitchen",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"desk",name:"the desk",x:0,y:0},{id:"photocopier",name:"the photocopier",x:2,y:4}]},qt={width:6,height:6,tiles:[["dK","F","F","W","F","C"],["F","F","F","W","F","F"],["F","C","F","F","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","pC","F","F","C","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},{id:"meeting-room",name:"Meeting Room",cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"reception",name:"Reception",cells:[[3,1]]},{id:"kitchen",name:"Kitchen",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"desk",name:"the desk",x:0,y:0},{id:"photocopier",name:"the photocopier",x:1,y:5}]},Zt={width:7,height:7,tiles:[["dK","F","F","F","W","F","C"],["F","F","F","F","W","F","F"],["F","C","F","F","F","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","dK","F"],["W","W","W","W","W","W","W"],["F","pC","F","F","C","F","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3],[0,4],[1,4],[2,4],[3,4]]},{id:"meeting-room",name:"Meeting Room",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"server-room",name:"Server Room",cells:[[4,4],[5,4],[6,4]]},{id:"kitchen",name:"Kitchen",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"desk-1",name:"the desk",x:0,y:0},{id:"desk-2",name:"the manager's desk",x:5,y:4},{id:"photocopier",name:"the photocopier",x:1,y:6}]},Jt={width:5,height:5,tiles:[["fB","F","F","F","fB"],["F","F","F","F","F"],["pL","F","C","F","pL"],["F","F","F","F","F"],["F","F","fB","F","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[0,2],[1,2],[2,2],[3,2],[4,2]]},{id:"gazebo",name:"Gazebo",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:4,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:4,y:2},{id:"flower-bed-3",name:"the flower bed",x:2,y:4}]},Xt={width:6,height:6,tiles:[["fB","F","F","F","F","fB"],["F","F","F","F","F","F"],["pL","F","C","F","C","pL"],["F","F","F","F","F","F"],["F","F","jZ","jZ","F","F"],["F","F","jZ","jZ","fB","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]]},{id:"gazebo",name:"Gazebo",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},{id:"pool-area",name:"Pool Area",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:5,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:5,y:2},{id:"pool",name:"the pool",x:2,y:4},{id:"flower-bed-3",name:"the flower bed",x:4,y:5}]},Qt={width:7,height:8,tiles:[["fB","F","F","F","F","F","fB"],["F","F","F","F","F","F","F"],["pL","F","C","F","C","F","pL"],["F","F","F","F","F","F","F"],["F","F","jZ","jZ","jZ","F","F"],["F","F","jZ","jZ","jZ","fB","F"],["fB","F","F","W","F","F","fB"],["F","F","F","W","F","F","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3]]},{id:"pool-area",name:"Pool Area",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5]]},{id:"greenhouse",name:"Greenhouse",cells:[[0,6],[1,6],[2,6],[0,7],[1,7],[2,7]]},{id:"garage",name:"Garage",cells:[[4,6],[5,6],[6,6],[4,7],[5,7],[6,7]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:6,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:6,y:2},{id:"pool",name:"the pool",x:2,y:4},{id:"flower-bed-3",name:"the flower bed",x:5,y:5},{id:"flower-bed-4",name:"the flower bed",x:0,y:6},{id:"flower-bed-5",name:"the flower bed",x:6,y:6}]},ea={width:5,height:5,tiles:[["hB","F","W","F","C"],["hB","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","mC","F","C","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"waiting-room",name:"Waiting Room",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:1,y:4}]},ta={width:6,height:7,tiles:[["hB","F","F","W","F","C"],["hB","F","F","W","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","mC","F"],["F","C","F","F","F","F"],["F","F","W","F","C","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]]},{id:"operating-theatre",name:"Operating Theatre",cells:[[4,0],[5,0],[4,1],[5,1]]},{id:"waiting-room",name:"Waiting Room",cells:[[3,1]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]},{id:"cafeteria",name:"Cafeteria",cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:4,y:4}]},aa={width:7,height:8,tiles:[["hB","F","F","F","W","F","C"],["hB","hB","F","F","W","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","mC","F","F"],["F","C","F","F","F","F","C"],["F","F","W","F","C","F","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"operating-theatre",name:"Operating Theatre",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"waiting-room",name:"Waiting Room",cells:[[4,1]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]},{id:"cafeteria",name:"Cafeteria",cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"hospital-bed-3",name:"the hospital bed",x:1,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:4,y:5}]},na={width:5,height:5,tiles:[["cH","F","W","sT","sT"],["cH","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"food-stands",name:"Food Stands",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"ticket-booth",name:"Ticket Booth",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"stall-1",name:"the stall",x:3,y:0},{id:"stall-2",name:"the stall",x:4,y:0}]},ia={width:6,height:7,tiles:[["cH","F","F","W","sT","sT"],["cH","F","F","W","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","F","F"],["F","C","F","F","C","F"],["F","F","W","F","F","F"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,2]]},{id:"food-stands",name:"Food Stands",cells:[[4,0],[5,0],[4,1],[5,1],[4,2],[5,2]]},{id:"funhouse",name:"Funhouse",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},{id:"ticket-booth",name:"Ticket Booth",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"stall-1",name:"the stall",x:4,y:0},{id:"stall-2",name:"the stall",x:5,y:0}]},oa={width:7,height:8,tiles:[["cH","F","F","F","W","sT","sT"],["cH","cH","F","F","W","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","F","F","F"],["F","C","F","F","C","F","F"],["F","F","W","F","F","F","C"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"food-stands",name:"Food Stands",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"funhouse",name:"Funhouse",cells:[[0,5],[1,5],[2,5],[0,6],[1,6],[2,6],[0,7],[1,7]]},{id:"backstage",name:"Backstage",cells:[[3,5],[4,5],[5,5],[6,5],[3,6],[4,6],[5,6],[6,6],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"carousel-horse-3",name:"the carousel horse",x:1,y:1},{id:"stall-1",name:"the stall",x:5,y:0},{id:"stall-2",name:"the stall",x:6,y:0}]},C={"coffee-shop":{easy:Nt,medium:Wt,hard:It},bookstore:{easy:Mt,medium:At,hard:Pt},backyard:{easy:Bt,medium:Ot,hard:jt},"holiday-mall":{easy:Lt,medium:zt,hard:Dt},restaurant:{easy:Ht,medium:Vt,hard:_t},gym:{easy:Yt,medium:Ut,hard:Gt},office:{easy:Kt,medium:qt,hard:Zt},"garden-party":{easy:Jt,medium:Xt,hard:Qt},hospital:{easy:ea,medium:ta,hard:aa},carnival:{easy:na,medium:ia,hard:oa}};function re(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ra={inRoom:(e,t)=>l([`${e} was in the ${t}.`,`${e} was spotted in the ${t}.`,`Witnesses placed ${e} in the ${t}.`,`According to staff, ${e} was in the ${t}.`],e+t),notInRoom:(e,t)=>l([`${e} was not in the ${t}.`,`${e} was nowhere near the ${t}.`,`Staff confirmed ${e} was not in the ${t}.`,`${e} never entered the ${t}.`],e+t),inSameRoom:(e,t)=>l([`${e} was in the same area as ${t}.`,`${e} and ${t} were seen together.`,`A regular noticed ${e} near ${t}.`,`${e} shared a space with ${t}.`],e+t),inDifferentRoom:(e,t)=>l([`${e} and ${t} were in different parts of the café.`,`${e} was nowhere near ${t}.`,`${e} and ${t} were not in the same area.`,`${t} confirmed they weren't near ${e}.`],e+t),inColumn:(e,t)=>l([`${e} was in the ${re(t)} column.`,`${e} stood in column ${t}.`,`${e}'s position was the ${re(t)} column from the left.`],e+t),inRow:(e,t)=>l([`${e} was in the ${re(t)} row.`,`${e} sat in row ${t}.`,`${e}'s seat was on the ${re(t)} row.`],e+t),besideSuspect:(e,t)=>l([`${e} was standing next to ${t}.`,`${e} was right beside ${t}.`,`${e} and ${t} were adjacent.`,`A barista saw ${e} just one step from ${t}.`],e+t),notBesideSuspect:(e,t)=>l([`${e} was not beside ${t}.`,`${e} and ${t} kept their distance.`,`${e} was not close to ${t}.`,`${t} said ${e} was not nearby.`],e+t),besideObject:(e,t)=>l([`${e} was beside ${t}.`,`${e} was right next to ${t}.`,`${e} was seen just by ${t}.`,`The security feed shows ${e} near ${t}.`],e+t),notBesideObject:(e,t)=>l([`${e} was not beside ${t}.`,`${e} was nowhere near ${t}.`,`${e} was far from ${t}.`],e+t),onSeatTile:(e,t)=>t==="chair"?l([`${e} was sitting in a chair.`,`${e} had taken a seat.`,`${e} was seated at the time.`],e):t==="sofa"?l([`${e} was on the sofa.`,`${e} had settled onto the sofa.`,`${e} was lounging on the sofa.`],e):`${e} was on the ${t}.`,notOnSeatTile:e=>l([`${e} was not sitting down.`,`${e} was on their feet.`,`${e} remained standing.`,`${e} never took a seat.`],e),northOf:(e,t)=>l([`${e} was north of ${t}.`,`${e} was positioned above ${t} on the floor plan.`,`${e} was closer to the entrance than ${t}.`],e+t),southOf:(e,t)=>l([`${e} was south of ${t}.`,`${e} was further back than ${t}.`,`${e} was positioned below ${t} on the floor plan.`],e+t),exactlyNRowsNorth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} sat ${a} row${a>1?"s":""} ahead of ${t}.`,`There were exactly ${a} row${a>1?"s":""} between ${e} and ${t}, with ${e} to the north.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} sat ${a} row${a>1?"s":""} behind ${t}.`,`There were exactly ${a} row${a>1?"s":""} between ${e} and ${t}, with ${e} to the south.`],e+t+a)},sa={id:"coffee-shop",name:"The Coffee Shop",floorPlans:{easy:C["coffee-shop"].easy,medium:C["coffee-shop"].medium,hard:C["coffee-shop"].hard},suspectNames:["Alice","Ben","Chloe","Diego","Elena","Finlay","Grace","Hassan","Iris","Jake","Kai","Lena"],victimNames:["Victor","Violet","Vera","Valencia","Vance","Vivian"],clueTemplates:ra,narrativeTemplates:{intro:["A body has been found at the Copper Bean Café. The morning rush never arrived — instead, the regulars found yellow tape across the door. You pour yourself an espresso and get to work.","The Copper Bean Café is closed for a very different reason today. Someone is dead, and the witnesses are all still clutching their lattes. You take out your notebook.","It was supposed to be a quiet Tuesday at the Copper Bean. Then the screaming started. Now it's your problem. You order a black coffee and begin."],victimFound:["The victim was discovered near table four, cold cup of coffee still in hand.","Staff found the victim behind the counter during the morning prep.","A regular spotted the victim slumped in the corner booth before opening."],guiltyText:["{{killerName}} — served with a side of motive.","{{killerName}} — the evidence is as clear as an Americano.","{{killerName}} — there's no running from the detective on this one."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:plant":"","object:cash-register":"","object:table":""}};function se(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const la={inRoom:(e,t)=>l([`${e} was browsing in the ${t}.`,`${e} was found in the ${t} section.`,`The clerk placed ${e} in the ${t}.`,`${e} spent time in the ${t}.`],e+t),notInRoom:(e,t)=>l([`${e} was not in the ${t}.`,`${e} never set foot in the ${t} section.`,`The clerk confirmed ${e} wasn't in the ${t}.`,`${e} was nowhere near the ${t}.`],e+t),inSameRoom:(e,t)=>l([`${e} was in the same section as ${t}.`,`A customer spotted ${e} browsing alongside ${t}.`,`${e} and ${t} were seen in the same aisle.`],e+t),inDifferentRoom:(e,t)=>l([`${e} and ${t} were in different sections.`,`${e} was nowhere near ${t}'s section.`,`The clerk noted ${e} and ${t} were apart.`,`${e} and ${t} didn't share a section.`],e+t),inColumn:(e,t)=>l([`${e} was in the ${se(t)} column.`,`${e} stood in column ${t}.`,`${e}'s position was the ${se(t)} column from the left.`],e+t),inRow:(e,t)=>l([`${e} was in the ${se(t)} row.`,`${e} was browsing along row ${t}.`,`${e}'s position was on the ${se(t)} row.`],e+t),besideSuspect:(e,t)=>l([`${e} was standing right next to ${t}.`,`${e} was browsing just beside ${t}.`,`${e} and ${t} were in adjacent spots.`,`A witness saw ${e} shoulder-to-shoulder with ${t}.`],e+t),notBesideSuspect:(e,t)=>l([`${e} was not beside ${t}.`,`${e} and ${t} were not in the same aisle.`,`${e} kept well away from ${t}.`],e+t),besideObject:(e,t)=>l([`${e} was standing near ${t}.`,`${e} was right beside ${t}.`,`${e} was seen next to ${t}.`],e+t),notBesideObject:(e,t)=>l([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} kept away from ${t}.`],e+t),onSeatTile:(e,t)=>t==="chair"?l([`${e} was sitting in a reading chair.`,`${e} had settled into one of the chairs.`,`${e} was seated at the time.`],e):`${e} was sitting on the ${t}.`,notOnSeatTile:e=>l([`${e} was not sitting down.`,`${e} was browsing on their feet.`,`${e} remained standing.`],e),northOf:(e,t)=>l([`${e} was north of ${t}.`,`${e} was in the front section, closer to the door than ${t}.`,`${e} was ahead of ${t} in the store.`],e+t),southOf:(e,t)=>l([`${e} was south of ${t}.`,`${e} was in the back of the store, behind ${t}.`,`${e} was further from the entrance than ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} stood ${a} row${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} stood ${a} row${a>1?"s":""} behind ${t}.`],e+t+a)},ca={id:"bookstore",name:"The Bookstore",floorPlans:{easy:C.bookstore.easy,medium:C.bookstore.medium,hard:C.bookstore.hard},suspectNames:["Alex","Bridget","Colin","Diana","Edmund","Fiona","George","Hannah","Ivan","Julia","Kevin","Lydia"],victimNames:["Vincent","Valerie","Violet","Victor","Vera","Valencia"],clueTemplates:la,narrativeTemplates:{intro:["The First Chapter Bookshop opened this morning to find more than just dust between the shelves. Someone is dead, and the regulars are still clutching their Earl Grey. You step over the crime scene tape and start asking questions.","A reader never returns a book. This one never returned at all. The First Chapter Bookshop is closed indefinitely — and you're the reason it might reopen. Notebook out.","Mondays at the bookshop are quiet. This Monday is the quietest it's ever been. The body was found in the stacks before the first customer arrived. You're on the case."],victimFound:["The victim was discovered slumped against the shelf in the early morning.","A shop assistant found the victim face-down near the reading table.","The victim was found between the shelves before opening time."],guiltyText:["{{killerName}} — the ending nobody saw coming.","{{killerName}} — the plot twist is on the last page.","{{killerName}} — even mysteries have their answers."]},colorPalette:{floor:"#f0ead6",wall:"#3d2b1f",seat:"#7a5c3a",accent:"#8b1a1a",background:"#1a1510",text:"#ffffff"},spriteMap:{"object:shelf":"","object:table":"","object:cash-register":""}};function le(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const da={inRoom:(e,t)=>l([`${e} was in the ${t}.`,`${e} was spotted out in the ${t}.`,`A neighbor saw ${e} in the ${t}.`,`${e} was hanging around the ${t}.`],e+t),notInRoom:(e,t)=>l([`${e} was not in the ${t}.`,`${e} never went near the ${t}.`,`A guest confirmed ${e} wasn't in the ${t}.`],e+t),inSameRoom:(e,t)=>l([`${e} was in the same area as ${t}.`,`${e} and ${t} were seen hanging out together.`,`A neighbor spotted ${e} near ${t}.`,`${e} was keeping close to ${t}.`],e+t),inDifferentRoom:(e,t)=>l([`${e} and ${t} were in different parts of the yard.`,`${e} was nowhere near ${t}.`,`${e} and ${t} weren't in the same area.`,`${t} said they weren't near ${e} all afternoon.`],e+t),inColumn:(e,t)=>l([`${e} was in the ${le(t)} column.`,`${e} stood in column ${t}.`,`${e}'s spot was the ${le(t)} column over.`],e+t),inRow:(e,t)=>l([`${e} was in the ${le(t)} row.`,`${e} was along row ${t}.`,`${e}'s position was on the ${le(t)} row.`],e+t),besideSuspect:(e,t)=>l([`${e} was right next to ${t}.`,`${e} was standing just beside ${t}.`,`${e} and ${t} were right next to each other.`,`Someone saw ${e} an arm's length from ${t}.`],e+t),notBesideSuspect:(e,t)=>l([`${e} was not beside ${t}.`,`${e} and ${t} kept apart.`,`${e} was nowhere near ${t}.`],e+t),besideObject:(e,t)=>l([`${e} was beside ${t}.`,`${e} was seen next to ${t}.`,`${e} was hanging around ${t}.`],e+t),notBesideObject:(e,t)=>l([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} stayed well away from ${t}.`],e+t),onSeatTile:(e,t)=>l(t==="sofa"?[`${e} was on the outdoor sofa.`,`${e} had kicked back on the sofa.`,`${e} was lounging on the sofa.`]:t==="bed"?[`${e} was in the bedroom.`,`${e} had retreated inside to the bedroom.`]:[`${e} was sitting in a chair.`,`${e} had taken one of the lawn chairs.`],e),notOnSeatTile:e=>l([`${e} was not sitting down.`,`${e} was up and about.`,`${e} was on their feet the whole time.`,`${e} never took a seat.`],e),northOf:(e,t)=>l([`${e} was north of ${t}.`,`${e} was closer to the fence than ${t}.`,`${e} was in front of ${t} on the property.`],e+t),southOf:(e,t)=>l([`${e} was south of ${t}.`,`${e} was deeper in the yard than ${t}.`,`${e} was behind ${t} on the property.`],e+t),exactlyNRowsNorth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} step${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} step${a>1?"s":""} behind ${t}.`],e+t+a)},ha={id:"backyard",name:"The Backyard",floorPlans:{easy:C.backyard.easy,medium:C.backyard.medium,hard:C.backyard.hard},suspectNames:["Aaron","Becca","Chad","Donna","Eric","Fran","Greg","Helen","Ian","Jess","Kurt","Lisa"],victimNames:["Victor","Vanessa","Vince","Vera","Valentina","Virgil"],clueTemplates:da,narrativeTemplates:{intro:["The Hendersons were supposed to be hosting a barbecue. Instead, they're hosting a detective. Someone is dead in the backyard and the potato salad is getting warm. You flash your badge.","Summer parties end in hangovers, not homicides. Usually. The backyard of 14 Maple Drive is now a crime scene and you're the one who has to ruin everyone's weekend.","It was a perfect Sunday afternoon until it wasn't. The body was found near the jacuzzi before anyone noticed their drink had gone untouched. You arrive with your notepad."],victimFound:["The victim was found floating face-down near the jacuzzi.","A guest discovered the victim collapsed on the deck.","The victim was found on the grass between the patio chairs."],guiltyText:["{{killerName}} — summer is ruined.","{{killerName}} — the neighborhood will never be the same.","{{killerName}} — nobody escapes the backyard detective."]},colorPalette:{floor:"#d4e8c2",wall:"#5d4037",seat:"#8d6e63",accent:"#e64a19",background:"#1a200f",text:"#ffffff"},spriteMap:{"object:plant":"","object:jacuzzi-tile":"","object:tv":"","object:sofa":""}};function ce(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ma={inRoom:(e,t)=>l([`${e} was in the ${t}.`,`${e} was spotted in the ${t}.`,`Security cameras placed ${e} in the ${t}.`,`${e} spent time shopping in the ${t}.`],e+t),notInRoom:(e,t)=>l([`${e} was not in the ${t}.`,`${e} never entered the ${t}.`,`Security confirmed ${e} didn't visit the ${t}.`,`${e} was nowhere near the ${t}.`],e+t),inSameRoom:(e,t)=>l([`${e} was shopping in the same area as ${t}.`,`${e} and ${t} were seen near each other.`,`A store clerk spotted ${e} alongside ${t}.`,`${e} was browsing beside ${t}.`],e+t),inDifferentRoom:(e,t)=>l([`${e} and ${t} were in different parts of the mall.`,`${e} was nowhere near ${t}'s section.`,`${e} and ${t} didn't cross paths in the same store.`,`${t} confirmed they weren't near ${e}.`],e+t),inColumn:(e,t)=>l([`${e} was in the ${ce(t)} column.`,`${e} stood in column ${t}.`,`${e}'s position was the ${ce(t)} column.`],e+t),inRow:(e,t)=>l([`${e} was in the ${ce(t)} row.`,`${e} was along row ${t}.`,`${e}'s spot was on the ${ce(t)} row.`],e+t),besideSuspect:(e,t)=>l([`${e} was standing right next to ${t}.`,`${e} was just a step away from ${t}.`,`${e} and ${t} were side by side.`,`A shopper saw ${e} right beside ${t}.`],e+t),notBesideSuspect:(e,t)=>l([`${e} was not beside ${t}.`,`${e} and ${t} kept their distance.`,`${e} was not close to ${t}.`],e+t),besideObject:(e,t)=>l([`${e} was beside ${t}.`,`${e} was seen next to ${t}.`,`${e} was standing near ${t}.`],e+t),notBesideObject:(e,t)=>l([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} stayed away from ${t}.`],e+t),onSeatTile:(e,t)=>l([`${e} was sitting${t==="chair"?" in a chair":" on a "+t}.`,`${e} had taken a seat in the mall.`,`${e} was resting on a bench.`],e),notOnSeatTile:e=>l([`${e} was not sitting down.`,`${e} was on their feet.`,`${e} kept moving, never sat down.`],e),northOf:(e,t)=>l([`${e} was north of ${t}.`,`${e} was in the front section of the mall relative to ${t}.`,`${e} was closer to the main entrance than ${t}.`],e+t),southOf:(e,t)=>l([`${e} was south of ${t}.`,`${e} was deeper in the mall than ${t}.`,`${e} was further from the entrance than ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} section${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} section${a>1?"s":""} behind ${t}.`],e+t+a)},fa={id:"holiday-mall",name:"The Holiday Mall",floorPlans:{easy:C["holiday-mall"].easy,medium:C["holiday-mall"].medium,hard:C["holiday-mall"].hard},suspectNames:["Ashley","Brett","Cameron","Denise","Eli","Felicia","Grant","Holly","Irving","Jade","Kyle","Leighton"],victimNames:["Victor","Vivian","Vera","Valencia","Vince","Velma"],clueTemplates:ma,narrativeTemplates:{intro:["The North Pole Mall was supposed to close early for the holiday rush. Instead, it's closed indefinitely. The security cameras caught everything except whoever did this. You wade through the tinsel.","Christmas shopping season. The most wonderful time of year — unless you're the one who ends up under the tree with a chalk outline. You badge your way in through the entrance.","The last thing anyone expects on December 23rd is a murder at the mall. The second-to-last thing is the detective they send. Here you are anyway."],victimFound:["The victim was discovered near the gift-wrapping station before the mall opened.","Security found the victim in the walkway between the stalls.","A store manager found the victim near the Christmas tree display."],guiltyText:["{{killerName}} — some gifts aren't worth giving.","{{killerName}} — unwrapped at last.","{{killerName}} — the season's greetings end here."]},colorPalette:{floor:"#e8e0d0",wall:"#2c3e50",seat:"#7f8c8d",accent:"#c0392b",background:"#0d1117",text:"#ffffff"},spriteMap:{"object:stall":"","object:shelf":"","object:cash-register":"","object:tree":"","object:teddy-bear":""}};function de(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ua={inRoom:(e,t)=>l([`${e} was in the ${t}.`,`${e} was seen dining in the ${t}.`,`The maître d' placed ${e} in the ${t}.`,`${e} was observed in the ${t} that evening.`],e+t),notInRoom:(e,t)=>l([`${e} was not in the ${t}.`,`${e} never passed through the ${t}.`,`Staff confirmed ${e} wasn't in the ${t}.`,`${e} was nowhere near the ${t}.`],e+t),inSameRoom:(e,t)=>l([`${e} was dining in the same area as ${t}.`,`${e} and ${t} shared the same section of the restaurant.`,`A waiter saw ${e} near ${t}.`,`${e} was at the same table section as ${t}.`],e+t),inDifferentRoom:(e,t)=>l([`${e} and ${t} were in different parts of the restaurant.`,`${e} was not dining near ${t}.`,`The host confirmed ${e} and ${t} were seated apart.`,`${e} and ${t} never crossed paths that evening.`],e+t),inColumn:(e,t)=>l([`${e} was in the ${de(t)} column.`,`${e} was seated in column ${t}.`,`${e}'s table was in the ${de(t)} column.`],e+t),inRow:(e,t)=>l([`${e} was in the ${de(t)} row.`,`${e} was seated along row ${t}.`,`${e}'s table was on the ${de(t)} row.`],e+t),besideSuspect:(e,t)=>l([`${e} was seated right next to ${t}.`,`${e} and ${t} were at adjacent tables.`,`${e} was barely an arm's length from ${t}.`,`A server noted ${e} right beside ${t}.`],e+t),notBesideSuspect:(e,t)=>l([`${e} was not beside ${t}.`,`${e} and ${t} were not at adjacent tables.`,`${e} was seated well away from ${t}.`],e+t),besideObject:(e,t)=>l([`${e} was beside ${t}.`,`${e} was seated next to ${t}.`,`The floor plan shows ${e} right by ${t}.`],e+t),notBesideObject:(e,t)=>l([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e}'s seat was well away from ${t}.`],e+t),onSeatTile:(e,t)=>l(t==="sofa"?[`${e} was on the banquette seating.`,`${e} had taken the banquette.`,`${e} was settled into a banquette seat.`]:[`${e} was sitting at a table.`,`${e} was seated for the evening.`,`${e} had a chair at the table.`],e),notOnSeatTile:e=>l([`${e} was not seated.`,`${e} was standing at the time.`,`${e} had not yet been seated.`,`${e} was on their feet.`],e),northOf:(e,t)=>l([`${e} was north of ${t}.`,`${e} was closer to the entrance than ${t}.`,`${e} was seated in the front section relative to ${t}.`],e+t),southOf:(e,t)=>l([`${e} was south of ${t}.`,`${e} was at a table deeper in the restaurant than ${t}.`,`${e} was in the back section relative to ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} table-row${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} table-row${a>1?"s":""} behind ${t}.`],e+t+a)},pa={id:"restaurant",name:"The Restaurant",floorPlans:{easy:C.restaurant.easy,medium:C.restaurant.medium,hard:C.restaurant.hard},suspectNames:["Andre","Bianca","Carlo","Delphine","Emilio","Francoise","Gerard","Helena","Ignacio","Josephine","Kristoffer","Loretta"],victimNames:["Victor","Violette","Vincenzo","Vera","Valeria","Vidal"],clueTemplates:ua,narrativeTemplates:{intro:["La Maison Rouge was fully booked for a private function. It's now fully booked by the police. Someone didn't make it to dessert — and you're the unwanted amuse-bouche.","The head chef found the body before the morning prep. The restaurant is closed, the reservations are cancelled, and the chef is refusing to speak without a lawyer. You order espresso.","Five-star dining. One-star outcome. The Michelin inspector will not be pleased. Neither will whoever left the body in the private dining room."],victimFound:["The victim was found slumped in the private dining room.","Kitchen staff discovered the victim near the counter.","The sommelier found the victim in the dining room early in the morning."],guiltyText:["{{killerName}} — an amuse-bouche of justice.","{{killerName}} — the bill has arrived.","{{killerName}} — this dish is best served cold."]},colorPalette:{floor:"#f5e8d0",wall:"#3b1f1f",seat:"#8b1a1a",accent:"#c0392b",background:"#180a0a",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:counter":"","object:table":"","object:plant":""}};function he(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ba={inRoom:(e,t)=>l([`${e} was in the ${t}.`,`${e} was spotted training in the ${t}.`,`Staff placed ${e} in the ${t} zone.`,`${e} spent time working out in the ${t}.`],e+t),notInRoom:(e,t)=>l([`${e} was not in the ${t}.`,`${e} never used the ${t}.`,`The trainer confirmed ${e} wasn't in the ${t}.`,`${e} was nowhere near the ${t}.`],e+t),inSameRoom:(e,t)=>l([`${e} was training in the same zone as ${t}.`,`${e} and ${t} were spotted working out together.`,`The trainer saw ${e} near ${t}.`,`${e} and ${t} shared the same section of the gym.`],e+t),inDifferentRoom:(e,t)=>l([`${e} and ${t} were training in different zones.`,`${e} was nowhere near ${t}'s area.`,`${e} and ${t} never shared the same zone.`,`The trainer noted ${e} and ${t} were apart.`],e+t),inColumn:(e,t)=>l([`${e} was in the ${he(t)} column.`,`${e} was positioned in column ${t}.`,`${e}'s station was the ${he(t)} column.`],e+t),inRow:(e,t)=>l([`${e} was in the ${he(t)} row.`,`${e} trained along row ${t}.`,`${e}'s position was on the ${he(t)} row.`],e+t),besideSuspect:(e,t)=>l([`${e} was working out right next to ${t}.`,`${e} and ${t} were training side by side.`,`${e} was barely a step from ${t}.`,`A trainer noticed ${e} right beside ${t}.`],e+t),notBesideSuspect:(e,t)=>l([`${e} was not beside ${t}.`,`${e} and ${t} were not training next to each other.`,`${e} kept a distance from ${t}.`],e+t),besideObject:(e,t)=>l([`${e} was beside ${t}.`,`${e} was training right next to ${t}.`,`${e} was seen near ${t}.`],e+t),notBesideObject:(e,t)=>l([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} kept away from ${t}.`],e+t),onSeatTile:(e,t)=>l([`${e} was sitting on a bench.`,`${e} had taken a rest on a bench.`,`${e} was seated at the time.`],e),notOnSeatTile:e=>l([`${e} was not sitting down.`,`${e} was on their feet.`,`${e} was actively moving around.`,`${e} never sat down during the session.`],e),northOf:(e,t)=>l([`${e} was north of ${t}.`,`${e} was in the front section of the gym relative to ${t}.`,`${e} was closer to the entrance than ${t}.`],e+t),southOf:(e,t)=>l([`${e} was south of ${t}.`,`${e} was in the back section of the gym relative to ${t}.`,`${e} was further from the entrance than ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} station${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} station${a>1?"s":""} behind ${t}.`],e+t+a)},ya={id:"gym",name:"The Gym",floorPlans:{easy:C.gym.easy,medium:C.gym.medium,hard:C.gym.hard},suspectNames:["Atlas","Blair","Corey","Dakota","Evander","Fitz","Gabe","Hunter","Indira","Jordan","Knox","Leila"],victimNames:["Vance","Valentina","Viktor","Vera","Vito","Vesper"],clueTemplates:ba,narrativeTemplates:{intro:["FitLife Gym opens at 5am. This morning it opened to a body near the weight rack. The morning regulars are sweating for a different reason now.","Somebody skipped leg day — and left somebody else skipping all days. The body was found in the Weights area. You badge through the turnstile.","The gym is 24 hours. The victim wasn't. You arrive with your notepad and a distinct lack of enthusiasm for the treadmill."],victimFound:["The victim was found near the weight rack before the early shift.","A trainer discovered the victim collapsed in the cardio area.","The victim was found in the pool area during the morning check."],guiltyText:["{{killerName}} — no amount of cardio outpaces the truth.","{{killerName}} — their reps are done.","{{killerName}} — spotting the killer was the easy part."]},colorPalette:{floor:"#e8e0d8",wall:"#2c3e50",seat:"#7f8c8d",accent:"#e74c3c",background:"#0d1117",text:"#ffffff"},spriteMap:{"object:weight-rack":"","object:treadmill":"","object:counter":"","object:jacuzzi-tile":""}};function me(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const wa={inRoom:(e,t)=>l([`${e} was in the ${t}.`,`${e} was seen working in the ${t}.`,`Access logs confirm ${e} was in the ${t}.`,`${e} spent time in the ${t} that day.`],e+t),notInRoom:(e,t)=>l([`${e} was not in the ${t}.`,`${e} never entered the ${t}.`,`Access logs show ${e} was not in the ${t}.`,`Colleagues confirmed ${e} wasn't in the ${t}.`],e+t),inSameRoom:(e,t)=>l([`${e} was working in the same area as ${t}.`,`${e} and ${t} shared the same workspace.`,`A colleague saw ${e} near ${t}.`,`${e} was at the same section as ${t}.`],e+t),inDifferentRoom:(e,t)=>l([`${e} and ${t} were in different parts of the office.`,`${e} was not in the same area as ${t}.`,`The floor plan places ${e} and ${t} in separate zones.`,`${t} confirmed they weren't near ${e}.`],e+t),inColumn:(e,t)=>l([`${e} was in the ${me(t)} column.`,`${e}'s desk was in column ${t}.`,`${e} worked in the ${me(t)} column.`],e+t),inRow:(e,t)=>l([`${e} was in the ${me(t)} row.`,`${e}'s workstation was on row ${t}.`,`${e} was at the ${me(t)} row of desks.`],e+t),besideSuspect:(e,t)=>l([`${e} was working right next to ${t}.`,`${e}'s desk was adjacent to ${t}'s.`,`${e} and ${t} sat just one desk apart.`,`A colleague noticed ${e} right beside ${t}.`],e+t),notBesideSuspect:(e,t)=>l([`${e} was not beside ${t}.`,`${e} and ${t} were not at adjacent desks.`,`${e} was not close to ${t}'s workstation.`],e+t),besideObject:(e,t)=>l([`${e} was beside ${t}.`,`${e}'s desk was right next to ${t}.`,`${e} worked near ${t}.`],e+t),notBesideObject:(e,t)=>l([`${e} was not near ${t}.`,`${e}'s workspace was away from ${t}.`,`${e} was not beside ${t}.`],e+t),onSeatTile:(e,t)=>l([`${e} was sitting at their desk.`,`${e} was at their workstation at the time.`,`${e} was seated and working.`,`${e} had not left their desk.`],e),notOnSeatTile:e=>l([`${e} was not sitting down.`,`${e} was away from their desk.`,`${e} was standing or moving around.`,`${e} had left their workstation.`],e),northOf:(e,t)=>l([`${e} was north of ${t}.`,`${e}'s desk was closer to the entrance than ${t}'s.`,`${e} was in the front of the office relative to ${t}.`],e+t),southOf:(e,t)=>l([`${e} was south of ${t}.`,`${e}'s desk was deeper in the office than ${t}'s.`,`${e} was in the back section relative to ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e}'s desk was ${a} row${a>1?"s":""} ahead of ${t}'s.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e}'s desk was ${a} row${a>1?"s":""} behind ${t}'s.`],e+t+a)},ga={id:"office",name:"The Office",floorPlans:{easy:C.office.easy,medium:C.office.medium,hard:C.office.hard},suspectNames:["Adrian","Brooke","Clive","Daria","Edwin","Fiona","Graham","Harriet","Isaac","Judith","Kieran","Laura"],victimNames:["Vincent","Veronica","Vance","Vivienne","Victor","Velvet"],clueTemplates:wa,narrativeTemplates:{intro:["Meridian Corp. Floor 12. The quarterly review meeting has been cancelled for the most permanent possible reason. You badge in and start asking questions before the lawyers arrive.","The victim was found at their desk. The access log shows they never left last night. Whoever did this knew the building. You start with the people who knew it best.","It was supposed to be a normal Monday. Then the HR department filed the wrong kind of incident report. You turn off your phone's out-of-office message and get to work."],victimFound:["The victim was found at their desk during the morning security check.","The building manager found the victim in the Meeting Room after the overnight shift.","A colleague discovered the victim in the Server Room at 7am."],guiltyText:["{{killerName}} — the performance review was terminal.","{{killerName}} — this one won't go in the quarterly report.","{{killerName}} — consider this case closed."]},colorPalette:{floor:"#e8e8f0",wall:"#34495e",seat:"#7f8c8d",accent:"#2980b9",background:"#0a0a14",text:"#ffffff"},spriteMap:{"object:desk":"","object:photocopier":"","object:tv":"","object:plant":""}};function Q(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const $a={inRoom:(e,t)=>l([`${e} was in the ${t}.`,`${e} was seen mingling in the ${t}.`,`Other guests placed ${e} in the ${t}.`,`${e} spent the afternoon in the ${t}.`],e+t),notInRoom:(e,t)=>l([`${e} was not in the ${t}.`,`${e} never ventured to the ${t}.`,`Guests confirmed ${e} wasn't in the ${t}.`,`${e} was not seen in the ${t} all afternoon.`],e+t),inSameRoom:(e,t)=>l([`${e} was in the same area as ${t}.`,`${e} and ${t} were mingling in the same spot.`,`A guest saw ${e} near ${t}.`,`${e} and ${t} were together at the party.`],e+t),inDifferentRoom:(e,t)=>l([`${e} and ${t} were in different parts of the garden.`,`${e} was not near ${t} during the party.`,`Guests saw ${e} and ${t} in separate areas.`,`${t} mentioned they weren't near ${e}.`],e+t),inColumn:(e,t)=>l([`${e} was in the ${Q(t)} column.`,`${e} stood in column ${t} of the garden.`,`${e}'s position was the ${Q(t)} column from the edge.`],e+t),inRow:(e,t)=>l([`${e} was in the ${Q(t)} row.`,`${e} was along the ${Q(t)} row of the garden.`,`${e}'s spot was on the ${Q(t)} row.`],e+t),besideSuspect:(e,t)=>l([`${e} was standing right next to ${t}.`,`${e} and ${t} were chatting side by side.`,`A guest noticed ${e} just beside ${t}.`,`${e} and ${t} were barely a step apart.`],e+t),notBesideSuspect:(e,t)=>l([`${e} was not beside ${t}.`,`${e} and ${t} kept apart during the party.`,`${e} was not close to ${t}.`],e+t),besideObject:(e,t)=>l([`${e} was beside ${t}.`,`${e} was found near ${t}.`,`${e} was standing just by ${t}.`],e+t),notBesideObject:(e,t)=>l([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} was far from ${t}.`],e+t),onSeatTile:(e,t)=>l([`${e} was sitting on a garden chair.`,`${e} had taken one of the garden chairs.`,`${e} was seated outside.`,`${e} was in a chair at the time.`],e),notOnSeatTile:e=>l([`${e} was not sitting down.`,`${e} was up and circulating.`,`${e} was standing during the party.`,`${e} had not taken a seat.`],e),northOf:(e,t)=>l([`${e} was north of ${t}.`,`${e} was in the front section of the garden relative to ${t}.`,`${e} was closer to the gate than ${t}.`],e+t),southOf:(e,t)=>l([`${e} was south of ${t}.`,`${e} was deeper in the garden than ${t}.`,`${e} was further from the gate than ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} step${a>1?"s":""} ahead of ${t} in the garden.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} step${a>1?"s":""} behind ${t} in the garden.`],e+t+a)},xa={id:"garden-party",name:"The Garden Party",floorPlans:{easy:C["garden-party"].easy,medium:C["garden-party"].medium,hard:C["garden-party"].hard},suspectNames:["Arabella","Benedict","Cecily","Damien","Eleanor","Freddie","Georgina","Hugo","Imogen","Jasper","Kit","Lavinia"],victimNames:["Violet","Valentine","Verity","Viscount","Viola","Vaughn"],clueTemplates:$a,narrativeTemplates:{intro:["The Westerleigh garden party was the social event of summer. It is no longer a social event. The body was found beneath the roses and you've been asked — very politely — to investigate.","Champagne, strawberries, murder. The annual garden party at Fernwood House has taken a distinctly unfestive turn. You decline the cucumber sandwiches and start asking questions.","The gazebo was booked for afternoon tea. It is now a crime scene. You roll up your sleeves and walk across the manicured lawn."],victimFound:["The victim was found in the Greenhouse before the afternoon guests arrived.","A gardener discovered the victim on the Lawn near the flower beds.","The caterers found the victim in the Gazebo."],guiltyText:["{{killerName}} — the summer is wilted.","{{killerName}} — cut down in their prime.","{{killerName}} — this garden party is over."]},colorPalette:{floor:"#d4f0c0",wall:"#5d4037",seat:"#7cb342",accent:"#e91e63",background:"#0a1f0a",text:"#ffffff"},spriteMap:{"object:flower-bed":"","object:plant":""}};function fe(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Fa={inRoom:(e,t)=>l([`${e} was in the ${t}.`,`${e} was recorded in the ${t}.`,`Hospital logs confirm ${e} was in the ${t}.`,`${e} was present in the ${t} at the time.`],e+t),notInRoom:(e,t)=>l([`${e} was not in the ${t}.`,`${e} was not recorded in the ${t}.`,`Staff confirmed ${e} was absent from the ${t}.`,`${e} had no reason to be in the ${t}.`],e+t),inSameRoom:(e,t)=>l([`${e} was in the same ward as ${t}.`,`${e} and ${t} were logged in the same area.`,`A nurse placed ${e} alongside ${t}.`,`${e} was observed near ${t} at the time.`],e+t),inDifferentRoom:(e,t)=>l([`${e} and ${t} were in different parts of the hospital.`,`${e} was not in the same area as ${t}.`,`Logs confirm ${e} and ${t} were in separate zones.`,`${t} was not in ${e}'s section.`],e+t),inColumn:(e,t)=>l([`${e} was in the ${fe(t)} column.`,`${e}'s position was column ${t}.`,`${e} was in the ${fe(t)} column of the ward.`],e+t),inRow:(e,t)=>l([`${e} was in the ${fe(t)} row.`,`${e} was assigned to row ${t} of the ward.`,`${e}'s position was on the ${fe(t)} row.`],e+t),besideSuspect:(e,t)=>l([`${e} was standing right next to ${t}.`,`${e} was observed in proximity to ${t}.`,`${e} and ${t} were in adjacent positions.`,`A nurse noted ${e} directly beside ${t}.`],e+t),notBesideSuspect:(e,t)=>l([`${e} was not beside ${t}.`,`${e} and ${t} were not in adjacent positions.`,`${e} was not in proximity to ${t}.`],e+t),besideObject:(e,t)=>l([`${e} was beside ${t}.`,`${e} was found adjacent to ${t}.`,`${e} was in the immediate vicinity of ${t}.`],e+t),notBesideObject:(e,t)=>l([`${e} was not near ${t}.`,`${e} was not adjacent to ${t}.`,`${e} was not beside ${t}.`],e+t),onSeatTile:(e,t)=>l(t==="bed"?[`${e} was in a hospital bed.`,`${e} was admitted and lying in bed.`,`${e} was bedridden at the time.`]:t==="sofa"?[`${e} was in the waiting area.`,`${e} was seated in the waiting room.`,`${e} had not yet been admitted — still waiting.`]:[`${e} was sitting down.`,`${e} was seated at the time.`],e),notOnSeatTile:e=>l([`${e} was not sitting or lying down.`,`${e} was on their feet.`,`${e} was ambulatory at the time.`,`${e} was standing throughout.`],e),northOf:(e,t)=>l([`${e} was north of ${t}.`,`${e}'s position was closer to the entrance than ${t}'s.`,`${e} was in the front section of the ward relative to ${t}.`],e+t),southOf:(e,t)=>l([`${e} was south of ${t}.`,`${e} was deeper in the ward than ${t}.`,`${e}'s position was further from the entrance than ${t}'s.`],e+t),exactlyNRowsNorth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} bed-row${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} bed-row${a>1?"s":""} behind ${t}.`],e+t+a)},va={id:"hospital",name:"The Hospital",floorPlans:{easy:C.hospital.easy,medium:C.hospital.medium,hard:C.hospital.hard},suspectNames:["Aleksei","Beatrix","Conrad","Dorothea","Emil","Francesca","Gunnar","Hilde","Igor","Jana","Klaus","Liselotte"],victimNames:["Viktor","Valentina","Vera","Valentin","Vesna","Volkmar"],clueTemplates:Fa,narrativeTemplates:{intro:["St Crispin's Hospital is where people come to recover. This one didn't make it. The night shift just ended and nobody has an alibi. You flash your badge at the nurses' station.","A hospital is the last place you expect a murder — or the first. The body was found during morning rounds. You put on gloves and start taking statements.","The patient was admitted last night. By morning, they were a victim. Someone in this building knows what happened and you're going to find out who."],victimFound:["The victim was found in the Ward during the overnight nursing check.","The on-call doctor discovered the victim in the Operating Theatre.","The victim was found in the Pharmacy storage area."],guiltyText:["{{killerName}} — the prognosis was never good.","{{killerName}} — no treatment for this outcome.","{{killerName}} — discharged permanently."]},colorPalette:{floor:"#f0f4f8",wall:"#2c3e50",seat:"#7f8c8d",accent:"#e74c3c",background:"#0a0d12",text:"#ffffff"},spriteMap:{"object:hospital-bed":"","object:medicine-cabinet":""}};function ee(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ka={inRoom:(e,t)=>l([`${e} was at the ${t}.`,`${e} was spotted at the ${t}.`,`Carnies placed ${e} at the ${t}.`,`${e} was seen hanging around the ${t}.`],e+t),notInRoom:(e,t)=>l([`${e} was not at the ${t}.`,`${e} never visited the ${t}.`,`The carnie confirmed ${e} wasn't at the ${t}.`,`${e} steered clear of the ${t}.`],e+t),inSameRoom:(e,t)=>l([`${e} was in the same area as ${t}.`,`${e} and ${t} were seen at the same attraction.`,`A vendor spotted ${e} near ${t}.`,`${e} and ${t} were together in the crowd.`],e+t),inDifferentRoom:(e,t)=>l([`${e} and ${t} were in different parts of the carnival.`,`${e} was nowhere near ${t}'s attraction.`,`${e} and ${t} were at opposite ends of the fairground.`,`${t} said they hadn't seen ${e} nearby.`],e+t),inColumn:(e,t)=>l([`${e} was in the ${ee(t)} column.`,`${e} stood in column ${t} of the fairground.`,`${e}'s position was the ${ee(t)} column.`],e+t),inRow:(e,t)=>l([`${e} was in the ${ee(t)} row.`,`${e} was along the ${ee(t)} row of attractions.`,`${e}'s position was on the ${ee(t)} row.`],e+t),besideSuspect:(e,t)=>l([`${e} was right next to ${t}.`,`${e} and ${t} were shoulder to shoulder in the crowd.`,`A vendor saw ${e} just beside ${t}.`,`${e} was barely a step from ${t}.`],e+t),notBesideSuspect:(e,t)=>l([`${e} was not beside ${t}.`,`${e} and ${t} were apart in the crowd.`,`${e} was not close to ${t}.`],e+t),besideObject:(e,t)=>l([`${e} was beside ${t}.`,`${e} was seen right by ${t}.`,`${e} was standing near ${t}.`],e+t),notBesideObject:(e,t)=>l([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} kept away from ${t}.`],e+t),onSeatTile:(e,t)=>l([`${e} was seated at one of the stalls.`,`${e} had taken a seat by a stall.`,`${e} was sitting at the time.`,`${e} was resting on one of the benches.`],e),notOnSeatTile:e=>l([`${e} was not sitting down.`,`${e} was moving through the crowd.`,`${e} was on their feet.`,`${e} hadn't stopped to sit all evening.`],e),northOf:(e,t)=>l([`${e} was north of ${t}.`,`${e} was in the front section of the carnival relative to ${t}.`,`${e} was closer to the main entrance than ${t}.`],e+t),southOf:(e,t)=>l([`${e} was south of ${t}.`,`${e} was in the back of the fairground relative to ${t}.`,`${e} was further from the entrance than ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} attraction-row${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>l([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} attraction-row${a>1?"s":""} behind ${t}.`],e+t+a)},Ca={id:"carnival",name:"The Carnival",floorPlans:{easy:C.carnival.easy,medium:C.carnival.medium,hard:C.carnival.hard},suspectNames:["Alistair","Brigitte","Cosmo","Dafne","Ezra","Flavia","Gideon","Harriet","Ignatius","Juno","Kit","Ludo"],victimNames:["Victor","Valentina","Vex","Vane","Vesper","Volta"],clueTemplates:ka,narrativeTemplates:{intro:["The Twilight Carnival has been travelling for thirty years without incident. Last night ended that streak. The body was found between the Carousel and the Funhouse. You came for the cotton candy.","Someone killed the Ringmaster. Or maybe the Ringmaster killed someone. Either way, the show is not going on tonight. You arrive as the last customers are being turned away.","Carnivals attract all sorts. This one attracted a detective. The body was found before morning setup. You pull on your coat and walk between the tents."],victimFound:["The victim was found near the Carousel before the carnival opened.","The ride operator discovered the victim in the Funhouse corridor.","The victim was found behind the Food Stands at dawn."],guiltyText:["{{killerName}} — the last act.","{{killerName}} — the fun is over.","{{killerName}} — tickets have been cancelled."]},colorPalette:{floor:"#f5deb3",wall:"#4a235a",seat:"#884ea0",accent:"#e74c3c",background:"#0d0a14",text:"#ffffff"},spriteMap:{"object:carousel-horse":"","object:stall":""}},Sa={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same room as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different rooms.`,inColumn:(e,t)=>`${e} was in column ${t}.`,inRow:(e,t)=>`${e} was in row ${t}.`,besideSuspect:(e,t)=>`${e} was beside ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>`${e} was on a ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Ta={id:"stub",name:"Test Room",floorPlans:{easy:C["coffee-shop"].easy,medium:C["coffee-shop"].medium,hard:C["coffee-shop"].hard},suspectNames:["Alice","Bob","Carol","Dave","Eve","Frank","Grace","Henry","Iris","Jack","Kate","Leo"],victimNames:["Vera","Victor","Violet","Valencia","Vance","Vivian"],clueTemplates:Sa,narrativeTemplates:{intro:["A crime has occurred in the Test Room.","Witnesses report suspicious activity.","The detective arrives on the scene."],victimFound:["The victim was found at the scene.","A body has been discovered.","The victim was discovered here."],guiltyText:["{{killerName}} — caught red-handed.","{{killerName}} — the evidence is clear.","{{killerName}} — guilty as charged."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{}},Pe=new Map;function V(e){Pe.set(e.id,e)}function ht(e){const t=Pe.get(e);if(!t)throw new Error(`Unknown theme: ${e}`);return t}function Ea(){return Array.from(Pe.values())}V(sa);V(ca);V(ha);V(fa);V(pa);V(ya);V(ga);V(xa);V(va);V(Ca);V(Ta);const I=(e,t="#1a120a")=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="${t}"/>${e}</svg>`,_e={chair:I(`
    <rect x="8" y="18" width="16" height="10" rx="1" fill="#8b6914"/>
    <rect x="8" y="8"  width="4"  height="12" rx="1" fill="#7a5c10"/>
    <rect x="20" y="8" width="4"  height="12" rx="1" fill="#7a5c10"/>
    <rect x="8" y="6"  width="16" height="5"  rx="1" fill="#a07820"/>
    <rect x="10" y="19" width="3" height="8"  rx="1" fill="#7a5c10"/>
    <rect x="19" y="19" width="3" height="8"  rx="1" fill="#7a5c10"/>
  `,"#f5e6d3"),sofa:I(`
    <rect x="4"  y="16" width="24" height="11" rx="2" fill="#8b6914"/>
    <rect x="4"  y="10" width="5"  height="18" rx="2" fill="#7a5c10"/>
    <rect x="23" y="10" width="5"  height="18" rx="2" fill="#7a5c10"/>
    <rect x="4"  y="8"  width="24" height="6"  rx="2" fill="#a07820"/>
    <line x1="15" y1="16" x2="15" y2="27" stroke="#7a5c10" stroke-width="1.5"/>
  `,"#f5e6d3"),bed:I(`
    <rect x="4"  y="6"  width="24" height="20" rx="2" fill="#ddd0b8"/>
    <rect x="4"  y="6"  width="24" height="7"  rx="2" fill="#c0a878"/>
    <rect x="6"  y="7"  width="20" height="5"  rx="1" fill="#e8d8b0"/>
    <rect x="4"  y="6"  width="5"  height="20" rx="1" fill="#8b6914"/>
    <rect x="23" y="6"  width="5"  height="20" rx="1" fill="#8b6914"/>
    <rect x="4"  y="22" width="24" height="4"  rx="1" fill="#8b6914"/>
  `,"#f5e6d3"),"object:plant":I(`
    <rect x="11" y="22" width="10" height="7" rx="1" fill="#8b6332"/>
    <rect x="13" y="20" width="6"  height="3" fill="#7a5528"/>
    <ellipse cx="16" cy="13" rx="8" ry="9" fill="#2d7a2d"/>
    <ellipse cx="10" cy="17" rx="5" ry="6" fill="#3a9a3a"/>
    <ellipse cx="22" cy="17" rx="5" ry="6" fill="#3a9a3a"/>
    <ellipse cx="16" cy="8"  rx="4" ry="5" fill="#4cb84c"/>
    <ellipse cx="16" cy="13" rx="3" ry="3" fill="#5cd65c"/>
  `),"object:bar-counter":I(`
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
  `),"object:cash-register":I(`
    <rect x="4"  y="10" width="24" height="18" rx="2" fill="#2a2a2a"/>
    <rect x="6"  y="12" width="20" height="10" rx="1" fill="#1a6a1a"/>
    <rect x="7"  y="13" width="18" height="8"  rx="0" fill="#0d4d0d"/>
    <rect x="8"  y="14" width="16" height="5"  rx="0" fill="#00cc00" opacity="0.8"/>
    <rect x="4"  y="24" width="24" height="4"  rx="1" fill="#1a1a1a"/>
    <rect x="10" y="7"  width="12" height="5"  rx="1" fill="#333"/>
    <rect x="12" y="5"  width="8"  height="3"  rx="1" fill="#444"/>
    <rect x="7"  y="26" width="18" height="2"  rx="0" fill="#555" opacity="0.5"/>
  `),"object:table":I(`
    <rect x="4"  y="12" width="24" height="10" rx="1" fill="#9a6030"/>
    <rect x="3"  y="10" width="26" height="3"  rx="1" fill="#b07840"/>
    <rect x="5"  y="22" width="4"  height="8"  rx="1" fill="#7a4820"/>
    <rect x="23" y="22" width="4"  height="8"  rx="1" fill="#7a4820"/>
  `),"object:shelf":I(`
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
  `),"object:counter":I(`
    <rect x="2"  y="8"  width="28" height="18" rx="2" fill="#888888"/>
    <rect x="2"  y="6"  width="28" height="4"  rx="1" fill="#aaaaaa"/>
    <rect x="4"  y="10" width="8"  height="6"  rx="1" fill="#666"/>
    <rect x="14" y="10" width="8"  height="6"  rx="1" fill="#666"/>
    <rect x="4"  y="18" width="24" height="6"  rx="1" fill="#777"/>
    <rect x="14" y="4"  width="4"  height="4"  rx="1" fill="#999"/>
  `),"object:desk":I(`
    <rect x="2"  y="10" width="28" height="16" rx="2" fill="#7a5028"/>
    <rect x="2"  y="8"  width="28" height="4"  rx="1" fill="#9a6838"/>
    <rect x="4"  y="12" width="10" height="8"  rx="1" fill="#1a1a2a"/>
    <rect x="5"  y="13" width="8"  height="6"  rx="0" fill="#2233aa" opacity="0.8"/>
    <rect x="14" y="12" width="5"  height="6"  rx="1" fill="#555"/>
    <rect x="14" y="13" width="4"  height="4"  fill="#888" opacity="0.5"/>
    <rect x="20" y="12" width="8"  height="4"  rx="0" fill="#888" opacity="0.3"/>
    <rect x="2"  y="24" width="5"  height="8"  rx="1" fill="#6a4018"/>
    <rect x="25" y="24" width="5"  height="8"  rx="1" fill="#6a4018"/>
  `),"object:photocopier":I(`
    <rect x="4"  y="8"  width="24" height="20" rx="2" fill="#555"/>
    <rect x="4"  y="6"  width="24" height="6"  rx="2" fill="#777"/>
    <rect x="6"  y="7"  width="20" height="4"  rx="1" fill="#aaa" opacity="0.4"/>
    <rect x="6"  y="10" width="20" height="14" rx="1" fill="#444"/>
    <rect x="8"  y="12" width="16" height="10" rx="0" fill="#1a1a1a"/>
    <rect x="8"  y="12" width="16" height="1"  fill="#fff" opacity="0.5"/>
    <rect x="18" y="7"  width="4"  height="3"  rx="1" fill="#00aa00"/>
    <rect x="23" y="7"  width="3"  height="3"  rx="1" fill="#aa0000"/>
  `),"object:tv":I(`
    <rect x="4"  y="4"  width="24" height="18" rx="2" fill="#1a1a1a"/>
    <rect x="6"  y="6"  width="20" height="14" rx="1" fill="#0a2a4a"/>
    <rect x="6"  y="6"  width="20" height="14" rx="1" fill="#1a5a8a" opacity="0.6"/>
    <rect x="6"  y="6"  width="10" height="7"  rx="0" fill="#fff" opacity="0.08"/>
    <rect x="14" y="22" width="4"  height="6"  rx="0" fill="#333"/>
    <rect x="10" y="27" width="12" height="3"  rx="1" fill="#222"/>
    <circle cx="26" cy="7" r="1.5" fill="#00cc00"/>
  `),"object:flower-bed":I(`
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
  `),"object:hospital-bed":I(`
    <rect x="2"  y="8"  width="28" height="20" rx="2" fill="#e8e8e8"/>
    <rect x="2"  y="8"  width="28" height="6"  rx="2" fill="#cccccc"/>
    <rect x="4"  y="9"  width="24" height="4"  rx="1" fill="#ffffff"/>
    <rect x="2"  y="8"  width="5"  height="20" rx="1" fill="#aaaaaa"/>
    <rect x="25" y="8"  width="5"  height="20" rx="1" fill="#aaaaaa"/>
    <rect x="2"  y="24" width="28" height="4"  rx="1" fill="#aaaaaa"/>
    <rect x="4"  y="26" width="3"  height="6"  rx="1" fill="#888"/>
    <rect x="25" y="26" width="3"  height="6"  rx="1" fill="#888"/>
    <rect x="14" y="7"  width="4"  height="3"  rx="0" fill="#4444aa"/>
  `),"object:medicine-cabinet":I(`
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
  `),"object:weight-rack":I(`
    <rect x="12" y="4"  width="8"  height="24" rx="1" fill="#444"/>
    <rect x="2"  y="8"  width="28" height="4"  rx="1" fill="#555"/>
    <rect x="2"  y="20" width="28" height="4"  rx="1" fill="#555"/>
    <rect x="2"  y="8"  width="5"  height="16" rx="1" fill="#666" opacity="0.8"/>
    <rect x="6"  y="9"  width="3"  height="14" rx="0" fill="#888"/>
    <rect x="11" y="9"  width="3"  height="14" rx="0" fill="#888"/>
    <rect x="25" y="8"  width="5"  height="16" rx="1" fill="#666" opacity="0.8"/>
    <rect x="23" y="9"  width="3"  height="14" rx="0" fill="#888"/>
    <rect x="18" y="9"  width="3"  height="14" rx="0" fill="#888"/>
  `),"object:treadmill":I(`
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
  `),"object:stall":I(`
    <rect x="2"  y="4"  width="28" height="24" rx="1" fill="#9a6028"/>
    <rect x="2"  y="4"  width="28" height="5"  rx="1" fill="#c08040"/>
    <rect x="3"  y="4"  width="26" height="28" rx="0" stroke="#7a4818" stroke-width="2" fill="none"/>
    <rect x="8"  y="10" width="16" height="12" rx="1" fill="#7a4818"/>
    <rect x="9"  y="11" width="14" height="10" rx="0" fill="#1a1a1a" opacity="0.7"/>
    <rect x="9"  y="11" width="6"  height="10" rx="0" fill="#2a2a2a"/>
    <rect x="10" y="12" width="4"  height="8"  rx="0" fill="#c08040" opacity="0.4"/>
    <rect x="14" y="14" width="3"  height="2"  rx="0" fill="#888"/>
    <rect x="6"  y="22" width="20" height="2"  fill="#7a4818"/>
  `),"object:carousel-horse":I(`
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
  `),"object:jacuzzi-tile":I(`
    <rect x="2"  y="2"  width="28" height="28" rx="3" fill="#1a6a9a"/>
    <rect x="4"  y="4"  width="24" height="24" rx="2" fill="#2288cc"/>
    <ellipse cx="16" cy="16" rx="10" ry="8" fill="#44aaee" opacity="0.5"/>
    <path d="M6 16 Q10 12 14 16 Q18 20 22 16 Q26 12 28 16" stroke="#88ccff" stroke-width="1.5" fill="none" opacity="0.7"/>
    <path d="M6 20 Q10 16 14 20 Q18 24 22 20 Q26 16 28 20" stroke="#88ccff" stroke-width="1.5" fill="none" opacity="0.5"/>
    <circle cx="10" cy="12" r="1.5" fill="#ffffff" opacity="0.6"/>
    <circle cx="20" cy="10" r="1.5" fill="#ffffff" opacity="0.6"/>
    <circle cx="25" cy="18" r="1"   fill="#ffffff" opacity="0.6"/>
  `),"object:teddy-bear":I(`
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
  `),"object:tree":I(`
    <rect x="13" y="22" width="6"  height="8"  rx="1" fill="#7a4818"/>
    <polygon points="16,2 4,16 28,16" fill="#1a7a1a"/>
    <polygon points="16,6 5,18 27,18" fill="#2a9a2a"/>
    <polygon points="16,10 7,22 25,22" fill="#3ab83a"/>
    <circle cx="16" cy="2" r="2" fill="#4cd84c"/>
  `)};let S=64;function Ra(e,t){const a=(window.innerHeight-80)/t,r=window.innerWidth*.62/e;return S=Math.max(56,Math.min(96,Math.floor(Math.min(a,r)))),S}const xe=new Map,Fe=new Set;function Ye(e,t){if(!e)return null;if(xe.has(e))return xe.get(e);if(Fe.has(e))return null;Fe.add(e);const a=new Image,r=new Blob([e],{type:"image/svg+xml"}),n=URL.createObjectURL(r);return a.onload=()=>{xe.set(e,a),Fe.delete(e),URL.revokeObjectURL(n),t?.()},a.src=n,null}const te="'Press Start 2P', monospace",Ue=["rgba(192, 120,  40, 0.18)","rgba( 40, 100, 180, 0.16)","rgba( 40, 150,  80, 0.16)","rgba(160,  40, 100, 0.16)","rgba(140, 120,  40, 0.16)","rgba( 80,  40, 160, 0.16)"],ue=["rgba(220, 140,  40, 0.75)","rgba( 60, 120, 220, 0.75)","rgba( 40, 170,  80, 0.75)","rgba(200,  40, 120, 0.75)","rgba(180, 160,  20, 0.75)","rgba(100,  40, 200, 0.75)"],Na={pL:"object:plant",tB:"object:table",sH:"object:shelf",cR:"object:cash-register",bB:"object:bar-counter",tV:"object:tv",cT:"object:counter",dK:"object:desk",pC:"object:photocopier",fB:"object:flower-bed",hB:"object:hospital-bed",mC:"object:medicine-cabinet",tR:"object:tree",tD:"object:teddy-bear",cH:"object:carousel-horse",tM:"object:treadmill",wT:"object:weight-rack",sT:"object:stall",jZ:"object:jacuzzi-tile"},Wa=new Set(["C","S","B"]),Ia={C:"chair",S:"sofa",B:"bed"};function Ma(e){let t=0;for(let r=0;r<e.length;r++)t=t*31+e.charCodeAt(r)&65535;const a=[0,30,60,120,180,210,270,300];return`hsl(${a[t%a.length]}, 70%, 52%)`}function Aa(e){const t=new Map;return e.rooms.forEach((a,r)=>{for(const[n,o]of a.cells)t.set(`${n},${o}`,r)}),t}function Pa(e,t,a,r,n,o,s){const c=t.floorPlan,p=a.colorPalette,{blockedRows:g,blockedCols:u}=lt(Array.from(r.values())),d=Aa(c),i=S;for(let m=0;m<c.height;m++)for(let h=0;h<c.width;h++){const b=d.get(`${h},${m}`);b!==void 0&&c.tiles[m][h]!=="W"&&(e.fillStyle=Ue[b%Ue.length],e.fillRect(h*i,m*i,i,i))}for(let m=0;m<c.height;m++)for(let h=0;h<c.width;h++){const b=c.tiles[m][h],f=h*i,$=m*i;if(b==="W"){e.fillStyle=p.wall,e.fillRect(f,$,i,i),e.strokeStyle="rgba(255,255,255,0.06)",e.lineWidth=1;const y=Math.max(6,Math.floor(i/8));for(let F=0;F<Math.ceil(i/y);F++){const v=$+F*y;e.beginPath(),e.moveTo(f,v),e.lineTo(f+i,v),e.stroke();const x=F%2*(i/2);e.beginPath(),e.moveTo(f+x,v),e.lineTo(f+x,Math.min(v+y,$+i)),e.stroke()}continue}if(e.fillStyle=p.floor,e.fillRect(f,$,i,i),e.strokeStyle="rgba(0,0,0,0.10)",e.lineWidth=1,e.strokeRect(f+.5,$+.5,i-1,i-1),Wa.has(b)){const y=Ia[b]??"chair",F=_e[y]??"",v=F?Ye(F,s):null;if(v){const x=Math.floor(i*.06);e.drawImage(v,f+x,$+x,i-x*2,i-x*2)}else{e.fillStyle=p.seat;const x=Math.floor(i*.4),E=f+(i-x)/2,B=$+(i-x)/2+Math.floor(i*.05);e.fillRect(E,B,x,x),e.fillRect(E,$+Math.floor(i*.08),x,Math.floor(i*.1))}continue}if(b!=="F"){const y=Na[b]??`object:${b}`,F=(a.spriteMap[y]??"")||(_e[y]??""),v=F?Ye(F,s):null;if(v)e.drawImage(v,f,$,i,i);else{const x=y.replace("object:","").slice(0,4).toUpperCase();e.fillStyle="rgba(110,75,28,0.88)",e.fillRect(f+2,$+2,i-4,i-4),e.strokeStyle="#7a5c2e",e.lineWidth=2,e.strokeRect(f+2,$+2,i-4,i-4),e.fillStyle="#ffe0a0",e.font=`${Math.max(6,Math.floor(i*.18))}px ${te}`,e.textAlign="center",e.textBaseline="middle",e.fillText(x,f+i/2,$+i/2),e.textAlign="left",e.textBaseline="alphabetic"}}}const w=[[1,0],[-1,0],[0,1],[0,-1]];c.rooms.forEach((m,h)=>{e.strokeStyle=ue[h%ue.length],e.lineWidth=2.5;for(const[b,f]of m.cells)if(c.tiles[f]?.[b]!=="W")for(const[$,y]of w){const F=b+$,v=f+y,x=d.get(`${F},${v}`),E=c.tiles[v]?.[F];(x!==h||E==="W"||E===void 0)&&(e.beginPath(),$===1?(e.moveTo((b+1)*i,f*i),e.lineTo((b+1)*i,(f+1)*i)):$===-1?(e.moveTo(b*i,f*i),e.lineTo(b*i,(f+1)*i)):y===1?(e.moveTo(b*i,(f+1)*i),e.lineTo((b+1)*i,(f+1)*i)):(e.moveTo(b*i,f*i),e.lineTo((b+1)*i,f*i)),e.stroke())}}),c.rooms.forEach((m,h)=>{const b=m.cells.filter(([x,E])=>c.tiles[E]?.[x]!=="W");if(!b.length)return;const f=b.map(([x])=>x),$=b.map(([,x])=>x),y=(Math.min(...f)+Math.max(...f)+1)/2*i,F=(Math.min(...$)+Math.max(...$)+1)/2*i,v=Math.max(5,Math.min(8,Math.floor(i*.11)));e.font=`${v}px ${te}`,e.textAlign="center",e.textBaseline="middle",e.fillStyle="rgba(0,0,0,0.35)",e.fillText(m.name.toUpperCase(),y+1,F+1),e.fillStyle=ue[h%ue.length].replace("0.75","0.9"),e.fillText(m.name.toUpperCase(),y,F),e.textAlign="left",e.textBaseline="alphabetic"}),e.fillStyle="rgba(0, 0, 0, 0.16)";for(const m of g)e.fillRect(0,m*i,c.width*i,i);for(const m of u)e.fillRect(m*i,0,i,c.height*i);if(n){const m=n.x*i,h=n.y*i;e.fillStyle=`${p.accent}55`,e.fillRect(m,h,i,i),e.strokeStyle=p.accent,e.lineWidth=4,e.strokeRect(m+2,h+2,i-4,i-4),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.strokeRect(m+6,h+6,i-12,i-12);const b=Math.max(10,Math.floor(i*.28));e.font=`bold ${b}px ${te}`,e.fillStyle="#ffffff",e.textAlign="center",e.textBaseline="middle",e.fillText("?",m+i/2,h+i/2),e.textAlign="left",e.textBaseline="alphabetic"}for(const[m,h]of r){const b=t.suspects.find(x=>x.id===m);if(!b)continue;const f=h.x*i,$=h.y*i,y=Math.floor(i*.1),F=i-y*2;e.fillStyle=Ma(m),e.fillRect(f+y,$+y,F,F),e.strokeStyle="rgba(0,0,0,0.7)",e.lineWidth=2,e.strokeRect(f+y+1,$+y+1,F-2,F-2),e.strokeStyle="rgba(255,255,255,0.25)",e.lineWidth=1,e.strokeRect(f+y+3,$+y+3,F-6,F-6);const v=Math.min(16,Math.floor(F*.5));e.fillStyle="#ffffff",e.font=`${v}px ${te}`,e.textAlign="center",e.textBaseline="middle",e.fillText(b.name.charAt(0).toUpperCase(),f+i/2,$+i/2+1),e.textAlign="left",e.textBaseline="alphabetic"}if(o){for(const[m,h]of o.x){const b=m*i,f=h*i;e.fillStyle="rgba(192,57,43,0.18)",e.fillRect(b,f,i,i),e.strokeStyle="#c0392b",e.lineWidth=3;const $=Math.floor(i*.18);e.beginPath(),e.moveTo(b+$,f+$),e.lineTo(b+i-$,f+i-$),e.stroke(),e.beginPath(),e.moveTo(b+i-$,f+$),e.lineTo(b+$,f+i-$),e.stroke()}for(const[m,h]of Object.entries(o.candidates)){if(!h.length)continue;const[b,f]=m.split(",").map(Number),$=b*i,y=f*i,F=h.map(x=>t.suspects.find(E=>E.id===x)?.name.charAt(0).toUpperCase()??"?").join("")+"?",v=Math.max(5,Math.floor(i*.14));e.font=`${v}px ${te}`,e.fillStyle="rgba(80,100,220,0.9)",e.textAlign="center",e.textBaseline="bottom",e.fillText(F,$+i/2,y+i-2),e.textAlign="left",e.textBaseline="alphabetic"}}}function Ba(e){return{width:e.floorPlan.width*S,height:e.floorPlan.height*S}}const Oa=`
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
`,Ge=["rgba(220,140,40,0.35)","rgba(60,120,220,0.35)","rgba(40,170,80,0.35)","rgba(200,40,120,0.35)","rgba(180,160,20,0.35)","rgba(100,40,200,0.35)"],Ke=["#dc8c28","#3c78dc","#28aa50","#c82878","#b4a014","#6428c8"];let qe=!1;function ja(){if(qe)return;const e=document.createElement("style");e.textContent=Oa,document.head.appendChild(e),qe=!0}function La(e){let t=0;for(let r=0;r<e.length;r++)t=t*31+e.charCodeAt(r)&65535;const a=[0,30,60,120,180,210,270,300];return`hsl(${a[t%a.length]}, 70%, 52%)`}function za(e,t,a,r){e.width=32,e.height=32;const o=e.getContext("2d");if(!o)return;const s=La(t);o.fillStyle=r?s:"rgba(180,160,120,0.3)",o.fillRect(0,0,32,32),o.fillStyle=r?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.08)",o.beginPath(),o.arc(32/2,32*.38,32*.28,0,Math.PI*2),o.fill(),o.fillStyle=r?"rgba(0,0,0,0.2)":"rgba(0,0,0,0.06)",o.beginPath(),o.moveTo(32*.28,32*.65),o.lineTo(32*.72,32*.65),o.lineTo(32*.85,32),o.lineTo(32*.15,32),o.closePath(),o.fill(),o.fillStyle=r?"#ffffff":"rgba(60,40,10,0.6)",o.font=`bold ${Math.floor(32*.45)}px 'Press Start 2P', monospace`,o.textAlign="center",o.textBaseline="middle",o.fillText(a.charAt(0).toUpperCase(),32/2,32*.38),o.textAlign="left",o.textBaseline="alphabetic",o.strokeStyle=r?s:"rgba(139,105,20,0.5)",o.lineWidth=2,o.strokeRect(1,1,30,30)}function Da(e,t,a,r,n){ja(),e.innerHTML="",e.className="alibi-sidebar";const o=document.createElement("div");o.className="alibi-sidebar-section";const s=document.createElement("div");s.className="alibi-sidebar-label",s.textContent="Rooms",o.appendChild(s);const c=document.createElement("div");c.className="alibi-room-legend",t.floorPlan.rooms.forEach((F,v)=>{const x=document.createElement("div");x.className="alibi-room-entry";const E=document.createElement("div");E.className="alibi-room-swatch",E.style.background=Ge[v%Ge.length],E.style.borderColor=Ke[v%Ke.length];const B=document.createElement("span");B.textContent=F.name,x.appendChild(E),x.appendChild(B),c.appendChild(x)}),o.appendChild(c),e.appendChild(o);const p=document.createElement("div");p.className="alibi-victim-section";const g=document.createElement("div");g.className="alibi-sidebar-label",g.textContent="Victim",p.appendChild(g);const u=document.createElement("div");u.className="alibi-victim-card",u.setAttribute("data-testid","victim-token");const d=document.createElement("div");d.className="alibi-victim-icon",d.textContent="?";const i=document.createElement("div");i.className="alibi-victim-label",a.size>=t.suspects.length?(i.textContent=`Location revealed!
Click victim cell`,d.textContent="☠",u.style.borderColor="rgba(192,57,43,0.7)",u.style.background="rgba(192,57,43,0.12)"):i.textContent=`Unknown
Place all ${t.suspects.length} suspects`,u.appendChild(d),u.appendChild(i),p.appendChild(u),e.appendChild(p);const m=document.createElement("div");m.className="alibi-sidebar-section";const h=document.createElement("div");h.className="alibi-sidebar-label",h.textContent="Suspects",m.appendChild(h);const b=document.createElement("div");b.className="alibi-suspect-section";for(const F of t.suspects){const v=a.has(F.id),x=document.createElement("div");x.className="alibi-suspect-card"+(v?" placed":""),x.setAttribute("data-testid",`suspect-card-${F.id}`);const E=document.createElement("div");E.className="alibi-suspect-portrait";const B=document.createElement("canvas");za(B,F.id,F.name,v),E.appendChild(B);const T=document.createElement("div");T.className="alibi-suspect-info";const U=document.createElement("div");U.className="alibi-suspect-name",U.textContent=F.name;const O=document.createElement("div");if(O.className="alibi-suspect-status",v){const N=a.get(F.id);O.textContent=`Col ${N.x+1}, Row ${N.y+1}`}else O.textContent="Not placed";T.appendChild(U),T.appendChild(O),x.appendChild(E),x.appendChild(T),b.appendChild(x)}m.appendChild(b),e.appendChild(m);const f=document.createElement("div");f.className="alibi-sidebar-section";const $=document.createElement("div");$.className="alibi-sidebar-label",$.textContent="Evidence",f.appendChild($);const y=document.createElement("div");y.className="alibi-clue-section",t.clues.forEach((F,v)=>{const x=document.createElement("div");x.className="alibi-clue-card",x.setAttribute("data-testid",`clue-${v}`),r.has(v)&&x.classList.add("clue-satisfied"),n.has(v)&&x.classList.add("clue-error"),x.textContent=F.text,y.appendChild(x)}),f.appendChild(y),e.appendChild(f)}const Ha=`
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
`;let Ze=!1;function Be(){if(Ze)return;const e=document.createElement("style");e.textContent=Ha,document.head.appendChild(e),Ze=!0}function ve(e,t,a){Be(),Oe(e);const r=document.createElement("div");r.className="alibi-overlay",r.setAttribute("data-testid","narrative-intro");const n=document.createElement("div");n.className="alibi-modal";const o=document.createElement("h2");o.textContent="A New Case";const s=document.createElement("p");s.textContent=t.narrativeIntro;const c=document.createElement("button");c.textContent="Begin Investigation",c.addEventListener("click",()=>{r.remove(),a()}),n.appendChild(o),n.appendChild(s),n.appendChild(c),r.appendChild(n),e.appendChild(r)}function Va(e,t){Be(),Oe(e);const a=t.narrativeGuilty.replace("{{killerName}}",t.killer.name),r=document.createElement("div");r.className="alibi-overlay";const n=document.createElement("div");n.className="alibi-modal";const o=document.createElement("div");o.className="alibi-guilty-stamp",o.setAttribute("data-testid","guilty-stamp"),o.textContent="GUILTY";const s=document.createElement("div");s.className="alibi-guilty-killer",s.setAttribute("data-testid","guilty-killer-name"),s.textContent=t.killer.name;const c=document.createElement("p");c.textContent=a;const p=document.createElement("p");p.textContent=t.narrativeVictimFound,n.appendChild(o),n.appendChild(s),n.appendChild(p),n.appendChild(c),r.appendChild(n),e.appendChild(r)}function Oe(e){const t=e.querySelector(".alibi-overlay");t&&t.remove()}function _a(e){Be(),Oe(e);const t=document.createElement("div");t.className="alibi-overlay",t.setAttribute("data-testid","msg-clue-gate");const a=document.createElement("div");a.className="alibi-modal";const r=document.createElement("h2");r.textContent="Something Doesn't Add Up…";const n=document.createElement("p");n.textContent="Check the clue cards. Not all witnesses are satisfied.";const o=document.createElement("button");o.textContent="Keep Investigating",o.addEventListener("click",()=>t.remove()),a.appendChild(r),a.appendChild(n),a.appendChild(o),t.appendChild(a),e.appendChild(t),setTimeout(()=>{t.isConnected&&t.remove()},3e3)}function Ya(){return{x:[],candidates:{}}}function Je(e){return{placements:new Map,annotations:Ya(),satisfiedClues:new Set,errorClues:new Set,victimVisible:!1,victimCell:null,phase:"playing"}}function Ua(e,t,a,r,n){const o=new Map(e.placements);return o.set(a,{suspectId:a,x:r,y:n}),je({...e,placements:o},t)}function Ga(e,t,a){const r=new Map(e.placements);return r.delete(a),je({...e,placements:r},t)}function Ka(e){if(e.satisfiedClues.size===0&&e.placements.size>0)return e;const t=e.satisfiedClues.size+e.errorClues.size;return e.errorClues.size===0&&t>0&&e.victimVisible?{...e,phase:"guilty"}:e}function je(e,t){const a=new Set,r=new Set;t.clues.forEach((s,c)=>{const p=Ee(t.floorPlan,s,e.placements);p===!0?a.add(c):p===!1&&r.add(c)});const n=ct(t.floorPlan,Array.from(e.placements.values()));return{...e,satisfiedClues:a,errorClues:r,victimVisible:n!==null,victimCell:n}}function J(e){return{x:[...e.x.map(([t,a])=>[t,a])],candidates:Object.fromEntries(Object.entries(e.candidates).map(([t,a])=>[t,[...a]]))}}function qa(e,t,a){const r=J(e.annotations),n=r.x.findIndex(([o,s])=>o===t&&s===a);return n>=0?r.x.splice(n,1):r.x.push([t,a]),{...e,annotations:r}}function Za(e,t,a,r){const n=J(e.annotations),o=`${t},${a}`;return n.candidates[o]||(n.candidates[o]=[]),n.candidates[o].includes(r)||(n.candidates[o]=[...n.candidates[o],r]),{...e,annotations:n}}function Ja(e,t,a,r){const n=J(e.annotations),o=`${t},${a}`;return n.candidates[o]&&(n.candidates[o]=n.candidates[o].filter(s=>s!==r),n.candidates[o].length===0&&delete n.candidates[o]),{...e,annotations:n}}function Xa(e,t,a,r){const n=J(e.annotations);for(const s of Object.keys(n.candidates))n.candidates[s]=n.candidates[s].filter(c=>c!==t),n.candidates[s].length===0&&delete n.candidates[s];const o=n.x.findIndex(([s,c])=>s===a&&c===r);return o>=0&&n.x.splice(o,1),{...e,annotations:n}}function q(e){return{placements:new Map(e.placements),annotations:J(e.annotations)}}function ke(e,t,a){return je({...e,placements:new Map(a.placements),annotations:J(a.annotations)},t)}const Qa=50;class en{constructor(){ge(this,"past",[]);ge(this,"future",[])}push(t){this.past.push(t),this.past.length>Qa&&this.past.shift(),this.future=[]}undo(t){return this.past.length===0?null:(this.future.push(t),this.past.pop())}redo(t){return this.future.length===0?null:(this.past.push(t),this.future.pop())}canUndo(){return this.past.length>0}canRedo(){return this.future.length>0}clear(){this.past=[],this.future=[]}}let ae=null,ye=!1;function tn(){if(ye)return null;try{return ae||(ae=new AudioContext),ae.state==="suspended"&&ae.resume().catch(()=>{}),ae}catch{return null}}function K(e,t,a="sine",r=.15){const n=tn();if(n)try{const o=n.createOscillator(),s=n.createGain();o.connect(s),s.connect(n.destination),o.type=a,o.frequency.value=e,s.gain.setValueAtTime(r,n.currentTime),s.gain.exponentialRampToValueAtTime(.001,n.currentTime+t),o.start(n.currentTime),o.stop(n.currentTime+t)}catch{}}function pe(e){switch(e){case"place":K(440,.08,"sine",.12);break;case"remove":K(330,.06,"sine",.08);break;case"clue-satisfied":K(660,.12,"sine",.15);break;case"solve":{K(523,.15,"sine",.2),setTimeout(()=>K(659,.15,"sine",.2),150),setTimeout(()=>K(784,.3,"sine",.25),300);break}case"error":K(220,.2,"square",.1);break;case"navigate":K(880,.05,"sine",.08);break}}function an(){return ye=!ye,ye}function mt(e){const t=Math.floor(e/6e4),a=Math.floor(e%6e4/1e3);return t>0?`${t}m ${a}s`:`${a}s`}function ft(e){return e.replace(/-/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function nn(e,t){const a=e.difficulty.charAt(0).toUpperCase()+e.difficulty.slice(1);return["🔍 ALIBI",`Case: ${ft(e.themeId)}`,`Difficulty: ${a}`,`Clues: ${e.clues.length}`,`Time: ${mt(t)}`,`Killer: ${e.killer.name}`,"","pnz1990.github.io/alibi/"].join(`
`)}function on(e,t,a){const r=e.difficulty.charAt(0).toUpperCase()+e.difficulty.slice(1),n=new Date,o=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`,s=a>1?`🔥 ${a} day streak`:"1st solve";return["🔍 ALIBI — Daily Case",`📅 ${o}`,`Case: ${ft(e.themeId)} (${r})`,`Time: ${mt(t)}`,s,`Killer: ${e.killer.name}`,"","pnz1990.github.io/alibi/"].join(`
`)}async function rn(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;const t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:-9999px;left:-9999px;",document.body.appendChild(t),t.focus(),t.select();const a=document.execCommand("copy");return document.body.removeChild(t),a}catch{return!1}}const _={campaign:e=>`alibi_campaign_${e}`,daily:e=>`alibi_daily_${e}`,streak:"alibi_streak",stats:"alibi_stats",prefs:"alibi_prefs",puzzleState:"alibi_puzzle_state"};function sn(e){try{const t=Le();t[e.key]=e,localStorage.setItem(_.puzzleState,JSON.stringify(t))}catch{}}function ln(e){try{return Le()[e]??null}catch{return null}}function Xe(e){try{const t=Le();delete t[e],localStorage.setItem(_.puzzleState,JSON.stringify(t))}catch{}}function Le(){try{const e=localStorage.getItem(_.puzzleState);return e?JSON.parse(e):{}}catch{return{}}}function ie(e){try{const t=localStorage.getItem(_.campaign(e));return t?JSON.parse(t):null}catch{return null}}function ze(e){try{localStorage.setItem(_.campaign(e.slot),JSON.stringify(e))}catch{}}function Re(e){try{const t=localStorage.getItem(_.daily(e));return t?JSON.parse(t):null}catch{return null}}function cn(e){try{localStorage.setItem(_.daily(e.date),JSON.stringify(e))}catch{}}function Ne(){try{const e=localStorage.getItem(_.streak);return e?parseInt(e,10):0}catch{return 0}}function dn(e){try{localStorage.setItem(_.streak,String(e))}catch{}}const Qe={totalSolved:0,bestTimes:{},solvedToday:0,lastSolvedDate:""};function hn(){try{const e=localStorage.getItem(_.stats);return e?JSON.parse(e):{...Qe}}catch{return{...Qe}}}function mn(e){try{localStorage.setItem(_.stats,JSON.stringify(e))}catch{}}function et(e,t,a){const r=hn(),n=new Date().toISOString().slice(0,10),o=`${e}-${t}`;r.totalSolved+=1,(!r.bestTimes[o]||a<r.bestTimes[o])&&(r.bestTimes[o]=a),r.lastSolvedDate===n?r.solvedToday+=1:(r.solvedToday=1,r.lastSolvedDate=n),mn(r)}const fn=["coffee-shop","bookstore","backyard","holiday-mall","restaurant","gym","office","garden-party","hospital","carnival"],un=["easy","easy","easy","easy","medium","medium","medium","medium","hard","hard","hard","hard"];function pn(e,t){let a=e^t*2654435769;return a=(a>>>16^a)*73244475|0,a=(a>>>16^a)*73244475|0,a=a>>>16^a,Math.abs(a)}function bn(e){let t=e;return function(){t|=0,t=t+1831565813|0;let a=Math.imul(t^t>>>15,1|t);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}function yn(e){const t=[];for(let a=0;a<3;a++){const r=(e^a*3735928559)>>>0,n=bn(r),o=[...fn];for(let s=o.length-1;s>0;s--){const c=Math.floor(n()*(s+1));[o[s],o[c]]=[o[c],o[s]]}t.push(...o.slice(0,4))}return t}function ut(e){const t=wn(),a=yn(t),r=Array.from({length:12},(n,o)=>({seed:pn(t,o),themeId:a[o],difficulty:un[o],status:o===0?"in_progress":"locked"}));return{campaignSeed:t,slot:e,currentCase:0,startedAt:new Date().toISOString(),cases:r,rank:"rookie"}}function wn(){return Math.floor(Math.random()*4294967295)}function gn(e){const t=e.cases.filter(a=>a.status==="solved").length;return t>=12?"senior":t>=8?"detective":t>=4?"investigator":"rookie"}function $n(e,t,a,r){const n=e.cases.map((c,p)=>p===t?{...c,status:"solved",solveTimeMs:a,killerName:r}:p===t+1&&c.status==="locked"?{...c,status:"in_progress"}:c),o=t<11?t+1:t,s={...e,cases:n,currentCase:o};return{...s,rank:gn(s)}}function xn(e){let t=5381;for(let a=0;a<e.length;a++)t=(t<<5)+t+e.charCodeAt(a)|0;return Math.abs(t)}function De(){const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const tt=[{themeId:"coffee-shop",difficulty:"easy"},{themeId:"bookstore",difficulty:"easy"},{themeId:"backyard",difficulty:"easy"},{themeId:"holiday-mall",difficulty:"easy"},{themeId:"restaurant",difficulty:"easy"},{themeId:"gym",difficulty:"easy"},{themeId:"office",difficulty:"easy"},{themeId:"garden-party",difficulty:"easy"},{themeId:"hospital",difficulty:"easy"},{themeId:"carnival",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"bookstore",difficulty:"medium"},{themeId:"backyard",difficulty:"medium"},{themeId:"holiday-mall",difficulty:"medium"},{themeId:"restaurant",difficulty:"medium"},{themeId:"gym",difficulty:"medium"},{themeId:"office",difficulty:"medium"},{themeId:"garden-party",difficulty:"medium"},{themeId:"hospital",difficulty:"medium"},{themeId:"carnival",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"bookstore",difficulty:"hard"},{themeId:"backyard",difficulty:"hard"},{themeId:"holiday-mall",difficulty:"hard"},{themeId:"restaurant",difficulty:"hard"},{themeId:"gym",difficulty:"hard"},{themeId:"office",difficulty:"hard"},{themeId:"garden-party",difficulty:"hard"},{themeId:"hospital",difficulty:"hard"},{themeId:"carnival",difficulty:"hard"}];function Fn(e){const t=xn(e),a=new Date(e+"T12:00:00Z"),r=Math.floor((a.getTime()-new Date(a.getUTCFullYear(),0,0).getTime())/864e5),{themeId:n,difficulty:o}=tt[r%tt.length];return{seed:t,themeId:n,difficulty:o,dateStr:e}}function at(){return Fn(De())}const vn=`
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
`;let nt=!1;function kn(){if(nt)return;const e=document.createElement("style");e.textContent=vn,document.head.appendChild(e),nt=!0}let We=null,Ie=null;function G(){We?.remove(),Ie?.remove(),We=null,Ie=null}function pt(e,t,a){if(G(),!a.length)return;const r=52,n=22,o=document.createElement("div");o.className="alibi-wheel-backdrop",o.addEventListener("click",G),o.addEventListener("touchstart",G,{passive:!0}),document.body.appendChild(o),Ie=o;const s=document.createElement("div");s.className="alibi-wheel",s.setAttribute("data-testid","radial-menu"),s.style.left=`${e}px`,s.style.top=`${t}px`,s.style.transform="translate(-50%, -50%)",s.style.pointerEvents="all";const c=a.length,p=(r+n+4)*2,g=p/2,u=p/2,d=document.createElementNS("http://www.w3.org/2000/svg","svg");d.setAttribute("class","alibi-wheel-svg"),d.setAttribute("width",String(p)),d.setAttribute("height",String(p)),d.setAttribute("viewBox",`0 0 ${p} ${p}`);let i=-1;a.forEach((h,b)=>{const f=b/c*Math.PI*2-Math.PI/2,$=(b+1)/c*Math.PI*2-Math.PI/2,y=(f+$)/2,F=.06,v=18,x=r+n,E=g+v*Math.cos(f+F),B=u+v*Math.sin(f+F),T=g+v*Math.cos($-F),U=u+v*Math.sin($-F),O=g+x*Math.cos(f+F),N=u+x*Math.sin(f+F),L=g+x*Math.cos($-F),P=u+x*Math.sin($-F),M=$-f-F*2>Math.PI?1:0,H=[`M ${E} ${B}`,`A ${v} ${v} 0 ${M} 1 ${T} ${U}`,`L ${L} ${P}`,`A ${x} ${x} 0 ${M} 0 ${O} ${N}`,"Z"].join(" "),z=document.createElementNS("http://www.w3.org/2000/svg","path");z.setAttribute("d",H),z.setAttribute("fill",h.color),z.setAttribute("stroke","rgba(0,0,0,0.5)"),z.setAttribute("stroke-width","1.5"),z.style.cursor="pointer",z.style.transition="filter 0.08s";const k=(v+x)/2,R=g+k*Math.cos(y),A=u+k*Math.sin(y),W=document.createElementNS("http://www.w3.org/2000/svg","text");W.setAttribute("x",String(R)),W.setAttribute("y",String(A)),W.setAttribute("text-anchor","middle"),W.setAttribute("dominant-baseline","middle"),W.setAttribute("fill","#ffffff"),W.setAttribute("font-size",c>8?"7":"8"),W.setAttribute("font-family","'Press Start 2P', monospace"),W.setAttribute("pointer-events","none"),W.style.userSelect="none",W.textContent=h.label,z.setAttribute("data-testid",h.testid),z.addEventListener("mouseenter",()=>{z.style.filter="brightness(1.4)",W.setAttribute("fill","#ffffc0")}),z.addEventListener("mouseleave",()=>{z.style.filter="",W.setAttribute("fill","#ffffff")}),z.addEventListener("click",Y=>{Y.stopPropagation(),G(),h.onClick()}),d.appendChild(z),d.appendChild(W)});let w=!1;d.addEventListener("touchstart",h=>{h.preventDefault(),w=!0},{passive:!1}),d.addEventListener("touchmove",h=>{if(!w)return;h.preventDefault();const b=h.touches[0],f=d.getBoundingClientRect(),$=b.clientX-(f.left+f.width/2),y=b.clientY-(f.top+f.height/2);if(Math.sqrt($*$+y*y)<16){i>=0&&(d.children[i*2].style.filter="",i=-1);return}let v=Math.atan2(y,$)+Math.PI/2;v<0&&(v+=Math.PI*2);const x=Math.floor(v/(Math.PI*2)*c)%c;x!==i&&(i>=0&&(d.children[i*2].style.filter=""),i=x,d.children[x*2].style.filter="brightness(1.5)")},{passive:!1}),d.addEventListener("touchend",h=>{h.preventDefault(),w=!1,i>=0&&i<a.length&&(G(),a[i].onClick()),i=-1},{passive:!1}),s.appendChild(d);const m=document.createElement("div");m.className="alibi-wheel-center",m.textContent="✕",m.addEventListener("click",h=>{h.stopPropagation(),G()}),s.appendChild(m),document.body.appendChild(s),We=s}function Cn(e,t,a,r,n){kn();const o=t.floorPlan,s=document.createElement("div");s.className="alibi-radial-overlay",s.style.cssText=`position:absolute;top:0;left:0;width:${o.width*S}px;height:${o.height*S}px;`,e.style.position="relative",e.appendChild(s);const c=[];for(let i=0;i<o.height;i++){c[i]=[];for(let w=0;w<o.width;w++){const m=o.tiles[i][w],h=document.createElement("div");h.setAttribute("data-testid",`cell-${w}-${i}`),h.style.cssText=`position:absolute;left:${w*S}px;top:${i*S}px;width:${S}px;height:${S}px;`,Z(m)&&(h.classList.add("alibi-cell-overlay","placeable"),h.addEventListener("click",b=>{b.stopPropagation();const f=e.getBoundingClientRect(),$=f.left+(w+.5)*S,y=f.top+(i+.5)*S;Tn(w,i,$,y,r,t,n)})),c[i][w]=h,s.appendChild(h)}}let p=null;const g=()=>G();document.addEventListener("keydown",i=>{i.key==="Escape"&&G()});function u(){const i=r();if(p&&(p.remove(),p=null),i.victimCell){const{x:h,y:b}=i.victimCell;p=document.createElement("div"),p.setAttribute("data-testid","victim-cell"),p.className="alibi-cell-overlay victim-highlight",p.style.cssText=`position:absolute;left:${h*S}px;top:${b*S}px;width:${S}px;height:${S}px;pointer-events:all;`,p.addEventListener("click",f=>{f.stopPropagation(),n.onVictimClick()}),s.appendChild(p)}const w=new Set,m=new Set;for(const h of i.placements.values())w.add(h.y),m.add(h.x);for(let h=0;h<o.height;h++)for(let b=0;b<o.width;b++){const f=c[h]?.[b];if(!f)continue;const $=o.tiles[h][b],y=Array.from(i.placements.values()).some(v=>v.x===b&&v.y===h),F=w.has(h)||m.has(b);f.style.pointerEvents=Z($)&&(!F||y)?"all":"none"}s.style.width=`${o.width*S}px`,s.style.height=`${o.height*S}px`;for(let h=0;h<o.height;h++)for(let b=0;b<o.width;b++){const f=c[h]?.[b];f&&(f.style.left=`${b*S}px`,f.style.top=`${h*S}px`,f.style.width=`${S}px`,f.style.height=`${S}px`)}s.querySelectorAll("[data-annotation]").forEach(h=>h.remove());for(const[h,b]of i.annotations.x){const f=document.createElement("div");f.setAttribute("data-testid",`cell-annotation-x-${h}-${b}`),f.setAttribute("data-annotation","x"),f.style.cssText=`position:absolute;left:${h*S}px;top:${b*S}px;width:${S}px;height:${S}px;pointer-events:none;`,s.appendChild(f)}for(const[h,b]of Object.entries(i.annotations.candidates)){if(!b.length)continue;const[f,$]=h.split(",").map(Number),y=document.createElement("div");y.setAttribute("data-testid",`cell-annotation-candidates-${f}-${$}`),y.setAttribute("data-annotation","candidates"),y.setAttribute("data-candidates",b.join(",")),y.style.cssText=`position:absolute;left:${f*S}px;top:${$*S}px;width:${S}px;height:${S}px;pointer-events:none;`,s.appendChild(y)}}function d(){document.removeEventListener("click",g),s.remove(),G()}return u(),{updateOverlays:u,detach:d}}function Sn(e){let t=0;for(let r=0;r<e.length;r++)t=t*31+e.charCodeAt(r)&65535;const a=[0,30,60,120,180,210,270,300];return`hsl(${a[t%a.length]}, 65%, 40%)`}function Tn(e,t,a,r,n,o,s){const c=n(),p=Array.from(c.placements.entries()).find(([,w])=>w.x===e&&w.y===t),g=new Set(c.placements.keys()),u=o.suspects.filter(w=>!g.has(w.id)),d=[];for(const w of u)d.push({label:w.name.charAt(0).toUpperCase(),sublabel:`Place ${w.name}`,testid:`suspect-option-${w.id}`,color:Sn(w.id),onClick:()=>s.onPlace(w.id,e,t)});const i=c.annotations.x.some(([w,m])=>w===e&&m===t);d.push({label:"✕",sublabel:i?"Clear X":"Mark X",testid:"suspect-option-markx",color:i?"#5a1a1a":"#3a1a1a",onClick:()=>s.onToggleX(e,t)}),u.length>0&&d.push({label:"?",sublabel:"Mark candidate",testid:"suspect-option-candidates",color:"#1a3a5a",onClick:()=>En(e,t,a,r,n,o,s)}),p&&d.push({label:"↩",sublabel:"Remove",testid:"suspect-option-clear",color:"#2a2a2a",onClick:()=>s.onRemove(p[0])}),d.length&&pt(a,r,d)}function En(e,t,a,r,n,o,s){const c=n(),p=new Set(c.placements.keys()),g=c.annotations.candidates[`${e},${t}`]??[],u=[];for(const d of o.suspects){if(p.has(d.id))continue;const i=g.includes(d.id);u.push({label:d.name.charAt(0).toUpperCase()+"?",sublabel:i?`Remove ${d.name}?`:`Maybe ${d.name}`,testid:`suspect-option-candidate-${d.id}`,color:i?"#2a2a5a":"#1a1a3a",onClick:()=>i?s.onRemoveCandidate(d.id,e,t):s.onAddCandidate(d.id,e,t)})}u.length&&pt(a,r,u)}function Rn(e){return`${e.seed}-${e.themeId}-${e.difficulty}`}function Nn(e){const t=new URLSearchParams(location.search),a=t.get("theme")??"coffee-shop",r=t.get("difficulty")??"easy",n=parseInt(t.get("seed")??"0",10),o=t.get("mode"),s=t.get("campaignSlot"),c=t.get("campaignCase"),p=s?parseInt(s,10):null,g=c?parseInt(c,10):null,u=ht(a),d=Rt(n,u,r),i=Rn(d),w=Mn(),m=w.querySelector(".alibi-canvas-wrapper"),h=w.querySelector(".alibi-sidebar-container"),b=document.getElementById("game-canvas"),f=b.getContext("2d");b.style.imageRendering="pixelated";function $(){Ra(d.floorPlan.width,d.floorPlan.height);const{width:k,height:R}=Ba(d);b.width=k,b.height=R,b.style.width=`${k}px`,b.style.height=`${R}px`,T()}m.appendChild(b);let y=Je();const F=new en;let v=Date.now(),x=0;function E(){return Date.now()-v+x}function B(k,R){const A={};R.placements.forEach((W,Y)=>{A[Y]={x:W.x,y:W.y}}),sn({key:k,placements:A,elapsedMs:E(),savedAt:new Date().toISOString(),annotations:R.annotations})}function T(){Pa(f,d,u,y.placements,y.victimCell,y.annotations,()=>T()),Da(h,d,y.placements,y.satisfiedClues,y.errorClues),U.updateOverlays()}const U=Cn(m,d,u,()=>y,{onPlace(k,R,A){y.phase==="playing"&&(F.push(q(y)),y=Ua(y,d,k,R,A),y=Xa(y,k,R,A),B(i,y),pe(y.satisfiedClues.size>0?"clue-satisfied":"place"),T())},onRemove(k){y.phase==="playing"&&(F.push(q(y)),y=Ga(y,d,k),B(i,y),pe("remove"),T())},onVictimClick(){if(y.phase!=="playing")return;const k=Ka(y);if(k.phase==="guilty"){y=k;const R=E();if(Xe(i),pe("solve"),T(),Va(document.body,d),p!==null&&g!==null){const A=ie(p);if(A){const W=$n(A,g,R,d.killer.name);ze(W),setTimeout(()=>{window.location.href=`${window.location.pathname}?mode=campaign&campaignSlot=${p}`},3e3)}}else if(o==="daily"){const A=De();if(Re(A)?.solved??!1){const Y=Ne();Se(d,R,Y)}else{cn({date:A,solved:!0,solveTimeMs:R,killerName:d.killer.name});const Y=An(A),yt=Re(Y)?.solved??!1,wt=Ne(),He=yt?wt+1:1;dn(He),et(d.themeId,d.difficulty,R),Se(d,R,He)}}else et(d.themeId,d.difficulty,R),Se(d,R,0)}else pe("error"),T(),_a(document.body)},onToggleX(k,R){y.phase==="playing"&&(F.push(q(y)),y=qa(y,k,R),B(i,y),T())},onAddCandidate(k,R,A){y.phase==="playing"&&(F.push(q(y)),y=Za(y,R,A,k),B(i,y),T())},onRemoveCandidate(k,R,A){y.phase==="playing"&&(F.push(q(y)),y=Ja(y,R,A,k),B(i,y),T())}}),O=w.querySelector('[data-testid="btn-undo"]'),N=w.querySelector('[data-testid="btn-redo"]');O.addEventListener("click",L),N.addEventListener("click",P);function L(){const k=F.undo(q(y));k&&(y=ke(y,d,k),T())}function P(){const k=F.redo(q(y));k&&(y=ke(y,d,k),T())}const M=w.querySelector('[data-testid="btn-mute"]');M.addEventListener("click",()=>{const k=an();M.textContent=k?"🔇":"🔊"}),document.addEventListener("keydown",k=>{(k.ctrlKey||k.metaKey)&&k.key==="z"&&!k.shiftKey&&(L(),k.preventDefault()),(k.ctrlKey||k.metaKey)&&(k.key==="y"||k.key==="z"&&k.shiftKey)&&(P(),k.preventDefault())});const H=ln(i);H&&Object.keys(H.placements).length>0?Pn(w,()=>{const k=new Map(Object.entries(H.placements).map(([W,Y])=>[W,{suspectId:W,x:Y.x,y:Y.y}])),R=H.annotations??{x:[],candidates:{}},A={placements:k,annotations:R};y=ke(Je(),d,A),x=H.elapsedMs,v=Date.now(),$(),ve(document.body,d,()=>{})},()=>{Xe(i),ve(document.body,d,()=>{})}):ve(document.body,d,()=>{}),$(),new ResizeObserver(()=>$()).observe(document.body)}const Wn=`
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
`;let it=!1;function In(){if(it)return;const e=document.createElement("style");e.textContent=Wn,document.head.appendChild(e),it=!0}function Mn(){In();const e=document.createElement("div");e.setAttribute("data-testid","screen-game"),e.className="alibi-game-screen";const t=document.createElement("div");t.className="alibi-grid-panel",t.style.cssText="flex:1;display:flex;align-items:center;justify-content:center;padding:16px;overflow:hidden;";const a=document.createElement("div");a.className="alibi-canvas-wrapper",t.appendChild(a);const r=document.createElement("div");r.style.cssText="display:flex;flex-direction:column;height:100vh;width:280px;flex-shrink:0;";const n=document.createElement("div");n.className="alibi-toolbar";const o=Ce("btn-undo","↩ Undo"),s=Ce("btn-redo","↪ Redo"),c=Ce("btn-mute","🔊");n.append(o,s,c);const p=document.createElement("div");p.className="alibi-sidebar-container",r.append(n,p),e.append(t,r);const g=document.getElementById("game-canvas");return g.parentElement?.insertBefore(e,g),e}function Ce(e,t){const a=document.createElement("button");return a.setAttribute("data-testid",e),a.textContent=t,a}function Se(e,t,a){const r=new URLSearchParams(location.search).get("mode")==="daily",n=document.createElement("button");n.setAttribute("data-testid","btn-share"),n.style.cssText='position:fixed;bottom:24px;right:24px;z-index:300;background:#c0392b;color:#fff;border:2px solid #ff5a47;border-radius:0;padding:10px 20px;font-family:"Press Start 2P",monospace;font-size:11px;cursor:pointer;box-shadow:3px 3px 0 #6b0000;',n.textContent="📋 Share Result",n.addEventListener("click",async()=>{const o=r&&a>0?on(e,t,a):nn(e,t),s=await rn(o);n.textContent=s?"✓ Copied!":"📋 Share Result",s&&setTimeout(()=>{n.textContent="📋 Share Result"},2e3)}),document.body.appendChild(n)}function An(e){const t=new Date(e+"T12:00:00Z");return t.setUTCDate(t.getUTCDate()-1),`${t.getUTCFullYear()}-${String(t.getUTCMonth()+1).padStart(2,"0")}-${String(t.getUTCDate()).padStart(2,"0")}`}function Pn(e,t,a){const r=document.createElement("div");r.setAttribute("data-testid","prompt-resume"),r.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:150;font-family:"Press Start 2P",monospace;';const n=document.createElement("div");n.style.cssText="background:#0a0a12;border:3px solid #c0392b;border-radius:0;box-shadow:4px 4px 0 #6b0000;padding:28px;max-width:360px;text-align:center;color:#fff;";const o=document.createElement("h2");o.style.cssText='color:#c0392b;margin-bottom:16px;font-family:"Press Start 2P",monospace;font-size:0.75em;line-height:1.6;',o.textContent="Resume?";const s=document.createElement("p");s.style.cssText='color:#aaa;margin-bottom:20px;font-family:"Press Start 2P",monospace;font-size:0.45em;line-height:2;',s.textContent="Continue your in-progress case?";const c=document.createElement("button");c.style.cssText='background:#c0392b;color:#fff;border:2px solid #ff5a47;border-radius:0;padding:9px 20px;font-family:"Press Start 2P",monospace;font-size:9px;cursor:pointer;margin-right:8px;box-shadow:2px 2px 0 #6b0000;',c.textContent="Resume",c.addEventListener("click",()=>{r.remove(),t()});const p=document.createElement("button");p.style.cssText='background:#1a1a2e;color:#fff;border:2px solid #555;border-radius:0;padding:9px 20px;font-family:"Press Start 2P",monospace;font-size:9px;cursor:pointer;box-shadow:2px 2px 0 #000;',p.textContent="Start Fresh",p.addEventListener("click",()=>{r.remove(),a()}),n.append(o,s,c,p),r.appendChild(n),e.appendChild(r)}const Bn=`
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
`;let ot=!1;function On(){if(ot)return;const e=document.createElement("style");e.textContent=Bn,document.head.appendChild(e),ot=!0}function jn(){On();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-home"),t.className="alibi-home";const a=document.createElement("div");a.className="alibi-home-eyebrow",a.textContent="— A Mystery Awaits —";const r=document.createElement("div");r.className="alibi-home-title",r.textContent="ALIBI";const n=document.createElement("div");n.className="alibi-home-subtitle",n.textContent=`Murder Mystery
Deduction`;const o=document.createElement("div");o.className="alibi-home-buttons",o.appendChild(Te("btn-campaign","primary","📁 Campaign","12 escalating cases")),o.appendChild(Te("btn-quickplay","secondary","🎲 Quick Play","Pick theme + difficulty"));const{themeId:s,difficulty:c}=at(),p=Ne(),g=Re(De())?.solved??!1,u=s.replace(/-/g," ").replace(/\b\w/g,h=>h.toUpperCase()),d=p>0?`🔥 ${p} day${p!==1?"s":""}`:"Start your streak",i=g?`✅ Solved · ${d}`:`${u} · ${c}`,w=Te("btn-daily","secondary","📅 Daily Case",i),m=document.createElement("span");m.setAttribute("data-testid","daily-streak"),m.style.display="none",m.textContent=String(p),w.appendChild(m),o.appendChild(w),t.append(a,r,n,o),document.body.appendChild(t),t.querySelector('[data-testid="btn-quickplay"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=quickplay`}),t.querySelector('[data-testid="btn-campaign"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=campaign`}),t.querySelector('[data-testid="btn-daily"]').addEventListener("click",()=>{t.remove();const{seed:h,themeId:b,difficulty:f}=at();window.location.href=`${window.location.pathname}?theme=${b}&difficulty=${f}&seed=${h}&mode=daily`})}function Te(e,t,a,r){const n=document.createElement("button");n.setAttribute("data-testid",e),n.className=`alibi-home-btn ${t}`;const o=document.createElement("span");o.className="btn-title",o.textContent=a;const s=document.createElement("span");return s.className="btn-desc",s.textContent=r,n.append(o,s),n}const Ln=`
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
`,bt={rookie:"🔍 Rookie",investigator:"🔎 Investigator",detective:"🕵 Detective",senior:"🕵️ Senior Detective",chief:"⭐ Chief Inspector"};let rt=!1;function zn(){if(rt)return;const e=document.createElement("style");e.textContent=Ln,document.head.appendChild(e),rt=!0}function Dn(e){const t=Math.floor(e/1e3),a=Math.floor(t/60),r=t%60;return`${a}:${r.toString().padStart(2,"0")}`}function Hn(e){try{return ht(e).name}catch{return e}}function we(e,t){t.innerHTML="";const a=document.createElement("div");a.className="alibi-campaign-header";const r=document.createElement("button");r.className="alibi-campaign-back",r.textContent="← Home",r.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="📁 Campaign";const o=document.createElement("div");o.className="alibi-campaign-rank",o.textContent=bt[e.rank]??e.rank,a.append(r,n,o);const s=document.createElement("div");s.className="alibi-case-grid",e.cases.forEach((c,p)=>{const g=c.status==="in_progress"||c.status==="solved",u=c.status==="solved",d=c.status==="locked",i=document.createElement("div");i.setAttribute("data-testid",`case-card-${p}`);let w="alibi-case-card";d&&(w+=" locked"),u&&(w+=" solved"),!d&&!u&&(w+=" unlocked"),i.className=w;const m=document.createElement("div");m.className="alibi-case-num",m.textContent=`Case ${p+1}`;const h=document.createElement("div");h.className="alibi-case-title",h.textContent=g?Hn(c.themeId):"???";const b=document.createElement("div");b.className=`alibi-case-difficulty ${c.difficulty}`,b.textContent=c.difficulty.charAt(0).toUpperCase()+c.difficulty.slice(1);const f=document.createElement("div");if(f.setAttribute("data-testid",`case-status-${p}`),f.className=`alibi-case-status${d?" locked":""}`,f.textContent=u?"✅":d?"🔒":"📁",i.append(m,h,b,f),u&&c.solveTimeMs!=null){const $=document.createElement("div");$.className="alibi-case-time",$.textContent=`⏱ ${Dn(c.solveTimeMs)}`,i.appendChild($)}d||i.addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?theme=${c.themeId}&difficulty=${c.difficulty}&seed=${c.seed}&campaignSlot=${e.slot}&campaignCase=${p}`}),s.appendChild(i)}),t.append(a,s)}function Vn(e,t){t.innerHTML="";const a=document.createElement("div");a.className="alibi-campaign-header";const r=document.createElement("button");r.className="alibi-campaign-back",r.textContent="← Home",r.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="📁 Campaign",a.append(r,n);const o=document.createElement("div");o.className="alibi-slot-picker";const s=document.createElement("h2");s.textContent="Choose Save Slot",o.appendChild(s),e.forEach((c,p)=>{const g=p+1,u=document.createElement("div");u.setAttribute("data-testid",`slot-card-${g}`),u.className=`alibi-slot-card${c?"":" empty"}`;const d=document.createElement("div");d.className="alibi-slot-info";const i=document.createElement("div");if(i.className="alibi-slot-label",i.textContent=`Save Slot ${g}`,d.appendChild(i),c){const m=document.createElement("div");m.className="alibi-slot-rank",m.textContent=bt[c.rank]??c.rank;const h=c.cases.filter(f=>f.status==="solved").length,b=document.createElement("div");b.className="alibi-slot-progress",b.textContent=`Case ${c.currentCase+1} of 12 · ${h} solved · ${new Date(c.startedAt).toLocaleDateString()}`,d.append(m,b)}else{const m=document.createElement("div");m.className="alibi-slot-rank",m.textContent="Empty",d.appendChild(m)}const w=document.createElement("div");w.className="alibi-slot-action",w.textContent=c?"Continue →":"New →",u.append(d,w),u.addEventListener("click",()=>{if(c)we(c,t);else{const m=ut(g);ze(m),we(m,t)}}),o.appendChild(u)}),t.append(a,o)}function _n(){zn();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-campaign-board"),t.className="alibi-campaign-board",document.body.appendChild(t);const a=ie(1),r=ie(2),n=ie(3);if(a??r??n){const c=new URLSearchParams(location.search).get("campaignSlot");if(c){const p=parseInt(c,10),g=ie(p);if(g){we(g,t);return}}Vn([a,r,n],t)}else{const s=ut(1);ze(s),we(s,t)}}const Yn=`
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
`,Un={"coffee-shop":"☕",bookstore:"📚",backyard:"🌿","holiday-mall":"🎄",restaurant:"🍽",gym:"💪",office:"🏢","garden-party":"🌸",hospital:"🏥",carnival:"🎡"};let st=!1;function Gn(){if(st)return;const e=document.createElement("style");e.textContent=Yn,document.head.appendChild(e),st=!0}function Kn(){Gn();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-theme-select"),t.className="alibi-theme-select";const a=document.createElement("div");a.className="alibi-theme-select-header";const r=document.createElement("button");r.className="alibi-theme-back",r.textContent="← Home",r.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="🎲 Quick Play",a.append(r,n);let o="easy";const s=document.createElement("div");s.className="alibi-difficulty-row";const c={};for(const[i,w]of[["easy","Easy"],["medium","Medium"],["hard","Hard"]]){const m=document.createElement("button");m.setAttribute("data-testid",`difficulty-${i}`),m.className=`alibi-diff-btn ${i}${i==="easy"?" selected":""}`,m.textContent=w,m.addEventListener("click",()=>{o=i,Object.values(c).forEach(h=>h.classList.remove("selected")),m.classList.add("selected")}),c[i]=m,s.appendChild(m)}let p=null;const g=document.createElement("div");g.className="alibi-theme-grid";const u={};for(const i of Ea()){if(i.id==="stub")continue;const w=document.createElement("div");w.setAttribute("data-testid",`theme-card-${i.id}`),w.className="alibi-theme-card";const m=document.createElement("div");m.className="alibi-theme-icon",m.textContent=Un[i.id]??"🔍";const h=document.createElement("div");h.textContent=i.name.replace(/^The /,""),w.append(m,h),w.addEventListener("click",()=>{p=i.id,Object.values(u).forEach(b=>b.classList.remove("selected")),w.classList.add("selected"),d.disabled=!1}),u[i.id]=w,g.appendChild(w)}const d=document.createElement("button");d.setAttribute("data-testid","btn-play"),d.className="alibi-play-btn",d.textContent="Play",d.disabled=!0,d.addEventListener("click",()=>{if(!p)return;const i=Math.floor(Math.random()*4294967295);t.remove(),window.location.href=`${window.location.pathname}?theme=${p}&difficulty=${o}&seed=${i}`}),t.append(a,s,g,d),document.body.appendChild(t)}const be=new URLSearchParams(location.search);if(be.has("theme")||be.has("difficulty")||be.has("seed"))Nn();else switch(be.get("mode")){case"campaign":_n();break;case"quickplay":Kn();break;default:jn();break}

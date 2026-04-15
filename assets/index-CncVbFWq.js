var Ae=Object.defineProperty;var Le=(e,t,a)=>t in e?Ae(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var U=(e,t,a)=>Le(e,typeof t!="symbol"?t+"":t,a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const Me=new Set(["F","C","S","B"]);function B(e){return Me.has(e)}function z(e){return e==="C"||e==="S"||e==="B"}function oe(e){const t=[];for(let a=0;a<e.width;a++)for(let o=0;o<e.height;o++)if(B(e.tiles[o][a])){t.push(a);break}return t}function ie(e){const t=[];for(let a=0;a<e.height;a++)for(let o=0;o<e.width;o++)if(B(e.tiles[a][o])){t.push(a);break}return t}function R(e,t,a){for(const o of e.rooms)for(const[n,i]of o.cells)if(n===t&&i===a)return o.id;return null}function Ie(e){const t=new Set,a=new Set;for(const o of e)t.add(o.y),a.add(o.x);return{blockedRows:t,blockedCols:a}}function Pe(e,t){const{blockedRows:a,blockedCols:o}=Ie(t),n=[];for(let i=0;i<e.height;i++)if(!a.has(i))for(let s=0;s<e.width;s++)o.has(s)||B(e.tiles[i][s])&&n.push({x:s,y:i});return n.length===1?n[0]:null}function ze(e,t,a){const o=R(e,a.x,a.y);if(o===null)return null;for(const n of t)if(R(e,n.x,n.y)===o)return n.suspectId;return null}function he(e,t,a,o){return Math.max(Math.abs(e-a),Math.abs(t-o))}function ae(e,t,a){const o=a.get(t.suspectId);if(!o)return null;switch(t.type){case"inRoom":return R(e,o.x,o.y)===t.roomId;case"notInRoom":return R(e,o.x,o.y)!==t.roomId;case"inSameRoom":{const n=a.get(t.otherSuspectId);if(!n)return null;const i=R(e,o.x,o.y),s=R(e,n.x,n.y);return i!==null&&i===s}case"inDifferentRoom":{const n=a.get(t.otherSuspectId);if(!n)return null;const i=R(e,o.x,o.y),s=R(e,n.x,n.y);return i===null||s===null?null:i!==s}case"inColumn":return o.x===t.col;case"inRow":return o.y===t.row;case"besideSuspect":{const n=a.get(t.otherSuspectId);return n?he(o.x,o.y,n.x,n.y)<=1:null}case"notBesideSuspect":{const n=a.get(t.otherSuspectId);return n?he(o.x,o.y,n.x,n.y)>1:null}case"besideObject":{for(let n=-1;n<=1;n++)for(let i=-1;i<=1;i++){if(i===0&&n===0)continue;const s=o.x+i,r=o.y+n;if(!(s<0||r<0||s>=e.width||r>=e.height)&&e.tiles[r][s]===t.objectTile)return!0}return!1}case"notBesideObject":{for(let n=-1;n<=1;n++)for(let i=-1;i<=1;i++){if(i===0&&n===0)continue;const s=o.x+i,r=o.y+n;if(!(s<0||r<0||s>=e.width||r>=e.height)&&e.tiles[r][s]===t.objectTile)return!1}return!0}case"onSeatTile":return z(e.tiles[o.y][o.x]);case"notOnSeatTile":return!z(e.tiles[o.y][o.x]);case"northOf":{const n=a.get(t.otherSuspectId);return n?o.y<n.y:null}case"southOf":{const n=a.get(t.otherSuspectId);return n?o.y>n.y:null}case"exactlyNRowsNorth":{const n=a.get(t.otherSuspectId);return n?n.y-o.y===t.n:null}case"exactlyNRowsSouth":{const n=a.get(t.otherSuspectId);return n?o.y-n.y===t.n:null}}}const He={easy:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom"],medium:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile"],hard:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile","notOnSeatTile","northOf","southOf","exactlyNRowsNorth","exactlyNRowsSouth"]};function Z(e,t,a){const o=oe(e),n=ie(e);if(t.length===0)return{count:0};if(t.length>Math.min(o.length,n.length))return{count:0};const i=new Set;for(let c=0;c<e.height;c++)for(let f=0;f<e.width;f++)B(e.tiles[c][f])&&i.add(`${f},${c}`);let s=0,r;const p=new Map,u=new Set,d=new Set;function m(c){if(s>=2)return;if(c===t.length){for(const b of a)if(ae(e,b,p)!==!0)return;s++,s===1&&(r=new Map(p));return}const f=t[c];for(const b of n)if(!u.has(b))for(const l of o){if(d.has(l)||!i.has(`${l},${b}`))continue;const h={suspectId:f,x:l,y:b};p.set(f,h),u.add(b),d.add(l);let F=!1;for(const w of a)if((w.suspectId===f||w.otherSuspectId===f)&&ae(e,w,p)===!1){F=!0;break}if(F||m(c+1),p.delete(f),u.delete(b),d.delete(l),s>=2)return}}return m(0),{count:s,firstSolution:r}}class Ve extends Error{constructor(t){super(t),this.name="PuzzleGenerationError"}}function De(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let a=Math.imul(t^t>>>15,1|t);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}function Oe(e,t){return Math.floor(e()*t)}function C(e,t){return t[Oe(e,t.length)]}function _(e,t){const a=[...t];for(let o=a.length-1;o>0;o--){const n=Oe(e,o+1);[a[o],a[n]]=[a[n],a[o]]}return a}function _e(e,t,a,o){const n=He[a],i=o.landmarks.length>=2,s=o.tiles.some(d=>d.some(m=>z(m))),r=n.filter(d=>!((d==="besideObject"||d==="notBesideObject")&&!i||(d==="onSeatTile"||d==="notOnSeatTile")&&!s)),p=Math.ceil(t*.4),u=[];for(let d=0;d<t;d++){const m=new Set;u.length>0&&m.add(u[u.length-1]);for(const h of r)u.filter(w=>w===h).length>=p&&m.add(h);const c=r.filter(h=>!m.has(h)),f=c.length>0?c:r,b=f.filter(h=>!u.includes(h)),l=b.length>0?b:f;u.push(C(e,l))}return u}function L(e,t,a,o,n,i,s){const r=s.get(n.id),p=a.clueTemplates;switch(o){case"inRoom":{const u=R(t,r.x,r.y);if(!u)return null;const d=t.rooms.find(m=>m.id===u);return{type:"inRoom",suspectId:n.id,roomId:u,text:p.inRoom(n.name,d.name)}}case"notInRoom":{const u=R(t,r.x,r.y),d=t.rooms.filter(c=>c.id!==u);if(d.length===0)return null;const m=C(e,d);return{type:"notInRoom",suspectId:n.id,roomId:m.id,text:p.notInRoom(n.name,m.name)}}case"inSameRoom":{const u=R(t,r.x,r.y);if(!u)return null;const d=i.filter(c=>{if(c.id===n.id)return!1;const f=s.get(c.id);return R(t,f.x,f.y)===u});if(d.length===0)return null;const m=C(e,d);return{type:"inSameRoom",suspectId:n.id,otherSuspectId:m.id,text:p.inSameRoom(n.name,m.name)}}case"inDifferentRoom":{const u=R(t,r.x,r.y),d=i.filter(c=>{if(c.id===n.id)return!1;const f=s.get(c.id),b=R(t,f.x,f.y);return b!==null&&b!==u});if(d.length===0)return null;const m=C(e,d);return{type:"inDifferentRoom",suspectId:n.id,otherSuspectId:m.id,text:p.inDifferentRoom(n.name,m.name)}}case"inColumn":return{type:"inColumn",suspectId:n.id,col:r.x,text:p.inColumn(n.name,r.x+1)};case"inRow":return{type:"inRow",suspectId:n.id,row:r.y,text:p.inRow(n.name,r.y+1)};case"besideSuspect":{const u=i.filter(m=>{if(m.id===n.id)return!1;const c=s.get(m.id);return Math.max(Math.abs(r.x-c.x),Math.abs(r.y-c.y))<=1});if(u.length===0)return null;const d=C(e,u);return{type:"besideSuspect",suspectId:n.id,otherSuspectId:d.id,text:p.besideSuspect(n.name,d.name)}}case"notBesideSuspect":{const u=i.filter(m=>{if(m.id===n.id)return!1;const c=s.get(m.id);return Math.max(Math.abs(r.x-c.x),Math.abs(r.y-c.y))>1});if(u.length===0)return null;const d=C(e,u);return{type:"notBesideSuspect",suspectId:n.id,otherSuspectId:d.id,text:p.notBesideSuspect(n.name,d.name)}}case"besideObject":{if(t.landmarks.length===0)return null;const u=t.landmarks.filter(c=>Math.max(Math.abs(r.x-c.x),Math.abs(r.y-c.y))<=1);if(u.length===0)return null;const d=C(e,u),m=t.tiles[d.y][d.x];return{type:"besideObject",suspectId:n.id,objectTile:m,text:p.besideObject(n.name,d.name)}}case"notBesideObject":{if(t.landmarks.length===0)return null;const u=t.landmarks.filter(c=>Math.max(Math.abs(r.x-c.x),Math.abs(r.y-c.y))>1);if(u.length===0)return null;const d=C(e,u),m=t.tiles[d.y][d.x];return{type:"notBesideObject",suspectId:n.id,objectTile:m,text:p.notBesideObject(n.name,d.name)}}case"onSeatTile":{const u=t.tiles[r.y][r.x];if(!z(u))return null;const d=u==="C"?"chair":u==="S"?"sofa":"bed";return{type:"onSeatTile",suspectId:n.id,text:p.onSeatTile(n.name,d)}}case"notOnSeatTile":{const u=t.tiles[r.y][r.x];return z(u)?null:{type:"notOnSeatTile",suspectId:n.id,text:p.notOnSeatTile(n.name)}}case"northOf":{const u=i.filter(m=>{if(m.id===n.id)return!1;const c=s.get(m.id);return r.y<c.y});if(u.length===0)return null;const d=C(e,u);return{type:"northOf",suspectId:n.id,otherSuspectId:d.id,text:p.northOf(n.name,d.name)}}case"southOf":{const u=i.filter(m=>{if(m.id===n.id)return!1;const c=s.get(m.id);return r.y>c.y});if(u.length===0)return null;const d=C(e,u);return{type:"southOf",suspectId:n.id,otherSuspectId:d.id,text:p.southOf(n.name,d.name)}}case"exactlyNRowsNorth":{const u=[];for(const m of i){if(m.id===n.id)continue;const f=s.get(m.id).y-r.y;f>0&&u.push({suspect:m,n:f})}if(u.length===0)return null;const d=C(e,u);return{type:"exactlyNRowsNorth",suspectId:n.id,otherSuspectId:d.suspect.id,n:d.n,text:p.exactlyNRowsNorth(n.name,d.suspect.name,d.n)}}case"exactlyNRowsSouth":{const u=[];for(const m of i){if(m.id===n.id)continue;const c=s.get(m.id),f=r.y-c.y;f>0&&u.push({suspect:m,n:f})}if(u.length===0)return null;const d=C(e,u);return{type:"exactlyNRowsSouth",suspectId:n.id,otherSuspectId:d.suspect.id,n:d.n,text:p.exactlyNRowsSouth(n.name,d.suspect.name,d.n)}}}}function Ye(e,t,a,o=1e3){const n=_(e,oe(t)),i=_(e,ie(t)),s=a.length;if(s<1||s>Math.min(n.length,i.length))return null;let r=0;const p=new Map,u=new Set,d=new Set,m=_(e,i).slice(0,s);function c(f){if(f===s)return!0;const b=a[f],l=m[f],h=_(e,n);for(const F of h)if(!d.has(F)&&B(t.tiles[l]?.[F])){if(p.set(b.id,{suspectId:b.id,x:F,y:l}),u.add(l),d.add(F),c(f+1))return!0;if(r++,p.delete(b.id),u.delete(l),d.delete(F),r>=o)return!1}return!1}return c(0)?p:null}function Ke(e,t,a){for(let n=0;n<20;n++){const i=e+n*97>>>0,s=De(i),r=t.floorPlans[a],p=oe(r),u=ie(r),d=Math.min(p.length,u.length)-1;if(d<2)continue;const c=t.suspectNames.slice(0,d).map((g,v)=>({id:`s${v}`,name:g})),f=C(s,t.victimNames),b=Ye(s,r,c);if(!b)continue;const l=Array.from(b.values()),h=Pe(r,l);if(!h)continue;const F=ze(r,l,h);if(!F)continue;const w=c.find(g=>g.id===F),S=C(s,t.narrativeTemplates.intro),O=C(s,t.narrativeTemplates.victimFound),H=C(s,t.narrativeTemplates.guiltyText).replace("{{killerName}}",w.name).replace("{{evidenceText}}","the evidence is conclusive"),V=_e(s,d,a,r),E=[];for(let g=0;g<d;g++){const v=c[g],$=V[g];let k=L(s,r,t,$,v,c,b);k||(k=L(s,r,t,"inRow",v,c,b)),k||(k=L(s,r,t,"inColumn",v,c,b)),k&&E.push(k)}let T=Z(r,c.map(g=>g.id),E);if(T.count!==0){if(T.count!==1)for(const g of c){if(T.count===1)break;if(!E.some($=>$.type==="inRow"&&$.suspectId===g.id)){const $=L(s,r,t,"inRow",g,c,b);$&&E.push($),T=Z(r,c.map(k=>k.id),E)}}if(T.count!==1)for(const g of c){if(T.count===1)break;if(!E.some($=>$.type==="inColumn"&&$.suspectId===g.id)){const $=L(s,r,t,"inColumn",g,c,b);$&&E.push($),T=Z(r,c.map(k=>k.id),E)}}if(T.count===1)return{seed:i,themeId:t.id,difficulty:a,suspects:c,victimName:f,clues:E,solution:b,victimCell:h,killer:w,narrativeIntro:S,narrativeVictimFound:O,narrativeGuilty:H,floorPlan:r}}}throw new Ve(`Failed to generate unique puzzle after 20 retries (seed=${e}, theme=${t.id}, difficulty=${a})`)}const Ge={width:5,height:6,tiles:[["bB","bB","bB","W","W"],["F","F","F","C","F"],["pL","F","C","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"],["W","cR","W","F","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[3,1],[4,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"restroom",name:"Restroom",cells:[[1,5],[3,5],[4,5]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-entrance",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},qe={width:6,height:7,tiles:[["bB","bB","bB","bB","W","W"],["F","F","F","F","C","F"],["pL","F","C","F","F","F"],["F","S","F","pL","F","C"],["F","F","tB","F","F","F"],["C","F","F","F","W","F"],["W","cR","W","W","W","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5]]},{id:"restroom",name:"Restroom",cells:[[1,6],[5,5],[5,6]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-door",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:3,y:3},{id:"table",name:"the table",x:2,y:4},{id:"cash-register",name:"the cash register",x:1,y:6}]},Ue={width:7,height:8,tiles:[["bB","bB","bB","bB","bB","W","W"],["F","F","F","F","F","C","F"],["F","C","F","pL","F","F","F"],["pL","F","S","F","C","F","pL"],["F","F","F","tB","F","F","F"],["F","C","F","F","F","tB","C"],["F","F","F","F","F","W","F"],["W","cR","W","F","C","W","F"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]]},{id:"main-area",name:"Main Area",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[6,6]]},{id:"restroom",name:"Restroom",cells:[[1,7]]},{id:"back-office",name:"Back Office",cells:[[3,7],[4,7],[6,7]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-1",name:"the plant",x:3,y:2},{id:"plant-2",name:"the plant",x:0,y:3},{id:"plant-3",name:"the plant",x:6,y:3},{id:"table",name:"the table",x:3,y:4},{id:"table-2",name:"the small table",x:5,y:5},{id:"cash-register",name:"the cash register",x:1,y:7}]},Ze={width:5,height:5,tiles:[["sH","F","W","sH","sH"],["F","F","W","F","F"],["sH","F","tB","F","sH"],["F","F","F","F","F"],["F","cR","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[2,3]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,3],[4,3]]},{id:"checkout",name:"Checkout",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:3,y:0},{id:"shelf-3",name:"the shelf",x:4,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:4,y:2},{id:"table",name:"the table",x:2,y:2},{id:"cash-register",name:"the cash register",x:1,y:4}]},Je={width:6,height:6,tiles:[["sH","F","W","W","sH","sH"],["F","F","W","F","F","F"],["sH","F","F","F","F","sH"],["F","F","W","F","tB","F"],["F","F","F","F","F","F"],["F","cR","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,2],[3,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,1],[4,1],[5,1],[3,2],[4,2],[5,2],[4,3],[5,3]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,4],[4,4],[5,4]]},{id:"checkout",name:"Checkout",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:4,y:0},{id:"shelf-3",name:"the shelf",x:5,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:5,y:2},{id:"table",name:"the table",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},Xe={width:7,height:7,tiles:[["sH","F","F","W","sH","sH","sH"],["F","F","sH","W","F","F","F"],["sH","F","F","tB","F","F","sH"],["F","F","W","W","F","tB","F"],["sH","F","F","F","F","F","F"],["F","F","F","F","F","F","sH"],["F","cR","C","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,1],[3,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"romance-novels",name:"Romance Novels",cells:[[4,3],[5,3],[6,3],[3,4],[4,4],[5,4],[6,4],[3,5],[4,5],[5,5]]},{id:"collectors",name:"Collector's Corner",cells:[[6,5]]},{id:"checkout",name:"Checkout",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"shelf-crime",name:"the shelf",x:0,y:0},{id:"shelf-nonfic-1",name:"the shelf",x:4,y:0},{id:"shelf-nonfic-2",name:"the shelf",x:5,y:0},{id:"shelf-nonfic-3",name:"the shelf",x:6,y:0},{id:"shelf-crime-2",name:"the shelf",x:0,y:2},{id:"shelf-nonfic-4",name:"the shelf",x:6,y:2},{id:"table-1",name:"the reading table",x:3,y:2},{id:"table-2",name:"the table",x:5,y:3},{id:"shelf-best",name:"the shelf",x:0,y:4},{id:"shelf-collect",name:"the shelf",x:6,y:5},{id:"cash-register",name:"the cash register",x:1,y:6}]},Qe={width:5,height:5,tiles:[["pL","F","W","jZ","jZ"],["F","F","W","jZ","C"],["pL","F","F","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[3,0],[4,0],[3,1],[4,1]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:0,y:2},{id:"plant-3",name:"the plant",x:4,y:3},{id:"jacuzzi",name:"the jacuzzi",x:3,y:0}]},et={width:6,height:7,tiles:[["pL","F","F","W","jZ","jZ"],["F","F","F","W","jZ","C"],["F","pL","F","F","F","F"],["W","W","W","W","W","W"],["B","F","F","S","F","F"],["F","F","tV","F","F","F"],["F","F","W","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[4,0],[5,0],[4,1],[5,1]]},{id:"deck",name:"Deck",cells:[[3,2],[4,2],[5,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:1,y:2},{id:"jacuzzi",name:"the jacuzzi",x:4,y:0},{id:"tv",name:"the TV",x:2,y:5}]},tt={width:7,height:8,tiles:[["pL","F","F","F","W","jZ","jZ"],["F","F","pL","F","W","jZ","C"],["F","F","F","F","F","C","F"],["W","W","W","W","W","W","W"],["B","F","F","S","F","F","W"],["F","F","tV","F","F","pL","W"],["W","W","W","cT","F","F","W"],["W","W","F","F","F","W","W"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[5,0],[6,0],[5,1],[6,1]]},{id:"deck",name:"Deck",cells:[[4,2],[5,2],[6,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5]]},{id:"kitchen",name:"Kitchen",cells:[[3,6],[4,6],[5,6],[2,7],[3,7],[4,7]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:2,y:1},{id:"plant-3",name:"the plant",x:5,y:5},{id:"jacuzzi",name:"the jacuzzi",x:5,y:0},{id:"tv",name:"the TV",x:2,y:5},{id:"counter",name:"the counter",x:3,y:6}]},at={width:5,height:6,tiles:[["sT","F","F","F","sT"],["F","F","W","F","F"],["F","F","F","F","F"],["tD","F","F","F","sH"],["F","C","F","F","F"],["F","F","W","cR","F"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1]]},{id:"santas-village",name:"Santa's Village",cells:[[2,0],[3,0],[3,1],[0,3],[1,3],[2,3],[0,4],[1,4],[2,4]]},{id:"toy-store",name:"Toy Store",cells:[[4,0],[4,1]]},{id:"walkway",name:"Walkway",cells:[[0,2],[1,2],[2,2],[3,2],[4,2]]},{id:"bookstore",name:"Bookstore",cells:[[3,3],[4,3],[3,4],[4,4]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[0,5],[1,5],[3,5],[4,5]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:4,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:3},{id:"shelf",name:"the shelf",x:4,y:3},{id:"cash-register",name:"the cash register",x:3,y:5}]},nt={width:7,height:7,tiles:[["sT","F","F","W","F","F","sT"],["F","F","W","F","F","F","F"],["F","F","F","F","F","W","F"],["F","F","F","F","F","F","F"],["tD","F","F","W","F","sH","F"],["F","C","F","W","F","F","C"],["F","F","W","F","cR","F","F"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"santas-village",name:"Santa's Village",cells:[[3,1],[4,1],[5,1],[6,1],[3,2],[4,2],[5,2]]},{id:"santas-lodge",name:"Santa's Lodge",cells:[[4,0],[5,0],[6,0]]},{id:"toy-store",name:"Toy Store",cells:[[6,2],[5,3],[6,3],[4,4],[5,4],[6,4],[5,5],[6,5]]},{id:"walkway",name:"Walkway",cells:[[0,3],[1,3],[2,3],[3,3],[4,3]]},{id:"food-court",name:"Food Court",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[0,6],[1,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:6,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:4},{id:"shelf",name:"the shelf",x:5,y:4},{id:"cash-register",name:"the cash register",x:4,y:6}]},ot={width:8,height:8,tiles:[["sT","F","F","W","F","F","F","sT"],["F","F","W","F","F","F","F","F"],["F","F","F","F","F","W","F","F"],["F","F","F","F","F","F","F","F"],["tD","F","F","W","F","sH","F","F"],["F","C","F","W","F","F","C","F"],["F","F","W","F","cR","F","F","F"],["F","F","F","F","F","F","F","tR"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[0,3],[1,3]]},{id:"santas-lodge",name:"Santa's Lodge",cells:[[4,0],[5,0],[6,0],[7,0],[4,1],[5,1],[6,1],[7,1]]},{id:"santas-village",name:"Santa's Village",cells:[[3,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]]},{id:"toy-store",name:"Toy Store",cells:[[6,2],[7,2],[6,3],[7,3],[6,4],[7,4],[6,5],[7,5]]},{id:"walkway",name:"Walkway",cells:[[2,2],[2,3],[2,4],[3,4],[4,4],[2,5],[2,6]]},{id:"food-court",name:"Food Court",cells:[[0,4],[1,4],[0,5],[1,5],[0,6],[1,6],[0,7],[1,7],[2,7]]},{id:"bookstore",name:"Bookstore",cells:[[5,4],[5,5],[4,6],[5,6],[6,6],[7,6]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[3,6],[3,7],[4,7],[5,7],[6,7],[7,7]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:7,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:4},{id:"shelf",name:"the shelf",x:5,y:4},{id:"cash-register",name:"the cash register",x:4,y:6},{id:"tree",name:"the Christmas tree",x:7,y:7}]},it={width:5,height:5,tiles:[["cT","cT","W","F","C"],["F","F","W","F","F"],["F","C","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"dining-room",name:"Dining Room",cells:[[3,0],[4,0],[3,1],[4,1],[2,2],[3,2],[4,2]]},{id:"bar",name:"Bar",cells:[[2,1]]},{id:"restroom",name:"Restroom",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0}]},st={width:6,height:6,tiles:[["cT","cT","cT","W","F","C"],["F","F","F","W","F","F"],["F","C","F","F","F","F"],["F","F","F","F","C","F"],["W","W","W","W","W","W"],["F","F","F","C","F","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},{id:"dining-room",name:"Dining Room",cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]]},{id:"bar",name:"Bar",cells:[[3,1]]},{id:"private-room",name:"Private Room",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0},{id:"counter-3",name:"the counter",x:2,y:0}]},rt={width:7,height:7,tiles:[["cT","cT","cT","cT","W","F","C"],["F","F","F","F","W","F","F"],["F","C","F","F","F","F","F"],["F","F","F","F","C","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","C","F","F","C","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"dining-room",name:"Dining Room",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3],[4,4],[5,4],[6,4]]},{id:"bar",name:"Bar",cells:[[4,1],[0,4],[1,4],[2,4],[3,4]]},{id:"restroom",name:"Restroom",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0},{id:"counter-3",name:"the counter",x:2,y:0},{id:"counter-4",name:"the counter",x:3,y:0}]},lt={width:5,height:5,tiles:[["wT","F","W","tM","tM"],["F","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"cardio",name:"Cardio",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"weight-rack",name:"the weight rack",x:0,y:0},{id:"treadmill-1",name:"the treadmill",x:3,y:0},{id:"treadmill-2",name:"the treadmill",x:4,y:0}]},ct={width:6,height:7,tiles:[["wT","F","W","tM","tM","F"],["F","F","W","F","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","jZ","jZ"],["F","C","F","F","jZ","C"],["F","F","W","F","F","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"cardio",name:"Cardio",cells:[[3,0],[4,0],[5,0],[3,1],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"pool",name:"Pool",cells:[[4,4],[5,4],[4,5],[5,5]]},{id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[0,5],[1,5],[2,5],[3,5]]},{id:"sauna",name:"Sauna",cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]}],landmarks:[{id:"weight-rack",name:"the weight rack",x:0,y:0},{id:"treadmill-1",name:"the treadmill",x:3,y:0},{id:"treadmill-2",name:"the treadmill",x:4,y:0},{id:"pool",name:"the pool",x:4,y:4}]},dt={width:7,height:8,tiles:[["wT","wT","F","W","tM","tM","F"],["F","F","F","W","F","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","jZ","jZ","jZ"],["F","C","F","F","jZ","C","jZ"],["F","F","W","F","F","F","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},{id:"cardio",name:"Cardio",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"studio",name:"Studio",cells:[[3,2],[3,3]]},{id:"pool",name:"Pool",cells:[[4,5],[5,5],[6,5],[4,6],[5,6],[6,6]]},{id:"locker-room",name:"Locker Room",cells:[[0,5],[1,5],[2,5],[3,5],[0,6],[1,6],[2,6],[3,6]]},{id:"sauna",name:"Sauna",cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"weight-rack-1",name:"the weight rack",x:0,y:0},{id:"weight-rack-2",name:"the weight rack",x:1,y:0},{id:"treadmill-1",name:"the treadmill",x:4,y:0},{id:"treadmill-2",name:"the treadmill",x:5,y:0},{id:"pool",name:"the pool",x:4,y:5}]},mt={width:5,height:5,tiles:[["dK","F","W","F","C"],["F","F","W","F","F"],["F","C","F","F","F"],["W","W","W","W","W"],["F","F","pC","F","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"meeting-room",name:"Meeting Room",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"kitchen",name:"Kitchen",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"desk",name:"the desk",x:0,y:0},{id:"photocopier",name:"the photocopier",x:2,y:4}]},ht={width:6,height:6,tiles:[["dK","F","F","W","F","C"],["F","F","F","W","F","F"],["F","C","F","F","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","pC","F","F","C","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},{id:"meeting-room",name:"Meeting Room",cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"reception",name:"Reception",cells:[[3,1]]},{id:"kitchen",name:"Kitchen",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"desk",name:"the desk",x:0,y:0},{id:"photocopier",name:"the photocopier",x:1,y:5}]},ut={width:7,height:7,tiles:[["dK","F","F","F","W","F","C"],["F","F","F","F","W","F","F"],["F","C","F","F","F","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","dK","F"],["W","W","W","W","W","W","W"],["F","pC","F","F","C","F","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3],[0,4],[1,4],[2,4],[3,4]]},{id:"meeting-room",name:"Meeting Room",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"server-room",name:"Server Room",cells:[[4,4],[5,4],[6,4]]},{id:"kitchen",name:"Kitchen",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"desk-1",name:"the desk",x:0,y:0},{id:"desk-2",name:"the manager's desk",x:5,y:4},{id:"photocopier",name:"the photocopier",x:1,y:6}]},ft={width:5,height:5,tiles:[["fB","F","F","F","fB"],["F","F","F","F","F"],["pL","F","C","F","pL"],["F","F","F","F","F"],["F","F","fB","F","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[0,2],[1,2],[2,2],[3,2],[4,2]]},{id:"gazebo",name:"Gazebo",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:4,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:4,y:2},{id:"flower-bed-3",name:"the flower bed",x:2,y:4}]},pt={width:6,height:6,tiles:[["fB","F","F","F","F","fB"],["F","F","F","F","F","F"],["pL","F","C","F","C","pL"],["F","F","F","F","F","F"],["F","F","jZ","jZ","F","F"],["F","F","jZ","jZ","fB","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]]},{id:"gazebo",name:"Gazebo",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},{id:"pool-area",name:"Pool Area",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:5,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:5,y:2},{id:"pool",name:"the pool",x:2,y:4},{id:"flower-bed-3",name:"the flower bed",x:4,y:5}]},bt={width:7,height:8,tiles:[["fB","F","F","F","F","F","fB"],["F","F","F","F","F","F","F"],["pL","F","C","F","C","F","pL"],["F","F","F","F","F","F","F"],["F","F","jZ","jZ","jZ","F","F"],["F","F","jZ","jZ","jZ","fB","F"],["fB","F","F","W","F","F","fB"],["F","F","F","W","F","F","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3]]},{id:"pool-area",name:"Pool Area",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5]]},{id:"greenhouse",name:"Greenhouse",cells:[[0,6],[1,6],[2,6],[0,7],[1,7],[2,7]]},{id:"garage",name:"Garage",cells:[[4,6],[5,6],[6,6],[4,7],[5,7],[6,7]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:6,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:6,y:2},{id:"pool",name:"the pool",x:2,y:4},{id:"flower-bed-3",name:"the flower bed",x:5,y:5},{id:"flower-bed-4",name:"the flower bed",x:0,y:6},{id:"flower-bed-5",name:"the flower bed",x:6,y:6}]},yt={width:5,height:5,tiles:[["hB","F","W","F","C"],["hB","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","mC","F","C","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"waiting-room",name:"Waiting Room",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:1,y:4}]},Ft={width:6,height:7,tiles:[["hB","F","F","W","F","C"],["hB","F","F","W","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","mC","F"],["F","C","F","F","F","F"],["F","F","W","F","C","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]]},{id:"operating-theatre",name:"Operating Theatre",cells:[[4,0],[5,0],[4,1],[5,1]]},{id:"waiting-room",name:"Waiting Room",cells:[[3,1]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]},{id:"cafeteria",name:"Cafeteria",cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:4,y:4}]},gt={width:7,height:8,tiles:[["hB","F","F","F","W","F","C"],["hB","hB","F","F","W","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","mC","F","F"],["F","C","F","F","F","F","C"],["F","F","W","F","C","F","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"operating-theatre",name:"Operating Theatre",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"waiting-room",name:"Waiting Room",cells:[[4,1]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]},{id:"cafeteria",name:"Cafeteria",cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"hospital-bed-3",name:"the hospital bed",x:1,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:4,y:5}]},wt={width:5,height:5,tiles:[["cH","F","W","sT","sT"],["cH","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"food-stands",name:"Food Stands",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"ticket-booth",name:"Ticket Booth",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"stall-1",name:"the stall",x:3,y:0},{id:"stall-2",name:"the stall",x:4,y:0}]},xt={width:6,height:7,tiles:[["cH","F","F","W","sT","sT"],["cH","F","F","W","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","F","F"],["F","C","F","F","C","F"],["F","F","W","F","F","F"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,2]]},{id:"food-stands",name:"Food Stands",cells:[[4,0],[5,0],[4,1],[5,1],[4,2],[5,2]]},{id:"funhouse",name:"Funhouse",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},{id:"ticket-booth",name:"Ticket Booth",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"stall-1",name:"the stall",x:4,y:0},{id:"stall-2",name:"the stall",x:5,y:0}]},$t={width:7,height:8,tiles:[["cH","F","F","F","W","sT","sT"],["cH","cH","F","F","W","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","F","F","F"],["F","C","F","F","C","F","F"],["F","F","W","F","F","F","C"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"food-stands",name:"Food Stands",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"funhouse",name:"Funhouse",cells:[[0,5],[1,5],[2,5],[0,6],[1,6],[2,6],[0,7],[1,7]]},{id:"backstage",name:"Backstage",cells:[[3,5],[4,5],[5,5],[6,5],[3,6],[4,6],[5,6],[6,6],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"carousel-horse-3",name:"the carousel horse",x:1,y:1},{id:"stall-1",name:"the stall",x:5,y:0},{id:"stall-2",name:"the stall",x:6,y:0}]},x={"coffee-shop":{easy:Ge,medium:qe,hard:Ue},bookstore:{easy:Ze,medium:Je,hard:Xe},backyard:{easy:Qe,medium:et,hard:tt},"holiday-mall":{easy:at,medium:nt,hard:ot},restaurant:{easy:it,medium:st,hard:rt},gym:{easy:lt,medium:ct,hard:dt},office:{easy:mt,medium:ht,hard:ut},"garden-party":{easy:ft,medium:pt,hard:bt},hospital:{easy:yt,medium:Ft,hard:gt},carnival:{easy:wt,medium:xt,hard:$t}};function ue(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const vt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the café.`,inColumn:(e,t)=>`${e} was in the ${ue(t)} column.`,inRow:(e,t)=>`${e} was in the ${ue(t)} row.`,besideSuspect:(e,t)=>`${e} was standing next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>t==="chair"?`${e} was sitting in a chair.`:t==="sofa"?`${e} was on the sofa.`:`${e} was on the ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},kt={id:"coffee-shop",name:"The Coffee Shop",floorPlans:{easy:x["coffee-shop"].easy,medium:x["coffee-shop"].medium,hard:x["coffee-shop"].hard},suspectNames:["Alice","Ben","Chloe","Diego","Elena","Finlay","Grace","Hassan","Iris","Jake","Kai","Lena"],victimNames:["Victor","Violet","Vera","Valencia","Vance","Vivian"],clueTemplates:vt,narrativeTemplates:{intro:["A body has been found at the Copper Bean Café. The morning rush never arrived — instead, the regulars found yellow tape across the door. You pour yourself an espresso and get to work.","The Copper Bean Café is closed for a very different reason today. Someone is dead, and the witnesses are all still clutching their lattes. You take out your notebook.","It was supposed to be a quiet Tuesday at the Copper Bean. Then the screaming started. Now it's your problem. You order a black coffee and begin."],victimFound:["The victim was discovered near table four, cold cup of coffee still in hand.","Staff found the victim behind the counter during the morning prep.","A regular spotted the victim slumped in the corner booth before opening."],guiltyText:["{{killerName}} — served with a side of motive.","{{killerName}} — the evidence is as clear as an Americano.","{{killerName}} — there's no running from the detective on this one."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:plant":"","object:cash-register":"","object:table":""}};function fe(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Ct={inRoom:(e,t)=>`${e} was browsing in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same section as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different sections.`,inColumn:(e,t)=>`${e} was in the ${fe(t)} column.`,inRow:(e,t)=>`${e} was in the ${fe(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was standing near ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="chair"?`${e} was sitting in a reading chair.`:`${e} was sitting on the ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},St={id:"bookstore",name:"The Bookstore",floorPlans:{easy:x.bookstore.easy,medium:x.bookstore.medium,hard:x.bookstore.hard},suspectNames:["Alex","Bridget","Colin","Diana","Edmund","Fiona","George","Hannah","Ivan","Julia","Kevin","Lydia"],victimNames:["Vincent","Valerie","Violet","Victor","Vera","Valencia"],clueTemplates:Ct,narrativeTemplates:{intro:["The First Chapter Bookshop opened this morning to find more than just dust between the shelves. Someone is dead, and the regulars are still clutching their Earl Grey. You step over the crime scene tape and start asking questions.","A reader never returns a book. This one never returned at all. The First Chapter Bookshop is closed indefinitely — and you're the reason it might reopen. Notebook out.","Mondays at the bookshop are quiet. This Monday is the quietest it's ever been. The body was found in the stacks before the first customer arrived. You're on the case."],victimFound:["The victim was discovered slumped against the shelf in the early morning.","A shop assistant found the victim face-down near the reading table.","The victim was found between the shelves before opening time."],guiltyText:["{{killerName}} — the ending nobody saw coming.","{{killerName}} — the plot twist is on the last page.","{{killerName}} — even mysteries have their answers."]},colorPalette:{floor:"#f0ead6",wall:"#3d2b1f",seat:"#7a5c3a",accent:"#8b1a1a",background:"#1a1510",text:"#ffffff"},spriteMap:{"object:shelf":"","object:table":"","object:cash-register":""}};function pe(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Tt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the yard.`,inColumn:(e,t)=>`${e} was in the ${pe(t)} column.`,inRow:(e,t)=>`${e} was in the ${pe(t)} row.`,besideSuspect:(e,t)=>`${e} was right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="sofa"?`${e} was on the outdoor sofa.`:t==="bed"?`${e} was in the bedroom.`:`${e} was sitting in a chair.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Rt={id:"backyard",name:"The Backyard",floorPlans:{easy:x.backyard.easy,medium:x.backyard.medium,hard:x.backyard.hard},suspectNames:["Aaron","Becca","Chad","Donna","Eric","Fran","Greg","Helen","Ian","Jess","Kurt","Lisa"],victimNames:["Victor","Vanessa","Vince","Vera","Valentina","Virgil"],clueTemplates:Tt,narrativeTemplates:{intro:["The Hendersons were supposed to be hosting a barbecue. Instead, they're hosting a detective. Someone is dead in the backyard and the potato salad is getting warm. You flash your badge.","Summer parties end in hangovers, not homicides. Usually. The backyard of 14 Maple Drive is now a crime scene and you're the one who has to ruin everyone's weekend.","It was a perfect Sunday afternoon until it wasn't. The body was found near the jacuzzi before anyone noticed their drink had gone untouched. You arrive with your notepad."],victimFound:["The victim was found floating face-down near the jacuzzi.","A guest discovered the victim collapsed on the deck.","The victim was found on the grass between the patio chairs."],guiltyText:["{{killerName}} — summer is ruined.","{{killerName}} — the neighborhood will never be the same.","{{killerName}} — nobody escapes the backyard detective."]},colorPalette:{floor:"#d4e8c2",wall:"#5d4037",seat:"#8d6e63",accent:"#e64a19",background:"#1a200f",text:"#ffffff"},spriteMap:{"object:plant":"","object:jacuzzi-tile":"","object:tv":"","object:sofa":""}};function be(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Et={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was shopping in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the mall.`,inColumn:(e,t)=>`${e} was in the ${be(t)} column.`,inRow:(e,t)=>`${e} was in the ${be(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting${t==="chair"?"":" on a "+t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Wt={id:"holiday-mall",name:"The Holiday Mall",floorPlans:{easy:x["holiday-mall"].easy,medium:x["holiday-mall"].medium,hard:x["holiday-mall"].hard},suspectNames:["Ashley","Brett","Cameron","Denise","Eli","Felicia","Grant","Holly","Irving","Jade","Kyle","Leighton"],victimNames:["Victor","Vivian","Vera","Valencia","Vince","Velma"],clueTemplates:Et,narrativeTemplates:{intro:["The North Pole Mall was supposed to close early for the holiday rush. Instead, it's closed indefinitely. The security cameras caught everything except whoever did this. You wade through the tinsel.","Christmas shopping season. The most wonderful time of year — unless you're the one who ends up under the tree with a chalk outline. You badge your way in through the entrance.","The last thing anyone expects on December 23rd is a murder at the mall. The second-to-last thing is the detective they send. Here you are anyway."],victimFound:["The victim was discovered near the gift-wrapping station before the mall opened.","Security found the victim in the walkway between the stalls.","A store manager found the victim near the Christmas tree display."],guiltyText:["{{killerName}} — some gifts aren't worth giving.","{{killerName}} — unwrapped at last.","{{killerName}} — the season's greetings end here."]},colorPalette:{floor:"#e8e0d0",wall:"#2c3e50",seat:"#7f8c8d",accent:"#c0392b",background:"#0d1117",text:"#ffffff"},spriteMap:{"object:stall":"","object:shelf":"","object:cash-register":"","object:tree":"","object:teddy-bear":""}};function ye(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Nt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was dining in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the restaurant.`,inColumn:(e,t)=>`${e} was in the ${ye(t)} column.`,inRow:(e,t)=>`${e} was in the ${ye(t)} row.`,besideSuspect:(e,t)=>`${e} was seated right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="sofa"?`${e} was on the banquette seating.`:`${e} was sitting at a table.`,notOnSeatTile:e=>`${e} was not seated.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},jt={id:"restaurant",name:"The Restaurant",floorPlans:{easy:x.restaurant.easy,medium:x.restaurant.medium,hard:x.restaurant.hard},suspectNames:["Andre","Bianca","Carlo","Delphine","Emilio","Francoise","Gerard","Helena","Ignacio","Josephine","Kristoffer","Loretta"],victimNames:["Victor","Violette","Vincenzo","Vera","Valeria","Vidal"],clueTemplates:Nt,narrativeTemplates:{intro:["La Maison Rouge was fully booked for a private function. It's now fully booked by the police. Someone didn't make it to dessert — and you're the unwanted amuse-bouche.","The head chef found the body before the morning prep. The restaurant is closed, the reservations are cancelled, and the chef is refusing to speak without a lawyer. You order espresso.","Five-star dining. One-star outcome. The Michelin inspector will not be pleased. Neither will whoever left the body in the private dining room."],victimFound:["The victim was found slumped in the private dining room.","Kitchen staff discovered the victim near the counter.","The sommelier found the victim in the dining room early in the morning."],guiltyText:["{{killerName}} — an amuse-bouche of justice.","{{killerName}} — the bill has arrived.","{{killerName}} — this dish is best served cold."]},colorPalette:{floor:"#f5e8d0",wall:"#3b1f1f",seat:"#8b1a1a",accent:"#c0392b",background:"#180a0a",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:counter":"","object:table":"","object:plant":""}};function Fe(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Bt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were training in different zones.`,inColumn:(e,t)=>`${e} was in the ${Fe(t)} column.`,inRow:(e,t)=>`${e} was in the ${Fe(t)} row.`,besideSuspect:(e,t)=>`${e} was working out right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting on a bench.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},It={id:"gym",name:"The Gym",floorPlans:{easy:x.gym.easy,medium:x.gym.medium,hard:x.gym.hard},suspectNames:["Atlas","Blair","Corey","Dakota","Evander","Fitz","Gabe","Hunter","Indira","Jordan","Knox","Leila"],victimNames:["Vance","Valentina","Viktor","Vera","Vito","Vesper"],clueTemplates:Bt,narrativeTemplates:{intro:["FitLife Gym opens at 5am. This morning it opened to a body near the weight rack. The morning regulars are sweating for a different reason now.","Somebody skipped leg day — and left somebody else skipping all days. The body was found in the Weights area. You badge through the turnstile.","The gym is 24 hours. The victim wasn't. You arrive with your notepad and a distinct lack of enthusiasm for the treadmill."],victimFound:["The victim was found near the weight rack before the early shift.","A trainer discovered the victim collapsed in the cardio area.","The victim was found in the pool area during the morning check."],guiltyText:["{{killerName}} — no amount of cardio outpaces the truth.","{{killerName}} — their reps are done.","{{killerName}} — spotting the killer was the easy part."]},colorPalette:{floor:"#e8e0d8",wall:"#2c3e50",seat:"#7f8c8d",accent:"#e74c3c",background:"#0d1117",text:"#ffffff"},spriteMap:{"object:weight-rack":"","object:treadmill":"","object:counter":"","object:jacuzzi-tile":""}};function ge(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Pt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was working in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the office.`,inColumn:(e,t)=>`${e} was in the ${ge(t)} column.`,inRow:(e,t)=>`${e} was in the ${ge(t)} row.`,besideSuspect:(e,t)=>`${e} was working right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting at their desk.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Ot={id:"office",name:"The Office",floorPlans:{easy:x.office.easy,medium:x.office.medium,hard:x.office.hard},suspectNames:["Adrian","Brooke","Clive","Daria","Edwin","Fiona","Graham","Harriet","Isaac","Judith","Kieran","Laura"],victimNames:["Vincent","Veronica","Vance","Vivienne","Victor","Velvet"],clueTemplates:Pt,narrativeTemplates:{intro:["Meridian Corp. Floor 12. The quarterly review meeting has been cancelled for the most permanent possible reason. You badge in and start asking questions before the lawyers arrive.","The victim was found at their desk. The access log shows they never left last night. Whoever did this knew the building. You start with the people who knew it best.","It was supposed to be a normal Monday. Then the HR department filed the wrong kind of incident report. You turn off your phone's out-of-office message and get to work."],victimFound:["The victim was found at their desk during the morning security check.","The building manager found the victim in the Meeting Room after the overnight shift.","A colleague discovered the victim in the Server Room at 7am."],guiltyText:["{{killerName}} — the performance review was terminal.","{{killerName}} — this one won't go in the quarterly report.","{{killerName}} — consider this case closed."]},colorPalette:{floor:"#e8e8f0",wall:"#34495e",seat:"#7f8c8d",accent:"#2980b9",background:"#0a0a14",text:"#ffffff"},spriteMap:{"object:desk":"","object:photocopier":"","object:tv":"","object:plant":""}};function we(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const At={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the garden.`,inColumn:(e,t)=>`${e} was in the ${we(t)} column.`,inRow:(e,t)=>`${e} was in the ${we(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting on a garden chair.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Lt={id:"garden-party",name:"The Garden Party",floorPlans:{easy:x["garden-party"].easy,medium:x["garden-party"].medium,hard:x["garden-party"].hard},suspectNames:["Arabella","Benedict","Cecily","Damien","Eleanor","Freddie","Georgina","Hugo","Imogen","Jasper","Kit","Lavinia"],victimNames:["Violet","Valentine","Verity","Viscount","Viola","Vaughn"],clueTemplates:At,narrativeTemplates:{intro:["The Westerleigh garden party was the social event of summer. It is no longer a social event. The body was found beneath the roses and you've been asked — very politely — to investigate.","Champagne, strawberries, murder. The annual garden party at Fernwood House has taken a distinctly unfestive turn. You decline the cucumber sandwiches and start asking questions.","The gazebo was booked for afternoon tea. It is now a crime scene. You roll up your sleeves and walk across the manicured lawn."],victimFound:["The victim was found in the Greenhouse before the afternoon guests arrived.","A gardener discovered the victim on the Lawn near the flower beds.","The caterers found the victim in the Gazebo."],guiltyText:["{{killerName}} — the summer is wilted.","{{killerName}} — cut down in their prime.","{{killerName}} — this garden party is over."]},colorPalette:{floor:"#d4f0c0",wall:"#5d4037",seat:"#7cb342",accent:"#e91e63",background:"#0a1f0a",text:"#ffffff"},spriteMap:{"object:flower-bed":"","object:plant":""}};function xe(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Mt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same ward as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the hospital.`,inColumn:(e,t)=>`${e} was in the ${xe(t)} column.`,inRow:(e,t)=>`${e} was in the ${xe(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="bed"?`${e} was in a hospital bed.`:t==="sofa"?`${e} was in the waiting area.`:`${e} was sitting down.`,notOnSeatTile:e=>`${e} was not sitting or lying down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},zt={id:"hospital",name:"The Hospital",floorPlans:{easy:x.hospital.easy,medium:x.hospital.medium,hard:x.hospital.hard},suspectNames:["Aleksei","Beatrix","Conrad","Dorothea","Emil","Francesca","Gunnar","Hilde","Igor","Jana","Klaus","Liselotte"],victimNames:["Viktor","Valentina","Vera","Valentin","Vesna","Volkmar"],clueTemplates:Mt,narrativeTemplates:{intro:["St Crispin's Hospital is where people come to recover. This one didn't make it. The night shift just ended and nobody has an alibi. You flash your badge at the nurses' station.","A hospital is the last place you expect a murder — or the first. The body was found during morning rounds. You put on gloves and start taking statements.","The patient was admitted last night. By morning, they were a victim. Someone in this building knows what happened and you're going to find out who."],victimFound:["The victim was found in the Ward during the overnight nursing check.","The on-call doctor discovered the victim in the Operating Theatre.","The victim was found in the Pharmacy storage area."],guiltyText:["{{killerName}} — the prognosis was never good.","{{killerName}} — no treatment for this outcome.","{{killerName}} — discharged permanently."]},colorPalette:{floor:"#f0f4f8",wall:"#2c3e50",seat:"#7f8c8d",accent:"#e74c3c",background:"#0a0d12",text:"#ffffff"},spriteMap:{"object:hospital-bed":"","object:medicine-cabinet":""}};function $e(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Ht={inRoom:(e,t)=>`${e} was at the ${t}.`,notInRoom:(e,t)=>`${e} was not at the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the carnival.`,inColumn:(e,t)=>`${e} was in the ${$e(t)} column.`,inRow:(e,t)=>`${e} was in the ${$e(t)} row.`,besideSuspect:(e,t)=>`${e} was right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was seated at one of the stalls.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Vt={id:"carnival",name:"The Carnival",floorPlans:{easy:x.carnival.easy,medium:x.carnival.medium,hard:x.carnival.hard},suspectNames:["Alistair","Brigitte","Cosmo","Dafne","Ezra","Flavia","Gideon","Harriet","Ignatius","Juno","Kit","Ludo"],victimNames:["Victor","Valentina","Vex","Vane","Vesper","Volta"],clueTemplates:Ht,narrativeTemplates:{intro:["The Twilight Carnival has been travelling for thirty years without incident. Last night ended that streak. The body was found between the Carousel and the Funhouse. You came for the cotton candy.","Someone killed the Ringmaster. Or maybe the Ringmaster killed someone. Either way, the show is not going on tonight. You arrive as the last customers are being turned away.","Carnivals attract all sorts. This one attracted a detective. The body was found before morning setup. You pull on your coat and walk between the tents."],victimFound:["The victim was found near the Carousel before the carnival opened.","The ride operator discovered the victim in the Funhouse corridor.","The victim was found behind the Food Stands at dawn."],guiltyText:["{{killerName}} — the last act.","{{killerName}} — the fun is over.","{{killerName}} — tickets have been cancelled."]},colorPalette:{floor:"#f5deb3",wall:"#4a235a",seat:"#884ea0",accent:"#e74c3c",background:"#0d0a14",text:"#ffffff"},spriteMap:{"object:carousel-horse":"","object:stall":""}},Dt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same room as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different rooms.`,inColumn:(e,t)=>`${e} was in column ${t}.`,inRow:(e,t)=>`${e} was in row ${t}.`,besideSuspect:(e,t)=>`${e} was beside ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>`${e} was on a ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},_t={id:"stub",name:"Test Room",floorPlans:{easy:x["coffee-shop"].easy,medium:x["coffee-shop"].medium,hard:x["coffee-shop"].hard},suspectNames:["Alice","Bob","Carol","Dave","Eve","Frank","Grace","Henry","Iris","Jack","Kate","Leo"],victimNames:["Vera","Victor","Violet","Valencia","Vance","Vivian"],clueTemplates:Dt,narrativeTemplates:{intro:["A crime has occurred in the Test Room.","Witnesses report suspicious activity.","The detective arrives on the scene."],victimFound:["The victim was found at the scene.","A body has been discovered.","The victim was discovered here."],guiltyText:["{{killerName}} — caught red-handed.","{{killerName}} — the evidence is clear.","{{killerName}} — guilty as charged."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{}},se=new Map;function W(e){se.set(e.id,e)}function Yt(e){const t=se.get(e);if(!t)throw new Error(`Unknown theme: ${e}`);return t}function Kt(){return Array.from(se.values())}W(kt);W(St);W(Rt);W(Wt);W(jt);W(It);W(Ot);W(Lt);W(zt);W(Vt);W(_t);function Gt(e,t){return t[e]??""}const y=64,J=new Map;function qt(e){if(!e)return null;if(J.has(e))return J.get(e);const t=new Image,a=new Blob([e],{type:"image/svg+xml"}),o=URL.createObjectURL(a);return t.onload=()=>{J.set(e,t),URL.revokeObjectURL(o)},t.src=o,null}const ne="'Press Start 2P', monospace";function ve(e,t,a,o){e.fillStyle="#c8a96e",e.fillRect(t,a,y,y),e.strokeStyle="#7a5c2e",e.lineWidth=2,e.strokeRect(t+1,a+1,y-2,y-2),e.fillStyle="#3a2010",e.font=`6px ${ne}`,e.textAlign="center",e.textBaseline="middle",e.fillText(o.slice(0,4).toUpperCase(),t+y/2,a+y/2),e.textAlign="left",e.textBaseline="alphabetic"}function Ut(e){let t=0;for(let a=0;a<e.length;a++)t=t*31+e.charCodeAt(a)&65535;return`hsl(${t%360}, 65%, 55%)`}const Zt={pL:"object:plant",tB:"object:table",sH:"object:shelf",cR:"object:cash-register",bB:"object:bar-counter",tV:"object:tv",cT:"object:counter",dK:"object:desk",pC:"object:photocopier",fB:"object:flower-bed",hB:"object:hospital-bed",mC:"object:medicine-cabinet",tR:"object:tree",tD:"object:teddy-bear",cH:"object:carousel-horse",tM:"object:treadmill",wT:"object:weight-rack",sT:"object:stall",jZ:"object:jacuzzi-tile"},Jt=new Set(["C","S","B"]);function Xt(e,t,a,o,n,i){const s=t.floorPlan,r=a.colorPalette,{blockedRows:p,blockedCols:u}=Ie(Array.from(o.values()));for(let d=0;d<s.height;d++)for(let m=0;m<s.width;m++){const c=s.tiles[d][m],f=m*y,b=d*y;if(c==="W"){e.fillStyle=r.wall,e.fillRect(f,b,y,y),e.strokeStyle="rgba(255,255,255,0.07)",e.lineWidth=1;const l=8;for(let h=0;h<y/l;h++){const F=b+h*l;e.beginPath(),e.moveTo(f,F),e.lineTo(f+y,F),e.stroke();const w=h%2*(y/2);e.beginPath(),e.moveTo(f+w,F),e.lineTo(f+w,F+l),e.stroke()}continue}if(Jt.has(c)){e.fillStyle=r.seat,e.fillRect(f,b,y,y),e.strokeStyle="rgba(0,0,0,0.4)",e.lineWidth=1,e.strokeRect(f+.5,b+.5,y-1,y-1);const l=Math.floor(y*.35),h=f+(y-l)/2,F=b+(y-l)/2+4;e.fillStyle="rgba(0,0,0,0.25)",e.fillRect(h,F,l,l),e.fillRect(h,b+6,l,4);continue}if(c!=="F"){const l=Zt[c]??`object:${c}`,h=Gt(l,a.spriteMap);if(h){const F=qt(h);F?e.drawImage(F,f,b,y,y):ve(e,f,b,l.replace("object:",""))}else ve(e,f,b,l.replace("object:",""));continue}e.fillStyle=r.floor,e.fillRect(f,b,y,y),e.strokeStyle="rgba(0,0,0,0.18)",e.lineWidth=1,e.strokeRect(f+.5,b+.5,y-1,y-1)}e.fillStyle="rgba(0, 0, 0, 0.15)";for(const d of p)e.fillRect(0,d*y,s.width*y,y);for(const d of u)e.fillRect(d*y,0,y,s.height*y);if(n){const d=n.x*y,m=n.y*y;e.fillStyle=`${r.accent}44`,e.fillRect(d,m,y,y),e.strokeStyle=r.accent,e.lineWidth=4,e.strokeRect(d+2,m+2,y-4,y-4),e.strokeStyle="#ffffff",e.lineWidth=1,e.strokeRect(d+5,m+5,y-10,y-10)}for(const[d,m]of o){const c=t.suspects.find(w=>w.id===d);if(!c)continue;const f=m.x*y,b=m.y*y,l=6,h=y-l*2;e.fillStyle=Ut(d),e.fillRect(f+l,b+l,h,h),e.strokeStyle="rgba(0,0,0,0.6)",e.lineWidth=2,e.strokeRect(f+l+1,b+l+1,h-2,h-2),e.strokeStyle="rgba(255,255,255,0.3)",e.lineWidth=1,e.strokeRect(f+l+2,b+l+2,h-4,h-4);const F=Math.min(14,Math.floor(h*.45));e.fillStyle="#ffffff",e.font=`${F}px ${ne}`,e.textAlign="center",e.textBaseline="middle",e.fillText(c.name.charAt(0).toUpperCase(),f+y/2,b+y/2+1),e.textAlign="left",e.textBaseline="alphabetic"}if(i){for(const[d,m]of i.x){const c=d*y,f=m*y;e.fillStyle="rgba(192, 57, 43, 0.15)",e.fillRect(c,f,y,y),e.strokeStyle="#c0392b",e.lineWidth=4;const b=10;e.beginPath(),e.moveTo(c+b,f+b),e.lineTo(c+y-b,f+y-b),e.stroke(),e.beginPath(),e.moveTo(c+y-b,f+b),e.lineTo(c+b,f+y-b),e.stroke()}for(const[d,m]of Object.entries(i.candidates)){if(!m.length)continue;const[c,f]=d.split(",").map(Number),b=c*y,l=f*y,h=m.map(F=>t.suspects.find(w=>w.id===F)?.name.charAt(0).toUpperCase()??"?").join(" ")+"?";e.font=`5px ${ne}`,e.fillStyle="rgba(100, 100, 255, 0.85)",e.textAlign="center",e.textBaseline="bottom",e.fillText(h,b+y/2,l+y-3),e.textAlign="left",e.textBaseline="alphabetic"}}}function Qt(e){return{width:e.floorPlan.width*y,height:e.floorPlan.height*y}}const ea=`
.alibi-sidebar {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 10px;
  /* Notepad / case file look: cream paper with subtle lines */
  background: #f0ead8;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 23px,
    rgba(100,80,60,0.08) 23px,
    rgba(100,80,60,0.08) 24px
  );
  color: #1a0e08;
  font-family: 'Press Start 2P', monospace;
  min-width: 240px;
  max-width: 300px;
  overflow-y: auto;
  border-left: 3px solid #c0392b;
}
.alibi-sidebar-label {
  font-family: 'Press Start 2P', monospace;
  font-size: 6px;
  color: #c0392b;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 4px;
  border-bottom: 1px solid rgba(192,57,43,0.3);
  padding-bottom: 4px;
}
.alibi-suspect-section {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}
.alibi-suspect-card {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 6px;
  background: #e8e0c8;
  border: 2px solid #8a7040;
  border-radius: 0;
  font-family: 'Press Start 2P', monospace;
  font-size: 7px;
  cursor: default;
  /* Manila folder tab feel */
  box-shadow: 2px 2px 0 rgba(0,0,0,0.15);
}
.alibi-suspect-card.placed {
  border-color: #c0392b;
  background: #ffe8e0;
  box-shadow: 2px 2px 0 rgba(192,57,43,0.3);
}
.alibi-suspect-initial {
  width: 18px;
  height: 18px;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Press Start 2P', monospace;
  font-size: 8px;
  font-weight: bold;
  flex-shrink: 0;
  border: 1px solid rgba(0,0,0,0.3);
}
.alibi-clue-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.alibi-clue-card {
  padding: 6px 8px;
  background: transparent;
  border: 0;
  border-left: 3px solid #8a7040;
  font-family: 'Press Start 2P', monospace;
  font-size: 6px;
  line-height: 1.8;
  color: #2a1a08;
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
  animation: alibi-flash 0.5s ease-in-out 3;
}
@keyframes alibi-flash {
  0%, 100% { background: transparent; }
  50%       { background: rgba(192,57,43,0.2); }
}
`;let ke=!1;function ta(){if(ke)return;const e=document.createElement("style");e.textContent=ea,document.head.appendChild(e),ke=!0}function aa(e){let t=0;for(let a=0;a<e.length;a++)t=t*31+e.charCodeAt(a)&65535;return`hsl(${t%360}, 65%, 55%)`}function na(e,t,a,o,n){ta(),e.innerHTML="",e.className="alibi-sidebar";const i=document.createElement("div");i.className="alibi-sidebar-label",i.textContent="Suspects",e.appendChild(i);const s=document.createElement("div");s.className="alibi-suspect-section";for(const u of t.suspects){const d=document.createElement("div");d.className="alibi-suspect-card"+(a.has(u.id)?" placed":"");const m=document.createElement("div");m.className="alibi-suspect-initial",m.style.background=aa(u.id),m.textContent=u.name.charAt(0).toUpperCase();const c=document.createElement("span");c.textContent=u.name,d.appendChild(m),d.appendChild(c),s.appendChild(d)}e.appendChild(s);const r=document.createElement("div");r.className="alibi-sidebar-label",r.textContent="Evidence",e.appendChild(r);const p=document.createElement("div");p.className="alibi-clue-section",t.clues.forEach((u,d)=>{const m=document.createElement("div");m.className="alibi-clue-card",m.setAttribute("data-testid",`clue-${d}`),o.has(d)&&m.classList.add("clue-satisfied"),n.has(d)&&m.classList.add("clue-error"),m.textContent=u.text,p.appendChild(m)}),e.appendChild(p)}const oa=`
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
`;let Ce=!1;function re(){if(Ce)return;const e=document.createElement("style");e.textContent=oa,document.head.appendChild(e),Ce=!0}function X(e,t,a){re(),le(e);const o=document.createElement("div");o.className="alibi-overlay",o.setAttribute("data-testid","narrative-intro");const n=document.createElement("div");n.className="alibi-modal";const i=document.createElement("h2");i.textContent="A New Case";const s=document.createElement("p");s.textContent=t.narrativeIntro;const r=document.createElement("button");r.textContent="Begin Investigation",r.addEventListener("click",()=>{o.remove(),a()}),n.appendChild(i),n.appendChild(s),n.appendChild(r),o.appendChild(n),e.appendChild(o)}function ia(e,t){re(),le(e);const a=t.narrativeGuilty.replace("{{killerName}}",t.killer.name),o=document.createElement("div");o.className="alibi-overlay";const n=document.createElement("div");n.className="alibi-modal";const i=document.createElement("div");i.className="alibi-guilty-stamp",i.setAttribute("data-testid","guilty-stamp"),i.textContent="GUILTY";const s=document.createElement("div");s.className="alibi-guilty-killer",s.setAttribute("data-testid","guilty-killer-name"),s.textContent=t.killer.name;const r=document.createElement("p");r.textContent=a;const p=document.createElement("p");p.textContent=t.narrativeVictimFound,n.appendChild(i),n.appendChild(s),n.appendChild(p),n.appendChild(r),o.appendChild(n),e.appendChild(o)}function le(e){const t=e.querySelector(".alibi-overlay");t&&t.remove()}function sa(e){re(),le(e);const t=document.createElement("div");t.className="alibi-overlay",t.setAttribute("data-testid","msg-clue-gate");const a=document.createElement("div");a.className="alibi-modal";const o=document.createElement("h2");o.textContent="Something Doesn't Add Up…";const n=document.createElement("p");n.textContent="Check the clue cards. Not all witnesses are satisfied.";const i=document.createElement("button");i.textContent="Keep Investigating",i.addEventListener("click",()=>t.remove()),a.appendChild(o),a.appendChild(n),a.appendChild(i),t.appendChild(a),e.appendChild(t),setTimeout(()=>{t.isConnected&&t.remove()},3e3)}function ra(){return{x:[],candidates:{}}}function Se(e){return{placements:new Map,annotations:ra(),satisfiedClues:new Set,errorClues:new Set,victimVisible:!1,victimCell:null,phase:"playing",elapsedMs:0}}function la(e,t,a,o,n){const i=new Map(e.placements);return i.set(a,{suspectId:a,x:o,y:n}),ce({...e,placements:i},t)}function ca(e,t,a){const o=new Map(e.placements);return o.delete(a),ce({...e,placements:o},t)}function da(e){if(e.satisfiedClues.size===0&&e.placements.size>0)return e;const t=e.satisfiedClues.size+e.errorClues.size;return e.errorClues.size===0&&t>0&&e.victimVisible?{...e,phase:"guilty"}:e}function ce(e,t){const a=new Set,o=new Set;t.clues.forEach((s,r)=>{const p=ae(t.floorPlan,s,e.placements);p===!0?a.add(r):p===!1&&o.add(r)});const n=Pe(t.floorPlan,Array.from(e.placements.values()));return{...e,satisfiedClues:a,errorClues:o,victimVisible:n!==null,victimCell:n}}function P(e){return{x:[...e.x.map(([t,a])=>[t,a])],candidates:Object.fromEntries(Object.entries(e.candidates).map(([t,a])=>[t,[...a]]))}}function ma(e,t,a){const o=P(e.annotations),n=o.x.findIndex(([i,s])=>i===t&&s===a);return n>=0?o.x.splice(n,1):o.x.push([t,a]),{...e,annotations:o}}function ha(e,t,a,o){const n=P(e.annotations),i=`${t},${a}`;return n.candidates[i]||(n.candidates[i]=[]),n.candidates[i].includes(o)||(n.candidates[i]=[...n.candidates[i],o]),{...e,annotations:n}}function ua(e,t,a,o){const n=P(e.annotations),i=`${t},${a}`;return n.candidates[i]&&(n.candidates[i]=n.candidates[i].filter(s=>s!==o),n.candidates[i].length===0&&delete n.candidates[i]),{...e,annotations:n}}function fa(e,t,a,o){const n=P(e.annotations);for(const s of Object.keys(n.candidates))n.candidates[s]=n.candidates[s].filter(r=>r!==t),n.candidates[s].length===0&&delete n.candidates[s];const i=n.x.findIndex(([s,r])=>s===a&&r===o);return i>=0&&n.x.splice(i,1),{...e,annotations:n}}function j(e){return{placements:new Map(e.placements),annotations:P(e.annotations)}}function Q(e,t,a){return ce({...e,placements:new Map(a.placements),annotations:P(a.annotations)},t)}const pa=50;class ba{constructor(){U(this,"past",[]);U(this,"future",[])}push(t){this.past.push(t),this.past.length>pa&&this.past.shift(),this.future=[]}undo(t){return this.past.length===0?null:(this.future.push(t),this.past.pop())}redo(t){return this.future.length===0?null:(this.past.push(t),this.future.pop())}canUndo(){return this.past.length>0}canRedo(){return this.future.length>0}clear(){this.past=[],this.future=[]}}let M=null,G=!1;function ya(){if(G)return null;try{return M||(M=new AudioContext),M.state==="suspended"&&M.resume().catch(()=>{}),M}catch{return null}}function N(e,t,a="sine",o=.15){const n=ya();if(n)try{const i=n.createOscillator(),s=n.createGain();i.connect(s),s.connect(n.destination),i.type=a,i.frequency.value=e,s.gain.setValueAtTime(o,n.currentTime),s.gain.exponentialRampToValueAtTime(.001,n.currentTime+t),i.start(n.currentTime),i.stop(n.currentTime+t)}catch{}}function Y(e){switch(e){case"place":N(440,.08,"sine",.12);break;case"remove":N(330,.06,"sine",.08);break;case"clue-satisfied":N(660,.12,"sine",.15);break;case"solve":{N(523,.15,"sine",.2),setTimeout(()=>N(659,.15,"sine",.2),150),setTimeout(()=>N(784,.3,"sine",.25),300);break}case"error":N(220,.2,"square",.1);break;case"navigate":N(880,.05,"sine",.08);break}}function Fa(){return G=!G,G}function ga(e,t){const a=Math.floor(t/6e4),o=Math.floor(t%6e4/1e3),n=a>0?`${a}m ${o}s`:`${o}s`,i=e.difficulty.charAt(0).toUpperCase()+e.difficulty.slice(1);return["🔍 ALIBI",`Case: ${e.floorPlan===e.floorPlan?e.themeId.replace(/-/g," ").replace(/\b\w/g,s=>s.toUpperCase()):"Unknown"}`,`Difficulty: ${i}`,`Clues: ${e.clues.length}`,`Time: ${n}`,`Killer: ${e.killer.name}`,"","pnz1990.github.io/alibi/"].join(`
`)}async function wa(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;const t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:-9999px;left:-9999px;",document.body.appendChild(t),t.focus(),t.select();const a=document.execCommand("copy");return document.body.removeChild(t),a}catch{return!1}}const de={campaign:e=>`alibi_campaign_${e}`,daily:e=>`alibi_daily_${e}`,streak:"alibi_streak",stats:"alibi_stats",prefs:"alibi_prefs",puzzleState:"alibi_puzzle_state"};function xa(e){try{const t=me();t[e.key]=e,localStorage.setItem(de.puzzleState,JSON.stringify(t))}catch{}}function $a(e){try{return me()[e]??null}catch{return null}}function Te(e){try{const t=me();delete t[e],localStorage.setItem(de.puzzleState,JSON.stringify(t))}catch{}}function me(){try{const e=localStorage.getItem(de.puzzleState);return e?JSON.parse(e):{}}catch{return{}}}const va=`
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
  background: #0a0a12;
  border: 3px solid #c0392b;
  border-radius: 0;
  padding: 4px;
  z-index: 200;
  min-width: 140px;
  font-family: 'Press Start 2P', monospace;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.7);
}
.alibi-radial-item {
  padding: 10px 12px;
  cursor: pointer;
  color: #fff;
  font-size: 9px;
  border-radius: 0;
  white-space: nowrap;
  min-height: 44px;  /* touch target minimum per WCAG */
  display: flex;
  align-items: center;
  line-height: 1.6;
}
.alibi-radial-item:hover {
  background: #c0392b;
}
.alibi-radial-clear {
  color: #888;
  border-top: 2px solid #333;
  margin-top: 4px;
}
.alibi-radial-annotation {
  color: #c0c0ff;
  font-size: 7px;
}
.alibi-radial-annotation:hover { background: #3a3a60; }
`;let Re=!1;function ka(){if(Re)return;const e=document.createElement("style");e.textContent=va,document.head.appendChild(e),Re=!0}function Ca(e,t,a,o,n){ka();const i=t.floorPlan,s=document.createElement("div");s.className="alibi-radial-overlay",s.style.cssText=`position:absolute;top:0;left:0;width:${i.width*y}px;height:${i.height*y}px;`,e.style.position="relative",e.appendChild(s);const r=[];for(let c=0;c<i.height;c++){r[c]=[];for(let f=0;f<i.width;f++){const b=i.tiles[c][f],l=document.createElement("div");l.setAttribute("data-testid",`cell-${f}-${c}`),l.style.cssText=`position:absolute;left:${f*y}px;top:${c*y}px;width:${y}px;height:${y}px;`,B(b)&&(l.classList.add("alibi-cell-overlay","placeable"),l.addEventListener("click",h=>{h.stopPropagation(),Sa(f,c,o,t,n)})),r[c][f]=l,s.appendChild(l)}}let p=null;const u=()=>I();document.addEventListener("click",u);function d(){const c=o();if(p&&(p.remove(),p=null),c.victimCell){const{x:l,y:h}=c.victimCell;p=document.createElement("div"),p.setAttribute("data-testid","victim-cell"),p.className="alibi-cell-overlay victim-highlight",p.style.cssText=`position:absolute;left:${l*y}px;top:${h*y}px;width:${y}px;height:${y}px;pointer-events:all;`,p.addEventListener("click",F=>{F.stopPropagation(),n.onVictimClick()}),s.appendChild(p)}const f=new Set,b=new Set;for(const l of c.placements.values())f.add(l.y),b.add(l.x);for(let l=0;l<i.height;l++)for(let h=0;h<i.width;h++){const F=r[l]?.[h];if(!F)continue;const w=i.tiles[l][h],S=f.has(l)||b.has(h),O=Array.from(c.placements.values()).some(A=>A.x===h&&A.y===l);F.style.pointerEvents=B(w)&&(!S||O)?"all":"none"}s.querySelectorAll("[data-annotation]").forEach(l=>l.remove());for(const[l,h]of c.annotations.x){const F=document.createElement("div");F.setAttribute("data-testid",`cell-annotation-x-${l}-${h}`),F.setAttribute("data-annotation","x"),F.style.cssText=`position:absolute;left:${l*y}px;top:${h*y}px;width:${y}px;height:${y}px;pointer-events:none;`,s.appendChild(F)}for(const[l,h]of Object.entries(c.annotations.candidates)){if(!h.length)continue;const[F,w]=l.split(",").map(Number),S=document.createElement("div");S.setAttribute("data-testid",`cell-annotation-candidates-${F}-${w}`),S.setAttribute("data-annotation","candidates"),S.setAttribute("data-candidates",h.join(",")),S.style.cssText=`position:absolute;left:${F*y}px;top:${w*y}px;width:${y}px;height:${y}px;pointer-events:none;`,s.appendChild(S)}}function m(){document.removeEventListener("click",u),s.remove()}return d(),{updateOverlays:d,detach:m}}let q=null;function I(){q&&(q.remove(),q=null)}function Sa(e,t,a,o,n){I();const i=a(),s=Array.from(i.placements.entries()).find(([,h])=>h.x===e&&h.y===t),r=document.createElement("div");r.className="alibi-radial-menu",r.setAttribute("data-testid","radial-menu");const u=document.getElementById("game-canvas")?.getBoundingClientRect()??{left:0,top:0};r.style.left=`${u.left+(e+1)*y}px`,r.style.top=`${u.top+t*y}px`;const d=new Set(i.placements.keys()),m=o.suspects.filter(h=>!d.has(h.id));for(const h of m){const F=document.createElement("div");F.className="alibi-radial-item",F.setAttribute("data-testid",`suspect-option-${h.id}`),F.textContent=`${h.name.charAt(0).toUpperCase()} — Place`,F.addEventListener("click",w=>{w.stopPropagation(),I(),n.onPlace(h.id,e,t)}),r.appendChild(F)}const c=`${e},${t}`,f=i.annotations.x.some(([h,F])=>h===e&&F===t),b=document.createElement("div");b.className="alibi-radial-item alibi-radial-annotation",b.setAttribute("data-testid","suspect-option-markx"),b.textContent=f?"✕ Clear X":"✕ Mark X",b.addEventListener("click",h=>{h.stopPropagation(),I(),n.onToggleX(e,t)}),r.appendChild(b);const l=i.annotations.candidates[c]??[];for(const h of o.suspects){if(d.has(h.id))continue;const F=l.includes(h.id),w=document.createElement("div");w.className="alibi-radial-item alibi-radial-annotation",w.setAttribute("data-testid",`suspect-option-candidate-${h.id}`),w.textContent=F?`${h.name.charAt(0).toUpperCase()}? Remove`:`${h.name.charAt(0).toUpperCase()}? Maybe`,w.addEventListener("click",S=>{S.stopPropagation(),I(),F?n.onRemoveCandidate(h.id,e,t):n.onAddCandidate(h.id,e,t)}),r.appendChild(w)}if(s){const h=document.createElement("div");h.className="alibi-radial-item alibi-radial-clear",h.setAttribute("data-testid","suspect-option-clear"),h.textContent="Remove Suspect",h.addEventListener("click",F=>{F.stopPropagation(),I(),n.onRemove(s[0])}),r.appendChild(h)}r.children.length!==0&&(document.body.appendChild(r),q=r)}function Ta(e){return`${e.seed}-${e.themeId}-${e.difficulty}`}function Ra(e){const t=new URLSearchParams(location.search),a=t.get("theme")??"coffee-shop",o=t.get("difficulty")??"easy",n=parseInt(t.get("seed")??"0",10),i=Yt(a),s=Ke(n,i,o),r=Ta(s),p=Na(),u=p.querySelector(".alibi-canvas-wrapper"),d=p.querySelector(".alibi-sidebar-container"),m=document.getElementById("game-canvas"),c=m.getContext("2d"),{width:f,height:b}=Qt(s);m.width=f,m.height=b,m.style.maxWidth="100%",m.style.maxHeight="100vh",m.style.objectFit="contain",u.appendChild(m);let l=Se();const h=new ba;function F(g,v){const $={};v.placements.forEach((k,D)=>{$[D]={x:k.x,y:k.y}}),xa({key:g,placements:$,elapsedMs:v.elapsedMs,savedAt:new Date().toISOString(),annotations:v.annotations})}function w(){Xt(c,s,i,l.placements,l.victimCell,l.annotations),na(d,s,l.placements,l.satisfiedClues,l.errorClues),S.updateOverlays()}const S=Ca(u,s,i,()=>l,{onPlace(g,v,$){l.phase==="playing"&&(h.push(j(l)),l=la(l,s,g,v,$),l=fa(l,g,v,$),F(r,l),Y(l.satisfiedClues.size>0?"clue-satisfied":"place"),w())},onRemove(g){l.phase==="playing"&&(h.push(j(l)),l=ca(l,s,g),F(r,l),Y("remove"),w())},onVictimClick(){if(l.phase!=="playing")return;const g=da(l);g.phase==="guilty"?(l=g,Te(r),Y("solve"),w(),ia(document.body,s),ja(s,l)):(Y("error"),w(),sa(document.body))},onToggleX(g,v){l.phase==="playing"&&(h.push(j(l)),l=ma(l,g,v),F(r,l),w())},onAddCandidate(g,v,$){l.phase==="playing"&&(h.push(j(l)),l=ha(l,v,$,g),F(r,l),w())},onRemoveCandidate(g,v,$){l.phase==="playing"&&(h.push(j(l)),l=ua(l,v,$,g),F(r,l),w())}}),O=p.querySelector('[data-testid="btn-undo"]'),A=p.querySelector('[data-testid="btn-redo"]');O.addEventListener("click",H),A.addEventListener("click",V);function H(){const g=h.undo(j(l));g&&(l=Q(l,s,g),w())}function V(){const g=h.redo(j(l));g&&(l=Q(l,s,g),w())}const E=p.querySelector('[data-testid="btn-mute"]');E.addEventListener("click",()=>{const g=Fa();E.textContent=g?"🔇":"🔊"}),document.addEventListener("keydown",g=>{(g.ctrlKey||g.metaKey)&&g.key==="z"&&!g.shiftKey&&(H(),g.preventDefault()),(g.ctrlKey||g.metaKey)&&(g.key==="y"||g.key==="z"&&g.shiftKey)&&(V(),g.preventDefault())});const T=$a(r);T&&Object.keys(T.placements).length>0?Ba(p,()=>{const g=new Map(Object.entries(T.placements).map(([k,D])=>[k,{suspectId:k,x:D.x,y:D.y}])),v=T.annotations??{x:[],candidates:{}},$={placements:g,annotations:v};l=Q(Se(),s,$),l={...l,elapsedMs:T.elapsedMs},w(),X(document.body,s,()=>{})},()=>{Te(r),X(document.body,s,()=>{})}):X(document.body,s,()=>{}),w()}const Ea=`
.alibi-game-screen {
  display: flex; align-items: flex-start; gap: 0;
  height: 100vh; overflow: hidden; background: #1a1a2e;
}
.alibi-canvas-wrapper { flex-shrink: 0; overflow: auto; position: relative; }
.alibi-sidebar-container { flex: 1; height: 100vh; overflow-y: auto; display: flex; flex-direction: column; }
.alibi-toolbar {
  display: flex; gap: 6px; padding: 8px 10px;
  background: #0a0a12; border-bottom: 2px solid #333; flex-shrink: 0;
}
.alibi-toolbar button {
  background: #1a1a2e; color: #ccc; border: 2px solid #444;
  border-radius: 0;
  padding: 5px 10px; font-family: 'Press Start 2P', monospace; font-size: 8px;
  cursor: pointer;
  box-shadow: 2px 2px 0 #000;
}
.alibi-toolbar button:hover { background: #2a2a50; color: #fff; }
.alibi-toolbar button:active { transform: translate(1px,1px); box-shadow: 1px 1px 0 #000; }
`;let Ee=!1;function Wa(){if(Ee)return;const e=document.createElement("style");e.textContent=Ea,document.head.appendChild(e),Ee=!0}function Na(){Wa();const e=document.createElement("div");e.setAttribute("data-testid","screen-game"),e.className="alibi-game-screen";const t=document.createElement("div");t.className="alibi-canvas-wrapper";const a=document.createElement("div");a.style.cssText="display:flex;flex-direction:column;height:100vh;flex:1;";const o=document.createElement("div");o.className="alibi-toolbar";const n=ee("btn-undo","↩ Undo"),i=ee("btn-redo","↪ Redo"),s=ee("btn-mute","🔊");o.append(n,i,s);const r=document.createElement("div");r.className="alibi-sidebar-container",a.append(o,r),e.append(t,a);const p=document.getElementById("game-canvas");return p.parentElement?.insertBefore(e,p),e}function ee(e,t){const a=document.createElement("button");return a.setAttribute("data-testid",e),a.textContent=t,a}function ja(e,t){const a=document.createElement("button");a.setAttribute("data-testid","btn-share"),a.style.cssText='position:fixed;bottom:24px;right:24px;z-index:300;background:#c0392b;color:#fff;border:2px solid #ff5a47;border-radius:0;padding:10px 20px;font-family:"Press Start 2P",monospace;font-size:11px;cursor:pointer;box-shadow:3px 3px 0 #6b0000;',a.textContent="📋 Share Result",a.addEventListener("click",async()=>{const o=ga(e,t.elapsedMs),n=await wa(o);a.textContent=n?"✓ Copied!":"📋 Share Result",n&&setTimeout(()=>{a.textContent="📋 Share Result"},2e3)}),document.body.appendChild(a)}function Ba(e,t,a){const o=document.createElement("div");o.setAttribute("data-testid","prompt-resume"),o.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:150;font-family:"Press Start 2P",monospace;';const n=document.createElement("div");n.style.cssText="background:#0a0a12;border:3px solid #c0392b;border-radius:0;box-shadow:4px 4px 0 #6b0000;padding:28px;max-width:360px;text-align:center;color:#fff;";const i=document.createElement("h2");i.style.cssText='color:#c0392b;margin-bottom:16px;font-family:"Press Start 2P",monospace;font-size:0.75em;line-height:1.6;',i.textContent="Resume?";const s=document.createElement("p");s.style.cssText='color:#aaa;margin-bottom:20px;font-family:"Press Start 2P",monospace;font-size:0.45em;line-height:2;',s.textContent="Continue your in-progress case?";const r=document.createElement("button");r.style.cssText='background:#c0392b;color:#fff;border:2px solid #ff5a47;border-radius:0;padding:9px 20px;font-family:"Press Start 2P",monospace;font-size:9px;cursor:pointer;margin-right:8px;box-shadow:2px 2px 0 #6b0000;',r.textContent="Resume",r.addEventListener("click",()=>{o.remove(),t()});const p=document.createElement("button");p.style.cssText='background:#1a1a2e;color:#fff;border:2px solid #555;border-radius:0;padding:9px 20px;font-family:"Press Start 2P",monospace;font-size:9px;cursor:pointer;box-shadow:2px 2px 0 #000;',p.textContent="Start Fresh",p.addEventListener("click",()=>{o.remove(),a()}),n.append(i,s,r,p),o.appendChild(n),e.appendChild(o)}function Ia(e){let t=5381;for(let a=0;a<e.length;a++)t=(t<<5)+t+e.charCodeAt(a)|0;return Math.abs(t)}function Pa(){const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const We=[{themeId:"coffee-shop",difficulty:"easy"},{themeId:"bookstore",difficulty:"easy"},{themeId:"backyard",difficulty:"easy"},{themeId:"holiday-mall",difficulty:"easy"},{themeId:"restaurant",difficulty:"easy"},{themeId:"gym",difficulty:"easy"},{themeId:"office",difficulty:"easy"},{themeId:"garden-party",difficulty:"easy"},{themeId:"hospital",difficulty:"easy"},{themeId:"carnival",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"bookstore",difficulty:"medium"},{themeId:"backyard",difficulty:"medium"},{themeId:"holiday-mall",difficulty:"medium"},{themeId:"restaurant",difficulty:"medium"},{themeId:"gym",difficulty:"medium"},{themeId:"office",difficulty:"medium"},{themeId:"garden-party",difficulty:"medium"},{themeId:"hospital",difficulty:"medium"},{themeId:"carnival",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"bookstore",difficulty:"hard"},{themeId:"backyard",difficulty:"hard"},{themeId:"holiday-mall",difficulty:"hard"},{themeId:"restaurant",difficulty:"hard"},{themeId:"gym",difficulty:"hard"},{themeId:"office",difficulty:"hard"},{themeId:"garden-party",difficulty:"hard"},{themeId:"hospital",difficulty:"hard"},{themeId:"carnival",difficulty:"hard"}];function Oa(e){const t=Ia(e),a=new Date(e+"T12:00:00Z"),o=Math.floor((a.getTime()-new Date(a.getUTCFullYear(),0,0).getTime())/864e5),{themeId:n,difficulty:i}=We[o%We.length];return{seed:t,themeId:n,difficulty:i,dateStr:e}}function Aa(){return Oa(Pa())}const La=`
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
`;let Ne=!1;function Ma(){if(Ne)return;const e=document.createElement("style");e.textContent=La,document.head.appendChild(e),Ne=!0}function za(){Ma();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-home"),t.className="alibi-home";const a=document.createElement("div");a.className="alibi-home-eyebrow",a.textContent="— A Mystery Awaits —";const o=document.createElement("div");o.className="alibi-home-title",o.textContent="ALIBI";const n=document.createElement("div");n.className="alibi-home-subtitle",n.textContent=`Murder Mystery
Deduction`;const i=document.createElement("div");i.className="alibi-home-buttons",i.appendChild(te("btn-campaign","primary","📁 Campaign","12 escalating cases")),i.appendChild(te("btn-quickplay","secondary","🎲 Quick Play","Pick theme + difficulty")),i.appendChild(te("btn-daily","secondary","📅 Daily Case","Same worldwide · daily streak")),t.append(a,o,n,i),document.body.appendChild(t),t.querySelector('[data-testid="btn-quickplay"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=quickplay`}),t.querySelector('[data-testid="btn-campaign"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=campaign`}),t.querySelector('[data-testid="btn-daily"]').addEventListener("click",()=>{t.remove();const{seed:s,themeId:r,difficulty:p}=Aa();window.location.href=`${window.location.pathname}?theme=${r}&difficulty=${p}&seed=${s}`})}function te(e,t,a,o){const n=document.createElement("button");n.setAttribute("data-testid",e),n.className=`alibi-home-btn ${t}`;const i=document.createElement("span");i.className="btn-title",i.textContent=a;const s=document.createElement("span");return s.className="btn-desc",s.textContent=o,n.append(i,s),n}const Ha=`
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
`;let je=!1;function Va(){if(je)return;const e=document.createElement("style");e.textContent=Ha,document.head.appendChild(e),je=!0}const Da=[{title:"The Coffee Shop",difficulty:"easy",seed:100},{title:"The Bookstore",difficulty:"easy",seed:101},{title:"The Backyard",difficulty:"easy",seed:102},{title:"The Holiday Mall",difficulty:"easy",seed:103},{title:"The Coffee Shop",difficulty:"medium",seed:200},{title:"The Bookstore",difficulty:"medium",seed:201},{title:"The Backyard",difficulty:"medium",seed:202},{title:"The Holiday Mall",difficulty:"medium",seed:203},{title:"The Coffee Shop",difficulty:"hard",seed:300},{title:"The Bookstore",difficulty:"hard",seed:301},{title:"The Backyard",difficulty:"hard",seed:302},{title:"The Holiday Mall",difficulty:"hard",seed:303}];function _a(){Va();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-campaign-board"),t.className="alibi-campaign-board";const a=document.createElement("div");a.className="alibi-campaign-header";const o=document.createElement("button");o.className="alibi-campaign-back",o.textContent="← Home",o.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="📁 Campaign",a.append(o,n);const i=document.createElement("div");i.className="alibi-case-grid",Da.forEach((s,r)=>{const p=document.createElement("div");p.setAttribute("data-testid",`case-card-${r}`),p.className=`alibi-case-card ${r===0?"unlocked":"locked"}`;const u=document.createElement("div");u.className="alibi-case-num",u.textContent=`Case ${r+1}`;const d=document.createElement("div");d.className="alibi-case-title",d.textContent=r===0?s.title:"???";const m=document.createElement("div");m.className=`alibi-case-difficulty ${s.difficulty}`,m.textContent=s.difficulty.charAt(0).toUpperCase()+s.difficulty.slice(1);const c=document.createElement("div");c.setAttribute("data-testid",`case-status-${r}`),c.className=`alibi-case-status ${r===0?"":"locked"}`,c.textContent=r===0?"📁":"🔒",p.append(u,d,m,c),r===0&&p.addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?theme=coffee-shop&difficulty=${s.difficulty}&seed=${s.seed}`}),i.appendChild(p)}),t.append(a,i),document.body.appendChild(t)}const Ya=`
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
`,Ka={"coffee-shop":"☕",bookstore:"📚",backyard:"🌿","holiday-mall":"🎄",restaurant:"🍽",gym:"💪",office:"🏢","garden-party":"🌸",hospital:"🏥",carnival:"🎡"};let Be=!1;function Ga(){if(Be)return;const e=document.createElement("style");e.textContent=Ya,document.head.appendChild(e),Be=!0}function qa(){Ga();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-theme-select"),t.className="alibi-theme-select";const a=document.createElement("div");a.className="alibi-theme-select-header";const o=document.createElement("button");o.className="alibi-theme-back",o.textContent="← Home",o.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="🎲 Quick Play",a.append(o,n);let i="easy";const s=document.createElement("div");s.className="alibi-difficulty-row";const r={};for(const[c,f]of[["easy","Easy"],["medium","Medium"],["hard","Hard"]]){const b=document.createElement("button");b.setAttribute("data-testid",`difficulty-${c}`),b.className=`alibi-diff-btn ${c}${c==="easy"?" selected":""}`,b.textContent=f,b.addEventListener("click",()=>{i=c,Object.values(r).forEach(l=>l.classList.remove("selected")),b.classList.add("selected")}),r[c]=b,s.appendChild(b)}let p=null;const u=document.createElement("div");u.className="alibi-theme-grid";const d={};for(const c of Kt()){if(c.id==="stub")continue;const f=document.createElement("div");f.setAttribute("data-testid",`theme-card-${c.id}`),f.className="alibi-theme-card";const b=document.createElement("div");b.className="alibi-theme-icon",b.textContent=Ka[c.id]??"🔍";const l=document.createElement("div");l.textContent=c.name.replace(/^The /,""),f.append(b,l),f.addEventListener("click",()=>{p=c.id,Object.values(d).forEach(h=>h.classList.remove("selected")),f.classList.add("selected"),m.disabled=!1}),d[c.id]=f,u.appendChild(f)}const m=document.createElement("button");m.setAttribute("data-testid","btn-play"),m.className="alibi-play-btn",m.textContent="Play",m.disabled=!0,m.addEventListener("click",()=>{if(!p)return;const c=Math.floor(Math.random()*4294967295);t.remove(),window.location.href=`${window.location.pathname}?theme=${p}&difficulty=${i}&seed=${c}`}),t.append(a,s,u,m),document.body.appendChild(t)}const K=new URLSearchParams(location.search);if(K.has("theme")||K.has("difficulty")||K.has("seed"))Ra();else switch(K.get("mode")){case"campaign":_a();break;case"quickplay":qa();break;default:za();break}

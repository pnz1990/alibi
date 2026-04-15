var We=Object.defineProperty;var Ie=(e,t,n)=>t in e?We(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var q=(e,t,n)=>Ie(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const je=new Set(["F","C","S","B"]);function I(e){return je.has(e)}function A(e){return e==="C"||e==="S"||e==="B"}function te(e){const t=[];for(let n=0;n<e.width;n++)for(let a=0;a<e.height;a++)if(I(e.tiles[a][n])){t.push(n);break}return t}function ne(e){const t=[];for(let n=0;n<e.height;n++)for(let a=0;a<e.width;a++)if(I(e.tiles[n][a])){t.push(n);break}return t}function T(e,t,n){for(const a of e.rooms)for(const[o,s]of a.cells)if(o===t&&s===n)return a.id;return null}function Re(e){const t=new Set,n=new Set;for(const a of e)t.add(a.y),n.add(a.x);return{blockedRows:t,blockedCols:n}}function Ee(e,t){const{blockedRows:n,blockedCols:a}=Re(t),o=[];for(let s=0;s<e.height;s++)if(!n.has(s))for(let i=0;i<e.width;i++)a.has(i)||I(e.tiles[s][i])&&o.push({x:i,y:s});return o.length===1?o[0]:null}function Be(e,t,n){const a=T(e,n.x,n.y);if(a===null)return null;for(const o of t)if(T(e,o.x,o.y)===a)return o.suspectId;return null}function ce(e,t,n,a){return Math.max(Math.abs(e-n),Math.abs(t-a))}function ee(e,t,n){const a=n.get(t.suspectId);if(!a)return null;switch(t.type){case"inRoom":return T(e,a.x,a.y)===t.roomId;case"notInRoom":return T(e,a.x,a.y)!==t.roomId;case"inSameRoom":{const o=n.get(t.otherSuspectId);if(!o)return null;const s=T(e,a.x,a.y),i=T(e,o.x,o.y);return s!==null&&s===i}case"inDifferentRoom":{const o=n.get(t.otherSuspectId);if(!o)return null;const s=T(e,a.x,a.y),i=T(e,o.x,o.y);return s===null||i===null?null:s!==i}case"inColumn":return a.x===t.col;case"inRow":return a.y===t.row;case"besideSuspect":{const o=n.get(t.otherSuspectId);return o?ce(a.x,a.y,o.x,o.y)<=1:null}case"notBesideSuspect":{const o=n.get(t.otherSuspectId);return o?ce(a.x,a.y,o.x,o.y)>1:null}case"besideObject":{for(let o=-1;o<=1;o++)for(let s=-1;s<=1;s++){if(s===0&&o===0)continue;const i=a.x+s,r=a.y+o;if(!(i<0||r<0||i>=e.width||r>=e.height)&&e.tiles[r][i]===t.objectTile)return!0}return!1}case"notBesideObject":{for(let o=-1;o<=1;o++)for(let s=-1;s<=1;s++){if(s===0&&o===0)continue;const i=a.x+s,r=a.y+o;if(!(i<0||r<0||i>=e.width||r>=e.height)&&e.tiles[r][i]===t.objectTile)return!1}return!0}case"onSeatTile":return A(e.tiles[a.y][a.x]);case"notOnSeatTile":return!A(e.tiles[a.y][a.x]);case"northOf":{const o=n.get(t.otherSuspectId);return o?a.y<o.y:null}case"southOf":{const o=n.get(t.otherSuspectId);return o?a.y>o.y:null}case"exactlyNRowsNorth":{const o=n.get(t.otherSuspectId);return o?o.y-a.y===t.n:null}case"exactlyNRowsSouth":{const o=n.get(t.otherSuspectId);return o?a.y-o.y===t.n:null}}}const Me={easy:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom"],medium:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile"],hard:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile","notOnSeatTile","northOf","southOf","exactlyNRowsNorth","exactlyNRowsSouth"]};function G(e,t,n){const a=te(e),o=ne(e);if(t.length===0)return{count:0};if(t.length>Math.min(a.length,o.length))return{count:0};const s=new Set;for(let l=0;l<e.height;l++)for(let m=0;m<e.width;m++)I(e.tiles[l][m])&&s.add(`${m},${l}`);let i=0,r;const u=new Map,c=new Set,d=new Set;function f(l){if(i>=2)return;if(l===t.length){for(const b of n)if(ee(e,b,u)!==!0)return;i++,i===1&&(r=new Map(u));return}const m=t[l];for(const b of o)if(!c.has(b))for(const h of a){if(d.has(h)||!s.has(`${h},${b}`))continue;const g={suspectId:m,x:h,y:b};u.set(m,g),c.add(b),d.add(h);let x=!1;for(const v of n)if((v.suspectId===m||v.otherSuspectId===m)&&ee(e,v,u)===!1){x=!0;break}if(x||f(l+1),u.delete(m),c.delete(b),d.delete(h),i>=2)return}}return f(0),{count:i,firstSolution:r}}class Oe extends Error{constructor(t){super(t),this.name="PuzzleGenerationError"}}function Le(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function Ne(e,t){return Math.floor(e()*t)}function $(e,t){return t[Ne(e,t.length)]}function L(e,t){const n=[...t];for(let a=n.length-1;a>0;a--){const o=Ne(e,a+1);[n[a],n[o]]=[n[o],n[a]]}return n}function Ae(e,t,n,a){const o=Me[n],s=a.landmarks.length>=2,i=a.tiles.some(d=>d.some(f=>A(f))),r=o.filter(d=>!((d==="besideObject"||d==="notBesideObject")&&!s||(d==="onSeatTile"||d==="notOnSeatTile")&&!i)),u=Math.ceil(t*.4),c=[];for(let d=0;d<t;d++){const f=new Set;c.length>0&&f.add(c[c.length-1]);for(const g of r)c.filter(v=>v===g).length>=u&&f.add(g);const l=r.filter(g=>!f.has(g)),m=l.length>0?l:r,b=m.filter(g=>!c.includes(g)),h=b.length>0?b:m;c.push($(e,h))}return c}function M(e,t,n,a,o,s,i){const r=i.get(o.id),u=n.clueTemplates;switch(a){case"inRoom":{const c=T(t,r.x,r.y);if(!c)return null;const d=t.rooms.find(f=>f.id===c);return{type:"inRoom",suspectId:o.id,roomId:c,text:u.inRoom(o.name,d.name)}}case"notInRoom":{const c=T(t,r.x,r.y),d=t.rooms.filter(l=>l.id!==c);if(d.length===0)return null;const f=$(e,d);return{type:"notInRoom",suspectId:o.id,roomId:f.id,text:u.notInRoom(o.name,f.name)}}case"inSameRoom":{const c=T(t,r.x,r.y);if(!c)return null;const d=s.filter(l=>{if(l.id===o.id)return!1;const m=i.get(l.id);return T(t,m.x,m.y)===c});if(d.length===0)return null;const f=$(e,d);return{type:"inSameRoom",suspectId:o.id,otherSuspectId:f.id,text:u.inSameRoom(o.name,f.name)}}case"inDifferentRoom":{const c=T(t,r.x,r.y),d=s.filter(l=>{if(l.id===o.id)return!1;const m=i.get(l.id),b=T(t,m.x,m.y);return b!==null&&b!==c});if(d.length===0)return null;const f=$(e,d);return{type:"inDifferentRoom",suspectId:o.id,otherSuspectId:f.id,text:u.inDifferentRoom(o.name,f.name)}}case"inColumn":return{type:"inColumn",suspectId:o.id,col:r.x,text:u.inColumn(o.name,r.x+1)};case"inRow":return{type:"inRow",suspectId:o.id,row:r.y,text:u.inRow(o.name,r.y+1)};case"besideSuspect":{const c=s.filter(f=>{if(f.id===o.id)return!1;const l=i.get(f.id);return Math.max(Math.abs(r.x-l.x),Math.abs(r.y-l.y))<=1});if(c.length===0)return null;const d=$(e,c);return{type:"besideSuspect",suspectId:o.id,otherSuspectId:d.id,text:u.besideSuspect(o.name,d.name)}}case"notBesideSuspect":{const c=s.filter(f=>{if(f.id===o.id)return!1;const l=i.get(f.id);return Math.max(Math.abs(r.x-l.x),Math.abs(r.y-l.y))>1});if(c.length===0)return null;const d=$(e,c);return{type:"notBesideSuspect",suspectId:o.id,otherSuspectId:d.id,text:u.notBesideSuspect(o.name,d.name)}}case"besideObject":{if(t.landmarks.length===0)return null;const c=t.landmarks.filter(l=>Math.max(Math.abs(r.x-l.x),Math.abs(r.y-l.y))<=1);if(c.length===0)return null;const d=$(e,c),f=t.tiles[d.y][d.x];return{type:"besideObject",suspectId:o.id,objectTile:f,text:u.besideObject(o.name,d.name)}}case"notBesideObject":{if(t.landmarks.length===0)return null;const c=t.landmarks.filter(l=>Math.max(Math.abs(r.x-l.x),Math.abs(r.y-l.y))>1);if(c.length===0)return null;const d=$(e,c),f=t.tiles[d.y][d.x];return{type:"notBesideObject",suspectId:o.id,objectTile:f,text:u.notBesideObject(o.name,d.name)}}case"onSeatTile":{const c=t.tiles[r.y][r.x];if(!A(c))return null;const d=c==="C"?"chair":c==="S"?"sofa":"bed";return{type:"onSeatTile",suspectId:o.id,text:u.onSeatTile(o.name,d)}}case"notOnSeatTile":{const c=t.tiles[r.y][r.x];return A(c)?null:{type:"notOnSeatTile",suspectId:o.id,text:u.notOnSeatTile(o.name)}}case"northOf":{const c=s.filter(f=>{if(f.id===o.id)return!1;const l=i.get(f.id);return r.y<l.y});if(c.length===0)return null;const d=$(e,c);return{type:"northOf",suspectId:o.id,otherSuspectId:d.id,text:u.northOf(o.name,d.name)}}case"southOf":{const c=s.filter(f=>{if(f.id===o.id)return!1;const l=i.get(f.id);return r.y>l.y});if(c.length===0)return null;const d=$(e,c);return{type:"southOf",suspectId:o.id,otherSuspectId:d.id,text:u.southOf(o.name,d.name)}}case"exactlyNRowsNorth":{const c=[];for(const f of s){if(f.id===o.id)continue;const m=i.get(f.id).y-r.y;m>0&&c.push({suspect:f,n:m})}if(c.length===0)return null;const d=$(e,c);return{type:"exactlyNRowsNorth",suspectId:o.id,otherSuspectId:d.suspect.id,n:d.n,text:u.exactlyNRowsNorth(o.name,d.suspect.name,d.n)}}case"exactlyNRowsSouth":{const c=[];for(const f of s){if(f.id===o.id)continue;const l=i.get(f.id),m=r.y-l.y;m>0&&c.push({suspect:f,n:m})}if(c.length===0)return null;const d=$(e,c);return{type:"exactlyNRowsSouth",suspectId:o.id,otherSuspectId:d.suspect.id,n:d.n,text:u.exactlyNRowsSouth(o.name,d.suspect.name,d.n)}}}}function ze(e,t,n,a=1e3){const o=L(e,te(t)),s=L(e,ne(t)),i=n.length;if(i<1||i>Math.min(o.length,s.length))return null;let r=0;const u=new Map,c=new Set,d=new Set,f=L(e,s).slice(0,i);function l(m){if(m===i)return!0;const b=n[m],h=f[m],g=L(e,o);for(const x of g)if(!d.has(x)&&I(t.tiles[h]?.[x])){if(u.set(b.id,{suspectId:b.id,x,y:h}),c.add(h),d.add(x),l(m+1))return!0;if(r++,u.delete(b.id),c.delete(h),d.delete(x),r>=a)return!1}return!1}return l(0)?u:null}function Pe(e,t,n){for(let o=0;o<20;o++){const s=e+o*97>>>0,i=Le(s),r=t.floorPlans[n],u=te(r),c=ne(r),d=Math.min(u.length,c.length)-1;if(d<2)continue;const m=L(i,[...t.suspectNames]).slice(0,d).map((F,C)=>({id:`s${C}`,name:F})),b=$(i,t.victimNames),h=ze(i,r,m);if(!h)continue;const g=Array.from(h.values()),x=Ee(r,g);if(!x)continue;const v=Be(r,g,x);if(!v)continue;const W=m.find(F=>F.id===v),B=$(i,t.narrativeTemplates.intro),j=$(i,t.narrativeTemplates.victimFound),z=$(i,t.narrativeTemplates.guiltyText).replace("{{killerName}}",W.name).replace("{{evidenceText}}","the evidence is conclusive"),P=Ae(i,d,n,r),S=[];for(let F=0;F<d;F++){const C=m[F],k=P[F];let R=M(i,r,t,k,C,m,h);R||(R=M(i,r,t,"inRow",C,m,h)),R||(R=M(i,r,t,"inColumn",C,m,h)),R&&S.push(R)}let y=G(r,m.map(F=>F.id),S);if(y.count!==0){if(y.count!==1)for(const F of m){if(y.count===1)break;if(!S.some(k=>k.type==="inRow"&&k.suspectId===F.id)){const k=M(i,r,t,"inRow",F,m,h);k&&S.push(k),y=G(r,m.map(R=>R.id),S)}}if(y.count!==1)for(const F of m){if(y.count===1)break;if(!S.some(k=>k.type==="inColumn"&&k.suspectId===F.id)){const k=M(i,r,t,"inColumn",F,m,h);k&&S.push(k),y=G(r,m.map(R=>R.id),S)}}if(y.count===1)return{seed:s,themeId:t.id,difficulty:n,suspects:m,victimName:b,clues:S,solution:h,victimCell:x,killer:W,narrativeIntro:B,narrativeVictimFound:j,narrativeGuilty:z,floorPlan:r}}}throw new Oe(`Failed to generate unique puzzle after 20 retries (seed=${e}, theme=${t.id}, difficulty=${n})`)}const He={width:5,height:6,tiles:[["bB","bB","bB","W","W"],["F","F","F","C","F"],["pL","F","C","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"],["W","cR","W","F","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[3,1],[4,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"restroom",name:"Restroom",cells:[[1,5],[3,5],[4,5]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-entrance",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},Ve={width:6,height:7,tiles:[["bB","bB","bB","bB","W","W"],["F","F","F","F","C","F"],["pL","F","C","F","F","F"],["F","S","F","pL","F","C"],["F","F","tB","F","F","F"],["C","F","F","F","W","F"],["W","cR","W","W","W","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5]]},{id:"restroom",name:"Restroom",cells:[[1,6],[5,5],[5,6]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-door",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:3,y:3},{id:"table",name:"the table",x:2,y:4},{id:"cash-register",name:"the cash register",x:1,y:6}]},De={width:7,height:8,tiles:[["bB","bB","bB","bB","bB","W","W"],["F","F","F","F","F","C","F"],["F","C","F","pL","F","F","F"],["pL","F","S","F","C","F","pL"],["F","F","F","tB","F","F","F"],["F","C","F","F","F","tB","C"],["F","F","F","F","F","W","F"],["W","cR","W","F","C","W","F"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]]},{id:"main-area",name:"Main Area",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[6,6]]},{id:"restroom",name:"Restroom",cells:[[1,7]]},{id:"back-office",name:"Back Office",cells:[[3,7],[4,7],[6,7]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-1",name:"the plant",x:3,y:2},{id:"plant-2",name:"the plant",x:0,y:3},{id:"plant-3",name:"the plant",x:6,y:3},{id:"table",name:"the table",x:3,y:4},{id:"table-2",name:"the small table",x:5,y:5},{id:"cash-register",name:"the cash register",x:1,y:7}]},_e={width:5,height:5,tiles:[["sH","F","W","sH","sH"],["F","F","W","F","F"],["sH","F","tB","F","sH"],["F","F","F","F","F"],["F","cR","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[2,3]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,3],[4,3]]},{id:"checkout",name:"Checkout",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:3,y:0},{id:"shelf-3",name:"the shelf",x:4,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:4,y:2},{id:"table",name:"the table",x:2,y:2},{id:"cash-register",name:"the cash register",x:1,y:4}]},Ye={width:6,height:6,tiles:[["sH","F","W","W","sH","sH"],["F","F","W","F","F","F"],["sH","F","F","F","F","sH"],["F","F","W","F","tB","F"],["F","F","F","F","F","F"],["F","cR","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,2],[3,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,1],[4,1],[5,1],[3,2],[4,2],[5,2],[4,3],[5,3]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,4],[4,4],[5,4]]},{id:"checkout",name:"Checkout",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:4,y:0},{id:"shelf-3",name:"the shelf",x:5,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:5,y:2},{id:"table",name:"the table",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},Ke={width:7,height:7,tiles:[["sH","F","F","W","sH","sH","sH"],["F","F","sH","W","F","F","F"],["sH","F","F","tB","F","F","sH"],["F","F","W","W","F","tB","F"],["sH","F","F","F","F","F","F"],["F","F","F","F","F","F","sH"],["F","cR","C","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,1],[3,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"romance-novels",name:"Romance Novels",cells:[[4,3],[5,3],[6,3],[3,4],[4,4],[5,4],[6,4],[3,5],[4,5],[5,5]]},{id:"collectors",name:"Collector's Corner",cells:[[6,5]]},{id:"checkout",name:"Checkout",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"shelf-crime",name:"the shelf",x:0,y:0},{id:"shelf-nonfic-1",name:"the shelf",x:4,y:0},{id:"shelf-nonfic-2",name:"the shelf",x:5,y:0},{id:"shelf-nonfic-3",name:"the shelf",x:6,y:0},{id:"shelf-crime-2",name:"the shelf",x:0,y:2},{id:"shelf-nonfic-4",name:"the shelf",x:6,y:2},{id:"table-1",name:"the reading table",x:3,y:2},{id:"table-2",name:"the table",x:5,y:3},{id:"shelf-best",name:"the shelf",x:0,y:4},{id:"shelf-collect",name:"the shelf",x:6,y:5},{id:"cash-register",name:"the cash register",x:1,y:6}]},qe={width:5,height:5,tiles:[["pL","F","W","jZ","jZ"],["F","F","W","jZ","C"],["pL","F","F","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[3,0],[4,0],[3,1],[4,1]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:0,y:2},{id:"plant-3",name:"the plant",x:4,y:3},{id:"jacuzzi",name:"the jacuzzi",x:3,y:0}]},Ge={width:6,height:7,tiles:[["pL","F","F","W","jZ","jZ"],["F","F","F","W","jZ","C"],["F","pL","F","F","F","F"],["W","W","W","W","W","W"],["B","F","F","S","F","F"],["F","F","tV","F","F","F"],["F","F","W","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[4,0],[5,0],[4,1],[5,1]]},{id:"deck",name:"Deck",cells:[[3,2],[4,2],[5,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:1,y:2},{id:"jacuzzi",name:"the jacuzzi",x:4,y:0},{id:"tv",name:"the TV",x:2,y:5}]},Ue={width:7,height:8,tiles:[["pL","F","F","F","W","jZ","jZ"],["F","F","pL","F","W","jZ","C"],["F","F","F","F","F","C","F"],["W","W","W","W","W","W","W"],["B","F","F","S","F","F","W"],["F","F","tV","F","F","pL","W"],["W","W","W","cT","F","F","W"],["W","W","F","F","F","W","W"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[5,0],[6,0],[5,1],[6,1]]},{id:"deck",name:"Deck",cells:[[4,2],[5,2],[6,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5]]},{id:"kitchen",name:"Kitchen",cells:[[3,6],[4,6],[5,6],[2,7],[3,7],[4,7]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:2,y:1},{id:"plant-3",name:"the plant",x:5,y:5},{id:"jacuzzi",name:"the jacuzzi",x:5,y:0},{id:"tv",name:"the TV",x:2,y:5},{id:"counter",name:"the counter",x:3,y:6}]},Ze={width:5,height:6,tiles:[["sT","F","F","F","sT"],["F","F","W","F","F"],["F","F","F","F","F"],["tD","F","F","F","sH"],["F","C","F","F","F"],["F","F","W","cR","F"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1]]},{id:"santas-village",name:"Santa's Village",cells:[[2,0],[3,0],[3,1],[0,3],[1,3],[2,3],[0,4],[1,4],[2,4]]},{id:"toy-store",name:"Toy Store",cells:[[4,0],[4,1]]},{id:"walkway",name:"Walkway",cells:[[0,2],[1,2],[2,2],[3,2],[4,2]]},{id:"bookstore",name:"Bookstore",cells:[[3,3],[4,3],[3,4],[4,4]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[0,5],[1,5],[3,5],[4,5]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:4,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:3},{id:"shelf",name:"the shelf",x:4,y:3},{id:"cash-register",name:"the cash register",x:3,y:5}]},Je={width:7,height:7,tiles:[["sT","F","F","W","F","F","sT"],["F","F","W","F","F","F","F"],["F","F","F","F","F","W","F"],["F","F","F","F","F","F","F"],["tD","F","F","W","F","sH","F"],["F","C","F","W","F","F","C"],["F","F","W","F","cR","F","F"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"santas-village",name:"Santa's Village",cells:[[3,1],[4,1],[5,1],[6,1],[3,2],[4,2],[5,2]]},{id:"santas-lodge",name:"Santa's Lodge",cells:[[4,0],[5,0],[6,0]]},{id:"toy-store",name:"Toy Store",cells:[[6,2],[5,3],[6,3],[4,4],[5,4],[6,4],[5,5],[6,5]]},{id:"walkway",name:"Walkway",cells:[[0,3],[1,3],[2,3],[3,3],[4,3]]},{id:"food-court",name:"Food Court",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[0,6],[1,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:6,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:4},{id:"shelf",name:"the shelf",x:5,y:4},{id:"cash-register",name:"the cash register",x:4,y:6}]},Xe={width:8,height:8,tiles:[["sT","F","F","W","F","F","F","sT"],["F","F","W","F","F","F","F","F"],["F","F","F","F","F","W","F","F"],["F","F","F","F","F","F","F","F"],["tD","F","F","W","F","sH","F","F"],["F","C","F","W","F","F","C","F"],["F","F","W","F","cR","F","F","F"],["F","F","F","F","F","F","F","tR"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[0,3],[1,3]]},{id:"santas-lodge",name:"Santa's Lodge",cells:[[4,0],[5,0],[6,0],[7,0],[4,1],[5,1],[6,1],[7,1]]},{id:"santas-village",name:"Santa's Village",cells:[[3,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]]},{id:"toy-store",name:"Toy Store",cells:[[6,2],[7,2],[6,3],[7,3],[6,4],[7,4],[6,5],[7,5]]},{id:"walkway",name:"Walkway",cells:[[2,2],[2,3],[2,4],[3,4],[4,4],[2,5],[2,6]]},{id:"food-court",name:"Food Court",cells:[[0,4],[1,4],[0,5],[1,5],[0,6],[1,6],[0,7],[1,7],[2,7]]},{id:"bookstore",name:"Bookstore",cells:[[5,4],[5,5],[4,6],[5,6],[6,6],[7,6]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[3,6],[3,7],[4,7],[5,7],[6,7],[7,7]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:7,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:4},{id:"shelf",name:"the shelf",x:5,y:4},{id:"cash-register",name:"the cash register",x:4,y:6},{id:"tree",name:"the Christmas tree",x:7,y:7}]},Qe={width:5,height:5,tiles:[["cT","cT","W","F","C"],["F","F","W","F","F"],["F","C","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"dining-room",name:"Dining Room",cells:[[3,0],[4,0],[3,1],[4,1],[2,2],[3,2],[4,2]]},{id:"bar",name:"Bar",cells:[[2,1]]},{id:"restroom",name:"Restroom",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0}]},et={width:6,height:6,tiles:[["cT","cT","cT","W","F","C"],["F","F","F","W","F","F"],["F","C","F","F","F","F"],["F","F","F","F","C","F"],["W","W","W","W","W","W"],["F","F","F","C","F","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},{id:"dining-room",name:"Dining Room",cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]]},{id:"bar",name:"Bar",cells:[[3,1]]},{id:"private-room",name:"Private Room",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0},{id:"counter-3",name:"the counter",x:2,y:0}]},tt={width:7,height:7,tiles:[["cT","cT","cT","cT","W","F","C"],["F","F","F","F","W","F","F"],["F","C","F","F","F","F","F"],["F","F","F","F","C","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","C","F","F","C","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"dining-room",name:"Dining Room",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3],[4,4],[5,4],[6,4]]},{id:"bar",name:"Bar",cells:[[4,1],[0,4],[1,4],[2,4],[3,4]]},{id:"restroom",name:"Restroom",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0},{id:"counter-3",name:"the counter",x:2,y:0},{id:"counter-4",name:"the counter",x:3,y:0}]},nt={width:5,height:5,tiles:[["wT","F","W","tM","tM"],["F","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"cardio",name:"Cardio",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"weight-rack",name:"the weight rack",x:0,y:0},{id:"treadmill-1",name:"the treadmill",x:3,y:0},{id:"treadmill-2",name:"the treadmill",x:4,y:0}]},ot={width:6,height:7,tiles:[["wT","F","W","tM","tM","F"],["F","F","W","F","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","jZ","jZ"],["F","C","F","F","jZ","C"],["F","F","W","F","F","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"cardio",name:"Cardio",cells:[[3,0],[4,0],[5,0],[3,1],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"pool",name:"Pool",cells:[[4,4],[5,4],[4,5],[5,5]]},{id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[0,5],[1,5],[2,5],[3,5]]},{id:"sauna",name:"Sauna",cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]}],landmarks:[{id:"weight-rack",name:"the weight rack",x:0,y:0},{id:"treadmill-1",name:"the treadmill",x:3,y:0},{id:"treadmill-2",name:"the treadmill",x:4,y:0},{id:"pool",name:"the pool",x:4,y:4}]},at={width:7,height:8,tiles:[["wT","wT","F","W","tM","tM","F"],["F","F","F","W","F","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","jZ","jZ","jZ"],["F","C","F","F","jZ","C","jZ"],["F","F","W","F","F","F","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},{id:"cardio",name:"Cardio",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"studio",name:"Studio",cells:[[3,2],[3,3]]},{id:"pool",name:"Pool",cells:[[4,5],[5,5],[6,5],[4,6],[5,6],[6,6]]},{id:"locker-room",name:"Locker Room",cells:[[0,5],[1,5],[2,5],[3,5],[0,6],[1,6],[2,6],[3,6]]},{id:"sauna",name:"Sauna",cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"weight-rack-1",name:"the weight rack",x:0,y:0},{id:"weight-rack-2",name:"the weight rack",x:1,y:0},{id:"treadmill-1",name:"the treadmill",x:4,y:0},{id:"treadmill-2",name:"the treadmill",x:5,y:0},{id:"pool",name:"the pool",x:4,y:5}]},it={width:5,height:5,tiles:[["dK","F","W","F","C"],["F","F","W","F","F"],["F","C","F","F","F"],["W","W","W","W","W"],["F","F","pC","F","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"meeting-room",name:"Meeting Room",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"kitchen",name:"Kitchen",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"desk",name:"the desk",x:0,y:0},{id:"photocopier",name:"the photocopier",x:2,y:4}]},st={width:6,height:6,tiles:[["dK","F","F","W","F","C"],["F","F","F","W","F","F"],["F","C","F","F","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","pC","F","F","C","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},{id:"meeting-room",name:"Meeting Room",cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"reception",name:"Reception",cells:[[3,1]]},{id:"kitchen",name:"Kitchen",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"desk",name:"the desk",x:0,y:0},{id:"photocopier",name:"the photocopier",x:1,y:5}]},rt={width:7,height:7,tiles:[["dK","F","F","F","W","F","C"],["F","F","F","F","W","F","F"],["F","C","F","F","F","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","dK","F"],["W","W","W","W","W","W","W"],["F","pC","F","F","C","F","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3],[0,4],[1,4],[2,4],[3,4]]},{id:"meeting-room",name:"Meeting Room",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"server-room",name:"Server Room",cells:[[4,4],[5,4],[6,4]]},{id:"kitchen",name:"Kitchen",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"desk-1",name:"the desk",x:0,y:0},{id:"desk-2",name:"the manager's desk",x:5,y:4},{id:"photocopier",name:"the photocopier",x:1,y:6}]},w={"coffee-shop":{easy:He,medium:Ve,hard:De},bookstore:{easy:_e,medium:Ye,hard:Ke},backyard:{easy:qe,medium:Ge,hard:Ue},"holiday-mall":{easy:Ze,medium:Je,hard:Xe},restaurant:{easy:Qe,medium:et,hard:tt},gym:{easy:nt,medium:ot,hard:at},office:{easy:it,medium:st,hard:rt}};function de(e){const t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]??t[n]??t[0])}const lt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the café.`,inColumn:(e,t)=>`${e} was in the ${de(t)} column.`,inRow:(e,t)=>`${e} was in the ${de(t)} row.`,besideSuspect:(e,t)=>`${e} was standing next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>t==="chair"?`${e} was sitting in a chair.`:t==="sofa"?`${e} was on the sofa.`:`${e} was on the ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,n)=>`${e} was exactly ${n} row${n>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,n)=>`${e} was exactly ${n} row${n>1?"s":""} south of ${t}.`},ct={id:"coffee-shop",name:"The Coffee Shop",floorPlans:{easy:w["coffee-shop"].easy,medium:w["coffee-shop"].medium,hard:w["coffee-shop"].hard},suspectNames:["Alice","Ben","Chloe","Diego","Elena","Finlay","Grace","Hassan","Iris","Jake","Lena","Marco"],victimNames:["Victor","Violet","Vera","Valencia","Vance","Vivian"],clueTemplates:lt,narrativeTemplates:{intro:["A body has been found at the Copper Bean Café. The morning rush never arrived — instead, the regulars found yellow tape across the door. You pour yourself an espresso and get to work.","The Copper Bean Café is closed for a very different reason today. Someone is dead, and the witnesses are all still clutching their lattes. You take out your notebook.","It was supposed to be a quiet Tuesday at the Copper Bean. Then the screaming started. Now it's your problem. You order a black coffee and begin."],victimFound:["The victim was discovered near table four, cold cup of coffee still in hand.","Staff found the victim behind the counter during the morning prep.","A regular spotted the victim slumped in the corner booth before opening."],guiltyText:["{{killerName}} — served with a side of motive.","{{killerName}} — the evidence is as clear as an Americano.","{{killerName}} — there's no running from the detective on this one."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:plant":"","object:cash-register":"","object:table":""}};function me(e){const t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]??t[n]??t[0])}const dt={inRoom:(e,t)=>`${e} was browsing in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same section as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different sections.`,inColumn:(e,t)=>`${e} was in the ${me(t)} column.`,inRow:(e,t)=>`${e} was in the ${me(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was standing near ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="chair"?`${e} was sitting in a reading chair.`:`${e} was sitting on the ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,n)=>`${e} was exactly ${n} row${n>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,n)=>`${e} was exactly ${n} row${n>1?"s":""} south of ${t}.`},mt={id:"bookstore",name:"The Bookstore",floorPlans:{easy:w.bookstore.easy,medium:w.bookstore.medium,hard:w.bookstore.hard},suspectNames:["Alex","Bridget","Colin","Diana","Edmund","Fiona","George","Hannah","Ivan","Julia","Kevin","Lydia"],victimNames:["Vincent","Valerie","Violet","Victor","Vera","Valencia"],clueTemplates:dt,narrativeTemplates:{intro:["The First Chapter Bookshop opened this morning to find more than just dust between the shelves. Someone is dead, and the regulars are still clutching their Earl Grey. You step over the crime scene tape and start asking questions.","A reader never returns a book. This one never returned at all. The First Chapter Bookshop is closed indefinitely — and you're the reason it might reopen. Notebook out.","Mondays at the bookshop are quiet. This Monday is the quietest it's ever been. The body was found in the stacks before the first customer arrived. You're on the case."],victimFound:["The victim was discovered slumped against the shelf in the early morning.","A shop assistant found the victim face-down near the reading table.","The victim was found between the shelves before opening time."],guiltyText:["{{killerName}} — the ending nobody saw coming.","{{killerName}} — the plot twist is on the last page.","{{killerName}} — even mysteries have their answers."]},colorPalette:{floor:"#f0ead6",wall:"#3d2b1f",seat:"#7a5c3a",accent:"#8b1a1a",background:"#1a1510",text:"#ffffff"},spriteMap:{"object:shelf":"","object:table":"","object:cash-register":""}};function ue(e){const t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]??t[n]??t[0])}const ut={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the yard.`,inColumn:(e,t)=>`${e} was in the ${ue(t)} column.`,inRow:(e,t)=>`${e} was in the ${ue(t)} row.`,besideSuspect:(e,t)=>`${e} was right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="sofa"?`${e} was on the outdoor sofa.`:t==="bed"?`${e} was in the bedroom.`:`${e} was sitting in a chair.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,n)=>`${e} was exactly ${n} row${n>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,n)=>`${e} was exactly ${n} row${n>1?"s":""} south of ${t}.`},ht={id:"backyard",name:"The Backyard",floorPlans:{easy:w.backyard.easy,medium:w.backyard.medium,hard:w.backyard.hard},suspectNames:["Aaron","Becca","Chad","Donna","Eric","Fran","Greg","Helen","Ian","Jess","Kurt","Lisa"],victimNames:["Victor","Vanessa","Vince","Vera","Valentina","Virgil"],clueTemplates:ut,narrativeTemplates:{intro:["The Hendersons were supposed to be hosting a barbecue. Instead, they're hosting a detective. Someone is dead in the backyard and the potato salad is getting warm. You flash your badge.","Summer parties end in hangovers, not homicides. Usually. The backyard of 14 Maple Drive is now a crime scene and you're the one who has to ruin everyone's weekend.","It was a perfect Sunday afternoon until it wasn't. The body was found near the jacuzzi before anyone noticed their drink had gone untouched. You arrive with your notepad."],victimFound:["The victim was found floating face-down near the jacuzzi.","A guest discovered the victim collapsed on the deck.","The victim was found on the grass between the patio chairs."],guiltyText:["{{killerName}} — summer is ruined.","{{killerName}} — the neighborhood will never be the same.","{{killerName}} — nobody escapes the backyard detective."]},colorPalette:{floor:"#d4e8c2",wall:"#5d4037",seat:"#8d6e63",accent:"#e64a19",background:"#1a200f",text:"#ffffff"},spriteMap:{"object:plant":"","object:jacuzzi-tile":"","object:tv":"","object:sofa":""}};function he(e){const t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]??t[n]??t[0])}const ft={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was shopping in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the mall.`,inColumn:(e,t)=>`${e} was in the ${he(t)} column.`,inRow:(e,t)=>`${e} was in the ${he(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting${t==="chair"?"":" on a "+t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,n)=>`${e} was exactly ${n} row${n>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,n)=>`${e} was exactly ${n} row${n>1?"s":""} south of ${t}.`},pt={id:"holiday-mall",name:"The Holiday Mall",floorPlans:{easy:w["holiday-mall"].easy,medium:w["holiday-mall"].medium,hard:w["holiday-mall"].hard},suspectNames:["Ashley","Brett","Cameron","Denise","Eli","Felicia","Grant","Holly","Irving","Jade","Kyle","Melody"],victimNames:["Victor","Vivian","Vera","Valencia","Vince","Velma"],clueTemplates:ft,narrativeTemplates:{intro:["The North Pole Mall was supposed to close early for the holiday rush. Instead, it's closed indefinitely. The security cameras caught everything except whoever did this. You wade through the tinsel.","Christmas shopping season. The most wonderful time of year — unless you're the one who ends up under the tree with a chalk outline. You badge your way in through the entrance.","The last thing anyone expects on December 23rd is a murder at the mall. The second-to-last thing is the detective they send. Here you are anyway."],victimFound:["The victim was discovered near the gift-wrapping station before the mall opened.","Security found the victim in the walkway between the stalls.","A store manager found the victim near the Christmas tree display."],guiltyText:["{{killerName}} — some gifts aren't worth giving.","{{killerName}} — unwrapped at last.","{{killerName}} — the season's greetings end here."]},colorPalette:{floor:"#e8e0d0",wall:"#2c3e50",seat:"#7f8c8d",accent:"#c0392b",background:"#0d1117",text:"#ffffff"},spriteMap:{"object:stall":"","object:shelf":"","object:cash-register":"","object:tree":"","object:teddy-bear":""}};function fe(e){const t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]??t[n]??t[0])}const bt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was dining in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the restaurant.`,inColumn:(e,t)=>`${e} was in the ${fe(t)} column.`,inRow:(e,t)=>`${e} was in the ${fe(t)} row.`,besideSuspect:(e,t)=>`${e} was seated right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="sofa"?`${e} was on the banquette seating.`:`${e} was sitting at a table.`,notOnSeatTile:e=>`${e} was not seated.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,n)=>`${e} was exactly ${n} row${n>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,n)=>`${e} was exactly ${n} row${n>1?"s":""} south of ${t}.`},yt={id:"restaurant",name:"The Restaurant",floorPlans:{easy:w.restaurant.easy,medium:w.restaurant.medium,hard:w.restaurant.hard},suspectNames:["Andre","Bianca","Carlo","Delphine","Emilio","Francoise","Gerard","Helena","Ignacio","Josephine","Kristoffer","Loretta"],victimNames:["Victor","Violette","Vincenzo","Vera","Valeria","Vidal"],clueTemplates:bt,narrativeTemplates:{intro:["La Maison Rouge was fully booked for a private function. It's now fully booked by the police. Someone didn't make it to dessert — and you're the unwanted amuse-bouche.","The head chef found the body before the morning prep. The restaurant is closed, the reservations are cancelled, and the chef is refusing to speak without a lawyer. You order espresso.","Five-star dining. One-star outcome. The Michelin inspector will not be pleased. Neither will whoever left the body in the private dining room."],victimFound:["The victim was found slumped in the private dining room.","Kitchen staff discovered the victim near the counter.","The sommelier found the victim in the dining room early in the morning."],guiltyText:["{{killerName}} — an amuse-bouche of justice.","{{killerName}} — the bill has arrived.","{{killerName}} — this dish is best served cold."]},colorPalette:{floor:"#f5e8d0",wall:"#3b1f1f",seat:"#8b1a1a",accent:"#c0392b",background:"#180a0a",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:counter":"","object:table":"","object:plant":""}};function pe(e){const t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]??t[n]??t[0])}const gt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were training in different zones.`,inColumn:(e,t)=>`${e} was in the ${pe(t)} column.`,inRow:(e,t)=>`${e} was in the ${pe(t)} row.`,besideSuspect:(e,t)=>`${e} was working out right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting on a bench.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,n)=>`${e} was exactly ${n} row${n>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,n)=>`${e} was exactly ${n} row${n>1?"s":""} south of ${t}.`},Ft={id:"gym",name:"The Gym",floorPlans:{easy:w.gym.easy,medium:w.gym.medium,hard:w.gym.hard},suspectNames:["Atlas","Blair","Corey","Dakota","Evander","Fitz","Gabe","Hunter","Indira","Jordan","Knox","Leila"],victimNames:["Vance","Valentina","Viktor","Vera","Vito","Vesper"],clueTemplates:gt,narrativeTemplates:{intro:["FitLife Gym opens at 5am. This morning it opened to a body near the weight rack. The morning regulars are sweating for a different reason now.","Somebody skipped leg day — and left somebody else skipping all days. The body was found in the Weights area. You badge through the turnstile.","The gym is 24 hours. The victim wasn't. You arrive with your notepad and a distinct lack of enthusiasm for the treadmill."],victimFound:["The victim was found near the weight rack before the early shift.","A trainer discovered the victim collapsed in the cardio area.","The victim was found in the pool area during the morning check."],guiltyText:["{{killerName}} — no amount of cardio outpaces the truth.","{{killerName}} — their reps are done.","{{killerName}} — spotting the killer was the easy part."]},colorPalette:{floor:"#e8e0d8",wall:"#2c3e50",seat:"#7f8c8d",accent:"#e74c3c",background:"#0d1117",text:"#ffffff"},spriteMap:{"object:weight-rack":"","object:treadmill":"","object:counter":"","object:jacuzzi-tile":""}};function be(e){const t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]??t[n]??t[0])}const wt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was working in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the office.`,inColumn:(e,t)=>`${e} was in the ${be(t)} column.`,inRow:(e,t)=>`${e} was in the ${be(t)} row.`,besideSuspect:(e,t)=>`${e} was working right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting at their desk.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,n)=>`${e} was exactly ${n} row${n>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,n)=>`${e} was exactly ${n} row${n>1?"s":""} south of ${t}.`},xt={id:"office",name:"The Office",floorPlans:{easy:w.office.easy,medium:w.office.medium,hard:w.office.hard},suspectNames:["Adrian","Brooke","Clive","Daria","Edwin","Fiona","Graham","Harriet","Isaac","Judith","Kieran","Laura"],victimNames:["Vincent","Veronica","Vance","Vivienne","Victor","Velvet"],clueTemplates:wt,narrativeTemplates:{intro:["Meridian Corp. Floor 12. The quarterly review meeting has been cancelled for the most permanent possible reason. You badge in and start asking questions before the lawyers arrive.","The victim was found at their desk. The access log shows they never left last night. Whoever did this knew the building. You start with the people who knew it best.","It was supposed to be a normal Monday. Then the HR department filed the wrong kind of incident report. You turn off your phone's out-of-office message and get to work."],victimFound:["The victim was found at their desk during the morning security check.","The building manager found the victim in the Meeting Room after the overnight shift.","A colleague discovered the victim in the Server Room at 7am."],guiltyText:["{{killerName}} — the performance review was terminal.","{{killerName}} — this one won't go in the quarterly report.","{{killerName}} — consider this case closed."]},colorPalette:{floor:"#e8e8f0",wall:"#34495e",seat:"#7f8c8d",accent:"#2980b9",background:"#0a0a14",text:"#ffffff"},spriteMap:{"object:desk":"","object:photocopier":"","object:tv":"","object:plant":""}},vt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same room as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different rooms.`,inColumn:(e,t)=>`${e} was in column ${t}.`,inRow:(e,t)=>`${e} was in row ${t}.`,besideSuspect:(e,t)=>`${e} was beside ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>`${e} was on a ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,n)=>`${e} was exactly ${n} row${n>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,n)=>`${e} was exactly ${n} row${n>1?"s":""} south of ${t}.`},kt={id:"stub",name:"Test Room",floorPlans:{easy:w["coffee-shop"].easy,medium:w["coffee-shop"].medium,hard:w["coffee-shop"].hard},suspectNames:["Alice","Bob","Carol","Dave","Eve","Frank","Grace","Henry","Iris","Jack","Kate","Leo"],victimNames:["Vera","Victor","Violet","Valencia","Vance","Vivian"],clueTemplates:vt,narrativeTemplates:{intro:["A crime has occurred in the Test Room.","Witnesses report suspicious activity.","The detective arrives on the scene."],victimFound:["The victim was found at the scene.","A body has been discovered.","The victim was discovered here."],guiltyText:["{{killerName}} — caught red-handed.","{{killerName}} — the evidence is clear.","{{killerName}} — guilty as charged."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{}},oe=new Map;function N(e){oe.set(e.id,e)}function $t(e){const t=oe.get(e);if(!t)throw new Error(`Unknown theme: ${e}`);return t}function Ct(){return Array.from(oe.values())}N(ct);N(mt);N(ht);N(pt);N(yt);N(Ft);N(xt);N(kt);function St(e,t){return t[e]??""}const p=64,U=new Map;function Tt(e){if(!e)return null;if(U.has(e))return U.get(e);const t=new Image,n=new Blob([e],{type:"image/svg+xml"}),a=URL.createObjectURL(n);return t.onload=()=>{U.set(e,t),URL.revokeObjectURL(a)},t.src=a,null}function ye(e,t,n,a){e.fillStyle="#c8a96e",e.fillRect(t,n,p,p),e.fillStyle="#ffffff",e.font="8px monospace",e.textAlign="center",e.textBaseline="middle",e.fillText(a.slice(0,4),t+p/2,n+p/2),e.textAlign="left",e.textBaseline="alphabetic"}function Rt(e){let t=0;for(let n=0;n<e.length;n++)t=t*31+e.charCodeAt(n)&65535;return`hsl(${t%360}, 65%, 55%)`}const Et={pL:"object:plant",tB:"object:table",sH:"object:shelf",cR:"object:cash-register",bB:"object:bar-counter",tV:"object:tv",cT:"object:counter",dK:"object:desk",pC:"object:photocopier",fB:"object:flower-bed",hB:"object:hospital-bed",mC:"object:medicine-cabinet",tR:"object:tree",tD:"object:teddy-bear",cH:"object:carousel-horse",tM:"object:treadmill",wT:"object:weight-rack",sT:"object:stall",jZ:"object:jacuzzi-tile"},Nt=new Set(["C","S","B"]);function Wt(e,t,n,a,o){const s=t.floorPlan,i=n.colorPalette,{blockedRows:r,blockedCols:u}=Re(Array.from(a.values()));for(let c=0;c<s.height;c++)for(let d=0;d<s.width;d++){const f=s.tiles[c][d],l=d*p,m=c*p;if(f==="W"){e.fillStyle=i.wall,e.fillRect(l,m,p,p);continue}if(Nt.has(f)){e.fillStyle=i.seat,e.fillRect(l,m,p,p),e.fillStyle="rgba(0,0,0,0.2)",e.beginPath(),e.arc(l+p/2,m+p/2,p*.3,0,Math.PI*2),e.fill(),e.strokeStyle="rgba(0,0,0,0.1)",e.lineWidth=.5,e.strokeRect(l,m,p,p);continue}if(f!=="F"){const b=Et[f]??`object:${f}`,h=St(b,n.spriteMap);if(h){const g=Tt(h);g?e.drawImage(g,l,m,p,p):ye(e,l,m,b.replace("object:",""))}else ye(e,l,m,b.replace("object:",""));continue}e.fillStyle=i.floor,e.fillRect(l,m,p,p),e.strokeStyle="rgba(0,0,0,0.1)",e.lineWidth=.5,e.strokeRect(l,m,p,p)}e.fillStyle="rgba(0, 0, 0, 0.15)";for(const c of r)e.fillRect(0,c*p,s.width*p,p);for(const c of u)e.fillRect(c*p,0,p,s.height*p);if(o){const c=o.x*p,d=o.y*p;e.strokeStyle=i.accent,e.lineWidth=3,e.strokeRect(c+2,d+2,p-4,p-4),e.fillStyle=`${i.accent}33`,e.fillRect(c+2,d+2,p-4,p-4)}for(const[c,d]of a){const f=t.suspects.find(b=>b.id===c);if(!f)continue;const l=d.x*p,m=d.y*p;e.fillStyle=Rt(c),e.beginPath(),e.arc(l+p/2,m+p/2,p*.38,0,Math.PI*2),e.fill(),e.fillStyle="#ffffff",e.font=`bold ${Math.floor(p*.4)}px monospace`,e.textAlign="center",e.textBaseline="middle",e.fillText(f.name.charAt(0).toUpperCase(),l+p/2,m+p/2),e.textAlign="left",e.textBaseline="alphabetic"}}function It(e){return{width:e.floorPlan.width*p,height:e.floorPlan.height*p}}const jt=`
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
`;let ge=!1;function Bt(){if(ge)return;const e=document.createElement("style");e.textContent=jt,document.head.appendChild(e),ge=!0}function Mt(e){let t=0;for(let n=0;n<e.length;n++)t=t*31+e.charCodeAt(n)&65535;return`hsl(${t%360}, 65%, 55%)`}function Ot(e,t,n,a,o){Bt(),e.innerHTML="",e.className="alibi-sidebar";const s=document.createElement("div");s.className="alibi-suspect-section";for(const r of t.suspects){const u=document.createElement("div");u.className="alibi-suspect-card"+(n.has(r.id)?" placed":"");const c=document.createElement("div");c.className="alibi-suspect-initial",c.style.background=Mt(r.id),c.textContent=r.name.charAt(0).toUpperCase();const d=document.createElement("span");d.textContent=r.name,u.appendChild(c),u.appendChild(d),s.appendChild(u)}e.appendChild(s);const i=document.createElement("div");i.className="alibi-clue-section",t.clues.forEach((r,u)=>{const c=document.createElement("div");c.className="alibi-clue-card",c.setAttribute("data-testid",`clue-${u}`),a.has(u)&&c.classList.add("clue-satisfied"),o.has(u)&&c.classList.add("clue-error"),c.textContent=r.text,i.appendChild(c)}),e.appendChild(i)}const Lt=`
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
`;let Fe=!1;function ae(){if(Fe)return;const e=document.createElement("style");e.textContent=Lt,document.head.appendChild(e),Fe=!0}function Z(e,t,n){ae(),ie(e);const a=document.createElement("div");a.className="alibi-overlay",a.setAttribute("data-testid","narrative-intro");const o=document.createElement("div");o.className="alibi-modal";const s=document.createElement("h2");s.textContent="A New Case";const i=document.createElement("p");i.textContent=t.narrativeIntro;const r=document.createElement("button");r.textContent="Begin Investigation",r.addEventListener("click",()=>{a.remove(),n()}),o.appendChild(s),o.appendChild(i),o.appendChild(r),a.appendChild(o),e.appendChild(a)}function At(e,t){ae(),ie(e);const n=t.narrativeGuilty.replace("{{killerName}}",t.killer.name),a=document.createElement("div");a.className="alibi-overlay";const o=document.createElement("div");o.className="alibi-modal";const s=document.createElement("div");s.className="alibi-guilty-stamp",s.setAttribute("data-testid","guilty-stamp"),s.textContent="GUILTY";const i=document.createElement("div");i.className="alibi-guilty-killer",i.setAttribute("data-testid","guilty-killer-name"),i.textContent=t.killer.name;const r=document.createElement("p");r.textContent=n;const u=document.createElement("p");u.textContent=t.narrativeVictimFound,o.appendChild(s),o.appendChild(i),o.appendChild(u),o.appendChild(r),a.appendChild(o),e.appendChild(a)}function ie(e){const t=e.querySelector(".alibi-overlay");t&&t.remove()}function zt(e){ae(),ie(e);const t=document.createElement("div");t.className="alibi-overlay",t.setAttribute("data-testid","msg-clue-gate");const n=document.createElement("div");n.className="alibi-modal";const a=document.createElement("h2");a.textContent="Something Doesn't Add Up…";const o=document.createElement("p");o.textContent="Check the clue cards. Not all witnesses are satisfied.";const s=document.createElement("button");s.textContent="Keep Investigating",s.addEventListener("click",()=>t.remove()),n.appendChild(a),n.appendChild(o),n.appendChild(s),t.appendChild(n),e.appendChild(t),setTimeout(()=>{t.isConnected&&t.remove()},3e3)}function we(e){return{placements:new Map,satisfiedClues:new Set,errorClues:new Set,victimVisible:!1,victimCell:null,phase:"playing",elapsedMs:0}}function Pt(e,t,n,a,o){const s=new Map(e.placements);return s.set(n,{suspectId:n,x:a,y:o}),se({...e,placements:s},t)}function Ht(e,t,n){const a=new Map(e.placements);return a.delete(n),se({...e,placements:a},t)}function J(e,t,n){return se({...e,placements:new Map(n)},t)}function Vt(e){if(e.satisfiedClues.size===0&&e.placements.size>0)return e;const t=e.satisfiedClues.size+e.errorClues.size;return e.errorClues.size===0&&t>0&&e.victimVisible?{...e,phase:"guilty"}:e}function se(e,t){const n=new Set,a=new Set;t.clues.forEach((i,r)=>{const u=ee(t.floorPlan,i,e.placements);u===!0?n.add(r):u===!1&&a.add(r)});const o=Ee(t.floorPlan,Array.from(e.placements.values()));return{...e,satisfiedClues:n,errorClues:a,victimVisible:o!==null,victimCell:o}}const Dt=50;class _t{constructor(){q(this,"past",[]);q(this,"future",[])}push(t){this.past.push(new Map(t)),this.past.length>Dt&&this.past.shift(),this.future=[]}undo(t){return this.past.length===0?null:(this.future.push(new Map(t)),new Map(this.past.pop()))}redo(t){return this.future.length===0?null:(this.past.push(new Map(t)),new Map(this.future.pop()))}canUndo(){return this.past.length>0}canRedo(){return this.future.length>0}clear(){this.past=[],this.future=[]}}let O=null,D=!1;function Yt(){if(D)return null;try{return O||(O=new AudioContext),O.state==="suspended"&&O.resume().catch(()=>{}),O}catch{return null}}function E(e,t,n="sine",a=.15){const o=Yt();if(o)try{const s=o.createOscillator(),i=o.createGain();s.connect(i),i.connect(o.destination),s.type=n,s.frequency.value=e,i.gain.setValueAtTime(a,o.currentTime),i.gain.exponentialRampToValueAtTime(.001,o.currentTime+t),s.start(o.currentTime),s.stop(o.currentTime+t)}catch{}}function H(e){switch(e){case"place":E(440,.08,"sine",.12);break;case"remove":E(330,.06,"sine",.08);break;case"clue-satisfied":E(660,.12,"sine",.15);break;case"solve":{E(523,.15,"sine",.2),setTimeout(()=>E(659,.15,"sine",.2),150),setTimeout(()=>E(784,.3,"sine",.25),300);break}case"error":E(220,.2,"square",.1);break;case"navigate":E(880,.05,"sine",.08);break}}function Kt(){return D=!D,D}function qt(e,t){const n=Math.floor(t/6e4),a=Math.floor(t%6e4/1e3),o=n>0?`${n}m ${a}s`:`${a}s`,s=e.difficulty.charAt(0).toUpperCase()+e.difficulty.slice(1);return["🔍 ALIBI",`Case: ${e.floorPlan===e.floorPlan?e.themeId.replace(/-/g," ").replace(/\b\w/g,i=>i.toUpperCase()):"Unknown"}`,`Difficulty: ${s}`,`Clues: ${e.clues.length}`,`Time: ${o}`,`Killer: ${e.killer.name}`,"","pnz1990.github.io/alibi/"].join(`
`)}async function Gt(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;const t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:-9999px;left:-9999px;",document.body.appendChild(t),t.focus(),t.select();const n=document.execCommand("copy");return document.body.removeChild(t),n}catch{return!1}}const re={campaign:e=>`alibi_campaign_${e}`,daily:e=>`alibi_daily_${e}`,streak:"alibi_streak",stats:"alibi_stats",prefs:"alibi_prefs",puzzleState:"alibi_puzzle_state"};function Ut(e){try{const t=le();t[e.key]=e,localStorage.setItem(re.puzzleState,JSON.stringify(t))}catch{}}function Zt(e){try{return le()[e]??null}catch{return null}}function xe(e){try{const t=le();delete t[e],localStorage.setItem(re.puzzleState,JSON.stringify(t))}catch{}}function le(){try{const e=localStorage.getItem(re.puzzleState);return e?JSON.parse(e):{}}catch{return{}}}const Jt=`
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
`;let ve=!1;function Xt(){if(ve)return;const e=document.createElement("style");e.textContent=Jt,document.head.appendChild(e),ve=!0}function Qt(e,t,n,a,o){Xt();const s=t.floorPlan,i=document.createElement("div");i.className="alibi-radial-overlay",i.style.cssText=`position:absolute;top:0;left:0;width:${s.width*p}px;height:${s.height*p}px;`,e.style.position="relative",e.appendChild(i);const r=[];for(let l=0;l<s.height;l++){r[l]=[];for(let m=0;m<s.width;m++){const b=s.tiles[l][m],h=document.createElement("div");h.setAttribute("data-testid",`cell-${m}-${l}`),h.style.cssText=`position:absolute;left:${m*p}px;top:${l*p}px;width:${p}px;height:${p}px;`,I(b)&&(h.classList.add("alibi-cell-overlay","placeable"),h.addEventListener("click",g=>{g.stopPropagation(),en(m,l,a,t,o)})),r[l][m]=h,i.appendChild(h)}}let u=null;const c=()=>Y();document.addEventListener("click",c);function d(){const l=a();if(u&&(u.remove(),u=null),l.victimCell){const{x:h,y:g}=l.victimCell;u=document.createElement("div"),u.setAttribute("data-testid","victim-cell"),u.className="alibi-cell-overlay victim-highlight",u.style.cssText=`position:absolute;left:${h*p}px;top:${g*p}px;width:${p}px;height:${p}px;pointer-events:all;`,u.addEventListener("click",x=>{x.stopPropagation(),o.onVictimClick()}),i.appendChild(u)}const m=new Set,b=new Set;for(const h of l.placements.values())m.add(h.y),b.add(h.x);for(let h=0;h<s.height;h++)for(let g=0;g<s.width;g++){const x=r[h]?.[g];if(!x)continue;const v=s.tiles[h][g],W=m.has(h)||b.has(g),B=Array.from(l.placements.values()).some(j=>j.x===g&&j.y===h);x.style.pointerEvents=I(v)&&(!W||B)?"all":"none"}}function f(){document.removeEventListener("click",c),i.remove()}return d(),{updateOverlays:d,detach:f}}let _=null;function Y(){_&&(_.remove(),_=null)}function en(e,t,n,a,o){Y();const s=n(),i=Array.from(s.placements.entries()).find(([,l])=>l.x===e&&l.y===t),r=document.createElement("div");r.className="alibi-radial-menu",r.setAttribute("data-testid","radial-menu");const c=document.getElementById("game-canvas")?.getBoundingClientRect()??{left:0,top:0};r.style.left=`${c.left+(e+1)*p}px`,r.style.top=`${c.top+t*p}px`;const d=new Set(s.placements.keys()),f=a.suspects.filter(l=>!d.has(l.id));for(const l of f){const m=document.createElement("div");m.className="alibi-radial-item",m.setAttribute("data-testid",`suspect-option-${l.id}`),m.textContent=l.name,m.addEventListener("click",b=>{b.stopPropagation(),Y(),o.onPlace(l.id,e,t)}),r.appendChild(m)}if(i){const l=document.createElement("div");l.className="alibi-radial-item alibi-radial-clear",l.setAttribute("data-testid","suspect-option-clear"),l.textContent="Clear",l.addEventListener("click",m=>{m.stopPropagation(),Y(),o.onRemove(i[0])}),r.appendChild(l)}r.children.length!==0&&(document.body.appendChild(r),_=r)}function tn(e){return`${e.seed}-${e.themeId}-${e.difficulty}`}function nn(e){const t=new URLSearchParams(location.search),n=t.get("theme")??"coffee-shop",a=t.get("difficulty")??"easy",o=parseInt(t.get("seed")??"0",10),s=$t(n),i=Pe(o,s,a),r=tn(i),u=sn(),c=u.querySelector(".alibi-canvas-wrapper"),d=u.querySelector(".alibi-sidebar-container"),f=document.getElementById("game-canvas"),l=f.getContext("2d"),{width:m,height:b}=It(i);f.width=m,f.height=b,c.appendChild(f);let h=we();const g=new _t;function x(y,F){const C={};F.placements.forEach((k,R)=>{C[R]={x:k.x,y:k.y}}),Ut({key:y,placements:C,elapsedMs:F.elapsedMs,savedAt:new Date().toISOString()})}function v(){Wt(l,i,s,h.placements,h.victimCell),Ot(d,i,h.placements,h.satisfiedClues,h.errorClues),W.updateOverlays()}const W=Qt(c,i,s,()=>h,{onPlace(y,F,C){h.phase==="playing"&&(g.push(h.placements),h=Pt(h,i,y,F,C),x(r,h),H(h.satisfiedClues.size>0?"clue-satisfied":"place"),v())},onRemove(y){h.phase==="playing"&&(g.push(h.placements),h=Ht(h,i,y),x(r,h),H("remove"),v())},onVictimClick(){if(h.phase!=="playing")return;const y=Vt(h);y.phase==="guilty"?(h=y,xe(r),H("solve"),v(),At(document.body,i),rn(i,h)):(H("error"),v(),zt(document.body))}}),B=u.querySelector('[data-testid="btn-undo"]'),j=u.querySelector('[data-testid="btn-redo"]');B.addEventListener("click",K),j.addEventListener("click",z);function K(){const y=g.undo(h.placements);y&&(h=J(h,i,y),v())}function z(){const y=g.redo(h.placements);y&&(h=J(h,i,y),v())}const P=u.querySelector('[data-testid="btn-mute"]');P.addEventListener("click",()=>{const y=Kt();P.textContent=y?"🔇":"🔊"}),document.addEventListener("keydown",y=>{(y.ctrlKey||y.metaKey)&&y.key==="z"&&!y.shiftKey&&(K(),y.preventDefault()),(y.ctrlKey||y.metaKey)&&(y.key==="y"||y.key==="z"&&y.shiftKey)&&(z(),y.preventDefault())});const S=Zt(r);S&&Object.keys(S.placements).length>0?ln(u,()=>{const y=new Map(Object.entries(S.placements).map(([F,C])=>[F,{suspectId:F,x:C.x,y:C.y}]));h=J(we(),i,y),h={...h,elapsedMs:S.elapsedMs},v(),Z(document.body,i,()=>{})},()=>{xe(r),Z(document.body,i,()=>{})}):Z(document.body,i,()=>{}),v()}const on=`
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
`;let ke=!1;function an(){if(ke)return;const e=document.createElement("style");e.textContent=on,document.head.appendChild(e),ke=!0}function sn(){an();const e=document.createElement("div");e.setAttribute("data-testid","screen-game"),e.className="alibi-game-screen";const t=document.createElement("div");t.className="alibi-canvas-wrapper";const n=document.createElement("div");n.style.cssText="display:flex;flex-direction:column;height:100vh;flex:1;";const a=document.createElement("div");a.className="alibi-toolbar";const o=X("btn-undo","↩ Undo"),s=X("btn-redo","↪ Redo"),i=X("btn-mute","🔊");a.append(o,s,i);const r=document.createElement("div");r.className="alibi-sidebar-container",n.append(a,r),e.append(t,n);const u=document.getElementById("game-canvas");return u.parentElement?.insertBefore(e,u),e}function X(e,t){const n=document.createElement("button");return n.setAttribute("data-testid",e),n.textContent=t,n}function rn(e,t){const n=document.createElement("button");n.setAttribute("data-testid","btn-share"),n.style.cssText="position:fixed;bottom:24px;right:24px;z-index:300;background:#c0392b;color:#fff;border:none;padding:10px 20px;font-family:monospace;font-size:14px;cursor:pointer;border-radius:4px;",n.textContent="📋 Share Result",n.addEventListener("click",async()=>{const a=qt(e,t.elapsedMs),o=await Gt(a);n.textContent=o?"✓ Copied!":"📋 Share Result",o&&setTimeout(()=>{n.textContent="📋 Share Result"},2e3)}),document.body.appendChild(n)}function ln(e,t,n){const a=document.createElement("div");a.setAttribute("data-testid","prompt-resume"),a.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:150;font-family:monospace;";const o=document.createElement("div");o.style.cssText="background:#1a1a2e;border:2px solid #c0392b;border-radius:8px;padding:28px;max-width:360px;text-align:center;color:#fff;";const s=document.createElement("h2");s.style.cssText="color:#c0392b;margin-bottom:12px;",s.textContent="Resume Investigation?";const i=document.createElement("p");i.style.cssText="color:#aaa;margin-bottom:20px;font-size:0.9em;",i.textContent="You have an in-progress case. Resume where you left off?";const r=document.createElement("button");r.style.cssText="background:#c0392b;color:#fff;border:none;padding:9px 20px;font-family:monospace;cursor:pointer;border-radius:4px;margin-right:8px;",r.textContent="Resume",r.addEventListener("click",()=>{a.remove(),t()});const u=document.createElement("button");u.style.cssText="background:#333;color:#fff;border:none;padding:9px 20px;font-family:monospace;cursor:pointer;border-radius:4px;",u.textContent="Start Fresh",u.addEventListener("click",()=>{a.remove(),n()}),o.append(s,i,r,u),a.appendChild(o),e.appendChild(a)}const cn=`
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
`;let $e=!1;function dn(){if($e)return;const e=document.createElement("style");e.textContent=cn,document.head.appendChild(e),$e=!0}function mn(){dn();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-home"),t.className="alibi-home";const n=document.createElement("div");n.className="alibi-home-title",n.textContent="ALIBI";const a=document.createElement("div");a.className="alibi-home-subtitle",a.textContent="A murder mystery deduction game";const o=document.createElement("div");o.className="alibi-home-buttons",o.appendChild(Q("btn-campaign","primary","📁 Campaign","12 escalating cases")),o.appendChild(Q("btn-quickplay","secondary","🎲 Quick Play","Pick theme and difficulty")),o.appendChild(Q("btn-daily","secondary","📅 Daily Case","Today's case · same worldwide")),t.append(n,a,o),document.body.appendChild(t),t.querySelector('[data-testid="btn-quickplay"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=quickplay`}),t.querySelector('[data-testid="btn-campaign"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=campaign`}),t.querySelector('[data-testid="btn-daily"]').addEventListener("click",()=>{t.remove();const{seed:s,themeId:i,difficulty:r}=hn();window.location.href=`${window.location.pathname}?theme=${i}&difficulty=${r}&seed=${s}`})}function Q(e,t,n,a){const o=document.createElement("button");o.setAttribute("data-testid",e),o.className=`alibi-home-btn ${t}`;const s=document.createElement("span");s.className="btn-title",s.textContent=n;const i=document.createElement("span");return i.className="btn-desc",i.textContent=a,o.append(s,i),o}const Ce=[{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"}];function un(e){let t=5381;for(let n=0;n<e.length;n++)t=(t<<5)+t+e.charCodeAt(n)|0;return Math.abs(t)}function hn(){const e=new Date,t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,n=un(t),a=Math.floor((e.getTime()-new Date(e.getFullYear(),0,0).getTime())/864e5),{themeId:o,difficulty:s}=Ce[a%Ce.length];return{seed:n,themeId:o,difficulty:s}}const fn=`
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
`;let Se=!1;function pn(){if(Se)return;const e=document.createElement("style");e.textContent=fn,document.head.appendChild(e),Se=!0}const bn=[{title:"The Coffee Shop",difficulty:"easy",seed:100},{title:"The Bookstore",difficulty:"easy",seed:101},{title:"The Backyard",difficulty:"easy",seed:102},{title:"The Holiday Mall",difficulty:"easy",seed:103},{title:"The Coffee Shop",difficulty:"medium",seed:200},{title:"The Bookstore",difficulty:"medium",seed:201},{title:"The Backyard",difficulty:"medium",seed:202},{title:"The Holiday Mall",difficulty:"medium",seed:203},{title:"The Coffee Shop",difficulty:"hard",seed:300},{title:"The Bookstore",difficulty:"hard",seed:301},{title:"The Backyard",difficulty:"hard",seed:302},{title:"The Holiday Mall",difficulty:"hard",seed:303}];function yn(){pn();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-campaign-board"),t.className="alibi-campaign-board";const n=document.createElement("div");n.className="alibi-campaign-header";const a=document.createElement("button");a.className="alibi-campaign-back",a.textContent="← Home",a.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const o=document.createElement("h1");o.textContent="📁 Campaign",n.append(a,o);const s=document.createElement("div");s.className="alibi-case-grid",bn.forEach((i,r)=>{const u=document.createElement("div");u.setAttribute("data-testid",`case-card-${r}`),u.className=`alibi-case-card ${r===0?"unlocked":"locked"}`;const c=document.createElement("div");c.className="alibi-case-num",c.textContent=`Case ${r+1}`;const d=document.createElement("div");d.className="alibi-case-title",d.textContent=r===0?i.title:"???";const f=document.createElement("div");f.className=`alibi-case-difficulty ${i.difficulty}`,f.textContent=i.difficulty.charAt(0).toUpperCase()+i.difficulty.slice(1);const l=document.createElement("div");l.setAttribute("data-testid",`case-status-${r}`),l.className=`alibi-case-status ${r===0?"":"locked"}`,l.textContent=r===0?"📁":"🔒",u.append(c,d,f,l),r===0&&u.addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?theme=coffee-shop&difficulty=${i.difficulty}&seed=${i.seed}`}),s.appendChild(u)}),t.append(n,s),document.body.appendChild(t)}const gn=`
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
`,Fn={"coffee-shop":"☕",bookstore:"📚",backyard:"🌿","holiday-mall":"🎄",restaurant:"🍽",gym:"💪",office:"🏢","garden-party":"🌸",hospital:"🏥",carnival:"🎡"};let Te=!1;function wn(){if(Te)return;const e=document.createElement("style");e.textContent=gn,document.head.appendChild(e),Te=!0}function xn(){wn();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-theme-select"),t.className="alibi-theme-select";const n=document.createElement("div");n.className="alibi-theme-select-header";const a=document.createElement("button");a.className="alibi-theme-back",a.textContent="← Home",a.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const o=document.createElement("h1");o.textContent="🎲 Quick Play",n.append(a,o);let s="easy";const i=document.createElement("div");i.className="alibi-difficulty-row";const r={};for(const[l,m]of[["easy","Easy"],["medium","Medium"],["hard","Hard"]]){const b=document.createElement("button");b.setAttribute("data-testid",`difficulty-${l}`),b.className=`alibi-diff-btn ${l}${l==="easy"?" selected":""}`,b.textContent=m,b.addEventListener("click",()=>{s=l,Object.values(r).forEach(h=>h.classList.remove("selected")),b.classList.add("selected")}),r[l]=b,i.appendChild(b)}let u=null;const c=document.createElement("div");c.className="alibi-theme-grid";const d={};for(const l of Ct()){if(l.id==="stub")continue;const m=document.createElement("div");m.setAttribute("data-testid",`theme-card-${l.id}`),m.className="alibi-theme-card";const b=document.createElement("div");b.className="alibi-theme-icon",b.textContent=Fn[l.id]??"🔍";const h=document.createElement("div");h.textContent=l.name.replace(/^The /,""),m.append(b,h),m.addEventListener("click",()=>{u=l.id,Object.values(d).forEach(g=>g.classList.remove("selected")),m.classList.add("selected"),f.disabled=!1}),d[l.id]=m,c.appendChild(m)}const f=document.createElement("button");f.setAttribute("data-testid","btn-play"),f.className="alibi-play-btn",f.textContent="Play",f.disabled=!0,f.addEventListener("click",()=>{if(!u)return;const l=Math.floor(Math.random()*4294967295);t.remove(),window.location.href=`${window.location.pathname}?theme=${u}&difficulty=${s}&seed=${l}`}),t.append(n,i,c,f),document.body.appendChild(t)}const V=new URLSearchParams(location.search);if(V.has("theme")||V.has("difficulty")||V.has("seed"))nn();else switch(V.get("mode")){case"campaign":yn();break;case"quickplay":xn();break;default:mn();break}

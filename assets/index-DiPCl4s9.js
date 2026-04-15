var Qe=Object.defineProperty;var et=(e,t,a)=>t in e?Qe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var Q=(e,t,a)=>et(e,typeof t!="symbol"?t+"":t,a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=a(i);fetch(i.href,o)}})();const tt=new Set(["F","C","S","B"]);function H(e){return tt.has(e)}function G(e){return e==="C"||e==="S"||e==="B"}function de(e){const t=[];for(let a=0;a<e.width;a++)for(let s=0;s<e.height;s++)if(H(e.tiles[s][a])){t.push(a);break}return t}function he(e){const t=[];for(let a=0;a<e.height;a++)for(let s=0;s<e.width;s++)if(H(e.tiles[a][s])){t.push(a);break}return t}function B(e,t,a){for(const s of e.rooms)for(const[i,o]of s.cells)if(i===t&&o===a)return s.id;return null}function Ke(e){const t=new Set,a=new Set;for(const s of e)t.add(s.y),a.add(s.x);return{blockedRows:t,blockedCols:a}}function Ge(e,t){const{blockedRows:a,blockedCols:s}=Ke(t),i=[];for(let o=0;o<e.height;o++)if(!a.has(o))for(let l=0;l<e.width;l++)s.has(l)||H(e.tiles[o][l])&&i.push({x:l,y:o});return i.length===1?i[0]:null}function at(e,t,a){const s=B(e,a.x,a.y);if(s===null)return null;for(const i of t)if(B(e,i.x,i.y)===s)return i.suspectId;return null}function we(e,t,a,s){return Math.max(Math.abs(e-a),Math.abs(t-s))}function le(e,t,a){const s=a.get(t.suspectId);if(!s)return null;switch(t.type){case"inRoom":return B(e,s.x,s.y)===t.roomId;case"notInRoom":return B(e,s.x,s.y)!==t.roomId;case"inSameRoom":{const i=a.get(t.otherSuspectId);if(!i)return null;const o=B(e,s.x,s.y),l=B(e,i.x,i.y);return o!==null&&o===l}case"inDifferentRoom":{const i=a.get(t.otherSuspectId);if(!i)return null;const o=B(e,s.x,s.y),l=B(e,i.x,i.y);return o===null||l===null?null:o!==l}case"inColumn":return s.x===t.col;case"inRow":return s.y===t.row;case"besideSuspect":{const i=a.get(t.otherSuspectId);return i?we(s.x,s.y,i.x,i.y)<=1:null}case"notBesideSuspect":{const i=a.get(t.otherSuspectId);return i?we(s.x,s.y,i.x,i.y)>1:null}case"besideObject":{for(let i=-1;i<=1;i++)for(let o=-1;o<=1;o++){if(o===0&&i===0)continue;const l=s.x+o,r=s.y+i;if(!(l<0||r<0||l>=e.width||r>=e.height)&&e.tiles[r][l]===t.objectTile)return!0}return!1}case"notBesideObject":{for(let i=-1;i<=1;i++)for(let o=-1;o<=1;o++){if(o===0&&i===0)continue;const l=s.x+o,r=s.y+i;if(!(l<0||r<0||l>=e.width||r>=e.height)&&e.tiles[r][l]===t.objectTile)return!1}return!0}case"onSeatTile":return G(e.tiles[s.y][s.x]);case"notOnSeatTile":return!G(e.tiles[s.y][s.x]);case"northOf":{const i=a.get(t.otherSuspectId);return i?s.y<i.y:null}case"southOf":{const i=a.get(t.otherSuspectId);return i?s.y>i.y:null}case"exactlyNRowsNorth":{const i=a.get(t.otherSuspectId);return i?i.y-s.y===t.n:null}case"exactlyNRowsSouth":{const i=a.get(t.otherSuspectId);return i?s.y-i.y===t.n:null}}}const it={easy:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom"],medium:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile"],hard:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile","notOnSeatTile","northOf","southOf","exactlyNRowsNorth","exactlyNRowsSouth"]};function ee(e,t,a){const s=de(e),i=he(e);if(t.length===0)return{count:0};if(t.length>Math.min(s.length,i.length))return{count:0};const o=new Set;for(let n=0;n<e.height;n++)for(let y=0;y<e.width;y++)H(e.tiles[n][y])&&o.add(`${y},${n}`);let l=0,r;const f=new Map,u=new Set,m=new Set;function p(n){if(l>=2)return;if(n===t.length){for(const c of a)if(le(e,c,f)!==!0)return;l++,l===1&&(r=new Map(f));return}const y=t[n];for(const c of i)if(!u.has(c))for(const d of s){if(m.has(d)||!o.has(`${d},${c}`))continue;const b={suspectId:y,x:d,y:c};f.set(y,b),u.add(c),m.add(d);let h=!1;for(const x of a)if((x.suspectId===y||x.otherSuspectId===y)&&le(e,x,f)===!1){h=!0;break}if(h||p(n+1),f.delete(y),u.delete(c),m.delete(d),l>=2)return}}return p(0),{count:l,firstSolution:r}}class nt extends Error{constructor(t){super(t),this.name="PuzzleGenerationError"}}function ot(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let a=Math.imul(t^t>>>15,1|t);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}function qe(e,t){return Math.floor(e()*t)}function M(e,t){return t[qe(e,t.length)]}function q(e,t){const a=[...t];for(let s=a.length-1;s>0;s--){const i=qe(e,s+1);[a[s],a[i]]=[a[i],a[s]]}return a}function st(e,t,a,s){const i=it[a],o=s.landmarks.length>=2,l=s.tiles.some(m=>m.some(p=>G(p))),r=i.filter(m=>!((m==="besideObject"||m==="notBesideObject")&&!o||(m==="onSeatTile"||m==="notOnSeatTile")&&!l)),f=Math.ceil(t*.4),u=[];for(let m=0;m<t;m++){const p=new Set;u.length>0&&p.add(u[u.length-1]);for(const b of r)u.filter(x=>x===b).length>=f&&p.add(b);const n=r.filter(b=>!p.has(b)),y=n.length>0?n:r,c=y.filter(b=>!u.includes(b)),d=c.length>0?c:y;u.push(M(e,d))}return u}function _(e,t,a,s,i,o,l){const r=l.get(i.id),f=a.clueTemplates;switch(s){case"inRoom":{const u=B(t,r.x,r.y);if(!u)return null;const m=t.rooms.find(p=>p.id===u);return{type:"inRoom",suspectId:i.id,roomId:u,text:f.inRoom(i.name,m.name)}}case"notInRoom":{const u=B(t,r.x,r.y),m=t.rooms.filter(n=>n.id!==u);if(m.length===0)return null;const p=M(e,m);return{type:"notInRoom",suspectId:i.id,roomId:p.id,text:f.notInRoom(i.name,p.name)}}case"inSameRoom":{const u=B(t,r.x,r.y);if(!u)return null;const m=o.filter(n=>{if(n.id===i.id)return!1;const y=l.get(n.id);return B(t,y.x,y.y)===u});if(m.length===0)return null;const p=M(e,m);return{type:"inSameRoom",suspectId:i.id,otherSuspectId:p.id,text:f.inSameRoom(i.name,p.name)}}case"inDifferentRoom":{const u=B(t,r.x,r.y),m=o.filter(n=>{if(n.id===i.id)return!1;const y=l.get(n.id),c=B(t,y.x,y.y);return c!==null&&c!==u});if(m.length===0)return null;const p=M(e,m);return{type:"inDifferentRoom",suspectId:i.id,otherSuspectId:p.id,text:f.inDifferentRoom(i.name,p.name)}}case"inColumn":return{type:"inColumn",suspectId:i.id,col:r.x,text:f.inColumn(i.name,r.x+1)};case"inRow":return{type:"inRow",suspectId:i.id,row:r.y,text:f.inRow(i.name,r.y+1)};case"besideSuspect":{const u=o.filter(p=>{if(p.id===i.id)return!1;const n=l.get(p.id);return Math.max(Math.abs(r.x-n.x),Math.abs(r.y-n.y))<=1});if(u.length===0)return null;const m=M(e,u);return{type:"besideSuspect",suspectId:i.id,otherSuspectId:m.id,text:f.besideSuspect(i.name,m.name)}}case"notBesideSuspect":{const u=o.filter(p=>{if(p.id===i.id)return!1;const n=l.get(p.id);return Math.max(Math.abs(r.x-n.x),Math.abs(r.y-n.y))>1});if(u.length===0)return null;const m=M(e,u);return{type:"notBesideSuspect",suspectId:i.id,otherSuspectId:m.id,text:f.notBesideSuspect(i.name,m.name)}}case"besideObject":{if(t.landmarks.length===0)return null;const u=t.landmarks.filter(n=>Math.max(Math.abs(r.x-n.x),Math.abs(r.y-n.y))<=1);if(u.length===0)return null;const m=M(e,u),p=t.tiles[m.y][m.x];return{type:"besideObject",suspectId:i.id,objectTile:p,text:f.besideObject(i.name,m.name)}}case"notBesideObject":{if(t.landmarks.length===0)return null;const u=t.landmarks.filter(n=>Math.max(Math.abs(r.x-n.x),Math.abs(r.y-n.y))>1);if(u.length===0)return null;const m=M(e,u),p=t.tiles[m.y][m.x];return{type:"notBesideObject",suspectId:i.id,objectTile:p,text:f.notBesideObject(i.name,m.name)}}case"onSeatTile":{const u=t.tiles[r.y][r.x];if(!G(u))return null;const m=u==="C"?"chair":u==="S"?"sofa":"bed";return{type:"onSeatTile",suspectId:i.id,text:f.onSeatTile(i.name,m)}}case"notOnSeatTile":{const u=t.tiles[r.y][r.x];return G(u)?null:{type:"notOnSeatTile",suspectId:i.id,text:f.notOnSeatTile(i.name)}}case"northOf":{const u=o.filter(p=>{if(p.id===i.id)return!1;const n=l.get(p.id);return r.y<n.y});if(u.length===0)return null;const m=M(e,u);return{type:"northOf",suspectId:i.id,otherSuspectId:m.id,text:f.northOf(i.name,m.name)}}case"southOf":{const u=o.filter(p=>{if(p.id===i.id)return!1;const n=l.get(p.id);return r.y>n.y});if(u.length===0)return null;const m=M(e,u);return{type:"southOf",suspectId:i.id,otherSuspectId:m.id,text:f.southOf(i.name,m.name)}}case"exactlyNRowsNorth":{const u=[];for(const p of o){if(p.id===i.id)continue;const y=l.get(p.id).y-r.y;y>0&&u.push({suspect:p,n:y})}if(u.length===0)return null;const m=M(e,u);return{type:"exactlyNRowsNorth",suspectId:i.id,otherSuspectId:m.suspect.id,n:m.n,text:f.exactlyNRowsNorth(i.name,m.suspect.name,m.n)}}case"exactlyNRowsSouth":{const u=[];for(const p of o){if(p.id===i.id)continue;const n=l.get(p.id),y=r.y-n.y;y>0&&u.push({suspect:p,n:y})}if(u.length===0)return null;const m=M(e,u);return{type:"exactlyNRowsSouth",suspectId:i.id,otherSuspectId:m.suspect.id,n:m.n,text:f.exactlyNRowsSouth(i.name,m.suspect.name,m.n)}}}}function lt(e,t,a,s=1e3){const i=q(e,de(t)),o=q(e,he(t)),l=a.length;if(l<1||l>Math.min(i.length,o.length))return null;let r=0;const f=new Map,u=new Set,m=new Set,p=q(e,o).slice(0,l);function n(y){if(y===l)return!0;const c=a[y],d=p[y],b=q(e,i);for(const h of b)if(!m.has(h)&&H(t.tiles[d]?.[h])){if(f.set(c.id,{suspectId:c.id,x:h,y:d}),u.add(d),m.add(h),n(y+1))return!0;if(r++,f.delete(c.id),u.delete(d),m.delete(h),r>=s)return!1}return!1}return n(0)?f:null}function rt(e,t,a){for(let i=0;i<20;i++){const o=e+i*97>>>0,l=ot(o),r=t.floorPlans[a],f=de(r),u=he(r),m=Math.min(f.length,u.length)-1;if(m<2)continue;const n=t.suspectNames.slice(0,m).map((g,C)=>({id:`s${C}`,name:g})),y=M(l,t.victimNames),c=lt(l,r,n);if(!c)continue;const d=Array.from(c.values()),b=Ge(r,d);if(!b)continue;const h=at(r,d,b);if(!h)continue;const x=n.find(g=>g.id===h),v=M(l,t.narrativeTemplates.intro),F=M(l,t.narrativeTemplates.victimFound),w=M(l,t.narrativeTemplates.guiltyText).replace("{{killerName}}",x.name).replace("{{evidenceText}}","the evidence is conclusive"),R=st(l,m,a,r),E=[];for(let g=0;g<m;g++){const C=n[g],T=R[g];let N=_(l,r,t,T,C,n,c);N||(N=_(l,r,t,"inRow",C,n,c)),N||(N=_(l,r,t,"inColumn",C,n,c)),N&&E.push(N)}let j=ee(r,n.map(g=>g.id),E);if(j.count!==0){if(j.count!==1)for(const g of n){if(j.count===1)break;if(!E.some(T=>T.type==="inRow"&&T.suspectId===g.id)){const T=_(l,r,t,"inRow",g,n,c);T&&E.push(T),j=ee(r,n.map(N=>N.id),E)}}if(j.count!==1)for(const g of n){if(j.count===1)break;if(!E.some(T=>T.type==="inColumn"&&T.suspectId===g.id)){const T=_(l,r,t,"inColumn",g,n,c);T&&E.push(T),j=ee(r,n.map(N=>N.id),E)}}if(j.count===1)return{seed:o,themeId:t.id,difficulty:a,suspects:n,victimName:y,clues:E,solution:c,victimCell:b,killer:x,narrativeIntro:v,narrativeVictimFound:F,narrativeGuilty:w,floorPlan:r}}}throw new nt(`Failed to generate unique puzzle after 20 retries (seed=${e}, theme=${t.id}, difficulty=${a})`)}const ct={width:5,height:6,tiles:[["bB","bB","bB","W","W"],["F","F","F","C","F"],["pL","F","C","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"],["W","cR","W","F","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[3,1],[4,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"restroom",name:"Restroom",cells:[[1,5],[3,5],[4,5]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-entrance",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},dt={width:6,height:7,tiles:[["bB","bB","bB","bB","W","W"],["F","F","F","F","C","F"],["pL","F","C","F","F","F"],["F","S","F","pL","F","C"],["F","F","tB","F","F","F"],["C","F","F","F","W","F"],["W","cR","W","W","W","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5]]},{id:"restroom",name:"Restroom",cells:[[1,6],[5,5],[5,6]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-door",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:3,y:3},{id:"table",name:"the table",x:2,y:4},{id:"cash-register",name:"the cash register",x:1,y:6}]},ht={width:7,height:8,tiles:[["bB","bB","bB","bB","bB","W","W"],["F","F","F","F","F","C","F"],["F","C","F","pL","F","F","F"],["pL","F","S","F","C","F","pL"],["F","F","F","tB","F","F","F"],["F","C","F","F","F","tB","C"],["F","F","F","F","F","W","F"],["W","cR","W","F","C","W","F"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]]},{id:"main-area",name:"Main Area",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[6,6]]},{id:"restroom",name:"Restroom",cells:[[1,7]]},{id:"back-office",name:"Back Office",cells:[[3,7],[4,7],[6,7]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-1",name:"the plant",x:3,y:2},{id:"plant-2",name:"the plant",x:0,y:3},{id:"plant-3",name:"the plant",x:6,y:3},{id:"table",name:"the table",x:3,y:4},{id:"table-2",name:"the small table",x:5,y:5},{id:"cash-register",name:"the cash register",x:1,y:7}]},mt={width:5,height:5,tiles:[["sH","F","W","sH","sH"],["F","F","W","F","F"],["sH","F","tB","F","sH"],["F","F","F","F","F"],["F","cR","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[2,3]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,3],[4,3]]},{id:"checkout",name:"Checkout",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:3,y:0},{id:"shelf-3",name:"the shelf",x:4,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:4,y:2},{id:"table",name:"the table",x:2,y:2},{id:"cash-register",name:"the cash register",x:1,y:4}]},ft={width:6,height:6,tiles:[["sH","F","W","W","sH","sH"],["F","F","W","F","F","F"],["sH","F","F","F","F","sH"],["F","F","W","F","tB","F"],["F","F","F","F","F","F"],["F","cR","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,2],[3,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,1],[4,1],[5,1],[3,2],[4,2],[5,2],[4,3],[5,3]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,4],[4,4],[5,4]]},{id:"checkout",name:"Checkout",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:4,y:0},{id:"shelf-3",name:"the shelf",x:5,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:5,y:2},{id:"table",name:"the table",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},ut={width:7,height:7,tiles:[["sH","F","F","W","sH","sH","sH"],["F","F","sH","W","F","F","F"],["sH","F","F","tB","F","F","sH"],["F","F","W","W","F","tB","F"],["sH","F","F","F","F","F","F"],["F","F","F","F","F","F","sH"],["F","cR","C","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,1],[3,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"romance-novels",name:"Romance Novels",cells:[[4,3],[5,3],[6,3],[3,4],[4,4],[5,4],[6,4],[3,5],[4,5],[5,5]]},{id:"collectors",name:"Collector's Corner",cells:[[6,5]]},{id:"checkout",name:"Checkout",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"shelf-crime",name:"the shelf",x:0,y:0},{id:"shelf-nonfic-1",name:"the shelf",x:4,y:0},{id:"shelf-nonfic-2",name:"the shelf",x:5,y:0},{id:"shelf-nonfic-3",name:"the shelf",x:6,y:0},{id:"shelf-crime-2",name:"the shelf",x:0,y:2},{id:"shelf-nonfic-4",name:"the shelf",x:6,y:2},{id:"table-1",name:"the reading table",x:3,y:2},{id:"table-2",name:"the table",x:5,y:3},{id:"shelf-best",name:"the shelf",x:0,y:4},{id:"shelf-collect",name:"the shelf",x:6,y:5},{id:"cash-register",name:"the cash register",x:1,y:6}]},pt={width:5,height:5,tiles:[["pL","F","W","jZ","jZ"],["F","F","W","jZ","C"],["pL","F","F","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[3,0],[4,0],[3,1],[4,1]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:0,y:2},{id:"plant-3",name:"the plant",x:4,y:3},{id:"jacuzzi",name:"the jacuzzi",x:3,y:0}]},bt={width:6,height:7,tiles:[["pL","F","F","W","jZ","jZ"],["F","F","F","W","jZ","C"],["F","pL","F","F","F","F"],["W","W","W","W","W","W"],["B","F","F","S","F","F"],["F","F","tV","F","F","F"],["F","F","W","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[4,0],[5,0],[4,1],[5,1]]},{id:"deck",name:"Deck",cells:[[3,2],[4,2],[5,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:1,y:2},{id:"jacuzzi",name:"the jacuzzi",x:4,y:0},{id:"tv",name:"the TV",x:2,y:5}]},yt={width:7,height:8,tiles:[["pL","F","F","F","W","jZ","jZ"],["F","F","pL","F","W","jZ","C"],["F","F","F","F","F","C","F"],["W","W","W","W","W","W","W"],["B","F","F","S","F","F","W"],["F","F","tV","F","F","pL","W"],["W","W","W","cT","F","F","W"],["W","W","F","F","F","W","W"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[5,0],[6,0],[5,1],[6,1]]},{id:"deck",name:"Deck",cells:[[4,2],[5,2],[6,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5]]},{id:"kitchen",name:"Kitchen",cells:[[3,6],[4,6],[5,6],[2,7],[3,7],[4,7]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:2,y:1},{id:"plant-3",name:"the plant",x:5,y:5},{id:"jacuzzi",name:"the jacuzzi",x:5,y:0},{id:"tv",name:"the TV",x:2,y:5},{id:"counter",name:"the counter",x:3,y:6}]},xt={width:5,height:6,tiles:[["sT","F","F","F","sT"],["F","F","W","F","F"],["F","F","F","F","F"],["tD","F","F","F","sH"],["F","C","F","F","F"],["F","F","W","cR","F"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1]]},{id:"santas-village",name:"Santa's Village",cells:[[2,0],[3,0],[3,1],[0,3],[1,3],[2,3],[0,4],[1,4],[2,4]]},{id:"toy-store",name:"Toy Store",cells:[[4,0],[4,1]]},{id:"walkway",name:"Walkway",cells:[[0,2],[1,2],[2,2],[3,2],[4,2]]},{id:"bookstore",name:"Bookstore",cells:[[3,3],[4,3],[3,4],[4,4]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[0,5],[1,5],[3,5],[4,5]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:4,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:3},{id:"shelf",name:"the shelf",x:4,y:3},{id:"cash-register",name:"the cash register",x:3,y:5}]},gt={width:7,height:7,tiles:[["sT","F","F","W","F","F","sT"],["F","F","W","F","F","F","F"],["F","F","F","F","F","W","F"],["F","F","F","F","F","F","F"],["tD","F","F","W","F","sH","F"],["F","C","F","W","F","F","C"],["F","F","W","F","cR","F","F"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"santas-village",name:"Santa's Village",cells:[[3,1],[4,1],[5,1],[6,1],[3,2],[4,2],[5,2]]},{id:"santas-lodge",name:"Santa's Lodge",cells:[[4,0],[5,0],[6,0]]},{id:"toy-store",name:"Toy Store",cells:[[6,2],[5,3],[6,3],[4,4],[5,4],[6,4],[5,5],[6,5]]},{id:"walkway",name:"Walkway",cells:[[0,3],[1,3],[2,3],[3,3],[4,3]]},{id:"food-court",name:"Food Court",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[0,6],[1,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:6,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:4},{id:"shelf",name:"the shelf",x:5,y:4},{id:"cash-register",name:"the cash register",x:4,y:6}]},wt={width:8,height:8,tiles:[["sT","F","F","W","F","F","F","sT"],["F","F","W","F","F","F","F","F"],["F","F","F","F","F","W","F","F"],["F","F","F","F","F","F","F","F"],["tD","F","F","W","F","sH","F","F"],["F","C","F","W","F","F","C","F"],["F","F","W","F","cR","F","F","F"],["F","F","F","F","F","F","F","tR"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[0,3],[1,3]]},{id:"santas-lodge",name:"Santa's Lodge",cells:[[4,0],[5,0],[6,0],[7,0],[4,1],[5,1],[6,1],[7,1]]},{id:"santas-village",name:"Santa's Village",cells:[[3,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]]},{id:"toy-store",name:"Toy Store",cells:[[6,2],[7,2],[6,3],[7,3],[6,4],[7,4],[6,5],[7,5]]},{id:"walkway",name:"Walkway",cells:[[2,2],[2,3],[2,4],[3,4],[4,4],[2,5],[2,6]]},{id:"food-court",name:"Food Court",cells:[[0,4],[1,4],[0,5],[1,5],[0,6],[1,6],[0,7],[1,7],[2,7]]},{id:"bookstore",name:"Bookstore",cells:[[5,4],[5,5],[4,6],[5,6],[6,6],[7,6]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[3,6],[3,7],[4,7],[5,7],[6,7],[7,7]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:7,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:4},{id:"shelf",name:"the shelf",x:5,y:4},{id:"cash-register",name:"the cash register",x:4,y:6},{id:"tree",name:"the Christmas tree",x:7,y:7}]},Ft={width:5,height:5,tiles:[["cT","cT","W","F","C"],["F","F","W","F","F"],["F","C","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"dining-room",name:"Dining Room",cells:[[3,0],[4,0],[3,1],[4,1],[2,2],[3,2],[4,2]]},{id:"bar",name:"Bar",cells:[[2,1]]},{id:"restroom",name:"Restroom",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0}]},vt={width:6,height:6,tiles:[["cT","cT","cT","W","F","C"],["F","F","F","W","F","F"],["F","C","F","F","F","F"],["F","F","F","F","C","F"],["W","W","W","W","W","W"],["F","F","F","C","F","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},{id:"dining-room",name:"Dining Room",cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]]},{id:"bar",name:"Bar",cells:[[3,1]]},{id:"private-room",name:"Private Room",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0},{id:"counter-3",name:"the counter",x:2,y:0}]},$t={width:7,height:7,tiles:[["cT","cT","cT","cT","W","F","C"],["F","F","F","F","W","F","F"],["F","C","F","F","F","F","F"],["F","F","F","F","C","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","C","F","F","C","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"dining-room",name:"Dining Room",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3],[4,4],[5,4],[6,4]]},{id:"bar",name:"Bar",cells:[[4,1],[0,4],[1,4],[2,4],[3,4]]},{id:"restroom",name:"Restroom",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0},{id:"counter-3",name:"the counter",x:2,y:0},{id:"counter-4",name:"the counter",x:3,y:0}]},kt={width:5,height:5,tiles:[["wT","F","W","tM","tM"],["F","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"cardio",name:"Cardio",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"weight-rack",name:"the weight rack",x:0,y:0},{id:"treadmill-1",name:"the treadmill",x:3,y:0},{id:"treadmill-2",name:"the treadmill",x:4,y:0}]},Ct={width:6,height:7,tiles:[["wT","F","W","tM","tM","F"],["F","F","W","F","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","jZ","jZ"],["F","C","F","F","jZ","C"],["F","F","W","F","F","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"cardio",name:"Cardio",cells:[[3,0],[4,0],[5,0],[3,1],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"pool",name:"Pool",cells:[[4,4],[5,4],[4,5],[5,5]]},{id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[0,5],[1,5],[2,5],[3,5]]},{id:"sauna",name:"Sauna",cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]}],landmarks:[{id:"weight-rack",name:"the weight rack",x:0,y:0},{id:"treadmill-1",name:"the treadmill",x:3,y:0},{id:"treadmill-2",name:"the treadmill",x:4,y:0},{id:"pool",name:"the pool",x:4,y:4}]},St={width:7,height:8,tiles:[["wT","wT","F","W","tM","tM","F"],["F","F","F","W","F","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","jZ","jZ","jZ"],["F","C","F","F","jZ","C","jZ"],["F","F","W","F","F","F","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},{id:"cardio",name:"Cardio",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"studio",name:"Studio",cells:[[3,2],[3,3]]},{id:"pool",name:"Pool",cells:[[4,5],[5,5],[6,5],[4,6],[5,6],[6,6]]},{id:"locker-room",name:"Locker Room",cells:[[0,5],[1,5],[2,5],[3,5],[0,6],[1,6],[2,6],[3,6]]},{id:"sauna",name:"Sauna",cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"weight-rack-1",name:"the weight rack",x:0,y:0},{id:"weight-rack-2",name:"the weight rack",x:1,y:0},{id:"treadmill-1",name:"the treadmill",x:4,y:0},{id:"treadmill-2",name:"the treadmill",x:5,y:0},{id:"pool",name:"the pool",x:4,y:5}]},Tt={width:5,height:5,tiles:[["dK","F","W","F","C"],["F","F","W","F","F"],["F","C","F","F","F"],["W","W","W","W","W"],["F","F","pC","F","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"meeting-room",name:"Meeting Room",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"kitchen",name:"Kitchen",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"desk",name:"the desk",x:0,y:0},{id:"photocopier",name:"the photocopier",x:2,y:4}]},Rt={width:6,height:6,tiles:[["dK","F","F","W","F","C"],["F","F","F","W","F","F"],["F","C","F","F","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","pC","F","F","C","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},{id:"meeting-room",name:"Meeting Room",cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"reception",name:"Reception",cells:[[3,1]]},{id:"kitchen",name:"Kitchen",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"desk",name:"the desk",x:0,y:0},{id:"photocopier",name:"the photocopier",x:1,y:5}]},Et={width:7,height:7,tiles:[["dK","F","F","F","W","F","C"],["F","F","F","F","W","F","F"],["F","C","F","F","F","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","dK","F"],["W","W","W","W","W","W","W"],["F","pC","F","F","C","F","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3],[0,4],[1,4],[2,4],[3,4]]},{id:"meeting-room",name:"Meeting Room",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"server-room",name:"Server Room",cells:[[4,4],[5,4],[6,4]]},{id:"kitchen",name:"Kitchen",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"desk-1",name:"the desk",x:0,y:0},{id:"desk-2",name:"the manager's desk",x:5,y:4},{id:"photocopier",name:"the photocopier",x:1,y:6}]},Wt={width:5,height:5,tiles:[["fB","F","F","F","fB"],["F","F","F","F","F"],["pL","F","C","F","pL"],["F","F","F","F","F"],["F","F","fB","F","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[0,2],[1,2],[2,2],[3,2],[4,2]]},{id:"gazebo",name:"Gazebo",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:4,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:4,y:2},{id:"flower-bed-3",name:"the flower bed",x:2,y:4}]},Nt={width:6,height:6,tiles:[["fB","F","F","F","F","fB"],["F","F","F","F","F","F"],["pL","F","C","F","C","pL"],["F","F","F","F","F","F"],["F","F","jZ","jZ","F","F"],["F","F","jZ","jZ","fB","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]]},{id:"gazebo",name:"Gazebo",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},{id:"pool-area",name:"Pool Area",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:5,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:5,y:2},{id:"pool",name:"the pool",x:2,y:4},{id:"flower-bed-3",name:"the flower bed",x:4,y:5}]},jt={width:7,height:8,tiles:[["fB","F","F","F","F","F","fB"],["F","F","F","F","F","F","F"],["pL","F","C","F","C","F","pL"],["F","F","F","F","F","F","F"],["F","F","jZ","jZ","jZ","F","F"],["F","F","jZ","jZ","jZ","fB","F"],["fB","F","F","W","F","F","fB"],["F","F","F","W","F","F","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3]]},{id:"pool-area",name:"Pool Area",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5]]},{id:"greenhouse",name:"Greenhouse",cells:[[0,6],[1,6],[2,6],[0,7],[1,7],[2,7]]},{id:"garage",name:"Garage",cells:[[4,6],[5,6],[6,6],[4,7],[5,7],[6,7]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:6,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:6,y:2},{id:"pool",name:"the pool",x:2,y:4},{id:"flower-bed-3",name:"the flower bed",x:5,y:5},{id:"flower-bed-4",name:"the flower bed",x:0,y:6},{id:"flower-bed-5",name:"the flower bed",x:6,y:6}]},Mt={width:5,height:5,tiles:[["hB","F","W","F","C"],["hB","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","mC","F","C","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"waiting-room",name:"Waiting Room",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:1,y:4}]},Bt={width:6,height:7,tiles:[["hB","F","F","W","F","C"],["hB","F","F","W","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","mC","F"],["F","C","F","F","F","F"],["F","F","W","F","C","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]]},{id:"operating-theatre",name:"Operating Theatre",cells:[[4,0],[5,0],[4,1],[5,1]]},{id:"waiting-room",name:"Waiting Room",cells:[[3,1]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]},{id:"cafeteria",name:"Cafeteria",cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:4,y:4}]},It={width:7,height:8,tiles:[["hB","F","F","F","W","F","C"],["hB","hB","F","F","W","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","mC","F","F"],["F","C","F","F","F","F","C"],["F","F","W","F","C","F","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"operating-theatre",name:"Operating Theatre",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"waiting-room",name:"Waiting Room",cells:[[4,1]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]},{id:"cafeteria",name:"Cafeteria",cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"hospital-bed-3",name:"the hospital bed",x:1,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:4,y:5}]},Pt={width:5,height:5,tiles:[["cH","F","W","sT","sT"],["cH","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"food-stands",name:"Food Stands",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"ticket-booth",name:"Ticket Booth",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"stall-1",name:"the stall",x:3,y:0},{id:"stall-2",name:"the stall",x:4,y:0}]},At={width:6,height:7,tiles:[["cH","F","F","W","sT","sT"],["cH","F","F","W","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","F","F"],["F","C","F","F","C","F"],["F","F","W","F","F","F"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,2]]},{id:"food-stands",name:"Food Stands",cells:[[4,0],[5,0],[4,1],[5,1],[4,2],[5,2]]},{id:"funhouse",name:"Funhouse",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},{id:"ticket-booth",name:"Ticket Booth",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"stall-1",name:"the stall",x:4,y:0},{id:"stall-2",name:"the stall",x:5,y:0}]},Ot={width:7,height:8,tiles:[["cH","F","F","F","W","sT","sT"],["cH","cH","F","F","W","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","F","F","F"],["F","C","F","F","C","F","F"],["F","F","W","F","F","F","C"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"food-stands",name:"Food Stands",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"funhouse",name:"Funhouse",cells:[[0,5],[1,5],[2,5],[0,6],[1,6],[2,6],[0,7],[1,7]]},{id:"backstage",name:"Backstage",cells:[[3,5],[4,5],[5,5],[6,5],[3,6],[4,6],[5,6],[6,6],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"carousel-horse-3",name:"the carousel horse",x:1,y:1},{id:"stall-1",name:"the stall",x:5,y:0},{id:"stall-2",name:"the stall",x:6,y:0}]},k={"coffee-shop":{easy:ct,medium:dt,hard:ht},bookstore:{easy:mt,medium:ft,hard:ut},backyard:{easy:pt,medium:bt,hard:yt},"holiday-mall":{easy:xt,medium:gt,hard:wt},restaurant:{easy:Ft,medium:vt,hard:$t},gym:{easy:kt,medium:Ct,hard:St},office:{easy:Tt,medium:Rt,hard:Et},"garden-party":{easy:Wt,medium:Nt,hard:jt},hospital:{easy:Mt,medium:Bt,hard:It},carnival:{easy:Pt,medium:At,hard:Ot}};function Fe(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Lt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the café.`,inColumn:(e,t)=>`${e} was in the ${Fe(t)} column.`,inRow:(e,t)=>`${e} was in the ${Fe(t)} row.`,besideSuspect:(e,t)=>`${e} was standing next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>t==="chair"?`${e} was sitting in a chair.`:t==="sofa"?`${e} was on the sofa.`:`${e} was on the ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},zt={id:"coffee-shop",name:"The Coffee Shop",floorPlans:{easy:k["coffee-shop"].easy,medium:k["coffee-shop"].medium,hard:k["coffee-shop"].hard},suspectNames:["Alice","Ben","Chloe","Diego","Elena","Finlay","Grace","Hassan","Iris","Jake","Kai","Lena"],victimNames:["Victor","Violet","Vera","Valencia","Vance","Vivian"],clueTemplates:Lt,narrativeTemplates:{intro:["A body has been found at the Copper Bean Café. The morning rush never arrived — instead, the regulars found yellow tape across the door. You pour yourself an espresso and get to work.","The Copper Bean Café is closed for a very different reason today. Someone is dead, and the witnesses are all still clutching their lattes. You take out your notebook.","It was supposed to be a quiet Tuesday at the Copper Bean. Then the screaming started. Now it's your problem. You order a black coffee and begin."],victimFound:["The victim was discovered near table four, cold cup of coffee still in hand.","Staff found the victim behind the counter during the morning prep.","A regular spotted the victim slumped in the corner booth before opening."],guiltyText:["{{killerName}} — served with a side of motive.","{{killerName}} — the evidence is as clear as an Americano.","{{killerName}} — there's no running from the detective on this one."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:plant":"","object:cash-register":"","object:table":""}};function ve(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Ht={inRoom:(e,t)=>`${e} was browsing in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same section as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different sections.`,inColumn:(e,t)=>`${e} was in the ${ve(t)} column.`,inRow:(e,t)=>`${e} was in the ${ve(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was standing near ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="chair"?`${e} was sitting in a reading chair.`:`${e} was sitting on the ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Vt={id:"bookstore",name:"The Bookstore",floorPlans:{easy:k.bookstore.easy,medium:k.bookstore.medium,hard:k.bookstore.hard},suspectNames:["Alex","Bridget","Colin","Diana","Edmund","Fiona","George","Hannah","Ivan","Julia","Kevin","Lydia"],victimNames:["Vincent","Valerie","Violet","Victor","Vera","Valencia"],clueTemplates:Ht,narrativeTemplates:{intro:["The First Chapter Bookshop opened this morning to find more than just dust between the shelves. Someone is dead, and the regulars are still clutching their Earl Grey. You step over the crime scene tape and start asking questions.","A reader never returns a book. This one never returned at all. The First Chapter Bookshop is closed indefinitely — and you're the reason it might reopen. Notebook out.","Mondays at the bookshop are quiet. This Monday is the quietest it's ever been. The body was found in the stacks before the first customer arrived. You're on the case."],victimFound:["The victim was discovered slumped against the shelf in the early morning.","A shop assistant found the victim face-down near the reading table.","The victim was found between the shelves before opening time."],guiltyText:["{{killerName}} — the ending nobody saw coming.","{{killerName}} — the plot twist is on the last page.","{{killerName}} — even mysteries have their answers."]},colorPalette:{floor:"#f0ead6",wall:"#3d2b1f",seat:"#7a5c3a",accent:"#8b1a1a",background:"#1a1510",text:"#ffffff"},spriteMap:{"object:shelf":"","object:table":"","object:cash-register":""}};function $e(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Dt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the yard.`,inColumn:(e,t)=>`${e} was in the ${$e(t)} column.`,inRow:(e,t)=>`${e} was in the ${$e(t)} row.`,besideSuspect:(e,t)=>`${e} was right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="sofa"?`${e} was on the outdoor sofa.`:t==="bed"?`${e} was in the bedroom.`:`${e} was sitting in a chair.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},_t={id:"backyard",name:"The Backyard",floorPlans:{easy:k.backyard.easy,medium:k.backyard.medium,hard:k.backyard.hard},suspectNames:["Aaron","Becca","Chad","Donna","Eric","Fran","Greg","Helen","Ian","Jess","Kurt","Lisa"],victimNames:["Victor","Vanessa","Vince","Vera","Valentina","Virgil"],clueTemplates:Dt,narrativeTemplates:{intro:["The Hendersons were supposed to be hosting a barbecue. Instead, they're hosting a detective. Someone is dead in the backyard and the potato salad is getting warm. You flash your badge.","Summer parties end in hangovers, not homicides. Usually. The backyard of 14 Maple Drive is now a crime scene and you're the one who has to ruin everyone's weekend.","It was a perfect Sunday afternoon until it wasn't. The body was found near the jacuzzi before anyone noticed their drink had gone untouched. You arrive with your notepad."],victimFound:["The victim was found floating face-down near the jacuzzi.","A guest discovered the victim collapsed on the deck.","The victim was found on the grass between the patio chairs."],guiltyText:["{{killerName}} — summer is ruined.","{{killerName}} — the neighborhood will never be the same.","{{killerName}} — nobody escapes the backyard detective."]},colorPalette:{floor:"#d4e8c2",wall:"#5d4037",seat:"#8d6e63",accent:"#e64a19",background:"#1a200f",text:"#ffffff"},spriteMap:{"object:plant":"","object:jacuzzi-tile":"","object:tv":"","object:sofa":""}};function ke(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Yt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was shopping in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the mall.`,inColumn:(e,t)=>`${e} was in the ${ke(t)} column.`,inRow:(e,t)=>`${e} was in the ${ke(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting${t==="chair"?"":" on a "+t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Kt={id:"holiday-mall",name:"The Holiday Mall",floorPlans:{easy:k["holiday-mall"].easy,medium:k["holiday-mall"].medium,hard:k["holiday-mall"].hard},suspectNames:["Ashley","Brett","Cameron","Denise","Eli","Felicia","Grant","Holly","Irving","Jade","Kyle","Leighton"],victimNames:["Victor","Vivian","Vera","Valencia","Vince","Velma"],clueTemplates:Yt,narrativeTemplates:{intro:["The North Pole Mall was supposed to close early for the holiday rush. Instead, it's closed indefinitely. The security cameras caught everything except whoever did this. You wade through the tinsel.","Christmas shopping season. The most wonderful time of year — unless you're the one who ends up under the tree with a chalk outline. You badge your way in through the entrance.","The last thing anyone expects on December 23rd is a murder at the mall. The second-to-last thing is the detective they send. Here you are anyway."],victimFound:["The victim was discovered near the gift-wrapping station before the mall opened.","Security found the victim in the walkway between the stalls.","A store manager found the victim near the Christmas tree display."],guiltyText:["{{killerName}} — some gifts aren't worth giving.","{{killerName}} — unwrapped at last.","{{killerName}} — the season's greetings end here."]},colorPalette:{floor:"#e8e0d0",wall:"#2c3e50",seat:"#7f8c8d",accent:"#c0392b",background:"#0d1117",text:"#ffffff"},spriteMap:{"object:stall":"","object:shelf":"","object:cash-register":"","object:tree":"","object:teddy-bear":""}};function Ce(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Gt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was dining in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the restaurant.`,inColumn:(e,t)=>`${e} was in the ${Ce(t)} column.`,inRow:(e,t)=>`${e} was in the ${Ce(t)} row.`,besideSuspect:(e,t)=>`${e} was seated right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="sofa"?`${e} was on the banquette seating.`:`${e} was sitting at a table.`,notOnSeatTile:e=>`${e} was not seated.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},qt={id:"restaurant",name:"The Restaurant",floorPlans:{easy:k.restaurant.easy,medium:k.restaurant.medium,hard:k.restaurant.hard},suspectNames:["Andre","Bianca","Carlo","Delphine","Emilio","Francoise","Gerard","Helena","Ignacio","Josephine","Kristoffer","Loretta"],victimNames:["Victor","Violette","Vincenzo","Vera","Valeria","Vidal"],clueTemplates:Gt,narrativeTemplates:{intro:["La Maison Rouge was fully booked for a private function. It's now fully booked by the police. Someone didn't make it to dessert — and you're the unwanted amuse-bouche.","The head chef found the body before the morning prep. The restaurant is closed, the reservations are cancelled, and the chef is refusing to speak without a lawyer. You order espresso.","Five-star dining. One-star outcome. The Michelin inspector will not be pleased. Neither will whoever left the body in the private dining room."],victimFound:["The victim was found slumped in the private dining room.","Kitchen staff discovered the victim near the counter.","The sommelier found the victim in the dining room early in the morning."],guiltyText:["{{killerName}} — an amuse-bouche of justice.","{{killerName}} — the bill has arrived.","{{killerName}} — this dish is best served cold."]},colorPalette:{floor:"#f5e8d0",wall:"#3b1f1f",seat:"#8b1a1a",accent:"#c0392b",background:"#180a0a",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:counter":"","object:table":"","object:plant":""}};function Se(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Ut={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were training in different zones.`,inColumn:(e,t)=>`${e} was in the ${Se(t)} column.`,inRow:(e,t)=>`${e} was in the ${Se(t)} row.`,besideSuspect:(e,t)=>`${e} was working out right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting on a bench.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Zt={id:"gym",name:"The Gym",floorPlans:{easy:k.gym.easy,medium:k.gym.medium,hard:k.gym.hard},suspectNames:["Atlas","Blair","Corey","Dakota","Evander","Fitz","Gabe","Hunter","Indira","Jordan","Knox","Leila"],victimNames:["Vance","Valentina","Viktor","Vera","Vito","Vesper"],clueTemplates:Ut,narrativeTemplates:{intro:["FitLife Gym opens at 5am. This morning it opened to a body near the weight rack. The morning regulars are sweating for a different reason now.","Somebody skipped leg day — and left somebody else skipping all days. The body was found in the Weights area. You badge through the turnstile.","The gym is 24 hours. The victim wasn't. You arrive with your notepad and a distinct lack of enthusiasm for the treadmill."],victimFound:["The victim was found near the weight rack before the early shift.","A trainer discovered the victim collapsed in the cardio area.","The victim was found in the pool area during the morning check."],guiltyText:["{{killerName}} — no amount of cardio outpaces the truth.","{{killerName}} — their reps are done.","{{killerName}} — spotting the killer was the easy part."]},colorPalette:{floor:"#e8e0d8",wall:"#2c3e50",seat:"#7f8c8d",accent:"#e74c3c",background:"#0d1117",text:"#ffffff"},spriteMap:{"object:weight-rack":"","object:treadmill":"","object:counter":"","object:jacuzzi-tile":""}};function Te(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Jt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was working in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the office.`,inColumn:(e,t)=>`${e} was in the ${Te(t)} column.`,inRow:(e,t)=>`${e} was in the ${Te(t)} row.`,besideSuspect:(e,t)=>`${e} was working right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting at their desk.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Xt={id:"office",name:"The Office",floorPlans:{easy:k.office.easy,medium:k.office.medium,hard:k.office.hard},suspectNames:["Adrian","Brooke","Clive","Daria","Edwin","Fiona","Graham","Harriet","Isaac","Judith","Kieran","Laura"],victimNames:["Vincent","Veronica","Vance","Vivienne","Victor","Velvet"],clueTemplates:Jt,narrativeTemplates:{intro:["Meridian Corp. Floor 12. The quarterly review meeting has been cancelled for the most permanent possible reason. You badge in and start asking questions before the lawyers arrive.","The victim was found at their desk. The access log shows they never left last night. Whoever did this knew the building. You start with the people who knew it best.","It was supposed to be a normal Monday. Then the HR department filed the wrong kind of incident report. You turn off your phone's out-of-office message and get to work."],victimFound:["The victim was found at their desk during the morning security check.","The building manager found the victim in the Meeting Room after the overnight shift.","A colleague discovered the victim in the Server Room at 7am."],guiltyText:["{{killerName}} — the performance review was terminal.","{{killerName}} — this one won't go in the quarterly report.","{{killerName}} — consider this case closed."]},colorPalette:{floor:"#e8e8f0",wall:"#34495e",seat:"#7f8c8d",accent:"#2980b9",background:"#0a0a14",text:"#ffffff"},spriteMap:{"object:desk":"","object:photocopier":"","object:tv":"","object:plant":""}};function Re(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Qt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the garden.`,inColumn:(e,t)=>`${e} was in the ${Re(t)} column.`,inRow:(e,t)=>`${e} was in the ${Re(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting on a garden chair.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},ea={id:"garden-party",name:"The Garden Party",floorPlans:{easy:k["garden-party"].easy,medium:k["garden-party"].medium,hard:k["garden-party"].hard},suspectNames:["Arabella","Benedict","Cecily","Damien","Eleanor","Freddie","Georgina","Hugo","Imogen","Jasper","Kit","Lavinia"],victimNames:["Violet","Valentine","Verity","Viscount","Viola","Vaughn"],clueTemplates:Qt,narrativeTemplates:{intro:["The Westerleigh garden party was the social event of summer. It is no longer a social event. The body was found beneath the roses and you've been asked — very politely — to investigate.","Champagne, strawberries, murder. The annual garden party at Fernwood House has taken a distinctly unfestive turn. You decline the cucumber sandwiches and start asking questions.","The gazebo was booked for afternoon tea. It is now a crime scene. You roll up your sleeves and walk across the manicured lawn."],victimFound:["The victim was found in the Greenhouse before the afternoon guests arrived.","A gardener discovered the victim on the Lawn near the flower beds.","The caterers found the victim in the Gazebo."],guiltyText:["{{killerName}} — the summer is wilted.","{{killerName}} — cut down in their prime.","{{killerName}} — this garden party is over."]},colorPalette:{floor:"#d4f0c0",wall:"#5d4037",seat:"#7cb342",accent:"#e91e63",background:"#0a1f0a",text:"#ffffff"},spriteMap:{"object:flower-bed":"","object:plant":""}};function Ee(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ta={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same ward as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the hospital.`,inColumn:(e,t)=>`${e} was in the ${Ee(t)} column.`,inRow:(e,t)=>`${e} was in the ${Ee(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="bed"?`${e} was in a hospital bed.`:t==="sofa"?`${e} was in the waiting area.`:`${e} was sitting down.`,notOnSeatTile:e=>`${e} was not sitting or lying down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},aa={id:"hospital",name:"The Hospital",floorPlans:{easy:k.hospital.easy,medium:k.hospital.medium,hard:k.hospital.hard},suspectNames:["Aleksei","Beatrix","Conrad","Dorothea","Emil","Francesca","Gunnar","Hilde","Igor","Jana","Klaus","Liselotte"],victimNames:["Viktor","Valentina","Vera","Valentin","Vesna","Volkmar"],clueTemplates:ta,narrativeTemplates:{intro:["St Crispin's Hospital is where people come to recover. This one didn't make it. The night shift just ended and nobody has an alibi. You flash your badge at the nurses' station.","A hospital is the last place you expect a murder — or the first. The body was found during morning rounds. You put on gloves and start taking statements.","The patient was admitted last night. By morning, they were a victim. Someone in this building knows what happened and you're going to find out who."],victimFound:["The victim was found in the Ward during the overnight nursing check.","The on-call doctor discovered the victim in the Operating Theatre.","The victim was found in the Pharmacy storage area."],guiltyText:["{{killerName}} — the prognosis was never good.","{{killerName}} — no treatment for this outcome.","{{killerName}} — discharged permanently."]},colorPalette:{floor:"#f0f4f8",wall:"#2c3e50",seat:"#7f8c8d",accent:"#e74c3c",background:"#0a0d12",text:"#ffffff"},spriteMap:{"object:hospital-bed":"","object:medicine-cabinet":""}};function We(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ia={inRoom:(e,t)=>`${e} was at the ${t}.`,notInRoom:(e,t)=>`${e} was not at the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the carnival.`,inColumn:(e,t)=>`${e} was in the ${We(t)} column.`,inRow:(e,t)=>`${e} was in the ${We(t)} row.`,besideSuspect:(e,t)=>`${e} was right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was seated at one of the stalls.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},na={id:"carnival",name:"The Carnival",floorPlans:{easy:k.carnival.easy,medium:k.carnival.medium,hard:k.carnival.hard},suspectNames:["Alistair","Brigitte","Cosmo","Dafne","Ezra","Flavia","Gideon","Harriet","Ignatius","Juno","Kit","Ludo"],victimNames:["Victor","Valentina","Vex","Vane","Vesper","Volta"],clueTemplates:ia,narrativeTemplates:{intro:["The Twilight Carnival has been travelling for thirty years without incident. Last night ended that streak. The body was found between the Carousel and the Funhouse. You came for the cotton candy.","Someone killed the Ringmaster. Or maybe the Ringmaster killed someone. Either way, the show is not going on tonight. You arrive as the last customers are being turned away.","Carnivals attract all sorts. This one attracted a detective. The body was found before morning setup. You pull on your coat and walk between the tents."],victimFound:["The victim was found near the Carousel before the carnival opened.","The ride operator discovered the victim in the Funhouse corridor.","The victim was found behind the Food Stands at dawn."],guiltyText:["{{killerName}} — the last act.","{{killerName}} — the fun is over.","{{killerName}} — tickets have been cancelled."]},colorPalette:{floor:"#f5deb3",wall:"#4a235a",seat:"#884ea0",accent:"#e74c3c",background:"#0d0a14",text:"#ffffff"},spriteMap:{"object:carousel-horse":"","object:stall":""}},oa={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same room as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different rooms.`,inColumn:(e,t)=>`${e} was in column ${t}.`,inRow:(e,t)=>`${e} was in row ${t}.`,besideSuspect:(e,t)=>`${e} was beside ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>`${e} was on a ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},sa={id:"stub",name:"Test Room",floorPlans:{easy:k["coffee-shop"].easy,medium:k["coffee-shop"].medium,hard:k["coffee-shop"].hard},suspectNames:["Alice","Bob","Carol","Dave","Eve","Frank","Grace","Henry","Iris","Jack","Kate","Leo"],victimNames:["Vera","Victor","Violet","Valencia","Vance","Vivian"],clueTemplates:oa,narrativeTemplates:{intro:["A crime has occurred in the Test Room.","Witnesses report suspicious activity.","The detective arrives on the scene."],victimFound:["The victim was found at the scene.","A body has been discovered.","The victim was discovered here."],guiltyText:["{{killerName}} — caught red-handed.","{{killerName}} — the evidence is clear.","{{killerName}} — guilty as charged."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{}},me=new Map;function A(e){me.set(e.id,e)}function la(e){const t=me.get(e);if(!t)throw new Error(`Unknown theme: ${e}`);return t}function ra(){return Array.from(me.values())}A(zt);A(Vt);A(_t);A(Kt);A(qt);A(Zt);A(Xt);A(ea);A(aa);A(na);A(sa);const W=(e,t="#1a120a")=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="${t}"/>${e}</svg>`,Ne={chair:W(`
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
  `)};let S=64;function ca(e,t){const a=(window.innerHeight-80)/t,s=window.innerWidth*.62/e;return S=Math.max(56,Math.min(96,Math.floor(Math.min(a,s)))),S}const te=new Map,ae=new Set;function je(e,t){if(!e)return null;if(te.has(e))return te.get(e);if(ae.has(e))return null;ae.add(e);const a=new Image,s=new Blob([e],{type:"image/svg+xml"}),i=URL.createObjectURL(s);return a.onload=()=>{te.set(e,a),ae.delete(e),URL.revokeObjectURL(i),t?.()},a.src=i,null}const Y="'Press Start 2P', monospace",Me=["rgba(192, 120,  40, 0.18)","rgba( 40, 100, 180, 0.16)","rgba( 40, 150,  80, 0.16)","rgba(160,  40, 100, 0.16)","rgba(140, 120,  40, 0.16)","rgba( 80,  40, 160, 0.16)"],U=["rgba(220, 140,  40, 0.75)","rgba( 60, 120, 220, 0.75)","rgba( 40, 170,  80, 0.75)","rgba(200,  40, 120, 0.75)","rgba(180, 160,  20, 0.75)","rgba(100,  40, 200, 0.75)"],da={pL:"object:plant",tB:"object:table",sH:"object:shelf",cR:"object:cash-register",bB:"object:bar-counter",tV:"object:tv",cT:"object:counter",dK:"object:desk",pC:"object:photocopier",fB:"object:flower-bed",hB:"object:hospital-bed",mC:"object:medicine-cabinet",tR:"object:tree",tD:"object:teddy-bear",cH:"object:carousel-horse",tM:"object:treadmill",wT:"object:weight-rack",sT:"object:stall",jZ:"object:jacuzzi-tile"},ha=new Set(["C","S","B"]),ma={C:"chair",S:"sofa",B:"bed"};function fa(e){let t=0;for(let s=0;s<e.length;s++)t=t*31+e.charCodeAt(s)&65535;const a=[0,30,60,120,180,210,270,300];return`hsl(${a[t%a.length]}, 70%, 52%)`}function ua(e){const t=new Map;return e.rooms.forEach((a,s)=>{for(const[i,o]of a.cells)t.set(`${i},${o}`,s)}),t}function pa(e,t,a,s,i,o,l){const r=t.floorPlan,f=a.colorPalette,{blockedRows:u,blockedCols:m}=Ke(Array.from(s.values())),p=ua(r),n=S;for(let c=0;c<r.height;c++)for(let d=0;d<r.width;d++){const b=p.get(`${d},${c}`);b!==void 0&&r.tiles[c][d]!=="W"&&(e.fillStyle=Me[b%Me.length],e.fillRect(d*n,c*n,n,n))}for(let c=0;c<r.height;c++)for(let d=0;d<r.width;d++){const b=r.tiles[c][d],h=d*n,x=c*n;if(b==="W"){e.fillStyle=f.wall,e.fillRect(h,x,n,n),e.strokeStyle="rgba(255,255,255,0.06)",e.lineWidth=1;const v=Math.max(6,Math.floor(n/8));for(let F=0;F<Math.ceil(n/v);F++){const $=x+F*v;e.beginPath(),e.moveTo(h,$),e.lineTo(h+n,$),e.stroke();const w=F%2*(n/2);e.beginPath(),e.moveTo(h+w,$),e.lineTo(h+w,Math.min($+v,x+n)),e.stroke()}continue}if(e.fillStyle=f.floor,e.fillRect(h,x,n,n),e.strokeStyle="rgba(0,0,0,0.10)",e.lineWidth=1,e.strokeRect(h+.5,x+.5,n-1,n-1),ha.has(b)){const v=ma[b]??"chair",F=Ne[v]??"",$=F?je(F,l):null;if($){const w=Math.floor(n*.06);e.drawImage($,h+w,x+w,n-w*2,n-w*2)}else{e.fillStyle=f.seat;const w=Math.floor(n*.4),R=h+(n-w)/2,E=x+(n-w)/2+Math.floor(n*.05);e.fillRect(R,E,w,w),e.fillRect(R,x+Math.floor(n*.08),w,Math.floor(n*.1))}continue}if(b!=="F"){const v=da[b]??`object:${b}`,F=(a.spriteMap[v]??"")||(Ne[v]??""),$=F?je(F,l):null;if($)e.drawImage($,h,x,n,n);else{const w=v.replace("object:","").slice(0,4).toUpperCase();e.fillStyle="rgba(110,75,28,0.88)",e.fillRect(h+2,x+2,n-4,n-4),e.strokeStyle="#7a5c2e",e.lineWidth=2,e.strokeRect(h+2,x+2,n-4,n-4),e.fillStyle="#ffe0a0",e.font=`${Math.max(6,Math.floor(n*.18))}px ${Y}`,e.textAlign="center",e.textBaseline="middle",e.fillText(w,h+n/2,x+n/2),e.textAlign="left",e.textBaseline="alphabetic"}}}const y=[[1,0],[-1,0],[0,1],[0,-1]];r.rooms.forEach((c,d)=>{e.strokeStyle=U[d%U.length],e.lineWidth=2.5;for(const[b,h]of c.cells)if(r.tiles[h]?.[b]!=="W")for(const[x,v]of y){const F=b+x,$=h+v,w=p.get(`${F},${$}`),R=r.tiles[$]?.[F];(w!==d||R==="W"||R===void 0)&&(e.beginPath(),x===1?(e.moveTo((b+1)*n,h*n),e.lineTo((b+1)*n,(h+1)*n)):x===-1?(e.moveTo(b*n,h*n),e.lineTo(b*n,(h+1)*n)):v===1?(e.moveTo(b*n,(h+1)*n),e.lineTo((b+1)*n,(h+1)*n)):(e.moveTo(b*n,h*n),e.lineTo((b+1)*n,h*n)),e.stroke())}}),r.rooms.forEach((c,d)=>{const b=c.cells.filter(([w,R])=>r.tiles[R]?.[w]!=="W");if(!b.length)return;const h=b.map(([w])=>w),x=b.map(([,w])=>w),v=(Math.min(...h)+Math.max(...h)+1)/2*n,F=(Math.min(...x)+Math.max(...x)+1)/2*n,$=Math.max(5,Math.min(8,Math.floor(n*.11)));e.font=`${$}px ${Y}`,e.textAlign="center",e.textBaseline="middle",e.fillStyle="rgba(0,0,0,0.35)",e.fillText(c.name.toUpperCase(),v+1,F+1),e.fillStyle=U[d%U.length].replace("0.75","0.9"),e.fillText(c.name.toUpperCase(),v,F),e.textAlign="left",e.textBaseline="alphabetic"}),e.fillStyle="rgba(0, 0, 0, 0.16)";for(const c of u)e.fillRect(0,c*n,r.width*n,n);for(const c of m)e.fillRect(c*n,0,n,r.height*n);if(i){const c=i.x*n,d=i.y*n;e.fillStyle=`${f.accent}55`,e.fillRect(c,d,n,n),e.strokeStyle=f.accent,e.lineWidth=4,e.strokeRect(c+2,d+2,n-4,n-4),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.strokeRect(c+6,d+6,n-12,n-12);const b=Math.max(10,Math.floor(n*.28));e.font=`bold ${b}px ${Y}`,e.fillStyle="#ffffff",e.textAlign="center",e.textBaseline="middle",e.fillText("?",c+n/2,d+n/2),e.textAlign="left",e.textBaseline="alphabetic"}for(const[c,d]of s){const b=t.suspects.find(w=>w.id===c);if(!b)continue;const h=d.x*n,x=d.y*n,v=Math.floor(n*.1),F=n-v*2;e.fillStyle=fa(c),e.fillRect(h+v,x+v,F,F),e.strokeStyle="rgba(0,0,0,0.7)",e.lineWidth=2,e.strokeRect(h+v+1,x+v+1,F-2,F-2),e.strokeStyle="rgba(255,255,255,0.25)",e.lineWidth=1,e.strokeRect(h+v+3,x+v+3,F-6,F-6);const $=Math.min(16,Math.floor(F*.5));e.fillStyle="#ffffff",e.font=`${$}px ${Y}`,e.textAlign="center",e.textBaseline="middle",e.fillText(b.name.charAt(0).toUpperCase(),h+n/2,x+n/2+1),e.textAlign="left",e.textBaseline="alphabetic"}if(o){for(const[c,d]of o.x){const b=c*n,h=d*n;e.fillStyle="rgba(192,57,43,0.18)",e.fillRect(b,h,n,n),e.strokeStyle="#c0392b",e.lineWidth=3;const x=Math.floor(n*.18);e.beginPath(),e.moveTo(b+x,h+x),e.lineTo(b+n-x,h+n-x),e.stroke(),e.beginPath(),e.moveTo(b+n-x,h+x),e.lineTo(b+x,h+n-x),e.stroke()}for(const[c,d]of Object.entries(o.candidates)){if(!d.length)continue;const[b,h]=c.split(",").map(Number),x=b*n,v=h*n,F=d.map(w=>t.suspects.find(R=>R.id===w)?.name.charAt(0).toUpperCase()??"?").join("")+"?",$=Math.max(5,Math.floor(n*.14));e.font=`${$}px ${Y}`,e.fillStyle="rgba(80,100,220,0.9)",e.textAlign="center",e.textBaseline="bottom",e.fillText(F,x+n/2,v+n-2),e.textAlign="left",e.textBaseline="alphabetic"}}}function ba(e){return{width:e.floorPlan.width*S,height:e.floorPlan.height*S}}const ya=`
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
`,Be=["rgba(220,140,40,0.35)","rgba(60,120,220,0.35)","rgba(40,170,80,0.35)","rgba(200,40,120,0.35)","rgba(180,160,20,0.35)","rgba(100,40,200,0.35)"],Ie=["#dc8c28","#3c78dc","#28aa50","#c82878","#b4a014","#6428c8"];let Pe=!1;function xa(){if(Pe)return;const e=document.createElement("style");e.textContent=ya,document.head.appendChild(e),Pe=!0}function ga(e){let t=0;for(let s=0;s<e.length;s++)t=t*31+e.charCodeAt(s)&65535;const a=[0,30,60,120,180,210,270,300];return`hsl(${a[t%a.length]}, 70%, 52%)`}function wa(e,t,a,s){e.width=32,e.height=32;const o=e.getContext("2d");if(!o)return;const l=ga(t);o.fillStyle=s?l:"rgba(180,160,120,0.3)",o.fillRect(0,0,32,32),o.fillStyle=s?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.08)",o.beginPath(),o.arc(32/2,32*.38,32*.28,0,Math.PI*2),o.fill(),o.fillStyle=s?"rgba(0,0,0,0.2)":"rgba(0,0,0,0.06)",o.beginPath(),o.moveTo(32*.28,32*.65),o.lineTo(32*.72,32*.65),o.lineTo(32*.85,32),o.lineTo(32*.15,32),o.closePath(),o.fill(),o.fillStyle=s?"#ffffff":"rgba(60,40,10,0.6)",o.font=`bold ${Math.floor(32*.45)}px 'Press Start 2P', monospace`,o.textAlign="center",o.textBaseline="middle",o.fillText(a.charAt(0).toUpperCase(),32/2,32*.38),o.textAlign="left",o.textBaseline="alphabetic",o.strokeStyle=s?l:"rgba(139,105,20,0.5)",o.lineWidth=2,o.strokeRect(1,1,30,30)}function Fa(e,t,a,s,i){xa(),e.innerHTML="",e.className="alibi-sidebar";const o=document.createElement("div");o.className="alibi-sidebar-section";const l=document.createElement("div");l.className="alibi-sidebar-label",l.textContent="Rooms",o.appendChild(l);const r=document.createElement("div");r.className="alibi-room-legend",t.floorPlan.rooms.forEach((F,$)=>{const w=document.createElement("div");w.className="alibi-room-entry";const R=document.createElement("div");R.className="alibi-room-swatch",R.style.background=Be[$%Be.length],R.style.borderColor=Ie[$%Ie.length];const E=document.createElement("span");E.textContent=F.name,w.appendChild(R),w.appendChild(E),r.appendChild(w)}),o.appendChild(r),e.appendChild(o);const f=document.createElement("div");f.className="alibi-victim-section";const u=document.createElement("div");u.className="alibi-sidebar-label",u.textContent="Victim",f.appendChild(u);const m=document.createElement("div");m.className="alibi-victim-card",m.setAttribute("data-testid","victim-token");const p=document.createElement("div");p.className="alibi-victim-icon",p.textContent="?";const n=document.createElement("div");n.className="alibi-victim-label",a.size>=t.suspects.length?(n.textContent=`Location revealed!
Click victim cell`,p.textContent="☠",m.style.borderColor="rgba(192,57,43,0.7)",m.style.background="rgba(192,57,43,0.12)"):n.textContent=`Unknown
Place all ${t.suspects.length} suspects`,m.appendChild(p),m.appendChild(n),f.appendChild(m),e.appendChild(f);const c=document.createElement("div");c.className="alibi-sidebar-section";const d=document.createElement("div");d.className="alibi-sidebar-label",d.textContent="Suspects",c.appendChild(d);const b=document.createElement("div");b.className="alibi-suspect-section";for(const F of t.suspects){const $=a.has(F.id),w=document.createElement("div");w.className="alibi-suspect-card"+($?" placed":""),w.setAttribute("data-testid",`suspect-card-${F.id}`);const R=document.createElement("div");R.className="alibi-suspect-portrait";const E=document.createElement("canvas");wa(E,F.id,F.name,$),R.appendChild(E);const j=document.createElement("div");j.className="alibi-suspect-info";const g=document.createElement("div");g.className="alibi-suspect-name",g.textContent=F.name;const C=document.createElement("div");if(C.className="alibi-suspect-status",$){const T=a.get(F.id);C.textContent=`Col ${T.x+1}, Row ${T.y+1}`}else C.textContent="Not placed";j.appendChild(g),j.appendChild(C),w.appendChild(R),w.appendChild(j),b.appendChild(w)}c.appendChild(b),e.appendChild(c);const h=document.createElement("div");h.className="alibi-sidebar-section";const x=document.createElement("div");x.className="alibi-sidebar-label",x.textContent="Evidence",h.appendChild(x);const v=document.createElement("div");v.className="alibi-clue-section",t.clues.forEach((F,$)=>{const w=document.createElement("div");w.className="alibi-clue-card",w.setAttribute("data-testid",`clue-${$}`),s.has($)&&w.classList.add("clue-satisfied"),i.has($)&&w.classList.add("clue-error"),w.textContent=F.text,v.appendChild(w)}),h.appendChild(v),e.appendChild(h)}const va=`
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
`;let Ae=!1;function fe(){if(Ae)return;const e=document.createElement("style");e.textContent=va,document.head.appendChild(e),Ae=!0}function ie(e,t,a){fe(),ue(e);const s=document.createElement("div");s.className="alibi-overlay",s.setAttribute("data-testid","narrative-intro");const i=document.createElement("div");i.className="alibi-modal";const o=document.createElement("h2");o.textContent="A New Case";const l=document.createElement("p");l.textContent=t.narrativeIntro;const r=document.createElement("button");r.textContent="Begin Investigation",r.addEventListener("click",()=>{s.remove(),a()}),i.appendChild(o),i.appendChild(l),i.appendChild(r),s.appendChild(i),e.appendChild(s)}function $a(e,t){fe(),ue(e);const a=t.narrativeGuilty.replace("{{killerName}}",t.killer.name),s=document.createElement("div");s.className="alibi-overlay";const i=document.createElement("div");i.className="alibi-modal";const o=document.createElement("div");o.className="alibi-guilty-stamp",o.setAttribute("data-testid","guilty-stamp"),o.textContent="GUILTY";const l=document.createElement("div");l.className="alibi-guilty-killer",l.setAttribute("data-testid","guilty-killer-name"),l.textContent=t.killer.name;const r=document.createElement("p");r.textContent=a;const f=document.createElement("p");f.textContent=t.narrativeVictimFound,i.appendChild(o),i.appendChild(l),i.appendChild(f),i.appendChild(r),s.appendChild(i),e.appendChild(s)}function ue(e){const t=e.querySelector(".alibi-overlay");t&&t.remove()}function ka(e){fe(),ue(e);const t=document.createElement("div");t.className="alibi-overlay",t.setAttribute("data-testid","msg-clue-gate");const a=document.createElement("div");a.className="alibi-modal";const s=document.createElement("h2");s.textContent="Something Doesn't Add Up…";const i=document.createElement("p");i.textContent="Check the clue cards. Not all witnesses are satisfied.";const o=document.createElement("button");o.textContent="Keep Investigating",o.addEventListener("click",()=>t.remove()),a.appendChild(s),a.appendChild(i),a.appendChild(o),t.appendChild(a),e.appendChild(t),setTimeout(()=>{t.isConnected&&t.remove()},3e3)}function Ca(){return{x:[],candidates:{}}}function Oe(e){return{placements:new Map,annotations:Ca(),satisfiedClues:new Set,errorClues:new Set,victimVisible:!1,victimCell:null,phase:"playing",elapsedMs:0}}function Sa(e,t,a,s,i){const o=new Map(e.placements);return o.set(a,{suspectId:a,x:s,y:i}),pe({...e,placements:o},t)}function Ta(e,t,a){const s=new Map(e.placements);return s.delete(a),pe({...e,placements:s},t)}function Ra(e){if(e.satisfiedClues.size===0&&e.placements.size>0)return e;const t=e.satisfiedClues.size+e.errorClues.size;return e.errorClues.size===0&&t>0&&e.victimVisible?{...e,phase:"guilty"}:e}function pe(e,t){const a=new Set,s=new Set;t.clues.forEach((l,r)=>{const f=le(t.floorPlan,l,e.placements);f===!0?a.add(r):f===!1&&s.add(r)});const i=Ge(t.floorPlan,Array.from(e.placements.values()));return{...e,satisfiedClues:a,errorClues:s,victimVisible:i!==null,victimCell:i}}function D(e){return{x:[...e.x.map(([t,a])=>[t,a])],candidates:Object.fromEntries(Object.entries(e.candidates).map(([t,a])=>[t,[...a]]))}}function Ea(e,t,a){const s=D(e.annotations),i=s.x.findIndex(([o,l])=>o===t&&l===a);return i>=0?s.x.splice(i,1):s.x.push([t,a]),{...e,annotations:s}}function Wa(e,t,a,s){const i=D(e.annotations),o=`${t},${a}`;return i.candidates[o]||(i.candidates[o]=[]),i.candidates[o].includes(s)||(i.candidates[o]=[...i.candidates[o],s]),{...e,annotations:i}}function Na(e,t,a,s){const i=D(e.annotations),o=`${t},${a}`;return i.candidates[o]&&(i.candidates[o]=i.candidates[o].filter(l=>l!==s),i.candidates[o].length===0&&delete i.candidates[o]),{...e,annotations:i}}function ja(e,t,a,s){const i=D(e.annotations);for(const l of Object.keys(i.candidates))i.candidates[l]=i.candidates[l].filter(r=>r!==t),i.candidates[l].length===0&&delete i.candidates[l];const o=i.x.findIndex(([l,r])=>l===a&&r===s);return o>=0&&i.x.splice(o,1),{...e,annotations:i}}function z(e){return{placements:new Map(e.placements),annotations:D(e.annotations)}}function ne(e,t,a){return pe({...e,placements:new Map(a.placements),annotations:D(a.annotations)},t)}const Ma=50;class Ba{constructor(){Q(this,"past",[]);Q(this,"future",[])}push(t){this.past.push(t),this.past.length>Ma&&this.past.shift(),this.future=[]}undo(t){return this.past.length===0?null:(this.future.push(t),this.past.pop())}redo(t){return this.future.length===0?null:(this.past.push(t),this.future.pop())}canUndo(){return this.past.length>0}canRedo(){return this.future.length>0}clear(){this.past=[],this.future=[]}}let K=null,X=!1;function Ia(){if(X)return null;try{return K||(K=new AudioContext),K.state==="suspended"&&K.resume().catch(()=>{}),K}catch{return null}}function L(e,t,a="sine",s=.15){const i=Ia();if(i)try{const o=i.createOscillator(),l=i.createGain();o.connect(l),l.connect(i.destination),o.type=a,o.frequency.value=e,l.gain.setValueAtTime(s,i.currentTime),l.gain.exponentialRampToValueAtTime(.001,i.currentTime+t),o.start(i.currentTime),o.stop(i.currentTime+t)}catch{}}function Z(e){switch(e){case"place":L(440,.08,"sine",.12);break;case"remove":L(330,.06,"sine",.08);break;case"clue-satisfied":L(660,.12,"sine",.15);break;case"solve":{L(523,.15,"sine",.2),setTimeout(()=>L(659,.15,"sine",.2),150),setTimeout(()=>L(784,.3,"sine",.25),300);break}case"error":L(220,.2,"square",.1);break;case"navigate":L(880,.05,"sine",.08);break}}function Pa(){return X=!X,X}function Aa(e,t){const a=Math.floor(t/6e4),s=Math.floor(t%6e4/1e3),i=a>0?`${a}m ${s}s`:`${s}s`,o=e.difficulty.charAt(0).toUpperCase()+e.difficulty.slice(1);return["🔍 ALIBI",`Case: ${e.floorPlan===e.floorPlan?e.themeId.replace(/-/g," ").replace(/\b\w/g,l=>l.toUpperCase()):"Unknown"}`,`Difficulty: ${o}`,`Clues: ${e.clues.length}`,`Time: ${i}`,`Killer: ${e.killer.name}`,"","pnz1990.github.io/alibi/"].join(`
`)}async function Oa(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;const t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:-9999px;left:-9999px;",document.body.appendChild(t),t.focus(),t.select();const a=document.execCommand("copy");return document.body.removeChild(t),a}catch{return!1}}const be={campaign:e=>`alibi_campaign_${e}`,daily:e=>`alibi_daily_${e}`,streak:"alibi_streak",stats:"alibi_stats",prefs:"alibi_prefs",puzzleState:"alibi_puzzle_state"};function La(e){try{const t=ye();t[e.key]=e,localStorage.setItem(be.puzzleState,JSON.stringify(t))}catch{}}function za(e){try{return ye()[e]??null}catch{return null}}function Le(e){try{const t=ye();delete t[e],localStorage.setItem(be.puzzleState,JSON.stringify(t))}catch{}}function ye(){try{const e=localStorage.getItem(be.puzzleState);return e?JSON.parse(e):{}}catch{return{}}}const Ha=`
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
`;let ze=!1;function Va(){if(ze)return;const e=document.createElement("style");e.textContent=Ha,document.head.appendChild(e),ze=!0}let re=null,ce=null;function O(){re?.remove(),ce?.remove(),re=null,ce=null}function Da(e,t,a){if(O(),!a.length)return;const s=52,i=22,o=document.createElement("div");o.className="alibi-wheel-backdrop",o.addEventListener("click",O),o.addEventListener("touchstart",O,{passive:!0}),document.body.appendChild(o),ce=o;const l=document.createElement("div");l.className="alibi-wheel",l.setAttribute("data-testid","radial-menu"),l.style.left=`${e}px`,l.style.top=`${t}px`,l.style.transform="translate(-50%, -50%)",l.style.pointerEvents="all";const r=a.length,f=(s+i+4)*2,u=f/2,m=f/2,p=document.createElementNS("http://www.w3.org/2000/svg","svg");p.setAttribute("class","alibi-wheel-svg"),p.setAttribute("width",String(f)),p.setAttribute("height",String(f)),p.setAttribute("viewBox",`0 0 ${f} ${f}`);let n=-1;a.forEach((d,b)=>{const h=b/r*Math.PI*2-Math.PI/2,x=(b+1)/r*Math.PI*2-Math.PI/2,v=(h+x)/2,F=.06,$=18,w=s+i,R=u+$*Math.cos(h+F),E=m+$*Math.sin(h+F),j=u+$*Math.cos(x-F),g=m+$*Math.sin(x-F),C=u+w*Math.cos(h+F),T=m+w*Math.sin(h+F),N=u+w*Math.cos(x-F),V=m+w*Math.sin(x-F),xe=x-h-F*2>Math.PI?1:0,Ue=[`M ${R} ${E}`,`A ${$} ${$} 0 ${xe} 1 ${j} ${g}`,`L ${N} ${V}`,`A ${w} ${w} 0 ${xe} 0 ${C} ${T}`,"Z"].join(" "),I=document.createElementNS("http://www.w3.org/2000/svg","path");I.setAttribute("d",Ue),I.setAttribute("fill",d.color),I.setAttribute("stroke","rgba(0,0,0,0.5)"),I.setAttribute("stroke-width","1.5"),I.style.cursor="pointer",I.style.transition="filter 0.08s";const ge=($+w)/2,Ze=u+ge*Math.cos(v),Je=m+ge*Math.sin(v),P=document.createElementNS("http://www.w3.org/2000/svg","text");P.setAttribute("x",String(Ze)),P.setAttribute("y",String(Je)),P.setAttribute("text-anchor","middle"),P.setAttribute("dominant-baseline","middle"),P.setAttribute("fill","#ffffff"),P.setAttribute("font-size",r>8?"7":"8"),P.setAttribute("font-family","'Press Start 2P', monospace"),P.setAttribute("pointer-events","none"),P.style.userSelect="none",P.textContent=d.label,I.setAttribute("data-testid",d.testid),I.addEventListener("mouseenter",()=>{I.style.filter="brightness(1.4)",P.setAttribute("fill","#ffffc0")}),I.addEventListener("mouseleave",()=>{I.style.filter="",P.setAttribute("fill","#ffffff")}),I.addEventListener("click",Xe=>{Xe.stopPropagation(),O(),d.onClick()}),p.appendChild(I),p.appendChild(P)});let y=!1;p.addEventListener("touchstart",d=>{d.preventDefault(),y=!0},{passive:!1}),p.addEventListener("touchmove",d=>{if(!y)return;d.preventDefault();const b=d.touches[0],h=p.getBoundingClientRect(),x=b.clientX-(h.left+h.width/2),v=b.clientY-(h.top+h.height/2);if(Math.sqrt(x*x+v*v)<16){n>=0&&(p.children[n*2].style.filter="",n=-1);return}let $=Math.atan2(v,x)+Math.PI/2;$<0&&($+=Math.PI*2);const w=Math.floor($/(Math.PI*2)*r)%r;w!==n&&(n>=0&&(p.children[n*2].style.filter=""),n=w,p.children[w*2].style.filter="brightness(1.5)")},{passive:!1}),p.addEventListener("touchend",d=>{d.preventDefault(),y=!1,n>=0&&n<a.length&&(O(),a[n].onClick()),n=-1},{passive:!1}),l.appendChild(p);const c=document.createElement("div");c.className="alibi-wheel-center",c.textContent="✕",c.addEventListener("click",d=>{d.stopPropagation(),O()}),l.appendChild(c),document.body.appendChild(l),re=l}function _a(e,t,a,s,i){Va();const o=t.floorPlan,l=document.createElement("div");l.className="alibi-radial-overlay",l.style.cssText=`position:absolute;top:0;left:0;width:${o.width*S}px;height:${o.height*S}px;`,e.style.position="relative",e.appendChild(l);const r=[];for(let n=0;n<o.height;n++){r[n]=[];for(let y=0;y<o.width;y++){const c=o.tiles[n][y],d=document.createElement("div");d.setAttribute("data-testid",`cell-${y}-${n}`),d.style.cssText=`position:absolute;left:${y*S}px;top:${n*S}px;width:${S}px;height:${S}px;`,H(c)&&(d.classList.add("alibi-cell-overlay","placeable"),d.addEventListener("click",b=>{b.stopPropagation();const h=e.getBoundingClientRect(),x=h.left+(y+.5)*S,v=h.top+(n+.5)*S;Ka(y,n,x,v,s,t,i)})),r[n][y]=d,l.appendChild(d)}}let f=null;const u=()=>O();document.addEventListener("keydown",n=>{n.key==="Escape"&&O()});function m(){const n=s();if(f&&(f.remove(),f=null),n.victimCell){const{x:d,y:b}=n.victimCell;f=document.createElement("div"),f.setAttribute("data-testid","victim-cell"),f.className="alibi-cell-overlay victim-highlight",f.style.cssText=`position:absolute;left:${d*S}px;top:${b*S}px;width:${S}px;height:${S}px;pointer-events:all;`,f.addEventListener("click",h=>{h.stopPropagation(),i.onVictimClick()}),l.appendChild(f)}const y=new Set,c=new Set;for(const d of n.placements.values())y.add(d.y),c.add(d.x);for(let d=0;d<o.height;d++)for(let b=0;b<o.width;b++){const h=r[d]?.[b];if(!h)continue;const x=o.tiles[d][b],v=Array.from(n.placements.values()).some($=>$.x===b&&$.y===d),F=y.has(d)||c.has(b);h.style.pointerEvents=H(x)&&(!F||v)?"all":"none"}l.style.width=`${o.width*S}px`,l.style.height=`${o.height*S}px`;for(let d=0;d<o.height;d++)for(let b=0;b<o.width;b++){const h=r[d]?.[b];h&&(h.style.left=`${b*S}px`,h.style.top=`${d*S}px`,h.style.width=`${S}px`,h.style.height=`${S}px`)}l.querySelectorAll("[data-annotation]").forEach(d=>d.remove());for(const[d,b]of n.annotations.x){const h=document.createElement("div");h.setAttribute("data-testid",`cell-annotation-x-${d}-${b}`),h.setAttribute("data-annotation","x"),h.style.cssText=`position:absolute;left:${d*S}px;top:${b*S}px;width:${S}px;height:${S}px;pointer-events:none;`,l.appendChild(h)}for(const[d,b]of Object.entries(n.annotations.candidates)){if(!b.length)continue;const[h,x]=d.split(",").map(Number),v=document.createElement("div");v.setAttribute("data-testid",`cell-annotation-candidates-${h}-${x}`),v.setAttribute("data-annotation","candidates"),v.setAttribute("data-candidates",b.join(",")),v.style.cssText=`position:absolute;left:${h*S}px;top:${x*S}px;width:${S}px;height:${S}px;pointer-events:none;`,l.appendChild(v)}}function p(){document.removeEventListener("click",u),l.remove(),O()}return m(),{updateOverlays:m,detach:p}}function Ya(e){let t=0;for(let s=0;s<e.length;s++)t=t*31+e.charCodeAt(s)&65535;const a=[0,30,60,120,180,210,270,300];return`hsl(${a[t%a.length]}, 65%, 40%)`}function Ka(e,t,a,s,i,o,l){const r=i(),f=Array.from(r.placements.entries()).find(([,y])=>y.x===e&&y.y===t),u=[],m=new Set(r.placements.keys());for(const y of o.suspects)m.has(y.id)||u.push({label:y.name.charAt(0).toUpperCase(),sublabel:`Place ${y.name}`,testid:`suspect-option-${y.id}`,color:Ya(y.id),onClick:()=>l.onPlace(y.id,e,t)});const p=r.annotations.x.some(([y,c])=>y===e&&c===t);u.push({label:"✕",sublabel:p?"Clear X":"Mark X",testid:"suspect-option-markx",color:p?"#5a1a1a":"#3a1a1a",onClick:()=>l.onToggleX(e,t)});const n=r.annotations.candidates[`${e},${t}`]??[];for(const y of o.suspects){if(m.has(y.id))continue;const c=n.includes(y.id);u.push({label:y.name.charAt(0).toUpperCase()+"?",sublabel:c?`Remove ${y.name}?`:`Maybe ${y.name}`,testid:`suspect-option-candidate-${y.id}`,color:c?"#2a2a5a":"#1a1a3a",onClick:()=>c?l.onRemoveCandidate(y.id,e,t):l.onAddCandidate(y.id,e,t)})}f&&u.push({label:"↩",sublabel:"Remove",testid:"suspect-option-clear",color:"#2a2a2a",onClick:()=>l.onRemove(f[0])}),u.length&&Da(a,s,u)}function Ga(e){return`${e.seed}-${e.themeId}-${e.difficulty}`}function qa(e){const t=new URLSearchParams(location.search),a=t.get("theme")??"coffee-shop",s=t.get("difficulty")??"easy",i=parseInt(t.get("seed")??"0",10),o=la(a),l=rt(i,o,s),r=Ga(l),f=Ja(),u=f.querySelector(".alibi-canvas-wrapper"),m=f.querySelector(".alibi-sidebar-container"),p=document.getElementById("game-canvas"),n=p.getContext("2d");p.style.imageRendering="pixelated";function y(){ca(l.floorPlan.width,l.floorPlan.height);const{width:g,height:C}=ba(l);p.width=g,p.height=C,p.style.width=`${g}px`,p.style.height=`${C}px`,h()}u.appendChild(p);let c=Oe();const d=new Ba;function b(g,C){const T={};C.placements.forEach((N,V)=>{T[V]={x:N.x,y:N.y}}),La({key:g,placements:T,elapsedMs:C.elapsedMs,savedAt:new Date().toISOString(),annotations:C.annotations})}function h(){pa(n,l,o,c.placements,c.victimCell,c.annotations,()=>h()),Fa(m,l,c.placements,c.satisfiedClues,c.errorClues),x.updateOverlays()}const x=_a(u,l,o,()=>c,{onPlace(g,C,T){c.phase==="playing"&&(d.push(z(c)),c=Sa(c,l,g,C,T),c=ja(c,g,C,T),b(r,c),Z(c.satisfiedClues.size>0?"clue-satisfied":"place"),h())},onRemove(g){c.phase==="playing"&&(d.push(z(c)),c=Ta(c,l,g),b(r,c),Z("remove"),h())},onVictimClick(){if(c.phase!=="playing")return;const g=Ra(c);g.phase==="guilty"?(c=g,Le(r),Z("solve"),h(),$a(document.body,l),Xa(l,c)):(Z("error"),h(),ka(document.body))},onToggleX(g,C){c.phase==="playing"&&(d.push(z(c)),c=Ea(c,g,C),b(r,c),h())},onAddCandidate(g,C,T){c.phase==="playing"&&(d.push(z(c)),c=Wa(c,C,T,g),b(r,c),h())},onRemoveCandidate(g,C,T){c.phase==="playing"&&(d.push(z(c)),c=Na(c,C,T,g),b(r,c),h())}}),v=f.querySelector('[data-testid="btn-undo"]'),F=f.querySelector('[data-testid="btn-redo"]');v.addEventListener("click",$),F.addEventListener("click",w);function $(){const g=d.undo(z(c));g&&(c=ne(c,l,g),h())}function w(){const g=d.redo(z(c));g&&(c=ne(c,l,g),h())}const R=f.querySelector('[data-testid="btn-mute"]');R.addEventListener("click",()=>{const g=Pa();R.textContent=g?"🔇":"🔊"}),document.addEventListener("keydown",g=>{(g.ctrlKey||g.metaKey)&&g.key==="z"&&!g.shiftKey&&($(),g.preventDefault()),(g.ctrlKey||g.metaKey)&&(g.key==="y"||g.key==="z"&&g.shiftKey)&&(w(),g.preventDefault())});const E=za(r);E&&Object.keys(E.placements).length>0?Qa(f,()=>{const g=new Map(Object.entries(E.placements).map(([N,V])=>[N,{suspectId:N,x:V.x,y:V.y}])),C=E.annotations??{x:[],candidates:{}},T={placements:g,annotations:C};c=ne(Oe(),l,T),c={...c,elapsedMs:E.elapsedMs},y(),ie(document.body,l,()=>{})},()=>{Le(r),ie(document.body,l,()=>{})}):ie(document.body,l,()=>{}),y(),new ResizeObserver(()=>y()).observe(document.body)}const Ua=`
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
`;let He=!1;function Za(){if(He)return;const e=document.createElement("style");e.textContent=Ua,document.head.appendChild(e),He=!0}function Ja(){Za();const e=document.createElement("div");e.setAttribute("data-testid","screen-game"),e.className="alibi-game-screen";const t=document.createElement("div");t.className="alibi-grid-panel",t.style.cssText="flex:1;display:flex;align-items:center;justify-content:center;padding:16px;overflow:hidden;";const a=document.createElement("div");a.className="alibi-canvas-wrapper",t.appendChild(a);const s=document.createElement("div");s.style.cssText="display:flex;flex-direction:column;height:100vh;width:280px;flex-shrink:0;";const i=document.createElement("div");i.className="alibi-toolbar";const o=oe("btn-undo","↩ Undo"),l=oe("btn-redo","↪ Redo"),r=oe("btn-mute","🔊");i.append(o,l,r);const f=document.createElement("div");f.className="alibi-sidebar-container",s.append(i,f),e.append(t,s);const u=document.getElementById("game-canvas");return u.parentElement?.insertBefore(e,u),e}function oe(e,t){const a=document.createElement("button");return a.setAttribute("data-testid",e),a.textContent=t,a}function Xa(e,t){const a=document.createElement("button");a.setAttribute("data-testid","btn-share"),a.style.cssText='position:fixed;bottom:24px;right:24px;z-index:300;background:#c0392b;color:#fff;border:2px solid #ff5a47;border-radius:0;padding:10px 20px;font-family:"Press Start 2P",monospace;font-size:11px;cursor:pointer;box-shadow:3px 3px 0 #6b0000;',a.textContent="📋 Share Result",a.addEventListener("click",async()=>{const s=Aa(e,t.elapsedMs),i=await Oa(s);a.textContent=i?"✓ Copied!":"📋 Share Result",i&&setTimeout(()=>{a.textContent="📋 Share Result"},2e3)}),document.body.appendChild(a)}function Qa(e,t,a){const s=document.createElement("div");s.setAttribute("data-testid","prompt-resume"),s.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:150;font-family:"Press Start 2P",monospace;';const i=document.createElement("div");i.style.cssText="background:#0a0a12;border:3px solid #c0392b;border-radius:0;box-shadow:4px 4px 0 #6b0000;padding:28px;max-width:360px;text-align:center;color:#fff;";const o=document.createElement("h2");o.style.cssText='color:#c0392b;margin-bottom:16px;font-family:"Press Start 2P",monospace;font-size:0.75em;line-height:1.6;',o.textContent="Resume?";const l=document.createElement("p");l.style.cssText='color:#aaa;margin-bottom:20px;font-family:"Press Start 2P",monospace;font-size:0.45em;line-height:2;',l.textContent="Continue your in-progress case?";const r=document.createElement("button");r.style.cssText='background:#c0392b;color:#fff;border:2px solid #ff5a47;border-radius:0;padding:9px 20px;font-family:"Press Start 2P",monospace;font-size:9px;cursor:pointer;margin-right:8px;box-shadow:2px 2px 0 #6b0000;',r.textContent="Resume",r.addEventListener("click",()=>{s.remove(),t()});const f=document.createElement("button");f.style.cssText='background:#1a1a2e;color:#fff;border:2px solid #555;border-radius:0;padding:9px 20px;font-family:"Press Start 2P",monospace;font-size:9px;cursor:pointer;box-shadow:2px 2px 0 #000;',f.textContent="Start Fresh",f.addEventListener("click",()=>{s.remove(),a()}),i.append(o,l,r,f),s.appendChild(i),e.appendChild(s)}function ei(e){let t=5381;for(let a=0;a<e.length;a++)t=(t<<5)+t+e.charCodeAt(a)|0;return Math.abs(t)}function ti(){const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const Ve=[{themeId:"coffee-shop",difficulty:"easy"},{themeId:"bookstore",difficulty:"easy"},{themeId:"backyard",difficulty:"easy"},{themeId:"holiday-mall",difficulty:"easy"},{themeId:"restaurant",difficulty:"easy"},{themeId:"gym",difficulty:"easy"},{themeId:"office",difficulty:"easy"},{themeId:"garden-party",difficulty:"easy"},{themeId:"hospital",difficulty:"easy"},{themeId:"carnival",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"bookstore",difficulty:"medium"},{themeId:"backyard",difficulty:"medium"},{themeId:"holiday-mall",difficulty:"medium"},{themeId:"restaurant",difficulty:"medium"},{themeId:"gym",difficulty:"medium"},{themeId:"office",difficulty:"medium"},{themeId:"garden-party",difficulty:"medium"},{themeId:"hospital",difficulty:"medium"},{themeId:"carnival",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"bookstore",difficulty:"hard"},{themeId:"backyard",difficulty:"hard"},{themeId:"holiday-mall",difficulty:"hard"},{themeId:"restaurant",difficulty:"hard"},{themeId:"gym",difficulty:"hard"},{themeId:"office",difficulty:"hard"},{themeId:"garden-party",difficulty:"hard"},{themeId:"hospital",difficulty:"hard"},{themeId:"carnival",difficulty:"hard"}];function ai(e){const t=ei(e),a=new Date(e+"T12:00:00Z"),s=Math.floor((a.getTime()-new Date(a.getUTCFullYear(),0,0).getTime())/864e5),{themeId:i,difficulty:o}=Ve[s%Ve.length];return{seed:t,themeId:i,difficulty:o,dateStr:e}}function ii(){return ai(ti())}const ni=`
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
`;let De=!1;function oi(){if(De)return;const e=document.createElement("style");e.textContent=ni,document.head.appendChild(e),De=!0}function si(){oi();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-home"),t.className="alibi-home";const a=document.createElement("div");a.className="alibi-home-eyebrow",a.textContent="— A Mystery Awaits —";const s=document.createElement("div");s.className="alibi-home-title",s.textContent="ALIBI";const i=document.createElement("div");i.className="alibi-home-subtitle",i.textContent=`Murder Mystery
Deduction`;const o=document.createElement("div");o.className="alibi-home-buttons",o.appendChild(se("btn-campaign","primary","📁 Campaign","12 escalating cases")),o.appendChild(se("btn-quickplay","secondary","🎲 Quick Play","Pick theme + difficulty")),o.appendChild(se("btn-daily","secondary","📅 Daily Case","Same worldwide · daily streak")),t.append(a,s,i,o),document.body.appendChild(t),t.querySelector('[data-testid="btn-quickplay"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=quickplay`}),t.querySelector('[data-testid="btn-campaign"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=campaign`}),t.querySelector('[data-testid="btn-daily"]').addEventListener("click",()=>{t.remove();const{seed:l,themeId:r,difficulty:f}=ii();window.location.href=`${window.location.pathname}?theme=${r}&difficulty=${f}&seed=${l}`})}function se(e,t,a,s){const i=document.createElement("button");i.setAttribute("data-testid",e),i.className=`alibi-home-btn ${t}`;const o=document.createElement("span");o.className="btn-title",o.textContent=a;const l=document.createElement("span");return l.className="btn-desc",l.textContent=s,i.append(o,l),i}const li=`
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
`;let _e=!1;function ri(){if(_e)return;const e=document.createElement("style");e.textContent=li,document.head.appendChild(e),_e=!0}const ci=[{title:"The Coffee Shop",difficulty:"easy",seed:100},{title:"The Bookstore",difficulty:"easy",seed:101},{title:"The Backyard",difficulty:"easy",seed:102},{title:"The Holiday Mall",difficulty:"easy",seed:103},{title:"The Coffee Shop",difficulty:"medium",seed:200},{title:"The Bookstore",difficulty:"medium",seed:201},{title:"The Backyard",difficulty:"medium",seed:202},{title:"The Holiday Mall",difficulty:"medium",seed:203},{title:"The Coffee Shop",difficulty:"hard",seed:300},{title:"The Bookstore",difficulty:"hard",seed:301},{title:"The Backyard",difficulty:"hard",seed:302},{title:"The Holiday Mall",difficulty:"hard",seed:303}];function di(){ri();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-campaign-board"),t.className="alibi-campaign-board";const a=document.createElement("div");a.className="alibi-campaign-header";const s=document.createElement("button");s.className="alibi-campaign-back",s.textContent="← Home",s.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const i=document.createElement("h1");i.textContent="📁 Campaign",a.append(s,i);const o=document.createElement("div");o.className="alibi-case-grid",ci.forEach((l,r)=>{const f=document.createElement("div");f.setAttribute("data-testid",`case-card-${r}`),f.className=`alibi-case-card ${r===0?"unlocked":"locked"}`;const u=document.createElement("div");u.className="alibi-case-num",u.textContent=`Case ${r+1}`;const m=document.createElement("div");m.className="alibi-case-title",m.textContent=r===0?l.title:"???";const p=document.createElement("div");p.className=`alibi-case-difficulty ${l.difficulty}`,p.textContent=l.difficulty.charAt(0).toUpperCase()+l.difficulty.slice(1);const n=document.createElement("div");n.setAttribute("data-testid",`case-status-${r}`),n.className=`alibi-case-status ${r===0?"":"locked"}`,n.textContent=r===0?"📁":"🔒",f.append(u,m,p,n),r===0&&f.addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?theme=coffee-shop&difficulty=${l.difficulty}&seed=${l.seed}`}),o.appendChild(f)}),t.append(a,o),document.body.appendChild(t)}const hi=`
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
`,mi={"coffee-shop":"☕",bookstore:"📚",backyard:"🌿","holiday-mall":"🎄",restaurant:"🍽",gym:"💪",office:"🏢","garden-party":"🌸",hospital:"🏥",carnival:"🎡"};let Ye=!1;function fi(){if(Ye)return;const e=document.createElement("style");e.textContent=hi,document.head.appendChild(e),Ye=!0}function ui(){fi();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-theme-select"),t.className="alibi-theme-select";const a=document.createElement("div");a.className="alibi-theme-select-header";const s=document.createElement("button");s.className="alibi-theme-back",s.textContent="← Home",s.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const i=document.createElement("h1");i.textContent="🎲 Quick Play",a.append(s,i);let o="easy";const l=document.createElement("div");l.className="alibi-difficulty-row";const r={};for(const[n,y]of[["easy","Easy"],["medium","Medium"],["hard","Hard"]]){const c=document.createElement("button");c.setAttribute("data-testid",`difficulty-${n}`),c.className=`alibi-diff-btn ${n}${n==="easy"?" selected":""}`,c.textContent=y,c.addEventListener("click",()=>{o=n,Object.values(r).forEach(d=>d.classList.remove("selected")),c.classList.add("selected")}),r[n]=c,l.appendChild(c)}let f=null;const u=document.createElement("div");u.className="alibi-theme-grid";const m={};for(const n of ra()){if(n.id==="stub")continue;const y=document.createElement("div");y.setAttribute("data-testid",`theme-card-${n.id}`),y.className="alibi-theme-card";const c=document.createElement("div");c.className="alibi-theme-icon",c.textContent=mi[n.id]??"🔍";const d=document.createElement("div");d.textContent=n.name.replace(/^The /,""),y.append(c,d),y.addEventListener("click",()=>{f=n.id,Object.values(m).forEach(b=>b.classList.remove("selected")),y.classList.add("selected"),p.disabled=!1}),m[n.id]=y,u.appendChild(y)}const p=document.createElement("button");p.setAttribute("data-testid","btn-play"),p.className="alibi-play-btn",p.textContent="Play",p.disabled=!0,p.addEventListener("click",()=>{if(!f)return;const n=Math.floor(Math.random()*4294967295);t.remove(),window.location.href=`${window.location.pathname}?theme=${f}&difficulty=${o}&seed=${n}`}),t.append(a,l,u,p),document.body.appendChild(t)}const J=new URLSearchParams(location.search);if(J.has("theme")||J.has("difficulty")||J.has("seed"))qa();else switch(J.get("mode")){case"campaign":di();break;case"quickplay":ui();break;default:si();break}

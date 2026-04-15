var Pe=Object.defineProperty;var Oe=(e,t,a)=>t in e?Pe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var G=(e,t,a)=>Oe(e,typeof t!="symbol"?t+"":t,a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const Me=new Set(["F","C","S","B"]);function N(e){return Me.has(e)}function M(e){return e==="C"||e==="S"||e==="B"}function ee(e){const t=[];for(let a=0;a<e.width;a++)for(let o=0;o<e.height;o++)if(N(e.tiles[o][a])){t.push(a);break}return t}function te(e){const t=[];for(let a=0;a<e.height;a++)for(let o=0;o<e.width;o++)if(N(e.tiles[a][o])){t.push(a);break}return t}function C(e,t,a){for(const o of e.rooms)for(const[n,s]of o.cells)if(n===t&&s===a)return o.id;return null}function We(e){const t=new Set,a=new Set;for(const o of e)t.add(o.y),a.add(o.x);return{blockedRows:t,blockedCols:a}}function Ne(e,t){const{blockedRows:a,blockedCols:o}=We(t),n=[];for(let s=0;s<e.height;s++)if(!a.has(s))for(let i=0;i<e.width;i++)o.has(i)||N(e.tiles[s][i])&&n.push({x:i,y:s});return n.length===1?n[0]:null}function Le(e,t,a){const o=C(e,a.x,a.y);if(o===null)return null;for(const n of t)if(C(e,n.x,n.y)===o)return n.suspectId;return null}function le(e,t,a,o){return Math.max(Math.abs(e-a),Math.abs(t-o))}function Q(e,t,a){const o=a.get(t.suspectId);if(!o)return null;switch(t.type){case"inRoom":return C(e,o.x,o.y)===t.roomId;case"notInRoom":return C(e,o.x,o.y)!==t.roomId;case"inSameRoom":{const n=a.get(t.otherSuspectId);if(!n)return null;const s=C(e,o.x,o.y),i=C(e,n.x,n.y);return s!==null&&s===i}case"inDifferentRoom":{const n=a.get(t.otherSuspectId);if(!n)return null;const s=C(e,o.x,o.y),i=C(e,n.x,n.y);return s===null||i===null?null:s!==i}case"inColumn":return o.x===t.col;case"inRow":return o.y===t.row;case"besideSuspect":{const n=a.get(t.otherSuspectId);return n?le(o.x,o.y,n.x,n.y)<=1:null}case"notBesideSuspect":{const n=a.get(t.otherSuspectId);return n?le(o.x,o.y,n.x,n.y)>1:null}case"besideObject":{for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++){if(s===0&&n===0)continue;const i=o.x+s,l=o.y+n;if(!(i<0||l<0||i>=e.width||l>=e.height)&&e.tiles[l][i]===t.objectTile)return!0}return!1}case"notBesideObject":{for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++){if(s===0&&n===0)continue;const i=o.x+s,l=o.y+n;if(!(i<0||l<0||i>=e.width||l>=e.height)&&e.tiles[l][i]===t.objectTile)return!1}return!0}case"onSeatTile":return M(e.tiles[o.y][o.x]);case"notOnSeatTile":return!M(e.tiles[o.y][o.x]);case"northOf":{const n=a.get(t.otherSuspectId);return n?o.y<n.y:null}case"southOf":{const n=a.get(t.otherSuspectId);return n?o.y>n.y:null}case"exactlyNRowsNorth":{const n=a.get(t.otherSuspectId);return n?n.y-o.y===t.n:null}case"exactlyNRowsSouth":{const n=a.get(t.otherSuspectId);return n?o.y-n.y===t.n:null}}}const Ae={easy:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom"],medium:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile"],hard:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile","notOnSeatTile","northOf","southOf","exactlyNRowsNorth","exactlyNRowsSouth"]};function K(e,t,a){const o=ee(e),n=te(e);if(t.length===0)return{count:0};if(t.length>Math.min(o.length,n.length))return{count:0};const s=new Set;for(let r=0;r<e.height;r++)for(let f=0;f<e.width;f++)N(e.tiles[r][f])&&s.add(`${f},${r}`);let i=0,l;const u=new Map,d=new Set,c=new Set;function m(r){if(i>=2)return;if(r===t.length){for(const p of a)if(Q(e,p,u)!==!0)return;i++,i===1&&(l=new Map(u));return}const f=t[r];for(const p of n)if(!d.has(p))for(const h of o){if(c.has(h)||!s.has(`${h},${p}`))continue;const F={suspectId:f,x:h,y:p};u.set(f,F),d.add(p),c.add(h);let w=!1;for(const $ of a)if(($.suspectId===f||$.otherSuspectId===f)&&Q(e,$,u)===!1){w=!0;break}if(w||m(r+1),u.delete(f),d.delete(p),c.delete(h),i>=2)return}}return m(0),{count:i,firstSolution:l}}class ze extends Error{constructor(t){super(t),this.name="PuzzleGenerationError"}}function He(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let a=Math.imul(t^t>>>15,1|t);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}function je(e,t){return Math.floor(e()*t)}function v(e,t){return t[je(e,t.length)]}function z(e,t){const a=[...t];for(let o=a.length-1;o>0;o--){const n=je(e,o+1);[a[o],a[n]]=[a[n],a[o]]}return a}function Ve(e,t,a,o){const n=Ae[a],s=o.landmarks.length>=2,i=o.tiles.some(c=>c.some(m=>M(m))),l=n.filter(c=>!((c==="besideObject"||c==="notBesideObject")&&!s||(c==="onSeatTile"||c==="notOnSeatTile")&&!i)),u=Math.ceil(t*.4),d=[];for(let c=0;c<t;c++){const m=new Set;d.length>0&&m.add(d[d.length-1]);for(const F of l)d.filter($=>$===F).length>=u&&m.add(F);const r=l.filter(F=>!m.has(F)),f=r.length>0?r:l,p=f.filter(F=>!d.includes(F)),h=p.length>0?p:f;d.push(v(e,h))}return d}function P(e,t,a,o,n,s,i){const l=i.get(n.id),u=a.clueTemplates;switch(o){case"inRoom":{const d=C(t,l.x,l.y);if(!d)return null;const c=t.rooms.find(m=>m.id===d);return{type:"inRoom",suspectId:n.id,roomId:d,text:u.inRoom(n.name,c.name)}}case"notInRoom":{const d=C(t,l.x,l.y),c=t.rooms.filter(r=>r.id!==d);if(c.length===0)return null;const m=v(e,c);return{type:"notInRoom",suspectId:n.id,roomId:m.id,text:u.notInRoom(n.name,m.name)}}case"inSameRoom":{const d=C(t,l.x,l.y);if(!d)return null;const c=s.filter(r=>{if(r.id===n.id)return!1;const f=i.get(r.id);return C(t,f.x,f.y)===d});if(c.length===0)return null;const m=v(e,c);return{type:"inSameRoom",suspectId:n.id,otherSuspectId:m.id,text:u.inSameRoom(n.name,m.name)}}case"inDifferentRoom":{const d=C(t,l.x,l.y),c=s.filter(r=>{if(r.id===n.id)return!1;const f=i.get(r.id),p=C(t,f.x,f.y);return p!==null&&p!==d});if(c.length===0)return null;const m=v(e,c);return{type:"inDifferentRoom",suspectId:n.id,otherSuspectId:m.id,text:u.inDifferentRoom(n.name,m.name)}}case"inColumn":return{type:"inColumn",suspectId:n.id,col:l.x,text:u.inColumn(n.name,l.x+1)};case"inRow":return{type:"inRow",suspectId:n.id,row:l.y,text:u.inRow(n.name,l.y+1)};case"besideSuspect":{const d=s.filter(m=>{if(m.id===n.id)return!1;const r=i.get(m.id);return Math.max(Math.abs(l.x-r.x),Math.abs(l.y-r.y))<=1});if(d.length===0)return null;const c=v(e,d);return{type:"besideSuspect",suspectId:n.id,otherSuspectId:c.id,text:u.besideSuspect(n.name,c.name)}}case"notBesideSuspect":{const d=s.filter(m=>{if(m.id===n.id)return!1;const r=i.get(m.id);return Math.max(Math.abs(l.x-r.x),Math.abs(l.y-r.y))>1});if(d.length===0)return null;const c=v(e,d);return{type:"notBesideSuspect",suspectId:n.id,otherSuspectId:c.id,text:u.notBesideSuspect(n.name,c.name)}}case"besideObject":{if(t.landmarks.length===0)return null;const d=t.landmarks.filter(r=>Math.max(Math.abs(l.x-r.x),Math.abs(l.y-r.y))<=1);if(d.length===0)return null;const c=v(e,d),m=t.tiles[c.y][c.x];return{type:"besideObject",suspectId:n.id,objectTile:m,text:u.besideObject(n.name,c.name)}}case"notBesideObject":{if(t.landmarks.length===0)return null;const d=t.landmarks.filter(r=>Math.max(Math.abs(l.x-r.x),Math.abs(l.y-r.y))>1);if(d.length===0)return null;const c=v(e,d),m=t.tiles[c.y][c.x];return{type:"notBesideObject",suspectId:n.id,objectTile:m,text:u.notBesideObject(n.name,c.name)}}case"onSeatTile":{const d=t.tiles[l.y][l.x];if(!M(d))return null;const c=d==="C"?"chair":d==="S"?"sofa":"bed";return{type:"onSeatTile",suspectId:n.id,text:u.onSeatTile(n.name,c)}}case"notOnSeatTile":{const d=t.tiles[l.y][l.x];return M(d)?null:{type:"notOnSeatTile",suspectId:n.id,text:u.notOnSeatTile(n.name)}}case"northOf":{const d=s.filter(m=>{if(m.id===n.id)return!1;const r=i.get(m.id);return l.y<r.y});if(d.length===0)return null;const c=v(e,d);return{type:"northOf",suspectId:n.id,otherSuspectId:c.id,text:u.northOf(n.name,c.name)}}case"southOf":{const d=s.filter(m=>{if(m.id===n.id)return!1;const r=i.get(m.id);return l.y>r.y});if(d.length===0)return null;const c=v(e,d);return{type:"southOf",suspectId:n.id,otherSuspectId:c.id,text:u.southOf(n.name,c.name)}}case"exactlyNRowsNorth":{const d=[];for(const m of s){if(m.id===n.id)continue;const f=i.get(m.id).y-l.y;f>0&&d.push({suspect:m,n:f})}if(d.length===0)return null;const c=v(e,d);return{type:"exactlyNRowsNorth",suspectId:n.id,otherSuspectId:c.suspect.id,n:c.n,text:u.exactlyNRowsNorth(n.name,c.suspect.name,c.n)}}case"exactlyNRowsSouth":{const d=[];for(const m of s){if(m.id===n.id)continue;const r=i.get(m.id),f=l.y-r.y;f>0&&d.push({suspect:m,n:f})}if(d.length===0)return null;const c=v(e,d);return{type:"exactlyNRowsSouth",suspectId:n.id,otherSuspectId:c.suspect.id,n:c.n,text:u.exactlyNRowsSouth(n.name,c.suspect.name,c.n)}}}}function De(e,t,a,o=1e3){const n=z(e,ee(t)),s=z(e,te(t)),i=a.length;if(i<1||i>Math.min(n.length,s.length))return null;let l=0;const u=new Map,d=new Set,c=new Set,m=z(e,s).slice(0,i);function r(f){if(f===i)return!0;const p=a[f],h=m[f],F=z(e,n);for(const w of F)if(!c.has(w)&&N(t.tiles[h]?.[w])){if(u.set(p.id,{suspectId:p.id,x:w,y:h}),d.add(h),c.add(w),r(f+1))return!0;if(l++,u.delete(p.id),d.delete(h),c.delete(w),l>=o)return!1}return!1}return r(0)?u:null}function _e(e,t,a){for(let n=0;n<20;n++){const s=e+n*97>>>0,i=He(s),l=t.floorPlans[a],u=ee(l),d=te(l),c=Math.min(u.length,d.length)-1;if(c<2)continue;const r=t.suspectNames.slice(0,c).map((y,k)=>({id:`s${k}`,name:y})),f=v(i,t.victimNames),p=De(i,l,r);if(!p)continue;const h=Array.from(p.values()),F=Ne(l,h);if(!F)continue;const w=Le(l,h,F);if(!w)continue;const $=r.find(y=>y.id===w),j=v(i,t.narrativeTemplates.intro),B=v(i,t.narrativeTemplates.victimFound),L=v(i,t.narrativeTemplates.guiltyText).replace("{{killerName}}",$.name).replace("{{evidenceText}}","the evidence is conclusive"),A=Ve(i,c,a,l),R=[];for(let y=0;y<c;y++){const k=r[y],x=A[y];let T=P(i,l,t,x,k,r,p);T||(T=P(i,l,t,"inRow",k,r,p)),T||(T=P(i,l,t,"inColumn",k,r,p)),T&&R.push(T)}let S=K(l,r.map(y=>y.id),R);if(S.count!==0){if(S.count!==1)for(const y of r){if(S.count===1)break;if(!R.some(x=>x.type==="inRow"&&x.suspectId===y.id)){const x=P(i,l,t,"inRow",y,r,p);x&&R.push(x),S=K(l,r.map(T=>T.id),R)}}if(S.count!==1)for(const y of r){if(S.count===1)break;if(!R.some(x=>x.type==="inColumn"&&x.suspectId===y.id)){const x=P(i,l,t,"inColumn",y,r,p);x&&R.push(x),S=K(l,r.map(T=>T.id),R)}}if(S.count===1)return{seed:s,themeId:t.id,difficulty:a,suspects:r,victimName:f,clues:R,solution:p,victimCell:F,killer:$,narrativeIntro:j,narrativeVictimFound:B,narrativeGuilty:L,floorPlan:l}}}throw new ze(`Failed to generate unique puzzle after 20 retries (seed=${e}, theme=${t.id}, difficulty=${a})`)}const Ye={width:5,height:6,tiles:[["bB","bB","bB","W","W"],["F","F","F","C","F"],["pL","F","C","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"],["W","cR","W","F","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[3,1],[4,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"restroom",name:"Restroom",cells:[[1,5],[3,5],[4,5]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-entrance",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},Ge={width:6,height:7,tiles:[["bB","bB","bB","bB","W","W"],["F","F","F","F","C","F"],["pL","F","C","F","F","F"],["F","S","F","pL","F","C"],["F","F","tB","F","F","F"],["C","F","F","F","W","F"],["W","cR","W","W","W","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5]]},{id:"restroom",name:"Restroom",cells:[[1,6],[5,5],[5,6]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-door",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:3,y:3},{id:"table",name:"the table",x:2,y:4},{id:"cash-register",name:"the cash register",x:1,y:6}]},Ke={width:7,height:8,tiles:[["bB","bB","bB","bB","bB","W","W"],["F","F","F","F","F","C","F"],["F","C","F","pL","F","F","F"],["pL","F","S","F","C","F","pL"],["F","F","F","tB","F","F","F"],["F","C","F","F","F","tB","C"],["F","F","F","F","F","W","F"],["W","cR","W","F","C","W","F"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]]},{id:"main-area",name:"Main Area",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[6,6]]},{id:"restroom",name:"Restroom",cells:[[1,7]]},{id:"back-office",name:"Back Office",cells:[[3,7],[4,7],[6,7]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-1",name:"the plant",x:3,y:2},{id:"plant-2",name:"the plant",x:0,y:3},{id:"plant-3",name:"the plant",x:6,y:3},{id:"table",name:"the table",x:3,y:4},{id:"table-2",name:"the small table",x:5,y:5},{id:"cash-register",name:"the cash register",x:1,y:7}]},qe={width:5,height:5,tiles:[["sH","F","W","sH","sH"],["F","F","W","F","F"],["sH","F","tB","F","sH"],["F","F","F","F","F"],["F","cR","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[2,3]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,3],[4,3]]},{id:"checkout",name:"Checkout",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:3,y:0},{id:"shelf-3",name:"the shelf",x:4,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:4,y:2},{id:"table",name:"the table",x:2,y:2},{id:"cash-register",name:"the cash register",x:1,y:4}]},Ue={width:6,height:6,tiles:[["sH","F","W","W","sH","sH"],["F","F","W","F","F","F"],["sH","F","F","F","F","sH"],["F","F","W","F","tB","F"],["F","F","F","F","F","F"],["F","cR","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,2],[3,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,1],[4,1],[5,1],[3,2],[4,2],[5,2],[4,3],[5,3]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,4],[4,4],[5,4]]},{id:"checkout",name:"Checkout",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:4,y:0},{id:"shelf-3",name:"the shelf",x:5,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:5,y:2},{id:"table",name:"the table",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},Ze={width:7,height:7,tiles:[["sH","F","F","W","sH","sH","sH"],["F","F","sH","W","F","F","F"],["sH","F","F","tB","F","F","sH"],["F","F","W","W","F","tB","F"],["sH","F","F","F","F","F","F"],["F","F","F","F","F","F","sH"],["F","cR","C","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,1],[3,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"romance-novels",name:"Romance Novels",cells:[[4,3],[5,3],[6,3],[3,4],[4,4],[5,4],[6,4],[3,5],[4,5],[5,5]]},{id:"collectors",name:"Collector's Corner",cells:[[6,5]]},{id:"checkout",name:"Checkout",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"shelf-crime",name:"the shelf",x:0,y:0},{id:"shelf-nonfic-1",name:"the shelf",x:4,y:0},{id:"shelf-nonfic-2",name:"the shelf",x:5,y:0},{id:"shelf-nonfic-3",name:"the shelf",x:6,y:0},{id:"shelf-crime-2",name:"the shelf",x:0,y:2},{id:"shelf-nonfic-4",name:"the shelf",x:6,y:2},{id:"table-1",name:"the reading table",x:3,y:2},{id:"table-2",name:"the table",x:5,y:3},{id:"shelf-best",name:"the shelf",x:0,y:4},{id:"shelf-collect",name:"the shelf",x:6,y:5},{id:"cash-register",name:"the cash register",x:1,y:6}]},Je={width:5,height:5,tiles:[["pL","F","W","jZ","jZ"],["F","F","W","jZ","C"],["pL","F","F","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[3,0],[4,0],[3,1],[4,1]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:0,y:2},{id:"plant-3",name:"the plant",x:4,y:3},{id:"jacuzzi",name:"the jacuzzi",x:3,y:0}]},Xe={width:6,height:7,tiles:[["pL","F","F","W","jZ","jZ"],["F","F","F","W","jZ","C"],["F","pL","F","F","F","F"],["W","W","W","W","W","W"],["B","F","F","S","F","F"],["F","F","tV","F","F","F"],["F","F","W","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[4,0],[5,0],[4,1],[5,1]]},{id:"deck",name:"Deck",cells:[[3,2],[4,2],[5,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:1,y:2},{id:"jacuzzi",name:"the jacuzzi",x:4,y:0},{id:"tv",name:"the TV",x:2,y:5}]},Qe={width:7,height:8,tiles:[["pL","F","F","F","W","jZ","jZ"],["F","F","pL","F","W","jZ","C"],["F","F","F","F","F","C","F"],["W","W","W","W","W","W","W"],["B","F","F","S","F","F","W"],["F","F","tV","F","F","pL","W"],["W","W","W","cT","F","F","W"],["W","W","F","F","F","W","W"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[5,0],[6,0],[5,1],[6,1]]},{id:"deck",name:"Deck",cells:[[4,2],[5,2],[6,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5]]},{id:"kitchen",name:"Kitchen",cells:[[3,6],[4,6],[5,6],[2,7],[3,7],[4,7]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:2,y:1},{id:"plant-3",name:"the plant",x:5,y:5},{id:"jacuzzi",name:"the jacuzzi",x:5,y:0},{id:"tv",name:"the TV",x:2,y:5},{id:"counter",name:"the counter",x:3,y:6}]},et={width:5,height:6,tiles:[["sT","F","F","F","sT"],["F","F","W","F","F"],["F","F","F","F","F"],["tD","F","F","F","sH"],["F","C","F","F","F"],["F","F","W","cR","F"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1]]},{id:"santas-village",name:"Santa's Village",cells:[[2,0],[3,0],[3,1],[0,3],[1,3],[2,3],[0,4],[1,4],[2,4]]},{id:"toy-store",name:"Toy Store",cells:[[4,0],[4,1]]},{id:"walkway",name:"Walkway",cells:[[0,2],[1,2],[2,2],[3,2],[4,2]]},{id:"bookstore",name:"Bookstore",cells:[[3,3],[4,3],[3,4],[4,4]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[0,5],[1,5],[3,5],[4,5]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:4,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:3},{id:"shelf",name:"the shelf",x:4,y:3},{id:"cash-register",name:"the cash register",x:3,y:5}]},tt={width:7,height:7,tiles:[["sT","F","F","W","F","F","sT"],["F","F","W","F","F","F","F"],["F","F","F","F","F","W","F"],["F","F","F","F","F","F","F"],["tD","F","F","W","F","sH","F"],["F","C","F","W","F","F","C"],["F","F","W","F","cR","F","F"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"santas-village",name:"Santa's Village",cells:[[3,1],[4,1],[5,1],[6,1],[3,2],[4,2],[5,2]]},{id:"santas-lodge",name:"Santa's Lodge",cells:[[4,0],[5,0],[6,0]]},{id:"toy-store",name:"Toy Store",cells:[[6,2],[5,3],[6,3],[4,4],[5,4],[6,4],[5,5],[6,5]]},{id:"walkway",name:"Walkway",cells:[[0,3],[1,3],[2,3],[3,3],[4,3]]},{id:"food-court",name:"Food Court",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[0,6],[1,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:6,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:4},{id:"shelf",name:"the shelf",x:5,y:4},{id:"cash-register",name:"the cash register",x:4,y:6}]},at={width:8,height:8,tiles:[["sT","F","F","W","F","F","F","sT"],["F","F","W","F","F","F","F","F"],["F","F","F","F","F","W","F","F"],["F","F","F","F","F","F","F","F"],["tD","F","F","W","F","sH","F","F"],["F","C","F","W","F","F","C","F"],["F","F","W","F","cR","F","F","F"],["F","F","F","F","F","F","F","tR"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[0,3],[1,3]]},{id:"santas-lodge",name:"Santa's Lodge",cells:[[4,0],[5,0],[6,0],[7,0],[4,1],[5,1],[6,1],[7,1]]},{id:"santas-village",name:"Santa's Village",cells:[[3,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]]},{id:"toy-store",name:"Toy Store",cells:[[6,2],[7,2],[6,3],[7,3],[6,4],[7,4],[6,5],[7,5]]},{id:"walkway",name:"Walkway",cells:[[2,2],[2,3],[2,4],[3,4],[4,4],[2,5],[2,6]]},{id:"food-court",name:"Food Court",cells:[[0,4],[1,4],[0,5],[1,5],[0,6],[1,6],[0,7],[1,7],[2,7]]},{id:"bookstore",name:"Bookstore",cells:[[5,4],[5,5],[4,6],[5,6],[6,6],[7,6]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[3,6],[3,7],[4,7],[5,7],[6,7],[7,7]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:7,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:4},{id:"shelf",name:"the shelf",x:5,y:4},{id:"cash-register",name:"the cash register",x:4,y:6},{id:"tree",name:"the Christmas tree",x:7,y:7}]},nt={width:5,height:5,tiles:[["cT","cT","W","F","C"],["F","F","W","F","F"],["F","C","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"dining-room",name:"Dining Room",cells:[[3,0],[4,0],[3,1],[4,1],[2,2],[3,2],[4,2]]},{id:"bar",name:"Bar",cells:[[2,1]]},{id:"restroom",name:"Restroom",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0}]},ot={width:6,height:6,tiles:[["cT","cT","cT","W","F","C"],["F","F","F","W","F","F"],["F","C","F","F","F","F"],["F","F","F","F","C","F"],["W","W","W","W","W","W"],["F","F","F","C","F","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},{id:"dining-room",name:"Dining Room",cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]]},{id:"bar",name:"Bar",cells:[[3,1]]},{id:"private-room",name:"Private Room",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0},{id:"counter-3",name:"the counter",x:2,y:0}]},it={width:7,height:7,tiles:[["cT","cT","cT","cT","W","F","C"],["F","F","F","F","W","F","F"],["F","C","F","F","F","F","F"],["F","F","F","F","C","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","C","F","F","C","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"dining-room",name:"Dining Room",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3],[4,4],[5,4],[6,4]]},{id:"bar",name:"Bar",cells:[[4,1],[0,4],[1,4],[2,4],[3,4]]},{id:"restroom",name:"Restroom",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0},{id:"counter-3",name:"the counter",x:2,y:0},{id:"counter-4",name:"the counter",x:3,y:0}]},st={width:5,height:5,tiles:[["wT","F","W","tM","tM"],["F","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"cardio",name:"Cardio",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"weight-rack",name:"the weight rack",x:0,y:0},{id:"treadmill-1",name:"the treadmill",x:3,y:0},{id:"treadmill-2",name:"the treadmill",x:4,y:0}]},rt={width:6,height:7,tiles:[["wT","F","W","tM","tM","F"],["F","F","W","F","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","jZ","jZ"],["F","C","F","F","jZ","C"],["F","F","W","F","F","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"cardio",name:"Cardio",cells:[[3,0],[4,0],[5,0],[3,1],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"pool",name:"Pool",cells:[[4,4],[5,4],[4,5],[5,5]]},{id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[0,5],[1,5],[2,5],[3,5]]},{id:"sauna",name:"Sauna",cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]}],landmarks:[{id:"weight-rack",name:"the weight rack",x:0,y:0},{id:"treadmill-1",name:"the treadmill",x:3,y:0},{id:"treadmill-2",name:"the treadmill",x:4,y:0},{id:"pool",name:"the pool",x:4,y:4}]},lt={width:7,height:8,tiles:[["wT","wT","F","W","tM","tM","F"],["F","F","F","W","F","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","jZ","jZ","jZ"],["F","C","F","F","jZ","C","jZ"],["F","F","W","F","F","F","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},{id:"cardio",name:"Cardio",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"studio",name:"Studio",cells:[[3,2],[3,3]]},{id:"pool",name:"Pool",cells:[[4,5],[5,5],[6,5],[4,6],[5,6],[6,6]]},{id:"locker-room",name:"Locker Room",cells:[[0,5],[1,5],[2,5],[3,5],[0,6],[1,6],[2,6],[3,6]]},{id:"sauna",name:"Sauna",cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"weight-rack-1",name:"the weight rack",x:0,y:0},{id:"weight-rack-2",name:"the weight rack",x:1,y:0},{id:"treadmill-1",name:"the treadmill",x:4,y:0},{id:"treadmill-2",name:"the treadmill",x:5,y:0},{id:"pool",name:"the pool",x:4,y:5}]},ct={width:5,height:5,tiles:[["dK","F","W","F","C"],["F","F","W","F","F"],["F","C","F","F","F"],["W","W","W","W","W"],["F","F","pC","F","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"meeting-room",name:"Meeting Room",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"kitchen",name:"Kitchen",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"desk",name:"the desk",x:0,y:0},{id:"photocopier",name:"the photocopier",x:2,y:4}]},dt={width:6,height:6,tiles:[["dK","F","F","W","F","C"],["F","F","F","W","F","F"],["F","C","F","F","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","pC","F","F","C","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},{id:"meeting-room",name:"Meeting Room",cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"reception",name:"Reception",cells:[[3,1]]},{id:"kitchen",name:"Kitchen",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"desk",name:"the desk",x:0,y:0},{id:"photocopier",name:"the photocopier",x:1,y:5}]},mt={width:7,height:7,tiles:[["dK","F","F","F","W","F","C"],["F","F","F","F","W","F","F"],["F","C","F","F","F","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","dK","F"],["W","W","W","W","W","W","W"],["F","pC","F","F","C","F","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3],[0,4],[1,4],[2,4],[3,4]]},{id:"meeting-room",name:"Meeting Room",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"server-room",name:"Server Room",cells:[[4,4],[5,4],[6,4]]},{id:"kitchen",name:"Kitchen",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"desk-1",name:"the desk",x:0,y:0},{id:"desk-2",name:"the manager's desk",x:5,y:4},{id:"photocopier",name:"the photocopier",x:1,y:6}]},ht={width:5,height:5,tiles:[["fB","F","F","F","fB"],["F","F","F","F","F"],["pL","F","C","F","pL"],["F","F","F","F","F"],["F","F","fB","F","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[0,2],[1,2],[2,2],[3,2],[4,2]]},{id:"gazebo",name:"Gazebo",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:4,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:4,y:2},{id:"flower-bed-3",name:"the flower bed",x:2,y:4}]},ut={width:6,height:6,tiles:[["fB","F","F","F","F","fB"],["F","F","F","F","F","F"],["pL","F","C","F","C","pL"],["F","F","F","F","F","F"],["F","F","jZ","jZ","F","F"],["F","F","jZ","jZ","fB","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]]},{id:"gazebo",name:"Gazebo",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},{id:"pool-area",name:"Pool Area",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:5,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:5,y:2},{id:"pool",name:"the pool",x:2,y:4},{id:"flower-bed-3",name:"the flower bed",x:4,y:5}]},ft={width:7,height:8,tiles:[["fB","F","F","F","F","F","fB"],["F","F","F","F","F","F","F"],["pL","F","C","F","C","F","pL"],["F","F","F","F","F","F","F"],["F","F","jZ","jZ","jZ","F","F"],["F","F","jZ","jZ","jZ","fB","F"],["fB","F","F","W","F","F","fB"],["F","F","F","W","F","F","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3]]},{id:"pool-area",name:"Pool Area",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5]]},{id:"greenhouse",name:"Greenhouse",cells:[[0,6],[1,6],[2,6],[0,7],[1,7],[2,7]]},{id:"garage",name:"Garage",cells:[[4,6],[5,6],[6,6],[4,7],[5,7],[6,7]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:6,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:6,y:2},{id:"pool",name:"the pool",x:2,y:4},{id:"flower-bed-3",name:"the flower bed",x:5,y:5},{id:"flower-bed-4",name:"the flower bed",x:0,y:6},{id:"flower-bed-5",name:"the flower bed",x:6,y:6}]},pt={width:5,height:5,tiles:[["hB","F","W","F","C"],["hB","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","mC","F","C","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"waiting-room",name:"Waiting Room",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:1,y:4}]},bt={width:6,height:7,tiles:[["hB","F","F","W","F","C"],["hB","F","F","W","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","mC","F"],["F","C","F","F","F","F"],["F","F","W","F","C","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]]},{id:"operating-theatre",name:"Operating Theatre",cells:[[4,0],[5,0],[4,1],[5,1]]},{id:"waiting-room",name:"Waiting Room",cells:[[3,1]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]},{id:"cafeteria",name:"Cafeteria",cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:4,y:4}]},yt={width:7,height:8,tiles:[["hB","F","F","F","W","F","C"],["hB","hB","F","F","W","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","mC","F","F"],["F","C","F","F","F","F","C"],["F","F","W","F","C","F","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"operating-theatre",name:"Operating Theatre",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"waiting-room",name:"Waiting Room",cells:[[4,1]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]},{id:"cafeteria",name:"Cafeteria",cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"hospital-bed-3",name:"the hospital bed",x:1,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:4,y:5}]},Ft={width:5,height:5,tiles:[["cH","F","W","sT","sT"],["cH","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"food-stands",name:"Food Stands",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"ticket-booth",name:"Ticket Booth",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"stall-1",name:"the stall",x:3,y:0},{id:"stall-2",name:"the stall",x:4,y:0}]},gt={width:6,height:7,tiles:[["cH","F","F","W","sT","sT"],["cH","F","F","W","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","F","F"],["F","C","F","F","C","F"],["F","F","W","F","F","F"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,2]]},{id:"food-stands",name:"Food Stands",cells:[[4,0],[5,0],[4,1],[5,1],[4,2],[5,2]]},{id:"funhouse",name:"Funhouse",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},{id:"ticket-booth",name:"Ticket Booth",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"stall-1",name:"the stall",x:4,y:0},{id:"stall-2",name:"the stall",x:5,y:0}]},wt={width:7,height:8,tiles:[["cH","F","F","F","W","sT","sT"],["cH","cH","F","F","W","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","F","F","F"],["F","C","F","F","C","F","F"],["F","F","W","F","F","F","C"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"food-stands",name:"Food Stands",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"funhouse",name:"Funhouse",cells:[[0,5],[1,5],[2,5],[0,6],[1,6],[2,6],[0,7],[1,7]]},{id:"backstage",name:"Backstage",cells:[[3,5],[4,5],[5,5],[6,5],[3,6],[4,6],[5,6],[6,6],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"carousel-horse-3",name:"the carousel horse",x:1,y:1},{id:"stall-1",name:"the stall",x:5,y:0},{id:"stall-2",name:"the stall",x:6,y:0}]},g={"coffee-shop":{easy:Ye,medium:Ge,hard:Ke},bookstore:{easy:qe,medium:Ue,hard:Ze},backyard:{easy:Je,medium:Xe,hard:Qe},"holiday-mall":{easy:et,medium:tt,hard:at},restaurant:{easy:nt,medium:ot,hard:it},gym:{easy:st,medium:rt,hard:lt},office:{easy:ct,medium:dt,hard:mt},"garden-party":{easy:ht,medium:ut,hard:ft},hospital:{easy:pt,medium:bt,hard:yt},carnival:{easy:Ft,medium:gt,hard:wt}};function ce(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const xt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the café.`,inColumn:(e,t)=>`${e} was in the ${ce(t)} column.`,inRow:(e,t)=>`${e} was in the ${ce(t)} row.`,besideSuspect:(e,t)=>`${e} was standing next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>t==="chair"?`${e} was sitting in a chair.`:t==="sofa"?`${e} was on the sofa.`:`${e} was on the ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},$t={id:"coffee-shop",name:"The Coffee Shop",floorPlans:{easy:g["coffee-shop"].easy,medium:g["coffee-shop"].medium,hard:g["coffee-shop"].hard},suspectNames:["Alice","Ben","Chloe","Diego","Elena","Finlay","Grace","Hassan","Iris","Jake","Kai","Lena"],victimNames:["Victor","Violet","Vera","Valencia","Vance","Vivian"],clueTemplates:xt,narrativeTemplates:{intro:["A body has been found at the Copper Bean Café. The morning rush never arrived — instead, the regulars found yellow tape across the door. You pour yourself an espresso and get to work.","The Copper Bean Café is closed for a very different reason today. Someone is dead, and the witnesses are all still clutching their lattes. You take out your notebook.","It was supposed to be a quiet Tuesday at the Copper Bean. Then the screaming started. Now it's your problem. You order a black coffee and begin."],victimFound:["The victim was discovered near table four, cold cup of coffee still in hand.","Staff found the victim behind the counter during the morning prep.","A regular spotted the victim slumped in the corner booth before opening."],guiltyText:["{{killerName}} — served with a side of motive.","{{killerName}} — the evidence is as clear as an Americano.","{{killerName}} — there's no running from the detective on this one."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:plant":"","object:cash-register":"","object:table":""}};function de(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const vt={inRoom:(e,t)=>`${e} was browsing in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same section as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different sections.`,inColumn:(e,t)=>`${e} was in the ${de(t)} column.`,inRow:(e,t)=>`${e} was in the ${de(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was standing near ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="chair"?`${e} was sitting in a reading chair.`:`${e} was sitting on the ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},kt={id:"bookstore",name:"The Bookstore",floorPlans:{easy:g.bookstore.easy,medium:g.bookstore.medium,hard:g.bookstore.hard},suspectNames:["Alex","Bridget","Colin","Diana","Edmund","Fiona","George","Hannah","Ivan","Julia","Kevin","Lydia"],victimNames:["Vincent","Valerie","Violet","Victor","Vera","Valencia"],clueTemplates:vt,narrativeTemplates:{intro:["The First Chapter Bookshop opened this morning to find more than just dust between the shelves. Someone is dead, and the regulars are still clutching their Earl Grey. You step over the crime scene tape and start asking questions.","A reader never returns a book. This one never returned at all. The First Chapter Bookshop is closed indefinitely — and you're the reason it might reopen. Notebook out.","Mondays at the bookshop are quiet. This Monday is the quietest it's ever been. The body was found in the stacks before the first customer arrived. You're on the case."],victimFound:["The victim was discovered slumped against the shelf in the early morning.","A shop assistant found the victim face-down near the reading table.","The victim was found between the shelves before opening time."],guiltyText:["{{killerName}} — the ending nobody saw coming.","{{killerName}} — the plot twist is on the last page.","{{killerName}} — even mysteries have their answers."]},colorPalette:{floor:"#f0ead6",wall:"#3d2b1f",seat:"#7a5c3a",accent:"#8b1a1a",background:"#1a1510",text:"#ffffff"},spriteMap:{"object:shelf":"","object:table":"","object:cash-register":""}};function me(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Ct={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the yard.`,inColumn:(e,t)=>`${e} was in the ${me(t)} column.`,inRow:(e,t)=>`${e} was in the ${me(t)} row.`,besideSuspect:(e,t)=>`${e} was right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="sofa"?`${e} was on the outdoor sofa.`:t==="bed"?`${e} was in the bedroom.`:`${e} was sitting in a chair.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},St={id:"backyard",name:"The Backyard",floorPlans:{easy:g.backyard.easy,medium:g.backyard.medium,hard:g.backyard.hard},suspectNames:["Aaron","Becca","Chad","Donna","Eric","Fran","Greg","Helen","Ian","Jess","Kurt","Lisa"],victimNames:["Victor","Vanessa","Vince","Vera","Valentina","Virgil"],clueTemplates:Ct,narrativeTemplates:{intro:["The Hendersons were supposed to be hosting a barbecue. Instead, they're hosting a detective. Someone is dead in the backyard and the potato salad is getting warm. You flash your badge.","Summer parties end in hangovers, not homicides. Usually. The backyard of 14 Maple Drive is now a crime scene and you're the one who has to ruin everyone's weekend.","It was a perfect Sunday afternoon until it wasn't. The body was found near the jacuzzi before anyone noticed their drink had gone untouched. You arrive with your notepad."],victimFound:["The victim was found floating face-down near the jacuzzi.","A guest discovered the victim collapsed on the deck.","The victim was found on the grass between the patio chairs."],guiltyText:["{{killerName}} — summer is ruined.","{{killerName}} — the neighborhood will never be the same.","{{killerName}} — nobody escapes the backyard detective."]},colorPalette:{floor:"#d4e8c2",wall:"#5d4037",seat:"#8d6e63",accent:"#e64a19",background:"#1a200f",text:"#ffffff"},spriteMap:{"object:plant":"","object:jacuzzi-tile":"","object:tv":"","object:sofa":""}};function he(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Tt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was shopping in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the mall.`,inColumn:(e,t)=>`${e} was in the ${he(t)} column.`,inRow:(e,t)=>`${e} was in the ${he(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting${t==="chair"?"":" on a "+t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Rt={id:"holiday-mall",name:"The Holiday Mall",floorPlans:{easy:g["holiday-mall"].easy,medium:g["holiday-mall"].medium,hard:g["holiday-mall"].hard},suspectNames:["Ashley","Brett","Cameron","Denise","Eli","Felicia","Grant","Holly","Irving","Jade","Kyle","Leighton"],victimNames:["Victor","Vivian","Vera","Valencia","Vince","Velma"],clueTemplates:Tt,narrativeTemplates:{intro:["The North Pole Mall was supposed to close early for the holiday rush. Instead, it's closed indefinitely. The security cameras caught everything except whoever did this. You wade through the tinsel.","Christmas shopping season. The most wonderful time of year — unless you're the one who ends up under the tree with a chalk outline. You badge your way in through the entrance.","The last thing anyone expects on December 23rd is a murder at the mall. The second-to-last thing is the detective they send. Here you are anyway."],victimFound:["The victim was discovered near the gift-wrapping station before the mall opened.","Security found the victim in the walkway between the stalls.","A store manager found the victim near the Christmas tree display."],guiltyText:["{{killerName}} — some gifts aren't worth giving.","{{killerName}} — unwrapped at last.","{{killerName}} — the season's greetings end here."]},colorPalette:{floor:"#e8e0d0",wall:"#2c3e50",seat:"#7f8c8d",accent:"#c0392b",background:"#0d1117",text:"#ffffff"},spriteMap:{"object:stall":"","object:shelf":"","object:cash-register":"","object:tree":"","object:teddy-bear":""}};function ue(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Et={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was dining in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the restaurant.`,inColumn:(e,t)=>`${e} was in the ${ue(t)} column.`,inRow:(e,t)=>`${e} was in the ${ue(t)} row.`,besideSuspect:(e,t)=>`${e} was seated right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="sofa"?`${e} was on the banquette seating.`:`${e} was sitting at a table.`,notOnSeatTile:e=>`${e} was not seated.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Wt={id:"restaurant",name:"The Restaurant",floorPlans:{easy:g.restaurant.easy,medium:g.restaurant.medium,hard:g.restaurant.hard},suspectNames:["Andre","Bianca","Carlo","Delphine","Emilio","Francoise","Gerard","Helena","Ignacio","Josephine","Kristoffer","Loretta"],victimNames:["Victor","Violette","Vincenzo","Vera","Valeria","Vidal"],clueTemplates:Et,narrativeTemplates:{intro:["La Maison Rouge was fully booked for a private function. It's now fully booked by the police. Someone didn't make it to dessert — and you're the unwanted amuse-bouche.","The head chef found the body before the morning prep. The restaurant is closed, the reservations are cancelled, and the chef is refusing to speak without a lawyer. You order espresso.","Five-star dining. One-star outcome. The Michelin inspector will not be pleased. Neither will whoever left the body in the private dining room."],victimFound:["The victim was found slumped in the private dining room.","Kitchen staff discovered the victim near the counter.","The sommelier found the victim in the dining room early in the morning."],guiltyText:["{{killerName}} — an amuse-bouche of justice.","{{killerName}} — the bill has arrived.","{{killerName}} — this dish is best served cold."]},colorPalette:{floor:"#f5e8d0",wall:"#3b1f1f",seat:"#8b1a1a",accent:"#c0392b",background:"#180a0a",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:counter":"","object:table":"","object:plant":""}};function fe(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Nt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were training in different zones.`,inColumn:(e,t)=>`${e} was in the ${fe(t)} column.`,inRow:(e,t)=>`${e} was in the ${fe(t)} row.`,besideSuspect:(e,t)=>`${e} was working out right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting on a bench.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},jt={id:"gym",name:"The Gym",floorPlans:{easy:g.gym.easy,medium:g.gym.medium,hard:g.gym.hard},suspectNames:["Atlas","Blair","Corey","Dakota","Evander","Fitz","Gabe","Hunter","Indira","Jordan","Knox","Leila"],victimNames:["Vance","Valentina","Viktor","Vera","Vito","Vesper"],clueTemplates:Nt,narrativeTemplates:{intro:["FitLife Gym opens at 5am. This morning it opened to a body near the weight rack. The morning regulars are sweating for a different reason now.","Somebody skipped leg day — and left somebody else skipping all days. The body was found in the Weights area. You badge through the turnstile.","The gym is 24 hours. The victim wasn't. You arrive with your notepad and a distinct lack of enthusiasm for the treadmill."],victimFound:["The victim was found near the weight rack before the early shift.","A trainer discovered the victim collapsed in the cardio area.","The victim was found in the pool area during the morning check."],guiltyText:["{{killerName}} — no amount of cardio outpaces the truth.","{{killerName}} — their reps are done.","{{killerName}} — spotting the killer was the easy part."]},colorPalette:{floor:"#e8e0d8",wall:"#2c3e50",seat:"#7f8c8d",accent:"#e74c3c",background:"#0d1117",text:"#ffffff"},spriteMap:{"object:weight-rack":"","object:treadmill":"","object:counter":"","object:jacuzzi-tile":""}};function pe(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Bt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was working in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the office.`,inColumn:(e,t)=>`${e} was in the ${pe(t)} column.`,inRow:(e,t)=>`${e} was in the ${pe(t)} row.`,besideSuspect:(e,t)=>`${e} was working right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting at their desk.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},It={id:"office",name:"The Office",floorPlans:{easy:g.office.easy,medium:g.office.medium,hard:g.office.hard},suspectNames:["Adrian","Brooke","Clive","Daria","Edwin","Fiona","Graham","Harriet","Isaac","Judith","Kieran","Laura"],victimNames:["Vincent","Veronica","Vance","Vivienne","Victor","Velvet"],clueTemplates:Bt,narrativeTemplates:{intro:["Meridian Corp. Floor 12. The quarterly review meeting has been cancelled for the most permanent possible reason. You badge in and start asking questions before the lawyers arrive.","The victim was found at their desk. The access log shows they never left last night. Whoever did this knew the building. You start with the people who knew it best.","It was supposed to be a normal Monday. Then the HR department filed the wrong kind of incident report. You turn off your phone's out-of-office message and get to work."],victimFound:["The victim was found at their desk during the morning security check.","The building manager found the victim in the Meeting Room after the overnight shift.","A colleague discovered the victim in the Server Room at 7am."],guiltyText:["{{killerName}} — the performance review was terminal.","{{killerName}} — this one won't go in the quarterly report.","{{killerName}} — consider this case closed."]},colorPalette:{floor:"#e8e8f0",wall:"#34495e",seat:"#7f8c8d",accent:"#2980b9",background:"#0a0a14",text:"#ffffff"},spriteMap:{"object:desk":"","object:photocopier":"","object:tv":"","object:plant":""}};function be(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Pt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the garden.`,inColumn:(e,t)=>`${e} was in the ${be(t)} column.`,inRow:(e,t)=>`${e} was in the ${be(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was sitting on a garden chair.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Ot={id:"garden-party",name:"The Garden Party",floorPlans:{easy:g["garden-party"].easy,medium:g["garden-party"].medium,hard:g["garden-party"].hard},suspectNames:["Arabella","Benedict","Cecily","Damien","Eleanor","Freddie","Georgina","Hugo","Imogen","Jasper","Kit","Lavinia"],victimNames:["Violet","Valentine","Verity","Viscount","Viola","Vaughn"],clueTemplates:Pt,narrativeTemplates:{intro:["The Westerleigh garden party was the social event of summer. It is no longer a social event. The body was found beneath the roses and you've been asked — very politely — to investigate.","Champagne, strawberries, murder. The annual garden party at Fernwood House has taken a distinctly unfestive turn. You decline the cucumber sandwiches and start asking questions.","The gazebo was booked for afternoon tea. It is now a crime scene. You roll up your sleeves and walk across the manicured lawn."],victimFound:["The victim was found in the Greenhouse before the afternoon guests arrived.","A gardener discovered the victim on the Lawn near the flower beds.","The caterers found the victim in the Gazebo."],guiltyText:["{{killerName}} — the summer is wilted.","{{killerName}} — cut down in their prime.","{{killerName}} — this garden party is over."]},colorPalette:{floor:"#d4f0c0",wall:"#5d4037",seat:"#7cb342",accent:"#e91e63",background:"#0a1f0a",text:"#ffffff"},spriteMap:{"object:flower-bed":"","object:plant":""}};function ye(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Mt={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same ward as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the hospital.`,inColumn:(e,t)=>`${e} was in the ${ye(t)} column.`,inRow:(e,t)=>`${e} was in the ${ye(t)} row.`,besideSuspect:(e,t)=>`${e} was standing right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>t==="bed"?`${e} was in a hospital bed.`:t==="sofa"?`${e} was in the waiting area.`:`${e} was sitting down.`,notOnSeatTile:e=>`${e} was not sitting or lying down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Lt={id:"hospital",name:"The Hospital",floorPlans:{easy:g.hospital.easy,medium:g.hospital.medium,hard:g.hospital.hard},suspectNames:["Aleksei","Beatrix","Conrad","Dorothea","Emil","Francesca","Gunnar","Hilde","Igor","Jana","Klaus","Liselotte"],victimNames:["Viktor","Valentina","Vera","Valentin","Vesna","Volkmar"],clueTemplates:Mt,narrativeTemplates:{intro:["St Crispin's Hospital is where people come to recover. This one didn't make it. The night shift just ended and nobody has an alibi. You flash your badge at the nurses' station.","A hospital is the last place you expect a murder — or the first. The body was found during morning rounds. You put on gloves and start taking statements.","The patient was admitted last night. By morning, they were a victim. Someone in this building knows what happened and you're going to find out who."],victimFound:["The victim was found in the Ward during the overnight nursing check.","The on-call doctor discovered the victim in the Operating Theatre.","The victim was found in the Pharmacy storage area."],guiltyText:["{{killerName}} — the prognosis was never good.","{{killerName}} — no treatment for this outcome.","{{killerName}} — discharged permanently."]},colorPalette:{floor:"#f0f4f8",wall:"#2c3e50",seat:"#7f8c8d",accent:"#e74c3c",background:"#0a0d12",text:"#ffffff"},spriteMap:{"object:hospital-bed":"","object:medicine-cabinet":""}};function Fe(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const At={inRoom:(e,t)=>`${e} was at the ${t}.`,notInRoom:(e,t)=>`${e} was not at the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the carnival.`,inColumn:(e,t)=>`${e} was in the ${Fe(t)} column.`,inRow:(e,t)=>`${e} was in the ${Fe(t)} row.`,besideSuspect:(e,t)=>`${e} was right next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not near ${t}.`,onSeatTile:(e,t)=>`${e} was seated at one of the stalls.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},zt={id:"carnival",name:"The Carnival",floorPlans:{easy:g.carnival.easy,medium:g.carnival.medium,hard:g.carnival.hard},suspectNames:["Alistair","Brigitte","Cosmo","Dafne","Ezra","Flavia","Gideon","Harriet","Ignatius","Juno","Kit","Ludo"],victimNames:["Victor","Valentina","Vex","Vane","Vesper","Volta"],clueTemplates:At,narrativeTemplates:{intro:["The Twilight Carnival has been travelling for thirty years without incident. Last night ended that streak. The body was found between the Carousel and the Funhouse. You came for the cotton candy.","Someone killed the Ringmaster. Or maybe the Ringmaster killed someone. Either way, the show is not going on tonight. You arrive as the last customers are being turned away.","Carnivals attract all sorts. This one attracted a detective. The body was found before morning setup. You pull on your coat and walk between the tents."],victimFound:["The victim was found near the Carousel before the carnival opened.","The ride operator discovered the victim in the Funhouse corridor.","The victim was found behind the Food Stands at dawn."],guiltyText:["{{killerName}} — the last act.","{{killerName}} — the fun is over.","{{killerName}} — tickets have been cancelled."]},colorPalette:{floor:"#f5deb3",wall:"#4a235a",seat:"#884ea0",accent:"#e74c3c",background:"#0d0a14",text:"#ffffff"},spriteMap:{"object:carousel-horse":"","object:stall":""}},Ht={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same room as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different rooms.`,inColumn:(e,t)=>`${e} was in column ${t}.`,inRow:(e,t)=>`${e} was in row ${t}.`,besideSuspect:(e,t)=>`${e} was beside ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>`${e} was on a ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Vt={id:"stub",name:"Test Room",floorPlans:{easy:g["coffee-shop"].easy,medium:g["coffee-shop"].medium,hard:g["coffee-shop"].hard},suspectNames:["Alice","Bob","Carol","Dave","Eve","Frank","Grace","Henry","Iris","Jack","Kate","Leo"],victimNames:["Vera","Victor","Violet","Valencia","Vance","Vivian"],clueTemplates:Ht,narrativeTemplates:{intro:["A crime has occurred in the Test Room.","Witnesses report suspicious activity.","The detective arrives on the scene."],victimFound:["The victim was found at the scene.","A body has been discovered.","The victim was discovered here."],guiltyText:["{{killerName}} — caught red-handed.","{{killerName}} — the evidence is clear.","{{killerName}} — guilty as charged."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{}},ae=new Map;function E(e){ae.set(e.id,e)}function Dt(e){const t=ae.get(e);if(!t)throw new Error(`Unknown theme: ${e}`);return t}function _t(){return Array.from(ae.values())}E($t);E(kt);E(St);E(Rt);E(Wt);E(jt);E(It);E(Ot);E(Lt);E(zt);E(Vt);function Yt(e,t){return t[e]??""}const b=64,q=new Map;function Gt(e){if(!e)return null;if(q.has(e))return q.get(e);const t=new Image,a=new Blob([e],{type:"image/svg+xml"}),o=URL.createObjectURL(a);return t.onload=()=>{q.set(e,t),URL.revokeObjectURL(o)},t.src=o,null}const Be="'Press Start 2P', monospace";function ge(e,t,a,o){e.fillStyle="#c8a96e",e.fillRect(t,a,b,b),e.strokeStyle="#7a5c2e",e.lineWidth=2,e.strokeRect(t+1,a+1,b-2,b-2),e.fillStyle="#3a2010",e.font=`6px ${Be}`,e.textAlign="center",e.textBaseline="middle",e.fillText(o.slice(0,4).toUpperCase(),t+b/2,a+b/2),e.textAlign="left",e.textBaseline="alphabetic"}function Kt(e){let t=0;for(let a=0;a<e.length;a++)t=t*31+e.charCodeAt(a)&65535;return`hsl(${t%360}, 65%, 55%)`}const qt={pL:"object:plant",tB:"object:table",sH:"object:shelf",cR:"object:cash-register",bB:"object:bar-counter",tV:"object:tv",cT:"object:counter",dK:"object:desk",pC:"object:photocopier",fB:"object:flower-bed",hB:"object:hospital-bed",mC:"object:medicine-cabinet",tR:"object:tree",tD:"object:teddy-bear",cH:"object:carousel-horse",tM:"object:treadmill",wT:"object:weight-rack",sT:"object:stall",jZ:"object:jacuzzi-tile"},Ut=new Set(["C","S","B"]);function Zt(e,t,a,o,n){const s=t.floorPlan,i=a.colorPalette,{blockedRows:l,blockedCols:u}=We(Array.from(o.values()));for(let d=0;d<s.height;d++)for(let c=0;c<s.width;c++){const m=s.tiles[d][c],r=c*b,f=d*b;if(m==="W"){e.fillStyle=i.wall,e.fillRect(r,f,b,b),e.strokeStyle="rgba(255,255,255,0.07)",e.lineWidth=1;const p=8;for(let h=0;h<b/p;h++){const F=f+h*p;e.beginPath(),e.moveTo(r,F),e.lineTo(r+b,F),e.stroke();const w=h%2*(b/2);e.beginPath(),e.moveTo(r+w,F),e.lineTo(r+w,F+p),e.stroke()}continue}if(Ut.has(m)){e.fillStyle=i.seat,e.fillRect(r,f,b,b),e.strokeStyle="rgba(0,0,0,0.4)",e.lineWidth=1,e.strokeRect(r+.5,f+.5,b-1,b-1);const p=Math.floor(b*.35),h=r+(b-p)/2,F=f+(b-p)/2+4;e.fillStyle="rgba(0,0,0,0.25)",e.fillRect(h,F,p,p),e.fillRect(h,f+6,p,4);continue}if(m!=="F"){const p=qt[m]??`object:${m}`,h=Yt(p,a.spriteMap);if(h){const F=Gt(h);F?e.drawImage(F,r,f,b,b):ge(e,r,f,p.replace("object:",""))}else ge(e,r,f,p.replace("object:",""));continue}e.fillStyle=i.floor,e.fillRect(r,f,b,b),e.strokeStyle="rgba(0,0,0,0.18)",e.lineWidth=1,e.strokeRect(r+.5,f+.5,b-1,b-1)}e.fillStyle="rgba(0, 0, 0, 0.15)";for(const d of l)e.fillRect(0,d*b,s.width*b,b);for(const d of u)e.fillRect(d*b,0,b,s.height*b);if(n){const d=n.x*b,c=n.y*b;e.fillStyle=`${i.accent}44`,e.fillRect(d,c,b,b),e.strokeStyle=i.accent,e.lineWidth=4,e.strokeRect(d+2,c+2,b-4,b-4),e.strokeStyle="#ffffff",e.lineWidth=1,e.strokeRect(d+5,c+5,b-10,b-10)}for(const[d,c]of o){const m=t.suspects.find(w=>w.id===d);if(!m)continue;const r=c.x*b,f=c.y*b,p=6,h=b-p*2;e.fillStyle=Kt(d),e.fillRect(r+p,f+p,h,h),e.strokeStyle="rgba(0,0,0,0.6)",e.lineWidth=2,e.strokeRect(r+p+1,f+p+1,h-2,h-2),e.strokeStyle="rgba(255,255,255,0.3)",e.lineWidth=1,e.strokeRect(r+p+2,f+p+2,h-4,h-4);const F=Math.min(14,Math.floor(h*.45));e.fillStyle="#ffffff",e.font=`${F}px ${Be}`,e.textAlign="center",e.textBaseline="middle",e.fillText(m.name.charAt(0).toUpperCase(),r+b/2,f+b/2+1),e.textAlign="left",e.textBaseline="alphabetic"}}function Jt(e){return{width:e.floorPlan.width*b,height:e.floorPlan.height*b}}const Xt=`
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
`;let we=!1;function Qt(){if(we)return;const e=document.createElement("style");e.textContent=Xt,document.head.appendChild(e),we=!0}function ea(e){let t=0;for(let a=0;a<e.length;a++)t=t*31+e.charCodeAt(a)&65535;return`hsl(${t%360}, 65%, 55%)`}function ta(e,t,a,o,n){Qt(),e.innerHTML="",e.className="alibi-sidebar";const s=document.createElement("div");s.className="alibi-sidebar-label",s.textContent="Suspects",e.appendChild(s);const i=document.createElement("div");i.className="alibi-suspect-section";for(const d of t.suspects){const c=document.createElement("div");c.className="alibi-suspect-card"+(a.has(d.id)?" placed":"");const m=document.createElement("div");m.className="alibi-suspect-initial",m.style.background=ea(d.id),m.textContent=d.name.charAt(0).toUpperCase();const r=document.createElement("span");r.textContent=d.name,c.appendChild(m),c.appendChild(r),i.appendChild(c)}e.appendChild(i);const l=document.createElement("div");l.className="alibi-sidebar-label",l.textContent="Evidence",e.appendChild(l);const u=document.createElement("div");u.className="alibi-clue-section",t.clues.forEach((d,c)=>{const m=document.createElement("div");m.className="alibi-clue-card",m.setAttribute("data-testid",`clue-${c}`),o.has(c)&&m.classList.add("clue-satisfied"),n.has(c)&&m.classList.add("clue-error"),m.textContent=d.text,u.appendChild(m)}),e.appendChild(u)}const aa=`
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
`;let xe=!1;function ne(){if(xe)return;const e=document.createElement("style");e.textContent=aa,document.head.appendChild(e),xe=!0}function U(e,t,a){ne(),oe(e);const o=document.createElement("div");o.className="alibi-overlay",o.setAttribute("data-testid","narrative-intro");const n=document.createElement("div");n.className="alibi-modal";const s=document.createElement("h2");s.textContent="A New Case";const i=document.createElement("p");i.textContent=t.narrativeIntro;const l=document.createElement("button");l.textContent="Begin Investigation",l.addEventListener("click",()=>{o.remove(),a()}),n.appendChild(s),n.appendChild(i),n.appendChild(l),o.appendChild(n),e.appendChild(o)}function na(e,t){ne(),oe(e);const a=t.narrativeGuilty.replace("{{killerName}}",t.killer.name),o=document.createElement("div");o.className="alibi-overlay";const n=document.createElement("div");n.className="alibi-modal";const s=document.createElement("div");s.className="alibi-guilty-stamp",s.setAttribute("data-testid","guilty-stamp"),s.textContent="GUILTY";const i=document.createElement("div");i.className="alibi-guilty-killer",i.setAttribute("data-testid","guilty-killer-name"),i.textContent=t.killer.name;const l=document.createElement("p");l.textContent=a;const u=document.createElement("p");u.textContent=t.narrativeVictimFound,n.appendChild(s),n.appendChild(i),n.appendChild(u),n.appendChild(l),o.appendChild(n),e.appendChild(o)}function oe(e){const t=e.querySelector(".alibi-overlay");t&&t.remove()}function oa(e){ne(),oe(e);const t=document.createElement("div");t.className="alibi-overlay",t.setAttribute("data-testid","msg-clue-gate");const a=document.createElement("div");a.className="alibi-modal";const o=document.createElement("h2");o.textContent="Something Doesn't Add Up…";const n=document.createElement("p");n.textContent="Check the clue cards. Not all witnesses are satisfied.";const s=document.createElement("button");s.textContent="Keep Investigating",s.addEventListener("click",()=>t.remove()),a.appendChild(o),a.appendChild(n),a.appendChild(s),t.appendChild(a),e.appendChild(t),setTimeout(()=>{t.isConnected&&t.remove()},3e3)}function $e(e){return{placements:new Map,satisfiedClues:new Set,errorClues:new Set,victimVisible:!1,victimCell:null,phase:"playing",elapsedMs:0}}function ia(e,t,a,o,n){const s=new Map(e.placements);return s.set(a,{suspectId:a,x:o,y:n}),ie({...e,placements:s},t)}function sa(e,t,a){const o=new Map(e.placements);return o.delete(a),ie({...e,placements:o},t)}function Z(e,t,a){return ie({...e,placements:new Map(a)},t)}function ra(e){if(e.satisfiedClues.size===0&&e.placements.size>0)return e;const t=e.satisfiedClues.size+e.errorClues.size;return e.errorClues.size===0&&t>0&&e.victimVisible?{...e,phase:"guilty"}:e}function ie(e,t){const a=new Set,o=new Set;t.clues.forEach((i,l)=>{const u=Q(t.floorPlan,i,e.placements);u===!0?a.add(l):u===!1&&o.add(l)});const n=Ne(t.floorPlan,Array.from(e.placements.values()));return{...e,satisfiedClues:a,errorClues:o,victimVisible:n!==null,victimCell:n}}const la=50;class ca{constructor(){G(this,"past",[]);G(this,"future",[])}push(t){this.past.push(new Map(t)),this.past.length>la&&this.past.shift(),this.future=[]}undo(t){return this.past.length===0?null:(this.future.push(new Map(t)),new Map(this.past.pop()))}redo(t){return this.future.length===0?null:(this.past.push(new Map(t)),new Map(this.future.pop()))}canUndo(){return this.past.length>0}canRedo(){return this.future.length>0}clear(){this.past=[],this.future=[]}}let O=null,D=!1;function da(){if(D)return null;try{return O||(O=new AudioContext),O.state==="suspended"&&O.resume().catch(()=>{}),O}catch{return null}}function W(e,t,a="sine",o=.15){const n=da();if(n)try{const s=n.createOscillator(),i=n.createGain();s.connect(i),i.connect(n.destination),s.type=a,s.frequency.value=e,i.gain.setValueAtTime(o,n.currentTime),i.gain.exponentialRampToValueAtTime(.001,n.currentTime+t),s.start(n.currentTime),s.stop(n.currentTime+t)}catch{}}function H(e){switch(e){case"place":W(440,.08,"sine",.12);break;case"remove":W(330,.06,"sine",.08);break;case"clue-satisfied":W(660,.12,"sine",.15);break;case"solve":{W(523,.15,"sine",.2),setTimeout(()=>W(659,.15,"sine",.2),150),setTimeout(()=>W(784,.3,"sine",.25),300);break}case"error":W(220,.2,"square",.1);break;case"navigate":W(880,.05,"sine",.08);break}}function ma(){return D=!D,D}function ha(e,t){const a=Math.floor(t/6e4),o=Math.floor(t%6e4/1e3),n=a>0?`${a}m ${o}s`:`${o}s`,s=e.difficulty.charAt(0).toUpperCase()+e.difficulty.slice(1);return["🔍 ALIBI",`Case: ${e.floorPlan===e.floorPlan?e.themeId.replace(/-/g," ").replace(/\b\w/g,i=>i.toUpperCase()):"Unknown"}`,`Difficulty: ${s}`,`Clues: ${e.clues.length}`,`Time: ${n}`,`Killer: ${e.killer.name}`,"","pnz1990.github.io/alibi/"].join(`
`)}async function ua(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;const t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:-9999px;left:-9999px;",document.body.appendChild(t),t.focus(),t.select();const a=document.execCommand("copy");return document.body.removeChild(t),a}catch{return!1}}const se={campaign:e=>`alibi_campaign_${e}`,daily:e=>`alibi_daily_${e}`,streak:"alibi_streak",stats:"alibi_stats",prefs:"alibi_prefs",puzzleState:"alibi_puzzle_state"};function fa(e){try{const t=re();t[e.key]=e,localStorage.setItem(se.puzzleState,JSON.stringify(t))}catch{}}function pa(e){try{return re()[e]??null}catch{return null}}function ve(e){try{const t=re();delete t[e],localStorage.setItem(se.puzzleState,JSON.stringify(t))}catch{}}function re(){try{const e=localStorage.getItem(se.puzzleState);return e?JSON.parse(e):{}}catch{return{}}}const ba=`
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
`;let ke=!1;function ya(){if(ke)return;const e=document.createElement("style");e.textContent=ba,document.head.appendChild(e),ke=!0}function Fa(e,t,a,o,n){ya();const s=t.floorPlan,i=document.createElement("div");i.className="alibi-radial-overlay",i.style.cssText=`position:absolute;top:0;left:0;width:${s.width*b}px;height:${s.height*b}px;`,e.style.position="relative",e.appendChild(i);const l=[];for(let r=0;r<s.height;r++){l[r]=[];for(let f=0;f<s.width;f++){const p=s.tiles[r][f],h=document.createElement("div");h.setAttribute("data-testid",`cell-${f}-${r}`),h.style.cssText=`position:absolute;left:${f*b}px;top:${r*b}px;width:${b}px;height:${b}px;`,N(p)&&(h.classList.add("alibi-cell-overlay","placeable"),h.addEventListener("click",F=>{F.stopPropagation(),ga(f,r,o,t,n)})),l[r][f]=h,i.appendChild(h)}}let u=null;const d=()=>Y();document.addEventListener("click",d);function c(){const r=o();if(u&&(u.remove(),u=null),r.victimCell){const{x:h,y:F}=r.victimCell;u=document.createElement("div"),u.setAttribute("data-testid","victim-cell"),u.className="alibi-cell-overlay victim-highlight",u.style.cssText=`position:absolute;left:${h*b}px;top:${F*b}px;width:${b}px;height:${b}px;pointer-events:all;`,u.addEventListener("click",w=>{w.stopPropagation(),n.onVictimClick()}),i.appendChild(u)}const f=new Set,p=new Set;for(const h of r.placements.values())f.add(h.y),p.add(h.x);for(let h=0;h<s.height;h++)for(let F=0;F<s.width;F++){const w=l[h]?.[F];if(!w)continue;const $=s.tiles[h][F],j=f.has(h)||p.has(F),B=Array.from(r.placements.values()).some(I=>I.x===F&&I.y===h);w.style.pointerEvents=N($)&&(!j||B)?"all":"none"}}function m(){document.removeEventListener("click",d),i.remove()}return c(),{updateOverlays:c,detach:m}}let _=null;function Y(){_&&(_.remove(),_=null)}function ga(e,t,a,o,n){Y();const s=a(),i=Array.from(s.placements.entries()).find(([,r])=>r.x===e&&r.y===t),l=document.createElement("div");l.className="alibi-radial-menu",l.setAttribute("data-testid","radial-menu");const d=document.getElementById("game-canvas")?.getBoundingClientRect()??{left:0,top:0};l.style.left=`${d.left+(e+1)*b}px`,l.style.top=`${d.top+t*b}px`;const c=new Set(s.placements.keys()),m=o.suspects.filter(r=>!c.has(r.id));for(const r of m){const f=document.createElement("div");f.className="alibi-radial-item",f.setAttribute("data-testid",`suspect-option-${r.id}`),f.textContent=r.name,f.addEventListener("click",p=>{p.stopPropagation(),Y(),n.onPlace(r.id,e,t)}),l.appendChild(f)}if(i){const r=document.createElement("div");r.className="alibi-radial-item alibi-radial-clear",r.setAttribute("data-testid","suspect-option-clear"),r.textContent="Clear",r.addEventListener("click",f=>{f.stopPropagation(),Y(),n.onRemove(i[0])}),l.appendChild(r)}l.children.length!==0&&(document.body.appendChild(l),_=l)}function wa(e){return`${e.seed}-${e.themeId}-${e.difficulty}`}function xa(e){const t=new URLSearchParams(location.search),a=t.get("theme")??"coffee-shop",o=t.get("difficulty")??"easy",n=parseInt(t.get("seed")??"0",10),s=Dt(a),i=_e(n,s,o),l=wa(i),u=ka(),d=u.querySelector(".alibi-canvas-wrapper"),c=u.querySelector(".alibi-sidebar-container"),m=document.getElementById("game-canvas"),r=m.getContext("2d"),{width:f,height:p}=Jt(i);m.width=f,m.height=p,m.style.maxWidth="100%",m.style.maxHeight="100vh",m.style.objectFit="contain",d.appendChild(m);let h=$e();const F=new ca;function w(y,k){const x={};k.placements.forEach((T,Ie)=>{x[Ie]={x:T.x,y:T.y}}),fa({key:y,placements:x,elapsedMs:k.elapsedMs,savedAt:new Date().toISOString()})}function $(){Zt(r,i,s,h.placements,h.victimCell),ta(c,i,h.placements,h.satisfiedClues,h.errorClues),j.updateOverlays()}const j=Fa(d,i,s,()=>h,{onPlace(y,k,x){h.phase==="playing"&&(F.push(h.placements),h=ia(h,i,y,k,x),w(l,h),H(h.satisfiedClues.size>0?"clue-satisfied":"place"),$())},onRemove(y){h.phase==="playing"&&(F.push(h.placements),h=sa(h,i,y),w(l,h),H("remove"),$())},onVictimClick(){if(h.phase!=="playing")return;const y=ra(h);y.phase==="guilty"?(h=y,ve(l),H("solve"),$(),na(document.body,i),Ca(i,h)):(H("error"),$(),oa(document.body))}}),B=u.querySelector('[data-testid="btn-undo"]'),I=u.querySelector('[data-testid="btn-redo"]');B.addEventListener("click",L),I.addEventListener("click",A);function L(){const y=F.undo(h.placements);y&&(h=Z(h,i,y),$())}function A(){const y=F.redo(h.placements);y&&(h=Z(h,i,y),$())}const R=u.querySelector('[data-testid="btn-mute"]');R.addEventListener("click",()=>{const y=ma();R.textContent=y?"🔇":"🔊"}),document.addEventListener("keydown",y=>{(y.ctrlKey||y.metaKey)&&y.key==="z"&&!y.shiftKey&&(L(),y.preventDefault()),(y.ctrlKey||y.metaKey)&&(y.key==="y"||y.key==="z"&&y.shiftKey)&&(A(),y.preventDefault())});const S=pa(l);S&&Object.keys(S.placements).length>0?Sa(u,()=>{const y=new Map(Object.entries(S.placements).map(([k,x])=>[k,{suspectId:k,x:x.x,y:x.y}]));h=Z($e(),i,y),h={...h,elapsedMs:S.elapsedMs},$(),U(document.body,i,()=>{})},()=>{ve(l),U(document.body,i,()=>{})}):U(document.body,i,()=>{}),$()}const $a=`
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
`;let Ce=!1;function va(){if(Ce)return;const e=document.createElement("style");e.textContent=$a,document.head.appendChild(e),Ce=!0}function ka(){va();const e=document.createElement("div");e.setAttribute("data-testid","screen-game"),e.className="alibi-game-screen";const t=document.createElement("div");t.className="alibi-canvas-wrapper";const a=document.createElement("div");a.style.cssText="display:flex;flex-direction:column;height:100vh;flex:1;";const o=document.createElement("div");o.className="alibi-toolbar";const n=J("btn-undo","↩ Undo"),s=J("btn-redo","↪ Redo"),i=J("btn-mute","🔊");o.append(n,s,i);const l=document.createElement("div");l.className="alibi-sidebar-container",a.append(o,l),e.append(t,a);const u=document.getElementById("game-canvas");return u.parentElement?.insertBefore(e,u),e}function J(e,t){const a=document.createElement("button");return a.setAttribute("data-testid",e),a.textContent=t,a}function Ca(e,t){const a=document.createElement("button");a.setAttribute("data-testid","btn-share"),a.style.cssText='position:fixed;bottom:24px;right:24px;z-index:300;background:#c0392b;color:#fff;border:2px solid #ff5a47;border-radius:0;padding:10px 20px;font-family:"Press Start 2P",monospace;font-size:11px;cursor:pointer;box-shadow:3px 3px 0 #6b0000;',a.textContent="📋 Share Result",a.addEventListener("click",async()=>{const o=ha(e,t.elapsedMs),n=await ua(o);a.textContent=n?"✓ Copied!":"📋 Share Result",n&&setTimeout(()=>{a.textContent="📋 Share Result"},2e3)}),document.body.appendChild(a)}function Sa(e,t,a){const o=document.createElement("div");o.setAttribute("data-testid","prompt-resume"),o.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:150;font-family:"Press Start 2P",monospace;';const n=document.createElement("div");n.style.cssText="background:#0a0a12;border:3px solid #c0392b;border-radius:0;box-shadow:4px 4px 0 #6b0000;padding:28px;max-width:360px;text-align:center;color:#fff;";const s=document.createElement("h2");s.style.cssText='color:#c0392b;margin-bottom:16px;font-family:"Press Start 2P",monospace;font-size:0.75em;line-height:1.6;',s.textContent="Resume?";const i=document.createElement("p");i.style.cssText='color:#aaa;margin-bottom:20px;font-family:"Press Start 2P",monospace;font-size:0.45em;line-height:2;',i.textContent="Continue your in-progress case?";const l=document.createElement("button");l.style.cssText='background:#c0392b;color:#fff;border:2px solid #ff5a47;border-radius:0;padding:9px 20px;font-family:"Press Start 2P",monospace;font-size:9px;cursor:pointer;margin-right:8px;box-shadow:2px 2px 0 #6b0000;',l.textContent="Resume",l.addEventListener("click",()=>{o.remove(),t()});const u=document.createElement("button");u.style.cssText='background:#1a1a2e;color:#fff;border:2px solid #555;border-radius:0;padding:9px 20px;font-family:"Press Start 2P",monospace;font-size:9px;cursor:pointer;box-shadow:2px 2px 0 #000;',u.textContent="Start Fresh",u.addEventListener("click",()=>{o.remove(),a()}),n.append(s,i,l,u),o.appendChild(n),e.appendChild(o)}function Ta(e){let t=5381;for(let a=0;a<e.length;a++)t=(t<<5)+t+e.charCodeAt(a)|0;return Math.abs(t)}function Ra(){const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const Se=[{themeId:"coffee-shop",difficulty:"easy"},{themeId:"bookstore",difficulty:"easy"},{themeId:"backyard",difficulty:"easy"},{themeId:"holiday-mall",difficulty:"easy"},{themeId:"restaurant",difficulty:"easy"},{themeId:"gym",difficulty:"easy"},{themeId:"office",difficulty:"easy"},{themeId:"garden-party",difficulty:"easy"},{themeId:"hospital",difficulty:"easy"},{themeId:"carnival",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"bookstore",difficulty:"medium"},{themeId:"backyard",difficulty:"medium"},{themeId:"holiday-mall",difficulty:"medium"},{themeId:"restaurant",difficulty:"medium"},{themeId:"gym",difficulty:"medium"},{themeId:"office",difficulty:"medium"},{themeId:"garden-party",difficulty:"medium"},{themeId:"hospital",difficulty:"medium"},{themeId:"carnival",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"bookstore",difficulty:"hard"},{themeId:"backyard",difficulty:"hard"},{themeId:"holiday-mall",difficulty:"hard"},{themeId:"restaurant",difficulty:"hard"},{themeId:"gym",difficulty:"hard"},{themeId:"office",difficulty:"hard"},{themeId:"garden-party",difficulty:"hard"},{themeId:"hospital",difficulty:"hard"},{themeId:"carnival",difficulty:"hard"}];function Ea(e){const t=Ta(e),a=new Date(e+"T12:00:00Z"),o=Math.floor((a.getTime()-new Date(a.getUTCFullYear(),0,0).getTime())/864e5),{themeId:n,difficulty:s}=Se[o%Se.length];return{seed:t,themeId:n,difficulty:s,dateStr:e}}function Wa(){return Ea(Ra())}const Na=`
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
`;let Te=!1;function ja(){if(Te)return;const e=document.createElement("style");e.textContent=Na,document.head.appendChild(e),Te=!0}function Ba(){ja();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-home"),t.className="alibi-home";const a=document.createElement("div");a.className="alibi-home-eyebrow",a.textContent="— A Mystery Awaits —";const o=document.createElement("div");o.className="alibi-home-title",o.textContent="ALIBI";const n=document.createElement("div");n.className="alibi-home-subtitle",n.textContent=`Murder Mystery
Deduction`;const s=document.createElement("div");s.className="alibi-home-buttons",s.appendChild(X("btn-campaign","primary","📁 Campaign","12 escalating cases")),s.appendChild(X("btn-quickplay","secondary","🎲 Quick Play","Pick theme + difficulty")),s.appendChild(X("btn-daily","secondary","📅 Daily Case","Same worldwide · daily streak")),t.append(a,o,n,s),document.body.appendChild(t),t.querySelector('[data-testid="btn-quickplay"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=quickplay`}),t.querySelector('[data-testid="btn-campaign"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=campaign`}),t.querySelector('[data-testid="btn-daily"]').addEventListener("click",()=>{t.remove();const{seed:i,themeId:l,difficulty:u}=Wa();window.location.href=`${window.location.pathname}?theme=${l}&difficulty=${u}&seed=${i}`})}function X(e,t,a,o){const n=document.createElement("button");n.setAttribute("data-testid",e),n.className=`alibi-home-btn ${t}`;const s=document.createElement("span");s.className="btn-title",s.textContent=a;const i=document.createElement("span");return i.className="btn-desc",i.textContent=o,n.append(s,i),n}const Ia=`
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
`;let Re=!1;function Pa(){if(Re)return;const e=document.createElement("style");e.textContent=Ia,document.head.appendChild(e),Re=!0}const Oa=[{title:"The Coffee Shop",difficulty:"easy",seed:100},{title:"The Bookstore",difficulty:"easy",seed:101},{title:"The Backyard",difficulty:"easy",seed:102},{title:"The Holiday Mall",difficulty:"easy",seed:103},{title:"The Coffee Shop",difficulty:"medium",seed:200},{title:"The Bookstore",difficulty:"medium",seed:201},{title:"The Backyard",difficulty:"medium",seed:202},{title:"The Holiday Mall",difficulty:"medium",seed:203},{title:"The Coffee Shop",difficulty:"hard",seed:300},{title:"The Bookstore",difficulty:"hard",seed:301},{title:"The Backyard",difficulty:"hard",seed:302},{title:"The Holiday Mall",difficulty:"hard",seed:303}];function Ma(){Pa();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-campaign-board"),t.className="alibi-campaign-board";const a=document.createElement("div");a.className="alibi-campaign-header";const o=document.createElement("button");o.className="alibi-campaign-back",o.textContent="← Home",o.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="📁 Campaign",a.append(o,n);const s=document.createElement("div");s.className="alibi-case-grid",Oa.forEach((i,l)=>{const u=document.createElement("div");u.setAttribute("data-testid",`case-card-${l}`),u.className=`alibi-case-card ${l===0?"unlocked":"locked"}`;const d=document.createElement("div");d.className="alibi-case-num",d.textContent=`Case ${l+1}`;const c=document.createElement("div");c.className="alibi-case-title",c.textContent=l===0?i.title:"???";const m=document.createElement("div");m.className=`alibi-case-difficulty ${i.difficulty}`,m.textContent=i.difficulty.charAt(0).toUpperCase()+i.difficulty.slice(1);const r=document.createElement("div");r.setAttribute("data-testid",`case-status-${l}`),r.className=`alibi-case-status ${l===0?"":"locked"}`,r.textContent=l===0?"📁":"🔒",u.append(d,c,m,r),l===0&&u.addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?theme=coffee-shop&difficulty=${i.difficulty}&seed=${i.seed}`}),s.appendChild(u)}),t.append(a,s),document.body.appendChild(t)}const La=`
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
`,Aa={"coffee-shop":"☕",bookstore:"📚",backyard:"🌿","holiday-mall":"🎄",restaurant:"🍽",gym:"💪",office:"🏢","garden-party":"🌸",hospital:"🏥",carnival:"🎡"};let Ee=!1;function za(){if(Ee)return;const e=document.createElement("style");e.textContent=La,document.head.appendChild(e),Ee=!0}function Ha(){za();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-theme-select"),t.className="alibi-theme-select";const a=document.createElement("div");a.className="alibi-theme-select-header";const o=document.createElement("button");o.className="alibi-theme-back",o.textContent="← Home",o.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="🎲 Quick Play",a.append(o,n);let s="easy";const i=document.createElement("div");i.className="alibi-difficulty-row";const l={};for(const[r,f]of[["easy","Easy"],["medium","Medium"],["hard","Hard"]]){const p=document.createElement("button");p.setAttribute("data-testid",`difficulty-${r}`),p.className=`alibi-diff-btn ${r}${r==="easy"?" selected":""}`,p.textContent=f,p.addEventListener("click",()=>{s=r,Object.values(l).forEach(h=>h.classList.remove("selected")),p.classList.add("selected")}),l[r]=p,i.appendChild(p)}let u=null;const d=document.createElement("div");d.className="alibi-theme-grid";const c={};for(const r of _t()){if(r.id==="stub")continue;const f=document.createElement("div");f.setAttribute("data-testid",`theme-card-${r.id}`),f.className="alibi-theme-card";const p=document.createElement("div");p.className="alibi-theme-icon",p.textContent=Aa[r.id]??"🔍";const h=document.createElement("div");h.textContent=r.name.replace(/^The /,""),f.append(p,h),f.addEventListener("click",()=>{u=r.id,Object.values(c).forEach(F=>F.classList.remove("selected")),f.classList.add("selected"),m.disabled=!1}),c[r.id]=f,d.appendChild(f)}const m=document.createElement("button");m.setAttribute("data-testid","btn-play"),m.className="alibi-play-btn",m.textContent="Play",m.disabled=!0,m.addEventListener("click",()=>{if(!u)return;const r=Math.floor(Math.random()*4294967295);t.remove(),window.location.href=`${window.location.pathname}?theme=${u}&difficulty=${s}&seed=${r}`}),t.append(a,i,d,m),document.body.appendChild(t)}const V=new URLSearchParams(location.search);if(V.has("theme")||V.has("difficulty")||V.has("seed"))xa();else switch(V.get("mode")){case"campaign":Ma();break;case"quickplay":Ha();break;default:Ba();break}

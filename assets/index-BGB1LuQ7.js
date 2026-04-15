var Ee=Object.defineProperty;var $e=(e,t,o)=>t in e?Ee(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var W=(e,t,o)=>$e(e,typeof t!="symbol"?t+"":t,o);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const Re=new Set(["F","C","S","B"]);function N(e){return Re.has(e)}function O(e){return e==="C"||e==="S"||e==="B"}function ee(e){const t=[];for(let o=0;o<e.width;o++)for(let a=0;a<e.height;a++)if(N(e.tiles[a][o])){t.push(o);break}return t}function te(e){const t=[];for(let o=0;o<e.height;o++)for(let a=0;a<e.width;a++)if(N(e.tiles[o][a])){t.push(o);break}return t}function $(e,t,o){for(const a of e.rooms)for(const[n,s]of a.cells)if(n===t&&s===o)return a.id;return null}function we(e){const t=new Set,o=new Set;for(const a of e)t.add(a.y),o.add(a.x);return{blockedRows:t,blockedCols:o}}function Se(e,t){const{blockedRows:o,blockedCols:a}=we(t),n=[];for(let s=0;s<e.height;s++)if(!o.has(s))for(let i=0;i<e.width;i++)a.has(i)||N(e.tiles[s][i])&&n.push({x:i,y:s});return n.length===1?n[0]:null}function Te(e,t,o){const a=$(e,o.x,o.y);if(a===null)return null;for(const n of t)if($(e,n.x,n.y)===a)return n.suspectId;return null}function ce(e,t,o,a){return Math.max(Math.abs(e-o),Math.abs(t-a))}function Z(e,t,o){const a=o.get(t.suspectId);if(!a)return null;switch(t.type){case"inRoom":return $(e,a.x,a.y)===t.roomId;case"notInRoom":return $(e,a.x,a.y)!==t.roomId;case"inSameRoom":{const n=o.get(t.otherSuspectId);if(!n)return null;const s=$(e,a.x,a.y),i=$(e,n.x,n.y);return s!==null&&s===i}case"inDifferentRoom":{const n=o.get(t.otherSuspectId);if(!n)return null;const s=$(e,a.x,a.y),i=$(e,n.x,n.y);return s===null||i===null?null:s!==i}case"inColumn":return a.x===t.col;case"inRow":return a.y===t.row;case"besideSuspect":{const n=o.get(t.otherSuspectId);return n?ce(a.x,a.y,n.x,n.y)<=1:null}case"notBesideSuspect":{const n=o.get(t.otherSuspectId);return n?ce(a.x,a.y,n.x,n.y)>1:null}case"besideObject":{for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++){if(s===0&&n===0)continue;const i=a.x+s,r=a.y+n;if(!(i<0||r<0||i>=e.width||r>=e.height)&&e.tiles[r][i]===t.objectTile)return!0}return!1}case"notBesideObject":{for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++){if(s===0&&n===0)continue;const i=a.x+s,r=a.y+n;if(!(i<0||r<0||i>=e.width||r>=e.height)&&e.tiles[r][i]===t.objectTile)return!1}return!0}case"onSeatTile":return O(e.tiles[a.y][a.x]);case"notOnSeatTile":return!O(e.tiles[a.y][a.x]);case"northOf":{const n=o.get(t.otherSuspectId);return n?a.y<n.y:null}case"southOf":{const n=o.get(t.otherSuspectId);return n?a.y>n.y:null}case"exactlyNRowsNorth":{const n=o.get(t.otherSuspectId);return n?n.y-a.y===t.n:null}case"exactlyNRowsSouth":{const n=o.get(t.otherSuspectId);return n?a.y-n.y===t.n:null}}}const Ie={easy:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom"],medium:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile"],hard:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile","notOnSeatTile","northOf","southOf","exactlyNRowsNorth","exactlyNRowsSouth"]};function Y(e,t,o){const a=ee(e),n=te(e);if(t.length===0)return{count:0};if(t.length>Math.min(a.length,n.length))return{count:0};const s=new Set;for(let c=0;c<e.height;c++)for(let u=0;u<e.width;u++)N(e.tiles[c][u])&&s.add(`${u},${c}`);let i=0,r;const f=new Map,l=new Set,d=new Set;function p(c){if(i>=2)return;if(c===t.length){for(const b of o)if(Z(e,b,f)!==!0)return;i++,i===1&&(r=new Map(f));return}const u=t[c];for(const b of n)if(!l.has(b))for(const m of a){if(d.has(m)||!s.has(`${m},${b}`))continue;const g={suspectId:u,x:m,y:b};f.set(u,g),l.add(b),d.add(m);let v=!1;for(const w of o)if((w.suspectId===u||w.otherSuspectId===u)&&Z(e,w,f)===!1){v=!0;break}if(v||p(c+1),f.delete(u),l.delete(b),d.delete(m),i>=2)return}}return p(0),{count:i,firstSolution:r}}class Ne extends Error{constructor(t){super(t),this.name="PuzzleGenerationError"}}function Be(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let o=Math.imul(t^t>>>15,1|t);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296}}function Ce(e,t){return Math.floor(e()*t)}function C(e,t){return t[Ce(e,t.length)]}function M(e,t){const o=[...t];for(let a=o.length-1;a>0;a--){const n=Ce(e,a+1);[o[a],o[n]]=[o[n],o[a]]}return o}function Fe(e,t,o,a){const n=Ie[o],s=a.landmarks.length>=2,i=a.tiles.some(d=>d.some(p=>O(p))),r=n.filter(d=>!((d==="besideObject"||d==="notBesideObject")&&!s||(d==="onSeatTile"||d==="notOnSeatTile")&&!i)),f=Math.ceil(t*.4),l=[];for(let d=0;d<t;d++){const p=new Set;l.length>0&&p.add(l[l.length-1]);for(const g of r)l.filter(w=>w===g).length>=f&&p.add(g);const c=r.filter(g=>!p.has(g)),u=c.length>0?c:r,b=u.filter(g=>!l.includes(g)),m=b.length>0?b:u;l.push(C(e,m))}return l}function L(e,t,o,a,n,s,i){const r=i.get(n.id),f=o.clueTemplates;switch(a){case"inRoom":{const l=$(t,r.x,r.y);if(!l)return null;const d=t.rooms.find(p=>p.id===l);return{type:"inRoom",suspectId:n.id,roomId:l,text:f.inRoom(n.name,d.name)}}case"notInRoom":{const l=$(t,r.x,r.y),d=t.rooms.filter(c=>c.id!==l);if(d.length===0)return null;const p=C(e,d);return{type:"notInRoom",suspectId:n.id,roomId:p.id,text:f.notInRoom(n.name,p.name)}}case"inSameRoom":{const l=$(t,r.x,r.y);if(!l)return null;const d=s.filter(c=>{if(c.id===n.id)return!1;const u=i.get(c.id);return $(t,u.x,u.y)===l});if(d.length===0)return null;const p=C(e,d);return{type:"inSameRoom",suspectId:n.id,otherSuspectId:p.id,text:f.inSameRoom(n.name,p.name)}}case"inDifferentRoom":{const l=$(t,r.x,r.y),d=s.filter(c=>{if(c.id===n.id)return!1;const u=i.get(c.id),b=$(t,u.x,u.y);return b!==null&&b!==l});if(d.length===0)return null;const p=C(e,d);return{type:"inDifferentRoom",suspectId:n.id,otherSuspectId:p.id,text:f.inDifferentRoom(n.name,p.name)}}case"inColumn":return{type:"inColumn",suspectId:n.id,col:r.x,text:f.inColumn(n.name,r.x+1)};case"inRow":return{type:"inRow",suspectId:n.id,row:r.y,text:f.inRow(n.name,r.y+1)};case"besideSuspect":{const l=s.filter(p=>{if(p.id===n.id)return!1;const c=i.get(p.id);return Math.max(Math.abs(r.x-c.x),Math.abs(r.y-c.y))<=1});if(l.length===0)return null;const d=C(e,l);return{type:"besideSuspect",suspectId:n.id,otherSuspectId:d.id,text:f.besideSuspect(n.name,d.name)}}case"notBesideSuspect":{const l=s.filter(p=>{if(p.id===n.id)return!1;const c=i.get(p.id);return Math.max(Math.abs(r.x-c.x),Math.abs(r.y-c.y))>1});if(l.length===0)return null;const d=C(e,l);return{type:"notBesideSuspect",suspectId:n.id,otherSuspectId:d.id,text:f.notBesideSuspect(n.name,d.name)}}case"besideObject":{if(t.landmarks.length===0)return null;const l=t.landmarks.filter(c=>Math.max(Math.abs(r.x-c.x),Math.abs(r.y-c.y))<=1);if(l.length===0)return null;const d=C(e,l),p=t.tiles[d.y][d.x];return{type:"besideObject",suspectId:n.id,objectTile:p,text:f.besideObject(n.name,d.name)}}case"notBesideObject":{if(t.landmarks.length===0)return null;const l=t.landmarks.filter(c=>Math.max(Math.abs(r.x-c.x),Math.abs(r.y-c.y))>1);if(l.length===0)return null;const d=C(e,l),p=t.tiles[d.y][d.x];return{type:"notBesideObject",suspectId:n.id,objectTile:p,text:f.notBesideObject(n.name,d.name)}}case"onSeatTile":{const l=t.tiles[r.y][r.x];if(!O(l))return null;const d=l==="C"?"chair":l==="S"?"sofa":"bed";return{type:"onSeatTile",suspectId:n.id,text:f.onSeatTile(n.name,d)}}case"notOnSeatTile":{const l=t.tiles[r.y][r.x];return O(l)?null:{type:"notOnSeatTile",suspectId:n.id,text:f.notOnSeatTile(n.name)}}case"northOf":{const l=s.filter(p=>{if(p.id===n.id)return!1;const c=i.get(p.id);return r.y<c.y});if(l.length===0)return null;const d=C(e,l);return{type:"northOf",suspectId:n.id,otherSuspectId:d.id,text:f.northOf(n.name,d.name)}}case"southOf":{const l=s.filter(p=>{if(p.id===n.id)return!1;const c=i.get(p.id);return r.y>c.y});if(l.length===0)return null;const d=C(e,l);return{type:"southOf",suspectId:n.id,otherSuspectId:d.id,text:f.southOf(n.name,d.name)}}case"exactlyNRowsNorth":{const l=[];for(const p of s){if(p.id===n.id)continue;const u=i.get(p.id).y-r.y;u>0&&l.push({suspect:p,n:u})}if(l.length===0)return null;const d=C(e,l);return{type:"exactlyNRowsNorth",suspectId:n.id,otherSuspectId:d.suspect.id,n:d.n,text:f.exactlyNRowsNorth(n.name,d.suspect.name,d.n)}}case"exactlyNRowsSouth":{const l=[];for(const p of s){if(p.id===n.id)continue;const c=i.get(p.id),u=r.y-c.y;u>0&&l.push({suspect:p,n:u})}if(l.length===0)return null;const d=C(e,l);return{type:"exactlyNRowsSouth",suspectId:n.id,otherSuspectId:d.suspect.id,n:d.n,text:f.exactlyNRowsSouth(n.name,d.suspect.name,d.n)}}}}function Ae(e,t,o,a=1e3){const n=M(e,ee(t)),s=M(e,te(t)),i=o.length;if(i<1||i>Math.min(n.length,s.length))return null;let r=0;const f=new Map,l=new Set,d=new Set,p=M(e,s).slice(0,i);function c(u){if(u===i)return!0;const b=o[u],m=p[u],g=M(e,n);for(const v of g)if(!d.has(v)&&N(t.tiles[m]?.[v])){if(f.set(b.id,{suspectId:b.id,x:v,y:m}),l.add(m),d.add(v),c(u+1))return!0;if(r++,f.delete(b.id),l.delete(m),d.delete(v),r>=a)return!1}return!1}return c(0)?f:null}function Le(e,t,o){for(let n=0;n<20;n++){const s=e+n*97>>>0,i=Be(s),r=t.floorPlans[o],f=ee(r),l=te(r),d=Math.min(f.length,l.length)-1;if(d<2)continue;const u=M(i,[...t.suspectNames]).slice(0,d).map((x,k)=>({id:`s${k}`,name:x})),b=C(i,t.victimNames),m=Ae(i,r,u);if(!m)continue;const g=Array.from(m.values()),v=Se(r,g);if(!v)continue;const w=Te(r,g,v);if(!w)continue;const I=u.find(x=>x.id===w),A=C(i,t.narrativeTemplates.intro),B=C(i,t.narrativeTemplates.victimFound),P=C(i,t.narrativeTemplates.guiltyText).replace("{{killerName}}",I.name).replace("{{evidenceText}}","the evidence is conclusive"),z=Fe(i,d,o,r),E=[];for(let x=0;x<d;x++){const k=u[x],S=z[x];let R=L(i,r,t,S,k,u,m);R||(R=L(i,r,t,"inRow",k,u,m)),R||(R=L(i,r,t,"inColumn",k,u,m)),R&&E.push(R)}let y=Y(r,u.map(x=>x.id),E);if(y.count!==0){if(y.count!==1)for(const x of u){if(y.count===1)break;if(!E.some(S=>S.type==="inRow"&&S.suspectId===x.id)){const S=L(i,r,t,"inRow",x,u,m);S&&E.push(S),y=Y(r,u.map(R=>R.id),E)}}if(y.count!==1)for(const x of u){if(y.count===1)break;if(!E.some(S=>S.type==="inColumn"&&S.suspectId===x.id)){const S=L(i,r,t,"inColumn",x,u,m);S&&E.push(S),y=Y(r,u.map(R=>R.id),E)}}if(y.count===1)return{seed:s,themeId:t.id,difficulty:o,suspects:u,victimName:b,clues:E,solution:m,victimCell:v,killer:I,narrativeIntro:A,narrativeVictimFound:B,narrativeGuilty:P,floorPlan:r}}}throw new Ne(`Failed to generate unique puzzle after 20 retries (seed=${e}, theme=${t.id}, difficulty=${o})`)}const je={width:5,height:6,tiles:[["bB","bB","bB","W","W"],["F","F","F","C","F"],["pL","F","C","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"],["W","cR","W","F","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[3,1],[4,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"restroom",name:"Restroom",cells:[[1,5],[3,5],[4,5]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-entrance",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},Me={width:6,height:7,tiles:[["bB","bB","bB","bB","W","W"],["F","F","F","F","C","F"],["pL","F","C","F","F","F"],["F","S","F","pL","F","C"],["F","F","tB","F","F","F"],["C","F","F","F","W","F"],["W","cR","W","W","W","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5]]},{id:"restroom",name:"Restroom",cells:[[1,6],[5,5],[5,6]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-door",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:3,y:3},{id:"table",name:"the table",x:2,y:4},{id:"cash-register",name:"the cash register",x:1,y:6}]},Oe={width:7,height:8,tiles:[["bB","bB","bB","bB","bB","W","W"],["F","F","F","F","F","C","F"],["F","C","F","pL","F","F","F"],["pL","F","S","F","C","F","pL"],["F","F","F","tB","F","F","F"],["F","C","F","F","F","tB","C"],["F","F","F","F","F","W","F"],["W","cR","W","F","C","W","F"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]]},{id:"main-area",name:"Main Area",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[6,6]]},{id:"restroom",name:"Restroom",cells:[[1,7]]},{id:"back-office",name:"Back Office",cells:[[3,7],[4,7],[6,7]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-1",name:"the plant",x:3,y:2},{id:"plant-2",name:"the plant",x:0,y:3},{id:"plant-3",name:"the plant",x:6,y:3},{id:"table",name:"the table",x:3,y:4},{id:"table-2",name:"the small table",x:5,y:5},{id:"cash-register",name:"the cash register",x:1,y:7}]},F={"coffee-shop":{easy:je,medium:Me,hard:Oe}};function le(e){const t=["th","st","nd","rd"],o=e%100;return e+(t[(o-20)%10]??t[o]??t[0])}const Pe={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the café.`,inColumn:(e,t)=>`${e} was in the ${le(t)} column.`,inRow:(e,t)=>`${e} was in the ${le(t)} row.`,besideSuspect:(e,t)=>`${e} was standing next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>t==="chair"?`${e} was sitting in a chair.`:t==="sofa"?`${e} was on the sofa.`:`${e} was on the ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} south of ${t}.`},ze={id:"coffee-shop",name:"The Coffee Shop",floorPlans:{easy:F["coffee-shop"].easy,medium:F["coffee-shop"].medium,hard:F["coffee-shop"].hard},suspectNames:["Alice","Ben","Chloe","Diego","Elena","Finlay","Grace","Hassan","Iris","Jake","Lena","Marco"],victimNames:["Victor","Violet","Vera","Valencia","Vance","Vivian"],clueTemplates:Pe,narrativeTemplates:{intro:["A body has been found at the Copper Bean Café. The morning rush never arrived — instead, the regulars found yellow tape across the door. You pour yourself an espresso and get to work.","The Copper Bean Café is closed for a very different reason today. Someone is dead, and the witnesses are all still clutching their lattes. You take out your notebook.","It was supposed to be a quiet Tuesday at the Copper Bean. Then the screaming started. Now it's your problem. You order a black coffee and begin."],victimFound:["The victim was discovered near table four, cold cup of coffee still in hand.","Staff found the victim behind the counter during the morning prep.","A regular spotted the victim slumped in the corner booth before opening."],guiltyText:["{{killerName}} — served with a side of motive.","{{killerName}} — the evidence is as clear as an Americano.","{{killerName}} — there's no running from the detective on this one."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:plant":"","object:cash-register":"","object:table":""}},_e={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same room as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different rooms.`,inColumn:(e,t)=>`${e} was in column ${t}.`,inRow:(e,t)=>`${e} was in row ${t}.`,besideSuspect:(e,t)=>`${e} was beside ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>`${e} was on a ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} south of ${t}.`},De={id:"stub",name:"Test Room",floorPlans:{easy:F["coffee-shop"].easy,medium:F["coffee-shop"].medium,hard:F["coffee-shop"].hard},suspectNames:["Alice","Bob","Carol","Dave","Eve","Frank","Grace","Henry","Iris","Jack","Kate","Leo"],victimNames:["Vera","Victor","Violet","Valencia","Vance","Vivian"],clueTemplates:_e,narrativeTemplates:{intro:["A crime has occurred in the Test Room.","Witnesses report suspicious activity.","The detective arrives on the scene."],victimFound:["The victim was found at the scene.","A body has been discovered.","The victim was discovered here."],guiltyText:["{{killerName}} — caught red-handed.","{{killerName}} — the evidence is clear.","{{killerName}} — guilty as charged."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{}},ne=new Map;function ke(e){ne.set(e.id,e)}function Ve(e){const t=ne.get(e);if(!t)throw new Error(`Unknown theme: ${e}`);return t}function qe(){return Array.from(ne.values())}ke(ze);ke(De);function He(e,t){return t[e]??""}const h=64,G=new Map;function Ue(e){if(!e)return null;if(G.has(e))return G.get(e);const t=new Image,o=new Blob([e],{type:"image/svg+xml"}),a=URL.createObjectURL(o);return t.onload=()=>{G.set(e,t),URL.revokeObjectURL(a)},t.src=a,null}function de(e,t,o,a){e.fillStyle="#c8a96e",e.fillRect(t,o,h,h),e.fillStyle="#ffffff",e.font="8px monospace",e.textAlign="center",e.textBaseline="middle",e.fillText(a.slice(0,4),t+h/2,o+h/2),e.textAlign="left",e.textBaseline="alphabetic"}function We(e){let t=0;for(let o=0;o<e.length;o++)t=t*31+e.charCodeAt(o)&65535;return`hsl(${t%360}, 65%, 55%)`}const Ye={pL:"object:plant",tB:"object:table",sH:"object:shelf",cR:"object:cash-register",bB:"object:bar-counter",tV:"object:tv",cT:"object:counter",dK:"object:desk",pC:"object:photocopier",fB:"object:flower-bed",hB:"object:hospital-bed",mC:"object:medicine-cabinet",tR:"object:tree",tD:"object:teddy-bear",cH:"object:carousel-horse",tM:"object:treadmill",wT:"object:weight-rack",sT:"object:stall",jZ:"object:jacuzzi-tile"},Ge=new Set(["C","S","B"]);function Ke(e,t,o,a,n){const s=t.floorPlan,i=o.colorPalette,{blockedRows:r,blockedCols:f}=we(Array.from(a.values()));for(let l=0;l<s.height;l++)for(let d=0;d<s.width;d++){const p=s.tiles[l][d],c=d*h,u=l*h;if(p==="W"){e.fillStyle=i.wall,e.fillRect(c,u,h,h);continue}if(Ge.has(p)){e.fillStyle=i.seat,e.fillRect(c,u,h,h),e.fillStyle="rgba(0,0,0,0.2)",e.beginPath(),e.arc(c+h/2,u+h/2,h*.3,0,Math.PI*2),e.fill(),e.strokeStyle="rgba(0,0,0,0.1)",e.lineWidth=.5,e.strokeRect(c,u,h,h);continue}if(p!=="F"){const b=Ye[p]??`object:${p}`,m=He(b,o.spriteMap);if(m){const g=Ue(m);g?e.drawImage(g,c,u,h,h):de(e,c,u,b.replace("object:",""))}else de(e,c,u,b.replace("object:",""));continue}e.fillStyle=i.floor,e.fillRect(c,u,h,h),e.strokeStyle="rgba(0,0,0,0.1)",e.lineWidth=.5,e.strokeRect(c,u,h,h)}e.fillStyle="rgba(0, 0, 0, 0.15)";for(const l of r)e.fillRect(0,l*h,s.width*h,h);for(const l of f)e.fillRect(l*h,0,h,s.height*h);if(n){const l=n.x*h,d=n.y*h;e.strokeStyle=i.accent,e.lineWidth=3,e.strokeRect(l+2,d+2,h-4,h-4),e.fillStyle=`${i.accent}33`,e.fillRect(l+2,d+2,h-4,h-4)}for(const[l,d]of a){const p=t.suspects.find(b=>b.id===l);if(!p)continue;const c=d.x*h,u=d.y*h;e.fillStyle=We(l),e.beginPath(),e.arc(c+h/2,u+h/2,h*.38,0,Math.PI*2),e.fill(),e.fillStyle="#ffffff",e.font=`bold ${Math.floor(h*.4)}px monospace`,e.textAlign="center",e.textBaseline="middle",e.fillText(p.name.charAt(0).toUpperCase(),c+h/2,u+h/2),e.textAlign="left",e.textBaseline="alphabetic"}}function Je(e){return{width:e.floorPlan.width*h,height:e.floorPlan.height*h}}const Xe=`
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
`;let ue=!1;function Qe(){if(ue)return;const e=document.createElement("style");e.textContent=Xe,document.head.appendChild(e),ue=!0}function Ze(e){let t=0;for(let o=0;o<e.length;o++)t=t*31+e.charCodeAt(o)&65535;return`hsl(${t%360}, 65%, 55%)`}function et(e,t,o,a,n){Qe(),e.innerHTML="",e.className="alibi-sidebar";const s=document.createElement("div");s.className="alibi-suspect-section";for(const r of t.suspects){const f=document.createElement("div");f.className="alibi-suspect-card"+(o.has(r.id)?" placed":"");const l=document.createElement("div");l.className="alibi-suspect-initial",l.style.background=Ze(r.id),l.textContent=r.name.charAt(0).toUpperCase();const d=document.createElement("span");d.textContent=r.name,f.appendChild(l),f.appendChild(d),s.appendChild(f)}e.appendChild(s);const i=document.createElement("div");i.className="alibi-clue-section",t.clues.forEach((r,f)=>{const l=document.createElement("div");l.className="alibi-clue-card",l.setAttribute("data-testid",`clue-${f}`),a.has(f)&&l.classList.add("clue-satisfied"),n.has(f)&&l.classList.add("clue-error"),l.textContent=r.text,i.appendChild(l)}),e.appendChild(i)}const tt=`
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
`;let fe=!1;function oe(){if(fe)return;const e=document.createElement("style");e.textContent=tt,document.head.appendChild(e),fe=!0}function K(e,t,o){oe(),ae(e);const a=document.createElement("div");a.className="alibi-overlay",a.setAttribute("data-testid","narrative-intro");const n=document.createElement("div");n.className="alibi-modal";const s=document.createElement("h2");s.textContent="A New Case";const i=document.createElement("p");i.textContent=t.narrativeIntro;const r=document.createElement("button");r.textContent="Begin Investigation",r.addEventListener("click",()=>{a.remove(),o()}),n.appendChild(s),n.appendChild(i),n.appendChild(r),a.appendChild(n),e.appendChild(a)}function nt(e,t){oe(),ae(e);const o=t.narrativeGuilty.replace("{{killerName}}",t.killer.name),a=document.createElement("div");a.className="alibi-overlay";const n=document.createElement("div");n.className="alibi-modal";const s=document.createElement("div");s.className="alibi-guilty-stamp",s.setAttribute("data-testid","guilty-stamp"),s.textContent="GUILTY";const i=document.createElement("div");i.className="alibi-guilty-killer",i.setAttribute("data-testid","guilty-killer-name"),i.textContent=t.killer.name;const r=document.createElement("p");r.textContent=o;const f=document.createElement("p");f.textContent=t.narrativeVictimFound,n.appendChild(s),n.appendChild(i),n.appendChild(f),n.appendChild(r),a.appendChild(n),e.appendChild(a)}function ae(e){const t=e.querySelector(".alibi-overlay");t&&t.remove()}function ot(e){oe(),ae(e);const t=document.createElement("div");t.className="alibi-overlay",t.setAttribute("data-testid","msg-clue-gate");const o=document.createElement("div");o.className="alibi-modal";const a=document.createElement("h2");a.textContent="Something Doesn't Add Up…";const n=document.createElement("p");n.textContent="Check the clue cards. Not all witnesses are satisfied.";const s=document.createElement("button");s.textContent="Keep Investigating",s.addEventListener("click",()=>t.remove()),o.appendChild(a),o.appendChild(n),o.appendChild(s),t.appendChild(o),e.appendChild(t),setTimeout(()=>{t.isConnected&&t.remove()},3e3)}function me(e){return{placements:new Map,satisfiedClues:new Set,errorClues:new Set,victimVisible:!1,victimCell:null,phase:"playing",elapsedMs:0}}function at(e,t,o,a,n){const s=new Map(e.placements);return s.set(o,{suspectId:o,x:a,y:n}),ie({...e,placements:s},t)}function it(e,t,o){const a=new Map(e.placements);return a.delete(o),ie({...e,placements:a},t)}function J(e,t,o){return ie({...e,placements:new Map(o)},t)}function st(e){if(e.satisfiedClues.size===0&&e.placements.size>0)return e;const t=e.satisfiedClues.size+e.errorClues.size;return e.errorClues.size===0&&t>0&&e.victimVisible?{...e,phase:"guilty"}:e}function ie(e,t){const o=new Set,a=new Set;t.clues.forEach((i,r)=>{const f=Z(t.floorPlan,i,e.placements);f===!0?o.add(r):f===!1&&a.add(r)});const n=Se(t.floorPlan,Array.from(e.placements.values()));return{...e,satisfiedClues:o,errorClues:a,victimVisible:n!==null,victimCell:n}}const rt=50;class ct{constructor(){W(this,"past",[]);W(this,"future",[])}push(t){this.past.push(new Map(t)),this.past.length>rt&&this.past.shift(),this.future=[]}undo(t){return this.past.length===0?null:(this.future.push(new Map(t)),new Map(this.past.pop()))}redo(t){return this.future.length===0?null:(this.past.push(new Map(t)),new Map(this.future.pop()))}canUndo(){return this.past.length>0}canRedo(){return this.future.length>0}clear(){this.past=[],this.future=[]}}let j=null,V=!1;function lt(){if(V)return null;try{return j||(j=new AudioContext),j.state==="suspended"&&j.resume().catch(()=>{}),j}catch{return null}}function T(e,t,o="sine",a=.15){const n=lt();if(n)try{const s=n.createOscillator(),i=n.createGain();s.connect(i),i.connect(n.destination),s.type=o,s.frequency.value=e,i.gain.setValueAtTime(a,n.currentTime),i.gain.exponentialRampToValueAtTime(.001,n.currentTime+t),s.start(n.currentTime),s.stop(n.currentTime+t)}catch{}}function _(e){switch(e){case"place":T(440,.08,"sine",.12);break;case"remove":T(330,.06,"sine",.08);break;case"clue-satisfied":T(660,.12,"sine",.15);break;case"solve":{T(523,.15,"sine",.2),setTimeout(()=>T(659,.15,"sine",.2),150),setTimeout(()=>T(784,.3,"sine",.25),300);break}case"error":T(220,.2,"square",.1);break;case"navigate":T(880,.05,"sine",.08);break}}function dt(){return V=!V,V}function ut(e,t){const o=Math.floor(t/6e4),a=Math.floor(t%6e4/1e3),n=o>0?`${o}m ${a}s`:`${a}s`,s=e.difficulty.charAt(0).toUpperCase()+e.difficulty.slice(1);return["🔍 ALIBI",`Case: ${e.floorPlan===e.floorPlan?e.themeId.replace(/-/g," ").replace(/\b\w/g,i=>i.toUpperCase()):"Unknown"}`,`Difficulty: ${s}`,`Clues: ${e.clues.length}`,`Time: ${n}`,`Killer: ${e.killer.name}`,"","pnz1990.github.io/alibi/"].join(`
`)}async function ft(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;const t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:-9999px;left:-9999px;",document.body.appendChild(t),t.focus(),t.select();const o=document.execCommand("copy");return document.body.removeChild(t),o}catch{return!1}}const se={campaign:e=>`alibi_campaign_${e}`,daily:e=>`alibi_daily_${e}`,streak:"alibi_streak",stats:"alibi_stats",prefs:"alibi_prefs",puzzleState:"alibi_puzzle_state"};function mt(e){try{const t=re();t[e.key]=e,localStorage.setItem(se.puzzleState,JSON.stringify(t))}catch{}}function pt(e){try{return re()[e]??null}catch{return null}}function pe(e){try{const t=re();delete t[e],localStorage.setItem(se.puzzleState,JSON.stringify(t))}catch{}}function re(){try{const e=localStorage.getItem(se.puzzleState);return e?JSON.parse(e):{}}catch{return{}}}const ht=`
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
`;let he=!1;function bt(){if(he)return;const e=document.createElement("style");e.textContent=ht,document.head.appendChild(e),he=!0}function yt(e,t,o,a,n){bt();const s=t.floorPlan,i=document.createElement("div");i.className="alibi-radial-overlay",i.style.cssText=`position:absolute;top:0;left:0;width:${s.width*h}px;height:${s.height*h}px;`,e.style.position="relative",e.appendChild(i);const r=[];for(let c=0;c<s.height;c++){r[c]=[];for(let u=0;u<s.width;u++){const b=s.tiles[c][u],m=document.createElement("div");m.setAttribute("data-testid",`cell-${u}-${c}`),m.style.cssText=`position:absolute;left:${u*h}px;top:${c*h}px;width:${h}px;height:${h}px;`,N(b)&&(m.classList.add("alibi-cell-overlay","placeable"),m.addEventListener("click",g=>{g.stopPropagation(),gt(u,c,a,t,n)})),r[c][u]=m,i.appendChild(m)}}let f=null;const l=()=>H();document.addEventListener("click",l);function d(){const c=a();if(f&&(f.remove(),f=null),c.victimCell){const{x:m,y:g}=c.victimCell;f=document.createElement("div"),f.setAttribute("data-testid","victim-cell"),f.className="alibi-cell-overlay victim-highlight",f.style.cssText=`position:absolute;left:${m*h}px;top:${g*h}px;width:${h}px;height:${h}px;pointer-events:all;`,f.addEventListener("click",v=>{v.stopPropagation(),n.onVictimClick()}),i.appendChild(f)}const u=new Set,b=new Set;for(const m of c.placements.values())u.add(m.y),b.add(m.x);for(let m=0;m<s.height;m++)for(let g=0;g<s.width;g++){const v=r[m]?.[g];if(!v)continue;const w=s.tiles[m][g],I=u.has(m)||b.has(g),A=Array.from(c.placements.values()).some(B=>B.x===g&&B.y===m);v.style.pointerEvents=N(w)&&(!I||A)?"all":"none"}}function p(){document.removeEventListener("click",l),i.remove()}return d(),{updateOverlays:d,detach:p}}let q=null;function H(){q&&(q.remove(),q=null)}function gt(e,t,o,a,n){H();const s=o(),i=Array.from(s.placements.entries()).find(([,c])=>c.x===e&&c.y===t),r=document.createElement("div");r.className="alibi-radial-menu",r.setAttribute("data-testid","radial-menu");const l=document.getElementById("game-canvas")?.getBoundingClientRect()??{left:0,top:0};r.style.left=`${l.left+(e+1)*h}px`,r.style.top=`${l.top+t*h}px`;const d=new Set(s.placements.keys()),p=a.suspects.filter(c=>!d.has(c.id));for(const c of p){const u=document.createElement("div");u.className="alibi-radial-item",u.setAttribute("data-testid",`suspect-option-${c.id}`),u.textContent=c.name,u.addEventListener("click",b=>{b.stopPropagation(),H(),n.onPlace(c.id,e,t)}),r.appendChild(u)}if(i){const c=document.createElement("div");c.className="alibi-radial-item alibi-radial-clear",c.setAttribute("data-testid","suspect-option-clear"),c.textContent="Clear",c.addEventListener("click",u=>{u.stopPropagation(),H(),n.onRemove(i[0])}),r.appendChild(c)}r.children.length!==0&&(document.body.appendChild(r),q=r)}function xt(e){return`${e.seed}-${e.themeId}-${e.difficulty}`}function vt(e){const t=new URLSearchParams(location.search),o=t.get("theme")??"coffee-shop",a=t.get("difficulty")??"easy",n=parseInt(t.get("seed")??"0",10),s=Ve(o),i=Le(n,s,a),r=xt(i),f=Ct(),l=f.querySelector(".alibi-canvas-wrapper"),d=f.querySelector(".alibi-sidebar-container"),p=document.getElementById("game-canvas"),c=p.getContext("2d"),{width:u,height:b}=Je(i);p.width=u,p.height=b,l.appendChild(p);let m=me();const g=new ct;function v(y,x){const k={};x.placements.forEach((S,R)=>{k[R]={x:S.x,y:S.y}}),mt({key:y,placements:k,elapsedMs:x.elapsedMs,savedAt:new Date().toISOString()})}function w(){Ke(c,i,s,m.placements,m.victimCell),et(d,i,m.placements,m.satisfiedClues,m.errorClues),I.updateOverlays()}const I=yt(l,i,s,()=>m,{onPlace(y,x,k){m.phase==="playing"&&(g.push(m.placements),m=at(m,i,y,x,k),v(r,m),_(m.satisfiedClues.size>0?"clue-satisfied":"place"),w())},onRemove(y){m.phase==="playing"&&(g.push(m.placements),m=it(m,i,y),v(r,m),_("remove"),w())},onVictimClick(){if(m.phase!=="playing")return;const y=st(m);y.phase==="guilty"?(m=y,pe(r),_("solve"),w(),nt(document.body,i),kt(i,m)):(_("error"),w(),ot(document.body))}}),A=f.querySelector('[data-testid="btn-undo"]'),B=f.querySelector('[data-testid="btn-redo"]');A.addEventListener("click",U),B.addEventListener("click",P);function U(){const y=g.undo(m.placements);y&&(m=J(m,i,y),w())}function P(){const y=g.redo(m.placements);y&&(m=J(m,i,y),w())}const z=f.querySelector('[data-testid="btn-mute"]');z.addEventListener("click",()=>{const y=dt();z.textContent=y?"🔇":"🔊"}),document.addEventListener("keydown",y=>{(y.ctrlKey||y.metaKey)&&y.key==="z"&&!y.shiftKey&&(U(),y.preventDefault()),(y.ctrlKey||y.metaKey)&&(y.key==="y"||y.key==="z"&&y.shiftKey)&&(P(),y.preventDefault())});const E=pt(r);E&&Object.keys(E.placements).length>0?Et(f,()=>{const y=new Map(Object.entries(E.placements).map(([x,k])=>[x,{suspectId:x,x:k.x,y:k.y}]));m=J(me(),i,y),m={...m,elapsedMs:E.elapsedMs},w(),K(document.body,i,()=>{})},()=>{pe(r),K(document.body,i,()=>{})}):K(document.body,i,()=>{}),w()}const wt=`
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
`;let be=!1;function St(){if(be)return;const e=document.createElement("style");e.textContent=wt,document.head.appendChild(e),be=!0}function Ct(){St();const e=document.createElement("div");e.setAttribute("data-testid","screen-game"),e.className="alibi-game-screen";const t=document.createElement("div");t.className="alibi-canvas-wrapper";const o=document.createElement("div");o.style.cssText="display:flex;flex-direction:column;height:100vh;flex:1;";const a=document.createElement("div");a.className="alibi-toolbar";const n=X("btn-undo","↩ Undo"),s=X("btn-redo","↪ Redo"),i=X("btn-mute","🔊");a.append(n,s,i);const r=document.createElement("div");r.className="alibi-sidebar-container",o.append(a,r),e.append(t,o);const f=document.getElementById("game-canvas");return f.parentElement?.insertBefore(e,f),e}function X(e,t){const o=document.createElement("button");return o.setAttribute("data-testid",e),o.textContent=t,o}function kt(e,t){const o=document.createElement("button");o.setAttribute("data-testid","btn-share"),o.style.cssText="position:fixed;bottom:24px;right:24px;z-index:300;background:#c0392b;color:#fff;border:none;padding:10px 20px;font-family:monospace;font-size:14px;cursor:pointer;border-radius:4px;",o.textContent="📋 Share Result",o.addEventListener("click",async()=>{const a=ut(e,t.elapsedMs),n=await ft(a);o.textContent=n?"✓ Copied!":"📋 Share Result",n&&setTimeout(()=>{o.textContent="📋 Share Result"},2e3)}),document.body.appendChild(o)}function Et(e,t,o){const a=document.createElement("div");a.setAttribute("data-testid","prompt-resume"),a.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:150;font-family:monospace;";const n=document.createElement("div");n.style.cssText="background:#1a1a2e;border:2px solid #c0392b;border-radius:8px;padding:28px;max-width:360px;text-align:center;color:#fff;";const s=document.createElement("h2");s.style.cssText="color:#c0392b;margin-bottom:12px;",s.textContent="Resume Investigation?";const i=document.createElement("p");i.style.cssText="color:#aaa;margin-bottom:20px;font-size:0.9em;",i.textContent="You have an in-progress case. Resume where you left off?";const r=document.createElement("button");r.style.cssText="background:#c0392b;color:#fff;border:none;padding:9px 20px;font-family:monospace;cursor:pointer;border-radius:4px;margin-right:8px;",r.textContent="Resume",r.addEventListener("click",()=>{a.remove(),t()});const f=document.createElement("button");f.style.cssText="background:#333;color:#fff;border:none;padding:9px 20px;font-family:monospace;cursor:pointer;border-radius:4px;",f.textContent="Start Fresh",f.addEventListener("click",()=>{a.remove(),o()}),n.append(s,i,r,f),a.appendChild(n),e.appendChild(a)}const $t=`
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
`;let ye=!1;function Rt(){if(ye)return;const e=document.createElement("style");e.textContent=$t,document.head.appendChild(e),ye=!0}function Tt(){Rt();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-home"),t.className="alibi-home";const o=document.createElement("div");o.className="alibi-home-title",o.textContent="ALIBI";const a=document.createElement("div");a.className="alibi-home-subtitle",a.textContent="A murder mystery deduction game";const n=document.createElement("div");n.className="alibi-home-buttons",n.appendChild(Q("btn-campaign","primary","📁 Campaign","12 escalating cases")),n.appendChild(Q("btn-quickplay","secondary","🎲 Quick Play","Pick theme and difficulty")),n.appendChild(Q("btn-daily","secondary","📅 Daily Case","Today's case · same worldwide")),t.append(o,a,n),document.body.appendChild(t),t.querySelector('[data-testid="btn-quickplay"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=quickplay`}),t.querySelector('[data-testid="btn-campaign"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=campaign`}),t.querySelector('[data-testid="btn-daily"]').addEventListener("click",()=>{t.remove();const{seed:s,themeId:i,difficulty:r}=Nt();window.location.href=`${window.location.pathname}?theme=${i}&difficulty=${r}&seed=${s}`})}function Q(e,t,o,a){const n=document.createElement("button");n.setAttribute("data-testid",e),n.className=`alibi-home-btn ${t}`;const s=document.createElement("span");s.className="btn-title",s.textContent=o;const i=document.createElement("span");return i.className="btn-desc",i.textContent=a,n.append(s,i),n}const ge=[{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"coffee-shop",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"}];function It(e){let t=5381;for(let o=0;o<e.length;o++)t=(t<<5)+t+e.charCodeAt(o)|0;return Math.abs(t)}function Nt(){const e=new Date,t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,o=It(t),a=Math.floor((e.getTime()-new Date(e.getFullYear(),0,0).getTime())/864e5),{themeId:n,difficulty:s}=ge[a%ge.length];return{seed:o,themeId:n,difficulty:s}}const Bt=`
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
`;let xe=!1;function Ft(){if(xe)return;const e=document.createElement("style");e.textContent=Bt,document.head.appendChild(e),xe=!0}const At=[{title:"The Coffee Shop",difficulty:"easy",seed:100},{title:"The Bookstore",difficulty:"easy",seed:101},{title:"The Backyard",difficulty:"easy",seed:102},{title:"The Holiday Mall",difficulty:"easy",seed:103},{title:"The Coffee Shop",difficulty:"medium",seed:200},{title:"The Bookstore",difficulty:"medium",seed:201},{title:"The Backyard",difficulty:"medium",seed:202},{title:"The Holiday Mall",difficulty:"medium",seed:203},{title:"The Coffee Shop",difficulty:"hard",seed:300},{title:"The Bookstore",difficulty:"hard",seed:301},{title:"The Backyard",difficulty:"hard",seed:302},{title:"The Holiday Mall",difficulty:"hard",seed:303}];function Lt(){Ft();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-campaign-board"),t.className="alibi-campaign-board";const o=document.createElement("div");o.className="alibi-campaign-header";const a=document.createElement("button");a.className="alibi-campaign-back",a.textContent="← Home",a.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="📁 Campaign",o.append(a,n);const s=document.createElement("div");s.className="alibi-case-grid",At.forEach((i,r)=>{const f=document.createElement("div");f.setAttribute("data-testid",`case-card-${r}`),f.className=`alibi-case-card ${r===0?"unlocked":"locked"}`;const l=document.createElement("div");l.className="alibi-case-num",l.textContent=`Case ${r+1}`;const d=document.createElement("div");d.className="alibi-case-title",d.textContent=r===0?i.title:"???";const p=document.createElement("div");p.className=`alibi-case-difficulty ${i.difficulty}`,p.textContent=i.difficulty.charAt(0).toUpperCase()+i.difficulty.slice(1);const c=document.createElement("div");c.setAttribute("data-testid",`case-status-${r}`),c.className=`alibi-case-status ${r===0?"":"locked"}`,c.textContent=r===0?"📁":"🔒",f.append(l,d,p,c),r===0&&f.addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?theme=coffee-shop&difficulty=${i.difficulty}&seed=${i.seed}`}),s.appendChild(f)}),t.append(o,s),document.body.appendChild(t)}const jt=`
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
`,Mt={"coffee-shop":"☕",bookstore:"📚",backyard:"🌿","holiday-mall":"🎄",restaurant:"🍽",gym:"💪",office:"🏢","garden-party":"🌸",hospital:"🏥",carnival:"🎡"};let ve=!1;function Ot(){if(ve)return;const e=document.createElement("style");e.textContent=jt,document.head.appendChild(e),ve=!0}function Pt(){Ot();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-theme-select"),t.className="alibi-theme-select";const o=document.createElement("div");o.className="alibi-theme-select-header";const a=document.createElement("button");a.className="alibi-theme-back",a.textContent="← Home",a.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="🎲 Quick Play",o.append(a,n);let s="easy";const i=document.createElement("div");i.className="alibi-difficulty-row";const r={};for(const[c,u]of[["easy","Easy"],["medium","Medium"],["hard","Hard"]]){const b=document.createElement("button");b.setAttribute("data-testid",`difficulty-${c}`),b.className=`alibi-diff-btn ${c}${c==="easy"?" selected":""}`,b.textContent=u,b.addEventListener("click",()=>{s=c,Object.values(r).forEach(m=>m.classList.remove("selected")),b.classList.add("selected")}),r[c]=b,i.appendChild(b)}let f=null;const l=document.createElement("div");l.className="alibi-theme-grid";const d={};for(const c of qe()){if(c.id==="stub")continue;const u=document.createElement("div");u.setAttribute("data-testid",`theme-card-${c.id}`),u.className="alibi-theme-card";const b=document.createElement("div");b.className="alibi-theme-icon",b.textContent=Mt[c.id]??"🔍";const m=document.createElement("div");m.textContent=c.name.replace(/^The /,""),u.append(b,m),u.addEventListener("click",()=>{f=c.id,Object.values(d).forEach(g=>g.classList.remove("selected")),u.classList.add("selected"),p.disabled=!1}),d[c.id]=u,l.appendChild(u)}const p=document.createElement("button");p.setAttribute("data-testid","btn-play"),p.className="alibi-play-btn",p.textContent="Play",p.disabled=!0,p.addEventListener("click",()=>{if(!f)return;const c=Math.floor(Math.random()*4294967295);t.remove(),window.location.href=`${window.location.pathname}?theme=${f}&difficulty=${s}&seed=${c}`}),t.append(o,i,l,p),document.body.appendChild(t)}const D=new URLSearchParams(location.search);if(D.has("theme")||D.has("difficulty")||D.has("seed"))vt();else switch(D.get("mode")){case"campaign":Lt();break;case"quickplay":Pt();break;default:Tt();break}

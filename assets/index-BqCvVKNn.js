var ve=Object.defineProperty;var we=(e,t,o)=>t in e?ve(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var q=(e,t,o)=>we(e,typeof t!="symbol"?t+"":t,o);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const Se=new Set(["F","C","S","B"]);function F(e){return Se.has(e)}function L(e){return e==="C"||e==="S"||e==="B"}function Q(e){const t=[];for(let o=0;o<e.width;o++)for(let i=0;i<e.height;i++)if(F(e.tiles[i][o])){t.push(o);break}return t}function ee(e){const t=[];for(let o=0;o<e.height;o++)for(let i=0;i<e.width;i++)if(F(e.tiles[o][i])){t.push(o);break}return t}function E(e,t,o){for(const i of e.rooms)for(const[n,s]of i.cells)if(n===t&&s===o)return i.id;return null}function he(e){const t=new Set,o=new Set;for(const i of e)t.add(i.y),o.add(i.x);return{blockedRows:t,blockedCols:o}}function be(e,t){const{blockedRows:o,blockedCols:i}=he(t),n=[];for(let s=0;s<e.height;s++)if(!o.has(s))for(let a=0;a<e.width;a++)i.has(a)||F(e.tiles[s][a])&&n.push({x:a,y:s});return n.length===1?n[0]:null}function Ce(e,t,o){const i=E(e,o.x,o.y);if(i===null)return null;for(const n of t)if(E(e,n.x,n.y)===i)return n.suspectId;return null}function se(e,t,o,i){return Math.max(Math.abs(e-o),Math.abs(t-i))}function Z(e,t,o){const i=o.get(t.suspectId);if(!i)return null;switch(t.type){case"inRoom":return E(e,i.x,i.y)===t.roomId;case"notInRoom":return E(e,i.x,i.y)!==t.roomId;case"inSameRoom":{const n=o.get(t.otherSuspectId);if(!n)return null;const s=E(e,i.x,i.y),a=E(e,n.x,n.y);return s!==null&&s===a}case"inDifferentRoom":{const n=o.get(t.otherSuspectId);if(!n)return null;const s=E(e,i.x,i.y),a=E(e,n.x,n.y);return s===null||a===null?null:s!==a}case"inColumn":return i.x===t.col;case"inRow":return i.y===t.row;case"besideSuspect":{const n=o.get(t.otherSuspectId);return n?se(i.x,i.y,n.x,n.y)<=1:null}case"notBesideSuspect":{const n=o.get(t.otherSuspectId);return n?se(i.x,i.y,n.x,n.y)>1:null}case"besideObject":{for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++){if(s===0&&n===0)continue;const a=i.x+s,r=i.y+n;if(!(a<0||r<0||a>=e.width||r>=e.height)&&e.tiles[r][a]===t.objectTile)return!0}return!1}case"notBesideObject":{for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++){if(s===0&&n===0)continue;const a=i.x+s,r=i.y+n;if(!(a<0||r<0||a>=e.width||r>=e.height)&&e.tiles[r][a]===t.objectTile)return!1}return!0}case"onSeatTile":return L(e.tiles[i.y][i.x]);case"notOnSeatTile":return!L(e.tiles[i.y][i.x]);case"northOf":{const n=o.get(t.otherSuspectId);return n?i.y<n.y:null}case"southOf":{const n=o.get(t.otherSuspectId);return n?i.y>n.y:null}case"exactlyNRowsNorth":{const n=o.get(t.otherSuspectId);return n?n.y-i.y===t.n:null}case"exactlyNRowsSouth":{const n=o.get(t.otherSuspectId);return n?i.y-n.y===t.n:null}}}const Re={easy:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom"],medium:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile"],hard:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile","notOnSeatTile","northOf","southOf","exactlyNRowsNorth","exactlyNRowsSouth"]};function G(e,t,o){const i=Q(e),n=ee(e);if(t.length===0)return{count:0};if(t.length>Math.min(i.length,n.length))return{count:0};const s=new Set;for(let d=0;d<e.height;d++)for(let u=0;u<e.width;u++)F(e.tiles[d][u])&&s.add(`${u},${d}`);let a=0,r;const m=new Map,l=new Set,c=new Set;function p(d){if(a>=2)return;if(d===t.length){for(const y of o)if(Z(e,y,m)!==!0)return;a++,a===1&&(r=new Map(m));return}const u=t[d];for(const y of n)if(!l.has(y))for(const f of i){if(c.has(f)||!s.has(`${f},${y}`))continue;const g={suspectId:u,x:f,y};m.set(u,g),l.add(y),c.add(f);let v=!1;for(const w of o)if((w.suspectId===u||w.otherSuspectId===u)&&Z(e,w,m)===!1){v=!0;break}if(v||p(d+1),m.delete(u),l.delete(y),c.delete(f),a>=2)return}}return p(0),{count:a,firstSolution:r}}class ke extends Error{constructor(t){super(t),this.name="PuzzleGenerationError"}}function Ee(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let o=Math.imul(t^t>>>15,1|t);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296}}function ye(e,t){return Math.floor(e()*t)}function C(e,t){return t[ye(e,t.length)]}function A(e,t){const o=[...t];for(let i=o.length-1;i>0;i--){const n=ye(e,i+1);[o[i],o[n]]=[o[n],o[i]]}return o}function $e(e,t,o,i){const n=Re[o],s=i.landmarks.length>=2,a=i.tiles.some(c=>c.some(p=>L(p))),r=n.filter(c=>!((c==="besideObject"||c==="notBesideObject")&&!s||(c==="onSeatTile"||c==="notOnSeatTile")&&!a)),m=Math.ceil(t*.4),l=[];for(let c=0;c<t;c++){const p=new Set;l.length>0&&p.add(l[l.length-1]);for(const g of r)l.filter(w=>w===g).length>=m&&p.add(g);const d=r.filter(g=>!p.has(g)),u=d.length>0?d:r,y=u.filter(g=>!l.includes(g)),f=y.length>0?y:u;l.push(C(e,f))}return l}function O(e,t,o,i,n,s,a){const r=a.get(n.id),m=o.clueTemplates;switch(i){case"inRoom":{const l=E(t,r.x,r.y);if(!l)return null;const c=t.rooms.find(p=>p.id===l);return{type:"inRoom",suspectId:n.id,roomId:l,text:m.inRoom(n.name,c.name)}}case"notInRoom":{const l=E(t,r.x,r.y),c=t.rooms.filter(d=>d.id!==l);if(c.length===0)return null;const p=C(e,c);return{type:"notInRoom",suspectId:n.id,roomId:p.id,text:m.notInRoom(n.name,p.name)}}case"inSameRoom":{const l=E(t,r.x,r.y);if(!l)return null;const c=s.filter(d=>{if(d.id===n.id)return!1;const u=a.get(d.id);return E(t,u.x,u.y)===l});if(c.length===0)return null;const p=C(e,c);return{type:"inSameRoom",suspectId:n.id,otherSuspectId:p.id,text:m.inSameRoom(n.name,p.name)}}case"inDifferentRoom":{const l=E(t,r.x,r.y),c=s.filter(d=>{if(d.id===n.id)return!1;const u=a.get(d.id),y=E(t,u.x,u.y);return y!==null&&y!==l});if(c.length===0)return null;const p=C(e,c);return{type:"inDifferentRoom",suspectId:n.id,otherSuspectId:p.id,text:m.inDifferentRoom(n.name,p.name)}}case"inColumn":return{type:"inColumn",suspectId:n.id,col:r.x,text:m.inColumn(n.name,r.x+1)};case"inRow":return{type:"inRow",suspectId:n.id,row:r.y,text:m.inRow(n.name,r.y+1)};case"besideSuspect":{const l=s.filter(p=>{if(p.id===n.id)return!1;const d=a.get(p.id);return Math.max(Math.abs(r.x-d.x),Math.abs(r.y-d.y))<=1});if(l.length===0)return null;const c=C(e,l);return{type:"besideSuspect",suspectId:n.id,otherSuspectId:c.id,text:m.besideSuspect(n.name,c.name)}}case"notBesideSuspect":{const l=s.filter(p=>{if(p.id===n.id)return!1;const d=a.get(p.id);return Math.max(Math.abs(r.x-d.x),Math.abs(r.y-d.y))>1});if(l.length===0)return null;const c=C(e,l);return{type:"notBesideSuspect",suspectId:n.id,otherSuspectId:c.id,text:m.notBesideSuspect(n.name,c.name)}}case"besideObject":{if(t.landmarks.length===0)return null;const l=t.landmarks.filter(d=>Math.max(Math.abs(r.x-d.x),Math.abs(r.y-d.y))<=1);if(l.length===0)return null;const c=C(e,l),p=t.tiles[c.y][c.x];return{type:"besideObject",suspectId:n.id,objectTile:p,text:m.besideObject(n.name,c.name)}}case"notBesideObject":{if(t.landmarks.length===0)return null;const l=t.landmarks.filter(d=>Math.max(Math.abs(r.x-d.x),Math.abs(r.y-d.y))>1);if(l.length===0)return null;const c=C(e,l),p=t.tiles[c.y][c.x];return{type:"notBesideObject",suspectId:n.id,objectTile:p,text:m.notBesideObject(n.name,c.name)}}case"onSeatTile":{const l=t.tiles[r.y][r.x];if(!L(l))return null;const c=l==="C"?"chair":l==="S"?"sofa":"bed";return{type:"onSeatTile",suspectId:n.id,text:m.onSeatTile(n.name,c)}}case"notOnSeatTile":{const l=t.tiles[r.y][r.x];return L(l)?null:{type:"notOnSeatTile",suspectId:n.id,text:m.notOnSeatTile(n.name)}}case"northOf":{const l=s.filter(p=>{if(p.id===n.id)return!1;const d=a.get(p.id);return r.y<d.y});if(l.length===0)return null;const c=C(e,l);return{type:"northOf",suspectId:n.id,otherSuspectId:c.id,text:m.northOf(n.name,c.name)}}case"southOf":{const l=s.filter(p=>{if(p.id===n.id)return!1;const d=a.get(p.id);return r.y>d.y});if(l.length===0)return null;const c=C(e,l);return{type:"southOf",suspectId:n.id,otherSuspectId:c.id,text:m.southOf(n.name,c.name)}}case"exactlyNRowsNorth":{const l=[];for(const p of s){if(p.id===n.id)continue;const u=a.get(p.id).y-r.y;u>0&&l.push({suspect:p,n:u})}if(l.length===0)return null;const c=C(e,l);return{type:"exactlyNRowsNorth",suspectId:n.id,otherSuspectId:c.suspect.id,n:c.n,text:m.exactlyNRowsNorth(n.name,c.suspect.name,c.n)}}case"exactlyNRowsSouth":{const l=[];for(const p of s){if(p.id===n.id)continue;const d=a.get(p.id),u=r.y-d.y;u>0&&l.push({suspect:p,n:u})}if(l.length===0)return null;const c=C(e,l);return{type:"exactlyNRowsSouth",suspectId:n.id,otherSuspectId:c.suspect.id,n:c.n,text:m.exactlyNRowsSouth(n.name,c.suspect.name,c.n)}}}}function Te(e,t,o,i=1e3){const n=A(e,Q(t)),s=A(e,ee(t)),a=o.length;if(a<1||a>Math.min(n.length,s.length))return null;let r=0;const m=new Map,l=new Set,c=new Set,p=A(e,s).slice(0,a);function d(u){if(u===a)return!0;const y=o[u],f=p[u],g=A(e,n);for(const v of g)if(!c.has(v)&&F(t.tiles[f]?.[v])){if(m.set(y.id,{suspectId:y.id,x:v,y:f}),l.add(f),c.add(v),d(u+1))return!0;if(r++,m.delete(y.id),l.delete(f),c.delete(v),r>=i)return!1}return!1}return d(0)?m:null}function Ie(e,t,o){for(let n=0;n<20;n++){const s=e+n*97>>>0,a=Ee(s),r=t.floorPlans[o],m=Q(r),l=ee(r),c=Math.min(m.length,l.length)-1;if(c<2)continue;const u=A(a,[...t.suspectNames]).slice(0,c).map((x,R)=>({id:`s${R}`,name:x})),y=C(a,t.victimNames),f=Te(a,r,u);if(!f)continue;const g=Array.from(f.values()),v=be(r,g);if(!v)continue;const w=Ce(r,g,v);if(!w)continue;const I=u.find(x=>x.id===w),j=C(a,t.narrativeTemplates.intro),N=C(a,t.narrativeTemplates.victimFound),P=C(a,t.narrativeTemplates.guiltyText).replace("{{killerName}}",I.name).replace("{{evidenceText}}","the evidence is conclusive"),_=$e(a,c,o,r),k=[];for(let x=0;x<c;x++){const R=u[x],S=_[x];let $=O(a,r,t,S,R,u,f);$||($=O(a,r,t,"inRow",R,u,f)),$||($=O(a,r,t,"inColumn",R,u,f)),$&&k.push($)}let b=G(r,u.map(x=>x.id),k);if(b.count!==0){if(b.count!==1)for(const x of u){if(b.count===1)break;if(!k.some(S=>S.type==="inRow"&&S.suspectId===x.id)){const S=O(a,r,t,"inRow",x,u,f);S&&k.push(S),b=G(r,u.map($=>$.id),k)}}if(b.count!==1)for(const x of u){if(b.count===1)break;if(!k.some(S=>S.type==="inColumn"&&S.suspectId===x.id)){const S=O(a,r,t,"inColumn",x,u,f);S&&k.push(S),b=G(r,u.map($=>$.id),k)}}if(b.count===1)return{seed:s,themeId:t.id,difficulty:o,suspects:u,victimName:y,clues:k,solution:f,victimCell:v,killer:I,narrativeIntro:j,narrativeVictimFound:N,narrativeGuilty:P,floorPlan:r}}}throw new ke(`Failed to generate unique puzzle after 20 retries (seed=${e}, theme=${t.id}, difficulty=${o})`)}const Fe={width:5,height:6,tiles:[["bB","bB","bB","W","W"],["F","F","F","C","F"],["pL","F","C","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"],["W","cR","W","F","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[3,1],[4,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"restroom",name:"Restroom",cells:[[1,5],[3,5],[4,5]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-entrance",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},Ne={width:6,height:7,tiles:[["bB","bB","bB","bB","W","W"],["F","F","F","F","C","F"],["pL","F","C","F","F","F"],["F","S","F","pL","F","C"],["F","F","tB","F","F","F"],["C","F","F","F","W","F"],["W","cR","W","W","W","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5]]},{id:"restroom",name:"Restroom",cells:[[1,6],[5,5],[5,6]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-door",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:3,y:3},{id:"table",name:"the table",x:2,y:4},{id:"cash-register",name:"the cash register",x:1,y:6}]},Be={width:7,height:8,tiles:[["bB","bB","bB","bB","bB","W","W"],["F","F","F","F","F","C","F"],["F","C","F","pL","F","F","F"],["pL","F","S","F","C","F","pL"],["F","F","F","tB","F","F","F"],["F","C","F","F","F","tB","C"],["F","F","F","F","F","W","F"],["W","cR","W","F","C","W","F"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]]},{id:"main-area",name:"Main Area",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[6,6]]},{id:"restroom",name:"Restroom",cells:[[1,7]]},{id:"back-office",name:"Back Office",cells:[[3,7],[4,7],[6,7]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-1",name:"the plant",x:3,y:2},{id:"plant-2",name:"the plant",x:0,y:3},{id:"plant-3",name:"the plant",x:6,y:3},{id:"table",name:"the table",x:3,y:4},{id:"table-2",name:"the small table",x:5,y:5},{id:"cash-register",name:"the cash register",x:1,y:7}]},B={"coffee-shop":{easy:Fe,medium:Ne,hard:Be}};function re(e){const t=["th","st","nd","rd"],o=e%100;return e+(t[(o-20)%10]??t[o]??t[0])}const je={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the café.`,inColumn:(e,t)=>`${e} was in the ${re(t)} column.`,inRow:(e,t)=>`${e} was in the ${re(t)} row.`,besideSuspect:(e,t)=>`${e} was standing next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>t==="chair"?`${e} was sitting in a chair.`:t==="sofa"?`${e} was on the sofa.`:`${e} was on the ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} south of ${t}.`},Oe={id:"coffee-shop",name:"The Coffee Shop",floorPlans:{easy:B["coffee-shop"].easy,medium:B["coffee-shop"].medium,hard:B["coffee-shop"].hard},suspectNames:["Alice","Ben","Chloe","Diego","Elena","Finlay","Grace","Hassan","Iris","Jake","Lena","Marco"],victimNames:["Victor","Violet","Vera","Valencia","Vance","Vivian"],clueTemplates:je,narrativeTemplates:{intro:["A body has been found at the Copper Bean Café. The morning rush never arrived — instead, the regulars found yellow tape across the door. You pour yourself an espresso and get to work.","The Copper Bean Café is closed for a very different reason today. Someone is dead, and the witnesses are all still clutching their lattes. You take out your notebook.","It was supposed to be a quiet Tuesday at the Copper Bean. Then the screaming started. Now it's your problem. You order a black coffee and begin."],victimFound:["The victim was discovered near table four, cold cup of coffee still in hand.","Staff found the victim behind the counter during the morning prep.","A regular spotted the victim slumped in the corner booth before opening."],guiltyText:["{{killerName}} — served with a side of motive.","{{killerName}} — the evidence is as clear as an Americano.","{{killerName}} — there's no running from the detective on this one."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:plant":"","object:cash-register":"","object:table":""}},Me={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same room as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different rooms.`,inColumn:(e,t)=>`${e} was in column ${t}.`,inRow:(e,t)=>`${e} was in row ${t}.`,besideSuspect:(e,t)=>`${e} was beside ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>`${e} was on a ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} south of ${t}.`},Ae={id:"stub",name:"Test Room",floorPlans:{easy:B["coffee-shop"].easy,medium:B["coffee-shop"].medium,hard:B["coffee-shop"].hard},suspectNames:["Alice","Bob","Carol","Dave","Eve","Frank","Grace","Henry","Iris","Jack","Kate","Leo"],victimNames:["Vera","Victor","Violet","Valencia","Vance","Vivian"],clueTemplates:Me,narrativeTemplates:{intro:["A crime has occurred in the Test Room.","Witnesses report suspicious activity.","The detective arrives on the scene."],victimFound:["The victim was found at the scene.","A body has been discovered.","The victim was discovered here."],guiltyText:["{{killerName}} — caught red-handed.","{{killerName}} — the evidence is clear.","{{killerName}} — guilty as charged."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{}},ge=new Map;function xe(e){ge.set(e.id,e)}function Le(e){const t=ge.get(e);if(!t)throw new Error(`Unknown theme: ${e}`);return t}xe(Oe);xe(Ae);function Pe(e,t){return t[e]??""}const h=64,H=new Map;function _e(e){if(!e)return null;if(H.has(e))return H.get(e);const t=new Image,o=new Blob([e],{type:"image/svg+xml"}),i=URL.createObjectURL(o);return t.onload=()=>{H.set(e,t),URL.revokeObjectURL(i)},t.src=i,null}function le(e,t,o,i){e.fillStyle="#c8a96e",e.fillRect(t,o,h,h),e.fillStyle="#ffffff",e.font="8px monospace",e.textAlign="center",e.textBaseline="middle",e.fillText(i.slice(0,4),t+h/2,o+h/2),e.textAlign="left",e.textBaseline="alphabetic"}function ze(e){let t=0;for(let o=0;o<e.length;o++)t=t*31+e.charCodeAt(o)&65535;return`hsl(${t%360}, 65%, 55%)`}const Ve={pL:"object:plant",tB:"object:table",sH:"object:shelf",cR:"object:cash-register",bB:"object:bar-counter",tV:"object:tv",cT:"object:counter",dK:"object:desk",pC:"object:photocopier",fB:"object:flower-bed",hB:"object:hospital-bed",mC:"object:medicine-cabinet",tR:"object:tree",tD:"object:teddy-bear",cH:"object:carousel-horse",tM:"object:treadmill",wT:"object:weight-rack",sT:"object:stall",jZ:"object:jacuzzi-tile"},De=new Set(["C","S","B"]);function We(e,t,o,i,n){const s=t.floorPlan,a=o.colorPalette,{blockedRows:r,blockedCols:m}=he(Array.from(i.values()));for(let l=0;l<s.height;l++)for(let c=0;c<s.width;c++){const p=s.tiles[l][c],d=c*h,u=l*h;if(p==="W"){e.fillStyle=a.wall,e.fillRect(d,u,h,h);continue}if(De.has(p)){e.fillStyle=a.seat,e.fillRect(d,u,h,h),e.fillStyle="rgba(0,0,0,0.2)",e.beginPath(),e.arc(d+h/2,u+h/2,h*.3,0,Math.PI*2),e.fill(),e.strokeStyle="rgba(0,0,0,0.1)",e.lineWidth=.5,e.strokeRect(d,u,h,h);continue}if(p!=="F"){const y=Ve[p]??`object:${p}`,f=Pe(y,o.spriteMap);if(f){const g=_e(f);g?e.drawImage(g,d,u,h,h):le(e,d,u,y.replace("object:",""))}else le(e,d,u,y.replace("object:",""));continue}e.fillStyle=a.floor,e.fillRect(d,u,h,h),e.strokeStyle="rgba(0,0,0,0.1)",e.lineWidth=.5,e.strokeRect(d,u,h,h)}e.fillStyle="rgba(0, 0, 0, 0.15)";for(const l of r)e.fillRect(0,l*h,s.width*h,h);for(const l of m)e.fillRect(l*h,0,h,s.height*h);if(n){const l=n.x*h,c=n.y*h;e.strokeStyle=a.accent,e.lineWidth=3,e.strokeRect(l+2,c+2,h-4,h-4),e.fillStyle=`${a.accent}33`,e.fillRect(l+2,c+2,h-4,h-4)}for(const[l,c]of i){const p=t.suspects.find(y=>y.id===l);if(!p)continue;const d=c.x*h,u=c.y*h;e.fillStyle=ze(l),e.beginPath(),e.arc(d+h/2,u+h/2,h*.38,0,Math.PI*2),e.fill(),e.fillStyle="#ffffff",e.font=`bold ${Math.floor(h*.4)}px monospace`,e.textAlign="center",e.textBaseline="middle",e.fillText(p.name.charAt(0).toUpperCase(),d+h/2,u+h/2),e.textAlign="left",e.textBaseline="alphabetic"}}function Ue(e){return{width:e.floorPlan.width*h,height:e.floorPlan.height*h}}const qe=`
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
`;let ce=!1;function Ge(){if(ce)return;const e=document.createElement("style");e.textContent=qe,document.head.appendChild(e),ce=!0}function He(e){let t=0;for(let o=0;o<e.length;o++)t=t*31+e.charCodeAt(o)&65535;return`hsl(${t%360}, 65%, 55%)`}function Ke(e,t,o,i,n){Ge(),e.innerHTML="",e.className="alibi-sidebar";const s=document.createElement("div");s.className="alibi-suspect-section";for(const r of t.suspects){const m=document.createElement("div");m.className="alibi-suspect-card"+(o.has(r.id)?" placed":"");const l=document.createElement("div");l.className="alibi-suspect-initial",l.style.background=He(r.id),l.textContent=r.name.charAt(0).toUpperCase();const c=document.createElement("span");c.textContent=r.name,m.appendChild(l),m.appendChild(c),s.appendChild(m)}e.appendChild(s);const a=document.createElement("div");a.className="alibi-clue-section",t.clues.forEach((r,m)=>{const l=document.createElement("div");l.className="alibi-clue-card",l.setAttribute("data-testid",`clue-${m}`),i.has(m)&&l.classList.add("clue-satisfied"),n.has(m)&&l.classList.add("clue-error"),l.textContent=r.text,a.appendChild(l)}),e.appendChild(a)}const Ye=`
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
`;let de=!1;function te(){if(de)return;const e=document.createElement("style");e.textContent=Ye,document.head.appendChild(e),de=!0}function K(e,t,o){te(),ne(e);const i=document.createElement("div");i.className="alibi-overlay",i.setAttribute("data-testid","narrative-intro");const n=document.createElement("div");n.className="alibi-modal";const s=document.createElement("h2");s.textContent="A New Case";const a=document.createElement("p");a.textContent=t.narrativeIntro;const r=document.createElement("button");r.textContent="Begin Investigation",r.addEventListener("click",()=>{i.remove(),o()}),n.appendChild(s),n.appendChild(a),n.appendChild(r),i.appendChild(n),e.appendChild(i)}function Je(e,t){te(),ne(e);const o=t.narrativeGuilty.replace("{{killerName}}",t.killer.name),i=document.createElement("div");i.className="alibi-overlay";const n=document.createElement("div");n.className="alibi-modal";const s=document.createElement("div");s.className="alibi-guilty-stamp",s.setAttribute("data-testid","guilty-stamp"),s.textContent="GUILTY";const a=document.createElement("div");a.className="alibi-guilty-killer",a.setAttribute("data-testid","guilty-killer-name"),a.textContent=t.killer.name;const r=document.createElement("p");r.textContent=o;const m=document.createElement("p");m.textContent=t.narrativeVictimFound,n.appendChild(s),n.appendChild(a),n.appendChild(m),n.appendChild(r),i.appendChild(n),e.appendChild(i)}function ne(e){const t=e.querySelector(".alibi-overlay");t&&t.remove()}function Xe(e){te(),ne(e);const t=document.createElement("div");t.className="alibi-overlay",t.setAttribute("data-testid","msg-clue-gate");const o=document.createElement("div");o.className="alibi-modal";const i=document.createElement("h2");i.textContent="Something Doesn't Add Up…";const n=document.createElement("p");n.textContent="Check the clue cards. Not all witnesses are satisfied.";const s=document.createElement("button");s.textContent="Keep Investigating",s.addEventListener("click",()=>t.remove()),o.appendChild(i),o.appendChild(n),o.appendChild(s),t.appendChild(o),e.appendChild(t),setTimeout(()=>{t.isConnected&&t.remove()},3e3)}function ue(e){return{placements:new Map,satisfiedClues:new Set,errorClues:new Set,victimVisible:!1,victimCell:null,phase:"playing",elapsedMs:0}}function Ze(e,t,o,i,n){const s=new Map(e.placements);return s.set(o,{suspectId:o,x:i,y:n}),oe({...e,placements:s},t)}function Qe(e,t,o){const i=new Map(e.placements);return i.delete(o),oe({...e,placements:i},t)}function Y(e,t,o){return oe({...e,placements:new Map(o)},t)}function et(e){if(e.satisfiedClues.size===0&&e.placements.size>0)return e;const t=e.satisfiedClues.size+e.errorClues.size;return e.errorClues.size===0&&t>0&&e.victimVisible?{...e,phase:"guilty"}:e}function oe(e,t){const o=new Set,i=new Set;t.clues.forEach((a,r)=>{const m=Z(t.floorPlan,a,e.placements);m===!0?o.add(r):m===!1&&i.add(r)});const n=be(t.floorPlan,Array.from(e.placements.values()));return{...e,satisfiedClues:o,errorClues:i,victimVisible:n!==null,victimCell:n}}const tt=50;class nt{constructor(){q(this,"past",[]);q(this,"future",[])}push(t){this.past.push(new Map(t)),this.past.length>tt&&this.past.shift(),this.future=[]}undo(t){return this.past.length===0?null:(this.future.push(new Map(t)),new Map(this.past.pop()))}redo(t){return this.future.length===0?null:(this.past.push(new Map(t)),new Map(this.future.pop()))}canUndo(){return this.past.length>0}canRedo(){return this.future.length>0}clear(){this.past=[],this.future=[]}}let M=null,V=!1;function ot(){if(V)return null;try{return M||(M=new AudioContext),M.state==="suspended"&&M.resume().catch(()=>{}),M}catch{return null}}function T(e,t,o="sine",i=.15){const n=ot();if(n)try{const s=n.createOscillator(),a=n.createGain();s.connect(a),a.connect(n.destination),s.type=o,s.frequency.value=e,a.gain.setValueAtTime(i,n.currentTime),a.gain.exponentialRampToValueAtTime(.001,n.currentTime+t),s.start(n.currentTime),s.stop(n.currentTime+t)}catch{}}function z(e){switch(e){case"place":T(440,.08,"sine",.12);break;case"remove":T(330,.06,"sine",.08);break;case"clue-satisfied":T(660,.12,"sine",.15);break;case"solve":{T(523,.15,"sine",.2),setTimeout(()=>T(659,.15,"sine",.2),150),setTimeout(()=>T(784,.3,"sine",.25),300);break}case"error":T(220,.2,"square",.1);break;case"navigate":T(880,.05,"sine",.08);break}}function it(){return V=!V,V}function at(e,t){const o=Math.floor(t/6e4),i=Math.floor(t%6e4/1e3),n=o>0?`${o}m ${i}s`:`${i}s`,s=e.difficulty.charAt(0).toUpperCase()+e.difficulty.slice(1);return["🔍 ALIBI",`Case: ${e.floorPlan===e.floorPlan?e.themeId.replace(/-/g," ").replace(/\b\w/g,a=>a.toUpperCase()):"Unknown"}`,`Difficulty: ${s}`,`Clues: ${e.clues.length}`,`Time: ${n}`,`Killer: ${e.killer.name}`,"","pnz1990.github.io/alibi/"].join(`
`)}async function st(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;const t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:-9999px;left:-9999px;",document.body.appendChild(t),t.focus(),t.select();const o=document.execCommand("copy");return document.body.removeChild(t),o}catch{return!1}}const ie={campaign:e=>`alibi_campaign_${e}`,daily:e=>`alibi_daily_${e}`,streak:"alibi_streak",stats:"alibi_stats",prefs:"alibi_prefs",puzzleState:"alibi_puzzle_state"};function rt(e){try{const t=ae();t[e.key]=e,localStorage.setItem(ie.puzzleState,JSON.stringify(t))}catch{}}function lt(e){try{return ae()[e]??null}catch{return null}}function fe(e){try{const t=ae();delete t[e],localStorage.setItem(ie.puzzleState,JSON.stringify(t))}catch{}}function ae(){try{const e=localStorage.getItem(ie.puzzleState);return e?JSON.parse(e):{}}catch{return{}}}const ct=`
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
`;let me=!1;function dt(){if(me)return;const e=document.createElement("style");e.textContent=ct,document.head.appendChild(e),me=!0}function ut(e,t,o,i,n){dt();const s=t.floorPlan,a=document.createElement("div");a.className="alibi-radial-overlay",a.style.cssText=`position:absolute;top:0;left:0;width:${s.width*h}px;height:${s.height*h}px;`,e.style.position="relative",e.appendChild(a);const r=[];for(let d=0;d<s.height;d++){r[d]=[];for(let u=0;u<s.width;u++){const y=s.tiles[d][u],f=document.createElement("div");f.setAttribute("data-testid",`cell-${u}-${d}`),f.style.cssText=`position:absolute;left:${u*h}px;top:${d*h}px;width:${h}px;height:${h}px;`,F(y)&&(f.classList.add("alibi-cell-overlay","placeable"),f.addEventListener("click",g=>{g.stopPropagation(),ft(u,d,i,t,n)})),r[d][u]=f,a.appendChild(f)}}let m=null;const l=()=>W();document.addEventListener("click",l);function c(){const d=i();if(m&&(m.remove(),m=null),d.victimCell){const{x:f,y:g}=d.victimCell;m=document.createElement("div"),m.setAttribute("data-testid","victim-cell"),m.className="alibi-cell-overlay victim-highlight",m.style.cssText=`position:absolute;left:${f*h}px;top:${g*h}px;width:${h}px;height:${h}px;pointer-events:all;`,m.addEventListener("click",v=>{v.stopPropagation(),n.onVictimClick()}),a.appendChild(m)}const u=new Set,y=new Set;for(const f of d.placements.values())u.add(f.y),y.add(f.x);for(let f=0;f<s.height;f++)for(let g=0;g<s.width;g++){const v=r[f]?.[g];if(!v)continue;const w=s.tiles[f][g],I=u.has(f)||y.has(g),j=Array.from(d.placements.values()).some(N=>N.x===g&&N.y===f);v.style.pointerEvents=F(w)&&(!I||j)?"all":"none"}}function p(){document.removeEventListener("click",l),a.remove()}return c(),{updateOverlays:c,detach:p}}let D=null;function W(){D&&(D.remove(),D=null)}function ft(e,t,o,i,n){W();const s=o(),a=Array.from(s.placements.entries()).find(([,d])=>d.x===e&&d.y===t),r=document.createElement("div");r.className="alibi-radial-menu",r.setAttribute("data-testid","radial-menu");const l=document.getElementById("game-canvas")?.getBoundingClientRect()??{left:0,top:0};r.style.left=`${l.left+(e+1)*h}px`,r.style.top=`${l.top+t*h}px`;const c=new Set(s.placements.keys()),p=i.suspects.filter(d=>!c.has(d.id));for(const d of p){const u=document.createElement("div");u.className="alibi-radial-item",u.setAttribute("data-testid",`suspect-option-${d.id}`),u.textContent=d.name,u.addEventListener("click",y=>{y.stopPropagation(),W(),n.onPlace(d.id,e,t)}),r.appendChild(u)}if(a){const d=document.createElement("div");d.className="alibi-radial-item alibi-radial-clear",d.setAttribute("data-testid","suspect-option-clear"),d.textContent="Clear",d.addEventListener("click",u=>{u.stopPropagation(),W(),n.onRemove(a[0])}),r.appendChild(d)}r.children.length!==0&&(document.body.appendChild(r),D=r)}function mt(e){return`${e.seed}-${e.themeId}-${e.difficulty}`}function pt(e){const t=new URLSearchParams(location.search),o=t.get("theme")??"coffee-shop",i=t.get("difficulty")??"easy",n=parseInt(t.get("seed")??"0",10),s=Le(o),a=Ie(n,s,i),r=mt(a),m=yt(),l=m.querySelector(".alibi-canvas-wrapper"),c=m.querySelector(".alibi-sidebar-container"),p=document.getElementById("game-canvas"),d=p.getContext("2d"),{width:u,height:y}=Ue(a);p.width=u,p.height=y,l.appendChild(p);let f=ue();const g=new nt;function v(b,x){const R={};x.placements.forEach((S,$)=>{R[$]={x:S.x,y:S.y}}),rt({key:b,placements:R,elapsedMs:x.elapsedMs,savedAt:new Date().toISOString()})}function w(){We(d,a,s,f.placements,f.victimCell),Ke(c,a,f.placements,f.satisfiedClues,f.errorClues),I.updateOverlays()}const I=ut(l,a,s,()=>f,{onPlace(b,x,R){f.phase==="playing"&&(g.push(f.placements),f=Ze(f,a,b,x,R),v(r,f),z(f.satisfiedClues.size>0?"clue-satisfied":"place"),w())},onRemove(b){f.phase==="playing"&&(g.push(f.placements),f=Qe(f,a,b),v(r,f),z("remove"),w())},onVictimClick(){if(f.phase!=="playing")return;const b=et(f);b.phase==="guilty"?(f=b,fe(r),z("solve"),w(),Je(document.body,a),gt(a,f)):(z("error"),w(),Xe(document.body))}}),j=m.querySelector('[data-testid="btn-undo"]'),N=m.querySelector('[data-testid="btn-redo"]');j.addEventListener("click",U),N.addEventListener("click",P);function U(){const b=g.undo(f.placements);b&&(f=Y(f,a,b),w())}function P(){const b=g.redo(f.placements);b&&(f=Y(f,a,b),w())}const _=m.querySelector('[data-testid="btn-mute"]');_.addEventListener("click",()=>{const b=it();_.textContent=b?"🔇":"🔊"}),document.addEventListener("keydown",b=>{(b.ctrlKey||b.metaKey)&&b.key==="z"&&!b.shiftKey&&(U(),b.preventDefault()),(b.ctrlKey||b.metaKey)&&(b.key==="y"||b.key==="z"&&b.shiftKey)&&(P(),b.preventDefault())});const k=lt(r);k&&Object.keys(k.placements).length>0?xt(m,()=>{const b=new Map(Object.entries(k.placements).map(([x,R])=>[x,{suspectId:x,x:R.x,y:R.y}]));f=Y(ue(),a,b),f={...f,elapsedMs:k.elapsedMs},w(),K(document.body,a,()=>{})},()=>{fe(r),K(document.body,a,()=>{})}):K(document.body,a,()=>{}),w()}const ht=`
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
`;let pe=!1;function bt(){if(pe)return;const e=document.createElement("style");e.textContent=ht,document.head.appendChild(e),pe=!0}function yt(){bt();const e=document.createElement("div");e.setAttribute("data-testid","screen-game"),e.className="alibi-game-screen";const t=document.createElement("div");t.className="alibi-canvas-wrapper";const o=document.createElement("div");o.style.cssText="display:flex;flex-direction:column;height:100vh;flex:1;";const i=document.createElement("div");i.className="alibi-toolbar";const n=J("btn-undo","↩ Undo"),s=J("btn-redo","↪ Redo"),a=J("btn-mute","🔊");i.append(n,s,a);const r=document.createElement("div");r.className="alibi-sidebar-container",o.append(i,r),e.append(t,o);const m=document.getElementById("game-canvas");return m.parentElement?.insertBefore(e,m),e}function J(e,t){const o=document.createElement("button");return o.setAttribute("data-testid",e),o.textContent=t,o}function gt(e,t){const o=document.createElement("button");o.setAttribute("data-testid","btn-share"),o.style.cssText="position:fixed;bottom:24px;right:24px;z-index:300;background:#c0392b;color:#fff;border:none;padding:10px 20px;font-family:monospace;font-size:14px;cursor:pointer;border-radius:4px;",o.textContent="📋 Share Result",o.addEventListener("click",async()=>{const i=at(e,t.elapsedMs),n=await st(i);o.textContent=n?"✓ Copied!":"📋 Share Result",n&&setTimeout(()=>{o.textContent="📋 Share Result"},2e3)}),document.body.appendChild(o)}function xt(e,t,o){const i=document.createElement("div");i.setAttribute("data-testid","prompt-resume"),i.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:150;font-family:monospace;";const n=document.createElement("div");n.style.cssText="background:#1a1a2e;border:2px solid #c0392b;border-radius:8px;padding:28px;max-width:360px;text-align:center;color:#fff;";const s=document.createElement("h2");s.style.cssText="color:#c0392b;margin-bottom:12px;",s.textContent="Resume Investigation?";const a=document.createElement("p");a.style.cssText="color:#aaa;margin-bottom:20px;font-size:0.9em;",a.textContent="You have an in-progress case. Resume where you left off?";const r=document.createElement("button");r.style.cssText="background:#c0392b;color:#fff;border:none;padding:9px 20px;font-family:monospace;cursor:pointer;border-radius:4px;margin-right:8px;",r.textContent="Resume",r.addEventListener("click",()=>{i.remove(),t()});const m=document.createElement("button");m.style.cssText="background:#333;color:#fff;border:none;padding:9px 20px;font-family:monospace;cursor:pointer;border-radius:4px;",m.textContent="Start Fresh",m.addEventListener("click",()=>{i.remove(),o()}),n.append(s,a,r,m),i.appendChild(n),e.appendChild(i)}const X=new URLSearchParams(location.search);if(X.has("theme")||X.has("difficulty")||X.has("seed"))pt();else{const e=document.getElementById("game-canvas"),t=e.getContext("2d");if(!t)throw new Error("Canvas 2D context not available");t.fillStyle="#1a1a2e",t.fillRect(0,0,e.width,e.height)}

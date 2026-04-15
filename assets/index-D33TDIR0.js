(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(n){if(n.ep)return;n.ep=!0;const c=o(n);fetch(n.href,c)}})();const ee=new Set(["F","C","S","B"]);function O(e){return ee.has(e)}function B(e){return e==="C"||e==="S"||e==="B"}function A(e){const t=[];for(let o=0;o<e.width;o++)for(let a=0;a<e.height;a++)if(O(e.tiles[a][o])){t.push(o);break}return t}function P(e){const t=[];for(let o=0;o<e.height;o++)for(let a=0;a<e.width;a++)if(O(e.tiles[o][a])){t.push(o);break}return t}function x(e,t,o){for(const a of e.rooms)for(const[n,c]of a.cells)if(n===t&&c===o)return a.id;return null}function H(e){const t=new Set,o=new Set;for(const a of e)t.add(a.y),o.add(a.x);return{blockedRows:t,blockedCols:o}}function q(e,t){const{blockedRows:o,blockedCols:a}=H(t),n=[];for(let c=0;c<e.height;c++)if(!o.has(c))for(let l=0;l<e.width;l++)a.has(l)||O(e.tiles[c][l])&&n.push({x:l,y:c});return n.length===1?n[0]:null}function te(e,t,o){const a=x(e,o.x,o.y);if(a===null)return null;for(const n of t)if(x(e,n.x,n.y)===a)return n.suspectId;return null}function W(e,t,o,a){return Math.max(Math.abs(e-o),Math.abs(t-a))}function _(e,t,o){const a=o.get(t.suspectId);if(!a)return null;switch(t.type){case"inRoom":return x(e,a.x,a.y)===t.roomId;case"notInRoom":return x(e,a.x,a.y)!==t.roomId;case"inSameRoom":{const n=o.get(t.otherSuspectId);if(!n)return null;const c=x(e,a.x,a.y),l=x(e,n.x,n.y);return c!==null&&c===l}case"inDifferentRoom":{const n=o.get(t.otherSuspectId);if(!n)return null;const c=x(e,a.x,a.y),l=x(e,n.x,n.y);return c===null||l===null?null:c!==l}case"inColumn":return a.x===t.col;case"inRow":return a.y===t.row;case"besideSuspect":{const n=o.get(t.otherSuspectId);return n?W(a.x,a.y,n.x,n.y)<=1:null}case"notBesideSuspect":{const n=o.get(t.otherSuspectId);return n?W(a.x,a.y,n.x,n.y)>1:null}case"besideObject":{for(let n=-1;n<=1;n++)for(let c=-1;c<=1;c++){if(c===0&&n===0)continue;const l=a.x+c,r=a.y+n;if(!(l<0||r<0||l>=e.width||r>=e.height)&&e.tiles[r][l]===t.objectTile)return!0}return!1}case"notBesideObject":{for(let n=-1;n<=1;n++)for(let c=-1;c<=1;c++){if(c===0&&n===0)continue;const l=a.x+c,r=a.y+n;if(!(l<0||r<0||l>=e.width||r>=e.height)&&e.tiles[r][l]===t.objectTile)return!1}return!0}case"onSeatTile":return B(e.tiles[a.y][a.x]);case"notOnSeatTile":return!B(e.tiles[a.y][a.x]);case"northOf":{const n=o.get(t.otherSuspectId);return n?a.y<n.y:null}case"southOf":{const n=o.get(t.otherSuspectId);return n?a.y>n.y:null}case"exactlyNRowsNorth":{const n=o.get(t.otherSuspectId);return n?n.y-a.y===t.n:null}case"exactlyNRowsSouth":{const n=o.get(t.otherSuspectId);return n?a.y-n.y===t.n:null}}}const ne={easy:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom"],medium:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile"],hard:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile","notOnSeatTile","northOf","southOf","exactlyNRowsNorth","exactlyNRowsSouth"]};function N(e,t,o){const a=A(e),n=P(e);if(t.length===0)return{count:0};if(t.length>Math.min(a.length,n.length))return{count:0};const c=new Set;for(let u=0;u<e.height;u++)for(let d=0;d<e.width;d++)O(e.tiles[u][d])&&c.add(`${d},${u}`);let l=0,r;const m=new Map,i=new Set,s=new Set;function f(u){if(l>=2)return;if(u===t.length){for(const p of o)if(_(e,p,m)!==!0)return;l++,l===1&&(r=new Map(m));return}const d=t[u];for(const p of n)if(!i.has(p))for(const b of a){if(s.has(b)||!c.has(`${b},${p}`))continue;const y={suspectId:d,x:b,y:p};m.set(d,y),i.add(p),s.add(b);let S=!1;for(const $ of o)if(($.suspectId===d||$.otherSuspectId===d)&&_(e,$,m)===!1){S=!0;break}if(S||f(u+1),m.delete(d),i.delete(p),s.delete(b),l>=2)return}}return f(0),{count:l,firstSolution:r}}class oe extends Error{constructor(t){super(t),this.name="PuzzleGenerationError"}}function ie(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let o=Math.imul(t^t>>>15,1|t);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296}}function G(e,t){return Math.floor(e()*t)}function w(e,t){return t[G(e,t.length)]}function j(e,t){const o=[...t];for(let a=o.length-1;a>0;a--){const n=G(e,a+1);[o[a],o[n]]=[o[n],o[a]]}return o}function ae(e,t,o,a){const n=ne[o],c=a.landmarks.length>=2,l=a.tiles.some(s=>s.some(f=>B(f))),r=n.filter(s=>!((s==="besideObject"||s==="notBesideObject")&&!c||(s==="onSeatTile"||s==="notOnSeatTile")&&!l)),m=Math.ceil(t*.4),i=[];for(let s=0;s<t;s++){const f=new Set;i.length>0&&f.add(i[i.length-1]);for(const y of r)i.filter($=>$===y).length>=m&&f.add(y);const u=r.filter(y=>!f.has(y)),d=u.length>0?u:r,p=d.filter(y=>!i.includes(y)),b=p.length>0?p:d;i.push(w(e,b))}return i}function k(e,t,o,a,n,c,l){const r=l.get(n.id),m=o.clueTemplates;switch(a){case"inRoom":{const i=x(t,r.x,r.y);if(!i)return null;const s=t.rooms.find(f=>f.id===i);return{type:"inRoom",suspectId:n.id,roomId:i,text:m.inRoom(n.name,s.name)}}case"notInRoom":{const i=x(t,r.x,r.y),s=t.rooms.filter(u=>u.id!==i);if(s.length===0)return null;const f=w(e,s);return{type:"notInRoom",suspectId:n.id,roomId:f.id,text:m.notInRoom(n.name,f.name)}}case"inSameRoom":{const i=x(t,r.x,r.y);if(!i)return null;const s=c.filter(u=>{if(u.id===n.id)return!1;const d=l.get(u.id);return x(t,d.x,d.y)===i});if(s.length===0)return null;const f=w(e,s);return{type:"inSameRoom",suspectId:n.id,otherSuspectId:f.id,text:m.inSameRoom(n.name,f.name)}}case"inDifferentRoom":{const i=x(t,r.x,r.y),s=c.filter(u=>{if(u.id===n.id)return!1;const d=l.get(u.id),p=x(t,d.x,d.y);return p!==null&&p!==i});if(s.length===0)return null;const f=w(e,s);return{type:"inDifferentRoom",suspectId:n.id,otherSuspectId:f.id,text:m.inDifferentRoom(n.name,f.name)}}case"inColumn":return{type:"inColumn",suspectId:n.id,col:r.x,text:m.inColumn(n.name,r.x+1)};case"inRow":return{type:"inRow",suspectId:n.id,row:r.y,text:m.inRow(n.name,r.y+1)};case"besideSuspect":{const i=c.filter(f=>{if(f.id===n.id)return!1;const u=l.get(f.id);return Math.max(Math.abs(r.x-u.x),Math.abs(r.y-u.y))<=1});if(i.length===0)return null;const s=w(e,i);return{type:"besideSuspect",suspectId:n.id,otherSuspectId:s.id,text:m.besideSuspect(n.name,s.name)}}case"notBesideSuspect":{const i=c.filter(f=>{if(f.id===n.id)return!1;const u=l.get(f.id);return Math.max(Math.abs(r.x-u.x),Math.abs(r.y-u.y))>1});if(i.length===0)return null;const s=w(e,i);return{type:"notBesideSuspect",suspectId:n.id,otherSuspectId:s.id,text:m.notBesideSuspect(n.name,s.name)}}case"besideObject":{if(t.landmarks.length===0)return null;const i=t.landmarks.filter(u=>Math.max(Math.abs(r.x-u.x),Math.abs(r.y-u.y))<=1);if(i.length===0)return null;const s=w(e,i),f=t.tiles[s.y][s.x];return{type:"besideObject",suspectId:n.id,objectTile:f,text:m.besideObject(n.name,s.name)}}case"notBesideObject":{if(t.landmarks.length===0)return null;const i=t.landmarks.filter(u=>Math.max(Math.abs(r.x-u.x),Math.abs(r.y-u.y))>1);if(i.length===0)return null;const s=w(e,i),f=t.tiles[s.y][s.x];return{type:"notBesideObject",suspectId:n.id,objectTile:f,text:m.notBesideObject(n.name,s.name)}}case"onSeatTile":{const i=t.tiles[r.y][r.x];if(!B(i))return null;const s=i==="C"?"chair":i==="S"?"sofa":"bed";return{type:"onSeatTile",suspectId:n.id,text:m.onSeatTile(n.name,s)}}case"notOnSeatTile":{const i=t.tiles[r.y][r.x];return B(i)?null:{type:"notOnSeatTile",suspectId:n.id,text:m.notOnSeatTile(n.name)}}case"northOf":{const i=c.filter(f=>{if(f.id===n.id)return!1;const u=l.get(f.id);return r.y<u.y});if(i.length===0)return null;const s=w(e,i);return{type:"northOf",suspectId:n.id,otherSuspectId:s.id,text:m.northOf(n.name,s.name)}}case"southOf":{const i=c.filter(f=>{if(f.id===n.id)return!1;const u=l.get(f.id);return r.y>u.y});if(i.length===0)return null;const s=w(e,i);return{type:"southOf",suspectId:n.id,otherSuspectId:s.id,text:m.southOf(n.name,s.name)}}case"exactlyNRowsNorth":{const i=[];for(const f of c){if(f.id===n.id)continue;const d=l.get(f.id).y-r.y;d>0&&i.push({suspect:f,n:d})}if(i.length===0)return null;const s=w(e,i);return{type:"exactlyNRowsNorth",suspectId:n.id,otherSuspectId:s.suspect.id,n:s.n,text:m.exactlyNRowsNorth(n.name,s.suspect.name,s.n)}}case"exactlyNRowsSouth":{const i=[];for(const f of c){if(f.id===n.id)continue;const u=l.get(f.id),d=r.y-u.y;d>0&&i.push({suspect:f,n:d})}if(i.length===0)return null;const s=w(e,i);return{type:"exactlyNRowsSouth",suspectId:n.id,otherSuspectId:s.suspect.id,n:s.n,text:m.exactlyNRowsSouth(n.name,s.suspect.name,s.n)}}}}function re(e,t,o,a=1e3){const n=j(e,A(t)),c=j(e,P(t)),l=o.length;if(l<1||l>Math.min(n.length,c.length))return null;let r=0;const m=new Map,i=new Set,s=new Set,f=j(e,c).slice(0,l);function u(d){if(d===l)return!0;const p=o[d],b=f[d],y=j(e,n);for(const S of y)if(!s.has(S)&&O(t.tiles[b]?.[S])){if(m.set(p.id,{suspectId:p.id,x:S,y:b}),i.add(b),s.add(S),u(d+1))return!0;if(r++,m.delete(p.id),i.delete(b),s.delete(S),r>=a)return!1}return!1}return u(0)?m:null}function se(e,t,o){for(let n=0;n<20;n++){const c=e+n*97>>>0,l=ie(c),r=t.floorPlans[o],m=A(r),i=P(r),s=Math.min(m.length,i.length)-1;if(s<2)continue;const d=j(l,[...t.suspectNames]).slice(0,s).map((g,T)=>({id:`s${T}`,name:g})),p=w(l,t.victimNames),b=re(l,r,d);if(!b)continue;const y=Array.from(b.values()),S=q(r,y);if(!S)continue;const $=te(r,y,S);if(!$)continue;const E=d.find(g=>g.id===$),X=w(l,t.narrativeTemplates.intro),J=w(l,t.narrativeTemplates.victimFound),Z=w(l,t.narrativeTemplates.guiltyText).replace("{{killerName}}",E.name).replace("{{evidenceText}}","the evidence is conclusive"),Q=ae(l,s,o,r),v=[];for(let g=0;g<s;g++){const T=d[g],R=Q[g];let C=k(l,r,t,R,T,d,b);C||(C=k(l,r,t,"inRow",T,d,b)),C||(C=k(l,r,t,"inColumn",T,d,b)),C&&v.push(C)}let F=N(r,d.map(g=>g.id),v);if(F.count!==0){if(F.count!==1)for(const g of d){if(F.count===1)break;if(!v.some(R=>R.type==="inRow"&&R.suspectId===g.id)){const R=k(l,r,t,"inRow",g,d,b);R&&v.push(R),F=N(r,d.map(C=>C.id),v)}}if(F.count!==1)for(const g of d){if(F.count===1)break;if(!v.some(R=>R.type==="inColumn"&&R.suspectId===g.id)){const R=k(l,r,t,"inColumn",g,d,b);R&&v.push(R),F=N(r,d.map(C=>C.id),v)}}if(F.count===1)return{seed:c,themeId:t.id,difficulty:o,suspects:d,victimName:p,clues:v,solution:b,victimCell:S,killer:E,narrativeIntro:X,narrativeVictimFound:J,narrativeGuilty:Z,floorPlan:r}}}throw new oe(`Failed to generate unique puzzle after 20 retries (seed=${e}, theme=${t.id}, difficulty=${o})`)}const le={width:5,height:6,tiles:[["bB","bB","bB","W","W"],["F","F","F","C","F"],["pL","F","C","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"],["W","cR","W","F","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[3,1],[4,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"restroom",name:"Restroom",cells:[[1,5],[3,5],[4,5]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-entrance",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},ce={width:6,height:7,tiles:[["bB","bB","bB","bB","W","W"],["F","F","F","F","C","F"],["pL","F","C","F","F","F"],["F","S","F","pL","F","C"],["F","F","tB","F","F","F"],["C","F","F","F","W","F"],["W","cR","W","W","W","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5]]},{id:"restroom",name:"Restroom",cells:[[1,6],[5,5],[5,6]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-door",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:3,y:3},{id:"table",name:"the table",x:2,y:4},{id:"cash-register",name:"the cash register",x:1,y:6}]},de={width:7,height:8,tiles:[["bB","bB","bB","bB","bB","W","W"],["F","F","F","F","F","C","F"],["F","C","F","pL","F","F","F"],["pL","F","S","F","C","F","pL"],["F","F","F","tB","F","F","F"],["F","C","F","F","F","tB","C"],["F","F","F","F","F","W","F"],["W","cR","W","F","C","W","F"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]]},{id:"main-area",name:"Main Area",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[6,6]]},{id:"restroom",name:"Restroom",cells:[[1,7]]},{id:"back-office",name:"Back Office",cells:[[3,7],[4,7],[6,7]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-1",name:"the plant",x:3,y:2},{id:"plant-2",name:"the plant",x:0,y:3},{id:"plant-3",name:"the plant",x:6,y:3},{id:"table",name:"the table",x:3,y:4},{id:"table-2",name:"the small table",x:5,y:5},{id:"cash-register",name:"the cash register",x:1,y:7}]},I={"coffee-shop":{easy:le,medium:ce,hard:de}};function D(e){const t=["th","st","nd","rd"],o=e%100;return e+(t[(o-20)%10]??t[o]??t[0])}const ue={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same area as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different parts of the café.`,inColumn:(e,t)=>`${e} was in the ${D(t)} column.`,inRow:(e,t)=>`${e} was in the ${D(t)} row.`,besideSuspect:(e,t)=>`${e} was standing next to ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>t==="chair"?`${e} was sitting in a chair.`:t==="sofa"?`${e} was on the sofa.`:`${e} was on the ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} south of ${t}.`},fe={id:"coffee-shop",name:"The Coffee Shop",floorPlans:{easy:I["coffee-shop"].easy,medium:I["coffee-shop"].medium,hard:I["coffee-shop"].hard},suspectNames:["Alice","Ben","Chloe","Diego","Elena","Finlay","Grace","Hassan","Iris","Jake","Lena","Marco"],victimNames:["Victor","Violet","Vera","Valencia","Vance","Vivian"],clueTemplates:ue,narrativeTemplates:{intro:["A body has been found at the Copper Bean Café. The morning rush never arrived — instead, the regulars found yellow tape across the door. You pour yourself an espresso and get to work.","The Copper Bean Café is closed for a very different reason today. Someone is dead, and the witnesses are all still clutching their lattes. You take out your notebook.","It was supposed to be a quiet Tuesday at the Copper Bean. Then the screaming started. Now it's your problem. You order a black coffee and begin."],victimFound:["The victim was discovered near table four, cold cup of coffee still in hand.","Staff found the victim behind the counter during the morning prep.","A regular spotted the victim slumped in the corner booth before opening."],guiltyText:["{{killerName}} — served with a side of motive.","{{killerName}} — the evidence is as clear as an Americano.","{{killerName}} — there's no running from the detective on this one."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:plant":"","object:cash-register":"","object:table":""}},me={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same room as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different rooms.`,inColumn:(e,t)=>`${e} was in column ${t}.`,inRow:(e,t)=>`${e} was in row ${t}.`,besideSuspect:(e,t)=>`${e} was beside ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>`${e} was on a ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,o)=>`${e} was exactly ${o} row${o>1?"s":""} south of ${t}.`},he={id:"stub",name:"Test Room",floorPlans:{easy:I["coffee-shop"].easy,medium:I["coffee-shop"].medium,hard:I["coffee-shop"].hard},suspectNames:["Alice","Bob","Carol","Dave","Eve","Frank","Grace","Henry","Iris","Jack","Kate","Leo"],victimNames:["Vera","Victor","Violet","Valencia","Vance","Vivian"],clueTemplates:me,narrativeTemplates:{intro:["A crime has occurred in the Test Room.","Witnesses report suspicious activity.","The detective arrives on the scene."],victimFound:["The victim was found at the scene.","A body has been discovered.","The victim was discovered here."],guiltyText:["{{killerName}} — caught red-handed.","{{killerName}} — the evidence is clear.","{{killerName}} — guilty as charged."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{}},Y=new Map;function K(e){Y.set(e.id,e)}function pe(e){const t=Y.get(e);if(!t)throw new Error(`Unknown theme: ${e}`);return t}K(fe);K(he);function be(e,t){return t[e]??""}const h=64,M=new Map;function ye(e){if(!e)return null;if(M.has(e))return M.get(e);const t=new Image,o=new Blob([e],{type:"image/svg+xml"}),a=URL.createObjectURL(o);return t.onload=()=>{M.set(e,t),URL.revokeObjectURL(a)},t.src=a,null}function V(e,t,o,a){e.fillStyle="#c8a96e",e.fillRect(t,o,h,h),e.fillStyle="#ffffff",e.font="8px monospace",e.textAlign="center",e.textBaseline="middle",e.fillText(a.slice(0,4),t+h/2,o+h/2),e.textAlign="left",e.textBaseline="alphabetic"}function ge(e){let t=0;for(let o=0;o<e.length;o++)t=t*31+e.charCodeAt(o)&65535;return`hsl(${t%360}, 65%, 55%)`}const we={pL:"object:plant",tB:"object:table",sH:"object:shelf",cR:"object:cash-register",bB:"object:bar-counter",tV:"object:tv",cT:"object:counter",dK:"object:desk",pC:"object:photocopier",fB:"object:flower-bed",hB:"object:hospital-bed",mC:"object:medicine-cabinet",tR:"object:tree",tD:"object:teddy-bear",cH:"object:carousel-horse",tM:"object:treadmill",wT:"object:weight-rack",sT:"object:stall",jZ:"object:jacuzzi-tile"},xe=new Set(["C","S","B"]);function Se(e,t,o,a,n){const c=t.floorPlan,l=o.colorPalette,{blockedRows:r,blockedCols:m}=H(Array.from(a.values()));for(let i=0;i<c.height;i++)for(let s=0;s<c.width;s++){const f=c.tiles[i][s],u=s*h,d=i*h;if(f==="W"){e.fillStyle=l.wall,e.fillRect(u,d,h,h);continue}if(xe.has(f)){e.fillStyle=l.seat,e.fillRect(u,d,h,h),e.fillStyle="rgba(0,0,0,0.2)",e.beginPath(),e.arc(u+h/2,d+h/2,h*.3,0,Math.PI*2),e.fill(),e.strokeStyle="rgba(0,0,0,0.1)",e.lineWidth=.5,e.strokeRect(u,d,h,h);continue}if(f!=="F"){const p=we[f]??`object:${f}`,b=be(p,o.spriteMap);if(b){const y=ye(b);y?e.drawImage(y,u,d,h,h):V(e,u,d,p.replace("object:",""))}else V(e,u,d,p.replace("object:",""));continue}e.fillStyle=l.floor,e.fillRect(u,d,h,h),e.strokeStyle="rgba(0,0,0,0.1)",e.lineWidth=.5,e.strokeRect(u,d,h,h)}e.fillStyle="rgba(0, 0, 0, 0.15)";for(const i of r)e.fillRect(0,i*h,c.width*h,h);for(const i of m)e.fillRect(i*h,0,h,c.height*h);if(n){const i=n.x*h,s=n.y*h;e.strokeStyle=l.accent,e.lineWidth=3,e.strokeRect(i+2,s+2,h-4,h-4),e.fillStyle=`${l.accent}33`,e.fillRect(i+2,s+2,h-4,h-4)}for(const[i,s]of a){const f=t.suspects.find(p=>p.id===i);if(!f)continue;const u=s.x*h,d=s.y*h;e.fillStyle=ge(i),e.beginPath(),e.arc(u+h/2,d+h/2,h*.38,0,Math.PI*2),e.fill(),e.fillStyle="#ffffff",e.font=`bold ${Math.floor(h*.4)}px monospace`,e.textAlign="center",e.textBaseline="middle",e.fillText(f.name.charAt(0).toUpperCase(),u+h/2,d+h/2),e.textAlign="left",e.textBaseline="alphabetic"}}function Re(e){return{width:e.floorPlan.width*h,height:e.floorPlan.height*h}}const Ce=`
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
`;let z=!1;function ve(){if(z)return;const e=document.createElement("style");e.textContent=Ce,document.head.appendChild(e),z=!0}function $e(e){let t=0;for(let o=0;o<e.length;o++)t=t*31+e.charCodeAt(o)&65535;return`hsl(${t%360}, 65%, 55%)`}function Fe(e,t,o,a,n){ve(),e.innerHTML="",e.className="alibi-sidebar";const c=document.createElement("div");c.className="alibi-suspect-section";for(const r of t.suspects){const m=document.createElement("div");m.className="alibi-suspect-card"+(o.has(r.id)?" placed":"");const i=document.createElement("div");i.className="alibi-suspect-initial",i.style.background=$e(r.id),i.textContent=r.name.charAt(0).toUpperCase();const s=document.createElement("span");s.textContent=r.name,m.appendChild(i),m.appendChild(s),c.appendChild(m)}e.appendChild(c);const l=document.createElement("div");l.className="alibi-clue-section",t.clues.forEach((r,m)=>{const i=document.createElement("div");i.className="alibi-clue-card",i.setAttribute("data-testid",`clue-${m}`),a.has(m)&&i.classList.add("clue-satisfied"),n.has(m)&&i.classList.add("clue-error"),i.textContent=r.text,l.appendChild(i)}),e.appendChild(l)}const Te=`
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
`;let U=!1;function Ie(){if(U)return;const e=document.createElement("style");e.textContent=Te,document.head.appendChild(e),U=!0}function ke(e,t,o){Ie(),je(e);const a=document.createElement("div");a.className="alibi-overlay",a.setAttribute("data-testid","narrative-intro");const n=document.createElement("div");n.className="alibi-modal";const c=document.createElement("h2");c.textContent="A New Case";const l=document.createElement("p");l.textContent=t.narrativeIntro;const r=document.createElement("button");r.textContent="Begin Investigation",r.addEventListener("click",()=>{a.remove()}),n.appendChild(c),n.appendChild(l),n.appendChild(r),a.appendChild(n),e.appendChild(a)}function je(e){const t=e.querySelector(".alibi-overlay");t&&t.remove()}function Be(e){const t=new URLSearchParams(location.search),o=t.get("theme")??"coffee-shop",a=t.get("difficulty")??"easy",n=parseInt(t.get("seed")??"0",10),c=pe(o),l=se(n,c,a),r=document.createElement("div");r.setAttribute("data-testid","screen-game"),r.style.cssText="display:flex;align-items:flex-start;gap:0;height:100vh;overflow:hidden;";const m=document.getElementById("game-canvas"),i=m.getContext("2d");if(!i)throw new Error("Canvas 2D context unavailable");const{width:s,height:f}=Re(l);m.width=s,m.height=f;const u=new Map,d=q(l.floorPlan,[]);Se(i,l,c,u,d);const p=document.createElement("div");p.setAttribute("data-testid","sidebar"),Fe(p,l,u,new Set,new Set);const b=document.createElement("div");b.style.cssText="flex-shrink:0;overflow:auto;",m.parentElement?.insertBefore(r,m),b.appendChild(m),r.appendChild(b),r.appendChild(p),ke(document.body,l)}const L=new URLSearchParams(location.search);if(L.has("theme")||L.has("difficulty")||L.has("seed"))Be();else{const e=document.getElementById("game-canvas"),t=e.getContext("2d");if(!t)throw new Error("Canvas 2D context not available");t.fillStyle="#1a1a2e",t.fillRect(0,0,e.width,e.height)}

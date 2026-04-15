var xt=Object.defineProperty;var Ft=(e,t,a)=>t in e?xt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var Fe=(e,t,a)=>Ft(e,typeof t!="symbol"?t+"":t,a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const vt=new Set(["F","C","S","B"]);function q(e){return vt.has(e)}function se(e){return e==="C"||e==="S"||e==="B"}function Oe(e){const t=[];for(let a=0;a<e.width;a++)for(let r=0;r<e.height;r++)if(q(e.tiles[r][a])){t.push(a);break}return t}function Le(e){const t=[];for(let a=0;a<e.height;a++)for(let r=0;r<e.width;r++)if(q(e.tiles[a][r])){t.push(a);break}return t}function j(e,t,a){for(const r of e.rooms)for(const[n,i]of r.cells)if(n===t&&i===a)return r.id;return null}function ht(e){const t=new Set,a=new Set;for(const r of e)t.add(r.y),a.add(r.x);return{blockedRows:t,blockedCols:a}}function mt(e,t){const{blockedRows:a,blockedCols:r}=ht(t),n=[];for(let i=0;i<e.height;i++)if(!a.has(i))for(let l=0;l<e.width;l++)r.has(l)||q(e.tiles[i][l])&&n.push({x:l,y:i});return n.length===1?n[0]:null}function kt(e,t,a){const r=j(e,a.x,a.y);if(r===null)return null;for(const n of t)if(j(e,n.x,n.y)===r)return n.suspectId;return null}function Ge(e,t,a,r){return Math.max(Math.abs(e-a),Math.abs(t-r))}function Me(e,t,a){const r=a.get(t.suspectId);if(!r)return null;switch(t.type){case"inRoom":return j(e,r.x,r.y)===t.roomId;case"notInRoom":return j(e,r.x,r.y)!==t.roomId;case"inSameRoom":{const n=a.get(t.otherSuspectId);if(!n)return null;const i=j(e,r.x,r.y),l=j(e,n.x,n.y);return i!==null&&i===l}case"inDifferentRoom":{const n=a.get(t.otherSuspectId);if(!n)return null;const i=j(e,r.x,r.y),l=j(e,n.x,n.y);return i===null||l===null?null:i!==l}case"inColumn":return r.x===t.col;case"inRow":return r.y===t.row;case"besideSuspect":{const n=a.get(t.otherSuspectId);return n?Ge(r.x,r.y,n.x,n.y)<=1:null}case"notBesideSuspect":{const n=a.get(t.otherSuspectId);return n?Ge(r.x,r.y,n.x,n.y)>1:null}case"besideObject":{for(let n=-1;n<=1;n++)for(let i=-1;i<=1;i++){if(i===0&&n===0)continue;const l=r.x+i,c=r.y+n;if(!(l<0||c<0||l>=e.width||c>=e.height)&&e.tiles[c][l]===t.objectTile)return!0}return!1}case"notBesideObject":{for(let n=-1;n<=1;n++)for(let i=-1;i<=1;i++){if(i===0&&n===0)continue;const l=r.x+i,c=r.y+n;if(!(l<0||c<0||l>=e.width||c>=e.height)&&e.tiles[c][l]===t.objectTile)return!1}return!0}case"onSeatTile":return se(e.tiles[r.y][r.x]);case"notOnSeatTile":return!se(e.tiles[r.y][r.x]);case"northOf":{const n=a.get(t.otherSuspectId);return n?r.y<n.y:null}case"southOf":{const n=a.get(t.otherSuspectId);return n?r.y>n.y:null}case"exactlyNRowsNorth":{const n=a.get(t.otherSuspectId);return n?n.y-r.y===t.n:null}case"exactlyNRowsSouth":{const n=a.get(t.otherSuspectId);return n?r.y-n.y===t.n:null}}}const St={easy:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom"],medium:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile"],hard:["inRoom","notInRoom","inColumn","inRow","inSameRoom","inDifferentRoom","besideSuspect","notBesideSuspect","besideObject","notBesideObject","onSeatTile","notOnSeatTile","northOf","southOf","exactlyNRowsNorth","exactlyNRowsSouth"]};function ve(e,t,a){const r=Oe(e),n=Le(e);if(t.length===0)return{count:0};if(t.length>Math.min(r.length,n.length))return{count:0};const i=new Set;for(let o=0;o<e.height;o++)for(let p=0;p<e.width;p++)q(e.tiles[o][p])&&i.add(`${p},${o}`);let l=0,c;const g=new Map,w=new Set,m=new Set;function d(o){if(l>=2)return;if(o===t.length){for(const u of a)if(Me(e,u,g)!==!0)return;l++,l===1&&(c=new Map(g));return}const p=t[o];for(const u of n)if(!w.has(u))for(const h of r){if(m.has(h)||!i.has(`${h},${u}`))continue;const b={suspectId:p,x:h,y:u};g.set(p,b),w.add(u),m.add(h);let f=!1;for(const $ of a)if(($.suspectId===p||$.otherSuspectId===p)&&Me(e,$,g)===!1){f=!0;break}if(f||d(o+1),g.delete(p),w.delete(u),m.delete(h),l>=2)return}}return d(0),{count:l,firstSolution:c}}class Ct extends Error{constructor(t){super(t),this.name="PuzzleGenerationError"}}function Tt(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let a=Math.imul(t^t>>>15,1|t);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}function ft(e,t){return Math.floor(e()*t)}function z(e,t){return t[ft(e,t.length)]}function oe(e,t){const a=[...t];for(let r=a.length-1;r>0;r--){const n=ft(e,r+1);[a[r],a[n]]=[a[n],a[r]]}return a}function Et(e,t){return Math.max(2,e-{easy:0,medium:1,hard:2}[t])}function Rt(e,t,a,r){const n=Et(t,a),i=St[a],l=r.landmarks.length>=2,c=r.tiles.some(d=>d.some(o=>se(o))),g=i.filter(d=>!((d==="besideObject"||d==="notBesideObject")&&!l||(d==="onSeatTile"||d==="notOnSeatTile")&&!c)),w=Math.ceil(n*.4),m=[];for(let d=0;d<n;d++){const o=new Set;m.length>0&&o.add(m[m.length-1]);for(const f of g)m.filter(y=>y===f).length>=w&&o.add(f);const p=g.filter(f=>!o.has(f)),u=p.length>0?p:g,h=u.filter(f=>!m.includes(f)),b=h.length>0?h:u;m.push(z(e,b))}return m}function ee(e,t,a,r,n,i,l){const c=l.get(n.id),g=a.clueTemplates;switch(r){case"inRoom":{const w=j(t,c.x,c.y);if(!w)return null;const m=t.rooms.find(d=>d.id===w);return{type:"inRoom",suspectId:n.id,roomId:w,text:g.inRoom(n.name,m.name)}}case"notInRoom":{const w=j(t,c.x,c.y),m=t.rooms.filter(o=>o.id===w?!1:o.cells.some(([p])=>p===c.x));if(m.length===0)return null;const d=z(e,m);return{type:"notInRoom",suspectId:n.id,roomId:d.id,text:g.notInRoom(n.name,d.name)}}case"inSameRoom":{const w=j(t,c.x,c.y);if(!w)return null;const m=i.filter(o=>{if(o.id===n.id)return!1;const p=l.get(o.id);return j(t,p.x,p.y)===w});if(m.length===0)return null;const d=z(e,m);return{type:"inSameRoom",suspectId:n.id,otherSuspectId:d.id,text:g.inSameRoom(n.name,d.name)}}case"inDifferentRoom":{const w=j(t,c.x,c.y),m=i.filter(o=>{if(o.id===n.id)return!1;const p=l.get(o.id),u=j(t,p.x,p.y);if(u===null||u===w)return!1;const h=c.x,b=p.x;return t.rooms.some($=>$.cells.some(([y])=>y===h)&&$.cells.some(([y])=>y===b))});if(m.length===0)return null;const d=z(e,m);return{type:"inDifferentRoom",suspectId:n.id,otherSuspectId:d.id,text:g.inDifferentRoom(n.name,d.name)}}case"inColumn":return{type:"inColumn",suspectId:n.id,col:c.x,text:g.inColumn(n.name,c.x+1)};case"inRow":return{type:"inRow",suspectId:n.id,row:c.y,text:g.inRow(n.name,c.y+1)};case"besideSuspect":{const w=i.filter(d=>{if(d.id===n.id)return!1;const o=l.get(d.id);return Math.max(Math.abs(c.x-o.x),Math.abs(c.y-o.y))<=1});if(w.length===0)return null;const m=z(e,w);return{type:"besideSuspect",suspectId:n.id,otherSuspectId:m.id,text:g.besideSuspect(n.name,m.name)}}case"notBesideSuspect":{const w=c.x,m=i.filter(o=>{if(o.id===n.id)return!1;const p=l.get(o.id),u=p.x;return Math.abs(w-u)>1?!1:Math.max(Math.abs(w-u),Math.abs(c.y-p.y))>1});if(m.length===0)return null;const d=z(e,m);return{type:"notBesideSuspect",suspectId:n.id,otherSuspectId:d.id,text:g.notBesideSuspect(n.name,d.name)}}case"besideObject":{if(t.landmarks.length===0)return null;const w=t.landmarks.filter(o=>Math.max(Math.abs(c.x-o.x),Math.abs(c.y-o.y))<=1);if(w.length===0)return null;const m=z(e,w),d=t.tiles[m.y][m.x];return{type:"besideObject",suspectId:n.id,objectTile:d,text:g.besideObject(n.name,m.name)}}case"notBesideObject":{if(t.landmarks.length===0)return null;const w=c.x,m=t.landmarks.filter(p=>{if(Math.max(Math.abs(w-p.x),Math.abs(c.y-p.y))<=1)return!1;for(let u=0;u<t.height;u++){const h=t.tiles[u][w];if(q(h)&&Math.max(Math.abs(w-p.x),Math.abs(u-p.y))<=1)return!0}return!1});if(m.length===0)return null;const d=z(e,m),o=t.tiles[d.y][d.x];return{type:"notBesideObject",suspectId:n.id,objectTile:o,text:g.notBesideObject(n.name,d.name)}}case"onSeatTile":{const w=t.tiles[c.y][c.x];if(!se(w))return null;const m=w==="C"?"chair":w==="S"?"sofa":"bed";return{type:"onSeatTile",suspectId:n.id,text:g.onSeatTile(n.name,m)}}case"notOnSeatTile":{const w=t.tiles[c.y][c.x];return se(w)?null:{type:"notOnSeatTile",suspectId:n.id,text:g.notOnSeatTile(n.name)}}case"northOf":{const w=i.filter(d=>{if(d.id===n.id)return!1;const o=l.get(d.id);return c.y<o.y});if(w.length===0)return null;const m=z(e,w);return{type:"northOf",suspectId:n.id,otherSuspectId:m.id,text:g.northOf(n.name,m.name)}}case"southOf":{const w=i.filter(d=>{if(d.id===n.id)return!1;const o=l.get(d.id);return c.y>o.y});if(w.length===0)return null;const m=z(e,w);return{type:"southOf",suspectId:n.id,otherSuspectId:m.id,text:g.southOf(n.name,m.name)}}case"exactlyNRowsNorth":{const w=[];for(const d of i){if(d.id===n.id)continue;const p=l.get(d.id).y-c.y;p>0&&w.push({suspect:d,n:p})}if(w.length===0)return null;const m=z(e,w);return{type:"exactlyNRowsNorth",suspectId:n.id,otherSuspectId:m.suspect.id,n:m.n,text:g.exactlyNRowsNorth(n.name,m.suspect.name,m.n)}}case"exactlyNRowsSouth":{const w=[];for(const d of i){if(d.id===n.id)continue;const o=l.get(d.id),p=c.y-o.y;p>0&&w.push({suspect:d,n:p})}if(w.length===0)return null;const m=z(e,w);return{type:"exactlyNRowsSouth",suspectId:n.id,otherSuspectId:m.suspect.id,n:m.n,text:g.exactlyNRowsSouth(n.name,m.suspect.name,m.n)}}}}function Wt(e,t,a,r=1e3){const n=oe(e,Oe(t)),i=oe(e,Le(t)),l=a.length;if(l<1||l>Math.min(n.length,i.length))return null;let c=0;const g=new Map,w=new Set,m=new Set,d=oe(e,i).slice(0,l);function o(p){if(p===l)return!0;const u=a[p],h=d[p],b=oe(e,n);for(const f of b)if(!m.has(f)&&q(t.tiles[h]?.[f])){if(g.set(u.id,{suspectId:u.id,x:f,y:h}),w.add(h),m.add(f),o(p+1))return!0;if(c++,g.delete(u.id),w.delete(h),m.delete(f),c>=r)return!1}return!1}return o(0)?g:null}function Nt(e,t,a){function n(c){return a==="easy"?c:Math.ceil(a==="medium"?c*.6:c*.5)}let i=null,l=1/0;for(let c=0;c<40;c++){const g=e+c*97>>>0,w=Tt(g),m=t.floorPlans[a],d=Oe(m),o=Le(m),p=Math.min(d.length,o.length)-1;if(p<2)continue;const h=t.suspectNames.slice(0,p).map((A,v)=>({id:`s${v}`,name:A})),b=z(w,t.victimNames),f=Wt(w,m,h);if(!f)continue;const $=Array.from(f.values()),y=mt(m,$);if(!y)continue;const x=kt(m,$,y);if(!x)continue;const k=h.find(A=>A.id===x),F=z(w,t.narrativeTemplates.intro),T=z(w,t.narrativeTemplates.victimFound),W=z(w,t.narrativeTemplates.guiltyText).replace("{{killerName}}",k.name).replace("{{evidenceText}}","the evidence is conclusive"),P=Rt(w,p,a,m),B=P.length,O=[],X=oe(w,[...h]);for(let A=0;A<B;A++){const v=X[A],S=P[A];let C=ee(w,m,t,S,v,h,f);C||(C=ee(w,m,t,"inRow",v,h,f)),C||(C=ee(w,m,t,"inColumn",v,h,f)),C&&O.push(C)}let D=ve(m,h.map(A=>A.id),O);if(D.count===0)continue;if(D.count!==1)for(const A of h){if(D.count===1)break;if(O.some(S=>S.type==="inRow"&&S.suspectId===A.id))continue;const v=ee(w,m,t,"inRow",A,h,f);v&&O.push(v),D=ve(m,h.map(S=>S.id),O)}if(D.count!==1){const A=h.filter(S=>!O.some(C=>C.type==="inRow"&&C.suspectId===S.id)),v=h.filter(S=>O.some(C=>C.type==="inRow"&&C.suspectId===S.id));for(const S of[...A,...v]){if(D.count===1)break;if(O.some(L=>L.type==="inColumn"&&L.suspectId===S.id))continue;const C=ee(w,m,t,"inColumn",S,h,f);C&&O.push(C),D=ve(m,h.map(L=>L.id),O)}}if(D.count!==1)continue;const U=h.filter(A=>O.some(v=>v.type==="inRow"&&v.suspectId===A.id)&&O.some(v=>v.type==="inColumn"&&v.suspectId===A.id)).length,Y={seed:g,themeId:t.id,difficulty:a,suspects:h,victimName:b,clues:O,solution:f,victimCell:y,killer:k,narrativeIntro:F,narrativeVictimFound:T,narrativeGuilty:W,floorPlan:m};if(U<=n(p))return Y;U<l&&(l=U,i=Y)}if(i)return i;throw new Ct(`Failed to generate unique puzzle after 40 retries (seed=${e}, theme=${t.id}, difficulty=${a})`)}function s(e,t){let a=0;for(let r=0;r<t.length;r++)a=Math.imul(31,a)+t.charCodeAt(r)|0;return e[Math.abs(a)%e.length]}const Mt={width:5,height:6,tiles:[["bB","bB","bB","W","W"],["F","F","F","C","F"],["pL","F","C","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"],["W","cR","W","F","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[3,1],[4,1]]},{id:"main-area",name:"Main Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"restroom",name:"Restroom",cells:[[1,5],[3,5],[4,5]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-entrance",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},It={width:6,height:7,tiles:[["bB","bB","bB","bB","W","W"],["F","F","F","F","C","F"],["pL","F","C","F","F","F"],["F","S","F","pL","F","C"],["F","F","tB","F","F","F"],["C","F","F","F","W","F"],["W","cR","W","W","W","C"]],rooms:[{id:"bar",name:"Bar",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1]]},{id:"seating-area",name:"Seating Area",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},{id:"dining-area",name:"Dining Area",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5]]},{id:"restroom",name:"Restroom",cells:[[1,6],[5,5],[5,6]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-door",name:"the plant",x:0,y:2},{id:"plant-corner",name:"the plant",x:3,y:3},{id:"table",name:"the table",x:2,y:4},{id:"cash-register",name:"the cash register",x:1,y:6}]},At={width:7,height:8,tiles:[["bB","bB","bB","bB","bB","W","W"],["F","F","F","F","F","C","F"],["F","C","F","pL","F","F","F"],["pL","F","S","F","C","F","pL"],["F","F","F","tB","F","F","F"],["F","C","F","F","F","tB","C"],["F","F","F","F","F","W","F"],["W","cR","W","F","C","W","F"]],rooms:[{id:"bar-counter",name:"Bar Counter",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1]]},{id:"bar-seating",name:"Bar Seating",cells:[[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2]]},{id:"window-seats",name:"Window Seats",cells:[[3,2],[4,2],[5,2],[6,2]]},{id:"main-floor",name:"Main Floor",cells:[[0,3],[1,3],[2,3],[3,3],[0,4],[1,4],[2,4],[3,4]]},{id:"back-tables",name:"Back Tables",cells:[[4,3],[5,3],[6,3],[4,4],[5,4],[6,4]]},{id:"lounge",name:"Lounge",cells:[[0,5],[1,5],[2,5],[3,5],[4,5]]},{id:"terrace",name:"Terrace",cells:[[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[6,6]]},{id:"restroom",name:"Restroom",cells:[[1,7]]},{id:"back-office",name:"Back Office",cells:[[3,7],[4,7],[6,7]]}],landmarks:[{id:"bar-counter",name:"the bar counter",x:0,y:0},{id:"plant-1",name:"the plant",x:3,y:2},{id:"plant-2",name:"the plant",x:0,y:3},{id:"plant-3",name:"the plant",x:6,y:3},{id:"table",name:"the table",x:3,y:4},{id:"table-2",name:"the small table",x:5,y:5},{id:"cash-register",name:"the cash register",x:1,y:7}]},Pt={width:5,height:5,tiles:[["sH","F","W","sH","sH"],["F","F","W","F","F"],["sH","F","tB","F","sH"],["F","F","F","F","F"],["F","cR","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[2,3]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,3],[4,3]]},{id:"checkout",name:"Checkout",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:3,y:0},{id:"shelf-3",name:"the shelf",x:4,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:4,y:2},{id:"table",name:"the table",x:2,y:2},{id:"cash-register",name:"the cash register",x:1,y:4}]},Bt={width:6,height:6,tiles:[["sH","F","W","W","sH","sH"],["F","F","W","F","F","F"],["sH","F","F","F","F","sH"],["F","F","W","F","tB","F"],["F","F","F","F","F","F"],["F","cR","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,2],[3,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[3,1],[4,1],[5,1],[3,2],[4,2],[5,2],[4,3],[5,3]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4]]},{id:"romance-novels",name:"Romance Novels",cells:[[3,4],[4,4],[5,4]]},{id:"checkout",name:"Checkout",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"shelf-1",name:"the shelf",x:0,y:0},{id:"shelf-2",name:"the shelf",x:4,y:0},{id:"shelf-3",name:"the shelf",x:5,y:0},{id:"shelf-4",name:"the shelf",x:0,y:2},{id:"shelf-5",name:"the shelf",x:5,y:2},{id:"table",name:"the table",x:4,y:3},{id:"cash-register",name:"the cash register",x:1,y:5}]},Ot={width:7,height:7,tiles:[["sH","F","F","W","sH","sH","sH"],["F","F","sH","W","F","F","F"],["sH","F","F","tB","F","F","sH"],["F","F","W","W","F","tB","F"],["sH","F","F","F","F","F","F"],["F","F","F","F","F","F","sH"],["F","cR","C","C","C","F","F"]],rooms:[{id:"crime-novels",name:"Crime Novels",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"non-fiction",name:"Non-Fiction",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2]]},{id:"rare-books",name:"Rare Books",cells:[[2,1],[3,2]]},{id:"best-sellers",name:"Best Sellers",cells:[[0,3],[1,3],[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"romance-novels",name:"Romance Novels",cells:[[4,3],[5,3],[6,3],[3,4],[4,4],[5,4],[6,4],[3,5],[4,5],[5,5]]},{id:"collectors",name:"Collector's Corner",cells:[[6,5]]},{id:"checkout",name:"Checkout",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"shelf-crime",name:"the shelf",x:0,y:0},{id:"shelf-nonfic-1",name:"the shelf",x:4,y:0},{id:"shelf-nonfic-2",name:"the shelf",x:5,y:0},{id:"shelf-nonfic-3",name:"the shelf",x:6,y:0},{id:"shelf-crime-2",name:"the shelf",x:0,y:2},{id:"shelf-nonfic-4",name:"the shelf",x:6,y:2},{id:"table-1",name:"the reading table",x:3,y:2},{id:"table-2",name:"the table",x:5,y:3},{id:"shelf-best",name:"the shelf",x:0,y:4},{id:"shelf-collect",name:"the shelf",x:6,y:5},{id:"cash-register",name:"the cash register",x:1,y:6}]},Lt={width:5,height:5,tiles:[["pL","F","W","jZ","jZ"],["F","F","W","jZ","C"],["pL","F","F","F","F"],["F","C","F","F","pL"],["F","F","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[3,0],[4,0],[3,1],[4,1]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:0,y:2},{id:"plant-3",name:"the plant",x:4,y:3},{id:"jacuzzi",name:"the jacuzzi",x:3,y:0}]},zt={width:6,height:7,tiles:[["pL","F","F","W","jZ","jZ"],["F","F","F","W","jZ","C"],["F","pL","F","F","F","F"],["W","W","W","W","W","W"],["B","F","F","S","F","F"],["F","F","tV","F","F","F"],["F","F","W","F","C","F"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[4,0],[5,0],[4,1],[5,1]]},{id:"deck",name:"Deck",cells:[[3,2],[4,2],[5,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:1,y:2},{id:"jacuzzi",name:"the jacuzzi",x:4,y:0},{id:"tv",name:"the TV",x:2,y:5}]},jt={width:7,height:8,tiles:[["pL","F","F","F","W","jZ","jZ"],["F","F","pL","F","W","jZ","C"],["F","F","F","F","F","C","F"],["W","W","W","W","W","W","W"],["B","F","F","S","F","F","W"],["F","F","tV","F","F","pL","W"],["W","W","W","cT","F","F","W"],["W","W","F","F","F","W","W"]],rooms:[{id:"backyard",name:"Backyard",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2]]},{id:"jacuzzi",name:"Jacuzzi",cells:[[5,0],[6,0],[5,1],[6,1]]},{id:"deck",name:"Deck",cells:[[4,2],[5,2],[6,2]]},{id:"bedroom",name:"Bedroom",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"living-room",name:"Living Room",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5]]},{id:"kitchen",name:"Kitchen",cells:[[3,6],[4,6],[5,6],[2,7],[3,7],[4,7]]}],landmarks:[{id:"plant-1",name:"the plant",x:0,y:0},{id:"plant-2",name:"the plant",x:2,y:1},{id:"plant-3",name:"the plant",x:5,y:5},{id:"jacuzzi",name:"the jacuzzi",x:5,y:0},{id:"tv",name:"the TV",x:2,y:5},{id:"counter",name:"the counter",x:3,y:6}]},Dt={width:5,height:6,tiles:[["sT","F","F","F","sT"],["F","F","W","F","F"],["F","F","F","F","F"],["tD","F","F","F","sH"],["F","C","F","F","F"],["F","F","W","cR","F"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1]]},{id:"santas-village",name:"Santa's Village",cells:[[2,0],[3,0],[3,1],[0,3],[1,3],[2,3],[0,4],[1,4],[2,4]]},{id:"toy-store",name:"Toy Store",cells:[[4,0],[4,1]]},{id:"walkway",name:"Walkway",cells:[[0,2],[1,2],[2,2],[3,2],[4,2]]},{id:"bookstore",name:"Bookstore",cells:[[3,3],[4,3],[3,4],[4,4]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[0,5],[1,5],[3,5],[4,5]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:4,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:3},{id:"shelf",name:"the shelf",x:4,y:3},{id:"cash-register",name:"the cash register",x:3,y:5}]},Ht={width:7,height:7,tiles:[["sT","F","F","W","F","F","sT"],["F","F","W","F","F","F","F"],["F","F","F","F","F","W","F"],["F","F","F","F","F","F","F"],["tD","F","F","W","F","sH","F"],["F","C","F","W","F","F","C"],["F","F","W","F","cR","F","F"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"santas-village",name:"Santa's Village",cells:[[3,1],[4,1],[5,1],[6,1],[3,2],[4,2],[5,2]]},{id:"santas-lodge",name:"Santa's Lodge",cells:[[4,0],[5,0],[6,0]]},{id:"toy-store",name:"Toy Store",cells:[[6,2],[5,3],[6,3],[4,4],[5,4],[6,4],[5,5],[6,5]]},{id:"walkway",name:"Walkway",cells:[[0,3],[1,3],[2,3],[3,3],[4,3]]},{id:"food-court",name:"Food Court",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[0,6],[1,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:6,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:4},{id:"shelf",name:"the shelf",x:5,y:4},{id:"cash-register",name:"the cash register",x:4,y:6}]},Vt={width:8,height:8,tiles:[["sT","F","F","W","F","F","F","sT"],["F","F","W","F","F","F","F","F"],["F","F","F","F","F","W","F","F"],["F","F","F","F","F","F","F","F"],["tD","F","F","W","F","sH","F","F"],["F","C","F","W","F","F","C","F"],["F","F","W","F","cR","F","F","F"],["F","F","F","F","F","F","F","tR"]],rooms:[{id:"electronics",name:"Electronics",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[0,3],[1,3]]},{id:"santas-lodge",name:"Santa's Lodge",cells:[[4,0],[5,0],[6,0],[7,0],[4,1],[5,1],[6,1],[7,1]]},{id:"santas-village",name:"Santa's Village",cells:[[3,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]]},{id:"toy-store",name:"Toy Store",cells:[[6,2],[7,2],[6,3],[7,3],[6,4],[7,4],[6,5],[7,5]]},{id:"walkway",name:"Walkway",cells:[[2,2],[2,3],[2,4],[3,4],[4,4],[2,5],[2,6]]},{id:"food-court",name:"Food Court",cells:[[0,4],[1,4],[0,5],[1,5],[0,6],[1,6],[0,7],[1,7],[2,7]]},{id:"bookstore",name:"Bookstore",cells:[[5,4],[5,5],[4,6],[5,6],[6,6],[7,6]]},{id:"coffee-shop",name:"Coffee Shop",cells:[[3,6],[3,7],[4,7],[5,7],[6,7],[7,7]]}],landmarks:[{id:"stall-1",name:"the stall",x:0,y:0},{id:"stall-2",name:"the stall",x:7,y:0},{id:"teddy-bear",name:"the teddy bear",x:0,y:4},{id:"shelf",name:"the shelf",x:5,y:4},{id:"cash-register",name:"the cash register",x:4,y:6},{id:"tree",name:"the Christmas tree",x:7,y:7}]},_t={width:5,height:5,tiles:[["cT","cT","W","F","C"],["F","F","W","F","F"],["F","C","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},{id:"dining-room",name:"Dining Room",cells:[[3,0],[4,0],[3,1],[4,1],[2,2],[3,2],[4,2]]},{id:"bar",name:"Bar",cells:[[2,1]]},{id:"restroom",name:"Restroom",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0}]},Yt={width:6,height:6,tiles:[["cT","cT","cT","W","F","C"],["F","F","F","W","F","F"],["F","C","F","F","F","F"],["F","F","F","F","C","F"],["W","W","W","W","W","W"],["F","F","F","C","F","F"]],rooms:[{id:"kitchen",name:"Kitchen",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]]},{id:"prep-area",name:"Prep Area",cells:[[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},{id:"dining-room",name:"Dining Room",cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"patio",name:"Patio",cells:[[3,3],[4,3],[5,3]]},{id:"bar",name:"Bar",cells:[[3,1]]},{id:"private-room",name:"Private Room",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0},{id:"counter-3",name:"the counter",x:2,y:0}]},Gt={width:7,height:7,tiles:[["cT","cT","cT","cT","W","F","C"],["F","F","F","F","W","F","F"],["F","C","F","F","F","F","F"],["F","F","F","F","C","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","C","F","F","C","F"]],rooms:[{id:"kitchen-prep",name:"Kitchen Prep",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1]]},{id:"chefs-station",name:"Chef's Station",cells:[[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"front-dining",name:"Front Dining",cells:[[5,0],[6,0],[5,1],[6,1]]},{id:"back-dining",name:"Back Dining",cells:[[4,2],[5,2],[6,2],[4,3],[5,3],[6,3],[4,4],[5,4],[6,4]]},{id:"bar",name:"Bar",cells:[[4,1],[0,4],[1,4],[2,4],[3,4]]},{id:"restroom",name:"Restroom",cells:[[0,6],[1,6],[2,6]]},{id:"staff-room",name:"Staff Room",cells:[[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"counter",name:"the counter",x:0,y:0},{id:"counter-2",name:"the counter",x:1,y:0},{id:"counter-3",name:"the counter",x:2,y:0},{id:"counter-4",name:"the counter",x:3,y:0}]},Ut={width:5,height:5,tiles:[["wT","F","W","tM","tM"],["F","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"cardio",name:"Cardio",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"weight-rack",name:"the weight rack",x:0,y:0},{id:"treadmill-1",name:"the treadmill",x:3,y:0},{id:"treadmill-2",name:"the treadmill",x:4,y:0}]},Kt={width:6,height:7,tiles:[["wT","F","W","tM","tM","F"],["F","F","W","F","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","jZ","jZ"],["F","C","F","F","jZ","C"],["F","F","W","F","F","F"]],rooms:[{id:"weights",name:"Weights Area",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"cardio",name:"Cardio",cells:[[3,0],[4,0],[5,0],[3,1],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"pool",name:"Pool",cells:[[4,4],[5,4],[4,5],[5,5]]},{id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[0,5],[1,5],[2,5],[3,5]]},{id:"sauna",name:"Sauna",cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]}],landmarks:[{id:"weight-rack",name:"the weight rack",x:0,y:0},{id:"treadmill-1",name:"the treadmill",x:3,y:0},{id:"treadmill-2",name:"the treadmill",x:4,y:0},{id:"pool",name:"the pool",x:4,y:4}]},qt={width:7,height:8,tiles:[["wT","wT","F","W","tM","tM","F"],["F","F","F","W","F","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","jZ","jZ","jZ"],["F","C","F","F","jZ","C","jZ"],["F","F","W","F","F","F","F"]],rooms:[{id:"free-weights",name:"Free Weights",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]]},{id:"weight-room",name:"Weight Room",cells:[[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},{id:"cardio-front",name:"Cardio Front",cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1]]},{id:"cardio-back",name:"Cardio Back",cells:[[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"studio",name:"Studio",cells:[[3,2],[3,3]]},{id:"pool",name:"Pool",cells:[[4,5],[5,5],[6,5],[4,6],[5,6],[6,6]]},{id:"locker-room",name:"Locker Room",cells:[[0,5],[1,5],[2,5],[3,5],[0,6],[1,6],[2,6],[3,6]]},{id:"sauna",name:"Sauna",cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"weight-rack-1",name:"the weight rack",x:0,y:0},{id:"weight-rack-2",name:"the weight rack",x:1,y:0},{id:"treadmill-1",name:"the treadmill",x:4,y:0},{id:"treadmill-2",name:"the treadmill",x:5,y:0},{id:"pool",name:"the pool",x:4,y:5}]},Zt={width:5,height:5,tiles:[["dK","F","W","F","C"],["F","F","W","F","F"],["F","C","F","F","F"],["W","W","W","W","W"],["F","F","pC","F","F"]],rooms:[{id:"open-plan",name:"Open Plan",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"meeting-room",name:"Meeting Room",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"kitchen",name:"Kitchen",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"desk",name:"the desk",x:0,y:0},{id:"photocopier",name:"the photocopier",x:2,y:4}]},Jt={width:6,height:6,tiles:[["dK","F","F","W","F","C"],["F","F","F","W","F","F"],["F","C","F","F","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","pC","F","F","C","F"]],rooms:[{id:"front-office",name:"Front Office",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]]},{id:"back-office",name:"Back Office",cells:[[0,2],[1,2],[2,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},{id:"meeting-room",name:"Meeting Room",cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2]]},{id:"reception",name:"Reception",cells:[[3,1]]},{id:"kitchen",name:"Kitchen",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"desk",name:"the desk",x:0,y:0},{id:"photocopier",name:"the photocopier",x:1,y:5}]},Xt={width:7,height:7,tiles:[["dK","F","F","F","W","F","C"],["F","F","F","F","W","F","F"],["F","C","F","F","F","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","dK","F"],["W","W","W","W","W","W","W"],["F","pC","F","F","C","F","F"]],rooms:[{id:"desk-area-a",name:"Desk Area A",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2]]},{id:"desk-area-b",name:"Desk Area B",cells:[[0,3],[1,3],[2,3],[3,3],[0,4],[1,4],[2,4],[3,4]]},{id:"meeting-room",name:"Meeting Room",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2]]},{id:"managers-office",name:"Manager's Office",cells:[[4,3],[5,3],[6,3],[4,4],[5,4],[6,4]]},{id:"kitchen",name:"Kitchen",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]}],landmarks:[{id:"desk-1",name:"the desk",x:0,y:0},{id:"desk-2",name:"the manager's desk",x:5,y:4},{id:"photocopier",name:"the photocopier",x:1,y:6}]},Qt={width:5,height:5,tiles:[["fB","F","F","F","fB"],["F","F","F","F","F"],["pL","F","C","F","pL"],["F","F","F","F","F"],["F","F","fB","F","F"]],rooms:[{id:"lawn",name:"Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[0,2],[1,2],[2,2],[3,2],[4,2]]},{id:"gazebo",name:"Gazebo",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:4,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:4,y:2},{id:"flower-bed-3",name:"the flower bed",x:2,y:4}]},ea={width:6,height:6,tiles:[["fB","F","F","F","F","fB"],["F","F","F","F","F","F"],["pL","F","C","F","C","pL"],["F","F","F","F","F","F"],["F","F","jZ","jZ","F","F"],["F","F","jZ","jZ","fB","F"]],rooms:[{id:"front-lawn",name:"Front Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1]]},{id:"garden",name:"Garden",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]]},{id:"gazebo",name:"Gazebo",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},{id:"poolside",name:"Poolside",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4]]},{id:"pool-deck",name:"Pool Deck",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:5,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:5,y:2},{id:"pool",name:"the pool",x:2,y:4},{id:"flower-bed-3",name:"the flower bed",x:4,y:5}]},ta={width:7,height:8,tiles:[["fB","F","F","F","F","F","fB"],["F","F","F","F","F","F","F"],["pL","F","C","F","C","F","pL"],["F","F","F","F","F","F","F"],["F","F","jZ","jZ","jZ","F","F"],["F","F","jZ","jZ","jZ","fB","F"],["fB","F","F","W","F","F","fB"],["F","F","F","W","F","F","F"]],rooms:[{id:"front-lawn",name:"Front Lawn",cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1]]},{id:"garden-beds",name:"Garden Beds",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]]},{id:"terrace",name:"Terrace",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3]]},{id:"poolside",name:"Poolside",cells:[[0,4],[1,4],[5,4],[6,4],[0,5],[1,5],[6,5]]},{id:"greenhouse",name:"Greenhouse",cells:[[0,6],[1,6],[2,6],[0,7],[1,7],[2,7]]},{id:"garage",name:"Garage",cells:[[4,6],[5,6],[6,6],[4,7],[5,7],[6,7]]}],landmarks:[{id:"flower-bed-1",name:"the flower bed",x:0,y:0},{id:"flower-bed-2",name:"the flower bed",x:6,y:0},{id:"plant-1",name:"the plant",x:0,y:2},{id:"plant-2",name:"the plant",x:6,y:2},{id:"pool",name:"the pool",x:2,y:4},{id:"flower-bed-3",name:"the flower bed",x:5,y:5},{id:"flower-bed-4",name:"the flower bed",x:0,y:6},{id:"flower-bed-5",name:"the flower bed",x:6,y:6}]},aa={width:5,height:5,tiles:[["hB","F","W","F","C"],["hB","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","mC","F","C","F"]],rooms:[{id:"ward",name:"Ward",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"waiting-room",name:"Waiting Room",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:1,y:4}]},na={width:6,height:7,tiles:[["hB","F","F","W","F","C"],["hB","F","F","W","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","mC","F"],["F","C","F","F","F","F"],["F","F","W","F","C","F"]],rooms:[{id:"ward-a",name:"Ward A",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]]},{id:"corridor",name:"Corridor",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]]},{id:"operating-theatre",name:"Operating Theatre",cells:[[4,0],[5,0],[4,1],[5,1]]},{id:"waiting-room",name:"Waiting Room",cells:[[3,1]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4]]},{id:"recovery-ward",name:"Recovery Ward",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]},{id:"cafeteria",name:"Cafeteria",cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:4,y:4}]},ia={width:7,height:8,tiles:[["hB","F","F","F","W","F","C"],["hB","hB","F","F","W","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","mC","F","F"],["F","C","F","F","F","F","C"],["F","F","W","F","C","F","F"]],rooms:[{id:"ward-north",name:"Ward North",cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1]]},{id:"ward-south",name:"Ward South",cells:[[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},{id:"operating-theatre",name:"Operating Theatre",cells:[[5,0],[6,0],[5,1],[6,1]]},{id:"icu",name:"ICU",cells:[[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"waiting-room",name:"Waiting Room",cells:[[4,1]]},{id:"pharmacy",name:"Pharmacy",cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5]]},{id:"recovery-room",name:"Recovery Room",cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]},{id:"cafeteria",name:"Cafeteria",cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]}],landmarks:[{id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},{id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},{id:"hospital-bed-3",name:"the hospital bed",x:1,y:1},{id:"medicine-cabinet",name:"the medicine cabinet",x:4,y:5}]},oa={width:5,height:5,tiles:[["cH","F","W","sT","sT"],["cH","F","W","F","F"],["F","F","F","F","F"],["W","W","W","W","W"],["F","F","F","C","F"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},{id:"food-stands",name:"Food Stands",cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},{id:"ticket-booth",name:"Ticket Booth",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"stall-1",name:"the stall",x:3,y:0},{id:"stall-2",name:"the stall",x:4,y:0}]},ra={width:6,height:7,tiles:[["cH","F","F","W","sT","sT"],["cH","F","F","W","F","F"],["F","F","F","F","F","F"],["W","W","W","W","W","W"],["F","F","F","F","F","F"],["F","C","F","F","C","F"],["F","F","W","F","F","F"]],rooms:[{id:"carousel",name:"Carousel",cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,2]]},{id:"food-stands",name:"Food Stands",cells:[[4,0],[5,0],[4,1],[5,1],[4,2],[5,2]]},{id:"funhouse",name:"Funhouse",cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},{id:"ticket-booth",name:"Ticket Booth",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"stall-1",name:"the stall",x:4,y:0},{id:"stall-2",name:"the stall",x:5,y:0}]},sa={width:7,height:8,tiles:[["cH","F","F","F","W","sT","sT"],["cH","cH","F","F","W","F","F"],["F","F","F","F","F","F","F"],["F","F","F","F","F","F","F"],["W","W","W","W","W","W","W"],["F","F","F","F","F","F","F"],["F","C","F","F","C","F","F"],["F","F","W","F","F","F","C"]],rooms:[{id:"carousel-stage",name:"Carousel Stage",cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[0,3],[1,3]]},{id:"carousel-viewing",name:"Carousel Viewing",cells:[[2,0],[3,0],[2,1],[3,1],[2,2],[3,2],[2,3],[3,3]]},{id:"food-stands",name:"Food Stands",cells:[[5,0],[6,0],[5,1],[6,1]]},{id:"prize-games",name:"Prize Games",cells:[[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},{id:"funhouse",name:"Funhouse",cells:[[0,5],[1,5],[2,5],[0,6],[1,6],[2,6],[0,7],[1,7]]},{id:"backstage-left",name:"Backstage Left",cells:[[3,5],[4,5],[3,6],[4,6],[3,7],[4,7]]},{id:"backstage-right",name:"Backstage Right",cells:[[5,5],[6,5],[5,6],[6,6],[5,7],[6,7]]}],landmarks:[{id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},{id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},{id:"carousel-horse-3",name:"the carousel horse",x:1,y:1},{id:"stall-1",name:"the stall",x:5,y:0},{id:"stall-2",name:"the stall",x:6,y:0}]},E={"coffee-shop":{easy:Mt,medium:It,hard:At},bookstore:{easy:Pt,medium:Bt,hard:Ot},backyard:{easy:Lt,medium:zt,hard:jt},"holiday-mall":{easy:Dt,medium:Ht,hard:Vt},restaurant:{easy:_t,medium:Yt,hard:Gt},gym:{easy:Ut,medium:Kt,hard:qt},office:{easy:Zt,medium:Jt,hard:Xt},"garden-party":{easy:Qt,medium:ea,hard:ta},hospital:{easy:aa,medium:na,hard:ia},carnival:{easy:oa,medium:ra,hard:sa}};function ce(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const la={inRoom:(e,t)=>s([`${e} was in the ${t}.`,`${e} was spotted in the ${t}.`,`Witnesses placed ${e} in the ${t}.`,`According to staff, ${e} was in the ${t}.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} was nowhere near the ${t}.`,`Staff confirmed ${e} was not in the ${t}.`,`${e} never entered the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was in the same area as ${t}.`,`${e} and ${t} were seen together.`,`A regular noticed ${e} near ${t}.`,`${e} shared a space with ${t}.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different parts of the café.`,`${e} was nowhere near ${t}.`,`${e} and ${t} were not in the same area.`,`${t} confirmed they weren't near ${e}.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${ce(t)} column.`,`${e} stood in column ${t}.`,`${e}'s position was the ${ce(t)} column from the left.`],e+t),inRow:(e,t)=>s([`${e} was in the ${ce(t)} row.`,`${e} sat in row ${t}.`,`${e}'s seat was on the ${ce(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was standing next to ${t}.`,`${e} was right beside ${t}.`,`${e} and ${t} were adjacent.`,`A barista saw ${e} just one step from ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} kept their distance.`,`${e} was not close to ${t}.`,`${t} said ${e} was not nearby.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was right next to ${t}.`,`${e} was seen just by ${t}.`,`The security feed shows ${e} near ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not beside ${t}.`,`${e} was nowhere near ${t}.`,`${e} was far from ${t}.`],e+t),onSeatTile:(e,t)=>t==="chair"?s([`${e} was sitting in a chair.`,`${e} had taken a seat.`,`${e} was seated at the time.`],e):t==="sofa"?s([`${e} was on the sofa.`,`${e} had settled onto the sofa.`,`${e} was lounging on the sofa.`],e):`${e} was on the ${t}.`,notOnSeatTile:e=>s([`${e} was not sitting down.`,`${e} was on their feet.`,`${e} remained standing.`,`${e} never took a seat.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was positioned above ${t} on the floor plan.`,`${e} was closer to the entrance than ${t}.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was further back than ${t}.`,`${e} was positioned below ${t} on the floor plan.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} sat ${a} row${a>1?"s":""} ahead of ${t}.`,`There were exactly ${a} row${a>1?"s":""} between ${e} and ${t}, with ${e} to the north.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} sat ${a} row${a>1?"s":""} behind ${t}.`,`There were exactly ${a} row${a>1?"s":""} between ${e} and ${t}, with ${e} to the south.`],e+t+a)},ca={id:"coffee-shop",name:"The Coffee Shop",floorPlans:{easy:E["coffee-shop"].easy,medium:E["coffee-shop"].medium,hard:E["coffee-shop"].hard},suspectNames:["Alice","Ben","Chloe","Diego","Elena","Finlay","Grace","Hassan","Iris","Jake","Kai","Lena"],victimNames:["Victor","Violet","Vera","Valencia","Vance","Vivian"],clueTemplates:la,narrativeTemplates:{intro:["A body has been found at the Copper Bean Café. The morning rush never arrived — instead, the regulars found yellow tape across the door. You pour yourself an espresso and get to work.","The Copper Bean Café is closed for a very different reason today. Someone is dead, and the witnesses are all still clutching their lattes. You take out your notebook.","It was supposed to be a quiet Tuesday at the Copper Bean. Then the screaming started. Now it's your problem. You order a black coffee and begin."],victimFound:["The victim was discovered near table four, cold cup of coffee still in hand.","Staff found the victim behind the counter during the morning prep.","A regular spotted the victim slumped in the corner booth before opening."],guiltyText:["{{killerName}} — served with a side of motive.","{{killerName}} — the evidence is as clear as an Americano.","{{killerName}} — there's no running from the detective on this one."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:plant":"","object:cash-register":"","object:table":""}};function de(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const da={inRoom:(e,t)=>s([`${e} was browsing in the ${t}.`,`${e} was found in the ${t} section.`,`The clerk placed ${e} in the ${t}.`,`${e} spent time in the ${t}.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} never set foot in the ${t} section.`,`The clerk confirmed ${e} wasn't in the ${t}.`,`${e} was nowhere near the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was in the same section as ${t}.`,`A customer spotted ${e} browsing alongside ${t}.`,`${e} and ${t} were seen in the same aisle.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different sections.`,`${e} was nowhere near ${t}'s section.`,`The clerk noted ${e} and ${t} were apart.`,`${e} and ${t} didn't share a section.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${de(t)} column.`,`${e} stood in column ${t}.`,`${e}'s position was the ${de(t)} column from the left.`],e+t),inRow:(e,t)=>s([`${e} was in the ${de(t)} row.`,`${e} was browsing along row ${t}.`,`${e}'s position was on the ${de(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was standing right next to ${t}.`,`${e} was browsing just beside ${t}.`,`${e} and ${t} were in adjacent spots.`,`A witness saw ${e} shoulder-to-shoulder with ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} were not in the same aisle.`,`${e} kept well away from ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was standing near ${t}.`,`${e} was right beside ${t}.`,`${e} was seen next to ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} kept away from ${t}.`],e+t),onSeatTile:(e,t)=>t==="chair"?s([`${e} was sitting in a reading chair.`,`${e} had settled into one of the chairs.`,`${e} was seated at the time.`],e):`${e} was sitting on the ${t}.`,notOnSeatTile:e=>s([`${e} was not sitting down.`,`${e} was browsing on their feet.`,`${e} remained standing.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was in the front section, closer to the door than ${t}.`,`${e} was ahead of ${t} in the store.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was in the back of the store, behind ${t}.`,`${e} was further from the entrance than ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} stood ${a} row${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} stood ${a} row${a>1?"s":""} behind ${t}.`],e+t+a)},ha={id:"bookstore",name:"The Bookstore",floorPlans:{easy:E.bookstore.easy,medium:E.bookstore.medium,hard:E.bookstore.hard},suspectNames:["Alex","Bridget","Colin","Diana","Edmund","Fiona","George","Hannah","Ivan","Julia","Kevin","Lydia"],victimNames:["Vincent","Valerie","Violet","Victor","Vera","Valencia"],clueTemplates:da,narrativeTemplates:{intro:["The First Chapter Bookshop opened this morning to find more than just dust between the shelves. Someone is dead, and the regulars are still clutching their Earl Grey. You step over the crime scene tape and start asking questions.","A reader never returns a book. This one never returned at all. The First Chapter Bookshop is closed indefinitely — and you're the reason it might reopen. Notebook out.","Mondays at the bookshop are quiet. This Monday is the quietest it's ever been. The body was found in the stacks before the first customer arrived. You're on the case."],victimFound:["The victim was discovered slumped against the shelf in the early morning.","A shop assistant found the victim face-down near the reading table.","The victim was found between the shelves before opening time."],guiltyText:["{{killerName}} — the ending nobody saw coming.","{{killerName}} — the plot twist is on the last page.","{{killerName}} — even mysteries have their answers."]},colorPalette:{floor:"#f0ead6",wall:"#3d2b1f",seat:"#7a5c3a",accent:"#8b1a1a",background:"#1a1510",text:"#ffffff"},spriteMap:{"object:shelf":"","object:table":"","object:cash-register":""}};function he(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ma={inRoom:(e,t)=>s([`${e} was in the ${t}.`,`${e} was spotted out in the ${t}.`,`A neighbor saw ${e} in the ${t}.`,`${e} was hanging around the ${t}.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} never went near the ${t}.`,`A guest confirmed ${e} wasn't in the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was in the same area as ${t}.`,`${e} and ${t} were seen hanging out together.`,`A neighbor spotted ${e} near ${t}.`,`${e} was keeping close to ${t}.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different parts of the yard.`,`${e} was nowhere near ${t}.`,`${e} and ${t} weren't in the same area.`,`${t} said they weren't near ${e} all afternoon.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${he(t)} column.`,`${e} stood in column ${t}.`,`${e}'s spot was the ${he(t)} column over.`],e+t),inRow:(e,t)=>s([`${e} was in the ${he(t)} row.`,`${e} was along row ${t}.`,`${e}'s position was on the ${he(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was right next to ${t}.`,`${e} was standing just beside ${t}.`,`${e} and ${t} were right next to each other.`,`Someone saw ${e} an arm's length from ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} kept apart.`,`${e} was nowhere near ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was seen next to ${t}.`,`${e} was hanging around ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} stayed well away from ${t}.`],e+t),onSeatTile:(e,t)=>s(t==="sofa"?[`${e} was on the outdoor sofa.`,`${e} had kicked back on the sofa.`,`${e} was lounging on the sofa.`]:t==="bed"?[`${e} was in the bedroom.`,`${e} had retreated inside to the bedroom.`]:[`${e} was sitting in a chair.`,`${e} had taken one of the lawn chairs.`],e),notOnSeatTile:e=>s([`${e} was not sitting down.`,`${e} was up and about.`,`${e} was on their feet the whole time.`,`${e} never took a seat.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was closer to the fence than ${t}.`,`${e} was in front of ${t} on the property.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was deeper in the yard than ${t}.`,`${e} was behind ${t} on the property.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} step${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} step${a>1?"s":""} behind ${t}.`],e+t+a)},fa={id:"backyard",name:"The Backyard",floorPlans:{easy:E.backyard.easy,medium:E.backyard.medium,hard:E.backyard.hard},suspectNames:["Aaron","Becca","Chad","Donna","Eric","Fran","Greg","Helen","Ian","Jess","Kurt","Lisa"],victimNames:["Victor","Vanessa","Vince","Vera","Valentina","Virgil"],clueTemplates:ma,narrativeTemplates:{intro:["The Hendersons were supposed to be hosting a barbecue. Instead, they're hosting a detective. Someone is dead in the backyard and the potato salad is getting warm. You flash your badge.","Summer parties end in hangovers, not homicides. Usually. The backyard of 14 Maple Drive is now a crime scene and you're the one who has to ruin everyone's weekend.","It was a perfect Sunday afternoon until it wasn't. The body was found near the jacuzzi before anyone noticed their drink had gone untouched. You arrive with your notepad."],victimFound:["The victim was found floating face-down near the jacuzzi.","A guest discovered the victim collapsed on the deck.","The victim was found on the grass between the patio chairs."],guiltyText:["{{killerName}} — summer is ruined.","{{killerName}} — the neighborhood will never be the same.","{{killerName}} — nobody escapes the backyard detective."]},colorPalette:{floor:"#d4e8c2",wall:"#5d4037",seat:"#8d6e63",accent:"#e64a19",background:"#1a200f",text:"#ffffff"},spriteMap:{"object:plant":"","object:jacuzzi-tile":"","object:tv":"","object:sofa":""}};function me(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ua={inRoom:(e,t)=>s([`${e} was in the ${t}.`,`${e} was spotted in the ${t}.`,`Security cameras placed ${e} in the ${t}.`,`${e} spent time shopping in the ${t}.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} never entered the ${t}.`,`Security confirmed ${e} didn't visit the ${t}.`,`${e} was nowhere near the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was shopping in the same area as ${t}.`,`${e} and ${t} were seen near each other.`,`A store clerk spotted ${e} alongside ${t}.`,`${e} was browsing beside ${t}.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different parts of the mall.`,`${e} was nowhere near ${t}'s section.`,`${e} and ${t} didn't cross paths in the same store.`,`${t} confirmed they weren't near ${e}.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${me(t)} column.`,`${e} stood in column ${t}.`,`${e}'s position was the ${me(t)} column.`],e+t),inRow:(e,t)=>s([`${e} was in the ${me(t)} row.`,`${e} was along row ${t}.`,`${e}'s spot was on the ${me(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was standing right next to ${t}.`,`${e} was just a step away from ${t}.`,`${e} and ${t} were side by side.`,`A shopper saw ${e} right beside ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} kept their distance.`,`${e} was not close to ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was seen next to ${t}.`,`${e} was standing near ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} stayed away from ${t}.`],e+t),onSeatTile:(e,t)=>s([`${e} was sitting${t==="chair"?" in a chair":" on a "+t}.`,`${e} had taken a seat in the mall.`,`${e} was resting on a bench.`],e),notOnSeatTile:e=>s([`${e} was not sitting down.`,`${e} was on their feet.`,`${e} kept moving, never sat down.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was in the front section of the mall relative to ${t}.`,`${e} was closer to the main entrance than ${t}.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was deeper in the mall than ${t}.`,`${e} was further from the entrance than ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} section${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} section${a>1?"s":""} behind ${t}.`],e+t+a)},pa={id:"holiday-mall",name:"The Holiday Mall",floorPlans:{easy:E["holiday-mall"].easy,medium:E["holiday-mall"].medium,hard:E["holiday-mall"].hard},suspectNames:["Ashley","Brett","Cameron","Denise","Eli","Felicia","Grant","Holly","Irving","Jade","Kyle","Leighton"],victimNames:["Victor","Vivian","Vera","Valencia","Vince","Velma"],clueTemplates:ua,narrativeTemplates:{intro:["The North Pole Mall was supposed to close early for the holiday rush. Instead, it's closed indefinitely. The security cameras caught everything except whoever did this. You wade through the tinsel.","Christmas shopping season. The most wonderful time of year — unless you're the one who ends up under the tree with a chalk outline. You badge your way in through the entrance.","The last thing anyone expects on December 23rd is a murder at the mall. The second-to-last thing is the detective they send. Here you are anyway."],victimFound:["The victim was discovered near the gift-wrapping station before the mall opened.","Security found the victim in the walkway between the stalls.","A store manager found the victim near the Christmas tree display."],guiltyText:["{{killerName}} — some gifts aren't worth giving.","{{killerName}} — unwrapped at last.","{{killerName}} — the season's greetings end here."]},colorPalette:{floor:"#e8e0d0",wall:"#2c3e50",seat:"#7f8c8d",accent:"#c0392b",background:"#0d1117",text:"#ffffff"},spriteMap:{"object:stall":"","object:shelf":"","object:cash-register":"","object:tree":"","object:teddy-bear":""}};function fe(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ba={inRoom:(e,t)=>s([`${e} was in the ${t}.`,`${e} was seen dining in the ${t}.`,`The maître d' placed ${e} in the ${t}.`,`${e} was observed in the ${t} that evening.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} never passed through the ${t}.`,`Staff confirmed ${e} wasn't in the ${t}.`,`${e} was nowhere near the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was dining in the same area as ${t}.`,`${e} and ${t} shared the same section of the restaurant.`,`A waiter saw ${e} near ${t}.`,`${e} was at the same table section as ${t}.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different parts of the restaurant.`,`${e} was not dining near ${t}.`,`The host confirmed ${e} and ${t} were seated apart.`,`${e} and ${t} never crossed paths that evening.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${fe(t)} column.`,`${e} was positioned in column ${t}.`,`${e} was observed in the ${fe(t)} column.`],e+t),inRow:(e,t)=>s([`${e} was in the ${fe(t)} row.`,`${e} was positioned on row ${t}.`,`${e}'s location was the ${fe(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was right next to ${t}.`,`${e} and ${t} were side by side.`,`${e} was barely an arm's length from ${t}.`,`A server noted ${e} right beside ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} were not in adjacent positions.`,`${e} was not close to ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was right next to ${t}.`,`The floor plan shows ${e} right by ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e}'s seat was well away from ${t}.`],e+t),onSeatTile:(e,t)=>s(t==="sofa"?[`${e} was on the banquette seating.`,`${e} had taken the banquette.`,`${e} was settled into a banquette seat.`]:[`${e} was sitting at a table.`,`${e} was seated for the evening.`,`${e} had a chair at the table.`],e),notOnSeatTile:e=>s([`${e} was not seated.`,`${e} was standing at the time.`,`${e} had not yet been seated.`,`${e} was on their feet.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was closer to the entrance than ${t}.`,`${e} was in the front of the restaurant relative to ${t}.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was deeper in the restaurant than ${t}.`,`${e} was in the back section relative to ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} row${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} row${a>1?"s":""} behind ${t}.`],e+t+a)},ga={id:"restaurant",name:"The Restaurant",floorPlans:{easy:E.restaurant.easy,medium:E.restaurant.medium,hard:E.restaurant.hard},suspectNames:["Andre","Bianca","Carlo","Delphine","Emilio","Francoise","Gerard","Helena","Ignacio","Josephine","Kristoffer","Loretta"],victimNames:["Victor","Violette","Vincenzo","Vera","Valeria","Vidal"],clueTemplates:ba,narrativeTemplates:{intro:["La Maison Rouge was fully booked for a private function. It's now fully booked by the police. Someone didn't make it to dessert — and you're the unwanted amuse-bouche.","The head chef found the body before the morning prep. The restaurant is closed, the reservations are cancelled, and the chef is refusing to speak without a lawyer. You order espresso.","Five-star dining. One-star outcome. The Michelin inspector will not be pleased. Neither will whoever left the body in the private dining room."],victimFound:["The victim was found slumped in the private dining room.","Kitchen staff discovered the victim near the counter.","The sommelier found the victim in the dining room early in the morning."],guiltyText:["{{killerName}} — an amuse-bouche of justice.","{{killerName}} — the bill has arrived.","{{killerName}} — this dish is best served cold."]},colorPalette:{floor:"#f5e8d0",wall:"#3b1f1f",seat:"#8b1a1a",accent:"#c0392b",background:"#180a0a",text:"#ffffff"},spriteMap:{"object:bar-counter":"","object:counter":"","object:table":"","object:plant":""}};function ue(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const wa={inRoom:(e,t)=>s([`${e} was in the ${t}.`,`${e} was spotted training in the ${t}.`,`Staff placed ${e} in the ${t} zone.`,`${e} spent time working out in the ${t}.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} never used the ${t}.`,`The trainer confirmed ${e} wasn't in the ${t}.`,`${e} was nowhere near the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was training in the same zone as ${t}.`,`${e} and ${t} were spotted working out together.`,`The trainer saw ${e} near ${t}.`,`${e} and ${t} shared the same section of the gym.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were training in different zones.`,`${e} was nowhere near ${t}'s area.`,`${e} and ${t} never shared the same zone.`,`The trainer noted ${e} and ${t} were apart.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${ue(t)} column.`,`${e} was positioned in column ${t}.`,`${e} was located in the ${ue(t)} column.`],e+t),inRow:(e,t)=>s([`${e} was in the ${ue(t)} row.`,`${e} trained along row ${t}.`,`${e}'s position was on the ${ue(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was working out right next to ${t}.`,`${e} and ${t} were training side by side.`,`${e} was barely a step from ${t}.`,`A trainer noticed ${e} right beside ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} were not training next to each other.`,`${e} kept a distance from ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was training right next to ${t}.`,`${e} was seen near ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} kept away from ${t}.`],e+t),onSeatTile:(e,t)=>s([`${e} was sitting on a bench.`,`${e} had taken a rest on a bench.`,`${e} was seated at the time.`],e),notOnSeatTile:e=>s([`${e} was not sitting down.`,`${e} was on their feet.`,`${e} was actively moving around.`,`${e} never sat down during the session.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was in the front section of the gym relative to ${t}.`,`${e} was closer to the entrance than ${t}.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was in the back section of the gym relative to ${t}.`,`${e} was further from the entrance than ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} row${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} row${a>1?"s":""} behind ${t}.`],e+t+a)},ya={id:"gym",name:"The Gym",floorPlans:{easy:E.gym.easy,medium:E.gym.medium,hard:E.gym.hard},suspectNames:["Atlas","Blair","Corey","Dakota","Evander","Fitz","Gabe","Hunter","Indira","Jordan","Knox","Leila"],victimNames:["Vance","Valentina","Viktor","Vera","Vito","Vesper"],clueTemplates:wa,narrativeTemplates:{intro:["FitLife Gym opens at 5am. This morning it opened to a body near the weight rack. The morning regulars are sweating for a different reason now.","Somebody skipped leg day — and left somebody else skipping all days. The body was found in the Weights area. You badge through the turnstile.","The gym is 24 hours. The victim wasn't. You arrive with your notepad and a distinct lack of enthusiasm for the treadmill."],victimFound:["The victim was found near the weight rack before the early shift.","A trainer discovered the victim collapsed in the cardio area.","The victim was found in the pool area during the morning check."],guiltyText:["{{killerName}} — no amount of cardio outpaces the truth.","{{killerName}} — their reps are done.","{{killerName}} — spotting the killer was the easy part."]},colorPalette:{floor:"#e8e0d8",wall:"#2c3e50",seat:"#7f8c8d",accent:"#e74c3c",background:"#0d1117",text:"#ffffff"},spriteMap:{"object:weight-rack":"","object:treadmill":"","object:counter":"","object:jacuzzi-tile":""}};function pe(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const $a={inRoom:(e,t)=>s([`${e} was in the ${t}.`,`${e} was seen working in the ${t}.`,`Access logs confirm ${e} was in the ${t}.`,`${e} spent time in the ${t} that day.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} never entered the ${t}.`,`Access logs show ${e} was not in the ${t}.`,`Colleagues confirmed ${e} wasn't in the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was working in the same area as ${t}.`,`${e} and ${t} shared the same workspace.`,`A colleague saw ${e} near ${t}.`,`${e} was at the same section as ${t}.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different parts of the office.`,`${e} was not in the same area as ${t}.`,`The floor plan places ${e} and ${t} in separate zones.`,`${t} confirmed they weren't near ${e}.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${pe(t)} column.`,`${e}'s position was column ${t}.`,`${e} was in the ${pe(t)} column.`],e+t),inRow:(e,t)=>s([`${e} was in the ${pe(t)} row.`,`${e} was on row ${t}.`,`${e} was on the ${pe(t)} row of the floor plan.`],e+t),besideSuspect:(e,t)=>s([`${e} was right next to ${t}.`,`${e} and ${t} were in adjacent positions.`,`${e} was barely a step from ${t}.`,`A colleague noticed ${e} right beside ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} were not in adjacent positions.`,`${e} was not close to ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was right next to ${t}.`,`${e} was near ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} kept away from ${t}.`],e+t),onSeatTile:(e,t)=>s([`${e} was sitting down.`,`${e} was seated at the time.`,`${e} had taken a seat.`,`${e} was not on their feet.`],e),notOnSeatTile:e=>s([`${e} was not sitting down.`,`${e} was on their feet.`,`${e} was standing or moving around.`,`${e} was not seated.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was closer to the entrance than ${t}.`,`${e} was in the front section of the office relative to ${t}.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was further from the entrance than ${t}.`,`${e} was in the back section relative to ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} row${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} row${a>1?"s":""} behind ${t}.`],e+t+a)},xa={id:"office",name:"The Office",floorPlans:{easy:E.office.easy,medium:E.office.medium,hard:E.office.hard},suspectNames:["Adrian","Brooke","Clive","Daria","Edwin","Fiona","Graham","Harriet","Isaac","Judith","Kieran","Laura"],victimNames:["Vincent","Veronica","Vance","Vivienne","Victor","Velvet"],clueTemplates:$a,narrativeTemplates:{intro:["Meridian Corp. Floor 12. The quarterly review meeting has been cancelled for the most permanent possible reason. You badge in and start asking questions before the lawyers arrive.","The victim was found at their desk. The access log shows they never left last night. Whoever did this knew the building. You start with the people who knew it best.","It was supposed to be a normal Monday. Then the HR department filed the wrong kind of incident report. You turn off your phone's out-of-office message and get to work."],victimFound:["The victim was found at their desk during the morning security check.","The building manager found the victim in the Meeting Room after the overnight shift.","A colleague discovered the victim in the Server Room at 7am."],guiltyText:["{{killerName}} — the performance review was terminal.","{{killerName}} — this one won't go in the quarterly report.","{{killerName}} — consider this case closed."]},colorPalette:{floor:"#e8e8f0",wall:"#34495e",seat:"#7f8c8d",accent:"#2980b9",background:"#0a0a14",text:"#ffffff"},spriteMap:{"object:desk":"","object:photocopier":"","object:tv":"","object:plant":""}};function te(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Fa={inRoom:(e,t)=>s([`${e} was in the ${t}.`,`${e} was seen mingling in the ${t}.`,`Other guests placed ${e} in the ${t}.`,`${e} spent the afternoon in the ${t}.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} never ventured to the ${t}.`,`Guests confirmed ${e} wasn't in the ${t}.`,`${e} was not seen in the ${t} all afternoon.`],e+t),inSameRoom:(e,t)=>s([`${e} was in the same area as ${t}.`,`${e} and ${t} were mingling in the same spot.`,`A guest saw ${e} near ${t}.`,`${e} and ${t} were together at the party.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different parts of the garden.`,`${e} was not near ${t} during the party.`,`Guests saw ${e} and ${t} in separate areas.`,`${t} mentioned they weren't near ${e}.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${te(t)} column.`,`${e} stood in column ${t} of the garden.`,`${e}'s position was the ${te(t)} column from the edge.`],e+t),inRow:(e,t)=>s([`${e} was in the ${te(t)} row.`,`${e} was along the ${te(t)} row of the garden.`,`${e}'s spot was on the ${te(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was standing right next to ${t}.`,`${e} and ${t} were chatting side by side.`,`A guest noticed ${e} just beside ${t}.`,`${e} and ${t} were barely a step apart.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} kept apart during the party.`,`${e} was not close to ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was found near ${t}.`,`${e} was standing just by ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} was far from ${t}.`],e+t),onSeatTile:(e,t)=>s([`${e} was sitting on a garden chair.`,`${e} had taken one of the garden chairs.`,`${e} was seated outside.`,`${e} was in a chair at the time.`],e),notOnSeatTile:e=>s([`${e} was not sitting down.`,`${e} was up and circulating.`,`${e} was standing during the party.`,`${e} had not taken a seat.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was in the front section of the garden relative to ${t}.`,`${e} was closer to the gate than ${t}.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was deeper in the garden than ${t}.`,`${e} was further from the gate than ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} step${a>1?"s":""} ahead of ${t} in the garden.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} step${a>1?"s":""} behind ${t} in the garden.`],e+t+a)},va={id:"garden-party",name:"The Garden Party",floorPlans:{easy:E["garden-party"].easy,medium:E["garden-party"].medium,hard:E["garden-party"].hard},suspectNames:["Arabella","Benedict","Cecily","Damien","Eleanor","Freddie","Georgina","Hugo","Imogen","Jasper","Kit","Lavinia"],victimNames:["Violet","Valentine","Verity","Viscount","Viola","Vaughn"],clueTemplates:Fa,narrativeTemplates:{intro:["The Westerleigh garden party was the social event of summer. It is no longer a social event. The body was found beneath the roses and you've been asked — very politely — to investigate.","Champagne, strawberries, murder. The annual garden party at Fernwood House has taken a distinctly unfestive turn. You decline the cucumber sandwiches and start asking questions.","The gazebo was booked for afternoon tea. It is now a crime scene. You roll up your sleeves and walk across the manicured lawn."],victimFound:["The victim was found in the Greenhouse before the afternoon guests arrived.","A gardener discovered the victim on the Lawn near the flower beds.","The caterers found the victim in the Gazebo."],guiltyText:["{{killerName}} — the summer is wilted.","{{killerName}} — cut down in their prime.","{{killerName}} — this garden party is over."]},colorPalette:{floor:"#d4f0c0",wall:"#5d4037",seat:"#7cb342",accent:"#e91e63",background:"#0a1f0a",text:"#ffffff"},spriteMap:{"object:flower-bed":"","object:plant":""}};function ke(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const ka={inRoom:(e,t)=>s([`${e} was in the ${t}.`,`${e} was recorded in the ${t}.`,`Hospital logs confirm ${e} was in the ${t}.`,`${e} was present in the ${t} at the time.`],e+t),notInRoom:(e,t)=>s([`${e} was not in the ${t}.`,`${e} was not recorded in the ${t}.`,`Staff confirmed ${e} was absent from the ${t}.`,`${e} had no reason to be in the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was in the same ward as ${t}.`,`${e} and ${t} were logged in the same area.`,`A nurse placed ${e} alongside ${t}.`,`${e} was observed near ${t} at the time.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different parts of the hospital.`,`${e} was not in the same area as ${t}.`,`Logs confirm ${e} and ${t} were in separate zones.`,`${t} was not in ${e}'s section.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${ke(t)} column.`,`${e}'s position was column ${t}.`,`${e} was recorded in column ${t}.`],e+t),inRow:(e,t)=>s([`${e} was in the ${ke(t)} row.`,`${e} was logged at row ${t}.`,`${e}'s position was on the ${ke(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was standing right next to ${t}.`,`${e} was observed in proximity to ${t}.`,`${e} and ${t} were in adjacent positions.`,`A nurse noted ${e} directly beside ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} were not in adjacent positions.`,`${e} was not in proximity to ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was found adjacent to ${t}.`,`${e} was in the immediate vicinity of ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not adjacent to ${t}.`,`${e} was not beside ${t}.`],e+t),onSeatTile:(e,t)=>s(t==="bed"?[`${e} was in a hospital bed.`,`${e} was admitted and lying in bed.`,`${e} was bedridden at the time.`]:t==="sofa"?[`${e} was in the waiting area.`,`${e} was seated in the waiting room.`,`${e} had not yet been admitted — still waiting.`]:[`${e} was sitting down.`,`${e} was seated at the time.`],e),notOnSeatTile:e=>s([`${e} was not sitting or lying down.`,`${e} was on their feet.`,`${e} was ambulatory at the time.`,`${e} was standing throughout.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e}'s position was closer to the entrance than ${t}'s.`,`${e} was further north in the building than ${t}.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was further back in the building than ${t}.`,`${e}'s position was further from the entrance than ${t}'s.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} floor${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} floor${a>1?"s":""} behind ${t}`],e+t+a)},Sa={id:"hospital",name:"The Hospital",floorPlans:{easy:E.hospital.easy,medium:E.hospital.medium,hard:E.hospital.hard},suspectNames:["Aleksei","Beatrix","Conrad","Dorothea","Emil","Francesca","Gunnar","Hilde","Igor","Jana","Klaus","Liselotte"],victimNames:["Viktor","Valentina","Vera","Valentin","Vesna","Volkmar"],clueTemplates:ka,narrativeTemplates:{intro:["St Crispin's Hospital is where people come to recover. This one didn't make it. The night shift just ended and nobody has an alibi. You flash your badge at the nurses' station.","A hospital is the last place you expect a murder — or the first. The body was found during morning rounds. You put on gloves and start taking statements.","The patient was admitted last night. By morning, they were a victim. Someone in this building knows what happened and you're going to find out who."],victimFound:["The victim was found in the Ward during the overnight nursing check.","The on-call doctor discovered the victim in the Operating Theatre.","The victim was found in the Pharmacy storage area."],guiltyText:["{{killerName}} — the prognosis was never good.","{{killerName}} — no treatment for this outcome.","{{killerName}} — discharged permanently."]},colorPalette:{floor:"#f0f4f8",wall:"#2c3e50",seat:"#7f8c8d",accent:"#e74c3c",background:"#0a0d12",text:"#ffffff"},spriteMap:{"object:hospital-bed":"","object:medicine-cabinet":""}};function ae(e){const t=["th","st","nd","rd"],a=e%100;return e+(t[(a-20)%10]??t[a]??t[0])}const Ca={inRoom:(e,t)=>s([`${e} was at the ${t}.`,`${e} was spotted at the ${t}.`,`Carnies placed ${e} at the ${t}.`,`${e} was seen hanging around the ${t}.`],e+t),notInRoom:(e,t)=>s([`${e} was not at the ${t}.`,`${e} never visited the ${t}.`,`The carnie confirmed ${e} wasn't at the ${t}.`,`${e} steered clear of the ${t}.`],e+t),inSameRoom:(e,t)=>s([`${e} was in the same area as ${t}.`,`${e} and ${t} were seen at the same attraction.`,`A vendor spotted ${e} near ${t}.`,`${e} and ${t} were together in the crowd.`],e+t),inDifferentRoom:(e,t)=>s([`${e} and ${t} were in different parts of the carnival.`,`${e} was nowhere near ${t}'s attraction.`,`${e} and ${t} were at opposite ends of the fairground.`,`${t} said they hadn't seen ${e} nearby.`],e+t),inColumn:(e,t)=>s([`${e} was in the ${ae(t)} column.`,`${e} stood in column ${t} of the fairground.`,`${e}'s position was the ${ae(t)} column.`],e+t),inRow:(e,t)=>s([`${e} was in the ${ae(t)} row.`,`${e} was along the ${ae(t)} row of attractions.`,`${e}'s position was on the ${ae(t)} row.`],e+t),besideSuspect:(e,t)=>s([`${e} was right next to ${t}.`,`${e} and ${t} were shoulder to shoulder in the crowd.`,`A vendor saw ${e} just beside ${t}.`,`${e} was barely a step from ${t}.`],e+t),notBesideSuspect:(e,t)=>s([`${e} was not beside ${t}.`,`${e} and ${t} were apart in the crowd.`,`${e} was not close to ${t}.`],e+t),besideObject:(e,t)=>s([`${e} was beside ${t}.`,`${e} was seen right by ${t}.`,`${e} was standing near ${t}.`],e+t),notBesideObject:(e,t)=>s([`${e} was not near ${t}.`,`${e} was not beside ${t}.`,`${e} kept away from ${t}.`],e+t),onSeatTile:(e,t)=>s([`${e} was seated at one of the stalls.`,`${e} had taken a seat by a stall.`,`${e} was sitting at the time.`,`${e} was resting on one of the benches.`],e),notOnSeatTile:e=>s([`${e} was not sitting down.`,`${e} was moving through the crowd.`,`${e} was on their feet.`,`${e} hadn't stopped to sit all evening.`],e),northOf:(e,t)=>s([`${e} was north of ${t}.`,`${e} was in the front section of the carnival relative to ${t}.`,`${e} was closer to the main entrance than ${t}.`],e+t),southOf:(e,t)=>s([`${e} was south of ${t}.`,`${e} was in the back of the fairground relative to ${t}.`,`${e} was further from the entrance than ${t}.`],e+t),exactlyNRowsNorth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,`${e} was ${a} attraction-row${a>1?"s":""} ahead of ${t}.`],e+t+a),exactlyNRowsSouth:(e,t,a)=>s([`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`,`${e} was ${a} attraction-row${a>1?"s":""} behind ${t}.`],e+t+a)},Ta={id:"carnival",name:"The Carnival",floorPlans:{easy:E.carnival.easy,medium:E.carnival.medium,hard:E.carnival.hard},suspectNames:["Alistair","Brigitte","Cosmo","Dafne","Ezra","Flavia","Gideon","Harriet","Ignatius","Juno","Kit","Ludo"],victimNames:["Victor","Valentina","Vex","Vane","Vesper","Volta"],clueTemplates:Ca,narrativeTemplates:{intro:["The Twilight Carnival has been travelling for thirty years without incident. Last night ended that streak. The body was found between the Carousel and the Funhouse. You came for the cotton candy.","Someone killed the Ringmaster. Or maybe the Ringmaster killed someone. Either way, the show is not going on tonight. You arrive as the last customers are being turned away.","Carnivals attract all sorts. This one attracted a detective. The body was found before morning setup. You pull on your coat and walk between the tents."],victimFound:["The victim was found near the Carousel before the carnival opened.","The ride operator discovered the victim in the Funhouse corridor.","The victim was found behind the Food Stands at dawn."],guiltyText:["{{killerName}} — the last act.","{{killerName}} — the fun is over.","{{killerName}} — tickets have been cancelled."]},colorPalette:{floor:"#f5deb3",wall:"#4a235a",seat:"#884ea0",accent:"#e74c3c",background:"#0d0a14",text:"#ffffff"},spriteMap:{"object:carousel-horse":"","object:stall":""}},Ea={inRoom:(e,t)=>`${e} was in the ${t}.`,notInRoom:(e,t)=>`${e} was not in the ${t}.`,inSameRoom:(e,t)=>`${e} was in the same room as ${t}.`,inDifferentRoom:(e,t)=>`${e} and ${t} were in different rooms.`,inColumn:(e,t)=>`${e} was in column ${t}.`,inRow:(e,t)=>`${e} was in row ${t}.`,besideSuspect:(e,t)=>`${e} was beside ${t}.`,notBesideSuspect:(e,t)=>`${e} was not beside ${t}.`,besideObject:(e,t)=>`${e} was beside ${t}.`,notBesideObject:(e,t)=>`${e} was not beside ${t}.`,onSeatTile:(e,t)=>`${e} was on a ${t}.`,notOnSeatTile:e=>`${e} was not sitting down.`,northOf:(e,t)=>`${e} was north of ${t}.`,southOf:(e,t)=>`${e} was south of ${t}.`,exactlyNRowsNorth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} north of ${t}.`,exactlyNRowsSouth:(e,t,a)=>`${e} was exactly ${a} row${a>1?"s":""} south of ${t}.`},Ra={id:"stub",name:"Test Room",floorPlans:{easy:E["coffee-shop"].easy,medium:E["coffee-shop"].medium,hard:E["coffee-shop"].hard},suspectNames:["Alice","Bob","Carol","Dave","Eve","Frank","Grace","Henry","Iris","Jack","Kate","Leo"],victimNames:["Vera","Victor","Violet","Valencia","Vance","Vivian"],clueTemplates:Ea,narrativeTemplates:{intro:["A crime has occurred in the Test Room.","Witnesses report suspicious activity.","The detective arrives on the scene."],victimFound:["The victim was found at the scene.","A body has been discovered.","The victim was discovered here."],guiltyText:["{{killerName}} — caught red-handed.","{{killerName}} — the evidence is clear.","{{killerName}} — guilty as charged."]},colorPalette:{floor:"#f5e6d3",wall:"#4a3728",seat:"#8b6914",accent:"#c0392b",background:"#1a1a2e",text:"#ffffff"},spriteMap:{}},ze=new Map;function V(e){ze.set(e.id,e)}function ut(e){const t=ze.get(e);if(!t)throw new Error(`Unknown theme: ${e}`);return t}function Wa(){return Array.from(ze.values())}V(ca);V(ha);V(fa);V(pa);V(ga);V(ya);V(xa);V(va);V(Sa);V(Ta);V(Ra);const M=(e,t="#1a120a")=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="${t}"/>${e}</svg>`,Ue={chair:M(`
    <rect x="8" y="18" width="16" height="10" rx="1" fill="#8b6914"/>
    <rect x="8" y="8"  width="4"  height="12" rx="1" fill="#7a5c10"/>
    <rect x="20" y="8" width="4"  height="12" rx="1" fill="#7a5c10"/>
    <rect x="8" y="6"  width="16" height="5"  rx="1" fill="#a07820"/>
    <rect x="10" y="19" width="3" height="8"  rx="1" fill="#7a5c10"/>
    <rect x="19" y="19" width="3" height="8"  rx="1" fill="#7a5c10"/>
  `,"#f5e6d3"),sofa:M(`
    <rect x="4"  y="16" width="24" height="11" rx="2" fill="#8b6914"/>
    <rect x="4"  y="10" width="5"  height="18" rx="2" fill="#7a5c10"/>
    <rect x="23" y="10" width="5"  height="18" rx="2" fill="#7a5c10"/>
    <rect x="4"  y="8"  width="24" height="6"  rx="2" fill="#a07820"/>
    <line x1="15" y1="16" x2="15" y2="27" stroke="#7a5c10" stroke-width="1.5"/>
  `,"#f5e6d3"),bed:M(`
    <rect x="4"  y="6"  width="24" height="20" rx="2" fill="#ddd0b8"/>
    <rect x="4"  y="6"  width="24" height="7"  rx="2" fill="#c0a878"/>
    <rect x="6"  y="7"  width="20" height="5"  rx="1" fill="#e8d8b0"/>
    <rect x="4"  y="6"  width="5"  height="20" rx="1" fill="#8b6914"/>
    <rect x="23" y="6"  width="5"  height="20" rx="1" fill="#8b6914"/>
    <rect x="4"  y="22" width="24" height="4"  rx="1" fill="#8b6914"/>
  `,"#f5e6d3"),"object:plant":M(`
    <rect x="11" y="22" width="10" height="7" rx="1" fill="#8b6332"/>
    <rect x="13" y="20" width="6"  height="3" fill="#7a5528"/>
    <ellipse cx="16" cy="13" rx="8" ry="9" fill="#2d7a2d"/>
    <ellipse cx="10" cy="17" rx="5" ry="6" fill="#3a9a3a"/>
    <ellipse cx="22" cy="17" rx="5" ry="6" fill="#3a9a3a"/>
    <ellipse cx="16" cy="8"  rx="4" ry="5" fill="#4cb84c"/>
    <ellipse cx="16" cy="13" rx="3" ry="3" fill="#5cd65c"/>
  `),"object:bar-counter":M(`
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
  `),"object:cash-register":M(`
    <rect x="4"  y="10" width="24" height="18" rx="2" fill="#2a2a2a"/>
    <rect x="6"  y="12" width="20" height="10" rx="1" fill="#1a6a1a"/>
    <rect x="7"  y="13" width="18" height="8"  rx="0" fill="#0d4d0d"/>
    <rect x="8"  y="14" width="16" height="5"  rx="0" fill="#00cc00" opacity="0.8"/>
    <rect x="4"  y="24" width="24" height="4"  rx="1" fill="#1a1a1a"/>
    <rect x="10" y="7"  width="12" height="5"  rx="1" fill="#333"/>
    <rect x="12" y="5"  width="8"  height="3"  rx="1" fill="#444"/>
    <rect x="7"  y="26" width="18" height="2"  rx="0" fill="#555" opacity="0.5"/>
  `),"object:table":M(`
    <rect x="4"  y="12" width="24" height="10" rx="1" fill="#9a6030"/>
    <rect x="3"  y="10" width="26" height="3"  rx="1" fill="#b07840"/>
    <rect x="5"  y="22" width="4"  height="8"  rx="1" fill="#7a4820"/>
    <rect x="23" y="22" width="4"  height="8"  rx="1" fill="#7a4820"/>
  `),"object:shelf":M(`
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
  `),"object:counter":M(`
    <rect x="2"  y="8"  width="28" height="18" rx="2" fill="#888888"/>
    <rect x="2"  y="6"  width="28" height="4"  rx="1" fill="#aaaaaa"/>
    <rect x="4"  y="10" width="8"  height="6"  rx="1" fill="#666"/>
    <rect x="14" y="10" width="8"  height="6"  rx="1" fill="#666"/>
    <rect x="4"  y="18" width="24" height="6"  rx="1" fill="#777"/>
    <rect x="14" y="4"  width="4"  height="4"  rx="1" fill="#999"/>
  `),"object:desk":M(`
    <rect x="2"  y="10" width="28" height="16" rx="2" fill="#7a5028"/>
    <rect x="2"  y="8"  width="28" height="4"  rx="1" fill="#9a6838"/>
    <rect x="4"  y="12" width="10" height="8"  rx="1" fill="#1a1a2a"/>
    <rect x="5"  y="13" width="8"  height="6"  rx="0" fill="#2233aa" opacity="0.8"/>
    <rect x="14" y="12" width="5"  height="6"  rx="1" fill="#555"/>
    <rect x="14" y="13" width="4"  height="4"  fill="#888" opacity="0.5"/>
    <rect x="20" y="12" width="8"  height="4"  rx="0" fill="#888" opacity="0.3"/>
    <rect x="2"  y="24" width="5"  height="8"  rx="1" fill="#6a4018"/>
    <rect x="25" y="24" width="5"  height="8"  rx="1" fill="#6a4018"/>
  `),"object:photocopier":M(`
    <rect x="4"  y="8"  width="24" height="20" rx="2" fill="#555"/>
    <rect x="4"  y="6"  width="24" height="6"  rx="2" fill="#777"/>
    <rect x="6"  y="7"  width="20" height="4"  rx="1" fill="#aaa" opacity="0.4"/>
    <rect x="6"  y="10" width="20" height="14" rx="1" fill="#444"/>
    <rect x="8"  y="12" width="16" height="10" rx="0" fill="#1a1a1a"/>
    <rect x="8"  y="12" width="16" height="1"  fill="#fff" opacity="0.5"/>
    <rect x="18" y="7"  width="4"  height="3"  rx="1" fill="#00aa00"/>
    <rect x="23" y="7"  width="3"  height="3"  rx="1" fill="#aa0000"/>
  `),"object:tv":M(`
    <rect x="4"  y="4"  width="24" height="18" rx="2" fill="#1a1a1a"/>
    <rect x="6"  y="6"  width="20" height="14" rx="1" fill="#0a2a4a"/>
    <rect x="6"  y="6"  width="20" height="14" rx="1" fill="#1a5a8a" opacity="0.6"/>
    <rect x="6"  y="6"  width="10" height="7"  rx="0" fill="#fff" opacity="0.08"/>
    <rect x="14" y="22" width="4"  height="6"  rx="0" fill="#333"/>
    <rect x="10" y="27" width="12" height="3"  rx="1" fill="#222"/>
    <circle cx="26" cy="7" r="1.5" fill="#00cc00"/>
  `),"object:flower-bed":M(`
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
  `),"object:hospital-bed":M(`
    <rect x="2"  y="8"  width="28" height="20" rx="2" fill="#e8e8e8"/>
    <rect x="2"  y="8"  width="28" height="6"  rx="2" fill="#cccccc"/>
    <rect x="4"  y="9"  width="24" height="4"  rx="1" fill="#ffffff"/>
    <rect x="2"  y="8"  width="5"  height="20" rx="1" fill="#aaaaaa"/>
    <rect x="25" y="8"  width="5"  height="20" rx="1" fill="#aaaaaa"/>
    <rect x="2"  y="24" width="28" height="4"  rx="1" fill="#aaaaaa"/>
    <rect x="4"  y="26" width="3"  height="6"  rx="1" fill="#888"/>
    <rect x="25" y="26" width="3"  height="6"  rx="1" fill="#888"/>
    <rect x="14" y="7"  width="4"  height="3"  rx="0" fill="#4444aa"/>
  `),"object:medicine-cabinet":M(`
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
  `),"object:weight-rack":M(`
    <rect x="12" y="4"  width="8"  height="24" rx="1" fill="#444"/>
    <rect x="2"  y="8"  width="28" height="4"  rx="1" fill="#555"/>
    <rect x="2"  y="20" width="28" height="4"  rx="1" fill="#555"/>
    <rect x="2"  y="8"  width="5"  height="16" rx="1" fill="#666" opacity="0.8"/>
    <rect x="6"  y="9"  width="3"  height="14" rx="0" fill="#888"/>
    <rect x="11" y="9"  width="3"  height="14" rx="0" fill="#888"/>
    <rect x="25" y="8"  width="5"  height="16" rx="1" fill="#666" opacity="0.8"/>
    <rect x="23" y="9"  width="3"  height="14" rx="0" fill="#888"/>
    <rect x="18" y="9"  width="3"  height="14" rx="0" fill="#888"/>
  `),"object:treadmill":M(`
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
  `),"object:stall":M(`
    <rect x="2"  y="4"  width="28" height="24" rx="1" fill="#9a6028"/>
    <rect x="2"  y="4"  width="28" height="5"  rx="1" fill="#c08040"/>
    <rect x="3"  y="4"  width="26" height="28" rx="0" stroke="#7a4818" stroke-width="2" fill="none"/>
    <rect x="8"  y="10" width="16" height="12" rx="1" fill="#7a4818"/>
    <rect x="9"  y="11" width="14" height="10" rx="0" fill="#1a1a1a" opacity="0.7"/>
    <rect x="9"  y="11" width="6"  height="10" rx="0" fill="#2a2a2a"/>
    <rect x="10" y="12" width="4"  height="8"  rx="0" fill="#c08040" opacity="0.4"/>
    <rect x="14" y="14" width="3"  height="2"  rx="0" fill="#888"/>
    <rect x="6"  y="22" width="20" height="2"  fill="#7a4818"/>
  `),"object:carousel-horse":M(`
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
  `),"object:jacuzzi-tile":M(`
    <rect x="2"  y="2"  width="28" height="28" rx="3" fill="#1a6a9a"/>
    <rect x="4"  y="4"  width="24" height="24" rx="2" fill="#2288cc"/>
    <ellipse cx="16" cy="16" rx="10" ry="8" fill="#44aaee" opacity="0.5"/>
    <path d="M6 16 Q10 12 14 16 Q18 20 22 16 Q26 12 28 16" stroke="#88ccff" stroke-width="1.5" fill="none" opacity="0.7"/>
    <path d="M6 20 Q10 16 14 20 Q18 24 22 20 Q26 16 28 20" stroke="#88ccff" stroke-width="1.5" fill="none" opacity="0.5"/>
    <circle cx="10" cy="12" r="1.5" fill="#ffffff" opacity="0.6"/>
    <circle cx="20" cy="10" r="1.5" fill="#ffffff" opacity="0.6"/>
    <circle cx="25" cy="18" r="1"   fill="#ffffff" opacity="0.6"/>
  `),"object:teddy-bear":M(`
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
  `),"object:tree":M(`
    <rect x="13" y="22" width="6"  height="8"  rx="1" fill="#7a4818"/>
    <polygon points="16,2 4,16 28,16" fill="#1a7a1a"/>
    <polygon points="16,6 5,18 27,18" fill="#2a9a2a"/>
    <polygon points="16,10 7,22 25,22" fill="#3ab83a"/>
    <circle cx="16" cy="2" r="2" fill="#4cd84c"/>
  `)};let R=64;function Na(e,t,a,r){const n=window.innerWidth,i=window.innerHeight,l=n<700,c=a??(l?n-16:n*.62),g=r??(l?i*.55:i-80),w=c/e,m=g/t;return R=Math.max(l?28:48,Math.min(l?72:96,Math.floor(Math.min(w,m)))),R}const Se=new Map,Ce=new Set;function Ke(e,t){if(!e)return null;if(Se.has(e))return Se.get(e);if(Ce.has(e))return null;Ce.add(e);const a=new Image,r=new Blob([e],{type:"image/svg+xml"}),n=URL.createObjectURL(r);return a.onload=()=>{Se.set(e,a),Ce.delete(e),URL.revokeObjectURL(n),t?.()},a.src=n,null}const ne="'Press Start 2P', monospace",qe=["rgba(192, 120,  40, 0.18)","rgba( 40, 100, 180, 0.16)","rgba( 40, 150,  80, 0.16)","rgba(160,  40, 100, 0.16)","rgba(140, 120,  40, 0.16)","rgba( 80,  40, 160, 0.16)"],be=["rgba(220, 140,  40, 0.75)","rgba( 60, 120, 220, 0.75)","rgba( 40, 170,  80, 0.75)","rgba(200,  40, 120, 0.75)","rgba(180, 160,  20, 0.75)","rgba(100,  40, 200, 0.75)"],Ma={pL:"object:plant",tB:"object:table",sH:"object:shelf",cR:"object:cash-register",bB:"object:bar-counter",tV:"object:tv",cT:"object:counter",dK:"object:desk",pC:"object:photocopier",fB:"object:flower-bed",hB:"object:hospital-bed",mC:"object:medicine-cabinet",tR:"object:tree",tD:"object:teddy-bear",cH:"object:carousel-horse",tM:"object:treadmill",wT:"object:weight-rack",sT:"object:stall",jZ:"object:jacuzzi-tile"},Ia=new Set(["C","S","B"]),Aa={C:"chair",S:"sofa",B:"bed"};function Pa(e){let t=0;for(let r=0;r<e.length;r++)t=t*31+e.charCodeAt(r)&65535;const a=[0,30,60,120,180,210,270,300];return`hsl(${a[t%a.length]}, 70%, 52%)`}function Ba(e){const t=new Map;return e.rooms.forEach((a,r)=>{for(const[n,i]of a.cells)t.set(`${n},${i}`,r)}),t}function Oa(e,t,a,r,n,i,l){const c=t.floorPlan,g=a.colorPalette,{blockedRows:w,blockedCols:m}=ht(Array.from(r.values())),d=Ba(c),o=R;for(let u=0;u<c.height;u++)for(let h=0;h<c.width;h++){const b=d.get(`${h},${u}`);b!==void 0&&c.tiles[u][h]!=="W"&&(e.fillStyle=qe[b%qe.length],e.fillRect(h*o,u*o,o,o))}for(let u=0;u<c.height;u++)for(let h=0;h<c.width;h++){const b=c.tiles[u][h],f=h*o,$=u*o;if(b==="W"){e.fillStyle=g.wall,e.fillRect(f,$,o,o),e.strokeStyle="rgba(255,255,255,0.06)",e.lineWidth=1;const y=Math.max(6,Math.floor(o/8));for(let x=0;x<Math.ceil(o/y);x++){const k=$+x*y;e.beginPath(),e.moveTo(f,k),e.lineTo(f+o,k),e.stroke();const F=x%2*(o/2);e.beginPath(),e.moveTo(f+F,k),e.lineTo(f+F,Math.min(k+y,$+o)),e.stroke()}continue}if(e.fillStyle=g.floor,e.fillRect(f,$,o,o),e.strokeStyle="rgba(0,0,0,0.10)",e.lineWidth=1,e.strokeRect(f+.5,$+.5,o-1,o-1),Ia.has(b)){const y=Aa[b]??"chair",x=Ue[y]??"",k=x?Ke(x,l):null;if(k){const F=Math.floor(o*.06);e.drawImage(k,f+F,$+F,o-F*2,o-F*2)}else{e.fillStyle=g.seat;const F=Math.floor(o*.4),T=f+(o-F)/2,I=$+(o-F)/2+Math.floor(o*.05);e.fillRect(T,I,F,F),e.fillRect(T,$+Math.floor(o*.08),F,Math.floor(o*.1))}continue}if(b!=="F"){const y=Ma[b]??`object:${b}`,x=(a.spriteMap[y]??"")||(Ue[y]??""),k=x?Ke(x,l):null;if(k)e.drawImage(k,f,$,o,o);else{const F=y.replace("object:","").slice(0,4).toUpperCase();e.fillStyle="rgba(110,75,28,0.88)",e.fillRect(f+2,$+2,o-4,o-4),e.strokeStyle="#7a5c2e",e.lineWidth=2,e.strokeRect(f+2,$+2,o-4,o-4),e.fillStyle="#ffe0a0",e.font=`${Math.max(6,Math.floor(o*.18))}px ${ne}`,e.textAlign="center",e.textBaseline="middle",e.fillText(F,f+o/2,$+o/2),e.textAlign="left",e.textBaseline="alphabetic"}}}const p=[[1,0],[-1,0],[0,1],[0,-1]];c.rooms.forEach((u,h)=>{e.strokeStyle=be[h%be.length],e.lineWidth=2.5;for(const[b,f]of u.cells)if(c.tiles[f]?.[b]!=="W")for(const[$,y]of p){const x=b+$,k=f+y,F=d.get(`${x},${k}`),T=c.tiles[k]?.[x];(F!==h||T==="W"||T===void 0)&&(e.beginPath(),$===1?(e.moveTo((b+1)*o,f*o),e.lineTo((b+1)*o,(f+1)*o)):$===-1?(e.moveTo(b*o,f*o),e.lineTo(b*o,(f+1)*o)):y===1?(e.moveTo(b*o,(f+1)*o),e.lineTo((b+1)*o,(f+1)*o)):(e.moveTo(b*o,f*o),e.lineTo((b+1)*o,f*o)),e.stroke())}}),c.rooms.forEach((u,h)=>{const b=u.cells.filter(([F,T])=>c.tiles[T]?.[F]!=="W");if(!b.length)return;const f=b.map(([F])=>F),$=b.map(([,F])=>F),y=(Math.min(...f)+Math.max(...f)+1)/2*o,x=(Math.min(...$)+Math.max(...$)+1)/2*o,k=Math.max(5,Math.min(8,Math.floor(o*.11)));e.font=`${k}px ${ne}`,e.textAlign="center",e.textBaseline="middle",e.fillStyle="rgba(0,0,0,0.35)",e.fillText(u.name.toUpperCase(),y+1,x+1),e.fillStyle=be[h%be.length].replace("0.75","0.9"),e.fillText(u.name.toUpperCase(),y,x),e.textAlign="left",e.textBaseline="alphabetic"}),e.fillStyle="rgba(0, 0, 0, 0.16)";for(const u of w)e.fillRect(0,u*o,c.width*o,o);for(const u of m)e.fillRect(u*o,0,o,c.height*o);if(n){const u=n.x*o,h=n.y*o;e.fillStyle=`${g.accent}55`,e.fillRect(u,h,o,o),e.strokeStyle=g.accent,e.lineWidth=4,e.strokeRect(u+2,h+2,o-4,o-4),e.strokeStyle="#ffffff",e.lineWidth=1.5,e.strokeRect(u+6,h+6,o-12,o-12);const b=Math.max(10,Math.floor(o*.28));e.font=`bold ${b}px ${ne}`,e.fillStyle="#ffffff",e.textAlign="center",e.textBaseline="middle",e.fillText("?",u+o/2,h+o/2),e.textAlign="left",e.textBaseline="alphabetic"}for(const[u,h]of r){const b=t.suspects.find(F=>F.id===u);if(!b)continue;const f=h.x*o,$=h.y*o,y=Math.floor(o*.1),x=o-y*2;e.fillStyle=Pa(u),e.fillRect(f+y,$+y,x,x),e.strokeStyle="rgba(0,0,0,0.7)",e.lineWidth=2,e.strokeRect(f+y+1,$+y+1,x-2,x-2),e.strokeStyle="rgba(255,255,255,0.25)",e.lineWidth=1,e.strokeRect(f+y+3,$+y+3,x-6,x-6);const k=Math.min(16,Math.floor(x*.5));e.fillStyle="#ffffff",e.font=`${k}px ${ne}`,e.textAlign="center",e.textBaseline="middle",e.fillText(b.name.charAt(0).toUpperCase(),f+o/2,$+o/2+1),e.textAlign="left",e.textBaseline="alphabetic"}if(i){for(const[u,h]of i.x){const b=u*o,f=h*o;e.fillStyle="rgba(192,57,43,0.18)",e.fillRect(b,f,o,o),e.strokeStyle="#c0392b",e.lineWidth=3;const $=Math.floor(o*.18);e.beginPath(),e.moveTo(b+$,f+$),e.lineTo(b+o-$,f+o-$),e.stroke(),e.beginPath(),e.moveTo(b+o-$,f+$),e.lineTo(b+$,f+o-$),e.stroke()}for(const[u,h]of Object.entries(i.candidates)){if(!h.length)continue;const[b,f]=u.split(",").map(Number),$=b*o,y=f*o,x=h.map(F=>t.suspects.find(T=>T.id===F)?.name.charAt(0).toUpperCase()??"?").join("")+"?",k=Math.max(5,Math.floor(o*.14));e.font=`${k}px ${ne}`,e.fillStyle="rgba(80,100,220,0.9)",e.textAlign="center",e.textBaseline="bottom",e.fillText(x,$+o/2,y+o-2),e.textAlign="left",e.textBaseline="alphabetic"}}}function La(e){return{width:e.floorPlan.width*R,height:e.floorPlan.height*R}}const za=`
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

/* ── Mobile overrides ───────────────────────────────────────────────── */
@media (max-width: 699px) {
  .alibi-sidebar {
    min-width: 0;
    max-width: none;
    width: 100%;
    border-left: none;
  }
  .alibi-sidebar-label {
    font-size: 8px;
  }
  .alibi-room-entry {
    font-size: 8px;
  }
  .alibi-victim-label {
    font-size: 8px;
  }
  .alibi-suspect-name {
    font-size: 9px;
  }
  .alibi-suspect-status {
    font-size: 7px;
  }
  .alibi-clue-card {
    font-size: 13px;
    padding: 8px 12px;
  }
  /* Bigger tap targets for suspect cards */
  .alibi-suspect-card {
    padding: 8px 10px;
  }
}
`,Ze=["rgba(220,140,40,0.35)","rgba(60,120,220,0.35)","rgba(40,170,80,0.35)","rgba(200,40,120,0.35)","rgba(180,160,20,0.35)","rgba(100,40,200,0.35)"],Je=["#dc8c28","#3c78dc","#28aa50","#c82878","#b4a014","#6428c8"];let Xe=!1;function ja(){if(Xe)return;const e=document.createElement("style");e.textContent=za,document.head.appendChild(e),Xe=!0}function Da(e){let t=0;for(let r=0;r<e.length;r++)t=t*31+e.charCodeAt(r)&65535;const a=[0,30,60,120,180,210,270,300];return`hsl(${a[t%a.length]}, 70%, 52%)`}function Ha(e,t,a,r){e.width=32,e.height=32;const i=e.getContext("2d");if(!i)return;const l=Da(t);i.fillStyle=r?l:"rgba(180,160,120,0.3)",i.fillRect(0,0,32,32),i.fillStyle=r?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.08)",i.beginPath(),i.arc(32/2,32*.38,32*.28,0,Math.PI*2),i.fill(),i.fillStyle=r?"rgba(0,0,0,0.2)":"rgba(0,0,0,0.06)",i.beginPath(),i.moveTo(32*.28,32*.65),i.lineTo(32*.72,32*.65),i.lineTo(32*.85,32),i.lineTo(32*.15,32),i.closePath(),i.fill(),i.fillStyle=r?"#ffffff":"rgba(60,40,10,0.6)",i.font=`bold ${Math.floor(32*.45)}px 'Press Start 2P', monospace`,i.textAlign="center",i.textBaseline="middle",i.fillText(a.charAt(0).toUpperCase(),32/2,32*.38),i.textAlign="left",i.textBaseline="alphabetic",i.strokeStyle=r?l:"rgba(139,105,20,0.5)",i.lineWidth=2,i.strokeRect(1,1,30,30)}function Va(e,t,a,r,n){ja(),e.innerHTML="",e.className="alibi-sidebar";const i=document.createElement("div");i.className="alibi-sidebar-section";const l=document.createElement("div");l.className="alibi-sidebar-label",l.textContent="Rooms",i.appendChild(l);const c=document.createElement("div");c.className="alibi-room-legend",t.floorPlan.rooms.forEach((x,k)=>{const F=document.createElement("div");F.className="alibi-room-entry";const T=document.createElement("div");T.className="alibi-room-swatch",T.style.background=Ze[k%Ze.length],T.style.borderColor=Je[k%Je.length];const I=document.createElement("span");I.textContent=x.name,F.appendChild(T),F.appendChild(I),c.appendChild(F)}),i.appendChild(c),e.appendChild(i);const g=document.createElement("div");g.className="alibi-victim-section";const w=document.createElement("div");w.className="alibi-sidebar-label",w.textContent="Victim",g.appendChild(w);const m=document.createElement("div");m.className="alibi-victim-card",m.setAttribute("data-testid","victim-token");const d=document.createElement("div");d.className="alibi-victim-icon",d.textContent="?";const o=document.createElement("div");o.className="alibi-victim-label",a.size>=t.suspects.length?(o.textContent=`Location revealed!
Click victim cell`,d.textContent="☠",m.style.borderColor="rgba(192,57,43,0.7)",m.style.background="rgba(192,57,43,0.12)"):o.textContent=`Unknown
Place all ${t.suspects.length} suspects`,m.appendChild(d),m.appendChild(o),g.appendChild(m),e.appendChild(g);const u=document.createElement("div");u.className="alibi-sidebar-section";const h=document.createElement("div");h.className="alibi-sidebar-label",h.textContent="Suspects",u.appendChild(h);const b=document.createElement("div");b.className="alibi-suspect-section";for(const x of t.suspects){const k=a.has(x.id),F=document.createElement("div");F.className="alibi-suspect-card"+(k?" placed":""),F.setAttribute("data-testid",`suspect-card-${x.id}`);const T=document.createElement("div");T.className="alibi-suspect-portrait";const I=document.createElement("canvas");Ha(I,x.id,x.name,k),T.appendChild(I);const W=document.createElement("div");W.className="alibi-suspect-info";const P=document.createElement("div");P.className="alibi-suspect-name",P.textContent=x.name;const B=document.createElement("div");if(B.className="alibi-suspect-status",k){const O=a.get(x.id);B.textContent=`Col ${O.x+1}, Row ${O.y+1}`}else B.textContent="Not placed";W.appendChild(P),W.appendChild(B),F.appendChild(T),F.appendChild(W),b.appendChild(F)}u.appendChild(b),e.appendChild(u);const f=document.createElement("div");f.className="alibi-sidebar-section";const $=document.createElement("div");$.className="alibi-sidebar-label",$.textContent="Evidence",f.appendChild($);const y=document.createElement("div");y.className="alibi-clue-section",t.clues.forEach((x,k)=>{const F=document.createElement("div");F.className="alibi-clue-card",F.setAttribute("data-testid",`clue-${k}`),r.has(k)&&F.classList.add("clue-satisfied"),n.has(k)&&F.classList.add("clue-error"),F.textContent=x.text,y.appendChild(F)}),f.appendChild(y),e.appendChild(f)}const _a=`
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
@media (max-width: 699px) {
  .alibi-modal {
    padding: 20px 16px;
  }
  .alibi-modal h2 {
    font-size: 0.7em;
    margin-bottom: 14px;
  }
  .alibi-modal p {
    font-size: 0.45em;
  }
  .alibi-modal button {
    padding: 10px 18px;
    font-size: 0.55em;
    min-height: 44px;
  }
  .alibi-guilty-stamp {
    font-size: 1.2em;
    padding: 4px 10px;
  }
}
`;let Qe=!1;function je(){if(Qe)return;const e=document.createElement("style");e.textContent=_a,document.head.appendChild(e),Qe=!0}function Te(e,t,a){je(),De(e);const r=document.createElement("div");r.className="alibi-overlay",r.setAttribute("data-testid","narrative-intro");const n=document.createElement("div");n.className="alibi-modal";const i=document.createElement("h2");i.textContent="A New Case";const l=document.createElement("p");l.textContent=t.narrativeIntro;const c=document.createElement("button");c.textContent="Begin Investigation",c.addEventListener("click",()=>{r.remove(),a()}),n.appendChild(i),n.appendChild(l),n.appendChild(c),r.appendChild(n),e.appendChild(r)}function Ya(e,t){je(),De(e);const a=t.narrativeGuilty.replace("{{killerName}}",t.killer.name),r=document.createElement("div");r.className="alibi-overlay";const n=document.createElement("div");n.className="alibi-modal";const i=document.createElement("div");i.className="alibi-guilty-stamp",i.setAttribute("data-testid","guilty-stamp"),i.textContent="GUILTY";const l=document.createElement("div");l.className="alibi-guilty-killer",l.setAttribute("data-testid","guilty-killer-name"),l.textContent=t.killer.name;const c=document.createElement("p");c.textContent=a;const g=document.createElement("p");g.textContent=t.narrativeVictimFound,n.appendChild(i),n.appendChild(l),n.appendChild(g),n.appendChild(c),r.appendChild(n),e.appendChild(r)}function De(e){const t=e.querySelector(".alibi-overlay");t&&t.remove()}function Ga(e){je(),De(e);const t=document.createElement("div");t.className="alibi-overlay",t.setAttribute("data-testid","msg-clue-gate");const a=document.createElement("div");a.className="alibi-modal";const r=document.createElement("h2");r.textContent="Something Doesn't Add Up…";const n=document.createElement("p");n.textContent="Check the clue cards. Not all witnesses are satisfied.";const i=document.createElement("button");i.textContent="Keep Investigating",i.addEventListener("click",()=>t.remove()),a.appendChild(r),a.appendChild(n),a.appendChild(i),t.appendChild(a),e.appendChild(t),setTimeout(()=>{t.isConnected&&t.remove()},3e3)}function Ua(){return{x:[],candidates:{}}}function et(e){return{placements:new Map,annotations:Ua(),satisfiedClues:new Set,errorClues:new Set,victimVisible:!1,victimCell:null,phase:"playing"}}function Ka(e,t,a,r,n){const i=new Map(e.placements);return i.set(a,{suspectId:a,x:r,y:n}),He({...e,placements:i},t)}function qa(e,t,a){const r=new Map(e.placements);return r.delete(a),He({...e,placements:r},t)}function Za(e){if(e.satisfiedClues.size===0&&e.placements.size>0)return e;const t=e.satisfiedClues.size+e.errorClues.size;return e.errorClues.size===0&&t>0&&e.victimVisible?{...e,phase:"guilty"}:e}function He(e,t){const a=new Set,r=new Set;t.clues.forEach((l,c)=>{const g=Me(t.floorPlan,l,e.placements);g===!0?a.add(c):g===!1&&r.add(c)});const n=mt(t.floorPlan,Array.from(e.placements.values()));return{...e,satisfiedClues:a,errorClues:r,victimVisible:n!==null,victimCell:n}}function Q(e){return{x:[...e.x.map(([t,a])=>[t,a])],candidates:Object.fromEntries(Object.entries(e.candidates).map(([t,a])=>[t,[...a]]))}}function Ja(e,t,a){const r=Q(e.annotations),n=r.x.findIndex(([i,l])=>i===t&&l===a);return n>=0?r.x.splice(n,1):r.x.push([t,a]),{...e,annotations:r}}function Xa(e,t,a,r){const n=Q(e.annotations),i=`${t},${a}`;return n.candidates[i]||(n.candidates[i]=[]),n.candidates[i].includes(r)||(n.candidates[i]=[...n.candidates[i],r]),{...e,annotations:n}}function Qa(e,t,a,r){const n=Q(e.annotations),i=`${t},${a}`;return n.candidates[i]&&(n.candidates[i]=n.candidates[i].filter(l=>l!==r),n.candidates[i].length===0&&delete n.candidates[i]),{...e,annotations:n}}function en(e,t,a,r){const n=Q(e.annotations);for(const l of Object.keys(n.candidates))n.candidates[l]=n.candidates[l].filter(c=>c!==t),n.candidates[l].length===0&&delete n.candidates[l];const i=n.x.findIndex(([l,c])=>l===a&&c===r);return i>=0&&n.x.splice(i,1),{...e,annotations:n}}function J(e){return{placements:new Map(e.placements),annotations:Q(e.annotations)}}function Ee(e,t,a){return He({...e,placements:new Map(a.placements),annotations:Q(a.annotations)},t)}const tn=50;class an{constructor(){Fe(this,"past",[]);Fe(this,"future",[])}push(t){this.past.push(t),this.past.length>tn&&this.past.shift(),this.future=[]}undo(t){return this.past.length===0?null:(this.future.push(t),this.past.pop())}redo(t){return this.future.length===0?null:(this.past.push(t),this.future.pop())}canUndo(){return this.past.length>0}canRedo(){return this.future.length>0}clear(){this.past=[],this.future=[]}}let ie=null,ye=!1;function nn(){if(ye)return null;try{return ie||(ie=new AudioContext),ie.state==="suspended"&&ie.resume().catch(()=>{}),ie}catch{return null}}function K(e,t,a="sine",r=.15){const n=nn();if(n)try{const i=n.createOscillator(),l=n.createGain();i.connect(l),l.connect(n.destination),i.type=a,i.frequency.value=e,l.gain.setValueAtTime(r,n.currentTime),l.gain.exponentialRampToValueAtTime(.001,n.currentTime+t),i.start(n.currentTime),i.stop(n.currentTime+t)}catch{}}function ge(e){switch(e){case"place":K(440,.08,"sine",.12);break;case"remove":K(330,.06,"sine",.08);break;case"clue-satisfied":K(660,.12,"sine",.15);break;case"solve":{K(523,.15,"sine",.2),setTimeout(()=>K(659,.15,"sine",.2),150),setTimeout(()=>K(784,.3,"sine",.25),300);break}case"error":K(220,.2,"square",.1);break;case"navigate":K(880,.05,"sine",.08);break}}function on(){return ye=!ye,ye}function pt(e){const t=Math.floor(e/6e4),a=Math.floor(e%6e4/1e3);return t>0?`${t}m ${a}s`:`${a}s`}function bt(e){return e.replace(/-/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function rn(e,t){const a=e.difficulty.charAt(0).toUpperCase()+e.difficulty.slice(1);return["🔍 ALIBI",`Case: ${bt(e.themeId)}`,`Difficulty: ${a}`,`Clues: ${e.clues.length}`,`Time: ${pt(t)}`,`Killer: ${e.killer.name}`,"","pnz1990.github.io/alibi/"].join(`
`)}function sn(e,t,a){const r=e.difficulty.charAt(0).toUpperCase()+e.difficulty.slice(1),n=new Date,i=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`,l=a>1?`🔥 ${a} day streak`:"1st solve";return["🔍 ALIBI — Daily Case",`📅 ${i}`,`Case: ${bt(e.themeId)} (${r})`,`Time: ${pt(t)}`,l,`Killer: ${e.killer.name}`,"","pnz1990.github.io/alibi/"].join(`
`)}async function ln(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;const t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:-9999px;left:-9999px;",document.body.appendChild(t),t.focus(),t.select();const a=document.execCommand("copy");return document.body.removeChild(t),a}catch{return!1}}const _={campaign:e=>`alibi_campaign_${e}`,daily:e=>`alibi_daily_${e}`,streak:"alibi_streak",stats:"alibi_stats",prefs:"alibi_prefs",puzzleState:"alibi_puzzle_state"};function cn(e){try{const t=Ve();t[e.key]=e,localStorage.setItem(_.puzzleState,JSON.stringify(t))}catch{}}function dn(e){try{return Ve()[e]??null}catch{return null}}function tt(e){try{const t=Ve();delete t[e],localStorage.setItem(_.puzzleState,JSON.stringify(t))}catch{}}function Ve(){try{const e=localStorage.getItem(_.puzzleState);return e?JSON.parse(e):{}}catch{return{}}}function re(e){try{const t=localStorage.getItem(_.campaign(e));return t?JSON.parse(t):null}catch{return null}}function _e(e){try{localStorage.setItem(_.campaign(e.slot),JSON.stringify(e))}catch{}}function Ie(e){try{const t=localStorage.getItem(_.daily(e));return t?JSON.parse(t):null}catch{return null}}function hn(e){try{localStorage.setItem(_.daily(e.date),JSON.stringify(e))}catch{}}function Ae(){try{const e=localStorage.getItem(_.streak);return e?parseInt(e,10):0}catch{return 0}}function mn(e){try{localStorage.setItem(_.streak,String(e))}catch{}}const at={totalSolved:0,bestTimes:{},solvedToday:0,lastSolvedDate:""};function fn(){try{const e=localStorage.getItem(_.stats);return e?JSON.parse(e):{...at}}catch{return{...at}}}function un(e){try{localStorage.setItem(_.stats,JSON.stringify(e))}catch{}}function nt(e,t,a){const r=fn(),n=new Date().toISOString().slice(0,10),i=`${e}-${t}`;r.totalSolved+=1,(!r.bestTimes[i]||a<r.bestTimes[i])&&(r.bestTimes[i]=a),r.lastSolvedDate===n?r.solvedToday+=1:(r.solvedToday=1,r.lastSolvedDate=n),un(r)}const pn=["coffee-shop","bookstore","backyard","holiday-mall","restaurant","gym","office","garden-party","hospital","carnival"],bn=["easy","easy","easy","easy","medium","medium","medium","medium","hard","hard","hard","hard"];function gn(e,t){let a=e^t*2654435769;return a=(a>>>16^a)*73244475|0,a=(a>>>16^a)*73244475|0,a=a>>>16^a,Math.abs(a)}function wn(e){let t=e;return function(){t|=0,t=t+1831565813|0;let a=Math.imul(t^t>>>15,1|t);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}function yn(e){const t=[];for(let a=0;a<3;a++){const r=(e^a*3735928559)>>>0,n=wn(r),i=[...pn];for(let l=i.length-1;l>0;l--){const c=Math.floor(n()*(l+1));[i[l],i[c]]=[i[c],i[l]]}t.push(...i.slice(0,4))}return t}function gt(e){const t=$n(),a=yn(t),r=Array.from({length:12},(n,i)=>({seed:gn(t,i),themeId:a[i],difficulty:bn[i],status:i===0?"in_progress":"locked"}));return{campaignSeed:t,slot:e,currentCase:0,startedAt:new Date().toISOString(),cases:r,rank:"rookie"}}function $n(){return Math.floor(Math.random()*4294967295)}function xn(e){const t=e.cases.filter(a=>a.status==="solved").length;return t>=12?"senior":t>=8?"detective":t>=4?"investigator":"rookie"}function Fn(e,t,a,r){const n=e.cases.map((c,g)=>g===t?{...c,status:"solved",solveTimeMs:a,killerName:r}:g===t+1&&c.status==="locked"?{...c,status:"in_progress"}:c),i=t<11?t+1:t,l={...e,cases:n,currentCase:i};return{...l,rank:xn(l)}}function vn(e){let t=5381;for(let a=0;a<e.length;a++)t=(t<<5)+t+e.charCodeAt(a)|0;return Math.abs(t)}function Ye(){const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const it=[{themeId:"coffee-shop",difficulty:"easy"},{themeId:"bookstore",difficulty:"easy"},{themeId:"backyard",difficulty:"easy"},{themeId:"holiday-mall",difficulty:"easy"},{themeId:"restaurant",difficulty:"easy"},{themeId:"gym",difficulty:"easy"},{themeId:"office",difficulty:"easy"},{themeId:"garden-party",difficulty:"easy"},{themeId:"hospital",difficulty:"easy"},{themeId:"carnival",difficulty:"easy"},{themeId:"coffee-shop",difficulty:"medium"},{themeId:"bookstore",difficulty:"medium"},{themeId:"backyard",difficulty:"medium"},{themeId:"holiday-mall",difficulty:"medium"},{themeId:"restaurant",difficulty:"medium"},{themeId:"gym",difficulty:"medium"},{themeId:"office",difficulty:"medium"},{themeId:"garden-party",difficulty:"medium"},{themeId:"hospital",difficulty:"medium"},{themeId:"carnival",difficulty:"medium"},{themeId:"coffee-shop",difficulty:"hard"},{themeId:"bookstore",difficulty:"hard"},{themeId:"backyard",difficulty:"hard"},{themeId:"holiday-mall",difficulty:"hard"},{themeId:"restaurant",difficulty:"hard"},{themeId:"gym",difficulty:"hard"},{themeId:"office",difficulty:"hard"},{themeId:"garden-party",difficulty:"hard"},{themeId:"hospital",difficulty:"hard"},{themeId:"carnival",difficulty:"hard"}];function kn(e){const t=vn(e),a=new Date(e+"T12:00:00Z"),r=Math.floor((a.getTime()-new Date(a.getUTCFullYear(),0,0).getTime())/864e5),{themeId:n,difficulty:i}=it[r%it.length];return{seed:t,themeId:n,difficulty:i,dateStr:e}}function ot(){return kn(Ye())}const Sn=`
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
`;let rt=!1;function Cn(){if(rt)return;const e=document.createElement("style");e.textContent=Sn,document.head.appendChild(e),rt=!0}let Pe=null,Be=null;function G(){Pe?.remove(),Be?.remove(),Pe=null,Be=null}function wt(e,t,a){if(G(),!a.length)return;const r=52,n=22,i=r+n+4,l=window.innerWidth,c=window.innerHeight,g=Math.max(i,Math.min(l-i,e)),w=Math.max(i,Math.min(c-i,t)),m=document.createElement("div");m.className="alibi-wheel-backdrop",m.addEventListener("click",G),m.addEventListener("touchstart",G,{passive:!0}),document.body.appendChild(m),Be=m;const d=document.createElement("div");d.className="alibi-wheel",d.setAttribute("data-testid","radial-menu"),d.style.left=`${g}px`,d.style.top=`${w}px`,d.style.transform="translate(-50%, -50%)",d.style.pointerEvents="all";const o=a.length,p=(r+n+4)*2,u=p/2,h=p/2,b=document.createElementNS("http://www.w3.org/2000/svg","svg");b.setAttribute("class","alibi-wheel-svg"),b.setAttribute("width",String(p)),b.setAttribute("height",String(p)),b.setAttribute("viewBox",`0 0 ${p} ${p}`);let f=-1;a.forEach((x,k)=>{const F=k/o*Math.PI*2-Math.PI/2,T=(k+1)/o*Math.PI*2-Math.PI/2,I=(F+T)/2,W=.06,P=18,B=r+n,O=u+P*Math.cos(F+W),X=h+P*Math.sin(F+W),D=u+P*Math.cos(T-W),U=h+P*Math.sin(T-W),Y=u+B*Math.cos(F+W),A=h+B*Math.sin(F+W),v=u+B*Math.cos(T-W),S=h+B*Math.sin(T-W),C=T-F-W*2>Math.PI?1:0,L=[`M ${O} ${X}`,`A ${P} ${P} 0 ${C} 1 ${D} ${U}`,`L ${v} ${S}`,`A ${B} ${B} 0 ${C} 0 ${Y} ${A}`,"Z"].join(" "),N=document.createElementNS("http://www.w3.org/2000/svg","path");N.setAttribute("d",L),N.setAttribute("fill",x.color),N.setAttribute("stroke","rgba(0,0,0,0.5)"),N.setAttribute("stroke-width","1.5"),N.style.cursor="pointer",N.style.transition="filter 0.08s";const Z=(P+B)/2,xe=u+Z*Math.cos(I),le=h+Z*Math.sin(I),H=document.createElementNS("http://www.w3.org/2000/svg","text");H.setAttribute("x",String(xe)),H.setAttribute("y",String(le)),H.setAttribute("text-anchor","middle"),H.setAttribute("dominant-baseline","middle"),H.setAttribute("fill","#ffffff"),H.setAttribute("font-size",o>8?"7":"8"),H.setAttribute("font-family","'Press Start 2P', monospace"),H.setAttribute("pointer-events","none"),H.style.userSelect="none",H.textContent=x.label,N.setAttribute("data-testid",x.testid),N.addEventListener("mouseenter",()=>{N.style.filter="brightness(1.4)",H.setAttribute("fill","#ffffc0")}),N.addEventListener("mouseleave",()=>{N.style.filter="",H.setAttribute("fill","#ffffff")}),N.addEventListener("click",$t=>{$t.stopPropagation(),G(),x.onClick()}),b.appendChild(N),b.appendChild(H)});let $=!1;b.addEventListener("touchstart",x=>{x.preventDefault(),$=!0},{passive:!1}),b.addEventListener("touchmove",x=>{if(!$)return;x.preventDefault();const k=x.touches[0],F=b.getBoundingClientRect(),T=k.clientX-(F.left+F.width/2),I=k.clientY-(F.top+F.height/2);if(Math.sqrt(T*T+I*I)<16){f>=0&&(b.children[f*2].style.filter="",f=-1);return}let P=Math.atan2(I,T)+Math.PI/2;P<0&&(P+=Math.PI*2);const B=Math.floor(P/(Math.PI*2)*o)%o;B!==f&&(f>=0&&(b.children[f*2].style.filter=""),f=B,b.children[B*2].style.filter="brightness(1.5)")},{passive:!1}),b.addEventListener("touchend",x=>{x.preventDefault(),$=!1,f>=0&&f<a.length&&(G(),a[f].onClick()),f=-1},{passive:!1}),d.appendChild(b);const y=document.createElement("div");y.className="alibi-wheel-center",y.textContent="✕",y.addEventListener("click",x=>{x.stopPropagation(),G()}),d.appendChild(y),document.body.appendChild(d),Pe=d}function Tn(e,t,a,r,n){Cn();const i=t.floorPlan,l=document.createElement("div");l.className="alibi-radial-overlay",l.style.cssText=`position:absolute;top:0;left:0;width:${i.width*R}px;height:${i.height*R}px;`,e.style.position="relative",e.appendChild(l);const c=[];for(let o=0;o<i.height;o++){c[o]=[];for(let p=0;p<i.width;p++){const u=i.tiles[o][p],h=document.createElement("div");h.setAttribute("data-testid",`cell-${p}-${o}`),h.style.cssText=`position:absolute;left:${p*R}px;top:${o*R}px;width:${R}px;height:${R}px;`,q(u)&&(h.classList.add("alibi-cell-overlay","placeable"),h.style.touchAction="manipulation",h.addEventListener("click",b=>{b.stopPropagation();const f=e.getBoundingClientRect(),$=f.left+(p+.5)*R,y=f.top+(o+.5)*R;Rn(p,o,$,y,r,t,n)})),c[o][p]=h,l.appendChild(h)}}let g=null;const w=()=>G();document.addEventListener("keydown",o=>{o.key==="Escape"&&G()});function m(){const o=r();if(g&&(g.remove(),g=null),o.victimCell){const{x:h,y:b}=o.victimCell;g=document.createElement("div"),g.setAttribute("data-testid","victim-cell"),g.className="alibi-cell-overlay victim-highlight",g.style.cssText=`position:absolute;left:${h*R}px;top:${b*R}px;width:${R}px;height:${R}px;pointer-events:all;touch-action:manipulation;`,g.addEventListener("click",f=>{f.stopPropagation(),n.onVictimClick()}),l.appendChild(g)}const p=new Set,u=new Set;for(const h of o.placements.values())p.add(h.y),u.add(h.x);for(let h=0;h<i.height;h++)for(let b=0;b<i.width;b++){const f=c[h]?.[b];if(!f)continue;const $=i.tiles[h][b],y=Array.from(o.placements.values()).some(k=>k.x===b&&k.y===h),x=p.has(h)||u.has(b);f.style.pointerEvents=q($)&&(!x||y)?"all":"none"}l.style.width=`${i.width*R}px`,l.style.height=`${i.height*R}px`;for(let h=0;h<i.height;h++)for(let b=0;b<i.width;b++){const f=c[h]?.[b];f&&(f.style.left=`${b*R}px`,f.style.top=`${h*R}px`,f.style.width=`${R}px`,f.style.height=`${R}px`)}l.querySelectorAll("[data-annotation]").forEach(h=>h.remove());for(const[h,b]of o.annotations.x){const f=document.createElement("div");f.setAttribute("data-testid",`cell-annotation-x-${h}-${b}`),f.setAttribute("data-annotation","x"),f.style.cssText=`position:absolute;left:${h*R}px;top:${b*R}px;width:${R}px;height:${R}px;pointer-events:none;`,l.appendChild(f)}for(const[h,b]of Object.entries(o.annotations.candidates)){if(!b.length)continue;const[f,$]=h.split(",").map(Number),y=document.createElement("div");y.setAttribute("data-testid",`cell-annotation-candidates-${f}-${$}`),y.setAttribute("data-annotation","candidates"),y.setAttribute("data-candidates",b.join(",")),y.style.cssText=`position:absolute;left:${f*R}px;top:${$*R}px;width:${R}px;height:${R}px;pointer-events:none;`,l.appendChild(y)}}function d(){document.removeEventListener("click",w),l.remove(),G()}return m(),{updateOverlays:m,detach:d}}function En(e){let t=0;for(let r=0;r<e.length;r++)t=t*31+e.charCodeAt(r)&65535;const a=[0,30,60,120,180,210,270,300];return`hsl(${a[t%a.length]}, 65%, 40%)`}function Rn(e,t,a,r,n,i,l){const c=n(),g=Array.from(c.placements.entries()).find(([,p])=>p.x===e&&p.y===t),w=new Set(c.placements.keys()),m=i.suspects.filter(p=>!w.has(p.id)),d=[];for(const p of m)d.push({label:p.name.charAt(0).toUpperCase(),sublabel:`Place ${p.name}`,testid:`suspect-option-${p.id}`,color:En(p.id),onClick:()=>l.onPlace(p.id,e,t)});const o=c.annotations.x.some(([p,u])=>p===e&&u===t);d.push({label:"✕",sublabel:o?"Clear X":"Mark X",testid:"suspect-option-markx",color:o?"#5a1a1a":"#3a1a1a",onClick:()=>l.onToggleX(e,t)}),m.length>0&&d.push({label:"?",sublabel:"Mark candidate",testid:"suspect-option-candidates",color:"#1a3a5a",onClick:()=>Wn(e,t,a,r,n,i,l)}),g&&d.push({label:"↩",sublabel:"Remove",testid:"suspect-option-clear",color:"#2a2a2a",onClick:()=>l.onRemove(g[0])}),d.length&&wt(a,r,d)}function Wn(e,t,a,r,n,i,l){const c=n(),g=new Set(c.placements.keys()),w=c.annotations.candidates[`${e},${t}`]??[],m=[];for(const d of i.suspects){if(g.has(d.id))continue;const o=w.includes(d.id);m.push({label:d.name.charAt(0).toUpperCase()+"?",sublabel:o?`Remove ${d.name}?`:`Maybe ${d.name}`,testid:`suspect-option-candidate-${d.id}`,color:o?"#2a2a5a":"#1a1a3a",onClick:()=>o?l.onRemoveCandidate(d.id,e,t):l.onAddCandidate(d.id,e,t)})}m.length&&wt(a,r,m)}function Nn(e){return`${e.seed}-${e.themeId}-${e.difficulty}`}function Mn(e){const t=new URLSearchParams(location.search),a=t.get("theme")??"coffee-shop",r=t.get("difficulty")??"easy",n=parseInt(t.get("seed")??"0",10),i=t.get("mode"),l=t.get("campaignSlot"),c=t.get("campaignCase"),g=l?parseInt(l,10):null,w=c?parseInt(c,10):null,m=ut(a),d=Nt(n,m,r),o=Nn(d),p=Pn(),u=p.querySelector(".alibi-canvas-wrapper"),h=p.querySelector(".alibi-sidebar-container"),b=document.getElementById("game-canvas"),f=b.getContext("2d");b.style.imageRendering="pixelated";function $(){const S=p.querySelector(".alibi-grid-panel")?.getBoundingClientRect(),C=S&&S.width>16?S.width-16:void 0,L=S&&S.height>16?S.height-16:void 0;Na(d.floorPlan.width,d.floorPlan.height,C,L);const{width:N,height:Z}=La(d);b.width=N,b.height=Z,b.style.width=`${N}px`,b.style.height=`${Z}px`,W()}u.appendChild(b);let y=et();const x=new an;let k=Date.now(),F=0;function T(){return Date.now()-k+F}function I(v,S){const C={};S.placements.forEach((L,N)=>{C[N]={x:L.x,y:L.y}}),cn({key:v,placements:C,elapsedMs:T(),savedAt:new Date().toISOString(),annotations:S.annotations})}function W(){Oa(f,d,m,y.placements,y.victimCell,y.annotations,()=>W()),Va(h,d,y.placements,y.satisfiedClues,y.errorClues),P.updateOverlays()}const P=Tn(u,d,m,()=>y,{onPlace(v,S,C){y.phase==="playing"&&(x.push(J(y)),y=Ka(y,d,v,S,C),y=en(y,v,S,C),I(o,y),ge(y.satisfiedClues.size>0?"clue-satisfied":"place"),W())},onRemove(v){y.phase==="playing"&&(x.push(J(y)),y=qa(y,d,v),I(o,y),ge("remove"),W())},onVictimClick(){if(y.phase!=="playing")return;const v=Za(y);if(v.phase==="guilty"){y=v;const S=T();if(tt(o),ge("solve"),W(),Ya(document.body,d),g!==null&&w!==null){const C=re(g);if(C){const L=Fn(C,w,S,d.killer.name);_e(L),setTimeout(()=>{window.location.href=`${window.location.pathname}?mode=campaign&campaignSlot=${g}`},3e3)}}else if(i==="daily"){const C=Ye();if(Ie(C)?.solved??!1){const N=Ae();We(d,S,N)}else{hn({date:C,solved:!0,solveTimeMs:S,killerName:d.killer.name});const N=Bn(C),Z=Ie(N)?.solved??!1,xe=Ae(),le=Z?xe+1:1;mn(le),nt(d.themeId,d.difficulty,S),We(d,S,le)}}else nt(d.themeId,d.difficulty,S),We(d,S,0)}else ge("error"),W(),Ga(document.body)},onToggleX(v,S){y.phase==="playing"&&(x.push(J(y)),y=Ja(y,v,S),I(o,y),W())},onAddCandidate(v,S,C){y.phase==="playing"&&(x.push(J(y)),y=Xa(y,S,C,v),I(o,y),W())},onRemoveCandidate(v,S,C){y.phase==="playing"&&(x.push(J(y)),y=Qa(y,S,C,v),I(o,y),W())}}),B=p.querySelector('[data-testid="btn-undo"]'),O=p.querySelector('[data-testid="btn-redo"]');B.addEventListener("click",X),O.addEventListener("click",D);function X(){const v=x.undo(J(y));v&&(y=Ee(y,d,v),W())}function D(){const v=x.redo(J(y));v&&(y=Ee(y,d,v),W())}const U=p.querySelector('[data-testid="btn-mute"]');U.addEventListener("click",()=>{const v=on();U.textContent=v?"🔇":"🔊"}),document.addEventListener("keydown",v=>{(v.ctrlKey||v.metaKey)&&v.key==="z"&&!v.shiftKey&&(X(),v.preventDefault()),(v.ctrlKey||v.metaKey)&&(v.key==="y"||v.key==="z"&&v.shiftKey)&&(D(),v.preventDefault())});const Y=dn(o);Y&&Object.keys(Y.placements).length>0?On(p,()=>{const v=new Map(Object.entries(Y.placements).map(([L,N])=>[L,{suspectId:L,x:N.x,y:N.y}])),S=Y.annotations??{x:[],candidates:{}},C={placements:v,annotations:S};y=Ee(et(),d,C),F=Y.elapsedMs,k=Date.now(),$(),Te(document.body,d,()=>{})},()=>{tt(o),Te(document.body,d,()=>{})}):Te(document.body,d,()=>{}),requestAnimationFrame(()=>$()),new ResizeObserver(()=>$()).observe(document.body)}const In=`
/* ── Desktop: horizontal side-by-side layout ───────────────────────── */
.alibi-game-screen {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
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
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow: hidden;
  position: relative;
}
.alibi-canvas-wrapper {
  overflow: hidden;
  position: relative;
  border: 3px solid #8b6914;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.6), 0 0 32px rgba(139,105,20,0.2);
  background: #1a120a;
}
.alibi-right-pane {
  display: flex;
  flex-direction: column;
  width: 280px;
  flex-shrink: 0;
  height: 100vh;
}
.alibi-sidebar-container {
  flex: 1;
  min-height: 0;
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

/* ── Mobile (<700px): vertical stacked layout ──────────────────────── */
@media (max-width: 699px) {
  .alibi-game-screen {
    flex-direction: column;
    height: 100dvh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .alibi-grid-panel {
    flex: 0 0 auto;
    width: 100%;
    padding: 8px;
    align-items: flex-start;
    justify-content: center;
  }
  .alibi-right-pane {
    width: 100%;
    height: auto;
    flex-shrink: 0;
  }
  .alibi-sidebar-container {
    min-width: 0;
    max-width: none;
    width: 100%;
    height: auto;
    border-left: none;
    border-top: 2px solid #8b6914;
    box-shadow: 0 -4px 16px rgba(0,0,0,0.4);
    -webkit-overflow-scrolling: touch;
  }
  .alibi-toolbar {
    flex-wrap: wrap;
    gap: 4px;
    padding: 6px 8px;
  }
  .alibi-toolbar button {
    padding: 8px 12px;
    font-size: 9px;
    min-height: 44px;
  }
}
`;let st=!1;function An(){if(st)return;const e=document.createElement("style");e.textContent=In,document.head.appendChild(e),st=!0}function Pn(){An();const e=document.createElement("div");e.setAttribute("data-testid","screen-game"),e.className="alibi-game-screen";const t=document.createElement("div");t.className="alibi-grid-panel";const a=document.createElement("div");a.className="alibi-canvas-wrapper",t.appendChild(a);const r=document.createElement("div");r.className="alibi-right-pane";const n=document.createElement("div");n.className="alibi-toolbar";const i=Re("btn-undo","↩ Undo"),l=Re("btn-redo","↪ Redo"),c=Re("btn-mute","🔊");n.append(i,l,c);const g=document.createElement("div");g.className="alibi-sidebar-container",r.append(n,g),e.append(t,r);const w=document.getElementById("game-canvas");return w.parentElement?.insertBefore(e,w),e}function Re(e,t){const a=document.createElement("button");return a.setAttribute("data-testid",e),a.textContent=t,a}function We(e,t,a){const r=new URLSearchParams(location.search).get("mode")==="daily",n=document.createElement("button");n.setAttribute("data-testid","btn-share"),n.style.cssText='position:fixed;bottom:24px;right:24px;z-index:300;background:#c0392b;color:#fff;border:2px solid #ff5a47;border-radius:0;padding:10px 20px;font-family:"Press Start 2P",monospace;font-size:11px;cursor:pointer;box-shadow:3px 3px 0 #6b0000;',n.textContent="📋 Share Result",n.addEventListener("click",async()=>{const i=r&&a>0?sn(e,t,a):rn(e,t),l=await ln(i);n.textContent=l?"✓ Copied!":"📋 Share Result",l&&setTimeout(()=>{n.textContent="📋 Share Result"},2e3)}),document.body.appendChild(n)}function Bn(e){const t=new Date(e+"T12:00:00Z");return t.setUTCDate(t.getUTCDate()-1),`${t.getUTCFullYear()}-${String(t.getUTCMonth()+1).padStart(2,"0")}-${String(t.getUTCDate()).padStart(2,"0")}`}function On(e,t,a){const r=document.createElement("div");r.setAttribute("data-testid","prompt-resume"),r.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:150;font-family:"Press Start 2P",monospace;';const n=document.createElement("div");n.style.cssText="background:#0a0a12;border:3px solid #c0392b;border-radius:0;box-shadow:4px 4px 0 #6b0000;padding:28px;max-width:360px;text-align:center;color:#fff;";const i=document.createElement("h2");i.style.cssText='color:#c0392b;margin-bottom:16px;font-family:"Press Start 2P",monospace;font-size:0.75em;line-height:1.6;',i.textContent="Resume?";const l=document.createElement("p");l.style.cssText='color:#aaa;margin-bottom:20px;font-family:"Press Start 2P",monospace;font-size:0.45em;line-height:2;',l.textContent="Continue your in-progress case?";const c=document.createElement("button");c.style.cssText='background:#c0392b;color:#fff;border:2px solid #ff5a47;border-radius:0;padding:9px 20px;font-family:"Press Start 2P",monospace;font-size:9px;cursor:pointer;margin-right:8px;box-shadow:2px 2px 0 #6b0000;',c.textContent="Resume",c.addEventListener("click",()=>{r.remove(),t()});const g=document.createElement("button");g.style.cssText='background:#1a1a2e;color:#fff;border:2px solid #555;border-radius:0;padding:9px 20px;font-family:"Press Start 2P",monospace;font-size:9px;cursor:pointer;box-shadow:2px 2px 0 #000;',g.textContent="Start Fresh",g.addEventListener("click",()=>{r.remove(),a()}),n.append(i,l,c,g),r.appendChild(n),e.appendChild(r)}const Ln=`
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
  max-width: calc(100vw - 32px);
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

/* ── Mobile overrides ───────────────────────────────────────────────── */
@media (max-width: 699px) {
  .alibi-home-title {
    font-size: 2.2em;
    text-shadow:
      3px 0 0 #8a0000,
      0 3px 0 #8a0000,
      3px 3px 0 #8a0000,
      5px 5px 0 rgba(0,0,0,0.5);
    margin-bottom: 8px;
  }
  .alibi-home-subtitle {
    font-size: 0.45em;
    margin-bottom: 32px;
  }
  .alibi-home-btn {
    padding: 14px 16px;
    font-size: 0.55em;
  }
}
`;let lt=!1;function zn(){if(lt)return;const e=document.createElement("style");e.textContent=Ln,document.head.appendChild(e),lt=!0}function jn(){zn();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-home"),t.className="alibi-home";const a=document.createElement("div");a.className="alibi-home-eyebrow",a.textContent="— A Mystery Awaits —";const r=document.createElement("div");r.className="alibi-home-title",r.textContent="ALIBI";const n=document.createElement("div");n.className="alibi-home-subtitle",n.textContent=`Murder Mystery
Deduction`;const i=document.createElement("div");i.className="alibi-home-buttons",i.appendChild(Ne("btn-campaign","primary","📁 Campaign","12 escalating cases")),i.appendChild(Ne("btn-quickplay","secondary","🎲 Quick Play","Pick theme + difficulty"));const{themeId:l,difficulty:c}=ot(),g=Ae(),w=Ie(Ye())?.solved??!1,m=l.replace(/-/g," ").replace(/\b\w/g,h=>h.toUpperCase()),d=g>0?`🔥 ${g} day${g!==1?"s":""}`:"Start your streak",o=w?`✅ Solved · ${d}`:`${m} · ${c}`,p=Ne("btn-daily","secondary","📅 Daily Case",o),u=document.createElement("span");u.setAttribute("data-testid","daily-streak"),u.style.display="none",u.textContent=String(g),p.appendChild(u),i.appendChild(p),t.append(a,r,n,i),document.body.appendChild(t),t.querySelector('[data-testid="btn-quickplay"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=quickplay`}),t.querySelector('[data-testid="btn-campaign"]').addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?mode=campaign`}),t.querySelector('[data-testid="btn-daily"]').addEventListener("click",()=>{t.remove();const{seed:h,themeId:b,difficulty:f}=ot();window.location.href=`${window.location.pathname}?theme=${b}&difficulty=${f}&seed=${h}&mode=daily`})}function Ne(e,t,a,r){const n=document.createElement("button");n.setAttribute("data-testid",e),n.className=`alibi-home-btn ${t}`;const i=document.createElement("span");i.className="btn-title",i.textContent=a;const l=document.createElement("span");return l.className="btn-desc",l.textContent=r,n.append(i,l),n}const Dn=`
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
@media (max-width: 699px) {
  .alibi-campaign-board { padding: 16px 12px; }
  .alibi-case-grid { gap: 10px; }
  .alibi-campaign-header h1 { font-size: 1.3em; }
  .alibi-case-card { padding: 12px; }
  .alibi-slot-card { padding: 14px 12px; }
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
`,yt={rookie:"🔍 Rookie",investigator:"🔎 Investigator",detective:"🕵 Detective",senior:"🕵️ Senior Detective",chief:"⭐ Chief Inspector"};let ct=!1;function Hn(){if(ct)return;const e=document.createElement("style");e.textContent=Dn,document.head.appendChild(e),ct=!0}function Vn(e){const t=Math.floor(e/1e3),a=Math.floor(t/60),r=t%60;return`${a}:${r.toString().padStart(2,"0")}`}function _n(e){try{return ut(e).name}catch{return e}}function $e(e,t){t.innerHTML="";const a=document.createElement("div");a.className="alibi-campaign-header";const r=document.createElement("button");r.className="alibi-campaign-back",r.textContent="← Home",r.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="📁 Campaign";const i=document.createElement("div");i.className="alibi-campaign-rank",i.textContent=yt[e.rank]??e.rank,a.append(r,n,i);const l=document.createElement("div");l.className="alibi-case-grid",e.cases.forEach((c,g)=>{const w=c.status==="in_progress"||c.status==="solved",m=c.status==="solved",d=c.status==="locked",o=document.createElement("div");o.setAttribute("data-testid",`case-card-${g}`);let p="alibi-case-card";d&&(p+=" locked"),m&&(p+=" solved"),!d&&!m&&(p+=" unlocked"),o.className=p;const u=document.createElement("div");u.className="alibi-case-num",u.textContent=`Case ${g+1}`;const h=document.createElement("div");h.className="alibi-case-title",h.textContent=w?_n(c.themeId):"???";const b=document.createElement("div");b.className=`alibi-case-difficulty ${c.difficulty}`,b.textContent=c.difficulty.charAt(0).toUpperCase()+c.difficulty.slice(1);const f=document.createElement("div");if(f.setAttribute("data-testid",`case-status-${g}`),f.className=`alibi-case-status${d?" locked":""}`,f.textContent=m?"✅":d?"🔒":"📁",o.append(u,h,b,f),m&&c.solveTimeMs!=null){const $=document.createElement("div");$.className="alibi-case-time",$.textContent=`⏱ ${Vn(c.solveTimeMs)}`,o.appendChild($)}d||o.addEventListener("click",()=>{t.remove(),window.location.href=`${window.location.pathname}?theme=${c.themeId}&difficulty=${c.difficulty}&seed=${c.seed}&campaignSlot=${e.slot}&campaignCase=${g}`}),l.appendChild(o)}),t.append(a,l)}function Yn(e,t){t.innerHTML="";const a=document.createElement("div");a.className="alibi-campaign-header";const r=document.createElement("button");r.className="alibi-campaign-back",r.textContent="← Home",r.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="📁 Campaign",a.append(r,n);const i=document.createElement("div");i.className="alibi-slot-picker";const l=document.createElement("h2");l.textContent="Choose Save Slot",i.appendChild(l),e.forEach((c,g)=>{const w=g+1,m=document.createElement("div");m.setAttribute("data-testid",`slot-card-${w}`),m.className=`alibi-slot-card${c?"":" empty"}`;const d=document.createElement("div");d.className="alibi-slot-info";const o=document.createElement("div");if(o.className="alibi-slot-label",o.textContent=`Save Slot ${w}`,d.appendChild(o),c){const u=document.createElement("div");u.className="alibi-slot-rank",u.textContent=yt[c.rank]??c.rank;const h=c.cases.filter(f=>f.status==="solved").length,b=document.createElement("div");b.className="alibi-slot-progress",b.textContent=`Case ${c.currentCase+1} of 12 · ${h} solved · ${new Date(c.startedAt).toLocaleDateString()}`,d.append(u,b)}else{const u=document.createElement("div");u.className="alibi-slot-rank",u.textContent="Empty",d.appendChild(u)}const p=document.createElement("div");p.className="alibi-slot-action",p.textContent=c?"Continue →":"New →",m.append(d,p),m.addEventListener("click",()=>{if(c)$e(c,t);else{const u=gt(w);_e(u),$e(u,t)}}),i.appendChild(m)}),t.append(a,i)}function Gn(){Hn();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-campaign-board"),t.className="alibi-campaign-board",document.body.appendChild(t);const a=re(1),r=re(2),n=re(3);if(a??r??n){const c=new URLSearchParams(location.search).get("campaignSlot");if(c){const g=parseInt(c,10),w=re(g);if(w){$e(w,t);return}}Yn([a,r,n],t)}else{const l=gt(1);_e(l),$e(l,t)}}const Un=`
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
@media (max-width: 699px) {
  .alibi-theme-select { padding: 16px 12px; }
  .alibi-difficulty-row { flex-wrap: wrap; gap: 8px; }
  .alibi-diff-btn { padding: 10px 14px; font-size: 12px; min-height: 40px; }
  .alibi-theme-grid { gap: 8px; }
  .alibi-theme-card { padding: 12px; font-size: 13px; }
  .alibi-play-btn { width: 100%; padding: 14px; font-size: 1em; }
  .alibi-theme-select-header h1 { font-size: 1.2em; }
}
`,Kn={"coffee-shop":"☕",bookstore:"📚",backyard:"🌿","holiday-mall":"🎄",restaurant:"🍽",gym:"💪",office:"🏢","garden-party":"🌸",hospital:"🏥",carnival:"🎡"};let dt=!1;function qn(){if(dt)return;const e=document.createElement("style");e.textContent=Un,document.head.appendChild(e),dt=!0}function Zn(){qn();const e=document.getElementById("game-canvas");e&&(e.style.display="none");const t=document.createElement("div");t.setAttribute("data-testid","screen-theme-select"),t.className="alibi-theme-select";const a=document.createElement("div");a.className="alibi-theme-select-header";const r=document.createElement("button");r.className="alibi-theme-back",r.textContent="← Home",r.addEventListener("click",()=>{t.remove(),window.location.href=window.location.pathname});const n=document.createElement("h1");n.textContent="🎲 Quick Play",a.append(r,n);let i="easy";const l=document.createElement("div");l.className="alibi-difficulty-row";const c={};for(const[o,p]of[["easy","Easy"],["medium","Medium"],["hard","Hard"]]){const u=document.createElement("button");u.setAttribute("data-testid",`difficulty-${o}`),u.className=`alibi-diff-btn ${o}${o==="easy"?" selected":""}`,u.textContent=p,u.addEventListener("click",()=>{i=o,Object.values(c).forEach(h=>h.classList.remove("selected")),u.classList.add("selected")}),c[o]=u,l.appendChild(u)}let g=null;const w=document.createElement("div");w.className="alibi-theme-grid";const m={};for(const o of Wa()){if(o.id==="stub")continue;const p=document.createElement("div");p.setAttribute("data-testid",`theme-card-${o.id}`),p.className="alibi-theme-card";const u=document.createElement("div");u.className="alibi-theme-icon",u.textContent=Kn[o.id]??"🔍";const h=document.createElement("div");h.textContent=o.name.replace(/^The /,""),p.append(u,h),p.addEventListener("click",()=>{g=o.id,Object.values(m).forEach(b=>b.classList.remove("selected")),p.classList.add("selected"),d.disabled=!1}),m[o.id]=p,w.appendChild(p)}const d=document.createElement("button");d.setAttribute("data-testid","btn-play"),d.className="alibi-play-btn",d.textContent="Play",d.disabled=!0,d.addEventListener("click",()=>{if(!g)return;const o=Math.floor(Math.random()*4294967295);t.remove(),window.location.href=`${window.location.pathname}?theme=${g}&difficulty=${i}&seed=${o}`}),t.append(a,l,w,d),document.body.appendChild(t)}const we=new URLSearchParams(location.search);if(we.has("theme")||we.has("difficulty")||we.has("seed"))Mn();else switch(we.get("mode")){case"campaign":Gn();break;case"quickplay":Zn();break;default:jn();break}

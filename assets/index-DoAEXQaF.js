(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function rl(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const Re={},Kr=[],Gt=()=>{},_d=()=>!1,Yo=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),sl=n=>n.startsWith("onUpdate:"),ft=Object.assign,il=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},g_=Object.prototype.hasOwnProperty,Ee=(n,e)=>g_.call(n,e),oe=Array.isArray,Qr=n=>Xo(n)==="[object Map]",yd=n=>Xo(n)==="[object Set]",ce=n=>typeof n=="function",Ue=n=>typeof n=="string",ir=n=>typeof n=="symbol",ke=n=>n!==null&&typeof n=="object",vd=n=>(ke(n)||ce(n))&&ce(n.then)&&ce(n.catch),Ed=Object.prototype.toString,Xo=n=>Ed.call(n),__=n=>Xo(n).slice(8,-1),Td=n=>Xo(n)==="[object Object]",ol=n=>Ue(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Us=rl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Zo=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},y_=/-\w/g,Kn=Zo(n=>n.replace(y_,e=>e.slice(1).toUpperCase())),v_=/\B([A-Z])/g,Cr=Zo(n=>n.replace(v_,"-$1").toLowerCase()),wd=Zo(n=>n.charAt(0).toUpperCase()+n.slice(1)),Qa=Zo(n=>n?`on${wd(n)}`:""),Bn=(n,e)=>!Object.is(n,e),oo=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},Id=(n,e,t,r=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:r,value:t})},_c=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let sh;const ea=()=>sh||(sh=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function pi(n){if(oe(n)){const e={};for(let t=0;t<n.length;t++){const r=n[t],s=Ue(r)?I_(r):pi(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(Ue(n)||ke(n))return n}const E_=/;(?![^(]*\))/g,T_=/:([^]+)/,w_=/\/\*[^]*?\*\//g;function I_(n){const e={};return n.replace(w_,"").split(E_).forEach(t=>{if(t){const r=t.split(T_);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function ta(n){let e="";if(Ue(n))e=n;else if(oe(n))for(let t=0;t<n.length;t++){const r=ta(n[t]);r&&(e+=r+" ")}else if(ke(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const A_="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",b_=rl(A_);function Ad(n){return!!n||n===""}const bd=n=>!!(n&&n.__v_isRef===!0),$e=n=>Ue(n)?n:n==null?"":oe(n)||ke(n)&&(n.toString===Ed||!ce(n.toString))?bd(n)?$e(n.value):JSON.stringify(n,Rd,2):String(n),Rd=(n,e)=>bd(e)?Rd(n,e.value):Qr(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[r,s],i)=>(t[Ja(r,i)+" =>"]=s,t),{})}:yd(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>Ja(t))}:ir(e)?Ja(e):ke(e)&&!oe(e)&&!Td(e)?String(e):e,Ja=(n,e="")=>{var t;return ir(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let vt;class R_{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=vt,!e&&vt&&(this.index=(vt.scopes||(vt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=vt;try{return vt=this,e()}finally{vt=t}}}on(){++this._on===1&&(this.prevScope=vt,vt=this)}off(){this._on>0&&--this._on===0&&(vt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,r;for(t=0,r=this.effects.length;t<r;t++)this.effects[t].stop();for(this.effects.length=0,t=0,r=this.cleanups.length;t<r;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function S_(){return vt}let Se;const Ya=new WeakSet;class Sd{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,vt&&vt.active&&vt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ya.has(this)&&(Ya.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Pd(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,ih(this),kd(this);const e=Se,t=Ft;Se=this,Ft=!0;try{return this.fn()}finally{Vd(this),Se=e,Ft=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)ll(e);this.deps=this.depsTail=void 0,ih(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ya.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){yc(this)&&this.run()}get dirty(){return yc(this)}}let Cd=0,Bs,js;function Pd(n,e=!1){if(n.flags|=8,e){n.next=js,js=n;return}n.next=Bs,Bs=n}function al(){Cd++}function cl(){if(--Cd>0)return;if(js){let e=js;for(js=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Bs;){let e=Bs;for(Bs=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){n||(n=r)}e=t}}if(n)throw n}function kd(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Vd(n){let e,t=n.depsTail,r=t;for(;r;){const s=r.prevDep;r.version===-1?(r===t&&(t=s),ll(r),C_(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}n.deps=e,n.depsTail=t}function yc(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Dd(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Dd(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===ei)||(n.globalVersion=ei,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!yc(n))))return;n.flags|=2;const e=n.dep,t=Se,r=Ft;Se=n,Ft=!0;try{kd(n);const s=n.fn(n._value);(e.version===0||Bn(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{Se=t,Ft=r,Vd(n),n.flags&=-3}}function ll(n,e=!1){const{dep:t,prevSub:r,nextSub:s}=n;if(r&&(r.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=r,n.nextSub=void 0),t.subs===n&&(t.subs=r,!r&&t.computed)){t.computed.flags&=-5;for(let i=t.computed.deps;i;i=i.nextDep)ll(i,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function C_(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Ft=!0;const Nd=[];function gn(){Nd.push(Ft),Ft=!1}function _n(){const n=Nd.pop();Ft=n===void 0?!0:n}function ih(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=Se;Se=void 0;try{e()}finally{Se=t}}}let ei=0;class P_{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class ul{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Se||!Ft||Se===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Se)t=this.activeLink=new P_(Se,this),Se.deps?(t.prevDep=Se.depsTail,Se.depsTail.nextDep=t,Se.depsTail=t):Se.deps=Se.depsTail=t,Od(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const r=t.nextDep;r.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=r),t.prevDep=Se.depsTail,t.nextDep=void 0,Se.depsTail.nextDep=t,Se.depsTail=t,Se.deps===t&&(Se.deps=r)}return t}trigger(e){this.version++,ei++,this.notify(e)}notify(e){al();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{cl()}}}function Od(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)Od(r)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const vc=new WeakMap,Tr=Symbol(""),Ec=Symbol(""),ti=Symbol("");function ut(n,e,t){if(Ft&&Se){let r=vc.get(n);r||vc.set(n,r=new Map);let s=r.get(t);s||(r.set(t,s=new ul),s.map=r,s.key=t),s.track()}}function un(n,e,t,r,s,i){const a=vc.get(n);if(!a){ei++;return}const c=l=>{l&&l.trigger()};if(al(),e==="clear")a.forEach(c);else{const l=oe(n),h=l&&ol(t);if(l&&t==="length"){const d=Number(r);a.forEach((p,g)=>{(g==="length"||g===ti||!ir(g)&&g>=d)&&c(p)})}else switch((t!==void 0||a.has(void 0))&&c(a.get(t)),h&&c(a.get(ti)),e){case"add":l?h&&c(a.get("length")):(c(a.get(Tr)),Qr(n)&&c(a.get(Ec)));break;case"delete":l||(c(a.get(Tr)),Qr(n)&&c(a.get(Ec)));break;case"set":Qr(n)&&c(a.get(Tr));break}}cl()}function Fr(n){const e=ve(n);return e===n?e:(ut(e,"iterate",ti),Nt(n)?e:e.map(tt))}function na(n){return ut(n=ve(n),"iterate",ti),n}const k_={__proto__:null,[Symbol.iterator](){return Xa(this,Symbol.iterator,tt)},concat(...n){return Fr(this).concat(...n.map(e=>oe(e)?Fr(e):e))},entries(){return Xa(this,"entries",n=>(n[1]=tt(n[1]),n))},every(n,e){return cn(this,"every",n,e,void 0,arguments)},filter(n,e){return cn(this,"filter",n,e,t=>t.map(tt),arguments)},find(n,e){return cn(this,"find",n,e,tt,arguments)},findIndex(n,e){return cn(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return cn(this,"findLast",n,e,tt,arguments)},findLastIndex(n,e){return cn(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return cn(this,"forEach",n,e,void 0,arguments)},includes(...n){return Za(this,"includes",n)},indexOf(...n){return Za(this,"indexOf",n)},join(n){return Fr(this).join(n)},lastIndexOf(...n){return Za(this,"lastIndexOf",n)},map(n,e){return cn(this,"map",n,e,void 0,arguments)},pop(){return Ns(this,"pop")},push(...n){return Ns(this,"push",n)},reduce(n,...e){return oh(this,"reduce",n,e)},reduceRight(n,...e){return oh(this,"reduceRight",n,e)},shift(){return Ns(this,"shift")},some(n,e){return cn(this,"some",n,e,void 0,arguments)},splice(...n){return Ns(this,"splice",n)},toReversed(){return Fr(this).toReversed()},toSorted(n){return Fr(this).toSorted(n)},toSpliced(...n){return Fr(this).toSpliced(...n)},unshift(...n){return Ns(this,"unshift",n)},values(){return Xa(this,"values",tt)}};function Xa(n,e,t){const r=na(n),s=r[e]();return r!==n&&!Nt(n)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.done||(i.value=t(i.value)),i}),s}const V_=Array.prototype;function cn(n,e,t,r,s,i){const a=na(n),c=a!==n&&!Nt(n),l=a[e];if(l!==V_[e]){const p=l.apply(n,i);return c?tt(p):p}let h=t;a!==n&&(c?h=function(p,g){return t.call(this,tt(p),g,n)}:t.length>2&&(h=function(p,g){return t.call(this,p,g,n)}));const d=l.call(a,h,r);return c&&s?s(d):d}function oh(n,e,t,r){const s=na(n);let i=t;return s!==n&&(Nt(n)?t.length>3&&(i=function(a,c,l){return t.call(this,a,c,l,n)}):i=function(a,c,l){return t.call(this,a,tt(c),l,n)}),s[e](i,...r)}function Za(n,e,t){const r=ve(n);ut(r,"iterate",ti);const s=r[e](...t);return(s===-1||s===!1)&&pl(t[0])?(t[0]=ve(t[0]),r[e](...t)):s}function Ns(n,e,t=[]){gn(),al();const r=ve(n)[e].apply(n,t);return cl(),_n(),r}const D_=rl("__proto__,__v_isRef,__isVue"),xd=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(ir));function N_(n){ir(n)||(n=String(n));const e=ve(this);return ut(e,"has",n),e.hasOwnProperty(n)}class Md{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,r){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return i;if(t==="__v_raw")return r===(s?i?q_:Bd:i?Ud:Fd).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const a=oe(e);if(!s){let l;if(a&&(l=k_[t]))return l;if(t==="hasOwnProperty")return N_}const c=Reflect.get(e,t,ht(e)?e:r);if((ir(t)?xd.has(t):D_(t))||(s||ut(e,"get",t),i))return c;if(ht(c)){const l=a&&ol(t)?c:c.value;return s&&ke(l)?wc(l):l}return ke(c)?s?wc(c):fl(c):c}}class Ld extends Md{constructor(e=!1){super(!1,e)}set(e,t,r,s){let i=e[t];if(!this._isShallow){const l=Qn(i);if(!Nt(r)&&!Qn(r)&&(i=ve(i),r=ve(r)),!oe(e)&&ht(i)&&!ht(r))return l||(i.value=r),!0}const a=oe(e)&&ol(t)?Number(t)<e.length:Ee(e,t),c=Reflect.set(e,t,r,ht(e)?e:s);return e===ve(s)&&(a?Bn(r,i)&&un(e,"set",t,r):un(e,"add",t,r)),c}deleteProperty(e,t){const r=Ee(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&r&&un(e,"delete",t,void 0),s}has(e,t){const r=Reflect.has(e,t);return(!ir(t)||!xd.has(t))&&ut(e,"has",t),r}ownKeys(e){return ut(e,"iterate",oe(e)?"length":Tr),Reflect.ownKeys(e)}}class O_ extends Md{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const x_=new Ld,M_=new O_,L_=new Ld(!0);const Tc=n=>n,Yi=n=>Reflect.getPrototypeOf(n);function F_(n,e,t){return function(...r){const s=this.__v_raw,i=ve(s),a=Qr(i),c=n==="entries"||n===Symbol.iterator&&a,l=n==="keys"&&a,h=s[n](...r),d=t?Tc:e?wo:tt;return!e&&ut(i,"iterate",l?Ec:Tr),{next(){const{value:p,done:g}=h.next();return g?{value:p,done:g}:{value:c?[d(p[0]),d(p[1])]:d(p),done:g}},[Symbol.iterator](){return this}}}}function Xi(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function U_(n,e){const t={get(s){const i=this.__v_raw,a=ve(i),c=ve(s);n||(Bn(s,c)&&ut(a,"get",s),ut(a,"get",c));const{has:l}=Yi(a),h=e?Tc:n?wo:tt;if(l.call(a,s))return h(i.get(s));if(l.call(a,c))return h(i.get(c));i!==a&&i.get(s)},get size(){const s=this.__v_raw;return!n&&ut(ve(s),"iterate",Tr),s.size},has(s){const i=this.__v_raw,a=ve(i),c=ve(s);return n||(Bn(s,c)&&ut(a,"has",s),ut(a,"has",c)),s===c?i.has(s):i.has(s)||i.has(c)},forEach(s,i){const a=this,c=a.__v_raw,l=ve(c),h=e?Tc:n?wo:tt;return!n&&ut(l,"iterate",Tr),c.forEach((d,p)=>s.call(i,h(d),h(p),a))}};return ft(t,n?{add:Xi("add"),set:Xi("set"),delete:Xi("delete"),clear:Xi("clear")}:{add(s){!e&&!Nt(s)&&!Qn(s)&&(s=ve(s));const i=ve(this);return Yi(i).has.call(i,s)||(i.add(s),un(i,"add",s,s)),this},set(s,i){!e&&!Nt(i)&&!Qn(i)&&(i=ve(i));const a=ve(this),{has:c,get:l}=Yi(a);let h=c.call(a,s);h||(s=ve(s),h=c.call(a,s));const d=l.call(a,s);return a.set(s,i),h?Bn(i,d)&&un(a,"set",s,i):un(a,"add",s,i),this},delete(s){const i=ve(this),{has:a,get:c}=Yi(i);let l=a.call(i,s);l||(s=ve(s),l=a.call(i,s)),c&&c.call(i,s);const h=i.delete(s);return l&&un(i,"delete",s,void 0),h},clear(){const s=ve(this),i=s.size!==0,a=s.clear();return i&&un(s,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=F_(s,n,e)}),t}function hl(n,e){const t=U_(n,e);return(r,s,i)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?r:Reflect.get(Ee(t,s)&&s in r?t:r,s,i)}const B_={get:hl(!1,!1)},j_={get:hl(!1,!0)},$_={get:hl(!0,!1)};const Fd=new WeakMap,Ud=new WeakMap,Bd=new WeakMap,q_=new WeakMap;function H_(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function z_(n){return n.__v_skip||!Object.isExtensible(n)?0:H_(__(n))}function fl(n){return Qn(n)?n:dl(n,!1,x_,B_,Fd)}function W_(n){return dl(n,!1,L_,j_,Ud)}function wc(n){return dl(n,!0,M_,$_,Bd)}function dl(n,e,t,r,s){if(!ke(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const i=z_(n);if(i===0)return n;const a=s.get(n);if(a)return a;const c=new Proxy(n,i===2?r:t);return s.set(n,c),c}function Jr(n){return Qn(n)?Jr(n.__v_raw):!!(n&&n.__v_isReactive)}function Qn(n){return!!(n&&n.__v_isReadonly)}function Nt(n){return!!(n&&n.__v_isShallow)}function pl(n){return n?!!n.__v_raw:!1}function ve(n){const e=n&&n.__v_raw;return e?ve(e):n}function G_(n){return!Ee(n,"__v_skip")&&Object.isExtensible(n)&&Id(n,"__v_skip",!0),n}const tt=n=>ke(n)?fl(n):n,wo=n=>ke(n)?wc(n):n;function ht(n){return n?n.__v_isRef===!0:!1}function Vt(n){return K_(n,!1)}function K_(n,e){return ht(n)?n:new Q_(n,e)}class Q_{constructor(e,t){this.dep=new ul,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:ve(e),this._value=t?e:tt(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,r=this.__v_isShallow||Nt(e)||Qn(e);e=r?e:ve(e),Bn(e,t)&&(this._rawValue=e,this._value=r?e:tt(e),this.dep.trigger())}}function Ic(n){return ht(n)?n.value:n}const J_={get:(n,e,t)=>e==="__v_raw"?n:Ic(Reflect.get(n,e,t)),set:(n,e,t,r)=>{const s=n[e];return ht(s)&&!ht(t)?(s.value=t,!0):Reflect.set(n,e,t,r)}};function jd(n){return Jr(n)?n:new Proxy(n,J_)}class Y_{constructor(e,t,r){this.fn=e,this.setter=t,this._value=void 0,this.dep=new ul(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ei-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Se!==this)return Pd(this,!0),!0}get value(){const e=this.dep.track();return Dd(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function X_(n,e,t=!1){let r,s;return ce(n)?r=n:(r=n.get,s=n.set),new Y_(r,s,t)}const Zi={},Io=new WeakMap;let yr;function Z_(n,e=!1,t=yr){if(t){let r=Io.get(t);r||Io.set(t,r=[]),r.push(n)}}function ey(n,e,t=Re){const{immediate:r,deep:s,once:i,scheduler:a,augmentJob:c,call:l}=t,h=K=>s?K:Nt(K)||s===!1||s===0?hn(K,1):hn(K);let d,p,g,I,C=!1,N=!1;if(ht(n)?(p=()=>n.value,C=Nt(n)):Jr(n)?(p=()=>h(n),C=!0):oe(n)?(N=!0,C=n.some(K=>Jr(K)||Nt(K)),p=()=>n.map(K=>{if(ht(K))return K.value;if(Jr(K))return h(K);if(ce(K))return l?l(K,2):K()})):ce(n)?e?p=l?()=>l(n,2):n:p=()=>{if(g){gn();try{g()}finally{_n()}}const K=yr;yr=d;try{return l?l(n,3,[I]):n(I)}finally{yr=K}}:p=Gt,e&&s){const K=p,de=s===!0?1/0:s;p=()=>hn(K(),de)}const O=S_(),H=()=>{d.stop(),O&&O.active&&il(O.effects,d)};if(i&&e){const K=e;e=(...de)=>{K(...de),H()}}let W=N?new Array(n.length).fill(Zi):Zi;const G=K=>{if(!(!(d.flags&1)||!d.dirty&&!K))if(e){const de=d.run();if(s||C||(N?de.some((le,A)=>Bn(le,W[A])):Bn(de,W))){g&&g();const le=yr;yr=d;try{const A=[de,W===Zi?void 0:N&&W[0]===Zi?[]:W,I];W=de,l?l(e,3,A):e(...A)}finally{yr=le}}}else d.run()};return c&&c(G),d=new Sd(p),d.scheduler=a?()=>a(G,!1):G,I=K=>Z_(K,!1,d),g=d.onStop=()=>{const K=Io.get(d);if(K){if(l)l(K,4);else for(const de of K)de();Io.delete(d)}},e?r?G(!0):W=d.run():a?a(G.bind(null,!0),!0):d.run(),H.pause=d.pause.bind(d),H.resume=d.resume.bind(d),H.stop=H,H}function hn(n,e=1/0,t){if(e<=0||!ke(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,ht(n))hn(n.value,e,t);else if(oe(n))for(let r=0;r<n.length;r++)hn(n[r],e,t);else if(yd(n)||Qr(n))n.forEach(r=>{hn(r,e,t)});else if(Td(n)){for(const r in n)hn(n[r],e,t);for(const r of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,r)&&hn(n[r],e,t)}return n}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function mi(n,e,t,r){try{return r?n(...r):n()}catch(s){ra(s,e,t)}}function tn(n,e,t,r){if(ce(n)){const s=mi(n,e,t,r);return s&&vd(s)&&s.catch(i=>{ra(i,e,t)}),s}if(oe(n)){const s=[];for(let i=0;i<n.length;i++)s.push(tn(n[i],e,t,r));return s}}function ra(n,e,t,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||Re;if(e){let c=e.parent;const l=e.proxy,h=`https://vuejs.org/error-reference/#runtime-${t}`;for(;c;){const d=c.ec;if(d){for(let p=0;p<d.length;p++)if(d[p](n,l,h)===!1)return}c=c.parent}if(i){gn(),mi(i,null,10,[n,l,h]),_n();return}}ty(n,t,s,r,a)}function ty(n,e,t,r=!0,s=!1){if(s)throw n;console.error(n)}const gt=[];let Ht=-1;const Yr=[];let Dn=null,Ur=0;const $d=Promise.resolve();let Ao=null;function ny(n){const e=Ao||$d;return n?e.then(this?n.bind(this):n):e}function ry(n){let e=Ht+1,t=gt.length;for(;e<t;){const r=e+t>>>1,s=gt[r],i=ni(s);i<n||i===n&&s.flags&2?e=r+1:t=r}return e}function ml(n){if(!(n.flags&1)){const e=ni(n),t=gt[gt.length-1];!t||!(n.flags&2)&&e>=ni(t)?gt.push(n):gt.splice(ry(e),0,n),n.flags|=1,qd()}}function qd(){Ao||(Ao=$d.then(zd))}function sy(n){oe(n)?Yr.push(...n):Dn&&n.id===-1?Dn.splice(Ur+1,0,n):n.flags&1||(Yr.push(n),n.flags|=1),qd()}function ah(n,e,t=Ht+1){for(;t<gt.length;t++){const r=gt[t];if(r&&r.flags&2){if(n&&r.id!==n.uid)continue;gt.splice(t,1),t--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Hd(n){if(Yr.length){const e=[...new Set(Yr)].sort((t,r)=>ni(t)-ni(r));if(Yr.length=0,Dn){Dn.push(...e);return}for(Dn=e,Ur=0;Ur<Dn.length;Ur++){const t=Dn[Ur];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Dn=null,Ur=0}}const ni=n=>n.id==null?n.flags&2?-1:1/0:n.id;function zd(n){try{for(Ht=0;Ht<gt.length;Ht++){const e=gt[Ht];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),mi(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Ht<gt.length;Ht++){const e=gt[Ht];e&&(e.flags&=-2)}Ht=-1,gt.length=0,Hd(),Ao=null,(gt.length||Yr.length)&&zd()}}let Dt=null,Wd=null;function bo(n){const e=Dt;return Dt=n,Wd=n&&n.type.__scopeId||null,e}function iy(n,e=Dt,t){if(!e||n._n)return n;const r=(...s)=>{r._d&&yh(-1);const i=bo(e);let a;try{a=n(...s)}finally{bo(i),r._d&&yh(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function ch(n,e){if(Dt===null)return n;const t=la(Dt),r=n.dirs||(n.dirs=[]);for(let s=0;s<e.length;s++){let[i,a,c,l=Re]=e[s];i&&(ce(i)&&(i={mounted:i,updated:i}),i.deep&&hn(a),r.push({dir:i,instance:t,value:a,oldValue:void 0,arg:c,modifiers:l}))}return n}function gr(n,e,t,r){const s=n.dirs,i=e&&e.dirs;for(let a=0;a<s.length;a++){const c=s[a];i&&(c.oldValue=i[a].value);let l=c.dir[r];l&&(gn(),tn(l,t,8,[n.el,c,n,e]),_n())}}const oy=Symbol("_vte"),ay=n=>n.__isTeleport,cy=Symbol("_leaveCb");function gl(n,e){n.shapeFlag&6&&n.component?(n.transition=e,gl(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function sa(n,e){return ce(n)?ft({name:n.name},e,{setup:n}):n}function Gd(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}const Ro=new WeakMap;function $s(n,e,t,r,s=!1){if(oe(n)){n.forEach((C,N)=>$s(C,e&&(oe(e)?e[N]:e),t,r,s));return}if(qs(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&$s(n,e,t,r.component.subTree);return}const i=r.shapeFlag&4?la(r.component):r.el,a=s?null:i,{i:c,r:l}=n,h=e&&e.r,d=c.refs===Re?c.refs={}:c.refs,p=c.setupState,g=ve(p),I=p===Re?_d:C=>Ee(g,C);if(h!=null&&h!==l){if(lh(e),Ue(h))d[h]=null,I(h)&&(p[h]=null);else if(ht(h)){h.value=null;const C=e;C.k&&(d[C.k]=null)}}if(ce(l))mi(l,c,12,[a,d]);else{const C=Ue(l),N=ht(l);if(C||N){const O=()=>{if(n.f){const H=C?I(l)?p[l]:d[l]:l.value;if(s)oe(H)&&il(H,i);else if(oe(H))H.includes(i)||H.push(i);else if(C)d[l]=[i],I(l)&&(p[l]=d[l]);else{const W=[i];l.value=W,n.k&&(d[n.k]=W)}}else C?(d[l]=a,I(l)&&(p[l]=a)):N&&(l.value=a,n.k&&(d[n.k]=a))};if(a){const H=()=>{O(),Ro.delete(n)};H.id=-1,Ro.set(n,H),wt(H,t)}else lh(n),O()}}}function lh(n){const e=Ro.get(n);e&&(e.flags|=8,Ro.delete(n))}ea().requestIdleCallback;ea().cancelIdleCallback;const qs=n=>!!n.type.__asyncLoader,Kd=n=>n.type.__isKeepAlive;function ly(n,e){Qd(n,"a",e)}function uy(n,e){Qd(n,"da",e)}function Qd(n,e,t=_t){const r=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(ia(e,r,t),t){let s=t.parent;for(;s&&s.parent;)Kd(s.parent.vnode)&&hy(r,e,t,s),s=s.parent}}function hy(n,e,t,r){const s=ia(e,n,r,!0);oa(()=>{il(r[e],s)},t)}function ia(n,e,t=_t,r=!1){if(t){const s=t[n]||(t[n]=[]),i=e.__weh||(e.__weh=(...a)=>{gn();const c=gi(t),l=tn(e,t,n,a);return c(),_n(),l});return r?s.unshift(i):s.push(i),i}}const An=n=>(e,t=_t)=>{(!si||n==="sp")&&ia(n,(...r)=>e(...r),t)},fy=An("bm"),_l=An("m"),dy=An("bu"),py=An("u"),my=An("bum"),oa=An("um"),gy=An("sp"),_y=An("rtg"),yy=An("rtc");function vy(n,e=_t){ia("ec",n,e)}const Ey=Symbol.for("v-ndc");function Jd(n,e,t,r){let s;const i=t,a=oe(n);if(a||Ue(n)){const c=a&&Jr(n);let l=!1,h=!1;c&&(l=!Nt(n),h=Qn(n),n=na(n)),s=new Array(n.length);for(let d=0,p=n.length;d<p;d++)s[d]=e(l?h?wo(tt(n[d])):tt(n[d]):n[d],d,void 0,i)}else if(typeof n=="number"){s=new Array(n);for(let c=0;c<n;c++)s[c]=e(c+1,c,void 0,i)}else if(ke(n))if(n[Symbol.iterator])s=Array.from(n,(c,l)=>e(c,l,void 0,i));else{const c=Object.keys(n);s=new Array(c.length);for(let l=0,h=c.length;l<h;l++){const d=c[l];s[l]=e(n[d],d,l,i)}}else s=[];return s}const Ac=n=>n?_p(n)?la(n):Ac(n.parent):null,Hs=ft(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Ac(n.parent),$root:n=>Ac(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Xd(n),$forceUpdate:n=>n.f||(n.f=()=>{ml(n.update)}),$nextTick:n=>n.n||(n.n=ny.bind(n.proxy)),$watch:n=>$y.bind(n)}),ec=(n,e)=>n!==Re&&!n.__isScriptSetup&&Ee(n,e),Ty={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:r,data:s,props:i,accessCache:a,type:c,appContext:l}=n;let h;if(e[0]!=="$"){const I=a[e];if(I!==void 0)switch(I){case 1:return r[e];case 2:return s[e];case 4:return t[e];case 3:return i[e]}else{if(ec(r,e))return a[e]=1,r[e];if(s!==Re&&Ee(s,e))return a[e]=2,s[e];if((h=n.propsOptions[0])&&Ee(h,e))return a[e]=3,i[e];if(t!==Re&&Ee(t,e))return a[e]=4,t[e];bc&&(a[e]=0)}}const d=Hs[e];let p,g;if(d)return e==="$attrs"&&ut(n.attrs,"get",""),d(n);if((p=c.__cssModules)&&(p=p[e]))return p;if(t!==Re&&Ee(t,e))return a[e]=4,t[e];if(g=l.config.globalProperties,Ee(g,e))return g[e]},set({_:n},e,t){const{data:r,setupState:s,ctx:i}=n;return ec(s,e)?(s[e]=t,!0):r!==Re&&Ee(r,e)?(r[e]=t,!0):Ee(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(i[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:r,appContext:s,propsOptions:i,type:a}},c){let l,h;return!!(t[c]||n!==Re&&c[0]!=="$"&&Ee(n,c)||ec(e,c)||(l=i[0])&&Ee(l,c)||Ee(r,c)||Ee(Hs,c)||Ee(s.config.globalProperties,c)||(h=a.__cssModules)&&h[c])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:Ee(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function uh(n){return oe(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let bc=!0;function wy(n){const e=Xd(n),t=n.proxy,r=n.ctx;bc=!1,e.beforeCreate&&hh(e.beforeCreate,n,"bc");const{data:s,computed:i,methods:a,watch:c,provide:l,inject:h,created:d,beforeMount:p,mounted:g,beforeUpdate:I,updated:C,activated:N,deactivated:O,beforeDestroy:H,beforeUnmount:W,destroyed:G,unmounted:K,render:de,renderTracked:le,renderTriggered:A,errorCaptured:y,serverPrefetch:_,expose:v,inheritAttrs:w,components:R,directives:E,filters:st}=e;if(h&&Iy(h,r,null),a)for(const Te in a){const _e=a[Te];ce(_e)&&(r[Te]=_e.bind(t))}if(s){const Te=s.call(t,t);ke(Te)&&(n.data=fl(Te))}if(bc=!0,i)for(const Te in i){const _e=i[Te],Ot=ce(_e)?_e.bind(t,t):ce(_e.get)?_e.get.bind(t,t):Gt,lr=!ce(_e)&&ce(_e.set)?_e.set.bind(t):Gt,rn=It({get:Ot,set:lr});Object.defineProperty(r,Te,{enumerable:!0,configurable:!0,get:()=>rn.value,set:Be=>rn.value=Be})}if(c)for(const Te in c)Yd(c[Te],r,t,Te);if(l){const Te=ce(l)?l.call(t):l;Reflect.ownKeys(Te).forEach(_e=>{Py(_e,Te[_e])})}d&&hh(d,n,"c");function Qe(Te,_e){oe(_e)?_e.forEach(Ot=>Te(Ot.bind(t))):_e&&Te(_e.bind(t))}if(Qe(fy,p),Qe(_l,g),Qe(dy,I),Qe(py,C),Qe(ly,N),Qe(uy,O),Qe(vy,y),Qe(yy,le),Qe(_y,A),Qe(my,W),Qe(oa,K),Qe(gy,_),oe(v))if(v.length){const Te=n.exposed||(n.exposed={});v.forEach(_e=>{Object.defineProperty(Te,_e,{get:()=>t[_e],set:Ot=>t[_e]=Ot,enumerable:!0})})}else n.exposed||(n.exposed={});de&&n.render===Gt&&(n.render=de),w!=null&&(n.inheritAttrs=w),R&&(n.components=R),E&&(n.directives=E),_&&Gd(n)}function Iy(n,e,t=Gt){oe(n)&&(n=Rc(n));for(const r in n){const s=n[r];let i;ke(s)?"default"in s?i=ao(s.from||r,s.default,!0):i=ao(s.from||r):i=ao(s),ht(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:a=>i.value=a}):e[r]=i}}function hh(n,e,t){tn(oe(n)?n.map(r=>r.bind(e.proxy)):n.bind(e.proxy),e,t)}function Yd(n,e,t,r){let s=r.includes(".")?hp(t,r):()=>t[r];if(Ue(n)){const i=e[n];ce(i)&&co(s,i)}else if(ce(n))co(s,n.bind(t));else if(ke(n))if(oe(n))n.forEach(i=>Yd(i,e,t,r));else{const i=ce(n.handler)?n.handler.bind(t):e[n.handler];ce(i)&&co(s,i,n)}}function Xd(n){const e=n.type,{mixins:t,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:a}}=n.appContext,c=i.get(e);let l;return c?l=c:!s.length&&!t&&!r?l=e:(l={},s.length&&s.forEach(h=>So(l,h,a,!0)),So(l,e,a)),ke(e)&&i.set(e,l),l}function So(n,e,t,r=!1){const{mixins:s,extends:i}=e;i&&So(n,i,t,!0),s&&s.forEach(a=>So(n,a,t,!0));for(const a in e)if(!(r&&a==="expose")){const c=Ay[a]||t&&t[a];n[a]=c?c(n[a],e[a]):e[a]}return n}const Ay={data:fh,props:dh,emits:dh,methods:xs,computed:xs,beforeCreate:mt,created:mt,beforeMount:mt,mounted:mt,beforeUpdate:mt,updated:mt,beforeDestroy:mt,beforeUnmount:mt,destroyed:mt,unmounted:mt,activated:mt,deactivated:mt,errorCaptured:mt,serverPrefetch:mt,components:xs,directives:xs,watch:Ry,provide:fh,inject:by};function fh(n,e){return e?n?function(){return ft(ce(n)?n.call(this,this):n,ce(e)?e.call(this,this):e)}:e:n}function by(n,e){return xs(Rc(n),Rc(e))}function Rc(n){if(oe(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function mt(n,e){return n?[...new Set([].concat(n,e))]:e}function xs(n,e){return n?ft(Object.create(null),n,e):e}function dh(n,e){return n?oe(n)&&oe(e)?[...new Set([...n,...e])]:ft(Object.create(null),uh(n),uh(e??{})):e}function Ry(n,e){if(!n)return e;if(!e)return n;const t=ft(Object.create(null),n);for(const r in e)t[r]=mt(n[r],e[r]);return t}function Zd(){return{app:null,config:{isNativeTag:_d,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Sy=0;function Cy(n,e){return function(r,s=null){ce(r)||(r=ft({},r)),s!=null&&!ke(s)&&(s=null);const i=Zd(),a=new WeakSet,c=[];let l=!1;const h=i.app={_uid:Sy++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:uv,get config(){return i.config},set config(d){},use(d,...p){return a.has(d)||(d&&ce(d.install)?(a.add(d),d.install(h,...p)):ce(d)&&(a.add(d),d(h,...p))),h},mixin(d){return i.mixins.includes(d)||i.mixins.push(d),h},component(d,p){return p?(i.components[d]=p,h):i.components[d]},directive(d,p){return p?(i.directives[d]=p,h):i.directives[d]},mount(d,p,g){if(!l){const I=h._ceVNode||Kt(r,s);return I.appContext=i,g===!0?g="svg":g===!1&&(g=void 0),n(I,d,g),l=!0,h._container=d,d.__vue_app__=h,la(I.component)}},onUnmount(d){c.push(d)},unmount(){l&&(tn(c,h._instance,16),n(null,h._container),delete h._container.__vue_app__)},provide(d,p){return i.provides[d]=p,h},runWithContext(d){const p=Xr;Xr=h;try{return d()}finally{Xr=p}}};return h}}let Xr=null;function Py(n,e){if(_t){let t=_t.provides;const r=_t.parent&&_t.parent.provides;r===t&&(t=_t.provides=Object.create(r)),t[n]=e}}function ao(n,e,t=!1){const r=sv();if(r||Xr){let s=Xr?Xr._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&ce(e)?e.call(r&&r.proxy):e}}const ep={},tp=()=>Object.create(ep),np=n=>Object.getPrototypeOf(n)===ep;function ky(n,e,t,r=!1){const s={},i=tp();n.propsDefaults=Object.create(null),rp(n,e,s,i);for(const a in n.propsOptions[0])a in s||(s[a]=void 0);t?n.props=r?s:W_(s):n.type.props?n.props=s:n.props=i,n.attrs=i}function Vy(n,e,t,r){const{props:s,attrs:i,vnode:{patchFlag:a}}=n,c=ve(s),[l]=n.propsOptions;let h=!1;if((r||a>0)&&!(a&16)){if(a&8){const d=n.vnode.dynamicProps;for(let p=0;p<d.length;p++){let g=d[p];if(aa(n.emitsOptions,g))continue;const I=e[g];if(l)if(Ee(i,g))I!==i[g]&&(i[g]=I,h=!0);else{const C=Kn(g);s[C]=Sc(l,c,C,I,n,!1)}else I!==i[g]&&(i[g]=I,h=!0)}}}else{rp(n,e,s,i)&&(h=!0);let d;for(const p in c)(!e||!Ee(e,p)&&((d=Cr(p))===p||!Ee(e,d)))&&(l?t&&(t[p]!==void 0||t[d]!==void 0)&&(s[p]=Sc(l,c,p,void 0,n,!0)):delete s[p]);if(i!==c)for(const p in i)(!e||!Ee(e,p))&&(delete i[p],h=!0)}h&&un(n.attrs,"set","")}function rp(n,e,t,r){const[s,i]=n.propsOptions;let a=!1,c;if(e)for(let l in e){if(Us(l))continue;const h=e[l];let d;s&&Ee(s,d=Kn(l))?!i||!i.includes(d)?t[d]=h:(c||(c={}))[d]=h:aa(n.emitsOptions,l)||(!(l in r)||h!==r[l])&&(r[l]=h,a=!0)}if(i){const l=ve(t),h=c||Re;for(let d=0;d<i.length;d++){const p=i[d];t[p]=Sc(s,l,p,h[p],n,!Ee(h,p))}}return a}function Sc(n,e,t,r,s,i){const a=n[t];if(a!=null){const c=Ee(a,"default");if(c&&r===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&ce(l)){const{propsDefaults:h}=s;if(t in h)r=h[t];else{const d=gi(s);r=h[t]=l.call(null,e),d()}}else r=l;s.ce&&s.ce._setProp(t,r)}a[0]&&(i&&!c?r=!1:a[1]&&(r===""||r===Cr(t))&&(r=!0))}return r}const Dy=new WeakMap;function sp(n,e,t=!1){const r=t?Dy:e.propsCache,s=r.get(n);if(s)return s;const i=n.props,a={},c=[];let l=!1;if(!ce(n)){const d=p=>{l=!0;const[g,I]=sp(p,e,!0);ft(a,g),I&&c.push(...I)};!t&&e.mixins.length&&e.mixins.forEach(d),n.extends&&d(n.extends),n.mixins&&n.mixins.forEach(d)}if(!i&&!l)return ke(n)&&r.set(n,Kr),Kr;if(oe(i))for(let d=0;d<i.length;d++){const p=Kn(i[d]);ph(p)&&(a[p]=Re)}else if(i)for(const d in i){const p=Kn(d);if(ph(p)){const g=i[d],I=a[p]=oe(g)||ce(g)?{type:g}:ft({},g),C=I.type;let N=!1,O=!0;if(oe(C))for(let H=0;H<C.length;++H){const W=C[H],G=ce(W)&&W.name;if(G==="Boolean"){N=!0;break}else G==="String"&&(O=!1)}else N=ce(C)&&C.name==="Boolean";I[0]=N,I[1]=O,(N||Ee(I,"default"))&&c.push(p)}}const h=[a,c];return ke(n)&&r.set(n,h),h}function ph(n){return n[0]!=="$"&&!Us(n)}const yl=n=>n==="_"||n==="_ctx"||n==="$stable",vl=n=>oe(n)?n.map(Wt):[Wt(n)],Ny=(n,e,t)=>{if(e._n)return e;const r=iy((...s)=>vl(e(...s)),t);return r._c=!1,r},ip=(n,e,t)=>{const r=n._ctx;for(const s in n){if(yl(s))continue;const i=n[s];if(ce(i))e[s]=Ny(s,i,r);else if(i!=null){const a=vl(i);e[s]=()=>a}}},op=(n,e)=>{const t=vl(e);n.slots.default=()=>t},ap=(n,e,t)=>{for(const r in e)(t||!yl(r))&&(n[r]=e[r])},Oy=(n,e,t)=>{const r=n.slots=tp();if(n.vnode.shapeFlag&32){const s=e._;s?(ap(r,e,t),t&&Id(r,"_",s,!0)):ip(e,r)}else e&&op(n,e)},xy=(n,e,t)=>{const{vnode:r,slots:s}=n;let i=!0,a=Re;if(r.shapeFlag&32){const c=e._;c?t&&c===1?i=!1:ap(s,e,t):(i=!e.$stable,ip(e,s)),a=e}else e&&(op(n,e),a={default:1});if(i)for(const c in s)!yl(c)&&a[c]==null&&delete s[c]},wt=Jy;function My(n){return Ly(n)}function Ly(n,e){const t=ea();t.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:a,createText:c,createComment:l,setText:h,setElementText:d,parentNode:p,nextSibling:g,setScopeId:I=Gt,insertStaticContent:C}=n,N=(T,b,k,L=null,x=null,M=null,$=void 0,B=null,U=!!b.dynamicChildren)=>{if(T===b)return;T&&!Os(T,b)&&(L=sn(T),Be(T,x,M,!0),T=null),b.patchFlag===-2&&(U=!1,b.dynamicChildren=null);const{type:F,ref:Z,shapeFlag:z}=b;switch(F){case ca:O(T,b,k,L);break;case Jn:H(T,b,k,L);break;case nc:T==null&&W(b,k,L,$);break;case kt:R(T,b,k,L,x,M,$,B,U);break;default:z&1?de(T,b,k,L,x,M,$,B,U):z&6?E(T,b,k,L,x,M,$,B,U):(z&64||z&128)&&F.process(T,b,k,L,x,M,$,B,U,jt)}Z!=null&&x?$s(Z,T&&T.ref,M,b||T,!b):Z==null&&T&&T.ref!=null&&$s(T.ref,null,M,T,!0)},O=(T,b,k,L)=>{if(T==null)r(b.el=c(b.children),k,L);else{const x=b.el=T.el;b.children!==T.children&&h(x,b.children)}},H=(T,b,k,L)=>{T==null?r(b.el=l(b.children||""),k,L):b.el=T.el},W=(T,b,k,L)=>{[T.el,T.anchor]=C(T.children,b,k,L,T.el,T.anchor)},G=({el:T,anchor:b},k,L)=>{let x;for(;T&&T!==b;)x=g(T),r(T,k,L),T=x;r(b,k,L)},K=({el:T,anchor:b})=>{let k;for(;T&&T!==b;)k=g(T),s(T),T=k;s(b)},de=(T,b,k,L,x,M,$,B,U)=>{b.type==="svg"?$="svg":b.type==="math"&&($="mathml"),T==null?le(b,k,L,x,M,$,B,U):_(T,b,x,M,$,B,U)},le=(T,b,k,L,x,M,$,B)=>{let U,F;const{props:Z,shapeFlag:z,transition:J,dirs:ne}=T;if(U=T.el=a(T.type,M,Z&&Z.is,Z),z&8?d(U,T.children):z&16&&y(T.children,U,null,L,x,tc(T,M),$,B),ne&&gr(T,null,L,"created"),A(U,T,T.scopeId,$,L),Z){for(const ae in Z)ae!=="value"&&!Us(ae)&&i(U,ae,null,Z[ae],M,L);"value"in Z&&i(U,"value",null,Z.value,M),(F=Z.onVnodeBeforeMount)&&$t(F,L,T)}ne&&gr(T,null,L,"beforeMount");const ee=Fy(x,J);ee&&J.beforeEnter(U),r(U,b,k),((F=Z&&Z.onVnodeMounted)||ee||ne)&&wt(()=>{F&&$t(F,L,T),ee&&J.enter(U),ne&&gr(T,null,L,"mounted")},x)},A=(T,b,k,L,x)=>{if(k&&I(T,k),L)for(let M=0;M<L.length;M++)I(T,L[M]);if(x){let M=x.subTree;if(b===M||dp(M.type)&&(M.ssContent===b||M.ssFallback===b)){const $=x.vnode;A(T,$,$.scopeId,$.slotScopeIds,x.parent)}}},y=(T,b,k,L,x,M,$,B,U=0)=>{for(let F=U;F<T.length;F++){const Z=T[F]=B?Nn(T[F]):Wt(T[F]);N(null,Z,b,k,L,x,M,$,B)}},_=(T,b,k,L,x,M,$)=>{const B=b.el=T.el;let{patchFlag:U,dynamicChildren:F,dirs:Z}=b;U|=T.patchFlag&16;const z=T.props||Re,J=b.props||Re;let ne;if(k&&_r(k,!1),(ne=J.onVnodeBeforeUpdate)&&$t(ne,k,b,T),Z&&gr(b,T,k,"beforeUpdate"),k&&_r(k,!0),(z.innerHTML&&J.innerHTML==null||z.textContent&&J.textContent==null)&&d(B,""),F?v(T.dynamicChildren,F,B,k,L,tc(b,x),M):$||_e(T,b,B,null,k,L,tc(b,x),M,!1),U>0){if(U&16)w(B,z,J,k,x);else if(U&2&&z.class!==J.class&&i(B,"class",null,J.class,x),U&4&&i(B,"style",z.style,J.style,x),U&8){const ee=b.dynamicProps;for(let ae=0;ae<ee.length;ae++){const pe=ee[ae],Je=z[pe],Ye=J[pe];(Ye!==Je||pe==="value")&&i(B,pe,Je,Ye,x,k)}}U&1&&T.children!==b.children&&d(B,b.children)}else!$&&F==null&&w(B,z,J,k,x);((ne=J.onVnodeUpdated)||Z)&&wt(()=>{ne&&$t(ne,k,b,T),Z&&gr(b,T,k,"updated")},L)},v=(T,b,k,L,x,M,$)=>{for(let B=0;B<b.length;B++){const U=T[B],F=b[B],Z=U.el&&(U.type===kt||!Os(U,F)||U.shapeFlag&198)?p(U.el):k;N(U,F,Z,null,L,x,M,$,!0)}},w=(T,b,k,L,x)=>{if(b!==k){if(b!==Re)for(const M in b)!Us(M)&&!(M in k)&&i(T,M,b[M],null,x,L);for(const M in k){if(Us(M))continue;const $=k[M],B=b[M];$!==B&&M!=="value"&&i(T,M,B,$,x,L)}"value"in k&&i(T,"value",b.value,k.value,x)}},R=(T,b,k,L,x,M,$,B,U)=>{const F=b.el=T?T.el:c(""),Z=b.anchor=T?T.anchor:c("");let{patchFlag:z,dynamicChildren:J,slotScopeIds:ne}=b;ne&&(B=B?B.concat(ne):ne),T==null?(r(F,k,L),r(Z,k,L),y(b.children||[],k,Z,x,M,$,B,U)):z>0&&z&64&&J&&T.dynamicChildren?(v(T.dynamicChildren,J,k,x,M,$,B),(b.key!=null||x&&b===x.subTree)&&cp(T,b,!0)):_e(T,b,k,Z,x,M,$,B,U)},E=(T,b,k,L,x,M,$,B,U)=>{b.slotScopeIds=B,T==null?b.shapeFlag&512?x.ctx.activate(b,k,L,$,U):st(b,k,L,x,M,$,U):Rn(T,b,U)},st=(T,b,k,L,x,M,$)=>{const B=T.component=rv(T,L,x);if(Kd(T)&&(B.ctx.renderer=jt),iv(B,!1,$),B.asyncDep){if(x&&x.registerDep(B,Qe,$),!T.el){const U=B.subTree=Kt(Jn);H(null,U,b,k),T.placeholder=U.el}}else Qe(B,T,b,k,x,M,$)},Rn=(T,b,k)=>{const L=b.component=T.component;if(Ky(T,b,k))if(L.asyncDep&&!L.asyncResolved){Te(L,b,k);return}else L.next=b,L.update();else b.el=T.el,L.vnode=b},Qe=(T,b,k,L,x,M,$)=>{const B=()=>{if(T.isMounted){let{next:z,bu:J,u:ne,parent:ee,vnode:ae}=T;{const it=lp(T);if(it){z&&(z.el=ae.el,Te(T,z,$)),it.asyncDep.then(()=>{T.isUnmounted||B()});return}}let pe=z,Je;_r(T,!1),z?(z.el=ae.el,Te(T,z,$)):z=ae,J&&oo(J),(Je=z.props&&z.props.onVnodeBeforeUpdate)&&$t(Je,ee,z,ae),_r(T,!0);const Ye=gh(T),Ct=T.subTree;T.subTree=Ye,N(Ct,Ye,p(Ct.el),sn(Ct),T,x,M),z.el=Ye.el,pe===null&&Qy(T,Ye.el),ne&&wt(ne,x),(Je=z.props&&z.props.onVnodeUpdated)&&wt(()=>$t(Je,ee,z,ae),x)}else{let z;const{el:J,props:ne}=b,{bm:ee,m:ae,parent:pe,root:Je,type:Ye}=T,Ct=qs(b);_r(T,!1),ee&&oo(ee),!Ct&&(z=ne&&ne.onVnodeBeforeMount)&&$t(z,pe,b),_r(T,!0);{Je.ce&&Je.ce._def.shadowRoot!==!1&&Je.ce._injectChildStyle(Ye);const it=T.subTree=gh(T);N(null,it,k,L,T,x,M),b.el=it.el}if(ae&&wt(ae,x),!Ct&&(z=ne&&ne.onVnodeMounted)){const it=b;wt(()=>$t(z,pe,it),x)}(b.shapeFlag&256||pe&&qs(pe.vnode)&&pe.vnode.shapeFlag&256)&&T.a&&wt(T.a,x),T.isMounted=!0,b=k=L=null}};T.scope.on();const U=T.effect=new Sd(B);T.scope.off();const F=T.update=U.run.bind(U),Z=T.job=U.runIfDirty.bind(U);Z.i=T,Z.id=T.uid,U.scheduler=()=>ml(Z),_r(T,!0),F()},Te=(T,b,k)=>{b.component=T;const L=T.vnode.props;T.vnode=b,T.next=null,Vy(T,b.props,L,k),xy(T,b.children,k),gn(),ah(T),_n()},_e=(T,b,k,L,x,M,$,B,U=!1)=>{const F=T&&T.children,Z=T?T.shapeFlag:0,z=b.children,{patchFlag:J,shapeFlag:ne}=b;if(J>0){if(J&128){lr(F,z,k,L,x,M,$,B,U);return}else if(J&256){Ot(F,z,k,L,x,M,$,B,U);return}}ne&8?(Z&16&&hr(F,x,M),z!==F&&d(k,z)):Z&16?ne&16?lr(F,z,k,L,x,M,$,B,U):hr(F,x,M,!0):(Z&8&&d(k,""),ne&16&&y(z,k,L,x,M,$,B,U))},Ot=(T,b,k,L,x,M,$,B,U)=>{T=T||Kr,b=b||Kr;const F=T.length,Z=b.length,z=Math.min(F,Z);let J;for(J=0;J<z;J++){const ne=b[J]=U?Nn(b[J]):Wt(b[J]);N(T[J],ne,k,null,x,M,$,B,U)}F>Z?hr(T,x,M,!0,!1,z):y(b,k,L,x,M,$,B,U,z)},lr=(T,b,k,L,x,M,$,B,U)=>{let F=0;const Z=b.length;let z=T.length-1,J=Z-1;for(;F<=z&&F<=J;){const ne=T[F],ee=b[F]=U?Nn(b[F]):Wt(b[F]);if(Os(ne,ee))N(ne,ee,k,null,x,M,$,B,U);else break;F++}for(;F<=z&&F<=J;){const ne=T[z],ee=b[J]=U?Nn(b[J]):Wt(b[J]);if(Os(ne,ee))N(ne,ee,k,null,x,M,$,B,U);else break;z--,J--}if(F>z){if(F<=J){const ne=J+1,ee=ne<Z?b[ne].el:L;for(;F<=J;)N(null,b[F]=U?Nn(b[F]):Wt(b[F]),k,ee,x,M,$,B,U),F++}}else if(F>J)for(;F<=z;)Be(T[F],x,M,!0),F++;else{const ne=F,ee=F,ae=new Map;for(F=ee;F<=J;F++){const Xe=b[F]=U?Nn(b[F]):Wt(b[F]);Xe.key!=null&&ae.set(Xe.key,F)}let pe,Je=0;const Ye=J-ee+1;let Ct=!1,it=0;const Sn=new Array(Ye);for(F=0;F<Ye;F++)Sn[F]=0;for(F=ne;F<=z;F++){const Xe=T[F];if(Je>=Ye){Be(Xe,x,M,!0);continue}let Pt;if(Xe.key!=null)Pt=ae.get(Xe.key);else for(pe=ee;pe<=J;pe++)if(Sn[pe-ee]===0&&Os(Xe,b[pe])){Pt=pe;break}Pt===void 0?Be(Xe,x,M,!0):(Sn[Pt-ee]=F+1,Pt>=it?it=Pt:Ct=!0,N(Xe,b[Pt],k,null,x,M,$,B,U),Je++)}const Es=Ct?Uy(Sn):Kr;for(pe=Es.length-1,F=Ye-1;F>=0;F--){const Xe=ee+F,Pt=b[Xe],xi=b[Xe+1],Nr=Xe+1<Z?xi.el||xi.placeholder:L;Sn[F]===0?N(null,Pt,k,Nr,x,M,$,B,U):Ct&&(pe<0||F!==Es[pe]?rn(Pt,k,Nr,2):pe--)}}},rn=(T,b,k,L,x=null)=>{const{el:M,type:$,transition:B,children:U,shapeFlag:F}=T;if(F&6){rn(T.component.subTree,b,k,L);return}if(F&128){T.suspense.move(b,k,L);return}if(F&64){$.move(T,b,k,jt);return}if($===kt){r(M,b,k);for(let z=0;z<U.length;z++)rn(U[z],b,k,L);r(T.anchor,b,k);return}if($===nc){G(T,b,k);return}if(L!==2&&F&1&&B)if(L===0)B.beforeEnter(M),r(M,b,k),wt(()=>B.enter(M),x);else{const{leave:z,delayLeave:J,afterLeave:ne}=B,ee=()=>{T.ctx.isUnmounted?s(M):r(M,b,k)},ae=()=>{M._isLeaving&&M[cy](!0),z(M,()=>{ee(),ne&&ne()})};J?J(M,ee,ae):ae()}else r(M,b,k)},Be=(T,b,k,L=!1,x=!1)=>{const{type:M,props:$,ref:B,children:U,dynamicChildren:F,shapeFlag:Z,patchFlag:z,dirs:J,cacheIndex:ne}=T;if(z===-2&&(x=!1),B!=null&&(gn(),$s(B,null,k,T,!0),_n()),ne!=null&&(b.renderCache[ne]=void 0),Z&256){b.ctx.deactivate(T);return}const ee=Z&1&&J,ae=!qs(T);let pe;if(ae&&(pe=$&&$.onVnodeBeforeUnmount)&&$t(pe,b,T),Z&6)ur(T.component,k,L);else{if(Z&128){T.suspense.unmount(k,L);return}ee&&gr(T,null,b,"beforeUnmount"),Z&64?T.type.remove(T,b,k,jt,L):F&&!F.hasOnce&&(M!==kt||z>0&&z&64)?hr(F,b,k,!1,!0):(M===kt&&z&384||!x&&Z&16)&&hr(U,b,k),L&&je(T)}(ae&&(pe=$&&$.onVnodeUnmounted)||ee)&&wt(()=>{pe&&$t(pe,b,T),ee&&gr(T,null,b,"unmounted")},k)},je=T=>{const{type:b,el:k,anchor:L,transition:x}=T;if(b===kt){Oa(k,L);return}if(b===nc){K(T);return}const M=()=>{s(k),x&&!x.persisted&&x.afterLeave&&x.afterLeave()};if(T.shapeFlag&1&&x&&!x.persisted){const{leave:$,delayLeave:B}=x,U=()=>$(k,M);B?B(T.el,M,U):U()}else M()},Oa=(T,b)=>{let k;for(;T!==b;)k=g(T),s(T),T=k;s(b)},ur=(T,b,k)=>{const{bum:L,scope:x,job:M,subTree:$,um:B,m:U,a:F}=T;mh(U),mh(F),L&&oo(L),x.stop(),M&&(M.flags|=8,Be($,T,b,k)),B&&wt(B,b),wt(()=>{T.isUnmounted=!0},b)},hr=(T,b,k,L=!1,x=!1,M=0)=>{for(let $=M;$<T.length;$++)Be(T[$],b,k,L,x)},sn=T=>{if(T.shapeFlag&6)return sn(T.component.subTree);if(T.shapeFlag&128)return T.suspense.next();const b=g(T.anchor||T.el),k=b&&b[oy];return k?g(k):b};let ys=!1;const Oi=(T,b,k)=>{T==null?b._vnode&&Be(b._vnode,null,null,!0):N(b._vnode||null,T,b,null,null,null,k),b._vnode=T,ys||(ys=!0,ah(),Hd(),ys=!1)},jt={p:N,um:Be,m:rn,r:je,mt:st,mc:y,pc:_e,pbc:v,n:sn,o:n};return{render:Oi,hydrate:void 0,createApp:Cy(Oi)}}function tc({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function _r({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function Fy(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function cp(n,e,t=!1){const r=n.children,s=e.children;if(oe(r)&&oe(s))for(let i=0;i<r.length;i++){const a=r[i];let c=s[i];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=s[i]=Nn(s[i]),c.el=a.el),!t&&c.patchFlag!==-2&&cp(a,c)),c.type===ca&&c.patchFlag!==-1&&(c.el=a.el),c.type===Jn&&!c.el&&(c.el=a.el)}}function Uy(n){const e=n.slice(),t=[0];let r,s,i,a,c;const l=n.length;for(r=0;r<l;r++){const h=n[r];if(h!==0){if(s=t[t.length-1],n[s]<h){e[r]=s,t.push(r);continue}for(i=0,a=t.length-1;i<a;)c=i+a>>1,n[t[c]]<h?i=c+1:a=c;h<n[t[i]]&&(i>0&&(e[r]=t[i-1]),t[i]=r)}}for(i=t.length,a=t[i-1];i-- >0;)t[i]=a,a=e[a];return t}function lp(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:lp(e)}function mh(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const By=Symbol.for("v-scx"),jy=()=>ao(By);function co(n,e,t){return up(n,e,t)}function up(n,e,t=Re){const{immediate:r,deep:s,flush:i,once:a}=t,c=ft({},t),l=e&&r||!e&&i!=="post";let h;if(si){if(i==="sync"){const I=jy();h=I.__watcherHandles||(I.__watcherHandles=[])}else if(!l){const I=()=>{};return I.stop=Gt,I.resume=Gt,I.pause=Gt,I}}const d=_t;c.call=(I,C,N)=>tn(I,d,C,N);let p=!1;i==="post"?c.scheduler=I=>{wt(I,d&&d.suspense)}:i!=="sync"&&(p=!0,c.scheduler=(I,C)=>{C?I():ml(I)}),c.augmentJob=I=>{e&&(I.flags|=4),p&&(I.flags|=2,d&&(I.id=d.uid,I.i=d))};const g=ey(n,e,c);return si&&(h?h.push(g):l&&g()),g}function $y(n,e,t){const r=this.proxy,s=Ue(n)?n.includes(".")?hp(r,n):()=>r[n]:n.bind(r,r);let i;ce(e)?i=e:(i=e.handler,t=e);const a=gi(this),c=up(s,i.bind(r),t);return a(),c}function hp(n,e){const t=e.split(".");return()=>{let r=n;for(let s=0;s<t.length&&r;s++)r=r[t[s]];return r}}const qy=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Kn(e)}Modifiers`]||n[`${Cr(e)}Modifiers`];function Hy(n,e,...t){if(n.isUnmounted)return;const r=n.vnode.props||Re;let s=t;const i=e.startsWith("update:"),a=i&&qy(r,e.slice(7));a&&(a.trim&&(s=t.map(d=>Ue(d)?d.trim():d)),a.number&&(s=t.map(_c)));let c,l=r[c=Qa(e)]||r[c=Qa(Kn(e))];!l&&i&&(l=r[c=Qa(Cr(e))]),l&&tn(l,n,6,s);const h=r[c+"Once"];if(h){if(!n.emitted)n.emitted={};else if(n.emitted[c])return;n.emitted[c]=!0,tn(h,n,6,s)}}const zy=new WeakMap;function fp(n,e,t=!1){const r=t?zy:e.emitsCache,s=r.get(n);if(s!==void 0)return s;const i=n.emits;let a={},c=!1;if(!ce(n)){const l=h=>{const d=fp(h,e,!0);d&&(c=!0,ft(a,d))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!i&&!c?(ke(n)&&r.set(n,null),null):(oe(i)?i.forEach(l=>a[l]=null):ft(a,i),ke(n)&&r.set(n,a),a)}function aa(n,e){return!n||!Yo(e)?!1:(e=e.slice(2).replace(/Once$/,""),Ee(n,e[0].toLowerCase()+e.slice(1))||Ee(n,Cr(e))||Ee(n,e))}function gh(n){const{type:e,vnode:t,proxy:r,withProxy:s,propsOptions:[i],slots:a,attrs:c,emit:l,render:h,renderCache:d,props:p,data:g,setupState:I,ctx:C,inheritAttrs:N}=n,O=bo(n);let H,W;try{if(t.shapeFlag&4){const K=s||r,de=K;H=Wt(h.call(de,K,d,p,I,g,C)),W=c}else{const K=e;H=Wt(K.length>1?K(p,{attrs:c,slots:a,emit:l}):K(p,null)),W=e.props?c:Wy(c)}}catch(K){zs.length=0,ra(K,n,1),H=Kt(Jn)}let G=H;if(W&&N!==!1){const K=Object.keys(W),{shapeFlag:de}=G;K.length&&de&7&&(i&&K.some(sl)&&(W=Gy(W,i)),G=rs(G,W,!1,!0))}return t.dirs&&(G=rs(G,null,!1,!0),G.dirs=G.dirs?G.dirs.concat(t.dirs):t.dirs),t.transition&&gl(G,t.transition),H=G,bo(O),H}const Wy=n=>{let e;for(const t in n)(t==="class"||t==="style"||Yo(t))&&((e||(e={}))[t]=n[t]);return e},Gy=(n,e)=>{const t={};for(const r in n)(!sl(r)||!(r.slice(9)in e))&&(t[r]=n[r]);return t};function Ky(n,e,t){const{props:r,children:s,component:i}=n,{props:a,children:c,patchFlag:l}=e,h=i.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return r?_h(r,a,h):!!a;if(l&8){const d=e.dynamicProps;for(let p=0;p<d.length;p++){const g=d[p];if(a[g]!==r[g]&&!aa(h,g))return!0}}}else return(s||c)&&(!c||!c.$stable)?!0:r===a?!1:r?a?_h(r,a,h):!0:!!a;return!1}function _h(n,e,t){const r=Object.keys(e);if(r.length!==Object.keys(n).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==n[i]&&!aa(t,i))return!0}return!1}function Qy({vnode:n,parent:e},t){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===n&&(r.el=n.el),r===n)(n=e.vnode).el=t,e=e.parent;else break}}const dp=n=>n.__isSuspense;function Jy(n,e){e&&e.pendingBranch?oe(n)?e.effects.push(...n):e.effects.push(n):sy(n)}const kt=Symbol.for("v-fgt"),ca=Symbol.for("v-txt"),Jn=Symbol.for("v-cmt"),nc=Symbol.for("v-stc"),zs=[];let bt=null;function be(n=!1){zs.push(bt=n?null:[])}function Yy(){zs.pop(),bt=zs[zs.length-1]||null}let ri=1;function yh(n,e=!1){ri+=n,n<0&&bt&&e&&(bt.hasOnce=!0)}function pp(n){return n.dynamicChildren=ri>0?bt||Kr:null,Yy(),ri>0&&bt&&bt.push(n),n}function Ve(n,e,t,r,s,i){return pp(re(n,e,t,r,s,i,!0))}function Co(n,e,t,r,s){return pp(Kt(n,e,t,r,s,!0))}function mp(n){return n?n.__v_isVNode===!0:!1}function Os(n,e){return n.type===e.type&&n.key===e.key}const gp=({key:n})=>n??null,lo=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Ue(n)||ht(n)||ce(n)?{i:Dt,r:n,k:e,f:!!t}:n:null);function re(n,e=null,t=null,r=0,s=null,i=n===kt?0:1,a=!1,c=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&gp(e),ref:e&&lo(e),scopeId:Wd,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Dt};return c?(El(l,t),i&128&&n.normalize(l)):t&&(l.shapeFlag|=Ue(t)?8:16),ri>0&&!a&&bt&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&bt.push(l),l}const Kt=Xy;function Xy(n,e=null,t=null,r=0,s=null,i=!1){if((!n||n===Ey)&&(n=Jn),mp(n)){const c=rs(n,e,!0);return t&&El(c,t),ri>0&&!i&&bt&&(c.shapeFlag&6?bt[bt.indexOf(n)]=c:bt.push(c)),c.patchFlag=-2,c}if(lv(n)&&(n=n.__vccOpts),e){e=Zy(e);let{class:c,style:l}=e;c&&!Ue(c)&&(e.class=ta(c)),ke(l)&&(pl(l)&&!oe(l)&&(l=ft({},l)),e.style=pi(l))}const a=Ue(n)?1:dp(n)?128:ay(n)?64:ke(n)?4:ce(n)?2:0;return re(n,e,t,r,s,a,i,!0)}function Zy(n){return n?pl(n)||np(n)?ft({},n):n:null}function rs(n,e,t=!1,r=!1){const{props:s,ref:i,patchFlag:a,children:c,transition:l}=n,h=e?ev(s||{},e):s,d={__v_isVNode:!0,__v_skip:!0,type:n.type,props:h,key:h&&gp(h),ref:e&&e.ref?t&&i?oe(i)?i.concat(lo(e)):[i,lo(e)]:lo(e):i,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:c,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==kt?a===-1?16:a|16:a,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&rs(n.ssContent),ssFallback:n.ssFallback&&rs(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&r&&gl(d,l.clone(d)),d}function fn(n=" ",e=0){return Kt(ca,null,n,e)}function qt(n="",e=!1){return e?(be(),Co(Jn,null,n)):Kt(Jn,null,n)}function Wt(n){return n==null||typeof n=="boolean"?Kt(Jn):oe(n)?Kt(kt,null,n.slice()):mp(n)?Nn(n):Kt(ca,null,String(n))}function Nn(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:rs(n)}function El(n,e){let t=0;const{shapeFlag:r}=n;if(e==null)e=null;else if(oe(e))t=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),El(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!np(e)?e._ctx=Dt:s===3&&Dt&&(Dt.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else ce(e)?(e={default:e,_ctx:Dt},t=32):(e=String(e),r&64?(t=16,e=[fn(e)]):t=8);n.children=e,n.shapeFlag|=t}function ev(...n){const e={};for(let t=0;t<n.length;t++){const r=n[t];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=ta([e.class,r.class]));else if(s==="style")e.style=pi([e.style,r.style]);else if(Yo(s)){const i=e[s],a=r[s];a&&i!==a&&!(oe(i)&&i.includes(a))&&(e[s]=i?[].concat(i,a):a)}else s!==""&&(e[s]=r[s])}return e}function $t(n,e,t,r=null){tn(n,e,7,[t,r])}const tv=Zd();let nv=0;function rv(n,e,t){const r=n.type,s=(e?e.appContext:n.appContext)||tv,i={uid:nv++,vnode:n,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new R_(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:sp(r,s),emitsOptions:fp(r,s),emit:null,emitted:null,propsDefaults:Re,inheritAttrs:r.inheritAttrs,ctx:Re,data:Re,props:Re,attrs:Re,slots:Re,refs:Re,setupState:Re,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=Hy.bind(null,i),n.ce&&n.ce(i),i}let _t=null;const sv=()=>_t||Dt;let Po,Cc;{const n=ea(),e=(t,r)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(r),i=>{s.length>1?s.forEach(a=>a(i)):s[0](i)}};Po=e("__VUE_INSTANCE_SETTERS__",t=>_t=t),Cc=e("__VUE_SSR_SETTERS__",t=>si=t)}const gi=n=>{const e=_t;return Po(n),n.scope.on(),()=>{n.scope.off(),Po(e)}},vh=()=>{_t&&_t.scope.off(),Po(null)};function _p(n){return n.vnode.shapeFlag&4}let si=!1;function iv(n,e=!1,t=!1){e&&Cc(e);const{props:r,children:s}=n.vnode,i=_p(n);ky(n,r,i,e),Oy(n,s,t||e);const a=i?ov(n,e):void 0;return e&&Cc(!1),a}function ov(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Ty);const{setup:r}=t;if(r){gn();const s=n.setupContext=r.length>1?cv(n):null,i=gi(n),a=mi(r,n,0,[n.props,s]),c=vd(a);if(_n(),i(),(c||n.sp)&&!qs(n)&&Gd(n),c){if(a.then(vh,vh),e)return a.then(l=>{Eh(n,l)}).catch(l=>{ra(l,n,0)});n.asyncDep=a}else Eh(n,a)}else yp(n)}function Eh(n,e,t){ce(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:ke(e)&&(n.setupState=jd(e)),yp(n)}function yp(n,e,t){const r=n.type;n.render||(n.render=r.render||Gt);{const s=gi(n);gn();try{wy(n)}finally{_n(),s()}}}const av={get(n,e){return ut(n,"get",""),n[e]}};function cv(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,av),slots:n.slots,emit:n.emit,expose:e}}function la(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(jd(G_(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Hs)return Hs[t](n)},has(e,t){return t in e||t in Hs}})):n.proxy}function lv(n){return ce(n)&&"__vccOpts"in n}const It=(n,e)=>X_(n,e,si),uv="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Pc;const Th=typeof window<"u"&&window.trustedTypes;if(Th)try{Pc=Th.createPolicy("vue",{createHTML:n=>n})}catch{}const vp=Pc?n=>Pc.createHTML(n):n=>n,hv="http://www.w3.org/2000/svg",fv="http://www.w3.org/1998/Math/MathML",ln=typeof document<"u"?document:null,wh=ln&&ln.createElement("template"),dv={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,r)=>{const s=e==="svg"?ln.createElementNS(hv,n):e==="mathml"?ln.createElementNS(fv,n):t?ln.createElement(n,{is:t}):ln.createElement(n);return n==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:n=>ln.createTextNode(n),createComment:n=>ln.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ln.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,r,s,i){const a=t?t.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===i||!(s=s.nextSibling)););else{wh.innerHTML=vp(r==="svg"?`<svg>${n}</svg>`:r==="mathml"?`<math>${n}</math>`:n);const c=wh.content;if(r==="svg"||r==="mathml"){const l=c.firstChild;for(;l.firstChild;)c.appendChild(l.firstChild);c.removeChild(l)}e.insertBefore(c,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},pv=Symbol("_vtc");function mv(n,e,t){const r=n[pv];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Ih=Symbol("_vod"),gv=Symbol("_vsh"),_v=Symbol(""),yv=/(?:^|;)\s*display\s*:/;function vv(n,e,t){const r=n.style,s=Ue(t);let i=!1;if(t&&!s){if(e)if(Ue(e))for(const a of e.split(";")){const c=a.slice(0,a.indexOf(":")).trim();t[c]==null&&uo(r,c,"")}else for(const a in e)t[a]==null&&uo(r,a,"");for(const a in t)a==="display"&&(i=!0),uo(r,a,t[a])}else if(s){if(e!==t){const a=r[_v];a&&(t+=";"+a),r.cssText=t,i=yv.test(t)}}else e&&n.removeAttribute("style");Ih in n&&(n[Ih]=i?r.display:"",n[gv]&&(r.display="none"))}const Ah=/\s*!important$/;function uo(n,e,t){if(oe(t))t.forEach(r=>uo(n,e,r));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const r=Ev(n,e);Ah.test(t)?n.setProperty(Cr(r),t.replace(Ah,""),"important"):n[r]=t}}const bh=["Webkit","Moz","ms"],rc={};function Ev(n,e){const t=rc[e];if(t)return t;let r=Kn(e);if(r!=="filter"&&r in n)return rc[e]=r;r=wd(r);for(let s=0;s<bh.length;s++){const i=bh[s]+r;if(i in n)return rc[e]=i}return e}const Rh="http://www.w3.org/1999/xlink";function Sh(n,e,t,r,s,i=b_(e)){r&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Rh,e.slice(6,e.length)):n.setAttributeNS(Rh,e,t):t==null||i&&!Ad(t)?n.removeAttribute(e):n.setAttribute(e,i?"":ir(t)?String(t):t)}function Ch(n,e,t,r,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?vp(t):t);return}const i=n.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const c=i==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(c!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let a=!1;if(t===""||t==null){const c=typeof n[e];c==="boolean"?t=Ad(t):t==null&&c==="string"?(t="",a=!0):c==="number"&&(t=0,a=!0)}try{n[e]=t}catch{}a&&n.removeAttribute(s||e)}function Br(n,e,t,r){n.addEventListener(e,t,r)}function Tv(n,e,t,r){n.removeEventListener(e,t,r)}const Ph=Symbol("_vei");function wv(n,e,t,r,s=null){const i=n[Ph]||(n[Ph]={}),a=i[e];if(r&&a)a.value=r;else{const[c,l]=Iv(e);if(r){const h=i[e]=Rv(r,s);Br(n,c,h,l)}else a&&(Tv(n,c,a,l),i[e]=void 0)}}const kh=/(?:Once|Passive|Capture)$/;function Iv(n){let e;if(kh.test(n)){e={};let r;for(;r=n.match(kh);)n=n.slice(0,n.length-r[0].length),e[r[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Cr(n.slice(2)),e]}let sc=0;const Av=Promise.resolve(),bv=()=>sc||(Av.then(()=>sc=0),sc=Date.now());function Rv(n,e){const t=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=t.attached)return;tn(Sv(r,t.value),e,5,[r])};return t.value=n,t.attached=bv(),t}function Sv(n,e){if(oe(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const Vh=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,Cv=(n,e,t,r,s,i)=>{const a=s==="svg";e==="class"?mv(n,r,a):e==="style"?vv(n,t,r):Yo(e)?sl(e)||wv(n,e,t,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Pv(n,e,r,a))?(Ch(n,e,r),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Sh(n,e,r,a,i,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!Ue(r))?Ch(n,Kn(e),r,i,e):(e==="true-value"?n._trueValue=r:e==="false-value"&&(n._falseValue=r),Sh(n,e,r,a))};function Pv(n,e,t,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in n&&Vh(e)&&ce(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Vh(e)&&Ue(t)?!1:e in n}const Dh=n=>{const e=n.props["onUpdate:modelValue"]||!1;return oe(e)?t=>oo(e,t):e};function kv(n){n.target.composing=!0}function Nh(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const ic=Symbol("_assign"),Oh={created(n,{modifiers:{lazy:e,trim:t,number:r}},s){n[ic]=Dh(s);const i=r||s.props&&s.props.type==="number";Br(n,e?"change":"input",a=>{if(a.target.composing)return;let c=n.value;t&&(c=c.trim()),i&&(c=_c(c)),n[ic](c)}),t&&Br(n,"change",()=>{n.value=n.value.trim()}),e||(Br(n,"compositionstart",kv),Br(n,"compositionend",Nh),Br(n,"change",Nh))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:r,trim:s,number:i}},a){if(n[ic]=Dh(a),n.composing)return;const c=(i||n.type==="number")&&!/^0\d/.test(n.value)?_c(n.value):n.value,l=e??"";c!==l&&(document.activeElement===n&&n.type!=="range"&&(r&&e===t||s&&n.value.trim()===l)||(n.value=l))}},Vv=ft({patchProp:Cv},dv);let xh;function Dv(){return xh||(xh=My(Vv))}const Nv=((...n)=>{const e=Dv().createApp(...n),{mount:t}=e;return e.mount=r=>{const s=xv(r);if(!s)return;const i=e._component;!ce(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const a=t(s,!1,Ov(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},e});function Ov(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function xv(n){return Ue(n)?document.querySelector(n):n}const Mv=()=>{};var Mh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ep=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Lv=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Tp={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,l=s+2<n.length,h=l?n[s+2]:0,d=i>>2,p=(i&3)<<4|c>>4;let g=(c&15)<<2|h>>6,I=h&63;l||(I=64,a||(g=64)),r.push(t[d],t[p],t[g],t[I])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ep(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Lv(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new Fv;const g=i<<2|c>>4;if(r.push(g),h!==64){const I=c<<4&240|h>>2;if(r.push(I),p!==64){const C=h<<6&192|p;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Fv extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Uv=function(n){const e=Ep(n);return Tp.encodeByteArray(e,!0)},ko=function(n){return Uv(n).replace(/\./g,"")},wp=function(n){try{return Tp.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bv(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jv=()=>Bv().__FIREBASE_DEFAULTS__,$v=()=>{if(typeof process>"u"||typeof Mh>"u")return;const n=Mh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},qv=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&wp(n[1]);return e&&JSON.parse(e)},ua=()=>{try{return Mv()||jv()||$v()||qv()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Ip=n=>ua()?.emulatorHosts?.[n],Hv=n=>{const e=Ip(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Ap=()=>ua()?.config,bp=n=>ua()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zv{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hs(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Rp(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wv(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ko(JSON.stringify(t)),ko(JSON.stringify(a)),""].join(".")}const Ws={};function Gv(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ws))Ws[e]?n.emulator.push(e):n.prod.push(e);return n}function Kv(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Lh=!1;function Sp(n,e){if(typeof window>"u"||typeof document>"u"||!hs(window.location.host)||Ws[n]===e||Ws[n]||Lh)return;Ws[n]=e;function t(g){return`__firebase__banner__${g}`}const r="__firebase__banner",i=Gv().prod.length>0;function a(){const g=document.getElementById(r);g&&g.remove()}function c(g){g.style.display="flex",g.style.background="#7faaf0",g.style.position="fixed",g.style.bottom="5px",g.style.left="5px",g.style.padding=".5em",g.style.borderRadius="5px",g.style.alignItems="center"}function l(g,I){g.setAttribute("width","24"),g.setAttribute("id",I),g.setAttribute("height","24"),g.setAttribute("viewBox","0 0 24 24"),g.setAttribute("fill","none"),g.style.marginLeft="-6px"}function h(){const g=document.createElement("span");return g.style.cursor="pointer",g.style.marginLeft="16px",g.style.fontSize="24px",g.innerHTML=" &times;",g.onclick=()=>{Lh=!0,a()},g}function d(g,I){g.setAttribute("id",I),g.innerText="Learn more",g.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",g.setAttribute("target","__blank"),g.style.paddingLeft="5px",g.style.textDecoration="underline"}function p(){const g=Kv(r),I=t("text"),C=document.getElementById(I)||document.createElement("span"),N=t("learnmore"),O=document.getElementById(N)||document.createElement("a"),H=t("preprendIcon"),W=document.getElementById(H)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(g.created){const G=g.element;c(G),d(O,N);const K=h();l(W,H),G.append(W,C,O,K),document.body.appendChild(G)}i?(C.innerText="Preview backend disconnected.",W.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(W.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",I)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Qv(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(dt())}function Jv(){const n=ua()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Yv(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Xv(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Zv(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function eE(){const n=dt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function tE(){return!Jv()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function nE(){try{return typeof indexedDB=="object"}catch{return!1}}function rE(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sE="FirebaseError";class bn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=sE,Object.setPrototypeOf(this,bn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,_i.prototype.create)}}class _i{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?iE(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new bn(s,c,r)}}function iE(n,e){return n.replace(oE,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const oE=/\{\$([^}]+)}/g;function aE(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ir(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Fh(i)&&Fh(a)){if(!Ir(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Fh(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function cE(n,e){const t=new lE(n,e);return t.subscribe.bind(t)}class lE{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");uE(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=oc),s.error===void 0&&(s.error=oc),s.complete===void 0&&(s.complete=oc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function uE(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function oc(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(n){return n&&n._delegate?n._delegate:n}class Ar{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hE{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new zv;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(dE(e))try{this.getOrInitializeService({instanceIdentifier:vr})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=vr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=vr){return this.instances.has(e)}getOptions(e=vr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:fE(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=vr){return this.component?this.component.multipleInstances?e:vr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function fE(n){return n===vr?void 0:n}function dE(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new hE(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ue;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ue||(ue={}));const mE={debug:ue.DEBUG,verbose:ue.VERBOSE,info:ue.INFO,warn:ue.WARN,error:ue.ERROR,silent:ue.SILENT},gE=ue.INFO,_E={[ue.DEBUG]:"log",[ue.VERBOSE]:"log",[ue.INFO]:"info",[ue.WARN]:"warn",[ue.ERROR]:"error"},yE=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=_E[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Tl{constructor(e){this.name=e,this._logLevel=gE,this._logHandler=yE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ue))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?mE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ue.DEBUG,...e),this._logHandler(this,ue.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ue.VERBOSE,...e),this._logHandler(this,ue.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ue.INFO,...e),this._logHandler(this,ue.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ue.WARN,...e),this._logHandler(this,ue.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ue.ERROR,...e),this._logHandler(this,ue.ERROR,...e)}}const vE=(n,e)=>e.some(t=>n instanceof t);let Uh,Bh;function EE(){return Uh||(Uh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function TE(){return Bh||(Bh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Cp=new WeakMap,kc=new WeakMap,Pp=new WeakMap,ac=new WeakMap,wl=new WeakMap;function wE(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(jn(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Cp.set(t,n)}).catch(()=>{}),wl.set(e,n),e}function IE(n){if(kc.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});kc.set(n,e)}let Vc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return kc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Pp.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return jn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function AE(n){Vc=n(Vc)}function bE(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(cc(this),e,...t);return Pp.set(r,e.sort?e.sort():[e]),jn(r)}:TE().includes(n)?function(...e){return n.apply(cc(this),e),jn(Cp.get(this))}:function(...e){return jn(n.apply(cc(this),e))}}function RE(n){return typeof n=="function"?bE(n):(n instanceof IDBTransaction&&IE(n),vE(n,EE())?new Proxy(n,Vc):n)}function jn(n){if(n instanceof IDBRequest)return wE(n);if(ac.has(n))return ac.get(n);const e=RE(n);return e!==n&&(ac.set(n,e),wl.set(e,n)),e}const cc=n=>wl.get(n);function SE(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),c=jn(a);return r&&a.addEventListener("upgradeneeded",l=>{r(jn(a.result),l.oldVersion,l.newVersion,jn(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const CE=["get","getKey","getAll","getAllKeys","count"],PE=["put","add","delete","clear"],lc=new Map;function jh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(lc.get(e))return lc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=PE.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||CE.includes(t)))return;const i=async function(a,...c){const l=this.transaction(a,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&l.done]))[0]};return lc.set(e,i),i}AE(n=>({...n,get:(e,t,r)=>jh(e,t)||n.get(e,t,r),has:(e,t)=>!!jh(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(VE(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function VE(n){return n.getComponent()?.type==="VERSION"}const Dc="@firebase/app",$h="0.14.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yn=new Tl("@firebase/app"),DE="@firebase/app-compat",NE="@firebase/analytics-compat",OE="@firebase/analytics",xE="@firebase/app-check-compat",ME="@firebase/app-check",LE="@firebase/auth",FE="@firebase/auth-compat",UE="@firebase/database",BE="@firebase/data-connect",jE="@firebase/database-compat",$E="@firebase/functions",qE="@firebase/functions-compat",HE="@firebase/installations",zE="@firebase/installations-compat",WE="@firebase/messaging",GE="@firebase/messaging-compat",KE="@firebase/performance",QE="@firebase/performance-compat",JE="@firebase/remote-config",YE="@firebase/remote-config-compat",XE="@firebase/storage",ZE="@firebase/storage-compat",eT="@firebase/firestore",tT="@firebase/ai",nT="@firebase/firestore-compat",rT="firebase",sT="12.2.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nc="[DEFAULT]",iT={[Dc]:"fire-core",[DE]:"fire-core-compat",[OE]:"fire-analytics",[NE]:"fire-analytics-compat",[ME]:"fire-app-check",[xE]:"fire-app-check-compat",[LE]:"fire-auth",[FE]:"fire-auth-compat",[UE]:"fire-rtdb",[BE]:"fire-data-connect",[jE]:"fire-rtdb-compat",[$E]:"fire-fn",[qE]:"fire-fn-compat",[HE]:"fire-iid",[zE]:"fire-iid-compat",[WE]:"fire-fcm",[GE]:"fire-fcm-compat",[KE]:"fire-perf",[QE]:"fire-perf-compat",[JE]:"fire-rc",[YE]:"fire-rc-compat",[XE]:"fire-gcs",[ZE]:"fire-gcs-compat",[eT]:"fire-fst",[nT]:"fire-fst-compat",[tT]:"fire-vertex","fire-js":"fire-js",[rT]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo=new Map,oT=new Map,Oc=new Map;function qh(n,e){try{n.container.addComponent(e)}catch(t){yn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ss(n){const e=n.name;if(Oc.has(e))return yn.debug(`There were multiple attempts to register component ${e}.`),!1;Oc.set(e,n);for(const t of Vo.values())qh(t,n);for(const t of oT.values())qh(t,n);return!0}function Il(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Mt(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aT={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},$n=new _i("app","Firebase",aT);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cT{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ar("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw $n.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fs=sT;function kp(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Nc,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw $n.create("bad-app-name",{appName:String(s)});if(t||(t=Ap()),!t)throw $n.create("no-options");const i=Vo.get(s);if(i){if(Ir(t,i.options)&&Ir(r,i.config))return i;throw $n.create("duplicate-app",{appName:s})}const a=new pE(s);for(const l of Oc.values())a.addComponent(l);const c=new cT(t,r,a);return Vo.set(s,c),c}function Vp(n=Nc){const e=Vo.get(n);if(!e&&n===Nc&&Ap())return kp();if(!e)throw $n.create("no-app",{appName:n});return e}function qn(n,e,t){let r=iT[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),yn.warn(a.join(" "));return}ss(new Ar(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lT="firebase-heartbeat-database",uT=1,ii="firebase-heartbeat-store";let uc=null;function Dp(){return uc||(uc=SE(lT,uT,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ii)}catch(t){console.warn(t)}}}}).catch(n=>{throw $n.create("idb-open",{originalErrorMessage:n.message})})),uc}async function hT(n){try{const t=(await Dp()).transaction(ii),r=await t.objectStore(ii).get(Np(n));return await t.done,r}catch(e){if(e instanceof bn)yn.warn(e.message);else{const t=$n.create("idb-get",{originalErrorMessage:e?.message});yn.warn(t.message)}}}async function Hh(n,e){try{const r=(await Dp()).transaction(ii,"readwrite");await r.objectStore(ii).put(e,Np(n)),await r.done}catch(t){if(t instanceof bn)yn.warn(t.message);else{const r=$n.create("idb-set",{originalErrorMessage:t?.message});yn.warn(r.message)}}}function Np(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fT=1024,dT=30;class pT{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new gT(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=zh();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>dT){const s=_T(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){yn.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=zh(),{heartbeatsToSend:t,unsentEntries:r}=mT(this._heartbeatsCache.heartbeats),s=ko(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return yn.warn(e),""}}}function zh(){return new Date().toISOString().substring(0,10)}function mT(n,e=fT){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Wh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Wh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class gT{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return nE()?rE().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await hT(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Hh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Hh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Wh(n){return ko(JSON.stringify({version:2,heartbeats:n})).length}function _T(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yT(n){ss(new Ar("platform-logger",e=>new kE(e),"PRIVATE")),ss(new Ar("heartbeat",e=>new pT(e),"PRIVATE")),qn(Dc,$h,n),qn(Dc,$h,"esm2020"),qn("fire-js","")}yT("");var vT="firebase",ET="12.2.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */qn(vT,ET,"app");function Op(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const TT=Op,xp=new _i("auth","Firebase",Op());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Do=new Tl("@firebase/auth");function wT(n,...e){Do.logLevel<=ue.WARN&&Do.warn(`Auth (${fs}): ${n}`,...e)}function ho(n,...e){Do.logLevel<=ue.ERROR&&Do.error(`Auth (${fs}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vn(n,...e){throw Al(n,...e)}function Qt(n,...e){return Al(n,...e)}function Mp(n,e,t){const r={...TT(),[e]:t};return new _i("auth","Firebase",r).create(e,{appName:n.name})}function Hn(n){return Mp(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Al(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return xp.create(n,...e)}function se(n,e,...t){if(!n)throw Al(e,...t)}function dn(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ho(e),new Error(e)}function En(n,e){n||dn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xc(){return typeof self<"u"&&self.location?.href||""}function IT(){return Gh()==="http:"||Gh()==="https:"}function Gh(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AT(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(IT()||Xv()||"connection"in navigator)?navigator.onLine:!0}function bT(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(e,t){this.shortDelay=e,this.longDelay=t,En(t>e,"Short delay should be less than long delay!"),this.isMobile=Qv()||Zv()}get(){return AT()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bl(n,e){En(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;dn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;dn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;dn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RT={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ST=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],CT=new vi(3e4,6e4);function ha(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function ds(n,e,t,r,s={}){return Fp(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=yi({key:n.config.apiKey,...a}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const h={method:e,headers:l,...i};return Yv()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&hs(n.emulatorConfig.host)&&(h.credentials="include"),Lp.fetch()(await Bp(n,n.config.apiHost,t,c),h)})}async function Fp(n,e,t){n._canInitEmulator=!1;const r={...RT,...e};try{const s=new PT(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw eo(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw eo(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw eo(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw eo(n,"user-disabled",a);const d=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Mp(n,d,h);vn(n,d)}}catch(s){if(s instanceof bn)throw s;vn(n,"network-request-failed",{message:String(s)})}}async function Up(n,e,t,r,s={}){const i=await ds(n,e,t,r,s);return"mfaPendingCredential"in i&&vn(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Bp(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?bl(n.config,s):`${n.config.apiScheme}://${s}`;return ST.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class PT{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Qt(this.auth,"network-request-failed")),CT.get())})}}function eo(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Qt(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kT(n,e){return ds(n,"POST","/v1/accounts:delete",e)}async function No(n,e){return ds(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gs(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function VT(n,e=!1){const t=Ke(n),r=await t.getIdToken(e),s=Rl(r);se(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:Gs(hc(s.auth_time)),issuedAtTime:Gs(hc(s.iat)),expirationTime:Gs(hc(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function hc(n){return Number(n)*1e3}function Rl(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return ho("JWT malformed, contained fewer than 3 sections"),null;try{const s=wp(t);return s?JSON.parse(s):(ho("Failed to decode base64 JWT payload"),null)}catch(s){return ho("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Kh(n){const e=Rl(n);return se(e,"internal-error"),se(typeof e.exp<"u","internal-error"),se(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oi(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof bn&&DT(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function DT({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NT{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Gs(this.lastLoginAt),this.creationTime=Gs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Oo(n){const e=n.auth,t=await n.getIdToken(),r=await oi(n,No(e,{idToken:t}));se(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?jp(s.providerUserInfo):[],a=xT(n.providerData,i),c=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!a?.length,h=c?l:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Mc(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,d)}async function OT(n){const e=Ke(n);await Oo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function xT(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function jp(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function MT(n,e){const t=await Fp(n,{},async()=>{const r=yi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Bp(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return n.emulatorConfig&&hs(n.emulatorConfig.host)&&(l.credentials="include"),Lp.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function LT(n,e){return ds(n,"POST","/v2/accounts:revokeToken",ha(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){se(e.idToken,"internal-error"),se(typeof e.idToken<"u","internal-error"),se(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Kh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){se(e.length!==0,"internal-error");const t=Kh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(se(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await MT(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Zr;return r&&(se(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(se(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(se(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Zr,this.toJSON())}_performRefresh(){return dn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vn(n,e){se(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Lt{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new NT(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Mc(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await oi(this,this.stsTokenManager.getToken(this.auth,e));return se(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return VT(this,e)}reload(){return OT(this)}_assign(e){this!==e&&(se(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Lt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){se(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Oo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Mt(this.auth.app))return Promise.reject(Hn(this.auth));const e=await this.getIdToken();return await oi(this,kT(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,l=t._redirectEventId??void 0,h=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:p,emailVerified:g,isAnonymous:I,providerData:C,stsTokenManager:N}=t;se(p&&N,e,"internal-error");const O=Zr.fromJSON(this.name,N);se(typeof p=="string",e,"internal-error"),Vn(r,e.name),Vn(s,e.name),se(typeof g=="boolean",e,"internal-error"),se(typeof I=="boolean",e,"internal-error"),Vn(i,e.name),Vn(a,e.name),Vn(c,e.name),Vn(l,e.name),Vn(h,e.name),Vn(d,e.name);const H=new Lt({uid:p,auth:e,email:s,emailVerified:g,displayName:r,isAnonymous:I,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:O,createdAt:h,lastLoginAt:d});return C&&Array.isArray(C)&&(H.providerData=C.map(W=>({...W}))),l&&(H._redirectEventId=l),H}static async _fromIdTokenResponse(e,t,r=!1){const s=new Zr;s.updateFromServerResponse(t);const i=new Lt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Oo(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];se(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?jp(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,c=new Zr;c.updateFromIdToken(r);const l=new Lt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Mc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(l,h),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qh=new Map;function pn(n){En(n instanceof Function,"Expected a class definition");let e=Qh.get(n);return e?(En(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Qh.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $p{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}$p.type="NONE";const Jh=$p;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fo(n,e,t){return`firebase:${n}:${e}:${t}`}class es{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=fo(this.userKey,s.apiKey,i),this.fullPersistenceKey=fo("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await No(this.auth,{idToken:e}).catch(()=>{});return t?Lt._fromGetAccountInfoResponse(this.auth,t,e):null}return Lt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new es(pn(Jh),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||pn(Jh);const a=fo(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const d=await h._get(a);if(d){let p;if(typeof d=="string"){const g=await No(e,{idToken:d}).catch(()=>{});if(!g)break;p=await Lt._fromGetAccountInfoResponse(e,g,d)}else p=Lt._fromJSON(e,d);h!==i&&(c=p),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new es(i,e,r):(i=l[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new es(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Wp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(qp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Kp(e))return"Blackberry";if(Qp(e))return"Webos";if(Hp(e))return"Safari";if((e.includes("chrome/")||zp(e))&&!e.includes("edge/"))return"Chrome";if(Gp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function qp(n=dt()){return/firefox\//i.test(n)}function Hp(n=dt()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function zp(n=dt()){return/crios\//i.test(n)}function Wp(n=dt()){return/iemobile/i.test(n)}function Gp(n=dt()){return/android/i.test(n)}function Kp(n=dt()){return/blackberry/i.test(n)}function Qp(n=dt()){return/webos/i.test(n)}function Sl(n=dt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function FT(n=dt()){return Sl(n)&&!!window.navigator?.standalone}function UT(){return eE()&&document.documentMode===10}function Jp(n=dt()){return Sl(n)||Gp(n)||Qp(n)||Kp(n)||/windows phone/i.test(n)||Wp(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yp(n,e=[]){let t;switch(n){case"Browser":t=Yh(dt());break;case"Worker":t=`${Yh(dt())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${fs}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BT{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const l=e(i);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jT(n,e={}){return ds(n,"GET","/v2/passwordPolicy",ha(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $T=6;class qT{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??$T,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HT{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Xh(this),this.idTokenSubscription=new Xh(this),this.beforeStateQueue=new BT(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=xp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=pn(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await es.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await No(this,{idToken:e}),r=await Lt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Mt(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,a=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===a)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return se(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Oo(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=bT()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Mt(this.app))return Promise.reject(Hn(this));const t=e?Ke(e):null;return t&&se(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&se(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Mt(this.app)?Promise.reject(Hn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Mt(this.app)?Promise.reject(Hn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(pn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await jT(this),t=new qT(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new _i("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await LT(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&pn(e)||this._popupRedirectResolver;se(t,this,"argument-error"),this.redirectPersistenceManager=await es.create(this,[pn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(se(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return se(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Yp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Mt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&wT(`Error while retrieving App Check token: ${e.error}`),e?.token}}function fa(n){return Ke(n)}class Xh{constructor(e){this.auth=e,this.observer=null,this.addObserver=cE(t=>this.observer=t)}get next(){return se(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function zT(n){Cl=n}function WT(n){return Cl.loadJS(n)}function GT(){return Cl.gapiScript}function KT(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QT(n,e){const t=Il(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Ir(i,e??{}))return s;vn(s,"already-initialized")}return t.initialize({options:e})}function JT(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(pn);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function YT(n,e,t){const r=fa(n);se(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Xp(e),{host:a,port:c}=XT(e),l=c===null?"":`:${c}`,h={url:`${i}//${a}${l}/`},d=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){se(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),se(Ir(h,r.config.emulator)&&Ir(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,hs(a)?(Rp(`${i}//${a}${l}`),Sp("Auth",!0)):ZT()}function Xp(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function XT(n){const e=Xp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Zh(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Zh(a)}}}function Zh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function ZT(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return dn("not implemented")}_getIdTokenResponse(e){return dn("not implemented")}_linkToIdToken(e,t){return dn("not implemented")}_getReauthenticationResolver(e){return dn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ts(n,e){return Up(n,"POST","/v1/accounts:signInWithIdp",ha(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ew="http://localhost";class br extends Zp{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new br(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):vn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new br(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return ts(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,ts(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ts(e,t)}buildRequest(){const e={requestUri:ew,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=yi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei extends em{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On extends Ei{constructor(){super("facebook.com")}static credential(e){return br._fromParams({providerId:On.PROVIDER_ID,signInMethod:On.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return On.credentialFromTaggedObject(e)}static credentialFromError(e){return On.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return On.credential(e.oauthAccessToken)}catch{return null}}}On.FACEBOOK_SIGN_IN_METHOD="facebook.com";On.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn extends Ei{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return br._fromParams({providerId:xn.PROVIDER_ID,signInMethod:xn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return xn.credentialFromTaggedObject(e)}static credentialFromError(e){return xn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return xn.credential(t,r)}catch{return null}}}xn.GOOGLE_SIGN_IN_METHOD="google.com";xn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn extends Ei{constructor(){super("github.com")}static credential(e){return br._fromParams({providerId:Mn.PROVIDER_ID,signInMethod:Mn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Mn.credentialFromTaggedObject(e)}static credentialFromError(e){return Mn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Mn.credential(e.oauthAccessToken)}catch{return null}}}Mn.GITHUB_SIGN_IN_METHOD="github.com";Mn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln extends Ei{constructor(){super("twitter.com")}static credential(e,t){return br._fromParams({providerId:Ln.PROVIDER_ID,signInMethod:Ln.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ln.credentialFromTaggedObject(e)}static credentialFromError(e){return Ln.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Ln.credential(t,r)}catch{return null}}}Ln.TWITTER_SIGN_IN_METHOD="twitter.com";Ln.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tw(n,e){return Up(n,"POST","/v1/accounts:signUp",ha(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Lt._fromIdTokenResponse(e,r,s),a=ef(r);return new Yn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=ef(r);return new Yn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function ef(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nw(n){if(Mt(n.app))return Promise.reject(Hn(n));const e=fa(n);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new Yn({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await tw(e,{returnSecureToken:!0}),r=await Yn._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(r.user),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo extends bn{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,xo.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new xo(e,t,r,s)}}function tm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?xo._fromErrorAndOperation(n,i,e,r):i})}async function rw(n,e,t=!1){const r=await oi(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Yn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sw(n,e,t=!1){const{auth:r}=n;if(Mt(r.app))return Promise.reject(Hn(r));const s="reauthenticate";try{const i=await oi(n,tm(r,s,e,n),t);se(i.idToken,r,"internal-error");const a=Rl(i.idToken);se(a,r,"internal-error");const{sub:c}=a;return se(n.uid===c,r,"user-mismatch"),Yn._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&vn(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iw(n,e,t=!1){if(Mt(n.app))return Promise.reject(Hn(n));const r="signIn",s=await tm(n,r,e),i=await Yn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function ow(n,e,t,r){return Ke(n).onIdTokenChanged(e,t,r)}function aw(n,e,t){return Ke(n).beforeAuthStateChanged(e,t)}const Mo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Mo,"1"),this.storage.removeItem(Mo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cw=1e3,lw=10;class rm extends nm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Jp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);UT()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,lw):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},cw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}rm.type="LOCAL";const uw=rm;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sm extends nm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}sm.type="SESSION";const im=sm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new da(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async h=>h(t.origin,i)),l=await hw(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}da.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,l)=>{const h=Pl("",20);s.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(d),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jt(){return window}function dw(n){Jt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function om(){return typeof Jt().WorkerGlobalScope<"u"&&typeof Jt().importScripts=="function"}async function pw(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function mw(){return navigator?.serviceWorker?.controller||null}function gw(){return om()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const am="firebaseLocalStorageDb",_w=1,Lo="firebaseLocalStorage",cm="fbase_key";class Ti{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function pa(n,e){return n.transaction([Lo],e?"readwrite":"readonly").objectStore(Lo)}function yw(){const n=indexedDB.deleteDatabase(am);return new Ti(n).toPromise()}function Lc(){const n=indexedDB.open(am,_w);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Lo,{keyPath:cm})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Lo)?e(r):(r.close(),await yw(),e(await Lc()))})})}async function tf(n,e,t){const r=pa(n,!0).put({[cm]:e,value:t});return new Ti(r).toPromise()}async function vw(n,e){const t=pa(n,!1).get(e),r=await new Ti(t).toPromise();return r===void 0?null:r.value}function nf(n,e){const t=pa(n,!0).delete(e);return new Ti(t).toPromise()}const Ew=800,Tw=3;class lm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Lc(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Tw)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return om()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=da._getInstance(gw()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await pw(),!this.activeServiceWorker)return;this.sender=new fw(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||mw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Lc();return await tf(e,Mo,"1"),await nf(e,Mo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>tf(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>vw(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>nf(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=pa(s,!1).getAll();return new Ti(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Ew)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}lm.type="LOCAL";const ww=lm;new vi(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iw(n,e){return e?pn(e):(se(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kl extends Zp{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ts(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ts(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ts(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Aw(n){return iw(n.auth,new kl(n),n.bypassAuthState)}function bw(n){const{auth:e,user:t}=n;return se(t,e,"internal-error"),sw(t,new kl(n),n.bypassAuthState)}async function Rw(n){const{auth:e,user:t}=n;return se(t,e,"internal-error"),rw(t,new kl(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class um{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Aw;case"linkViaPopup":case"linkViaRedirect":return Rw;case"reauthViaPopup":case"reauthViaRedirect":return bw;default:vn(this.auth,"internal-error")}}resolve(e){En(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){En(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sw=new vi(2e3,1e4);class zr extends um{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,zr.currentPopupAction&&zr.currentPopupAction.cancel(),zr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return se(e,this.auth,"internal-error"),e}async onExecution(){En(this.filter.length===1,"Popup operations only handle one event");const e=Pl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Qt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Qt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,zr.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Qt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Sw.get())};e()}}zr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cw="pendingRedirect",po=new Map;class Pw extends um{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=po.get(this.auth._key());if(!e){try{const r=await kw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}po.set(this.auth._key(),e)}return this.bypassAuthState||po.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function kw(n,e){const t=Nw(e),r=Dw(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Vw(n,e){po.set(n._key(),e)}function Dw(n){return pn(n._redirectPersistence)}function Nw(n){return fo(Cw,n.config.apiKey,n.name)}async function Ow(n,e,t=!1){if(Mt(n.app))return Promise.reject(Hn(n));const r=fa(n),s=Iw(r,e),a=await new Pw(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xw=600*1e3;class Mw{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Lw(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!hm(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(Qt(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=xw&&this.cachedEventUids.clear(),this.cachedEventUids.has(rf(e))}saveEventToCache(e){this.cachedEventUids.add(rf(e)),this.lastProcessedEventTime=Date.now()}}function rf(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function hm({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Lw(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return hm(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fw(n,e={}){return ds(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Bw=/^https?/;async function jw(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Fw(n);for(const t of e)try{if($w(t))return}catch{}vn(n,"unauthorized-domain")}function $w(n){const e=xc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Bw.test(t))return!1;if(Uw.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qw=new vi(3e4,6e4);function sf(){const n=Jt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Hw(n){return new Promise((e,t)=>{function r(){sf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{sf(),t(Qt(n,"network-request-failed"))},timeout:qw.get()})}if(Jt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Jt().gapi?.load)r();else{const s=KT("iframefcb");return Jt()[s]=()=>{gapi.load?r():t(Qt(n,"network-request-failed"))},WT(`${GT()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw mo=null,e})}let mo=null;function zw(n){return mo=mo||Hw(n),mo}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ww=new vi(5e3,15e3),Gw="__/auth/iframe",Kw="emulator/auth/iframe",Qw={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Jw=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Yw(n){const e=n.config;se(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?bl(e,Kw):`https://${n.config.authDomain}/${Gw}`,r={apiKey:e.apiKey,appName:n.name,v:fs},s=Jw.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${yi(r).slice(1)}`}async function Xw(n){const e=await zw(n),t=Jt().gapi;return se(t,n,"internal-error"),e.open({where:document.body,url:Yw(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Qw,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Qt(n,"network-request-failed"),c=Jt().setTimeout(()=>{i(a)},Ww.get());function l(){Jt().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},eI=500,tI=600,nI="_blank",rI="http://localhost";class of{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function sI(n,e,t,r=eI,s=tI){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l={...Zw,width:r.toString(),height:s.toString(),top:i,left:a},h=dt().toLowerCase();t&&(c=zp(h)?nI:t),qp(h)&&(e=e||rI,l.scrollbars="yes");const d=Object.entries(l).reduce((g,[I,C])=>`${g}${I}=${C},`,"");if(FT(h)&&c!=="_self")return iI(e||"",c),new of(null);const p=window.open(e||"",c,d);se(p,n,"popup-blocked");try{p.focus()}catch{}return new of(p)}function iI(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oI="__/auth/handler",aI="emulator/auth/handler",cI=encodeURIComponent("fac");async function af(n,e,t,r,s,i){se(n.config.authDomain,n,"auth-domain-config-required"),se(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:fs,eventId:s};if(e instanceof em){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",aE(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries({}))a[d]=p}if(e instanceof Ei){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(a.scopes=d.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const l=await n._getAppCheckToken(),h=l?`#${cI}=${encodeURIComponent(l)}`:"";return`${lI(n)}?${yi(c).slice(1)}${h}`}function lI({config:n}){return n.emulator?bl(n,aI):`https://${n.authDomain}/${oI}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fc="webStorageSupport";class uI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=im,this._completeRedirectFn=Ow,this._overrideRedirectResult=Vw}async _openPopup(e,t,r,s){En(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await af(e,t,r,xc(),s);return sI(e,i,Pl())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await af(e,t,r,xc(),s);return dw(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(En(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Xw(e),r=new Mw(e);return t.register("authEvent",s=>(se(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(fc,{type:fc},s=>{const i=s?.[0]?.[fc];i!==void 0&&t(!!i),vn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=jw(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Jp()||Hp()||Sl()}}const hI=uI;var cf="@firebase/auth",lf="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){se(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dI(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function pI(n){ss(new Ar("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;se(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Yp(n)},h=new HT(r,s,i,l);return JT(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),ss(new Ar("auth-internal",e=>{const t=fa(e.getProvider("auth").getImmediate());return(r=>new fI(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),qn(cf,lf,dI(n)),qn(cf,lf,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mI=300,gI=bp("authIdTokenMaxAge")||mI;let uf=null;const _I=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>gI)return;const s=t?.token;uf!==s&&(uf=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function yI(n=Vp()){const e=Il(n,"auth");if(e.isInitialized())return e.getImmediate();const t=QT(n,{popupRedirectResolver:hI,persistence:[ww,uw,im]}),r=bp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=_I(i.toString());aw(t,a,()=>a(t.currentUser)),ow(t,c=>a(c))}}const s=Ip("auth");return s&&YT(t,`http://${s}`),t}function vI(){return document.getElementsByTagName("head")?.[0]??document}zT({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Qt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",vI().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});pI("Browser");var hf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var zn,fm;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(A,y){function _(){}_.prototype=y.prototype,A.D=y.prototype,A.prototype=new _,A.prototype.constructor=A,A.C=function(v,w,R){for(var E=Array(arguments.length-2),st=2;st<arguments.length;st++)E[st-2]=arguments[st];return y.prototype[w].apply(v,E)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(A,y,_){_||(_=0);var v=Array(16);if(typeof y=="string")for(var w=0;16>w;++w)v[w]=y.charCodeAt(_++)|y.charCodeAt(_++)<<8|y.charCodeAt(_++)<<16|y.charCodeAt(_++)<<24;else for(w=0;16>w;++w)v[w]=y[_++]|y[_++]<<8|y[_++]<<16|y[_++]<<24;y=A.g[0],_=A.g[1],w=A.g[2];var R=A.g[3],E=y+(R^_&(w^R))+v[0]+3614090360&4294967295;y=_+(E<<7&4294967295|E>>>25),E=R+(w^y&(_^w))+v[1]+3905402710&4294967295,R=y+(E<<12&4294967295|E>>>20),E=w+(_^R&(y^_))+v[2]+606105819&4294967295,w=R+(E<<17&4294967295|E>>>15),E=_+(y^w&(R^y))+v[3]+3250441966&4294967295,_=w+(E<<22&4294967295|E>>>10),E=y+(R^_&(w^R))+v[4]+4118548399&4294967295,y=_+(E<<7&4294967295|E>>>25),E=R+(w^y&(_^w))+v[5]+1200080426&4294967295,R=y+(E<<12&4294967295|E>>>20),E=w+(_^R&(y^_))+v[6]+2821735955&4294967295,w=R+(E<<17&4294967295|E>>>15),E=_+(y^w&(R^y))+v[7]+4249261313&4294967295,_=w+(E<<22&4294967295|E>>>10),E=y+(R^_&(w^R))+v[8]+1770035416&4294967295,y=_+(E<<7&4294967295|E>>>25),E=R+(w^y&(_^w))+v[9]+2336552879&4294967295,R=y+(E<<12&4294967295|E>>>20),E=w+(_^R&(y^_))+v[10]+4294925233&4294967295,w=R+(E<<17&4294967295|E>>>15),E=_+(y^w&(R^y))+v[11]+2304563134&4294967295,_=w+(E<<22&4294967295|E>>>10),E=y+(R^_&(w^R))+v[12]+1804603682&4294967295,y=_+(E<<7&4294967295|E>>>25),E=R+(w^y&(_^w))+v[13]+4254626195&4294967295,R=y+(E<<12&4294967295|E>>>20),E=w+(_^R&(y^_))+v[14]+2792965006&4294967295,w=R+(E<<17&4294967295|E>>>15),E=_+(y^w&(R^y))+v[15]+1236535329&4294967295,_=w+(E<<22&4294967295|E>>>10),E=y+(w^R&(_^w))+v[1]+4129170786&4294967295,y=_+(E<<5&4294967295|E>>>27),E=R+(_^w&(y^_))+v[6]+3225465664&4294967295,R=y+(E<<9&4294967295|E>>>23),E=w+(y^_&(R^y))+v[11]+643717713&4294967295,w=R+(E<<14&4294967295|E>>>18),E=_+(R^y&(w^R))+v[0]+3921069994&4294967295,_=w+(E<<20&4294967295|E>>>12),E=y+(w^R&(_^w))+v[5]+3593408605&4294967295,y=_+(E<<5&4294967295|E>>>27),E=R+(_^w&(y^_))+v[10]+38016083&4294967295,R=y+(E<<9&4294967295|E>>>23),E=w+(y^_&(R^y))+v[15]+3634488961&4294967295,w=R+(E<<14&4294967295|E>>>18),E=_+(R^y&(w^R))+v[4]+3889429448&4294967295,_=w+(E<<20&4294967295|E>>>12),E=y+(w^R&(_^w))+v[9]+568446438&4294967295,y=_+(E<<5&4294967295|E>>>27),E=R+(_^w&(y^_))+v[14]+3275163606&4294967295,R=y+(E<<9&4294967295|E>>>23),E=w+(y^_&(R^y))+v[3]+4107603335&4294967295,w=R+(E<<14&4294967295|E>>>18),E=_+(R^y&(w^R))+v[8]+1163531501&4294967295,_=w+(E<<20&4294967295|E>>>12),E=y+(w^R&(_^w))+v[13]+2850285829&4294967295,y=_+(E<<5&4294967295|E>>>27),E=R+(_^w&(y^_))+v[2]+4243563512&4294967295,R=y+(E<<9&4294967295|E>>>23),E=w+(y^_&(R^y))+v[7]+1735328473&4294967295,w=R+(E<<14&4294967295|E>>>18),E=_+(R^y&(w^R))+v[12]+2368359562&4294967295,_=w+(E<<20&4294967295|E>>>12),E=y+(_^w^R)+v[5]+4294588738&4294967295,y=_+(E<<4&4294967295|E>>>28),E=R+(y^_^w)+v[8]+2272392833&4294967295,R=y+(E<<11&4294967295|E>>>21),E=w+(R^y^_)+v[11]+1839030562&4294967295,w=R+(E<<16&4294967295|E>>>16),E=_+(w^R^y)+v[14]+4259657740&4294967295,_=w+(E<<23&4294967295|E>>>9),E=y+(_^w^R)+v[1]+2763975236&4294967295,y=_+(E<<4&4294967295|E>>>28),E=R+(y^_^w)+v[4]+1272893353&4294967295,R=y+(E<<11&4294967295|E>>>21),E=w+(R^y^_)+v[7]+4139469664&4294967295,w=R+(E<<16&4294967295|E>>>16),E=_+(w^R^y)+v[10]+3200236656&4294967295,_=w+(E<<23&4294967295|E>>>9),E=y+(_^w^R)+v[13]+681279174&4294967295,y=_+(E<<4&4294967295|E>>>28),E=R+(y^_^w)+v[0]+3936430074&4294967295,R=y+(E<<11&4294967295|E>>>21),E=w+(R^y^_)+v[3]+3572445317&4294967295,w=R+(E<<16&4294967295|E>>>16),E=_+(w^R^y)+v[6]+76029189&4294967295,_=w+(E<<23&4294967295|E>>>9),E=y+(_^w^R)+v[9]+3654602809&4294967295,y=_+(E<<4&4294967295|E>>>28),E=R+(y^_^w)+v[12]+3873151461&4294967295,R=y+(E<<11&4294967295|E>>>21),E=w+(R^y^_)+v[15]+530742520&4294967295,w=R+(E<<16&4294967295|E>>>16),E=_+(w^R^y)+v[2]+3299628645&4294967295,_=w+(E<<23&4294967295|E>>>9),E=y+(w^(_|~R))+v[0]+4096336452&4294967295,y=_+(E<<6&4294967295|E>>>26),E=R+(_^(y|~w))+v[7]+1126891415&4294967295,R=y+(E<<10&4294967295|E>>>22),E=w+(y^(R|~_))+v[14]+2878612391&4294967295,w=R+(E<<15&4294967295|E>>>17),E=_+(R^(w|~y))+v[5]+4237533241&4294967295,_=w+(E<<21&4294967295|E>>>11),E=y+(w^(_|~R))+v[12]+1700485571&4294967295,y=_+(E<<6&4294967295|E>>>26),E=R+(_^(y|~w))+v[3]+2399980690&4294967295,R=y+(E<<10&4294967295|E>>>22),E=w+(y^(R|~_))+v[10]+4293915773&4294967295,w=R+(E<<15&4294967295|E>>>17),E=_+(R^(w|~y))+v[1]+2240044497&4294967295,_=w+(E<<21&4294967295|E>>>11),E=y+(w^(_|~R))+v[8]+1873313359&4294967295,y=_+(E<<6&4294967295|E>>>26),E=R+(_^(y|~w))+v[15]+4264355552&4294967295,R=y+(E<<10&4294967295|E>>>22),E=w+(y^(R|~_))+v[6]+2734768916&4294967295,w=R+(E<<15&4294967295|E>>>17),E=_+(R^(w|~y))+v[13]+1309151649&4294967295,_=w+(E<<21&4294967295|E>>>11),E=y+(w^(_|~R))+v[4]+4149444226&4294967295,y=_+(E<<6&4294967295|E>>>26),E=R+(_^(y|~w))+v[11]+3174756917&4294967295,R=y+(E<<10&4294967295|E>>>22),E=w+(y^(R|~_))+v[2]+718787259&4294967295,w=R+(E<<15&4294967295|E>>>17),E=_+(R^(w|~y))+v[9]+3951481745&4294967295,A.g[0]=A.g[0]+y&4294967295,A.g[1]=A.g[1]+(w+(E<<21&4294967295|E>>>11))&4294967295,A.g[2]=A.g[2]+w&4294967295,A.g[3]=A.g[3]+R&4294967295}r.prototype.u=function(A,y){y===void 0&&(y=A.length);for(var _=y-this.blockSize,v=this.B,w=this.h,R=0;R<y;){if(w==0)for(;R<=_;)s(this,A,R),R+=this.blockSize;if(typeof A=="string"){for(;R<y;)if(v[w++]=A.charCodeAt(R++),w==this.blockSize){s(this,v),w=0;break}}else for(;R<y;)if(v[w++]=A[R++],w==this.blockSize){s(this,v),w=0;break}}this.h=w,this.o+=y},r.prototype.v=function(){var A=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);A[0]=128;for(var y=1;y<A.length-8;++y)A[y]=0;var _=8*this.o;for(y=A.length-8;y<A.length;++y)A[y]=_&255,_/=256;for(this.u(A),A=Array(16),y=_=0;4>y;++y)for(var v=0;32>v;v+=8)A[_++]=this.g[y]>>>v&255;return A};function i(A,y){var _=c;return Object.prototype.hasOwnProperty.call(_,A)?_[A]:_[A]=y(A)}function a(A,y){this.h=y;for(var _=[],v=!0,w=A.length-1;0<=w;w--){var R=A[w]|0;v&&R==y||(_[w]=R,v=!1)}this.g=_}var c={};function l(A){return-128<=A&&128>A?i(A,function(y){return new a([y|0],0>y?-1:0)}):new a([A|0],0>A?-1:0)}function h(A){if(isNaN(A)||!isFinite(A))return p;if(0>A)return O(h(-A));for(var y=[],_=1,v=0;A>=_;v++)y[v]=A/_|0,_*=4294967296;return new a(y,0)}function d(A,y){if(A.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(A.charAt(0)=="-")return O(d(A.substring(1),y));if(0<=A.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=h(Math.pow(y,8)),v=p,w=0;w<A.length;w+=8){var R=Math.min(8,A.length-w),E=parseInt(A.substring(w,w+R),y);8>R?(R=h(Math.pow(y,R)),v=v.j(R).add(h(E))):(v=v.j(_),v=v.add(h(E)))}return v}var p=l(0),g=l(1),I=l(16777216);n=a.prototype,n.m=function(){if(N(this))return-O(this).m();for(var A=0,y=1,_=0;_<this.g.length;_++){var v=this.i(_);A+=(0<=v?v:4294967296+v)*y,y*=4294967296}return A},n.toString=function(A){if(A=A||10,2>A||36<A)throw Error("radix out of range: "+A);if(C(this))return"0";if(N(this))return"-"+O(this).toString(A);for(var y=h(Math.pow(A,6)),_=this,v="";;){var w=K(_,y).g;_=H(_,w.j(y));var R=((0<_.g.length?_.g[0]:_.h)>>>0).toString(A);if(_=w,C(_))return R+v;for(;6>R.length;)R="0"+R;v=R+v}},n.i=function(A){return 0>A?0:A<this.g.length?this.g[A]:this.h};function C(A){if(A.h!=0)return!1;for(var y=0;y<A.g.length;y++)if(A.g[y]!=0)return!1;return!0}function N(A){return A.h==-1}n.l=function(A){return A=H(this,A),N(A)?-1:C(A)?0:1};function O(A){for(var y=A.g.length,_=[],v=0;v<y;v++)_[v]=~A.g[v];return new a(_,~A.h).add(g)}n.abs=function(){return N(this)?O(this):this},n.add=function(A){for(var y=Math.max(this.g.length,A.g.length),_=[],v=0,w=0;w<=y;w++){var R=v+(this.i(w)&65535)+(A.i(w)&65535),E=(R>>>16)+(this.i(w)>>>16)+(A.i(w)>>>16);v=E>>>16,R&=65535,E&=65535,_[w]=E<<16|R}return new a(_,_[_.length-1]&-2147483648?-1:0)};function H(A,y){return A.add(O(y))}n.j=function(A){if(C(this)||C(A))return p;if(N(this))return N(A)?O(this).j(O(A)):O(O(this).j(A));if(N(A))return O(this.j(O(A)));if(0>this.l(I)&&0>A.l(I))return h(this.m()*A.m());for(var y=this.g.length+A.g.length,_=[],v=0;v<2*y;v++)_[v]=0;for(v=0;v<this.g.length;v++)for(var w=0;w<A.g.length;w++){var R=this.i(v)>>>16,E=this.i(v)&65535,st=A.i(w)>>>16,Rn=A.i(w)&65535;_[2*v+2*w]+=E*Rn,W(_,2*v+2*w),_[2*v+2*w+1]+=R*Rn,W(_,2*v+2*w+1),_[2*v+2*w+1]+=E*st,W(_,2*v+2*w+1),_[2*v+2*w+2]+=R*st,W(_,2*v+2*w+2)}for(v=0;v<y;v++)_[v]=_[2*v+1]<<16|_[2*v];for(v=y;v<2*y;v++)_[v]=0;return new a(_,0)};function W(A,y){for(;(A[y]&65535)!=A[y];)A[y+1]+=A[y]>>>16,A[y]&=65535,y++}function G(A,y){this.g=A,this.h=y}function K(A,y){if(C(y))throw Error("division by zero");if(C(A))return new G(p,p);if(N(A))return y=K(O(A),y),new G(O(y.g),O(y.h));if(N(y))return y=K(A,O(y)),new G(O(y.g),y.h);if(30<A.g.length){if(N(A)||N(y))throw Error("slowDivide_ only works with positive integers.");for(var _=g,v=y;0>=v.l(A);)_=de(_),v=de(v);var w=le(_,1),R=le(v,1);for(v=le(v,2),_=le(_,2);!C(v);){var E=R.add(v);0>=E.l(A)&&(w=w.add(_),R=E),v=le(v,1),_=le(_,1)}return y=H(A,w.j(y)),new G(w,y)}for(w=p;0<=A.l(y);){for(_=Math.max(1,Math.floor(A.m()/y.m())),v=Math.ceil(Math.log(_)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),R=h(_),E=R.j(y);N(E)||0<E.l(A);)_-=v,R=h(_),E=R.j(y);C(R)&&(R=g),w=w.add(R),A=H(A,E)}return new G(w,A)}n.A=function(A){return K(this,A).h},n.and=function(A){for(var y=Math.max(this.g.length,A.g.length),_=[],v=0;v<y;v++)_[v]=this.i(v)&A.i(v);return new a(_,this.h&A.h)},n.or=function(A){for(var y=Math.max(this.g.length,A.g.length),_=[],v=0;v<y;v++)_[v]=this.i(v)|A.i(v);return new a(_,this.h|A.h)},n.xor=function(A){for(var y=Math.max(this.g.length,A.g.length),_=[],v=0;v<y;v++)_[v]=this.i(v)^A.i(v);return new a(_,this.h^A.h)};function de(A){for(var y=A.g.length+1,_=[],v=0;v<y;v++)_[v]=A.i(v)<<1|A.i(v-1)>>>31;return new a(_,A.h)}function le(A,y){var _=y>>5;y%=32;for(var v=A.g.length-_,w=[],R=0;R<v;R++)w[R]=0<y?A.i(R+_)>>>y|A.i(R+_+1)<<32-y:A.i(R+_);return new a(w,A.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,fm=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=d,zn=a}).apply(typeof hf<"u"?hf:typeof self<"u"?self:typeof window<"u"?window:{});var to=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var dm,Ms,pm,go,Fc,mm,gm,_m;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,f){return o==Array.prototype||o==Object.prototype||(o[u]=f.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof to=="object"&&to];for(var u=0;u<o.length;++u){var f=o[u];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function s(o,u){if(u)e:{var f=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var S=o[m];if(!(S in f))break e;f=f[S]}o=o[o.length-1],m=f[o],u=u(m),u!=m&&u!=null&&e(f,o,{configurable:!0,writable:!0,value:u})}}function i(o,u){o instanceof String&&(o+="");var f=0,m=!1,S={next:function(){if(!m&&f<o.length){var P=f++;return{value:u(P,o[P]),done:!1}}return m=!0,{done:!0,value:void 0}}};return S[Symbol.iterator]=function(){return S},S}s("Array.prototype.values",function(o){return o||function(){return i(this,function(u,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function l(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function h(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function d(o,u,f){return o.call.apply(o.bind,arguments)}function p(o,u,f){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var S=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(S,m),o.apply(u,S)}}return function(){return o.apply(u,arguments)}}function g(o,u,f){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:p,g.apply(null,arguments)}function I(o,u){var f=Array.prototype.slice.call(arguments,1);return function(){var m=f.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function C(o,u){function f(){}f.prototype=u.prototype,o.aa=u.prototype,o.prototype=new f,o.prototype.constructor=o,o.Qb=function(m,S,P){for(var j=Array(arguments.length-2),Ae=2;Ae<arguments.length;Ae++)j[Ae-2]=arguments[Ae];return u.prototype[S].apply(m,j)}}function N(o){const u=o.length;if(0<u){const f=Array(u);for(let m=0;m<u;m++)f[m]=o[m];return f}return[]}function O(o,u){for(let f=1;f<arguments.length;f++){const m=arguments[f];if(l(m)){const S=o.length||0,P=m.length||0;o.length=S+P;for(let j=0;j<P;j++)o[S+j]=m[j]}else o.push(m)}}class H{constructor(u,f){this.i=u,this.j=f,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function W(o){return/^[\s\xa0]*$/.test(o)}function G(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function K(o){return K[" "](o),o}K[" "]=function(){};var de=G().indexOf("Gecko")!=-1&&!(G().toLowerCase().indexOf("webkit")!=-1&&G().indexOf("Edge")==-1)&&!(G().indexOf("Trident")!=-1||G().indexOf("MSIE")!=-1)&&G().indexOf("Edge")==-1;function le(o,u,f){for(const m in o)u.call(f,o[m],m,o)}function A(o,u){for(const f in o)u.call(void 0,o[f],f,o)}function y(o){const u={};for(const f in o)u[f]=o[f];return u}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(o,u){let f,m;for(let S=1;S<arguments.length;S++){m=arguments[S];for(f in m)o[f]=m[f];for(let P=0;P<_.length;P++)f=_[P],Object.prototype.hasOwnProperty.call(m,f)&&(o[f]=m[f])}}function w(o){var u=1;o=o.split(":");const f=[];for(;0<u&&o.length;)f.push(o.shift()),u--;return o.length&&f.push(o.join(":")),f}function R(o){c.setTimeout(()=>{throw o},0)}function E(){var o=Ot;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class st{constructor(){this.h=this.g=null}add(u,f){const m=Rn.get();m.set(u,f),this.h?this.h.next=m:this.g=m,this.h=m}}var Rn=new H(()=>new Qe,o=>o.reset());class Qe{constructor(){this.next=this.g=this.h=null}set(u,f){this.h=u,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let Te,_e=!1,Ot=new st,lr=()=>{const o=c.Promise.resolve(void 0);Te=()=>{o.then(rn)}};var rn=()=>{for(var o;o=E();){try{o.h.call(o.g)}catch(f){R(f)}var u=Rn;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}_e=!1};function Be(){this.s=this.s,this.C=this.C}Be.prototype.s=!1,Be.prototype.ma=function(){this.s||(this.s=!0,this.N())},Be.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function je(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}je.prototype.h=function(){this.defaultPrevented=!0};var Oa=(function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const f=()=>{};c.addEventListener("test",f,u),c.removeEventListener("test",f,u)}catch{}return o})();function ur(o,u){if(je.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var f=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(de){e:{try{K(u.nodeName);var S=!0;break e}catch{}S=!1}S||(u=null)}}else f=="mouseover"?u=o.fromElement:f=="mouseout"&&(u=o.toElement);this.relatedTarget=u,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:hr[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&ur.aa.h.call(this)}}C(ur,je);var hr={2:"touch",3:"pen",4:"mouse"};ur.prototype.h=function(){ur.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var sn="closure_listenable_"+(1e6*Math.random()|0),ys=0;function Oi(o,u,f,m,S){this.listener=o,this.proxy=null,this.src=u,this.type=f,this.capture=!!m,this.ha=S,this.key=++ys,this.da=this.fa=!1}function jt(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function vs(o){this.src=o,this.g={},this.h=0}vs.prototype.add=function(o,u,f,m,S){var P=o.toString();o=this.g[P],o||(o=this.g[P]=[],this.h++);var j=b(o,u,m,S);return-1<j?(u=o[j],f||(u.fa=!1)):(u=new Oi(u,this.src,P,!!m,S),u.fa=f,o.push(u)),u};function T(o,u){var f=u.type;if(f in o.g){var m=o.g[f],S=Array.prototype.indexOf.call(m,u,void 0),P;(P=0<=S)&&Array.prototype.splice.call(m,S,1),P&&(jt(u),o.g[f].length==0&&(delete o.g[f],o.h--))}}function b(o,u,f,m){for(var S=0;S<o.length;++S){var P=o[S];if(!P.da&&P.listener==u&&P.capture==!!f&&P.ha==m)return S}return-1}var k="closure_lm_"+(1e6*Math.random()|0),L={};function x(o,u,f,m,S){if(Array.isArray(u)){for(var P=0;P<u.length;P++)x(o,u[P],f,m,S);return null}return f=ne(f),o&&o[sn]?o.K(u,f,h(m)?!!m.capture:!1,S):M(o,u,f,!1,m,S)}function M(o,u,f,m,S,P){if(!u)throw Error("Invalid event type");var j=h(S)?!!S.capture:!!S,Ae=z(o);if(Ae||(o[k]=Ae=new vs(o)),f=Ae.add(u,f,m,j,P),f.proxy)return f;if(m=$(),f.proxy=m,m.src=o,m.listener=f,o.addEventListener)Oa||(S=j),S===void 0&&(S=!1),o.addEventListener(u.toString(),m,S);else if(o.attachEvent)o.attachEvent(F(u.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return f}function $(){function o(f){return u.call(o.src,o.listener,f)}const u=Z;return o}function B(o,u,f,m,S){if(Array.isArray(u))for(var P=0;P<u.length;P++)B(o,u[P],f,m,S);else m=h(m)?!!m.capture:!!m,f=ne(f),o&&o[sn]?(o=o.i,u=String(u).toString(),u in o.g&&(P=o.g[u],f=b(P,f,m,S),-1<f&&(jt(P[f]),Array.prototype.splice.call(P,f,1),P.length==0&&(delete o.g[u],o.h--)))):o&&(o=z(o))&&(u=o.g[u.toString()],o=-1,u&&(o=b(u,f,m,S)),(f=-1<o?u[o]:null)&&U(f))}function U(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[sn])T(u.i,o);else{var f=o.type,m=o.proxy;u.removeEventListener?u.removeEventListener(f,m,o.capture):u.detachEvent?u.detachEvent(F(f),m):u.addListener&&u.removeListener&&u.removeListener(m),(f=z(u))?(T(f,o),f.h==0&&(f.src=null,u[k]=null)):jt(o)}}}function F(o){return o in L?L[o]:L[o]="on"+o}function Z(o,u){if(o.da)o=!0;else{u=new ur(u,this);var f=o.listener,m=o.ha||o.src;o.fa&&U(o),o=f.call(m,u)}return o}function z(o){return o=o[k],o instanceof vs?o:null}var J="__closure_events_fn_"+(1e9*Math.random()>>>0);function ne(o){return typeof o=="function"?o:(o[J]||(o[J]=function(u){return o.handleEvent(u)}),o[J])}function ee(){Be.call(this),this.i=new vs(this),this.M=this,this.F=null}C(ee,Be),ee.prototype[sn]=!0,ee.prototype.removeEventListener=function(o,u,f,m){B(this,o,u,f,m)};function ae(o,u){var f,m=o.F;if(m)for(f=[];m;m=m.F)f.push(m);if(o=o.M,m=u.type||u,typeof u=="string")u=new je(u,o);else if(u instanceof je)u.target=u.target||o;else{var S=u;u=new je(m,o),v(u,S)}if(S=!0,f)for(var P=f.length-1;0<=P;P--){var j=u.g=f[P];S=pe(j,m,!0,u)&&S}if(j=u.g=o,S=pe(j,m,!0,u)&&S,S=pe(j,m,!1,u)&&S,f)for(P=0;P<f.length;P++)j=u.g=f[P],S=pe(j,m,!1,u)&&S}ee.prototype.N=function(){if(ee.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var f=o.g[u],m=0;m<f.length;m++)jt(f[m]);delete o.g[u],o.h--}}this.F=null},ee.prototype.K=function(o,u,f,m){return this.i.add(String(o),u,!1,f,m)},ee.prototype.L=function(o,u,f,m){return this.i.add(String(o),u,!0,f,m)};function pe(o,u,f,m){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var S=!0,P=0;P<u.length;++P){var j=u[P];if(j&&!j.da&&j.capture==f){var Ae=j.listener,Ze=j.ha||j.src;j.fa&&T(o.i,j),S=Ae.call(Ze,m)!==!1&&S}}return S&&!m.defaultPrevented}function Je(o,u,f){if(typeof o=="function")f&&(o=g(o,f));else if(o&&typeof o.handleEvent=="function")o=g(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(o,u||0)}function Ye(o){o.g=Je(()=>{o.g=null,o.i&&(o.i=!1,Ye(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class Ct extends Be{constructor(u,f){super(),this.m=u,this.l=f,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Ye(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function it(o){Be.call(this),this.h=o,this.g={}}C(it,Be);var Sn=[];function Es(o){le(o.g,function(u,f){this.g.hasOwnProperty(f)&&U(u)},o),o.g={}}it.prototype.N=function(){it.aa.N.call(this),Es(this)},it.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Xe=c.JSON.stringify,Pt=c.JSON.parse,xi=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function Nr(){}Nr.prototype.h=null;function du(o){return o.h||(o.h=o.i())}function pu(){}var Ts={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function xa(){je.call(this,"d")}C(xa,je);function Ma(){je.call(this,"c")}C(Ma,je);var fr={},mu=null;function Mi(){return mu=mu||new ee}fr.La="serverreachability";function gu(o){je.call(this,fr.La,o)}C(gu,je);function ws(o){const u=Mi();ae(u,new gu(u))}fr.STAT_EVENT="statevent";function _u(o,u){je.call(this,fr.STAT_EVENT,o),this.stat=u}C(_u,je);function pt(o){const u=Mi();ae(u,new _u(u,o))}fr.Ma="timingevent";function yu(o,u){je.call(this,fr.Ma,o),this.size=u}C(yu,je);function Is(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},u)}function As(){this.g=!0}As.prototype.xa=function(){this.g=!1};function Gg(o,u,f,m,S,P){o.info(function(){if(o.g)if(P)for(var j="",Ae=P.split("&"),Ze=0;Ze<Ae.length;Ze++){var ye=Ae[Ze].split("=");if(1<ye.length){var ot=ye[0];ye=ye[1];var at=ot.split("_");j=2<=at.length&&at[1]=="type"?j+(ot+"="+ye+"&"):j+(ot+"=redacted&")}}else j=null;else j=P;return"XMLHTTP REQ ("+m+") [attempt "+S+"]: "+u+`
`+f+`
`+j})}function Kg(o,u,f,m,S,P,j){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+S+"]: "+u+`
`+f+`
`+P+" "+j})}function Or(o,u,f,m){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Jg(o,f)+(m?" "+m:"")})}function Qg(o,u){o.info(function(){return"TIMEOUT: "+u})}As.prototype.info=function(){};function Jg(o,u){if(!o.g)return u;if(!u)return null;try{var f=JSON.parse(u);if(f){for(o=0;o<f.length;o++)if(Array.isArray(f[o])){var m=f[o];if(!(2>m.length)){var S=m[1];if(Array.isArray(S)&&!(1>S.length)){var P=S[0];if(P!="noop"&&P!="stop"&&P!="close")for(var j=1;j<S.length;j++)S[j]=""}}}}return Xe(f)}catch{return u}}var Li={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},vu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},La;function Fi(){}C(Fi,Nr),Fi.prototype.g=function(){return new XMLHttpRequest},Fi.prototype.i=function(){return{}},La=new Fi;function Cn(o,u,f,m){this.j=o,this.i=u,this.l=f,this.R=m||1,this.U=new it(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Eu}function Eu(){this.i=null,this.g="",this.h=!1}var Tu={},Fa={};function Ua(o,u,f){o.L=1,o.v=$i(on(u)),o.m=f,o.P=!0,wu(o,null)}function wu(o,u){o.F=Date.now(),Ui(o),o.A=on(o.v);var f=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),Mu(f.i,"t",m),o.C=0,f=o.j.J,o.h=new Eu,o.g=eh(o.j,f?u:null,!o.m),0<o.O&&(o.M=new Ct(g(o.Y,o,o.g),o.O)),u=o.U,f=o.g,m=o.ca;var S="readystatechange";Array.isArray(S)||(S&&(Sn[0]=S.toString()),S=Sn);for(var P=0;P<S.length;P++){var j=x(f,S[P],m||u.handleEvent,!1,u.h||u);if(!j)break;u.g[j.key]=j}u=o.H?y(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),ws(),Gg(o.i,o.u,o.A,o.l,o.R,o.m)}Cn.prototype.ca=function(o){o=o.target;const u=this.M;u&&an(o)==3?u.j():this.Y(o)},Cn.prototype.Y=function(o){try{if(o==this.g)e:{const at=an(this.g);var u=this.g.Ba();const Lr=this.g.Z();if(!(3>at)&&(at!=3||this.g&&(this.h.h||this.g.oa()||qu(this.g)))){this.J||at!=4||u==7||(u==8||0>=Lr?ws(3):ws(2)),Ba(this);var f=this.g.Z();this.X=f;t:if(Iu(this)){var m=qu(this.g);o="";var S=m.length,P=an(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){dr(this),bs(this);var j="";break t}this.h.i=new c.TextDecoder}for(u=0;u<S;u++)this.h.h=!0,o+=this.h.i.decode(m[u],{stream:!(P&&u==S-1)});m.length=0,this.h.g+=o,this.C=0,j=this.h.g}else j=this.g.oa();if(this.o=f==200,Kg(this.i,this.u,this.A,this.l,this.R,at,f),this.o){if(this.T&&!this.K){t:{if(this.g){var Ae,Ze=this.g;if((Ae=Ze.g?Ze.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!W(Ae)){var ye=Ae;break t}}ye=null}if(f=ye)Or(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ja(this,f);else{this.o=!1,this.s=3,pt(12),dr(this),bs(this);break e}}if(this.P){f=!0;let xt;for(;!this.J&&this.C<j.length;)if(xt=Yg(this,j),xt==Fa){at==4&&(this.s=4,pt(14),f=!1),Or(this.i,this.l,null,"[Incomplete Response]");break}else if(xt==Tu){this.s=4,pt(15),Or(this.i,this.l,j,"[Invalid Chunk]"),f=!1;break}else Or(this.i,this.l,xt,null),ja(this,xt);if(Iu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),at!=4||j.length!=0||this.h.h||(this.s=1,pt(16),f=!1),this.o=this.o&&f,!f)Or(this.i,this.l,j,"[Invalid Chunked Response]"),dr(this),bs(this);else if(0<j.length&&!this.W){this.W=!0;var ot=this.j;ot.g==this&&ot.ba&&!ot.M&&(ot.j.info("Great, no buffering proxy detected. Bytes received: "+j.length),Ga(ot),ot.M=!0,pt(11))}}else Or(this.i,this.l,j,null),ja(this,j);at==4&&dr(this),this.o&&!this.J&&(at==4?Ju(this.j,this):(this.o=!1,Ui(this)))}else p_(this.g),f==400&&0<j.indexOf("Unknown SID")?(this.s=3,pt(12)):(this.s=0,pt(13)),dr(this),bs(this)}}}catch{}finally{}};function Iu(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Yg(o,u){var f=o.C,m=u.indexOf(`
`,f);return m==-1?Fa:(f=Number(u.substring(f,m)),isNaN(f)?Tu:(m+=1,m+f>u.length?Fa:(u=u.slice(m,m+f),o.C=m+f,u)))}Cn.prototype.cancel=function(){this.J=!0,dr(this)};function Ui(o){o.S=Date.now()+o.I,Au(o,o.I)}function Au(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Is(g(o.ba,o),u)}function Ba(o){o.B&&(c.clearTimeout(o.B),o.B=null)}Cn.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Qg(this.i,this.A),this.L!=2&&(ws(),pt(17)),dr(this),this.s=2,bs(this)):Au(this,this.S-o)};function bs(o){o.j.G==0||o.J||Ju(o.j,o)}function dr(o){Ba(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,Es(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function ja(o,u){try{var f=o.j;if(f.G!=0&&(f.g==o||$a(f.h,o))){if(!o.K&&$a(f.h,o)&&f.G==3){try{var m=f.Da.g.parse(u)}catch{m=null}if(Array.isArray(m)&&m.length==3){var S=m;if(S[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<o.F)Ki(f),Wi(f);else break e;Wa(f),pt(18)}}else f.za=S[1],0<f.za-f.T&&37500>S[2]&&f.F&&f.v==0&&!f.C&&(f.C=Is(g(f.Za,f),6e3));if(1>=Su(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else mr(f,11)}else if((o.K||f.g==o)&&Ki(f),!W(u))for(S=f.Da.g.parse(u),u=0;u<S.length;u++){let ye=S[u];if(f.T=ye[0],ye=ye[1],f.G==2)if(ye[0]=="c"){f.K=ye[1],f.ia=ye[2];const ot=ye[3];ot!=null&&(f.la=ot,f.j.info("VER="+f.la));const at=ye[4];at!=null&&(f.Aa=at,f.j.info("SVER="+f.Aa));const Lr=ye[5];Lr!=null&&typeof Lr=="number"&&0<Lr&&(m=1.5*Lr,f.L=m,f.j.info("backChannelRequestTimeoutMs_="+m)),m=f;const xt=o.g;if(xt){const Ji=xt.g?xt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ji){var P=m.h;P.g||Ji.indexOf("spdy")==-1&&Ji.indexOf("quic")==-1&&Ji.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(qa(P,P.h),P.h=null))}if(m.D){const Ka=xt.g?xt.g.getResponseHeader("X-HTTP-Session-Id"):null;Ka&&(m.ya=Ka,Ce(m.I,m.D,Ka))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-o.F,f.j.info("Handshake RTT: "+f.R+"ms")),m=f;var j=o;if(m.qa=Zu(m,m.J?m.ia:null,m.W),j.K){Cu(m.h,j);var Ae=j,Ze=m.L;Ze&&(Ae.I=Ze),Ae.B&&(Ba(Ae),Ui(Ae)),m.g=j}else Ku(m);0<f.i.length&&Gi(f)}else ye[0]!="stop"&&ye[0]!="close"||mr(f,7);else f.G==3&&(ye[0]=="stop"||ye[0]=="close"?ye[0]=="stop"?mr(f,7):za(f):ye[0]!="noop"&&f.l&&f.l.ta(ye),f.v=0)}}ws(4)}catch{}}var Xg=class{constructor(o,u){this.g=o,this.map=u}};function bu(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ru(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Su(o){return o.h?1:o.g?o.g.size:0}function $a(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function qa(o,u){o.g?o.g.add(u):o.h=u}function Cu(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}bu.prototype.cancel=function(){if(this.i=Pu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Pu(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const f of o.g.values())u=u.concat(f.D);return u}return N(o.i)}function Zg(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var u=[],f=o.length,m=0;m<f;m++)u.push(o[m]);return u}u=[],f=0;for(m in o)u[f++]=o[m];return u}function e_(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(l(o)||typeof o=="string"){var u=[];o=o.length;for(var f=0;f<o;f++)u.push(f);return u}u=[],f=0;for(const m in o)u[f++]=m;return u}}}function ku(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var f=e_(o),m=Zg(o),S=m.length,P=0;P<S;P++)u.call(void 0,m[P],f&&f[P],o)}var Vu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function t_(o,u){if(o){o=o.split("&");for(var f=0;f<o.length;f++){var m=o[f].indexOf("="),S=null;if(0<=m){var P=o[f].substring(0,m);S=o[f].substring(m+1)}else P=o[f];u(P,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function pr(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof pr){this.h=o.h,Bi(this,o.j),this.o=o.o,this.g=o.g,ji(this,o.s),this.l=o.l;var u=o.i,f=new Cs;f.i=u.i,u.g&&(f.g=new Map(u.g),f.h=u.h),Du(this,f),this.m=o.m}else o&&(u=String(o).match(Vu))?(this.h=!1,Bi(this,u[1]||"",!0),this.o=Rs(u[2]||""),this.g=Rs(u[3]||"",!0),ji(this,u[4]),this.l=Rs(u[5]||"",!0),Du(this,u[6]||"",!0),this.m=Rs(u[7]||"")):(this.h=!1,this.i=new Cs(null,this.h))}pr.prototype.toString=function(){var o=[],u=this.j;u&&o.push(Ss(u,Nu,!0),":");var f=this.g;return(f||u=="file")&&(o.push("//"),(u=this.o)&&o.push(Ss(u,Nu,!0),"@"),o.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&o.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&o.push("/"),o.push(Ss(f,f.charAt(0)=="/"?s_:r_,!0))),(f=this.i.toString())&&o.push("?",f),(f=this.m)&&o.push("#",Ss(f,o_)),o.join("")};function on(o){return new pr(o)}function Bi(o,u,f){o.j=f?Rs(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function ji(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function Du(o,u,f){u instanceof Cs?(o.i=u,a_(o.i,o.h)):(f||(u=Ss(u,i_)),o.i=new Cs(u,o.h))}function Ce(o,u,f){o.i.set(u,f)}function $i(o){return Ce(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Rs(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Ss(o,u,f){return typeof o=="string"?(o=encodeURI(o).replace(u,n_),f&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function n_(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Nu=/[#\/\?@]/g,r_=/[#\?:]/g,s_=/[#\?]/g,i_=/[#\?@]/g,o_=/#/g;function Cs(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function Pn(o){o.g||(o.g=new Map,o.h=0,o.i&&t_(o.i,function(u,f){o.add(decodeURIComponent(u.replace(/\+/g," ")),f)}))}n=Cs.prototype,n.add=function(o,u){Pn(this),this.i=null,o=xr(this,o);var f=this.g.get(o);return f||this.g.set(o,f=[]),f.push(u),this.h+=1,this};function Ou(o,u){Pn(o),u=xr(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function xu(o,u){return Pn(o),u=xr(o,u),o.g.has(u)}n.forEach=function(o,u){Pn(this),this.g.forEach(function(f,m){f.forEach(function(S){o.call(u,S,m,this)},this)},this)},n.na=function(){Pn(this);const o=Array.from(this.g.values()),u=Array.from(this.g.keys()),f=[];for(let m=0;m<u.length;m++){const S=o[m];for(let P=0;P<S.length;P++)f.push(u[m])}return f},n.V=function(o){Pn(this);let u=[];if(typeof o=="string")xu(this,o)&&(u=u.concat(this.g.get(xr(this,o))));else{o=Array.from(this.g.values());for(let f=0;f<o.length;f++)u=u.concat(o[f])}return u},n.set=function(o,u){return Pn(this),this.i=null,o=xr(this,o),xu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function Mu(o,u,f){Ou(o,u),0<f.length&&(o.i=null,o.g.set(xr(o,u),N(f)),o.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(var f=0;f<u.length;f++){var m=u[f];const P=encodeURIComponent(String(m)),j=this.V(m);for(m=0;m<j.length;m++){var S=P;j[m]!==""&&(S+="="+encodeURIComponent(String(j[m]))),o.push(S)}}return this.i=o.join("&")};function xr(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function a_(o,u){u&&!o.j&&(Pn(o),o.i=null,o.g.forEach(function(f,m){var S=m.toLowerCase();m!=S&&(Ou(this,m),Mu(this,S,f))},o)),o.j=u}function c_(o,u){const f=new As;if(c.Image){const m=new Image;m.onload=I(kn,f,"TestLoadImage: loaded",!0,u,m),m.onerror=I(kn,f,"TestLoadImage: error",!1,u,m),m.onabort=I(kn,f,"TestLoadImage: abort",!1,u,m),m.ontimeout=I(kn,f,"TestLoadImage: timeout",!1,u,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else u(!1)}function l_(o,u){const f=new As,m=new AbortController,S=setTimeout(()=>{m.abort(),kn(f,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:m.signal}).then(P=>{clearTimeout(S),P.ok?kn(f,"TestPingServer: ok",!0,u):kn(f,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(S),kn(f,"TestPingServer: error",!1,u)})}function kn(o,u,f,m,S){try{S&&(S.onload=null,S.onerror=null,S.onabort=null,S.ontimeout=null),m(f)}catch{}}function u_(){this.g=new xi}function h_(o,u,f){const m=f||"";try{ku(o,function(S,P){let j=S;h(S)&&(j=Xe(S)),u.push(m+P+"="+encodeURIComponent(j))})}catch(S){throw u.push(m+"type="+encodeURIComponent("_badmap")),S}}function qi(o){this.l=o.Ub||null,this.j=o.eb||!1}C(qi,Nr),qi.prototype.g=function(){return new Hi(this.l,this.j)},qi.prototype.i=(function(o){return function(){return o}})({});function Hi(o,u){ee.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Hi,ee),n=Hi.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,ks(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ps(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,ks(this)),this.g&&(this.readyState=3,ks(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Lu(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Lu(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?Ps(this):ks(this),this.readyState==3&&Lu(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,Ps(this))},n.Qa=function(o){this.g&&(this.response=o,Ps(this))},n.ga=function(){this.g&&Ps(this)};function Ps(o){o.readyState=4,o.l=null,o.j=null,o.v=null,ks(o)}n.setRequestHeader=function(o,u){this.u.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var f=u.next();!f.done;)f=f.value,o.push(f[0]+": "+f[1]),f=u.next();return o.join(`\r
`)};function ks(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Hi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Fu(o){let u="";return le(o,function(f,m){u+=m,u+=":",u+=f,u+=`\r
`}),u}function Ha(o,u,f){e:{for(m in f){var m=!1;break e}m=!0}m||(f=Fu(f),typeof o=="string"?f!=null&&encodeURIComponent(String(f)):Ce(o,u,f))}function Ne(o){ee.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(Ne,ee);var f_=/^https?$/i,d_=["POST","PUT"];n=Ne.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,u,f,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():La.g(),this.v=this.o?du(this.o):du(La),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(P){Uu(this,P);return}if(o=f||"",f=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var S in m)f.set(S,m[S]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const P of m.keys())f.set(P,m.get(P));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(f.keys()).find(P=>P.toLowerCase()=="content-type"),S=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(d_,u,void 0))||m||S||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,j]of f)this.g.setRequestHeader(P,j);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{$u(this),this.u=!0,this.g.send(o),this.u=!1}catch(P){Uu(this,P)}};function Uu(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,Bu(o),zi(o)}function Bu(o){o.A||(o.A=!0,ae(o,"complete"),ae(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,ae(this,"complete"),ae(this,"abort"),zi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),zi(this,!0)),Ne.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?ju(this):this.bb())},n.bb=function(){ju(this)};function ju(o){if(o.h&&typeof a<"u"&&(!o.v[1]||an(o)!=4||o.Z()!=2)){if(o.u&&an(o)==4)Je(o.Ea,0,o);else if(ae(o,"readystatechange"),an(o)==4){o.h=!1;try{const j=o.Z();e:switch(j){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var f;if(!(f=u)){var m;if(m=j===0){var S=String(o.D).match(Vu)[1]||null;!S&&c.self&&c.self.location&&(S=c.self.location.protocol.slice(0,-1)),m=!f_.test(S?S.toLowerCase():"")}f=m}if(f)ae(o,"complete"),ae(o,"success");else{o.m=6;try{var P=2<an(o)?o.g.statusText:""}catch{P=""}o.l=P+" ["+o.Z()+"]",Bu(o)}}finally{zi(o)}}}}function zi(o,u){if(o.g){$u(o);const f=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||ae(o,"ready");try{f.onreadystatechange=m}catch{}}}function $u(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function an(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<an(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Pt(u)}};function qu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function p_(o){const u={};o=(o.g&&2<=an(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(W(o[m]))continue;var f=w(o[m]);const S=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const P=u[S]||[];u[S]=P,P.push(f)}A(u,function(m){return m.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Vs(o,u,f){return f&&f.internalChannelParams&&f.internalChannelParams[o]||u}function Hu(o){this.Aa=0,this.i=[],this.j=new As,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Vs("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Vs("baseRetryDelayMs",5e3,o),this.cb=Vs("retryDelaySeedMs",1e4,o),this.Wa=Vs("forwardChannelMaxRetries",2,o),this.wa=Vs("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new bu(o&&o.concurrentRequestLimit),this.Da=new u_,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Hu.prototype,n.la=8,n.G=1,n.connect=function(o,u,f,m){pt(0),this.W=o,this.H=u||{},f&&m!==void 0&&(this.H.OSID=f,this.H.OAID=m),this.F=this.X,this.I=Zu(this,null,this.W),Gi(this)};function za(o){if(zu(o),o.G==3){var u=o.U++,f=on(o.I);if(Ce(f,"SID",o.K),Ce(f,"RID",u),Ce(f,"TYPE","terminate"),Ds(o,f),u=new Cn(o,o.j,u),u.L=2,u.v=$i(on(f)),f=!1,c.navigator&&c.navigator.sendBeacon)try{f=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!f&&c.Image&&(new Image().src=u.v,f=!0),f||(u.g=eh(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Ui(u)}Xu(o)}function Wi(o){o.g&&(Ga(o),o.g.cancel(),o.g=null)}function zu(o){Wi(o),o.u&&(c.clearTimeout(o.u),o.u=null),Ki(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function Gi(o){if(!Ru(o.h)&&!o.s){o.s=!0;var u=o.Ga;Te||lr(),_e||(Te(),_e=!0),Ot.add(u,o),o.B=0}}function m_(o,u){return Su(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Is(g(o.Ga,o,u),Yu(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const S=new Cn(this,this.j,o);let P=this.o;if(this.S&&(P?(P=y(P),v(P,this.S)):P=this.S),this.m!==null||this.O||(S.H=P,P=null),this.P)e:{for(var u=0,f=0;f<this.i.length;f++){t:{var m=this.i[f];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(u+=m,4096<u){u=f;break e}if(u===4096||f===this.i.length-1){u=f+1;break e}}u=1e3}else u=1e3;u=Gu(this,S,u),f=on(this.I),Ce(f,"RID",o),Ce(f,"CVER",22),this.D&&Ce(f,"X-HTTP-Session-Id",this.D),Ds(this,f),P&&(this.O?u="headers="+encodeURIComponent(String(Fu(P)))+"&"+u:this.m&&Ha(f,this.m,P)),qa(this.h,S),this.Ua&&Ce(f,"TYPE","init"),this.P?(Ce(f,"$req",u),Ce(f,"SID","null"),S.T=!0,Ua(S,f,null)):Ua(S,f,u),this.G=2}}else this.G==3&&(o?Wu(this,o):this.i.length==0||Ru(this.h)||Wu(this))};function Wu(o,u){var f;u?f=u.l:f=o.U++;const m=on(o.I);Ce(m,"SID",o.K),Ce(m,"RID",f),Ce(m,"AID",o.T),Ds(o,m),o.m&&o.o&&Ha(m,o.m,o.o),f=new Cn(o,o.j,f,o.B+1),o.m===null&&(f.H=o.o),u&&(o.i=u.D.concat(o.i)),u=Gu(o,f,1e3),f.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),qa(o.h,f),Ua(f,m,u)}function Ds(o,u){o.H&&le(o.H,function(f,m){Ce(u,m,f)}),o.l&&ku({},function(f,m){Ce(u,m,f)})}function Gu(o,u,f){f=Math.min(o.i.length,f);var m=o.l?g(o.l.Na,o.l,o):null;e:{var S=o.i;let P=-1;for(;;){const j=["count="+f];P==-1?0<f?(P=S[0].g,j.push("ofs="+P)):P=0:j.push("ofs="+P);let Ae=!0;for(let Ze=0;Ze<f;Ze++){let ye=S[Ze].g;const ot=S[Ze].map;if(ye-=P,0>ye)P=Math.max(0,S[Ze].g-100),Ae=!1;else try{h_(ot,j,"req"+ye+"_")}catch{m&&m(ot)}}if(Ae){m=j.join("&");break e}}}return o=o.i.splice(0,f),u.D=o,m}function Ku(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;Te||lr(),_e||(Te(),_e=!0),Ot.add(u,o),o.v=0}}function Wa(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Is(g(o.Fa,o),Yu(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Qu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Is(g(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,pt(10),Wi(this),Qu(this))};function Ga(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Qu(o){o.g=new Cn(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=on(o.qa);Ce(u,"RID","rpc"),Ce(u,"SID",o.K),Ce(u,"AID",o.T),Ce(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&Ce(u,"TO",o.ja),Ce(u,"TYPE","xmlhttp"),Ds(o,u),o.m&&o.o&&Ha(u,o.m,o.o),o.L&&(o.g.I=o.L);var f=o.g;o=o.ia,f.L=1,f.v=$i(on(u)),f.m=null,f.P=!0,wu(f,o)}n.Za=function(){this.C!=null&&(this.C=null,Wi(this),Wa(this),pt(19))};function Ki(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function Ju(o,u){var f=null;if(o.g==u){Ki(o),Ga(o),o.g=null;var m=2}else if($a(o.h,u))f=u.D,Cu(o.h,u),m=1;else return;if(o.G!=0){if(u.o)if(m==1){f=u.m?u.m.length:0,u=Date.now()-u.F;var S=o.B;m=Mi(),ae(m,new yu(m,f)),Gi(o)}else Ku(o);else if(S=u.s,S==3||S==0&&0<u.X||!(m==1&&m_(o,u)||m==2&&Wa(o)))switch(f&&0<f.length&&(u=o.h,u.i=u.i.concat(f)),S){case 1:mr(o,5);break;case 4:mr(o,10);break;case 3:mr(o,6);break;default:mr(o,2)}}}function Yu(o,u){let f=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(f*=2),f*u}function mr(o,u){if(o.j.info("Error code "+u),u==2){var f=g(o.fb,o),m=o.Xa;const S=!m;m=new pr(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Bi(m,"https"),$i(m),S?c_(m.toString(),f):l_(m.toString(),f)}else pt(2);o.G=0,o.l&&o.l.sa(u),Xu(o),zu(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),pt(2)):(this.j.info("Failed to ping google.com"),pt(1))};function Xu(o){if(o.G=0,o.ka=[],o.l){const u=Pu(o.h);(u.length!=0||o.i.length!=0)&&(O(o.ka,u),O(o.ka,o.i),o.h.i.length=0,N(o.i),o.i.length=0),o.l.ra()}}function Zu(o,u,f){var m=f instanceof pr?on(f):new pr(f);if(m.g!="")u&&(m.g=u+"."+m.g),ji(m,m.s);else{var S=c.location;m=S.protocol,u=u?u+"."+S.hostname:S.hostname,S=+S.port;var P=new pr(null);m&&Bi(P,m),u&&(P.g=u),S&&ji(P,S),f&&(P.l=f),m=P}return f=o.D,u=o.ya,f&&u&&Ce(m,f,u),Ce(m,"VER",o.la),Ds(o,m),m}function eh(o,u,f){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new Ne(new qi({eb:f})):new Ne(o.pa),u.Ha(o.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function th(){}n=th.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Qi(){}Qi.prototype.g=function(o,u){return new Tt(o,u)};function Tt(o,u){ee.call(this),this.g=new Hu(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!W(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!W(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Mr(this)}C(Tt,ee),Tt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Tt.prototype.close=function(){za(this.g)},Tt.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var f={};f.__data__=o,o=f}else this.u&&(f={},f.__data__=Xe(o),o=f);u.i.push(new Xg(u.Ya++,o)),u.G==3&&Gi(u)},Tt.prototype.N=function(){this.g.l=null,delete this.j,za(this.g),delete this.g,Tt.aa.N.call(this)};function nh(o){xa.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const f in u){o=f;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}C(nh,xa);function rh(){Ma.call(this),this.status=1}C(rh,Ma);function Mr(o){this.g=o}C(Mr,th),Mr.prototype.ua=function(){ae(this.g,"a")},Mr.prototype.ta=function(o){ae(this.g,new nh(o))},Mr.prototype.sa=function(o){ae(this.g,new rh)},Mr.prototype.ra=function(){ae(this.g,"b")},Qi.prototype.createWebChannel=Qi.prototype.g,Tt.prototype.send=Tt.prototype.o,Tt.prototype.open=Tt.prototype.m,Tt.prototype.close=Tt.prototype.close,_m=function(){return new Qi},gm=function(){return Mi()},mm=fr,Fc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Li.NO_ERROR=0,Li.TIMEOUT=8,Li.HTTP_ERROR=6,go=Li,vu.COMPLETE="complete",pm=vu,pu.EventType=Ts,Ts.OPEN="a",Ts.CLOSE="b",Ts.ERROR="c",Ts.MESSAGE="d",ee.prototype.listen=ee.prototype.K,Ms=pu,Ne.prototype.listenOnce=Ne.prototype.L,Ne.prototype.getLastError=Ne.prototype.Ka,Ne.prototype.getLastErrorCode=Ne.prototype.Ba,Ne.prototype.getStatus=Ne.prototype.Z,Ne.prototype.getResponseJson=Ne.prototype.Oa,Ne.prototype.getResponseText=Ne.prototype.oa,Ne.prototype.send=Ne.prototype.ea,Ne.prototype.setWithCredentials=Ne.prototype.Ha,dm=Ne}).apply(typeof to<"u"?to:typeof self<"u"?self:typeof window<"u"?window:{});const ff="@firebase/firestore",df="4.9.1";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}lt.UNAUTHENTICATED=new lt(null),lt.GOOGLE_CREDENTIALS=new lt("google-credentials-uid"),lt.FIRST_PARTY=new lt("first-party-uid"),lt.MOCK_USER=new lt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ps="12.2.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rr=new Tl("@firebase/firestore");function jr(){return Rr.logLevel}function Q(n,...e){if(Rr.logLevel<=ue.DEBUG){const t=e.map(Vl);Rr.debug(`Firestore (${ps}): ${n}`,...t)}}function Tn(n,...e){if(Rr.logLevel<=ue.ERROR){const t=e.map(Vl);Rr.error(`Firestore (${ps}): ${n}`,...t)}}function is(n,...e){if(Rr.logLevel<=ue.WARN){const t=e.map(Vl);Rr.warn(`Firestore (${ps}): ${n}`,...t)}}function Vl(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,ym(n,r,t)}function ym(n,e,t){let r=`FIRESTORE (${ps}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Tn(r),new Error(r)}function ge(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||ym(e,s,r)}function ie(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class q extends bn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class EI{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(lt.UNAUTHENTICATED)))}shutdown(){}}class TI{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class wI{constructor(e){this.t=e,this.currentUser=lt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ge(this.o===void 0,42304);let r=this.i;const s=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let i=new mn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new mn,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const l=i;e.enqueueRetryable((async()=>{await l.promise,await s(this.currentUser)}))},c=l=>{Q("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((l=>c(l))),setTimeout((()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(Q("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new mn)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(Q("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ge(typeof r.accessToken=="string",31837,{l:r}),new vm(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ge(e===null||typeof e=="string",2055,{h:e}),new lt(e)}}class II{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=lt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class AI{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new II(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(lt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class pf{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class bI{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Mt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){ge(this.o===void 0,3512);const r=i=>{i.error!=null&&Q("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,Q("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{Q("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):Q("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new pf(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(ge(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new pf(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RI(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dl{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=RI(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function he(n,e){return n<e?-1:n>e?1:0}function Uc(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return dc(s)===dc(i)?he(s,i):dc(s)?1:-1}return he(n.length,e.length)}const SI=55296,CI=57343;function dc(n){const e=n.charCodeAt(0);return e>=SI&&e<=CI}function os(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mf="__name__";class zt{constructor(e,t,r){t===void 0?t=0:t>e.length&&X(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&X(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return zt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof zt?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=zt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return he(e.length,t.length)}static compareSegments(e,t){const r=zt.isNumericId(e),s=zt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?zt.extractNumericId(e).compare(zt.extractNumericId(t)):Uc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return zn.fromString(e.substring(4,e.length-2))}}class Ie extends zt{construct(e,t,r){return new Ie(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new q(V.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new Ie(t)}static emptyPath(){return new Ie([])}}const PI=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class nt extends zt{construct(e,t,r){return new nt(e,t,r)}static isValidIdentifier(e){return PI.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),nt.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===mf}static keyField(){return new nt([mf])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new q(V.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new q(V.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new q(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new q(V.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new nt(t)}static emptyPath(){return new nt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(e){this.path=e}static fromPath(e){return new Y(Ie.fromString(e))}static fromName(e){return new Y(Ie.fromString(e).popFirst(5))}static empty(){return new Y(Ie.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ie.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ie.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Y(new Ie(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Em(n,e,t){if(!t)throw new q(V.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function kI(n,e,t,r){if(e===!0&&r===!0)throw new q(V.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function gf(n){if(!Y.isDocumentKey(n))throw new q(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function _f(n){if(Y.isDocumentKey(n))throw new q(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Tm(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ma(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":X(12329,{type:typeof n})}function Ut(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new q(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ma(n);throw new q(V.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(n,e){const t={typeString:n};return e&&(t.value=e),t}function wi(n,e){if(!Tm(n))throw new q(V.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new q(V.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yf=-62135596800,vf=1e6;class Pe{static now(){return Pe.fromMillis(Date.now())}static fromDate(e){return Pe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*vf);return new Pe(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new q(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new q(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<yf)throw new q(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new q(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/vf}_compareTo(e){return this.seconds===e.seconds?he(this.nanoseconds,e.nanoseconds):he(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Pe._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(wi(e,Pe._jsonSchema))return new Pe(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-yf;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Pe._jsonSchemaVersion="firestore/timestamp/1.0",Pe._jsonSchema={type:Fe("string",Pe._jsonSchemaVersion),seconds:Fe("number"),nanoseconds:Fe("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{static fromTimestamp(e){return new te(e)}static min(){return new te(new Pe(0,0))}static max(){return new te(new Pe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ai=-1;function VI(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=te.fromTimestamp(r===1e9?new Pe(t+1,0):new Pe(t,r));return new Xn(s,Y.empty(),e)}function DI(n){return new Xn(n.readTime,n.key,ai)}class Xn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Xn(te.min(),Y.empty(),ai)}static max(){return new Xn(te.max(),Y.empty(),ai)}}function NI(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=Y.comparator(n.documentKey,e.documentKey),t!==0?t:he(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OI="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class xI{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ms(n){if(n.code!==V.FAILED_PRECONDITION||n.message!==OI)throw n;Q("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&X(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new D(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof D?t:D.resolve(t)}catch(t){return D.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):D.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):D.reject(t)}static resolve(e){return new D(((t,r)=>{t(e)}))}static reject(e){return new D(((t,r)=>{r(e)}))}static waitFor(e){return new D(((t,r)=>{let s=0,i=0,a=!1;e.forEach((c=>{++s,c.next((()=>{++i,a&&i===s&&t()}),(l=>r(l)))})),a=!0,i===s&&t()}))}static or(e){let t=D.resolve(!1);for(const r of e)t=t.next((s=>s?D.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new D(((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let l=0;l<i;l++){const h=l;t(e[h]).next((d=>{a[h]=d,++c,c===i&&r(a)}),(d=>s(d)))}}))}static doWhile(e,t){return new D(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function MI(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function gs(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ga{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}ga.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nl=-1;function Ii(n){return n==null}function Fo(n){return n===0&&1/n==-1/0}function LI(n){return typeof n=="number"&&Number.isInteger(n)&&!Fo(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wm="";function FI(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Ef(e)),e=UI(n.get(t),e);return Ef(e)}function UI(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case wm:t+="";break;default:t+=i}}return t}function Ef(n){return n+wm+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tf(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function or(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Im(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e,t){this.comparator=e,this.root=t||et.EMPTY}insert(e,t){return new De(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,et.BLACK,null,null))}remove(e){return new De(this.comparator,this.root.remove(e,this.comparator).copy(null,null,et.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new no(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new no(this.root,e,this.comparator,!1)}getReverseIterator(){return new no(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new no(this.root,e,this.comparator,!0)}}class no{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class et{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??et.RED,this.left=s??et.EMPTY,this.right=i??et.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new et(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return et.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return et.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,et.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,et.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw X(43730,{key:this.key,value:this.value});if(this.right.isRed())throw X(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw X(27949);return e+(this.isRed()?0:1)}}et.EMPTY=null,et.RED=!0,et.BLACK=!1;et.EMPTY=new class{constructor(){this.size=0}get key(){throw X(57766)}get value(){throw X(16141)}get color(){throw X(16727)}get left(){throw X(29726)}get right(){throw X(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new et(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e){this.comparator=e,this.data=new De(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new wf(this.data.getIterator())}getIteratorFrom(e){return new wf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof qe)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new qe(this.comparator);return t.data=e,t}}class wf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e){this.fields=e,e.sort(nt.comparator)}static empty(){return new Rt([])}unionWith(e){let t=new qe(nt.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Rt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return os(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Am extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Am("Invalid base64 string: "+i):i}})(e);return new rt(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(e);return new rt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return he(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}rt.EMPTY_BYTE_STRING=new rt("");const BI=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Zn(n){if(ge(!!n,39018),typeof n=="string"){let e=0;const t=BI.exec(n);if(ge(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Oe(n.seconds),nanos:Oe(n.nanos)}}function Oe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function er(n){return typeof n=="string"?rt.fromBase64String(n):rt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bm="server_timestamp",Rm="__type__",Sm="__previous_value__",Cm="__local_write_time__";function Ol(n){return(n?.mapValue?.fields||{})[Rm]?.stringValue===bm}function _a(n){const e=n.mapValue.fields[Sm];return Ol(e)?_a(e):e}function ci(n){const e=Zn(n.mapValue.fields[Cm].timestampValue);return new Pe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jI{constructor(e,t,r,s,i,a,c,l,h,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h,this.isUsingEmulator=d}}const Uo="(default)";class li{constructor(e,t){this.projectId=e,this.database=t||Uo}static empty(){return new li("","")}get isDefaultDatabase(){return this.database===Uo}isEqual(e){return e instanceof li&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pm="__type__",$I="__max__",ro={mapValue:{}},km="__vector__",Bo="value";function tr(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ol(n)?4:HI(n)?9007199254740991:qI(n)?10:11:X(28295,{value:n})}function nn(n,e){if(n===e)return!0;const t=tr(n);if(t!==tr(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ci(n).isEqual(ci(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=Zn(s.timestampValue),c=Zn(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return er(s.bytesValue).isEqual(er(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return Oe(s.geoPointValue.latitude)===Oe(i.geoPointValue.latitude)&&Oe(s.geoPointValue.longitude)===Oe(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return Oe(s.integerValue)===Oe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=Oe(s.doubleValue),c=Oe(i.doubleValue);return a===c?Fo(a)===Fo(c):isNaN(a)&&isNaN(c)}return!1})(n,e);case 9:return os(n.arrayValue.values||[],e.arrayValue.values||[],nn);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Tf(a)!==Tf(c))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!nn(a[l],c[l])))return!1;return!0})(n,e);default:return X(52216,{left:n})}}function ui(n,e){return(n.values||[]).find((t=>nn(t,e)))!==void 0}function as(n,e){if(n===e)return 0;const t=tr(n),r=tr(e);if(t!==r)return he(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return he(n.booleanValue,e.booleanValue);case 2:return(function(i,a){const c=Oe(i.integerValue||i.doubleValue),l=Oe(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1})(n,e);case 3:return If(n.timestampValue,e.timestampValue);case 4:return If(ci(n),ci(e));case 5:return Uc(n.stringValue,e.stringValue);case 6:return(function(i,a){const c=er(i),l=er(a);return c.compareTo(l)})(n.bytesValue,e.bytesValue);case 7:return(function(i,a){const c=i.split("/"),l=a.split("/");for(let h=0;h<c.length&&h<l.length;h++){const d=he(c[h],l[h]);if(d!==0)return d}return he(c.length,l.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,a){const c=he(Oe(i.latitude),Oe(a.latitude));return c!==0?c:he(Oe(i.longitude),Oe(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Af(n.arrayValue,e.arrayValue);case 10:return(function(i,a){const c=i.fields||{},l=a.fields||{},h=c[Bo]?.arrayValue,d=l[Bo]?.arrayValue,p=he(h?.values?.length||0,d?.values?.length||0);return p!==0?p:Af(h,d)})(n.mapValue,e.mapValue);case 11:return(function(i,a){if(i===ro.mapValue&&a===ro.mapValue)return 0;if(i===ro.mapValue)return 1;if(a===ro.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=a.fields||{},d=Object.keys(h);l.sort(),d.sort();for(let p=0;p<l.length&&p<d.length;++p){const g=Uc(l[p],d[p]);if(g!==0)return g;const I=as(c[l[p]],h[d[p]]);if(I!==0)return I}return he(l.length,d.length)})(n.mapValue,e.mapValue);default:throw X(23264,{he:t})}}function If(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return he(n,e);const t=Zn(n),r=Zn(e),s=he(t.seconds,r.seconds);return s!==0?s:he(t.nanos,r.nanos)}function Af(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=as(t[s],r[s]);if(i)return i}return he(t.length,r.length)}function cs(n){return Bc(n)}function Bc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=Zn(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return er(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return Y.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Bc(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${Bc(t.fields[a])}`;return s+"}"})(n.mapValue):X(61005,{value:n})}function _o(n){switch(tr(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=_a(n);return e?16+_o(e):16;case 5:return 2*n.stringValue.length;case 6:return er(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+_o(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return or(r.fields,((i,a)=>{s+=i.length+_o(a)})),s})(n.mapValue);default:throw X(13486,{value:n})}}function bf(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function jc(n){return!!n&&"integerValue"in n}function xl(n){return!!n&&"arrayValue"in n}function Rf(n){return!!n&&"nullValue"in n}function Sf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function yo(n){return!!n&&"mapValue"in n}function qI(n){return(n?.mapValue?.fields||{})[Pm]?.stringValue===km}function Ks(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return or(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=Ks(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ks(n.arrayValue.values[t]);return e}return{...n}}function HI(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===$I}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e){this.value=e}static empty(){return new yt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!yo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ks(t)}setAll(e){let t=nt.emptyPath(),r={},s=[];e.forEach(((a,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=Ks(a):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());yo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return nn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];yo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){or(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new yt(Ks(this.value))}}function Vm(n){const e=[];return or(n.fields,((t,r)=>{const s=new nt([t]);if(yo(r)){const i=Vm(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)})),new Rt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new ze(e,0,te.min(),te.min(),te.min(),yt.empty(),0)}static newFoundDocument(e,t,r,s){return new ze(e,1,t,te.min(),r,s,0)}static newNoDocument(e,t){return new ze(e,2,t,te.min(),te.min(),yt.empty(),0)}static newUnknownDocument(e,t){return new ze(e,3,t,te.min(),te.min(),yt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(te.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=yt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=yt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=te.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ze&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ze(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(e,t){this.position=e,this.inclusive=t}}function Cf(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=Y.comparator(Y.fromName(a.referenceValue),t.key):r=as(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Pf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!nn(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(e,t="asc"){this.field=e,this.dir=t}}function zI(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dm{}class Le extends Dm{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new GI(e,t,r):t==="array-contains"?new JI(e,r):t==="in"?new YI(e,r):t==="not-in"?new XI(e,r):t==="array-contains-any"?new ZI(e,r):new Le(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new KI(e,r):new QI(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(as(t,this.value)):t!==null&&tr(this.value)===tr(t)&&this.matchesComparison(as(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return X(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Bt extends Dm{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Bt(e,t)}matches(e){return Nm(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Nm(n){return n.op==="and"}function Om(n){return WI(n)&&Nm(n)}function WI(n){for(const e of n.filters)if(e instanceof Bt)return!1;return!0}function $c(n){if(n instanceof Le)return n.field.canonicalString()+n.op.toString()+cs(n.value);if(Om(n))return n.filters.map((e=>$c(e))).join(",");{const e=n.filters.map((t=>$c(t))).join(",");return`${n.op}(${e})`}}function xm(n,e){return n instanceof Le?(function(r,s){return s instanceof Le&&r.op===s.op&&r.field.isEqual(s.field)&&nn(r.value,s.value)})(n,e):n instanceof Bt?(function(r,s){return s instanceof Bt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,c)=>i&&xm(a,s.filters[c])),!0):!1})(n,e):void X(19439)}function Mm(n){return n instanceof Le?(function(t){return`${t.field.canonicalString()} ${t.op} ${cs(t.value)}`})(n):n instanceof Bt?(function(t){return t.op.toString()+" {"+t.getFilters().map(Mm).join(" ,")+"}"})(n):"Filter"}class GI extends Le{constructor(e,t,r){super(e,t,r),this.key=Y.fromName(r.referenceValue)}matches(e){const t=Y.comparator(e.key,this.key);return this.matchesComparison(t)}}class KI extends Le{constructor(e,t){super(e,"in",t),this.keys=Lm("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class QI extends Le{constructor(e,t){super(e,"not-in",t),this.keys=Lm("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Lm(n,e){return(e.arrayValue?.values||[]).map((t=>Y.fromName(t.referenceValue)))}class JI extends Le{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return xl(t)&&ui(t.arrayValue,this.value)}}class YI extends Le{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ui(this.value.arrayValue,t)}}class XI extends Le{constructor(e,t){super(e,"not-in",t)}matches(e){if(ui(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ui(this.value.arrayValue,t)}}class ZI extends Le{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!xl(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>ui(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eA{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Te=null}}function kf(n,e=null,t=[],r=[],s=null,i=null,a=null){return new eA(n,e,t,r,s,i,a)}function Ml(n){const e=ie(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>$c(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Ii(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>cs(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>cs(r))).join(",")),e.Te=t}return e.Te}function Ll(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!zI(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!xm(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Pf(n.startAt,e.startAt)&&Pf(n.endAt,e.endAt)}function qc(n){return Y.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=l,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function tA(n,e,t,r,s,i,a,c){return new Ai(n,e,t,r,s,i,a,c)}function Fl(n){return new Ai(n)}function Vf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Fm(n){return n.collectionGroup!==null}function Qs(n){const e=ie(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new qe(nt.comparator);return a.filters.forEach((l=>{l.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new $o(i,r))})),t.has(nt.keyField().canonicalString())||e.Ie.push(new $o(nt.keyField(),r))}return e.Ie}function Yt(n){const e=ie(n);return e.Ee||(e.Ee=nA(e,Qs(n))),e.Ee}function nA(n,e){if(n.limitType==="F")return kf(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new $o(s.field,i)}));const t=n.endAt?new jo(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new jo(n.startAt.position,n.startAt.inclusive):null;return kf(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Hc(n,e){const t=n.filters.concat([e]);return new Ai(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function zc(n,e,t){return new Ai(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ya(n,e){return Ll(Yt(n),Yt(e))&&n.limitType===e.limitType}function Um(n){return`${Ml(Yt(n))}|lt:${n.limitType}`}function $r(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>Mm(s))).join(", ")}]`),Ii(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>cs(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>cs(s))).join(",")),`Target(${r})`})(Yt(n))}; limitType=${n.limitType})`}function va(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):Y.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of Qs(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(a,c,l){const h=Cf(a,c,l);return a.inclusive?h<=0:h<0})(r.startAt,Qs(r),s)||r.endAt&&!(function(a,c,l){const h=Cf(a,c,l);return a.inclusive?h>=0:h>0})(r.endAt,Qs(r),s))})(n,e)}function rA(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Bm(n){return(e,t)=>{let r=!1;for(const s of Qs(n)){const i=sA(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function sA(n,e,t){const r=n.field.isKeyField()?Y.comparator(e.key,t.key):(function(i,a,c){const l=a.data.field(i),h=c.data.field(i);return l!==null&&h!==null?as(l,h):X(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return X(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){or(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return Im(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iA=new De(Y.comparator);function wn(){return iA}const jm=new De(Y.comparator);function Ls(...n){let e=jm;for(const t of n)e=e.insert(t.key,t);return e}function $m(n){let e=jm;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function Er(){return Js()}function qm(){return Js()}function Js(){return new Pr((n=>n.toString()),((n,e)=>n.isEqual(e)))}const oA=new De(Y.comparator),aA=new qe(Y.comparator);function fe(...n){let e=aA;for(const t of n)e=e.add(t);return e}const cA=new qe(he);function lA(){return cA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ul(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Fo(e)?"-0":e}}function Hm(n){return{integerValue:""+n}}function uA(n,e){return LI(e)?Hm(e):Ul(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea{constructor(){this._=void 0}}function hA(n,e,t){return n instanceof hi?(function(s,i){const a={fields:{[Rm]:{stringValue:bm},[Cm]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ol(i)&&(i=_a(i)),i&&(a.fields[Sm]=i),{mapValue:a}})(t,e):n instanceof fi?Wm(n,e):n instanceof di?Gm(n,e):(function(s,i){const a=zm(s,i),c=Df(a)+Df(s.Ae);return jc(a)&&jc(s.Ae)?Hm(c):Ul(s.serializer,c)})(n,e)}function fA(n,e,t){return n instanceof fi?Wm(n,e):n instanceof di?Gm(n,e):t}function zm(n,e){return n instanceof qo?(function(r){return jc(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class hi extends Ea{}class fi extends Ea{constructor(e){super(),this.elements=e}}function Wm(n,e){const t=Km(e);for(const r of n.elements)t.some((s=>nn(s,r)))||t.push(r);return{arrayValue:{values:t}}}class di extends Ea{constructor(e){super(),this.elements=e}}function Gm(n,e){let t=Km(e);for(const r of n.elements)t=t.filter((s=>!nn(s,r)));return{arrayValue:{values:t}}}class qo extends Ea{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Df(n){return Oe(n.integerValue||n.doubleValue)}function Km(n){return xl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dA{constructor(e,t){this.field=e,this.transform=t}}function pA(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof fi&&s instanceof fi||r instanceof di&&s instanceof di?os(r.elements,s.elements,nn):r instanceof qo&&s instanceof qo?nn(r.Ae,s.Ae):r instanceof hi&&s instanceof hi})(n.transform,e.transform)}class mA{constructor(e,t){this.version=e,this.transformResults=t}}class We{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new We}static exists(e){return new We(void 0,e)}static updateTime(e){return new We(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function vo(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ta{}function Qm(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new wa(n.key,We.none()):new bi(n.key,n.data,We.none());{const t=n.data,r=yt.empty();let s=new qe(nt.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new ar(n.key,r,new Rt(s.toArray()),We.none())}}function gA(n,e,t){n instanceof bi?(function(s,i,a){const c=s.value.clone(),l=Of(s.fieldTransforms,i,a.transformResults);c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(n,e,t):n instanceof ar?(function(s,i,a){if(!vo(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=Of(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(Jm(s)),l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(n,e,t):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function Ys(n,e,t,r){return n instanceof bi?(function(i,a,c,l){if(!vo(i.precondition,a))return c;const h=i.value.clone(),d=xf(i.fieldTransforms,l,a);return h.setAll(d),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null})(n,e,t,r):n instanceof ar?(function(i,a,c,l){if(!vo(i.precondition,a))return c;const h=xf(i.fieldTransforms,l,a),d=a.data;return d.setAll(Jm(i)),d.setAll(h),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,e,t,r):(function(i,a,c){return vo(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c})(n,e,t)}function _A(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=zm(r.transform,s||null);i!=null&&(t===null&&(t=yt.empty()),t.set(r.field,i))}return t||null}function Nf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&os(r,s,((i,a)=>pA(i,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class bi extends Ta{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class ar extends Ta{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Jm(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function Of(n,e,t){const r=new Map;ge(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,fA(a,c,t[s]))}return r}function xf(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,hA(i,a,e))}return r}class wa extends Ta{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Ym extends Ta{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yA{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&gA(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Ys(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Ys(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=qm();return this.mutations.forEach((s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const l=Qm(a,c);l!==null&&r.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(te.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),fe())}isEqual(e){return this.batchId===e.batchId&&os(this.mutations,e.mutations,((t,r)=>Nf(t,r)))&&os(this.baseMutations,e.baseMutations,((t,r)=>Nf(t,r)))}}class Bl{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){ge(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return oA})();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Bl(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vA{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EA{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Me,me;function Xm(n){switch(n){case V.OK:return X(64938);case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return X(15467,{code:n})}}function Zm(n){if(n===void 0)return Tn("GRPC error has no .code"),V.UNKNOWN;switch(n){case Me.OK:return V.OK;case Me.CANCELLED:return V.CANCELLED;case Me.UNKNOWN:return V.UNKNOWN;case Me.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case Me.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case Me.INTERNAL:return V.INTERNAL;case Me.UNAVAILABLE:return V.UNAVAILABLE;case Me.UNAUTHENTICATED:return V.UNAUTHENTICATED;case Me.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case Me.NOT_FOUND:return V.NOT_FOUND;case Me.ALREADY_EXISTS:return V.ALREADY_EXISTS;case Me.PERMISSION_DENIED:return V.PERMISSION_DENIED;case Me.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case Me.ABORTED:return V.ABORTED;case Me.OUT_OF_RANGE:return V.OUT_OF_RANGE;case Me.UNIMPLEMENTED:return V.UNIMPLEMENTED;case Me.DATA_LOSS:return V.DATA_LOSS;default:return X(39323,{code:n})}}(me=Me||(Me={}))[me.OK=0]="OK",me[me.CANCELLED=1]="CANCELLED",me[me.UNKNOWN=2]="UNKNOWN",me[me.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",me[me.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",me[me.NOT_FOUND=5]="NOT_FOUND",me[me.ALREADY_EXISTS=6]="ALREADY_EXISTS",me[me.PERMISSION_DENIED=7]="PERMISSION_DENIED",me[me.UNAUTHENTICATED=16]="UNAUTHENTICATED",me[me.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",me[me.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",me[me.ABORTED=10]="ABORTED",me[me.OUT_OF_RANGE=11]="OUT_OF_RANGE",me[me.UNIMPLEMENTED=12]="UNIMPLEMENTED",me[me.INTERNAL=13]="INTERNAL",me[me.UNAVAILABLE=14]="UNAVAILABLE",me[me.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TA(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wA=new zn([4294967295,4294967295],0);function Mf(n){const e=TA().encode(n),t=new fm;return t.update(e),new Uint8Array(t.digest())}function Lf(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new zn([t,r],0),new zn([s,i],0)]}class jl{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Fs(`Invalid padding: ${t}`);if(r<0)throw new Fs(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Fs(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Fs(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=zn.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(zn.fromNumber(r)));return s.compare(wA)===1&&(s=new zn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Mf(e),[r,s]=Lf(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new jl(i,s,t);return r.forEach((c=>a.insert(c))),a}insert(e){if(this.ge===0)return;const t=Mf(e),[r,s]=Lf(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Fs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Ri.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Ia(te.min(),s,new De(he),wn(),fe())}}class Ri{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Ri(r,t,fe(),fe(),fe())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class eg{constructor(e,t){this.targetId=e,this.Ce=t}}class tg{constructor(e,t,r=rt.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Ff{constructor(){this.ve=0,this.Fe=Uf(),this.Me=rt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=fe(),t=fe(),r=fe();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:X(38017,{changeType:i})}})),new Ri(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=Uf()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,ge(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class IA{constructor(e){this.Ge=e,this.ze=new Map,this.je=wn(),this.Je=so(),this.He=so(),this.Ye=new De(he)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:X(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(qc(i))if(r===0){const a=new Y(i.path);this.et(t,a,ze.newNoDocument(a,te.min()))}else ge(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const c=this.ut(e),l=c?this.ct(c,e,a):1;if(l!==0){this.it(t);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,h)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=er(r).toUint8Array()}catch(l){if(l instanceof Am)return is("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new jl(a,s,i)}catch(l){return is(l instanceof Fs?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const a=this.Ge.ht(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,a)=>{const c=this.ot(a);if(c){if(i.current&&qc(c.target)){const l=new Y(c.target.path);this.It(l).has(a)||this.Et(a,l)||this.et(a,l,ze.newNoDocument(l,e))}i.Be&&(t.set(a,i.ke()),i.qe())}}));let r=fe();this.He.forEach(((i,a)=>{let c=!0;a.forEachWhile((l=>{const h=this.ot(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.je.forEach(((i,a)=>a.setReadTime(e)));const s=new Ia(e,t,this.Ye,this.je,r);return this.je=wn(),this.Je=so(),this.He=so(),this.Ye=new De(he),s}Xe(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Ff,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new qe(he),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new qe(he),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||Q("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Ff),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function so(){return new De(Y.comparator)}function Uf(){return new De(Y.comparator)}const AA={asc:"ASCENDING",desc:"DESCENDING"},bA={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},RA={and:"AND",or:"OR"};class SA{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Wc(n,e){return n.useProto3Json||Ii(e)?e:{value:e}}function Ho(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function ng(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function CA(n,e){return Ho(n,e.toTimestamp())}function St(n){return ge(!!n,49232),te.fromTimestamp((function(t){const r=Zn(t);return new Pe(r.seconds,r.nanos)})(n))}function $l(n,e){return Gc(n,e).canonicalString()}function Gc(n,e){const t=(function(s){return new Ie(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function rg(n){const e=Ie.fromString(n);return ge(lg(e),10190,{key:e.toString()}),e}function zo(n,e){return $l(n.databaseId,e.path)}function Xs(n,e){const t=rg(e);if(t.get(1)!==n.databaseId.projectId)throw new q(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new q(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new Y(ig(t))}function sg(n,e){return $l(n.databaseId,e)}function PA(n){const e=rg(n);return e.length===4?Ie.emptyPath():ig(e)}function Kc(n){return new Ie(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function ig(n){return ge(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Bf(n,e,t){return{name:zo(n,e),fields:t.value.mapValue.fields}}function kA(n,e){return"found"in e?(function(r,s){ge(!!s.found,43571),s.found.name,s.found.updateTime;const i=Xs(r,s.found.name),a=St(s.found.updateTime),c=s.found.createTime?St(s.found.createTime):te.min(),l=new yt({mapValue:{fields:s.found.fields}});return ze.newFoundDocument(i,a,c,l)})(n,e):"missing"in e?(function(r,s){ge(!!s.missing,3894),ge(!!s.readTime,22933);const i=Xs(r,s.missing),a=St(s.readTime);return ze.newNoDocument(i,a)})(n,e):X(7234,{result:e})}function VA(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:X(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,d){return h.useProto3Json?(ge(d===void 0||typeof d=="string",58123),rt.fromBase64String(d||"")):(ge(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),rt.fromUint8Array(d||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&(function(h){const d=h.code===void 0?V.UNKNOWN:Zm(h.code);return new q(d,h.message||"")})(a);t=new tg(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Xs(n,r.document.name),i=St(r.document.updateTime),a=r.document.createTime?St(r.document.createTime):te.min(),c=new yt({mapValue:{fields:r.document.fields}}),l=ze.newFoundDocument(s,i,a,c),h=r.targetIds||[],d=r.removedTargetIds||[];t=new Eo(h,d,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Xs(n,r.document),i=r.readTime?St(r.readTime):te.min(),a=ze.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Eo([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Xs(n,r.document),i=r.removedTargetIds||[];t=new Eo([],i,s,null)}else{if(!("filter"in e))return X(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new EA(s,i),c=r.targetId;t=new eg(c,a)}}return t}function og(n,e){let t;if(e instanceof bi)t={update:Bf(n,e.key,e.value)};else if(e instanceof wa)t={delete:zo(n,e.key)};else if(e instanceof ar)t={update:Bf(n,e.key,e.data),updateMask:BA(e.fieldMask)};else{if(!(e instanceof Ym))return X(16599,{Vt:e.type});t={verify:zo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,a){const c=a.transform;if(c instanceof hi)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof fi)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof di)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof qo)return{fieldPath:a.field.canonicalString(),increment:c.Ae};throw X(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:CA(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:X(27497)})(n,e.precondition)),t}function DA(n,e){return n&&n.length>0?(ge(e!==void 0,14353),n.map((t=>(function(s,i){let a=s.updateTime?St(s.updateTime):St(i);return a.isEqual(te.min())&&(a=St(i)),new mA(a,s.transformResults||[])})(t,e)))):[]}function NA(n,e){return{documents:[sg(n,e.path)]}}function OA(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=sg(n,s);const i=(function(h){if(h.length!==0)return cg(Bt.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const a=(function(h){if(h.length!==0)return h.map((d=>(function(g){return{field:qr(g.field),direction:LA(g.dir)}})(d)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=Wc(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{ft:t,parent:s}}function xA(n){let e=PA(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){ge(r===1,65062);const d=t.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];t.where&&(i=(function(p){const g=ag(p);return g instanceof Bt&&Om(g)?g.getFilters():[g]})(t.where));let a=[];t.orderBy&&(a=(function(p){return p.map((g=>(function(C){return new $o(Hr(C.field),(function(O){switch(O){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(C.direction))})(g)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let g;return g=typeof p=="object"?p.value:p,Ii(g)?null:g})(t.limit));let l=null;t.startAt&&(l=(function(p){const g=!!p.before,I=p.values||[];return new jo(I,g)})(t.startAt));let h=null;return t.endAt&&(h=(function(p){const g=!p.before,I=p.values||[];return new jo(I,g)})(t.endAt)),tA(e,s,a,i,c,"F",l,h)}function MA(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return X(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function ag(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Hr(t.unaryFilter.field);return Le.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Hr(t.unaryFilter.field);return Le.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Hr(t.unaryFilter.field);return Le.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Hr(t.unaryFilter.field);return Le.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return X(61313);default:return X(60726)}})(n):n.fieldFilter!==void 0?(function(t){return Le.create(Hr(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return X(58110);default:return X(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return Bt.create(t.compositeFilter.filters.map((r=>ag(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return X(1026)}})(t.compositeFilter.op))})(n):X(30097,{filter:n})}function LA(n){return AA[n]}function FA(n){return bA[n]}function UA(n){return RA[n]}function qr(n){return{fieldPath:n.canonicalString()}}function Hr(n){return nt.fromServerFormat(n.fieldPath)}function cg(n){return n instanceof Le?(function(t){if(t.op==="=="){if(Sf(t.value))return{unaryFilter:{field:qr(t.field),op:"IS_NAN"}};if(Rf(t.value))return{unaryFilter:{field:qr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Sf(t.value))return{unaryFilter:{field:qr(t.field),op:"IS_NOT_NAN"}};if(Rf(t.value))return{unaryFilter:{field:qr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:qr(t.field),op:FA(t.op),value:t.value}}})(n):n instanceof Bt?(function(t){const r=t.getFilters().map((s=>cg(s)));return r.length===1?r[0]:{compositeFilter:{op:UA(t.op),filters:r}}})(n):X(54877,{filter:n})}function BA(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function lg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(e,t,r,s,i=te.min(),a=te.min(),c=rt.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Fn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Fn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Fn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Fn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jA{constructor(e){this.yt=e}}function $A(n){const e=xA({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?zc(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qA{constructor(){this.Cn=new HA}addToCollectionParentIndex(e,t){return this.Cn.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(Xn.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(Xn.min())}updateCollectionGroup(e,t,r){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}}class HA{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new qe(Ie.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new qe(Ie.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},ug=41943040;class Et{static withCacheSize(e){return new Et(e,Et.DEFAULT_COLLECTION_PERCENTILE,Et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Et.DEFAULT_COLLECTION_PERCENTILE=10,Et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Et.DEFAULT=new Et(ug,Et.DEFAULT_COLLECTION_PERCENTILE,Et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Et.DISABLED=new Et(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new ls(0)}static cr(){return new ls(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $f="LruGarbageCollector",zA=1048576;function qf([n,e],[t,r]){const s=he(n,t);return s===0?he(e,r):s}class WA{constructor(e){this.Ir=e,this.buffer=new qe(qf),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();qf(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class GA{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){Q($f,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){gs(t)?Q($f,"Ignoring IndexedDB error during garbage collection: ",t):await ms(t)}await this.Vr(3e5)}))}}class KA{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return D.resolve(ga.ce);const r=new WA(t);return this.mr.forEachTarget(e,(s=>r.Ar(s.sequenceNumber))).next((()=>this.mr.pr(e,(s=>r.Ar(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(Q("LruGarbageCollector","Garbage collection skipped; disabled"),D.resolve(jf)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(Q("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),jf):this.yr(e,t)))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,s,i,a,c,l,h;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(Q("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(e,r,t)))).next((p=>(i=p,l=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(h=Date.now(),jr()<=ue.DEBUG&&Q("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-d}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${p} documents in `+(h-l)+`ms
Total Duration: ${h-d}ms`),D.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function QA(n,e){return new KA(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JA{constructor(){this.changes=new Pr((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ze.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?D.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YA{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XA{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&Ys(r.mutation,s,Rt.empty(),Pe.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,fe()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=fe()){const s=Er();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let a=Ls();return i.forEach(((c,l)=>{a=a.insert(c,l.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const r=Er();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,fe())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((a,c)=>{t.set(a,c)}))}))}computeViews(e,t,r,s){let i=wn();const a=Js(),c=(function(){return Js()})();return t.forEach(((l,h)=>{const d=r.get(h.key);s.has(h.key)&&(d===void 0||d.mutation instanceof ar)?i=i.insert(h.key,h):d!==void 0?(a.set(h.key,d.mutation.getFieldMask()),Ys(d.mutation,h,d.mutation.getFieldMask(),Pe.now())):a.set(h.key,Rt.empty())})),this.recalculateAndSaveOverlays(e,i).next((l=>(l.forEach(((h,d)=>a.set(h,d))),t.forEach(((h,d)=>c.set(h,new YA(d,a.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=Js();let s=new De(((a,c)=>a-c)),i=fe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const c of a)c.keys().forEach((l=>{const h=t.get(l);if(h===null)return;let d=r.get(l)||Rt.empty();d=c.applyToLocalView(h,d),r.set(l,d);const p=(s.get(c.batchId)||fe()).add(l);s=s.insert(c.batchId,p)}))})).next((()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,d=l.value,p=qm();d.forEach((g=>{if(!i.has(g)){const I=Qm(t.get(g),r.get(g));I!==null&&p.set(g,I),i=i.add(g)}})),a.push(this.documentOverlayCache.saveOverlays(e,h,p))}return D.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return(function(a){return Y.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Fm(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):D.resolve(Er());let c=ai,l=i;return a.next((h=>D.forEach(h,((d,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(d)?D.resolve():this.remoteDocumentCache.getEntry(e,d).next((g=>{l=l.insert(d,g)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,l,h,fe()))).next((d=>({batchId:c,changes:$m(d)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new Y(t)).next((r=>{let s=Ls();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Ls();return this.indexManager.getCollectionParents(e,i).next((c=>D.forEach(c,(l=>{const h=(function(p,g){return new Ai(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((d=>{d.forEach(((p,g)=>{a=a.insert(p,g)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((a=>{i.forEach(((l,h)=>{const d=h.getKey();a.get(d)===null&&(a=a.insert(d,ze.newInvalidDocument(d)))}));let c=Ls();return a.forEach(((l,h)=>{const d=i.get(l);d!==void 0&&Ys(d.mutation,h,Rt.empty(),Pe.now()),va(t,h)&&(c=c.insert(l,h))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZA{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return D.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:St(s.createTime)}})(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,(function(s){return{name:s.name,query:$A(s.bundledQuery),readTime:St(s.readTime)}})(t)),D.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eb{constructor(){this.overlays=new De(Y.comparator),this.qr=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Er();return D.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.St(e,t,i)})),D.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(r)),D.resolve()}getOverlaysForCollection(e,t,r){const s=Er(),i=t.length+1,a=new Y(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return D.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new De(((h,d)=>h-d));const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let d=i.get(h.largestBatchId);d===null&&(d=Er(),i=i.insert(h.largestBatchId,d)),d.set(h.getKey(),h)}}const c=Er(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach(((h,d)=>c.set(h,d))),!(c.size()>=s)););return D.resolve(c)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new vA(t,r));let i=this.qr.get(t);i===void 0&&(i=fe(),this.qr.set(t,i)),this.qr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tb{constructor(){this.sessionToken=rt.EMPTY_BYTE_STRING}getSessionToken(e){return D.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,D.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(){this.Qr=new qe(He.$r),this.Ur=new qe(He.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const r=new He(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Gr(new He(e,t))}zr(e,t){e.forEach((r=>this.removeReference(r,t)))}jr(e){const t=new Y(new Ie([])),r=new He(t,e),s=new He(t,e+1),i=[];return this.Ur.forEachInRange([r,s],(a=>{this.Gr(a),i.push(a.key)})),i}Jr(){this.Qr.forEach((e=>this.Gr(e)))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new Y(new Ie([])),r=new He(t,e),s=new He(t,e+1);let i=fe();return this.Ur.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(e){const t=new He(e,0),r=this.Qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class He{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return Y.comparator(e.key,t.key)||he(e.Yr,t.Yr)}static Kr(e,t){return he(e.Yr,t.Yr)||Y.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nb{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new qe(He.$r)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new yA(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.Zr=this.Zr.add(new He(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return D.resolve(a)}lookupMutationBatch(e,t){return D.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.ei(r),i=s<0?0:s;return D.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?Nl:this.tr-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new He(t,0),s=new He(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],(a=>{const c=this.Xr(a.Yr);i.push(c)})),D.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new qe(he);return t.forEach((s=>{const i=new He(s,0),a=new He(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],(c=>{r=r.add(c.Yr)}))})),D.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;Y.isDocumentKey(i)||(i=i.child(""));const a=new He(new Y(i),0);let c=new qe(he);return this.Zr.forEachWhile((l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.Yr)),!0)}),a),D.resolve(this.ti(c))}ti(e){const t=[];return e.forEach((r=>{const s=this.Xr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){ge(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return D.forEach(t.mutations,(s=>{const i=new He(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Zr=r}))}ir(e){}containsKey(e,t){const r=new He(t,0),s=this.Zr.firstAfterOrEqual(r);return D.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rb{constructor(e){this.ri=e,this.docs=(function(){return new De(Y.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return D.resolve(r?r.document.mutableCopy():ze.newInvalidDocument(t))}getEntries(e,t){let r=wn();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():ze.newInvalidDocument(s))})),D.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=wn();const a=t.path,c=new Y(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:d}}=l.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||NI(DI(d),r)<=0||(s.has(d.key)||va(t,d))&&(i=i.insert(d.key,d.mutableCopy()))}return D.resolve(i)}getAllFromCollectionGroup(e,t,r,s){X(9500)}ii(e,t){return D.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new sb(this)}getSize(e){return D.resolve(this.size)}}class sb extends JA{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)})),D.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ib{constructor(e){this.persistence=e,this.si=new Pr((t=>Ml(t)),Ll),this.lastRemoteSnapshotVersion=te.min(),this.highestTargetId=0,this.oi=0,this._i=new ql,this.targetCount=0,this.ai=ls.ur()}forEachTarget(e,t){return this.si.forEach(((r,s)=>t(s))),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),D.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new ls(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.Pr(t),D.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.si.forEach(((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),D.waitFor(i).next((()=>s))}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){const r=this.si.get(t)||null;return D.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),D.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((a=>{i.push(s.markPotentiallyOrphaned(e,a))})),D.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),D.resolve()}getMatchingKeysForTargetId(e,t){const r=this._i.Hr(t);return D.resolve(r)}containsKey(e,t){return D.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hg{constructor(e,t){this.ui={},this.overlays={},this.ci=new ga(0),this.li=!1,this.li=!0,this.hi=new tb,this.referenceDelegate=e(this),this.Pi=new ib(this),this.indexManager=new qA,this.remoteDocumentCache=(function(s){return new rb(s)})((r=>this.referenceDelegate.Ti(r))),this.serializer=new jA(t),this.Ii=new ZA(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new eb,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new nb(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){Q("MemoryPersistence","Starting transaction:",e);const s=new ob(this.ci.next());return this.referenceDelegate.Ei(),r(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ai(e,t){return D.or(Object.values(this.ui).map((r=>()=>r.containsKey(e,t))))}}class ob extends xI{constructor(e){super(),this.currentSequenceNumber=e}}class Hl{constructor(e){this.persistence=e,this.Ri=new ql,this.Vi=null}static mi(e){return new Hl(e)}get fi(){if(this.Vi)return this.Vi;throw X(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),D.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),D.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach((s=>this.fi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.fi.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.fi,(r=>{const s=Y.fromPath(r);return this.gi(e,s).next((i=>{i||t.removeEntry(s,te.min())}))})).next((()=>(this.Vi=null,t.apply(e))))}updateLimboDocument(e,t){return this.gi(e,t).next((r=>{r?this.fi.delete(t.toString()):this.fi.add(t.toString())}))}Ti(e){return 0}gi(e,t){return D.or([()=>D.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Wo{constructor(e,t){this.persistence=e,this.pi=new Pr((r=>FI(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=QA(this,t)}static mi(e,t){return new Wo(e,t)}Ei(){}di(e){return D.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}wr(e){let t=0;return this.pr(e,(r=>{t++})).next((()=>t))}pr(e,t){return D.forEach(this.pi,((r,s)=>this.br(e,r,s).next((i=>i?D.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,(a=>this.br(e,a,t).next((c=>{c||(r++,i.removeEntry(a,te.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),D.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),D.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),D.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),D.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=_o(e.data.value)),t}br(e,t,r){return D.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return D.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=s}static As(e,t){let r=fe(),s=fe();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new zl(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ab{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cb{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return tE()?8:MI(dt())>0?6:4})()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ys(e,t).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.ws(e,t,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new ab;return this.Ss(e,t,a).next((c=>{if(i.result=c,this.Vs)return this.bs(e,t,a,c.size)}))})).next((()=>i.result))}bs(e,t,r,s){return r.documentReadCount<this.fs?(jr()<=ue.DEBUG&&Q("QueryEngine","SDK will not create cache indexes for query:",$r(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),D.resolve()):(jr()<=ue.DEBUG&&Q("QueryEngine","Query:",$r(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(jr()<=ue.DEBUG&&Q("QueryEngine","The SDK decides to create cache indexes for query:",$r(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Yt(t))):D.resolve())}ys(e,t){if(Vf(t))return D.resolve(null);let r=Yt(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=zc(t,null,"F"),r=Yt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const a=fe(...i);return this.ps.getDocuments(e,a).next((c=>this.indexManager.getMinOffset(e,r).next((l=>{const h=this.Ds(t,c);return this.Cs(t,h,a,l.readTime)?this.ys(e,zc(t,null,"F")):this.vs(e,h,t,l)}))))})))))}ws(e,t,r,s){return Vf(t)||s.isEqual(te.min())?D.resolve(null):this.ps.getDocuments(e,r).next((i=>{const a=this.Ds(t,i);return this.Cs(t,a,r,s)?D.resolve(null):(jr()<=ue.DEBUG&&Q("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),$r(t)),this.vs(e,a,t,VI(s,ai)).next((c=>c)))}))}Ds(e,t){let r=new qe(Bm(e));return t.forEach(((s,i)=>{va(e,i)&&(r=r.add(i))})),r}Cs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,t,r){return jr()<=ue.DEBUG&&Q("QueryEngine","Using full collection scan to execute query:",$r(t)),this.ps.getDocumentsMatchingQuery(e,t,Xn.min(),r)}vs(e,t,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wl="LocalStore",lb=3e8;class ub{constructor(e,t,r,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new De(he),this.xs=new Pr((i=>Ml(i)),Ll),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new XA(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Ms)))}}function hb(n,e,t,r){return new ub(n,e,t,r)}async function fg(n,e){const t=ie(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const a=[],c=[];let l=fe();for(const h of s){a.push(h.batchId);for(const d of h.mutations)l=l.add(d.key)}for(const h of i){c.push(h.batchId);for(const d of h.mutations)l=l.add(d.key)}return t.localDocuments.getDocuments(r,l).next((h=>({Ls:h,removedBatchIds:a,addedBatchIds:c})))}))}))}function fb(n,e){const t=ie(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return(function(c,l,h,d){const p=h.batch,g=p.keys();let I=D.resolve();return g.forEach((C=>{I=I.next((()=>d.getEntry(l,C))).next((N=>{const O=h.docVersions.get(C);ge(O!==null,48541),N.version.compareTo(O)<0&&(p.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),d.addEntry(N)))}))})),I.next((()=>c.mutationQueue.removeMutationBatch(l,p)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let l=fe();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function dg(n){const e=ie(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Pi.getLastRemoteSnapshotVersion(t)))}function db(n,e){const t=ie(n),r=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const c=[];e.targetChanges.forEach(((d,p)=>{const g=s.get(p);if(!g)return;c.push(t.Pi.removeMatchingKeys(i,d.removedDocuments,p).next((()=>t.Pi.addMatchingKeys(i,d.addedDocuments,p))));let I=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?I=I.withResumeToken(rt.EMPTY_BYTE_STRING,te.min()).withLastLimboFreeSnapshotVersion(te.min()):d.resumeToken.approximateByteSize()>0&&(I=I.withResumeToken(d.resumeToken,r)),s=s.insert(p,I),(function(N,O,H){return N.resumeToken.approximateByteSize()===0||O.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=lb?!0:H.addedDocuments.size+H.modifiedDocuments.size+H.removedDocuments.size>0})(g,I,d)&&c.push(t.Pi.updateTargetData(i,I))}));let l=wn(),h=fe();if(e.documentUpdates.forEach((d=>{e.resolvedLimboDocuments.has(d)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,d))})),c.push(pb(i,a,e.documentUpdates).next((d=>{l=d.ks,h=d.qs}))),!r.isEqual(te.min())){const d=t.Pi.getLastRemoteSnapshotVersion(i).next((p=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(d)}return D.waitFor(c).next((()=>a.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,l,h))).next((()=>l))})).then((i=>(t.Ms=s,i)))}function pb(n,e,t){let r=fe(),s=fe();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let a=wn();return t.forEach(((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(te.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):Q(Wl,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)})),{ks:a,qs:s}}))}function mb(n,e){const t=ie(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Nl),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function gb(n,e){const t=ie(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.Pi.getTargetData(r,e).next((i=>i?(s=i,D.resolve(s)):t.Pi.allocateTargetId(r).next((a=>(s=new Fn(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Pi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(r.targetId,r),t.xs.set(e,r.targetId)),r}))}async function Qc(n,e,t){const r=ie(n),s=r.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!gs(a))throw a;Q(Wl,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function Hf(n,e,t){const r=ie(n);let s=te.min(),i=fe();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(l,h,d){const p=ie(l),g=p.xs.get(d);return g!==void 0?D.resolve(p.Ms.get(g)):p.Pi.getTargetData(h,d)})(r,a,Yt(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,c.targetId).next((l=>{i=l}))})).next((()=>r.Fs.getDocumentsMatchingQuery(a,e,t?s:te.min(),t?i:fe()))).next((c=>(_b(r,rA(e),c),{documents:c,Qs:i})))))}function _b(n,e,t){let r=n.Os.get(e)||te.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Os.set(e,r)}class zf{constructor(){this.activeTargetIds=lA()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class yb{constructor(){this.Mo=new zf,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new zf,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vb{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wf="ConnectivityMonitor";class Gf{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){Q(Wf,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){Q(Wf,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let io=null;function Jc(){return io===null?io=(function(){return 268435456+Math.round(2147483648*Math.random())})():io++,"0x"+io.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pc="RestConnection",Eb={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Tb{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===Uo?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,t,r,s,i){const a=Jc(),c=this.zo(e,t.toUriEncodedString());Q(pc,`Sending RPC '${e}' ${a}:`,c,r);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(l,s,i);const{host:h}=new URL(c),d=hs(h);return this.Jo(e,c,l,r,d).then((p=>(Q(pc,`Received RPC '${e}' ${a}: `,p),p)),(p=>{throw is(pc,`RPC '${e}' ${a} failed with error: `,p,"url: ",c,"request:",r),p}))}Ho(e,t,r,s,i,a){return this.Go(e,t,r,s,i)}jo(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+ps})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}zo(e,t){const r=Eb[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wb{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ct="WebChannelConnection";class Ib extends Tb{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,s,i){const a=Jc();return new Promise(((c,l)=>{const h=new dm;h.setWithCredentials(!0),h.listenOnce(pm.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case go.NO_ERROR:const p=h.getResponseJson();Q(ct,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),c(p);break;case go.TIMEOUT:Q(ct,`RPC '${e}' ${a} timed out`),l(new q(V.DEADLINE_EXCEEDED,"Request time out"));break;case go.HTTP_ERROR:const g=h.getStatus();if(Q(ct,`RPC '${e}' ${a} failed with status:`,g,"response text:",h.getResponseText()),g>0){let I=h.getResponseJson();Array.isArray(I)&&(I=I[0]);const C=I?.error;if(C&&C.status&&C.message){const N=(function(H){const W=H.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(W)>=0?W:V.UNKNOWN})(C.status);l(new q(N,C.message))}else l(new q(V.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new q(V.UNAVAILABLE,"Connection failed."));break;default:X(9055,{l_:e,streamId:a,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{Q(ct,`RPC '${e}' ${a} completed.`)}}));const d=JSON.stringify(s);Q(ct,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",d,r,15)}))}T_(e,t,r){const s=Jc(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=_m(),c=gm(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.jo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const d=i.join("");Q(ct,`Creating RPC '${e}' stream ${s}: ${d}`,l);const p=a.createWebChannel(d,l);this.I_(p);let g=!1,I=!1;const C=new wb({Yo:O=>{I?Q(ct,`Not sending because RPC '${e}' stream ${s} is closed:`,O):(g||(Q(ct,`Opening RPC '${e}' stream ${s} transport.`),p.open(),g=!0),Q(ct,`RPC '${e}' stream ${s} sending:`,O),p.send(O))},Zo:()=>p.close()}),N=(O,H,W)=>{O.listen(H,(G=>{try{W(G)}catch(K){setTimeout((()=>{throw K}),0)}}))};return N(p,Ms.EventType.OPEN,(()=>{I||(Q(ct,`RPC '${e}' stream ${s} transport opened.`),C.o_())})),N(p,Ms.EventType.CLOSE,(()=>{I||(I=!0,Q(ct,`RPC '${e}' stream ${s} transport closed`),C.a_(),this.E_(p))})),N(p,Ms.EventType.ERROR,(O=>{I||(I=!0,is(ct,`RPC '${e}' stream ${s} transport errored. Name:`,O.name,"Message:",O.message),C.a_(new q(V.UNAVAILABLE,"The operation could not be completed")))})),N(p,Ms.EventType.MESSAGE,(O=>{if(!I){const H=O.data[0];ge(!!H,16349);const W=H,G=W?.error||W[0]?.error;if(G){Q(ct,`RPC '${e}' stream ${s} received error:`,G);const K=G.status;let de=(function(y){const _=Me[y];if(_!==void 0)return Zm(_)})(K),le=G.message;de===void 0&&(de=V.INTERNAL,le="Unknown error status: "+K+" with message "+G.message),I=!0,C.a_(new q(de,le)),p.close()}else Q(ct,`RPC '${e}' stream ${s} received:`,H),C.u_(H)}})),N(c,mm.STAT_EVENT,(O=>{O.stat===Fc.PROXY?Q(ct,`RPC '${e}' stream ${s} detected buffering proxy`):O.stat===Fc.NOPROXY&&Q(ct,`RPC '${e}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{C.__()}),0),C}terminate(){this.c_.forEach((e=>e.close())),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter((t=>t===e))}}function mc(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Aa(n){return new SA(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&Q("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kf="PersistentStream";class pg{constructor(e,t,r,s,i,a,c,l){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Gl(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===V.RESOURCE_EXHAUSTED?(Tn(t.toString()),Tn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===t&&this.G_(r,s)}),(r=>{e((()=>{const s=new q(V.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(e,t){const r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo((()=>{r((()=>this.listener.Xo()))})),this.stream.t_((()=>{r((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return Q(Kf,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget((()=>this.D_===e?t():(Q(Kf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Ab extends pg{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=VA(this.serializer,e),r=(function(i){if(!("targetChange"in i))return te.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?te.min():a.readTime?St(a.readTime):te.min()})(e);return this.listener.H_(t,r)}Y_(e){const t={};t.database=Kc(this.serializer),t.addTarget=(function(i,a){let c;const l=a.target;if(c=qc(l)?{documents:NA(i,l)}:{query:OA(i,l).ft},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=ng(i,a.resumeToken);const h=Wc(i,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(te.min())>0){c.readTime=Ho(i,a.snapshotVersion.toTimestamp());const h=Wc(i,a.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const r=MA(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){const t={};t.database=Kc(this.serializer),t.removeTarget=e,this.q_(t)}}class bb extends pg{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return ge(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ge(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){ge(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=DA(e.writeResults,e.commitTime),r=St(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=Kc(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>og(this.serializer,r)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rb{}class Sb extends Rb{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new q(V.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.Go(e,Gc(t,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new q(V.UNKNOWN,i.toString())}))}Ho(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,c])=>this.connection.Ho(e,Gc(t,r),s,a,c,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new q(V.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class Cb{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Tn(t),this.aa=!1):Q("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sr="RemoteStore";class Pb{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((a=>{r.enqueueAndForget((async()=>{kr(this)&&(Q(Sr,"Restarting streams for network reachability change."),await(async function(l){const h=ie(l);h.Ea.add(4),await Si(h),h.Ra.set("Unknown"),h.Ea.delete(4),await ba(h)})(this))}))})),this.Ra=new Cb(r,s)}}async function ba(n){if(kr(n))for(const e of n.da)await e(!0)}async function Si(n){for(const e of n.da)await e(!1)}function mg(n,e){const t=ie(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Yl(t)?Jl(t):_s(t).O_()&&Ql(t,e))}function Kl(n,e){const t=ie(n),r=_s(t);t.Ia.delete(e),r.O_()&&gg(t,e),t.Ia.size===0&&(r.O_()?r.L_():kr(t)&&t.Ra.set("Unknown"))}function Ql(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(te.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}_s(n).Y_(e)}function gg(n,e){n.Va.Ue(e),_s(n).Z_(e)}function Jl(n){n.Va=new IA({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),_s(n).start(),n.Ra.ua()}function Yl(n){return kr(n)&&!_s(n).x_()&&n.Ia.size>0}function kr(n){return ie(n).Ea.size===0}function _g(n){n.Va=void 0}async function kb(n){n.Ra.set("Online")}async function Vb(n){n.Ia.forEach(((e,t)=>{Ql(n,e)}))}async function Db(n,e){_g(n),Yl(n)?(n.Ra.ha(e),Jl(n)):n.Ra.set("Unknown")}async function Nb(n,e,t){if(n.Ra.set("Online"),e instanceof tg&&e.state===2&&e.cause)try{await(async function(s,i){const a=i.cause;for(const c of i.targetIds)s.Ia.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.Ia.delete(c),s.Va.removeTarget(c))})(n,e)}catch(r){Q(Sr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Go(n,r)}else if(e instanceof Eo?n.Va.Ze(e):e instanceof eg?n.Va.st(e):n.Va.tt(e),!t.isEqual(te.min()))try{const r=await dg(n.localStore);t.compareTo(r)>=0&&await(function(i,a){const c=i.Va.Tt(a);return c.targetChanges.forEach(((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const d=i.Ia.get(h);d&&i.Ia.set(h,d.withResumeToken(l.resumeToken,a))}})),c.targetMismatches.forEach(((l,h)=>{const d=i.Ia.get(l);if(!d)return;i.Ia.set(l,d.withResumeToken(rt.EMPTY_BYTE_STRING,d.snapshotVersion)),gg(i,l);const p=new Fn(d.target,l,h,d.sequenceNumber);Ql(i,p)})),i.remoteSyncer.applyRemoteEvent(c)})(n,t)}catch(r){Q(Sr,"Failed to raise snapshot:",r),await Go(n,r)}}async function Go(n,e,t){if(!gs(e))throw e;n.Ea.add(1),await Si(n),n.Ra.set("Offline"),t||(t=()=>dg(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{Q(Sr,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await ba(n)}))}function yg(n,e){return e().catch((t=>Go(n,t,e)))}async function Ra(n){const e=ie(n),t=nr(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Nl;for(;Ob(e);)try{const s=await mb(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,xb(e,s)}catch(s){await Go(e,s)}vg(e)&&Eg(e)}function Ob(n){return kr(n)&&n.Ta.length<10}function xb(n,e){n.Ta.push(e);const t=nr(n);t.O_()&&t.X_&&t.ea(e.mutations)}function vg(n){return kr(n)&&!nr(n).x_()&&n.Ta.length>0}function Eg(n){nr(n).start()}async function Mb(n){nr(n).ra()}async function Lb(n){const e=nr(n);for(const t of n.Ta)e.ea(t.mutations)}async function Fb(n,e,t){const r=n.Ta.shift(),s=Bl.from(r,e,t);await yg(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Ra(n)}async function Ub(n,e){e&&nr(n).X_&&await(async function(r,s){if((function(a){return Xm(a)&&a!==V.ABORTED})(s.code)){const i=r.Ta.shift();nr(r).B_(),await yg(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Ra(r)}})(n,e),vg(n)&&Eg(n)}async function Qf(n,e){const t=ie(n);t.asyncQueue.verifyOperationInProgress(),Q(Sr,"RemoteStore received new credentials");const r=kr(t);t.Ea.add(3),await Si(t),r&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await ba(t)}async function Bb(n,e){const t=ie(n);e?(t.Ea.delete(2),await ba(t)):e||(t.Ea.add(2),await Si(t),t.Ra.set("Unknown"))}function _s(n){return n.ma||(n.ma=(function(t,r,s){const i=ie(t);return i.sa(),new Ab(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:kb.bind(null,n),t_:Vb.bind(null,n),r_:Db.bind(null,n),H_:Nb.bind(null,n)}),n.da.push((async e=>{e?(n.ma.B_(),Yl(n)?Jl(n):n.Ra.set("Unknown")):(await n.ma.stop(),_g(n))}))),n.ma}function nr(n){return n.fa||(n.fa=(function(t,r,s){const i=ie(t);return i.sa(),new bb(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:Mb.bind(null,n),r_:Ub.bind(null,n),ta:Lb.bind(null,n),na:Fb.bind(null,n)}),n.da.push((async e=>{e?(n.fa.B_(),await Ra(n)):(await n.fa.stop(),n.Ta.length>0&&(Q(Sr,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new mn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new Xl(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new q(V.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Zl(n,e){if(Tn("AsyncQueue",`${e}: ${n}`),gs(n))return new q(V.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{static emptySet(e){return new ns(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||Y.comparator(t.key,r.key):(t,r)=>Y.comparator(t.key,r.key),this.keyedMap=Ls(),this.sortedSet=new De(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof ns)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new ns;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{constructor(){this.ga=new De(Y.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):X(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,r)=>{e.push(r)})),e}}class us{constructor(e,t,r,s,i,a,c,l,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach((c=>{a.push({type:0,doc:c})})),new us(e,t,ns.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ya(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jb{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class $b{constructor(){this.queries=Yf(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=ie(t),i=s.queries;s.queries=Yf(),i.forEach(((a,c)=>{for(const l of c.Sa)l.onError(r)}))})(this,new q(V.ABORTED,"Firestore shutting down"))}}function Yf(){return new Pr((n=>Um(n)),ya)}async function Tg(n,e){const t=ie(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new jb,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=Zl(a,`Initialization of query '${$r(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&eu(t)}async function wg(n,e){const t=ie(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function qb(n,e){const t=ie(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.Sa)c.Fa(s)&&(r=!0);a.wa=s}}r&&eu(t)}function Hb(n,e,t){const r=ie(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function eu(n){n.Ca.forEach((e=>{e.next()}))}var Yc,Xf;(Xf=Yc||(Yc={})).Ma="default",Xf.Cache="cache";class Ig{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new us(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=us.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Yc.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ag{constructor(e){this.key=e}}class bg{constructor(e){this.key=e}}class zb{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=fe(),this.mutatedKeys=fe(),this.eu=Bm(e),this.tu=new ns(this.eu)}get nu(){return this.Ya}ru(e,t){const r=t?t.iu:new Jf,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((d,p)=>{const g=s.get(d),I=va(this.query,p)?p:null,C=!!g&&this.mutatedKeys.has(g.key),N=!!I&&(I.hasLocalMutations||this.mutatedKeys.has(I.key)&&I.hasCommittedMutations);let O=!1;g&&I?g.data.isEqual(I.data)?C!==N&&(r.track({type:3,doc:I}),O=!0):this.su(g,I)||(r.track({type:2,doc:I}),O=!0,(l&&this.eu(I,l)>0||h&&this.eu(I,h)<0)&&(c=!0)):!g&&I?(r.track({type:0,doc:I}),O=!0):g&&!I&&(r.track({type:1,doc:g}),O=!0,(l||h)&&(c=!0)),O&&(I?(a=a.add(I),i=N?i.add(d):i.delete(d)):(a=a.delete(d),i=i.delete(d)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const d=this.query.limitType==="F"?a.last():a.first();a=a.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{tu:a,iu:r,Cs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort(((d,p)=>(function(I,C){const N=O=>{switch(O){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return X(20277,{Rt:O})}};return N(I)-N(C)})(d.type,p.type)||this.eu(d.doc,p.doc))),this.ou(r),s=s??!1;const c=t&&!s?this._u():[],l=this.Xa.size===0&&this.current&&!s?1:0,h=l!==this.Za;return this.Za=l,a.length!==0||h?{snapshot:new us(this.query,e.tu,i,a,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Jf,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Ya=this.Ya.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ya=this.Ya.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=fe(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))}));const t=[];return e.forEach((r=>{this.Xa.has(r)||t.push(new bg(r))})),this.Xa.forEach((r=>{e.has(r)||t.push(new Ag(r))})),t}cu(e){this.Ya=e.Qs,this.Xa=fe();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return us.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const tu="SyncEngine";class Wb{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Gb{constructor(e){this.key=e,this.hu=!1}}class Kb{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new Pr((c=>Um(c)),ya),this.Iu=new Map,this.Eu=new Set,this.du=new De(Y.comparator),this.Au=new Map,this.Ru=new ql,this.Vu={},this.mu=new Map,this.fu=ls.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Qb(n,e,t=!0){const r=Vg(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Rg(r,e,t,!0),s}async function Jb(n,e){const t=Vg(n);await Rg(t,e,!0,!1)}async function Rg(n,e,t,r){const s=await gb(n.localStore,Yt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await Yb(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&mg(n.remoteStore,s),c}async function Yb(n,e,t,r,s){n.pu=(p,g,I)=>(async function(N,O,H,W){let G=O.view.ru(H);G.Cs&&(G=await Hf(N.localStore,O.query,!1).then((({documents:A})=>O.view.ru(A,G))));const K=W&&W.targetChanges.get(O.targetId),de=W&&W.targetMismatches.get(O.targetId)!=null,le=O.view.applyChanges(G,N.isPrimaryClient,K,de);return ed(N,O.targetId,le.au),le.snapshot})(n,p,g,I);const i=await Hf(n.localStore,e,!0),a=new zb(e,i.Qs),c=a.ru(i.documents),l=Ri.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(c,n.isPrimaryClient,l);ed(n,t,h.au);const d=new Wb(e,t,a);return n.Tu.set(e,d),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),h.snapshot}async function Xb(n,e,t){const r=ie(n),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter((a=>!ya(a,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Qc(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Kl(r.remoteStore,s.targetId),Xc(r,s.targetId)})).catch(ms)):(Xc(r,s.targetId),await Qc(r.localStore,s.targetId,!0))}async function Zb(n,e){const t=ie(n),r=t.Tu.get(e),s=t.Iu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Kl(t.remoteStore,r.targetId))}async function eR(n,e,t){const r=aR(n);try{const s=await(function(a,c){const l=ie(a),h=Pe.now(),d=c.reduce(((I,C)=>I.add(C.key)),fe());let p,g;return l.persistence.runTransaction("Locally write mutations","readwrite",(I=>{let C=wn(),N=fe();return l.Ns.getEntries(I,d).next((O=>{C=O,C.forEach(((H,W)=>{W.isValidDocument()||(N=N.add(H))}))})).next((()=>l.localDocuments.getOverlayedDocuments(I,C))).next((O=>{p=O;const H=[];for(const W of c){const G=_A(W,p.get(W.key).overlayedDocument);G!=null&&H.push(new ar(W.key,G,Vm(G.value.mapValue),We.exists(!0)))}return l.mutationQueue.addMutationBatch(I,h,H,c)})).next((O=>{g=O;const H=O.applyToLocalDocumentSet(p,N);return l.documentOverlayCache.saveOverlays(I,O.batchId,H)}))})).then((()=>({batchId:g.batchId,changes:$m(p)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(a,c,l){let h=a.Vu[a.currentUser.toKey()];h||(h=new De(he)),h=h.insert(c,l),a.Vu[a.currentUser.toKey()]=h})(r,s.batchId,t),await Ci(r,s.changes),await Ra(r.remoteStore)}catch(s){const i=Zl(s,"Failed to persist write");t.reject(i)}}async function Sg(n,e){const t=ie(n);try{const r=await db(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const a=t.Au.get(i);a&&(ge(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?ge(a.hu,14607):s.removedDocuments.size>0&&(ge(a.hu,42227),a.hu=!1))})),await Ci(t,r,e)}catch(r){await ms(r)}}function Zf(n,e,t){const r=ie(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach(((i,a)=>{const c=a.view.va(e);c.snapshot&&s.push(c.snapshot)})),(function(a,c){const l=ie(a);l.onlineState=c;let h=!1;l.queries.forEach(((d,p)=>{for(const g of p.Sa)g.va(c)&&(h=!0)})),h&&eu(l)})(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function tR(n,e,t){const r=ie(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let a=new De(Y.comparator);a=a.insert(i,ze.newNoDocument(i,te.min()));const c=fe().add(i),l=new Ia(te.min(),new Map,new De(he),a,c);await Sg(r,l),r.du=r.du.remove(i),r.Au.delete(e),nu(r)}else await Qc(r.localStore,e,!1).then((()=>Xc(r,e,t))).catch(ms)}async function nR(n,e){const t=ie(n),r=e.batch.batchId;try{const s=await fb(t.localStore,e);Pg(t,r,null),Cg(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Ci(t,s)}catch(s){await ms(s)}}async function rR(n,e,t){const r=ie(n);try{const s=await(function(a,c){const l=ie(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let d;return l.mutationQueue.lookupMutationBatch(h,c).next((p=>(ge(p!==null,37113),d=p.keys(),l.mutationQueue.removeMutationBatch(h,p)))).next((()=>l.mutationQueue.performConsistencyCheck(h))).next((()=>l.documentOverlayCache.removeOverlaysForBatchId(h,d,c))).next((()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,d))).next((()=>l.localDocuments.getDocuments(h,d)))}))})(r.localStore,e);Pg(r,e,t),Cg(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Ci(r,s)}catch(s){await ms(s)}}function Cg(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function Pg(n,e,t){const r=ie(n);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function Xc(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach((r=>{n.Ru.containsKey(r)||kg(n,r)}))}function kg(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Kl(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),nu(n))}function ed(n,e,t){for(const r of t)r instanceof Ag?(n.Ru.addReference(r.key,e),sR(n,r)):r instanceof bg?(Q(tu,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,e),n.Ru.containsKey(r.key)||kg(n,r.key)):X(19791,{wu:r})}function sR(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Eu.has(r)||(Q(tu,"New document in limbo: "+t),n.Eu.add(r),nu(n))}function nu(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new Y(Ie.fromString(e)),r=n.fu.next();n.Au.set(r,new Gb(t)),n.du=n.du.insert(t,r),mg(n.remoteStore,new Fn(Yt(Fl(t.path)),r,"TargetPurposeLimboResolution",ga.ce))}}async function Ci(n,e,t){const r=ie(n),s=[],i=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach(((c,l)=>{a.push(r.pu(l,e,t).then((h=>{if((h||t)&&r.isPrimaryClient){const d=h?!h.fromCache:t?.targetChanges.get(l.targetId)?.current;r.sharedClientState.updateQueryState(l.targetId,d?"current":"not-current")}if(h){s.push(h);const d=zl.As(l.targetId,h);i.push(d)}})))})),await Promise.all(a),r.Pu.H_(s),await(async function(l,h){const d=ie(l);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>D.forEach(h,(g=>D.forEach(g.Es,(I=>d.persistence.referenceDelegate.addReference(p,g.targetId,I))).next((()=>D.forEach(g.ds,(I=>d.persistence.referenceDelegate.removeReference(p,g.targetId,I)))))))))}catch(p){if(!gs(p))throw p;Q(Wl,"Failed to update sequence numbers: "+p)}for(const p of h){const g=p.targetId;if(!p.fromCache){const I=d.Ms.get(g),C=I.snapshotVersion,N=I.withLastLimboFreeSnapshotVersion(C);d.Ms=d.Ms.insert(g,N)}}})(r.localStore,i))}async function iR(n,e){const t=ie(n);if(!t.currentUser.isEqual(e)){Q(tu,"User change. New user:",e.toKey());const r=await fg(t.localStore,e);t.currentUser=e,(function(i,a){i.mu.forEach((c=>{c.forEach((l=>{l.reject(new q(V.CANCELLED,a))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ci(t,r.Ls)}}function oR(n,e){const t=ie(n),r=t.Au.get(e);if(r&&r.hu)return fe().add(r.key);{let s=fe();const i=t.Iu.get(e);if(!i)return s;for(const a of i){const c=t.Tu.get(a);s=s.unionWith(c.view.nu)}return s}}function Vg(n){const e=ie(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Sg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=oR.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=tR.bind(null,e),e.Pu.H_=qb.bind(null,e.eventManager),e.Pu.yu=Hb.bind(null,e.eventManager),e}function aR(n){const e=ie(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=nR.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=rR.bind(null,e),e}class Ko{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Aa(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return hb(this.persistence,new cb,e.initialUser,this.serializer)}Cu(e){return new hg(Hl.mi,this.serializer)}Du(e){return new yb}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ko.provider={build:()=>new Ko};class cR extends Ko{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){ge(this.persistence.referenceDelegate instanceof Wo,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new GA(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Et.withCacheSize(this.cacheSizeBytes):Et.DEFAULT;return new hg((r=>Wo.mi(r,t)),this.serializer)}}class Zc{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Zf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=iR.bind(null,this.syncEngine),await Bb(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new $b})()}createDatastore(e){const t=Aa(e.databaseInfo.databaseId),r=(function(i){return new Ib(i)})(e.databaseInfo);return(function(i,a,c,l){return new Sb(i,a,c,l)})(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,a,c){return new Pb(r,s,i,a,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Zf(this.syncEngine,t,0)),(function(){return Gf.v()?new Gf:new vb})())}createSyncEngine(e,t){return(function(s,i,a,c,l,h,d){const p=new Kb(s,i,a,c,l,h);return d&&(p.gu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const r=ie(t);Q(Sr,"RemoteStore shutting down."),r.Ea.add(5),await Si(r),r.Aa.shutdown(),r.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Zc.provider={build:()=>new Zc};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dg{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Tn("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lR{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new q(V.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(s,i){const a=ie(s),c={documents:i.map((p=>zo(a.serializer,p)))},l=await a.Ho("BatchGetDocuments",a.serializer.databaseId,Ie.emptyPath(),c,i.length),h=new Map;l.forEach((p=>{const g=kA(a.serializer,p);h.set(g.key.toString(),g)}));const d=[];return i.forEach((p=>{const g=h.get(p.toString());ge(!!g,55234,{key:p}),d.push(g)})),d})(this.datastore,e);return t.forEach((r=>this.recordVersion(r))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new wa(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,r)=>{const s=Y.fromPath(r);this.mutations.push(new Ym(s,this.precondition(s)))})),await(async function(r,s){const i=ie(r),a={writes:s.map((c=>og(i.serializer,c)))};await i.Go("Commit",i.serializer.databaseId,Ie.emptyPath(),a)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw X(50498,{Gu:e.constructor.name});t=te.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new q(V.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(te.min())?We.exists(!1):We.updateTime(t):We.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(te.min()))throw new q(V.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return We.updateTime(t)}return We.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uR{constructor(e,t,r,s,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=s,this.deferred=i,this.zu=r.maxAttempts,this.M_=new Gl(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_((async()=>{const e=new lR(this.datastore),t=this.Hu(e);t&&t.then((r=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(r)})).catch((s=>{this.Yu(s)}))))})).catch((r=>{this.Yu(r)}))}))}Hu(e){try{const t=this.updateFunction(e);return!Ii(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Yu(e){this.zu>0&&this.Zu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget((()=>(this.Ju(),Promise.resolve())))):this.deferred.reject(e)}Zu(e){if(e?.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!Xm(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rr="FirestoreClient";class hR{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=lt.UNAUTHENTICATED,this.clientId=Dl.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{Q(rr,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(Q(rr,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new mn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Zl(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function gc(n,e){n.asyncQueue.verifyOperationInProgress(),Q(rr,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await fg(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function td(n,e){n.asyncQueue.verifyOperationInProgress();const t=await fR(n);Q(rr,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>Qf(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Qf(e.remoteStore,s))),n._onlineComponents=e}async function fR(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){Q(rr,"Using user provided OfflineComponentProvider");try{await gc(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===V.FAILED_PRECONDITION||s.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;is("Error using user provided cache. Falling back to memory cache: "+t),await gc(n,new Ko)}}else Q(rr,"Using default OfflineComponentProvider"),await gc(n,new cR(void 0));return n._offlineComponents}async function ru(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(Q(rr,"Using user provided OnlineComponentProvider"),await td(n,n._uninitializedComponentsProvider._online)):(Q(rr,"Using default OnlineComponentProvider"),await td(n,new Zc))),n._onlineComponents}function dR(n){return ru(n).then((e=>e.syncEngine))}function pR(n){return ru(n).then((e=>e.datastore))}async function el(n){const e=await ru(n),t=e.eventManager;return t.onListen=Qb.bind(null,e.syncEngine),t.onUnlisten=Xb.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Jb.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Zb.bind(null,e.syncEngine),t}function mR(n,e,t={}){const r=new mn;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,l,h){const d=new Dg({next:g=>{d.Nu(),a.enqueueAndForget((()=>wg(i,p))),g.fromCache&&l.source==="server"?h.reject(new q(V.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new Ig(c,d,{includeMetadataChanges:!0,qa:!0});return Tg(i,p)})(await el(n),n.asyncQueue,e,t,r))),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ng(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nd=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Og="firestore.googleapis.com",rd=!0;class sd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new q(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Og,this.ssl=rd}else this.host=e.host,this.ssl=e.ssl??rd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=ug;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<zA)throw new q(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}kI("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ng(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new q(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new q(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new q(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Sa{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new sd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new q(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new q(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new sd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new EI;switch(r.type){case"firstParty":return new AI(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new q(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=nd.get(t);r&&(Q("ComponentProvider","Removing Datastore"),nd.delete(t),r.terminate())})(this),Promise.resolve()}}function gR(n,e,t,r={}){n=Ut(n,Sa);const s=hs(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&(Rp(`https://${c}`),Sp("Firestore",!0)),i.host!==Og&&i.host!==c&&is("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...i,host:c,ssl:s,emulatorOptions:r};if(!Ir(l,a)&&(n._setSettings(l),r.mockUserToken)){let h,d;if(typeof r.mockUserToken=="string")h=r.mockUserToken,d=lt.MOCK_USER;else{h=Wv(r.mockUserToken,n._app?.options.projectId);const p=r.mockUserToken.sub||r.mockUserToken.user_id;if(!p)throw new q(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new lt(p)}n._authCredentials=new TI(new vm(h,d))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Vr(this.firestore,e,this._query)}}class xe{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Wn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new xe(this.firestore,e,this._key)}toJSON(){return{type:xe._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(wi(t,xe._jsonSchema))return new xe(e,r||null,new Y(Ie.fromString(t.referencePath)))}}xe._jsonSchemaVersion="firestore/documentReference/1.0",xe._jsonSchema={type:Fe("string",xe._jsonSchemaVersion),referencePath:Fe("string")};class Wn extends Vr{constructor(e,t,r){super(e,t,Fl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new xe(this.firestore,null,new Y(e))}withConverter(e){return new Wn(this.firestore,e,this._path)}}function cr(n,e,...t){if(n=Ke(n),Em("collection","path",e),n instanceof Sa){const r=Ie.fromString(e,...t);return _f(r),new Wn(n,null,r)}{if(!(n instanceof xe||n instanceof Wn))throw new q(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ie.fromString(e,...t));return _f(r),new Wn(n.firestore,null,r)}}function Ge(n,e,...t){if(n=Ke(n),arguments.length===1&&(e=Dl.newId()),Em("doc","path",e),n instanceof Sa){const r=Ie.fromString(e,...t);return gf(r),new xe(n,null,new Y(r))}{if(!(n instanceof xe||n instanceof Wn))throw new q(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ie.fromString(e,...t));return gf(r),new xe(n.firestore,n instanceof Wn?n.converter:null,new Y(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const id="AsyncQueue";class od{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Gl(this,"async_queue_retry"),this._c=()=>{const r=mc();r&&Q(id,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=mc();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=mc();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new mn;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Xu.push(e),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!gs(e))throw e;Q(id,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,Tn("INTERNAL UNHANDLED ERROR: ",ad(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Xl.createAndSchedule(this,e,t,r,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&X(47125,{Pc:ad(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function ad(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cd(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}class sr extends Sa{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new od,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new od(e),this._firestoreClient=void 0,await e}}}function _R(n,e){const t=typeof n=="object"?n:Vp(),r=typeof n=="string"?n:Uo,s=Il(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Hv("firestore");i&&gR(s,...i)}return s}function Pi(n){if(n._terminated)throw new q(V.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||yR(n),n._firestoreClient}function yR(n){const e=n._freezeSettings(),t=(function(s,i,a,c){return new jI(s,i,a,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,Ng(c.experimentalLongPollingOptions),c.useFetchStreams,c.isUsingEmulator)})(n._databaseId,n._app?.options.appId||"",n._persistenceKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new hR(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e){this._byteString=e}static fromBase64String(e){try{return new At(rt.fromBase64String(e))}catch(t){throw new q(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new At(rt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:At._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(wi(e,At._jsonSchema))return At.fromBase64String(e.bytes)}}At._jsonSchemaVersion="firestore/bytes/1.0",At._jsonSchema={type:Fe("string",At._jsonSchemaVersion),bytes:Fe("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new q(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new nt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new q(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new q(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return he(this._lat,e._lat)||he(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Xt._jsonSchemaVersion}}static fromJSON(e){if(wi(e,Xt._jsonSchema))return new Xt(e.latitude,e.longitude)}}Xt._jsonSchemaVersion="firestore/geoPoint/1.0",Xt._jsonSchema={type:Fe("string",Xt._jsonSchemaVersion),latitude:Fe("number"),longitude:Fe("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Zt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(wi(e,Zt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Zt(e.vectorValues);throw new q(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Zt._jsonSchemaVersion="firestore/vectorValue/1.0",Zt._jsonSchema={type:Fe("string",Zt._jsonSchemaVersion),vectorValues:Fe("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vR=/^__.*__$/;class ER{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new ar(e,this.data,this.fieldMask,t,this.fieldTransforms):new bi(e,this.data,t,this.fieldTransforms)}}class xg{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new ar(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Mg(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw X(40011,{Ac:n})}}class su{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new su({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Qo(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Mg(this.Ac)&&vR.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class TR{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Aa(e)}Cc(e,t,r,s=!1){return new su({Ac:e,methodName:t,Dc:r,path:nt.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Vi(n){const e=n._freezeSettings(),t=Aa(n._databaseId);return new TR(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Pa(n,e,t,r,s,i={}){const a=n.Cc(i.merge||i.mergeFields?2:0,e,t,s);ou("Data must be an object, but it was:",a,r);const c=Ug(r,a);let l,h;if(i.merge)l=new Rt(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const d=[];for(const p of i.mergeFields){const g=tl(e,p,t);if(!a.contains(g))throw new q(V.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);jg(d,g)||d.push(g)}l=new Rt(d),h=a.fieldTransforms.filter((p=>l.covers(p.field)))}else l=null,h=a.fieldTransforms;return new ER(new yt(c),l,h)}class ka extends Ca{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ka}}class iu extends Ca{_toFieldTransform(e){return new dA(e.path,new hi)}isEqual(e){return e instanceof iu}}function Lg(n,e,t,r){const s=n.Cc(1,e,t);ou("Data must be an object, but it was:",s,r);const i=[],a=yt.empty();or(r,((l,h)=>{const d=au(e,l,t);h=Ke(h);const p=s.yc(d);if(h instanceof ka)i.push(d);else{const g=Di(h,p);g!=null&&(i.push(d),a.set(d,g))}}));const c=new Rt(i);return new xg(a,c,s.fieldTransforms)}function Fg(n,e,t,r,s,i){const a=n.Cc(1,e,t),c=[tl(e,r,t)],l=[s];if(i.length%2!=0)throw new q(V.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(tl(e,i[g])),l.push(i[g+1]);const h=[],d=yt.empty();for(let g=c.length-1;g>=0;--g)if(!jg(h,c[g])){const I=c[g];let C=l[g];C=Ke(C);const N=a.yc(I);if(C instanceof ka)h.push(I);else{const O=Di(C,N);O!=null&&(h.push(I),d.set(I,O))}}const p=new Rt(h);return new xg(d,p,a.fieldTransforms)}function wR(n,e,t,r=!1){return Di(t,n.Cc(r?4:3,e))}function Di(n,e){if(Bg(n=Ke(n)))return ou("Unsupported field value:",e,n),Ug(n,e);if(n instanceof Ca)return(function(r,s){if(!Mg(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return(function(r,s){const i=[];let a=0;for(const c of r){let l=Di(c,s.wc(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=Ke(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return uA(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Pe.fromDate(r);return{timestampValue:Ho(s.serializer,i)}}if(r instanceof Pe){const i=new Pe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ho(s.serializer,i)}}if(r instanceof Xt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof At)return{bytesValue:ng(s.serializer,r._byteString)};if(r instanceof xe){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:$l(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Zt)return(function(a,c){return{mapValue:{fields:{[Pm]:{stringValue:km},[Bo]:{arrayValue:{values:a.toArray().map((h=>{if(typeof h!="number")throw c.Sc("VectorValues must only contain numeric values.");return Ul(c.serializer,h)}))}}}}}})(r,s);throw s.Sc(`Unsupported field value: ${ma(r)}`)})(n,e)}function Ug(n,e){const t={};return Im(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):or(n,((r,s)=>{const i=Di(s,e.mc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function Bg(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Pe||n instanceof Xt||n instanceof At||n instanceof xe||n instanceof Ca||n instanceof Zt)}function ou(n,e,t){if(!Bg(t)||!Tm(t)){const r=ma(t);throw r==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+r)}}function tl(n,e,t){if((e=Ke(e))instanceof ki)return e._internalPath;if(typeof e=="string")return au(n,e);throw Qo("Field path arguments must be of type string or ",n,!1,void 0,t)}const IR=new RegExp("[~\\*/\\[\\]]");function au(n,e,t){if(e.search(IR)>=0)throw Qo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new ki(...e.split("."))._internalPath}catch{throw Qo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Qo(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${r}`),a&&(l+=` in document ${s}`),l+=")"),new q(V.INVALID_ARGUMENT,c+n+l)}function jg(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jo{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new xe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new AR(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(cu("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class AR extends Jo{data(){return super.data()}}function cu(n,e){return typeof e=="string"?au(n,e):e instanceof ki?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $g(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new q(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class lu{}class bR extends lu{}function RR(n,e,...t){let r=[];e instanceof lu&&r.push(e),r=r.concat(t),(function(i){const a=i.filter((l=>l instanceof uu)).length,c=i.filter((l=>l instanceof Va)).length;if(a>1||a>0&&c>0)throw new q(V.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class Va extends bR{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Va(e,t,r)}_apply(e){const t=this._parse(e);return qg(e._query,t),new Vr(e.firestore,e.converter,Hc(e._query,t))}_parse(e){const t=Vi(e.firestore);return(function(i,a,c,l,h,d,p){let g;if(h.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new q(V.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){ud(p,d);const C=[];for(const N of p)C.push(ld(l,i,N));g={arrayValue:{values:C}}}else g=ld(l,i,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||ud(p,d),g=wR(c,a,p,d==="in"||d==="not-in");return Le.create(h,d,g)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function SR(n,e,t){const r=e,s=cu("where",n);return Va._create(s,r,t)}class uu extends lu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new uu(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:Bt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let a=s;const c=i.getFlattenedFilters();for(const l of c)qg(a,l),a=Hc(a,l)})(e._query,t),new Vr(e.firestore,e.converter,Hc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function ld(n,e,t){if(typeof(t=Ke(t))=="string"){if(t==="")throw new q(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Fm(e)&&t.indexOf("/")!==-1)throw new q(V.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Ie.fromString(t));if(!Y.isDocumentKey(r))throw new q(V.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return bf(n,new Y(r))}if(t instanceof xe)return bf(n,t._key);throw new q(V.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ma(t)}.`)}function ud(n,e){if(!Array.isArray(n)||n.length===0)throw new q(V.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function qg(n,e){const t=(function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new q(V.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new q(V.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class Hg{convertValue(e,t="none"){switch(tr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Oe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(er(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw X(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return or(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){const t=e.fields?.[Bo].arrayValue?.values?.map((r=>Oe(r.doubleValue)));return new Zt(t)}convertGeoPoint(e){return new Xt(Oe(e.latitude),Oe(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=_a(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ci(e));default:return null}}convertTimestamp(e){const t=Zn(e);return new Pe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Ie.fromString(e);ge(lg(r),9688,{name:e});const s=new li(r.get(1),r.get(3)),i=new Y(r.popFirst(5));return s.isEqual(t)||Tn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Da(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class CR extends Hg{constructor(e){super(),this.firestore=e}convertBytes(e){return new At(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new xe(this.firestore,null,t)}}class Wr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Gn extends Jo{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new To(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(cu("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new q(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Gn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Gn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Gn._jsonSchema={type:Fe("string",Gn._jsonSchemaVersion),bundleSource:Fe("string","DocumentSnapshot"),bundleName:Fe("string"),bundle:Fe("string")};class To extends Gn{data(e={}){return super.data(e)}}class wr{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Wr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new To(this._firestore,this._userDataWriter,r.key,r,new Wr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new q(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((c=>{const l=new To(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Wr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const l=new To(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Wr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,d=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),d=a.indexOf(c.doc.key)),{type:PR(c.type),doc:l,oldIndex:h,newIndex:d}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new q(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=wr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Dl.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function PR(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return X(61501,{type:n})}}wr._jsonSchemaVersion="firestore/querySnapshot/1.0",wr._jsonSchema={type:Fe("string",wr._jsonSchemaVersion),bundleSource:Fe("string","QuerySnapshot"),bundleName:Fe("string"),bundle:Fe("string")};class Na extends Hg{constructor(e){super(),this.firestore=e}convertBytes(e){return new At(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new xe(this.firestore,null,t)}}function Ni(n){n=Ut(n,Vr);const e=Ut(n.firestore,sr),t=Pi(e),r=new Na(e);return $g(n._query),mR(t,n._query).then((s=>new wr(e,r,n,s)))}function zg(n,e,t){n=Ut(n,xe);const r=Ut(n.firestore,sr),s=Da(n.converter,e,t);return hu(r,[Pa(Vi(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,We.none())])}function kR(n,e){const t=Ut(n.firestore,sr),r=Ge(n),s=Da(n.converter,e);return hu(t,[Pa(Vi(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,We.exists(!1))]).then((()=>r))}function Zs(n,...e){n=Ke(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||cd(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(cd(e[r])){const l=e[r];e[r]=l.next?.bind(l),e[r+1]=l.error?.bind(l),e[r+2]=l.complete?.bind(l)}let i,a,c;if(n instanceof xe)a=Ut(n.firestore,sr),c=Fl(n._key.path),i={next:l=>{e[r]&&e[r](VR(a,n,l))},error:e[r+1],complete:e[r+2]};else{const l=Ut(n,Vr);a=Ut(l.firestore,sr),c=l._query;const h=new Na(a);i={next:d=>{e[r]&&e[r](new wr(a,h,l,d))},error:e[r+1],complete:e[r+2]},$g(n._query)}return(function(h,d,p,g){const I=new Dg(g),C=new Ig(d,I,p);return h.asyncQueue.enqueueAndForget((async()=>Tg(await el(h),C))),()=>{I.Nu(),h.asyncQueue.enqueueAndForget((async()=>wg(await el(h),C)))}})(Pi(a),c,s,i)}function hu(n,e){return(function(r,s){const i=new mn;return r.asyncQueue.enqueueAndForget((async()=>eR(await dR(r),s,i))),i.promise})(Pi(n),e)}function VR(n,e,t){const r=t.docs.get(e._key),s=new Na(n);return new Gn(n,s,e._key,r,new Wr(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DR={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NR{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Vi(e)}set(e,t,r){this._verifyNotCommitted();const s=Un(e,this._firestore),i=Da(s.converter,t,r),a=Pa(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(a.toMutation(s._key,We.none())),this}update(e,t,r,...s){this._verifyNotCommitted();const i=Un(e,this._firestore);let a;return a=typeof(t=Ke(t))=="string"||t instanceof ki?Fg(this._dataReader,"WriteBatch.update",i._key,t,r,s):Lg(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(a.toMutation(i._key,We.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Un(e,this._firestore);return this._mutations=this._mutations.concat(new wa(t._key,We.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new q(V.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Un(n,e){if((n=Ke(n)).firestore!==e)throw new q(V.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OR{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=Vi(e)}get(e){const t=Un(e,this._firestore),r=new CR(this._firestore);return this._transaction.lookup([t._key]).then((s=>{if(!s||s.length!==1)return X(24041);const i=s[0];if(i.isFoundDocument())return new Jo(this._firestore,r,i.key,i,t.converter);if(i.isNoDocument())return new Jo(this._firestore,r,t._key,null,t.converter);throw X(18433,{doc:i})}))}set(e,t,r){const s=Un(e,this._firestore),i=Da(s.converter,t,r),a=Pa(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,a),this}update(e,t,r,...s){const i=Un(e,this._firestore);let a;return a=typeof(t=Ke(t))=="string"||t instanceof ki?Fg(this._dataReader,"Transaction.update",i._key,t,r,s):Lg(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,a),this}delete(e){const t=Un(e,this._firestore);return this._transaction.delete(t._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xR extends OR{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Un(e,this._firestore),r=new Na(this._firestore);return super.get(e).then((s=>new Gn(this._firestore,r,t._key,s._document,new Wr(!1,!1),t.converter)))}}function fu(n,e,t){n=Ut(n,sr);const r={...DR,...t};return(function(i){if(i.maxAttempts<1)throw new q(V.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r),(function(i,a,c){const l=new mn;return i.asyncQueue.enqueueAndForget((async()=>{const h=await pR(i);new uR(i.asyncQueue,h,c,a,l).ju()})),l.promise})(Pi(n),(s=>e(new xR(n,s))),r)}function en(){return new iu("serverTimestamp")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MR(n){return Pi(n=Ut(n,sr)),new NR(n,(e=>hu(n,e)))}(function(e,t=!0){(function(s){ps=s})(fs),ss(new Ar("firestore",((r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new sr(new wI(r.getProvider("auth-internal")),new bI(a,r.getProvider("app-check-internal")),(function(h,d){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new q(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new li(h.options.projectId,d)})(a,s),a);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),qn(ff,df,e),qn(ff,df,"esm2020")})();const LR={apiKey:"AIzaSyBewBUk6Oj4PjB6rVr8iVfZ6Zcyqm7CbXs",authDomain:"uno-game-e3329.firebaseapp.com",projectId:"uno-game-e3329",storageBucket:"uno-game-e3329.appspot.com",messagingSenderId:"793495202186",appId:"1:793495202186:web:705f97f5e200bf41120073",measurementId:"G-6PuJ7DGC39"},Wg=kp(LR),In=yI(Wg),we=_R(Wg);async function Dr(){In.currentUser||await nw(In)}async function FR(n){await Dr();const e=In.currentUser.uid,t=Math.random().toString(36).slice(2,8).toUpperCase(),r=await kR(cr(we,"rooms"),{code:t,hostUid:e,status:"lobby",createdAt:en()});return await zg(Ge(we,"rooms",r.id,"players",e),{displayName:n,joinedAt:en(),isReady:!1,isHost:!0,handCount:0}),{roomId:r.id,code:t}}async function UR(n,e){await Dr();const t=In.currentUser.uid,r=RR(cr(we,"rooms"),SR("code","==",n)),s=await Ni(r);if(s.empty)throw new Error("Room not found");const i=s.docs[0].id;return await zg(Ge(we,"rooms",i,"players",t),{displayName:e,joinedAt:en(),isReady:!1,isHost:!1,handCount:0},{merge:!0}),{roomId:i}}function BR(n,e,t){const r=Zs(Ge(we,"rooms",n),i=>e({id:i.id,...i.data()})),s=Zs(cr(we,"rooms",n,"players"),i=>t(i.docs.map(a=>({id:a.id,...a.data()}))));return()=>{r(),s()}}const jR={class:"p-3 rounded border border-slate-300 mb-4"},$R={class:"mb-2"},qR={class:"flex gap-2"},HR={key:0,class:"mt-3 text-sm"},zR={class:"list-disc ml-6"},WR=sa({__name:"Lobby",emits:["enter-room"],setup(n,{emit:e}){const t=e,r=Vt("Player"),s=Vt(null),i=Vt(""),a=Vt(null),c=Vt([]);let l=null;_l(async()=>{await Dr()}),oa(()=>{l&&l()});function h(g){l&&l(),l=BR(g,I=>a.value=I,I=>c.value=I)}async function d(){const{roomId:g,code:I}=await FR(r.value||"Player");s.value=g,h(g),t("enter-room",{id:g,host:!0}),console.log("Invite code:",I)}async function p(){const g=i.value.trim();if(!g)return;const{roomId:I}=await UR(g.toUpperCase(),r.value||"Player");s.value=I,h(I),t("enter-room",{id:I,host:!1})}return(g,I)=>(be(),Ve("div",jR,[re("div",$R,[I[2]||(I[2]=re("label",{class:"block text-sm mb-1"},"Display name",-1)),ch(re("input",{"onUpdate:modelValue":I[0]||(I[0]=C=>r.value=C),class:"border px-2 py-1 rounded w-full"},null,512),[[Oh,r.value]])]),re("div",qR,[re("button",{onClick:d,class:"px-3 py-2 rounded bg-emerald-600 text-white"},"Create room"),ch(re("input",{"onUpdate:modelValue":I[1]||(I[1]=C=>i.value=C),placeholder:"Enter code",class:"border px-2 py-1 rounded"},null,512),[[Oh,i.value]]),re("button",{onClick:p,class:"px-3 py-2 rounded bg-blue-600 text-white"},"Join")]),a.value?(be(),Ve("div",HR,[re("div",null,[I[3]||(I[3]=re("b",null,"Room",-1)),fn(" "+$e(s.value),1)]),re("div",null,[I[4]||(I[4]=re("b",null,"Code",-1)),fn(" "+$e(a.value.code),1)]),re("div",null,[I[5]||(I[5]=re("b",null,"Status",-1)),fn(" "+$e(a.value.status),1)]),I[6]||(I[6]=re("div",{class:"mt-1"},[re("b",null,"Players")],-1)),re("ul",zR,[(be(!0),Ve(kt,null,Jd(c.value,C=>(be(),Ve("li",{key:C.id},$e(C.displayName)+$e(C.isHost?" (host)":""),1))),128))])])):qt("",!0)]))}}),GR=["title","disabled"],KR=["src","alt"],QR={key:1,class:"w-full h-full flex items-center justify-center text-xs px-1"},hd=sa({__name:"CardView",props:{card:{},onPlay:{},size:{default:"md"}},setup(n){const e=n,t=Vt(!1);function r(l){return l.kind==="number"?`${l.color}_${l.value}.png`:l.kind==="action"?`${l.color}_${l.action}.png`:l.action==="wildDraw4"?"wildDraw4.png":"wild.png"}function s(l){return l.kind==="number"?`${l.color} ${l.value}`:l.kind==="action"?`${l.color} ${l.action}`:l.action==="wildDraw4"?"+4":"wild"}const i=It(()=>`/UNO-WEB3/cards/${r(e.card)}`),a=It(()=>e.size==="lg"?{w:96,h:144}:e.size==="sm"?{w:48,h:72}:{w:64,h:96});function c(){e.onPlay?.(e.card)}return(l,h)=>(be(),Ve("button",{onClick:c,title:JSON.stringify(n.card),class:"m-1 p-0 rounded-lg border border-slate-400 overflow-hidden bg-white hover:shadow transition disabled:opacity-100",style:pi({width:`${a.value.w}px`,height:`${a.value.h}px`,cursor:n.onPlay?"pointer":"default"}),disabled:!n.onPlay},[t.value?(be(),Ve("div",QR,$e(s(n.card)),1)):(be(),Ve("img",{key:0,src:i.value,alt:s(n.card),class:"w-full h-full object-contain",onError:h[0]||(h[0]=d=>t.value=!0)},null,40,KR))],12,GR))}}),fd=["red","yellow","green","blue"];function JR(){const n=[];for(const e of fd){n.push({kind:"number",color:e,value:0});for(let t=1;t<=9;t++)n.push({kind:"number",color:e,value:t}),n.push({kind:"number",color:e,value:t})}for(const e of fd)for(let t=0;t<2;t++)n.push({kind:"action",color:e,action:"skip"}),n.push({kind:"action",color:e,action:"reverse"}),n.push({kind:"action",color:e,action:"draw2",drawAmount:2});for(let e=0;e<4;e++)n.push({kind:"wild",action:"wild"});for(let e=0;e<4;e++)n.push({kind:"wild",action:"wildDraw4",drawAmount:4});return n}function YR(n){for(let e=n.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1));[n[e],n[t]]=[n[t],n[e]]}return n}function nl(n,e){if(e.kind==="wild")return!0;if(n.kind==="wild"){const t=n.chosenColor;return t?e.color===t:!0}return e.kind==="number"&&n.kind==="number"?e.color===n.color||e.value===n.value:e.kind==="action"&&n.kind==="action"?e.color===n.color||e.action===n.action:e.color===n.color}function XR(n){return n.kind==="action"&&n.action==="skip"}function ZR(n){return n.kind==="action"&&n.action==="reverse"}function dd(n){return n.kind==="action"&&(n.action==="draw2"||n.drawAmount===2)}function pd(n){return n.kind==="wild"&&(n.action==="wildDraw4"||n.drawAmount===4)}function eS(n,e){return n.kind!==e.kind?!1:n.kind==="number"&&e.kind==="number"?n.color===e.color&&n.value===e.value:n.kind==="action"&&e.kind==="action"?n.color===e.color&&n.action===e.action:n.kind==="wild"&&e.kind==="wild"?n.action===e.action:!1}function tS(n,e){const t=Zs(Ge(we,"rooms",n),a=>e.onRoom({id:a.id,...a.data()})),r=Zs(cr(we,"rooms",n,"players"),a=>e.onPlayers(a.docs.map(c=>({id:c.id,...c.data()})))),s=In.currentUser?.uid,i=s?Zs(Ge(we,"rooms",n,"hands",s),a=>e.onMyHand(a.data()?.cards??[])):()=>{};return()=>{t(),r(),i()}}async function md(n){await Dr();const t=(await Ni(cr(we,"rooms",n,"players"))).docs.map(c=>c.id);if(t.length<2)throw new Error("Need at least 2 players");const r=YR(JR()),s={};for(const c of t)s[c]=r.splice(0,7);let i=r.pop();for(;i.kind==="wild";)r.unshift(i),i=r.pop();const a=MR(we);a.set(Ge(we,"rooms",n),{status:"playing",currentTurn:t[0],direction:1,topCard:i,drawPile:r,discardPile:[i],pendingDraw:0,pendingType:null,chainValue:null,chainPlayer:null,winnerUid:null,finishedAt:null,updatedAt:en()},{merge:!0});for(const c of t)a.set(Ge(we,"rooms",n,"hands",c),{cards:s[c]}),a.set(Ge(we,"rooms",n,"players",c),{handCount:s[c].length},{merge:!0});await a.commit()}function Gr(n,e,t){return(e+t+n.length)%n.length}async function gd(n,e){await Dr();const t=In.currentUser.uid,r=Ge(we,"rooms",n),s=Ge(we,"rooms",n,"hands",t);await fu(we,async i=>{const a=await i.get(r),c=await i.get(s);if(!a.exists())throw new Error("Room missing");const l=a.data(),h=c.data()?.cards??[];if(l.status!=="playing")throw new Error("Game not started");if(l.currentTurn!==t)throw new Error("Not your turn");const p=(await Ni(cr(we,"rooms",n,"players"))).docs.map(R=>R.id);let g=l.direction??1;const I=p.indexOf(t),C=Gr(p,I,g),N=[...l.drawPile??[]],O=[...l.discardPile??[]],H=l.pendingDraw??0,W=l.pendingType??null,G=l.chainValue??null,K=l.chainPlayer??null;if(H>0){if(!(W==="draw2"&&dd(e)||W==="draw4"&&pd(e)))throw new Error(`You must draw ${H} or stack another ${W==="draw2"?"+2":"+4"}`)}else if(G!==null){if(K!==t)throw new Error("Other player must end their chain");if(!(e.kind==="number"&&e.value===G))throw new Error(`You can only play another ${G} or end your turn`)}else if(!nl(l.topCard,e))throw new Error("Illegal play");const de=h.findIndex(R=>eS(R,e));if(de<0)throw new Error("Card not in hand");if(h.splice(de,1),O.push(e),h.length===0){i.set(s,{cards:[]},{merge:!0}),i.set(Ge(we,"rooms",n,"players",t),{handCount:0},{merge:!0}),i.set(r,{topCard:e,discardPile:O,status:"finished",winnerUid:t,pendingDraw:0,pendingType:null,chainValue:null,chainPlayer:null,finishedAt:en(),updatedAt:en()},{merge:!0});return}let le=C,A=H,y=W,_=null,v=null;if(H>0)W==="draw2"&&(A+=2),W==="draw4"&&(A+=4),le=C;else if(G!==null)h.some(E=>E.kind==="number"&&E.value===G)?(le=I,_=G,v=t):le=C;else if(XR(e))le=Gr(p,C,g);else if(ZR(e))g=-g,le=p.length===2?Gr(p,C,g):Gr(p,I,g);else if(dd(e))A=2,y="draw2",le=C;else if(pd(e))A=4,y="draw4",le=C;else if(e.kind==="wild")le=C;else if(e.kind==="number"){const R=e.value;h.some(st=>st.kind==="number"&&st.value===R)?(le=I,_=R,v=t):le=C}const w=p[le];i.set(s,{cards:h},{merge:!0}),i.set(Ge(we,"rooms",n,"players",t),{handCount:h.length},{merge:!0}),i.set(r,{topCard:e,discardPile:O,drawPile:N,currentTurn:w,direction:g,pendingDraw:A,pendingType:y,chainValue:_,chainPlayer:v,updatedAt:en()},{merge:!0})})}async function nS(n){await Dr();const e=In.currentUser.uid,t=Ge(we,"rooms",n),r=Ge(we,"rooms",n,"hands",e);await fu(we,async s=>{const i=await s.get(t),a=await s.get(r);if(!i.exists())throw new Error("Room missing");const c=i.data(),l=a.data()?.cards??[];if(c.currentTurn!==e)throw new Error("Not your turn");const h=[...c.drawPile??[]],p=(await Ni(cr(we,"rooms",n,"players"))).docs.map(O=>O.id),g=c.direction??1,I=p.indexOf(e),C=p[Gr(p,I,g)],N=c.pendingDraw??0;if(N>0){for(let O=0;O<N;O++){if(!h.length)throw new Error("No cards to draw");l.push(h.pop())}s.set(r,{cards:l},{merge:!0}),s.set(Ge(we,"rooms",n,"players",e),{handCount:l.length},{merge:!0}),s.set(t,{drawPile:h,currentTurn:C,pendingDraw:0,pendingType:null,chainValue:null,chainPlayer:null,updatedAt:en()},{merge:!0});return}if(!h.length)throw new Error("No cards to draw");l.push(h.pop()),s.set(r,{cards:l},{merge:!0}),s.set(Ge(we,"rooms",n,"players",e),{handCount:l.length},{merge:!0}),s.set(t,{drawPile:h,currentTurn:C,chainValue:null,chainPlayer:null,updatedAt:en()},{merge:!0})})}async function rS(n){await Dr();const e=In.currentUser.uid,t=Ge(we,"rooms",n);await fu(we,async r=>{const s=await r.get(t);if(!s.exists())throw new Error("Room missing");const i=s.data();if(i.currentTurn!==e)throw new Error("Not your turn");if(i.chainPlayer!==e||i.chainValue===null)throw new Error("You have nothing to end");const c=(await Ni(cr(we,"rooms",n,"players"))).docs.map(p=>p.id),l=i.direction??1,h=c.indexOf(e),d=c[Gr(c,h,l)];r.set(t,{currentTurn:d,chainValue:null,chainPlayer:null,updatedAt:en()},{merge:!0})})}const sS={key:0,class:"p-6 space-y-3"},iS={class:"flex items-center gap-2"},oS={key:0,class:"mt-2"},aS=["disabled","title"],cS={key:1},lS={class:"mt-2 flex items-center gap-3"},uS={key:2,class:"ml-2 px-2 py-1 rounded text-sm font-semibold border"},hS={class:"mt-3 flex items-center gap-2"},fS=["disabled","title"],dS={class:"mt-4"},pS={class:"font-semibold mb-1"},mS={key:0,class:"mb-2 flex items-center gap-2"},gS={class:"flex flex-wrap gap-1.5"},_S=["onClick","disabled","aria-disabled","title"],yS={key:2,class:"mt-4 p-4 rounded-xl border bg-white/70 backdrop-blur"},vS={class:"text-xl font-bold mb-1"},ES={class:"text-sm text-gray-600 mb-3"},TS={key:1},wS={key:1,class:"p-6"},IS=sa({__name:"OnlineBoard",props:{roomId:{},isHost:{type:Boolean}},setup(n){const e=Vt(null),t=Vt([]),r=Vt([]),s=Vt(null);let i=null;function a(_){i&&i(),i=tS(_,{onRoom:v=>e.value=v,onPlayers:v=>t.value=v,onMyHand:v=>r.value=v})}_l(()=>a(n.roomId)),oa(()=>{i&&i()}),co(()=>n.roomId,_=>{_&&a(_)});const c=It(()=>e.value?.topCard??null),l=It(()=>In.currentUser?.uid??null),h=It(()=>e.value?.currentTurn===l.value&&e.value?.status==="playing"),d=It(()=>n.isHost||e.value?.hostUid===l.value||t.value.length>0&&t.value[0]?.id===l.value),p=It(()=>e.value?.pendingType??null),g=It(()=>e.value?.chainPlayer===l.value&&e.value?.chainValue!==null),I=It(()=>!!c.value&&r.value.some(_=>nl(c.value,_))),C=It(()=>{const _=e.value?.winnerUid;return _?t.value.find(v=>v.id===_)?.displayName??_:null}),N=It(()=>{const _=c.value;return _&&_.kind==="wild"?_.chosenColor??null:null});async function O(_){const v=s.value;if(!v)return;const w={...v.card,chosenColor:_};try{await gd(n.roomId,w)}catch(R){alert(R?.message??String(R))}finally{s.value=null}}function H(_){return p.value==="draw2"?_.kind==="action"&&_.action==="draw2":p.value==="draw4"?_.kind==="wild"&&_.action==="wildDraw4":!1}function W(_){return g.value&&_.kind==="number"&&_.value===e.value?.chainValue}const G=It(()=>e.value?.pendingDraw?{n:e.value.pendingDraw,type:e.value.pendingType}:null);function K(_){return h.value?p.value?H(_):!!c.value&&nl(c.value,_)||W(_):!1}async function de(_,v){if(!K(_))return;const w=_;if(_.kind==="wild"&&!w.chosenColor){s.value={index:v,card:_};return}try{await gd(n.roomId,_)}catch(R){alert(R?.message??String(R))}}async function le(){try{await nS(n.roomId)}catch(_){alert(_?.message??String(_))}}async function A(){try{await rS(n.roomId)}catch(_){alert(_?.message??String(_))}}async function y(){try{e.value?.code&&await navigator.clipboard.writeText(e.value.code)}catch{}}return(_,v)=>e.value?(be(),Ve("div",sS,[v[16]||(v[16]=re("h1",{class:"text-3xl font-extrabold"},"UNO (Online)",-1)),re("div",null,[v[7]||(v[7]=re("b",null,"Room:",-1)),fn(" "+$e(n.roomId),1)]),re("div",iS,[re("div",null,[v[8]||(v[8]=re("b",null,"Code:",-1)),v[9]||(v[9]=fn()),re("code",null,$e(e.value.code??"—"),1)]),e.value.code?(be(),Ve("button",{key:0,onClick:y,class:"px-2 py-1 text-sm rounded border"}," Copy ")):qt("",!0)]),re("div",null,[v[10]||(v[10]=re("b",null,"Status:",-1)),fn(" "+$e(e.value.status),1)]),re("div",null,[v[11]||(v[11]=re("b",null,"Turn:",-1)),fn(" "+$e(e.value.status==="finished"?"—":h.value?"You":e.value.currentTurn??"—"),1)]),re("div",null,[v[12]||(v[12]=re("b",null,"Players:",-1)),fn(" "+$e(t.value.map(w=>w.displayName).join(", ")),1)]),e.value.status==="lobby"||e.value.status==="finished"?(be(),Ve("div",oS,[d.value?(be(),Ve("button",{key:0,class:"px-4 py-2 rounded bg-emerald-600 text-white disabled:opacity-50",disabled:t.value.length<2,title:t.value.length<2?"Need at least 2 players":"Start game",onClick:v[0]||(v[0]=w=>Ic(md)(n.roomId))}," Start game ",8,aS)):(be(),Ve("div",cS,"Waiting for host to start…"))])):qt("",!0),e.value.status==="playing"?(be(),Ve(kt,{key:1},[re("div",lS,[v[13]||(v[13]=re("div",{class:"text-sm font-semibold"},"Top card:",-1)),c.value?(be(),Co(hd,{key:0,card:c.value,size:"lg"},null,8,["card"])):qt("",!0),N.value?(be(),Ve("div",{key:1,class:"ml-2 px-2 py-1 rounded text-sm font-semibold border",title:"Current color chosen for wild",style:pi({background:N.value==="red"?"#fee2e2":N.value==="yellow"?"#fef9c3":N.value==="green"?"#dcfce7":"#dbeafe"})}," Current color: "+$e(N.value),5)):qt("",!0),G.value?(be(),Ve("div",uS,$e(G.value.type==="draw4"?"+4":"+2")+" stack: draw "+$e(G.value.n),1)):qt("",!0)]),re("div",hS,[re("button",{onClick:le,disabled:!h.value,class:"px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50",title:G.value?`Draw ${G.value.n} and pass`:I.value?"You already have a playable card":"Draw one"},$e(G.value?`Draw ${G.value.n}`:"Draw"),9,fS),g.value?(be(),Ve("button",{key:0,onClick:A,class:"px-4 py-2 rounded bg-gray-700 text-white",title:"Finish your number chain and pass the turn"}," End turn ")):qt("",!0)]),re("div",dS,[re("h3",pS,"Your hand ("+$e(r.value.length)+")",1),s.value?(be(),Ve("div",mS,[v[14]||(v[14]=re("span",{class:"text-sm"},"Pick color:",-1)),re("button",{type:"button",onClick:v[1]||(v[1]=w=>O("red")),class:"px-3 py-1 rounded border",style:{background:"#ef4444",color:"white"}},"red"),re("button",{type:"button",onClick:v[2]||(v[2]=w=>O("yellow")),class:"px-3 py-1 rounded border",style:{background:"#eab308"}},"yellow"),re("button",{type:"button",onClick:v[3]||(v[3]=w=>O("green")),class:"px-3 py-1 rounded border",style:{background:"#22c55e",color:"white"}},"green"),re("button",{type:"button",onClick:v[4]||(v[4]=w=>O("blue")),class:"px-3 py-1 rounded border",style:{background:"#3b82f6",color:"white"}},"blue"),re("button",{type:"button",onClick:v[5]||(v[5]=w=>s.value=null),class:"px-2 py-1 rounded border",title:"Cancel"},"Cancel")])):qt("",!0),re("div",gS,[(be(!0),Ve(kt,null,Jd(r.value,(w,R)=>(be(),Ve("button",{key:R,type:"button",onClick:E=>de(w,R),disabled:!K(w),"aria-disabled":!K(w),class:ta(["relative inline-block p-0 border-0 bg-transparent",K(w)?"cursor-pointer":"opacity-60 cursor-not-allowed"]),title:h.value?p.value?p.value==="draw4"?"Only +4 can be played (or Draw)":"Only +2 can be played (or Draw)":void 0:"Not your turn"},[Kt(hd,{card:w,size:"md"},null,8,["card"]),v[15]||(v[15]=re("span",{class:"absolute inset-0"},null,-1))],10,_S))),128))])])],64)):qt("",!0),e.value.status==="finished"?(be(),Ve("div",yS,[re("div",vS,"🎉 "+$e(C.value??"A player")+" won!",1),re("div",ES," Game over"+$e(N.value?` — final color: ${N.value}`:"")+". ",1),d.value?(be(),Ve("button",{key:0,class:"px-4 py-2 rounded bg-emerald-600 text-white",onClick:v[6]||(v[6]=w=>Ic(md)(n.roomId))}," Start new game ")):(be(),Ve("div",TS,"Waiting for host to start a new game…"))])):qt("",!0)])):(be(),Ve("div",wS,"Loading room…"))}}),AS=sa({__name:"App",setup(n){const e=Vt(null),t=Vt(!1);function r(s){e.value=s.id,t.value=s.host}return(s,i)=>e.value?(be(),Co(IS,{key:1,roomId:e.value,isHost:t.value},null,8,["roomId","isHost"])):(be(),Co(WR,{key:0,onEnterRoom:r}))}});Nv(AS).mount("#root");

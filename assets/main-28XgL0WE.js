(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Hl(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const be={},$r=[],qt=()=>{},td=()=>!1,Fo=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),zl=n=>n.startsWith("onUpdate:"),at=Object.assign,Wl=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},e_=Object.prototype.hasOwnProperty,Ee=(n,e)=>e_.call(n,e),ie=Array.isArray,jr=n=>Uo(n)==="[object Map]",nd=n=>Uo(n)==="[object Set]",le=n=>typeof n=="function",Ue=n=>typeof n=="string",er=n=>typeof n=="symbol",ke=n=>n!==null&&typeof n=="object",rd=n=>(ke(n)||le(n))&&le(n.then)&&le(n.catch),sd=Object.prototype.toString,Uo=n=>sd.call(n),t_=n=>Uo(n).slice(8,-1),id=n=>Uo(n)==="[object Object]",Gl=n=>Ue(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,xs=Hl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Bo=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},n_=/-\w/g,Hn=Bo(n=>n.replace(n_,e=>e.slice(1).toUpperCase())),r_=/\B([A-Z])/g,Ir=Bo(n=>n.replace(r_,"-$1").toLowerCase()),od=Bo(n=>n.charAt(0).toUpperCase()+n.slice(1)),Oa=Bo(n=>n?`on${od(n)}`:""),Mn=(n,e)=>!Object.is(n,e),Ki=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},ad=(n,e,t,r=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:r,value:t})},il=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let zu;const $o=()=>zu||(zu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function On(n){if(ie(n)){const e={};for(let t=0;t<n.length;t++){const r=n[t],s=Ue(r)?a_(r):On(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(Ue(n)||ke(n))return n}const s_=/;(?![^(]*\))/g,i_=/:([^]+)/,o_=/\/\*[^]*?\*\//g;function a_(n){const e={};return n.replace(o_,"").split(s_).forEach(t=>{if(t){const r=t.split(i_);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function jo(n){let e="";if(Ue(n))e=n;else if(ie(n))for(let t=0;t<n.length;t++){const r=jo(n[t]);r&&(e+=r+" ")}else if(ke(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const l_="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",c_=Hl(l_);function ld(n){return!!n||n===""}const cd=n=>!!(n&&n.__v_isRef===!0),Ne=n=>Ue(n)?n:n==null?"":ie(n)||ke(n)&&(n.toString===sd||!le(n.toString))?cd(n)?Ne(n.value):JSON.stringify(n,ud,2):String(n),ud=(n,e)=>cd(e)?ud(n,e.value):jr(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[r,s],i)=>(t[xa(r,i)+" =>"]=s,t),{})}:nd(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>xa(t))}:er(e)?xa(e):ke(e)&&!ie(e)&&!id(e)?String(e):e,xa=(n,e="")=>{var t;return er(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let mt;class u_{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=mt,!e&&mt&&(this.index=(mt.scopes||(mt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=mt;try{return mt=this,e()}finally{mt=t}}}on(){++this._on===1&&(this.prevScope=mt,mt=this)}off(){this._on>0&&--this._on===0&&(mt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,r;for(t=0,r=this.effects.length;t<r;t++)this.effects[t].stop();for(this.effects.length=0,t=0,r=this.cleanups.length;t<r;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function h_(){return mt}let Se;const Ma=new WeakSet;class hd{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,mt&&mt.active&&mt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ma.has(this)&&(Ma.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||dd(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Wu(this),pd(this);const e=Se,t=xt;Se=this,xt=!0;try{return this.fn()}finally{md(this),Se=e,xt=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Jl(e);this.deps=this.depsTail=void 0,Wu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ma.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ol(this)&&this.run()}get dirty(){return ol(this)}}let fd=0,Ms,Ls;function dd(n,e=!1){if(n.flags|=8,e){n.next=Ls,Ls=n;return}n.next=Ms,Ms=n}function Kl(){fd++}function Ql(){if(--fd>0)return;if(Ls){let e=Ls;for(Ls=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Ms;){let e=Ms;for(Ms=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){n||(n=r)}e=t}}if(n)throw n}function pd(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function md(n){let e,t=n.depsTail,r=t;for(;r;){const s=r.prevDep;r.version===-1?(r===t&&(t=s),Jl(r),f_(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}n.deps=e,n.depsTail=t}function ol(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(gd(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function gd(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Qs)||(n.globalVersion=Qs,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!ol(n))))return;n.flags|=2;const e=n.dep,t=Se,r=xt;Se=n,xt=!0;try{pd(n);const s=n.fn(n._value);(e.version===0||Mn(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{Se=t,xt=r,md(n),n.flags&=-3}}function Jl(n,e=!1){const{dep:t,prevSub:r,nextSub:s}=n;if(r&&(r.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=r,n.nextSub=void 0),t.subs===n&&(t.subs=r,!r&&t.computed)){t.computed.flags&=-5;for(let i=t.computed.deps;i;i=i.nextDep)Jl(i,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function f_(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let xt=!0;const _d=[];function dn(){_d.push(xt),xt=!1}function pn(){const n=_d.pop();xt=n===void 0?!0:n}function Wu(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=Se;Se=void 0;try{e()}finally{Se=t}}}let Qs=0;class d_{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Xl{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Se||!xt||Se===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Se)t=this.activeLink=new d_(Se,this),Se.deps?(t.prevDep=Se.depsTail,Se.depsTail.nextDep=t,Se.depsTail=t):Se.deps=Se.depsTail=t,yd(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const r=t.nextDep;r.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=r),t.prevDep=Se.depsTail,t.nextDep=void 0,Se.depsTail.nextDep=t,Se.depsTail=t,Se.deps===t&&(Se.deps=r)}return t}trigger(e){this.version++,Qs++,this.notify(e)}notify(e){Kl();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{Ql()}}}function yd(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)yd(r)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const al=new WeakMap,dr=Symbol(""),ll=Symbol(""),Js=Symbol("");function st(n,e,t){if(xt&&Se){let r=al.get(n);r||al.set(n,r=new Map);let s=r.get(t);s||(r.set(t,s=new Xl),s.map=r,s.key=t),s.track()}}function an(n,e,t,r,s,i){const a=al.get(n);if(!a){Qs++;return}const l=c=>{c&&c.trigger()};if(Kl(),e==="clear")a.forEach(l);else{const c=ie(n),h=c&&Gl(t);if(c&&t==="length"){const d=Number(r);a.forEach((m,_)=>{(_==="length"||_===Js||!er(_)&&_>=d)&&l(m)})}else switch((t!==void 0||a.has(void 0))&&l(a.get(t)),h&&l(a.get(Js)),e){case"add":c?h&&l(a.get("length")):(l(a.get(dr)),jr(n)&&l(a.get(ll)));break;case"delete":c||(l(a.get(dr)),jr(n)&&l(a.get(ll)));break;case"set":jr(n)&&l(a.get(dr));break}}Ql()}function Nr(n){const e=ve(n);return e===n?e:(st(e,"iterate",Js),Ct(n)?e:e.map(Je))}function qo(n){return st(n=ve(n),"iterate",Js),n}const p_={__proto__:null,[Symbol.iterator](){return La(this,Symbol.iterator,Je)},concat(...n){return Nr(this).concat(...n.map(e=>ie(e)?Nr(e):e))},entries(){return La(this,"entries",n=>(n[1]=Je(n[1]),n))},every(n,e){return rn(this,"every",n,e,void 0,arguments)},filter(n,e){return rn(this,"filter",n,e,t=>t.map(Je),arguments)},find(n,e){return rn(this,"find",n,e,Je,arguments)},findIndex(n,e){return rn(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return rn(this,"findLast",n,e,Je,arguments)},findLastIndex(n,e){return rn(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return rn(this,"forEach",n,e,void 0,arguments)},includes(...n){return Fa(this,"includes",n)},indexOf(...n){return Fa(this,"indexOf",n)},join(n){return Nr(this).join(n)},lastIndexOf(...n){return Fa(this,"lastIndexOf",n)},map(n,e){return rn(this,"map",n,e,void 0,arguments)},pop(){return Cs(this,"pop")},push(...n){return Cs(this,"push",n)},reduce(n,...e){return Gu(this,"reduce",n,e)},reduceRight(n,...e){return Gu(this,"reduceRight",n,e)},shift(){return Cs(this,"shift")},some(n,e){return rn(this,"some",n,e,void 0,arguments)},splice(...n){return Cs(this,"splice",n)},toReversed(){return Nr(this).toReversed()},toSorted(n){return Nr(this).toSorted(n)},toSpliced(...n){return Nr(this).toSpliced(...n)},unshift(...n){return Cs(this,"unshift",n)},values(){return La(this,"values",Je)}};function La(n,e,t){const r=qo(n),s=r[e]();return r!==n&&!Ct(n)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.done||(i.value=t(i.value)),i}),s}const m_=Array.prototype;function rn(n,e,t,r,s,i){const a=qo(n),l=a!==n&&!Ct(n),c=a[e];if(c!==m_[e]){const m=c.apply(n,i);return l?Je(m):m}let h=t;a!==n&&(l?h=function(m,_){return t.call(this,Je(m),_,n)}:t.length>2&&(h=function(m,_){return t.call(this,m,_,n)}));const d=c.call(a,h,r);return l&&s?s(d):d}function Gu(n,e,t,r){const s=qo(n);let i=t;return s!==n&&(Ct(n)?t.length>3&&(i=function(a,l,c){return t.call(this,a,l,c,n)}):i=function(a,l,c){return t.call(this,a,Je(l),c,n)}),s[e](i,...r)}function Fa(n,e,t){const r=ve(n);st(r,"iterate",Js);const s=r[e](...t);return(s===-1||s===!1)&&tc(t[0])?(t[0]=ve(t[0]),r[e](...t)):s}function Cs(n,e,t=[]){dn(),Kl();const r=ve(n)[e].apply(n,t);return Ql(),pn(),r}const g_=Hl("__proto__,__v_isRef,__isVue"),vd=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(er));function __(n){er(n)||(n=String(n));const e=ve(this);return st(e,"has",n),e.hasOwnProperty(n)}class Ed{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,r){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return i;if(t==="__v_raw")return r===(s?i?R_:Ad:i?wd:Id).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const a=ie(e);if(!s){let c;if(a&&(c=p_[t]))return c;if(t==="hasOwnProperty")return __}const l=Reflect.get(e,t,ot(e)?e:r);if((er(t)?vd.has(t):g_(t))||(s||st(e,"get",t),i))return l;if(ot(l)){const c=a&&Gl(t)?l:l.value;return s&&ke(c)?ul(c):c}return ke(l)?s?ul(l):Zl(l):l}}class Td extends Ed{constructor(e=!1){super(!1,e)}set(e,t,r,s){let i=e[t];if(!this._isShallow){const c=zn(i);if(!Ct(r)&&!zn(r)&&(i=ve(i),r=ve(r)),!ie(e)&&ot(i)&&!ot(r))return c||(i.value=r),!0}const a=ie(e)&&Gl(t)?Number(t)<e.length:Ee(e,t),l=Reflect.set(e,t,r,ot(e)?e:s);return e===ve(s)&&(a?Mn(r,i)&&an(e,"set",t,r):an(e,"add",t,r)),l}deleteProperty(e,t){const r=Ee(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&r&&an(e,"delete",t,void 0),s}has(e,t){const r=Reflect.has(e,t);return(!er(t)||!vd.has(t))&&st(e,"has",t),r}ownKeys(e){return st(e,"iterate",ie(e)?"length":dr),Reflect.ownKeys(e)}}class y_ extends Ed{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const v_=new Td,E_=new y_,T_=new Td(!0);const cl=n=>n,Ui=n=>Reflect.getPrototypeOf(n);function I_(n,e,t){return function(...r){const s=this.__v_raw,i=ve(s),a=jr(i),l=n==="entries"||n===Symbol.iterator&&a,c=n==="keys"&&a,h=s[n](...r),d=t?cl:e?co:Je;return!e&&st(i,"iterate",c?ll:dr),{next(){const{value:m,done:_}=h.next();return _?{value:m,done:_}:{value:l?[d(m[0]),d(m[1])]:d(m),done:_}},[Symbol.iterator](){return this}}}}function Bi(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function w_(n,e){const t={get(s){const i=this.__v_raw,a=ve(i),l=ve(s);n||(Mn(s,l)&&st(a,"get",s),st(a,"get",l));const{has:c}=Ui(a),h=e?cl:n?co:Je;if(c.call(a,s))return h(i.get(s));if(c.call(a,l))return h(i.get(l));i!==a&&i.get(s)},get size(){const s=this.__v_raw;return!n&&st(ve(s),"iterate",dr),s.size},has(s){const i=this.__v_raw,a=ve(i),l=ve(s);return n||(Mn(s,l)&&st(a,"has",s),st(a,"has",l)),s===l?i.has(s):i.has(s)||i.has(l)},forEach(s,i){const a=this,l=a.__v_raw,c=ve(l),h=e?cl:n?co:Je;return!n&&st(c,"iterate",dr),l.forEach((d,m)=>s.call(i,h(d),h(m),a))}};return at(t,n?{add:Bi("add"),set:Bi("set"),delete:Bi("delete"),clear:Bi("clear")}:{add(s){!e&&!Ct(s)&&!zn(s)&&(s=ve(s));const i=ve(this);return Ui(i).has.call(i,s)||(i.add(s),an(i,"add",s,s)),this},set(s,i){!e&&!Ct(i)&&!zn(i)&&(i=ve(i));const a=ve(this),{has:l,get:c}=Ui(a);let h=l.call(a,s);h||(s=ve(s),h=l.call(a,s));const d=c.call(a,s);return a.set(s,i),h?Mn(i,d)&&an(a,"set",s,i):an(a,"add",s,i),this},delete(s){const i=ve(this),{has:a,get:l}=Ui(i);let c=a.call(i,s);c||(s=ve(s),c=a.call(i,s)),l&&l.call(i,s);const h=i.delete(s);return c&&an(i,"delete",s,void 0),h},clear(){const s=ve(this),i=s.size!==0,a=s.clear();return i&&an(s,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=I_(s,n,e)}),t}function Yl(n,e){const t=w_(n,e);return(r,s,i)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?r:Reflect.get(Ee(t,s)&&s in r?t:r,s,i)}const A_={get:Yl(!1,!1)},b_={get:Yl(!1,!0)},S_={get:Yl(!0,!1)};const Id=new WeakMap,wd=new WeakMap,Ad=new WeakMap,R_=new WeakMap;function C_(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function P_(n){return n.__v_skip||!Object.isExtensible(n)?0:C_(t_(n))}function Zl(n){return zn(n)?n:ec(n,!1,v_,A_,Id)}function k_(n){return ec(n,!1,T_,b_,wd)}function ul(n){return ec(n,!0,E_,S_,Ad)}function ec(n,e,t,r,s){if(!ke(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const i=P_(n);if(i===0)return n;const a=s.get(n);if(a)return a;const l=new Proxy(n,i===2?r:t);return s.set(n,l),l}function qr(n){return zn(n)?qr(n.__v_raw):!!(n&&n.__v_isReactive)}function zn(n){return!!(n&&n.__v_isReadonly)}function Ct(n){return!!(n&&n.__v_isShallow)}function tc(n){return n?!!n.__v_raw:!1}function ve(n){const e=n&&n.__v_raw;return e?ve(e):n}function V_(n){return!Ee(n,"__v_skip")&&Object.isExtensible(n)&&ad(n,"__v_skip",!0),n}const Je=n=>ke(n)?Zl(n):n,co=n=>ke(n)?ul(n):n;function ot(n){return n?n.__v_isRef===!0:!1}function Et(n){return D_(n,!1)}function D_(n,e){return ot(n)?n:new N_(n,e)}class N_{constructor(e,t){this.dep=new Xl,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:ve(e),this._value=t?e:Je(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,r=this.__v_isShallow||Ct(e)||zn(e);e=r?e:ve(e),Mn(e,t)&&(this._rawValue=e,this._value=r?e:Je(e),this.dep.trigger())}}function uo(n){return ot(n)?n.value:n}const O_={get:(n,e,t)=>e==="__v_raw"?n:uo(Reflect.get(n,e,t)),set:(n,e,t,r)=>{const s=n[e];return ot(s)&&!ot(t)?(s.value=t,!0):Reflect.set(n,e,t,r)}};function bd(n){return qr(n)?n:new Proxy(n,O_)}class x_{constructor(e,t,r){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Xl(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Qs-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Se!==this)return dd(this,!0),!0}get value(){const e=this.dep.track();return gd(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function M_(n,e,t=!1){let r,s;return le(n)?r=n:(r=n.get,s=n.set),new x_(r,s,t)}const $i={},ho=new WeakMap;let ur;function L_(n,e=!1,t=ur){if(t){let r=ho.get(t);r||ho.set(t,r=[]),r.push(n)}}function F_(n,e,t=be){const{immediate:r,deep:s,once:i,scheduler:a,augmentJob:l,call:c}=t,h=K=>s?K:Ct(K)||s===!1||s===0?ln(K,1):ln(K);let d,m,_,w,P=!1,F=!1;if(ot(n)?(m=()=>n.value,P=Ct(n)):qr(n)?(m=()=>h(n),P=!0):ie(n)?(F=!0,P=n.some(K=>qr(K)||Ct(K)),m=()=>n.map(K=>{if(ot(K))return K.value;if(qr(K))return h(K);if(le(K))return c?c(K,2):K()})):le(n)?e?m=c?()=>c(n,2):n:m=()=>{if(_){dn();try{_()}finally{pn()}}const K=ur;ur=d;try{return c?c(n,3,[w]):n(w)}finally{ur=K}}:m=qt,e&&s){const K=m,me=s===!0?1/0:s;m=()=>ln(K(),me)}const M=h_(),H=()=>{d.stop(),M&&M.active&&Wl(M.effects,d)};if(i&&e){const K=e;e=(...me)=>{K(...me),H()}}let Q=F?new Array(n.length).fill($i):$i;const z=K=>{if(!(!(d.flags&1)||!d.dirty&&!K))if(e){const me=d.run();if(s||P||(F?me.some((we,b)=>Mn(we,Q[b])):Mn(me,Q))){_&&_();const we=ur;ur=d;try{const b=[me,Q===$i?void 0:F&&Q[0]===$i?[]:Q,w];Q=me,c?c(e,3,b):e(...b)}finally{ur=we}}}else d.run()};return l&&l(z),d=new hd(m),d.scheduler=a?()=>a(z,!1):z,w=K=>L_(K,!1,d),_=d.onStop=()=>{const K=ho.get(d);if(K){if(c)c(K,4);else for(const me of K)me();ho.delete(d)}},e?r?z(!0):Q=d.run():a?a(z.bind(null,!0),!0):d.run(),H.pause=d.pause.bind(d),H.resume=d.resume.bind(d),H.stop=H,H}function ln(n,e=1/0,t){if(e<=0||!ke(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,ot(n))ln(n.value,e,t);else if(ie(n))for(let r=0;r<n.length;r++)ln(n[r],e,t);else if(nd(n)||jr(n))n.forEach(r=>{ln(r,e,t)});else if(id(n)){for(const r in n)ln(n[r],e,t);for(const r of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,r)&&ln(n[r],e,t)}return n}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ci(n,e,t,r){try{return r?n(...r):n()}catch(s){Ho(s,e,t)}}function Xt(n,e,t,r){if(le(n)){const s=ci(n,e,t,r);return s&&rd(s)&&s.catch(i=>{Ho(i,e,t)}),s}if(ie(n)){const s=[];for(let i=0;i<n.length;i++)s.push(Xt(n[i],e,t,r));return s}}function Ho(n,e,t,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||be;if(e){let l=e.parent;const c=e.proxy,h=`https://vuejs.org/error-reference/#runtime-${t}`;for(;l;){const d=l.ec;if(d){for(let m=0;m<d.length;m++)if(d[m](n,c,h)===!1)return}l=l.parent}if(i){dn(),ci(i,null,10,[n,c,h]),pn();return}}U_(n,t,s,r,a)}function U_(n,e,t,r=!0,s=!1){if(s)throw n;console.error(n)}const ht=[];let Bt=-1;const Hr=[];let Cn=null,Or=0;const Sd=Promise.resolve();let fo=null;function B_(n){const e=fo||Sd;return n?e.then(this?n.bind(this):n):e}function $_(n){let e=Bt+1,t=ht.length;for(;e<t;){const r=e+t>>>1,s=ht[r],i=Xs(s);i<n||i===n&&s.flags&2?e=r+1:t=r}return e}function nc(n){if(!(n.flags&1)){const e=Xs(n),t=ht[ht.length-1];!t||!(n.flags&2)&&e>=Xs(t)?ht.push(n):ht.splice($_(e),0,n),n.flags|=1,Rd()}}function Rd(){fo||(fo=Sd.then(Pd))}function j_(n){ie(n)?Hr.push(...n):Cn&&n.id===-1?Cn.splice(Or+1,0,n):n.flags&1||(Hr.push(n),n.flags|=1),Rd()}function Ku(n,e,t=Bt+1){for(;t<ht.length;t++){const r=ht[t];if(r&&r.flags&2){if(n&&r.id!==n.uid)continue;ht.splice(t,1),t--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Cd(n){if(Hr.length){const e=[...new Set(Hr)].sort((t,r)=>Xs(t)-Xs(r));if(Hr.length=0,Cn){Cn.push(...e);return}for(Cn=e,Or=0;Or<Cn.length;Or++){const t=Cn[Or];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Cn=null,Or=0}}const Xs=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Pd(n){try{for(Bt=0;Bt<ht.length;Bt++){const e=ht[Bt];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),ci(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Bt<ht.length;Bt++){const e=ht[Bt];e&&(e.flags&=-2)}Bt=-1,ht.length=0,Cd(),fo=null,(ht.length||Hr.length)&&Pd()}}let Rt=null,kd=null;function po(n){const e=Rt;return Rt=n,kd=n&&n.type.__scopeId||null,e}function q_(n,e=Rt,t){if(!e||n._n)return n;const r=(...s)=>{r._d&&ih(-1);const i=po(e);let a;try{a=n(...s)}finally{po(i),r._d&&ih(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function Qu(n,e){if(Rt===null)return n;const t=Jo(Rt),r=n.dirs||(n.dirs=[]);for(let s=0;s<e.length;s++){let[i,a,l,c=be]=e[s];i&&(le(i)&&(i={mounted:i,updated:i}),i.deep&&ln(a),r.push({dir:i,instance:t,value:a,oldValue:void 0,arg:l,modifiers:c}))}return n}function lr(n,e,t,r){const s=n.dirs,i=e&&e.dirs;for(let a=0;a<s.length;a++){const l=s[a];i&&(l.oldValue=i[a].value);let c=l.dir[r];c&&(dn(),Xt(c,t,8,[n.el,l,n,e]),pn())}}const H_=Symbol("_vte"),z_=n=>n.__isTeleport,W_=Symbol("_leaveCb");function rc(n,e){n.shapeFlag&6&&n.component?(n.transition=e,rc(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function zo(n,e){return le(n)?at({name:n.name},e,{setup:n}):n}function Vd(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}const mo=new WeakMap;function Fs(n,e,t,r,s=!1){if(ie(n)){n.forEach((P,F)=>Fs(P,e&&(ie(e)?e[F]:e),t,r,s));return}if(Us(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&Fs(n,e,t,r.component.subTree);return}const i=r.shapeFlag&4?Jo(r.component):r.el,a=s?null:i,{i:l,r:c}=n,h=e&&e.r,d=l.refs===be?l.refs={}:l.refs,m=l.setupState,_=ve(m),w=m===be?td:P=>Ee(_,P);if(h!=null&&h!==c){if(Ju(e),Ue(h))d[h]=null,w(h)&&(m[h]=null);else if(ot(h)){h.value=null;const P=e;P.k&&(d[P.k]=null)}}if(le(c))ci(c,l,12,[a,d]);else{const P=Ue(c),F=ot(c);if(P||F){const M=()=>{if(n.f){const H=P?w(c)?m[c]:d[c]:c.value;if(s)ie(H)&&Wl(H,i);else if(ie(H))H.includes(i)||H.push(i);else if(P)d[c]=[i],w(c)&&(m[c]=d[c]);else{const Q=[i];c.value=Q,n.k&&(d[n.k]=Q)}}else P?(d[c]=a,w(c)&&(m[c]=a)):F&&(c.value=a,n.k&&(d[n.k]=a))};if(a){const H=()=>{M(),mo.delete(n)};H.id=-1,mo.set(n,H),vt(H,t)}else Ju(n),M()}}}function Ju(n){const e=mo.get(n);e&&(e.flags|=8,mo.delete(n))}$o().requestIdleCallback;$o().cancelIdleCallback;const Us=n=>!!n.type.__asyncLoader,Dd=n=>n.type.__isKeepAlive;function G_(n,e){Nd(n,"a",e)}function K_(n,e){Nd(n,"da",e)}function Nd(n,e,t=dt){const r=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Wo(e,r,t),t){let s=t.parent;for(;s&&s.parent;)Dd(s.parent.vnode)&&Q_(r,e,t,s),s=s.parent}}function Q_(n,e,t,r){const s=Wo(e,n,r,!0);Go(()=>{Wl(r[e],s)},t)}function Wo(n,e,t=dt,r=!1){if(t){const s=t[n]||(t[n]=[]),i=e.__weh||(e.__weh=(...a)=>{dn();const l=ui(t),c=Xt(e,t,n,a);return l(),pn(),c});return r?s.unshift(i):s.push(i),i}}const En=n=>(e,t=dt)=>{(!Zs||n==="sp")&&Wo(n,(...r)=>e(...r),t)},J_=En("bm"),sc=En("m"),X_=En("bu"),Y_=En("u"),Z_=En("bum"),Go=En("um"),ey=En("sp"),ty=En("rtg"),ny=En("rtc");function ry(n,e=dt){Wo("ec",n,e)}const sy=Symbol.for("v-ndc");function Qi(n,e,t,r){let s;const i=t,a=ie(n);if(a||Ue(n)){const l=a&&qr(n);let c=!1,h=!1;l&&(c=!Ct(n),h=zn(n),n=qo(n)),s=new Array(n.length);for(let d=0,m=n.length;d<m;d++)s[d]=e(c?h?co(Je(n[d])):Je(n[d]):n[d],d,void 0,i)}else if(typeof n=="number"){s=new Array(n);for(let l=0;l<n;l++)s[l]=e(l+1,l,void 0,i)}else if(ke(n))if(n[Symbol.iterator])s=Array.from(n,(l,c)=>e(l,c,void 0,i));else{const l=Object.keys(n);s=new Array(l.length);for(let c=0,h=l.length;c<h;c++){const d=l[c];s[c]=e(n[d],d,c,i)}}else s=[];return s}const hl=n=>n?ep(n)?Jo(n):hl(n.parent):null,Bs=at(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>hl(n.parent),$root:n=>hl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>xd(n),$forceUpdate:n=>n.f||(n.f=()=>{nc(n.update)}),$nextTick:n=>n.n||(n.n=B_.bind(n.proxy)),$watch:n=>Sy.bind(n)}),Ua=(n,e)=>n!==be&&!n.__isScriptSetup&&Ee(n,e),iy={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:r,data:s,props:i,accessCache:a,type:l,appContext:c}=n;let h;if(e[0]!=="$"){const w=a[e];if(w!==void 0)switch(w){case 1:return r[e];case 2:return s[e];case 4:return t[e];case 3:return i[e]}else{if(Ua(r,e))return a[e]=1,r[e];if(s!==be&&Ee(s,e))return a[e]=2,s[e];if((h=n.propsOptions[0])&&Ee(h,e))return a[e]=3,i[e];if(t!==be&&Ee(t,e))return a[e]=4,t[e];fl&&(a[e]=0)}}const d=Bs[e];let m,_;if(d)return e==="$attrs"&&st(n.attrs,"get",""),d(n);if((m=l.__cssModules)&&(m=m[e]))return m;if(t!==be&&Ee(t,e))return a[e]=4,t[e];if(_=c.config.globalProperties,Ee(_,e))return _[e]},set({_:n},e,t){const{data:r,setupState:s,ctx:i}=n;return Ua(s,e)?(s[e]=t,!0):r!==be&&Ee(r,e)?(r[e]=t,!0):Ee(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(i[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:r,appContext:s,propsOptions:i,type:a}},l){let c,h;return!!(t[l]||n!==be&&l[0]!=="$"&&Ee(n,l)||Ua(e,l)||(c=i[0])&&Ee(c,l)||Ee(r,l)||Ee(Bs,l)||Ee(s.config.globalProperties,l)||(h=a.__cssModules)&&h[l])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:Ee(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Xu(n){return ie(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let fl=!0;function oy(n){const e=xd(n),t=n.proxy,r=n.ctx;fl=!1,e.beforeCreate&&Yu(e.beforeCreate,n,"bc");const{data:s,computed:i,methods:a,watch:l,provide:c,inject:h,created:d,beforeMount:m,mounted:_,beforeUpdate:w,updated:P,activated:F,deactivated:M,beforeDestroy:H,beforeUnmount:Q,destroyed:z,unmounted:K,render:me,renderTracked:we,renderTriggered:b,errorCaptured:v,serverPrefetch:g,expose:y,inheritAttrs:I,components:S,directives:T,filters:_t}=e;if(h&&ay(h,r,null),a)for(const Ie in a){const ge=a[Ie];le(ge)&&(r[Ie]=ge.bind(t))}if(s){const Ie=s.call(t,t);ke(Ie)&&(n.data=Zl(Ie))}if(fl=!0,i)for(const Ie in i){const ge=i[Ie],Pt=le(ge)?ge.bind(t,t):le(ge.get)?ge.get.bind(t,t):qt,tr=!le(ge)&&le(ge.set)?ge.set.bind(t):qt,Zt=pt({get:Pt,set:tr});Object.defineProperty(r,Ie,{enumerable:!0,configurable:!0,get:()=>Zt.value,set:Be=>Zt.value=Be})}if(l)for(const Ie in l)Od(l[Ie],r,t,Ie);if(c){const Ie=le(c)?c.call(t):c;Reflect.ownKeys(Ie).forEach(ge=>{dy(ge,Ie[ge])})}d&&Yu(d,n,"c");function He(Ie,ge){ie(ge)?ge.forEach(Pt=>Ie(Pt.bind(t))):ge&&Ie(ge.bind(t))}if(He(J_,m),He(sc,_),He(X_,w),He(Y_,P),He(G_,F),He(K_,M),He(ry,v),He(ny,we),He(ty,b),He(Z_,Q),He(Go,K),He(ey,g),ie(y))if(y.length){const Ie=n.exposed||(n.exposed={});y.forEach(ge=>{Object.defineProperty(Ie,ge,{get:()=>t[ge],set:Pt=>t[ge]=Pt,enumerable:!0})})}else n.exposed||(n.exposed={});me&&n.render===qt&&(n.render=me),I!=null&&(n.inheritAttrs=I),S&&(n.components=S),T&&(n.directives=T),g&&Vd(n)}function ay(n,e,t=qt){ie(n)&&(n=dl(n));for(const r in n){const s=n[r];let i;ke(s)?"default"in s?i=Ji(s.from||r,s.default,!0):i=Ji(s.from||r):i=Ji(s),ot(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:a=>i.value=a}):e[r]=i}}function Yu(n,e,t){Xt(ie(n)?n.map(r=>r.bind(e.proxy)):n.bind(e.proxy),e,t)}function Od(n,e,t,r){let s=r.includes(".")?Kd(t,r):()=>t[r];if(Ue(n)){const i=e[n];le(i)&&$a(s,i)}else if(le(n))$a(s,n.bind(t));else if(ke(n))if(ie(n))n.forEach(i=>Od(i,e,t,r));else{const i=le(n.handler)?n.handler.bind(t):e[n.handler];le(i)&&$a(s,i,n)}}function xd(n){const e=n.type,{mixins:t,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:a}}=n.appContext,l=i.get(e);let c;return l?c=l:!s.length&&!t&&!r?c=e:(c={},s.length&&s.forEach(h=>go(c,h,a,!0)),go(c,e,a)),ke(e)&&i.set(e,c),c}function go(n,e,t,r=!1){const{mixins:s,extends:i}=e;i&&go(n,i,t,!0),s&&s.forEach(a=>go(n,a,t,!0));for(const a in e)if(!(r&&a==="expose")){const l=ly[a]||t&&t[a];n[a]=l?l(n[a],e[a]):e[a]}return n}const ly={data:Zu,props:eh,emits:eh,methods:ks,computed:ks,beforeCreate:ut,created:ut,beforeMount:ut,mounted:ut,beforeUpdate:ut,updated:ut,beforeDestroy:ut,beforeUnmount:ut,destroyed:ut,unmounted:ut,activated:ut,deactivated:ut,errorCaptured:ut,serverPrefetch:ut,components:ks,directives:ks,watch:uy,provide:Zu,inject:cy};function Zu(n,e){return e?n?function(){return at(le(n)?n.call(this,this):n,le(e)?e.call(this,this):e)}:e:n}function cy(n,e){return ks(dl(n),dl(e))}function dl(n){if(ie(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function ut(n,e){return n?[...new Set([].concat(n,e))]:e}function ks(n,e){return n?at(Object.create(null),n,e):e}function eh(n,e){return n?ie(n)&&ie(e)?[...new Set([...n,...e])]:at(Object.create(null),Xu(n),Xu(e??{})):e}function uy(n,e){if(!n)return e;if(!e)return n;const t=at(Object.create(null),n);for(const r in e)t[r]=ut(n[r],e[r]);return t}function Md(){return{app:null,config:{isNativeTag:td,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let hy=0;function fy(n,e){return function(r,s=null){le(r)||(r=at({},r)),s!=null&&!ke(s)&&(s=null);const i=Md(),a=new WeakSet,l=[];let c=!1;const h=i.app={_uid:hy++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:Ky,get config(){return i.config},set config(d){},use(d,...m){return a.has(d)||(d&&le(d.install)?(a.add(d),d.install(h,...m)):le(d)&&(a.add(d),d(h,...m))),h},mixin(d){return i.mixins.includes(d)||i.mixins.push(d),h},component(d,m){return m?(i.components[d]=m,h):i.components[d]},directive(d,m){return m?(i.directives[d]=m,h):i.directives[d]},mount(d,m,_){if(!c){const w=h._ceVNode||Mt(r,s);return w.appContext=i,_===!0?_="svg":_===!1&&(_=void 0),n(w,d,_),c=!0,h._container=d,d.__vue_app__=h,Jo(w.component)}},onUnmount(d){l.push(d)},unmount(){c&&(Xt(l,h._instance,16),n(null,h._container),delete h._container.__vue_app__)},provide(d,m){return i.provides[d]=m,h},runWithContext(d){const m=zr;zr=h;try{return d()}finally{zr=m}}};return h}}let zr=null;function dy(n,e){if(dt){let t=dt.provides;const r=dt.parent&&dt.parent.provides;r===t&&(t=dt.provides=Object.create(r)),t[n]=e}}function Ji(n,e,t=!1){const r=jy();if(r||zr){let s=zr?zr._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&le(e)?e.call(r&&r.proxy):e}}const Ld={},Fd=()=>Object.create(Ld),Ud=n=>Object.getPrototypeOf(n)===Ld;function py(n,e,t,r=!1){const s={},i=Fd();n.propsDefaults=Object.create(null),Bd(n,e,s,i);for(const a in n.propsOptions[0])a in s||(s[a]=void 0);t?n.props=r?s:k_(s):n.type.props?n.props=s:n.props=i,n.attrs=i}function my(n,e,t,r){const{props:s,attrs:i,vnode:{patchFlag:a}}=n,l=ve(s),[c]=n.propsOptions;let h=!1;if((r||a>0)&&!(a&16)){if(a&8){const d=n.vnode.dynamicProps;for(let m=0;m<d.length;m++){let _=d[m];if(Ko(n.emitsOptions,_))continue;const w=e[_];if(c)if(Ee(i,_))w!==i[_]&&(i[_]=w,h=!0);else{const P=Hn(_);s[P]=pl(c,l,P,w,n,!1)}else w!==i[_]&&(i[_]=w,h=!0)}}}else{Bd(n,e,s,i)&&(h=!0);let d;for(const m in l)(!e||!Ee(e,m)&&((d=Ir(m))===m||!Ee(e,d)))&&(c?t&&(t[m]!==void 0||t[d]!==void 0)&&(s[m]=pl(c,l,m,void 0,n,!0)):delete s[m]);if(i!==l)for(const m in i)(!e||!Ee(e,m))&&(delete i[m],h=!0)}h&&an(n.attrs,"set","")}function Bd(n,e,t,r){const[s,i]=n.propsOptions;let a=!1,l;if(e)for(let c in e){if(xs(c))continue;const h=e[c];let d;s&&Ee(s,d=Hn(c))?!i||!i.includes(d)?t[d]=h:(l||(l={}))[d]=h:Ko(n.emitsOptions,c)||(!(c in r)||h!==r[c])&&(r[c]=h,a=!0)}if(i){const c=ve(t),h=l||be;for(let d=0;d<i.length;d++){const m=i[d];t[m]=pl(s,c,m,h[m],n,!Ee(h,m))}}return a}function pl(n,e,t,r,s,i){const a=n[t];if(a!=null){const l=Ee(a,"default");if(l&&r===void 0){const c=a.default;if(a.type!==Function&&!a.skipFactory&&le(c)){const{propsDefaults:h}=s;if(t in h)r=h[t];else{const d=ui(s);r=h[t]=c.call(null,e),d()}}else r=c;s.ce&&s.ce._setProp(t,r)}a[0]&&(i&&!l?r=!1:a[1]&&(r===""||r===Ir(t))&&(r=!0))}return r}const gy=new WeakMap;function $d(n,e,t=!1){const r=t?gy:e.propsCache,s=r.get(n);if(s)return s;const i=n.props,a={},l=[];let c=!1;if(!le(n)){const d=m=>{c=!0;const[_,w]=$d(m,e,!0);at(a,_),w&&l.push(...w)};!t&&e.mixins.length&&e.mixins.forEach(d),n.extends&&d(n.extends),n.mixins&&n.mixins.forEach(d)}if(!i&&!c)return ke(n)&&r.set(n,$r),$r;if(ie(i))for(let d=0;d<i.length;d++){const m=Hn(i[d]);th(m)&&(a[m]=be)}else if(i)for(const d in i){const m=Hn(d);if(th(m)){const _=i[d],w=a[m]=ie(_)||le(_)?{type:_}:at({},_),P=w.type;let F=!1,M=!0;if(ie(P))for(let H=0;H<P.length;++H){const Q=P[H],z=le(Q)&&Q.name;if(z==="Boolean"){F=!0;break}else z==="String"&&(M=!1)}else F=le(P)&&P.name==="Boolean";w[0]=F,w[1]=M,(F||Ee(w,"default"))&&l.push(m)}}const h=[a,l];return ke(n)&&r.set(n,h),h}function th(n){return n[0]!=="$"&&!xs(n)}const ic=n=>n==="_"||n==="_ctx"||n==="$stable",oc=n=>ie(n)?n.map(jt):[jt(n)],_y=(n,e,t)=>{if(e._n)return e;const r=q_((...s)=>oc(e(...s)),t);return r._c=!1,r},jd=(n,e,t)=>{const r=n._ctx;for(const s in n){if(ic(s))continue;const i=n[s];if(le(i))e[s]=_y(s,i,r);else if(i!=null){const a=oc(i);e[s]=()=>a}}},qd=(n,e)=>{const t=oc(e);n.slots.default=()=>t},Hd=(n,e,t)=>{for(const r in e)(t||!ic(r))&&(n[r]=e[r])},yy=(n,e,t)=>{const r=n.slots=Fd();if(n.vnode.shapeFlag&32){const s=e._;s?(Hd(r,e,t),t&&ad(r,"_",s,!0)):jd(e,r)}else e&&qd(n,e)},vy=(n,e,t)=>{const{vnode:r,slots:s}=n;let i=!0,a=be;if(r.shapeFlag&32){const l=e._;l?t&&l===1?i=!1:Hd(s,e,t):(i=!e.$stable,jd(e,s)),a=e}else e&&(qd(n,e),a={default:1});if(i)for(const l in s)!ic(l)&&a[l]==null&&delete s[l]},vt=Oy;function Ey(n){return Ty(n)}function Ty(n,e){const t=$o();t.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:a,createText:l,createComment:c,setText:h,setElementText:d,parentNode:m,nextSibling:_,setScopeId:w=qt,insertStaticContent:P}=n,F=(E,A,k,x=null,N=null,O=null,j=void 0,B=null,U=!!A.dynamicChildren)=>{if(E===A)return;E&&!Ps(E,A)&&(x=en(E),Be(E,N,O,!0),E=null),A.patchFlag===-2&&(U=!1,A.dynamicChildren=null);const{type:L,ref:Y,shapeFlag:q}=A;switch(L){case Qo:M(E,A,k,x);break;case Wn:H(E,A,k,x);break;case ja:E==null&&Q(A,k,x,j);break;case ft:S(E,A,k,x,N,O,j,B,U);break;default:q&1?me(E,A,k,x,N,O,j,B,U):q&6?T(E,A,k,x,N,O,j,B,U):(q&64||q&128)&&L.process(E,A,k,x,N,O,j,B,U,Ft)}Y!=null&&N?Fs(Y,E&&E.ref,O,A||E,!A):Y==null&&E&&E.ref!=null&&Fs(E.ref,null,O,E,!0)},M=(E,A,k,x)=>{if(E==null)r(A.el=l(A.children),k,x);else{const N=A.el=E.el;A.children!==E.children&&h(N,A.children)}},H=(E,A,k,x)=>{E==null?r(A.el=c(A.children||""),k,x):A.el=E.el},Q=(E,A,k,x)=>{[E.el,E.anchor]=P(E.children,A,k,x,E.el,E.anchor)},z=({el:E,anchor:A},k,x)=>{let N;for(;E&&E!==A;)N=_(E),r(E,k,x),E=N;r(A,k,x)},K=({el:E,anchor:A})=>{let k;for(;E&&E!==A;)k=_(E),s(E),E=k;s(A)},me=(E,A,k,x,N,O,j,B,U)=>{A.type==="svg"?j="svg":A.type==="math"&&(j="mathml"),E==null?we(A,k,x,N,O,j,B,U):g(E,A,N,O,j,B,U)},we=(E,A,k,x,N,O,j,B)=>{let U,L;const{props:Y,shapeFlag:q,transition:J,dirs:ne}=E;if(U=E.el=a(E.type,O,Y&&Y.is,Y),q&8?d(U,E.children):q&16&&v(E.children,U,null,x,N,Ba(E,O),j,B),ne&&lr(E,null,x,"created"),b(U,E,E.scopeId,j,x),Y){for(const ae in Y)ae!=="value"&&!xs(ae)&&i(U,ae,null,Y[ae],O,x);"value"in Y&&i(U,"value",null,Y.value,O),(L=Y.onVnodeBeforeMount)&&Ut(L,x,E)}ne&&lr(E,null,x,"beforeMount");const ee=Iy(N,J);ee&&J.beforeEnter(U),r(U,A,k),((L=Y&&Y.onVnodeMounted)||ee||ne)&&vt(()=>{L&&Ut(L,x,E),ee&&J.enter(U),ne&&lr(E,null,x,"mounted")},N)},b=(E,A,k,x,N)=>{if(k&&w(E,k),x)for(let O=0;O<x.length;O++)w(E,x[O]);if(N){let O=N.subTree;if(A===O||Jd(O.type)&&(O.ssContent===A||O.ssFallback===A)){const j=N.vnode;b(E,j,j.scopeId,j.slotScopeIds,N.parent)}}},v=(E,A,k,x,N,O,j,B,U=0)=>{for(let L=U;L<E.length;L++){const Y=E[L]=B?Pn(E[L]):jt(E[L]);F(null,Y,A,k,x,N,O,j,B)}},g=(E,A,k,x,N,O,j)=>{const B=A.el=E.el;let{patchFlag:U,dynamicChildren:L,dirs:Y}=A;U|=E.patchFlag&16;const q=E.props||be,J=A.props||be;let ne;if(k&&cr(k,!1),(ne=J.onVnodeBeforeUpdate)&&Ut(ne,k,A,E),Y&&lr(A,E,k,"beforeUpdate"),k&&cr(k,!0),(q.innerHTML&&J.innerHTML==null||q.textContent&&J.textContent==null)&&d(B,""),L?y(E.dynamicChildren,L,B,k,x,Ba(A,N),O):j||ge(E,A,B,null,k,x,Ba(A,N),O,!1),U>0){if(U&16)I(B,q,J,k,N);else if(U&2&&q.class!==J.class&&i(B,"class",null,J.class,N),U&4&&i(B,"style",q.style,J.style,N),U&8){const ee=A.dynamicProps;for(let ae=0;ae<ee.length;ae++){const de=ee[ae],ze=q[de],We=J[de];(We!==ze||de==="value")&&i(B,de,ze,We,N,k)}}U&1&&E.children!==A.children&&d(B,A.children)}else!j&&L==null&&I(B,q,J,k,N);((ne=J.onVnodeUpdated)||Y)&&vt(()=>{ne&&Ut(ne,k,A,E),Y&&lr(A,E,k,"updated")},x)},y=(E,A,k,x,N,O,j)=>{for(let B=0;B<A.length;B++){const U=E[B],L=A[B],Y=U.el&&(U.type===ft||!Ps(U,L)||U.shapeFlag&198)?m(U.el):k;F(U,L,Y,null,x,N,O,j,!0)}},I=(E,A,k,x,N)=>{if(A!==k){if(A!==be)for(const O in A)!xs(O)&&!(O in k)&&i(E,O,A[O],null,N,x);for(const O in k){if(xs(O))continue;const j=k[O],B=A[O];j!==B&&O!=="value"&&i(E,O,B,j,N,x)}"value"in k&&i(E,"value",A.value,k.value,N)}},S=(E,A,k,x,N,O,j,B,U)=>{const L=A.el=E?E.el:l(""),Y=A.anchor=E?E.anchor:l("");let{patchFlag:q,dynamicChildren:J,slotScopeIds:ne}=A;ne&&(B=B?B.concat(ne):ne),E==null?(r(L,k,x),r(Y,k,x),v(A.children||[],k,Y,N,O,j,B,U)):q>0&&q&64&&J&&E.dynamicChildren?(y(E.dynamicChildren,J,k,N,O,j,B),(A.key!=null||N&&A===N.subTree)&&zd(E,A,!0)):ge(E,A,k,Y,N,O,j,B,U)},T=(E,A,k,x,N,O,j,B,U)=>{A.slotScopeIds=B,E==null?A.shapeFlag&512?N.ctx.activate(A,k,x,j,U):_t(A,k,x,N,O,j,U):In(E,A,U)},_t=(E,A,k,x,N,O,j)=>{const B=E.component=$y(E,x,N);if(Dd(E)&&(B.ctx.renderer=Ft),qy(B,!1,j),B.asyncDep){if(N&&N.registerDep(B,He,j),!E.el){const U=B.subTree=Mt(Wn);H(null,U,A,k),E.placeholder=U.el}}else He(B,E,A,k,N,O,j)},In=(E,A,k)=>{const x=A.component=E.component;if(Dy(E,A,k))if(x.asyncDep&&!x.asyncResolved){Ie(x,A,k);return}else x.next=A,x.update();else A.el=E.el,x.vnode=A},He=(E,A,k,x,N,O,j)=>{const B=()=>{if(E.isMounted){let{next:q,bu:J,u:ne,parent:ee,vnode:ae}=E;{const Ze=Wd(E);if(Ze){q&&(q.el=ae.el,Ie(E,q,j)),Ze.asyncDep.then(()=>{E.isUnmounted||B()});return}}let de=q,ze;cr(E,!1),q?(q.el=ae.el,Ie(E,q,j)):q=ae,J&&Ki(J),(ze=q.props&&q.props.onVnodeBeforeUpdate)&&Ut(ze,ee,q,ae),cr(E,!0);const We=rh(E),wt=E.subTree;E.subTree=We,F(wt,We,m(wt.el),en(wt),E,N,O),q.el=We.el,de===null&&Ny(E,We.el),ne&&vt(ne,N),(ze=q.props&&q.props.onVnodeUpdated)&&vt(()=>Ut(ze,ee,q,ae),N)}else{let q;const{el:J,props:ne}=A,{bm:ee,m:ae,parent:de,root:ze,type:We}=E,wt=Us(A);cr(E,!1),ee&&Ki(ee),!wt&&(q=ne&&ne.onVnodeBeforeMount)&&Ut(q,de,A),cr(E,!0);{ze.ce&&ze.ce._def.shadowRoot!==!1&&ze.ce._injectChildStyle(We);const Ze=E.subTree=rh(E);F(null,Ze,k,x,E,N,O),A.el=Ze.el}if(ae&&vt(ae,N),!wt&&(q=ne&&ne.onVnodeMounted)){const Ze=A;vt(()=>Ut(q,de,Ze),N)}(A.shapeFlag&256||de&&Us(de.vnode)&&de.vnode.shapeFlag&256)&&E.a&&vt(E.a,N),E.isMounted=!0,A=k=x=null}};E.scope.on();const U=E.effect=new hd(B);E.scope.off();const L=E.update=U.run.bind(U),Y=E.job=U.runIfDirty.bind(U);Y.i=E,Y.id=E.uid,U.scheduler=()=>nc(Y),cr(E,!0),L()},Ie=(E,A,k)=>{A.component=E;const x=E.vnode.props;E.vnode=A,E.next=null,my(E,A.props,x,k),vy(E,A.children,k),dn(),Ku(E),pn()},ge=(E,A,k,x,N,O,j,B,U=!1)=>{const L=E&&E.children,Y=E?E.shapeFlag:0,q=A.children,{patchFlag:J,shapeFlag:ne}=A;if(J>0){if(J&128){tr(L,q,k,x,N,O,j,B,U);return}else if(J&256){Pt(L,q,k,x,N,O,j,B,U);return}}ne&8?(Y&16&&rr(L,N,O),q!==L&&d(k,q)):Y&16?ne&16?tr(L,q,k,x,N,O,j,B,U):rr(L,N,O,!0):(Y&8&&d(k,""),ne&16&&v(q,k,x,N,O,j,B,U))},Pt=(E,A,k,x,N,O,j,B,U)=>{E=E||$r,A=A||$r;const L=E.length,Y=A.length,q=Math.min(L,Y);let J;for(J=0;J<q;J++){const ne=A[J]=U?Pn(A[J]):jt(A[J]);F(E[J],ne,k,null,N,O,j,B,U)}L>Y?rr(E,N,O,!0,!1,q):v(A,k,x,N,O,j,B,U,q)},tr=(E,A,k,x,N,O,j,B,U)=>{let L=0;const Y=A.length;let q=E.length-1,J=Y-1;for(;L<=q&&L<=J;){const ne=E[L],ee=A[L]=U?Pn(A[L]):jt(A[L]);if(Ps(ne,ee))F(ne,ee,k,null,N,O,j,B,U);else break;L++}for(;L<=q&&L<=J;){const ne=E[q],ee=A[J]=U?Pn(A[J]):jt(A[J]);if(Ps(ne,ee))F(ne,ee,k,null,N,O,j,B,U);else break;q--,J--}if(L>q){if(L<=J){const ne=J+1,ee=ne<Y?A[ne].el:x;for(;L<=J;)F(null,A[L]=U?Pn(A[L]):jt(A[L]),k,ee,N,O,j,B,U),L++}}else if(L>J)for(;L<=q;)Be(E[L],N,O,!0),L++;else{const ne=L,ee=L,ae=new Map;for(L=ee;L<=J;L++){const Ge=A[L]=U?Pn(A[L]):jt(A[L]);Ge.key!=null&&ae.set(Ge.key,L)}let de,ze=0;const We=J-ee+1;let wt=!1,Ze=0;const wn=new Array(We);for(L=0;L<We;L++)wn[L]=0;for(L=ne;L<=q;L++){const Ge=E[L];if(ze>=We){Be(Ge,N,O,!0);continue}let At;if(Ge.key!=null)At=ae.get(Ge.key);else for(de=ee;de<=J;de++)if(wn[de-ee]===0&&Ps(Ge,A[de])){At=de;break}At===void 0?Be(Ge,N,O,!0):(wn[At-ee]=L+1,At>=Ze?Ze=At:wt=!0,F(Ge,A[At],k,null,N,O,j,B,U),ze++)}const ms=wt?wy(wn):$r;for(de=ms.length-1,L=We-1;L>=0;L--){const Ge=ee+L,At=A[Ge],wi=A[Ge+1],Cr=Ge+1<Y?wi.el||wi.placeholder:x;wn[L]===0?F(null,At,k,Cr,N,O,j,B,U):wt&&(de<0||L!==ms[de]?Zt(At,k,Cr,2):de--)}}},Zt=(E,A,k,x,N=null)=>{const{el:O,type:j,transition:B,children:U,shapeFlag:L}=E;if(L&6){Zt(E.component.subTree,A,k,x);return}if(L&128){E.suspense.move(A,k,x);return}if(L&64){j.move(E,A,k,Ft);return}if(j===ft){r(O,A,k);for(let q=0;q<U.length;q++)Zt(U[q],A,k,x);r(E.anchor,A,k);return}if(j===ja){z(E,A,k);return}if(x!==2&&L&1&&B)if(x===0)B.beforeEnter(O),r(O,A,k),vt(()=>B.enter(O),N);else{const{leave:q,delayLeave:J,afterLeave:ne}=B,ee=()=>{E.ctx.isUnmounted?s(O):r(O,A,k)},ae=()=>{O._isLeaving&&O[W_](!0),q(O,()=>{ee(),ne&&ne()})};J?J(O,ee,ae):ae()}else r(O,A,k)},Be=(E,A,k,x=!1,N=!1)=>{const{type:O,props:j,ref:B,children:U,dynamicChildren:L,shapeFlag:Y,patchFlag:q,dirs:J,cacheIndex:ne}=E;if(q===-2&&(N=!1),B!=null&&(dn(),Fs(B,null,k,E,!0),pn()),ne!=null&&(A.renderCache[ne]=void 0),Y&256){A.ctx.deactivate(E);return}const ee=Y&1&&J,ae=!Us(E);let de;if(ae&&(de=j&&j.onVnodeBeforeUnmount)&&Ut(de,A,E),Y&6)nr(E.component,k,x);else{if(Y&128){E.suspense.unmount(k,x);return}ee&&lr(E,null,A,"beforeUnmount"),Y&64?E.type.remove(E,A,k,Ft,x):L&&!L.hasOnce&&(O!==ft||q>0&&q&64)?rr(L,A,k,!1,!0):(O===ft&&q&384||!N&&Y&16)&&rr(U,A,k),x&&$e(E)}(ae&&(de=j&&j.onVnodeUnmounted)||ee)&&vt(()=>{de&&Ut(de,A,E),ee&&lr(E,null,A,"unmounted")},k)},$e=E=>{const{type:A,el:k,anchor:x,transition:N}=E;if(A===ft){va(k,x);return}if(A===ja){K(E);return}const O=()=>{s(k),N&&!N.persisted&&N.afterLeave&&N.afterLeave()};if(E.shapeFlag&1&&N&&!N.persisted){const{leave:j,delayLeave:B}=N,U=()=>j(k,O);B?B(E.el,O,U):U()}else O()},va=(E,A)=>{let k;for(;E!==A;)k=_(E),s(E),E=k;s(A)},nr=(E,A,k)=>{const{bum:x,scope:N,job:O,subTree:j,um:B,m:U,a:L}=E;nh(U),nh(L),x&&Ki(x),N.stop(),O&&(O.flags|=8,Be(j,E,A,k)),B&&vt(B,A),vt(()=>{E.isUnmounted=!0},A)},rr=(E,A,k,x=!1,N=!1,O=0)=>{for(let j=O;j<E.length;j++)Be(E[j],A,k,x,N)},en=E=>{if(E.shapeFlag&6)return en(E.component.subTree);if(E.shapeFlag&128)return E.suspense.next();const A=_(E.anchor||E.el),k=A&&A[H_];return k?_(k):A};let ds=!1;const Ii=(E,A,k)=>{E==null?A._vnode&&Be(A._vnode,null,null,!0):F(A._vnode||null,E,A,null,null,null,k),A._vnode=E,ds||(ds=!0,Ku(),Cd(),ds=!1)},Ft={p:F,um:Be,m:Zt,r:$e,mt:_t,mc:v,pc:ge,pbc:y,n:en,o:n};return{render:Ii,hydrate:void 0,createApp:fy(Ii)}}function Ba({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function cr({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function Iy(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function zd(n,e,t=!1){const r=n.children,s=e.children;if(ie(r)&&ie(s))for(let i=0;i<r.length;i++){const a=r[i];let l=s[i];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=s[i]=Pn(s[i]),l.el=a.el),!t&&l.patchFlag!==-2&&zd(a,l)),l.type===Qo&&l.patchFlag!==-1&&(l.el=a.el),l.type===Wn&&!l.el&&(l.el=a.el)}}function wy(n){const e=n.slice(),t=[0];let r,s,i,a,l;const c=n.length;for(r=0;r<c;r++){const h=n[r];if(h!==0){if(s=t[t.length-1],n[s]<h){e[r]=s,t.push(r);continue}for(i=0,a=t.length-1;i<a;)l=i+a>>1,n[t[l]]<h?i=l+1:a=l;h<n[t[i]]&&(i>0&&(e[r]=t[i-1]),t[i]=r)}}for(i=t.length,a=t[i-1];i-- >0;)t[i]=a,a=e[a];return t}function Wd(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Wd(e)}function nh(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const Ay=Symbol.for("v-scx"),by=()=>Ji(Ay);function $a(n,e,t){return Gd(n,e,t)}function Gd(n,e,t=be){const{immediate:r,deep:s,flush:i,once:a}=t,l=at({},t),c=e&&r||!e&&i!=="post";let h;if(Zs){if(i==="sync"){const w=by();h=w.__watcherHandles||(w.__watcherHandles=[])}else if(!c){const w=()=>{};return w.stop=qt,w.resume=qt,w.pause=qt,w}}const d=dt;l.call=(w,P,F)=>Xt(w,d,P,F);let m=!1;i==="post"?l.scheduler=w=>{vt(w,d&&d.suspense)}:i!=="sync"&&(m=!0,l.scheduler=(w,P)=>{P?w():nc(w)}),l.augmentJob=w=>{e&&(w.flags|=4),m&&(w.flags|=2,d&&(w.id=d.uid,w.i=d))};const _=F_(n,e,l);return Zs&&(h?h.push(_):c&&_()),_}function Sy(n,e,t){const r=this.proxy,s=Ue(n)?n.includes(".")?Kd(r,n):()=>r[n]:n.bind(r,r);let i;le(e)?i=e:(i=e.handler,t=e);const a=ui(this),l=Gd(s,i.bind(r),t);return a(),l}function Kd(n,e){const t=e.split(".");return()=>{let r=n;for(let s=0;s<t.length&&r;s++)r=r[t[s]];return r}}const Ry=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Hn(e)}Modifiers`]||n[`${Ir(e)}Modifiers`];function Cy(n,e,...t){if(n.isUnmounted)return;const r=n.vnode.props||be;let s=t;const i=e.startsWith("update:"),a=i&&Ry(r,e.slice(7));a&&(a.trim&&(s=t.map(d=>Ue(d)?d.trim():d)),a.number&&(s=t.map(il)));let l,c=r[l=Oa(e)]||r[l=Oa(Hn(e))];!c&&i&&(c=r[l=Oa(Ir(e))]),c&&Xt(c,n,6,s);const h=r[l+"Once"];if(h){if(!n.emitted)n.emitted={};else if(n.emitted[l])return;n.emitted[l]=!0,Xt(h,n,6,s)}}const Py=new WeakMap;function Qd(n,e,t=!1){const r=t?Py:e.emitsCache,s=r.get(n);if(s!==void 0)return s;const i=n.emits;let a={},l=!1;if(!le(n)){const c=h=>{const d=Qd(h,e,!0);d&&(l=!0,at(a,d))};!t&&e.mixins.length&&e.mixins.forEach(c),n.extends&&c(n.extends),n.mixins&&n.mixins.forEach(c)}return!i&&!l?(ke(n)&&r.set(n,null),null):(ie(i)?i.forEach(c=>a[c]=null):at(a,i),ke(n)&&r.set(n,a),a)}function Ko(n,e){return!n||!Fo(e)?!1:(e=e.slice(2).replace(/Once$/,""),Ee(n,e[0].toLowerCase()+e.slice(1))||Ee(n,Ir(e))||Ee(n,e))}function rh(n){const{type:e,vnode:t,proxy:r,withProxy:s,propsOptions:[i],slots:a,attrs:l,emit:c,render:h,renderCache:d,props:m,data:_,setupState:w,ctx:P,inheritAttrs:F}=n,M=po(n);let H,Q;try{if(t.shapeFlag&4){const K=s||r,me=K;H=jt(h.call(me,K,d,m,w,_,P)),Q=l}else{const K=e;H=jt(K.length>1?K(m,{attrs:l,slots:a,emit:c}):K(m,null)),Q=e.props?l:ky(l)}}catch(K){$s.length=0,Ho(K,n,1),H=Mt(Wn)}let z=H;if(Q&&F!==!1){const K=Object.keys(Q),{shapeFlag:me}=z;K.length&&me&7&&(i&&K.some(zl)&&(Q=Vy(Q,i)),z=Jr(z,Q,!1,!0))}return t.dirs&&(z=Jr(z,null,!1,!0),z.dirs=z.dirs?z.dirs.concat(t.dirs):t.dirs),t.transition&&rc(z,t.transition),H=z,po(M),H}const ky=n=>{let e;for(const t in n)(t==="class"||t==="style"||Fo(t))&&((e||(e={}))[t]=n[t]);return e},Vy=(n,e)=>{const t={};for(const r in n)(!zl(r)||!(r.slice(9)in e))&&(t[r]=n[r]);return t};function Dy(n,e,t){const{props:r,children:s,component:i}=n,{props:a,children:l,patchFlag:c}=e,h=i.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&c>=0){if(c&1024)return!0;if(c&16)return r?sh(r,a,h):!!a;if(c&8){const d=e.dynamicProps;for(let m=0;m<d.length;m++){const _=d[m];if(a[_]!==r[_]&&!Ko(h,_))return!0}}}else return(s||l)&&(!l||!l.$stable)?!0:r===a?!1:r?a?sh(r,a,h):!0:!!a;return!1}function sh(n,e,t){const r=Object.keys(e);if(r.length!==Object.keys(n).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==n[i]&&!Ko(t,i))return!0}return!1}function Ny({vnode:n,parent:e},t){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===n&&(r.el=n.el),r===n)(n=e.vnode).el=t,e=e.parent;else break}}const Jd=n=>n.__isSuspense;function Oy(n,e){e&&e.pendingBranch?ie(n)?e.effects.push(...n):e.effects.push(n):j_(n)}const ft=Symbol.for("v-fgt"),Qo=Symbol.for("v-txt"),Wn=Symbol.for("v-cmt"),ja=Symbol.for("v-stc"),$s=[];let Tt=null;function fe(n=!1){$s.push(Tt=n?null:[])}function xy(){$s.pop(),Tt=$s[$s.length-1]||null}let Ys=1;function ih(n,e=!1){Ys+=n,n<0&&Tt&&e&&(Tt.hasOnce=!0)}function Xd(n){return n.dynamicChildren=Ys>0?Tt||$r:null,xy(),Ys>0&&Tt&&Tt.push(n),n}function ye(n,e,t,r,s,i){return Xd(Z(n,e,t,r,s,i,!0))}function _o(n,e,t,r,s){return Xd(Mt(n,e,t,r,s,!0))}function Yd(n){return n?n.__v_isVNode===!0:!1}function Ps(n,e){return n.type===e.type&&n.key===e.key}const Zd=({key:n})=>n??null,Xi=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Ue(n)||ot(n)||le(n)?{i:Rt,r:n,k:e,f:!!t}:n:null);function Z(n,e=null,t=null,r=0,s=null,i=n===ft?0:1,a=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&Zd(e),ref:e&&Xi(e),scopeId:kd,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Rt};return l?(ac(c,t),i&128&&n.normalize(c)):t&&(c.shapeFlag|=Ue(t)?8:16),Ys>0&&!a&&Tt&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&Tt.push(c),c}const Mt=My;function My(n,e=null,t=null,r=0,s=null,i=!1){if((!n||n===sy)&&(n=Wn),Yd(n)){const l=Jr(n,e,!0);return t&&ac(l,t),Ys>0&&!i&&Tt&&(l.shapeFlag&6?Tt[Tt.indexOf(n)]=l:Tt.push(l)),l.patchFlag=-2,l}if(Gy(n)&&(n=n.__vccOpts),e){e=Ly(e);let{class:l,style:c}=e;l&&!Ue(l)&&(e.class=jo(l)),ke(c)&&(tc(c)&&!ie(c)&&(c=at({},c)),e.style=On(c))}const a=Ue(n)?1:Jd(n)?128:z_(n)?64:ke(n)?4:le(n)?2:0;return Z(n,e,t,r,s,a,i,!0)}function Ly(n){return n?tc(n)||Ud(n)?at({},n):n:null}function Jr(n,e,t=!1,r=!1){const{props:s,ref:i,patchFlag:a,children:l,transition:c}=n,h=e?Fy(s||{},e):s,d={__v_isVNode:!0,__v_skip:!0,type:n.type,props:h,key:h&&Zd(h),ref:e&&e.ref?t&&i?ie(i)?i.concat(Xi(e)):[i,Xi(e)]:Xi(e):i,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:l,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==ft?a===-1?16:a|16:a,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:c,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Jr(n.ssContent),ssFallback:n.ssFallback&&Jr(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return c&&r&&rc(d,c.clone(d)),d}function Vt(n=" ",e=0){return Mt(Qo,null,n,e)}function sn(n="",e=!1){return e?(fe(),_o(Wn,null,n)):Mt(Wn,null,n)}function jt(n){return n==null||typeof n=="boolean"?Mt(Wn):ie(n)?Mt(ft,null,n.slice()):Yd(n)?Pn(n):Mt(Qo,null,String(n))}function Pn(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Jr(n)}function ac(n,e){let t=0;const{shapeFlag:r}=n;if(e==null)e=null;else if(ie(e))t=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),ac(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!Ud(e)?e._ctx=Rt:s===3&&Rt&&(Rt.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else le(e)?(e={default:e,_ctx:Rt},t=32):(e=String(e),r&64?(t=16,e=[Vt(e)]):t=8);n.children=e,n.shapeFlag|=t}function Fy(...n){const e={};for(let t=0;t<n.length;t++){const r=n[t];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=jo([e.class,r.class]));else if(s==="style")e.style=On([e.style,r.style]);else if(Fo(s)){const i=e[s],a=r[s];a&&i!==a&&!(ie(i)&&i.includes(a))&&(e[s]=i?[].concat(i,a):a)}else s!==""&&(e[s]=r[s])}return e}function Ut(n,e,t,r=null){Xt(n,e,7,[t,r])}const Uy=Md();let By=0;function $y(n,e,t){const r=n.type,s=(e?e.appContext:n.appContext)||Uy,i={uid:By++,vnode:n,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new u_(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:$d(r,s),emitsOptions:Qd(r,s),emit:null,emitted:null,propsDefaults:be,inheritAttrs:r.inheritAttrs,ctx:be,data:be,props:be,attrs:be,slots:be,refs:be,setupState:be,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=Cy.bind(null,i),n.ce&&n.ce(i),i}let dt=null;const jy=()=>dt||Rt;let yo,ml;{const n=$o(),e=(t,r)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(r),i=>{s.length>1?s.forEach(a=>a(i)):s[0](i)}};yo=e("__VUE_INSTANCE_SETTERS__",t=>dt=t),ml=e("__VUE_SSR_SETTERS__",t=>Zs=t)}const ui=n=>{const e=dt;return yo(n),n.scope.on(),()=>{n.scope.off(),yo(e)}},oh=()=>{dt&&dt.scope.off(),yo(null)};function ep(n){return n.vnode.shapeFlag&4}let Zs=!1;function qy(n,e=!1,t=!1){e&&ml(e);const{props:r,children:s}=n.vnode,i=ep(n);py(n,r,i,e),yy(n,s,t||e);const a=i?Hy(n,e):void 0;return e&&ml(!1),a}function Hy(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,iy);const{setup:r}=t;if(r){dn();const s=n.setupContext=r.length>1?Wy(n):null,i=ui(n),a=ci(r,n,0,[n.props,s]),l=rd(a);if(pn(),i(),(l||n.sp)&&!Us(n)&&Vd(n),l){if(a.then(oh,oh),e)return a.then(c=>{ah(n,c)}).catch(c=>{Ho(c,n,0)});n.asyncDep=a}else ah(n,a)}else tp(n)}function ah(n,e,t){le(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:ke(e)&&(n.setupState=bd(e)),tp(n)}function tp(n,e,t){const r=n.type;n.render||(n.render=r.render||qt);{const s=ui(n);dn();try{oy(n)}finally{pn(),s()}}}const zy={get(n,e){return st(n,"get",""),n[e]}};function Wy(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,zy),slots:n.slots,emit:n.emit,expose:e}}function Jo(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(bd(V_(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Bs)return Bs[t](n)},has(e,t){return t in e||t in Bs}})):n.proxy}function Gy(n){return le(n)&&"__vccOpts"in n}const pt=(n,e)=>M_(n,e,Zs),Ky="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let gl;const lh=typeof window<"u"&&window.trustedTypes;if(lh)try{gl=lh.createPolicy("vue",{createHTML:n=>n})}catch{}const np=gl?n=>gl.createHTML(n):n=>n,Qy="http://www.w3.org/2000/svg",Jy="http://www.w3.org/1998/Math/MathML",on=typeof document<"u"?document:null,ch=on&&on.createElement("template"),Xy={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,r)=>{const s=e==="svg"?on.createElementNS(Qy,n):e==="mathml"?on.createElementNS(Jy,n):t?on.createElement(n,{is:t}):on.createElement(n);return n==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:n=>on.createTextNode(n),createComment:n=>on.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>on.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,r,s,i){const a=t?t.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===i||!(s=s.nextSibling)););else{ch.innerHTML=np(r==="svg"?`<svg>${n}</svg>`:r==="mathml"?`<math>${n}</math>`:n);const l=ch.content;if(r==="svg"||r==="mathml"){const c=l.firstChild;for(;c.firstChild;)l.appendChild(c.firstChild);l.removeChild(c)}e.insertBefore(l,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Yy=Symbol("_vtc");function Zy(n,e,t){const r=n[Yy];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const uh=Symbol("_vod"),ev=Symbol("_vsh"),tv=Symbol(""),nv=/(?:^|;)\s*display\s*:/;function rv(n,e,t){const r=n.style,s=Ue(t);let i=!1;if(t&&!s){if(e)if(Ue(e))for(const a of e.split(";")){const l=a.slice(0,a.indexOf(":")).trim();t[l]==null&&Yi(r,l,"")}else for(const a in e)t[a]==null&&Yi(r,a,"");for(const a in t)a==="display"&&(i=!0),Yi(r,a,t[a])}else if(s){if(e!==t){const a=r[tv];a&&(t+=";"+a),r.cssText=t,i=nv.test(t)}}else e&&n.removeAttribute("style");uh in n&&(n[uh]=i?r.display:"",n[ev]&&(r.display="none"))}const hh=/\s*!important$/;function Yi(n,e,t){if(ie(t))t.forEach(r=>Yi(n,e,r));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const r=sv(n,e);hh.test(t)?n.setProperty(Ir(r),t.replace(hh,""),"important"):n[r]=t}}const fh=["Webkit","Moz","ms"],qa={};function sv(n,e){const t=qa[e];if(t)return t;let r=Hn(e);if(r!=="filter"&&r in n)return qa[e]=r;r=od(r);for(let s=0;s<fh.length;s++){const i=fh[s]+r;if(i in n)return qa[e]=i}return e}const dh="http://www.w3.org/1999/xlink";function ph(n,e,t,r,s,i=c_(e)){r&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(dh,e.slice(6,e.length)):n.setAttributeNS(dh,e,t):t==null||i&&!ld(t)?n.removeAttribute(e):n.setAttribute(e,i?"":er(t)?String(t):t)}function mh(n,e,t,r,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?np(t):t);return}const i=n.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const l=i==="OPTION"?n.getAttribute("value")||"":n.value,c=t==null?n.type==="checkbox"?"on":"":String(t);(l!==c||!("_value"in n))&&(n.value=c),t==null&&n.removeAttribute(e),n._value=t;return}let a=!1;if(t===""||t==null){const l=typeof n[e];l==="boolean"?t=ld(t):t==null&&l==="string"?(t="",a=!0):l==="number"&&(t=0,a=!0)}try{n[e]=t}catch{}a&&n.removeAttribute(s||e)}function xr(n,e,t,r){n.addEventListener(e,t,r)}function iv(n,e,t,r){n.removeEventListener(e,t,r)}const gh=Symbol("_vei");function ov(n,e,t,r,s=null){const i=n[gh]||(n[gh]={}),a=i[e];if(r&&a)a.value=r;else{const[l,c]=av(e);if(r){const h=i[e]=uv(r,s);xr(n,l,h,c)}else a&&(iv(n,l,a,c),i[e]=void 0)}}const _h=/(?:Once|Passive|Capture)$/;function av(n){let e;if(_h.test(n)){e={};let r;for(;r=n.match(_h);)n=n.slice(0,n.length-r[0].length),e[r[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Ir(n.slice(2)),e]}let Ha=0;const lv=Promise.resolve(),cv=()=>Ha||(lv.then(()=>Ha=0),Ha=Date.now());function uv(n,e){const t=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=t.attached)return;Xt(hv(r,t.value),e,5,[r])};return t.value=n,t.attached=cv(),t}function hv(n,e){if(ie(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const yh=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,fv=(n,e,t,r,s,i)=>{const a=s==="svg";e==="class"?Zy(n,r,a):e==="style"?rv(n,t,r):Fo(e)?zl(e)||ov(n,e,t,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):dv(n,e,r,a))?(mh(n,e,r),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&ph(n,e,r,a,i,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!Ue(r))?mh(n,Hn(e),r,i,e):(e==="true-value"?n._trueValue=r:e==="false-value"&&(n._falseValue=r),ph(n,e,r,a))};function dv(n,e,t,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in n&&yh(e)&&le(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return yh(e)&&Ue(t)?!1:e in n}const vh=n=>{const e=n.props["onUpdate:modelValue"]||!1;return ie(e)?t=>Ki(e,t):e};function pv(n){n.target.composing=!0}function Eh(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const za=Symbol("_assign"),Th={created(n,{modifiers:{lazy:e,trim:t,number:r}},s){n[za]=vh(s);const i=r||s.props&&s.props.type==="number";xr(n,e?"change":"input",a=>{if(a.target.composing)return;let l=n.value;t&&(l=l.trim()),i&&(l=il(l)),n[za](l)}),t&&xr(n,"change",()=>{n.value=n.value.trim()}),e||(xr(n,"compositionstart",pv),xr(n,"compositionend",Eh),xr(n,"change",Eh))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:r,trim:s,number:i}},a){if(n[za]=vh(a),n.composing)return;const l=(i||n.type==="number")&&!/^0\d/.test(n.value)?il(n.value):n.value,c=e??"";l!==c&&(document.activeElement===n&&n.type!=="range"&&(r&&e===t||s&&n.value.trim()===c)||(n.value=c))}},mv=at({patchProp:fv},Xy);let Ih;function gv(){return Ih||(Ih=Ey(mv))}const _v=((...n)=>{const e=gv().createApp(...n),{mount:t}=e;return e.mount=r=>{const s=vv(r);if(!s)return;const i=e._component;!le(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const a=t(s,!1,yv(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},e});function yv(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function vv(n){return Ue(n)?document.querySelector(n):n}const Ev=()=>{};var wh={};/**
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
 */const rp=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Tv=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],l=n[t++],c=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},sp={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,l=a?n[s+1]:0,c=s+2<n.length,h=c?n[s+2]:0,d=i>>2,m=(i&3)<<4|l>>4;let _=(l&15)<<2|h>>6,w=h&63;c||(w=64,a||(_=64)),r.push(t[d],t[m],t[_],t[w])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(rp(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Tv(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||l==null||h==null||m==null)throw new Iv;const _=i<<2|l>>4;if(r.push(_),h!==64){const w=l<<4&240|h>>2;if(r.push(w),m!==64){const P=h<<6&192|m;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Iv extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const wv=function(n){const e=rp(n);return sp.encodeByteArray(e,!0)},vo=function(n){return wv(n).replace(/\./g,"")},ip=function(n){try{return sp.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Av(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const bv=()=>Av().__FIREBASE_DEFAULTS__,Sv=()=>{if(typeof process>"u"||typeof wh>"u")return;const n=wh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Rv=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&ip(n[1]);return e&&JSON.parse(e)},Xo=()=>{try{return Ev()||bv()||Sv()||Rv()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},op=n=>Xo()?.emulatorHosts?.[n],Cv=n=>{const e=op(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},ap=()=>Xo()?.config,lp=n=>Xo()?.[`_${n}`];/**
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
 */class Pv{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function os(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function cp(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function kv(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[vo(JSON.stringify(t)),vo(JSON.stringify(a)),""].join(".")}const js={};function Vv(){const n={prod:[],emulator:[]};for(const e of Object.keys(js))js[e]?n.emulator.push(e):n.prod.push(e);return n}function Dv(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Ah=!1;function up(n,e){if(typeof window>"u"||typeof document>"u"||!os(window.location.host)||js[n]===e||js[n]||Ah)return;js[n]=e;function t(_){return`__firebase__banner__${_}`}const r="__firebase__banner",i=Vv().prod.length>0;function a(){const _=document.getElementById(r);_&&_.remove()}function l(_){_.style.display="flex",_.style.background="#7faaf0",_.style.position="fixed",_.style.bottom="5px",_.style.left="5px",_.style.padding=".5em",_.style.borderRadius="5px",_.style.alignItems="center"}function c(_,w){_.setAttribute("width","24"),_.setAttribute("id",w),_.setAttribute("height","24"),_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.style.marginLeft="-6px"}function h(){const _=document.createElement("span");return _.style.cursor="pointer",_.style.marginLeft="16px",_.style.fontSize="24px",_.innerHTML=" &times;",_.onclick=()=>{Ah=!0,a()},_}function d(_,w){_.setAttribute("id",w),_.innerText="Learn more",_.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",_.setAttribute("target","__blank"),_.style.paddingLeft="5px",_.style.textDecoration="underline"}function m(){const _=Dv(r),w=t("text"),P=document.getElementById(w)||document.createElement("span"),F=t("learnmore"),M=document.getElementById(F)||document.createElement("a"),H=t("preprendIcon"),Q=document.getElementById(H)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(_.created){const z=_.element;l(z),d(M,F);const K=h();c(Q,H),z.append(Q,P,M,K),document.body.appendChild(z)}i?(P.innerText="Preview backend disconnected.",Q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(Q.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,P.innerText="Preview backend running in this workspace."),P.setAttribute("id",w)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}/**
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
 */function lt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Nv(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(lt())}function Ov(){const n=Xo()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function xv(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Mv(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Lv(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Fv(){const n=lt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Uv(){return!Ov()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Bv(){try{return typeof indexedDB=="object"}catch{return!1}}function $v(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
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
 */const jv="FirebaseError";class Tn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=jv,Object.setPrototypeOf(this,Tn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,hi.prototype.create)}}class hi{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?qv(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new Tn(s,l,r)}}function qv(n,e){return n.replace(Hv,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Hv=/\{\$([^}]+)}/g;function zv(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function gr(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(bh(i)&&bh(a)){if(!gr(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function bh(n){return n!==null&&typeof n=="object"}/**
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
 */function fi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Wv(n,e){const t=new Gv(n,e);return t.subscribe.bind(t)}class Gv{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Kv(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Wa),s.error===void 0&&(s.error=Wa),s.complete===void 0&&(s.complete=Wa);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Kv(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Wa(){}/**
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
 */function It(n){return n&&n._delegate?n._delegate:n}class _r{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const hr="[DEFAULT]";/**
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
 */class Qv{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Pv;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Xv(e))try{this.getOrInitializeService({instanceIdentifier:hr})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=hr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=hr){return this.instances.has(e)}getOptions(e=hr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Jv(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=hr){return this.component?this.component.multipleInstances?e:hr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Jv(n){return n===hr?void 0:n}function Xv(n){return n.instantiationMode==="EAGER"}/**
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
 */class Yv{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Qv(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ce;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ce||(ce={}));const Zv={debug:ce.DEBUG,verbose:ce.VERBOSE,info:ce.INFO,warn:ce.WARN,error:ce.ERROR,silent:ce.SILENT},eE=ce.INFO,tE={[ce.DEBUG]:"log",[ce.VERBOSE]:"log",[ce.INFO]:"info",[ce.WARN]:"warn",[ce.ERROR]:"error"},nE=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=tE[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class lc{constructor(e){this.name=e,this._logLevel=eE,this._logHandler=nE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ce))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Zv[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ce.DEBUG,...e),this._logHandler(this,ce.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ce.VERBOSE,...e),this._logHandler(this,ce.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ce.INFO,...e),this._logHandler(this,ce.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ce.WARN,...e),this._logHandler(this,ce.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ce.ERROR,...e),this._logHandler(this,ce.ERROR,...e)}}const rE=(n,e)=>e.some(t=>n instanceof t);let Sh,Rh;function sE(){return Sh||(Sh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function iE(){return Rh||(Rh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const hp=new WeakMap,_l=new WeakMap,fp=new WeakMap,Ga=new WeakMap,cc=new WeakMap;function oE(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Ln(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&hp.set(t,n)}).catch(()=>{}),cc.set(e,n),e}function aE(n){if(_l.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});_l.set(n,e)}let yl={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return _l.get(n);if(e==="objectStoreNames")return n.objectStoreNames||fp.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ln(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function lE(n){yl=n(yl)}function cE(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Ka(this),e,...t);return fp.set(r,e.sort?e.sort():[e]),Ln(r)}:iE().includes(n)?function(...e){return n.apply(Ka(this),e),Ln(hp.get(this))}:function(...e){return Ln(n.apply(Ka(this),e))}}function uE(n){return typeof n=="function"?cE(n):(n instanceof IDBTransaction&&aE(n),rE(n,sE())?new Proxy(n,yl):n)}function Ln(n){if(n instanceof IDBRequest)return oE(n);if(Ga.has(n))return Ga.get(n);const e=uE(n);return e!==n&&(Ga.set(n,e),cc.set(e,n)),e}const Ka=n=>cc.get(n);function hE(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),l=Ln(a);return r&&a.addEventListener("upgradeneeded",c=>{r(Ln(a.result),c.oldVersion,c.newVersion,Ln(a.transaction),c)}),t&&a.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const fE=["get","getKey","getAll","getAllKeys","count"],dE=["put","add","delete","clear"],Qa=new Map;function Ch(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Qa.get(e))return Qa.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=dE.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||fE.includes(t)))return;const i=async function(a,...l){const c=this.transaction(a,s?"readwrite":"readonly");let h=c.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[t](...l),s&&c.done]))[0]};return Qa.set(e,i),i}lE(n=>({...n,get:(e,t,r)=>Ch(e,t)||n.get(e,t,r),has:(e,t)=>!!Ch(e,t)||n.has(e,t)}));/**
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
 */class pE{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(mE(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function mE(n){return n.getComponent()?.type==="VERSION"}const vl="@firebase/app",Ph="0.14.2";/**
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
 */const mn=new lc("@firebase/app"),gE="@firebase/app-compat",_E="@firebase/analytics-compat",yE="@firebase/analytics",vE="@firebase/app-check-compat",EE="@firebase/app-check",TE="@firebase/auth",IE="@firebase/auth-compat",wE="@firebase/database",AE="@firebase/data-connect",bE="@firebase/database-compat",SE="@firebase/functions",RE="@firebase/functions-compat",CE="@firebase/installations",PE="@firebase/installations-compat",kE="@firebase/messaging",VE="@firebase/messaging-compat",DE="@firebase/performance",NE="@firebase/performance-compat",OE="@firebase/remote-config",xE="@firebase/remote-config-compat",ME="@firebase/storage",LE="@firebase/storage-compat",FE="@firebase/firestore",UE="@firebase/ai",BE="@firebase/firestore-compat",$E="firebase",jE="12.2.0";/**
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
 */const El="[DEFAULT]",qE={[vl]:"fire-core",[gE]:"fire-core-compat",[yE]:"fire-analytics",[_E]:"fire-analytics-compat",[EE]:"fire-app-check",[vE]:"fire-app-check-compat",[TE]:"fire-auth",[IE]:"fire-auth-compat",[wE]:"fire-rtdb",[AE]:"fire-data-connect",[bE]:"fire-rtdb-compat",[SE]:"fire-fn",[RE]:"fire-fn-compat",[CE]:"fire-iid",[PE]:"fire-iid-compat",[kE]:"fire-fcm",[VE]:"fire-fcm-compat",[DE]:"fire-perf",[NE]:"fire-perf-compat",[OE]:"fire-rc",[xE]:"fire-rc-compat",[ME]:"fire-gcs",[LE]:"fire-gcs-compat",[FE]:"fire-fst",[BE]:"fire-fst-compat",[UE]:"fire-vertex","fire-js":"fire-js",[$E]:"fire-js-all"};/**
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
 */const Eo=new Map,HE=new Map,Tl=new Map;function kh(n,e){try{n.container.addComponent(e)}catch(t){mn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Xr(n){const e=n.name;if(Tl.has(e))return mn.debug(`There were multiple attempts to register component ${e}.`),!1;Tl.set(e,n);for(const t of Eo.values())kh(t,n);for(const t of HE.values())kh(t,n);return!0}function uc(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Dt(n){return n==null?!1:n.settings!==void 0}/**
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
 */const zE={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Fn=new hi("app","Firebase",zE);/**
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
 */class WE{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new _r("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Fn.create("app-deleted",{appName:this._name})}}/**
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
 */const as=jE;function dp(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:El,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Fn.create("bad-app-name",{appName:String(s)});if(t||(t=ap()),!t)throw Fn.create("no-options");const i=Eo.get(s);if(i){if(gr(t,i.options)&&gr(r,i.config))return i;throw Fn.create("duplicate-app",{appName:s})}const a=new Yv(s);for(const c of Tl.values())a.addComponent(c);const l=new WE(t,r,a);return Eo.set(s,l),l}function pp(n=El){const e=Eo.get(n);if(!e&&n===El&&ap())return dp();if(!e)throw Fn.create("no-app",{appName:n});return e}function Un(n,e,t){let r=qE[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),mn.warn(a.join(" "));return}Xr(new _r(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const GE="firebase-heartbeat-database",KE=1,ei="firebase-heartbeat-store";let Ja=null;function mp(){return Ja||(Ja=hE(GE,KE,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ei)}catch(t){console.warn(t)}}}}).catch(n=>{throw Fn.create("idb-open",{originalErrorMessage:n.message})})),Ja}async function QE(n){try{const t=(await mp()).transaction(ei),r=await t.objectStore(ei).get(gp(n));return await t.done,r}catch(e){if(e instanceof Tn)mn.warn(e.message);else{const t=Fn.create("idb-get",{originalErrorMessage:e?.message});mn.warn(t.message)}}}async function Vh(n,e){try{const r=(await mp()).transaction(ei,"readwrite");await r.objectStore(ei).put(e,gp(n)),await r.done}catch(t){if(t instanceof Tn)mn.warn(t.message);else{const r=Fn.create("idb-set",{originalErrorMessage:t?.message});mn.warn(r.message)}}}function gp(n){return`${n.name}!${n.options.appId}`}/**
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
 */const JE=1024,XE=30;class YE{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new eT(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Dh();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>XE){const s=tT(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){mn.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Dh(),{heartbeatsToSend:t,unsentEntries:r}=ZE(this._heartbeatsCache.heartbeats),s=vo(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return mn.warn(e),""}}}function Dh(){return new Date().toISOString().substring(0,10)}function ZE(n,e=JE){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Nh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Nh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class eT{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Bv()?$v().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await QE(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Vh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Vh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Nh(n){return vo(JSON.stringify({version:2,heartbeats:n})).length}function tT(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function nT(n){Xr(new _r("platform-logger",e=>new pE(e),"PRIVATE")),Xr(new _r("heartbeat",e=>new YE(e),"PRIVATE")),Un(vl,Ph,n),Un(vl,Ph,"esm2020"),Un("fire-js","")}nT("");var rT="firebase",sT="12.2.1";/**
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
 */Un(rT,sT,"app");function _p(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const iT=_p,yp=new hi("auth","Firebase",_p());/**
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
 */const To=new lc("@firebase/auth");function oT(n,...e){To.logLevel<=ce.WARN&&To.warn(`Auth (${as}): ${n}`,...e)}function Zi(n,...e){To.logLevel<=ce.ERROR&&To.error(`Auth (${as}): ${n}`,...e)}/**
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
 */function gn(n,...e){throw hc(n,...e)}function Ht(n,...e){return hc(n,...e)}function vp(n,e,t){const r={...iT(),[e]:t};return new hi("auth","Firebase",r).create(e,{appName:n.name})}function Bn(n){return vp(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function hc(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return yp.create(n,...e)}function re(n,e,...t){if(!n)throw hc(e,...t)}function cn(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Zi(e),new Error(e)}function _n(n,e){n||cn(e)}/**
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
 */function Il(){return typeof self<"u"&&self.location?.href||""}function aT(){return Oh()==="http:"||Oh()==="https:"}function Oh(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function lT(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(aT()||Mv()||"connection"in navigator)?navigator.onLine:!0}function cT(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class di{constructor(e,t){this.shortDelay=e,this.longDelay=t,_n(t>e,"Short delay should be less than long delay!"),this.isMobile=Nv()||Lv()}get(){return lT()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function fc(n,e){_n(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Ep{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;cn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;cn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;cn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const uT={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const hT=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],fT=new di(3e4,6e4);function Yo(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function ls(n,e,t,r,s={}){return Tp(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const l=fi({key:n.config.apiKey,...a}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const h={method:e,headers:c,...i};return xv()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&os(n.emulatorConfig.host)&&(h.credentials="include"),Ep.fetch()(await wp(n,n.config.apiHost,t,l),h)})}async function Tp(n,e,t){n._canInitEmulator=!1;const r={...uT,...e};try{const s=new dT(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw ji(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[c,h]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw ji(n,"credential-already-in-use",a);if(c==="EMAIL_EXISTS")throw ji(n,"email-already-in-use",a);if(c==="USER_DISABLED")throw ji(n,"user-disabled",a);const d=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw vp(n,d,h);gn(n,d)}}catch(s){if(s instanceof Tn)throw s;gn(n,"network-request-failed",{message:String(s)})}}async function Ip(n,e,t,r,s={}){const i=await ls(n,e,t,r,s);return"mfaPendingCredential"in i&&gn(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function wp(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?fc(n.config,s):`${n.config.apiScheme}://${s}`;return hT.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class dT{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ht(this.auth,"network-request-failed")),fT.get())})}}function ji(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Ht(n,e,r);return s.customData._tokenResponse=t,s}/**
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
 */async function pT(n,e){return ls(n,"POST","/v1/accounts:delete",e)}async function Io(n,e){return ls(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function qs(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function mT(n,e=!1){const t=It(n),r=await t.getIdToken(e),s=dc(r);re(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:qs(Xa(s.auth_time)),issuedAtTime:qs(Xa(s.iat)),expirationTime:qs(Xa(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Xa(n){return Number(n)*1e3}function dc(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Zi("JWT malformed, contained fewer than 3 sections"),null;try{const s=ip(t);return s?JSON.parse(s):(Zi("Failed to decode base64 JWT payload"),null)}catch(s){return Zi("Caught error parsing JWT payload as JSON",s?.toString()),null}}function xh(n){const e=dc(n);return re(e,"internal-error"),re(typeof e.exp<"u","internal-error"),re(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ti(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Tn&&gT(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function gT({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class _T{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class wl{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=qs(this.lastLoginAt),this.creationTime=qs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function wo(n){const e=n.auth,t=await n.getIdToken(),r=await ti(n,Io(e,{idToken:t}));re(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?Ap(s.providerUserInfo):[],a=vT(n.providerData,i),l=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!a?.length,h=l?c:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new wl(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,d)}async function yT(n){const e=It(n);await wo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function vT(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Ap(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function ET(n,e){const t=await Tp(n,{},async()=>{const r=fi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await wp(n,s,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:r};return n.emulatorConfig&&os(n.emulatorConfig.host)&&(c.credentials="include"),Ep.fetch()(a,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function TT(n,e){return ls(n,"POST","/v2/accounts:revokeToken",Yo(n,e))}/**
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
 */class Wr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){re(e.idToken,"internal-error"),re(typeof e.idToken<"u","internal-error"),re(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):xh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){re(e.length!==0,"internal-error");const t=xh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(re(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await ET(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Wr;return r&&(re(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(re(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(re(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Wr,this.toJSON())}_performRefresh(){return cn("not implemented")}}/**
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
 */function Rn(n,e){re(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Nt{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new _T(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new wl(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await ti(this,this.stsTokenManager.getToken(this.auth,e));return re(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return mT(this,e)}reload(){return yT(this)}_assign(e){this!==e&&(re(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Nt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){re(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await wo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Dt(this.auth.app))return Promise.reject(Bn(this.auth));const e=await this.getIdToken();return await ti(this,pT(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,l=t.tenantId??void 0,c=t._redirectEventId??void 0,h=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:m,emailVerified:_,isAnonymous:w,providerData:P,stsTokenManager:F}=t;re(m&&F,e,"internal-error");const M=Wr.fromJSON(this.name,F);re(typeof m=="string",e,"internal-error"),Rn(r,e.name),Rn(s,e.name),re(typeof _=="boolean",e,"internal-error"),re(typeof w=="boolean",e,"internal-error"),Rn(i,e.name),Rn(a,e.name),Rn(l,e.name),Rn(c,e.name),Rn(h,e.name),Rn(d,e.name);const H=new Nt({uid:m,auth:e,email:s,emailVerified:_,displayName:r,isAnonymous:w,photoURL:a,phoneNumber:i,tenantId:l,stsTokenManager:M,createdAt:h,lastLoginAt:d});return P&&Array.isArray(P)&&(H.providerData=P.map(Q=>({...Q}))),c&&(H._redirectEventId=c),H}static async _fromIdTokenResponse(e,t,r=!1){const s=new Wr;s.updateFromServerResponse(t);const i=new Nt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await wo(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];re(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Ap(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,l=new Wr;l.updateFromIdToken(r);const c=new Nt({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new wl(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(c,h),c}}/**
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
 */const Mh=new Map;function un(n){_n(n instanceof Function,"Expected a class definition");let e=Mh.get(n);return e?(_n(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Mh.set(n,e),e)}/**
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
 */class bp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}bp.type="NONE";const Lh=bp;/**
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
 */function eo(n,e,t){return`firebase:${n}:${e}:${t}`}class Gr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=eo(this.userKey,s.apiKey,i),this.fullPersistenceKey=eo("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Io(this.auth,{idToken:e}).catch(()=>{});return t?Nt._fromGetAccountInfoResponse(this.auth,t,e):null}return Nt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Gr(un(Lh),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||un(Lh);const a=eo(r,e.config.apiKey,e.name);let l=null;for(const h of t)try{const d=await h._get(a);if(d){let m;if(typeof d=="string"){const _=await Io(e,{idToken:d}).catch(()=>{});if(!_)break;m=await Nt._fromGetAccountInfoResponse(e,_,d)}else m=Nt._fromJSON(e,d);h!==i&&(l=m),i=h;break}}catch{}const c=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new Gr(i,e,r):(i=c[0],l&&await i._set(a,l.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new Gr(i,e,r))}}/**
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
 */function Fh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Pp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Sp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Vp(e))return"Blackberry";if(Dp(e))return"Webos";if(Rp(e))return"Safari";if((e.includes("chrome/")||Cp(e))&&!e.includes("edge/"))return"Chrome";if(kp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Sp(n=lt()){return/firefox\//i.test(n)}function Rp(n=lt()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Cp(n=lt()){return/crios\//i.test(n)}function Pp(n=lt()){return/iemobile/i.test(n)}function kp(n=lt()){return/android/i.test(n)}function Vp(n=lt()){return/blackberry/i.test(n)}function Dp(n=lt()){return/webos/i.test(n)}function pc(n=lt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function IT(n=lt()){return pc(n)&&!!window.navigator?.standalone}function wT(){return Fv()&&document.documentMode===10}function Np(n=lt()){return pc(n)||kp(n)||Dp(n)||Vp(n)||/windows phone/i.test(n)||Pp(n)}/**
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
 */function Op(n,e=[]){let t;switch(n){case"Browser":t=Fh(lt());break;case"Worker":t=`${Fh(lt())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${as}/${r}`}/**
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
 */class AT{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,l)=>{try{const c=e(i);a(c)}catch(c){l(c)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function bT(n,e={}){return ls(n,"GET","/v2/passwordPolicy",Yo(n,e))}/**
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
 */const ST=6;class RT{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??ST,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class CT{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Uh(this),this.idTokenSubscription=new Uh(this),this.beforeStateQueue=new AT(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=yp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=un(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Gr.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Io(this,{idToken:e}),r=await Nt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Dt(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,a=r?._redirectEventId,l=await this.tryRedirectSignIn(e);(!i||i===a)&&l?.user&&(r=l.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return re(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await wo(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=cT()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Dt(this.app))return Promise.reject(Bn(this));const t=e?It(e):null;return t&&re(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&re(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Dt(this.app)?Promise.reject(Bn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Dt(this.app)?Promise.reject(Bn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(un(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await bT(this),t=new RT(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new hi("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await TT(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&un(e)||this._popupRedirectResolver;re(t,this,"argument-error"),this.redirectPersistenceManager=await Gr.create(this,[un(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(re(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,r,s);return()=>{a=!0,c()}}else{const c=e.addObserver(t);return()=>{a=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return re(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Op(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Dt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&oT(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Zo(n){return It(n)}class Uh{constructor(e){this.auth=e,this.observer=null,this.addObserver=Wv(t=>this.observer=t)}get next(){return re(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let mc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function PT(n){mc=n}function kT(n){return mc.loadJS(n)}function VT(){return mc.gapiScript}function DT(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function NT(n,e){const t=uc(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(gr(i,e??{}))return s;gn(s,"already-initialized")}return t.initialize({options:e})}function OT(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(un);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function xT(n,e,t){const r=Zo(n);re(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=xp(e),{host:a,port:l}=MT(e),c=l===null?"":`:${l}`,h={url:`${i}//${a}${c}/`},d=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){re(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),re(gr(h,r.config.emulator)&&gr(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,os(a)?(cp(`${i}//${a}${c}`),up("Auth",!0)):LT()}function xp(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function MT(n){const e=xp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Bh(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Bh(a)}}}function Bh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function LT(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Mp{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return cn("not implemented")}_getIdTokenResponse(e){return cn("not implemented")}_linkToIdToken(e,t){return cn("not implemented")}_getReauthenticationResolver(e){return cn("not implemented")}}/**
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
 */async function Kr(n,e){return Ip(n,"POST","/v1/accounts:signInWithIdp",Yo(n,e))}/**
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
 */const FT="http://localhost";class yr extends Mp{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new yr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):gn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new yr(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Kr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Kr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Kr(e,t)}buildRequest(){const e={requestUri:FT,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=fi(t)}return e}}/**
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
 */class Lp{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class pi extends Lp{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class kn extends pi{constructor(){super("facebook.com")}static credential(e){return yr._fromParams({providerId:kn.PROVIDER_ID,signInMethod:kn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return kn.credentialFromTaggedObject(e)}static credentialFromError(e){return kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return kn.credential(e.oauthAccessToken)}catch{return null}}}kn.FACEBOOK_SIGN_IN_METHOD="facebook.com";kn.PROVIDER_ID="facebook.com";/**
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
 */class Vn extends pi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return yr._fromParams({providerId:Vn.PROVIDER_ID,signInMethod:Vn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Vn.credentialFromTaggedObject(e)}static credentialFromError(e){return Vn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Vn.credential(t,r)}catch{return null}}}Vn.GOOGLE_SIGN_IN_METHOD="google.com";Vn.PROVIDER_ID="google.com";/**
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
 */class Dn extends pi{constructor(){super("github.com")}static credential(e){return yr._fromParams({providerId:Dn.PROVIDER_ID,signInMethod:Dn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Dn.credentialFromTaggedObject(e)}static credentialFromError(e){return Dn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Dn.credential(e.oauthAccessToken)}catch{return null}}}Dn.GITHUB_SIGN_IN_METHOD="github.com";Dn.PROVIDER_ID="github.com";/**
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
 */class Nn extends pi{constructor(){super("twitter.com")}static credential(e,t){return yr._fromParams({providerId:Nn.PROVIDER_ID,signInMethod:Nn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Nn.credentialFromTaggedObject(e)}static credentialFromError(e){return Nn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Nn.credential(t,r)}catch{return null}}}Nn.TWITTER_SIGN_IN_METHOD="twitter.com";Nn.PROVIDER_ID="twitter.com";/**
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
 */async function UT(n,e){return Ip(n,"POST","/v1/accounts:signUp",Yo(n,e))}/**
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
 */class Gn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Nt._fromIdTokenResponse(e,r,s),a=$h(r);return new Gn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=$h(r);return new Gn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function $h(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */async function BT(n){if(Dt(n.app))return Promise.reject(Bn(n));const e=Zo(n);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new Gn({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await UT(e,{returnSecureToken:!0}),r=await Gn._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(r.user),r}/**
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
 */class Ao extends Tn{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Ao.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Ao(e,t,r,s)}}function Fp(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ao._fromErrorAndOperation(n,i,e,r):i})}async function $T(n,e,t=!1){const r=await ti(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Gn._forOperation(n,"link",r)}/**
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
 */async function jT(n,e,t=!1){const{auth:r}=n;if(Dt(r.app))return Promise.reject(Bn(r));const s="reauthenticate";try{const i=await ti(n,Fp(r,s,e,n),t);re(i.idToken,r,"internal-error");const a=dc(i.idToken);re(a,r,"internal-error");const{sub:l}=a;return re(n.uid===l,r,"user-mismatch"),Gn._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&gn(r,"user-mismatch"),i}}/**
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
 */async function qT(n,e,t=!1){if(Dt(n.app))return Promise.reject(Bn(n));const r="signIn",s=await Fp(n,r,e),i=await Gn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function HT(n,e,t,r){return It(n).onIdTokenChanged(e,t,r)}function zT(n,e,t){return It(n).beforeAuthStateChanged(e,t)}const bo="__sak";/**
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
 */class Up{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(bo,"1"),this.storage.removeItem(bo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const WT=1e3,GT=10;class Bp extends Up{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Np(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,c)=>{this.notifyListeners(a,c)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);wT()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,GT):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},WT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Bp.type="LOCAL";const KT=Bp;/**
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
 */class $p extends Up{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}$p.type="SESSION";const jp=$p;/**
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
 */function QT(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class ea{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ea(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async h=>h(t.origin,i)),c=await QT(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ea.receivers=[];/**
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
 */function gc(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class JT{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,c)=>{const h=gc("",20);s.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(m){const _=m;if(_.data.eventId===h)switch(_.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(_.data.response);break;default:clearTimeout(d),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function zt(){return window}function XT(n){zt().location.href=n}/**
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
 */function qp(){return typeof zt().WorkerGlobalScope<"u"&&typeof zt().importScripts=="function"}async function YT(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ZT(){return navigator?.serviceWorker?.controller||null}function eI(){return qp()?self:null}/**
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
 */const Hp="firebaseLocalStorageDb",tI=1,So="firebaseLocalStorage",zp="fbase_key";class mi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ta(n,e){return n.transaction([So],e?"readwrite":"readonly").objectStore(So)}function nI(){const n=indexedDB.deleteDatabase(Hp);return new mi(n).toPromise()}function Al(){const n=indexedDB.open(Hp,tI);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(So,{keyPath:zp})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(So)?e(r):(r.close(),await nI(),e(await Al()))})})}async function jh(n,e,t){const r=ta(n,!0).put({[zp]:e,value:t});return new mi(r).toPromise()}async function rI(n,e){const t=ta(n,!1).get(e),r=await new mi(t).toPromise();return r===void 0?null:r.value}function qh(n,e){const t=ta(n,!0).delete(e);return new mi(t).toPromise()}const sI=800,iI=3;class Wp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Al(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>iI)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return qp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ea._getInstance(eI()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await YT(),!this.activeServiceWorker)return;this.sender=new JT(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ZT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Al();return await jh(e,bo,"1"),await qh(e,bo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>jh(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>rI(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>qh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=ta(s,!1).getAll();return new mi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),sI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Wp.type="LOCAL";const oI=Wp;new di(3e4,6e4);/**
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
 */function aI(n,e){return e?un(e):(re(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class _c extends Mp{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Kr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Kr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Kr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function lI(n){return qT(n.auth,new _c(n),n.bypassAuthState)}function cI(n){const{auth:e,user:t}=n;return re(t,e,"internal-error"),jT(t,new _c(n),n.bypassAuthState)}async function uI(n){const{auth:e,user:t}=n;return re(t,e,"internal-error"),$T(t,new _c(n),n.bypassAuthState)}/**
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
 */class Gp{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const c={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return lI;case"linkViaPopup":case"linkViaRedirect":return uI;case"reauthViaPopup":case"reauthViaRedirect":return cI;default:gn(this.auth,"internal-error")}}resolve(e){_n(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){_n(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const hI=new di(2e3,1e4);class Br extends Gp{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Br.currentPopupAction&&Br.currentPopupAction.cancel(),Br.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return re(e,this.auth,"internal-error"),e}async onExecution(){_n(this.filter.length===1,"Popup operations only handle one event");const e=gc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ht(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Ht(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Br.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ht(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,hI.get())};e()}}Br.currentPopupAction=null;/**
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
 */const fI="pendingRedirect",to=new Map;class dI extends Gp{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=to.get(this.auth._key());if(!e){try{const r=await pI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}to.set(this.auth._key(),e)}return this.bypassAuthState||to.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function pI(n,e){const t=_I(e),r=gI(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function mI(n,e){to.set(n._key(),e)}function gI(n){return un(n._redirectPersistence)}function _I(n){return eo(fI,n.config.apiKey,n.name)}async function yI(n,e,t=!1){if(Dt(n.app))return Promise.reject(Bn(n));const r=Zo(n),s=aI(r,e),a=await new dI(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const vI=600*1e3;class EI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!TI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Kp(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(Ht(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=vI&&this.cachedEventUids.clear(),this.cachedEventUids.has(Hh(e))}saveEventToCache(e){this.cachedEventUids.add(Hh(e)),this.lastProcessedEventTime=Date.now()}}function Hh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Kp({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function TI(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Kp(n);default:return!1}}/**
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
 */async function II(n,e={}){return ls(n,"GET","/v1/projects",e)}/**
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
 */const wI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,AI=/^https?/;async function bI(n){if(n.config.emulator)return;const{authorizedDomains:e}=await II(n);for(const t of e)try{if(SI(t))return}catch{}gn(n,"unauthorized-domain")}function SI(n){const e=Il(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!AI.test(t))return!1;if(wI.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const RI=new di(3e4,6e4);function zh(){const n=zt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function CI(n){return new Promise((e,t)=>{function r(){zh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{zh(),t(Ht(n,"network-request-failed"))},timeout:RI.get()})}if(zt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(zt().gapi?.load)r();else{const s=DT("iframefcb");return zt()[s]=()=>{gapi.load?r():t(Ht(n,"network-request-failed"))},kT(`${VT()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw no=null,e})}let no=null;function PI(n){return no=no||CI(n),no}/**
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
 */const kI=new di(5e3,15e3),VI="__/auth/iframe",DI="emulator/auth/iframe",NI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},OI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function xI(n){const e=n.config;re(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?fc(e,DI):`https://${n.config.authDomain}/${VI}`,r={apiKey:e.apiKey,appName:n.name,v:as},s=OI.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${fi(r).slice(1)}`}async function MI(n){const e=await PI(n),t=zt().gapi;return re(t,n,"internal-error"),e.open({where:document.body,url:xI(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:NI,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Ht(n,"network-request-failed"),l=zt().setTimeout(()=>{i(a)},kI.get());function c(){zt().clearTimeout(l),s(r)}r.ping(c).then(c,()=>{i(a)})}))}/**
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
 */const LI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},FI=500,UI=600,BI="_blank",$I="http://localhost";class Wh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function jI(n,e,t,r=FI,s=UI){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c={...LI,width:r.toString(),height:s.toString(),top:i,left:a},h=lt().toLowerCase();t&&(l=Cp(h)?BI:t),Sp(h)&&(e=e||$I,c.scrollbars="yes");const d=Object.entries(c).reduce((_,[w,P])=>`${_}${w}=${P},`,"");if(IT(h)&&l!=="_self")return qI(e||"",l),new Wh(null);const m=window.open(e||"",l,d);re(m,n,"popup-blocked");try{m.focus()}catch{}return new Wh(m)}function qI(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const HI="__/auth/handler",zI="emulator/auth/handler",WI=encodeURIComponent("fac");async function Gh(n,e,t,r,s,i){re(n.config.authDomain,n,"auth-domain-config-required"),re(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:as,eventId:s};if(e instanceof Lp){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",zv(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,m]of Object.entries({}))a[d]=m}if(e instanceof pi){const d=e.getScopes().filter(m=>m!=="");d.length>0&&(a.scopes=d.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const d of Object.keys(l))l[d]===void 0&&delete l[d];const c=await n._getAppCheckToken(),h=c?`#${WI}=${encodeURIComponent(c)}`:"";return`${GI(n)}?${fi(l).slice(1)}${h}`}function GI({config:n}){return n.emulator?fc(n,zI):`https://${n.authDomain}/${HI}`}/**
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
 */const Ya="webStorageSupport";class KI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=jp,this._completeRedirectFn=yI,this._overrideRedirectResult=mI}async _openPopup(e,t,r,s){_n(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Gh(e,t,r,Il(),s);return jI(e,i,gc())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Gh(e,t,r,Il(),s);return XT(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(_n(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await MI(e),r=new EI(e);return t.register("authEvent",s=>(re(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ya,{type:Ya},s=>{const i=s?.[0]?.[Ya];i!==void 0&&t(!!i),gn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=bI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Np()||Rp()||pc()}}const QI=KI;var Kh="@firebase/auth",Qh="1.11.0";/**
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
 */class JI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){re(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function XI(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function YI(n){Xr(new _r("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;re(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Op(n)},h=new CT(r,s,i,c);return OT(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Xr(new _r("auth-internal",e=>{const t=Zo(e.getProvider("auth").getImmediate());return(r=>new JI(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Un(Kh,Qh,XI(n)),Un(Kh,Qh,"esm2020")}/**
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
 */const ZI=300,ew=lp("authIdTokenMaxAge")||ZI;let Jh=null;const tw=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>ew)return;const s=t?.token;Jh!==s&&(Jh=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function nw(n=pp()){const e=uc(n,"auth");if(e.isInitialized())return e.getImmediate();const t=NT(n,{popupRedirectResolver:QI,persistence:[oI,KT,jp]}),r=lp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=tw(i.toString());zT(t,a,()=>a(t.currentUser)),HT(t,l=>a(l))}}const s=op("auth");return s&&xT(t,`http://${s}`),t}function rw(){return document.getElementsByTagName("head")?.[0]??document}PT({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Ht("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",rw().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});YI("Browser");var Xh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var $n,Qp;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(b,v){function g(){}g.prototype=v.prototype,b.D=v.prototype,b.prototype=new g,b.prototype.constructor=b,b.C=function(y,I,S){for(var T=Array(arguments.length-2),_t=2;_t<arguments.length;_t++)T[_t-2]=arguments[_t];return v.prototype[I].apply(y,T)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(b,v,g){g||(g=0);var y=Array(16);if(typeof v=="string")for(var I=0;16>I;++I)y[I]=v.charCodeAt(g++)|v.charCodeAt(g++)<<8|v.charCodeAt(g++)<<16|v.charCodeAt(g++)<<24;else for(I=0;16>I;++I)y[I]=v[g++]|v[g++]<<8|v[g++]<<16|v[g++]<<24;v=b.g[0],g=b.g[1],I=b.g[2];var S=b.g[3],T=v+(S^g&(I^S))+y[0]+3614090360&4294967295;v=g+(T<<7&4294967295|T>>>25),T=S+(I^v&(g^I))+y[1]+3905402710&4294967295,S=v+(T<<12&4294967295|T>>>20),T=I+(g^S&(v^g))+y[2]+606105819&4294967295,I=S+(T<<17&4294967295|T>>>15),T=g+(v^I&(S^v))+y[3]+3250441966&4294967295,g=I+(T<<22&4294967295|T>>>10),T=v+(S^g&(I^S))+y[4]+4118548399&4294967295,v=g+(T<<7&4294967295|T>>>25),T=S+(I^v&(g^I))+y[5]+1200080426&4294967295,S=v+(T<<12&4294967295|T>>>20),T=I+(g^S&(v^g))+y[6]+2821735955&4294967295,I=S+(T<<17&4294967295|T>>>15),T=g+(v^I&(S^v))+y[7]+4249261313&4294967295,g=I+(T<<22&4294967295|T>>>10),T=v+(S^g&(I^S))+y[8]+1770035416&4294967295,v=g+(T<<7&4294967295|T>>>25),T=S+(I^v&(g^I))+y[9]+2336552879&4294967295,S=v+(T<<12&4294967295|T>>>20),T=I+(g^S&(v^g))+y[10]+4294925233&4294967295,I=S+(T<<17&4294967295|T>>>15),T=g+(v^I&(S^v))+y[11]+2304563134&4294967295,g=I+(T<<22&4294967295|T>>>10),T=v+(S^g&(I^S))+y[12]+1804603682&4294967295,v=g+(T<<7&4294967295|T>>>25),T=S+(I^v&(g^I))+y[13]+4254626195&4294967295,S=v+(T<<12&4294967295|T>>>20),T=I+(g^S&(v^g))+y[14]+2792965006&4294967295,I=S+(T<<17&4294967295|T>>>15),T=g+(v^I&(S^v))+y[15]+1236535329&4294967295,g=I+(T<<22&4294967295|T>>>10),T=v+(I^S&(g^I))+y[1]+4129170786&4294967295,v=g+(T<<5&4294967295|T>>>27),T=S+(g^I&(v^g))+y[6]+3225465664&4294967295,S=v+(T<<9&4294967295|T>>>23),T=I+(v^g&(S^v))+y[11]+643717713&4294967295,I=S+(T<<14&4294967295|T>>>18),T=g+(S^v&(I^S))+y[0]+3921069994&4294967295,g=I+(T<<20&4294967295|T>>>12),T=v+(I^S&(g^I))+y[5]+3593408605&4294967295,v=g+(T<<5&4294967295|T>>>27),T=S+(g^I&(v^g))+y[10]+38016083&4294967295,S=v+(T<<9&4294967295|T>>>23),T=I+(v^g&(S^v))+y[15]+3634488961&4294967295,I=S+(T<<14&4294967295|T>>>18),T=g+(S^v&(I^S))+y[4]+3889429448&4294967295,g=I+(T<<20&4294967295|T>>>12),T=v+(I^S&(g^I))+y[9]+568446438&4294967295,v=g+(T<<5&4294967295|T>>>27),T=S+(g^I&(v^g))+y[14]+3275163606&4294967295,S=v+(T<<9&4294967295|T>>>23),T=I+(v^g&(S^v))+y[3]+4107603335&4294967295,I=S+(T<<14&4294967295|T>>>18),T=g+(S^v&(I^S))+y[8]+1163531501&4294967295,g=I+(T<<20&4294967295|T>>>12),T=v+(I^S&(g^I))+y[13]+2850285829&4294967295,v=g+(T<<5&4294967295|T>>>27),T=S+(g^I&(v^g))+y[2]+4243563512&4294967295,S=v+(T<<9&4294967295|T>>>23),T=I+(v^g&(S^v))+y[7]+1735328473&4294967295,I=S+(T<<14&4294967295|T>>>18),T=g+(S^v&(I^S))+y[12]+2368359562&4294967295,g=I+(T<<20&4294967295|T>>>12),T=v+(g^I^S)+y[5]+4294588738&4294967295,v=g+(T<<4&4294967295|T>>>28),T=S+(v^g^I)+y[8]+2272392833&4294967295,S=v+(T<<11&4294967295|T>>>21),T=I+(S^v^g)+y[11]+1839030562&4294967295,I=S+(T<<16&4294967295|T>>>16),T=g+(I^S^v)+y[14]+4259657740&4294967295,g=I+(T<<23&4294967295|T>>>9),T=v+(g^I^S)+y[1]+2763975236&4294967295,v=g+(T<<4&4294967295|T>>>28),T=S+(v^g^I)+y[4]+1272893353&4294967295,S=v+(T<<11&4294967295|T>>>21),T=I+(S^v^g)+y[7]+4139469664&4294967295,I=S+(T<<16&4294967295|T>>>16),T=g+(I^S^v)+y[10]+3200236656&4294967295,g=I+(T<<23&4294967295|T>>>9),T=v+(g^I^S)+y[13]+681279174&4294967295,v=g+(T<<4&4294967295|T>>>28),T=S+(v^g^I)+y[0]+3936430074&4294967295,S=v+(T<<11&4294967295|T>>>21),T=I+(S^v^g)+y[3]+3572445317&4294967295,I=S+(T<<16&4294967295|T>>>16),T=g+(I^S^v)+y[6]+76029189&4294967295,g=I+(T<<23&4294967295|T>>>9),T=v+(g^I^S)+y[9]+3654602809&4294967295,v=g+(T<<4&4294967295|T>>>28),T=S+(v^g^I)+y[12]+3873151461&4294967295,S=v+(T<<11&4294967295|T>>>21),T=I+(S^v^g)+y[15]+530742520&4294967295,I=S+(T<<16&4294967295|T>>>16),T=g+(I^S^v)+y[2]+3299628645&4294967295,g=I+(T<<23&4294967295|T>>>9),T=v+(I^(g|~S))+y[0]+4096336452&4294967295,v=g+(T<<6&4294967295|T>>>26),T=S+(g^(v|~I))+y[7]+1126891415&4294967295,S=v+(T<<10&4294967295|T>>>22),T=I+(v^(S|~g))+y[14]+2878612391&4294967295,I=S+(T<<15&4294967295|T>>>17),T=g+(S^(I|~v))+y[5]+4237533241&4294967295,g=I+(T<<21&4294967295|T>>>11),T=v+(I^(g|~S))+y[12]+1700485571&4294967295,v=g+(T<<6&4294967295|T>>>26),T=S+(g^(v|~I))+y[3]+2399980690&4294967295,S=v+(T<<10&4294967295|T>>>22),T=I+(v^(S|~g))+y[10]+4293915773&4294967295,I=S+(T<<15&4294967295|T>>>17),T=g+(S^(I|~v))+y[1]+2240044497&4294967295,g=I+(T<<21&4294967295|T>>>11),T=v+(I^(g|~S))+y[8]+1873313359&4294967295,v=g+(T<<6&4294967295|T>>>26),T=S+(g^(v|~I))+y[15]+4264355552&4294967295,S=v+(T<<10&4294967295|T>>>22),T=I+(v^(S|~g))+y[6]+2734768916&4294967295,I=S+(T<<15&4294967295|T>>>17),T=g+(S^(I|~v))+y[13]+1309151649&4294967295,g=I+(T<<21&4294967295|T>>>11),T=v+(I^(g|~S))+y[4]+4149444226&4294967295,v=g+(T<<6&4294967295|T>>>26),T=S+(g^(v|~I))+y[11]+3174756917&4294967295,S=v+(T<<10&4294967295|T>>>22),T=I+(v^(S|~g))+y[2]+718787259&4294967295,I=S+(T<<15&4294967295|T>>>17),T=g+(S^(I|~v))+y[9]+3951481745&4294967295,b.g[0]=b.g[0]+v&4294967295,b.g[1]=b.g[1]+(I+(T<<21&4294967295|T>>>11))&4294967295,b.g[2]=b.g[2]+I&4294967295,b.g[3]=b.g[3]+S&4294967295}r.prototype.u=function(b,v){v===void 0&&(v=b.length);for(var g=v-this.blockSize,y=this.B,I=this.h,S=0;S<v;){if(I==0)for(;S<=g;)s(this,b,S),S+=this.blockSize;if(typeof b=="string"){for(;S<v;)if(y[I++]=b.charCodeAt(S++),I==this.blockSize){s(this,y),I=0;break}}else for(;S<v;)if(y[I++]=b[S++],I==this.blockSize){s(this,y),I=0;break}}this.h=I,this.o+=v},r.prototype.v=function(){var b=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);b[0]=128;for(var v=1;v<b.length-8;++v)b[v]=0;var g=8*this.o;for(v=b.length-8;v<b.length;++v)b[v]=g&255,g/=256;for(this.u(b),b=Array(16),v=g=0;4>v;++v)for(var y=0;32>y;y+=8)b[g++]=this.g[v]>>>y&255;return b};function i(b,v){var g=l;return Object.prototype.hasOwnProperty.call(g,b)?g[b]:g[b]=v(b)}function a(b,v){this.h=v;for(var g=[],y=!0,I=b.length-1;0<=I;I--){var S=b[I]|0;y&&S==v||(g[I]=S,y=!1)}this.g=g}var l={};function c(b){return-128<=b&&128>b?i(b,function(v){return new a([v|0],0>v?-1:0)}):new a([b|0],0>b?-1:0)}function h(b){if(isNaN(b)||!isFinite(b))return m;if(0>b)return M(h(-b));for(var v=[],g=1,y=0;b>=g;y++)v[y]=b/g|0,g*=4294967296;return new a(v,0)}function d(b,v){if(b.length==0)throw Error("number format error: empty string");if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(b.charAt(0)=="-")return M(d(b.substring(1),v));if(0<=b.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=h(Math.pow(v,8)),y=m,I=0;I<b.length;I+=8){var S=Math.min(8,b.length-I),T=parseInt(b.substring(I,I+S),v);8>S?(S=h(Math.pow(v,S)),y=y.j(S).add(h(T))):(y=y.j(g),y=y.add(h(T)))}return y}var m=c(0),_=c(1),w=c(16777216);n=a.prototype,n.m=function(){if(F(this))return-M(this).m();for(var b=0,v=1,g=0;g<this.g.length;g++){var y=this.i(g);b+=(0<=y?y:4294967296+y)*v,v*=4294967296}return b},n.toString=function(b){if(b=b||10,2>b||36<b)throw Error("radix out of range: "+b);if(P(this))return"0";if(F(this))return"-"+M(this).toString(b);for(var v=h(Math.pow(b,6)),g=this,y="";;){var I=K(g,v).g;g=H(g,I.j(v));var S=((0<g.g.length?g.g[0]:g.h)>>>0).toString(b);if(g=I,P(g))return S+y;for(;6>S.length;)S="0"+S;y=S+y}},n.i=function(b){return 0>b?0:b<this.g.length?this.g[b]:this.h};function P(b){if(b.h!=0)return!1;for(var v=0;v<b.g.length;v++)if(b.g[v]!=0)return!1;return!0}function F(b){return b.h==-1}n.l=function(b){return b=H(this,b),F(b)?-1:P(b)?0:1};function M(b){for(var v=b.g.length,g=[],y=0;y<v;y++)g[y]=~b.g[y];return new a(g,~b.h).add(_)}n.abs=function(){return F(this)?M(this):this},n.add=function(b){for(var v=Math.max(this.g.length,b.g.length),g=[],y=0,I=0;I<=v;I++){var S=y+(this.i(I)&65535)+(b.i(I)&65535),T=(S>>>16)+(this.i(I)>>>16)+(b.i(I)>>>16);y=T>>>16,S&=65535,T&=65535,g[I]=T<<16|S}return new a(g,g[g.length-1]&-2147483648?-1:0)};function H(b,v){return b.add(M(v))}n.j=function(b){if(P(this)||P(b))return m;if(F(this))return F(b)?M(this).j(M(b)):M(M(this).j(b));if(F(b))return M(this.j(M(b)));if(0>this.l(w)&&0>b.l(w))return h(this.m()*b.m());for(var v=this.g.length+b.g.length,g=[],y=0;y<2*v;y++)g[y]=0;for(y=0;y<this.g.length;y++)for(var I=0;I<b.g.length;I++){var S=this.i(y)>>>16,T=this.i(y)&65535,_t=b.i(I)>>>16,In=b.i(I)&65535;g[2*y+2*I]+=T*In,Q(g,2*y+2*I),g[2*y+2*I+1]+=S*In,Q(g,2*y+2*I+1),g[2*y+2*I+1]+=T*_t,Q(g,2*y+2*I+1),g[2*y+2*I+2]+=S*_t,Q(g,2*y+2*I+2)}for(y=0;y<v;y++)g[y]=g[2*y+1]<<16|g[2*y];for(y=v;y<2*v;y++)g[y]=0;return new a(g,0)};function Q(b,v){for(;(b[v]&65535)!=b[v];)b[v+1]+=b[v]>>>16,b[v]&=65535,v++}function z(b,v){this.g=b,this.h=v}function K(b,v){if(P(v))throw Error("division by zero");if(P(b))return new z(m,m);if(F(b))return v=K(M(b),v),new z(M(v.g),M(v.h));if(F(v))return v=K(b,M(v)),new z(M(v.g),v.h);if(30<b.g.length){if(F(b)||F(v))throw Error("slowDivide_ only works with positive integers.");for(var g=_,y=v;0>=y.l(b);)g=me(g),y=me(y);var I=we(g,1),S=we(y,1);for(y=we(y,2),g=we(g,2);!P(y);){var T=S.add(y);0>=T.l(b)&&(I=I.add(g),S=T),y=we(y,1),g=we(g,1)}return v=H(b,I.j(v)),new z(I,v)}for(I=m;0<=b.l(v);){for(g=Math.max(1,Math.floor(b.m()/v.m())),y=Math.ceil(Math.log(g)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),S=h(g),T=S.j(v);F(T)||0<T.l(b);)g-=y,S=h(g),T=S.j(v);P(S)&&(S=_),I=I.add(S),b=H(b,T)}return new z(I,b)}n.A=function(b){return K(this,b).h},n.and=function(b){for(var v=Math.max(this.g.length,b.g.length),g=[],y=0;y<v;y++)g[y]=this.i(y)&b.i(y);return new a(g,this.h&b.h)},n.or=function(b){for(var v=Math.max(this.g.length,b.g.length),g=[],y=0;y<v;y++)g[y]=this.i(y)|b.i(y);return new a(g,this.h|b.h)},n.xor=function(b){for(var v=Math.max(this.g.length,b.g.length),g=[],y=0;y<v;y++)g[y]=this.i(y)^b.i(y);return new a(g,this.h^b.h)};function me(b){for(var v=b.g.length+1,g=[],y=0;y<v;y++)g[y]=b.i(y)<<1|b.i(y-1)>>>31;return new a(g,b.h)}function we(b,v){var g=v>>5;v%=32;for(var y=b.g.length-g,I=[],S=0;S<y;S++)I[S]=0<v?b.i(S+g)>>>v|b.i(S+g+1)<<32-v:b.i(S+g);return new a(I,b.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Qp=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=d,$n=a}).apply(typeof Xh<"u"?Xh:typeof self<"u"?self:typeof window<"u"?window:{});var qi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Jp,Vs,Xp,ro,bl,Yp,Zp,em;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,f){return o==Array.prototype||o==Object.prototype||(o[u]=f.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof qi=="object"&&qi];for(var u=0;u<o.length;++u){var f=o[u];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function s(o,u){if(u)e:{var f=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var R=o[p];if(!(R in f))break e;f=f[R]}o=o[o.length-1],p=f[o],u=u(p),u!=p&&u!=null&&e(f,o,{configurable:!0,writable:!0,value:u})}}function i(o,u){o instanceof String&&(o+="");var f=0,p=!1,R={next:function(){if(!p&&f<o.length){var C=f++;return{value:u(C,o[C]),done:!1}}return p=!0,{done:!0,value:void 0}}};return R[Symbol.iterator]=function(){return R},R}s("Array.prototype.values",function(o){return o||function(){return i(this,function(u,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function c(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function h(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function d(o,u,f){return o.call.apply(o.bind,arguments)}function m(o,u,f){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var R=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(R,p),o.apply(u,R)}}return function(){return o.apply(u,arguments)}}function _(o,u,f){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:m,_.apply(null,arguments)}function w(o,u){var f=Array.prototype.slice.call(arguments,1);return function(){var p=f.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function P(o,u){function f(){}f.prototype=u.prototype,o.aa=u.prototype,o.prototype=new f,o.prototype.constructor=o,o.Qb=function(p,R,C){for(var $=Array(arguments.length-2),Ae=2;Ae<arguments.length;Ae++)$[Ae-2]=arguments[Ae];return u.prototype[R].apply(p,$)}}function F(o){const u=o.length;if(0<u){const f=Array(u);for(let p=0;p<u;p++)f[p]=o[p];return f}return[]}function M(o,u){for(let f=1;f<arguments.length;f++){const p=arguments[f];if(c(p)){const R=o.length||0,C=p.length||0;o.length=R+C;for(let $=0;$<C;$++)o[R+$]=p[$]}else o.push(p)}}class H{constructor(u,f){this.i=u,this.j=f,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function Q(o){return/^[\s\xa0]*$/.test(o)}function z(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function K(o){return K[" "](o),o}K[" "]=function(){};var me=z().indexOf("Gecko")!=-1&&!(z().toLowerCase().indexOf("webkit")!=-1&&z().indexOf("Edge")==-1)&&!(z().indexOf("Trident")!=-1||z().indexOf("MSIE")!=-1)&&z().indexOf("Edge")==-1;function we(o,u,f){for(const p in o)u.call(f,o[p],p,o)}function b(o,u){for(const f in o)u.call(void 0,o[f],f,o)}function v(o){const u={};for(const f in o)u[f]=o[f];return u}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(o,u){let f,p;for(let R=1;R<arguments.length;R++){p=arguments[R];for(f in p)o[f]=p[f];for(let C=0;C<g.length;C++)f=g[C],Object.prototype.hasOwnProperty.call(p,f)&&(o[f]=p[f])}}function I(o){var u=1;o=o.split(":");const f=[];for(;0<u&&o.length;)f.push(o.shift()),u--;return o.length&&f.push(o.join(":")),f}function S(o){l.setTimeout(()=>{throw o},0)}function T(){var o=Pt;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class _t{constructor(){this.h=this.g=null}add(u,f){const p=In.get();p.set(u,f),this.h?this.h.next=p:this.g=p,this.h=p}}var In=new H(()=>new He,o=>o.reset());class He{constructor(){this.next=this.g=this.h=null}set(u,f){this.h=u,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let Ie,ge=!1,Pt=new _t,tr=()=>{const o=l.Promise.resolve(void 0);Ie=()=>{o.then(Zt)}};var Zt=()=>{for(var o;o=T();){try{o.h.call(o.g)}catch(f){S(f)}var u=In;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}ge=!1};function Be(){this.s=this.s,this.C=this.C}Be.prototype.s=!1,Be.prototype.ma=function(){this.s||(this.s=!0,this.N())},Be.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function $e(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}$e.prototype.h=function(){this.defaultPrevented=!0};var va=(function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const f=()=>{};l.addEventListener("test",f,u),l.removeEventListener("test",f,u)}catch{}return o})();function nr(o,u){if($e.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var f=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(me){e:{try{K(u.nodeName);var R=!0;break e}catch{}R=!1}R||(u=null)}}else f=="mouseover"?u=o.fromElement:f=="mouseout"&&(u=o.toElement);this.relatedTarget=u,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:rr[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&nr.aa.h.call(this)}}P(nr,$e);var rr={2:"touch",3:"pen",4:"mouse"};nr.prototype.h=function(){nr.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var en="closure_listenable_"+(1e6*Math.random()|0),ds=0;function Ii(o,u,f,p,R){this.listener=o,this.proxy=null,this.src=u,this.type=f,this.capture=!!p,this.ha=R,this.key=++ds,this.da=this.fa=!1}function Ft(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function ps(o){this.src=o,this.g={},this.h=0}ps.prototype.add=function(o,u,f,p,R){var C=o.toString();o=this.g[C],o||(o=this.g[C]=[],this.h++);var $=A(o,u,p,R);return-1<$?(u=o[$],f||(u.fa=!1)):(u=new Ii(u,this.src,C,!!p,R),u.fa=f,o.push(u)),u};function E(o,u){var f=u.type;if(f in o.g){var p=o.g[f],R=Array.prototype.indexOf.call(p,u,void 0),C;(C=0<=R)&&Array.prototype.splice.call(p,R,1),C&&(Ft(u),o.g[f].length==0&&(delete o.g[f],o.h--))}}function A(o,u,f,p){for(var R=0;R<o.length;++R){var C=o[R];if(!C.da&&C.listener==u&&C.capture==!!f&&C.ha==p)return R}return-1}var k="closure_lm_"+(1e6*Math.random()|0),x={};function N(o,u,f,p,R){if(Array.isArray(u)){for(var C=0;C<u.length;C++)N(o,u[C],f,p,R);return null}return f=ne(f),o&&o[en]?o.K(u,f,h(p)?!!p.capture:!1,R):O(o,u,f,!1,p,R)}function O(o,u,f,p,R,C){if(!u)throw Error("Invalid event type");var $=h(R)?!!R.capture:!!R,Ae=q(o);if(Ae||(o[k]=Ae=new ps(o)),f=Ae.add(u,f,p,$,C),f.proxy)return f;if(p=j(),f.proxy=p,p.src=o,p.listener=f,o.addEventListener)va||(R=$),R===void 0&&(R=!1),o.addEventListener(u.toString(),p,R);else if(o.attachEvent)o.attachEvent(L(u.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return f}function j(){function o(f){return u.call(o.src,o.listener,f)}const u=Y;return o}function B(o,u,f,p,R){if(Array.isArray(u))for(var C=0;C<u.length;C++)B(o,u[C],f,p,R);else p=h(p)?!!p.capture:!!p,f=ne(f),o&&o[en]?(o=o.i,u=String(u).toString(),u in o.g&&(C=o.g[u],f=A(C,f,p,R),-1<f&&(Ft(C[f]),Array.prototype.splice.call(C,f,1),C.length==0&&(delete o.g[u],o.h--)))):o&&(o=q(o))&&(u=o.g[u.toString()],o=-1,u&&(o=A(u,f,p,R)),(f=-1<o?u[o]:null)&&U(f))}function U(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[en])E(u.i,o);else{var f=o.type,p=o.proxy;u.removeEventListener?u.removeEventListener(f,p,o.capture):u.detachEvent?u.detachEvent(L(f),p):u.addListener&&u.removeListener&&u.removeListener(p),(f=q(u))?(E(f,o),f.h==0&&(f.src=null,u[k]=null)):Ft(o)}}}function L(o){return o in x?x[o]:x[o]="on"+o}function Y(o,u){if(o.da)o=!0;else{u=new nr(u,this);var f=o.listener,p=o.ha||o.src;o.fa&&U(o),o=f.call(p,u)}return o}function q(o){return o=o[k],o instanceof ps?o:null}var J="__closure_events_fn_"+(1e9*Math.random()>>>0);function ne(o){return typeof o=="function"?o:(o[J]||(o[J]=function(u){return o.handleEvent(u)}),o[J])}function ee(){Be.call(this),this.i=new ps(this),this.M=this,this.F=null}P(ee,Be),ee.prototype[en]=!0,ee.prototype.removeEventListener=function(o,u,f,p){B(this,o,u,f,p)};function ae(o,u){var f,p=o.F;if(p)for(f=[];p;p=p.F)f.push(p);if(o=o.M,p=u.type||u,typeof u=="string")u=new $e(u,o);else if(u instanceof $e)u.target=u.target||o;else{var R=u;u=new $e(p,o),y(u,R)}if(R=!0,f)for(var C=f.length-1;0<=C;C--){var $=u.g=f[C];R=de($,p,!0,u)&&R}if($=u.g=o,R=de($,p,!0,u)&&R,R=de($,p,!1,u)&&R,f)for(C=0;C<f.length;C++)$=u.g=f[C],R=de($,p,!1,u)&&R}ee.prototype.N=function(){if(ee.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var f=o.g[u],p=0;p<f.length;p++)Ft(f[p]);delete o.g[u],o.h--}}this.F=null},ee.prototype.K=function(o,u,f,p){return this.i.add(String(o),u,!1,f,p)},ee.prototype.L=function(o,u,f,p){return this.i.add(String(o),u,!0,f,p)};function de(o,u,f,p){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var R=!0,C=0;C<u.length;++C){var $=u[C];if($&&!$.da&&$.capture==f){var Ae=$.listener,Ke=$.ha||$.src;$.fa&&E(o.i,$),R=Ae.call(Ke,p)!==!1&&R}}return R&&!p.defaultPrevented}function ze(o,u,f){if(typeof o=="function")f&&(o=_(o,f));else if(o&&typeof o.handleEvent=="function")o=_(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(o,u||0)}function We(o){o.g=ze(()=>{o.g=null,o.i&&(o.i=!1,We(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class wt extends Be{constructor(u,f){super(),this.m=u,this.l=f,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:We(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ze(o){Be.call(this),this.h=o,this.g={}}P(Ze,Be);var wn=[];function ms(o){we(o.g,function(u,f){this.g.hasOwnProperty(f)&&U(u)},o),o.g={}}Ze.prototype.N=function(){Ze.aa.N.call(this),ms(this)},Ze.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ge=l.JSON.stringify,At=l.JSON.parse,wi=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function Cr(){}Cr.prototype.h=null;function eu(o){return o.h||(o.h=o.i())}function tu(){}var gs={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ea(){$e.call(this,"d")}P(Ea,$e);function Ta(){$e.call(this,"c")}P(Ta,$e);var sr={},nu=null;function Ai(){return nu=nu||new ee}sr.La="serverreachability";function ru(o){$e.call(this,sr.La,o)}P(ru,$e);function _s(o){const u=Ai();ae(u,new ru(u))}sr.STAT_EVENT="statevent";function su(o,u){$e.call(this,sr.STAT_EVENT,o),this.stat=u}P(su,$e);function ct(o){const u=Ai();ae(u,new su(u,o))}sr.Ma="timingevent";function iu(o,u){$e.call(this,sr.Ma,o),this.size=u}P(iu,$e);function ys(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},u)}function vs(){this.g=!0}vs.prototype.xa=function(){this.g=!1};function Vg(o,u,f,p,R,C){o.info(function(){if(o.g)if(C)for(var $="",Ae=C.split("&"),Ke=0;Ke<Ae.length;Ke++){var _e=Ae[Ke].split("=");if(1<_e.length){var et=_e[0];_e=_e[1];var tt=et.split("_");$=2<=tt.length&&tt[1]=="type"?$+(et+"="+_e+"&"):$+(et+"=redacted&")}}else $=null;else $=C;return"XMLHTTP REQ ("+p+") [attempt "+R+"]: "+u+`
`+f+`
`+$})}function Dg(o,u,f,p,R,C,$){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+R+"]: "+u+`
`+f+`
`+C+" "+$})}function Pr(o,u,f,p){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Og(o,f)+(p?" "+p:"")})}function Ng(o,u){o.info(function(){return"TIMEOUT: "+u})}vs.prototype.info=function(){};function Og(o,u){if(!o.g)return u;if(!u)return null;try{var f=JSON.parse(u);if(f){for(o=0;o<f.length;o++)if(Array.isArray(f[o])){var p=f[o];if(!(2>p.length)){var R=p[1];if(Array.isArray(R)&&!(1>R.length)){var C=R[0];if(C!="noop"&&C!="stop"&&C!="close")for(var $=1;$<R.length;$++)R[$]=""}}}}return Ge(f)}catch{return u}}var bi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},ou={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ia;function Si(){}P(Si,Cr),Si.prototype.g=function(){return new XMLHttpRequest},Si.prototype.i=function(){return{}},Ia=new Si;function An(o,u,f,p){this.j=o,this.i=u,this.l=f,this.R=p||1,this.U=new Ze(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new au}function au(){this.i=null,this.g="",this.h=!1}var lu={},wa={};function Aa(o,u,f){o.L=1,o.v=ki(tn(u)),o.m=f,o.P=!0,cu(o,null)}function cu(o,u){o.F=Date.now(),Ri(o),o.A=tn(o.v);var f=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),wu(f.i,"t",p),o.C=0,f=o.j.J,o.h=new au,o.g=$u(o.j,f?u:null,!o.m),0<o.O&&(o.M=new wt(_(o.Y,o,o.g),o.O)),u=o.U,f=o.g,p=o.ca;var R="readystatechange";Array.isArray(R)||(R&&(wn[0]=R.toString()),R=wn);for(var C=0;C<R.length;C++){var $=N(f,R[C],p||u.handleEvent,!1,u.h||u);if(!$)break;u.g[$.key]=$}u=o.H?v(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),_s(),Vg(o.i,o.u,o.A,o.l,o.R,o.m)}An.prototype.ca=function(o){o=o.target;const u=this.M;u&&nn(o)==3?u.j():this.Y(o)},An.prototype.Y=function(o){try{if(o==this.g)e:{const tt=nn(this.g);var u=this.g.Ba();const Dr=this.g.Z();if(!(3>tt)&&(tt!=3||this.g&&(this.h.h||this.g.oa()||ku(this.g)))){this.J||tt!=4||u==7||(u==8||0>=Dr?_s(3):_s(2)),ba(this);var f=this.g.Z();this.X=f;t:if(uu(this)){var p=ku(this.g);o="";var R=p.length,C=nn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ir(this),Es(this);var $="";break t}this.h.i=new l.TextDecoder}for(u=0;u<R;u++)this.h.h=!0,o+=this.h.i.decode(p[u],{stream:!(C&&u==R-1)});p.length=0,this.h.g+=o,this.C=0,$=this.h.g}else $=this.g.oa();if(this.o=f==200,Dg(this.i,this.u,this.A,this.l,this.R,tt,f),this.o){if(this.T&&!this.K){t:{if(this.g){var Ae,Ke=this.g;if((Ae=Ke.g?Ke.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Q(Ae)){var _e=Ae;break t}}_e=null}if(f=_e)Pr(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Sa(this,f);else{this.o=!1,this.s=3,ct(12),ir(this),Es(this);break e}}if(this.P){f=!0;let kt;for(;!this.J&&this.C<$.length;)if(kt=xg(this,$),kt==wa){tt==4&&(this.s=4,ct(14),f=!1),Pr(this.i,this.l,null,"[Incomplete Response]");break}else if(kt==lu){this.s=4,ct(15),Pr(this.i,this.l,$,"[Invalid Chunk]"),f=!1;break}else Pr(this.i,this.l,kt,null),Sa(this,kt);if(uu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),tt!=4||$.length!=0||this.h.h||(this.s=1,ct(16),f=!1),this.o=this.o&&f,!f)Pr(this.i,this.l,$,"[Invalid Chunked Response]"),ir(this),Es(this);else if(0<$.length&&!this.W){this.W=!0;var et=this.j;et.g==this&&et.ba&&!et.M&&(et.j.info("Great, no buffering proxy detected. Bytes received: "+$.length),Da(et),et.M=!0,ct(11))}}else Pr(this.i,this.l,$,null),Sa(this,$);tt==4&&ir(this),this.o&&!this.J&&(tt==4?Lu(this.j,this):(this.o=!1,Ri(this)))}else Yg(this.g),f==400&&0<$.indexOf("Unknown SID")?(this.s=3,ct(12)):(this.s=0,ct(13)),ir(this),Es(this)}}}catch{}finally{}};function uu(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function xg(o,u){var f=o.C,p=u.indexOf(`
`,f);return p==-1?wa:(f=Number(u.substring(f,p)),isNaN(f)?lu:(p+=1,p+f>u.length?wa:(u=u.slice(p,p+f),o.C=p+f,u)))}An.prototype.cancel=function(){this.J=!0,ir(this)};function Ri(o){o.S=Date.now()+o.I,hu(o,o.I)}function hu(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=ys(_(o.ba,o),u)}function ba(o){o.B&&(l.clearTimeout(o.B),o.B=null)}An.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Ng(this.i,this.A),this.L!=2&&(_s(),ct(17)),ir(this),this.s=2,Es(this)):hu(this,this.S-o)};function Es(o){o.j.G==0||o.J||Lu(o.j,o)}function ir(o){ba(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,ms(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function Sa(o,u){try{var f=o.j;if(f.G!=0&&(f.g==o||Ra(f.h,o))){if(!o.K&&Ra(f.h,o)&&f.G==3){try{var p=f.Da.g.parse(u)}catch{p=null}if(Array.isArray(p)&&p.length==3){var R=p;if(R[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<o.F)Mi(f),Oi(f);else break e;Va(f),ct(18)}}else f.za=R[1],0<f.za-f.T&&37500>R[2]&&f.F&&f.v==0&&!f.C&&(f.C=ys(_(f.Za,f),6e3));if(1>=pu(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else ar(f,11)}else if((o.K||f.g==o)&&Mi(f),!Q(u))for(R=f.Da.g.parse(u),u=0;u<R.length;u++){let _e=R[u];if(f.T=_e[0],_e=_e[1],f.G==2)if(_e[0]=="c"){f.K=_e[1],f.ia=_e[2];const et=_e[3];et!=null&&(f.la=et,f.j.info("VER="+f.la));const tt=_e[4];tt!=null&&(f.Aa=tt,f.j.info("SVER="+f.Aa));const Dr=_e[5];Dr!=null&&typeof Dr=="number"&&0<Dr&&(p=1.5*Dr,f.L=p,f.j.info("backChannelRequestTimeoutMs_="+p)),p=f;const kt=o.g;if(kt){const Fi=kt.g?kt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Fi){var C=p.h;C.g||Fi.indexOf("spdy")==-1&&Fi.indexOf("quic")==-1&&Fi.indexOf("h2")==-1||(C.j=C.l,C.g=new Set,C.h&&(Ca(C,C.h),C.h=null))}if(p.D){const Na=kt.g?kt.g.getResponseHeader("X-HTTP-Session-Id"):null;Na&&(p.ya=Na,Ce(p.I,p.D,Na))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-o.F,f.j.info("Handshake RTT: "+f.R+"ms")),p=f;var $=o;if(p.qa=Bu(p,p.J?p.ia:null,p.W),$.K){mu(p.h,$);var Ae=$,Ke=p.L;Ke&&(Ae.I=Ke),Ae.B&&(ba(Ae),Ri(Ae)),p.g=$}else xu(p);0<f.i.length&&xi(f)}else _e[0]!="stop"&&_e[0]!="close"||ar(f,7);else f.G==3&&(_e[0]=="stop"||_e[0]=="close"?_e[0]=="stop"?ar(f,7):ka(f):_e[0]!="noop"&&f.l&&f.l.ta(_e),f.v=0)}}_s(4)}catch{}}var Mg=class{constructor(o,u){this.g=o,this.map=u}};function fu(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function du(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function pu(o){return o.h?1:o.g?o.g.size:0}function Ra(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function Ca(o,u){o.g?o.g.add(u):o.h=u}function mu(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}fu.prototype.cancel=function(){if(this.i=gu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function gu(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const f of o.g.values())u=u.concat(f.D);return u}return F(o.i)}function Lg(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(c(o)){for(var u=[],f=o.length,p=0;p<f;p++)u.push(o[p]);return u}u=[],f=0;for(p in o)u[f++]=o[p];return u}function Fg(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(c(o)||typeof o=="string"){var u=[];o=o.length;for(var f=0;f<o;f++)u.push(f);return u}u=[],f=0;for(const p in o)u[f++]=p;return u}}}function _u(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(c(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var f=Fg(o),p=Lg(o),R=p.length,C=0;C<R;C++)u.call(void 0,p[C],f&&f[C],o)}var yu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ug(o,u){if(o){o=o.split("&");for(var f=0;f<o.length;f++){var p=o[f].indexOf("="),R=null;if(0<=p){var C=o[f].substring(0,p);R=o[f].substring(p+1)}else C=o[f];u(C,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function or(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof or){this.h=o.h,Ci(this,o.j),this.o=o.o,this.g=o.g,Pi(this,o.s),this.l=o.l;var u=o.i,f=new ws;f.i=u.i,u.g&&(f.g=new Map(u.g),f.h=u.h),vu(this,f),this.m=o.m}else o&&(u=String(o).match(yu))?(this.h=!1,Ci(this,u[1]||"",!0),this.o=Ts(u[2]||""),this.g=Ts(u[3]||"",!0),Pi(this,u[4]),this.l=Ts(u[5]||"",!0),vu(this,u[6]||"",!0),this.m=Ts(u[7]||"")):(this.h=!1,this.i=new ws(null,this.h))}or.prototype.toString=function(){var o=[],u=this.j;u&&o.push(Is(u,Eu,!0),":");var f=this.g;return(f||u=="file")&&(o.push("//"),(u=this.o)&&o.push(Is(u,Eu,!0),"@"),o.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&o.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&o.push("/"),o.push(Is(f,f.charAt(0)=="/"?jg:$g,!0))),(f=this.i.toString())&&o.push("?",f),(f=this.m)&&o.push("#",Is(f,Hg)),o.join("")};function tn(o){return new or(o)}function Ci(o,u,f){o.j=f?Ts(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function Pi(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function vu(o,u,f){u instanceof ws?(o.i=u,zg(o.i,o.h)):(f||(u=Is(u,qg)),o.i=new ws(u,o.h))}function Ce(o,u,f){o.i.set(u,f)}function ki(o){return Ce(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Ts(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Is(o,u,f){return typeof o=="string"?(o=encodeURI(o).replace(u,Bg),f&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Bg(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Eu=/[#\/\?@]/g,$g=/[#\?:]/g,jg=/[#\?]/g,qg=/[#\?@]/g,Hg=/#/g;function ws(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function bn(o){o.g||(o.g=new Map,o.h=0,o.i&&Ug(o.i,function(u,f){o.add(decodeURIComponent(u.replace(/\+/g," ")),f)}))}n=ws.prototype,n.add=function(o,u){bn(this),this.i=null,o=kr(this,o);var f=this.g.get(o);return f||this.g.set(o,f=[]),f.push(u),this.h+=1,this};function Tu(o,u){bn(o),u=kr(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function Iu(o,u){return bn(o),u=kr(o,u),o.g.has(u)}n.forEach=function(o,u){bn(this),this.g.forEach(function(f,p){f.forEach(function(R){o.call(u,R,p,this)},this)},this)},n.na=function(){bn(this);const o=Array.from(this.g.values()),u=Array.from(this.g.keys()),f=[];for(let p=0;p<u.length;p++){const R=o[p];for(let C=0;C<R.length;C++)f.push(u[p])}return f},n.V=function(o){bn(this);let u=[];if(typeof o=="string")Iu(this,o)&&(u=u.concat(this.g.get(kr(this,o))));else{o=Array.from(this.g.values());for(let f=0;f<o.length;f++)u=u.concat(o[f])}return u},n.set=function(o,u){return bn(this),this.i=null,o=kr(this,o),Iu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function wu(o,u,f){Tu(o,u),0<f.length&&(o.i=null,o.g.set(kr(o,u),F(f)),o.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(var f=0;f<u.length;f++){var p=u[f];const C=encodeURIComponent(String(p)),$=this.V(p);for(p=0;p<$.length;p++){var R=C;$[p]!==""&&(R+="="+encodeURIComponent(String($[p]))),o.push(R)}}return this.i=o.join("&")};function kr(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function zg(o,u){u&&!o.j&&(bn(o),o.i=null,o.g.forEach(function(f,p){var R=p.toLowerCase();p!=R&&(Tu(this,p),wu(this,R,f))},o)),o.j=u}function Wg(o,u){const f=new vs;if(l.Image){const p=new Image;p.onload=w(Sn,f,"TestLoadImage: loaded",!0,u,p),p.onerror=w(Sn,f,"TestLoadImage: error",!1,u,p),p.onabort=w(Sn,f,"TestLoadImage: abort",!1,u,p),p.ontimeout=w(Sn,f,"TestLoadImage: timeout",!1,u,p),l.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else u(!1)}function Gg(o,u){const f=new vs,p=new AbortController,R=setTimeout(()=>{p.abort(),Sn(f,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:p.signal}).then(C=>{clearTimeout(R),C.ok?Sn(f,"TestPingServer: ok",!0,u):Sn(f,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(R),Sn(f,"TestPingServer: error",!1,u)})}function Sn(o,u,f,p,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),p(f)}catch{}}function Kg(){this.g=new wi}function Qg(o,u,f){const p=f||"";try{_u(o,function(R,C){let $=R;h(R)&&($=Ge(R)),u.push(p+C+"="+encodeURIComponent($))})}catch(R){throw u.push(p+"type="+encodeURIComponent("_badmap")),R}}function Vi(o){this.l=o.Ub||null,this.j=o.eb||!1}P(Vi,Cr),Vi.prototype.g=function(){return new Di(this.l,this.j)},Vi.prototype.i=(function(o){return function(){return o}})({});function Di(o,u){ee.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}P(Di,ee),n=Di.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,bs(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,As(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,bs(this)),this.g&&(this.readyState=3,bs(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Au(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Au(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?As(this):bs(this),this.readyState==3&&Au(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,As(this))},n.Qa=function(o){this.g&&(this.response=o,As(this))},n.ga=function(){this.g&&As(this)};function As(o){o.readyState=4,o.l=null,o.j=null,o.v=null,bs(o)}n.setRequestHeader=function(o,u){this.u.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var f=u.next();!f.done;)f=f.value,o.push(f[0]+": "+f[1]),f=u.next();return o.join(`\r
`)};function bs(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Di.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function bu(o){let u="";return we(o,function(f,p){u+=p,u+=":",u+=f,u+=`\r
`}),u}function Pa(o,u,f){e:{for(p in f){var p=!1;break e}p=!0}p||(f=bu(f),typeof o=="string"?f!=null&&encodeURIComponent(String(f)):Ce(o,u,f))}function De(o){ee.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}P(De,ee);var Jg=/^https?$/i,Xg=["POST","PUT"];n=De.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,u,f,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ia.g(),this.v=this.o?eu(this.o):eu(Ia),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(C){Su(this,C);return}if(o=f||"",f=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var R in p)f.set(R,p[R]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const C of p.keys())f.set(C,p.get(C));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(f.keys()).find(C=>C.toLowerCase()=="content-type"),R=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Xg,u,void 0))||p||R||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[C,$]of f)this.g.setRequestHeader(C,$);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Pu(this),this.u=!0,this.g.send(o),this.u=!1}catch(C){Su(this,C)}};function Su(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,Ru(o),Ni(o)}function Ru(o){o.A||(o.A=!0,ae(o,"complete"),ae(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,ae(this,"complete"),ae(this,"abort"),Ni(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ni(this,!0)),De.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Cu(this):this.bb())},n.bb=function(){Cu(this)};function Cu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||nn(o)!=4||o.Z()!=2)){if(o.u&&nn(o)==4)ze(o.Ea,0,o);else if(ae(o,"readystatechange"),nn(o)==4){o.h=!1;try{const $=o.Z();e:switch($){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var f;if(!(f=u)){var p;if(p=$===0){var R=String(o.D).match(yu)[1]||null;!R&&l.self&&l.self.location&&(R=l.self.location.protocol.slice(0,-1)),p=!Jg.test(R?R.toLowerCase():"")}f=p}if(f)ae(o,"complete"),ae(o,"success");else{o.m=6;try{var C=2<nn(o)?o.g.statusText:""}catch{C=""}o.l=C+" ["+o.Z()+"]",Ru(o)}}finally{Ni(o)}}}}function Ni(o,u){if(o.g){Pu(o);const f=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||ae(o,"ready");try{f.onreadystatechange=p}catch{}}}function Pu(o){o.I&&(l.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function nn(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<nn(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),At(u)}};function ku(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Yg(o){const u={};o=(o.g&&2<=nn(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(Q(o[p]))continue;var f=I(o[p]);const R=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const C=u[R]||[];u[R]=C,C.push(f)}b(u,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ss(o,u,f){return f&&f.internalChannelParams&&f.internalChannelParams[o]||u}function Vu(o){this.Aa=0,this.i=[],this.j=new vs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ss("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ss("baseRetryDelayMs",5e3,o),this.cb=Ss("retryDelaySeedMs",1e4,o),this.Wa=Ss("forwardChannelMaxRetries",2,o),this.wa=Ss("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new fu(o&&o.concurrentRequestLimit),this.Da=new Kg,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Vu.prototype,n.la=8,n.G=1,n.connect=function(o,u,f,p){ct(0),this.W=o,this.H=u||{},f&&p!==void 0&&(this.H.OSID=f,this.H.OAID=p),this.F=this.X,this.I=Bu(this,null,this.W),xi(this)};function ka(o){if(Du(o),o.G==3){var u=o.U++,f=tn(o.I);if(Ce(f,"SID",o.K),Ce(f,"RID",u),Ce(f,"TYPE","terminate"),Rs(o,f),u=new An(o,o.j,u),u.L=2,u.v=ki(tn(f)),f=!1,l.navigator&&l.navigator.sendBeacon)try{f=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!f&&l.Image&&(new Image().src=u.v,f=!0),f||(u.g=$u(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Ri(u)}Uu(o)}function Oi(o){o.g&&(Da(o),o.g.cancel(),o.g=null)}function Du(o){Oi(o),o.u&&(l.clearTimeout(o.u),o.u=null),Mi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function xi(o){if(!du(o.h)&&!o.s){o.s=!0;var u=o.Ga;Ie||tr(),ge||(Ie(),ge=!0),Pt.add(u,o),o.B=0}}function Zg(o,u){return pu(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=ys(_(o.Ga,o,u),Fu(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const R=new An(this,this.j,o);let C=this.o;if(this.S&&(C?(C=v(C),y(C,this.S)):C=this.S),this.m!==null||this.O||(R.H=C,C=null),this.P)e:{for(var u=0,f=0;f<this.i.length;f++){t:{var p=this.i[f];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(u+=p,4096<u){u=f;break e}if(u===4096||f===this.i.length-1){u=f+1;break e}}u=1e3}else u=1e3;u=Ou(this,R,u),f=tn(this.I),Ce(f,"RID",o),Ce(f,"CVER",22),this.D&&Ce(f,"X-HTTP-Session-Id",this.D),Rs(this,f),C&&(this.O?u="headers="+encodeURIComponent(String(bu(C)))+"&"+u:this.m&&Pa(f,this.m,C)),Ca(this.h,R),this.Ua&&Ce(f,"TYPE","init"),this.P?(Ce(f,"$req",u),Ce(f,"SID","null"),R.T=!0,Aa(R,f,null)):Aa(R,f,u),this.G=2}}else this.G==3&&(o?Nu(this,o):this.i.length==0||du(this.h)||Nu(this))};function Nu(o,u){var f;u?f=u.l:f=o.U++;const p=tn(o.I);Ce(p,"SID",o.K),Ce(p,"RID",f),Ce(p,"AID",o.T),Rs(o,p),o.m&&o.o&&Pa(p,o.m,o.o),f=new An(o,o.j,f,o.B+1),o.m===null&&(f.H=o.o),u&&(o.i=u.D.concat(o.i)),u=Ou(o,f,1e3),f.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Ca(o.h,f),Aa(f,p,u)}function Rs(o,u){o.H&&we(o.H,function(f,p){Ce(u,p,f)}),o.l&&_u({},function(f,p){Ce(u,p,f)})}function Ou(o,u,f){f=Math.min(o.i.length,f);var p=o.l?_(o.l.Na,o.l,o):null;e:{var R=o.i;let C=-1;for(;;){const $=["count="+f];C==-1?0<f?(C=R[0].g,$.push("ofs="+C)):C=0:$.push("ofs="+C);let Ae=!0;for(let Ke=0;Ke<f;Ke++){let _e=R[Ke].g;const et=R[Ke].map;if(_e-=C,0>_e)C=Math.max(0,R[Ke].g-100),Ae=!1;else try{Qg(et,$,"req"+_e+"_")}catch{p&&p(et)}}if(Ae){p=$.join("&");break e}}}return o=o.i.splice(0,f),u.D=o,p}function xu(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;Ie||tr(),ge||(Ie(),ge=!0),Pt.add(u,o),o.v=0}}function Va(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=ys(_(o.Fa,o),Fu(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Mu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=ys(_(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ct(10),Oi(this),Mu(this))};function Da(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function Mu(o){o.g=new An(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=tn(o.qa);Ce(u,"RID","rpc"),Ce(u,"SID",o.K),Ce(u,"AID",o.T),Ce(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&Ce(u,"TO",o.ja),Ce(u,"TYPE","xmlhttp"),Rs(o,u),o.m&&o.o&&Pa(u,o.m,o.o),o.L&&(o.g.I=o.L);var f=o.g;o=o.ia,f.L=1,f.v=ki(tn(u)),f.m=null,f.P=!0,cu(f,o)}n.Za=function(){this.C!=null&&(this.C=null,Oi(this),Va(this),ct(19))};function Mi(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function Lu(o,u){var f=null;if(o.g==u){Mi(o),Da(o),o.g=null;var p=2}else if(Ra(o.h,u))f=u.D,mu(o.h,u),p=1;else return;if(o.G!=0){if(u.o)if(p==1){f=u.m?u.m.length:0,u=Date.now()-u.F;var R=o.B;p=Ai(),ae(p,new iu(p,f)),xi(o)}else xu(o);else if(R=u.s,R==3||R==0&&0<u.X||!(p==1&&Zg(o,u)||p==2&&Va(o)))switch(f&&0<f.length&&(u=o.h,u.i=u.i.concat(f)),R){case 1:ar(o,5);break;case 4:ar(o,10);break;case 3:ar(o,6);break;default:ar(o,2)}}}function Fu(o,u){let f=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(f*=2),f*u}function ar(o,u){if(o.j.info("Error code "+u),u==2){var f=_(o.fb,o),p=o.Xa;const R=!p;p=new or(p||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Ci(p,"https"),ki(p),R?Wg(p.toString(),f):Gg(p.toString(),f)}else ct(2);o.G=0,o.l&&o.l.sa(u),Uu(o),Du(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),ct(2)):(this.j.info("Failed to ping google.com"),ct(1))};function Uu(o){if(o.G=0,o.ka=[],o.l){const u=gu(o.h);(u.length!=0||o.i.length!=0)&&(M(o.ka,u),M(o.ka,o.i),o.h.i.length=0,F(o.i),o.i.length=0),o.l.ra()}}function Bu(o,u,f){var p=f instanceof or?tn(f):new or(f);if(p.g!="")u&&(p.g=u+"."+p.g),Pi(p,p.s);else{var R=l.location;p=R.protocol,u=u?u+"."+R.hostname:R.hostname,R=+R.port;var C=new or(null);p&&Ci(C,p),u&&(C.g=u),R&&Pi(C,R),f&&(C.l=f),p=C}return f=o.D,u=o.ya,f&&u&&Ce(p,f,u),Ce(p,"VER",o.la),Rs(o,p),p}function $u(o,u,f){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new De(new Vi({eb:f})):new De(o.pa),u.Ha(o.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function ju(){}n=ju.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Li(){}Li.prototype.g=function(o,u){return new yt(o,u)};function yt(o,u){ee.call(this),this.g=new Vu(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!Q(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!Q(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Vr(this)}P(yt,ee),yt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},yt.prototype.close=function(){ka(this.g)},yt.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var f={};f.__data__=o,o=f}else this.u&&(f={},f.__data__=Ge(o),o=f);u.i.push(new Mg(u.Ya++,o)),u.G==3&&xi(u)},yt.prototype.N=function(){this.g.l=null,delete this.j,ka(this.g),delete this.g,yt.aa.N.call(this)};function qu(o){Ea.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const f in u){o=f;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}P(qu,Ea);function Hu(){Ta.call(this),this.status=1}P(Hu,Ta);function Vr(o){this.g=o}P(Vr,ju),Vr.prototype.ua=function(){ae(this.g,"a")},Vr.prototype.ta=function(o){ae(this.g,new qu(o))},Vr.prototype.sa=function(o){ae(this.g,new Hu)},Vr.prototype.ra=function(){ae(this.g,"b")},Li.prototype.createWebChannel=Li.prototype.g,yt.prototype.send=yt.prototype.o,yt.prototype.open=yt.prototype.m,yt.prototype.close=yt.prototype.close,em=function(){return new Li},Zp=function(){return Ai()},Yp=sr,bl={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},bi.NO_ERROR=0,bi.TIMEOUT=8,bi.HTTP_ERROR=6,ro=bi,ou.COMPLETE="complete",Xp=ou,tu.EventType=gs,gs.OPEN="a",gs.CLOSE="b",gs.ERROR="c",gs.MESSAGE="d",ee.prototype.listen=ee.prototype.K,Vs=tu,De.prototype.listenOnce=De.prototype.L,De.prototype.getLastError=De.prototype.Ka,De.prototype.getLastErrorCode=De.prototype.Ba,De.prototype.getStatus=De.prototype.Z,De.prototype.getResponseJson=De.prototype.Oa,De.prototype.getResponseText=De.prototype.oa,De.prototype.send=De.prototype.ea,De.prototype.setWithCredentials=De.prototype.Ha,Jp=De}).apply(typeof qi<"u"?qi:typeof self<"u"?self:typeof window<"u"?window:{});const Yh="@firebase/firestore",Zh="4.9.1";/**
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
 */class rt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}rt.UNAUTHENTICATED=new rt(null),rt.GOOGLE_CREDENTIALS=new rt("google-credentials-uid"),rt.FIRST_PARTY=new rt("first-party-uid"),rt.MOCK_USER=new rt("mock-user");/**
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
 */let cs="12.2.0";/**
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
 */const vr=new lc("@firebase/firestore");function Mr(){return vr.logLevel}function W(n,...e){if(vr.logLevel<=ce.DEBUG){const t=e.map(yc);vr.debug(`Firestore (${cs}): ${n}`,...t)}}function yn(n,...e){if(vr.logLevel<=ce.ERROR){const t=e.map(yc);vr.error(`Firestore (${cs}): ${n}`,...t)}}function Yr(n,...e){if(vr.logLevel<=ce.WARN){const t=e.map(yc);vr.warn(`Firestore (${cs}): ${n}`,...t)}}function yc(n){if(typeof n=="string")return n;try{/**
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
 */function te(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,tm(n,r,t)}function tm(n,e,t){let r=`FIRESTORE (${cs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw yn(r),new Error(r)}function Te(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||tm(e,s,r)}function oe(n,e){return n}/**
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
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class G extends Tn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class jn{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
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
 */class nm{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class sw{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(rt.UNAUTHENTICATED)))}shutdown(){}}class iw{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class ow{constructor(e){this.t=e,this.currentUser=rt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Te(this.o===void 0,42304);let r=this.i;const s=c=>this.i!==r?(r=this.i,t(c)):Promise.resolve();let i=new jn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new jn,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const c=i;e.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},l=c=>{W("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((c=>l(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(W("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new jn)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(W("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Te(typeof r.accessToken=="string",31837,{l:r}),new nm(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Te(e===null||typeof e=="string",2055,{h:e}),new rt(e)}}class aw{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=rt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class lw{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new aw(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(rt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class ef{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class cw{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Dt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Te(this.o===void 0,3512);const r=i=>{i.error!=null&&W("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,W("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{W("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):W("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new ef(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(Te(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new ef(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function uw(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class vc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=uw(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function ue(n,e){return n<e?-1:n>e?1:0}function Sl(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Za(s)===Za(i)?ue(s,i):Za(s)?1:-1}return ue(n.length,e.length)}const hw=55296,fw=57343;function Za(n){const e=n.charCodeAt(0);return e>=hw&&e<=fw}function Zr(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
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
 */const tf="__name__";class $t{constructor(e,t,r){t===void 0?t=0:t>e.length&&te(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&te(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return $t.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof $t?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=$t.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ue(e.length,t.length)}static compareSegments(e,t){const r=$t.isNumericId(e),s=$t.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?$t.extractNumericId(e).compare($t.extractNumericId(t)):Sl(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return $n.fromString(e.substring(4,e.length-2))}}class Re extends $t{construct(e,t,r){return new Re(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new G(V.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new Re(t)}static emptyPath(){return new Re([])}}const dw=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Xe extends $t{construct(e,t,r){return new Xe(e,t,r)}static isValidIdentifier(e){return dw.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Xe.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===tf}static keyField(){return new Xe([tf])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new G(V.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new G(V.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new G(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new G(V.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Xe(t)}static emptyPath(){return new Xe([])}}/**
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
 */class X{constructor(e){this.path=e}static fromPath(e){return new X(Re.fromString(e))}static fromName(e){return new X(Re.fromString(e).popFirst(5))}static empty(){return new X(Re.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Re.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Re.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new X(new Re(e.slice()))}}/**
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
 */function rm(n,e,t){if(!t)throw new G(V.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function pw(n,e,t,r){if(e===!0&&r===!0)throw new G(V.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function nf(n){if(!X.isDocumentKey(n))throw new G(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function rf(n){if(X.isDocumentKey(n))throw new G(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function sm(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function na(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":te(12329,{type:typeof n})}function hn(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new G(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=na(n);throw new G(V.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function Le(n,e){const t={typeString:n};return e&&(t.value=e),t}function gi(n,e){if(!sm(n))throw new G(V.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new G(V.INVALID_ARGUMENT,t);return!0}/**
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
 */const sf=-62135596800,of=1e6;class Pe{static now(){return Pe.fromMillis(Date.now())}static fromDate(e){return Pe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*of);return new Pe(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new G(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new G(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<sf)throw new G(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new G(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/of}_compareTo(e){return this.seconds===e.seconds?ue(this.nanoseconds,e.nanoseconds):ue(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Pe._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(gi(e,Pe._jsonSchema))return new Pe(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-sf;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Pe._jsonSchemaVersion="firestore/timestamp/1.0",Pe._jsonSchema={type:Le("string",Pe._jsonSchemaVersion),seconds:Le("number"),nanoseconds:Le("number")};/**
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
 */class se{static fromTimestamp(e){return new se(e)}static min(){return new se(new Pe(0,0))}static max(){return new se(new Pe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const ni=-1;function mw(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=se.fromTimestamp(r===1e9?new Pe(t+1,0):new Pe(t,r));return new Kn(s,X.empty(),e)}function gw(n){return new Kn(n.readTime,n.key,ni)}class Kn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Kn(se.min(),X.empty(),ni)}static max(){return new Kn(se.max(),X.empty(),ni)}}function _w(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=X.comparator(n.documentKey,e.documentKey),t!==0?t:ue(n.largestBatchId,e.largestBatchId))}/**
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
 */const yw="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class vw{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
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
 */async function us(n){if(n.code!==V.FAILED_PRECONDITION||n.message!==yw)throw n;W("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class D{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&te(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new D(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof D?t:D.resolve(t)}catch(t){return D.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):D.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):D.reject(t)}static resolve(e){return new D(((t,r)=>{t(e)}))}static reject(e){return new D(((t,r)=>{r(e)}))}static waitFor(e){return new D(((t,r)=>{let s=0,i=0,a=!1;e.forEach((l=>{++s,l.next((()=>{++i,a&&i===s&&t()}),(c=>r(c)))})),a=!0,i===s&&t()}))}static or(e){let t=D.resolve(!1);for(const r of e)t=t.next((s=>s?D.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new D(((r,s)=>{const i=e.length,a=new Array(i);let l=0;for(let c=0;c<i;c++){const h=c;t(e[h]).next((d=>{a[h]=d,++l,l===i&&r(a)}),(d=>s(d)))}}))}static doWhile(e,t){return new D(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function Ew(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function hs(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class ra{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}ra.ce=-1;/**
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
 */const Ec=-1;function sa(n){return n==null}function Ro(n){return n===0&&1/n==-1/0}function Tw(n){return typeof n=="number"&&Number.isInteger(n)&&!Ro(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const im="";function Iw(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=af(e)),e=ww(n.get(t),e);return af(e)}function ww(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case im:t+="";break;default:t+=i}}return t}function af(n){return n+im+""}/**
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
 */function lf(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function wr(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function om(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class Ve{constructor(e,t){this.comparator=e,this.root=t||Qe.EMPTY}insert(e,t){return new Ve(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Qe.BLACK,null,null))}remove(e){return new Ve(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Qe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Hi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Hi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Hi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Hi(this.root,e,this.comparator,!0)}}class Hi{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Qe{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Qe.RED,this.left=s??Qe.EMPTY,this.right=i??Qe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Qe(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Qe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Qe.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Qe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Qe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw te(43730,{key:this.key,value:this.value});if(this.right.isRed())throw te(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw te(27949);return e+(this.isRed()?0:1)}}Qe.EMPTY=null,Qe.RED=!0,Qe.BLACK=!1;Qe.EMPTY=new class{constructor(){this.size=0}get key(){throw te(57766)}get value(){throw te(16141)}get color(){throw te(16727)}get left(){throw te(29726)}get right(){throw te(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new Qe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class je{constructor(e){this.comparator=e,this.data=new Ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new cf(this.data.getIterator())}getIteratorFrom(e){return new cf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof je)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new je(this.comparator);return t.data=e,t}}class cf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Ot{constructor(e){this.fields=e,e.sort(Xe.comparator)}static empty(){return new Ot([])}unionWith(e){let t=new je(Xe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ot(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Zr(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
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
 */class am extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Ye{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new am("Invalid base64 string: "+i):i}})(e);return new Ye(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(e);return new Ye(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ue(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ye.EMPTY_BYTE_STRING=new Ye("");const Aw=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Qn(n){if(Te(!!n,39018),typeof n=="string"){let e=0;const t=Aw.exec(n);if(Te(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Oe(n.seconds),nanos:Oe(n.nanos)}}function Oe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Jn(n){return typeof n=="string"?Ye.fromBase64String(n):Ye.fromUint8Array(n)}/**
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
 */const lm="server_timestamp",cm="__type__",um="__previous_value__",hm="__local_write_time__";function Tc(n){return(n?.mapValue?.fields||{})[cm]?.stringValue===lm}function ia(n){const e=n.mapValue.fields[um];return Tc(e)?ia(e):e}function ri(n){const e=Qn(n.mapValue.fields[hm].timestampValue);return new Pe(e.seconds,e.nanos)}/**
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
 */class bw{constructor(e,t,r,s,i,a,l,c,h,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=d}}const Co="(default)";class si{constructor(e,t){this.projectId=e,this.database=t||Co}static empty(){return new si("","")}get isDefaultDatabase(){return this.database===Co}isEqual(e){return e instanceof si&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const fm="__type__",Sw="__max__",zi={mapValue:{}},dm="__vector__",Po="value";function Xn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Tc(n)?4:Cw(n)?9007199254740991:Rw(n)?10:11:te(28295,{value:n})}function Yt(n,e){if(n===e)return!0;const t=Xn(n);if(t!==Xn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ri(n).isEqual(ri(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=Qn(s.timestampValue),l=Qn(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return Jn(s.bytesValue).isEqual(Jn(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return Oe(s.geoPointValue.latitude)===Oe(i.geoPointValue.latitude)&&Oe(s.geoPointValue.longitude)===Oe(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return Oe(s.integerValue)===Oe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=Oe(s.doubleValue),l=Oe(i.doubleValue);return a===l?Ro(a)===Ro(l):isNaN(a)&&isNaN(l)}return!1})(n,e);case 9:return Zr(n.arrayValue.values||[],e.arrayValue.values||[],Yt);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(lf(a)!==lf(l))return!1;for(const c in a)if(a.hasOwnProperty(c)&&(l[c]===void 0||!Yt(a[c],l[c])))return!1;return!0})(n,e);default:return te(52216,{left:n})}}function ii(n,e){return(n.values||[]).find((t=>Yt(t,e)))!==void 0}function es(n,e){if(n===e)return 0;const t=Xn(n),r=Xn(e);if(t!==r)return ue(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ue(n.booleanValue,e.booleanValue);case 2:return(function(i,a){const l=Oe(i.integerValue||i.doubleValue),c=Oe(a.integerValue||a.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1})(n,e);case 3:return uf(n.timestampValue,e.timestampValue);case 4:return uf(ri(n),ri(e));case 5:return Sl(n.stringValue,e.stringValue);case 6:return(function(i,a){const l=Jn(i),c=Jn(a);return l.compareTo(c)})(n.bytesValue,e.bytesValue);case 7:return(function(i,a){const l=i.split("/"),c=a.split("/");for(let h=0;h<l.length&&h<c.length;h++){const d=ue(l[h],c[h]);if(d!==0)return d}return ue(l.length,c.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,a){const l=ue(Oe(i.latitude),Oe(a.latitude));return l!==0?l:ue(Oe(i.longitude),Oe(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return hf(n.arrayValue,e.arrayValue);case 10:return(function(i,a){const l=i.fields||{},c=a.fields||{},h=l[Po]?.arrayValue,d=c[Po]?.arrayValue,m=ue(h?.values?.length||0,d?.values?.length||0);return m!==0?m:hf(h,d)})(n.mapValue,e.mapValue);case 11:return(function(i,a){if(i===zi.mapValue&&a===zi.mapValue)return 0;if(i===zi.mapValue)return 1;if(a===zi.mapValue)return-1;const l=i.fields||{},c=Object.keys(l),h=a.fields||{},d=Object.keys(h);c.sort(),d.sort();for(let m=0;m<c.length&&m<d.length;++m){const _=Sl(c[m],d[m]);if(_!==0)return _;const w=es(l[c[m]],h[d[m]]);if(w!==0)return w}return ue(c.length,d.length)})(n.mapValue,e.mapValue);default:throw te(23264,{he:t})}}function uf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ue(n,e);const t=Qn(n),r=Qn(e),s=ue(t.seconds,r.seconds);return s!==0?s:ue(t.nanos,r.nanos)}function hf(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=es(t[s],r[s]);if(i)return i}return ue(t.length,r.length)}function ts(n){return Rl(n)}function Rl(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=Qn(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Jn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return X.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Rl(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${Rl(t.fields[a])}`;return s+"}"})(n.mapValue):te(61005,{value:n})}function so(n){switch(Xn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ia(n);return e?16+so(e):16;case 5:return 2*n.stringValue.length;case 6:return Jn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+so(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return wr(r.fields,((i,a)=>{s+=i.length+so(a)})),s})(n.mapValue);default:throw te(13486,{value:n})}}function ff(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Cl(n){return!!n&&"integerValue"in n}function Ic(n){return!!n&&"arrayValue"in n}function df(n){return!!n&&"nullValue"in n}function pf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function io(n){return!!n&&"mapValue"in n}function Rw(n){return(n?.mapValue?.fields||{})[fm]?.stringValue===dm}function Hs(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return wr(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=Hs(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Hs(n.arrayValue.values[t]);return e}return{...n}}function Cw(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Sw}/**
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
 */class bt{constructor(e){this.value=e}static empty(){return new bt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!io(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Hs(t)}setAll(e){let t=Xe.emptyPath(),r={},s=[];e.forEach(((a,l)=>{if(!t.isImmediateParentOf(l)){const c=this.getFieldsMap(t);this.applyChanges(c,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=Hs(a):s.push(l.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());io(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Yt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];io(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){wr(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new bt(Hs(this.value))}}function pm(n){const e=[];return wr(n.fields,((t,r)=>{const s=new Xe([t]);if(io(r)){const i=pm(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)})),new Ot(e)}/**
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
 */class it{constructor(e,t,r,s,i,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(e){return new it(e,0,se.min(),se.min(),se.min(),bt.empty(),0)}static newFoundDocument(e,t,r,s){return new it(e,1,t,se.min(),r,s,0)}static newNoDocument(e,t){return new it(e,2,t,se.min(),se.min(),bt.empty(),0)}static newUnknownDocument(e,t){return new it(e,3,t,se.min(),se.min(),bt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(se.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=bt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=bt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=se.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof it&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new it(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class ko{constructor(e,t){this.position=e,this.inclusive=t}}function mf(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=X.comparator(X.fromName(a.referenceValue),t.key):r=es(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function gf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Yt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Vo{constructor(e,t="asc"){this.field=e,this.dir=t}}function Pw(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class mm{}class Me extends mm{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Vw(e,t,r):t==="array-contains"?new Ow(e,r):t==="in"?new xw(e,r):t==="not-in"?new Mw(e,r):t==="array-contains-any"?new Lw(e,r):new Me(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Dw(e,r):new Nw(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(es(t,this.value)):t!==null&&Xn(this.value)===Xn(t)&&this.matchesComparison(es(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return te(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Lt extends mm{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Lt(e,t)}matches(e){return gm(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function gm(n){return n.op==="and"}function _m(n){return kw(n)&&gm(n)}function kw(n){for(const e of n.filters)if(e instanceof Lt)return!1;return!0}function Pl(n){if(n instanceof Me)return n.field.canonicalString()+n.op.toString()+ts(n.value);if(_m(n))return n.filters.map((e=>Pl(e))).join(",");{const e=n.filters.map((t=>Pl(t))).join(",");return`${n.op}(${e})`}}function ym(n,e){return n instanceof Me?(function(r,s){return s instanceof Me&&r.op===s.op&&r.field.isEqual(s.field)&&Yt(r.value,s.value)})(n,e):n instanceof Lt?(function(r,s){return s instanceof Lt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,l)=>i&&ym(a,s.filters[l])),!0):!1})(n,e):void te(19439)}function vm(n){return n instanceof Me?(function(t){return`${t.field.canonicalString()} ${t.op} ${ts(t.value)}`})(n):n instanceof Lt?(function(t){return t.op.toString()+" {"+t.getFilters().map(vm).join(" ,")+"}"})(n):"Filter"}class Vw extends Me{constructor(e,t,r){super(e,t,r),this.key=X.fromName(r.referenceValue)}matches(e){const t=X.comparator(e.key,this.key);return this.matchesComparison(t)}}class Dw extends Me{constructor(e,t){super(e,"in",t),this.keys=Em("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class Nw extends Me{constructor(e,t){super(e,"not-in",t),this.keys=Em("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Em(n,e){return(e.arrayValue?.values||[]).map((t=>X.fromName(t.referenceValue)))}class Ow extends Me{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ic(t)&&ii(t.arrayValue,this.value)}}class xw extends Me{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ii(this.value.arrayValue,t)}}class Mw extends Me{constructor(e,t){super(e,"not-in",t)}matches(e){if(ii(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ii(this.value.arrayValue,t)}}class Lw extends Me{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ic(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>ii(this.value.arrayValue,r)))}}/**
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
 */class Fw{constructor(e,t=null,r=[],s=[],i=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.Te=null}}function _f(n,e=null,t=[],r=[],s=null,i=null,a=null){return new Fw(n,e,t,r,s,i,a)}function wc(n){const e=oe(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>Pl(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),sa(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>ts(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>ts(r))).join(",")),e.Te=t}return e.Te}function Ac(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Pw(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!ym(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!gf(n.startAt,e.startAt)&&gf(n.endAt,e.endAt)}function kl(n){return X.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class _i{constructor(e,t=null,r=[],s=[],i=null,a="F",l=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=c,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Uw(n,e,t,r,s,i,a,l){return new _i(n,e,t,r,s,i,a,l)}function bc(n){return new _i(n)}function yf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Tm(n){return n.collectionGroup!==null}function zs(n){const e=oe(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new je(Xe.comparator);return a.filters.forEach((c=>{c.getFlattenedFilters().forEach((h=>{h.isInequality()&&(l=l.add(h.field))}))})),l})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new Vo(i,r))})),t.has(Xe.keyField().canonicalString())||e.Ie.push(new Vo(Xe.keyField(),r))}return e.Ie}function Wt(n){const e=oe(n);return e.Ee||(e.Ee=Bw(e,zs(n))),e.Ee}function Bw(n,e){if(n.limitType==="F")return _f(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Vo(s.field,i)}));const t=n.endAt?new ko(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new ko(n.startAt.position,n.startAt.inclusive):null;return _f(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Vl(n,e){const t=n.filters.concat([e]);return new _i(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Dl(n,e,t){return new _i(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function oa(n,e){return Ac(Wt(n),Wt(e))&&n.limitType===e.limitType}function Im(n){return`${wc(Wt(n))}|lt:${n.limitType}`}function Lr(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>vm(s))).join(", ")}]`),sa(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>ts(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>ts(s))).join(",")),`Target(${r})`})(Wt(n))}; limitType=${n.limitType})`}function aa(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):X.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of zs(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(a,l,c){const h=mf(a,l,c);return a.inclusive?h<=0:h<0})(r.startAt,zs(r),s)||r.endAt&&!(function(a,l,c){const h=mf(a,l,c);return a.inclusive?h>=0:h>0})(r.endAt,zs(r),s))})(n,e)}function $w(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function wm(n){return(e,t)=>{let r=!1;for(const s of zs(n)){const i=jw(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function jw(n,e,t){const r=n.field.isKeyField()?X.comparator(e.key,t.key):(function(i,a,l){const c=a.data.field(i),h=l.data.field(i);return c!==null&&h!==null?es(c,h):te(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return te(19790,{direction:n.dir})}}/**
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
 */class Ar{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){wr(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return om(this.inner)}size(){return this.innerSize}}/**
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
 */const qw=new Ve(X.comparator);function vn(){return qw}const Am=new Ve(X.comparator);function Ds(...n){let e=Am;for(const t of n)e=e.insert(t.key,t);return e}function bm(n){let e=Am;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function fr(){return Ws()}function Sm(){return Ws()}function Ws(){return new Ar((n=>n.toString()),((n,e)=>n.isEqual(e)))}const Hw=new Ve(X.comparator),zw=new je(X.comparator);function he(...n){let e=zw;for(const t of n)e=e.add(t);return e}const Ww=new je(ue);function Gw(){return Ww}/**
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
 */function Sc(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ro(e)?"-0":e}}function Rm(n){return{integerValue:""+n}}function Kw(n,e){return Tw(e)?Rm(e):Sc(n,e)}/**
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
 */class la{constructor(){this._=void 0}}function Qw(n,e,t){return n instanceof oi?(function(s,i){const a={fields:{[cm]:{stringValue:lm},[hm]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Tc(i)&&(i=ia(i)),i&&(a.fields[um]=i),{mapValue:a}})(t,e):n instanceof ai?Pm(n,e):n instanceof li?km(n,e):(function(s,i){const a=Cm(s,i),l=vf(a)+vf(s.Ae);return Cl(a)&&Cl(s.Ae)?Rm(l):Sc(s.serializer,l)})(n,e)}function Jw(n,e,t){return n instanceof ai?Pm(n,e):n instanceof li?km(n,e):t}function Cm(n,e){return n instanceof Do?(function(r){return Cl(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class oi extends la{}class ai extends la{constructor(e){super(),this.elements=e}}function Pm(n,e){const t=Vm(e);for(const r of n.elements)t.some((s=>Yt(s,r)))||t.push(r);return{arrayValue:{values:t}}}class li extends la{constructor(e){super(),this.elements=e}}function km(n,e){let t=Vm(e);for(const r of n.elements)t=t.filter((s=>!Yt(s,r)));return{arrayValue:{values:t}}}class Do extends la{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function vf(n){return Oe(n.integerValue||n.doubleValue)}function Vm(n){return Ic(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class Xw{constructor(e,t){this.field=e,this.transform=t}}function Yw(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof ai&&s instanceof ai||r instanceof li&&s instanceof li?Zr(r.elements,s.elements,Yt):r instanceof Do&&s instanceof Do?Yt(r.Ae,s.Ae):r instanceof oi&&s instanceof oi})(n.transform,e.transform)}class Zw{constructor(e,t){this.version=e,this.transformResults=t}}class Gt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Gt}static exists(e){return new Gt(void 0,e)}static updateTime(e){return new Gt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function oo(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class ca{}function Dm(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Om(n.key,Gt.none()):new yi(n.key,n.data,Gt.none());{const t=n.data,r=bt.empty();let s=new je(Xe.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new br(n.key,r,new Ot(s.toArray()),Gt.none())}}function eA(n,e,t){n instanceof yi?(function(s,i,a){const l=s.value.clone(),c=Tf(s.fieldTransforms,i,a.transformResults);l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(n,e,t):n instanceof br?(function(s,i,a){if(!oo(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=Tf(s.fieldTransforms,i,a.transformResults),c=i.data;c.setAll(Nm(s)),c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(n,e,t):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function Gs(n,e,t,r){return n instanceof yi?(function(i,a,l,c){if(!oo(i.precondition,a))return l;const h=i.value.clone(),d=If(i.fieldTransforms,c,a);return h.setAll(d),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null})(n,e,t,r):n instanceof br?(function(i,a,l,c){if(!oo(i.precondition,a))return l;const h=If(i.fieldTransforms,c,a),d=a.data;return d.setAll(Nm(i)),d.setAll(h),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(n,e,t,r):(function(i,a,l){return oo(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l})(n,e,t)}function tA(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Cm(r.transform,s||null);i!=null&&(t===null&&(t=bt.empty()),t.set(r.field,i))}return t||null}function Ef(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Zr(r,s,((i,a)=>Yw(i,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class yi extends ca{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class br extends ca{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Nm(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function Tf(n,e,t){const r=new Map;Te(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,l=e.data.field(i.field);r.set(i.field,Jw(a,l,t[s]))}return r}function If(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,Qw(i,a,e))}return r}class Om extends ca{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class nA extends ca{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class rA{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&eA(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Gs(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Gs(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Sm();return this.mutations.forEach((s=>{const i=e.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=t.has(s.key)?null:l;const c=Dm(a,l);c!==null&&r.set(s.key,c),a.isValidDocument()||a.convertToNoDocument(se.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),he())}isEqual(e){return this.batchId===e.batchId&&Zr(this.mutations,e.mutations,((t,r)=>Ef(t,r)))&&Zr(this.baseMutations,e.baseMutations,((t,r)=>Ef(t,r)))}}class Rc{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){Te(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return Hw})();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Rc(e,t,r,s)}}/**
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
 */class sA{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class iA{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var xe,pe;function oA(n){switch(n){case V.OK:return te(64938);case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return te(15467,{code:n})}}function xm(n){if(n===void 0)return yn("GRPC error has no .code"),V.UNKNOWN;switch(n){case xe.OK:return V.OK;case xe.CANCELLED:return V.CANCELLED;case xe.UNKNOWN:return V.UNKNOWN;case xe.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case xe.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case xe.INTERNAL:return V.INTERNAL;case xe.UNAVAILABLE:return V.UNAVAILABLE;case xe.UNAUTHENTICATED:return V.UNAUTHENTICATED;case xe.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case xe.NOT_FOUND:return V.NOT_FOUND;case xe.ALREADY_EXISTS:return V.ALREADY_EXISTS;case xe.PERMISSION_DENIED:return V.PERMISSION_DENIED;case xe.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case xe.ABORTED:return V.ABORTED;case xe.OUT_OF_RANGE:return V.OUT_OF_RANGE;case xe.UNIMPLEMENTED:return V.UNIMPLEMENTED;case xe.DATA_LOSS:return V.DATA_LOSS;default:return te(39323,{code:n})}}(pe=xe||(xe={}))[pe.OK=0]="OK",pe[pe.CANCELLED=1]="CANCELLED",pe[pe.UNKNOWN=2]="UNKNOWN",pe[pe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",pe[pe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",pe[pe.NOT_FOUND=5]="NOT_FOUND",pe[pe.ALREADY_EXISTS=6]="ALREADY_EXISTS",pe[pe.PERMISSION_DENIED=7]="PERMISSION_DENIED",pe[pe.UNAUTHENTICATED=16]="UNAUTHENTICATED",pe[pe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",pe[pe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",pe[pe.ABORTED=10]="ABORTED",pe[pe.OUT_OF_RANGE=11]="OUT_OF_RANGE",pe[pe.UNIMPLEMENTED=12]="UNIMPLEMENTED",pe[pe.INTERNAL=13]="INTERNAL",pe[pe.UNAVAILABLE=14]="UNAVAILABLE",pe[pe.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function aA(){return new TextEncoder}/**
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
 */const lA=new $n([4294967295,4294967295],0);function wf(n){const e=aA().encode(n),t=new Qp;return t.update(e),new Uint8Array(t.digest())}function Af(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new $n([t,r],0),new $n([s,i],0)]}class Cc{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Ns(`Invalid padding: ${t}`);if(r<0)throw new Ns(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ns(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Ns(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=$n.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply($n.fromNumber(r)));return s.compare(lA)===1&&(s=new $n([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=wf(e),[r,s]=Af(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Cc(i,s,t);return r.forEach((l=>a.insert(l))),a}insert(e){if(this.ge===0)return;const t=wf(e),[r,s]=Af(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Ns extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class ua{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,vi.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ua(se.min(),s,new Ve(ue),vn(),he())}}class vi{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new vi(r,t,he(),he(),he())}}/**
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
 */class ao{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class Mm{constructor(e,t){this.targetId=e,this.Ce=t}}class Lm{constructor(e,t,r=Ye.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class bf{constructor(){this.ve=0,this.Fe=Sf(),this.Me=Ye.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=he(),t=he(),r=he();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:te(38017,{changeType:i})}})),new vi(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=Sf()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,Te(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class cA{constructor(e){this.Ge=e,this.ze=new Map,this.je=vn(),this.Je=Wi(),this.He=Wi(),this.Ye=new Ve(ue)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:te(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(kl(i))if(r===0){const a=new X(i.path);this.et(t,a,it.newNoDocument(a,se.min()))}else Te(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const l=this.ut(e),c=l?this.ct(l,e,a):1;if(c!==0){this.it(t);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,h)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,l;try{a=Jn(r).toUint8Array()}catch(c){if(c instanceof am)return Yr("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new Cc(a,s,i)}catch(c){return Yr(c instanceof Ns?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.ge===0?null:l}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,a)=>{const l=this.ot(a);if(l){if(i.current&&kl(l.target)){const c=new X(l.target.path);this.It(c).has(a)||this.Et(a,c)||this.et(a,c,it.newNoDocument(c,e))}i.Be&&(t.set(a,i.ke()),i.qe())}}));let r=he();this.He.forEach(((i,a)=>{let l=!0;a.forEachWhile((c=>{const h=this.ot(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(r=r.add(i))})),this.je.forEach(((i,a)=>a.setReadTime(e)));const s=new ua(e,t,this.Ye,this.je,r);return this.je=vn(),this.Je=Wi(),this.He=Wi(),this.Ye=new Ve(ue),s}Xe(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new bf,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new je(ue),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new je(ue),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||W("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new bf),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Wi(){return new Ve(X.comparator)}function Sf(){return new Ve(X.comparator)}const uA={asc:"ASCENDING",desc:"DESCENDING"},hA={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},fA={and:"AND",or:"OR"};class dA{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Nl(n,e){return n.useProto3Json||sa(e)?e:{value:e}}function No(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Fm(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function pA(n,e){return No(n,e.toTimestamp())}function Kt(n){return Te(!!n,49232),se.fromTimestamp((function(t){const r=Qn(t);return new Pe(r.seconds,r.nanos)})(n))}function Pc(n,e){return Ol(n,e).canonicalString()}function Ol(n,e){const t=(function(s){return new Re(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Um(n){const e=Re.fromString(n);return Te(Hm(e),10190,{key:e.toString()}),e}function xl(n,e){return Pc(n.databaseId,e.path)}function el(n,e){const t=Um(e);if(t.get(1)!==n.databaseId.projectId)throw new G(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new G(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new X($m(t))}function Bm(n,e){return Pc(n.databaseId,e)}function mA(n){const e=Um(n);return e.length===4?Re.emptyPath():$m(e)}function Ml(n){return new Re(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function $m(n){return Te(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Rf(n,e,t){return{name:xl(n,e),fields:t.value.mapValue.fields}}function gA(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:te(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,d){return h.useProto3Json?(Te(d===void 0||typeof d=="string",58123),Ye.fromBase64String(d||"")):(Te(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),Ye.fromUint8Array(d||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&(function(h){const d=h.code===void 0?V.UNKNOWN:xm(h.code);return new G(d,h.message||"")})(a);t=new Lm(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=el(n,r.document.name),i=Kt(r.document.updateTime),a=r.document.createTime?Kt(r.document.createTime):se.min(),l=new bt({mapValue:{fields:r.document.fields}}),c=it.newFoundDocument(s,i,a,l),h=r.targetIds||[],d=r.removedTargetIds||[];t=new ao(h,d,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=el(n,r.document),i=r.readTime?Kt(r.readTime):se.min(),a=it.newNoDocument(s,i),l=r.removedTargetIds||[];t=new ao([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=el(n,r.document),i=r.removedTargetIds||[];t=new ao([],i,s,null)}else{if(!("filter"in e))return te(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new iA(s,i),l=r.targetId;t=new Mm(l,a)}}return t}function _A(n,e){let t;if(e instanceof yi)t={update:Rf(n,e.key,e.value)};else if(e instanceof Om)t={delete:xl(n,e.key)};else if(e instanceof br)t={update:Rf(n,e.key,e.data),updateMask:SA(e.fieldMask)};else{if(!(e instanceof nA))return te(16599,{Vt:e.type});t={verify:xl(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,a){const l=a.transform;if(l instanceof oi)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof ai)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof li)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Do)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw te(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:pA(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:te(27497)})(n,e.precondition)),t}function yA(n,e){return n&&n.length>0?(Te(e!==void 0,14353),n.map((t=>(function(s,i){let a=s.updateTime?Kt(s.updateTime):Kt(i);return a.isEqual(se.min())&&(a=Kt(i)),new Zw(a,s.transformResults||[])})(t,e)))):[]}function vA(n,e){return{documents:[Bm(n,e.path)]}}function EA(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Bm(n,s);const i=(function(h){if(h.length!==0)return qm(Lt.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const a=(function(h){if(h.length!==0)return h.map((d=>(function(_){return{field:Fr(_.field),direction:wA(_.dir)}})(d)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=Nl(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{ft:t,parent:s}}function TA(n){let e=mA(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){Te(r===1,65062);const d=t.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];t.where&&(i=(function(m){const _=jm(m);return _ instanceof Lt&&_m(_)?_.getFilters():[_]})(t.where));let a=[];t.orderBy&&(a=(function(m){return m.map((_=>(function(P){return new Vo(Ur(P.field),(function(M){switch(M){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(P.direction))})(_)))})(t.orderBy));let l=null;t.limit&&(l=(function(m){let _;return _=typeof m=="object"?m.value:m,sa(_)?null:_})(t.limit));let c=null;t.startAt&&(c=(function(m){const _=!!m.before,w=m.values||[];return new ko(w,_)})(t.startAt));let h=null;return t.endAt&&(h=(function(m){const _=!m.before,w=m.values||[];return new ko(w,_)})(t.endAt)),Uw(e,s,a,i,l,"F",c,h)}function IA(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return te(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function jm(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Ur(t.unaryFilter.field);return Me.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Ur(t.unaryFilter.field);return Me.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Ur(t.unaryFilter.field);return Me.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Ur(t.unaryFilter.field);return Me.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return te(61313);default:return te(60726)}})(n):n.fieldFilter!==void 0?(function(t){return Me.create(Ur(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return te(58110);default:return te(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return Lt.create(t.compositeFilter.filters.map((r=>jm(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return te(1026)}})(t.compositeFilter.op))})(n):te(30097,{filter:n})}function wA(n){return uA[n]}function AA(n){return hA[n]}function bA(n){return fA[n]}function Fr(n){return{fieldPath:n.canonicalString()}}function Ur(n){return Xe.fromServerFormat(n.fieldPath)}function qm(n){return n instanceof Me?(function(t){if(t.op==="=="){if(pf(t.value))return{unaryFilter:{field:Fr(t.field),op:"IS_NAN"}};if(df(t.value))return{unaryFilter:{field:Fr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(pf(t.value))return{unaryFilter:{field:Fr(t.field),op:"IS_NOT_NAN"}};if(df(t.value))return{unaryFilter:{field:Fr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Fr(t.field),op:AA(t.op),value:t.value}}})(n):n instanceof Lt?(function(t){const r=t.getFilters().map((s=>qm(s)));return r.length===1?r[0]:{compositeFilter:{op:bA(t.op),filters:r}}})(n):te(54877,{filter:n})}function SA(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Hm(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class xn{constructor(e,t,r,s,i=se.min(),a=se.min(),l=Ye.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new xn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new xn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new xn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new xn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class RA{constructor(e){this.yt=e}}function CA(n){const e=TA({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Dl(e,e.limit,"L"):e}/**
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
 */class PA{constructor(){this.Cn=new kA}addToCollectionParentIndex(e,t){return this.Cn.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(Kn.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(Kn.min())}updateCollectionGroup(e,t,r){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}}class kA{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new je(Re.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new je(Re.comparator)).toArray()}}/**
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
 */const Cf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},zm=41943040;class gt{static withCacheSize(e){return new gt(e,gt.DEFAULT_COLLECTION_PERCENTILE,gt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */gt.DEFAULT_COLLECTION_PERCENTILE=10,gt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,gt.DEFAULT=new gt(zm,gt.DEFAULT_COLLECTION_PERCENTILE,gt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),gt.DISABLED=new gt(-1,0,0);/**
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
 */class ns{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new ns(0)}static cr(){return new ns(-1)}}/**
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
 */const Pf="LruGarbageCollector",VA=1048576;function kf([n,e],[t,r]){const s=ue(n,t);return s===0?ue(e,r):s}class DA{constructor(e){this.Ir=e,this.buffer=new je(kf),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();kf(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class NA{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){W(Pf,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){hs(t)?W(Pf,"Ignoring IndexedDB error during garbage collection: ",t):await us(t)}await this.Vr(3e5)}))}}class OA{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return D.resolve(ra.ce);const r=new DA(t);return this.mr.forEachTarget(e,(s=>r.Ar(s.sequenceNumber))).next((()=>this.mr.pr(e,(s=>r.Ar(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(W("LruGarbageCollector","Garbage collection skipped; disabled"),D.resolve(Cf)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(W("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Cf):this.yr(e,t)))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,s,i,a,l,c,h;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(W("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,a=Date.now(),this.nthSequenceNumber(e,s)))).next((m=>(r=m,l=Date.now(),this.removeTargets(e,r,t)))).next((m=>(i=m,c=Date.now(),this.removeOrphanedDocuments(e,r)))).next((m=>(h=Date.now(),Mr()<=ce.DEBUG&&W("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-d}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${i} targets in `+(c-l)+`ms
	Removed ${m} documents in `+(h-c)+`ms
Total Duration: ${h-d}ms`),D.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m}))))}}function xA(n,e){return new OA(n,e)}/**
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
 */class MA{constructor(){this.changes=new Ar((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,it.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?D.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class LA{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class FA{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&Gs(r.mutation,s,Ot.empty(),Pe.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,he()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=he()){const s=fr();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let a=Ds();return i.forEach(((l,c)=>{a=a.insert(l,c.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const r=fr();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,he())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((a,l)=>{t.set(a,l)}))}))}computeViews(e,t,r,s){let i=vn();const a=Ws(),l=(function(){return Ws()})();return t.forEach(((c,h)=>{const d=r.get(h.key);s.has(h.key)&&(d===void 0||d.mutation instanceof br)?i=i.insert(h.key,h):d!==void 0?(a.set(h.key,d.mutation.getFieldMask()),Gs(d.mutation,h,d.mutation.getFieldMask(),Pe.now())):a.set(h.key,Ot.empty())})),this.recalculateAndSaveOverlays(e,i).next((c=>(c.forEach(((h,d)=>a.set(h,d))),t.forEach(((h,d)=>l.set(h,new LA(d,a.get(h)??null)))),l)))}recalculateAndSaveOverlays(e,t){const r=Ws();let s=new Ve(((a,l)=>a-l)),i=he();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const l of a)l.keys().forEach((c=>{const h=t.get(c);if(h===null)return;let d=r.get(c)||Ot.empty();d=l.applyToLocalView(h,d),r.set(c,d);const m=(s.get(l.batchId)||he()).add(c);s=s.insert(l.batchId,m)}))})).next((()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),h=c.key,d=c.value,m=Sm();d.forEach((_=>{if(!i.has(_)){const w=Dm(t.get(_),r.get(_));w!==null&&m.set(_,w),i=i.add(_)}})),a.push(this.documentOverlayCache.saveOverlays(e,h,m))}return D.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return(function(a){return X.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Tm(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):D.resolve(fr());let l=ni,c=i;return a.next((h=>D.forEach(h,((d,m)=>(l<m.largestBatchId&&(l=m.largestBatchId),i.get(d)?D.resolve():this.remoteDocumentCache.getEntry(e,d).next((_=>{c=c.insert(d,_)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,c,h,he()))).next((d=>({batchId:l,changes:bm(d)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new X(t)).next((r=>{let s=Ds();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Ds();return this.indexManager.getCollectionParents(e,i).next((l=>D.forEach(l,(c=>{const h=(function(m,_){return new _i(_,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(t,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((d=>{d.forEach(((m,_)=>{a=a.insert(m,_)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((a=>{i.forEach(((c,h)=>{const d=h.getKey();a.get(d)===null&&(a=a.insert(d,it.newInvalidDocument(d)))}));let l=Ds();return a.forEach(((c,h)=>{const d=i.get(c);d!==void 0&&Gs(d.mutation,h,Ot.empty(),Pe.now()),aa(t,h)&&(l=l.insert(c,h))})),l}))}}/**
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
 */class UA{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return D.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Kt(s.createTime)}})(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,(function(s){return{name:s.name,query:CA(s.bundledQuery),readTime:Kt(s.readTime)}})(t)),D.resolve()}}/**
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
 */class BA{constructor(){this.overlays=new Ve(X.comparator),this.qr=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){const r=fr();return D.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.St(e,t,i)})),D.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(r)),D.resolve()}getOverlaysForCollection(e,t,r){const s=fr(),i=t.length+1,a=new X(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const c=l.getNext().value,h=c.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return D.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Ve(((h,d)=>h-d));const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let d=i.get(h.largestBatchId);d===null&&(d=fr(),i=i.insert(h.largestBatchId,d)),d.set(h.getKey(),h)}}const l=fr(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((h,d)=>l.set(h,d))),!(l.size()>=s)););return D.resolve(l)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new sA(t,r));let i=this.qr.get(t);i===void 0&&(i=he(),this.qr.set(t,i)),this.qr.set(t,i.add(r.key))}}/**
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
 */class $A{constructor(){this.sessionToken=Ye.EMPTY_BYTE_STRING}getSessionToken(e){return D.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,D.resolve()}}/**
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
 */class kc{constructor(){this.Qr=new je(qe.$r),this.Ur=new je(qe.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const r=new qe(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Gr(new qe(e,t))}zr(e,t){e.forEach((r=>this.removeReference(r,t)))}jr(e){const t=new X(new Re([])),r=new qe(t,e),s=new qe(t,e+1),i=[];return this.Ur.forEachInRange([r,s],(a=>{this.Gr(a),i.push(a.key)})),i}Jr(){this.Qr.forEach((e=>this.Gr(e)))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new X(new Re([])),r=new qe(t,e),s=new qe(t,e+1);let i=he();return this.Ur.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(e){const t=new qe(e,0),r=this.Qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class qe{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return X.comparator(e.key,t.key)||ue(e.Yr,t.Yr)}static Kr(e,t){return ue(e.Yr,t.Yr)||X.comparator(e.key,t.key)}}/**
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
 */class jA{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new je(qe.$r)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new rA(i,t,r,s);this.mutationQueue.push(a);for(const l of s)this.Zr=this.Zr.add(new qe(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return D.resolve(a)}lookupMutationBatch(e,t){return D.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.ei(r),i=s<0?0:s;return D.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?Ec:this.tr-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new qe(t,0),s=new qe(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],(a=>{const l=this.Xr(a.Yr);i.push(l)})),D.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new je(ue);return t.forEach((s=>{const i=new qe(s,0),a=new qe(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],(l=>{r=r.add(l.Yr)}))})),D.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;X.isDocumentKey(i)||(i=i.child(""));const a=new qe(new X(i),0);let l=new je(ue);return this.Zr.forEachWhile((c=>{const h=c.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(l=l.add(c.Yr)),!0)}),a),D.resolve(this.ti(l))}ti(e){const t=[];return e.forEach((r=>{const s=this.Xr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){Te(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return D.forEach(t.mutations,(s=>{const i=new qe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Zr=r}))}ir(e){}containsKey(e,t){const r=new qe(t,0),s=this.Zr.firstAfterOrEqual(r);return D.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class qA{constructor(e){this.ri=e,this.docs=(function(){return new Ve(X.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return D.resolve(r?r.document.mutableCopy():it.newInvalidDocument(t))}getEntries(e,t){let r=vn();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():it.newInvalidDocument(s))})),D.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=vn();const a=t.path,l=new X(a.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:h,value:{document:d}}=c.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||_w(gw(d),r)<=0||(s.has(d.key)||aa(t,d))&&(i=i.insert(d.key,d.mutableCopy()))}return D.resolve(i)}getAllFromCollectionGroup(e,t,r,s){te(9500)}ii(e,t){return D.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new HA(this)}getSize(e){return D.resolve(this.size)}}class HA extends MA{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)})),D.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
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
 */class zA{constructor(e){this.persistence=e,this.si=new Ar((t=>wc(t)),Ac),this.lastRemoteSnapshotVersion=se.min(),this.highestTargetId=0,this.oi=0,this._i=new kc,this.targetCount=0,this.ai=ns.ur()}forEachTarget(e,t){return this.si.forEach(((r,s)=>t(s))),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),D.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new ns(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.Pr(t),D.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.si.forEach(((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)})),D.waitFor(i).next((()=>s))}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){const r=this.si.get(t)||null;return D.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),D.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((a=>{i.push(s.markPotentiallyOrphaned(e,a))})),D.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),D.resolve()}getMatchingKeysForTargetId(e,t){const r=this._i.Hr(t);return D.resolve(r)}containsKey(e,t){return D.resolve(this._i.containsKey(t))}}/**
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
 */class Wm{constructor(e,t){this.ui={},this.overlays={},this.ci=new ra(0),this.li=!1,this.li=!0,this.hi=new $A,this.referenceDelegate=e(this),this.Pi=new zA(this),this.indexManager=new PA,this.remoteDocumentCache=(function(s){return new qA(s)})((r=>this.referenceDelegate.Ti(r))),this.serializer=new RA(t),this.Ii=new UA(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new BA,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new jA(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){W("MemoryPersistence","Starting transaction:",e);const s=new WA(this.ci.next());return this.referenceDelegate.Ei(),r(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ai(e,t){return D.or(Object.values(this.ui).map((r=>()=>r.containsKey(e,t))))}}class WA extends vw{constructor(e){super(),this.currentSequenceNumber=e}}class Vc{constructor(e){this.persistence=e,this.Ri=new kc,this.Vi=null}static mi(e){return new Vc(e)}get fi(){if(this.Vi)return this.Vi;throw te(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),D.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),D.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach((s=>this.fi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.fi.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.fi,(r=>{const s=X.fromPath(r);return this.gi(e,s).next((i=>{i||t.removeEntry(s,se.min())}))})).next((()=>(this.Vi=null,t.apply(e))))}updateLimboDocument(e,t){return this.gi(e,t).next((r=>{r?this.fi.delete(t.toString()):this.fi.add(t.toString())}))}Ti(e){return 0}gi(e,t){return D.or([()=>D.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Oo{constructor(e,t){this.persistence=e,this.pi=new Ar((r=>Iw(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=xA(this,t)}static mi(e,t){return new Oo(e,t)}Ei(){}di(e){return D.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}wr(e){let t=0;return this.pr(e,(r=>{t++})).next((()=>t))}pr(e,t){return D.forEach(this.pi,((r,s)=>this.br(e,r,s).next((i=>i?D.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,(a=>this.br(e,a,t).next((l=>{l||(r++,i.removeEntry(a,se.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),D.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),D.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),D.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),D.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=so(e.data.value)),t}br(e,t,r){return D.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return D.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class Dc{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=s}static As(e,t){let r=he(),s=he();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Dc(e,t.fromCache,r,s)}}/**
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
 */class GA{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class KA{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return Uv()?8:Ew(lt())>0?6:4})()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ys(e,t).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.ws(e,t,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new GA;return this.Ss(e,t,a).next((l=>{if(i.result=l,this.Vs)return this.bs(e,t,a,l.size)}))})).next((()=>i.result))}bs(e,t,r,s){return r.documentReadCount<this.fs?(Mr()<=ce.DEBUG&&W("QueryEngine","SDK will not create cache indexes for query:",Lr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),D.resolve()):(Mr()<=ce.DEBUG&&W("QueryEngine","Query:",Lr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Mr()<=ce.DEBUG&&W("QueryEngine","The SDK decides to create cache indexes for query:",Lr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Wt(t))):D.resolve())}ys(e,t){if(yf(t))return D.resolve(null);let r=Wt(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=Dl(t,null,"F"),r=Wt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const a=he(...i);return this.ps.getDocuments(e,a).next((l=>this.indexManager.getMinOffset(e,r).next((c=>{const h=this.Ds(t,l);return this.Cs(t,h,a,c.readTime)?this.ys(e,Dl(t,null,"F")):this.vs(e,h,t,c)}))))})))))}ws(e,t,r,s){return yf(t)||s.isEqual(se.min())?D.resolve(null):this.ps.getDocuments(e,r).next((i=>{const a=this.Ds(t,i);return this.Cs(t,a,r,s)?D.resolve(null):(Mr()<=ce.DEBUG&&W("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Lr(t)),this.vs(e,a,t,mw(s,ni)).next((l=>l)))}))}Ds(e,t){let r=new je(wm(e));return t.forEach(((s,i)=>{aa(e,i)&&(r=r.add(i))})),r}Cs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,t,r){return Mr()<=ce.DEBUG&&W("QueryEngine","Using full collection scan to execute query:",Lr(t)),this.ps.getDocumentsMatchingQuery(e,t,Kn.min(),r)}vs(e,t,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
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
 */const Nc="LocalStore",QA=3e8;class JA{constructor(e,t,r,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new Ve(ue),this.xs=new Ar((i=>wc(i)),Ac),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new FA(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Ms)))}}function XA(n,e,t,r){return new JA(n,e,t,r)}async function Gm(n,e){const t=oe(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const a=[],l=[];let c=he();for(const h of s){a.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}for(const h of i){l.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}return t.localDocuments.getDocuments(r,c).next((h=>({Ls:h,removedBatchIds:a,addedBatchIds:l})))}))}))}function YA(n,e){const t=oe(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return(function(l,c,h,d){const m=h.batch,_=m.keys();let w=D.resolve();return _.forEach((P=>{w=w.next((()=>d.getEntry(c,P))).next((F=>{const M=h.docVersions.get(P);Te(M!==null,48541),F.version.compareTo(M)<0&&(m.applyToRemoteDocument(F,h),F.isValidDocument()&&(F.setReadTime(h.commitVersion),d.addEntry(F)))}))})),w.next((()=>l.mutationQueue.removeMutationBatch(c,m)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(l){let c=he();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(c=c.add(l.batch.mutations[h].key));return c})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function Km(n){const e=oe(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Pi.getLastRemoteSnapshotVersion(t)))}function ZA(n,e){const t=oe(n),r=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const l=[];e.targetChanges.forEach(((d,m)=>{const _=s.get(m);if(!_)return;l.push(t.Pi.removeMatchingKeys(i,d.removedDocuments,m).next((()=>t.Pi.addMatchingKeys(i,d.addedDocuments,m))));let w=_.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?w=w.withResumeToken(Ye.EMPTY_BYTE_STRING,se.min()).withLastLimboFreeSnapshotVersion(se.min()):d.resumeToken.approximateByteSize()>0&&(w=w.withResumeToken(d.resumeToken,r)),s=s.insert(m,w),(function(F,M,H){return F.resumeToken.approximateByteSize()===0||M.snapshotVersion.toMicroseconds()-F.snapshotVersion.toMicroseconds()>=QA?!0:H.addedDocuments.size+H.modifiedDocuments.size+H.removedDocuments.size>0})(_,w,d)&&l.push(t.Pi.updateTargetData(i,w))}));let c=vn(),h=he();if(e.documentUpdates.forEach((d=>{e.resolvedLimboDocuments.has(d)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(i,d))})),l.push(eb(i,a,e.documentUpdates).next((d=>{c=d.ks,h=d.qs}))),!r.isEqual(se.min())){const d=t.Pi.getLastRemoteSnapshotVersion(i).next((m=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r)));l.push(d)}return D.waitFor(l).next((()=>a.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,c,h))).next((()=>c))})).then((i=>(t.Ms=s,i)))}function eb(n,e,t){let r=he(),s=he();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let a=vn();return t.forEach(((l,c)=>{const h=i.get(l);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),c.isNoDocument()&&c.version.isEqual(se.min())?(e.removeEntry(l,c.readTime),a=a.insert(l,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),a=a.insert(l,c)):W(Nc,"Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",c.version)})),{ks:a,qs:s}}))}function tb(n,e){const t=oe(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Ec),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function nb(n,e){const t=oe(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.Pi.getTargetData(r,e).next((i=>i?(s=i,D.resolve(s)):t.Pi.allocateTargetId(r).next((a=>(s=new xn(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Pi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(r.targetId,r),t.xs.set(e,r.targetId)),r}))}async function Ll(n,e,t){const r=oe(n),s=r.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!hs(a))throw a;W(Nc,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function Vf(n,e,t){const r=oe(n);let s=se.min(),i=he();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(c,h,d){const m=oe(c),_=m.xs.get(d);return _!==void 0?D.resolve(m.Ms.get(_)):m.Pi.getTargetData(h,d)})(r,a,Wt(e)).next((l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,l.targetId).next((c=>{i=c}))})).next((()=>r.Fs.getDocumentsMatchingQuery(a,e,t?s:se.min(),t?i:he()))).next((l=>(rb(r,$w(e),l),{documents:l,Qs:i})))))}function rb(n,e,t){let r=n.Os.get(e)||se.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Os.set(e,r)}class Df{constructor(){this.activeTargetIds=Gw()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class sb{constructor(){this.Mo=new Df,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Df,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class ib{Oo(e){}shutdown(){}}/**
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
 */const Nf="ConnectivityMonitor";class Of{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){W(Nf,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){W(Nf,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Gi=null;function Fl(){return Gi===null?Gi=(function(){return 268435456+Math.round(2147483648*Math.random())})():Gi++,"0x"+Gi.toString(16)}/**
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
 */const tl="RestConnection",ob={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class ab{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===Co?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,t,r,s,i){const a=Fl(),l=this.zo(e,t.toUriEncodedString());W(tl,`Sending RPC '${e}' ${a}:`,l,r);const c={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(c,s,i);const{host:h}=new URL(l),d=os(h);return this.Jo(e,l,c,r,d).then((m=>(W(tl,`Received RPC '${e}' ${a}: `,m),m)),(m=>{throw Yr(tl,`RPC '${e}' ${a} failed with error: `,m,"url: ",l,"request:",r),m}))}Ho(e,t,r,s,i,a){return this.Go(e,t,r,s,i)}jo(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+cs})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}zo(e,t){const r=ob[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
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
 */class lb{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
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
 */const nt="WebChannelConnection";class cb extends ab{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,s,i){const a=Fl();return new Promise(((l,c)=>{const h=new Jp;h.setWithCredentials(!0),h.listenOnce(Xp.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case ro.NO_ERROR:const m=h.getResponseJson();W(nt,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(m)),l(m);break;case ro.TIMEOUT:W(nt,`RPC '${e}' ${a} timed out`),c(new G(V.DEADLINE_EXCEEDED,"Request time out"));break;case ro.HTTP_ERROR:const _=h.getStatus();if(W(nt,`RPC '${e}' ${a} failed with status:`,_,"response text:",h.getResponseText()),_>0){let w=h.getResponseJson();Array.isArray(w)&&(w=w[0]);const P=w?.error;if(P&&P.status&&P.message){const F=(function(H){const Q=H.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(Q)>=0?Q:V.UNKNOWN})(P.status);c(new G(F,P.message))}else c(new G(V.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new G(V.UNAVAILABLE,"Connection failed."));break;default:te(9055,{l_:e,streamId:a,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{W(nt,`RPC '${e}' ${a} completed.`)}}));const d=JSON.stringify(s);W(nt,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",d,r,15)}))}T_(e,t,r){const s=Fl(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=em(),l=Zp(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.jo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const d=i.join("");W(nt,`Creating RPC '${e}' stream ${s}: ${d}`,c);const m=a.createWebChannel(d,c);this.I_(m);let _=!1,w=!1;const P=new lb({Yo:M=>{w?W(nt,`Not sending because RPC '${e}' stream ${s} is closed:`,M):(_||(W(nt,`Opening RPC '${e}' stream ${s} transport.`),m.open(),_=!0),W(nt,`RPC '${e}' stream ${s} sending:`,M),m.send(M))},Zo:()=>m.close()}),F=(M,H,Q)=>{M.listen(H,(z=>{try{Q(z)}catch(K){setTimeout((()=>{throw K}),0)}}))};return F(m,Vs.EventType.OPEN,(()=>{w||(W(nt,`RPC '${e}' stream ${s} transport opened.`),P.o_())})),F(m,Vs.EventType.CLOSE,(()=>{w||(w=!0,W(nt,`RPC '${e}' stream ${s} transport closed`),P.a_(),this.E_(m))})),F(m,Vs.EventType.ERROR,(M=>{w||(w=!0,Yr(nt,`RPC '${e}' stream ${s} transport errored. Name:`,M.name,"Message:",M.message),P.a_(new G(V.UNAVAILABLE,"The operation could not be completed")))})),F(m,Vs.EventType.MESSAGE,(M=>{if(!w){const H=M.data[0];Te(!!H,16349);const Q=H,z=Q?.error||Q[0]?.error;if(z){W(nt,`RPC '${e}' stream ${s} received error:`,z);const K=z.status;let me=(function(v){const g=xe[v];if(g!==void 0)return xm(g)})(K),we=z.message;me===void 0&&(me=V.INTERNAL,we="Unknown error status: "+K+" with message "+z.message),w=!0,P.a_(new G(me,we)),m.close()}else W(nt,`RPC '${e}' stream ${s} received:`,H),P.u_(H)}})),F(l,Yp.STAT_EVENT,(M=>{M.stat===bl.PROXY?W(nt,`RPC '${e}' stream ${s} detected buffering proxy`):M.stat===bl.NOPROXY&&W(nt,`RPC '${e}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{P.__()}),0),P}terminate(){this.c_.forEach((e=>e.close())),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter((t=>t===e))}}function nl(){return typeof document<"u"?document:null}/**
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
 */function ha(n){return new dA(n,!0)}/**
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
 */class Qm{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&W("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const xf="PersistentStream";class Jm{constructor(e,t,r,s,i,a,l,c){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Qm(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===V.RESOURCE_EXHAUSTED?(yn(t.toString()),yn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===t&&this.G_(r,s)}),(r=>{e((()=>{const s=new G(V.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(e,t){const r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo((()=>{r((()=>this.listener.Xo()))})),this.stream.t_((()=>{r((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return W(xf,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget((()=>this.D_===e?t():(W(xf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class ub extends Jm{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=gA(this.serializer,e),r=(function(i){if(!("targetChange"in i))return se.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?se.min():a.readTime?Kt(a.readTime):se.min()})(e);return this.listener.H_(t,r)}Y_(e){const t={};t.database=Ml(this.serializer),t.addTarget=(function(i,a){let l;const c=a.target;if(l=kl(c)?{documents:vA(i,c)}:{query:EA(i,c).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=Fm(i,a.resumeToken);const h=Nl(i,a.expectedCount);h!==null&&(l.expectedCount=h)}else if(a.snapshotVersion.compareTo(se.min())>0){l.readTime=No(i,a.snapshotVersion.toTimestamp());const h=Nl(i,a.expectedCount);h!==null&&(l.expectedCount=h)}return l})(this.serializer,e);const r=IA(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){const t={};t.database=Ml(this.serializer),t.removeTarget=e,this.q_(t)}}class hb extends Jm{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return Te(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Te(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Te(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=yA(e.writeResults,e.commitTime),r=Kt(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=Ml(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>_A(this.serializer,r)))};this.q_(t)}}/**
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
 */class fb{}class db extends fb{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new G(V.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.Go(e,Ol(t,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new G(V.UNKNOWN,i.toString())}))}Ho(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,l])=>this.connection.Ho(e,Ol(t,r),s,a,l,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new G(V.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class pb{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(yn(t),this.aa=!1):W("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const Er="RemoteStore";class mb{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((a=>{r.enqueueAndForget((async()=>{Sr(this)&&(W(Er,"Restarting streams for network reachability change."),await(async function(c){const h=oe(c);h.Ea.add(4),await Ei(h),h.Ra.set("Unknown"),h.Ea.delete(4),await fa(h)})(this))}))})),this.Ra=new pb(r,s)}}async function fa(n){if(Sr(n))for(const e of n.da)await e(!0)}async function Ei(n){for(const e of n.da)await e(!1)}function Xm(n,e){const t=oe(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Lc(t)?Mc(t):fs(t).O_()&&xc(t,e))}function Oc(n,e){const t=oe(n),r=fs(t);t.Ia.delete(e),r.O_()&&Ym(t,e),t.Ia.size===0&&(r.O_()?r.L_():Sr(t)&&t.Ra.set("Unknown"))}function xc(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(se.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}fs(n).Y_(e)}function Ym(n,e){n.Va.Ue(e),fs(n).Z_(e)}function Mc(n){n.Va=new cA({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),fs(n).start(),n.Ra.ua()}function Lc(n){return Sr(n)&&!fs(n).x_()&&n.Ia.size>0}function Sr(n){return oe(n).Ea.size===0}function Zm(n){n.Va=void 0}async function gb(n){n.Ra.set("Online")}async function _b(n){n.Ia.forEach(((e,t)=>{xc(n,e)}))}async function yb(n,e){Zm(n),Lc(n)?(n.Ra.ha(e),Mc(n)):n.Ra.set("Unknown")}async function vb(n,e,t){if(n.Ra.set("Online"),e instanceof Lm&&e.state===2&&e.cause)try{await(async function(s,i){const a=i.cause;for(const l of i.targetIds)s.Ia.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.Ia.delete(l),s.Va.removeTarget(l))})(n,e)}catch(r){W(Er,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await xo(n,r)}else if(e instanceof ao?n.Va.Ze(e):e instanceof Mm?n.Va.st(e):n.Va.tt(e),!t.isEqual(se.min()))try{const r=await Km(n.localStore);t.compareTo(r)>=0&&await(function(i,a){const l=i.Va.Tt(a);return l.targetChanges.forEach(((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const d=i.Ia.get(h);d&&i.Ia.set(h,d.withResumeToken(c.resumeToken,a))}})),l.targetMismatches.forEach(((c,h)=>{const d=i.Ia.get(c);if(!d)return;i.Ia.set(c,d.withResumeToken(Ye.EMPTY_BYTE_STRING,d.snapshotVersion)),Ym(i,c);const m=new xn(d.target,c,h,d.sequenceNumber);xc(i,m)})),i.remoteSyncer.applyRemoteEvent(l)})(n,t)}catch(r){W(Er,"Failed to raise snapshot:",r),await xo(n,r)}}async function xo(n,e,t){if(!hs(e))throw e;n.Ea.add(1),await Ei(n),n.Ra.set("Offline"),t||(t=()=>Km(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{W(Er,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await fa(n)}))}function eg(n,e){return e().catch((t=>xo(n,t,e)))}async function da(n){const e=oe(n),t=Yn(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Ec;for(;Eb(e);)try{const s=await tb(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,Tb(e,s)}catch(s){await xo(e,s)}tg(e)&&ng(e)}function Eb(n){return Sr(n)&&n.Ta.length<10}function Tb(n,e){n.Ta.push(e);const t=Yn(n);t.O_()&&t.X_&&t.ea(e.mutations)}function tg(n){return Sr(n)&&!Yn(n).x_()&&n.Ta.length>0}function ng(n){Yn(n).start()}async function Ib(n){Yn(n).ra()}async function wb(n){const e=Yn(n);for(const t of n.Ta)e.ea(t.mutations)}async function Ab(n,e,t){const r=n.Ta.shift(),s=Rc.from(r,e,t);await eg(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await da(n)}async function bb(n,e){e&&Yn(n).X_&&await(async function(r,s){if((function(a){return oA(a)&&a!==V.ABORTED})(s.code)){const i=r.Ta.shift();Yn(r).B_(),await eg(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await da(r)}})(n,e),tg(n)&&ng(n)}async function Mf(n,e){const t=oe(n);t.asyncQueue.verifyOperationInProgress(),W(Er,"RemoteStore received new credentials");const r=Sr(t);t.Ea.add(3),await Ei(t),r&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await fa(t)}async function Sb(n,e){const t=oe(n);e?(t.Ea.delete(2),await fa(t)):e||(t.Ea.add(2),await Ei(t),t.Ra.set("Unknown"))}function fs(n){return n.ma||(n.ma=(function(t,r,s){const i=oe(t);return i.sa(),new ub(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:gb.bind(null,n),t_:_b.bind(null,n),r_:yb.bind(null,n),H_:vb.bind(null,n)}),n.da.push((async e=>{e?(n.ma.B_(),Lc(n)?Mc(n):n.Ra.set("Unknown")):(await n.ma.stop(),Zm(n))}))),n.ma}function Yn(n){return n.fa||(n.fa=(function(t,r,s){const i=oe(t);return i.sa(),new hb(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:Ib.bind(null,n),r_:bb.bind(null,n),ta:wb.bind(null,n),na:Ab.bind(null,n)}),n.da.push((async e=>{e?(n.fa.B_(),await da(n)):(await n.fa.stop(),n.Ta.length>0&&(W(Er,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
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
 */class Fc{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new jn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,l=new Fc(e,t,a,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new G(V.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Uc(n,e){if(yn("AsyncQueue",`${e}: ${n}`),hs(n))return new G(V.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Qr{static emptySet(e){return new Qr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||X.comparator(t.key,r.key):(t,r)=>X.comparator(t.key,r.key),this.keyedMap=Ds(),this.sortedSet=new Ve(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Qr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Qr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class Lf{constructor(){this.ga=new Ve(X.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):te(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,r)=>{e.push(r)})),e}}class rs{constructor(e,t,r,s,i,a,l,c,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach((l=>{a.push({type:0,doc:l})})),new rs(e,t,Qr.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&oa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class Rb{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class Cb{constructor(){this.queries=Ff(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=oe(t),i=s.queries;s.queries=Ff(),i.forEach(((a,l)=>{for(const c of l.Sa)c.onError(r)}))})(this,new G(V.ABORTED,"Firestore shutting down"))}}function Ff(){return new Ar((n=>Im(n)),oa)}async function rg(n,e){const t=oe(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new Rb,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=Uc(a,`Initialization of query '${Lr(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&Bc(t)}async function sg(n,e){const t=oe(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Pb(n,e){const t=oe(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const l of a.Sa)l.Fa(s)&&(r=!0);a.wa=s}}r&&Bc(t)}function kb(n,e,t){const r=oe(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function Bc(n){n.Ca.forEach((e=>{e.next()}))}var Ul,Uf;(Uf=Ul||(Ul={})).Ma="default",Uf.Cache="cache";class ig{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new rs(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=rs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Ul.Cache}}/**
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
 */class og{constructor(e){this.key=e}}class ag{constructor(e){this.key=e}}class Vb{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=he(),this.mutatedKeys=he(),this.eu=wm(e),this.tu=new Qr(this.eu)}get nu(){return this.Ya}ru(e,t){const r=t?t.iu:new Lf,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((d,m)=>{const _=s.get(d),w=aa(this.query,m)?m:null,P=!!_&&this.mutatedKeys.has(_.key),F=!!w&&(w.hasLocalMutations||this.mutatedKeys.has(w.key)&&w.hasCommittedMutations);let M=!1;_&&w?_.data.isEqual(w.data)?P!==F&&(r.track({type:3,doc:w}),M=!0):this.su(_,w)||(r.track({type:2,doc:w}),M=!0,(c&&this.eu(w,c)>0||h&&this.eu(w,h)<0)&&(l=!0)):!_&&w?(r.track({type:0,doc:w}),M=!0):_&&!w&&(r.track({type:1,doc:_}),M=!0,(c||h)&&(l=!0)),M&&(w?(a=a.add(w),i=F?i.add(d):i.delete(d)):(a=a.delete(d),i=i.delete(d)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const d=this.query.limitType==="F"?a.last():a.first();a=a.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{tu:a,iu:r,Cs:l,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort(((d,m)=>(function(w,P){const F=M=>{switch(M){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return te(20277,{Rt:M})}};return F(w)-F(P)})(d.type,m.type)||this.eu(d.doc,m.doc))),this.ou(r),s=s??!1;const l=t&&!s?this._u():[],c=this.Xa.size===0&&this.current&&!s?1:0,h=c!==this.Za;return this.Za=c,a.length!==0||h?{snapshot:new rs(this.query,e.tu,i,a,e.mutatedKeys,c===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Lf,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Ya=this.Ya.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ya=this.Ya.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=he(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))}));const t=[];return e.forEach((r=>{this.Xa.has(r)||t.push(new ag(r))})),this.Xa.forEach((r=>{e.has(r)||t.push(new og(r))})),t}cu(e){this.Ya=e.Qs,this.Xa=he();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return rs.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const $c="SyncEngine";class Db{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Nb{constructor(e){this.key=e,this.hu=!1}}class Ob{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new Ar((l=>Im(l)),oa),this.Iu=new Map,this.Eu=new Set,this.du=new Ve(X.comparator),this.Au=new Map,this.Ru=new kc,this.Vu={},this.mu=new Map,this.fu=ns.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function xb(n,e,t=!0){const r=dg(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await lg(r,e,t,!0),s}async function Mb(n,e){const t=dg(n);await lg(t,e,!0,!1)}async function lg(n,e,t,r){const s=await nb(n.localStore,Wt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let l;return r&&(l=await Lb(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Xm(n.remoteStore,s),l}async function Lb(n,e,t,r,s){n.pu=(m,_,w)=>(async function(F,M,H,Q){let z=M.view.ru(H);z.Cs&&(z=await Vf(F.localStore,M.query,!1).then((({documents:b})=>M.view.ru(b,z))));const K=Q&&Q.targetChanges.get(M.targetId),me=Q&&Q.targetMismatches.get(M.targetId)!=null,we=M.view.applyChanges(z,F.isPrimaryClient,K,me);return $f(F,M.targetId,we.au),we.snapshot})(n,m,_,w);const i=await Vf(n.localStore,e,!0),a=new Vb(e,i.Qs),l=a.ru(i.documents),c=vi.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(l,n.isPrimaryClient,c);$f(n,t,h.au);const d=new Db(e,t,a);return n.Tu.set(e,d),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),h.snapshot}async function Fb(n,e,t){const r=oe(n),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter((a=>!oa(a,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Ll(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Oc(r.remoteStore,s.targetId),Bl(r,s.targetId)})).catch(us)):(Bl(r,s.targetId),await Ll(r.localStore,s.targetId,!0))}async function Ub(n,e){const t=oe(n),r=t.Tu.get(e),s=t.Iu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Oc(t.remoteStore,r.targetId))}async function Bb(n,e,t){const r=Gb(n);try{const s=await(function(a,l){const c=oe(a),h=Pe.now(),d=l.reduce(((w,P)=>w.add(P.key)),he());let m,_;return c.persistence.runTransaction("Locally write mutations","readwrite",(w=>{let P=vn(),F=he();return c.Ns.getEntries(w,d).next((M=>{P=M,P.forEach(((H,Q)=>{Q.isValidDocument()||(F=F.add(H))}))})).next((()=>c.localDocuments.getOverlayedDocuments(w,P))).next((M=>{m=M;const H=[];for(const Q of l){const z=tA(Q,m.get(Q.key).overlayedDocument);z!=null&&H.push(new br(Q.key,z,pm(z.value.mapValue),Gt.exists(!0)))}return c.mutationQueue.addMutationBatch(w,h,H,l)})).next((M=>{_=M;const H=M.applyToLocalDocumentSet(m,F);return c.documentOverlayCache.saveOverlays(w,M.batchId,H)}))})).then((()=>({batchId:_.batchId,changes:bm(m)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(a,l,c){let h=a.Vu[a.currentUser.toKey()];h||(h=new Ve(ue)),h=h.insert(l,c),a.Vu[a.currentUser.toKey()]=h})(r,s.batchId,t),await Ti(r,s.changes),await da(r.remoteStore)}catch(s){const i=Uc(s,"Failed to persist write");t.reject(i)}}async function cg(n,e){const t=oe(n);try{const r=await ZA(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const a=t.Au.get(i);a&&(Te(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?Te(a.hu,14607):s.removedDocuments.size>0&&(Te(a.hu,42227),a.hu=!1))})),await Ti(t,r,e)}catch(r){await us(r)}}function Bf(n,e,t){const r=oe(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach(((i,a)=>{const l=a.view.va(e);l.snapshot&&s.push(l.snapshot)})),(function(a,l){const c=oe(a);c.onlineState=l;let h=!1;c.queries.forEach(((d,m)=>{for(const _ of m.Sa)_.va(l)&&(h=!0)})),h&&Bc(c)})(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function $b(n,e,t){const r=oe(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let a=new Ve(X.comparator);a=a.insert(i,it.newNoDocument(i,se.min()));const l=he().add(i),c=new ua(se.min(),new Map,new Ve(ue),a,l);await cg(r,c),r.du=r.du.remove(i),r.Au.delete(e),jc(r)}else await Ll(r.localStore,e,!1).then((()=>Bl(r,e,t))).catch(us)}async function jb(n,e){const t=oe(n),r=e.batch.batchId;try{const s=await YA(t.localStore,e);hg(t,r,null),ug(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Ti(t,s)}catch(s){await us(s)}}async function qb(n,e,t){const r=oe(n);try{const s=await(function(a,l){const c=oe(a);return c.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let d;return c.mutationQueue.lookupMutationBatch(h,l).next((m=>(Te(m!==null,37113),d=m.keys(),c.mutationQueue.removeMutationBatch(h,m)))).next((()=>c.mutationQueue.performConsistencyCheck(h))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(h,d,l))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,d))).next((()=>c.localDocuments.getDocuments(h,d)))}))})(r.localStore,e);hg(r,e,t),ug(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Ti(r,s)}catch(s){await us(s)}}function ug(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function hg(n,e,t){const r=oe(n);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function Bl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach((r=>{n.Ru.containsKey(r)||fg(n,r)}))}function fg(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Oc(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),jc(n))}function $f(n,e,t){for(const r of t)r instanceof og?(n.Ru.addReference(r.key,e),Hb(n,r)):r instanceof ag?(W($c,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,e),n.Ru.containsKey(r.key)||fg(n,r.key)):te(19791,{wu:r})}function Hb(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Eu.has(r)||(W($c,"New document in limbo: "+t),n.Eu.add(r),jc(n))}function jc(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new X(Re.fromString(e)),r=n.fu.next();n.Au.set(r,new Nb(t)),n.du=n.du.insert(t,r),Xm(n.remoteStore,new xn(Wt(bc(t.path)),r,"TargetPurposeLimboResolution",ra.ce))}}async function Ti(n,e,t){const r=oe(n),s=[],i=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach(((l,c)=>{a.push(r.pu(c,e,t).then((h=>{if((h||t)&&r.isPrimaryClient){const d=h?!h.fromCache:t?.targetChanges.get(c.targetId)?.current;r.sharedClientState.updateQueryState(c.targetId,d?"current":"not-current")}if(h){s.push(h);const d=Dc.As(c.targetId,h);i.push(d)}})))})),await Promise.all(a),r.Pu.H_(s),await(async function(c,h){const d=oe(c);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>D.forEach(h,(_=>D.forEach(_.Es,(w=>d.persistence.referenceDelegate.addReference(m,_.targetId,w))).next((()=>D.forEach(_.ds,(w=>d.persistence.referenceDelegate.removeReference(m,_.targetId,w)))))))))}catch(m){if(!hs(m))throw m;W(Nc,"Failed to update sequence numbers: "+m)}for(const m of h){const _=m.targetId;if(!m.fromCache){const w=d.Ms.get(_),P=w.snapshotVersion,F=w.withLastLimboFreeSnapshotVersion(P);d.Ms=d.Ms.insert(_,F)}}})(r.localStore,i))}async function zb(n,e){const t=oe(n);if(!t.currentUser.isEqual(e)){W($c,"User change. New user:",e.toKey());const r=await Gm(t.localStore,e);t.currentUser=e,(function(i,a){i.mu.forEach((l=>{l.forEach((c=>{c.reject(new G(V.CANCELLED,a))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ti(t,r.Ls)}}function Wb(n,e){const t=oe(n),r=t.Au.get(e);if(r&&r.hu)return he().add(r.key);{let s=he();const i=t.Iu.get(e);if(!i)return s;for(const a of i){const l=t.Tu.get(a);s=s.unionWith(l.view.nu)}return s}}function dg(n){const e=oe(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=cg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Wb.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=$b.bind(null,e),e.Pu.H_=Pb.bind(null,e.eventManager),e.Pu.yu=kb.bind(null,e.eventManager),e}function Gb(n){const e=oe(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=jb.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=qb.bind(null,e),e}class Mo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ha(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return XA(this.persistence,new KA,e.initialUser,this.serializer)}Cu(e){return new Wm(Vc.mi,this.serializer)}Du(e){return new sb}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Mo.provider={build:()=>new Mo};class Kb extends Mo{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){Te(this.persistence.referenceDelegate instanceof Oo,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new NA(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?gt.withCacheSize(this.cacheSizeBytes):gt.DEFAULT;return new Wm((r=>Oo.mi(r,t)),this.serializer)}}class $l{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Bf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=zb.bind(null,this.syncEngine),await Sb(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Cb})()}createDatastore(e){const t=ha(e.databaseInfo.databaseId),r=(function(i){return new cb(i)})(e.databaseInfo);return(function(i,a,l,c){return new db(i,a,l,c)})(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,a,l){return new mb(r,s,i,a,l)})(this.localStore,this.datastore,e.asyncQueue,(t=>Bf(this.syncEngine,t,0)),(function(){return Of.v()?new Of:new ib})())}createSyncEngine(e,t){return(function(s,i,a,l,c,h,d){const m=new Ob(s,i,a,l,c,h);return d&&(m.gu=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const r=oe(t);W(Er,"RemoteStore shutting down."),r.Ea.add(5),await Ei(r),r.Aa.shutdown(),r.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}$l.provider={build:()=>new $l};/**
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
 */class pg{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):yn("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
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
 */const Zn="FirestoreClient";class Qb{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=rt.UNAUTHENTICATED,this.clientId=vc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{W(Zn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(W(Zn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new jn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Uc(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function rl(n,e){n.asyncQueue.verifyOperationInProgress(),W(Zn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Gm(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function jf(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Jb(n);W(Zn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>Mf(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Mf(e.remoteStore,s))),n._onlineComponents=e}async function Jb(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){W(Zn,"Using user provided OfflineComponentProvider");try{await rl(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===V.FAILED_PRECONDITION||s.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Yr("Error using user provided cache. Falling back to memory cache: "+t),await rl(n,new Mo)}}else W(Zn,"Using default OfflineComponentProvider"),await rl(n,new Kb(void 0));return n._offlineComponents}async function mg(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(W(Zn,"Using user provided OnlineComponentProvider"),await jf(n,n._uninitializedComponentsProvider._online)):(W(Zn,"Using default OnlineComponentProvider"),await jf(n,new $l))),n._onlineComponents}function Xb(n){return mg(n).then((e=>e.syncEngine))}async function jl(n){const e=await mg(n),t=e.eventManager;return t.onListen=xb.bind(null,e.syncEngine),t.onUnlisten=Fb.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Mb.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Ub.bind(null,e.syncEngine),t}function Yb(n,e,t={}){const r=new jn;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,l,c,h){const d=new pg({next:_=>{d.Nu(),a.enqueueAndForget((()=>sg(i,m))),_.fromCache&&c.source==="server"?h.reject(new G(V.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(_)},error:_=>h.reject(_)}),m=new ig(l,d,{includeMetadataChanges:!0,qa:!0});return rg(i,m)})(await jl(n),n.asyncQueue,e,t,r))),r.promise}/**
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
 */function gg(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const qf=new Map;/**
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
 */const _g="firestore.googleapis.com",Hf=!0;class zf{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new G(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=_g,this.ssl=Hf}else this.host=e.host,this.ssl=e.ssl??Hf;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=zm;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<VA)throw new G(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}pw("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=gg(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new G(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new G(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new G(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class pa{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new zf({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new G(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new G(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new zf(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new sw;switch(r.type){case"firstParty":return new lw(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new G(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=qf.get(t);r&&(W("ComponentProvider","Removing Datastore"),qf.delete(t),r.terminate())})(this),Promise.resolve()}}function Zb(n,e,t,r={}){n=hn(n,pa);const s=os(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},l=`${e}:${t}`;s&&(cp(`https://${l}`),up("Firestore",!0)),i.host!==_g&&i.host!==l&&Yr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:l,ssl:s,emulatorOptions:r};if(!gr(c,a)&&(n._setSettings(c),r.mockUserToken)){let h,d;if(typeof r.mockUserToken=="string")h=r.mockUserToken,d=rt.MOCK_USER;else{h=kv(r.mockUserToken,n._app?.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new G(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new rt(m)}n._authCredentials=new iw(new nm(h,d))}}/**
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
 */class Rr{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Rr(this.firestore,e,this._query)}}class Fe{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new qn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Fe(this.firestore,e,this._key)}toJSON(){return{type:Fe._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(gi(t,Fe._jsonSchema))return new Fe(e,r||null,new X(Re.fromString(t.referencePath)))}}Fe._jsonSchemaVersion="firestore/documentReference/1.0",Fe._jsonSchema={type:Le("string",Fe._jsonSchemaVersion),referencePath:Le("string")};class qn extends Rr{constructor(e,t,r){super(e,t,bc(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Fe(this.firestore,null,new X(e))}withConverter(e){return new qn(this.firestore,e,this._path)}}function ma(n,e,...t){if(n=It(n),rm("collection","path",e),n instanceof pa){const r=Re.fromString(e,...t);return rf(r),new qn(n,null,r)}{if(!(n instanceof Fe||n instanceof qn))throw new G(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Re.fromString(e,...t));return rf(r),new qn(n.firestore,null,r)}}function ss(n,e,...t){if(n=It(n),arguments.length===1&&(e=vc.newId()),rm("doc","path",e),n instanceof pa){const r=Re.fromString(e,...t);return nf(r),new Fe(n,null,new X(r))}{if(!(n instanceof Fe||n instanceof qn))throw new G(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Re.fromString(e,...t));return nf(r),new Fe(n.firestore,n instanceof qn?n.converter:null,new X(r))}}/**
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
 */const Wf="AsyncQueue";class Gf{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Qm(this,"async_queue_retry"),this._c=()=>{const r=nl();r&&W(Wf,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=nl();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=nl();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new jn;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Xu.push(e),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!hs(e))throw e;W(Wf,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,yn("INTERNAL UNHANDLED ERROR: ",Kf(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Fc.createAndSchedule(this,e,t,r,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&te(47125,{Pc:Kf(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Kf(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function Qf(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}class is extends pa{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Gf,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Gf(e),this._firestoreClient=void 0,await e}}}function eS(n,e){const t=typeof n=="object"?n:pp(),r=typeof n=="string"?n:Co,s=uc(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Cv("firestore");i&&Zb(s,...i)}return s}function qc(n){if(n._terminated)throw new G(V.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||tS(n),n._firestoreClient}function tS(n){const e=n._freezeSettings(),t=(function(s,i,a,l){return new bw(s,i,a,l.host,l.ssl,l.experimentalForceLongPolling,l.experimentalAutoDetectLongPolling,gg(l.experimentalLongPollingOptions),l.useFetchStreams,l.isUsingEmulator)})(n._databaseId,n._app?.options.appId||"",n._persistenceKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Qb(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(n._componentsProvider))}/**
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
 */class St{constructor(e){this._byteString=e}static fromBase64String(e){try{return new St(Ye.fromBase64String(e))}catch(t){throw new G(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new St(Ye.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:St._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(gi(e,St._jsonSchema))return St.fromBase64String(e.bytes)}}St._jsonSchemaVersion="firestore/bytes/1.0",St._jsonSchema={type:Le("string",St._jsonSchemaVersion),bytes:Le("string")};/**
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
 */class Hc{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new G(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Xe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class zc{constructor(e){this._methodName=e}}/**
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
 */class Qt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new G(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new G(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ue(this._lat,e._lat)||ue(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Qt._jsonSchemaVersion}}static fromJSON(e){if(gi(e,Qt._jsonSchema))return new Qt(e.latitude,e.longitude)}}Qt._jsonSchemaVersion="firestore/geoPoint/1.0",Qt._jsonSchema={type:Le("string",Qt._jsonSchemaVersion),latitude:Le("number"),longitude:Le("number")};/**
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
 */class Jt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Jt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(gi(e,Jt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Jt(e.vectorValues);throw new G(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Jt._jsonSchemaVersion="firestore/vectorValue/1.0",Jt._jsonSchema={type:Le("string",Jt._jsonSchemaVersion),vectorValues:Le("object")};/**
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
 */const nS=/^__.*__$/;class rS{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new br(e,this.data,this.fieldMask,t,this.fieldTransforms):new yi(e,this.data,t,this.fieldTransforms)}}function yg(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw te(40011,{Ac:n})}}class Wc{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Wc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Lo(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(yg(this.Ac)&&nS.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class sS{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||ha(e)}Cc(e,t,r,s=!1){return new Wc({Ac:e,methodName:t,Dc:r,path:Xe.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Gc(n){const e=n._freezeSettings(),t=ha(n._databaseId);return new sS(n._databaseId,!!e.ignoreUndefinedProperties,t)}function vg(n,e,t,r,s,i={}){const a=n.Cc(i.merge||i.mergeFields?2:0,e,t,s);Ig("Data must be an object, but it was:",a,r);const l=Eg(r,a);let c,h;if(i.merge)c=new Ot(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const d=[];for(const m of i.mergeFields){const _=oS(e,m,t);if(!a.contains(_))throw new G(V.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);lS(d,_)||d.push(_)}c=new Ot(d),h=a.fieldTransforms.filter((m=>c.covers(m.field)))}else c=null,h=a.fieldTransforms;return new rS(new bt(l),c,h)}class Kc extends zc{_toFieldTransform(e){return new Xw(e.path,new oi)}isEqual(e){return e instanceof Kc}}function iS(n,e,t,r=!1){return Qc(t,n.Cc(r?4:3,e))}function Qc(n,e){if(Tg(n=It(n)))return Ig("Unsupported field value:",e,n),Eg(n,e);if(n instanceof zc)return(function(r,s){if(!yg(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return(function(r,s){const i=[];let a=0;for(const l of r){let c=Qc(l,s.wc(a));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),a++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=It(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Kw(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Pe.fromDate(r);return{timestampValue:No(s.serializer,i)}}if(r instanceof Pe){const i=new Pe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:No(s.serializer,i)}}if(r instanceof Qt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof St)return{bytesValue:Fm(s.serializer,r._byteString)};if(r instanceof Fe){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Pc(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Jt)return(function(a,l){return{mapValue:{fields:{[fm]:{stringValue:dm},[Po]:{arrayValue:{values:a.toArray().map((h=>{if(typeof h!="number")throw l.Sc("VectorValues must only contain numeric values.");return Sc(l.serializer,h)}))}}}}}})(r,s);throw s.Sc(`Unsupported field value: ${na(r)}`)})(n,e)}function Eg(n,e){const t={};return om(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):wr(n,((r,s)=>{const i=Qc(s,e.mc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function Tg(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Pe||n instanceof Qt||n instanceof St||n instanceof Fe||n instanceof zc||n instanceof Jt)}function Ig(n,e,t){if(!Tg(t)||!sm(t)){const r=na(t);throw r==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+r)}}function oS(n,e,t){if((e=It(e))instanceof Hc)return e._internalPath;if(typeof e=="string")return wg(n,e);throw Lo("Field path arguments must be of type string or ",n,!1,void 0,t)}const aS=new RegExp("[~\\*/\\[\\]]");function wg(n,e,t){if(e.search(aS)>=0)throw Lo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Hc(...e.split("."))._internalPath}catch{throw Lo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Lo(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(i||a)&&(c+=" (found",i&&(c+=` in field ${r}`),a&&(c+=` in document ${s}`),c+=")"),new G(V.INVALID_ARGUMENT,l+n+c)}function lS(n,e){return n.some((t=>t.isEqual(e)))}/**
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
 */class Ag{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Fe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new cS(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Jc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class cS extends Ag{data(){return super.data()}}function Jc(n,e){return typeof e=="string"?wg(n,e):e instanceof Hc?e._internalPath:e._delegate._internalPath}/**
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
 */function bg(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new G(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Xc{}class uS extends Xc{}function hS(n,e,...t){let r=[];e instanceof Xc&&r.push(e),r=r.concat(t),(function(i){const a=i.filter((c=>c instanceof Yc)).length,l=i.filter((c=>c instanceof ga)).length;if(a>1||a>0&&l>0)throw new G(V.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class ga extends uS{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new ga(e,t,r)}_apply(e){const t=this._parse(e);return Sg(e._query,t),new Rr(e.firestore,e.converter,Vl(e._query,t))}_parse(e){const t=Gc(e.firestore);return(function(i,a,l,c,h,d,m){let _;if(h.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new G(V.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){Xf(m,d);const P=[];for(const F of m)P.push(Jf(c,i,F));_={arrayValue:{values:P}}}else _=Jf(c,i,m)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||Xf(m,d),_=iS(l,a,m,d==="in"||d==="not-in");return Me.create(h,d,_)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function fS(n,e,t){const r=e,s=Jc("where",n);return ga._create(s,r,t)}class Yc extends Xc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Yc(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:Lt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let a=s;const l=i.getFlattenedFilters();for(const c of l)Sg(a,c),a=Vl(a,c)})(e._query,t),new Rr(e.firestore,e.converter,Vl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Jf(n,e,t){if(typeof(t=It(t))=="string"){if(t==="")throw new G(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Tm(e)&&t.indexOf("/")!==-1)throw new G(V.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Re.fromString(t));if(!X.isDocumentKey(r))throw new G(V.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return ff(n,new X(r))}if(t instanceof Fe)return ff(n,t._key);throw new G(V.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${na(t)}.`)}function Xf(n,e){if(!Array.isArray(n)||n.length===0)throw new G(V.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Sg(n,e){const t=(function(s,i){for(const a of s)for(const l of a.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new G(V.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new G(V.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class dS{convertValue(e,t="none"){switch(Xn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Oe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Jn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw te(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return wr(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){const t=e.fields?.[Po].arrayValue?.values?.map((r=>Oe(r.doubleValue)));return new Jt(t)}convertGeoPoint(e){return new Qt(Oe(e.latitude),Oe(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=ia(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ri(e));default:return null}}convertTimestamp(e){const t=Qn(e);return new Pe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Re.fromString(e);Te(Hm(r),9688,{name:e});const s=new si(r.get(1),r.get(3)),i=new X(r.popFirst(5));return s.isEqual(t)||yn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */function Rg(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class Os{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class pr extends Ag{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new lo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Jc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new G(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=pr._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}pr._jsonSchemaVersion="firestore/documentSnapshot/1.0",pr._jsonSchema={type:Le("string",pr._jsonSchemaVersion),bundleSource:Le("string","DocumentSnapshot"),bundleName:Le("string"),bundle:Le("string")};class lo extends pr{data(e={}){return super.data(e)}}class mr{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Os(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new lo(this._firestore,this._userDataWriter,r.key,r,new Os(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new G(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((l=>{const c=new lo(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Os(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((l=>i||l.type!==3)).map((l=>{const c=new lo(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Os(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,d=-1;return l.type!==0&&(h=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),d=a.indexOf(l.doc.key)),{type:pS(l.type),doc:c,oldIndex:h,newIndex:d}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new G(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=mr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=vc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function pS(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return te(61501,{type:n})}}mr._jsonSchemaVersion="firestore/querySnapshot/1.0",mr._jsonSchema={type:Le("string",mr._jsonSchemaVersion),bundleSource:Le("string","QuerySnapshot"),bundleName:Le("string"),bundle:Le("string")};class Zc extends dS{constructor(e){super(),this.firestore=e}convertBytes(e){return new St(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Fe(this.firestore,null,t)}}function mS(n){n=hn(n,Rr);const e=hn(n.firestore,is),t=qc(e),r=new Zc(e);return bg(n._query),Yb(t,n._query).then((s=>new mr(e,r,n,s)))}function Cg(n,e,t){n=hn(n,Fe);const r=hn(n.firestore,is),s=Rg(n.converter,e,t);return Pg(r,[vg(Gc(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Gt.none())])}function gS(n,e){const t=hn(n.firestore,is),r=ss(n),s=Rg(n.converter,e);return Pg(t,[vg(Gc(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Gt.exists(!1))]).then((()=>r))}function Ks(n,...e){n=It(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Qf(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Qf(e[r])){const c=e[r];e[r]=c.next?.bind(c),e[r+1]=c.error?.bind(c),e[r+2]=c.complete?.bind(c)}let i,a,l;if(n instanceof Fe)a=hn(n.firestore,is),l=bc(n._key.path),i={next:c=>{e[r]&&e[r](_S(a,n,c))},error:e[r+1],complete:e[r+2]};else{const c=hn(n,Rr);a=hn(c.firestore,is),l=c._query;const h=new Zc(a);i={next:d=>{e[r]&&e[r](new mr(a,h,c,d))},error:e[r+1],complete:e[r+2]},bg(n._query)}return(function(h,d,m,_){const w=new pg(_),P=new ig(d,w,m);return h.asyncQueue.enqueueAndForget((async()=>rg(await jl(h),P))),()=>{w.Nu(),h.asyncQueue.enqueueAndForget((async()=>sg(await jl(h),P)))}})(qc(a),l,s,i)}function Pg(n,e){return(function(r,s){const i=new jn;return r.asyncQueue.enqueueAndForget((async()=>Bb(await Xb(r),s,i))),i.promise})(qc(n),e)}function _S(n,e,t){const r=t.docs.get(e._key),s=new Zc(n);return new pr(n,s,e._key,r,new Os(t.hasPendingWrites,t.fromCache),e.converter)}function ql(){return new Kc("serverTimestamp")}(function(e,t=!0){(function(s){cs=s})(as),Xr(new _r("firestore",((r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new is(new ow(r.getProvider("auth-internal")),new cw(a,r.getProvider("app-check-internal")),(function(h,d){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new G(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new si(h.options.projectId,d)})(a,s),a);return i={useFetchStreams:t,...i},l._setSettings(i),l}),"PUBLIC").setMultipleInstances(!0)),Un(Yh,Zh,e),Un(Yh,Zh,"esm2020")})();const yS={apiKey:"AIzaSyBewBUk6Oj4PjB6rVr8iVfZ6Zcyqm7CbXs",authDomain:"uno-game-e3329.firebaseapp.com",projectId:"uno-game-e3329",storageBucket:"uno-game-e3329.appspot.com",messagingSenderId:"793495202186",appId:"1:793495202186:web:705f97f5e200bf41120073",measurementId:"G-6PuJ7DGC39"},kg=dp(yS),Tr=nw(kg),fn=eS(kg);async function _a(){Tr.currentUser||await BT(Tr)}async function vS(n){await _a();const e=Tr.currentUser.uid,t=Math.random().toString(36).slice(2,8).toUpperCase(),r=await gS(ma(fn,"rooms"),{code:t,hostUid:e,status:"lobby",createdAt:ql()});return await Cg(ss(fn,"rooms",r.id,"players",e),{displayName:n,joinedAt:ql(),isReady:!1,isHost:!0,handCount:0}),{roomId:r.id,code:t}}async function ES(n,e){await _a();const t=Tr.currentUser.uid,r=hS(ma(fn,"rooms"),fS("code","==",n)),s=await mS(r);if(s.empty)throw new Error("Room not found");const i=s.docs[0].id;return await Cg(ss(fn,"rooms",i,"players",t),{displayName:e,joinedAt:ql(),isReady:!1,isHost:!1,handCount:0},{merge:!0}),{roomId:i}}function TS(n,e,t){const r=Ks(ss(fn,"rooms",n),i=>e({id:i.id,...i.data()})),s=Ks(ma(fn,"rooms",n,"players"),i=>t(i.docs.map(a=>({id:a.id,...a.data()}))));return()=>{r(),s()}}const IS={class:"p-3 rounded border border-slate-300 mb-4"},wS={class:"mb-2"},AS={class:"flex gap-2"},bS={key:0,class:"mt-3 text-sm"},SS={class:"list-disc ml-6"},RS=zo({__name:"Lobby",emits:["enter-room"],setup(n,{emit:e}){const t=e,r=Et("Player"),s=Et(null),i=Et(""),a=Et(null),l=Et([]);let c=null;sc(async()=>{await _a()}),Go(()=>{c&&c()});function h(_){c&&c(),c=TS(_,w=>a.value=w,w=>l.value=w)}async function d(){const{roomId:_,code:w}=await vS(r.value||"Player");s.value=_,h(_),t("enter-room",{id:_,host:!0}),console.log("Invite code:",w)}async function m(){const _=i.value.trim();if(!_)return;const{roomId:w}=await ES(_.toUpperCase(),r.value||"Player");s.value=w,h(w),t("enter-room",{id:w,host:!1})}return(_,w)=>(fe(),ye("div",IS,[Z("div",wS,[w[2]||(w[2]=Z("label",{class:"block text-sm mb-1"},"Display name",-1)),Qu(Z("input",{"onUpdate:modelValue":w[0]||(w[0]=P=>r.value=P),class:"border px-2 py-1 rounded w-full"},null,512),[[Th,r.value]])]),Z("div",AS,[Z("button",{onClick:d,class:"px-3 py-2 rounded bg-emerald-600 text-white"},"Create room"),Qu(Z("input",{"onUpdate:modelValue":w[1]||(w[1]=P=>i.value=P),placeholder:"Enter code",class:"border px-2 py-1 rounded"},null,512),[[Th,i.value]]),Z("button",{onClick:m,class:"px-3 py-2 rounded bg-blue-600 text-white"},"Join")]),a.value?(fe(),ye("div",bS,[Z("div",null,[w[3]||(w[3]=Z("b",null,"Room",-1)),Vt(" "+Ne(s.value),1)]),Z("div",null,[w[4]||(w[4]=Z("b",null,"Code",-1)),Vt(" "+Ne(a.value.code),1)]),Z("div",null,[w[5]||(w[5]=Z("b",null,"Status",-1)),Vt(" "+Ne(a.value.status),1)]),w[6]||(w[6]=Z("div",{class:"mt-1"},[Z("b",null,"Players")],-1)),Z("ul",SS,[(fe(!0),ye(ft,null,Qi(l.value,P=>(fe(),ye("li",{key:P.id},Ne(P.displayName)+Ne(P.isHost?" (host)":""),1))),128))])])):sn("",!0)]))}}),CS=["title"],PS=["src","alt"],kS={key:1,class:"w-full h-full flex items-center justify-center text-xs px-1"},sl=zo({__name:"CardView",props:{card:{},onPlay:{},size:{default:"md"}},setup(n){const e=n,t=Et(!1);function r(c){return c.kind==="number"?`${c.color}_${c.value}.png`:c.kind==="action"?`${c.color}_${c.action}.png`:c.action==="wildDraw4"?"wildDraw4.png":"wild.png"}function s(c){return c.kind==="number"?`${c.color} ${c.value}`:c.kind==="action"?`${c.color} ${c.action}`:c.action==="wildDraw4"?"+4":"wild"}const i=pt(()=>`/UNO-WEB3/cards/${r(e.card)}`),a=pt(()=>e.size==="lg"?{w:96,h:144}:e.size==="sm"?{w:48,h:72}:{w:64,h:96});function l(){e.onPlay?.(e.card)}return(c,h)=>(fe(),ye("div",{title:JSON.stringify(n.card),class:"m-1 p-0 rounded-lg border border-slate-400 overflow-hidden bg-white hover:shadow transition",style:On({width:`${a.value.w}px`,height:`${a.value.h}px`,cursor:n.onPlay?"pointer":"inherit"}),onClick:l},[t.value?(fe(),ye("div",kS,Ne(s(n.card)),1)):(fe(),ye("img",{key:0,src:i.value,alt:s(n.card),class:"w-full h-full object-contain",onError:h[0]||(h[0]=d=>t.value=!0),style:{"pointer-events":"none"}},null,40,PS))],12,CS))}}),VS="https://uno-graphql-web-3.vercel.app/api/graphql";async function ya(n,e){await _a();const t=await Tr.currentUser?.getIdToken(),r=await fetch(VS,{method:"POST",headers:{"content-type":"application/json",...t?{authorization:`Bearer ${t}`}:{}},body:JSON.stringify({query:n,variables:e})});if(!r.ok){const i=await r.text().catch(()=>"");throw new Error(`GraphQL HTTP ${r.status} ${r.statusText} ${i}`)}const s=await r.json();if(s.errors?.length)throw new Error(s.errors[0]?.message??"GraphQL error");return s.data}function DS(n,e){const t=Ks(ss(fn,"rooms",n),a=>e.onRoom({id:a.id,...a.data()})),r=Ks(ma(fn,"rooms",n,"players"),a=>e.onPlayers(a.docs.map(l=>({id:l.id,...l.data()})))),s=Tr.currentUser?.uid,i=s?Ks(ss(fn,"rooms",n,"hands",s),a=>e.onMyHand(a.data()?.cards??[])):()=>{};return()=>{t(),r(),i()}}async function Yf(n){await ya("mutation ($roomId: ID!) { startGame(roomId: $roomId) }",{roomId:n})}async function Zf(n,e){await ya("mutation ($roomId: ID!, $card: JSON!) { playCard(roomId: $roomId, card: $card) }",{roomId:n,card:e})}async function NS(n){await ya("mutation ($roomId: ID!) { drawOne(roomId: $roomId) }",{roomId:n})}async function OS(n){await ya("mutation ($roomId: ID!) { endTurn(roomId: $roomId) }",{roomId:n})}function ed(n,e){if(e.kind==="wild")return!0;if(n.kind==="wild"){const t=n.chosenColor;return t?e.color===t:!0}return e.kind==="number"&&n.kind==="number"?e.color===n.color||e.value===n.value:e.kind==="action"&&n.kind==="action"?e.color===n.color||e.action===n.action:e.color===n.color}const xS={key:0,style:{"font-family":"system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",padding:"1rem","max-width":"1200px",margin:"0 auto"}},MS={style:{margin:".5rem 0",display:"flex",gap:"1rem","align-items":"center","flex-wrap":"wrap"}},LS={style:{display:"flex","align-items":"center",gap:"0.5rem"}},FS={style:{background:"#f3f4f6",padding:"0.25rem 0.5rem","border-radius":"4px"}},US={key:0,style:{margin:"1rem 0"}},BS=["disabled","title"],$S={key:1,style:{color:"#6b7280"}},jS={style:{background:"#2a2a2a",color:"#fff",padding:"1rem","border-radius":"8px","margin-bottom":"1rem"}},qS={style:{position:"relative",display:"inline-block"}},HS={style:{"margin-top":".5rem","font-size":".9rem"}},zS={key:0},WS={key:0,style:{background:"#f0f9ff",padding:"1rem","border-radius":"8px","margin-bottom":"1rem",border:"2px solid #3b82f6"}},GS={key:0,style:{"margin-bottom":"1rem",padding:"1rem",background:"white","border-radius":"8px",border:"2px solid #3b82f6"}},KS={style:{display:"flex",gap:"1rem"}},QS={key:1,style:{display:"flex",gap:".5rem","flex-wrap":"wrap","margin-bottom":".75rem"}},JS=["onClick"],XS={style:{display:"flex",gap:".5rem","align-items":"center"}},YS=["disabled","title"],ZS=["title"],eR={key:1,style:{background:"#f7f7f8",padding:"1rem","border-radius":"8px","margin-bottom":"1rem"}},tR={style:{margin:"0 0 .5rem 0"}},nR={style:{display:"flex",gap:".5rem","flex-wrap":"wrap"}},rR={style:{background:"#f7f7f8",padding:"1rem","border-radius":"8px","margin-bottom":"1rem"}},sR={style:{display:"flex",gap:"1rem","flex-wrap":"wrap"}},iR={key:2,style:{"margin-top":"1rem",padding:"1.5rem","border-radius":"12px",border:"2px solid #10b981",background:"#f0fdf4"}},oR={style:{"font-size":"1.2rem",color:"#4ade80",margin:"0 0 .5rem 0"}},aR={key:1,style:{color:"#6b7280"}},lR={key:1,style:{padding:"2rem","text-align":"center",color:"#6b7280"}},cR=zo({__name:"OnlineBoard",props:{roomId:{},isHost:{type:Boolean}},setup(n){const e=Et(null),t=Et([]),r=Et([]),s=Et(null),i=Et(!1);let a=null;sc(()=>{a=DS(n.roomId,{onRoom:g=>{const y=e.value?.currentTurn===c.value,I=g?.currentTurn===c.value;!y&&I&&(i.value=!1),e.value=g},onPlayers:g=>t.value=g,onMyHand:g=>r.value=g})}),Go(()=>{a&&a()});const l=pt(()=>e.value?.topCard??null),c=pt(()=>Tr.currentUser?.uid??null),h=pt(()=>e.value?.currentTurn===c.value&&e.value?.status==="playing"),d=pt(()=>{const g=e.value?.currentTurn;return g?t.value.find(I=>I.id===g)?.displayName??g:"—"}),m=pt(()=>n.isHost||e.value?.hostUid===c.value||t.value.length>0&&t.value[0]?.id===c.value),_=pt(()=>e.value?.pendingType??null),w=pt(()=>e.value?.chainPlayer===c.value&&e.value?.chainValue!==null),P=pt(()=>l.value?_.value?_.value==="draw2"?r.value.some(g=>g.kind==="action"&&g.action==="draw2"):_.value==="draw4"?r.value.some(g=>g.kind==="wild"&&g.action==="wildDraw4"):!1:w.value?r.value.some(g=>g.kind==="number"&&g.value===e.value?.chainValue):r.value.some(g=>g.kind==="wild"||ed(l.value,g)):!1),F=pt(()=>{const g=e.value?.winnerUid;return g?t.value.find(y=>y.id===g)?.displayName??g:null}),M=pt(()=>{const g=l.value;return g&&g.kind==="wild"?g.chosenColor??null:null});async function H(g){const y=s.value;if(!y)return;const I={...y.card,chosenColor:g};try{await Zf(n.roomId,I)}catch(S){alert(S?.message??String(S))}finally{s.value=null}}function Q(g){return _.value==="draw2"?g.kind==="action"&&g.action==="draw2":_.value==="draw4"?g.kind==="wild"&&g.action==="wildDraw4":!1}const z=pt(()=>e.value?.pendingDraw?{n:e.value.pendingDraw,type:e.value.pendingType}:null);function K(g){return h.value?_.value?Q(g):w.value?g.kind==="number"&&g.value===e.value?.chainValue:!!l.value&&ed(l.value,g):!1}async function me(g,y){if(!K(g))return;const I=g;if(g.kind==="wild"&&!I.chosenColor){s.value={index:y,card:g};return}try{await Zf(n.roomId,g)}catch(S){alert(S?.message??String(S))}}async function we(){try{await NS(n.roomId),i.value=!0}catch(g){alert(g?.message??String(g))}}async function b(){try{await OS(n.roomId),i.value=!1}catch(g){alert(g?.message??String(g))}}async function v(){try{e.value?.code&&await navigator.clipboard.writeText(e.value.code)}catch{}}return(g,y)=>e.value?(fe(),ye("div",xS,[y[20]||(y[20]=Z("h1",null,"UNO (Online)",-1)),Z("div",MS,[Z("div",null,[y[7]||(y[7]=Z("b",null,"Room:",-1)),Vt(" "+Ne(n.roomId),1)]),Z("div",LS,[y[8]||(y[8]=Z("b",null,"Code:",-1)),y[9]||(y[9]=Vt()),Z("code",FS,Ne(e.value.code??"—"),1),e.value.code?(fe(),ye("button",{key:0,onClick:v,style:{padding:".25rem .75rem",border:"1px solid #d1d5db","border-radius":"4px",background:"white",cursor:"pointer"}}," Copy ")):sn("",!0)]),Z("div",null,[y[10]||(y[10]=Z("b",null,"Status:",-1)),Vt(" "+Ne(e.value.status),1)])]),e.value.status==="lobby"||e.value.status==="finished"?(fe(),ye("div",US,[m.value?(fe(),ye("button",{key:0,onClick:y[0]||(y[0]=I=>uo(Yf)(n.roomId)),disabled:t.value.length<2,style:On([{padding:".5rem 1rem",background:"#10b981",color:"white",border:"none","border-radius":"4px","font-weight":"bold",cursor:"pointer"},{opacity:t.value.length<2?"0.5":"1",cursor:t.value.length<2?"not-allowed":"pointer"}]),title:t.value.length<2?"Need at least 2 players":"Start game"}," Start game ",12,BS)):(fe(),ye("div",$S,"Waiting for host to start…"))])):sn("",!0),e.value.status==="playing"?(fe(),ye(ft,{key:1},[Z("div",jS,[y[13]||(y[13]=Z("h3",{style:{margin:"0 0 .5rem 0"}},"Top Card",-1)),Z("div",qS,[l.value?(fe(),_o(sl,{key:0,card:l.value,size:"lg"},null,8,["card"])):sn("",!0),M.value?(fe(),ye("div",{key:1,style:On({position:"absolute",bottom:"10px",left:"50%",transform:"translateX(-50%)",background:M.value==="red"?"#ef4444":M.value==="yellow"?"#fbbf24":M.value==="green"?"#22c55e":"#3b82f6",color:M.value==="yellow"?"#000":"#fff",padding:"4px 12px",borderRadius:"12px",fontWeight:"bold",fontSize:"0.85rem",boxShadow:"0 2px 4px rgba(0,0,0,0.3)",border:"2px solid white"})},Ne(M.value.toUpperCase()),5)):sn("",!0)]),Z("p",HS,[y[11]||(y[11]=Vt(" Current: ",-1)),Z("strong",null,Ne(h.value?"You":d.value),1),y[12]||(y[12]=Vt(" | Direction: ",-1)),Z("strong",null,Ne(e.value.direction===1?"→":"←"),1),z.value?(fe(),ye("span",zS," | Pending: +"+Ne(z.value.n)+" ("+Ne(z.value.type)+")",1)):sn("",!0)])]),h.value?(fe(),ye("div",WS,[y[15]||(y[15]=Z("h3",{style:{margin:"0 0 .5rem 0",color:"#1e40af"}},"Your Turn!",-1)),y[16]||(y[16]=Z("p",{style:{"margin-bottom":".5rem","font-size":".9rem"}},"Click a card to play it, or draw a card:",-1)),s.value?(fe(),ye("div",GS,[y[14]||(y[14]=Z("h3",{style:{margin:"0 0 .75rem 0"}},"Choose a color:",-1)),Z("div",KS,[Z("button",{onClick:y[1]||(y[1]=I=>H("red")),style:{width:"80px",height:"80px",background:"#ef4444",border:"none","border-radius":"8px",cursor:"pointer","font-weight":"bold",color:"#fff"}},"Red"),Z("button",{onClick:y[2]||(y[2]=I=>H("yellow")),style:{width:"80px",height:"80px",background:"#fbbf24",border:"none","border-radius":"8px",cursor:"pointer","font-weight":"bold",color:"#000"}},"Yellow"),Z("button",{onClick:y[3]||(y[3]=I=>H("green")),style:{width:"80px",height:"80px",background:"#22c55e",border:"none","border-radius":"8px",cursor:"pointer","font-weight":"bold",color:"#fff"}},"Green"),Z("button",{onClick:y[4]||(y[4]=I=>H("blue")),style:{width:"80px",height:"80px",background:"#3b82f6",border:"none","border-radius":"8px",cursor:"pointer","font-weight":"bold",color:"#fff"}},"Blue"),Z("button",{onClick:y[5]||(y[5]=I=>s.value=null),style:{width:"80px",height:"80px",background:"#6b7280",border:"none","border-radius":"8px",cursor:"pointer","font-weight":"bold",color:"#fff"}},"Cancel")])])):(fe(),ye("div",QS,[(fe(!0),ye(ft,null,Qi(r.value,(I,S)=>(fe(),ye("div",{key:S,onClick:T=>me(I,S),class:jo(["card-wrapper",{disabled:!K(I)}])},[Mt(sl,{card:I,size:"md"},null,8,["card"])],10,JS))),128))])),Z("div",XS,[Z("button",{onClick:we,disabled:!h.value||P.value&&!z.value||i.value,style:On({padding:".5rem 1rem",background:z.value?"#dc2626":"#3b82f6",color:"#fff",border:"none",borderRadius:"4px",cursor:h.value&&(!P.value||z.value)&&!i.value?"pointer":"not-allowed",fontWeight:"bold",opacity:h.value&&(!P.value||z.value)&&!i.value?"1":"0.5"}),title:i.value?"Already drew this turn":P.value&&!z.value?"You must play a card":""},Ne(z.value?`Draw +${z.value.n}`:"Draw Card"),13,YS),(w.value||i.value&&!P.value)&&!z.value?(fe(),ye("button",{key:0,onClick:b,style:{padding:".5rem 1rem",background:"#f59e0b",color:"#fff",border:"none","border-radius":"4px",cursor:"pointer","font-weight":"bold"},title:w.value?"End number chain":"End your turn (no playable cards)"}," End Turn ",8,ZS)):sn("",!0)])])):(fe(),ye("div",eR,[Z("h3",tR,"Your Hand ("+Ne(r.value.length)+")",1),Z("div",nR,[(fe(!0),ye(ft,null,Qi(r.value,(I,S)=>(fe(),ye("div",{key:S,class:"card-wrapper disabled"},[Mt(sl,{card:I,size:"md"},null,8,["card"])]))),128))])])),Z("div",rR,[y[17]||(y[17]=Z("h3",{style:{margin:"0 0 .5rem 0"}},"Players",-1)),Z("div",sR,[(fe(!0),ye(ft,null,Qi(t.value,I=>(fe(),ye("div",{key:I.id,style:On({padding:".5rem 1rem",borderRadius:"6px",background:I.id===e.value.currentTurn?"#fef3c7":"#fff",border:I.id===e.value.currentTurn?"2px solid #f59e0b":"1px solid #e5e7eb",fontWeight:I.id===e.value.currentTurn?"bold":"normal"})},Ne(I.displayName)+" — "+Ne(I.handCount)+" card"+Ne(I.handCount===1?"":"s"),5))),128))])])],64)):sn("",!0),e.value.status==="finished"?(fe(),ye("div",iR,[Z("p",oR,[y[18]||(y[18]=Vt(" 🎉 ",-1)),Z("strong",null,Ne(F.value??"A player"),1),y[19]||(y[19]=Vt(" wins! ",-1))]),m.value?(fe(),ye("button",{key:0,onClick:y[6]||(y[6]=I=>uo(Yf)(n.roomId)),style:{padding:".5rem 1rem",background:"#10b981",color:"white",border:"none","border-radius":"4px",cursor:"pointer","font-weight":"bold"}}," Start New Game ")):(fe(),ye("div",aR,"Waiting for host to start a new game…"))])):sn("",!0)])):(fe(),ye("div",lR,"Loading room…"))}}),uR=(n,e)=>{const t=n.__vccOpts||n;for(const[r,s]of e)t[r]=s;return t},hR=uR(cR,[["__scopeId","data-v-fbcd8705"]]),fR={style:{position:"fixed",top:"0",left:"0",background:"rgba(255,255,0,0.8)",padding:"2px 6px","font-size":"10px","z-index":"9999"}},dR=zo({__name:"App",setup(n){const e="2025-11-17T22:21:36.753Z",t=Et(null),r=Et(!1);function s(i){t.value=i.id,r.value=i.host}return(i,a)=>(fe(),ye(ft,null,[Z("div",fR," Build: "+Ne(uo(e)),1),t.value?(fe(),_o(hR,{key:1,roomId:t.value,isHost:r.value},null,8,["roomId","isHost"])):(fe(),_o(RS,{key:0,onEnterRoom:s}))],64))}});_v(dR).mount("#app");

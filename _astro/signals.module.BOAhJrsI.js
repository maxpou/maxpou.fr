import{k as q,l as U,t as G}from"./preact.module.BQoSJtqD.js";import{q as k}from"./hooks.module.Cva-zYTs.js";var J=Symbol.for("preact-signals");function $(){if(h>1)h--;else{for(var t,i=!1;d!==void 0;){var o=d;for(d=void 0,w++;o!==void 0;){var n=o.o;if(o.o=void 0,o.f&=-3,!(8&o.f)&&O(o))try{o.c()}catch(e){i||(t=e,i=!0)}o=n}}if(w=0,h--,i)throw t}}var f=void 0,d=void 0,h=0,w=0,y=0;function E(t){if(f!==void 0){var i=t.n;if(i===void 0||i.t!==f)return i={i:0,S:t,p:f.s,n:void 0,t:f,e:void 0,x:void 0,r:i},f.s!==void 0&&(f.s.n=i),f.s=i,t.n=i,32&f.f&&t.S(i),i;if(i.i===-1)return i.i=0,i.n!==void 0&&(i.n.p=i.p,i.p!==void 0&&(i.p.n=i.n),i.p=f.s,i.n=void 0,f.s.n=i,f.s=i),i}}function v(t){this.v=t,this.i=0,this.n=void 0,this.t=void 0}v.prototype.brand=J;v.prototype.h=function(){return!0};v.prototype.S=function(t){this.t!==t&&t.e===void 0&&(t.x=this.t,this.t!==void 0&&(this.t.e=t),this.t=t)};v.prototype.U=function(t){if(this.t!==void 0){var i=t.e,o=t.x;i!==void 0&&(i.x=o,t.e=void 0),o!==void 0&&(o.e=i,t.x=void 0),t===this.t&&(this.t=o)}};v.prototype.subscribe=function(t){var i=this;return x(function(){var o=i.value,n=f;f=void 0;try{t(o)}finally{f=n}})};v.prototype.valueOf=function(){return this.value};v.prototype.toString=function(){return this.value+""};v.prototype.toJSON=function(){return this.value};v.prototype.peek=function(){var t=f;f=void 0;try{return this.value}finally{f=t}};Object.defineProperty(v.prototype,"value",{get:function(){var t=E(this);return t!==void 0&&(t.i=this.i),this.v},set:function(t){if(t!==this.v){if(w>100)throw new Error("Cycle detected");this.v=t,this.i++,y++,h++;try{for(var i=this.t;i!==void 0;i=i.x)i.t.N()}finally{$()}}}});function N(t){return new v(t)}function O(t){for(var i=t.s;i!==void 0;i=i.n)if(i.S.i!==i.i||!i.S.h()||i.S.i!==i.i)return!0;return!1}function C(t){for(var i=t.s;i!==void 0;i=i.n){var o=i.S.n;if(o!==void 0&&(i.r=o),i.S.n=i,i.i=-1,i.n===void 0){t.s=i;break}}}function j(t){for(var i=t.s,o=void 0;i!==void 0;){var n=i.p;i.i===-1?(i.S.U(i),n!==void 0&&(n.n=i.n),i.n!==void 0&&(i.n.p=n)):o=i,i.S.n=i.r,i.r!==void 0&&(i.r=void 0),i=n}t.s=o}function a(t){v.call(this,void 0),this.x=t,this.s=void 0,this.g=y-1,this.f=4}(a.prototype=new v).h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===y))return!0;if(this.g=y,this.f|=1,this.i>0&&!O(this))return this.f&=-2,!0;var t=f;try{C(this),f=this;var i=this.x();(16&this.f||this.v!==i||this.i===0)&&(this.v=i,this.f&=-17,this.i++)}catch(o){this.v=o,this.f|=16,this.i++}return f=t,j(this),this.f&=-2,!0};a.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(var i=this.s;i!==void 0;i=i.n)i.S.S(i)}v.prototype.S.call(this,t)};a.prototype.U=function(t){if(this.t!==void 0&&(v.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(var i=this.s;i!==void 0;i=i.n)i.S.U(i)}};a.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var t=this.t;t!==void 0;t=t.x)t.t.N()}};Object.defineProperty(a.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var t=E(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}});function T(t){return new a(t)}function P(t){var i=t.u;if(t.u=void 0,typeof i=="function"){h++;var o=f;f=void 0;try{i()}catch(n){throw t.f&=-2,t.f|=8,g(t),n}finally{f=o,$()}}}function g(t){for(var i=t.s;i!==void 0;i=i.n)i.S.U(i);t.x=void 0,t.s=void 0,P(t)}function V(t){if(f!==this)throw new Error("Out-of-order effect");j(this),f=t,this.f&=-2,8&this.f&&g(this),$()}function p(t){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32}p.prototype.c=function(){var t=this.S();try{if(8&this.f||this.x===void 0)return;var i=this.x();typeof i=="function"&&(this.u=i)}finally{t()}};p.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,P(this),C(this),h++;var t=f;return f=this,V.bind(this,t)};p.prototype.N=function(){2&this.f||(this.f|=2,this.o=d,d=this)};p.prototype.d=function(){this.f|=8,1&this.f||g(this)};function x(t){var i=new p(t);try{i.c()}catch(o){throw i.d(),o}return i.d.bind(i)}var b;function c(t,i){U[t]=i.bind(null,U[t]||function(){})}function S(t){b&&b(),b=t&&t.S()}function A(t){var i=this,o=t.data,n=B(o);n.value=o;var e=k(function(){for(var r=i.__v;r=r.__;)if(r.__c){r.__c.__$f|=4;break}return i.__$u.c=function(){var s;!G(e.peek())&&((s=i.base)==null?void 0:s.nodeType)===3?i.base.data=e.peek():(i.__$f|=1,i.setState({}))},T(function(){var s=n.value.value;return s===0?0:s===!0?"":s||""})},[]);return e.value}A.displayName="_st";Object.defineProperties(v.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:A},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}});c("__b",function(t,i){if(typeof i.type=="string"){var o,n=i.props;for(var e in n)if(e!=="children"){var r=n[e];r instanceof v&&(o||(i.__np=o={}),o[e]=r,n[e]=r.peek())}}t(i)});c("__r",function(t,i){S();var o,n=i.__c;n&&(n.__$f&=-2,(o=n.__$u)===void 0&&(n.__$u=o=function(e){var r;return x(function(){r=this}),r.c=function(){n.__$f|=1,n.setState({})},r}())),S(o),t(i)});c("__e",function(t,i,o,n){S(),t(i,o,n)});c("diffed",function(t,i){S();var o;if(typeof i.type=="string"&&(o=i.__e)){var n=i.__np,e=i.props;if(n){var r=o.U;if(r)for(var s in r){var u=r[s];u!==void 0&&!(s in n)&&(u.d(),r[s]=void 0)}else o.U=r={};for(var l in n){var _=r[l],m=n[l];_===void 0?(_=z(o,l,m,e),r[l]=_):_.o(m,e)}}}t(i)});function z(t,i,o,n){var e=i in t&&t.ownerSVGElement===void 0,r=N(o);return{o:function(s,u){r.value=s,n=u},d:x(function(){var s=r.value.value;n[i]!==s&&(n[i]=s,e?t[i]=s:s?t.setAttribute(i,s):t.removeAttribute(i))})}}c("unmount",function(t,i){if(typeof i.type=="string"){var o=i.__e;if(o){var n=o.U;if(n){o.U=void 0;for(var e in n){var r=n[e];r&&r.d()}}}}else{var s=i.__c;if(s){var u=s.__$u;u&&(s.__$u=void 0,u.d())}}t(i)});c("__h",function(t,i,o,n){(n<3||n===9)&&(i.__$f|=2),t(i,o,n)});q.prototype.shouldComponentUpdate=function(t,i){var o=this.__$u;if(!(o&&o.s!==void 0||4&this.__$f)||3&this.__$f)return!0;for(var n in i)return!0;for(var e in t)if(e!=="__source"&&t[e]!==this.props[e])return!0;for(var r in this.props)if(!(r in t))return!0;return!1};function B(t){return k(function(){return N(t)},[])}export{v as Signal,T as computed,x as effect,N as signal,B as useSignal};

import{x as s,l as u,g as h,k as m,L as v}from"./preact.module.Mkwte9Fu.js";import{h as U,y as $}from"./hooks.module.BHIroJ_g.js";function g(e,o){for(var t in e)if(t!=="__source"&&!(t in o))return!0;for(var r in o)if(r!=="__source"&&e[r]!==o[r])return!0;return!1}function y(e,o){this.props=e,this.context=o}(y.prototype=new s).isPureReactComponent=!0,y.prototype.shouldComponentUpdate=function(e,o){return g(this.props,e)||g(this.state,o)};var b=u.__b;u.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),b&&b(e)};var R=u.__e;u.__e=function(e,o,t,r){if(e.then){for(var n,_=o;_=_.__;)if((n=_.__c)&&n.__c)return o.__e==null&&(o.__e=t.__e,o.__k=t.__k),n.__c(e,o)}R(e,o,t,r)};var k=u.unmount;function E(e,o,t){return e&&(e.__c&&e.__c.__H&&(e.__c.__H.__.forEach(function(r){typeof r.__c=="function"&&r.__c()}),e.__c.__H=null),(e=function(r,n){for(var _ in n)r[_]=n[_];return r}({},e)).__c!=null&&(e.__c.__P===t&&(e.__c.__P=o),e.__c=null),e.__k=e.__k&&e.__k.map(function(r){return E(r,o,t)})),e}function x(e,o,t){return e&&t&&(e.__v=null,e.__k=e.__k&&e.__k.map(function(r){return x(r,o,t)}),e.__c&&e.__c.__P===o&&(e.__e&&t.appendChild(e.__e),e.__c.__e=!0,e.__c.__P=t)),e}function d(){this.__u=0,this.o=null,this.__b=null}function N(e){var o=e.__.__c;return o&&o.__a&&o.__a(e)}function f(){this.i=null,this.l=null}u.unmount=function(e){var o=e.__c;o&&o.__R&&o.__R(),o&&32&e.__u&&(e.type=null),k&&k(e)},(d.prototype=new s).__c=function(e,o){var t=o.__c,r=this;r.o==null&&(r.o=[]),r.o.push(t);var n=N(r.__v),_=!1,l=function(){_||(_=!0,t.__R=null,n?n(i):i())};t.__R=l;var i=function(){if(!--r.__u){if(r.state.__a){var a=r.state.__a;r.__v.__k[0]=x(a,a.__c.__P,a.__c.__O)}var c;for(r.setState({__a:r.__b=null});c=r.o.pop();)c.forceUpdate()}};r.__u++||32&o.__u||r.setState({__a:r.__b=r.__v.__k[0]}),e.then(l,l)},d.prototype.componentWillUnmount=function(){this.o=[]},d.prototype.render=function(e,o){if(this.__b){if(this.__v.__k){var t=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=E(this.__b,t,r.__O=r.__P)}this.__b=null}var n=o.__a&&h(m,null,e.fallback);return n&&(n.__u&=-33),[h(m,null,o.__a?null:e.children),n]};var w=function(e,o,t){if(++t[1]===t[0]&&e.l.delete(o),e.props.revealOrder&&(e.props.revealOrder[0]!=="t"||!e.l.size))for(t=e.i;t;){for(;t.length>3;)t.pop()();if(t[1]<t[0])break;e.i=t=t[2]}};(f.prototype=new s).__a=function(e){var o=this,t=N(o.__v),r=o.l.get(e);return r[0]++,function(n){var _=function(){o.props.revealOrder?(r.push(n),w(o,e,r)):n()};t?t(_):_()}},f.prototype.render=function(e){this.i=null,this.l=new Map;var o=v(e.children);e.revealOrder&&e.revealOrder[0]==="b"&&o.reverse();for(var t=o.length;t--;)this.l.set(o[t],this.i=[1,0,this.i]);return e.children},f.prototype.componentDidUpdate=f.prototype.componentDidMount=function(){var e=this;this.l.forEach(function(o,t){w(e,t,o)})};var A=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.element")||60103,L=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,T=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,W=/[A-Z0-9]/g,I=typeof document<"u",M=function(e){return(typeof Symbol<"u"&&typeof Symbol()=="symbol"?/fil|che|rad/:/fil|che|ra/).test(e)};s.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(e){Object.defineProperty(s.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(o){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:o})}})});var P=u.event;function V(){}function B(){return this.cancelBubble}function H(){return this.defaultPrevented}u.event=function(e){return P&&(e=P(e)),e.persist=V,e.isPropagationStopped=B,e.isDefaultPrevented=H,e.nativeEvent=e};var j={enumerable:!1,configurable:!0,get:function(){return this.class}},C=u.vnode;u.vnode=function(e){typeof e.type=="string"&&function(o){var t=o.props,r=o.type,n={},_=r.indexOf("-")===-1;for(var l in t){var i=t[l];if(!(l==="value"&&"defaultValue"in t&&i==null||I&&l==="children"&&r==="noscript"||l==="class"||l==="className")){var a=l.toLowerCase();l==="defaultValue"&&"value"in t&&t.value==null?l="value":l==="download"&&i===!0?i="":a==="translate"&&i==="no"?i=!1:a[0]==="o"&&a[1]==="n"?a==="ondoubleclick"?l="ondblclick":a!=="onchange"||r!=="input"&&r!=="textarea"||M(t.type)?a==="onfocus"?l="onfocusin":a==="onblur"?l="onfocusout":T.test(l)&&(l=a):a=l="oninput":_&&L.test(l)?l=l.replace(W,"-$&").toLowerCase():i===null&&(i=void 0),a==="oninput"&&n[l=a]&&(l="oninputCapture"),n[l]=i}}r=="select"&&n.multiple&&Array.isArray(n.value)&&(n.value=v(t.children).forEach(function(c){c.props.selected=n.value.indexOf(c.props.value)!=-1})),r=="select"&&n.defaultValue!=null&&(n.value=v(t.children).forEach(function(c){c.props.selected=n.multiple?n.defaultValue.indexOf(c.props.value)!=-1:n.defaultValue==c.props.value})),t.class&&!t.className?(n.class=t.class,Object.defineProperty(n,"className",j)):(t.className&&!t.class||t.class&&t.className)&&(n.class=n.className=t.className),o.props=n}(e),e.$$typeof=A,C&&C(e)};var S=u.__r;u.__r=function(e){S&&S(e),e.__c};var O=u.diffed;u.diffed=function(e){O&&O(e);var o=e.props,t=e.__e;t!=null&&e.type==="textarea"&&"value"in o&&o.value!==t.value&&(t.value=o.value==null?"":o.value)};const z={src:"/_astro/moon.CKir338b.svg",width:24,height:24,format:"svg",contents:{type:"Buffer",data:[60,115,118,103,10,32,32,120,109,108,110,115,61,34,104,116,116,112,58,47,47,119,119,119,46,119,51,46,111,114,103,47,50,48,48,48,47,115,118,103,34,10,32,32,119,105,100,116,104,61,34,50,52,34,10,32,32,104,101,105,103,104,116,61,34,50,52,34,10,32,32,118,105,101,119,66,111,120,61,34,48,32,48,32,50,52,32,50,52,34,10,32,32,102,105,108,108,61,34,110,111,110,101,34,10,32,32,115,116,114,111,107,101,61,34,99,117,114,114,101,110,116,67,111,108,111,114,34,10,32,32,115,116,114,111,107,101,45,119,105,100,116,104,61,34,50,34,10,32,32,115,116,114,111,107,101,45,108,105,110,101,99,97,112,61,34,114,111,117,110,100,34,10,32,32,115,116,114,111,107,101,45,108,105,110,101,106,111,105,110,61,34,114,111,117,110,100,34,10,62,10,32,32,60,109,97,115,107,32,105,100,61,34,109,97,115,107,34,62,10,32,32,32,32,60,114,101,99,116,32,120,61,34,48,34,32,121,61,34,48,34,32,119,105,100,116,104,61,34,49,48,48,37,34,32,104,101,105,103,104,116,61,34,49,48,48,37,34,32,102,105,108,108,61,34,119,104,105,116,101,34,32,47,62,32,10,32,32,32,32,60,99,105,114,99,108,101,32,99,120,61,34,49,56,34,32,99,121,61,34,54,34,32,114,61,34,57,34,32,102,105,108,108,61,34,98,108,97,99,107,34,32,47,62,10,32,32,60,47,109,97,115,107,62,10,32,32,60,99,105,114,99,108,101,32,102,105,108,108,61,34,119,104,105,116,101,34,32,115,116,114,111,107,101,61,34,119,104,105,116,101,34,32,99,120,61,34,49,50,34,32,99,121,61,34,49,50,34,32,114,61,34,57,34,32,109,97,115,107,61,34,117,114,108,40,35,109,97,115,107,41,34,32,47,62,10,60,47,115,118,103,62]}},D={src:"/_astro/sun.ChWlf1L4.svg",width:24,height:24,format:"svg",contents:{type:"Buffer",data:[60,115,118,103,10,32,32,120,109,108,110,115,61,34,104,116,116,112,58,47,47,119,119,119,46,119,51,46,111,114,103,47,50,48,48,48,47,115,118,103,34,10,32,32,119,105,100,116,104,61,34,50,52,34,10,32,32,104,101,105,103,104,116,61,34,50,52,34,10,32,32,118,105,101,119,66,111,120,61,34,48,32,48,32,50,52,32,50,52,34,10,32,32,102,105,108,108,61,34,119,104,105,116,101,34,10,32,32,115,116,114,111,107,101,61,34,119,104,105,116,101,34,10,32,32,115,116,114,111,107,101,45,119,105,100,116,104,61,34,50,34,10,32,32,115,116,114,111,107,101,45,108,105,110,101,99,97,112,61,34,114,111,117,110,100,34,10,32,32,115,116,114,111,107,101,45,108,105,110,101,106,111,105,110,61,34,114,111,117,110,100,34,10,62,10,32,32,60,99,105,114,99,108,101,32,102,105,108,108,61,34,119,104,105,116,101,34,32,99,120,61,34,49,50,34,32,99,121,61,34,49,50,34,32,114,61,34,53,34,32,47,62,10,32,32,60,103,32,115,116,114,111,107,101,61,34,119,104,105,116,101,34,62,10,32,32,32,32,32,32,60,108,105,110,101,32,120,49,61,34,49,50,34,32,121,49,61,34,49,34,32,120,50,61,34,49,50,34,32,121,50,61,34,51,34,32,47,62,10,32,32,32,32,32,32,60,108,105,110,101,32,120,49,61,34,49,50,34,32,121,49,61,34,50,49,34,32,120,50,61,34,49,50,34,32,121,50,61,34,50,51,34,32,47,62,10,32,32,32,32,32,32,60,108,105,110,101,32,120,49,61,34,52,46,50,50,34,32,121,49,61,34,52,46,50,50,34,32,120,50,61,34,53,46,54,52,34,32,121,50,61,34,53,46,54,52,34,32,47,62,10,32,32,32,32,32,32,60,108,105,110,101,32,120,49,61,34,49,56,46,51,54,34,32,121,49,61,34,49,56,46,51,54,34,32,120,50,61,34,49,57,46,55,56,34,32,121,50,61,34,49,57,46,55,56,34,32,47,62,10,32,32,32,32,32,32,60,108,105,110,101,32,120,49,61,34,49,34,32,121,49,61,34,49,50,34,32,120,50,61,34,51,34,32,121,50,61,34,49,50,34,32,47,62,10,32,32,32,32,32,32,60,108,105,110,101,32,120,49,61,34,50,49,34,32,121,49,61,34,49,50,34,32,120,50,61,34,50,51,34,32,121,50,61,34,49,50,34,32,47,62,10,32,32,32,32,32,32,60,108,105,110,101,32,120,49,61,34,52,46,50,50,34,32,121,49,61,34,49,57,46,55,56,34,32,120,50,61,34,53,46,54,52,34,32,121,50,61,34,49,56,46,51,54,34,32,47,62,10,32,32,32,32,32,32,60,108,105,110,101,32,120,49,61,34,49,56,46,51,54,34,32,121,49,61,34,53,46,54,52,34,32,120,50,61,34,49,57,46,55,56,34,32,121,50,61,34,52,46,50,50,34,32,47,62,10,32,32,32,60,47,103,62,10,60,47,115,118,103,62]}};var F=0;function p(e,o,t,r,n,_){o||(o={});var l,i,a=o;"ref"in o&&(l=o.ref,delete o.ref);var c={type:e,props:a,key:t,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--F,__i:-1,__u:0,__source:n,__self:_};if(typeof e=="function"&&(l=e.defaultProps))for(i in l)a[i]===void 0&&(a[i]=l[i]);return u.vnode&&u.vnode(c),c}function q({className:e,textOnly:o=!1}){const[t,r]=U(window.localStorage.getItem("theme")??"light"),n=()=>{const _=t==="light"?"dark":"light";r(_),typeof plausible<"u"&&plausible("darkModeClick",{props:{theme:_}})};return $(()=>{t==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),window.localStorage.setItem("theme",t)},[t]),p("button",{type:"button",className:`px-2 py-4 ${e}`,onClick:n,"aria-label":`Activate ${t==="light"?"dark":"light"} mode`,children:[o&&p("span",{children:`Toggle ${t==="light"?"dark":"light"} mode`}),t==="light"&&!o&&p("img",{src:z.src,alt:"moon",style:"filter: invert(100%) contrast(50%);",class:"hover:animate-spin"}),t==="dark"&&!o&&p("img",{src:D.src,alt:"sun",class:"hover:animate-spin"})]})}export{q as default};

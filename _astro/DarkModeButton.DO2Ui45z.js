import{k as s,l as i,g as h,w as m,T as d}from"./preact.module.BQoSJtqD.js";import{p as T,_ as $}from"./hooks.module.DMkgs7du.js";function R(e,r){for(var t in r)e[t]=r[t];return e}function g(e,r){for(var t in e)if(t!=="__source"&&!(t in r))return!0;for(var o in r)if(o!=="__source"&&e[o]!==r[o])return!0;return!1}function y(e,r){this.props=e,this.context=r}(y.prototype=new s).isPureReactComponent=!0,y.prototype.shouldComponentUpdate=function(e,r){return g(this.props,e)||g(this.state,r)};var b=i.__b;i.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),b&&b(e)};var U=i.__e;i.__e=function(e,r,t,o){if(e.then){for(var n,_=r;_=_.__;)if((n=_.__c)&&n.__c)return r.__e==null&&(r.__e=t.__e,r.__k=t.__k),n.__c(e,r)}U(e,r,t,o)};var k=i.unmount;function E(e,r,t){return e&&(e.__c&&e.__c.__H&&(e.__c.__H.__.forEach(function(o){typeof o.__c=="function"&&o.__c()}),e.__c.__H=null),(e=R({},e)).__c!=null&&(e.__c.__P===t&&(e.__c.__P=r),e.__c=null),e.__k=e.__k&&e.__k.map(function(o){return E(o,r,t)})),e}function x(e,r,t){return e&&t&&(e.__v=null,e.__k=e.__k&&e.__k.map(function(o){return x(o,r,t)}),e.__c&&e.__c.__P===r&&(e.__e&&t.appendChild(e.__e),e.__c.__e=!0,e.__c.__P=t)),e}function v(){this.__u=0,this.t=null,this.__b=null}function N(e){var r=e.__.__c;return r&&r.__a&&r.__a(e)}function f(){this.u=null,this.o=null}i.unmount=function(e){var r=e.__c;r&&r.__R&&r.__R(),r&&32&e.__u&&(e.type=null),k&&k(e)},(v.prototype=new s).__c=function(e,r){var t=r.__c,o=this;o.t==null&&(o.t=[]),o.t.push(t);var n=N(o.__v),_=!1,l=function(){_||(_=!0,t.__R=null,n?n(a):a())};t.__R=l;var a=function(){if(!--o.__u){if(o.state.__a){var u=o.state.__a;o.__v.__k[0]=x(u,u.__c.__P,u.__c.__O)}var c;for(o.setState({__a:o.__b=null});c=o.t.pop();)c.forceUpdate()}};o.__u++||32&r.__u||o.setState({__a:o.__b=o.__v.__k[0]}),e.then(l,l)},v.prototype.componentWillUnmount=function(){this.t=[]},v.prototype.render=function(e,r){if(this.__b){if(this.__v.__k){var t=document.createElement("div"),o=this.__v.__k[0].__c;this.__v.__k[0]=E(this.__b,t,o.__O=o.__P)}this.__b=null}var n=r.__a&&h(m,null,e.fallback);return n&&(n.__u&=-33),[h(m,null,r.__a?null:e.children),n]};var w=function(e,r,t){if(++t[1]===t[0]&&e.o.delete(r),e.props.revealOrder&&(e.props.revealOrder[0]!=="t"||!e.o.size))for(t=e.u;t;){for(;t.length>3;)t.pop()();if(t[1]<t[0])break;e.u=t=t[2]}};(f.prototype=new s).__a=function(e){var r=this,t=N(r.__v),o=r.o.get(e);return o[0]++,function(n){var _=function(){r.props.revealOrder?(o.push(n),w(r,e,o)):n()};t?t(_):_()}},f.prototype.render=function(e){this.u=null,this.o=new Map;var r=d(e.children);e.revealOrder&&e.revealOrder[0]==="b"&&r.reverse();for(var t=r.length;t--;)this.o.set(r[t],this.u=[1,0,this.u]);return e.children},f.prototype.componentDidUpdate=f.prototype.componentDidMount=function(){var e=this;this.o.forEach(function(r,t){w(e,t,r)})};var A=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.element")||60103,L=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,I=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,V=/[A-Z0-9]/g,W=typeof document<"u",H=function(e){return(typeof Symbol<"u"&&typeof Symbol()=="symbol"?/fil|che|rad/:/fil|che|ra/).test(e)};s.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(e){Object.defineProperty(s.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(r){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:r})}})});var P=i.event;function M(){}function D(){return this.cancelBubble}function j(){return this.defaultPrevented}i.event=function(e){return P&&(e=P(e)),e.persist=M,e.isPropagationStopped=D,e.isDefaultPrevented=j,e.nativeEvent=e};var z={enumerable:!1,configurable:!0,get:function(){return this.class}},C=i.vnode;i.vnode=function(e){typeof e.type=="string"&&function(r){var t=r.props,o=r.type,n={};for(var _ in t){var l=t[_];if(!(_==="value"&&"defaultValue"in t&&l==null||W&&_==="children"&&o==="noscript"||_==="class"||_==="className")){var a=_.toLowerCase();_==="defaultValue"&&"value"in t&&t.value==null?_="value":_==="download"&&l===!0?l="":a==="translate"&&l==="no"?l=!1:a==="ondoubleclick"?_="ondblclick":a!=="onchange"||o!=="input"&&o!=="textarea"||H(t.type)?a==="onfocus"?_="onfocusin":a==="onblur"?_="onfocusout":I.test(_)?_=a:o.indexOf("-")===-1&&L.test(_)?_=_.replace(V,"-$&").toLowerCase():l===null&&(l=void 0):a=_="oninput",a==="oninput"&&n[_=a]&&(_="oninputCapture"),n[_]=l}}o=="select"&&n.multiple&&Array.isArray(n.value)&&(n.value=d(t.children).forEach(function(u){u.props.selected=n.value.indexOf(u.props.value)!=-1})),o=="select"&&n.defaultValue!=null&&(n.value=d(t.children).forEach(function(u){u.props.selected=n.multiple?n.defaultValue.indexOf(u.props.value)!=-1:n.defaultValue==u.props.value})),t.class&&!t.className?(n.class=t.class,Object.defineProperty(n,"className",z)):(t.className&&!t.class||t.class&&t.className)&&(n.class=n.className=t.className),r.props=n}(e),e.$$typeof=A,C&&C(e)};var S=i.__r;i.__r=function(e){S&&S(e),e.__c};var O=i.diffed;i.diffed=function(e){O&&O(e);var r=e.props,t=e.__e;t!=null&&e.type==="textarea"&&"value"in r&&r.value!==t.value&&(t.value=r.value==null?"":r.value)};const B={src:"/_astro/moon.CKir338b.svg",width:24,height:24,format:"svg"},Z={src:"/_astro/sun.ChWlf1L4.svg",width:24,height:24,format:"svg"};var F=0;function p(e,r,t,o,n,_){var l,a,u={};for(a in r)a=="ref"?l=r[a]:u[a]=r[a];var c={type:e,props:u,key:t,ref:l,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:--F,__i:-1,__u:0,__source:n,__self:_};if(typeof e=="function"&&(l=e.defaultProps))for(a in l)u[a]===void 0&&(u[a]=l[a]);return i.vnode&&i.vnode(c),c}function Q({className:e,textOnly:r=!1}){const[t,o]=T(window.localStorage.getItem("theme")??"light"),n=()=>{o(t==="light"?"dark":"light")};return $(()=>{t==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),window.localStorage.setItem("theme",t)},[t]),p("button",{type:"button",className:`px-2 py-4 ${e}`,onClick:n,"aria-label":`Activate ${t==="light"?"dark":"light"} mode`,children:[r&&p("span",{children:`Toggle ${t==="light"?"dark":"light"} mode`}),t==="light"&&!r&&p("img",{src:B.src,alt:"moon",style:"filter: invert(100%) contrast(50%);",class:"hover:animate-spin"}),t==="dark"&&!r&&p("img",{src:Z.src,alt:"sun",class:"hover:animate-spin"})]})}export{Q as default};

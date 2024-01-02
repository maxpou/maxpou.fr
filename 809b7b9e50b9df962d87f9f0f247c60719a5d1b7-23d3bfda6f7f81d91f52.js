"use strict";(self.webpackChunkmaxpou_fr=self.webpackChunkmaxpou_fr||[]).push([[6364],{3204:function(e){const t=/[\p{Lu}]/u,a=/[\p{Ll}]/u,r=/^[\p{Lu}](?![\p{Lu}])/gu,n=/([\p{Alpha}\p{N}_]|$)/u,o=/[_.\- ]+/,i=new RegExp("^"+o.source),l=new RegExp(o.source+n.source,"gu"),s=new RegExp("\\d+"+n.source,"gu"),c=(e,n)=>{if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");if(n={pascalCase:!1,preserveConsecutiveUppercase:!1,...n},0===(e=Array.isArray(e)?e.map((e=>e.trim())).filter((e=>e.length)).join("-"):e.trim()).length)return"";const o=!1===n.locale?e=>e.toLowerCase():e=>e.toLocaleLowerCase(n.locale),c=!1===n.locale?e=>e.toUpperCase():e=>e.toLocaleUpperCase(n.locale);if(1===e.length)return n.pascalCase?c(e):o(e);return e!==o(e)&&(e=((e,r,n)=>{let o=!1,i=!1,l=!1;for(let s=0;s<e.length;s++){const c=e[s];o&&t.test(c)?(e=e.slice(0,s)+"-"+e.slice(s),o=!1,l=i,i=!0,s++):i&&l&&a.test(c)?(e=e.slice(0,s-1)+"-"+e.slice(s-1),l=i,i=!1,o=!0):(o=r(c)===c&&n(c)!==c,l=i,i=n(c)===c&&r(c)!==c)}return e})(e,o,c)),e=e.replace(i,""),e=n.preserveConsecutiveUppercase?((e,t)=>(r.lastIndex=0,e.replace(r,(e=>t(e)))))(e,o):o(e),n.pascalCase&&(e=c(e.charAt(0))+e.slice(1)),((e,t)=>(l.lastIndex=0,s.lastIndex=0,e.replace(l,((e,a)=>t(a))).replace(s,(e=>t(e)))))(e,c)};e.exports=c,e.exports.default=c},8032:function(e,t,a){a.d(t,{G:function(){return q},L:function(){return h},M:function(){return x},P:function(){return k},S:function(){return M},_:function(){return l},a:function(){return i},b:function(){return u},c:function(){return c},g:function(){return m},h:function(){return s}});var r=a(7294),n=(a(3204),a(5697)),o=a.n(n);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},i.apply(this,arguments)}function l(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)t.indexOf(a=o[r])>=0||(n[a]=e[a]);return n}const s=()=>"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;const c=e=>{var t;return(e=>{var t,a;return Boolean(null==e||null==(t=e.images)||null==(a=t.fallback)?void 0:a.src)})(e)?e:(e=>Boolean(null==e?void 0:e.gatsbyImageData))(e)?e.gatsbyImageData:(e=>Boolean(null==e?void 0:e.gatsbyImage))(e)?e.gatsbyImage:null==e||null==(t=e.childImageSharp)?void 0:t.gatsbyImageData};function d(e,t,a){const r={};let n="gatsby-image-wrapper";return"fixed"===a?(r.width=e,r.height=t):"constrained"===a&&(n="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:n,"data-gatsby-image-wrapper":"",style:r}}function u(e,t,a,r,n){return void 0===n&&(n={}),i({},a,{loading:r,shouldLoad:e,"data-main-image":"",style:i({},n,{opacity:t?1:0})})}function m(e,t,a,r,n,o,l,s){const c={};o&&(c.backgroundColor=o,"fixed"===a?(c.width=r,c.height=n,c.backgroundColor=o,c.position="relative"):("constrained"===a||"fullWidth"===a)&&(c.position="absolute",c.top=0,c.left=0,c.bottom=0,c.right=0)),l&&(c.objectFit=l),s&&(c.objectPosition=s);const d=i({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:i({opacity:t?0:1,transition:"opacity 500ms linear"},c)});return d}const g=["children"],p=function(e){let{layout:t,width:a,height:n}=e;return"fullWidth"===t?r.createElement("div",{"aria-hidden":!0,style:{paddingTop:n/a*100+"%"}}):"constrained"===t?r.createElement("div",{style:{maxWidth:a,display:"block"}},r.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg%20height='"+n+"'%20width='"+a+"'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},h=function(e){let{children:t}=e,a=l(e,g);return r.createElement(r.Fragment,null,r.createElement(p,i({},a)),t,null)},f=["src","srcSet","loading","alt","shouldLoad"],y=["fallback","sources","shouldLoad"],b=function(e){let{src:t,srcSet:a,loading:n,alt:o="",shouldLoad:s}=e,c=l(e,f);return r.createElement("img",i({},c,{decoding:"async",loading:n,src:s?t:void 0,"data-src":s?void 0:t,srcSet:s?a:void 0,"data-srcset":s?void 0:a,alt:o}))},v=function(e){let{fallback:t,sources:a=[],shouldLoad:n=!0}=e,o=l(e,y);const s=o.sizes||(null==t?void 0:t.sizes),c=r.createElement(b,i({},o,t,{sizes:s,shouldLoad:n}));return a.length?r.createElement("picture",null,a.map((e=>{let{media:t,srcSet:a,type:o}=e;return r.createElement("source",{key:t+"-"+o+"-"+a,type:o,media:t,srcSet:n?a:void 0,"data-srcset":n?void 0:a,sizes:s})})),c):c};var w;b.propTypes={src:n.string.isRequired,alt:n.string.isRequired,sizes:n.string,srcSet:n.string,shouldLoad:n.bool},v.displayName="Picture",v.propTypes={alt:n.string.isRequired,shouldLoad:n.bool,fallback:n.exact({src:n.string.isRequired,srcSet:n.string,sizes:n.string}),sources:n.arrayOf(n.oneOfType([n.exact({media:n.string.isRequired,type:n.string,sizes:n.string,srcSet:n.string.isRequired}),n.exact({media:n.string,type:n.string.isRequired,sizes:n.string,srcSet:n.string.isRequired})]))};const E=["fallback"],k=function(e){let{fallback:t}=e,a=l(e,E);return t?r.createElement(v,i({},a,{fallback:{src:t},"aria-hidden":!0,alt:""})):r.createElement("div",i({},a))};k.displayName="Placeholder",k.propTypes={fallback:n.string,sources:null==(w=v.propTypes)?void 0:w.sources,alt:function(e,t,a){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+a+"`. Validation failed."):null}};const x=function(e){return r.createElement(r.Fragment,null,r.createElement(v,i({},e)),r.createElement("noscript",null,r.createElement(v,i({},e,{shouldLoad:!0}))))};x.displayName="MainImage",x.propTypes=v.propTypes;const C=["as","className","class","style","image","loading","imgClassName","imgStyle","backgroundColor","objectFit","objectPosition"],L=["style","className"],S=e=>e.replace(/\n/g,""),I=function(e,t,a){for(var r=arguments.length,n=new Array(r>3?r-3:0),i=3;i<r;i++)n[i-3]=arguments[i];return e.alt||""===e.alt?o().string.apply(o(),[e,t,a].concat(n)):new Error('The "alt" prop is required in '+a+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},N={image:o().object.isRequired,alt:I},T=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],_=["style","className"],P=new Set;let O,j;const R=function(e){let{as:t="div",image:n,style:o,backgroundColor:c,className:u,class:m,onStartLoad:g,onLoad:p,onError:h}=e,f=l(e,T);const{width:y,height:b,layout:v}=n,w=d(y,b,v),{style:E,className:k}=w,x=l(w,_),C=(0,r.useRef)(),L=(0,r.useMemo)((()=>JSON.stringify(n.images)),[n.images]);m&&(u=m);const S=function(e,t,a){let r="";return"fullWidth"===e&&(r='<div aria-hidden="true" style="padding-top: '+a/t*100+'%;"></div>'),"constrained"===e&&(r='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg%20height=\''+a+"'%20width='"+t+"'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),r}(v,y,b);return(0,r.useEffect)((()=>{O||(O=a.e(6731).then(a.bind(a,6731)).then((e=>{let{renderImageToString:t,swapPlaceholderImage:a}=e;return j=t,{renderImageToString:t,swapPlaceholderImage:a}})));const e=C.current.querySelector("[data-gatsby-image-ssr]");if(e&&s())return e.complete?(null==g||g({wasCached:!0}),null==p||p({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)):(null==g||g({wasCached:!0}),e.addEventListener("load",(function t(){e.removeEventListener("load",t),null==p||p({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)}))),void P.add(L);if(j&&P.has(L))return;let t,r;return O.then((e=>{let{renderImageToString:a,swapPlaceholderImage:l}=e;C.current&&(C.current.innerHTML=a(i({isLoading:!0,isLoaded:P.has(L),image:n},f)),P.has(L)||(t=requestAnimationFrame((()=>{C.current&&(r=l(C.current,L,P,o,g,p,h))}))))})),()=>{t&&cancelAnimationFrame(t),r&&r()}}),[n]),(0,r.useLayoutEffect)((()=>{P.has(L)&&j&&(C.current.innerHTML=j(i({isLoading:P.has(L),isLoaded:P.has(L),image:n},f)),null==g||g({wasCached:!0}),null==p||p({wasCached:!0}))}),[n]),(0,r.createElement)(t,i({},x,{style:i({},E,o,{backgroundColor:c}),className:k+(u?" "+u:""),ref:C,dangerouslySetInnerHTML:{__html:S},suppressHydrationWarning:!0}))},q=(0,r.memo)((function(e){return e.image?(0,r.createElement)(R,e):null}));q.propTypes=N,q.displayName="GatsbyImage";const z=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"];function W(e){return function(t){let{src:a,__imageData:n,__error:o}=t,s=l(t,z);return o&&console.warn(o),n?r.createElement(e,i({image:n},s)):(console.warn("Image not loaded",a),null)}}const A=W((function(e){let{as:t="div",className:a,class:n,style:o,image:s,loading:c="lazy",imgClassName:g,imgStyle:p,backgroundColor:f,objectFit:y,objectPosition:b}=e,v=l(e,C);if(!s)return console.warn("[gatsby-plugin-image] Missing image prop"),null;n&&(a=n),p=i({objectFit:y,objectPosition:b,backgroundColor:f},p);const{width:w,height:E,layout:I,images:N,placeholder:T,backgroundColor:_}=s,P=d(w,E,I),{style:O,className:j}=P,R=l(P,L),q={fallback:void 0,sources:[]};return N.fallback&&(q.fallback=i({},N.fallback,{srcSet:N.fallback.srcSet?S(N.fallback.srcSet):void 0})),N.sources&&(q.sources=N.sources.map((e=>i({},e,{srcSet:S(e.srcSet)})))),r.createElement(t,i({},R,{style:i({},O,o,{backgroundColor:f}),className:j+(a?" "+a:"")}),r.createElement(h,{layout:I,width:w,height:E},r.createElement(k,i({},m(T,!1,I,w,E,_,y,b))),r.createElement(x,i({"data-gatsby-image-ssr":"",className:g},v,u("eager"===c,!1,q,c,p)))))})),U=function(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),n=2;n<a;n++)r[n-2]=arguments[n];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?o().number.apply(o(),[e,t].concat(r)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},B=new Set(["fixed","fullWidth","constrained"]),F={src:o().string.isRequired,alt:I,width:U,height:U,sizes:o().string,layout:e=>{if(void 0!==e.layout&&!B.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}};A.displayName="StaticImage",A.propTypes=F;const M=W(q);M.displayName="StaticImage",M.propTypes=F},311:function(e,t,a){a.d(t,{Fg:function(){return s},OV:function(){return m},ZL:function(){return i},fU:function(){return d},rU:function(){return l},xv:function(){return c}});var r=a(7294),n=a(5086),o=a(1883);const i=(0,n.createGlobalStyle)(['*{box-sizing:border-box;margin:0;padding:0;transition:background 1s ease;}body{font-family:"Lato",sans-serif;color:var(--color-text);background-color:var(--color-siteBackground);}::-webkit-scrollbar{width:0.5rem;}::-webkit-scrollbar-thumb{background:linear-gradient(var(--color-lightYellow),var(--color-secondary));border-radius:8px;&:hover{background:linear-gradient(var(--color-secondary),var(--color-lightYellow));}}img{max-width:100%;height:auto;vertical-align:middle;border:0;}a{text-decoration:none;color:var(--color-text);}hr{border:0;border-top:1px solid var(--color-grey100);margin:50px 0 5px 0;}ul,ol{padding-left:2em;margin:1em 0 0 0;}*::selection{background-color:var(--color-secondary);color:var(--color-grey500);}']),l=n.default.a.withConfig({displayName:"Commons__Link",componentId:"sc-kdd33n-0"})(["box-shadow:0 2px 0 0 var(--color-secondary);&:hover{filter:brightness(150%);box-shadow:none;}"]),s=(0,n.default)(o.Link).withConfig({displayName:"Commons__StyledLink",componentId:"sc-kdd33n-1"})(["box-shadow:0 2px 0 0 var(--color-secondary);&:hover{filter:brightness(150%);box-shadow:none;}"]),c=n.default.p.withConfig({displayName:"Commons__Text",componentId:"sc-kdd33n-2"})(["line-height:1.6;margin:1em 0 0 0;"]),d=n.default.span.withConfig({displayName:"Commons__Bull",componentId:"sc-kdd33n-3"})(["display:inline-block;color:var(--color-textSecondary);margin:0 4px;&::before{content:'•';}"]),u=n.default.span.withConfig({displayName:"Commons__ReadingTimeContainer",componentId:"sc-kdd33n-4"})(["text-transform:uppercase;color:var(--color-textSecondary);"]),m=e=>r.createElement(u,null,e.min)},5536:function(e,t,a){a.d(t,{Z:function(){return s}});var r=a(7294),n=a(4593),o=a(1883),i=r.memo((e=>{let{author:t,canonicalUrl:a,datePublished:o,defaultTitle:i,description:l,image:s,isBlogPost:c,organization:d,title:u,url:m}=e;const g=[{"@context":"http://schema.org","@type":"WebSite",url:m,name:u,alternateName:i}],p=c?[].concat(g,[{"@context":"http://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,item:{"@id":m,name:u,image:s}}]},{"@context":"http://schema.org","@type":"BlogPosting",url:m,name:u,alternateName:i,headline:u,image:{"@type":"ImageObject",url:s},description:l,author:{"@type":"Person",name:t.name},publisher:{"@type":"Organization",url:d.url,logo:d.logo,name:d.name},mainEntityOfPage:{"@type":"WebSite","@id":a},datePublished:o}]):g;return r.createElement(n.q,null,r.createElement("script",{type:"application/ld+json"},JSON.stringify(p)))})),l=a(8259);var s=e=>{const{isBlogPost:t,path:a="",lang:s="en",datePublished:c}=e,{siteTitle:d,siteUrl:u,siteCover:m,siteDescription:g,seoDescription:p,twitterUsername:h,authorName:f}=(0,l.Z)(),y=e.title?e.title+" | "+d:d+" - "+g,b=u.endsWith("/")?u.substring(0,u.length-1):u,v=e.imageShare||e.cover||(0,o.withPrefix)(m),w=""+b+v,E=e.description||p,k=(e.translations||[]).filter((e=>!e.link.startsWith("http"))),x=new URL(b+(0,o.withPrefix)(a));return r.createElement(r.Fragment,null,r.createElement(n.q,{title:y},r.createElement("html",{lang:s}),r.createElement("meta",{name:"description",content:E}),r.createElement("link",{rel:"canonical",href:x.href}),k.length>0&&r.createElement("link",{rel:"alternate",hreflang:s,href:x.href}),k.map((e=>r.createElement("link",{key:"head-translation-"+e.hreflang,rel:"alternate",hreflang:e.hreflang,href:b+(0,o.withPrefix)(e.link)}))),r.createElement("meta",{property:"og:url",content:x.href}),r.createElement("meta",{property:"og:type",content:t?"article":"website"}),r.createElement("meta",{property:"og:title",content:y}),r.createElement("meta",{property:"og:description",content:E}),r.createElement("meta",{property:"og:image",content:w}),r.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),r.createElement("meta",{name:"twitter:creator",content:h}),r.createElement("meta",{name:"twitter:title",content:y}),r.createElement("meta",{name:"twitter:description",content:E}),r.createElement("meta",{name:"twitter:image",content:w}),r.createElement("link",{rel:"webmention",href:"https://webmention.io/"+x.host+"/webmention"}),r.createElement("link",{rel:"pingback",href:"https://webmention.io/"+x.host+"/xmlrpc"})),r.createElement(i,{isBlogPost:t,url:x,title:y,image:w,description:E,datePublished:c,canonicalUrl:x,author:f,organization:d,defaultTitle:y}))}},8259:function(e,t,a){var r=a(1883);t.Z=()=>(0,r.useStaticQuery)("2709979211").site.siteMetadata}}]);
//# sourceMappingURL=809b7b9e50b9df962d87f9f0f247c60719a5d1b7-23d3bfda6f7f81d91f52.js.map
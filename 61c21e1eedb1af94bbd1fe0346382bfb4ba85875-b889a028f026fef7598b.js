"use strict";(self.webpackChunkmaxpou_fr=self.webpackChunkmaxpou_fr||[]).push([[802],{3723:function(e,t,a){a.d(t,{G:function(){return N},L:function(){return f},M:function(){return E},P:function(){return w},S:function(){return R},_:function(){return s},a:function(){return o},b:function(){return A},c:function(){return c},g:function(){return d},h:function(){return l}});var r=a(7294),n=(a(2369),a(5697)),i=a.n(n);function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},o.apply(this,arguments)}function s(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)t.indexOf(a=i[r])>=0||(n[a]=e[a]);return n}var l=function(){return"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype};var c=function(e){var t;return function(e){var t,a;return Boolean(null==e||null==(t=e.images)||null==(a=t.fallback)?void 0:a.src)}(e)?e:function(e){return Boolean(null==e?void 0:e.gatsbyImageData)}(e)?e.gatsbyImageData:function(e){return Boolean(null==e?void 0:e.gatsbyImage)}(e)?e.gatsbyImage:null==e||null==(t=e.childImageSharp)?void 0:t.gatsbyImageData};function A(e,t,a,r,n){return void 0===n&&(n={}),o({},a,{loading:r,shouldLoad:e,"data-main-image":"",style:o({},n,{opacity:t?1:0})})}function d(e,t,a,r,n,i,s,l){var c={};i&&(c.backgroundColor=i,"fixed"===a?(c.width=r,c.height=n,c.backgroundColor=i,c.position="relative"):("constrained"===a||"fullWidth"===a)&&(c.position="absolute",c.top=0,c.left=0,c.bottom=0,c.right=0)),s&&(c.objectFit=s),l&&(c.objectPosition=l);var A=o({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:o({opacity:t?0:1,transition:"opacity 500ms linear"},c)});return A}var u,p=["children"],g=function(e){var t=e.layout,a=e.width,n=e.height;return"fullWidth"===t?r.createElement("div",{"aria-hidden":!0,style:{paddingTop:n/a*100+"%"}}):"constrained"===t?r.createElement("div",{style:{maxWidth:a,display:"block"}},r.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+n+"' width='"+a+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},f=function(e){var t=e.children,a=s(e,p);return r.createElement(r.Fragment,null,r.createElement(g,o({},a)),t,null)},m=["src","srcSet","loading","alt","shouldLoad"],h=["fallback","sources","shouldLoad"],v=function(e){var t=e.src,a=e.srcSet,n=e.loading,i=e.alt,l=void 0===i?"":i,c=e.shouldLoad,A=s(e,m);return r.createElement("img",o({},A,{decoding:"async",loading:n,src:c?t:void 0,"data-src":c?void 0:t,srcSet:c?a:void 0,"data-srcset":c?void 0:a,alt:l}))},y=function(e){var t=e.fallback,a=e.sources,n=void 0===a?[]:a,i=e.shouldLoad,l=void 0===i||i,c=s(e,h),A=c.sizes||(null==t?void 0:t.sizes),d=r.createElement(v,o({},c,t,{sizes:A,shouldLoad:l}));return n.length?r.createElement("picture",null,n.map((function(e){var t=e.media,a=e.srcSet,n=e.type;return r.createElement("source",{key:t+"-"+n+"-"+a,type:n,media:t,srcSet:l?a:void 0,"data-srcset":l?void 0:a,sizes:A})})),d):d};v.propTypes={src:n.string.isRequired,alt:n.string.isRequired,sizes:n.string,srcSet:n.string,shouldLoad:n.bool},y.displayName="Picture",y.propTypes={alt:n.string.isRequired,shouldLoad:n.bool,fallback:n.exact({src:n.string.isRequired,srcSet:n.string,sizes:n.string}),sources:n.arrayOf(n.oneOfType([n.exact({media:n.string.isRequired,type:n.string,sizes:n.string,srcSet:n.string.isRequired}),n.exact({media:n.string,type:n.string.isRequired,sizes:n.string,srcSet:n.string.isRequired})]))};var b=["fallback"],w=function(e){var t=e.fallback,a=s(e,b);return t?r.createElement(y,o({},a,{fallback:{src:t},"aria-hidden":!0,alt:""})):r.createElement("div",o({},a))};w.displayName="Placeholder",w.propTypes={fallback:n.string,sources:null==(u=y.propTypes)?void 0:u.sources,alt:function(e,t,a){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+a+"`. Validation failed."):null}};var E=function(e){return r.createElement(r.Fragment,null,r.createElement(y,o({},e)),r.createElement("noscript",null,r.createElement(y,o({},e,{shouldLoad:!0}))))};E.displayName="MainImage",E.propTypes=y.propTypes;var x,C,I=function(e,t,a){for(var r=arguments.length,n=new Array(r>3?r-3:0),o=3;o<r;o++)n[o-3]=arguments[o];return e.alt||""===e.alt?i().string.apply(i(),[e,t,a].concat(n)):new Error('The "alt" prop is required in '+a+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},L={image:i().object.isRequired,alt:I},T=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],j=["style","className"],B=new Set,S=function(e){var t=e.as,n=void 0===t?"div":t,i=e.image,c=e.style,A=e.backgroundColor,d=e.className,u=e.class,p=e.onStartLoad,g=e.onLoad,f=e.onError,m=s(e,T),h=i.width,v=i.height,y=i.layout,b=function(e,t,a){var r={},n="gatsby-image-wrapper";return"fixed"===a?(r.width=e,r.height=t):"constrained"===a&&(n="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:n,"data-gatsby-image-wrapper":"",style:r}}(h,v,y),w=b.style,E=b.className,I=s(b,j),L=(0,r.useRef)(),S=(0,r.useMemo)((function(){return JSON.stringify(i.images)}),[i.images]);u&&(d=u);var N=function(e,t,a){var r="";return"fullWidth"===e&&(r='<div aria-hidden="true" style="padding-top: '+a/t*100+'%;"></div>'),"constrained"===e&&(r='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg height=\''+a+"' width='"+t+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),r}(y,h,v);return(0,r.useEffect)((function(){x||(x=Promise.all([a.e(774),a.e(223)]).then(a.bind(a,8223)).then((function(e){var t=e.renderImageToString,a=e.swapPlaceholderImage;return C=t,{renderImageToString:t,swapPlaceholderImage:a}})));var e,t,r=L.current.querySelector("[data-gatsby-image-ssr]");return r&&l()?(r.complete?(null==p||p({wasCached:!0}),null==g||g({wasCached:!0}),setTimeout((function(){r.removeAttribute("data-gatsby-image-ssr")}),0)):(null==p||p({wasCached:!0}),r.addEventListener("load",(function e(){r.removeEventListener("load",e),null==g||g({wasCached:!0}),setTimeout((function(){r.removeAttribute("data-gatsby-image-ssr")}),0)}))),void B.add(S)):C&&B.has(S)?void 0:(x.then((function(a){var r=a.renderImageToString,n=a.swapPlaceholderImage;L.current&&(L.current.innerHTML=r(o({isLoading:!0,isLoaded:B.has(S),image:i},m)),B.has(S)||(e=requestAnimationFrame((function(){L.current&&(t=n(L.current,S,B,c,p,g,f))}))))})),function(){e&&cancelAnimationFrame(e),t&&t()})}),[i]),(0,r.useLayoutEffect)((function(){B.has(S)&&C&&(L.current.innerHTML=C(o({isLoading:B.has(S),isLoaded:B.has(S),image:i},m)),null==p||p({wasCached:!0}),null==g||g({wasCached:!0}))}),[i]),(0,r.createElement)(n,o({},I,{style:o({},w,c,{backgroundColor:A}),className:E+(d?" "+d:""),ref:L,dangerouslySetInnerHTML:{__html:N},suppressHydrationWarning:!0}))},N=(0,r.memo)((function(e){return e.image?(0,r.createElement)(S,e):null}));N.propTypes=L,N.displayName="GatsbyImage";var k,Q=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"],_=function(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),n=2;n<a;n++)r[n-2]=arguments[n];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?i().number.apply(i(),[e,t].concat(r)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},D=new Set(["fixed","fullWidth","constrained"]),O={src:i().string.isRequired,alt:I,width:_,height:_,sizes:i().string,layout:function(e){if(void 0!==e.layout&&!D.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}},R=(k=N,function(e){var t=e.src,a=e.__imageData,n=e.__error,i=s(e,Q);return n&&console.warn(n),a?r.createElement(k,o({image:a},i)):(console.warn("Image not loaded",t),null)});R.displayName="StaticImage",R.propTypes=O},2369:function(e){var t=function(e,t){if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");t=Object.assign({pascalCase:!1},t);var a;return e=Array.isArray(e)?e.map((function(e){return e.trim()})).filter((function(e){return e.length})).join("-"):e.trim(),0===e.length?"":1===e.length?t.pascalCase?e.toUpperCase():e.toLowerCase():(e!==e.toLowerCase()&&(e=function(e){for(var t=!1,a=!1,r=!1,n=0;n<e.length;n++){var i=e[n];t&&/[a-zA-Z]/.test(i)&&i.toUpperCase()===i?(e=e.slice(0,n)+"-"+e.slice(n),t=!1,r=a,a=!0,n++):a&&r&&/[a-zA-Z]/.test(i)&&i.toLowerCase()===i?(e=e.slice(0,n-1)+"-"+e.slice(n-1),r=a,a=!1,t=!0):(t=i.toLowerCase()===i&&i.toUpperCase()!==i,r=a,a=i.toUpperCase()===i&&i.toLowerCase()!==i)}return e}(e)),e=e.replace(/^[_.\- ]+/,"").toLowerCase().replace(/[_.\- ]+(\w|$)/g,(function(e,t){return t.toUpperCase()})).replace(/\d+(\w|$)/g,(function(e){return e.toUpperCase()})),a=e,t.pascalCase?a.charAt(0).toUpperCase()+a.slice(1):a)};e.exports=t,e.exports.default=t},4529:function(e,t,a){var r=a(7294),n=a(3494),i=a(3723),o=n.default.div.withConfig({displayName:"Hero__HeroContainer",componentId:"sc-1nqmuvx-0"})(["position:relative;display:grid;width:100%;height:400px;"]),s=n.default.div.withConfig({displayName:"Hero__TitleContainer",componentId:"sc-1nqmuvx-1"})(["grid-area:1/1;position:relative;place-items:center;display:grid;"]),l=n.default.h1.withConfig({displayName:"Hero__HeroTitle",componentId:"sc-1nqmuvx-2"})(["text-align:center;font-weight:700;font-size:3rem;margin:10px 50px;color:var(--color-white);text-shadow:1px 1px 4px rgba(34,34,34,0.85);"]),c=n.default.h2.withConfig({displayName:"Hero__HeroSubTitle",componentId:"sc-1nqmuvx-3"})(["margin:10px 50px;color:var(--color-white);text-shadow:1px 1px 4px rgba(34,34,34,0.85);text-align:center;"]);t.Z=function(e){var t="../../content/images/cover.jpg",n=(0,i.c)(e.heroImg)||t,A=!!(0,i.c)(e.heroImg);return r.createElement(o,{style:{display:"grid"}},A&&r.createElement(i.G,{style:{gridArea:"1/1"},layout:"fullWidth",placeholder:"blurred",alt:"",image:n,formats:["auto","webp","avif"]}),!A&&r.createElement(i.S,{style:{gridArea:"1/1"},layout:"fullWidth",placeholder:"blurred",alt:"",src:t,formats:["auto","webp","avif"],__imageData:a(7171)}),r.createElement(s,null,r.createElement("div",null,r.createElement(l,null,e.title),e.subTitle&&r.createElement(c,null,e.subTitle))))}},820:function(e,t,a){var r=a(1721),n=a(7294),i=a(1082),o=a(3494),s=o.default.div.withConfig({displayName:"TagList__ListContainer",componentId:"sc-1areet5-0"})(["display:inline;color:var(--color-textSecondary);"]),l=(0,o.default)(i.Link).withConfig({displayName:"TagList__TagListItemLink",componentId:"sc-1areet5-1"})(["text-transform:uppercase;color:var(--color-textSecondary);&:not(:first-child){margin-left:0.3rem;}&:hover{border-bottom:1px dotted var(--color-textSecondary);}&:before{content:'#';}"]),c=o.default.span.withConfig({displayName:"TagList__TagListItem",componentId:"sc-1areet5-2"})(["text-transform:uppercase;color:var(--color-textSecondary);&:not(:first-child){margin-left:0.3rem;}&:before{content:'#';}"]),A=function(e){function t(){return e.apply(this,arguments)||this}return(0,r.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.tags,a=e.noLink;return n.createElement(s,null,t.map((function(e,r){return n.createElement(n.Fragment,{key:"tag-list-"+r},!a&&n.createElement(l,{to:"/tags/"+e},e),a&&n.createElement(c,{to:"/tags/"+e},e),r<t.length-1?", ":"")})))},t}(n.Component);t.Z=A},7171:function(e){e.exports=JSON.parse('{"layout":"fullWidth","placeholder":{"fallback":"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAKABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAUDBAb/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGBrmroyFIf/8QAGxAAAgIDAQAAAAAAAAAAAAAAAAIBAwQTMUL/2gAIAQEAAQUCryGV9qk2Kep6f//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABkQAAIDAQAAAAAAAAAAAAAAAAECEBEgMf/aAAgBAQAGPwJQzWI5j//EABoQAQACAwEAAAAAAAAAAAAAAAEAERAhMUH/2gAIAQEAAT8hZg7SO4rwlqPOJW+z/9oADAMBAAIAAwAAABDDz//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8QP//EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oACAECAQE/EIj/xAAfEAEAAgEDBQAAAAAAAAAAAAABABEhMUGBUWGhscH/2gAIAQEAAT8Q2YEBHZdMwu7OSWWXiC226nuK3fT7BYI5n//Z"},"images":{"fallback":{"src":"/static/c216047eb32760da01d043869ab00f28/dac54/cover.jpg","srcSet":"/static/c216047eb32760da01d043869ab00f28/5f965/cover.jpg 750w,\\n/static/c216047eb32760da01d043869ab00f28/76f9a/cover.jpg 1080w,\\n/static/c216047eb32760da01d043869ab00f28/54fb8/cover.jpg 1366w,\\n/static/c216047eb32760da01d043869ab00f28/dac54/cover.jpg 1920w","sizes":"100vw"},"sources":[{"srcSet":"/static/c216047eb32760da01d043869ab00f28/06049/cover.avif 750w,\\n/static/c216047eb32760da01d043869ab00f28/0f115/cover.avif 1080w,\\n/static/c216047eb32760da01d043869ab00f28/c833e/cover.avif 1366w,\\n/static/c216047eb32760da01d043869ab00f28/343e8/cover.avif 1920w","type":"image/avif","sizes":"100vw"},{"srcSet":"/static/c216047eb32760da01d043869ab00f28/ee7ce/cover.webp 750w,\\n/static/c216047eb32760da01d043869ab00f28/819dc/cover.webp 1080w,\\n/static/c216047eb32760da01d043869ab00f28/7b8ce/cover.webp 1366w,\\n/static/c216047eb32760da01d043869ab00f28/e0a47/cover.webp 1920w","type":"image/webp","sizes":"100vw"}]},"width":1,"height":0.5}')}}]);
//# sourceMappingURL=61c21e1eedb1af94bbd1fe0346382bfb4ba85875-b889a028f026fef7598b.js.map
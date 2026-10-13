!function(){"use strict";function e(){return window.__ALPHA_COMMON_PROMISE__??(window.__ALPHA_COMMON_PROMISE__=function(e,t,i={}){return new Promise((e,r)=>{const o=t,s=t!==o;if(document.querySelector(`script[src="${o}"]`)||s)return void e();let n=!1;(o=>{const s=function(e,t){const i=document.createElement("script");return i.src=e,t.module&&(i.type="module"),null!=t.crossOrigin&&(i.crossOrigin=t.crossOrigin),i.defer=t.defer??!0,t.async&&(i.async=!0),document.head.appendChild(i),i}(o,i);s.onload=()=>{n||(n=!0,e())},s.onerror=()=>{n||(n=!0,r(Error("Failed to load script (primary+fallback): "+t)))}})(o)})}(0,re,{defer:!0}).then(()=>{const e=window.AlphaCommon;if(!e)throw Error("[ALPHA-REVIEW] \uacf5\ud1b5 \uc2a4\ud06c\ub9bd\ud2b8 \ub85c\ub4dc \uc2e4\ud328");return e}).catch(e=>{throw delete window.__ALPHA_COMMON_PROMISE__,document.querySelectorAll(`script[src="${re}"]`).forEach(e=>e.remove()),e}))}function t(t,i){(async()=>{try{const r=await e();await(r.log?.send(t,i))}catch(e){}})()}function i(e){return(t,i)=>"object"==typeof i?Ie(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function r(e){return i({...e,state:!0,attribute:!1})}function o(e,t){if(!Fe(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==Ae?Ae.createHTML(t):t}function s(e,t,i=e,r){if(t===Qe)return t;let o=void 0!==r?i._$Co?.[r]:i._$Cl;const n=Ve(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,i,r)),void 0!==r?(i._$Co??(i._$Co=[]))[r]=o:i._$Cl=o),void 0!==o&&(t=s(e,o._$AS(e,t.values),o,r)),t}function n({container:e,styleRoot:t,options:i={slidesPerView:"auto",spaceBetween:12,loop:!1},event:r={}}){const o=window.CUSTOM_SWIPER?.style;if(o){const e="swiper-custom-style",i=t instanceof ShadowRoot||t instanceof HTMLElement?t:document.head;if(!i.querySelector(`style[data-id="${e}"]`)){const t=document.createElement("style");t.textContent=o,t.setAttribute("data-id",e),i.prepend(t)}}const s=window.CUSTOM_SWIPER?.swiper??window.Swiper;if(!s)throw Error("Swiper is not loaded. Call initSwiperCDN() first.");const n={...i};n&&"object"==typeof n.freeMode&&null!==n.freeMode&&"enabled"in n.freeMode&&(n.freeMode=!!n.freeMode?.enabled);const a={...n?.on??{},...r??{}};n&&n.on&&delete n.on;const p=new s(e,{...n});if(a)for(const e of Object.keys(a)){const t=a[e];"function"==typeof t&&p?.on&&p.on(e,(...e)=>t(e?.[0]??p,...e.slice(1)))}return p}function a(e,t,i){return new Promise((r,o)=>{const s=()=>window?.CUSTOM_SWIPER?.swiper;if(s()){const i=document.querySelector(`script[src="${e}"], script[src="${t}"]`);return void r({script:i??document.createElement("script"),SwiperCtor:s()})}let n=!1,a=!1;const p=(e,i=!1)=>{const l=document.createElement("script");l.src=e,l.async=!0,l.onload=()=>{n||(n=!0,r({script:l,SwiperCtor:s()}))},l.onerror=()=>{if(!i&&t&&!a&&!n)return a=!0,void p(t,!0);n||(n=!0,o?.(void 0))},document.head.appendChild(l)};p(e),setTimeout(()=>{n||s()||!t||a||(a=!0,p(t,!0))},i)})}async function p(e){return window.Swiper&&!window.originSwiper&&(window.originSwiper=window.Swiper),window?.CUSTOM_SWIPER?.ready?window?.CUSTOM_SWIPER.ready:(window.CUSTOM_SWIPER={},window.CUSTOM_SWIPER.ready=await Promise.all([(t="https://s3.ap-northeast-2.amazonaws.com/core.front.static/test/swiper-bundle.min.css",new Promise(e=>{let i=!1;const r=t=>{i||(i=!0,e(t))};fetch("https://unpkg.com/swiper@11.2.6/swiper-bundle.min.css").then(e=>e.text()).then(e=>r(e)).catch(()=>{fetch(t).then(e=>e.text()).then(e=>r(e)).catch(()=>r(""))}),setTimeout(()=>{!i&&t&&fetch(t).then(e=>e.text()).then(e=>r(e)).catch(()=>{})},300)})).then(e=>{window.CUSTOM_SWIPER.style=e}),a("https://unpkg.com/swiper@11.2.6/swiper-bundle.min.js","https://s3.ap-northeast-2.amazonaws.com/core.front.static/test/swiper-bundle.min.js",300).then(({SwiperCtor:e})=>{window.CUSTOM_SWIPER.swiper=e||window.Swiper,window.originSwiper&&(window.Swiper=window.originSwiper)})]).then(()=>e?.()),window.CUSTOM_SWIPER.ready);var t}function l(){const e=parseInt(document.body.dataset.scrollY||"0",10);document.body.style.position="",document.body.style.top="",document.body.style.left="",document.body.style.right="",document.body.style.width="",document.body.style.paddingRight="",window.scrollTo(0,e)}function d(e,t){if("overlay"===(t?.type??"default")){const i="review-overlay-portal";let r=document.body.querySelector(i);r||(r=document.createElement(i),document.body.appendChild(r));const o=document.createElement(e);if(t?.initialAttributes)for(const[e,i]of Object.entries(t.initialAttributes))o.setAttribute(e,i);if(t?.initialProps)for(const[e,i]of Object.entries(t.initialProps))o[e]=i;const s=()=>{const e=r.shadowRoot,t=e?.querySelector(".overlay-portal-container");return!!t&&(t.appendChild(o),!0)};if(!s()){const e=r.updateComplete;e&&"function"==typeof e.then?e.then(()=>{s()}):setTimeout(()=>s(),0)}return o}const i=t?.containerId?document.getElementById(t.containerId)??document.body:document.body,r=document.createElement(e);if(t?.initialAttributes)for(const[e,i]of Object.entries(t.initialAttributes))r.setAttribute(e,i);if(t?.initialProps)for(const[e,i]of Object.entries(t.initialProps))r[e]=i;return i.appendChild(r),r}function c(e){const t=document.body.querySelector(e);t&&t.parentNode&&t.parentNode.removeChild(t);const i=document.body.querySelector("review-overlay-portal");return i&&i.parentNode&&i.parentNode.removeChild(i),!0}function h(e,t,i){const r=e+(t.startsWith("/")?t:"/"+t);if(!i)return r;const o=new URLSearchParams;Object.entries(i).forEach(([e,t])=>{null!=t&&o.append(e,t+"")});const s=""+o;return s?`${r}?${s}`:r}async function g(e){if(!e.ok){const t=await e.text().catch(()=>"");throw Error(`HTTP ${e.status} ${e.statusText} - ${t}`)}if(204!==e.status){if((e.headers.get("content-type")??"").includes("application/json")){const t=await e.text().catch(()=>"");if(!t)return;return JSON.parse(t)}return await e.text()}}async function u(e,t,i,r,o){const s={Accept:"application/json",...i?{"Content-Type":"application/json"}:{},...r?.headers??{},...o?.headers??{}},n=h(r?.baseURL??(window.ALPHA_REVIEW_EMERGENCY?se:oe),t,o?.query);return g(await fetch(n,{method:e,headers:s,body:null==i?void 0:JSON.stringify(i),credentials:r?.credentials,signal:o?.signal}))}function w(e,t,i){if("undefined"==typeof window)return;const r=`[ALPHA-REVIEW][${e}] ${t}`;try{const e=window.ALPHA_REVIEW_TRACE??(window.ALPHA_REVIEW_TRACE=[]);e.push(void 0===i?r:`${r} ${function(e){if("string"==typeof e)return e;try{return JSON.stringify(e)??e+""}catch{return e+""}}(i)}`),e.length>200&&e.splice(0,e.length-200)}catch{}if(null===nr&&(nr=function(){if("undefined"==typeof window)return!1;if(!0===window.ALPHA_REVIEW_DEBUG)return!0;try{if(window.localStorage?.getItem("ALPHA_REVIEW_DEBUG"))return!0}catch{}try{if(new URL(window.location.href).searchParams.has("alpha_debug"))return!0}catch{}return!1}()),nr)try{void 0===i?window.console?.log(r):window.console?.log(r,i)}catch{}}function v(){const e=window.location.search.split("?").pop(),t=e?.split("&")?.find(e=>e.startsWith("link_product_no"))?.split("=")?.[1];switch(window.ALPHA_REVIEW_HOST){case"cafe24":return t||window.iProductNo||"";case"imweb":return e?e.split("&").find(e=>e.startsWith("idx="))?.split("=").pop()??"":"";default:return""}}async function m(){const e=window.ALPHA_REVIEW_HOST;return new Promise("cafe24"===e?e=>{e({mall_id:window?.ALPHA_REVIEW_CAFE24_INSTANCE?.MALL_ID??window.CAFE24API?.MALL_ID??"",shop_no:window?.ALPHA_REVIEW_CAFE24_INSTANCE?.SHOP_NO??window.CAFE24API?.SHOP_NO??""})}:e=>{e({mall_id:window.SITE_CODE??"",shop_no:window.UNIT_CODE??""})})}async function y(){switch(window.ALPHA_REVIEW_HOST){case"cafe24":return new Promise(e=>{window?.CAFE24API?.getMemberID?window.CAFE24API.getMemberID(t=>{e(t??null)}):e(null)});case"imweb":try{const e=await(window.ImwebExternalSDK?.getMemberInfo(ne));return e?.uid??null}catch(e){return null}default:return Promise.resolve(null)}}async function f(){switch(window.ALPHA_REVIEW_HOST){case"cafe24":return window.CAPP_ASYNC_METHODS?.EC_PATH_ROLE?window.CAPP_ASYNC_METHODS.EC_PATH_ROLE:"ALL";case"imweb":return"/"===new URL(window.location.href).pathname?"MAIN":window.location.href.includes("/mypage")?"MYSHOP_MAIN":window.location.href.includes("/shop_payment")?"MYSHOP_ORDER_LIST":window.location.href.includes("/?idx")||document.body.classList.contains("shop_view")?"PRODUCT_DETAIL":window.location.href.includes("/review")?"BOARD":"ALL"}}async function b(e,t,i=1e3){if(""===e.widget_code)throw Error("[ALPHA-REVIEW] widget_code\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");if(e.page<1)throw Error("[ALPHA-REVIEW] page\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");if(e.page_size<1)throw Error("[ALPHA-REVIEW] page_size\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");return await or.get(t||"/v2/api-widget",{query:e},i)}async function x(e,t){if(""===e.widget_code)throw Error("[ALPHA-REVIEW] widget_code\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");if(e.page<1)throw Error("[ALPHA-REVIEW] page\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");if(e.page_size<1)throw Error("[ALPHA-REVIEW] page_size\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");return await or.get(t||"/v2/api-widget/meta",{query:e})}async function _(e,t,i){return await or.get("/v2/api-widget/reviews/surveys",{query:{widget_code:e,review_ids:t,is_dummy:i}})}function C({title:e,okButtonText:t,cancelButtonText:i,buttonDirection:r,content:o,url:s,type:n}){const a=d("review-common-dialog",{type:"overlay",initialAttributes:{title:e,content:o,okButtonText:t,cancelButtonText:i,buttonDirection:r}});a&&a.addEventListener("review:okDialog",()=>{dr!==n&&$(s)},{once:!0}),Wi.open({key:"review-common-dialog",onClose:()=>c("review-common-dialog")})}function $(e){const t=document.createElement("a");t.href=e,t.target="_blank",document.body.appendChild(t),setTimeout(()=>{t.click()},100)}function O(e,t=Dr){return e>=t.pcMin?"pc":e>=t.tabletMin?"tablet":"mobile"}function*k(e,t){if(void 0!==e){let i=0;for(const r of e)yield t(r,i++)}}function S(e){try{const t=localStorage.getItem(e);if(!t)return{};const i=JSON.parse(t);return i&&"object"==typeof i&&!Array.isArray(i)?i:{}}catch(e){return{}}}function E(e){let t=Uo.get(e);if(!t){Go||(Go=jo(Bo));const i=!0===Go[""+e];t={target:i,serverLiked:i,inFlight:!1},Uo.set(e,t)}return t}function R(e){Ho.forEach(t=>t(e))}async function L(e){const i=E(e);if(i.inFlight)return;const r=i.target;if(r!==i.serverLiked){i.inFlight=!0;try{const{like_count:o}=r?await async function(e){return await or.post("/v2/api-widget/module/like",{review_id:e})}(e):await async function(e){return await or.post("/v2/api-widget/module/removelike",{review_id:e})}(e);i.serverLiked=r,i.serverCount=o,r?Vo(e,Bo):Fo(e,Bo),r&&t("widget_like",{review_id:e,product_no:i.productNo})}catch{i.target=i.serverLiked}finally{i.inFlight=!1,R(e),i.target!==i.serverLiked&&L(e)}}}function I(e){if(!e)return"";if(!e.startsWith(cs))return e;const t=e.slice(52);return""===t||t.startsWith("/")?"https://review-media.alphwidget.com"+t:e}function P(e){return O(e?e.clientWidth:window.innerWidth,{...Dr})}function T(e,t="cart"){const i=si.WIDGETS.DETAIL_POPUP.PURCHASE_ERROR;if("api-error"===e)return"fetch"===t?i.FETCH_FAILED:i.CART_FAILED;switch(e){case"no-client":return i.NO_CLIENT;case"unauthorized":return i.UNAUTHORIZED;case"not-found":return i.NOT_FOUND;case"rate-limited":return i.RATE_LIMITED;case"required-not-picked":return i.REQUIRED_NOT_PICKED;case"no-matching-variant":return i.NO_MATCHING_VARIANT;case"not-sellable":return i.NOT_SELLABLE;case"required-empty":case"required-option-missing":return i.REQUIRED_EMPTY;case"too-long":return i.TOO_LONG;case"name-has-semicolon":return i.NAME_HAS_SEMICOLON;case"invalid-additional-options":case"installment-mismatch":case"shipping-fee-mismatch":return i.CART_FAILED;case"host-busy":return i.HOST_BUSY;case"select-not-found":case"option-not-found":case"cascade-timeout":case"unknown-listing-type":case"slot-incomplete":case"no-new-row":return i.INJECT_FAILED;default:return i.FALLBACK}}async function A(e,t){if(""===e)throw Error("[ALPHA-REVIEW] widget_code\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");return await or.get(t||"/v2/api-widget/options",{query:{widget_code:e}})}function N(){if(nn)return nn;const e=window.CAFE24API;if(!e?.init)return null;const t=e.instance?.[sn];return nn=t??e.init({client_id:sn,version:"2024-12-01"}),nn.setBasicAuthKey(sn,function(e){if("function"!=typeof btoa)return"";const t=(new TextEncoder).encode(e);let i="";return t.forEach(e=>{i+=String.fromCharCode(e)}),btoa(i)}(`${sn}:${ie}`)),nn}function D(){return(window.ALPHA_REVIEW_CAFE24_INSTANCE?.SHOP_NO??window.CAFE24API?.SHOP_NO??"1")+""}async function M(e){if("cafe24"!==window.ALPHA_REVIEW_HOST)return"searchable";const t=Number(e);if(!Number.isFinite(t)||t<=0)return"unknown";const i=t+"",r=an.get(i);if(r)return r;const o=async function(e){try{const{mall_id:t}=await m(),i=await or.oneTimeGet("/v2/api-widget/module/check-product",{query:{mall_id:t,shop_no:D(),product_no:e}});return"boolean"!=typeof i?.is_searchable?"unknown":i.is_searchable?"searchable":"secret"}catch{return"unknown"}}(t);an.set(i,o);const s=await o;return"unknown"===s&&an.delete(i),s}function W(e,t){if(t&&"string"==typeof t)try{const i=function(e){const t=[/eval\s*\(/gi,/Function\s*\(/gi,/document\.write/gi,/innerHTML\s*=/gi];for(const i of t)if(i.test(e))return"";return e}(t);if(!i)return;Function(i).call(e)}catch(e){}}function z(e,t){const i=t,r=function(e){return function(e){return"object"==typeof e&&null!==e&&"renderRoot"in e}(e)?e.renderRoot:e.shadowRoot??e}(e);if(function(e){return e instanceof ShadowRoot&&"adoptedStyleSheets"in e&&"replaceSync"in CSSStyleSheet.prototype}(r)){const e=new CSSStyleSheet;try{e.replaceSync(i)}catch{e.replaceSync("")}const t=r;return t.adoptedStyleSheets=[...t.adoptedStyleSheets,e],{update:t=>{const i=t;try{e.replaceSync(i)}catch{}},dispose:()=>{t.adoptedStyleSheets=t.adoptedStyleSheets.filter(t=>t!==e)}}}const o=document.createElement("style");return o.textContent=i,r.appendChild(o),{update:e=>{o.textContent=e},dispose:()=>{o.parentNode&&o.parentNode.removeChild(o)}}}function j(e){throw new vn(e)}function V(e,t,i,r){if("RESULT_EMPTY_SHOW_MESSAGE"===e){const e=window?.ALPHA_REVIEW_ONLY_ONE_EMPTY_MESSAGE?.[i]||{};return Object.keys(e).length>0&&!e[r]?null:(i&&window.ALPHA_REVIEW_ONLY_ONE_EMPTY_MESSAGE&&(window.ALPHA_REVIEW_ONLY_ONE_EMPTY_MESSAGE={...window?.ALPHA_REVIEW_ONLY_ONE_EMPTY_MESSAGE||{},[i]:{[r]:!0}}),Je`<review-review-write .productNo=${t}></review-review-write>`)}return null}function F(e){return e||"RESULT_EMPTY_HIDE"}function B(e,t){for(const[i,r]of Object.entries(t))e.style.setProperty(i,r)}function U(e){const t=e??{},i=Number(t.status??t.statusCode??t.http_status??t.code);return 401===i||403===i?"unauthorized":404===i?"not-found":429===i?"rate-limited":"api-error"}async function H(e){const t=N();if(!t)return{ok:!1,reason:"no-client"};const i=Number(e);if(!Number.isFinite(i)||i<=0)return{ok:!1,reason:"not-found"};const r=`/api/v2/products/${i}?embed=variants,options,discountprice&shop_no=${D()}`;try{const e=await new Promise((e,i)=>{const o=setTimeout(()=>i(Error("timeout")),1e4);t.get(r,(t,r)=>{clearTimeout(o),t?i(t):e(r??{})})}),i=e.products,o=e.product??(Array.isArray(i)?i[0]:void 0);return o?.product_no?{ok:!0,product:o}:{ok:!1,reason:"not-found"}}catch(e){return{ok:!1,reason:U(e)}}}function G(e,t){return Fa(e.is_deleted)||Ba(e.display)||Ba(e.selling)||Fa(e.single_purchase)&&Fa(e.single_purchase_restriction)||t&&function(e,t){return t.native?t.native.blocked&&!t.native.showButton:!t.isLogin&&Ua.has(e.buy_limit_type+"")}(e,t)||Fa(e.options?.use_attached_file_option)||Fa(e.options?.use_additional_option)?"hidden":Fa(e.sold_out)?"sold-out":null}function q(){const e=Ga();return void 0===e?.bIsSuccess?null:{blocked:!1===e.bIsSuccess,showButton:!1!==e.bIsDisplayPurchaseButton}}function Y(e){return"undefined"!=typeof CSS&&"function"==typeof CSS.escape?CSS.escape(e):e.replace(/["\\]/g,"\\$&")}function K(e){const t=e.discountprice;return("mobile"===P()?qa(t?.mobile_discount_price):qa(t?.pc_discount_price))??qa(e.price)??0}function Z(e){if(!e?.product_name)return;const t=e=>"number"==typeof e&&Number.isFinite(e)?e:void 0;return{product_no:(e.product_no??"")+"",product_name:e.product_name,price:t(e.price)??0,thumbnail_url:I(e.thumbnail_url),product_url:e.product_url??void 0,rating:t(e.rating),review_count:t(e.review_count)}}function J(e){return(e.title??"").trim()}function Q(e){return{...e,video_url:I(e.video_url),thumbnail_url:I(e.thumbnail_url)||null,author:{handle:e.author?.handle??"",avatar_url:I(e.author?.avatar_url)},products:e.products?.map(e=>({...e,thumbnail_url:I(e.thumbnail_url)}))}}function X(e){let t=e?.activeElement;for(;t?.shadowRoot?.activeElement;)t=t.shadowRoot.activeElement;return t??null}function ee(e){if(!e.hasAttribute("crossorigin"))return!1;const t=e.getAttribute("src")??"";e.removeAttribute("crossorigin"),t&&e.setAttribute("src",t);try{e.load()}catch{}return!0}const te="https://s3.ap-northeast-2.amazonaws.com/core.front.static",ie="QrQvpoymzJbL7PGKpUiYeM",re="https://static.alphwidget.com/script/Common-Script/PRODUCTION/alpha_apps_common_script.min.js",oe="https://review-widget.alphwidget.com",se="https://review-backup.alphwidget.com",ne="fccf29e15a168a230610436c8679d00271afb5e24b0fdf26529a6beb7351f58f",ae=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe=globalThis,le=pe.ShadowRoot&&(void 0===pe.ShadyCSS||pe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,de=Symbol(),ce=new WeakMap;let he=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==de)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(le&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=ce.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ce.set(t,e))}return e}toString(){return this.cssText}};const ge=e=>new he("string"==typeof e?e:e+"",void 0,de),ue=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new he(i,e,de)},we=le?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ge(t)})(e):e,{is:ve,defineProperty:me,getOwnPropertyDescriptor:ye,getOwnPropertyNames:fe,getOwnPropertySymbols:be,getPrototypeOf:xe}=Object,_e=globalThis,Ce=_e.trustedTypes,$e=Ce?Ce.emptyScript:"",Oe=_e.reactiveElementPolyfillSupport,ke={toAttribute(e,t){switch(t){case Boolean:e=e?$e:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},Se=(e,t)=>!ve(e,t),Ee={attribute:!0,type:String,converter:ke,reflect:!1,useDefault:!1,hasChanged:Se};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),_e.litPropertyMetadata??(_e.litPropertyMetadata=new WeakMap);let Re=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ee){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&me(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:o}=ye(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const s=r?.call(this);o?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ee}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;const e=xe(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){const e=this.properties,t=[...fe(e),...be(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(we(e))}else void 0!==e&&t.push(we(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(le)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of t){const t=document.createElement("style"),r=pe.litNonce;void 0!==r&&t.setAttribute("nonce",r),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:ke).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:ke;this._$Em=r;const s=o.fromAttribute(t,e.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const r=this.constructor,o=this[e];if(i??(i=r.getPropertyOptions(e)),!((i.hasChanged??Se)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},s){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==o||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(e){}firstUpdated(e){}};Re.elementStyles=[],Re.shadowRootOptions={mode:"open"},Re.elementProperties=new Map,Re.finalized=new Map,Oe?.({ReactiveElement:Re}),(_e.reactiveElementVersions??(_e.reactiveElementVersions=[])).push("2.1.1");const Le={attribute:!0,type:String,converter:ke,reflect:!1,hasChanged:Se},Ie=(e=Le,t,i)=>{const{kind:r,metadata:o}=i;let s=globalThis.litPropertyMetadata.get(o);if(void 0===s&&globalThis.litPropertyMetadata.set(o,s=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,o,e)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const o=this[r];t.call(this,i),this.requestUpdate(r,o,e)}}throw Error("Unsupported decorator location: "+r)},Pe=globalThis,Te=Pe.trustedTypes,Ae=Te?Te.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ne="$lit$",De=`lit$${Math.random().toFixed(9).slice(2)}$`,Me="?"+De,We=`<${Me}>`,ze=document,je=()=>ze.createComment(""),Ve=e=>null===e||"object"!=typeof e&&"function"!=typeof e,Fe=Array.isArray,Be="[ \t\n\f\r]",Ue=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,He=/-->/g,Ge=/>/g,qe=RegExp(`>|${Be}(?:([^\\s"'>=/]+)(${Be}*=${Be}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Ye=/'/g,Ke=/"/g,Ze=/^(?:script|style|textarea|title)$/i,Je=(e,...t)=>({_$litType$:1,strings:e,values:t}),Qe=Symbol.for("lit-noChange"),Xe=Symbol.for("lit-nothing"),et=new WeakMap,tt=ze.createTreeWalker(ze,129);class it{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,n=0;const a=e.length-1,p=this.parts,[l,d]=((e,t)=>{const i=e.length-1,r=[];let s,n=2===t?"<svg>":3===t?"<math>":"",a=Ue;for(let t=0;t<i;t++){const i=e[t];let o,p,l=-1,d=0;for(;d<i.length&&(a.lastIndex=d,p=a.exec(i),null!==p);)d=a.lastIndex,a===Ue?"!--"===p[1]?a=He:void 0!==p[1]?a=Ge:void 0!==p[2]?(Ze.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=qe):void 0!==p[3]&&(a=qe):a===qe?">"===p[0]?(a=s??Ue,l=-1):void 0===p[1]?l=-2:(l=a.lastIndex-p[2].length,o=p[1],a=void 0===p[3]?qe:'"'===p[3]?Ke:Ye):a===Ke||a===Ye?a=qe:a===He||a===Ge?a=Ue:(a=qe,s=void 0);const c=a===qe&&e[t+1].startsWith("/>")?" ":"";n+=a===Ue?i+We:l>=0?(r.push(o),i.slice(0,l)+Ne+i.slice(l)+De+c):i+De+(-2===l?t:c)}return[o(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]})(e,t);if(this.el=it.createElement(l,i),tt.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=tt.nextNode())&&p.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(Ne)){const t=d[n++],i=r.getAttribute(e).split(De),o=/([.?@])?(.*)/.exec(t);p.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?nt:"?"===o[1]?at:"@"===o[1]?pt:st}),r.removeAttribute(e)}else e.startsWith(De)&&(p.push({type:6,index:s}),r.removeAttribute(e));if(Ze.test(r.tagName)){const e=r.textContent.split(De),t=e.length-1;if(t>0){r.textContent=Te?Te.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],je()),tt.nextNode(),p.push({type:2,index:++s});r.append(e[t],je())}}}else if(8===r.nodeType)if(r.data===Me)p.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(De,e+1));)p.push({type:7,index:s}),e+=De.length-1}s++}}static createElement(e,t){const i=ze.createElement("template");return i.innerHTML=e,i}}class rt{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??ze).importNode(t,!0);tt.currentNode=r;let o=tt.nextNode(),s=0,n=0,a=i[0];for(;void 0!==a;){if(s===a.index){let t;2===a.type?t=new ot(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new lt(o,this,e)),this._$AV.push(t),a=i[++n]}s!==a?.index&&(o=tt.nextNode(),s++)}return tt.currentNode=ze,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ot{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=Xe,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=s(this,e,t),Ve(e)?e===Xe||null==e||""===e?(this._$AH!==Xe&&this._$AR(),this._$AH=Xe):e!==this._$AH&&e!==Qe&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>Fe(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Xe&&Ve(this._$AH)?this._$AA.nextSibling.data=e:this.T(ze.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=it.createElement(o(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new rt(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=et.get(e.strings);return void 0===t&&et.set(e.strings,t=new it(e)),t}k(e){Fe(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const o of e)r===t.length?t.push(i=new ot(this.O(je()),this.O(je()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class st{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=Xe,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Xe}_$AI(e,t=this,i,r){const o=this.strings;let n=!1;if(void 0===o)e=s(this,e,t,0),n=!Ve(e)||e!==this._$AH&&e!==Qe,n&&(this._$AH=e);else{const r=e;let a,p;for(e=o[0],a=0;a<o.length-1;a++)p=s(this,r[i+a],t,a),p===Qe&&(p=this._$AH[a]),n||(n=!Ve(p)||p!==this._$AH[a]),p===Xe?e=Xe:e!==Xe&&(e+=(p??"")+o[a+1]),this._$AH[a]=p}n&&!r&&this.j(e)}j(e){e===Xe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class nt extends st{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Xe?void 0:e}}class at extends st{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Xe)}}class pt extends st{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=s(this,e,t,0)??Xe)===Qe)return;const i=this._$AH,r=e===Xe&&i!==Xe||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==Xe&&(i===Xe||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class lt{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){s(this,e)}}const dt=Pe.litHtmlPolyfillSupport;dt?.(it,ot),(Pe.litHtmlVersions??(Pe.litHtmlVersions=[])).push("3.3.1");const ct=globalThis;let ht=class extends Re{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let o=r._$litPart$;if(void 0===o){const e=i?.renderBefore??null;r._$litPart$=o=new ot(t.insertBefore(je(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Qe}};ht._$litElement$=!0,ht.finalized=!0,ct.litElementHydrateSupport?.({LitElement:ht});const gt=ct.litElementPolyfillSupport;gt?.({LitElement:ht}),(ct.litElementVersions??(ct.litElementVersions=[])).push("4.2.1");const ut="play",wt="multiple",vt="instagram",mt="blog",yt="right",ft="left",bt="double-right",xt="dot",_t="shadow-left-arrow",Ct="shadow-right-arrow",$t="drop-down",Ot="image-and-video",kt="search",St="user",Et="arrow-down",Rt="heart",Lt="heart-fill",It="comment",Pt="close",Tt="bubble-talk",At="shopping-bag",Nt="vertical-divider",Dt="photo",Mt="video",Wt="sns-like",zt="sns-comment",jt="bookmark",Vt="plus",Ft="refresh",Bt="filter",Ut="ranking-badge",Ht="glare",Gt="volume-on",qt="volume-off",Yt="info",Kt="840px",Zt="440px",Jt="plain-stick",Qt="gradient-stick",Xt="dark-button";var ei=Object.defineProperty,ti=Object.getOwnPropertyDescriptor,ii=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ti(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ei(t,i,s),s};let ri=class extends ht{constructor(){super(...arguments),this.type="gradient-stick",this.isPrevVisible=!0,this.isNextVisible=!0,this.onPrevClick=e=>{e.preventDefault(),e.stopPropagation(),this.dispatchEvent(new CustomEvent("prevArrowClick",{bubbles:!0,composed:!0}))},this.onNextClick=e=>{e.preventDefault(),e.stopPropagation(),this.dispatchEvent(new CustomEvent("nextArrowClick",{bubbles:!0,composed:!0}))}}createRenderRoot(){return this}render(){return Je` <style>.arrow-button-area { pointer-events: auto; position: absolute; top: 0; display: flex; justify-content: center; align-items: center; width: clamp(30px, 6cqw, 50px); z-index: 100; opacity: 1; visibility: visible; transition: opacity 0.1s ease, visibility 0.1s ease; cursor: pointer; review-custom-icon { display: flex; align-items: center; justify-content: center; padding-left: 10%; width: 100%; height: 100%; } } .arrow-button-area--${Qt} { height: 100%; border: none; &.arrow-button--left { left: 0; background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%); } &.arrow-button--right { right: 0; background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%); } &.arrow-button--disabled { opacity: 0; visibility: hidden; pointer-events: none; } } .arrow-button-area--${Xt} { width: clamp(44px, 6cqw, 50px); height: clamp(70px, 10cqw, 120px); border: none; border-radius: 3px; background: var(--alp-review-scrim-black70); top: 50%; transform: translateY(-50%); &:active { background: var(--alp-review-scrim-black90); } &.arrow-button--left { left: 0; } &.arrow-button--right { right: 0; } &.arrow-button--disabled { opacity: 0; visibility: hidden; pointer-events: none; } } .arrow-button-area--${Jt} { width: clamp(20px, 4cqw, 40px); height: 100%; border: none; border-radius: 3px; background: var(--alp-review-card-gray03); &:active { background: var(--alp-review-card-gray07); } &.arrow-button--left { left: 0; } &.arrow-button--right { right: 0; } &.arrow-button--disabled { opacity: 0; visibility: hidden; pointer-events: none; } }</style>

      <button
        class="arrow-button-area arrow-button-area--${this.type} arrow-button--left ${this.isPrevVisible?"":"arrow-button--disabled"}"
        @click=${e=>this.onPrevClick(e)}
      >
        <review-custom-icon
          type="${ft}"
          width="100%"
          height="100%"
          color="${this.type===Jt?"var(--alp-review-icon-gray100)":"#FFFFFF"}"
        ></review-custom-icon>
      </button>
      <button
        class="arrow-button-area arrow-button-area--${this.type} arrow-button--right ${this.isNextVisible?"":"arrow-button--disabled"}"
        @click=${e=>this.onNextClick(e)}
      >
        <review-custom-icon
          type="${yt}"
          width="100%"
          height="100%"
          color="${this.type===Jt?"var(--alp-review-icon-gray100)":"#FFFFFF"}"
        ></review-custom-icon>
      </button>`}};ii([i({type:String})],ri.prototype,"type",2),ii([i({type:Boolean})],ri.prototype,"isPrevVisible",2),ii([i({type:Boolean})],ri.prototype,"isNextVisible",2),ri=ii([ae("review-arrow-pagination-handler")],ri);const oi=()=>"en"===window.ALPHA_REVIEW_LOCAL,si={SHARED:{OPEN_REVIEW_WRITE:{get COMMENT(){return oi()?"'s Comment":"\ub2d8\uc758 \ud55c\ub9c8\ub514"},get UNVERIFIED_IMPOSSIBLE_TITLE(){return oi()?"Only customers who purchased this item\ncan write a review.":"\uc1fc\ud551\ubab0\uc5d0\uc11c \uad6c\ub9e4\ud55c \uc0ac\ub78c\ub9cc\n\ub9ac\ubdf0\ub97c \uc791\uc131\ud560 \uc218 \uc788\uc5b4\uc694."},get OK(){return oi()?"OK":"\ud655\uc778"},get LIMIT_REACHED_TITLE(){return oi()?"You have reached the maximum limit\nfor review submissions.":"\ucd5c\ub300 \uc791\uc131\ud560 \uc218 \uc788\ub294 \ub9ac\ubdf0\ub97c\n\ubaa8\ub450 \uc791\uc131\ud558\uc168\uc5b4\uc694."},get VIEW_MY_REVIEWS(){return oi()?"View my reviews":"\uc791\uc131\ud55c \ub9ac\ubdf0 \ubcf4\uae30"},get CLOSE(){return oi()?"Close":"\ub2eb\uae30"},LIMIT_REACHED_CONTENT:e=>oi()?`You can write up to ${e} reviews per person\nwithout a purchase history.`:`\uc8fc\ubb38\uc5c6\uc774 \uc791\uc131 \uac00\ub2a5\ud55c \ub9ac\ubdf0\ub294 1\uc778\ub2f9 \ucd5c\ub300 ${e}\uac1c\uc5d0\uc694.`,get UNVERIFIED_POSSIBLE_TITLE(){return oi()?"Have you used this product,\neven if you didn't buy it here?":"\uc8fc\ubb38\ud558\uc9c0\ub294 \uc54a\uc558\uc9c0\ub9cc\n\uc0c1\ud488 \uc0ac\uc6a9 \uacbd\ud5d8\uc774 \uc788\ub098\uc694?"},get WRITE_REVIEW(){return oi()?"Write Review":"\ub9ac\ubdf0 \uc791\uc131"},get UNVERIFIED_POSSIBLE_CONTENT(){return oi()?"You can also review products purchased offline\nor received as sponsored items.":"\uc624\ud504\ub77c\uc778\uc5d0\uc11c \uad6c\ub9e4\ud588\uac70\ub098, \ud611\ucc2c \ubc1b\uc740 \uc0c1\ud488\uc774 \uc788\uc744 \uacbd\uc6b0\uc5d0\ub3c4 \ub9ac\ubdf0\ub97c \uc791\uc131\ud560 \uc218 \uc788\uc5b4\uc694."}},PARSED_AVG_RATINGS:{get VERY_SATISFIED(){return oi()?"Very Satisfied":"\ub9e4\uc6b0 \ub9cc\uc871\ud55c\ub2e4"},get SATISFIED(){return oi()?"Satisfied":"\uaf64 \ub9cc\uc871\ud55c\ub2e4"},get FAIR(){return oi()?"Fair":"\uc0ac\uc6a9\ud560\ub9cc\ud558\ub2e4"},get POOR(){return oi()?"Poor":"\ub2e4\uc18c \uc544\uc27d\ub2e4"}},PRODUCT_NAME_PRICE:{get CURRENCY_WON(){return oi()?"":"\uc6d0"}},PRODUCT_RATING_COUNT:{REVIEW_COUNT_TEXT:e=>oi()?e+" Review":`\ub9ac\ubdf0 ${e} \uac1c`},AT_DATE:{get TODAY(){return oi()?"Today":"\uc624\ub298"},get YESTERDAY(){return oi()?"Yesterday":"\uc77c \uc804"},get ONE_WEEK_AGO(){return oi()?"1 week ago":"1\uc8fc \uc804"},get TWO_WEEKS_AGO(){return oi()?"2 weeks ago":"2\uc8fc \uc804"},get SUFFIX_WRITTEN(){return oi()?"":" \uc791\uc131"}},USER_INFO:{get USER_SUFFIX(){return oi()?"":"\ub2d8\uc774"},get VERIFIED_PURCHASE(){return oi()?"Verified Purchase":"\uc2e4\uad6c\ub9e4"},get NON_MEMBER(){return oi()?"Non-member":"\ube44\ud68c\uc6d0"}},PAGINATION_HANDLER:{get POLICY(){return oi()?"Operation Policy":"\uc6b4\uc601\uc815\ucc45"},get WRITE_REVIEW(){return oi()?"Write Review":"\ub9ac\ubdf0 \uc791\uc131"}},COMPLIANCE_GUIDE:{get TRIGGER(){return oi()?"Review Policy":"\ub9ac\ubdf0 \uc815\ucc45"},get CONTENT(){return oi()?{title:"Review Policy",sections:[{title:"Eligibility",detail:"Reviews may be submitted by customers (both members and non-members) who have completed a purchase of the product. Reviews may also be posted by the shopping mall operator. Reviews collected through external channels may be displayed with a separate indication of their source."},{title:"Retention Period",detail:"Submitted reviews will remain available until the product is discontinued or the reviewer withdraws their membership. Where required by applicable laws and regulations, reviews will be retained for the legally required period."},{title:"Review Ranking & Rating",detail:"The overall product rating is calculated as the arithmetic average of all submitted star ratings. The display order of reviews is determined by our system algorithm based on various factors, including star rating, review quality (such as text length and photo inclusion), submission date, and the number of \u201cHelpful\u201d votes received from other users."},{title:"Restriction & Removal",detail:"Reviews that contain abusive or defamatory language, promotional or spam content, content unrelated to the product, obscene or inappropriate material, false or fraudulent information, repeated or abnormal submissions, or content that infringes the rights of others or violates applicable laws or our operating policies may be restricted or removed."},{title:"Appeals",detail:"If your review has been restricted or removed and you wish to appeal the decision, you may contact our Customer Support (e.g., via 1:1 Inquiry). We will review your request and notify you of the outcome."}],close:"Close"}:{title:"\ub9ac\ubdf0 \uc218\uc9d1\xb7\ud45c\uc2dc \uad00\ub828 \uc548\ub0b4",sections:[{title:"\uac8c\uc2dc \uae30\uc900",detail:"\ubcf8 \uc0c1\ud488\uc758 \ud6c4\uae30\ub294 \uc2e4\uc81c \uad6c\ub9e4\ub97c \uc644\ub8cc\ud55c \uace0\uac1d(\ud68c\uc6d0 \ubc0f \ube44\ud68c\uc6d0)\uc774 \uc791\uc131\ud558\ub294 \uac83\uc744 \uc6d0\uce59\uc73c\ub85c \ud558\uba70, \uc1fc\ud551\ubab0 \uc6b4\uc601\uc790\ub3c4 \ub9ac\ubdf0\ub97c \uc791\uc131\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc678\ubd80 \uc5f0\ub3d9 \ucc44\ub110\uc744 \ud1b5\ud574 \uc218\uc9d1\ub41c \ub9ac\ubdf0\ub294 \ubcc4\ub3c4\uc758 \ud45c\uc2dc\uc640 \ud568\uaed8 \ub178\ucd9c\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4."},{title:"\uac8c\uc2dc \uae30\uac04",detail:"\uc791\uc131\ub41c \ub9ac\ubdf0\ub294 \uc0c1\ud488 \ud310\ub9e4 \uc885\ub8cc \ub610\ub294 \ud68c\uc6d0 \ud0c8\ud1f4 \uc2dc\uae4c\uc9c0 \ub178\ucd9c \ubc0f \ubcf4\uc874\ub429\ub2c8\ub2e4. \ub2e4\ub9cc, \uad00\uacc4 \ubc95\ub839\uc5d0 \ub530\ub77c \ubcf4\uc874\uc774 \ud544\uc694\ud55c \uacbd\uc6b0\uc5d0\ub294 \ud574\ub2f9 \uae30\uac04 \ub3d9\uc548 \ubcf4\uad00\ub429\ub2c8\ub2e4."},{title:"\uc815\ub82c \ubc0f \ud3c9\uac00",detail:"\uc804\uccb4 \ud3c9\uc810\uc740 \ub204\uc801 \ubcc4\uc810\uc758 \uc0b0\uc220\ud3c9\uade0\uc73c\ub85c \uacc4\uc0b0\ub429\ub2c8\ub2e4. \ub9ac\ubdf0\uc758 \ub178\ucd9c \uc21c\uc11c\ub294 \ubcc4\uc810, \ub9ac\ubdf0 \ub0b4\uc6a9\uc758 \ucda9\uc2e4\ub3c4(\uae00\uc790 \uc218, \uc0ac\uc9c4 \ud3ec\ud568 \uc5ec\ubd80 \ub4f1), \ub4f1\ub85d\uc77c, \ub2e4\ub978 \uc774\uc6a9\uc790\uc758 \u2018\ub3c4\uc6c0\ub3fc\uc694\u2019 \uc218 \ub4f1\uc744 \uc885\ud569\uc801\uc73c\ub85c \uace0\ub824\ud558\uc5ec \uc2dc\uc2a4\ud15c \uc54c\uace0\ub9ac\uc998\uc5d0 \uc758\ud574 \uacb0\uc815\ub429\ub2c8\ub2e4."},{title:"\uc81c\ud55c \ubc0f \uc0ad\uc81c",detail:"\uc695\uc124, \ube44\ubc29, \uad11\uace0\uc131 \uac8c\uc2dc\ubb3c, \uc0c1\ud488\uacfc \ubb34\uad00\ud55c \ub0b4\uc6a9, \uc74c\ub780\uc131 \ucf58\ud150\uce20, \ud5c8\uc704\xb7\ubd80\uc815 \ub9ac\ubdf0 \ub610\ub294 \ud0c0\uc778\uc758 \uad8c\ub9ac\ub97c \uce68\ud574\ud558\uac70\ub098 \ubc18\ubcf5\uc801\uc774\uac70\ub098 \ube44\uc815\uc0c1\uc801\uc778 \ub9ac\ubdf0 \ub4f1 \uad00\ub828 \ubc95\ub839\uc774\ub098 \uc6b4\uc601\uc815\ucc45\uc5d0 \uc704\ubc18\ub418\ub294 \ub9ac\ubdf0\ub294 \ub178\ucd9c\uc774 \uc81c\ud55c\ub418\uac70\ub098 \uc0ad\uc81c\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4."},{title:"\uc774\uc758\uc81c\uae30",detail:"\ubcf8\uc778\uc774 \uc791\uc131\ud55c \ub9ac\ubdf0\uc758 \ub178\ucd9c \uc81c\ud55c \ub610\ub294 \uc0ad\uc81c \uc870\uce58\uc5d0 \uc774\uc758\uac00 \uc788\ub294 \uacbd\uc6b0, \uc1fc\ud551\ubab0 \uace0\uac1d\uc13c\ud130(1:1 \ubb38\uc758 \ub4f1)\ub97c \ud1b5\ud574 \uc811\uc218\ud574 \uc8fc\uc2dc\uba74 \uac80\ud1a0 \ud6c4 \ucc98\ub9ac \uacb0\uacfc\ub97c \uc548\ub0b4\ud574 \ub4dc\ub9bd\ub2c8\ub2e4."}],close:"\ub2eb\uae30"}}},POLICY_POPUP:{get CONTENT(){return oi()?{title:"Review Management Policy",policy:{title:"Review Guidelines",list:["In accordance with our store policy, all reviews may be subject to moderation before publication.","Reviews that violate store policy may be subject to temporary measures, such as being hidden or restricted from posting.","Violations include inappropriate language, infringement of others' rights, or posts made for commercial or promotional purposes."]},notification:{title:"Review Notification Policy",desc:"You may receive notifications regarding your reviews via SMS, notification messages (e.g., AlimTalk), or email concerning the following:",list:["Reviews that violate store policy may be subject to temporary measures, such as being hidden or restricted from posting.","Violations include inappropriate language, infringement of others' rights, or posts made for commercial or promotional purposes.","Actions taken in accordance with the operation policy may be implemented without prior notice."]},close:"Close"}:{title:"\ub9ac\ubdf0 \uad00\ub828 \uc6b4\uc601\uc815\ucc45",policy:{title:"\ub9ac\ubdf0 \uc6b4\uc601 \uc815\ucc45",list:["\uc1fc\ud551\ubab0 \uc6b4\uc601 \ubc29\uce68\uc5d0 \ub530\ub77c \ubaa8\ub4e0 \ub9ac\ubdf0\ub294 \uac80\uc218 \ud6c4 \uac8c\uc2dc\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4.","\uc1fc\ud551\ubab0 \uc6b4\uc601 \ubc29\uce68\uc5d0 \uc704\ubc18\ub418\ub294 \uacbd\uc6b0, \ub9ac\ubdf0\ub294 \uc784\uc2dc \uc870\uce58(\uc608: \ube44\uacf5\uac1c \uc804\ud658, \uac8c\uc2dc \uc81c\ud55c \ub4f1)\uac00 \ucde8\ud574\uc9c8 \uc218 \uc788\uc2b5\ub2c8\ub2e4.","\uc704\ubc18 \uc0ac\uc720\uc5d0\ub294 \ubd80\uc801\uc808\ud55c \ud45c\ud604, \ud0c0\uc778 \uad8c\ub9ac \uce68\ud574, \uc0c1\uc5c5\uc801 \ubaa9\uc801\uc758 \ud64d\ubcf4\uc131 \uac8c\uc2dc\ubb3c \ub4f1\uc774 \ud3ec\ud568\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4.","\uc1fc\ud551\ubab0 \uc6b4\uc601 \ubc29\uce68\uc5d0 \ub530\ub77c \ubaa8\ub4e0 \ub9ac\ubdf0\ub294 \uac80\uc218 \ud6c4 \uac8c\uc2dc\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4."]},notification:{title:"\ub9ac\ubdf0 \uc54c\ub9bc \uc815\ucc45",desc:"\uace0\uac1d\ub2d8\uaed8\uc11c\ub294 \ub9ac\ubdf0 \uc774\uc6a9\uacfc \uad00\ub828\ud558\uc5ec SMS, \uc54c\ub9bc\ud1a1, \uc774\uba54\uc77c \ub4f1\uc73c\ub85c \uc544\ub798\uc640 \uac19\uc740 \uc548\ub0b4\ub97c \ubc1b\uc73c\uc2e4 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",list:["\uc1fc\ud551\ubab0 \uc6b4\uc601 \ubc29\uce68\uc5d0 \uc704\ubc18\ub418\ub294 \uacbd\uc6b0, \ub9ac\ubdf0\ub294 \uc784\uc2dc \uc870\uce58(\uc608: \ube44\uacf5\uac1c \uc804\ud658, \uac8c\uc2dc \uc81c\ud55c \ub4f1)\uac00 \ucde8\ud574\uc9c8 \uc218 \uc788\uc2b5\ub2c8\ub2e4.","\uc704\ubc18 \uc0ac\uc720\uc5d0\ub294 \ubd80\uc801\uc808\ud55c \ud45c\ud604, \ud0c0\uc778 \uad8c\ub9ac \uce68\ud574, \uc0c1\uc5c5\uc801 \ubaa9\uc801\uc758 \ud64d\ubcf4\uc131 \uac8c\uc2dc\ubb3c \ub4f1\uc774 \ud3ec\ud568\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4.","\uc6b4\uc601 \uc815\ucc45\uc5d0 \ub530\ub978 \uc870\uce58\ub294 \uc0ac\uc804 \uc548\ub0b4 \uc5c6\uc774 \uc774\ub8e8\uc5b4\uc9c8 \uc218 \uc788\uc2b5\ub2c8\ub2e4."]},close:"\ub2eb\uae30"}}}},FEATURES:{REVIEW_WRITE:{get WRITE_REVIEW(){return oi()?"Write review":"\ub9ac\ubdf0\uc791\uc131"}},LIKE_BUTTON:{get LIKE(){return oi()?"Like":"\ub3c4\uc6c0\ub3fc\uc694"}},REPORT_POPUP:{get REPORT(){return oi()?"Report":"\uc2e0\uace0/\ucc28\ub2e8"},get SURVEY_DATA(){return oi()?["Irrelevant to product","Privacy violation","Profanity or personal attacks","Spam / Duplicate content","Misinformation","Sexually explicit or suggestive content","Unwanted promotional content","Hate speech or graphic violence","Other"]:["\uc0c1\ud488\uacfc \ubb34\uad00\ud55c \ub0b4\uc6a9","\uac1c\uc778 \uc815\ubcf4 \ub178\ucd9c","\uc695\uc124/\uc778\uc2e0\uacf5\uaca9","\uac19\uc740 \ub0b4\uc6a9 \ub3c4\ubc30","\uc798\ubabb\ub41c \uc815\ubcf4","\uc74c\ub780 / \uc120\uc815\uc131","\uc6d0\ud558\uc9c0 \uc54a\ub294 \uc0c1\uc5c5\uc131 \uac8c\uc2dc\ubb3c","\uc99d\uc624\uc2ec \ud45c\ud604 \ub610\ub294 \ub178\uace8\uc801\uc778 \ud3ed\ub825","\uae30\ud0c0"]},get CONTENT(){return oi()?{headerTitle:"What seems to be the problem?",placeholder:"Please enter the details.",cancelButton:"Cancel",reportButton:"Report",successTitle:"Report submitted successfully.",successDesc:"Your report will be reviewed in accordance with our policies. Please note that we do not provide individual feedback on the outcome.",confirmButton:"Confirm",other:"Other"}:{headerTitle:"\uc5b4\ub5a4 \uc810\uc774 \ubd88\ud3b8\ud558\uc168\ub098\uc694?",placeholder:"\uc2e0\uace0 \ubc0f \ucc28\ub2e8 \ub0b4\uc6a9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.",cancelButton:"\ucde8\uc18c",reportButton:"\uc81c\ucd9c",successTitle:"\uc815\uc0c1\uc801\uc73c\ub85c \uc2e0\uace0 \ubc0f \ucc28\ub2e8 \uc811\uc218\ub418\uc5c8\uc5b4\uc694.",successDesc:"\uc1fc\ud551\ubab0 \uc774\uc6a9\uc57d\uad00 \ubc0f \uc6b4\uc601 \uc815\ucc45\uc5d0 \ub530\ub77c \uc21c\ucc28\uc801\uc73c\ub85c \ucc98\ub9ac\ub420 \uc608\uc815\uc774\uba70, \ucc98\ub9ac \uacb0\uacfc\ub294 \ubcc4\ub3c4\ub85c \ub2f5\ubcc0\uc744 \ub4dc\ub9ac\uc9c0 \uc54a\uc544\uc694.",confirmButton:"\ud655\uc778",other:"\uae30\ud0c0"}}},COMMENT_BUTTON:{get COMMENT(){return oi()?"Comment":"\ub313\uae00"}},REPORT_BUTTON:{get REPORT(){return oi()?"Report":"\uc2e0\uace0/\ucc28\ub2e8"},get LOGIN_MODAL_TITLE(){return oi()?"Please log in to report this review!":"\uc2e0\uace0/\ucc28\ub2e8\uc744 \uc6d0\ud558\uc2e0\ub2e4\uba74,\n\ub85c\uadf8\uc778\ud574 \uc8fc\uc138\uc694!"},get LOGIN(){return oi()?"Login":"\ub85c\uadf8\uc778"},get CLOSE(){return oi()?"Close":"\ub2eb\uae30"}},REVIEW_CONTENT:{get MORE(){return oi()?"More":"\ub354\ubcf4\uae30"},get LESS(){return oi()?"Less":"\uc811\uae30"}},REVIEW_INFO:{get OPTION(){return oi()?"Option":"\uc635\uc158"}},SELECTOR_OPTION:{get APPLY(){return oi()?"Apply":"\ud544\ud130 \uc801\uc6a9"},get POINT(){return oi()?"Point":"\uc810"}}},WIDGETS:{TICKER:{DETAIL:{get VIEWING(){return oi()?"people viewed this product":"\uc0c1\ud488\uc744 \uc870\ud68c\ud588\uc5b4\uc694!"},get RATED(){return oi()?"rated this product as Very Satisfied.":"\ub9e4\uc6b0 \ub9cc\uc871\ud588\uc5b4\uc694!"},get CART(){return oi()?"added this to their cart.":"\uc7a5\ubc14\uad6c\ub2c8\uc5d0 \ub2f4\uc558\uc5b4\uc694!"},get ORDERING(){return oi()?"Order Placed":"\uc8fc\ubb38 \uc644\ub8cc!"},get PEOPLE_SUFFIX(){return oi()?"people":"\uba85"},get KOREAN_SUFFIX(){return oi()?"":"\uc774"}},MAIN:{get VIEWED(){return oi()?"viewed this item!":"\uc870\ud68c\ud558\uace0 \uad81\uae08\ud574\ud558\ub358 \uc0c1\ud488!"},get RATED(){return oi()?"rated this item as satisfied!":"\ub9cc\uc871\ud55c\ub2e4\uace0 \ud3c9\uc744 \ub0a8\uae34 \uc0c1\ud488!"},get CART(){return oi()?"added this item to their cart!":"\uc7a5\ubc14\uad6c\ub2c8\uc5d0 \ub2f4\uc558\ub358 \uc0c1\ud488!"},get ORDERING(){return oi()?"are currently ordering this item":"\uc8fc\ubb38\ud558\uace0 \uc788\ub294 \uc0c1\ud488!"},get PEOPLE_SUFFIX(){return oi()?"people":"\uba85"},get KOREAN_SUFFIX(){return oi()?"":"\uc774"}}},LOGIN_POPUP:{get TITLE(){return oi()?"How was this product?":"\uc774 \uc0c1\ud488 \uc5b4\ub5a0\uc168\ub098\uc694?"},get DESCRIPTION(){return oi()?"Leave a review with just one click!":"\ud55c\ubc88 \ud074\ub9ad\uc73c\ub85c \ubc14\ub85c \ub9ac\ubdf0\ub97c \ub0a8\uae38 \uc218 \uc788\uc5b4\uc694!"}},DETAIL_BANNER:{get WRITE_REVIEW(){return oi()?"Write review":"\ub9ac\ubdf0\uc791\uc131"}},BOARD_GALLERY:{FILTER:{get RECENT_REVIEW_COUNT(){return oi()?"Most Reviewed Recently":"\ucd5c\uadfc \ub9ac\ubdf0 \ub9ce\uc740\uc21c"},get REVIEW_COUNT(){return oi()?"Most Reviewed":"\ub9ac\ubdf0 \ub9ce\uc740\uc21c"},get REVIEW_RATING(){return oi()?"Highest Rated":"\ub9ac\ubdf0 \ud3c9\uc810\uc21c"},get PRODUCT_NAME(){return oi()?"Product Name":"\uc0c1\ud488 \uc774\ub984\uc21c"},get RECENT_REVIEW(){return oi()?"Newest Reviews":"\ucd5c\uc2e0 \ub9ac\ubdf0\uc21c"},get RECENT_PRODUCT(){return oi()?"Newest Arrivals":"\ucd5c\uc2e0 \uc0c1\ud488\uc21c"},get RECENT_SALES(){return oi()?"Best Selling":"\ucd5c\uadfc \ud310\ub9e4\ub7c9\uc21c"}},WIDGET:{get PRICE_UNIT(){return oi()?"":"\uc6d0"},get REVIEW_UNIT(){return oi()?"Review":"\uac1c"},get REVIEW_PREFIX(){return oi()?"":"\ub9ac\ubdf0 "}}},DETAIL_POPUP:{get COMMENT_TAG(){return oi()?"":"\uc62c\ub9bc"},get MORE(){return oi()?"More":"\ub354\ubcf4\uae30"},get LESS(){return oi()?"Less":"\uc811\uae30"},get OTHER_REVIEWS(){return oi()?"Other reviews":"\ub2e4\ub978 \ub9ac\ubdf0\ub3c4 \uad6c\uacbd\ud574 \ubcf4\uc138\uc694"},get NEXT(){return oi()?"Next":"\ub2e4\uc74c \ub9ac\ubdf0"},get PREV(){return oi()?"Previous":"\uc774\uc804 \ub9ac\ubdf0"},get EMPTY_MEDIA(){return oi()?"There are no photo & video reviews.\nCheck out other reviews.":"\ud3ec\ud1a0&\ub3d9\uc601\uc0c1\uc774 \uc5c6\ub294 \ub9ac\ubdf0\uc5d0\uc694.\n\ub2e4\ub978 \ub9ac\ubdf0\ub3c4 \ub458\ub7ec\ubcf4\uc138\uc694."},get CART(){return oi()?"Add to cart":"\uc7a5\ubc14\uad6c\ub2c8"},get BUY(){return oi()?"Buy now":"\uad6c\ub9e4\ud558\uae30"},get VIEW_PRODUCT_DETAIL(){return oi()?"View product details":"\uc0c1\ud488 \uc790\uc138\ud788 \uc54c\uc544\ubcf4\uae30"},get SOLD_OUT(){return oi()?"Sold out":"\ud488\uc808"},OPTION_DIALOG:{get TITLE(){return oi()?"Please select options":"\uc635\uc158\uc744 \uc120\ud0dd\ud574 \uc8fc\uc138\uc694"},get REQUIRED(){return oi()?"Required":"\ud544\uc218"},get OPTIONAL(){return oi()?"Optional":"\uc120\ud0dd"},get VALUE_SOLD_OUT(){return oi()?"(Sold out)":"(\ud488\uc808)"},get SUBMIT_CART(){return oi()?"Add to cart":"\uc7a5\ubc14\uad6c\ub2c8 \ub2f4\uae30"},get SUBMIT_BUY(){return oi()?"Buy now":"\ubc14\ub85c \uad6c\ub9e4\ud558\uae30"},get CLOSE(){return oi()?"Close":"\ub2eb\uae30"},get AMOUNT_TOTAL(){return oi()?"Option surcharge":"\uc635\uc158 \ucd94\uac00\uae08\uc561"},get TOTAL_ESTIMATED(){return oi()?"Estimated total":"\uc608\uc0c1 \uacb0\uc81c\uae08\uc561"},PRICE:e=>oi()?e.toLocaleString():e.toLocaleString()+"\uc6d0",ADDITIONAL_AMOUNT:e=>{if(0===e)return"";const t=e>0?"+":"";return oi()?`(${t}${e.toLocaleString()})`:`(${t}${e.toLocaleString()}\uc6d0)`}},get CART_SUCCESS_CONFIRM(){return oi()?"Added to cart! Would you like to go to the cart page?":"\uc7a5\ubc14\uad6c\ub2c8 \ub2f4\uae30 \uc644\ub8cc! \uc7a5\ubc14\uad6c\ub2c8 \ud398\uc774\uc9c0\ub85c \uc774\ub3d9\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?"},PURCHASE_ERROR:{get FALLBACK(){return oi()?"The request could not be completed. Please try again.":"\uc694\uccad\uc744 \ucc98\ub9ac\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694."},get COMMON_LOAD_FAILED(){return oi()?"Failed to load required resources. Please refresh and try again.":"\ud544\uc694\ud55c \ub9ac\uc18c\uc2a4\ub97c \ubd88\ub7ec\uc624\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4. \uc0c8\ub85c\uace0\uce68 \ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694."},get NO_CLIENT(){return oi()?"Cannot connect to the shop. Please refresh and try again.":"\uc1fc\ud551\ubab0\uacfc \uc5f0\uacb0\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc0c8\ub85c\uace0\uce68 \ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694."},get UNAUTHORIZED(){return oi()?"Product information is temporarily unavailable. Please try again later.":"\uc0c1\ud488 \uc815\ubcf4\ub97c \uc870\ud68c\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc7a0\uc2dc \ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694."},get NOT_FOUND(){return oi()?"This product could not be found.":"\uc0c1\ud488 \uc815\ubcf4\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4."},get RATE_LIMITED(){return oi()?"Too many requests. Please try again in a moment.":"\uc694\uccad\uc774 \ub9ce\uc2b5\ub2c8\ub2e4. \uc7a0\uc2dc \ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694."},get CART_FAILED(){return oi()?"Failed to add to cart. Please try again.":"\uc7a5\ubc14\uad6c\ub2c8\uc5d0 \ub2f4\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694."},get SHIPPING_FEE_CONFLICT_PREPAID(){return oi()?"Your cart already contains items with prepaid shipping.\n\nPlease empty the cart, or select prepaid shipping for this item.":"\uc7a5\ubc14\uad6c\ub2c8\uc5d0 \ubc30\uc1a1\ube44 \uc120\uacb0\uc81c \uc0c1\ud488\uc774 \uc788\uc2b5\ub2c8\ub2e4.\n\n\uc7a5\ubc14\uad6c\ub2c8\ub97c \ube44\uc6b0\uac70\ub098, \ubc30\uc1a1\ube44\ub97c \uc120\uacb0\uc81c\ub85c \uc120\ud0dd\ud574 \uc8fc\uc138\uc694."},get SHIPPING_FEE_CONFLICT_COLLECT(){return oi()?"Your cart already contains items with collect-on-delivery shipping.\n\nPlease empty the cart, or select collect-on-delivery shipping for this item.":"\uc7a5\ubc14\uad6c\ub2c8\uc5d0 \ubc30\uc1a1\ube44 \ucc29\ubd88 \uc0c1\ud488\uc774 \uc788\uc2b5\ub2c8\ub2e4.\n\n\uc7a5\ubc14\uad6c\ub2c8\ub97c \ube44\uc6b0\uac70\ub098, \ubc30\uc1a1\ube44\ub97c \ucc29\ubd88\ub85c \uc120\ud0dd\ud574 \uc8fc\uc138\uc694."},get FETCH_FAILED(){return oi()?"Failed to load product information. Please try again.":"\uc0c1\ud488 \uc815\ubcf4\ub97c \ubd88\ub7ec\uc624\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694."},get REQUIRED_NOT_PICKED(){return oi()?"Please select all required options.":"\ud544\uc218 \uc635\uc158\uc744 \uc120\ud0dd\ud574 \uc8fc\uc138\uc694."},get NO_MATCHING_VARIANT(){return oi()?"This option combination is unavailable.":"\uc120\ud0dd\ud560 \uc218 \uc5c6\ub294 \uc635\uc158 \uc870\ud569\uc785\ub2c8\ub2e4."},get NOT_SELLABLE(){return oi()?"This option is sold out.":"\ud488\uc808\ub41c \uc635\uc158\uc785\ub2c8\ub2e4."},get REQUIRED_EMPTY(){return oi()?"Please fill in all required fields.":"\ud544\uc218 \uc785\ub825 \ud56d\ubaa9\uc744 \uc785\ub825\ud574 \uc8fc\uc138\uc694."},get TOO_LONG(){return oi()?"The entered text is too long.":"\uc785\ub825\ud55c \ub0b4\uc6a9\uc774 \ub108\ubb34 \uae41\ub2c8\ub2e4."},get NAME_HAS_SEMICOLON(){return oi()?"This option cannot be processed. Please contact the shop.":"\ucc98\ub9ac\ud560 \uc218 \uc5c6\ub294 \uc635\uc158\uc785\ub2c8\ub2e4. \uc1fc\ud551\ubab0\uc5d0 \ubb38\uc758\ud574 \uc8fc\uc138\uc694."},get HOST_BUSY(){return oi()?"Another request is in progress. Please try again in a moment.":"\ub2e4\ub978 \uc694\uccad\uc774 \uc9c4\ud589 \uc911\uc785\ub2c8\ub2e4. \uc7a0\uc2dc \ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694."},get INJECT_FAILED(){return oi()?"Failed to apply the selected options. Please try again.":"\uc120\ud0dd\ud55c \uc635\uc158\uc744 \uc801\uc6a9\ud558\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694."},get PRODUCT_SOLD_OUT(){return oi()?"This product is sold out.":"\ud488\uc808\ub41c \uc0c1\ud488\uc785\ub2c8\ub2e4."},get PRODUCT_UNAVAILABLE(){return oi()?"This product is currently unavailable.":"\ud604\uc7ac \uad6c\ub9e4\ud560 \uc218 \uc5c6\ub294 \uc0c1\ud488\uc785\ub2c8\ub2e4."},get SELECTION_CLEARED(){return oi()?"\n\nThe items you had selected on this page have been cleared. Please select them again.":"\n\n\uc774 \ud398\uc774\uc9c0\uc5d0\uc11c \ub2f4\uc544\ub450\uc2e0 \ud56d\ubaa9\uc740 \ucd08\uae30\ud654\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc120\ud0dd\ud574 \uc8fc\uc138\uc694."}}},BRIEFING:{get RATING(){return oi()?"Rating":"\ub9cc\uc871\ub3c4"},get BROWSE_REVIEWS_BY_QUESTION(){return oi()?"Browse reviews by":"\ubcc4 \ub9ac\ubdf0\ub97c \ucc3e\uc544\ubcfc\uae4c\uc694?"},get BROWSE_REVIEWS_BY(){return oi()?"Browse reviews by":"\ubcc4 \ub9ac\ubdf0 \ucc3e\uae30"},get FILTER(){return oi()?"Filter":"\ub9de\ucda4 \ud544\ud130"},get SELECT_OPTION(){return oi()?"Please select an option.":"\uc635\uc158\uc744 \uc120\ud0dd\ud574 \uc8fc\uc138\uc694."},get REVIEWS_FOR_ME(){return oi()?"Reviews for me":"\ub098\uc5d0\uac8c \ub9de\ub294 \ub9ac\ubdf0 \ubcf4\uae30"},get RESET(){return oi()?"Reset":"\ucd08\uae30\ud654"},get APPLY(){return oi()?"Apply":"\ud544\ud130 \uc801\uc6a9"},get POINT(){return oi()?"Point":"\uc810"},get STATS_OVERVIEW(){return oi()?"Stats Overview":"\ud1b5\uacc4 \uc694\uc57d"},get VIEW_ALL(){return oi()?"View All":"\uc804\uccb4 \ubcf4\uae30"},get TOTAL_REVIEWS_PREFIX(){return oi()?"Total":"\ucd1d"},RATING_LABELS:{get EXCELLENT(){return oi()?"Excellent":"\ub9e4\uc6b0 \ub9cc\uc871"},get GOOD(){return oi()?"Good":"\ub9cc\uc871"},get AVERAGE(){return oi()?"Average":"\ubcf4\ud1b5"},get FAIR(){return oi()?"Fair":"\uadf8\uc800\uadf8\ub798\uc694"},get POOR(){return oi()?"Poor":"\uc544\uc26c\uc6cc\uc694"}}},CHAT:{get RATED_PREFIX(){return oi(),""},get RATED_SUFFIX(){return oi()?"customers rated this as":"\uba85\uc774"},get RATED_END(){return oi()?".":"\uace0 \ud3c9\uac00\ud588\uc5b4\uc694."},get NON_MEMBER(){return oi()?"Non-member":"\ube44\ud68c\uc6d0"}},STORY:{get VIEW_PRODUCT(){return oi()?"View Product":"\ubc14\ub85c\uac00\uae30"},get CLOSE(){return oi()?"Close":"\uc811\uae30"},get USER_REVIEW_SUFFIX(){return oi()?"'s review":"\ub2d8\uc774 \uc791\uc131\ud55c \ub9ac\ubdf0"},get WRITE_REVIEW(){return oi()?"Write Review":"\ub9ac\ubdf0 \uc791\uc131"},get NO_MEDIA_MESSAGE_1(){return oi()?"This review has no photos or videos.":"\ud3ec\ud1a0&\ub3d9\uc601\uc0c1\uc774 \uc5c6\ub294 \ub9ac\ubdf0\uc5d0\uc694."},get NO_MEDIA_MESSAGE_2(){return oi()?"Tap the text area to":"\ud14d\uc2a4\ud2b8 \uc601\uc5ed\uc744 \ud0ed\ud574\uc11c"},get NO_MEDIA_MESSAGE_3(){return oi()?"check the review!":"\ub9ac\ubdf0\ub97c \ud655\uc778\ud558\uc138\uc694!"}},KEYWORD:{get SUMMARY_TITLE(){return oi()?"One-line Summary":"\uc0c1\ud488\uc744 \ud55c \uc904\ub85c \uc694\uc57d\ud55c\ub2e4\uba74?"},get WORD_FROM_CUSTOMERS(){return oi()?"Word from Customers":"\uace0\uac1d\uc758 \ud55c \ub9c8\ub514"},get VERIFIED(){return oi()?"Verified":"\uad6c\ub9e4\uc778\uc99d"}},HIGHLIGHT:{get REVIEWS(){return oi()?"Reviews":"\uac1c \ub9ac\ubdf0"},get CUSTOMERS(){return oi()?"customers":"\uba85\uc758 \uad6c\ub9e4\uc790\uac00 \ub9cc\uc871\ud588\uc5b4\uc694!"},get WRITE_REVIEW(){return oi()?"Write review":"\ub9ac\ubdf0\uc791\uc131"},get GUIDE_TEXT(){return oi()?"Please share your experience with this product!":"\uc0c1\ud488\uc5d0 \ub300\ud55c \ub2f9\uc2e0\uc758 \uc18c\uc911\ud55c \uacbd\ud5d8\uc744 \uacf5\uc720\ud574 \uc8fc\uc138\uc694!"}},FLOATING:{get VIEW_PRODUCT(){return oi()?"View Product":"\uc0c1\ud488 \ubcf4\ub7ec\uac00\uae30"}},BOARD:{get RESET(){return oi()?"Reset":"\ud544\ud130 \uc804\uccb4 \ucd08\uae30\ud654"},get OPTION(){return oi()?"Option":"\uc635\uc158\uba85"},get COMMENT_TAG(){return oi()?"":"\uc62c\ub9bc"},get PHOTOS_VIDEOS(){return oi()?"Photos & Videos":"\ud3ec\ud1a0&\ub3d9\uc601\uc0c1"},get SEARCH_PLACEHOLDER(){return oi()?"Search":"\uc9c1\uc811\uac80\uc0c9"},get SORT_NEWEST(){return oi()?"Newest":"\ucd5c\uc2e0\uc21c"},get SORT_HIGHEST_RATING(){return oi()?"Highest Rated":"\ud3c9\uc810\ub192\uc740\uc21c"},get SORT_LOWEST_RATING(){return oi()?"Lowest Rated":"\ud3c9\uc810\ub0ae\uc740\uc21c"},get WRITE_REVIEW(){return oi()?"Write Review":"\ub9ac\ubdf0 \uc791\uc131"},AI_SUMMARY:{summary:e=>oi()?`AI summary: ${e}% of recent customers were satisfied.`:`AI \uc694\uc57d \uacb0\uacfc, \ucd5c\uadfc ${e}%\uc758 \uace0\uac1d\uc774 \ub9cc\uc871\ud588\uc5b4\uc694.`,get DEFAULT_SUMMARY(){return oi()?"Here is the AI summary of the product.":"AI\uac00 \uc0c1\ud488\uc5d0 \ub300\ud574 \uc774\ub807\uac8c \uc694\uc57d\ud588\uc5b4\uc694."},get GOOD(){return oi()?"What customers liked":"\uc88b\uc558\ub358 \uc810"},get CAUTION(){return oi()?"Worth noting":"\ucc38\uace0\ud560 \uc810"},get NOTICE(){return oi()?"Based on verified purchase reviews from the last 3 months.":"\ucd5c\uadfc 3\uac1c\uc6d4 \uae30\uc900\uc73c\ub85c \uc2e4\uad6c\ub9e4 \ub9ac\ubdf0\ub97c \uc120\ubcc4\ud574 \ubd84\uc11d\ud55c \uacb0\uacfc\uc5d0\uc694."},get TOOLTIP(){return oi()?"Summarized by AI from reviews written in the last 3 months. Only verified purchase reviews that passed quality and reliability checks were analyzed. As an automatic summary, some wording may be inaccurate or awkward.":"\ucd5c\uadfc 3\uac1c\uc6d4\uac04 \uc791\uc131\ub41c \ub9ac\ubdf0\ub97c AI\uac00 \uc694\uc57d\ud55c \ub0b4\uc6a9\uc774\uc5d0\uc694. \uc2e4\uc81c \uad6c\ub9e4 \uace0\uac1d \ub9ac\ubdf0 \uc911 \ud488\uc9c8\xb7\uc2e0\ub8b0\ub3c4 \uae30\uc900\uc744 \ud1b5\uacfc\ud55c \ub9ac\ubdf0\ub9cc \uc120\ubcc4\ud574 \ubd84\uc11d\ud588\uc5b4\uc694. \uc790\ub3d9 \uc694\uc57d \ud2b9\uc131\uc0c1 \uc77c\ubd80 \ud45c\ud604\uc774 \ubd80\uc815\ud655\ud558\uac70\ub098 \uc5b4\uc0c9\ud560 \uc218 \uc788\uc5b4\uc694."},get TOOLTIP_TITLE(){return oi()?"How was this summarized?":"\uc5b4\ub5a4 \uae30\uc900\uc73c\ub85c \uc694\uc57d\ud588\ub098\uc694?"},get TOOLTIP_ITEMS(){return oi()?["Summarized by AI from reviews written in the last 3 months.","Only verified purchase reviews that passed quality and reliability checks were analyzed.","As an automatic summary, some wording may be inaccurate or awkward."]:["\ucd5c\uadfc 3\uac1c\uc6d4\uac04 \uc791\uc131\ub41c \ub9ac\ubdf0\ub97c AI\uac00 \uc694\uc57d\ud55c \ub0b4\uc6a9\uc774\uc5d0\uc694.","\uc2e4\uc81c \uad6c\ub9e4 \uace0\uac1d \ub9ac\ubdf0 \uc911 \ud488\uc9c8\xb7\uc2e0\ub8b0\ub3c4 \uae30\uc900\uc744 \ud1b5\uacfc\ud55c \ub9ac\ubdf0\ub9cc \uc120\ubcc4\ud574 \ubd84\uc11d\ud588\uc5b4\uc694.","\uc790\ub3d9 \uc694\uc57d \ud2b9\uc131\uc0c1 \uc77c\ubd80 \ud45c\ud604\uc774 \ubd80\uc815\ud655\ud558\uac70\ub098 \uc5b4\uc0c9\ud560 \uc218 \uc788\uc5b4\uc694."]}}},NOTICE:{get NOTICE(){return oi()?"Notice":"\uacf5\uc9c0"},get EVENT(){return oi()?"Event":"\uc774\ubca4\ud2b8"}},SNS_SHORT:{RELATED_PRODUCTS_VIEW:e=>oi()?`View ${e} products`:`\uc5f0\uad00 \uc0c1\ud488 ${e}\uac1c \ubcf4\uae30`,RELATED_PRODUCTS_TITLE:e=>oi()?"Related Products "+e:"\uc5f0\uad00 \uc0c1\ud488 "+e,get MORE(){return oi()?"More":"\ub354\ubcf4\uae30"},get LESS(){return oi()?"Less":"\uc811\uae30"},get CLOSE(){return oi()?"Close":"\ub2eb\uae30"},get VIEW_PRODUCT(){return oi()?"View Product":"\ubc14\ub85c\uac00\uae30"},get SOUND_ON(){return oi()?"Unmute":"\uc18c\ub9ac \ucf1c\uae30"},get SOUND_OFF(){return oi()?"Mute":"\uc18c\ub9ac \ub044\uae30"}}}};var ni=Object.defineProperty,ai=Object.getOwnPropertyDescriptor,pi=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ai(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ni(t,i,s),s};let li=class extends ht{constructor(){super(...arguments),this.createDate=new Date,this.color="var(--alp-review-text-gray50)",this.fontSizeClassSmall="alp-caption11",this.fontSizeClassMedium="alp-body12",this.fontSizeClassLarge="alp-body13",this.fontWeight="500"}createRenderRoot(){return this}render(){const e=this.createDate instanceof Date?this.createDate:new Date(this.createDate),t=e=>new Date(e.getFullYear(),e.getMonth(),e.getDate()),i=t(new Date),r=t(e),o=Math.floor((i.getTime()-r.getTime())/864e5);let s="",n=si.SHARED.AT_DATE.SUFFIX_WRITTEN;if(oi())if(0===o)s=si.SHARED.AT_DATE.TODAY;else if(o>=1&&o<7)s=""+o+si.SHARED.AT_DATE.YESTERDAY;else if(o>=7&&o<14)s=si.SHARED.AT_DATE.ONE_WEEK_AGO;else if(o>=14&&o<21)s=si.SHARED.AT_DATE.TWO_WEEKS_AGO;else{const t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],i=e.getFullYear();s=`${t[e.getMonth()]} ${e.getDate()}, ${i}`}else s=0===o?si.SHARED.AT_DATE.TODAY:o>=1&&o<7?""+o+si.SHARED.AT_DATE.YESTERDAY:o>=7&&o<14?si.SHARED.AT_DATE.ONE_WEEK_AGO:o>=14&&o<21?si.SHARED.AT_DATE.TWO_WEEKS_AGO:`${(e.getFullYear()+"").slice(-2)}.${(e.getMonth()+1+"").padStart(2,"0")}.${(e.getDate()+"").padStart(2,"0")}`;return Je`
      <style>.at-date-container { display: none; color: ${this.color}; font-weight: ${this.fontWeight}; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; } @media (max-width: 439px) { .at-date-container--sm { display: block; } } @media (min-width: 440px) and (max-width: 839px) { .at-date-container--md { display: block; } } @media (min-width: 840px) { .at-date-container--lg { display: block; } }</style>
      <p class="at-date-container at-date-container--sm ${this.fontSizeClassSmall}">
        ${s}${n}
      </p>
      <p class="at-date-container at-date-container--md ${this.fontSizeClassMedium}">
        ${s}${n}
      </p>
      <p class="at-date-container at-date-container--lg ${this.fontSizeClassLarge}">
        ${s}${n}
      </p>
    `}};pi([i({type:Date})],li.prototype,"createDate",2),pi([i({type:String})],li.prototype,"color",2),pi([i({type:String})],li.prototype,"fontSizeClassSmall",2),pi([i({type:String})],li.prototype,"fontSizeClassMedium",2),pi([i({type:String})],li.prototype,"fontSizeClassLarge",2),pi([i({type:String})],li.prototype,"fontWeight",2),li=pi([ae("review-at-date")],li);var di=Object.defineProperty,ci=Object.getOwnPropertyDescriptor,hi=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ci(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&di(t,i,s),s};let gi=class extends ht{constructor(){super(...arguments),this.type="custom",this.label="",this.bgColor="var(--alp-review-card-gray05, rgba(30, 41, 59, 0.05))",this.borderColor="transparent",this.color="var(--alp-review-text-gray80, rgba(30, 41, 59, 0.80))",this.fontSizeClassSmall="alp-caption11",this.fontSizeClassMedium="alp-body12",this.fontSizeClassLarge="alp-body13",this.fontWeightClass="alp-semi-bold",this.verifiedText=oi()?"Verified":"\uad6c\ub9e4 \uc778\uc99d"}createRenderRoot(){return this}render(){return Je`
      <style>.badge-container { padding: ${"verified"===this.type?"4px 8px 3px 8px":"3px 8px"}; border-radius: 2px; width: fit-content; font-weight: ${"verified"===this.type?"600":"400"}; white-space: nowrap; display: none; } @media (max-width: 439px) { .badge-container--sm { display: flex; } } @media (min-width: 440px) and (max-width: 839px) { .badge-container--md { display: flex; } } @media (min-width: 840px) { .badge-container--lg { display: flex; } }</style>

      <div
        class="badge-container badge-container--sm ${this.fontSizeClassMedium} ${this.fontWeightClass}"
        style="
          border: 1px solid ${this.borderColor} !important;
          background-color: ${this.bgColor} !important; 
          color: ${this.color} !important;
        "
      >
        ${"verified"===this.type?this.verifiedText:this.label}
      </div>
      <div
        class="badge-container badge-container--md ${this.fontSizeClassMedium} ${this.fontWeightClass}"
        style="
          border: 1px solid ${this.borderColor} !important;
          background-color: ${this.bgColor} !important; 
          color: ${this.color} !important;
        "
      >
        ${"verified"===this.type?this.verifiedText:this.label}
      </div>
      <div
        class="badge-container badge-container--lg ${this.fontSizeClassLarge} ${this.fontWeightClass}"
        style="
          border: 1px solid ${this.borderColor} !important;
          background-color: ${this.bgColor} !important; 
          color: ${this.color} !important;
        "
      >
        ${"verified"===this.type?this.verifiedText:this.label}
      </div>
    `}};hi([i({type:String})],gi.prototype,"type",2),hi([i({type:String})],gi.prototype,"label",2),hi([i({type:String})],gi.prototype,"bgColor",2),hi([i({type:String})],gi.prototype,"borderColor",2),hi([i({type:String})],gi.prototype,"color",2),hi([i({type:String})],gi.prototype,"fontSizeClassSmall",2),hi([i({type:String})],gi.prototype,"fontSizeClassMedium",2),hi([i({type:String})],gi.prototype,"fontSizeClassLarge",2),hi([i({type:String})],gi.prototype,"fontWeightClass",2),gi=hi([ae("review-badge")],gi);var ui=Object.defineProperty,wi=Object.getOwnPropertyDescriptor,vi=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?wi(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ui(t,i,s),s};let mi=class extends ht{constructor(){super(...arguments),this.isShowCount=!0,this.code=Math.random().toString(36).slice(2,9),this.timeout=5}createRenderRoot(){return this}get countSlides(){return Array.from({length:Math.max(1,Math.round(this.timeout??5))},(e,t)=>t+1)}initialBtnSwiper(e){const t=this.countSlides.length;this._swiper=n({container:this.querySelector("#sw-btn-"+this.code),styleRoot:this,options:{direction:"vertical",slidesPerView:1,spaceBetween:0,loop:"ticker"===e,watchOverflow:!0,simulateTouch:!1,initialSlide:0,speed:300,autoplay:{delay:1e3,disableOnInteraction:!0,waitForTransition:!0,reverseDirection:"ticker"!==e},init:!1,observer:!0,observeParents:!0},event:{init:e=>{e.autoplay?.stop?.();try{e.slideTo(t-1,10,!1)}catch{}setTimeout(()=>e.autoplay?.start?.(),1e3)},slideChange:e=>{0===e.activeIndex&&setTimeout(()=>{e.autoplay?.stop?.(),this.isShowCount=!1,this.dispatchEvent(new CustomEvent("review:countdownEnd",{bubbles:!0,composed:!0}))},1e3)}}}),requestAnimationFrame(()=>this._swiper?.init?.())}async firstUpdated(e){super.firstUpdated(e),(this.timeout??5)<1?this.isShowCount=!1:window?.CUSTOM_SWIPER?.swiper?requestAnimationFrame(()=>{this.initialBtnSwiper("btn")}):await p(()=>{requestAnimationFrame(()=>{this.initialBtnSwiper("btn")})})}clickCloseBtn(){this.dispatchEvent(new CustomEvent("review:clickCloseBtn",{bubbles:!0,composed:!0}))}render(){return Je`
      <style>.count-down-btn { min-width: 28px; max-width: 28px; min-height: 28px; max-height: 28px; border-radius: 50%; margin: auto 0; margin-left: auto; display: flex; align-items: center; justify-content: center; } .count-down-btn__rolling-btn { opacity: 0; animation: alpFadeUp 500ms 750ms cubic-bezier(0.4, 0, 0.2, 1) forwards; background: var(--alp-review-card-gray100); color: var(--alp-review-text-white); } .count-down-btn__x-btn { opacity: 1 !important; background-color: var(--alp-review-bg-gray100); cursor: pointer; animation: alpChangeBG 150ms ease-in forwards !important; will-change: background-color; } @keyframes alpChangeBG { from { background-color: var(--alp-review-bg-gray100); } to { background-color: var(--alp-review-card-gray07); } } .btn-container { overflow: hidden; height: 28px; } .btn-slide { width: 100%; color: var(--alp-review-text-white); display: flex; align-items: center; justify-content: center; }</style>

      ${this.isShowCount?Je`
            <div class="count-down-btn count-down-btn__rolling-btn">
              <div id="sw-btn-${this.code}" class="swiper-container btn-container">
                <div class="swiper-wrapper">
                  ${this.countSlides.map(e=>Je`
                      <p class="swiper-slide alp-body13 alp-bold btn-slide">${e}</p>
                    `)}
                </div>
              </div>
            </div>
          `:Je`
            <div class="count-down-btn count-down-btn__x-btn" @click=${this.clickCloseBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="9"
                viewBox="0 0 10 9"
                fill="none"
              >
                <path
                  d="M9 0.5L1 8.5M1 0.5L9 8.5"
                  stroke="var(--alp-review-text-gray100)"
                  stroke-opacity="0.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          `}
    `}};vi([i({type:Boolean})],mi.prototype,"isShowCount",2),vi([i({type:String})],mi.prototype,"code",2),vi([i({type:Number})],mi.prototype,"timeout",2),mi=vi([ae("review-count-down-button")],mi);var yi=Object.defineProperty,fi=Object.getOwnPropertyDescriptor,bi=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?fi(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&yi(t,i,s),s};let xi=class extends ht{constructor(){super(...arguments),this.number=0,this.duration=0,this.stagger=80,this.decel=1e3,this.speed=10,this.extraLoopsBase=0,this.extraLoopsStep=.6,this.autoplay=!0,this._digits=[],this._reelCount=0,this._cellH=0,this._pos=[],this._spd=[],this._phase=[],this._slowStart=[],this._slowFrom=[],this._slowTo=[],this._ro=null,this._startedAt=0,this._lastTs=0,this._raf=null,this._tick=e=>{const t=Math.min(.048,(e-this._lastTs)/1e3);this._lastTs=e;const i=10*xi.REPEAT;for(let r=0;r<this._reelCount;r++){const o=this._phase[r],s=this._animStartTimeForDigit(r);if("spin"===o&&e>=s){const t=this._pos[r],i=this._digits[r],o=this.extraLoopsBase+(this._reelCount-1-r)*this.extraLoopsStep;let s=10*Math.max(0,Math.ceil(t/10)+Math.ceil(o))+i;r===this._reelCount-1&&0===i&&(s+=10),s<=t&&(s+=10),this._slowStart[r]=e,this._slowFrom[r]=t,this._slowTo[r]=s,this._phase[r]="slow"}if("spin"===this._phase[r])this._pos[r]+=this._spd[r]*t;else if("slow"===this._phase[r]){const t=Math.min(1,(e-this._slowStart[r])/this.decel);this._pos[r]=this._slowFrom[r]+(this._slowTo[r]-this._slowFrom[r])*this._eOut(t),t>=1&&(this._pos[r]=this._slowTo[r],this._phase[r]="stop",this._spd[r]=0)}this._pos[r]>1e7&&(this._pos[r]=this._pos[r]%i)}this.requestUpdate(),this._phase.every(e=>"stop"===e)?this._cancelRAF():this._raf=requestAnimationFrame(this._tick)}}connectedCallback(){super.connectedCallback(),this._setupFromNumber(),document?.fonts?.ready?.then?.(()=>{this._measureCellHeight(),this.requestUpdate()}),"ResizeObserver"in window&&(this._ro=new ResizeObserver(()=>{this._measureCellHeight(),this.requestUpdate()}),this._ro.observe(this))}disconnectedCallback(){this._cancelRAF(),this._ro?.disconnect(),this._ro=null,super.disconnectedCallback()}firstUpdated(){this._measureCellHeight(),this.autoplay&&this.start()}updated(e){e.has("number")&&(this._setupFromNumber(),this.autoplay&&this.start(),this._measureCellHeight()),(e.has("duration")||e.has("speed")||e.has("stagger")||e.has("decel"))&&this.autoplay&&this.start()}start(){this._cancelRAF(),this._pos=Array(this._reelCount).fill(0),this._spd=Array(this._reelCount).fill(0).map((e,t)=>{const i=(.4*Math.random()-.2)*this.speed;return this.speed+i+1.2*(this._reelCount-1-t)}),this._phase=Array(this._reelCount).fill("spin"),this._slowStart=Array(this._reelCount).fill(0),this._slowFrom=Array(this._reelCount).fill(0),this._slowTo=Array(this._reelCount).fill(0),this._startedAt=performance.now(),this._lastTs=this._startedAt,this._raf=requestAnimationFrame(this._tick)}_setupFromNumber(){this._digits=(Math.max(0,Math.floor(Math.abs(this.number)))+"").split("").map(e=>+e),this._reelCount=this._digits.length||1}_measureCellHeight(){const e=this.renderRoot.querySelector(".cell"),t=e?.getBoundingClientRect();this._cellH=t?.height||16,this.style.setProperty("--digit-height",this._cellH+"px")}_eOut(e){return 1-Math.pow(1-e,3)}_animStartTimeForDigit(e){return this._startedAt+this.duration+(this._reelCount-1-e)*this.stagger}_cancelRAF(){null!=this._raf&&(cancelAnimationFrame(this._raf),this._raf=null)}_yFor(e){const t=10*xi.REPEAT;return Math.round(-(this._pos[e]%t+t)%t*this._cellH)}_cells(){const e=[];for(let t=0;t<xi.REPEAT;t++)for(let t=0;t<10;t++)e.push(t);return e}_currentDigits(){const e=10*xi.REPEAT;return Array.from({length:this._reelCount},(t,i)=>Math.floor((this._pos[i]%e+e)%e%10))}_shouldPlaceCommaAfter(e){const t=this._reelCount-e-1;return t>0&&t%3==0}render(){const e=this._cells();return Je`
      ${Array.from({length:this._reelCount},(t,i)=>{const r=this._yFor(i);return Je`
          <div class="reel" aria-hidden="true">
            <div class="track" style="--y: ${r}px;">
              ${e.map(e=>Je`<div class="cell alp-semi-medium">${e}</div>`)}
            </div>
          </div>
          ${this._shouldPlaceCommaAfter(i)?Je`<span class="sep" aria-hidden="true">,</span>`:null}
        `})}
    `}};xi.styles=ue`:host{font-variant-numeric:tabular-nums lining-nums;contain:content;padding:0 1px;font-weight:600;line-height:1;display:flex}.reel{vertical-align:bottom;width:10px;height:var(--digit-height,1em);font-weight:inherit;border-radius:.2em;align-items:baseline;display:inline-flex;position:relative;overflow:hidden}.track{will-change:transform;transform:translateY(var(--y,0px));position:absolute;top:0;left:0}.cell{height:var(--digit-height,1em);user-select:none;justify-content:center;align-items:center;width:10px;font-size:17px;font-weight:600;display:flex}.sep{height:var(--digit-height,1em);user-select:none;justify-content:center;align-items:flex-end;padding-bottom:1px;line-height:1;display:inline-flex}@container (width<=439px){.reel,.cell{width:10px}}`,xi.REPEAT=24,bi([i({type:Number})],xi.prototype,"number",2),bi([i({type:Number})],xi.prototype,"duration",2),bi([i({type:Number})],xi.prototype,"stagger",2),bi([i({type:Number})],xi.prototype,"decel",2),bi([i({type:Number})],xi.prototype,"speed",2),bi([i({type:Number})],xi.prototype,"extraLoopsBase",2),bi([i({type:Number})],xi.prototype,"extraLoopsStep",2),bi([i({type:Boolean})],xi.prototype,"autoplay",2),bi([r()],xi.prototype,"_cellH",2),xi=bi([ae("review-count-rolling")],xi);var _i=Object.defineProperty,Ci=Object.getOwnPropertyDescriptor,$i=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Ci(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&_i(t,i,s),s};const Oi={[Bt]:()=>Je`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${"23"}"
    height="${"23"}"
    viewBox="0 0 23 23"
    fill="none"
  >
    <path
      d="M10.1952 18.4233C9.58083 18.4233 9.08282 17.9252 9.08282 17.3109C9.08282 16.6966 9.58083 16.1986 10.1952 16.1986H12.0491C12.6634 16.1986 13.1614 16.6966 13.1614 17.3109C13.1614 17.9252 12.6634 18.4233 12.0491 18.4233H10.1952ZM6.11658 12.8616C5.50226 12.8616 5.00424 12.3636 5.00424 11.7492C5.00424 11.1349 5.50225 10.6369 6.11658 10.6369H16.1276C16.742 10.6369 17.24 11.1349 17.24 11.7492C17.24 12.3636 16.742 12.8616 16.1276 12.8616H6.11658ZM3.05765 7.29987C2.44332 7.29987 1.94531 6.80186 1.94531 6.18753C1.94531 5.57321 2.44332 5.0752 3.05765 5.0752H19.1866C19.8009 5.0752 20.2989 5.57321 20.2989 6.18753C20.2989 6.80186 19.8009 7.29987 19.1866 7.29987H3.05765Z"
      fill="currentColor"
      fill-opacity="0.4"
    />
  </svg>`,[Ft]:({iconColor:e})=>Je`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21 20"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.5786 3.75016C12.3124 3.75016 13.8801 4.45009 15.0159 5.58319C15.5903 6.15618 16.2404 6.92625 16.7755 7.59275H13.7365C13.2762 7.59275 12.9031 7.96585 12.9031 8.42609C12.9031 8.88633 13.2762 9.25942 13.7365 9.25942H18.4733C18.9335 9.25942 19.3066 8.88633 19.3066 8.42609V3.70387C19.3066 3.24363 18.9335 2.87053 18.4733 2.87053C18.0131 2.87053 17.64 3.24363 17.64 3.70387V6.01594C17.1833 5.46575 16.6723 4.88136 16.193 4.40326C14.757 2.97066 12.7707 2.0835 10.5786 2.0835C6.19663 2.0835 2.63997 5.62548 2.63997 10.0002C2.63997 14.3748 6.19663 17.9168 10.5786 17.9168C14.1972 17.9168 17.2505 15.5025 18.2066 12.1995C18.3346 11.7574 18.0799 11.2952 17.6378 11.1673C17.1957 11.0393 16.7336 11.294 16.6056 11.7361C15.8512 14.3426 13.4385 16.2502 10.5786 16.2502C7.11225 16.2502 4.30664 13.4495 4.30664 10.0002C4.30664 6.55081 7.11225 3.75016 10.5786 3.75016Z"
      fill="${e}"
    />
  </svg>`,[Vt]:()=>Je`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 22"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.9932 0.964111C11.8216 0.964111 12.4932 1.63568 12.4932 2.46411V9.96411H19.9932C20.8216 9.96411 21.4932 10.6357 21.4932 11.4641C21.4932 12.2925 20.8216 12.9641 19.9932 12.9641H12.4932V20.4641C12.4932 21.2925 11.8216 21.9641 10.9932 21.9641C10.1647 21.9641 9.49316 21.2925 9.49316 20.4641V12.9641H1.99316C1.16474 12.9641 0.493164 12.2925 0.493164 11.4641C0.493164 10.6357 1.16474 9.96411 1.99316 9.96411L9.49316 9.96411V2.46411C9.49316 1.63568 10.1647 0.964111 10.9932 0.964111Z"
      fill="currentColor"
    />
  </svg>`,[Dt]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 19" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.59999 4.93379C2.60588 4.93379 1.79999 5.73968 1.79999 6.73379V13.9338C1.79999 14.9279 2.60588 15.7338 3.59999 15.7338H14.4C15.3941 15.7338 16.2 14.9279 16.2 13.9338V6.73379C16.2 5.73968 15.3941 4.93379 14.4 4.93379H12.9728C12.7341 4.93379 12.5052 4.83897 12.3364 4.67019L11.3272 3.661C10.9896 3.32343 10.5318 3.13379 10.0544 3.13379H7.94557C7.46818 3.13379 7.01035 3.32343 6.67278 3.661L5.66359 4.67019C5.49481 4.83897 5.26589 4.93379 5.0272 4.93379H3.59999ZM8.99999 13.0338C10.4912 13.0338 11.7 11.825 11.7 10.3338C11.7 8.84262 10.4912 7.63379 8.99999 7.63379C7.50882 7.63379 6.29999 8.84262 6.29999 10.3338C6.29999 11.825 7.50882 13.0338 8.99999 13.0338Z"
      fill="currentColor"
      fill-opacity="0.6"
    />
  </svg>`,[Mt]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 19" fill="none">
    <path
      d="M1.79999 5.83381C1.79999 4.8397 2.60588 4.03381 3.59999 4.03381H8.99999C9.9941 4.03381 10.8 4.8397 10.8 5.83381V13.0338C10.8 14.0279 9.9941 14.8338 8.99999 14.8338H3.59999C2.60588 14.8338 1.79999 14.0279 1.79999 13.0338V5.83381Z"
      fill="currentColor"
      fill-opacity="0.6"
    />
    <path
      d="M13.0975 6.82883C12.7926 6.98128 12.6 7.29292 12.6 7.63381V11.2338C12.6 11.5747 12.7926 11.8863 13.0975 12.0388L14.8975 12.9388C15.1765 13.0783 15.5078 13.0634 15.7731 12.8994C16.0385 12.7354 16.2 12.4457 16.2 12.1338V6.73381C16.2 6.42189 16.0385 6.13221 15.7731 5.96823C15.5078 5.80424 15.1765 5.78934 14.8975 5.92883L13.0975 6.82883Z"
      fill="currentColor"
      fill-opacity="0.6"
    />
  </svg>`,[At]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37" fill="currentColor">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.602 4.125C14.6255 4.125 11.402 7.34855 11.402 11.325V13.125H9.60196C8.68477 13.125 7.91426 13.8146 7.81297 14.7262L6.01297 30.9262C5.95643 31.4351 6.11927 31.944 6.46073 32.3255C6.80219 32.707 7.28996 32.925 7.80196 32.925H29.402C29.914 32.925 30.4017 32.707 30.7432 32.3255C31.0847 31.944 31.2475 31.4351 31.191 30.9262L29.391 14.7262C29.2897 13.8146 28.5192 13.125 27.602 13.125H25.802V11.325C25.802 7.34855 22.5784 4.125 18.602 4.125ZM22.202 13.125V11.325C22.202 9.33678 20.5902 7.725 18.602 7.725C16.6137 7.725 15.002 9.33678 15.002 11.325V13.125H22.202ZM11.402 18.525C11.402 17.5309 12.2078 16.725 13.202 16.725C14.1961 16.725 15.002 17.5309 15.002 18.525C15.002 19.5191 14.1961 20.325 13.202 20.325C12.2078 20.325 11.402 19.5191 11.402 18.525ZM24.002 16.725C23.0078 16.725 22.202 17.5309 22.202 18.525C22.202 19.5191 23.0078 20.325 24.002 20.325C24.9961 20.325 25.802 19.5191 25.802 18.525C25.802 17.5309 24.9961 16.725 24.002 16.725Z"
    />
  </svg>`,[Tt]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 97" fill="none">
    <g>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M92 14.3877V58.3877C92 64.4628 87.0751 69.3877 81 69.3877H53.5L26 91.3877V69.3877H15C8.92487 69.3877 4 64.4628 4 58.3877V14.3877C4 8.31256 8.92487 3.3877 15 3.3877H81C87.0751 3.3877 92 8.31256 92 14.3877ZM31.5 30.8877H20.5V41.8877H31.5V30.8877ZM42.5 30.8877H53.5V41.8877H42.5V30.8877ZM75.5 30.8877H64.5V41.8877H75.5V30.8877Z"
        fill="currentColor"
        shape-rendering="crispEdges"
      />
    </g>
  </svg>`,[Pt]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.23381 6.59514C6.62434 6.20462 7.2575 6.20462 7.64803 6.59514L18.9617 17.9088C19.3523 18.2994 19.3523 18.9325 18.9617 19.3231C18.5712 19.7136 17.938 19.7136 17.5475 19.3231L6.23381 8.00935C5.84329 7.61883 5.84329 6.98566 6.23381 6.59514Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.9617 6.59514C19.3523 6.98566 19.3523 7.61883 18.9617 8.00935L7.64803 19.3231C7.2575 19.7136 6.62434 19.7136 6.23381 19.3231C5.84329 18.9325 5.84329 18.2994 6.23381 17.9088L17.5475 6.59514C17.938 6.20461 18.5712 6.20462 18.9617 6.59514Z"
      fill="currentColor"
    />
  </svg>`,[It]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" fill="none">
    <path
      d="M5.89193 7.40845H5.89859M8.55859 7.40845H8.56526M11.2253 7.40845H11.2319M6.55859 11.4084H3.89193C3.15555 11.4084 2.55859 10.8115 2.55859 10.0751V4.74178C2.55859 4.0054 3.15555 3.40845 3.89193 3.40845H13.2253C13.9616 3.40845 14.5586 4.0054 14.5586 4.74178V10.0751C14.5586 10.8115 13.9616 11.4084 13.2253 11.4084H9.89193L6.55859 14.7418V11.4084Z"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`,[Rt]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17" fill="none">
    <path
      d="M2.87868 4.47829C1.70711 5.64986 1.70711 7.54936 2.87868 8.72093L8.00004 13.8423L13.1213 8.72093C14.2929 7.54936 14.2929 5.64986 13.1213 4.47829C11.9497 3.30672 10.0503 3.30672 8.87868 4.47829L8.00004 5.357L7.12132 4.47829C5.94975 3.30672 4.05025 3.30672 2.87868 4.47829Z"
      stroke="currentColor"
    />
  </svg>`,[Lt]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17" fill="none">
    <path
      d="M2.87868 4.47829C1.70711 5.64986 1.70711 7.54936 2.87868 8.72093L8.00004 13.8423L13.1213 8.72093C14.2929 7.54936 14.2929 5.64986 13.1213 4.47829C11.9497 3.30672 10.0503 3.30672 8.87868 4.47829L8.00004 5.357L7.12132 4.47829C5.94975 3.30672 4.05025 3.30672 2.87868 4.47829Z"
      fill="currentColor"
    />
  </svg>`,[Et]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 18" fill="none">
    <path
      d="M4 6.75391L8 11.0039L12 6.75391"
      stroke="currentColor"
      stroke-opacity="1"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`,[St]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37" fill="none">
    <g>
      <g clip-path="url(#clip0_7818_58852)">
        <rect
          x="0.630859"
          y="0.539551"
          width="36"
          height="36"
          rx="18"
          fill="currentColor"
          fill-opacity="0.07"
        />
        <path
          d="M18.6307 21.2246C22.8229 21.2246 26.2213 17.8261 26.2213 13.634C26.2213 9.44179 22.8229 6.04337 18.6307 6.04337C14.4386 6.04337 11.0402 9.44179 11.0402 13.634C11.0402 17.8261 14.4386 21.2246 18.6307 21.2246Z"
          fill="currentColor"
          fill-opacity="0.2"
        />
        <path
          d="M3.15918 37.9796C3.15918 29.919 10.086 23.3845 18.6306 23.3845C27.1752 23.3845 34.102 29.919 34.102 37.9796H3.15918Z"
          fill="currentColor"
          fill-opacity="0.2"
        />
      </g>
    </g>
  </svg>`,[kt]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18" fill="none">
    <g opacity="0.5">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.78907 3C6.85269 3 5.93735 3.27767 5.15879 3.79789C4.38022 4.31811 3.77341 5.05751 3.41507 5.92261C3.05674 6.7877 2.96298 7.73963 3.14566 8.658C3.32834 9.57638 3.77924 10.42 4.44136 11.0821C5.10347 11.7442 5.94706 12.1951 6.86543 12.3778C7.78381 12.5605 8.73574 12.4667 9.60083 12.1084C10.4659 11.75 11.2053 11.1432 11.7256 10.3647C12.2458 9.58609 12.5234 8.67074 12.5234 7.73437C12.5234 7.11265 12.401 6.49701 12.1631 5.92261C11.9251 5.34821 11.5764 4.82629 11.1368 4.38667C10.6971 3.94704 10.1752 3.59831 9.60083 3.36038C9.02643 3.12246 8.41079 3 7.78907 3ZM4.32543 2.55068C5.35067 1.86564 6.55602 1.5 7.78907 1.5C8.60777 1.5 9.41847 1.66126 10.1749 1.97456C10.9312 2.28787 11.6185 2.74709 12.1974 3.32601C12.7763 3.90492 13.2356 4.59219 13.5489 5.34858C13.8622 6.10497 14.0234 6.91566 14.0234 7.73437C14.0234 8.96742 13.6578 10.1728 12.9728 11.198C12.2877 12.2232 11.314 13.0223 10.1749 13.4942C9.03567 13.966 7.78215 14.0895 6.5728 13.849C5.36345 13.6084 4.25259 13.0146 3.3807 12.1427C2.5088 11.2708 1.91504 10.16 1.67448 8.95064C1.43393 7.74129 1.55739 6.48777 2.02925 5.34858C2.50112 4.2094 3.30019 3.23572 4.32543 2.55068Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.1494 11.0947C11.4423 10.8018 11.9171 10.8018 12.21 11.0947L16.4288 15.3134C16.7217 15.6063 16.7217 16.0812 16.4288 16.3741C16.1359 16.667 15.661 16.667 15.3681 16.3741L11.1494 12.1553C10.8565 11.8624 10.8565 11.3876 11.1494 11.0947Z"
        fill="currentColor"
      />
    </g>
  </svg>`,[Ot]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20" fill="none">
    <path
      d="M12.832 8.88894C13.7525 8.88894 14.4987 8.14275 14.4987 7.22228C14.4987 6.3018 13.7525 5.55561 12.832 5.55561C11.9116 5.55561 11.1654 6.3018 11.1654 7.22228C11.1654 8.14275 11.9116 8.88894 12.832 8.88894Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.96303 2.77783H11.1455C12.0486 2.77782 12.7771 2.77782 13.367 2.82601C13.9744 2.87564 14.5079 2.98048 15.0014 3.23197C15.7854 3.63144 16.4229 4.26886 16.8223 5.05287C17.0738 5.54645 17.1787 6.07994 17.2283 6.68731C17.2765 7.27721 17.2765 8.00566 17.2765 8.90881V11.0913C17.2765 11.9944 17.2765 12.7229 17.2283 13.3128C17.1787 13.9202 17.0738 14.4537 16.8223 14.9472C16.4229 15.7312 15.7854 16.3687 15.0014 16.7681C14.5079 17.0196 13.9744 17.1245 13.367 17.1741C12.7771 17.2223 12.0486 17.2223 11.1455 17.2223H8.96301C8.05986 17.2223 7.33141 17.2223 6.74151 17.1741C6.13414 17.1245 5.60065 17.0196 5.10707 16.7681C4.32306 16.3687 3.68564 15.7312 3.28617 14.9472C3.03468 14.4537 2.92984 13.9202 2.88021 13.3128C2.83202 12.7229 2.83202 11.9944 2.83203 11.0913V8.90883C2.83202 8.00568 2.83202 7.27721 2.88021 6.68731C2.92984 6.07994 3.03468 5.54645 3.28617 5.05287C3.68564 4.26886 4.32306 3.63144 5.10707 3.23197C5.60065 2.98048 6.13414 2.87564 6.74151 2.82601C7.33141 2.77782 8.05988 2.77782 8.96303 2.77783ZM6.87723 4.48715C6.37293 4.52835 6.08319 4.60516 5.86372 4.71698C5.39332 4.95667 5.01087 5.33912 4.77118 5.80952C4.65936 6.02899 4.58255 6.31873 4.54135 6.82303C4.49935 7.33707 4.4987 7.99733 4.4987 8.9445V10.5317L5.30181 9.56798C6.03379 8.6896 7.362 8.62936 8.1705 9.43786L11.1654 12.4327L12.4761 11.122C13.2955 10.3025 14.6454 10.3773 15.3694 11.2822L15.6094 11.5823C15.6098 11.4171 15.6098 11.2419 15.6098 11.0556V8.9445C15.6098 7.99733 15.6092 7.33707 15.5672 6.82303C15.526 6.31873 15.4491 6.02899 15.3373 5.80952C15.0976 5.33912 14.7152 4.95667 14.2448 4.71698C14.0253 4.60516 13.7356 4.52835 13.2313 4.48715C12.7172 4.44515 12.057 4.4445 11.1098 4.4445H8.9987C8.05153 4.4445 7.39127 4.44515 6.87723 4.48715ZM4.54135 13.1771C4.53894 13.1476 4.53667 13.1177 4.53453 13.0873C4.5514 13.0702 4.56768 13.0524 4.58331 13.0336L6.58218 10.635C6.68675 10.5095 6.87649 10.5009 6.99199 10.6164L10.5761 14.2005C10.9015 14.5259 11.4292 14.5259 11.7546 14.2005L13.6546 12.3005C13.7716 12.1834 13.9645 12.1941 14.0679 12.3234L15.4155 14.0079C15.3917 14.0749 15.3657 14.135 15.3373 14.1906C15.0976 14.661 14.7152 15.0434 14.2448 15.2831C14.0253 15.3949 13.7356 15.4718 13.2313 15.513C12.7172 15.555 12.057 15.5556 11.1098 15.5556H8.9987C8.05153 15.5556 7.39127 15.555 6.87723 15.513C6.37293 15.4718 6.08319 15.3949 5.86372 15.2831C5.39332 15.0434 5.01087 14.661 4.77118 14.1906C4.65936 13.9711 4.58255 13.6814 4.54135 13.1771Z"
      fill="currentColor"
    />
  </svg>`,[$t]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" fill="none">
    <path d="M7 9.85974L12 14.8597L17 9.85974H7Z" fill="currentColor" />
  </svg>`,[Ct]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" fill="none">
    <g>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.4673 6.67472C10.0117 7.13033 10.0117 7.86902 10.4673 8.32463L16.6423 14.4997L10.4673 20.6747C10.0117 21.1303 10.0117 21.869 10.4673 22.3246C10.9229 22.7802 11.6616 22.7802 12.1172 22.3246L19.1172 15.3246C19.5728 14.869 19.5728 14.1303 19.1172 13.6747L12.1172 6.67472C11.6616 6.2191 10.9229 6.2191 10.4673 6.67472Z"
        fill="white"
      />
    </g>
  </svg>`,[_t]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" fill="none">
    <g>
      <g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.1172 6.67472C19.5728 7.13033 19.5728 7.86902 19.1172 8.32463L12.9422 14.4997L19.1172 20.6747C19.5728 21.1303 19.5728 21.869 19.1172 22.3246C18.6616 22.7802 17.9229 22.7802 17.4673 22.3246L10.4673 15.3246C10.0117 14.869 10.0117 14.1303 10.4673 13.6747L17.4673 6.67472C17.9229 6.2191 18.6616 6.2191 19.1172 6.67472Z"
          fill="white"
        />
      </g>
    </g>
  </svg>`,[bt]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.6889 7.06731C13.0794 6.67678 13.7126 6.67678 14.1031 7.06731L19.1031 12.0673C19.4936 12.4578 19.4936 13.091 19.1031 13.4815L14.1031 18.4815C13.7126 18.872 13.0794 18.872 12.6889 18.4815C12.2984 18.091 12.2984 17.4578 12.6889 17.0673L16.9818 12.7744L12.6889 8.48152C12.2984 8.091 12.2984 7.45783 12.6889 7.06731Z"
      fill="currentColor"
      fill-opacity="0.4"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.68889 7.06731C6.07941 6.67678 6.71258 6.67678 7.1031 7.06731L12.1031 12.0673C12.4936 12.4578 12.4936 13.091 12.1031 13.4815L7.1031 18.4815C6.71258 18.872 6.07941 18.872 5.68889 18.4815C5.29836 18.091 5.29836 17.4578 5.68889 17.0673L9.98178 12.7744L5.68889 8.48152C5.29836 8.091 5.29836 7.45783 5.68889 7.06731Z"
      fill="currentColor"
    />
  </svg>`,[yt]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18" fill="none">
    <path
      d="M6.39844 4.30985L11.0651 8.97652L6.39844 13.6432"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`,[ft]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18" fill="none">
    <path
      d="M10.3984 13.6433L5.73177 8.9766L10.3984 4.30994"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`,[mt]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 27" fill="none">
    <path
      d="M40.2539 8.24316C41.6077 7.97548 42.7857 8.24328 43.6621 9.03027L44.0127 9.34473V8.35254H47.3564V13.8301C47.3564 19.9214 47.2931 20.3783 46.3535 21.6055C46.067 21.9831 45.4456 22.4862 44.9678 22.7539C44.1877 23.1632 43.9006 23.2258 42.4668 23.2734L40.8271 23.3369V20.1582H41.5596C42.8338 20.1582 43.5664 19.4806 43.7891 18.1113L43.9004 17.418L43.4551 17.7656C42.8977 18.2058 41.9415 18.4572 40.7949 18.4727C40.0787 18.4726 39.6642 18.3629 38.8516 17.9697C37.0364 17.0882 36.3682 15.876 36.3682 13.4521C36.3683 10.5566 37.7054 8.76245 40.2539 8.24316ZM24.0254 11.0449C25.1396 9.03018 27.6878 7.89635 30.0449 8.35254C33.8034 9.07707 35.778 12.6972 34.042 15.6875C33.5164 16.6166 32.1951 17.7339 31.2236 18.0801C29.6309 18.6624 27.7196 18.5829 26.334 17.875C25.3782 17.3872 24.327 16.2701 23.8652 15.2471C23.483 14.397 23.4358 14.1449 23.499 13.0908C23.5472 12.1463 23.6745 11.7057 24.0254 11.0449ZM7.54102 9.34473L7.90723 9.03027C9.03758 8.0072 11.1085 7.86485 12.7324 8.69922C13.5131 9.10784 14.4852 10.2732 14.8037 11.2012C15.2341 12.4288 15.2174 14.7738 14.7715 15.7656C14.3574 16.631 13.4817 17.5125 12.5742 17.9219V17.9229C11.0609 18.6307 9.43608 18.6144 8.32129 17.875C7.58929 17.4031 7.54104 17.4031 7.54102 17.7959C7.54102 18.1112 7.4615 18.1277 5.83691 18.0801L4.11719 18.0322L4.06934 11.0752L4.03809 4.10352H7.54102V9.34473ZM16.8262 3.70996C18.7371 4.02467 19.9003 4.81215 20.6328 6.27539L21.1582 7.33008L21.2051 12.7129L21.2529 18.1113H17.7344V8.16406L17.1924 7.62988C16.8899 7.33096 16.54 7.09421 16.3965 7.09375C16.1738 7.09375 16.1416 6.84155 16.1416 5.34668V3.59961L16.8262 3.70996ZM29.1846 11.3438C28.2929 11.3438 27.7994 11.5955 27.3379 12.2715C27.1826 12.4975 27.0755 12.7532 27.0234 13.0215C26.9714 13.2897 26.9756 13.5654 27.0352 13.832C27.0948 14.0988 27.2086 14.3506 27.3701 14.5723C27.5317 14.7939 27.7374 14.9807 27.9746 15.1211C29.3765 15.9704 31.1112 14.932 31.1113 13.248C31.1113 12.6657 31.0167 12.4769 30.4912 11.957C29.9651 11.4223 29.7739 11.3438 29.1846 11.3438ZM43.8848 12.5547C43.2159 11.06 41.2094 10.9347 40.3486 12.335C39.7277 13.3426 40.1425 14.7585 41.1934 15.1992C41.8138 15.4668 42.1007 15.4827 42.6904 15.2627C43.8847 14.8213 44.3784 13.673 43.8848 12.5547ZM11.2842 14.334C12.176 12.634 10.5034 10.919 8.75195 11.7373C7.47765 12.3351 7.3507 14.2233 8.5293 15.0264C9.32512 15.577 10.8382 15.1994 11.2842 14.334Z"
      fill="white"
    />
  </svg>`,[vt]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 30" fill="none">
    <g>
      <path
        d="M14.7597 4.64331C11.9784 4.64331 11.6293 4.65549 10.5369 4.70515C9.44665 4.75502 8.7025 4.92752 8.05132 5.1806C7.37776 5.4419 6.80633 5.79159 6.23708 6.36063C5.66742 6.92946 5.31752 7.50037 5.05507 8.17331C4.80116 8.82417 4.62835 9.56801 4.57931 10.6571C4.53038 11.7486 4.51758 12.0977 4.51758 14.877C4.51758 17.6562 4.53007 18.004 4.57952 19.0955C4.6296 20.185 4.80231 20.9287 5.05528 21.5793C5.31711 22.2524 5.667 22.8234 6.23646 23.3921C6.8055 23.9614 7.37683 24.3119 8.04997 24.5733C8.70167 24.8264 9.44602 24.9989 10.536 25.0488C11.6285 25.0984 11.9773 25.1106 14.7585 25.1106C17.54 25.1106 17.8879 25.0984 18.9804 25.0488C20.0707 24.9988 20.8158 24.8264 21.4674 24.5733C22.1407 24.312 22.7112 23.9614 23.2802 23.3921C23.8499 22.8234 24.1998 22.2524 24.4622 21.5796C24.714 20.9287 24.8868 20.1848 24.938 19.0957C24.9871 18.0042 24.9998 17.6562 24.9998 14.877C24.9998 12.0977 24.9871 11.7489 24.938 10.6573C24.8868 9.5678 24.714 8.82417 24.4622 8.17352C24.1998 7.50037 23.8499 6.92946 23.2802 6.36063C22.7106 5.79138 22.1409 5.44169 21.4667 5.1806C20.8138 4.92752 20.0691 4.75502 18.9789 4.70515C17.8866 4.65549 17.5387 4.64331 14.7565 4.64331H14.7597ZM13.841 6.48753C14.1137 6.48701 14.4179 6.48753 14.7598 6.48753C17.4942 6.48753 17.8183 6.49732 18.898 6.54635C19.8965 6.59195 20.4385 6.75873 20.7995 6.89875C21.2774 7.08426 21.6182 7.30601 21.9764 7.66413C22.3349 8.02225 22.5567 8.3634 22.7427 8.84104C22.883 9.20124 23.05 9.7428 23.0955 10.7406C23.1445 11.8194 23.1552 12.1435 23.1552 14.8747C23.1552 17.6057 23.1445 17.9297 23.0955 19.0086C23.0498 20.0063 22.883 20.5479 22.7427 20.9082C22.5571 21.3857 22.3349 21.7258 21.9764 22.0837C21.618 22.4419 21.2777 22.6636 20.7995 22.8491C20.4389 22.9899 19.8965 23.1562 18.898 23.2018C17.8185 23.2508 17.4942 23.2615 14.7598 23.2615C12.0251 23.2615 11.701 23.2509 10.6214 23.2018C9.62289 23.1557 9.08092 22.989 8.71978 22.8489C8.24184 22.6635 7.90048 22.4418 7.54204 22.0835C7.1835 21.7254 6.96166 21.3851 6.77562 20.9073C6.63539 20.547 6.4684 20.0055 6.42291 19.0077C6.37388 17.9289 6.36399 17.6048 6.36399 14.8721C6.36399 12.1393 6.37388 11.8169 6.42291 10.738C6.46861 9.7403 6.63539 9.19874 6.77562 8.83802C6.96124 8.36049 7.1835 8.01934 7.54204 7.66111C7.90048 7.30299 8.24184 7.08125 8.71978 6.89531C9.08072 6.75467 9.62289 6.58831 10.6214 6.5424C11.5661 6.49982 11.9323 6.48701 13.841 6.48493V6.48753ZM20.2264 8.18674C19.548 8.18674 18.9975 8.7361 18.9975 9.41435C18.9975 10.0923 19.548 10.6424 20.2264 10.6424C20.9049 10.6424 21.4554 10.0923 21.4554 9.41435C21.4554 8.73631 20.9049 8.18622 20.2264 8.18622V8.18674ZM14.7597 9.62152C11.8551 9.62152 9.50026 11.9746 9.50026 14.877C9.50026 17.7792 11.8551 20.1312 14.7597 20.1312C17.6641 20.1312 20.018 17.7792 20.018 14.877C20.018 11.9746 17.6639 9.62152 14.7594 9.62152H14.7597ZM14.7597 11.4657C16.6449 11.4657 18.1734 12.993 18.1734 14.877C18.1734 16.7607 16.6449 18.2882 14.7597 18.2882C12.8742 18.2882 11.3458 16.7607 11.3458 14.877C11.3458 12.9929 12.8741 11.4657 14.7597 11.4657Z"
        fill="white"
        fill-opacity="0.9"
        shape-rendering="crispEdges"
      />
    </g>
  </svg>`,[wt]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 19" fill="none">
    <g>
      <path
        d="M8.49904 0.675377C9.67254 0.675377 10.6238 1.62669 10.6238 2.80018V11.2994C10.6238 12.4729 9.67254 13.4242 8.49904 13.4242H2.12463C0.951139 13.4242 -0.000166893 12.4729 -0.000166893 11.2994V5.36505C-0.000166893 4.80151 0.223696 4.26106 0.622173 3.86258L3.18703 1.29772C3.58551 0.89924 4.12596 0.675377 4.6895 0.675377H8.49904Z"
        fill="white"
        fill-opacity="0.9"
        shape-rendering="crispEdges"
      />
      <path
        d="M14.002 5.98739C14.002 4.81389 13.0506 3.86258 11.8772 3.86258V10.4866C11.8772 12.6957 10.0863 14.4866 7.87715 14.4866H3.37794C3.37794 15.6601 4.32925 16.6114 5.50275 16.6114H11.8772C13.0506 16.6114 14.002 15.6601 14.002 14.4866V5.98739Z"
        fill="white"
        fill-opacity="0.9"
        shape-rendering="crispEdges"
      />
    </g>
  </svg>`,[ut]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 23" fill="none">
    <g>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.4818 9.84687C17.8646 10.6452 17.8646 12.6411 16.4818 13.4394L7.59266 18.5716C6.2099 19.3699 4.48145 18.372 4.48145 16.7753L4.48145 6.51096C4.48145 4.91428 6.2099 3.91636 7.59266 4.7147L16.4818 9.84687Z"
        fill="white"
        fill-opacity="0.9"
        shape-rendering="crispEdges"
      />
    </g>
  </svg>`,[xt]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 9" fill="none">
    <circle cx="4.88086" cy="4.08923" r="4" fill="currentColor" />
  </svg>`,[Nt]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 8" fill="none">
    <path d="M0.816406 0.5L0.816406 7.5" stroke="currentColor" />
  </svg>`,[Wt]:()=>Je`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
  >
    <path
      d="M16.5573 3.66357C17.6404 3.66362 18.7046 3.96907 19.6423 4.54248C22.5436 6.31966 23.5363 10.2491 21.8776 13.3042C21.5543 13.8987 21.0011 14.572 20.3386 15.2612C19.6726 15.954 18.8816 16.6783 18.069 17.3755C16.4436 18.77 14.7174 20.0683 13.7009 20.812L13.6999 20.813C13.3468 21.0682 12.9319 21.2045 12.4977 21.2046C12.0639 21.2046 11.6476 21.0685 11.2975 20.812C10.2809 20.0683 8.55527 18.7695 6.93036 17.3755C6.11783 16.6784 5.32677 15.9539 4.66083 15.2612C3.99837 14.5721 3.44515 13.8986 3.12177 13.3042C1.45879 10.2488 2.4516 6.31944 5.35321 4.54248L5.71063 4.33936C6.55719 3.89679 7.4904 3.66357 8.43817 3.66357C9.95609 3.66371 11.3875 4.2388 12.4968 5.26709C13.6062 4.23815 15.0388 3.66358 16.5573 3.66357ZM16.5573 5.50342C15.2722 5.50343 14.0623 6.11525 13.2409 7.19287L13.2419 7.19385L12.4977 8.18018L11.7536 7.19385C10.9323 6.11645 9.72698 5.50358 8.43817 5.50342C7.70419 5.50342 6.9799 5.71048 6.33563 6.104L6.33466 6.10303C4.33418 7.33107 3.59528 10.0331 4.65204 12.2212L4.75946 12.4312C5.02027 12.9108 5.52379 13.5135 6.17743 14.1753C6.82668 14.8326 7.60775 15.5323 8.40399 16.2046C9.99543 17.5483 11.6385 18.7742 12.4001 19.3306L12.445 19.353C12.4935 19.3679 12.5493 19.3603 12.5905 19.3306C13.3525 18.7718 14.996 17.5455 16.5876 16.2017C17.3839 15.5293 18.1639 14.8302 18.8132 14.1733C19.467 13.5119 19.9703 12.9099 20.2311 12.4312C21.442 10.2085 20.7204 7.36628 18.6559 6.10303C18.0165 5.71006 17.2913 5.50347 16.5573 5.50342Z"
      fill="currentColor"
    />
  </svg>`,[zt]:()=>Je`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="-3 -3 30 30"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path
      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
    />
  </svg>`,[jt]:()=>Je`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="-3 -3 30 30"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>`,[Ut]:()=>Je`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="44"
    viewBox="0 0 42 44"
    fill="none"
  >
    <rect width="42" height="37" fill="currentColor" />
    <path d="M0 44L21 37L6.11959e-07 37L0 44Z" fill="currentColor" />
    <path d="M42 44L21 37L42 37L42 44Z" fill="currentColor" />
  </svg>`,[Ht]:()=>Je`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M14.3145 9.68164L24 11.999L14.3145 14.3154L11.999 23.998L9.68262 14.3154L0 11.999L9.68164 9.68262L11.999 0L14.3145 9.68164Z"
      fill="currentColor"
    />
  </svg>`,[qt]:()=>Je`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g transform="translate(2.5 3.0664)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.68359 0.0788906C8.0404 -0.030523 8.42371 -0.0262763 8.78027 0.0925625C9.1369 0.211468 9.44622 0.4383 9.66602 0.740023L9.75488 0.873812L9.83105 1.01444C9.97694 1.31547 10.0345 1.65183 10 1.98514V15.8777C10.041 16.2655 9.95657 16.6578 9.75488 16.9939C9.5338 17.3621 9.18769 17.6394 8.78027 17.7752C8.37284 17.9109 7.92997 17.8961 7.53223 17.7342C7.171 17.587 6.86878 17.3264 6.66895 16.9939L3.51074 12.9334H2C1.46967 12.9334 0.96099 12.7224 0.585938 12.3474C0.211032 11.9725 0.000111791 11.4636 0 10.9334V6.93338C5.74391e-05 6.40313 0.211048 5.89432 0.585938 5.51932C0.961 5.14432 1.46962 4.93338 2 4.93338H3.51172L6.66895 0.873812C6.86877 0.540964 7.17076 0.279872 7.53223 0.132602L7.68359 0.0788906ZM4.78906 6.54764C4.5996 6.79094 4.30839 6.93338 4 6.93338H2V10.9334H4C4.30859 10.9334 4.59961 11.0765 4.78906 11.3201L8 15.448V2.41873L4.78906 6.54764Z"
        fill="currentColor"
      />
      <path
        d="M17.293 6.22635C17.6835 5.83583 18.3165 5.83583 18.707 6.22635C19.0974 6.61689 19.0975 7.24994 18.707 7.64041L17.4141 8.93338L18.707 10.2264C19.0974 10.6169 19.0975 11.2499 18.707 11.6404C18.3165 12.0308 17.6835 12.0308 17.293 11.6404L16 10.3474L14.707 11.6404C14.3165 12.0308 13.6835 12.0308 13.293 11.6404C12.9025 11.2499 12.9025 10.6169 13.293 10.2264L14.5859 8.93338L13.293 7.64041C12.9025 7.24991 12.9025 6.61688 13.293 6.22635C13.6835 5.83583 14.3165 5.83583 14.707 6.22635L16 7.51932L17.293 6.22635Z"
        fill="currentColor"
      />
    </g>
  </svg>`,[Gt]:()=>Je`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g transform="translate(2.5 3.0664)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.68359 0.0788906C8.0404 -0.030523 8.42371 -0.0262763 8.78027 0.0925625C9.1369 0.211468 9.44622 0.4383 9.66602 0.740023L9.75488 0.873812L9.83105 1.01444C9.97694 1.31547 10.0345 1.65183 10 1.98514V15.8777C10.041 16.2655 9.95657 16.6578 9.75488 16.9939C9.5338 17.3621 9.18769 17.6394 8.78027 17.7752C8.37284 17.9109 7.92997 17.8961 7.53223 17.7342C7.171 17.587 6.86878 17.3264 6.66895 16.9939L3.51074 12.9334H2C1.46967 12.9334 0.96099 12.7224 0.585938 12.3474C0.211032 11.9725 0.000111791 11.4636 0 10.9334V6.93338C5.74391e-05 6.40313 0.211048 5.89432 0.585938 5.51932C0.961 5.14432 1.46962 4.93338 2 4.93338H3.51172L6.66895 0.873812C6.86877 0.540964 7.17076 0.279872 7.53223 0.132602L7.68359 0.0788906ZM4.78906 6.54764C4.5996 6.79094 4.30839 6.93338 4 6.93338H2V10.9334H4C4.30859 10.9334 4.59961 11.0765 4.78906 11.3201L8 15.448V2.41873L4.78906 6.54764Z"
        fill="currentColor"
      />
      <path
        d="M12.27 6.21A3 3 0 0 1 12.27 11.65"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        fill="none"
      />
      <path
        d="M14.56 3.85A6.2 6.2 0 0 1 14.56 14.01"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        fill="none"
      />
    </g>
  </svg>`,[Yt]:()=>Je`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="none">
    <path
      d="M4.99999 7.85714C4.70412 7.85714 4.46428 7.61729 4.46428 7.32142L4.46433 4.82142C4.46433 4.52555 4.70418 4.28571 5.00005 4.28571C5.29592 4.28572 5.53576 4.52557 5.53576 4.82144L5.53571 7.32144C5.53571 7.6173 5.29585 7.85715 4.99999 7.85714Z"
      fill="currentColor"
    />
    <path
      d="M4.28571 2.85714C4.28571 2.46265 4.60551 2.14286 5 2.14286C5.39449 2.14286 5.71429 2.46265 5.71429 2.85714C5.71429 3.25163 5.39449 3.57143 5 3.57143C4.60551 3.57143 4.28571 3.25163 4.28571 2.85714Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5ZM8.92857 5C8.92857 7.16969 7.16969 8.92857 5 8.92857C2.83031 8.92857 1.07143 7.16969 1.07143 5C1.07143 2.83031 2.83031 1.07143 5 1.07143C7.16969 1.07143 8.92857 2.83031 8.92857 5Z"
      fill="currentColor"
    />
  </svg>`};let ki=class extends ht{constructor(){super(...arguments),this.width="",this.height="",this.padding="0",this.color="",this.type="",this.hasColor=e=>""!==e.trim()}createRenderRoot(){return this}toCssUnit(e,t="0px"){const i=((e??"")+"").trim();return i?/^\d+$/.test(i)?i+"px":i:t}render(){const e=this.toCssUnit(this.width,""),t=this.toCssUnit(this.height,""),i=this.toCssUnit(this.padding,""),r=this.hasColor(this.color)?this.color:"var(--alp-common-color)",o=Oi[this.type];return Je`
      <style>review-custom-icon { display: flex; } .custom-icon { display: flex; justify-content: center; align-items: center; } .custom-icon > svg { width: 100%; height: 100%; color: var(--icon-color, var(--alp-common-color)); }</style>

      <div class="custom-icon" style=${`width:${e};height:${t};padding:${i};--icon-color:${r};`}>
        ${o?o({width:e,height:t,iconColor:r}):null}
      </div>
    `}};$i([i({type:String})],ki.prototype,"width",2),$i([i({type:String})],ki.prototype,"height",2),$i([i({type:String})],ki.prototype,"padding",2),$i([i({type:String})],ki.prototype,"color",2),$i([i({type:String})],ki.prototype,"type",2),ki=$i([ae("review-custom-icon")],ki);var Si=Object.defineProperty,Ei=Object.getOwnPropertyDescriptor,Ri=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Ei(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Si(t,i,s),s};let Li=class extends ht{constructor(){super(...arguments),this.keyword="\ud0a4\uc6cc\ub4dc",this.emoji="\ud83d\ude18",this.imgUrl=te+"/review-widget/icon/"}render(){return Je`
      <style>.keyword-label-container { display: flex; height: 22px; padding: 2px 10px; justify-content: center; align-items: center; gap: 3px; border-radius: 3px; background: var(--alp-review-card-gray05, rgba(30, 41, 59, 0.03)); } .keyword-label-container img { min-width: 14px; min-height: 14px; max-width: 14px; max-height: 14px; } .keyword-label-container span { font-size: 12px !important; font-weight: 500 !important; }</style>
      <div class="keyword-label-container">
        <img src="${this.imgUrl}${this.emoji}.png" alt="keyword icon" />
        <span class="alp-body12 alp-medium">${this.keyword}</span>
      </div>
    `}};Ri([i({type:String})],Li.prototype,"keyword",2),Ri([i({type:String})],Li.prototype,"emoji",2),Li=Ri([ae("review-keyword-label")],Li);var Ii=Object.defineProperty,Pi=Object.getOwnPropertyDescriptor,Ti=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Pi(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Ii(t,i,s),s};let Ai=class extends ht{constructor(){super(...arguments),this.totalPages=0,this.currentIndex=0,this.buttonSize="36",this.onPrevClick=()=>{0!==this.currentIndex&&this.dispatchEvent(new CustomEvent("prevProductClick",{bubbles:!0,composed:!0}))},this.onNextClick=()=>{this.currentIndex>=this.totalPages-1||this.dispatchEvent(new CustomEvent("nextProductClick",{bubbles:!0,composed:!0}))}}createRenderRoot(){return this}render(){const e=this.buttonSize+"px";return Je`
      <style>.next-prev-handler-container { display: flex; } .next-prev-handler-container > button { display: flex; width: ${e}; height: ${e}; flex-direction: column; justify-content: center; align-items: center; gap: 10px; cursor: pointer; background: transparent; transition: background 0.15s ease; } .next-prev-handler-container > button:hover:not(.disabled) { background: var(--alp-review-card-gray03, rgba(30, 41, 59, 0.05)); } .next-prev-handler-container > button:active:not(.disabled) { background: var(--alp-review-card-gray07, rgba(30, 41, 59, 0.05)); } button.disabled { opacity: 0.3; } .prev-handler-button { border-radius: 4px 0 0 4px; border: 1px solid var(--alp-review-border-gray20, rgba(30, 41, 59, 0.2)); } .next-handler-button { border-radius: 0 4px 4px 0; border: 1px solid var(--alp-review-border-gray20, rgba(30, 41, 59, 0.2)); }</style>
      <div class="next-prev-handler-container">
        <button
          class="prev-handler-button ${0===this.currentIndex?"disabled":""}"
          @click=${this.onPrevClick}
        >
          <review-custom-icon
            type="${ft}"
            width="16"
            height="16"
            color="var(--alp-review-icon-gray60)"
          ></review-custom-icon>
        </button>
        <button
          class="next-handler-button ${this.currentIndex===this.totalPages-1?"disabled":""}"
          @click=${this.onNextClick}
          style="margin-left: -1px;"
        >
          <review-custom-icon
            type="${yt}"
            width="16"
            height="16"
            color="var(--alp-review-icon-gray60)"
          ></review-custom-icon>
        </button>
      </div>
    `}};Ti([i({type:Number})],Ai.prototype,"totalPages",2),Ti([i({type:Number})],Ai.prototype,"currentIndex",2),Ti([i({type:String})],Ai.prototype,"buttonSize",2),Ai=Ti([ae("review-next-prev-handler")],Ai);const Ni=ue`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    box-sizing: border-box;

    /* í°ì¹ ì´ë²¤í¸ ë°©ì§ */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-align: start;
    color: var(--alp-review-text-gray100);
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
  }
  span,
  b,
  u,
  i {
    font-weight: inherit;
    font-size: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    color: inherit;
    font-family: inherit;
  }

  /* 1) shadow ìì ì§ì  ìë center */
  :where(center) {
    text-align: inherit !important;
    display: contents;
  }
  :where(center) * {
    text-align: start;
  }

  /* 2) ì¬ë¡¯ì¼ë¡ ë¤ì´ì¨ center */
  ::slotted(center) {
    text-align: inherit !important;
    display: contents;
  }
  ::slotted(center) * {
    text-align: start !important;
  }

  /* 3) ì´ ì»´í¬ëí¸ë¥¼ centerê° ê°ì ë */
  :host-context(center) {
    text-align: inherit !important;
  }
`,Di=ue`*{font-size:calc(var(--alp-common-rem)*1.2px);line-height:calc(var(--alp-pc-em)*1.2);letter-spacing:calc(var(--alp-common-rem)*var(--alp-pc-em)*-.02px);font-weight:400;font-family:var(--alp-common-font-family)}.alp-line13{line-height:calc(var(--alp-pc-em)*1.3)!important}.alp-line14{line-height:calc(var(--alp-pc-em)*1.4)!important}.alp-line15{line-height:calc(var(--alp-pc-em)*1.5)!important}.alp-body18{line-height:calc(var(--alp-pc-em)*1.1);font-size:clamp(12px,calc(var(--alp-common-rem)*var(--alp-pc-em)*1.28px),100px)}.alp-body17{line-height:calc(var(--alp-pc-em)*1.1);font-size:clamp(12px,calc(var(--alp-common-rem)*var(--alp-pc-em)*1.21px),100px)}.alp-body16{line-height:calc(var(--alp-pc-em)*1.1);font-size:clamp(12px,calc(var(--alp-common-rem)*var(--alp-pc-em)*1.14px),100px)}.alp-body15{line-height:calc(var(--alp-pc-em)*1.1);font-size:clamp(12px,calc(var(--alp-common-rem)*var(--alp-pc-em)*1.07px),100px)}.alp-body14{line-height:calc(var(--alp-pc-em)*1.1);font-size:clamp(12px,calc(var(--alp-common-rem)*var(--alp-pc-em)*1px),100px)}.alp-body13{line-height:calc(var(--alp-pc-em)*1.1);font-size:clamp(12px,calc(var(--alp-common-rem)*var(--alp-pc-em)*.93px),100px)}.alp-body12{line-height:calc(var(--alp-pc-em)*1.1);font-size:clamp(12px,calc(var(--alp-common-rem)*var(--alp-pc-em)*.86px),100px)}.alp-h32{font-size:calc(var(--alp-common-rem)*var(--alp-pc-em)*2.28px)}.alp-h26{font-size:calc(var(--alp-common-rem)*var(--alp-pc-em)*1.85px)}.alp-h24{font-size:calc(var(--alp-common-rem)*var(--alp-pc-em)*1.71px)}.alp-h22{font-size:calc(var(--alp-common-rem)*var(--alp-pc-em)*1.57px)}.alp-h20{font-size:calc(var(--alp-common-rem)*var(--alp-pc-em)*1.43px)}.alp-caption11{font-size:clamp(10px,calc(var(--alp-common-rem)*var(--alp-pc-em)*.78px),100px);line-height:calc(var(--alp-pc-em)*1);letter-spacing:calc(var(--alp-common-rem)*var(--alp-pc-em)*-.01px)}.alp-caption10{font-size:clamp(10px,calc(var(--alp-common-rem)*var(--alp-pc-em)*.71px),100px);line-height:calc(var(--alp-pc-em)*1);letter-spacing:calc(var(--alp-common-rem)*var(--alp-pc-em)*-.01px)}.line-wrap{line-clamp:1;text-overflow:ellipsis;-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}@media (width>=440px) and (width<=840px){*{font-size:calc(var(--alp-common-rem)*1.1px);line-height:calc(var(--alp-tablet-em)*1.2);letter-spacing:calc(var(--alp-common-rem)*var(--alp-tablet-em)*-.02px)}.alp-line13{line-height:calc(var(--alp-tablet-em)*1.3)!important}.alp-line14{line-height:calc(var(--alp-tablet-em)*1.4)!important}.alp-line15{line-height:calc(var(--alp-tablet-em)*1.5)!important}.alp-body18{line-height:calc(var(--alp-tablet-em)*1.1);font-size:clamp(12px,calc(var(--alp-common-rem)*var(--alp-tablet-em)*1.28px),100px)}.alp-body17{line-height:calc(var(--alp-tablet-em)*1.1);font-size:clamp(12px,calc(var(--alp-common-rem)*var(--alp-tablet-em)*1.21px),100px)}.alp-body16{line-height:calc(var(--alp-tablet-em)*1.1);font-size:clamp(12px,calc(var(--alp-common-rem)*var(--alp-tablet-em)*1.14px),100px)}.alp-body15{line-height:calc(var(--alp-tablet-em)*1.1);font-size:clamp(12px,calc(var(--alp-common-rem)*var(--alp-tablet-em)*1.07px),100px)}.alp-body14{line-height:calc(var(--alp-tablet-em)*1.1);font-size:clamp(12px,calc(var(--alp-common-rem)*var(--alp-tablet-em)*1px),100px)}.alp-body13{line-height:calc(var(--alp-tablet-em)*1.1);font-size:clamp(12px,calc(var(--alp-common-rem)*var(--alp-tablet-em)*.93px),100px)}.alp-body12{line-height:calc(var(--alp-tablet-em)*1.1);font-size:clamp(12px,calc(var(--alp-common-rem)*var(--alp-tablet-em)*.86px),100px)}.alp-h32{font-size:calc(var(--alp-common-rem)*var(--alp-tablet-em)*2.28px)}.alp-h26{font-size:calc(var(--alp-common-rem)*var(--alp-tablet-em)*1.85px)}.alp-h24{font-size:calc(var(--alp-common-rem)*var(--alp-tablet-em)*1.71px)}.alp-h22{font-size:calc(var(--alp-common-rem)*var(--alp-tablet-em)*1.57px)}.alp-h20{font-size:calc(var(--alp-common-rem)*var(--alp-tablet-em)*1.43px)}.alp-caption11{font-size:clamp(10px,calc(var(--alp-common-rem)*var(--alp-tablet-em)*.78px),100px);line-height:calc(var(--alp-tablet-em)*1);letter-spacing:calc(var(--alp-common-rem)*var(--alp-tablet-em)*-.01px)}.alp-caption10{font-size:clamp(10px,calc(var(--alp-common-rem)*var(--alp-tablet-em)*.71px),100px);line-height:calc(var(--alp-tablet-em)*1);letter-spacing:calc(var(--alp-common-rem)*var(--alp-tablet-em)*-.01px)}}@media (width<=440px){*{font-size:calc(var(--alp-common-rem)*1px);letter-spacing:calc(var(--alp-common-rem)*-.02px);line-height:1.2}.alp-line13{line-height:1.3!important}.alp-line14{line-height:1.4!important}.alp-line15{line-height:1.5!important}.alp-body18{line-height:1.1;font-size:clamp(12px,calc(var(--alp-common-rem)*1.28px),100px)}.alp-body17{line-height:1.1;font-size:clamp(12px,calc(var(--alp-common-rem)*1.21px),100px)}.alp-body16{line-height:1.1;font-size:clamp(12px,calc(var(--alp-common-rem)*1.14px),100px)}.alp-body15{line-height:1.1;font-size:clamp(12px,calc(var(--alp-common-rem)*1.07px),100px)}.alp-body14{line-height:1.1;font-size:clamp(12px,calc(var(--alp-common-rem)*1px),100px)}.alp-body13{line-height:1.1;font-size:clamp(12px,calc(var(--alp-common-rem)*.93px),100px)}.alp-body12{line-height:1.1;font-size:clamp(12px,calc(var(--alp-common-rem)*.86px),100px)}.alp-h32{font-size:calc(var(--alp-common-rem)*2.28px)}.alp-h26{font-size:calc(var(--alp-common-rem)*1.85px)}.alp-h24{font-size:calc(var(--alp-common-rem)*1.71px)}.alp-h22{font-size:calc(var(--alp-common-rem)*1.57px)}.alp-h20{font-size:calc(var(--alp-common-rem)*1.43px)}.alp-caption11{font-size:clamp(10px,calc(var(--alp-common-rem)*.78px),100px);letter-spacing:calc(var(--alp-common-rem)*-.01px);line-height:1}.alp-caption10{font-size:clamp(10px,calc(var(--alp-common-rem)*var(--alp-tablet-em)*.71px),100px);letter-spacing:calc(var(--alp-common-rem)*-.01px);line-height:1}}.alp-bold{font-weight:700}.alp-semi-bold{font-weight:600}.alp-medium{font-weight:500}.alp-regular{font-weight:400}.alp-ht{color:var(--alp-common-color)}.custom-scrollbar{&::-webkit-scrollbar{width:0;height:0}&:hover::-webkit-scrollbar{width:6px;height:0}&:hover::-webkit-scrollbar-track{background-color:#0000}&:hover::-webkit-scrollbar-thumb{background-color:var(--alp-review-icon-gray10);border-radius:12px}}@keyframes alp-width-fill{0%{width:0}to{width:var(--alp-target-width,100%)}}.u-width-fill{width:var(--alp-target-width,100%);min-width:8px;animation:alp-width-fill var(--alp-width-duration,.8s)var(--alp-width-ease,ease-out)both}@keyframes alp-height-fill{0%{height:0}to{height:var(--alp-target-height,100%)}}.u-height-fill{height:var(--alp-target-height,100%);min-height:6px;animation:alp-height-fill var(--alp-height-duration,.8s)var(--alp-height-ease,ease-out)both}.review-disabled{opacity:.6;pointer-events:none}`,Mi=[Ni,Di,ue`:host{z-index:999999999!important;background:#00000080!important;width:100%!important;height:100%!important;display:flex!important;position:fixed!important;top:0!important;left:0!important}.overlay-portal-container{pointer-events:auto;justify-content:center;align-items:center;width:100%;height:100%;padding:0 10px;display:flex;position:relative}`],Wi=new class{constructor(){this.stack=[],this.initialized=!1,this.ignoreNextPopstate=!1}init(){this.initialized||(this.initialized=!0,window.addEventListener("popstate",()=>{0!==this.stack.length&&(this.ignoreNextPopstate?this.ignoreNextPopstate=!1:this.closeTopByHistory())}))}open(e){this.init(),this.stack.push(e),function(){if("fixed"===document.body.style.position)return;const e=window.scrollY||document.documentElement.scrollTop||0;document.body.dataset.scrollY=e+"";const t=window.innerWidth-document.documentElement.clientWidth;t>0&&(document.body.style.paddingRight=t+"px"),document.body.style.position="fixed",document.body.style.top=`-${e}px`,document.body.style.left="0",document.body.style.right="0",document.body.style.width="100%"}();const t=history.state??{},i=t.__alpModalDepth??0;history.pushState({...t,__alpModalDepth:i+1},"",window.location.href)}closeByUi(e){if(0===this.stack.length)return;const t=this.stack[this.stack.length-1];this.stack.pop(),t.onClose(),0===this.stack.length&&l(),this.ignoreNextPopstate=!0,history.back()}closeTopByHistory(){const e=this.stack.pop();e&&(e.onClose(),0===this.stack.length&&l())}};var zi=Object.defineProperty,ji=Object.getOwnPropertyDescriptor,Vi=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ji(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&zi(t,i,s),s};let Fi=class extends ht{constructor(){super(...arguments),this.isScreen=!1}close(e){e.preventDefault(),e.target===e.currentTarget?Wi.closeByUi("review-overlay-portal"):e.stopPropagation()}render(){return Je`
      <div @click=${e=>this.close(e)} class="overlay-portal-container"></div>
    `}};Fi.styles=Mi,Vi([i({type:String})],Fi.prototype,"isScreen",2),Fi=Vi([ae("review-overlay-portal")],Fi);const Bi="bullet",Ui="number",Hi="none",Gi="none",qi="indicator",Yi="slide",Ki="scroll",Zi="-created_at",Ji="-ratings",Qi="-like_count",Xi="ratio",er="product",tr={RECENT_REVIEW_COUNT:"\ucd5c\uadfc \ub9ac\ubdf0 \ub9ce\uc740\uc21c",REVIEW_COUNT:"\ub9ac\ubdf0 \ub9ce\uc740\uc21c",REVIEW_RATING:"\ub9ac\ubdf0 \ud3c9\uc810\uc21c",PRODUCT_NAME:"\uc0c1\ud488 \uc774\ub984\uc21c",RECENT_REVIEW:"\ucd5c\uc2e0 \ub9ac\ubdf0\uc21c",RECENT_PRODUCT:"\ucd5c\uc2e0 \uc0c1\ud488\uc21c",RECENT_SALES:"\ucd5c\uadfc \ud310\ub9e4\ub7c9\uc21c"},ir="ratings",rr=100,or={get:(e,t)=>u("GET",e,void 0,sr,t),oneTimeGet:(e,t)=>async function(e,t,i,r,o){const s={Accept:"application/json",...o?.headers??{}},n=h(window.ALPHA_REVIEW_EMERGENCY?se:oe,t,o?.query),a=new AbortController,p=[],l=o?.signal;if(l)if(l.aborted)try{a.abort(l.reason)}catch{a.abort()}else{const e=()=>{try{a.abort(l.reason)}catch{a.abort()}};l.addEventListener("abort",e,{once:!0}),p.push(()=>l.removeEventListener("abort",e))}const d=window.setTimeout(()=>{try{a.abort(new DOMException("Request timed out","AbortError"))}catch{a.abort()}},2e3);p.push(()=>clearTimeout(d));try{const e=await fetch(n,{method:"GET",headers:s,body:void 0,credentials:r?.credentials,signal:a.signal});return await g(e)}finally{p.forEach(e=>e())}}(0,e,0,sr,t),post:(e,t,i)=>u("POST",e,t,sr,i),patch:(e,t,i)=>u("PATCH",e,t,sr,i),delete:(e,t)=>u("DELETE",e,void 0,sr,t)};var sr;let nr=null;const ar="\uc2a4\ub9c8\ud2b8\uc2a4\ud1a0\uc5b4",pr="\uc778\uc2a4\ud0c0\uadf8\ub7a8",lr="\ub124\uc774\ubc84\ube14\ub85c\uadf8",dr="UNVERIFIED_REVIEW_RESTRICTED_PRODUCT",cr=async({mall_id:e,shop_no:t,product_no:i,member_id:r,order_code:o,order_item_code:s})=>{const n={mall_id:e?.toString()??"",shop_no:t?.toString()??"",product_no:i?.toString()??"",member_id:r?.toString()??""};o&&(n.order_code=o),s&&(n.order_item_code=s);const{redirect_url:a,extra_info:p,limit:l}=await async function(e){return await or.get("/v2/api-widget/module/write",{query:e})}(n);switch(p){case"NO_CUSTOMER_INFO":case"NO_PRODUCT_INFO":$(a);break;case dr:C({title:si.SHARED.OPEN_REVIEW_WRITE.UNVERIFIED_IMPOSSIBLE_TITLE,okButtonText:si.SHARED.OPEN_REVIEW_WRITE.OK,cancelButtonText:"",content:"",buttonDirection:"column",url:a,type:p});break;case"UNVERIFIED_REVIEW_TODAY_LIMIT_EXCEEDED":C({title:si.SHARED.OPEN_REVIEW_WRITE.LIMIT_REACHED_TITLE,okButtonText:si.SHARED.OPEN_REVIEW_WRITE.VIEW_MY_REVIEWS,cancelButtonText:si.SHARED.OPEN_REVIEW_WRITE.CLOSE,content:si.SHARED.OPEN_REVIEW_WRITE.LIMIT_REACHED_CONTENT(l),buttonDirection:"column",url:a,type:p});break;case"UNVERIFIED_REVIEW_TODAY_WRITE_POSSIBLE":C({title:si.SHARED.OPEN_REVIEW_WRITE.UNVERIFIED_POSSIBLE_TITLE,okButtonText:si.SHARED.OPEN_REVIEW_WRITE.WRITE_REVIEW,cancelButtonText:si.SHARED.OPEN_REVIEW_WRITE.CLOSE,content:si.SHARED.OPEN_REVIEW_WRITE.UNVERIFIED_POSSIBLE_CONTENT,buttonDirection:"row",url:a,type:p});break;default:$(a)}};var hr=Object.defineProperty,gr=Object.getOwnPropertyDescriptor,ur=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?gr(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&hr(t,i,s),s};let wr=class extends ht{constructor(){super(),this.paginationType="none",this.isDisabled=!1,this.totalPages=10,this.currentPage=1,this.isLinksVisible=!0,this.isShowPolicy=!0,this.isMoreLoading=!1,this.hasMoreReviews=!0,this.policyText="\uc6b4\uc601\uc815\ucc45",this.writeReviewText="\ub9ac\ubdf0 \uc791\uc131",this.onPolicyClick=()=>{this.isShowPolicy&&(d("review-policy-popup",{type:"overlay"}),Wi.open({key:"review-policy-popup",onClose:()=>c("review-policy-popup")}))},this.onPaginationMoreClick=()=>{this.dispatchEvent(new CustomEvent("paginationMoreClick",{bubbles:!0,composed:!0}))},this.policyText=si.SHARED.PAGINATION_HANDLER.POLICY,this.writeReviewText=si.SHARED.PAGINATION_HANDLER.WRITE_REVIEW}createRenderRoot(){return this}async onWriteReviewClick(){const{mall_id:e,shop_no:t}=await m(),i=await y()??"";cr({mall_id:e,shop_no:t,member_id:i,product_no:this.productNo??window?.iProductNo??""})}renderPaginationContent(){switch(this.paginationType){case Ki:return this.hasMoreReviews?Je`<review-more-button
          .isLoading=${this.isMoreLoading}
          .hideButton=${this.currentPage===this.totalPages}
          @click=${this.onPaginationMoreClick}
        ></review-more-button>`:Je``;case Bi:return Je`<review-dot-pagination
          .totalPages=${this.totalPages}
          .currentPage=${this.currentPage}
        ></review-dot-pagination>`;case Ui:return Je`<review-number-pagination
          .totalPages=${this.totalPages}
          .currentPage=${this.currentPage}
        ></review-number-pagination>`;default:return Je``}}render(){return Je`
      <style>review-pagination-handler { display: block; } .pagination-handler-container { display: flex; justify-content: space-between; align-items: center; padding: 40px 0; overflow: hidden; } .pagination-handler-container a { min-width: fit-content; padding: 16px; cursor: pointer; } .pagination-handler-container .policy-button { color: ${this.isShowPolicy?"var(--alp-review-text-gray50)":"transparent"}; } .pagination-handler-container .write-review-button { font-weight: 700; } .pagination-handler-container.link-disabled a { width: 0; height: 0; visibility: hidden; pointer-events: none; } @container (max-width: 839px) { .pagination-handler-container { padding: 32px 0; } .link-disabled { display: flex; align-items: center; justify-content: center; } .link-disabled a { display: none; } .pagination-handler-container review-number-pagination, .pagination-handler-container review-dot-pagination, .pagination-handler-container review-more-button { order: 1; flex-basis: 100%; justify-content: center; } .pagination-handler-container { flex-wrap: wrap; justify-content: center; gap: 12px; } .pagination-handler-container a { padding: 8px 12px; } .pagination-handler-container .policy-button { order: 2; flex-basis: auto; text-align: center !important; display: ${this.isShowPolicy?"block":"none"}; } .pagination-handler-container .write-review-button { order: 2; flex-basis: auto; text-align: center !important; } } @container (max-width: 440px) { .pagination-handler-container { padding: 12px 0 20px; row-gap: 20px; column-gap: 0; } }</style>

      <div
        class="pagination-handler-container ${this.isDisabled?"review-disabled":""} ${this.isLinksVisible?"":"link-disabled"}"
      >
        <a class="policy-button alp-body14" @click=${this.onPolicyClick}>${this.policyText}</a>
        ${this.renderPaginationContent()}
        <a class="write-review-button alp-ht alp-body14" @click=${this.onWriteReviewClick}
          >${this.writeReviewText}</a
        >
      </div>
    `}};ur([i({type:String})],wr.prototype,"productNo",2),ur([i({type:String})],wr.prototype,"paginationType",2),ur([i({type:Boolean})],wr.prototype,"isDisabled",2),ur([i({type:Number})],wr.prototype,"totalPages",2),ur([i({type:Number})],wr.prototype,"currentPage",2),ur([i({type:Boolean})],wr.prototype,"isLinksVisible",2),ur([i({type:Boolean})],wr.prototype,"isShowPolicy",2),ur([i({type:Boolean})],wr.prototype,"isMoreLoading",2),ur([i({type:Boolean})],wr.prototype,"hasMoreReviews",2),wr=ur([ae("review-pagination-handler")],wr);var vr=Object.defineProperty,mr=Object.getOwnPropertyDescriptor,yr=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?mr(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&vr(t,i,s),s};let fr=class extends ht{constructor(){super(...arguments),this.showImage=!0,this.productName="",this.productImageUrl="",this.margin="0",this.containerQueryInfo={name:"",breakpoints:{small:0,medium:440,large:840}}}createRenderRoot(){return this}render(){return Je`
      <style>.product-thumbnail-container, .product-thumbnail-container--default { margin: ${this.margin}; } .product-thumbnail-container { width: 36px; height: 36px; overflow: hidden; border-radius: 50%; } .product-thumbnail-container > img { width: 100%; height: 100%; object-fit: cover; } .product-thumbnail-container--default { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; overflow: hidden; border-radius: 50%; background: var(--alp-review-card-gray05, rgba(30, 41, 59, 0.05)); } .product-thumbnail--default { width: 70%; height: 70%; } ${this.containerQueryInfo.name?`\n @container ${this.containerQueryInfo.name} (min-width: ${this.containerQueryInfo.breakpoints.medium}px) and (max-width: ${this.containerQueryInfo.breakpoints.large}px) {\n .product-thumbnail-container,\n .product-thumbnail-container--default {\n width: 34px;\n height: 34px;\n }\n }\n @container ${this.containerQueryInfo.name} (min-width: ${this.containerQueryInfo.breakpoints.large}px) {\n .product-thumbnail-container,\n .product-thumbnail-container--default {\n width: 36px;\n height: 36px;\n }\n }\n `:"\n @media (max-width: 839px) {\n .product-thumbnail-container,\n .product-thumbnail-container--default {\n width: 30px;\n height: 30px;\n }\n }\n @media (min-width: 840px) {\n .product-thumbnail-container,\n .product-thumbnail-container--default {\n width: 36px;\n height: 36px;\n }\n }"}</style>
      
      ${this.showImage?this.productImageUrl?Je`<div class="product-thumbnail-container">
              <img
                src=${this.productImageUrl}
                alt=${this.productName||"product image"}
                loading="lazy"
              />
            </div>`:Je`
              <div class="product-thumbnail-container--default">
                <review-custom-icon
                  class="product-thumbnail--default"
                  .type=${At}
                  .color=${"var(--alp-review-icon-gray10)"}
                ></review-custom-icon>
              </div>
            `:null}
    `}};yr([i({type:Boolean})],fr.prototype,"showImage",2),yr([i({type:String})],fr.prototype,"productName",2),yr([i({type:String})],fr.prototype,"productImageUrl",2),yr([i({type:String})],fr.prototype,"margin",2),yr([i({type:Object})],fr.prototype,"containerQueryInfo",2),fr=yr([ae("review-product-thumbnail")],fr);var br=Object.defineProperty,xr=Object.getOwnPropertyDescriptor,_r=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?xr(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&br(t,i,s),s};let Cr=class extends ht{constructor(){super(),this.productName="",this.productPrice=0,this.showProductName=!0,this.showPrice=!0,this.fontWeight="500",this.fontSizeClassSmall_name="alp-caption10",this.fontSizeClassMedium_name="alp-caption11",this.fontSizeClassLarge_name="alp-body12",this.fontSizeClassSmall_price="alp-caption10",this.fontSizeClassMedium_price="alp-caption11",this.fontSizeClassLarge_price="alp-body12",this.containerQueryInfo={name:"",breakpoints:{small:0,medium:440,large:840}},this.priceText="\uc6d0",this.priceText=si.SHARED.PRODUCT_NAME_PRICE.CURRENCY_WON}createRenderRoot(){return this}render(){return Je`
      <style>.product-name-price-container { display: flex; flex-direction: column; gap: 5px; } .product-name { overflow: hidden; color: var(--alp-review-text-gray100, rgba(30, 41, 59, 0.8)); white-space: nowrap; text-overflow: ellipsis; font-weight: ${this.fontWeight}; } .product-price { overflow: hidden; color: var(--alp-review-text-gray50, rgba(30, 41, 59, 0.5)); white-space: nowrap; text-overflow: ellipsis; line-height: 130%; letter-spacing: -0.11px; } .product-name, .product-price { display: none; } ${this.containerQueryInfo.name?`\n @container ${this.containerQueryInfo.name} (min-width: ${this.containerQueryInfo.breakpoints.small}px) and (max-width: ${this.containerQueryInfo.breakpoints.medium}px) {\n .product-name, .product-price {\n display: none;\n }\n .product-name--sm {\n display: block;\n }\n .product-price--sm {\n display: block;\n }\n }\n @container ${this.containerQueryInfo.name} (min-width: ${this.containerQueryInfo.breakpoints.medium}px) and (max-width: ${this.containerQueryInfo.breakpoints.large}px) {\n .product-name, .product-price {\n display: none;\n }\n .product-name--md {\n display: block;\n }\n .product-price--md {\n display: block;\n }\n }\n @container ${this.containerQueryInfo.name} (min-width: ${this.containerQueryInfo.breakpoints.large}px) {\n .product-name, .product-price {\n display: none;\n }\n .product-name--lg {\n display: block;\n }\n .product-price--lg {\n display: block;\n }\n }\n `:"\n @media (max-width: 439px) {\n .product-name--sm {\n display: block;\n }\n .product-price--sm {\n display: block;\n }\n }\n\n @media (min-width: 440px) and (max-width: 839px) {\n .product-name--md {\n display: block;\n }\n .product-price--md {\n display: block;\n }\n }\n\n @media (min-width: 840px) {\n .product-name--lg {\n display: block;\n }\n .product-price--lg {\n display: block;\n }\n }\n "}</style>
      <div class="product-name-price-container">
        ${this.showProductName&&this.productName?Je` <p class="product-name product-name--sm ${this.fontSizeClassSmall_name}">
                ${this.productName}
              </p>
              <p class="product-name product-name--md ${this.fontSizeClassMedium_name}">
                ${this.productName}
              </p>
              <p class="product-name product-name--lg ${this.fontSizeClassLarge_name}">
                ${this.productName}
              </p>`:null}
        ${this.showPrice&&this.productPrice?Je`<p class="product-price product-price--sm ${this.fontSizeClassSmall_price}">
                ${this.productPrice?.toLocaleString()}${this.priceText}
              </p>
              <p class="product-price product-price--md ${this.fontSizeClassMedium_price}">
                ${this.productPrice?.toLocaleString()}${this.priceText}
              </p>
              <p class="product-price product-price--lg ${this.fontSizeClassLarge_price}">
                ${this.productPrice?.toLocaleString()}${this.priceText}
              </p>`:null}
      </div>
    `}};_r([i({type:String})],Cr.prototype,"productName",2),_r([i({type:Number})],Cr.prototype,"productPrice",2),_r([i({type:Boolean})],Cr.prototype,"showProductName",2),_r([i({type:Boolean})],Cr.prototype,"showPrice",2),_r([i({type:String})],Cr.prototype,"fontWeight",2),_r([i({type:String})],Cr.prototype,"fontSizeClassSmall_name",2),_r([i({type:String})],Cr.prototype,"fontSizeClassMedium_name",2),_r([i({type:String})],Cr.prototype,"fontSizeClassLarge_name",2),_r([i({type:String})],Cr.prototype,"fontSizeClassSmall_price",2),_r([i({type:String})],Cr.prototype,"fontSizeClassMedium_price",2),_r([i({type:String})],Cr.prototype,"fontSizeClassLarge_price",2),_r([i({type:Object})],Cr.prototype,"containerQueryInfo",2),Cr=_r([ae("review-product-name-price")],Cr);var $r=Object.defineProperty,Or=Object.getOwnPropertyDescriptor,kr=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Or(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&$r(t,i,s),s};let Sr=class extends ht{constructor(){super(...arguments),this.averageRating=0,this.reviewCount=0,this.showReviewCount=!0,this.showRating=!0,this.fontWeight="500",this.fontSizeClassSmallRating="alp-caption10",this.fontSizeClassMediumRating="alp-caption11",this.fontSizeClassLargeRating="alp-body12",this.fontSizeClassSmall="alp-caption10",this.fontSizeClassMedium="alp-caption11",this.fontSizeClassLarge="alp-body12",this.containerQueryInfo={name:"",breakpoints:{small:0,medium:440,large:840}}}createRenderRoot(){return this}reviewText(e){return si.SHARED.PRODUCT_RATING_COUNT.REVIEW_COUNT_TEXT(e)}render(){return Je`
      <style>.product-rating-count-container { display: flex; align-items: center; gap: 2px; width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; } .product-rating { display: flex; align-items: center; gap: 1px; width: fit-content; } .product-rating-text { font-weight: ${this.fontWeight}; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; } .product-review-count { color: var(--alp-review-text-gray50, rgba(30, 41, 59, 0.5)); min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; } .product-rating-text, .product-review-count { display: none; } ${this.containerQueryInfo.name?`\n @container ${this.containerQueryInfo.name} (min-width: ${this.containerQueryInfo.breakpoints.small}px) and (max-width: ${this.containerQueryInfo.breakpoints.medium}px) {\n .product-rating-text, .product-review-count {\n display: none;\n }\n .product-rating-text--sm {\n display: flex;\n }\n .product-review-count--sm {\n display: flex;\n }\n }\n @container ${this.containerQueryInfo.name} (min-width: ${this.containerQueryInfo.breakpoints.medium}px) and (max-width: ${this.containerQueryInfo.breakpoints.large}px) {\n .product-rating-text, .product-review-count {\n display: none;\n } \n .product-rating-text--md {\n display: flex;\n }\n .product-review-count--md {\n display: flex;\n }\n }\n @container ${this.containerQueryInfo.name} (min-width: ${this.containerQueryInfo.breakpoints.large}px) {\n .product-rating-text, .product-review-count {\n display: none;\n } \n .product-rating-text--lg {\n display: flex;\n }\n .product-review-count--lg {\n display: flex;\n }\n }\n `:"@media (max-width: 439px) {\n .product-rating-text--sm {\n display: flex;\n }\n .product-review-count--sm {\n display: flex;\n }\n }\n\n @media (min-width: 440px) and (max-width: 839px) {\n .product-rating-text--md {\n display: flex;\n }\n .product-review-count--md {\n display: flex;\n }\n }\n\n @media (min-width: 840px) {\n .product-rating-text--lg {\n display: flex;\n }\n .product-review-count--lg {\n display: flex;\n }\n }"}</style>
      <div class="product-rating-count-container">
        ${this.showRating?Je` <div class="product-rating">
              <review-star-icon size="14"></review-star-icon>
              <p
                class="product-rating-text product-rating-text--sm ${this.fontSizeClassSmallRating}"
              >
                ${Number.isFinite(this.averageRating)?this.averageRating?.toFixed(1):"0.0"}
              </p>
              <p
                class="product-rating-text product-rating-text--md ${this.fontSizeClassMediumRating}"
              >
                ${Number.isFinite(this.averageRating)?this.averageRating?.toFixed(1):"0.0"}
              </p>
              <p
                class="product-rating-text product-rating-text--lg ${this.fontSizeClassLargeRating}"
              >
                ${Number.isFinite(this.averageRating)?this.averageRating?.toFixed(1):"0.0"}
              </p>
            </div>`:null}
        ${this.showReviewCount&&this.showRating?Je`
              <review-custom-icon
                .type=${Nt}
                .width=${8}
                .height=${12}
                .color=${"var(--alp-review-icon-gray10)"}
              ></review-custom-icon>
            `:null}
        ${this.showReviewCount?Je`
              <p class="product-review-count product-review-count--sm ${this.fontSizeClassSmall}">
                ${this.reviewText(this.reviewCount)}
              </p>
              <p class="product-review-count product-review-count--md ${this.fontSizeClassMedium}">
                ${this.reviewText(this.reviewCount)}
              </p>
              <p class="product-review-count product-review-count--lg ${this.fontSizeClassLarge}">
                ${this.reviewText(this.reviewCount)}
              </p>
            `:null}
      </div>
    `}};kr([i({type:Number})],Sr.prototype,"averageRating",2),kr([i({type:Number})],Sr.prototype,"reviewCount",2),kr([i({type:Boolean})],Sr.prototype,"showReviewCount",2),kr([i({type:Boolean})],Sr.prototype,"showRating",2),kr([i({type:String})],Sr.prototype,"fontWeight",2),kr([i({type:String})],Sr.prototype,"fontSizeClassSmallRating",2),kr([i({type:String})],Sr.prototype,"fontSizeClassMediumRating",2),kr([i({type:String})],Sr.prototype,"fontSizeClassLargeRating",2),kr([i({type:String})],Sr.prototype,"fontSizeClassSmall",2),kr([i({type:String})],Sr.prototype,"fontSizeClassMedium",2),kr([i({type:String})],Sr.prototype,"fontSizeClassLarge",2),kr([i({type:Object})],Sr.prototype,"containerQueryInfo",2),Sr=kr([ae("review-product-rating-count")],Sr);var Er=Object.defineProperty,Rr=Object.getOwnPropertyDescriptor,Lr=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Rr(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Er(t,i,s),s};let Ir=class extends ht{constructor(){super(...arguments),this.left=0,this.top=0}createRenderRoot(){return super.createRenderRoot()}render(){return Je`<div class="content" style="position:static">
      <slot></slot>
    </div>`}};Ir.styles=[Ni,Di,ue`:host{z-index:var(--alp-overlay-z,1000);pointer-events:none;top:0;left:0;position:fixed!important}.content{pointer-events:auto}`],Lr([i({type:Number})],Ir.prototype,"left",2),Lr([i({type:Number})],Ir.prototype,"top",2),Ir=Lr([ae("review-overlay")],Ir);var Pr=Object.defineProperty,Tr=Object.getOwnPropertyDescriptor,Ar=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Tr(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Pr(t,i,s),s};let Nr=class extends ht{constructor(){super(...arguments),this.size=""}createRenderRoot(){return this}render(){return Je`
      <style>review-star-icon { display: flex; }</style>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        .style="color: ${this.color??"var(--alp-common-color)"};"
        width="${this.size}"
        height="${this.size}"
        viewBox="0 0 12.5 12"
        fill="none"
      >
        <path
          d="M5.33799 1.40839C5.54995 0.756041 6.47285 0.756041 6.68481 1.40839L7.44214 3.7392C7.53693 4.03094 7.8088 4.22846 8.11555 4.22846H10.5663C11.2522 4.22846 11.5374 5.10619 10.9825 5.50937L8.9998 6.94989C8.75163 7.13019 8.64778 7.44979 8.74258 7.74153L9.4999 10.0723C9.71186 10.7247 8.96522 11.2672 8.4103 10.864L6.42759 9.42346C6.17943 9.24316 5.84338 9.24316 5.59521 9.42346L3.6125 10.864C3.05758 11.2672 2.31094 10.7247 2.5229 10.0723L3.28023 7.74153C3.37502 7.44979 3.27118 7.13019 3.02301 6.94989L1.0403 5.50937C0.485382 5.10619 0.770574 4.22846 1.45649 4.22846H3.90725C4.21401 4.22846 4.48587 4.03094 4.58066 3.7392L5.33799 1.40839Z"
          fill="currentColor"
        />
      </svg>
    `}};Ar([i({type:String})],Nr.prototype,"size",2),Ar([i({type:String})],Nr.prototype,"color",2),Nr=Ar([ae("review-star-icon")],Nr);const Dr={tabletMin:440,pcMin:840};class Mr{constructor(){this.listeners=new Set,this.scheduled=!1,this.bp=Dr,this.lastTier=O(window.innerWidth,this.bp);const e=()=>{this.scheduled||(this.scheduled=!0,requestAnimationFrame(()=>{this.scheduled=!1;const e=O(window.innerWidth,this.bp);if(e!==this.lastTier){this.lastTier=e;for(const t of this.listeners)t(e)}}))};window.addEventListener("resize",e,{passive:!0}),window.visualViewport&&window.visualViewport.addEventListener("resize",e,{passive:!0})}static get i(){return this._i??(this._i=new Mr)}get current(){return this.lastTier}setBreakpoints(e){this.bp={...this.bp,...e};const t=O(window.innerWidth,this.bp);if(t!==this.lastTier){this.lastTier=t;for(const e of this.listeners)e(t)}}add(e){this.listeners.add(e)}remove(e){this.listeners.delete(e)}}const Wr=Mr.i;class zr{constructor(e,t,i={}){this.localBp=Dr,this.onTier=e=>{this.cb(e),this.opts.requestUpdate&&this.host.requestUpdate()},this.host=e,this.cb=t,this.opts={immediate:i.immediate??!0,requestUpdate:i.requestUpdate??!0},i.target&&"window"!==i.target&&("self"===i.target?e&&e.ownerDocument&&(this.elementTarget=e):i.target instanceof HTMLElement&&(this.elementTarget=i.target)),i.breakpoints&&(this.elementTarget?this.localBp={...Dr,...i.breakpoints}:Wr.setBreakpoints(i.breakpoints)),e.addController(this)}hostConnected(){if(this.elementTarget){const e=e=>{const t=O(e??(this.elementTarget?this.elementTarget.clientWidth:window.innerWidth),this.localBp);t!==this.lastElementTier&&(this.lastElementTier=t,this.onTier(t))};this.ro=new ResizeObserver(t=>{const i=t[0],r=i?.contentRect?.width;e(r)}),this.ro.observe(this.elementTarget),this.opts.immediate&&e()}else Wr.add(this.onTier),this.opts.immediate&&this.onTier(Wr.current)}hostDisconnected(){this.elementTarget?(this.ro&&this.ro.disconnect(),this.ro=void 0):Wr.remove(this.onTier)}}var jr=Object.defineProperty,Vr=Object.getOwnPropertyDescriptor,Fr=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Vr(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&jr(t,i,s),s};let Br=class extends ht{constructor(){super(...arguments),this.surveyAnswer=[],this.color="var(--alp-review-text-gray50)",this.fontSizeClass="alp-body15",this.resizeCtrl=new zr(this,e=>{switch(e){case"mobile":case"tablet":this.fontSizeClass="alp-body14";break;default:this.fontSizeClass="alp-body13"}})}createRenderRoot(){return this}render(){return Je`
      <style>.survey-answer-container { display: flex; gap: 3px; flex-wrap: wrap; padding: 2px 12px 2px 0px; p { color: ${this.color}; } }</style>

      <div class="survey-answer-container">
        ${this.surveyAnswer?.map((e,t)=>Je`<p class="${this.fontSizeClass} alp-line14">
              <span class="${this.fontSizeClass} alp-medium">${e.label}</span>
              : ${e.answer} ${t!==this.surveyAnswer.length-1?", ":""}
            </p>`)}
      </div>
    `}};Fr([i({type:Array})],Br.prototype,"surveyAnswer",2),Fr([i({type:String})],Br.prototype,"color",2),Fr([r()],Br.prototype,"fontSizeClass",2),Br=Fr([ae("review-survey-answer")],Br);var Ur=Object.defineProperty,Hr=Object.getOwnPropertyDescriptor,Gr=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Hr(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Ur(t,i,s),s};let qr=class extends ht{constructor(){super(...arguments),this.label="Hello Lit"}render(){return Je`<div part="container">${this.label}</div>`}};qr.styles=ue`:host{display:block}`,Gr([i({type:String})],qr.prototype,"label",2),qr=Gr([ae("review-swiper-handler")],qr);var Yr=Object.defineProperty,Kr=Object.getOwnPropertyDescriptor,Zr=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Kr(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Yr(t,i,s),s};let Jr=class extends ht{constructor(){super(),this.sizeType="small",this.color="var(--alp-review-text-gray50)",this.fontSizeClassSmall="alp-caption11",this.fontSizeClassMedium="alp-body12",this.fontSizeClassLarge="alp-body13",this.fontWeight="500",this.otherText="",this.isPlatformShowing=!0,this.isWriter=!0,this.isVerified=!0,this.userName="",this.loginProvider="kakao",this.userText="\ub2d8\uc774",this.mapIconName={[ar]:"smart-store",[lr]:"blog",[pr]:"instagram"},this.externalPlatforms=[ar,lr,pr],this._randomColor=["#1E293B","#849E15","#0071D4","#FF5B00","#CF005D","#00ABFF","#00A65E","#9600EF","#FFB600"],this._lastColorIndex=-1,this.getRandomColor=()=>{let e;do{e=Math.floor(Math.random()*this._randomColor.length)}while(e===this._lastColorIndex&&this._randomColor.length>1);return this._lastColorIndex=e,this._randomColor[e]},this.isExternalPlatform=()=>this.externalPlatforms.includes(this.review.platform_display),this.userText=si.SHARED.USER_INFO.USER_SUFFIX}createRenderRoot(){return this}willUpdate(e){super.willUpdate(e),e.has("review")&&this.review&&(this.isVerified=this.review.is_verified,this.userName=this.review.user_info,this.loginProvider=this.review.login_provider)}render(){const e=this.isExternalPlatform()?Je`
          
          <div class="user-info-icon">
            <img
              loading="lazy"
              alt="platform icon"
              class="platform-icon--mo"
              .src="${te}/review-widget/${this.mapIconName[this.review.platform_display]+"-square"}.png"
            />
          </div>
        `:null,t="\uc54c\ud30c\ub9ac\ubdf0"===this.review.platform_display||"CAFE24"===this.review.platform_display?Je`
            
            <div class="user-info-icon border-circle">
              ${this.isVerified?Je`<div class="user-info-icon__badge">
                    ${si.SHARED.USER_INFO.VERIFIED_PURCHASE}
                  </div>`:null}
              <review-custom-icon
                .color=${this.getRandomColor()}
                .type=${St}
                .width=${36}
                .height=${36}
              ></review-custom-icon>
            </div>
          `:null,i=this.isExternalPlatform()?Je`
          
          <div class="user-info-icon">
            <img
              loading="lazy"
              alt="platform icon"
              class="platform-icon"
              .src="${te}/review-widget/${this.mapIconName[this.review.platform_display]+"-circle"}.png"
            />
          </div>
        `:t;return Je`
      <style>.user-info-container--lg, .user-info-container--sm { --icon-size-mo: 13px; --icon-size-pc: 36px; --icon-radius-mo: 0; --icon-radius-pc: 50%; --gap-mo: 4px; --gap-pc: 12px; display: flex; align-items: center; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .user-info-container--lg { gap: var(--gap-pc); } .user-info-container--lg .platform-icon { display: flex; position: relative; overflow: hidden; width: var(--icon-size-pc); height: var(--icon-size-pc); border-radius: var(--icon-radius-pc); } .user-info-container--lg .platform-icon--mo { display: none; } .user-info-container--lg .user-info-name { align-items: center; color: ${this.color}; font-weight: ${this.fontWeight}; } .user-info-container--sm { gap: var(--gap-mo); } .user-info-container--sm .platform-icon { display: none; } .user-info-container--sm .platform-icon--mo { display: flex; width: var(--icon-size-mo); height: var(--icon-size-mo); border-radius: var(--icon-radius-mo); } .user-info-container--sm .user-info-name { align-items: center; color: ${this.color}; font-weight: ${this.fontWeight}; } .user-info-container--sm .user-info-icon__badge { display: none; } .user-info-container--lg .user-info-icon { position: relative; overflow: hidden; width: var(--icon-size-pc); height: var(--icon-size-pc); border-radius: var(--icon-radius-pc); flex-shrink: 0; } .user-info-container--sm .user-info-icon { position: relative; overflow: hidden; width: var(--icon-size-mo); height: var(--icon-size-mo); border-radius: var(--icon-radius-mo); flex-shrink: 0; } .user-info-icon.border-circle { box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.45) inset; } .user-info-icon__badge { position: absolute; background-color: #000; color: #fff; padding: 5px 10px 3px 10px; text-align: center; left: -10px; top: 3px; transform: rotate(-45deg); font-size: 8px; line-height: 1; font-weight: 600; fill: #1e293b; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25)); } .user-info-name__badge { display: flex; padding: 4px 6px; justify-content: center; align-items: center; border-radius: 4px; background: var(--alp-review-card-gray05); } .user-info-name { display: none; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } @media (max-width: 439px) { .user-info-name--sm { display: block; } } @media (min-width: 440px) and (max-width: 839px) { .user-info-name--md { display: block; } } @media (min-width: 840px) { .user-info-name--lg { display: block; } }</style>

      <div
        class="${"small"===this.sizeType?"user-info-container--sm":"user-info-container--lg"}"
      >
        ${this.isPlatformShowing?"small"===this.sizeType?e:i:null}
        ${this.isWriter?Je`
              <p class="user-info-name user-info-name--sm ${this.fontSizeClassSmall}">
                ${this.userName}${this.otherText?this.userText:""}
              </p>
              <p class="user-info-name user-info-name--md ${this.fontSizeClassMedium}">
                ${this.userName}${this.otherText?this.userText:""}
              </p>
              <p class="user-info-name user-info-name--lg ${this.fontSizeClassLarge}">
                ${this.userName}${this.otherText?this.userText:""}
              </p>
            `:null}
        
      </div>
    `}};Zr([i({type:Object})],Jr.prototype,"review",2),Zr([i({type:Object})],Jr.prototype,"designOption",2),Zr([i({type:String})],Jr.prototype,"sizeType",2),Zr([i({type:String})],Jr.prototype,"color",2),Zr([i({type:String})],Jr.prototype,"fontSizeClassSmall",2),Zr([i({type:String})],Jr.prototype,"fontSizeClassMedium",2),Zr([i({type:String})],Jr.prototype,"fontSizeClassLarge",2),Zr([i({type:String})],Jr.prototype,"fontWeight",2),Zr([i({type:String})],Jr.prototype,"otherText",2),Zr([i({type:Boolean})],Jr.prototype,"isPlatformShowing",2),Zr([i({type:Boolean})],Jr.prototype,"isWriter",2),Zr([r()],Jr.prototype,"isVerified",2),Zr([r()],Jr.prototype,"userName",2),Zr([r()],Jr.prototype,"loginProvider",2),Jr=Zr([ae("review-user-info")],Jr);var Qr=Object.defineProperty,Xr=Object.getOwnPropertyDescriptor,eo=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Xr(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Qr(t,i,s),s};let to=class extends ht{constructor(){super(...arguments),this.totalPages=10,this.currentPage=1,this.onPrevClick=e=>{e.preventDefault(),e.stopPropagation(),1!==this.currentPage&&this.dispatchEvent(new CustomEvent("paginationPrevClick",{bubbles:!0}))},this.onNextClick=e=>{e.preventDefault(),e.stopPropagation(),this.currentPage>=this.totalPages||this.dispatchEvent(new CustomEvent("paginationNextClick",{bubbles:!0}))},this.onPaginationBulletClick=(e,t)=>{e.preventDefault(),e.stopPropagation(),this.currentPage!==t+1&&this.dispatchEvent(new CustomEvent("paginationBulletClick",{bubbles:!0,detail:{index:t}}))}}createRenderRoot(){return this}getPageRange(e=10){const t=Math.ceil(this.currentPage/e);return{start:(t-1)*e+1,end:Math.min(t*e,this.totalPages)}}renderDesktopLayout(){const{start:e,end:t}=this.getPageRange();return Je`
      <div class="pagination-layout pagination-layout--desktop">
        <button
          type="button"
          class="arrow-button"
          ?disabled=${1===this.currentPage}
          @click=${e=>this.onPrevClick(e)}
        >
          <review-custom-icon
            type="${ft}"
            width="18"
            height="18"
            color="var(--alp-review-icon-gray60)"
          ></review-custom-icon>
        </button>

        ${Array.from({length:t-e+1},(t,i)=>{const r=e+i;return Je`
            <button
              type="button"
              class="pagination-button ${r===this.currentPage?"active":""}"
              @click=${e=>this.onPaginationBulletClick(e,r-1)}
            >
              ${r}
            </button>
          `})}

        <button
          type="button"
          class="arrow-button"
          ?disabled=${this.currentPage===this.totalPages}
          @click=${e=>this.onNextClick(e)}
        >
          <review-custom-icon
            type="${yt}"
            width="18"
            height="18"
            color="var(--alp-review-icon-gray60)"
          ></review-custom-icon>
        </button>
      </div>
    `}renderMobileLayout(){const{start:e,end:t}=this.getPageRange(5);return Je`
      <div class="pagination-layout pagination-layout--mobile">
        <button
          type="button"
          class="arrow-button"
          ?disabled=${1===this.currentPage}
          @click=${e=>this.onPrevClick(e)}
        >
          <review-custom-icon
            type="${ft}"
            width="18"
            height="18"
            color="var(--alp-review-icon-gray60)"
          ></review-custom-icon>
        </button>

        ${Array.from({length:t-e+1},(t,i)=>{const r=e+i;return Je`
            <button
              type="button"
              class="pagination-button ${r===this.currentPage?"active":""}"
              @click=${e=>this.onPaginationBulletClick(e,r-1)}
            >
              ${r}
            </button>
          `})}

        <button
          type="button"
          class="arrow-button"
          ?disabled=${this.currentPage===this.totalPages}
          @click=${e=>this.onNextClick(e)}
        >
          <review-custom-icon
            type="${yt}"
            width="18"
            height="18"
            color="var(--alp-review-icon-gray60)"
          ></review-custom-icon>
        </button>
      </div>
    `}render(){return Je`
      <style>review-number-pagination { display: flex; align-items: center; justify-content: center; min-width: fit-content; } .pagination-layout { display: flex; align-items: center; justify-content: center; gap: 5px; } .arrow-button { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border: 1px solid var(--alp-review-border-gray20); border-radius: 4px; cursor: pointer; } .arrow-button:disabled { opacity: 0.3; cursor: not-allowed; } .pagination-button { display: flex; align-items: center; justify-content: center; min-width: 36px; height: 36px; border: 1px solid var(--alp-review-border-gray20); border-radius: 4px; cursor: pointer; color: var(--alp-review-text-gray100); } .pagination-button.active { color: var(--alp-review-text-white); background-color: var(--alp-review-text-gray100); border: 1px solid var(--alp-review-text-gray100); } .pagination-layout--desktop { display: flex; } .pagination-layout--mobile { display: none; } @container (max-width: 839px) { .pagination-layout--desktop { display: none; } .pagination-layout--mobile { display: flex; } .arrow-button { padding: 10px; } .pagination-button { width: 36px; height: 36px; padding: 10px; } .pagination-button.last-page { border: 1px solid var(--alp-review-border-gray20); color: var(--alp-review-text-gray10); background-color: transparent; } .of-text { display: flex; align-items: center; justify-content: center; padding: 0 6px; font-size: 13px; color: var(--alp-review-text-gray50); } }</style>

      ${this.renderDesktopLayout()} ${this.renderMobileLayout()}
    `}};eo([i({type:Number})],to.prototype,"totalPages",2),eo([i({type:Number})],to.prototype,"currentPage",2),to=eo([ae("review-number-pagination")],to);var io=Object.defineProperty,ro=Object.getOwnPropertyDescriptor,oo=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ro(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&io(t,i,s),s};let so=class extends ht{constructor(){super(...arguments),this.totalPages=10,this.currentPage=1,this.onPrevClick=()=>{1!==this.currentPage&&this.dispatchEvent(new CustomEvent("paginationPrevClick",{bubbles:!0,composed:!0}))},this.onNextClick=()=>{this.currentPage>=this.totalPages||this.dispatchEvent(new CustomEvent("paginationNextClick",{bubbles:!0,composed:!0}))},this.onPaginationBulletClick=e=>{this.currentPage!==e+1&&this.dispatchEvent(new CustomEvent("paginationBulletClick",{bubbles:!0,composed:!0,detail:{index:e}}))}}createRenderRoot(){return this}getPageRange(){const e=Math.ceil(this.currentPage/10);return{start:10*(e-1)+1,end:Math.min(10*e,this.totalPages)}}render(){const{start:e,end:t}=this.getPageRange();return Je`
      <style>review-dot-pagination { display: flex; align-items: center; justify-content: center; min-width: fit-content; } .arrow-button { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; padding: 8px; cursor: pointer; } .arrow-button:first-child { margin-right: 6px; } .arrow-button:last-child { margin-left: 6px; } .arrow-button.disabled { opacity: 0.3; } .pagination-button { padding: 12px; border-radius: 50%; color: var(--alp-review-text-gray10); font-size: 0; cursor: pointer; } .pagination-button.active { color: var(--alp-review-text-gray100); } @container (max-width: 839px) { .arrow-button:first-child { margin-right: 0; } .arrow-button:last-child { margin-left: 0; } .pagination-button { padding: 11px; } } @container (max-width: 439px) { .pagination-button { padding: 7px; } }</style>

      <button
        class="arrow-button ${1===this.currentPage?"disabled":""}"
        @click=${this.onPrevClick}
      >
        <review-custom-icon
          type="${ft}"
          width="20"
          height="20"
          color="var(--alp-review-icon-gray60)"
        ></review-custom-icon>
      </button>
      ${Array.from({length:t-e+1},(t,i)=>{const r=e+i;return Je`
          <button
            class="pagination-button ${r===this.currentPage?"active":""}"
            @click=${()=>this.onPaginationBulletClick(r-1)}
          >
            <review-custom-icon
              type="${xt}"
              width="${9}"
              height="${9}"
              color="${r===this.currentPage?"var(--alp-review-text-gray100)":"var(--alp-review-text-gray10)"}"
            ></review-custom-icon>
          </button>
        `})}
      <button
        class="arrow-button ${this.currentPage===this.totalPages?"disabled":""}"
        @click=${this.onNextClick}
      >
        <review-custom-icon
          type="${yt}"
          width="20"
          height="20"
          color="var(--alp-review-icon-gray60)"
        ></review-custom-icon>
      </button>
    `}};oo([i({type:Number})],so.prototype,"totalPages",2),oo([i({type:Number})],so.prototype,"currentPage",2),so=oo([ae("review-dot-pagination")],so);var no=Object.defineProperty,ao=Object.getOwnPropertyDescriptor,po=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ao(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&no(t,i,s),s};let lo=class extends ht{constructor(){super(...arguments),this.isLoading=!1,this.hideButton=!1,this.onMoreClick=()=>{this.isLoading||this.dispatchEvent(new CustomEvent("moreButtonClick",{bubbles:!0,composed:!0}))}}createRenderRoot(){return this}render(){return Je`
      <style>review-more-button { display: flex; align-items: center; justify-content: center; width: clamp(320px, 100%, 440px); } .more-button-container { display: flex; align-items: center; justify-content: center; gap: 4px; width: 100%; box-sizing: border-box; padding: 0 4px; } .more-button { display: flex; align-items: center; justify-content: center; gap: 4px; width: clamp(320px, 100%, 440px); height: 50px; background-color: transparent; border: 1px solid var(--alp-review-border-gray20); color: var(--alp-review-text-gray100); border-radius: 4px; cursor: pointer; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; } .more-button:active { background-color: var(--alp-review-card-gray03); } .loading-text { color: var(--alp-review-text-gray50); } @container (max-width: 839px) { .more-button { height: 44px; } } @container (max-width: 439px) { .more-button { height: 40px; } }</style>

      <div class="more-button-container">
        ${this.hideButton?Je``:Je`
              <button
                class="more-button alp-body14 alp-medium"
                @click=${this.onMoreClick}
              >
                ${this.isLoading?Je`<span class="loading-text"
                      >ë¦¬ë·°ë¥¼ ë¶ë¬ì¤ë ì¤ ...</span
                    >`:Je`ë ë³´ê¸°`}
              </button>
            `}
      </div>
    `}};po([i({type:Boolean})],lo.prototype,"isLoading",2),po([i({type:Boolean})],lo.prototype,"hideButton",2),lo=po([ae("review-more-button")],lo);var co=Object.defineProperty,ho=Object.getOwnPropertyDescriptor,go=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ho(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&co(t,i,s),s};let uo=class extends ht{constructor(){super(...arguments),this.tabs=[],this.currentTab=""}createRenderRoot(){return this}update(e){super.update(e),e.has("tabs")&&this.changeTab(this.tabs.find(e=>e.value===this.currentTab)??this.tabs[0])}changeTab(e){this.currentTab=e.value,this.dispatchEvent(new CustomEvent("changeTab",{bubbles:!0,composed:!0,detail:{value:e.value}}))}render(){return Je`
      <style>.toggle-tab { display: flex; align-items: center; justify-content: center; background-color: var(--alp-review-card-gray07); border-radius: 6px; padding: 4px; width: fit-content; } .toggle-tab__item { display: flex; align-items: center; justify-content: center; padding: 12px 24px; cursor: pointer; background-color: transparent; color: var(--alp-review-text-gray60); border-radius: 6px; transition: all 0.15s ease; &:hover { background-color: var(--alp-review-bg-gray02); } &.active { background-color: var(--alp-review-bg-white); color: var(--alp-review-text-gray100); span { font-weight: 700; } } } @media (max-width: 440px) { review-common-tab { width: 100%; } .toggle-tab { display: grid; grid-template-columns: repeat(${this.tabs.length}, 1fr); min-width: 100%; } }</style>

      <div class="toggle-tab">
        ${this.tabs.map(e=>Je`
            <div
              @click=${()=>this.changeTab(e)}
              class="toggle-tab__item ${this.currentTab===e.value?"active":""}"
            >
              <span class="alp-body15 alp-line15">${e.text}</span>
            </div>
          `)}
      </div>
    `}};go([i({type:Array})],uo.prototype,"tabs",2),go([i({type:String})],uo.prototype,"currentTab",2),uo=go([ae("review-common-tab")],uo);var wo=Object.defineProperty,vo=Object.getOwnPropertyDescriptor,mo=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?vo(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&wo(t,i,s),s};let yo=class extends ht{constructor(){super(...arguments),this.title="",this.content="",this.okButtonText="",this.cancelButtonText="",this.buttonDirection="row",this.isDark=!1,this.observer=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.updateTheme(),this.observer=new MutationObserver(()=>this.updateTheme()),this.observer.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]})}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect()}updateTheme(){this.isDark="dark"===document.documentElement.getAttribute("data-theme")}closeDialog(){Wi.closeByUi("review-common-dialog")}okDialog(){this.dispatchEvent(new CustomEvent("review:okDialog",{bubbles:!0,composed:!0})),Wi.closeByUi("review-common-dialog")}render(){return Je`
      <style>.common-dialog-container.dark-theme { box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5); } .common-dialog-container { display: flex; flex-direction: column; padding: 24px; background-color: var(--alp-review-bg-white); border-radius: 20px; min-width: 320px; } .common-dialog-container h2 { margin-bottom: 8px; white-space: pre-line; } .common-dialog-container p { color: var(--alp-review-text-gray60); white-space: pre-line; } .common-dialog-container .button-container { display: ${"column"===this.buttonDirection?"flex":"grid"}; flex-direction: ${"column"===this.buttonDirection?"column":"row"}; grid-template-columns: ${"row"===this.buttonDirection?"1fr 1fr":"1fr"}; gap: 8px; margin-top: 36px; } .common-dialog-container button { display: flex; padding: 11px 16px; justify-content: center; align-items: center; border-radius: 12px; cursor: pointer; } .button-container button:nth-of-type(1) { order: ${"row"===this.buttonDirection?1:2}; } .button-container button:nth-of-type(2) { order: ${"row"===this.buttonDirection?2:1}; }</style>

      <div class="common-dialog-container ${this.isDark?"dark-theme":""}">
        ${this.title?Je`<h2 class="alp-h22 alp-semi-bold alp-line14">${this.title}</h2>`:""}
        ${this.content?Je`<p class="alp-body14 alp-medium alp-line15">${this.content}</p>`:""}

        <div class="button-container">
          ${this.cancelButtonText?Je`<button
                style="border: 1px solid var(--alp-review-border-gray20);color: var(--alp-review-text-gray100)"
                @click=${this.closeDialog}
                class="alp-body16 alp-semi-bold alp-line14"
              >
                ${this.cancelButtonText}
              </button>`:""}
          ${this.okButtonText?Je`<button
                style="background: var(--alp-review-card-gray100);color: var(--alp-review-text-white)"
                @click=${this.okDialog}
                class="alp-body16 alp-semi-bold alp-line14"
              >
                ${this.okButtonText}
              </button>`:""}
        </div>
      </div>
    `}};mo([i({type:String})],yo.prototype,"title",2),mo([i({type:String})],yo.prototype,"content",2),mo([i({type:String})],yo.prototype,"okButtonText",2),mo([i({type:String})],yo.prototype,"cancelButtonText",2),mo([i({type:String})],yo.prototype,"buttonDirection",2),mo([r()],yo.prototype,"isDark",2),yo=mo([ae("review-common-dialog")],yo);let fo=class extends ht{constructor(){super(),this.closePopup=()=>{Wi.closeByUi("review-policy-popup")},this.policyContent={title:"\ub9ac\ubdf0 \uad00\ub828 \uc6b4\uc601\uc815\ucc45",policy:{title:"\ub9ac\ubdf0 \uc6b4\uc601 \uc815\ucc45",list:["\uc1fc\ud551\ubab0 \uc6b4\uc601 \ubc29\uce68\uc5d0 \ub530\ub77c \ubaa8\ub4e0 \ub9ac\ubdf0\ub294 \uac80\uc218 \ud6c4 \uac8c\uc2dc\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4.","\uc1fc\ud551\ubab0 \uc6b4\uc601 \ubc29\uce68\uc5d0 \uc704\ubc18\ub418\ub294 \uacbd\uc6b0, \ub9ac\ubdf0\ub294 \uc784\uc2dc \uc870\uce58(\uc608: \ube44\uacf5\uac1c \uc804\ud658, \uac8c\uc2dc \uc81c\ud55c \ub4f1)\uac00 \ucde8\ud574\uc9c8 \uc218 \uc788\uc2b5\ub2c8\ub2e4.","\uc704\ubc18 \uc0ac\uc720\uc5d0\ub294 \ubd80\uc801\uc808\ud55c \ud45c\ud604, \ud0c0\uc778 \uad8c\ub9ac \uce68\ud574, \uc0c1\uc5c5\uc801 \ubaa9\uc801\uc758 \ud64d\ubcf4\uc131 \uac8c\uc2dc\ubb3c \ub4f1\uc774 \ud3ec\ud568\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4.","\uc1fc\ud551\ubab0 \uc6b4\uc601 \ubc29\uce68\uc5d0 \ub530\ub77c \ubaa8\ub4e0 \ub9ac\ubdf0\ub294 \uac80\uc218 \ud6c4 \uac8c\uc2dc\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4."]},notification:{title:"\ub9ac\ubdf0 \uc54c\ub9bc \uc815\ucc45",desc:"\uace0\uac1d\ub2d8\uaed8\uc11c\ub294 \ub9ac\ubdf0 \uc774\uc6a9\uacfc \uad00\ub828\ud558\uc5ec SMS, \uc54c\ub9bc\ud1a1, \uc774\uba54\uc77c \ub4f1\uc73c\ub85c \uc544\ub798\uc640 \uac19\uc740 \uc548\ub0b4\ub97c \ubc1b\uc73c\uc2e4 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",list:["\uc1fc\ud551\ubab0 \uc6b4\uc601 \ubc29\uce68\uc5d0 \uc704\ubc18\ub418\ub294 \uacbd\uc6b0, \ub9ac\ubdf0\ub294 \uc784\uc2dc \uc870\uce58(\uc608: \ube44\uacf5\uac1c \uc804\ud658, \uac8c\uc2dc \uc81c\ud55c \ub4f1)\uac00 \ucde8\ud574\uc9c8 \uc218 \uc788\uc2b5\ub2c8\ub2e4.","\uc704\ubc18 \uc0ac\uc720\uc5d0\ub294 \ubd80\uc801\uc808\ud55c \ud45c\ud604, \ud0c0\uc778 \uad8c\ub9ac \uce68\ud574, \uc0c1\uc5c5\uc801 \ubaa9\uc801\uc758 \ud64d\ubcf4\uc131 \uac8c\uc2dc\ubb3c \ub4f1\uc774 \ud3ec\ud568\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4.","\uc6b4\uc601 \uc815\ucc45\uc5d0 \ub530\ub978 \uc870\uce58\ub294 \uc0ac\uc804 \uc548\ub0b4 \uc5c6\uc774 \uc774\ub8e8\uc5b4\uc9c8 \uc218 \uc788\uc2b5\ub2c8\ub2e4."]},close:"\ub2eb\uae30"},this.policyContent=si.SHARED.POLICY_POPUP.CONTENT}createRenderRoot(){return this}render(){return Je`
      <style>.policy-popup-container { display: flex; flex-direction: column; max-width: 340px; padding: 24px; border-radius: 20px; background: var(--alp-review-bg-white); } .policy-popup-container h2 { margin-bottom: 22px; } .policy-popup-container h3 { margin-bottom: 8px; } .policy-popup-container ul { margin-bottom: 24px; padding-left: 20px; } .policy-popup-container ul li, .policy-popup-container p { color: var(--alp-review-text-gray80); font-size: inherit; line-height: inherit; font-weight: inherit; list-style-type: disc; } .policy-popup-container button { display: flex; padding: 10px 16px; justify-content: center; align-items: center; border-radius: 12px; border: 1px solid var(--alp-review-border-gray20); background: var(--alp-review-bg-white); color: var(--alp-review-text-gray100); cursor: pointer; }</style>
      <div class="policy-popup-container">
        <h2 class="alp-h22 alp-semi-bold alp-line14">${this.policyContent.title}</h2>

        <h3 class="alp-body16 alp-semi-bold alp-line14">${this.policyContent.policy.title}</h3>
        <ul class="alp-body13 alp-line14">
          ${this.policyContent.policy.list.map(e=>Je`<li>${e}</li>`)}
        </ul>

        <h3 class="alp-body16 alp-semi-bold alp-line14">
          ${this.policyContent.notification.title}
        </h3>
        <p class="alp-body13 alp-line14">${this.policyContent.notification.desc}</p>
        <ul class="alp-body13 alp-line14">
          ${this.policyContent.notification.list.map(e=>Je`<li>${e}</li>`)}
        </ul>

        <button class="alp-body16 alp-semi-bold alp-line14" @click=${this.closePopup}>
          ${this.policyContent.close}
        </button>
      </div>
    `}};fo=((e,t)=>{for(var i,r=t,o=e.length-1;o>=0;o--)(i=e[o])&&(r=i(r)||r);return r})([ae("review-policy-popup")],fo);let bo=class extends ht{constructor(){super(...arguments),this.triggerText=si.SHARED.COMPLIANCE_GUIDE.TRIGGER,this.onTriggerClick=()=>{d("review-compliance-popup",{type:"overlay"}),Wi.open({key:"review-compliance-popup",onClose:()=>c("review-compliance-popup")})}}createRenderRoot(){return this}render(){return Je`
      <style>review-compliance-guide { display: flex; justify-content: center; align-items: center; padding: 8px 10px 16px; opacity: 0.8; } .compliance-guide-button { display: flex; justify-content: center; align-items: center; gap: 4px; cursor: pointer; background: none; border: none; outline: none; color: var(--alp-review-text-gray40); text-decoration-line: underline; } .compliance-guide-button span { color: currentColor; font-size: 12px; font-weight: 400; line-height: 110%; letter-spacing: -0.24px; }</style>
      <button class="compliance-guide-button" @click=${this.onTriggerClick}>
      <review-custom-icon
          .type=${Yt}
          width="14"
          height="14"
          color="var(--alp-review-text-gray40)"
        ></review-custom-icon>
        <span class="alp-body12">${this.triggerText}</span>
      </button>
    `}};bo=((e,t)=>{for(var i,r=t,o=e.length-1;o>=0;o--)(i=e[o])&&(r=i(r)||r);return r})([ae("review-compliance-guide")],bo);let xo=class extends ht{constructor(){super(...arguments),this.closePopup=()=>{Wi.closeByUi("review-compliance-popup")},this.content=si.SHARED.COMPLIANCE_GUIDE.CONTENT}createRenderRoot(){return this}render(){return Je`
      <style>.compliance-popup-container { display: flex; flex-direction: column; max-width: 340px; max-height: 600px; padding: 24px; overflow-y: auto; border-radius: 20px; background: var(--alp-review-bg-white); } .compliance-popup-container h2 { margin-bottom: 22px; } .compliance-popup-container h3 { margin-bottom: 8px; } .compliance-popup-container .compliance-section { margin-bottom: 24px; } .compliance-popup-container p { color: var(--alp-review-text-gray80); font-size: inherit; line-height: inherit; font-weight: inherit; } .compliance-popup-container button { display: flex; padding: 10px 16px; justify-content: center; align-items: center; border-radius: 12px; border: 1px solid var(--alp-review-border-gray20); background: var(--alp-review-bg-white); color: var(--alp-review-text-gray100); cursor: pointer; }</style>
      <div class="compliance-popup-container">
        <h2 class="alp-h22 alp-semi-bold alp-line14">${this.content.title}</h2>

        ${this.content.sections.map(e=>Je`
            <div class="compliance-section">
              <h3 class="alp-body16 alp-semi-bold alp-line14">${e.title}</h3>
              <p class="alp-body13 alp-line14">${e.detail}</p>
            </div>
          `)}

        <button class="alp-body16 alp-semi-bold alp-line14" @click=${this.closePopup}>
          ${this.content.close}
        </button>
      </div>
    `}};xo=((e,t)=>{for(var i,r=t,o=e.length-1;o>=0;o--)(i=e[o])&&(r=i(r)||r);return r})([ae("review-compliance-popup")],xo);var _o=Object.defineProperty,Co=Object.getOwnPropertyDescriptor,$o=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Co(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&_o(t,i,s),s};let Oo=class extends ht{constructor(){super(...arguments),this.rating=0,this.size=14,this.color="var(--alp-common-color)"}createRenderRoot(){return this}render(){return Je`
      <div
        style="display: flex; align-items: center;width:${Number(this.rating||0)*this.size}px;overflow:hidden"
      >
        ${Array.from({length:Math.ceil(Number(this.rating)||0)},()=>Je`<review-star-icon .size="${this.size}" .color=${this.color}></review-star-icon>`)}
      </div>
    `}};$o([i({type:Number})],Oo.prototype,"rating",2),$o([i({type:Number})],Oo.prototype,"size",2),$o([i({type:String})],Oo.prototype,"color",2),Oo=$o([ae("review-ratings-bundle")],Oo);const ko=ue`@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:0 0}}.review-skeleton,.review-skeleton-bg03,.review-skeleton-bg05{background-color:var(--alp-review-card-gray07);border-radius:8px}`,So=[Ni,Di,ko,ue`
    :host {
      display: block;
      width: 100%;
      font-family: var(--alp-common-font-family);

      container-name: ai-summary;
      container-type: inline-size;
    }

    .ai-summary {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 20px;
      width: 100%;
    }

    /* ------------------------------------------------------------ */
    /* í¤ëë¼ì¸ (icon + ë¬¸ì¥ + info-circle) */
    /* ------------------------------------------------------------ */
    .ai-summary__headline {
      display: flex;
      align-items: center;
      gap: 14px;
      width: 100%;
    }

    /* ê·¸ë¼ë°ì´ì ì¤íí´ ìì´ì½ (Figma 122:1312) */
    .ai-summary__icon {
      flex-shrink: 0;
      display: block;
      width: 25px;
      height: 28px;
    }

    .ai-summary__headline-text {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }

    .ai-summary__text {
      color: var(--alp-review-text-gray100);
      letter-spacing: -0.34px;
      word-break: break-word;
    }

    .ai-summary__info {
      position: relative;
      flex-shrink: 0;
      display: inline-flex;
      width: 17px;
      height: 17px;
      color: var(--alp-review-icon-gray40, #1e293b66);
      cursor: default;
    }

    .ai-summary__info svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    /* ì ë³´ ìì´ì½ í´í (í¸ë²/í¬ì»¤ì¤ ì) â Shadow DOM ë´ë¶ì ê²©ë¦¬, í­ì ë¤í¬ */
    /*   ì ëª© + ë¶ë¦¿ ë¦¬ì¤í¸ êµ¬ì¡° (Figma 401:2299) */
    .ai-summary__tooltip {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      z-index: 3;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: max-content;
      max-width: 280px;
      padding: 8px 12px;
      border-radius: 8px;
      background: #1a1d24;
      color: #ffffff;
      letter-spacing: -0.14px;
      line-height: 1.5;
      text-align: left;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.15s ease,
        visibility 0.15s ease;
      pointer-events: none;
    }

    .ai-summary__info:hover .ai-summary__tooltip,
    .ai-summary__info:focus-visible .ai-summary__tooltip {
      opacity: 1;
      visibility: visible;
    }

    /* í´í ì ëª© (Pretendard Bold 14px / line-height 1.5) */
    /*   resetSheet ê° p ì gray100 ìì ì§ì  ì§ì íë¯ë¡ white ëªì ë³µêµ¬ */
    /*   alp-body14 ê° line-height 1.1 ë¡ ë®ì¼ë¯ë¡ 1.5 ëªì ë³µêµ¬ */
    .ai-summary__tooltip-title {
      color: #ffffff;
      line-height: 1.5;
      letter-spacing: -0.14px;
    }

    /* í´í ë¶ë¦¿ ë¦¬ì¤í¸ â resetSheet ê° ul ì list-style/padding ì ë¦¬ìíë¯ë¡ disc/ë¤ì¬ì°ê¸° ë³µêµ¬ */
    .ai-summary__tooltip-list {
      list-style: disc;
      padding-inline-start: 18px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    /* í´í í­ëª© (Pretendard Regular 14px / line-height 1.5) â li ìë white ëªì ë³µêµ¬ */
    .ai-summary__tooltip-item {
      color: #ffffff;
      line-height: 1.5;
      letter-spacing: -0.14px;
    }

    /* ------------------------------------------------------------ */
    /* ìì½ ë°ì¤ + ìë´ ë¬¸êµ¬ */
    /* ------------------------------------------------------------ */
    .ai-summary__detail {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }

    .ai-summary__box {
      display: flex;
      align-items: stretch;
      width: 100%;
      border-radius: 16px;
      overflow: hidden;
    }

    .ai-summary__cell {
      flex: 1 0 0;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 24px 28px 28px;
      background: var(--alp-review-card-gray03, #1e293b08);
    }

    /* ë¨ì¼ ì¹ì(ì°¸ê³ í  ì  ìì ë±) â êµ¬ë¶ì  ìì´ ìì´ ë°ì¤ ì ì²´ í­ (Figma 122:1769) */
    .ai-summary__box--single .ai-summary__cell {
      width: 100%;
    }

    .ai-summary__cell-title {
      color: var(--alp-review-text-gray100);
      letter-spacing: -0.3px;
    }

    .ai-summary__cell-content {
      color: var(--alp-review-text-gray80, #1e293bcc);
      letter-spacing: -0.28px;
      line-height: 1.5;
      word-break: break-word;
      white-space: pre-wrap;
    }

    /* ì ì¬ì´ ì¸ë¡ êµ¬ë¶ì  (Figma 122:1331, 100px ì¤ì ì ë ¬) */
    .ai-summary__divider {
      flex-shrink: 0;
      align-self: center;
      width: 1px;
      height: 100px;
      background: var(--alp-review-border-gray20, #1e293b33);
    }

    .ai-summary__notice {
      color: var(--alp-review-text-gray50, #1e293b80);
      letter-spacing: -0.24px;
      word-break: break-word;
    }

    /* ------------------------------------------------------------ */
    /* ë¡ë© ì¤ì¼ë í¤ â ì¤ì  ë ì´ìì í¬ê¸° ê·¼ì¬(ìíí¸ ë°©ì§) */
    /*   placeholder ì/ëª¨ìì ê³µì© .review-skeleton(--alp-review-card-gray07) ì¬ì© */
    /* ------------------------------------------------------------ */
    .ai-summary__sk-icon {
      flex-shrink: 0;
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }
    .ai-summary__sk-headline {
      width: min(60%, 460px);
      height: 24px;
      border-radius: 6px;
    }
    /* ìì½ ë°ì¤ ëì´ = ì¤ì  ë°ì¤(Figma 122:1309) ì½ 129px */
    .ai-summary__sk-box {
      width: 100%;
      height: 129px;
      border-radius: 16px;
    }
    .ai-summary__sk-notice {
      width: min(40%, 320px);
      height: 17px;
      border-radius: 6px;
    }

    /* ------------------------------------------------------------ */
    /* íë¸ë¦¿ â í¨ë© ì¶ì */
    /* ------------------------------------------------------------ */
    @container ai-summary (max-width: ${ge(Kt)}) {
      .ai-summary__cell {
        padding: 20px 22px 24px;
      }
    }

    /* ------------------------------------------------------------ */
    /* ëª¨ë°ì¼ â ì¸ë¡ ì¤í, êµ¬ë¶ì  ê°ë¡ ì í */
    /* ------------------------------------------------------------ */
    @container ai-summary (max-width: ${ge(Zt)}) {
      .ai-summary {
        gap: 16px;
      }
      /* ëª¨ë°ì¼ í¤ë(Figma 122:2962): icon + (íì¤í¸ 15px Bold + info 13px) ìì§ ì¤ì ì ë ¬ */
      .ai-summary__headline {
        gap: 10px;
        align-items: center;
      }
      .ai-summary__icon {
        width: 22px;
        height: 24px;
      }
      /* íì¤í¸(15px)ì info(13px)ë¥¼ 4px ê°ê²©ì¼ë¡ ìì§ ì¤ì ì ë ¬ */
      .ai-summary__headline-text {
        gap: 4px;
      }
      /* ëª¨ë°ì¼ í¤ëë¼ì¸ì Bold 15px (Figma B15 - B). alp-body17 clamp ë³´ë¤ ë¤ ê·ì¹ì´ë¼ ì°ì  ì ì© */
      .ai-summary__text {
        font-size: 15px;
        line-height: 1.4;
        letter-spacing: -0.3px;
      }
      .ai-summary__info {
        width: 13px;
        height: 13px;
      }
      /* ì¢ì í­ìì í´í ì°ì¸¡ ìë¦¼ ë°©ì§: info ìì´ì½ ì°ì¸¡ ê¸°ì¤ ì ë ¬ + ì»¨íì´ë í­ ì í */
      .ai-summary__tooltip {
        left: auto;
        right: 0;
        max-width: min(280px, calc(100cqw - 24px));
      }

      .ai-summary__box {
        flex-direction: column;
        align-items: stretch;
      }
      .ai-summary__cell {
        padding: 18px 18px 20px;
      }
      .ai-summary__divider {
        align-self: stretch;
        width: auto;
        height: 1px;
      }

      /* ì¤ì¼ë í¤ â ëª¨ë°ì¼: ìì´ì½ ì¶ì, ë°ì¤ë ì¸ë¡ ì¤í ëì´ ê·¼ì¬ */
      .ai-summary__sk-icon {
        width: 22px;
        height: 22px;
      }
      .ai-summary__sk-headline {
        width: min(80%, 280px);
        height: 21px;
      }
      .ai-summary__sk-box {
        height: 210px;
      }
    }
  `];var Eo=Object.defineProperty,Ro=Object.getOwnPropertyDescriptor,Lo=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Ro(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Eo(t,i,s),s};let Io=class extends ht{constructor(){super(...arguments),this.aiSummary=null,this.loading=!1}sectionTitle(e){const t=e.title?.trim();return t||("caution"===e.tone?si.WIDGETS.BOARD.AI_SUMMARY.CAUTION:si.WIDGETS.BOARD.AI_SUMMARY.GOOD)}renderSparkleIcon(){return Je`
      <svg
        class="ai-summary__icon"
        viewBox="0 0 25.231 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          
          <radialGradient
            id="alpAiOrbBody"
            cx="0"
            cy="0"
            r="10"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-8.851e-8 -2.5231 2.3061 -8.0895e-8 12.6157 25.231)"
          >
            <stop stop-color="#ffffff" />
            <stop offset="0.126" stop-color="#d5d8fd" />
            <stop offset="0.252" stop-color="#abb2fa" />
            <stop offset="0.378" stop-color="#818bf8" />
            <stop offset="0.504" stop-color="#5764f5" />
            <stop offset="0.649" stop-color="#5f56fe" />
            <stop offset="0.798" stop-color="#8975ff" />
            <stop offset="0.899" stop-color="#b09eff" />
            <stop offset="1" stop-color="#d6c7ff" />
          </radialGradient>
          
          <radialGradient id="alpAiOrbGlow" cx="0.5" cy="0.5" r="0.5">
            <stop stop-color="#95ecfd" stop-opacity="0.9" />
            <stop offset="1" stop-color="#95ecfd" stop-opacity="0.3" />
          </radialGradient>
          
          <linearGradient id="alpAiOrbRim" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop stop-color="#ffffff" stop-opacity="0.7" />
            <stop offset="1" stop-color="#6de8ff" />
          </linearGradient>
          
          <linearGradient id="alpAiOrbBar" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop stop-color="#ffffff" />
            <stop offset="1" stop-color="#ffffff" stop-opacity="0.6" />
          </linearGradient>
          <filter id="alpAiOrbBlur3" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
          <filter id="alpAiOrbBlur2" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
          <filter id="alpAiOrbBlurSoft" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
          <clipPath id="alpAiOrbClip">
            <circle cx="12.6157" cy="12.6157" r="12.6157" />
          </clipPath>
        </defs>

        
        <ellipse
          cx="12.6157"
          cy="24.12"
          rx="7.39"
          ry="2.47"
          fill="#91caff"
          opacity="0.9"
          filter="url(#alpAiOrbBlur3)"
        />

        
        <g clip-path="url(#alpAiOrbClip)">
          <rect x="0" y="0" width="25.231" height="25.231" fill="url(#alpAiOrbBody)" />
          
          <ellipse
            cx="12.6157"
            cy="20.79"
            rx="9.77"
            ry="5.94"
            fill="url(#alpAiOrbGlow)"
            filter="url(#alpAiOrbBlur3)"
          />
          
          <circle
            cx="12.6157"
            cy="12.6157"
            r="11.62"
            fill="none"
            stroke="url(#alpAiOrbRim)"
            stroke-opacity="0.9"
            stroke-width="2"
            filter="url(#alpAiOrbBlur2)"
          />
          
          <ellipse
            cx="8.1"
            cy="4.9"
            rx="2.4"
            ry="1"
            transform="rotate(45 8.1 4.9)"
            fill="#ffffff"
            opacity="0.55"
            filter="url(#alpAiOrbBlurSoft)"
          />
          <ellipse
            cx="21"
            cy="5.4"
            rx="1.6"
            ry="0.9"
            transform="rotate(-41 21 5.4)"
            fill="#ffffff"
            opacity="0.4"
            filter="url(#alpAiOrbBlurSoft)"
          />
        </g>

        
        <circle cx="12.6157" cy="12.6157" r="12.366" fill="none" stroke="#ffffff" stroke-width="0.5" />

        
        <rect x="6.126" y="7.965" width="1.971" height="3.916" rx="0.986" fill="url(#alpAiOrbBar)" />
        <rect x="12.52" y="7.965" width="1.97" height="3.916" rx="0.985" fill="url(#alpAiOrbBar)" />
      </svg>
    `}renderInfoIcon(){return Je`
      <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.5 1.42a7.08 7.08 0 1 0 0 14.16 7.08 7.08 0 0 0 0-14.16ZM2.83 8.5a5.67 5.67 0 1 1 11.34 0 5.67 5.67 0 0 1-11.34 0Zm5.67-2.84a.71.71 0 1 0 0-1.41.71.71 0 0 0 0 1.41Zm.7 2.13a.71.71 0 0 0-1.41 0v3.54a.71.71 0 0 0 1.41 0V7.79Z"
          fill="currentColor"
        />
      </svg>
    `}renderSummaryBox(e){return Je`
      <div class="ai-summary__box ${1===e.length?"ai-summary__box--single":""}" role="list">
        ${k(e,(e,t)=>Je`
            ${t>0?Je`<span class="ai-summary__divider" aria-hidden="true"></span>`:Xe}
            <div class="ai-summary__cell" role="listitem">
              <p class="ai-summary__cell-title alp-body15 alp-semi-bold">
                ${this.sectionTitle(e)}
              </p>
              <p class="ai-summary__cell-content alp-body14">${e.content}</p>
            </div>
          `)}
      </div>
    `}renderSkeleton(){return Je`
      <div class="ai-summary ai-summary--skeleton" aria-hidden="true">
        <div class="ai-summary__headline">
          <div class="review-skeleton ai-summary__sk-icon"></div>
          <div class="review-skeleton ai-summary__sk-headline"></div>
        </div>
        <div class="ai-summary__detail">
          <div class="review-skeleton ai-summary__sk-box"></div>
          <div class="review-skeleton ai-summary__sk-notice"></div>
        </div>
      </div>
    `}render(){const e=this.aiSummary;if(!e)return this.loading?this.renderSkeleton():Xe;const t="number"==typeof e.satisfaction_rate&&Number.isFinite(e.satisfaction_rate)?e.satisfaction_rate:null,i=null!==t&&t>=Io.SATISFACTION_RATE_MIN?si.WIDGETS.BOARD.AI_SUMMARY.summary(t):si.WIDGETS.BOARD.AI_SUMMARY.DEFAULT_SUMMARY,r=(e.sections??[]).filter(e=>e?.content?.trim()),o=r.length>0;if(!i&&!o)return Xe;const s=si.WIDGETS.BOARD.AI_SUMMARY.TOOLTIP,n=si.WIDGETS.BOARD.AI_SUMMARY.TOOLTIP_TITLE,a=si.WIDGETS.BOARD.AI_SUMMARY.TOOLTIP_ITEMS,p=o?si.WIDGETS.BOARD.AI_SUMMARY.NOTICE:"";return Je`
      <div class="ai-summary">
        ${Je`
              <div class="ai-summary__headline">
                ${this.renderSparkleIcon()}
                <div class="ai-summary__headline-text">
                  <p class="ai-summary__text alp-body17 alp-bold">${i}</p>
                  <span
                    class="ai-summary__info"
                    tabindex="0"
                    role="img"
                    aria-label=${s}
                  >
                    ${this.renderInfoIcon()}
                    <span class="ai-summary__tooltip" role="tooltip">
                      <p class="ai-summary__tooltip-title alp-body14 alp-bold">${n}</p>
                      <ul class="ai-summary__tooltip-list">
                        ${k(a,e=>Je`<li class="ai-summary__tooltip-item alp-body14">${e}</li>`)}
                      </ul>
                    </span>
                  </span>
                </div>
              </div>
            `}
        ${o?Je`
              <div class="ai-summary__detail">
                ${this.renderSummaryBox(r)}
                ${p?Je`<p class="ai-summary__notice alp-body12">${p}</p>`:Xe}
              </div>
            `:Xe}
      </div>
    `}};Io.styles=So,Io.SATISFACTION_RATE_MIN=70,Lo([i({type:Object})],Io.prototype,"aiSummary",2),Lo([i({type:Boolean})],Io.prototype,"loading",2),Io=Lo([ae("review-ai-summary")],Io);var Po=Object.defineProperty,To=Object.getOwnPropertyDescriptor,Ao=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?To(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Po(t,i,s),s};let No=class extends ht{constructor(){super(),this.commentCount=0,this.isOpen=!1,this.commentButtonText="\ub313\uae00",this.commentButtonText=si.FEATURES.COMMENT_BUTTON.COMMENT}createRenderRoot(){return this}render(){return Je`
      <style>.comment-button-container { display: flex; align-items: center; gap: 4px; padding: 10px 14px; border-radius: 40px; color: var(--alp-review-text-gray50); cursor: pointer; .is-open { transform: rotate(180deg); } p { color: var(--alp-review-text-gray50); } } .comment-button-container:hover { background-color: var(--alp-review-card-gray03); } .comment-icon-box { position: relative; } .comment-tip { content: ""; position: absolute; top: 0px; right: -1px; width: 7px; height: 7px; border-radius: 50%; background: var(--Icon-Red, #f43f5e); }</style>

      <div class="comment-button-container">
        <div class="comment-icon-box">
          <review-custom-icon
            width="20"
            height="20"
            type="comment"
            color="var(--alp-review-text-gray50)"
          ></review-custom-icon>
          ${this.commentCount>0?Je`<div class="comment-tip"></div>`:null}
        </div>
        <p class="alp-body14">${this.commentButtonText} ${this.commentCount}</p>
        ${this.commentCount>0?Je`<review-custom-icon
              class=${this.isOpen?"is-open":""}
              width="20"
              height="20"
              type="arrow-down"
              color="var(--alp-review-text-gray50)"
            ></review-custom-icon>`:null}
      </div>
    `}};Ao([i({type:Number})],No.prototype,"commentCount",2),Ao([i({type:Boolean})],No.prototype,"isOpen",2),No=Ao([ae("review-comment-button")],No);var Do=Object.defineProperty,Mo=Object.getOwnPropertyDescriptor,Wo=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Mo(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Do(t,i,s),s};let zo=class extends ht{constructor(){super(...arguments),this.widgetCode="",this.designOption={}}createRenderRoot(){return this}render(){const e=this.designOption??{},t=e?.title??"\uc81c\ubaa9\uc5c6\uc74c",i=e?.title_sub??"",r=e?.title_align??"left",o=e?.use_title_visible&&""!==e?.title,s=e?.use_title_sub_visible&&""!==e?.title_sub;return o||s?Je`
      <style>.header-title-container { display: flex; flex-direction: column; gap: 6px; margin-bottom: 32px; padding-top: 6px; } .header-title { color: var(--alp-review-text-gray100); text-align: ${r} !important; } .header-title-sub { text-align: ${r} !important; color: var(--alp-review-text-gray50); font-weight: 500 !important; }</style>

      <div class="header-title-container">
        ${o?Je`<span class="header-title alp-bold alp-body18">${t}</span>`:null}
        ${s?Je`<span class="header-title-sub alp-body13">${i}</span>`:null}
      </div>
    `:null}};Wo([i({type:String})],zo.prototype,"widgetCode",2),Wo([i({type:Object})],zo.prototype,"designOption",2),zo=Wo([ae("review-header-title")],zo);const jo=e=>S(e),Vo=(e,t)=>{try{const i=S(t);i[""+e]=!0,localStorage.setItem(t,JSON.stringify(i))}catch(e){}},Fo=(e,t)=>{try{const i=S(t);delete i[""+e],localStorage.setItem(t,JSON.stringify(i))}catch(e){}},Bo="reviewLikeObject",Uo=new Map,Ho=new Set;let Go;const qo={getView(e,t){const i=E(e);return{liked:i.target,count:(i.serverCount??t)+(i.target===i.serverLiked?0:i.target?1:-1)}},toggle(e,t){const i=E(e);t&&(i.productNo=t),i.target=!i.target,R(e),void 0===i.timer&&(i.timer=window.setTimeout(()=>{i.timer=void 0,L(e)},300))},flushNow(e){const t=Uo.get(e);t&&void 0!==t.timer&&(clearTimeout(t.timer),t.timer=void 0,L(e))},subscribe:e=>(Ho.add(e),()=>{Ho.delete(e)})};var Yo=Object.defineProperty,Ko=Object.getOwnPropertyDescriptor,Zo=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Ko(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Yo(t,i,s),s};let Jo=class extends ht{constructor(){super(),this.type="component",this.likeCount=0,this.isText=!0,this.reviewId=0,this.productNo=0,this.showLike=!0,this.size=20,this.showBurst=!1,this.likeButtonText="\ub3c4\uc6c0\ub3fc\uc694",this.likeButtonText=si.FEATURES.LIKE_BUTTON.LIKE}createRenderRoot(){return this}get view(){return qo.getView(this.reviewId,this.likeCount)}connectedCallback(){super.connectedCallback(),this._unsubscribe=qo.subscribe(e=>{e===this.reviewId&&this.requestUpdate()})}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.(),this._burstTimer&&clearTimeout(this._burstTimer),qo.flushNow(this.reviewId)}toggleLike(){this.reviewId&&(qo.toggle(this.reviewId,this.productNo),this.view.liked&&this._playBurst())}_playBurst(){this._burstTimer&&clearTimeout(this._burstTimer),this.showBurst=!1,requestAnimationFrame(()=>{this.showBurst=!0,this._burstTimer=window.setTimeout(()=>{this.showBurst=!1},500)})}render(){const{liked:e,count:t}=this.view;return Je`
      <style>.like-button-container { display: flex; align-items: center; gap: 4px; position: relative; height: 37px; padding: 0 14px; border-radius: 40px; border: 1.5px solid var(--alp-review-border-gray20, rgba(30, 41, 59, 0.2)); cursor: pointer; transition: background-color 0.15s ease-in-out; } .like-button-container:hover { background-color: var(--alp-review-card-gray03); } .like-button-container:active { background-color: var(--alp-review-card-gray07); } .like-button-container.is-liked { border: 1.5px solid var(--alp-common-color); } .like-button-container--button-type { height: fit-content; padding: 0; border: none; } .like-button-container--button-type:hover { background-color: transparent; } .like-button-container--button-type:active { background-color: transparent; } .like-button-container--button-type.is-liked { border: none; } .hearts-burst { position: absolute; left: 12px; top: 10px; width: 0; height: 0; pointer-events: none; } .like-button-container--button-type .hearts-burst { left: 0; top: 0; } .hearts-burst review-custom-icon { position: absolute; left: 0; top: 0; } .hearts-burst review-custom-icon .custom-icon > svg { position: absolute; opacity: 0; filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.1)); animation-name: like-balloon-rise; animation-duration: var(--dur, 700ms); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); animation-fill-mode: forwards; animation-delay: var(--delay, 0ms); } .hearts-burst review-custom-icon.h1 .custom-icon > svg { --x: -6px; --y: -48px; --s0: 0.7; --s1: 1.2; --r: 0deg; --dur: 500ms; --delay: 100ms; } .hearts-burst review-custom-icon.h2 .custom-icon > svg { --x: 0px; --y: -40px; --s0: 0.5; --s1: 0.8; --r: -20deg; --dur: 700ms; --delay: 100ms; } .hearts-burst review-custom-icon.h3 .custom-icon > svg { --x: 10px; --y: -44px; --s0: 0.7; --s1: 1; --r: 30deg; --dur: 1000ms; --delay: 200ms; } @keyframes like-balloon-rise { 0% { transform: translate(0, 0) scale(var(--s0, 0.7)) rotate(var(--r, 0deg)); opacity: 0; } 20% { opacity: 1; } 100% { transform: translate(var(--x, 0px), var(--y, -26px)) scale(var(--s1, 1.2)) rotate(var(--r, 0deg)); opacity: 0; } }</style>
      <div
        class="like-button-container ${e?"is-liked":""} ${"button"===this.type?"like-button-container--button-type":""}"
        @click=${this.toggleLike}
      >
        ${e?Je`<review-custom-icon
              width="${this.size}"
              height="${this.size}"
              type="heart-fill"
            ></review-custom-icon>`:Je`<review-custom-icon
              width="${this.size}"
              height="${this.size}"
              type="heart"
              color="${"button"===this.type?"var(--alp-review-icon-gray50)":""}"
            ></review-custom-icon>`}
        ${this.showBurst?Je`<div class="hearts-burst" aria-hidden="true">
              <review-custom-icon
                class="h1"
                width="${this.size}"
                height="${this.size}"
                type="heart-fill"
              ></review-custom-icon>
              <review-custom-icon
                class="h2"
                width="${this.size}"
                height="${this.size}"
                type="heart-fill"
              ></review-custom-icon>
              <review-custom-icon
                class="h3"
                width="${this.size}"
                height="${this.size}"
                type="heart-fill"
              ></review-custom-icon>
            </div>`:null}
        ${this.isText&&"button"!==this.type?Je`<p class="alp-body14 ">${this.likeButtonText}</p>`:null}
        ${t>0&&this.showLike&&"button"!==this.type?Je`<p class="alp-body14 ">${t}</p>`:null}
      </div>
    `}};Zo([i({type:String})],Jo.prototype,"type",2),Zo([i({type:Number})],Jo.prototype,"likeCount",2),Zo([i({type:Boolean})],Jo.prototype,"isText",2),Zo([i({type:Number})],Jo.prototype,"reviewId",2),Zo([i({type:Number})],Jo.prototype,"productNo",2),Zo([i({type:Boolean})],Jo.prototype,"showLike",2),Zo([i({type:Number})],Jo.prototype,"size",2),Zo([r()],Jo.prototype,"showBurst",2),Jo=Zo([ae("review-like-button")],Jo);var Qo=Object.defineProperty,Xo=Object.getOwnPropertyDescriptor,es=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Xo(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Qo(t,i,s),s};let ts=class extends ht{constructor(){super(),this.reviewId=0,this.isReported=!1,this.reportButtonText="\uc2e0\uace0",this.handleReported=e=>{const{reviewId:t,survey:i}=e.detail??{reviewId:0,survey:""};this.dispatchEvent(new CustomEvent("review:reported",{bubbles:!0,composed:!0,detail:{reviewId:t,survey:i}})),this.isReported=!0},this.routingLoginPage=()=>{(()=>{const e=location.origin+"/member/login.html",t=document.createElement("a");t.href=e,t.target="_top",document.body.appendChild(t),setTimeout(()=>{t.click()},100)})()},this.reportButtonText=si.FEATURES.REPORT_BUTTON.REPORT}createRenderRoot(){return this}willUpdate(e){if(super.willUpdate(e),e.has("reviewId")&&this.reviewId){const e=jo("reviewReportObject");this.isReported=e[this.reviewId]||!1}}async onClickDetail(){if(this.isReported)return;const e=await y();let t=si.FEATURES.REPORT_BUTTON.LOGIN_MODAL_TITLE,i=si.FEATURES.REPORT_BUTTON.LOGIN,r=si.FEATURES.REPORT_BUTTON.CLOSE;if(e){const t=d("review-report-popup",{type:"overlay",initialAttributes:{userId:e??"",reviewId:""+this.reviewId}});t&&t.addEventListener("review:reported",this.handleReported,{once:!0}),Wi.open({key:"review-report-popup",onClose:()=>c("review-report-popup")})}else{const e=d("review-common-dialog",{type:"overlay",initialAttributes:{title:t,okButtonText:i,cancelButtonText:r,buttonDirection:"column"}});e&&e.addEventListener("review:okDialog",this.routingLoginPage,{once:!0}),Wi.open({key:"review-common-dialog",onClose:()=>c("review-common-dialog")})}}render(){return Je`
      <style>.report-button-container { display: flex; align-items: center; gap: 4px; color: var(--alp-review-text-gray50); cursor: pointer; padding: 10px 14px; border-radius: 40px; } .report-button-container:hover { background-color: var(--alp-review-card-gray03); } .report-button-container:active { background-color: var(--alp-review-card-gray07); } .report-button-container.isReported { border: 1px solid var(--alp-review-border-gray100); font-weight: 500; color: var(--alp-review-text-gray80); }</style>

      <div
        class="report-button-container alp-body14 ${this.isReported?"isReported":""}"
        @click=${this.onClickDetail}
      >
        
        ${this.isReported?Je`<svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.3641 4.23431C13.6765 4.54673 13.6765 5.05327 13.3641 5.36569L6.96412 11.7657C6.6517 12.0781 6.14517 12.0781 5.83275 11.7657L2.63275 8.56569C2.32033 8.25327 2.32033 7.74673 2.63275 7.43431C2.94517 7.1219 3.4517 7.1219 3.76412 7.43431L6.39844 10.0686L12.2328 4.23431C12.5452 3.9219 13.0517 3.9219 13.3641 4.23431Z"
                fill="var(--alp-review-text-gray100)"
              />
            </svg>`:Je`<svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                d="M11.2259 11.0291C11.2259 11.0291 10.2259 9.6958 8.55925 9.6958C6.89258 9.6958 5.89258 11.0291 5.89258 11.0291M6.55924 6.36247H6.56591M10.5592 6.36247H10.5659M15.2259 8.36247C15.2259 12.0444 12.2411 15.0291 8.55925 15.0291C4.87735 15.0291 1.89258 12.0444 1.89258 8.36247C1.89258 4.68057 4.87735 1.6958 8.55925 1.6958C12.2411 1.6958 15.2259 4.68057 15.2259 8.36247Z"
                stroke="var(--alp-review-text-gray100)"
                stroke-opacity="0.4"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>`}
        <span>${this.reportButtonText}</span>
      </div>
    `}};es([i({type:Number})],ts.prototype,"reviewId",2),es([r()],ts.prototype,"isReported",2),ts=es([ae("review-report-button")],ts);var is=Object.defineProperty,rs=Object.getOwnPropertyDescriptor,os=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?rs(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&is(t,i,s),s};let ss=class extends ht{constructor(){super(),this.isOpen=!1,this.lineWrap=2,this.reviewContent="",this.fontSizeClassSmall="alp-body15",this.isWidthOver=!1,this.resizeCtrl=new zr(this,e=>{this.fontSizeClassSmall="mobile"===e?"alp-body16":"alp-body15"}),this.moreText="\ub354\ubcf4\uae30",this.lessText="\uc811\uae30",this.moreText=si.FEATURES.REVIEW_CONTENT.MORE,this.lessText=si.FEATURES.REVIEW_CONTENT.LESS}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.setupResizeObserver()}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver&&this.resizeObserver.disconnect()}setupResizeObserver(){this.resizeObserver=new ResizeObserver(()=>{this.checkWidthOverflow()})}checkWidthOverflow(){const e=this.querySelector(".review-review-content-container"),t=this.querySelector(".review-review-content-container > p");e&&t&&(this.isWidthOver=t.scrollWidth>e.clientWidth||t.scrollHeight>t.clientHeight)}updated(e){if(super.updated(e),e.has("reviewContent")){this.checkWidthOverflow();const e=this.querySelector(".review-review-content-container");e&&this.resizeObserver&&this.resizeObserver.observe(e)}}toggleOpen(){this.isOpen=!this.isOpen}render(){return Je`
      <style>.review-review-content-container { display: flex; flex-direction: column; gap: 6px; color: var(--alp-review-text-gray100, rgba(30, 41, 59, 0.5)); } .review-review-content-container .is-open { transform: rotate(180deg); } .review-review-content-more { display: flex; align-items: center; cursor: pointer; color: var(--alp-review-text-gray50); } .review-review-content-container > p { white-space: pre-line; } .review-review-content-container > p.line-wrap { line-clamp: ${this.lineWrap}; -webkit-line-clamp: ${this.lineWrap}; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; }</style>

      <div class="review-review-content-container">
        ${Je`<p class="${this.fontSizeClassSmall} alp-line14 alp-medium ${this.isOpen?"":"line-wrap"}">${this.reviewContent}</p>`}
        ${this.isWidthOver||this.isOpen?Je`
              <div
                class="review-review-content-more alp-body12 alp-medium"
                @click=${this.toggleOpen}
              >
                ${this.isOpen?this.lessText:this.moreText}
                <review-custom-icon
                  class=${this.isOpen?"is-open":""}
                  color="var(--alp-review-text-gray50)"
                  width="16"
                  height="18"
                  type="arrow-down"
                ></review-custom-icon>
              </div>
            `:null}
      </div>
    `}};os([i({type:Boolean})],ss.prototype,"isOpen",2),os([i({type:Number})],ss.prototype,"lineWrap",2),os([i({type:String})],ss.prototype,"reviewContent",2),os([r()],ss.prototype,"fontSizeClassSmall",2),os([r()],ss.prototype,"isWidthOver",2),ss=os([ae("review-review-content")],ss);const ns=e=>{const t=e?.product_option||e?.product_option_json?.[0]?.option_value;if(t?.split(",").length>1){const e=t?.split(",");return e.some(e=>!e.includes("="))?t:e.map(e=>e?.split("=")[1]?.split("/")?.join(","))?.join("/")}return t};var as=Object.defineProperty,ps=Object.getOwnPropertyDescriptor,ls=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ps(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&as(t,i,s),s};let ds=class extends ht{constructor(){super(),this.review={},this.gap="8px",this.optionGap="6px",this.starSize="13",this.showRatingStars=!0,this.showOptionName=!0,this.fontSizeClassSmall_option="alp-caption10",this.fontSizeClassMedium_option="alp-caption10",this.fontSizeClassLarge_option="alp-caption10",this.fontSizeClassSmall_review="alp-body13",this.fontSizeClassMedium_review="alp-body13",this.fontSizeClassLarge_review="alp-body13",this.containerQueryInfo={name:"",breakpoints:{small:0,medium:440,large:840},gap:{small:"2px",medium:"8px",large:"6px"},optionGap:{small:"0",medium:"6px",large:"10px"}},this.optionText="\uc635\uc158",this.optionText=si.FEATURES.REVIEW_INFO.OPTION}createRenderRoot(){return this}render(){return Je`
      <style>.review-info-container { display: flex; flex-direction: column; width: 100%; box-sizing: border-box; } .rating-option-row { display: flex; align-items: center; width: 100%; } .stars { display: flex; align-items: center; } .option-name { display: block; color: var(--alp-review-text-gray50, rgba(30, 41, 59, 0.5)); font-weight: 400; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .review-text { color: var(--alp-review-text-gray100, #1e293b); font-weight: 500; line-height: 1.4; line-clamp: 2; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; } ${this.containerQueryInfo.name?`\n @container ${this.containerQueryInfo.name} (min-width: ${this.containerQueryInfo.breakpoints.small}px) and (max-width: ${this.containerQueryInfo.breakpoints.medium}px) {\n .review-info-container {\n gap: ${this.containerQueryInfo.gap.small};\n }\n .rating-option-row {\n gap: ${this.containerQueryInfo.optionGap.small};\n }\n .option-name--md {\n display: none;\n }\n .option-name--lg {\n display: none;\n }\n .review-text {\n display: none;\n }\n .review-text--sm {\n display: -webkit-box;\n }\n }\n @container ${this.containerQueryInfo.name} (min-width: ${this.containerQueryInfo.breakpoints.medium}px) and (max-width: ${this.containerQueryInfo.breakpoints.large}px) {\n .review-info-container {\n gap: ${this.containerQueryInfo.gap.medium};\n }\n .rating-option-row {\n gap: ${this.containerQueryInfo.optionGap.medium};\n }\n .option-name {\n display: none;\n }\n .review-text {\n display: none;\n }\n .option-name--md {\n display: block;\n }\n .review-text--md {\n display: -webkit-box;\n }\n }\n @container ${this.containerQueryInfo.name} (min-width: ${this.containerQueryInfo.breakpoints.large}px) {\n .review-info-container {\n gap: ${this.containerQueryInfo.gap.large};\n }\n .rating-option-row {\n gap: ${this.containerQueryInfo.optionGap.large};\n }\n .option-name {\n display: none;\n }\n .review-text {\n display: none;\n }\n .option-name--lg {\n display: block;\n }\n .review-text--lg {\n display: -webkit-box;\n }\n }\n `:`\n @media (max-width: 439px) {\n .review-info-container {\n gap: ${this.containerQueryInfo.gap.small};\n }\n .rating-option-row {\n gap: ${this.containerQueryInfo.optionGap.small};\n }\n .option-name--md {\n display: none;\n }\n .option-name--lg {\n display: none;\n }\n .review-text {\n display: none;\n }\n .review-text--sm {\n display: -webkit-box;\n }\n }\n @media (min-width: 440px) and (max-width: 839px) {\n .review-info-container {\n gap: ${this.containerQueryInfo.gap.medium};\n }\n .rating-option-row {\n gap: ${this.containerQueryInfo.optionGap.medium};\n }\n .option-name {\n display: none;\n }\n .review-text {\n display: none;\n }\n .option-name--md {\n display: block;\n }\n .review-text--md {\n display: -webkit-box;\n }\n }\n @media (min-width: 840px) {\n .review-info-container {\n gap: ${this.containerQueryInfo.gap.large};\n }\n .rating-option-row {\n gap: ${this.containerQueryInfo.optionGap.large};\n }\n .option-name {\n display: none;\n }\n .review-text {\n display: none;\n }\n .option-name--lg {\n display: block;\n }\n .review-text--lg {\n display: -webkit-box;\n }\n }\n `}</style>
      <div class="review-info-container">
        ${this.showRatingStars&&this.review.ratings||this.showOptionName&&this.review.product_option?Je`
              <div class="rating-option-row">
                ${this.showRatingStars&&this.review.ratings?Je`<review-ratings-bundle
                      .rating=${this.review.ratings}
                      .size=${this.starSize}
                    ></review-ratings-bundle>`:null}
                ${this.showOptionName&&this.review.product_option?Je` <div
                        class="option-name option-name--md ${this.fontSizeClassMedium_option}"
                      >
                        ${this.optionText}: ${ns(this.review)}
                      </div>
                      <div class="option-name option-name--lg ${this.fontSizeClassLarge_option}">
                        ${this.optionText}: ${ns(this.review)}
                      </div>`:null}
              </div>
            `:null}
        <div class="review-text review-text--sm ${this.fontSizeClassSmall_review} alp-line14">
          ${this.review.content}
        </div>
        <div class="review-text review-text--md ${this.fontSizeClassMedium_review} alp-line14">
          ${this.review.content}
        </div>
        <div class="review-text review-text--lg ${this.fontSizeClassLarge_review} alp-line14">
          ${this.review.content}
        </div>
      </div>
    `}};ls([i({type:Object})],ds.prototype,"review",2),ls([i({type:String})],ds.prototype,"gap",2),ls([i({type:String})],ds.prototype,"optionGap",2),ls([i({type:String})],ds.prototype,"starSize",2),ls([i({type:Boolean})],ds.prototype,"showRatingStars",2),ls([i({type:Boolean})],ds.prototype,"showOptionName",2),ls([i({type:String})],ds.prototype,"fontSizeClassSmall_option",2),ls([i({type:String})],ds.prototype,"fontSizeClassMedium_option",2),ls([i({type:String})],ds.prototype,"fontSizeClassLarge_option",2),ls([i({type:String})],ds.prototype,"fontSizeClassSmall_review",2),ls([i({type:String})],ds.prototype,"fontSizeClassMedium_review",2),ls([i({type:String})],ds.prototype,"fontSizeClassLarge_review",2),ls([i({type:Object})],ds.prototype,"containerQueryInfo",2),ds=ls([ae("review-review-info")],ds);const cs="https://s3.ap-northeast-2.amazonaws.com/review.media",hs=e=>(...t)=>({_$litDirective$:e,values:t});let gs=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const us="important",ws=" !"+us,vs=hs(class extends gs{constructor(e){if(super(e),1!==e.type||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{const r=e[i];return null==r?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(const e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?i.removeProperty(e):i[e]=null);for(const e in t){const r=t[e];if(null!=r){this.ft.add(e);const t="string"==typeof r&&r.endsWith(ws);e.includes("-")||t?i.setProperty(e,t?r.slice(0,-11):r,t?us:""):i[e]=r}}return Qe}});var ms=Object.defineProperty,ys=Object.getOwnPropertyDescriptor,fs=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ys(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ms(t,i,s),s};let bs=class extends ht{constructor(){super(...arguments),this.productImg="",this.type="review",this.totalPages=0,this.socialType="",this.isAutoPlay=!0,this.isThumbnail=!1,this.isCallOut=!0,this.isErrorVideo=!1,this.emptyProductPhotoImg=te+"/review-widget/empty-product-photo.png",this.handleVideoError=()=>this.isErrorVideo=!0}updated(e){if(super.updated(e),e.has("reviewMedia")){const e=this.shadowRoot?.querySelector("video");e&&e.load()}}productContainer(){return Je`
      <div class="review-media-container">
        ${this.productImg?Je`<img src="${this.productImg}" alt="product image" loading="lazy" />`:Je`<review-custom-icon
              class="media-center-badge icon-shopping-bag"
              .type=${At}
              .color=${"var(--alp-review-icon-gray10)"}
            ></review-custom-icon>`}
      </div>
    `}emptyProductVideo(){return Je`
      <div class="review-media-container">
        <review-custom-icon
          class="media-center-badge "
          style="z-index:10"
          .width="30"
          .height="30"
          .type=${ut}
          .color=${"var(--alp-review-icon-white90)"}
        ></review-custom-icon>
        <img src="${this.productImg}" alt="product review image" loading="lazy" />
      </div>
    `}render(){const e=(()=>this.isThumbnail?I(this.reviewMedia?.thumbnail_photo_platform_url)||I(this.reviewMedia?.thumbnail_photo_url):I(this.reviewMedia?.photo_platform_url)||I(this.reviewMedia?.photo_url))(),t=(()=>this.isErrorVideo?this.productImg:this.isThumbnail?I(this.reviewMedia?.thumbnail_video_url)||"":I(this.reviewMedia?.thumbnail_video_url)||I(this.reviewMedia?.video_url)||"")();return"product"===this.type?this.productContainer():this.isErrorVideo?this.emptyProductVideo():Je`
      <div class="review-media-container">
        ${e||t?t?Je`<video
              aria-label="product review video"
              style="object-fit: cover; width: 100%; height: auto; aspect-ratio:1/1"
              muted
              playsinline
              loop
              preload="metadata"
              ?autoplay=${this.isAutoPlay}
              @error=${this.handleVideoError}
              poster=${this.productImg}
            >
              <source src="${t}" type="video/mp4" />
            </video>`:Je`<img
              style="object-fit: cover; width: 100%; height: auto; aspect-ratio:1/1"
              src="${e}"
              alt="product review image"
              loading="lazy"
              @error=${this.handleVideoError}
            />`:Je`
              <img
                src="${this.productImg||this.emptyProductPhotoImg}"
                alt="product review image"
                loading="lazy"
                style=${vs({filter:this.isCallOut?"brightness(0.7)":""})}
              />
            `}

        
        ${e||t||!this.isCallOut?null:Je`<review-custom-icon
              class="media-center-badge icon-bubble-talk"
              .type=${Tt}
              .color=${"var(--alp-review-icon-white90)"}
            ></review-custom-icon>`}
        ${t?Je`<review-custom-icon
              class="media-bottom-badge icon-play"
              .type=${ut}
            ></review-custom-icon>`:null}
        ${this.socialType===mt?Je`<review-custom-icon
              class="media-top-badge icon-blog"
              .type=${mt}
            ></review-custom-icon>`:null}
        ${this.socialType===vt?Je`<review-custom-icon
              class="media-top-badge icon-instagram"
              .type=${vt}
            ></review-custom-icon>`:null}
        ${this.totalPages>1&&""===this.socialType?Je`<review-custom-icon
              class="media-top-badge icon-multiple"
              .type=${wt}
            ></review-custom-icon>`:null}
      </div>
    `}};bs.styles=ue`:host{display:flex;overflow:hidden}.review-media-container{aspect-ratio:1;background-color:var(--alp-review-card-gray05);width:100%;height:100%;position:relative;overflow:hidden;transform:translateZ(0);container-type:inline-size}.review-media-container img,.review-media-container video{object-fit:cover;width:100%;height:100%;transition:transform .15s ease-in-out;display:block;&:hover{transform:scale(1.2)}}.media-top-badge{position:absolute;top:2px;right:2px}.media-center-badge{position:absolute;top:50%;right:50%;transform:translate(50%,-50%)}.media-bottom-badge{position:absolute;bottom:4px;left:4px}.icon-instagram{width:clamp(24px,9.33333cqw,80px);height:clamp(24px,9.33333cqw,80px)}.icon-blog{width:clamp(32px,14.6667cqw,102px);height:clamp(16px,6.53333cqw,54px);padding:clamp(2px,1.33333cqw,10px)}.icon-multiple{width:clamp(16px,8cqw,40px);height:clamp(16px,8cqw,40px);padding:clamp(2px,1.33333cqw,10px)}.icon-play{width:clamp(20px,6.66667cqw,40px);height:clamp(20px,6.66667cqw,40px)}.icon-bubble-talk{width:clamp(24px,29.3333cqw,88px);height:clamp(24px,29.3333cqw,88px)}`,fs([i({type:Object})],bs.prototype,"reviewMedia",2),fs([i({type:String})],bs.prototype,"productImg",2),fs([i({type:String})],bs.prototype,"type",2),fs([i({type:Number})],bs.prototype,"totalPages",2),fs([i({type:String})],bs.prototype,"socialType",2),fs([i({type:String})],bs.prototype,"isAutoPlay",2),fs([i({type:Boolean})],bs.prototype,"isThumbnail",2),fs([i({type:Boolean})],bs.prototype,"isCallOut",2),fs([r()],bs.prototype,"isErrorVideo",2),bs=fs([ae("review-review-media")],bs);var xs=Object.defineProperty,_s=Object.getOwnPropertyDescriptor,Cs=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?_s(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&xs(t,i,s),s};let $s=class extends ht{constructor(){super(...arguments),this.label=void 0,this.type="default",this.width=130,this.survey={},this.rating={survey_question_id:0,survey_question_label:oi()?"Rating":"\ubcc4\uc810",choices:[{value:"5",raw:"5"},{value:"4",raw:"4"},{value:"3",raw:"3"},{value:"2",raw:"2"},{value:"1",raw:"1"}]},this.currentSurveyOptions=[],this.currentRatingOptions=[],this.wrapperEl=null,this.rafPending=!1,this.openOverlayOptionCard=()=>{window.dispatchEvent(new CustomEvent("alp-selector-open",{detail:{owner:this}}));const e=d("review-selector-option",{type:"overlay"});Wi.open({key:"review-selector-option",onClose:()=>c("review-selector-option")}),e?.addEventListener("selector-close",t=>{"rating"===this.type?this.currentRatingOptions=t.detail?.value.map(e=>e.raw):this.currentSurveyOptions=t.detail?.value.map(e=>e.raw),this.label="rating"===this.type?this.currentRatingOptions.map(e=>e+"\uc810").join(", "):this.currentSurveyOptions.map(e=>e).join(", "),e.selectedOption="rating"===this.type?this.currentRatingOptions.map(e=>({value:e,raw:e})):this.currentSurveyOptions.map(e=>({value:e,raw:e})),this.setValue("rating"===this.type?this.currentRatingOptions:this.currentSurveyOptions)}),customElements.whenDefined("review-selector-option").then(()=>{e.type=this.type,e.options="rating"===this.type?this.rating.choices:this.survey.choices,e.selectedOption="rating"===this.type?this.currentRatingOptions.map(e=>({value:e,raw:e})):this.currentSurveyOptions.map(e=>({value:e,raw:e})),e.requestUpdate?.()})},this.openFixedOptionCardPC=e=>{e.stopPropagation(),window.dispatchEvent(new CustomEvent("alp-selector-open",{detail:{owner:this}}));const t=this.querySelector(".review-selector-container");if(!t)return;const i=document.body.querySelector(".alp-selector-fixed-portal");if(i){if(i.__owner===this)return document.body.removeChild(i),void this.removeWrapper();document.body.removeChild(i),this.removeWrapper()}const r=document.createElement("review-custom-fixed-overlay");r.className="alp-selector-fixed-portal",Object.assign(r.style,{position:"fixed",left:"0px",top:"0px",zIndex:"1000",pointerEvents:"none"}),document.body.appendChild(r),r.__owner=this;const o=r.attachShadow({mode:"open"});if("adoptedStyleSheets"in Document.prototype&&"replaceSync"in CSSStyleSheet.prototype){const e=new CSSStyleSheet;e.replaceSync(`${Ni.cssText}\n${Di.cssText}`),o.adoptedStyleSheets=[...o.adoptedStyleSheets||[],e]}else{const e=document.createElement("style");e.textContent=`${Ni.cssText}\n${Di.cssText}`,o.insertBefore(e,o.firstChild)}const s=document.createElement("div");s.className="alp-selector-fixed-portal-container",Object.assign(s.style,{pointerEvents:"auto",position:"static"}),o.appendChild(s);const n=document.createElement("review-selector-option");n.style.pointerEvents="auto",s.appendChild(n),n?.addEventListener("selector-close",e=>{"rating"===this.type?this.currentRatingOptions=e.detail?.value.map(e=>e.raw):this.currentSurveyOptions=e.detail?.value.map(e=>e.raw),this.removeWrapper(),this.label="rating"===this.type?this.currentRatingOptions.map(e=>e+"\uc810").join(", "):this.currentSurveyOptions.map(e=>e).join(", "),n.selectedOption="rating"===this.type?this.currentRatingOptions.map(e=>({value:e,raw:e})):this.currentSurveyOptions.map(e=>({value:e,raw:e})),this.setValue("rating"===this.type?this.currentRatingOptions:this.currentSurveyOptions)}),customElements.whenDefined("review-selector-option").then(()=>{n.type=this.type,n.options="rating"===this.type?this.rating.choices:this.survey.choices,n.selectedOption="rating"===this.type?this.currentRatingOptions.map(e=>({value:e,raw:e})):this.currentSurveyOptions.map(e=>({value:e,raw:e})),n.requestUpdate?.()});const a=()=>{this.rafPending=!1;const e=t.getBoundingClientRect();let i=e.left;const o=e.bottom+10,s=n.getBoundingClientRect().width||0;i+s>window.innerWidth&&(i=Math.max(0,e.right-s)),r.style.left=i+"px",r.style.top=o+"px"};this.onReposition=()=>{this.rafPending||(this.rafPending=!0,requestAnimationFrame(a))},window.addEventListener("scroll",this.onReposition,!0),window.addEventListener("resize",this.onReposition),requestAnimationFrame(()=>{a(),requestAnimationFrame(a)}),this.wrapperEl=r}}createRenderRoot(){return this}firstUpdated(e){super.firstUpdated(e)}disconnectedCallback(){super.disconnectedCallback(),this.onReposition&&(window.removeEventListener("scroll",this.onReposition,!0),window.removeEventListener("resize",this.onReposition),this.onReposition=void 0);const e=document.body.querySelector(".alp-selector-fixed-portal");e&&e.parentNode&&e.parentNode.removeChild(e)}setValue(e){this.dispatchEvent(new CustomEvent("alp-selector-change",{bubbles:!0,composed:!0,detail:{list:e,option:"rating"===this.type?this.rating:this.survey}}))}removeWrapper(){this.wrapperEl&&this.wrapperEl.parentNode&&this.wrapperEl.parentNode.removeChild(this.wrapperEl),this.wrapperEl=null,this.onReposition&&(window.removeEventListener("scroll",this.onReposition,!0),window.removeEventListener("resize",this.onReposition),this.onReposition=void 0),this.rafPending=!1}render(){const e=this.label?this.label:this.survey.survey_question_label,t=this.label?this.label:oi()?"Rating":"\ubcc4\uc810";return Je`
      <style>.review-selector-container { display: flex; align-items: center; justify-content: space-between; gap: 6px; width: var(--alp-review-selector-width, 130px); height: 44px; min-width: 100px; max-width: 180px; padding: 4px 8px 4px 18px; border-radius: 4px; border: 1.5px solid var(--alp-review-border-gray30, rgba(30, 41, 59, 0.3)); position: relative; cursor: pointer; transition: background 0.1s ease-in; &:hover { background: var(--alp-review-card-gray05, rgba(30, 41, 59, 0.05)); } &.is-active { border-radius: 6px; border: 1.5px solid var(--alp-review-border-gray100, #1e293b); } } review-selector-option { position: absolute; top: calc(100% + 3px); left: 0; z-index: 10; }</style>

      <div
        class="review-selector-container ${this.currentSurveyOptions?.length>0||this.currentRatingOptions?.length>0?"is-active":""}"
        style="--alp-review-selector-width: ${this.width}px;"
        @click=${e=>("mobile"===P()?this.openOverlayOptionCard:this.openFixedOptionCardPC)(e)}
      >
        <p class="line-wrap">${"rating"===this.type?t:e}</p>
        <review-custom-icon
          width="24"
          height="25"
          type="drop-down"
          color="var(--alp-review-icon-gray40)"
        ></review-custom-icon>
      </div>
    `}};Cs([i({type:String})],$s.prototype,"label",2),Cs([i({type:String})],$s.prototype,"type",2),Cs([i({type:String})],$s.prototype,"width",2),Cs([i({type:Object})],$s.prototype,"survey",2),Cs([i({type:Object})],$s.prototype,"rating",2),Cs([i({type:Array})],$s.prototype,"currentSurveyOptions",2),Cs([i({type:Array})],$s.prototype,"currentRatingOptions",2),$s=Cs([ae("review-selector-input")],$s);var Os=Object.defineProperty,ks=Object.getOwnPropertyDescriptor,Ss=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ks(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Os(t,i,s),s};let Es=class extends ht{constructor(){super(),this.type="default",this.selectedOption=[],this.options=[],this.currentOption=[],this.closeButtonLabel="\ud544\ud130 \uc801\uc6a9",this.pointText="\uc810",this.closeButtonLabel=si.FEATURES.SELECTOR_OPTION.APPLY,this.pointText=si.FEATURES.SELECTOR_OPTION.POINT}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._onDocClick=e=>{(e.composedPath&&e.composedPath()).includes(this)||this.closeByClick()},this._attachTimer=window.setTimeout(()=>{window.addEventListener("click",this._onDocClick),this._attachTimer=void 0},0)}updated(e){super.updated(e),e.has("selectedOption")&&(this.currentOption=structuredClone(this.selectedOption))}disconnectedCallback(){super.disconnectedCallback();const e=document.body.querySelector(".alp-selector-fixed-portal");e&&e.parentNode&&e.parentNode.removeChild(e),void 0!==this._attachTimer&&(clearTimeout(this._attachTimer),this._attachTimer=void 0),this._onDocClick&&(window.removeEventListener("click",this._onDocClick),this._onDocClick=void 0)}close(){const e=this.options;this.currentOption=[...this.currentOption].sort((t,i)=>e.findIndex(e=>e.raw===t.raw)-e.findIndex(e=>e.raw===i.raw)),this.dispatchEvent(new CustomEvent("selector-close",{detail:{value:this.currentOption}})),this.closeByClick()}closeByClick(){c("review-selector-option"),Wi.closeByUi("review-selector-option");const e=document.body.querySelector(".alp-selector-fixed-portal");e&&e.parentNode&&e.parentNode.removeChild(e)}setCurrentOption(e){const t=this.currentOption.some(t=>t.raw===e.raw);this.currentOption=t?this.currentOption.filter(t=>t.raw!==e.raw):[...this.currentOption,e]}render(){return Je`
      <style>.review-selector-card { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; min-width: 280px; max-width: 480px; padding: 16px; border-radius: 16px; border: 0.5px solid var(--Border-Gray20, rgba(30, 41, 59, 0.2)); background: var(--alp-review-bg-white); box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.09); } .default-option-row { display: flex; flex-wrap: wrap; gap: 8px; max-height: calc(100vh - 200px); overflow-y: auto; } .default-option-item { display: flex; align-items: center; width: fit-content; padding: 13px; border-radius: 6px; background-color: var(--alp-review-card-gray03, rgba(30, 41, 59, 0.03)); border: 2px solid transparent; transition: background 0.15s ease-in-out; &:hover { background: var(--alp-review-icon-gray10, rgba(30, 41, 59, 0.05)); } &.is-active { border-radius: 6px; border: 2px solid var(--alp-review-border-gray100, #1e293b); background: var(--alp-review-card-gray07, rgba(30, 41, 59, 0.07)); > p { font-weight: 700; } } } :host-context(html[data-theme="dark"]) .default-option-item { background-color: var(--alp-review-icon-gray10) !important; } .rating-row { width: 100%; padding: 13px; } .rating-row > p { margin-left: 6px; } .selector-option-button { display: flex; justify-content: center; align-items: center; gap: 10px; width: 100%; padding: 10px 24px; border-radius: 12px; background: var(--alp-review-card-gray100, #1e293b); color: var(--alp-review-text-white, #fff); cursor: pointer; transition: opacity 0.15s ease-in-out; &:hover { opacity: 0.8; } }</style>

      
      <div class="review-selector-card">
        ${"default"===this.type?Je`
              <div class="default-option-row">
                ${this.options.map(e=>Je`
                    <div
                      @click=${()=>this.setCurrentOption(e)}
                      class="default-option-item ${this.currentOption.some(t=>t.raw===e.raw)?"is-active":""}"
                    >
                      <p class="alp-body14 alp-medium">${e.value}</p>
                    </div>
                  `)}
              </div>
            `:this.options.map(e=>Je`<div
                  @click=${()=>this.setCurrentOption(e)}
                  class="default-option-item rating-row ${this.currentOption.some(t=>t.raw===e.raw)?"is-active":""}"
                >
                  ${Array.from({length:5}).map((t,i)=>Je`<review-star-icon
                        size="16"
                        color="${Number(e.value)>=i+1?"var(--alp-review-icon-gray100)":"var(--alp-review-icon-gray20)"}"
                      ></review-star-icon>`)}
                  <p class="alp-body14 alp-bold">${e.value}${this.pointText}</p>
                </div>`)}

        <button
          @click=${()=>this.close()}
          class="selector-option-button alp-body16 alp-semi-bold"
        >
          ${this.closeButtonLabel}
        </button>
      </div>
    `}};Ss([i({type:String})],Es.prototype,"type",2),Ss([i({type:Array})],Es.prototype,"selectedOption",2),Ss([i({type:Array})],Es.prototype,"options",2),Ss([r()],Es.prototype,"currentOption",2),Es=Ss([ae("review-selector-option")],Es);const Rs=[Ni,Di,ue`:host{font-family:var(--alp-common-font-family);display:block}.review-write-container{flex-direction:column;justify-content:center;align-items:center;width:100%;height:100%;min-height:250px;display:flex;color:var(--alp-review-text-gray40)!important}.rewrite-button{background:var(--alp-common-color);height:44px;color:var(--alp-review-text-white);cursor:pointer;border:none;border-radius:6px;justify-content:center;align-items:center;gap:10px;padding:0 16px;display:flex;&:hover{opacity:.8}}.rewrite-button>p{color:var(--alp-review-text-white)}.custom-review-write-container-pc{display:block}.custom-review-write-container-mo{display:none}@container review-write (width<=440px){.review-write-container{font-size:16px!important}.custom-review-write-container-pc{display:none}.custom-review-write-container-mo{display:block}}`];var Ls=Object.defineProperty,Is=Object.getOwnPropertyDescriptor,Ps=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Is(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Ls(t,i,s),s};let Ts=class extends ht{constructor(){super(...arguments),this.option=window.ALPHA_REVIEW_SHOP_DESIGN_OPTION}async onWriteReviewClick(){const{mall_id:e,shop_no:t}=await m(),i=await y()??"";cr({mall_id:e,shop_no:t,member_id:i,product_no:this.productNo??window?.iProductNo??""})}render(){const e=this.option?.empty_review_text||"",t=this.option?.empty_review_custom_pc||"",i=this.option?.empty_review_custom_mo||"";return"\ucee4\uc2a4\ud140"===this.option?.empty_review_type?Je`
        <div class="review-write-container">
          <div class="custom-review-write-container-pc">
            <review-notice-sandbox .content=${t}></review-notice-sandbox>
          </div>
          <div class="custom-review-write-container-mo">
            <review-notice-sandbox .content=${i}></review-notice-sandbox>
          </div>

          <div class="rewrite-button" @click=${this.onWriteReviewClick}>
            <p class="alp-body13 alp-semi-bold">${si.FEATURES.REVIEW_WRITE.WRITE_REVIEW}</p>
          </div>
        </div>
      `:Je`
      <div class="review-write-container">
        <review-notice-sandbox .content=${e}></review-notice-sandbox>

        <div class="rewrite-button" @click=${this.onWriteReviewClick}>
          <p class="alp-body13 alp-semi-bold">${si.FEATURES.REVIEW_WRITE.WRITE_REVIEW}</p>
        </div>
      </div>
    `}};Ts.styles=Rs,Ps([i({type:String})],Ts.prototype,"productNo",2),Ps([r()],Ts.prototype,"option",2),Ts=Ps([ae("review-review-write")],Ts);let As=class extends ht{constructor(){super(...arguments),this.onResetReviewList=()=>{this.dispatchEvent(new CustomEvent("resetReviewList"))}}createRenderRoot(){return this}render(){return Je`
      <style>.empty-review-container { display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 20px; width: 100%; height: 100%; text-align: center !important; padding: 60px 16px; } .empty-review-container > p { color: var(--alp-review-text-gray50); text-align: center !important; } .empty-review-container > button { display: flex; padding: 10px 24px; justify-content: center; align-items: center; gap: 10px; border-radius: 12px; background: var(--alp-review-card-gray07); color: var(--alp-review-text-gray100); cursor: pointer; } @container board-widget (max-width: ${Kt}) { .empty-review-container { p { font-size: 20px; line-height: 1.6; } } } @container board-widget (max-width: ${Zt}) { .empty-review-container { gap: 28px; p { font-size: 14px; } } }</style>

      <div class="empty-review-container">
        <p class="alp-h22 alp-semi-bold">
          ${oi()?"There are no search results.":"\uac80\uc0c9 \uacb0\uacfc\uac00 \uc5c6\uc5b4\uc694."}<br />${oi()?"Search with a different keyword.":"\ub2e4\ub978 \ud0a4\uc6cc\ub4dc\ub85c \uac80\uc0c9\ud574 \ubcf4\uc138\uc694."}
        </p>
        <button class="alp-body16 alp-semi-bold" @click=${this.onResetReviewList}>
          ${oi()?"Refresh":"\uac80\uc0c9 \ucd08\uae30\ud654"}
        </button>
      </div>
    `}};As=((e,t)=>{for(var i,r=t,o=e.length-1;o>=0;o--)(i=e[o])&&(r=i(r)||r);return r})([ae("review-empty-review")],As);const Ns=[Ni,Di,ue`:host{contain:layout paint style;width:100%;height:var(--loading-review-height);box-sizing:border-box;padding:0 20px;display:inline-block}.wrap{width:var(--spinner-width);grid-template-columns:auto 1fr;align-items:center;gap:15px;display:inline-grid}.avatar{width:var(--avatar-size);height:var(--avatar-size);transform-origin:50%;background:#dadadb;border-radius:5px;animation:.9s cubic-bezier(.22,.61,.36,1) infinite bob}.lines{gap:6px;display:grid}.line{height:calc(var(--avatar-size)*.32);transform-origin:0;background:#ededed;border-radius:8px 3px 3px 8px}.line1{width:90%}.line2{width:100%}@keyframes expandLine1{0%{width:0%}40%,to{width:90%}}@keyframes expandLine2{0%,20%{width:0%}70%{width:100%}80%{width:98%}90%,to{width:100%}}.loading-review-container{flex-direction:column;justify-content:center;align-items:center;width:100%;height:100%;display:flex}.loading-review-spinner{width:var(--spinner-size);height:var(--spinner-height);flex-direction:column;justify-content:flex-end;align-items:center;display:flex;position:relative;overflow:hidden}.loading-review-spinner>div:first-child{width:100%;animation:1s ease-in-out infinite forwards slideUp;position:absolute}.loading-review-spinner>div:nth-child(2){transform:translateY(calc((var(--avatar-size))*-1))scale(.7);animation:1s ease-in-out infinite forwards slideUp2;position:absolute}.loading-review-spinner>div:nth-child(3){animation:1s ease-in-out infinite forwards slideUp3}.loading-review-spinner>div:nth-child(3) .line1{width:0%;animation:1s ease-in-out infinite expandLine1}.loading-review-spinner>div:nth-child(3) .line2{width:0%;animation:1s ease-in-out .2s infinite expandLine2}@keyframes slideUp{0%{transform:translateY(0)}60%,to{transform:translateY(calc((var(--avatar-size))*-1))scale(.7)}}@keyframes slideUp2{0%{transform:translateY(calc((var(--avatar-size))*-1))scale(.7)}60%,to{transform:translateY(-200%)scale(.1)}}@keyframes slideUp3{0%{transform:translateY(100%)scale(1)}60%,to{transform:translateY(0)scale(1)}}`];var Ds=Object.defineProperty,Ms=Object.getOwnPropertyDescriptor,Ws=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Ms(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Ds(t,i,s),s};let zs=class extends ht{constructor(){super(...arguments),this.spinnerSize=300,this.containerHeight=800,this.color="var(--alp-review-text-gray50)"}willUpdate(){this.style.setProperty("--avatar-size",this.spinnerSize/4+"px"),this.style.setProperty("--spinner-width",this.spinnerSize+"px"),this.style.setProperty("--spinner-height",this.spinnerSize/4*2+"px"),this.style.setProperty("--loading-review-height",this.containerHeight/2+"px")}itemRender(e){return Je`
      <div class="wrap" role="status" aria-label="Loading item">
        <div class="avatar" part="avatar"></div>
        <div class="lines">
          <div class="line line1" part="line1"></div>
          <div class="line line2" part="line2"></div>
        </div>
      </div>
    `}render(){return Je`
      <div class="loading-review-container">
        <div class="loading-review-spinner">
          ${Array.from({length:3},(e,t)=>this.itemRender(t))}
        </div>

        <p class="alp-h22 alp-semi-bold" style="margin-top: 20px;color:${this.color}">
          ${oi()?"Loading...":"\ub9ac\ubdf0\ub97c \ubd88\ub7ec\uc624\ub294\uc911..."}
        </p>
      </div>
    `}};zs.styles=Ns,Ws([i({type:Number})],zs.prototype,"spinnerSize",2),Ws([i({type:Number})],zs.prototype,"containerHeight",2),Ws([i({type:String})],zs.prototype,"color",2),zs=Ws([ae("review-loading-review")],zs);const js=(e,t,i)=>{for(const i of t)if(i[0]===e)return(0,i[1])();return i?.()};var Vs=Object.defineProperty,Fs=Object.getOwnPropertyDescriptor,Bs=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Fs(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Vs(t,i,s),s};let Us=class extends ht{constructor(){super(),this.userId="",this.reviewId=0,this.reportSurveyData=[],this.isReport=!1,this.reportSurvey="",this.reportButtonText="\uc2e0\uace0",this.content={headerTitle:"\uc5b4\ub5a4 \uc810\uc774 \ubd88\ud3b8\ud558\uc168\ub098\uc694?",placeholder:"\uc2e0\uace0 \ub0b4\uc6a9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.",cancelButton:"\ucde8\uc18c",reportButton:"\uc2e0\uace0",successTitle:"\uc815\uc0c1\uc801\uc73c\ub85c \uc2e0\uace0 \uc811\uc218\ub418\uc5c8\uc5b4\uc694.",successDesc:"\uc1fc\ud551\ubab0 \uc774\uc6a9\uc57d\uad00 \ubc0f \uc6b4\uc601 \uc815\ucc45\uc5d0 \ub530\ub77c \uc21c\ucc28\uc801\uc73c\ub85c \ucc98\ub9ac\ub420 \uc608\uc815\uc774\uba70, \ucc98\ub9ac \uacb0\uacfc\ub294 \ubcc4\ub3c4\ub85c \ub2f5\ubcc0\uc744 \ub4dc\ub9ac\uc9c0 \uc54a\uc544\uc694.",confirmButton:"\ud655\uc778",other:"\uae30\ud0c0"},this.reportButtonText=si.FEATURES.REPORT_POPUP.REPORT,this.reportSurveyData=si.FEATURES.REPORT_POPUP.SURVEY_DATA,this.content=si.FEATURES.REPORT_POPUP.CONTENT,this.reportSurvey=this.reportSurveyData[0]}createRenderRoot(){return this}closePopup(){Wi.closeByUi("review-report-popup")}reportReview(){this.isReport=!0,Vo(this.reviewId,"reviewReportObject"),this.dispatchEvent(new CustomEvent("review:reported",{bubbles:!0,composed:!0,detail:{reviewId:this.reviewId,survey:this.reportSurvey}}))}handleReportSurveyChange(e,t){t.preventDefault(),this.reportSurvey=e,this.requestUpdate()}reportComponent(){return Je`
      <div class="report-header-container">
        <h1 class="alp-h20 alp-semi-bold">${this.content.headerTitle}</h1>
      </div>

      <div class="report-survey-container custom-scrollbar">
        ${this.reportSurveyData.map(e=>Je`
            <label @click=${t=>this.handleReportSurveyChange(e,t)}>
              <input
                type="radio"
                name="reportSurvey"
                style="pointer-events: none;"
                .value=${e}
                .checked=${this.reportSurvey===e}
              />

              <p class="alp-body14 alp-medium">${e}</p>
            </label>
          `)}
        ${this.reportSurvey===this.content.other?Je`
              <textarea
                height="400px"
                resize="none"
                class="report-textarea"
                placeholder="${this.content.placeholder}"
              ></textarea>
            `:null}
      </div>

      

      <div class="report-button-container">
        <button class="report-button alp-body16 alp-semi-bold" @click=${this.closePopup}>
          ${this.content.cancelButton}
        </button>
        <button class="report-button alp-body16 alp-semi-bold" @click=${this.reportReview}>
          ${this.content.reportButton}
        </button>
      </div>
    `}reportSuccessComponent(){return Je`
      <div class="header-container">
        <h1 class="alp-h20 alp-semi-bold">${this.content.successTitle}</h1>
        <p class="alp-body14 alp-medium alp-line14">${this.content.successDesc}</p>
      </div>
      <div class="report-button-container">
        <button class="report-button alp-body16 alp-semi-bold" @click=${this.closePopup}>
          ${this.content.confirmButton}
        </button>
      </div>
    `}render(){const e=(()=>this.isReport?"reportSuccess":"report")();return Je`
      <style>review-report-popup { padding: 24px; background-color: var(--alp-review-bg-white); border-radius: 20px; position: relative; width: 320px; } .header-container { display: flex; flex-direction: column; gap: 8px; margin-bottom: 36px; } .header-container p { color: var(--alp-review-text-gray60); } .report-survey-container { display: flex; flex-direction: column; max-height: 400px; overflow-y: scroll; margin-bottom: 12px; } .report-survey-container label { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 14px 12px; border-bottom: 1px solid var(--alp-review-border-gray20); } .report-survey-container input[type="radio"] { accent-color: var(--alp-review-card-gray100); } .report-button-container { display: flex; gap: 8px; } .report-button { width: 100%; display: flex; padding: 11px 16px; justify-content: center; align-items: center; border-radius: 12px; border: 1px solid var(--Border-Gray20, rgba(30, 41, 59, 0.2)); cursor: pointer; } .report-button:last-child { background-color: var(--alp-review-card-gray100); color: var(--alp-review-text-white); border: none; } .report-header-container { margin-bottom: 12px; text-align: center !important; } .report-textarea { margin-top: 12px; padding: 12px; min-height: 100px; border-radius: 12px; border: 1px solid var(--alp-review-border-gray20); resize: none; font-size: 14px; color: var(--alp-review-text-gray100); background-color: var(--alp-review-bg-white); } @media (max-width: 440px) { review-report-popup { width: 100%; } }</style>

      <div class="report-popup-container">
        ${js(e,[["report",()=>this.reportComponent()],["reportSuccess",()=>this.reportSuccessComponent()]],()=>null)}
      </div>
    `}};Bs([i({type:String})],Us.prototype,"userId",2),Bs([i({type:Number})],Us.prototype,"reviewId",2),Bs([r()],Us.prototype,"isReport",2),Bs([r()],Us.prototype,"reportSurvey",2),Us=Bs([ae("review-report-popup")],Us);const Hs={},Gs=(e,t=Hs)=>e._$AH=t,qs=hs(class extends gs{constructor(e){if(super(e),3!==e.type&&1!==e.type&&4!==e.type)throw Error("The `live` directive is not allowed on child or event bindings");if(void 0!==e.strings)throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Qe||t===Xe)return t;const i=e.element,r=e.name;if(3===e.type){if(t===i[r])return Qe}else if(4===e.type){if(!!t===i.hasAttribute(r))return Qe}else if(1===e.type&&i.getAttribute(r)===t+"")return Qe;return Gs(e),t}}),Ys=[Ni,Di,ue`:host{width:100%;max-width:380px;display:block}.option-dialog{box-sizing:border-box;background:var(--alp-review-bg-white);border-radius:20px;width:100%;height:fit-content;max-height:85vh;padding:18px 20px;box-shadow:0 12px 20px #0003}.option-dialog__header{color:var(--alp-review-text-gray100);justify-content:space-between;align-items:center;display:flex}.option-dialog__close{cursor:pointer;justify-content:center;align-items:center;display:flex}.option-dialog__product{align-items:center;gap:10px;padding-top:12px;display:flex}.option-dialog__product img{object-fit:cover;border-radius:8px;flex-shrink:0;width:48px;height:48px}.option-dialog__product-info{flex-direction:column;gap:2px;min-width:0;display:flex}.option-dialog__product-price{color:var(--alp-review-text-gray100)}.option-dialog__product-name{color:var(--alp-review-text-gray80);-webkit-line-clamp:2;word-break:break-all;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.option-dialog__list{flex-direction:column;gap:12px;padding-top:18px;display:flex}.option-section{flex:none;align-items:center;gap:12px;display:flex}.option-section.is-disabled{opacity:.5;pointer-events:none}.option-section__label{color:var(--alp-review-text-gray50);flex-shrink:0}.option-section__label.is-required{color:var(--alp-review-text-point)}.option-select{border:1px solid var(--alp-review-border-gray20);width:100%;min-width:0;color:var(--alp-review-text-gray100);cursor:pointer;border-radius:6px;justify-content:space-between;align-items:center;gap:4px;padding:9px 8px 9px 13px;transition:border-color .2s;display:flex;position:relative}@media (hover:hover){.option-select:hover{border-color:var(--alp-review-border-point)}}.option-select__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.option-select__text.is-placeholder{color:var(--alp-review-text-gray50)}.option-select__arrow{flex-shrink:0;transition:transform .2s;display:flex}.option-select__arrow.is-open{transform:rotate(180deg)}.option-items{z-index:10001;box-sizing:border-box;background:var(--alp-review-bg-white);opacity:0;pointer-events:none;border-radius:10px;width:100%;max-height:0;margin:0;padding:4px;transition:max-height .25s ease-in-out,opacity .25s ease-in-out,transform .25s ease-in-out;position:absolute;top:calc(100% + 4px);left:0;overflow:hidden;transform:translateY(-10px);box-shadow:0 12px 20px #0003}.option-items[data-open-direction=up]{top:auto;bottom:calc(100% + 4px);transform:translateY(10px)}.option-items.is-open{opacity:1;pointer-events:auto;max-height:200px;overflow-y:auto;transform:translateY(0)}.option-item{color:var(--alp-review-text-gray100);cursor:pointer;word-break:keep-all;border-radius:6px;padding:8px 10px;transition:background-color .2s;position:relative}.option-item+.option-item:before{content:"";background:var(--alp-review-border-gray08);width:100%;height:1px;position:absolute;top:0;left:0}@media (hover:hover){.option-item:not(.is-disabled):hover{background:var(--alp-review-card-gray05)}}.option-item.is-selected{background:var(--alp-review-card-gray07)}.option-item.is-disabled{color:var(--alp-review-text-gray40);cursor:not-allowed;pointer-events:none}.additional-option{flex-direction:column;flex:none;gap:6px;display:flex}.additional-option__head{align-items:center;gap:6px;display:flex}.additional-option__name{color:var(--alp-review-text-gray80);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.additional-option__field{border:1px solid var(--alp-review-border-gray20);border-radius:6px;align-items:center;gap:8px;padding:9px 13px;transition:border-color .2s;display:flex}.additional-option__field:focus-within{border-color:var(--alp-review-border-point)}.additional-option__field input{min-width:0;color:var(--alp-review-text-gray100);font-family:inherit;font-size:inherit;background:0 0;border:none;outline:none;flex:auto}.additional-option__field input::placeholder{color:var(--alp-review-text-gray40)}.additional-option__count{color:var(--alp-review-text-gray50);flex-shrink:0}.option-dialog__amount{color:var(--alp-review-text-gray100);justify-content:space-between;align-items:center;gap:8px;padding-top:16px;display:flex}.option-dialog__amount>span:first-child{flex-shrink:0}.option-dialog__amount-value{text-align:right}.option-dialog__submit{width:100%;color:var(--alp-review-text-white);background:var(--alp-review-card-gray100);cursor:pointer;border:none;border-radius:6px;margin-top:12px;padding:14px 24px;transition:opacity .2s}@media (hover:hover){.option-dialog__submit:not(:disabled):hover{opacity:.8}}.option-dialog__submit:disabled{opacity:.3;cursor:not-allowed}@media (width<=840px){:host{max-width:100%}}`];var Ks=Object.defineProperty,Zs=Object.getOwnPropertyDescriptor,Js=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Zs(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Ks(t,i,s),s};let Qs=class extends ht{constructor(){super(...arguments),this.mode="cart",this.productName="",this.productImage="",this.basePrice=0,this.preselectVariantCode="",this.executing=!1,this.picked={},this.additionalValues=[],this.openIndex=null,this.texts=si.WIDGETS.DETAIL_POPUP.OPTION_DIALOG,this.onDocumentClick=e=>{null!==this.openIndex&&(e.composedPath().includes(this)||(this.openIndex=null))}}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.onDocumentClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.onDocumentClick)}willUpdate(e){(e.has("catalog")||e.has("preselectVariantCode"))&&(this.picked={},this.openIndex=null,this.additionalValues=(this.catalog?.additionalOptions??[]).map(()=>""),this.applyPreselect())}updated(e){(e.has("openIndex")||e.has("catalog"))&&this.syncDropdownLayout()}applyPreselect(){if(!this.preselectVariantCode||!this.catalog||!this.common)return;const e=this.catalog.variants.find(e=>e.variant_code===this.preselectVariantCode);if(!e)return;if(this.common.variantSellableReject(e,{use_inventory:this.catalog.use_inventory}))return;const t={};this.catalog.sections.forEach((i,r)=>{const o=i.values.findIndex(t=>e.options.some(e=>e.name===i.option_name&&e.value===t.option_text));o>=0&&(t[r]=o)}),this.picked=t}syncDropdownLayout(){const e=this.shadowRoot;if(!e)return;const t=e.querySelector(".option-dialog__list"),i=e.querySelector(".option-dialog");if(!t||!i)return;const r=t.scrollHeight,o=Math.max(i.offsetHeight,i.scrollHeight)-t.clientHeight+r,s=.9*window.innerHeight;if(o>s+1){const e=Math.max(120,s-(o-r));t.dataset.scrollable="true",t.style.maxHeight=e+"px",t.style.overflowY="auto",t.style.overflowX="hidden"}else"true"===t.dataset.scrollable&&(delete t.dataset.scrollable,t.style.maxHeight="",t.style.overflowY="",t.style.overflowX="");e.querySelectorAll(".option-items:not(.is-open)").forEach(e=>{e.style.maxHeight=""});const n=e.querySelector(".option-items.is-open"),a=n?.closest(".option-select");if(!n||!a)return;let p=0,l=window.innerHeight;if("true"===t.dataset.scrollable){const e=t.getBoundingClientRect();p=e.top,l=e.bottom}const d=a.getBoundingClientRect(),c=l-d.bottom-8,h=d.top-p-8,g=c<200&&h>c,u=Math.max(80,Math.min(200,g?h:c));g!==("up"===n.dataset.openDirection)&&(g?n.dataset.openDirection="up":delete n.dataset.openDirection,n.style.transition="none",n.style.maxHeight="0px",n.style.opacity="0",n.style.transform=g?"translateY(10px)":"translateY(-10px)",n.getBoundingClientRect(),n.style.transition="",n.style.opacity="",n.style.transform=""),n.style.maxHeight=u+"px"}valueState(e,t){const i=this.catalog;if("T"===i.option_type){const r=i.sections.indexOf(e);if(this.common.selectableValues(i,r,this.picked).some(e=>e.option_text===t.option_text))return"ok";if(!i.variants.some(r=>{if(!r.options.some(i=>i.name===e.option_name&&i.value===t.option_text))return!1;const o=this.common.variantSellableReject(r,{use_inventory:i.use_inventory});return"variant-not-displayed"!==o&&"variant-not-selling"!==o}))return"hidden";const o=Object.entries(this.picked).filter(([e])=>Number(e)!==r).map(([e,t])=>{const r=i.sections[Number(e)];return{name:r?.option_name,value:r?.values[t]?.option_text}}).concat({name:e.option_name,value:t.option_text}),s=i.variants.find(e=>o.every(t=>void 0===t.value||e.options.some(e=>e.name===t.name&&e.value===t.value)));if(!s)return"unavailable";const n=this.common.variantSellableReject(s,{use_inventory:i.use_inventory});return"out-of-stock"===n||"stock-unknown"===n?"sold-out":"unavailable"}const r=i.variants.find(e=>e.options.some(e=>e.value===t.option_text));if(!r)return"E"===i.option_type?"ok":"hidden";switch(this.common.variantSellableReject(r,{use_inventory:i.use_inventory})){case null:return"ok";case"out-of-stock":case"stock-unknown":return"sold-out";default:return"hidden"}}isSectionLocked(e){return"T"===this.catalog.option_type&&0!==e&&void 0===this.picked[e-1]}get resolved(){return this.common.resolveSlot(this.catalog,this.picked)}get additionalValidation(){return this.common.validateAdditionalOptions(this.catalog,this.additionalValues)}get canSubmit(){return this.resolved.ok&&this.additionalValidation.ok}get additionalAmount(){const e=this.resolved;return e.ok?this.common.additionalAmountOf(this.catalog,e.slot):0}totalBreakdown(e){const t=this.texts.PRICE(this.basePrice+e);return 0===e?t:`${this.texts.PRICE(this.basePrice)} ${this.texts.ADDITIONAL_AMOUNT(e)} = ${t}`}toggleSection(e){this.openIndex=this.openIndex===e?null:e}selectValue(e,t){const i={...this.picked};if("T"===this.catalog.option_type)for(const t of Object.keys(i))Number(t)>e&&delete i[Number(t)];i[e]=t,this.picked=i,this.openIndex=null}onInputAdditional(e,t){const i=this.catalog?.additionalOptions[e]?.maxLength??0,r=[...this.additionalValues];r[e]=i>0?t.slice(0,i):t,this.additionalValues=r}onClose(){this.dispatchEvent(new CustomEvent("review:optionClose",{bubbles:!0,composed:!0}))}onSubmit(){if(!this.executing){if(!this.canSubmit){const e=this.resolved,t=this.additionalValidation,i=e.ok?t.ok?"":t.reason:e.reason;return void(i&&alert(T(i)))}this.dispatchEvent(new CustomEvent("review:optionSubmit",{bubbles:!0,composed:!0,detail:{picked:this.picked,additionalValues:this.additionalValues}}))}}optionSection(e,t){const i=this.isSectionLocked(t),r=this.openIndex===t,o=this.picked[t],s=void 0===o?void 0:e.values[o],n=s?`${s.option_text} ${this.texts.ADDITIONAL_AMOUNT(s.additional_amount)}`.trim():e.option_name;return Je`
      <div class="option-section ${i?"is-disabled":""}">
        <span
          class="option-section__label alp-body14 alp-medium ${e.required?"is-required":""}"
        >
          ${e.required?this.texts.REQUIRED:this.texts.OPTIONAL}
        </span>

        <div class="option-select" @click=${()=>this.toggleSection(t)}>
          <span
            class="option-select__text alp-body14 alp-medium ${s?"":"is-placeholder"}"
          >
            ${n}
          </span>
          <span class="option-select__arrow ${r?"is-open":""}">
            <review-custom-icon
              type="${Et}"
              color="var(--alp-review-icon-gray60)"
              width="16"
              height="16"
            ></review-custom-icon>
          </span>

          <ul class="option-items ${r?"is-open":""}">
            ${e.values.map((i,r)=>{const s=this.valueState(e,i);if("hidden"===s)return Xe;const n="sold-out"===s||"unavailable"===s,a=this.texts.ADDITIONAL_AMOUNT(i.additional_amount);return Je`
                  <li
                    class="option-item alp-body14 alp-medium ${n?"is-disabled":""} ${o===r?"is-selected":""}"
                    @click=${e=>{e.stopPropagation(),n||this.selectValue(t,r)}}
                  >
                    ${i.option_text} ${a}
                    ${"sold-out"===s?this.texts.VALUE_SOLD_OUT:""}
                  </li>
                `})}
          </ul>
        </div>
      </div>
    `}additionalOption(e,t){const i=this.additionalValues[t]??"";return Je`
      <div class="additional-option">
        <div class="additional-option__head">
          <span
            class="option-section__label alp-body14 alp-medium ${e.required?"is-required":""}"
          >
            ${e.required?this.texts.REQUIRED:this.texts.OPTIONAL}
          </span>
          <span class="additional-option__name alp-body14 alp-medium">${e.name}</span>
        </div>

        <div class="additional-option__field">
          <input
            class="alp-body14 alp-medium"
            type="text"
            .value=${qs(i)}
            maxlength=${e.maxLength>0?e.maxLength:999}
            placeholder=${e.name}
            @input=${e=>this.onInputAdditional(t,e.target.value)}
          />
          ${e.maxLength>0?Je`<span class="additional-option__count alp-body12 alp-medium">
                ${i.length}/${e.maxLength}
              </span>`:null}
        </div>
      </div>
    `}render(){if(!this.catalog||!this.common)return Xe;const e=this.additionalAmount,t=this.canSubmit,i=this.basePrice>0;return Je`
      <div class="option-dialog" @click=${e=>e.stopPropagation()}>
        <div class="option-dialog__header">
          <p class="alp-body17 alp-bold">${this.texts.TITLE}</p>
          <span class="option-dialog__close" role="button" @click=${this.onClose}>
            <review-custom-icon
              type="${Pt}"
              color="var(--alp-review-icon-gray60)"
              width="24"
              height="24"
            ></review-custom-icon>
          </span>
        </div>

        <div class="option-dialog__product">
          ${this.productImage?Je`<img src="${this.productImage}" alt="${this.productName}" />`:null}
          <div class="option-dialog__product-info">
            <p class="option-dialog__product-name alp-body14 alp-medium">${this.productName}</p>
            ${this.basePrice>0?Je`<p class="option-dialog__product-price alp-body14 alp-semi-bold">
                  ${this.texts.PRICE(this.basePrice)}
                </p>`:null}
          </div>
        </div>

        <div class="option-dialog__list">
          ${this.catalog.sections.map((e,t)=>this.optionSection(e,t))}
          ${this.catalog.additionalOptions.map((e,t)=>this.additionalOption(e,t))}
        </div>

        ${t?i?Je`<div class="option-dialog__amount alp-body14 alp-medium">
                  <span>${this.texts.TOTAL_ESTIMATED}</span>
                  <span class="option-dialog__amount-value alp-semi-bold">
                    ${this.totalBreakdown(e)}
                  </span>
                </div>`:0!==e?Je`<div class="option-dialog__amount alp-body14 alp-medium">
                    <span>${this.texts.AMOUNT_TOTAL}</span>
                    <span class="alp-semi-bold">${this.texts.ADDITIONAL_AMOUNT(e)}</span>
                  </div>`:null:null}

        <button
          class="option-dialog__submit alp-body16 alp-semi-bold"
          ?disabled=${!this.canSubmit||this.executing}
          @click=${this.onSubmit}
        >
          ${"buy"===this.mode?this.texts.SUBMIT_BUY:this.texts.SUBMIT_CART}
        </button>
      </div>
    `}};Qs.styles=Ys,Js([i({type:Object})],Qs.prototype,"catalog",2),Js([i({type:Object})],Qs.prototype,"common",2),Js([i({type:String})],Qs.prototype,"mode",2),Js([i({type:String})],Qs.prototype,"productName",2),Js([i({type:String})],Qs.prototype,"productImage",2),Js([i({type:Number})],Qs.prototype,"basePrice",2),Js([i({type:String})],Qs.prototype,"preselectVariantCode",2),Js([i({type:Boolean})],Qs.prototype,"executing",2),Js([r()],Qs.prototype,"picked",2),Js([r()],Qs.prototype,"additionalValues",2),Js([r()],Qs.prototype,"openIndex",2),Qs=Js([ae("review-option-dialog")],Qs);const Xs=[Ni,Di,ko,ue`:host{font-size:var(--alp-common-rem);font-family:var(--alp-common-font-family);width:100%;display:block;container:board-gallery-widget/inline-size}.swiper-wrapper{transition:all .15s;display:flex}.swiper-wrapper .swiper-slide{height:fit-content;min-height:fit-content}.board-gallery-widget{padding:0 10px 40px}:host([data-compliance-attached]) .board-gallery-widget{padding-bottom:0}.swiper-container{width:100%;overflow:hidden}.board-gallery-grid-slide{grid-template-columns:repeat(var(--board-gallery-cols,1),1fr);grid-template-rows:repeat(var(--board-gallery-rows,1),1fr);gap:40px 20px;display:grid}.board-gallery-grid-item{width:100%;min-height:fit-content}.board-gallery-grid-item-img{aspect-ratio:1;cursor:pointer;width:100%}.board-gallery-grid-item-img>review-review-media{object-fit:cover;border-radius:12px;width:100%;height:100%;display:block}.board-gallery-grid-item-product{flex-direction:column;gap:12px;padding:12px 0 10px;display:flex}.board-gallery-grid-item-product-info{align-items:center;gap:14px;display:flex}.board-gallery-grid-item-product-info>p{color:var(--alp-review-text-gray100,#1e293b);letter-spacing:-.084px;font-size:12px;font-weight:400;line-height:140%}.board-gallery-grid-item-product-info-text{flex-direction:column;gap:4px;display:flex}.board-gallery-grid-item-product-info-text>p:nth-child(2){color:var(--alp-review-text-gray40,#1e293b66)}.board-gallery-grid-item-product-info-star{align-items:center;gap:6px;display:flex}.board-gallery-grid-item-product-info-star>p{color:var(--alp-review-text-gray100,#1e293b);letter-spacing:-.084px;font-size:12px;font-weight:700;line-height:normal}.board-gallery-grid-item-product-info-star>p:nth-child(2){margin-left:-6px}.board-gallery-grid-item-product-info-star>p:nth-child(4){font-weight:400}.board-gallery-grid-item-review-container{min-height:var(--board-gallery-min-height);max-height:var(--board-gallery-min-height);min-width:100%;max-width:100%;margin-bottom:20px}.content-divider{border-top:.5px solid var(--alp-review-border-gray10,#1e293b33)}.board-gallery-grid-item-review{border-top:.5px solid var(--alp-review-border-gray10,#1e293b33);cursor:pointer;align-items:center;gap:14px;min-height:74px;max-height:74px;padding:12px 12px 12px 0;display:flex}.board-gallery-grid-item-review-thumbnail{aspect-ratio:1;object-fit:cover;border-radius:6px;min-width:48px;max-width:48px;min-height:48px;max-height:48px;overflow:hidden}.board-gallery-grid-item-review>p{color:var(--alp-review-text-gray100,#1e293b);letter-spacing:-.084px;font-size:12px;font-weight:400;line-height:140%}.board-gallery-grid-item-review>.line-wrap{-webkit-line-clamp:3}.board-gallery-grid-item-thumbnail{aspect-ratio:1;object-fit:cover;border-radius:6px;width:48px;height:48px}.board-gallery-grid-wrapper{grid-template-columns:repeat(var(--board-gallery-cols,1),minmax(0,1fr));grid-template-rows:repeat(var(--board-gallery-rows,1),minmax(0,1fr));gap:20px 10px;display:grid}@container (width<=440px){.board-gallery-widget{padding-bottom:20px}}`],en="review-ticker-widget",tn="review-detail-popup",rn="review-chat-widget",on="review-sns-short-product-sheet",sn="tgHZp6LCG5KuklqvIYgrtB";let nn=null;const an=new Map,pn=async e=>{await ln(e)&&("imweb"===window.ALPHA_REVIEW_HOST?hn(e):cn(e))},ln=async e=>!(!e||e!==(window.iProductNo??"")+"")||!dn()&&"searchable"===await M(e),dn=()=>"cafe24"===window.ALPHA_REVIEW_HOST&&!1===window.ALPHA_REVIEW_SHOP_DESIGN_OPTION?.detail_show_product_link,cn=e=>{if("all"===e)return;if(!e)return;const t=window.ALPHA_REVIEW_CAFE24_INSTANCE?.SHOP_NO??window.CAFE24API?.SHOP_NO??"1";let i=location.origin;1!==Number(t)&&(i=i+"/shop"+t);const r=i+"/product/detail.html?product_no="+e,o=document.createElement("a");o.href=r,o.target="_top",document.body.appendChild(o),setTimeout(()=>{o.click()},100)},hn=e=>{if("all"===e)return;if(!e)return;const t=location.origin+"/shop_view/?idx="+e,i=document.createElement("a");i.href=t,i.target="_top",document.body.appendChild(i),setTimeout(()=>{i.click()},100)},gn=({reviewId:e,option:t,reviewIndex:i,backupList:r})=>{const o=tn,s={reviewId:e,reviewIndex:i?.toString()??"0"};t&&(s.option=JSON.stringify(t)),r&&(s.backupList=JSON.stringify(r));const n=e=>{"Escape"===e.key&&Wi.closeByUi(o)};window.addEventListener("keydown",n),d(o,{initialAttributes:s}),Wi.open({key:o,onClose:()=>{window.removeEventListener("keydown",n),c(o)}})};var un=Object.defineProperty;const wn=e=>{class t extends e{constructor(){super(...arguments),this.isInViewport=!1,this.intersectionObserver=null}initIntersectionObserver(){this.intersectionObserver=new IntersectionObserver(e=>{e[0].isIntersecting&&(this.isInViewport=!0,this.stopIntersectionObserver())},{root:null,rootMargin:"1000px 0px 1000px 0px",threshold:0})}startIntersectionObserver(){this.intersectionObserver&&this.intersectionObserver.observe(this)}stopIntersectionObserver(){this.intersectionObserver&&(this.intersectionObserver.unobserve(this),this.intersectionObserver.disconnect(),this.intersectionObserver=null)}initScrollObserver(){this.initIntersectionObserver(),this.startIntersectionObserver()}cleanupScrollObserver(){this.stopIntersectionObserver()}connectedCallback(){super.connectedCallback(),this.initScrollObserver()}disconnectedCallback(){super.disconnectedCallback(),this.cleanupScrollObserver(),this.isInViewport=!1}}return((e,t,i)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);o&&un(t,i,o)})([i({type:Boolean,state:!0})],t.prototype,"isInViewport"),t};class vn extends Error{constructor(e){super(e),this.code=e}}var mn=Object.defineProperty,yn=Object.getOwnPropertyDescriptor,fn=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?yn(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&mn(t,i,s),s};let bn=class extends(wn(ht)){constructor(){super(...arguments),this.widgetCode="",this.widgetSetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs="",this.totalPages=0,this.totalCount=0,this.filterOption={page:1,page_size:10,widget_code:"",product_no:"all",device:"pc"===P(this)?"w":"m",sort3:tr.RECENT_REVIEW_COUNT},this.row=5,this.col=5,this.designOption={},this.reviews={},this.isDesignLoading=!0,this.isWidgetLoading=!0,this.isFirstGetReviews=!0,this.isEmptyReview=!1,this.filterToggle=!1,this.reviewList=[],this.pageIndex=1,this.hoverState=!1,this.resizeCtrl=new zr(this,()=>{this.resetWidget()},{target:"self"}),this.emptyOjb={product_name:null,product_no:null,detail_image:null,price:null,review_number_connect_count:null,review_ratings_connect:null,reviews:[]},this.onPrevClick=()=>{this.bgwSwiper?.slidePrev()},this.onNextClick=()=>{this.bgwSwiper?.slideNext()},this.onPaginationBulletClick=e=>{const t=Math.max(1,Math.min(e.detail.index+1,this.totalPages));this.pageIndex=t,this.filterOption.page=t;const i=(t-1)*this.col;this.bgwSwiper?.slideTo(i,0,!1),this.getReviewList()},this.onSort3Change=async e=>{const{sort3:t}=e.detail;this.filterOption.sort3=t,this.resetWidget()}}async updated(e){if(super.updated(e),this.isDummy&&(this.filterOption.is_dummy=!0),e.has("isInViewport")){if(!this.isInViewport)return;this.productNo="PRODUCT_DETAIL"===await f()?v()||this.productNo:"all",this.filterOption.product_no=this.productNo,window?.CUSTOM_SWIPER?this.initialWidget():await p(()=>this.initialWidget())}}disconnectedCallback(){this.bgwSwiper?.destroy(!0,!0),this.bgwSwiper=null,this.reviewList=[],super.disconnectedCallback()}async getReviewList(){const e={...this.filterOption,widget_code:this.widgetCode};if(this.reviewList.length>0&&null!==this.reviewList[this.col*this.row*(this.pageIndex-1)]?.product_name)this.setGridRows();else try{let t;if(this.isWidgetLoading=!0,t=window?.ALPHA_PREVIEW?this.previewData:await b(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0,1e4),this.isFirstGetReviews&&(this.isEmptyReview=0===t.length),"none"===this.designOption.paging_type)return void(this.reviewList=t);if(1===this.filterOption.page){if(this.reviewList.length>0)return;this.reviewList=t;const e=this.col*this.row*this.totalPages-this.col*this.row;for(let t=0;t<e;t++)this.reviewList.push(this.emptyOjb)}else for(let e=0;e<t.length;e++)this.reviewList[e+this.col*this.row*(this.pageIndex-1)]=t[e]}catch(e){}finally{this.isWidgetLoading=!1,this.isFirstGetReviews=!1,setTimeout(()=>{this.setGridRows(),this.requestUpdate()},100)}}async getReviewMeta(){const e={...this.filterOption,widget_code:this.widgetCode};try{let t;t=window?.ALPHA_PREVIEW?this.previewMeta:await x(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_meta_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0),t?.code&&j(t.code),this.totalPages=t.total_page,this.totalCount=t.total_count<=t.total_page*this.col*this.row?t.total_count:t.total_page*this.col*this.row,"none"===this.designOption.paging_type&&(this.filterOption.page_size=this.row*this.col*this.totalPages,this.pageIndex=1)}catch(e){throw this.errorCode=F(e?.code),Error(e)}}async getWidgetOption(){try{let e;e=window?.ALPHA_PREVIEW?this.previewOption:await A(this.widgetCode,window.ALPHA_REVIEW_EMERGENCY?`/widget_option/${this.widgetCode}.json`:void 0),this.designOption=e,this.row="pc"===P(this)?this.designOption.num_row:this.designOption.num_row_m,this.col="pc"===P(this)?this.designOption.num_col:this.designOption.num_col_m,this.style.setProperty("--board-gallery-cols",""+this.col),this.style.setProperty("--board-gallery-rows",""+this.row),this.style.setProperty("--board-gallery-min-height",74*this.designOption.page_length+"px"),this.filterOption.widget_code=this.widgetCode,this.filterOption.page_size=this.row*this.col,this.filterOption.device="pc"===P(this)?"w":"m",this.isFirstGetReviews&&(this.filterOption.sort3=this.designOption.sort3)}catch(e){}finally{this.isDesignLoading=!1}}async initialWidget(){this.bgwSwiper?.destroy(!0,!0),this.bgwSwiper=null,this.isWidgetLoading=!0,this.isDesignLoading=!0,this.filterToggle=!0,this.reviewList=[];try{if(this.isFirstGetReviews&&(W(this,this.customJs),z(this,this.customCss??"")),await this.getWidgetOption(),await this.getReviewMeta(),await this.getReviewList(),await this.updateComplete,"indicator"!==this.designOption.paging_type)return;this.bgwInitialWidget()}catch(e){this.isFirstGetReviews=!1,this.isWidgetLoading=!1}finally{this.isFirstGetReviews=!1,this.isWidgetLoading=!1,this.filterToggle=!1}}bgwInitialWidget(){const e=this.row,t=this.col,i=!!this.designOption.autoplay&&{delay:1e3*this.designOption.autoplay_delay,disableOnInteraction:!1,pauseOnMouseEnter:!0,waitForTransition:!0};this.bgwSwiper=n({container:this.shadowRoot.querySelector("#sw-board-gallery-"+this.widgetCode),styleRoot:this.shadowRoot,options:{slidesPerView:t,grid:{rows:e,fill:1===t?"column":"row"},slidesPerGroup:t,spaceBetween:"pc"===P(this)?16:10,freeMode:{enabled:!1},allowTouchMove:this.designOption.swipe,simulateTouch:this.designOption.swipe,autoplay:i,pauseOnMouseEnter:!0,pauseOnFocus:!0,pauseOnHover:!0,pauseOnTouch:!0},event:{slideChange:e=>{const t=Math.floor((e?.realIndex??0)/this.col)+1;this.pageIndex!==t&&(this.pageIndex=t,this.filterOption.page=t,this.getReviewList())}}})}updateIndex(){const e=this.totalPages;e<0||this.pageIndex===e||(this.pageIndex=this.pageIndex===e?1:this.pageIndex+1,this.filterOption.page=this.pageIndex,this.getReviewList())}async resetWidget(){if("indicator"===this.designOption.paging_type){if(!this.bgwSwiper||0===this.reviewList.length)return;this.pageIndex=1,this.filterOption.page=1,await this.updateComplete,await this.initialWidget()}else{if(0===this.reviewList.length)return;this.pageIndex=1,this.filterOption.page=1,await this.updateComplete,await this.initialWidget()}this.setGridRows()}goToProductPage(e){pn(e)}goToReviewPage(e,t,i,r){const o={...this.filterOption,product_no:t,detail:!0,page:i%5+1};gn({reviewId:e,option:o,reviewIndex:i,backupList:r})}async setGridRows(){if(!this.bgwSwiper||"indicator"!==this.designOption.paging_type)return;await this.updateComplete;const e=this.shadowRoot.querySelector("#sw-board-gallery-"+this.widgetCode).querySelector(".swiper-wrapper");if(1===this.col){const t=this.bgwSwiper.slides.map(e=>e.querySelector(".board-gallery-grid-item")?.offsetHeight??0).filter(e=>e>0);if(t.length>0){const i=Math.max(...t);e.style.height=(i+30)*this.row+(this.bgwSwiper.params.spaceBetween??10)*(this.row-1)+"px",this.bgwSwiper.update()}return}const t=this.shadowRoot?.querySelector(".board-gallery-grid-item")?.clientHeight??0,i=20+("pc"===P(this)?12:10);if(this.pageIndex===this.totalPages){const r=Math.ceil((this.totalCount-(this.pageIndex-1)*this.row*this.col)/this.col);e.style.height=(t>1500?1500:t)*r+i*(r-1)+"px"}else e.style.height=(t>1500?1500:t)*this.row+i*(this.row-1)+"px"}productItemComponent(e){const t=si.WIDGETS.BOARD_GALLERY.WIDGET.PRICE_UNIT;return Je`<div class="board-gallery-grid-item-product">
      <div class="board-gallery-grid-item-product-info">
        <div class="board-gallery-grid-item-product-info-text">
          <p class="line-wrap alp-body13 alp-bold">${e?.product_name}</p>
          ${this.designOption.product_price?Je` <p class="line-wrap alp-body12">
                ${e?.price?.toLocaleString()}${t}
              </p>`:null}
        </div>
      </div>

      ${this.designOption.product_ratings||this.designOption.product_review?Je`
            <div class="board-gallery-grid-item-product-info-star">
              ${this.designOption.product_ratings?Je` <review-star-icon size="14"></review-star-icon>
                    <p>${e?.review_ratings_connect?.toFixed(1)}</p>`:null}
              ${this.designOption.product_ratings&&this.designOption.product_review?Je`<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2"
                    height="8"
                    viewBox="0 0 2 8"
                    fill="none"
                  >
                    <path d="M0.816406 0.5L0.816406 7.5" stroke="#1E293B" stroke-opacity="0.08" />
                  </svg>`:null}
              ${this.designOption.product_review?Je` <p>${i=e?.review_number_connect_count,`${si.WIDGETS.BOARD_GALLERY.WIDGET.REVIEW_PREFIX}${i} ${si.WIDGETS.BOARD_GALLERY.WIDGET.REVIEW_UNIT}`}</p>`:null}
            </div>
          `:null}
    </div>`;var i}productItemSkeletonComponent(){return Je`<div class="board-gallery-grid-item-product">
      <div>
        <div
          class="${this.isWidgetLoading?"review-skeleton":"review-skeleton-bg03"}"
          style="width: 100%; height: 15px; "
        ></div>
        ${this.designOption.product_price?Je`<div
              class="${this.isWidgetLoading?"review-skeleton":"review-skeleton-bg03"}"
              style="width: 30%; height: 15px; margin-top: 4px;"
            ></div>`:null}
      </div>

      ${this.designOption.product_ratings||this.designOption.product_review?Je`<div class="board-gallery-grid-item-product-info-star">
            ${this.designOption.product_ratings?Je` <review-star-icon
                  size="14"
                  color="var(--alp-review-card-gray05)"
                ></review-star-icon>`:null}
            ${this.designOption.product_review?Je` <div
                  class="${this.isWidgetLoading?"review-skeleton":"review-skeleton-bg03"}"
                  style="width: 20px; height: 10px;"
                ></div>`:null}
          </div>`:null}
    </div>`}reviewListComponent(e){const t="pc"===P(this)?this.designOption.page_length:this.designOption.page_length_m;return Je`
      ${e?.reviews.slice(0,t)?.map((t,i)=>Je`
          <div
            class="board-gallery-grid-item-review"
            @click=${()=>this.goToReviewPage(""+t.id,e?.product_no?.toString(),i,e?.reviews)}
          >
            <div class="board-gallery-grid-item-review-thumbnail">
              <review-review-media
                .reviewMedia=${t.ordered_media?.[0]}
                .isThumbnail=${!0}
                .productImg="${e?.detail_image}"
              ></review-review-media>
            </div>
            <p class="line-wrap">${t.content}</p>
          </div>
        `)}
    `}reviewListSkeletonComponent(){return Je`
      ${Array.from({length:this.designOption.page_length}).map(()=>Je`
          <div class="board-gallery-grid-item-review">
            <div class="board-gallery-grid-item-review-thumbnail review-skeleton-bg03"></div>
            <div class="review-skeleton-bg03" style="width: 100%; height: 16px;"></div>
          </div>
        `)}
    `}render(){return(this?.designOption?.review_minimum||0)>this.totalCount?Je`<div></div>`:this.errorCode?V(this.errorCode,this.productNo,this.widgetSetCode||this.widgetCode,this.widgetCode):!this.isDesignLoading&&this.isFirstGetReviews?Je`
        <div class="board-gallery-widget">
          <review-board-gallery-filter
            .filterOption=${this.filterOption}
          ></review-board-gallery-filter>
          <div
            style="display: grid; grid-template-columns: repeat(${this.col}, minmax(0, 1fr)); grid-template-rows: repeat(${this.row}, minmax(0, 1fr)); row-gap: 10px; column-gap: 10px;"
          >
            ${Array.from({length:this.col*this.row}).map(()=>Je`
                <div class="board-gallery-grid-item">
                  <div class="board-gallery-grid-item-img">
                    <div class="review-skeleton-bg03" style="width: 100%; height: 100%;"></div>
                  </div>
                  ${this.productItemSkeletonComponent()}
                  <div class="board-gallery-grid-item-review-container content-divider">
                    ${this.reviewListSkeletonComponent()}
                  </div>
                </div>
              `)}
          </div>
        </div>
      `:Je`
      <div
        class=${`board-gallery-widget${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`}
        id=${this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode}
        @mouseenter=${()=>this.hoverState=!0}
        @mouseleave=${()=>this.hoverState=!1}
      >
        <review-header-title
          .designOption=${this.designOption}
          .widgetCode=${this.widgetCode}
        ></review-header-title>

        <review-board-gallery-filter
          .filterOption=${this.filterOption}
          @review:sort3Change=${this.onSort3Change}
        ></review-board-gallery-filter>

        ${this.isWidgetLoading&&0===this.reviewList.length?Je`<review-loading-review></review-loading-review>`:null}

        <div
          id="sw-board-gallery-${this.widgetCode}"
          class="swiper-container"
          style="position: relative;"
        >
          ${"indicator"===this.designOption.paging_type&&this.designOption.navigation&&!this.isWidgetLoading&&this.reviewList.length>0?Je`
                <review-arrow-pagination-handler
                  .type=${Xt}
                  .isPrevVisible=${this.pageIndex>1&&this.hoverState}
                  .isNextVisible=${this.pageIndex<this.totalPages&&this.hoverState}
                  @prevArrowClick=${this.onPrevClick}
                  @nextArrowClick=${this.onNextClick}
                ></review-arrow-pagination-handler>
              `:null}

          <div
            class="swiper-wrapper ${"indicator"!==this.designOption.paging_type?"board-gallery-grid-wrapper":""}"
          >
            ${("indicator"!==this.designOption.paging_type?this.reviewList.slice(0,this.col*this.row*this.pageIndex):this.reviewList).map(e=>Je`
                <div class="swiper-slide">
                  <div class="board-gallery-grid-item">
                    
                    <div
                      class="board-gallery-grid-item-img"
                      @click=${()=>this.goToProductPage(e?.product_no?.toString())}
                    >
                      ${e?.product_name?Je`<review-review-media
                            .reviewImg="${e?.detail_image}"
                            .productImg="${e?.detail_image}"
                            .type=${"product"}
                          ></review-review-media>`:Je`<div
                            class="${this.isWidgetLoading?"review-skeleton":"review-skeleton-bg03"}"
                            style="width: 100%; height: 100%;"
                          ></div>`}
                    </div>

                    
                    ${e?.product_name?this.productItemComponent(e):this.productItemSkeletonComponent()}

                    
                    <div
                      class="board-gallery-grid-item-review-container ${0===e?.reviews.length&&null!==e?.product_name?"content-divider":""}"
                    >
                      ${0!==e?.reviews.length||e?.product_name?this.reviewListComponent(e):this.reviewListSkeletonComponent()}
                    </div>
                  </div>
                </div>
              `)}
          </div>
        </div>
        
        ${"none"!==this.designOption.paging_type&&0!==this.reviewList.length?Je` <review-pagination-handler
              .isDisabled=${this.isEmptyReview}
              .paginationType=${this.designOption?.paging_type===qi?this.designOption?.indicator_type:this.designOption?.paging_type}
              .currentPage=${this.pageIndex}
              .totalPages="${this.totalPages}"
              .productNo=${this.productNo}
              @paginationPrevClick=${this.onPrevClick}
              @paginationNextClick=${this.onNextClick}
              @paginationBulletClick=${this.onPaginationBulletClick}
              @moreButtonClick=${this.updateIndex}
            ></review-pagination-handler>`:null}
      </div>
    `}};bn.styles=Xs,fn([i({type:Object,attribute:"data-widget-preview-data"})],bn.prototype,"previewData",2),fn([i({type:Object,attribute:"data-widget-preview-option"})],bn.prototype,"previewOption",2),fn([i({type:Object,attribute:"data-widget-preview-meta"})],bn.prototype,"previewMeta",2),fn([i({type:String,attribute:"data-widget-code"})],bn.prototype,"widgetCode",2),fn([i({type:String,attribute:"data-widget-set-code"})],bn.prototype,"widgetSetCode",2),fn([i({type:String,attribute:"data-product-no"})],bn.prototype,"productNo",2),fn([i({type:String,attribute:"data-widget-custom-class"})],bn.prototype,"widgetCustomClass",2),fn([i({type:String,attribute:"data-widget-custom-id"})],bn.prototype,"widgetCustomId",2),fn([i({type:Boolean,attribute:"data-dummy"})],bn.prototype,"isDummy",2),fn([i({type:String,attribute:"data-custom-class"})],bn.prototype,"customClass",2),fn([i({type:String,attribute:"data-custom-id"})],bn.prototype,"customId",2),fn([i({type:String,attribute:"data-custom-css"})],bn.prototype,"customCss",2),fn([i({type:String,attribute:"data-custom-js"})],bn.prototype,"customJs",2),fn([r()],bn.prototype,"totalPages",2),fn([r()],bn.prototype,"totalCount",2),fn([r()],bn.prototype,"filterOption",2),fn([r()],bn.prototype,"row",2),fn([r()],bn.prototype,"col",2),fn([r()],bn.prototype,"designOption",2),fn([r()],bn.prototype,"reviews",2),fn([r()],bn.prototype,"isDesignLoading",2),fn([r()],bn.prototype,"isWidgetLoading",2),fn([r()],bn.prototype,"isFirstGetReviews",2),fn([r()],bn.prototype,"isEmptyReview",2),fn([r()],bn.prototype,"filterToggle",2),fn([r()],bn.prototype,"reviewList",2),fn([r()],bn.prototype,"pageIndex",2),fn([r()],bn.prototype,"hoverState",2),bn=fn([ae("review-board-gallery-widget")],bn);const xn=[Ni,Di,ko,ue`:host{font-family:var(--alp-common-font-family);color:var(--alp-review-text-gray100);display:block;container:board-gallery-slider-widget/inline-size}.swiper-wrapper{transition:all .15s}.swiper-wrapper .swiper-slide{height:fit-content;min-height:fit-content}.board-gallery-slider-widget{padding:0 10px 40px}:host([data-compliance-attached]) .board-gallery-slider-widget{padding-bottom:0}.board-gallery-slider-widget review-board-gallery-mobile-product,.board-gallery-slider-widget review-gallery-product-card,.board-gallery-slider-widget review-review-media{cursor:pointer}.board-gallery-slider-widget-pc{gap:10px;min-height:515px;max-height:515px;display:flex}.board-gallery-slider-widget-mobile{display:none}.swiper-container{width:100%;overflow:hidden}.board-gallery-slider-widget-review-container{flex-wrap:wrap;gap:40px 18px;width:100%;max-height:520px;padding:0 40px;transition:all .3s;display:flex;overflow-y:scroll}.board-gallery-slider-widget-product-info{position:relative}.board-gallery-slider-widget-next-prev-handler{position:absolute;bottom:16px;right:16px}review-gallery-photo-card{box-sizing:border-box;flex:0 clamp(156px,23%,156px);min-width:0}.board-gallery-grid-product-skeleton{flex-direction:column;gap:4px;max-height:505px;margin-left:10px;display:flex}.board-gallery-grid-product-skeleton .img{border-radius:12px;width:360px;height:438px}.board-gallery-grid-product-skeleton .info{flex-direction:column;gap:4px;display:flex}.board-gallery-grid-product-skeleton .info .name{width:150px;height:17px}.board-gallery-grid-product-skeleton .info .price{width:60px;height:18px}.board-gallery-grid-product-skeleton .info .review-count{width:100px;height:17px}.board-gallery-grid-card-skeleton{flex-wrap:wrap;gap:40px 18px;width:100%;max-height:520px;padding:0 40px;display:flex}.board-gallery-grid-card-skeleton .content{box-sizing:border-box;border-radius:12px;flex:0 clamp(156px,23%,156px);min-width:0;max-height:160px}.board-gallery-slider-widget-pc:not(:first-child){margin-top:40px}@container board-gallery-slider-widget (width<=840px){.board-gallery-slider-widget-pc{display:none}.board-gallery-slider-widget-mobile{display:block}.board-gallery-slider-widget-review-container{grid-template-columns:1fr 1fr;gap:2px;width:100%;padding:0;display:grid}review-gallery-review-card{width:156px}.board-gallery-grid-product-skeleton{flex-direction:row;gap:14px;padding:16px;display:flex}.board-gallery-grid-product-skeleton .img{border-radius:50%;min-width:62px;max-width:62px;min-height:62px;max-height:62px}.board-gallery-grid-product-skeleton .info{flex-direction:column;gap:3px;padding:0;display:flex}.board-gallery-grid-product-skeleton .info .name{width:100px;height:17px}.board-gallery-grid-product-skeleton .info .price{width:40px;height:17px}.board-gallery-grid-product-skeleton .info .review-count{width:80px;height:16px}.board-gallery-grid-card-skeleton{grid-template-columns:1fr 1fr;gap:2px;width:100%;padding:0;display:grid}.board-gallery-grid-card-skeleton .content{width:100%;min-height:320px}.swiper-wrapper>.swiper-slide:not(:first-child),.board-gallery-slider-widget-pc:not(:first-child){margin-top:0}}@container board-gallery-slider-widget (width<=440px){.board-gallery-slider-widget{padding-bottom:20px}.board-gallery-slider-widget-pc{display:none}.board-gallery-slider-widget-mobile{display:block}.board-gallery-grid-card-skeleton .content{aspect-ratio:1;width:100%;min-height:0}review-gallery-review-card{border-bottom:none}.swiper-wrapper>.swiper-slide:not(:first-child),.board-gallery-slider-widget-pc:not(:first-child){margin-top:0}}`];var _n=Object.defineProperty,Cn=Object.getOwnPropertyDescriptor,$n=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Cn(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&_n(t,i,s),s};let On=class extends(wn(ht)){constructor(){super(...arguments),this.widgetCode="",this.widgetSetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs="",this.totalPages=0,this.totalCount=0,this.filterOption={page:1,page_size:10,widget_code:"",product_no:"all",device:"pc"===P(this)?"w":"m"},this.row=5,this.col=5,this.designOption={},this.reviews={},this.isDesignLoading=!0,this.isWidgetLoading=!0,this.isFirstGetReviews=!0,this.isEmptyReview=!1,this.filterToggle=!0,this.reviewList=[],this.pageIndex=1,this.hoverState=!1,this.resizeCtrl=new zr(this,()=>this.resetWidget(),{target:"self"}),this.emptyOjb={product_name:null,product_no:null,detail_image:null,price:null,review_number_connect_count:null,review_ratings_connect:null,reviews:[]},this.onPrevClick=()=>{this.swiper?.slidePrev()},this.onNextClick=()=>{this.swiper?.slideNext()},this.onPaginationBulletClick=e=>{const t=Math.max(1,Math.min(e.detail.index+1,this.totalPages));this.pageIndex=t,this.filterOption.page=t;const i=(t-1)*this.col;this.swiper?.slideTo(i,0,!1),this.getReviewList()},this.onSort3Change=async e=>{const{sort3:t}=e.detail;this.filterOption.sort3=t,this.resetWidget()}}async updated(e){if(super.updated(e),this.isDummy&&(this.filterOption.is_dummy=!0),e.has("isInViewport")){if(!this.isInViewport)return;this.productNo="PRODUCT_DETAIL"===await f()?v()||this.productNo:"all",this.filterOption.product_no=this.productNo,window?.CUSTOM_SWIPER?this.initialWidget():await p(()=>this.initialWidget())}}disconnectedCallback(){this.swiper?.destroy(!0,!0),this.swiper=null,super.disconnectedCallback()}async getReviewList(){const e={...this.filterOption,widget_code:this.widgetCode};if(this.reviewList.length>0&&null!==this.reviewList[this.pageIndex-1]?.[0]?.product_name)this.setGridRows();else try{let t;if(this.isWidgetLoading=!0,t=window?.ALPHA_PREVIEW?this.previewData:await b(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0,1e4),this.isFirstGetReviews&&(this.isEmptyReview=0===t.length),"none"===this.designOption.paging_type)return void(this.reviewList=[t]);const i=this.totalPages-this.row-this.totalCount;if(1===this.filterOption.page){if(this.reviewList.length>0)return;this.reviewList=[t];for(let e=0;e<this.totalPages-1;e++){const e=[];for(let t=0;t<("indicator"===this.designOption.paging_type?this.col*this.row:this.col*this.row-i);t++)e.push(this.emptyOjb);this.reviewList.push(e)}}else for(let e=0;e<t.length;e++)this.reviewList[this.pageIndex-1][e]=t[e]}catch(e){}finally{this.isWidgetLoading=!1,this.isFirstGetReviews=!1,this.setGridRows(),this.requestUpdate()}}async getReviewMeta(){const e={...this.filterOption,widget_code:this.widgetCode};try{let t;t=window?.ALPHA_PREVIEW?this.previewMeta:await x(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_meta_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0),t?.code&&j(t.code),this.totalPages=t.total_page,this.totalCount=t.total_count<=t.total_page*this.row?t.total_count:t.total_page*this.row,"none"===this.designOption.paging_type&&(this.filterOption.page_size=this.row*this.totalPages,this.pageIndex=1)}catch(e){throw this.errorCode=F(e?.code),Error(e)}}async getWidgetOption(){try{let e;e=window?.ALPHA_PREVIEW?this.previewOption:await A(this.widgetCode,window.ALPHA_REVIEW_EMERGENCY?`/widget_option/${this.widgetCode}.json`:void 0),this.designOption=e,this.row="pc"===P(this)?this.designOption.num_row:1,this.col=1,this.filterOption.widget_code=this.widgetCode,this.filterOption.page_size=this.row,this.filterOption.device="pc"===P(this)?"w":"m",this.isFirstGetReviews&&(this.filterOption.sort3=this.designOption.sort3)}catch(e){}finally{this.isDesignLoading=!1}}updateIndex(){const e=this.totalPages;e<0||this.pageIndex===e||(this.pageIndex=this.pageIndex===e?1:this.pageIndex+1,this.filterOption.page=this.pageIndex,this.getReviewList())}async initialWidget(){this.swiper?.destroy(!0,!0),this.swiper=null,this.isWidgetLoading=!0,this.isDesignLoading=!0,this.filterToggle=!0,this.reviewList=[];try{if(this.isFirstGetReviews&&(W(this,this.customJs),z(this,this.customCss??"")),await this.getWidgetOption(),await this.getReviewMeta(),await this.getReviewList(),await this.updateComplete,"indicator"!==this.designOption.paging_type)return;this.initialSwiper()}catch(e){}finally{this.isFirstGetReviews=!1,this.isWidgetLoading=!1,this.filterToggle=!1}}initialSwiper(){const e=!!this.designOption.autoplay&&{delay:1e3*this.designOption.autoplay_delay,disableOnInteraction:!1,pauseOnMouseEnter:!0,waitForTransition:!0};this.swiper=n({container:this.shadowRoot.querySelector("#sw-board-slider-"+this.widgetCode),styleRoot:this.shadowRoot,options:{slidesPerView:1,slidesPerGroup:1,freeMode:{enabled:!1},allowTouchMove:this.designOption.swipe,simulateTouch:this.designOption.swipe,autoplay:e,pauseOnMouseEnter:!0,pauseOnFocus:!0,pauseOnHover:!0,pauseOnTouch:!0},event:{slideChange:e=>{const t=Math.floor((e?.realIndex??0)/this.col)+1;this.pageIndex!==t&&(this.pageIndex=t,this.filterOption.page=t,this.getReviewList())}}})}async resetWidget(){if("indicator"===this.designOption.paging_type){if(!this.swiper||0===this.reviewList.length)return;this.onPaginationBulletClick({detail:{index:0}}),await this.updateComplete,await this.initialWidget()}else{if(0===this.reviewList.length)return;this.pageIndex=1,this.filterOption.page=1,await this.updateComplete,await this.initialWidget()}this.setGridRows()}goToProductPage(e){pn(e)}goToReviewPage(e,t,i,r){gn({reviewId:e,option:{...this.filterOption,product_no:t},reviewIndex:i,backupList:r})}async setGridRows(){if(!this.swiper||"indicator"!==this.designOption.paging_type||"pc"!==P(this))return;await this.updateComplete;const e=this.shadowRoot.querySelector("#sw-board-slider-"+this.widgetCode).querySelector(".swiper-wrapper");if(this.pageIndex===this.totalPages){const t=Math.ceil((this.totalCount-(this.pageIndex-1)*this.row*this.col)/this.col);e.style.height=515*t+40*(t-1)+"px"}else e.style.height=515*this.row+40*(this.row-1)+"px"}galleryProductCardComponent(e){return Je`
      <review-gallery-product-card
        @click=${()=>this.goToProductPage(e.product_no?.toString())}
        .designOption=${this.designOption}
        .productName="${e.product_name??""}"
        .productPrice="${e.price}"
        .productImageUrl="${e.detail_image??""}"
        .averageRating="${e.review_ratings_connect}"
        .reviewCount="${e.review_number_connect_count}"
      ></review-gallery-product-card>
    `}galleryProductCardMobileComponent(e){return Je`
      <div class="board-gallery-list-widget-product-info">
        <review-board-gallery-mobile-product
          @click=${()=>this.goToProductPage(e.product_no?.toString())}
          .designOption=${this.designOption}
          .productName="${e.product_name??""}"
          .productPrice="${e.price}"
          .productImageUrl="${e.detail_image??""}"
          .averageRating="${e.review_ratings_connect}"
          .reviewCount="${e.review_number_connect_count}"
        ></review-board-gallery-mobile-product>
      </div>
    `}galleryProductCardSkeletonComponent(){const e=this.isWidgetLoading?"review-skeleton":"review-skeleton-bg03";return Je`
      <div class="board-gallery-grid-product-skeleton">
        <div class="img ${e}"></div>
        <div class="info">
          <div class="name ${e}"></div>
          ${this.designOption.product_price?Je`<div class="price ${e}"></div>`:null}
          ${this.designOption.product_review||this.designOption.product_ratings?Je`<div class="review-count ${e}"></div>`:null}
        </div>
      </div>
    `}galleryReviewCardComponent(e){const t="pc"===P()?this.designOption.page_length:this.designOption.page_length_m;return Je`
      <div class="board-gallery-slider-widget-review-container custom-scrollbar">
        ${e.reviews.slice(0,t)?.map((t,i)=>Je`
              <review-gallery-photo-card
                @click=${()=>this.goToReviewPage(t?.id?.toString(),e?.product_no?.toString(),i,e.reviews)}
                .designOption=${this.designOption}
                .review=${t}
                .productImg="${e.detail_image}"
              ></review-gallery-photo-card>
            `)}
      </div>
    `}galleryReviewCardMobileComponent(e){return Je`
      <div
        class="board-gallery-slider-widget-review-container custom-scrollbar"
        style="min-width:100%;
        ${0===e.reviews.length?"min-height:300px":""};
        "
      >
        ${e.reviews.slice(0,this.designOption.page_length_m)?.map((t,i)=>Je`
              <review-review-media
                @click=${()=>this.goToReviewPage(t?.id?.toString(),e?.product_no?.toString(),i,e.reviews)}
                .reviewMedia=${t.ordered_media[0]}
                .totalPages="${t.media_length}"
              ></review-review-media>
            `)}
      </div>
    `}galleryReviewCardSkeletonComponent(){const e=this.isWidgetLoading?"review-skeleton":"review-skeleton-bg03";return Je`
      <div class="board-gallery-grid-card-skeleton" style="aspect-ratio: 1 / ${Math.ceil((this.designOption?.page_length_m??1)/2)};">
        ${Array.from({length:this.designOption.page_length??1}).map(()=>Je` <div class="content ${e}"></div> `)}
      </div>
    `}render(){return this.errorCode?V(this.errorCode,this.productNo,this.widgetSetCode||this.widgetCode,this.widgetCode):!this.isDesignLoading&&this.isFirstGetReviews?Je`
        <div class="board-gallery-slider-widget">
          <review-board-gallery-filter
            .filterOption=${this.filterOption}
          ></review-board-gallery-filter>
          <div id="sw-board-slider-${this.widgetCode}" class="swiper-container">
            <div class="swiper-slide" style="display: flex; flex-direction: column;width: 100%;">
              ${Array.from({length:this.row}).map(()=>Je`
                  <div class="board-gallery-slider-widget-pc">
                    ${this.galleryProductCardSkeletonComponent()}
                    ${this.galleryReviewCardSkeletonComponent()}
                  </div>

                  <div class="swiper-slide board-gallery-slider-widget-mobile">
                    ${this.galleryProductCardSkeletonComponent()}
                    ${this.galleryReviewCardSkeletonComponent()}
                  </div>
                `)}
            </div>
          </div>
        </div>
      `:Je`
      <div
        class=${`board-gallery-slider-widget${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`}
        id=${this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode}
        @mouseenter=${()=>this.hoverState=!0}
        @mouseleave=${()=>this.hoverState=!1}
      >
        <review-header-title
          .designOption=${this.designOption}
          .widgetCode=${this.widgetCode}
        ></review-header-title>

        <review-board-gallery-filter
          .filterOption=${this.filterOption}
          @review:sort3Change=${this.onSort3Change}
        ></review-board-gallery-filter>

        ${this.isWidgetLoading&&0===this.reviewList.length?Je`<review-loading-review></review-loading-review>`:null}

        <div id="sw-board-slider-${this.widgetCode}" class="swiper-container">
          ${"indicator"===this.designOption.paging_type&&this.designOption.navigation&&!this.isWidgetLoading&&this.reviewList.length>0?Je`
                <review-arrow-pagination-handler
                  class="board-gallery-list-widget-arrow-pagination-handler"
                  .type=${Xt}
                  .isPrevVisible=${this.pageIndex>1&&this.hoverState}
                  .isNextVisible=${this.pageIndex<this.totalPages&&this.hoverState}
                  @prevArrowClick=${this.onPrevClick}
                  @nextArrowClick=${this.onNextClick}
                ></review-arrow-pagination-handler>
              `:null}

          <div class="swiper-wrapper">
            ${("indicator"!==this.designOption.paging_type?this.reviewList.slice(0,this.pageIndex):this.reviewList).map(e=>Je`
                <div
                  class="swiper-slide"
                  style="display: flex; flex-direction: column;width: 100%;"
                >
                  ${e?.slice(0,this.row)?.map(e=>Je`
                      <div class="board-gallery-slider-widget-pc">
                        ${e?.product_name?this.galleryProductCardComponent(e):this.galleryProductCardSkeletonComponent()}
                        ${e?.product_name?this.galleryReviewCardComponent(e):this.galleryReviewCardSkeletonComponent()}
                      </div>

                      <div class="swiper-slide board-gallery-slider-widget-mobile">
                        ${e?.product_name?this.galleryProductCardMobileComponent(e):this.galleryProductCardSkeletonComponent()}
                        ${e?.product_name?this.galleryReviewCardMobileComponent(e):this.galleryReviewCardSkeletonComponent()}
                      </div>
                    `)}
                </div>
              `)}
          </div>
        </div>
        
        ${"none"===this.designOption.paging_type||this.isDesignLoading||0===this.reviewList.length?null:Je` <review-pagination-handler
              .isDisabled=${this.isEmptyReview}
              .paginationType=${this.designOption?.paging_type===qi?this.designOption?.indicator_type:this.designOption?.paging_type}
              .currentPage=${this.pageIndex}
              .totalPages="${this.totalPages}"
              .productNo=${this.productNo}
              @paginationPrevClick=${this.onPrevClick}
              @paginationNextClick=${this.onNextClick}
              @paginationBulletClick=${this.onPaginationBulletClick}
              @moreButtonClick=${this.updateIndex}
            ></review-pagination-handler>`}
      </div>
    `}};On.styles=xn,$n([i({type:Object,attribute:"data-widget-preview-data"})],On.prototype,"previewData",2),$n([i({type:Object,attribute:"data-widget-preview-option"})],On.prototype,"previewOption",2),$n([i({type:Object,attribute:"data-widget-preview-meta"})],On.prototype,"previewMeta",2),$n([i({type:String,attribute:"data-widget-code"})],On.prototype,"widgetCode",2),$n([i({type:String,attribute:"data-widget-set-code"})],On.prototype,"widgetSetCode",2),$n([i({type:String,attribute:"data-product-no"})],On.prototype,"productNo",2),$n([i({type:String,attribute:"data-widget-custom-class"})],On.prototype,"widgetCustomClass",2),$n([i({type:String,attribute:"data-widget-custom-id"})],On.prototype,"widgetCustomId",2),$n([i({type:Boolean,attribute:"data-dummy"})],On.prototype,"isDummy",2),$n([i({type:String,attribute:"data-custom-class"})],On.prototype,"customClass",2),$n([i({type:String,attribute:"data-custom-id"})],On.prototype,"customId",2),$n([i({type:String,attribute:"data-custom-css"})],On.prototype,"customCss",2),$n([i({type:String,attribute:"data-custom-js"})],On.prototype,"customJs",2),$n([r()],On.prototype,"totalPages",2),$n([r()],On.prototype,"totalCount",2),$n([r()],On.prototype,"filterOption",2),$n([r()],On.prototype,"row",2),$n([r()],On.prototype,"col",2),$n([r()],On.prototype,"designOption",2),$n([r()],On.prototype,"reviews",2),$n([r()],On.prototype,"isDesignLoading",2),$n([r()],On.prototype,"isWidgetLoading",2),$n([r()],On.prototype,"isFirstGetReviews",2),$n([r()],On.prototype,"isEmptyReview",2),$n([r()],On.prototype,"filterToggle",2),$n([r()],On.prototype,"reviewList",2),$n([r()],On.prototype,"pageIndex",2),$n([r()],On.prototype,"hoverState",2),On=$n([ae("review-board-gallery-slider-widget")],On);const kn=[Ni,Di,ko,ue`:host{font-family:var(--alp-common-font-family);color:var(--alp-review-text-gray100);display:block;container:board-gallery-list-widget/inline-size}.swiper-wrapper{transition:all .15s}.swiper-wrapper .swiper-slide{height:fit-content;min-height:fit-content}.board-gallery-list-widget{padding:0 10px 40px}:host([data-compliance-attached]) .board-gallery-list-widget{padding-bottom:0}.board-gallery-list-widget-product-card-pc{cursor:pointer;display:flex}.board-gallery-list-widget-pc{gap:10px;min-height:515px;max-height:515px;display:flex}.board-gallery-list-widget-mobile{display:none}.swiper-container{width:100%;overflow:hidden}.board-gallery-list-widget-review-container{flex-direction:column;width:100%;min-height:76px;max-height:520px;padding:0 40px 0 14px;display:flex;overflow-y:scroll;&::-webkit-scrollbar{width:6px;height:0}&::-webkit-scrollbar-track{background-color:#0000}&::-webkit-scrollbar-thumb{background-color:var(--alp-review-icon-gray10);border-radius:12px}}review-gallery-review-card{border-bottom:1px solid var(--alp-review-border-gray10)}.board-gallery-list-widget-product-info{position:relative}.board-gallery-list-widget-next-prev-handler{position:absolute;bottom:16px;right:16px}.board-gallery-grid-product-skeleton{flex-direction:column;gap:4px;max-height:505px;display:flex}.board-gallery-grid-product-skeleton .img{width:360px;height:438px}.board-gallery-grid-product-skeleton .info{flex-direction:column;gap:4px;display:flex}.board-gallery-grid-product-skeleton .info .name{width:150px;height:17px;margin-bottom:4px}.board-gallery-grid-product-skeleton .info .price{width:60px;height:18px}.board-gallery-grid-product-skeleton .info .review-count{width:100px;height:17px}.board-gallery-grid-card-skeleton-mobile{display:none}.board-gallery-grid-card-skeleton-pc{border-bottom:1px solid var(--alp-review-border-gray10);align-items:center;gap:10px;width:100%;min-height:76px;max-height:76px;display:flex}.board-gallery-grid-card-skeleton-pc .content{flex-direction:column;gap:10px;width:100%;display:flex}.board-gallery-grid-card-skeleton-pc .content .content-text{width:100%;height:20px}.board-gallery-grid-card-skeleton-pc .content .option{width:200px;height:18px}.board-gallery-grid-card-skeleton-pc .img{min-width:48px;max-width:48px;min-height:48px;max-height:48px}@container board-gallery-list-widget (width<=840px){.board-gallery-list-widget-pc{display:none}.board-gallery-list-widget-mobile{display:block}.board-gallery-list-widget-review-container{width:100%;min-height:var(--product-min-height);gap:6px;padding:0}.board-gallery-list-widget-review-container>div{background:var(--alp-review-card-gray05,#1e293b08);border-radius:4px;padding:0 16px}review-gallery-review-card{border-bottom:none}.board-gallery-grid-product-skeleton{flex-direction:row;gap:14px;padding:16px;display:flex}.board-gallery-grid-product-skeleton .img{border-radius:50%;min-width:62px;max-width:62px;min-height:62px;max-height:62px}.board-gallery-grid-product-skeleton .info{flex-direction:column;gap:3px;padding:0;display:flex}.board-gallery-list-widget-review-container>div{border-radius:12px}.board-gallery-grid-product-skeleton .info .name{width:100px;height:17px}.board-gallery-grid-product-skeleton .info .price{width:40px;height:17px}.board-gallery-grid-product-skeleton .info .review-count{width:80px;height:16px}.board-gallery-grid-card-skeleton-mobile{border-radius:4px;width:100%;height:78px;display:block}.board-gallery-grid-card-skeleton-pc{display:none}}@container board-gallery-list-widget (width<=440px){.board-gallery-list-widget{padding-bottom:20px}.board-gallery-list-widget-pc{display:none}.board-gallery-list-widget-mobile{display:block}.board-gallery-list-widget-review-container{width:100%;min-height:var(--product-min-height);gap:6px;padding:0}.board-gallery-list-widget-review-container>div{background:var(--alp-review-card-gray05,#1e293b08);border-radius:12px;padding:0 16px}review-gallery-review-card{border-bottom:none}.board-gallery-list-widget-arrow-pagination-handler{display:none}}`];var Sn=Object.defineProperty,En=Object.getOwnPropertyDescriptor,Rn=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?En(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Sn(t,i,s),s};let Ln=class extends(wn(ht)){constructor(){super(...arguments),this.widgetCode="",this.widgetSetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs="",this.totalPages=0,this.totalCount=0,this.filterOption={page:1,page_size:10,widget_code:"",product_no:"all",device:"pc"===P(this)?"w":"m"},this.row=5,this.col=5,this.designOption={},this.reviews={},this.isDesignLoading=!0,this.isWidgetLoading=!0,this.isFirstGetReviews=!0,this.isEmptyReview=!1,this.filterToggle=!0,this.reviewList=[],this.pageIndex=1,this.hoverState=!1,this.resizeCtrl=new zr(this,()=>this.resetWidget(),{target:"self"}),this.emptyOjb={product_name:null,product_no:null,detail_image:null,price:null,review_number_connect_count:null,review_ratings_connect:null,reviews:[]},this.onPrevClick=()=>{this.swiper?.slidePrev()},this.onNextClick=()=>{this.swiper?.slideNext()},this.onPaginationBulletClick=e=>{const t=Math.max(1,Math.min(e.detail.index+1,this.totalPages));this.pageIndex=t,this.filterOption.page=t;const i=(t-1)*this.col;this.swiper?.slideTo(i,0,!1),this.getReviewList()},this.onSort3Change=async e=>{const{sort3:t}=e.detail;this.filterOption.sort3=t,this.resetWidget()}}async updated(e){if(super.updated(e),this.isDummy&&(this.filterOption.is_dummy=!0),e.has("isInViewport")){if(!this.isInViewport)return;this.productNo="PRODUCT_DETAIL"===await f()?v()||this.productNo:"all",this.filterOption.product_no=this.productNo,window?.CUSTOM_SWIPER?this.initialWidget():await p(()=>this.initialWidget())}}disconnectedCallback(){this.swiper?.destroy(!0,!0),this.swiper=null,super.disconnectedCallback()}async getReviewList(){const e={...this.filterOption,widget_code:this.widgetCode};if(this.reviewList.length>0&&null!==this.reviewList[this.pageIndex-1]?.[0]?.product_name)this.setGridRows();else try{let t;if(this.isWidgetLoading=!0,t=window?.ALPHA_PREVIEW?this.previewData:await b(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0,1e4),this.isFirstGetReviews&&(this.isEmptyReview=0===t.length),"none"===this.designOption.paging_type)return void(this.reviewList=[t]);const i=this.totalPages-this.row-this.totalCount;if(1===this.filterOption.page){if(this.reviewList.length>0)return;this.reviewList=[t];for(let e=0;e<this.totalPages-1;e++){const e=[];for(let t=0;t<("indicator"===this.designOption.paging_type?this.col*this.row:this.col*this.row-i);t++)e.push(this.emptyOjb);this.reviewList.push(e)}}else for(let e=0;e<t.length;e++)this.reviewList[this.pageIndex-1][e]=t[e]}catch(e){}finally{this.isWidgetLoading=!1,this.isFirstGetReviews=!1,this.setGridRows(),this.requestUpdate()}}async getReviewMeta(){const e={...this.filterOption,widget_code:this.widgetCode};try{let t;t=window?.ALPHA_PREVIEW?this.previewMeta:await x(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_meta_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0),t?.code&&j(t.code),this.totalPages=t.total_page,this.totalCount=t.total_count<=t.total_page*this.row?t.total_count:t.total_page*this.row,"none"===this.designOption.paging_type&&(this.filterOption.page_size=this.row*this.col*this.totalPages,this.pageIndex=1)}catch(e){throw this.errorCode=F(e?.code),Error(e)}}async getWidgetOption(){try{let e;e=window?.ALPHA_PREVIEW?this.previewOption:await A(this.widgetCode,window.ALPHA_REVIEW_EMERGENCY?`/widget_option/${this.widgetCode}.json`:void 0),this.designOption=e,this.row="pc"===P(this)?this.designOption.num_row:1,this.col=1,this.filterOption.widget_code=this.widgetCode,this.filterOption.page_size=this.row*this.col,this.filterOption.device="pc"===P(this)?"w":"m",this.isFirstGetReviews&&(this.filterOption.sort3=this.designOption.sort3)}catch(e){}finally{this.isDesignLoading=!1}}updateIndex(){const e=this.totalPages;e<0||this.pageIndex===e||(this.pageIndex=this.pageIndex===e?1:this.pageIndex+1,this.filterOption.page=this.pageIndex,this.getReviewList())}async initialWidget(){this.swiper?.destroy(!0,!0),this.swiper=null,this.isWidgetLoading=!0,this.isDesignLoading=!0,this.filterToggle=!0,this.reviewList=[];try{if(this.isFirstGetReviews&&(W(this,this.customJs),z(this,this.customCss??"")),await this.getWidgetOption(),await this.getReviewMeta(),await this.getReviewList(),await this.updateComplete,"indicator"!==this.designOption.paging_type)return;this.initialSwiper()}catch(e){}finally{this.isFirstGetReviews=!1,this.isWidgetLoading=!1,this.filterToggle=!1}}initialSwiper(){const e=!!this.designOption.autoplay&&{delay:1e3*this.designOption.autoplay_delay,disableOnInteraction:!1,pauseOnMouseEnter:!0,waitForTransition:!0};this.swiper=n({container:this.shadowRoot.querySelector("#sw-board-list-"+this.widgetCode),styleRoot:this.shadowRoot,options:{slidesPerView:1,slidesPerGroup:1,freeMode:{enabled:!1},allowTouchMove:this.designOption.swipe,simulateTouch:this.designOption.swipe,autoplay:e,pauseOnMouseEnter:!0,pauseOnFocus:!0,pauseOnHover:!0,pauseOnTouch:!0},event:{slideChange:e=>{const t=Math.floor((e?.realIndex??0)/this.col)+1;this.pageIndex!==t&&(this.pageIndex=t,this.filterOption.page=t,this.getReviewList())}}})}async resetWidget(){if("indicator"===this.designOption.paging_type){if(!this.swiper||0===this.reviewList.length)return;this.pageIndex=1,this.filterOption.page=1,await this.updateComplete,await this.initialWidget()}else{if(0===this.reviewList.length)return;this.pageIndex=1,this.filterOption.page=1,await this.updateComplete,await this.initialWidget()}this.setGridRows()}goToProductPage(e){pn(e)}goToReviewPage(e,t,i,r){gn({reviewId:e,option:{...this.filterOption,product_no:t},reviewIndex:i,backupList:r})}async setGridRows(){if(!this.swiper||"indicator"!==this.designOption.paging_type||"pc"!==P(this))return;await this.updateComplete;const e=this.shadowRoot.querySelector("#sw-board-list-"+this.widgetCode).querySelector(".swiper-wrapper");if(this.pageIndex===this.totalPages){const t=Math.ceil((this.totalCount-(this.pageIndex-1)*this.row*this.col)/this.col);e.style.height=515*t+40*(t-1)+"px"}else e.style.height=515*this.row+40*(this.row-1)+"px"}galleryProductCardComponent(e){return Je`
      <review-gallery-product-card
        class="board-gallery-list-widget-product-card-pc"
        @click=${()=>this.goToProductPage(e.product_no?.toString())}
        .designOption=${this.designOption}
        .productName="${e.product_name??""}"
        .productPrice="${e.price}"
        .productImageUrl="${e.detail_image??""}"
        .averageRating="${e.review_ratings_connect}"
        .reviewCount="${e.review_number_connect_count}"
      ></review-gallery-product-card>
    `}galleryProductCardMobileComponent(e){return Je`
      <div class="board-gallery-list-widget-product-info">
        <review-board-gallery-mobile-product
          @click=${()=>this.goToProductPage(e.product_no?.toString())}
          .designOption=${this.designOption}
          .productName="${e.product_name??""}"
          .productPrice="${e.price}"
          .productImageUrl="${e.detail_image??""}"
          .averageRating="${e.review_ratings_connect}"
          .reviewCount="${e.review_number_connect_count}"
        ></review-board-gallery-mobile-product>
      </div>
    `}galleryProductCardSkeletonComponent(){const e=this.isWidgetLoading?"review-skeleton":"review-skeleton-bg03";return Je`
      <div class="board-gallery-grid-product-skeleton">
        <div class="img ${e}"></div>
        <div class="info">
          <div class="name ${e}"></div>
          ${this.designOption.product_price?Je`<div class="price ${e}"></div>`:null}
          ${this.designOption.product_review||this.designOption.product_ratings?Je`<div class="review-count ${e}"></div>`:null}
        </div>
      </div>
    `}galleryReviewCardComponent(e){const t="pc"===P()?this.designOption.page_length:this.designOption.page_length_m;return Je`
      <div class="board-gallery-list-widget-review-container">
        ${e?.reviews.slice(0,t)?.map((t,i)=>Je`
              <review-gallery-review-card
                @click=${()=>this.goToReviewPage(t?.id?.toString(),e?.product_no?.toString(),i,e.reviews)}
                .designOption=${this.designOption}
                .review="${t}"
              ></review-gallery-review-card>
            `)}
      </div>
    `}galleryReviewCardMobileComponent(e){return Je` <div
      class="board-gallery-list-widget-review-container"
      style="--product-min-height: ${76*(this.designOption?.page_length_m??1)}px;"
    >
      ${e?.reviews.slice(0,this.designOption.page_length_m)?.map((t,i)=>Je`
          <div>
            <review-gallery-review-card
              @click=${()=>this.goToReviewPage(t?.id?.toString(),e?.product_no?.toString(),i,e.reviews)}
              .designOption=${this.designOption}
              .review="${t}"
            ></review-gallery-review-card>
          </div>
        `)}
    </div>`}galleryReviewCardSkeletonComponent(){const e=this.isWidgetLoading?"review-skeleton":"review-skeleton-bg03";return Je`
      <div style="display: flex; flex-direction: column; gap: 4px; width:100%">
        ${Array.from({length:this.designOption.page_length??1}).map(()=>Je`
            <div class="board-gallery-grid-card-skeleton-pc">
              <div class="content">
                <div class="content-text ${e}"></div>
                <div class="option ${e}"></div>
              </div>
              <div class="img ${e}"></div>
            </div>
            <div class="board-gallery-grid-card-skeleton-mobile ${e}"></div>
          `)}
      </div>
    `}render(){return!this.isDesignLoading&&this.isFirstGetReviews?Je`
        <div class="board-gallery-list-widget">
          <review-board-gallery-filter
            .filterOption=${this.filterOption}
          ></review-board-gallery-filter>
          <div id="sw-board-list-${this.widgetCode}" class="swiper-container">
            <div class="swiper-slide" style="display: flex; flex-direction: column;width: 100%;">
              ${Array.from({length:this.row}).map(()=>Je`
                  <div class="board-gallery-list-widget-pc">
                    ${this.galleryProductCardSkeletonComponent()}
                    ${this.galleryReviewCardSkeletonComponent()}
                  </div>

                  <div class="swiper-slide board-gallery-list-widget-mobile">
                    ${this.galleryProductCardSkeletonComponent()}
                    ${this.galleryReviewCardSkeletonComponent()}
                  </div>
                `)}
            </div>
          </div>
        </div>
      `:this.errorCode?V(this.errorCode,this.productNo,this.widgetSetCode||this.widgetCode,this.widgetCode):Je`
      <div
        class=${`board-gallery-list-widget${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`}
        id=${this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode}
        @mouseenter=${()=>this.hoverState=!0}
        @mouseleave=${()=>this.hoverState=!1}
      >
        <review-header-title
          .designOption=${this.designOption}
          .widgetCode=${this.widgetCode}
        ></review-header-title>

        <review-board-gallery-filter
          .filterOption=${this.filterOption}
          @review:sort3Change=${this.onSort3Change}
        ></review-board-gallery-filter>

        ${this.isWidgetLoading&&0===this.reviewList.length?Je`<review-loading-review></review-loading-review>`:null}

        <div
          id="sw-board-list-${this.widgetCode}"
          class="swiper-container"
          style="position: relative;"
        >
          ${"indicator"===this.designOption.paging_type&&this.designOption.navigation&&!this.isWidgetLoading&&this.reviewList.length>0?Je`
                <review-arrow-pagination-handler
                  class="board-gallery-list-widget-arrow-pagination-handler"
                  .type=${Xt}
                  .isPrevVisible=${this.pageIndex>1&&this.hoverState}
                  .isNextVisible=${this.pageIndex<this.totalPages&&this.hoverState}
                  @prevArrowClick=${this.onPrevClick}
                  @nextArrowClick=${this.onNextClick}
                ></review-arrow-pagination-handler>
              `:null}

          <div class="swiper-wrapper">
            ${("indicator"!==this.designOption.paging_type?this.reviewList.slice(0,this.pageIndex):this.reviewList).map(e=>Je`
                <div
                  class="swiper-slide"
                  style="display: flex; flex-direction: column; gap: 10px;width: 100%;row-gap:40px;"
                >
                  ${e?.slice(0,this.row)?.map(e=>Je`
                      <div class="board-gallery-list-widget-pc">
                        ${e?.product_name?this.galleryProductCardComponent(e):this.galleryProductCardSkeletonComponent()}
                        ${e?.product_name?this.galleryReviewCardComponent(e):this.galleryReviewCardSkeletonComponent()}
                      </div>

                      <div class="board-gallery-list-widget-mobile">
                        ${e?.product_name?this.galleryProductCardMobileComponent(e):this.galleryProductCardSkeletonComponent()}
                        ${e?.product_name&&0!==e?.reviews?.length?this.galleryReviewCardMobileComponent(e):this.galleryReviewCardSkeletonComponent()}
                      </div>
                    `)}
                </div>
              `)}
          </div>
        </div>
        
        ${"none"===this.designOption.paging_type||this.isDesignLoading||0===this.reviewList.length?null:Je` <review-pagination-handler
              .isDisabled=${this.isEmptyReview}
              .paginationType=${this.designOption?.paging_type===qi?this.designOption?.indicator_type:this.designOption?.paging_type}
              .currentPage=${this.pageIndex}
              .totalPages="${this.totalPages}"
              .productNo=${this.productNo}
              @paginationPrevClick=${this.onPrevClick}
              @paginationNextClick=${this.onNextClick}
              @paginationBulletClick=${this.onPaginationBulletClick}
              @moreButtonClick=${this.updateIndex}
            ></review-pagination-handler>`}
      </div>
    `}};Ln.styles=kn,Rn([i({type:Object,attribute:"data-widget-preview-data"})],Ln.prototype,"previewData",2),Rn([i({type:Object,attribute:"data-widget-preview-option"})],Ln.prototype,"previewOption",2),Rn([i({type:Object,attribute:"data-widget-preview-meta"})],Ln.prototype,"previewMeta",2),Rn([i({type:String,attribute:"data-widget-code"})],Ln.prototype,"widgetCode",2),Rn([i({type:String,attribute:"data-widget-set-code"})],Ln.prototype,"widgetSetCode",2),Rn([i({type:String,attribute:"data-product-no"})],Ln.prototype,"productNo",2),Rn([i({type:String,attribute:"data-widget-custom-class"})],Ln.prototype,"widgetCustomClass",2),Rn([i({type:String,attribute:"data-widget-custom-id"})],Ln.prototype,"widgetCustomId",2),Rn([i({type:Boolean,attribute:"data-dummy"})],Ln.prototype,"isDummy",2),Rn([i({type:String,attribute:"data-custom-class"})],Ln.prototype,"customClass",2),Rn([i({type:String,attribute:"data-custom-id"})],Ln.prototype,"customId",2),Rn([i({type:String,attribute:"data-custom-css"})],Ln.prototype,"customCss",2),Rn([i({type:String,attribute:"data-custom-js"})],Ln.prototype,"customJs",2),Rn([r()],Ln.prototype,"totalPages",2),Rn([r()],Ln.prototype,"totalCount",2),Rn([r()],Ln.prototype,"filterOption",2),Rn([r()],Ln.prototype,"row",2),Rn([r()],Ln.prototype,"col",2),Rn([r()],Ln.prototype,"designOption",2),Rn([r()],Ln.prototype,"reviews",2),Rn([r()],Ln.prototype,"isDesignLoading",2),Rn([r()],Ln.prototype,"isWidgetLoading",2),Rn([r()],Ln.prototype,"isFirstGetReviews",2),Rn([r()],Ln.prototype,"isEmptyReview",2),Rn([r()],Ln.prototype,"filterToggle",2),Rn([r()],Ln.prototype,"reviewList",2),Rn([r()],Ln.prototype,"pageIndex",2),Rn([r()],Ln.prototype,"hoverState",2),Ln=Rn([ae("review-board-gallery-list-widget")],Ln);var In=Object.defineProperty,Pn=Object.getOwnPropertyDescriptor,Tn=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Pn(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&In(t,i,s),s};let An=class extends ht{constructor(){super(...arguments),this.designOption={},this.review={},this.productImg=""}createRenderRoot(){return this}render(){return Je`
      <style>.gallery-photo-card-container { display: flex; flex-direction: column; gap: 13px; } .gallery-photo-card-container__media { width: 100%; border-radius: 8px; overflow: hidden; }</style>
      <div class="gallery-photo-card-container">
        <div class="gallery-photo-card-container__media">
          <review-review-media
            .reviewMedia=${this.review.ordered_media[0]}
            .totalPages="${this.review.media_length}"
            .socialType="${this.review.platform_display}"
            .productImg="${this.productImg}"
          ></review-review-media>
        </div>

        <review-review-info
          .review=${this.review}
          .showRatingStars=${this.designOption?.ratings}
          .showOptionName=${this.designOption?.product_option}
        ></review-review-info>
      </div>
    `}};Tn([i({type:Object})],An.prototype,"designOption",2),Tn([i({type:Object})],An.prototype,"review",2),Tn([i({type:String})],An.prototype,"productImg",2),An=Tn([ae("review-gallery-photo-card")],An);var Nn=Object.defineProperty,Dn=Object.getOwnPropertyDescriptor,Mn=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Dn(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Nn(t,i,s),s};let Wn=class extends ht{constructor(){super(...arguments),this.productName="\uae30\ubcf8 \uc0c1\ud488",this.productPrice="100",this.productImageUrl="",this.averageRating=0,this.reviewCount=0}createRenderRoot(){return this}render(){return Je`
      <style>.gallery-product-img { width: 360px; height: 438px; overflow: hidden; border-radius: 12px; } .gallery-product-img > review-review-media { width: 100%; height: 100%; object-fit: cover; display: block; } .gallery-product-img > review-review-media > .review-media-container { height: 100%; } .gallery-product-card-info { display: flex; align-items: center; gap: 12px; margin-top: 12px; } .gallery-product-card-info__thumbnail { display: none; } .gallery-product-card-info__name-price { display: flex; flex-direction: column; gap: 10px; }</style>
      <div class="gallery-product-card-container">
        <div class="gallery-product-img">
          <review-review-media
            .reviewImg="${this.productImageUrl}"
            .productImg="${this.productImageUrl}"
            .type=${"product"}
          ></review-review-media>
        </div>

        <div class="gallery-product-card-info">
          <div class="gallery-product-card-info__thumbnail">
            <review-product-thumbnail
              .productImageUrl="${this.productImageUrl}"
            ></review-product-thumbnail>
          </div>

          <div class="gallery-product-card-info__name-price">
            <review-product-name-price
              .productName="${this.productName}"
              .productPrice="${this.productPrice}"
              .fontWeight=${"700"}
              .showPrice=${this.designOption.product_price}
              .fontSizeClassLarge_name=${"alp-body13"}
              .fontSizeClassLarge_price=${"alp-body13"}
            ></review-product-name-price>

            ${this.designOption.product_ratings||this.designOption.product_review?Je`<review-product-rating-count
                  .fontWeight=${"700"}
                  .averageRating="${this.averageRating}"
                  .reviewCount="${this.reviewCount}"
                  .showReviewCount=${this.designOption.product_review}
                  .showRating=${this.designOption.product_ratings}
                ></review-product-rating-count>`:null}
          </div>
        </div>
      </div>
    `}};Mn([i({type:Object})],Wn.prototype,"designOption",2),Mn([i({type:String})],Wn.prototype,"productName",2),Mn([i({type:String})],Wn.prototype,"productPrice",2),Mn([i({type:String})],Wn.prototype,"productImageUrl",2),Mn([i({type:Number})],Wn.prototype,"averageRating",2),Mn([i({type:Number})],Wn.prototype,"reviewCount",2),Wn=Mn([ae("review-gallery-product-card")],Wn);var zn=Object.defineProperty,jn=Object.getOwnPropertyDescriptor,Vn=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?jn(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&zn(t,i,s),s};let Fn=class extends ht{createRenderRoot(){return this}render(){return Je`
      <style>.gallery-review-card { display: flex; align-items: center; gap: 15px; width: 100%; height: fit-content; padding: 14px 0; cursor: pointer; } .gallery-review-content { display: flex; flex-direction: column; gap: 5px; } .gallery-review-text-box { display: flex; align-items: center; gap: 5px; } .gallery-review-text { color: var(--alp-review-text-gray100, rgba(30, 41, 59, 0.8)); } .gallery-review-ratings-box { display: flex; align-items: center; gap: 5px; } .gallery-review-ratings { color: var(--alp-review-text-gray100, #1e293b); margin-left: -5px; } .gallery-review-product-option { overflow: hidden; color: var(--alp-review-text-gray50, rgba(30, 41, 59, 0.8)); } .gallery-review-img { min-width: 48px; max-width: 48px; min-height: 48px; max-height: 48px; object-fit: cover; margin-left: auto; border-radius: 6px; overflow: hidden; }</style>

      <div id="review_${this.review.id}" class="gallery-review-card">
        <div class="gallery-review-content">
          <div class="gallery-review-text-box">
            <div class="gallery-review-text alp-body13 alp-regular line-wrap">
              ${this.review.content}
            </div>
          </div>
          <div class="gallery-review-ratings-box">
            ${this.designOption.ratings?Je`<review-star-icon size="14"></review-star-icon>
                  <p class="gallery-review-ratings alp-body12 ">${this.review.ratings}</p>`:null}
            ${this.designOption.product_option&&(this.review.product_option||this.review.product_option_json?.[0]?.option_value)?Je`<div class="gallery-review-product-option alp-body12 alp-medium">
                  ${ns(this.review)}
                </div>`:null}
            ${this.designOption.product_option&&this.designOption.writer?Je`<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2"
                  height="8"
                  viewBox="0 0 2 8"
                  fill="none"
                >
                  <path d="M0.816406 0.5L0.816406 7.5" stroke="var(--alp-review-border-gray10)" />
                </svg>`:null}
            ${this.designOption.writer&&this.review.user_info?Je`
                  <review-user-info
                    .review="${this.review}"
                    .color=${"var(--alp-review-text-gray50)"}
                    .fontSizeClassSmall=${"alp-body12"}
                    .fontSizeClassMedium=${"alp-body12"}
                    .fontSizeClassLarge=${"alp-body12"}
                    .fontWeight="400"
                  ></review-user-info>
                `:null}
          </div>
        </div>

        
        ${this.review.media_length>0?Je`<div class="gallery-review-img">
              <review-review-media
                .reviewMedia=${this.review.ordered_media?.[0]}
                .productImg="${this.review.product?.detail_image}"
              ></review-review-media>
            </div>`:null}
      </div>
    `}};Vn([i({type:Object})],Fn.prototype,"designOption",2),Vn([i({type:Object})],Fn.prototype,"review",2),Fn=Vn([ae("review-gallery-review-card")],Fn);let Bn=class extends ht{createRenderRoot(){return this}render(){return Je`
      <style>.board-skeleton-container { display: flex; border-bottom: 0.5px solid var(--alp-review-border-gray20); } .board-skeleton-left { display: flex; flex-direction: column; min-width: 200px; max-width: 200px; margin: 28px 0; border-right: 0.5px solid var(--alp-review-border-gray20); } .board-skeleton-left-top { min-width: 36px; max-width: 36px; min-height: 36px; max-height: 36px; border-radius: 50%; } .board-skeleton-left-bottom { width: 120px; height: 20px; border-radius: 3px; margin-top: 12px; } .border-skeleton-right { display: flex; flex-direction: column; padding: 28px 24px; width: 100%; } .board-skeleton-right-top { width: 120px; height: 20px; border-radius: 3px; } .board-skeleton-right-bottom { width: 70%; height: 20px; border-radius: 3px; margin-top: 12px; } .board-skeleton-right-bottom-box { width: 100%; height: 100%; margin-top: 12px; display: flex; align-items: center; gap: 12px; } .board-skeleton-right-bottom-box-top { width: 180px; height: 180px; border-radius: 3px; } @container (max-width: 840px) { .board-skeleton-left { display: none; } .board-skeleton-right-bottom-box-top { width: 100px; height: 100px; } .border-skeleton-right { padding: 10px; } }</style>

      <div class="board-skeleton-container">
        <div class="board-skeleton-left">
          <div class="review-skeleton board-skeleton-left-top"></div>
          <div class="review-skeleton board-skeleton-left-bottom"></div>
        </div>

        <div class="border-skeleton-right">
          <div class="review-skeleton board-skeleton-right-top"></div>
          <div class="review-skeleton board-skeleton-right-bottom"></div>
          <div class="review-skeleton board-skeleton-right-bottom"></div>

          <div class="board-skeleton-right-bottom-box">
            <div class="review-skeleton board-skeleton-right-bottom-box-top"></div>
            <div class="review-skeleton board-skeleton-right-bottom-box-top"></div>
          </div>
        </div>
      </div>
    `}};Bn=((e,t)=>{for(var i,r=t,o=e.length-1;o>=0;o--)(i=e[o])&&(r=i(r)||r);return r})([ae("review-board-skeleton")],Bn);var Un=Object.defineProperty,Hn=Object.getOwnPropertyDescriptor,Gn=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Hn(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Un(t,i,s),s};let qn=class extends ht{constructor(){super(...arguments),this.productName="",this.productPrice="",this.productImageUrl="",this.averageRating=0,this.reviewCount=0}createRenderRoot(){return this}render(){return Je`
      <style>.board-gallery-mobile-product-container { display: flex; gap: 14px; padding: 18px 0; } .board-gallery-mobile-product-container img { min-width: 62px; min-height: 62px; max-width: 62px; max-height: 62px; object-fit: cover; border-radius: 50%; } .board-gallery-mobile-product-info { display: flex; flex-direction: column; gap: 3px; } .price { color: var(--alp-review-text-gray40); } .board-gallery-mobile-product-rating { display: flex; align-items: center; margin-top: auto; gap: 1px; } .board-gallery-mobile-product-rating > svg { margin: 0 4px; }</style>

      <div
        class="board-gallery-mobile-product-container"
        style="align-items: ${this.designOption.product_ratings||this.designOption.product_review||this.designOption.product_price?"normal":"center"}"
      >
        <img src="${this.productImageUrl}" alt="${this.productName}" />

        <div class="board-gallery-mobile-product-info">
          <p class="name alp-body14 alp-bold">${this.productName}</p>
          ${this.designOption.product_price?Je`<p class="price alp-body13 alp-medium">
                ${Number(this.productPrice).toLocaleString()}ì
              </p>`:null}
          ${this.designOption.product_ratings||this.designOption.product_review||this.designOption.product_price?Je` <div class="board-gallery-mobile-product-rating">
                ${this.designOption.product_ratings?Je` <review-star-icon .size=${15} .rating=${1}></review-star-icon>
                      <p class="review-count alp-body12 alp-bold">
                        ${this.averageRating?.toFixed(1)}
                      </p>`:null}
                ${this.designOption.product_ratings&&this.designOption.product_review?Je`<svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2"
                      height="7"
                      viewBox="0 0 2 7"
                      fill="none"
                    >
                      <path d="M1.42969 0L1.42969 7" stroke="#1E293B" stroke-opacity="0.1" />
                    </svg>`:null}
                ${this.designOption.product_review?Je`<p class="review-count-text alp-body12">${this.reviewCount}ê°</p>`:null}
              </div>`:null}
        </div>
      </div>
    `}};Gn([i({type:Object})],qn.prototype,"designOption",2),Gn([i({type:String})],qn.prototype,"productName",2),Gn([i({type:String})],qn.prototype,"productPrice",2),Gn([i({type:String})],qn.prototype,"productImageUrl",2),Gn([i({type:Number})],qn.prototype,"averageRating",2),Gn([i({type:Number})],qn.prototype,"reviewCount",2),qn=Gn([ae("review-board-gallery-mobile-product")],qn);var Yn=Object.defineProperty,Kn=Object.getOwnPropertyDescriptor,Zn=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Kn(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Yn(t,i,s),s};let Jn=class extends ht{constructor(){super(...arguments),this.currentSort=tr.RECENT_REVIEW_COUNT,this.isOpen=!1,this.openSortOption=e=>{e.stopPropagation(),this.isOpen=!this.isOpen},this.onDocumentClick=e=>{this.isOpen&&e.target&&(this.isOpen=!1)},this.selectSortOptionMobile=e=>{this.currentSort=e,this.isOpen=!1,this.dispatchEvent(new CustomEvent("review:sort3Change",{bubbles:!0,composed:!0,detail:{sort3:e}}))},this.selectSortOption=e=>{this.currentSort=e,this.dispatchEvent(new CustomEvent("review:sort3Change",{bubbles:!0,composed:!0,detail:{sort3:e}}))},this.sortDisplayMap={[tr.RECENT_REVIEW_COUNT]:si.WIDGETS.BOARD_GALLERY.FILTER.RECENT_REVIEW_COUNT,[tr.REVIEW_COUNT]:si.WIDGETS.BOARD_GALLERY.FILTER.REVIEW_COUNT,[tr.REVIEW_RATING]:si.WIDGETS.BOARD_GALLERY.FILTER.REVIEW_RATING,[tr.PRODUCT_NAME]:si.WIDGETS.BOARD_GALLERY.FILTER.PRODUCT_NAME,[tr.RECENT_REVIEW]:si.WIDGETS.BOARD_GALLERY.FILTER.RECENT_REVIEW,[tr.RECENT_PRODUCT]:si.WIDGETS.BOARD_GALLERY.FILTER.RECENT_PRODUCT,[tr.RECENT_SALES]:si.WIDGETS.BOARD_GALLERY.FILTER.RECENT_SALES}}createRenderRoot(){return this}firstUpdated(e){super.firstUpdated(e),document.addEventListener("click",this.onDocumentClick)}disconnectedCallback(){document.removeEventListener("click",this.onDocumentClick),super.disconnectedCallback()}updated(e){e.has("filterOption")&&(this.currentSort=this.filterOption.sort3??tr.RECENT_REVIEW_COUNT)}render(){const e=Object.entries(tr).map(([e,t])=>({key:e,value:t,label:this.sortDisplayMap[t]||t})),t=this.sortDisplayMap[this.currentSort]||this.currentSort;return Je`
      <style>.filter-sort-container { padding: 52px 0; display: flex; align-items: center; justify-content: center; color: var(--alp-review-text-gray50); cursor: pointer; gap: 6px; } .filter-sort-container > p { color: var(--alp-review-text-gray50); } .filter-sort-container > p:hover { color: var(--alp-review-text-gray80); } .filter-sort-container .is-active { font-weight: 600; color: var(--alp-review-text-gray100); } .filter-sort-container-mobile { display: none; } @container (max-width: 840px) { .filter-sort-container { display: none; } .filter-sort-container-mobile { position: relative; display: flex; align-items: center; width: fit-content; padding: 10px 12px 10px 16px; border-radius: 8px; margin: 14px 0; } .filter-sort-container-mobile:hover { background: var(--alp-review-card-gray03, rgba(30, 41, 59, 0.03)); cursor: pointer; } .filter-sort-option { position: absolute; top: calc(100% + 10px); left: 0; z-index: 100; display: flex; padding: 8px; flex-direction: column; gap: 4px; width: 180px; background: var(--alp-review-bg-white, #fff); border-radius: 14px; border: 1px solid var(--alp-review-border-gray30, rgba(30, 41, 59, 0.3)); box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.09); } .filter-sort-option > div { display: flex; padding: 10px 14px; align-items: center; gap: 8px; align-self: stretch; border-radius: 8px; background: var(--alp-review-bg-white, #fff); color: var(--alp-review-text-gray80); } .filter-sort-option > div:hover { background: var(--alp-review-card-gray05, rgba(30, 41, 59, 0.05)); } .filter-sort-option > div.is-active { background: var(--alp-review-card-gray05, rgba(30, 41, 59, 0.05)); color: var(--alp-review-text-gray100); } }</style>

      <div class="filter-sort-container">
        ${e.map((e,t)=>Je` ${0!==t?Je` <review-custom-icon
                    width="10"
                    height="10"
                    color="var(--alp-review-text-gray50)"
                    .type=${Nt}
                  ></review-custom-icon>`:null}
              <p
                class="alp-body16 ${this.currentSort===e.value?"is-active":""}"
                @click=${t=>{t.stopPropagation(),this.selectSortOption(e.value)}}
              >
                ${e.label}
              </p>`)}
      </div>

      <div
        class="alp-body15 alp-semi-bold filter-sort-container-mobile"
        @click=${this.openSortOption}
      >
        ${t}

        <review-custom-icon
          width="24"
          height="24"
          color="var(--alp-review-text-gray50)"
          type="drop-down"
        ></review-custom-icon>

        ${this.isOpen?Je`<div class="filter-sort-option" @click=${e=>e.stopPropagation()}>
              ${e.map(e=>Je`<div
                    class="alp-body16 alp-semi-bold ${this.currentSort===e.value?"is-active":""}"
                    @click=${t=>{t.stopPropagation(),this.selectSortOptionMobile(e.value)}}
                  >
                    ${e.label}
                  </div>`)}
            </div>`:null}
      </div>
    `}};Zn([i({type:Object})],Jn.prototype,"filterOption",2),Zn([r()],Jn.prototype,"currentSort",2),Zn([r()],Jn.prototype,"isOpen",2),Jn=Zn([ae("review-board-gallery-filter")],Jn);var Qn=Object.defineProperty,Xn=Object.getOwnPropertyDescriptor,ea=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Xn(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Qn(t,i,s),s};let ta=class extends ht{constructor(){super(),this.totalPage=0,this.isOpenComment=!1,this.mallId="\uace0\uac1d\ub2d8\uaed8",this.optionText="\uc635\uc158\uba85",this.commentTagText="\uc62c\ub9bc",this.optionText=si.WIDGETS.BOARD.OPTION,this.commentTagText=si.WIDGETS.BOARD.COMMENT_TAG}createRenderRoot(){return this}async firstUpdated(e){super.firstUpdated(e),"all"===this.productNumber&&(this.productNumber=this.review.product?.product_no?.toString()??"all");const{mall_id:t}=await m();this.mallId=t,this.isOpenComment=this.designOption.comment_expand}toggleComment(){this.isOpenComment=!this.isOpenComment}openDetailPopup(){gn({reviewId:this.review?.id?.toString(),option:this.filterOption,reviewIndex:this.index,backupList:this.reviewList})}routeProductPage(){this.review.product?.product_no&&"all"!==this.review.product?.product_no?.toString()&&pn(this.review.product?.product_no?.toString()??"all")}render(){const e="thumbnail"===this.designOption.photo_size?"1fr 1fr 1fr 1fr":"1fr 1fr 1fr",t=Je`
      ${this.review.ordered_media.slice(0,"thumbnail"===this.designOption.photo_size?4:6).map(e=>Je`<review-review-media
              .reviewMedia=${e}
              .productImg="${this.review.product?.detail_image}"
              @click=${this.openDetailPopup}
            ></review-review-media>`)}
    `,i=(this.review.keyword?.length??0)>0?Je`<div class="board-card-review__keyword-box">
            ${Je`${this.review.keyword?.map(e=>Je`<review-keyword-label
                  .keyword="${e.description}"
                  .emoji="${e.icon_name}"
                ></review-keyword-label>`)} `}
          </div>`:null,r=(this.review.badge?.length??0)>0?Je`<div class="board-card-review__badge-box">
            ${Je`${this.review.badge?.map(e=>Je`<review-badge
                  .label="${e.badge_name}"
                  .bgColor="${e.design_background}"
                  .borderColor="${e.design_border}"
                  .color="${e.design_color}"
                  .fontSizeClassLarge=${"alp-body12"}
                ></review-badge>`)} `}
          </div>`:null,o=this.designOption.ratings?Je`<div class="board-card-review-ratings">
          ${Array.from({length:this.review.ratings},()=>Je`<review-star-icon size="22"></review-star-icon>`)}
        </div>`:null,s=this.designOption.writer||this.designOption.platform_showing||this.review.is_verified?Je` <div class="board-card-user-info-pc">
            ${this.designOption.platform_showing||this.designOption.writer?Je` <review-user-info
                  style="max-width: ${(()=>{let e=190;return this.review.is_verified&&(e-=77),e+"px"})()};"
                  .isPlatformShowing=${this.designOption.platform_showing}
                  .isWriter=${this.designOption.writer}
                  .sizeType=${"large"}
                  .review=${this.review}
                  .designOption=${this.designOption}
                ></review-user-info>`:null}
            ${this.review.is_verified?Je` <review-badge
                  .type=${"verified"}
                  .fontSizeClassSmall=${"alp-caption10"}
                  .fontSizeClassLarge=${"alp-body12"}
                ></review-badge>`:null}
          </div>`:null,n=this.designOption.writer||this.designOption.platform_showing?Je`<div style="display: flex; align-items: center;">
            <review-user-info
              .sizeType=${"small"}
              .color=${"var(--alp-review-text-gray80)"}
              .review=${this.review}
              .designOption=${this.designOption}
              .fontSizeClassSmall=${"alp-body14"}
              .fontSizeClassMedium=${"alp-body14"}
              .fontSizeClassLarge=${"alp-body13"}
              .fontWeight=${"500"}
              .otherText=${this.designOption.create_at?"\ub2d8\uc774":""}
            ></review-user-info>
          </div>`:null,a=this.designOption.survey&&(this.review.survey?.length??0)>0?Je`<review-survey-answer .surveyAnswer=${this.review.survey}></review-survey-answer>`:null,p=this.designOption.survey&&(this.review.survey?.length??0)>0?Je`<review-survey-answer
            .surveyAnswer=${this.review.survey}
            type="row"
          ></review-survey-answer>`:null,l=this.designOption.create_at?Je`<review-at-date
          .createDate=${this.review.created_at}
          .color=${"var(--alp-review-text-gray80)"}
          .fontSizeClassSmall=${"alp-body14"}
          .fontSizeClassMedium=${"alp-body14"}
          .fontSizeClassLarge=${"alp-body13"}
          .fontWeight=${"500"}
        ></review-at-date>`:null,d=ns(this.review);return Je`
      <style>.board-card-container { display: grid; gap: 24px; width: 100%; padding: 32px 0; border-bottom: 0.5px solid var(--alp-review-border-gray20, rgba(30, 41, 59, 0.2)); } .board-card-user-info { display: flex; flex-direction: column; gap: 10px; min-width: 200px; max-width: 200px; border-right: 1px solid rgba(30, 41, 59, 0.1); } .board-card-review { display: flex; flex-direction: column; } .board-card-review-ratings { display: flex; align-items: center; } .board-card-review__star-box { display: flex; align-items: center; margin-bottom: 10px; gap: 20px; } .board-card-review__badge-box { display: flex; align-items: center; gap: 5px; } .board-card-review__badge-box-mobile { display: none; } .board-card-review__product { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; border-left: 3px solid var(--alp-review-icon-gray20, rgba(30, 41, 59, 0.2)); cursor: pointer; img { min-width: 40px; min-height: 40px; max-width: 40px; max-height: 40px; object-fit: cover; border-radius: 50%; } .review-product-title { color: var(--alp-review-text-gray80, rgba(30, 41, 59, 1)); } .review-product-title { font-size: inherit; } > div { display: flex; flex-direction: column; gap: 3px; } } html[data-theme="dark"] .board-card-review__product { background-color: var(--alp-review-card-gray07) !important; border-left: 3px solid var(--alp-review-icon-gray60, rgba(30, 41, 59, 0.2)); } .board-card-user-info-pc { display: flex; align-items: center; gap: 10px; } .board-card-review__media-pc { display: grid; gap: 4px; grid-template-columns: var(--board-photo-size); margin-bottom: 32px; position: relative; } .board-card-review__media-mo { display: none; margin-bottom: 18px; position: relative; } .board-card-review__media-pc, .board-card-review__media-mo { review-review-media { cursor: pointer; } } .media-more { position: absolute; bottom: 8px; right: 6px; color: white; padding: 2px 8px; background: var(---alp-review-scrim-black100, rgba(0, 0, 0)); color: #fff; } .board-card-review__keyword-box { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 32px; } review-review-content { margin-bottom: 18px; } .board-card-review__button-box { display: flex; align-items: center; margin-left: -14px; review-like-button { margin-right: auto; } } .board-card-user-info-mobile { display: none; } .board-card-review__comment { display: flex; flex-direction: column; gap: 14px; margin-top: 10px; padding: 24px 0px; border-top: solid 1px var(--alp-review-border-gray10, rgba(30, 41, 59, 0.2)); p { color: var(--alp-review-text-gray80, rgba(30, 41, 59, 0.5)); white-space: pre-line; } p:nth-child(2) { color: var(--alp-review-text-gray50, rgba(30, 41, 59, 0.5)); } } .review-option-title { color: var(--alp-review-text-gray50, rgba(30, 41, 59, 0.5)); span { font-size: inherit; } } @container (max-width: 840px) { .board-card-container { display: flex; padding-bottom: 24px; } .board-card-user-info { display: none; } .board-card-review { width: 100%; } .board-card-review__media-pc { display: none; } .board-card-review__media-mo { display: grid; grid-template-columns: var(--board-photo-size); gap: 3px; } .board-card-review__star-box { display: none; } .board-card-review__product { padding-left: 18px !important; } .board-card-review__badge-box-mobile { display: block; } .board-card-review__badge-box { margin-bottom: 16px; margin-left: 0; } .board-card-user-info-mobile { display: block; margin-bottom: 14px; } .board-card-user-info-mobile__inner { display: flex; flex-direction: column; gap: 3px; } .board-card-user-info-mobile__inner__star-box { display: flex; align-items: center; justify-content: space-between; gap: 10px; } .board-card-user-info-mobile__inner__user-box { display: flex; align-items: center; gap: 4px; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } } @container (max-width: 480px) { .board-card-user-info-mobile__inner { gap: 6px; } .board-card-user-info-mobile__inner__star-box { flex-direction: column; align-items: flex-start; gap: 10px; } .board-card-review__product { padding-left: 14px !important; margin-bottom: 20px; } .board-card-user-info-mobile__inner__user-box { padding-top: 3px; } .board-card-review__badge-box { margin-bottom: 20px; } .board-card-user-info-mobile { margin-bottom: 28px; } .review-product-title, .review-option-title { font-size: 14px !important; } }</style>
      <div
        class="board-card-container"
        style="grid-template-columns: ${this.designOption.writer||this.review.is_verified||this.designOption.survey&&(this.review.survey?.length??0)>0||this.designOption.create_at?"200px":""} 1fr;"
      >
        
        <div class="board-card-user-info">${s} ${a} ${l}</div>

        
        <div class="board-card-review">
          ${this.designOption.ratings||(this.review.badge?.length??0)>0?Je` <div class="board-card-review__star-box">${o} ${r}</div> `:""}

          <div class="board-card-user-info-mobile">
            <div class="board-card-user-info-mobile__inner">
              <div class="board-card-user-info-mobile__inner__star-box">
                ${o}
                <div class="board-card-user-info-mobile__inner__user-box">
                  ${n} ${l}
                  ${this.review.is_verified?Je`
                        <review-badge
                          .type=${"verified"}
                          .fontSizeClassSmall=${"alp-caption10"}
                          .fontSizeClassLarge=${"alp-body12"}
                        ></review-badge>
                      `:null}
                </div>
              </div>
              ${p}
            </div>
          </div>

          ${this.designOption.product_info||this.designOption.product_option&&(this.review.product_option_json?.length>0||this.review.product_option)?Je`<div
                @click=${this.routeProductPage}
                class="board-card-review__product"
                style="padding: ${this.designOption.product_info?"16px":"8px"} 16px;
                  background-color:${this.designOption.product_info?"var(--alp-review-card-gray03, rgba(30, 41, 59, 0.05))":"transparent"}"
              >
                ${this.designOption.product_info?Je`<img
                      src="${this.review.product?.tiny_image||this.review.product?.detail_image}"
                      alt="product image"
                      onerror="this.onerror=null;this.src='${te}/review-widget/empty-product-svg.svg';"
                    />`:null}
                <div>
                  ${this.designOption.product_info?Je`
                        <p class="review-product-title alp-body14 alp-medium">
                          ${this.review.product?.product_name}
                        </p>
                      `:null}
                  ${this.designOption.product_option&&(this.review.product_option_json?.length>0||this.review.product_option)?Je`
                        <p class="review-option-title alp-body13 alp-line13">
                          <span>${this.optionText} : </span>
                          ${d}
                        </p>
                      `:null}
                </div>
              </div>`:null}

          <div class="board-card-review__badge-box-mobile">${r}</div>

          <review-review-content
            .reviewContent=${this.review.content}
            .lineWrap=${this.designOption.content_except}
            .isOpen=${this.designOption.board_expand_length>=this.index-(this.filterOption.page-1)*this.filterOption.page_size+1}
          ></review-review-content>
          ${this.review.ordered_media.length>0?Je`
                <div class="board-card-review__media-pc" style="--board-photo-size: ${e};">
                  ${t}
                  ${this.review.ordered_media.length>("thumbnail"===this.designOption.photo_size?4:6)?Je` <div class="media-more alp-medium">
                        +${this.review.ordered_media.length-("thumbnail"===this.designOption.photo_size?4:6)}
                      </div>`:null}
                </div>
                <div class="board-card-review__media-mo" style="--board-photo-size: ${e};">
                  ${t}
                  ${this.review.ordered_media.length>("thumbnail"===this.designOption.photo_size?4:6)?Je` <div class="media-more alp-medium">
                        +${this.review.ordered_media.length-("thumbnail"===this.designOption.photo_size?4:6)}
                      </div>`:null}
                </div>
              `:""}
          ${(this.review.keyword?.length??0)>0?Je`${i}`:""}

          <div class="board-card-review__button-box">
            ${this.designOption.like?Je` <review-like-button
                  .showLike=${this.designOption.like}
                  .reviewId=${this.review.id}
                  .productNo=${this.review.product?.product_no}
                  .likeCount=${this.review.like_count}
                ></review-like-button>`:null}
            ${this.designOption.comment?Je` <review-comment-button
                  .commentCount=${this.review.comment?.length??0}
                  .isOpen=${this.isOpenComment}
                  @click=${this.toggleComment}
                ></review-comment-button>`:null}

            <review-report-button .reviewId=${this.review.id}></review-report-button>
          </div>

          ${this.designOption.comment&&this.isOpenComment&&(this.review.comment?.length??0)>0?Je`
                <div class="board-card-review__comment">
                  ${Je`<p class="alp-body14 alp-line14">${this.review.comment?.[0]?.content}</p>`}
                  <p class="alp-body14">
                    ${this.review.comment?.[0]?.writer} ${this.commentTagText}
                  </p>
                </div>
              `:null}
        </div>
      </div>
    `}};ea([i({type:Object})],ta.prototype,"review",2),ea([i({type:Object})],ta.prototype,"reviewList",2),ea([i({type:String})],ta.prototype,"productNumber",2),ea([i({type:Object})],ta.prototype,"designOption",2),ea([i({type:Number})],ta.prototype,"totalPage",2),ea([i({type:Object})],ta.prototype,"filterOption",2),ea([i({type:String})],ta.prototype,"widgetCode",2),ea([i({type:Number})],ta.prototype,"index",2),ea([r()],ta.prototype,"isOpenComment",2),ta=ea([ae("review-board-card")],ta);var ia=Object.defineProperty,ra=Object.getOwnPropertyDescriptor,oa=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ra(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ia(t,i,s),s};let sa=class extends ht{constructor(){super(),this.widgetCode="",this.totalCount=0,this.filterOption={page:1,page_size:10,sort:Zi,media_only:!1,product_no:"all",search:"",widget_code:"",ratings:void 0,surveys:void 0,device:"w"},this.isLoading=!1,this.isDisabled=!1,this.reviewList=[],this.isOnlyMedia=!1,this.showSortOption=!1,this.sortType=void 0,this.surveyFilter="",this.ratingFilter=[],this.search="",this.surveyFilterList=[],this.isSearchFocus=!1,this.sortList=[{type:Qi,label:"\ucd94\ucc9c\uc21c"},{type:Zi,label:"\ucd5c\uc2e0\uc21c"},{type:Ji,label:"\ubcc4\uc810 \ub192\uc740\uc21c"}],this.sortKeyValue={[Qi]:"\ucd94\ucc9c\uc21c",[Zi]:"\ucd5c\uc2e0\uc21c",[Ji]:"\ubcc4\uc810 \ub192\uc740\uc21c"},this.onChangeFilterOption=(e,t)=>{this.dispatchEvent(new CustomEvent("review:filterChange",{bubbles:!0,composed:!0,detail:{type:e,value:t}}))},this.resetFilter=()=>{this.dispatchEvent(new CustomEvent("review:resetFilter",{bubbles:!0,composed:!0}))},this.toggleOnlyMedia=()=>{this.isOnlyMedia=!this.isOnlyMedia,this.onChangeFilterOption("media_only",this.isOnlyMedia)},this.toggleSortType=e=>{this.sortType!==e&&(this.sortType=e,this.onChangeFilterOption("sort",this.sortType))},this.onSearch=e=>{this.search=e.target.value},this.onChangeRatingFilter=e=>{const{list:t}=e.detail;this.ratingFilter=t,this.onChangeFilterOption("ratings",t)},this.onChangeSurveyFilter=e=>{const{list:t,option:i}=e.detail,r=""!==this.surveyFilter?JSON.parse(this.surveyFilter):{};r[i.survey_question_label]=t,Object.entries(r).forEach(([e,t])=>{0===t.length&&delete r[e]}),this.surveyFilter=JSON.stringify(r),this.onChangeFilterOption("surveys",this.surveyFilter)},this.toggleShowSortOption=()=>{this.showSortOption=!this.showSortOption,this.showSortOption?(this._onOutsideClick=e=>{const t=e.composedPath?.()||[],i=t.includes(this.querySelector(".board-filter-btn-mobile")),r=t.includes(this.querySelector(".board-filter-btn-mobile__option"));i||r||(this.showSortOption=!1,this._onOutsideClick&&(window.removeEventListener("click",this._onOutsideClick,{capture:!0}),this._onOutsideClick=void 0))},window.addEventListener("click",this._onOutsideClick,{capture:!0})):this._onOutsideClick&&(window.removeEventListener("click",this._onOutsideClick,{capture:!0}),this._onOutsideClick=void 0)},this.writeButtonText=si.WIDGETS.BOARD.WRITE_REVIEW,this.resetText=si.WIDGETS.BOARD.RESET,this.mediaButtonLabel=si.WIDGETS.BOARD.PHOTOS_VIDEOS,this.searchPlaceholder=si.WIDGETS.BOARD.SEARCH_PLACEHOLDER,this.sortOptions=[{label:si.WIDGETS.BOARD.SORT_NEWEST,value:"date"},{label:si.WIDGETS.BOARD.SORT_HIGHEST_RATING,value:"high-rating"},{label:si.WIDGETS.BOARD.SORT_LOWEST_RATING,value:"low-rating"}],this.sortKeyValue={[Qi]:oi()?"Newest":"\ucd94\ucc9c\uc21c",[Zi]:oi()?"Latest":"\ucd5c\uc2e0\uc21c",[Ji]:oi()?"Rating":"\ubcc4\uc810 \ub192\uc740\uc21c"},this.sortList=[{type:Qi,label:oi()?"Newest":"\ucd94\ucc9c\uc21c"},{type:Zi,label:oi()?"Latest":"\ucd5c\uc2e0\uc21c"},{type:Ji,label:oi()?"Rating":"\ubcc4\uc810 \ub192\uc740\uc21c"}]}createRenderRoot(){return this}async firstUpdated(e){super.firstUpdated(e),!window?.ALPHA_REVIEW_EMERGENCY&&await this.getSurveyFilters(),this.sortType=this.filterOption.sort,this.isOnlyMedia=this.filterOption.media_only,this.search=this.filterOption.search??"",this.ratingFilter=this.filterOption.ratings,this.surveyFilter=this.filterOption.surveys??"",window?.CUSTOM_SWIPER?.swiper?this.initialSwiper():await p(()=>this.initialSwiper())}disconnectedCallback(){super.disconnectedCallback(),this._onOutsideClick&&(window.removeEventListener("click",this._onOutsideClick,{capture:!0}),this._onOutsideClick=void 0),this.swiper?.destroy(!0,!0)}async getSurveyFilters(){const e=await async function(e){return await or.get("/v2/api-widget/survey-filters",{query:{widget_code:e}})}(this.widgetCode);this.surveyFilterList=e}get reviewCountLabel(){const e=this.totalCount??0;return"en"===window.ALPHA_REVIEW_LOCAL?e.toLocaleString()+" Review"+(e<=1?"":"s"):"\ub9ac\ubdf0 "+e.toLocaleString()}initialSwiper(){this.swiper=n({container:this.querySelector("#sw-board-filter-"+this.widgetCode),styleRoot:this,options:{freeMode:{enabled:!1},loop:!1,slidesPerView:"auto",spaceBetween:6}})}lineSvgComponent(){return Je`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="2"
      height="14"
      viewBox="0 0 2 14"
      fill="none"
    >
      <path d="M1.05469 0V14" stroke="#1E293B" stroke-opacity="0.1" stroke-width="1.5" />
    </svg>`}render(){const e=this.surveyFilterList?.length>0||this.designOption.use_board_filter,t=0!==(this.ratingFilter?.length??0)||0!==(this.surveyFilter?.length??0);return Je`
      <style>.board-filter-container { display: flex; flex-direction: column; width: 100%; } .board-filter-container .board-filter-row:nth-child(3) { padding: 11px 0; } .board-filter-row { display: flex; align-items: center; min-height: 53px; padding: 5px 0; border-bottom: 0.5px solid var(--alp-review-border-gray20, rgba(30, 41, 59, 0.2)); } .board-filter-row .swiper-container { width: 100%; overflow: hidden; } .board-filter-row .swiper-slide { width: fit-content !important; } .board-filter-row:nth-of-type(1) { gap: 3px; } .board-filter-row:nth-of-type(2) { flex: 0 0 auto; } .board-filter-btn { color: var(--alp-review-text-gray50); cursor: pointer; padding: 7px 8px; } .board-filter-btn:nth-of-type(1) { display: flex; align-items: center; margin-right: auto; flex: 0 0 auto; } .board-filter-btn:nth-of-type(2) { display: flex; align-items: center; gap: 18px; margin-right: 10px; flex: 0 0 auto; } .search-filter { display: flex; align-items: center; gap: 10px; margin-left: 16px; } .search-filter > input { border: none; width: 60px; background: transparent; color: var(--alp-review-text-gray50); } .search-filter > input:focus-within { outline: none; } .search-filter > input:active { outline: none; } .search-filter > input::placeholder { font-size: clamp(15px, calc(var(--alp-common-rem) * var(--alp-pc-em) * 1px), 100px); color: var(--alp-review-text-gray50); } .search-focus { border-radius: 4px; background: rgba(30, 41, 59, 0.03); width: 100%; flex: 1 1 auto; max-width: 500px; } .search-focus > input { width: 100% !important; } .media-filter-btn { color: var(--alp-review-text-gray100) !important; font-weight: 600 !important; transition: opacity 0.2s ease-in-out !important; margin-right: auto; } .media-filter-btn:hover { opacity: 0.78 !important; } .filter-btn-active { color: var(--alp-review-text-gray100) !important; font-weight: 600 !important; } .media-filter-active { color: var(--alp-common-color) !important; font-weight: 600 !important; } .board-filter-btn-mobile { display: none; } .reset-filter-btn { display: flex; height: 50px; padding: 8px 12px 8px 8px; justify-content: center; align-items: center; gap: 8px; border-radius: 6px; background: var(--alp-review-card-gray05, rgba(30, 41, 59, 0.05)); cursor: pointer; } @container (max-width: ${Kt}) { .board-filter-btn:nth-of-type(2) { display: none; } .search-filter > input::placeholder { font-size: clamp(12px, calc(var(--alp-common-rem) * var(--alp-tablet-em) * 1px), 100px); color: var(--alp-review-text-gray50); } .board-filter-btn-mobile { display: flex; align-items: center; margin-right: 10px; color: var(--alp-review-text-gray50); cursor: pointer; position: relative; flex: 0 0 auto; margin-left: 10px; } .board-filter-btn-mobile__option { position: absolute; top: calc(100% + 16px); left: -20px; display: flex; padding: 8px; flex-direction: column; gap: 4px; z-index: 99; width: 200px; background: var(--alp-review-bg-white, #fff); border-radius: 14px; border: 1px solid var(--alp-review-border-gray30, rgba(30, 41, 59, 0.3)); box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.09); } .board-filter-btn-mobile__option > div { cursor: pointer; padding: 10px 14px; border-radius: 8px; background: var(--alp-review-bg-white, #fff); color: var(--alp-review-text-gray60); } .board-filter-btn-mobile__option > div:hover { background: var(--alp-review-card-gray03, rgba(30, 41, 59, 0.05)); } .board-filter-btn-mobile__option > div.mobile-active { background: var(--alp-review-card-gray05, rgba(30, 41, 59, 0.05)); color: var(--alp-review-text-gray100); } .board-filter-btn input { font-size: 15px !important; } .board-filter-btn input::placeholder { font-size: 14px !important; } @container (max-width: 480px) { .board-filter-btn-mobile > div { font-size: 15px !important; } .media-filter-btn { padding: 0px !important; } .board-filter-btn { font-size: 15px !important; } .board-filter-btn input { font-size: 15px !important; } .board-filter-btn input::placeholder { font-size: 14px !important; } } }</style>

      <div class="board-filter-container ${this.isDisabled?"review-disabled":""}">
        ${this.designOption.review_count?Je` <div class="board-filter-row">
              <p class="alp-body18 alp-bold">${this.reviewCountLabel}</p>
            </div>`:null}

        <div
          class="board-filter-row"
          style="
          ${this.designOption.review_count?"":"border-top: 0.5px solid var(--alp-review-border-gray20, rgba(30, 41, 59, 0.2));"}
          "
        >
          <div
            class="board-filter-btn alp-body14 alp-bold media-filter-btn ${this.isOnlyMedia?"media-filter-active":""} "
            @click=${this.toggleOnlyMedia}
          >
            <review-custom-icon
              width="21"
              height="20"
              color="${this.isOnlyMedia?"var(--alp-common-color)":"var(--alp-review-text-gray100)"}"
              type="image-and-video"
            ></review-custom-icon>
            ${this.mediaButtonLabel}
          </div>

          ${this.designOption.use_sort?Je` 
                <div class="board-filter-btn">
                  ${this.sortList.map(e=>Je`<div
                      class="alp-body14 ${this.sortType===e.type?"filter-btn-active":""}"
                      @click=${()=>this.toggleSortType(e.type)}
                    >
                      ${e.label}
                    </div>`)}
                </div>

                
                <div class="board-filter-btn-mobile" @click=${this.toggleShowSortOption}>
                  <div class="alp-body14">${this.sortKeyValue[this.sortType??"-created_at"]}</div>
                  <review-custom-icon
                    width="24"
                    height="24"
                    color="var(--alp-review-text-gray50)"
                    type="drop-down"
                  ></review-custom-icon>

                  ${this.showSortOption?Je`<div class="board-filter-btn-mobile__option">
                        ${this.sortList.map(e=>Je`<div
                            class="alp-body16 alp-semi-bold ${this.sortType===e.type?"mobile-active":""}"
                            @click=${()=>this.toggleSortType(e.type)}
                          >
                            ${e.label}
                          </div>`)}
                      </div>`:null}
                </div>`:null}
          ${this.designOption.use_search&&this.designOption.use_sort?this.lineSvgComponent():null}
          ${this.designOption.use_search?Je` <div
                class="board-filter-btn search-filter ${this.isSearchFocus?"search-focus":""}"
                @focusin=${()=>this.isSearchFocus=!0}
                @focusout=${()=>!this.search&&(this.isSearchFocus=!1)}
              >
                <input
                  placeholder="${this.searchPlaceholder}"
                  .value=${this.search}
                  @input=${this.onSearch}
                  @keydown=${e=>{"Enter"===e.key&&this.onChangeFilterOption("search",this.search)}}
                />
                ${this.isSearchFocus?Je`<svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      @click=${()=>{this.search="",this.isSearchFocus=!1}}
                    >
                      <path
                        d="M9.75 0C15.1348 0 19.5 4.36522 19.5 9.75C19.5 15.1348 15.1348 19.5 9.75 19.5C4.36522 19.5 0 15.1348 0 9.75C0 4.36522 4.36522 0 9.75 0ZM14.0166 5.4834C13.5667 5.03354 12.8376 5.03354 12.3877 5.4834L9.75 8.12109L7.1123 5.4834C6.66244 5.03354 5.93326 5.03354 5.4834 5.4834C5.03354 5.93326 5.03354 6.66244 5.4834 7.1123L8.12109 9.75L5.4834 12.3877C5.03354 12.8376 5.03354 13.5667 5.4834 14.0166C5.93326 14.4665 6.66244 14.4665 7.1123 14.0166L9.75 11.3789L12.3877 14.0166C12.8376 14.4665 13.5667 14.4665 14.0166 14.0166C14.4665 13.5667 14.4665 12.8376 14.0166 12.3877L11.3789 9.75L14.0166 7.1123C14.4665 6.66244 14.4665 5.93326 14.0166 5.4834Z"
                        fill="#1E293B"
                        fill-opacity="0.2"
                      />
                    </svg>`:null}
                <review-custom-icon
                  @click=${()=>this.onChangeFilterOption("search",this.search)}
                  width="21"
                  height="20"
                  color="var(--alp-review-text-gray50)"
                  type="search"
                ></review-custom-icon>
              </div>`:null}
        </div>

        
        ${e&&!window?.ALPHA_REVIEW_EMERGENCY?Je`
              <div
                class="board-filter-row"
                style="${t?"border-bottom: none;":""}"
              >
                <div id="sw-board-filter-${this.widgetCode}" class="swiper-container">
                  <div class="swiper-wrapper">
                    ${this.designOption.use_board_filter?Je`
                          <review-selector-input
                            .type=${"rating"}
                            @alp-selector-change=${this.onChangeRatingFilter}
                            class="swiper-slide"
                            attachTagName="review-selector-card"
                          ></review-selector-input>
                        `:null}
                    ${this.designOption.survey_filter&&this.surveyFilterList.map(e=>Je`<review-selector-input
                          .survey=${e}
                          @alp-selector-change=${this.onChangeSurveyFilter}
                          class="swiper-slide"
                          attachTagName="review-selector-card"
                        ></review-selector-input>`)}
                  </div>
                </div>
              </div>
            `:null}
      </div>

      ${(0!==(this.ratingFilter?.length??0)||0!==(this.surveyFilter?.length??0))&&this.reviewList.length>0&&!this.isLoading?Je`<div class="reset-filter-btn" @click=${this.resetFilter}>
            <review-custom-icon
              type="refresh"
              width="21"
              height="20"
              color="var(--alp-review-text-gray50)"
            ></review-custom-icon>
            <p class="alp-body16 alp-medium">${this.resetText}</p>
          </div>`:null}
    `}};oa([i({type:String})],sa.prototype,"widgetCode",2),oa([i({type:Number})],sa.prototype,"totalCount",2),oa([i({type:Object})],sa.prototype,"designOption",2),oa([i({type:Object})],sa.prototype,"filterOption",2),oa([i({type:Boolean})],sa.prototype,"isLoading",2),oa([i({type:Boolean})],sa.prototype,"isDisabled",2),oa([i({type:Array})],sa.prototype,"reviewList",2),oa([r()],sa.prototype,"isOnlyMedia",2),oa([r()],sa.prototype,"showSortOption",2),oa([r()],sa.prototype,"sortType",2),oa([r()],sa.prototype,"surveyFilter",2),oa([r()],sa.prototype,"ratingFilter",2),oa([r()],sa.prototype,"search",2),oa([r()],sa.prototype,"surveyFilterList",2),oa([r()],sa.prototype,"isSearchFocus",2),sa=oa([ae("review-board-filter")],sa);const na=[Ni,Di,ko,ue`
    :host {
      display: block;
      width: 100%;
      font-family: var(--alp-common-font-family);

      container-name: board-widget;
      container-type: inline-size;
    }

    /* ------------------------------------------------------------ */
    /* ë¦¬ë·° ì»¨íì´ë ìì­
    /* ------------------------------------------------------------ */
    .board-widget-container {
      padding: 0 10px;
      padding-bottom: 40px;
    }

    /* ê³µì ì ìë´(review-compliance-guide)ê° íë¨ì ë¶ë ê²½ì°, ì»¨íì´ë íë¨ ì¬ë°± ì ê±° */
    :host([data-compliance-attached]) .board-widget-container {
      padding-bottom: 0;
    }

    /* AI ë¦¬ë·° ìì½ â í¤ëíì´íê³¼ íí° ì¬ì´ ê°ê²© */
    .board-ai-summary {
      display: block;
      margin-bottom: 24px;
    }

    /* ------------------------------------------------------------ */
    /* ë¦¬ë·° ì»¨íì´ë ìì­
    /* ------------------------------------------------------------ */
    .loading-review-container-pc {
      display: block;
    }
    .loading-review-container-mo {
      display: none;
    }

    :host-context(html[data-theme="dark"]) .board-loading {
      opacity: 0.5;
    }

    /* ------------------------------------------------------------ */
    /* ëª¨ë°ì¼ ì¬ì´ì¦ ìì­
    /* ------------------------------------------------------------ */
    @container (max-width: ${ge(Zt)}) {
      .board-widget-container {
        padding-bottom: 20px;
      }
      .board-ai-summary {
        margin-bottom: 16px;
      }
      .loading-review-container-pc {
        display: none;
      }
      .loading-review-container-mo {
        display: block;
      }
    }
  `],aa=(e,t,i)=>e.length<=t?Math.ceil(e.length/t):i;var pa=Object.defineProperty,la=(e,t,i)=>{for(var r,o=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(o=r(t,i,o)||o);return o&&pa(t,i,o),o};class da extends(wn(ht)){constructor(){super(...arguments),this.widgetCode="",this.widgetSetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs="",this.totalPages=0,this.totalCount=0,this.totalReviewCount=0,this.avgReviewRating=0,this.aiSummary=null,this.aiSummaryLoading=!1,this.filterOption={page:1,page_size:10,sort:Zi,media_only:!1,product_no:"all",search:void 0,widget_code:"",ratings:void 0,surveys:void 0,device:"w"},this.designOption={},this.isDesignLoading=!0,this.isWidgetLoading=!0,this.isFirstGetReviews=!0,this.isEmptyReview=!1,this.filterToggle=!0,this.reviewList=[],this.backupReviewList=[],this.handleReviewReported=e=>{const t=e.detail?.reviewId;t&&(this.reviewList=this.reviewList.filter(e=>e.id!==t),window?.ALPHA_REVIEW_EMERGENCY&&(this.backupReviewList=this.sortReviewList(this.backupReviewList.flat().filter(e=>e.id!==t))))},this.onPrevClick=()=>{this.filterOption.page=this.filterOption.page-1,this.getReviews()},this.onNextClick=()=>{this.filterOption.page=this.filterOption.page+1,this.getReviews()},this.onPaginationBulletClick=e=>{this.filterOption.page=e.detail.index+1,this.getReviews()},this.onChangeFilterOption=e=>{const{type:t,value:i}=e.detail;switch(t){case"sort":if(this.filterOption.sort=i,window?.ALPHA_REVIEW_EMERGENCY&&i===Zi){let e=structuredClone(this.reviewList);e=e.sort((e,t)=>new Date(e.created_at).getTime()-new Date(t.created_at).getTime()),this.backupReviewList=this.sortReviewList(e)}else if(window?.ALPHA_REVIEW_EMERGENCY&&i===Qi){let e=structuredClone(this.reviewList);e=e.sort((e,t)=>t.like_count-e.like_count),this.backupReviewList=this.sortReviewList(e)}break;case"media_only":if(this.filterOption.media_only=i,window?.ALPHA_REVIEW_EMERGENCY&&i){let e=structuredClone(this.reviewList);e=e.filter(e=>e.ordered_media.length>0),this.backupReviewList=this.sortReviewList(e)}else window?.ALPHA_REVIEW_EMERGENCY&&!i&&(this.backupReviewList=this.sortReviewList(this.reviewList));break;case"search":if(this.filterOption.search=i,window?.ALPHA_REVIEW_EMERGENCY&&""!==i){let e=structuredClone(this.reviewList);e=e.filter(e=>e.content.includes(i)),this.backupReviewList=this.sortReviewList(e)}else window?.ALPHA_REVIEW_EMERGENCY&&""===i&&(this.backupReviewList=this.sortReviewList(this.reviewList));break;case"ratings":if(this.filterOption.ratings=i,window?.ALPHA_REVIEW_EMERGENCY){let e=structuredClone(this.reviewList);e=e.sort((e,t)=>t.ratings-e.ratings),this.backupReviewList=this.sortReviewList(e)}break;case"surveys":this.filterOption.surveys=i}this.filterOption.page=1,window?.ALPHA_REVIEW_EMERGENCY?(this.isWidgetLoading=!0,setTimeout(()=>{this.isWidgetLoading=!1},800)):Promise.all([this.getReviews(),this.getReviewMeta()])},this.scrollToTop=()=>{this.scrollIntoView({behavior:"smooth",block:"start"})},this.sortReviewList=e=>{const t=[];for(let i=0;i<this.totalPages;i++)t.push(e.slice(i*this.filterOption.page_size,(i+1)*this.filterOption.page_size));return t},this.resetFilterOption=async()=>{this.filterToggle=!1,await this.updateComplete,this.filterOption={...this.filterOption,sort:this.designOption.sort,page:1,media_only:!1,search:void 0,ratings:void 0,surveys:void 0},this.filterToggle=!0,await this.updateComplete,this.getReviews(),this.getReviewMeta()}}connectedCallback(){super.connectedCallback(),this.addEventListener("review:reported",this.handleReviewReported)}disconnectedCallback(){this.removeEventListener("review:reported",this.handleReviewReported),super.disconnectedCallback()}async updated(e){if(super.updated(e),this.isDummy&&(this.filterOption.is_dummy=!0),e.has("isInViewport")){if(!this.isInViewport)return;this.productNo=v()||this.productNo||"all",this.filterOption.product_no=this.productNo;try{await this.getWidgetOption(),window?.ALPHA_REVIEW_EMERGENCY?(await this.getReviewMeta(),await this.getReviews()):(await Promise.all([this.getReviews(),this.getReviewMeta()]),this.loadAiSummary()),W(this,this.customJs),z(this,this.customCss??"")}catch(e){}}}async getReviewList(){const e={...this.filterOption};if(!window?.ALPHA_REVIEW_EMERGENCY||this.isFirstGetReviews)try{let t;t=window?.ALPHA_PREVIEW?this.previewData:await b(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0);const i=jo("reviewReportObject");this.reviewList=(Array.isArray(t)?t:[]).filter(e=>!i[e.id]),this.isFirstGetReviews&&(this.isEmptyReview=0===this.reviewList.length),window.ALPHA_REVIEW_EMERGENCY&&(this.totalPages=aa(this.reviewList,this.filterOption.page_size,this.totalPages),this.backupReviewList=this.sortReviewList(this.reviewList))}catch(e){this.reviewList=[],this.isFirstGetReviews&&(this.isEmptyReview=0===this.reviewList.length)}}async getReviewMeta(){const e={...this.filterOption};if(!window?.ALPHA_REVIEW_EMERGENCY||this.isFirstGetReviews)try{let t;t=window?.ALPHA_PREVIEW?this.previewMeta:await x(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_meta_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0),t?.code&&j(t.code),this.totalPages=t.total_page,this.totalCount=t.total_count,this.totalReviewCount=t.total_review_count,this.avgReviewRating=t.avg_review_rating??0}catch(e){throw this.errorCode=F(e?.code),Error(e)}}async loadAiSummary(){if(!1!==this.designOption?.ai_review_summary){if(this.aiSummary=null,window?.ALPHA_PREVIEW){const e=this.adaptAiSummary(this.previewMeta?.ai_summary??null);return void(e&&(this.aiSummary=e))}this.aiSummaryLoading=!0;try{const e=await async function(e,t){if(!e)return null;try{return await or.get("/v2/api-widget/ai-summary",{query:{widget_code:e,product_no:t}})}catch(e){return e instanceof Error&&e.message.includes("HTTP 404"),null}}(this.widgetCode,this.productNo),t=this.adaptAiSummary(e);t&&(this.aiSummary=t)}catch(e){}finally{this.aiSummaryLoading=!1}}else this.aiSummary=null}adaptAiSummary(e){if(!e)return null;const t=[],i=e.pros?.trim();i&&t.push({tone:"positive",title:si.WIDGETS.BOARD.AI_SUMMARY.GOOD,content:i});const r=e.cons?.trim();return r&&!0===this.designOption?.ai_review_summary_cons&&t.push({tone:"caution",title:si.WIDGETS.BOARD.AI_SUMMARY.CAUTION,content:r}),0===t.length?null:{satisfaction_rate:"number"==typeof e.satisfaction_rate&&Number.isFinite(e.satisfaction_rate)?e.satisfaction_rate:this.avgReviewRating>0?Math.round(this.avgReviewRating/5*100):void 0,sections:t}}async getWidgetOption(){try{let e;e=window?.ALPHA_PREVIEW?this.previewOption:await A(this.widgetCode,window.ALPHA_REVIEW_EMERGENCY?`/widget_option/${this.widgetCode}.json`:void 0),this.designOption=e,this.filterOption.sort=this.designOption.sort,this.filterOption.widget_code=this.widgetCode,this.filterOption.page_size=this.designOption.page_length,this.isDesignLoading=!1}catch(e){}}async getReviewBadgeList(){if(0!==this.reviewList.length)try{const e=await async function(e,t,i){return await or.get("/v2/api-widget/reviews/badges",{query:{widget_code:e,review_ids:t,is_dummy:i}})}(this.widgetCode,this.getReviewIds(),this.isDummy);this.mergeApiDataToReviews(e,e=>e.badges,"badge")}catch(e){}}async getReviewKeywordList(){if(0!==this.reviewList.length)try{const e=await async function(e,t,i){return await or.get("/v2/api-widget/reviews/keywords",{query:{widget_code:e,review_ids:t,is_dummy:i}})}(this.widgetCode,this.getReviewIds(),this.isDummy);this.mergeApiDataToReviews(e,e=>e.keywords,"keyword")}catch(e){}}async getReviewSurveyList(){if(0!==this.reviewList.length&&this.designOption.survey)try{const e=await _(this.widgetCode,this.getReviewIds(),this.isDummy);this.mergeApiDataToReviews(e,e=>e.surveys,"survey")}catch(e){}}async getReviewCommentList(){if(0!==this.reviewList.length&&this.designOption.comment)try{const e=await async function(e,t,i){return await or.get("/v2/api-widget/reviews/comments",{query:{widget_code:e,review_ids:t,is_dummy:i}})}(this.widgetCode,this.getReviewIds(),this.isDummy);this.mergeApiDataToReviews(e,e=>e.comments,"comment")}catch(e){}}async getReviews(){this.isWidgetLoading=!0;try{await this.getReviewList(),!window?.ALPHA_REVIEW_EMERGENCY&&await Promise.all([this.getReviewBadgeList(),this.getReviewKeywordList(),this.getReviewSurveyList(),this.getReviewCommentList()])}catch(e){}finally{this.isWidgetLoading=!1,setTimeout(()=>{!this.isFirstGetReviews&&this.scrollToTop(),this.isFirstGetReviews=!1},100)}}mergeApiDataToReviews(e,t,i){const r=new Map;e.forEach(e=>{r.set(e.review_id,e)}),this.reviewList=this.reviewList.map(e=>({...e,[i]:r.get(e.id)?t(r.get(e.id)):void 0}))}getReviewIds(){return this.reviewList.map(e=>e.id)}}la([i({type:Object,attribute:"data-widget-preview-data"})],da.prototype,"previewData"),la([i({type:Object,attribute:"data-widget-preview-option"})],da.prototype,"previewOption"),la([i({type:Object,attribute:"data-widget-preview-meta"})],da.prototype,"previewMeta"),la([i({type:String,attribute:"data-widget-code"})],da.prototype,"widgetCode"),la([i({type:String,attribute:"data-widget-set-code"})],da.prototype,"widgetSetCode"),la([i({type:String,attribute:"data-product-no"})],da.prototype,"productNo"),la([i({type:String,attribute:"data-widget-custom-class"})],da.prototype,"widgetCustomClass"),la([i({type:String,attribute:"data-widget-custom-id"})],da.prototype,"widgetCustomId"),la([i({type:Boolean,attribute:"data-dummy"})],da.prototype,"isDummy"),la([i({type:String,attribute:"data-custom-class"})],da.prototype,"customClass"),la([i({type:String,attribute:"data-custom-id"})],da.prototype,"customId"),la([i({type:String,attribute:"data-custom-css"})],da.prototype,"customCss"),la([i({type:String,attribute:"data-custom-js"})],da.prototype,"customJs"),la([r()],da.prototype,"totalPages"),la([r()],da.prototype,"totalCount"),la([r()],da.prototype,"totalReviewCount"),la([r()],da.prototype,"avgReviewRating"),la([r()],da.prototype,"aiSummary"),la([r()],da.prototype,"aiSummaryLoading"),la([r()],da.prototype,"filterOption"),la([r()],da.prototype,"designOption"),la([r()],da.prototype,"isDesignLoading"),la([r()],da.prototype,"isWidgetLoading"),la([r()],da.prototype,"isFirstGetReviews"),la([r()],da.prototype,"isEmptyReview"),la([r()],da.prototype,"filterToggle"),la([r()],da.prototype,"reviewList"),la([r()],da.prototype,"backupReviewList");let ca=class extends da{constructor(){super(...arguments),this.reviewListComponent=()=>(window?.ALPHA_REVIEW_EMERGENCY?this.backupReviewList[this.filterOption.page-1]:this.reviewList).map((e,t)=>Je`<review-board-card
          .totalPage=${this.totalPages}
          .widgetCode=${this.widgetCode}
          .review=${e}
          .designOption=${this.designOption}
          .index=${t+(this.filterOption.page-1)*this.filterOption.page_size}
          .filterOption=${this.filterOption}
          .productNumber=${this.productNo}
          .reviewList=${this.backupReviewList}
        ></review-board-card>`),this.reviewEmptyComponent=()=>Je`<review-empty-review
      @resetReviewList=${this.resetFilterOption}
    ></review-empty-review>`,this.reviewWriteComponent=()=>Je`<review-review-write .productNo=${this.productNo}></review-review-write>`,this.reviewLoadingComponent=()=>Je`<review-loading-review class="board-loading"></review-loading-review>`,this.skeletonComponent=()=>Je`${Array.from({length:this.designOption.page_length},()=>Je`<review-board-skeleton></review-board-skeleton>`)}`}render(){if(this.isDesignLoading)return Je`<div style="height:1px"></div>`;if(this.errorCode)return V(this.errorCode,this.productNo,this.widgetSetCode||this.widgetCode,this.widgetCode);const e="none"!==this.designOption.paging_type&&!this.isWidgetLoading&&this.totalPages>1,t=!this.isDesignLoading&&this.isFirstGetReviews,i=(()=>this.isFirstGetReviews?"initial":this.isEmptyReview?"write":this.isWidgetLoading?"loading":0===this.reviewList.length&&"message"===this.designOption.review_none?"empty":"list")();return Je`
      <div class=${`board-widget-container${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`} id=${this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode}>
        <review-header-title
          .designOption=${this.designOption}
          .widgetCode=${this.widgetCode}
        ></review-header-title>

        
        ${this.aiSummary||this.aiSummaryLoading?Je`<review-ai-summary
              class="board-ai-summary"
              .aiSummary=${this.aiSummary}
              .loading=${this.aiSummaryLoading}
            ></review-ai-summary>`:null}

        
        ${this.filterToggle?Je`
              <review-board-filter
                .isDisabled=${this.isEmptyReview||this.isWidgetLoading}
                .widgetCode=${this.widgetCode}
                .totalCount=${this.totalReviewCount}
                .designOption=${this.designOption}
                .filterOption=${this.filterOption}
                .reviewList=${this.reviewList}
                .isLoading=${this.isWidgetLoading}
                @review:filterChange=${this.onChangeFilterOption}
                @review:resetFilter=${this.resetFilterOption}
              ></review-board-filter>
            `:null}

        
        ${t?this.skeletonComponent():null}

        
        ${js(i,[["initial",()=>null],["write",()=>this.reviewWriteComponent()],["loading",()=>this.reviewLoadingComponent()],["empty",()=>this.reviewEmptyComponent()],["list",()=>Je`${this.reviewListComponent()}`]],()=>null)}

        
        ${e?Je` <review-pagination-handler
              .isDisabled=${this.isEmptyReview}
              .paginationType="${"number"}"
              .currentPage=${this.filterOption.page}
              .totalPages="${this.totalPages}"
              .productNo=${this.productNo}
              .isShowPolicy=${this.designOption.policy_notice}
              @paginationPrevClick=${this.onPrevClick}
              @paginationNextClick=${this.onNextClick}
              @paginationBulletClick=${this.onPaginationBulletClick}
            ></review-pagination-handler>`:null}
      </div>
    `}};ca.styles=na,ca=((e,t)=>{for(var i,r=t,o=e.length-1;o>=0;o--)(i=e[o])&&(r=i(r)||r);return r})([ae("review-board-widget")],ca);var ha=Object.defineProperty,ga=Object.getOwnPropertyDescriptor,ua=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ga(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ha(t,i,s),s};let wa=class extends ht{constructor(){super(),this.isOpenComment=!1,this.isOpenContent=!1,this.mallId="\uace0\uac1d\ub2d8\uaed8",this.optionText="\uc635\uc158\uba85",this.commentTagText="\uc62c\ub9bc",this.optionText=si.WIDGETS.BOARD.OPTION,this.commentTagText=si.WIDGETS.BOARD.COMMENT_TAG}createRenderRoot(){return this}async firstUpdated(e){super.firstUpdated(e);const{mall_id:t}=await m();this.mallId=t,this.isOpenContent=this.designOption.board_expand_length>=this.index+1}toggleComment(){this.isOpenComment=!this.isOpenComment}toggleContent(){this.isOpenContent=!this.isOpenContent}openDetailPopup(e){e.stopPropagation(),gn({reviewId:this.review?.id?.toString(),option:this.filterOption,reviewIndex:this.index,backupList:this.reviewList})}routeProductPage(e){e&&"all"!==e&&pn(e)}render(){const e=this.designOption.like||this.designOption.ratings||this.designOption.writer||this.designOption.create_at,t=ns(this.review),i=this.review.is_photo,r=this.review.is_video,o="thumbnail"===this.designOption.photo_size?"1fr 1fr 1fr 1fr":"1fr 1fr 1fr",s=Je`
      ${this.review.ordered_media.slice(0,"thumbnail"===this.designOption.photo_size?4:6).map(e=>Je`<review-review-media
              style="cursor: pointer;"
              @click=${e=>this.openDetailPopup(e)}
              .reviewMedia=${e}
              .productImg="${this.review.product?.detail_image}"
            ></review-review-media>`)}
    `,n=(this.review.keyword?.length??0)>0?Je`<div class="cafe24-widget-keyword-container">
            ${Je`${this.review.keyword?.map(e=>Je`<review-keyword-label
                  .keyword="${e.description}"
                  .emoji="${e.icon_name}"
                ></review-keyword-label>`)} `}
          </div>`:null,a=(this.review.badge?.length??0)>0?Je`<div class="cafe24-widget-badge-container">
            ${Je`${this.review.badge?.map(e=>Je`<review-badge
                  .label="${e.badge_name}"
                  .bgColor="${e.design_background}"
                  .borderColor="${e.design_border}"
                  .color="${e.design_color}"
                  .fontSizeClassSmall=${"alp-caption10"}
                  .fontSizeClassMedium=${"alp-caption10"}
                  .fontSizeClassLarge=${"alp-caption10"}
                ></review-badge>`)} `}
          </div>`:null,p=this.designOption.survey&&(this.review.survey?.length??0)>0?Je`<review-survey-answer
            .surveyAnswer=${this.review.survey}
            type="row"
          ></review-survey-answer>`:null,l=()=>{let e=0;return(this.designOption.writer||this.designOption.create_at)&&(e+=130),this.designOption.ratings&&(e+=120),this.designOption.like&&(e+=120),e+"px"};return Je`
      <style>.cafe24-widget-card-container { display: grid; grid-template-columns: ${this.designOption.product_info?"100px 1fr "+l():e?"1fr "+l():"1fr"}; border-bottom: 0.5px solid var(--alp-review-border-gray20, rgba(30, 41, 59, 0.2)); color: var(--alp-review-text-gray100, rgba(30, 41, 59, 0.5)); } .review-option-title { color: var(--alp-review-text-gray50, rgba(30, 41, 59, 0.5)); span { font-size: inherit; } } .board-card-review__product { display: none; cursor: pointer; } .cafe24-widget-product-section { cursor: pointer; display: flex; flex-direction: column; padding: 20px 32px 20px 8px; p:nth-child(2) { color: var(--alp-review-text-gray60, rgba(30, 41, 59, 0.6)); } p:nth-child(3) { color: var(--alp-review-text-gray40, rgba(30, 41, 59, 0.6)); } } .cafe24-widget-product-section > review-review-media { margin-bottom: 10px; min-width: 64px; max-width: 64px; min-height: 64px; max-height: 64px; border-radius: 10px; overflow: hidden; } .cafe24-widget-content-section { display: flex; flex-direction: column; justify-content: center; gap: 12px; padding: 24px 32px 24px 0; } .cafe24-widget-option-info { p { color: var(--alp-review-text-gray50, rgba(30, 41, 59, 0.6)); span { color: inherit; font-size: inherit; font-weight: 400; } } } .cafe24-widget-option-info__pc { display: block; } .cafe24-widget-option-info__mobile { display: none; } .cafe24-widget-badge-container { display: flex; flex-wrap: wrap; gap: 5px; min-width: fit-content; } .cafe24-widget-survey-container { display: flex; padding: 2px 16px; border-left: 3px solid var(--alp-review-border-gray20, rgba(30, 41, 59, 0.2)); } .cafe24-widget-action-section { display: grid; grid-template-columns: ${(()=>{let e="";return(this.designOption.writer||this.designOption.create_at)&&(e+="130px "),this.designOption.ratings&&(e+="120px "),this.designOption.like&&(e+="120px "),e})()}; padding: 28px 0 0 0; } .cafe24-widget-user-info { display: flex; justify-content: center; flex-direction: column; gap: 5px; height: 38px; } .cafe24-widget-rating-pc, .cafe24-widget-rating-mobile { display: flex; justify-content: center; } .cafe24-widget-rating-pc { margin-top: 10px; } .cafe24-widget-rating-mobile { display: none; } .cafe24-widget-like-container-pc { display: flex; padding-left: 20px; } .cafe24-widget-media-desktop { display: grid; grid-template-columns: var(--board-photo-size); gap: 4px; margin-top: 12px; margin-bottom: 8px; } .cafe24-widget-media-mobile { display: none; margin-bottom: 32px; margin-top: 12px; } .cafe24-widget-keyword-container { display: flex; flex-wrap: wrap; gap: 10px; } .cafe24-widget-content-collapsed__icon { background-color: var(--alp-review-card-gray07, rgba(30, 41, 59, 0.03)); border-radius: 50%; padding: 6px; } .cafe24-widget-button-container-pc { display: flex; margin-left: -14px; } .cafe24-widget-button-container-mobile { display: none; margin-left: -14px; } .cafe24-widget-content-expanded { display: flex; flex-direction: column; gap: 2px; .more-btn, svg { color: var(--alp-review-text-gray50, rgba(30, 41, 59, 0.5)); cursor: pointer; display: flex; align-items: center; } } .cafe24-widget-content-expanded > p { white-space: pre-line; line-height: 1.6 !important; } .cafe24-widget-content-expanded > div { color: var(--alp-review-text-gray50, rgba(30, 41, 59, 0.5)); } .cafe24-widget-content-collapsed { display: flex; align-items: center; gap: 6px; cursor: pointer; } .cafe24-widget-content-collapsed p { line-clamp: ${this.designOption.content_except}; -webkit-line-clamp: ${this.designOption.content_except}; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; } .cafe24-widget-comment-section { display: flex; flex-direction: column; gap: 6px; padding: 18px 20px; background: var(--alp-review-card-gray03, rgba(30, 41, 59, 0.03)); p { color: var(--alp-review-text-gray80, rgba(30, 41, 59, 0.5)); white-space: pre-line; } p:nth-child(2) { color: var(--alp-review-text-gray50, rgba(30, 41, 59, 0.5)); } } .cafe24-comment-pc { display: flex; } .cafe24-comment-mobile { display: none; } .cafe24-widget-like-container-mobile { display: none; } @container (max-width: 840px) { .board-card-review__product { cursor: pointer; display: flex; align-items: center; gap: 12px; padding: 16px 16px; border-left: 3px solid var(--alp-review-icon-gray20, rgba(30, 41, 59, 0.2)); img { min-width: 40px; min-height: 40px; max-width: 40px; max-height: 40px; object-fit: cover; border-radius: 50%; } .review-product-title { color: var(--alp-review-text-gray80, rgba(30, 41, 59, 1)); } .review-product-title { font-size: inherit; } > div { display: flex; flex-direction: column; gap: 6px; } } :host-context(html[data-theme="dark"]) .board-card-review__product { background-color: var(--alp-review-card-gray07) !important; border-left: 3px solid var(--alp-review-icon-gray60, rgba(30, 41, 59, 0.2)); } .cafe24-widget-content-section { gap: 12px; padding: 20px 0 0 0; } .cafe24-widget-card-container { display: flex; flex-direction: column; } .cafe24-widget-product-section { display: none; } .cafe24-widget-media-desktop { display: none; } .cafe24-widget-media-mobile { display: grid; grid-template-columns: var(--board-photo-size); gap: 3px; position: relative; } .cafe24-widget-media-mobile review-review-media { aspect-ratio: 1/1; } .cafe24-widget-option-info__pc { display: none; } .cafe24-widget-option-info__mobile { display: block; } .cafe24-widget-action-section { display: flex; align-items: center; padding: 12px 0; gap: 12px; } .cafe24-widget-user-info { align-items: center; flex-direction: row; margin-right: auto; justify-content: flex-start; } .cafe24-widget-rating-mobile { display: flex; justify-content: flex-start; } .cafe24-widget-rating-pc { display: none; } } @container (max-width: 440px) { .cafe24-widget-content-section { gap: 12px; padding: 40px 0 0 0; } .cafe24-widget-media-mobile { margin-bottom: 0; } .cafe24-widget-keyword-container { margin-bottom: 0; } .cafe24-widget-action-section { flex-wrap: wrap; row-gap: 0; } .cafe24-widget-user-info { min-width: 100%; } .cafe24-widget-like-container-pc { margin-left: auto; } .cafe24-widget-button-container-pc { display: none; } .cafe24-widget-button-container-mobile { display: flex; margin-top: 8px; padding-bottom: 40px; align-items: center; } .cafe24-comment-pc { display: none; } .cafe24-comment-mobile { display: flex; } .cafe24-widget-like-container-pc { display: none; } .cafe24-widget-like-container-mobile { display: flex; margin-left: auto; } }</style>

      <div class="cafe24-widget-card-container">
        
        ${this.designOption.product_info?Je`
              <div
                class="cafe24-widget-product-section"
                @click=${()=>this.routeProductPage(this.review.product?.product_no?.toString()??"")}
              >
                <review-review-media
                  .productImg="${this.review.product?.detail_image}"
                  .type=${"product"}
                >
                </review-review-media>
                <p class="alp-body13 alp-medium line-wrap">${this.review.product?.product_name}</p>
              </div>
            `:null}

        <div class="cafe24-widget-content-section">
          ${this.designOption.product_info||this.designOption.product_option&&(this.review.product_option_json?.length>0||this.review.product_option)?Je`<div
                @click=${this.routeProductPage}
                class="board-card-review__product"
                style="background-color:${this.designOption.product_info?"var(--alp-review-card-gray03, rgba(30, 41, 59, 0.05))":"transparent"}"
              >
                ${this.designOption.product_info?Je`<img
                      src="${this.review.product?.tiny_image||this.review.product?.detail_image}"
                      alt="product image"
                      onerror="this.onerror=null;this.src='${te}/review-widget/empty-product-svg.svg';"
                    />`:null}
                <div>
                  ${this.designOption.product_info?Je`
                        <p class="review-product-title alp-body14 alp-medium">
                          ${this.review.product?.product_name}
                        </p>
                      `:null}
                  ${this.designOption.product_option&&(this.review.product_option_json?.length>0||this.review.product_option)?Je`
                        <p class="review-option-title alp-body13 alp-line13">
                          <span>${this.optionText} : </span>
                          ${t}
                        </p>
                      `:null}
                </div>
              </div>`:null}
          ${this.designOption.ratings?Je`<div class="cafe24-widget-rating-mobile">
                ${Array.from({length:this.review.ratings},()=>Je`<review-star-icon size="16"></review-star-icon>`)}
              </div>`:null}
          ${this.isOpenContent?Je`
                
                ${a}
                ${this.designOption.product_option&&(this.review.product_option_json?.length>0||this.review.product_option)?Je`
                      <p
                        class="cafe24-widget-option-info__pc review-option-title alp-body13 alp-line13"
                      >
                        <span>${this.optionText} : </span>
                        ${t}
                      </p>
                    `:null}

                
                ${this.designOption.survey&&(this.review.survey?.length??0)>0?Je`<div class="cafe24-widget-survey-container">${p}</div>`:""}

                <div class="cafe24-widget-content-expanded">
                  ${Je`<p class="alp-body15 alp-medium alp-line15">${this.review.content}</p>`}
                  <div class="alp-body12 alp-medium more-btn" @click=${this.toggleContent}>
                    ${si.WIDGETS.STORY.CLOSE}
                    <review-custom-icon
                      style="transform: rotate(180deg);"
                      color="var(--alp-review-gray50, rgba(30, 41, 59, 0.5))"
                      width="16"
                      height="18"
                      type="arrow-down"
                    ></review-custom-icon>
                  </div>
                </div>

                ${this.review.ordered_media?.length>0?Je`
                      <div
                        class="cafe24-widget-media-desktop"
                        style="--board-photo-size: ${o};"
                      >
                        ${s}
                      </div>
                      <div
                        class="cafe24-widget-media-mobile"
                        style="--board-photo-size: ${o};"
                      >
                        ${s}
                      </div>
                    `:""}
                ${n}
              `:Je`
                <div class="cafe24-widget-content-collapsed" @click=${this.toggleContent}>
                  ${a}
                  <p class="alp-body15 alp-medium alp-line14">${this.review.content}</p>
                  <review-custom-icon
                    color="var(--alp-review-icon-gray50, rgba(30, 41, 59, 0.5))"
                    width="16"
                    height="18"
                    type="arrow-down"
                  ></review-custom-icon>
                  ${i?Je`
                        <review-custom-icon
                          class="cafe24-widget-content-collapsed__icon"
                          color="var(--alp-review-icon-gray60, rgba(30, 41, 59, 0.5))"
                          width="16"
                          height="18"
                          type="photo"
                        ></review-custom-icon>
                      `:null}
                  ${r?Je`<review-custom-icon
                        class="cafe24-widget-content-collapsed__icon"
                        color="var(--alp-review-icon-gray60, rgba(30, 41, 59, 0.5))"
                        width="16"
                        height="18"
                        type="video"
                      ></review-custom-icon> `:null}
                </div>
              `}

          <div
            class="cafe24-widget-button-container-pc"
            style="margin-top: ${this.isOpenComment?"0px":"-6px"};"
          >
            ${this.designOption.comment?Je` <review-comment-button
                  .commentCount=${this.review.comment?.length??0}
                  .isOpen=${this.isOpenComment}
                  @click=${this.toggleComment}
                ></review-comment-button>`:null}
            <review-report-button .reviewId=${this.review.id}></review-report-button>
          </div>

          ${this.isOpenComment&&(this.review.comment?.length??0)>0?Je`
                <div class="cafe24-widget-comment-section cafe24-comment-pc">
                  ${Je`<p class="alp-body13 alp-line14">${this.review.comment?.[0]?.content}</p>`}
                  <p class="alp-body14 alp-medium">
                    ${this.review.comment?.[0]?.writer} ${this.commentTagText}
                  </p>
                </div>
              `:null}
        </div>

        ${e?Je` <div class="cafe24-widget-action-section">
              ${this.designOption.writer||this.designOption.create_at?Je`<div class="cafe24-widget-user-info">
                    ${this.designOption.writer?Je`
                          <review-user-info
                            .sizeType=${"small"}
                            .review=${this.review}
                            .fontSizeClassSmall=${"alp-body12"}
                            .fontWeight=${"400"}
                            .designOption=${this.designOption}
                            .otherText=${this.designOption.create_at?"\ub2d8\uc774":""}
                          ></review-user-info>
                        `:null}
                    ${this.designOption.create_at?Je`
                          <review-at-date
                            .createDate=${this.review.created_at}
                            .fontSizeClassSmall=${"alp-body12"}
                            .fontWeight=${"400"}
                          ></review-at-date>
                        `:null}
                  </div>`:null}
              ${this.designOption.ratings?Je`<div class="cafe24-widget-rating-pc">
                    ${Array.from({length:this.review.ratings},()=>Je`<review-star-icon size="16"></review-star-icon>`)}
                  </div>`:null}
              ${this.designOption.like?Je`<div class="cafe24-widget-like-container-pc">
                    <review-like-button
                      .isText=${!1}
                      .showLike=${this.designOption.like}
                      .reviewId=${this.review.id}
                      .productNo=${this.review.product?.product_no}
                      .likeCount=${this.review.like_count}
                    ></review-like-button>
                  </div>`:null}
            </div>`:null}

        <div class="cafe24-widget-button-container-mobile">
          ${this.designOption.comment&&(this.review.comment?.length??0)>0?Je` <review-comment-button
                .commentCount=${this.review.comment?.length??0}
                .isOpen=${this.isOpenComment}
                @click=${this.toggleComment}
              ></review-comment-button>`:null}
          <review-report-button .reviewId=${this.review.id}></review-report-button>

          ${this.designOption.like?Je` <div class="cafe24-widget-like-container-mobile">
                <review-like-button
                  .isText=${this.designOption.like}
                  .showLike=${this.designOption.like}
                  .reviewId=${this.review.id}
                  .productNo=${this.review.product?.product_no}
                  .likeCount=${this.review.like_count}
                ></review-like-button>
              </div>`:null}
        </div>

        ${this.isOpenComment&&(this.review.comment?.length??0)>0?Je`
              <div class="cafe24-widget-comment-section cafe24-comment-mobile">
                ${Je`<p class="alp-body13 alp-line14">${this.review.comment?.[0]?.content}</p>`}
                <p class="alp-body14 alp-medium">
                  ${this.review.comment?.[0]?.writer} ${this.commentTagText}
                </p>
              </div>
            `:null}
      </div>
    `}};ua([i({type:Object})],wa.prototype,"filterOption",2),ua([i({type:Object})],wa.prototype,"review",2),ua([i({type:Object})],wa.prototype,"reviewList",2),ua([i({type:Object})],wa.prototype,"designOption",2),ua([i({type:String})],wa.prototype,"widgetCode",2),ua([i({type:Number})],wa.prototype,"index",2),ua([r()],wa.prototype,"isOpenComment",2),ua([r()],wa.prototype,"isOpenContent",2),wa=ua([ae("review-cafe24-board-card")],wa);const va=[Ni,Di,ue`:host{width:100%;font-family:var(--alp-common-font-family);display:block;container:cafe24-board-widget/inline-size}.cafe24-board-widget{padding:0 10px 40px}:host([data-compliance-attached]) .cafe24-board-widget{padding-bottom:0}.board-ai-summary{margin-bottom:24px;display:block}.loading-review-container-pc{display:bol}.loading-review-container-mo{display:none}:host-context(html[data-theme="dark"]) .loading-review-container-pc,:host-context(html[data-theme="dark"]) .loading-review-container-mo{opacity:.5}@media (width<=440px){.cafe24-board-widget{padding-bottom:20px}.board-ai-summary{margin-bottom:16px}.loading-review-container-pc{display:none}.loading-review-container-mo{display:block}}`];let ma=class extends da{constructor(){super(...arguments),this.reviewWriteComponent=()=>Je`<div class="review-review-write-container">
      <review-review-write .productNo=${this.productNo}></review-review-write>
    </div>`,this.reviewLoadingComponent=()=>Je`<review-loading-review class="loading-review-container-pc"></review-loading-review>
      <review-loading-review
        .spinnerSize=${200}
        class="loading-review-container-mo"
      ></review-loading-review>`,this.reviewEmptyComponent=()=>Je`<div class="review-empty-review-container">
      <review-empty-review @resetReviewList=${this.resetFilterOption}></review-empty-review>
    </div>`,this.reviewListComponent=()=>(window?.ALPHA_REVIEW_EMERGENCY?this.backupReviewList[this.filterOption.page-1]:this.reviewList).map((e,t)=>Je`
          <review-cafe24-board-card
            .filterOption=${this.filterOption}
            .widgetCode=${this.widgetCode}
            .review=${e}
            .designOption=${this.designOption}
            .index=${t+(this.filterOption.page-1)*this.filterOption.page_size}
            .reviewList=${this.reviewList}
          ></review-cafe24-board-card>
        `),this.skeletonComponent=()=>Je`
      ${Array.from({length:this.designOption.page_length},()=>Je`<review-board-skeleton></review-board-skeleton>`)}
    `}render(){if(this.isDesignLoading)return Je`<div style="height:1px"></div>`;if(this.errorCode)return V(this.errorCode,this.productNo,this.widgetSetCode||this.widgetCode,this.widgetCode);const e=!this.isDesignLoading&&this.isFirstGetReviews,t=(()=>this.isFirstGetReviews?"initial":this.isEmptyReview?"write":this.isWidgetLoading?"loading":0===this.reviewList.length&&"message"===this.designOption.review_none?"empty":"list")();return Je`
      <div class=${`cafe24-board-widget${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`} id=${this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode}>
        <review-header-title
          .designOption=${this.designOption}
          .widgetCode=${this.widgetCode}
        ></review-header-title>

        
        ${this.aiSummary||this.aiSummaryLoading?Je`<review-ai-summary
              class="board-ai-summary"
              .aiSummary=${this.aiSummary}
              .loading=${this.aiSummaryLoading}
            ></review-ai-summary>`:null}

        ${this.filterToggle?Je`
              <review-board-filter
                .isDisabled=${this.isEmptyReview||this.isWidgetLoading}
                .widgetCode=${this.widgetCode}
                .totalCount=${this.totalReviewCount}
                .designOption=${this.designOption}
                .filterOption=${this.filterOption}
                .reviewList=${this.reviewList}
                .isLoading=${this.isWidgetLoading}
                @review:filterChange=${this.onChangeFilterOption}
                @review:resetFilter=${this.resetFilterOption}
              ></review-board-filter>
            `:null}
        ${e?this.skeletonComponent():null}

        
        ${js(t,[["initial",()=>null],["write",()=>this.reviewWriteComponent()],["loading",()=>this.reviewLoadingComponent()],["empty",()=>this.reviewEmptyComponent()],["list",()=>Je`${this.reviewListComponent()}`]],()=>null)}

        
        
        ${"none"!==this.designOption.paging_type&&!this.isWidgetLoading&&this.totalPages>1?Je` <review-pagination-handler
              .isDisabled=${this.isEmptyReview}
              .paginationType="${"number"}"
              .currentPage=${this.filterOption.page}
              .totalPages="${this.totalPages}"
              .productNo=${this.productNo}
              .isShowPolicy=${this.designOption.policy_notice}
              @paginationPrevClick=${this.onPrevClick}
              @paginationNextClick=${this.onNextClick}
              @paginationBulletClick=${this.onPaginationBulletClick}
            ></review-pagination-handler>`:null}
      </div>
    `}};ma.styles=va,ma=((e,t)=>{for(var i,r=t,o=e.length-1;o>=0;o--)(i=e[o])&&(r=i(r)||r);return r})([ae("review-cafe24-board-widget")],ma);const ya=e=>e>4?si.SHARED.PARSED_AVG_RATINGS.VERY_SATISFIED:e>3?si.SHARED.PARSED_AVG_RATINGS.SATISFIED:e>2?si.SHARED.PARSED_AVG_RATINGS.FAIR:si.SHARED.PARSED_AVG_RATINGS.POOR,fa=e=>document.cookie.split("; ").reduce((t,i)=>{const[r,o]=i.split("=");return r===e?decodeURIComponent(o):t},""),ba=(e,t,i)=>{const r=new Date;r.setDate(r.getDate()+i),document.cookie=`${e}=${t}; expires=${r.toUTCString()}; path=/`};var xa=Object.defineProperty,_a=Object.getOwnPropertyDescriptor,Ca=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?_a(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&xa(t,i,s),s};let $a=class extends ht{constructor(){super(...arguments),this.review={},this.option={},this.isActive=!1,this.reviewCount=null,this.reviewAvgRating=null,this.index=null,this.productImageUrl="",this.currentIndex=null,this.isFadedOut=!1,this.isFadeOutAnimating=!1,this.hasFadedOut=!1,this.isVideo=!1,this.thumbnailReviewImg=void 0,this._fadeTimer=null}createRenderRoot(){return this}updated(e){super.updated(e),e.has("isFadedOut")&&(!1!==e.get("isFadedOut")||!0!==this.isFadedOut||this.hasFadedOut||(null!==this._fadeTimer&&(window.clearTimeout(this._fadeTimer),this._fadeTimer=null),this.isFadeOutAnimating=!0,this._fadeTimer=window.setTimeout(()=>{this.isFadeOutAnimating=!1,this.hasFadedOut=!0},1e3)))}closeWidget(){ba(rn,"true",1),c(rn)}render(){this.thumbnailReviewImg=I(this.review.ordered_media?.[0]?.thumbnail_photo_platform_url||this.review.ordered_media?.[0]?.thumbnail_photo_url),this.review.ordered_media?.length>0&&(this.isVideo=!!this.review.ordered_media?.[0]?.thumbnail_video_url);const e=ya(this.reviewAvgRating??0),t=Je`
      <review-ratings-bundle .rating=${this.review.ratings} .size=${14}></review-ratings-bundle>
    `,i=this.option.ratings||this.option.product_option&&(!!this.review.product_option||!!this.review.product_option_json?.[0]?.option_value),r=Je`
      <p class="alp-body14 line-wrap" style="font-weight: 500;">
        ${si.WIDGETS.CHAT.RATED_PREFIX}
        ${this.reviewCount?.toLocaleString()}${si.WIDGETS.CHAT.RATED_SUFFIX}${" "}
        <b class="alp-ht" style="margin-left: 3px;"> ${e}</b>${si.WIDGETS.CHAT.RATED_END}
      </p>
    `,o=Je`
      <review-review-media
        .productImg=${this.productImageUrl}
        .type=${"product"}
      ></review-review-media>
    `,s="all"!==this.productNo?o:Je`<img
            style="width:100%;height:100%;object-fit:cover;"
            src="${te}/review-widget/empty-chat-product.png"
            alt="product image"
          />`;return Je`
      <style>.chat-card { display: flex; align-items: flex-end; height: 100px; } .chat-card.is-fadeout-anim { animation: chat-card-fade-out 0.2s ease forwards; will-change: opacity; } .chat-card.is-faded-out, .chat-card.has-faded-out { opacity: 0; pointer-events: none; } .chat-card__photo { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; position: relative; opacity: 0; margin-top: auto; margin-bottom: auto; &.is-active { animation: fade-in-product 800ms 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards; } p { color: var(--alp-review-text-gray80); text-align: center !important; max-width: 80px; } } .chat-card__photo__media { width: 80px; height: 80px; object-fit: cover; border-radius: 50%; background-color: var(--alp-review-bg-gray05); overflow: hidden; filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.3)); -webkit-filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.3)); } .chat-card__content-wrapper { overflow: hidden; padding: 4px 8px 8px 0px; width: fit-content; height: fit-content; position: relative; margin-top: auto; margin-bottom: auto; } .chat-card__content { display: flex; flex-direction: column; justify-content: center; gap: 5px; margin: auto 0; max-width: 320px; padding: 16px 18px 16px 18px; box-sizing: border-box; position: relative; background-color: var(--alp-review-bg-white); margin-left: 24px; border-radius: 20px; filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.3)); -webkit-filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.3)); transform: translateY(100%); opacity: 0; &.is-active { animation: move-up-chat 800ms 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards; } &__review-wrapper { display: flex; flex-direction: column; justify-content: center; margin: auto 0; } } .chat-card__content-star { display: flex; align-items: center; gap: 4px; height: 19px; overflow: hidden; p { color: var(--alp-review-text-gray50); z-index: 10; } } .chat-card__content__review-wrapper { display: flex; flex-wrap: wrap; } .chat-card__content__review-wrapper > p { display: flex; align-items: center; flex-wrap: wrap; color: var(--alp-review-text-gray100); } .chat-card__content__review-wrapper > p > review-custom-icon { margin: -2px 0 0 0; animation: move-chat-arrow 1s ease-in-out infinite; } .chat-card__content-review { color: var(--alp-review-text-gray100); line-clamp: 2 !important; -webkit-line-clamp: 2 !important; -webkit-box-orient: vertical; line-height: 1.4 !important; } .chat-card-content-svg { position: absolute; bottom: 0; left: -9px; z-index: -1; path { fill: var(--alp-review-bg-white); } } .chat-badge { position: absolute; top: -0px; right: -9px; border-radius: 32px; background: var(--alp-review-icon-gray100); box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25); display: flex; padding: 4px 8px 4px 7px; justify-content: center; align-items: center; gap: 2px; overflow: hidden; color: var(--alp-review-text-white, #fff); font-size: 12px; font-weight: 700; line-height: 140%; letter-spacing: -0.24px; } .chat-card__content__close-btn { background-color: var(--alp-review-icon-gray50); border-radius: 50%; padding: 4px; cursor: pointer; width: 28px; height: 28px; margin-top: auto; margin-bottom: auto; opacity: 0; animation: fade-in-close-btn 0.5s 1.3s ease forwards; } @keyframes chat-card-fade-out { from {opacity: 1;} to {opacity: 0;} } @keyframes move-chat-arrow { 0% {transform: translateX(5px);} 50% {transform: translateX(0px);} 100% {transform: translateX(5px);} } @keyframes move-up-chat { 0% {opacity: 0;transform: translateY(calc(100% + 10px));} 50% {opacity: 0;} 100% {opacity: 1;transform: translateY(calc(0%));} } @keyframes fade-in-product { 0% {opacity: 0;} 100% {opacity: 1;} } @keyframes fade-in-close-btn { 0% {opacity: 0;transform: translateX(-10px);} 100% {opacity: 1;transform: translateX(0px);} }</style>
      <div
        class="chat-card ${this.isFadeOutAnimating?"is-fadeout-anim":""} ${this.isFadedOut?"is-faded-out":""} ${this.hasFadedOut?"has-faded-out":""}"
      >
        
        <div class="chat-card__photo ${this.isActive?"is-active":""}">
          <div class="chat-card__photo__media">
            ${this.reviewCount?s:(()=>this.thumbnailReviewImg?Je`<review-review-media
            .reviewMedia=${this.review.ordered_media?.[0]}
            .type=${"review"}
          ></review-review-media>`:this.isVideo&&this.productImageUrl?Je`
          <img
            style="width:100%;height:100%;object-fit:cover;"
            src="${this.productImageUrl}"
            alt="product review image"
          />
          <review-custom-icon
            style="position: absolute; top:50%; left:50%; transform: translate(-50%, -50%);"
            .type=${ut}
          ></review-custom-icon>
        `:Je`<img
            style="width:100%;height:100%;object-fit:cover;"
            src="${te}/review-widget/empty-chat-review.png"
            alt="product review image"
          />`)()}
          </div>

          
          ${this.option.writer?Je`<p class="line-wrap alp-caption11 alp-medium">
                ${this.review.user_info||si.WIDGETS.CHAT.NON_MEMBER}
              </p>`:null}

          
          ${null===this.index?Je`<div class="chat-badge">
                <review-star-icon size="12" color="var(--alp-review-text-white)"></review-star-icon>
                ${this.reviewAvgRating}
              </div>`:null}
        </div>

        
        <div class="chat-card__content-wrapper">
          <div class="chat-card__content ${this.isActive?"is-active":""}">
            ${this.reviewCount?Je` <div class="chat-card__content__review-wrapper">${r}</div>`:null}

            
            ${i?Je`<div class="chat-card__content-star">
                  
                  ${this.option.ratings?t:null}

                  
                  ${this.option.product_option&&(this.review.product_option||this.review.product_option_json?.[0]?.option_value)?Je`<p class="line-wrap alp-caption11 alp-medium">
                        ${ns(this.review)}
                      </p>`:null}
                </div>`:null}
            ${this.review.content?Je`<p class="line-wrap alp-body14 chat-card__content-review alp-medium">
                  ${this.review.content?.slice(0,this.option.text_length)}
                </p>`:null}
            <svg
              class="chat-card-content-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 23"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.11119 12C7.11806 11.2557 7.11119 8.74536 7.11119 7.93011V0H24V22.4754C19.8306 22.4754 16.0141 21.1742 13.068 19.0176C10.1427 20.7648 5.53944 22.3799 0 21.4539C1.51873 20.8554 7.04643 19.0119 7.11119 12Z"
                fill="#fff"
              />
            </svg>
          </div>
        </div>
        ${this.reviewCount&&this.isActive?Je`<div class="chat-card__content__close-btn" @click=${this.closeWidget}>
              <review-custom-icon
                .type="${Pt}"
                .width="${20}"
                .height="${20}"
                .color="${"#fff"}"
              />
            </div>`:null}
      </div>
    `}};Ca([i({type:String})],$a.prototype,"productNo",2),Ca([i({type:Object})],$a.prototype,"review",2),Ca([i({type:Object})],$a.prototype,"option",2),Ca([i({type:Object})],$a.prototype,"filterOption",2),Ca([i({type:Boolean,reflect:!0})],$a.prototype,"isActive",2),Ca([i({type:String})],$a.prototype,"reviewCount",2),Ca([i({type:Number})],$a.prototype,"reviewAvgRating",2),Ca([i({type:Number})],$a.prototype,"index",2),Ca([i({type:String})],$a.prototype,"productImageUrl",2),Ca([i({type:Number})],$a.prototype,"currentIndex",2),Ca([i({type:Boolean})],$a.prototype,"isFadedOut",2),Ca([r()],$a.prototype,"isFadeOutAnimating",2),Ca([r()],$a.prototype,"hasFadedOut",2),Ca([r()],$a.prototype,"isVideo",2),Ca([r()],$a.prototype,"thumbnailReviewImg",2),$a=Ca([ae("review-chat-card-type-a")],$a);var Oa=Object.defineProperty,ka=Object.getOwnPropertyDescriptor,Sa=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ka(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Oa(t,i,s),s};let Ea=class extends ht{constructor(){super(...arguments),this.review={},this.option={},this.isActive=!1,this.reviewCount=null,this.reviewAvgRating=null,this.index=null,this.productImageUrl="",this.currentIndex=null,this.isFadedOut=!1,this.typewriterSpeedMs=30,this.isStep1=!1,this.isStep2=!1,this.showContent=!1,this.isFadeOutAnimating=!1,this.hasFadedOut=!1,this.typedIndex=0,this.typedText="",this.isVideo=!1,this.thumbnailReviewImg=void 0,this._step1Timer=null,this._step2Timer=null,this._fadeTimer=null,this._typeTimer=null}createRenderRoot(){return this}updated(e){if(e.has("isActive")&&(this._clearTimers(),this.isStep1=!1,this.isStep2=!1,this.showContent=!1,this.typedIndex=0,this.typedText="",this.isActive&&(this._step1Timer=window.setTimeout(()=>{this.isStep1=!0,this._step2Timer=window.setTimeout(()=>{this.isStep2=!0,this.showContent=!0},1e3)},400))),e.has("showContent")||e.has("reviewContent")){const t=e.get("showContent");this.showContent&&(!t&&this.showContent||e.has("reviewContent"))&&this._startTypewriter()}e.has("isFadedOut")&&(!1!==e.get("isFadedOut")||!0!==this.isFadedOut||this.hasFadedOut||(null!==this._fadeTimer&&(window.clearTimeout(this._fadeTimer),this._fadeTimer=null),this.isFadeOutAnimating=!0,this._fadeTimer=window.setTimeout(()=>{this.isFadeOutAnimating=!1,this.hasFadedOut=!0},1e3)))}disconnectedCallback(){super.disconnectedCallback(),this._clearTimers()}_clearTimers(){null!==this._step1Timer&&(window.clearTimeout(this._step1Timer),this._step1Timer=null),null!==this._step2Timer&&(window.clearTimeout(this._step2Timer),this._step2Timer=null),null!==this._fadeTimer&&(window.clearTimeout(this._fadeTimer),this._fadeTimer=null),null!==this._typeTimer&&(window.clearInterval(this._typeTimer),this._typeTimer=null)}_startTypewriter(){null!==this._typeTimer&&(window.clearInterval(this._typeTimer),this._typeTimer=null);const e=this.review.content??"";this.typedIndex=0,this.typedText="",0!==e.length&&(this._typeTimer=window.setInterval(()=>{this.typedIndex>=e.length?null!==this._typeTimer&&(window.clearInterval(this._typeTimer),this._typeTimer=null):(this.typedIndex+=1,this.typedText=e.slice(0,this.typedIndex))},Math.max(10,this.typewriterSpeedMs)))}closeWidget(){ba(rn,"true",1),c(rn)}render(){this.thumbnailReviewImg=I(this.review.ordered_media?.[0]?.thumbnail_photo_platform_url||this.review.ordered_media?.[0]?.thumbnail_photo_url),this.review.ordered_media?.length>0&&(this.isVideo=!!this.review.ordered_media?.[0]?.thumbnail_video_url);const e=ya(this.reviewAvgRating??0),t=Je`
      <review-ratings-bundle .rating=${this.review.ratings} .size=${14}></review-ratings-bundle>
    `,i=this.option.ratings||this.option.product_option&&(!!this.review.product_option||!!this.review.product_option_json?.[0]?.option_value),r=Je`
      <p class="alp-body14 line-wrap" style="font-weight: 500;">
        ${si.WIDGETS.CHAT.RATED_PREFIX}${this.reviewCount?.toLocaleString()}${si.WIDGETS.CHAT.RATED_SUFFIX}${" "}
        <b class="alp-ht" style="margin-left: 3px;"> ${e}</b>${si.WIDGETS.CHAT.RATED_END}
      </p>
    `,o=this.isStep1&&!this.reviewCount?Je`
            <div class="chat-card__loading">
              <div></div>
              <div></div>
              <div></div>
            </div>
          `:null,s=Je`
      <review-review-media
        .productImg=${this.productImageUrl}
        .type=${"product"}
      ></review-review-media>
    `,n="all"!==this.productNo?s:Je`<img
            style="width:100%;height:100%;object-fit:cover;"
            src="${te}/review-widget/empty-chat-product.png"
            alt="product image"
          />`;return Je`
      <style>:host { --alp-review-chat-duration-pre: 0.3s; --alp-review-chat-duration-grow: 0.3s; --alp-review-chat-duration-fade: 0.3s; --alp-review-chat-duration-fade-card: 0.5s; --alp-review-chat-duration-wave: 0.6s; --alp-review-chat-delay-small: 0.1s; --alp-review-chat-delay-medium: 0.15s; --alp-review-chat-space-2: 8px; --alp-review-chat-space-3: 10px; --alp-review-chat-slide-x: 10px; --alp-review-chat-wave-lift: 5px; } .chat-card { display: flex; align-items: flex-end; height: 100px; } .chat-card > p { color: var(--alp-review-text-gray80); } .chat-card.is-fadeout-anim { animation: chat-card-fade-out var(--alp-review-chat-duration-fade-card) ease forwards; will-change: opacity; } .chat-card.is-faded-out, .chat-card.has-faded-out { opacity: 0; pointer-events: none; } .chat-card__photo { opacity: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--alp-review-chat-space-2); position: relative; margin-top: auto; margin-bottom: auto; &.is-active { animation: fade-in-product 800ms 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards; } } .chat-card__photo__media { width: 80px; height: 80px; object-fit: cover; border-radius: 50%; background-color: var(--alp-review-bg-gray05); overflow: hidden; filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.3)); -webkit-filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.3)); } .chat-card__photo p { color: #1e293b; text-align: center !important; max-width: 80px; } .chat-card__content { display: flex; flex-direction: column; justify-content: center; gap: var(--alp-review-chat-space-1); width: 0px; height: 0px; padding: 0px; box-sizing: border-box; margin-top: auto; margin-bottom: auto; position: relative; background-color: var(--alp-review-bg-white); margin-left: 24px; border-radius: 20px; filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.3)); -webkit-filter: drop-shadow(1px 3px 4px rgba(0, 0, 0, 0.3)); will-change: width, height; padding: 4px 8px 8px 0px; opacity: 0; } .chat-card__content.is-step1 { animation: chat-card-pre var(--alp-review-chat-duration-pre) ease-in-out forwards; } .chat-card__content.is-step2 { animation: chat-card-grow var(--alp-review-chat-duration-grow) ease-in-out forwards; } .chat-card-content-svg { position: absolute; bottom: 0; left: -8px; z-index: -1; } .chat-card-content-svg path { fill: var(--alp-review-bg-white); } .chat-card__loading { display: flex; gap: var(--alp-review-chat-space-2); margin: auto; } .chat-card__loading div { width: 10px; height: 10px; background-color: var(--alp-review-icon-gray20); border-radius: 50%; transform: translateY(0); will-change: transform; animation: chat-loading-wave var(--alp-review-chat-duration-wave) cubic-bezier(0.4, 0, 0.2, 1) forwards; } .chat-card__loading div:nth-child(1) { animation-delay: 0s; } .chat-card__loading div:nth-child(2) { animation-delay: 0.15s; } .chat-card__loading div:nth-child(3) { animation-delay: 0.3s; } .chat-card__content-star { display: flex; gap: 4px; align-items: center; opacity: 0; animation: fade-in-slide-x var(--alp-review-chat-duration-fade) var(--alp-review-chat-delay-small) ease-in-out forwards; height: 19px; overflow: hidden; } .chat-card__content-star p { overflow: hidden; color: var(--alp-review-text-gray50); z-index: 10; } .chat-card__content-review { color: var(--alp-review-text-gray100); line-clamp: 2 !important; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2 !important; -webkit-box-orient: vertical; line-height: 1.4 !important; opacity: 0; animation: fade-in-slide-x calc(var(--alp-review-chat-duration-fade) + 0.05s) var(--alp-review-chat-delay-small) ease-in-out forwards; } .chat-card__content__review-wrapper { display: flex; flex-direction: column; justify-content: center; margin: auto 0; } .chat-card__content__review-wrapper > p { color: var(--alp-review-text-gray100); display: flex; align-items: center; flex-wrap: wrap; } .chat-card__content__review-wrapper > p > review-custom-icon { margin: -2px 0 0 0; animation: move-chat-arrow 1s ease-in-out infinite; } .chat-card__content__close-btn { background-color: var(--alp-review-icon-gray50); border-radius: 50%; padding: 4px; cursor: pointer; width: 28px; height: 28px; margin-top: auto; margin-bottom: auto; margin-left: 8px; opacity: 0; animation: fade-in-close-btn 0.5s 1.3s ease forwards; } .chat-badge { position: absolute; top: -0px; right: -9px; border-radius: 32px; background: var(--alp-review-icon-gray100); box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25); display: flex; padding: 4px 8px 4px 7px; justify-content: center; align-items: center; gap: 2px; overflow: hidden; color: var(--Text-White, #fff); text-overflow: ellipsis; font-family: Pretendard; font-size: 12px; font-style: normal; font-weight: 700; line-height: 140%; letter-spacing: -0.24px; } .empty-content { animation: fade-in-product 0.5s 1.5s ease forwards; } @keyframes chat-card-pre { from {width: 0px;height: 0px;overflow: hidden;opacity: 0;} to {width: 125px;height: 54px;overflow: visible;padding: 16px 18px 16px 18px;opacity: 1;} } @keyframes chat-loading-wave { 0% {opacity: 0;} 100% {opacity: 1;transform: translateY(0);} 50% {transform: translateY(calc(var(--alp-review-chat-wave-lift) * -1));} } @keyframes chat-card-grow { from {width: 125px;height: 54px;min-width: 125px;min-height: 54px;padding: 16px 18px 16px 18px;opacity: 1;} to {max-width: 320px;min-width: 200px;width: fit-content;height: fit-content;padding: 16px 18px 16px 18px;opacity: 1;} } @keyframes fade-in-close-btn { 0% {opacity: 0;transform: translateX(-10px);} 100% {opacity: 1;transform: translateX(0px);} } @keyframes chat-card-fade-out { from {opacity: 1;} to {opacity: 0;} } @keyframes fade-in-slide-x { from {opacity: 0;transform: translateX(calc(var(--alp-review-chat-slide-x) * -1));} to {opacity: 1;transform: translateX(0px);} } @keyframes move-chat-arrow { 0% {transform: translateX(5px);} 50% {transform: translateX(0px);} 100% {transform: translateX(5px);} } @keyframes fade-in-product { 0% {opacity: 0;} 100% {opacity: 1;} }</style>

      <div
        class="chat-card ${this.isFadeOutAnimating?"is-fadeout-anim":""} ${this.isFadedOut?"is-faded-out":""} ${this.hasFadedOut?"has-faded-out":""}"
      >
        
        <div class="chat-card__photo ${this.isActive?"is-active":""}">
          <div class="chat-card__photo__media">
            ${this.reviewCount?n:(()=>this.thumbnailReviewImg?Je`<review-review-media
            .reviewMedia=${this.review.ordered_media?.[0]}
            .type=${"review"}
          ></review-review-media>`:this.isVideo&&this.productImageUrl?Je`
          <img
            style="width:100%;height:100%;object-fit:cover;"
            src="${this.productImageUrl}"
            alt="product review image"
          />
          <review-custom-icon
            style="position: absolute; top:50%; left:50%; transform: translate(-50%, -50%);"
            .type=${ut}
          ></review-custom-icon>
        `:Je`<img
            style="width:100%;height:100%;object-fit:cover;"
            src="${te}/review-widget/empty-chat-review.png"
            alt="product review image"
          />`)()}
          </div>
          
          ${this.option.writer?Je`<p class="line-wrap alp-caption11 alp-medium">
                ${this.review.user_info||si.WIDGETS.CHAT.NON_MEMBER}
              </p>`:null}

          
          ${null===this.index?Je`<div class="chat-badge">
                <review-star-icon size="12" color="var(--alp-review-text-white)"></review-star-icon>
                ${this.reviewAvgRating}
              </div>`:null}
        </div>

        <div
          class="chat-card__content ${this.isStep1?"is-step1":""} 
          ${this.isStep2?"is-step2":""}"
        >
          ${this.reviewCount?Je` <div class="chat-card__content__review-wrapper">${r}</div>`:null}

          
          ${this.showContent&&i?Je`<div class="chat-card__content-star">
                
                ${this.option.ratings?t:null}

                
                ${this.option.product_option&&(this.review.product_option||this.review.product_option_json?.[0]?.option_value)?Je`<p class="line-wrap alp-caption11 alp-medium">
                      ${this.review.product_option??this.review.product_option_json?.[0]?.option_value}
                    </p>`:null}
              </div>`:null}
          ${this.showContent?Je`
                <p class="chat-card__content-review line-wrap alp-body14 alp-medium">
                  ${this.typedText}
                </p>
              `:o}
          ${this.isStep1?Je`
                <svg
                  class="chat-card-content-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 23"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.11119 12C7.11806 11.2557 7.11119 8.74536 7.11119 7.93011V0H24V22.4754C19.8306 22.4754 16.0141 21.1742 13.068 19.0176C10.1427 20.7648 5.53944 22.3799 0 21.4539C1.51873 20.8554 7.04643 19.0119 7.11119 12Z"
                    fill="#fff"
                  />
                </svg>
              `:null}
        </div>

        ${this.reviewCount&&this.isActive?Je`<div class="chat-card__content__close-btn" @click=${this.closeWidget}>
              <review-custom-icon
                .type="${Pt}"
                .width="${20}"
                .height="${20}"
                .color="${"#fff"}"
              />
            </div>`:null}
      </div>
    `}};Sa([i({type:String})],Ea.prototype,"productNo",2),Sa([i({type:Object})],Ea.prototype,"filterOption",2),Sa([i({type:Object})],Ea.prototype,"review",2),Sa([i({type:Object})],Ea.prototype,"option",2),Sa([i({type:Boolean,reflect:!0})],Ea.prototype,"isActive",2),Sa([i({type:String})],Ea.prototype,"reviewCount",2),Sa([i({type:Number})],Ea.prototype,"reviewAvgRating",2),Sa([i({type:Number})],Ea.prototype,"index",2),Sa([i({type:String})],Ea.prototype,"productImageUrl",2),Sa([i({type:Number})],Ea.prototype,"currentIndex",2),Sa([i({type:Boolean})],Ea.prototype,"isFadedOut",2),Sa([i({type:Number})],Ea.prototype,"typewriterSpeedMs",2),Sa([r()],Ea.prototype,"isStep1",2),Sa([r()],Ea.prototype,"isStep2",2),Sa([r()],Ea.prototype,"showContent",2),Sa([r()],Ea.prototype,"isFadeOutAnimating",2),Sa([r()],Ea.prototype,"hasFadedOut",2),Sa([r()],Ea.prototype,"typedIndex",2),Sa([r()],Ea.prototype,"typedText",2),Sa([r()],Ea.prototype,"isVideo",2),Sa([r()],Ea.prototype,"thumbnailReviewImg",2),Ea=Sa([ae("review-chat-card-type-b")],Ea);const Ra=ue`@keyframes alpBounceInUp{0%,60%,75%,90%,to{animation-timing-function:ease-in-out}0%{opacity:0;transform:translate3d(calc(var(--alp-bounce-up-start-x)*1),calc(var(--alp-bounce-up-start-y)*1),0)scale(.1)}30%{transform:scale(.9)}50%{opacity:1;transform:scale(1)}65%{transform:scale(.97)}80%{transform:scale(1)}to{transform:translate(0,0)}}@keyframes alpExpandWidth{0%{width:var(--alp-expand-start-width)}to{width:var(--alp-expand-end-width)}}@keyframes alpFadeUp{0%{opacity:0;transform:translateY(50%)}to{opacity:1;transform:translateY(0%)}}@keyframes alpFadeIn{0%{opacity:.5}to{opacity:1}}`,La=[Ni,Di,Ra,ue`:host{font-family:var(--alp-common-font-family);width:100%;min-width:440px;max-width:440px;top:var(--alp-chat-widget-position-top);right:var(--alp-chat-widget-position-right);left:var(--alp-chat-widget-position-left);bottom:var(--alp-chat-widget-position-bottom);max-height:var(--alp-chat-widget-max-height);padding:5px;padding-top:var(--alp-chat-widget-padding-top);z-index:var(--alp-chat-widget-z-index);display:block;overflow:hidden;position:fixed!important}.chat-widget{transform:translateY(var(--alp-chat-widget-translate-y));flex-direction:column;gap:20px;transition:transform .35s ease-in-out;display:flex}@media (width<=540px){:host{min-width:var(--alp-chat-widget-mobile-width);max-width:var(--alp-chat-widget-mobile-width);transform-origin:0 100%;left:6px;transform:scale(.85)}.chat-widget{width:100%}.chat-card__content{margin-left:16px}}`];var Ia=Object.defineProperty,Pa=Object.getOwnPropertyDescriptor,Ta=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Pa(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Ia(t,i,s),s};let Aa=class extends ht{constructor(){super(...arguments),this.widgetCode="",this.widgetSetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs="",this.totalCount=0,this.filterOption={page:1,page_size:10,product_no:"all",widget_code:"",device:"w"},this.isWidgetLoading=!0,this.isScrollLoading=!1,this.reviewList=[],this.currentIndex=0,this.showReviewCount=0,this.totalAvgRating=0,this.productTinyImage="",this.DESIGN_TYPE={A:1,B:2},this._onScrollOnce=null}async logAtDocumentY(e){if(0===e)return void(await this.initialWidget());const t=async()=>{this.isScrollLoading||(window.scrollY||document.documentElement.scrollTop||0)>=document.documentElement.scrollHeight*e/100&&(this.isScrollLoading=!0,await this.initialWidget(),window.removeEventListener("scroll",t),this._onScrollOnce=null)};window.addEventListener("scroll",t,{passive:!0}),this._onScrollOnce=t}async firstUpdated(e){super.firstUpdated(e),this.isDummy&&(this.filterOption.is_dummy=!0);try{await this.getWidgetOption(),this.logAtDocumentY(window?.ALPHA_PREVIEW?0:this.designOption.scroll_position??0)}catch(e){}}disconnectedCallback(){super.disconnectedCallback(),this._onScrollOnce&&(window.removeEventListener("scroll",this._onScrollOnce),this._onScrollOnce=null)}async initialWidget(){if(fa(rn))c(rn);else{this.productNo="PRODUCT_DETAIL"===await f()?v()||this.productNo:"all",this.filterOption.product_no=this.productNo||"all";try{await this.getReviewMeta(),await this.getReviewList(),z(this,this.customCss??""),W(this,this.customJs),window?.ALPHA_PREVIEW&&z(this,":host{position: absolute !important}"),this.startRolling()}catch(e){}}}async getReviewList(){const e={...this.filterOption};try{let t;t=window?.ALPHA_PREVIEW?this.previewData:await b(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0),this.reviewList=t}catch(e){}finally{this.isWidgetLoading=!1}}async getReviewMeta(){const e={...this.filterOption};try{let t;t=window?.ALPHA_PREVIEW?this.previewMeta:await x(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_meta_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0),t?.code&&j(t.code),this.totalCount=t.total_review_count,this.totalAvgRating=Number(t.avg_review_rating.toFixed(1)),this.productTinyImage=t?.product_tiny_image??""}catch(e){throw this.errorCode=F(e?.code),Error(e)}}async getWidgetOption(){try{let e;e=window?.ALPHA_PREVIEW?this.previewOption:await A(this.widgetCode,window.ALPHA_REVIEW_EMERGENCY?`/widget_option/${this.widgetCode}.json`:void 0),this.designOption=e,this.filterOption.widget_code=this.widgetCode,this.filterOption.page_size=this.designOption?.review_max??0,this.showReviewCount="mobile"===P()?this.designOption?.page_length_chat_m??0:this.designOption?.page_length_chat??0,B(this,{"--alp-chat-widget-padding-top":this.designOption.flow_chat===this.DESIGN_TYPE.A?"2px":"15px","--alp-chat-widget-z-index":this.designOption.z_index?.toString()??"0","--alp-chat-widget-max-height":120*this.showReviewCount-10+"px","--alp-chat-widget-position-right":"mobile"===P()?(this.designOption.position_m?.includes("right"),"none"):this.designOption.position?.includes("right")?this.designOption.x_axis+"px":"none","--alp-chat-widget-position-left":"mobile"===P()?(this.designOption.position_m?.includes("left"),"none"):this.designOption.position?.includes("left")?this.designOption.x_axis+"px":"none","--alp-chat-widget-position-top":this.designOption.position?.includes("top")||this.designOption.position_m?.includes("top")?("mobile"===P()?this.designOption.y_axis_m:this.designOption.y_axis)+"px":"none","--alp-chat-widget-position-bottom":this.designOption.position?.includes("bottom")||this.designOption.position_m?.includes("bottom")?("mobile"===P()?this.designOption.y_axis_m:this.designOption.y_axis)+"px":"none","--alp-chat-widget-mobile-width":"calc(100% - 10px)"})}catch(e){}}startRolling(){this._interval=setInterval(()=>{1!==this.reviewList.length?this.currentIndex!==this.reviewList.length?this.currentIndex=this.currentIndex+1:clearInterval(this._interval):this.currentIndex=2},1e3*(this.designOption.interval??1)),this.requestUpdate()}goToReviewPage(e,t,i,r){gn({reviewId:e,option:{...this.filterOption,product_no:t},reviewIndex:i,backupList:r})}render(){const e=120*(this.showReviewCount-1)-120*this.currentIndex;return this.isWidgetLoading||0===this.reviewList.length?null:!this.isWidgetLoading&&this.errorCode?V(this.errorCode,this.productNo,this.widgetSetCode||this.widgetCode,this.widgetCode):Je`
      <div
        class=${`chat-widget${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`}
        id=${this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode}
        style="--alp-chat-widget-translate-y: ${e}px;"
      >
        ${this.reviewList.map((e,t)=>this.designOption.flow_chat===this.DESIGN_TYPE.A?Je`
                <review-chat-card-type-a
                  .review=${e}
                  .filterOption=${this.filterOption}
                  .option=${this.designOption}
                  .productImageUrl="${this.productTinyImage}"
                  ?isActive=${this.currentIndex>=t}
                  ?isFadedOut=${this.currentIndex>=t+this.showReviewCount}
                  .index=${t}
                  @click=${()=>this.goToReviewPage(e?.id?.toString()??"",this.productNo,t,this.reviewList)}
                ></review-chat-card-type-a>
              `:Je`
                <review-chat-card-type-b
                  .review=${e}
                  .filterOption=${this.filterOption}
                  .option=${this.designOption}
                  .productImageUrl="${this.productTinyImage}"
                  ?isActive=${this.currentIndex>=t}
                  ?isFadedOut=${this.currentIndex>=t+this.showReviewCount}
                  .index=${t}
                  @click=${()=>this.goToReviewPage(e?.id?.toString()??"",this.productNo,t,this.reviewList)}
                ></review-chat-card-type-b>
              `)}
        
        ${this.designOption.flow_chat===this.DESIGN_TYPE.A?Je`
              <review-chat-card-type-a
                .productNo=${this.productNo}
                .reviewCount="${this.totalCount}"
                .reviewAvgRating="${this.totalAvgRating}"
                .productImageUrl="${this.productTinyImage}"
                ?isActive=${this.currentIndex>=this.reviewList.length}
              ></review-chat-card-type-a>
            `:Je`
              <review-chat-card-type-b
                .productNo=${this.productNo}
                .reviewCount="${this.totalCount}"
                .reviewAvgRating="${this.totalAvgRating}"
                .productImageUrl="${this.productTinyImage}"
                ?isActive=${!0}
              ></review-chat-card-type-b>
            `}
      </div>
    `}};Aa.styles=La,Ta([i({type:Object,attribute:"data-widget-preview-data"})],Aa.prototype,"previewData",2),Ta([i({type:Object,attribute:"data-widget-preview-option"})],Aa.prototype,"previewOption",2),Ta([i({type:Object,attribute:"data-widget-preview-meta"})],Aa.prototype,"previewMeta",2),Ta([i({type:String,attribute:"data-widget-code"})],Aa.prototype,"widgetCode",2),Ta([i({type:String,attribute:"data-widget-set-code"})],Aa.prototype,"widgetSetCode",2),Ta([i({type:String,attribute:"data-product-no"})],Aa.prototype,"productNo",2),Ta([i({type:String,attribute:"data-widget-custom-class"})],Aa.prototype,"widgetCustomClass",2),Ta([i({type:String,attribute:"data-widget-custom-id"})],Aa.prototype,"widgetCustomId",2),Ta([i({type:Boolean,attribute:"data-dummy"})],Aa.prototype,"isDummy",2),Ta([i({type:String,attribute:"data-custom-class"})],Aa.prototype,"customClass",2),Ta([i({type:String,attribute:"data-custom-id"})],Aa.prototype,"customId",2),Ta([i({type:String,attribute:"data-custom-css"})],Aa.prototype,"customCss",2),Ta([i({type:String,attribute:"data-custom-js"})],Aa.prototype,"customJs",2),Ta([r()],Aa.prototype,"totalCount",2),Ta([r()],Aa.prototype,"filterOption",2),Ta([r()],Aa.prototype,"designOption",2),Ta([r()],Aa.prototype,"isWidgetLoading",2),Ta([r()],Aa.prototype,"isScrollLoading",2),Ta([r()],Aa.prototype,"reviewList",2),Ta([r()],Aa.prototype,"currentIndex",2),Ta([r()],Aa.prototype,"showReviewCount",2),Ta([r()],Aa.prototype,"totalAvgRating",2),Ta([r()],Aa.prototype,"productTinyImage",2),Aa=Ta([ae(rn)],Aa);const Na=[Ni,Di,ue`:host{display:block}`];var Da=Object.defineProperty,Ma=Object.getOwnPropertyDescriptor,Wa=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Ma(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Da(t,i,s),s};let za=class extends(wn(ht)){constructor(){super(...arguments),this.widgetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs="",this.filterOption={page:1,page_size:10,product_no:"all",widget_code:"",device:"pc"===P()?"w":"m"},this.isDesignLoading=!0,this.isWidgetLoading=!0,this.safe=""}async updated(e){if(super.updated(e),e.has("isInViewport")){if(!this.isInViewport)return;this.isDummy&&(this.filterOption.is_dummy=!0),this.productNo="PRODUCT_DETAIL"===await f()?v()||this.productNo:"all",this.filterOption.product_no=this.productNo;try{await this.getWidgetOption(),await this.getReviewList(),z(this,this.customCss??"")}catch(e){}}}disconnectedCallback(){super.disconnectedCallback()}async getReviewList(){const e={...this.filterOption};try{let t;t=window?.ALPHA_PREVIEW?this.previewData:await b(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0);const{widget_header:i}=t;this.safe=i??"",W(this,this.customJs)}catch(e){}finally{this.isWidgetLoading=!1}}async getWidgetOption(){try{let e;e=window?.ALPHA_PREVIEW?this.previewOption:await A(this.widgetCode,window.ALPHA_REVIEW_EMERGENCY?`/widget_option/${this.widgetCode}.json`:void 0),this.designOption=e,this.filterOption.widget_code=this.widgetCode}catch(e){}finally{this.isDesignLoading=!1}}render(){return this.isWidgetLoading||!this.safe?null:Je`
      <div class=${`custom-editor-widget${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`} id=${`widget-${this.widgetCode} widget_header${this.customId?" "+this.customId:""}${this.widgetCustomId?" "+this.widgetCustomId:""}`}>
        <review-header-title
          .designOption=${this.designOption}
          .widgetCode=${this.widgetCode}
        ></review-header-title>

        <div class="editor-content">
          <review-notice-sandbox .content=${this.safe}></review-notice-sandbox>
        </div>
      </div>
    `}};za.styles=Na,Wa([i({type:Object,attribute:"data-widget-preview-data"})],za.prototype,"previewData",2),Wa([i({type:Object,attribute:"data-widget-preview-option"})],za.prototype,"previewOption",2),Wa([i({type:Object,attribute:"data-widget-preview-meta"})],za.prototype,"previewMeta",2),Wa([i({type:String,attribute:"data-widget-code"})],za.prototype,"widgetCode",2),Wa([i({type:String,attribute:"data-product-no"})],za.prototype,"productNo",2),Wa([i({type:String,attribute:"data-widget-custom-class"})],za.prototype,"widgetCustomClass",2),Wa([i({type:String,attribute:"data-widget-custom-id"})],za.prototype,"widgetCustomId",2),Wa([i({type:Boolean,attribute:"data-dummy"})],za.prototype,"isDummy",2),Wa([i({type:String,attribute:"data-custom-class"})],za.prototype,"customClass",2),Wa([i({type:String,attribute:"data-custom-id"})],za.prototype,"customId",2),Wa([i({type:String,attribute:"data-custom-css"})],za.prototype,"customCss",2),Wa([i({type:String,attribute:"data-custom-js"})],za.prototype,"customJs",2),Wa([r()],za.prototype,"filterOption",2),Wa([r()],za.prototype,"designOption",2),Wa([r()],za.prototype,"isDesignLoading",2),Wa([r()],za.prototype,"isWidgetLoading",2),Wa([r()],za.prototype,"safe",2),za=Wa([ae("review-custom-editor-widget")],za);const ja=hs(class extends gs{constructor(){super(...arguments),this.key=Xe}render(e,t){return this.key=e,t}update(e,[t,i]){return t!==this.key&&(Gs(e),this.key=t),i}}),Va=[Ni,Di,ue`:host{z-index:99999999;background:#00000079;width:100vw;height:100vh;display:block;top:0;left:0;position:fixed!important}.detail-popup-container{width:100%;height:100%;display:flex}.detail-popup-mobile-header{background:var(--alp-review-bg-white);border-bottom:.5px solid var(--Border-Gray20,#1e293b33);z-index:99999999;justify-content:center;align-items:center;width:100%;padding:14px 0;display:none;position:relative;top:0;left:0;position:fixed!important}.detail-popup-mobile-header>review-custom-icon{position:absolute;top:50%;right:20px;transform:translateY(-50%)}.detail-popup-media{flex-direction:column;width:calc(100% - 400px);display:flex}.detail-popup-media__current{justify-content:center;align-items:center;width:100%;height:calc(100% - 110px);padding:20px;display:flex}.detail-popup-media__current img,.detail-popup-media__current video{width:auto;max-width:100%;height:auto;max-height:100%}.detail-popup-media__current .swiper-slide{height:100%!important}.detail-popup-media__preview{box-sizing:border-box;gap:8px;max-width:100%;margin-top:auto;margin-left:auto;margin-right:auto;padding:25px 20px;display:flex;overflow:hidden;& img,& video{width:100%;height:100%}}.detail-popup-media__preview-item{cursor:pointer;opacity:.6;min-width:60px;max-width:60px;min-height:60px;max-height:60px;&.is-active{outline:3px solid var(--alp-common-color);opacity:1}}.detail-popup-media__empty{flex-direction:column;justify-content:center;align-items:center;gap:30px;width:100%;height:100%;display:flex;& p{color:var(--alp-review-text-white);text-align:center!important}}.detail-popup-content{background:var(--alp-review-bg-white);flex-direction:column;min-width:400px;max-width:400px;display:flex;position:relative}.detail-popup-content__inner{height:calc(100% - 194px);padding-bottom:40px;overflow:hidden auto;&::-webkit-scrollbar{display:none}}.detail-popup-product{background:var(--alp-review-bg-white);border-bottom:.5px solid var(--alp-review-border-gray20);align-items:center;gap:13px;padding:16px 16px 20px;display:flex}.detail-popup-product>review-review-media{border-radius:50%;min-width:36px;max-width:36px;min-height:36px;max-height:36px}.detail-popup-product__name{cursor:pointer;flex-direction:column;display:flex}.detail-popup-product__name.is-disabled{cursor:default}.detail-popup-product__name>p:nth-child(2){color:var(--alp-review-text-gray50)}.detail-popup-product__close{background:var(--alp-review-bg-gray05);cursor:pointer;border-radius:50%;margin-left:auto;padding:4px}.detail-popup-rating{flex-direction:column;gap:12px;padding:28px 20px 0;display:flex}.detail-popup-rating__star{align-items:center;display:flex}.detail-popup-rating__user-info{gap:4px;display:flex}.detail-popup-rating__badge{flex-wrap:wrap;gap:4px;margin-top:20px;margin-bottom:16px;padding:0 20px;display:flex}.detail-popup-rating__content{background:var(--alp-review-bg-white);margin-top:16px;padding:0 20px 32px}.detail-popup-rating__content .review-content-text{white-space:pre-line}.detail-popup-rating__content-more{cursor:pointer;color:var(--alp-review-gray50,#1e293b80);align-items:center;margin-top:12px;display:flex}.detail-popup-rating__button{background:var(--alp-review-bg-white);align-items:center;padding:0 20px 12px;display:flex;& review-like-button{margin-right:auto}}.detail-popup-rating__keyword{flex-wrap:wrap;gap:4px;padding:0 20px 16px;display:flex}.detail-popup-rating__comment{background:var(--alp-review-bg-gray05);flex-direction:column;gap:12px;padding:16px 20px;display:flex}.detail-popup-rating__comment>p{color:var(--alp-review-text-gray60)}.detail-popup-review-list{background:var(--alp-review-bg-white);border-top:.5px solid var(--alp-review-border-gray20);flex-direction:column;gap:16px;padding:32px 20px 10px;display:flex;position:relative}.detail-popup-review-list>.swiper-container{max-width:400px}.detail-popup-review-list .swiper-slide.is-active{border:4px solid var(--alp-common-color);overflow:hidden}.detail-popup-review-list review-review-media{width:100%;height:100%;max-height:118px}.detail-popup-review-list:after{content:"";background:var(--alp-review-bg-white);z-index:10;width:20px;height:140px;position:absolute;bottom:0;left:0}.detail-popup-review-list:before{content:"";background:var(--alp-review-bg-white);z-index:10;width:20px;height:140px;position:absolute;bottom:0;right:0}.detail-popup-footer{background:var(--alp-review-bg-white);z-index:1;position:absolute;bottom:0;left:0;right:0}.detail-popup-pagination{background:var(--alp-review-bg-white);border-top:.5px solid var(--alp-review-border-gray20);grid-template-columns:1fr 1fr;display:grid;&>div{cursor:pointer;color:var(--alp-review-gray-100);align-items:center;padding:12px 20px 20px;display:flex;&.is-disabled{color:var(--alp-review-text-gray40)}}&>div:first-child{border-right:.5px solid var(--alp-review-border-gray20)}&>div:nth-child(2){justify-content:flex-end}}.detail-popup-purchase{background:var(--alp-review-bg-white);align-items:center;gap:8px;padding:12px 20px;display:flex;box-shadow:0 -4px 12px #0000001a;&>button{cursor:pointer;border-radius:6px;flex:1 0 0;min-width:0;padding:10px 24px}}.detail-popup-purchase__outline{border:1px solid var(--alp-review-border-gray100);color:var(--alp-review-text-gray100);background:0 0}.detail-popup-purchase__buy{color:#fff;border:none}.detail-popup-purchase>button.is-disabled{opacity:.4;cursor:not-allowed}.story-popup-container .swiper-slide{visibility:hidden}.story-popup-container .swiper-slide.swiper-slide-active{visibility:visible}@media (width<=840px){:host{padding-bottom:calc(56px + env(safe-area-inset-bottom));box-sizing:border-box;height:calc(100% + env(safe-area-inset-bottom));background:var(--alp-review-bg-white);overflow-y:scroll}.detail-popup-container{flex-direction:column;padding-top:48px}.detail-popup-mobile-header{display:flex}.detail-popup-product__close{display:none}.detail-popup-content__inner{box-sizing:border-box;height:100%;padding-bottom:120px;overflow-y:visible!important}.detail-popup-rating{gap:6px;padding:28px 16px 0}.detail-popup-rating__badge{padding:0 16px}.detail-popup-rating__content{padding:0 16px 32px}.detail-popup-rating__button{padding:0 10px 12px}.detail-popup-media{background:var(--alp-review-scrim-black90);width:100%}.detail-popup-media__current{height:100%;padding:0}.detail-popup-media__current img,.detail-popup-media__current video{width:100%;height:auto}.detail-popup-media__preview{margin:0 10px;padding:17px 5px;overflow:clip}.detail-popup-content{min-width:100%;max-width:100%;height:100%}.detail-popup-review-list{opacity:0;height:0;padding-bottom:calc(20px + env(safe-area-inset-bottom));overflow:hidden;& .swiper-container{max-width:100%}}.detail-popup-footer{position:fixed!important}.detail-popup-purchase{padding-bottom:calc(16px + env(safe-area-inset-bottom))}.detail-popup-review-list__item review-review-media{aspect-ratio:1}.detail-popup-rating__comment>p,.detail-popup-rating__content .review-content-text{line-height:1.6!important}.detail-popup-media__current .swiper-slide{height:auto!important}}`],Fa=e=>!0===e||"T"===e,Ba=e=>!1===e||"F"===e,Ua=new Set(["N","M","O","D"]),Ha=e=>window[e],Ga=()=>{const e="aProductPurchaseInfo_"+Ha("iProductNo");return Ha("EC_FRONT_JS_CONFIG_SHOP")?.[e]},qa=e=>{const t=Number(e);return Number.isFinite(t)&&t>0?t:null};var Ya=Object.defineProperty,Ka=Object.getOwnPropertyDescriptor,Za=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Ka(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Ya(t,i,s),s};let Ja=class extends ht{constructor(){super(...arguments),this.widgetCode="widget-detail-popup",this.reviewId=0,this.reviewIndex=0,this.backupList=[],this.reviewList=[],this.checkPageList=[],this.currentMediaIndex=0,this.currentReviewIndex=0,this.totalPage=0,this.totalCount=0,this.isCommentOpen=!1,this.isMoreOpen=!0,this.isPopupLoading=!0,this.reviewLoading=!0,this.mall_id="\uc1fc\ud551\ubab0",this.device="pc",this.pageType="ALL",this.baseProductNo="",this.purchaseState="unverified",this.isPurchasing=!1,this.secretLinkState="unknown",this.secretLinkPending=Promise.resolve(),this.rawProduct=null,this.catalog=null,this.isExecuting=!1,this.isOptionDialogOpen=!1,this.resizeCtrl=new zr(this,e=>this.device=e),this.previousSwiperIndex=0,this.commentTagText=si.WIDGETS.DETAIL_POPUP.COMMENT_TAG,this.moreText=si.WIDGETS.DETAIL_POPUP.MORE,this.lessText=si.WIDGETS.DETAIL_POPUP.LESS,this.otherReviewText=si.WIDGETS.DETAIL_POPUP.OTHER_REVIEWS,this.nextButtonText=si.WIDGETS.DETAIL_POPUP.NEXT,this.prevButtonText=si.WIDGETS.DETAIL_POPUP.PREV,this.cartButtonText=si.WIDGETS.DETAIL_POPUP.CART,this.buyButtonText=si.WIDGETS.DETAIL_POPUP.BUY,this.productDetailButtonText=si.WIDGETS.DETAIL_POPUP.VIEW_PRODUCT_DETAIL,this.soldOutButtonText=si.WIDGETS.DETAIL_POPUP.SOLD_OUT}async firstUpdated(e){super.firstUpdated(e),window?.ALPHA_REVIEW_EMERGENCY&&(this.reviewList=this.backupList);const t={...this.option,detail:!0,page_size:5,page:Math.ceil((this.reviewIndex+1)/5)};this.option=t,this.designOption=window.ALPHA_REVIEW_SHOP_DESIGN_OPTION;try{await this.getReviewMeta(),await Promise.all([this.getReviewDetail(this.reviewId),this.getReviewPaginationList()]),this.currentReviewIndex=this.reviewList.findIndex(e=>e?.id===this.reviewId),this.mall_id=(await m()).mall_id,this.pageType=await f()??"ALL",this.checkPageList=[this.option.page],await this.loadBaseProduct(),await this.secretLinkPending,this.isPopupLoading=!1,await this.updateComplete,this.initializeSwiper(this.currentReviewIndex),this.initializePreviewSwiper(),this.initializeCurrentMediaSwiper()}catch(e){Wi.closeByUi("review-detail-popup")}finally{W(this,this.designOption?.detail_custom_js??""),z(this,this.designOption?.detail_custom_css??"")}}productNoOf(e){const t=this.reviewList.find(t=>t?.id===e)??this.backupList.find(t=>t?.id===e);return t?.product?.product_no}async getReviewDetail(e){if(t("widget_detail_impression",{review_id:e,product_no:this.productNoOf(e)}),window?.ALPHA_REVIEW_EMERGENCY)return this.currentReview=this.backupList[this.currentReviewIndex],void(this.reviewLoading=!1);this.reviewLoading=!0;try{this.currentReview=await async function(e,t){try{const{mall_id:i,shop_no:r}=await m(),o={mall_id:i,shop_no:r};if(t&&(o.is_dummy="true"),!i)throw Error("[ALPHA-REVIEW] mall_id\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");if(!r)throw Error("[ALPHA-REVIEW] shop_no\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");if(0===e)throw Error("[ALPHA-REVIEW] review_id\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");return await or.get("/v2/api-widget/reviews/"+e,{query:o})}catch(e){throw e}}(e,this.option?.is_dummy),this.isMoreOpen=(this.currentReview?.content?.length??0)<1e3,this.previewSwiper?.destroy(),this.initializePreviewSwiper(),this.initializeCurrentMediaSwiper(),this.scrollToTop(),this.secretLinkPending=this.loadSecretLinkState()}catch(e){}finally{this.reviewLoading=!1}}async loadSecretLinkState(){const e=this.currentReview?.product?.product_no??"";if(this.secretLinkState="unknown",this.isProductLinkBlockedByShop)return;const t=await M(e);e===(this.currentReview?.product?.product_no??"")&&(this.secretLinkState=t)}async getReviewMeta(){if(window?.ALPHA_REVIEW_EMERGENCY)return this.totalCount=this.backupList.length,void(this.totalPage=Math.ceil(this.totalCount/this.option.page_size));const{total_page:e,total_count:t}=await x(this.option);this.totalCount=t;const i=Math.ceil(this.totalCount/this.option.page_size);this.totalPage=e?e<=i?i:e:i}async getReviewPaginationList(){if(!window?.ALPHA_REVIEW_EMERGENCY)try{const e=await async function(e){return await or.get("/v2/api-widget/reviews/more",{query:e})}(this.option);this.reviewList=[...e]}catch(e){}finally{this.requestUpdate()}}closeDom(e){e.stopPropagation(),e.preventDefault(),Wi.closeByUi("review-detail-popup")}toggleComment(){0!==this.currentReview?.comments?.length&&(this.isCommentOpen=!this.isCommentOpen)}async onChangeCurrentReview(e){this.currentReviewIndex=e,this.currentMediaIndex=0,this.reviewSwiper?.slideTo(e),await this.getReviewDetail(this.reviewList[this.currentReviewIndex].id)}async onChangePrevReview(){this.reviewLoading||1===this.option.page&&0===this.currentReviewIndex||(0===this.currentReviewIndex?(this.option.page=this.option.page-1,await this.getReviewPaginationList(),this.currentReviewIndex=this.reviewList.length-1,this.reviewSwiper?.slideTo(this.currentReviewIndex)):(this.currentReviewIndex=this.currentReviewIndex-1,this.reviewSwiper?.slidePrev()),this.currentMediaIndex=0,await this.getReviewDetail(this.reviewList[this.currentReviewIndex].id))}async onChangeNextReview(){this.reviewLoading||this.option.page===this.totalPage&&this.currentReviewIndex===this.reviewList.length-1||(this.currentReviewIndex===this.reviewList.length-1?(this.option.page=this.option.page+1,await this.getReviewPaginationList(),this.currentReviewIndex=0,this.reviewSwiper?.slideTo(this.currentReviewIndex)):(this.currentReviewIndex=this.currentReviewIndex+1,this.reviewSwiper?.slideNext()),this.currentMediaIndex=0,await this.getReviewDetail(this.reviewList[this.currentReviewIndex].id))}goToProductPage(e){e&&"all"!==e&&pn(e)}async loadBaseProduct(){if(!this.isPurchaseSupported)return;if(this.baseProductNo=window.iProductNo??"",!this.baseProductNo)return;if(function(){if(!0!==Ha("EC_FRONT_JS_CONFIG_SHOP")?.bRegularConfig)return!1;const e=document.querySelector(".EC_regular_delivery:checked");return"T"===e?.value}())return;const e=await H(this.baseProductNo);if(!e.ok)return;this.rawProduct=e.product;const t=this.readViewer();this.purchaseState=G(e.product,t)??"ok"}readViewer(){return{isLogin:!0===window.CAPP_ASYNC_METHODS?.IS_LOGIN,native:q()??void 0}}get isPurchaseSupported(){return"PRODUCT_DETAIL"===this.pageType&&"cafe24"===window.ALPHA_REVIEW_HOST}get isProductLinkBlockedByShop(){return"cafe24"===window.ALPHA_REVIEW_HOST&&!1===this.designOption?.detail_show_product_link}get isPurchaseAllowedByShop(){return"cafe24"!==window.ALPHA_REVIEW_HOST||!1!==this.designOption?.detail_show_purchase_btn}get showPurchaseButtons(){return"ok"===this.purchaseState||"sold-out"===this.purchaseState}get canRouteToProduct(){const e=this.currentReview?.product?.product_no?.toString()??"";return!(!e||"all"===e||this.isProductLinkBlockedByShop||"searchable"!==this.secretLinkState)}onClickCart(){t("widget_review_to_cart",{review_id:this.currentReview?.id,product_no:Number(this.baseProductNo)}),this.startPurchase("cart")}onClickBuy(){t("widget_review_to_purchase",{review_id:this.currentReview?.id,product_no:Number(this.baseProductNo)}),this.startPurchase("buy")}async startPurchase(t){if(this.isPurchaseAllowedByShop&&"ok"===this.purchaseState&&!this.isPurchasing&&!function(){const e=Ga();if(!1!==e?.bIsSuccess)return!1;const t=Ha("PRODUCTSUBMIT");return"function"==typeof t?.sendLoginPage?(t.sendLoginPage(),!0):(e.sMessage&&alert(e.sMessage),!0)}()){this.isPurchasing=!0;try{const i=await e().catch(()=>null);if(!i)return void alert(si.WIDGETS.DETAIL_POPUP.PURCHASE_ERROR.COMMON_LOAD_FAILED);const r=this.ensureCatalog(i);if(!r)return;if(0===r.sections.length&&0===r.additionalOptions.length)return void(await this.execute(t,i,r,{},[]));this.openOptionDialog(t,i,r)}finally{this.isPurchasing=!1}}}ensureCatalog(e){return this.catalog?this.catalog:this.rawProduct?(this.catalog=e.fromCafe24Rest(this.rawProduct,this.rawProduct.use_inventory),this.catalog):null}async verifyBeforeExecute(e,t,i,r,o){const s=await H(this.baseProductNo);if(!s.ok)return alert(T(s.reason,"fetch")),!1;const n=G(s.product);if(n){this.purchaseState=n,this.rawProduct=s.product,this.catalog=null,o?.();const e=si.WIDGETS.DETAIL_POPUP.PURCHASE_ERROR;return alert("sold-out"===n?e.PRODUCT_SOLD_OUT:e.PRODUCT_UNAVAILABLE),!1}const a=function(e,t,i,r){const o=(e=>Array.isArray(e.variants)?e.variants:[])(t),s={use_inventory:t.use_inventory??i.use_inventory},n=t=>t?e.variantSellableReject(t,s)?{ok:!1,reason:"not-sellable"}:{ok:!0}:{ok:!1,reason:"no-matching-variant"},a=e=>o.find(t=>(t.variant_code??"")+""===e);switch(r.kind){case"variant":return n(a(r.variant_code));case"variants":for(const e of r.variant_codes){const t=n(a(e));if(!t.ok)return t}return{ok:!0};case"linked":case"none":return n(o[0])}}(t,s.product,i,r);return a.ok?"cart"!==e||!this.hasSoldOutInNativeUI(r)||(alert(si.WIDGETS.DETAIL_POPUP.PURCHASE_ERROR.NOT_SELLABLE),!1):(alert(T(a.reason)),!1)}hasSoldOutInNativeUI(e){return("variant"===e.kind?[e.variant_code]:"variants"===e.kind?e.variant_codes:[]).some(e=>function(e,t){if(!t)return!1;const i=document.querySelector(`select[option_product_no="${e}"]`)?.parentElement??document.querySelector(`ul[option_product_no="${e}"]`)?.parentElement;if(!i)return!1;const r=i.querySelector(`li[option_value="${Y(t)}"]`);if(r)return r.classList.contains("ec-product-soldout")||r.classList.contains("ec-product-disabled");const o=i.querySelector(`option[value="${Y(t)}"]`);return!!o&&o.disabled}(this.baseProductNo,e))}get dialogProduct(){const e=this.rawProduct,t=this.currentReview?.product,i=!!e&&(t?.product_no??"")+""==e.product_no+"";return{name:e?.product_name||(i?t?.product_name??"":""),image:e?.detail_image||e?.list_image||(i?t?.detail_image??"":""),preselectVariantCode:i?this.currentReview?.variant_code??"":""}}openOptionDialog(e,t,i){const r="review-option-dialog";if(this.isOptionDialogOpen)return;this.isOptionDialogOpen=!0;const o=this.dialogProduct,s=d(r,{type:"overlay",initialProps:{catalog:i,common:t,mode:e,productName:o.name,productImage:o.image,basePrice:this.rawProduct?K(this.rawProduct):0,preselectVariantCode:o.preselectVariantCode}}),n=()=>Wi.closeByUi(r);s?.addEventListener("review:optionClose",n),s?.addEventListener("review:optionSubmit",r=>{if(this.isExecuting)return;const{picked:o,additionalValues:a}=r.detail,p=e=>{s.executing=e};p(!0),this.execute(e,t,i,o,a,n).finally(()=>p(!1))}),Wi.open({key:r,onClose:()=>{this.isOptionDialogOpen=!1,c(r)}})}async execute(e,t,i,r,o,s){if(!this.isExecuting){this.isExecuting=!0;try{const n=t.validateAdditionalOptions(i,o);if(!n.ok)return void alert(T(n.reason));const a=t.resolveSlot(i,r);if(!a.ok)return void alert(T(a.reason));if(!(await this.verifyBeforeExecute(e,t,i,a.slot,s)))return;"cart"===e?await this.addToCart(t,i,a.slot,o,s):await this.directOrder(t,i,a.slot,o)}finally{this.isExecuting=!1}}}async addToCart(e,t,i,r,o){const s=N();if(!s)return void alert(si.WIDGETS.DETAIL_POPUP.PURCHASE_ERROR.NO_CLIENT);const n=e.buildCartLines(t,i,1,{additionalOptions:t.additionalOptions.map((e,t)=>({name:e.name,value:r[t]??""}))}),a=function(){const e=document.querySelector("#delivery_cost_prepaid_channel > li.selected");return e?.getAttribute("data-value")||document.querySelector("#delivery_cost_prepaid")?.value||"P"}(),p=await e.addCartRaw(s,n,{emitEvents:!0,basketType:Ha("basket_type")||"A0000",prepaidShippingFee:a});if(!p.ok){if("shipping-fee-conflict"===p.reason){const e=si.WIDGETS.DETAIL_POPUP.PURCHASE_ERROR;return void alert("C"===a?e.SHIPPING_FEE_CONFLICT_PREPAID:e.SHIPPING_FEE_CONFLICT_COLLECT)}return void alert(T(p.reason))}if(o?.(),!confirm(si.WIDGETS.DETAIL_POPUP.CART_SUCCESS_CONFIRM))return;const l=D();location.href=(1===Number(l)?"":"/shop"+l)+"/order/basket.html"}async directOrder(e,t,i,r){const o=await e.requestDirectOrder(t,i,{flush:"all",guard:e.upsellGuard,sessionId:"alpha-review-"+(this.currentReview?.id??0),additionalOptionValues:r});if(o.ok)return;if(e.isDegradeReason(o.reason))return void pn(this.baseProductNo);const s=o.flushed?si.WIDGETS.DETAIL_POPUP.PURCHASE_ERROR.SELECTION_CLEARED:"";alert(T(o.reason)+s)}scrollToTop(){document.querySelector("review-detail-popup")?.scrollTo({top:0,behavior:"smooth"})}async initializeSwiper(e){this.previousSwiperIndex=e,this.reviewSwiper=n({container:this.shadowRoot.querySelector("#sw-detail-popup-review-"+this.widgetCode),styleRoot:this.shadowRoot,options:{freeMode:{enabled:!0},slidesPerView:"3",slidesPerGroup:1,spaceBetween:3,initialSlide:e,longSwipes:!1}}),this.reviewSwiper.slideTo(e)}async initializePreviewSwiper(){this.previewSwiper=n({container:this.shadowRoot.querySelector("#sw-detail-popup-media-preview-"+this.widgetCode),styleRoot:this.shadowRoot,options:{freeMode:{enabled:!1},slidesPerView:"auto",spaceBetween:6,longSwipes:!1}})}async initializeCurrentMediaSwiper(){this.currentMediaSwiper=n({container:this.shadowRoot.querySelector("#sw-detail-popup-media-current-"+this.widgetCode),styleRoot:this.shadowRoot,options:{freeMode:{enabled:!1},slidesPerView:"auto",spaceBetween:0,longSwipes:!1,loop:!1,autoHeight:!0,allowTouchMove:!1},event:{slideChangeTransitionStart:()=>this.pauseAllCurrentMediaVideos(),slideChangeTransitionEnd:()=>this.playActiveCurrentMediaVideo()}}),await this.updateComplete,this.playActiveCurrentMediaVideo()}pauseAllCurrentMediaVideos(){this.shadowRoot?.querySelectorAll(`#sw-detail-popup-media-current-${this.widgetCode} video`).forEach(e=>{try{e.pause()}catch{}})}playActiveCurrentMediaVideo(){const e=this.shadowRoot?.querySelector(`#sw-detail-popup-media-current-${this.widgetCode} .swiper-slide-active video`);e&&(e.muted=!0,e.playsInline=!0,e.play().catch(()=>{}))}purchaseArea(){if("cafe24"!==window.ALPHA_REVIEW_HOST)return null;if(this.isPurchaseSupported){if(!this.isPurchaseAllowedByShop)return null;if(!this.showPurchaseButtons)return null;const e="sold-out"===this.purchaseState,t=e||this.isPurchasing,i=e?this.soldOutButtonText:this.buyButtonText;return Je`
        <div class="detail-popup-purchase">
          <button
            class="detail-popup-purchase__outline alp-body16 alp-semi-bold ${t?"is-disabled":""}"
            ?disabled=${t}
            @click=${this.onClickCart}
          >
            ${e?this.soldOutButtonText:this.cartButtonText}
          </button>
          <button
            class="detail-popup-purchase__buy alp-body16 alp-semi-bold ${t?"is-disabled":""}"
            style=${vs({background:this.designOption?.primary_color??"var(--alp-common-color)"})}
            ?disabled=${t}
            @click=${this.onClickBuy}
          >
            ${i}
          </button>
        </div>
      `}return this.canRouteToProduct?Je`
      <div class="detail-popup-purchase">
        <button
          class="detail-popup-purchase__outline alp-body16 alp-semi-bold"
          @click=${()=>this.goToProductPage(this.currentReview?.product?.product_no?.toString()??"")}
        >
          ${this.productDetailButtonText}
        </button>
      </div>
    `:null}emptyPcMediaBox(e=si.WIDGETS.DETAIL_POPUP.EMPTY_MEDIA,t="white"){return Je` <div class="detail-popup-media__empty">
      <p
        class="alp-body15 alp-line15 alp-semi-bold"
        style="white-space: pre-line; color: ${"white"===t?"var(--alp-review-text-white)":"var(--alp-review-text-gray100)"};"
      >
        ${e}
      </p>
    </div>`}pcMediaBox(){return Je`<div
        class="swiper-container detail-popup-media__current"
        id="sw-detail-popup-media-current-${this.widgetCode}"
        style="overflow: hidden;"
      >
        <div class="swiper-wrapper" style="max-height:100%;">
          ${this.currentReview.ordered_media?.map(e=>{const t=I(e.video_url||e.thumbnail_video_url),i=I(e?.photo_platform_url||e?.photo_url);return Je` <div class="swiper-slide detail-popup-media__current">
              ${t?ja(t,Je`<video
                      aria-label="product review video"
                      muted
                      playsinline
                      loop
                      @loadedmetadata=${()=>{this.currentMediaSwiper?.updateAutoHeight()}}
                    >
                      <source src="${t}"/>
                    </video>`):Je`<img loading="lazy" src="${i}" alt="product review image" />`}
            </div>`})}
        </div>
      </div>

      ${(this.currentReview?.ordered_media?.length??0)>1?Je` <div
            class="swiper-container detail-popup-media__preview"
            id="sw-detail-popup-media-preview-${this.widgetCode}"
          >
            <div class="swiper-wrapper">
              ${this.currentReview?.ordered_media?.map((e,t)=>{const i=I(e?.thumbnail_photo_platform_url||e?.thumbnail_photo_url),r=I(e?.video_url||e?.thumbnail_video_url);return Je`<div
                  class="swiper-slide detail-popup-media__preview-item ${t===this.currentMediaIndex?"is-active":""}"
                  @click=${()=>{this.currentMediaIndex=t,this.currentMediaSwiper?.slideTo(t)}}
                >
                  ${r?ja(r,Je`<video aria-label="product review video">
                          <source src="${r}"/>
                        </video>`):Je`<img src="${i}" alt="product review image" />`}
                </div>`})}
            </div>
          </div>`:null} `}render(){if(this.isPopupLoading)return Je`<div style="width: 100%; height: 100%; display: flex; ">
        <div
          style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;"
        >
          <review-loading-review
            style="opacity: 0.5;"
            .spinnerSize=${"pc"===P()?300:240}
            .color=${"pc"===P()?"var(--alp-review-text-white)":"var(--alp-review-text-gray60)"}
          ></review-loading-review>
        </div>
        ${"pc"===P()?Je` <div
              style="min-width: 400px;max-width: 400px; height: 100%; background:var(--alp-review-bg-white);"
            >
              <img
                style="width: 100%; "
                src="https://s3.ap-northeast-2.amazonaws.com/core.front.static/review-widget/empty-review-detail-content.png"
                alt="skeleton review detail content"
              />
            </div>`:null}
      </div>`;const e="pc"===this.device||"pc"!==this.device&&this.currentReview?.ordered_media?.length&&this.currentReview?.ordered_media?.length>0&&this.currentReview?.ordered_media?.length>0,t=this.currentReview?.ordered_media?.length&&this.currentReview?.ordered_media?.length>0,i=this.designOption?.detail_show_product_option&&(!!this.currentReview?.product_option||!!this.currentReview?.product_option_json?.[0]?.option_value),r=this.designOption?.detail_show_ratings||this.designOption?.detail_show_survey||this.designOption?.detail_show_writer||this.designOption?.detail_show_created_at;return Je`
      <div class="detail-popup-container" id="detail-popup-${this.widgetCode}">
        <div class="detail-popup-mobile-header">
          <p class="alp-body18 alp-bold">${oi()?"Review Detail":"\ub9ac\ubdf0 \uc0c1\uc138"}</p>

          <review-custom-icon
            @click=${e=>this.closeDom(e)}
            .type="${Pt}"
            .width="${"28"}"
            .height="${"28"}"
            .color=${"var(--alp-review-icon-gray100)"}
          ></review-custom-icon>
        </div>

        
        ${e?Je`
              <div class="detail-popup-media">
                ${t?this.pcMediaBox():this.emptyPcMediaBox()}
              </div>
            `:null}

        
        <div class="detail-popup-content">
          
          <div class="detail-popup-product">
            <review-review-media
              .productImg="${this.currentReview?.product?.detail_image}"
              .type=${"product"}
            >
            </review-review-media>

            <div
              class="detail-popup-product__name ${this.canRouteToProduct?"":"is-disabled"}"
              @click=${()=>this.goToProductPage(this.currentReview?.product?.product_no?.toString()??"")}
            >
              <p class="alp-body17 alp-medium line-wrap">
                ${this.currentReview?.product?.product_name}
              </p>
              ${i?Je`
                    <p class="alp-body13 alp-medium line-wrap">
                      ${ns(this.currentReview)}
                    </p>
                  `:null}
            </div>

            <div class="detail-popup-product__close">
              <review-custom-icon
                @click=${e=>this.closeDom(e)}
                .type="${Pt}"
                .width="${"28"}"
                .height="${"28"}"
                .color=${"var(--alp-review-icon-gray60)"}
              ></review-custom-icon>
            </div>
          </div>

          <div class="detail-popup-content__inner">
            
            ${r?Je` <div class="detail-popup-rating">
                  ${this.designOption?.detail_show_ratings?Je`
                        <div class="detail-popup-rating__star">
                          ${Array.from({length:this.currentReview?.ratings??0}).map(()=>Je`<review-star-icon size="21"></review-star-icon>`)}
                          ${this.currentReview?.is_verified?Je`
                                <review-badge
                                  style="margin-left: auto;"
                                  type="verified"
                                ></review-badge>
                              `:null}
                        </div>
                      `:null}
                  ${this.designOption?.detail_show_writer||this.designOption?.detail_show_created_at?Je`
                        <div class="detail-popup-rating__user-info">
                          
                          ${this.designOption?.detail_show_writer?Je`<review-user-info
                                .review=${this.currentReview}
                                .otherText=${this.designOption?.detail_show_writer&&this.designOption?.detail_show_created_at}
                                .color=${"var(--alp-review-text-gray80)"}
                                .fontSizeClassLarge=${"alp-body15"}
                                .fontSizeClassMedium=${"alp-body15"}
                                .fontSizeClassSmall=${"alp-body15"}
                              ></review-user-info>`:null}
                          ${this.designOption?.detail_show_created_at?Je`<review-at-date
                                .color=${"var(--alp-review-text-gray80)"}
                                .createDate=${this.currentReview?.created_at}
                                .fontSizeClassLarge=${"alp-body15"}
                                .fontSizeClassMedium=${"alp-body15"}
                                .fontSizeClassSmall=${"alp-body15"}
                              ></review-at-date>`:null}
                        </div>
                      `:null}
                  ${this.designOption?.detail_show_survey?Je`
                        <review-survey-answer
                          .surveyAnswer=${this.currentReview?.surveys??[]}
                        ></review-survey-answer>
                      `:null}
                </div>`:null}

            
            <div class="detail-popup-rating__badge">
              ${this.currentReview?.badges?.map(e=>Je`<review-badge
                    .bgColor=${e.design_background}
                    .borderColor=${e.design_border}
                    .color=${e.design_color}
                    .label=${e.badge_name}
                  ></review-badge>`)}
            </div>

            
            <div class="detail-popup-rating__content">
              ${this.isMoreOpen?Je`<p class="review-content-text alp-body15 alp-line14 alp-medium">${this.currentReview?.content}</p>`:Je`<p class="review-content-text alp-body15 alp-line14 alp-medium">${this.currentReview?.content?.slice(0,1e3)}</p>`}
              ${(this.currentReview?.content?.length??0)<1e3?null:Je` <div
                    class="detail-popup-rating__content-more alp-body12 alp-medium"
                    @click=${()=>this.isMoreOpen=!this.isMoreOpen}
                  >
                    ${this.isMoreOpen?this.lessText:this.moreText}
                    <review-custom-icon
                      style=${vs(this.isMoreOpen?{transform:"rotate(180deg)"}:{})}
                      color="var(--alp-review-gray50, rgba(30, 41, 59, 0.5))"
                      width="16"
                      height="18"
                      type="arrow-down"
                    ></review-custom-icon>
                  </div>`}
            </div>

            ${(this.currentReview?.keywords?.length??0)>0?Je`<div class="detail-popup-rating__keyword">
                  ${Je`${this.currentReview?.keywords?.map(e=>Je`<review-keyword-label
                        .keyword="${e.description}"
                        .emoji="${e.icon_name}"
                      ></review-keyword-label>`)} `}
                </div>`:null}

            
            ${this.reviewLoading?null:Je`<div class="detail-popup-rating__button">
                  ${this.designOption?.detail_show_like?Je`
                        <review-like-button
                          .showLike=${!0}
                          .reviewId=${this.currentReview?.id}
                          .productNo=${this.currentReview?.product?.product_no}
                          .likeCount=${this.currentReview?.like_count}
                        ></review-like-button>
                      `:null}
                  ${this.designOption?.detail_show_comment?Je`
                        <review-comment-button
                          .commentCount=${this.currentReview?.comments?.length??0}
                          .isOpen=${this.isCommentOpen}
                          @click=${this.toggleComment}
                        ></review-comment-button>
                      `:null}
                  <review-report-button .reviewId=${this.currentReview?.id}></review-report-button>
                </div>`}

            
            ${this.isCommentOpen?Je`
                  <div class="detail-popup-rating__comment">
                    <p class="alp-body13 alp-line15">
                      ${this.currentReview?.comments?.[0]?.content}
                    </p>
                    <p class="alp-body13">
                      ${this.currentReview?.comments?.[0]?.writer} ${this.commentTagText}
                    </p>
                  </div>
                `:null}

            

            <div class="detail-popup-review-list">
              <p class="alp-body17 alp-bold">${this.otherReviewText}</p>

              <div class="swiper-container" id="sw-detail-popup-review-${this.widgetCode}">
                <div class="swiper-wrapper">
                  ${this.reviewList?.map((e,t)=>Je`
                      <div
                        class="swiper-slide detail-popup-review-list__item ${t===this.currentReviewIndex?"is-active":""}"
                        style="width: 100%; height: 100%;"
                        @click=${()=>this.onChangeCurrentReview(t)}
                      >
                        ${e?.id?Je`<review-review-media
                              .isAutoPlay=${!1}
                              .isThumbnail=${!0}
                              .reviewMedia=${e?.ordered_media[0]}
                              .productImg=${e?.product?.tiny_image}
                            ></review-review-media>`:Je`<div
                              style="width: 118px; height: 118px; background-color: #0000002a;"
                            ></div>`}
                      </div>
                    `)}
                </div>
              </div>
            </div>
          </div>

          <div class="detail-popup-footer">
            
            <div class="detail-popup-pagination">
              <div
                @click=${this.onChangePrevReview}
                class="${1===this.option?.page&&0===this.currentReviewIndex?"is-disabled":""} alp-body17 alp-semi-bold"
              >
                <review-custom-icon
                  type="${ft}"
                  color="${1===this.option?.page&&0===this.currentReviewIndex?"var(--alp-review-text-gray40)":"var(--alp-review-text-gray100)"}"
                  width="24"
                  height="24"
                ></review-custom-icon>
                ${this.prevButtonText}
              </div>
              <div
                @click=${this.onChangeNextReview}
                class="${this.totalPage===this.option?.page&&this.currentReviewIndex===this.reviewList?.length-1?"is-disabled":""} alp-body17 alp-semi-bold"
              >
                ${this.nextButtonText}
                <review-custom-icon
                  type="${yt}"
                  color="${this.totalPage===this.option?.page&&this.currentReviewIndex===this.reviewList?.length-1?"var(--alp-review-text-gray40)":"var(--alp-review-text-gray100)"}"
                  width="24"
                  height="24"
                ></review-custom-icon>
              </div>
            </div>

            
            ${this.purchaseArea()}
          </div>
        </div>
      </div>
    `}};Ja.styles=Va,Za([i({type:String})],Ja.prototype,"widgetCode",2),Za([i({type:Number})],Ja.prototype,"reviewId",2),Za([i({type:Number})],Ja.prototype,"reviewIndex",2),Za([i({type:Object})],Ja.prototype,"option",2),Za([i({type:Object})],Ja.prototype,"backupList",2),Za([r()],Ja.prototype,"currentReview",2),Za([r()],Ja.prototype,"reviewList",2),Za([r()],Ja.prototype,"checkPageList",2),Za([r()],Ja.prototype,"currentMediaIndex",2),Za([r()],Ja.prototype,"currentReviewIndex",2),Za([r()],Ja.prototype,"totalPage",2),Za([r()],Ja.prototype,"totalCount",2),Za([r()],Ja.prototype,"isCommentOpen",2),Za([r()],Ja.prototype,"isMoreOpen",2),Za([r()],Ja.prototype,"isPopupLoading",2),Za([r()],Ja.prototype,"reviewLoading",2),Za([r()],Ja.prototype,"mall_id",2),Za([r()],Ja.prototype,"device",2),Za([r()],Ja.prototype,"pageType",2),Za([r()],Ja.prototype,"baseProductNo",2),Za([r()],Ja.prototype,"purchaseState",2),Za([r()],Ja.prototype,"isPurchasing",2),Za([r()],Ja.prototype,"secretLinkState",2),Ja=Za([ae(tn)],Ja);const Qa=[Ni,Di,Ra,ue`:host{--floating-width:400px;width:var(--floating-width);height:fit-content;left:var(--floating-position-left);bottom:var(--floating-position-bottom);top:var(--floating-position-top);right:var(--floating-position-right);z-index:var(--floating-z-index);opacity:0;background-color:#0000;animation:.3s cubic-bezier(.4,0,.2,1) .3s forwards alpFadeUp;display:block;transform:translateY(30%);position:fixed!important}.floating-widget{border-radius:var(--floating-border-radius);box-shadow:0 2px 15px #0000000d,0 12px 20px #0003}.floating-widget-button{background-color:var(--alp-review-icon-gray20);cursor:pointer;border-radius:50%;justify-content:center;align-items:center;width:28px;height:28px;margin-bottom:28px;margin-left:auto;display:flex}.floating-inner-container__title-container.is-active{opacity:0;animation:1s cubic-bezier(.4,0,.2,1) .5s forwards alpFadeUp;transform:translateY(30%)}.floating-inner-container__start-containers.is-active{opacity:0;animation:1s cubic-bezier(.4,0,.2,1) .7s forwards alpFadeUp;transform:translateY(30%)}.floating-inner-container__review-container.is-active{opacity:0;animation:1s cubic-bezier(.4,0,.2,1) .9s forwards alpFadeUp;transform:translateY(30%)}@media (width<=440px){:host{width:calc(100% - 20px);left:10px;right:auto}}@keyframes alpFadeUp{0%{opacity:0;transform:translateY(50%)}to{opacity:1;transform:translateY(0%)}}`];var Xa=Object.defineProperty,ep=Object.getOwnPropertyDescriptor,tp=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ep(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Xa(t,i,s),s};let ip=class extends ht{constructor(){super(...arguments),this.widgetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs="",this.filterOption={page:1,page_size:10,product_no:"all",widget_code:"",device:"mobile"===P()?"m":"w"},this.designOption={},this.reviewList=[],this.isWidgetLoading=!0,this.currentIndex=0,this.totalAvgRating=0}async firstUpdated(e){if(super.firstUpdated(e),fa("review-floating-widget"))this.closeWidget();else{this.isDummy&&(this.filterOption.is_dummy=!0),this.productNo="PRODUCT_DETAIL"===await f()?v()||this.productNo:"all",this.filterOption.product_no=this.productNo;try{await this.getWidgetOption(),await this.getReviewList(),window?.ALPHA_PREVIEW&&z(this,":host{position: absolute !important}"),W(this,this.customJs),z(this,this.customCss??"")}catch(e){}}}async getReviewList(){const e={...this.filterOption};try{let t;if(window?.ALPHA_PREVIEW)t=this.previewData;else if(t=await b(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0),"RESULT_EMPTY_HIDE"===t?.code)return void(this.reviewList=[]);this.reviewList=t;const i=this.reviewList.reduce((e,t)=>e+t.product?.review_ratings_connect,0)/this.reviewList.length;this.totalAvgRating=Number(i.toFixed(1)),W(this,this.customJs)}catch(e){}finally{this.isWidgetLoading=!1}}async getWidgetOption(){try{let e;e=window?.ALPHA_PREVIEW?this.previewOption:await A(this.widgetCode,window.ALPHA_REVIEW_EMERGENCY?`/widget_option/${this.widgetCode}.json`:void 0),this.designOption=e,this.filterOption.widget_code=this.widgetCode,this.filterOption.page_size=this.designOption.review_max,"a"===this.designOption.floating_type?(this.style.setProperty("--floating-width","280px"),this.style.setProperty("--floating-border-radius","12px")):(this.style.setProperty("--floating-width","400px"),this.style.setProperty("--floating-border-radius","20px")),B(this,{"--floating-z-index":this.designOption.z_index?.toString()??"0","--floating-position-right":"mobile"===P()?this.designOption.position_m?.includes("right")?this.designOption.x_axis+"px":"none":this.designOption.position?.includes("right")?this.designOption.x_axis+"px":"none","--floating-position-left":"mobile"===P()?this.designOption.position_m?.includes("left")?this.designOption.x_axis+"px":"none":this.designOption.position?.includes("left")?this.designOption.x_axis+"px":"none","--floating-position-top":this.designOption.position?.includes("top")||this.designOption.position_m?.includes("top")?("mobile"===P()?this.designOption.y_axis_m:this.designOption.y_axis)+"px":"none","--floating-position-bottom":this.designOption.position?.includes("bottom")||this.designOption.position_m?.includes("bottom")?("mobile"===P()?this.designOption.y_axis_m:this.designOption.y_axis)+"px":"none","--floating-mobile-width":`calc(100% - ${2*(this.designOption?.x_axis??0)}px)`})}catch(e){throw e}}closeWidget(){ba("review-floating-widget","true",1),c("review-floating-widget")}render(){return this.isWidgetLoading||0===this.reviewList.length?null:Je`
      <div class="floating-widget-button" @click=${this.closeWidget}>
        <review-custom-icon
          .width=${24}
          .height=${24}
          type="close"
          .color=${"#fff"}
        ></review-custom-icon>
      </div>
      <div class=${`floating-widget${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`} id=${this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode}>
        ${"a"===this.designOption.floating_type?Je`<review-floating-card-type-b
              .reviewList="${this.reviewList}"
              .option="${this.designOption}"
              .widgetCode="${this.widgetCode}"
              .productNo="${this.productNo}"
              .filterOption="${this.filterOption}"
            ></review-floating-card-type-b>`:Je`<review-floating-card-type-a
              .reviewList="${this.reviewList}"
              .option="${this.designOption}"
              .widgetCode="${this.widgetCode}"
              .productNo="${this.productNo}"
              .filterOption="${this.filterOption}"
            ></review-floating-card-type-a>`}
      </div>
    `}};ip.styles=Qa,tp([i({type:Object,attribute:"data-widget-preview-data"})],ip.prototype,"previewData",2),tp([i({type:Object,attribute:"data-widget-preview-option"})],ip.prototype,"previewOption",2),tp([i({type:Object,attribute:"data-widget-preview-meta"})],ip.prototype,"previewMeta",2),tp([i({type:String,attribute:"data-widget-code"})],ip.prototype,"widgetCode",2),tp([i({type:String,attribute:"data-product-no"})],ip.prototype,"productNo",2),tp([i({type:String,attribute:"data-widget-custom-class"})],ip.prototype,"widgetCustomClass",2),tp([i({type:String,attribute:"data-widget-custom-id"})],ip.prototype,"widgetCustomId",2),tp([i({type:Boolean,attribute:"data-dummy"})],ip.prototype,"isDummy",2),tp([i({type:String,attribute:"data-custom-class"})],ip.prototype,"customClass",2),tp([i({type:String,attribute:"data-custom-id"})],ip.prototype,"customId",2),tp([i({type:String,attribute:"data-custom-css"})],ip.prototype,"customCss",2),tp([i({type:String,attribute:"data-custom-js"})],ip.prototype,"customJs",2),tp([r()],ip.prototype,"filterOption",2),tp([r()],ip.prototype,"designOption",2),tp([r()],ip.prototype,"reviewList",2),tp([r()],ip.prototype,"isWidgetLoading",2),tp([r()],ip.prototype,"currentIndex",2),tp([r()],ip.prototype,"totalAvgRating",2),ip=tp([ae("review-floating-widget")],ip);var rp=Object.defineProperty,op=Object.getOwnPropertyDescriptor,sp=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?op(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&rp(t,i,s),s};let np=class extends ht{constructor(){super(),this.reviewList=[],this.productNo="all",this.reviewCount=0,this.widgetCode="",this.currentIndex=0,this.pageType="MAIN",this.intervalIndex=0,this.badgeText="\uc0c1\ud488\uc694\uc57d",this.buttonText="\uc0c1\ud488 \ubcf4\ub7ec\uac00\uae30",this.commentText="\ub2d8\uc758 \ud55c\ub9c8\ub514",this.badgeText="en"===window.ALPHA_REVIEW_LOCAL?"Highlight":"\uc0c1\ud488\uc694\uc57d",this.buttonText=si.WIDGETS.FLOATING.VIEW_PRODUCT,this.commentText=si.SHARED.OPEN_REVIEW_WRITE.COMMENT}createRenderRoot(){return this}async firstUpdated(e){super.firstUpdated(e),this.pageType=await f(),window?.CUSTOM_SWIPER?this.initialSwiper():await p(()=>this.initialSwiper()),"b_light"!==this.option.floating_type&&(this.style.setProperty("--alp-fc-bg-color","#21201E"),this.style.setProperty("--alp-fc-label-color","#2C2B29"),this.style.setProperty("--alp-fc-body-font-color","#fff"),this.style.setProperty("--alp-fc-option-font-color","#FFFFFF99"),this.style.setProperty("--alp-fc-box-color","#FFFFFF0D"),this.style.setProperty("--alp-fc-button-color","#FFFFFF2E"))}disconnectedCallback(){super.disconnectedCallback(),this.swiper?.destroy()}updateIndex(e){const t=this.reviewList.length-1;t<0||(this.intervalIndex="next"===e?this.intervalIndex===t?0:this.intervalIndex+1:0===this.intervalIndex?t:this.intervalIndex-1,this.currentIndex=this.intervalIndex)}getDotColor(e){const t="a"===this.option.floating_type;return e?t?"#1E293B":"#fff":t?"#1e293b23":"#ffffff1a"}initialSwiper(){const e=this.querySelector("#sw-floating-"+this.widgetCode);this.swiper=n({container:e,styleRoot:this,options:{freeMode:{enabled:!1},slidesPerView:"auto",spaceBetween:14,loop:!0,autoplay:{delay:1e3*(this.option?.interval??1)}},event:{slideNextTransitionStart:()=>this.updateIndex("next"),slidePrevTransitionStart:()=>this.updateIndex("prev")}})}goToProductDetail(e){e&&"all"!==e&&pn(e)}openDetailPopup(e,t){this.filterOption.detail=!0,gn({reviewId:e,option:this.filterOption,reviewIndex:t,backupList:this.reviewList})}swiperTemplate(){return this.reviewList.map((e,t)=>Je`
        <div
          class="swiper-slide floating-widget-a-review-box__item"
          @click=${()=>this.openDetailPopup(e.id?.toString(),t)}
        >
          
          ${this.option.writer?Je` <p class="line-wrap alp-body13">
                ${e.user_info||si.SHARED.USER_INFO.NON_MEMBER}${this.commentText}
              </p>`:null}
          
          ${this.option.ratings?Je`<div class="floating-widget-a-review-box__item__star-containers">
                ${Array.from({length:Number(e.ratings)||0}).map(()=>Je`<review-star-icon size="23"></review-star-icon>`)}
              </div>`:null}
          
          <div class="floating-widget-a-review-box__item__content">
            <p class="line-wrap alp-body15 alp-medium">
              ${e.content?.slice(0,this.option.text_length)}
            </p>

            <div class="img-box">
              <review-review-media
                .reviewMedia=${e?.ordered_media?.[0]}
                .productImg=${e?.product?.detail_image}
              ></review-review-media>
            </div>
          </div>
          

          ${this.option.product_option?Je`
                <p class="floating-widget-a-survey line-wrap alp-body13 alp-regular">
                  ${ns(e)}
                </p>
              `:null}
        </div>
      `)}render(){const e=this.reviewList[this.currentIndex],t=e?.product;return Je`
      <style>:host { --alp-fc-bg-color: #fff; --alp-fc-label-color: #1e293b; --alp-fc-body-font-color: #1e293b; --alp-fc-option-font-color: #1e293b; --alp-fc-box-color: #1e293b0d; --alp-fc-button-color: #1e293b; } .floating-widget-a-container { display: flex; flex-direction: column; gap: 14px; background: var(--alp-fc-bg-color); position: relative; padding: 24px 20px; overflow: hidden; border-radius: 20px; } .floating-widget-a-label { display: flex; width: 93.123px; transform: rotate(-45deg); padding: 27px 13px 6px 13px; justify-content: center; align-items: center; background: var(--alp-fc-label-color); color: #fff; position: absolute; left: -32px; top: -10px; } .floating-widget-a-title { display: flex; align-items: center; gap: 7px; color: var(--alp-fc-body-font-color); justify-content: center; } .floating-widget-a-title > img { width: 20px; height: 20px; border-radius: 8px; object-fit: cover; } .floating-widget-a-title > p { color: var(--alp-fc-body-font-color); } .floating-widget-a-review-count { display: flex; flex-direction: column; color: var(--alp-fc-body-font-color); padding: 4px 0; margin-bottom: 6px; } .floating-widget-a-review-count > p { text-align: center !important; color: var(--alp-fc-body-font-color); } .floating-widget-a-review-box { overflow: hidden; background-color: var(--alp-fc-box-color); border-radius: 13px; height: 100%; } .floating-widget-a-review-box__item { display: flex; padding: 20px; padding-top: 24px; flex-direction: column; justify-content: center; align-items: center; gap: 14px; height: auto; cursor: pointer; } .floating-widget-a-review-box__item__content { display: flex; align-items: center; gap: 15px; } .floating-widget-a-review-box__item__content > p { line-clamp: 3 !important; -webkit-line-clamp: 3 !important; color: var(--alp-fc-body-font-color); } .floating-widget-a-review-box__item__content > .img-box { min-width: 52px; max-width: 52px; min-height: 52px; max-height: 52px; border-radius: 8px; overflow: hidden; } .floating-widget-a-review-box__item__star-containers { display: flex; align-items: center; justify-content: center; } .floating-widget-a-review-box__item > p:nth-child(1) { color: var(--alp-fc-option-font-color); } .floating-widget-a-review-box__item > p:nth-child(3) { color: var(--alp-fc-body-font-color); line-clamp: 2 !important; -webkit-line-clamp: 2 !important; } .floating-widget-a-review-box__item > .floating-widget-a-survey { margin-top: auto; color: var(--alp-fc-option-font-color); } .floating-widget-a-handler { display: flex; gap: 6px; align-items: center; justify-content: center; padding-bottom: 18px; } .floating-widget-a-button { display: flex; padding: 14px 16px; justify-content: center; align-items: center; border-radius: 12px; background: var(--alp-fc-button-color); color: #fff; cursor: pointer; } .swiper-wrapper { display: flex; } @media (max-width: 440px) { .floating-widget-a-review-box__item__content { p { font-size: 17px; line-height: 1.5; } } }</style>

      <div class="floating-widget-a-container">
        <div class="floating-widget-a-label alp-body12 alp-semi-bold">${this.badgeText}</div>

        <div class="floating-widget-a-title">
          <div class="img-box">
            <review-review-media
              .reviewMedia=${e?.ordered_media?.[0]}
              .productImg=${t?.detail_image}
            ></review-review-media>
          </div>

          <p class="alp-body15 alp-medium">${t?.product_name}</p>
        </div>

        <div class="floating-widget-a-review-count">
          ${oi()?Je`
                <p class="alp-h20 alp-semi-bold">
                  <span class="alp-ht alp-h20 alp-bold"
                    >${e?.product?.review_number_connect_count}</span
                  >
                  customers
                </p>
                <p class="alp-h20 alp-semi-bold">
                  rated this as
                  ${ya(Number(e?.product?.review_ratings_connect))}.
                </p>
              `:Je`
                <p class="alp-h20 alp-semi-bold">
                  <span class="alp-ht alp-h20 alp-bold"
                    >${e?.product?.review_number_connect_count}ëª</span
                  >ì ê³ ê°ëì´
                </p>
                <p class="alp-h20 alp-semi-bold">
                  ${ya(Number(e?.product?.review_ratings_connect))}ê³ 
                  íê°íì´ì.
                </p>
              `}
        </div>

        <div class="floating-widget-a-review-box">
          <div id="sw-floating-${this.widgetCode}" class="swiper-container">
            <div class="swiper-wrapper">${this.swiperTemplate()}</div>
          </div>

          <div class="floating-widget-a-handler">
            ${this.reviewList.map((e,t)=>Je`<review-custom-icon
                  type="${xt}"
                  width="${9}"
                  height="${9}"
                  color="${this.getDotColor(t===this.currentIndex)}"
                ></review-custom-icon>`)}
          </div>
        </div>

        ${"PRODUCT_DETAIL"!==this.pageType?Je`
              <button
                class="floating-widget-a-button alp-body17 alp-semi-bold"
                @click=${()=>this.goToProductDetail(t?.product_no?.toString())}
              >
                ${this.buttonText}
              </button>
            `:null}
      </div>
    `}};sp([i({type:Object})],np.prototype,"filterOption",2),sp([i({type:Array})],np.prototype,"reviewList",2),sp([i({type:String})],np.prototype,"productNo",2),sp([i({type:Object})],np.prototype,"option",2),sp([i({type:Number})],np.prototype,"reviewCount",2),sp([i({type:String})],np.prototype,"widgetCode",2),sp([r()],np.prototype,"currentIndex",2),sp([r()],np.prototype,"pageType",2),np=sp([ae("review-floating-card-type-a")],np);var ap=Object.defineProperty,pp=Object.getOwnPropertyDescriptor,lp=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?pp(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ap(t,i,s),s};let dp=class extends ht{constructor(){super(),this.reviewList=[],this.reviewCount=0,this.widgetCode="",this.currentIndex=0,this.hasProductOptionList=[],this.isAnimating=!0,this.pageType="MAIN",this.buttonText="\uc0c1\ud488 \ubcf4\ub7ec\uac00\uae30",this.buttonText=si.WIDGETS.FLOATING.VIEW_PRODUCT}createRenderRoot(){return this}initialSwiper(){this.swiper=n({container:this.querySelector("#sw-floating-"+this.widgetCode),styleRoot:this,options:{freeMode:{enabled:!1},slidesPerView:"auto",spaceBetween:14,loop:!0}}),this.swiper.on?.("slideChange",()=>{this.currentIndex=("number"==typeof this.swiper.realIndex?this.swiper.realIndex:this.swiper.activeIndex)??0})}nextSlide(){this.swiper?.slideNext()}prevSlide(){this.swiper?.slidePrev()}willUpdate(e){(e.has("reviewList")||e.has("option"))&&(this.hasProductOptionList=this.reviewList.map(e=>!(!this.option?.product_option||!e?.product_option&&!e?.product_option_json?.[0]?.option_value)),setTimeout(()=>{this.isAnimating=!1},2e3))}async firstUpdated(e){super.firstUpdated(e),this.pageType=await f(),this.initialSwiper()}goToProductDetail(e){e&&"all"!==e&&pn(e)}openDetailPopup(e,t){this.filterOption.detail=!0,gn({reviewId:e,option:this.filterOption,reviewIndex:t,backupList:this.reviewList})}render(){const e=this.reviewList[this.currentIndex],t=e?.product;return Je`
      <style>:host { --alp-fc-bg-color: #fff; --alp-fc-label-color: #1e293b; --alp-fc-body-font-color: #1e293b; --alp-fc-option-font-color: #1e293b99; --alp-fc-box-color: #1e293b0d; --alp-fc-button-color: #1e293b; } .floating-card-type-b-container { position: relative; background: var(--alp-fc-bg-color); border-radius: 20px; } .floating-card-type-b-container .img-box { width: 100%; border-radius: 12px 12px 0 0; background-color: #ccc; object-fit: cover; aspect-ratio: 4 / 3; overflow: hidden; } .floating-inner-container { padding: 20px 12px 0px 12px; cursor: pointer; } .floating-inner-container__title-container { display: flex; flex-direction: column; align-items: center; gap: 4px; } .floating-inner-container__title-container > p { color: var(--alp-review-text-gray100); color: var(--alp-fc-body-font-color); } .floating-inner-container__start-containers { display: flex; align-items: center; justify-content: center; margin-top: 13px; } .floating-inner-container__review-container { display: flex; flex-direction: column; align-items: center; gap: 10px; margin: 14px 0px; } .floating-inner-container__review-container > p { text-align: center !important; } .floating-inner-container__review-container > p:first-child { color: var(--alp-review-text-gray80); line-clamp: 2 !important; -webkit-line-clamp: 2 !important; color: var(--alp-fc-body-font-color); } .floating-inner-container__review-container > p:last-child { display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--alp-fc-option-font-color); } .floating-card-type-b__button-container { padding: 0 14px 14px 14px; } .floating-card-type-b__button { display: flex; padding: 14px 16px; justify-content: center; align-items: center; width: 100%; border-radius: 12px; color: #fff; background: var(--alp-fc-button-color); cursor: pointer; } .floating-custom-wrapper { overflow: hidden; } .floating-custom-wrapper .swiper-wrapper { display: flex; flex-direction: row; flex-wrap: nowrap; } .floating-custom-wrapper .swiper-slide { flex-shrink: 0; width: 100%; box-sizing: border-box; } .floating-card-type-b__handler { position: absolute; width: 40px; height: 40px; top: 50%; transform: translateY(-50%); display: flex; align-items: center; justify-content: center; cursor: pointer; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5)); } .floating-left { left: -40px; } .floating-right { right: -40px; } @media (max-width: 440px) { .floating-inner-container__title-container > p { font-size: 18px; } .floating-inner-container__review-container review-content { font-size: 15px; } .floating-inner-container__review-container .user-name, .floating-inner-container__review-container span { line-height: 1.5; font-size: 13px; } }</style>

      <div class="floating-card-type-b-container">
        <div class="floating-card-type-b__handler floating-left">
          <review-custom-icon
            @click=${this.prevSlide}
            .type="${_t}"
            .width=${32}
            .height=${32}
            .color=${"#fff"}
          />
        </div>

        <div class="img-box">
          <review-review-media
            .reviewMedia=${e?.ordered_media?.[0]}
            .productImg=${t?.detail_image}
          ></review-review-media>
        </div>

        <div id="sw-floating-${this.widgetCode}" class="swiper-container floating-custom-wrapper">
          <div class="swiper-wrapper">
            ${this.reviewList.map((e,t)=>Je`
                <div
                  class="swiper-slide floating-inner-container"
                  @click=${()=>this.openDetailPopup(e.id?.toString(),t)}
                >
                  <div
                    class="floating-inner-container__title-container ${this.isAnimating?"is-active":""}"
                  >
                    ${oi()?Je`
                          <p class="alp-body16 alp-semi-bold">
                            <span class="alp-body16 alp-bold alp-ht"
                              >${e.product.review_number_connect_count}</span
                            >
                            customers
                          </p>
                          <p class="alp-body16 alp-semi-bold">
                            rated this as
                            ${ya(Number(e.product.review_ratings_connect))}.
                          </p>
                        `:Je`
                          <p class="alp-body16 alp-semi-bold">
                            <span class="alp-body16 alp-bold alp-ht"
                              >${e.product.review_number_connect_count}</span
                            >ëª ê³ ê°ëì´
                          </p>
                          <p class="alp-body16 alp-semi-bold">
                            ${ya(Number(e.product.review_ratings_connect))}ê³ 
                            íê°íì´ì.
                          </p>
                        `}
                  </div>

                  ${this.option.ratings?Je`<div
                        class="floating-inner-container__start-containers ${this.isAnimating?"is-active":""}"
                      >
                        ${Array.from({length:Number(e.ratings)||0}).map(()=>Je`<review-star-icon size="23"></review-star-icon>`)}
                      </div>`:null}

                  <div
                    class="floating-inner-container__review-container ${this.isAnimating?"is-active":""}"
                  >
                    <p class="review-content line-wrap alp-body13 alp-semi-bold alp-line14">
                      ${e.content?.slice(0,this.option.text_length)}
                    </p>
                    <p class="user-name">
                      ${"en"===window?.ALPHA_REVIEW_LOCAL?Je`
                            ${this.option.writer?Je`<span class="alp-caption11"
                                  >${e.user_info||"Guest"}</span
                                >`:null}
                            ${this.hasProductOptionList[t]?Je`<span class="alp-caption11 alp-regular">
                                  bought: ${ns(e)}</span
                                >`:null}
                          `:Je`
                            ${this.option.writer?Je`<span class="alp-caption11"
                                  >${e.user_info||"\ube44\ud68c\uc6d0"}${this.hasProductOptionList[t]?"\ub2d8\uc740":""}</span
                                >`:null}
                            ${this.hasProductOptionList[t]?Je`<span class="alp-caption11 alp-regular"
                                  >${ns(e)} êµ¬ë§¤íì´ì</span
                                >`:null}
                          `}
                    </p>
                  </div>
                </div>
              `)}
          </div>
        </div>

        ${"PRODUCT_DETAIL"!==this.pageType?Je`
              <div class="floating-card-type-b__button-container">
                <button
                  class="floating-card-type-b__button alp-body15 alp-semi-bold"
                  @click=${()=>this.goToProductDetail(t?.product_no?.toString())}
                >
                  ${this.buttonText}
                </button>
              </div>
            `:null}

        <div class="floating-card-type-b__handler floating-right">
          <review-custom-icon
            @click=${this.nextSlide}
            type="${Ct}"
            .width=${32}
            .height=${32}
            .color=${"#fff"}
          />
        </div>
      </div>
    `}};lp([i({type:Array})],dp.prototype,"reviewList",2),lp([i({type:Object})],dp.prototype,"filterOption",2),lp([i({type:Object})],dp.prototype,"option",2),lp([i({type:Number})],dp.prototype,"reviewCount",2),lp([i({type:String})],dp.prototype,"widgetCode",2),lp([r()],dp.prototype,"currentIndex",2),lp([r()],dp.prototype,"hasProductOptionList",2),lp([r()],dp.prototype,"isAnimating",2),lp([r()],dp.prototype,"pageType",2),dp=lp([ae("review-floating-card-type-b")],dp);var cp=Object.defineProperty,hp=Object.getOwnPropertyDescriptor,gp=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?hp(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cp(t,i,s),s};let up=class extends ht{constructor(){super(),this.guideText="\uc0c1\ud488\uc5d0 \ub300\ud55c \ub2f9\uc2e0\uc758 \uc18c\uc911\ud55c \uacbd\ud5d8\uc744 \uacf5\uc720\ud574 \uc8fc\uc138\uc694!",this.buttonText="\ub9ac\ubdf0\uc791\uc131",this.onWriteReviewClick=async()=>{const{mall_id:e,shop_no:t}=await m(),i=await y()??"";cr({mall_id:e,shop_no:t,member_id:i,product_no:this.productNo??window?.iProductNo??""})},this.guideText=si.WIDGETS.HIGHLIGHT.GUIDE_TEXT,this.buttonText=si.WIDGETS.HIGHLIGHT.WRITE_REVIEW}createRenderRoot(){return this}render(){return Je`
      <style>.highlight-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 20px; padding: 20px 40px; border-top: 1px solid var(--alp-review-border-gray30); } .highlight-footer > p { font-size: 16px !important; text-align: center !important; color: var(--alp-review-text-gray50); } .highlight-footer > button { display: flex; height: 44px; padding: 0 16px; justify-content: center; align-items: center; gap: 10px; background: var(--alp-common-color); color: var(--alp-review-text-white); border: none; cursor: pointer; border-radius: 6px; } @container highlight (max-width: 840px) { .highlight-footer { padding: 30px 0 40px 0; gap: 17px; flex-direction: column; } .highlight-footer > button { width: 100%; font-size: 16px; } }</style>
      <div class="highlight-footer">
        <p class="alp-body16 alp-medium alp-line14">${this.guideText}</p>
        <button class="alp-body13 alp-semi-bold" @click=${this.onWriteReviewClick}>
          ${this.buttonText}
        </button>
      </div>
    `}};gp([i({type:String})],up.prototype,"productNo",2),up=gp([ae("review-highlight-footer")],up);var wp=Object.defineProperty,vp=Object.getOwnPropertyDescriptor,mp=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?vp(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&wp(t,i,s),s};let yp=class extends ht{constructor(){super(...arguments),this.currentValue=null,this.type="column",this.ratingsStatType=Xi,this.totalCount=0,this.ratingList=oi()?[{name:"Excellent",value:0,perValue:0},{name:"Good",value:0,perValue:0},{name:"Average",value:0,perValue:0},{name:"Fair",value:0,perValue:0},{name:"Poor",value:0,perValue:0}]:[{name:"\ub9e4\uc6b0 \ub9cc\uc871",value:0,perValue:0},{name:"\ub9cc\uc871",value:0,perValue:0},{name:"\ubcf4\ud1b5",value:0,perValue:0},{name:"\uadf8\uc800\uadf8\ub798\uc694",value:0,perValue:0},{name:"\uc544\uc26c\uc6cc\uc694",value:0,perValue:0}],this.graphList=[]}createRenderRoot(){return this}update(e){super.update(e),e.has("ratingList")&&(this.graphList=this.ratingList?.map(e=>({name:e.name,value:this.ratingsStatType===Xi?Math.round(Number(e.value/this.totalCount*100)):e.value,perValue:Math.round(Number(e.value/this.totalCount*100))})))}render(){const e=(()=>"column"===this.type?Je`
            <div class="highlight-graph-row">
              ${this.graphList.map((e,t)=>Je`
                    <div class="highlight-graph-row__item">
                      <div class="highlight-graph-row__item__bar">
                        <p
                          class="highlight-graph-text ${(this.currentValue?this.currentValue===e.name:0===t)?"first-highlight-graph":""}"
                        >
                          ${e.value.toLocaleString()}${this.ratingsStatType===Xi?"%":""}
                        </p>
                        <div
                          style="--alp-target-height: ${e.perValue}%; --alp-graph-bg: ${this.currentValue?this.currentValue===e.name?"var(--alp-common-color)":"var(--alp-review-card-gray40)":0!==e.value?"var(--alp-common-color)":"var(--alp-review-card-gray40)"};"
                          class="u-height-fill"
                        ></div>
                      </div>
                      <p
                        class="highlight-graph-text ${(this.currentValue?this.currentValue===e.name:0===t)?"first-highlight-graph":""}"
                      >
                        ${e.name}
                      </p>
                    </div>
                  `)}
            </div>
          `:Je`
            <div class="highlight-graph-column">
              ${this.graphList?.map((e,t)=>Je`
                    <div class="highlight-graph-column__item">
                      <p
                        class="highlight-graph-text ${(this.currentValue?this.currentValue===e.name:0===t)?"first-highlight-graph":""}"
                      >
                        ${e.name}
                      </p>
                      <div class="highlight-graph-column__item__star">
                        ${Array.from({length:5}).map((e,i)=>Je`<review-star-icon
                            size="14"
                            color=${5-i<=t?"#ccc":"var(--alp-common-color)"}
                          ></review-star-icon>`)}
                      </div>
                      <div class="highlight-graph-column__item__bar">
                        <div
                          class="u-width-fill"
                          style="--alp-target-width: ${e.perValue}%; --alp-width-duration: 1500ms;--alp-graph-bg: ${this.currentValue?this.currentValue===e.name?"var(--alp-common-color)":"var(--alp-review-card-gray40)":0!==e.value?"var(--alp-common-color)":"var(--alp-review-card-gray40)"};"
                        ></div>
                      </div>
                      <p
                        class="highlight-graph-text ${(this.currentValue?this.currentValue===e.name:0===t)?"first-highlight-graph":""}"
                      >
                        ${e.value.toLocaleString()}${this.ratingsStatType===Xi?"%":""}
                      </p>
                    </div>
                  `)}
            </div>
          `)();return Je`
      <style>.highlight-graph-row { display: flex; flex-direction: row; gap: 14px; height: 140px; justify-content: center; align-items: center; } .highlight-graph-row__item { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 10px; height: 100%; width: 100%; min-width: 70px; max-width: 90px; } .highlight-graph-row__item__bar { width: 100%; height: 100%; display: flex; flex-direction: column; gap: 6px; align-items: center; justify-content: flex-end; } .highlight-graph-row__item > div > div { width: 100%; height: var(--alp-target-height); border-radius: 6px; background: var(--alp-graph-bg); } .highlight-graph-column { display: flex; flex-direction: column; gap: 16px; padding: 0 20px; min-width: 400px; box-sizing: border-box; } .highlight-graph-column__item { display: flex; align-items: center; gap: 10px; height: 16px; container-type: inline-size; container-name: highlight-graph-column-item; } .highlight-graph-column p:nth-child(1) { min-width: 90px; max-width: 90px; } .highlight-graph-column__item__star { display: flex; } .highlight-graph-column__item__bar { display: flex; height: 8px; border-radius: 8px; background: var(--alp-review-icon-gray05); width: 100%; } .highlight-graph-column__item__bar > div { height: 100%; border-radius: 8px; background: var(--alp-graph-bg); } .highlight-graph-column p:nth-child(4) { min-width: 60px; max-width: 60px; text-align: right !important; } .highlight-graph-text { color: var(--alp-review-text-gray50, #64748b); } .first-highlight-graph { color: var(--alp-common-color) !important; font-weight: 700 !important; } @container highlight-graph-column-item (max-width: 840px) { .highlight-graph-column__item__star { display: none; } } @container highlight (max-width: 840px) { .highlight-graph-row { height: 168px; gap: 10px; } .highlight-graph-row__item { width: 100%; min-width: 10px; max-width: 100px; } .highlight-graph-column { padding: 32px 0; min-width: 300px; gap: 6px; } .highlight-graph-text { font-size: 13px; } .highlight-graph-column p:nth-child(1) { min-width: 80px; max-width: 80px; } .highlight-graph-column p:nth-child(4) { min-width: 50px; max-width: 50px; } }</style>
      ${e}
    `}};mp([i({type:String})],yp.prototype,"currentValue",2),mp([i({type:String})],yp.prototype,"type",2),mp([i({type:String})],yp.prototype,"ratingsStatType",2),mp([i({type:Number})],yp.prototype,"totalCount",2),mp([i()],yp.prototype,"ratingList",2),mp([r()],yp.prototype,"graphList",2),yp=mp([ae("review-highlight-graph")],yp);var fp=Object.defineProperty,bp=Object.getOwnPropertyDescriptor,xp=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?bp(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&fp(t,i,s),s};let _p=class extends ht{constructor(){super(),this.isRatingsStat=!1,this.isSurvey=!1,this.reviewCount=0,this.averageRating=0,this.isRatingsStatText="\uac1c \ub9ac\ubdf0",this.notRatingsStatText="\uba85\uc758 \uad6c\ub9e4\uc790\uac00 \ub9cc\uc871\ud588\uc5b4\uc694!",this.isRatingsStatText=si.WIDGETS.HIGHLIGHT.REVIEWS,this.notRatingsStatText=si.WIDGETS.HIGHLIGHT.CUSTOMERS}createRenderRoot(){return this}render(){return Je`
      <style>
        review-highlight-summary {
          display: flex;
        }
        .highlight-summary-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          column-gap: 16px;
          row-gap: 4px;
          width: 100%;
          padding: 40px;
          box-sizing: border-box;
        }

        .highlight-summary-star-box {
          display: flex;
          align-items: center;
        }

        .highlight-summary-star-box p {
          color: var(--alp-review-text-gray100);
        }

        .highlight-summary-text {
          color: var(--alp-review-text-gray60);

          display: flex;
          align-items: center;
        }

        .highlight-summary-text span {
          color: var(--alp-common-color);
          font-size: 20px;
          font-weight: 600;
          line-height: 26px; /* 130% */
          letter-spacing: -0.6px;
        }

        .star-pc {
          display: block;
        }
        .star-mo {
          display: none;
        }

        .survey-container {
          /* min-width: 240px;
          max-width: 240px; */
          display: flex;
          flex-direction: column;
        }

        .highlight-widget-star-pc {
          display: block;
        }
        .highlight-widget-star-mo {
          display: none;
        }

        @container highlight (max-width: 840px) {
          .highlight-summary-container {
            flex-direction: column;
            gap: 9px;
            padding: 20px;
            padding-bottom: ${this.isRatingsStat?"0":"30px"};
            padding-top: 30px;
          }

          .highlight-summary-text {
            font-size: 13px;
          }

          .highlight-summary-text span {
            font-size: 13px;
          }

          .star-pc {
            display: none;
          }
          .star-mo {
            display: block;
          }

          .survey-container {
            min-width: 100%;
            max-width: 100%;
            display: flex;
            flex-direction: column;
          }

          .highlight-widget-star-pc {
            display: none;
          }
          .highlight-widget-star-mo {
            display: block;
          }
        }
      </style>

      <div class="highlight-summary-container ${this.isSurvey?"survey-container":""}">
        <div class="highlight-summary-star-box">
          <review-star-icon class="star-pc" size="32"></review-star-icon>
          <review-star-icon class="star-mo" size="32"></review-star-icon>
          <p class="alp-h26 alp-semi-bold highlight-widget-star-pc">${this.averageRating}</p>
          <p class="alp-h32 alp-semi-bold highlight-widget-star-mo">${this.averageRating}</p>
        </div>

        <p class="highlight-summary-text alp-body17 alp-medium">
          <span class="alp-medium">
            <review-count-rolling
              style="margin-top: 1px;"
              .number=${this.reviewCount}
            ></review-count-rolling>
          </span>
          ${this.isRatingsStat?this.isRatingsStatText:this.notRatingsStatText}
        </p>
      </div>
    `}};xp([i({type:Boolean})],_p.prototype,"isRatingsStat",2),xp([i({type:Boolean})],_p.prototype,"isSurvey",2),xp([i({type:Number})],_p.prototype,"reviewCount",2),xp([i({type:Number})],_p.prototype,"averageRating",2),_p=xp([ae("review-highlight-summary")],_p);var Cp=Object.defineProperty,$p=Object.getOwnPropertyDescriptor,Op=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?$p(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Cp(t,i,s),s};let kp=class extends ht{constructor(){super(...arguments),this.widgetCode="",this.surveyList=[],this.currentIndex=0,this.onPrevClick=()=>{0!==this.currentIndex&&(this.currentIndex--,this.swiper?.slidePrev())},this.onNextClick=()=>{this.currentIndex!==this.surveyList.length-1&&(this.currentIndex++,this.swiper?.slideNext())}}createRenderRoot(){return this}initialSwiper(){this.swiper=n({container:this.querySelector(`#sw-${this.widgetCode}-survey`),styleRoot:this,options:{freeMode:{enabled:!0},slidesPerView:"auto",spaceBetween:40,loop:!1}}),this.swiper.on?.("slideChange",()=>{this.currentIndex=this.swiper.activeIndex})}async updated(e){super.updated(e),e.has("surveyList")&&this.surveyList&&(window?.CUSTOM_SWIPER?.swiper?this.initialSwiper():await p(()=>this.initialSwiper()))}disconnectedCallback(){this.swiper?.destroy()}render(){return Je`
      <style>review-highlight-survey { display: flex; position: relative; justify-content: center; } .highlight-survey-container { width: calc(100% - 68px); overflow: hidden; margin: 36px 8px; height: 156px; overflow-y: scroll; &::-webkit-scrollbar { width: 6px; height: 0px; } &::-webkit-scrollbar-track { background-color: transparent; } &::-webkit-scrollbar-thumb { border-radius: 12px; background-color: transparent; } } .highlight-survey-item { width: 100%; min-width: var(--survey-min-width); max-width: var(--survey-max-width); height: 100%; } .highlight-survey-item > p { margin-top: 10px; } .highlight-survey-item > div { display: flex; flex-direction: column; gap: 5px; } .highlight-survey-item__answer { display: flex; align-items: center; gap: 12px; height: 26px; } .highlight-survey-item__answer > p:nth-child(1) { width: 100%; max-width: 52px; } .highlight-survey-item__answer__bar { width: 100%; height: 8px; border-radius: 8px; background: var(--alp-review-card-gray05); } .highlight-survey-item__answer__bar > div { width: var(--alp-target-width, 100%); height: 100%; border-radius: 8px; background: var(--alp-common-color); } .highlight-survey-wrapper { width: 100%; height: 156px; } .left-arrow, .right-arrow { width: 30px; height: 156px; border-radius: 3px; background: var(--alp-review-card-gray05); position: absolute; top: 36px; z-index: 10; display: flex; align-items: center; justify-content: center; cursor: pointer; } .left-arrow { left: 0; } .right-arrow { right: 0; } .highlight-survey-item > p { color: var(--alp-review-text-gray100, #1e293b); text-align: center !important; font-size: 22px; font-weight: 700; line-height: 26px; letter-spacing: -0.6px; margin-bottom: 14px; } .highlight-survey-text { color: var(--alp-review-text-gray50, #64748b); font-size: 16px; font-weight: 500; line-height: 100%; letter-spacing: -0.6px; } .first-highlight-survey { color: var(--alp-common-color) !important; font-weight: 700 !important; } @container highlight (max-width: 840px) { .highlight-survey-item { min-width: 100%; max-width: 100%; } }</style>

      <div class="left-arrow" @click=${this.onPrevClick}>
        <review-custom-icon
          .type="${ft}"
          .width="${"32px"}"
          .height="${"32px"}"
          .color="${0===this.currentIndex?"var(--alp-review-icon-gray20)":"var(--alp-review-icon-gray100)"}"
        ></review-custom-icon>
      </div>

      <div id="sw-${this.widgetCode}-survey" class="swiper-container highlight-survey-container">
        <div class="swiper-wrapper highlight-survey-wrapper">
          ${this.surveyList?.map(e=>Je`
              <div
                class="swiper-slide highlight-survey-item"
                style="
                --survey-min-width: 
                ${this.surveyList.length<=1?"100%":"316px"};
                --survey-max-width: 
                ${this.surveyList.length<=1?"100%":"340px"};"
              >
                <p>${e.label}</p>
                <div>
                  ${e.answers.map((e,t)=>Je`
                        <div class="highlight-survey-item__answer">
                          <p
                            class="highlight-survey-text line-wrap ${0===t?"first-highlight-survey":""}"
                          >
                            ${e.answer}
                          </p>
                          <div class="highlight-survey-item__answer__bar">
                            <div style="--alp-target-width: ${e.ratio}%;"></div>
                          </div>
                          <p
                            class="highlight-survey-text ${0===t?"first-highlight-survey":""}"
                          >
                            ${e.ratio}%
                          </p>
                        </div>
                      `)}
                </div>
              </div>
            `)}
        </div>
      </div>
      <div class="right-arrow" @click=${this.onNextClick}>
        <review-custom-icon
          .type="${yt}"
          .width="${"32px"}"
          .height="${"32px"}"
          .color="${this.currentIndex===this.surveyList.length-1?"var(--alp-review-icon-gray20)":"var(--alp-review-icon-gray100)"}"
        ></review-custom-icon>
      </div>
    `}};Op([i({type:String})],kp.prototype,"widgetCode",2),Op([i({type:Array})],kp.prototype,"surveyList",2),Op([r()],kp.prototype,"currentIndex",2),kp=Op([ae("review-highlight-survey")],kp);const Sp=[Ni,Di,ko,ue`:host{font-size:var(--alp-common-rem);font-family:var(--alp-common-font-family);display:block}.highlight-widget{width:100%;padding:0 10px;container:highlight/inline-size}.highlight-widget-summary-container{border-top:2px solid var(--alp-review-border-gray100);border-bottom:1px solid var(--alp-review-border-gray10);width:100%;display:flex}.survey-mobile-padding{padding-bottom:24px}.highlight-widget-summary-container__summary{width:100%;display:flex;position:relative}.highlight-widget-summary-container__summary--survey{min-width:240px;max-width:240px}.highlight-widget-graph-container{width:100%;padding:40px 10px}.custom-border-line{background-color:var(--alp-review-border-gray20);width:1px;height:70%;position:absolute;top:50%;right:0;transform:translateY(-50%)}@container (width<=440px){.highlight-widget{padding-bottom:0}}@container (width<=840px){.highlight-widget{padding-bottom:0}.highlight-widget-summary-container{flex-direction:column}.custom-border-line{display:none}.highlight-widget-summary-container__summary--survey{min-width:100%;max-width:100%}.highlight-widget-graph-container--survey{background:0 0}review-highlight-summary{width:100%}}.highlight-skeleton{border-top:2px solid var(--alp-review-border-gray100);border-bottom:1px solid var(--alp-review-border-gray10);width:100%;display:flex}.highlight-skeleton__summary{flex-direction:column;justify-content:center;align-items:center;gap:12px;width:100%;min-width:240px;max-width:240px;padding:40px;display:flex}.highlight-skeleton__star-rating{align-items:center;gap:8px;display:flex}.highlight-skeleton__star{border-radius:4px;width:32px;height:32px}.highlight-skeleton__rating{border-radius:4px;width:60px;height:32px}.highlight-skeleton__text{border-radius:4px;width:180px;height:20px}.highlight-skeleton__graph{flex-direction:column;gap:16px;width:100%;padding:40px;display:flex}.highlight-skeleton__graph-row{align-items:center;gap:10px;display:flex}.highlight-skeleton__graph-label{border-radius:4px;width:90px;height:16px}.highlight-skeleton__graph-bar{border-radius:4px;flex:1;height:8px}.highlight-skeleton__graph-value{border-radius:4px;width:50px;height:16px}@container (width<=840px){.highlight-skeleton{flex-direction:column}.highlight-skeleton__summary{min-width:100%;max-width:100%;padding:30px 20px}.highlight-skeleton__graph{padding:0 20px 30px}.highlight-skeleton__graph-stars{display:none}}`];var Ep=Object.defineProperty,Rp=Object.getOwnPropertyDescriptor,Lp=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Rp(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Ep(t,i,s),s};let Ip=class extends(wn(ht)){constructor(){super(...arguments),this.widgetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs="",this.filterOption={page:1,page_size:10,widget_code:"",product_no:"all",device:"w"},this.designOption={},this.reviews={},this.isDesignLoading=!0,this.isWidgetLoading=!0,this.isFirstGetReviews=!0,this.isEmptyReview=!1}async updated(e){if(super.updated(e),e.has("isInViewport")){if(!this.isInViewport)return;this.isDummy&&(this.filterOption.is_dummy=!0),this.productNo="PRODUCT_DETAIL"===await f()?v()||this.productNo:"all",this.filterOption.product_no=this.productNo;try{await this.getWidgetOption(),await this.getReview(),z(this,this.customCss??"")}catch(e){}}}async getReview(){try{let e;e=window?.ALPHA_PREVIEW?this.previewData:await b(this.filterOption,window.ALPHA_REVIEW_EMERGENCY?`/widget_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0),this.reviews=e,this.reviews.review_rating=Number(this.reviews.review_rating.toFixed(1)),this.isFirstGetReviews&&(this.isEmptyReview=0===(this.reviews?.review_count??0)),W(this,this.customJs)}catch(e){}finally{this.isWidgetLoading=!1}}async getWidgetOption(){try{let e;e=window?.ALPHA_PREVIEW?this.previewOption:await A(this.widgetCode,window.ALPHA_REVIEW_EMERGENCY?`/widget_option/${this.widgetCode}.json`:void 0),this.designOption=e,this.isDesignLoading=!1,this.filterOption.widget_code=this.widgetCode}catch(e){}}render(){return this.isWidgetLoading?Je`
        <div class="highlight-widget" id="widget-${this.widgetCode}">
          <div class="highlight-skeleton">
            
            <div class="highlight-skeleton__summary">
              <div class="highlight-skeleton__star-rating">
                <div class="highlight-skeleton__star review-skeleton"></div>
                <div class="highlight-skeleton__rating review-skeleton"></div>
              </div>
              <div class="highlight-skeleton__text review-skeleton"></div>
            </div>
            <div class="highlight-skeleton__graph">
              ${Array.from({length:5})?.map(()=>Je`
                  <div class="highlight-skeleton__graph-row">
                    <div class="highlight-skeleton__graph-label review-skeleton"></div>
                    <div class="highlight-skeleton__graph-bar review-skeleton"></div>
                    <div class="highlight-skeleton__graph-value review-skeleton"></div>
                  </div>
                `)}
            </div>
          </div>
        </div>
      `:this.isWidgetLoading||!this.reviews||(this.reviews?.review_count??0)<this.designOption.review_ratings_min?null:Je`
      <div class=${`highlight-widget${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`} id=${this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode}>
        <review-header-title
          .designOption=${this.designOption}
          .widgetCode=${this.widgetCode}
        ></review-header-title>

        ${this.isInViewport?Je` <div
              class="highlight-widget-summary-container ${this.designOption.survey_stat?"survey-mobile-padding":"  "}"
            >
              <div
                class="highlight-widget-summary-container__summary ${this.designOption.ratings_stat?"highlight-widget-summary-container__summary--survey":""}"
              >
                <review-highlight-summary
                  style="width: 100%;${this.designOption.ratings_stat?"":"margin:0 auto;"}"
                  ?isRatingsStat="${this.designOption.ratings_stat}"
                  ?isSurvey="${this.designOption.survey_stat}"
                  .reviewCount=${this.reviews?.review_count??0}
                  .averageRating=${this.reviews.review_rating}
                  .code=${this.widgetCode}
                ></review-highlight-summary>

                ${this.designOption.ratings_stat?Je`<div class="custom-border-line"></div>`:null}
              </div>

              ${this.designOption.ratings_stat?Je`
                    <div
                      class="highlight-widget-graph-container ${this.designOption.survey_stat?"highlight-widget-graph-container--survey":""}"
                    >
                      <review-highlight-graph
                        .type="${this.designOption.ratings_stat_direction}"
                        .ratingsStatType="${this.designOption.ratings_stat_type}"
                        .totalCount=${this.reviews?.review_count??0}
                        .ratingList=${this.reviews?.review_ratings_list?.map((e,t)=>({name:(oi()?["Excellent","Good","Average","Fair","Poor"]:["\ub9e4\uc6b0 \ub9cc\uc871","\ub9cc\uc871","\ubcf4\ud1b5","\uadf8\uc800\uadf8\ub798\uc694","\uc544\uc26c\uc6cc\uc694"])[t]||"",value:e}))}
                      />
                    </div>
                  `:""}
            </div>`:null}

        
        ${this.designOption.survey_stat&&this.reviews?.survey_list?.length>0?Je`<div class="highlight-widget-survey-container">
              <review-highlight-survey
                .widgetCode=${this.widgetCode}
                .surveyList=${this.reviews?.survey_list??[]}
              />
            </div>`:null}

        
        ${this.designOption.write_button?Je`<review-highlight-footer .productNo=${this.productNo} />`:null}
      </div>
    `}};Ip.styles=Sp,Lp([i({type:Object,attribute:"data-widget-preview-data"})],Ip.prototype,"previewData",2),Lp([i({type:Object,attribute:"data-widget-preview-option"})],Ip.prototype,"previewOption",2),Lp([i({type:Object,attribute:"data-widget-preview-meta"})],Ip.prototype,"previewMeta",2),Lp([i({type:String,attribute:"data-widget-code"})],Ip.prototype,"widgetCode",2),Lp([i({type:String,attribute:"data-product-no"})],Ip.prototype,"productNo",2),Lp([i({type:String,attribute:"data-widget-custom-class"})],Ip.prototype,"widgetCustomClass",2),Lp([i({type:String,attribute:"data-widget-custom-id"})],Ip.prototype,"widgetCustomId",2),Lp([i({type:Boolean,attribute:"data-dummy"})],Ip.prototype,"isDummy",2),Lp([i({type:String,attribute:"data-custom-class"})],Ip.prototype,"customClass",2),Lp([i({type:String,attribute:"data-custom-id"})],Ip.prototype,"customId",2),Lp([i({type:String,attribute:"data-custom-css"})],Ip.prototype,"customCss",2),Lp([i({type:String,attribute:"data-custom-js"})],Ip.prototype,"customJs",2),Lp([r()],Ip.prototype,"filterOption",2),Lp([r()],Ip.prototype,"designOption",2),Lp([r()],Ip.prototype,"reviews",2),Lp([r()],Ip.prototype,"isDesignLoading",2),Lp([r()],Ip.prototype,"isWidgetLoading",2),Lp([r()],Ip.prototype,"isFirstGetReviews",2),Lp([r()],Ip.prototype,"isEmptyReview",2),Ip=Lp([ae("review-highlight-widget")],Ip);const Pp=[Ni,Di,ko,ue`:host{font-family:var(--alp-common-font-family);display:block}.keyword-widget{flex-direction:column;gap:40px;padding:0 10px 40px;display:flex}.keyword-widget__body{gap:28px;display:grid}.keyword-widget__header-skeleton{background:var(--alp-review-card-gray03,#1e293b08);flex-direction:column;justify-content:center;align-items:center;width:100%;padding:25px 20px;display:flex}.keyword-widget__header-skeleton>div{flex-direction:column;justify-content:center;align-items:center;display:flex}.inner-circle{border-radius:50%;width:60px;height:60px}.inner-product{width:160px;height:16px;margin-top:4px}.inner-text{width:320px;height:26px;margin-top:8px}.keyword-skeleton{flex-direction:column;gap:20px;display:flex}.keyword-skeleton__header{border-radius:4px;width:120px;height:24px}.keyword-skeleton__bars{flex-direction:column;gap:16px;display:flex}.keyword-skeleton__bar{flex-direction:column;gap:8px;display:flex}.keyword-skeleton__bar-label{border-radius:4px;width:80px;height:18px}.keyword-skeleton__bar-fill{border-radius:4px;width:100%;height:32px}.review-skeleton-list{flex-direction:column;gap:20px;display:flex}.review-skeleton-item{border:1px solid var(--alp-review-gray100,#1e293b1a);border-radius:8px;flex-direction:column;gap:12px;padding:16px;display:flex}.review-skeleton-item__header{justify-content:space-between;align-items:center;gap:12px;display:flex}.review-skeleton-item__stars{border-radius:4px;width:100px;height:20px}.review-skeleton-item__date{border-radius:4px;width:80px;height:16px}.review-skeleton-item__content{border-radius:4px;width:100%;height:60px}.review-skeleton-item__footer{border-radius:4px;width:150px;height:16px}@media (width<=840px){review-keyword-review{max-width:calc(100vw - 20px)}.keyword-widget{gap:40px;padding-bottom:20px}.keyword-widget__body{flex-direction:column;gap:40px;display:flex}.keyword-widget__header-skeleton{background:var(--alp-review-card-gray03,#1e293b08);flex-direction:row;gap:20px;width:100%;padding:25px 20px;display:flex}.keyword-widget__header-skeleton>div{display:block}}`];var Tp=Object.defineProperty,Ap=Object.getOwnPropertyDescriptor,Np=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Ap(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Tp(t,i,s),s};let Dp=class extends(wn(ht)){constructor(){super(...arguments),this.widgetCode="",this.productNo="all",this.customClass="",this.customId="",this.customCss="",this.customJs="",this.isDummy=!1,this.totalCount=0,this.filterOption={page:1,page_size:10,product_no:"all",widget_code:"",device:"w"},this.isWidgetLoading=!0,this.reviewRatingMin=0}async updated(e){if(super.updated(e),e.has("isInViewport")){if(!this.isInViewport)return;this.isDummy&&(this.filterOption.is_dummy=!0),this.productNo="PRODUCT_DETAIL"===await f()?v()||this.productNo:"all",this.filterOption.product_no=this.productNo;try{await this.getReview(),z(this,this.customCss??"")}catch(e){}}}disconnectedCallback(){super.disconnectedCallback()}async getReview(){const e={...this.filterOption,widget_code:this.widgetCode};try{const t=await b(e);this.review=t,W(this,this.customJs)}catch(e){}finally{this.isWidgetLoading=!1}}render(){return this.isWidgetLoading?Je`
        <div class="keyword-widget" id="widget-${this.widgetCode}">
          <div class="keyword-widget__header-skeleton">
            <div class="inner-circle review-skeleton"></div>
            <div>
              <div class="inner-product review-skeleton"></div>
              <div class="inner-text review-skeleton"></div>
            </div>
          </div>

          <div
            class="keyword-widget__body"
            style="grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);"
          >
            <div class="keyword-skeleton">
              <div class="keyword-skeleton__header review-skeleton"></div>
              <div class="keyword-skeleton__bars">
                ${Array.from({length:2}).map(()=>Je`
                    <div class="keyword-skeleton__bar">
                      <div class="keyword-skeleton__bar-fill review-skeleton"></div>
                    </div>
                  `)}
              </div>
            </div>
            <div class="review-skeleton-list">
              ${Array.from({length:1}).map(()=>Je`
                  <div class="review-skeleton-item">
                    <div class="review-skeleton-item__header">
                      <div class="review-skeleton-item__stars review-skeleton"></div>
                      <div class="review-skeleton-item__date review-skeleton"></div>
                    </div>
                    <div class="review-skeleton-item__content review-skeleton"></div>
                    <div class="review-skeleton-item__footer review-skeleton"></div>
                  </div>
                `)}
            </div>
          </div>
        </div>
      `:this.isWidgetLoading||!this.review||0===(this.review.keywords?.length??0)?null:Je`
      <div class="keyword-widget" id="widget-${this.widgetCode}">
        <review-keyword-header .review=${this.review}></review-keyword-header>
        <div
          class="keyword-widget__body"
          style="grid-template-columns: ${(this.review.keywords?.length??0)>0?"minmax(0, 1fr)":""} ${(this.review.review_list?.length??0)>0?"minmax(0, 1fr)":""};"
        >
          ${(this.review.keywords?.length??0)>0?Je`<review-keyword-graph .review=${this.review}></review-keyword-graph>`:null}
          ${(this.review.review_list?.length??0)>0?Je`<review-keyword-review
                .review=${this.review}
                .widgetCode=${this.widgetCode}
              ></review-keyword-review>`:null}
        </div>
      </div>
    `}};Dp.styles=Pp,Np([i({type:String,attribute:"data-widget-code"})],Dp.prototype,"widgetCode",2),Np([i({type:String,attribute:"data-product-no"})],Dp.prototype,"productNo",2),Np([i({type:String,attribute:"data-custom-class"})],Dp.prototype,"customClass",2),Np([i({type:String,attribute:"data-custom-id"})],Dp.prototype,"customId",2),Np([i({type:String,attribute:"data-custom-css"})],Dp.prototype,"customCss",2),Np([i({type:String,attribute:"data-custom-js"})],Dp.prototype,"customJs",2),Np([i({type:Boolean,attribute:"data-dummy"})],Dp.prototype,"isDummy",2),Np([r()],Dp.prototype,"totalCount",2),Np([r()],Dp.prototype,"filterOption",2),Np([r()],Dp.prototype,"isWidgetLoading",2),Np([r()],Dp.prototype,"review",2),Np([r()],Dp.prototype,"reviewRatingMin",2),Dp=Np([ae("review-keyword-widget")],Dp);var Mp=Object.defineProperty,Wp=Object.getOwnPropertyDescriptor,zp=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Wp(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Mp(t,i,s),s};let jp=class extends ht{constructor(){super(...arguments),this.keywordList=[]}createRenderRoot(){return this}updated(e){super.updated(e),e.has("review")&&(this.keywordList=this.review?.keywords??[])}render(){return Je`
      <style>.keyword-review { display: flex; flex-direction: column; gap: 14px; width: 100%; } .keyword-review > p { height: 23px; } .keyword-review-list { display: flex; flex-direction: column; gap: 4px; } .keyword-review-list__item { position: relative; display: flex; height: 42px; padding: 8px 16px; justify-content: space-between; align-items: center; border-radius: 4px; background: var(--Card-Gray03, rgba(30, 41, 59, 0.03)); overflow: hidden; color: var(--alp-review-text-gray100); } .keyword-review-list__item::before { content: ""; position: absolute; top: 0; left: 0; height: 100%; width: 0%; background: var(--alp-common-color); animation: keywordFillBar 600ms ease-in-out forwards; z-index: 0; } .keyword-review-list__item:nth-child(1)::before { opacity: 0.3; } .keyword-review-list__item:nth-child(2)::before { opacity: 0.2; } .keyword-review-list__item:nth-child(3)::before { opacity: 0.1; } @keyframes keywordFillBar { from { width: 0%; } to { width: var(--target-width); } } .keyword-review-list__item > * { position: relative; z-index: 1; } @media (max-width: 440px) { .keyword-review { gap: 12px; } }</style>

      <div class="keyword-review">
        <p class="alp-bold alp-body17">${si.WIDGETS.KEYWORD.SUMMARY_TITLE}</p>

        <div class="keyword-review-list">
          ${this.keywordList.map(e=>Je`
              <div
                class="keyword-review-list__item"
                style="--target-width: ${e?.percent??0}%;"
              >
                <p class="alp-body15 alp-semi-bold">${e?.description}</p>
                <p class="alp-ht alp-body115 alp-semi-bold">
                  ${Math.round(e?.percent??0)}%
                </p>
              </div>
            `)}
        </div>
      </div>
    `}};zp([i({type:Object})],jp.prototype,"review",2),zp([r()],jp.prototype,"keywordList",2),jp=zp([ae("review-keyword-graph")],jp);var Vp=Object.defineProperty,Fp=Object.getOwnPropertyDescriptor,Bp=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Fp(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Vp(t,i,s),s};let Up=class extends ht{constructor(){super(...arguments),this.keywordList=[],this.keywordCount=[],this.currentKeywordIndex=0,this.currentDisplayText="",this.currentKeywordCount=this.keywordCount[0],this.isTyping=!0,this.isVisible=!0,this.timers=[]}createRenderRoot(){return this}updated(e){super.updated(e),e.has("review")&&(this.keywordList=this.review?.keywords?.map(e=>e.description)??[],this.keywordCount=this.review?.keywords?.map(e=>e.count)??[],this.startAnimation())}disconnectedCallback(){super.disconnectedCallback(),this.clearTimers()}clearTimers(){this.timers.forEach(e=>clearTimeout(e)),this.timers=[]}addTimer(e,t){const i=window.setTimeout(e,t);return this.timers.push(i),i}startAnimation(){this.clearTimers(),this.currentKeywordIndex=0,this.currentDisplayText="",this.isTyping=!0,this.isVisible=!0,this.animateText()}animateText(){const e=this.keywordList?.[this.currentKeywordIndex];this.currentKeywordCount=this.keywordCount?.[this.currentKeywordIndex];const t=600/e?.length;this.isTyping?this.currentDisplayText?.length<e?.length?(this.currentDisplayText=e.substring(0,this.currentDisplayText?.length+1),this.addTimer(()=>this.animateText(),t)):(this.isTyping=!1,this.addTimer(()=>this.fadeOut(),2e3)):this.currentDisplayText?.length>0?(this.currentDisplayText=this.currentDisplayText.substring(0,this.currentDisplayText?.length-1),this.addTimer(()=>this.animateText(),.7*t)):this.nextKeyword()}fadeOut(){this.isVisible=!1,this.addTimer(()=>{this.isTyping=!1,this.animateText()},300)}nextKeyword(){this.currentKeywordIndex=(this.currentKeywordIndex+1)%this.keywordList.length,this.currentKeywordCount=this.keywordCount[this.currentKeywordIndex],this.isTyping=!0,this.isVisible=!0,this.addTimer(()=>this.animateText(),200)}render(){return Je`
      <style>.keyword-header { display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 8px; padding: 25px 20px; background: var(--alp-review-card-gray03, rgba(30, 41, 59, 0.03)); } .keyword-header__product-info { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; } .keyword-header__product-info > .img-box { min-width: 50px; min-height: 50px; max-width: 50px; max-height: 50px; border-radius: 50%; overflow: hidden; } .keyword-header__product-info > p { color: var(--alp-review-text-gray40, rgba(30, 41, 59, 0.4)); } .keyword-header > p span { font-size: inherit; font-weight: inherit; transition: opacity 0.3s ease-in-out; } @media (max-width: 840px) { .keyword-header { flex-direction: row; gap: 14px; } .keyword-header__product-info > p { display: none; } .keyword-header > p { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 2px; } .keyword-header > p span { gap: 0px; line-height: 1.2; } } @media (max-width: 440px) { .keyword-header { flex-direction: row; gap: 12px; } .keyword-header__product-info > .img-box { min-width: 44px; min-height: 44px; max-width: 44px; max-height: 44px; } .keyword-header > p span { gap: 0px; font-size: 17px; line-height: 1.2; } }</style>

      <div class="keyword-header">
        <div class="keyword-header__product-info">
          <div class="img-box">
            <review-review-media
              .productImg=${this.review?.detail_image}
              .type=${"product"}
            ></review-review-media>
          </div>

          <p class="alp-body12">${this.review?.product_name}</p>
        </div>
        <p class="alp-h20 alp-semi-bold keyword-text alp-line15">
          ${oi()?Je`
                <span style="opacity: 1">
                  <span class="alp-ht">${this.currentKeywordCount}</span> customers say this product
                  is
                </span>
                <span><span class="alp-ht">'${this.currentDisplayText}'</span>.</span>
              `:Je`
                <span style="opacity: 1">${this.currentKeywordCount}ëªì ê³ ê°ì´ ì´ ìíì</span>
                <span><span class="alp-ht">'${this.currentDisplayText}'</span> ë¼ê³  ë§í´ì.</span>
              `}
        </p>
      </div>
    `}};Bp([i({type:Object})],Up.prototype,"review",2),Bp([r()],Up.prototype,"keywordList",2),Bp([r()],Up.prototype,"keywordCount",2),Bp([r()],Up.prototype,"currentKeywordIndex",2),Bp([r()],Up.prototype,"currentDisplayText",2),Bp([r()],Up.prototype,"currentKeywordCount",2),Bp([r()],Up.prototype,"isTyping",2),Bp([r()],Up.prototype,"isVisible",2),Up=Bp([ae("review-keyword-header")],Up);var Hp=Object.defineProperty,Gp=Object.getOwnPropertyDescriptor,qp=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Gp(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Hp(t,i,s),s};let Yp=class extends ht{constructor(){super(...arguments),this.widgetCode="",this.reviewList=[],this.currentIndex=0,this.onPrevClick=()=>{this.currentIndex--,this.swiper?.slidePrev()},this.onNextClick=()=>{this.currentIndex++,this.swiper?.slideNext()}}createRenderRoot(){return this}initialSwiper(){const e=this.querySelector("#sw-keyword-"+this.widgetCode);e&&(this.swiper?.destroy?.(!0,!0),this.swiper=n({container:e,styleRoot:this,options:{freeMode:{enabled:!1},slidesPerView:"1",spaceBetween:20,loop:!1}}),this.swiper.on?.("slideChange",()=>{this.currentIndex=("number"==typeof this.swiper.realIndex?this.swiper.realIndex:this.swiper.activeIndex)??0}))}async updated(e){super.updated(e),e.has("review")&&(window?.CUSTOM_SWIPER?(this.reviewList=this.review?.review_list??[],await this.updateComplete,this.initialSwiper()):await p(async()=>{this.reviewList=this.review?.review_list??[],await this.updateComplete,this.initialSwiper()}))}disconnectedCallback(){this.swiper?.destroy(!0,!0)}render(){return 0!==this.reviewList.length&&this.review?Je`
      <style>.keyword-review { width: 100%; } .swiper-slide { display: flex; flex-direction: column; justify-content: space-between; } .keyword-review__header { display: flex; justify-content: space-between; align-items: center; height: 23px; } .keyword-review__content { display: flex; flex-direction: column; justify-content: space-between; width: 100%; overflow: hidden; padding: 19px 16px 20px 16px; border-radius: 4px; border: 1px solid rgba(30, 41, 59, 0.1); background: var(--alp-review-bg-white); box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.06); } .keyword-review__content__title { display: flex; align-items: center; margin-bottom: 20px; } .keyword-review__content__title > p { color: var(--alp-review-text-gray40); margin-left: 4px; display: flex; align-items: center; gap: 8px; } .keyword-review__content__title > div { display: flex; padding: 4px 8px; justify-content: center; align-items: center; gap: 10px; border-radius: 4px; background: var(--alp-review-card-gray05); color: var(--alp-review-text-gray80); margin-left: auto; } :host-context(html[data-theme="dark"]) .keyword-review__content__title > div { background: var(--alp-review-icon-gray20); } .keyword-review__content__body { display: grid; gap: 13px; } .keyword-review__content__body > p { color: var(--alp-review-text-gray80); } .keyword-review__content__body__image { min-width: 60px; min-height: 60px; max-width: 60px; max-height: 60px; overflow: hidden; position: relative; border-radius: 6px; } .keyword-review__content__body__image > .count-label { position: absolute; bottom: 0; right: 0; background: #1e293b66; padding: 4px; color: #fff; } .keyword-review__content__body > p { -webkit-line-clamp: 3; line-clamp: 3; }</style>

      <div class="keyword-review">
        <div class="keyword-review__header">
          <p class="alp-bold alp-body17">${si.WIDGETS.KEYWORD.WORD_FROM_CUSTOMERS}</p>
          <review-next-prev-handler
            .buttonSize="${32}"
            .totalPages=${this.reviewList.length}
            .currentIndex=${this.currentIndex}
            @prevProductClick=${this.onPrevClick}
            @nextProductClick=${this.onNextClick}
          ></review-next-prev-handler>
        </div>

        <div id="sw-keyword-${this.widgetCode}" class="swiper-container keyword-review__content">
          <div class="swiper-wrapper">
            ${this.reviewList.map(e=>Je` <div class="swiper-slide">
                  <div class="keyword-review__content__title">
                    ${Array.from({length:e.ratings}).map(()=>Je`<review-star-icon size="20"></review-star-icon>`)}
                    <p class="alp-body13">
                      <span class="line-wrap">${e.user_info}</span> |
                      <review-at-date
                        .createDate=${e.created_at}
                        .fontSizeClassSmall=${"alp-body13"}
                        .fontSizeClassMedium=${"alp-body13"}
                        .fontSizeClassLarge=${"alp-body13"}
                        .color=${"var(--alp-review-text-gray40)"}
                        .fontWeight=${"400"}
                      ></review-at-date>
                    </p>
                    <div class="alp-caption10 alp-semi-bold" style="min-width:fit-content;">
                      ${si.WIDGETS.KEYWORD.VERIFIED}
                    </div>
                  </div>

                  <div
                    class="keyword-review__content__body"
                    style="grid-template-columns: 1fr ${(e?.ordered_media?.length??0)>0?"60px":""};"
                  >
                    <p class="alp-body15 line-wrap alp-medium alp-line14">${e.content}</p>

                    ${(e?.ordered_media?.length??0)>0?Je`<div class="keyword-review__content__body__image">
                          <review-review-media
                            .reviewMedia=${e.ordered_media?.[0]}
                            .productImg=${this.review?.detail_image}
                          ></review-review-media>
                          ${e?.ordered_media?.length>1?Je`<div class="count-label alp-body12 alp-medium">
                                +${e?.ordered_media?.length-1}
                              </div>`:null}
                        </div>`:null}
                  </div>
                </div>`)}
          </div>
        </div>
      </div>
    `:null}};qp([i({type:Object})],Yp.prototype,"review",2),qp([i({type:String})],Yp.prototype,"widgetCode",2),qp([r()],Yp.prototype,"reviewList",2),qp([r()],Yp.prototype,"currentIndex",2),Yp=qp([ae("review-keyword-review")],Yp);var Kp=Object.defineProperty,Zp=Object.getOwnPropertyDescriptor,Jp=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Zp(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Kp(t,i,s),s};let Qp=class extends ht{createRenderRoot(){return this}render(){if(this.review.ordered_media?.length&&this.review.ordered_media?.length>0&&(this.review.ordered_media[0].thumbnail_video_url=null,this.review.ordered_media[0].video_url=null),this.review.ratings>5&&(this.review.ratings=5),!this.review||""===this.review?.content)return Je` <div class="empty-card"></div> `;const e="pc"===P()?14:8,t=this.designOption.rolling_photo&&(this.review.ordered_media?.[0]?.thumbnail_photo_platform_url||this.review.ordered_media?.[0]?.photo_platform_url||this.review.ordered_media?.[0]?.thumbnail_photo_url||this.review.ordered_media?.[0]?.photo_url),i="pc"===P()?"24px":"";let r=null;const o=Je`
      <div class="rolling-card rolling-card-type-a">
        <p
          class="type-a-content alp-caption11 alp-medium"
          style="--rolling-indent:${this.designOption.rolling_ratings?Number(this.review?.ratings)*e+4:0}px"
        >
          ${this.designOption.rolling_ratings?Je`<review-ratings-bundle
                .rating=${this.review.ratings}
                .size=${e}
              ></review-ratings-bundle>`:null}
          <span class="alp-line14 line-wrap">${this.review.content}</span>
        </p>

        ${t?Je`<div class="image-container">
              <review-review-media
                .reviewMedia=${this.review.ordered_media?.[0]}
                .productImg=${this.review.product?.detail_image}
              ></review-review-media>
            </div>`:null}
      </div>
    `,s=Je`
      <div class="rolling-card rolling-card-type-b">
        ${this.designOption.rolling_ratings?Je`
              <div class="type-b-label">
                <review-star-icon size="10" color="#fff"></review-star-icon>
                <p class="alp-caption10 alp-bold">${this.review.ratings}</p>
              </div>
            `:null}
        <p class="type-b-content line-wrap alp-caption11 alp-medium alp-line14">
          ${this.review.content}
        </p>
        ${t?Je`<div class="image-container">
              <review-review-media
                .reviewMedia=${this.review.ordered_media?.[0]}
                .productImg=${this.review.product?.detail_image}
              ></review-review-media>
            </div>`:null}
      </div>
    `,n=Je`
      <div
        class="rolling-card rolling-card-type-a rolling-double-quote"
        style="display: grid; grid-template-columns: ${t?`${i} 1fr 40px ${i}`:`${i} 1fr ${i}`};"
      >
        <svg
          class="type-d-double-quote-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="17"
          viewBox="0 0 25 17"
          fill="none"
        >
          <path
            d="M24.802 12.3782C24.802 13.574 24.3476 14.6024 23.4388 15.4634C22.5778 16.2765 21.5016 16.6831 20.2101 16.6831C18.4403 16.6831 16.9575 16.0613 15.7617 14.8176C14.6137 13.574 14.0397 11.9716 14.0397 10.0105C14.0397 6.42302 15.4269 3.86397 18.2012 2.33333C20.2101 1.23318 21.8364 0.683105 23.0801 0.683105C23.6062 0.683105 23.8693 0.874436 23.8693 1.2571C23.8693 1.59192 23.5823 1.83109 23.0083 1.97459C19.0382 3.0269 17.0532 5.01196 17.0532 7.92974C17.0532 9.22122 17.388 10.3214 18.0577 11.2302C18.1533 9.60388 19.1817 8.79073 21.1429 8.79073C22.1952 8.79073 23.0562 9.14947 23.7258 9.86696C24.4433 10.5366 24.802 11.3737 24.802 12.3782ZM11.6003 12.3782C11.6003 13.574 11.1458 14.6024 10.237 15.4634C9.37604 16.2765 8.32372 16.6831 7.08007 16.6831C5.26243 16.6831 3.77962 16.0613 2.63164 14.8176C1.48366 13.5262 0.909668 11.8998 0.909668 9.93871C0.909668 6.3991 2.29681 3.86397 5.0711 2.33333C7.08007 1.23318 8.68246 0.683105 9.87828 0.683105C10.4044 0.683105 10.6675 0.874436 10.6675 1.2571C10.6675 1.59192 10.3805 1.83109 9.80653 1.97459C5.88426 3.0269 3.92312 5.03587 3.92312 8.00149C3.92312 9.24514 4.25795 10.3214 4.92761 11.2302C5.02327 9.60388 6.02776 8.79073 7.94106 8.79073C8.99338 8.79073 9.85436 9.14947 10.524 9.86696C11.2415 10.5366 11.6003 11.3737 11.6003 12.3782Z"
            fill="var(--alp-review-icon-gray20)"
          />
        </svg>
        <p
          class="type-a-content alp-caption11 alp-medium"
          style="--rolling-indent:${Number(this.designOption.rolling_ratings?this.review?.ratings?.toFixed(0):0)*e}px"
        >
          ${this.designOption.rolling_ratings?Je`<review-ratings-bundle
                .rating=${this.review.ratings}
                .size=${e}
              ></review-ratings-bundle>`:null}
          <span style="margin-left: 5px;" class="alp-line14 line-wrap">${this.review.content}</span>
        </p>
        ${t?Je`<div class="image-container">
              <review-review-media
                .reviewMedia=${this.review.ordered_media?.[0]}
                .productImg=${this.review.product?.detail_image}
              ></review-review-media>
            </div>`:null}
        <svg
          class="type-d-double-quote-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="17"
          viewBox="0 0 24 17"
          fill="none"
        >
          <path
            d="M0.0172863 4.98804C0.0172863 3.79222 0.471695 2.76382 1.38052 1.90283C2.2415 1.08968 3.31774 0.683105 4.60921 0.683105C6.37902 0.683105 7.86183 1.30493 9.05765 2.54857C10.2056 3.79222 10.7796 5.39462 10.7796 7.35575C10.7796 10.9432 9.39248 13.5022 6.61818 15.0329C4.60921 16.133 2.98291 16.6831 1.73926 16.6831C1.2131 16.6831 0.950024 16.4918 0.950024 16.1091C0.950024 15.7743 1.23702 15.5351 1.81101 15.3916C5.78111 14.3393 7.76617 12.3543 7.76617 9.43647C7.76617 8.14499 7.43134 7.04484 6.76168 6.13602C6.66602 7.76233 5.63762 8.57548 3.67648 8.57548C2.62416 8.57548 1.76318 8.21674 1.09352 7.49925C0.376032 6.82959 0.0172863 5.99252 0.0172863 4.98804ZM13.2191 4.98804C13.2191 3.79222 13.6735 2.76382 14.5823 1.90283C15.4433 1.08968 16.4956 0.683105 17.7393 0.683105C19.5569 0.683105 21.0397 1.30493 22.1877 2.54857C23.3357 3.84005 23.9097 5.46636 23.9097 7.4275C23.9097 10.9671 22.5225 13.5022 19.7482 15.0329C17.7393 16.133 16.1369 16.6831 14.9411 16.6831C14.4149 16.6831 14.1518 16.4918 14.1518 16.1091C14.1518 15.7743 14.4388 15.5351 15.0128 15.3916C18.9351 14.3393 20.8962 12.3303 20.8962 9.36472C20.8962 8.12107 20.5614 7.04484 19.8917 6.13602C19.7961 7.76233 18.7916 8.57548 16.8783 8.57548C15.826 8.57548 14.965 8.21674 14.2953 7.49925C13.5778 6.82959 13.2191 5.99252 13.2191 4.98804Z"
            fill="var(--alp-review-icon-gray20)"
          />
        </svg>
      </div>
    `;switch(this.designOption.rolling_type){case 1:case 4:default:r=o;break;case 2:r=n;break;case 3:r=s}return Je`
      <style>.alp-line14 { font-size: calc(13px) !important; } .rolling-card { display: flex; width: 100%; } .rolling-card > .image-container { min-width: 40px; max-width: 40px; min-height: 40px; max-height: 40px; object-fit: cover; margin-left: auto; overflow: hidden; border-radius: 6px; } .rolling-card .line-wrap { line-clamp: 2 !important; -webkit-line-clamp: 2 !important; } .rolling-card-type-a { display: flex; align-items: center; gap: 17px; padding: 12px 0; } .type-a-content { display: flex; align-items: flex-start; position: relative; text-indent: var(--rolling-indent); height: 40px; width: 100%; } .type-a-content > review-ratings-bundle { position: absolute; display: flex; align-items: center; left: 0; top: 2px; margin: auto 0; } .rolling-card-type-b { display: flex; align-items: center; gap: 12px; position: relative; margin-bottom: 6px; padding: 12px 13px 12px ${this.designOption.rolling_ratings?"30px":"13px"}; background-color: var(--alp-review-bg-gray05); border-radius: 6px; overflow: hidden; } :host-context(html[data-theme="dark"]) .rolling-card-type-b { background-color: var(--alp-review-card-gray07); } .type-b-content { display: flex; height: 40px; } .type-b-label { display: flex; width: 80px; transform: rotate(-45deg); padding: 10px 10px 5px 10px; justify-content: center; align-items: center; gap: 1px; position: absolute; left: -30px; top: -3px; height: 25px; background-color: var(--alp-common-color); color: var(--alp-review-text-white); } .type-b-label > p { color: var(--alp-review-text-white); } .rolling-double-quote { padding: 12px 6px; } :host-context(html[data-theme="dark"]) .rolling-double-quote > svg path { fill: var(--alp-review-icon-gray10); } .type-d-double-quote-icon { margin-bottom: auto; } @media (max-width: 440px) { .alp-line14 { font-size: 11px !important; margin-top: 2px; } .type-a-content > review-ratings-bundle { top: 4px; } .rolling-double-quote { gap: 10px !important; position: relative; padding: 12px 2px; padding-top: 24px; } .type-b-content, .type-a-content > span, .rolling-double-quote > p > span { line-clamp: 2; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; } .rolling-double-quote > p > span { margin-left: 2px !important; } .rolling-double-quote > svg { width: 14px; position: absolute; left: 0; top: 6px; } .rolling-double-quote > svg:nth-of-type(1) { left: 0; } .rolling-double-quote > svg:nth-of-type(2) { left: calc(100% - 14px); } .rolling-card > .image-container { min-width: 32px; max-width: 32px; min-height: 32px; max-height: 32px; } .rolling-card-type-b > p { max-height: 32px; } }</style>

      
      <div class="rolling-card">${r}</div>
    `}};Jp([i({type:Object})],Qp.prototype,"designOption",2),Jp([i({type:Object})],Qp.prototype,"review",2),Qp=Jp([ae("review-rolling-card")],Qp);var Xp=Object.defineProperty,el=Object.getOwnPropertyDescriptor,tl=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?el(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Xp(t,i,s),s};let il=class extends ht{constructor(){super(...arguments),this.option={},this.designType=1,this.reviewCount=0,this.reviewRating=0}createRenderRoot(){return this}render(){const e="mobile"===P()?9:14;let t="flex-start",{ratings_align:i}=this.option;switch(i){case"left":t="flex-start";break;case"center":t="center";break;case"right":t="flex-end"}return Je`
      <style>
        .rolling-widget-title {
          display: flex;
          justify-content: ${t};
        }
        .rolling-widget-title > div {
          display: flex;
          align-items: center;
          u {
            text-decoration: underline;
          }
        }
        .rolling-widget-title > div > p:nth-of-type(1) {
          color: red;
          color: var(--alp-review-text-gray100);
        }
        .rolling-widget-title > div > p:nth-of-type(2) {
          color: var(--alp-review-text-gray60);
          margin-left: 5px;
        }

        /* ------------------------------------------ */
        /* media query - mobile */
        /* ------------------------------------------ */
        @media (max-width: 440px) {
          /* .rolling-widget-title > p:nth-of-type(1) {
            font-size: 11px !important;
          } */
          .rolling-widget-title-inner > p:nth-of-type(1) {
            font-size: 12px;
            margin-left: 3px !important;
          }
          .rolling-widget-title-inner > p:nth-of-type(2) {
            font-size: 11px;
            margin-left: 3px !important;
          }
        }
      </style>

      <div class="rolling-widget-title">
        <div class="rolling-widget-title-inner">
          
          ${4===this.designType?Je`
                <review-ratings-bundle
                  .rating="${this.reviewRating}"
                  .size="${e}"
                ></review-ratings-bundle>
              `:Je`<review-star-icon .size="${e}"></review-star-icon>`}

          
          ${js(this.designType,[[1,()=>Je`
                <p class="alp-body15 alp-bold">${this.reviewRating.toFixed(1)}</p>
                <p class="alp-body13">(${this.reviewCount})</p>
              `],[2,()=>Je`
                <p class="alp-body15 alp-bold">${this.reviewRating.toFixed(1)}</p>
                ${oi()?Je`<p class="alp-body13"><u>${this.reviewCount}</u> Reviews</p>`:Je`<p class="alp-body13">ë¦¬ë·° <u>${this.reviewCount}</u>ê°</p>`}
              `],[3,()=>Je`
                <p class="alp-body15 alp-bold">${this.reviewRating.toFixed(1)}</p>
                ${oi()?Je`<p class="alp-body13">${this.reviewCount} Reviews</p>`:Je`<p class="alp-body13">ë¦¬ë·° ${this.reviewCount}ê°</p>`}
              `],[4,()=>Je`
                <p class="alp-body15 alp-bold" style="margin-left: 5px;">
                  ${this.reviewRating.toFixed(1)}
                </p>
                ${oi()?Je`<p class="alp-body13 line-wrap" style="margin-left: 8px;">
                      ${this.reviewCount} Reviews
                    </p>`:Je`<p class="alp-body13 line-wrap" style="margin-left: 8px;">
                      ë¦¬ë·° ${this.reviewCount}
                    </p>`}
              `]])}
        </div>
      </div>
    `}};tl([i({type:Object})],il.prototype,"option",2),tl([i({type:Number})],il.prototype,"designType",2),tl([i({type:Number})],il.prototype,"reviewCount",2),tl([i({type:Number})],il.prototype,"reviewRating",2),il=tl([ae("review-rolling-title")],il);const rl=[Ni,Di,ko,ue`:host{--rolling-widget-card-type:64;--rolling-widget-card-length:1;--rolling-widget-card-gap:0;font-family:var(--alp-common-font-family)}.rolling-widget{gap:calc(var(--rolling-widget-card-gap)*1px);flex-direction:column;margin:4px 0;display:flex;position:relative}.rolling-design-4-swiper-wrapper{position:relative}.rolling-design-4{border-radius:10px}.pop-bubble:after{content:"";top:-10px;left:var(--rolling-header-left);transform:var(--rolling-header-center);right:var(--rolling-header-right);border-left:10px solid #0000;border-right:10px solid #0000;border-bottom:10px solid var(--alp-review-bg-gray05);z-index:1;width:0;height:0;position:absolute}.rolling-design-4-inner>div>review-rolling-card>.rolling-card{background-color:var(--alp-review-bg-gray05)}:host-context(html[data-theme="dark"]) .pop-bubble:after{border-bottom:10px solid var(--alp-review-card-gray07)}:host-context(html[data-theme="dark"]) .rolling-design-4-inner>div>review-rolling-card>.rolling-card{background-color:var(--alp-review-card-gray07)}.rolling-design-4-inner>div:last-child .rolling-card-type-a{border-bottom:none}.rolling-design-4-inner>div:last-child{border-radius:0 0 10px 10px;overflow:hidden}.rolling-design-4-inner .rolling-card-type-a{border-bottom:.5px solid var(--alp-review-border-gray10);max-height:64px;margin-left:16px;margin-right:6px}.rolling-design-3-inner{background-color:#0000;padding:0}.rolling-design-5-swiper-wrapper,.rolling-design-1-swiper-wrapper,.rolling-design-2-swiper-wrapper{border-top:.5px solid var(--alp-review-border-gray20)}.rolling-design-5-inner{background-color:#0000;padding:0 16px}.swiper{width:100%;height:calc(( var(--rolling-widget-card-type)*var(--rolling-widget-card-length) + ((var(--rolling-widget-card-length) - 1)*var(--rolling-widget-card-inner-gap)))*1px);position:relative;overflow:hidden}.empty-card{background-color:#0000!important}.swiper-wrapper{flex-direction:column}.rolling-border-bottom .rolling-card{border-bottom:.5px solid var(--alp-review-border-gray10);max-height:64px}.last-rolling-border-bottom{max-height:64px}@media (width<=440px){.rolling-design-4-inner .rolling-card-type-a{gap:8px;margin-left:10px;margin-right:10px}}`];var ol=Object.defineProperty,sl=Object.getOwnPropertyDescriptor,nl=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?sl(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ol(t,i,s),s};let al=class extends ht{constructor(){super(...arguments),this.widgetCode="",this.widgetSetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs="",this.totalCount=0,this.titleWidth=0,this.filterOption={page:1,page_size:10,product_no:"all",widget_code:"",device:"mobile"===P()?"m":"w"},this.isDesignLoading=!0,this.isWidgetLoading=!0,this.reviewList=[],this.designType=1,this.rollingReviewCount=3,this.reviewCount=0,this.reviewRating=0}async firstUpdated(e){super.firstUpdated(e),this.productNo=v()||this.productNo,this.filterOption.product_no=this.productNo,this.isDummy&&(this.filterOption.is_dummy=!0);try{switch(await this.getWidgetOption(),await Promise.all([this.getReviewList(),this.getReviewMeta()]),z(this,this.customCss??""),W(this,this.customJs),await this.updateComplete,this.titleWidth=this.shadowRoot?.querySelector(".rolling-widget-title-inner")?.clientWidth??0,this.designOption.ratings_align){case"left":this.style.setProperty("--rolling-header-left",this.titleWidth/2+"px"),this.style.setProperty("--rolling-header-right","none"),this.style.setProperty("--rolling-header-center","none");break;case"right":this.style.setProperty("--rolling-header-left","none"),this.style.setProperty("--rolling-header-right",this.titleWidth/2+"px"),this.style.setProperty("--rolling-header-center","none");break;default:this.style.setProperty("--rolling-header-left","50%"),this.style.setProperty("--rolling-header-right","none"),this.style.setProperty("--rolling-header-center","translateX(-50%)")}this.initSwiper()}catch(e){}finally{this.isDesignLoading=!1,this.isWidgetLoading=!1}}disconnectedCallback(){super.disconnectedCallback(),this._swiper&&"function"==typeof this._swiper.destroy&&(this._swiper.destroy(!0,!0),this._swiper=void 0)}async getReviewList(){const e={...this.filterOption};try{let t;if(t=window?.ALPHA_PREVIEW?this.previewData:await b(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0),"RESULT_EMPTY_SHOW_MESSAGE"===t?.code)return;this.reviewList=t}catch(e){}finally{this.isWidgetLoading=!1}}async getReviewMeta(){const e={...this.filterOption};try{let t;t=window?.ALPHA_PREVIEW?this.previewMeta:await x(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_meta_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0),t?.code&&j(t.code),this.reviewCount=t.total_review_count,this.reviewRating=t.avg_review_rating}catch(e){throw this.errorCode=F(e?.code),e}}async getWidgetOption(){try{this.designOption=window?.ALPHA_PREVIEW?this.previewOption:await A(this.widgetCode,window.ALPHA_REVIEW_EMERGENCY?`/widget_option/${this.widgetCode}.json`:void 0),this.filterOption.widget_code=this.widgetCode,this.designType=this.designOption.ratings_type??1,this.rollingReviewCount=this.designOption.rolling_length??1,this.style.setProperty("--rolling-widget-card-length",this.rollingReviewCount+""),this.style.setProperty("--rolling-widget-card-gap",1===this.designOption.rolling_type?"16":"12"),this.style.setProperty("--rolling-widget-card-inner-gap",3===this.designOption.rolling_type?"6":"0")}catch(e){throw e}finally{this.isDesignLoading=!1}}initSwiper(){const e=this.renderRoot.querySelector(`#sw-rolling-${this.widgetCode}-${this.productNo}`);if(!e)return;this._swiper&&"function"==typeof this._swiper.destroy&&(this._swiper.destroy(!0,!0),this._swiper=void 0);const t=1e3*(this.designOption?.autoplay_delay??1);this._swiper=n({container:e,styleRoot:this.renderRoot,options:"rolling"===this.designOption.autoplay_animation?{direction:"vertical",slidesPerView:1,slidesPerGroup:1,spaceBetween:3===this.designOption.rolling_type?6:0,loop:this.reviewList.length>(this.designOption.rolling_length??1),watchOverflow:!0,allowTouchMove:!1,simulateTouch:!1,autoplay:{delay:t,disableOnInteraction:!0},init:!1,observer:!0,observeParents:!0}:{effect:"fade",fadeEffect:{crossFade:!0},slidesPerView:1,slidesPerGroup:1,spaceBetween:0,direction:"vertical",loop:this.reviewList.length>(this.designOption.rolling_length??1),watchOverflow:!0,allowTouchMove:!1,simulateTouch:!1,speed:600,autoplay:{delay:t,disableOnInteraction:!0},init:!1,observer:!0,observeParents:!0}}),requestAnimationFrame(()=>this._swiper?.init?.())}openDetailPopup(e,t){gn({reviewId:e,option:this.filterOption,reviewIndex:t,backupList:this.reviewList})}render(){if(this.isWidgetLoading)return Je`
        <div
          style="width:100%;height:60px;border-radius:10px;margin-top:6px;"
          class="review-skeleton"
        ></div>
      `;if(this.isWidgetLoading||0===(this.reviewList?.length??0))return null;if(!this.isWidgetLoading&&this.errorCode)return V(this.errorCode,this.productNo,this.widgetSetCode||this.widgetCode,this.widgetCode);const e="rolling-design-"+this.designOption.rolling_type;return Je`
      <div class=${`rolling-widget${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`} id=${this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode}>
        <review-rolling-title
          .option="${this.designOption}"
          .designType="${this.designType}"
          .reviewCount="${this.reviewCount}"
          .reviewRating="${this.reviewRating}"
        ></review-rolling-title>

        ${this.designOption?.use_rolling?Je` <div
              class="${e}-swiper-wrapper ${4===this.designOption.rolling_type&&(this.reviewList?.length??0)>0?"pop-bubble":""}"
            >
              <div class="swiper ${e}" id="sw-rolling-${this.widgetCode}-${this.productNo}">
                <div class="swiper-wrapper">
                  ${Array.from({length:Math.ceil(this.reviewList.length/this.rollingReviewCount)},(t,i)=>{const r=i*this.rollingReviewCount,o=this.reviewList.slice(r,r+this.rollingReviewCount);return Je`
                        <div class="swiper-slide ${e}-inner">
                          ${o.map((e,t)=>Je`
                              <div
                                class="${""===(e?.content??"")&&1!==this.designType?"empty-card":""}
                          ${""!==(e?.content??"")&&3!==this.designOption.rolling_type&&4!==this.designOption.rolling_type?t!==o.length-1?" rolling-border-bottom":" last-rolling-border-bottom":""}
                        "
                              >
                                <review-rolling-card
                                  @click="${()=>this.openDetailPopup(e?.id?.toString()??"",t)}"
                                  style="cursor: pointer;"
                                  .designOption="${this.designOption}"
                                  .review="${e}"
                                  .reviewList=${this.reviewList}
                                ></review-rolling-card>
                              </div>
                            `)}
                        </div>
                      `})}
                </div>
              </div>
            </div>`:null}
      </div>
    `}};al.styles=rl,nl([i({type:Object,attribute:"data-widget-preview-data"})],al.prototype,"previewData",2),nl([i({type:Object,attribute:"data-widget-preview-option"})],al.prototype,"previewOption",2),nl([i({type:Object,attribute:"data-widget-preview-meta"})],al.prototype,"previewMeta",2),nl([i({type:String,attribute:"data-widget-code"})],al.prototype,"widgetCode",2),nl([i({type:String,attribute:"data-widget-set-code"})],al.prototype,"widgetSetCode",2),nl([i({type:String,attribute:"data-product-no"})],al.prototype,"productNo",2),nl([i({type:String,attribute:"data-widget-custom-class"})],al.prototype,"widgetCustomClass",2),nl([i({type:String,attribute:"data-widget-custom-id"})],al.prototype,"widgetCustomId",2),nl([i({type:Boolean,attribute:"data-dummy"})],al.prototype,"isDummy",2),nl([i({type:String,attribute:"data-custom-class"})],al.prototype,"customClass",2),nl([i({type:String,attribute:"data-custom-id"})],al.prototype,"customId",2),nl([i({type:String,attribute:"data-custom-css"})],al.prototype,"customCss",2),nl([i({type:String,attribute:"data-custom-js"})],al.prototype,"customJs",2),nl([r()],al.prototype,"totalCount",2),nl([r()],al.prototype,"titleWidth",2),nl([r()],al.prototype,"filterOption",2),nl([r()],al.prototype,"designOption",2),nl([r()],al.prototype,"isDesignLoading",2),nl([r()],al.prototype,"isWidgetLoading",2),nl([r()],al.prototype,"reviewList",2),nl([r()],al.prototype,"designType",2),nl([r()],al.prototype,"rollingReviewCount",2),nl([r()],al.prototype,"reviewCount",2),nl([r()],al.prototype,"reviewRating",2),al=nl([ae("review-rolling-widget")],al);const pl=e=>{const t=ge(e);return ue`
    :host {
      display: block;
      font-family: var(--alp-common-font-family);
      color: var(--alp-review-text-gray100);

      container-name: ${t}-widget-container;
      container-type: inline-size;
    }

    .${t}-widget-container {
      width: 100%;
      padding: 20px 10px 40px;
    }

    /* ê³µì ì ìë´(review-compliance-guide)ê° íë¨ì ë¶ë ê²½ì°, ì»¨íì´ë íë¨ ì¬ë°± ì ê±° */
    :host([data-compliance-attached]) .${t}-widget-container {
      padding-bottom: 0;
    }

    .${t}-swiper-container {
      position: relative;
      overflow: hidden;
      transition: transform, height 0.5s ease;
      height: var(--${t}-swiper-height, auto);
    }

    .${t}-swiper-wrapper {
      position: relative;
      width: 100%;
      box-sizing: content-box;
    }

    /* ì¤ìì´í¼ ë¯¸ì¬ì© ì ê·¸ë¦¬ë ë ì´ìì */
    .${t}-swiper-wrapper--grid {
      display: grid;
    }

    @container (max-width: 440px) {
      .${t}-widget-container {
        padding-bottom: 20px;
      }
    }
  `},ll=[Ni,Di,pl("simple-photo"),ue`.simple-photo-content{display:flex}.simple-photo-swiper-container{flex:1;min-width:0}.simple-photo-swiper-slide--empty-box{aspect-ratio:1;background:var(--alp-review-card-gray05,#1e293b0d);width:100%}`];class dl{constructor(e,t){this.deviceKind="mobile",this.reviewList=[],this.isReviewListLoading=!1,this.filterOption={page:1,page_size:1,product_no:"all",widget_code:"",device:"w"},this.grid={row:0,col:0,gap:0},this.totalPages=0,this.totalRenderCount=0,this.pageUnit=0,this.shopPageInfo=void 0,this.isDesignLoaded=!1,this.extraItem=null,this.isSingleRow=!1,this.avgReviewRating=0,this.totalReviewCount=0,this.hasCover=!1,this.isFirstResize=!0,this.isSwiperInitialized=!1,this.isSwiperType=!1,this.isFirstUpdate=!0,this.isMetaLoaded=!1,this.isWidgetLoaded=!1,this.isDestroyed=!1,this.requestQueue=Promise.resolve(),this.onPrevClick=()=>{this.swiper?.slidePrev()},this.onNextClick=()=>{this.swiper?.slideNext()},this.onPaginationBulletClick=e=>{const t=e.detail.index;this.swiper?.slideTo(t*this.grid.col)},this.onPaginationMoreClick=async()=>{this.filterOption.page++,this.getReviewList()},this.host=e,this.options=t,this.deviceKind=P(e)}async initialize(){this.filterOption.widget_code=this.host.widgetCode,this.shopPageInfo=await f(),this.host.productNo="PRODUCT_DETAIL"===await f()?v()||this.host.productNo:"all",this.filterOption.product_no=this.host.productNo,this.host.isDummy&&(this.filterOption.is_dummy=!0);try{await this.getWidgetOption(),this.initializeWidget(),await this.getReviewMeta(),await this.host.requestUpdate();const e=this.host.shadowRoot.querySelector(this.options.swiperWrapperSelector);e&&(e.style.gap=this.grid.gap+"px",e.classList.add(this.options.widgetType+"-swiper-wrapper--grid"),e.style.cssText=`\n          grid-template-columns: repeat(${this.grid.col}, 1fr);\n          gap: ${this.grid.gap}px;\n        `),this.isSwiperType?(await this.initializeSwiper(),e&&(e.style.gap="0",e.classList.remove(this.options.widgetType+"-swiper-wrapper--grid")),await this.host.updateComplete,await new Promise(e=>requestAnimationFrame(e)),this.swiper?.update()):this.isSwiperInitialized=!0,this.getReviewList(),await this.requestQueue,await this.host.updateComplete,this.setSwiperHeight(),W(this.host,this.host.customJs??""),z(this.host,this.host.customCss??""),this.isFirstUpdate=!0}catch(e){}finally{this.isFirstUpdate=!1,this.isWidgetLoaded=!0}}destroy(){this.isDestroyed=!0,this.swiper?.destroy(!0,!0),this.swiper=void 0,this.resizeCtrl&&(this.resizeCtrl.hostDisconnected(),this.resizeCtrl=void 0)}initializeResizeManager(){this.resizeCtrl=new zr(this.host,async e=>{if(this.isDestroyed)return;const t=this.deviceKind;if(this.deviceKind=e,!("pc"===t&&"pc"!==this.deviceKind||"pc"!==t&&"pc"===this.deviceKind))if(this.isFirstResize)this.isFirstResize=!1;else try{this.setGridSize(),this.host.requestUpdate(),this.initializeWidget(),await this.getReviewMeta(),this.isSwiperType?await this.updateSwiper():this.host.shadowRoot.querySelector(this.options.swiperWrapperSelector).style.cssText=`\n              grid-template-columns: repeat(${this.grid.col}, 1fr);\n              gap: ${this.grid.gap}px;\n            `,this.getReviewList(),await this.requestQueue,await this.host.updateComplete,this.setSwiperHeight()}catch(e){}finally{this.isFirstUpdate=!1,this.isWidgetLoaded=!0}},{target:"self"})}initialSwiper(){const e=this.grid.row>1?{rows:this.grid.row,fill:"row"}:void 0;this.swiper=n({container:this.host.shadowRoot.querySelector(this.options.swiperContainerSelector),styleRoot:this.host.shadowRoot,options:{freeMode:{enabled:"free"===this.designOption?.slide_type},slidesPerView:this.grid.col,spaceBetween:this.grid.gap,slidesPerGroup:this.grid.col,autoplay:{delay:1e3*this.designOption.autoplay_delay},speed:500,grid:e},event:{slideChange:async()=>{this.filterOption.page=this.getCurrentPage(),this.host.requestUpdate()},slideChangeTransitionEnd:async()=>{this.getReviewList(),await this.host.updateComplete,this.setSwiperHeight()}}}),this.designOption.autoplay||this.swiper?.autoplay.stop(),this.swiper.allowTouchMove=!!this.designOption.swipe,this.options.onSwiperInitialized&&this.options.onSwiperInitialized(this.swiper,this),this.swiper.update()}async initializeSwiper(){this.swiper||(window?.CUSTOM_SWIPER?.swiper?this.initialSwiper():await p(()=>{this.initialSwiper()}),this.isSwiperInitialized=!0)}async updateSwiper(){this.swiper.params.slidesPerView=this.grid.col,this.swiper.params.slidesPerGroup=this.grid.col,this.swiper.params.grid=this.grid.row>1?{rows:this.grid.row,fill:"row"}:void 0,this.swiper.params.spaceBetween=this.grid.gap,this.options.onUpdateSwiper&&this.options.onUpdateSwiper(this.swiper,this),this.swiper.activeIndex=0,this.swiper.update()}async getWidgetOption(){try{this.designOption=window?.ALPHA_PREVIEW?this.host.previewOption||{}:await A(this.host.widgetCode,window.ALPHA_REVIEW_EMERGENCY?`/widget_option/${this.host.widgetCode}.json`:void 0),this.paginationType=this.designOption?.paging_type===qi||this.designOption?.paging_type===Yi?this.designOption?.indicator_type:this.designOption?.paging_type,this.isSwiperType=this.designOption?.paging_type===qi||this.designOption?.paging_type===Yi,this.hasCover=this.designOption?.stat_ratings&&"PRODUCT_DETAIL"===this.shopPageInfo||!1,this.setGridSize(),z(this.host,this.host.customCss??""),this.isDesignLoaded=!0}catch(e){this.isDesignLoaded=!1}}async getReviewMeta(){const e={...this.filterOption};try{let t;t=window?.ALPHA_PREVIEW?this.host.previewMeta||{}:await x(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_meta_data/${this.host.widgetCode}/products/${this.host.productNo}/device/${this.filterOption.device}.json`:void 0),t?.code&&j(t.code),this.pageUnit=this.getPageUnit();let i=Math.min(t.total_page,this.designOption?.page_max),r=Math.min(t.total_count,this.designOption?.page_max*this.pageUnit);(this.hasCover&&this.isSwiperType&&this.grid.row>1||this.paginationType===Ki)&&(i=Math.min(Math.ceil((1+r)/this.pageUnit),this.designOption?.page_max),r=Math.min(r,i*this.pageUnit-1)),this.totalPages=i,this.totalRenderCount=r,this.totalReviewCount=t.total_review_count||t.total_count,this.avgReviewRating=t.avg_review_rating||0,this.reviewList=Array.from({length:(()=>this.options.setInitialSkeletonLength?this.options.setInitialSkeletonLength(this):this.isSwiperType?this.pageUnit*this.totalPages:this.pageUnit)()}),this.host.requestUpdate(),this.isMetaLoaded=!0}catch(e){throw this.errorCode=F(e?.code),this.isMetaLoaded=!0,Error(e)}}getReviewList(){this.requestQueue=this.requestQueue.then(()=>this.fetchReviewList())}async fetchReviewList(){this.isReviewListLoading=!0,this.host.requestUpdate();const e=this.filterOption.page;if(window.ALPHA_REVIEW_EMERGENCY&&this.reviewList[0]?.id)this.host.requestUpdate();else try{const t=this.calculatePagesToLoad();if(0===t.length)return;if(e>this.totalPages)return void this.setItems([],e);if(this.isSwiperType){const i=t.map(e=>this.fetchSinglePage(e).then(t=>({page:e,data:t}))),r=await Promise.all(i);this.filterOption.page===e&&r.forEach(({page:e,data:t})=>{t.length>0&&this.setItems(t,e)})}else{const t=await this.fetchSinglePage(e);this.setItems(t,e)}}catch(e){}finally{this.isReviewListLoading=!1,this.host.requestUpdate()}}async fetchSinglePage(e){const t={...this.filterOption,page:e,page_size:this.getPageUnit()};try{let e;return e=window?.ALPHA_PREVIEW?this.host.previewData||[]:await b(t,window.ALPHA_REVIEW_EMERGENCY?`/widget_data/${this.host.widgetCode}/products/${this.host.productNo}/device/${this.filterOption.device}.json`:void 0),e}catch(e){return[]}}calculatePagesToLoad(){const e=this.filterOption.page,t=[e-1,e,e+1].filter(e=>e>=1&&e<=this.totalPages).filter(e=>{let t;return t=1===this.grid.col&&this.grid.row>1?this.hasCover&&!this.isSingleRow?1===e?this.totalPages-1:e-2:e-1:(e-1)*this.getPageUnit(),!this.reviewList[t]?.id});return window.ALPHA_REVIEW_EMERGENCY?[1]:t}setItems(e,t){if(this.options.onSetItems)return this.options.onSetItems(e,t,this),void this.host.requestUpdate();const i=this.getPageUnit(),r=(t-1)*i;if(window.ALPHA_REVIEW_EMERGENCY)return this.reviewList=[...e],void this.host.requestUpdate();if(this.isSwiperType)if(1===this.grid.col&&this.grid.row>1){1===t&&(this.reviewList=Array(this.totalPages*i));const r=[...this.reviewList];for(let i=0;i<e.length;i++)r[i*this.totalPages+(t-1)]=e[i];this.reviewList=r}else if(1===t)this.reviewList.splice(0,Math.min(i,e.length),...e);else{const t=[...this.reviewList];for(let i=0;i<e.length;i++)t[r+i]=e[i];this.reviewList=t}else this.reviewList=1===t?[...e]:[...this.reviewList,...e];1===this.totalPages&&(this.reviewList=structuredClone(this.reviewList).filter(e=>e)),this.host.requestUpdate()}get isPrevVisible(){return this.swiper?.activeIndex>0}get isNextVisible(){const e=this.totalPages*this.grid.col-this.grid.col;return this.swiper?.activeIndex<e}initializeWidget(){this.isWidgetLoaded=!1,this.filterOption.page_size=this.getPageUnit(),this.filterOption.device="mobile"===this.deviceKind?"m":"w",this.filterOption.page=1,this.totalPages=0,this.totalRenderCount=0,this.reviewList=[],this.extraItem=null,this.isSingleRow=1===this.grid.row}getPageUnit(){if(this.options.getPageUnitOverride)return this.options.getPageUnitOverride(this.deviceKind,this.designOption);switch(this.deviceKind){case"mobile":return this.designOption?.num_row_m*this.designOption?.num_col_m;case"tablet":case"pc":return this.designOption?.num_row*this.designOption?.num_col}}getCurrentPage(){return Math.floor(this.swiper?.activeIndex/this.grid.col)+1}setGridSize(){if(this.options.setGridSizeOverride){const e=this.options.setGridSizeOverride(this.deviceKind,this.designOption);return void(this.grid=e)}switch(this.deviceKind){case"mobile":this.grid.row=this.designOption?.num_row_m,this.grid.col=this.designOption?.num_col_m,this.grid.gap=10;break;case"tablet":this.grid.row=this.designOption?.num_row,this.grid.col=this.designOption?.num_col,this.grid.gap=14;break;case"pc":this.grid.row=this.designOption?.num_row,this.grid.col=this.designOption?.num_col,this.grid.gap=20}}async setSwiperHeight(){if(!this.swiper)return;await new Promise(e=>requestAnimationFrame(e));const e=this.host.shadowRoot?.querySelectorAll(".slide-item");if(!e||0===e.length)return;const t=this.getCurrentPage(),i=this.getPageUnit(),r=Math.ceil(this.totalRenderCount/i),{gap:o,row:s,col:n}=this.grid,a=[];for(let t=0;t<s;t++){let o=0;for(let a=0;a<r;a++)for(let r=0;r<n;r++){let p;if(p=1===n&&s>1?t*this.totalPages+a:a*i+t*n+r,p<e.length){const t=parseFloat(e[p].getBoundingClientRect().height.toFixed(1));t>o&&(o=t)}}a.push(Math.ceil(o))}if(a.every(e=>0===e))return;const p=(r-1)*i;let l=0;for(let e=0;e<s;e++)for(let t=0;t<n;t++){let i;i=1===n&&s>1?e*this.totalPages+(r-1):p+e*n+t,i<this.reviewList.length&&this.reviewList[i]?.id&&(l=e)}const d=t===r?l+1:s,c=this.host.shadowRoot?.querySelector(".swiper-container"),h=parseFloat(window.getComputedStyle(c).paddingBottom)+parseFloat(window.getComputedStyle(c).paddingTop),g=a.slice(0,d).reduce((e,t)=>e+t,0)+o*(d-1);this.host.style.setProperty(`--${this.options.widgetType}-swiper-height`,g+h+"px")}get isReady(){return this.isDesignLoaded&&this.isMetaLoaded}get isSwiperTypeActive(){return this.isSwiperType}}var cl=Object.defineProperty,hl=Object.getOwnPropertyDescriptor,gl=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?hl(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cl(t,i,s),s};let ul=class extends(wn(ht)){constructor(){super(...arguments),this.previewData={},this.previewOption={},this.previewMeta={},this.widgetCode="",this.widgetSetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs=""}async updated(e){if(super.updated(e),e.has("isInViewport")){if(!this.isInViewport)return;this.provider=new dl(this,{widgetType:"simple-photo",swiperContainerSelector:"#sw-"+this.widgetCode,swiperWrapperSelector:".simple-photo-swiper-wrapper",setGridSizeOverride:(e,t)=>{switch(e){case"mobile":return{row:t.num_row_m,col:t.num_col_m,gap:2};case"tablet":return{row:t.num_row,col:t.num_col,gap:4};case"pc":return{row:t.num_row,col:t.num_col,gap:10}}},setInitialSkeletonLength:e=>e.hasCover&&(!e.isSwiperTypeActive||e.isSwiperTypeActive&&!e.isSingleRow)?e.isSwiperTypeActive?e.pageUnit*e.totalPages-1:e.pageUnit-1:e.isSwiperTypeActive?e.pageUnit*e.totalPages:e.pageUnit,onSetItems:(e,t,i)=>{if(window.ALPHA_REVIEW_EMERGENCY)i.reviewList=[...e];else if(i.isSwiperTypeActive){const r=[...i.reviewList];if(1===i.grid.col&&i.grid.row>1)if(i.hasCover&&!i.isSingleRow){const o=t>=i.totalPages;if(1===t){for(let t=0;t<e.length-1;t++){const o=(t+1)*i.totalPages-1;if(o>=i.totalRenderCount)break;r[o]=e[t]}i.extraItem=e[e.length-1]}else if(i.extraItem){const s=0*i.totalPages+(t-2);if(s<i.totalRenderCount&&(r[s]=i.extraItem),o){if(i.totalPages*i.pageUnit!==i.totalRenderCount)for(let o=0;o<e.length;o++){const s=(o+1)*i.totalPages+(t-2);if(s>=i.totalRenderCount)break;r[s]=e[o]}else for(let o=0;o<e.length;o++){const s=(o+1)*i.totalPages+(t-2);if(s>=i.totalRenderCount)break;r[s]=e[o]}i.extraItem=null}else{for(let o=0;o<e.length-1;o++){const s=(o+1)*i.totalPages+(t-2);if(s>=i.totalRenderCount)break;r[s]=e[o]}i.extraItem=e[e.length-1]}}}else for(let o=0;o<e.length;o++){const s=o*i.totalPages+(t-1);if(s>=r.length)break;r[s]=e[o]}else{const o=(t-1)*i.filterOption.page_size;if(i.hasCover&&!i.isSingleRow)for(let t=0;t<e.length;t++){const s=o+t;if(s>=i.totalRenderCount)break;r[s]=e[t]}else for(let t=0;t<e.length;t++){const i=o+t;if(i>=r.length)break;r[i]=e[t]}}i.reviewList=r}else 1===t?i.hasCover&&i.totalRenderCount>=i.pageUnit?(i.extraItem=e[e.length-1],i.reviewList.splice(0,e.length-1,...e.slice(0,-1))):i.reviewList=[...e]:i.hasCover?i.extraItem&&(t>=i.totalPages?(i.reviewList=[...i.reviewList,i.extraItem,...e],i.extraItem=null):(i.reviewList=[...i.reviewList,i.extraItem,...e.slice(0,-1)],i.extraItem=e[e.length-1])):i.reviewList=[...i.reviewList,...e]}}),await this.provider.initialize(),this.provider.initializeResizeManager()}}disconnectedCallback(){this.provider?.destroy(),super.disconnectedCallback()}render(){if(!this.provider?.isDesignLoaded)return Je`<div style="width:100%; height:1px;"></div>`;if(!this.provider?.isReady)return null;const e=`simple-photo-widget-container${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`,t=this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode;return this.provider?.errorCode?V(this.provider.errorCode,this.productNo,this.widgetSetCode||this.widgetCode,this.widgetCode):Je`<div class=${e} id=${t}>
      <review-header-title .designOption=${this.provider.designOption}></review-header-title>
      <div class="simple-photo-content">
        ${this.provider.hasCover&&this.provider.isSingleRow&&this.provider.isSwiperTypeActive?Je`
              
              <review-simple-photo-cover
                .style=${`margin-right: ${this.provider.grid.gap}px; min-width: calc((100% - ${this.provider.grid.gap*this.provider.pageUnit}px) / ${this.provider.pageUnit+1});`}
                .gap=${this.provider.grid.gap}
                .pageUnit=${this.provider.pageUnit}
                .totalReviewCount=${this.provider.totalReviewCount}
                .avgReviewRating=${this.provider.avgReviewRating}
                .review=${this.provider.reviewList[0]}
                .shopPageInfo=${this.provider.shopPageInfo}
              ></review-simple-photo-cover>
            `:null}
        <div id="sw-${this.widgetCode}" class="swiper-container simple-photo-swiper-container">
          <div class="swiper-wrapper simple-photo-swiper-wrapper">
            ${!this.provider.hasCover||this.provider.isSingleRow&&this.provider.isSwiperTypeActive?null:Je`
                  <review-simple-photo-cover
                    class=${this.provider.isSwiperTypeActive?"swiper-slide simple-photo-swiper-slide":""}
                    .gap=${this.provider.grid.gap}
                    .pageUnit=${this.provider.pageUnit}
                    .totalReviewCount=${this.provider.totalReviewCount}
                    .avgReviewRating=${this.provider.avgReviewRating}
                    .review=${this.provider.reviewList[0]}
                    .shopPageInfo=${this.provider.shopPageInfo}
                  ></review-simple-photo-cover>
                `}
            ${this.provider.reviewList.map((e,t)=>Je`<div class="swiper-slide simple-photo-swiper-slide">
                <review-simple-photo-item
                  class="slide-item"
                  .review=${e}
                  .filterOption=${this.provider?.filterOption}
                  .designOption=${this.provider?.designOption}
                  .isReviewListLoading=${this.provider?.isReviewListLoading}
                  .index=${t}
                  .reviewList=${this.provider?.reviewList}
                ></review-simple-photo-item>
              </div>`)}
          </div>
          ${this.provider?.designOption?.navigation?Je`
                <review-arrow-pagination-handler
                  .type=${Qt}
                  .isPrevVisible=${this.provider.isPrevVisible}
                  .isNextVisible=${this.provider.isNextVisible}
                  @prevArrowClick=${this.provider.onPrevClick}
                  @nextArrowClick=${this.provider.onNextClick}
                ></review-arrow-pagination-handler>
              `:null}
        </div>
      </div>
      ${this.provider.designOption?.paging_type!==Gi&&this.provider.designOption?.indicator_type!==Hi?Je`
            <review-pagination-handler
              .paginationType=${this.provider.paginationType}
              .totalPages=${this.provider.totalPages}
              .currentPage=${this.provider.getCurrentPage()}
              .isMoreLoading=${this.provider.isReviewListLoading}
              .hasMoreReviews=${this.provider.reviewList.length<this.provider.totalRenderCount}
              .isLinksVisible=${!0}
              @paginationPrevClick=${this.provider.onPrevClick}
              @paginationNextClick=${this.provider.onNextClick}
              @paginationBulletClick=${this.provider.onPaginationBulletClick}
              @paginationMoreClick=${this.provider.onPaginationMoreClick}
            ></review-pagination-handler>
          `:null}
    </div>`}};ul.styles=ll,gl([i({type:Object,attribute:"data-widget-preview-data"})],ul.prototype,"previewData",2),gl([i({type:Object,attribute:"data-widget-preview-option"})],ul.prototype,"previewOption",2),gl([i({type:Object,attribute:"data-widget-preview-meta"})],ul.prototype,"previewMeta",2),gl([i({type:String,attribute:"data-widget-code"})],ul.prototype,"widgetCode",2),gl([i({type:String,attribute:"data-widget-set-code"})],ul.prototype,"widgetSetCode",2),gl([i({type:String,attribute:"data-product-no"})],ul.prototype,"productNo",2),gl([i({type:String,attribute:"data-widget-custom-class"})],ul.prototype,"widgetCustomClass",2),gl([i({type:String,attribute:"data-widget-custom-id"})],ul.prototype,"widgetCustomId",2),gl([i({type:Boolean,attribute:"data-dummy"})],ul.prototype,"isDummy",2),gl([i({type:String,attribute:"data-custom-class"})],ul.prototype,"customClass",2),gl([i({type:String,attribute:"data-custom-id"})],ul.prototype,"customId",2),gl([i({type:String,attribute:"data-custom-css"})],ul.prototype,"customCss",2),gl([i({type:String,attribute:"data-custom-js"})],ul.prototype,"customJs",2),ul=gl([ae("review-simple-photo-widget")],ul);var wl=Object.defineProperty,vl=Object.getOwnPropertyDescriptor,ml=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?vl(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&wl(t,i,s),s};let yl=class extends ht{constructor(){super(...arguments),this.isReviewListLoading=!1}render(){return Je`
      <div class="photo-skeleton-slide">
        <div
          class="${this.isReviewListLoading?"review-skeleton skeleton-media":"remove-shimmer"}"
        ></div>
      </div>
    `}};yl.styles=[ko,ue`:host{display:block;container:simple-photo-swiper-slide/inline-size}.remove-shimmer{animation:none}.skeleton-media{aspect-ratio:1;width:100%}`],ml([i({type:Object})],yl.prototype,"designOption",2),ml([i({type:Boolean})],yl.prototype,"isReviewListLoading",2),yl=ml([ae("review-simple-photo-skeleton")],yl);var fl=Object.defineProperty,bl=Object.getOwnPropertyDescriptor,xl=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?bl(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&fl(t,i,s),s};let _l=class extends ht{constructor(){super(...arguments),this.gap=0,this.pageUnit=0,this.totalReviewCount=0,this.avgReviewRating=0}createRenderRoot(){return this}render(){const e=Je`<style>.simple-photo-cover { container-name: simple-photo-cover; container-type: inline-size; position: relative; display: flex; flex-shrink: 0; flex-grow: 0; overflow: hidden; width: 100%; aspect-ratio: 1 / 1; } .simple-photo-review-info-thumbnail { position: absolute; top: 0; left: 0; width: 100%; height: 100%; flex-shrink: 0; object-fit: cover; z-index: 0; } .simple-photo-review-info-content { display: flex; flex-direction: column; align-items: center; justify-content: center; position: absolute; top: 0; left: 0; width: 100%; height: 100%; color: #fff; background-color: rgba(0, 0, 0, 0.6); z-index: 1; } .simple-photo-review-info-content > p { color: inherit; } .review-count-text { font-size: clamp(0px, 15cqw, 30px); font-weight: 500; white-space: nowrap; } .review-count { color: var(--alp-common-color); } .review-rating-text { font-size: clamp(0px, 45cqw, 90px); font-weight: 700; line-height: 100%; white-space: nowrap; } .review-rating-stars { display: flex; align-items: center; justify-content: center; margin-top: clamp(0px, 5cqw, 8px); } .review-rating-stars review-star-icon svg { width: clamp(0px, 17cqw, 34px); }</style>`;return Je`${e}${this.review?.id?Je`
          <div class="simple-photo-cover">
            <img
              class="simple-photo-review-info-thumbnail"
              alt="product image"
              src="${this.review?.product?.detail_image}"
            />
            <div class="simple-photo-review-info-content">
              <p class="review-count-text">
                ë¦¬ë·°
                <span class="review-count">${this.totalReviewCount||0}</span>ê°
              </p>
              <p class="review-rating-text">${this.avgReviewRating?.toFixed(1)||"0.0"}</p>
              <p class="review-rating-stars">
                ${Array.from({length:Math.round(this.avgReviewRating||5)}).map(()=>Je`<review-star-icon></review-star-icon>`)}
              </p>
            </div>
          </div>
        `:Je` <review-simple-photo-skeleton></review-simple-photo-skeleton> `} `}};xl([i({type:Number})],_l.prototype,"gap",2),xl([i({type:Number})],_l.prototype,"pageUnit",2),xl([i({type:Number})],_l.prototype,"totalReviewCount",2),xl([i({type:Number})],_l.prototype,"avgReviewRating",2),xl([i({type:Object})],_l.prototype,"review",2),xl([i({type:String})],_l.prototype,"shopPageInfo",2),_l=xl([ae("review-simple-photo-cover")],_l);var Cl=Object.defineProperty,$l=Object.getOwnPropertyDescriptor,Ol=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?$l(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Cl(t,i,s),s};let kl=class extends ht{constructor(){super(...arguments),this.isReviewListLoading=!1,this.index=0,this.getPlatform=e=>"\uc778\uc2a4\ud0c0\uadf8\ub7a8"===e?vt:"\ub124\uc774\ubc84\ube14\ub85c\uadf8"===e?mt:""}createRenderRoot(){return this}openDetailPopup(){gn({reviewId:this.review?.id?.toString(),option:this.filterOption,reviewIndex:this.index,backupList:this.reviewList})}render(){return Je`<style>.simple-photo-swiper-slide { container-name: simple-photo-swiper-slide; container-type: inline-size; width: 100%; min-height: fit-content; overflow: hidden; } .review-media { cursor: pointer; }</style>
      ${this.review?.id?Je`
            <review-review-media
              class="review-media"
              .reviewMedia=${this.review.ordered_media[0]}
              .productImg="${this.review.product?.detail_image}"
              .socialType=${this.getPlatform(this.review.platform_display)}
              .totalPages="${this.review.media_length}"
              @click=${this.openDetailPopup}
            ></review-review-media>
          `:Je`
            <review-simple-photo-skeleton
              .designOption=${this.designOption}
              .isReviewListLoading=${this.isReviewListLoading}
            ></review-simple-photo-skeleton>
          `} `}};Ol([i({type:Object})],kl.prototype,"review",2),Ol([i({type:Object})],kl.prototype,"reviewList",2),Ol([i({type:Object})],kl.prototype,"filterOption",2),Ol([i({type:Object})],kl.prototype,"designOption",2),Ol([i({type:Boolean})],kl.prototype,"isReviewListLoading",2),Ol([i({type:Number})],kl.prototype,"index",2),kl=Ol([ae("review-simple-photo-item")],kl);const Sl=[Ni,Di,pl("photo"),ue`.photo-swiper-slide{grid-template-columns:repeat(var(--photo-gallery-cols,1),minmax(0,1fr));grid-template-rows:repeat(var(--photo-gallery-rows,1),minmax(min-content,min-content));gap:12px;width:100%;display:grid}`];var El=Object.defineProperty,Rl=Object.getOwnPropertyDescriptor,Ll=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Rl(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&El(t,i,s),s};let Il=class extends(wn(ht)){constructor(){super(...arguments),this.widgetCode="",this.widgetSetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs="",this.totalPages=0,this.totalCount=0,this.filterOption={page:1,page_size:10,widget_code:"",product_no:"all",device:"mobile"===P(this)?"m":"w"},this.row=2,this.col=4,this.designOption={},this.reviews={},this.isReviewListLoading=!1,this.reviewList=[],this.pageIndex=1,this.isDesignLoading=!0,this.isReady=!1,this.resizeCtrl=new zr(this,()=>{this.swiper&&this.initialWidget()},{target:"self"}),this.onPaginationBulletClick=e=>{const t=e.detail.index;this.swiper?.slideTo(t)},this.onPaginationMoreClick=async()=>{if(this.filterOption.page===this.totalPages)return;this.filterOption.page++;const e=await this.getReviewList(this.filterOption.page);this.reviewList.push(e),this.requestUpdate()}}async updated(e){if(super.updated(e),e.has("isInViewport")){if(!this.isInViewport)return;this.isDummy&&(this.filterOption.is_dummy=!0),this.productNo="PRODUCT_DETAIL"===await f()?v()||this.productNo:"all",this.filterOption.product_no=this.productNo,this.filterOption.widget_code=this.widgetCode,this.filterOption.device="mobile"===P(this)?"m":"w",window?.CUSTOM_SWIPER?this.initialWidget():await p(()=>this.initialWidget())}}async getWidgetOption(){try{const e="mobile"===P(this);this.designOption=window?.ALPHA_PREVIEW?this.previewOption||{}:await A(this.widgetCode,window.ALPHA_REVIEW_EMERGENCY?`/widget_option/${this.widgetCode}.json`:void 0),this.paginationType=this.designOption?.paging_type===qi||this.designOption?.paging_type===Yi?this.designOption?.indicator_type:this.designOption?.paging_type,this.isSwiperType=this.designOption?.paging_type===qi||this.designOption?.paging_type===Yi,this.col=e?this.designOption?.num_col_m:this.designOption?.num_col,this.row=e?this.designOption?.num_row_m:this.designOption?.num_row,this.style.setProperty("--photo-gallery-cols",""+this.col),this.style.setProperty("--photo-gallery-rows",""+this.row)}catch(e){}finally{this.isDesignLoading=!1}}async getReviewMeta(){const e={...this.filterOption};try{let t;t=window?.ALPHA_PREVIEW?this.previewMeta||{}:await x(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_meta_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0),this.totalCount=t.total_count,this.totalPages=t.total_page,t?.code&&j(t.code)}catch(e){throw this.errorCode=F(e?.code),Error(e)}}async getReviewList(e){const t={...this.filterOption,page:e,page_size:this.getPageUnit()};try{if(window?.ALPHA_PREVIEW)return this.reviewList=this.previewData||[],void this.requestUpdate();if(void 0!==this.reviewList?.[e-1]?.[0]||e<1)return;return await b(t,window.ALPHA_REVIEW_EMERGENCY?`/widget_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0)}catch(e){throw Error()}}onPrevClick(){1!==this.filterOption.page&&this.swiper.slideTo(this.filterOption.page-2)}onNextClick(){this.filterOption.page!==this.totalPages&&this.swiper.slideTo(this.filterOption.page)}getPageUnit(){switch(P(this)){case"mobile":return this.designOption?.num_row_m*this.designOption?.num_col_m;case"tablet":case"pc":return this.designOption?.num_row*this.designOption?.num_col}}async initialWidget(){this.resetWidget();try{await this.getWidgetOption(),await this.getReviewMeta(),this.isSwiperType&&(this.initialSwiper(),this.appendReviewList(),this.requestUpdate()),await this.setupReviewList(this.filterOption.page)}catch(e){this.requestUpdate()}finally{this.isSwiperType&&await this.setupReviewList(this.filterOption.page+1),this.isReady=!0,W(this,this.customJs),z(this,this.customCss??""),this.requestUpdate()}this.setSwiperHeight(),await this.updateComplete}initialSwiper(){const e=!!this.designOption.autoplay&&{delay:1e3*this.designOption.autoplay_delay},t=this.designOption.paging_type===Yi;this.swiper=n({container:this.shadowRoot.querySelector("#sw-"+this.widgetCode),styleRoot:this.shadowRoot,options:{freeMode:{enabled:t},slidesPerView:1,spaceBetween:12,autoplay:e,speed:500,allowTouchMove:this.designOption.swipe,simulateTouch:this.designOption.swipe},event:{slideChange:async()=>{this.slideChangePromise=(async()=>{this.filterOption.page=this.getCurrentPage(),this.pageIndex=this.filterOption.page;const e=this.getCurrentPage();(this.shadowRoot?.querySelectorAll(".swiper-slide")||[])[e]||(this.appendReviewList(),this.requestUpdate(),await this.updateComplete,this.swiper.update()),await this.setupReviewList(this.filterOption.page),1!==this.pageIndex&&await this.setupReviewList(this.filterOption.page-1),this.pageIndex!==this.totalPages&&await this.setupReviewList(this.filterOption.page+1),this.setChunkPage()})()},slideChangeTransitionEnd:async()=>{this.slideChangePromise&&await this.slideChangePromise,requestAnimationFrame(()=>{this.setSwiperHeight()})}}})}resetWidget(){this.swiper?.destroy(!0,!0),this.swiper=null,this.reviewList=[],this.filterOption.page=1,this.pageIndex=1}appendReviewList(){const e="mobile"===P(this)&&this.designOption.indicator_type===Ui?5:10,t=this.totalPages-this.reviewList.length,i=Array.from({length:this.col*this.row}),r=Math.max(0,Math.min(t,e));for(let e=0;e<r;e++)this.reviewList.push([...i])}getCurrentPage(){return this.swiper?.activeIndex+1}updateReview(e,t){if(!e?.length)return;this.reviewList[t-1]=e;const i=this.shadowRoot?.querySelectorAll(".swiper-slide");if(!i||0===i.length)return;const r=i[t-1];if(!r)return;const o=r.querySelectorAll("review-photo-card");for(let t=0;t<e.length;t++){const i=o[t];i&&(i.review=e[t],i.reviewList=this.reviewList)}}async setupReviewList(e){const t=await this.getReviewList(e);t&&this.updateReview(t,e)}setChunkPage(){const e=this.getCurrentPage(),t=Math.ceil(e/10),i=10*t,r=Math.max(0,10*(t-1)-1),o=i+1;(this.shadowRoot?.querySelectorAll(".swiper-slide")||[]).forEach((e,t)=>{e.style.contentVisibility=t>=r&&t<o?"visible":"hidden"})}async setSwiperHeight(){await new Promise(e=>requestAnimationFrame(e));const e=this.shadowRoot.querySelector("#sw-"+this.widgetCode),t=(this.shadowRoot?.querySelectorAll(".swiper-slide")||[])[this.pageIndex-1];if(!t)return;let i=0;t.querySelectorAll(":scope > div").forEach((e,t)=>{const r=e;if(t%this.col===0){if(r.querySelector("review-photo-skeleton"))return;i=i+r.scrollHeight+(0===t?0:12)}}),e.style.height=this.isSwiperType||1===this.totalPages?i+"px":"auto"}render(){if(this.isDesignLoading)return Je`<div style="width:100%; height:1px;"></div>`;const e=`photo-widget-container${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`,t=this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode;return this.errorCode?V(this.errorCode,this.productNo,this.widgetSetCode||this.widgetCode,this.widgetCode):Je`<div class=${e} id=${t}>
      <review-header-title .designOption=${this.designOption}></review-header-title>
      <div id="sw-${this.widgetCode}" class="swiper-container photo-swiper-container">
        <div class="swiper-wrapper photo-swiper-wrapper">
          ${this.reviewList.map(e=>Je`<div class="swiper-slide photo-swiper-slide">
                ${e.map((e,t)=>Je` <div>
                      <review-photo-card
                        class="slide-item"
                        .review=${e}
                        .designOption=${this.designOption}
                        .filterOption=${this.filterOption}
                        .isReviewListLoading=${this.isReviewListLoading}
                        .index=${t+(this.pageIndex-1)*this.col*this.row}
                        .reviewList=${this.reviewList}
                      ></review-photo-card>
                    </div>`)}
              </div>`)}
        </div>
        ${this.designOption?.navigation&&this.isSwiperType?Je`
              <review-arrow-pagination-handler
                .type=${Xt}
                .isPrevVisible=${!0}
                .isNextVisible=${!0}
                @prevArrowClick=${this.onPrevClick}
                @nextArrowClick=${this.onNextClick}
              ></review-arrow-pagination-handler>
            `:null}
      </div>
      ${this.designOption?.paging_type!==Gi&&this.designOption?.indicator_type!==Hi?Je`
            <review-pagination-handler
              .paginationType=${this.paginationType}
              .totalPages=${this.totalPages}
              .currentPage=${this.pageIndex}
              .isMoreLoading=${this.isReviewListLoading}
              .hasMoreReviews=${this.reviewList.length<this.totalCount}
              .productNo=${this.productNo}
              @paginationPrevClick=${this.onPrevClick}
              @paginationNextClick=${this.onNextClick}
              @paginationBulletClick=${this.onPaginationBulletClick}
              @paginationMoreClick=${this.onPaginationMoreClick}
              .isLinksVisible=${!0}
            ></review-pagination-handler>
          `:null}
    </div> `}};Il.styles=Sl,Ll([i({type:Object,attribute:"data-widget-preview-data"})],Il.prototype,"previewData",2),Ll([i({type:Object,attribute:"data-widget-preview-option"})],Il.prototype,"previewOption",2),Ll([i({type:Object,attribute:"data-widget-preview-meta"})],Il.prototype,"previewMeta",2),Ll([i({type:String,attribute:"data-widget-code"})],Il.prototype,"widgetCode",2),Ll([i({type:String,attribute:"data-widget-set-code"})],Il.prototype,"widgetSetCode",2),Ll([i({type:String,attribute:"data-product-no"})],Il.prototype,"productNo",2),Ll([i({type:String,attribute:"data-widget-custom-class"})],Il.prototype,"widgetCustomClass",2),Ll([i({type:String,attribute:"data-widget-custom-id"})],Il.prototype,"widgetCustomId",2),Ll([i({type:Boolean,attribute:"data-dummy"})],Il.prototype,"isDummy",2),Ll([i({type:String,attribute:"data-custom-class"})],Il.prototype,"customClass",2),Ll([i({type:String,attribute:"data-custom-id"})],Il.prototype,"customId",2),Ll([i({type:String,attribute:"data-custom-css"})],Il.prototype,"customCss",2),Ll([i({type:String,attribute:"data-custom-js"})],Il.prototype,"customJs",2),Ll([r()],Il.prototype,"totalPages",2),Ll([r()],Il.prototype,"totalCount",2),Ll([r()],Il.prototype,"filterOption",2),Ll([r()],Il.prototype,"row",2),Ll([r()],Il.prototype,"col",2),Ll([r()],Il.prototype,"designOption",2),Ll([r()],Il.prototype,"reviews",2),Ll([r()],Il.prototype,"isReviewListLoading",2),Ll([r()],Il.prototype,"reviewList",2),Ll([r()],Il.prototype,"paginationType",2),Ll([r()],Il.prototype,"isSwiperType",2),Ll([r()],Il.prototype,"pageIndex",2),Ll([r()],Il.prototype,"isDesignLoading",2),Ll([r()],Il.prototype,"isReady",2),Il=Ll([ae("review-photo-widget")],Il);var Pl=Object.defineProperty,Tl=Object.getOwnPropertyDescriptor,Al=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Tl(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Pl(t,i,s),s};let Nl=class extends ht{constructor(){super(...arguments),this.isReviewListLoading=!1,this.index=0,this.getPlatform=e=>"\uc778\uc2a4\ud0c0\uadf8\ub7a8"===e?vt:"\ub124\uc774\ubc84\ube14\ub85c\uadf8"===e?mt:"",this.isActiveProductInfo=()=>this.designOption?.product_img||this.designOption?.product_name||this.designOption?.product_price||this.designOption?.product_review||this.designOption?.product_ratings}createRenderRoot(){return this}openDetailPopup(){gn({reviewId:this.review?.id?.toString(),option:this.filterOption,reviewIndex:this.index,backupList:this.reviewList})}goToProductPage(e){pn(e)}willUpdate(e){super.willUpdate(e),e.has("review")&&this.review&&requestAnimationFrame(()=>{const e=this.querySelector?.("review-review-media");e&&this.review?.ordered_media?.[0]&&(e.reviewMedia=this.review.ordered_media[0])})}render(){const e=Je` <style>.photo-swiper-slide { container-name: photo-swiper-slide; container-type: inline-size; width: 100%; min-height: fit-content; overflow: hidden; contain: layout style; } .slide-item { padding-bottom: 10px; } .review-thumbnail { cursor: pointer; } .photo-review-content { display: flex; flex-direction: column; padding: 14px 4px; gap: 6px; } .review-info--small { display: none; } .review-info--medium { display: none; } .review-info--large { display: none; } .writer-info-box { display: flex; align-items: center; width: 100%; height: 23px; review-user-info { flex-shrink: 1; min-width: 0; overflow: hidden; } review-at-date { padding-right: 6px; } review-badge { margin-left: auto; } } .product-info-box { display: flex; width: 100%; padding: 13px 10px; gap: 13px; border-top: 0.5px solid var(--alp-review-border-gray20, rgba(30, 41, 59, 0.2)); cursor: pointer; } .product-content-box { display: flex; flex-direction: column; justify-content: center; overflow: hidden; } @container photo-swiper-slide (min-width: 0px) and (max-width: 120px) { .review-thumbnail { border-radius: 4px; } .product-info-box { display: none; } .writer-info-box { display: none; } .photo-review-content { padding: 12px 2px; } } @container photo-swiper-slide (min-width: 120px) and (max-width: 300px) { .review-thumbnail { border-radius: 8px; } .photo-review-content { padding: 16px 4px; gap: 10px; } .product-info-box { padding: ${this.designOption?.product_img||this.designOption?.product_name||this.designOption?.product_price?"16px 4px 12px":"8px 4px 12px"}; gap: 8px; } .product-content-box { gap: ${(this.designOption?.product_name||this.designOption?.product_price)&&(this.designOption?.product_ratings||this.designOption?.product_review)?"6px":"0px"}; } } @container photo-swiper-slide (min-width: 300px) { .review-thumbnail { border-radius: 12px; } .photo-review-content { padding: 16px 4px; gap: 10px; } .product-info-box { padding: ${this.designOption?.product_img||this.designOption?.product_name||this.designOption?.product_price?"16px 4px 12px":"8px 4px 12px"}; gap: 8px; } .product-content-box { gap: ${(this.designOption?.product_name||this.designOption?.product_price)&&(this.designOption?.product_ratings||this.designOption?.product_review)?"10px":"0px"}; } } .verified-badge-mo { display: none; } .verified-badge-pc { display: block; } @container (max-width: 839px) { .verified-badge-mo { margin-top: -4px; display: block; } .verified-badge-pc { display: none; } }</style>`;return Je`${e}${this.review?.id?Je`
          <review-review-media
            class="review-thumbnail"
            .reviewMedia=${this.review.ordered_media[0]}
            .isCallOut=${this.designOption?.use_callout}
            .productImg="${this.review.product?.detail_image}"
            .socialType=${this.getPlatform(this.review.platform_display)}
            .totalPages="${this.review.media_length}"
            @click=${this.openDetailPopup}
          ></review-review-media>
          <div class="photo-review-content">
            <review-review-info
              .review=${this.review}
              .showRatingStars=${this.designOption?.ratings&&!["\uc778\uc2a4\ud0c0\uadf8\ub7a8","\ub124\uc774\ubc84\ube14\ub85c\uadf8"].includes(this.review.platform_display)}
              .showOptionName=${this.designOption?.product_option}
              .starSize=${"16"}
              .fontSizeClassSmall_option=${"alp-caption11"}
              .fontSizeClassMedium_option=${"alp-caption11"}
              .fontSizeClassLarge_option=${"alp-caption11"}
              .fontSizeClassSmall_review=${"alp-body14"}
              .fontSizeClassMedium_review=${"alp-body14"}
              .fontSizeClassLarge_review=${"alp-body14"}
              .containerQueryInfo=${{name:"photo-swiper-slide",breakpoints:{small:0,medium:120,large:300},gap:{small:"6px",medium:"8px",large:"6px"},optionGap:{small:"0",medium:"6px",large:"10px"}}}
            ></review-review-info>
            ${this.designOption?.writer||this.designOption?.create_at?Je`
            <div class="writer-info-box">
              ${this.designOption?.writer?Je` <review-user-info
                      .review=${this.review}
                      .sizeType=${"small"}
                      .fontWeight=${"400"}
                      .fontSizeClassSmall=${"alp-caption11"}
                      .fontSizeClassMedium=${"alp-caption11"}
                      .fontSizeClassLarge=${"alp-caption11"}
                    ></review-user-info>`:null}
              ${this.designOption?.create_at&&this.designOption?.writer?Je` <review-custom-icon
                      .type=${Nt}
                      .width=${13}
                      .height=${13}
                      .color=${"var(--alp-review-icon-gray10)"}
                    ></review-custom-icon>`:null}
              ${this.designOption?.create_at?Je` <review-at-date
                      .createDate=${new Date(this.review.created_at)}
                      .fontWeight=${"400"}
                      .fontSizeClassSmall=${"alp-caption11"}
                      .fontSizeClassMedium=${"alp-caption11"}
                      .fontSizeClassLarge=${"alp-caption11"}
                    ></review-at-date>`:null}
              ${this.review.is_verified&&window.ALPHA_REVIEW_SHOP_DESIGN_OPTION?.use_writer_verify?Je`<review-badge
                      class="verified-badge-pc"
                      .type=${"verified"}
                      .fontSizeClassSmall=${"alp-caption10"}
                      .fontSizeClassMedium=${"alp-caption10"}
                      .fontSizeClassLarge=${"alp-caption11"}
                    ></review-badge>`:null}
            </div>
            ${this.review.is_verified&&window.ALPHA_REVIEW_SHOP_DESIGN_OPTION?.use_writer_verify?Je`<review-badge
                    class="verified-badge-mo"
                    .type=${"verified"}
                    .fontSizeClassSmall=${"alp-caption10"}
                    .fontSizeClassMedium=${"alp-caption10"}
                    .fontSizeClassLarge=${"alp-caption11"}
                  ></review-badge>`:null}
          </div>`:null}
            ${this.isActiveProductInfo()?Je` <div
                  class="product-info-box"
                  @click=${()=>this.goToProductPage(this.review.product?.product_no?.toString())}
                >
                  ${this.designOption?.product_img?Je` <review-product-thumbnail
                        .productImageUrl="${this.review.product?.detail_image}"
                        .containerQueryInfo=${{name:"photo-swiper-slide",breakpoints:{small:0,medium:120,large:300}}}
                      ></review-product-thumbnail>`:null}
                  <div class="product-content-box">
                    <review-product-name-price
                      .productName="${this.review.product?.product_name}"
                      .productPrice="${this.review.product?.price}"
                      .showProductName=${this.designOption?.product_name}
                      .showPrice=${this.designOption?.product_price}
                      .fontWeight=${"500"}
                      .fontSizeClassMedium_name=${"alp-body14"}
                      .fontSizeClassLarge_name=${"alp-body14"}
                      .fontSizeClassMedium_price=${"alp-caption10"}
                      .fontSizeClassLarge_price=${"alp-caption11"}
                      .containerQueryInfo=${{name:"photo-swiper-slide",breakpoints:{small:0,medium:120,large:300}}}
                    ></review-product-name-price>
                    <review-product-rating-count
                      .averageRating="${this.review.product?.review_ratings_connect}"
                      .reviewCount="${this.review.product?.review_number_connect_count}"
                      .showReviewCount=${this.designOption?.product_review}
                      .showRating=${this.designOption?.product_ratings}
                      .fontSizeClassMediumRating=${"alp-caption11"}
                      .fontSizeClassLargeRating=${"alp-caption11"}
                      .fontSizeClassMedium=${"alp-caption11"}
                      .fontSizeClassLarge=${"alp-caption11"}
                      .containerQueryInfo=${{name:"photo-swiper-slide",breakpoints:{small:0,medium:120,large:300}}}
                    ></review-product-rating-count>
                  </div>
                </div>`:null}
          </div>
        `:Je`
          <review-photo-skeleton
            .designOption=${this.designOption}
            .isReviewListLoading=${this.isReviewListLoading}
          ></review-photo-skeleton>
        `} `}};Al([i({type:Object})],Nl.prototype,"review",2),Al([i({type:Object})],Nl.prototype,"reviewList",2),Al([i({type:Object})],Nl.prototype,"designOption",2),Al([i({type:Object})],Nl.prototype,"filterOption",2),Al([i({type:Boolean})],Nl.prototype,"isReviewListLoading",2),Al([i({type:Number})],Nl.prototype,"index",2),Nl=Al([ae("review-photo-card")],Nl);var Dl=Object.defineProperty,Ml=Object.getOwnPropertyDescriptor,Wl=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Ml(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Dl(t,i,s),s};let zl=class extends ht{constructor(){super(...arguments),this.isReviewListLoading=!1,this.isActiveProductInfo=()=>this.designOption.product_img||this.designOption.product_name||this.designOption.product_price||this.designOption.product_review||this.designOption.product_ratings}render(){return Je`
      <div class="photo-skeleton-slide">
        
        <div
          class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-media"
        ></div>

        
        <div class="skeleton-review-content">
          
          

          
          <div
            class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-review-text"
          ></div>

          
          ${this.designOption?.writer||this.designOption?.create_at?Je`
                <div class="skeleton-writer-info-box">
                  <div
                    class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-writer"
                  ></div>
                </div>
              `:null}
          
          ${this.isActiveProductInfo()?Je`
                <div class="skeleton-product-info-box">
                  ${this.designOption?.product_img?Je`<div
                        class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-product-thumbnail"
                      ></div>`:null}
                  ${this.designOption?.product_name||this.designOption?.product_price||this.designOption?.product_ratings||this.designOption?.product_review?Je`
                        <div class="skeleton-product-content-box">
                          ${this.designOption?.product_name?Je`
                                <div
                                  class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-product-name"
                                ></div>
                              `:null}
                          ${this.designOption?.product_price?Je`
                                <div
                                  class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-product-price"
                                ></div>
                              `:null}
                          ${this.designOption?.product_ratings||this.designOption?.product_review?Je`
                                <div class="skeleton-rating-count-box">
                                  ${this.designOption?.product_ratings?Je`
                                        <review-star-icon
                                          .size=${14}
                                          .color=${"rgba(94, 103, 118, 0.13)"}
                                        ></review-star-icon>
                                      `:null}
                                  ${this.designOption?.product_review?Je`
                                        <div
                                          class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-product-count"
                                        ></div>
                                      `:null}
                                </div>
                              `:null}
                        </div>
                      `:null}
                </div>
              `:null}
        </div>
      </div>
    `}};zl.styles=[ko,ue`:host{display:block;container:photo-swiper-slide/inline-size}.photo-skeleton-slide{width:100%;margin-bottom:10px;overflow:hidden}.remove-shimmer{animation:none}.skeleton-media{aspect-ratio:1;border-radius:4px;width:100%}.skeleton-review-content{flex-direction:column;gap:6px;padding:14px 10px;display:flex}.skeleton-review-text{border-radius:4px;width:100%;height:22px}.skeleton-writer-info-box{align-items:center;gap:4px;display:flex}.skeleton-writer{border-radius:4px;width:50%;height:12px;margin:2px 0}.skeleton-product-info-box{border-top:.5px solid var(--alp-review-border-gray20,#1e293b33);gap:13px;width:100%;padding:13px 10px;display:flex}.skeleton-product-thumbnail{border-radius:50%;flex-shrink:0;width:36px;height:36px}.skeleton-product-content-box{flex-direction:column;flex:1;gap:8px;display:flex;overflow:hidden}.skeleton-product-name{border-radius:4px;width:80%;height:13px}.skeleton-product-price{border-radius:4px;width:30%;height:12px}.skeleton-rating-count-box{align-items:center;gap:4px;display:flex}.skeleton-product-count{border-radius:4px;width:30%;height:12px}@container photo-swiper-slide (width>=0) and (width<=120px){.skeleton-product-info-box,.skeleton-writer-info-box{display:none}.skeleton-review-content{padding:12px 2px}}@container photo-swiper-slide (width>=120px) and (width<=300px){.skeleton-review-content{gap:10px;padding:16px 4px}.skeleton-writer{height:18px}.skeleton-product-info-box{gap:8px;padding:16px 4px 12px}.skeleton-product-content-box{gap:6px}.skeleton-product-thumbnail{width:34px;height:34px}.skeleton-product-name{height:18px}}@container photo-swiper-slide (width>=300px){.skeleton-review-content{gap:10px;padding:16px 4px}.skeleton-review-text{height:22px}.skeleton-writer{height:18px}.skeleton-product-info-box{gap:8px;padding:8px 4px 12px}.skeleton-product-content-box{gap:6px}.skeleton-product-thumbnail{width:36px;height:36px}.skeleton-product-name{height:18px}}`],Wl([i({type:Object})],zl.prototype,"designOption",2),Wl([i({type:Boolean})],zl.prototype,"isReviewListLoading",2),zl=Wl([ae("review-photo-skeleton")],zl);var jl=Object.defineProperty,Vl=Object.getOwnPropertyDescriptor,Fl=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Vl(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&jl(t,i,s),s};let Bl=class extends ht{constructor(){super(...arguments),this.isReviewListLoading=!1,this.index=0}createRenderRoot(){return this}openDetailPopup(){gn({reviewId:this.review?.id?.toString(),option:this.filterOption,reviewIndex:this.index,backupList:this.reviewList})}goToProductPage(e){pn(e)}render(){const e=Je` <style>.smart-pick-swiper-slide { container-name: smart-pick-swiper-slide; container-type: inline-size; width: 100%; min-height: fit-content; overflow: hidden; } .slide-item { display: block; padding-bottom: 30px; } .smart-pick-card { position: relative; display: flex; flex-direction: column; width: 100%; aspect-ratio: 2 / 3.5; border-radius: 8px; overflow: hidden; cursor: pointer; } .smart-pick-card:hover img, .smart-pick-card:hover video { transform: scale(1.1); } .smart-pick-card:hover .content-overlay { opacity: 0; } .smart-pick-card img, .smart-pick-card video { width: 100%; height: 100%; -webkit-user-drag: none; -khtml-user-drag: none; -moz-user-drag: none; -o-user-drag: none; transition: 0.2s ease-in-out; object-fit: cover; } .content-overlay { position: absolute; bottom: 0; left: 0; display: flex; flex-direction: column; gap: 8px; width: 100%; height: fit-content; padding: 12px; color: #ffffff; background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%); transition: 0.2s ease-in-out; } .content-overlay-rating-username-wrapper { display: flex; align-items: center; gap: 4px; line-height: 1; width: 100%; } .content-overlay-username { display: block; text-overflow: ellipsis; white-space: nowrap; min-width: 0; width: 100%; height: fit-content; color: #ffffff; text-shadow: 0 0 4px rgba(0, 0, 0, 0.3); overflow: hidden; } .content-overlay-review { color: #ffffff; text-shadow: 0 0 4px rgba(0, 0, 0, 0.3); font-weight: 600; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; line-height: 1.6; max-height: calc(1.6em * 2); } .product-info-box { display: flex; width: 100%; padding: 18px 0 0; gap: 10px; cursor: pointer; } .product-content-box { display: flex; flex-direction: column; justify-content: center; overflow: hidden; gap: 5px; } @media (max-width: 839px) { .smart-pick-card { border-radius: 4px; } .content-overlay { padding: 16px; } .product-info-box { padding: 16px 0 0; gap: 10px; } .product-content-box { gap: 4px; } } @media (max-width: 439px) { .smart-pick-card { border-radius: 4px; } .content-overlay { padding: 12px 10px; } .product-info-box { padding: 18px 0 0; gap: 6px; } .product-content-box { gap: 5px; } }</style>`,t=I(this.review?.ordered_media[0]?.photo_platform_url||this.review?.ordered_media[0]?.photo_url),i=I(this.review?.ordered_media[0]?.thumbnail_video_url||this.review?.ordered_media[0]?.video_url);return Je`${e}
    ${this.review?.id?Je`
          <div class="smart-pick-card-container">
            <div class="smart-pick-card" @click=${this.openDetailPopup}>
              ${i?Je`<video aria-label="product review video" autoplay muted playsinline loop>
                    <source
                      src="${i||this.review?.product?.detail_image||""}"
                      type="video/mp4"
                    />
                  </video>`:Je`<img
                    src=${t||this.review?.product?.detail_image||""}
                    alt="product review image"
                    loading="lazy"
                  />`}
              <div class="content-overlay">
                <div class="content-overlay-rating-username-wrapper">
                  ${this.designOption.ratings?Je`
                        <review-ratings-bundle
                          .rating=${this.review?.ratings}
                          .size=${14}
                          .color=${"#FFFFFF"}
                        ></review-ratings-bundle>
                      `:null}
                  ${this.designOption.writer?Je`
                        <div class="content-overlay-username alp-caption11">
                          ${this.review?.user_info}
                        </div>
                      `:null}
                </div>
                <p class="content-overlay-review alp-body14 alp-line14">${this.review?.content}</p>
              </div>
            </div>
            ${this.designOption.product_info?Je`<div
                  class="product-info-box"
                  @click=${()=>this.goToProductPage(this.review.product?.product_no?.toString())}
                >
                  <review-product-thumbnail
                    .productImageUrl="${this.review.product?.detail_image}"
                  ></review-product-thumbnail>
                  <div class="product-content-box">
                    <review-product-name-price
                      .productName="${this.review.product?.product_name}"
                      .showProductName=${this.designOption.product_name}
                      .fontWeight=${"500"}
                      .fontSizeClassSmall_name=${"alp-body12"}
                      .fontSizeClassMedium_name=${"alp-body13"}
                      .fontSizeClassLarge_name=${"alp-body14"}
                    ></review-product-name-price>
                    ${this.designOption.product_review||this.designOption.product_ratings?Je`
                          <review-product-rating-count
                            .averageRating="${this.review.product?.review_ratings_connect}"
                            .reviewCount="${this.review.product?.review_number_connect_count}"
                            .showReviewCount=${this.designOption.product_review}
                            .showRating=${this.designOption.product_ratings}
                            .fontSizeClassSmallRating=${"alp-caption11"}
                            .fontSizeClassMediumRating=${"alp-body12"}
                            .fontSizeClassLargeRating=${"alp-body12"}
                            .fontSizeClassSmall=${"alp-caption11"}
                            .fontSizeClassMedium=${"alp-body12"}
                            .fontSizeClassLarge=${"alp-body12"}
                          ></review-product-rating-count>
                        `:null}
                  </div>
                </div>`:null}
          </div>
        `:Je`
          <review-smart-pick-skeleton
            .designOption=${this.designOption}
            .isReviewListLoading=${this.isReviewListLoading}
          ></review-smart-pick-skeleton>
        `} `}};Fl([i({type:Object})],Bl.prototype,"review",2),Fl([i({type:Object})],Bl.prototype,"reviewList",2),Fl([i({type:Object})],Bl.prototype,"designOption",2),Fl([i({type:Object})],Bl.prototype,"filterOption",2),Fl([i({type:Boolean})],Bl.prototype,"isReviewListLoading",2),Fl([i({type:Number})],Bl.prototype,"index",2),Bl=Fl([ae("review-smart-pick-card")],Bl);const Ul=[Ni,Di,pl("smart-pick")];var Hl=Object.defineProperty,Gl=Object.getOwnPropertyDescriptor,ql=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Gl(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Hl(t,i,s),s};let Yl=class extends(wn(ht)){constructor(){super(...arguments),this.previewData={},this.previewOption={},this.previewMeta={},this.widgetCode="",this.widgetSetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs=""}async updated(e){if(super.updated(e),e.has("isInViewport")){if(!this.isInViewport)return;this.provider=new dl(this,{widgetType:"smart-pick",swiperContainerSelector:"#sw-"+this.widgetCode,swiperWrapperSelector:".smart-pick-swiper-wrapper",onSwiperInitialized:(e,t)=>{e.params.slidesPerView=t.isSwiperTypeActive&&t.totalRenderCount>t.pageUnit&&t.grid.col<t.totalRenderCount?t.grid.col+.3:t.grid.col,e.update()},onUpdateSwiper:(e,t)=>{e.params.slidesPerView=t.isSwiperTypeActive&&t.totalRenderCount>t.pageUnit&&t.grid.col<t.totalRenderCount?t.grid.col+.3:t.grid.col}}),await this.provider.initialize(),this.provider.initializeResizeManager()}}disconnectedCallback(){this.provider?.destroy(),super.disconnectedCallback()}render(){if(!this.provider?.isDesignLoaded)return Je`<div style="width:100%; height:1px;"></div>`;if(!this.provider?.isReady)return null;const e=`smart-pick-widget-container${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`,t=this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode;return this.provider.errorCode?V(this.provider.errorCode,this.productNo,this.widgetSetCode||this.widgetCode,this.widgetCode):Je`<div class=${e} id=${t}>
      <review-header-title .designOption=${this.provider.designOption}></review-header-title>
      <div id="sw-${this.widgetCode}" class="swiper-container smart-pick-swiper-container">
        <div class="swiper-wrapper smart-pick-swiper-wrapper">
          ${this.provider.reviewList.map((e,t)=>Je`
              <div class="swiper-slide smart-pick-swiper-slide">
                <review-smart-pick-card
                  class="slide-item"
                  .review=${e}
                  .designOption=${this.provider?.designOption}
                  .filterOption=${this.provider?.filterOption}
                  .isReviewListLoading=${this.provider?.isReviewListLoading}
                  .index=${t}
                  .reviewList=${this.provider?.reviewList}
                ></review-smart-pick-card>
              </div>
            `)}
        </div>
        ${this.provider.isSwiperTypeActive&&this.provider.designOption?.navigation?Je`
              <review-arrow-pagination-handler
                .type=${Xt}
                .isPrevVisible=${this.provider.isPrevVisible}
                .isNextVisible=${this.provider.isNextVisible}
                @prevArrowClick=${this.provider.onPrevClick}
                @nextArrowClick=${this.provider.onNextClick}
              ></review-arrow-pagination-handler>
            `:null}
      </div>
      ${this.provider.designOption?.paging_type!==Gi&&this.provider.designOption?.indicator_type!==Hi?Je`
            <review-pagination-handler
              .paginationType=${this.provider.paginationType}
              .totalPages=${this.provider.totalPages}
              .currentPage=${this.provider.getCurrentPage()}
              .isMoreLoading=${this.provider.isReviewListLoading}
              .hasMoreReviews=${this.provider.reviewList.length<this.provider.totalRenderCount}
              .productNo=${this.productNo}
              .isLinksVisible=${!0}
              @paginationPrevClick=${this.provider.onPrevClick}
              @paginationNextClick=${this.provider.onNextClick}
              @paginationBulletClick=${this.provider.onPaginationBulletClick}
              @paginationMoreClick=${this.provider.onPaginationMoreClick}
            ></review-pagination-handler>
          `:null}
    </div>`}};Yl.styles=Ul,ql([i({type:Object,attribute:"data-widget-preview-data"})],Yl.prototype,"previewData",2),ql([i({type:Object,attribute:"data-widget-preview-option"})],Yl.prototype,"previewOption",2),ql([i({type:Object,attribute:"data-widget-preview-meta"})],Yl.prototype,"previewMeta",2),ql([i({type:String,attribute:"data-widget-code"})],Yl.prototype,"widgetCode",2),ql([i({type:String,attribute:"data-widget-set-code"})],Yl.prototype,"widgetSetCode",2),ql([i({type:String,attribute:"data-product-no"})],Yl.prototype,"productNo",2),ql([i({type:String,attribute:"data-widget-custom-class"})],Yl.prototype,"widgetCustomClass",2),ql([i({type:String,attribute:"data-widget-custom-id"})],Yl.prototype,"widgetCustomId",2),ql([i({type:Boolean,attribute:"data-dummy"})],Yl.prototype,"isDummy",2),ql([i({type:String,attribute:"data-custom-class"})],Yl.prototype,"customClass",2),ql([i({type:String,attribute:"data-custom-id"})],Yl.prototype,"customId",2),ql([i({type:String,attribute:"data-custom-css"})],Yl.prototype,"customCss",2),ql([i({type:String,attribute:"data-custom-js"})],Yl.prototype,"customJs",2),Yl=ql([ae("review-smart-pick-widget")],Yl);var Kl=Object.defineProperty,Zl=Object.getOwnPropertyDescriptor,Jl=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Zl(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Kl(t,i,s),s};let Ql=class extends ht{constructor(){super(...arguments),this.isReviewListLoading=!1}render(){return Je`
      <div
        class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-media"
      ></div>
      ${this.designOption?.product_info?Je`
            <div class="product-info-box">
              <div
                class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-thumbnail"
              ></div>
              <div class="product-content-box">
                <div
                  class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-product-name"
                ></div>
                ${this.designOption.product_review||this.designOption.product_ratings?Je`
                      <div class="skeleton-rating-box">
                        <review-star-icon
                          .size=${14}
                          .color=${"rgba(94, 103, 118, 0.13)"}
                        ></review-star-icon>
                        <div
                          class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-rating-text"
                        ></div>
                      </div>
                    `:null}
              </div>
            </div>
          `:null}
    `}};Ql.styles=[ko,ue`:host{container:smart-pick-swiper-slide/inline-size}.remove-shimmer{animation:none}.skeleton-media{aspect-ratio:2/3.5;border-radius:8px;width:100%}.product-info-box{gap:10px;width:98%;padding:18px 4px 0;display:flex}.skeleton-thumbnail{border-radius:50%;flex-shrink:0;width:36px;height:36px}.product-content-box{flex-direction:column;flex:1;gap:5px;display:flex;overflow:hidden}.skeleton-product-name{border-radius:4px;width:98%;height:16px}.skeleton-rating-box{align-items:center;gap:4px;display:flex}.skeleton-rating-text{border-radius:4px;width:40px;height:12px}@media (width<=839px){.product-info-box{padding:16px 4px 0}.product-content-box{gap:5px}}@media (width<=439px){.product-info-box{padding:14px 4px 0}.product-content-box{gap:4px}}`],Jl([i({type:Object})],Ql.prototype,"designOption",2),Jl([i({type:Boolean})],Ql.prototype,"isReviewListLoading",2),Ql=Jl([ae("review-smart-pick-skeleton")],Ql);const Xl=[Ni,Di,Ra,ko,ue`:host{font-family:var(--alp-common-font-family);width:100%}.story-widget{scrollbar-color:transparent transparent;scrollbar-width:none;justify-content:flex-start;align-items:center;gap:24px;width:fit-content;max-width:100%;margin:0 auto 30px;padding:2px 10px 10px;display:flex;overflow-x:auto}:host([data-compliance-attached]) .story-widget{margin-bottom:0;padding-bottom:0}.story-widget::-webkit-scrollbar{background:0 0;height:8px}.story-widget::-webkit-scrollbar-thumb{background:0 0;border-radius:4px}.story-widget::-webkit-scrollbar-track{background:0 0}.story-widget:hover{scrollbar-width:thin;scrollbar-color:#0000004d transparent}.story-widget:hover::-webkit-scrollbar-thumb{background:#00000059}.story-widget:hover::-webkit-scrollbar-track{background:#00000014}.story-item{cursor:pointer;flex-direction:column;justify-content:center;align-items:center;gap:9px;display:flex}.story-item__ratings{align-items:center;display:flex}.story-item>p{color:var(--alp-review-text-gray100);max-width:77px}.story-circle{box-sizing:border-box;border-radius:50%;flex-shrink:0;justify-content:center;align-items:center;width:77px;height:77px;padding:2px;display:flex}.insta-color{background:linear-gradient(219deg,#860bfb 4.68%,#ff133b 37.84%,#fe6f04 70.52%,#ffb802 93.45%)}.story-circle-inner{background:#fff;border-radius:50%;justify-content:center;align-items:center;width:100%;height:100%;display:flex;position:relative}.story-circle-inner__img{object-fit:cover;border-radius:50%;width:calc(100% - 4px);height:calc(100% - 4px);position:absolute;top:50%;left:50%;overflow:hidden;transform:translate(-50%,-50%)}.story-circle-inner__text{font-size:12px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.story-circle-inner__badge{color:#fff;background:linear-gradient(219deg,#860bfb 4.68%,#ff133b 37.84%,#fe6f04 70.52%,#ffb802 93.45%);border:.8px solid #fff;border-radius:5px;justify-content:center;align-items:center;width:fit-content;height:fit-content;min-height:17px;padding:2px 4px;font-size:12px;display:flex;position:absolute;bottom:-2.6px;left:50%;transform:translate(-50%);box-shadow:0 1px 3px #00000040}.story-circle-inner__badge>p{color:#fff;width:fit-content;line-height:1;text-align:center!important;font-size:10px!important}@media (width<=440px){.story-widget{overflow-x:scroll}}`];var ed=Object.defineProperty,td=Object.getOwnPropertyDescriptor,id=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?td(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ed(t,i,s),s};let rd=class extends(wn(ht)){constructor(){super(),this.widgetCode="",this.widgetSetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs="",this.totalCount=0,this.filterOption={page:1,page_size:10,product_no:"all",widget_code:"",device:"mobile"===P()?"m":"w"},this.designOption={},this.isWidgetLoading=!0,this.isFirstGetReviews=!0,this.reviewList=[],this.currentIndex=0,this.totalAvgRating=0,this.totalReward="0P",this.writeButtonText="\ub9ac\ubdf0 \uc791\uc131",this.onWriteReviewClick=async()=>{const{mall_id:e,shop_no:t}=await m(),i=await y()??"";cr({mall_id:e,shop_no:t,member_id:i,product_no:this.productNo??window?.iProductNo??""})},this.writeButtonText=si.WIDGETS.STORY.WRITE_REVIEW}async updated(e){if(super.updated(e),e.has("isInViewport")&&this.isInViewport){this.isDummy&&(this.filterOption.is_dummy=!0),this.productNo="PRODUCT_DETAIL"===await f()?v()||this.productNo:"all",this.filterOption.product_no=this.productNo;try{await this.getWidgetOption(),await Promise.all([this.getReviewList(),this.getMeta()]),!window?.ALPHA_REVIEW_EMERGENCY&&await this.getReviewSurveyList(),z(this,this.customCss??""),W(this,this.customJs)}catch(e){}finally{this.isWidgetLoading=!1,this.isFirstGetReviews=!1}}}async getReviewList(){const e={...this.filterOption};try{if(window?.ALPHA_PREVIEW)this.reviewList=this.previewData;else if(this.designOption.story_type===er){const t=await b(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0);t?.code&&j(t.code),this.reviewList=t}else{const t=await b(e);t?.code&&j(t.code),this.reviewList=t}}catch(e){throw this.reviewList=[],this.errorCode=F(e?.code),e}finally{this.isWidgetLoading=!1}}async getMeta(){const e={...this.filterOption};try{let t;t=window?.ALPHA_PREVIEW?this.previewMeta:await x(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_meta_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0),t?.code&&j(t.code),this.totalReward=t.total_reward||"0P"}catch(e){throw this.errorCode=F(e?.code),e}}async getWidgetOption(){try{this.designOption=window?.ALPHA_PREVIEW?this.previewOption:await A(this.widgetCode,window.ALPHA_REVIEW_EMERGENCY?`/widget_option/${this.widgetCode}.json`:void 0),this.filterOption.widget_code=this.widgetCode,this.filterOption.page_size="review"===this.designOption.story_type?this.designOption.review_num:this.designOption.product_num}catch(e){throw e}}async getReviewSurveyList(){if(0!==this.reviewList.length)try{const e=await _(this.widgetCode,this.designOption.story_type===er?this.reviewList.map(e=>e.reviews.map(e=>e.id)).flat():this.reviewList.map(e=>e.id));this.mergeApiDataToReviews(e,e=>e.surveys,"survey")}catch(e){}}onClickDetail(e){let t=[],i=0;if(this.designOption.story_type===er){t=this.reviewList.map(e=>(e.reviews=e.reviews.map(t=>({...t,product:e})),e.reviews)).flat();const r=this.reviewList[e].reviews[0].id;i=t.findIndex(e=>e.id===r)}d("review-story-popup",{initialProps:{widgetCode:this.widgetCode,reviewList:this.designOption.story_type===er?t:this.reviewList,option:this.designOption,index:""+(this.designOption.story_type===er?i:e)}}),Wi.open({key:"review-story-popup",onClose:()=>c("review-story-popup")})}mergeApiDataToReviews(e,t,i){const r=new Map;e.forEach(e=>{r.set(e.review_id,e)}),this.reviewList=this.reviewList.map(this.designOption.story_type===er?e=>{const o=e.reviews?.map(e=>{const o=r.get(e.id),s=o?t(o):void 0;return void 0===s?e:{...e,[i]:s}})??[];return{...e,reviews:o}}:e=>{const o=r.get(e.id),s=o?t(o):void 0;return void 0===s?e:{...e,[i]:s}})}ratingsComponent(e){return Array.from({length:Number(e?.ratings)},()=>Je`<review-star-icon size="14"></review-star-icon>`)}reviewTypeStoryComponent(){return Je`${this.reviewList?.map((e,t)=>Je`
        <div class="story-item">
          <div class="story-circle insta-color" @click=${()=>this.onClickDetail(t)}>
            <div class="story-circle-inner">
              <div class="story-circle-inner__img">
                <review-review-media
                  .reviewMedia=${e.ordered_media?.[0]}
                  .productImg=${e.product?.detail_image}
                ></review-review-media>
              </div>
            </div>
          </div>

          ${this.designOption.review_info===ir?Je` <div class="story-item__ratings">${this.ratingsComponent(e)}</div>`:Je` <p class="alp-caption11 alp-medium line-wrap">
                ${e.user_info?"@"+e.user_info:Je`<review-user-info
                      .sizeType=${"small"}
                      .color=${"#1e293b"}
                      .fontSizeClassSmall=${"alp-caption11"}
                      .fontSizeClassMedium=${"alp-caption11"}
                      .fontSizeClassLarge=${"alp-caption11"}
                      .fontWeight=${"500"}
                      .review=${e}
                    ></review-user-info>`}
              </p>`}
        </div>
      `)}`}productTypeStoryComponent(){return Je`${this.reviewList?.map((e,t)=>Je`
        <div class="story-item">
          <div class="story-circle insta-color" @click=${()=>this.onClickDetail(t)}>
            <div class="story-circle-inner">
              <div class="story-circle-inner__img">
                <review-review-media .productImg=${e.detail_image}></review-review-media>
              </div>
            </div>
          </div>

          ${this.designOption.review_info===ir?Je` <div class="story-item__ratings">
                ${this.ratingsComponent(e.reviews?.[0])}
              </div>`:Je` <p class="alp-caption11 alp-medium line-wrap">
                ${e.reviews?.[0]?.user_info?"@"+e.reviews?.[0]?.user_info:Je`<review-user-info
                      .sizeType=${"small"}
                      .color=${"#1e293b"}
                      .fontSizeClassSmall=${"alp-caption11"}
                      .fontSizeClassMedium=${"alp-caption11"}
                      .fontSizeClassLarge=${"alp-caption11"}
                      .fontWeight=${"500"}
                      .review=${e}
                    ></review-user-info>`}
              </p>`}
        </div>
      `)}`}render(){if(this.isWidgetLoading&&this.isFirstGetReviews)return Je`
        <div class="story-widget" id="widget-${this.widgetCode}">
          ${Array.from({length:this.designOption.product_num}).map(()=>Je`
              <div class="story-item">
                <div class="story-circle review-skeleton-bg03"></div>
              </div>
            `)}
        </div>
      `;if(this.isWidgetLoading||"hide"===this.designOption.review_none&&0===this.reviewList.length)return null;const e=`story-widget${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`,t=this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode;return!this.isWidgetLoading&&this.errorCode?V(this.errorCode,this.productNo,this.widgetSetCode||this.widgetCode,this.widgetCode):Je`
      <review-header-title
        .designOption=${this.designOption}
        .widgetCode=${this.widgetCode}
      ></review-header-title>
      <div class=${e} id=${t}>
        <div class="story-item" @click=${this.onWriteReviewClick}>
          <div class="story-circle insta-color">
            <div class="story-circle-inner">
              <img
                class="story-circle-inner__img"
                alt="product image"
                src="${this.reviewList?.[0]?.product?.detail_image||this.reviewList?.[0]?.detail_image}"
                style="filter: brightness(0.5);"
              />
              <p class="story-circle-inner__text">
                <review-custom-icon
                  .type="${"plus"}"
                  .width="${"22"}"
                  .height="${"22"}"
                  .color="${"var(--alp-review-text-white)"}"
                />
              </p>
              <div class="story-circle-inner__badge">
                <p class="alp-caption10 alp-bold">${this.totalReward}</p>
              </div>
            </div>
          </div>

          <p class="alp-caption11 alp-medium line-wrap">${this.writeButtonText}</p>
        </div>

        ${this.designOption.story_type===er?this.productTypeStoryComponent():this.reviewTypeStoryComponent()}
      </div>
    `}};rd.styles=Xl,id([i({type:Object,attribute:"data-widget-preview-data"})],rd.prototype,"previewData",2),id([i({type:Object,attribute:"data-widget-preview-option"})],rd.prototype,"previewOption",2),id([i({type:Object,attribute:"data-widget-preview-meta"})],rd.prototype,"previewMeta",2),id([i({type:String,attribute:"data-widget-code"})],rd.prototype,"widgetCode",2),id([i({type:String,attribute:"data-widget-set-code"})],rd.prototype,"widgetSetCode",2),id([i({type:String,attribute:"data-product-no"})],rd.prototype,"productNo",2),id([i({type:String,attribute:"data-widget-custom-class"})],rd.prototype,"widgetCustomClass",2),id([i({type:String,attribute:"data-widget-custom-id"})],rd.prototype,"widgetCustomId",2),id([i({type:Boolean,attribute:"data-dummy"})],rd.prototype,"isDummy",2),id([i({type:String,attribute:"data-custom-class"})],rd.prototype,"customClass",2),id([i({type:String,attribute:"data-custom-id"})],rd.prototype,"customId",2),id([i({type:String,attribute:"data-custom-css"})],rd.prototype,"customCss",2),id([i({type:String,attribute:"data-custom-js"})],rd.prototype,"customJs",2),id([r()],rd.prototype,"totalCount",2),id([r()],rd.prototype,"filterOption",2),id([r()],rd.prototype,"designOption",2),id([r()],rd.prototype,"isWidgetLoading",2),id([r()],rd.prototype,"isFirstGetReviews",2),id([r()],rd.prototype,"reviewList",2),id([r()],rd.prototype,"currentIndex",2),id([r()],rd.prototype,"totalAvgRating",2),id([r()],rd.prototype,"totalReward",2),rd=id([ae("review-story-widget")],rd);var od=Object.defineProperty,sd=Object.getOwnPropertyDescriptor,nd=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?sd(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&od(t,i,s),s};let ad=class extends ht{constructor(){super(),this.isPreview=null,this.isOpen=!1,this.isClose=!1,this._isTouching=!1,this._touchStartY=0,this.redirectButtonText="\ubc14\ub85c\uac00\uae30",this.closeButtonText="\uc811\uae30",this.redirectButtonText=si.WIDGETS.STORY.VIEW_PRODUCT,this.closeButtonText=si.WIDGETS.STORY.CLOSE}createRenderRoot(){return this}changeOpen(e,t=!1){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation?.(),t||(this.isOpen?(this.isClose=!0,this.isOpen=!1):this.isOpen=!0)}updated(e){if(e.has("isPreview")){if(null===this.isPreview)return;this.isOpen=this.isPreview}e.has("isOpen")&&this.dispatchEvent(this.isOpen?new CustomEvent("review-content-open",{bubbles:!0,composed:!0,detail:{open:!0}}):new CustomEvent("review-content-close",{bubbles:!0,composed:!0,detail:{open:!1}}))}onTouchStart(e){e.touches&&0!==e.touches.length&&(this._isTouching=!0,this._touchStartY=e.touches[0].clientY)}onTouchMove(e){this._isTouching&&e.touches&&0!==e.touches.length&&this.isOpen&&e.touches[0].clientY-this._touchStartY>20&&(this._isTouching=!1,this.changeOpen(e,!1))}onTouchEnd(){this._isTouching=!1}routeProductPage(e){pn(e)}render(){const e=ns(this.review);return Je`
      <style>.story-content-container { display: flex; flex-direction: column; position: absolute; bottom: -60px; left: 0; width: 100%; max-height: calc(100% - 60px); padding: 0px 16px 16px 16px; box-sizing: border-box; z-index: 10; color: #fff; } .story-content-star { display: flex; align-items: center; height: 16px; margin-bottom: 8px; } .story-content-review { position: relative; height: fit-content; opacity: 0.9; > p { line-clamp: 2; -webkit-line-clamp: 2; color: #fff; } &::-webkit-scrollbar { width: 6px; height: 0px; } &::-webkit-scrollbar-track { background-color: transparent; } &::-webkit-scrollbar-thumb { border-radius: 12px; background-color: var(--alp-review-icon-white30); } } .story-content-review__survey { margin-bottom: 14px; color: #fff; opacity: 0.6; } .story-content-product { display: flex; align-items: center; gap: 12px; margin-top: 24px; width: 100%; img { min-width: 32px; max-width: 32px; min-height: 32px; max-height: 32px; object-fit: cover; border-radius: 50%; background: #ccc; } } .story-content-product__info { display: flex; flex-direction: column; gap: 2px; p { color: #fff; } p:nth-child(2) { opacity: 0.5; } } .story-content-product__button { display: flex; justify-content: center; align-items: center; gap: 10px; border-radius: 12px; background: rgba(255, 255, 255, 0.3); min-width: fit-content; max-width: fit-content; min-height: 40px; padding: 10px 16px; margin-left: auto; cursor: pointer; color: #fff; } .story-content-button { border-radius: 12px; border: 1px solid #fff; display: flex; padding: 10px 16px; justify-content: center; align-items: center; gap: 10px; align-self: stretch; width: 100%; margin-top: 12px; cursor: pointer; color: #fff; } .open { animation: story-content-open 0.3s ease-in-out forwards; } .close { animation: story-content-close 0.3s ease-in-out forwards; } .scroll-bar { padding-top: 7px; padding-bottom: 13px; width: 100%; &::after { display: block; content: ""; width: 30px; height: 4px; border-radius: 2px; background: rgba(255, 255, 255, 0.3); margin: 0 auto; } } .story-content-review__text { max-height: 60vh; overflow-y: auto; white-space: pre-line; } @keyframes story-content-open { from { bottom: -60px; } to { bottom: 0; } } @keyframes story-content-close { from { bottom: 0; } to { bottom: -60px; } }</style>

      <div
        class="story-content-container ${this.isOpen?"open":this.isClose?"close":""}"
        @click=${e=>this.changeOpen(e,this.isOpen)}
        style=${this.isOpen?"border-radius: 20px 20px 0 0;height:fit-content;background:var(--alp-review-scrim-black70);backdrop-filter: blur(5px); ":"border-radius: 0;height:fit-content;background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 80.58%);backdrop-filter: blur(0px)"}
      >
        ${this.isOpen?Je`<div
              class="scroll-bar"
              @touchstart=${this.onTouchStart}
              @touchmove=${this.onTouchMove}
              @touchend=${this.onTouchEnd}
              @touchcancel=${this.onTouchEnd}
            ></div>`:null}

        <div class="story-content-star">
          ${Array.from({length:Number(this.review?.ratings?.toFixed(0))??5}).map(()=>Je` <review-star-icon size="16" .color=${"#fff"}></review-star-icon> `)}
        </div>

        <div class="story-content-review">
          ${this.isOpen&&(this.review?.survey?.length??0)>0?Je`
                <div class="story-content-review__survey">
                  <review-survey-answer
                    .surveyAnswer=${this.review?.survey}
                    .color="${"#fff"}"
                  ></review-survey-answer>
                </div>
              `:null}
          ${Je`<p class="alp-line14 ${this.isOpen?"story-content-review__text custom-scrollbar":"line-wrap"}">${this.review?.content}</p>`}
        </div>

        <div class="story-content-product">
          <img src=${this.review?.product?.detail_image} alt="product image" />
          <div class="story-content-product__info">
            <p class="line-wrap">${this.review?.product?.product_name}</p>
            <p class="line-wrap">${e}</p>
          </div>
          <div
            class="story-content-product__button alp-body12"
            @click=${()=>this.routeProductPage(this.review?.product?.product_no?.toString()??"")}
          >
            ${this.redirectButtonText}
          </div>
        </div>

        ${this.isOpen?Je`<div
              @click=${e=>this.changeOpen(e,!1)}
              class="story-content-button alp-semi-bold alp-body16"
            >
              ${this.closeButtonText}
            </div>`:null}
      </div>
    `}};nd([i({type:Object})],ad.prototype,"review",2),nd([i({type:Object})],ad.prototype,"productInfo",2),nd([i({type:Boolean})],ad.prototype,"isPreview",2),nd([r()],ad.prototype,"isOpen",2),nd([r()],ad.prototype,"isClose",2),ad=nd([ae("review-story-content")],ad);const pd=[Ni,Di,ue`:host{font-family:var(--alp-common-font-family);background-color:var(--alp-review-scrim-black30);z-index:100000;justify-content:center;align-items:center;width:100%;height:100%;display:flex;top:0;left:0;position:fixed!important}.story-popup-container{touch-action:pan-y;overscroll-behavior:none;user-select:none;width:100%;max-width:440px;min-height:100%;max-height:100%;position:relative;overflow:hidden}.story-popup-progress{box-sizing:border-box;z-index:2;gap:2px;width:100%;padding:8px 20px;display:flex;position:absolute;top:0;left:0}.story-popup-header{box-sizing:border-box;z-index:4;align-items:center;gap:2px;width:100%;padding:0 16px 16px;display:flex;position:absolute;top:18px;left:0;& p{color:#fff}& p:first-child{color:#fff;margin-right:8px}& review-at-date{color:#fff;opacity:.5;margin-right:auto}}.story-popup-bar{background:#ffffff4d;border-radius:2px;flex:1 1 0;height:2px;position:relative;overflow:hidden}.story-popup-bar__bar-fill{width:var(--w,0%);background:#fff;transition:none;position:absolute;top:0;bottom:0;left:0}.story-popup-media{width:100%;height:100%;position:absolute;inset:0;overflow:hidden}.story-popup-media>div.empty-bg{background-color:#000}.story-popup-media img,.story-popup-media video{object-fit:cover;opacity:0;pointer-events:none;min-width:100%;max-width:100%;min-height:100%;max-height:100%;transition:opacity .12s;position:absolute;inset:0}.story-popup-media img.active,.story-popup-media video.active{opacity:1;pointer-events:auto}.swiper-wrapper{flex-direction:column}.swiper-slide{overflow:hidden}@keyframes sp-fade-in{0%{opacity:0}to{opacity:1}}`];var ld=Object.defineProperty,dd=Object.getOwnPropertyDescriptor,cd=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?dd(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ld(t,i,s),s};let hd=class extends ht{constructor(){super(),this.widgetCode="",this.reviewList=[],this.index="0",this.currentReviewIndex=0,this.currentMediaIndex=0,this.currentProgress=0,this.isPreviewToggle=null,this.rafId=null,this.IMAGE_DURATION_MS=2500,this.VIDEO_EXT_REGEX=/\.(mp4|webm|ogg)(\?.*)?$/i,this.isPaused=!1,this.imageAccumulatedMs=0,this.imageStartMs=0,this.userInfoText="\ub2d8\uc774 \uc791\uc131\ud55c \ub9ac\ubdf0",this.redirectButtonText="\ubc14\ub85c\uac00\uae30",this.closeButtonText="\uc811\uae30",this.userInfoText=si.WIDGETS.STORY.USER_REVIEW_SUFFIX,this.redirectButtonText=si.WIDGETS.STORY.VIEW_PRODUCT,this.closeButtonText=si.WIDGETS.STORY.CLOSE,this.noMediaMessage=Je`${si.WIDGETS.STORY.NO_MEDIA_MESSAGE_1}<br />
      ${si.WIDGETS.STORY.NO_MEDIA_MESSAGE_2}<br />
      ${si.WIDGETS.STORY.NO_MEDIA_MESSAGE_3}`}async firstUpdated(e){super.firstUpdated(e),this.isPreviewToggle=this.option.review_preview,window?.CUSTOM_SWIPER?.swiper?(this.IMAGE_DURATION_MS=1e3*this.option.interval,this.currentReviewIndex=Number.isFinite(parseInt(this.index??"0",10))?Math.max(0,Math.min(parseInt(this.index??"0",10),Math.max(0,(this.reviewList?.length??1)-1))):0,this.currentMediaIndex=0,await this.updateComplete,this.initializeSwiper(),this.startCurrentMedia()):await p(async()=>{this.IMAGE_DURATION_MS=1e3*this.option.interval,this.currentReviewIndex=Number.isFinite(parseInt(this.index??"0",10))?Math.max(0,Math.min(parseInt(this.index??"0",10),Math.max(0,(this.reviewList?.length??1)-1))):0,this.currentMediaIndex=0,await this.updateComplete,this.initializeSwiper(),this.startCurrentMedia()})}update(e){super.update(e),e.has("currentReviewIndex")&&(this.productInfo=this.option.story_type===er?this.reviewList[this.currentReviewIndex]:this.reviewList[this.currentReviewIndex].product)}disconnectedCallback(){this.cancelRAF(),this.cleanupVideoHandlers(),super.disconnectedCallback()}initializeSwiper(){const e=Number.isFinite(parseInt(this.index??"0",10))?Math.max(0,Math.min(parseInt(this.index??"0",10),Math.max(0,(this.reviewList?.length??1)-1))):0;this.swiper=n({container:this.shadowRoot.querySelector("#story-popup-"+this.widgetCode),styleRoot:this.shadowRoot,options:{direction:"vertical",slidesPerView:1,freeMode:{enabled:!1},spaceBetween:0,loop:!0,speed:450,resistanceRatio:0,threshold:8,touchReleaseOnEdges:!0,initialSlide:e,init:!1,observer:!0,observeParents:!0},event:{init:t=>{try{t.slideToLoop?.(e,0,!1)}catch{}try{t.slideTo?.(e,0,!1)}catch{}}}}),this.bindSwiperEvents(),requestAnimationFrame(()=>this.swiper?.init?.())}bindSwiperEvents(){this.swiper?.on?.("slideChangeTransitionStart",()=>{this.cancelRAF(),this.pauseAllVideos(),this.cleanupVideoHandlers()}),this.swiper?.on?.("slideChangeTransitionEnd",()=>{const e="number"==typeof this.swiper?.realIndex?this.swiper?.realIndex:this.swiper?.activeIndex;this.cancelRAF(),this.currentReviewIndex=e??0,this.currentMediaIndex=0,this.resetProgressState(),this.startCurrentMedia()})}pauseAllVideos(){this.renderRoot.querySelectorAll("video").forEach(e=>{try{e.pause()}catch{}})}get currentMedias(){const e=this.reviewList[this.currentReviewIndex];return e?.ordered_media??[]}getCurrentMedia(){return this.currentMedias[this.currentMediaIndex]}getNextMedia(){return this.currentMedias[this.currentMediaIndex+1]}mediaKey(e=this.currentReviewIndex,t=this.currentMediaIndex){return`${e}:${t}`}async preloadImage(e){if(e.photo_url)try{const t=new Image;t.src=e.photo_url??"",await(t.decode?.()??Promise.resolve())}catch{}}resetProgressState(){this.isPaused=!1,this.currentProgress=0,this.imageAccumulatedMs=0,this.imageStartMs=0}isVideoItem(e){return!(!e||!e.video_url&&!e.thumbnail_video_url)}clamp(e){return Math.max(0,Math.min(1,e))}startCurrentMedia(){if(this.cancelRAF(),this.isPreviewToggle)return;const e=this.mediaKey();e!==this.prevMediaKey&&(this.resetProgressState(),this.prevMediaKey=e);const t=this.getCurrentMedia(),i=this.getNextMedia();t?(i&&!this.isVideoItem(i)&&this.preloadImage(i),this.isVideoItem(t)?this.startVideoFlow():this.startImageFlow()):this.startImageFlow()}startImageFlow(){const e=this.IMAGE_DURATION_MS;this.imageStartMs=performance.now()-this.imageAccumulatedMs;const t=i=>{if(this.isPaused)return;const r=Math.min(1,(i-this.imageStartMs)/e);this.currentProgress=r,r>=1?this.next():this.rafId=requestAnimationFrame(t)};this.rafId=requestAnimationFrame(t)}startVideoFlow(){const e=(t=0)=>{const i=this.renderRoot.querySelector(".swiper-slide-active .story-popup-media video.active");if(!i)return void(t<5&&requestAnimationFrame(()=>e(t+1)));this.cleanupVideoHandlers(),this.lastVideoEl=i;try{i.currentTime=0}catch{}i.muted=!0,i.playsInline=!0,i.autoplay=!0,this._onWaiting=()=>i.play().catch(()=>{}),this._onStalled=()=>{try{i.load()}catch{}i.play().catch(()=>{})},this._onError=()=>{try{i.load()}catch{}i.play().catch(()=>{})},this._onTimeUpdate=()=>{this.currentProgress=this.clamp(i.currentTime/(i.duration||1))},i.addEventListener("waiting",this._onWaiting),i.addEventListener("stalled",this._onStalled),i.addEventListener("error",this._onError),i.addEventListener("timeupdate",this._onTimeUpdate);const r=()=>{i.play().catch(()=>{}),this.tickVideo()};if(Number.isFinite(i.duration)&&i.duration>0)r();else{const e=()=>{i.removeEventListener("loadedmetadata",e),r()};i.addEventListener("loadedmetadata",e)}i.addEventListener("ended",()=>this.next(),{once:!0})};queueMicrotask(()=>e(0))}tickVideo(){const e=this.lastVideoEl;if(!e)return;const t=()=>{this.lastVideoEl&&!this.isPaused&&(this.currentProgress=Math.max(0,Math.min(1,e.currentTime/(e.duration||1))),e.ended||(this.rafId=requestAnimationFrame(t)))};this.rafId=requestAnimationFrame(t)}cancelRAF(){null!=this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=null)}next(){if(!this.isPreviewToggle){if(this.cancelRAF(),this.currentMediaIndex<this.currentMedias.length-1)return this.currentMediaIndex+=1,this.resetProgressState(),this.prevMediaKey=this.mediaKey(),void this.startCurrentMedia();this.swiper?.slideNext?.(400)}}cleanupVideoHandlers(){const e=this.lastVideoEl;e&&(this._onWaiting&&e.removeEventListener("waiting",this._onWaiting),this._onStalled&&e.removeEventListener("stalled",this._onStalled),this._onError&&e.removeEventListener("error",this._onError),this._onTimeUpdate&&e.removeEventListener("timeupdate",this._onTimeUpdate),this._onWaiting=this._onStalled=this._onError=this._onTimeUpdate=void 0,this.lastVideoEl=void 0)}renderProgressBars(e,t){return Array.from({length:Math.max(1,e?.ordered_media?.length??0)},(e,i)=>{let r=0;return t===this.currentReviewIndex&&(i<this.currentMediaIndex?r=100:i===this.currentMediaIndex&&(r=Math.round(100*this.currentProgress))),Je`<div class="story-popup-bar">
        <div class="story-popup-bar__bar-fill" style="--w: ${r}%"></div>
      </div>`})}renderMedia(e,t){const i=t===this.currentReviewIndex?Math.min(this.currentMediaIndex,Math.max(0,(e?.ordered_media?.length??0)-1)):0,r=0===e?.ordered_media?.length,o=[];return r&&o.push({photo_url:e.product?.detail_image??"",video_url:void 0}),Je`${(r?o:e.ordered_media).map((e,t)=>{const o=I(e?.photo_platform_url||e?.photo_url),s=I(e?.compress_video_url||e?.middle_video_url||e?.thumbnail_video_url),n=t===i;return this.isVideoItem(e)?Je`<video
          aria-label="product review video"
          class=${n?"active":""}
          src="${s??""}"
          playsinline
          muted
          preload="metadata"
          webkit-playsinline
          disableremoteplayback
        ></video>`:Je` <div class=${r?"empty-bg":""}>
        <img
          class=${n?"active":""}
          src="${o??""}"
          alt="product review image"
          loading="lazy"
        />
        ${r?Je`<p
              class="alp-body15 alp-line15 alp-semi-bold"
              style="position: absolute;bottom: 0;left: 0;width: 100%;height: 100%;text-align: center!important; color: #fff; background-color: rgba(0, 0, 0, 0.5);display: flex;align-items: center;justify-content: center;"
            >
              ${this.noMediaMessage}
            </p>`:Je``}
      </div>`})}`}pausePlayback(){if(!this.isPaused){if(this.isPaused=!0,this.lastVideoEl)try{this.lastVideoEl.pause()}catch{}else{const e=this.IMAGE_DURATION_MS;this.imageAccumulatedMs=Math.min(e,this.currentProgress*e)}this.cancelRAF()}}resumePlayback(){if(this.isPaused)if(this.isPaused=!1,this.lastVideoEl){try{this.lastVideoEl.play()}catch{}this.tickVideo()}else this.startImageFlow()}closePopup(){l(),c("review-story-popup")}onReviewContentOpen(){this.swiper&&(this.swiper.allowTouchMove=!1,this.swiper.allowSlideNext=!1,this.swiper.allowSlidePrev=!1,this.isPreviewToggle=!0,this.pausePlayback())}onReviewContentClose(){this.swiper&&(this.swiper.allowTouchMove=!0,this.swiper.allowSlideNext=!0,this.swiper.allowSlidePrev=!0,this.isPreviewToggle=!1,this.startCurrentMedia(),this.resumePlayback())}render(){return Je`
      <div class="swiper-container story-popup-container" id="story-popup-${this.widgetCode}">
        <div class="swiper-wrapper">
          ${this.reviewList.map((e,t)=>Je`
              <div class="swiper-slide" @click=${this.next}>
                <div class="story-popup-progress">${this.renderProgressBars(e,t)}</div>

                <div class="story-popup-header">
                  <p class="alp-medium">${e?.user_info??""}${this.userInfoText}</p>
                  <review-at-date
                    .date=${e.created_at}
                    .fontSizeClassSmall=${"alp-body13"}
                    .fontSizeClassMedium=${"alp-body13"}
                    .fontSizeClassLarge=${"alp-body13"}
                    .color=${"#fff"}
                    .fontWeight=${"400"}
                  ></review-at-date>

                  <review-custom-icon
                    width="24"
                    height="24"
                    type="close"
                    .color=${"#fff"}
                    @click=${this.closePopup}
                  />
                </div>

                <div class="story-popup-media">${this.renderMedia(e,t)}</div>

                <review-story-content
                  .productInfo="${this.productInfo}"
                  .review="${e}"
                  .code="${this.widgetCode}"
                  .isPreview=${this.isPreviewToggle}
                  @review-content-open=${this.onReviewContentOpen}
                  @review-content-close=${this.onReviewContentClose}
                ></review-story-content>
              </div>
            `)}
        </div>
      </div>
    `}};hd.styles=pd,cd([i({type:String})],hd.prototype,"widgetCode",2),cd([i({type:Array})],hd.prototype,"reviewList",2),cd([i({type:Object})],hd.prototype,"option",2),cd([i({type:String})],hd.prototype,"index",2),cd([r()],hd.prototype,"currentReviewIndex",2),cd([r()],hd.prototype,"currentMediaIndex",2),cd([r()],hd.prototype,"currentProgress",2),cd([r()],hd.prototype,"isPreviewToggle",2),cd([r()],hd.prototype,"productInfo",2),cd([r()],hd.prototype,"isPaused",2),hd=cd([ae("review-story-popup")],hd);const gd=[Ni,Di,Ra,ue`:host{--ticker-left:10px;--ticker-bottom:10px;--ticker-translate:none;font-family:var(--alp-common-font-family);position:var(--alp-ticker-position);bottom:var(--alp-ticker-position-bottom);left:var(--alp-ticker-position-left);top:var(--alp-ticker-position-top);right:var(--alp-ticker-position-right);z-index:var(--alp-ticker-z-index);transform:var(--ticker-translate)}@media (width<=440px){:host{width:calc(100% - 20px);left:10px;transform:none}}`];var ud=Object.defineProperty,wd=Object.getOwnPropertyDescriptor,vd=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?wd(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&ud(t,i,s),s};let md=class extends ht{constructor(){super(...arguments),this.value="",this.tickerWidgetMain={},this.tickerWidgetProduct={},this.isWidgetLoading=!0,this.pageInfo=void 0,this.productNo="all"}async firstUpdated(e){if(super.firstUpdated(e),fa(en))return void c(en);if(this.pageInfo=await f(),this.productNo="PRODUCT_DETAIL"===await f()?v()||this.productNo:"all","PRODUCT_DETAIL"!==this.pageInfo&&"MAIN"!==this.pageInfo)return;const{mall_id:t,shop_no:i}=await m();try{Promise.all([this.getTickerOption({mallId:t,shopNo:i}),"PRODUCT_DETAIL"===this.pageInfo?this.getTickerWidgetProduct({mallId:t,shopNo:i,productNo:this.productNo??"1"}):this.getTickerWidgetMain({mallId:t,shopNo:i})])}catch(e){}}async getTickerOption({mallId:e,shopNo:t}){const i=await async function(e,t){if(""===e)throw Error("[ALPHA-REVIEW] mall_id\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");if(""===t)throw Error("[ALPHA-REVIEW] shop_no\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");return await or.get("/v2/api-widget/extra/ticker/option",{query:{mall_id:e,shop_no:t}})}(e,t);this.tickerOption=i,"MAIN"===this.pageInfo||"PRODUCT_DETAIL"===this.pageInfo&&200===("pc"===P()?this.tickerOption.product_position_pc:this.tickerOption.product_position_mo)?B(this,{"--alp-ticker-position":"fixed","--alp-ticker-z-index":"mobile"===P()?this.tickerOption.z_index_mo?.toString()??"0":this.tickerOption.z_index_pc?.toString()??"0","--alp-ticker-position-right":"mobile"===P()?"none":200===this.tickerOption.position_pc||400===this.tickerOption.position_pc?this.tickerOption.coordinate_x_pc+"px":"none","--alp-ticker-position-left":"mobile"===P()?"10px":100===this.tickerOption.position_pc||300===this.tickerOption.position_pc?this.tickerOption.coordinate_x_pc+"px":"none","--alp-ticker-position-top":"mobile"===P()?"none":300===this.tickerOption.position_pc||400===this.tickerOption.position_pc?("mobile"===P()?this.tickerOption.coordinate_y_mo:this.tickerOption.coordinate_y_pc)+"px":"none","--alp-ticker-position-bottom":"mobile"===P()?this.tickerOption.coordinate_y_mo+"px":100===this.tickerOption.position_pc||200===this.tickerOption.position_pc?("mobile"===P()?this.tickerOption.coordinate_y_mo:this.tickerOption.coordinate_y_pc)+"px":"none"}):B(this,{"--alp-ticker-position":"relative","--alp-ticker-position-right":"none","--alp-ticker-position-left":"none","--alp-ticker-position-top":"none","--alp-ticker-position-bottom":"none"}),z(this,this.tickerOption.ticker_css??"")}async getTickerWidgetMain({mallId:e,shopNo:t}){const i=await async function(e,t){if(""===e)throw Error("[ALPHA-REVIEW] mall_id\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");if(""===t)throw Error("[ALPHA-REVIEW] shop_no\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");return await or.get("/v2/api-widget/extra/ticker/main",{query:{mall_id:e,shop_no:t}})}(e,t);this.tickerWidgetMain=i,this.isWidgetLoading=!1}async getTickerWidgetProduct({mallId:e,shopNo:t,productNo:i}){const r=await async function(e,t,i){if(""===e)throw Error("[ALPHA-REVIEW] mall_id\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");if(""===t)throw Error("[ALPHA-REVIEW] shop_no\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");if(""===i)throw Error("[ALPHA-REVIEW] product_no\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");return await or.get("/v2/api-widget/extra/ticker/product",{query:{mall_id:e,shop_no:t,product_no:i}})}(e,t,i);this.tickerWidgetProduct=r,this.isWidgetLoading=!1}render(){if(this.tickerOption&&!this.isWidgetLoading&&("PRODUCT_DETAIL"===this.pageInfo||"MAIN"===this.pageInfo))return Je`
      ${"MAIN"===this.pageInfo?Je` <review-ticker-card-main
            .tickerWidget=${this.tickerWidgetMain}
            .tickerOption=${this.tickerOption}
          ></review-ticker-card-main>`:Je` <review-ticker-card-detail
            .tickerWidget=${this.tickerWidgetProduct}
            .tickerOption=${this.tickerOption}
            .productNo=${this.productNo}
          ></review-ticker-card-detail>`}
    `}};md.styles=gd,vd([i({type:String,attribute:"data-value"})],md.prototype,"value",2),vd([r()],md.prototype,"tickerOption",2),vd([r()],md.prototype,"tickerWidgetMain",2),vd([r()],md.prototype,"tickerWidgetProduct",2),vd([r()],md.prototype,"isWidgetLoading",2),vd([r()],md.prototype,"pageInfo",2),vd([r()],md.prototype,"productNo",2),md=vd([ae("review-ticker-widget")],md);var yd=Object.defineProperty,fd=Object.getOwnPropertyDescriptor,bd=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?fd(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&yd(t,i,s),s};let xd=class extends ht{constructor(){super(...arguments),this.tickerWidget={},this.tickerOption={},this.device="pc",this.isShowCount=!0,this.isWidgetLoading=!0,this.reviewList=[]}createRenderRoot(){return this}async initialBtnSwiper(){this.reviewList.length<2||(this._swiper=n({container:this.querySelector("#sw-ticker-widget"),styleRoot:this,options:{direction:"vertical",slidesPerView:1,spaceBetween:0,loop:!0,watchOverflow:!0,simulateTouch:!1,initialSlide:0,speed:300,autoplay:{delay:3e3,disableOnInteraction:!0,waitForTransition:!0,reverseDirection:!1},init:!1,observer:!0,observeParents:!0},event:{init:e=>{e.autoplay?.stop?.(),setTimeout(()=>e.autoplay?.start?.(),3e3)}}}),this.requestUpdate(),await this.updateComplete,requestAnimationFrame(()=>this._swiper?.init?.()))}goToProductPage(e){pn(e)}closeTicker(){ba(en,"true",1),c("review-ticker-widget")}async update(e){super.update(e),e.has("tickerWidget")&&(this.tickerWidget?.view_count>0&&this.reviewList.push({key:si.WIDGETS.TICKER.MAIN.VIEWED,value:(this.tickerWidget?.view_count||0)?.toLocaleString()}),this.tickerWidget?.review_count>0&&this.reviewList.push({key:si.WIDGETS.TICKER.MAIN.RATED,value:(this.tickerWidget?.review_count||0)?.toLocaleString()}),this.tickerWidget?.pocket_count>0&&this.reviewList.push({key:si.WIDGETS.TICKER.MAIN.CART,value:(this.tickerWidget?.pocket_count||0)?.toLocaleString()}),this.tickerWidget?.order_count>0&&this.reviewList.push({key:si.WIDGETS.TICKER.MAIN.ORDERING,value:(this.tickerWidget?.order_count||0)?.toLocaleString()}),200===this.tickerOption.main_type&&(this.style.setProperty("--alp-ticker-main-width",("mobile"===this.device?this.tickerOption.main_width_mo_hori:this.tickerOption.main_width_pc_hori)+"px"),this.style.setProperty("--alp-ticker-main-height","fit-content"),this.style.setProperty("--alp-ticker-main-gap","15px"),this.style.setProperty("--alp-ticker-main-flex-type","column")),requestAnimationFrame(async()=>{this.isWidgetLoading=!1,await this.updateComplete,window?.CUSTOM_SWIPER?this.initialBtnSwiper():await p(()=>this.initialBtnSwiper())}))}swiperComponent(){const e=this.reviewList.map(e=>Je`
        <div class="swiper-slide ticker-inner-content">
          <p class="alp-body13 alp-medium line-wrap">
            ${Je`<b class="alp-bold alp-ht"
                >${e.value}${si.WIDGETS.TICKER.MAIN.PEOPLE_SUFFIX}${si.WIDGETS.TICKER.MAIN.KOREAN_SUFFIX}</b
              >
              ${e.key}`}
          </p>
        </div>
      `);return Je`
      <div class="ticker-content-wrapper">
        <div class="swiper-container ticker-sw-wrapper ${200===this.tickerOption.main_type?"inner-type-vertical":""}" id="sw-ticker-widget">
          <div class="swiper-wrapper" style="flex-direction: column;">${e}</div>
        </div>
        <p class="alp-body17 alp-bold line-wrap">${this.tickerWidget.product.product_name}</p>
      </div>
    `}render(){if(0!==this.reviewList.length&&!this.isWidgetLoading)return Je`
      <style>:host { --alp-ticker-main-width: 80px; --alp-ticker-main-height: fit-content; --alp-ticker-main-gap: 20px; --alp-ticker-main-flex-type: row; --alp-expand-start-width: 80px; --alp-expand-end-width: ${"mobile"===this.device?this.tickerOption.main_width_mo:this.tickerOption.main_width_pc}px; --alp-bounce-up-start-x: -50px; --alp-bounce-up-start-y: 50px; } .ticker-card-main { display: flex; width: fit-content; height: fit-content; align-items: flex-end; gap: 12px; border-radius: 20px; background: var(--alp-review-bg-white); box-shadow: 0 0 80px 0 rgba(30, 41, 59, 0.3); position: relative; } .ticker-content-wrapper { display: flex; flex-direction: column; gap: 7px; width: 100%; justify-content: center; } .type-100 { animation: alpBounceInUp 600ms both; will-change: transform, opacity; } .type-200 { animation: alpFadeUp 500ms both; will-change: transform, opacity; } .img-type-100 { width: 60px; height: 60px; object-fit: cover; border-radius: 12px; } .img-type-200 { width: 100%; aspect-ratio: 5/3; object-fit: cover; border-radius: 12px; } .ticker-card-main__inner { width: var(--alp-ticker-main-width); height: var(--alp-ticker-main-height); padding: ${200===this.tickerOption.main_type?"14px":"10px"}; display: flex; flex-direction: var(--alp-ticker-main-flex-type); gap: var(--alp-ticker-main-gap); overflow: hidden; } .inner-type-wide { animation: alpExpandWidth 600ms 600ms both; } .inner-type-vertical { max-width: calc(100% - 40px); opacity: 0; animation: alpFadeUp 500ms 750ms cubic-bezier(0.4, 0, 0.2, 1) forwards; } .type-vertical img { min-width: 100%; max-width: 100%; min-height: 130px; max-height: 130px; object-fit: cover; border-radius: 12px; } .ticker-card-main__inner > div { opacity: 0; animation: alpFadeUp 500ms 750ms cubic-bezier(0.4, 0, 0.2, 1) forwards; } .ticker-inner-content { display: flex !important; flex-direction: column; justify-content: center; gap: 7px; } :host-context(html[data-theme="dark"]) .ticker-inner-content span { color: var(--alp-review-text-gray50); } #sw-ticker-widget { position: relative; overflow: hidden !important; height: 20px; } .swiper-container, .ticker-card-main__inner { position: relative; overflow: hidden; } .ticker-sw-wrapper { height: 100%; width: 100%; overflow: hidden; } .swiper-wrapper { flex-direction: column; } review-count-down-button { margin: auto 0; } .vertical-fixed { position: absolute; bottom: 28px; right: 14px; } @media (max-width: 440px) { .ticker-card-main { width: 100%; } .ticker-card-main__inner { width: 100%; } }</style>
      <div class="ticker-card-main type-${this.tickerOption.main_type}">
        <div
          class="ticker-card-main__inner ${100===this.tickerOption.main_type?"inner-type-wide":""}"
        >
          <img
            @click=${()=>this.goToProductPage(""+this.tickerWidget.product.product_no)}
            class="img-type-${this.tickerOption.main_type}"
            alt="product image"
            src="${this.tickerWidget.product.detail_image??""}"
          />
          
          ${this.swiperComponent()}
          
          <review-count-down-button
            class="${200===this.tickerOption.main_type?"vertical-fixed":""}"
            .isShowCount=${this.isShowCount}
            .code=${"alpha-review-ticker-widget-main"}
            @review:clickCloseBtn=${()=>{this.closeTicker(),this.dispatchEvent(new CustomEvent("review:clickCloseBtn"))}}
          ></review-count-down-button>
        </div>
      </div>
    `}};bd([i({type:Object})],xd.prototype,"tickerWidget",2),bd([i({type:Object})],xd.prototype,"tickerOption",2),bd([i({type:String})],xd.prototype,"device",2),bd([r()],xd.prototype,"isShowCount",2),bd([r()],xd.prototype,"isWidgetLoading",2),bd([r()],xd.prototype,"reviewList",2),xd=bd([ae("review-ticker-card-main")],xd);var _d=Object.defineProperty,Cd=Object.getOwnPropertyDescriptor,$d=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Cd(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&_d(t,i,s),s};let Od=class extends ht{constructor(){super(...arguments),this.tickerWidget={},this.tickerOption={},this.isShowCount=!0,this.isWidgetLoading=!0,this.reviewList=[]}createRenderRoot(){return this}async initialBtnSwiper(){this._swiper=n({container:this.querySelector("#sw-ticker-detail"),styleRoot:this,options:{direction:"vertical",slidesPerView:1,spaceBetween:0,loop:!0,watchOverflow:!0,simulateTouch:!1,initialSlide:0,speed:300,autoplay:{delay:3e3,disableOnInteraction:!0,waitForTransition:!0,reverseDirection:!1},observer:!1,observeParents:!1}}),this.requestUpdate(),await this.updateComplete,requestAnimationFrame(()=>this._swiper?.init?.())}async update(e){super.update(e),e.has("tickerWidget")&&(window?.CUSTOM_SWIPER||await p(()=>this.initialBtnSwiper()),this.tickerWidget?.view_count>0&&this.reviewList.push({key:si.WIDGETS.TICKER.DETAIL.VIEWING,value:(this.tickerWidget?.view_count||0)?.toLocaleString()}),this.tickerWidget?.review_count>0&&this.reviewList.push({key:si.WIDGETS.TICKER.DETAIL.RATED,value:(this.tickerWidget?.review_count||0)?.toLocaleString()}),this.tickerWidget?.pocket_count>0&&this.reviewList.push({key:si.WIDGETS.TICKER.DETAIL.CART,value:(this.tickerWidget?.pocket_count||0)?.toLocaleString()}),this.tickerWidget?.order_count>0&&this.reviewList.push({key:si.WIDGETS.TICKER.DETAIL.ORDERING,value:(this.tickerWidget?.order_count||0)?.toLocaleString()}),this.setProductDesign(),requestAnimationFrame(async()=>{this.isWidgetLoading=!1,await this.updateComplete,this.initialBtnSwiper()}))}get productTimeout(){return"mobile"===P()?this.tickerOption?.product_timeout_mo??5:this.tickerOption?.product_timeout_pc??5}get isFixedPosition(){return this.tickerOption.product_position_pc===rr||this.tickerOption.product_position_mo===rr}onCountdownEnd(){this.productTimeout<1||this.isFixedPosition||c("review-ticker-widget")}closeTicker(){ba(en,"true",1),c("review-ticker-widget")}setProductDesign(){if(this.tickerOption.product_position_pc!==rr&&this.tickerOption.product_position_mo!==rr){if(100===this.tickerOption.product_type){const e="mobile"===P()?this.tickerOption.product_width_mo:this.tickerOption.product_width_pc;this.style.setProperty("--alp-ticker-product-width",e+"px")}else if(200===this.tickerOption.product_type){const e="mobile"===P()?this.tickerOption.product_width_mo_emphasis:this.tickerOption.product_width_pc_emphasis;this.style.setProperty("--alp-ticker-product-width",e+"px")}}else this.style.setProperty("--alp-ticker-product-width","100%")}normalComponent(){const e=this.reviewList.map(e=>Je`
        <div class="swiper-slide ticker-normal-inner-content">
          <p class="alp-body14 alp-semi-bold line-wrap">
            ${Je`<b class="alp-body14 alp-semi-bold alp-ht"
                >${e.value}${si.WIDGETS.TICKER.DETAIL.PEOPLE_SUFFIX}</b
              >${si.WIDGETS.TICKER.DETAIL.KOREAN_SUFFIX} ${e.key}`}
          </p>
        </div>
      `);return Je`
      <div class="swiper-container ticker-normal-inner" id="sw-ticker-detail">
        <div class="swiper-wrapper">${e}</div>
      </div>
      <p class="alp-body12 alp-medium line-wrap">${this.tickerWidget.product.product_name}</p>
      <review-count-down-button
        class="${200===this.tickerOption.main_type?"vertical-fixed":""}"
        style="position: absolute; top: -38px; right: 0; z-index: 10;"
        .isShowCount=${this.isShowCount}
        .timeout=${this.productTimeout}
        .code=${"alpha-review-ticker-widget-main"}
        @review:countdownEnd=${()=>this.onCountdownEnd()}
        @review:clickCloseBtn=${()=>{this.closeTicker(),this.dispatchEvent(new CustomEvent("review:clickCloseBtn"))}}
      ></review-count-down-button>
    `}emphasisComponent(){const e=this.reviewList.map(e=>Je`
        <div class="swiper-slide ticker-normal-inner-content">
          <img src="${te}/review-widget/ticker-user.png" alt="user icon" />
          <p class="alp-body14 alp-semi-bold line-wrap">
            ${Je`<b class="alp-body14 alp-semi-bold alp-ht"
                >${e.value}${si.WIDGETS.TICKER.DETAIL.PEOPLE_SUFFIX}</b
              >${si.WIDGETS.TICKER.DETAIL.KOREAN_SUFFIX} ${e.key}`}
          </p>
        </div>
      `);return Je`
      <div class="swiper-container ticker-normal-inner" style="height:28px" id="sw-ticker-detail">
        <div class="swiper-wrapper">${e}</div>
        <review-count-down-button
          class="${200===this.tickerOption.main_type?"vertical-fixed":""}"
          style="position: absolute; bottom: 0; right: 0; z-index: 10;"
          .isShowCount=${this.isShowCount}
          .timeout=${this.productTimeout}
          .code=${"alpha-review-ticker-widget-main"}
          @review:countdownEnd=${()=>this.onCountdownEnd()}
          @review:clickCloseBtn=${()=>{this.closeTicker(),this.dispatchEvent(new CustomEvent("review:clickCloseBtn"))}}
        ></review-count-down-button>
      </div>
    `}render(){if(0!==this.reviewList.length&&!this.isWidgetLoading)return Je`
      <style>:host { --alp-bounce-up-start-x: 0px; --alp-bounce-up-start-y: 100px; } .ticker-card-detail { height: fit-content; border-radius: 20px; display: flex; flex-direction: column; align-items: center; width: var(--alp-ticker-product-width, 320px); padding: 20px 18px; background: var(--alp-review-bg-white, #fff); box-shadow: 0 0 80px 0 rgba(30, 41, 59, 0.3); animation: alpBounceInUp 600ms both; } .ticker-card-detail > p { animation: alpFadeUp 200ms 350ms both; } .ticker-card-detail-emphasis { height: fit-content; border-radius: 6px; padding: 16px 18px; background: var(--alp-review-bg-white, #fff); box-shadow: 0 0 80px 0 rgba(30, 41, 59, 0.3); animation: alpBounceInUp 600ms both; width: var(--alp-ticker-product-width, 320px); } .ticker-normal-inner { height: 26px; overflow: hidden; animation: alpFadeUp 200ms 350ms both; width: 100%; } .ticker-normal-inner-content { width: 100%; height: fit-content; display: flex !important; flex-direction: ${100===this.tickerOption.product_type?"column !important":"row !important"}; justify-content: ${100===this.tickerOption.product_type?"center":"flex-start"}; padding-right: ${100===this.tickerOption.product_type?"0":"38px"}; align-items: center; gap: 7px; } .ticker-normal-inner-content img { height: 100%; width: auto; height: 16px; } .ticker-normal-inner-content p { width: fit-content; } #sw-ticker-detail { position: relative; overflow: hidden !important; height: 26px; } .swiper-container, .ticker-normal-inner { position: relative; overflow: hidden; } .swiper-wrapper { flex-direction: column; } @media (max-width: 440px) { .ticker-normal-inner-content img { height: 18px; } .ticker-normal-inner-content img { height: 100%; width: auto; height: 14px; } }</style>
      <div
        class="${100===this.tickerOption.product_type?"ticker-card-detail":"ticker-card-detail-emphasis"}"
      >
        ${100===this.tickerOption.product_type?this.normalComponent():this.emphasisComponent()}
      </div>
    `}};$d([i({type:Object})],Od.prototype,"tickerWidget",2),$d([i({type:Object})],Od.prototype,"tickerOption",2),$d([r()],Od.prototype,"isShowCount",2),$d([r()],Od.prototype,"isWidgetLoading",2),$d([r()],Od.prototype,"reviewList",2),Od=$d([ae("review-ticker-card-detail")],Od);const kd=[Ni,Di,pl("sns")];var Sd=Object.defineProperty,Ed=Object.getOwnPropertyDescriptor,Rd=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Ed(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Sd(t,i,s),s};let Ld=class extends(wn(ht)){constructor(){super(...arguments),this.previewData={},this.previewOption={},this.previewMeta={},this.widgetCode="",this.widgetSetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs=""}async updated(e){if(super.updated(e),e.has("isInViewport")){if(!this.isInViewport)return;this.provider=new dl(this,{widgetType:"sns",swiperContainerSelector:"#sw-"+this.widgetCode,swiperWrapperSelector:".sns-swiper-wrapper"}),await this.provider.initialize(),this.provider.initializeResizeManager()}}disconnectedCallback(){this.provider?.destroy(),super.disconnectedCallback()}render(){if(!this.provider?.isDesignLoaded)return Je`<div style="width:100%; height:1px;"></div>`;if(!this.provider?.isReady)return null;const e=`sns-widget-container${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`,t=this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode;return this.provider.errorCode?V(this.provider.errorCode,this.productNo,this.widgetSetCode||this.widgetCode,this.widgetCode):Je`<div class=${e} id=${t}>
      <review-header-title .designOption=${this.provider.designOption}></review-header-title>
      <div id="sw-${this.widgetCode}" class="swiper-container sns-swiper-container">
        <div class="swiper-wrapper sns-swiper-wrapper">
          ${this.provider.reviewList.map((e,t)=>Je` <div class="swiper-slide sns-swiper-slide">
              <review-sns-card
                class="slide-item"
                .review=${e}
                .designOption=${this.provider?.designOption}
                .filterOption=${this.provider?.filterOption}
                .isReviewListLoading=${this.provider?.isReviewListLoading}
                .index=${t}
                .reviewList=${this.provider?.reviewList}
              ></review-sns-card>
            </div>`)}
        </div>
        ${this.provider.isSwiperTypeActive&&this.provider.designOption?.navigation?Je`
              <review-arrow-pagination-handler
                .type=${Xt}
                .isPrevVisible=${this.provider.isPrevVisible}
                .isNextVisible=${this.provider.isNextVisible}
                @prevArrowClick=${this.provider.onPrevClick}
                @nextArrowClick=${this.provider.onNextClick}
              ></review-arrow-pagination-handler>
            `:null}
      </div>
      ${this.provider.designOption?.paging_type!==Gi&&this.provider.designOption?.indicator_type!==Hi?Je`
            <review-pagination-handler
              .paginationType=${this.provider.paginationType}
              .totalPages=${this.provider.totalPages}
              .currentPage=${this.provider.getCurrentPage()}
              .isMoreLoading=${this.provider.isReviewListLoading}
              .hasMoreReviews=${this.provider.reviewList.length<this.provider.totalRenderCount}
              .productNo=${this.productNo}
              .isLinksVisible=${!0}
              @paginationPrevClick=${this.provider.onPrevClick}
              @paginationNextClick=${this.provider.onNextClick}
              @paginationBulletClick=${this.provider.onPaginationBulletClick}
              @paginationMoreClick=${this.provider.onPaginationMoreClick}
            ></review-pagination-handler>
          `:null}
    </div> `}};Ld.styles=kd,Rd([i({type:Object,attribute:"data-widget-preview-data"})],Ld.prototype,"previewData",2),Rd([i({type:Object,attribute:"data-widget-preview-option"})],Ld.prototype,"previewOption",2),Rd([i({type:Object,attribute:"data-widget-preview-meta"})],Ld.prototype,"previewMeta",2),Rd([i({type:String,attribute:"data-widget-code"})],Ld.prototype,"widgetCode",2),Rd([i({type:String,attribute:"data-widget-set-code"})],Ld.prototype,"widgetSetCode",2),Rd([i({type:String,attribute:"data-product-no"})],Ld.prototype,"productNo",2),Rd([i({type:String,attribute:"data-widget-custom-class"})],Ld.prototype,"widgetCustomClass",2),Rd([i({type:String,attribute:"data-widget-custom-id"})],Ld.prototype,"widgetCustomId",2),Rd([i({type:Boolean,attribute:"data-dummy"})],Ld.prototype,"isDummy",2),Rd([i({type:String,attribute:"data-custom-class"})],Ld.prototype,"customClass",2),Rd([i({type:String,attribute:"data-custom-id"})],Ld.prototype,"customId",2),Rd([i({type:String,attribute:"data-custom-css"})],Ld.prototype,"customCss",2),Rd([i({type:String,attribute:"data-custom-js"})],Ld.prototype,"customJs",2),Ld=Rd([ae("review-sns-widget")],Ld);var Id=Object.defineProperty,Pd=Object.getOwnPropertyDescriptor,Td=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Pd(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Id(t,i,s),s};let Ad=class extends ht{constructor(){super(...arguments),this.isReviewListLoading=!1,this.index=0,this.getPlatform=e=>"\uc778\uc2a4\ud0c0\uadf8\ub7a8"===e?vt:"\ub124\uc774\ubc84\ube14\ub85c\uadf8"===e?mt:""}createRenderRoot(){return this}openDetailPopup(){gn({reviewId:this.review?.id?.toString(),option:this.filterOption,reviewIndex:this.index,backupList:this.reviewList})}goToProductPage(e){pn(e)}render(){const e=Je`<style>.sns-swiper-slide { container-name: sns-swiper-slide; container-type: inline-size; width: 100%; min-height: fit-content; overflow: hidden; } .slide-item { display: block; padding-bottom: 16px; } .sns-review-content { display: flex; flex-direction: column; padding: 12px 8px 16px; gap: 10px; } .review-media { cursor: pointer; } .interact-area { display: flex; gap: 8px; margin-bottom: 4px; } .sns-review-content .review { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; } .interact-area review-custom-icon:nth-child(3) { margin-left: auto; } .review-info--small { display: none; } .review-info--medium { display: none; } .review-info--large { display: none; } .writer-info-box { display: flex; align-items: center; gap: 2px; margin-top: auto; height: 23px; width: 100%; } .writer-info-box review-user-info { flex-shrink: 1; min-width: 0; overflow: hidden; } .writer-info-box review-at-date { padding-right: 6px; } .writer-info-box review-badge { margin-left: auto; } .product-info-box { display: flex; width: 100%; padding: 11px 10px 14px; gap: 13px; cursor: pointer; } .product-content-box { display: flex; flex-direction: column; gap: 5px; overflow: hidden; } @container sns-swiper-slide (min-width: 0px) and (max-width: 120px) { .review-media { border-radius: 4px; } .product-info-box { display: none; } .writer-info-box { display: none; } .sns-review-content { padding: 6px 4px 8px; } .interact-area.sm { display: flex; gap: 4px; margin-bottom: 2px; } .interact-area.md { display: none; } .interact-area.lg { display: none; } .review.sm { display: -webkit-box; } .review.md { display: none; } .review.lg { display: none; } } @container sns-swiper-slide (min-width: 120px) and (max-width: 300px) { .review-media { border-radius: 8px; } .product-info-box { padding: 10px 4px 14px; gap: 8px; } .sns-review-content { padding: 6px 4px 8px; gap: 12px; } .interact-area.sm { display: none; } .interact-area.md { display: flex; gap: 4px; margin-bottom: 0; } .interact-area.lg { display: none; } .review.sm { display: none; } .review.md { display: -webkit-box; } .review.lg { display: none; } } @container sns-swiper-slide (min-width: 300px) { .review-media { border-radius: 12px; } .sns-review-content { } .interact-area.sm { display: none; } .interact-area.md { display: none; } .interact-area.lg { display: flex; } .review.sm { display: none; } .review.md { display: none; } .review.lg { display: -webkit-box; } }</style>`;return Je`${e}${this.review?.id?Je`
          ${this.designOption.product_info?Je` <div
                class="product-info-box"
                @click=${()=>this.goToProductPage(this.review.product?.product_no?.toString())}
              >
                <review-product-thumbnail
                  .productImageUrl="${this.review.product?.detail_image}"
                  .containerQueryInfo=${{name:"sns-swiper-slide",breakpoints:{small:0,medium:120,large:300}}}
                ></review-product-thumbnail>
                <div class="product-content-box">
                  <review-product-name-price
                    .productName="${this.review.product?.product_name}"
                    .showPrice=${!1}
                    .fontWeight=${"500"}
                    .fontSizeClassMedium_name=${"alp-body14"}
                    .fontSizeClassLarge_name=${"alp-body14"}
                    .fontSizeClassMedium_price=${"alp-caption10"}
                    .fontSizeClassLarge_price=${"alp-caption11"}
                    .containerQueryInfo=${{name:"sns-swiper-slide",breakpoints:{small:0,medium:120,large:300}}}
                  ></review-product-name-price>
                  <review-product-rating-count
                    .averageRating="${this.review.product?.review_ratings_connect}"
                    .reviewCount="${this.review.product?.review_number_connect_count}"
                    .fontSizeClassMediumRating=${"alp-body13"}
                    .fontSizeClassLargeRating=${"alp-body13"}
                    .fontSizeClassMedium=${"alp-body13"}
                    .fontSizeClassLarge=${"alp-body13"}
                    .containerQueryInfo=${{name:"sns-swiper-slide",breakpoints:{small:0,medium:120,large:300}}}
                  ></review-product-rating-count>
                </div>
              </div>`:null}
          <review-review-media
            class="review-media"
            .reviewMedia=${this.review.ordered_media[0]}
            .productImg="${this.review.product?.detail_image}"
            .socialType=${this.getPlatform(this.review.platform_display)}
            .totalPages="${this.review.media_length}"
            @click=${this.openDetailPopup}
          ></review-review-media>
          <div class="sns-review-content">
            
            <div class="interact-area sm">
              <review-like-button
                .type=${"button"}
                .size=${20}
                .reviewId=${this.review.id}
                .productNo=${this.review.product?.product_no}
              ></review-like-button>
              <review-custom-icon
                .type=${zt}
                .width=${20}
                .height=${20}
                .color=${"var(--alp-review-icon-gray50)"}
              ></review-custom-icon>
              <review-custom-icon
                .type=${jt}
                .width=${20}
                .height=${20}
                .color=${"var(--alp-review-icon-gray50)"}
              ></review-custom-icon>
            </div>
            <div class="interact-area md">
              <review-like-button
                .type=${"button"}
                .size=${28}
                .reviewId=${this.review.id}
                .productNo=${this.review.product?.product_no}
              ></review-like-button>
              <review-custom-icon
                .type=${zt}
                .width=${28}
                .height=${28}
                .color=${"var(--alp-review-icon-gray50)"}
              ></review-custom-icon>
              <review-custom-icon
                .type=${jt}
                .width=${28}
                .height=${28}
                .color=${"var(--alp-review-icon-gray50)"}
              ></review-custom-icon>
            </div>
            <div class="interact-area lg">
              <review-like-button
                .type=${"button"}
                .size=${28}
                .reviewId=${this.review.id}
                .productNo=${this.review.product?.product_no}
              ></review-like-button>
              <review-custom-icon
                .type=${zt}
                .width=${28}
                .height=${28}
                .color=${"var(--alp-review-icon-gray50)"}
              ></review-custom-icon>
              <review-custom-icon
                .type=${jt}
                .width=${28}
                .height=${28}
                .color=${"var(--alp-review-icon-gray50)"}
              ></review-custom-icon>
            </div>
            
            <div class="review sm alp-body14 alp-medium alp-line14">${this.review.content}</div>
            <div class="review md alp-body14 alp-medium alp-line14">${this.review.content}</div>
            <div class="review lg alp-body14 alp-medium alp-line14">${this.review.content}</div>
            ${this.designOption.writer||this.designOption.create_at?Je` <div class="writer-info-box">
                  ${this.designOption.writer?Je`
                        <review-user-info
                          .review=${this.review}
                          .sizeType=${"small"}
                          .fontWeight=${"400"}
                          .fontSizeClassSmall=${"alp-body12"}
                          .fontSizeClassMedium=${"alp-body13"}
                          .fontSizeClassLarge=${"alp-body13"}
                        ></review-user-info>
                      `:null}
                  ${this.designOption.writer&&this.designOption.create_at?Je`
                        <review-custom-icon
                          .type=${Nt}
                          .width=${8}
                          .height=${12}
                          .color=${"var(--alp-review-icon-gray10)"}
                        ></review-custom-icon>
                      `:null}
                  ${this.designOption.create_at?Je`
                        <review-at-date
                          .createDate=${new Date(this.review.created_at)}
                          .fontWeight=${"400"}
                          .fontSizeClassSmall=${"alp-body12"}
                          .fontSizeClassMedium=${"alp-body13"}
                          .fontSizeClassLarge=${"alp-body13"}
                        ></review-at-date>
                      `:null}
                  ${this.review.is_verified&&window.ALPHA_REVIEW_SHOP_DESIGN_OPTION?.use_writer_verify?Je`<review-badge
                        .type=${"verified"}
                        .fontSizeClassSmall=${"alp-caption10"}
                        .fontSizeClassMedium=${"alp-caption10"}
                        .fontSizeClassLarge=${"alp-caption11"}
                      ></review-badge>`:null}
                </div>`:null}
          </div>
        `:Je` <review-sns-skeleton
          .designOption=${this.designOption}
          .isReviewListLoading=${this.isReviewListLoading}
        ></review-sns-skeleton>`} `}};Td([i({type:Object})],Ad.prototype,"review",2),Td([i({type:Object})],Ad.prototype,"reviewList",2),Td([i({type:Object})],Ad.prototype,"filterOption",2),Td([i({type:Object})],Ad.prototype,"designOption",2),Td([i({type:Boolean})],Ad.prototype,"isReviewListLoading",2),Td([i({type:Number})],Ad.prototype,"index",2),Ad=Td([ae("review-sns-card")],Ad);var Nd=Object.defineProperty,Dd=Object.getOwnPropertyDescriptor,Md=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Dd(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Nd(t,i,s),s};let Wd=class extends ht{constructor(){super(...arguments),this.isReviewListLoading=!1}render(){return Je`
      ${this.designOption?.product_info?Je`
            <div class="product-info-box">
              <div
                class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-thumbnail"
              ></div>
              <div class="product-content-box">
                <div
                  class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-product-name"
                ></div>
                <div class="skeleton-rating-box">
                  <review-star-icon
                    .size=${14}
                    .color=${"rgba(94, 103, 118, 0.13)"}
                  ></review-star-icon>
                  <div
                    class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-rating-text"
                  ></div>
                </div>
              </div>
            </div>
          `:null}

      <div
        class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-media"
      ></div>

      <div class="sns-review-content">
        
        <div class="interact-area sm">
          <review-custom-icon
            .type=${Rt}
            .width=${20}
            .height=${20}
            .color=${"var(--alp-review-icon-gray50)"}
          ></review-custom-icon>
          <review-custom-icon
            .type=${zt}
            .width=${20}
            .height=${20}
            .color=${"var(--alp-review-icon-gray50)"}
          ></review-custom-icon>
          <review-custom-icon
            .type=${jt}
            .width=${20}
            .height=${20}
            .color=${"var(--alp-review-icon-gray50)"}
          ></review-custom-icon>
        </div>
        <div class="interact-area md">
          <review-custom-icon
            .type=${Rt}
            .width=${28}
            .height=${28}
            .color=${"var(--alp-review-icon-gray50)"}
          ></review-custom-icon>
          <review-custom-icon
            .type=${zt}
            .width=${28}
            .height=${28}
            .color=${"var(--alp-review-icon-gray50)"}
          ></review-custom-icon>
          <review-custom-icon
            .type=${jt}
            .width=${28}
            .height=${28}
            .color=${"var(--alp-review-icon-gray50)"}
          ></review-custom-icon>
        </div>
        <div class="interact-area lg">
          <review-custom-icon
            .type=${Rt}
            .width=${28}
            .height=${28}
            .color=${"var(--alp-review-icon-gray50)"}
          ></review-custom-icon>
          <review-custom-icon
            .type=${zt}
            .width=${28}
            .height=${28}
            .color=${"var(--alp-review-icon-gray50)"}
          ></review-custom-icon>
          <review-custom-icon
            .type=${jt}
            .width=${28}
            .height=${28}
            .color=${"var(--alp-review-icon-gray50)"}
          ></review-custom-icon>
        </div>

        <div
          class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-review"
        ></div>
      </div>
    `}};Wd.styles=[ko,ue`review-sns-skeleton{display:block;container:sns-swiper-slide/inline-size}.remove-shimmer{animation:none}.skeleton-media{aspect-ratio:1;border-radius:4px;width:100%}.product-info-box{gap:13px;width:100%;padding:11px 10px 14px;display:flex}.skeleton-thumbnail{border-radius:50%;flex-shrink:0;width:36px;height:36px}.product-content-box{flex-direction:column;flex:1;gap:8px;display:flex;overflow:hidden}.skeleton-product-name{border-radius:4px;width:98%;height:16px}.skeleton-rating-box{align-items:center;gap:4px;display:flex}.skeleton-rating-text{border-radius:4px;width:40px;height:12px}.sns-review-content{flex-direction:column;gap:10px;height:fit-content;padding:12px 8px 16px;display:flex}.interact-area{gap:8px;margin-bottom:4px;display:flex}.interact-area review-custom-icon:nth-child(3){margin-left:auto}.skeleton-review{border-radius:4px;width:100%;height:28px}.writer-info-box{align-items:center;gap:2px;width:100%;height:23px;margin-top:auto;display:flex}.skeleton-writer{border-radius:4px;width:60px;height:12px}.skeleton-date{border-radius:4px;width:50px;height:12px}@container sns-swiper-slide (width>=0) and (width<=120px){.skeleton-media{border-radius:4px}.product-info-box,.writer-info-box{display:none}.sns-review-content{padding:6px 4px 8px}.interact-area.sm{gap:4px;margin-bottom:2px;display:flex}.interact-area.md,.interact-area.lg{display:none}}@container sns-swiper-slide (width>=120px) and (width<=300px){.skeleton-media{border-radius:8px}.product-info-box{gap:8px;padding:10px 4px 14px}.skeleton-thumbnail{width:34px;height:34px}.sns-review-content{gap:12px;padding:6px 4px 8px}.interact-area.sm{display:none}.interact-area.md{gap:4px;margin-bottom:0;display:flex}.interact-area.lg{display:none}}@container sns-swiper-slide (width>=300px){.skeleton-media{border-radius:12px}.interact-area.sm,.interact-area.md{display:none}.interact-area.lg{display:flex}}`],Md([i({type:Object})],Wd.prototype,"designOption",2),Md([i({type:Boolean})],Wd.prototype,"isReviewListLoading",2),Wd=Md([ae("review-sns-skeleton")],Wd);const zd=350,jd="review-sns-short-popup",Vd=ge("4px"),Fd=ge("1.2"),Bd=ge(""+217/189),Ud=ge(""+186/162),Hd=[Ni,Di,ue`
    :host {
      display: block;
      width: 100%;
      container-type: inline-size;
      container-name: sns-short-widget;
      font-family: var(--alp-common-font-family);
    }

    /* ë¸ì¶í  ì½íì¸  0ê±´ â ìì ¯ì´ ì°ë ìë¦¬ê¹ì§ ìì¤ë¤.
       render() ê° null ì ë´ë©´ ëì´ë 0 ì´ ëì§ë§ í¸ì¤í¸ ë°ì¤ë ë¨ì, í¸ì¤í¸ ì¼íëª°ì´ ë¶ëª¨ì flex/grid
       gap ì´ë íì  ë§ì§ì ê±¸ì´ë ìë¦¬ììë ê·¸ ì¬ë°±ì´ ê·¸ëë¡ ë³´ì¸ë¤. ì :host ì display:block ì
       ìì±ì ì¤íì¼ì´ë¼ UA ì [hidden] ê·ì¹ì ë®ì¼ë¯ë¡, ì íë ìì±ì ì¤íì¼ë¡ ëªìí´ì¼ ë¨¹ëë¤. */
    :host([empty]) {
      display: none;
    }

    .sns-short-widget-container {
      width: 100%;
      /* ìì ¯ ë°ê¹¥ ì¬ë°± â ë¤ë¥¸ ìì ¯ ì»¨íì´ë(board/notice 0 10px + pb40, briefing 40px 10px)ì ê°ì ì¶(40/10).
         íë¨ì´ 0 ì¸ ê±´ nav ê° ì´ë¯¸ padding 20px 0 ì¼ë¡ ìë ì¬ë°±ì ë´ê³ , ê³µì ì ìë´ê° ë¶ì ë ì´ì¤ ì¬ë°±ì´ ëê¸° ëë¬¸ì´ë¤.
         ìë í¸ë í¨ë©(--sns-short-track-pad-*)ê³¼ë ì­í ì´ ë¤ë¥´ë¤ â ê·¸ìª½ì íë ì¹´ëê° overflow:hidden ì ìë¦¬ì§
         ìê² íë ì¤ë²íë¡ì° ë³´ì ì´ë¼ ì¬ë¡¯ í­ìì íìëê³ , ì´ í¨ë©ì ê·¸ ë°ê¹¥ì ì¹íë ê³ ì  ë ì´ìì ì¬ë°±ì´ë¤. */
      padding: 40px 10px 0;
      --sns-short-slot-w: min(${ge(207)}px, 72cqw);
      /* í¬ì»¤ì¤ ì¹´ë íë ë°°ì¨(ë¨ì ìë ì) â ì¹´ëì íë í­ê³¼ ìë í¸ë í¨ë©ì´ ê°ì ê°ìì íìë¼ì¼ íëë¶ê³¼ ì¬ë°±ì´ ì íí ë§ë¬¼ë¦°ë¤. */
      --sns-short-active-scale: ${Fd};
      /* ë¯¸ëì´ â ìí ì ë³´ ê°ê²© â ì¹´ëê° .sns-short-card ì gap ê³¼ :host([product-slot]) ì padding-bottom ììª½ìì ê°ì ê°ì¼ë¡ ì½ëë¤(ëì´ ê°ë¦¬ë©´ ë¯¸ëì´ ì¸ë¡ì¤ì¬ì´ ì´ê¸ëë¤). */
      --sns-short-product-gap: ${ge(12)}px;
      /* ì¹´ë ê°ê²© â CSS ë ì°ì§ ìê³  Swiper spaceBetween(snapGrid)ì´ JS ë¡ ì½ì´ ê°ë¤. ë·°í¬í¸ê° ìëë¼ ì»¨íì´ë ê¸°ì¤ì´ë¼ matchMedia ë¡ë ëª» êµ¬í´ CSS ë¥¼ ë¨ì¼ ì¶ì²ë¡ ì¼ëë¤. */
      --sns-short-gap: ${ge(36)}px;
      /* íë ì¹´ëê° ëì¹ë ë§í¼ì ì¤ìì´í¼ í¨ë©ì¼ë¡ íë³´(ê°ë¡ = ì¬ë¡¯Ã(ë°°ì¨â1)/2, ì¸ë¡ë 9:16 ì´ë¼ ê·¸ 16/9 ë°°) + BLEED: ì íí ê°ê² ëë©´ ìë³Â·ì¢ë³ radius ê° clip ê²½ê³ì 0px ë¡ ë§ë¬¼ë ¤ ìë¦°ë¤. */
      --sns-short-track-pad-x: calc(
        var(--sns-short-slot-w) * (var(--sns-short-active-scale, ${Fd}) - 1) / 2 +
          ${Vd}
      );
      --sns-short-track-pad-y: calc(
        var(--sns-short-slot-w) * (var(--sns-short-active-scale, ${Fd}) - 1) / 2 * 16 / 9 +
          ${Vd}
      );
      --sns-short-card-radius: 8px;
      --sns-short-card-radius-active: 10px;
      --sns-short-card-info-pad: 32px 16px 16px;
      --sns-short-card-info-gap: 6px;
      --sns-short-card-info-gap-active: 8px;
      --sns-short-card-handle-size: 12px;
      --sns-short-card-handle-size-active: 14px;
      --sns-short-card-handle-lh-active: 1.5;
      --sns-short-card-title-size: 14px;
      --sns-short-card-title-ls: -0.02em;
      --sns-short-card-title-size-active: 16px;
      --sns-short-card-title-lh-active: 1.3;
    }

    .sns-short-stage {
      position: relative;
      width: 100%;
    }

    .sns-short-swiper {
      width: 100%;
      overflow: hidden;
      /* í¬ì»¤ì¤ ì¹´ë(1.2ë°°)ê° overflow:hidden ì ìë¦¬ì§ ìëë¡ ì¤ë²íë¡ì°ëê³¼ ê°ì ì¬ë°±ì ì¤ë¤. */
      padding: var(--sns-short-track-pad-y) var(--sns-short-track-pad-x);
    }

    .sns-short-slide {
      /* slidesPerView:"auto" ì© ê³ ì  í­ = ë¹íì± ì¹´ë í¬ê¸°(Figma 207Ã368). íì± ì¹´ëë absolute ë¼ ì´ ì¬ë¡¯ì ëíì§ ìëë¤. */
      flex: 0 0 auto;
      width: var(--sns-short-slot-w);
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* íë¨ ë¤ë¹ê²ì´ì â Figma 19266-93769: 40px ìí ììë¼ì¸ ë²í¼, 24px ì°ë¸ë¡ , gap 36, ì¸ë¡ í¨ë© 20 */
    .sns-short-nav {
      display: flex;
      /* Figma 19266-93768: ì²« ì¬ë¡¯ê³¼ ê°ì í­Â·ê°ì ë¤ì¬ì°ê¸° ë°ì¤ë¼, ê·¸ ìì ê°ì´ë° ì ë ¬ì´ ê³§ ì²«(í¬ì»¤ì¤) ì¹´ë ì¤ì¬ */
      justify-content: center;
      gap: 36px;
      padding: 20px 0;
      width: var(--sns-short-slot-w);
      margin-left: var(--sns-short-track-pad-x);
    }
    .sns-short-nav__btn {
      flex: 0 0 auto;
      width: 40px;
      height: 40px;
      padding: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--alp-review-border-gray20, #e3e4e7);
      border-radius: 50%;
      background: transparent;
      cursor: pointer;
      transition: background 0.15s ease;
    }
    .sns-short-nav__btn:hover {
      background: var(--alp-review-card-gray03, #1e293b08);
    }
    .sns-short-nav__btn:active {
      background: var(--alp-review-card-gray07, #1e293b12);
    }

    /* íë¸ë¦¿ (441~840px) â ê¸°í 4ì¢ë§ ê°ìë¼ì°ë©´ ì¤ìì´í¼ í¨ë©Â·nav ì ë ¬Â·ì¹´ë íëí­ì´ í¨ê» ë°ë¼ì¨ë¤.
       ì¹´ë ë´ë¶(íì´í¬Â·í¨ë©Â·radius)ë íë¸ë¦¿Â·ëª¨ë°ì¼ ì¤íì´ ëì¼í´ ìë --sns-short-card-* ë¥¼ ì¬ê¸°ì í ë²ë§ ë®ëë¤. */
    @container sns-short-widget (max-width: ${ge(Kt)}) {
      .sns-short-widget-container {
        /* ìë¨ ì¬ë°±ë§ ì ë° â briefing(40px 10px â â¤840 ìì 20px 10px)Â·board/notice(pb40 â â¤440 ìì 20px)ê°
           ëª¨ë ì¢ì í­ìì 40 â 20 ì¼ë¡ ë´ë¦¬ë ì ë¡ë¥¼ ë°ë¥¸ë¤. ê°ë¡ 10px ì ì¸ ìì ¯ ë¤ ì¤ë²ë¼ì´ë ìì´ ííí´ ê·¸ëë¡ ëë¤.
           ì´ ë¸ë¡ì íë¸ë¦¿Â·ëª¨ë°ì¼ ê³µíµê° ìë¦¬ë¼ ì¬ê¸° í ë²ë§ ë®ì¼ë©´ â¤440 ê¹ì§ í¨ê» ì ì©ëë¤. */
        padding-top: 20px;
        --sns-short-slot-w: min(${ge(189)}px, 72cqw);
        --sns-short-active-scale: ${Bd};
        --sns-short-product-gap: ${ge(10)}px;
        --sns-short-gap: ${ge(28)}px;

        /* ì¹´ë ë´ë¶ë íë¸ë¦¿Â·ëª¨ë°ì¼ ì¤íì´ ëì¼í´ ì´ ë¸ë¡ í ë²ë§ ë®ëë¤(â¤440 ë¸ë¡ì ê¸°íë§ ë°ê¾¼ë¤).
           TabletÂ·Mobile ê³µíµ: radius 6/8, info pt24/px12/pb12, gap 4/6, í¸ë¤ 11/13, ì ëª© 13/14. */
        --sns-short-card-radius: 6px;
        --sns-short-card-radius-active: 8px;
        --sns-short-card-info-pad: 24px 12px 12px;
        --sns-short-card-info-gap: 4px;
        --sns-short-card-info-gap-active: 6px;
        --sns-short-card-handle-size: 11px;
        --sns-short-card-handle-size-active: 13px;
        --sns-short-card-handle-lh-active: 1.4;
        --sns-short-card-title-size: 13px;
        --sns-short-card-title-ls: -0.01em;
        --sns-short-card-title-size-active: 14px;
        --sns-short-card-title-lh-active: 1.4;
      }
    }

    /* ëª¨ë°ì¼ (â¤ 440px) â ì¬ë¡¯ì ëìì¸ íì ê° ê³ ì  px(ì»¨íì´ë ë¹ë¡ ìë)ë¼
       441 ê²½ê³ìì 189 â 162 ë¡ í ë² ì ííë¤(ëìì¸ ê²°ì ). */
    @container sns-short-widget (max-width: ${ge(Zt)}) {
      .sns-short-widget-container {
        --sns-short-slot-w: min(${ge(162)}px, 72cqw);
        --sns-short-active-scale: ${Ud};
        --sns-short-product-gap: ${ge(8)}px;
        --sns-short-gap: ${ge(24)}px;
      }
    }
  `],Gd={INSTAGRAM:"instagram",TIKTOK:"tiktok",YOUTUBE:"youtube",ETC:"etc"},qd=Object.values(Gd);class Yd{constructor(){this.trigger=null,this.byKeyboard=!1}capture(e){const t=X(e);this.trigger=t,this.byKeyboard=!!t&&function(e){try{return e.matches(":focus-visible")}catch{return!1}}(t)}release(e){const{trigger:t,byKeyboard:i}=this;this.trigger=null,this.byKeyboard=!1,i&&t?.isConnected?t.focus({preventScroll:!0}):function(e){X(e)?.blur?.()}(e)}}const Kd=[Ni,Di,ue`
    :host {
      position: absolute;
      inset: 0;
      /* ë·°ì´ì íë¨ ì ë³´ ì¤ë²ë ì´(5)ë³´ë¤ ì, ë«ê¸° ë²í¼(20)ë³´ë¤ ìë â ìí¸ ìë¡ X ê° ë³´ì¬ì¼ íë¤. */
      z-index: 10;
      font-family: var(--alp-common-font-family);
      display: block;
    }

    /* ëª¨ë¬ì body í¬í¸(ê³ ì  ìì¹)ì, ìí¸ë ë·°ì´ ë´ë¶(ì ë ìì¹)ì ì¹íë¤. */
    :host([variant="modal"]) {
      position: fixed;
    }

    /* ë¤ì "ë°ê¹¥ í­ì¼ë¡ ë«ê¸°" íí¸ìì­ë ê²¸íë¤ â ê·¸ëì ìí¸ììë ììë ëê³  ë°°ê²½ë§ í¬ëªíê² íë¤. */
    .dim {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    :host([open]) .dim {
      opacity: 1;
    }
    /* ëª¨ë¬ë§ ë¤ë¥¼ ì´ë¡ê² íë¤. ìí¸ë ë¦´ì¤ê° ê·¸ëë¡ ë³´ì´ë ê² ìë. */
    :host([variant="modal"]) .dim {
      background: var(--alp-review-scrim-black70, #000000b2);
    }
    .panel-clip {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }

    .panel {
      position: absolute;
      background: var(--alp-review-bg-white, #fff);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      /* ë¦¬ì¤í¸ íë¨ ì¬ë°± 8 ì ì¬ê¸°ì ì¤ë¤ â .list ì padding-bottom ì ì¤í¬ë¡¤ ì½íì¸  "ë"ì ë¶ì´
         5í ëì´ ìí(ìë .list max-height) ê³ì°ì ì´ê¸ëê² íê³ , ì íí 5ê°ì¼ ëë 8px ì¤í¬ë¡¤ì ë§ë ë¤. */
      padding-bottom: 8px;
      /* í´ë¦½ì´ pointer-events ë¥¼ ê»ì¼ë¯ë¡ í¨ëìì ëì´ë¦°ë¤. */
      pointer-events: auto;
    }

    /* ââ ëª¨ë¬: íë©´ ì¤ì, ì¢ì° ì¬ë°± 24px(375 íë ììì í­ 327), ìµë 360px ââ */
    :host([variant="modal"]) .panel {
      top: 50%;
      left: 50%;
      width: calc(100% - 48px);
      max-width: 360px;
      max-height: 70vh;
      border-radius: 16px;
      transform: translate(-50%, -46%) scale(0.98);
      opacity: 0;
      transition:
        transform 0.22s ease,
        opacity 0.22s ease;
    }
    :host([variant="modal"][open]) .panel {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }

    /* ââ ìí¸: íë¨ìì ì¬ë¼ì´ ââ */
    :host([variant="sheet"]) .panel {
      left: 0;
      right: 0;
      bottom: 0;
      max-height: 72%;
      border-radius: 16px 16px 0 0;
      transform: translateY(100%);
      transition: transform 0.26s cubic-bezier(0.32, 0.72, 0, 1);
    }
    :host([variant="sheet"][open]) .panel {
      transform: translateY(0);
    }
    /* ëëê·¸ ì¤ìë ì¸ë¼ì¸ transform ì´ ì°ì íëë¡ transition ì ëë¤(ìê°ë½ì ë¶ì´ ë°ë¼ì¤ê²). */
    :host([dragging]) .panel {
      transition: none;
    }

    /* ëëê·¸ í¸ë¤ â ìí¸ìë§. í°ì¹ íê¹ì íë³´íë ¤ê³  í¨ë©ì¼ë¡ ê°ì¼ë¤. */
    .handle {
      flex: 0 0 auto;
      padding: 8px 0 4px;
      display: flex;
      justify-content: center;
      cursor: grab;
      touch-action: none;
    }
    .handle::after {
      content: "";
      display: block;
      width: 40px;
      height: 4px;
      border-radius: 2px;
      background: var(--alp-review-border-gray20, #1e293b33);
    }

    /* ëª¨ë¬Â·ìí¸ ê³µíµ: Summary 45 ììì íì´í íì¤í¸ê° x16/y16 â padding 16/16/8. ë ë³íì´ ê°ì ê°ì´ë¼ ë¶ê¸°ê° ìë¤. */
    .title {
      flex: 0 0 auto;
      padding: 16px 16px 8px;
      color: var(--alp-review-text-gray100, #1e293b);
      font-size: 16px;
      font-weight: 700;
      line-height: 1.4;
      letter-spacing: -0.16px;
    }
    /* ì¢ì° 8 + í í¨ë© 8 = ì¸ë¤ì¼ ì¢ì¸¡ ì¸ì 16. í í¨ë©ì í¸ë² íì´ë¼ì´í¸ ë°ì¤ë¥¼ ë§ëë ê°ì´ë¼ 0 ì¼ë¡ ëª» ì¤ì¸ë¤.
       íë¨ 8 ì .panel ë¡ ì®ê²¼ë¤(ì ì£¼ì). */
    .list {
      flex: 1 1 auto;
      /* ì°ê´ ìíì ê°ì ì í ìì´ ë±ë¡ë  ì ìë¤. SHEET_VISIBLE_ROWS ê°ê¹ì§ë ë´ì©ë§í¼ë§ ì°¨ì§íê³ (í¨ëë ê°ì´ ììì§ë¤),
         ê·¸ë³´ë¤ ë§ì¼ë©´ í¨ëì í¤ì°ë ëì  ì¬ê¸°ì ìë¦¬ê³  ë¦¬ì¤í¸ë§ ì¤í¬ë¡¤íë¤. í¨ë ìì²´ì ìí(max-height 72%/70vh)ì
         ì´ ê°ë³´ë¤ ììì§ ëë§ ì´ê¸°ë¯ë¡, ì§§ì ë·°í¬í¸ììë ê¸°ì¡´ëë¡ í¨ëì´ ë¨¼ì  ìë¦°ë¤. */
      max-height: calc(${ge(5)} * ${ge(60)}px);
      overflow-y: auto;
      /* ëì ë¿ìë ë¤(ë¦´ì¤Â·í¸ì¤í¸ íì´ì§)ë¡ ì¤í¬ë¡¤ì´ ì´ì´ì§ì§ ìê² íë¤. */
      overscroll-behavior: contain;
      /* ì¸ë¡ ì¤í¬ë¡¤ë§ ë¸ë¼ì°ì ì ë§¡ê¸´ë¤ â ìí¸ ëëê·¸ë .handle ì ì©ì´ë¼ ë ì ì¤ì²ê° ê²¹ì¹ì§ ìëë¤. */
      touch-action: pan-y;
      -webkit-overflow-scrolling: touch;
      padding: 0 8px;
      display: flex;
      flex-direction: column;
    }

    .row {
      /* ëì´ë¥¼ ëª»ë°ëë¤ â ë¦¬ì¤í¸ ìíì´ ì´ ê° Ã SHEET_VISIBLE_ROWS ë¼, ë´ì© ëì´ì ë§¡ê¸°ë©´ ìíê³¼ ì¤ì  í ìê° ì´ê¸ëë¤.
         flex ì»¨íì´ë(.list) ìì´ë¼ shrink ë í¨ê» ëë¤(ìíì ê±¸ë ¸ì ë íì´ ëë¦¬ë ëì  ì¤í¬ë¡¤ëì´ì¼ íë¤). */
      flex: 0 0 auto;
      height: ${ge(60)}px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px;
      border-radius: 8px;
      color: var(--alp-review-text-gray100, #1e293b);
      text-decoration: none;
      cursor: pointer;
    }
    .row:hover {
      background: var(--alp-review-card-gray07, #1e293b12);
    }
    /* ë¦¬ìì outline:none ì ëëë¦°ë¤(í¤ë³´ë í¬ì»¤ì¤ ë§ ì ì§). */
    .row:focus-visible {
      outline: 2px solid var(--alp-review-text-gray100, #1e293b);
      outline-offset: -2px;
    }

    /* 44x44 â í ëì´ 44 + ìí í¨ë© 8 = 60 */
    .row__thumb {
      flex: 0 0 auto;
      width: 44px;
      height: 44px;
      border-radius: 8px;
      object-fit: cover;
      background: var(--alp-review-card-gray07, #1e293b12);
    }

    .row__body {
      flex: 1 1 auto;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .row__name {
      color: var(--alp-review-text-gray100, #1e293b);
      font-size: 13px;
      font-weight: 500;
      line-height: 1.4;
      letter-spacing: -0.13px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .row__meta {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      line-height: 1.4;
    }
    .row__price {
      color: var(--alp-review-text-gray100, #1e293b);
      font-weight: 700;
      letter-spacing: -0.13px;
    }
    /* ê°ê²©ê³¼ ë³ì  ì¬ì´ êµ¬ë¶ì  â ëª¨ë¬ì "|" */
    .row__divider {
      width: 1px;
      height: 10px;
      background: var(--alp-review-border-gray20, #1e293b33);
    }
    .row__rating {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .row__rate {
      color: var(--alp-review-text-gray100, #1e293b);
      font-weight: 700;
      letter-spacing: -0.13px;
    }
    .row__count {
      color: var(--alp-review-text-gray50, #1e293b80);
      font-weight: 400;
      letter-spacing: -0.13px;
    }

    .row__chevron {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      color: var(--alp-review-text-gray50, #1e293b80);
    }

    /* ë°ì¤í¬í±ì ëª¨ë°ì¼ ì¤ì©, ëª¨ë¬ë§ í­ì ëíë¤(ë°ì¤í¬í± ìí¸/ëª¨ë¬ ë¸ëê° ìì´ 400 ì êµ¬í íë¨ê° â ê·¼ê±°ê° ìê¸°ê¸° ì ê¹ì§ ì ì§).
       body í¬í¸ ë§ì´í¸ë¼ container-type ì¡°ìì´ ìì´ ì»¨íì´ë ì¿¼ë¦¬ ëì  ë¯¸ëì´ ì¿¼ë¦¬ë¥¼ ì´ë¤.
       ê²½ê³ë íìê³¼ ê°ì ë¬¸ìì´ì ë¶ì í´ ë§ì¶ë¤ â min-width: 841px ë¡ ëë©´ 840 < í­ < 841 ìì êµ¬ê°ì´ ì´ë ìª½ìë ì ê±¸ë¦°ë¤. */
    @media not all and (max-width: ${ge(Kt)}) {
      :host([variant="modal"]) .panel {
        max-width: 400px;
      }

      /* ìí¸ì í´ë¦½ ë°ì¤ë¥¼ ë·°í¬í¸ê° ìëë¼ ë¦´ì¤ ë°ì¤ì ë§ì¶ë¤ â ë°ì¤í¬í±ì ë¦´ì¤ê° íë©´ ê°ì´ë°
         9:16 ì¼ë¡ë§ ë  ìì´ì(ì: 1440x900 â 450x800) ë·°í¬í¸ ê¸°ì¤ì¼ë¡ ëë©´ (1) í­ì´ ë¦´ì¤ì ë¬´ê´í
         ë ê° ëê³  (2) í¨ëì´ íë©´ ë§¨ ìëìì ì¶ë°í´ ë¦´ì¤ ìë peek ìì­ì ê°ë¡ì§ë¬ ì¬ë¼ì¨ë¤.
         í´ë¦½ì ë¦´ì¤ì ë§ì¶ë©´ í¨ëì´ ì¹´ë íë¨ ëª¨ìë¦¬ìì ë¹ ì ¸ëì¤ê³  ëëê·¸ë¡ ë´ë¦´ ëë ê·¸ ì ìì ì¬ë¼ì§ë¤.
         í¨ë ìì²´ë í´ë¦½ ê¸°ì¤ left/right/bottom: 0 Â· max-height: 72% ê·¸ëë¡ë¼ ì¶ê° ê³ì°ì´ ìë¤.
         ë¦´ì¤ ê¸°í ë³ìë íì :host ê° ì ì¸íê³  ì»¤ì¤í íë¡í¼í° ììì¼ë¡ ì¬ê¸°ê¹ì§ ë´ë ¤ì¨ë¤.
         í´ë°±(100%)ì´ ê±¸ë¦¬ë©´ ê³ì°ì´ 0 ì´ ëì´ ê¸°ì¡´ ì ì²´í­ ëìì¼ë¡ ìì íê² ëìê°ë¤.
         â ï¸ transform ì¼ë¡ ê°ì´ë° ì ë ¬íì§ ë§ ê² â ëëê·¸ê° ì¸ë¼ì¸ transform: translateY() ë¥¼ ë®ì´ì¨
         X ì ë ¬ì´ ë ìê°ë¤(sns-short-product-sheet.component.ts ì panelStyle). ê·¸ëì left/right ë¡ ë§ì¶ë¤.
         íë¸ë¦¿ ì´íë ë¦´ì¤ê° íë¸ë¦¬ëë¼ ì´ ë¸ë¡ ìì²´ê° ì ê±¸ë¦¬ê³  ì ì²´í­Â·íë©´íë¨ ê¸°ì¤ì´ ê·¸ëë¡ ë§ë¤. */
      :host([variant="sheet"]) .panel-clip {
        left: max(0px, calc((100% - var(--sns-short-reel-width, 100%)) / 2));
        right: max(0px, calc((100% - var(--sns-short-reel-width, 100%)) / 2));
        top: max(0px, calc((100% - var(--sns-short-reel-height, 100%)) / 2));
        bottom: max(0px, calc((100% - var(--sns-short-reel-height, 100%)) / 2));
      }
    }
  `];var Zd=Object.defineProperty,Jd=Object.getOwnPropertyDescriptor,Qd=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Jd(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Zd(t,i,s),s};const Xd="sns-short-product-sheet-close";let ec=class extends ht{constructor(){super(...arguments),this.products=[],this.variant="modal",this.open=!1,this.dragging=!1,this.dragOffset=0,this.dragStartY=null,this.onDimClick=e=>{e.stopPropagation(),this.requestClose()},this.onPanelClick=e=>{e.stopPropagation()},this.onHandleDown=e=>{"sheet"===this.variant&&(this.dragStartY=e.clientY,this.dragging=!0,e.currentTarget.setPointerCapture?.(e.pointerId))},this.onHandleMove=e=>{null!=this.dragStartY&&(this.dragOffset=Math.max(0,e.clientY-this.dragStartY))},this.onHandleUp=e=>{if(null==this.dragStartY)return;e.currentTarget.releasePointerCapture?.(e.pointerId);const t=this.dragOffset;this.resetDrag(),t>80&&this.requestClose()},this.onListWheel=e=>{const t=e.currentTarget;t.scrollHeight<=t.clientHeight||e.deltaY<0&&t.scrollTop<=0||e.deltaY>0&&t.scrollTop+t.clientHeight>=t.scrollHeight-1||e.stopPropagation()}}connectedCallback(){super.connectedCallback(),requestAnimationFrame(()=>{this.open=!0}),this._onKeydown=e=>{"Escape"===e.key&&(e.isComposing||(e.stopPropagation(),this.requestClose()))},window.addEventListener("keydown",this._onKeydown,{capture:!0})}disconnectedCallback(){this._onKeydown&&(window.removeEventListener("keydown",this._onKeydown,{capture:!0}),this._onKeydown=void 0),super.disconnectedCallback()}requestClose(){this.resetDrag(),this.dispatchEvent(new CustomEvent(Xd,{bubbles:!0,composed:!0}))}resetDrag(){this.dragStartY=null,this.dragging=!1,this.dragOffset=0}formatPrice(e){return"number"==typeof e&&Number.isFinite(e)?`${e.toLocaleString()}${si.SHARED.PRODUCT_NAME_PRICE.CURRENCY_WON}`:""}renderRow(e){const t="number"==typeof e.rating&&Number.isFinite(e.rating),i="number"==typeof e.review_count&&Number.isFinite(e.review_count),r=Je`
      ${e.thumbnail_url?Je`<img
            class="row__thumb"
            src=${e.thumbnail_url}
            alt=${e.product_name||"product"}
            loading="lazy"
          />`:Je`<div class="row__thumb"></div>`}
      <div class="row__body">
        <span class="row__name">${e.product_name}</span>
        <div class="row__meta">
          <span class="row__price">${this.formatPrice(e.price)}</span>
          ${t?Je`
                <span class="row__divider"></span>
                <span class="row__rating">
                  <review-star-icon size="12"></review-star-icon>
                  <span class="row__rate">${e.rating.toFixed(1)}</span>
                  ${i?Je`<span class="row__count">(${e.review_count.toLocaleString()})</span>`:Xe}
                </span>
              `:Xe}
        </div>
      </div>
      <span class="row__chevron">
        <review-custom-icon type=${yt} width="16" height="16"></review-custom-icon>
      </span>
    `;return e.product_url?Je`<a
      class="row"
      href=${e.product_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label=${e.product_name?`${e.product_name} ${si.WIDGETS.SNS_SHORT.VIEW_PRODUCT}`:si.WIDGETS.SNS_SHORT.VIEW_PRODUCT}
      >${r}</a
    >`:Je`<div class="row">${r}</div>`}render(){const e=this.products??[];if(0===e.length)return Xe;const t=this.dragOffset?`transform: translateY(${this.dragOffset}px)`:"";return Je`
      <div class="dim" @click=${this.onDimClick}></div>
      <div class="panel-clip">
      <div
        class="panel"
        role="dialog"
        aria-modal="true"
        aria-label=${si.WIDGETS.SNS_SHORT.RELATED_PRODUCTS_TITLE(e.length)}
        style=${t}
        @click=${this.onPanelClick}
      >
        ${"sheet"===this.variant?Je`<div
              class="handle"
              @pointerdown=${this.onHandleDown}
              @pointermove=${this.onHandleMove}
              @pointerup=${this.onHandleUp}
              @pointercancel=${this.onHandleUp}
              aria-hidden="true"
            ></div>`:Xe}
        <p class="title">${si.WIDGETS.SNS_SHORT.RELATED_PRODUCTS_TITLE(e.length)}</p>
        <div class="list" @wheel=${this.onListWheel}>
          ${e.map(e=>this.renderRow(e))}
        </div>
      </div>
      </div>
    `}};ec.styles=Kd,Qd([i({type:Array})],ec.prototype,"products",2),Qd([i({type:String,reflect:!0})],ec.prototype,"variant",2),Qd([i({type:Boolean,reflect:!0})],ec.prototype,"open",2),Qd([i({type:Boolean,reflect:!0})],ec.prototype,"dragging",2),Qd([r()],ec.prototype,"dragOffset",2),ec=Qd([ae(on)],ec);var tc=Object.defineProperty,ic=Object.getOwnPropertyDescriptor,rc=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ic(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&tc(t,i,s),s};const oc={title:"",use_title_visible:!1,title_sub:"",use_title_sub_visible:!1,title_align:"left",sort:Zi,review_sort:!0,review_sort_num:10,review_none:"message",review_minimum:1,review_posting:"product",review_sns:!0,review_social:!0,review_normal:!0,review_ratings_min:1,review_photo:!1,review_video:!1,review_survey:!1,review_quick:!1,paging_type:"none",indicator_type:"bullet",page_max:500,slide_type:"page",swipe:!1,autoplay:!0,autoplay_delay:5,navigation:!0,navigation_out:!1,product_img:!0,product_name:!0,writer:!0,content_title:!0,content_body:!0,related_product:!0,sns_icon:!0};let sc=class extends(wn(ht)){constructor(){super(...arguments),this.previewData={},this.previewOption={},this.previewMeta={},this.widgetCode="",this.widgetSetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs="",this.mediaList=[],this.designOption={...oc},this.isWidgetLoading=!0,this.empty=!1,this.activeIndex=0,this.dataLoaded=!1,this.isLoading=!1,this.autofocusTimer=null,this.visibilityObserver=null,this.isVisible=!0,this.userInteracting=!1,this.keyboardFocusWithin=!1,this.dragStartTranslate=0,this.onFocusIn=e=>{const t=e.composedPath()[0];let i=!1;try{i=!!t?.matches?.(":focus-visible")}catch{}i&&!this.keyboardFocusWithin&&(this.keyboardFocusWithin=!0,this.stopAutofocus())},this.onFocusOut=()=>{this.keyboardFocusWithin&&setTimeout(()=>{if(!this.isConnected||!this.keyboardFocusWithin)return;let e=!1;try{e=this.matches(":focus-within")}catch{}e||(this.keyboardFocusWithin=!1,document.body.querySelector(jd)||document.body.querySelector(on)||this.startAutofocus())},0)},this.onPrev=()=>{this.advanceFocus(-1),this.resetAutofocus()},this.onNext=()=>{this.advanceFocus(1),this.resetAutofocus()},this.onStageClick=e=>{if(this.swiper?.animating)return;const t=e.composedPath().find(e=>"review-sns-short-card"===e?.tagName?.toLowerCase?.());if(!t)return;const i=Number(t.dataset.index),r=Number.isFinite(i)&&i>=0?i:this.activeIndex;r!==this.activeIndex&&(this.activeIndex=r,this.updateActiveCard(),this.swiper?.slideTo?.(r,0)),this.openViewer(r)},this.relatedModalFocus=new Yd,this.onCardRelatedClick=e=>{const t=e.detail?.products??[];if(0===t.length)return;if(document.body.querySelector(on))return;this.relatedModalFocus.capture(this.shadowRoot);const i=d(on,{initialProps:{products:t,variant:"modal"}});this.stopAutofocus(),this.pauseAllCards();const r=()=>Wi.closeByUi(on);i?.addEventListener(Xd,r),Wi.open({key:on,onClose:()=>{i?.removeEventListener(Xd,r),c(on),this.relatedModalFocus.release(this.shadowRoot),this.isVisible&&(this.updateActiveCard(),this.startAutofocus())}})}}get isContentEmpty(){return!this.isWidgetLoading&&!this.errorCode&&0===this.mediaList.length}willUpdate(e){super.willUpdate(e),(e.has("mediaList")||e.has("isWidgetLoading"))&&(this.empty=this.isContentEmpty)}firstUpdated(){const e=this.getBoundingClientRect();w("sns-short/widget","\u2462 \ub9c8\uc6b4\ud2b8 \u2014 \ubdf0\ud3ec\ud2b8 \uc9c4\uc785 \ub300\uae30",{widget_code:this.widgetCode,rect:{w:Math.round(e.width),h:Math.round(e.height),top:Math.round(e.top)},has_layout_box:null!==this.offsetParent,parent_class:this.parentElement?.className??null})}async updated(e){super.updated(e),e.has("isInViewport")&&this.isInViewport&&(w("sns-short/widget","\u2463 \ubdf0\ud3ec\ud2b8 \uc9c4\uc785 \u2014 \ub370\uc774\ud130 \ub85c\ub4dc \uc2dc\uc791",{widget_code:this.widgetCode}),this.swiper||this.isLoading||(this.dataLoaded||await this.load(),await this.updateComplete,0!==this.mediaList.length&&await this.initSwiperFlow()))}connectedCallback(){super.connectedCallback(),this.addEventListener("focusin",this.onFocusIn),this.addEventListener("focusout",this.onFocusOut)}disconnectedCallback(){this.removeEventListener("focusin",this.onFocusIn),this.removeEventListener("focusout",this.onFocusOut),this.keyboardFocusWithin=!1,this.stopAutofocus(),this.visibilityObserver?.disconnect(),this.visibilityObserver=null;try{this.swiper?.destroy?.(!0,!0)}catch{}this.swiper=void 0,super.disconnectedCallback()}async load(){this.isLoading=!0;try{await this.getWidgetOption(),await this.getMediaList(),z(this,this.customCss??""),W(this,this.customJs??"")}catch(e){this.errorCode=F(e?.code)}finally{this.isLoading=!1,this.dataLoaded=!0,this.isWidgetLoading=!1}}async getWidgetOption(){if(window?.ALPHA_PREVIEW&&this.previewOption)this.designOption={...oc,...this.previewOption};else if(this.widgetCode)try{const e=await A(this.widgetCode,window.ALPHA_REVIEW_EMERGENCY?`/widget_option/${this.widgetCode}.json`:void 0);this.designOption={...oc,...e??{}},w("sns-short/widget","\u2464 \uc635\uc158 \ub85c\ub4dc",{widget_code:this.widgetCode,from_api:!!e,review_sort_num:this.designOption.review_sort_num,related_product:this.designOption.related_product,sns_icon:this.designOption.sns_icon})}catch(e){w("sns-short/widget","\u2464 \uc635\uc158 \ub85c\ub4dc \uc2e4\ud328 \u2014 \uae30\ubcf8\uac12 \uc0ac\uc6a9",{widget_code:this.widgetCode,message:e?.message??e+""}),this.designOption={...oc}}else this.designOption={...oc}}async getMediaList(){const e=this.designOption?.review_sort_num??10;if(window?.ALPHA_PREVIEW){const i=(t=this.previewData)?Array.isArray(t)?t.map(Q):Array.isArray(t.list)?t.list.map(Q):[]:[];return this.mediaList=e>0?i.slice(0,e):i,void w("sns-short/widget","\u2465 \ub370\uc774\ud130 \uc801\uc6a9",{source:"preview",count_option:e,list_length:this.mediaList.length})}var t;const i="mobile"===P()?"m":"w",r=await f()??"ALL",o=!!window?.ALPHA_REVIEW_EMERGENCY;this.productNo="PRODUCT_DETAIL"===r?v()||this.productNo:"all";const s=await async function(e,t){if(""===e.widget_code)throw Error("[ALPHA-REVIEW] widget_code\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");return await or.get(t||"/v2/api-widget",{query:e})}({widget_code:this.widgetCode,page:1,page_size:e>0?e:10,product_no:this.productNo||"all",device:i,page_type:r},o?`/widget_data/${this.widgetCode}/products/${this.productNo}/device/${i}.json`:void 0),n=function(e){return(Array.isArray(e?.list)?e.list:[]).reduce((e,t)=>{const i=t?.representative_asset;if(!i||"video"!==i.media_type||!i.origin_url)return e;const r=t.content;var o;return e.push({id:t.id,video_url:I(i.origin_url),thumbnail_url:I(i.thumbnail_url)||null,title:t.title??"",content:r?.content??"",channel:(o=r?.channel,o&&qd.includes(o)?o:Gd.ETC),author:{handle:r?.author?.handle??"",avatar_url:I(r?.author?.avatar_url)},products:(t.related_products??[]).map(Z).filter(e=>!!e)}),e},[])}(s);this.mediaList=e>0?n.slice(0,e):n,w("sns-short/widget","\u2465 \ub370\uc774\ud130 \uc801\uc6a9",{source:o?"emergency-json":"api",count_option:e,raw_length:Array.isArray(s?.list)?s.list.length:0,list_length:this.mediaList.length,with_product:this.mediaList.filter(e=>!!e.products?.length).length})}async initSwiperFlow(){window?.CUSTOM_SWIPER?.swiper||await p(),await this.ensureInit()}async ensureInit(){if(this.swiper)return;if(await this.updateComplete,!this.isConnected||this.swiper)return;const e=this.shadowRoot?.querySelector("#sns-short-"+this.widgetCode);e&&(this.swiper=n({container:e,styleRoot:this.shadowRoot,options:{grabCursor:!0,centeredSlides:!1,slidesPerView:"auto",spaceBetween:36,loop:!1,speed:zd,initialSlide:0,threshold:6,watchSlidesProgress:!0}}),this.syncTrackGap(),this.swiper?.on?.("touchStart",()=>{this.userInteracting=!0,this.dragStartTranslate=this.swiper?.translate??0}),this.swiper?.on?.("touchEnd",()=>{this.userInteracting=!1,this.syncFocusToTrack(),this.resetAutofocus()}),this.swiper?.on?.("resize",()=>{this.syncTrackGap(),this.updateActiveCard(),this.ensureFocusVisible()}),this.updateActiveCard(),this.setupVisibilityObserver(),this.startAutofocus())}startAutofocus(){this.stopAutofocus(),!1!==this.designOption.autoplay&&(this.mediaList.length<=1||this.isVisible&&(this.keyboardFocusWithin||(this.autofocusTimer=window.setInterval(()=>{this.isVisible&&(this.userInteracting||this.advanceFocus(1))},5e3))))}stopAutofocus(){null!=this.autofocusTimer&&(clearInterval(this.autofocusTimer),this.autofocusTimer=null)}resetAutofocus(){this.startAutofocus()}syncTrackGap(){const e=this.swiper,t=e?.el;if(!e||!t)return;const i=Number.parseFloat(getComputedStyle(t).getPropertyValue("--sns-short-gap"));if(Number.isFinite(i)&&i!==e.params?.spaceBetween){e.params.spaceBetween=i;try{e.update()}catch{}}}updateActiveCard(){const e=this.renderRoot?.querySelectorAll("review-sns-short-card"),t=this.mediaList.length;e?.forEach(e=>{const i=Number(e.dataset.index??"-1");e.active=this.isVisible&&i===this.activeIndex;const r=Math.abs(i-this.activeIndex);e.loadMedia=this.isVisible&&i>=0&&(t>0?Math.min(r,t-r):r)<=1})}releaseAllCardMedia(){const e=this.renderRoot?.querySelectorAll("review-sns-short-card");e?.forEach(e=>e.loadMedia=!1)}advanceFocus(e){const t=this.mediaList.length;if(!(t<=0)){this.activeIndex=(this.activeIndex+e+t)%t,this.updateActiveCard();try{this.swiper?.slideTo?.(this.activeIndex,zd)}catch{}}}slideForIndex(e){const t=this.renderRoot?.querySelectorAll("review-sns-short-card"),i=Array.from(t??[]).find(t=>Number(t.dataset.index??"-1")===e);return i?.closest(".swiper-slide")??null}pendingShift(){const e=this.swiper;if(!e)return 0;const t=e.translate??0;if("function"!=typeof e.getTranslate)return 0;const i=e.getTranslate();return Number.isFinite(i)?t-i:0}fitsInTrack(e,t=0){const i=this.swiper?.el;if(!i)return!1;const r=i.getBoundingClientRect(),o=e.getBoundingClientRect();return o.left+t>=r.left-.5&&o.right+t<=r.right+.5}firstFullyVisibleIndex(e=0){const t=this.swiper?.el;if(!t)return-1;const i=t.getBoundingClientRect();let r=-1,o=0;for(const s of Array.from(t.querySelectorAll(".swiper-slide"))){const t=s.querySelector("review-sns-short-card"),n=Number(t?.dataset.index??"-1");if(n<0)continue;if(this.fitsInTrack(s,e))return n;const a=s.getBoundingClientRect(),p=Math.min(a.right+e,i.right)-Math.max(a.left+e,i.left);p>o&&(o=p,r=n)}return r}syncFocusToTrack(){queueMicrotask(()=>{if(this.userInteracting)return;const e=this.swiper;if(!e)return;if(Math.abs((e.translate??0)-this.dragStartTranslate)<1)return;const t=this.firstFullyVisibleIndex(this.pendingShift());t<0||t===this.activeIndex||(this.activeIndex=t,this.updateActiveCard())})}ensureFocusVisible(){const e=this.swiper;if(!e)return;const t=this.slideForIndex(this.activeIndex);if(!t||!this.fitsInTrack(t,this.pendingShift()))try{e.slideTo?.(this.activeIndex,zd)}catch{}}pauseAllCards(){const e=this.renderRoot?.querySelectorAll("review-sns-short-card");e?.forEach(e=>e.active=!1)}setupVisibilityObserver(){this.visibilityObserver||(this.visibilityObserver=new IntersectionObserver(e=>{const t=e[0],i=t.isIntersecting&&t.intersectionRatio>0;i!==this.isVisible&&(this.isVisible=i,i?(this.updateActiveCard(),this.startAutofocus()):(this.stopAutofocus(),this.pauseAllCards()))},{threshold:[0,.2]}),this.visibilityObserver.observe(this))}openViewer(e){document.body.querySelector(jd)||(d(jd,{initialProps:{widgetCode:this.widgetCode||"sns-short",mediaList:this.mediaList,option:this.designOption,index:""+e}}),this.stopAutofocus(),this.pauseAllCards(),this.releaseAllCardMedia(),Wi.open({key:jd,onClose:()=>{c(jd),this.isVisible&&(this.updateActiveCard(),this.startAutofocus())}}))}render(){if(this.isWidgetLoading)return Je`<div class="sns-short-widget-container">
        <review-header-title .designOption=${this.designOption}></review-header-title>
        <review-sns-short-skeleton .count=${3}></review-sns-short-skeleton>
      </div>`;if(this.errorCode)return V(this.errorCode,this.productNo,this.widgetSetCode||this.widgetCode,this.widgetCode);if(this.isContentEmpty)return null;const e=`sns-short-widget-container${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`,t=this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode,i=!1!==this.designOption.navigation&&this.mediaList.length>1,r=!1!==this.designOption.related_product&&this.mediaList.some(e=>(e.products?.length??0)>0);return Je`
      <div class=${e} id=${t}>
        <review-header-title .designOption=${this.designOption}></review-header-title>

        <div class="sns-short-stage">
          <div
            class="swiper-container sns-short-swiper"
            id="sns-short-${this.widgetCode}"
            @click=${this.onStageClick}
            @sns-short-card-related-click=${this.onCardRelatedClick}
          >
            <div class="swiper-wrapper">  
              ${this.mediaList.map((e,t)=>Je`
                  <div class="swiper-slide sns-short-slide">
                    <review-sns-short-card
                      data-index=${t}
                      .media=${e}
                      .option=${this.designOption}
                      .reserveProductSlot=${r}
                    ></review-sns-short-card>
                  </div>
                `)}
            </div>
          </div>

        </div>

        ${i?Je`<div class="sns-short-nav">
              <button class="sns-short-nav__btn" @click=${this.onPrev} aria-label="ì´ì  ë¦¬ë·°">
                <review-custom-icon
                  type=${ft}
                  width="24"
                  height="24"
                  color="var(--alp-review-icon-gray60, #5d6374)"
                ></review-custom-icon>
              </button>
              <button class="sns-short-nav__btn" @click=${this.onNext} aria-label="ë¤ì ë¦¬ë·°">
                <review-custom-icon
                  type=${yt}
                  width="24"
                  height="24"
                  color="var(--alp-review-icon-gray60, #5d6374)"
                ></review-custom-icon>
              </button>
            </div>`:null}
      </div>
    `}};sc.styles=Hd,rc([i({type:Object,attribute:"data-widget-preview-data"})],sc.prototype,"previewData",2),rc([i({type:Object,attribute:"data-widget-preview-option"})],sc.prototype,"previewOption",2),rc([i({type:Object,attribute:"data-widget-preview-meta"})],sc.prototype,"previewMeta",2),rc([i({type:String,attribute:"data-widget-code"})],sc.prototype,"widgetCode",2),rc([i({type:String,attribute:"data-widget-set-code"})],sc.prototype,"widgetSetCode",2),rc([i({type:String,attribute:"data-product-no"})],sc.prototype,"productNo",2),rc([i({type:String,attribute:"data-widget-custom-class"})],sc.prototype,"widgetCustomClass",2),rc([i({type:String,attribute:"data-widget-custom-id"})],sc.prototype,"widgetCustomId",2),rc([i({type:Boolean,attribute:"data-dummy"})],sc.prototype,"isDummy",2),rc([i({type:String,attribute:"data-custom-class"})],sc.prototype,"customClass",2),rc([i({type:String,attribute:"data-custom-id"})],sc.prototype,"customId",2),rc([i({type:String,attribute:"data-custom-css"})],sc.prototype,"customCss",2),rc([i({type:String,attribute:"data-custom-js"})],sc.prototype,"customJs",2),rc([r()],sc.prototype,"mediaList",2),rc([r()],sc.prototype,"designOption",2),rc([r()],sc.prototype,"isWidgetLoading",2),rc([i({type:Boolean,reflect:!0,attribute:"empty"})],sc.prototype,"empty",2),sc=rc([ae("review-sns-short-widget")],sc);const nc=ge("var(--sns-short-active-scale, 1.2)"),ac=ge("var(--sns-short-product-gap, 12px)"),pc=ge("55px"),lc=ge("14px"),dc=[Ni,Di,ue`
    /* :host = í¸ë ì¬ë¡¯(ë¹íì± ì¹´ë í¬ê¸°). í­ì ê³ ì ì´ë¼ í¬ì»¤ì¤ê° ì´ëí´ë Swiper í¸ëì´ íë¤ë¦¬ì§ ìëë¤. */
    :host {
      display: block;
      position: relative;
      width: 100%;
      /* content-box ëªì â ìë padding-bottom(ìí ìë¦¬)ì´ 9:16 ë¯¸ëì´ ë¹ì¨ì íë¨¹ì§ ììì¼ íë¤. */
      box-sizing: content-box;
      aspect-ratio: 9 / 16;
      font-family: var(--alp-common-font-family);
      cursor: pointer;
    }

    /* ìí ë¸ì¶ ììë§ ì¬ë¡¯ì gap+prodInfo ë§í¼ ëë¦°ë¤ â ìµì off ì´ê±°ë ì°ê²° ìíì´ ìì¼ë©´ ì´ ì ì¸ì´ íµì§¸ë¡ ë¹ ì ¸ ë¯¸ëì´ë§ ìë ì¬ë¡¯ì´ ëë¤. */
    :host([product-slot]) {
      padding-bottom: calc(${ac} + ${pc});
    }

    /* íì± ì¹´ëë ì¬ë¡¯ ë°ì¼ë¡ ëì³ ì´ì ì¹´ë ìì ê²¹ì³ ê·¸ë ¤ì§ë¤. */
    :host([active]) {
      z-index: 1;
    }

    /* ì¹´ë(Figma "Short" ì»¬ë¼: ë¯¸ëì´+prodInfo)ë ì¬ë¡¯ ì¤ìì absolute â top: 50% ê° í¨ë© ë°ì¤ ê¸°ì¤ì´ë¼ ìí ìë¦¬(padding-bottom)ê¹ì§ í¬í¨í´ ì»¬ë¼ ì ì²´ê° ì¤ì ì ë ¬ëë¤(Figma List items-center ì ì¼ì¹). */
    .sns-short-card {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${ac};
      transition: width 0.25s ease;
    }

    /* í¬ì»¤ì¤ ì¹´ë: 207 â 248(ë¯¸ëì´Â·prodInfo í­ì´ í¨ê» ëì´ì§ë¤). íë¸ë¦¿ 189 â 217, ëª¨ë°ì¼ 162 â 186 ì ë°°ì¨ ë³ìê° ë°ëë©° ë°ë¼ì¨ë¤. */
    :host([active]) .sns-short-card {
      width: calc(${nc} * 100%);
    }

    /* ë¯¸ëì´ ë°ì¤ â íëë í­ë§ ì£¼ê³  ëì´ë 9:16 ìì íì(368 â 442). */
    .sns-short-card__frame {
      position: relative;
      width: 100%;
      aspect-ratio: 9 / 16;
      border-radius: var(--sns-short-card-radius, 8px);
      overflow: hidden;
      /* ëì²´íë©´ ìµíì¸µ(ë´í¸ë´) â í¬ì¤í°ë ììë ìì ëë§ ë³´ì¸ë¤. ì¤ì¼ë í¤ì© ì°íì(gray07)ì´ë©´ ë¡ë ì¤í¨ê° ë¹ íì ë°ì¤ë¡ ë¨ì ê¹¨ì ¸ ë³´ì´ë¯ë¡ íì ë¡ë© í´ë°±(.sns-short-reel__loading)ê³¼ ê°ì ê°ì ì´ë¤(ëì í í° ìì Â· íë§ ë¬´ê´ ê³ ì ). */
      background-color: #23262f;
      transition: border-radius 0.25s ease;
    }
    :host([active]) .sns-short-card__frame {
      border-radius: var(--sns-short-card-radius-active, 10px);
    }

    .sns-short-card__media,
    .sns-short-card__poster {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      /* í¬ì¤í°Â·ììì´ ê°ì ê°ì´ì´ì¼ ì²« íë ìì´ ì¤ë ìê° ê°ì ìë¦¬ì ì íí ê²¹ì³ ëì²´ëë¤(íìì ë í°ë°ì¤ê° ìì´ contain, ì¹´ëë ìë¼ë´ê³  ì±ì´ë¤). */
      object-fit: cover;
      /* ë ë¤ í¬ëª íì â video ê° ë¶í¬ëªíë©´ ì²« íë ì ì ì ë¤ì í¬ì¤í°ë¥¼ ê°ë¦¬ê³ , poster ê° ë¶í¬ëªíë©´ ë¡ë ì¤í¨ ì ê·¸ ìì´ ë´í¸ë´ì ë®ì´ ë¹ ë°ì¤ê° ëë¤. */
      background-color: transparent;
    }
    .sns-short-card__poster {
      z-index: 1;
      /* ëëê·¸ë¡ ëê¸°ë ë¦¬ì¤í¸ë¼ ì´ë¯¸ì§ì ë¤ì´í°ë¸ ëëê·¸/ì íì ë§ëë¤(íì __poster ì ëì¼). */
      user-select: none;
      -webkit-user-drag: none;
    }
    .sns-short-card__media {
      z-index: 2;
    }

    /* video ìì ê²¹ì¹ë ì¤ë²ë ì´ 3ì¢ì í©ì± ë ì´ì´ë¥¼ ê³ ì íë¤(ì ê±° ê¸ì§) â ì´ê² ìì¼ë©´ ì¤ë²ë ì´ë ìê¸° ë ì´ì´ ìì´ ë¹ëì¤ ë ì´ì´ì ì¹íë§ ìì´(ì¤ì¸¡: video ìë¦¬ë¨¼í¸ë¥¼ ì§ì°ë©´ ì¤ë²ë ì´ ë ì´ì´ê° 10ê°â0ê°ë¡ ì¬ë¼ì§ë¤), ì¤ìì´íë¡ ì¹´ëê° íë©´ì ëëë¤ë©° ë¹ëì¤ê° ì¬ëì½ëë  ëë§ë¤ ë ì´ì´ê° ë¤ì ëì¶Â·ëì¤í°ëì´ ë°°ì§Â·ìì±ìÂ·ì ëª©ì´ í ë©ì´ë¦¬ë¡ ê¹ë¹¡ì¸ë¤(ë ì´ì´ í¬ê¸°ê° ë°°ì§ê° ìëë¼ ì¹´ë ì ì²´ 204x354 ë¼ í¨ê» ë¬¶ì¸ë¤). íì 16cce44 ì ê°ì ì²ë°©. */
    .sns-short-card__channel,
    .sns-short-card__channel-label,
    .sns-short-card__info {
      will-change: transform;
    }

    /* ì±ë ë°°ì§(ì°ìë¨) â ì¸ì¤íë ìì´ì½ë§(ìí ë°°ê²½ ìì). Figma: ë¹íì± 18 / íì± 20 */
    .sns-short-card__channel {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 4;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      color: var(--alp-review-icon-white90, #ffffffe2);
    }
    :host([active]) .sns-short-card__channel {
      width: 20px;
      height: 20px;
    }
    .sns-short-card__channel-label {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 4;
      padding: 0 6px;
      height: 18px;
      display: inline-flex;
      align-items: center;
      border-radius: 9px;
      background: var(--alp-review-scrim-black40, #00000066);
      color: var(--alp-review-icon-white90, #ffffffe2);
      text-transform: capitalize;
    }

    /* íë¨ ì ë³´ ì¤ë²ë ì´ â pt32/px16/pb16(ë ìí ëì¼), gap 6â8 / TabletÂ·Mobile: pt24/px12/pb12, gap 4â6. ê·¸ë¼ë°ì´ì rgba(26,29,36,.8)â0 */
    .sns-short-card__info {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 4;
      display: flex;
      flex-direction: column;
      gap: var(--sns-short-card-info-gap, 6px);
      padding: var(--sns-short-card-info-pad, 32px 16px 16px);
      background: linear-gradient(
        to top,
        rgba(26, 29, 36, 0.8) 0%,
        rgba(26, 29, 36, 0) 100%
      );
      transition: gap 0.25s ease;
    }
    :host([active]) .sns-short-card__info {
      gap: var(--sns-short-card-info-gap-active, 8px);
    }

    /* ìì±ì í â Figma: gap ë¹íì± 6 / íì± 8, ìë°í ë¹íì± 20 / íì± 24 */
    .sns-short-card__writer {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      transition: gap 0.25s ease;
    }
    :host([active]) .sns-short-card__writer {
      gap: 8px;
    }
    .sns-short-card__avatar {
      flex: 0 0 auto;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      object-fit: cover;
      background-color: var(--alp-review-card-gray07, #1e293b12);
      transition: width 0.25s ease, height 0.25s ease;
    }
    :host([active]) .sns-short-card__avatar {
      width: 24px;
      height: 24px;
    }

    /* íì´í¬ë íì± ì íì ì¤ì¼ì¼ì ë¤ì ë¨ê³ë¡ ì í(ê· ì¼ ë°°ì¨ ìë) â Desktop í¸ë¤ 12/1.4â14/1.5, ì ëª© 14/1.4â16/1.3 / TabletÂ·Mobile í¸ë¤ 11â13, ì ëª© 13â14(ëª¨ë 1.4).
       ìê°ì ì  êµ¬ê°ì´ ì íí í¸ë¤ -0.01em Â· ì ëª© -0.02em(ë¹íì± íë¸ë¦¿Â·ëª¨ë°ì¼ë§ -0.01em)ì´ë¼ px ëì  em ì¼ë¡ ë¬ í°í¸ í¬ê¸°ì ìëì¼ë¡ ë°ë¼ê°ê² íë¤(ê³ì°ê°ì ê¸°ì¡´ px ì ëì¼). */
    .sns-short-card__handle {
      min-width: 0;
      font-size: var(--sns-short-card-handle-size, 12px);
      font-weight: 400;
      line-height: 1.4;
      letter-spacing: -0.01em;
      color: var(--alp-review-icon-white90, #ffffffe2);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: font-size 0.25s ease;
    }
    :host([active]) .sns-short-card__handle {
      font-size: var(--sns-short-card-handle-size-active, 14px);
      line-height: var(--sns-short-card-handle-lh-active, 1.5);
    }
    .sns-short-card__title {
      font-size: var(--sns-short-card-title-size, 14px);
      font-weight: 600;
      line-height: 1.4;
      letter-spacing: var(--sns-short-card-title-ls, -0.02em);
      color: var(--alp-review-icon-white90, #ffffffe2);
      display: -webkit-box;
      -webkit-line-clamp: ${ge(3)};
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
      transition: font-size 0.25s ease;
    }
    :host([active]) .sns-short-card__title {
      font-size: var(--sns-short-card-title-size-active, 16px);
      line-height: var(--sns-short-card-title-lh-active, 1.3);
      letter-spacing: -0.02em;
    }

    /* ìí ì ë³´(Figma 19266-91890 prodInfo) â ì í/ë¹ì í ì¤íì´ ê°ì :host([active]) ë¶ê¸°ê° ìë¤(í­ë§ ë°ë¼ ëì´ì§ë¤). ëì´ë í­ì ê³ ì  â ìí ë¯¸ì°ê²° ë¦´ì¤ë ìë¦¬ë ë¨ì ì´ìê³¼ ì¸ë¡ ì ë ¬ì´ ì´ê¸ëì§ ìëë¤. */
    .sns-short-card__product {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      width: 100%;
      height: ${pc};
      overflow: hidden;
    }
    /* ë¨ì¼ ìí ë§í¬ â ìì ìì´ ì¹´ëì í° ê¸ì¨ë¼ ë³¸ë¬¸ ìì¼ë¡ ëëë¦¬ê³ , í¸ë ëëê·¸ ì¤ ìµì»¤ì ë¤ì´í°ë¸ ë§í¬ ëê¸°ë¥¼ ë§ëë¤. */
    .sns-short-card__product--link {
      color: var(--alp-review-text-gray100, #1e293b);
      text-decoration: none;
      cursor: pointer;
      -webkit-user-drag: none;
    }
    /* ë¦¬ìì outline:none ì ëëë¦°ë¤(í¤ë³´ë í¬ì»¤ì¤ ë§ ì ì§). */
    .sns-short-card__product--link:focus-visible,
    .sns-short-card__product--stack:focus-visible {
      outline: 2px solid var(--alp-review-text-gray100, #1e293b);
      outline-offset: 2px;
    }

    /* ââ ì°ê´ ìí 2ê±´ ì´ì: ê²¹ì¹ ì¸ë¤ì¼ + "Nê° ë³´ê¸°" ââ */
    /* ë¨ì¼ ìíê³¼ ê°ì ì¬ë¡¯ ëì´ë¥¼ ì°ë ì¸ë¡ ì¤ì ì ë ¬ì´ë¼ align-items ë§ ë®ì´ì´ë¤. */
    .sns-short-card__product--stack {
      align-items: center;
      gap: 10px;
      background: none;
      border: 0;
      padding: 0;
      cursor: pointer;
      text-align: left;
    }
    .sns-short-card__stack {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      /* ì¤ë¥¸ìª½ ì¹´ëê° ì¼ìª½ì ë®ì´ì¼ í´ì ë¤ ììì ìì ë§ì§ì ì¤ë¤. z-index ë ë ëìì ì­ìì¼ë¡ ë£ëë¤. */
      isolation: isolate;
    }
    .sns-short-card__stack-thumb {
      position: relative;
      display: block;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      /* í° ë§ì¼ë¡ ê²¹ì¹ ê²½ê³ë¥¼ ë¶ë¦¬íë¤ â ë§ì´ ìì¼ë©´ ìíì»·ë¼ë¦¬ ë­ì³ ê°ìê° ì ì½íë¤. */
      border: 2px solid var(--alp-review-bg-white, #fff);
      background-color: var(--alp-review-card-gray07, #1e293b12);
    }
    .sns-short-card__stack-thumb + .sns-short-card__stack-thumb {
      margin-left: -${lc};
    }
    .sns-short-card__stack-label {
      flex: 1 1 auto;
      min-width: 0;
      color: var(--alp-review-text-gray100, #1e293b);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* 36px ìí ì¸ë¤ì¼. íëë¦¬ rgba(0,0,0,0.1) ì í° ìíì»· ê²½ê³ì© ì¤ë²ë ì´ë¼ --alp-review-border-* (ë¤í¬ìì í°ì ë°ì )ì ì±ê²©ì´ ë¬ë¼ íëì½ë©. */
    .sns-short-card__product-thumb {
      flex: 0 0 auto;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.1);
      object-fit: cover;
      background-color: var(--alp-review-card-gray07, #1e293b12);
    }
    .sns-short-card__product-text {
      flex: 1 1 auto;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
    }
    .sns-short-card__product-meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }
    .sns-short-card__product-name,
    .sns-short-card__product-price {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.4;
    }
    .sns-short-card__product-name {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: -0.12px;
      color: var(--alp-review-text-gray80, #1e293bcc);
    }
    .sns-short-card__product-price {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: -0.11px;
      color: var(--alp-review-text-gray50, #1e293b80);
    }
    /* ë³ì  í â Figma gap 1px(ë³âì ìâê°ì). ë³ ìì review-star-icon ê¸°ë³¸ê°(ë¸ëë ì»¬ë¬)ì ê·¸ëë¡ ì´ë¤. */
    .sns-short-card__product-rating {
      display: flex;
      align-items: center;
      gap: 1px;
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
      line-height: 1.4;
    }
    .sns-short-card__product-rate {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: -0.12px;
      color: var(--alp-review-text-gray80, #1e293bcc);
    }
    .sns-short-card__product-count {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: -0.12px;
      color: var(--alp-review-text-gray50, #1e293b80);
    }
  `];var cc=Object.defineProperty,hc=Object.getOwnPropertyDescriptor,gc=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?hc(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&cc(t,i,s),s};let uc=class extends ht{constructor(){super(...arguments),this.option={},this.active=!1,this.reserveProductSlot=!1,this.productSlot=!1,this.loadMedia=!0,this.onSingleProductClick=e=>{e.stopPropagation()},this.onRelatedClick=e=>{e.stopPropagation(),e.preventDefault(),this.dispatchEvent(new CustomEvent("sns-short-card-related-click",{detail:{products:this.media?.products??[]},bubbles:!0,composed:!0}))}}get hasProducts(){return!1!==this.option?.related_product&&(this.media?.products?.length??0)>0}get videoEl(){return this.renderRoot?.querySelector("video")??null}willUpdate(e){(e.has("option")||e.has("media")||e.has("reserveProductSlot"))&&(this.productSlot=this.reserveProductSlot||this.hasProducts)}firstUpdated(){const e=this.videoEl;e&&(this._onLoadedMeta=()=>this.paintFirstFrame(),e.addEventListener("loadedmetadata",this._onLoadedMeta),this._onVideoError=()=>{ee(e)&&this.active&&e.play().catch(()=>{})},e.addEventListener("error",this._onVideoError),e.readyState>=1&&this.paintFirstFrame())}updated(e){e.has("active")&&this.syncPlayback(),e.has("loadMedia")&&!this.loadMedia&&this.releaseMedia()}releaseMedia(){const e=this.videoEl;if(e)try{e.pause(),e.removeAttribute("src"),e.load()}catch{}}paintFirstFrame(){const e=this.videoEl;if(e&&!this.active&&!this.media?.thumbnail_url)try{e.paused&&(e.currentTime=.05)}catch{}}syncPlayback(){const e=this.videoEl;if(e)if(this.active)e.muted=!0,e.play().catch(()=>{});else try{e.pause(),e.currentTime=.05}catch{}}disconnectedCallback(){try{this.videoEl?.pause(),this._onLoadedMeta&&this.videoEl?.removeEventListener("loadedmetadata",this._onLoadedMeta),this._onVideoError&&this.videoEl?.removeEventListener("error",this._onVideoError)}catch{}this._onLoadedMeta=void 0,this._onVideoError=void 0,super.disconnectedCallback()}renderChannelBadge(){if(!1===this.option.sns_icon)return null;const e=this.media?.channel;if(e===Gd.INSTAGRAM){const e=this.active?"20":"18";return Je`<span class="sns-short-card__channel">
        <review-custom-icon
          type=${vt}
          width=${e}
          height=${e}
          color="var(--alp-review-icon-white90, #ffffffe2)"
        ></review-custom-icon>
      </span>`}return Je`<span class="sns-short-card__channel-label alp-caption10 alp-semi-bold"
      >${e??Gd.ETC}</span
    >`}renderProductStack(e){const t=e.slice(0,3);return Je`
      <button
        class="sns-short-card__product sns-short-card__product--stack"
        type="button"
        @click=${this.onRelatedClick}
        aria-label=${si.WIDGETS.SNS_SHORT.RELATED_PRODUCTS_VIEW(e.length)}
      >
        <span class="sns-short-card__stack">
          ${t.map((e,i)=>e.thumbnail_url?Je`<img
                  class="sns-short-card__stack-thumb"
                  style=${"z-index: "+(t.length-i)}
                  src=${e.thumbnail_url}
                  alt=""
                  loading="lazy"
                />`:Je`<span
                  class="sns-short-card__stack-thumb"
                  style=${"z-index: "+(t.length-i)}
                ></span>`)}
        </span>
        <span class="sns-short-card__stack-label alp-body13 alp-medium"
          >${si.WIDGETS.SNS_SHORT.RELATED_PRODUCTS_VIEW(e.length)}</span
        >
      </button>
    `}renderProduct(){const e=this.media?.products??[];if(e.length>1)return this.renderProductStack(e);const t=e[0];if(!t)return null;const i="number"==typeof t.rating&&Number.isFinite(t.rating),r="number"==typeof t.review_count&&Number.isFinite(t.review_count),o=Je`
        ${t.thumbnail_url?Je`<img
              class="sns-short-card__product-thumb"
              src=${t.thumbnail_url}
              alt=${t.product_name||"product"}
              loading="lazy"
            />`:Je`<div class="sns-short-card__product-thumb"></div>`}
        <div class="sns-short-card__product-text">
          <div class="sns-short-card__product-meta">
            <p class="sns-short-card__product-name">${t.product_name}</p>
            <p class="sns-short-card__product-price">
              ${t.price?.toLocaleString()}${si.SHARED.PRODUCT_NAME_PRICE.CURRENCY_WON}
            </p>
          </div>
          ${i?Je`<div class="sns-short-card__product-rating">
                <review-star-icon size="14"></review-star-icon>
                <span class="sns-short-card__product-rate">${t.rating.toFixed(1)}</span>
                ${r?Je`<span class="sns-short-card__product-count"
                      >(${t.review_count.toLocaleString()})</span
                    >`:null}
              </div>`:null}
        </div>
    `;return t.product_url?Je`<a
      class="sns-short-card__product sns-short-card__product--link"
      href=${t.product_url}
      target="_blank"
      rel="noopener noreferrer"
      @click=${this.onSingleProductClick}
      aria-label=${t.product_name?`${t.product_name} ${si.WIDGETS.SNS_SHORT.VIEW_PRODUCT}`:si.WIDGETS.SNS_SHORT.VIEW_PRODUCT}
      >${o}</a
    >`:Je`<div class="sns-short-card__product" @click=${this.onSingleProductClick}>
        ${o}
      </div>`}render(){const e=this.media;if(!e)return null;const t=!1!==this.option.writer,i=e.author?.handle?e.author.handle.startsWith("@")?e.author.handle:"@"+e.author.handle:"";return Je`
      <div class="sns-short-card">
        <div class="sns-short-card__frame">
          ${e.thumbnail_url?Je`<img
                class="sns-short-card__poster"
                src=${e.thumbnail_url}
                alt=""
                aria-hidden="true"
                draggable="false"
                decoding="async"
              />`:null}
          <video
            class="sns-short-card__media"
            crossorigin="anonymous"
            src=${this.loadMedia?e.video_url:Xe}
            poster=${e.thumbnail_url||Xe}
            aria-label=${i?i+" SNS short video":"SNS short video"}
            muted
            loop
            playsinline
            webkit-playsinline
            preload=${this.active?"auto":"metadata"}
            disableremoteplayback
          ></video>

          ${this.renderChannelBadge()}

          <div class="sns-short-card__info">
            ${t&&(i||e.author?.avatar_url)?Je`<div class="sns-short-card__writer">
                  ${e.author?.avatar_url?Je`<img
                        class="sns-short-card__avatar"
                        src=${e.author.avatar_url}
                        alt=${i?i+" avatar":"author avatar"}
                        loading="lazy"
                      />`:null}
                  <span class="sns-short-card__handle">${i}</span>
                </div>`:null}
            ${!1!==this.option.content_title&&J(e)?Je`<p class="sns-short-card__title">${J(e)}</p>`:null}
          </div>
        </div>

        ${this.productSlot?this.hasProducts?this.renderProduct():Je`<div class="sns-short-card__product" aria-hidden="true"></div>`:null}
      </div>
    `}};uc.styles=dc,gc([i({type:Object})],uc.prototype,"media",2),gc([i({type:Object})],uc.prototype,"option",2),gc([i({type:Boolean,reflect:!0})],uc.prototype,"active",2),gc([i({type:Boolean,attribute:!1})],uc.prototype,"reserveProductSlot",2),gc([i({type:Boolean,reflect:!0,attribute:"product-slot"})],uc.prototype,"productSlot",2),gc([i({type:Boolean,attribute:!1})],uc.prototype,"loadMedia",2),uc=gc([ae("review-sns-short-card")],uc);const wc=[Ni,Di,ue`
    :host {
      position: fixed !important;
      inset: 0;
      z-index: 100000;
      font-family: var(--alp-common-font-family);
      /* ë¤(Figma 19201-236395) â ìê²ì ì´ ìëë¼ ë¦´ì¤ ì¬ì´ ê°ê²©ì¼ë¡ ë¤ íì´ì§ê° ë¹ì³ ë³´ì´ë ê² ìë. --alp-review-scrim-* ì ì ë¶ ìê²ì ì´ë¼ ëì í í°ì´ ìì´ íëì½ë©. */
      background-color: rgba(26, 29, 36, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;

      /* ë°ì¤í¬í±(841px~) ë¦´ì¤ ë°ì¤ â ëì´ë¥¼ ë¨¼ì  í´ë¨ííê³  í­ì 9:16 ì¼ë¡ íììí¨ë¤(ë°ëë¡ íë©´ í° ëª¨ëí°ìì ì¢ì°ê° ìë ¸ë¤). ë¨ë ììë 60px(peek 36 + gap 24)ë¡ ìë¤ ë¦´ì¤ê° ë³´ì¸ë¤. íë¸ë¦¿ ì´íë ìë ë¯¸ëì´ì¿¼ë¦¬ê° ëëë¦¬ë¯ë¡ ì´ ë³ìë¥¼ ì ì´ë¤. */
      --sns-short-reel-height: min(
        calc(960 / 1080 * 100vh),
        calc((100vw - 32px) * 16 / 9)
      );
      --sns-short-reel-width: calc(var(--sns-short-reel-height) * 9 / 16);
    }

    .sns-short-popup {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    /* ì¤ë²ë ì´ ë²í¼ â ë«ê¸°ë íë©´ ì°ìë¨, ìëì ë¦´ì¤ ì¢ìë¨. ë°°ê²½ rgba(0,0,0,0.2) / rgba(66,71,86,0.8) ì ëì í í°ì´ ìì´ íëì½ë©. íë¸ë¦¿ ì´íë ìë ë¯¸ëì´ì¿¼ë¦¬ê° ë®ëë¤. */
    .sns-short-popup__close,
    .sns-short-reel__volume {
      position: absolute;
      /* ë¦´ì¤ ìììë íë¨ ì ë³´ ì¤ë²ë ì´(z-index 5)ë³´ë¤ ìì ìì¼ íë¤. */
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;
    }
    /* Figma 19201-236399: íë©´ ì°ìë¨ 48x48, top/right 24, ë¤ë³´ë¤ ìì rgba(0,0,0,0.2) */
    .sns-short-popup__close {
      top: 24px;
      right: 24px;
      width: 48px;
      height: 48px;
      background: rgba(0, 0, 0, 0.2);
    }
    /* Figma 19369-15407 â ë¦´ì¤(position: relative) ìì ë¶ì´ top/left ê° ê³§ ë¦´ì¤ ë´ë¶ ì¢í(íë©´ ìë). ì¤íì 24 > radius 16 ì´ë¼ ëª¨ìë¦¬ì ì ìë¦°ë¤. Figma ììì ë«ê¸° ìëìì¼ë ìì²­ì¼ë¡ ì¢ìë¨. */
    .sns-short-reel__volume {
      top: 24px;
      left: 24px;
      width: 44px;
      height: 44px;
      background: rgba(66, 71, 86, 0.8);
    }
    /* ìì´ì½ì width/height="100%" ë¡ ëê¸°ê³  í¬ê¸°ë CSS ë¡ ì ì´ â ë¸ë ì´í¬í¬ì¸í¸ë³ ì¶ì ëë¬¸. */
    .sns-short-popup__close review-custom-icon,
    .sns-short-reel__volume review-custom-icon {
      width: 24px;
      height: 24px;
    }

    .sns-short-popup__swiper {
      position: relative;
      width: 100%;
      /* ë¦´ì¤ì ê°ì í­ â ë´ë¶ í´ë¦­ì stopPropagation íë¯ë¡ ë¦´ì¤ë³´ë¤ ëì¼ë©´ ê·¸ ì¬ë°±(ë¤)ì ëë¬ë ì ë«íë ì¬ê°ì§ëê° ëë¤. */
      max-width: var(--sns-short-reel-width);
      height: 100%;
      overflow: hidden;
      touch-action: pan-y;
      overscroll-behavior: none;
      user-select: none;
    }

    .swiper-wrapper {
      flex-direction: column;
      /* Swiper ë íì´ë° í¨ìë¥¼ ì ì¸íì§ ìì ê¸°ë³¸ ease ë¡ ëì°©ì´ ë¦ê² ë³´ì¸ë¤(280msâ181ms). ì í ê¸¸ì´ë í  ì¿¨ë¤ì´(!animating)ì ê²¸íë¯ë¡ ì¤ì´ì§ ë§ê³  ì»¤ë¸ë§ ë°ê¾¼ë¤. */
      transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }

    .swiper-slide {
      /* ë¦´ì¤ 1ê°ì ëì´(= ì¸ë¡ ì¤ë ê°ê²©). í­ ì ì½ê¹ì§ ë°ìë ê°ì´ë¼ 9:16 ì´ ê¹¨ì§ì§ ìëë¤. */
      height: var(--sns-short-reel-height);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: visible;
    }

    .sns-short-reel {
      position: relative;
      /* í­ ë¯¸ì§ì  â ëì´ìì aspect-ratio ë¡ íìë¼ì¼ 9:16 ì´ ì ì§ëë¤(max-width: 100% ë¥¼ ì£¼ë©´ í­ë§ ìë ¤ ë¹ì¨ì´ ê¹¨ì§ë¤). */
      height: 100%;
      aspect-ratio: 9 / 16;
      /* Figma: media rounded 16px */
      border-radius: 16px;
      overflow: hidden;
      /* ìì ë í°ë°ì¤(ë¹ ìì­) ì±ì â íë§ ë¬´ê´ ë¶í¬ëª ê²ì (ì ì© í í° ìì) */
      background: #000;
    }

    /* ë¡ë© í´ë°± â ì²« ë°©ë¬¸ì´ë¼ ìº¡ì²ë ì¸ë¤ì¼ë ìì ëë§ ë¬ë¤(ìê²ì  ë¸ì¶ ë°©ì§). ì ëë©ì´ì ìì: shimmer ë í©ì± ë¹ì©ì´ ìì´ ë³ë íë¨ ëì. ëì í í°ì´ ìì´ ë¤ê³¼ ê°ì ê³ì´ë¡ íëì½ë©. */
    .sns-short-reel__loading {
      position: absolute;
      inset: 0;
      background: #23262f;
      opacity: 0;
    }
    .sns-short-reel__loading.is-visible {
      opacity: 1;
    }

    /* ì²« íë ì ìº¡ì² â video ì ê°ì contain ë°ì¤ë¼ íì í ì¬ë°©ë¬¸ ì ê°ì ìë¦¬ì ì ì§íë©´ì¼ë¡ ë¨ëë¤. */
    .sns-short-reel__frame {
      position: absolute;
      inset: 0;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }

    /* ëì²´íë©´ â video ë¤ì ê¹ë ¤ ì²« íë ì ì ê¹ì§ ë³´ì¸ë¤. video ì ê°ì ë°ì¤Â·object-fit ì´ë¼ íë ìì´ ì¤ë©´ ê°ì ìë¦¬ì ê²¹ì³ ëì²´ëê³ , ë í°ë°ì¤ë .sns-short-reel ì ê²ì ì´ ë¹ì¹ë¤. */
    .sns-short-reel__poster {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      user-select: none;
      -webkit-user-drag: none;
    }

    .sns-short-reel video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      /* cover ë íë ìê³¼ ìì ë¹ì¨ì´ ë¤ë¥´ë©´ ë°ëì ìë¼ë´ë¯ë¡ contain â ë¨ë ìì­ì .sns-short-reel ì ê²ì  ë í°ë°ì¤. */
      object-fit: contain;
      /* í¬ëª íì â #000 ì´ë©´ íë ìì´ ì¤ê¸° ì  video ë°ì¤ê° ë¤ì ê¹ ëì²´íë©´ì ê°ë¦°ë¤. ë í°ë°ì¤ ê²ì ì .sns-short-reel ë´ë¹ì´ë¼ ìê° ê²°ê³¼ë ëì¼. */
      background: transparent;
    }

    /* ì¼ìì ì§ íì(ì¤ì ì¬ì ë²í¼)  */
    .sns-short-reel__paused {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: rgba(26, 29, 36, 0.4);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
    .sns-short-reel__paused review-custom-icon {
      width: 56%;
      height: 56%;
    }

    /* ìë¤ ë¦´ì¤ë ë¤íì§ ìëë¤(Figma 19201-236393) â ë¤ì ë§ìì°ë©´ ë¦´ì¤ì ê·¸ ì¬ì´ ê°ê²©(ë¤ì´ ë¹ì³ ë³´ì)ì´ êµ¬ë¶ëì§ ìëë¤. */

    /* video ìì ê²¹ì¹ë ì¤ë²ë ì´ 2ì¢ì í©ì± ë ì´ì´ë¥¼ ê³ ì íë¤(ì ê±° ê¸ì§) â ì¹ê²©ì´ ë¹ëì¤ ë ì´ì´ì ì¢ìëë©´ ë¹ëì¤ê° ì²« íë ìì ì»ê±°ë ì¸ì  ë¦´ì¤ê° load() ë  ëë§ë¤ ì ë ì´ì´ë¡ ë¶ë¦¬Â·ì¬ëì¤í°ëë¤(ëª¨ë°ì¼ ì¤ì¸¡ 20ì í ì¤ ì¬íì¸í¸ ë¶íì 5ê±´ â 10ê±´, ì¤ìê° 13ms â 4ms). */
    .sns-short-reel__volume,
    .sns-short-reel__info {
      will-change: transform;
    }

    /* íë¨ ì ë³´ ì¤ë²ë ì´ â Figma: pt40/px24/pb24, gap12, ê·¸ë¼ë°ì´ì #1a1d24 0.8â0 */
    .sns-short-reel__info {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      padding: 40px 24px 24px;
      background: linear-gradient(
        to top,
        rgba(26, 29, 36, 0.8) 0%,
        rgba(26, 29, 36, 0) 100%
      );
      /* í¼ì¹¨ ìíìì ë´ì©ì´ ìë¬´ë¦¬ ê¸¸ì´ë ì¤ë²ë ì´ê° ë¦´ì¤ë¥¼ ëì§ ìê² â ëì¹ë ë§í¼ì ë´ì© ìì­ì´ ì¤í¬ë¡¤ë¡ í¡ìíë¤. */
      max-height: 100%;
    }
    /* ë´ì©ë§ ì¤ì´ë¤ê³  ìì±ìÂ·ì ëª©Â·ë²í¼Â·ìíì¹´ëë ëë¦¬ì§ ìëë¤(ì max-height ê° ê±¸ë ¸ì ëì ë°°ë¶). */
    .sns-short-reel__info > * {
      flex-shrink: 0;
    }
    .sns-short-reel__info > .sns-short-reel__content {
      flex-shrink: 1;
    }

    /* ìì±ì â ìë°í 32px + í¸ë¤ 16px Regular white */
    .sns-short-reel__writer {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      min-width: 0;
    }
    .sns-short-reel__avatar {
      flex: 0 0 auto;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      background: var(--alp-review-card-gray07, #1e293b12);
    }
    .sns-short-reel__handle {
      flex: 1 1 auto;
      min-width: 0;
      color: var(--alp-review-text-white100, #ffffff);
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      letter-spacing: -0.16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* ì ëª© ì¬ë¡¯ â ëì´ ìì½ ìì´ ì¤ ìë§í¼ë§ ì°¨ì§íë¤. 2ì¤ ìë¦¬ë¥¼ ë¯¸ë¦¬ ì¡ì¼ë©´ 1ì¤ ì ëª©ì¼ ë ë¨ë 26px ì´ ìì±ì íê³¼ì ë¹ì¹¸ì¼ë¡ ë³´ì¸ë¤. ëì  ë¦´ì¤ë§ë¤ ìì±ì í y ê° í ì¤(26px)ì© ë¬ë¼ì§ëë° ìëë ëìì´ë¤. */
    .sns-short-reel__title {
      display: flex;
      width: 100%;
    }
    /* ì ëª© íì¤í¸ â Figma headline/head-lg: 20px SemiBold, leading 1.3, tracking -0.4. ì íÂ·í¼ì¹¨ ë¬´ê´íê² í­ì 2ì¤ í´ë¨í(í¼ì³ë ëì´ëì§ ìëë¤). */
    .sns-short-reel__title-text {
      width: 100%;
      /* ìì ìì ì¹íë í° ê¸ì¨ ê³ ì ê° â --alp-review-text-white ë ë¤í¬ëª¨ëìì #000 ì¼ë¡ ë¤ì§í ì¬ê¸°ì ëª» ì´ë¤(ëì í í° ìì). */
      color: #ffffff;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.3;
      letter-spacing: -0.4px;
      display: -webkit-box;
      -webkit-line-clamp: ${ge(3)};
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-break: break-word;
    }

    /* ë´ì© â body/body-md-reading(16px Regular, leading 1.7, tracking -0.16). í¼ì¹¨ ìíììë§ ë ëëê³  í´ë¨í ìì´ ì ë¬¸ì´ ëì¨ë¤. */
    .sns-short-reel__content {
      width: 100%;
      /* ì ëª©ê³¼ ê°ì ì´ì ë¡ íëì½ë©(color/text/inverse-primary = #fff). */
      color: #ffffff;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.7;
      letter-spacing: -0.16px;
      white-space: pre-wrap;
      word-break: break-word;
      /* ë´ì©ì´ ë¦´ì¤ë³´ë¤ ê¸¸ë©´ ì¤ë²ë ì´ê° ìëë¼ ì´ ìì­ë§ ì¤í¬ë¡¤íë¤(info ì max-height ì í ì¸í¸). */
      overflow-y: auto;
      overscroll-behavior: contain;
      min-height: 0;
    }

    /* ëë³´ê¸° â 16px Medium, inverse-secondary(#d6d7db) + chevron-down(20px) */
    .sns-short-reel__more {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 0;
      background: transparent;
      border: 0;
      cursor: pointer;
      color: #d6d7db;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.5;
      letter-spacing: -0.16px;
    }
    /* ë¹íì± ë¦´ì¤: ìë¦¬ë ì°¨ì§íê³  ë³´ì´ì§ë§ ìê² â íì±í ìê°ì 36px ì í(layout shift) ë°©ì§. */
    .sns-short-reel__more.is-hidden {
      visibility: hidden;
      pointer-events: none;
    }
    .sns-short-reel__more-icon {
      display: inline-flex;
      align-items: center;
      /* ìì´ì½ì width/height="100%" ë¡ ëì´ì¤ë¯ë¡ í¬ê¸°ë ì¬ê¸°ì ì¡ëë¤(íë¸ë¦¿ ì´í 16 ì¼ë¡ ì¶ì). */
      width: 20px;
      height: 20px;
      transition: transform 0.2s ease;
    }
    .sns-short-reel__more.is-open .sns-short-reel__more-icon {
      transform: rotate(180deg);
    }

    /* ìí ì¹´ë â Figma: white rounded 8, h72, ì¸ë¤ì¼ 56 + ìíëª/ê°ê²© */
    .sns-short-reel__product {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
      height: 72px;
      overflow: hidden;
      border-radius: 8px;
      background: var(--alp-review-bg-white, #fff);
    }
    /* ì°ê´ ìí 2ê±´ ì´ì: ì²« ìí ë§í¬ ìì­. ëë³´ê¸° ë²í¼ê³¼ ëëí ëì´ë¯ë¡ ë´ë¶ìì ë¤ì flex ë¡ ì¸ë¤ì¼+ì ë³´ë¥¼ ì¡ëë¤. */
    .sns-short-reel__product-link {
      flex: 1 1 auto;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 8px;
      height: 100%;
      color: var(--alp-review-text-gray100, #1e293b);
      text-decoration: none;
      cursor: pointer;
      -webkit-user-drag: none;
    }
    .sns-short-reel__product-link:focus-visible {
      outline: 2px solid var(--alp-review-text-gray100, #1e293b);
      outline-offset: -2px;
    }

    /* "N / ëë³´ê¸°" â ê°ê²© ìì­ê³¼ ì¸ë¡ êµ¬ë¶ì ì¼ë¡ ëë ì°ì¸¡ ë¸ë¡. */
    .sns-short-reel__product-more {
      flex: 0 0 auto;
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      padding: 0 16px;
      border: 0;
      border-left: 1px solid var(--alp-review-border-gray20, #1e293b33);
      background: none;
      cursor: pointer;
    }
    .sns-short-reel__product-more:focus-visible {
      outline: 2px solid var(--alp-review-text-gray100, #1e293b);
      outline-offset: -2px;
    }
    .sns-short-reel__product-more-count {
      color: var(--alp-review-text-gray100, #1e293b);
      font-size: 14px;
      font-weight: 700;
      line-height: 1.4;
      letter-spacing: -0.14px;
    }
    .sns-short-reel__product-more-label {
      color: var(--alp-review-text-gray50, #1e293b80);
      font-size: 11px;
      font-weight: 400;
      line-height: 1.4;
      letter-spacing: -0.11px;
    }

    .sns-short-reel__product-thumb {
      flex: 0 0 auto;
      width: 56px;
      height: 56px;
      margin-left: 8px;
      border-radius: 4px;
      object-fit: cover;
      background: var(--alp-review-card-gray07, #1e293b12);
    }
    .sns-short-reel__product-info {
      flex: 1 1 auto;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2px;
      padding-right: 12px;
    }
    .sns-short-reel__product-name {
      color: var(--alp-review-text-gray80, #424756);
      font-size: 14px;
      font-weight: 400;
      line-height: 1.5;
      letter-spacing: -0.14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .sns-short-reel__product-price {
      color: var(--alp-review-text-gray100, #2a2d38);
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5;
      letter-spacing: -0.16px;
    }

    /* íë¸ë¦¿ ì´í(~840px) íë¸ë¦¬ë â íë ì = íë©´, radius 0(Figma 19201-236697 / 19201-236991). :host ì 9:16 ë³ìë¥¼ ëëë¦¬ë ì¤ë²ë¼ì´ëë¼ ì§ì°ë©´ ì ëê³ , swiper í­ë 100% ì¬ì¼ ë¤ ì¬ê°ì§ëê° ì ìê¸´ë¤. */
    @media (max-width: ${ge(Kt)}) {
      .sns-short-popup__swiper {
        max-width: 100%;
      }
      /* ë¦´ì¤ ì¬ì´ ê°ê²©ë 0 â íë¸ë¦¬ëë¼ ê°ê²©ì´ ì¤ìì´í ì¤ ë¤ ë ë¡ë§ ë³´ì¸ë¤. Swiper ìµì(spaceBetween)ì´ë¼ component ê° ê°ì ì¿¼ë¦¬ë¡ ë¶ê¸°íë¤. */
      .swiper-slide {
        height: 100%;
      }
      .sns-short-reel {
        width: 100%;
        /* í­Â·ëì´ê° ëª¨ë íì ëë¯ë¡ 9:16 ê³ ì ì í´ì (íë ì = íë©´). */
        aspect-ratio: auto;
        border-radius: 0;
      }
      /* Figma Tablet: pt40 / px20 / pb24, gap10 */
      .sns-short-reel__info {
        gap: 10px;
        padding: 40px 20px 24px;
      }
      /* 44x44, íë©´ ê°ì¥ìë¦¬ìì 20. ììì ë ë¤ ì°ìë¨ ì¸ë¡ ì¤íì´ìì¼ë ìëì ì¢ìë¨ì¼ë¡ ì®ê²¼ë¤ â ì¢ì°ë¡ ê°ë¼ì ¸ ê²¹ì¹ì§ ìì¼ë¯ë¡ top ì ë ë¤ ê°ë¤. */
      .sns-short-popup__close {
        top: 20px;
        right: 20px;
        width: 44px;
        height: 44px;
        background: rgba(66, 71, 86, 0.8);
      }
      .sns-short-reel__volume {
        top: 20px;
        left: 20px;
      }

      /* ââ íì´í¬Â·ìíì¹´ë ââ ë°ì¤í¬í± ê°ì´ ê·¸ëë¡ ë´ë ¤ì ìë êµ¬ê°ì´ë¤. */
      /* ìì±ì â ìë°í 32 â 24, í¸ë¤ body-sm-m 14/1.5 */
      .sns-short-reel__avatar {
        width: 24px;
        height: 24px;
      }
      .sns-short-reel__handle {
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.14px;
      }
      /* ì ëª© headline/head-md 18/1.3 (ë°ì¤í¬í± head-lg 20) */
      .sns-short-reel__title-text {
        font-size: 18px;
        letter-spacing: -0.36px;
      }
      /* ë´ì© body-sm-r 14/1.5 (ë°ì¤í¬í± body-md-reading 16/1.7) â ëª¨ë°ì¼ë ê°ì ê°ì´ë¼ ì¬ê¸°ìë§ ì ì¸íë¤. */
      .sns-short-reel__content {
        font-size: 14px;
        line-height: 1.5;
        letter-spacing: -0.14px;
      }
      /* ëë³´ê¸° 14/1.5 + ìì´ì½ 20 â 16 */
      .sns-short-reel__more {
        font-size: 14px;
        letter-spacing: -0.14px;
      }
      .sns-short-reel__more-icon {
        width: 16px;
        height: 16px;
      }
      /* ìí ì¹´ë h72 â h64, ì¸ë¤ì¼ 56 â 48(ì¢ì¸¡ ì¬ë°± 8 ì ëì¼) */
      .sns-short-reel__product {
        height: 64px;
      }
      .sns-short-reel__product-thumb {
        width: 48px;
        height: 48px;
      }
      .sns-short-reel__product-name {
        font-size: 13px;
        line-height: 1.4;
        letter-spacing: -0.13px;
      }
      .sns-short-reel__product-price {
        font-size: 14px;
        letter-spacing: -0.14px;
      }
      /* "N / ëë³´ê¸°" â ë°ì¤í¬í±ë³´ë¤ ì¤íë ¤ í¬ë¤(16 SemiBold / 13 Regular). */
      .sns-short-reel__product-more-count {
        font-size: 16px;
        font-weight: 600;
        line-height: 1.3;
        letter-spacing: -0.32px;
      }
      .sns-short-reel__product-more-label {
        font-size: 13px;
        letter-spacing: -0.13px;
      }
      /* Figma ì ë°ì¤í¬í± Short ë§ ìì´ íì â ë«ê¸° ë²í¼ ì¶ìë¹(48â44)ë¥¼ ì ì©í´ 140 x 44/48 = 128.3 â 128. ì¼ê°íì 57.1% ë¼ í¨ê» ì¤ì´ë ë¤. */
      .sns-short-reel__paused {
        width: 128px;
        height: 128px;
      }
    }

    /* ëª¨ë°ì¼(~440px) â íë ìì íë¸ë¦¿ê³¼ ê°ì íë¸ë¦¬ëê³  ì¤ë²ë ì´ ì¬ë°±Â·ë²í¼ í¬ê¸°ë§ ì¶ì(Figma: pt40/px16/pb24 gap8, ë²í¼ 28, ê°ì¥ìë¦¬ 12). ìëì íë¸ë¦¿ê³¼ ê°ì ì´ì ë¡ ë«ê¸°ì ê°ì top. */
    @media (max-width: ${ge(Zt)}) {
      .sns-short-reel__info {
        gap: 8px;
        padding: 40px 16px 24px;
      }
      /* 28x28, ê°ì¥ìë¦¬ìì 16. ì¸ë¡ ìì¹Â·í¬ê¸°ë ê³µíµ, ì¢ì° ìµì»¤ë§ ê°ë¼ì§ë¤(ë«ê¸° = ì°, ìë = ì¢). */
      .sns-short-popup__close,
      .sns-short-reel__volume {
        top: 16px;
        width: 28px;
        height: 28px;
      }
      .sns-short-popup__close {
        right: 16px;
      }
      .sns-short-reel__volume {
        left: 16px;
      }

      /* ââ íì´í¬Â·ìíì¹´ë ââ íë¸ë¦¿ ë¸ë¡ìì í ë¨ê³ ë ì¤ì´ëë ê²ë§ ì ëë¤(ë´ì©Â·ìë°íÂ·ìì´ì½ í¬ê¸°ë íë¸ë¦¿ê³¼ ê°ì ì¬ì ì¸íì§ ìëë¤). */
      .sns-short-reel__handle {
        font-size: 13px;
        line-height: 1.4;
        letter-spacing: -0.13px;
      }
      .sns-short-reel__title-text {
        font-size: 16px;
        letter-spacing: -0.32px;
      }
      .sns-short-reel__more {
        font-size: 13px;
        line-height: 1.4;
        letter-spacing: -0.13px;
      }
      /* ìí ì¹´ë â Figma ë ëì´ë¥¼ ê³ ì íì§ ìê³  ì¸ë¤ì¼ 44 + ìí 8 ë¡ 60 ì´ ëì¨ë¤. ì¬ê¸°ìë ê¸°ì¡´ êµ¬ì¡°(ê³ ì  ëì´)ë¥¼ ì ì§í´ ê°ì ê°ì ì¤ë¤. */
      .sns-short-reel__product {
        height: 60px;
      }
      .sns-short-reel__product-thumb {
        width: 44px;
        height: 44px;
      }
      .sns-short-reel__product-name {
        font-size: 12px;
        letter-spacing: -0.12px;
      }
      .sns-short-reel__product-price {
        font-size: 13px;
        line-height: 1.4;
        letter-spacing: -0.13px;
      }
      .sns-short-reel__product-more-count {
        font-size: 14px;
        line-height: 1.4;
        letter-spacing: -0.28px;
      }
      .sns-short-reel__product-more-label {
        font-size: 12px;
        letter-spacing: -0.12px;
      }
      .sns-short-popup__close review-custom-icon,
      .sns-short-reel__volume review-custom-icon {
        width: 16px;
        height: 16px;
      }
      /* íë¸ë¦¿ê³¼ ê°ì íì â ì¤ë²ë ì´ ë²í¼ì ëª¨ë°ì¼ ì¶ì ë¹ì¨(ë«ê¸° 48â28)ì ê·¸ëë¡ ì ì©í´ 140 x 28/48 = 81.7 â 80. */
      .sns-short-reel__paused {
        width: 80px;
        height: 80px;
      }
    }
  `];var vc=Object.defineProperty,mc=Object.getOwnPropertyDescriptor,yc=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?mc(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&vc(t,i,s),s};let fc=class extends ht{constructor(){super(...arguments),this.widgetCode="",this.mediaList=[],this.index="0",this.currentIndex=0,this.productSheetIndex=null,this.openIndexes=new Set,this.isMuted=!0,this.isPaused=!1,this.loadTimer=null,this.videoRetryCount=0,this.neighborTimer=null,this.recoveryTimer=null,this.playToken=0,this.moreText=si.WIDGETS.SNS_SHORT.MORE,this.lessText=si.WIDGETS.SNS_SHORT.LESS,this.closeText=si.WIDGETS.SNS_SHORT.CLOSE,this.soundOnText=si.WIDGETS.SNS_SHORT.SOUND_ON,this.soundOffText=si.WIDGETS.SNS_SHORT.SOUND_OFF,this._onReelGapChange=()=>{if(this.swiper&&!this.swiper.destroyed){this.swiper.params.spaceBetween=this.reelGapPx;try{this.swiper.update()}catch{}}},this._blockWheelDefault=e=>{e.preventDefault()},this._blockMediaLoadPropagation=e=>{e.stopPropagation()},this.prefetchAbort=new AbortController,this.prefetchGen=0,this.prefetchedUrls=new Set,this.prefetchBusy=!1,this.prefetchPending=!1,this._onMediaState=e=>{const t=e.target;if(!(t instanceof HTMLVideoElement))return;const i=t.closest(".sns-short-reel");if(!i)return;const r=i.querySelector(".sns-short-reel__loading"),o=i.querySelector(".sns-short-reel__frame");if("emptied"===e.type||"loadstart"===e.type){const e=!!o?.style.backgroundImage||!!i.querySelector(".sns-short-reel__poster");return void r?.classList.toggle("is-visible",!e)}r?.classList.remove("is-visible"),o&&!o.style.backgroundImage&&this.scheduleFrameCapture(t,o)},this.recoveryTick=()=>{if(!this.swiper||this.swiper.animating)return;if(this.isPaused)return;const e=this.renderRoot.querySelector(`.swiper-slide[data-index="${this.activeReelIndex}"]`),t=e?.querySelector("video");t&&t.paused&&(this.lastVideoEl===t?(t.muted=this.isMuted,this.kickPlay(t)):this.startCurrentVideo())},this.onOverlayClick=()=>{this.close()},this.onCloseClick=e=>{e.stopPropagation(),this.close()},this._onEscKeydown=e=>{"Escape"===e.key&&(e.isComposing||null!==this.productSheetIndex||this.shadowRoot?.querySelector(on)||(e.stopPropagation(),this.close()))},this.toggleMore=e=>{e.stopPropagation();const t=Number(e.currentTarget.dataset.index??"-1");if(!Number.isInteger(t)||t<0)return;const i=new Set(this.openIndexes);i.delete(t)||i.add(t),this.openIndexes=i},this._onContentWheel=e=>{const t=e.currentTarget;t.scrollHeight<=t.clientHeight||e.deltaY<0&&t.scrollTop<=0||e.deltaY>0&&t.scrollTop+t.clientHeight>=t.scrollHeight-1||e.stopPropagation()},this.toggleMute=e=>{e.stopPropagation(),this.isMuted=!this.isMuted,this.renderRoot.querySelectorAll("video").forEach(e=>{e.muted=this.isMuted}),this.kickPlay(this.lastVideoEl)},this.togglePause=e=>{if(e.stopPropagation(),this.swiper?.animating)return;if(e.composedPath().some(e=>e?.classList?.contains?.("sns-short-reel__info")))return;const t=e.currentTarget;if(Number(t.dataset.index??"-1")!==this.currentIndex)return;const i=t.querySelector("video");if(i)if(this.isPaused)this.isPaused=!1,this.kickPlay(i),this.startLoadTimeout();else{this.isPaused=!0,this.clearLoadTimeout();try{i.pause()}catch{}}},this.sheetFocus=new Yd,this.openProductSheet=e=>{e.stopPropagation(),e.preventDefault();const t=Number(e.currentTarget.dataset.index??"-1");!Number.isInteger(t)||t<0||(this.sheetFocus.capture(this.shadowRoot),this.productSheetIndex=t)},this.closeProductSheet=()=>{this.productSheetIndex=null,this.sheetFocus.release(this.shadowRoot)}}get activeReelIndex(){const e=this.swiper;return e?.initialized&&"number"==typeof e.realIndex?e.realIndex:this.currentIndex??0}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onEscKeydown,{capture:!0})}async firstUpdated(e){super.firstUpdated(e),this.currentIndex=this.clampIndex(parseInt(this.index??"0",10)),window?.CUSTOM_SWIPER?.swiper||await p(),await(async()=>{await this.updateComplete,this.isConnected&&(this.initializeSwiper(),this.startCurrentVideo(),this.startRecoveryTick())})()}disconnectedCallback(){this.playToken++,window.removeEventListener("keydown",this._onEscKeydown,{capture:!0}),this.removeEventListener("wheel",this._blockWheelDefault),this.shadowRoot?.removeEventListener("load",this._blockMediaLoadPropagation,!0);for(const e of["emptied","loadstart","loadeddata","playing"])this.shadowRoot?.removeEventListener(e,this._onMediaState,!0);this.tabletMql?.removeEventListener("change",this._onReelGapChange),this.tabletMql=void 0,this.abortPrefetch(),this.clearFrameCaptures(),this.clearNeighborPreload(),this.stopRecoveryTick(),this.cleanupVideoHandlers(),this.detachAllPosterSeeks(),this.pauseAllVideos();try{this.swiper?.destroy?.(!0,!0)}catch{}this.swiper=void 0,super.disconnectedCallback()}clampIndex(e){return Number.isFinite(e)?Math.max(0,Math.min(e,Math.max(0,(this.mediaList?.length??1)-1))):0}get reelGapPx(){return this.tabletMql?.matches?0:24}initializeSwiper(){const e=this.clampIndex(parseInt(this.index??"0",10));this.tabletMql=window.matchMedia(`(max-width: ${Kt})`),this.tabletMql.addEventListener("change",this._onReelGapChange);const t=this.shadowRoot.querySelector("#sns-short-popup-"+this.widgetCode);this.swiper=n({container:t,styleRoot:this.shadowRoot,options:{direction:"vertical",slidesPerView:"auto",centeredSlides:!0,spaceBetween:this.reelGapPx,freeMode:{enabled:!1},loop:!1,speed:zd,resistanceRatio:0,threshold:8,longSwipesRatio:.2,touchReleaseOnEdges:!1,initialSlide:e,init:!1,observer:!0,observeParents:!0,mousewheel:{enabled:!0,forceToAxis:!0,releaseOnEdges:!1,sensitivity:1,thresholdDelta:6}},event:{init:t=>{try{t.slideToLoop?.(e,0,!1)}catch{}try{t.slideTo?.(e,0,!1)}catch{}}}}),this.addEventListener("wheel",this._blockWheelDefault,{passive:!1}),this.shadowRoot?.addEventListener("load",this._blockMediaLoadPropagation,!0);for(const e of["emptied","loadstart","loadeddata","playing"])this.shadowRoot?.addEventListener(e,this._onMediaState,!0);this.bindSwiperEvents(),requestAnimationFrame(()=>this.swiper?.init?.())}bindSwiperEvents(){this.swiper?.on?.("slideChangeTransitionStart",()=>{this.clearNeighborPreload(),this.isPaused=!1,this.cleanupVideoHandlers(),this.pauseAllVideos(),this.currentIndex=("number"==typeof this.swiper?.realIndex?this.swiper.realIndex:this.swiper?.activeIndex)??0,this.startCurrentVideo()}),this.swiper?.on?.("slideChange",()=>{this.closeProductSheet(),this.applyMediaWindow({settled:!1})}),this.swiper?.on?.("slideChangeTransitionEnd",()=>{const e=("number"==typeof this.swiper?.realIndex?this.swiper.realIndex:this.swiper?.activeIndex)??0;this.currentIndex=e;const t=this.renderRoot.querySelector(`.swiper-slide[data-index="${e}"]`)?.querySelector("video");t&&!t.paused||this.startCurrentVideo()})}pauseAllVideos(){this.renderRoot.querySelectorAll("video").forEach(e=>{try{e.pause()}catch{}})}applyMediaWindow(e={}){const t=e.settled??!0,i=Array.from(this.renderRoot.querySelectorAll(".swiper-slide")),r=this.activeReelIndex;i.forEach(e=>{const i=e.querySelector("video");if(!i)return;const o=Number(e.getAttribute("data-index")??"-1"),s=this.mediaList[o]?.video_url??"",n=o===r,a=Math.abs(o-r);if((n||t&&1===a)&&s){if(i.preload=n?"auto":"metadata",i.getAttribute("src")!==s){i.setAttribute("src",s);try{i.load()}catch{}}n?this.detachPosterSeek(i):this.attachPosterSeek(i)}else if(i.getAttribute("src")&&a>2){this.detachPosterSeek(i);try{i.pause()}catch{}i.removeAttribute("src"),i.preload="none";try{i.load()}catch{}}})}scheduleNeighborPreload(){this.clearNeighborPreload(),this.neighborTimer=window.setTimeout(()=>{this.neighborTimer=null,this.prefetchAround(),this.applyMediaWindow({settled:!0})},550)}prefetchAround(){const e=this.activeReelIndex,t=[];for(let i=1;i<=2;i++)for(const r of[e-i,e+i]){const e=this.mediaList[r]?.video_url;e&&!this.prefetchedUrls.has(e)&&t.push(e)}if(!t.length)return;const i=++this.prefetchGen;this.prefetchBusy?this.prefetchPending=!0:(this.prefetchBusy=!0,(async()=>{try{for(const e of t){if(i!==this.prefetchGen||this.prefetchAbort.signal.aborted)return;try{const t=await fetch(e,{headers:{Range:"bytes=0-262143"},mode:"cors",credentials:"omit",signal:this.prefetchAbort.signal});await t.arrayBuffer(),this.prefetchedUrls.add(e)}catch{}}}finally{this.prefetchBusy=!1,this.prefetchPending&&!this.prefetchAbort.signal.aborted&&(this.prefetchPending=!1,this.prefetchAround())}})())}abortPrefetch(){this.prefetchGen++,this.prefetchAbort.abort()}scheduleFrameCapture(e,t){window.setTimeout(()=>{if(!(!this.isConnected||t.style.backgroundImage||e.readyState<2))try{const i=90,r=Math.round(i*(e.videoHeight||16)/(e.videoWidth||9)),o=document.createElement("canvas");o.width=i,o.height=r;const s=o.getContext("2d");if(!s)return;s.drawImage(e,0,0,i,r),t.style.backgroundImage=`url("${o.toDataURL("image/jpeg",.6)}")`,this.trimFrameCaptures()}catch{}},0)}trimFrameCaptures(){const e=Array.from(this.renderRoot.querySelectorAll(".sns-short-reel__frame")).filter(e=>!!e.style.backgroundImage);if(e.length<=20)return;const t=this.activeReelIndex,i=e=>Number(e.closest(".swiper-slide")?.getAttribute("data-index")??"-1");e.sort((e,r)=>Math.abs(i(r)-t)-Math.abs(i(e)-t)).slice(0,e.length-20).forEach(e=>e.style.backgroundImage="")}clearFrameCaptures(){this.renderRoot.querySelectorAll(".sns-short-reel__frame").forEach(e=>e.style.backgroundImage="")}clearNeighborPreload(){null!=this.neighborTimer&&(clearTimeout(this.neighborTimer),this.neighborTimer=null)}startRecoveryTick(){this.stopRecoveryTick(),this.recoveryTimer=window.setInterval(this.recoveryTick,500)}stopRecoveryTick(){null!=this.recoveryTimer&&(clearInterval(this.recoveryTimer),this.recoveryTimer=null)}attachPosterSeek(e){const t=()=>{try{e.paused&&0===e.currentTime&&(e.currentTime=.05)}catch{}};e.__posterSeek||(e.__posterSeek=t,e.addEventListener("loadedmetadata",t)),e.readyState>=1&&t()}detachPosterSeek(e){const t=e.__posterSeek;t&&(e.removeEventListener("loadedmetadata",t),e.__posterSeek=void 0)}detachAllPosterSeeks(){this.renderRoot.querySelectorAll("video").forEach(e=>this.detachPosterSeek(e))}kickPlay(e){e&&!this.isPaused&&e.play().catch(()=>{})}startCurrentVideo(){const e=++this.playToken,t=(i=0)=>{if(e!==this.playToken)return;const r=this.activeReelIndex,o=this.renderRoot.querySelector(`.swiper-slide[data-index="${r}"]`),s=o?.querySelector("video");if(!o||!s)return void(i<5&&requestAnimationFrame(()=>t(i+1)));this.applyMediaWindow({settled:!1});const n=this.mediaList[r]?.video_url??"";if(n&&s.getAttribute("src")!==n){s.setAttribute("src",n);try{s.load()}catch{}}this.cleanupVideoHandlers(),this.pauseAllVideos(),this.lastVideoEl=s,this.videoRetryCount=0,this.startLoadTimeout(),s.muted=this.isMuted,s.playsInline=!0,s.autoplay=!0,this._onWaiting=()=>this.kickPlay(s),this._onStalled=()=>this.kickPlay(s),this._onError=()=>this.retryOrNext(s),this._onPlaying=()=>{this.clearLoadTimeout(),this.scheduleNeighborPreload()},this._onCanPlay=()=>{this.kickPlay(s)},s.addEventListener("waiting",this._onWaiting),s.addEventListener("stalled",this._onStalled),s.addEventListener("error",this._onError),s.addEventListener("playing",this._onPlaying),s.addEventListener("canplay",this._onCanPlay),s.addEventListener("loadedmetadata",this._onCanPlay),this.kickPlay(s)};queueMicrotask(()=>t(0))}startLoadTimeout(){this.clearLoadTimeout(),this.loadTimer=window.setTimeout(()=>{const e=this.lastVideoEl;e&&(e.readyState>=HTMLMediaElement.HAVE_METADATA||e.buffered.length>0)?this.kickPlay(e):this.next()},8e3)}clearLoadTimeout(){null!=this.loadTimer&&(clearTimeout(this.loadTimer),this.loadTimer=null)}retryOrNext(e){if(ee(e))this.kickPlay(e);else if(this.videoRetryCount>=2)this.isPaused||this.next();else{this.videoRetryCount+=1;try{e.load()}catch{}this.kickPlay(e)}}cleanupVideoHandlers(){this.clearLoadTimeout(),this.videoRetryCount=0;const e=this.lastVideoEl;e&&(this._onWaiting&&e.removeEventListener("waiting",this._onWaiting),this._onStalled&&e.removeEventListener("stalled",this._onStalled),this._onError&&e.removeEventListener("error",this._onError),this._onPlaying&&e.removeEventListener("playing",this._onPlaying),this._onCanPlay&&(e.removeEventListener("canplay",this._onCanPlay),e.removeEventListener("loadedmetadata",this._onCanPlay)),this._onWaiting=this._onStalled=this._onError=this._onPlaying=this._onCanPlay=void 0,this.lastVideoEl=void 0)}next(){this.cleanupVideoHandlers(),this.swiper?.slideNext?.(zd)}close(){Wi.closeByUi(jd)}formatPrice(e){return null==e||Number.isNaN(e)?"":`${e.toLocaleString()}${oi()?"":"\uc6d0"}`}renderProduct(e,t){const i=e.products?.[0],r=Je`
      ${i?.thumbnail_url?Je`<img
            class="sns-short-reel__product-thumb"
            src=${i.thumbnail_url}
            alt=${i?.product_name??"product"}
            loading="lazy"
          />`:null}
      <div class="sns-short-reel__product-info">
        <span class="sns-short-reel__product-name">${i?.product_name}</span>
        <span class="sns-short-reel__product-price">${this.formatPrice(i?.price)}</span>
      </div>
    `,o=e.products?.length??0,s=o>1?Je`<button
            class="sns-short-reel__product-more"
            type="button"
            data-index=${t}
            @click=${this.openProductSheet}
            aria-label=${si.WIDGETS.SNS_SHORT.RELATED_PRODUCTS_TITLE(o)}
          >
            <span class="sns-short-reel__product-more-count">${o}</span>
            <span class="sns-short-reel__product-more-label">${si.WIDGETS.SNS_SHORT.MORE}</span>
          </button>`:Xe;return i?.product_url?Je`<div class="sns-short-reel__product">
      <a
        class="sns-short-reel__product-link"
        href=${i.product_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label=${i.product_name?i.product_name+" \uc0c1\ud488 \ud398\uc774\uc9c0\ub85c \uc774\ub3d9":"\uc0c1\ud488 \ud398\uc774\uc9c0\ub85c \uc774\ub3d9"}
        >${r}</a
      >
      ${s}
    </div>`:Je`<div class="sns-short-reel__product">${r}${s}</div>`}renderReel(e,t){const i=t===this.currentIndex,r=e.author?.handle?e.author.handle.startsWith("@")?e.author.handle:"@"+e.author.handle:"",o=!1!==this.option?.writer,s=!1!==this.option?.related_product&&!!e.products?.length,n=!1===this.option?.content_title?"":J(e),a=!1===this.option?.content_body?"":function(e){return(e.content??"").trim()}(e),p=this.openIndexes.has(t);return Je`
      <div class="swiper-slide" data-index=${t} @click=${this.togglePause}>
        <div class="sns-short-reel">
          <div class="sns-short-reel__loading" aria-hidden="true"></div>
          <div class="sns-short-reel__frame" aria-hidden="true"></div>
          ${e.thumbnail_url?Je`<img
                class="sns-short-reel__poster"
                src=${e.thumbnail_url}
                alt=""
                aria-hidden="true"
                draggable="false"
                decoding="async"
              />`:null}
          <video
            crossorigin="anonymous"
            poster=${e.thumbnail_url||Xe}
            aria-label=${r?r+" SNS short video":"SNS short video"}
            muted
            loop
            playsinline
            webkit-playsinline
            preload="none"
            disableremoteplayback
          ></video>

          ${i&&this.isPaused?Je`<div class="sns-short-reel__paused" aria-hidden="true">
                <review-custom-icon
                  type=${ut}
                  width="100%"
                  height="100%"
                  color="#ffffff"
                ></review-custom-icon>
              </div>`:null}

          <div
            class="sns-short-reel__volume"
            aria-label=${this.isMuted?this.soundOnText:this.soundOffText}
            @click=${this.toggleMute}
          >
            <review-custom-icon
              type=${this.isMuted?qt:Gt}
              width="100%"
              height="100%"
              color="var(--alp-review-icon-white90, #ffffffe2)"
            ></review-custom-icon>
          </div>

          <div class="sns-short-reel__info">
            ${o&&(r||e.author?.avatar_url)?Je`<div class="sns-short-reel__writer">
                  ${e.author?.avatar_url?Je`<img
                        class="sns-short-reel__avatar"
                        src=${e.author.avatar_url}
                        alt=${r?r+" avatar":"author avatar"}
                        loading="lazy"
                      />`:null}
                  <span class="sns-short-reel__handle">${r}</span>
                </div>`:null}
            ${n?Je`<p class="sns-short-reel__title">
                  <span class="sns-short-reel__title-text">${n}</span>
                </p>`:null}
            ${a&&p?Je`<div
                  class="sns-short-reel__content swiper-no-swiping"
                  @wheel=${this._onContentWheel}
                >${a}</div>`:null}
            ${a?Je`<button
                  class="sns-short-reel__more ${p?"is-open":""} ${i?"":"is-hidden"}"
                  data-index=${t}
                  ?disabled=${!i}
                  aria-expanded=${p?"true":"false"}
                  aria-hidden=${i?"false":"true"}
                  @click=${this.toggleMore}
                >
                  <span>${p?this.lessText:this.moreText}</span>
                  <span class="sns-short-reel__more-icon">
                    <review-custom-icon
                      type=${Et}
                      width="100%"
                      height="100%"
                      color="#d6d7db"
                    ></review-custom-icon>
                  </span>
                </button>`:null}
            ${s?this.renderProduct(e,t):null}
          </div>
        </div>
      </div>
    `}render(){return Je`
      <div class="sns-short-popup" @click=${this.onOverlayClick}>
        <div class="sns-short-popup__close" aria-label=${this.closeText} @click=${this.onCloseClick}>
          <review-custom-icon
            type=${Pt}
            width="100%"
            height="100%"
            color="var(--alp-review-icon-white90, #ffffffe2)"
          ></review-custom-icon>
        </div>

        <div
          class="swiper-container sns-short-popup__swiper"
          id="sns-short-popup-${this.widgetCode}"
          @click=${e=>e.stopPropagation()}
        >
          <div class="swiper-wrapper">
            ${this.mediaList.map((e,t)=>this.renderReel(e,t))}
          </div>
        </div>

        ${null!==this.productSheetIndex?Je`<review-sns-short-product-sheet
              variant="sheet"
              .products=${this.mediaList[this.productSheetIndex]?.products??[]}
              @sns-short-product-sheet-close=${this.closeProductSheet}
              @click=${e=>e.stopPropagation()}
            ></review-sns-short-product-sheet>`:Xe}
      </div>
    `}};fc.styles=wc,yc([i({type:String})],fc.prototype,"widgetCode",2),yc([i({type:Array})],fc.prototype,"mediaList",2),yc([i({type:Object})],fc.prototype,"option",2),yc([i({type:String})],fc.prototype,"index",2),yc([r()],fc.prototype,"currentIndex",2),yc([r()],fc.prototype,"productSheetIndex",2),yc([r()],fc.prototype,"openIndexes",2),yc([r()],fc.prototype,"isMuted",2),yc([r()],fc.prototype,"isPaused",2),fc=yc([ae("review-sns-short-popup")],fc);const bc=[Ni,Di,ko,ue`:host{width:100%;font-family:var(--alp-common-font-family);display:block}.sns-short-skeleton{justify-content:flex-start;align-items:center;gap:var(--sns-short-gap,36px);width:100%;padding:var(--sns-short-track-pad-y,40.8px)var(--sns-short-track-pad-x,24.7px);display:flex;overflow:hidden}.sns-short-skeleton__card{width:var(--sns-short-slot-w,207px);aspect-ratio:9/16;border-radius:var(--sns-short-card-radius,8px);flex:none}.sns-short-skeleton__card--active{width:calc(var(--sns-short-slot-w,207px)*var(--sns-short-active-scale,1.2));border-radius:var(--sns-short-card-radius-active,10px)}`];var xc=Object.defineProperty,_c=Object.getOwnPropertyDescriptor,Cc=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?_c(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&xc(t,i,s),s};let $c=class extends ht{constructor(){super(...arguments),this.count=3}render(){return Je`
      <div class="sns-short-skeleton">
        ${Array.from({length:Math.max(1,Math.min(3,this.count))}).map((e,t)=>Je`<div
            class="sns-short-skeleton__card review-skeleton${0===t?" sns-short-skeleton__card--active":""}"
          ></div>`)}
      </div>
    `}};$c.styles=bc,Cc([i({type:Number})],$c.prototype,"count",2),$c=Cc([ae("review-sns-short-skeleton")],$c);const Oc=[Ni,Di,ue`
    :host {
    }
    .floating-button-container {
      position: fixed !important;

      bottom: var(--alp-review-fb-position-bottom);
      right: var(--alp-review-fb-position-right);
      left: var(--alp-review-fb-position-left);
      top: var(--alp-review-fb-position-top);

      z-index: var(--alp-review-z-index);

      display: var(--alp-review-fb-button-show-pc);
      align-items: center;
      justify-content: center;
      width: var(--alp-review-fb-size);
      height: var(--alp-review-fb-size);

      border-radius: 50%;
      box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.25);

      transition: transform 0.15s ease-in-out;
      background: linear-gradient(147deg, #1d9bf0 18.44%, #1d44f0 86.68%);
    }
    .floating-button-container.is-bg-img {
      padding: 0px;
      background: #fff;
    }
    .floating-button-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
    .floating-button-container svg {
      max-width: 40%;
      max-height: 40%;
    }
    .floating-button-container:hover {
      transform: scale(1.05);
    }

    @media (max-width: ${ge(Zt)}) {
      .floating-button-container {
        display: var(--alp-review-fb-button-show-mo);
      }
      .floating-button-container svg {
        max-width: 100%;
      }
    }
  `];var kc=Object.defineProperty,Sc=Object.getOwnPropertyDescriptor,Ec=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Sc(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&kc(t,i,s),s};let Rc=class extends ht{constructor(){super(...arguments),this.widgetCode="",this.productNo="all",this.customClass="",this.customId="",this.customCss="",this.customJs="",this.isDesignLoading=!0,this.isWidgetLoading=!0,this.bgImg="",this._resizeObserver=new zr(this,()=>{this.review&&this.setDesignOption()}),this.pageList=["MAIN","PRODUCT_DETAIL"]}async openLoginPopup(){this.review?.has_pending_reviews?(d("review-login-popup",{type:"overlay",initialAttributes:{review:JSON.stringify(this.review)??"{}"}}),Wi.open({key:"review-login-popup",onClose:()=>c("review-login-popup")})):cr({product_no:this.productNo,mall_id:(await m()).mall_id,shop_no:(await m()).shop_no,member_id:await y()??""})}async firstUpdated(e){super.firstUpdated(e);const t=await y();if(!t)return;this.productNo="PRODUCT_DETAIL"===await f()?v()||this.productNo:"all";const i={mall_id:(await m()).mall_id,shop_no:(await m()).shop_no,member_id:t??void 0,device:"pc"===P()?"w":"m"};try{await this.getOpenLoginPopupFloating(i)}catch(e){}}setDesignOption(){this.bgImg="pc"===P()?this.review.floating_img_pc??"":this.review.floating_img_mo??"",B(this,{"--alp-review-fb-size":(("pc"===P()?this.review?.floating_size_pc:this.review?.floating_size_mo)??"50")+"px","--alp-review-fb-button-show-pc":this.review?.floating_show_pc?"flex":"none","--alp-review-fb-button-show-mo":this.review?.floating_show_mo?"flex":"none","--alp-review-z-index":this.review?.floating_z_index??"100","--alp-review-fb-position-right":"mobile"===P()?this.review?.floating_position_mo?.includes("right")?this.review?.floating_x_mo+"px":"none":this.review?.floating_position_pc?.includes("right")?this.review?.floating_x_pc+"px":"none","--alp-review-fb-position-left":"mobile"===P()?this.review?.floating_position_mo?.includes("left")?this.review?.floating_x_mo+"px":"none":this.review?.floating_position_pc?.includes("left")?this.review?.floating_x_pc+"px":"none","--alp-review-fb-position-top":this.review?.floating_position_pc?.includes("top")||this.review?.floating_position_mo?.includes("top")?"mobile"===P()?this.review?.floating_y_mo+"px":this.review?.floating_y_pc+"px":"none","--alp-review-fb-position-bottom":this.review?.floating_position_pc?.includes("bottom")||this.review?.floating_position_mo?.includes("bottom")?"mobile"===P()?this.review?.floating_y_mo+"px":this.review?.floating_y_pc+"px":"none"})}async getOpenLoginPopupFloating(e){try{const t=await async function(e){return await or.get("/v2/api-widget/extra/revisit-popup",{query:e})}(e);if(this.review=t,z(this,this.review?.floating_css??""),this.setDesignOption(),this.isWidgetLoading=!1,this.review?.has_pending_reviews){if(fa("review-login-popup"))return;d("review-login-popup",{type:"overlay",initialAttributes:{review:JSON.stringify(this.review)??"{}"}}),Wi.open({key:"review-login-popup",onClose:()=>c("review-login-popup")})}}catch(e){}}render(){if(this.isWidgetLoading||!window.ALPHA_REVIEW_SHOP_DESIGN_OPTION?.revisit_show||!this.pageList.includes(window.CAPP_ASYNC_METHODS?.EC_PATH_ROLE))return null;const e=this.bgImg&&""!==this.bgImg;return Je`
      <div
        class="floating-button-container${e?" is-bg-img":""}"
        @click=${this.openLoginPopup}
      >
        ${e?Je`<img src="${this.bgImg}" alt="floating-button-bg" />`:Je` <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 27 27"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.9018 3.94338C20.5526 2.29259 23.229 2.2926 24.8798 3.94339C26.5306 5.59418 26.5306 8.27064 24.8798 9.92143L21.5703 13.2309L21.5674 13.2339L21.5645 13.2367L10.2982 24.503C10.2797 24.5215 10.2614 24.5399 10.2432 24.5581C9.9728 24.8289 9.73427 25.0678 9.45088 25.2547C9.20172 25.419 8.9315 25.5489 8.64755 25.6408C8.32458 25.7454 7.98902 25.7824 7.6086 25.8243C7.58302 25.8272 7.55723 25.83 7.53123 25.8329L3.79441 26.2481C3.46104 26.2851 3.12891 26.1686 2.89174 25.9315C2.65456 25.6943 2.53805 25.3621 2.5751 25.0288L2.9903 21.292C2.99319 21.266 2.99603 21.2402 2.99886 21.2146C3.04082 20.8342 3.07783 20.4986 3.18238 20.1756C3.2743 19.8917 3.40418 19.6215 3.56848 19.3723C3.75536 19.0889 3.99426 18.8504 4.2651 18.58C4.28332 18.5618 4.30169 18.5435 4.32019 18.525L18.9018 3.94338ZM16.3701 9.59803L5.88168 20.0864C5.52559 20.4425 5.45948 20.516 5.41201 20.588C5.35724 20.671 5.31395 20.7611 5.28331 20.8558C5.25676 20.9378 5.24068 21.0353 5.18507 21.5358L4.92228 23.9009L7.28736 23.6381C7.78787 23.5825 7.88539 23.5664 7.96742 23.5399C8.06208 23.5092 8.15215 23.4659 8.2352 23.4112C8.30719 23.3637 8.38066 23.2976 8.73675 22.9415L19.2252 12.4531L16.3701 9.59803ZM20.7867 10.8916L17.9316 8.03655L20.4633 5.50487C21.2517 4.71647 22.5299 4.71647 23.3183 5.50487C24.1067 6.29328 24.1067 7.57154 23.3183 8.35994L20.7867 10.8916Z"
                fill="white"
              />
              <path
                d="M6.0197 3.92929V0.257812H3.62494V3.92929H0.11792V6.43635H3.62494V10.1078H6.0197V6.43635H9.52671V3.92929H6.0197Z"
                fill="white"
              />
            </svg>`}
      </div>
    `}};Rc.styles=Oc,Ec([i({type:String,attribute:"data-widget-code"})],Rc.prototype,"widgetCode",2),Ec([i({type:String,attribute:"data-product-no"})],Rc.prototype,"productNo",2),Ec([i({type:String,attribute:"data-custom-class"})],Rc.prototype,"customClass",2),Ec([i({type:String,attribute:"data-custom-id"})],Rc.prototype,"customId",2),Ec([i({type:String,attribute:"data-custom-css"})],Rc.prototype,"customCss",2),Ec([i({type:String,attribute:"data-custom-js"})],Rc.prototype,"customJs",2),Ec([r()],Rc.prototype,"isDesignLoading",2),Ec([r()],Rc.prototype,"isWidgetLoading",2),Ec([r()],Rc.prototype,"review",2),Ec([r()],Rc.prototype,"bgImg",2),Rc=Ec([ae("review-floating-button")],Rc);const Lc=[Ni,Di,Ra,ue`:host{background-color:var(--alp-review-bg-white);opacity:0;border-radius:20px;width:100%;max-width:340px;padding:0 10px;animation:.3s cubic-bezier(.4,0,.2,1) forwards alpFadeUp;position:relative;transform:translateY(10%)}.login-popup__header{flex-direction:column;justify-content:center;align-items:center;gap:20px;padding:32px 0 0;display:flex}.login-popup__header h1{color:var(--alp-review-text-gray100)}.login-popup__header p{color:var(--alp-review-text-gray80)}.login-popup__content{margin-top:32px;text-align:center!important}.login-popup__product-info{background-color:var(--alp-review-card-gray05);border-radius:16px;gap:14px;width:100%;padding:20px 16px;display:flex}.login-popup__product-info img{object-fit:cover;border-radius:9px;min-width:53px;max-width:53px;min-height:53px;max-height:53px}.login-popup__product-info-inner{flex-direction:column;justify-content:center;gap:5px;display:flex}.login-popup__product-info-inner p{color:var(--alp-review-text-gray100);line-clamp:2;-webkit-line-clamp:2}.login-popup__product-info-inner span{color:var(--alp-review-text-gray50)}.login-popup__star-wrapper{flex-direction:column;justify-content:center;align-items:center;gap:18px;margin:24px 0 36px;display:flex}.login-popup__star-wrapper p{color:var(--alp-review-text-gray80)}.login-popup__star-wrapper svg path{will-change:transform}@keyframes star-path-raise{0%{transform:translateY(0)}10%{transform:translateY(-5px)}20%{transform:translateY(0)}to{transform:translateY(0)}}.login-popup__star-wrapper:hover svg .stars--base path,.login-popup__star-wrapper:hover svg .stars--fill path{animation:3s ease-in-out infinite both star-path-raise}.login-popup__star-wrapper:hover svg .stars--base path:nth-of-type(2),.login-popup__star-wrapper:hover svg .stars--fill path:nth-of-type(2){animation-delay:.2s}.login-popup__star-wrapper:hover svg .stars--base path:nth-of-type(3),.login-popup__star-wrapper:hover svg .stars--fill path:nth-of-type(3){animation-delay:.4s}.login-popup__star-wrapper:hover svg .stars--base path:nth-of-type(4),.login-popup__star-wrapper:hover svg .stars--fill path:nth-of-type(4){animation-delay:.6s}.login-popup__star-wrapper:hover svg .stars--base path:nth-of-type(5),.login-popup__star-wrapper:hover svg .stars--fill path:nth-of-type(5){animation-delay:.8s}.close-button{cursor:pointer;background-color:#00000040;border-radius:50%;justify-content:center;align-items:center;width:60px;height:60px;display:flex;position:absolute;bottom:-70px;right:0}@media (width<=440px){:host{max-width:100%;padding:0 16px}}`];class Ic extends gs{constructor(e){if(super(e),this.it=Xe,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Xe||null==e)return this._t=void 0,this.it=e;if(e===Qe)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Ic.directiveName="unsafeHTML",Ic.resultType=1;const Pc=hs(Ic);var Tc=Object.defineProperty,Ac=Object.getOwnPropertyDescriptor,Nc=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Ac(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Tc(t,i,s),s};let Dc=class extends ht{constructor(){super(...arguments),this.isHovering=!1,this.hoverRating=0,this.VIEWBOX_WIDTH=205,this.VIEWBOX_HEIGHT=35,this.WAVE_PAD=8,this.starSvgId="rating-stars-"+Math.random().toString(36).slice(2),this.clipPathId="rating-clip-"+Math.random().toString(36).slice(2),this.starSvgEl=null,this.starBoxes=[],this.totalStarWidth=0,this.onStarEnter=()=>{this.isHovering=!0,this.starSvgEl?.pauseAnimations?.()},this.onStarMove=e=>{if(!this.starSvgEl)return;const t=this.starSvgEl.getBoundingClientRect(),i=0===t.width?0:Math.max(0,Math.min(t.width,e.clientX-t.left))/t.width*this.VIEWBOX_WIDTH,r=this.mapXToAccumWidth(i);this.hoverRating=Math.round(10*(0===this.totalStarWidth?i/this.VIEWBOX_WIDTH:r/this.totalStarWidth))/2},this.onStarLeave=()=>{this.isHovering=!1,this.hoverRating=0,this.starSvgEl?.unpauseAnimations?.()}}firstUpdated(e){super.firstUpdated(e);const t=this.shadowRoot?.getElementById(this.starSvgId)??null;this.starSvgEl=t instanceof SVGSVGElement?t:null,this.computeStarBoxes()}closePopup(){const e=window.ALPHA_REVIEW_SHOP_DESIGN_OPTION?.revisit_dismiss_days||1;ba("review-login-popup","true",e),Wi.closeByUi("review-login-popup")}redirectToReviewPage(){if(!this.review?.redirect_url)return;const e=new URL(this.review.redirect_url,window.location.origin);e.searchParams.set("rv_src","revisit_banner"),window.open(""+e,"_blank"),Wi.closeByUi("review-login-popup")}computeStarBoxes(){if(!this.starSvgEl)return;const e=this.starSvgEl.querySelector("g.stars--base");if(!e)return;const t=e.querySelectorAll("path"),i=[];t.forEach(e=>{const t=e.getBBox();i.push({left:t.x,right:t.x+t.width,width:t.width})}),i.sort((e,t)=>e.left-t.left),this.starBoxes=i,this.totalStarWidth=i.reduce((e,t)=>e+t.width,0)}mapXToAccumWidth(e){if(0===this.starBoxes.length)return Math.max(0,Math.min(e,this.VIEWBOX_WIDTH));let t=0;for(const i of this.starBoxes){if(!(e>=i.right)){if(e>i.left){t+=Math.max(0,Math.min(e,i.right)-i.left);break}break}t+=i.width}return t}mapAccumWidthToX(e){if(0===this.starBoxes.length)return Math.max(0,Math.min(e,this.VIEWBOX_WIDTH));let t=Math.max(0,e);for(const e of this.starBoxes){if(!(t>=e.width))return e.left+t;if(t-=e.width,0===t)return e.right}const i=this.starBoxes[this.starBoxes.length-1];return i?i.right:Math.max(0,Math.min(e,this.VIEWBOX_WIDTH))}get clipWidth(){return 0===this.starBoxes.length?this.hoverRating/5*this.VIEWBOX_WIDTH:this.mapAccumWidthToX(this.hoverRating/5*this.totalStarWidth)}render(){return Je`
      <section class="login-popup" id="login-popup">
        <div class="login-popup__header">
          <h1 class="alp-h22 alp-bold">${si.WIDGETS.LOGIN_POPUP.TITLE}</h1>

          <div class="login-popup__product-info">
            <img src="${this.review?.detail_image}" alt="product image" />

            <div class="login-popup__product-info-inner">
              <p class="alp-body13 alp-medium line-wrap alp-line13">${this.review?.product_name}</p>
              ${this.review?.product_option?Je` <span class="alp-body12 line-wrap">${this.review?.product_option}</span>`:null}
            </div>
          </div>
        </div>

        ${this.review?.text?Je`<div class="alp-body16 login-popup__content">${Pc(this.review.text)}</div>`:null}

        <div
          class="login-popup__star-wrapper"
          @mouseenter=${this.onStarEnter}
          @mousemove=${this.onStarMove}
          @mouseleave=${this.onStarLeave}
          @click=${()=>this.redirectToReviewPage()}
        >
          <svg
            id="${this.starSvgId}"
            xmlns="http://www.w3.org/2000/svg"
            width="${this.VIEWBOX_WIDTH}"
            height="55"
            viewBox="0 0 ${this.VIEWBOX_WIDTH} ${this.VIEWBOX_HEIGHT}"
            fill="none"
          >
            <defs>
              <linearGradient
                id="movingGradient"
                x1="0"
                y1="17.5"
                x2="${this.VIEWBOX_WIDTH}"
                y2="17.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="var(--alp-common-color)" stop-opacity="0.4" />
                <stop offset="0.25" stop-color="var(--alp-common-color)" stop-opacity="0.7" />
                <stop offset="0.5" stop-color="var(--alp-common-color)" stop-opacity="1.0" />
                <stop offset="0.75" stop-color="var(--alp-common-color)" stop-opacity="0.7" />
                <stop offset="1" stop-color="var(--alp-common-color)" stop-opacity="0.4" />

                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  values="-${this.VIEWBOX_WIDTH} 0; ${this.VIEWBOX_WIDTH} 0;"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </linearGradient>

              <clipPath id="${this.clipPathId}" clipPathUnits="userSpaceOnUse">
                <rect
                  x="0"
                  y="${-this.WAVE_PAD}"
                  width="${this.clipWidth}"
                  height="${this.VIEWBOX_HEIGHT+2*this.WAVE_PAD}"
                />
              </clipPath>
            </defs>
            
            <g class="stars--base">
              <path
                d="M15.8904 1.74695C16.611 -0.478965 19.7486 -0.478964 20.4692 1.74695L23.0438 9.70004C23.3661 10.6955 24.2903 11.3695 25.3332 11.3695H33.665C35.9969 11.3695 36.9665 14.3644 35.0799 15.7401L28.3394 20.6554C27.4957 21.2706 27.1426 22.3611 27.4649 23.3566L30.0396 31.3097C30.7602 33.5356 28.2218 35.3866 26.3353 34.0109L19.5947 29.0956C18.751 28.4804 17.6085 28.4804 16.7649 29.0956L10.0243 34.0109C8.13773 35.3866 5.59938 33.5356 6.31998 31.3097L8.89465 23.3566C9.21691 22.3611 8.86388 21.2706 8.02018 20.6554L1.27961 15.7401C-0.606944 14.3644 0.362619 11.3695 2.69453 11.3695H11.0263C12.0692 11.3695 12.9935 10.6955 13.3157 9.70004L15.8904 1.74695Z"
                fill="#eee"
              />
              <path
                d="M57.9419 1.74695C58.6625 -0.478965 61.8 -0.478964 62.5206 1.74695L65.0953 9.70004C65.4176 10.6955 66.3418 11.3695 67.3847 11.3695H75.7165C78.0484 11.3695 79.018 14.3644 77.1314 15.7401L70.3908 20.6554C69.5471 21.2706 69.1941 22.3611 69.5164 23.3566L72.091 31.3097C72.8116 33.5356 70.2733 35.3866 68.3867 34.0109L61.6462 29.0956C60.8025 28.4804 59.66 28.4804 58.8163 29.0956L52.0758 34.0109C50.1892 35.3866 47.6509 33.5356 48.3715 31.3097L50.9461 23.3566C51.2684 22.3611 50.9153 21.2706 50.0717 20.6554L43.3311 15.7401C41.4445 14.3644 42.4141 11.3695 44.746 11.3695H53.0778C54.1207 11.3695 55.0449 10.6955 55.3672 9.70004L57.9419 1.74695Z"
                fill="#eee"
              />
              <path
                d="M99.9933 1.74695C100.714 -0.478965 103.852 -0.478964 104.572 1.74695L107.147 9.70004C107.469 10.6955 108.393 11.3695 109.436 11.3695H117.768C120.1 11.3695 121.069 14.3644 119.183 15.7401L112.442 20.6554C111.599 21.2706 111.246 22.3611 111.568 23.3566L114.143 31.3097C114.863 33.5356 112.325 35.3866 110.438 34.0109L103.698 29.0956C102.854 28.4804 101.711 28.4804 100.868 29.0956L94.1272 34.0109C92.2407 35.3866 89.7023 33.5356 90.4229 31.3097L92.9976 23.3566C93.3199 22.3611 92.9668 21.2706 92.1231 20.6554L85.3826 15.7401C83.496 14.3644 84.4656 11.3695 86.7975 11.3695H95.1293C96.1721 11.3695 97.0964 10.6955 97.4187 9.70004L99.9933 1.74695Z"
                fill="#eee"
              />
              <path
                d="M142.045 1.74695C142.765 -0.478965 145.903 -0.478964 146.624 1.74695L149.198 9.70004C149.521 10.6955 150.445 11.3695 151.488 11.3695H159.819C162.151 11.3695 163.121 14.3644 161.234 15.7401L154.494 20.6554C153.65 21.2706 153.297 22.3611 153.619 23.3566L156.194 31.3097C156.915 33.5356 154.376 35.3866 152.49 34.0109L145.749 29.0956C144.905 28.4804 143.763 28.4804 142.919 29.0956L136.179 34.0109C134.292 35.3866 131.754 33.5356 132.474 31.3097L135.049 23.3566C135.371 22.3611 135.018 21.2706 134.175 20.6554L127.434 15.7401C125.547 14.3644 126.517 11.3695 128.849 11.3695H137.181C138.224 11.3695 139.148 10.6955 139.47 9.70004L142.045 1.74695Z"
                fill="#eee"
              />
              <path
                d="M184.096 1.74695C184.817 -0.478965 187.954 -0.478964 188.675 1.74695L191.25 9.70004C191.572 10.6955 192.496 11.3695 193.539 11.3695H201.871C204.203 11.3695 205.172 14.3644 203.286 15.7401L196.545 20.6554C195.702 21.2706 195.349 22.3611 195.671 23.3566L198.245 31.3097C198.966 33.5356 196.428 35.3866 194.541 34.0109L187.801 29.0956C186.957 28.4804 185.814 28.4804 184.971 29.0956L178.23 34.0109C176.344 35.3866 173.805 33.5356 174.526 31.3097L177.101 23.3566C177.423 22.3611 177.07 21.2706 176.226 20.6554L169.485 15.7401C167.599 14.3644 168.568 11.3695 170.9 11.3695H179.232C180.275 11.3695 181.199 10.6955 181.522 9.70004L184.096 1.74695Z"
                fill="#eee"
              />
            </g>

            
            <g
              class="stars--fill"
              style=${this.isHovering?`clip-path:url(#${this.clipPathId})`:""}
            >
              <path
                d="M15.8904 1.74695C16.611 -0.478965 19.7486 -0.478964 20.4692 1.74695L23.0438 9.70004C23.3661 10.6955 24.2903 11.3695 25.3332 11.3695H33.665C35.9969 11.3695 36.9665 14.3644 35.0799 15.7401L28.3394 20.6554C27.4957 21.2706 27.1426 22.3611 27.4649 23.3566L30.0396 31.3097C30.7602 33.5356 28.2218 35.3866 26.3353 34.0109L19.5947 29.0956C18.751 28.4804 17.6085 28.4804 16.7649 29.0956L10.0243 34.0109C8.13773 35.3866 5.59938 33.5356 6.31998 31.3097L8.89465 23.3566C9.21691 22.3611 8.86388 21.2706 8.02018 20.6554L1.27961 15.7401C-0.606944 14.3644 0.362619 11.3695 2.69453 11.3695H11.0263C12.0692 11.3695 12.9935 10.6955 13.3157 9.70004L15.8904 1.74695Z"
                fill="url(#movingGradient)"
              />
              <path
                d="M57.9419 1.74695C58.6625 -0.478965 61.8 -0.478964 62.5206 1.74695L65.0953 9.70004C65.4176 10.6955 66.3418 11.3695 67.3847 11.3695H75.7165C78.0484 11.3695 79.018 14.3644 77.1314 15.7401L70.3908 20.6554C69.5471 21.2706 69.1941 22.3611 69.5164 23.3566L72.091 31.3097C72.8116 33.5356 70.2733 35.3866 68.3867 34.0109L61.6462 29.0956C60.8025 28.4804 59.66 28.4804 58.8163 29.0956L52.0758 34.0109C50.1892 35.3866 47.6509 33.5356 48.3715 31.3097L50.9461 23.3566C51.2684 22.3611 50.9153 21.2706 50.0717 20.6554L43.3311 15.7401C41.4445 14.3644 42.4141 11.3695 44.746 11.3695H53.0778C54.1207 11.3695 55.0449 10.6955 55.3672 9.70004L57.9419 1.74695Z"
                fill="url(#movingGradient)"
              />
              <path
                d="M99.9933 1.74695C100.714 -0.478965 103.852 -0.478964 104.572 1.74695L107.147 9.70004C107.469 10.6955 108.393 11.3695 109.436 11.3695H117.768C120.1 11.3695 121.069 14.3644 119.183 15.7401L112.442 20.6554C111.599 21.2706 111.246 22.3611 111.568 23.3566L114.143 31.3097C114.863 33.5356 112.325 35.3866 110.438 34.0109L103.698 29.0956C102.854 28.4804 101.711 28.4804 100.868 29.0956L94.1272 34.0109C92.2407 35.3866 89.7023 33.5356 90.4229 31.3097L92.9976 23.3566C93.3199 22.3611 92.9668 21.2706 92.1231 20.6554L85.3826 15.7401C83.496 14.3644 84.4656 11.3695 86.7975 11.3695H95.1293C96.1721 11.3695 97.0964 10.6955 97.4187 9.70004L99.9933 1.74695Z"
                fill="url(#movingGradient)"
              />
              <path
                d="M142.045 1.74695C142.765 -0.478965 145.903 -0.478964 146.624 1.74695L149.198 9.70004C149.521 10.6955 150.445 11.3695 151.488 11.3695H159.819C162.151 11.3695 163.121 14.3644 161.234 15.7401L154.494 20.6554C153.65 21.2706 153.297 22.3611 153.619 23.3566L156.194 31.3097C156.915 33.5356 154.376 35.3866 152.49 34.0109L145.749 29.0956C144.905 28.4804 143.763 28.4804 142.919 29.0956L136.179 34.0109C134.292 35.3866 131.754 33.5356 132.474 31.3097L135.049 23.3566C135.371 22.3611 135.018 21.2706 134.175 20.6554L127.434 15.7401C125.547 14.3644 126.517 11.3695 128.849 11.3695H137.181C138.224 11.3695 139.148 10.6955 139.47 9.70004L142.045 1.74695Z"
                fill="url(#movingGradient)"
              />
              <path
                d="M184.096 1.74695C184.817 -0.478965 187.954 -0.478964 188.675 1.74695L191.25 9.70004C191.572 10.6955 192.496 11.3695 193.539 11.3695H201.871C204.203 11.3695 205.172 14.3644 203.286 15.7401L196.545 20.6554C195.702 21.2706 195.349 22.3611 195.671 23.3566L198.245 31.3097C198.966 33.5356 196.428 35.3866 194.541 34.0109L187.801 29.0956C186.957 28.4804 185.814 28.4804 184.971 29.0956L178.23 34.0109C176.344 35.3866 173.805 33.5356 174.526 31.3097L177.101 23.3566C177.423 22.3611 177.07 21.2706 176.226 20.6554L169.485 15.7401C167.599 14.3644 168.568 11.3695 170.9 11.3695H179.232C180.275 11.3695 181.199 10.6955 181.522 9.70004L184.096 1.74695Z"
                fill="url(#movingGradient)"
              />
            </g>
          </svg>

          <p class="alp-body13">${si.WIDGETS.LOGIN_POPUP.DESCRIPTION}</p>
        </div>
      </section>

      <div class="close-button" @click=${this.closePopup}>
        <review-custom-icon type="${Pt}" width="44" height="44" color="#fff">
        </review-custom-icon>
      </div>
    `}};Dc.styles=Lc,Nc([i({type:Object})],Dc.prototype,"review",2),Nc([i({type:Boolean})],Dc.prototype,"isHovering",2),Nc([i({type:Number})],Dc.prototype,"hoverRating",2),Dc=Nc([ae("review-login-popup")],Dc);const Mc=[Ni,Di,ue`:host{display:block}.detail-banner-widget{margin-bottom:20px;padding:18px 10px}.minimal-banner-container{border-bottom:.5px solid var(--alp-review-border-gray20,#1e293b33);align-items:center;gap:22px;width:100%;padding:24px 16px 24px 12px;display:flex}.minimal-banner-container>p{color:var(--alp-review-text-gray80)}.minimal-banner-icon{display:none}@keyframes minimal-banner-icon-wiggle-x{0%{transform:translate(-5px)}to{transform:translate(5px)}}@keyframes minimal-banner-container-tilt{0%{transform:rotate(0)}0%{transform:rotate(-10deg)}to{transform:rotate(10deg)}to{transform:rotate(0)}}.banner-image.is-tilting{transform-origin:50%;will-change:transform;animation-name:minimal-banner-container-tilt;animation-duration:.1s;animation-timing-function:ease-in-out;animation-iteration-count:5;animation-direction:alternate}.banner-image{min-width:64px;max-width:64px;min-height:64px;max-height:64px}.banner-image img{width:100%;margin:auto 0}.banner-button{background:var(--alp-review-card-gray100);color:#fff;cursor:pointer;border-radius:10px;justify-content:center;align-items:center;width:100%;min-width:88px;max-width:120px;height:44px;margin-left:auto;padding:0 16px;transition:transform .3s ease-in-out;display:flex}.banner-button:active{transition:transform .3s ease-in-out;transform:scale(1.05)}.emphasis-banner-container{background:var(--alp-review-card-gray100);border-radius:18px;align-items:center;gap:17px;padding:19px 24px;display:flex}.emphasis-banner-container>p{color:var(--alp-review-text-white)}.emphasis-banner-container>p>span{color:var(--alp-review-text-point)}@media (width<=440px){.emphasis-banner-container{flex-direction:column;gap:20px;padding:16px 16px 19px}.emphasis-banner-container>p{font-size:16px;text-align:center!important}.banner-button{width:100%;font-size:16px}.minimal-banner-icon{will-change:transform;margin-left:auto;animation:.4s ease-in-out infinite alternate minimal-banner-icon-wiggle-x;display:block}.minimal-button{display:none}.minimal-banner-container>p{font-size:16px}}`];var Wc=Object.defineProperty,zc=Object.getOwnPropertyDescriptor,jc=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?zc(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Wc(t,i,s),s};let Vc=class extends ht{constructor(){super(...arguments),this.widgetCode="",this.productNo="all",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs="",this.filterOption={page:1,page_size:10,product_no:"all",widget_code:"",member_id:"",device:"w"},this.isDesignLoading=!1,this.isWidgetLoading=!1,this.hasEnteredViewport=!1,this.intersectionObserver=null,this.imgUrl=te+"/review-widget/",this.buttonText=si.WIDGETS.DETAIL_BANNER.WRITE_REVIEW}async firstUpdated(e){if(super.firstUpdated(e),this.isDummy&&(this.filterOption.is_dummy=!0),this.productNo="PRODUCT_DETAIL"===await f()?v()||this.productNo:"all",this.filterOption.product_no=this.productNo,this.filterOption.widget_code=this.widgetCode,this.filterOption.member_id=await y()??void 0,this.filterOption.member_id)try{await this.getReview(),this.intersectionObserver=new IntersectionObserver(e=>{const t=e[0];t&&t.isIntersecting&&!this.hasEnteredViewport&&(this.hasEnteredViewport=!0,this.intersectionObserver?.unobserve(this),this.intersectionObserver?.disconnect(),this.intersectionObserver=null,setTimeout(()=>{this.hasEnteredViewport=!1},500))},{root:null,threshold:.01}),this.intersectionObserver.observe(this)}catch(e){}}disconnectedCallback(){super.disconnectedCallback(),this.intersectionObserver&&(this.intersectionObserver.unobserve(this),this.intersectionObserver.disconnect(),this.intersectionObserver=null)}async onWriteReviewClick(){const{mall_id:e,shop_no:t}=await m(),i=await y()??void 0;cr({mall_id:e,shop_no:t,member_id:i,product_no:this.productNo??window?.iProductNo??""})}async getReview(){const e={...this.filterOption};try{const t=await b(e);this.review=t,this.isWidgetLoading=!1}catch(e){}}render(){return this.isWidgetLoading||!this.review?.has_pending_reviews?null:Je`
      <style>${this.review?.css??""}</style>
      <div class="detail-banner-widget">
        ${"style_minimal"===this.review?.style?Je`
              <div
                class="minimal-banner-container"
                @mouseenter=${()=>this.hasEnteredViewport=!0}
                @mouseleave=${()=>this.hasEnteredViewport=!1}
              >
                <div class="banner-image ${this.hasEnteredViewport?"is-tilting":""}">
                  <img src="${this.imgUrl}style_minimal.png" alt="review banner" />
                </div>
                ${Je`<p class="banner-text alp-body15 alp-medium alp-line15">${this.review?.text??""}</p>`}

                <button
                  class="banner-button alp-semi-bold minimal-button"
                  @click=${this.onWriteReviewClick}
                >
                  ${this.buttonText}
                </button>
                <review-custom-icon
                  class="minimal-banner-icon"
                  .type="${yt}"
                  width="24"
                  height="24"
                  color="var(--alp-review-icon-gray60)"
                  @click=${this.onWriteReviewClick}
                ></review-custom-icon>
              </div>
            `:Je`
              <div
                class="emphasis-banner-container"
                @mouseenter=${()=>this.hasEnteredViewport=!0}
                @mouseleave=${()=>this.hasEnteredViewport=!1}
              >
                <div class="banner-image ${this.hasEnteredViewport?"is-tilting":""}">
                  <img src="${this.imgUrl}style_emphasis.png" alt="review banner" />
                </div>
                ${Je`<p class="banner-text alp-body15 alp-medium alp-line15">${this.review?.text??""}</p>`}

                <button
                  class="banner-button alp-semi-bold"
                  style="background: rgba(255, 255, 255, 0.16);"
                  @click=${this.onWriteReviewClick}
                >
                  ${this.buttonText}
                </button>
              </div>
            `}
      </div>
    `}};Vc.styles=Mc,jc([i({type:String,attribute:"data-widget-code"})],Vc.prototype,"widgetCode",2),jc([i({type:String,attribute:"data-product-no"})],Vc.prototype,"productNo",2),jc([i({type:Boolean,attribute:"data-dummy"})],Vc.prototype,"isDummy",2),jc([i({type:String,attribute:"data-custom-class"})],Vc.prototype,"customClass",2),jc([i({type:String,attribute:"data-custom-id"})],Vc.prototype,"customId",2),jc([i({type:String,attribute:"data-custom-css"})],Vc.prototype,"customCss",2),jc([i({type:String,attribute:"data-custom-js"})],Vc.prototype,"customJs",2),jc([r()],Vc.prototype,"filterOption",2),jc([r()],Vc.prototype,"isDesignLoading",2),jc([r()],Vc.prototype,"isWidgetLoading",2),jc([r()],Vc.prototype,"review",2),jc([r()],Vc.prototype,"hasEnteredViewport",2),Vc=jc([ae("review-detail-banner-widget")],Vc);const Fc=[Ni,Di,ue`:host{font-family:var(--alp-common-font-family);display:block;container:briefing-widget/inline-size}.transparent{color:#0000}.briefing-widget-container{padding:40px 10px;overflow-y:auto}:host([data-compliance-attached]) .briefing-widget-container{padding-bottom:0}.briefing-widget__tab{border-top:1px solid var(--alp-review-border-gray20);justify-content:space-between;align-items:center;margin-bottom:20px;padding-top:32px;display:flex}.briefing-widget__tab__button{cursor:pointer;color:var(--alp-review-text-gray60);align-items:center;gap:4px;display:flex;position:relative}.briefing-widget__tab__button .option-top{background:var(--alp-review-text-red);border-radius:50%;width:6px;height:6px;position:absolute;top:10px;left:16px}.briefing-widget__tab__button__refresh{background:var(--alp-review-card-gray05);cursor:pointer;border-radius:5px;justify-content:center;align-items:center;padding:8px;display:flex}.briefing-widget__total-review{color:var(--alp-review-text-gray60);margin-bottom:20px}.briefing-widget__content{grid-template-columns:minmax(0,1fr);display:grid}.briefing-widget__content>.briefing-fade{opacity:0;pointer-events:none;grid-area:1/1;min-width:0;transition:opacity .1s}.briefing-widget__content>.briefing-fade.is-visible{opacity:1;pointer-events:auto}.briefing-widget__content>.briefing-fade:not(.is-visible){height:0;overflow:hidden}.briefing-widget__content>review-loading-review.briefing-fade{height:320px}@container briefing-widget (width<=840px){.briefing-widget-container{padding:20px 10px}.briefing-widget__tab__button{display:none}.briefing-widget__tab{border-top:none;padding-top:0}}`];var Bc=Object.defineProperty,Uc=Object.getOwnPropertyDescriptor,Hc=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Uc(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Bc(t,i,s),s};let Gc=class extends(wn(ht)){constructor(){super(...arguments),this.widgetCode="",this.widgetSetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs="",this.totalPages=0,this.totalCount=0,this.filterOption={page:1,page_size:20,sort:Zi,media_only:!1,product_no:"all",search:void 0,widget_code:"",ratings:void 0,surveys:void 0,device:"w",options:void 0},this.currentSelectedFilter=null,this.isWidgetLoading=!0,this.isScrollLoading=!1,this.isListLoading=!0,this.isFirstGetReviews=!0,this.isEmptyReview=!1,this.reviewList=[],this.briefingFilter=null,this.briefingState=[],this.detailFilters=[],this.currentTab="graph",this.currentOption="",this.isOpenFilterSelector=!1,this.firstReviewCount=0,this.reviewLoadingComponent=()=>Je`<review-loading-review></review-loading-review>`}async updated(e){if(super.updated(e),e.has("isInViewport")&&this.isInViewport){this.isDummy&&(this.filterOption.is_dummy=!0),this.productNo="PRODUCT_DETAIL"===await f()?v()||this.productNo:"all",this.filterOption.product_no=this.productNo;try{await this.getWidgetOption(),await Promise.all([this.getReviewList(),this.getReviewMeta()]),W(this,this.customJs),z(this,this.customCss)}catch(e){}finally{this.isWidgetLoading=!1,this.isFirstGetReviews=!1}}}async getReviewList(){const e={...this.filterOption};try{let t;t=window?.ALPHA_PREVIEW?this.previewData:await b(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0),this.reviewList=1===this.filterOption.page?t:[...this.reviewList,...t],this.isFirstGetReviews&&(this.firstReviewCount=this.reviewList?.length??0,this.isEmptyReview=0===this.reviewList.length)}catch(e){}finally{this.isWidgetLoading=!1,this.isScrollLoading=!1,this.isListLoading=!1}}async getReviewMeta(){const e={...this.filterOption};try{let t;t=window?.ALPHA_PREVIEW?this.previewMeta:await x(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_meta_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0),t?.code&&j(t.code),this.totalCount=t.total_count,this.totalPages=Math.ceil(this.totalCount/(this.filterOption.page_size??20)),this.briefingState=t.filter_data?.briefing_stat??[],this.isFirstGetReviews&&(this.briefingFilter=t.filter_data?.briefing_filter??null,this.detailFilters=t.filter_data?.detail_filters?.filter(e=>0!==e.options.length)??[])}catch(e){throw this.errorCode=F(e?.code),Error(e)}}async getWidgetOption(){try{let e;e=window?.ALPHA_PREVIEW?this.previewOption:await A(this.widgetCode,window.ALPHA_REVIEW_EMERGENCY?`/widget_option/${this.widgetCode}.json`:void 0),this.designOption=e,this.filterOption.widget_code=this.widgetCode,this.currentTab="chart"===this.designOption.filter_result_m?"graph":"review"}catch(e){}}changeTab(e){const{value:t}=e.detail;this.currentTab=t}openFilterSelector(e){this.isOpenFilterSelector=e}onScrollBottom(){window?.ALPHA_REVIEW_EMERGENCY||this.isScrollLoading||this.filterOption.page>=this.totalPages||(this.isScrollLoading=!0,this.filterOption.page+=1,this.getReviewList())}resetFilter(e){e.preventDefault(),e.stopPropagation(),this.filterOption={...this.filterOption,ratings:void 0,surveys:void 0,options:void 0},this.currentOption="",this.submitFilter(this.filterOption)}setCurrentSelectedFilter(e){switch(this.briefingFilter?this.briefingFilter?.filter_type:"ratings"){case"ratings":const t=e.ratings?.[0]?.toString()??null;this.currentSelectedFilter=t?"5"===t?si.WIDGETS.BRIEFING.RATING_LABELS.EXCELLENT:"4"===t?si.WIDGETS.BRIEFING.RATING_LABELS.GOOD:"3"===t?si.WIDGETS.BRIEFING.RATING_LABELS.AVERAGE:"2"===t?si.WIDGETS.BRIEFING.RATING_LABELS.FAIR:si.WIDGETS.BRIEFING.RATING_LABELS.POOR:null;break;case"survey":const i=JSON.parse(e.surveys??"{}");this.currentSelectedFilter=i?i[this.briefingFilter?.title??""]?.[0]??"":null;break;case"option":const r=JSON.parse(e.options??"{}");this.currentSelectedFilter=r?r[this.briefingFilter?.title??""]?.[0]??"":null}}async submitFilter(e){this.currentSelectedFilter=null,this.isOpenFilterSelector=!1,this.filterOption=e,this.filterOption.page=1,this.reviewList=[],this.isListLoading=!0,await Promise.all([this.getReviewList(),this.getReviewMeta()])}renderBriefingContent(){return"graph"===this.currentTab?Je`
          <review-briefing-graph
            .currentSelectedFilter=${this.currentSelectedFilter}
            .briefingState=${this.briefingState}
          ></review-briefing-graph>
        `:Je`
          <review-briefing-review
            .designOption=${this.designOption}
            .filterOption=${this.filterOption}
            .reviewList=${this.reviewList}
            .isWidgetLoading=${this.isWidgetLoading}
            @review:onScrollBottom=${this.onScrollBottom}
          ></review-briefing-review>
        `}render(){const e=(this.filterOption?.ratings?.length??0)>0||this.filterOption.surveys||this.filterOption.options;return this.isWidgetLoading?null:!this.isWidgetLoading&&this.errorCode?V(this.errorCode,this.productNo,this.widgetSetCode||this.widgetCode,this.widgetCode):this.isOpenFilterSelector&&!window?.ALPHA_REVIEW_EMERGENCY?Je`
        <review-briefing-filter-selector
          .detailFilters=${this.detailFilters}
          .filterOption=${this.filterOption}
          @review:closeBriefingFilter=${e=>this.openFilterSelector(e.detail?.state)}
          @review:submitFilter=${e=>this.submitFilter(e.detail?.filterOption)}
        ></review-briefing-filter-selector>
      `:Je`
      <div class=${`briefing-widget-container${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`} id=${this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode}>
        <review-header-title
          .designOption=${this.designOption}
          .widgetCode=${this.widgetCode}
        ></review-header-title>
        <div class="briefing-widget-inner">
          ${window?.ALPHA_REVIEW_EMERGENCY?null:Je` <review-briefing-option-filter
                .briefingFilter=${this.briefingFilter}
                .filterOption=${this.filterOption}
                .currentOption=${this.currentOption}
                @review:openBriefingFilterSelector=${e=>this.openFilterSelector(e.detail?.state)}
                @review:submitFilter=${e=>{this.submitFilter(e.detail?.filterOption),this.setCurrentSelectedFilter(e.detail?.filterOption)}}
                @review:changeCurrentOption=${e=>this.currentOption=e.detail?.currentOption}
              ></review-briefing-option-filter>`}

          <div class="briefing-widget__tab">
            <review-common-tab
              .tabs=${[{text:si.WIDGETS.BRIEFING.STATS_OVERVIEW,value:"graph"},{text:si.WIDGETS.BRIEFING.VIEW_ALL,value:"review"}]}
              .currentTab=${this.currentTab}
              @changeTab=${this.changeTab}
            ></review-common-tab>

            <div class="briefing-widget__tab__button" @click=${()=>this.openFilterSelector(!0)}>
              ${e?Je`<div class="option-top"></div>`:null}
              <review-custom-icon
                type="filter"
                width="20"
                height="20"
                color="var(--alp-review-text-gray60)"
              ></review-custom-icon>
              <p class="alp-body15">${si.WIDGETS.BRIEFING.REVIEWS_FOR_ME}</p>
              ${e?Je`<review-custom-icon
                    class="briefing-widget__tab__button__refresh"
                    type="refresh"
                    width="20"
                    height="20"
                    color="var(--alp-review-text-gray60)"
                    @click=${e=>this.resetFilter(e)}
                  ></review-custom-icon>`:null}
            </div>
          </div>

          <div class="briefing-widget__total-review">
          <p class="alp-body15">
            ${this.isListLoading?Je`<span class="transparent">empty</span>`:Je` 
              ${si.WIDGETS.BRIEFING.TOTAL_REVIEWS_PREFIX}
              <span class="alp-ht alp-semi-bold">${this.totalCount}</span>
              ${oi()?`review${0===this.totalCount?"":"s"} written.`:"\uba85\uc774 \ub9ac\ubdf0\ub97c \uc791\uc131\ud588\uc5b4\uc694."}
                `}
            </p>
          </div>
          <div class="briefing-widget__content">
            <review-loading-review
              class="briefing-fade${this.isListLoading?" is-visible":""}"
            ></review-loading-review>
            <div class="briefing-fade${this.isListLoading?"":" is-visible"}">
              ${this.renderBriefingContent()}
            </div>
          </div>
        </div>
      </div>
    `}};Gc.styles=Fc,Hc([i({type:Object,attribute:"data-widget-preview-data"})],Gc.prototype,"previewData",2),Hc([i({type:Object,attribute:"data-widget-preview-option"})],Gc.prototype,"previewOption",2),Hc([i({type:Object,attribute:"data-widget-preview-meta"})],Gc.prototype,"previewMeta",2),Hc([i({type:String,attribute:"data-widget-code"})],Gc.prototype,"widgetCode",2),Hc([i({type:String,attribute:"data-widget-set-code"})],Gc.prototype,"widgetSetCode",2),Hc([i({type:String,attribute:"data-product-no"})],Gc.prototype,"productNo",2),Hc([i({type:String,attribute:"data-widget-custom-class"})],Gc.prototype,"widgetCustomClass",2),Hc([i({type:String,attribute:"data-widget-custom-id"})],Gc.prototype,"widgetCustomId",2),Hc([i({type:Boolean,attribute:"data-dummy"})],Gc.prototype,"isDummy",2),Hc([i({type:String,attribute:"data-custom-class"})],Gc.prototype,"customClass",2),Hc([i({type:String,attribute:"data-custom-id"})],Gc.prototype,"customId",2),Hc([i({type:String,attribute:"data-custom-css"})],Gc.prototype,"customCss",2),Hc([i({type:String,attribute:"data-custom-js"})],Gc.prototype,"customJs",2),Hc([r()],Gc.prototype,"totalPages",2),Hc([r()],Gc.prototype,"totalCount",2),Hc([r()],Gc.prototype,"filterOption",2),Hc([r()],Gc.prototype,"currentSelectedFilter",2),Hc([r()],Gc.prototype,"designOption",2),Hc([r()],Gc.prototype,"isWidgetLoading",2),Hc([r()],Gc.prototype,"isScrollLoading",2),Hc([r()],Gc.prototype,"isListLoading",2),Hc([r()],Gc.prototype,"isFirstGetReviews",2),Hc([r()],Gc.prototype,"isEmptyReview",2),Hc([r()],Gc.prototype,"reviewList",2),Hc([r()],Gc.prototype,"briefingFilter",2),Hc([r()],Gc.prototype,"briefingState",2),Hc([r()],Gc.prototype,"detailFilters",2),Hc([r()],Gc.prototype,"currentTab",2),Hc([r()],Gc.prototype,"currentOption",2),Hc([r()],Gc.prototype,"isOpenFilterSelector",2),Hc([r()],Gc.prototype,"firstReviewCount",2),Gc=Hc([ae("review-briefing-widget")],Gc);var qc=Object.defineProperty,Yc=Object.getOwnPropertyDescriptor,Kc=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Yc(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&qc(t,i,s),s};let Zc=class extends ht{constructor(){super(...arguments),this.currentSelectedFilter=null,this.briefingState=[],this.surveyRatingList=[],this.currentIndex=0}createRenderRoot(){return this}willUpdate(e){if(e.has("briefingState")){const e=e=>{if("number"!=typeof Number(e))return e;switch(e){case"5":return si.WIDGETS.BRIEFING.RATING_LABELS.EXCELLENT;case"4":return si.WIDGETS.BRIEFING.RATING_LABELS.GOOD;case"3":return si.WIDGETS.BRIEFING.RATING_LABELS.AVERAGE;case"2":return si.WIDGETS.BRIEFING.RATING_LABELS.FAIR;case"1":return si.WIDGETS.BRIEFING.RATING_LABELS.POOR}},t=si.WIDGETS.BRIEFING.RATING;this.surveyRatingList=this.briefingState?.filter(e=>(e.stats?.length??0)>0)?.map(i=>[...i.stats.map(r=>({name:i.title===t?e(r?.option_name)??"":r?.option_name??"",value:r?.count??0}))])??[],this.currentIndex=0}}updated(e){e.has("briefingState")&&this.initialSwiper()}initialSwiper(){const e=this.querySelector("#sw-briefing-graph");e&&(this.swiper?.destroy?.(!0,!0),this.swiper=n({container:e,styleRoot:this,options:{freeMode:{enabled:!1},slidesPerView:1,spaceBetween:20,loop:!1},event:{slidePrevTransitionStart:()=>{this.currentIndex=this.swiper?.activeIndex??0},slideNextTransitionStart:()=>{this.currentIndex=this.swiper?.activeIndex??0}}}))}nextSlide(){this.currentIndex!==this.surveyRatingList.length-1&&this.swiper?.slideNext()}prevSlide(){0!==this.currentIndex&&this.swiper?.slidePrev()}render(){return 0===this.surveyRatingList.length?null:Je`
      <style>.briefing-graph-swiper { width: 100%; min-width: 0; max-width: 100%; overflow: hidden; } review-briefing-graph { display: block; width: 100%; } .briefing-graph-layout { display: grid; grid-template-columns: 44px 1fr 44px; gap: 6px; } review-highlight-graph { width: 100%; } .briefing-graph-content { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; min-height: 320px; background-color: var(--alp-review-card-gray03); container-type: inline-size; container-name: highlight; } .briefing-graph-content > p { text-align: center !important; } .briefing-graph-slide-button { display: flex; align-items: center; justify-content: center; border: 1px solid var(--alp-review-border-gray30); cursor: pointer; border-radius: 8px; color: var(--alp-review-icon-gray60); } .briefing-graph-slide-button.is-disabled { border: 1px solid var(--alp-review-border-gray08); color: var(--alp-review-icon-gray10); } .briefing-graph-slide-button-mobile { display: none; } @media (max-width: 840px) { .briefing-graph-layout { display: block; min-width: 100%; } .briefing-graph-content { padding: 20px 22px; } .briefing-graph-slide-button { display: none; } .briefing-graph-slide-button-mobile { display: grid; grid-template-columns: 1fr 1fr; margin-top: 14px; } .briefing-graph-slide-button-mobile > div { display: flex; align-items: center; width: 100%; padding: 10px; border: 1px solid var(--alp-review-border-gray30); color: var(--alp-review-icon-gray60); cursor: pointer; } .briefing-graph-slide-button-mobile .prev.is-disabled, .briefing-graph-slide-button-mobile .next.is-disabled { border: 1px solid var(--alp-review-border-gray08); color: var(--alp-review-icon-gray10); } .briefing-graph-slide-button-mobile .prev { justify-content: flex-start; border-radius: 4px 0 0 4px; } .briefing-graph-slide-button-mobile .next { justify-content: flex-end; margin-left: -1px; border-radius: 0 4px 4px 0; } }</style>

      <div class="briefing-graph-layout">
        <div
          class="briefing-graph-slide-button ${0===this.currentIndex?"is-disabled":""}"
          @click="${this.prevSlide}"
        >
          <review-custom-icon
            .type="${ft}"
            width="32"
            height="32"
            .color="${0===this.currentIndex?"var(--alp-review-icon-gray20)":"var(--alp-review-icon-gray60)"}"
          ></review-custom-icon>
        </div>

        <div id="sw-briefing-graph" class="swiper-container briefing-graph-swiper">
          <div class="swiper-wrapper">
            ${this.surveyRatingList?.map(e=>{const t=Math.max(...e?.map(e=>e.value)??[]),i=e?.findIndex(e=>e.value===t),r=e?.reduce((e,t)=>e+t.value,0)??0;return Je`
                <div class="swiper-slide briefing-graph-content">
                  <p class="alp-h24 alp-bold alp-line15">
                    ìíì êµ¬ë§¤í
                    <span class="alp-ht">${r>0?(t/r*100).toFixed(0):"0"}%</span> ê³ ê°ëì´<br />
                    <span class="alp-ht">${e[i]?.name}</span>
                  </p>

                  <review-highlight-graph
                    .type="column"
                    .currentValue=${this.currentSelectedFilter??e[i]?.name}
                    .ratingsStatType="ratio"
                    .ratingList="${e}"
                    .totalCount="${r}"
                  />
                </div>
              `})}
          </div>
        </div>

        <div
          class="briefing-graph-slide-button ${this.currentIndex===this.surveyRatingList.length-1?"is-disabled":""}"
          @click="${this.nextSlide}"
        >
          <review-custom-icon
            .type="${yt}"
            width="32"
            height="32"
            .color="${this.currentIndex===this.surveyRatingList.length-1?"var(--alp-review-icon-gray20)":"var(--alp-review-icon-gray60)"}"
          ></review-custom-icon>
        </div>
      </div>

      <div class="briefing-graph-slide-button-mobile">
        <div
          class="prev ${0===this.currentIndex?"is-disabled":""}"
          @click="${this.prevSlide}"
        >
          <review-custom-icon
            .type="${ft}"
            width="32"
            height="32"
            .color="${0===this.currentIndex?"var(--alp-review-icon-gray20)":"var(--alp-review-icon-gray60)"}"
          ></review-custom-icon>
          <p class="alp-body16">ì´ì </p>
        </div>

        <div
          class="next ${this.currentIndex===this.surveyRatingList.length-1?"is-disabled":""}"
          @click="${this.nextSlide}"
        >
          <p class="alp-body16">ë¤ì</p>
          <review-custom-icon
            .type="${yt}"
            width="32"
            height="32"
            .color="${this.currentIndex===this.surveyRatingList.length-1?"var(--alp-review-icon-gray20)":"var(--alp-review-icon-gray60)"}"
          ></review-custom-icon>
        </div>
      </div>
    `}};Kc([i({type:String})],Zc.prototype,"currentSelectedFilter",2),Kc([i({type:Array})],Zc.prototype,"briefingState",2),Kc([r()],Zc.prototype,"surveyRatingList",2),Kc([r()],Zc.prototype,"currentIndex",2),Zc=Kc([ae("review-briefing-graph")],Zc);var Jc=Object.defineProperty,Qc=Object.getOwnPropertyDescriptor,Xc=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Qc(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Jc(t,i,s),s};let eh=class extends ht{constructor(){super(...arguments),this.reviewList=[],this.isWidgetLoading=!1,this.isLoading=!1}createRenderRoot(){return this}updated(e){super.updated(e),this.isLoading=this.isWidgetLoading}openDetailPopup(e,t){const i=this.reviewList.findIndex(t=>t.id?.toString()===e);this.filterOption.page=Math.floor(i/this.filterOption.page_size)+1,this.filterOption.page_size=5,gn({reviewId:e,option:this.filterOption,reviewIndex:t,backupList:this.reviewList})}dispatchScrollEvent(){const e=this.querySelector(".briefing-review-container");if(e&&e.scrollTop+e.clientHeight>=e.scrollHeight-10){if(this.isLoading)return;this.dispatchEvent(new CustomEvent("review:onScrollBottom",{bubbles:!0,composed:!0}))}}render(){return Je`
      <style>.briefing-review-container { width: 100%; display: flex; flex-direction: column; gap: 10px; overflow-y: scroll; max-height: 318px; } .briefing-review-item { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 20px 16px; background-color: var(--alp-review-card-gray03); border-radius: 8px; cursor: pointer; } .briefing-review-item__content { display: flex; flex-direction: column; gap: 6px; width: 100%; } .briefing-review-item__content > p { color: var(--alp-review-text-gray100); } .briefing-review-item__content__info { display: flex; align-items: center; gap: 3px; color: var(--alp-review-text-gray50); } .briefing-review-item__content__info__ratings { display: flex; align-items: center; margin-right: 6px; } .briefing-review-item__content__info__ratings p { color: var(--alp-review-text-gray50); } .briefing-review-ratings { display: flex; align-items: center; } .briefing-review-item__media { min-width: 48px; max-width: 48px; min-height: 48px; max-height: 48px; border-radius: 6px; overflow: hidden; } @container (max-width: 440px) { .briefing-review-item { padding: 16px; } .briefing-review-item__content > p { font-size: 15px; } }</style>
      <div
        class="briefing-review-container custom-scrollbar"
        @scroll=${()=>this.dispatchScrollEvent()}
      >
        ${this.reviewList.map((e,t)=>Je`
            <div
              class="briefing-review-item"
              @click=${()=>this.openDetailPopup(e.id?.toString(),t)}
            >
              <div class="briefing-review-item__content">
                <p class="line-wrap alp-body14 alp-medium">${e.content}</p>
                <div class="briefing-review-item__content__info">
                  ${this.designOption.ratings?Je` <div class="briefing-review-item__content__info__ratings">
                        <review-star-icon size="16"></review-star-icon>
                        <p class="alp-body14 alp-bold">${e.ratings}</p>
                      </div>`:null}
                  <span class="alp-body12">${ns(e)}</span>
                  ${(e.survey?.length??0)>0?Je`
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2"
                          height="9"
                          viewBox="0 0 2 9"
                          fill="none"
                        >
                          <path d="M1 0.755859L1 8.75586" stroke="#1E293B" stroke-opacity="0.1" />
                        </svg>
                        <review-survey-answer
                          type="row"
                          .surveyAnswer=${e.survey}
                        ></review-survey-answer>
                      `:null}
                </div>
              </div>

              <div class="briefing-review-item__media">
                <review-review-media
                  .reviewMedia=${e.ordered_media?.[0]}
                  .productImg="${e.product?.detail_image}"
                ></review-review-media>
              </div>
            </div>
          `)}
      </div>
    `}};Xc([i({type:Array})],eh.prototype,"reviewList",2),Xc([i({type:Object})],eh.prototype,"designOption",2),Xc([i({type:Boolean})],eh.prototype,"isWidgetLoading",2),Xc([i({type:Object})],eh.prototype,"filterOption",2),Xc([r()],eh.prototype,"isLoading",2),eh=Xc([ae("review-briefing-review")],eh);var th=Object.defineProperty,ih=Object.getOwnPropertyDescriptor,rh=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ih(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&th(t,i,s),s};let oh=class extends ht{constructor(){super(...arguments),this.currentOption="",this.options=[],this.isOpenOptionSelector=!1}createRenderRoot(){return this}updated(e){if(e.has("briefingFilter")){if(this.initialSwiper(),!this.briefingFilter)return this.options=[{value:"5",label:"5"},{value:"4",label:"4"},{value:"3",label:"3"},{value:"2",label:"2"},{value:"1",label:"1"}],void(this.briefingFilter={title:si.WIDGETS.BRIEFING.RATING,filter_type:"ratings",options:["5","4","3","2","1"]});this.options=this.briefingFilter?.options?.map(e=>({value:e,label:e}))??[]}}openOptionSelector(){0!==this.options.length&&(this.isOpenOptionSelector=!this.isOpenOptionSelector)}openFilterSelector(){this.dispatchEvent(new CustomEvent("review:openBriefingFilterSelector",{bubbles:!0,composed:!0,detail:{state:!0}}))}getOptionLabel(e){return this.options.find(t=>t.value===e)?.label??e}selectOption(e,t){switch(e.filter_type){case"ratings":this.filterOption.ratings?.includes(Number(t))?(this.filterOption.ratings=this.filterOption.ratings?.filter(e=>e!==Number(t)),t=null):this.filterOption.ratings=[Number(t)];break;case"survey":const i=JSON.parse(this.filterOption.surveys??"{}");i[e.title]=i[e.title]?.includes(t)?i[e.title].filter(e=>e!==t):[t],0===i[e.title]?.length&&delete i[e.title],this.filterOption.surveys=JSON.stringify(i);break;case"option":const r=JSON.parse(this.filterOption.options??"{}");r[e.title]=r[e.title]?.includes(t)?r[e.title].filter(e=>e!==t):[t],0===r[e.title]?.length&&delete r[e.title],this.filterOption.options=JSON.stringify(r),this.isOpenOptionSelector=!1}this.onChangeCurrentOption(this.currentOption===t?"":t),this.onSubmitFilter()}onSubmitFilter(){this.dispatchEvent(new CustomEvent("review:submitFilter",{bubbles:!0,composed:!0,detail:{filterOption:this.filterOption}}))}onChangeCurrentOption(e){this.dispatchEvent(new CustomEvent("review:changeCurrentOption",{bubbles:!0,composed:!0,detail:{currentOption:e}}))}initialSwiper(){this.swiper=n({container:this.querySelector("#briefing-option-filter-button-swiper"),styleRoot:this,options:{freeMode:{enabled:!1},slidesPerView:"auto",spaceBetween:10}})}render(){return Je`
      <style>.briefing-option-filter-container { display: flex; flex-direction: column; gap: 20px; position: relative; margin-bottom: 32px; } .briefing-option-filter-container__header { display: flex; align-items: center; justify-content: center; gap: 4px; } .briefing-option-filter-container__header > h2 { color: var(--alp-review-text-gray100); text-align: center !important; } .briefing-option-filter-container__header > .filter-title-mobile { display: none; } .briefing-option-filter-container__header > .filter-title-pc { display: block; } .briefing-option-filter-container__header > .option-filter { display: none; } .option-filter > p { color: var(--alp-review-text-gray60); } .briefing-option-filter-selector { display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--alp-review-border-gray20); border-radius: 8px; padding: 14px; background: var(--alp-review-card-gray03); color: var(--alp-review-text-gray60); cursor: pointer; } .briefing-option-filter-selector.is-active { color: var(--alp-review-text-gray100); background: var(--alp-review-card-white); } .briefing-option-filter-options { position: absolute; top: calc(100% + 10px); left: 0; z-index: 100; width: 100%; border: 1px solid var(--alp-review-border-gray20); border-radius: 8px; background: var(--alp-review-bg-white); max-height: 250px; overflow-y: auto; } .briefing-option-filter-options > div { display: flex; align-items: center; justify-content: space-between; min-height: 50px; max-height: 50px; padding: 0 14px; cursor: pointer; transition: background 0.15s ease-in-out; &:hover { background: var(--alp-review-card-gray03); } } .briefing-option-filter-button { display: flex; gap: 8px; flex-wrap: wrap; max-width: 100%; margin: 0 auto; overflow: hidden; } .briefing-option-filter-button .swiper-wrapper { width: fit-content; } .briefing-option-filter-button .option-button { display: flex; justify-content: center; align-items: center; padding: 20px 14px; margin: 1px 0; min-width: 85px; width: fit-content; border-radius: 8px; border: 1px solid var(--alp-review-border-gray30); background: var(--alp-review-card-white); cursor: pointer; box-sizing: border-box; } .briefing-option-filter-button .option-button.is-active { border: 2px solid var(--alp-review-border-gray100); margin: 0; color: var(--alp-review-text-gray100); background: var(--alp-review-card-gray05); font-weight: 600; svg { path { fill: var(--alp-review-icon-gray100); } } } @container briefing-widget (max-width: 840px) { .briefing-option-filter-container { gap: 24px; margin-bottom: 18px; } .briefing-option-filter-container__header > .filter-title-mobile { display: block; } .briefing-option-filter-container__header > .filter-title-pc { display: none; } .briefing-option-filter-container__header { justify-content: space-between; } .briefing-option-filter-container__header > h2 { text-align: left !important; } .briefing-option-filter-container__header > .option-filter { display: flex; align-items: center; gap: 4px; } .briefing-option-filter-button .option-button { min-width: fit-content; } }</style>

      <div class="briefing-option-filter-container">
        <div class="briefing-option-filter-container__header">
          <h2 class="alp-body18 alp-semi-bold filter-title-pc">
            ${si.WIDGETS.BRIEFING.BROWSE_REVIEWS_BY_QUESTION.replace("reviews by","reviews by "+this.briefingFilter?.title).replace("\ubcc4",this.briefingFilter?.title+"\ubcc4")}
          </h2>
          <h2 class="alp-body18 alp-semi-bold filter-title-mobile">
            ${si.WIDGETS.BRIEFING.BROWSE_REVIEWS_BY.replace("reviews by","reviews by "+this.briefingFilter?.title).replace("\ubcc4",this.briefingFilter?.title+"\ubcc4")}
          </h2>

          <div class="option-filter" @click=${this.openFilterSelector}>
            <p class="alp-body15">${si.WIDGETS.BRIEFING.FILTER}</p>
            <review-custom-icon
              type="filter"
              width="20"
              height="20"
              color="var(--alp-review-icon-gray40)"
            ></review-custom-icon>
          </div>
        </div>

        ${"option"===this.briefingFilter?.filter_type?Je`<div
              @click=${this.openOptionSelector}
              class="briefing-option-filter-selector ${""!==this.currentOption?"is-active":""}"
            >
              <p class="alp-body15 alp-medium">
                ${""!==this.currentOption?this.currentOption:si.WIDGETS.BRIEFING.SELECT_OPTION}
              </p>
              <review-custom-icon
                type="arrow-down"
                width="18"
                height="18"
                color="var(--alp-review-icon-gray40)"
              ></review-custom-icon>
            </div>`:Je`
              <div
                class="swiper-container briefing-option-filter-button"
                id="briefing-option-filter-button-swiper"
              >
                <div class="swiper-wrapper">
                  ${this.options.map(e=>Je` <div
                      class="swiper-slide option-button ${this.currentOption===e.label?"is-active":""}"
                      @click=${()=>this.selectOption(this.briefingFilter,e.value)}
                    >
                      ${"ratings"===this.briefingFilter?.filter_type?Je`
                            ${Array.from({length:Number(e.value)}).map(()=>Je`<review-star-icon
                                size="16"
                                color="var(--alp-review-icon-gray20)"
                              ></review-star-icon>`)}
                          `:e.label}
                    </div>`)}
                </div>
              </div>
            `}
        ${this.isOpenOptionSelector?Je`<div class="briefing-option-filter-options custom-scrollbar">
              ${this.options.map(e=>Je`<div
                    @click=${()=>this.selectOption(this.briefingFilter,e.value)}
                  >
                    ${e.label}
                  </div>`)}
            </div>`:""}
      </div>
    `}};rh([i({type:Object})],oh.prototype,"briefingFilter",2),rh([i({type:Object})],oh.prototype,"filterOption",2),rh([i({type:String})],oh.prototype,"currentOption",2),rh([r()],oh.prototype,"options",2),rh([r()],oh.prototype,"isOpenOptionSelector",2),oh=rh([ae("review-briefing-option-filter")],oh);var sh=Object.defineProperty,nh=Object.getOwnPropertyDescriptor,ah=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?nh(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&sh(t,i,s),s};let ph=class extends ht{constructor(){super(...arguments),this.openedSelectorIndex=null}createRenderRoot(){return this}closeFilterSelector(){this.dispatchEvent(new CustomEvent("review:closeBriefingFilter",{bubbles:!0,composed:!0,detail:{state:!1}}))}selectOption(e,t){switch(e.filter_type){case"ratings":this.filterOption.ratings=this.filterOption.ratings?.includes(Number(t))?this.filterOption.ratings?.filter(e=>e!==Number(t)):[...this.filterOption.ratings??[],Number(t)];break;case"survey":const i=JSON.parse(this.filterOption.surveys??"{}");i[e.title]=i?.[e.title]?.includes(t)?i[e.title].filter(e=>e!==t):[...i[e.title]??[],t],this.filterOption.surveys=JSON.stringify(i);break;case"option":const r=JSON.parse(this.filterOption.options??"{}");r[e.title]=r?.[e.title]?.includes(t)?r[e.title].filter(e=>e!==t):[...r[e.title]??[],t],this.filterOption.options=JSON.stringify(r)}this.requestUpdate()}onSubmitFilter(){this.dispatchEvent(new CustomEvent("review:submitFilter",{bubbles:!0,composed:!0,detail:{filterOption:this.filterOption}}))}resetFilter(){this.filterOption={...this.filterOption,ratings:void 0,surveys:void 0,options:void 0}}render(){return Je`
      <style>.briefing-filter-selector-container { display: flex; flex-direction: column; gap: 10px; padding: 40px 10px; min-height: 680px; } .briefing-filter-selector-header { display: flex; align-items: center; gap: 8px; } .briefing-filter-selector-header > .filter-title-pc { display: block; } .briefing-filter-selector-header > .filter-title-mobile { display: none; } .briefing-filter-selector-header > svg { cursor: pointer; } .briefing-filter-selector-header > h2 { color: var(--alp-review-text-gray100); margin-right: auto; } .briefing-filter-selector-scroll { max-height: 500px; overflow-y: scroll; } .briefing-filter-selector-scroll__inner { display: flex; flex-direction: column; gap: 12px; } .briefing-option-filter-selector-container { padding: 2px; } .briefing-option-filter-selector-container.is-active { border-radius: 10px; border: 2px solid var(--alp-review-border-gray100); } .briefing-option-filter-selector { display: flex; align-items: center; gap: 10px; border: 1px solid var(--alp-review-border-gray20); border-radius: 8px; padding: 14px; background: var(--alp-review-card-white); color: var(--alp-review-text-gray60); cursor: pointer; } .briefing-option-filter-selector > p { margin-right: auto; } .briefing-option-filter-selector .selector-options { color: var(--alp-common-color); } .briefing-option-filter-selector.is-active { color: var(--alp-review-text-gray100); background: var(--alp-review-card-white); border-radius: 8px 8px 0 0; } .briefing-option-filter-selector-options { background: var(--alp-review-card-white); border: 1px solid var(--alp-review-border-gray20); border-radius: 0 0 8px 8px; padding: 10px; border-top: none; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; } .briefing-option-filter-selector-options > div { display: flex; align-items: center; justify-content: center; width: 100%; padding: 10px 0; border-radius: 8px; border: 1px solid var(--alp-review-border-gray10); background: var(--alp-review-card-white); cursor: pointer; color: var(--alp-review-text-gray60); } .briefing-option-filter-selector-options > div.is-active { border: none; background: var(--alp-review-card-gray100); color: var(--alp-review-text-white); border: 1px solid transparent; svg { path { fill: var(--alp-review-text-white); } } } .briefing-filter-button { display: flex; align-items: center; gap: 5px; padding: 11px 20px; border-radius: 8px; background: var(--alp-review-card-gray100); cursor: pointer; } .briefing-filter-button:nth-of-type(1) { background: var(--alp-review-card-white); border: 1px solid var(--alp-review-border-gray20); color: var(--alp-review-text-gray60); margin-left: auto; } .briefing-filter-button:nth-of-type(2) { background: var(--alp-review-card-gray100); color: var(--alp-review-text-white); } @container briefing-widget (max-width: 840px) { .briefing-filter-selector-header > .filter-title-pc { display: none; } .briefing-filter-selector-header > .filter-title-mobile { display: block; } .briefing-filter-button { padding: 0 20px; min-height: 36px; } }</style>

      <div class="briefing-filter-selector-container">
        <div class="briefing-filter-selector-header">
          <svg
            @click=${this.closeFilterSelector}
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path
              d="M11.8066 4.79297C12.1972 4.40244 12.8302 4.40244 13.2207 4.79297C13.6112 5.1835 13.6112 5.81652 13.2207 6.20703L7.92773 11.5H19.5137C20.066 11.5 20.5137 11.9477 20.5137 12.5C20.5136 13.0522 20.0659 13.5 19.5137 13.5H7.92773L13.2207 18.793C13.6112 19.1835 13.6112 19.8165 13.2207 20.207C12.8302 20.5975 12.1972 20.5975 11.8066 20.207L4.80664 13.207C4.7755 13.1759 4.74785 13.1424 4.72168 13.1084C4.7079 13.0905 4.6942 13.0725 4.68164 13.0537C4.65563 13.0147 4.63323 12.9741 4.61328 12.9326C4.59134 12.887 4.57155 12.8401 4.55664 12.791C4.5441 12.7496 4.53539 12.7074 4.52832 12.665C4.51938 12.6113 4.51368 12.5563 4.51367 12.5C4.51367 12.4203 4.52341 12.3428 4.54102 12.2686C4.54588 12.248 4.55046 12.2273 4.55664 12.207C4.57154 12.1583 4.59144 12.1117 4.61328 12.0664C4.63337 12.0247 4.65542 11.9835 4.68164 11.9443C4.71817 11.8897 4.76036 11.8393 4.80664 11.793L11.8066 4.79297Z"
              fill="var(--alp-review-icon-gray10)"
            />
          </svg>
          <h2 class="alp-body18 alp-semi-bold filter-title-pc">
            ${si.WIDGETS.BRIEFING.REVIEWS_FOR_ME}
          </h2>
          <h2 class="alp-body18 alp-semi-bold filter-title-mobile">
            ${si.WIDGETS.BRIEFING.FILTER}
          </h2>

          <button class="briefing-filter-button alp-semi-bold" @click=${this.resetFilter}>
            <review-custom-icon
              type="refresh"
              width="16"
              height="16"
              color="var(--alp-review-icon-gray40)"
            ></review-custom-icon>
            ${si.WIDGETS.BRIEFING.RESET}
          </button>
          <button class="briefing-filter-button alp-semi-bold" @click=${this.onSubmitFilter}>
            ${si.WIDGETS.BRIEFING.APPLY}
          </button>
        </div>

        <div class="briefing-filter-selector-scroll custom-scrollbar">
          <div class="briefing-filter-selector-scroll__inner">
            ${this.detailFilters?.map((e,t)=>{const i=this.openedSelectorIndex===t,r="ratings"===e.filter_type?this.filterOption.ratings:"survey"===e.filter_type?JSON.parse(this.filterOption.surveys??"{}")[e.title]:JSON.parse(this.filterOption.options??"{}")[e.title];return Je`
                <div class="briefing-option-filter-selector-container ${i?"is-active":""}">
                  <div
                    @click=${()=>{this.openedSelectorIndex=i?null:t}}
                    class="briefing-option-filter-selector ${i?"is-active":""}"
                  >
                    <p class="alp-body15 alp-medium">${e.title}</p>

                    <div class="selector-options alp-body16 alp-bold">
                      ${r?.map(e=>"number"==typeof e?e+si.WIDGETS.BRIEFING.POINT:e).join(",")}
                    </div>
                    <review-custom-icon
                      type="arrow-down"
                      width="18"
                      height="18"
                      color="var(--alp-review-icon-gray40)"
                      style=${i?"transform: rotate(180deg);":""}
                    ></review-custom-icon>
                  </div>

                  ${i?Je`
                        <div class="briefing-option-filter-selector-options custom-scrollbar">
                          ${e?.options?.map(t=>Je` <div
                                class="${r?.includes("ratings"===e.filter_type?Number(t):t)?"is-active":""}"
                                @click=${()=>this.selectOption(e,t)}
                              >
                                ${"ratings"===e.filter_type?Je`
                                      ${Array.from({length:Number(t)}).map(()=>Je`<review-star-icon
                                          size="16"
                                          color="var(--alp-review-icon-gray20)"
                                        ></review-star-icon>`)}
                                    `:t}
                              </div>`)}
                        </div>
                      `:null}
                </div>
              `})}
          </div>
        </div>
      </div>
    `}};ah([i({type:Array})],ph.prototype,"detailFilters",2),ah([i({type:Object})],ph.prototype,"filterOption",2),ah([r()],ph.prototype,"openedSelectorIndex",2),ph=ah([ae("review-briefing-filter-selector")],ph);const lh=[Ni,Di,Ra,ue`:host{font-family:var(--alp-review-font-family)}.notice-widget-container{flex-direction:column;padding:0 10px 40px;display:flex}.notice-widget-item{cursor:pointer;align-items:center;gap:12px;padding:14px 0;display:flex;& span{margin-left:2px}}.notice-widget-item review-at-date{margin-left:auto}.notice-title{align-items:center;gap:3px;display:flex}.notice-badge{background:var(--alp-review-card-gray07,#1e293b0d);border-radius:4px;width:fit-content;min-width:fit-content;max-width:fit-content;padding:7px 14px;display:flex}.notice-border{border-bottom:1px solid var(--alp-review-border-gray20,#1e293b1a)}.notice-content{all:initial;box-sizing:border-box;background:var(--alp-review-bg-gray02,#1e293b05);padding:20px 24px;display:block;overflow:hidden}@media (width<=440px){.notice-widget-container{padding-bottom:20px}.notice-widget-item review-at-date{display:none}.notice-content{padding:18px}.notice-content img{width:100%!important}}`];var dh=Object.defineProperty,ch=Object.getOwnPropertyDescriptor,hh=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?ch(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&dh(t,i,s),s};let gh=class extends ht{constructor(){super(...arguments),this.content=""}render(){return Je`<div>${Pc(this.content??"")}</div>`}};gh.styles=ue`:host{box-sizing:border-box;display:block}`,hh([i({type:String})],gh.prototype,"content",2),gh=hh([ae("review-notice-sandbox")],gh);var uh=Object.defineProperty,wh=Object.getOwnPropertyDescriptor,vh=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?wh(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&uh(t,i,s),s};let mh=class extends(wn(ht)){constructor(){super(),this.widgetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs="",this.filterOption={page:1,page_size:10,product_no:"all",widget_code:"",device:"mobile"===P()?"m":"w"},this.noticeList=[],this.backupNoticeList=[],this.isDesignLoading=!0,this.isWidgetLoading=!0,this.safe="",this.totalPages=0,this.contentOpenMap={},this.noticeBadgeText="\uacf5\uc9c0",this.eventBadgeText="\uc774\ubca4\ud2b8",this.sortNoticeList=e=>{const t=[];for(let i=0;i<this.totalPages;i++)t.push(e.slice(i*this.filterOption.page_size,(i+1)*this.filterOption.page_size));return t},this.noticeBadgeText=si.WIDGETS.NOTICE.NOTICE,this.eventBadgeText=si.WIDGETS.NOTICE.EVENT}async updated(e){if(super.updated(e),e.has("isInViewport")){if(!this.isInViewport)return;this.isDummy&&(this.filterOption.is_dummy=!0),this.productNo="PRODUCT_DETAIL"===await f()?v()||this.productNo:"all",this.filterOption.product_no=this.productNo;try{await this.getWidgetOption(),await Promise.all([this.getMeta(),this.getReviewList()]),z(this,this.customCss??"")}catch(e){}}}disconnectedCallback(){super.disconnectedCallback()}async getReviewList(){const e={...this.filterOption};if(!window?.ALPHA_REVIEW_EMERGENCY||0===this.noticeList.length)try{let t;t=window?.ALPHA_PREVIEW?this.previewData:await b(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0),window.ALPHA_REVIEW_EMERGENCY&&(this.totalPages=aa(t,this.filterOption.page_size,this.totalPages),this.backupNoticeList=this.sortNoticeList(t)),this.noticeList=t,this.ensureInitialOpenMap(),W(this,this.customJs)}catch(e){}finally{this.isWidgetLoading=!1}}async getMeta(){const e={...this.filterOption};try{let t;t=window?.ALPHA_PREVIEW?this.previewMeta:await x(e,window.ALPHA_REVIEW_EMERGENCY?`/widget_meta_data/${this.widgetCode}/products/${this.productNo}/device/${this.filterOption.device}.json`:void 0),this.totalPages=t.total_page}catch(e){}}async getWidgetOption(){try{let e;e=window?.ALPHA_PREVIEW?this.previewOption:await A(this.widgetCode,window.ALPHA_REVIEW_EMERGENCY?`/widget_option/${this.widgetCode}.json`:void 0),this.designOption=e,this.filterOption.widget_code=this.widgetCode,this.filterOption.page_size=this.designOption.page_length_notice??0}catch(e){}finally{this.isDesignLoading=!1}}onPaginationPrevClick(){this.filterOption.page<=1||(this.filterOption.page=this.filterOption.page-1,this.getReviewList())}onPaginationNextClick(){this.filterOption.page>=this.totalPages||(this.filterOption.page=this.filterOption.page+1,this.getReviewList())}onPaginationBulletClick(){this.filterOption.page=this.filterOption.pag-1,this.getReviewList()}buildNoticeKey(e){return`${e.title}__${e.created_at}`}toggleContent(e){const t=this.buildNoticeKey(e);this.contentOpenMap={...this.contentOpenMap,[t]:!this.contentOpenMap[t]}}ensureInitialOpenMap(){const e=Number(this.designOption?.notice_expand??0);if(!e||e<=0)return;if(!Array.isArray(this.noticeList)||0===this.noticeList.length)return;const t={...this.contentOpenMap},i=Math.min(e,this.noticeList.length);for(let e=0;e<i;e++){const i=this.buildNoticeKey(this.noticeList[e]);Object.prototype.hasOwnProperty.call(t,i)||(t[i]=!0)}this.contentOpenMap=t}render(){const e=window.ALPHA_REVIEW_EMERGENCY?this.backupNoticeList[this.filterOption.page-1]:this.noticeList;return this.isDesignLoading||0===this.noticeList?.length||!Array.isArray(this.noticeList)?Je``:Je`
      <div class=${`notice-widget-container${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`} id=${this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode}>
        <review-header-title
          .designOption=${this.designOption}
          .widgetCode=${this.widgetCode}
        ></review-header-title>

        ${e?.map((e,t)=>{const i=this.buildNoticeKey(e),r=Object.prototype.hasOwnProperty.call(this.contentOpenMap,i)?this.contentOpenMap[i]:t<Number(this.designOption?.notice_expand??0);return Je`
            <div
              class="notice-widget-item ${r?"":"notice-border"}"
              @click=${()=>this.toggleContent(e)}
            >
              <div class="notice-badge alp-body12">
                ${"notice"===e.category?this.noticeBadgeText:this.eventBadgeText}
              </div>
              <div class="notice-title">
                <p class="alp-medium alp-body15 line-wrap">${e.title}</p>
                ${(e=>{const t=new Date(e),i=Math.abs((new Date).getTime()-t.getTime());return Math.ceil(i/864e5)<=3})(e.published_at)?Je`<span class="alp-ht alp-bold alp-body14">NEW!!</span>`:null}
              </div>

              <review-at-date
                .fontSizeClassSmall=${"alp-body13"}
                .fontSizeClassMedium=${"alp-body13"}
                .fontSizeClassLarge=${"alp-body13"}
                .fontWeight=${"400"}
                .createDate=${e.published_at}
              ></review-at-date>
            </div>

            ${r?Je`<div class="notice-content ${r?"notice-border":""}">
                  <review-notice-sandbox .content=${e.content}></review-notice-sandbox>
                </div>`:null}
          `})}

        
        ${this.designOption.pagination?Je`
              <review-pagination-handler
                .paginationType="${Bi}"
                .currentPage=${this.filterOption.page}
                .totalPages="${this.totalPages}"
                .productNo=${this.productNo}
                @paginationPrevClick=${this.onPaginationPrevClick}
                @paginationNextClick=${this.onPaginationNextClick}
                @paginationBulletClick=${this.onPaginationBulletClick}
              ></review-pagination-handler>
            `:null}
      </div>
    `}};mh.styles=lh,vh([i({type:Object,attribute:"data-widget-preview-data"})],mh.prototype,"previewData",2),vh([i({type:Object,attribute:"data-widget-preview-option"})],mh.prototype,"previewOption",2),vh([i({type:Object,attribute:"data-widget-preview-meta"})],mh.prototype,"previewMeta",2),vh([i({type:String,attribute:"data-widget-code"})],mh.prototype,"widgetCode",2),vh([i({type:String,attribute:"data-product-no"})],mh.prototype,"productNo",2),vh([i({type:String,attribute:"data-widget-custom-class"})],mh.prototype,"widgetCustomClass",2),vh([i({type:String,attribute:"data-widget-custom-id"})],mh.prototype,"widgetCustomId",2),vh([i({type:Boolean,attribute:"data-dummy"})],mh.prototype,"isDummy",2),vh([i({type:String,attribute:"data-custom-class"})],mh.prototype,"customClass",2),vh([i({type:String,attribute:"data-custom-id"})],mh.prototype,"customId",2),vh([i({type:String,attribute:"data-custom-css"})],mh.prototype,"customCss",2),vh([i({type:String,attribute:"data-custom-js"})],mh.prototype,"customJs",2),vh([r()],mh.prototype,"filterOption",2),vh([r()],mh.prototype,"designOption",2),vh([r()],mh.prototype,"noticeList",2),vh([r()],mh.prototype,"backupNoticeList",2),vh([r()],mh.prototype,"isDesignLoading",2),vh([r()],mh.prototype,"isWidgetLoading",2),vh([r()],mh.prototype,"safe",2),vh([r()],mh.prototype,"totalPages",2),vh([r()],mh.prototype,"contentOpenMap",2),mh=vh([ae("review-notice-widget")],mh);const yh=[Ni,Di,pl("best"),ue`.best-swiper-container--padding{padding:10px}.ranking-box--mobile{align-items:center;gap:4px;padding:2px 0 10px 10px;display:flex}.ranking-text--mobile{color:var(--alp-review-text-gray100,#1e293b);text-align:center;font-weight:700}`];var fh=Object.defineProperty,bh=Object.getOwnPropertyDescriptor,xh=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?bh(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&fh(t,i,s),s};let _h=class extends(wn(ht)){constructor(){super(...arguments),this.previewData={},this.previewOption={},this.previewMeta={},this.widgetCode="",this.widgetSetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs=""}async updated(e){if(super.updated(e),e.has("isInViewport")){if(!this.isInViewport)return;this.provider=new dl(this,{widgetType:"best",swiperContainerSelector:"#sw-"+this.widgetCode,swiperWrapperSelector:".best-swiper-wrapper",getPageUnitOverride:(e,t)=>"mobile"===e?1:t.num_col,setGridSizeOverride:(e,t)=>"mobile"===e?{row:1,col:1,gap:16}:{row:1,col:t.num_col,gap:20},onSwiperInitialized:(e,t)=>{e.params.slidesPerView="mobile"===t.deviceKind&&t.grid.col<t.totalRenderCount&&t.isSwiperTypeActive?t.grid.col+.05:t.grid.col,e.update()},onUpdateSwiper:(e,t)=>{e.params.slidesPerView="mobile"===t.deviceKind&&t.grid.col<t.totalRenderCount&&t.isSwiperTypeActive?t.grid.col+.05:t.grid.col}}),await this.provider.initialize(),this.provider.initializeResizeManager()}}disconnectedCallback(){this.provider?.destroy(),super.disconnectedCallback()}render(){const e=`best-widget-container${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`,t=this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode;return this.provider?.isDesignLoaded?this.provider?.isReady?this.provider.errorCode?V(this.provider.errorCode,this.productNo,this.widgetSetCode||this.widgetCode,this.widgetCode):Je`<div class=${e} id=${t}>
      <review-header-title .designOption=${this.provider.designOption}></review-header-title>
      ${this.provider.designOption?.best_rank&&"mobile"===this.provider.deviceKind?Je`
            <div class="ranking-box--mobile">
              <div class="ranking-text--mobile alp-body17">
                ë² ì¤í¸ ë¦¬ë·°
                ${this.provider.filterOption.page>3?"":this.provider.filterOption.page+"\uc704"}
              </div>
              ${1===this.provider.filterOption.page?Je` <review-custom-icon
                    .type=${Ht}
                    .width=${14}
                    .height=${14}
                    .color=${"var(--alp-review-icon-gray40)"}
                  ></review-custom-icon>`:null}
            </div>
          `:null}
      <div
        .id="sw-${this.widgetCode}"
        class="swiper-container best-swiper-container ${"mobile"===this.provider.deviceKind?"best-swiper-container--padding":""}"
      >
        <div class="swiper-wrapper best-swiper-wrapper">
          ${this.provider.reviewList.map((e,t)=>Je`<div
                class="swiper-slide best-swiper-slide ${"mobile"===this.provider?.deviceKind?"best-swiper-slide--mobile":""}"
              >
                ${"mobile"!==this.provider?.deviceKind?Je`
                      <review-best-card
                        class="slide-item"
                        .review=${e}
                        .reviewList=${this.provider?.reviewList}
                        .designOption=${this.provider?.designOption}
                        .filterOption=${this.provider?.filterOption}
                        .isReviewListLoading=${this.provider?.isReviewListLoading}
                        .ranking=${t+1}
                        .index=${t}
                      ></review-best-card>
                    `:Je`<review-best-card-mobile
                      class="slide-item"
                      .review=${e}
                      .reviewList=${this.provider.reviewList}
                      .designOption=${this.provider.designOption}
                      .filterOption=${this.provider.filterOption}
                      .isReviewListLoading=${this.provider.isReviewListLoading}
                      .ranking=${t+1}
                      .index=${t}
                    ></review-best-card-mobile>`}
              </div>`)}
        </div>
        ${this.provider.isSwiperTypeActive&&this.provider.designOption?.navigation&&"mobile"!==this.provider.deviceKind?Je`
              <review-arrow-pagination-handler
                .type=${Xt}
                .isPrevVisible=${this.provider.isPrevVisible}
                .isNextVisible=${this.provider.isNextVisible}
                @prevArrowClick=${this.provider.onPrevClick}
                @nextArrowClick=${this.provider.onNextClick}
              ></review-arrow-pagination-handler>
            `:null}
      </div>
      ${this.provider.designOption?.paging_type!==Gi&&this.provider.designOption?.indicator_type!==Hi?Je`
            <review-pagination-handler
              .paginationType=${this.provider.paginationType}
              .totalPages=${this.provider.totalPages}
              .currentPage=${this.provider.getCurrentPage()}
              .isMoreLoading=${this.provider.isReviewListLoading}
              .hasMoreReviews=${this.provider.reviewList.length<this.provider.totalRenderCount}
              .productNo=${this.productNo}
              .isLinksVisible=${!0}
              @paginationPrevClick=${this.provider.onPrevClick}
              @paginationNextClick=${this.provider.onNextClick}
              @paginationBulletClick=${this.provider.onPaginationBulletClick}
              @paginationMoreClick=${this.provider.onPaginationMoreClick}
            ></review-pagination-handler>
          `:null}
    </div>`:null:Je`<div style="width:100%; height:1px;"></div>`}};_h.styles=yh,xh([i({type:Object,attribute:"data-widget-preview-data"})],_h.prototype,"previewData",2),xh([i({type:Object,attribute:"data-widget-preview-option"})],_h.prototype,"previewOption",2),xh([i({type:Object,attribute:"data-widget-preview-meta"})],_h.prototype,"previewMeta",2),xh([i({type:String,attribute:"data-widget-code"})],_h.prototype,"widgetCode",2),xh([i({type:String,attribute:"data-widget-set-code"})],_h.prototype,"widgetSetCode",2),xh([i({type:String,attribute:"data-product-no"})],_h.prototype,"productNo",2),xh([i({type:String,attribute:"data-widget-custom-class"})],_h.prototype,"widgetCustomClass",2),xh([i({type:String,attribute:"data-widget-custom-id"})],_h.prototype,"widgetCustomId",2),xh([i({type:Boolean,attribute:"data-dummy"})],_h.prototype,"isDummy",2),xh([i({type:String,attribute:"data-custom-class"})],_h.prototype,"customClass",2),xh([i({type:String,attribute:"data-custom-id"})],_h.prototype,"customId",2),xh([i({type:String,attribute:"data-custom-css"})],_h.prototype,"customCss",2),xh([i({type:String,attribute:"data-custom-js"})],_h.prototype,"customJs",2),_h=xh([ae("review-best-widget")],_h);var Ch=Object.defineProperty,$h=Object.getOwnPropertyDescriptor,Oh=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?$h(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Ch(t,i,s),s};let kh=class extends ht{constructor(){super(...arguments),this.ranking=1,this.sizeType="medium",this.getSize=()=>"medium"===this.sizeType?{fontSize:"16px",width:"28px",height:"29px"}:{fontSize:"24px",width:"42px",height:"44px"}}createRenderRoot(){return this}render(){const e=Je`<style>.ranking-badge-container { position: relative; } .ranking-badge__number-area { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -57%); color: white; font-weight: 700; font-size: ${this.getSize().fontSize}; }</style>`;return Je`${e}
      <div class="ranking-badge-container">
        <div class="ranking-badge__number-area">${this.ranking}</div>
        <review-custom-icon
          .type=${Ut}
          .color=${"var(--alp-common-color)"}
          .width=${this.getSize().width}
          .height=${this.getSize().height}
        ></review-custom-icon>
      </div>`}};Oh([i({type:Number})],kh.prototype,"ranking",2),Oh([i({type:String})],kh.prototype,"sizeType",2),kh=Oh([ae("review-ranking-badge")],kh);var Sh=Object.defineProperty,Eh=Object.getOwnPropertyDescriptor,Rh=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Eh(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Sh(t,i,s),s};let Lh=class extends ht{constructor(){super(...arguments),this.index=0,this.isReviewListLoading=!1,this.ranking=1,this.getPlatform=e=>"\uc778\uc2a4\ud0c0\uadf8\ub7a8"===e?vt:"\ub124\uc774\ubc84\ube14\ub85c\uadf8"===e?mt:"",this.productBox=()=>this.designOption?.product_info?Je`
          <div
            class="product-info-box"
            @click=${()=>this.goToProductPage(this.review?.product?.product_no?.toString())}
          >
            ${this.designOption?.product_img?Je` <review-product-thumbnail
                  .productImageUrl="${this.review?.product?.detail_image}"
                  .containerQueryInfo=${{name:"best-swiper-slide",breakpoints:{small:0,medium:0,large:300}}}
                ></review-product-thumbnail>`:null}
            <div class="product-content-box">
              <review-product-name-price
                .productName="${this.review?.product?.product_name}"
                .showProductName=${this.designOption?.product_name}
                .fontWeight=${"500"}
                .fontSizeClassMedium_name=${"alp-body14"}
                .fontSizeClassLarge_name=${"alp-body14"}
                .fontSizeClassMedium_price=${"alp-caption10"}
                .fontSizeClassLarge_price=${"alp-caption11"}
                .containerQueryInfo=${{name:"best-swiper-slide",breakpoints:{small:0,medium:0,large:300}}}
              ></review-product-name-price>
              <review-product-rating-count
                .averageRating="${this.review?.product?.review_ratings_connect}"
                .reviewCount="${this.review?.product?.review_number_connect_count}"
                .showReviewCount=${this.designOption?.product_review}
                .showRating=${this.designOption?.product_ratings}
                .fontSizeClassSmallRating=${"alp-caption11"}
                .fontSizeClassMediumRating=${"alp-caption11"}
                .fontSizeClassLargeRating=${"alp-caption11"}
                .fontSizeClassSmall=${"alp-caption11"}
                .fontSizeClassMedium=${"alp-caption11"}
                .fontSizeClassLarge=${"alp-caption11"}
                .containerQueryInfo=${{name:"best-swiper-slide",breakpoints:{small:0,medium:0,large:300}}}
              ></review-product-rating-count>
            </div>
          </div>
        `:null}createRenderRoot(){return this}openDetailPopup(){gn({reviewId:this.review?.id?.toString(),option:this.filterOption,reviewIndex:this.index,backupList:this.reviewList})}goToProductPage(e){pn(e)}render(){const e=Je`<style>.best-swiper-slide { container-name: best-swiper-slide; container-type: inline-size; width: 100%; min-height: fit-content; } .best__ranking-box { display: flex; align-items: center; justify-content: center; gap: 18px; height: 45px; padding: 8px 0 14px 0; } .best__ranking-text { color: var(--alp-review-text-gray100, #1e293b); text-align: center !important; font-weight: 700; } .best__media__container { position: relative; border-radius: 8px; overflow: hidden; } .best__media__ranking-badge { position: absolute; top: 0; left: 3%; } .best-review-content { display: flex; flex-direction: column; padding: 14px 10px; gap: 6px; overflow: hidden; } .review-info--small { display: none; } .review-info--medium { display: none; } .review-info--large { display: none; } .writer-info-box { display: flex; align-items: center; width: 100%; } .writer-info-box review-at-date { padding-right: 6px; } .writer-info-box review-badge { margin-left: auto; } .product-info-box { display: flex; width: 100%; padding: 13px 10px; gap: 13px; cursor: pointer; border-top: 0.5px solid var(--alp-review-border-gray20, rgba(30, 41, 59, 0.2)); } .product-content-box { display: flex; flex-direction: column; gap: 8px; overflow: hidden; } @container best-swiper-slide (max-width: 300px) { .best-review-content { padding: 12px 8px; gap: 6px; } .product-info-box { padding: 11px 8px 12px; gap: 8px; } .product-content-box { gap: 4px; } }</style>`;return Je`${e}
    ${this.review?.id?Je`${this.designOption?.best_rank?Je`
                <div class="best__ranking-box">
                  ${1===this.ranking?Je` <review-custom-icon
                        .type=${Ht}
                        .width=${24}
                        .height=${24}
                        .color=${"var(--alp-review-icon-gray40)"}
                      ></review-custom-icon>`:null}
                  ${this.ranking<=3?Je`
                        <div class="best__ranking-text alp-h26">
                          ${1===this.ranking?"1st":2===this.ranking?"2nd":"3rd"}
                        </div>
                      `:null}
                  ${1===this.ranking?Je` <review-custom-icon
                        .type=${Ht}
                        .width=${24}
                        .height=${24}
                        .color=${"var(--alp-review-icon-gray40)"}
                      ></review-custom-icon>`:null}
                </div>
              `:null}
          <div class="best__media__container">
            <review-review-media
              .reviewMedia=${this.review?.ordered_media[0]}
              .productImg=${this.review?.product?.detail_image||this.review?.product?.tiny_image}
              .socialType=${this.getPlatform(this.review?.platform_display)}
              .totalPages=${this.review?.media_length}
              @click=${this.openDetailPopup}
            >
          </review-review-media>
            ${this.designOption?.best_mark&&this.ranking<=3?Je`<review-ranking-badge
                    class="best__media__ranking-badge"
                    .ranking=${this.ranking}
                    .sizeType=${"large"}
                  ></review-ranking-badge>`:null}
            </div>
          </div>
           <div class="best-review-content">
            <review-review-info
              .review=${this.review}
              .showRatingStars=${this.designOption?.ratings&&!["\uc778\uc2a4\ud0c0\uadf8\ub7a8","\ub124\uc774\ubc84\ube14\ub85c\uadf8"].includes(this.review.platform_display)}
              .showOptionName=${this.designOption?.product_option}
              .starSize=${"16"}
              .fontSizeClassSmall_option=${"alp-caption11"}
              .fontSizeClassMedium_option=${"alp-caption11"}
              .fontSizeClassLarge_option=${"alp-caption11"}
              .fontSizeClassSmall_review=${"alp-body14"}
              .fontSizeClassMedium_review=${"alp-body14"}
              .fontSizeClassLarge_review=${"alp-body14"}
              .containerQueryInfo=${{name:"best-swiper-slide",breakpoints:{small:0,medium:0,large:300},gap:{small:"6px",medium:"8px",large:"6px"},optionGap:{small:"0",medium:"6px",large:"10px"}}}
            ></review-review-info>
            ${this.designOption?.writer||this.designOption?.create_at?Je`
                    <div class="writer-info-box">
                      ${this.designOption?.writer?Je` <review-user-info
                            .review=${this.review}
                            .sizeType=${"small"}
                            .fontWeight=${"400"}
                            .fontSizeClassSmall=${"alp-caption10"}
                            .fontSizeClassMedium=${"alp-caption10"}
                            .fontSizeClassLarge=${"alp-caption11"}
                          ></review-user-info>`:null}
                      ${this.designOption?.create_at&&this.designOption?.writer?Je` <review-custom-icon
                            .type=${Nt}
                            .width=${13}
                            .height=${13}
                            .color=${"var(--alp-review-icon-gray10)"}
                          ></review-custom-icon>`:null}
                      ${this.designOption?.create_at?Je` <review-at-date
                            .createDate=${new Date(this.review?.created_at)}
                            .fontWeight=${"400"}
                            .fontSizeClassSmall=${"alp-caption10"}
                            .fontSizeClassMedium=${"alp-caption10"}
                            .fontSizeClassLarge=${"alp-caption11"}
                          ></review-at-date>`:null}
                      ${this.review?.is_verified&&window.ALPHA_REVIEW_SHOP_DESIGN_OPTION?.use_writer_verify?Je`<review-badge
                            .type=${"verified"}
                            .fontSizeClassSmall=${"alp-caption10"}
                            .fontSizeClassMedium=${"alp-caption10"}
                            .fontSizeClassLarge=${"alp-caption11"}
                          ></review-badge>`:null}
                    </div>
                  `:null}
          </div>
          ${this.productBox()}
        </div>`:Je`
          <review-best-skeleton
            .designOption=${this.designOption}
            .isReviewListLoading=${this.isReviewListLoading}
          ></review-best-skeleton>
        `} `}};Rh([i({type:Object})],Lh.prototype,"review",2),Rh([i({type:Number})],Lh.prototype,"index",2),Rh([i({type:Object})],Lh.prototype,"reviewList",2),Rh([i({type:Object})],Lh.prototype,"designOption",2),Rh([i({type:Object})],Lh.prototype,"filterOption",2),Rh([i({type:Boolean})],Lh.prototype,"isReviewListLoading",2),Rh([i({type:Number})],Lh.prototype,"ranking",2),Lh=Rh([ae("review-best-card")],Lh);var Ih=Object.defineProperty,Ph=Object.getOwnPropertyDescriptor,Th=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Ph(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Ih(t,i,s),s};let Ah=class extends ht{constructor(){super(...arguments),this.isReviewListLoading=!1}render(){return Je`
      
      ${this.designOption?.best_rank?Je`<div class="ranking-box"></div>`:null}

      
      <div
        class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-media"
      ></div>
      
      <div class="skeleton-review-content">
        
        

        
        <div
          class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-review-text"
        ></div>

        
        ${this.designOption?.writer||this.designOption?.create_at?Je`
              <div class="writer-info-box">
                <div
                  class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-writer"
                ></div>
              </div>
            `:null}
      </div>

      
      ${this.designOption?.product_info?Je`
            <div class="product-info-box">
              ${this.designOption?.product_img?Je`<div
                    class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-thumbnail"
                  ></div>`:null}
              <div class="product-content-box">
                <div
                  class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-product-name"
                ></div>
                ${this.designOption?.product_ratings||this.designOption?.product_review?Je`
                      <div class="skeleton-rating-box">
                        <review-star-icon
                          .size=${16}
                          .color=${"rgba(94, 103, 118, 0.13)"}
                        ></review-star-icon>
                        <div
                          class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-rating-text"
                        ></div>
                      </div>
                    `:null}
              </div>
            </div>
          `:null}
    `}};Ah.styles=[ko,ue`:host{container:best-swiper-slide/inline-size}.remove-shimmer{animation:none}.ranking-box{height:45px}.skeleton-media{aspect-ratio:1;border-radius:4px;width:100%}.rating-option-box{align-items:center;gap:10px;display:flex}.rating-box{align-items:center;display:flex}.skeleton-option{border-radius:4px;width:40%;height:17px}.skeleton-rating-box{align-items:center;gap:4px;display:flex}.skeleton-rating-text{border-radius:4px;width:30%;height:13px}.skeleton-review-content{flex-direction:column;gap:6px;padding:14px 10px;display:flex}.skeleton-stars{border-radius:4px;width:60%;height:1rem}.skeleton-review-text{border-radius:4px;width:100%;height:22px;margin-top:2px}.writer-info-box{align-items:center;gap:6px;width:100%;margin-top:auto;display:flex}.skeleton-writer{border-radius:4px;width:60%;height:13px}.product-info-box{border-top:.5px solid var(--alp-review-border-gray20,#1e293b33);gap:13px;width:100%;padding:13px 10px;display:flex}.skeleton-thumbnail{border-radius:50%;flex-shrink:0;width:36px;height:36px}.product-content-box{flex-direction:column;flex:1;gap:4px;display:flex;overflow:hidden}.skeleton-product-name{border-radius:4px;width:70%;height:16px}@container best-swiper-slide (width<=300px){.product-info-box{gap:8px;padding:11px 8px 12px}.skeleton-thumbnail{width:34px;height:34px}.skeleton-review-content{gap:6px;padding:12px 8px}}`],Th([i({type:Object})],Ah.prototype,"designOption",2),Th([i({type:Boolean})],Ah.prototype,"isReviewListLoading",2),Ah=Th([ae("review-best-skeleton")],Ah);var Nh=Object.defineProperty,Dh=Object.getOwnPropertyDescriptor,Mh=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Dh(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Nh(t,i,s),s};let Wh=class extends ht{constructor(){super(...arguments),this.index=0,this.isReviewListLoading=!1,this.ranking=1,this.productBox=()=>this.designOption?.product_info?Je`
          <div
            class="product-info-box"
            @click=${()=>this.goToProductPage(this.review?.product?.product_no?.toString())}
          >
            ${this.designOption?.product_img?Je` <review-product-thumbnail
                  .productImageUrl="${this.review?.product?.detail_image}"
                  .containerQueryInfo=${{name:"best-swiper-slide",breakpoints:{small:0,medium:0,large:9999}}}
                ></review-product-thumbnail>`:null}
            <div class="product-content-box">
              <review-product-name-price
                .productName="${this.review?.product?.product_name}"
                .showProductName=${this.designOption?.product_name}
                .fontWeight=${"500"}
                .fontSizeClassSmall_name=${"alp-body14"}
                .fontSizeClassMedium_name=${"alp-body14"}
                .fontSizeClassLarge_name=${"alp-body14"}
                .fontSizeClassMedium_price=${"alp-caption10"}
                .fontSizeClassLarge_price=${"alp-caption11"}
              ></review-product-name-price>
              <review-product-rating-count
                .averageRating="${this.review?.product?.review_ratings_connect}"
                .reviewCount="${this.review?.product?.review_number_connect_count}"
                .showReviewCount=${this.designOption?.product_review}
                .showRating=${this.designOption?.product_ratings}
                .fontSizeClassSmallRating=${"alp-body12"}
                .fontSizeClassMediumRating=${"alp-body13"}
                .fontSizeClassLargeRating=${"alp-body13"}
                .fontSizeClassSmall=${"alp-body12"}
                .fontSizeClassMedium=${"alp-body13"}
                .fontSizeClassLarge=${"alp-body13"}
              ></review-product-rating-count>
            </div>
          </div>
        `:null}createRenderRoot(){return this}openDetailPopup(){gn({reviewId:this.review?.id?.toString(),option:this.filterOption,reviewIndex:this.index,backupList:this.reviewList})}goToProductPage(e){pn(e)}render(){const e=Je`<style>.best-swiper-slide { container-name: best-swiper-slide; container-type: inline-size; width: 100%; min-height: fit-content; } .content-card { position: relative; display: flex; flex-direction: column; gap: 8px; width: 100%; padding: 20px 16px 24px; border-radius: 4px; background: var(--alp-review-bg-white); box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1); } .rating-writer-box { display: flex; align-items: center; overflow: hidden; } .rating-box { display: flex; align-items: center; margin-right: 6px; } .option-box { color: var(--alp-review-text-gray60, rgba(30, 41, 59, 0.6)); font-weight: 500; } .review-media-box { display: flex; align-items: center; justify-content: space-between; gap: 13px; } .review-wrapper { color: var(--alp-review-text-gray100, #1e293b); display: -webkit-box; overflow: hidden; text-overflow: ellipsis; -webkit-line-clamp: 3; -webkit-box-orient: vertical; } .review-media { width: 100%; } .media-wrapper { position: relative; cursor: pointer; border-radius: 4px; overflow: hidden; min-width: 60px; height: 60px; } .media-count { position: absolute; bottom: 0; right: 0; display: flex; align-items: center; justify-content: center; width: 16px; height: 16px; color: var(--alp-review-text-white100, #fff); font-weight: 500; background: rgba(30, 41, 59, 0.4); } .ranking-badge { position: absolute; top: 0; right: 16px; } .writer-info-box { display: flex; align-items: center; width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .writer-info-box review-at-date { padding-right: 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .writer-info-box review-badge { margin-left: auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .product-info-box { display: flex; width: 100%; padding: 20px 4px 12px; gap: 10px; cursor: pointer; } .product-content-box { display: flex; flex-direction: column; justify-content: center; overflow: hidden; gap: 6px; } .hidden { color: transparent; }</style>`;return Je`${e}
    ${this.review?.id?Je` <div class="content-card">
            ${this.designOption?.ratings||this.designOption?.writer||this.designOption?.create_at?Je`
                  <div class="rating-writer-box">
                    ${this.designOption?.ratings?Je`
                          <review-ratings-bundle
                            class="rating-box"
                            .rating=${this.review?.ratings}
                            .size=${20}
                          ></review-ratings-bundle>
                        `:null}
                    ${this.designOption?.writer||this.designOption?.create_at?Je`
                          <div class="writer-info-box">
                            ${this.designOption?.writer?Je` <review-user-info
                                  .review=${this.review}
                                  .sizeType=${"small"}
                                  .fontWeight=${"400"}
                                  .fontSizeClassSmall=${"alp-body13"}
                                  .fontSizeClassMedium=${"alp-body13"}
                                  .fontSizeClassLarge=${"alp-body13"}
                                ></review-user-info>`:null}
                            ${this.designOption?.create_at&&this.designOption?.writer?Je` <review-custom-icon
                                  .type=${Nt}
                                  .width=${13}
                                  .height=${13}
                                  .color=${"var(--alp-review-icon-gray10)"}
                                ></review-custom-icon>`:null}
                            ${this.designOption?.create_at?Je` <review-at-date
                                  .createDate=${new Date(this.review?.created_at)}
                                  .fontWeight=${"400"}
                                  .fontSizeClassSmall=${"alp-body13"}
                                  .fontSizeClassMedium=${"alp-body13"}
                                  .fontSizeClassLarge=${"alp-body13"}
                                ></review-at-date>`:null}
                          </div>
                        `:null}
                  </div>
                `:null}

            <div class="option-box alp-caption11 ${this.review.product_option?"":"hidden"}">
              ${this.review.product_option?this.review.product_option:"1"}
            </div>

            <div class="review-media-box" @click=${this.openDetailPopup}>
              <div class="review-wrapper alp-body15 alp-medium alp-line14">
                ${this.review.content}
              </div>
              <div class="media-wrapper">
                <review-review-media
                  class="review-media"
                  .reviewMedia=${this.review?.ordered_media[0]}
                ></review-review-media>
                ${this.review?.media_length>1?Je`
                      <div class="media-count alp-caption10">+${this.review?.media_length-1}</div>
                    `:null}
              </div>
            </div>
            ${this.designOption?.best_mark&&this.ranking<=3?Je`<review-ranking-badge
                  class="ranking-badge"
                  .ranking=${this.ranking}
                  .sizeType=${"medium"}
                ></review-ranking-badge>`:null}
          </div>
          ${this.productBox()}`:Je`
          <review-best-mobile-skeleton
            .designOption=${this.designOption}
            .isReviewListLoading=${this.isReviewListLoading}
          ></review-best-mobile-skeleton>
        `} `}};Mh([i({type:Object})],Wh.prototype,"review",2),Mh([i({type:Object})],Wh.prototype,"reviewList",2),Mh([i({type:Number})],Wh.prototype,"index",2),Mh([i({type:Object})],Wh.prototype,"designOption",2),Mh([i({type:Object})],Wh.prototype,"filterOption",2),Mh([i({type:Boolean})],Wh.prototype,"isReviewListLoading",2),Mh([i({type:Number})],Wh.prototype,"ranking",2),Wh=Mh([ae("review-best-card-mobile")],Wh);var zh=Object.defineProperty,jh=Object.getOwnPropertyDescriptor,Vh=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?jh(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&zh(t,i,s),s};let Fh=class extends ht{constructor(){super(...arguments),this.isReviewListLoading=!1}render(){return Je`
      
      <div class="content-card">
        
        ${this.designOption?.ratings||this.designOption?.writer||this.designOption?.create_at?Je`
              <div class="rating-writer-box">
                
                ${this.designOption?.ratings?Je`
                      <div class="rating-box">
                        <review-ratings-bundle
                          .rating=${5}
                          .size=${20}
                          .color=${"rgba(94, 103, 118, 0.13)"}
                        ></review-ratings-bundle>
                      </div>
                    `:null}
                
                ${this.designOption?.writer||this.designOption?.create_at?Je`
                      <div class="writer-info-box">
                        ${this.designOption?.writer?Je`<div
                              class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-writer"
                            ></div>`:null}
                      </div>
                    `:null}
              </div>
            `:null}

        
        <div class="option-box">
          <div
            class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-option"
          ></div>
        </div>

        
        <div class="review-media-box">
          <div class="review-wrapper">
            <div class="skeleton-review-line"></div>
            <div class="skeleton-review-line"></div>
          </div>
          <div class="media-wrapper">
            <div
              class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-media"
            ></div>
          </div>
        </div>
      </div>

      
      ${this.designOption?.product_info?Je`
            <div class="product-info-box">
              ${this.designOption?.product_img?Je`<div
                    class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-thumbnail"
                  ></div>`:null}
              <div class="product-content-box">
                ${this.designOption?.product_name?Je`<div
                      class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-product-name"
                    ></div>`:null}
                ${this.designOption?.product_review||this.designOption?.product_ratings?Je`
                      <div class="skeleton-product-rating">
                        <review-star-icon
                          .size=${13}
                          .color=${"rgba(94, 103, 118, 0.13)"}
                        ></review-star-icon>
                        <div
                          class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-rating-text"
                        ></div>
                      </div>
                    `:null}
              </div>
            </div>
          `:null}
    `}};Fh.styles=[ko,ue`:host{width:100%;display:block}.remove-shimmer{animation:none}.content-card{background:var(--alp-review-card-gray03,#1e293b08);border-radius:4px;flex-direction:column;gap:8px;padding:20px 16px 24px;display:flex;position:relative}.rating-writer-box{align-items:center;display:flex;overflow:hidden}.rating-box{align-items:center;gap:2px;margin-right:6px;display:flex}.skeleton-star{border-radius:2px;width:11px;height:11px}.writer-info-box{align-items:center;width:100%;display:flex}.skeleton-writer{border-radius:4px;width:80px;height:11px}.option-box{align-items:center;display:flex}.skeleton-option{border-radius:4px;width:80px;height:11px}.review-media-box{gap:13px;display:flex}.review-wrapper{flex-direction:column;flex:1;justify-content:center;gap:4px;display:flex}.skeleton-review-line{background:var(--alp-review-background-gray10,#1e293b1a);border-radius:4px;width:100%;height:14px}.skeleton-review-line:last-child{width:70%}.media-wrapper{flex-shrink:0;position:relative}.skeleton-media{border-radius:4px;width:60px;min-width:60px;height:60px}.product-info-box{gap:10px;width:100%;padding:20px 4px 12px;display:flex}.skeleton-thumbnail{border-radius:50%;flex-shrink:0;width:30px;height:30px}.product-content-box{flex-direction:column;flex:1;justify-content:center;gap:6px;display:flex;overflow:hidden}.skeleton-product-name{border-radius:4px;width:85%;height:14px}.skeleton-product-rating{align-items:center;gap:4px;display:flex}.skeleton-rating-text{border-radius:4px;width:30%;height:13px}`],Vh([i({type:Object})],Fh.prototype,"designOption",2),Vh([i({type:Boolean})],Fh.prototype,"isReviewListLoading",2),Fh=Vh([ae("review-best-mobile-skeleton")],Fh);const Bh=[Ni,Di,pl("best-text"),ue`.best-text-swiper-container{padding:10px}`];var Uh=Object.defineProperty,Hh=Object.getOwnPropertyDescriptor,Gh=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Hh(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Uh(t,i,s),s};let qh=class extends(wn(ht)){constructor(){super(...arguments),this.previewData={},this.previewOption={},this.previewMeta={},this.widgetCode="",this.widgetSetCode="",this.productNo="all",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.customClass="",this.customId="",this.customCss="",this.customJs=""}async updated(e){if(super.updated(e),e.has("isInViewport")){if(!this.isInViewport)return;this.provider=new dl(this,{widgetType:"best-text",swiperContainerSelector:"#sw-"+this.widgetCode,swiperWrapperSelector:".best-text-swiper-wrapper",getPageUnitOverride:(e,t)=>"mobile"===e?1:t.num_row*t.num_col,setGridSizeOverride:(e,t)=>"mobile"===e?{row:1,col:1,gap:16}:{row:t.num_row,col:t.num_col,gap:20}}),await this.provider.initialize(),this.provider.initializeResizeManager()}}disconnectedCallback(){this.provider?.destroy(),super.disconnectedCallback()}render(){if(!this.provider?.isDesignLoaded)return Je`<div style="width:100%; height:1px;"></div>`;if(!this.provider?.isReady)return null;const e=`best-text-widget-container${this.customClass?" "+this.customClass:""}${this.widgetCustomClass?" "+this.widgetCustomClass:""}`,t=this.widgetCustomId?this.widgetCustomId:"widget-"+this.widgetCode;return this.provider.errorCode?V(this.provider.errorCode,this.productNo,this.widgetSetCode||this.widgetCode,this.widgetCode):Je`<div class=${e} id=${t}>
      <review-header-title .designOption=${this.provider.designOption}></review-header-title>
      <div .id="sw-${this.widgetCode}" class="swiper-container best-text-swiper-container">
        <div class="swiper-wrapper best-text-swiper-wrapper">
          ${this.provider.reviewList.map((e,t)=>Je`<div class="swiper-slide best-text-swiper-slide">
                <review-best-text-card
                  class="slide-item"
                  .review=${e}
                  .designOption=${this.provider?.designOption}
                  .filterOption=${this.provider?.filterOption}
                  .isReviewListLoading=${this.provider?.isReviewListLoading}
                  .index=${t}
                  .reviewList=${this.provider?.reviewList}
                ></review-best-text-card>
              </div>`)}
        </div>
        ${this.provider.isSwiperTypeActive&&this.provider.designOption?.navigation?Je`
              <review-arrow-pagination-handler
                .type=${Xt}
                .isPrevVisible=${this.provider.isPrevVisible}
                .isNextVisible=${this.provider.isNextVisible}
                @prevArrowClick=${this.provider.onPrevClick}
                @nextArrowClick=${this.provider.onNextClick}
              ></review-arrow-pagination-handler>
            `:null}
      </div>
      ${this.provider.designOption?.paging_type!==Gi&&this.provider.designOption?.indicator_type!==Hi?Je`
            <review-pagination-handler
              .paginationType=${this.provider.paginationType}
              .totalPages=${this.provider.totalPages}
              .currentPage=${this.provider.getCurrentPage()}
              .isMoreLoading=${this.provider.isReviewListLoading}
              .hasMoreReviews=${this.provider.reviewList.length<this.provider.totalRenderCount}
              .productNo=${this.productNo}
              .isLinksVisible=${!0}
              @paginationPrevClick=${this.provider.onPrevClick}
              @paginationNextClick=${this.provider.onNextClick}
              @paginationBulletClick=${this.provider.onPaginationBulletClick}
              @paginationMoreClick=${this.provider.onPaginationMoreClick}
            ></review-pagination-handler>
          `:null}
    </div>`}};qh.styles=Bh,Gh([i({type:Object,attribute:"data-widget-preview-data"})],qh.prototype,"previewData",2),Gh([i({type:Object,attribute:"data-widget-preview-option"})],qh.prototype,"previewOption",2),Gh([i({type:Object,attribute:"data-widget-preview-meta"})],qh.prototype,"previewMeta",2),Gh([i({type:String,attribute:"data-widget-code"})],qh.prototype,"widgetCode",2),Gh([i({type:String,attribute:"data-widget-set-code"})],qh.prototype,"widgetSetCode",2),Gh([i({type:String,attribute:"data-product-no"})],qh.prototype,"productNo",2),Gh([i({type:String,attribute:"data-widget-custom-class"})],qh.prototype,"widgetCustomClass",2),Gh([i({type:String,attribute:"data-widget-custom-id"})],qh.prototype,"widgetCustomId",2),Gh([i({type:Boolean,attribute:"data-dummy"})],qh.prototype,"isDummy",2),Gh([i({type:String,attribute:"data-custom-class"})],qh.prototype,"customClass",2),Gh([i({type:String,attribute:"data-custom-id"})],qh.prototype,"customId",2),Gh([i({type:String,attribute:"data-custom-css"})],qh.prototype,"customCss",2),Gh([i({type:String,attribute:"data-custom-js"})],qh.prototype,"customJs",2),qh=Gh([ae("review-best-text-widget")],qh);var Yh=Object.defineProperty,Kh=Object.getOwnPropertyDescriptor,Zh=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Kh(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Yh(t,i,s),s};let Jh=class extends ht{constructor(){super(...arguments),this.index=0,this.isReviewListLoading=!1,this.commentText=si.SHARED.OPEN_REVIEW_WRITE.COMMENT,this.productBox=()=>this.designOption?.product_info?Je`
          <div
            class="product-info-box"
            @click=${()=>this.goToProductPage(this.review?.product?.product_no?.toString())}
          >
            ${this.designOption?.product_img?Je`<review-product-thumbnail
                  .productImageUrl="${this.review?.product?.detail_image}"
                  .containerQueryInfo=${{name:"best-text-swiper-slide",breakpoints:{small:0,medium:0,large:9999}}}
                ></review-product-thumbnail>`:null}
            <div class="product-content-box">
              <review-product-name-price
                .productName="${this.review?.product?.product_name}"
                .showProductName=${this.designOption?.product_name}
                .fontWeight=${"500"}
                .fontSizeClassSmall_name=${"alp-body14"}
                .fontSizeClassMedium_name=${"alp-body14"}
                .fontSizeClassLarge_name=${"alp-body14"}
                .fontSizeClassMedium_price=${"alp-body12"}
                .fontSizeClassLarge_price=${"alp-body12"}
                .containerQueryInfo=${{name:"best-text-swiper-slide",breakpoints:{small:0,medium:0,large:9999}}}
              ></review-product-name-price>
              <review-product-rating-count
                .averageRating="${this.review?.product?.review_ratings_connect}"
                .reviewCount="${this.review?.product?.review_number_connect_count}"
                .showReviewCount=${!0}
                .showRating=${!0}
                .fontSizeClassMediumRating=${"alp-body12"}
                .fontSizeClassLargeRating=${"alp-body12"}
                .fontSizeClassMedium=${"alp-body12"}
                .fontSizeClassLarge=${"alp-body12"}
                .containerQueryInfo=${{name:"best-text-swiper-slide",breakpoints:{small:0,medium:0,large:9999}}}
              ></review-product-rating-count>
            </div>
          </div>
        `:null}createRenderRoot(){return this}openDetailPopup(){gn({reviewId:this.review?.id?.toString(),option:this.filterOption,reviewIndex:this.index,backupList:this.reviewList})}goToProductPage(e){pn(e)}render(){const e=Je`<style>.best-text-swiper-slide { container-name: best-text-swiper-slide; container-type: inline-size; min-height: fit-content; } .best-text-review-content { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px; padding: 50px 40px; overflow: hidden; border-radius: 8px; background: var(--alp-review-bg-white); box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1); cursor: pointer; } .best-text-review-content.border { border: 1px solid var(--alp-review-border-gray20, rgba(30, 41, 59, 0.2)); } .sm { display: none; } .lg { display: flex; } .review-wrapper { margin-top: 12px; margin-bottom: 12px; text-align: center; display: -webkit-box; overflow: hidden; text-overflow: ellipsis; -webkit-line-clamp: 2; -webkit-box-orient: vertical; } .writer-option-box { display: flex; align-items: center; justify-content: center; gap: 4px; width: 100%; color: var(--alp-review-text-gray50, rgba(30, 41, 59, 0.5)); } .writer-info-box { display: flex; color: inherit; } .writer-option-box .writer-info-box, .writer-option-box .product-option-box { color: inherit; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .writer-option-box review-custom-icon { margin: 0 6px; } .product-info-box { display: flex; align-items: center; justify-content: center; width: 100%; padding: 20px 10px 10px; gap: 14px; cursor: pointer; } .product-content-box { display: flex; flex-direction: column; gap: 4px; overflow: hidden; } .hidden { color: transparent; opacity: 0; } @container best-text-swiper-slide (max-width: 440px) { .best-text-review-content { padding: 28px 32px 20px; min-height: 170px; } .sm { display: flex; } .lg { display: none; } .review-wrapper { margin-top: 10px; margin-bottom: 20px; } .writer-option-box { flex-direction: column; } .writer-option-box review-custom-icon { display: none; } .product-info-box { justify-content: flex-start; } }</style>`;return Je`${e}
    ${this.review?.id?Je`
           <div class="best-text-review-content ${this.designOption?.best_border?"border":""}" @click=${this.openDetailPopup}>
            ${this.designOption?.ratings?Je` <review-ratings-bundle
                      class="ratings-bundle sm"
                      .rating=${this.review.ratings}
                      .size=${20}
                    ></review-ratings-bundle>
                    <review-ratings-bundle
                      class="ratings-bundle lg"
                      .rating=${this.review.ratings}
                      .size=${22}
                    ></review-ratings-bundle>`:null}
              <p class="review-wrapper alp-body15 alp-medium alp-line14">
                ${this.review.content}
              </p>
            ${this.designOption?.writer||this.designOption?.product_option?Je`
                    <div class="writer-option-box">
                      ${this.designOption?.writer?Je`
                            <div class="writer-info-box alp-body13">
                              <review-user-info
                                .review=${this.review}
                                .sizeType=${"small"}
                                .fontWeight=${"400"}
                                .fontSizeClassSmall=${"alp-body13"}
                                .fontSizeClassMedium=${"alp-body13"}
                                .fontSizeClassLarge=${"alp-body13"}
                              ></review-user-info>
                              ${this.commentText}
                            </div>
                          `:null}
                      ${this.review?.product_option&&this.designOption?.writer&&this.designOption?.product_option?Je`
                            <review-custom-icon
                              .type=${xt}
                              .width=${4}
                              .height=${4}
                              .color=${"#1e293b1a"}
                            ></review-custom-icon>
                          `:null}
                      ${this.designOption.product_option?Je`
                            <div
                              class="product-option-box alp-body13 ${this.designOption.product_option&&this.review?.product_option?"":"hidden"}"
                            >
                              ${this.review?.product_option?this.review?.product_option+"\uad6c\ub9e4":"1"}
                            </div>
                          `:null}
                    </div>
                  `:null}
          </div>
          ${this.productBox()}
        </div>`:Je`
          <review-best-text-skeleton
            .designOption=${this.designOption}
            .isReviewListLoading=${this.isReviewListLoading}
          ></review-best-text-skeleton>
        `} `}};Zh([i({type:Object})],Jh.prototype,"review",2),Zh([i({type:Object})],Jh.prototype,"reviewList",2),Zh([i({type:Number})],Jh.prototype,"index",2),Zh([i({type:Object})],Jh.prototype,"designOption",2),Zh([i({type:Object})],Jh.prototype,"filterOption",2),Zh([i({type:Boolean})],Jh.prototype,"isReviewListLoading",2),Jh=Zh([ae("review-best-text-card")],Jh);var Qh=Object.defineProperty,Xh=Object.getOwnPropertyDescriptor,eg=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?Xh(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Qh(t,i,s),s};let tg=class extends ht{constructor(){super(...arguments),this.isReviewListLoading=!1}render(){return Je`
      <div class="best-text-review-content">
        
        ${this.designOption?.ratings?Je`
              <div class="skeleton-stars-box">
                ${Array.from({length:5}).map(()=>Je`<review-star-icon
                        class="skeleton-star-icon sm"
                        .size=${16}
                        .color=${"rgba(94, 103, 118, 0.13)"}
                      ></review-star-icon>
                      <review-star-icon
                        class="skeleton-star-icon lg"
                        .size=${22}
                        .color=${"rgba(94, 103, 118, 0.13)"}
                      ></review-star-icon>`)}
              </div>
            `:null}

        
        <div class="review-wrapper">
          <div
            class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-review-text"
          ></div>
        </div>

        
        ${this.designOption?.writer||this.designOption?.product_option?Je`
              <div class="writer-info-box">
                <div
                  class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-writer"
                ></div>
              </div>
            `:null}
      </div>

      
      ${this.designOption?.product_info?Je`
            <div class="product-info-box">
              ${this.designOption?.product_img?Je`<div
                    class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-thumbnail"
                  ></div>`:null}
              <div class="product-content-box">
                ${this.designOption?.product_name?Je`<div
                      class="${this.isReviewListLoading?"":"remove-shimmer"} review-skeleton skeleton-product-name"
                    ></div>`:null}
              </div>
            </div>
          `:null}
    `}};tg.styles=[ko,ue`:host{display:block}.remove-shimmer{animation:none}.best-text-review-content{box-sizing:border-box;background:var(--alp-review-card-gray03,#1e293b08);border-radius:4px;flex-direction:column;justify-content:center;align-items:center;min-height:200px;padding:50px 40px;display:flex;overflow:hidden}.skeleton-stars-box{align-items:center;margin-bottom:12px;display:flex}.sm{display:none}.lg{display:flex}.review-wrapper{width:100%;margin-top:12px;margin-bottom:12px}.skeleton-review-text{border-radius:4px;width:100%;height:1.5rem}.writer-info-box{justify-content:center;align-items:center;gap:6px;width:100%;height:23px;display:flex}.skeleton-writer{border-radius:4px;width:50%;height:17px}.product-info-box{justify-content:center;align-items:center;gap:14px;width:100%;padding:20px 10px 10px;display:flex}.skeleton-thumbnail{border-radius:50%;flex-shrink:0;width:34px;height:34px}.product-content-box{flex-direction:column;gap:8px;width:50%;display:flex;overflow:hidden}.skeleton-product-name{border-radius:4px;width:80%;height:17px}.skeleton-rating-box{align-items:center;gap:4px;display:flex}.skeleton-rating-text{border-radius:4px;width:40%;height:17px}@container (width<=440px){.best-text-review-content{min-height:170px;padding:28px 20px 20px}.sm{display:flex}.lg{display:none}.review-wrapper{margin-top:10px;margin-bottom:20px}.product-info-box{justify-content:flex-start}}`],eg([i({type:Object})],tg.prototype,"designOption",2),eg([i({type:Boolean})],tg.prototype,"isReviewListLoading",2),tg=eg([ae("review-best-text-skeleton")],tg);const ig=ue`:host{width:100%;display:block;container:instagram-feed-widget-container/inline-size}#ar-if-widget *{box-sizing:inherit;letter-spacing:-.6px;-webkit-user-select:none;-moz-user-select:none;user-select:none;-khtml-user-select:none;-o-user-select:none;-webkit-user-drag:none;-khtml-user-drag:none;-moz-user-drag:none;-o-user-drag:none;-webkit-tap-highlight-color:#0000;font-family:inherit}#ar-if-widget{-webkit-text-size-adjust:none;-moz-text-size-adjust:none;text-size-adjust:none;width:var(--container-width);gap:var(--pc-widget-column-gap);flex-direction:column;height:fit-content;margin:0 auto;display:flex}.ar-if-profile-wrap{flex-direction:var(--profile-flex-direction);text-align:var(--profile-text-align);gap:var(--profile-gap);order:0;display:flex}.ar-if-profile-wrap.column{align-items:var(--profile-flex-justify);justify-content:center}.ar-if-profile-wrap.row{align-items:center;justify-content:var(--profile-flex-justify)}.ar-if-profile-wrap[data-layout=row][data-align=center]{text-align:left}.ar-if-profile-wrap[data-layout=row][data-align=center] .ar-if-profile-info .ar-if-profile-follower{justify-content:flex-start}.ar-if-profile-img{border-radius:50%;width:120px;min-width:120px;height:120px;min-height:120px;overflow:hidden}.ar-if-profile-img img{object-fit:cover;width:100%;height:100%}.ar-if-profile-info{color:var(--profile-font-color);flex-direction:column;gap:12px;padding-bottom:24px;display:flex}.ar-if-profile-info.no-spacing{padding-bottom:0}.ar-if-profile-id{font-size:var(--profile-pc-font-size);font-weight:600}.ar-if-profile-follower{gap:4px;justify-content:var(--profile-flex-justify);font-size:20px;display:flex}.ar-if-profile-content{max-width:328px;color:var(--profile-font-color);flex-direction:column;gap:6px;font-size:16px;display:flex}.ar-if-profile-content div{word-break:break-all;white-space:pre-line}.ar-if-media-wrap{gap:var(--post-container-column-gap);flex-direction:column;order:1;width:100%;padding-bottom:24px;display:flex}.ar-if-media-title{font-size:var(--post-title-pc-font-size);text-align:var(--post-title-align);color:var(--post-title-font-color);word-break:break-all;white-space:pre-line;font-weight:700}.ar-if-media-inner{position:relative;overflow:hidden}.ar-if-media-inner>div{gap:var(--post-gap);display:flex}.ar-if-media-inner>div.grid-wrapper{flex-wrap:wrap}.ar-if-media-inner>div div{aspect-ratio:1;width:calc((100% - (var(--post-gap)*(var(--post-pc-column) - 1)))/var(--post-pc-column));border-radius:var(--post-radius);cursor:pointer;position:relative;overflow:hidden}.ar-if-media-inner>div div.swiper-slide{margin:0!important}.ar-if-media-inner>div div img{object-fit:cover;width:100%;height:100%;display:block}.item{position:relative}.item .ar-if-play-icon{color:#fff;filter:drop-shadow(0 2px 4px #0000004d);z-index:1;width:32px;height:32px;position:absolute;top:2%;right:2%}.ar-if-media-inner>span{cursor:pointer;transition:opacity .25s;position:absolute;top:50%}.ar-if-media-inner>span:after{content:""}.swiper-notification{display:none}@media (width<840px){#ar-if-widget{width:var(--container-width);gap:var(--mo-widget-column-gap);max-width:calc(100vw - 32px)}.ar-if-profile-wrap{gap:16px}.ar-if-profile-img{width:52px;min-width:52px;height:52px;min-height:52px}.ar-if-profile-wrap.row .ar-if-profile-img{align-self:flex-start;width:100px;min-width:100px;height:100px;min-height:100px}.ar-if-profile-info{gap:8px;padding-bottom:16px}.ar-if-profile-id{font-size:var(--profile-mo-font-size)}.ar-if-profile-follower{gap:3px;font-size:13px}.ar-if-profile-content{gap:3px;max-width:100%;font-size:13px}.ar-if-media-title{font-size:var(--post-title-mo-font-size)}.ar-if-media-inner>div div{width:calc((100% - (var(--post-gap)*(var(--post-mo-column) - 1)))/var(--post-mo-column))}.ar-if-media-inner>span{width:32px;height:32px}}@container (width<=840px){:host{max-width:100%}#ar-if-widget{gap:var(--mo-widget-column-gap);width:var(--container-width)}.ar-if-profile-wrap{gap:16px}.ar-if-profile-img{width:52px;min-width:52px;height:52px;min-height:52px}.ar-if-profile-wrap.row .ar-if-profile-img{align-self:flex-start;width:100px;min-width:100px;height:100px;min-height:100px}.ar-if-profile-info{gap:8px;padding-bottom:16px}.ar-if-profile-id{font-size:var(--profile-mo-font-size)}.ar-if-profile-follower{gap:3px;font-size:13px}.ar-if-profile-content{gap:3px;max-width:100%;font-size:13px}.ar-if-media-title{font-size:var(--post-title-mo-font-size)}.ar-if-media-inner>div div{width:calc((100% - (var(--post-gap)*(var(--post-mo-column) - 1)))/var(--post-mo-column))}.ar-if-play-icon{width:24px;height:24px}.ar-if-media-inner>span{width:32px;height:32px}}`;var rg=Object.defineProperty,og=Object.getOwnPropertyDescriptor,sg=(e,t,i,r)=>{for(var o,s=r>1?void 0:r?og(t,i):t,n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&rg(t,i,s),s};const ng="https://s3.ap-northeast-2.amazonaws.com/core.front.static/review/design/instagram-feed/instagram-feed-default-profile-img.png";let ag=class extends ht{constructor(){super(...arguments),this.feedSwiper=null,this.widgetCode="",this.widgetSetCode="",this.widgetCustomClass="",this.widgetCustomId="",this.isDummy=!1,this.useWidgetConfig=null,this.feedDesign=null,this.profileDesign=null,this.postDesign=null,this.account=null,this.mediaPhotos=[],this.isLoading=!0,this.shopId=0,this.grid={col:0,row:0,layout:"grid"}}async connectedCallback(){super.connectedCallback()}async firstUpdated(e){super.firstUpdated(e),await this.loadData(),await this.updateComplete,this.shouldInitializeSwiper()&&(await this.initializeSwiper(),this.requestUpdate(),await this.updateComplete),this.initializeResizeManager()}disconnectedCallback(){super.disconnectedCallback(),this.destroySwiper()}initializeResizeManager(){this.resizeCtrl=new zr(this,async e=>{if("mobile"!==e)try{if(this.setResponsiveOptions(),this.destroySwiper(),this.requestUpdate(),await this.updateComplete,"slider"===this.grid.layout)await this.initializeSwiper(),this.requestUpdate();else{const e=this.shadowRoot?.querySelector(".ar-if-media-inner .grid-wrapper");e&&(e.style.cssText=`\n                grid-template-columns: repeat(${this.grid.col}, 1fr);\n              `)}}catch(e){}},{target:"self"})}async loadData(){try{const e=await async function(e){try{return await or.get("/feed",{query:e})}catch(e){return null}}({mall_id:(await m()).mall_id||"",shop_no:(await m()).shop_no||""});if(!e||!e.use_ig_profile&&!e.use_ig_media)return void(this.isLoading=!1);this.useWidgetConfig=e,this.shopId=e.shop_id;const t=await async function(e){try{return await or.get("/feed/design",{query:{shop_id:e.shop_id}})}catch(e){return null}}({shop_id:this.shopId});if(!t)return void(this.isLoading=!1);this.setDesignOptions(t),this.setResponsiveOptions();const i=[];this.useWidgetConfig.use_ig_profile&&i.push(async function(e){try{return await or.get("/feed/profile",{query:e})}catch(e){return null}}({shop_id:this.shopId}).then(e=>{this.account=e})),this.useWidgetConfig.use_ig_media&&i.push(async function(e){try{return await or.get("/feed/media",{query:e})}catch(e){return null}}({shop_id:this.shopId}).then(e=>{this.mediaPhotos=e||[]})),await Promise.all(i),this.isLoading=!1}catch(e){this.isLoading=!1}}setDesignOptions(e){this.feedDesign={widget_spacing_mo:e.widget_spacing_mo,widget_spacing_pc:e.widget_spacing_pc,title_content_spacing:e.title_content_spacing,content_spacing:e.content_spacing,content_width:e.content_width,use_content_width_fixed:e.use_content_width_fixed,content_radius:e.content_radius},this.postDesign={ig_media_title:e.ig_media_title,use_ig_media_title:e.use_ig_media_title,ig_media_align:e.ig_media_align,ig_media_font_size_mo:e.ig_media_font_size_mo,ig_media_font_size_pc:e.ig_media_font_size_pc,ig_media_font_color:e.ig_media_font_color,ig_media_row_mo:e.ig_media_row_mo,ig_media_column_mo:e.ig_media_column_mo,ig_media_layout_mo:e.ig_media_layout_mo,ig_media_row_pc:e.ig_media_row_pc,ig_media_column_pc:e.ig_media_column_pc,ig_media_layout_pc:e.ig_media_layout_pc},this.profileDesign={use_ig_profile_image:e.use_ig_profile_image,use_ig_profile_user_name:e.use_ig_profile_user_name,use_ig_profile_follower_count:e.use_ig_profile_follower_count,use_ig_profile_name:e.use_ig_profile_name,use_ig_profile_description:e.use_ig_profile_description,ig_profile_align:e.ig_profile_align,ig_profile_layout:e.ig_profile_layout,ig_profile_font_size_mo:e.ig_profile_font_size_mo,ig_profile_font_size_pc:e.ig_profile_font_size_pc,ig_profile_font_color:e.ig_profile_font_color}}shouldInitializeSwiper(){return!(!this.useWidgetConfig?.use_ig_media||!this.postDesign)&&"slider"===this.grid.layout&&this.mediaPhotos.length>0}async initializeSwiper(){this.destroySwiper(),window?.CUSTOM_SWIPER?.swiper?this.initSwiperLayout():await p(()=>{this.initSwiperLayout()})}initSwiperLayout(){if(!this.postDesign||!this.feedDesign)return;const e=this.shadowRoot?.querySelector(".ar-if-swiper");e&&(this.feedSwiper=n({container:e,styleRoot:this.shadowRoot,options:{slidesPerView:this.grid.col,spaceBetween:this.feedDesign.content_spacing,slidesPerGroup:this.grid.col,speed:500,grid:this.grid.row>1?{rows:this.grid.row,fill:"row"}:void 0},event:{slideChange:()=>{this.requestUpdate()}}}))}destroySwiper(){this.feedSwiper&&(this.feedSwiper.destroy(!0,!0),this.feedSwiper=null)}get isPrevVisible(){return!this.feedSwiper?.isBeginning}get isNextVisible(){return!this.feedSwiper?.isEnd}onPrevClick(){this.feedSwiper?.slidePrev()}onNextClick(){this.feedSwiper?.slideNext()}setResponsiveOptions(){this.postDesign&&(this.grid={col:this.isMobile()?this.postDesign.ig_media_column_mo:this.postDesign.ig_media_column_pc,row:this.isMobile()?this.postDesign.ig_media_row_mo:this.postDesign.ig_media_row_pc,layout:this.isMobile()?this.postDesign.ig_media_layout_mo:this.postDesign.ig_media_layout_pc})}isMobile(){const e=window.matchMedia("(max-width: 840px)").matches,t=this.getBoundingClientRect().width;return e||t<840}getContainerStyles(){return this.feedDesign&&this.profileDesign&&this.postDesign?`\n      --mo-widget-column-gap: ${this.feedDesign.widget_spacing_mo}px;\n      --pc-widget-column-gap: ${this.feedDesign.widget_spacing_pc}px;\n      --post-container-column-gap: ${this.feedDesign.title_content_spacing}px;\n      --post-gap: ${this.feedDesign.content_spacing}px;\n      --container-width: ${this.feedDesign.content_width}${this.feedDesign.use_content_width_fixed?"px":"%"};\n      --post-radius: ${this.feedDesign.content_radius}px;\n      --profile-text-align: ${this.profileDesign.ig_profile_align.toLowerCase()};\n      --profile-flex-direction: ${this.profileDesign.ig_profile_layout.toLowerCase()};\n      --profile-gap: ${"column"===this.profileDesign.ig_profile_layout?"24px":"32px"};\n      --profile-flex-justify: ${"left"===this.profileDesign.ig_profile_align?"flex-start":"right"===this.profileDesign.ig_profile_align?"flex-end":"center"};\n      --profile-mo-font-size: ${this.profileDesign.ig_profile_font_size_mo}px;\n      --profile-pc-font-size: ${this.profileDesign.ig_profile_font_size_pc}px;\n      --profile-font-color: ${this.profileDesign.ig_profile_font_color};\n      --post-title-align: ${this.postDesign.ig_media_align.toLowerCase()};\n      --post-title-mo-font-size: ${this.postDesign.ig_media_font_size_mo}px;\n      --post-title-pc-font-size: ${this.postDesign.ig_media_font_size_pc}px;\n      --post-title-font-color: ${this.postDesign.ig_media_font_color};\n      --post-mo-column: ${this.postDesign.ig_media_column_mo};\n      --post-mo-row: ${this.postDesign.ig_media_row_mo};\n      --post-pc-column: ${this.postDesign.ig_media_column_pc};\n      --post-pc-row: ${this.postDesign.ig_media_row_pc};\n    `:""}renderProfile(){if(!this.useWidgetConfig?.use_ig_profile||!this.account||!this.profileDesign)return null;const e=this.account.profile_image?.trim()||ng,t="null"!==e.toLowerCase()&&"undefined"!==e.toLowerCase()?e:ng;return Je`
      <div
        class="ar-if-profile-wrap ${this.profileDesign.ig_profile_layout.toLowerCase()}"
        data-layout="${this.profileDesign.ig_profile_layout.toLowerCase()}"
        data-align="${this.profileDesign.ig_profile_align.toLowerCase()}"
      >
        ${this.profileDesign.use_ig_profile_image?Je`
              <a
                href="https://www.instagram.com/${this.account.user_name||""}"
                target="_blank"
                class="ar-if-profile-img"
              >
                <img
                  src="${t}"
                  alt="ì¸ì¤íê·¸ë¨ íë¡í ì´ë¯¸ì§"
                  @error="${e=>{e.target.src=ng}}"
                />
              </a>
            `:null}
        <div>
          ${this.profileDesign.use_ig_profile_user_name||this.profileDesign.use_ig_profile_follower_count?Je`
                <div
                  class="ar-if-profile-info ${this.profileDesign.use_ig_profile_follower_count?"":"no-spacing"}"
                >
                  ${this.profileDesign.use_ig_profile_user_name?Je`<div class="ar-if-profile-id">@${this.account.user_name||""}</div>`:null}
                  ${this.profileDesign.use_ig_profile_follower_count?Je`<div class="ar-if-profile-follower">
                        <span>íë¡ì</span><strong>${this.account.follower_count}</strong>
                      </div>`:null}
                </div>
              `:null}
          ${this.profileDesign.use_ig_profile_name||this.profileDesign.use_ig_profile_description?Je`
                <div class="ar-if-profile-content">
                  ${this.profileDesign.use_ig_profile_name?Je`<strong>${this.account.name||""}</strong>`:null}
                  ${this.profileDesign.use_ig_profile_description?Je`<div>${this.account.description||""}</div>`:null}
                </div>
              `:null}
        </div>
      </div>
    `}renderMediaItem(e,t){return Je`
      <div class="${("slider"===t?"swiper-slide":"grid-item")+" item"}" @click="${()=>window.open(e.permalink,"_blank")}">
        <img src="${e.photo.photo_url}" alt="Instagram Media" loading="lazy" />
        ${e.photo.is_photo?null:Je`<div class="ar-if-play-icon">${Pc('<svg\n      width="100%"\n      height="100%"\n      viewBox="0 0 24 24"\n      fill="none"\n      xmlns="http://www.w3.org/2000/svg"\n    >\n      <path\n        fill-rule="evenodd"\n        clip-rule="evenodd"\n        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM9.10833 17.1272L17.7763 12.1139L9.10833 7.10071L9.10833 17.1272Z"\n        fill="currentColor"\n      />\n    </svg>')}</div>`}
      </div>
    `}renderMedia(){if(!this.useWidgetConfig?.use_ig_media||!this.mediaPhotos.length||!this.postDesign)return null;const e="slider"===this.grid.layout?this.mediaPhotos:this.mediaPhotos.slice(0,this.grid.col*this.grid.row);return Je`
      <div class="ar-if-media-wrap">
        ${this.postDesign.use_ig_media_title&&this.postDesign.ig_media_title?Je`<strong class="ar-if-media-title">${this.postDesign.ig_media_title}</strong>`:null}
        <div
          id="sw-${this.widgetCode}"
          class="${"slider"===this.grid.layout?"ar-if-swiper":"ar-if-grid"} ar-if-media-inner"
        >
          <div class="${"slider"===this.grid.layout?"swiper-wrapper":"grid-wrapper"}">
            ${e.map(e=>this.renderMediaItem(e,this.grid.layout))}
          </div>
          ${"slider"===this.grid.layout?Je`
                <review-arrow-pagination-handler
                  .type=${Xt}
                  .isPrevVisible=${this.isPrevVisible}
                  .isNextVisible=${this.isNextVisible}
                  @prevArrowClick=${this.onPrevClick}
                  @nextArrowClick=${this.onNextClick}
                ></review-arrow-pagination-handler>
              `:null}
        </div>
      </div>
    `}render(){return this.isLoading?Je`<div style="width:100%; height:1px;"></div>`:this.useWidgetConfig?Je`
      <section id="ar-if-widget" style="${this.getContainerStyles()}">
        ${this.renderProfile()} ${this.renderMedia()}
      </section>
    `:null}};ag.styles=ig,sg([i({type:String,attribute:"data-widget-code"})],ag.prototype,"widgetCode",2),sg([i({type:String,attribute:"data-widget-set-code"})],ag.prototype,"widgetSetCode",2),sg([i({type:String,attribute:"data-widget-custom-class"})],ag.prototype,"widgetCustomClass",2),sg([i({type:String,attribute:"data-widget-custom-id"})],ag.prototype,"widgetCustomId",2),sg([i({type:Boolean,attribute:"data-dummy"})],ag.prototype,"isDummy",2),sg([r()],ag.prototype,"useWidgetConfig",2),sg([r()],ag.prototype,"feedDesign",2),sg([r()],ag.prototype,"profileDesign",2),sg([r()],ag.prototype,"postDesign",2),sg([r()],ag.prototype,"account",2),sg([r()],ag.prototype,"mediaPhotos",2),sg([r()],ag.prototype,"isLoading",2),sg([r()],ag.prototype,"shopId",2),sg([r()],ag.prototype,"grid",2),ag=sg([ae("review-instagram-feed")],ag),function(){if("ORDER_ORDERRESULT"!==window.CAPP_ASYNC_METHODS?.EC_PATH_ROLE)return;const e=new URLSearchParams(window.location.search).get("order_id");e&&t("order_complete_view",{order_platform_id:e})}()}();
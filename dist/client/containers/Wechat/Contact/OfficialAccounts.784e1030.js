webpackJsonp([8],{361:function(t,e,n){try{(function(){"use strict";function t(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r,a,i,c,o=t(n(2)),l=t(n(10)),u=t(n(3)),f=t(n(6)),s=t(n(11)),d=t(n(12)),h=n(1),p=t(h),y=t(n(9)),m=n(38),v=n(24),k=t(n(394)),S=t(n(120)),A=t(n(344)),E=t(n(345)),g=t(n(350)),w=t(n(409)),C=t(n(347)),L=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(122)),b=t(n(348)),x=t(n(119));n(410);var N=(0,S.default)("wechat:contact"),T=(r=(0,w.default)(),(0,C.default)(a=r((c=i=function(t){function e(t){(0,u.default)(this,e);var n=(0,s.default)(this,(e.__proto__||(0,l.default)(e)).call(this,t));return n.onClickOfficialAccount=function(t){return function(){n.props.setState({selectedofficialAccount:t}),n.props.history.push("/wechat/contact/official-account/"+t.wxid)}},n.getStickyContainerCells=function(t){var e=n.props.officialAccounts;return e[t]?e[t].map(function(t){return{left:p.default.createElement("img",{src:t.headerUrl}),center:p.default.createElement("p",null,t.name),onClick:n.onClickOfficialAccount(t)}}):[]},n.state={fontSize:"16"},N("official accounts letters:",t.letters),N("official accounts letters total:",t.total),n.checkIsSubRoute=n.checkIsSubRoute.bind(n),n.triggerStickyAnchorLetter=n.triggerStickyAnchorLetter.bind(n),n.onClickAnchorLetter=n.onClickAnchorLetter.bind(n),n.redrawStickyAnchorLetter=n.redrawStickyAnchorLetter.bind(n),n.renderLetterStickyContainer=n.renderLetterStickyContainer.bind(n),n.renderStickyAnchor=n.renderStickyAnchor.bind(n),n.renderStickyStatistics=n.renderStickyStatistics.bind(n),n}return(0,d.default)(e,t),(0,f.default)(e,[{key:"componentDidMount",value:function(){this.props.officialAccounts||this.props.fetchOfficialAccounts();var t=(b.default.getElementStyle(document.documentElement,"font-size")||"16px").replace("px","");this.setState({fontSize:t}),this.throttleRedrawStickyAnchorLetter=(0,k.default)(this.redrawStickyAnchorLetter,16.7),window.addEventListener("scroll",this.throttleRedrawStickyAnchorLetter,!1)}},{key:"componentWillUnmount",value:function(){this.throttleRedrawStickyAnchorLetter&&(window.removeEventListener("scroll",this.throttleRedrawStickyAnchorLetter,!1),this.throttleRedrawStickyAnchorLetter=!1)}},{key:"render",value:function(){var t=this;return this.props.officialAccounts?p.default.createElement("div",{className:"contact-official-accounts-wrapper",ref:function(e){return t.officialAccountsWrapper=e}},p.default.createElement(A.default,{title:"公众号",back:p.default.createElement(E.default,{history:this.props.history},p.default.createElement("span",{className:"weui-back-centent"},"通讯录"))},p.default.createElement("i",{className:"icon-header-operation iconfont icon-tips-jia"})),p.default.createElement(g.default,null),this.renderLetterStickyContainer(),this.renderStickyStatistics("个公众号"),this.renderStickyAnchor()):null}}]),e}(h.Component),i.propTypes={officialAccounts:y.default.object,letters:y.default.array,total:y.default.number.isRequired,fetchOfficialAccounts:y.default.func.isRequired},a=c))||a)||a);e.default=(0,m.connectAdvanced)(function(t){var e={},n=(0,v.bindActionCreators)(L,t);return function(t,r){var a=t.wechat.contactMain,i=void 0===a?{}:a,c=i.selectedContacter,l=i.officialAccountsLetters,u=i.officialAccountsGroups,f=i.officialAccounts,s=f?f.length:0,d=(0,o.default)({},r,{officialAccounts:u,letters:l,total:s,selectedContacter:c},n);return e=x.default.shallowEqual(e,d)?e:d}})(T)}).call(this)}finally{}},394:function(t,e,n){var r=n(395),a=n(17),i="Expected a function";t.exports=function(t,e,n){var c=!0,o=!0;if("function"!=typeof t)throw new TypeError(i);return a(n)&&(c="leading"in n?!!n.leading:c,o="trailing"in n?!!n.trailing:o),r(t,e,{leading:c,maxWait:e,trailing:o})}},395:function(t,e,n){var r=n(17),a=n(396),i=n(397),c="Expected a function",o=Math.max,l=Math.min;t.exports=function(t,e,n){function u(e){var n=m,r=v;return m=v=void 0,g=e,S=t.apply(r,n)}function f(t){return g=t,A=setTimeout(h,e),w?u(t):S}function s(t){var n=t-g,r=e-(t-E);return C?l(r,k-n):r}function d(t){var n=t-E,r=t-g;return void 0===E||n>=e||n<0||C&&r>=k}function h(){var t=a();if(d(t))return p(t);A=setTimeout(h,s(t))}function p(t){return A=void 0,L&&m?u(t):(m=v=void 0,S)}function y(){var t=a(),n=d(t);if(m=arguments,v=this,E=t,n){if(void 0===A)return f(E);if(C)return A=setTimeout(h,e),u(E)}return void 0===A&&(A=setTimeout(h,e)),S}var m,v,k,S,A,E,g=0,w=!1,C=!1,L=!0;if("function"!=typeof t)throw new TypeError(c);return e=i(e)||0,r(n)&&(w=!!n.leading,k=(C="maxWait"in n)?o(i(n.maxWait)||0,e):k,L="trailing"in n?!!n.trailing:L),y.cancel=function(){void 0!==A&&clearTimeout(A),g=0,m=E=v=A=void 0},y.flush=function(){return void 0===A?S:p(a())},y}},396:function(t,e,n){var r=n(8);t.exports=function(){return r.Date.now()}},397:function(t,e,n){var r=n(17),a=n(39),i=NaN,c=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,u=/^0o[0-7]+$/i,f=parseInt;t.exports=function(t){if("number"==typeof t)return t;if(a(t))return i;if(r(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=r(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(c,"");var n=l.test(t);return n||u.test(t)?f(t.slice(2),n?2:8):o.test(t)?i:+t}},409:function(t,e,n){try{(function(){"use strict";function t(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=t(n(2)),a=t(n(349)),i=t(n(1)),c=n(352),o=t(n(13)),l=t(n(128)),u=t(n(346)),f=n(64),s=t(n(348));e.default=function(t){var e=(t=t||(0,l.default)())+"-alpha%s";return function(t){t.prototype.onClickAnchorLetter=function(t){var n=this;return function(r){var a=document.getElementById(e.replace("%s",t));a&&Math.abs(a.offsetTop-f.HEADER_HEIGHT*n.state.fontSize)>=5&&window.scrollTo(0,a.offsetTop),r.stopPropagation()}},t.prototype.redrawStickyAnchorLetter=function(){if(!this.checkIsSubRoute()){var t=this.officialAccountsWrapper||document,e=t.getElementsByClassName("sticky"),n=e.length,r=void 0;e.length&&(r=e[n-1].getAttribute("data-alpha"));var i=t.getElementsByClassName("letter-anchor"),c=!0,o=!1,l=void 0;try{for(var u,f=(0,a.default)(i);!(c=(u=f.next()).done);c=!0){var d=u.value;s.default.hasClassName(d,"anchor-sticky")&&d.innerText!==r&&s.default.removeClassName(d,"anchor-sticky"),d.innerText===r&&s.default.addClassName(d,"anchor-sticky")}}catch(t){o=!0,l=t}finally{try{!c&&f.return&&f.return()}finally{if(o)throw l}}}},t.prototype.triggerStickyAnchorLetter=function(t){var e=(this.officialAccountsWrapper||document).getElementsByClassName("letter-anchor"),n=!0,r=!1,i=void 0;try{for(var c,o=(0,a.default)(e);!(n=(c=o.next()).done);n=!0){var l=c.value;s.default.hasClassName(l,"anchor-sticky")&&l.innerText!==t&&s.default.removeClassName(l,"anchor-sticky"),l.innerText===t&&s.default.addClassName(l,"anchor-sticky")}}catch(t){r=!0,i=t}finally{try{!n&&o.return&&o.return()}finally{if(r)throw i}}},t.prototype.renderLetterStickyContainer=function(){var t=this,n=this.props.letters,a=this.state.fontSize||16;return i.default.createElement("ul",{className:"contact-frineds"},n.map(function(n,l){return i.default.createElement(c.StickyContainer,{className:"contact-friends-group",key:l},i.default.createElement(c.Sticky,{topOffset:-((f.HEADER_HEIGHT+.56)*a-2)},function(c){var l=c.isSticky,u=c.style;return l&&t.stickyLetter!==n&&(t.triggerStickyAnchorLetter(n),t.stickyLetter=n),i.default.createElement("p",{id:e.replace("%s",n),"data-alpha":n,className:(0,o.default)("contact-alpha",{sticky:l}),style:(0,r.default)({},u,{top:f.HEADER_HEIGHT*a-2})},n)}),i.default.createElement(u.default,{cells:t.getStickyContainerCells(n)}))}))},t.prototype.renderStickyAnchor=function(){var t=this,e=this.props.letters;return i.default.createElement("ul",{className:"anchor-bar"},e.map(function(e,n){return i.default.createElement("li",{className:(0,o.default)("letter-anchor","letter-anchor-"+e),key:n,onClick:t.onClickAnchorLetter(e)},e)}))},t.prototype.renderStickyStatistics=function(t){var e=this.props.total;return i.default.createElement("p",{className:"contact-statistics"},""+e+t)}}}}).call(this)}finally{}},410:function(t,e){}});
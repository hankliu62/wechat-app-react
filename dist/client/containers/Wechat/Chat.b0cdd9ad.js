webpackJsonp([0],{375:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n,r,l,o=e(a(2)),i=e(a(10)),u=e(a(3)),c=e(a(6)),s=e(a(11)),d=e(a(12)),f=a(1),h=e(f),m=e(a(9)),p=a(38),v=a(24),y=e(a(13)),_=e(a(344)),E=e(a(350)),b=e(a(431)),M=e(a(347)),w=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}(a(129)),S=e(a(119));a(438);var R=(0,M.default)((l=r=function(e){function t(){return(0,u.default)(this,t),(0,s.default)(this,(t.__proto__||(0,i.default)(t)).apply(this,arguments))}return(0,d.default)(t,e),(0,c.default)(t,[{key:"componentDidMount",value:function(){this.props.chats||this.props.fetchChats()}},{key:"render",value:function(){var e=this.props,t=e.children,a=e.chatRooms;return e.chats?h.default.createElement("div",{className:(0,y.default)("chat-wrapper",{"with-sub-wrapper without-footer-wrapper":this.checkIsSubRoute()})},h.default.createElement("div",{className:"chat-main-wrapper"},h.default.createElement(_.default,{title:"微信"},h.default.createElement("i",{className:"icon-header-operation iconfont icon-tips-jia"})),h.default.createElement(E.default,null),h.default.createElement(b.default,{chatRooms:a})),t&&t):null}}]),t}(f.Component),r.propTypes={chats:m.default.array,chatRooms:m.default.array,fetchChats:m.default.func.isRequired},n=l))||n;t.default=(0,p.connectAdvanced)(function(e){var t={},a=(0,v.bindActionCreators)(w,e);return function(e,n){var r=e.wechat.chatMain,l=void 0===r?{}:r,i=l.chats,u=l.chatRooms,c=(0,o.default)({},n,{chats:i,chatRooms:u},a);return t=S.default.shallowEqual(t,c)?t:c}})(R)}).call(this)}finally{}},386:function(e,t,a){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.DateHHmm="HH:mm",t.DateYYMDWithSeparator="YY%sM%sD",t.DateYYYYMMDD="YYYY-MM-DD",t.DateM="M",t.DateD="D",t.Datedddd="dddd"}).call(this)}finally{}},392:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=e(a(1)),r=e(a(13)),l=a(121);a(393);t.default=function(e){var t=(e.images||[]).slice(0,9);t.reverse();var a=t.length,o=a>4?3:Math.ceil(a/2),i=(0,l.chunk)(t,o);return i.reverse(),n.default.createElement("div",{className:(0,r.default)("weui-chat-avatar","weui-chat-avatar-"+a)},i.map(function(e,t){return e.reverse(),n.default.createElement("div",{className:"chat-avatar-group",key:"avatar-group$-"+t},e.map(function(e,t){return n.default.createElement("img",{className:(0,r.default)("chat-avatar","chat-avatar-"+a),src:e,key:"image"+t})}))}))}}).call(this)}finally{}},393:function(e,t){},431:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n,r,l,o=e(a(2)),i=e(a(127)),u=e(a(10)),c=e(a(3)),s=e(a(6)),d=e(a(11)),f=e(a(12)),h=a(1),m=e(h),p=e(a(432));a(437);var v=(r=n=function(e){function t(e){(0,c.default)(this,t);var a=(0,d.default)(this,(t.__proto__||(0,u.default)(t)).call(this,e));l.call(a);var n=(e.chatRooms||[]).map(function(e){return(0,i.default)(e.link)});return a.state={chatRoomsSymbols:n},a}return(0,f.default)(t,e),(0,s.default)(t,[{key:"render",value:function(){var e=this;return m.default.createElement("div",{className:"weui-chat-rooms"},this.props.chatRooms&&this.props.chatRooms.map(function(t,a){return m.default.createElement(p.default,(0,o.default)({restoreSymbol:e.state.chatRoomsSymbols[a],key:t.link||a,onSwiperExpand:function(){return e.handleSwiperExpand(a)}},t))}))}}]),t}(h.Component),l=function(){var e=this;this.handleSwiperExpand=function(t){var a=e.state.chatRoomsSymbols.map(function(a,n){return n===t?a:(0,i.default)(e.props.chatRooms[t].link)});e.setState({chatRoomsSymbols:a})}},r);t.default=v}).call(this)}finally{}},432:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n,r,l,o,i=e(a(14)),u=e(a(10)),c=e(a(3)),s=e(a(6)),d=e(a(11)),f=e(a(12)),h=a(1),m=e(h),p=e(a(9)),v=a(4),y=e(a(13)),_=e(a(392)),E=e(a(126)),b=a(64),M=e(a(433)),w=e(a(435));a(436);var S=(n=(0,w.default)("3.9rem"))((o=l=function(e){function t(e){(0,c.default)(this,t);var a=(0,d.default)(this,(t.__proto__||(0,u.default)(t)).call(this,e));return a.handleSwiperExpand=function(){a.props.onSwiperExpand()},a.renderAvatar=function(){var e=a.props,t=e.type,n=e.headerImages;switch(t){case b.CHAT_ROOM_TYPE_GROUP:case b.CHAT_ROOM_TYPE_FRIENDS:case b.CHAT_ROOM_TYPE_SERVICE:return m.default.createElement(_.default,{images:n})}},a.bindSwiper=a.bindSwiper.bind(a),a.unbindSwiper=a.unbindSwiper.bind(a),a.restoreSwiper=a.restoreSwiper.bind(a),a}return(0,f.default)(t,e),(0,s.default)(t,[{key:"componentDidMount",value:function(){var e=this.bindSwiper(this.chatRoomWrapper,this.handleSwiperExpand),t=e.handleTouchstart,a=e.handleTouchmove,n=e.handleTouchend;this.handleTouchstart=t,this.handleTouchmove=a,this.handleTouchend=n}},{key:"componentWillReceiveProps",value:function(e){this.props.restoreSymbol!==e.restoreSymbol&&this.restoreSwiper(this.chatRoomWrapper)}},{key:"componentWillUnmount",value:function(){(this.handleTouchstart||this.handleTouchmove||this.handleTouchend)&&(this.unbindSwiper(this.chatRoomWrapper,this.handleTouchstart,this.handleTouchmove,this.handleTouchend),this.handleTouchstart=null,this.handleTouchmove=null,this.handleTouchend=null)}},{key:"render",value:function(){var e=this,t=this.props,a=t.link,n=t.title,r=t.lastTime,l=t.lastMessage,o=t.lastSpeaker,u=t.mute,c=t.type,s=t.unreadCount,d="标为未读";return s&&(d="标为已读"),c===b.CHAT_ROOM_TYPE_SERVICE&&(d="取消关注"),m.default.createElement(v.Link,{to:a||"",className:(0,y.default)("weui-chat-room",(0,i.default)({},"chat-room-"+c,!!c))},m.default.createElement("div",{className:"weui-chat-room-info",ref:function(t){return e.chatRoomWrapper=t}},m.default.createElement("div",{className:"chat-info-avatar"},this.renderAvatar(),!!+s&&m.default.createElement(E.default,{type:"count",count:s})),m.default.createElement("div",{className:"chat-info-content"},m.default.createElement("div",{className:"content-header"},m.default.createElement("div",{className:"header-title"},n),m.default.createElement("div",{className:"header-time"},M.default.convertToRelativeTime(r))),m.default.createElement("div",{className:"content-body"},m.default.createElement("div",{className:"body-message"},c===b.CHAT_ROOM_TYPE_GROUP?o+": ":"",l),m.default.createElement("div",{className:(0,y.default)("body-mute iconfont icon-mute",{hidden:!u})})))),m.default.createElement("div",{className:"weui-chat-room-operate"},m.default.createElement("div",{className:"operate-mark"},d),m.default.createElement("div",{className:"operate-del"},"删除")))}}]),t}(h.Component),l.propTypes={restoreSymbol:p.default.symbol,onSwiperExpand:p.default.func},l.defaultProps={onSwiperExpand:function(){}},r=o))||r;t.default=S}).call(this)}finally{}},433:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=e(a(3)),r=e(a(6)),l=e(a(124));a(434);var o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}(a(386)),i=function(){function e(){(0,n.default)(this,e)}return(0,r.default)(e,null,[{key:"convertToRelativeTime",value:function(e){var t=(0,l.default)(e);return t.isSame((0,l.default)(),"day")?t.format(o.DateHHmm):(0,l.default)().diff(t,"days")<=1?"昨天":(0,l.default)().diff(t,"days")<=7?t.format(o.Datedddd):t.format(o.DateYYMDWithSeparator.replace(/%s/g,"/"))}}]),e}();t.default=i}).call(this)}finally{}},434:function(e,t,a){e.exports=a(0)(329)},435:function(e,t,a){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=function(e){return e&&e.__esModule?e:{default:e}}(a(348));t.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"156px",a=(e.default.getElementStyle(document.documentElement,"font-size")||"16px").replace("px",""),n=t.indexOf("rem")>-1?t.replace("rem","")*a:t.replace("px","");return function(e){e.prototype.bindSwiper=function(e,a){var r=void 0,l=void 0,o=void 0,i=function(e){var t=e.touches[0];l=t.clientX,o=t.clientY,r=!1},u=function(t){var a=t.changedTouches[0],i=a.clientX,u=a.clientY,c=l-i,s=o-u;c<0?Math.abs(c)>=Math.abs(s)&&Math.abs(c)>20&&(e.style.transition="0.3s",e.style.marginLeft="0px",e.style.marginRight="0px"):Math.abs(c)>=Math.abs(s)&&c<n&&c>20&&(t.preventDefault(),e.style.transition="0s",e.style.marginLeft=-c+"px",e.style.marginRight=c+"px",r=!0)},c=function(n){if(r){var i=n.changedTouches[0],u=i.clientX,c=i.clientY,s=l-u,d=o-c;if(Math.abs(s)>=Math.abs(d)){if(s<0)return;Math.abs(s)<60?(e.style.transition="0.3s",e.style.marginLeft="0px",e.style.marginRight="0px"):(e.style.transition="0.3s",e.style.marginLeft="-"+t,e.style.marginRight=""+t,a&&a())}}};return e.addEventListener("touchstart",i,!1),e.addEventListener("touchmove",u,!1),e.addEventListener("touchend",c,!1),{handleTouchstart:i,handleTouchmove:u,handleTouchend:c}},e.prototype.unbindSwiper=function(e,t,a,n){e.removeEventListener("touchstart",t,!1),e.removeEventListener("touchmove",a,!1),e.removeEventListener("touchend",n,!1)},e.prototype.restoreSwiper=function(e){e.style.transition="0.3s",e.style.marginLeft="0px",e.style.marginRight="0px"}}}}).call(this)}finally{}},436:function(e,t){},437:function(e,t){},438:function(e,t){}});
webpackJsonp([14],{369:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l,r,n=e(a(2)),d=e(a(10)),s=e(a(3)),o=e(a(6)),u=e(a(11)),i=e(a(12)),c=a(1),f=e(c),p=e(a(9)),m=a(38),h=e(a(120)),v=e(a(119)),y=e(a(344)),q=e(a(345)),k=e(a(398)),g=(0,h.default)("wechat:self"),E=(r=l=function(e){function t(e){(0,s.default)(this,t);var a=(0,u.default)(this,(t.__proto__||(0,d.default)(t)).call(this,e));return g("Profile page init props: ",e),a}return(0,i.default)(t,e),(0,o.default)(t,[{key:"render",value:function(){var e=this.props,t=e.headerUrl,a=e.nickname,l=e.qrcode,r=e.gender,n=e.area,d=e.remark;return f.default.createElement("div",{className:"self-profile-wrapper"},f.default.createElement(y.default,{title:"我的二维码",back:f.default.createElement(q.default,{history:this.props.history},f.default.createElement("span",{className:"weui-back-centent"},"个人信息"))}),f.default.createElement(k.default,{isOpen:!0,qrcodeUrl:l,headerUrl:t,nickname:a,remark:d,gender:r,areas:n,shouldCloseOnOverlayClick:!1}))}}]),t}(c.Component),l.propTypes={headerUrl:p.default.string.isRequired,nickname:p.default.string.isRequired,qrcode:p.default.string.isRequired,gender:p.default.string.isRequired,remark:p.default.string,area:p.default.array},r);t.default=(0,m.connectAdvanced)(function(){var e={};return function(t,a){var l=t.wechat.selfMain,r=(void 0===l?{}:l).personal,d=void 0===r?{}:r,s=(0,n.default)({},a,d);return e=v.default.shallowEqual(e,s)?e:s}})(E)}).call(this)}finally{}},398:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l,r,n=e(a(2)),d=e(a(10)),s=e(a(3)),o=e(a(6)),u=e(a(11)),i=e(a(12)),c=a(1),f=e(c),p=e(a(9)),m=e(a(120)),h=e(a(351)),v=e(a(353)),y=e(a(354));a(399);var q=(0,m.default)("wechat:component"),k=(r=l=function(e){function t(e){(0,s.default)(this,t);var a=(0,u.default)(this,(t.__proto__||(0,d.default)(t)).call(this,e));return q("weui qrcode model init props:",e),a}return(0,i.default)(t,e),(0,o.default)(t,[{key:"render",value:function(){var e=this.props,t=e.areas,a=e.overlayStyle,l=e.contentStyle;return f.default.createElement(h.default,{isOpen:this.props.isOpen,onRequestClose:this.props.onRequestClose,shouldCloseOnOverlayClick:this.props.shouldCloseOnOverlayClick,contentLabel:"Weui Qrcode Modal",contentStyle:l,overlayStyle:(0,n.default)({backgroundColor:"rgba(0, 0, 0, 0.62)"},a)},f.default.createElement("div",{className:"weui-qrcode-modal"},f.default.createElement("header",{className:"qrcode-modal-header"},f.default.createElement("div",{className:"profile-avatar"},f.default.createElement("img",{className:"avatar",src:this.props.headerUrl})),f.default.createElement("div",{className:"profile-content"},f.default.createElement("div",{className:"content-base"},f.default.createElement(v.default,{nickname:this.props.nickname,remark:this.props.remark}),f.default.createElement(y.default,{gender:this.props.gender})),!(!t||!t.length)&&f.default.createElement("div",{className:"content-address"},t.join(" ")))),f.default.createElement("div",{className:"qrcode-modal-body"},f.default.createElement("img",{className:"profile-qrcode",src:this.props.qrcodeUrl})),f.default.createElement("footer",{className:"qrcode-modal-footer"},"扫一扫上面的二维码图案，加我微信")))}}]),t}(c.Component),l.propTypes={qrcodeUrl:p.default.string.isRequired,headerUrl:p.default.string.isRequired,nickname:p.default.string.isRequired,remark:p.default.string,gender:p.default.string,areas:p.default.array,isOpen:p.default.bool.isRequired,shouldCloseOnOverlayClick:p.default.bool,overlayStyle:p.default.object,contentStyle:p.default.object,onRequestClose:p.default.func},l.defaultProps={isOpen:!1,shouldCloseOnOverlayClick:!0,overlayStyle:{},contentStyle:{},onRequestClose:function(){}},r);t.default=k}).call(this)}finally{}},399:function(e,t){}});
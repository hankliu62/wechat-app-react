webpackJsonp([21],{641:function(t,e,n){try{(function(){"use strict";function t(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var u,a,o=t(n(12)),r=t(n(63)),i=t(n(37)),l=t(n(52)),c=t(n(64)),f=t(n(65)),d=n(10),s=t(d),p=t(n(91)),v=n(92),y=n(66),_=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(820)),h=t(n(213)),m=(a=u=function(t){function e(){return(0,i.default)(this,e),(0,c.default)(this,(e.__proto__||(0,r.default)(e)).apply(this,arguments))}return(0,f.default)(e,t),(0,l.default)(e,[{key:"componentDidMount",value:function(){var t=this;setTimeout(function(){t.props.setState({content:"Modified Redux Content Data"})},3e3)}},{key:"render",value:function(){var t=this.props.content;return s.default.createElement("div",{className:"homepage-main"},t)}}]),e}(d.Component),u.propTypes={content:p.default.string.isRequired,setState:p.default.func.isRequired},a);e.default=(0,v.connectAdvanced)(function(t){var e={},n=(0,y.bindActionCreators)(_,t);return function(t,u){var a=t.homepage.content,r=(0,o.default)({},u,{content:a},n);return e=h.default.shallowEqual(e,r)?e:r}})(m)}).call(this)}finally{}},820:function(t,e,n){try{(function(){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.setState=void 0;var t=n(138);e.setState=function(e){return{type:t.HOMEPAGE_MAIN_SET,payload:e}}}).call(this)}finally{}}});
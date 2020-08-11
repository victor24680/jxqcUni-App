(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-ui/lib/uni-badge/uni-badge"],{7068:function(t,n,e){"use strict";var u=e("85b8"),i=e.n(u);i.a},"85b8":function(t,n,e){},"950d":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={name:"UniBadge",props:{type:{type:String,default:"default"},inverted:{type:Boolean,default:!1},text:{type:[String,Number],default:""},size:{type:String,default:"normal"}},data:function(){return{badgeStyle:""}},watch:{text:function(){this.setStyle()}},mounted:function(){this.setStyle()},methods:{setStyle:function(){this.badgeStyle="width: ".concat(8*String(this.text).length+12,"px")},onClick:function(){this.$emit("click")}}};n.default=u},a4cd:function(t,n,e){"use strict";var u,i=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return u}))},c1fa:function(t,n,e){"use strict";e.r(n);var u=e("a4cd"),i=e("c608");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("7068");var c,r=e("f0c5"),o=Object(r["a"])(i["default"],u["b"],u["c"],!1,null,"b5ac7226",null,!1,u["a"],c);n["default"]=o.exports},c608:function(t,n,e){"use strict";e.r(n);var u=e("950d"),i=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);n["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-ui/lib/uni-badge/uni-badge-create-component',
    {
        'components/uni-ui/lib/uni-badge/uni-badge-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c1fa"))
        })
    },
    [['components/uni-ui/lib/uni-badge/uni-badge-create-component']]
]);

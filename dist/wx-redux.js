!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=5)}({5:function(t,e,n){"use strict";n.r(e);function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){o(t,e,n[e])})}return t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var a,u=Page,i=App;function c(t,e){var n=this;(0,a.subscribe)(function(){var t=(0,a.getState)(),r={};e.states.forEach(function(e){r[e]=t[e]}),n.setData(r)})}App=function(t){if(!t.store)throw new Error("请在App中初始化一个store!!!");return a=t.store,i(t)},Page=function(t){var e=function(t){var e=t;e.data=t.data||{};var n=[],u=a.getState();if(t.states&&(n=t.states.reduce(function(t,e){if(!u.hasOwnProperty(e))throw new Error("states 中没有定义".concat(e));return r({},t,o({},e,u[e]))},{})),e.data=r({},t.data,n),t.actions){var i=a.dispatch;t.actions.map(function(t){e[t.name]=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];i(t.apply(null,n))}})}return e}(t);!function(t,e,n){if(t[e]){var r=t[e];t[e]=function(e){n.call(this,e,t),r.call(this,e)}}else t[e]=function(e){n.call(this,e,t)}}(e,"onLoad",c),u(e)}}});
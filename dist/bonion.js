parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"LoY1":[function(require,module,exports) {
function e(r){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(r)}function r(e,r){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=t(e))||r&&e&&"number"==typeof e.length){n&&(e=n);var i=0,o=function(){};return{s:o,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return u=e.done,e},e:function(e){c=!0,a=e},f:function(){try{u||null==n.return||n.return()}finally{if(c)throw a}}}}function t(e,r){if(e){if("string"==typeof e)return n(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?n(e,r):void 0}}function n(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function i(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function o(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function a(e,r,t){return r&&o(e.prototype,r),t&&o(e,t),e}function u(e,r,t){return(u=c()?Reflect.construct:function(e,r,t){var n=[null];n.push.apply(n,r);var i=new(Function.bind.apply(e,n));return t&&s(i,t.prototype),i}).apply(null,arguments)}function c(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function s(e,r){return(s=Object.setPrototypeOf||function(e,r){return e.__proto__=r,e})(e,r)}function f(e,r,t,n,i,o,a){try{var u=e[o](a),c=u.value}catch(s){return void t(s)}u.done?r(c):Promise.resolve(c).then(n,i)}function l(e){return function(){var r=this,t=arguments;return new Promise(function(n,i){var o=e.apply(r,t);function a(e){f(o,n,i,a,u,"next",e)}function u(e){f(o,n,i,a,u,"throw",e)}a(void 0)})}}module.exports=l(regeneratorRuntime.mark(function e(){var r,t,n,i,o=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:for(r=o.length,t=new Array(r),n=0;n<r;n++)t[n]=o[n];return i=u(v,t),e.next=4,i.scan();case 4:return e.abrupt("return",i);case 5:case"end":return e.stop()}},e)}));var v=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};i(this,t),this.drive=e,this.index=null,Object.assign(this.opts={depth:1},r),this.forks={}}return a(t,[{key:"scan",value:function(){var e=l(regeneratorRuntime.mark(function e(){var t,n,i,o,a,u,c,s,f,l,v,d=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=d.length>0&&void 0!==d[0]?d[0]:null,n=d.length>1&&void 0!==d[1]?d[1]:null,i=d.length>2&&void 0!==d[2]?d[2]:0,t||(t=this.drive),!(i>20)){e.next=6;break}throw new InternalError("the fork tree is too large, more than 20 primary hyperdrives");case 6:if(!(o=this.forks[t.url])){e.next=11;break}return 0===i&&o.drive===this.drive&&t!==this.drive&&removeFork(o.label),null==o.label&&(o.label=n),e.abrupt("return");case 11:if(this.forks[t.url]=o={drive:t,label:n},!(i<this.opts.depth)){e.next=18;break}return e.next=15,t.readdir(".forks",{includeStats:!0});case 15:a=e.sent,u=r(a);try{for(u.s();!(c=u.n()).done;)l=c.value,(v=null===(s=l.stat)||void 0===s?void 0:null===(f=s.mount)||void 0===f?void 0:f.key)&&this.scan(beaker.hyperdrive.drive(v),l.name,i+1)}catch(p){u.e(p)}finally{u.f()}case 18:return e.prev=18,e.t0=JSON,e.next=22,t.readFile("index.json");case 22:e.t1=e.sent,o.index=index=e.t0.parse.call(e.t0,e.t1),t===this.drive&&(this.index=index),index.forkOf&&this.scan(beaker.hyperdrive.drive(index.forkOf),null,i),e.next=30;break;case 28:e.prev=28,e.t2=e.catch(18);case 30:case"end":return e.stop()}},e,this,[[18,28]])}));return function(){return e.apply(this,arguments)}}()},{key:"getInfo",value:function(){var e=l(regeneratorRuntime.mark(function e(){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if((r=this.forks[this.drive.url]).info){e.next=5;break}return e.next=4,this.drive.getInfo();case 4:r.info=e.sent;case 5:return e.abrupt("return",r.info);case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"isMain",value:function(){return"object"===e(this.index)&&void 0===this.index.forkOf}},{key:"canWrite",value:function(){var e=l(regeneratorRuntime.mark(function e(){var r,t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=regeneratorRuntime.keys(this.forks);case 1:if((e.t1=e.t0()).done){e.next=12;break}if(r=e.t1.value,(t=this.forks[r]).info){e.next=8;break}return e.next=7,t.drive.getInfo();case 7:t.info=e.sent;case 8:if(!t.info.writable){e.next=10;break}return e.abrupt("return",!0);case 10:e.next=1;break;case 12:return e.abrupt("return",!1);case 13:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"addFork",value:function(){var e=l(regeneratorRuntime.mark(function e(r,t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.drive.mkdir("/.forks");case 2:return e.next=4,this.drive.mount("/.forks/".concat(r),t);case 4:case"end":return e.stop()}},e,this)}));return function(r,t){return e.apply(this,arguments)}}()},{key:"removeFork",value:function(){var e=l(regeneratorRuntime.mark(function e(r){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.drive.unmountFork("/.forks/".concat(r));case 2:case"end":return e.stop()}},e,this)}));return function(r){return e.apply(this,arguments)}}()},{key:"getLeastCommonFork",value:function(){var e=l(regeneratorRuntime.mark(function e(){var r,t,n,i,o,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=0,t=null,e.t0=regeneratorRuntime.keys(this.forks);case 2:if((e.t1=e.t0()).done){e.next=13;break}if(n=e.t1.value,(o=this.forks[n]).info){e.next=9;break}return e.next=8,o.drive.getInfo();case 8:o.info=e.sent;case 9:a=(null===(i=o.info)||void 0===i?void 0:i.peers)||0,(0==r||0!=a&&a<r)&&(r=a,t=o),e.next=2;break;case 13:return e.abrupt("return",t);case 14:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"readdir",value:function(){var e=l(regeneratorRuntime.mark(function e(t){var n,i,o,a,u,c,s,f,l;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(Object.values(this.forks).map(function(e){return e.drive.readdir(t,{includeStats:!0}).then(function(r,t){return r&&{listing:r,drive:e.drive,label:e.label}}).catch(function(e){return null})}));case 2:n=e.sent,i={},o=r(n),e.prev=5,o.s();case 7:if((a=o.n()).done){e.next=15;break}if(u=a.value){e.next=11;break}return e.abrupt("continue",13);case 11:c=r(u.listing);try{for(c.s();!(s=c.n()).done;)f=s.value,(!(l=i[f.name])||l.stat.mtime<f.stat.mtime)&&(f.drive=u.drive,f.label=u.label,i[f.name]=f)}catch(v){c.e(v)}finally{c.f()}case 13:e.next=7;break;case 15:e.next=20;break;case 17:e.prev=17,e.t0=e.catch(5),o.e(e.t0);case 20:return e.prev=20,o.f(),e.finish(20);case 23:return e.abrupt("return",Object.values(i).sort(function(e,r){return e.name.localeCompare(r.name)}));case 24:case"end":return e.stop()}},e,this,[[5,17,20,23]])}));return function(r){return e.apply(this,arguments)}}()},{key:"stat",value:function(){var e=l(regeneratorRuntime.mark(function e(r){var t,n,i,o,a=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=(n=a.length>1&&void 0!==a[1]?a[1]:null)||{},e.next=4,Promise.all(Object.values(this.forks).map(function(e){return e.drive.stat(r,n).then(function(r,t){return r&&{stat:r,drive:e.drive,label:e.label}}).catch(function(e){return null})}));case 4:if(i=e.sent,null!==(o=i.reduce(function(e,r){var t,n;return((null==r?void 0:null===(t=r.stat)||void 0===t?void 0:t.mtime)||0)>((null==e?void 0:null===(n=e.stat)||void 0===n?void 0:n.mtime)||0)?r:e}))&&"D"!==(null===(t=o.metadata)||void 0===t?void 0:t.bonion)){e.next=8;break}throw new Error("File not found");case 8:return e.abrupt("return",o);case 9:case"end":return e.stop()}},e,this)}));return function(r){return e.apply(this,arguments)}}()},{key:"mergeUrl",value:function(e){if(this.drive.url!==e.url)return"beaker://diff/?base=".concat(encodeURIComponent(e.url),"&target=").concat(encodeURIComponent(this.drive.url))}}]),t}();
},{}]},{},["LoY1"], null)
//# sourceMappingURL=/bonion.js.map
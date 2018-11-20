/*
 * jQuery Slot Machine v4.0.0
 * https://github.com/josex2r/jQuery-SlotMachineundefined
 *
 * Copyright 2014 Jose Luis Represa
 * Released under the MIT license
 */
!function r(o,a,h){function u(e,t){if(!a[e]){if(!o[e]){var i="function"==typeof require&&require;if(!t&&i)return i(e,!0);if(c)return c(e,!0);var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}var s=a[e]={exports:{}};o[e][0].call(s.exports,function(t){var i=o[e][1][t];return u(i||t)},s,s.exports,r,o,a,h)}return a[e].exports}for(var c="function"==typeof require&&require,t=0;t<h.length;t++)u(h[t]);return u}({1:[function(t,i,e){"use strict";window.SlotMachine=t("./slot-machine")},{"./slot-machine":3}],2:[function(t,i,e){"use strict";var n=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;i.exports=function(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;setTimeout(function(){return n(t)},i)}},{}],3:[function(t,i,e){"use strict";var n=function(){function n(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,i,e){return i&&n(t.prototype,i),e&&n(t,e),t}}();var s=t("./timer"),r=t("./raf"),o={active:0,delay:200,auto:!1,spins:5,randomize:null,onComplete:null,inViewport:!0,direction:"up",transition:"ease-in-out"},a="slotMachineNoTransition",h="slotMachineBlurFast",u="slotMachineBlurMedium",c="slotMachineBlurSlow",l="slotMachineBlurTurtle",f="slotMachineGradient",v=f,d=function(){function e(t,i){!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,e),this.element=t,this.tiles=[].slice.call(this.element.children),this.running=!1,this.stopping=!1,this.element.style.overflow="hidden",this._wrapTiles(),this._minTop=-this._fakeFirstTile.offsetHeight,this._maxTop=-this.tiles.reduce(function(t,i){return t+i.offsetHeight},0),this.changeSettings(Object.assign({},o,i)),this._setBounds(),this._resetPosition(),!1!==this.auto&&this.run()}return n(e,[{key:"changeSettings",value:function(i){var e=this;Object.keys(i).forEach(function(t){e[t]=i[t]})}},{key:"_wrapTiles",value:function(){var i=this;this.container=document.createElement("div"),this.container.classList.add("slotMachineContainer"),this.container.style.transition="1s ease-in-out",this.element.appendChild(this.container),this._fakeFirstTile=this.tiles[this.tiles.length-1].cloneNode(!0),this.container.appendChild(this._fakeFirstTile),this.tiles.forEach(function(t){i.container.appendChild(t)}),this._fakeLastTile=this.tiles[0].cloneNode(!0),this.container.appendChild(this._fakeLastTile)}},{key:"_setBounds",value:function(){var t=this.getTileOffset(this.active),i=this.getTileOffset(this.tiles.length),e=this.getTileOffset(this.tiles.length);this._bounds={up:{key:"up",initial:t,first:0,last:e,to:this._maxTop,firstToLast:e,lastToFirst:0},down:{key:"down",initial:t,first:i,last:0,to:this._minTop,firstToLast:e,lastToFirst:0}}}},{key:"_changeTransition",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.delay,i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:this.transition;this.container.style.transition=t/1e3+"s "+i}},{key:"_changeTransform",value:function(t){this.container.style.transform="matrix(1, 0, 0, 1, 0, "+t+")"}},{key:"_isGoingBackward",value:function(){return this.nextActive>this.active&&0===this.active&&this.nextActive===this.tiles.length-1}},{key:"_isGoingForward",value:function(){return this.nextActive<=this.active&&this.active===this.tiles.length-1&&0===this.nextActive}},{key:"getTileOffset",value:function(t){for(var i=0,e=0;e<t;e++)i+=this.tiles[e].offsetHeight;return this._minTop-i}},{key:"_resetPosition",value:function(t){this.container.classList.toggle(a),this._changeTransform(isNaN(t)?this.bounds.initial:t),this.container.offsetHeight,this.container.classList.toggle(a)}},{key:"prev",value:function(){return this.nextActive=this.prevIndex,this.running=!0,this.stop(),this.nextActive}},{key:"next",value:function(){return this.nextActive=this.nextIndex,this.running=!0,this.stop(),this.nextActive}},{key:"_getDelayFromSpins",value:function(t){var i=this.delay;switch(this.transition="linear",t){case 1:i/=.5,this.transition="ease-out",this._animationFX=l;break;case 2:i/=.75,this._animationFX=c;break;case 3:i/=1,this._animationFX=u;break;case 4:i/=1.25,this._animationFX=u;break;default:i/=1.5,this._animationFX=h}return i}},{key:"shuffle",value:function(i,e){var n=this;if("function"==typeof i&&(e=i),this.running=!0,this.visible||!0!==this.inViewport){var t=this._getDelayFromSpins(i);this._changeTransition(t),this._changeTransform(this.bounds.to),r(function(){if(!n.stopping&&n.running){var t=i-1;n._resetPosition(n.bounds.first),1<t?n.shuffle(t,e):n.stop(e)}},t)}else this.stop(e);return this.nextActive}},{key:"stop",value:function(t){var i=this;if(!this.running||this.stopping)return this.nextActive;this.running=!0,this.stopping=!0,Number.isInteger(this.nextActive)||(this.nextActive=this.custom),this._isGoingBackward()?this._resetPosition(this.bounds.firstToLast):this._isGoingForward()&&this._resetPosition(this.bounds.lastToFirst),this.active=this.nextActive;var e=this._getDelayFromSpins(1);return this._changeTransition(e),this._animationFX=v,this._changeTransform(this.getTileOffset(this.active)),r(function(){i.stopping=!1,i.running=!1,i.nextActive=null,"function"==typeof i.onComplete&&i.onComplete(i.active),"function"==typeof t&&t.apply(i,[i.active])},e),this.active}},{key:"run",value:function(){var t=this;this.running||(this._timer=new s(function(){t.visible||!0!==t.inViewport?t.shuffle(t.spins,function(){t._timer.reset()}):r(function(){t._timer.reset()},500)},this.auto))}},{key:"destroy",value:function(){var i=this;this._fakeFirstTile.remove(),this._fakeLastTile.remove(),this.$tiles.unwrap(),this.tiles.forEach(function(t){i.element.appendChild(t)}),this.container.remove()}},{key:"active",get:function(){return this._active},set:function(t){((t=Number(t))<0||t>=this.tiles.length||isNaN(t))&&(t=0),this._active=t}},{key:"direction",get:function(){return this._direction},set:function(t){this.running||(this._direction="down"===t?"down":"up")}},{key:"bounds",get:function(){return this._bounds[this._direction]}},{key:"transition",get:function(){return this._transition},set:function(t){this._transition=t||"ease-in-out"}},{key:"visibleTile",get:function(){var t=this.tiles[0].offsetHeight,i=this.container.style.transform||"",e=parseInt(i.replace(/^matrix\(-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?(-?\d+)\)$/,"$1"),10);return Math.abs(Math.round(e/t))-1}},{key:"random",get:function(){return Math.floor(Math.random()*this.tiles.length)}},{key:"custom",get:function(){var t=void 0;if(this.randomize){var i=this.randomize(this.active);(i<0||i>=this.tiles.length)&&(i=0),t=i}else t=this.random;return t}},{key:"_prevIndex",get:function(){var t=this.active-1;return t<0?this.tiles.length-1:t}},{key:"_nextIndex",get:function(){var t=this.active+1;return t<this.tiles.length?t:0}},{key:"prevIndex",get:function(){return"up"===this.direction?this._nextIndex:this._prevIndex}},{key:"nextIndex",get:function(){return"up"===this.direction?this._prevIndex:this._nextIndex}},{key:"visible",get:function(){var t=this.element.getBoundingClientRect(),i=window.innerHeight||document.documentElement.clientHeight,e=window.innerWidth||document.documentElement.clientWidth,n=t.top<=i&&0<=t.top+t.height,s=t.left<=e&&0<=t.left+t.width;return n&&s}},{key:"_animationFX",set:function(i){var t=this,e=this.delay/4;r(function(){[].concat(function(t){if(Array.isArray(t)){for(var i=0,e=Array(t.length);i<t.length;i++)e[i]=t[i];return e}return Array.from(t)}(t.tiles),[t._fakeLastTile,t._fakeFirstTile]).forEach(function(t){t.classList.remove(h,u,c,l),i!==v&&t.classList.add(i)}),i===v?t.container.classList.remove(f):t.container.classList.add(f)},e)}}]),e}();i.exports=d},{"./raf":2,"./timer":4}],4:[function(t,i,e){"use strict";var n=function(){function n(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,i,e){return i&&n(t.prototype,i),e&&n(t,e),t}}();i.exports=function(){function e(t,i){return function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,e),this.cb=t,this.initialDelay=i,this.delay=i,this.startTime=null,this.timer=null,this.running=!1,this.resume(),this}return n(e,[{key:"_start",value:function(){var t=this;this.timer=setTimeout(function(){t.running=!1,t.cb(t)},this.delay)}},{key:"cancel",value:function(){this.running=!1,clearTimeout(this.timer)}},{key:"pause",value:function(){this.running&&(this.delay-=(new Date).getTime()-this.startTime,this.cancel())}},{key:"resume",value:function(){this.running||(this.running=!0,this.startTime=(new Date).getTime(),this._start())}},{key:"reset",value:function(){this.cancel(),this.delay=this.initialDelay,this._start()}},{key:"add",value:function(t){this.pause(),this.delay+=t,this.resume()}}]),e}()},{}]},{},[1]);
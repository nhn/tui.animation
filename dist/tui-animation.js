/*!
 * tui-animation.js
 * @version 0.2.0
 * @author NHNEnt FE Development Lab <dl_javascript@nhnent.com>
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tui-code-snippet"));
	else if(typeof define === 'function' && define.amd)
		define(["tui-code-snippet"], factory);
	else if(typeof exports === 'object')
		exports["animation"] = factory(require("tui-code-snippet"));
	else
		root["tui"] = root["tui"] || {}, root["tui"]["animation"] = factory((root["tui"] && root["tui"]["util"]));
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _anim = __webpack_require__(1);
	
	var animation = _interopRequireWildcard(_anim);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	exports['default'] = animation; /**
	                                 * @namespace tui.animation
	                                 * @description Animation library
	                                 * @example <caption>Get Module</caption>
	                                 * var animation = require('tui-animation'); // commonjs type
	                                 * var animation = tui.animation; // when using bundle file
	                                 * var runner = animation.anim({...});
	                                 * });
	                                 */

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.requestAnimFrame = requestAnimFrame;
	exports.cancelAnimFrame = cancelAnimFrame;
	exports.anim = anim;
	
	var _easing = __webpack_require__(2);
	
	var easingFunctions = _interopRequireWildcard(_easing);
	
	var _tuiCodeSnippet = __webpack_require__(3);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
	                                                                                                                                                                                                     * @fileoverview Module for animations
	                                                                                                                                                                                                     * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
	                                                                                                                                                                                                     */
	
	/**
	 * @module ./anim
	 * @ignore
	 * @description Core module for animation
	 */
	
	var isSupportPromise = typeof Promise !== 'undefined' && /\[native code\]/.test(Promise.toString());
	
	/** Do nothing */
	function noop() {}
	
	/**
	 * Get name with vendor prefix
	 * @param {String} name - name to prepend prefix
	 * @returns {String} vendor prefixed name
	 */
	function getPrefixed(name) {
	    return window['webkit' + name] || window['moz' + name] || window['ms' + name];
	}
	
	var requestFn = window.requestAnimationFrame || getPrefixed('RequestAnimationFrame') || function (callback) {
	    return window.setTimeout(callback, 1000 / 60);
	};
	
	var cancelFn = window.cancelAnimationFrame || getPrefixed('CancelAnimationFrame') || getPrefixed('CancelRequestAnimationFrame') || function (timerId) {
	    window.clearTimeout(timerId);
	};
	
	/**
	 * Shim of requestAnimationFrame
	 *
	 * Use `setTimeout` trick on below Internet Explorer 8
	 * @method requestAnimFrame
	 * @memberof tui.animation
	 * @param {Function} callback - callback function
	 * @returns {Number} timer id
	 * @example
	 * var animation = require('tui-animation');
	 * var timerId = animation.requestAnimFrame(function() {
	 *   $('box').css(left, '100px');
	 * });
	 */
	function requestAnimFrame(callback) {
	    return requestFn(callback);
	}
	
	/**
	 * Shim of cancelAnimationFrame
	 * @method cancelAnimFrame
	 * @memberof tui.animation
	 * @param {Number} timerId - requestAnimationFrame timerId
	 * @example
	 * var animation = require('tui-animation');
	 * var timerId = animation.requestAnimFrame(function() {
	 *   $('box').css(left, '100px');
	 * });
	 * animation.cancelAnimFrame(timerId);
	 */
	function cancelAnimFrame(timerId) {
	    if (!timerId) {
	        return;
	    }
	
	    cancelFn(timerId);
	}
	
	/**
	 * Get animation runner
	 * @memberof tui.animation
	 * @method anim
	 * @param {Object} options - options
	 * @param {(Number|Number[])} [options.from=0] - beginning values
	 * @param {(Number|Number[])} [options.to=100] - change in values
	 * @param {Number} [options.duration=1000] - duration (ms)
	 * @param {String} [options.easing='linear'] - easing functions {@see easing}
	 * @param {Function} [options.frame] - invoking each frames. you can manipulate specific element by this function
	 *   the arguments passed with same sequence with `from`, `to` option values
	 * @param {Function} [options.complete] - invoked once at end of animation
	 * @returns {Object} animation runner
	 * @tutorial example01-basic-usage
	 * @tutorial example02-2D-movement
	 * @tutorial example03-using-promise
	 * @example <caption>Initialize and Run animation runner</caption>
	 * var animation = require('tui-animation');
	 * var runner = tui.animation.anim({
	 *   from: [1, 5],  // initial x, y position
	 *   to: [100, 500],
	 *   duration: 2000,
	 *   easing: 'easeInOut',
	 *   // manipulate x, y position
	 *   frame: function(x, y) {
	 *     $box.css({
	 *       left: x + 'px',
	 *       top: y + 'px'
	 *     });
	 *   },
	 *   complete: function() {
	 *     $box.css({
	 *       backgroundColor: 'red'
	 *     });
	 *   }
	 * });
	 * 
	 * // Run animation
	 * runner.run();
	 * 
	 * // If browser support Promise then method `run()` is return it, otherwise it return `null`
	 * // So below line has be possible throw an errors. use carefully
	 * runner.run().then(function() {console.log('done!');});
	 */
	function anim() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        _ref$from = _ref.from,
	        from = _ref$from === undefined ? 0 : _ref$from,
	        _ref$to = _ref.to,
	        to = _ref$to === undefined ? 100 : _ref$to,
	        _ref$duration = _ref.duration,
	        duration = _ref$duration === undefined ? 1000 : _ref$duration,
	        _ref$easing = _ref.easing,
	        easing = _ref$easing === undefined ? 'linear' : _ref$easing,
	        _ref$frame = _ref.frame,
	        frame = _ref$frame === undefined ? noop : _ref$frame,
	        _ref$complete = _ref.complete,
	        complete = _ref$complete === undefined ? noop : _ref$complete;
	
	    from = (0, _tuiCodeSnippet.isArray)(from) ? from : [from];
	    to = (0, _tuiCodeSnippet.isArray)(to) ? to : [to];
	
	    var timeoutId = 0;
	    var diffs = (0, _tuiCodeSnippet.map)(from, function (val, idx) {
	        return to[idx] - val;
	    });
	
	    easing = easingFunctions[easing] || easingFunctions.linear;
	
	    /**
	     * Get animation runner object
	     * @param {function} resolve - resolve from promise
	     * @param {Date} start - time of animation start
	     * @returns {function}
	     */
	    function runner(resolve, start) {
	        return function tick() {
	            var elapsed = new Date() - start;
	            var progress = Math.min(1, elapsed / duration || 0);
	            var values = (0, _tuiCodeSnippet.map)(from, function (val, idx) {
	                return diffs[idx] * easing(progress) + val;
	            });
	
	            frame.apply(undefined, _toConsumableArray(values));
	            timeoutId = requestAnimFrame(tick);
	
	            if (progress >= 1) {
	                cancelAnimFrame(timeoutId);
	                resolve();
	                complete();
	            }
	        };
	    }
	
	    return {
	        run: function run() {
	            var start = new Date();
	
	            if (!isSupportPromise) {
	                runner(noop, start)();
	
	                return null;
	            }
	
	            return new Promise(function (resolve) {
	                return runner(resolve, start)();
	            });
	        },
	        cancel: function cancel() {
	            cancelAnimFrame(timeoutId);
	        }
	    };
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	/**
	 * @fileoverview Easing fomulars
	 * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
	 */
	
	var abs = Math.abs,
	    pow = Math.pow;
	
	/**
	 * @module ./easing
	 * @ignore
	 * @description
	 * Easing fomulars are based on Gaëtan Renaudeau and Johan Lindell's gist
	 * https://gist.github.com/gre/1650294
	 */
	
	/**
	 * High order function for ease-in
	 * @param {Number} p - for using `pow(p)` to calculate accelerate factor
	 * @returns {Function}
	 */
	
	function _easeIn(p) {
	  return function (t) {
	    return pow(t, p);
	  };
	}
	
	/**
	 * High order function for ease-out
	 * @param {Number} p - for using `pow(p)` to calculate accelerate factor
	 * @returns {Function}
	 */
	function _easeOut(p) {
	  return function (t) {
	    return 1 - abs(pow(t - 1, p));
	  };
	}
	
	/**
	 * High order function for ease-in-out
	 * @param {Number} p - for using `pow(p)` to calculate accelerate factor
	 * @returns {Function}
	 */
	function _easeInOut(p) {
	  return function (t) {
	    return t < 0.5 ? _easeIn(p)(t * 2) / 2 : _easeOut(p)(t * 2 - 1) / 2 + 0.5;
	  };
	}
	
	/**
	 * no easing, no acceleration
	 * @method
	 * @param {Number} t - progress value between 0 ~ 1
	 * @returns {Number} calculated delta value
	 */
	var linear = exports.linear = _easeInOut(1);
	/**
	 * accelerating from zero velocity
	 * @method
	 * @param {Number} t - progress value between 0 ~ 1
	 * @returns {Number} calculated delta value
	 */
	var easeInQuad = exports.easeInQuad = _easeIn(2);
	/**
	 * decelerating to zero velocity
	 * @method
	 * @param {Number} t - progress value between 0 ~ 1
	 * @returns {Number} calculated delta value
	 */
	var easeOutQuad = exports.easeOutQuad = _easeOut(2);
	/**
	 * acceleration until halfway, then deceleration
	 * @method
	 * @param {Number} t - progress value between 0 ~ 1
	 * @returns {Number} calculated delta value
	 */
	var easeInOutQuad = exports.easeInOutQuad = _easeInOut(2);
	
	/**
	 * accelerating from zero velocity
	 * @method
	 * @param {Number} t - progress value between 0 ~ 1
	 * @returns {Number} calculated delta value
	 */
	var easeIn = exports.easeIn = easeInQuad;
	/**
	 * decelerating to zero velocity
	 * @method
	 * @param {Number} t - progress value between 0 ~ 1
	 * @returns {Number} calculated delta value
	 */
	var easeOut = exports.easeOut = easeOutQuad;
	/**
	 * acceleration until halfway, then deceleration
	 * @method
	 * @param {Number} t - progress value between 0 ~ 1
	 * @returns {Number} calculated delta value
	 */
	var easeInOut = exports.easeInOut = easeInOutQuad;
	
	/**
	 * accelerating from zero velocity
	 * @method
	 * @param {Number} t - progress value between 0 ~ 1
	 * @returns {Number} calculated delta value
	 */
	var easeInCubic = exports.easeInCubic = _easeIn(3);
	/**
	 * decelerating to zero velocity
	 * @method
	 * @param {Number} t - progress value between 0 ~ 1
	 * @returns {Number} calculated delta value
	 */
	var easeOutCubic = exports.easeOutCubic = _easeOut(3);
	/**
	 * acceleration until halfway, then deceleration
	 * @method
	 * @param {Number} t - progress value between 0 ~ 1
	 * @returns {Number} calculated delta value
	 */
	var easeInOutCubic = exports.easeInOutCubic = _easeInOut(3);
	
	/**
	 * accelerating from zero velocity
	 * @method
	 * @param {Number} t - progress value between 0 ~ 1
	 * @returns {Number} calculated delta value
	 */
	var easeInQuart = exports.easeInQuart = _easeIn(4);
	/**
	 * decelerating to zero velocity
	 * @method
	 * @param {Number} t - progress value between 0 ~ 1
	 * @returns {Number} calculated delta value
	 */
	var easeOutQuart = exports.easeOutQuart = _easeOut(4);
	/**
	 * acceleration until halfway, then deceleration
	 * @method
	 * @param {Number} t - progress value between 0 ~ 1
	 * @returns {Number} calculated delta value
	 */
	var easeInOutQuart = exports.easeInOutQuart = _easeInOut(4);
	
	/**
	 * accelerating from zero velocity
	 * @method
	 * @param {Number} t - progress value between 0 ~ 1
	 * @returns {Number} calculated delta value
	 */
	var easeInQuint = exports.easeInQuint = _easeIn(5);
	/**
	 * decelerating to zero velocity
	 * @method
	 * @param {Number} t - progress value between 0 ~ 1
	 * @returns {Number} calculated delta value
	 */
	var easeOutQuint = exports.easeOutQuint = _easeOut(5);
	/**
	 * acceleration until halfway, then deceleration
	 * @method
	 * @param {Number} t - progress value between 0 ~ 1
	 * @returns {Number} calculated delta value
	 */
	var easeInOutQuint = exports.easeInOutQuint = _easeInOut(5);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhODNiYjY4OGM4ZDdlNDgxYjgxNyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FuaW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Vhc2luZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInR1aS1jb2RlLXNuaXBwZXRcIixcImNvbW1vbmpzMlwiOlwidHVpLWNvZGUtc25pcHBldFwiLFwiYW1kXCI6XCJ0dWktY29kZS1zbmlwcGV0XCIsXCJyb290XCI6W1widHVpXCIsXCJ1dGlsXCJdfSJdLCJuYW1lcyI6WyJhbmltYXRpb24iLCJyZXF1ZXN0QW5pbUZyYW1lIiwiY2FuY2VsQW5pbUZyYW1lIiwiYW5pbSIsImVhc2luZ0Z1bmN0aW9ucyIsImlzU3VwcG9ydFByb21pc2UiLCJQcm9taXNlIiwidGVzdCIsInRvU3RyaW5nIiwibm9vcCIsImdldFByZWZpeGVkIiwibmFtZSIsIndpbmRvdyIsInJlcXVlc3RGbiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbGxiYWNrIiwic2V0VGltZW91dCIsImNhbmNlbEZuIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJ0aW1lcklkIiwiY2xlYXJUaW1lb3V0IiwiZnJvbSIsInRvIiwiZHVyYXRpb24iLCJlYXNpbmciLCJmcmFtZSIsImNvbXBsZXRlIiwidGltZW91dElkIiwiZGlmZnMiLCJ2YWwiLCJpZHgiLCJsaW5lYXIiLCJydW5uZXIiLCJyZXNvbHZlIiwic3RhcnQiLCJ0aWNrIiwiZWxhcHNlZCIsIkRhdGUiLCJwcm9ncmVzcyIsIk1hdGgiLCJtaW4iLCJ2YWx1ZXMiLCJydW4iLCJjYW5jZWwiLCJhYnMiLCJwb3ciLCJfZWFzZUluIiwicCIsInQiLCJfZWFzZU91dCIsIl9lYXNlSW5PdXQiLCJlYXNlSW5RdWFkIiwiZWFzZU91dFF1YWQiLCJlYXNlSW5PdXRRdWFkIiwiZWFzZUluIiwiZWFzZU91dCIsImVhc2VJbk91dCIsImVhc2VJbkN1YmljIiwiZWFzZU91dEN1YmljIiwiZWFzZUluT3V0Q3ViaWMiLCJlYXNlSW5RdWFydCIsImVhc2VPdXRRdWFydCIsImVhc2VJbk91dFF1YXJ0IiwiZWFzZUluUXVpbnQiLCJlYXNlT3V0UXVpbnQiLCJlYXNlSW5PdXRRdWludCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0JBOztLQUFZQSxTOzs7O3NCQUVHQSxTLEVBWGY7Ozs7Ozs7Ozs7Ozs7Ozs7O1NDd0RnQkMsZ0IsR0FBQUEsZ0I7U0FnQkFDLGUsR0FBQUEsZTtTQW9EQUMsSSxHQUFBQSxJOztBQWpIaEI7O0tBQVlDLGU7O0FBQ1o7Ozs7cU1BWkE7Ozs7O0FBS0E7Ozs7OztBQVNBLEtBQU1DLG1CQUFvQixPQUFPQyxPQUFQLEtBQW1CLFdBQXBCLElBQ3BCLGtCQUFrQkMsSUFBbEIsQ0FBdUJELFFBQVFFLFFBQVIsRUFBdkIsQ0FETDs7QUFHQTtBQUNBLFVBQVNDLElBQVQsR0FBZ0IsQ0FBRTs7QUFFbEI7Ozs7O0FBS0EsVUFBU0MsV0FBVCxDQUFxQkMsSUFBckIsRUFBMkI7QUFDdkIsWUFBT0Msa0JBQWdCRCxJQUFoQixLQUEyQkMsZUFBYUQsSUFBYixDQUEzQixJQUFtREMsY0FBWUQsSUFBWixDQUExRDtBQUNIOztBQUVELEtBQU1FLFlBQVlELE9BQU9FLHFCQUFQLElBQ2RKLFlB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QUNQOzs7Ozs7QUFNTyxLQUFNSSxnQ0FBWUgsYUFBbEI7O0FBRVA7Ozs7OztBQU1PLEtBQU1JLG9DQUFjWCxRQUFRLENBQVIsQ0FBcEI7QUFDUDs7Ozs7O0FBTU8sS0FBTVksc0NBQWVULFNBQVMsQ0FBVCxDQUFyQjtBQUNQOzs7Ozs7QUFNTyxLQUFNVSwwQ0FBaUJULFdBQVcsQ0FBWCxDQUF2Qjs7QUFFUDs7Ozs7O0FBTU8sS0FBTVUsb0NBQWNkLFFBQVEsQ0FBUixDQUFwQjtBQUNQOzs7Ozs7QUFNTyxLQUFNZSxzQ0FBZVosU0FBUyxDQUFULENBQXJCO0FBQ1A7Ozs7OztBQU1PLEtBQU1hLDBDQUFpQlosV0FBVyxDQUFYLENBQXZCOztBQUVQOzs7Ozs7QUFNTyxLQUFNYSxvQ0FBY2pCLFFBQVEsQ0FBUixDQUFwQjtBQUNQOzs7Ozs7QUFNTyxLQUFNa0Isc0NBQWVmLFNBQVMsQ0FBVCxDQUFyQjtBQUNQOzs7Ozs7QUFNTyxLQUFNZ0IsMENBQWlCZixXQUFXLENBQVgsQ0FBdkIsQzs7Ozs7O0FDbktQLGdEIiwiZmlsZSI6InR1aS1hbmltYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJ0dWktY29kZS1zbmlwcGV0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInR1aS1jb2RlLXNuaXBwZXRcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYW5pbWF0aW9uXCJdID0gZmFjdG9yeShyZXF1aXJlKFwidHVpLWNvZGUtc25pcHBldFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1widHVpXCJdID0gcm9vdFtcInR1aVwiXSB8fCB7fSwgcm9vdFtcInR1aVwiXVtcImFuaW1hdGlvblwiXSA9IGZhY3Rvcnkocm9vdFtcInR1aVwiXVtcInV0aWxcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiZGlzdFwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGE4M2JiNjg4YzhkN2U0ODFiODE3IiwiLyoqXG4gKiBAbmFtZXNwYWNlIHR1aS5hbmltYXRpb25cbiAqIEBkZXNjcmlwdGlvbiBBbmltYXRpb24gbGlicmFyeVxuICogQGV4YW1wbGUgPGNhcHRpb24+R2V0IE1vZHVsZTwvY2FwdGlvbj5cbiAqIHZhciBhbmltYXRpb24gPSByZXF1aXJlKCd0dWktYW5pbWF0aW9uJyk7IC8vIGNvbW1vbmpzIHR5cGVcbiAqIHZhciBhbmltYXRpb24gPSB0dWkuYW5pbWF0aW9uOyAvLyB3aGVuIHVzaW5nIGJ1bmRsZSBmaWxlXG4gKiB2YXIgcnVubmVyID0gYW5pbWF0aW9uLmFuaW0oey4uLn0pO1xuICogfSk7XG4gKi9cbmltcG9ydCAqIGFzIGFuaW1hdGlvbiBmcm9tICcuL2FuaW0nO1xuXG5leHBvcnQgZGVmYXVsdCBhbmltYXRpb247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvaW5kZXguanMiLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgTW9kdWxlIGZvciBhbmltYXRpb25zXG4gKiBAYXV0aG9yIE5ITiBFbnQuIEZFIERldmVsb3BtZW50IHRlYW0gPGRsX2phdmFzY3JpcHRAbmhuZW50LmNvbT5cbiAqL1xuXG4vKipcbiAqIEBtb2R1bGUgLi9hbmltXG4gKiBAaWdub3JlXG4gKiBAZGVzY3JpcHRpb24gQ29yZSBtb2R1bGUgZm9yIGFuaW1hdGlvblxuICovXG5cbmltcG9ydCAqIGFzIGVhc2luZ0Z1bmN0aW9ucyBmcm9tICcuL2Vhc2luZyc7XG5pbXBvcnQge2lzQXJyYXksIG1hcH0gZnJvbSAndHVpLWNvZGUtc25pcHBldCc7XG5cbmNvbnN0IGlzU3VwcG9ydFByb21pc2UgPSAodHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnKSAmJlxuICAgICgvXFxbbmF0aXZlIGNvZGVcXF0vLnRlc3QoUHJvbWlzZS50b1N0cmluZygpKSk7XG5cbi8qKiBEbyBub3RoaW5nICovXG5mdW5jdGlvbiBub29wKCkge31cblxuLyoqXG4gKiBHZXQgbmFtZSB3aXRoIHZlbmRvciBwcmVmaXhcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gbmFtZSB0byBwcmVwZW5kIHByZWZpeFxuICogQHJldHVybnMge1N0cmluZ30gdmVuZG9yIHByZWZpeGVkIG5hbWVcbiAqL1xuZnVuY3Rpb24gZ2V0UHJlZml4ZWQobmFtZSkge1xuICAgIHJldHVybiB3aW5kb3dbYHdlYmtpdCR7bmFtZX1gXSB8fCB3aW5kb3dbYG1veiR7bmFtZX1gXSB8fCB3aW5kb3dbYG1zJHtuYW1lfWBdO1xufVxuXG5jb25zdCByZXF1ZXN0Rm4gPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgZ2V0UHJlZml4ZWQoJ1JlcXVlc3RBbmltYXRpb25GcmFtZScpIHx8XG4gICAgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgIH07XG5cbmNvbnN0IGNhbmNlbEZuID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgZ2V0UHJlZml4ZWQoJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJykgfHxcbiAgICBnZXRQcmVmaXhlZCgnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJykgfHxcbiAgICBmdW5jdGlvbih0aW1lcklkKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfTtcblxuLyoqXG4gKiBTaGltIG9mIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICpcbiAqIFVzZSBgc2V0VGltZW91dGAgdHJpY2sgb24gYmVsb3cgSW50ZXJuZXQgRXhwbG9yZXIgOFxuICogQG1ldGhvZCByZXF1ZXN0QW5pbUZyYW1lXG4gKiBAbWVtYmVyb2YgdHVpLmFuaW1hdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBjYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge051bWJlcn0gdGltZXIgaWRcbiAqIEBleGFtcGxlXG4gKiB2YXIgYW5pbWF0aW9uID0gcmVxdWlyZSgndHVpLWFuaW1hdGlvbicpO1xuICogdmFyIHRpbWVySWQgPSBhbmltYXRpb24ucmVxdWVzdEFuaW1GcmFtZShmdW5jdGlvbigpIHtcbiAqICAgJCgnYm94JykuY3NzKGxlZnQsICcxMDBweCcpO1xuICogfSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0QW5pbUZyYW1lKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RGbihjYWxsYmFjayk7XG59XG5cbi8qKlxuICogU2hpbSBvZiBjYW5jZWxBbmltYXRpb25GcmFtZVxuICogQG1ldGhvZCBjYW5jZWxBbmltRnJhbWVcbiAqIEBtZW1iZXJvZiB0dWkuYW5pbWF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gdGltZXJJZCAtIHJlcXVlc3RBbmltYXRpb25GcmFtZSB0aW1lcklkXG4gKiBAZXhhbXBsZVxuICogdmFyIGFuaW1hdGlvbiA9IHJlcXVpcmUoJ3R1aS1hbmltYXRpb24nKTtcbiAqIHZhciB0aW1lcklkID0gYW5pbWF0aW9uLnJlcXVlc3RBbmltRnJhbWUoZnVuY3Rpb24oKSB7XG4gKiAgICQoJ2JveCcpLmNzcyhsZWZ0LCAnMTAwcHgnKTtcbiAqIH0pO1xuICogYW5pbWF0aW9uLmNhbmNlbEFuaW1GcmFtZSh0aW1lcklkKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbEFuaW1GcmFtZSh0aW1lcklkKSB7XG4gICAgaWYgKCF0aW1lcklkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjYW5jZWxGbih0aW1lcklkKTtcbn1cblxuLyoqXG4gKiBHZXQgYW5pbWF0aW9uIHJ1bm5lclxuICogQG1lbWJlcm9mIHR1aS5hbmltYXRpb25cbiAqIEBtZXRob2QgYW5pbVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zXG4gKiBAcGFyYW0geyhOdW1iZXJ8TnVtYmVyW10pfSBbb3B0aW9ucy5mcm9tPTBdIC0gYmVnaW5uaW5nIHZhbHVlc1xuICogQHBhcmFtIHsoTnVtYmVyfE51bWJlcltdKX0gW29wdGlvbnMudG89MTAwXSAtIGNoYW5nZSBpbiB2YWx1ZXNcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0xMDAwXSAtIGR1cmF0aW9uIChtcylcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5lYXNpbmc9J2xpbmVhciddIC0gZWFzaW5nIGZ1bmN0aW9ucyB7QHNlZSBlYXNpbmd9XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5mcmFtZV0gLSBpbnZva2luZyBlYWNoIGZyYW1lcy4geW91IGNhbiBtYW5pcHVsYXRlIHNwZWNpZmljIGVsZW1lbnQgYnkgdGhpcyBmdW5jdGlvblxuICogICB0aGUgYXJndW1lbnRzIHBhc3NlZCB3aXRoIHNhbWUgc2VxdWVuY2Ugd2l0aCBgZnJvbWAsIGB0b2Agb3B0aW9uIHZhbHVlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY29tcGxldGVdIC0gaW52b2tlZCBvbmNlIGF0IGVuZCBvZiBhbmltYXRpb25cbiAqIEByZXR1cm5zIHtPYmplY3R9IGFuaW1hdGlvbiBydW5uZXJcbiAqIEB0dXRvcmlhbCBleGFtcGxlMDEtYmFzaWMtdXNhZ2VcbiAqIEB0dXRvcmlhbCBleGFtcGxlMDItMkQtbW92ZW1lbnRcbiAqIEB0dXRvcmlhbCBleGFtcGxlMDMtdXNpbmctcHJvbWlzZVxuICogQGV4YW1wbGUgPGNhcHRpb24+SW5pdGlhbGl6ZSBhbmQgUnVuIGFuaW1hdGlvbiBydW5uZXI8L2NhcHRpb24+XG4gKiB2YXIgYW5pbWF0aW9uID0gcmVxdWlyZSgndHVpLWFuaW1hdGlvbicpO1xuICogdmFyIHJ1bm5lciA9IHR1aS5hbmltYXRpb24uYW5pbSh7XG4gKiAgIGZyb206IFsxLCA1XSwgIC8vIGluaXRpYWwgeCwgeSBwb3NpdGlvblxuICogICB0bzogWzEwMCwgNTAwXSxcbiAqICAgZHVyYXRpb246IDIwMDAsXG4gKiAgIGVhc2luZzogJ2Vhc2VJbk91dCcsXG4gKiAgIC8vIG1hbmlwdWxhdGUgeCwgeSBwb3NpdGlvblxuICogICBmcmFtZTogZnVuY3Rpb24oeCwgeSkge1xuICogICAgICRib3guY3NzKHtcbiAqICAgICAgIGxlZnQ6IHggKyAncHgnLFxuICogICAgICAgdG9wOiB5ICsgJ3B4J1xuICogICAgIH0pO1xuICogICB9LFxuICogICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gKiAgICAgJGJveC5jc3Moe1xuICogICAgICAgYmFja2dyb3VuZENvbG9yOiAncmVkJ1xuICogICAgIH0pO1xuICogICB9XG4gKiB9KTtcbiAqIFxuICogLy8gUnVuIGFuaW1hdGlvblxuICogcnVubmVyLnJ1bigpO1xuICogXG4gKiAvLyBJZiBicm93c2VyIHN1cHBvcnQgUHJvbWlzZSB0aGVuIG1ldGhvZCBgcnVuKClgIGlzIHJldHVybiBpdCwgb3RoZXJ3aXNlIGl0IHJldHVybiBgbnVsbGBcbiAqIC8vIFNvIGJlbG93IGxpbmUgaGFzIGJlIHBvc3NpYmxlIHRocm93IGFuIGVycm9ycy4gdXNlIGNhcmVmdWxseVxuICogcnVubmVyLnJ1bigpLnRoZW4oZnVuY3Rpb24oKSB7Y29uc29sZS5sb2coJ2RvbmUhJyk7fSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbmltKHtcbiAgICBmcm9tID0gMCxcbiAgICB0byA9IDEwMCxcbiAgICBkdXJhdGlvbiA9IDEwMDAsXG4gICAgZWFzaW5nID0gJ2xpbmVhcicsXG4gICAgZnJhbWUgPSBub29wLFxuICAgIGNvbXBsZXRlID0gbm9vcFxufSA9IHt9KSB7XG4gICAgZnJvbSA9IGlzQXJyYXkoZnJvbSkgPyBmcm9tIDogW2Zyb21dO1xuICAgIHRvID0gaXNBcnJheSh0bykgPyB0byA6IFt0b107XG5cbiAgICBsZXQgdGltZW91dElkID0gMDtcbiAgICBjb25zdCBkaWZmcyA9IG1hcChmcm9tLCAodmFsLCBpZHgpID0+IHRvW2lkeF0gLSB2YWwpO1xuXG4gICAgZWFzaW5nID0gZWFzaW5nRnVuY3Rpb25zW2Vhc2luZ10gfHwgZWFzaW5nRnVuY3Rpb25zLmxpbmVhcjtcblxuICAgIC8qKlxuICAgICAqIEdldCBhbmltYXRpb24gcnVubmVyIG9iamVjdFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlc29sdmUgLSByZXNvbHZlIGZyb20gcHJvbWlzZVxuICAgICAqIEBwYXJhbSB7RGF0ZX0gc3RhcnQgLSB0aW1lIG9mIGFuaW1hdGlvbiBzdGFydFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBydW5uZXIocmVzb2x2ZSwgc3RhcnQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHRpY2soKSB7XG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkID0gKG5ldyBEYXRlKCkpIC0gc3RhcnQ7XG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IE1hdGgubWluKDEsIChlbGFwc2VkIC8gZHVyYXRpb24pIHx8IDApO1xuICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gbWFwKGZyb20sICh2YWwsIGlkeCkgPT4gKGRpZmZzW2lkeF0gKiBlYXNpbmcocHJvZ3Jlc3MpKSArIHZhbCk7XG5cbiAgICAgICAgICAgIGZyYW1lKC4uLnZhbHVlcyk7XG4gICAgICAgICAgICB0aW1lb3V0SWQgPSByZXF1ZXN0QW5pbUZyYW1lKHRpY2spO1xuXG4gICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPj0gMSkge1xuICAgICAgICAgICAgICAgIGNhbmNlbEFuaW1GcmFtZSh0aW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHJ1bigpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoKTtcblxuICAgICAgICAgICAgaWYgKCFpc1N1cHBvcnRQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgcnVubmVyKG5vb3AsIHN0YXJ0KSgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHJ1bm5lcihyZXNvbHZlLCBzdGFydCkoKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbCgpIHtcbiAgICAgICAgICAgIGNhbmNlbEFuaW1GcmFtZSh0aW1lb3V0SWQpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9hbmltLmpzIiwiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IEVhc2luZyBmb211bGFyc1xuICogQGF1dGhvciBOSE4gRW50LiBGRSBEZXZlbG9wbWVudCB0ZWFtIDxkbF9qYXZhc2NyaXB0QG5obmVudC5jb20+XG4gKi9cblxuY29uc3Qge2FicywgcG93fSA9IE1hdGg7XG5cbi8qKlxuICogQG1vZHVsZSAuL2Vhc2luZ1xuICogQGlnbm9yZVxuICogQGRlc2NyaXB0aW9uXG4gKiBFYXNpbmcgZm9tdWxhcnMgYXJlIGJhc2VkIG9uIEdhw6t0YW4gUmVuYXVkZWF1IGFuZCBKb2hhbiBMaW5kZWxsJ3MgZ2lzdFxuICogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vZ3JlLzE2NTAyOTRcbiAqL1xuXG4vKipcbiAqIEhpZ2ggb3JkZXIgZnVuY3Rpb24gZm9yIGVhc2UtaW5cbiAqIEBwYXJhbSB7TnVtYmVyfSBwIC0gZm9yIHVzaW5nIGBwb3cocClgIHRvIGNhbGN1bGF0ZSBhY2NlbGVyYXRlIGZhY3RvclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBfZWFzZUluKHApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gcG93KHQsIHApO1xuICAgIH07XG59XG5cbi8qKlxuICogSGlnaCBvcmRlciBmdW5jdGlvbiBmb3IgZWFzZS1vdXRcbiAqIEBwYXJhbSB7TnVtYmVyfSBwIC0gZm9yIHVzaW5nIGBwb3cocClgIHRvIGNhbGN1bGF0ZSBhY2NlbGVyYXRlIGZhY3RvclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBfZWFzZU91dChwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIDEgLSBhYnMocG93KHQgLSAxLCBwKSk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBIaWdoIG9yZGVyIGZ1bmN0aW9uIGZvciBlYXNlLWluLW91dFxuICogQHBhcmFtIHtOdW1iZXJ9IHAgLSBmb3IgdXNpbmcgYHBvdyhwKWAgdG8gY2FsY3VsYXRlIGFjY2VsZXJhdGUgZmFjdG9yXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIF9lYXNlSW5PdXQocCkge1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiB0IDwgMC41ID8gX2Vhc2VJbihwKSh0ICogMikgLyAyIDogKF9lYXNlT3V0KHApKCh0ICogMikgLSAxKSAvIDIpICsgMC41O1xuICAgIH07XG59XG5cbi8qKlxuICogbm8gZWFzaW5nLCBubyBhY2NlbGVyYXRpb25cbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgbGluZWFyID0gX2Vhc2VJbk91dCgxKTtcbi8qKlxuICogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eVxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlSW5RdWFkID0gX2Vhc2VJbigyKTtcbi8qKlxuICogZGVjZWxlcmF0aW5nIHRvIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZU91dFF1YWQgPSBfZWFzZU91dCgyKTtcbi8qKlxuICogYWNjZWxlcmF0aW9uIHVudGlsIGhhbGZ3YXksIHRoZW4gZGVjZWxlcmF0aW9uXG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJbk91dFF1YWQgPSBfZWFzZUluT3V0KDIpO1xuXG4vKipcbiAqIGFjY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluID0gZWFzZUluUXVhZDtcbi8qKlxuICogZGVjZWxlcmF0aW5nIHRvIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZU91dCA9IGVhc2VPdXRRdWFkO1xuLyoqXG4gKiBhY2NlbGVyYXRpb24gdW50aWwgaGFsZndheSwgdGhlbiBkZWNlbGVyYXRpb25cbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluT3V0ID0gZWFzZUluT3V0UXVhZDtcblxuLyoqXG4gKiBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJbkN1YmljID0gX2Vhc2VJbigzKTtcbi8qKlxuICogZGVjZWxlcmF0aW5nIHRvIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZU91dEN1YmljID0gX2Vhc2VPdXQoMyk7XG4vKipcbiAqIGFjY2VsZXJhdGlvbiB1bnRpbCBoYWxmd2F5LCB0aGVuIGRlY2VsZXJhdGlvblxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlSW5PdXRDdWJpYyA9IF9lYXNlSW5PdXQoMyk7XG5cbi8qKlxuICogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eVxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlSW5RdWFydCA9IF9lYXNlSW4oNCk7XG4vKipcbiAqIGRlY2VsZXJhdGluZyB0byB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VPdXRRdWFydCA9IF9lYXNlT3V0KDQpO1xuLyoqXG4gKiBhY2NlbGVyYXRpb24gdW50aWwgaGFsZndheSwgdGhlbiBkZWNlbGVyYXRpb25cbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluT3V0UXVhcnQgPSBfZWFzZUluT3V0KDQpO1xuXG4vKipcbiAqIGFjY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluUXVpbnQgPSBfZWFzZUluKDUpO1xuLyoqXG4gKiBkZWNlbGVyYXRpbmcgdG8gemVybyB2ZWxvY2l0eVxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlT3V0UXVpbnQgPSBfZWFzZU91dCg1KTtcbi8qKlxuICogYWNjZWxlcmF0aW9uIHVudGlsIGhhbGZ3YXksIHRoZW4gZGVjZWxlcmF0aW9uXG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJbk91dFF1aW50ID0gX2Vhc2VJbk91dCg1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9lYXNpbmcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJ0dWktY29kZS1zbmlwcGV0XCIsXCJjb21tb25qczJcIjpcInR1aS1jb2RlLXNuaXBwZXRcIixcImFtZFwiOlwidHVpLWNvZGUtc25pcHBldFwiLFwicm9vdFwiOltcInR1aVwiLFwidXRpbFwiXX1cbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==
/*!
 * tui-animation.js
 * @version 1.1.0
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
	
	var _anim = __webpack_require__(1);
	
	var animation = _interopRequireWildcard(_anim);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	module.exports = animation; /**
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
	var hostnameSent = false;
	
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
	 * send hostname
	 * @ignore
	 */
	function sendHostname() {
	    var _location = location,
	        hostname = _location.hostname;
	
	
	    if (hostnameSent) {
	        return;
	    }
	    hostnameSent = true;
	
	    (0, _tuiCodeSnippet.imagePing)('https://www.google-analytics.com/collect', {
	        v: 1,
	        t: 'event',
	        tid: 'UA-115377265-9',
	        cid: hostname,
	        dp: hostname,
	        dh: 'animation'
	    });
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
	 * @param {Boolean} [options.usageStatistics=true] - Let us know the hostname. If you don't want to send the hostname, please set to false.
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
	        complete = _ref$complete === undefined ? noop : _ref$complete,
	        _ref$usageStatistics = _ref.usageStatistics,
	        usageStatistics = _ref$usageStatistics === undefined ? true : _ref$usageStatistics;
	
	    from = (0, _tuiCodeSnippet.isArray)(from) ? from : [from];
	    to = (0, _tuiCodeSnippet.isArray)(to) ? to : [to];
	
	    var timeoutId = 0;
	    var diffs = (0, _tuiCodeSnippet.map)(from, function (val, idx) {
	        return to[idx] - val;
	    });
	
	    easing = easingFunctions[easing] || easingFunctions.linear;
	
	    if (usageStatistics) {
	        sendHostname();
	    }
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiZTcyY2FkOGU3MGU3OWE5ZTQzMiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FuaW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Vhc2luZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInR1aS1jb2RlLXNuaXBwZXRcIixcImNvbW1vbmpzMlwiOlwidHVpLWNvZGUtc25pcHBldFwiLFwiYW1kXCI6XCJ0dWktY29kZS1zbmlwcGV0XCIsXCJyb290XCI6W1widHVpXCIsXCJ1dGlsXCJdfSJdLCJuYW1lcyI6WyJhbmltYXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWVzdEFuaW1GcmFtZSIsImNhbmNlbEFuaW1GcmFtZSIsImFuaW0iLCJlYXNpbmdGdW5jdGlvbnMiLCJpc1N1cHBvcnRQcm9taXNlIiwiUHJvbWlzZSIsInRlc3QiLCJ0b1N0cmluZyIsImhvc3RuYW1lU2VudCIsIm5vb3AiLCJnZXRQcmVmaXhlZCIsIm5hbWUiLCJ3aW5kb3ciLCJyZXF1ZXN0Rm4iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYWxsYmFjayIsInNldFRpbWVvdXQiLCJjYW5jZWxGbiIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwidGltZXJJZCIsImNsZWFyVGltZW91dCIsInNlbmRIb3N0bmFtZSIsImxvY2F0aW9uIiwiaG9zdG5hbWUiLCJ2IiwidCIsInRpZCIsImNpZCIsImRwIiwiZGgiLCJmcm9tIiwidG8iLCJkdXJhdGlvbiIsImVhc2luZyIsImZyYW1lIiwiY29tcGxldGUiLCJ1c2FnZVN0YXRpc3RpY3MiLCJ0aW1lb3V0SWQiLCJkaWZmcyIsInZhbCIsImlkeCIsImxpbmVhciIsInJ1bm5lciIsInJlc29sdmUiLCJzdGFydCIsInRpY2siLCJlbGFwc2VkIiwiRGF0ZSIsInByb2dyZXNzIiwiTWF0aCIsIm1pbiIsInZhbHVlcyIsInJ1biIsImNhbmNlbCIsImFicyIsInBvdyIsIl9lYXNlSW4iLCJwIiwiX2Vhc2VPdXQiLCJfZWFzZUluT3V0IiwiZWFzZUluUXVhZCIsImVhc2VPdXRRdWFkIiwiZWFzZUluT3V0UXVhZCIsImVhc2VJbiIsImVhc2VPdXQiLCJlYXNlSW5PdXQiLCJlYXNlSW5DdWJpYyIsImVhc2VPdXRDdWJpYyIsImVhc2VJbk91dEN1YmljIiwiZWFzZUluUXVhcnQiLCJlYXNlT3V0UXVhcnQiLCJlYXNlSW5PdXRRdWFydCIsImVhc2VJblF1aW50IiwiZWFzZU91dFF1aW50IiwiZWFzZUluT3V0UXVpbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3QkE7O0tBQVlBLFM7Ozs7QUFFWkMsUUFBT0MsT0FBUCxHQUFpQkYsU0FBakIsQyxDQVhBOzs7Ozs7Ozs7Ozs7Ozs7OztTQ3lEZ0JHLGdCLEdBQUFBLGdCO1NBZ0JBQyxlLEdBQUFBLGU7U0EyRUFDLEksR0FBQUEsSTs7QUF6SWhCOztLQUFZQyxlOztBQUNaOzs7O3FNQVpBOzs7OztBQUtBOzs7Ozs7QUFTQSxLQUFNQyxtQkFBb0IsT0FBT0MsT0FBUCxLQUFtQixXQUFwQixJQUNwQixrQkFBa0JDLElBQWxCLENBQXVCRCxRQUFRRSxRQUFSLEVBQXZCLENBREw7QUFFQSxLQUFJQyxlQUFlLEtBQW5COztBQUVBO0FBQ0EsVUFBU0MsSUFBVCxHQUFnQixDQUFFOztBQUVs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ZWYsU0FBUyxDQUFULENBQXJCO0FBQ1A7Ozs7OztBQU1PLEtBQU1nQiwwQ0FBaUJmLFdBQVcsQ0FBWCxDQUF2QixDOzs7Ozs7QUNuS1AsZ0QiLCJmaWxlIjoidHVpLWFuaW1hdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcInR1aS1jb2RlLXNuaXBwZXRcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1widHVpLWNvZGUtc25pcHBldFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhbmltYXRpb25cIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJ0dWktY29kZS1zbmlwcGV0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ0dWlcIl0gPSByb290W1widHVpXCJdIHx8IHt9LCByb290W1widHVpXCJdW1wiYW5pbWF0aW9uXCJdID0gZmFjdG9yeShyb290W1widHVpXCJdW1widXRpbFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJkaXN0XCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYmU3MmNhZDhlNzBlNzlhOWU0MzIiLCIvKipcbiAqIEBuYW1lc3BhY2UgdHVpLmFuaW1hdGlvblxuICogQGRlc2NyaXB0aW9uIEFuaW1hdGlvbiBsaWJyYXJ5XG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5HZXQgTW9kdWxlPC9jYXB0aW9uPlxuICogdmFyIGFuaW1hdGlvbiA9IHJlcXVpcmUoJ3R1aS1hbmltYXRpb24nKTsgLy8gY29tbW9uanMgdHlwZVxuICogdmFyIGFuaW1hdGlvbiA9IHR1aS5hbmltYXRpb247IC8vIHdoZW4gdXNpbmcgYnVuZGxlIGZpbGVcbiAqIHZhciBydW5uZXIgPSBhbmltYXRpb24uYW5pbSh7Li4ufSk7XG4gKiB9KTtcbiAqL1xuaW1wb3J0ICogYXMgYW5pbWF0aW9uIGZyb20gJy4vYW5pbSc7XG5cbm1vZHVsZS5leHBvcnRzID0gYW5pbWF0aW9uO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2luZGV4LmpzIiwiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IE1vZHVsZSBmb3IgYW5pbWF0aW9uc1xuICogQGF1dGhvciBOSE4gRW50LiBGRSBEZXZlbG9wbWVudCB0ZWFtIDxkbF9qYXZhc2NyaXB0QG5obmVudC5jb20+XG4gKi9cblxuLyoqXG4gKiBAbW9kdWxlIC4vYW5pbVxuICogQGlnbm9yZVxuICogQGRlc2NyaXB0aW9uIENvcmUgbW9kdWxlIGZvciBhbmltYXRpb25cbiAqL1xuXG5pbXBvcnQgKiBhcyBlYXNpbmdGdW5jdGlvbnMgZnJvbSAnLi9lYXNpbmcnO1xuaW1wb3J0IHtpbWFnZVBpbmcsIGlzQXJyYXksIG1hcH0gZnJvbSAndHVpLWNvZGUtc25pcHBldCc7XG5cbmNvbnN0IGlzU3VwcG9ydFByb21pc2UgPSAodHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnKSAmJlxuICAgICgvXFxbbmF0aXZlIGNvZGVcXF0vLnRlc3QoUHJvbWlzZS50b1N0cmluZygpKSk7XG5sZXQgaG9zdG5hbWVTZW50ID0gZmFsc2U7XG5cbi8qKiBEbyBub3RoaW5nICovXG5mdW5jdGlvbiBub29wKCkge31cblxuLyoqXG4gKiBHZXQgbmFtZSB3aXRoIHZlbmRvciBwcmVmaXhcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gbmFtZSB0byBwcmVwZW5kIHByZWZpeFxuICogQHJldHVybnMge1N0cmluZ30gdmVuZG9yIHByZWZpeGVkIG5hbWVcbiAqL1xuZnVuY3Rpb24gZ2V0UHJlZml4ZWQobmFtZSkge1xuICAgIHJldHVybiB3aW5kb3dbYHdlYmtpdCR7bmFtZX1gXSB8fCB3aW5kb3dbYG1veiR7bmFtZX1gXSB8fCB3aW5kb3dbYG1zJHtuYW1lfWBdO1xufVxuXG5jb25zdCByZXF1ZXN0Rm4gPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgZ2V0UHJlZml4ZWQoJ1JlcXVlc3RBbmltYXRpb25GcmFtZScpIHx8XG4gICAgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgIH07XG5cbmNvbnN0IGNhbmNlbEZuID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgZ2V0UHJlZml4ZWQoJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJykgfHxcbiAgICBnZXRQcmVmaXhlZCgnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJykgfHxcbiAgICBmdW5jdGlvbih0aW1lcklkKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfTtcblxuLyoqXG4gKiBTaGltIG9mIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICpcbiAqIFVzZSBgc2V0VGltZW91dGAgdHJpY2sgb24gYmVsb3cgSW50ZXJuZXQgRXhwbG9yZXIgOFxuICogQG1ldGhvZCByZXF1ZXN0QW5pbUZyYW1lXG4gKiBAbWVtYmVyb2YgdHVpLmFuaW1hdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBjYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge051bWJlcn0gdGltZXIgaWRcbiAqIEBleGFtcGxlXG4gKiB2YXIgYW5pbWF0aW9uID0gcmVxdWlyZSgndHVpLWFuaW1hdGlvbicpO1xuICogdmFyIHRpbWVySWQgPSBhbmltYXRpb24ucmVxdWVzdEFuaW1GcmFtZShmdW5jdGlvbigpIHtcbiAqICAgJCgnYm94JykuY3NzKGxlZnQsICcxMDBweCcpO1xuICogfSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0QW5pbUZyYW1lKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RGbihjYWxsYmFjayk7XG59XG5cbi8qKlxuICogU2hpbSBvZiBjYW5jZWxBbmltYXRpb25GcmFtZVxuICogQG1ldGhvZCBjYW5jZWxBbmltRnJhbWVcbiAqIEBtZW1iZXJvZiB0dWkuYW5pbWF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gdGltZXJJZCAtIHJlcXVlc3RBbmltYXRpb25GcmFtZSB0aW1lcklkXG4gKiBAZXhhbXBsZVxuICogdmFyIGFuaW1hdGlvbiA9IHJlcXVpcmUoJ3R1aS1hbmltYXRpb24nKTtcbiAqIHZhciB0aW1lcklkID0gYW5pbWF0aW9uLnJlcXVlc3RBbmltRnJhbWUoZnVuY3Rpb24oKSB7XG4gKiAgICQoJ2JveCcpLmNzcyhsZWZ0LCAnMTAwcHgnKTtcbiAqIH0pO1xuICogYW5pbWF0aW9uLmNhbmNlbEFuaW1GcmFtZSh0aW1lcklkKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbEFuaW1GcmFtZSh0aW1lcklkKSB7XG4gICAgaWYgKCF0aW1lcklkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjYW5jZWxGbih0aW1lcklkKTtcbn1cblxuLyoqXG4gKiBzZW5kIGhvc3RuYW1lXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIHNlbmRIb3N0bmFtZSgpIHtcbiAgICBjb25zdCB7aG9zdG5hbWV9ID0gbG9jYXRpb247XG5cbiAgICBpZiAoaG9zdG5hbWVTZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaG9zdG5hbWVTZW50ID0gdHJ1ZTtcblxuICAgIGltYWdlUGluZygnaHR0cHM6Ly93d3cuZ29vZ2xlLWFuYWx5dGljcy5jb20vY29sbGVjdCcsIHtcbiAgICAgICAgdjogMSxcbiAgICAgICAgdDogJ2V2ZW50JyxcbiAgICAgICAgdGlkOiAnVUEtMTE1Mzc3MjY1LTknLFxuICAgICAgICBjaWQ6IGhvc3RuYW1lLFxuICAgICAgICBkcDogaG9zdG5hbWUsXG4gICAgICAgIGRoOiAnYW5pbWF0aW9uJ1xuICAgIH0pO1xufVxuXG4vKipcbiAqIEdldCBhbmltYXRpb24gcnVubmVyXG4gKiBAbWVtYmVyb2YgdHVpLmFuaW1hdGlvblxuICogQG1ldGhvZCBhbmltXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnNcbiAqIEBwYXJhbSB7KE51bWJlcnxOdW1iZXJbXSl9IFtvcHRpb25zLmZyb209MF0gLSBiZWdpbm5pbmcgdmFsdWVzXG4gKiBAcGFyYW0geyhOdW1iZXJ8TnVtYmVyW10pfSBbb3B0aW9ucy50bz0xMDBdIC0gY2hhbmdlIGluIHZhbHVlc1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uPTEwMDBdIC0gZHVyYXRpb24gKG1zKVxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmVhc2luZz0nbGluZWFyJ10gLSBlYXNpbmcgZnVuY3Rpb25zIHtAc2VlIGVhc2luZ31cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmZyYW1lXSAtIGludm9raW5nIGVhY2ggZnJhbWVzLiB5b3UgY2FuIG1hbmlwdWxhdGUgc3BlY2lmaWMgZWxlbWVudCBieSB0aGlzIGZ1bmN0aW9uXG4gKiAgIHRoZSBhcmd1bWVudHMgcGFzc2VkIHdpdGggc2FtZSBzZXF1ZW5jZSB3aXRoIGBmcm9tYCwgYHRvYCBvcHRpb24gdmFsdWVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5jb21wbGV0ZV0gLSBpbnZva2VkIG9uY2UgYXQgZW5kIG9mIGFuaW1hdGlvblxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy51c2FnZVN0YXRpc3RpY3M9dHJ1ZV0gLSBMZXQgdXMga25vdyB0aGUgaG9zdG5hbWUuIElmIHlvdSBkb24ndCB3YW50IHRvIHNlbmQgdGhlIGhvc3RuYW1lLCBwbGVhc2Ugc2V0IHRvIGZhbHNlLlxuICogQHJldHVybnMge09iamVjdH0gYW5pbWF0aW9uIHJ1bm5lclxuICogQHR1dG9yaWFsIGV4YW1wbGUwMS1iYXNpYy11c2FnZVxuICogQHR1dG9yaWFsIGV4YW1wbGUwMi0yRC1tb3ZlbWVudFxuICogQHR1dG9yaWFsIGV4YW1wbGUwMy11c2luZy1wcm9taXNlXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Jbml0aWFsaXplIGFuZCBSdW4gYW5pbWF0aW9uIHJ1bm5lcjwvY2FwdGlvbj5cbiAqIHZhciBhbmltYXRpb24gPSByZXF1aXJlKCd0dWktYW5pbWF0aW9uJyk7XG4gKiB2YXIgcnVubmVyID0gdHVpLmFuaW1hdGlvbi5hbmltKHtcbiAqICAgZnJvbTogWzEsIDVdLCAgLy8gaW5pdGlhbCB4LCB5IHBvc2l0aW9uXG4gKiAgIHRvOiBbMTAwLCA1MDBdLFxuICogICBkdXJhdGlvbjogMjAwMCxcbiAqICAgZWFzaW5nOiAnZWFzZUluT3V0JyxcbiAqICAgLy8gbWFuaXB1bGF0ZSB4LCB5IHBvc2l0aW9uXG4gKiAgIGZyYW1lOiBmdW5jdGlvbih4LCB5KSB7XG4gKiAgICAgJGJveC5jc3Moe1xuICogICAgICAgbGVmdDogeCArICdweCcsXG4gKiAgICAgICB0b3A6IHkgKyAncHgnXG4gKiAgICAgfSk7XG4gKiAgIH0sXG4gKiAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAqICAgICAkYm94LmNzcyh7XG4gKiAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZWQnXG4gKiAgICAgfSk7XG4gKiAgIH1cbiAqIH0pO1xuICpcbiAqIC8vIFJ1biBhbmltYXRpb25cbiAqIHJ1bm5lci5ydW4oKTtcbiAqXG4gKiAvLyBJZiBicm93c2VyIHN1cHBvcnQgUHJvbWlzZSB0aGVuIG1ldGhvZCBgcnVuKClgIGlzIHJldHVybiBpdCwgb3RoZXJ3aXNlIGl0IHJldHVybiBgbnVsbGBcbiAqIC8vIFNvIGJlbG93IGxpbmUgaGFzIGJlIHBvc3NpYmxlIHRocm93IGFuIGVycm9ycy4gdXNlIGNhcmVmdWxseVxuICogcnVubmVyLnJ1bigpLnRoZW4oZnVuY3Rpb24oKSB7Y29uc29sZS5sb2coJ2RvbmUhJyk7fSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbmltKHtcbiAgICBmcm9tID0gMCxcbiAgICB0byA9IDEwMCxcbiAgICBkdXJhdGlvbiA9IDEwMDAsXG4gICAgZWFzaW5nID0gJ2xpbmVhcicsXG4gICAgZnJhbWUgPSBub29wLFxuICAgIGNvbXBsZXRlID0gbm9vcCxcbiAgICB1c2FnZVN0YXRpc3RpY3MgPSB0cnVlXG59ID0ge30pIHtcbiAgICBmcm9tID0gaXNBcnJheShmcm9tKSA/IGZyb20gOiBbZnJvbV07XG4gICAgdG8gPSBpc0FycmF5KHRvKSA/IHRvIDogW3RvXTtcblxuICAgIGxldCB0aW1lb3V0SWQgPSAwO1xuICAgIGNvbnN0IGRpZmZzID0gbWFwKGZyb20sICh2YWwsIGlkeCkgPT4gdG9baWR4XSAtIHZhbCk7XG5cbiAgICBlYXNpbmcgPSBlYXNpbmdGdW5jdGlvbnNbZWFzaW5nXSB8fCBlYXNpbmdGdW5jdGlvbnMubGluZWFyO1xuXG4gICAgaWYgKHVzYWdlU3RhdGlzdGljcykge1xuICAgICAgICBzZW5kSG9zdG5hbWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW5pbWF0aW9uIHJ1bm5lciBvYmplY3RcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXNvbHZlIC0gcmVzb2x2ZSBmcm9tIHByb21pc2VcbiAgICAgKiBAcGFyYW0ge0RhdGV9IHN0YXJ0IC0gdGltZSBvZiBhbmltYXRpb24gc3RhcnRcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAgICovXG4gICAgZnVuY3Rpb24gcnVubmVyKHJlc29sdmUsIHN0YXJ0KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiB0aWNrKCkge1xuICAgICAgICAgICAgY29uc3QgZWxhcHNlZCA9IChuZXcgRGF0ZSgpKSAtIHN0YXJ0O1xuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLm1pbigxLCAoZWxhcHNlZCAvIGR1cmF0aW9uKSB8fCAwKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IG1hcChmcm9tLCAodmFsLCBpZHgpID0+IChkaWZmc1tpZHhdICogZWFzaW5nKHByb2dyZXNzKSkgKyB2YWwpO1xuXG4gICAgICAgICAgICBmcmFtZSguLi52YWx1ZXMpO1xuICAgICAgICAgICAgdGltZW91dElkID0gcmVxdWVzdEFuaW1GcmFtZSh0aWNrKTtcblxuICAgICAgICAgICAgaWYgKHByb2dyZXNzID49IDEpIHtcbiAgICAgICAgICAgICAgICBjYW5jZWxBbmltRnJhbWUodGltZW91dElkKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBydW4oKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgICAgIGlmICghaXNTdXBwb3J0UHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHJ1bm5lcihub29wLCBzdGFydCkoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBydW5uZXIocmVzb2x2ZSwgc3RhcnQpKCkpO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWwoKSB7XG4gICAgICAgICAgICBjYW5jZWxBbmltRnJhbWUodGltZW91dElkKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYW5pbS5qcyIsIi8qKlxuICogQGZpbGVvdmVydmlldyBFYXNpbmcgZm9tdWxhcnNcbiAqIEBhdXRob3IgTkhOIEVudC4gRkUgRGV2ZWxvcG1lbnQgdGVhbSA8ZGxfamF2YXNjcmlwdEBuaG5lbnQuY29tPlxuICovXG5cbmNvbnN0IHthYnMsIHBvd30gPSBNYXRoO1xuXG4vKipcbiAqIEBtb2R1bGUgLi9lYXNpbmdcbiAqIEBpZ25vcmVcbiAqIEBkZXNjcmlwdGlvblxuICogRWFzaW5nIGZvbXVsYXJzIGFyZSBiYXNlZCBvbiBHYcOrdGFuIFJlbmF1ZGVhdSBhbmQgSm9oYW4gTGluZGVsbCdzIGdpc3RcbiAqIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2dyZS8xNjUwMjk0XG4gKi9cblxuLyoqXG4gKiBIaWdoIG9yZGVyIGZ1bmN0aW9uIGZvciBlYXNlLWluXG4gKiBAcGFyYW0ge051bWJlcn0gcCAtIGZvciB1c2luZyBgcG93KHApYCB0byBjYWxjdWxhdGUgYWNjZWxlcmF0ZSBmYWN0b3JcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gX2Vhc2VJbihwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHBvdyh0LCBwKTtcbiAgICB9O1xufVxuXG4vKipcbiAqIEhpZ2ggb3JkZXIgZnVuY3Rpb24gZm9yIGVhc2Utb3V0XG4gKiBAcGFyYW0ge051bWJlcn0gcCAtIGZvciB1c2luZyBgcG93KHApYCB0byBjYWxjdWxhdGUgYWNjZWxlcmF0ZSBmYWN0b3JcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gX2Vhc2VPdXQocCkge1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiAxIC0gYWJzKHBvdyh0IC0gMSwgcCkpO1xuICAgIH07XG59XG5cbi8qKlxuICogSGlnaCBvcmRlciBmdW5jdGlvbiBmb3IgZWFzZS1pbi1vdXRcbiAqIEBwYXJhbSB7TnVtYmVyfSBwIC0gZm9yIHVzaW5nIGBwb3cocClgIHRvIGNhbGN1bGF0ZSBhY2NlbGVyYXRlIGZhY3RvclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBfZWFzZUluT3V0KHApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdCA8IDAuNSA/IF9lYXNlSW4ocCkodCAqIDIpIC8gMiA6IChfZWFzZU91dChwKSgodCAqIDIpIC0gMSkgLyAyKSArIDAuNTtcbiAgICB9O1xufVxuXG4vKipcbiAqIG5vIGVhc2luZywgbm8gYWNjZWxlcmF0aW9uXG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGxpbmVhciA9IF9lYXNlSW5PdXQoMSk7XG4vKipcbiAqIGFjY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluUXVhZCA9IF9lYXNlSW4oMik7XG4vKipcbiAqIGRlY2VsZXJhdGluZyB0byB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VPdXRRdWFkID0gX2Vhc2VPdXQoMik7XG4vKipcbiAqIGFjY2VsZXJhdGlvbiB1bnRpbCBoYWxmd2F5LCB0aGVuIGRlY2VsZXJhdGlvblxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlSW5PdXRRdWFkID0gX2Vhc2VJbk91dCgyKTtcblxuLyoqXG4gKiBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJbiA9IGVhc2VJblF1YWQ7XG4vKipcbiAqIGRlY2VsZXJhdGluZyB0byB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VPdXQgPSBlYXNlT3V0UXVhZDtcbi8qKlxuICogYWNjZWxlcmF0aW9uIHVudGlsIGhhbGZ3YXksIHRoZW4gZGVjZWxlcmF0aW9uXG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJbk91dCA9IGVhc2VJbk91dFF1YWQ7XG5cbi8qKlxuICogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eVxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlSW5DdWJpYyA9IF9lYXNlSW4oMyk7XG4vKipcbiAqIGRlY2VsZXJhdGluZyB0byB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VPdXRDdWJpYyA9IF9lYXNlT3V0KDMpO1xuLyoqXG4gKiBhY2NlbGVyYXRpb24gdW50aWwgaGFsZndheSwgdGhlbiBkZWNlbGVyYXRpb25cbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluT3V0Q3ViaWMgPSBfZWFzZUluT3V0KDMpO1xuXG4vKipcbiAqIGFjY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluUXVhcnQgPSBfZWFzZUluKDQpO1xuLyoqXG4gKiBkZWNlbGVyYXRpbmcgdG8gemVybyB2ZWxvY2l0eVxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlT3V0UXVhcnQgPSBfZWFzZU91dCg0KTtcbi8qKlxuICogYWNjZWxlcmF0aW9uIHVudGlsIGhhbGZ3YXksIHRoZW4gZGVjZWxlcmF0aW9uXG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJbk91dFF1YXJ0ID0gX2Vhc2VJbk91dCg0KTtcblxuLyoqXG4gKiBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJblF1aW50ID0gX2Vhc2VJbig1KTtcbi8qKlxuICogZGVjZWxlcmF0aW5nIHRvIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZU91dFF1aW50ID0gX2Vhc2VPdXQoNSk7XG4vKipcbiAqIGFjY2VsZXJhdGlvbiB1bnRpbCBoYWxmd2F5LCB0aGVuIGRlY2VsZXJhdGlvblxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlSW5PdXRRdWludCA9IF9lYXNlSW5PdXQoNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZWFzaW5nLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwidHVpLWNvZGUtc25pcHBldFwiLFwiY29tbW9uanMyXCI6XCJ0dWktY29kZS1zbmlwcGV0XCIsXCJhbWRcIjpcInR1aS1jb2RlLXNuaXBwZXRcIixcInJvb3RcIjpbXCJ0dWlcIixcInV0aWxcIl19XG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=
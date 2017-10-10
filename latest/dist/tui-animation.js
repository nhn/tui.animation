/*!
 * tui-animation.js
 * @version 1.0.0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjZGY3YjUwMjU2MmYyZTczNWFmNyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FuaW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Vhc2luZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInR1aS1jb2RlLXNuaXBwZXRcIixcImNvbW1vbmpzMlwiOlwidHVpLWNvZGUtc25pcHBldFwiLFwiYW1kXCI6XCJ0dWktY29kZS1zbmlwcGV0XCIsXCJyb290XCI6W1widHVpXCIsXCJ1dGlsXCJdfSJdLCJuYW1lcyI6WyJhbmltYXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWVzdEFuaW1GcmFtZSIsImNhbmNlbEFuaW1GcmFtZSIsImFuaW0iLCJlYXNpbmdGdW5jdGlvbnMiLCJpc1N1cHBvcnRQcm9taXNlIiwiUHJvbWlzZSIsInRlc3QiLCJ0b1N0cmluZyIsIm5vb3AiLCJnZXRQcmVmaXhlZCIsIm5hbWUiLCJ3aW5kb3ciLCJyZXF1ZXN0Rm4iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYWxsYmFjayIsInNldFRpbWVvdXQiLCJjYW5jZWxGbiIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwidGltZXJJZCIsImNsZWFyVGltZW91dCIsImZyb20iLCJ0byIsImR1cmF0aW9uIiwiZWFzaW5nIiwiZnJhbWUiLCJjb21wbGV0ZSIsInRpbWVvdXRJZCIsImRpZmZzIiwidmFsIiwiaWR4IiwibGluZWFyIiwicnVubmVyIiwicmVzb2x2ZSIsInN0YXJ0IiwidGljayIsImVsYXBzZWQiLCJEYXRlIiwicHJvZ3Jlc3MiLCJNYXRoIiwibWluIiwidmFsdWVzIiwicnVuIiwiY2FuY2VsIiwiYWJzIiwicG93IiwiX2Vhc2VJbiIsInAiLCJ0IiwiX2Vhc2VPdXQiLCJfZWFzZUluT3V0IiwiZWFzZUluUXVhZCIsImVhc2VPdXRRdWFkIiwiZWFzZUluT3V0UXVhZCIsImVhc2VJbiIsImVhc2VPdXQiLCJlYXNlSW5PdXQiLCJlYXNlSW5DdWJpYyIsImVhc2VPdXRDdWJpYyIsImVhc2VJbk91dEN1YmljIiwiZWFzZUluUXVhcnQiLCJlYXNlT3V0UXVhcnQiLCJlYXNlSW5PdXRRdWFydCIsImVhc2VJblF1aW50IiwiZWFzZU91dFF1aW50IiwiZWFzZUluT3V0UXVpbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3QkE7O0tBQVlBLFM7Ozs7QUFFWkMsUUFBT0MsT0FBUCxHQUFpQkYsU0FBakIsQyxDQVhBOzs7Ozs7Ozs7Ozs7Ozs7OztTQ3dEZ0JHLGdCLEdBQUFBLGdCO1NBZ0JBQyxlLEdBQUFBLGU7U0FvREFDLEksR0FBQUEsSTs7QUFqSGhCOztLQUFZQyxlOztBQUNaOzs7O3FNQVpBOzs7OztBQUtBOzs7Ozs7QUFTQSxLQUFNQyxtQkFBb0IsT0FBT0MsT0FBUCxLQUFtQixXQUFwQixJQUNwQixrQkFBa0JDLElBQWxCLENBQXVCRCxRQUFRRSxRQUFSLEVBQXZCLENBREw7O0FBR0E7QUFDQSxVQUFTQyxJQUFULEdBQWdCLENBQUU7O0FBRWxCOzs7OztBQUtBLFVBQVNDLFdBQVQsQ0FBcUJDLElBQXJCLEVBQTJCO0FBQ3ZCLFlBQU9DLGtCQUFnQkQsSUFBaEIsS0FBMkJDLGVBQWFELElBQWIsQ0FBM0IsSUFBbURDLGNBQVlELElBQVosQ0FBMUQ7QUFD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VUFBZjtBQUNQOzs7Ozs7QUFNTyxLQUFNSSw0QkFBVUgsV0FBaEI7QUFDUDs7Ozs7O0FBTU8sS0FBTUksZ0NBQVlILGFBQWxCOztBQUVQOzs7Ozs7QUFNTyxLQUFNSSxvQ0FBY1gsUUFBUSxDQUFSLENBQXBCO0FBQ1A7Ozs7OztBQU1PLEtBQU1ZLHNDQUFlVCxTQUFTLENBQVQsQ0FBckI7QUFDUDs7Ozs7O0FBTU8sS0FBTVUsMENBQWlCVCxXQUFXLENBQVgsQ0FBdkI7O0FBRVA7Ozs7OztBQU1PLEtBQU1VLG9DQUFjZCxRQUFRLENBQVIsQ0FBcEI7QUFDUDs7Ozs7O0FBTU8sS0FBTWUsc0NBQWVaLFNBQVMsQ0FBVCxDQUFyQjtBQUNQOzs7Ozs7QUFNTyxLQUFNYSwwQ0FBaUJaLFdBQVcsQ0FBWCxDQUF2Qjs7QUFFUDs7Ozs7O0FBTU8sS0FBTWEsb0NBQWNqQixRQUFRLENBQVIsQ0FBcEI7QUFDUDs7Ozs7O0FBTU8sS0FBTWtCLHNDQUFlZixTQUFTLENBQVQsQ0FBckI7QUFDUDs7Ozs7O0FBTU8sS0FBTWdCLDBDQUFpQmYsV0FBVyxDQUFYLENBQXZCLEM7Ozs7OztBQ25LUCxnRCIsImZpbGUiOiJ0dWktYW5pbWF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwidHVpLWNvZGUtc25pcHBldFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJ0dWktY29kZS1zbmlwcGV0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFuaW1hdGlvblwiXSA9IGZhY3RvcnkocmVxdWlyZShcInR1aS1jb2RlLXNuaXBwZXRcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInR1aVwiXSA9IHJvb3RbXCJ0dWlcIl0gfHwge30sIHJvb3RbXCJ0dWlcIl1bXCJhbmltYXRpb25cIl0gPSBmYWN0b3J5KHJvb3RbXCJ0dWlcIl1bXCJ1dGlsXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImRpc3RcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjZGY3YjUwMjU2MmYyZTczNWFmNyIsIi8qKlxuICogQG5hbWVzcGFjZSB0dWkuYW5pbWF0aW9uXG4gKiBAZGVzY3JpcHRpb24gQW5pbWF0aW9uIGxpYnJhcnlcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkdldCBNb2R1bGU8L2NhcHRpb24+XG4gKiB2YXIgYW5pbWF0aW9uID0gcmVxdWlyZSgndHVpLWFuaW1hdGlvbicpOyAvLyBjb21tb25qcyB0eXBlXG4gKiB2YXIgYW5pbWF0aW9uID0gdHVpLmFuaW1hdGlvbjsgLy8gd2hlbiB1c2luZyBidW5kbGUgZmlsZVxuICogdmFyIHJ1bm5lciA9IGFuaW1hdGlvbi5hbmltKHsuLi59KTtcbiAqIH0pO1xuICovXG5pbXBvcnQgKiBhcyBhbmltYXRpb24gZnJvbSAnLi9hbmltJztcblxubW9kdWxlLmV4cG9ydHMgPSBhbmltYXRpb247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvaW5kZXguanMiLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgTW9kdWxlIGZvciBhbmltYXRpb25zXG4gKiBAYXV0aG9yIE5ITiBFbnQuIEZFIERldmVsb3BtZW50IHRlYW0gPGRsX2phdmFzY3JpcHRAbmhuZW50LmNvbT5cbiAqL1xuXG4vKipcbiAqIEBtb2R1bGUgLi9hbmltXG4gKiBAaWdub3JlXG4gKiBAZGVzY3JpcHRpb24gQ29yZSBtb2R1bGUgZm9yIGFuaW1hdGlvblxuICovXG5cbmltcG9ydCAqIGFzIGVhc2luZ0Z1bmN0aW9ucyBmcm9tICcuL2Vhc2luZyc7XG5pbXBvcnQge2lzQXJyYXksIG1hcH0gZnJvbSAndHVpLWNvZGUtc25pcHBldCc7XG5cbmNvbnN0IGlzU3VwcG9ydFByb21pc2UgPSAodHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnKSAmJlxuICAgICgvXFxbbmF0aXZlIGNvZGVcXF0vLnRlc3QoUHJvbWlzZS50b1N0cmluZygpKSk7XG5cbi8qKiBEbyBub3RoaW5nICovXG5mdW5jdGlvbiBub29wKCkge31cblxuLyoqXG4gKiBHZXQgbmFtZSB3aXRoIHZlbmRvciBwcmVmaXhcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gbmFtZSB0byBwcmVwZW5kIHByZWZpeFxuICogQHJldHVybnMge1N0cmluZ30gdmVuZG9yIHByZWZpeGVkIG5hbWVcbiAqL1xuZnVuY3Rpb24gZ2V0UHJlZml4ZWQobmFtZSkge1xuICAgIHJldHVybiB3aW5kb3dbYHdlYmtpdCR7bmFtZX1gXSB8fCB3aW5kb3dbYG1veiR7bmFtZX1gXSB8fCB3aW5kb3dbYG1zJHtuYW1lfWBdO1xufVxuXG5jb25zdCByZXF1ZXN0Rm4gPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgZ2V0UHJlZml4ZWQoJ1JlcXVlc3RBbmltYXRpb25GcmFtZScpIHx8XG4gICAgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgIH07XG5cbmNvbnN0IGNhbmNlbEZuID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgZ2V0UHJlZml4ZWQoJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJykgfHxcbiAgICBnZXRQcmVmaXhlZCgnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJykgfHxcbiAgICBmdW5jdGlvbih0aW1lcklkKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfTtcblxuLyoqXG4gKiBTaGltIG9mIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICpcbiAqIFVzZSBgc2V0VGltZW91dGAgdHJpY2sgb24gYmVsb3cgSW50ZXJuZXQgRXhwbG9yZXIgOFxuICogQG1ldGhvZCByZXF1ZXN0QW5pbUZyYW1lXG4gKiBAbWVtYmVyb2YgdHVpLmFuaW1hdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBjYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge051bWJlcn0gdGltZXIgaWRcbiAqIEBleGFtcGxlXG4gKiB2YXIgYW5pbWF0aW9uID0gcmVxdWlyZSgndHVpLWFuaW1hdGlvbicpO1xuICogdmFyIHRpbWVySWQgPSBhbmltYXRpb24ucmVxdWVzdEFuaW1GcmFtZShmdW5jdGlvbigpIHtcbiAqICAgJCgnYm94JykuY3NzKGxlZnQsICcxMDBweCcpO1xuICogfSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0QW5pbUZyYW1lKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RGbihjYWxsYmFjayk7XG59XG5cbi8qKlxuICogU2hpbSBvZiBjYW5jZWxBbmltYXRpb25GcmFtZVxuICogQG1ldGhvZCBjYW5jZWxBbmltRnJhbWVcbiAqIEBtZW1iZXJvZiB0dWkuYW5pbWF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gdGltZXJJZCAtIHJlcXVlc3RBbmltYXRpb25GcmFtZSB0aW1lcklkXG4gKiBAZXhhbXBsZVxuICogdmFyIGFuaW1hdGlvbiA9IHJlcXVpcmUoJ3R1aS1hbmltYXRpb24nKTtcbiAqIHZhciB0aW1lcklkID0gYW5pbWF0aW9uLnJlcXVlc3RBbmltRnJhbWUoZnVuY3Rpb24oKSB7XG4gKiAgICQoJ2JveCcpLmNzcyhsZWZ0LCAnMTAwcHgnKTtcbiAqIH0pO1xuICogYW5pbWF0aW9uLmNhbmNlbEFuaW1GcmFtZSh0aW1lcklkKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbEFuaW1GcmFtZSh0aW1lcklkKSB7XG4gICAgaWYgKCF0aW1lcklkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjYW5jZWxGbih0aW1lcklkKTtcbn1cblxuLyoqXG4gKiBHZXQgYW5pbWF0aW9uIHJ1bm5lclxuICogQG1lbWJlcm9mIHR1aS5hbmltYXRpb25cbiAqIEBtZXRob2QgYW5pbVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zXG4gKiBAcGFyYW0geyhOdW1iZXJ8TnVtYmVyW10pfSBbb3B0aW9ucy5mcm9tPTBdIC0gYmVnaW5uaW5nIHZhbHVlc1xuICogQHBhcmFtIHsoTnVtYmVyfE51bWJlcltdKX0gW29wdGlvbnMudG89MTAwXSAtIGNoYW5nZSBpbiB2YWx1ZXNcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0xMDAwXSAtIGR1cmF0aW9uIChtcylcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5lYXNpbmc9J2xpbmVhciddIC0gZWFzaW5nIGZ1bmN0aW9ucyB7QHNlZSBlYXNpbmd9XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5mcmFtZV0gLSBpbnZva2luZyBlYWNoIGZyYW1lcy4geW91IGNhbiBtYW5pcHVsYXRlIHNwZWNpZmljIGVsZW1lbnQgYnkgdGhpcyBmdW5jdGlvblxuICogICB0aGUgYXJndW1lbnRzIHBhc3NlZCB3aXRoIHNhbWUgc2VxdWVuY2Ugd2l0aCBgZnJvbWAsIGB0b2Agb3B0aW9uIHZhbHVlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY29tcGxldGVdIC0gaW52b2tlZCBvbmNlIGF0IGVuZCBvZiBhbmltYXRpb25cbiAqIEByZXR1cm5zIHtPYmplY3R9IGFuaW1hdGlvbiBydW5uZXJcbiAqIEB0dXRvcmlhbCBleGFtcGxlMDEtYmFzaWMtdXNhZ2VcbiAqIEB0dXRvcmlhbCBleGFtcGxlMDItMkQtbW92ZW1lbnRcbiAqIEB0dXRvcmlhbCBleGFtcGxlMDMtdXNpbmctcHJvbWlzZVxuICogQGV4YW1wbGUgPGNhcHRpb24+SW5pdGlhbGl6ZSBhbmQgUnVuIGFuaW1hdGlvbiBydW5uZXI8L2NhcHRpb24+XG4gKiB2YXIgYW5pbWF0aW9uID0gcmVxdWlyZSgndHVpLWFuaW1hdGlvbicpO1xuICogdmFyIHJ1bm5lciA9IHR1aS5hbmltYXRpb24uYW5pbSh7XG4gKiAgIGZyb206IFsxLCA1XSwgIC8vIGluaXRpYWwgeCwgeSBwb3NpdGlvblxuICogICB0bzogWzEwMCwgNTAwXSxcbiAqICAgZHVyYXRpb246IDIwMDAsXG4gKiAgIGVhc2luZzogJ2Vhc2VJbk91dCcsXG4gKiAgIC8vIG1hbmlwdWxhdGUgeCwgeSBwb3NpdGlvblxuICogICBmcmFtZTogZnVuY3Rpb24oeCwgeSkge1xuICogICAgICRib3guY3NzKHtcbiAqICAgICAgIGxlZnQ6IHggKyAncHgnLFxuICogICAgICAgdG9wOiB5ICsgJ3B4J1xuICogICAgIH0pO1xuICogICB9LFxuICogICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gKiAgICAgJGJveC5jc3Moe1xuICogICAgICAgYmFja2dyb3VuZENvbG9yOiAncmVkJ1xuICogICAgIH0pO1xuICogICB9XG4gKiB9KTtcbiAqIFxuICogLy8gUnVuIGFuaW1hdGlvblxuICogcnVubmVyLnJ1bigpO1xuICogXG4gKiAvLyBJZiBicm93c2VyIHN1cHBvcnQgUHJvbWlzZSB0aGVuIG1ldGhvZCBgcnVuKClgIGlzIHJldHVybiBpdCwgb3RoZXJ3aXNlIGl0IHJldHVybiBgbnVsbGBcbiAqIC8vIFNvIGJlbG93IGxpbmUgaGFzIGJlIHBvc3NpYmxlIHRocm93IGFuIGVycm9ycy4gdXNlIGNhcmVmdWxseVxuICogcnVubmVyLnJ1bigpLnRoZW4oZnVuY3Rpb24oKSB7Y29uc29sZS5sb2coJ2RvbmUhJyk7fSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbmltKHtcbiAgICBmcm9tID0gMCxcbiAgICB0byA9IDEwMCxcbiAgICBkdXJhdGlvbiA9IDEwMDAsXG4gICAgZWFzaW5nID0gJ2xpbmVhcicsXG4gICAgZnJhbWUgPSBub29wLFxuICAgIGNvbXBsZXRlID0gbm9vcFxufSA9IHt9KSB7XG4gICAgZnJvbSA9IGlzQXJyYXkoZnJvbSkgPyBmcm9tIDogW2Zyb21dO1xuICAgIHRvID0gaXNBcnJheSh0bykgPyB0byA6IFt0b107XG5cbiAgICBsZXQgdGltZW91dElkID0gMDtcbiAgICBjb25zdCBkaWZmcyA9IG1hcChmcm9tLCAodmFsLCBpZHgpID0+IHRvW2lkeF0gLSB2YWwpO1xuXG4gICAgZWFzaW5nID0gZWFzaW5nRnVuY3Rpb25zW2Vhc2luZ10gfHwgZWFzaW5nRnVuY3Rpb25zLmxpbmVhcjtcblxuICAgIC8qKlxuICAgICAqIEdldCBhbmltYXRpb24gcnVubmVyIG9iamVjdFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlc29sdmUgLSByZXNvbHZlIGZyb20gcHJvbWlzZVxuICAgICAqIEBwYXJhbSB7RGF0ZX0gc3RhcnQgLSB0aW1lIG9mIGFuaW1hdGlvbiBzdGFydFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBydW5uZXIocmVzb2x2ZSwgc3RhcnQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHRpY2soKSB7XG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkID0gKG5ldyBEYXRlKCkpIC0gc3RhcnQ7XG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IE1hdGgubWluKDEsIChlbGFwc2VkIC8gZHVyYXRpb24pIHx8IDApO1xuICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gbWFwKGZyb20sICh2YWwsIGlkeCkgPT4gKGRpZmZzW2lkeF0gKiBlYXNpbmcocHJvZ3Jlc3MpKSArIHZhbCk7XG5cbiAgICAgICAgICAgIGZyYW1lKC4uLnZhbHVlcyk7XG4gICAgICAgICAgICB0aW1lb3V0SWQgPSByZXF1ZXN0QW5pbUZyYW1lKHRpY2spO1xuXG4gICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPj0gMSkge1xuICAgICAgICAgICAgICAgIGNhbmNlbEFuaW1GcmFtZSh0aW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHJ1bigpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoKTtcblxuICAgICAgICAgICAgaWYgKCFpc1N1cHBvcnRQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgcnVubmVyKG5vb3AsIHN0YXJ0KSgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHJ1bm5lcihyZXNvbHZlLCBzdGFydCkoKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbCgpIHtcbiAgICAgICAgICAgIGNhbmNlbEFuaW1GcmFtZSh0aW1lb3V0SWQpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9hbmltLmpzIiwiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IEVhc2luZyBmb211bGFyc1xuICogQGF1dGhvciBOSE4gRW50LiBGRSBEZXZlbG9wbWVudCB0ZWFtIDxkbF9qYXZhc2NyaXB0QG5obmVudC5jb20+XG4gKi9cblxuY29uc3Qge2FicywgcG93fSA9IE1hdGg7XG5cbi8qKlxuICogQG1vZHVsZSAuL2Vhc2luZ1xuICogQGlnbm9yZVxuICogQGRlc2NyaXB0aW9uXG4gKiBFYXNpbmcgZm9tdWxhcnMgYXJlIGJhc2VkIG9uIEdhw6t0YW4gUmVuYXVkZWF1IGFuZCBKb2hhbiBMaW5kZWxsJ3MgZ2lzdFxuICogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vZ3JlLzE2NTAyOTRcbiAqL1xuXG4vKipcbiAqIEhpZ2ggb3JkZXIgZnVuY3Rpb24gZm9yIGVhc2UtaW5cbiAqIEBwYXJhbSB7TnVtYmVyfSBwIC0gZm9yIHVzaW5nIGBwb3cocClgIHRvIGNhbGN1bGF0ZSBhY2NlbGVyYXRlIGZhY3RvclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBfZWFzZUluKHApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gcG93KHQsIHApO1xuICAgIH07XG59XG5cbi8qKlxuICogSGlnaCBvcmRlciBmdW5jdGlvbiBmb3IgZWFzZS1vdXRcbiAqIEBwYXJhbSB7TnVtYmVyfSBwIC0gZm9yIHVzaW5nIGBwb3cocClgIHRvIGNhbGN1bGF0ZSBhY2NlbGVyYXRlIGZhY3RvclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBfZWFzZU91dChwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIDEgLSBhYnMocG93KHQgLSAxLCBwKSk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBIaWdoIG9yZGVyIGZ1bmN0aW9uIGZvciBlYXNlLWluLW91dFxuICogQHBhcmFtIHtOdW1iZXJ9IHAgLSBmb3IgdXNpbmcgYHBvdyhwKWAgdG8gY2FsY3VsYXRlIGFjY2VsZXJhdGUgZmFjdG9yXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIF9lYXNlSW5PdXQocCkge1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiB0IDwgMC41ID8gX2Vhc2VJbihwKSh0ICogMikgLyAyIDogKF9lYXNlT3V0KHApKCh0ICogMikgLSAxKSAvIDIpICsgMC41O1xuICAgIH07XG59XG5cbi8qKlxuICogbm8gZWFzaW5nLCBubyBhY2NlbGVyYXRpb25cbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgbGluZWFyID0gX2Vhc2VJbk91dCgxKTtcbi8qKlxuICogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eVxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlSW5RdWFkID0gX2Vhc2VJbigyKTtcbi8qKlxuICogZGVjZWxlcmF0aW5nIHRvIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZU91dFF1YWQgPSBfZWFzZU91dCgyKTtcbi8qKlxuICogYWNjZWxlcmF0aW9uIHVudGlsIGhhbGZ3YXksIHRoZW4gZGVjZWxlcmF0aW9uXG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJbk91dFF1YWQgPSBfZWFzZUluT3V0KDIpO1xuXG4vKipcbiAqIGFjY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluID0gZWFzZUluUXVhZDtcbi8qKlxuICogZGVjZWxlcmF0aW5nIHRvIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZU91dCA9IGVhc2VPdXRRdWFkO1xuLyoqXG4gKiBhY2NlbGVyYXRpb24gdW50aWwgaGFsZndheSwgdGhlbiBkZWNlbGVyYXRpb25cbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluT3V0ID0gZWFzZUluT3V0UXVhZDtcblxuLyoqXG4gKiBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJbkN1YmljID0gX2Vhc2VJbigzKTtcbi8qKlxuICogZGVjZWxlcmF0aW5nIHRvIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZU91dEN1YmljID0gX2Vhc2VPdXQoMyk7XG4vKipcbiAqIGFjY2VsZXJhdGlvbiB1bnRpbCBoYWxmd2F5LCB0aGVuIGRlY2VsZXJhdGlvblxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlSW5PdXRDdWJpYyA9IF9lYXNlSW5PdXQoMyk7XG5cbi8qKlxuICogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eVxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlSW5RdWFydCA9IF9lYXNlSW4oNCk7XG4vKipcbiAqIGRlY2VsZXJhdGluZyB0byB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VPdXRRdWFydCA9IF9lYXNlT3V0KDQpO1xuLyoqXG4gKiBhY2NlbGVyYXRpb24gdW50aWwgaGFsZndheSwgdGhlbiBkZWNlbGVyYXRpb25cbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluT3V0UXVhcnQgPSBfZWFzZUluT3V0KDQpO1xuXG4vKipcbiAqIGFjY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluUXVpbnQgPSBfZWFzZUluKDUpO1xuLyoqXG4gKiBkZWNlbGVyYXRpbmcgdG8gemVybyB2ZWxvY2l0eVxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlT3V0UXVpbnQgPSBfZWFzZU91dCg1KTtcbi8qKlxuICogYWNjZWxlcmF0aW9uIHVudGlsIGhhbGZ3YXksIHRoZW4gZGVjZWxlcmF0aW9uXG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJbk91dFF1aW50ID0gX2Vhc2VJbk91dCg1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9lYXNpbmcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJ0dWktY29kZS1zbmlwcGV0XCIsXCJjb21tb25qczJcIjpcInR1aS1jb2RlLXNuaXBwZXRcIixcImFtZFwiOlwidHVpLWNvZGUtc25pcHBldFwiLFwicm9vdFwiOltcInR1aVwiLFwidXRpbFwiXX1cbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==
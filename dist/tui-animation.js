/*!
 * tui-animation.js
 * @version 1.1.2
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
	        (0, _tuiCodeSnippet.sendHostname)('animation', 'UA-129987462-1');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzNDI4N2JhODE1N2RkYjY5MDA4NyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FuaW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Vhc2luZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInR1aS1jb2RlLXNuaXBwZXRcIixcImNvbW1vbmpzMlwiOlwidHVpLWNvZGUtc25pcHBldFwiLFwiYW1kXCI6XCJ0dWktY29kZS1zbmlwcGV0XCIsXCJyb290XCI6W1widHVpXCIsXCJ1dGlsXCJdfSJdLCJuYW1lcyI6WyJhbmltYXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWVzdEFuaW1GcmFtZSIsImNhbmNlbEFuaW1GcmFtZSIsImFuaW0iLCJlYXNpbmdGdW5jdGlvbnMiLCJpc1N1cHBvcnRQcm9taXNlIiwiUHJvbWlzZSIsInRlc3QiLCJ0b1N0cmluZyIsIm5vb3AiLCJnZXRQcmVmaXhlZCIsIm5hbWUiLCJ3aW5kb3ciLCJyZXF1ZXN0Rm4iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYWxsYmFjayIsInNldFRpbWVvdXQiLCJjYW5jZWxGbiIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwidGltZXJJZCIsImNsZWFyVGltZW91dCIsImZyb20iLCJ0byIsImR1cmF0aW9uIiwiZWFzaW5nIiwiZnJhbWUiLCJjb21wbGV0ZSIsInVzYWdlU3RhdGlzdGljcyIsInRpbWVvdXRJZCIsImRpZmZzIiwidmFsIiwiaWR4IiwibGluZWFyIiwicnVubmVyIiwicmVzb2x2ZSIsInN0YXJ0IiwidGljayIsImVsYXBzZWQiLCJEYXRlIiwicHJvZ3Jlc3MiLCJNYXRoIiwibWluIiwidmFsdWVzIiwicnVuIiwiY2FuY2VsIiwiYWJzIiwicG93IiwiX2Vhc2VJbiIsInAiLCJ0IiwiX2Vhc2VPdXQiLCJfZWFzZUluT3V0IiwiZWFzZUluUXVhZCIsImVhc2VPdXRRdWFkIiwiZWFzZUluT3V0UXVhZCIsImVhc2VJbiIsImVhc2VPdXQiLCJlYXNlSW5PdXQiLCJlYXNlSW5DdWJpYyIsImVhc2VPdXRDdWJpYyIsImVhc2VJbk91dEN1YmljIiwiZWFzZUluUXVhcnQiLCJlYXNlT3V0UXVhcnQiLCJlYXNlSW5PdXRRdWFydCIsImVhc2VJblF1aW50IiwiZWFzZU91dFF1aW50IiwiZWFzZUluT3V0UXVpbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3QkE7O0tBQVlBLFM7Ozs7QUFFWkMsUUFBT0MsT0FBUCxHQUFpQkYsU0FBakIsQyxDQVhBOzs7Ozs7Ozs7Ozs7Ozs7OztTQ3dEZ0JHLGdCLEdBQUFBLGdCO1NBZ0JBQyxlLEdBQUFBLGU7U0FxREFDLEksR0FBQUEsSTs7QUFsSGhCOztLQUFZQyxlOztBQUNaOzs7O3FNQVpBOzs7OztBQUtBOzs7Ozs7QUFTQSxLQUFNQyxtQkFBb0IsT0FBT0MsT0FBUCxLQUFtQixXQUFwQixJQUNwQixrQkFBa0JDLElBQWxCLENBQXVCRCxRQUFRRSxRQUFSLEVBQXZCLENBREw7O0FBR0E7QUFDQSxVQUFTQyxJQUFULEdBQWdCLENBQUU7O0FBRWxCOzs7OztBQUtBLFVBQVNDLFdBQVQsQ0FBcUJDLElBQXJCLEVBQTJCO0FBQ3ZCLFlBQU9DLGtCQUFnQkQsSUFBaEIsS0FBMkJDLGVBQWFELElBQWIsQ0FBM0IsSUFBbURDLGNB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QW5CO0FBQ1A7Ozs7OztBQU1PLEtBQU1NLG9DQUFjSCxTQUFTLENBQVQsQ0FBcEI7QUFDUDs7Ozs7O0FBTU8sS0FBTUksd0NBQWdCSCxXQUFXLENBQVgsQ0FBdEI7O0FBRVA7Ozs7OztBQU1PLEtBQU1JLDBCQUFTSCxVQUFmO0FBQ1A7Ozs7OztBQU1PLEtBQU1JLDRCQUFVSCxXQUFoQjtBQUNQOzs7Ozs7QUFNTyxLQUFNSSxnQ0FBWUgsYUFBbEI7O0FBRVA7Ozs7OztBQU1PLEtBQU1JLG9DQUFjWCxRQUFRLENBQVIsQ0FBcEI7QUFDUDs7Ozs7O0FBTU8sS0FBTVksc0NBQWVULFNBQVMsQ0FBVCxDQUFyQjtBQUNQOzs7Ozs7QUFNTyxLQUFNVSwwQ0FBaUJULFdBQVcsQ0FBWCxDQUF2Qjs7QUFFUDs7Ozs7O0FBTU8sS0FBTVUsb0NBQWNkLFFBQVEsQ0FBUixDQUFwQjtBQUNQOzs7Ozs7QUFNTyxLQUFNZSxzQ0FBZVosU0FBUyxDQUFULENBQXJCO0FBQ1A7Ozs7OztBQU1PLEtBQU1hLDBDQUFpQlosV0FBVyxDQUFYLENBQXZCOztBQUVQOzs7Ozs7QUFNTyxLQUFNYSxvQ0FBY2pCLFFBQVEsQ0FBUixDQUFwQjtBQUNQOzs7Ozs7QUFNTyxLQUFNa0Isc0NBQWVmLFNBQVMsQ0FBVCxDQUFyQjtBQUNQOzs7Ozs7QUFNTyxLQUFNZ0IsMENBQWlCZixXQUFXLENBQVgsQ0FBdkIsQzs7Ozs7O0FDbktQLGdEIiwiZmlsZSI6InR1aS1hbmltYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJ0dWktY29kZS1zbmlwcGV0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInR1aS1jb2RlLXNuaXBwZXRcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYW5pbWF0aW9uXCJdID0gZmFjdG9yeShyZXF1aXJlKFwidHVpLWNvZGUtc25pcHBldFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1widHVpXCJdID0gcm9vdFtcInR1aVwiXSB8fCB7fSwgcm9vdFtcInR1aVwiXVtcImFuaW1hdGlvblwiXSA9IGZhY3Rvcnkocm9vdFtcInR1aVwiXVtcInV0aWxcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiZGlzdFwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDM0Mjg3YmE4MTU3ZGRiNjkwMDg3IiwiLyoqXG4gKiBAbmFtZXNwYWNlIHR1aS5hbmltYXRpb25cbiAqIEBkZXNjcmlwdGlvbiBBbmltYXRpb24gbGlicmFyeVxuICogQGV4YW1wbGUgPGNhcHRpb24+R2V0IE1vZHVsZTwvY2FwdGlvbj5cbiAqIHZhciBhbmltYXRpb24gPSByZXF1aXJlKCd0dWktYW5pbWF0aW9uJyk7IC8vIGNvbW1vbmpzIHR5cGVcbiAqIHZhciBhbmltYXRpb24gPSB0dWkuYW5pbWF0aW9uOyAvLyB3aGVuIHVzaW5nIGJ1bmRsZSBmaWxlXG4gKiB2YXIgcnVubmVyID0gYW5pbWF0aW9uLmFuaW0oey4uLn0pO1xuICogfSk7XG4gKi9cbmltcG9ydCAqIGFzIGFuaW1hdGlvbiBmcm9tICcuL2FuaW0nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuaW1hdGlvbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9pbmRleC5qcyIsIi8qKlxuICogQGZpbGVvdmVydmlldyBNb2R1bGUgZm9yIGFuaW1hdGlvbnNcbiAqIEBhdXRob3IgTkhOIEVudC4gRkUgRGV2ZWxvcG1lbnQgdGVhbSA8ZGxfamF2YXNjcmlwdEBuaG5lbnQuY29tPlxuICovXG5cbi8qKlxuICogQG1vZHVsZSAuL2FuaW1cbiAqIEBpZ25vcmVcbiAqIEBkZXNjcmlwdGlvbiBDb3JlIG1vZHVsZSBmb3IgYW5pbWF0aW9uXG4gKi9cblxuaW1wb3J0ICogYXMgZWFzaW5nRnVuY3Rpb25zIGZyb20gJy4vZWFzaW5nJztcbmltcG9ydCB7aXNBcnJheSwgbWFwLCBzZW5kSG9zdG5hbWV9IGZyb20gJ3R1aS1jb2RlLXNuaXBwZXQnO1xuXG5jb25zdCBpc1N1cHBvcnRQcm9taXNlID0gKHR5cGVvZiBQcm9taXNlICE9PSAndW5kZWZpbmVkJykgJiZcbiAgICAoL1xcW25hdGl2ZSBjb2RlXFxdLy50ZXN0KFByb21pc2UudG9TdHJpbmcoKSkpO1xuXG4vKiogRG8gbm90aGluZyAqL1xuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbi8qKlxuICogR2V0IG5hbWUgd2l0aCB2ZW5kb3IgcHJlZml4XG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIG5hbWUgdG8gcHJlcGVuZCBwcmVmaXhcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHZlbmRvciBwcmVmaXhlZCBuYW1lXG4gKi9cbmZ1bmN0aW9uIGdldFByZWZpeGVkKG5hbWUpIHtcbiAgICByZXR1cm4gd2luZG93W2B3ZWJraXQke25hbWV9YF0gfHwgd2luZG93W2Btb3oke25hbWV9YF0gfHwgd2luZG93W2BtcyR7bmFtZX1gXTtcbn1cblxuY29uc3QgcmVxdWVzdEZuID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIGdldFByZWZpeGVkKCdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnKSB8fFxuICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICB9O1xuXG5jb25zdCBjYW5jZWxGbiA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgIGdldFByZWZpeGVkKCdDYW5jZWxBbmltYXRpb25GcmFtZScpIHx8XG4gICAgZ2V0UHJlZml4ZWQoJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZScpIHx8XG4gICAgZnVuY3Rpb24odGltZXJJZCkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH07XG5cbi8qKlxuICogU2hpbSBvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAqXG4gKiBVc2UgYHNldFRpbWVvdXRgIHRyaWNrIG9uIGJlbG93IEludGVybmV0IEV4cGxvcmVyIDhcbiAqIEBtZXRob2QgcmVxdWVzdEFuaW1GcmFtZVxuICogQG1lbWJlcm9mIHR1aS5hbmltYXRpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRpbWVyIGlkXG4gKiBAZXhhbXBsZVxuICogdmFyIGFuaW1hdGlvbiA9IHJlcXVpcmUoJ3R1aS1hbmltYXRpb24nKTtcbiAqIHZhciB0aW1lcklkID0gYW5pbWF0aW9uLnJlcXVlc3RBbmltRnJhbWUoZnVuY3Rpb24oKSB7XG4gKiAgICQoJ2JveCcpLmNzcyhsZWZ0LCAnMTAwcHgnKTtcbiAqIH0pO1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdEFuaW1GcmFtZShjYWxsYmFjaykge1xuICAgIHJldHVybiByZXF1ZXN0Rm4oY2FsbGJhY2spO1xufVxuXG4vKipcbiAqIFNoaW0gb2YgY2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAqIEBtZXRob2QgY2FuY2VsQW5pbUZyYW1lXG4gKiBAbWVtYmVyb2YgdHVpLmFuaW1hdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVySWQgLSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgdGltZXJJZFxuICogQGV4YW1wbGVcbiAqIHZhciBhbmltYXRpb24gPSByZXF1aXJlKCd0dWktYW5pbWF0aW9uJyk7XG4gKiB2YXIgdGltZXJJZCA9IGFuaW1hdGlvbi5yZXF1ZXN0QW5pbUZyYW1lKGZ1bmN0aW9uKCkge1xuICogICAkKCdib3gnKS5jc3MobGVmdCwgJzEwMHB4Jyk7XG4gKiB9KTtcbiAqIGFuaW1hdGlvbi5jYW5jZWxBbmltRnJhbWUodGltZXJJZCk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWxBbmltRnJhbWUodGltZXJJZCkge1xuICAgIGlmICghdGltZXJJZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2FuY2VsRm4odGltZXJJZCk7XG59XG5cbi8qKlxuICogR2V0IGFuaW1hdGlvbiBydW5uZXJcbiAqIEBtZW1iZXJvZiB0dWkuYW5pbWF0aW9uXG4gKiBAbWV0aG9kIGFuaW1cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gb3B0aW9uc1xuICogQHBhcmFtIHsoTnVtYmVyfE51bWJlcltdKX0gW29wdGlvbnMuZnJvbT0wXSAtIGJlZ2lubmluZyB2YWx1ZXNcbiAqIEBwYXJhbSB7KE51bWJlcnxOdW1iZXJbXSl9IFtvcHRpb25zLnRvPTEwMF0gLSBjaGFuZ2UgaW4gdmFsdWVzXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZHVyYXRpb249MTAwMF0gLSBkdXJhdGlvbiAobXMpXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuZWFzaW5nPSdsaW5lYXInXSAtIGVhc2luZyBmdW5jdGlvbnMge0BzZWUgZWFzaW5nfVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuZnJhbWVdIC0gaW52b2tpbmcgZWFjaCBmcmFtZXMuIHlvdSBjYW4gbWFuaXB1bGF0ZSBzcGVjaWZpYyBlbGVtZW50IGJ5IHRoaXMgZnVuY3Rpb25cbiAqICAgdGhlIGFyZ3VtZW50cyBwYXNzZWQgd2l0aCBzYW1lIHNlcXVlbmNlIHdpdGggYGZyb21gLCBgdG9gIG9wdGlvbiB2YWx1ZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmNvbXBsZXRlXSAtIGludm9rZWQgb25jZSBhdCBlbmQgb2YgYW5pbWF0aW9uXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnVzYWdlU3RhdGlzdGljcz10cnVlXSAtIExldCB1cyBrbm93IHRoZSBob3N0bmFtZS4gSWYgeW91IGRvbid0IHdhbnQgdG8gc2VuZCB0aGUgaG9zdG5hbWUsIHBsZWFzZSBzZXQgdG8gZmFsc2UuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBhbmltYXRpb24gcnVubmVyXG4gKiBAdHV0b3JpYWwgZXhhbXBsZTAxLWJhc2ljLXVzYWdlXG4gKiBAdHV0b3JpYWwgZXhhbXBsZTAyLTJELW1vdmVtZW50XG4gKiBAdHV0b3JpYWwgZXhhbXBsZTAzLXVzaW5nLXByb21pc2VcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkluaXRpYWxpemUgYW5kIFJ1biBhbmltYXRpb24gcnVubmVyPC9jYXB0aW9uPlxuICogdmFyIGFuaW1hdGlvbiA9IHJlcXVpcmUoJ3R1aS1hbmltYXRpb24nKTtcbiAqIHZhciBydW5uZXIgPSB0dWkuYW5pbWF0aW9uLmFuaW0oe1xuICogICBmcm9tOiBbMSwgNV0sICAvLyBpbml0aWFsIHgsIHkgcG9zaXRpb25cbiAqICAgdG86IFsxMDAsIDUwMF0sXG4gKiAgIGR1cmF0aW9uOiAyMDAwLFxuICogICBlYXNpbmc6ICdlYXNlSW5PdXQnLFxuICogICAvLyBtYW5pcHVsYXRlIHgsIHkgcG9zaXRpb25cbiAqICAgZnJhbWU6IGZ1bmN0aW9uKHgsIHkpIHtcbiAqICAgICAkYm94LmNzcyh7XG4gKiAgICAgICBsZWZ0OiB4ICsgJ3B4JyxcbiAqICAgICAgIHRvcDogeSArICdweCdcbiAqICAgICB9KTtcbiAqICAgfSxcbiAqICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICogICAgICRib3guY3NzKHtcbiAqICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JlZCdcbiAqICAgICB9KTtcbiAqICAgfVxuICogfSk7XG4gKlxuICogLy8gUnVuIGFuaW1hdGlvblxuICogcnVubmVyLnJ1bigpO1xuICpcbiAqIC8vIElmIGJyb3dzZXIgc3VwcG9ydCBQcm9taXNlIHRoZW4gbWV0aG9kIGBydW4oKWAgaXMgcmV0dXJuIGl0LCBvdGhlcndpc2UgaXQgcmV0dXJuIGBudWxsYFxuICogLy8gU28gYmVsb3cgbGluZSBoYXMgYmUgcG9zc2libGUgdGhyb3cgYW4gZXJyb3JzLiB1c2UgY2FyZWZ1bGx5XG4gKiBydW5uZXIucnVuKCkudGhlbihmdW5jdGlvbigpIHtjb25zb2xlLmxvZygnZG9uZSEnKTt9KTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFuaW0oe1xuICAgIGZyb20gPSAwLFxuICAgIHRvID0gMTAwLFxuICAgIGR1cmF0aW9uID0gMTAwMCxcbiAgICBlYXNpbmcgPSAnbGluZWFyJyxcbiAgICBmcmFtZSA9IG5vb3AsXG4gICAgY29tcGxldGUgPSBub29wLFxuICAgIHVzYWdlU3RhdGlzdGljcyA9IHRydWVcbn0gPSB7fSkge1xuICAgIGZyb20gPSBpc0FycmF5KGZyb20pID8gZnJvbSA6IFtmcm9tXTtcbiAgICB0byA9IGlzQXJyYXkodG8pID8gdG8gOiBbdG9dO1xuXG4gICAgbGV0IHRpbWVvdXRJZCA9IDA7XG4gICAgY29uc3QgZGlmZnMgPSBtYXAoZnJvbSwgKHZhbCwgaWR4KSA9PiB0b1tpZHhdIC0gdmFsKTtcblxuICAgIGVhc2luZyA9IGVhc2luZ0Z1bmN0aW9uc1tlYXNpbmddIHx8IGVhc2luZ0Z1bmN0aW9ucy5saW5lYXI7XG5cbiAgICBpZiAodXNhZ2VTdGF0aXN0aWNzKSB7XG4gICAgICAgIHNlbmRIb3N0bmFtZSgnYW5pbWF0aW9uJywgJ1VBLTEyOTk4NzQ2Mi0xJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFuaW1hdGlvbiBydW5uZXIgb2JqZWN0XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcmVzb2x2ZSAtIHJlc29sdmUgZnJvbSBwcm9taXNlXG4gICAgICogQHBhcmFtIHtEYXRlfSBzdGFydCAtIHRpbWUgb2YgYW5pbWF0aW9uIHN0YXJ0XG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJ1bm5lcihyZXNvbHZlLCBzdGFydCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gdGljaygpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsYXBzZWQgPSAobmV3IERhdGUoKSkgLSBzdGFydDtcbiAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzID0gTWF0aC5taW4oMSwgKGVsYXBzZWQgLyBkdXJhdGlvbikgfHwgMCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBtYXAoZnJvbSwgKHZhbCwgaWR4KSA9PiAoZGlmZnNbaWR4XSAqIGVhc2luZyhwcm9ncmVzcykpICsgdmFsKTtcblxuICAgICAgICAgICAgZnJhbWUoLi4udmFsdWVzKTtcbiAgICAgICAgICAgIHRpbWVvdXRJZCA9IHJlcXVlc3RBbmltRnJhbWUodGljayk7XG5cbiAgICAgICAgICAgIGlmIChwcm9ncmVzcyA+PSAxKSB7XG4gICAgICAgICAgICAgICAgY2FuY2VsQW5pbUZyYW1lKHRpbWVvdXRJZCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcnVuKCkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgICAgICBpZiAoIWlzU3VwcG9ydFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBydW5uZXIobm9vcCwgc3RhcnQpKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gcnVubmVyKHJlc29sdmUsIHN0YXJ0KSgpKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsKCkge1xuICAgICAgICAgICAgY2FuY2VsQW5pbUZyYW1lKHRpbWVvdXRJZCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2FuaW0uanMiLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgRWFzaW5nIGZvbXVsYXJzXG4gKiBAYXV0aG9yIE5ITiBFbnQuIEZFIERldmVsb3BtZW50IHRlYW0gPGRsX2phdmFzY3JpcHRAbmhuZW50LmNvbT5cbiAqL1xuXG5jb25zdCB7YWJzLCBwb3d9ID0gTWF0aDtcblxuLyoqXG4gKiBAbW9kdWxlIC4vZWFzaW5nXG4gKiBAaWdub3JlXG4gKiBAZGVzY3JpcHRpb25cbiAqIEVhc2luZyBmb211bGFycyBhcmUgYmFzZWQgb24gR2HDq3RhbiBSZW5hdWRlYXUgYW5kIEpvaGFuIExpbmRlbGwncyBnaXN0XG4gKiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9ncmUvMTY1MDI5NFxuICovXG5cbi8qKlxuICogSGlnaCBvcmRlciBmdW5jdGlvbiBmb3IgZWFzZS1pblxuICogQHBhcmFtIHtOdW1iZXJ9IHAgLSBmb3IgdXNpbmcgYHBvdyhwKWAgdG8gY2FsY3VsYXRlIGFjY2VsZXJhdGUgZmFjdG9yXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIF9lYXNlSW4ocCkge1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiBwb3codCwgcCk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBIaWdoIG9yZGVyIGZ1bmN0aW9uIGZvciBlYXNlLW91dFxuICogQHBhcmFtIHtOdW1iZXJ9IHAgLSBmb3IgdXNpbmcgYHBvdyhwKWAgdG8gY2FsY3VsYXRlIGFjY2VsZXJhdGUgZmFjdG9yXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIF9lYXNlT3V0KHApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gMSAtIGFicyhwb3codCAtIDEsIHApKTtcbiAgICB9O1xufVxuXG4vKipcbiAqIEhpZ2ggb3JkZXIgZnVuY3Rpb24gZm9yIGVhc2UtaW4tb3V0XG4gKiBAcGFyYW0ge051bWJlcn0gcCAtIGZvciB1c2luZyBgcG93KHApYCB0byBjYWxjdWxhdGUgYWNjZWxlcmF0ZSBmYWN0b3JcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gX2Vhc2VJbk91dChwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgPCAwLjUgPyBfZWFzZUluKHApKHQgKiAyKSAvIDIgOiAoX2Vhc2VPdXQocCkoKHQgKiAyKSAtIDEpIC8gMikgKyAwLjU7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBubyBlYXNpbmcsIG5vIGFjY2VsZXJhdGlvblxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBsaW5lYXIgPSBfZWFzZUluT3V0KDEpO1xuLyoqXG4gKiBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJblF1YWQgPSBfZWFzZUluKDIpO1xuLyoqXG4gKiBkZWNlbGVyYXRpbmcgdG8gemVybyB2ZWxvY2l0eVxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlT3V0UXVhZCA9IF9lYXNlT3V0KDIpO1xuLyoqXG4gKiBhY2NlbGVyYXRpb24gdW50aWwgaGFsZndheSwgdGhlbiBkZWNlbGVyYXRpb25cbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluT3V0UXVhZCA9IF9lYXNlSW5PdXQoMik7XG5cbi8qKlxuICogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eVxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlSW4gPSBlYXNlSW5RdWFkO1xuLyoqXG4gKiBkZWNlbGVyYXRpbmcgdG8gemVybyB2ZWxvY2l0eVxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlT3V0ID0gZWFzZU91dFF1YWQ7XG4vKipcbiAqIGFjY2VsZXJhdGlvbiB1bnRpbCBoYWxmd2F5LCB0aGVuIGRlY2VsZXJhdGlvblxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlSW5PdXQgPSBlYXNlSW5PdXRRdWFkO1xuXG4vKipcbiAqIGFjY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluQ3ViaWMgPSBfZWFzZUluKDMpO1xuLyoqXG4gKiBkZWNlbGVyYXRpbmcgdG8gemVybyB2ZWxvY2l0eVxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlT3V0Q3ViaWMgPSBfZWFzZU91dCgzKTtcbi8qKlxuICogYWNjZWxlcmF0aW9uIHVudGlsIGhhbGZ3YXksIHRoZW4gZGVjZWxlcmF0aW9uXG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJbk91dEN1YmljID0gX2Vhc2VJbk91dCgzKTtcblxuLyoqXG4gKiBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJblF1YXJ0ID0gX2Vhc2VJbig0KTtcbi8qKlxuICogZGVjZWxlcmF0aW5nIHRvIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZU91dFF1YXJ0ID0gX2Vhc2VPdXQoNCk7XG4vKipcbiAqIGFjY2VsZXJhdGlvbiB1bnRpbCBoYWxmd2F5LCB0aGVuIGRlY2VsZXJhdGlvblxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlSW5PdXRRdWFydCA9IF9lYXNlSW5PdXQoNCk7XG5cbi8qKlxuICogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eVxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlSW5RdWludCA9IF9lYXNlSW4oNSk7XG4vKipcbiAqIGRlY2VsZXJhdGluZyB0byB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VPdXRRdWludCA9IF9lYXNlT3V0KDUpO1xuLyoqXG4gKiBhY2NlbGVyYXRpb24gdW50aWwgaGFsZndheSwgdGhlbiBkZWNlbGVyYXRpb25cbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluT3V0UXVpbnQgPSBfZWFzZUluT3V0KDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2Vhc2luZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInR1aS1jb2RlLXNuaXBwZXRcIixcImNvbW1vbmpzMlwiOlwidHVpLWNvZGUtc25pcHBldFwiLFwiYW1kXCI6XCJ0dWktY29kZS1zbmlwcGV0XCIsXCJyb290XCI6W1widHVpXCIsXCJ1dGlsXCJdfVxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9
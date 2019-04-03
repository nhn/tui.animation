/*!
 * tui-animation.js
 * @version 1.1.3
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
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
	                                                                                                                                                                                                     * @author NHN. FE Development Lab <dl_javascript@nhn.com>
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
	 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1NzY3MDNjOWU4NmM0ZTllNGUyNyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FuaW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Vhc2luZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInR1aS1jb2RlLXNuaXBwZXRcIixcImNvbW1vbmpzMlwiOlwidHVpLWNvZGUtc25pcHBldFwiLFwiYW1kXCI6XCJ0dWktY29kZS1zbmlwcGV0XCIsXCJyb290XCI6W1widHVpXCIsXCJ1dGlsXCJdfSJdLCJuYW1lcyI6WyJhbmltYXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWVzdEFuaW1GcmFtZSIsImNhbmNlbEFuaW1GcmFtZSIsImFuaW0iLCJlYXNpbmdGdW5jdGlvbnMiLCJpc1N1cHBvcnRQcm9taXNlIiwiUHJvbWlzZSIsInRlc3QiLCJ0b1N0cmluZyIsIm5vb3AiLCJnZXRQcmVmaXhlZCIsIm5hbWUiLCJ3aW5kb3ciLCJyZXF1ZXN0Rm4iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYWxsYmFjayIsInNldFRpbWVvdXQiLCJjYW5jZWxGbiIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwidGltZXJJZCIsImNsZWFyVGltZW91dCIsImZyb20iLCJ0byIsImR1cmF0aW9uIiwiZWFzaW5nIiwiZnJhbWUiLCJjb21wbGV0ZSIsInVzYWdlU3RhdGlzdGljcyIsInRpbWVvdXRJZCIsImRpZmZzIiwidmFsIiwiaWR4IiwibGluZWFyIiwicnVubmVyIiwicmVzb2x2ZSIsInN0YXJ0IiwidGljayIsImVsYXBzZWQiLCJEYXRlIiwicHJvZ3Jlc3MiLCJNYXRoIiwibWluIiwidmFsdWVzIiwicnVuIiwiY2FuY2VsIiwiYWJzIiwicG93IiwiX2Vhc2VJbiIsInAiLCJ0IiwiX2Vhc2VPdXQiLCJfZWFzZUluT3V0IiwiZWFzZUluUXVhZCIsImVhc2VPdXRRdWFkIiwiZWFzZUluT3V0UXVhZCIsImVhc2VJbiIsImVhc2VPdXQiLCJlYXNlSW5PdXQiLCJlYXNlSW5DdWJpYyIsImVhc2VPdXRDdWJpYyIsImVhc2VJbk91dEN1YmljIiwiZWFzZUluUXVhcnQiLCJlYXNlT3V0UXVhcnQiLCJlYXNlSW5PdXRRdWFydCIsImVhc2VJblF1aW50IiwiZWFzZU91dFF1aW50IiwiZWFzZUluT3V0UXVpbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3QkE7O0tBQVlBLFM7Ozs7QUFFWkMsUUFBT0MsT0FBUCxHQUFpQkYsU0FBakIsQyxDQVhBOzs7Ozs7Ozs7Ozs7Ozs7OztTQ3dEZ0JHLGdCLEdBQUFBLGdCO1NBZ0JBQyxlLEdBQUFBLGU7U0FxREFDLEksR0FBQUEsSTs7QUFsSGhCOztLQUFZQyxlOztBQUNaOzs7O3FNQVpBOzs7OztBQUtBOzs7Ozs7QUFTQSxLQUFNQyxtQkFBb0IsT0FBT0MsT0FBUCxLQUFtQixXQUFwQixJQUNwQixrQkFBa0JDLElBQWxCLENBQXVCRCxRQUFRRSxRQUFSLEVBQXZCLENBREw7O0FBR0E7QUFDQSxVQUFTQyxJQUFULEdBQWdCLENBQUU7O0FBRWxCOzs7OztBQUtBLFVBQVNDLFdBQVQsQ0FBcUJDLElBQXJCLEVBQTJCO0FBQ3ZCLFlBQU9DLGtCQUFnQkQsSUFBaEIsS0FBMkJDLGVBQWFELElBQWIsQ0FBM0IsSUFBbURDLGNB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QW5CO0FBQ1A7Ozs7OztBQU1PLEtBQU1NLG9DQUFjSCxTQUFTLENBQVQsQ0FBcEI7QUFDUDs7Ozs7O0FBTU8sS0FBTUksd0NBQWdCSCxXQUFXLENBQVgsQ0FBdEI7O0FBRVA7Ozs7OztBQU1PLEtBQU1JLDBCQUFTSCxVQUFmO0FBQ1A7Ozs7OztBQU1PLEtBQU1JLDRCQUFVSCxXQUFoQjtBQUNQOzs7Ozs7QUFNTyxLQUFNSSxnQ0FBWUgsYUFBbEI7O0FBRVA7Ozs7OztBQU1PLEtBQU1JLG9DQUFjWCxRQUFRLENBQVIsQ0FBcEI7QUFDUDs7Ozs7O0FBTU8sS0FBTVksc0NBQWVULFNBQVMsQ0FBVCxDQUFyQjtBQUNQOzs7Ozs7QUFNTyxLQUFNVSwwQ0FBaUJULFdBQVcsQ0FBWCxDQUF2Qjs7QUFFUDs7Ozs7O0FBTU8sS0FBTVUsb0NBQWNkLFFBQVEsQ0FBUixDQUFwQjtBQUNQOzs7Ozs7QUFNTyxLQUFNZSxzQ0FBZVosU0FBUyxDQUFULENBQXJCO0FBQ1A7Ozs7OztBQU1PLEtBQU1hLDBDQUFpQlosV0FBVyxDQUFYLENBQXZCOztBQUVQOzs7Ozs7QUFNTyxLQUFNYSxvQ0FBY2pCLFFBQVEsQ0FBUixDQUFwQjtBQUNQOzs7Ozs7QUFNTyxLQUFNa0Isc0NBQWVmLFNBQVMsQ0FBVCxDQUFyQjtBQUNQOzs7Ozs7QUFNTyxLQUFNZ0IsMENBQWlCZixXQUFXLENBQVgsQ0FBdkIsQzs7Ozs7O0FDbktQLGdEIiwiZmlsZSI6InR1aS1hbmltYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJ0dWktY29kZS1zbmlwcGV0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInR1aS1jb2RlLXNuaXBwZXRcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYW5pbWF0aW9uXCJdID0gZmFjdG9yeShyZXF1aXJlKFwidHVpLWNvZGUtc25pcHBldFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1widHVpXCJdID0gcm9vdFtcInR1aVwiXSB8fCB7fSwgcm9vdFtcInR1aVwiXVtcImFuaW1hdGlvblwiXSA9IGZhY3Rvcnkocm9vdFtcInR1aVwiXVtcInV0aWxcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiZGlzdFwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU3NjcwM2M5ZTg2YzRlOWU0ZTI3IiwiLyoqXG4gKiBAbmFtZXNwYWNlIHR1aS5hbmltYXRpb25cbiAqIEBkZXNjcmlwdGlvbiBBbmltYXRpb24gbGlicmFyeVxuICogQGV4YW1wbGUgPGNhcHRpb24+R2V0IE1vZHVsZTwvY2FwdGlvbj5cbiAqIHZhciBhbmltYXRpb24gPSByZXF1aXJlKCd0dWktYW5pbWF0aW9uJyk7IC8vIGNvbW1vbmpzIHR5cGVcbiAqIHZhciBhbmltYXRpb24gPSB0dWkuYW5pbWF0aW9uOyAvLyB3aGVuIHVzaW5nIGJ1bmRsZSBmaWxlXG4gKiB2YXIgcnVubmVyID0gYW5pbWF0aW9uLmFuaW0oey4uLn0pO1xuICogfSk7XG4gKi9cbmltcG9ydCAqIGFzIGFuaW1hdGlvbiBmcm9tICcuL2FuaW0nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuaW1hdGlvbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9pbmRleC5qcyIsIi8qKlxuICogQGZpbGVvdmVydmlldyBNb2R1bGUgZm9yIGFuaW1hdGlvbnNcbiAqIEBhdXRob3IgTkhOLiBGRSBEZXZlbG9wbWVudCBMYWIgPGRsX2phdmFzY3JpcHRAbmhuLmNvbT5cbiAqL1xuXG4vKipcbiAqIEBtb2R1bGUgLi9hbmltXG4gKiBAaWdub3JlXG4gKiBAZGVzY3JpcHRpb24gQ29yZSBtb2R1bGUgZm9yIGFuaW1hdGlvblxuICovXG5cbmltcG9ydCAqIGFzIGVhc2luZ0Z1bmN0aW9ucyBmcm9tICcuL2Vhc2luZyc7XG5pbXBvcnQge2lzQXJyYXksIG1hcCwgc2VuZEhvc3RuYW1lfSBmcm9tICd0dWktY29kZS1zbmlwcGV0JztcblxuY29uc3QgaXNTdXBwb3J0UHJvbWlzZSA9ICh0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcpICYmXG4gICAgKC9cXFtuYXRpdmUgY29kZVxcXS8udGVzdChQcm9taXNlLnRvU3RyaW5nKCkpKTtcblxuLyoqIERvIG5vdGhpbmcgKi9cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4vKipcbiAqIEdldCBuYW1lIHdpdGggdmVuZG9yIHByZWZpeFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBuYW1lIHRvIHByZXBlbmQgcHJlZml4XG4gKiBAcmV0dXJucyB7U3RyaW5nfSB2ZW5kb3IgcHJlZml4ZWQgbmFtZVxuICovXG5mdW5jdGlvbiBnZXRQcmVmaXhlZChuYW1lKSB7XG4gICAgcmV0dXJuIHdpbmRvd1tgd2Via2l0JHtuYW1lfWBdIHx8IHdpbmRvd1tgbW96JHtuYW1lfWBdIHx8IHdpbmRvd1tgbXMke25hbWV9YF07XG59XG5cbmNvbnN0IHJlcXVlc3RGbiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICBnZXRQcmVmaXhlZCgnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJykgfHxcbiAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgfTtcblxuY29uc3QgY2FuY2VsRm4gPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICBnZXRQcmVmaXhlZCgnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnKSB8fFxuICAgIGdldFByZWZpeGVkKCdDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnKSB8fFxuICAgIGZ1bmN0aW9uKHRpbWVySWQpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9O1xuXG4vKipcbiAqIFNoaW0gb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gKlxuICogVXNlIGBzZXRUaW1lb3V0YCB0cmljayBvbiBiZWxvdyBJbnRlcm5ldCBFeHBsb3JlciA4XG4gKiBAbWV0aG9kIHJlcXVlc3RBbmltRnJhbWVcbiAqIEBtZW1iZXJvZiB0dWkuYW5pbWF0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aW1lciBpZFxuICogQGV4YW1wbGVcbiAqIHZhciBhbmltYXRpb24gPSByZXF1aXJlKCd0dWktYW5pbWF0aW9uJyk7XG4gKiB2YXIgdGltZXJJZCA9IGFuaW1hdGlvbi5yZXF1ZXN0QW5pbUZyYW1lKGZ1bmN0aW9uKCkge1xuICogICAkKCdib3gnKS5jc3MobGVmdCwgJzEwMHB4Jyk7XG4gKiB9KTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3RBbmltRnJhbWUoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gcmVxdWVzdEZuKGNhbGxiYWNrKTtcbn1cblxuLyoqXG4gKiBTaGltIG9mIGNhbmNlbEFuaW1hdGlvbkZyYW1lXG4gKiBAbWV0aG9kIGNhbmNlbEFuaW1GcmFtZVxuICogQG1lbWJlcm9mIHR1aS5hbmltYXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lcklkIC0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHRpbWVySWRcbiAqIEBleGFtcGxlXG4gKiB2YXIgYW5pbWF0aW9uID0gcmVxdWlyZSgndHVpLWFuaW1hdGlvbicpO1xuICogdmFyIHRpbWVySWQgPSBhbmltYXRpb24ucmVxdWVzdEFuaW1GcmFtZShmdW5jdGlvbigpIHtcbiAqICAgJCgnYm94JykuY3NzKGxlZnQsICcxMDBweCcpO1xuICogfSk7XG4gKiBhbmltYXRpb24uY2FuY2VsQW5pbUZyYW1lKHRpbWVySWQpO1xuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuY2VsQW5pbUZyYW1lKHRpbWVySWQpIHtcbiAgICBpZiAoIXRpbWVySWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNhbmNlbEZuKHRpbWVySWQpO1xufVxuXG4vKipcbiAqIEdldCBhbmltYXRpb24gcnVubmVyXG4gKiBAbWVtYmVyb2YgdHVpLmFuaW1hdGlvblxuICogQG1ldGhvZCBhbmltXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnNcbiAqIEBwYXJhbSB7KE51bWJlcnxOdW1iZXJbXSl9IFtvcHRpb25zLmZyb209MF0gLSBiZWdpbm5pbmcgdmFsdWVzXG4gKiBAcGFyYW0geyhOdW1iZXJ8TnVtYmVyW10pfSBbb3B0aW9ucy50bz0xMDBdIC0gY2hhbmdlIGluIHZhbHVlc1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uPTEwMDBdIC0gZHVyYXRpb24gKG1zKVxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmVhc2luZz0nbGluZWFyJ10gLSBlYXNpbmcgZnVuY3Rpb25zIHtAc2VlIGVhc2luZ31cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmZyYW1lXSAtIGludm9raW5nIGVhY2ggZnJhbWVzLiB5b3UgY2FuIG1hbmlwdWxhdGUgc3BlY2lmaWMgZWxlbWVudCBieSB0aGlzIGZ1bmN0aW9uXG4gKiAgIHRoZSBhcmd1bWVudHMgcGFzc2VkIHdpdGggc2FtZSBzZXF1ZW5jZSB3aXRoIGBmcm9tYCwgYHRvYCBvcHRpb24gdmFsdWVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5jb21wbGV0ZV0gLSBpbnZva2VkIG9uY2UgYXQgZW5kIG9mIGFuaW1hdGlvblxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy51c2FnZVN0YXRpc3RpY3M9dHJ1ZV0gLSBMZXQgdXMga25vdyB0aGUgaG9zdG5hbWUuIElmIHlvdSBkb24ndCB3YW50IHRvIHNlbmQgdGhlIGhvc3RuYW1lLCBwbGVhc2Ugc2V0IHRvIGZhbHNlLlxuICogQHJldHVybnMge09iamVjdH0gYW5pbWF0aW9uIHJ1bm5lclxuICogQHR1dG9yaWFsIGV4YW1wbGUwMS1iYXNpYy11c2FnZVxuICogQHR1dG9yaWFsIGV4YW1wbGUwMi0yRC1tb3ZlbWVudFxuICogQHR1dG9yaWFsIGV4YW1wbGUwMy11c2luZy1wcm9taXNlXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Jbml0aWFsaXplIGFuZCBSdW4gYW5pbWF0aW9uIHJ1bm5lcjwvY2FwdGlvbj5cbiAqIHZhciBhbmltYXRpb24gPSByZXF1aXJlKCd0dWktYW5pbWF0aW9uJyk7XG4gKiB2YXIgcnVubmVyID0gdHVpLmFuaW1hdGlvbi5hbmltKHtcbiAqICAgZnJvbTogWzEsIDVdLCAgLy8gaW5pdGlhbCB4LCB5IHBvc2l0aW9uXG4gKiAgIHRvOiBbMTAwLCA1MDBdLFxuICogICBkdXJhdGlvbjogMjAwMCxcbiAqICAgZWFzaW5nOiAnZWFzZUluT3V0JyxcbiAqICAgLy8gbWFuaXB1bGF0ZSB4LCB5IHBvc2l0aW9uXG4gKiAgIGZyYW1lOiBmdW5jdGlvbih4LCB5KSB7XG4gKiAgICAgJGJveC5jc3Moe1xuICogICAgICAgbGVmdDogeCArICdweCcsXG4gKiAgICAgICB0b3A6IHkgKyAncHgnXG4gKiAgICAgfSk7XG4gKiAgIH0sXG4gKiAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAqICAgICAkYm94LmNzcyh7XG4gKiAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZWQnXG4gKiAgICAgfSk7XG4gKiAgIH1cbiAqIH0pO1xuICpcbiAqIC8vIFJ1biBhbmltYXRpb25cbiAqIHJ1bm5lci5ydW4oKTtcbiAqXG4gKiAvLyBJZiBicm93c2VyIHN1cHBvcnQgUHJvbWlzZSB0aGVuIG1ldGhvZCBgcnVuKClgIGlzIHJldHVybiBpdCwgb3RoZXJ3aXNlIGl0IHJldHVybiBgbnVsbGBcbiAqIC8vIFNvIGJlbG93IGxpbmUgaGFzIGJlIHBvc3NpYmxlIHRocm93IGFuIGVycm9ycy4gdXNlIGNhcmVmdWxseVxuICogcnVubmVyLnJ1bigpLnRoZW4oZnVuY3Rpb24oKSB7Y29uc29sZS5sb2coJ2RvbmUhJyk7fSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbmltKHtcbiAgICBmcm9tID0gMCxcbiAgICB0byA9IDEwMCxcbiAgICBkdXJhdGlvbiA9IDEwMDAsXG4gICAgZWFzaW5nID0gJ2xpbmVhcicsXG4gICAgZnJhbWUgPSBub29wLFxuICAgIGNvbXBsZXRlID0gbm9vcCxcbiAgICB1c2FnZVN0YXRpc3RpY3MgPSB0cnVlXG59ID0ge30pIHtcbiAgICBmcm9tID0gaXNBcnJheShmcm9tKSA/IGZyb20gOiBbZnJvbV07XG4gICAgdG8gPSBpc0FycmF5KHRvKSA/IHRvIDogW3RvXTtcblxuICAgIGxldCB0aW1lb3V0SWQgPSAwO1xuICAgIGNvbnN0IGRpZmZzID0gbWFwKGZyb20sICh2YWwsIGlkeCkgPT4gdG9baWR4XSAtIHZhbCk7XG5cbiAgICBlYXNpbmcgPSBlYXNpbmdGdW5jdGlvbnNbZWFzaW5nXSB8fCBlYXNpbmdGdW5jdGlvbnMubGluZWFyO1xuXG4gICAgaWYgKHVzYWdlU3RhdGlzdGljcykge1xuICAgICAgICBzZW5kSG9zdG5hbWUoJ2FuaW1hdGlvbicsICdVQS0xMjk5ODc0NjItMScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbmltYXRpb24gcnVubmVyIG9iamVjdFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlc29sdmUgLSByZXNvbHZlIGZyb20gcHJvbWlzZVxuICAgICAqIEBwYXJhbSB7RGF0ZX0gc3RhcnQgLSB0aW1lIG9mIGFuaW1hdGlvbiBzdGFydFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBydW5uZXIocmVzb2x2ZSwgc3RhcnQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHRpY2soKSB7XG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkID0gKG5ldyBEYXRlKCkpIC0gc3RhcnQ7XG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IE1hdGgubWluKDEsIChlbGFwc2VkIC8gZHVyYXRpb24pIHx8IDApO1xuICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gbWFwKGZyb20sICh2YWwsIGlkeCkgPT4gKGRpZmZzW2lkeF0gKiBlYXNpbmcocHJvZ3Jlc3MpKSArIHZhbCk7XG5cbiAgICAgICAgICAgIGZyYW1lKC4uLnZhbHVlcyk7XG4gICAgICAgICAgICB0aW1lb3V0SWQgPSByZXF1ZXN0QW5pbUZyYW1lKHRpY2spO1xuXG4gICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPj0gMSkge1xuICAgICAgICAgICAgICAgIGNhbmNlbEFuaW1GcmFtZSh0aW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHJ1bigpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoKTtcblxuICAgICAgICAgICAgaWYgKCFpc1N1cHBvcnRQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgcnVubmVyKG5vb3AsIHN0YXJ0KSgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHJ1bm5lcihyZXNvbHZlLCBzdGFydCkoKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbCgpIHtcbiAgICAgICAgICAgIGNhbmNlbEFuaW1GcmFtZSh0aW1lb3V0SWQpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9hbmltLmpzIiwiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IEVhc2luZyBmb211bGFyc1xuICogQGF1dGhvciBOSE4uIEZFIERldmVsb3BtZW50IExhYiA8ZGxfamF2YXNjcmlwdEBuaG4uY29tPlxuICovXG5cbmNvbnN0IHthYnMsIHBvd30gPSBNYXRoO1xuXG4vKipcbiAqIEBtb2R1bGUgLi9lYXNpbmdcbiAqIEBpZ25vcmVcbiAqIEBkZXNjcmlwdGlvblxuICogRWFzaW5nIGZvbXVsYXJzIGFyZSBiYXNlZCBvbiBHYcOrdGFuIFJlbmF1ZGVhdSBhbmQgSm9oYW4gTGluZGVsbCdzIGdpc3RcbiAqIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2dyZS8xNjUwMjk0XG4gKi9cblxuLyoqXG4gKiBIaWdoIG9yZGVyIGZ1bmN0aW9uIGZvciBlYXNlLWluXG4gKiBAcGFyYW0ge051bWJlcn0gcCAtIGZvciB1c2luZyBgcG93KHApYCB0byBjYWxjdWxhdGUgYWNjZWxlcmF0ZSBmYWN0b3JcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gX2Vhc2VJbihwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHBvdyh0LCBwKTtcbiAgICB9O1xufVxuXG4vKipcbiAqIEhpZ2ggb3JkZXIgZnVuY3Rpb24gZm9yIGVhc2Utb3V0XG4gKiBAcGFyYW0ge051bWJlcn0gcCAtIGZvciB1c2luZyBgcG93KHApYCB0byBjYWxjdWxhdGUgYWNjZWxlcmF0ZSBmYWN0b3JcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gX2Vhc2VPdXQocCkge1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiAxIC0gYWJzKHBvdyh0IC0gMSwgcCkpO1xuICAgIH07XG59XG5cbi8qKlxuICogSGlnaCBvcmRlciBmdW5jdGlvbiBmb3IgZWFzZS1pbi1vdXRcbiAqIEBwYXJhbSB7TnVtYmVyfSBwIC0gZm9yIHVzaW5nIGBwb3cocClgIHRvIGNhbGN1bGF0ZSBhY2NlbGVyYXRlIGZhY3RvclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBfZWFzZUluT3V0KHApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdCA8IDAuNSA/IF9lYXNlSW4ocCkodCAqIDIpIC8gMiA6IChfZWFzZU91dChwKSgodCAqIDIpIC0gMSkgLyAyKSArIDAuNTtcbiAgICB9O1xufVxuXG4vKipcbiAqIG5vIGVhc2luZywgbm8gYWNjZWxlcmF0aW9uXG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGxpbmVhciA9IF9lYXNlSW5PdXQoMSk7XG4vKipcbiAqIGFjY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluUXVhZCA9IF9lYXNlSW4oMik7XG4vKipcbiAqIGRlY2VsZXJhdGluZyB0byB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VPdXRRdWFkID0gX2Vhc2VPdXQoMik7XG4vKipcbiAqIGFjY2VsZXJhdGlvbiB1bnRpbCBoYWxmd2F5LCB0aGVuIGRlY2VsZXJhdGlvblxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlSW5PdXRRdWFkID0gX2Vhc2VJbk91dCgyKTtcblxuLyoqXG4gKiBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJbiA9IGVhc2VJblF1YWQ7XG4vKipcbiAqIGRlY2VsZXJhdGluZyB0byB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VPdXQgPSBlYXNlT3V0UXVhZDtcbi8qKlxuICogYWNjZWxlcmF0aW9uIHVudGlsIGhhbGZ3YXksIHRoZW4gZGVjZWxlcmF0aW9uXG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJbk91dCA9IGVhc2VJbk91dFF1YWQ7XG5cbi8qKlxuICogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eVxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlSW5DdWJpYyA9IF9lYXNlSW4oMyk7XG4vKipcbiAqIGRlY2VsZXJhdGluZyB0byB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VPdXRDdWJpYyA9IF9lYXNlT3V0KDMpO1xuLyoqXG4gKiBhY2NlbGVyYXRpb24gdW50aWwgaGFsZndheSwgdGhlbiBkZWNlbGVyYXRpb25cbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluT3V0Q3ViaWMgPSBfZWFzZUluT3V0KDMpO1xuXG4vKipcbiAqIGFjY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZUluUXVhcnQgPSBfZWFzZUluKDQpO1xuLyoqXG4gKiBkZWNlbGVyYXRpbmcgdG8gemVybyB2ZWxvY2l0eVxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlT3V0UXVhcnQgPSBfZWFzZU91dCg0KTtcbi8qKlxuICogYWNjZWxlcmF0aW9uIHVudGlsIGhhbGZ3YXksIHRoZW4gZGVjZWxlcmF0aW9uXG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJbk91dFF1YXJ0ID0gX2Vhc2VJbk91dCg0KTtcblxuLyoqXG4gKiBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5XG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHByb2dyZXNzIHZhbHVlIGJldHdlZW4gMCB+IDFcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGNhbGN1bGF0ZWQgZGVsdGEgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGVhc2VJblF1aW50ID0gX2Vhc2VJbig1KTtcbi8qKlxuICogZGVjZWxlcmF0aW5nIHRvIHplcm8gdmVsb2NpdHlcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gcHJvZ3Jlc3MgdmFsdWUgYmV0d2VlbiAwIH4gMVxuICogQHJldHVybnMge051bWJlcn0gY2FsY3VsYXRlZCBkZWx0YSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZWFzZU91dFF1aW50ID0gX2Vhc2VPdXQoNSk7XG4vKipcbiAqIGFjY2VsZXJhdGlvbiB1bnRpbCBoYWxmd2F5LCB0aGVuIGRlY2VsZXJhdGlvblxuICogQG1ldGhvZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSBwcm9ncmVzcyB2YWx1ZSBiZXR3ZWVuIDAgfiAxXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBjYWxjdWxhdGVkIGRlbHRhIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBlYXNlSW5PdXRRdWludCA9IF9lYXNlSW5PdXQoNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZWFzaW5nLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwidHVpLWNvZGUtc25pcHBldFwiLFwiY29tbW9uanMyXCI6XCJ0dWktY29kZS1zbmlwcGV0XCIsXCJhbWRcIjpcInR1aS1jb2RlLXNuaXBwZXRcIixcInJvb3RcIjpbXCJ0dWlcIixcInV0aWxcIl19XG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=
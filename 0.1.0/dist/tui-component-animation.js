/*! TOAST UI Animation Library 0.1.0 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _codeSnippet = __webpack_require__(1);

	var _codeSnippet2 = _interopRequireDefault(_codeSnippet);

	var _anim = __webpack_require__(2);

	var animation = _interopRequireWildcard(_anim);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * @namespace tui.component.animation
	 * @description Animation library
	 */
	_codeSnippet2['default'].defineNamespace('tui.component.animation', animation);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = tui.util;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.requestAnimFrame = requestAnimFrame;
	exports.cancelAnimFrame = cancelAnimFrame;
	exports.anim = anim;

	var _codeSnippet = __webpack_require__(1);

	var _codeSnippet2 = _interopRequireDefault(_codeSnippet);

	var _easing = __webpack_require__(3);

	var easingFunctions = _interopRequireWildcard(_easing);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * @fileoverview Module for animations
	 * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
	 * @module ./anim
	 * @description Core module for animation
	 */
	var isArray = _codeSnippet2['default'].isArray,
	    map = _codeSnippet2['default'].map;


	var isSupportPromise = typeof Promise !== "undefined" && /\[native code\]/.test(Promise.toString());

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
	 * @memberof tui.component.animation
	 * @param {Function} callback - callback function
	 * @returns {Number} timer id
	 */
	function requestAnimFrame(callback) {
	    return requestFn(callback);
	}

	/**
	 * Shim of cancelAnimationFrame
	 * @method cancelAnimFrame
	 * @memberof tui.component.animation
	 * @param {Number} timerId - requestAnimationFrame timerId
	 */
	function cancelAnimFrame(timerId) {
	    if (!timerId) {
	        return;
	    }

	    cancelFn(timerId);
	}

	/**
	 * Get animation runner
	 * @memberof tui.component.animation
	 * @method anim
	 * @param {Object} options - options
	 * @param {(Number|Number[])} [options.from=0] - beginning values
	 * @param {(Number|Number[])} [options.to=100] - change in values
	 * @param {Number} [options.duration=1000] - duration (ms)
	 * @param {String} [options.easing='linear'] - easing functions {@see easing}
	 * @param {Function} [options.frame] - invoking each frames. you can manipulate specific element by this function
	 *   the arguments passed with same sequence with `from`, `to` option values
	 * @param {Function} [options.done] - invoked once at end of animation
	 * @returns {Object} animation runner
	 * @tutorial example1
	 * @example
	 * // Initialize animation runner
	 * var runner = tui.component.animation.anim({
	 *   from: [1, 5],  // initial x, y position
	 *   to: [100, 500],
	 *   duration: 2000,
	 *   easing: 'easeInOut',
	 *   // manipulate x, y position
	 *   frame: function(x, y) {
	 *     dom.css(box, {
	 *       left: x + 'px',
	 *       top: y + 'px'
	 *     });
	 *   },
	 *   done: function() {
	 *     dom.css(box, {
	 *       backgroundColor: 'red'
	 *     });
	 *   }
	 * });
	 *
	 * // Run animation
	 * runner.run();
	 *
	 * // If browser support Promise `run()` return it, otherwise return `null`
	 * // So below line is throw an errors. use carefully
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

	    from = isArray(from) ? from : [from];
	    to = isArray(to) ? to : [to];

	    var timeoutId = 0;
	    var diffs = map(from, function (val, idx) {
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
	            var progress = Math.min(1, elapsed / duration);
	            var values = map(from, function (val, idx) {
	                return diffs[idx] * easing(progress) + val;
	            });

	            frame.apply(null, values);
	            timeoutId = requestAnimFrame(tick);

	            if (progress >= 1) {
	                cancelAnimFrame(timeoutId);
	                resolve();
	                complete();

	                return;
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	/**
	 * @fileoverview Easing fomulars
	 * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
	 */

	var abs = Math.abs,
	    pow = Math.pow;


	function _easeIn(p) {
	    return function (t) {
	        return pow(t, p);
	    };
	}

	function _easeOut(p) {
	    return function (t) {
	        return 1 - abs(pow(t - 1, p));
	    };
	}

	function _easeInOut(p) {
	    return function (t) {
	        return t < 0.5 ? _easeIn(p)(t * 2) / 2 : _easeOut(p)(t * 2 - 1) / 2 + 0.5;
	    };
	}

	var linear = exports.linear = _easeInOut(1);
	var easeInQuad = exports.easeInQuad = _easeIn(2);
	var easeOutQuad = exports.easeOutQuad = _easeOut(2);
	var easeInOutQuad = exports.easeInOutQuad = _easeInOut(2);
	var easeIn = exports.easeIn = easeInQuad;
	var easeOut = exports.easeOut = easeOutQuad;
	var easeInOut = exports.easeInOut = easeInOutQuad;
	var easeInCubic = exports.easeInCubic = _easeIn(3);
	var easeOutCubic = exports.easeOutCubic = _easeOut(3);
	var easeInOutCubic = exports.easeInOutCubic = _easeInOut(3);
	var easeInQuart = exports.easeInQuart = _easeIn(4);
	var easeOutQuart = exports.easeOutQuart = _easeOut(4);
	var easeInOutQuart = exports.easeInOutQuart = _easeInOut(4);
	var easeInQuint = exports.easeInQuint = _easeIn(5);
	var easeOutQuint = exports.easeOutQuint = _easeOut(5);
	var easeInOutQuint = exports.easeInOutQuint = _easeInOut(5);

/***/ }
/******/ ]);
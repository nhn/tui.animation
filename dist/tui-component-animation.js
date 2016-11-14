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
/******/ 	__webpack_require__.p = "";

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var isArray = _codeSnippet2['default'].isArray,
	    map = _codeSnippet2['default'].map; /**
	                                         * @fileoverview Module for animations
	                                         * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
	                                         * @module ./anim
	                                         * @description Core module for animation
	                                         */

	var isSupportPromise = typeof Promise !== "undefined" && /\[native code\]/.test(Promise.toString());

	/**
	 * Do nothing
	 */
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

	/* eslint-disable */
	// easing algorithm are based on https://gist.github.com/gre/1650294

	/**
	 * no easing, no acceleration
	 */
	function linear(t) {
	    return t;
	}

	/**
	 * accelerating from zero velocity
	 */
	function easeInQuad(t) {
	    return t * t;
	}

	/**
	 * decelerating to zero velocity
	 */
	function easeOutQuad(t) {
	    return t * (2 - t);
	}

	/**
	 * acceleration until halfway, then deceleration
	 */
	function easeInOutQuad(t) {
	    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	}

	/**
	 * accelerating from zero velocity
	 */
	function easeInCubic(t) {
	    return t * t * t;
	}

	/**
	 * decelerating to zero velocity
	 */
	function easeOutCubic(t) {
	    t -= 1;

	    return t * t * t + 1;
	}

	/**
	 * acceleration until halfway, then deceleration
	 */
	function easeInOutCubic(t) {
	    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	}

	/**
	 * accelerating from zero velocity
	 */
	function easeInQuart(t) {
	    return t * t * t * t;
	}

	/**
	 * decelerating to zero velocity
	 */
	function easeOutQuart(t) {
	    t -= 1;

	    return 1 - t * t * t * t;
	}

	/**
	 * acceleration until halfway, then deceleration
	 */
	function easeInOutQuart(t) {
	    var t1 = t - 1;

	    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * t1 * t1 * t1 * t1;
	}

	// accelerating from zero velocity
	function easeInQuint(t) {
	    return t * t * t * t * t;
	}

	// decelerating to zero velocity
	function easeOutQuint(t) {
	    t -= 1;

	    return 1 + t * t * t * t * t;
	}

	/**
	 * acceleration until halfway, then deceleration
	 */
	function easeInOutQuint(t) {
	    var t1 = t - 1;

	    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * t1 * t1 * t1 * t1 * t1;
	}

	var easingFunctions = {
	    linear: linear,
	    easeIn: easeInQuad,
	    easeOut: easeOutQuad,
	    easeInOut: easeInOutQuad,
	    easeInQuad: easeInQuad,
	    easeOutQuad: easeOutQuad,
	    easeInOutQuad: easeInOutQuad,
	    easeInCubic: easeInCubic,
	    easeOutCubic: easeOutCubic,
	    easeInOutCubic: easeInOutCubic,
	    easeInQuart: easeInQuart,
	    easeOutQuart: easeOutQuart,
	    easeInOutQuart: easeInOutQuart,
	    easeInQuint: easeInQuint,
	    easeOutQuint: easeOutQuint,
	    easeInOutQuint: easeInOutQuint
	};

	/* eslint-enable */

	function getRunner() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        from = _ref.from,
	        to = _ref.to,
	        duration = _ref.duration,
	        easing = _ref.easing,
	        frame = _ref.frame,
	        complete = _ref.complete,
	        _ref$resolve = _ref.resolve,
	        resolve = _ref$resolve === undefined ? noop : _ref$resolve;

	    from = isArray(from) ? from : [from];
	    to = isArray(to) ? to : [to];

	    var diffs = map(from, function (val, idx) {
	        return to[idx] - val;
	    });
	    var timeout = 0;

	    easing = easingFunctions[easing] || easingFunctions.linear;
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
	    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        _ref2$from = _ref2.from,
	        from = _ref2$from === undefined ? 0 : _ref2$from,
	        _ref2$to = _ref2.to,
	        to = _ref2$to === undefined ? 100 : _ref2$to,
	        _ref2$duration = _ref2.duration,
	        duration = _ref2$duration === undefined ? 1000 : _ref2$duration,
	        _ref2$easing = _ref2.easing,
	        easing = _ref2$easing === undefined ? 'linear' : _ref2$easing,
	        _ref2$frame = _ref2.frame,
	        frame = _ref2$frame === undefined ? noop : _ref2$frame,
	        _ref2$complete = _ref2.complete,
	        complete = _ref2$complete === undefined ? noop : _ref2$complete;

	    from = isArray(from) ? from : [from];
	    to = isArray(to) ? to : [to];

	    var diffs = map(from, function (val, idx) {
	        return to[idx] - val;
	    });
	    var timeout = 0;

	    easing = easingFunctions[easing] || easingFunctions.linear;

	    var runner = {
	        run: function run() {
	            var start = new Date();

	            if (!isSupportPromise) {
	                runnerFn(noop, start)();
	                return null;
	            }

	            return new Promise(function (resolve) {
	                runnerFn(resolve, start)();
	            });
	        },
	        cancel: function cancel() {
	            runner.done = true;
	            cancelAnimFrame(timeout);
	        },

	        done: false
	    };

	    /**
	     * Get animation runner object
	     * @param {function} resolve - resolve from promise
	     * @param {Date} start - time of animation start
	     * @returns {function}
	     */
	    function runnerFn(resolve, start) {
	        return function tick() {
	            var elapsed = new Date() - start;
	            var p = Math.min(elapsed / duration, 1);
	            var values = map(from, function (val, idx) {
	                return val + diffs[idx] * easing(p);
	            });

	            frame.apply(null, values);
	            timeout = requestAnimFrame(tick);

	            if (p >= 1) {
	                runner.done = true;
	                cancelAnimFrame(timeout);
	                resolve();
	                complete();

	                return;
	            }
	        };
	    }

	    return runner;
	}

/***/ }
/******/ ]);
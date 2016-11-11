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

	var _anim = __webpack_require__(1);

	var anim = _interopRequireWildcard(_anim);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	/** @namespace tui.component.animation */
	tui.util.defineNamespace('tui.component.animation', anim);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.requestAnimFrame = requestAnimFrame;
	exports.cancelAnimFrame = cancelAnimFrame;
	exports.animate = animate;
	/**
	 * @fileoverview Module for animations
	 * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
	 */

	/** @module anim */

	var isSupportPromise = typeof Promise !== "undefined" && /\[native code\]/.test(Promise.toString());

	/**
	 * Determine object is Array
	 * @param {*} obj - object to determining
	 */
	function isArray(obj) {
	    return obj.length === +obj.length;
	}

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

	/**
	 * Get animation runner
	 * @memberof tui.component.animation
	 * @method animate
	 * @param {Object} options - options
	 * @param {(Number|Number[])} [options.from=0] - beginning values
	 * @param {(Number|Number[])} [options.to=100] - change in values
	 * @param {Number} [options.duration=1000] - duration (ms)
	 * @param {String} [options.easing='linear'] - easing functions {@see easing}
	 * @param {Function} [options.frame] - invoking each frames
	 * @param {Function} [options.done] - invoked once at end of animation
	 * @returns {Object} animation runner
	 * @example
	 * // Initialize animation runner
	 * var runner = tui.component.animation.anim({
	 *   from: [1, 5],
	 *   to: [100, 500],
	 *   duration: 2000,
	 *   easing: 'easeInOut',
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
	 * runner.run().then(function() {console.log('done!');});
	 */
	function animate() {
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
	        _ref$done = _ref.done,
	        done = _ref$done === undefined ? noop : _ref$done;

	    from = isArray(from) ? from : [from];
	    to = isArray(to) ? to : [to];

	    var diffs = from.map(function (val, idx) {
	        return to[idx] - val;
	    });
	    var timeout = 0;

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
	            var p = elapsed / duration;

	            p = Math.min(p, 1);

	            var values = from.map(function (val, idx) {
	                return val + diffs[idx] * easing(p);
	            });
	            if (values.length < 2) {
	                values = values[0];
	            }

	            frame(values);
	            timeout = requestAnimFrame(tick);

	            if (p >= 1) {
	                cancelAnimFrame(timeout);
	                resolve();
	                done();

	                return;
	            }
	        };
	    }

	    return {
	        run: function run() {
	            if (isSupportPromise) {
	                return new Promise(function (resolve) {
	                    runner(resolve, new Date())();
	                });
	            }

	            return null;
	        },
	        cancel: function cancel() {
	            cancelAnimFrame(timeout);
	        }
	    };
	}

/***/ }
/******/ ]);
/**
 * @fileoverview Module for animations
 * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
 */

/**
 * @module ./anim
 * @ignore
 * @description Core module for animation
 */

import util from 'code-snippet';

import * as easingFunctions from './easing';

const {isArray, map} = util;

const isSupportPromise = (typeof Promise !== "undefined") &&
    (/\[native code\]/.test(Promise.toString()));

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

const requestFn = window.requestAnimationFrame ||
    getPrefixed('RequestAnimationFrame') ||
    function(callback) {
        return window.setTimeout(callback, 1000 / 60);
    };

const cancelFn = window.cancelAnimationFrame ||
    getPrefixed('CancelAnimationFrame') ||
    getPrefixed('CancelRequestAnimationFrame') ||
    function(timerId) {
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
export function requestAnimFrame(callback) {
    return requestFn(callback);
}

/**
 * Shim of cancelAnimationFrame
 * @method cancelAnimFrame
 * @memberof tui.component.animation
 * @param {Number} timerId - requestAnimationFrame timerId
 */
export function cancelAnimFrame(timerId) {
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
 * @param {Function} [options.complete] - invoked once at end of animation
 * @returns {Object} animation runner
 * @tutorial example1
 * @tutorial example2
 * @tutorial example3
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
 *   complete: function() {
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
export function anim({
    from = 0,
    to = 100,
    duration = 1000,
    easing = 'linear',
    frame = noop,
    complete = noop
} = {}) {
    from = isArray(from) ? from : [from];
    to = isArray(to) ? to : [to];

    let timeoutId = 0;
    const diffs = map(from, (val, idx) => to[idx] - val);
    easing = easingFunctions[easing] || easingFunctions.linear;

    /**
     * Get animation runner object
     * @param {function} resolve - resolve from promise
     * @param {Date} start - time of animation start
     * @returns {function}
     */
    function runner(resolve, start) {
        return function tick() {
            const elapsed = (new Date()) - start;
            const progress = Math.min(1, (elapsed / duration) || 0);
            const values = map(from, (val, idx) => (diffs[idx] * easing(progress)) + val);

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
        run() {
            const start = new Date();

            if (!isSupportPromise) {
                runner(noop, start)();
                return null;
            }

            return new Promise(resolve => runner(resolve, start)());
        },
        cancel() {
            cancelAnimFrame(timeoutId);
        }
    };
}

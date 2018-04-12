/**
 * @fileoverview Module for animations
 * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
 */

/**
 * @module ./anim
 * @ignore
 * @description Core module for animation
 */

import * as easingFunctions from './easing';
import {imagePing, isArray, map} from 'tui-code-snippet';

const isSupportPromise = (typeof Promise !== 'undefined') &&
    (/\[native code\]/.test(Promise.toString()));
let hostnameSent = false;

/** Do nothing */
function noop() {}

/**
 * Get name with vendor prefix
 * @param {String} name - name to prepend prefix
 * @returns {String} vendor prefixed name
 */
function getPrefixed(name) {
    return window[`webkit${name}`] || window[`moz${name}`] || window[`ms${name}`];
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
 * @memberof tui.animation
 * @param {Function} callback - callback function
 * @returns {Number} timer id
 * @example
 * var animation = require('tui-animation');
 * var timerId = animation.requestAnimFrame(function() {
 *   $('box').css(left, '100px');
 * });
 */
export function requestAnimFrame(callback) {
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
export function cancelAnimFrame(timerId) {
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
    const {hostname} = location;

    if (hostnameSent) {
        return;
    }
    hostnameSent = true;

    imagePing('https://www.google-analytics.com/collect', {
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
export function anim({
    from = 0,
    to = 100,
    duration = 1000,
    easing = 'linear',
    frame = noop,
    complete = noop,
    usageStatistics = true
} = {}) {
    from = isArray(from) ? from : [from];
    to = isArray(to) ? to : [to];

    let timeoutId = 0;
    const diffs = map(from, (val, idx) => to[idx] - val);

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
            const elapsed = (new Date()) - start;
            const progress = Math.min(1, (elapsed / duration) || 0);
            const values = map(from, (val, idx) => (diffs[idx] * easing(progress)) + val);

            frame(...values);
            timeoutId = requestAnimFrame(tick);

            if (progress >= 1) {
                cancelAnimFrame(timeoutId);
                resolve();
                complete();
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

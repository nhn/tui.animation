/**
 * @fileoverview Module for animations
 * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
 * @module ./anim
 * @description Core module for animation
 */
const isSupportPromise =
    (typeof Promise !== "undefined") &&
    (/\[native code\]/.test(Promise.toString()));

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
    return (t < 0.5) ? (2 * t * t) :
        (-1 + (4 - 2 * t) * t);
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

    return (t * t * t) + 1;
}

/**
 * acceleration until halfway, then deceleration
 */
function easeInOutCubic(t) {
    return (t < 0.5) ? (4 * t * t * t) :
        (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
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

    return 1 - (t * t * t * t);
}

/**
 * acceleration until halfway, then deceleration
 */
function easeInOutQuart(t) {
    const t1 = t - 1;

    return (t < 0.5) ? (8 * t * t * t * t) :
        (1 - (8 * t1 * t1 * t1 * t1));
}

// accelerating from zero velocity
function easeInQuint(t) {
    return (t * t * t * t * t);
}

// decelerating to zero velocity
function easeOutQuint(t) {
    t -= 1;

    return 1 + (t * t * t * t * t);
}

/**
 * acceleration until halfway, then deceleration
 */
function easeInOutQuint(t) {
    const t1 = t - 1;

    return (t < 0.5) ? (16 * t * t * t * t * t) :
        (1 + (16 * t1 * t1 * t1 * t1 * t1));
}

const easingFunctions = {
    linear,
    easeIn: easeInQuad,
    easeOut: easeOutQuad,
    easeInOut: easeInOutQuad,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
    easeInCubic,
    easeOutCubic,
    easeInOutCubic,
    easeInQuart,
    easeOutQuart,
    easeInOutQuart,
    easeInQuint,
    easeOutQuint,
    easeInOutQuint
};

/* eslint-enable */

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
export function anim({
    from = 0,
    to = 100,
    duration = 1000,
    easing = 'linear',
    frame = noop,
    done = noop
} = {}) {
    from = isArray(from) ? from : [from];
    to = isArray(to) ? to : [to];

    const diffs = from.map((val, idx) => to[idx] - val);
    let timeout = 0;

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
            let p = elapsed / duration;

            p = Math.min(p, 1);

            let values = from.map((val, idx) => val + (diffs[idx] * easing(p)));
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
        run() {
            if (isSupportPromise) {
                return new Promise(resolve => {
                    runner(resolve, new Date())();
                });
            }

            return null;
        },
        cancel() {
            cancelAnimFrame(timeout);
        }
    };
}

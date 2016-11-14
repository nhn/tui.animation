/**
 * @fileoverview Easing fomulars
 * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
 */

const {abs, pow} = Math;

/**
 * @module ./easing
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
    return function(t) {
        return pow(t, p);
    }
}

/**
 * High order function for ease-out
 * @param {Number} p - for using `pow(p)` to calculate accelerate factor
 * @returns {Function}
 */
function _easeOut(p) {
    return function(t) {
        return 1 - abs(pow(t - 1, p));
    }
}

/**
 * High order function for ease-in-out
 * @param {Number} p - for using `pow(p)` to calculate accelerate factor
 * @returns {Function}
 */
function _easeInOut(p) {
    return function(t) {
        return t < 0.5 ? _easeIn(p)(t * 2) / 2 : (_easeOut(p)((t * 2) - 1) / 2) + 0.5;
    }
}

/**
 * no easing, no acceleration
 * @method
 * @param {Number} t - progress value between 0 ~ 1
 * @returns {Number} calculated delta value
 */
export const linear = _easeInOut(1);
/**
 * accelerating from zero velocity
 * @method
 * @param {Number} t - progress value between 0 ~ 1
 * @returns {Number} calculated delta value
 */
export const easeInQuad = _easeIn(2);
/**
 * decelerating to zero velocity
 * @method
 * @param {Number} t - progress value between 0 ~ 1
 * @returns {Number} calculated delta value
 */
export const easeOutQuad = _easeOut(2);
/**
 * acceleration until halfway, then deceleration
 * @method
 * @param {Number} t - progress value between 0 ~ 1
 * @returns {Number} calculated delta value
 */
export const easeInOutQuad = _easeInOut(2);

/**
 * accelerating from zero velocity
 * @method
 * @param {Number} t - progress value between 0 ~ 1
 * @returns {Number} calculated delta value
 */
export const easeIn = easeInQuad;
/**
 * decelerating to zero velocity
 * @method
 * @param {Number} t - progress value between 0 ~ 1
 * @returns {Number} calculated delta value
 */
export const easeOut = easeOutQuad;
/**
 * acceleration until halfway, then deceleration
 * @method
 * @param {Number} t - progress value between 0 ~ 1
 * @returns {Number} calculated delta value
 */
export const easeInOut = easeInOutQuad;

/**
 * accelerating from zero velocity
 * @method
 * @param {Number} t - progress value between 0 ~ 1
 * @returns {Number} calculated delta value
 */
export const easeInCubic = _easeIn(3);
/**
 * decelerating to zero velocity
 * @method
 * @param {Number} t - progress value between 0 ~ 1
 * @returns {Number} calculated delta value
 */
export const easeOutCubic = _easeOut(3);
/**
 * acceleration until halfway, then deceleration
 * @method
 * @param {Number} t - progress value between 0 ~ 1
 * @returns {Number} calculated delta value
 */
export const easeInOutCubic = _easeInOut(3);

/**
 * accelerating from zero velocity
 * @method
 * @param {Number} t - progress value between 0 ~ 1
 * @returns {Number} calculated delta value
 */
export const easeInQuart = _easeIn(4);
/**
 * decelerating to zero velocity
 * @method
 * @param {Number} t - progress value between 0 ~ 1
 * @returns {Number} calculated delta value
 */
export const easeOutQuart = _easeOut(4);
/**
 * acceleration until halfway, then deceleration
 * @method
 * @param {Number} t - progress value between 0 ~ 1
 * @returns {Number} calculated delta value
 */
export const easeInOutQuart = _easeInOut(4);

/**
 * accelerating from zero velocity
 * @method
 * @param {Number} t - progress value between 0 ~ 1
 * @returns {Number} calculated delta value
 */
export const easeInQuint = _easeIn(5);
/**
 * decelerating to zero velocity
 * @method
 * @param {Number} t - progress value between 0 ~ 1
 * @returns {Number} calculated delta value
 */
export const easeOutQuint = _easeOut(5);
/**
 * acceleration until halfway, then deceleration
 * @method
 * @param {Number} t - progress value between 0 ~ 1
 * @returns {Number} calculated delta value
 */
export const easeInOutQuint = _easeInOut(5);

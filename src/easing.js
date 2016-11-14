/**
 * @fileoverview Easing fomulars
 * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
 */

const {abs, pow} = Math;

function _easeIn(p) {
    return function(t) {
        return pow(t, p);
    }
}

function _easeOut(p) {
    return function(t) {
        return 1 - abs(pow(t - 1, p));
    }
}

function _easeInOut(p) {
    return function(t) {
        return t < 0.5 ? _easeIn(p)(t * 2) / 2 : (_easeOut(p)((t * 2) - 1) / 2) + 0.5;
    }
}

export const linear = _easeInOut(1);
export const easeInQuad = _easeIn(2);
export const easeOutQuad = _easeOut(2);
export const easeInOutQuad = _easeInOut(2);
export const easeIn = easeInQuad;
export const easeOut = easeOutQuad;
export const easeInOut = easeInOutQuad;
export const easeInCubic = _easeIn(3);
export const easeOutCubic = _easeOut(3);
export const easeInOutCubic = _easeInOut(3);
export const easeInQuart = _easeIn(4);
export const easeOutQuart = _easeOut(4);
export const easeInOutQuart = _easeInOut(4);
export const easeInQuint = _easeIn(5);
export const easeOutQuint = _easeOut(5);
export const easeInOutQuint = _easeInOut(5);

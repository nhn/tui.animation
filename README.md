Animation
===============
Calculate delta value(s) for create animation easily.

## Feature

* Increase, Decrease the specific value base on options.
* Support shim of `requestAnimationFrame`, `cancelAnimationFrame`.
* (Optional) Support `Promise` for handle end of animation.
* Support following timing-functions.
	* linear
	* easeInQuad (alias: easeIn)
	* easeOutQuad (alias: easeOut)
	* easeInOutQuad (alias: easeInOut)
    * easeInCubic
    * easeOutCubic
    * easeInOutCubic
    * easeInQuart
    * easeOutQuart
    * easeInOutQuart
    * easeInQuint
    * easeOutQuint
    * easeInOutQuint

## Example

### anim()

```js
var runner = tui.component.animation.anim({
    from: [0, 100],
    to: [100, 200],
    duration: 3000,
    frame: function(left, top) {
        $('box').css({
            left: left + 'px',
            top: top + 'px'
        });
    },
    complete: function() {
        console.log('animation done (callback)');
    }
});

// Run animation (browser not support Promise)
runner.run();    // return null

// Run animation (browser support Promise)
runner.run().then(function() {
    console.log('animation done (promise)');
});
```

### requestAnimFrame(), cancelAnimFrame()

```js
// requestAnimationFrame
var timerId = tui.component.animation.requestAnimFrame(function() {
    $('box').css(left, '100px');
});

// cancelAnimationFrame
tui.component.animation.cancelAnimFrame(timerId);
```

## Dependency
* tui-code-snippet ^1.2.2

## Documentation
* **API** : https://nhnent.github.io/tui.component.animation/latest
* **Examples** - https://nhnent.github.io/tui.component.animation/latest/tutorial-example1.html

## Test environment
* PC
	* Internet Explorer 8 ~ 11
	* Chrome
	* Firefox
* Mobile
	* Samsung Galaxy S5(aos 4.4)
    * Samsung Galaxy Note 3(aos 4.4)
	* iPhone 7(ios 10)
    * iPhone 6s(ios 9.3)

## Download/Install
* Bower:
   * latest : `bower install tui-component-animation`
   * each version : `bower install tui-component-animation[#tag]`
* Download: https://github.com/nhnent/tui.component.animation

## LICENSE
[MIT LICENSE](LICENSE).

## Sponsor
* <img src="https://cloud.githubusercontent.com/assets/12269563/12287774/8cf4d2c0-ba12-11e5-9fa8-0a9c452cca05.png" height="30"><br>
 [BrowserStack](https://www.browserstack.com/) is a cloud based cross browser testing tool

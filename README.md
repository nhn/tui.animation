# Animation

Calculate delta value(s) for creating animation easily.

## Feature

* Increase, Decrease the specific value base on options.
* Support shim of `requestAnimationFrame`, `cancelAnimationFrame`.
* (Optional) Support `Promise` for handling end of animation.
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

## Documentation
* **API** : [https://nhnent.github.io/tui.animation/latest/](https://nhnent.github.io/tui.animation/latest/)
* **Tutorial** : [https://github.com/nhnent/tui.animation/wiki](https://github.com/nhnent/tui.animation/wiki)
* **Example** : [https://nhnent.github.io/tui.animation/latest/tutorial-example01-basic-usage.html](https://nhnent.github.io/tui.animation/latest/tutorial-example01-basic-usage.html)

## Dependency
* [tui-code-snippet](https://github.com/nhnent/tui.code-snippet) ^1.2.5

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

## Usage
### Use `npm`

Install the latest version using `npm` command:

```
$ npm install tui-animation --save
```

or want to install the each version:

```
$ npm install tui-animation@<version> --save
```

To access as module format in your code:

```javascript
var animation = require('tui-animation');
var runner = animation.anim(...);
```

### Use `bower`
Install the latest version using `bower` command:

```
$ bower install tui-animation
```

or want to install the each version:

```
$ bower install tui-animation#<tag>
```

To access as namespace format in your code:

```javascript
var runner = tui.animation.anim(...);
```

### Download
* [Download bundle files from `dist` folder](https://github.com/nhnent/tui.animation/tree/production/dist)
* [Download all sources for each version](https://github.com/nhnent/tui.animation/releases)

## License
[MIT LICENSE](https://github.com/nhnent/tui.animation/blob/master/LICENSE)

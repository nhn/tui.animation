### ‼️ `tui.animation` will no longer receive major updates. It will only get bug fixes in future.

<br>

# TOAST UI Component : Animation
> Component that controls and applys various easing effects.

[![GitHub release](https://img.shields.io/github/release/nhn/tui.animation.svg)](https://github.com/nhn/tui.animation/releases/latest)
[![npm](https://img.shields.io/npm/v/tui-animation.svg)](https://www.npmjs.com/package/tui-animation)
[![GitHub license](https://img.shields.io/github/license/nhn/tui.animation.svg)](https://github.com/nhn/tui.animation/blob/production/LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/nhn/tui.project-name/labels/help%20wanted)
[![code with hearth by NHN](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-NHN-ff1414.svg)](https://github.com/nhn)


## 🚩 Table of Contents
* [Collect statistics on the use of open source](#collect-statistics-on-the-use-of-open-source)
* [Browser Support](#-browser-support)
* [Features](#-features)
* [Examples](#-examples)
* [Install](#-install)
    * [Via Package Manager](#via-package-manager)
    * [Via Contents Delivery Network (CDN)](#via-contents-delivery-network-cdn)
    * [Download Source Files](#download-source-files)
* [Usage](#-usage)
    * [HTML](#html)
    * [JavaScript](#javascript)
* [Pull Request Steps](#-pull-request-steps)
    * [Setup](#setup)
    * [Develop](#develop)
    * [Pull Request Steps](#pull-request)
* [Documents](#-documents)
* [Contributing](#-contributing)
* [Dependency](#-dependency)
* [License](#-license)


## Collect statistics on the use of open source

TOAST UI Animation applies Google Analytics (GA) to collect statistics on the use of open source, in order to identify how widely TOAST UI Animation is used throughout the world. It also serves as important index to determine the future course of projects. location.hostname (e.g. > “ui.toast.com") is to be collected and the sole purpose is nothing but to measure statistics on the usage. To disable GA, use the following `usageStatistics` options when creating the instance.

```js
var options = {
    ...
    usageStatistics: false
}
var instance = animation.anim(options);
```

Or, include `tui-code-snippet.js` (**v1.5.0** or **later**) and then immediately write the options as follows:

```js
tui.usageStatistics = false;
```


## 🌏 Browser Support
| <img src="https://user-images.githubusercontent.com/1215767/34348387-a2e64588-ea4d-11e7-8267-a43365103afe.png" alt="Chrome" width="16px" height="16px" /> Chrome | <img src="https://user-images.githubusercontent.com/1215767/34348590-250b3ca2-ea4f-11e7-9efb-da953359321f.png" alt="IE" width="16px" height="16px" /> Internet Explorer | <img src="https://user-images.githubusercontent.com/1215767/34348380-93e77ae8-ea4d-11e7-8696-9a989ddbbbf5.png" alt="Edge" width="16px" height="16px" /> Edge | <img src="https://user-images.githubusercontent.com/1215767/34348394-a981f892-ea4d-11e7-9156-d128d58386b9.png" alt="Safari" width="16px" height="16px" /> Safari | <img src="https://user-images.githubusercontent.com/1215767/34348383-9e7ed492-ea4d-11e7-910c-03b39d52f496.png" alt="Firefox" width="16px" height="16px" /> Firefox |
| :---------: | :---------: | :---------: | :---------: | :---------: |
| Yes | 8+ | Yes | Yes | Yes |

## 🎨 Features
* Adjusts the range of values required to easing effect.
* Supports shim of `requestAnimationFrame`, `cancelAnimationFrame`.
* Supports various easing types.
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
* (Optional) Supports `Promise` for handling the result of animation.


## 🐾 Examples
* [Basic](https://nhn.github.io/tui.animation/latest/tutorial-example01-basic) : Example of using default options.
* [Using Promise](https://nhn.github.io/tui.animation/latest/tutorial-example03-using-promise) : Example of handling the result in a browser supported `Promise`.

More examples can be found on the left sidebar of each example page, and have fun with it.


## 💾 Install

TOAST UI products can be used by using the package manager or downloading the source directly.
However, we highly recommend using the package manager.

### Via Package Manager

TOAST UI products are registered in two package managers, [npm](https://www.npmjs.com/) and [bower](https://bower.io/).
You can conveniently install it using the commands provided by each package manager.
When using npm, be sure to use it in the environment [Node.js](https://nodejs.org/ko/) is installed.

#### npm

``` sh
$ npm install --save tui-animation# Latest version
$ npm install --save tui-animation@<version> # Specific version
```

#### bower

``` sh
$ bower install tui-animation# Latest version
$ bower install tui-animation#<tag> # Specific version
```

### Via Contents Delivery Network (CDN)
TOAST UI products are available over the CDN powered by [TOAST Cloud](https://www.toast.com).

You can use the CDN as below.

```html
<script src="https://uicdn.toast.com/tui-animation/latest/tui-animation.js"></script>
```

If you want to use a specific version, use the tag name instead of `latest` in the url's path.

The CDN directory has the following structure.

```
tui-animation/
├─ latest/
│  ├─ tui-animation.js
│  └─ tui-animation.min.js
├─ v1.1.0/
│  ├─ ...
```

### Download Source Files
* [Download bundle files](https://github.com/nhn/tui.animation/tree/production/dist)
* [Download all sources for each version](https://github.com/nhn/tui.animation/releases)


## 🔨 Usage

### HTML

This component does not require the container element.
You can handle the target element in the callback that is executed during the animation.

### JavaScript

This component does not use the instance created through the constructor function.
First, you should import the module using one of the following ways depending on your environment.

#### Using namespace in browser environment
``` javascript
var animation = tui.animation;
```

#### Using module format in node environment
``` javascript
var animation = require('tui-animation'); /* CommonJS */
```

``` javascript
import {animation} from 'tui-animation'; /* ES6 */
```


Then you should call the `anim` method with [options](https://nhn.github.io/tui.animation/latest/tui.animation#anim) to set configuration and call the `run` method to start the animation.

``` javascript
var instance = animation.anim({ ... });

instance.run();
```

For more information about the API, please see [here](https://nhn.github.io/tui.animation/latest/tui.animation).


## 🔧 Pull Request Steps

TOAST UI products are open source, so you can create a pull request(PR) after you fix issues.
Run npm scripts and develop yourself with the following process.

### Setup

Fork `develop` branch into your personal repository.
Clone it to local computer. Install node modules.
Before starting development, you should check to haveany errors.

``` sh
$ git clone https://github.com/{your-personal-repo}/tui.animation.git
$ cd tui.animation
$ npm install
$ npm run test
```

### Develop

Let's start development!
You can see your code is reflected as soon as you saving the codes by running a server.
Don't miss adding test cases and then make green rights.

#### Run webpack-dev-server

``` sh
$ npm run serve
$ npm run serve:ie8 # Run on Internet Explorer 8
```

#### Run karma test

``` sh
$ npm run test
```

### Pull Request

Before PR, check to test lastly and then check any errors.
If it has no error, commit and then push it!

For more information on PR's step, please see links of Contributing section.


## 📙 Documents
* [Getting Started](https://github.com/nhn/tui.animation/blob/production/docs/getting-started.md)
* [Tutorials](https://github.com/nhn/tui.animation/tree/production/docs)
* [APIs](https://nhn.github.io/tui.animation/latest)

You can also see the older versions of API page on the [releases page](https://github.com/nhn/tui.animation/releases).


## 💬 Contributing
* [Code of Conduct](https://github.com/nhn/tui.animation/blob/production/CODE_OF_CONDUCT.md)
* [Contributing guideline](https://github.com/nhn/tui.animation/blob/production/CONTRIBUTING.md)
* [Issue guideline](https://github.com/nhn/tui.animation/blob/production/docs/ISSUE_TEMPLATE.md)
* [Commit convention](https://github.com/nhn/tui.animation/blob/production/docs/COMMIT_MESSAGE_CONVENTION.md)


## 🔩 Dependency
* [tui-code-snippet](https://github.com/nhn/tui.code-snippet) >=1.5.0


## 📜 License

This software is licensed under the [MIT](https://github.com/nhn/tui.animation/blob/production/LICENSE) © [NHN](https://github.com/nhn).

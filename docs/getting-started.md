### anim()

```js
var runner = tui.animation.anim({
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

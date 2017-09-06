import {anim} from '../src/anim';

describe('animation', () => {
    let box;

    beforeEach(() => {
        fixture.set(`
<div style="width:500px;height:500px;position:relative">
    <div id="box" style="top:0px;left:0px;position:absolute"></div>
</div>
`);

        box = document.getElementById('box');
    });

    it('should invoke complete callback properly.', done => {
        anim({duration: 0, complete: done}).run();
    });

    it('should calculate delta value properly.', done => {
        anim({
            duration: 0,
            frame(left) {
                box.style.left = `${left}px`;
            },
            complete() {
                expect(parseInt(box.style.left, 10)).toBe(100);
                done();
            }
        }).run();
    });

    it('should calculate delta value list properly.', done => {
        anim({
            from: [1, 3],
            to: [100, 300],
            duration: 0,
            frame(left, top) {
                box.style.left = `${left}px`;
                box.style.top = `${top}px`;
            },
            complete() {
                const {left, top} = box.style;

                expect(parseInt(left, 10)).toBe(100);
                expect(parseInt(top, 10)).toBe(300);
                done();
            }
        }).run();
    });

    it('should cancel specific animation.', () => {
        var complete = jasmine.createSpy('complete');
        var runner = anim({
            duration: 5000,
            complete,
            frame(x) {
                box.style.left = `${x}px`;
            }
        });

        runner.run();

        runner.cancel();

        expect(box.style.left).not.toBe('100px');
    });

    it('should use default easing function(linear) when easing options is not valid.', done => {
        expect(function() {
            anim({
                duration: 0,
                easing: 'notExist',
                complete: done
            }).run();
        }).not.toThrow();
    });
});

### Slider options

- `carousel` - boolean, default is true.
- `isReversed` - boolean, default is false. Create reversed carousel.
- `rootSelector`- string, default is ".slider". Root slider class.
- `holderSelector`- string, default is ".slider-holder". Holder slides class.
- `slideSelector`- string. default is ".slider-slide". Class of every slide.
- `random`- boolean, string, array. Default is false.
  - `true` every slide appears randomly
  - `first`, `last`, `first-last` - every slide appears randomly except first, last or first and last.
  - [indexes] - every slide appears randomly except provided indexes.

### Slider animation hooks

`onBeforeEnter(el, meta)` - set up first slide position.

`onEnter(el, done, meta)` - enter animation, done - callback on animation is finished

`onAfterEnter(el, meta)`

`onBeforeLeave(el, meta)`- set up first slide position

`onLeave(el, done, meta)`- leave animation, done - callback on animation is finished

`onAfterLeave(el, meta)`

`onPlay(meta)` - fires for every slide change

### hooks argument `meta`

- `currentIndex` - current slide index
- `nextIndex` - next slide index
- `direction` - scroll direction 1 - down, -1 up
- `speed` - fake scroll speed, need to re-think

### Methods


`isInited()` - returns true/false

`init()` - init slider.

`play(progress)`

`getSlideEl(index)`

`getRoot()` - returns root el, height, width

`getHolder()` - returns holder el, height, width

`direction()` - return current scroll direction

`getCurrentSlideIndex()`


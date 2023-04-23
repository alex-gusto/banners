### Slider options

- `rootEl`- string or element, default is ".scene-manager". Root slider class.

- `skipDelay` - default is 200. Delay while user scrolls. Less delay skips less slides.

- `mode` - defailt is "in-out". Hiding and showing fire at the same time. 'out-in' - Showing fires after hiding has finished.

- `nav` - boolean, default is false. Activate navigation buttons.
- `navEl` - string or element. Default is ".scene-manager-nav". Class for navigation holder buttons. **Searching is going inside RootEl for selector. Use element to keep navigation ouside root**. 

- `arrows` - boolean, default is false. Activate navigation arrows (prev/next).
- `arrowsSelector` - Default is ".scene-manager-arrow". Class for navigation arrows.
  Next arrow class: ".scene-manager-arrow--next".
  Prev arrow class: ".scene-manager-arrow--prev"

- `ranges` - Array of arrays [[min, max]]. Custom ranges for appearing slides. Default step for range is (1 / slides count)
  ```
  [
    [0, 0.25],
    [0.25, 0.5],
    [0.5, 0.75],
    [0.75, 1]
  ]
  ```
- `random`- boolean, string, array. Default is false.
  - `true` every slide appears randomly
  - `first`, `last`, `first-last` - every slide appears randomly except first, last or first and last.
  - [indexes] - every slide appears randomly except provided indexes.

### Slider animation hooks

`onAppear(el, meta)` - set up start visible slide styles.

`onDisappear(el, meta)` - set up start hidden slide styles.

`onBeforeEnter(el, meta)` - set up slide position.

`onEnter(el, done, meta)` - enter animation, done - callback on animation is finished

`onAfterEnter(el, meta)`

`onBeforeLeave(el, meta)`- set up first slide position

`onLeave(el, done, meta)`- leave animation, done - callback on animation is finished

`onAfterLeave(el, meta)`

`onPlay(meta)` - fires for every slide change

### hooks argument `meta`

- `currentIndex` - current slide index
- `prevIndex` - prev slide index
- `direction` - scroll direction 1 - down, -1 up. Available only when progress changes.
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

`toScene(index)` - move to specific scene

`nextScene()` - move to next scene

`prevScene()` - move to prev scene

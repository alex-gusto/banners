### Slider options

onBeforeEnter(el, meta) - set up first slide position. 
meta - prevIndex, currentIndex of slides

onEnter(el, done, meta) - enter animation
done - callback on animation is finished

onAfterEnter(el, meta)

onBeforeLeave(el, meta) - set up first slide position

onLeave(el, done, meta) - leave animation

onAfterLeave(el, meta)

### Methods

```
init(selectorOrElements)

play(progress)

getSlideEl(index)

direction()

getCurrentSlideIndex()

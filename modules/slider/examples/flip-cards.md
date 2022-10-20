````javascript
function initSlide(el, opacity, index) {
  TweenMax.set(el, {
    rotationY: 180 * (index % 2) + 'deg',
    opacity: opacity,
  });
}

var sceneManager = SceneManager({
  carousel: false,
  onAppear: function (el, meta) {
    initSlide(el, 1, meta.nextIndex);
  },
  onDisappear: function (el, meta) {
    initSlide(el, 0, meta.nextIndex);
  },

  onBeforeEnter: function (el) {
    TweenMax.set(el, { opacity: 1, rotationY: "180deg" });
  },
  onEnter: function (el, done, meta) {
    TweenMax.to(el, 1, {
      rotationY: meta.direction > 0 ? "360deg" : "0deg",
      onComplete: done,
    });
  },
  onAfterEnter: function (el) {
    TweenMax.set(el, { rotationY: 0 });
  },

  onBeforeLeave: function (el, meta) {
    TweenMax.set(el, { rotationY: meta.direction > 0 ? "0deg" : "360deg" });
  },
  onLeave: function (el, done, meta) {
    TweenMax.to(el, 1, {
      rotationY: "180deg",
      onComplete: done,
    });
  },
  onAfterLeave: function (el) {
    TweenMax.set(el, { opacity: 0 });
  },
});

function receiveScrollData(data) {
  TweenMax.set(".scene-manager", {
    height: data.window,
  });

  if(!sceneManager.isInited()) {
    sceneManager.init();
  }

  var progress = data.scroll / (data.body - data.window);
  sceneManager.play(progress);
}

```html
<div class="scene-manager">
 <div class="scene-manager-holder">
    <div class="scene-manager-scene"></div>
    <div class="scene-manager-scene"></div>
    <div class="scene-manager-scene"></div>
    <div class="scene-manager-scene"></div>
    <div class="scene-manager-scene"></div>
    <div class="scene-manager-scene"></div>
 </div>
</div>
```css

.scene-manager-holder {
  transform-style: preserve-3d;
  perspective: 400px;
}

.scene-manager-scene {
  border: 2px solid white;
  box-shadow: 0px 0px 5px white;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.scene-manager-scene:after {
  transform: translateZ(20px);
  text-shadow: 0 0 5px white;
}

.scene-manager-scene:nth-child(1) {
  background-color: green;
}

.scene-manager-scene:nth-child(2) {
  background-color: blueviolet;
}

.scene-manager-scene:nth-child(3) {
  background-color: violet;
}

.scene-manager-scene:nth-child(4) {
  background-color: teal;
}

.scene-manager-scene:nth-child(5) {
  background-color: yellowgreen;
}

.scene-manager-scene:nth-child(6) {
  background-color: indianred;
}
````

````javascript
var sceneManager = SceneManager({
  arrows: true,
  onAppear: function (el) {
    TweenMax.set(el, { x: "0%" });
  },
  onDisappear: function (el) {
    TweenMax.set(el, {
      x: "100%",
    });
  },
  onBeforeEnter: function (el, meta) {
    TweenMax.set(el, {
      x: 100 * meta.direction * -1 + "%",
    });
  },
  onEnter: function (el, done) {
    TweenMax.to(el, 1, {
      x: "0%",
      onComplete: done,
    });
  },
  onLeave: function (el, done, meta) {
    TweenMax.to(el, 1, {
      x: 100 * meta.direction + "%",
      onComplete: done,
    });
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
.scene-manager-scene {
  counter-increment: counter;
  font-size: 40px;
  color: white;
  text-align: center;
}

.scene-manager-scene:after {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  content: counter(counter);
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

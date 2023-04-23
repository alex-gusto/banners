````javascript
var sceneManager = SceneManager({
  onAppear: function onAppear(el, meta) {
    TweenMax.set(el, { scale: 1, x: "0%" });
  },
  onDisappear: function onDisappear(el) {
    TweenMax.set(el, { scale: 0.7, x: "100%", opacity: 0 });
  },
  onBeforeEnter: function (el, meta) {
    TweenMax.set(el, {
      x: 100 * meta.direction * -1 + "%",
    });
  },
  onEnter: function onEnter(el, onComplete, meta) {
    TweenMax.to(el, 1, {
      scale: 1,
      opacity: 1,
      x: "0%",
      zIndex: 2,
      onComplete: onComplete,
    });
  },
  onLeave: function onLeave(el, onComplete, meta) {
    TweenMax.to(el, 1, {
      scale: 0.7,
      x: 100 * meta.direction + "%",
      opacity: 0,
      zIndex: 1,
      onComplete: onComplete,
    });
  },
});

// Activate when DOM is ready
sceneManager.init();

function onScroll() {
  var progress = window.pageYOffset / (document.body.clientHeight - window.innerHeight);
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

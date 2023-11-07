````javascript
var sceneManager = SceneManager({
  skipDelay: 200,
  random: 'first-last',
  ranges: [
    [0, 0.35],
    [0.35, 0.5],
    [0.5, 0.7],
    [0.7, 0.8],
    [0.8, 0.9],
    [0.9, 1],
  ],
  onAppear: function (el) {
    TweenMax.set(el, { x: "0%" });
  },
  onDisappear: function (el) {
    TweenMax.set(el, { x: "100%" });
  },
  onBeforeEnter: function (el, meta) {
    TweenMax.set(el, { x: meta.direction * 100 + "%" });
  },
  onEnter: function (el, onComplete, meta) {
    TweenMax.to(el, 1, { x: "0%", onComplete })
  },
  onLeave: function (el, onComplete, meta) {
    TweenMax.to(el, 1, { x: meta.direction * 100 + "%", onComplete })
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
  <div class="scene-manager-scene"></div>
  <div class="scene-manager-scene"></div>
  <div class="scene-manager-scene"></div>
  <div class="scene-manager-scene"></div>
  <div class="scene-manager-scene"></div>
  <div class="scene-manager-scene"></div>
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

````javascript
var sceneManager = SceneManager({
  nav: true,
  arrows: true,
  navEl: ".custom-nav",
  arrowsSelector: ".custom-arrow",
  onAppear: function (el) {
    TweenMax.set(el, { x: "0%" });
  },
  onDisappear: function (el) {
    TweenMax.set(el, { x: "100%" });
  },
  onBeforeEnter: function (el, meta) {
    TweenMax.set(el, { x: meta.direction * 100 + "%" });
  },
  onEnter: function (el, done, meta) {
    TweenMax.to(el, 1, { x: "0%", onComplete: done });
  },
  onLeave: function (el, done, meta) {
    TweenMax.to(el, 1, { x: meta.direction * 100 + "%", onComplete: done });
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

  <div class="custom-nav"></div>
  <button class="custom-arrow custom-arrow--prev">Prev</button>
  <button class="custom-arrow custom-arrow--next">Next</button>
</div>
```css

.custom-nav {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 3px;
}

.custom-nav__button {
  background-color: aquamarine;
  border-radius: 50%;
  display: inline-block;
  padding: 5px;
  cursor: pointer;
  margin: 3px 0;
  border: none;
  box-shadow: none;
}

.custom-nav__button--active {
  background-color: blueviolet;
}

.custom-arrow {
  position: absolute;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  box-shadow: none;
  cursor: pointer;
}

.custom-arrow--prev {
  top: 0;
}

.custom-arrow--next {
  bottom: 0;
}

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

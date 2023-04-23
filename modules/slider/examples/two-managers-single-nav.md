````javascript
  const sceneManagerTop = SceneManager({
    // Root settings
    rootEl: "#top",
    height: "50%",

    // Navigation
    nav: true,
    navEl: document.querySelector(".custom-nav"),

    // Arrows
    arrows: true,
    prevArrowEl: document.querySelector(".scene-manager-arrow--prev"),
    nextArrowEl: document.querySelector(".scene-manager-arrow--next"),

    // Hooks
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

  const sceneManagerBottom = SceneManager({
    rootEl: "#bottom",
    height: "50%",

    // Navigation
    nav: true,
    navEl: document.querySelector(".custom-nav"),

    // Arrows
    arrows: true,
    prevArrowEl: document.querySelector(".custom-arrow--prev"),
    nextArrowEl: document.querySelector(".custom-arrow--next"),

    // Hooks
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
        x: 100 * meta.direction + "%",
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
        x: 100 * meta.direction * -1 + "%",
        onComplete: done,
      });
    },
  });

// Activate when DOM is ready
sceneManagerTop.init();
sceneManagerBottom.init();

function onScroll() {
  var progress = window.pageYOffset / (document.body.clientHeight - window.innerHeight);
  sceneManagerTop.play(progress);
  sceneManagerBottom.play(progress);
}

```html
<div class="scene-manager" id="top">
  <div class="scene-manager-holder">
      <div class="scene-manager-scene"></div>
      <div class="scene-manager-scene"></div>
      <div class="scene-manager-scene"></div>
      <div class="scene-manager-scene"></div>
      <div class="scene-manager-scene"></div>
      <div class="scene-manager-scene"></div>
  </div>
 </div>

 <div class="scene-manager" id="bottom">
  <div class="scene-manager-holder">
      <div class="scene-manager-scene"></div>
      <div class="scene-manager-scene"></div>
      <div class="scene-manager-scene"></div>
      <div class="scene-manager-scene"></div>
      <div class="scene-manager-scene"></div>
      <div class="scene-manager-scene"></div>
  </div>
 </div>

  <button class="custom-arrow--prev">Prev</button>
  <button class="custom-arrow--next">Next</button>
  <div class="custom-nav"></div>
```css

.custom-nav {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
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
  margin: 0 3px;
  border: none;
  box-shadow: none;
}

.custom-nav__button--active {
  background-color: blueviolet;
}

.custom-arrow--prev,
.custom-arrow--next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.custom-arrow--prev {
  left: 0;
}

.custom-arrow--next {
  right: 0;
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

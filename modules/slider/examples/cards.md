````javascript
var sceneManager = SceneManager({
  carousel: false,
  skipDelay: 200,
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
    var nextIndex = meta.nextIndex;
    var currentIndex = meta.currentIndex;
    var dir = currentIndex > nextIndex ? 1 : -1;
    TweenMax.set(el, { x: dir * 100 + "%" });
  },
  onEnter: function (el, onComplete, meta) {
    var timeScale = 1 + meta.speed;
    TweenMax.to(el, 1, { x: "0%", onComplete }).timeScale(timeScale);
  },
  onLeave: function (el, onComplete, meta) {
    var nextIndex = meta.nextIndex;
    var currentIndex = meta.currentIndex;
    var dir = currentIndex > nextIndex ? 1 : -1;
    var timeScale = 1 + meta.speed;

    TweenMax.to(el, 1, { x: dir * 100 + "%", onComplete }).timeScale(timeScale);
  },
});

function receiveScrollData(data) {
  TweenMax.set(".slider", {
    height: data.window,
  });

  if(!sceneManager.isInited()) {
    sceneManager.init();
  }

  var progress = data.scroll / (data.body - data.window);
  sceneManager.play(progress);
}

function animate() {
  document.querySelectorAll(".slider-nav button").forEach((el) => {
    el.addEventListener("click", function () {
      sceneManager.toSlide(+el.dataset.index);
    });
  });
}

```html
<div class="slider">
 <div class="slider-holder">
    <div class="slider-slide"></div>
    <div class="slider-slide"></div>
    <div class="slider-slide"></div>
    <div class="slider-slide"></div>
    <div class="slider-slide"></div>
    <div class="slider-slide"></div>
 </div>
</div>
<div class="slider-nav">
  <button data-index="1">1</button>
  <button data-index="3">3</button>
  <button data-index="5">5</button>
</div>

```css
.slider-slide {
  counter-increment: counter;
  font-size: 40px;
  color: white;
  text-align: center;
}

.slider-slide:after {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  content: counter(counter);
}

.slider-slide:nth-child(1) {
  background-color: green;
}

.slider-slide:nth-child(2) {
  background-color: blueviolet;
}

.slider-slide:nth-child(3) {
  background-color: violet;
}

.slider-slide:nth-child(4) {
  background-color: teal;
}

.slider-slide:nth-child(5) {
  background-color: yellowgreen;
}

.slider-slide:nth-child(6) {
  background-color: indianred;
}
````

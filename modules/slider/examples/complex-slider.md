````javascript
var sceneManager = SceneManager({
  onAppear: function onAppear(el, meta) {
    TweenMax.set(el, { scale: 1 });
  },
  onDisappear: function onDisappear(el) {
    TweenMax.set(el, { scale: 0.7, opacity: 0 });
  },
  onEnter: function onEnter(el, onComplete, meta) {
    var timeScale = 1 + meta.speed;

    TweenMax.to(el, 1, {
      scale: 1,
      opacity: 1,
      x: 0,
      zIndex: 2,
      onComplete: onComplete,
    }).timeScale(timeScale);
  },
  onLeave: function onLeave(el, onComplete, meta) {
    var timeScale = 1 + meta.speed;
    var dir = meta.direction

    TweenMax.to(el, 1, {
      scale: 0.7,
      x: dir * -30 + "px",
      opacity: 0,
      zIndex: 1,
      onComplete: onComplete,
    }).timeScale(timeScale);
  },
  onPlay: function onPlay(meta) {
    var holder = sceneManager.getHolder();
    var root = sceneManager.getRoot();

    TweenMax.to(holder.el, 1, { x: -root.width * meta.nextIndex + "px" });
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

```javascript
var slider = Slider({
  onBeforeEnter: function (el, meta) {
    var prevIndex = meta.prevIndex;
    var currentIndex = meta.currentIndex;
    var dir = currentIndex < prevIndex ? 1 : -1;

    TweenMax.set(el, { x: dir * 100 + "%" });
  },
  onEnter: function (el, onComplete) {
    TweenMax.to(el, 1, { x: "0%", onComplete });
  },
  onBeforeLeave: function (el) {
    TweenMax.set(el, { x: "0%" });
  },
  onLeave: function (el, onComplete, meta) {
    var prevIndex = meta.prevIndex;
    var currentIndex = meta.currentIndex;
    var dir = currentIndex > prevIndex ? 1 : -1;

    TweenMax.to(el, 1, { x: dir * 100 + "%", onComplete });
  },
});

function receiveScrollData(data) {
  var progress = data.scroll / (data.body - data.window);
  slider.play(progress);
}

function animate() {
  slider.init(".slider-slide");
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
.slider {
  width: 100%;
  height: 300px;
}

.slider-holder {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slider-slide {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
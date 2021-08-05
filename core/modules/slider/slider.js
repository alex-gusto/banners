/*
```js

var slider = Slider();

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
}
*/

var deepCopy = function (obj) {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    return obj;
  }
};

var Slider = function (options) {
  var DEFAULT_OPTIONS = {
    onBeforeEnter: function (el) {
      TweenMax.set(el, { opacity: 0 });
    },
    onEnter: function (el, onComplete) {
      TweenMax.to(el, 1, { opacity: 1, onComplete });
    },
    onBeforeLeave: function (el) {
      TweenMax.set(el, { opacity: 1 });
    },
    onLeave: function (el, onComplete) {
      TweenMax.to(el, 1, { opacity: 0, onComplete });
    },
  };

  var _options = _setupOptions(options);
  var _states = {
    isInit: false,
    isSliding: false,
  };
  var _slides;
  var _slidesCount;
  var _currentSlideIndex = 0;
  var _progress = 0;
  var _progressStep;
  var _direction = 1;

  function _getSlides(selectorOrSlides) {
    if (!selectorOrSlides) {
      throw new Error("Slides or selector must be set up");
    }

    return typeof selectorOrSlides === "string"
      ? Array.prototype.slice.call(document.querySelectorAll(selectorOrSlides))
      : selectorOrSlides;
  }

  function _setupOptions(options) {
    if (!options) {
      return DEFAULT_OPTIONS;
    }

    const opts = {};
    for (var key in DEFAULT_OPTIONS) {
      if (options.hasOwnProperty(key)) {
        opts[key] = options[key];
      } else {
        opts[key] = DEFAULT_OPTIONS[key];
      }
    }

    return opts;
  }

  function _getSlideEl(index) {
    return _slides[index];
  }

  function _hideSlide(index, meta) {
    var slideEl = _getSlideEl(index);

    if (_options.onBeforeLeave) _options.onBeforeLeave(slideEl, meta);

    var done = function () {
      if (_options.onAfterLeave) _options.onAfterLeave(slideEl, meta);
    };

    _options.onLeave(slideEl, done, meta);
  }

  function _showSlide(index, meta) {
    var slideEl = _getSlideEl(index);

    if (_options.onBeforeEnter) _options.onBeforeEnter(slideEl, meta);

    var done = function () {
      if (_options.onAfterEnter) _options.onAfterEnter(slideEl, meta);
    };

    _options.onEnter(slideEl, done, meta);
  }

  function _initSlides() {
    let prevIndex = null;
    _slides.forEach(function (slide, i) {
      var meta = {
        prevIndex,
        currentIndex: i,
      };

      if (_currentSlideIndex === i) {
        _options.onBeforeLeave(slide, meta);
      } else {
        _options.onBeforeEnter(slide, meta);
      }

      prevIndex = i;
    });
  }

  function play(progress) {
    const nextSlideIndex = Math.floor(progress / _progressStep);

    _direction = _progress > progress ? -1 : 1;
    _progress = progress;

    if (nextSlideIndex >= _slidesCount || nextSlideIndex === _currentSlideIndex)
      return;

    _hideSlide(_currentSlideIndex, {
      prevIndex: _currentSlideIndex,
      currentIndex: nextSlideIndex,
    });
    _showSlide(nextSlideIndex, {
      prevIndex: _currentSlideIndex,
      currentIndex: nextSlideIndex,
    });

    _currentSlideIndex = nextSlideIndex;
  }

  function getSlideEl(index) {
    return _getSlideEl(index);
  }

  function getCurrentSlideIndex() {
    return _currentSlideIndex;
  }

  function direction() {
    return _direction;
  }

  function init(selectorOrSlides) {
    if (_states.isInit) return;

    _slides = _getSlides(selectorOrSlides);
    _slidesCount = _slides.length;
    _progressStep = 1 / _slidesCount;

    if (!_slidesCount) {
      throw new Error("No slides found! Check: " + selectorOrSlides);
    }

    _initSlides();

    _states.isInit = true;
  }

  return {
    init: init,
    play: play,
    getSlideEl: getSlideEl,
    direction: direction,
    getCurrentSlideIndex: getCurrentSlideIndex,
  };
};

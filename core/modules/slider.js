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
    infinite: false,
    slideAppearAnim: { duration: 0.5, opacity: 1 },
    slideDisappearAnim: { duration: 0.5, opacity: 0 },
  };

  var _options = _setupOptions(options);
  var _states = {
    isInit: false,
    isSliding: false,
  };
  var _slides;
  var _slidesCount;
  var _maxSlide;
  var _currentSlide = 0;
  var _progressStep;
  var _nextSlide = _getNextSlide();
  var _prevSlide = _getPrevSlide();

  function _appearSlide(index) {
    const appearAnim = deepCopy(_options.slideAppearAnim);

    appearAnim.onComplete = function () {
      _states.isSliding = false;
    };

    TweenMax.to(_slides[index], appearAnim.duration, appearAnim);
  }

  function _disappearSlide(index) {
    const disappearAnim = deepCopy(_options.slideDisappearAnim);

    disappearAnim.onComplete = function () {
      _states.isSliding = false;
    };

    TweenMax.to(_slides[index], disappearAnim.duration, disappearAnim);
  }

  function _getNextSlide() {
    if (_options.infinite) {
      return (_currentSlide + 1) % _slidesCount;
    }

    return _currentSlide >= _maxSlide ? _maxSlide : _currentSlide + 1;
  }

  function _getPrevSlide() {
    if (_options.infinite) {
      return _currentSlide <= 0 ? _maxSlide : _currentSlide - 1;
    }

    return _currentSlide <= 0 ? 0 : _currentSlide - 1;
  }

  function next() {
    if (_states.isSliding) return;
    _states.isSliding = true;
    _nextSlide = _getNextSlide();

    _disappearSlide(_currentSlide);
    _appearSlide(_nextSlide);

    _currentSlide = _nextSlide;
  }

  function prev() {
    if (_states.isSliding) return;
    _states.isSliding = true;
    _prevSlide = _getPrevSlide();

    _disappearSlide(_currentSlide);
    _appearSlide(_prevSlide);

    _currentSlide = _prevSlide;
  }

  function play(progress) {
    const slide = Math.floor(progress / _progressStep);

    if (slide >= _slidesCount) return;

    if (slide > _currentSlide || slide < _currentSlide) {
      _disappearSlide(_currentSlide);
      _appearSlide(slide);

      _currentSlide = slide;
    }
  }

  function current() {
    return _currentSlide;
  }

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

  function init(selectorOrSlides) {
    if (_states.isInit) return;

    _slides = _getSlides(selectorOrSlides);
    _slidesCount = _slides.length;
    _maxSlide = _slidesCount - 1;
    _progressStep = 1 / _slidesCount;

    if (!_slidesCount) {
      throw new Error("No slides found! Check: " + selectorOrSlides);
    }

    _slides.forEach(function (slide, i) {
      if (_currentSlide === i) {
        TweenMax.set(slide, deepCopy(_options.slideAppearAnim));
      } else {
        TweenMax.set(slide, deepCopy(_options.slideDisappearAnim));
      }
    });

    _states.isInit = true;
  }

  return {
    init: init,
    play: play,
    next: next,
    prev: prev,
    current: current,
  };
};

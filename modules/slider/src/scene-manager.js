import { DEFAULT_OPTIONS, RANDOM_OPTIONS } from "./literals";
import { createQueue, deepCopy, fpsLoop, Numbers } from "./utils";

const throttle = (func, delay = 1000) => {
  let prev = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - prev > delay) {
      prev = now;
      return func(...args);
    }
  };
};

function parseRandom(random, lastSlideIndex) {
  if (!random) return false;

  if (typeof random === "boolean") return [];

  if (typeof random === "string") {
    if (!RANDOM_OPTIONS.includes(random)) {
      throw new Error(
        `Check random option. Just boolean, array of numbers, ${RANDOM_OPTIONS.join(
          ", "
        )} are available!`
      );
    }

    switch (random) {
      case "first":
        return [0];
      case "last":
        return [lastSlideIndex];
      case "first-last":
        return [0, lastSlideIndex];
    }
  }

  return random;
}

function setupOptions(options) {
  if (!options) {
    return DEFAULT_OPTIONS;
  }

  var opts = deepCopy(DEFAULT_OPTIONS);
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      opts[key] = options[key];
    }
  }

  return opts;
}

function getRandomSlideIndex(excludedIndexes, slidesCount) {
  const n = Math.floor(Math.random() * slidesCount);

  if (excludedIndexes.includes(n)) {
    return getRandomSlideIndex(excludedIndexes, slidesCount);
  }

  return n;
}

export default function (options) {
  var _options = setupOptions(options);
  var _states = {
    isInit: false,
    isShowing: false,
    isHiding: false,
  };
  var _root = {
    el: null,
    width: 0,
    height: 0,
  };
  var _holder = {
    el: null,
    width: 0,
    height: 0,
  };
  var _slideEls;
  var _slidesCount;
  var _currentSlideIndex = 0;
  var _prevProgress = 0;
  var _currentProgress = 0;
  var _progressStep;
  var _direction = 1;

  var slidesQueue = createQueue();

  function _trigger(eventName) {
    if (eventName in _options) {
      _options[eventName].apply(null, Array.prototype.slice.call(arguments, 1));
      return true;
    }

    return false;
  }

  function _getSlideEl(index) {
    return _slideEls[index];
  }

  function _hideSlide(index, meta) {
    var slideEl = _getSlideEl(index);

    _trigger("onBeforeLeave", slideEl, meta);

    var done = function done() {
      _trigger("onAfterLeave", slideEl, meta);
      _states.isHiding = false;
    };

    _states.isHiding = _trigger("onLeave", slideEl, done, meta);
  }

  function _showSlide(index, meta) {
    var slideEl = _getSlideEl(index);

    _trigger("onBeforeEnter", slideEl, meta);

    var done = function done() {
      _trigger("onAfterEnter", slideEl, meta);
      _states.isShowing = false;
    };

    _states.isShowing = _trigger("onEnter", slideEl, done, meta);
  }

  function _play(meta) {
    _trigger("onPlay", meta);
  }

  const _addToQueue = throttle((meta) => {
    slidesQueue.enqueue(
      (function (current, next, meta) {
        return function () {
          _play(meta);
          _hideSlide(current, meta);
          _showSlide(next, meta);
        };
      })(meta.currentIndex, meta.nextIndex, meta)
    );
  }, 0);

  function _getNextSlideIndex(progress) {
    const index = Numbers.floatStrip(progress / _progressStep);
    const { random } = _options;

    if (random && !random.includes(index)) {
      return getRandomSlideIndex(
        [_currentSlideIndex].concat(random),
        _slidesCount
      );
    }

    return index;
  }

  function play(progress) {
    progress = Numbers.clampProgress(progress);

    const speed = Math.abs(progress - _prevProgress);

    _direction = _prevProgress > progress ? -1 : 1;
    _prevProgress = progress;

    const progressDelta = Math.abs(progress - _currentProgress);
    if (progressDelta < _progressStep) return;

    let steps = Math.floor(progressDelta / _progressStep);
    while (steps--) {
      _currentProgress = Numbers.floatStrip(
        _currentProgress + _progressStep * _direction
      );

      var meta = {
        nextIndex: _getNextSlideIndex(_currentProgress),
        currentIndex: _currentSlideIndex,
        progress: progress,
        speed: speed,
        direction: _direction,
      };

      _addToQueue(meta);

      _currentSlideIndex = meta.nextIndex;
    }
  }

  function _initSlides() {
    var prevIndex = null;
    _slideEls.forEach(function (slide, i) {
      var meta = {
        prevIndex: prevIndex,
        currentIndex: i,
      };

      slide.style.width = _root.width + "px";
      slide.style.height = _root.height + "px";

      if (_options.carousel) {
        if (_options.isReversed) {
          slide.style.right = _root.width * i + "px";
        } else {
          slide.style.left = _root.width * i + "px";
        }
      }

      if (_currentSlideIndex === i) {
        _trigger("onAppear", slide, meta);
      } else {
        _trigger("onDisappear", slide, meta);
      }

      prevIndex = i;
    });
  }

  function _initSliderSize() {
    var styles = getComputedStyle(_root.el);

    _root.width = parseFloat(styles.width);
    _root.height = parseFloat(styles.height);

    if (_options.carousel) {
      _holder.width = parseFloat(_root.width) * _slidesCount;
      _holder.el.style.width = _holder.width + "px";

      if (_options.isReversed) {
        _holder.el.style.right = 0;
      } else {
        _holder.el.style.left = 0;
      }
    }
  }

  function _onResize() {
    _initSliderSize();
    _initSlides();
  }

  function init() {
    if (_states.isInit) return;

    _root.el = document.querySelector(_options.rootSelector);
    if (!_root.el) {
      throw new Error("No slider found! Check: " + _options.rootSelector);
    }

    _holder.el = _root.el.querySelector(_options.holderSelector);
    _slideEls = Array.prototype.slice.call(
      _root.el.querySelectorAll(_options.slideSelector)
    );
    _slidesCount = _slideEls.length;
    _progressStep = Numbers.floatStrip(1 / _slidesCount);

    if (!_slidesCount) {
      throw new Error("No slides found! Check: " + _options.slideSelector);
    }

    _options.random = parseRandom(_options.random, _slidesCount - 1);

    _onResize();

    window.addEventListener("resize", _onResize);

    fpsLoop(function () {
      if (slidesQueue.isEmpty() || _states.isShowing || _states.isHiding)
        return;

      slidesQueue.dequeue()();
    });

    _states.isInit = true;
  }

  return {
    init: init,
    play: play,
    getSlideEl: function (index) {
      return _getSlideEl(index);
    },

    getRoot: function () {
      return _root;
    },

    setHeight: function (number) {},

    isInited() {
      return _states.isInit;
    },

    getHolder: function () {
      return _holder;
    },

    getCurrentSlideIndex: function () {
      return _currentSlideIndex;
    },

    getDirection: function () {
      return _direction;
    },
  };
}

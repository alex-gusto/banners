import { DEFAULT_OPTIONS, RANDOM_OPTIONS } from "./literals";
import "./styles.css";
import { createQueue, debounce, deepCopy, fpsLoop, Numbers } from "./utils";

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

  const _nav = {
    el: null,
    buttons: [],
  };

  const _arrows = {
    prev: null,
    next: null,
  };

  var _slideEls;
  var _slidesCount;
  var _currentSlideIndex = 0;
  var _currentProgress = 0;
  var _progressStep;
  var _direction = 1;
  const _ranges = [];

  const _navClass = _options.navSelector.replace(".", "");
  const _navButtonClass = `${_navClass}__button`;
  const _navButtonActiveClass = `${_navButtonClass}--active`;

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

  const _addToQueue = (meta) => {
    const { nextIndex, currentIndex } = meta;

    if (nextIndex >= _slidesCount || nextIndex === _currentSlideIndex) return;

    slidesQueue.enqueue(
      (function (current, next, meta) {
        return function () {
          if (_options.nav) _updateActiveNavButton(next);

          _play(meta);
          _hideSlide(current, meta);
          _showSlide(next, meta);
        };
      })(currentIndex, nextIndex, meta)
    );

    _currentSlideIndex = nextIndex;
  };

  function _getNextSlideIndex(progress) {
    const index = _ranges.findIndex(([min, max]) => {
      if (max === 1 && progress === 1) return true;

      return progress >= min && progress < max;
    });

    // const { random } = _options;

    // if (random && !random.includes(index)) {
    //   return getRandomSlideIndex(
    //     [_currentSlideIndex].concat(random),
    //     _slidesCount
    //   );
    // }

    return index;
  }

  const _createNextSlideMeta = (speed = 0, nextIndex) => {
    const _nextIndex =
      nextIndex === undefined
        ? _getNextSlideIndex(_currentProgress)
        : nextIndex;

    return {
      nextIndex: _nextIndex,
      currentIndex: _currentSlideIndex,
      progress: _currentProgress,
      speed,
      direction: _direction,
    };
  };

  const _runSlideChange = debounce((speed) => {
    _addToQueue(_createNextSlideMeta(speed));
  }, _options.skipDelay);

  function play(progress) {
    progress = Numbers.clampProgress(progress);

    const speed = Math.abs(progress - _currentProgress);

    _direction = _currentProgress > progress ? -1 : 1;
    _currentProgress = progress;

    _runSlideChange(speed);
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

  function _initSlideRanges(progressStep, slidesCount) {
    if (_options.ranges) {
      if (slidesCount !== _options.ranges.length) {
        throw new Error(
          `The count of ranges should be the same as count of slides! Ranges count: ${_options.ranges.length}, slides count: ${slidesCount}`
        );
      }

      _ranges.push(..._options.ranges);
      return;
    }

    let i = 0;

    while (i < slidesCount) {
      const min = Numbers.floatStrip(i * progressStep);
      const max = Numbers.floatStrip(i * progressStep + progressStep);

      _ranges.push([min, max]);
      i++;
    }
  }

  function toScene(index) {
    if (index < 0 || index >= _slidesCount) {
      throw new Error(`Slide index: ${index} is not in slides range!`);
    }

    _addToQueue(_createNextSlideMeta(0, index));
  }

  function nextScene() {
    let index = _currentSlideIndex + 1;
    index = index >= _slidesCount ? 0 : index;
    _addToQueue(_createNextSlideMeta(0, index));
  }

  function prevScene() {
    let index = _currentSlideIndex - 1;
    index = index < 0 ? _slidesCount - 1 : index;
    _addToQueue(_createNextSlideMeta(0, index));
  }

  function _updateActiveNavButton(index) {
    _nav.buttons.forEach((b) => b.classList.remove(_navButtonActiveClass));
    _nav.buttons[index].classList.add(_navButtonActiveClass);
  }

  function _initNav() {
    _nav.el = _root.el.querySelector(_options.navSelector);

    if (!_nav.el) {
      _nav.el = document.createElement("div");
      _nav.el.classList.add(_navClass);

      _root.el.appendChild(_nav.el);
    }

    let i = 0;
    while (i < _slidesCount) {
      const el = document.createElement("BUTTON");
      el.classList.add(_navButtonClass);
      el.dataset.index = i;

      if (_currentSlideIndex === i) {
        el.classList.add(_navButtonActiveClass);
      }

      el.addEventListener("click", () => toScene(+el.dataset.index));

      _nav.el.appendChild(el);
      _nav.buttons.push(el);
      i++;
    }
  }

  function _initArrows() {
    const arrowClass = _options.arrowsSelector.replace(".", "");
    const prevArrowClass = `${arrowClass}--prev`;
    const nextArrowClass = `${arrowClass}--next`;

    const createArrow = (className) => {
      const el = document.createElement("BUTTON");
      el.classList.add(arrowClass);
      el.classList.add(className);

      _root.el.appendChild(el);

      return el;
    };

    _arrows.prev = _root.el.querySelector(prevArrowClass);
    _arrows.next = _root.el.querySelector(nextArrowClass);

    if (!_arrows.prev) {
      _arrows.prev = createArrow(prevArrowClass);
      _arrows.prev.innerText = "<";
    }

    if (!_arrows.next) {
      _arrows.next = createArrow(nextArrowClass);
      _arrows.next.innerText = ">";
    }

    _arrows.prev.addEventListener("click", prevScene);
    _arrows.next.addEventListener("click", nextScene);
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
    _slideEls = [..._root.el.querySelectorAll(_options.sceneSelector)];
    _slidesCount = _slideEls.length;

    if (!_slidesCount) {
      throw new Error("No slides found! Check: " + _options.sceneSelector);
    }

    if (_options.nav) {
      _initNav();
    }

    if (_options.arrows) {
      _initArrows();
    }

    _progressStep = 1 / _slidesCount;
    _initSlideRanges(_progressStep, _slidesCount);
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

    toScene,
    nextScene,
    prevScene,
  };
}

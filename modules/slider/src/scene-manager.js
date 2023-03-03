import { initArrows, initNav } from "./core";
import { CHANGE_MODES, DEFAULT_OPTIONS, RANDOM_OPTIONS } from "./literals";
import "./styles.css";
import { Numbers, createQueue, debounce, deepCopy, fpsLoop } from "./utils";

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

  var _nav;

  var _slideEls;
  var _slidesCount;
  var _currentSlideIndex = 0;
  var _realProgressIndex = 0;
  var _currentProgress = 0;
  var _progressStep;
  var _direction = 1;
  const _ranges = [];

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
    return new Promise((resolve) => {
      var slideEl = _getSlideEl(index);

      _trigger("onBeforeLeave", slideEl, meta);

      var done = debounce(function () {
        _trigger("onAfterLeave", slideEl, meta);
        _states.isHiding = false;
        resolve();
      }, 0);

      _states.isHiding = _trigger("onLeave", slideEl, done, meta);
    });
  }

  function _showSlide(index, meta) {
    return new Promise((resolve) => {
      var slideEl = _getSlideEl(index);

      _trigger("onBeforeEnter", slideEl, meta);

      var done = debounce(() => {
        _trigger("onAfterEnter", slideEl, meta);
        _states.isShowing = false;
        resolve();
      }, 0);

      _states.isShowing = _trigger("onEnter", slideEl, done, meta);
    });
  }

  function _play(meta) {
    _trigger("onPlay", meta);
  }

  const _addToQueue = (meta) => {
    const { currentIndex, prevIndex, realIndex } = meta;

    if (realIndex >= _slidesCount || realIndex === _realProgressIndex) return;

    slidesQueue.enqueue(
      (function (current, next, meta) {
        return function () {
          if (_options.nav) _nav.updateActiveNavButton(next);

          _play(meta);

          if (_options.mode === CHANGE_MODES.inOut) {
            _hideSlide(current, meta);
            _showSlide(next, meta);
          }

          if (_options.mode === CHANGE_MODES.outIn) {
            _hideSlide(current, meta).then(() => _showSlide(next, meta));
          }
        };
      })(prevIndex, currentIndex, meta)
    );

    _currentSlideIndex = currentIndex;
    _realProgressIndex = realIndex;
  };

  function _getNextSlideIndex(progress, nextIndex) {
    if (nextIndex !== undefined) {
      return {
        realIndex: nextIndex,
      };
    }

    const realIndex = _ranges.findIndex(([min, max]) => {
      if (max === 1 && progress === 1) return true;

      return progress >= min && progress < max;
    });

    function getRandomIndex() {
      const { random } = _options;

      if (!random || random.includes(realIndex)) return;

      return getRandomSlideIndex(
        [_currentSlideIndex].concat(random),
        _slidesCount
      );
    }

    return {
      realIndex,
      randomIndex: getRandomIndex(),
    };
  }

  const _createNextSlideMeta = (speed = 0, nextIndex) => {
    const { realIndex, randomIndex } = _getNextSlideIndex(
      _currentProgress,
      nextIndex
    );

    return {
      currentIndex: randomIndex !== undefined ? randomIndex : realIndex,
      realIndex,
      prevIndex: _currentSlideIndex,
      progress: _currentProgress,
      speed,
      direction: _direction,
    };
  };

  const _runSlideChange = debounce((speed) => {
    _addToQueue(_createNextSlideMeta(speed));
  }, _options.skipDelay);

  function play(progress) {
    if (progress < 0 || progress > 1) {
      throw new Error(
        "Check progress value. Should be between 0 and 1. Current value is: " +
          progress
      );
    }

    const speed = Math.abs(progress - _currentProgress);

    _direction = _currentProgress > progress ? -1 : 1;
    _currentProgress = progress;

    _runSlideChange(speed);
  }

  function _initSlides() {
    _slideEls.forEach(function (slide, i) {
      var meta = {
        currentIndex: i,
        prevIndex: _currentSlideIndex,
      };

      slide.style.width = _root.width + "px";
      slide.style.height = _root.height + "px";

      if (_currentSlideIndex === i) {
        _trigger("onAppear", slide, meta);
      } else {
        _trigger("onDisappear", slide, meta);
      }
    });
  }

  function _initSliderSize() {
    var styles = getComputedStyle(_root.el);

    _root.width = parseFloat(styles.width);
    _root.height = parseFloat(styles.height);
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
    let index = _realProgressIndex + 1;
    index = index >= _slidesCount ? 0 : index;
    _direction = 1;

    _addToQueue(_createNextSlideMeta(0, index));
  }

  function prevScene() {
    let index = _realProgressIndex - 1;
    index = index < 0 ? _slidesCount - 1 : index;
    _direction = -1;

    _addToQueue(_createNextSlideMeta(0, index));
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
      _nav = initNav(_root.el, {
        navSelector: _options.navSelector,
        slidesCount: _slidesCount,
        currentSlideIndex: _currentSlideIndex,
        onButtonClick(index) {
          console.log({ index });
          toScene(index);
        },
      });
    }

    if (_options.arrows) {
      initArrows(_root.el, {
        arrowsSelector: _options.arrowsSelector,
        onPrevClick: prevScene,
        onNextClick: nextScene,
      });
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

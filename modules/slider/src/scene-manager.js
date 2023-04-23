import {
  getRandomSlideIndex,
  initArrows,
  initNav,
  parseRandom,
  setupOptions,
} from "./core";
import { CHANGE_MODES } from "./core/literals";
import "./styles.css";
import { Dom, Numbers, createQueue, debounce, fpsLoop } from "./utils";

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
  let _ranges;

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
      })(prevIndex, currentIndex, meta),
    );

    _currentSlideIndex = currentIndex;
    _realProgressIndex = realIndex;
  };

  function _getNextSlideIndex() {
    const index = _realProgressIndex + 1;
    return index >= _slidesCount ? 0 : index;
  }

  function _getPrevSlideIndex() {
    const index = _realProgressIndex - 1;
    return index < 0 ? _slidesCount - 1 : index;
  }

  function _getNewSlideIndex(progress, nextIndex) {
    if (nextIndex !== undefined) {
      return {
        realIndex: nextIndex,
      };
    }

    function getRealIndex() {
      if (_ranges) {
        return _ranges.findIndex(([min, max]) => {
          if (max === 1 && progress === 1) return true;

          return progress >= min && progress < max;
        });
      }

      return _direction > 0 ? _getNextSlideIndex() : _getPrevSlideIndex();
    }

    function getRandomIndex(_realIndex) {
      const { random } = _options;

      if (!random || random.includes(_realIndex)) return;

      return getRandomSlideIndex(
        [_currentSlideIndex].concat(random),
        _slidesCount,
      );
    }

    const realIndex = getRealIndex();

    return {
      realIndex,
      randomIndex: getRandomIndex(realIndex),
    };
  }

  const _createSlideMeta = (speed = 0, nextIndex) => {
    const { realIndex, randomIndex } = _getNewSlideIndex(
      _currentProgress,
      nextIndex,
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
    _addToQueue(_createSlideMeta(speed));
  }, _options.skipDelay);

  function play(progress) {
    if (progress < 0 || progress > 1) {
      throw new Error(
        "Check progress value. Should be between 0 and 1. Current value is: " +
          progress,
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
          `The count of ranges should be the same as count of slides! Ranges count: ${_options.ranges.length}, slides count: ${slidesCount}`,
        );
      }

      _ranges = _options.ranges;
      return;
    }

    // Setup default slides' ranges
    if (_options.ranges === undefined) {
      _ranges = [];
      let i = 0;

      while (i < slidesCount) {
        const min = Numbers.floatStrip(i * progressStep);
        const max = Numbers.floatStrip(i * progressStep + progressStep);

        _ranges.push([min, max]);
        i++;
      }
    }
  }

  function toScene(index) {
    if (index < 0 || index >= _slidesCount) {
      throw new Error(`Slide index: ${index} is not in slides range!`);
    }

    _addToQueue(_createSlideMeta(0, index));
  }

  function nextScene() {
    _direction = 1;

    _addToQueue(_createSlideMeta(0, _getNextSlideIndex()));
  }

  function prevScene() {
    _direction = -1;

    _addToQueue(_createSlideMeta(0, _getPrevSlideIndex()));
  }

  function _onResize() {
    _initSliderSize();
    _initSlides();
  }

  function init() {
    if (_states.isInit) return;

    _root.el = Dom.findEl(_options.rootEl);
    if (!_root.el) {
      throw new Error("No slider found! Check: " + _options.rootEl);
    }

    _root.el.style.height = _options.height;

    _holder.el = Dom.findEl(_options.holderEl, _root.el);
    _slideEls = [...Dom.findEls(_options.sceneSelector, _root.el)];
    _slidesCount = _slideEls.length;

    if (!_slidesCount) {
      throw new Error("No slides found! Check: " + _options.sceneSelector);
    }

    if (_options.nav) {
      _nav = initNav(_root.el, {
        navEl: _options.navEl,
        slidesCount: _slidesCount,
        slideEls: _slideEls,
        currentSlideIndex: _currentSlideIndex,
        onButtonClick(index) {
          toScene(index);
        },
      });
    }

    if (_options.arrows) {
      initArrows(_root.el, {
        prevArrowEl: _options.prevArrowEl,
        nextArrowEl: _options.nextArrowEl,
        onPrevClick: prevScene,
        onNextClick: nextScene,
      });
    }

    _progressStep = 1 / _slidesCount;
    _initSlideRanges(_progressStep, _slidesCount);
    _options.random = parseRandom(_options.random, _slidesCount - 1);

    _onResize();

    window.addEventListener("resize", debounce(_onResize, 400));

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

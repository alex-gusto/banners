var Slider = function(options) {
  var deepCopy = function deepCopy(obj) {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (e) {
      return obj;
    }
  };

  var DEFAULT_OPTIONS = {
    rootSelector: ".slider",
    holderSelector: ".slider-holder",
    slideSelector: ".slider-slide",
    carousel: true,
  };

  var _options = _setupOptions(options);
  var _states = {
    isInit: false,
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
  var _progress = 0;
  var _progressStep;
  var _direction = 1;

  function _trigger(eventName) {
    if (eventName in _options) {
      _options[eventName].apply(null, Array.prototype.slice.call(arguments, 1));
    }
  }

  function _setupOptions(options) {
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

  function _getSlideEl(index) {
    return _slideEls[index];
  }

  function _hideSlide(index, meta) {
    var slideEl = _getSlideEl(index);

    _trigger("onBeforeLeave", slideEl, meta);

    var done = function done() {
      _trigger("onAfterLeave", slideEl, meta);
    };

    _trigger("onLeave", slideEl, done, meta);
  }

  function _showSlide(index, meta) {
    var slideEl = _getSlideEl(index);

    _trigger("onBeforeEnter", slideEl, meta);

    var done = function done() {
      _trigger("onAfterEnter", slideEl, meta);
    };

    _trigger("onEnter", slideEl, done, meta);
  }

  function _play(meta) {
    _trigger("onPlay", meta);
  }

  function play(progress) {
    var nextSlideIndex = Math.ceil(progress / _progressStep);
    var speed = Math.abs(progress - _progress) * Math.PI;

    _direction = _progress > progress ? -1 : 1;
    _progress = progress;

    if (nextSlideIndex >= _slidesCount || nextSlideIndex === _currentSlideIndex)
      return;

    _play({
      nextSlideIndex: nextSlideIndex,
      currentIndex: _currentSlideIndex,
      progress: progress,
      speed: speed,
    });

    _hideSlide(_currentSlideIndex, {
      prevIndex: _currentSlideIndex,
      currentIndex: nextSlideIndex,
      progress: progress,
      speed: speed,
    });

    _showSlide(nextSlideIndex, {
      prevIndex: _currentSlideIndex,
      currentIndex: nextSlideIndex,
      progress: progress,
      speed: speed,
    });

    _currentSlideIndex = nextSlideIndex;
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
        slide.style.left = _root.width * i + "px";
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
    _progressStep = 1 / _slidesCount;

    if (!_slidesCount) {
      throw new Error("No slides found! Check: " + _options.slideSelector);
    }

    _onResize();

    window.addEventListener("resize", _onResize);

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
};

(function () {
  var ns = window.InSkin ? window.InSkin : (window.InSkin = {}),
    ISM;
  if (!ns["4.2"]) {
    ns["4.2"] = {};
  }
  ns.$ = jQuery;
  var CDN_URL = "https://cdn.inskinad.com";
  var _,
    Base64,
    EJSON,
    EJSONTest,
    Meteor,
    Package,
    Tracker,
    ReactiveDict,
    ReactiveVar;
  var JSON;
  if (!JSON) {
    JSON = {};
  }
  (function () {
    "use strict";
    function f(n) {
      return n < 10 ? "0" + n : n;
    }
    if (typeof Date.prototype.toJSON !== "function") {
      Date.prototype.toJSON = function (key) {
        return isFinite(this.valueOf())
          ? this.getUTCFullYear() +
              "-" +
              f(this.getUTCMonth() + 1) +
              "-" +
              f(this.getUTCDate()) +
              "T" +
              f(this.getUTCHours()) +
              ":" +
              f(this.getUTCMinutes()) +
              ":" +
              f(this.getUTCSeconds()) +
              "Z"
          : null;
      };
      String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON =
          function (key) {
            return this.valueOf();
          };
    }
    var cx =
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable =
        /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      },
      rep;
    function quote(string) {
      escapable.lastIndex = 0;
      return escapable.test(string)
        ? '"' +
            string.replace(escapable, function (a) {
              var c = meta[a];
              return typeof c === "string"
                ? c
                : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
        : '"' + string + '"';
    }
    function str(key, holder) {
      var i,
        k,
        v,
        length,
        mind = gap,
        partial,
        value = holder[key];
      if (
        value &&
        typeof value === "object" &&
        typeof value.toJSON === "function"
      ) {
        value = value.toJSON(key);
      }
      if (typeof rep === "function") {
        value = rep.call(holder, key, value);
      }
      switch (typeof value) {
        case "string":
          return quote(value);
        case "number":
          return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
          return String(value);
        case "object":
          if (!value) {
            return "null";
          }
          gap += indent;
          partial = [];
          if (Object.prototype.toString.apply(value) === "[object Array]") {
            length = value.length;
            for (i = 0; i < length; i += 1) {
              partial[i] = str(i, value) || "null";
            }
            v =
              partial.length === 0
                ? "[]"
                : gap
                ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                : "[" + partial.join(",") + "]";
            gap = mind;
            return v;
          }
          if (rep && typeof rep === "object") {
            length = rep.length;
            for (i = 0; i < length; i += 1) {
              if (typeof rep[i] === "string") {
                k = rep[i];
                v = str(k, value);
                if (v) {
                  partial.push(quote(k) + (gap ? ": " : ":") + v);
                }
              }
            }
          } else {
            for (k in value) {
              if (Object.prototype.hasOwnProperty.call(value, k)) {
                v = str(k, value);
                if (v) {
                  partial.push(quote(k) + (gap ? ": " : ":") + v);
                }
              }
            }
          }
          v =
            partial.length === 0
              ? "{}"
              : gap
              ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
              : "{" + partial.join(",") + "}";
          gap = mind;
          return v;
      }
    }
  })();
  (function (
    window,
    document,
    location,
    setTimeout,
    decodeURIComponent,
    encodeURIComponent
  ) {
    var global = this;
    var channelId = Math.floor(Math.random() * 1e4);
    var emptyFn = Function.prototype;
    var reURI = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/;
    var reParent = /[\-\w]+\/\.\.\//;
    var reDoubleSlash = /([^:])\/\//g;
    var namespace = "";
    var easyXDM = {};
    var _easyXDM = window.easyXDM;
    var IFRAME_PREFIX = "easyXDM_";
    var HAS_NAME_PROPERTY_BUG;
    var useHash = false;
    var flashVersion;
    var HAS_FLASH_THROTTLED_BUG;
    function isHostMethod(object, property) {
      var t = typeof object[property];
      return (
        t == "function" ||
        !!(t == "object" && object[property]) ||
        t == "unknown"
      );
    }
    function isHostObject(object, property) {
      return !!(typeof object[property] == "object" && object[property]);
    }
    function isArray(o) {
      return Object.prototype.toString.call(o) === "[object Array]";
    }
    function hasFlash() {
      var name = "Shockwave Flash",
        mimeType = "application/x-shockwave-flash";
      if (
        !undef(navigator.plugins) &&
        typeof navigator.plugins[name] == "object"
      ) {
        var description = navigator.plugins[name].description;
        if (
          description &&
          !undef(navigator.mimeTypes) &&
          navigator.mimeTypes[mimeType] &&
          navigator.mimeTypes[mimeType].enabledPlugin
        ) {
          flashVersion = description.match(/\d+/g);
        }
      }
      if (!flashVersion) {
        var flash;
        try {
          flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
          flashVersion = Array.prototype.slice.call(
            flash.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/),
            1
          );
          flash = null;
        } catch (notSupportedException) {}
      }
      if (!flashVersion) {
        return false;
      }
      var major = parseInt(flashVersion[0], 10),
        minor = parseInt(flashVersion[1], 10);
      HAS_FLASH_THROTTLED_BUG = major > 9 && minor > 0;
      return true;
    }
    var on, un;
    if (isHostMethod(window, "addEventListener")) {
      on = function (target, type, listener) {
        target.addEventListener(type, listener, false);
      };
      un = function (target, type, listener) {
        target.removeEventListener(type, listener, false);
      };
    } else if (isHostMethod(window, "attachEvent")) {
      on = function (object, sEvent, fpNotify) {
        object.attachEvent("on" + sEvent, fpNotify);
      };
      un = function (object, sEvent, fpNotify) {
        object.detachEvent("on" + sEvent, fpNotify);
      };
    } else {
      throw new Error("Browser not supported");
    }
    var domIsReady = false,
      domReadyQueue = [],
      readyState;
    if ("readyState" in document) {
      readyState = document.readyState;
      domIsReady =
        readyState == "complete" ||
        (~navigator.userAgent.indexOf("AppleWebKit/") &&
          (readyState == "loaded" || readyState == "interactive"));
    } else {
      domIsReady = !!document.body;
    }
    function dom_onReady() {
      if (domIsReady) {
        return;
      }
      domIsReady = true;
      for (var i = 0; i < domReadyQueue.length; i++) {
        domReadyQueue[i]();
      }
      domReadyQueue.length = 0;
    }
    if (!domIsReady) {
      if (isHostMethod(window, "addEventListener")) {
        on(document, "DOMContentLoaded", dom_onReady);
      } else {
        on(document, "readystatechange", function () {
          if (document.readyState == "complete") {
            dom_onReady();
          }
        });
        if (document.documentElement.doScroll && window === top) {
          var doScrollCheck = function () {
            if (domIsReady) {
              return;
            }
            try {
              document.documentElement.doScroll("left");
            } catch (e) {
              setTimeout(doScrollCheck, 1);
              return;
            }
            dom_onReady();
          };
          doScrollCheck();
        }
      }
      on(window, "load", dom_onReady);
    }
    function whenReady(fn, scope) {
      if (domIsReady) {
        fn.call(scope);
        return;
      }
      domReadyQueue.push(function () {
        fn.call(scope);
      });
    }
    function getParentObject() {
      var obj = parent;
      if (namespace !== "") {
        for (var i = 0, ii = namespace.split("."); i < ii.length; i++) {
          obj = obj[ii[i]];
        }
      }
      return obj.easyXDM;
    }
    function noConflict(ns) {
      window.easyXDM = _easyXDM;
      namespace = ns;
      if (namespace) {
        IFRAME_PREFIX = "easyXDM_" + namespace.replace(".", "_") + "_";
      }
      return easyXDM;
    }
    function getDomainName(url) {
      return url.match(reURI)[3];
    }
    function getPort(url) {
      return url.match(reURI)[4] || "";
    }
    function getLocation(url) {
      var m = url.toLowerCase().match(reURI);
      var proto = m[2],
        domain = m[3],
        port = m[4] || "";
      if (
        (proto == "http:" && port == ":80") ||
        (proto == "https:" && port == ":443")
      ) {
        port = "";
      }
      return proto + "//" + domain + port;
    }
    function resolveUrl(url) {
      url = url.replace(reDoubleSlash, "$1/");
      if (url.match(/^\/\//)) {
        url = location.protocol + url;
      }
      if (!url.match(/^(http||https):\/\//)) {
        var path = url.substring(0, 1) === "/" ? "" : location.pathname;
        if (path.substring(path.length - 1) !== "/") {
          path = path.substring(0, path.lastIndexOf("/") + 1);
        }
        url = location.protocol + "//" + location.host + path + url;
      }
      while (reParent.test(url)) {
        url = url.replace(reParent, "");
      }
      return url;
    }
    function appendQueryParameters(url, parameters) {
      var hash = "",
        indexOf = url.indexOf("#");
      if (indexOf !== -1) {
        hash = url.substring(indexOf);
        url = url.substring(0, indexOf);
      }
      var q = [];
      for (var key in parameters) {
        if (parameters.hasOwnProperty(key)) {
          q.push(key + "=" + encodeURIComponent(parameters[key]));
        }
      }
      return (
        url +
        (useHash ? "#" : url.indexOf("?") == -1 ? "?" : "&") +
        q.join("&") +
        hash
      );
    }
    var query = (function (input) {
      input = input.substring(1).split("&");
      var data = {},
        pair,
        i = input.length;
      while (i--) {
        pair = input[i].split("=");
        data[pair[0]] = decodeURIComponent(pair[1]);
      }
      return data;
    })(/xdm_e=/.test(location.search) ? location.search : location.hash);
    function undef(v) {
      return typeof v === "undefined";
    }
    var getJSON = function () {
      var cached = {};
      var obj = { a: [1, 2, 3] },
        json = '{"a":[1,2,3]}';
      if (
        typeof JSON != "undefined" &&
        typeof JSON.stringify === "function" &&
        JSON.stringify(obj).replace(/\s/g, "") === json
      ) {
        return JSON;
      }
      if (Object.toJSON) {
        if (Object.toJSON(obj).replace(/\s/g, "") === json) {
          cached.stringify = Object.toJSON;
        }
      }
      if (typeof String.prototype.evalJSON === "function") {
        obj = json.evalJSON();
        if (obj.a && obj.a.length === 3 && obj.a[2] === 3) {
          cached.parse = function (str) {
            return str.evalJSON();
          };
        }
      }
      if (cached.stringify && cached.parse) {
        getJSON = function () {
          return cached;
        };
        return cached;
      }
      return null;
    };
    function apply(destination, source, noOverwrite) {
      var member;
      for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
          if (prop in destination) {
            member = source[prop];
            if (typeof member === "object") {
              apply(destination[prop], member, noOverwrite);
            } else if (!noOverwrite) {
              destination[prop] = source[prop];
            }
          } else {
            destination[prop] = source[prop];
          }
        }
      }
      return destination;
    }
    function testForNamePropertyBug() {
      var form = document.body.appendChild(document.createElement("form")),
        input = form.appendChild(document.createElement("input"));
      input.name = IFRAME_PREFIX + "TEST" + channelId;
      HAS_NAME_PROPERTY_BUG = input !== form.elements[input.name];
      document.body.removeChild(form);
    }
    function createFrame(config) {
      if (undef(HAS_NAME_PROPERTY_BUG)) {
        testForNamePropertyBug();
      }
      var frame;
      if (HAS_NAME_PROPERTY_BUG) {
        frame = document.createElement(
          '<iframe name="' + config.props.name + '"/>'
        );
      } else {
        frame = document.createElement("IFRAME");
        frame.name = config.props.name;
      }
      frame.id = frame.name = config.props.name;
      delete config.props.name;
      if (typeof config.container == "string") {
        config.container = document.getElementById(config.container);
      }
      if (!config.container) {
        apply(frame.style, {
          position: "absolute",
          top: "-2000px",
          left: "0px",
        });
        config.container = document.body;
      }
      var src = config.props.src;
      config.props.src = "javascript:false";
      apply(frame, config.props);
      frame.border = frame.frameBorder = 0;
      frame.allowTransparency = true;
      frame.setAttribute("allowfullscreen", "true");
      frame.setAttribute("webkitallowfullscreen", "true");
      frame.setAttribute("mozallowfullscreen", "true");
      config.container.appendChild(frame);
      if (config.onLoad) {
        on(frame, "load", config.onLoad);
      }
      if (config.usePost) {
        var form = config.container.appendChild(document.createElement("form")),
          input;
        form.target = frame.name;
        form.action = src;
        form.method = "POST";
        if (typeof config.usePost === "object") {
          for (var i in config.usePost) {
            if (config.usePost.hasOwnProperty(i)) {
              if (HAS_NAME_PROPERTY_BUG) {
                input = document.createElement('<input name="' + i + '"/>');
              } else {
                input = document.createElement("INPUT");
                input.name = i;
              }
              input.value = config.usePost[i];
              form.appendChild(input);
            }
          }
        }
        form.submit();
        form.parentNode.removeChild(form);
      } else {
        frame.src = src;
      }
      config.props.src = src;
      return frame;
    }
    function checkAcl(acl, domain) {
      if (typeof acl == "string") {
        acl = [acl];
      }
      var re,
        i = acl.length;
      while (i--) {
        re = acl[i];
        re = new RegExp(
          re.substr(0, 1) == "^"
            ? re
            : "^" + re.replace(/(\*)/g, ".$1").replace(/\?/g, ".") + "$"
        );
        if (re.test(domain)) {
          return true;
        }
      }
      return false;
    }
    function prepareTransportStack(config) {
      var protocol = config.protocol,
        stackEls;
      config.isHost = config.isHost || undef(query.xdm_p);
      useHash = config.hash || false;
      if (!config.props) {
        config.props = {};
      }
      if (!config.isHost) {
        config.channel = query.xdm_c.replace(/["'<>\\]/g, "");
        config.secret = query.xdm_s;
        config.remote = query.xdm_e.replace(/["'<>\\]/g, "");
        protocol = query.xdm_p;
        if (config.acl && !checkAcl(config.acl, config.remote)) {
          throw new Error("Access denied for " + config.remote);
        }
      } else {
        config.remote = resolveUrl(config.remote);
        config.channel = config.channel || "default" + channelId++;
        config.secret = Math.random().toString(16).substring(2);
        if (undef(protocol)) {
          if (getLocation(location.href) == getLocation(config.remote)) {
            protocol = "4";
          } else if (
            isHostMethod(window, "postMessage") ||
            isHostMethod(document, "postMessage")
          ) {
            protocol = "1";
          } else if (
            config.swf &&
            isHostMethod(window, "ActiveXObject") &&
            hasFlash()
          ) {
            protocol = "6";
          } else if (
            navigator.product === "Gecko" &&
            "frameElement" in window &&
            navigator.userAgent.indexOf("WebKit") == -1
          ) {
            protocol = "5";
          } else if (config.remoteHelper) {
            protocol = "2";
          } else {
            protocol = "0";
          }
        }
      }
      config.protocol = protocol;
      switch (protocol) {
        case "0":
          apply(
            config,
            {
              interval: 100,
              delay: 2e3,
              useResize: true,
              useParent: false,
              usePolling: false,
            },
            true
          );
          if (config.isHost) {
            if (!config.local) {
              var domain = location.protocol + "//" + location.host,
                images = document.body.getElementsByTagName("img"),
                image;
              var i = images.length;
              while (i--) {
                image = images[i];
                if (image.src.substring(0, domain.length) === domain) {
                  config.local = image.src;
                  break;
                }
              }
              if (!config.local) {
                config.local = window;
              }
            }
            var parameters = { xdm_c: config.channel, xdm_p: 0 };
            if (config.local === window) {
              config.usePolling = true;
              config.useParent = true;
              config.local =
                location.protocol +
                "//" +
                location.host +
                location.pathname +
                location.search;
              parameters.xdm_e = config.local;
              parameters.xdm_pa = 1;
            } else {
              parameters.xdm_e = resolveUrl(config.local);
            }
            if (config.container) {
              config.useResize = false;
              parameters.xdm_po = 1;
            }
            config.remote = appendQueryParameters(config.remote, parameters);
          } else {
            apply(config, {
              channel: query.xdm_c,
              remote: query.xdm_e,
              useParent: !undef(query.xdm_pa),
              usePolling: !undef(query.xdm_po),
              useResize: config.useParent ? false : config.useResize,
            });
          }
          stackEls = [
            new easyXDM.stack.HashTransport(config),
            new easyXDM.stack.ReliableBehavior({}),
            new easyXDM.stack.QueueBehavior({
              encode: true,
              maxLength: 4e3 - config.remote.length,
            }),
            new easyXDM.stack.VerifyBehavior({ initiate: config.isHost }),
          ];
          break;
        case "1":
          stackEls = [new easyXDM.stack.PostMessageTransport(config)];
          break;
        case "2":
          if (config.isHost) {
            config.remoteHelper = resolveUrl(config.remoteHelper);
          }
          stackEls = [
            new easyXDM.stack.NameTransport(config),
            new easyXDM.stack.QueueBehavior(),
            new easyXDM.stack.VerifyBehavior({ initiate: config.isHost }),
          ];
          break;
        case "3":
          stackEls = [new easyXDM.stack.NixTransport(config)];
          break;
        case "4":
          stackEls = [new easyXDM.stack.SameOriginTransport(config)];
          break;
        case "5":
          stackEls = [new easyXDM.stack.FrameElementTransport(config)];
          break;
        case "6":
          if (!flashVersion) {
            hasFlash();
          }
          stackEls = [new easyXDM.stack.FlashTransport(config)];
          break;
      }
      stackEls.push(
        new easyXDM.stack.QueueBehavior({ lazy: config.lazy, remove: true })
      );
      return stackEls;
    }
    function chainStack(stackElements) {
      var stackEl,
        defaults = {
          incoming: function (message, origin) {
            this.up.incoming(message, origin);
          },
          outgoing: function (message, recipient) {
            this.down.outgoing(message, recipient);
          },
          callback: function (success) {
            this.up.callback(success);
          },
          init: function () {
            this.down.init();
          },
          destroy: function () {
            this.down.destroy();
          },
        };
      for (var i = 0, len = stackElements.length; i < len; i++) {
        stackEl = stackElements[i];
        apply(stackEl, defaults, true);
        if (i !== 0) {
          stackEl.down = stackElements[i - 1];
        }
        if (i !== len - 1) {
          stackEl.up = stackElements[i + 1];
        }
      }
      return stackEl;
    }
    function removeFromStack(element) {
      element.up.down = element.down;
      element.down.up = element.up;
      element.up = element.down = null;
    }
    apply(easyXDM, {
      version: "2.4.18.25",
      query: query,
      stack: {},
      apply: apply,
      getJSONObject: getJSON,
      whenReady: whenReady,
      noConflict: noConflict,
    });
    easyXDM.DomHelper = {
      on: on,
      un: un,
      requiresJSON: function (path) {
        if (!isHostObject(window, "JSON")) {
          document.write(
            "<" +
              'script type="text/javascript" src="' +
              path +
              '"><' +
              "/script>"
          );
        }
      },
    };
    (function () {
      var _map = {};
      easyXDM.Fn = {
        set: function (name, fn) {
          _map[name] = fn;
        },
        get: function (name, del) {
          var fn = _map[name];
          if (del) {
            delete _map[name];
          }
          return fn;
        },
      };
    })();
    easyXDM.Socket = function (config) {
      var stack = chainStack(
          prepareTransportStack(config).concat([
            {
              incoming: function (message, origin) {
                config.onMessage(message, origin);
              },
              callback: function (success) {
                if (config.onReady) {
                  config.onReady(success);
                }
              },
            },
          ])
        ),
        recipient = getLocation(config.remote);
      this.origin = getLocation(config.remote);
      this.destroy = function () {
        stack.destroy();
      };
      this.postMessage = function (message) {
        stack.outgoing(message, recipient);
      };
      stack.init();
    };
    easyXDM.Rpc = function (config, jsonRpcConfig) {
      if (jsonRpcConfig.local) {
        for (var method in jsonRpcConfig.local) {
          if (jsonRpcConfig.local.hasOwnProperty(method)) {
            var member = jsonRpcConfig.local[method];
            if (typeof member === "function") {
              jsonRpcConfig.local[method] = { method: member };
            }
          }
        }
      }
      var stack = chainStack(
        prepareTransportStack(config).concat([
          new easyXDM.stack.RpcBehavior(this, jsonRpcConfig),
          {
            callback: function (success) {
              if (config.onReady) {
                config.onReady(success);
              }
            },
          },
        ])
      );
      this.origin = getLocation(config.remote);
      this.destroy = function () {
        stack.destroy();
      };
      stack.init();
    };
    easyXDM.stack.SameOriginTransport = function (config) {
      var pub, frame, send, targetOrigin;
      return (pub = {
        outgoing: function (message, domain, fn) {
          send(message);
          if (fn) {
            fn();
          }
        },
        destroy: function () {
          if (frame) {
            frame.parentNode.removeChild(frame);
            frame = null;
          }
        },
        onDOMReady: function () {
          targetOrigin = getLocation(config.remote);
          if (config.isHost) {
            apply(config.props, {
              src: appendQueryParameters(config.remote, {
                xdm_e:
                  location.protocol + "//" + location.host + location.pathname,
                xdm_c: config.channel,
                xdm_p: 4,
              }),
              name: IFRAME_PREFIX + config.channel + "_provider",
            });
            frame = createFrame(config);
            easyXDM.Fn.set(config.channel, function (sendFn) {
              send = sendFn;
              setTimeout(function () {
                pub.up.callback(true);
              }, 0);
              return function (msg) {
                pub.up.incoming(msg, targetOrigin);
              };
            });
          } else {
            send = getParentObject().Fn.get(
              config.channel,
              true
            )(function (msg) {
              pub.up.incoming(msg, targetOrigin);
            });
            setTimeout(function () {
              pub.up.callback(true);
            }, 0);
          }
        },
        init: function () {
          whenReady(pub.onDOMReady, pub);
        },
      });
    };
    easyXDM.stack.FlashTransport = function (config) {
      var pub, frame, send, targetOrigin, swf, swfContainer;
      function onMessage(message, origin) {
        setTimeout(function () {
          pub.up.incoming(message, targetOrigin);
        }, 0);
      }
      function addSwf(domain) {
        var url = config.swf + "?host=" + config.isHost;
        var id = "easyXDM_swf_" + Math.floor(Math.random() * 1e4);
        easyXDM.Fn.set(
          "flash_loaded" + domain.replace(/[\-.]/g, "_"),
          function () {
            easyXDM.stack.FlashTransport[domain].swf = swf =
              swfContainer.firstChild;
            var queue = easyXDM.stack.FlashTransport[domain].queue;
            for (var i = 0; i < queue.length; i++) {
              queue[i]();
            }
            queue.length = 0;
          }
        );
        if (config.swfContainer) {
          swfContainer =
            typeof config.swfContainer == "string"
              ? document.getElementById(config.swfContainer)
              : config.swfContainer;
        } else {
          swfContainer = document.createElement("div");
          apply(
            swfContainer.style,
            HAS_FLASH_THROTTLED_BUG && config.swfNoThrottle
              ? {
                  height: "20px",
                  width: "20px",
                  position: "fixed",
                  right: 0,
                  top: 0,
                }
              : {
                  height: "1px",
                  width: "1px",
                  position: "absolute",
                  overflow: "hidden",
                  right: 0,
                  top: 0,
                }
          );
          document.body.appendChild(swfContainer);
        }
        var flashVars =
          "callback=flash_loaded" +
          encodeURIComponent(domain.replace(/[\-.]/g, "_")) +
          "&proto=" +
          global.location.protocol +
          "&domain=" +
          encodeURIComponent(getDomainName(global.location.href)) +
          "&port=" +
          encodeURIComponent(getPort(global.location.href)) +
          "&ns=" +
          encodeURIComponent(namespace);
        swfContainer.innerHTML =
          "<object height='20' width='20' type='application/x-shockwave-flash' id='" +
          id +
          "' data='" +
          url +
          "'>" +
          "<param name='allowScriptAccess' value='always'></param>" +
          "<param name='wmode' value='transparent'>" +
          "<param name='movie' value='" +
          url +
          "'></param>" +
          "<param name='flashvars' value='" +
          flashVars +
          "'></param>" +
          "<embed type='application/x-shockwave-flash' FlashVars='" +
          flashVars +
          "' allowScriptAccess='always' wmode='transparent' src='" +
          url +
          "' height='1' width='1'></embed>" +
          "</object>";
      }
      return (pub = {
        outgoing: function (message, domain, fn) {
          swf.postMessage(config.channel, message.toString());
          if (fn) {
            fn();
          }
        },
        destroy: function () {
          try {
            swf.destroyChannel(config.channel);
          } catch (e) {}
          swf = null;
          if (frame) {
            frame.parentNode.removeChild(frame);
            frame = null;
          }
        },
        onDOMReady: function () {
          targetOrigin = config.remote;
          easyXDM.Fn.set("flash_" + config.channel + "_init", function () {
            setTimeout(function () {
              pub.up.callback(true);
            });
          });
          easyXDM.Fn.set("flash_" + config.channel + "_onMessage", onMessage);
          config.swf = resolveUrl(config.swf);
          var swfdomain = getDomainName(config.swf);
          var fn = function () {
            easyXDM.stack.FlashTransport[swfdomain].init = true;
            swf = easyXDM.stack.FlashTransport[swfdomain].swf;
            swf.createChannel(
              config.channel,
              config.secret,
              getLocation(config.remote),
              config.isHost
            );
            if (config.isHost) {
              if (HAS_FLASH_THROTTLED_BUG && config.swfNoThrottle) {
                apply(config.props, {
                  position: "fixed",
                  right: 0,
                  top: 0,
                  height: "20px",
                  width: "20px",
                });
              }
              apply(config.props, {
                src: appendQueryParameters(config.remote, {
                  xdm_e: getLocation(location.href),
                  xdm_c: config.channel,
                  xdm_p: 6,
                  xdm_s: config.secret,
                }),
                name: IFRAME_PREFIX + config.channel + "_provider",
              });
              frame = createFrame(config);
            }
          };
          if (
            easyXDM.stack.FlashTransport[swfdomain] &&
            easyXDM.stack.FlashTransport[swfdomain].init
          ) {
            fn();
          } else {
            if (!easyXDM.stack.FlashTransport[swfdomain]) {
              easyXDM.stack.FlashTransport[swfdomain] = { queue: [fn] };
              addSwf(swfdomain);
            } else {
              easyXDM.stack.FlashTransport[swfdomain].queue.push(fn);
            }
          }
        },
        init: function () {
          whenReady(pub.onDOMReady, pub);
        },
      });
    };
    easyXDM.stack.PostMessageTransport = function (config) {
      var pub, frame, callerWindow, targetOrigin;
      function _getOrigin(event) {
        if (event.origin) {
          return getLocation(event.origin);
        }
        if (event.uri) {
          return getLocation(event.uri);
        }
        if (event.domain) {
          return location.protocol + "//" + event.domain;
        }
        throw "Unable to retrieve the origin of the event";
      }
      function _window_onMessage(event) {
        if (typeof event.data != "string") {
          return;
        }
        var origin = _getOrigin(event);
        if (
          origin == targetOrigin &&
          event.data.substring(0, config.channel.length + 1) ==
            config.channel + " "
        ) {
          pub.up.incoming(
            event.data.substring(config.channel.length + 1),
            origin
          );
        }
      }
      return (pub = {
        outgoing: function (message, domain, fn) {
          callerWindow.postMessage(
            config.channel + " " + message,
            domain || targetOrigin
          );
          if (fn) {
            fn();
          }
        },
        destroy: function () {
          un(window, "message", _window_onMessage);
          if (frame) {
            callerWindow = null;
            frame.parentNode.removeChild(frame);
            frame = null;
          }
        },
        onDOMReady: function () {
          targetOrigin = getLocation(config.remote);
          if (config.isHost) {
            var waitForReady = function (event) {
              if (event.data == config.channel + "-ready") {
                callerWindow =
                  "postMessage" in frame.contentWindow
                    ? frame.contentWindow
                    : frame.contentWindow.document;
                un(window, "message", waitForReady);
                on(window, "message", _window_onMessage);
                setTimeout(function () {
                  pub.up.callback(true);
                }, 0);
              }
            };
            on(window, "message", waitForReady);
            apply(config.props, {
              src: appendQueryParameters(config.remote, {
                xdm_e: getLocation(location.href),
                xdm_c: config.channel,
                xdm_p: 1,
              }),
              name: IFRAME_PREFIX + config.channel + "_provider",
            });
            frame = createFrame(config);
          } else {
            on(window, "message", _window_onMessage);
            callerWindow =
              "postMessage" in window.parent
                ? window.parent
                : window.parent.document;
            callerWindow.postMessage(config.channel + "-ready", targetOrigin);
            setTimeout(function () {
              pub.up.callback(true);
            }, 0);
          }
        },
        init: function () {
          whenReady(pub.onDOMReady, pub);
        },
      });
    };
    easyXDM.stack.FrameElementTransport = function (config) {
      var pub, frame, send, targetOrigin;
      return (pub = {
        outgoing: function (message, domain, fn) {
          send.call(this, message);
          if (fn) {
            fn();
          }
        },
        destroy: function () {
          if (frame) {
            frame.parentNode.removeChild(frame);
            frame = null;
          }
        },
        onDOMReady: function () {
          targetOrigin = getLocation(config.remote);
          if (config.isHost) {
            apply(config.props, {
              src: appendQueryParameters(config.remote, {
                xdm_e: getLocation(location.href),
                xdm_c: config.channel,
                xdm_p: 5,
              }),
              name: IFRAME_PREFIX + config.channel + "_provider",
            });
            frame = createFrame(config);
            frame.fn = function (sendFn) {
              delete frame.fn;
              send = sendFn;
              setTimeout(function () {
                pub.up.callback(true);
              }, 0);
              return function (msg) {
                pub.up.incoming(msg, targetOrigin);
              };
            };
          } else {
            if (
              document.referrer &&
              getLocation(document.referrer) != query.xdm_e
            ) {
              window.top.location = query.xdm_e;
            }
            send = window.frameElement.fn(function (msg) {
              pub.up.incoming(msg, targetOrigin);
            });
            pub.up.callback(true);
          }
        },
        init: function () {
          whenReady(pub.onDOMReady, pub);
        },
      });
    };
    easyXDM.stack.NameTransport = function (config) {
      var pub;
      var isHost,
        callerWindow,
        remoteWindow,
        readyCount,
        callback,
        remoteOrigin,
        remoteUrl;
      function _sendMessage(message) {
        var url =
          config.remoteHelper + (isHost ? "#_3" : "#_2") + config.channel;
        callerWindow.contentWindow.sendMessage(message, url);
      }
      function _onReady() {
        if (isHost) {
          if (++readyCount === 2 || !isHost) {
            pub.up.callback(true);
          }
        } else {
          _sendMessage("ready");
          pub.up.callback(true);
        }
      }
      function _onMessage(message) {
        pub.up.incoming(message, remoteOrigin);
      }
      function _onLoad() {
        if (callback) {
          setTimeout(function () {
            callback(true);
          }, 0);
        }
      }
      return (pub = {
        outgoing: function (message, domain, fn) {
          callback = fn;
          _sendMessage(message);
        },
        destroy: function () {
          callerWindow.parentNode.removeChild(callerWindow);
          callerWindow = null;
          if (isHost) {
            remoteWindow.parentNode.removeChild(remoteWindow);
            remoteWindow = null;
          }
        },
        onDOMReady: function () {
          isHost = config.isHost;
          readyCount = 0;
          remoteOrigin = getLocation(config.remote);
          config.local = resolveUrl(config.local);
          if (isHost) {
            easyXDM.Fn.set(config.channel, function (message) {
              if (isHost && message === "ready") {
                easyXDM.Fn.set(config.channel, _onMessage);
                _onReady();
              }
            });
            remoteUrl = appendQueryParameters(config.remote, {
              xdm_e: config.local,
              xdm_c: config.channel,
              xdm_p: 2,
            });
            apply(config.props, {
              src: remoteUrl + "#" + config.channel,
              name: IFRAME_PREFIX + config.channel + "_provider",
            });
            remoteWindow = createFrame(config);
          } else {
            config.remoteHelper = config.remote;
            easyXDM.Fn.set(config.channel, _onMessage);
          }
          var onLoad = function () {
            var w = callerWindow || this;
            un(w, "load", onLoad);
            easyXDM.Fn.set(config.channel + "_load", _onLoad);
            (function test() {
              if (typeof w.contentWindow.sendMessage == "function") {
                _onReady();
              } else {
                setTimeout(test, 50);
              }
            })();
          };
          callerWindow = createFrame({
            props: { src: config.local + "#_4" + config.channel },
            onLoad: onLoad,
          });
        },
        init: function () {
          whenReady(pub.onDOMReady, pub);
        },
      });
    };
    easyXDM.stack.HashTransport = function (config) {
      var pub;
      var me = this,
        isHost,
        _timer,
        pollInterval,
        _lastMsg,
        _msgNr,
        _listenerWindow,
        _callerWindow;
      var useParent, _remoteOrigin;
      function _sendMessage(message) {
        if (!_callerWindow) {
          return;
        }
        var url = config.remote + "#" + _msgNr++ + "_" + message;
        (isHost || !useParent
          ? _callerWindow.contentWindow
          : _callerWindow
        ).location = url;
      }
      function _handleHash(hash) {
        _lastMsg = hash;
        pub.up.incoming(
          _lastMsg.substring(_lastMsg.indexOf("_") + 1),
          _remoteOrigin
        );
      }
      function _pollHash() {
        if (!_listenerWindow) {
          return;
        }
        var href = _listenerWindow.location.href,
          hash = "",
          indexOf = href.indexOf("#");
        if (indexOf != -1) {
          hash = href.substring(indexOf);
        }
        if (hash && hash != _lastMsg) {
          _handleHash(hash);
        }
      }
      function _attachListeners() {
        _timer = setInterval(_pollHash, pollInterval);
      }
      return (pub = {
        outgoing: function (message, domain) {
          _sendMessage(message);
        },
        destroy: function () {
          window.clearInterval(_timer);
          if (isHost || !useParent) {
            _callerWindow.parentNode.removeChild(_callerWindow);
          }
          _callerWindow = null;
        },
        onDOMReady: function () {
          isHost = config.isHost;
          pollInterval = config.interval;
          _lastMsg = "#" + config.channel;
          _msgNr = 0;
          useParent = config.useParent;
          _remoteOrigin = getLocation(config.remote);
          if (isHost) {
            apply(config.props, {
              src: config.remote,
              name: IFRAME_PREFIX + config.channel + "_provider",
            });
            if (useParent) {
              config.onLoad = function () {
                _listenerWindow = window;
                _attachListeners();
                pub.up.callback(true);
              };
            } else {
              var tries = 0,
                max = config.delay / 50;
              (function getRef() {
                if (++tries > max) {
                  throw new Error("Unable to reference listenerwindow");
                }
                try {
                  _listenerWindow =
                    _callerWindow.contentWindow.frames[
                      IFRAME_PREFIX + config.channel + "_consumer"
                    ];
                } catch (ex) {}
                if (_listenerWindow) {
                  _attachListeners();
                  pub.up.callback(true);
                } else {
                  setTimeout(getRef, 50);
                }
              })();
            }
            _callerWindow = createFrame(config);
          } else {
            _listenerWindow = window;
            _attachListeners();
            if (useParent) {
              _callerWindow = parent;
              pub.up.callback(true);
            } else {
              apply(config, {
                props: {
                  src: config.remote + "#" + config.channel + new Date(),
                  name: IFRAME_PREFIX + config.channel + "_consumer",
                },
                onLoad: function () {
                  pub.up.callback(true);
                },
              });
              _callerWindow = createFrame(config);
            }
          }
        },
        init: function () {
          whenReady(pub.onDOMReady, pub);
        },
      });
    };
    easyXDM.stack.ReliableBehavior = function (config) {
      var pub, callback;
      var idOut = 0,
        idIn = 0,
        currentMessage = "";
      return (pub = {
        incoming: function (message, origin) {
          var indexOf = message.indexOf("_"),
            ack = message.substring(0, indexOf).split(",");
          message = message.substring(indexOf + 1);
          if (ack[0] == idOut) {
            currentMessage = "";
            if (callback) {
              callback(true);
            }
          }
          if (message.length > 0) {
            pub.down.outgoing(
              ack[1] + "," + idOut + "_" + currentMessage,
              origin
            );
            if (idIn != ack[1]) {
              idIn = ack[1];
              pub.up.incoming(message, origin);
            }
          }
        },
        outgoing: function (message, origin, fn) {
          currentMessage = message;
          callback = fn;
          pub.down.outgoing(idIn + "," + ++idOut + "_" + message, origin);
        },
      });
    };
    easyXDM.stack.QueueBehavior = function (config) {
      var pub,
        queue = [],
        waiting = true,
        incoming = "",
        destroying,
        maxLength = 0,
        lazy = false,
        doFragment = false;
      function dispatch() {
        if (config.remove && queue.length === 0) {
          removeFromStack(pub);
          return;
        }
        if (waiting || queue.length === 0 || destroying) {
          return;
        }
        waiting = true;
        var message = queue.shift();
        pub.down.outgoing(message.data, message.origin, function (success) {
          waiting = false;
          if (message.callback) {
            setTimeout(function () {
              message.callback(success);
            }, 0);
          }
          dispatch();
        });
      }
      return (pub = {
        init: function () {
          if (undef(config)) {
            config = {};
          }
          if (config.maxLength) {
            maxLength = config.maxLength;
            doFragment = true;
          }
          if (config.lazy) {
            lazy = true;
          } else {
            pub.down.init();
          }
        },
        callback: function (success) {
          waiting = false;
          var up = pub.up;
          dispatch();
          up.callback(success);
        },
        incoming: function (message, origin) {
          if (doFragment) {
            var indexOf = message.indexOf("_"),
              seq = parseInt(message.substring(0, indexOf), 10);
            incoming += message.substring(indexOf + 1);
            if (seq === 0) {
              if (config.encode) {
                incoming = decodeURIComponent(incoming);
              }
              pub.up.incoming(incoming, origin);
              incoming = "";
            }
          } else {
            pub.up.incoming(message, origin);
          }
        },
        outgoing: function (message, origin, fn) {
          if (config.encode) {
            message = encodeURIComponent(message);
          }
          var fragments = [],
            fragment;
          if (doFragment) {
            while (message.length !== 0) {
              fragment = message.substring(0, maxLength);
              message = message.substring(fragment.length);
              fragments.push(fragment);
            }
            while ((fragment = fragments.shift())) {
              queue.push({
                data: fragments.length + "_" + fragment,
                origin: origin,
                callback: fragments.length === 0 ? fn : null,
              });
            }
          } else {
            queue.push({ data: message, origin: origin, callback: fn });
          }
          if (lazy) {
            pub.down.init();
          } else {
            dispatch();
          }
        },
        destroy: function () {
          destroying = true;
          pub.down.destroy();
        },
      });
    };
    easyXDM.stack.VerifyBehavior = function (config) {
      var pub,
        mySecret,
        theirSecret,
        verified = false;
      function startVerification() {
        mySecret = Math.random().toString(16).substring(2);
        pub.down.outgoing(mySecret);
      }
      return (pub = {
        incoming: function (message, origin) {
          var indexOf = message.indexOf("_");
          if (indexOf === -1) {
            if (message === mySecret) {
              pub.up.callback(true);
            } else if (!theirSecret) {
              theirSecret = message;
              if (!config.initiate) {
                startVerification();
              }
              pub.down.outgoing(message);
            }
          } else {
            if (message.substring(0, indexOf) === theirSecret) {
              pub.up.incoming(message.substring(indexOf + 1), origin);
            }
          }
        },
        outgoing: function (message, origin, fn) {
          pub.down.outgoing(mySecret + "_" + message, origin, fn);
        },
        callback: function (success) {
          if (config.initiate) {
            startVerification();
          }
        },
      });
    };
    easyXDM.stack.RpcBehavior = function (proxy, config) {
      var pub,
        serializer = config.serializer || getJSON();
      var _callbackCounter = 0,
        _callbacks = {};
      function _send(data) {
        data.jsonrpc = "2.0";
        pub.down.outgoing(serializer.stringify(data));
      }
      function _createMethod(definition, method) {
        var slice = Array.prototype.slice;
        return function () {
          var l = arguments.length,
            callback,
            message = { method: method };
          if (l > 0 && typeof arguments[l - 1] === "function") {
            if (l > 1 && typeof arguments[l - 2] === "function") {
              callback = { success: arguments[l - 2], error: arguments[l - 1] };
              message.params = slice.call(arguments, 0, l - 2);
            } else {
              callback = { success: arguments[l - 1] };
              message.params = slice.call(arguments, 0, l - 1);
            }
            _callbacks["" + ++_callbackCounter] = callback;
            message.id = _callbackCounter;
          } else {
            message.params = slice.call(arguments, 0);
          }
          if (definition.namedParams && message.params.length === 1) {
            message.params = message.params[0];
          }
          _send(message);
        };
      }
      function _executeMethod(method, id, fn, params) {
        if (!fn) {
          if (id) {
            _send({
              id: id,
              error: { code: -32601, message: "Procedure not found." },
            });
          }
          return;
        }
        var success, error;
        if (id) {
          success = function (result) {
            success = emptyFn;
            _send({ id: id, result: result });
          };
          error = function (message, data) {
            error = emptyFn;
            var msg = { id: id, error: { code: -32099, message: message } };
            if (data) {
              msg.error.data = data;
            }
            _send(msg);
          };
        } else {
          success = error = emptyFn;
        }
        if (!isArray(params)) {
          params = [params];
        }
        try {
          var result = fn.method.apply(
            fn.scope,
            params.concat([success, error])
          );
          if (!undef(result)) {
            success(result);
          }
        } catch (ex1) {
          error(ex1.message);
        }
      }
      return (pub = {
        incoming: function (message, origin) {
          var data = serializer.parse(message);
          if (data.method) {
            if (config.handle) {
              config.handle(data, _send);
            } else {
              _executeMethod(
                data.method,
                data.id,
                config.local[data.method],
                data.params
              );
            }
          } else {
            var callback = _callbacks[data.id];
            if (data.error) {
              if (callback.error) {
                callback.error(data.error);
              }
            } else if (callback.success) {
              callback.success(data.result);
            }
            delete _callbacks[data.id];
          }
        },
        init: function () {
          if (config.remote) {
            for (var method in config.remote) {
              if (config.remote.hasOwnProperty(method)) {
                proxy[method] = _createMethod(config.remote[method], method);
              }
            }
          }
          pub.down.init();
        },
        destroy: function () {
          for (var method in config.remote) {
            if (
              config.remote.hasOwnProperty(method) &&
              proxy.hasOwnProperty(method)
            ) {
              delete proxy[method];
            }
          }
          pub.down.destroy();
        },
      });
    };
    global.easyXDM = easyXDM;
  })(
    window,
    document,
    location,
    window.setTimeout,
    decodeURIComponent,
    encodeURIComponent
  );
  ns.easyXDM = easyXDM.noConflict("InSkin");
  (function () {
    (function () {
      var undefined;
      var VERSION = "3.10.1";
      var FUNC_ERROR_TEXT = "Expected a function";
      var argsTag = "[object Arguments]",
        arrayTag = "[object Array]",
        boolTag = "[object Boolean]",
        dateTag = "[object Date]",
        errorTag = "[object Error]",
        funcTag = "[object Function]",
        mapTag = "[object Map]",
        numberTag = "[object Number]",
        objectTag = "[object Object]",
        regexpTag = "[object RegExp]",
        setTag = "[object Set]",
        stringTag = "[object String]",
        weakMapTag = "[object WeakMap]";
      var arrayBufferTag = "[object ArrayBuffer]",
        float32Tag = "[object Float32Array]",
        float64Tag = "[object Float64Array]",
        int8Tag = "[object Int8Array]",
        int16Tag = "[object Int16Array]",
        int32Tag = "[object Int32Array]",
        uint8Tag = "[object Uint8Array]",
        uint8ClampedTag = "[object Uint8ClampedArray]",
        uint16Tag = "[object Uint16Array]",
        uint32Tag = "[object Uint32Array]";
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
        reIsPlainProp = /^\w*$/,
        rePropName =
          /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
      var reEscapeChar = /\\(\\)?/g;
      var reFlags = /\w*$/;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsUint = /^\d+$/;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] =
        typedArrayTags[float64Tag] =
        typedArrayTags[int8Tag] =
        typedArrayTags[int16Tag] =
        typedArrayTags[int32Tag] =
        typedArrayTags[uint8Tag] =
        typedArrayTags[uint8ClampedTag] =
        typedArrayTags[uint16Tag] =
        typedArrayTags[uint32Tag] =
          true;
      typedArrayTags[argsTag] =
        typedArrayTags[arrayTag] =
        typedArrayTags[arrayBufferTag] =
        typedArrayTags[boolTag] =
        typedArrayTags[dateTag] =
        typedArrayTags[errorTag] =
        typedArrayTags[funcTag] =
        typedArrayTags[mapTag] =
        typedArrayTags[numberTag] =
        typedArrayTags[objectTag] =
        typedArrayTags[regexpTag] =
        typedArrayTags[setTag] =
        typedArrayTags[stringTag] =
        typedArrayTags[weakMapTag] =
          false;
      var cloneableTags = {};
      cloneableTags[argsTag] =
        cloneableTags[arrayTag] =
        cloneableTags[arrayBufferTag] =
        cloneableTags[boolTag] =
        cloneableTags[dateTag] =
        cloneableTags[float32Tag] =
        cloneableTags[float64Tag] =
        cloneableTags[int8Tag] =
        cloneableTags[int16Tag] =
        cloneableTags[int32Tag] =
        cloneableTags[numberTag] =
        cloneableTags[objectTag] =
        cloneableTags[regexpTag] =
        cloneableTags[stringTag] =
        cloneableTags[uint8Tag] =
        cloneableTags[uint8ClampedTag] =
        cloneableTags[uint16Tag] =
        cloneableTags[uint32Tag] =
          true;
      cloneableTags[errorTag] =
        cloneableTags[funcTag] =
        cloneableTags[mapTag] =
        cloneableTags[setTag] =
        cloneableTags[weakMapTag] =
          false;
      var objectTypes = { function: true, object: true };
      var freeExports =
        objectTypes[typeof exports] && exports && !exports.nodeType && exports;
      var freeModule =
        objectTypes[typeof module] && module && !module.nodeType && module;
      var freeGlobal =
        freeExports &&
        freeModule &&
        typeof global == "object" &&
        global &&
        global.Object &&
        global;
      var freeSelf = objectTypes[typeof self] && self && self.Object && self;
      var freeWindow =
        objectTypes[typeof window] && window && window.Object && window;
      var moduleExports =
        freeModule && freeModule.exports === freeExports && freeExports;
      var root =
        freeGlobal ||
        (freeWindow !== (this && this.window) && freeWindow) ||
        freeSelf ||
        this;
      function baseToString(value) {
        return value == null ? "" : value + "";
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      var objectProto = Object.prototype;
      var fnToString = Function.prototype.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var objToString = objectProto.toString;
      var oldDash = root._;
      var reIsNative = RegExp(
        "^" +
          fnToString
            .call(hasOwnProperty)
            .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
      var ArrayBuffer = root.ArrayBuffer,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        Uint8Array = root.Uint8Array;
      var nativeIsArray = getNative(Array, "isArray"),
        nativeKeys = getNative(Object, "keys"),
        nativeMax = Math.max;
      var MAX_SAFE_INTEGER = 9007199254740991;
      function lodash() {}
      function arrayCopy(source, array) {
        var index = -1,
          length = source.length;
        array || (array = Array(length));
        while (++index < length) {
          array[index] = source[index];
        }
        return array;
      }
      function arrayEach(array, iteratee) {
        var index = -1,
          length = array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEvery(array, predicate) {
        var index = -1,
          length = array.length;
        while (++index < length) {
          if (!predicate(array[index], index, array)) {
            return false;
          }
        }
        return true;
      }
      function arrayMap(array, iteratee) {
        var index = -1,
          length = array.length,
          result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      function arraySome(array, predicate) {
        var index = -1,
          length = array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      function assignWith(object, source, customizer) {
        var index = -1,
          props = keys(source),
          length = props.length;
        while (++index < length) {
          var key = props[index],
            value = object[key],
            result = customizer(value, source[key], key, object, source);
          if (
            (result === result ? result !== value : value === value) ||
            (value === undefined && !(key in object))
          ) {
            object[key] = result;
          }
        }
        return object;
      }
      function baseAssign(object, source) {
        return source == null ? object : baseCopy(source, keys(source), object);
      }
      function baseCopy(source, props, object) {
        object || (object = {});
        var index = -1,
          length = props.length;
        while (++index < length) {
          var key = props[index];
          object[key] = source[key];
        }
        return object;
      }
      function baseCallback(func, thisArg, argCount) {
        var type = typeof func;
        if (type == "function") {
          return thisArg === undefined
            ? func
            : bindCallback(func, thisArg, argCount);
        }
        if (func == null) {
          return identity;
        }
        if (type == "object") {
          return baseMatches(func);
        }
        return thisArg === undefined
          ? property(func)
          : baseMatchesProperty(func, thisArg);
      }
      function baseClone(
        value,
        isDeep,
        customizer,
        key,
        object,
        stackA,
        stackB
      ) {
        var result;
        if (customizer) {
          result = object ? customizer(value, key, object) : customizer(value);
        }
        if (result !== undefined) {
          return result;
        }
        if (!isObject(value)) {
          return value;
        }
        var isArr = isArray(value);
        if (isArr) {
          result = initCloneArray(value);
          if (!isDeep) {
            return arrayCopy(value, result);
          }
        } else {
          var tag = objToString.call(value),
            isFunc = tag == funcTag;
          if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
            result = initCloneObject(isFunc ? {} : value);
            if (!isDeep) {
              return baseAssign(result, value);
            }
          } else {
            return cloneableTags[tag]
              ? initCloneByTag(value, tag, isDeep)
              : object
              ? value
              : {};
          }
        }
        stackA || (stackA = []);
        stackB || (stackB = []);
        var length = stackA.length;
        while (length--) {
          if (stackA[length] == value) {
            return stackB[length];
          }
        }
        stackA.push(value);
        stackB.push(result);
        (isArr ? arrayEach : baseForOwn)(value, function (subValue, key) {
          result[key] = baseClone(
            subValue,
            isDeep,
            customizer,
            key,
            value,
            stackA,
            stackB
          );
        });
        return result;
      }
      var baseEach = createBaseEach(baseForOwn);
      function baseEvery(collection, predicate) {
        var result = true;
        baseEach(collection, function (value, index, collection) {
          result = !!predicate(value, index, collection);
          return result;
        });
        return result;
      }
      var baseFor = createBaseFor();
      function baseForOwn(object, iteratee) {
        return baseFor(object, iteratee, keys);
      }
      function baseGet(object, path, pathKey) {
        if (object == null) {
          return;
        }
        if (pathKey !== undefined && pathKey in toObject(object)) {
          path = [pathKey];
        }
        var index = 0,
          length = path.length;
        while (object != null && index < length) {
          object = object[path[index++]];
        }
        return index && index == length ? object : undefined;
      }
      function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
        if (value === other) {
          return true;
        }
        if (
          value == null ||
          other == null ||
          (!isObject(value) && !isObjectLike(other))
        ) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(
          value,
          other,
          baseIsEqual,
          customizer,
          isLoose,
          stackA,
          stackB
        );
      }
      function baseIsEqualDeep(
        object,
        other,
        equalFunc,
        customizer,
        isLoose,
        stackA,
        stackB
      ) {
        var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = arrayTag,
          othTag = arrayTag;
        if (!objIsArr) {
          objTag = objToString.call(object);
          if (objTag == argsTag) {
            objTag = objectTag;
          } else if (objTag != objectTag) {
            objIsArr = isTypedArray(object);
          }
        }
        if (!othIsArr) {
          othTag = objToString.call(other);
          if (othTag == argsTag) {
            othTag = objectTag;
          } else if (othTag != objectTag) {
            othIsArr = isTypedArray(other);
          }
        }
        var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;
        if (isSameTag && !(objIsArr || objIsObj)) {
          return equalByTag(object, other, objTag);
        }
        if (!isLoose) {
          var objIsWrapped =
              objIsObj && hasOwnProperty.call(object, "__wrapped__"),
            othIsWrapped =
              othIsObj && hasOwnProperty.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            return equalFunc(
              objIsWrapped ? object.value() : object,
              othIsWrapped ? other.value() : other,
              customizer,
              isLoose,
              stackA,
              stackB
            );
          }
        }
        if (!isSameTag) {
          return false;
        }
        stackA || (stackA = []);
        stackB || (stackB = []);
        var length = stackA.length;
        while (length--) {
          if (stackA[length] == object) {
            return stackB[length] == other;
          }
        }
        stackA.push(object);
        stackB.push(other);
        var result = (objIsArr ? equalArrays : equalObjects)(
          object,
          other,
          equalFunc,
          customizer,
          isLoose,
          stackA,
          stackB
        );
        stackA.pop();
        stackB.pop();
        return result;
      }
      function baseIsMatch(object, matchData, customizer) {
        var index = matchData.length,
          length = index,
          noCustomizer = !customizer;
        if (object == null) {
          return !length;
        }
        object = toObject(object);
        while (index--) {
          var data = matchData[index];
          if (
            noCustomizer && data[2]
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
          ) {
            return false;
          }
        }
        while (++index < length) {
          data = matchData[index];
          var key = data[0],
            objValue = object[key],
            srcValue = data[1];
          if (noCustomizer && data[2]) {
            if (objValue === undefined && !(key in object)) {
              return false;
            }
          } else {
            var result = customizer
              ? customizer(objValue, srcValue, key)
              : undefined;
            if (
              !(result === undefined
                ? baseIsEqual(srcValue, objValue, customizer, true)
                : result)
            ) {
              return false;
            }
          }
        }
        return true;
      }
      function baseMap(collection, iteratee) {
        var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];
        baseEach(collection, function (value, key, collection) {
          result[++index] = iteratee(value, key, collection);
        });
        return result;
      }
      function baseMatches(source) {
        var matchData = getMatchData(source);
        if (matchData.length == 1 && matchData[0][2]) {
          var key = matchData[0][0],
            value = matchData[0][1];
          return function (object) {
            if (object == null) {
              return false;
            }
            return (
              object[key] === value &&
              (value !== undefined || key in toObject(object))
            );
          };
        }
        return function (object) {
          return baseIsMatch(object, matchData);
        };
      }
      function baseMatchesProperty(path, srcValue) {
        var isArr = isArray(path),
          isCommon = isKey(path) && isStrictComparable(srcValue),
          pathKey = path + "";
        path = toPath(path);
        return function (object) {
          if (object == null) {
            return false;
          }
          var key = pathKey;
          object = toObject(object);
          if ((isArr || !isCommon) && !(key in object)) {
            object =
              path.length == 1
                ? object
                : baseGet(object, baseSlice(path, 0, -1));
            if (object == null) {
              return false;
            }
            key = last(path);
            object = toObject(object);
          }
          return object[key] === srcValue
            ? srcValue !== undefined || key in object
            : baseIsEqual(srcValue, object[key], undefined, true);
        };
      }
      function baseProperty(key) {
        return function (object) {
          return object == null ? undefined : object[key];
        };
      }
      function basePropertyDeep(path) {
        var pathKey = path + "";
        path = toPath(path);
        return function (object) {
          return baseGet(object, path, pathKey);
        };
      }
      function baseSlice(array, start, end) {
        var index = -1,
          length = array.length;
        start = start == null ? 0 : +start || 0;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end === undefined || end > length ? length : +end || 0;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : (end - start) >>> 0;
        start >>>= 0;
        var result = Array(length);
        while (++index < length) {
          result[index] = array[index + start];
        }
        return result;
      }
      function baseSome(collection, predicate) {
        var result;
        baseEach(collection, function (value, index, collection) {
          result = predicate(value, index, collection);
          return !result;
        });
        return !!result;
      }
      function bindCallback(func, thisArg, argCount) {
        if (typeof func != "function") {
          return identity;
        }
        if (thisArg === undefined) {
          return func;
        }
        switch (argCount) {
          case 1:
            return function (value) {
              return func.call(thisArg, value);
            };
          case 3:
            return function (value, index, collection) {
              return func.call(thisArg, value, index, collection);
            };
          case 4:
            return function (accumulator, value, index, collection) {
              return func.call(thisArg, accumulator, value, index, collection);
            };
          case 5:
            return function (value, other, key, object, source) {
              return func.call(thisArg, value, other, key, object, source);
            };
        }
        return function () {
          return func.apply(thisArg, arguments);
        };
      }
      function bufferClone(buffer) {
        var result = new ArrayBuffer(buffer.byteLength),
          view = new Uint8Array(result);
        view.set(new Uint8Array(buffer));
        return result;
      }
      function createAssigner(assigner) {
        return restParam(function (object, sources) {
          var index = -1,
            length = object == null ? 0 : sources.length,
            customizer = length > 2 ? sources[length - 2] : undefined,
            guard = length > 2 ? sources[2] : undefined,
            thisArg = length > 1 ? sources[length - 1] : undefined;
          if (typeof customizer == "function") {
            customizer = bindCallback(customizer, thisArg, 5);
            length -= 2;
          } else {
            customizer = typeof thisArg == "function" ? thisArg : undefined;
            length -= customizer ? 1 : 0;
          }
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined : customizer;
            length = 1;
          }
          while (++index < length) {
            var source = sources[index];
            if (source) {
              assigner(object, source, customizer);
            }
          }
          return object;
        });
      }
      function createBaseEach(eachFunc, fromRight) {
        return function (collection, iteratee) {
          var length = collection ? getLength(collection) : 0;
          if (!isLength(length)) {
            return eachFunc(collection, iteratee);
          }
          var index = fromRight ? length : -1,
            iterable = toObject(collection);
          while (fromRight ? index-- : ++index < length) {
            if (iteratee(iterable[index], index, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }
      function createBaseFor(fromRight) {
        return function (object, iteratee, keysFunc) {
          var iterable = toObject(object),
            props = keysFunc(object),
            length = props.length,
            index = fromRight ? length : -1;
          while (fromRight ? index-- : ++index < length) {
            var key = props[index];
            if (iteratee(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      function createForEach(arrayFunc, eachFunc) {
        return function (collection, iteratee, thisArg) {
          return typeof iteratee == "function" &&
            thisArg === undefined &&
            isArray(collection)
            ? arrayFunc(collection, iteratee)
            : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
        };
      }
      function equalArrays(
        array,
        other,
        equalFunc,
        customizer,
        isLoose,
        stackA,
        stackB
      ) {
        var index = -1,
          arrLength = array.length,
          othLength = other.length;
        if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
          return false;
        }
        while (++index < arrLength) {
          var arrValue = array[index],
            othValue = other[index],
            result = customizer
              ? customizer(
                  isLoose ? othValue : arrValue,
                  isLoose ? arrValue : othValue,
                  index
                )
              : undefined;
          if (result !== undefined) {
            if (result) {
              continue;
            }
            return false;
          }
          if (isLoose) {
            if (
              !arraySome(other, function (othValue) {
                return (
                  arrValue === othValue ||
                  equalFunc(
                    arrValue,
                    othValue,
                    customizer,
                    isLoose,
                    stackA,
                    stackB
                  )
                );
              })
            ) {
              return false;
            }
          } else if (
            !(
              arrValue === othValue ||
              equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB)
            )
          ) {
            return false;
          }
        }
        return true;
      }
      function equalByTag(object, other, tag) {
        switch (tag) {
          case boolTag:
          case dateTag:
            return +object == +other;
          case errorTag:
            return object.name == other.name && object.message == other.message;
          case numberTag:
            return object != +object ? other != +other : object == +other;
          case regexpTag:
          case stringTag:
            return object == other + "";
        }
        return false;
      }
      function equalObjects(
        object,
        other,
        equalFunc,
        customizer,
        isLoose,
        stackA,
        stackB
      ) {
        var objProps = keys(object),
          objLength = objProps.length,
          othProps = keys(other),
          othLength = othProps.length;
        if (objLength != othLength && !isLoose) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
            return false;
          }
        }
        var skipCtor = isLoose;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key],
            othValue = other[key],
            result = customizer
              ? customizer(
                  isLoose ? othValue : objValue,
                  isLoose ? objValue : othValue,
                  key
                )
              : undefined;
          if (
            !(result === undefined
              ? equalFunc(
                  objValue,
                  othValue,
                  customizer,
                  isLoose,
                  stackA,
                  stackB
                )
              : result)
          ) {
            return false;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (!skipCtor) {
          var objCtor = object.constructor,
            othCtor = other.constructor;
          if (
            objCtor != othCtor &&
            "constructor" in object &&
            "constructor" in other &&
            !(
              typeof objCtor == "function" &&
              objCtor instanceof objCtor &&
              typeof othCtor == "function" &&
              othCtor instanceof othCtor
            )
          ) {
            return false;
          }
        }
        return true;
      }
      function getCallback(func, thisArg, argCount) {
        var result = lodash.callback || callback;
        result = result === callback ? baseCallback : result;
        return argCount ? result(func, thisArg, argCount) : result;
      }
      var getLength = baseProperty("length");
      function getMatchData(object) {
        var result = pairs(object),
          length = result.length;
        while (length--) {
          result[length][2] = isStrictComparable(result[length][1]);
        }
        return result;
      }
      function getNative(object, key) {
        var value = object == null ? undefined : object[key];
        return isNative(value) ? value : undefined;
      }
      function initCloneArray(array) {
        var length = array.length,
          result = new array.constructor(length);
        if (
          length &&
          typeof array[0] == "string" &&
          hasOwnProperty.call(array, "index")
        ) {
          result.index = array.index;
          result.input = array.input;
        }
        return result;
      }
      function initCloneObject(object) {
        var Ctor = object.constructor;
        if (!(typeof Ctor == "function" && Ctor instanceof Ctor)) {
          Ctor = Object;
        }
        return new Ctor();
      }
      function initCloneByTag(object, tag, isDeep) {
        var Ctor = object.constructor;
        switch (tag) {
          case arrayBufferTag:
            return bufferClone(object);
          case boolTag:
          case dateTag:
            return new Ctor(+object);
          case float32Tag:
          case float64Tag:
          case int8Tag:
          case int16Tag:
          case int32Tag:
          case uint8Tag:
          case uint8ClampedTag:
          case uint16Tag:
          case uint32Tag:
            var buffer = object.buffer;
            return new Ctor(
              isDeep ? bufferClone(buffer) : buffer,
              object.byteOffset,
              object.length
            );
          case numberTag:
          case stringTag:
            return new Ctor(object);
          case regexpTag:
            var result = new Ctor(object.source, reFlags.exec(object));
            result.lastIndex = object.lastIndex;
        }
        return result;
      }
      function isArrayLike(value) {
        return value != null && isLength(getLength(value));
      }
      function isIndex(value, length) {
        value = typeof value == "number" || reIsUint.test(value) ? +value : -1;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return value > -1 && value % 1 == 0 && value < length;
      }
      function isIterateeCall(value, index, object) {
        if (!isObject(object)) {
          return false;
        }
        var type = typeof index;
        if (
          type == "number"
            ? isArrayLike(object) && isIndex(index, object.length)
            : type == "string" && index in object
        ) {
          var other = object[index];
          return value === value ? value === other : other !== other;
        }
        return false;
      }
      function isKey(value, object) {
        var type = typeof value;
        if (
          (type == "string" && reIsPlainProp.test(value)) ||
          type == "number"
        ) {
          return true;
        }
        if (isArray(value)) {
          return false;
        }
        var result = !reIsDeepProp.test(value);
        return result || (object != null && value in toObject(object));
      }
      function isLength(value) {
        return (
          typeof value == "number" &&
          value > -1 &&
          value % 1 == 0 &&
          value <= MAX_SAFE_INTEGER
        );
      }
      function isStrictComparable(value) {
        return value === value && !isObject(value);
      }
      function shimKeys(object) {
        var props = keysIn(object),
          propsLength = props.length,
          length = propsLength && object.length;
        var allowIndexes =
          !!length &&
          isLength(length) &&
          (isArray(object) || isArguments(object));
        var index = -1,
          result = [];
        while (++index < propsLength) {
          var key = props[index];
          if (
            (allowIndexes && isIndex(key, length)) ||
            hasOwnProperty.call(object, key)
          ) {
            result.push(key);
          }
        }
        return result;
      }
      function toObject(value) {
        return isObject(value) ? value : Object(value);
      }
      function toPath(value) {
        if (isArray(value)) {
          return value;
        }
        var result = [];
        baseToString(value).replace(
          rePropName,
          function (match, number, quote, string) {
            result.push(
              quote ? string.replace(reEscapeChar, "$1") : number || match
            );
          }
        );
        return result;
      }
      function last(array) {
        var length = array ? array.length : 0;
        return length ? array[length - 1] : undefined;
      }
      function every(collection, predicate, thisArg) {
        var func = isArray(collection) ? arrayEvery : baseEvery;
        if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
          predicate = undefined;
        }
        if (typeof predicate != "function" || thisArg !== undefined) {
          predicate = getCallback(predicate, thisArg, 3);
        }
        return func(collection, predicate);
      }
      var forEach = createForEach(arrayEach, baseEach);
      function map(collection, iteratee, thisArg) {
        var func = isArray(collection) ? arrayMap : baseMap;
        iteratee = getCallback(iteratee, thisArg, 3);
        return func(collection, iteratee);
      }
      function size(collection) {
        var length = collection ? getLength(collection) : 0;
        return isLength(length) ? length : keys(collection).length;
      }
      function some(collection, predicate, thisArg) {
        var func = isArray(collection) ? arraySome : baseSome;
        if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
          predicate = undefined;
        }
        if (typeof predicate != "function" || thisArg !== undefined) {
          predicate = getCallback(predicate, thisArg, 3);
        }
        return func(collection, predicate);
      }
      function restParam(func, start) {
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        start = nativeMax(
          start === undefined ? func.length - 1 : +start || 0,
          0
        );
        return function () {
          var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            rest = Array(length);
          while (++index < length) {
            rest[index] = args[start + index];
          }
          switch (start) {
            case 0:
              return func.call(this, rest);
            case 1:
              return func.call(this, args[0], rest);
            case 2:
              return func.call(this, args[0], args[1], rest);
          }
          var otherArgs = Array(start + 1);
          index = -1;
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = rest;
          return func.apply(this, otherArgs);
        };
      }
      function isArguments(value) {
        return (
          isObjectLike(value) &&
          isArrayLike(value) &&
          hasOwnProperty.call(value, "callee") &&
          !propertyIsEnumerable.call(value, "callee")
        );
      }
      var isArray =
        nativeIsArray ||
        function (value) {
          return (
            isObjectLike(value) &&
            isLength(value.length) &&
            objToString.call(value) == arrayTag
          );
        };
      function isEmpty(value) {
        if (value == null) {
          return true;
        }
        if (
          isArrayLike(value) &&
          (isArray(value) ||
            isString(value) ||
            isArguments(value) ||
            (isObjectLike(value) && isFunction(value.splice)))
        ) {
          return !value.length;
        }
        return !keys(value).length;
      }
      function isFunction(value) {
        return isObject(value) && objToString.call(value) == funcTag;
      }
      function isObject(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isNaN(value) {
        return isNumber(value) && value != +value;
      }
      function isNative(value) {
        if (value == null) {
          return false;
        }
        if (isFunction(value)) {
          return reIsNative.test(fnToString.call(value));
        }
        return isObjectLike(value) && reIsHostCtor.test(value);
      }
      function isNumber(value) {
        return (
          typeof value == "number" ||
          (isObjectLike(value) && objToString.call(value) == numberTag)
        );
      }
      function isString(value) {
        return (
          typeof value == "string" ||
          (isObjectLike(value) && objToString.call(value) == stringTag)
        );
      }
      function isTypedArray(value) {
        return (
          isObjectLike(value) &&
          isLength(value.length) &&
          !!typedArrayTags[objToString.call(value)]
        );
      }
      var assign = createAssigner(function (object, source, customizer) {
        return customizer
          ? assignWith(object, source, customizer)
          : baseAssign(object, source);
      });
      function has(object, path) {
        if (object == null) {
          return false;
        }
        var result = hasOwnProperty.call(object, path);
        if (!result && !isKey(path)) {
          path = toPath(path);
          object =
            path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
          if (object == null) {
            return false;
          }
          path = last(path);
          result = hasOwnProperty.call(object, path);
        }
        return (
          result ||
          (isLength(object.length) &&
            isIndex(path, object.length) &&
            (isArray(object) || isArguments(object)))
        );
      }
      var keys = !nativeKeys
        ? shimKeys
        : function (object) {
            var Ctor = object == null ? undefined : object.constructor;
            if (
              (typeof Ctor == "function" && Ctor.prototype === object) ||
              (typeof object != "function" && isArrayLike(object))
            ) {
              return shimKeys(object);
            }
            return isObject(object) ? nativeKeys(object) : [];
          };
      function keysIn(object) {
        if (object == null) {
          return [];
        }
        if (!isObject(object)) {
          object = Object(object);
        }
        var length = object.length;
        length =
          (length &&
            isLength(length) &&
            (isArray(object) || isArguments(object)) &&
            length) ||
          0;
        var Ctor = object.constructor,
          index = -1,
          isProto = typeof Ctor == "function" && Ctor.prototype === object,
          result = Array(length),
          skipIndexes = length > 0;
        while (++index < length) {
          result[index] = index + "";
        }
        for (var key in object) {
          if (
            !(skipIndexes && isIndex(key, length)) &&
            !(
              key == "constructor" &&
              (isProto || !hasOwnProperty.call(object, key))
            )
          ) {
            result.push(key);
          }
        }
        return result;
      }
      function pairs(object) {
        object = toObject(object);
        var index = -1,
          props = keys(object),
          length = props.length,
          result = Array(length);
        while (++index < length) {
          var key = props[index];
          result[index] = [key, object[key]];
        }
        return result;
      }
      function callback(func, thisArg, guard) {
        if (guard && isIterateeCall(func, thisArg, guard)) {
          thisArg = undefined;
        }
        return isObjectLike(func) ? matches(func) : baseCallback(func, thisArg);
      }
      function identity(value) {
        return value;
      }
      function matches(source) {
        return baseMatches(baseClone(source, true));
      }
      function noConflict() {
        root._ = oldDash;
        return this;
      }
      function property(path) {
        return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
      }
      lodash.assign = assign;
      lodash.callback = callback;
      lodash.forEach = forEach;
      lodash.keys = keys;
      lodash.keysIn = keysIn;
      lodash.map = map;
      lodash.matches = matches;
      lodash.pairs = pairs;
      lodash.property = property;
      lodash.restParam = restParam;
      lodash.collect = map;
      lodash.each = forEach;
      lodash.extend = assign;
      lodash.iteratee = callback;
      lodash.every = every;
      lodash.has = has;
      lodash.identity = identity;
      lodash.isArguments = isArguments;
      lodash.isArray = isArray;
      lodash.isEmpty = isEmpty;
      lodash.isFunction = isFunction;
      lodash.isNaN = isNaN;
      lodash.isNative = isNative;
      lodash.isNumber = isNumber;
      lodash.isObject = isObject;
      lodash.isString = isString;
      lodash.isTypedArray = isTypedArray;
      lodash.last = last;
      lodash.noConflict = noConflict;
      lodash.size = size;
      lodash.some = some;
      lodash.all = every;
      lodash.any = some;
      lodash.VERSION = VERSION;
      if (
        typeof define == "function" &&
        typeof define.amd == "object" &&
        define.amd
      ) {
        root._ = lodash;
        define(function () {
          return lodash;
        });
      } else if (freeExports && freeModule) {
        if (moduleExports) {
          (freeModule.exports = lodash)._ = lodash;
        } else {
          freeExports._ = lodash;
        }
      } else {
        root._ = lodash;
      }
    }.call(this));
    _ = this._.noConflict();
    Meteor = {
      isClient: true,
      _noYieldsAllowed: function (f) {
        return f();
      },
    };
    Package = {};
    (function () {
      var suppress = 0;
      Meteor._debug = function () {
        if (suppress) {
          suppress--;
          return;
        }
        if (
          typeof console !== "undefined" &&
          typeof console.log !== "undefined"
        ) {
          if (arguments.length == 0) {
            console.log("");
          } else {
            if (typeof console.log.apply === "function") {
              var allArgumentsOfTypeString = true;
              for (var i = 0; i < arguments.length; i++)
                if (typeof arguments[i] !== "string")
                  allArgumentsOfTypeString = false;
              if (allArgumentsOfTypeString)
                console.log.apply(console, [
                  Array.prototype.join.call(arguments, " "),
                ]);
              else console.log.apply(console, arguments);
            } else if (typeof Function.prototype.bind === "function") {
              var log = Function.prototype.bind.call(console.log, console);
              log.apply(console, arguments);
            } else {
              Function.prototype.call.call(
                console.log,
                console,
                Array.prototype.slice.call(arguments)
              );
            }
          }
        }
      };
      Meteor._suppress_log = function (count) {
        suppress += count;
      };
      Meteor._supressed_log_expected = function () {
        return suppress !== 0;
      };
    }.call(this));
    (function () {
      "use strict";
      var global = this;
      function useSetImmediate() {
        if (!global.setImmediate) return null;
        else {
          var setImmediate = function (fn) {
            global.setImmediate(fn);
          };
          setImmediate.implementation = "setImmediate";
          return setImmediate;
        }
      }
      function usePostMessage() {
        if (!global.postMessage || global.importScripts) {
          return null;
        }
        var postMessageIsAsynchronous = true;
        var oldOnMessage = global.onmessage;
        global.onmessage = function () {
          postMessageIsAsynchronous = false;
        };
        global.postMessage("", "*");
        global.onmessage = oldOnMessage;
        if (!postMessageIsAsynchronous) return null;
        var funcIndex = 0;
        var funcs = {};
        var MESSAGE_PREFIX = "Meteor._setImmediate." + Math.random() + ".";
        function isStringAndStartsWith(string, putativeStart) {
          return (
            typeof string === "string" &&
            string.substring(0, putativeStart.length) === putativeStart
          );
        }
        function onGlobalMessage(event) {
          if (
            event.source === global &&
            isStringAndStartsWith(event.data, MESSAGE_PREFIX)
          ) {
            var index = event.data.substring(MESSAGE_PREFIX.length);
            try {
              if (funcs[index]) funcs[index]();
            } finally {
              delete funcs[index];
            }
          }
        }
        if (global.addEventListener) {
          global.addEventListener("message", onGlobalMessage, false);
        } else {
          global.attachEvent("onmessage", onGlobalMessage);
        }
        var setImmediate = function (fn) {
          ++funcIndex;
          funcs[funcIndex] = fn;
          global.postMessage(MESSAGE_PREFIX + funcIndex, "*");
        };
        setImmediate.implementation = "postMessage";
        return setImmediate;
      }
      function useTimeout() {
        var setImmediate = function (fn) {
          global.setTimeout(fn, 0);
        };
        setImmediate.implementation = "setTimeout";
        return setImmediate;
      }
      Meteor._setImmediate =
        useSetImmediate() || usePostMessage() || useTimeout();
    }.call(this));
    (function () {
      var BASE_64_CHARS =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var BASE_64_VALS = {};
      for (var i = 0; i < BASE_64_CHARS.length; i++) {
        BASE_64_VALS[BASE_64_CHARS.charAt(i)] = i;
      }
      Base64 = {};
      Base64.encode = function (array) {
        if (typeof array === "string") {
          var str = array;
          array = Base64.newBinary(str.length);
          for (var i = 0; i < str.length; i++) {
            var ch = str.charCodeAt(i);
            if (ch > 255) {
              throw new Error(
                "Not ascii. Base64.encode can only take ascii strings."
              );
            }
            array[i] = ch;
          }
        }
        var answer = [];
        var a = null;
        var b = null;
        var c = null;
        var d = null;
        for (var i = 0; i < array.length; i++) {
          switch (i % 3) {
            case 0:
              a = (array[i] >> 2) & 63;
              b = (array[i] & 3) << 4;
              break;
            case 1:
              b = b | ((array[i] >> 4) & 15);
              c = (array[i] & 15) << 2;
              break;
            case 2:
              c = c | ((array[i] >> 6) & 3);
              d = array[i] & 63;
              answer.push(getChar(a));
              answer.push(getChar(b));
              answer.push(getChar(c));
              answer.push(getChar(d));
              a = null;
              b = null;
              c = null;
              d = null;
              break;
          }
        }
        if (a != null) {
          answer.push(getChar(a));
          answer.push(getChar(b));
          if (c == null) answer.push("=");
          else answer.push(getChar(c));
          if (d == null) answer.push("=");
        }
        return answer.join("");
      };
      var getChar = function (val) {
        return BASE_64_CHARS.charAt(val);
      };
      var getVal = function (ch) {
        if (ch === "=") {
          return -1;
        }
        return BASE_64_VALS[ch];
      };
      Base64.newBinary = function (len) {
        if (
          typeof Uint8Array === "undefined" ||
          typeof ArrayBuffer === "undefined"
        ) {
          var ret = [];
          for (var i = 0; i < len; i++) {
            ret.push(0);
          }
          ret.$Uint8ArrayPolyfill = true;
          return ret;
        }
        return new Uint8Array(new ArrayBuffer(len));
      };
      Base64.decode = function (str) {
        var len = Math.floor((str.length * 3) / 4);
        if (str.charAt(str.length - 1) == "=") {
          len--;
          if (str.charAt(str.length - 2) == "=") len--;
        }
        var arr = Base64.newBinary(len);
        var one = null;
        var two = null;
        var three = null;
        var j = 0;
        for (var i = 0; i < str.length; i++) {
          var c = str.charAt(i);
          var v = getVal(c);
          switch (i % 4) {
            case 0:
              if (v < 0) throw new Error("invalid base64 string");
              one = v << 2;
              break;
            case 1:
              if (v < 0) throw new Error("invalid base64 string");
              one = one | (v >> 4);
              arr[j++] = one;
              two = (v & 15) << 4;
              break;
            case 2:
              if (v >= 0) {
                two = two | (v >> 2);
                arr[j++] = two;
                three = (v & 3) << 6;
              }
              break;
            case 3:
              if (v >= 0) {
                arr[j++] = three | v;
              }
              break;
          }
        }
        return arr;
      };
    }.call(this));
    (function () {
      EJSON = {};
      EJSONTest = {};
      var customTypes = {};
      EJSON.addType = function (name, factory) {
        if (_.has(customTypes, name))
          throw new Error("Type " + name + " already present");
        customTypes[name] = factory;
      };
      var isInfOrNan = function (obj) {
        return _.isNaN(obj) || obj === Infinity || obj === -Infinity;
      };
      var builtinConverters = [
        {
          matchJSONValue: function (obj) {
            return _.has(obj, "$date") && _.size(obj) === 1;
          },
          matchObject: function (obj) {
            return obj instanceof Date;
          },
          toJSONValue: function (obj) {
            return { $date: obj.getTime() };
          },
          fromJSONValue: function (obj) {
            return new Date(obj.$date);
          },
        },
        {
          matchJSONValue: function (obj) {
            return _.has(obj, "$InfNaN") && _.size(obj) === 1;
          },
          matchObject: isInfOrNan,
          toJSONValue: function (obj) {
            var sign;
            if (_.isNaN(obj)) sign = 0;
            else if (obj === Infinity) sign = 1;
            else sign = -1;
            return { $InfNaN: sign };
          },
          fromJSONValue: function (obj) {
            return obj.$InfNaN / 0;
          },
        },
        {
          matchJSONValue: function (obj) {
            return _.has(obj, "$binary") && _.size(obj) === 1;
          },
          matchObject: function (obj) {
            return (
              (typeof Uint8Array !== "undefined" &&
                obj instanceof Uint8Array) ||
              (obj && _.has(obj, "$Uint8ArrayPolyfill"))
            );
          },
          toJSONValue: function (obj) {
            return { $binary: Base64.encode(obj) };
          },
          fromJSONValue: function (obj) {
            return Base64.decode(obj.$binary);
          },
        },
        {
          matchJSONValue: function (obj) {
            return _.has(obj, "$escape") && _.size(obj) === 1;
          },
          matchObject: function (obj) {
            if (_.isEmpty(obj) || _.size(obj) > 2) {
              return false;
            }
            return _.any(builtinConverters, function (converter) {
              return converter.matchJSONValue(obj);
            });
          },
          toJSONValue: function (obj) {
            var newObj = {};
            _.each(obj, function (value, key) {
              newObj[key] = EJSON.toJSONValue(value);
            });
            return { $escape: newObj };
          },
          fromJSONValue: function (obj) {
            var newObj = {};
            _.each(obj.$escape, function (value, key) {
              newObj[key] = EJSON.fromJSONValue(value);
            });
            return newObj;
          },
        },
        {
          matchJSONValue: function (obj) {
            return (
              _.has(obj, "$type") && _.has(obj, "$value") && _.size(obj) === 2
            );
          },
          matchObject: function (obj) {
            return EJSON._isCustomType(obj);
          },
          toJSONValue: function (obj) {
            var jsonValue = Meteor._noYieldsAllowed(function () {
              return obj.toJSONValue();
            });
            return { $type: obj.typeName(), $value: jsonValue };
          },
          fromJSONValue: function (obj) {
            var typeName = obj.$type;
            if (!_.has(customTypes, typeName))
              throw new Error(
                "Custom EJSON type " + typeName + " is not defined"
              );
            var converter = customTypes[typeName];
            return Meteor._noYieldsAllowed(function () {
              return converter(obj.$value);
            });
          },
        },
      ];
      EJSON._isCustomType = function (obj) {
        return (
          obj &&
          typeof obj.toJSONValue === "function" &&
          typeof obj.typeName === "function" &&
          _.has(customTypes, obj.typeName())
        );
      };
      EJSON._getTypes = function () {
        return customTypes;
      };
      EJSON._getConverters = function () {
        return builtinConverters;
      };
      var adjustTypesToJSONValue = (EJSON._adjustTypesToJSONValue = function (
        obj
      ) {
        if (obj === null) return null;
        var maybeChanged = toJSONValueHelper(obj);
        if (maybeChanged !== undefined) return maybeChanged;
        if (typeof obj !== "object") return obj;
        _.each(obj, function (value, key) {
          if (
            typeof value !== "object" &&
            value !== undefined &&
            !isInfOrNan(value)
          )
            return;
          var changed = toJSONValueHelper(value);
          if (changed) {
            obj[key] = changed;
            return;
          }
          adjustTypesToJSONValue(value);
        });
        return obj;
      });
      var toJSONValueHelper = function (item) {
        for (var i = 0; i < builtinConverters.length; i++) {
          var converter = builtinConverters[i];
          if (converter.matchObject(item)) {
            return converter.toJSONValue(item);
          }
        }
        return undefined;
      };
      EJSON.toJSONValue = function (item) {
        var changed = toJSONValueHelper(item);
        if (changed !== undefined) return changed;
        if (typeof item === "object") {
          item = EJSON.clone(item);
          adjustTypesToJSONValue(item);
        }
        return item;
      };
      var adjustTypesFromJSONValue = (EJSON._adjustTypesFromJSONValue =
        function (obj) {
          if (obj === null) return null;
          var maybeChanged = fromJSONValueHelper(obj);
          if (maybeChanged !== obj) return maybeChanged;
          if (typeof obj !== "object") return obj;
          _.each(obj, function (value, key) {
            if (typeof value === "object") {
              var changed = fromJSONValueHelper(value);
              if (value !== changed) {
                obj[key] = changed;
                return;
              }
              adjustTypesFromJSONValue(value);
            }
          });
          return obj;
        });
      var fromJSONValueHelper = function (value) {
        if (typeof value === "object" && value !== null) {
          if (
            _.size(value) <= 2 &&
            _.all(value, function (v, k) {
              return typeof k === "string" && k.substr(0, 1) === "$";
            })
          ) {
            for (var i = 0; i < builtinConverters.length; i++) {
              var converter = builtinConverters[i];
              if (converter.matchJSONValue(value)) {
                return converter.fromJSONValue(value);
              }
            }
          }
        }
        return value;
      };
      EJSON.fromJSONValue = function (item) {
        var changed = fromJSONValueHelper(item);
        if (changed === item && typeof item === "object") {
          item = EJSON.clone(item);
          adjustTypesFromJSONValue(item);
          return item;
        } else {
          return changed;
        }
      };
      EJSON.stringify = function (item, options) {
        var json = EJSON.toJSONValue(item);
        if (options && (options.canonical || options.indent)) {
          return EJSON._canonicalStringify(json, options);
        } else {
          return JSON.stringify(json);
        }
      };
      EJSON.parse = function (item) {
        if (typeof item !== "string")
          throw new Error("EJSON.parse argument should be a string");
        return EJSON.fromJSONValue(JSON.parse(item));
      };
      EJSON.isBinary = function (obj) {
        return !!(
          (typeof Uint8Array !== "undefined" && obj instanceof Uint8Array) ||
          (obj && obj.$Uint8ArrayPolyfill)
        );
      };
      EJSON.equals = function (a, b, options) {
        var i;
        var keyOrderSensitive = !!(options && options.keyOrderSensitive);
        if (a === b) return true;
        if (_.isNaN(a) && _.isNaN(b)) return true;
        if (!a || !b) return false;
        if (!(typeof a === "object" && typeof b === "object")) return false;
        if (a instanceof Date && b instanceof Date)
          return a.valueOf() === b.valueOf();
        if (EJSON.isBinary(a) && EJSON.isBinary(b)) {
          if (a.length !== b.length) return false;
          for (i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
          }
          return true;
        }
        if (typeof a.equals === "function") return a.equals(b, options);
        if (typeof b.equals === "function") return b.equals(a, options);
        if (a instanceof Array) {
          if (!(b instanceof Array)) return false;
          if (a.length !== b.length) return false;
          for (i = 0; i < a.length; i++) {
            if (!EJSON.equals(a[i], b[i], options)) return false;
          }
          return true;
        }
        switch (EJSON._isCustomType(a) + EJSON._isCustomType(b)) {
          case 1:
            return false;
          case 2:
            return EJSON.equals(EJSON.toJSONValue(a), EJSON.toJSONValue(b));
        }
        var ret;
        if (keyOrderSensitive) {
          var bKeys = [];
          _.each(b, function (val, x) {
            bKeys.push(x);
          });
          i = 0;
          ret = _.all(a, function (val, x) {
            if (i >= bKeys.length) {
              return false;
            }
            if (x !== bKeys[i]) {
              return false;
            }
            if (!EJSON.equals(val, b[bKeys[i]], options)) {
              return false;
            }
            i++;
            return true;
          });
          return ret && i === bKeys.length;
        } else {
          i = 0;
          ret = _.all(a, function (val, key) {
            if (!_.has(b, key)) {
              return false;
            }
            if (!EJSON.equals(val, b[key], options)) {
              return false;
            }
            i++;
            return true;
          });
          return ret && _.size(b) === i;
        }
      };
      EJSON.clone = function (v) {
        var ret;
        if (typeof v !== "object") return v;
        if (v === null) return null;
        if (v instanceof Date) return new Date(v.getTime());
        if (v instanceof RegExp) return v;
        if (EJSON.isBinary(v)) {
          ret = EJSON.newBinary(v.length);
          for (var i = 0; i < v.length; i++) {
            ret[i] = v[i];
          }
          return ret;
        }
        if (_.isArray(v) || _.isArguments(v)) {
          ret = [];
          for (i = 0; i < v.length; i++) ret[i] = EJSON.clone(v[i]);
          return ret;
        }
        if (typeof v.clone === "function") {
          return v.clone();
        }
        if (EJSON._isCustomType(v)) {
          return EJSON.fromJSONValue(EJSON.clone(EJSON.toJSONValue(v)), true);
        }
        ret = {};
        _.each(v, function (value, key) {
          ret[key] = EJSON.clone(value);
        });
        return ret;
      };
      EJSON.newBinary = Base64.newBinary;
    }.call(this));
    (function () {
      Tracker = {};
      Tracker.active = false;
      Tracker.currentComputation = null;
      Tracker._computations = {};
      var setCurrentComputation = function (c) {
        Tracker.currentComputation = c;
        Tracker.active = !!c;
      };
      var _debugFunc = function () {
        return typeof Meteor !== "undefined"
          ? Meteor._debug
          : typeof console !== "undefined" && console.error
          ? function () {
              console.error.apply(console, arguments);
            }
          : function () {};
      };
      var _maybeSupressMoreLogs = function (messagesLength) {
        if (typeof Meteor !== "undefined") {
          if (Meteor._supressed_log_expected()) {
            Meteor._suppress_log(messagesLength - 1);
          }
        }
      };
      var _throwOrLog = function (from, e) {
        if (throwFirstError) {
          throw e;
        } else {
          var printArgs = ["Exception from Tracker " + from + " function:"];
          if (e.stack && e.message && e.name) {
            var idx = e.stack.indexOf(e.message);
            if (idx < 0 || idx > e.name.length + 2) {
              var message = e.name + ": " + e.message;
              printArgs.push(message);
            }
          }
          printArgs.push(e.stack);
          _maybeSupressMoreLogs(printArgs.length);
          for (var i = 0; i < printArgs.length; i++) {
            _debugFunc()(printArgs[i]);
          }
        }
      };
      var withNoYieldsAllowed = function (f) {
        if (typeof Meteor === "undefined" || Meteor.isClient) {
          return f;
        } else {
          return function () {
            var args = arguments;
            Meteor._noYieldsAllowed(function () {
              f.apply(null, args);
            });
          };
        }
      };
      var nextId = 1;
      var pendingComputations = [];
      var willFlush = false;
      var inFlush = false;
      var inCompute = false;
      var throwFirstError = false;
      var afterFlushCallbacks = [];
      var requireFlush = function () {
        if (!willFlush) {
          if (typeof Meteor !== "undefined")
            Meteor._setImmediate(Tracker._runFlush);
          else setTimeout(Tracker._runFlush, 0);
          willFlush = true;
        }
      };
      var constructingComputation = false;
      Tracker.Computation = function (f, parent, onError) {
        if (!constructingComputation)
          throw new Error(
            "Tracker.Computation constructor is private; use Tracker.autorun"
          );
        constructingComputation = false;
        var self = this;
        self.stopped = false;
        self.invalidated = false;
        self.firstRun = true;
        self._id = nextId++;
        self._onInvalidateCallbacks = [];
        self._onStopCallbacks = [];
        self._parent = parent;
        self._func = f;
        self._onError = onError;
        self._recomputing = false;
        Tracker._computations[self._id] = self;
        var errored = true;
        try {
          self._compute();
          errored = false;
        } finally {
          self.firstRun = false;
          if (errored) self.stop();
        }
      };
      Tracker.Computation.prototype.onInvalidate = function (f) {
        var self = this;
        if (typeof f !== "function")
          throw new Error("onInvalidate requires a function");
        if (self.invalidated) {
          Tracker.nonreactive(function () {
            withNoYieldsAllowed(f)(self);
          });
        } else {
          self._onInvalidateCallbacks.push(f);
        }
      };
      Tracker.Computation.prototype.onStop = function (f) {
        var self = this;
        if (typeof f !== "function")
          throw new Error("onStop requires a function");
        if (self.stopped) {
          Tracker.nonreactive(function () {
            withNoYieldsAllowed(f)(self);
          });
        } else {
          self._onStopCallbacks.push(f);
        }
      };
      Tracker.Computation.prototype.invalidate = function () {
        var self = this;
        if (!self.invalidated) {
          if (!self._recomputing && !self.stopped) {
            requireFlush();
            pendingComputations.push(this);
          }
          self.invalidated = true;
          for (var i = 0, f; (f = self._onInvalidateCallbacks[i]); i++) {
            Tracker.nonreactive(function () {
              withNoYieldsAllowed(f)(self);
            });
          }
          self._onInvalidateCallbacks = [];
        }
      };
      Tracker.Computation.prototype.stop = function () {
        var self = this;
        if (!self.stopped) {
          self.stopped = true;
          self.invalidate();
          delete Tracker._computations[self._id];
          for (var i = 0, f; (f = self._onStopCallbacks[i]); i++) {
            Tracker.nonreactive(function () {
              withNoYieldsAllowed(f)(self);
            });
          }
          self._onStopCallbacks = [];
        }
      };
      Tracker.Computation.prototype._compute = function () {
        var self = this;
        self.invalidated = false;
        var previous = Tracker.currentComputation;
        setCurrentComputation(self);
        var previousInCompute = inCompute;
        inCompute = true;
        try {
          withNoYieldsAllowed(self._func)(self);
        } finally {
          setCurrentComputation(previous);
          inCompute = previousInCompute;
        }
      };
      Tracker.Computation.prototype._needsRecompute = function () {
        var self = this;
        return self.invalidated && !self.stopped;
      };
      Tracker.Computation.prototype._recompute = function () {
        var self = this;
        self._recomputing = true;
        try {
          if (self._needsRecompute()) {
            try {
              self._compute();
            } catch (e) {
              if (self._onError) {
                self._onError(e);
              } else {
                _throwOrLog("recompute", e);
              }
            }
          }
        } finally {
          self._recomputing = false;
        }
      };
      Tracker.Dependency = function () {
        this._dependentsById = {};
      };
      Tracker.Dependency.prototype.depend = function (computation) {
        if (!computation) {
          if (!Tracker.active) return false;
          computation = Tracker.currentComputation;
        }
        var self = this;
        var id = computation._id;
        if (!(id in self._dependentsById)) {
          self._dependentsById[id] = computation;
          computation.onInvalidate(function () {
            delete self._dependentsById[id];
          });
          return true;
        }
        return false;
      };
      Tracker.Dependency.prototype.changed = function () {
        var self = this;
        for (var id in self._dependentsById)
          self._dependentsById[id].invalidate();
      };
      Tracker.Dependency.prototype.hasDependents = function () {
        var self = this;
        for (var id in self._dependentsById) return true;
        return false;
      };
      Tracker.flush = function (options) {
        Tracker._runFlush({
          finishSynchronously: true,
          throwFirstError: options && options._throwFirstError,
        });
      };
      Tracker._runFlush = function (options) {
        if (inFlush) throw new Error("Can't call Tracker.flush while flushing");
        if (inCompute) throw new Error("Can't flush inside Tracker.autorun");
        options = options || {};
        inFlush = true;
        willFlush = true;
        throwFirstError = !!options.throwFirstError;
        var recomputedCount = 0;
        var finishedTry = false;
        try {
          while (pendingComputations.length || afterFlushCallbacks.length) {
            while (pendingComputations.length) {
              var comp = pendingComputations.shift();
              comp._recompute();
              if (comp._needsRecompute()) {
                pendingComputations.unshift(comp);
              }
              if (!options.finishSynchronously && ++recomputedCount > 1e3) {
                finishedTry = true;
                return;
              }
            }
            if (afterFlushCallbacks.length) {
              var func = afterFlushCallbacks.shift();
              try {
                func();
              } catch (e) {
                _throwOrLog("afterFlush", e);
              }
            }
          }
          finishedTry = true;
        } finally {
          if (!finishedTry) {
            inFlush = false;
            Tracker._runFlush({
              finishSynchronously: options.finishSynchronously,
              throwFirstError: false,
            });
          }
          willFlush = false;
          inFlush = false;
          if (pendingComputations.length || afterFlushCallbacks.length) {
            if (options.finishSynchronously) {
              throw new Error("still have more to do?");
            }
            setTimeout(requireFlush, 10);
          }
        }
      };
      Tracker.autorun = function (f, options) {
        if (typeof f !== "function")
          throw new Error("Tracker.autorun requires a function argument");
        options = options || {};
        constructingComputation = true;
        var c = new Tracker.Computation(
          f,
          Tracker.currentComputation,
          options.onError
        );
        if (Tracker.active)
          Tracker.onInvalidate(function () {
            c.stop();
          });
        return c;
      };
      Tracker.nonreactive = function (f) {
        var previous = Tracker.currentComputation;
        setCurrentComputation(null);
        try {
          return f();
        } finally {
          setCurrentComputation(previous);
        }
      };
      Tracker.onInvalidate = function (f) {
        if (!Tracker.active)
          throw new Error("Tracker.onInvalidate requires a currentComputation");
        Tracker.currentComputation.onInvalidate(f);
      };
      Tracker.afterFlush = function (f) {
        afterFlushCallbacks.push(f);
        requireFlush();
      };
    }.call(this));
    (function () {
      var stringify = function (value) {
        if (value === undefined) return "undefined";
        return EJSON.stringify(value);
      };
      var parse = function (serialized) {
        if (serialized === undefined || serialized === "undefined")
          return undefined;
        return EJSON.parse(serialized);
      };
      var changed = function (v) {
        v && v.changed();
      };
      ReactiveDict = function (dictName) {
        if (dictName) {
          if (typeof dictName === "string") {
            ReactiveDict._registerDictForMigrate(dictName, this);
            this.keys = ReactiveDict._loadMigratedDict(dictName) || {};
            this.name = dictName;
          } else if (typeof dictName === "object") {
            this.keys = dictName;
          } else {
            throw new Error("Invalid ReactiveDict argument: " + dictName);
          }
        } else {
          this.keys = {};
        }
        this.allDeps = new Tracker.Dependency();
        this.keyDeps = {};
        this.keyValueDeps = {};
      };
      _.extend(ReactiveDict.prototype, {
        set: function (keyOrObject, value) {
          var self = this;
          if (typeof keyOrObject === "object" && value === undefined) {
            self._setObject(keyOrObject);
            return;
          }
          var key = keyOrObject;
          value = stringify(value);
          var oldSerializedValue = "undefined";
          if (_.has(self.keys, key)) oldSerializedValue = self.keys[key];
          if (value === oldSerializedValue) return;
          self.keys[key] = value;
          self.allDeps.changed();
          changed(self.keyDeps[key]);
          if (self.keyValueDeps[key]) {
            changed(self.keyValueDeps[key][oldSerializedValue]);
            changed(self.keyValueDeps[key][value]);
          }
        },
        setDefault: function (key, value) {
          var self = this;
          if (self.keys[key] === undefined) {
            self.set(key, value);
          }
        },
        get: function (key) {
          var self = this;
          self._ensureKey(key);
          self.keyDeps[key].depend();
          return parse(self.keys[key]);
        },
        equals: function (key, value) {
          var self = this;
          var ObjectID = null;
          if (Package.mongo) {
            ObjectID = Package.mongo.Mongo.ObjectID;
          }
          if (
            typeof value !== "string" &&
            typeof value !== "number" &&
            typeof value !== "boolean" &&
            typeof value !== "undefined" &&
            !(value instanceof Date) &&
            !(ObjectID && value instanceof ObjectID) &&
            value !== null
          ) {
            throw new Error("ReactiveDict.equals: value must be scalar");
          }
          var serializedValue = stringify(value);
          if (Tracker.active) {
            self._ensureKey(key);
            if (!_.has(self.keyValueDeps[key], serializedValue))
              self.keyValueDeps[key][serializedValue] =
                new Tracker.Dependency();
            var isNew = self.keyValueDeps[key][serializedValue].depend();
            if (isNew) {
              Tracker.onInvalidate(function () {
                if (!self.keyValueDeps[key][serializedValue].hasDependents())
                  delete self.keyValueDeps[key][serializedValue];
              });
            }
          }
          var oldValue = undefined;
          if (_.has(self.keys, key)) oldValue = parse(self.keys[key]);
          return EJSON.equals(oldValue, value);
        },
        all: function () {
          this.allDeps.depend();
          var ret = {};
          _.each(this.keys, function (value, key) {
            ret[key] = parse(value);
          });
          return ret;
        },
        clear: function () {
          var self = this;
          var oldKeys = self.keys;
          self.keys = {};
          self.allDeps.changed();
          _.each(oldKeys, function (value, key) {
            changed(self.keyDeps[key]);
            changed(self.keyValueDeps[key][value]);
            changed(self.keyValueDeps[key]["undefined"]);
          });
        },
        _setObject: function (object) {
          var self = this;
          _.each(object, function (value, key) {
            self.set(key, value);
          });
        },
        _ensureKey: function (key) {
          var self = this;
          if (!(key in self.keyDeps)) {
            self.keyDeps[key] = new Tracker.Dependency();
            self.keyValueDeps[key] = {};
          }
        },
        _getMigrationData: function () {
          return this.keys;
        },
      });
    }.call(this));
    (function () {
      ReactiveVar = function (initialValue, equalsFunc) {
        if (!(this instanceof ReactiveVar))
          return new ReactiveVar(initialValue, equalsFunc);
        this.curValue = initialValue;
        this.equalsFunc = equalsFunc;
        this.dep = new Tracker.Dependency();
      };
      ReactiveVar._isEqual = function (oldValue, newValue) {
        var a = oldValue,
          b = newValue;
        if (a !== b) return false;
        else
          return (
            !a ||
            typeof a === "number" ||
            typeof a === "boolean" ||
            typeof a === "string"
          );
      };
      ReactiveVar.prototype.get = function () {
        if (Tracker.active) this.dep.depend();
        return this.curValue;
      };
      ReactiveVar.prototype.set = function (newValue) {
        var oldValue = this.curValue;
        if ((this.equalsFunc || ReactiveVar._isEqual)(oldValue, newValue))
          return;
        this.curValue = newValue;
        this.dep.changed();
      };
      ReactiveVar.prototype.toString = function () {
        return "ReactiveVar{" + this.get() + "}";
      };
      ReactiveVar.prototype._numListeners = function () {
        var count = 0;
        for (var id in this.dep._dependentsById) count++;
        return count;
      };
    }.call(this));
  })();
  (function (ns) {
    if (typeof ns.Class != "undefined") return;
    var initializing = false,
      fnTest = /xyz/.test(function () {
        xyz;
      })
        ? /\b_super\b/
        : /.*/;
    ns.Class = function () {};
    ns.Class.extend = function (prop) {
      var _super = this.prototype;
      initializing = true;
      var prototype = new this();
      initializing = false;
      for (var name in prop) {
        prototype[name] =
          typeof prop[name] == "function" &&
          typeof _super[name] == "function" &&
          fnTest.test(prop[name])
            ? (function (name, fn) {
                return function () {
                  var tmp = this._super;
                  this._super = _super[name];
                  var ret = fn.apply(this, arguments);
                  this._super = tmp;
                  return ret;
                };
              })(name, prop[name])
            : prop[name];
      }
      function Class() {
        if (!initializing && this.construct)
          this.construct.apply(this, arguments);
      }
      Class.prototype = prototype;
      Class.constructor = Class;
      Class.extend = arguments.callee;
      return Class;
    };
  })(ns);
  (function (ns) {
    if (typeof ns.EventDispatcher != "undefined") return;
    ns.EventDispatcher = ns.Class.extend({
      construct: function () {
        this.listeners = {};
      },
      addEventListener: function (name, func, thisObj) {
        if (typeof this.listeners[name] == "undefined")
          this.listeners[name] = [];
        this.listeners[name].push({ func: func, thisObj: thisObj });
      },
      removeEventListener: function (name, func, thisObj) {
        if (typeof this.listeners[name] == "undefined") return;
        for (var i = this.listeners[name].length - 1; i >= 0; i--) {
          if (
            this.listeners[name][i]["func"] === func &&
            this.listeners[name][i]["thisObj"] === thisObj
          ) {
            this.listeners[name].splice(i, 1);
          }
        }
      },
      dispatchEvent: function (name, data) {
        if (
          typeof this.listeners[name] != "undefined" ||
          typeof this.listeners["*"] != "undefined"
        ) {
          var e = { name: name, target: this, data: data };
          var l = []
            .concat(this.listeners[name] || [])
            .concat(this.listeners["*"] || []);
          for (var i = 0; i < l.length; i++) {
            if (typeof l[i]["func"] == "function") {
              l[i]["func"].apply(l[i]["thisObj"], [e]);
            } else if (
              typeof l[i]["func"] == "string" &&
              typeof l[i]["thisObj"] == "object"
            ) {
              if (typeof l[i]["thisObj"][l[i]["func"]] == "function") {
                l[i]["thisObj"][l[i]["func"]].apply(l[i]["thisObj"], [e]);
              }
            }
          }
        }
      },
      forwardEvent: function (e) {
        this.dispatchEvent(e.name, e.data);
      },
    });
  })(ns);
  (function (ns) {
    window.InSkinUtil = ns.Util = {
      random: function () {
        return parseInt(Math.random() * 1e6);
      },
      setCookie: function (name, value, expires, path, domain, secure) {
        if (expires) {
          var now = new Date();
          now.setTime(now.getTime() + expires * 1e3);
          expires = now;
        }
        var cookie =
          name +
          "=" +
          escape(value) +
          (expires ? "; expires=" + expires.toGMTString() : "") +
          (path ? "; path=" + path : "") +
          (domain ? "; domain=" + domain : "") +
          (secure ? "; secure" : "");
        document.cookie = cookie;
      },
      getCookie: function (name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
          begin = dc.indexOf(prefix);
          if (begin != 0) return null;
        } else {
          begin += 2;
        }
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
          end = dc.length;
        }
        return unescape(dc.substring(begin + prefix.length, end));
      },
      delCookie: function (name, path, domain) {
        if (this.getCookie(name)) {
          document.cookie =
            name +
            "=" +
            (path ? "; path=" + path : "") +
            (domain ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
      },
      getCookieSupport: function () {
        var persist = true;
        do {
          var c = "gCStest=" + Math.floor(Math.random() * 1e8);
          var opt = ";SameSite=None;secure";
          document.cookie = persist
            ? c + opt + ";expires=Tue, 01-Jan-2030 00:00:00 GMT"
            : c + opt;
          if (document.cookie.indexOf(c) != -1) {
            document.cookie =
              c + opt + ";expires=Sat, 01-Jan-2000 00:00:00 GMT";
            return persist;
          }
        } while (!(persist = !persist));
        return null;
      },
      setISAPCookies: function (json) {
        if (!this.env("ios") && !this.env("safari")) return;
        try {
          ns.$.each(
            { Session: 1800, Persistent: 1 * 365 * 24 * 60 * 60 },
            function (type, expire) {
              if (typeof json[type + "Cookies"] == "undefined") return true;
              var existing_cookie_str = ns.Util.getCookie("ISAP" + type),
                cookie = ns.$.extend(
                  {},
                  existing_cookie_str ? ns.JSON.parse(existing_cookie_str) : {},
                  json[type + "Cookies"]
                ),
                cookie_str = ns.JSON.stringify(cookie);
              ns.Util.setCookie("ISAP" + type, cookie_str, expire, "/");
            }
          );
        } catch (e) {
          ns.Debug.error("Error: caught exception is Util::setISAPCookies().");
        }
      },
      getISAPCookies: function () {
        if (!this.env("ios") && !this.env("safari")) return;
        try {
          var ISAPSession = this.getCookie("ISAPSession"),
            ISAPPersistent = this.getCookie("ISAPPersistent"),
            cookies = {};
          ns.$.extend(cookies, ISAPSession ? JSON.parse(ISAPSession) : {});
          ns.$.extend(
            cookies,
            ISAPPersistent ? JSON.parse(ISAPPersistent) : {}
          );
          var data = [];
          for (var name in cookies) {
            data.push(name + "==" + cookies[name]);
          }
          return data.length ? { vstrCookieData: data.join("&&") } : {};
        } catch (e) {
          ns.Debug.error("Error: caught exception is Util::getISAPCookies().");
        }
      },
      setCreativeCookie: function (creativeID, name, value, expires) {
        var cookieName =
          "ISMCreative" + (expires ? "Persistent" : "Session") + "_";
        cookieName += creativeID;
        try {
          var cookie = this.getCookie(cookieName),
            obj = cookie ? JSON.parse(cookie) : {};
          if (value === undefined) {
            delete obj[name];
          } else {
            if (expires) {
              obj[name] = {
                value: value,
                expires: new Date().getTime() + expires * 1e3,
              };
            } else {
              obj[name] = value;
            }
          }
          var cookieValue = JSON.stringify(obj);
          this.setCookie(
            cookieName,
            cookieValue,
            expires ? 365 * 86400 : 0,
            "/"
          );
        } catch (e) {}
      },
      getCreativeCookies: function (creativeID) {
        try {
          var persistent = this.getCookie(
              "ISMCreativePersistent_" + creativeID
            ),
            persistentObj = persistent ? JSON.parse(persistent) : {},
            session = this.getCookie("ISMCreativeSession_" + creativeID),
            sessionObj = session ? JSON.parse(session) : {};
          var now = new Date().getTime();
          for (var name in persistentObj) {
            if (now > persistentObj[name].expires) {
              delete persistentObj[name];
            } else {
              persistentObj[name] = persistentObj[name].value;
            }
          }
          return { persistent: persistentObj, session: sessionObj };
        } catch (e) {}
        return {};
      },
      URLEncode: function (plaintext) {
        var SAFECHARS =
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_.!~*'()";
        var HEX = "0123456789ABCDEF";
        var encoded = "";
        for (var i = 0; i < plaintext.length; i++) {
          var ch = plaintext.charAt(i);
          if (ch == " ") {
            encoded += "+";
          } else if (SAFECHARS.indexOf(ch) != -1) {
            encoded += ch;
          } else {
            var charCode = ch.charCodeAt(0);
            if (charCode > 255) {
              encoded += "+";
            } else {
              encoded += "%";
              encoded += HEX.charAt((charCode >> 4) & 15);
              encoded += HEX.charAt(charCode & 15);
            }
          }
        }
        return encoded;
      },
      URLDecode: function (encoded) {
        var HEXCHARS = "0123456789ABCDEFabcdef";
        var plaintext = "";
        var i = 0;
        while (i < encoded.length) {
          var ch = encoded.charAt(i);
          if (ch == "+") {
            plaintext += " ";
            i++;
          } else if (ch == "%") {
            if (
              i < encoded.length - 2 &&
              HEXCHARS.indexOf(encoded.charAt(i + 1)) != -1 &&
              HEXCHARS.indexOf(encoded.charAt(i + 2)) != -1
            ) {
              plaintext += unescape(encoded.substr(i, 3));
              i += 3;
            } else {
              i++;
            }
          } else {
            plaintext += ch;
            i++;
          }
        }
        return plaintext;
      },
      tryFunctionNTimes: function (f, successF, errorF, N, delay) {
        if (!delay) delay = 250;
        N--;
        var sw = false;
        try {
          sw = f();
        } catch (e) {
          sw = false;
        }
        if (sw) {
          successF();
          return;
        }
        if (N > 0) {
          var _self = this;
          setTimeout(function () {
            _self.tryFunctionNTimes(f, successF, errorF, N, delay);
          }, delay);
        } else {
          errorF();
        }
      },
      getObject: function (id, doc) {
        if (doc) {
          if (doc[id]) {
            return doc[id];
          }
          if (navigator.appName.indexOf("Microsoft Internet") == -1) {
            if (doc.embeds && doc.embeds[id]) {
              return doc.embeds[id];
            }
          } else {
            return doc.getElementById(id);
          }
        } else {
          if (window.document[id]) {
            return window.document[id];
          }
          if (navigator.appName.indexOf("Microsoft Internet") == -1) {
            if (document.embeds && document.embeds[id]) {
              return document.embeds[id];
            }
          } else {
            return document.getElementById(id);
          }
        }
      },
      getFrameDoc: function (id) {
        try {
          var o = document.getElementById(id);
          if (o) {
            if (o.contentDocument) {
              return o.contentDocument;
            } else if (o.contentWindow) {
              return o.contentWindow.document;
            } else {
              return o.document;
            }
          }
        } catch (e) {}
        return null;
      },
      calculateMaxWH: function (ar, w, h) {
        var ww = w;
        var hh = Math.round(w / ar);
        if (hh > h) {
          hh = h;
          ww = Math.round(h * ar);
        }
        return { w: ww, h: hh };
      },
      loadURL: function (url, unmask) {
        if (!unmask) {
          url = this.hideReferer(url) + "&tracker=true";
          var $iframe = ns
            .$("<iframe></iframe>")
            .css({
              position: "absolute",
              width: "1px",
              height: "1px",
              top: "-100px",
              left: "-100px",
            })
            .attr("src", url)
            .appendTo("body");
          setTimeout(function () {
            $iframe.remove();
          }, 15 * 1e3);
        } else {
          var img = document.createElement("img");
          img.setAttribute("src", url);
        }
      },
      getURLParam: function (name) {
        try {
          var s = window.location.search.substring(1);
          var a = s.split("&");
          for (var i = 0; i < a.length; i++) {
            var b = a[i].split("=");
            if (b[0] == name) return b[1];
          }
        } catch (e) {}
        return null;
      },
      getURLParams: function () {
        try {
          var r = {};
          var s = window.location.search.substring(1);
          var a = s.split("&");
          for (var i = 0; i < a.length; i++) {
            var b = a[i].split("=");
            r[b[0]] = b[1];
          }
          return r;
        } catch (e) {}
        return {};
      },
      getInSkinParams: function (id) {
        var params = ns.$.extend(
          {},
          typeof InSkinParams[id] == "object" ? InSkinParams[id] : {},
          typeof InSkinGetParams == "function" ? InSkinGetParams(id) : {}
        );
        if (!params["srv_Resolution"] || params["srv_Resolution"] == "") {
          params["srv_Resolution"] = screen.width;
        }
        if (!params["srv_ResWidth"]) params["srv_ResWidth"] = screen.width;
        if (!params["srv_ResHeight"]) params["srv_ResHeight"] = screen.height;
        var urlParams = this.getURLParams();
        for (var k in urlParams) {
          if (
            k == "BASE_URL" ||
            k == "DEBUG" ||
            k == "InSkinDebug" ||
            k.match(/^(srv|sas|plr|cnt|skn)_/)
          )
            params[k] = urlParams[k];
        }
        return params;
      },
      getMetaParams: function (map) {
        var results = {};
        for (var i = 0; i < map.length; i += 2) {
          var value = ns
            .$("meta[name]")
            .filter(function () {
              return this.name.toLowerCase() == map[i + 1].toLowerCase();
            })
            .attr("content");
          if (value) {
            if (map[i] == "srv_Keywords") {
              value = this.convertMetaKeywords(value);
            }
            this.addToParams(results, map[i], value);
          }
        }
        return results;
      },
      convertMetaKeywords: function (value) {
        if (value) {
          var kws = value.split(",");
          value = "";
          for (var i = 0; i < kws.length; i++) {
            var kw = kws[i].replace(/[^a-zA-Z0-9]/g, "");
            if (kw.length > 0) value += "meta-" + kw + ", ";
          }
        }
        return value;
      },
      addToParams: function (params, param, value) {
        if (typeof params[param] != "undefined" && params[param].length > 0)
          value = params[param] + "," + value;
        params[param] = value;
      },
      registerGlobalFunction: function (name, f, thisObj) {
        var of = typeof window[name] == "function" ? window[name] : null;
        window[name] = function () {
          var args = f.apply(thisObj, arguments);
          if (of) of.apply(window, args ? args : arguments);
        };
      },
      embedWithSWFObject1x: function (
        url,
        div,
        w,
        h,
        flashvars,
        params,
        attributes
      ) {
        if (typeof ns.SWFObject != "undefined") {
          var so = new ns.SWFObject(url, attributes["id"], w, h, "8", "");
          for (var k in flashvars) so.addVariable(k, flashvars[k]);
          for (var k in params) so.addParam(k, params[k]);
          so.write(div);
          if (typeof attributes["styleclass"] != "undefined") {
            var obj = this.getObject(attributes["id"]);
            if (obj) obj.setAttribute("class", attributes["styleclass"]);
          }
        } else {
          ns.Debug.error("Error: SWFObject (1.x) is not defined.");
        }
      },
      embedWithSWFObject2x: function (
        url,
        div_id,
        w,
        h,
        flashvars,
        params,
        attributes
      ) {
        if (typeof ns.swfobject != "undefined") {
          ns.swfobject.embedSWF(
            url,
            div_id,
            w,
            h,
            "8.0.0",
            "",
            flashvars,
            params,
            attributes
          );
        } else {
          ns.Debug.error("Error: swfobject (2.x) is not defined.");
        }
      },
      embedWithHTML: function (url, div, w, h, flashvars, params, attributes) {
        if (div.constructor === String) div = document.getElementById(div);
        if (div) {
          var flashvars_arr = [];
          for (var k in flashvars)
            flashvars_arr.push(k + "=" + escape(flashvars[k]));
          var flashvars_str = flashvars_arr.join("&");
          var html = "";
          html +=
            '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" width="' +
            w +
            '" height="' +
            h +
            '" id="' +
            attributes.id +
            '"' +
            (attributes.styleclass
              ? ' class="' + attributes.styleclass + '"'
              : "") +
            ">";
          for (var k in params) {
            html += '<param name="' + k + '" value="' + params[k] + '" />';
          }
          html += '<param name="flashvars" value="' + flashvars_str + '" />';
          html += '<param name="movie" value="' + url + '" />';
          html +=
            '<embed type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' +
            url +
            '" width="' +
            w +
            '" height="' +
            h +
            '" name="' +
            attributes.name +
            '" flashvars="' +
            flashvars_str +
            '"' +
            (attributes.styleclass
              ? ' class="' + attributes.styleclass + '"'
              : "");
          for (var k in params) {
            html += " " + k + '="' + params[k] + '"';
          }
          html += " />";
          html += "</object>";
          div.innerHTML = html;
        }
      },
      callFlash: function (swf, methodName) {
        try {
          var args = [];
          for (var i = 2; i < arguments.length; i++) args.push(arguments[i]);
          return swf[methodName](args);
        } catch (e) {
          ns.Debug.error(
            'Error: Util::callFlash() caught exception calling "' +
              methodName +
              '".'
          );
          ns.Debug.error(swf[methodName]);
          for (var i = 0; i < args.length; i++) ns.Debug.error(args[i]);
        }
        return null;
      },
      loadCSS: function (url, doc) {
        if (!doc) doc = document;
        var el = doc.createElement("link");
        el.setAttribute("type", "text/css");
        el.setAttribute("href", url);
        el.setAttribute("rel", "stylesheet");
        try {
          var hd = doc.getElementsByTagName("head")[0];
          hd.appendChild(el);
        } catch (e) {
          ns.Debug.error('Error: unable to load CSS file "' + url + '".');
        }
      },
      getWindowW: function (win) {
        if (!win) win = window;
        return this.getWindowFilter(
          win.innerWidth ? win.innerWidth : 0,
          win.document.documentElement
            ? win.document.documentElement.clientWidth
            : 0,
          win.document.body ? win.document.body.clientWidth : 0
        );
      },
      getWindowH: function (win) {
        if (!win) win = window;
        return this.getWindowFilter(
          win.innerHeight ? win.innerHeight : 0,
          win.document.documentElement
            ? win.document.documentElement.clientHeight
            : 0,
          win.document.body ? win.document.body.clientHeight : 0
        );
      },
      getWindowScrollT: function (win) {
        if (!win) win = window;
        return this.getWindowFilter(
          win.pageYOffset ? win.pageYOffset : 0,
          win.document.documentElement
            ? win.document.documentElement.scrollTop
            : 0,
          win.document.body ? win.document.body.scrollTop : 0
        );
      },
      getWindowScrollL: function (win) {
        if (!win) win = window;
        return this.getWindowFilter(
          win.pageXOffset ? win.pageXOffset : 0,
          win.document.documentElement
            ? win.document.documentElement.scrollLeft
            : 0,
          win.document.body ? win.document.body.scrollLeft : 0
        );
      },
      getWindowFilter: function (n_win, n_docel, n_body) {
        var n_result = n_win ? n_win : 0;
        if (n_docel && (!n_result || n_result > n_docel)) n_result = n_docel;
        return n_body && (!n_result || n_result > n_body) ? n_body : n_result;
      },
      getDocumentW: function (doc) {
        if (!doc) doc = document;
        return Math.max(
          Math.max(
            doc.body && doc.body.scrollWidth ? doc.body.scrollWidth : 0,
            doc.documentElement && doc.documentElement.scrollWidth
              ? doc.documentElement.scrollWidth
              : 0
          ),
          Math.max(
            doc.body && doc.body.offsetWidth ? doc.body.offsetWidth : 0,
            doc.documentElement && doc.documentElement.offsetWidth
              ? doc.documentElement.offsetWidth
              : 0
          ),
          Math.max(
            doc.body && doc.body.clientWidth ? doc.body.clientWidth : 0,
            doc.documentElement && doc.documentElement.clientWidth
              ? doc.documentElement.clientWidth
              : 0
          )
        );
      },
      getDocumentH: function (doc) {
        if (!doc) doc = document;
        return Math.max(
          Math.max(
            doc.body && doc.body.scrollHeight ? doc.body.scrollHeight : 0,
            doc.documentElement && doc.documentElement.scrollHeight
              ? doc.documentElement.scrollHeight
              : 0
          ),
          Math.max(
            doc.body && doc.body.offsetHeight ? doc.body.offsetHeight : 0,
            doc.documentElement && doc.documentElement.offsetHeight
              ? doc.documentElement.offsetHeight
              : 0
          ),
          Math.max(
            doc.body && doc.body.clientHeight ? doc.body.clientHeight : 0,
            doc.documentElement && doc.documentElement.clientHeight
              ? doc.documentElement.clientHeight
              : 0
          )
        );
      },
      iesixFixHeight: function (obj) {
        if (
          obj &&
          obj["id"] &&
          obj.id.substr(0, 20) == "InSkinBaseContainer_"
        ) {
          var h = obj.parentNode.offsetHeight;
          if (h) {
            var id = obj.id.substr(20);
            var o = document.getElementById(id);
            if (o) o.style.height = h + "px";
            return h + "px";
          }
        }
        return "auto";
      },
      track: function (params, trackURL) {
        return;
        if (!trackURL)
          trackURL =
            "http://data.inskinmedia.com/trackports/rep/base/track.php";
        try {
          ns.$.ajax({
            type: "GET",
            url: trackURL,
            data: params,
            success: function () {},
            dataType: "jsonp",
          });
        } catch (e) {}
      },
      getFlashVersion: function () {
        if (typeof ns.swfobject != "undefined") {
          var v = ns.swfobject.getFlashPlayerVersion();
          if (typeof v.major != "undefined") return v.major;
        }
        return 0;
      },
      objToString: function (obj, level) {
        if (!level) level = 1;
        var pref1 = "";
        var pref2 = "";
        var i = 0;
        for (i = 0; i < level; i++) pref1 += "        ";
        for (i = 1; i < level; i++) pref2 += "        ";
        var s = "{\n";
        for (var k in obj) {
          if (obj[k] && typeof obj[k] == "object")
            s += pref1 + k + ": " + this.objToString(obj[k], level + 1) + "\n";
          else s += pref1 + k + ": " + obj[k] + "\n";
        }
        s += pref2 + "}\n";
        return s;
      },
      replaceTokens: function (s, values) {
        s += "";
        return s.replace(/\${([^}]+)}/g, function (match, key) {
          switch (key) {
            case "timestamp":
              return new Date().getTime();
              break;
            case "random":
              return Math.floor(Math.random() * 1e17);
              break;
            default:
              return values && values[key] ? values[key] : "";
          }
        });
      },
      getScriptURLParameters: function (match_regexp, field_separator) {
        if (!field_separator) field_separator = "&";
        var scripts = document.getElementsByTagName("script");
        var matches;
        for (var i = 0; i < scripts.length; i++) {
          if (!(matches = scripts[i].src.match(match_regexp))) continue;
          var params = {};
          var a = matches[1].split(field_separator);
          for (var j = 0; j < a.length; j++) {
            if (a[j] == "") continue;
            var b = a[j].split("=");
            params[b[0]] =
              typeof b[1] != "undefined" ? this.URLDecode(b[1]) : "";
          }
          return params;
        }
        return null;
      },
      getMetaTag: function (name) {
        return ns.$("meta[name=" + name + "]");
      },
      setMetaTag: function (name, attrs) {
        var mt = this.getMetaTag(name);
        if (!mt.length)
          mt = ns.$("<meta />").attr("name", name).appendTo("head");
        mt.attr(attrs);
      },
      getMetaTagAttr: function (name, _attrName) {
        if (!_attrName) _attrName = "content";
        return this.getMetaTag(name).attr(_attrName);
      },
      setMetaTagAttr: function (name, value, _attrName) {
        if (!_attrName) _attrName = "content";
        var attrs = {};
        attrs[_attrName] = value;
        this.setMetaTag(name, attrs);
      },
      getMetaTagParams: function (name, _attrName) {
        var params = {},
          value;
        if ((value = this.getMetaTagAttr(name, _attrName))) {
          var kv = value.split(/\s*[,;]\s*/);
          var p = {};
          for (var i = 0; i < kv.length; i++) {
            var a = kv[i].split(/\s*=\s*/);
            p[a[0]] = a[1] ? a[1] : null;
          }
          ns.$.extend(params, p);
        }
        return params;
      },
      setMetaTagParams: function (name, params, _attrName) {
        var p = this.getMetaTagParams(name, _attrName);
        ns.$.extend(p, params);
        var a = [];
        for (var k in p) {
          a.push(k + (p[k] ? "=" + p[k] : ""));
        }
        this.setMetaTagAttr(name, a.join(","), _attrName);
      },
      setViewport: function (w) {
        var p = this.getMetaTagParams("viewport");
        ns.$.extend(p, { width: w });
        delete p["minimum-scale"];
        delete p["maximum-scale"];
        delete p["initial-scale"];
        var a = [];
        for (var k in p) {
          a.push(k + (p[k] ? "=" + p[k] : ""));
        }
        this.setMetaTagAttr("viewport", a.join(","));
        if (!isNaN(parseInt(w))) {
          ns.$("#InSkinViewport").remove();
          ns.$(
            '<style id="InSkinViewport" type="text/css">@-ms-viewport {width: ' +
              w +
              "px;}</style>"
          ).appendTo("head");
        }
      },
      survey: function (data, doc) {
        var w = 382,
          h = 244;
        var container = ns
          .$("<div></div>")
          .addClass("InSkinSurvey")
          .css({
            width: w + "px",
            height: h + "px",
            "margin-left": -Math.round(w / 2) + "px",
            "margin-top": -Math.round(h / 2) + "px",
          });
        if (!data.cfg["dialogueText"]) data.cfg["dialogueText"] = "";
        if (!data.cfg["dialogueExitText"]) data.cfg["dialogueExitText"] = "";
        var link = data.cfg["link"] ? data.cfg["link"] : "javascript:;";
        link = replaceVars(link);
        var textcontainer = ns
          .$("<div></div>")
          .addClass("textcontainer")
          .appendTo(container);
        var dialoguetext = ns
          .$("<div></div>")
          .addClass("dialoguetext")
          .html(data.cfg["dialogueText"])
          .appendTo(textcontainer);
        var exittext = ns
          .$("<div></div>")
          .addClass("exittext")
          .html(data.cfg["dialogueExitText"])
          .appendTo(textcontainer);
        var buttoncontainer = ns
          .$("<div></div>")
          .addClass("buttoncontainer")
          .appendTo(container);
        var dialoguebuttons = ns
          .$("<div></div>")
          .addClass("dialoguebuttons")
          .appendTo(buttoncontainer);
        var okbuttontext = data.cfg["okButtonText"]
          ? data.cfg["okButtonText"]
          : "";
        okbuttontext =
          '<img src="' +
          CDN_URL +
          '/InSkinFiles/survey/buttonOff.png" width="147" height="30" border="0" />';
        var okbutton = ns
          .$('<a target="_blank"></a>')
          .addClass("ok")
          .attr("href", link)
          .html(okbuttontext)
          .appendTo(dialoguebuttons);
        var kobuttontext = data.cfg["koButtonText"]
          ? data.cfg["koButtonText"]
          : "";
        kobuttontext =
          '<img src="' +
          CDN_URL +
          '/InSkinFiles/survey/decline.png?v=1" width="98" height="10" />';
        var kobutton = ns
          .$('<a href="javascript:;"></a>')
          .addClass("ko")
          .html(kobuttontext)
          .appendTo(dialoguebuttons);
        var exitbuttons = ns
          .$("<div></div>")
          .addClass("exitbuttons")
          .appendTo(buttoncontainer);
        var exitbuttontext = data.cfg["exitButtonText"]
          ? data.cfg["exitButtonText"]
          : "";
        exitbuttontext =
          '<img src="' +
          CDN_URL +
          '/InSkinFiles/survey/return.png" width="147" height="30" />';
        var exitbutton = ns
          .$('<a href="javascript:;"></a>')
          .addClass("exit")
          .html(exitbuttontext)
          .appendTo(exitbuttons);
        var closeX = ns
          .$(
            '<a href="javascript:;"><img src="' +
              CDN_URL +
              '/InSkinFiles/survey/close.png" width="18" height="17" /></a>'
          )
          .addClass("close")
          .appendTo(container);
        okbutton.click(ok);
        kobutton.click(close);
        exitbutton.click(close);
        closeX.click(close);
        container.appendTo(doc.body);
        function ok(e) {
          ns.Util.setCookie("InSkinSurvey", "1", 30 * 86400, "/");
          dialoguetext.hide();
          dialoguebuttons.hide();
          exittext.show();
          exitbuttons.show();
        }
        function close(e) {
          setTimeout(function () {
            container.empty().remove();
            data.closeCallback();
          }, 0);
        }
        function replaceVars(s) {
          if (!s) return "";
          if (data["params"]) {
            for (var k in data.params) {
              s = s.split("${" + k + "}").join(data.params[k]);
            }
          }
          return s;
        }
      },
      surveyShown: function () {
        return ns.Util.getCookie("InSkinSurvey") == "1";
      },
      createDetachedSWFUnitContainer: function (settings) {
        var css = { position: "absolute", width: "1px", height: "1px" },
          jcontainer = ns
            .$("<div><div></div></div>", settings.win.document)
            .addClass("InSkinUnitContainer")
            .css(css)
            .prependTo(settings.win.document.body);
        return new ns["4.2"].SWFUnitContainer(
          ns.$.extend(settings, {
            jcontainer: jcontainer,
            jtarget: jcontainer.children(":first"),
          })
        );
      },
      showElements: function (hsel, rsel, doc) {
        if (!doc) doc = document;
        if (hsel && hsel != "") {
          ns.$(hsel, doc).find("*").andSelf().css("visibility", "visible");
        }
        if (rsel && rsel != "") {
          ns.$(rsel, doc).show();
        }
      },
      hideElements: function (hsel, rsel, doc) {
        if (!doc) doc = document;
        if (hsel && hsel != "") {
          ns.$(hsel, doc).find("*").andSelf().css("visibility", "hidden");
        }
        if (rsel && rsel != "") {
          ns.$(rsel, doc).hide();
        }
      },
      env: function () {
        var sw, check;
        for (var i = 0; i < arguments.length; i++) {
          sw = false;
          check = arguments[i].toLowerCase();
          switch (check) {
            case "touch":
              sw = "ontouchstart" in window;
              break;
            case "ipad":
              if (navigator.userAgent.match(/ipad/i)) {
                sw = true;
              }
              break;
            case "ios":
              if (navigator.userAgent.match(/ipad|iphone|ipod/i)) {
                sw = true;
              }
              break;
            case "chrome":
              if (navigator.userAgent.match(/chrome/i)) {
                sw = true;
              }
              break;
            case "safari":
              if (
                navigator.userAgent.match(/safari/i) &&
                !navigator.userAgent.match(/chrome/i)
              ) {
                sw = true;
              }
              break;
            case "mstouch":
              if (
                navigator.userAgent.match(/MSIE/i) &&
                navigator.userAgent.match(/touch/i)
              ) {
                sw = true;
              }
              break;
          }
          if (!sw) break;
        }
        return sw;
      },
      css_size: function (size, total) {
        size += "";
        var prc = size.match(/^\d+\%$/) ? true : false;
        return prc
          ? !total
            ? size
            : Math.round((parseInt(size) / 100) * total) + "px"
          : parseInt(size) + "px";
      },
      css2obj: function (css) {
        var obj = {};
        var a = css.split(/\s*;\s*/);
        for (var i = 0; i < a.length; i++) {
          var b = a[i].split(/\s*:\s*/);
          obj[b[0]] = b[1];
        }
        return obj;
      },
      addBorder: function (target, params, style) {
        var borderStyle = "";
        for (prop in style) {
          borderStyle += " " + prop + ": " + style[prop] + ";";
        }
        if (params["align"] == "bottom") {
          var inlinestyle =
            "bottom: 0px; left: " +
            (params.from.x - target.offset()["left"]) +
            "px; height: " +
            params.size +
            "px; width: " +
            Math.abs(params.from.x - params.to.x) +
            "px;";
        } else if (params["align"] == "top") {
          var inlinestyle =
            "top: 0px; left: " +
            (params.from.x - target.offset()["left"]) +
            "px; height: " +
            params.size +
            "px; width: " +
            Math.abs(params.from.x - params.to.x) +
            "px;";
        } else if (params["align"] == "left") {
          var inlinestyle =
            "left: 0px; top: " +
            (params.from.y - target.offset()["top"]) +
            "px; width: " +
            params.size +
            "px; height: " +
            Math.abs(params.from.y - params.to.y) +
            "px;";
        } else if (params["align"] == "right") {
          var inlinestyle =
            "right: 0px; top: " +
            (params.from.y - target.offset()["top"]) +
            "px; width: " +
            params.size +
            "px; height: " +
            Math.abs(params.from.y - params.to.y) +
            "px;";
        }
        target.append(
          '<div class="pseudoBorder" style="' +
            inlinestyle +
            borderStyle +
            '"></div>'
        );
      },
      hideReferer: function (url) {
        return (
          CDN_URL +
          "/redirect/index.html?url=" +
          encodeURIComponent(this.replaceTokens(url))
        );
      },
      i18n: function (key) {
        var dict = {
          en: { close: "CLOSE EXPANDABLE" },
          fr: { close: "FERMER" },
        };
        var lang =
          window.navigator.userLanguage || window.navigator.language || "en";
        lang = lang.toLowerCase();
        if (lang.indexOf("fr") >= 0) {
          lang = "fr";
        } else {
          lang = "en";
        }
        if (key) {
          return dict[lang][key] || dict.en[key];
        } else {
          return ns.$.extend({}, dict.en, dict[lang]);
        }
      },
      wt: function (params, isEvent) {
        var p = [
          "326",
          params.sectionId ? params.sectionId : "",
          "1",
          screen.width + "x" + screen.height,
          screen.colorDepth,
          "1",
          new Date().getTime(),
          isEvent ? "2" : "0",
          window.innerWidth ? window.innerWidth + "x" + window.innerHeight : "",
          navigator.javaEnabled ? "1" : "0",
        ].join(",");
        var url = "//inskin01.wt-eu02.net/288029354352268/wt?p=" + p;
        delete params.sectionId;
        if (!isEvent) {
          params.cp1 = window.location.hostname;
        }
        var userLanguage = navigator.language || navigator.userLanguage || "";
        params.la = userLanguage.split("-")[0];
        params.tz = -(new Date().getTimezoneOffset() / 60);
        params.tz = (
          params.tz < 0 ? Math.floor(params.tz) : Math.ceil(params.tz)
        ).toString();
        params.pu = window.location.href;
        params.eor = 1;
        for (var k in params) {
          if (params[k] != "")
            url += "&" + k + "=" + encodeURIComponent(params[k]);
        }
        var img = document.createElement("img");
        img.setAttribute("src", url);
      },
      buildQueryString: function (params, flatten) {
        flatten = !!flatten;
        if (!params) {
          return "";
        }
        var temp = [];
        for (var key in params) {
          var p = params[key],
            type = Object.prototype.toString.call(p);
          switch (type) {
            case "[object Array]":
              for (var i = 0; i < p.length; i++) {
                temp.push(key + "=" + encodeURIComponent(p[i]));
              }
              break;
            case "[object Object]":
              var prefix = !flatten ? key + "." : "";
              for (var k in p) {
                temp.push(prefix + k + "=" + encodeURIComponent(p[k]));
              }
              break;
            case "[object Boolean]":
              temp.push(key + "=" + p.toString());
              break;
            default:
              temp.push(key + "=" + encodeURIComponent(p));
          }
        }
        return temp.join("&");
      },
    };
  })(ns);
  (function (ns) {
    if (typeof ns.Debug != "undefined") return;
    ns.Debug = {
      level: 0,
      startTime: new Date().getTime(),
      loaded: false,
      init: function (level, loadNow, openNow) {
        if (!loadNow) loadNow = false;
        this.level = level && !isNaN(parseInt(level)) ? parseInt(level) : 0;
        if (this.level > 0 && !this.loaded) {
          this.loaded = true;
          ns.Logger.load(loadNow, openNow);
        }
      },
      error: function (msg) {
        if (this.level >= 1) this.print("error", msg);
      },
      warn: function (msg) {
        if (this.level >= 2) this.print("warn", msg);
      },
      info: function (msg) {
        if (this.level >= 3) this.print("info", msg);
      },
      debug: function (msg) {
        if (this.level >= 4) this.print("debug", msg);
      },
      trace: function (msg) {
        if (this.level >= 5) this.print("debug", msg);
      },
      print: function (type, msg) {
        if (typeof ns.Logger != "undefined") {
          msg += "";
          ns.Logger[type](msg.replace(/lt;/g, "&lt;").replace(/gt;/g, "&gt;"));
        }
      },
      htmlEscape: function (s) {
        s += "";
        return s.replace(/</g, "lt;").replace(/>/g, "gt;");
      },
    };
  })(ns);
  (function (ns) {
    ns["4.2"].ISAPClient = ns.EventDispatcher.extend({
      construct: function (uat) {
        this._super();
        ns.Debug.trace("ISAPClient object created.");
        if (uat) {
          this.DEFAULT_URL = this.POLLING_URL =
            "//staging.inskinad.com/ISAPAdServer/AdS.aspx";
        } else {
          this.DEFAULT_URL = this.POLLING_URL =
            "//isap.inskinad.com/ISAPAdServer/AdS.aspx";
        }
      },
      makeAdCall: function (p) {
        ns.Debug.trace("[" + p.id + "] ISAPClient::makeAdCall() called.");
        var params = [];
        for (var k in p.adCallParams) {
          if (k.substr(0, 4) != "srv_") continue;
          params.push(k + "=" + p.adCallParams[k]);
        }
        var data = params.join("&");
        ns.Debug.info("[" + p.id + "] ISAP Ad Call: " + data);
        var _self = this;
        this._call(
          this.DEFAULT_URL,
          "GetCampaignInformationFromUserData",
          { vstrCampaignData: data },
          function (json) {
            _self._onAdCallResult(json, p);
          }
        );
      },
      makeAdCallByAdvertID: function (advertID, p) {
        var _self = this;
        this._call(
          this.DEFAULT_URL,
          "GetCampaignInformationFromAdvertID",
          { vintAdvertID: advertID },
          function (json) {
            _self._onAdCallResult(json, p);
          }
        );
      },
      makeAdCallByCreativeID: function (creativeID, p) {
        var _self = this;
        this._call(
          this.DEFAULT_URL,
          "GetCampaignInformationFromCreativeID",
          { vintCreativeID: creativeID },
          function (json) {
            _self._onAdCallResult(json, p);
          }
        );
      },
      _onAdCallResult: function (json, p) {
        ns.Debug.trace("[" + p.id + "] ISAPClient::_onAdCallResult() called.");
        ns.Util.setISAPCookies(json);
        p["isap_Result"] = json;
        this.dispatchEvent("AD_CALL_RESULT", { p: p });
      },
      _onAdCallTimeout: function (x, t, m, p) {
        ns.Debug.trace("[" + p.id + "] ISAPClient::_onAdCallTimeout() called.");
        p["isap_Failure"] = t;
        this.dispatchEvent("AD_CALL_FAULT", { p: p });
      },
      updateStartTime: function (logID, displayMode) {
        ns.Debug.trace("ISAPClient::updateStartTime() called.");
        var params = { vstrLogID: logID };
        if (displayMode) {
          params.vintDisplayMode = displayMode;
        }
        this._call(
          this.DEFAULT_URL,
          "UpdateCampaignStartTime",
          params,
          "_onUpdateStartTimeResult"
        );
      },
      _onUpdateStartTimeResult: function (json) {
        ns.Debug.trace("ISAPClient::_onUpdateStartTimeResult() called.");
        ns.Util.setISAPCookies(json);
      },
      reportInteraction: function (interactionName, logID, unique) {
        ns.Debug.trace("ISAPClient::reportInteraction() called.");
        ns.Debug.info(
          "INTERACTION: " + interactionName + " (Unique: " + unique + ")"
        );
        this._call(
          this.DEFAULT_URL,
          "UpdateCustomInteraction",
          {
            vstrLogID: logID,
            vstrInteractionName: interactionName,
            vblnIsUniqueClick: unique ? "true" : "false",
          },
          "_onReportInteractionResult"
        );
        this.reportInteractionToTelemetry(interactionName, logID, unique);
      },
      reportInteractionToTelemetry: function (name, logId, unique) {
        var params = this.parseLogId(logId);
        var evt = {
          type: "interaction",
          name: name,
          creativeId: params.CreativeID,
          sectionId: params.SectionID,
          unique: unique,
          isap_iuid: params.UID,
        };
        var payload = JSON.stringify(evt);
        var req = new XMLHttpRequest();
        req.open("POST", "https://t.inskinad.com/rec");
        req.send(payload);
      },
      parseLogId: function (logId) {
        var parsed = {};
        String(logId)
          .split("&")
          .map(function (kv) {
            if (kv) {
              kv = kv.split("=");
              if (kv.length === 2) {
                parsed[kv[0]] = kv[1];
              }
            }
          });
        return parsed;
      },
      _onReportInteractionResult: function (json) {
        ns.Debug.trace("ISAPClient::_onReportInteractionResult() called.");
        ns.Util.setISAPCookies(json);
      },
      sendPollingData: function (logID, data) {
        ns.Debug.trace("ISAPClient::sendPollingData() called.");
        ns.Debug.debug("TIMERS: " + data);
        this._call(
          this.POLLING_URL,
          "UpdateCampaignViewTimeAll",
          { vstrLogID: logID, vstrDurationData: data },
          "_onSendPollingDataResult"
        );
      },
      _onSendPollingDataResult: function (json) {
        ns.Debug.trace("ISAPClient::_onSendPollingDataResult() called.");
        ns.Util.setISAPCookies(json);
      },
      GetEventInformationFromCampaignLog: function (logID, callback) {
        ns.Debug.trace(
          "ISAPClient::GetEventInformationFromCampaignLog() called."
        );
        this._call(
          this.DEFAULT_URL,
          "GetEventInformationFromCampaignLog",
          { vstrLogID: logID },
          function (json) {
            callback(json);
          }
        );
      },
      _call: function (
        url,
        methodName,
        params,
        callback,
        timeout_callback,
        timeout_value
      ) {
        params["method"] = methodName;
        ns.$.extend(params, ns.Util.getISAPCookies());
        var options = { url: url, data: params, dataType: "jsonp" };
        if (callback) {
          if (callback.constructor === String) {
            var _self = this;
            var _callback = function (json) {
              _self[callback].apply(_self, [json]);
            };
            options.success = _callback;
          } else {
            options.success = callback;
          }
        }
        if (timeout_callback) {
          options.timeout = timeout_value ? timeout_value : 5e3;
          if (timeout_callback.constructor === String) {
            var _self = this;
            var _timeout_callback = function (x, t, m) {
              _self[timeout_callback].apply(_self, [x, t, m]);
            };
            options.error = _timeout_callback;
          } else {
            options.error = timeout_callback;
          }
        }
        ns.$.ajax(options);
      },
    });
  })(ns);
  (function () {
    ISM = window.ISM ? window.ISM : (window.ISM = {});
    var rpc = null,
      logID,
      landingID,
      isapClient = null,
      seenInteractions = {};
    var seenEventTags = {};
    window._console = window.console;
    ISM.initData = {};
    ISM.creativeData = {};
    ISM.options = {};
    ISM.eventTagPrefix = "";
    ISM.eventTagCap = 50;
    ISM.eventTagCounters = {};
    var swTouchDevice = navigator.userAgent.match(/ipad|iphone|ipod|android/i);
    var cookieSupport = ns.Util.getCookieSupport();
    var swFbBrowser = /FBAN|FBAV/i.test(navigator.userAgent);
    ISM.SwipeoutDwellTime = trackDwellTime(true);
    catchHeavyAdInterventions();
    $(function () {
      landingID = ns.Util.getURLParam("landingID");
      if (landingID) {
        landingID = decodeURIComponent(landingID);
        ISM.eventTagPrefix = "EXPANDABLE_" + landingID + "_";
      }
      logID = ns.Util.getURLParam("logID");
      if (swFbBrowser || logID) {
        var UAT = ns.Util.getURLParam("UAT") == "true";
        isapClient = new ns["4.2"].ISAPClient(UAT);
      }
      if (logID) {
        logID = decodeURIComponent(logID);
        ISM.swBaseFile = false;
        isapClient.GetEventInformationFromCampaignLog(logID, function (json) {
          ISM.init({ ISAP: json });
          ISM.doStart();
          trackDwellTime();
        });
      } else {
        ISM.swBaseFile = true;
        try {
          createRPC();
        } catch (e) {}
      }
    });
    function createRPC() {
      rpc = new ns.easyXDM.Rpc(
        { swf: CDN_URL + "/isfe/resources/swf/easyxdm.swf" },
        {
          local: {
            callFunction: function () {
              return onFunctionCall.apply(null, arguments);
            },
            init: function (initData) {
              onFunctionCall("init", initData);
            },
            doStart: function (obj) {
              onFunctionCall("doStart", obj);
            },
            setCreativeData: function (creativeData) {
              onFunctionCall("setCreativeData", creativeData);
            },
          },
          remote: { IFrameEvent: true, callFunction: true },
        }
      );
    }
    function onFunctionCall(name) {
      if (typeof ISM[name] == "function") {
        return ISM[name].apply(ISM, Array.prototype.slice.call(arguments, 1));
      }
      if (typeof window[name] == "function") {
        return window[name].apply(
          null,
          Array.prototype.slice.call(arguments, 1)
        );
      }
    }
    function callFunction() {
      if (rpc) {
        rpc.callFunction.apply(rpc, arguments);
      }
    }
    ISM.init = function (initData) {
      this.initData = initData;
      if (typeof window.init == "function") {
        return window.init.apply(null, arguments);
      } else {
        this.sendInitComplete();
      }
    };
    ISM.set = function (data) {
      $.extend(true, this.initData, data);
    };
    ISM.doStart = function () {
      if (landingID) {
        if (this.initData && this.initData.ISAP) {
          if (this.initData.ISAP.impressionTrackers) {
            var trackers = this.initData.ISAP.impressionTrackers[landingID];
            if (trackers) {
              for (var i = 0; i < trackers.length; i++) {
                loadURL(
                  trackers[i].url,
                  this.initData.UnmaskURLs || trackers[i].unmask
                );
              }
            }
          }
        }
      }
      if (
        this.initData.ISAP.settings.trackMouse ||
        (this.initData.URLInfo &&
          this.initData.URLInfo.params["plr_EnableTrackMouse"] === "true")
      ) {
        var _self = this;
        $(window).on("mousemove", function (e) {
          ISM.shared.set({
            mouseX: e.pageX + _self.initData.offset["left"],
            mouseY: e.pageY + _self.initData.offset["top"],
          });
        });
      }
      $('script[type="text/tag"]').each(function () {
        var html = this.outerHTML,
          $el = $(replaceTokens(html));
        var src = $el.attr("data-src");
        if (src) {
          var script = document.createElement("script");
          script.setAttribute("type", "text/javascript");
          script.setAttribute("src", src);
          this.parentNode.insertBefore(script, this.nextSibling);
          $(this).remove();
        } else {
          $(this).replaceWith($el.attr("type", "text/javascript"));
        }
      });
      if (
        (this.initData.ISAP.Format == "Pagelead" ||
          this.initData.ISAP.Format == "Pagelead Video") &&
        this.initData.id == "fr"
      ) {
        document.addEventListener("touchstart", ISM.onTouchStart);
        document.addEventListener("touchmove", ISM.onTouchMove, {
          passive: false,
        });
        document.addEventListener("touchend", ISM.onTouchEnd);
      }
      $(window).on("touchstart", function (e) {
        ISM.sendEvent("TOUCH", true);
        ISM.callFunctionCreative("touchStart");
      });
      $(window).on("touchend", function (e) {
        ISM.sendEvent("TOUCH", false);
        ISM.callFunctionCreative("touchEnd");
      });
      if (typeof window.doStart == "function") {
        return window.doStart.apply(null, arguments);
      }
    };
    ISM.onTouchStart = function (e) {
      ISM.sendEvent("TOUCH_START", {
        pageX: e.touches[0].pageX,
        pageY: e.touches[0].pageY,
      });
    };
    ISM.onTouchMove = function (e) {
      ISM.sendEvent("TOUCH_MOVE", {
        pageX: e.touches[0].pageX,
        pageY: e.touches[0].pageY,
      });
      e.preventDefault();
    };
    ISM.onTouchEnd = function (e) {
      ISM.sendEvent("TOUCH_END", e);
    };
    ISM.setCreativeData = function (creativeData) {
      this.creativeData = creativeData;
      if (typeof window.setCreativeData == "function") {
        return window.setCreativeData.apply(null, arguments);
      }
    };
    ISM.sendEvent = function (name, data) {
      if (rpc) {
        rpc.IFrameEvent(name, data);
      }
    };
    ISM.sendInitComplete = function () {
      ISM.sendEvent("INIT_COMPLETE");
    };
    ISM.sendInteraction = function (name) {
      if (isapClient) {
        var unique = typeof seenInteractions[name] == "undefined";
        seenInteractions[name] = true;
        var _logID = swFbBrowser ? this.initData.logID : logID;
        isapClient.reportInteraction(name, _logID, unique);
      } else if (rpc) {
        ISM.sendEvent("INTERACTION", { name: name });
      }
    };
    ISM.eventTag = function (label, params, cap) {
      if (typeof label == "number") {
        label = "EVENT_TAG_" + label;
      }
      label = ISM.eventTagPrefix + label;
      if (label == "EVENT_TAG_99") {
        return;
      }
      cap = cap !== undefined ? cap : ISM.eventTagCap;
      if (cap) {
        if (!ISM.eventTagCounters[label]) {
          ISM.eventTagCounters[label] = 0;
        }
        ISM.eventTagCounters[label]++;
        if (ISM.eventTagCounters[label] > cap) {
          return;
        }
      }
      var data = { label: label, params: params };
      var cfg;
      if (this.initData && this.initData.ISAP && this.initData.ISAP.events) {
        cfg = this.initData.ISAP.events[label];
        if (cfg) {
          if (cfg.compatible) {
            cfg.compatibleId = 1;
          }
          if (cfg.url && cfg.compatibleId) {
            cfg.url = cfg.url.replace(/^https?:/, "");
          }
          var onHttps = !!this.initData.onHTTPS;
          if (
            cfg.url &&
            (!cfg.overlay ||
              (swTouchDevice &&
                (cfg.lockOrientation === undefined || !cfg.compatible)) ||
              (onHttps && !cfg.compatibleId))
          ) {
            var url = cfg.url;
            if (cfg.compatibleId) {
              var logID = encodeURIComponent(ISM.initData.ISAP.CampaignLogID);
              url += (url.match(/\?/) ? "&" : "?") + "logID=" + logID;
              url += "&landingID=" + encodeURIComponent(cfg.compatibleId);
              if (this.initData.UAT) {
                url += "&UAT=true";
              }
              if (params) {
                url += "&" + ns.Util.buildQueryString(params);
              }
            }
            data.urlOpened = true;
            if (swFbBrowser) {
              var _self = this;
              setTimeout(function () {
                openURL(url, false, true);
              }, 250);
            } else {
              openURL(
                url,
                landingID ? true : false,
                this.initData.UnmaskURLs || cfg.unmask
              );
            }
          }
          data.trackersFired = true;
          if (cfg.trackers && cfg.trackers.length) {
            for (var i = 0; i < cfg.trackers.length; i++) {
              if (swFbBrowser) {
                loadURL(cfg.trackers[i], true);
              } else {
                loadURL(
                  cfg.trackers[i],
                  this.initData.UnmaskURLs || cfg.unmask
                );
              }
            }
          }
        }
      }
      if (!swFbBrowser) {
        ISM.sendEvent("EVENT_TAG", data);
      } else {
        var evt = this.initData.evtEventTag;
        if (cfg && evt) {
          delete evt.is_unique;
          delete evt.is_silent;
          evt.tag = Number(label.replace(/[^0-9]/g, ""));
          evt.reporting_name = cfg.reportName;
          evt.frame = this.initData.id;
          if (cfg.silent) {
            evt.is_silent = true;
          }
          var unique = typeof seenEventTags[label] == "undefined";
          seenEventTags[label] = true;
          if (unique) {
            evt.is_unique = true;
          }
          telemetry(evt);
        }
      }
      ISM.sendInteraction(label);
    };
    ISM.callFunction = function (targets) {
      if (typeof targets == "string") {
        targets = [targets];
      }
      var args = Array.prototype.slice.call(arguments, 1);
      for (var i = 0; i < targets.length; i++) {
        callFunction.apply(null, [targets[i]].concat(args));
      }
    };
    ISM.callFunctionTop = function () {
      var args = Array.prototype.slice.call(arguments);
      this.callFunction.apply(ISM, ["ft"].concat(args));
    };
    ISM.callFunctionRight = function () {
      var args = Array.prototype.slice.call(arguments);
      this.callFunction.apply(ISM, ["fr"].concat(args));
    };
    ISM.callFunctionBottom = function () {
      var args = Array.prototype.slice.call(arguments);
      this.callFunction.apply(ISM, ["fb"].concat(args));
    };
    ISM.callFunctionLeft = function () {
      var args = Array.prototype.slice.call(arguments);
      this.callFunction.apply(ISM, ["fl"].concat(args));
    };
    ISM.callFunctionCreative = function () {
      var args = Array.prototype.slice.call(arguments);
      this.callFunction.apply(ISM, [["ft", "fr", "fb", "fl"]].concat(args));
    };
    ISM.callFunctionCreativeOthers = function () {
      var targets = [];
      for (var f in { ft: 1, fr: 1, fb: 1, fl: 1 }) {
        if (f != this.initData.id) targets.push(f);
      }
      var args = Array.prototype.slice.call(arguments);
      this.callFunction.apply(ISM, [targets].concat(args));
    };
    ISM.resize = function (obj) {
      ISM.sendEvent("RESIZE", obj);
    };
    ISM.scrollTo = function (pos) {
      ISM.sendEvent("SCROLL_TO", pos);
    };
    ISM.increase = function () {
      ISM.sendEvent("INCREASE");
    };
    ISM.decrease = function () {
      ISM.sendEvent("DECREASE");
    };
    ISM.setCookie = function (name, value, expires, path, domain, secure) {
      if (cookieSupport) {
        ns.Util.setCookie(
          name,
          JSON.stringify(value),
          expires,
          path,
          domain,
          secure
        );
      } else {
        ISM.callFunction("base", "setCookie", name, value, expires);
      }
    };
    ISM.getCookie = function (name, callback) {
      if (cookieSupport) {
        var cookie = ns.Util.getCookie(name),
          result = cookie ? JSON.parse(cookie) : null;
        if (callback) {
          callback(result);
        } else {
          return result;
        }
      } else {
        if (callback) {
          ISM.callFunction("base", "getCookie", name, function (value) {
            if (callback) {
              callback(value);
            }
          });
        } else {
          if (ISM.initData.cookies.session[name]) {
            return ISM.initData.cookies.session[name];
          }
          return ISM.initData.cookies.persistent[name] || null;
        }
      }
    };
    ISM.getState = function (settings) {
      var cookieData = null;
      var cfg = $.extend(
        {
          prefix: "ismAdTracker_",
          id: "",
          maxStates: 2,
          domain: getDomain(),
          path: "/",
          incrementDelay: 1e3,
          overrideParam: "ismState",
          daysToLive: 30,
        },
        settings
      );
      if (cfg.id == "") {
        try {
          cfg.id = ISM.initData.creativeID;
        } catch (e) {
          return false;
        }
      }
      var cookieName = cfg.prefix + cfg.id;
      var overrideState = ISM.initData.URLInfo.params[cfg.overrideParam];
      if (overrideState != undefined && !isNaN(overrideState)) {
        overrideState = parseInt(overrideState);
        if (overrideState >= cfg.maxStates) {
          updateState(1);
        } else {
          updateState(overrideState + 1);
        }
        return overrideState;
      }
      cookieData = ISM.getCookie(cookieName);
      if (cookieData != null) {
        if ("state" in cookieData) {
          if (cookieData["state"] < cfg.maxStates) {
            updateState(cookieData["state"] + 1);
            return cookieData["state"];
          } else {
            updateState(cfg.maxStates);
            return cfg.maxStates;
          }
        }
      } else {
        updateState(2);
        return 1;
      }
      function getDomain() {
        var hostname = location.hostname,
          startIndex = 0,
          searchStrLen = 1,
          index,
          indices = [],
          result;
        while ((index = hostname.indexOf(".", startIndex)) > -1) {
          indices.push(index);
          startIndex = index + searchStrLen;
        }
        if (indices.length == 1) {
          result = "." + hostname;
        } else if (indices.length == 2) {
          result = hostname.substr(indices[0], hostname.length);
        }
        return result || hostname;
      }
      function updateState(stateNum) {
        if (ISM.initData.id == "ft") {
          setTimeout(function () {
            ISM.setCookie(
              cookieName,
              { state: stateNum },
              cfg.daysToLive * 24 * 60 * 60,
              cfg.path,
              cfg.domain
            );
          }, cfg.incrementDelay);
        }
      }
    };
    ISM.VideoPlayer = function (settings, readyCallback) {
      var cfg = $.extend(
        {
          videoId: "video1",
          videoItems: [],
          playInFullscreen: false,
          autoplay: true,
          trackingCallback: null,
          playCallback: null,
          videojs: { preload: "none" },
        },
        settings
      );
      var videos = [],
        currIndex,
        player,
        p,
        fullscreenBug = false,
        isFirstPlay = true,
        readyCount = 0,
        playTimer,
        videoLoading = false;
      $.each(cfg.videoItems, function () {
        var sources = {};
        if ("mp4" in this) sources.mp4 = this.mp4;
        if ("ogg" in this) sources.ogg = this.ogg;
        videos.push(new Video(this.name, sources, this.tracking));
      });
      if (cfg.autoplay) $.extend(cfg.videojs, { muted: true });
      var p = new vjs.Player(
        $("#" + cfg.videoId).get(0),
        cfg.videojs,
        function () {
          player = this;
          if (swTouchDevice) {
            player.controls(true);
            var frame = $("#rightFrame, #leftFrame, #topFrame, #bottomFrame");
            if (frame.length)
              $(frame)
                .eq(0)
                .css("-webkit-tap-highlight-color", "rgba(0, 0, 0, 0)");
            $(".vjs-big-play-button").css({ display: "none" });
            $("#" + cfg.videoId).on("touchmove", false);
            $("#" + cfg.videoId).bind("touchstart", function preventZoom(e) {
              var t2 = e.timeStamp,
                t1 = $(this).data("lastTouch") || t2,
                dt = t2 - t1,
                fingers = e.originalEvent.touches.length;
              $(this).data("lastTouch", t2);
              if (!dt || dt > 500 || fingers > 1) return;
              e.preventDefault();
            });
          }
          player.on("fullscreenchange", function () {
            ISM.sendEvent("FULLSCREEN", player.isFullscreen());
            if (cfg.playInFullscreen) {
              if (!player.isFullscreen()) {
                player.pause();
              }
            }
          });
          player.on("timeupdate", function () {
            var duration = player.duration();
            var t = player.currentTime();
            if (!duration || duration == Infinity || player.paused()) {
              return;
            }
            if (!videoLoading && videos[currIndex]) {
              videos[currIndex].updateTime(t, duration);
            }
            if (isFirstPlay && !player.paused()) {
              setTimeout(function () {
                triggerPlay();
                player.on("play", function () {
                  triggerPlay();
                });
              }, 0);
              isFirstPlay = false;
            }
            if (fullscreenBug && t > 1) {
              fullscreenBug = false;
              player.requestFullscreen();
            }
            var tracking = videos[currIndex].tracking();
            for (var i = 0; i < tracking.length; i++) {
              var trackerTime;
              if (tracking[i].percent > 0) {
                trackerTime = duration * (tracking[i].percent / 100);
              } else {
                trackerTime = 0;
              }
              if (!tracking[i].hasFired && t >= trackerTime) {
                ISM.eventTag(tracking[i].eventTag);
                if (cfg.trackingCallback)
                  cfg.trackingCallback({
                    percent: tracking[i].percent,
                    videoName: videos[currIndex].getName(),
                    videoId: currIndex,
                  });
                tracking[i].hasFired = true;
              }
            }
          });
          player.on("ended", function () {
            videos[currIndex].isEnded = true;
          });
          if (readyCallback) {
            setTimeout(function () {
              readyCallback(player);
            }, 100);
          }
          switchVideo(0, cfg.autoplay);
        }
      );
      function switchVideo(target, autostart) {
        if (typeof autostart === "undefined") autostart = true;
        if (typeof target == "string") {
          $.each(videos, function (i) {
            if (this.getName() == target) {
              target = i;
              return;
            }
          });
        }
        if (target == currIndex) {
          if (player.paused() && autostart) togglePlay();
          return false;
        }
        var video = videos[target];
        var videoEl = $(player.el()).find("video");
        var sourcesHtml = "";
        var sources = video.sources();
        $(videoEl).get(0).innerHTML = "";
        $.each(sources, function (key, val) {
          var sourceHtml = document.createElement("source");
          sourceHtml.type = "video/" + key;
          sourceHtml.src = val;
          $(videoEl).get(0).appendChild(sourceHtml);
        });
        if (isFirstPlay && cfg.autoplay) player.muted(true);
        videoLoading = true;
        if (autostart) $(videoEl).get(0).load();
        $(videoEl).get(0).onloadedmetadata = function () {
          videoLoading = false;
          if (!isFirstPlay) {
            player.currentTime(video.getCurrentTime());
          }
          if (player.paused() && autostart) {
            if (videos[target].isEnded) {
              videos[target].updateTime(0);
            }
            if (
              navigator.userAgent.indexOf("MSIE 9") != -1 ||
              navigator.userAgent.indexOf("MSIE 10") != -1
            )
              togglePlay();
          }
        };
        if (
          player.paused() &&
          autostart &&
          navigator.userAgent.indexOf("MSIE 9") == -1 &&
          navigator.userAgent.indexOf("MSIE 10") == -1
        )
          togglePlay();
        currIndex = target;
      }
      function Video(name, sources, tracking) {
        var cfg = { name: name, sources: sources, tracking: [] };
        var currTime = 0;
        var duration = 0;
        this.isEnded = false;
        $.each(tracking, function (key, val) {
          cfg.tracking.push({
            percent: key.substr(0, key.length - 1),
            eventTag: val,
            hasFired: false,
          });
        });
        return {
          updateTime: function (time, dur) {
            currTime = time;
            duration = dur;
            if (this.isEnded && time < dur - 0.1) this.isEnded = false;
          },
          sources: function () {
            return cfg.sources;
          },
          getName: function () {
            return cfg.name;
          },
          getCurrentTime: function () {
            return currTime;
          },
          tracking: function () {
            return cfg.tracking;
          },
        };
      }
      function togglePlay() {
        if (player.paused()) {
          player.play();
          if (cfg.playInFullscreen) {
            try {
              player.requestFullscreen();
            } catch (e) {
              fullscreenBug = true;
            }
          }
        } else {
          player.pause();
        }
      }
      function toggleMute() {
        if (player.muted()) {
          player.muted(false);
        } else {
          player.muted(true);
        }
      }
      function triggerPlay() {
        if (cfg.playCallback) {
          try {
            cfg.playCallback();
          } catch (e) {}
        }
      }
      player.switchVideo = function (name, autostart) {
        switchVideo(name, autostart);
      };
      player.togglePlay = function () {
        togglePlay();
      };
      player.toggleMute = function () {
        toggleMute();
      };
      player.videojs = function () {
        if (player) return player;
      };
      player.getCurrentVideoName = function () {
        return videos[currIndex].getName();
      };
      player.getCurrentVideoIndex = function () {
        return currIndex;
      };
      player.isEnded = function () {
        return videos[currIndex].isEnded;
      };
      return player;
    };
    ISM.closeSite = function () {
      if (ISM.swBaseFile) {
        ISM.sendEvent("CLOSE");
      } else {
        window.close();
      }
    };
    function replaceTokens(s, values) {
      if (!values) {
        values = {
          CreativeID: ISM.initData.creativeID,
          AdvertID: ISM.initData.advertID,
          CampaignID: ISM.initData.campaignID,
          SectionID: ISM.initData.sectionID,
          uuid: ISM.initData.UUID,
          gdpr_consent: ISM.initData.ConsentData,
          gdpr: ISM.initData.ConsentApplies,
        };
      }
      s += "";
      if (values) {
        if (values.gdpr_consent) {
          s = s.replace(/\${gdpr_consent(_\d+)?}/gi, values.gdpr_consent);
        }
        if (values.gdpr != undefined) {
          s = s.replace(/\${gdpr}/gi, values.gdpr);
        }
      }
      s = s.replace(/\${([^}]+)}/g, function (match, key) {
        switch (key) {
          case "timestamp":
            return new Date().getTime();
            break;
          case "random":
            return Math.floor(Math.random() * 1e17);
            break;
          default:
            return values && values[key] ? values[key] : "";
        }
      });
      return s;
    }
    function hideReferer(url) {
      url = encodeURIComponent(url);
      return CDN_URL + "/redirect/index.html?url=" + url;
    }
    function openURL(url, sameWindow, unmask) {
      url = replaceTokens(url);
      if (!unmask) {
        url = hideReferer(url);
      }
      var prefix = ISM.initData ? ISM.initData.URLPrefix || "" : "";
      url = prefix + url;
      if (0 && sameWindow) {
        window.location.href = url;
      } else {
        window.open(url);
      }
    }
    function loadURL(url, unmask) {
      if (ISM.creativeData && ISM.creativeData.CAPPED) {
        return;
      }
      url = replaceTokens(url);
      if (!unmask) {
        url = hideReferer(url) + "&tracker=true";
        var $iframe = $("<iframe></iframe>")
          .css({
            position: "absolute",
            width: "1px",
            height: "1px",
            top: "-100px",
            left: "-100px",
          })
          .attr("src", url)
          .appendTo("body");
        setTimeout(function () {
          $iframe.remove();
        }, 15 * 1e3);
      } else {
        var img = document.createElement("img");
        img.setAttribute("src", url);
      }
    }
    function trackDwellTime(manual, max) {
      manual = !!manual;
      max = max || 300;
      var total = 0,
        done = false,
        last,
        interval;
      if (manual) {
        return { start: start, stop: stop };
      } else {
        start();
      }
      function start() {
        if (!done && !interval) {
          last = new Date().getTime();
          interval = setInterval(tick, 20 * 1e3);
        }
      }
      function stop(noSend) {
        if (!done && interval) {
          clearInterval(interval);
          interval = null;
          if (!noSend) {
            send();
          }
        }
      }
      function tick() {
        if (ISM.creativeData && ISM.creativeData.CAPPED) {
          return;
        }
        send();
      }
      function send() {
        var t = new Date().getTime(),
          delta = Math.round((t - last) / 1e3);
        last = t;
        total += delta;
        if (total > max) {
          delta -= total - max;
          stop(true);
          done = true;
        }
        if (delta > 0) {
          getISAPClient().sendPollingData(getLogID(), "Expandable=" + delta);
        }
      }
    }
    function getLogID() {
      if (logID) {
        return logID;
      }
      var id = ns.Util.getURLParam("logID");
      if (id) {
        return id;
      }
      if (
        ISM.initData &&
        ISM.initData.ISAP &&
        ISM.initData.ISAP.CampaignLogID
      ) {
        return ISM.initData.ISAP.CampaignLogID;
      }
    }
    function getISAPClient() {
      if (!isapClient) {
        var UAT = ns.Util.getURLParam("UAT") == "true";
        isapClient = new ns["4.2"].ISAPClient(UAT);
      }
      return isapClient;
    }
    function catchHeavyAdInterventions() {
      try {
        if (
          typeof ReportingObserver == "undefined" ||
          typeof navigator.sendBeacon == "undefined"
        ) {
          return;
        }
        var observer = new ReportingObserver(sendReports, {
          buffered: true,
          types: ["intervention"],
        });
        observer.observe();
        window.addEventListener("unload", function (e) {
          sendReports(observer.takeRecords());
        });
      } catch (e) {}
      function sendReports(reports) {
        var url = "https://t.inskinad.com/rec";
        try {
          for (var i = 0; i < reports.length; i++) {
            var report = reports[i];
            var data = {
              type: "intervention",
              frame: ISM.initData.id,
              section_id: ISM.initData.sectionID,
              creative_id: ISM.initData.creativeID,
              url: ISM.initData.URLInfo.href,
              ua: navigator.userAgent,
              details: report.body.message,
            };
            navigator.sendBeacon(url, JSON.stringify(data));
          }
        } catch (e) {}
      }
    }
    function telemetry(evt) {
      var endpointUrl = "https://t.inskinad.com/rec";
      var payload = JSON.stringify(evt);
      var req = new XMLHttpRequest();
      req.open("POST", endpointUrl);
      req.send(payload);
    }
  })();
  (function () {
    var obj = new ReactiveDict();
    ISM.shared = {
      set: function (keyOrObject, value) {
        var params = { keyOrObject: EJSON.stringify(keyOrObject) };
        if (value) {
          params.value = EJSON.stringify(value);
        }
        ISM.callFunctionCreativeOthers("_updateShared", params);
        return obj.set(keyOrObject, value);
      },
      get: function (key) {
        return obj.get(key);
      },
    };
    ISM._updateShared = function (update) {
      if (update.value) {
        obj.set(EJSON.parse(update.keyOrObject), EJSON.parse(update.value));
      } else {
        obj.set(EJSON.parse(update.keyOrObject));
      }
    };
  })();
  (function () {
    var feedsDir;
    var hostname = window.location.hostname || "";
    if (hostname == "studio3.inskinmedia.com") {
      feedsDir =
        "//studio3.inskinmedia.com/proxy?url=https://cdn.inskinad.com/CreativeAssets/dynamic_creative_data/Locally_Stored_Feeds/social/";
    } else {
      feedsDir =
        "https://cdn.inskinad.com/CreativeAssets/dynamic_creative_data/Locally_Stored_Feeds/social/";
    }
    ISM.getFeed = function (feedId, success, error) {
      var file = feedsDir + feedId + ".json";
      $.ajax(file, {
        method: "GET",
        dataType: "json",
        cache: false,
        success: function (data) {
          if (data.error || data.length == 0) {
            if (error instanceof Function) error();
            return;
          }
          if (success instanceof Function) success(data);
        },
        error: function (err) {
          if (error instanceof Function) error();
        },
        timeout: 2e3,
      });
    };
  })();
  (function () {
    var saveUrl = "https://c.inskinad.com/csv-storage/store.php";
    $(function () {
      $("form").submit(function () {
        var $form = $(this);
        clearErrors($form);
        if ($form.attr("data-validation") == "true") {
          var errors = validate($form);
          if (errors) {
            showErrors(errors, $form);
            return false;
          }
        }
        if ($form.attr("data-collection")) {
          save($form, $form.attr("data-collection"));
          var tag = $form.attr("data-eventtag");
          if (tag) {
            if (!isNaN(tag)) {
              tag = parseInt(tag);
            }
            ISM.eventTag(tag);
          }
          return false;
        }
      });
    });
    function validate($form) {
      var errors = [];
      $form.find(":input").each(function () {
        var $field = $(this);
        var required =
          $field.prop("required") || $field.attr("data-required") == "true";
        if (required && !$.trim($field.val())) {
          errors.push({ type: "required", $field: $field });
          return;
        }
        var type = $field.attr("data-type") || $field.attr("type");
        if (type && tests[type]) {
          if (!tests[type]($field)) {
            errors.push({ type: type, $field: $field });
            return;
          }
        }
      });
      return errors.length ? errors : null;
    }
    function showErrors(errors, $form) {
      $form.addClass("has-errors");
      $form.find(".errors").show();
      for (var i = 0; i < errors.length; i++) {
        var type = errors[i].type,
          name = errors[i].$field.attr("name");
        if (name) {
          name = name.replace(/^\d+_/, "");
          $form.find(".field-" + name).addClass("has-errors");
          $form.find(".error-" + name + "-" + type).show();
        }
      }
    }
    function clearErrors($form) {
      $form.removeClass("has-errors");
      $form.find(".errors").hide();
      $form.find(".has-errors").removeClass("has-errors");
      $form.find(".error").hide();
    }
    function save($form, collection) {
      var data = $form.serializeArray();
      data.push({ name: "collection", value: collection });
      $form.removeClass("loading success failure");
      $form.find(".state-loading, .state-success, .state-failure").hide();
      $form.addClass("loading");
      $form.find(".state-loading").show();
      $.ajax({
        url: saveUrl,
        type: "POST",
        data: data,
        complete: function (response, textStatus, xhr) {
          $form.removeClass("loading");
          $form.find(".state-loading").hide();
          var state = textStatus == "success" ? "success" : "failure";
          $form.addClass(state);
          $form.find(".state-" + state).show();
        },
      });
    }
    var tests = {
      email: function ($field) {
        var re =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test($field.val());
      },
    };
  })();
  ISM.autorun = Tracker.autorun;
  ISM.ReactiveDict = ReactiveDict;
  ISM.ReactiveVar = ReactiveVar;
  ISM.EJSON = EJSON;
})();

// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"player.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Player = /*#__PURE__*/function () {
  function Player() {
    _classCallCheck(this, Player);

    _defineProperty(this, "audios", [{
      artist: "Daliwonga ft King Monada",
      title: "Tester",
      file: "audio/audio1.mp3",
      cover: "img/tester.jpg"
    }, {
      artist: "Mdoover ft Sir Trill",
      title: "Uyalazi iPiano",
      file: "audio/audio2.mp3",
      cover: "img/uyalazi.jpg"
    }, {
      artist: "Dj Maphorisa ft Sha sha",
      title: "Ithemba'Lam",
      file: "audio/audio3.mp3",
      cover: "img/ithemba.jpg"
    }, {
      artist: "Tshego ft King Monada",
      title: "no ties",
      file: "audio/audio4.mp3",
      cover: "img/noties.jpg"
    }, {
      artist: "Kabza De Small ft Dj Maphorisa",
      title: "eMicimbini",
      file: "audio/audio5.mp3",
      cover: "img/encimbini.jpg"
    }]);

    this.prev = document.querySelector(".prev");
    this.playPause = document.querySelector(".play-pause");
    this.next = document.querySelector(".next");
    this.bgImage = document.querySelector(".bg__img");
    this.singer = document.querySelector(".singer");
    this.musicTitle = document.querySelector(".music__title");
    this.singerName = document.querySelector(".music__artist");
    this.sound = document.querySelector(".vol__icon");
    this.volume = document.querySelector("#vol");
    this.duration = document.querySelector("#dur");
    this.startTime = document.querySelector(".start");
    this.endTime = document.querySelector(".end");
    this.currentTrack = 0;
    this.audio = new Audio();
    this.currentPlaying = {};
    this.isPlaying = false;
    this.startPlayer();
    this.nextSong();
    this.previousSong();
    this.toggleMute();
    this.setVolume();
  }

  _createClass(Player, [{
    key: "startPlayer",
    value: function startPlayer() {
      this.currentPlaying = this.audios[this.currentTrack];
      this.bgImage.src = this.currentPlaying.cover;
      this.singer.src = this.currentPlaying.cover;
      this.musicTitle.textContent = this.currentPlaying.title;
      this.singerName.textContent = this.currentPlaying.artist;
      this.audio.src = this.currentPlaying.file;
      this.audio.play();
    }
  }, {
    key: "playAudio",
    value: function playAudio() {
      var _this = this;

      this.isPlaying = true;
      this.startPlayer();
      this.animateColor();
      this.setDuration();
      this.audio.addEventListener("loadeddata", function () {
        var min = Math.floor(_this.audio.duration / 60);
        var sec = Math.floor(_this.audio.duration % 60);
        var res = "".concat(("0" + min).slice(-2), ":").concat(("0" + sec).slice(-2));
        _this.endTime.innerText = res;
      });
      this.audio.addEventListener("loadeddata", function () {
        _this.audio.addEventListener("timeupdate", function () {
          var min = Math.floor(_this.audio.currentTime / 60);
          var sec = Math.floor(_this.audio.currentTime % 60);
          var res = "".concat(("0" + min).slice(-2), ":").concat(("0" + sec).slice(-2));
          _this.startTime.innerText = res;
          _this.duration.value = _this.audio.currentTime;
        });
      });
      this.audio.addEventListener("ended", function () {
        _this.currentTrack++;

        if (_this.currentTrack == _this.audios.length) {
          _this.currentTrack = 0;
        }

        _this.startPlayer();

        _this.audio.play();
      });
    }
  }, {
    key: "pauseAudio",
    value: function pauseAudio() {
      this.isPlaying = false;
      this.audio.pause();
    }
  }, {
    key: "tooglePlayPause",
    value: function tooglePlayPause() {
      var _this2 = this;

      this.playPause.addEventListener("click", function () {
        if (_this2.isPlaying) {
          _this2.pauseAudio();

          _this2.playPause.innerHTML = "<div class=\"play-pause\">\n        <svg\n            class=\"player__icon\"\n            width=\"11px\"\n            height=\"14px\"\n\n        >\n            <g\n                id=\"Icons\"\n                stroke=\"none\"\n                stroke-width=\"1\"\n                fill=\"none\"\n                fill-rule=\"evenodd\"\n            >\n                <g id=\"Outlined\" transform=\"translate(-244.000000, -955.000000)\">\n                    <g id=\"Av\" transform=\"translate(100.000000, 852.000000)\">\n                        <g id=\"Outlined-/-AV-/-play_arrow\" transform=\"translate(136.000000, 98.000000)\">\n                            <g>\n                                <polygon id=\"Path\" points=\"0 0 24 0 24 24 0 24\"></polygon>\n                                <path d=\"M10,8.64 L15.27,12 L10,15.36 L10,8.64 Z M8,5 L8,19 L19,12 L8,5 Z\" id=\"\uD83D\uDD39-Icon-Color\" fill=\"#1D1D1D\"></path>\n                            </g>\n                        </g>\n                    </g>\n                </g>\n            </g>\n        </svg>\n        <div class=\"circle circle1\"></div>\n        <div class=\"circle circle2\"></div>\n      </div>";
        } else {
          _this2.playAudio();

          _this2.playPause.innerHTML = "<div class=\"play-pause\">\n        <svg width=\"12px\" height=\"14px\" viewBox=\"0 0 12 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">  \n        <g id=\"Icons\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n            <g id=\"Outlined\" transform=\"translate(-310.000000, -955.000000)\">\n                <g id=\"Av\" transform=\"translate(100.000000, 852.000000)\">\n                    <g id=\"Outlined-/-AV-/-pause\" transform=\"translate(204.000000, 98.000000)\">\n                        <g>\n                            <polygon id=\"Path\" points=\"0 0 24 0 24 24 0 24\"></polygon>\n                            <path d=\"M6,19 L10,19 L10,5 L6,5 L6,19 Z M14,5 L14,19 L18,19 L18,5 L14,5 Z\" id=\"\uD83D\uDD39-Icon-Color\" fill=\"#fff\"></path>\n                        </g>\n                    </g>\n                </g>\n            </g>\n        </g>\n    </svg>\n          <div class=\"circle circle1\"></div>\n          <div class=\"circle circle2\"></div>\n        </div>";
        }
      });
    }
  }, {
    key: "nextSong",
    value: function nextSong() {
      var _this3 = this;

      this.next.addEventListener("click", function () {
        _this3.currentTrack++;

        if (_this3.currentTrack == _this3.audios.length) {
          _this3.currentTrack = 0;
        }

        _this3.startPlayer();

        _this3.audio.play();
      });
    }
  }, {
    key: "previousSong",
    value: function previousSong() {
      var _this4 = this;

      this.prev.addEventListener("click", function () {
        _this4.currentTrack--;

        if (_this4.currentTrack < 0) {
          _this4.currentTrack = _this4.audios.length - 1;
        }

        _this4.startPlayer();

        _this4.audio.play();
      });
    }
  }, {
    key: "toggleMute",
    value: function toggleMute() {
      var _this5 = this;

      this.sound.addEventListener("click", function () {
        _this5.audio.muted = !_this5.audio.muted;
        _this5.sound.classList = _this5.audio.muted ? "vol" : "vol1";
      });
    }
  }, {
    key: "getVolume",
    value: function getVolume() {
      var vol = this.volume.value;
      this.audio.volume = vol / 100;
    }
  }, {
    key: "setVolume",
    value: function setVolume() {
      var _this6 = this;

      this.volume.addEventListener("input", function () {
        _this6.getVolume();
      });
      this.volume.addEventListener("change", function () {
        _this6.getVolume();
      });
    }
  }, {
    key: "getDuration",
    value: function getDuration() {
      var audioDuration = this.duration.value;
      this.duration.max = this.audio.duration;
      this.audio.currentTime = audioDuration;
    }
  }, {
    key: "setDuration",
    value: function setDuration() {
      var _this7 = this;

      this.duration.addEventListener("input", function () {
        _this7.getDuration();
      });
      this.duration.addEventListener("change", function () {
        _this7.getDuration();
      });
    }
  }, {
    key: "animateColor",
    value: function animateColor() {
      var colors = ["#515070", "#aa4a30", "#ff8e6e", "#ff7171", "#d789d7", "#e97171", "#1aa6b7", "#006a71"];
      setInterval(function () {
        var circle1 = document.querySelector(".circle1");
        var circle2 = document.querySelector(".circle2");
        var randomColor = Math.floor(Math.random() * colors.length);
        circle1.style.borderTop = "2px solid ".concat(colors[randomColor]);
        circle1.style.borderBottom = "2px solid ".concat(colors[randomColor]);
        circle1.style.borderLeft = "2px solid ".concat(colors[randomColor]);
        circle1.style.borderRight = "2px solid ".concat(colors[randomColor]);
        circle2.style.borderTop = "2px solid ".concat(colors[randomColor]);
        circle2.style.borderBottom = "2px solid ".concat(colors[randomColor]);
        circle2.style.borderLeft = "2px solid ".concat(colors[randomColor]);
        circle2.style.borderRight = "2px solid ".concat(colors[randomColor]);
      }, 100);
    }
  }]);

  return Player;
}();

var player = new Player();
window.addEventListener("load", player.tooglePlayPause());
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52540" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","player.js"], null)
//# sourceMappingURL=/bundle.js.map
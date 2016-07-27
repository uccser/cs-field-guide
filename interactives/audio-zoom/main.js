(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var AudioGraph, LoadingBar, PromiseWorker, async, getViewBox, max, min, rangeQuery, toAudioBuffer, work;

async = require('es6-simple-async');

rangeQuery = require('./rangeQuery.coffee').rangeQuery;

work = require('webworkify');

PromiseWorker = require('./promiseWorker.coffee');

toAudioBuffer = function(arrayBuffer) {

  /* This converts an ArrayBuffer into an AudioBuffer returning a Promise
      containing the AudioBuffer
   */
  var audioCtx;
  audioCtx = new OfflineAudioContext(2, 44100 * 1, 44100);
  return audioCtx.decodeAudioData(arrayBuffer);
};

max = function(a, b) {
  if (a == null) {
    a = NaN;
  }
  if (b == null) {
    b = NaN;
  }

  /* For NaN we'll ignore it and return the real max */
  if (isNaN(b)) {
    return a;
  } else if (a > b) {
    return a;
  } else {
    return b;
  }
};

min = function(a, b) {
  if (a == null) {
    a = NaN;
  }
  if (b == null) {
    b = NaN;
  }
  if (isNaN(b)) {
    return a;
  } else if (a < b) {
    return a;
  } else {
    return b;
  }
};

getViewBox = function(svgElement) {

  /* This extracts the viewBox of an svg node */
  var viewBox;
  viewBox = svgElement.getAttribute('viewBox').split(',').map(Number);
  return {
    minX: viewBox[0],
    minY: viewBox[1],
    width: viewBox[2],
    height: viewBox[3]
  };
};

LoadingBar = (function() {
  LoadingBar.prototype.width = 0.05;

  function LoadingBar(svgElement1) {
    this.svgElement = svgElement1;

    /* This creates a loading bar on a given svg element */
    this.svgNS = this.svgElement.getAttribute('xmlns');
    this.viewBox = getViewBox(this.svgElement);
    this.createLoadingBorder();
    this.update(0);
  }

  LoadingBar.prototype.createLoadingBorder = function() {

    /* This creates a border for the loading bar */
    this.loadingBorder = document.createElementNS(this.svgNS, 'rect');
    this.loadingBorder.classList.add('loading-border');
    this.loadingBorder.setAttributeNS(null, 'x', 0);
    this.loadingBorder.setAttributeNS(null, 'width', this.viewBox.width);
    this.loadingBorder.setAttributeNS(null, 'y', this.viewBox.height * (0.5 - this.width / 2));
    this.loadingBorder.setAttributeNS(null, 'height', this.viewBox.height * this.width);
    return this.svgElement.appendChild(this.loadingBorder);
  };

  LoadingBar.prototype.update = function(proportion) {

    /* Creates a loading bar of size percent */
    if (this.disposed) {
      return;
    }
    if (this.loadingBar != null) {
      this.svgElement.removeChild(this.loadingBar);
    }
    this.loadingBar = document.createElementNS(this.svgNS, 'rect');
    this.loadingBar.classList.add('loading-bar');
    this.loadingBar.setAttributeNS(null, 'x', 0);
    this.loadingBar.setAttributeNS(null, 'width', proportion * this.viewBox.width);
    this.loadingBar.setAttributeNS(null, 'y', this.viewBox.height * (0.5 - this.width / 2));
    this.loadingBar.setAttributeNS(null, 'height', this.viewBox.height * this.width);
    return this.svgElement.appendChild(this.loadingBar);
  };

  LoadingBar.prototype.dispose = function() {

    /* Removes the loading bar from the svg element */
    this.disposed = true;
    this.svgElement.removeChild(this.loadingBorder);
    return this.svgElement.removeChild(this.loadingBar);
  };

  return LoadingBar;

})();

AudioGraph = (function() {
  var maxWorker, minWorker;

  maxWorker = new PromiseWorker(new Worker('./segmentTreeWorker.js'));

  minWorker = new PromiseWorker(new Worker('./segmentTreeWorker.js'));

  function AudioGraph(arg) {
    this.svgElement = arg.svgElement, this.dataLength = arg.dataLength, this.maxQuery = arg.maxQuery, this.minQuery = arg.minQuery;
    this.viewBox = getViewBox(this.svgElement);
    this.renderRange(0, this.dataLength);
  }

  AudioGraph.prototype.clear = function() {
    var results;
    results = [];
    while (this.svgElement.lastChild) {
      results.push(this.svgElement.removeChild(this.svgElement.lastChild));
    }
    return results;
  };

  AudioGraph.prototype.renderRange = function(lower, upper) {
    var _max, _min, idx, lines, maxHeight, rangeMax, rangeMin, sectionWidth, svgLine;
    if (lower == null) {
      lower = 0;
    }
    if (upper == null) {
      upper = this.dataLength;
    }
    this.clear();
    maxHeight = Math.max(Math.abs(this.maxQuery(lower, upper)), Math.abs(this.minQuery(lower, upper)));
    sectionWidth = (upper - lower) / this.viewBox.width;
    console.log(sectionWidth);
    lines = (function() {
      var i, ref, results;
      results = [];
      for (idx = i = 0, ref = this.viewBox.width; 0 <= ref ? i < ref : i > ref; idx = 0 <= ref ? ++i : --i) {
        rangeMax = Math.max(0, this.maxQuery(lower + Math.floor(sectionWidth * idx), lower + Math.ceil(sectionWidth * (idx + 1))));
        rangeMin = Math.min(0, this.minQuery(lower + Math.floor(sectionWidth * idx), lower + Math.ceil(sectionWidth * (idx + 1))));
        svgLine = document.createElementNS(this.svgElement.namespaceURI, "line");
        svgLine.setAttributeNS(null, "class", "wave-line");
        svgLine.setAttributeNS(null, "x1", idx);
        svgLine.setAttributeNS(null, "x2", idx);
        _max = (this.viewBox.height / 2) * rangeMin / maxHeight + (this.viewBox.height / 2);
        svgLine.setAttributeNS(null, "y1", _max);
        _min = (this.viewBox.height / 2) * rangeMax / maxHeight + (this.viewBox.height / 2);
        svgLine.setAttributeNS(null, "y2", _min);
        results.push(this.svgElement.appendChild(svgLine));
      }
      return results;
    }).call(this);
    svgLine = document.createElementNS(this.svgElement.namespaceURI, "line");
    svgLine.setAttributeNS(null, "style", "stroke:red;stroke-width:1");
    svgLine.setAttributeNS(null, "x1", 0);
    svgLine.setAttributeNS(null, "x2", this.viewBox.height);
    svgLine.setAttributeNS(null, "y1", this.viewBox.height / 2);
    svgLine.setAttributeNS(null, "y2", this.viewBox.height / 2);
    return this.svgElement.appendChild(svgLine);
  };

  AudioGraph.fromChannelData = async(function*(svgElement, channelData) {

    /* This creates an Audio Graph from the given channel data */
    var dataLength, lastMaxProgress, lastMinProgress, loadingBar, maxTree, minTree, ref;
    dataLength = channelData.length;
    maxTree = maxWorker.postMessage({
      channelData: channelData,
      functionString: max.toString()
    });
    minTree = minWorker.postMessage({
      channelData: channelData,
      functionString: min.toString()
    });
    lastMinProgress = 0;
    lastMaxProgress = 0;
    loadingBar = new LoadingBar(svgElement);
    maxTree.progressed(function(progress) {
      lastMaxProgress = progress;
      loadingBar.update((lastMinProgress + lastMaxProgress) / 2);
      return document.querySelector('#progress').innerHTML = (progress * 100) + " %";
    });
    minTree.progressed(function(progress) {
      lastMinProgress = progress;
      loadingBar.update((lastMinProgress + lastMaxProgress) / 2);
      return document.querySelector('#progress').innerHTML = (progress * 100) + " %";
    });
    ref = (yield Promise.all([minTree, maxTree])), minTree = ref[0], maxTree = ref[1];
    loadingBar.dispose();
    window.maxTree = maxTree;
    window.minTree = minTree;
    return new AudioGraph({
      svgElement: svgElement,
      dataLength: channelData.length,
      maxQuery: rangeQuery(maxTree, max),
      minQuery: rangeQuery(minTree, min)
    });
  });

  return AudioGraph;

})();

async.main(function*() {
  var $audio, $status, arrBuff, audioData, channelData, res;
  $audio = document.querySelector('#audio3');
  $status = document.querySelector('#status');
  $status.innerHTML = 'fetching...';
  res = (yield fetch($audio.getAttribute('src')));
  arrBuff = (yield res.arrayBuffer());
  $status.innerHTML = 'converting...';
  audioData = (yield toAudioBuffer(arrBuff));
  (yield null);
  $status.innerHTML = 'scanning points...';
  channelData = audioData.getChannelData(0);
  window.channelData = channelData;
  $status.innerHTML = 'preprocessing';
  window.graph = (yield AudioGraph.fromChannelData(document.querySelector('svg'), channelData));
  return $status.innerHTML = 'done and done';
});

window.async = async;


},{"./promiseWorker.coffee":3,"./rangeQuery.coffee":4,"es6-simple-async":5,"webworkify":6}],2:[function(require,module,exports){
"use strict";
var ProgressPromise,
  slice = [].slice;

ProgressPromise = (function() {
  function ProgressPromise(func) {
    var progress;
    this.finished = false;
    this._progressHandlers = [];
    progress = (function(_this) {
      return function(val) {
        var handler, i, len, ref, results;
        if (typeof finished === "undefined" || finished === null) {
          ref = _this._progressHandlers;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            handler = ref[i];
            results.push(handler(val));
          }
          return results;
        }
      };
    })(this);
    this._promise = new Promise(function(resolve, reject) {
      return func(resolve, reject, progress);
    });
    this._promise.then((function(_this) {
      return function() {
        return _this.finished = true;
      };
    })(this));
    this._promise["catch"]((function(_this) {
      return function() {
        return _this.finished = true;
      };
    })(this));
  }

  ProgressPromise.prototype.progressed = function(callback) {
    this._progressHandlers.push(callback);
    return this;
  };

  ProgressPromise.prototype.then = function() {
    var args, ref;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return (ref = this._promise).then.apply(ref, args);
  };

  ProgressPromise.prototype["catch"] = function() {
    var args, ref;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return (ref = this._promise)["catch"].apply(ref, args);
  };

  return ProgressPromise;

})();

module.exports = ProgressPromise;


},{}],3:[function(require,module,exports){
"use strict";
var ProgressPromise, PromiseWorker;

ProgressPromise = require('./progressPromise.coffee');

PromiseWorker = (function() {
  function PromiseWorker(worker) {
    this.worker = worker;
    this.waiting = {};
    this.currentID = 0;
    this.worker.onmessage = (function(_this) {
      return function(event) {
        switch (event.data.type) {
          case 'error':
            _this.waiting[event.data.id].reject(event.data.message);
            return delete _this.waiting[event.data.id];
          case 'progress':
            return _this.waiting[event.data.id].progress(event.data.message);
          default:
            _this.waiting[event.data.id].resolve(event.data.message);
            return delete _this.waiting[event.data.id];
        }
      };
    })(this);
    this.worker.onerror = function(err) {
      return console.error("If you see this error please put in a bug report");
    };
  }

  PromiseWorker.prototype.postMessage = function(message, transferables, onProgress) {
    var promise;
    if (onProgress == null) {
      onProgress = null;
    }

    /* This posts a message to the worker and returns a promise that'll
        resolve when the message is returned
     */
    return promise = new ProgressPromise((function(_this) {
      return function(resolve, reject, progress) {
        var newMessage;
        _this.waiting[_this.currentID] = {
          resolve: resolve,
          reject: reject,
          progress: progress
        };
        newMessage = {
          id: _this.currentID,
          message: message
        };
        _this.worker.postMessage(newMessage, transferables);
        return _this.currentID += 1;
      };
    })(this));
  };

  PromiseWorker.prototype.terminate = function() {
    return this.worker.terminate();
  };

  return PromiseWorker;

})();

module.exports = PromiseWorker;


},{"./progressPromise.coffee":2}],4:[function(require,module,exports){

/* This is an implementation of range query specially as in the definition
    of Range Max Query but any comparison function may be used
 */
"use strict";
var max, rangeQuery, segmentTree, span;

max = function(a, b) {
  if (isNaN(b)) {
    return a;
  } else if (a > b) {
    return a;
  } else {
    return b;
  }
};

segmentTree = function(arr, queryFunc) {
  var ArrType, i, j, ref, tree, treeSize, upperPowerOfTwo;
  if (queryFunc == null) {
    queryFunc = max;
  }

  /* This creates a segmentTree from an array */
  ArrType = arr.constructor;
  upperPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(arr.length)));
  treeSize = upperPowerOfTwo + arr.length;
  tree = new ArrType(treeSize);
  if (ArrType === Array) {
    [].splice.apply(tree, [upperPowerOfTwo, treeSize - upperPowerOfTwo].concat(arr)), arr;
  } else {
    tree.set(arr, upperPowerOfTwo);
  }
  for (i = j = ref = upperPowerOfTwo - 1; ref <= 0 ? j < 0 : j > 0; i = ref <= 0 ? ++j : --j) {
    tree[i] = queryFunc(tree[i * 2], tree[i * 2 + 1]);
  }
  tree.dataLength = arr.length;
  return tree;
};

span = function(node, arrLen) {

  /* Returns what range is spanned by a given node e.g.
      span(1) is the entire segment tree so [0, treeSize]
   */
  var change, diff, lowerPowerOfTwo, upperPowerOfTwo;
  upperPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(arrLen)));
  lowerPowerOfTwo = Math.pow(2, Math.floor(Math.log2(node) / 1));
  diff = node - lowerPowerOfTwo;
  change = upperPowerOfTwo / lowerPowerOfTwo;
  return [change * diff, change * (diff + 1)];
};

rangeQuery = function(arg, queryFunc) {
  var dataLength, query, tree;
  tree = arg.tree, dataLength = arg.dataLength;
  if (queryFunc == null) {
    queryFunc = greaterThan;
  }

  /* This creates a function that allows you to query the max value inside
      a range of a given array (or any query given a queryFunction
   */
  return query = function(lower, upper) {
    var _query;
    if (lower == null) {
      lower = 0;
    }
    if (upper == null) {
      upper = dataLength;
    }

    /* This function queries the segment tree recursively
        it tries to select a minimum number of points that describe
        the range entered
     */
    _query = function(node) {
      var leftBest, middle, ref, rightBest, spanLower, spanUpper;
      if (lower >= upper) {
        throw new Error("Queried range smaller than size 1");
      } else if (lower < 0) {
        throw new Error("Lower bound is below zero");
      } else if (upper > dataLength) {
        throw new Error("Upper bound is beyond array");
      }
      ref = span(node, dataLength), spanLower = ref[0], spanUpper = ref[1];
      middle = Math.floor((spanLower + spanUpper) / 2);
      if (lower <= spanLower && upper >= spanUpper) {
        return tree[node];
      } else if (spanUpper - spanLower === 1) {
        return tree[node];
      } else if (upper <= middle) {
        return _query(node * 2);
      } else if (lower >= middle) {
        return _query(node * 2 + 1);
      } else {
        leftBest = _query(node * 2);
        rightBest = _query(node * 2 + 1);
        return queryFunc(leftBest, rightBest);
      }
    };
    return _query(1);
  };
};

module.exports = {
  rangeQuery: rangeQuery,
  segmentTree: segmentTree
};


},{}],5:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0

/* Author James "The Jamesernator" Browning
    2016
 */

(function() {
  "use strict";
  var GeneratorFunction, async,
    slice = [].slice;

  GeneratorFunction = Object.getPrototypeOf(function*() {
    return;
  }).constructor;

  async = function(genFunc) {

    /* async converts a GeneratorFunction into a ES7 async function */
    var spawn;
    if (!(genFunc instanceof GeneratorFunction)) {
      throw new Error("Passed non-generator to async");
    }
    return spawn = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var gen, step;
          gen = genFunc.apply(_this, args);
          step = function(nextFunc) {
            var err, error, next;
            try {
              next = nextFunc();
            } catch (error) {
              err = error;
              reject(err);
              return;
            }
            if (next.done) {
              resolve(next.value);
              return;
            }
            return Promise.resolve(next.value).then(function(val) {
              return step(function() {
                return gen.next(val);
              });
            }, function(err) {
              return step(function() {
                return gen["throw"](err);
              });
            });
          };
          return step(function() {
            return gen.next(void 0);
          });
        };
      })(this));
    };
  };

  async.run = function(func, errCallback) {
    if (errCallback == null) {
      errCallback = console.log;
    }

    /* This tries running the async function given and if it
        fails it calls the errCallback with the error given
        by the async function
     */
    return async(function*() {
      var err, error;
      try {
        return (yield async(func)());
      } catch (error) {
        err = error;
        return errCallback(err);
      }
    })();
  };

  async.main = function(func) {

    /* Although async.run has errCallback as console.log we'll just print
        the stack
     */
    return async.run(func, function(err) {
      return console.log(err.stack);
    });
  };

  async.from = function(iterable) {

    /* Creates a async function from an existing iterable */
    var genFunc;
    genFunc = function*() {
      return (yield* iterable);
    };
    return async(genFunc);
  };

  async["do"] = async.run;

  Object.defineProperty(async, "name", {
    value: "async"
  });

  if (typeof module !== "undefined" && module !== null) {
    module.exports = async;
  } else {
    window.async = async;
  }

}).call(this);

},{}],6:[function(require,module,exports){
var bundleFn = arguments[3];
var sources = arguments[4];
var cache = arguments[5];

var stringify = JSON.stringify;

module.exports = function (fn, options) {
    var wkey;
    var cacheKeys = Object.keys(cache);

    for (var i = 0, l = cacheKeys.length; i < l; i++) {
        var key = cacheKeys[i];
        var exp = cache[key].exports;
        // Using babel as a transpiler to use esmodule, the export will always
        // be an object with the default export as a property of it. To ensure
        // the existing api and babel esmodule exports are both supported we
        // check for both
        if (exp === fn || exp && exp.default === fn) {
            wkey = key;
            break;
        }
    }

    if (!wkey) {
        wkey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
        var wcache = {};
        for (var i = 0, l = cacheKeys.length; i < l; i++) {
            var key = cacheKeys[i];
            wcache[key] = key;
        }
        sources[wkey] = [
            Function(['require','module','exports'], '(' + fn + ')(self)'),
            wcache
        ];
    }
    var skey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);

    var scache = {}; scache[wkey] = wkey;
    sources[skey] = [
        Function(['require'], (
            // try to call default if defined to also support babel esmodule
            // exports
            'var f = require(' + stringify(wkey) + ');' +
            '(f.default ? f.default : f)(self);'
        )),
        scache
    ];

    var src = '(' + bundleFn + ')({'
        + Object.keys(sources).map(function (key) {
            return stringify(key) + ':['
                + sources[key][0]
                + ',' + stringify(sources[key][1]) + ']'
            ;
        }).join(',')
        + '},{},[' + stringify(skey) + '])'
    ;

    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    var blob = new Blob([src], { type: 'text/javascript' });
    if (options && options.bare) { return blob; }
    var workerUrl = URL.createObjectURL(blob);
    var worker = new Worker(workerUrl);
    worker.objectURL = workerUrl;
    return worker;
};

},{}]},{},[1]);

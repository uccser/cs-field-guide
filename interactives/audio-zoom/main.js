(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var AudioGraph, PromiseWorker, VIEWPORT, async, drawBars, drawDense, drawLines, max, rangeQuery, segmentWorker, split, toAudioBuffer, work;

async = require('es6-simple-async');

rangeQuery = require('./rangeQuery.coffee');

work = require('webworkify');

PromiseWorker = require('./promiseWorker.coffee');

segmentWorker = new PromiseWorker(new Worker('./segmentTreeWorker.js'));

toAudioBuffer = function(arrayBuffer) {

  /* This converts an ArrayBuffer into an AudioBuffer returning a Promise
      containing the AudioBuffer
   */
  var audioCtx;
  audioCtx = new OfflineAudioContext(2, 44100 * 1, 44100);
  return audioCtx.decodeAudioData(arrayBuffer);
};

VIEWPORT = 1000;

split = function(arr, chunks) {
  var change, chunk, currentLocation, nextLocation, result;
  if (chunks == null) {
    chunks = 2;
  }

  /* Splits an array into given number of chunks, the final chunk may
      be smaller than the rest, if chunks > array.length then we'll throw
      an error
   */
  if (chunks > arr.length) {
    throw new Error("Can't split arr with length " + arr.length + " into " + chunks + " chunks");
  }
  result = [];
  currentLocation = 0;
  change = arr.length / chunks;
  while (currentLocation < arr.length) {
    nextLocation = currentLocation + change;
    chunk = arr.slice(Math.round(currentLocation), Math.round(nextLocation));
    if (chunk.length !== 0) {
      result.push(chunk);
    }
    currentLocation = nextLocation;
  }
  return result;
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

AudioGraph = (function() {
  function* AudioGraph(svgElement, channelData) {
    var audioPart, idx, lines, min, svgLine;
    this.svgElement = svgElement;
    this.dataLength = channelData.length;
    this.maxQuery = rangeQuery(channelData, max);
    this.viewbox = svg.hasAttribute('viewBox') ? svg.getAttribute('viewBox').split(' ') : svg.set;
    lines = (yield* (function*() {
      var j, len, results;
      results = [];
      for (idx = j = 0, len = audioParts.length; j < len; idx = ++j) {
        audioPart = audioParts[idx];
        max = audioPart.reduce(function(acc, i) {
          return Math.max(acc, i);
        });
        min = audioPart.reduce(function(acc, i) {
          return Math.min(acc, i);
        });
        svgLine = document.createElementNS($image.namespaceURI, "line");
        svgLine.setAttributeNS(null, "class", "wave-line");
        svgLine.setAttributeNS(null, "x1", idx);
        svgLine.setAttributeNS(null, "x2", idx);
        if (Math.abs(min) < Math.abs(max)) {
          svgLine.setAttributeNS(null, "y1", VIEWPORT / 2);
          svgLine.setAttributeNS(null, "y2", (VIEWPORT / 2) * max / maxHeight + (VIEWPORT / 2));
        } else {
          svgLine.setAttributeNS(null, "y1", (VIEWPORT / 2) * min / maxHeight + VIEWPORT / 2);
          svgLine.setAttributeNS(null, "y2", VIEWPORT / 2);
        }
        $image.appendChild(svgLine);
        results.push((yield null));
      }
      return results;
    })());
    return this;
  }

  return AudioGraph;

})();

drawLines = async(function*(channelData) {
  var $image, i, maxHeight, points, str, svgLine;
  $image = document.querySelector("#audio-image-lines");
  maxHeight = channelData.reduce(function(acc, i) {
    return Math.max(acc, Math.abs(i));
  });
  points = (function() {
    var j, ref, results;
    results = [];
    for (i = j = 0, ref = channelData.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      results.push({
        x: VIEWPORT * i / channelData.length,
        y: Math.floor((VIEWPORT / 2) * channelData[i] / maxHeight + VIEWPORT / 2)
      });
    }
    return results;
  })();
  str = points.map(function(arg) {
    var x, y;
    x = arg.x, y = arg.y;
    return x + "," + y;
  }).join(' ');
  (yield $("#graph").attr('points', str));
  svgLine = document.createElementNS($image.namespaceURI, "line");
  svgLine.setAttributeNS(null, "style", "stroke:red;stroke-width:1");
  svgLine.setAttributeNS(null, "x1", 0);
  svgLine.setAttributeNS(null, "x2", VIEWPORT);
  svgLine.setAttributeNS(null, "y1", VIEWPORT / 2);
  svgLine.setAttributeNS(null, "y2", VIEWPORT / 2);
  return $image.appendChild(svgLine);
});

drawBars = async(function*(channelData) {
  var $image, audioPart, audioParts, idx, lines, maxHeight, min, svgLine;
  $image = document.querySelector('#audio-image-bars');
  maxHeight = channelData.reduce(function(acc, i) {
    return Math.max(acc, Math.abs(i));
  });
  audioParts = (yield split(channelData, VIEWPORT));
  svgLine = document.createElementNS($image.namespaceURI, "line");
  svgLine.setAttributeNS(null, "style", "stroke:red;stroke-width:1");
  svgLine.setAttributeNS(null, "x1", 0);
  svgLine.setAttributeNS(null, "x2", VIEWPORT);
  svgLine.setAttributeNS(null, "y1", VIEWPORT / 2);
  svgLine.setAttributeNS(null, "y2", VIEWPORT / 2);
  $image.appendChild(svgLine);
  return lines = (yield* (function*() {
    var j, len, results;
    results = [];
    for (idx = j = 0, len = audioParts.length; j < len; idx = ++j) {
      audioPart = audioParts[idx];
      max = audioPart.reduce(function(acc, i) {
        return Math.max(acc, i);
      });
      min = audioPart.reduce(function(acc, i) {
        return Math.min(acc, i);
      });
      svgLine = document.createElementNS($image.namespaceURI, "line");
      svgLine.setAttributeNS(null, "class", "wave-line");
      svgLine.setAttributeNS(null, "x1", idx);
      svgLine.setAttributeNS(null, "x2", idx);
      if (Math.abs(min) < Math.abs(max)) {
        svgLine.setAttributeNS(null, "y1", VIEWPORT / 2);
        svgLine.setAttributeNS(null, "y2", (VIEWPORT / 2) * max / maxHeight + (VIEWPORT / 2));
      } else {
        svgLine.setAttributeNS(null, "y1", (VIEWPORT / 2) * min / maxHeight + VIEWPORT / 2);
        svgLine.setAttributeNS(null, "y2", VIEWPORT / 2);
      }
      $image.appendChild(svgLine);
      results.push((yield null));
    }
    return results;
  })());
});

drawDense = async(function*(channelData) {
  var $image, audioPart, audioParts, idx, lines, maxHeight, min, svgLine;
  $image = document.querySelector('#audio-image');
  maxHeight = channelData.reduce(function(acc, i) {
    return Math.max(acc, Math.abs(i));
  });
  audioParts = (yield split(channelData, VIEWPORT));
  lines = (yield* (function*() {
    var j, len, results;
    results = [];
    for (idx = j = 0, len = audioParts.length; j < len; idx = ++j) {
      audioPart = audioParts[idx];
      max = Math.max(0, audioPart.reduce(function(acc, i) {
        return Math.max(acc, i);
      }));
      min = Math.min(0, audioPart.reduce(function(acc, i) {
        return Math.min(acc, i);
      }));
      svgLine = document.createElementNS($image.namespaceURI, "line");
      svgLine.setAttributeNS(null, "class", "wave-line");
      svgLine.setAttributeNS(null, "x1", idx);
      svgLine.setAttributeNS(null, "x2", idx);
      svgLine.setAttributeNS(null, "y1", (VIEWPORT / 2) * min / maxHeight + (VIEWPORT / 2));
      svgLine.setAttributeNS(null, "y2", (VIEWPORT / 2) * max / maxHeight + (VIEWPORT / 2));
      $image.appendChild(svgLine);
      results.push((yield null));
    }
    return results;
  })());
  svgLine = document.createElementNS($image.namespaceURI, "line");
  svgLine.setAttributeNS(null, "style", "stroke:red;stroke-width:1");
  svgLine.setAttributeNS(null, "x1", 0);
  svgLine.setAttributeNS(null, "x2", VIEWPORT);
  svgLine.setAttributeNS(null, "y1", VIEWPORT / 2);
  svgLine.setAttributeNS(null, "y2", VIEWPORT / 2);
  return $image.appendChild(svgLine);
});

async.main(function*() {
  var $audio, $status, arrBuff, audioData, channelData, err, error, res;
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
  $status.innerHTML = 'creating lines';
  try {
    (yield Promise.all([]));
    $status.innerHTML = 'done and done';
    return 2;
  } catch (error) {
    err = error;
    return $status.innerHTML = "failed with " + err;
  }
});

window.async = async;


},{"./promiseWorker.coffee":2,"./rangeQuery.coffee":3,"es6-simple-async":4,"webworkify":5}],2:[function(require,module,exports){
"use strict";
var PromiseWorker;

PromiseWorker = (function() {
  function PromiseWorker(worker) {
    this.worker = worker;
    this.waiting = {};
    this.currentID = 0;
    this.worker.onmessage = (function(_this) {
      return function(event) {
        if (!event.data.error) {
          _this.waiting[event.data.id].resolve(event.data.message);
        } else {
          _this.waiting[event.data.id].reject(event.data.message);
        }
        return delete _this.waiting[event.data.id];
      };
    })(this);
    this.worker.onerror = function(err) {
      return console.error("If you see this error please put in a bug report");
    };
  }

  PromiseWorker.prototype.postMessage = function(message, transferables) {

    /* This posts a message to the worker and returns a promise that'll
        resolve when the message is returned
     */
    return new Promise((function(_this) {
      return function(resolve, reject) {
        var newMessage;
        _this.waiting[_this.currentID] = {
          resolve: resolve,
          reject: reject
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


},{}],3:[function(require,module,exports){

/* This is an implementation of range query specially as in the definition
    of Range Max Query but any comparison function may be used
 */
"use strict";
var max, rangeQuery, segmentTree, span;

max = function(a, b) {
  if (b == null) {
    return a;
  }
  if (isNaN(b)) {
    return a;
  } else if (a > b) {
    return a;
  } else {
    return b;
  }
};

segmentTree = function(arr, queryFunc) {
  var ArrType, err, error, i, j, ref, tree, treeSize, upperPowerOfTwo;
  if (queryFunc == null) {
    queryFunc = max;
  }

  /* This creates a segmentTree from an arr */
  ArrType = arr.constructor;
  upperPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(arr.length)));
  treeSize = upperPowerOfTwo + arr.length;
  tree = new ArrType(treeSize);
  try {
    [].splice.apply(tree, [upperPowerOfTwo, treeSize - upperPowerOfTwo].concat(arr)), arr;
  } catch (error) {
    err = error;
    tree.set(arr, upperPowerOfTwo);
  }
  for (i = j = ref = upperPowerOfTwo - 1; ref <= 0 ? j < 0 : j > 0; i = ref <= 0 ? ++j : --j) {
    tree[i] = queryFunc(tree[i * 2], tree[i * 2 + 1]);
  }
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

rangeQuery = function(tree, queryFunc) {
  var query;
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
      upper = arr.length;
    }

    /* This function queries the segment tree recursively
        it tries to select a minimum number of points that describe
        the range entered
     */
    _query = function(node) {
      var leftMax, middle, ref, rightMax, spanLower, spanUpper;
      if (lower >= upper) {
        throw new Error("Queried range smaller than size 1");
      } else if (lower < 0) {
        throw new Error("Lower bound is below zero");
      } else if (upper > arr.length) {
        throw new Error("Upper bound is beyond array");
      }
      ref = span(node), spanLower = ref[0], spanUpper = ref[1];
      middle = Math.floor((spanLower + spanUpper) / 2);
      if (lower <= spanLower && upper >= spanUpper) {
        return tree[node];
      } else if (spanUpper - spanLower === 1) {
        return tree[node];
      } else if (upper < middle) {
        return _query(node * 2);
      } else if (lower >= middle) {
        return _query(node * 2 + 1);
      } else {
        leftMax = _query(node * 2);
        rightMax = _query(node * 2 + 1);
        return queryFunc(leftMax, rightMax);
      }
    };
    return _query(1);
  };
};

module.exports = {
  rangeQuery: rangeQuery,
  segmentTree: segmentTree
};


},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

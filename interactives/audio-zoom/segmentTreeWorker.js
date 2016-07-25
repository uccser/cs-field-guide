(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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


},{}],2:[function(require,module,exports){
"use strict";
var registerWorker;

module.exports = registerWorker = function(func) {

  /* This registers a worker so that it send messages back to a PromiseWorker
   */
  return self.onmessage = function(message) {
    var err, error, response, result;
    try {
      result = func(message.data.message);
      return Promise.resolve(result).then(function(result) {
        var response;
        response = {
          id: message.data.id,
          message: result,
          error: false
        };
        self.postMessage(response, func.transferables);
        return delete func.transferables;
      })["catch"](function(err) {
        var response;
        response = {
          id: message.data.id,
          message: String(err),
          error: true
        };
        self.postMessage(response, func.transferables);
        return delete func.transferables;
      });
    } catch (error) {
      err = error;
      response = {
        id: message.data.id,
        message: String(err),
        error: true
      };
      self.postMessage(response, func.transferables);
      return delete func.transferables;
    }
  };
};


},{}],3:[function(require,module,exports){
"use strict";
var createSegmentTree, register, segmentTree;

register = require('./registerPromiseWorker.coffee');

segmentTree = require('./rangeQuery.coffee').segmentTree;

register(createSegmentTree = function(arg) {
  var channelData, func, functionString, tree;
  channelData = arg.channelData, functionString = arg.functionString;
  func = eval("(" + functionString + ")");
  tree = segmentTree(channelData, func);
  return tree;
});


},{"./rangeQuery.coffee":1,"./registerPromiseWorker.coffee":2}]},{},[3]);

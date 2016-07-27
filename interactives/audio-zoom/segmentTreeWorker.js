(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var registerWorker;

module.exports = registerWorker = function(func) {

  /* This registers a worker so that it send messages back to a PromiseWorker
   */
  return self.onmessage = function(message) {
    var err, error, messageContext, response, result;
    messageContext = {
      postProgress: function(progressMessage) {

        /* This can be used to send when progress is made */
        return self.postMessage({
          id: message.data.id,
          message: progressMessage,
          type: 'progress'
        });
      }
    };
    try {
      result = func.call(messageContext, message.data.message);
      return Promise.resolve(result).then(function(result) {
        var response;
        response = {
          id: message.data.id,
          message: result,
          type: 'message'
        };
        self.postMessage(response, func.transferables);
        return delete func.transferables;
      })["catch"](function(err) {
        var response;
        response = {
          id: message.data.id,
          message: String(err),
          type: 'error'
        };
        self.postMessage(response, func.transferables);
        return delete func.transferables;
      });
    } catch (error) {
      err = error;
      response = {
        id: message.data.id,
        message: String(err),
        type: 'error'
      };
      self.postMessage(response, func.transferables);
      return delete func.transferables;
    }
  };
};


},{}],2:[function(require,module,exports){
"use strict";
var createSegmentTree, max, register, segmentTree;

register = require('./registerPromiseWorker.coffee');

max = function(a, b) {
  if (isNaN(b)) {
    return a;
  } else if (a > b) {
    return a;
  } else {
    return b;
  }
};

segmentTree = function(arr, queryFunc, postProgress) {
  var ArrType, done, i, j, progress, ref, tree, treeSize, upperPowerOfTwo;
  if (queryFunc == null) {
    queryFunc = max;
  }
  if (postProgress == null) {
    postProgress = function() {};
  }

  /* This creates a segmentTree from an arr */
  ArrType = arr.constructor;
  upperPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(arr.length)));
  treeSize = upperPowerOfTwo + arr.length;
  tree = new ArrType(treeSize);
  if (ArrType === Array) {
    [].splice.apply(tree, [upperPowerOfTwo, treeSize - upperPowerOfTwo].concat(arr)), arr;
  } else {
    tree.set(arr, upperPowerOfTwo);
  }
  progress = Math.floor(upperPowerOfTwo / 100);
  done = 0;
  for (i = j = ref = upperPowerOfTwo - 1; ref <= 0 ? j < 0 : j > 0; i = ref <= 0 ? ++j : --j) {
    if (i % progress === 0) {
      done += 1;
      postProgress(done / 100);
    }
    tree[i] = queryFunc(tree[i * 2], tree[i * 2 + 1]);
  }
  return {
    tree: tree,
    dataLength: arr.length
  };
};

register(createSegmentTree = function(arg) {
  var channelData, func, functionString, tree;
  channelData = arg.channelData, functionString = arg.functionString;
  func = eval("(" + functionString + ")");
  tree = segmentTree(channelData, func, this.postProgress);
  return tree;
});


},{"./registerPromiseWorker.coffee":1}]},{},[2]);

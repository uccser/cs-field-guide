(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $inputs, $spinner, FSARunner, spinnerFSA;

FSARunner = window.FSA.FSARunner;

spinnerFSA = new FSARunner({
  Start: 'slow',
  Alphabet: ['reset', 'next'],
  States: {
    slow: {
      transitions: {
        next: 'medium',
        reset: 'slow'
      }
    },
    medium: {
      transitions: {
        next: 'fast',
        reset: 'slow'
      }
    },
    fast: {
      transitions: {
        next: 'slow',
        reset: 'slow'
      }
    }
  }
});

$inputs = $("#interactive-fsa-spin [fsa-spin-input]");

$spinner = $("#interactive-fsa-spin .rotating");

$inputs.click(function() {
  return spinnerFSA.next($(this).attr('fsa-spin-input'));
});

spinnerFSA.onChange(function(arg) {
  var currentState;
  currentState = arg.currentState;
  return $spinner.attr('speed', currentState);
});


},{}]},{},[1]);

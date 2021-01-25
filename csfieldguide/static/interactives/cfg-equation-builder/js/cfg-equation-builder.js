/**
 * Productions in the grammar.
 * A number or a string that begins and ends with an inverted comma (') is
 * interpreted as terminal, everything else as nonterminal.
 * A production with only terminals can be a list of elements rather than a list of lists
 */
const PRODUCTIONS = {
  "E": [
    ["D"],
    ["'-'", "E"],
    ["E", "'+'", "E"],
    ["E", "'\u00D7'", "E"],
    ["'('", "E", "')'"],
  ],
  "D": [0,1,2,3,4,5,6,7,8,9]
};

/**
 * Used when generating random expressions.
 * When the max recursion depth is reached one of these will be used.
 */
const FINAL_TERMINALS = [0,1,2,3,4,5,6,7,8,9];

var $activeNonterminal = null;
var previous = '';

$(document).ready(function() {
  $('#generate-button').on('click', function() {
    $('#cfg-target').val(randomExpression('E', PRODUCTIONS, 3, FINAL_TERMINALS));
    testMatchingEquations();
  });
  $('#reset-button').on('click', function() {
    $('#cfg-equation').html('<span class="nonterminal">E</span>');
    reapplyNonterminalClickEvent();
    testMatchingEquations();
    previous = '';
    $("#undo-button").prop('disabled', true);
  });
  $("#undo-button").on('click', undo);
  $("#undo-button").prop('disabled', true);
  $('#cfg-target').change(testMatchingEquations);
  $('#cfg-target').val(randomExpression('E', PRODUCTIONS, 1, FINAL_TERMINALS));
  reapplyNonterminalClickEvent();
  //https://stackoverflow.com/a/3028037
  $(document).click(function(event) { 
    var $target = $(event.target);
    if(!$target.closest('.nonterminal').length &&
    !$target.closest('#selection-popup').length &&
    $('#selection-popup').is(":visible")) {
      $('#selection-popup').hide();
      $activeNonterminal = null;
    }        
  });
});

/**
 * Each time a new nonterminal is created it needs to be bound to the click event.
 */
function reapplyNonterminalClickEvent() {
  $('.nonterminal').unbind('click');
  //https://stackoverflow.com/a/44753671
  $('.nonterminal').on('click', function(event) {
    setActiveNonterminal($(event.target));
    $("#selection-popup").css({left: event.pageX});
    $("#selection-popup").css({top: event.pageY});
    $("#selection-popup").show();
  });
}

/**
 * Tests to see if the user-created equation matches the target one.
 * 
 * If they match, applies an effect, else removes it.
 */
function testMatchingEquations() {
  if ($("#cfg-target").val().trim() == $("#cfg-equation").html().trim()) {
    $("#cfg-equation").addClass("success");
    $("#generate-button").addClass("success");
  } else {
    $("#cfg-equation").removeClass("success");
    $("#generate-button").removeClass("success");
  }
}

/**
 * Sets the given html element as the nonterminal to be replaced.
 * Prepares the popup appropriately.
 */
function setActiveNonterminal($target) {
  $activeNonterminal = $target;
  var nonterminal = $target.html();
  $('#selection-popup').html('');
  if (Object.keys(PRODUCTIONS).indexOf(nonterminal) < 0) {
    console.error(`Could not find nonterminal ${nonterminal} in available productions.`);
    $('#selection-popup').html('No replacements available.');
    return;
  }
  $('#selection-popup').html(getPopupVal(nonterminal, PRODUCTIONS[nonterminal]));
  $('.cfg-popup-replacement').on('click', function(event) {
    applyProduction($(event.target));
    $('#selection-popup').hide();
    testMatchingEquations();
  });
}

/**
 * Replaces the active nonterminal using the target production.
 */
function applyProduction($target) {
  var nonterminal = $activeNonterminal.html();
  var replacementIndex = parseInt($target.attr('cfg-replacement'));
  var replacement = PRODUCTIONS[nonterminal][replacementIndex];
  previous = $("#cfg-equation").html();
  $("#undo-button").prop('disabled', false);
  $activeNonterminal.replaceWith(describeProductionReplacement(replacement));
  reapplyNonterminalClickEvent();
  $activeNonterminal = null;
}

/**
 * Replaces the existing equation with the one immediately before.
 * Only one previous version is stored.
 */
function undo() {
  $("#cfg-equation").html(previous);
  $activeNonterminal = null;
  previous = "";
  $("#undo-button").prop('disabled', true);
  reapplyNonterminalClickEvent();
  testMatchingEquations();
}

/**
 * Returns a string of HTML code to be put in the popup, allowing the user to select
 * a replacement for the given nonterminal.
 */
function getPopupVal(nonterminal, replacements) {
  var code = '<div class="btn-group-vertical">';
  var nextStr = "";
  for (var i=0; i<replacements.length; i++) {
    nextStr = describeProduction(nonterminal, replacements[i]);
    code += `<button type="button" class="btn btn-secondary cfg-popup-replacement" cfg-replacement="${i}">${nextStr}</button>`;
  }
  code += '</div>';
  return code;
}

/**
 * Returns a string describing the production formatted nicely
 * 
 * e.g. E -> E+E
 */
function describeProduction(nonterminal, replacement) {
  var returnText = nonterminal + " &#8594 ";
  if (typeof(replacement) != 'object') {
    return returnText + replacement.toString().replace(/^\'+|\'+$/g, '');
  }
  for (var i=0; i<replacement.length; i++) {
    returnText += replacement[i].toString().replace(/^\'+|\'+$/g, '');
  }
  return returnText;
}

/**
 * Returns a string of HTML code describing the production result formatted to
 * be inserted into the user-built equation
 * 
 * e.g. <span class="nonterminal">E</span>+<span class="nonterminal">E</span>
 */
function describeProductionReplacement(replacement) {
  if (typeof(replacement) != 'object') {
    return replacement.toString().replace(/^\'+|\'+$/g, '');
  }
  var code = "";
  for (var i=0; i<replacement.length; i++) {
    if (isTerminal(replacement[i])) {
      code += replacement[i].toString().replace(/^\'+|\'+$/g, '');
    } else {
      code += `<span class="nonterminal">${replacement[i].toString().replace(/^\'+|\'+$/g, '')}</span>`;
    }
  }
  return code;
}

/**
 * Returns a random integer in the range [0, max).
 * From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Returns true if the given string fits the definition of a terminal,
 * false otherwise.
 * 
 * A terminal is a number or a string that begins and ends with an
 * inverted comma ('), with at least 1 character in between
 */
function isTerminal(s) {
  return (typeof(s) == 'number' ||
    (
      s.length > 2
      && s.charAt(0) == "'"
      && s.charAt(s.length - 1) == "'"
    ));
}

/**
 * Returns a random expression generated from the given grammar productions.
 * 
 * @param {String} replaced nonterminal being replaced
 * @param {Dict} productions all productions, one of which will replace `replaced`
 * @param {Number} maxDepth maximum depth of recursion
 * @param {Array} T Terminal characters to use if `maxDepth` is reached
 * 
 * It is assumed that any terminal in T can logically (through one or more steps)
 * replace any nonterminal.
 * This will become problematic if more complicated grammars are introduced in future
 */
function randomExpression(replaced, productions, maxDepth, T) {
  if (maxDepth <= 0) {
    return T[getRandomInt(T.length)].toString().replace(/^\'+|\'+$/g, '');
  }

  var replacement = productions[replaced][getRandomInt(productions[replaced].length)]
  if (typeof(replacement) != 'object') {
    return replacement.toString().replace(/^\'+|\'+$/g, '');
  }
  var returnString = '';
  for (var i=0; i<replacement.length; i++) {
    if (isTerminal(replacement[i])) {
      returnString += replacement[i].toString().replace(/^\'+|\'+$/g, '');
    } else {
      returnString += randomExpression(replacement[i], productions, maxDepth - 1, T);
    }
  }
  return returnString;
}

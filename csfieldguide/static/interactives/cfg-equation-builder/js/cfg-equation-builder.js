var urlParameters = require('../../../js/third-party/url-parameters.js');
const Examples = require('./examples-hard.js');

/**
 * Productions in the default grammar.
 * A number or a string that begins and ends with an inverted comma (') is
 * interpreted as terminal, everything else as nonterminal.
 * A production with only terminals can be a list of elements rather than a list of lists
 */
const DEFAULT_PRODUCTIONS = {
  "E": [
    ["N"],
    ["E", "'+'", "E"],
    ["E", "'*'", "E"],
    ["'-'", "E"],
    ["'('", "E", "')'"],
  ],
  "N": [0,1,2,3,4,5,6,7,8,9]
};

/**
 * Used when generating random expressions.
 * When the max recursion depth is reached one of these will be used.
 */
const DEFAULT_FINAL_TERMINALS = [0,1,2,3,4,5,6,7,8,9];

var $activeNonterminal_ = null;
var historyStack_ = [];
var productions_ = DEFAULT_PRODUCTIONS;
var finalTerminals_ = DEFAULT_FINAL_TERMINALS;
var initialNonterminal_ = 'E'
var examples_ = Examples.hardExamples;

$(document).ready(function() {
  parseUrlParameters();
  $('#cfg-equation').html(`<span class="nonterminal">${initialNonterminal_}</span>`);
  fillProductionsWindow(productions_);
  $('#generate-button').on('click', function(event) {
    $('#cfg-target').val(generateTarget(event.target));
    testMatchingEquations();
  });
  $('#reset-button').on('click', function() {
    $('#cfg-equation').html(`<span class="nonterminal">${initialNonterminal_}</span>`);
    reapplyNonterminalClickEvent();
    testMatchingEquations();
    historyStack_ = [];
    $('#undo-button').prop('disabled', true);
  });
  $('#set-g-random').on('click', function () {
    setGenerator('random');
  })
  $('#set-g-random-simple').on('click', function () {
    setGenerator('random-simple');
  })
  $('#set-g-from-preset').on('click', function () {
    setGenerator('from-preset');
  })
  $('#undo-button').on('click', undo);
  $('#undo-button').prop('disabled', true);
  $('#cfg-target').change(testMatchingEquations);
  if (urlParameters.getUrlParameter('recursion-depth')) {
    $('#cfg-target').val(randomExpression(initialNonterminal_, productions_, urlParameters.getUrlParameter('recursion-depth'), finalTerminals_));
  } else {
    $('#cfg-target').val(randomExpression(initialNonterminal_, productions_, 1, finalTerminals_));
  }
  reapplyNonterminalClickEvent();
  //https://stackoverflow.com/a/3028037
  $(document).click(function(event) { 
    var $target = $(event.target);
    if(!$target.closest('.nonterminal').length &&
    !$target.closest('#selection-popup').length &&
    $('#selection-popup').is(':visible')) {
      $('#selection-popup').hide();
      $activeNonterminal_ = null;
    }
  });
});

/******************************************************************************/
// FUNCTIONS FOR PARSING THE URL //
/******************************************************************************/

/**
 * Interprets the given URL parameters and prepares the interactive accordingly
 */
function parseUrlParameters() {
  var grammar = urlParameters.getUrlParameter('productions');
  var finalTerminals = urlParameters.getUrlParameter('terminals');
  var examples = urlParameters.getUrlParameter('examples');
  var recursionDepth = urlParameters.getUrlParameter('recursion-depth');

  if (grammar) {
    productions_ = decodeGrammar(grammar);
    if (!examples) {
      $('#set-g-from-preset').hide();
    }
    if (!finalTerminals) {
      finalTerminals_ = findAllTerminals(productions_);
    }
  }
  if (finalTerminals) {
    finalTerminals_ = decodeTerminals(finalTerminals);
  }
  if (examples) {
    examples = examples.split('|');
    for (var i=0; i<examples.length; i++) {
      examples[i] = examples[i].trim();
    }
    examples_ = examples;
  }
  if (recursionDepth) {
    $('#set-g-random-simple').hide();
  }
}

/**
 * Parses the given string to form a dictionary of grammar productions.
 * 
 * e.g. the default productions could be parsed from:
 * E : N | E '+' E | E '*' E | '-' E | '(' E ')' ; N : '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' ;
 */
function decodeGrammar(productionString) {
  var duo, nonterminal, replacementString;
  var replacements = [];
  var productions = {};
  var blocks = productionString.split(";");
  initialNonterminal_ = blocks[0].split(':')[0].trim();
  for (var blockIndex=0; blockIndex < blocks.length; blockIndex++) {
    if (blocks[blockIndex].trim() == '') {
      continue;
    }
    duo = blocks[blockIndex].split(':');
    if (duo.length != 2) {
      console.error("Invalid syntax for given grammar productions: " + blocks[blockIndex]);
      continue;
    }
    nonterminal = duo[0].trim();
    replacementString = duo[1];
    replacements = (interpretReplacementStrings(replacementString.split('|')));
    productions[nonterminal] = replacements;
  }
  return productions;
}

/**
 * Returns a list of production replacements in the format expected by this program.
 * If every replacement is an integer, returns a list of elements rather than
 * a list of lists
 */
function interpretReplacementStrings(replacementStrings) {
  const isNumber = (value) => typeof(value) == 'number';
  var replacements = [];
  var replacementUnits;
  for (var i=0; i<replacementStrings.length; i++) {
    replacementUnits = replacementStrings[i].trim().split(' ');
    var firstUnit = replacementUnits[0].replace(/^\'+|\'+$/g, '');
    if (replacementUnits.length == 1 && !isNaN(firstUnit)
    && parseInt(firstUnit) == parseFloat(firstUnit)) {
      // A full list of integer terminals is interpreted differently
      replacements.push(parseInt(firstUnit));
    } else {
      replacements.push(replacementUnits);
    }
  }
  if (!replacements.every(isNumber)) {
    // If not all of them are integers then we have to resort to the long form standard
    for (i=0; i<replacements.length; i++) {
      if (isNumber(replacements[i])) {
        replacements[i] = [`'${replacements[i].toString()}'`];
      }
    }
  }
  return replacements
}

/**
 * Returns a list of all terminals in the given production dict
 */
function findAllTerminals(productions) {
  var key;
  var terminals = new Set();
  for (var x in Object.keys(productions)) {
    key = Object.keys(productions)[x];
    for (var i=0; i<productions[key].length; i++) {
      if (typeof(productions[key][i]) == 'object') {
        for (var j=0; j<productions[key][i].length; j++) {
          if (isTerminal(productions[key][i][j])) {
            terminals.add(productions[key][i][j])
          }
        }
      } else {
        terminals.add(productions[key][i])
      }
    }
  }
  return Array.from(terminals);
}

/**
 * Parses the given string to form a list of terminal strings.
 * With outer whitespace and inverted commas removed, everything between '|'
 * symbols is an individual terminal.
 * 
 * e.g. a|b|c|d , 'a'|'b'|'c'|'d' , 'a' | 'b' | 'c' | 'd' all decode to the same thing
 */
function decodeTerminals(terminalString) {
  var terminals = terminalString.split('|');
  for (var i=0; i<terminals.length; i++) {
    terminals[i] = terminals[i].trim().replace(/^\'+|\'+$/g, '');
  }
  return terminals;
}

/******************************************************************************/
// FUNCTIONS FOR PREPARING THE INTERACTIVE //
/******************************************************************************/

/**
 * Fills the user-facing table with the given grammar productions.
 * If the productions are sufficiently short, they are displayed in 2 columns
 */
function fillProductionsWindow(productions) {
  var keys = Object.keys(productions)
  var describedProductions = [];
  for (i=0; i<keys.length; i++) {
    describedProductions = describedProductions.concat(describeAndReduceProductions(keys[i], productions[keys[i]]));
  }

  var use2Cols = describedProductions.length > 1;
  for (var x=0; x<describedProductions.length; x++) {
    // 14 is the length of &#8594 plus 8 characters
    if (describedProductions[x].length > 14) {
      use2Cols = false;
      break;
    }
  }

  var $table = $('#productions-table')
  var table = "";
  if (use2Cols) {
    table += (`<tr><th colspan="2"><h3>${gettext("Productions:")}</h3></th></tr>`)
    var half = Math.ceil(describedProductions.length / 2);
    for (var i=0; i<half; i++) {
      if (half + i < describedProductions.length) {
        table += (`<tr><td>${describedProductions[i]}</td><td>${describedProductions[half + i]}</td></tr>`)
      } else {
        table += (`<tr><td>${describedProductions[i]}</td><td></td></tr>`)
      }
    }
  } else {
    table += (`<tr><th><h3>${gettext("Productions:")}</h3></th></tr>`)
    for (var j=0; j<describedProductions.length; j++) {
      table += (`<tr><td>${describedProductions[j]}</td></tr>`)
    }
  }
  $table.html(table);
}

/**
 * Returns a list of strings, each describing productions from a given nonterminal
 * 
 * If replacements is an incremental list of integers they are reduced appropriately
 */
function describeAndReduceProductions(nonterminal, replacements) {
  var isCompressable = true;
  if (typeof(replacements[0]) == 'number' && replacements.length > 1) {
    for (var i=1; i<replacements.length; i++) {
      if (replacements[i] != replacements[i-1] + 1) {
        isCompressable = false;
        break;
      }
    }
  } else {
    isCompressable = false;
  }

  if (isCompressable) {
    return [`${nonterminal} &#8594 ${replacements[0]}-${replacements[replacements.length - 1]}`]
  }
  var returnList = [];
  for (i=0; i<replacements.length; i++) {
    returnList.push(describeProduction(nonterminal, replacements[i]));
  }
  return returnList;
}

/******************************************************************************/
// FUNCTIONS FOR INTERACTIVE LOGIC //
/******************************************************************************/

/**
 * Sets the equation generator to be of the given type
 */
function setGenerator(type) {
  $('#generate-button').html($('#set-g-' + type).html());
  $('#generate-button').attr('g-type', $('#set-g-' + type).attr('g-type'));
}

/**
 * Returns a (string) new equation for the user to try to build depending on the selected generator.
 */
function generateTarget($button) {
  if ($button.getAttribute('g-type') == 'random') {
    if (urlParameters.getUrlParameter('recursion-depth')) {
      return randomExpression(initialNonterminal_, productions_, parseInt(urlParameters.getUrlParameter('recursion-depth')), finalTerminals_);
    }
    return randomExpression(initialNonterminal_, productions_, 3, finalTerminals_);
  } else if ($button.getAttribute('g-type') == 'random-simple') {
    return randomExpression(initialNonterminal_, productions_, 1, finalTerminals_);
  } else {
    return examples_[getRandomInt(examples_.length)];
  }
}

/**
 * Each time a new nonterminal is created it needs to be bound to the click event.
 */
function reapplyNonterminalClickEvent() {
  $('.nonterminal').unbind('click');
  //https://stackoverflow.com/a/44753671
  $('.nonterminal').on('click', function(event) {
    setActiveNonterminal($(event.target));
    $('#selection-popup').css({left: event.pageX});
    $('#selection-popup').css({top: event.pageY});
    $('#selection-popup').show();
  });
}

/**
 * Tests to see if the user-created equation matches the target one.
 * 
 * If they match, applies an effect, else removes it.
 */
function testMatchingEquations() {
  if ($('#cfg-target').val().trim() == $('#cfg-equation').html().trim()) {
    $('#cfg-equation').addClass('success');
    $('#generate-button').addClass('success');
    $('#generate-dropdown').addClass('success');
  } else {
    $('#cfg-equation').removeClass('success');
    $('#generate-button').removeClass('success');
    $('#generate-dropdown').removeClass('success');
  }
}

/**
 * Sets the given html element as the nonterminal to be replaced.
 * Prepares the popup appropriately.
 */
function setActiveNonterminal($target) {
  $activeNonterminal_ = $target;
  var nonterminal = $target.html();
  $('#selection-popup').html('');
  if (Object.keys(productions_).indexOf(nonterminal) < 0) {
    console.error(`Could not find nonterminal ${nonterminal} in available productions.`);
    $('#selection-popup').html(gettext('No productions available.'));
    return;
  }
  $('#selection-popup').html(getPopupVal(nonterminal, productions_[nonterminal]));
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
  var nonterminal = $activeNonterminal_.html();
  var replacementIndex = parseInt($target.attr('cfg-replacement'));
  var replacement = productions_[nonterminal][replacementIndex];
  historyStack_.push($('#cfg-equation').html());
  $('#undo-button').prop('disabled', false);
  $activeNonterminal_.replaceWith(describeProductionReplacement(replacement));
  reapplyNonterminalClickEvent();
  $activeNonterminal_ = null;
}

/**
 * Replaces the existing equation with the one immediately before.
 * Only one previous version is stored.
 */
function undo() {
  $('#cfg-equation').html(historyStack_.pop());
  $activeNonterminal_ = null;
  if (historyStack_.length <= 0) {
    $('#undo-button').prop('disabled', true);
  }
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

/******************************************************************************/
// FUNCTIONS FOR CREATING RANDOM EQUATIONS //
/******************************************************************************/

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

  try {
    var replacement = productions[replaced][getRandomInt(productions[replaced].length)]
  } catch (error) {
    console.error(error);
    $('#error-notice').html(gettext("An error occurred while generating a new equation. This probably means there is a nonterminal in the grammar productions with no corresponding production."));
    $('#error-notice').show();
    return;
  }
  $('#error-notice').hide();
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

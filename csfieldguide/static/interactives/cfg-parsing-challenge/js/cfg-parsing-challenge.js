var urlParameters = require('../../../js/third-party/url-parameters.js');

/**
* Productions in the default grammar.
* A number or a string that begins and ends with an inverted comma (') is
* interpreted as terminal, everything else as non-terminal.
*/
const DEFAULT_PRODUCTIONS = {
  "E": [
    ["N"],
    ["E", "'+'", "E"],
    ["E", "'*'", "E"],
    ["'-'", "E"],
    ["'('", "E", "')'"],
  ],
  "N": [["'0'"],["'1'"],["'2'"],["'3'"],["'4'"],["'5'"],["'6'"],["'7'"],["'8'"],["'9'"]]
};

const RECURSIONDEPTH_SIMPLE = 3;
const RECURSIONDEPTH_DEFAULT = 5;
const ARROW = '&#10142;'

var $activeNonterminal_ = null;
var historyStack_ = [];
var historyListElem_;
var productions_ = DEFAULT_PRODUCTIONS;
var initialNonterminal_ = 'E'
var examples_ = [];
var nextExample_ = 0;
var hideGenerator_ = false;
var recursionDepth_ = RECURSIONDEPTH_DEFAULT;

var expressionsUpToDepth_ = {}
var expressionsAreParsed_ = false;

$(document).ready(function() {
  // Setup global variables
  historyListElem_ = document.getElementById('history-list');
  parseUrlParameters();

  // Setup events
  $('#generate-button').on('click', function(event) {
    $('#cfg-target').val(generateTarget(event.target));
    resetEquation();
  });
  $('#reset-button').on('click', function() {
    resetEquation();
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
  $('#cfg-grammar-link-button').on('click', getLink);
  $('#cfg-default-link-button').on('click', resetLink);
  $("#examples-checkbox").change(toggleExamplesWindow).prop('checked', false);
  //https://stackoverflow.com/a/3028037
  $(document).click(function (event) {
    var $target = $(event.target);
    if (!$target.closest('.nonterminal').length &&
      !$target.closest('#selection-popup').length &&
      $('#selection-popup').is(':visible')) {
      $('#selection-popup').hide();
      $activeNonterminal_ = null;
    }
  });

  // Setup interface
  resetEquation();
  fillProductionsWindow(productions_);
  toggleExamplesWindow();
  $('#cfg-target').change(testMatchingEquations);

  if (examples_.length) {
    $('#cfg-target').val(examples_[0]);
  } else if (hideGenerator_) {
    $('#cfg-target').val('');
  } else {
    //$('#cfg-target').val(randomExpression(initialNonterminal_, productions_, recursionDepth_));
  }
  $('#cfg-grammar-input').val('');
  getLink();
});

/**
* Resets the equation being constructed by the user to solely the original non-terminal
*/
function resetEquation() {
  let initial_html = `<span class="nonterminal">${initialNonterminal_}</span>`;
  $('#cfg-equation').html(initial_html);
  reapplyNonterminalClickEvent();
  testMatchingEquations();
  historyStack_ = [];
  historyListElem_.innerHTML = '';
  addHistoryElement(initial_html, null);
  $('#undo-button').prop('disabled', true);
}

/******************************************************************************/
// FUNCTIONS FOR PARSING THE URL //
/******************************************************************************/

/**
* Interprets the given URL parameters and prepares the interactive accordingly
*/
function parseUrlParameters() {
  if (urlParameters.getUrlParameter('hide-builder') == 'true') {
    $('#grammar-builder-button').hide();
  }
  if (urlParameters.getUrlParameter('editable-target') == 'true') {
    $('#cfg-target').attr('disabled', false);
  } else {
    $('#cfg-target').attr('disabled', true);
  }
  var grammar = urlParameters.getUrlParameter('productions');
  var examples = urlParameters.getUrlParameter('examples');
  var recursionDepth = urlParameters.getUrlParameter('recursion-depth');
  hideGenerator_ = urlParameters.getUrlParameter('hide-generator') == 'true';

  if (grammar) {
    productions_ = decodeGrammar(grammar);
  }
  if (examples) {
    examples = examples.split('|');
    for (let i=0; i<examples.length; i++) {
      examples[i] = examples[i].trim();
    }
    examples_ = examples;
  } else {
    $('#set-g-from-preset').hide();
  }
  if (recursionDepth && parseInt(recursionDepth) > 0) {
    recursionDepth_ = parseInt(recursionDepth);
  }
  if (hideGenerator_) {
    if (examples) {
      setGenerator('from-preset');
      $('#set-g-random').hide();
      $('#set-g-random-simple').hide();
      $('#generate-dropdown').hide();
    } else {
      $('#generator-buttons').hide();
    }
  } else if (recursionDepth) {
    $('#set-g-random-simple').hide();
    if (!examples) {
      $('#set-g-from-preset').hide();
    }
  }
}

/**
* Parses the given string to form a dictionary of grammar productions.
*
* e.g. the default productions could be parsed from:
* E:N|E '+' E|E '*' E|'-' E|'(' E ')'; N:'0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9';
*/
function decodeGrammar(productionString) {
  var duo, nonterminal, replacementString;
  var replacements = [];
  var productions = {};
  var blocks = productionString.split(';');
  initialNonterminal_ = blocks[0].split(':')[0].trim();
  for (let blockIndex=0; blockIndex < blocks.length; blockIndex++) {
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
  console.log(productions);
  return productions;
}

/**
* Returns a list of production replacements in the format expected by this program.
*/
function interpretReplacementStrings(replacementStrings) {
  var replacements = [];
  for (let i=0; i<replacementStrings.length; i++) {
    replacements.push(replacementStrings[i].trim().split(' '));
  }
  return replacements
}

/******************************************************************************/
// FUNCTIONS FOR PREPARING THE INTERACTIVE //
/******************************************************************************/

/**
* Fills the user-facing table with the given grammar productions.
*/
function fillProductionsWindow(productions) {
  var keys = Object.keys(productions)
  var describedProductions = [];
  for (let i=0; i<keys.length; i++) {
    describedProductions = describedProductions.concat(describeAndReduceProductions(keys[i], productions[keys[i]]));
  }

  var list = document.getElementById('production-list');
  for (let j = 0; j < describedProductions.length; j++) {
    var div = document.createElement('div');
    div.innerHTML = describedProductions[j];
    list.appendChild(div);
  }
}

/**
* Returns a list of strings, each describing productions from a given non-terminal
*
* If replacements is an incremental list of integers they are reduced appropriately
*/
function describeAndReduceProductions(nonterminal, replacements) {
  if (isCompressable(replacements)) {
    if (replacements.length == 2) {
      // Use syntax A|B where B = A+1, meaning 'Number A or number B'
      return [`<span class="nonterminal">${nonterminal}</span> ${ARROW} ${trimICs(replacements[0][0])}|${trimICs(replacements[1][0])}`]
    }
    // Use syntax A-B, meaning 'Any number from A through B'
    return [`<span class="nonterminal">${nonterminal}</span> ${ARROW} ${trimICs(replacements[0][0])} &#8211; ${trimICs(replacements[replacements.length - 1][0])}`]
  }
  var returnList = [];
  for (let i=0; i<replacements.length; i++) {
    returnList.push(describeProduction(nonterminal, replacements[i]));
  }
  return returnList;
}

/**
 * Returns true if the given list of replacements for a nonterminal is compressable
 * 
 * The list is compressable if:
 * - There are at least 2 possible replacements
 * - All replacements are single values
 * - All replacements are terminals
 * - All replacements are integers (positive or negative)
 * - All replacements are in sequentially increasing order ([1, 2, 3, ...])
 */
function isCompressable(replacements) {
  if (replacements.length < 2) return false;
  let firstValue = replacements[0];
  if (!(firstValue.length == 1 && isIntegerTerminal(firstValue[0]))) {
    return false;
  }
  let counter = parseInt(trimICs(firstValue[0]));
  for (let r=1; r<replacements.length; r++) {
    if (!(replacements[r].length == 1 &&
      isIntegerTerminal(replacements[r][0]) &&
      counter + 1 == parseInt(trimICs(replacements[r][0]))
      )) {
        return false
    }
    counter++;
  }
  return true
}


/**
* Returns true if s fits the definition of a terminal AND contains only
* an integer (positive or negative) between the inverted commas,
* false otherwise.
*/
function isIntegerTerminal(s) {
  return (isTerminal(s) && /^'-?\d+'$/.test(s))
}

/**
* Returns true if s fits the definition of a terminal,
* false otherwise.
*
* A terminal is a string that begins and ends with an
* inverted comma ('), with at least 1 character in between
*/
function isTerminal(s) {
  return /^'.+'$/.test(s);
}

/**
* Returns the given string with leading and trailing inverted commas removed 
*/
function trimICs(s) {
  return s.replace(/^\'+|\'+$/g, '');
}

/******************************************************************************/
// FUNCTIONS FOR INTERACTIVE LOGIC //
/******************************************************************************/

/**
* Sets the equation generator to be of the given type
*/
function setGenerator(type) {
  var $button = $('#set-g-' + type);
  var buttonLabel = $button.html();
  var buttonType = $button.attr('g-type');
  $('#generate-button').html(buttonLabel);
  $('#generate-button').attr('g-type', buttonType);
}

/**
* Returns a (string) new equation for the user to try to build depending on the selected generator.
*/
function generateTarget($button) {
  if ($button.getAttribute('g-type') == 'random') {
    return randomExpression(initialNonterminal_, productions_, recursionDepth_);
  } else if ($button.getAttribute('g-type') == 'random-simple') {
    return randomExpression(initialNonterminal_, productions_, RECURSIONDEPTH_SIMPLE);
  } else {
    nextExample_ = (nextExample_ + 1) % examples_.length;
    return examples_[nextExample_];
  }
}

/**
* Each time a new non-terminal is created it needs to be bound to the click event.
*/
function reapplyNonterminalClickEvent() {
  $('#cfg-equation .nonterminal').unbind('click');
  //https://stackoverflow.com/a/44753671
  $('#cfg-equation .nonterminal').on('click', function(event) {
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
* Sets the given html element as the non-terminal to be replaced.
* Prepares the popup appropriately.
*/
function setActiveNonterminal($target) {
  $activeNonterminal_ = $target;
  var nonterminal = $target.html();
  $('#selection-popup').html('');
  if (Object.keys(productions_).indexOf(nonterminal) < 0) {
    console.error(`Could not find non-terminal ${nonterminal} in available productions.`);
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
* Replaces the active non-terminal using the target production.
*/
function applyProduction($target) {
  var nonterminal = $activeNonterminal_.html();
  var replacementIndex = parseInt($target.attr('cfg-replacement'));
  var replacement = productions_[nonterminal][replacementIndex];
  $('#undo-button').prop('disabled', false);
  $activeNonterminal_.replaceWith(describeProductionReplacement(replacement));
  reapplyNonterminalClickEvent();
  $activeNonterminal_ = null;
  // Track history
  let cfg_equation = $('#cfg-equation').html();
  addHistoryElement(cfg_equation, describeProduction(nonterminal, replacement));
}

/**
* Replaces the existing equation with the one immediately before.
*/
function undo() {
  historyStack_.pop();
  let cfg_equation = historyStack_[historyStack_.length -1 ];
  $('#cfg-equation').html(cfg_equation);
  $activeNonterminal_ = null;
  if (historyStack_.length <= 1) {
    $('#undo-button').prop('disabled', true);
  }
  historyListElem_.removeChild(historyListElem_.lastChild);
  reapplyNonterminalClickEvent();
  testMatchingEquations();
}

/**
 *
 * @param {cfg_equation}: Equation to add to history display.
 * @param {production}: Production that resulted in the equation.
 */
function addHistoryElement(cfg_equation, production=null) {
  historyStack_.push(cfg_equation);
  var outer_div = document.createElement('div');
  outer_div.classList.add('history-item');

  // Create div for production
  if (production) {
    var production_div = document.createElement('div');
    production_div.classList.add('history-production');
    production_div.innerHTML = production;
    outer_div.appendChild(production_div);
  }

  // Create div for equation
  var equation_div = document.createElement('div');
  equation_div.classList.add('history-equation');
  equation_div.innerHTML = cfg_equation;
  outer_div.appendChild(equation_div);

  historyListElem_.appendChild(outer_div);
}

/**
* Returns a string of HTML code to be put in the popup, allowing the user to select
* a replacement for the given non-terminal.
*/
function getPopupVal(nonterminal, replacements) {
  var code = '<div class="btn-group-vertical">';
  var nextStr = "";
  for (let i=0; i<replacements.length; i++) {
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
  var returnText = `<span class="nonterminal">${nonterminal}</span> ${ARROW} `;
  if (typeof(replacement) != 'object') {
    return returnText + trimICs(replacement.toString());
  }
  for (let i=0; i<replacement.length; i++) {
    let replacement_item = replacement[i];
    if (replacement_item.startsWith('\'') && replacement_item.endsWith('\'')) {
      returnText += replacement_item.substring(1, replacement_item.length - 1);
    } else {
      returnText += `<span class="nonterminal">${replacement_item}</span >`;
    }
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
    return trimICs(replacement.toString());
  }
  var code = "";
  for (let i=0; i<replacement.length; i++) {
    if (isTerminal(replacement[i])) {
      code += trimICs(replacement[i].toString());
    } else {
      code += `<span class="nonterminal">${trimICs(replacement[i].toString())}</span>`;
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
* Follows the parse tree of the available productions to find every possible
* complete expression up to the defined depths.
*
* Produces expressions as strings in the form "[nonterminal]'[stringofterminals]'[nonterminal]'[etc]"
* Only results for the 'random' and 'simple' depths are saved
*/
function parseAllExpressions() {
  var maxDepth = recursionDepth_ > RECURSIONDEPTH_SIMPLE ? recursionDepth_ : RECURSIONDEPTH_SIMPLE;
  // Start with the initial nonterminal
  var expressionsAtCurrentDepth = new Set(initialNonterminal_);
  // For each level to the max depth needed
  for (let depth=1; depth<=maxDepth; depth++) {
    console.log(`Increasing depth to ${depth}`);
    // Find every expression at the current depth, including those with nonterminals
    expressionsAtCurrentDepth = increaseParseDepth(expressionsAtCurrentDepth, productions_)
    // Copy the ones that are only terminals
    if (depth == recursionDepth_) {
      expressionsUpToDepth_[recursionDepth_] = allCompleteExpressions(expressionsAtCurrentDepth);
    } else if (depth == RECURSIONDEPTH_SIMPLE) {
      expressionsUpToDepth_[RECURSIONDEPTH_SIMPLE] = allCompleteExpressions(expressionsAtCurrentDepth);
    }
  }
  console.log(`${expressionsUpToDepth_[maxDepth].size} expressions parsed`);
  expressionsAreParsed_ = true;
}

/**
* Follows the given productions for every nonterminal in the given set of expressions
* to create a set of expressions 1 level deeper in the parse tree
*/
function increaseParseDepth(expressions, productions) {
  console.log(`increasing parse depth for ${expressions.size} expressions`);
  var returnExpressions = new Set();
  var expressionComponents;
  for (let expression of expressions) {
    console.log(`Increasing parse depth of ${expression}`);
    if (isCompleteExpression(expression)) {
      console.log(`(${expression}) is a complete expression`);
      returnExpressions.add(expression);
      continue
    }

    // Every expression is in the form "[nonterminal]'[stringofterminals]'[nonterminal]'[etc]"
    // So items 0, 2, 4, etc are nonterminals; 1, 3, 5, etc are terminal strings
    expressionComponents = expression.split("'");

    // Find every alternative
    let alternatives = {};
    for (let i=0; i<expressionComponents.length; i+=2) {
      if (expressionComponents[i] == '') {
        alternatives[i] = '';
      } else {
        alternatives[i] = productions[expressionComponents[i]];
      }
    }

    // Find every combination of alternatives
    // Adapted from code by Wensheng Wang
    // https://code.activestate.com/recipes/496807-list-of-all-combination-from-multiple-lists/
    let combinations = [[]];
    for (let key of Object.keys(alternatives)) {
      let newCombinations = [];
      for (let alternative of alternatives[key]) {
        for (let subcombo of combinations) {
          newCombinations.push(subcombo.concat([alternative]));
        }
      }
      combinations = newCombinations;
    }
    console.log(`combinations found: ${combinations}`)

    // Apply every combination of alternatives
    for (let combination of combinations) {
      let newExpression = '';
      for (let componentNum=0; componentNum<expressionComponents.length; componentNum++) {
        if (componentNum % 2 == 0) {
          let newComponent = combination[componentNum / 2];
          if (typeof(newComponent) != 'object') {
            if (typeof(newComponent) == 'number') {
              newExpression += `'${newComponent}'`
            } else {
              newExpression += newComponent;
            }
          } else {
            for (let component of newComponent) {
              if (typeof(component) == 'number') {
                newExpression += `'${component}'`
              } else {
                newExpression += component;
              }
            }
          }
        } else {
          newExpression += `'${expressionComponents[componentNum]}'`;
        }
      }
      // If two inverted commas are now next to eachother, then the two terminal strings can be merged
      console.log(`Adding new expression ${newExpression}`);
      returnExpressions.add(newExpression.replace(/\'\'/g, ''))
    }
  }
  return returnExpressions;
}

/**
* Returns a set of all expressions in expressionSet that have no remaining nonterminals
* 
* Syntax based on code in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
*/
function allCompleteExpressions(expressionSet) {
  return new Set([...expressionSet].filter(expression => isCompleteExpression(expression)));
}

/**
* Returns true if the given string is a string of only terminals
*
* Every expression is in the form "[nonterminal]'[stringofterminals]'[nonterminal]'[etc]"
* So a string that meets this criteria begins and ends with an inverted comma (')
* with no inverted commas in between
*/
function isCompleteExpression(expression) {
  let split = expression.split("'")
  return (split.length == 3 && split[0] == '' && split[2] == '' && split[1] != '');
}

/**
* Returns a random expression generated from the given grammar productions.
*
* If the maximum depth of recursion (`maxDepth`) is reached,
* it will try again up to 100 times.
*
* @param {String} startChar initial non-terminal
* @param {Dict} productions all productions
* @param {Number} maxDepth maximum depth of recursion
*/
function randomExpression(startChar, productions, maxDepth) {
  if (!expressionsAreParsed_) {
    parseAllExpressions();
  }
  let expressions = Array.from(expressionsUpToDepth_[maxDepth.toString()]);
  return expressions[getRandomInt(expressions.length)];
}

/******************************************************************************/
// FUNCTIONS FOR THE USER-FACING PRODUCTIONS SETTER //
/******************************************************************************/

/**
* Sets the link to the base url of the interactive
*/
function resetLink() {
  var instruction = gettext("This link will open the default version of this interactive:");
  var link = window.location.href.split('?', 1)[0].replace(/^\/+|\/+$/g, '');
  $("#cfg-grammar-link").html(`${instruction}<br><a target="_blank" href=${link}>${link}</a>`);
}

/**
* Sets the link based on the productions submitted
*/
function getLink() {
  var instruction = gettext("This link will open the interactive with your set productions:");
  var productions = $("#cfg-grammar-input").val().trim();
  if (productions.length <= 0) {
    $("#cfg-grammar-link").html("");
    return;
  }
  var productionsParameter = percentEncode(productions.replace(/\n/g, ' '));
  var otherParameters = "";
  if ($("#generator-checkbox").prop('checked')){
    // 5 chosen arbitrarily
    otherParameters += "";
  } else {
    otherParameters += "&hide-generator=true";
  }
  if ($("#examples-checkbox").prop('checked')){
    var examples = $("#cfg-example-input").val().trim();
    if (examples.length > 0) {
      otherParameters += '&examples=' + percentEncode(examples.replace(/\n/g, '|'));
    }
  }
  // When the user switches between generator types a # appears at the end of the url
  // This needs to be removed for the new link, or not added in the first place:
  var basePath = window.location.href.split('?', 1)[0].replace(/\#+$/g, '');
  var fullUrl = basePath + "?productions=" + productionsParameter + otherParameters;
  $("#cfg-grammar-link").html(`${instruction}<br><a target="_blank" href=${fullUrl}>${fullUrl}</a>`);
}

function toggleExamplesWindow() {
  if ($("#examples-checkbox").prop('checked')){
    $("#cfg-example-input-parent").removeClass('d-none');
  } else {
    $("#cfg-example-input-parent").addClass('d-none');
    $("#cfg-example-input").val('')
  }
}

/**
* Returns the given string percent-encoded
*/
function percentEncode(string) {
  return encodeURIComponent(string);
}

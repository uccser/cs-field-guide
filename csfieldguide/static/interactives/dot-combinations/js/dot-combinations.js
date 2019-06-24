const MAX_DOTS = 6;
const MIN_DOTS = 2;

var patternsFound = [];

$(document).ready(function () {
  $('#dot-0').on('click', function () {toggleColour(0)});
  $('#dot-1').on('click', function () {toggleColour(1)});
  $('#dot-2').on('click', function () {toggleColour(2)});
  $('#dot-3').on('click', function () {toggleColour(3)});
  $('#dot-4').on('click', function () {toggleColour(4)});
  $('#dot-5').on('click', function () {toggleColour(5)});
  $('#number-of-dots').on('change', function () {updateNumberOfDots()});

  $('#number-of-dots').val(3);
  updateNumberOfDots()
});

/**
 * Toggles dot-x between black and white, where x is in [0, MAX_DOTS - 1].
 * Then calls updatePatternsFound();
 */
function toggleColour(x) {
  $('#dot-' + x).toggleClass('white');
  updatePatternsFound();
}

/**
 * Updates the number of dots visible.
 * Sets all visible dots to white and resets the patterns found
 */
function updateNumberOfDots() {
  var number = $('#number-of-dots').val();
  for (var i=0; i < number; i++) {
    $('#dot-' + i).removeClass('d-none');
    $('#dot-' + i).addClass('white');
  }
  for (i=number; i < MAX_DOTS; i++) {
    $('#dot-' + i).addClass('d-none');
  }

  $('#num-dots').text(number);
  resetPatternsFound();
}

/**
 * Resets the patterns found to be none, then calls updatePatternsFound()
 */
function resetPatternsFound() {
  patternsFound = [];
  updatePatternsFound();
}

/**
 * If the current pattern is not in the list of already found patterns,
 * adds it and calls displayPatternsFound().
 * Also shows or hides the congratulations message depending on if all 2^x patterns have been found
 */
function updatePatternsFound() {
  var i = 0;
  $nextDot = $('#dot-' + i);
  currentPattern = '';
  while (!$nextDot.hasClass('d-none') && i < MAX_DOTS) {
    currentPattern += ($nextDot.hasClass('white')? 'T':'F');
    i++;
    $nextDot = $('#dot-' + i);
  }

  if (patternsFound.indexOf(currentPattern) < 0) {
    patternsFound.push(currentPattern);
    displayPatternsFound();
  }

  if (patternsFound.length >= 2 ** $('#number-of-dots').val()) {
    $('#dot-combinations-complete').removeClass('d-none');
  } else {
    $('#dot-combinations-complete').addClass('d-none');
  }

  var dotCombosFound = ngettext('You have found 1 combination.', 'You have found %(combos)s combinations.', patternsFound.length);
  $('#dot-combinations-count').html(interpolate(dotCombosFound, {"combos": patternsFound.length}, true));
}

/**
 * Builds a formatted html string of the currently found patterns, and displays it appropriately
 */
function displayPatternsFound() {
  var displayHtml = '';
  $('#found-combinations').html('');

  for (var i=0; i < patternsFound.length; i++) {
    displayHtml += createDotPattern(patternsFound[i]);
  }
  $('#found-combinations').html(displayHtml);
}

/**
 * Returns a formatted HTML section of divs to represent the given pattern as a sequence of white and black dots
 */
function createDotPattern(pattern) {
  var returnHtml = '<div class="col dot-solution mx-1 my-3">\n';
  for (var i=0; i < pattern.length; i++) {
    returnHtml  += '  <div class="div-circle little ' + ((pattern.charAt(i) == 'T')? 'white':'') + '"></div>\n'
  }
  returnHtml    += '</div>\n';
  return returnHtml;
}

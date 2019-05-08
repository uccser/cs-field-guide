/**
 * JS for setting up the SVG arrows
 * loosely based on:
 * https://stackoverflow.com/questions/6278152/drawing-a-connecting-line-between-two-elements
 * and:
 * https://stackoverflow.com/questions/20037122/draw-an-arrow-between-two-divs
 */

var analysisDiv;
var designDiv;
var implementationDiv;
var testingDiv;
var analysisToDesignArrow;
var designToImplementationArrow;
var implementationToTestingArrow;
var designToAnalysisArrow;
var implementationToDesignArrow;
var testingToImplementationArrow;

$(document).ready(function() {
  analysisDiv = $('#analysis');
  designDiv = $('#design');
  implementationDiv = $('#implementation');
  testingDiv = $('#testing');
  analysisToDesignArrow = $('#analysis-design');
  designToImplementationArrow = $('#design-implementation');
  implementationToTestingArrow = $('#implementation-testing');
  designToAnalysisArrow = $('#design-analysis');
  implementationToDesignArrow = $('#implementation-design');
  testingToImplementationArrow = $('#testing-implementation');

  window.onresize = function() {
    createArrow(analysisToDesignArrow, analysisDiv, designDiv, false);
    createArrow(designToImplementationArrow, designDiv, implementationDiv, false);
    createArrow(implementationToTestingArrow, implementationDiv, testingDiv, false);
  
    createArrow(designToAnalysisArrow, designDiv, analysisDiv, true);
    createArrow(implementationToDesignArrow, implementationDiv, designDiv, true);
    createArrow(testingToImplementationArrow, testingDiv, implementationDiv, true);
  }
});

function createArrow(arrow, from, to, isUp) {
  var fromLocation = from.offset();
  var toLocation = to.offset();

  var line;
  if (!isUp) {
    line = "M" + (fromLocation.left + from.width()) + "," + (fromLocation.top + from.height() / 2);
    line += " L" + (toLocation.left + to.width() / 2) + "," + (fromLocation.top + from.height() / 2);
    line += " L" + (toLocation.left + to.width() / 2) + "," + (toLocation.top - 12); // -12 to subtract the size of the arrow
  } else {
    line = "M" + (fromLocation.left) + "," + (fromLocation.top + from.height() / 2);
    line += " L" + (toLocation.left + to.width() / 2) + "," + (fromLocation.top + from.height() / 2);
    line += " L" + (toLocation.left + to.width() / 2) + "," + (toLocation.top + to.height() + 12); // +12 to subtract the size of the arrow
  }
  arrow.attr('d', line);
}

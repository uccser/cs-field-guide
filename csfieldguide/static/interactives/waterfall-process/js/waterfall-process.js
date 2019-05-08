/**
 * JS for setting up the SVG arrows
 * loosely based on:
 * https://stackoverflow.com/questions/6278152/drawing-a-connecting-line-between-two-elements
 */

$(document).ready(function() {
  var analysisDiv = $('#analysis');
  var designDiv = $('#design');
  var analysisToDesignArrow = $('#analysis-design');

  createArrow(analysisToDesignArrow, analysisDiv, designDiv, false);
});

function createArrow(arrow, from, to, reversed) {
  var fromLocation = from.position();
  var toLocation = to.position();

  if (!reversed) {
    arrow.attr('x1', fromLocation.left)
         .attr('y1', fromLocation.top)
         .attr('x2', toLocation.left)
         .attr('y2', toLocation.top);
  }
}
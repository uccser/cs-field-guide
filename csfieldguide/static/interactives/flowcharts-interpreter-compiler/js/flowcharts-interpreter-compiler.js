/**
 * JS for setting up the SVG arrows
 * loosely based on:
 * https://stackoverflow.com/questions/6278152/drawing-a-connecting-line-between-two-elements
 * and:
 * https://stackoverflow.com/questions/20037122/draw-an-arrow-between-two-divs
 */

$(document).ready(function() {
  var compiler = {
    programDiv: $('#compiler-program'),
    compilerDiv: $('#compiler-compiler'),
    interpreterDiv: $('#compiler-interpreter'),
    resultDiv: $('#compiler-result'),
    dataDiv: $('#compiler-data')
  }
  
  var interpreter = {
    programDiv: $('#interpreter-program'),
    interpreterDiv: $('#interpreter-interpreter'),
    resultDiv: $('#interpreter-result'),
    dataDiv: $('#interpreter-data')
  }

  var compilerArrows = {
    programToCompiler: $('#compiler-program-compiler'),
    compilerToInterpreter: $('#compiler-compiler-interpreter'),
    interpreterToResult: $('#compiler-interpreter-result'),
    dataToInterpreter: $('#compiler-data-interpreter')
  }

  var interpreterArrows = {
    programToInterpreter: $('#interpreter-program-interpreter'),
    interpreterToResult: $('#interpreter-interpreter-result'),
    dataToInterpreter: $('#interpreter-data-interpreter')
  }

  window.onresize = function() {
    createArrow(compilerArrows.programToCompiler, compiler.programDiv, compiler.compilerDiv);
    createArrow(compilerArrows.compilerToInterpreter, compiler.compilerDiv, compiler.interpreterDiv);
    createArrow(compilerArrows.interpreterToResult, compiler.interpreterDiv, compiler.resultDiv);
    createCurvedArrow(compilerArrows.dataToInterpreter, compiler.dataDiv, compiler.interpreterDiv);
  
    createArrow(interpreterArrows.programToInterpreter, interpreter.programDiv, interpreter.interpreterDiv);
    createArrow(interpreterArrows.interpreterToResult, interpreter.interpreterDiv, interpreter.resultDiv);
    createCurvedArrow(interpreterArrows.dataToInterpreter, interpreter.dataDiv, interpreter.interpreterDiv);
  }
});

/**
 * Sets the svg coordinates for the given arrow to path from the 'from' div to the 'to' one.
 * Arrow paths from the bottom center of 'from', down to the top center of 'to'.
 * 
 * Assumes 'from' is directly above 'to'
 */
function createArrow(arrow, from, to) {
  var fromLocation = from.offset();
  var toLocation = to.offset();

  var line;
  line = "M" + (fromLocation.left + from.width() / 2 + 10) + "," + (fromLocation.top + from.height() + 8); //+10 to align it properly
  line += " L" + (toLocation.left + to.width() / 2 + 10) + "," + (toLocation.top - 12); // -12 to subtract the size of the arrow
  arrow.attr('d', line);
}

/**
 * Sets the svg coordinates for the given arrow to path from the 'from' div to the 'to' one.
 * Arrow paths in a quarter circle from the bottom center of 'from', to the middle left of 'to'
 * 
 * Assumes 'from' is above and to the right of 'to'
 */
function createCurvedArrow(arrow, from, to) {
  var fromLocation = from.offset();
  var toLocation = to.offset();

  var start = [(fromLocation.left + from.width() / 2 + 12), (fromLocation.top + from.height() + 8)]; //Offsets are to position it properly
  var end = [(toLocation.left + to.width() + 32), (toLocation.top + to.height() / 2 + 5)];

  var curve = [0,0];
  var line = "M";
  curve = [end[0] - start[0], end[1] - start[1]];
  line += start[0] + "," + start[1] + " A" + curve[0] + "," + curve[1];
  line += " 0 0,1 "; // Rotation and boolean flags, constant
  line += end[0] + "," + end[1];

  arrow.attr('d', line);
}

const dragula = require('./../../../../node_modules/dragula/dragula');
const mathjs = require('mathjs');
const sprintf = require('sprintf-js').sprintf;
const vsprintf = require('sprintf-js').vsprintf;

const ROW_TEMPLATE = "%s & %s & %s";
const MATRIX_TEMPLATE = "\\begin{bmatrix} %s \\\\ %s \\\\ %s \\end{bmatrix}";
const EXPANDED_ROW_TEMPLATE = "%sx + %sy + %sz";


// might need to add text to say angles should be in radians
m1 = mathjs.matrix([
  [mathjs.cos(toRadians(45)),0,mathjs.sin(toRadians(45))],
  [0,1,0],
  [-mathjs.sin(toRadians(45)),0,mathjs.cos(toRadians(45))]
]);
m2 = mathjs.matrix([[10,0,0],[0,10,0],[0,0,10]]);

v1 = mathjs.matrix([[10], [0], [0]]);

var matrices = [m1, m2];
var vectors = [v1];

var currentMatricesOrder = [m1, m2];
var currentVectorsOrder = [v1];


// only show equations once they are rendered
var mjaxURL  = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML,Safe.js';
// load mathjax script
$.getScript(mjaxURL, function() {
    // mathjax successfully loaded, let it render
    showOutput();
});


$(document).ready(function() {
  $('#add-matrix-from-input').click(addMatrix);
  $('#add-vector-from-input').click(addVector);
  $('.dismiss-eqtn').click(dismissEquation);
  $('.matrix-row input').on('keyup bind cut copy paste', validateInput);
  $('#matrix-modal').on('hidden.bs.modal', resetModalMatrices);
  $('#vector-modal').on('hidden.bs.modal', resetModalMatrices);
});


/**
 * Add a new matrix to the calculation
 */
function addMatrix() {
  // inputs get evaluated as math
  matrixArrayMath = getMatrix(true);
  // inputs remain as strings
  matrixArrayString = getMatrix(false);
  matrix = mathjs.matrix(matrixArrayMath);
  matrices.push(matrix);
  currentMatricesOrder.push(matrix);
  matrixString = formatMatrix(matrixArrayString, ROW_TEMPLATE);
  appendInput('matrix', matrixString);
  resetModalMatrices();
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'matrix-' + matrices.length]);
  showOutput();
  showEquations();
}


/**
 * Add a new vector to the calculation
 */
function addVector() {
  vectorArrayMath = [
    [mathjs.eval($('#vector-row-0').val())],
    [mathjs.eval($('#vector-row-1').val())],
    [mathjs.eval($('#vector-row-2').val())]
  ];
  vectorArrayString = [
    [$('#vector-row-0').val()],
    [$('#vector-row-1').val()],
    [$('#vector-row-2').val()]
  ];
  vector = mathjs.matrix(vectorArrayMath);
  vectors.push(vector);
  currentVectorsOrder.push(vector);
  vectorString = sprintf(
    MATRIX_TEMPLATE,
    vectorArrayString[0],
    vectorArrayString[1],
    vectorArrayString[2]
  );
  appendInput('vector', vectorString);
  showOutput();
  resetModalMatrices();
}


/**
 * Appends either a new matrix or vector to the DOM
 */
function appendInput(type, inputHtml) {
  var $newContainerDiv = $("<div>").addClass('draggable content border rounded m-1 center-block');
  var $newInputDiv = $("<div>").addClass('invisible ' + type);
  var $closeButton = $('<button type="button" class="close dismiss-eqtn" aria-label="Close">');
  $closeButton.append($('<span aria-hidden="true">&times;</span>'));
  $newContainerDiv.append($closeButton);
  $newInputDiv.html(inputHtml);
  $newContainerDiv.append($newInputDiv);
  $('#' + type + '-input-container').append($newContainerDiv);
  // add event handler for close button
  $closeButton.click(dismissEquation);
  if (type == 'vector') {
    $closeButton.attr('id', 'close-vector-' + vectors.length);
    $newInputDiv.attr('id', 'vector-' + vectors.length);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'vector-' + vectors.length]);
  } else {
    $closeButton.attr('id', 'close-matrix-' + matrices.length);
    $newInputDiv.attr('id', 'matrix-' + matrices.length);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'matrix-' + matrices.length]);
  }
}


/**
 * Gets matrix entries from modal and returns a matrix in array form.
 * If evalAsMath is true, each entry will be evaluated as a mathematical expression.
 * If evalAsMath is false, each entry will remain as a string.
 * This is implemented so we can choose whether trig functions appear to the user as 'cos(45)`
 * or as their evaluated value, e.g '0.71'.
 */
function getMatrix(evalAsMath) {
  if (evalAsMath){
    row0 = [
      mathjs.eval($('#matrix-row-0-col-0').val()),
      mathjs.eval($('#matrix-row-0-col-1').val()),
      mathjs.eval($('#matrix-row-0-col-2').val()),
    ];

    row1 = [
      mathjs.eval($('#matrix-row-1-col-0').val()),
      mathjs.eval($('#matrix-row-1-col-1').val()),
      mathjs.eval($('#matrix-row-1-col-2').val()),
    ];

    row2 = [
      mathjs.eval($('#matrix-row-2-col-0').val()),
      mathjs.eval($('#matrix-row-2-col-1').val()),
      mathjs.eval($('#matrix-row-2-col-2').val()),
    ];
  } else {
    row0 = [
      $('#matrix-row-0-col-0').val(),
      $('#matrix-row-0-col-1').val(),
      $('#matrix-row-0-col-2').val(),
    ];

    row1 = [
      $('#matrix-row-1-col-0').val(),
      $('#matrix-row-1-col-1').val(),
      $('#matrix-row-1-col-2').val(),
    ];

    row2 = [
      $('#matrix-row-2-col-0').val(),
      $('#matrix-row-2-col-1').val(),
      $('#matrix-row-2-col-2').val(),
    ];
  }

  return [row0, row1, row2];
}


/**
 * Puts matrix in LaTeX format to be correctly rendered by MathJax
 */
function formatMatrix(matrix, rowTemplate) {
  row0 = vsprintf(rowTemplate, matrix[0]);
  row1 = vsprintf(rowTemplate, matrix[1]);
  row2 = vsprintf(rowTemplate, matrix[2]);

  return sprintf(MATRIX_TEMPLATE, row0, row1, row2);
}

/** Remove zeros if they are insignificant.
 *  i.e only remove zeros if they are not the only number in the row
 */
function simplifyResult(matrix, vector) {
  var result = [];
  for (i=0; i < 3; i++) {
    row = "";
    // below variables to determine whether or not to prefix with '+'
    var hasX = false;
    var hasY = false;
    var hasZ = false;
    if (!(matrix[i][0] == 0)) {
      row += matrix[i][0] + 'x';
      hasX = true;
    }
    if (!(matrix[i][1] == 0)) {
      if (hasX && matrix[i][1] > 0) {
        row += ' + '
      }
      row += matrix[i][1] + 'y';
      hasY = true;
    }
    if (!(matrix[i][2] == 0)) {
      if (hasX || hasY) {
        row += ' + '
      }
      row += matrix[i][2] + 'z';
      hasZ = true;
    }
    // if the value isn't zero and either an x, y or z value exists
    if (!(vector[i] == 0) && (hasX || hasY || hasZ)) {
      if (vector[i] > 0) {
        row += ' + ';
      }
      row += vector[i];
    } else if (!(hasX || hasY || hasZ)) {
      row += vector[i];
    }
    if (row == "") {
      row = "0";
    }
    result[i] = row;
  }
  return sprintf(MATRIX_TEMPLATE, result[0], result[1], result[2]);
}


/* Set the matrices in modal to the default values */
function resetModalMatrices() {
  // reset to default values of modal matrices
  $('#matrix-row-0-col-0').val(1);
  $('#matrix-row-0-col-1').val(0);
  $('#matrix-row-0-col-2').val(0);

  $('#matrix-row-1-col-0').val(0);
  $('#matrix-row-1-col-1').val(1);
  $('#matrix-row-1-col-2').val(0);

  $('#matrix-row-2-col-0').val(0);
  $('#matrix-row-2-col-1').val(0);
  $('#matrix-row-2-col-2').val(1);

  $('#vector-row-0').val(1);
  $('#vector-row-1').val(0);
  $('#vector-row-2').val(0);

  $('.matrix-row input').removeClass('input-error');
  $('.add-from-input').prop('disabled', false);
}


/**
 * Calculates result of matrix multiplication and vector addition.
 * Returns array containing a matrix and a vector.
 */
function calculateOutput() {
  var matrixResult = mathjs.zeros(3, 3);
  var vectorResult = mathjs.zeros(3, 1);

  if (currentMatricesOrder.length == 1) {
    matrixResult = currentMatricesOrder[0];
  } else if (currentMatricesOrder.length > 1) {
    // 2 or more matrices
    matricesCopy = currentMatricesOrder.slice(); // copy list for multiplying in place
    matrixResult = multiplyMatrices(matricesCopy);
  }

  if (currentVectorsOrder.length == 1) {
    vectorResult = currentVectorsOrder[0];
  } else if (currentVectorsOrder.length > 1) {
    // 2 or more vectors
    vectorsCopy = currentVectorsOrder.slice(); // copy list for adding in place
    vectorResult = addVectors(vectorsCopy);
  }

  return [matrixResult, vectorResult];
}


/**
 * Multiply matrices together and return result
 */
function multiplyMatrices(m) {
  var multiply = true;
  while (multiply) {
    if (m.length == 2) {
      multiply = false;
      return mathjs.multiply(m[0], m[1]);
    } else {
      result = mathjs.multiply(m[0], m[1]);
      // remove the first matrix in array
      m.shift();
      // replace the new first element in array with result
      m[0] = result;
    }
  }
}


/**
 * Add vectors together and return result
 */
function addVectors(v) {
  var add = true;
  while (add) {
    if (v.length == 2) {
      add = false;
      return mathjs.add(v[0], v[1]);
    } else {
      result = mathjs.add(v[0], v[1]);
      v.shift();
      v[0] = result;
    }
  }
}


/**
 * Displays the output of calculations
 */
function showOutput() {
  // If output container is showing, hide it while mathjax renders.
  if (!$('#output-container').hasClass('invisible')) {
    $('#output-container').addClass('invisible');
  }
  var result = calculateOutput();
  var matrix = result[0];
  var vector = result[1];
  var matrixRows = matrixToArray(matrix);
  var vectorRows = matrixToArray(vector);

  matrixString = formatMatrix(matrixRows, ROW_TEMPLATE);
  vectorString = sprintf(MATRIX_TEMPLATE, vectorRows[0], vectorRows[1], vectorRows[2]);
  expandedMatrixString = formatMatrix(matrixRows, EXPANDED_ROW_TEMPLATE);
  simplifiedMatrixString = simplifyResult(matrixRows, vectorRows);

  $('#matrix-output').html(matrixString);
  $('#vector-output').html(vectorString);
  $('#expanded-matrix').html(expandedMatrixString);
  $('#vector-copy').html(vectorString);
  $('#simplified-matrix').html(simplifiedMatrixString);
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, "output-container"]);
  showEquations();
}


/**
 * Defines drag and drop events
 */
$(function() {
  var matrix_list = $('.containers').toArray();
  var drake = dragula(matrix_list, {
    accepts: function(el, target, source, sibling) {
      // Don't allow dragging of vectors to matrices container and vice versa
      return target.id === source.id;
    }
  });
  drake.on('drag', function(el, source) {
    scrollable = false;
  });
  drake.on('drop', (matrix, target_container, source_container, sibling) => {
    var matrixId = matrix.children[0].id;
    var matrixInfo = getEqtnInfoFromId(matrixId);
    var matrixIndex = matrixInfo[1] - 1;

    var type = matrixInfo[0]; // matrix and sibling will be of same type
    if (sibling == null) {
      // matrix has been inserted last
      if (type == 'matrix') {
        var siblingIndex = matrices.length - 1;
      } else {
        var siblingIndex = vectors.length - 1;
      }
    } else {
      var siblingId = sibling.children[0].id;
      var siblingInfo = getEqtnInfoFromId(siblingId);
      var siblingIndex = siblingInfo[1] - 1;  
    }

    if (type == 'matrix') {
      var tmp = currentMatricesOrder[matrixIndex];
      currentMatricesOrder[matrixIndex] = currentMatricesOrder[siblingIndex];
      currentMatricesOrder[siblingIndex] = tmp;
    } else {
      // vector
      var tmp = currentVectorsOrder[matrixIndex];
      currentVectorsOrder[matrixIndex] = currentVectorsOrder[siblingIndex];
      currentVectorsOrder[siblingIndex] = tmp;
    }
    showOutput();
    scrollable = true;
  });
});


/**
 * Converts mathjs matrix to an Array
 */
function matrixToArray(matrix) {
  var matrixArray = [[], [], []];

  matrix.forEach(function (value, index, m) {
    i = index[0];
    j = index[1];
    // round to 2dp
    matrixArray[i][j] = mathjs.round(value, 2);
  });

  return matrixArray;
}


/**
 * Only show equations once they are rendered
 */
function showEquations() {
  MathJax.Hub.Queue(
    function () {
      $('.invisible').removeClass('invisible');
      // stop buttons jumping around on load
      $('#add-matrix-btn').removeClass('d-none');
      $('#add-vector-btn').removeClass('d-none');
  });
}


/**
 * Converts degrees to radians
 */
function toRadians(angle) {
  return angle * (Math.PI / 180);
}


/**
 * Gets the type of equation (matrix or vector) and the equation number.
 * The equation number represents the order it was added in.
 * E.g the third matrix added will be number 3, the second vector added will be number 2 etc.
 */
function getEqtnInfoFromId(id) {
  // id is of form close-matrix-1 or close-vector-1.
  // split by '-' and get the type (matrix or vector) and number.
  idSplit = id.split('-');
  eqtnType = idSplit[1]; // get type
  eqtnNum = Number(idSplit[2]); // get the number
  return [eqtnType, eqtnNum];
}


/**
 * Removes equation and updates output to match
 */
function dismissEquation() {
  button = $(this)[0];
  eqtnInfo = getEqtnInfoFromId(button.id);

  eqtnType = eqtnInfo[0]; // type
  eqtnNum = eqtnInfo[1]; // number of button that was clicked

  // eqtnNum identifies the equation to remove, minus one to convert to an index so we can remove it from the array
  toRemoveIndex = eqtnNum - 1;
  // remove from appropriate array
  if (eqtnType == 'matrix') {
    // remove it from order array
    var eqtn = matrices[toRemoveIndex];
    var orderIndex = currentMatricesOrder.indexOf(eqtn); // find index
    currentMatricesOrder.splice(orderIndex, 1);
    // remove from original array
    matrices.splice(toRemoveIndex, 1);

  } else {
    // remove it from order array
    var eqtn = vectors[toRemoveIndex];
    var orderIndex = currentVectorsOrder.indexOf(eqtn); // find index
    currentVectorsOrder.splice(orderIndex, 1);
    // remove from original array
    vectors.splice(toRemoveIndex, 1);
  }
  // remove DOM element
  $(this)[0].parentNode.remove();
  // re-calculate and show output
  showOutput();
}

/** Checks user input as they are typing.
 *  Highlights input box red if the input is invalid and disables the add button.
 */
function validateInput() {
  var input = $(this).val();
  var success = false;
  try {
    inputEvaluated = mathjs.eval(input);
    mathjs.number(inputEvaluated);
    success = true;
  }
  catch {
    $(this).addClass('input-error');
    $('.add-from-input').prop('disabled', true);
  }
  if (success && $(this).hasClass('input-error')) {
    $(this).removeClass('input-error');
  }
  if ($('.input-error').length == 0) {
    $('.add-from-input').prop('disabled', false);
  }
}

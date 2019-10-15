const dragula = require('./../../../../node_modules/dragula/dragula');
const mathjs = require('mathjs');
const sprintf = require('sprintf-js').sprintf;
const vsprintf = require('sprintf-js').vsprintf;

const ROW_TEMPLATE = "%s & %s & %s";
const MATRIX_TEMPLATE = "\\begin{bmatrix} %s \\\\ %s \\\\ %s \\end{bmatrix}";
const PENCIL_SVG = $("#pencil-svg-helper svg")

var TXT_COPY = gettext("Copy to clipboard");
var TXT_COPIED_PRIVATE = gettext("Equation copied");
var TXT_COPIED_FAIL = gettext("Oops, unable to copy. Please copy manually");

/**
 * Below is adapted from https://mathjs.org/examples/browser/angle_configuration.html.html
 * This is used to configure mathjs to accept degrees as input for trig functions.
 */

let replacements = {};

// the trigonometric functions that we are configuring to handle inputs of degrees instead of radians
const fns1 = [
  'sin', 'cos', 'tan', 'sec', 'cot', 'csc',
  'asin', 'acos', 'atan', 'atan2', 'acot', 'acsc', 'asec',
  'sinh', 'cosh', 'tanh', 'sech', 'coth', 'csch',
  'asinh', 'acosh', 'atanh', 'acoth', 'acsch', 'asech',
];

fns1.forEach(function(name) {
  const fn = mathjs[name]; // the original function

  const fnNumber = function (x) {
    // convert from degrees to radians
    return fn(x * (Math.PI / 180));
  }

  // create a typed-function which check the input types
  replacements[name] = mathjs.typed(name, {
    'number': fnNumber,
    'Array | Matrix': function (x) {
      return mathjs.map(x, fnNumber);
    }
  });
});

// import all replacements into math.js, override existing trigonometric functions
mathjs.import(replacements, {override: true});
/////////////////////////////// End of adapted file ///////////////////////////////

// matrices and vector that will appear onload
m1 = mathjs.matrix([
  [mathjs.cos(45),0,mathjs.sin(45)],
  [0,1,0],
  [-mathjs.sin(45),0,mathjs.cos(45)]
]);
m2 = mathjs.matrix([[10,0,0],[0,10,0],[0,0,10]]);
v1 = mathjs.matrix([[10], [0], [0]]);

// Arrays that will keep track of the order the matrices and vectors are in
var currentMatricesOrder = [m1, m2];
var currentVectorsOrder = [v1];

m1String = [
  ['cos(45)', '0', 'sin(45)'],
  ['0', '1', '0'],
  ['-sin(45)', '0', 'cos(45)']
];
m2String = [
  ['10', '0', '0'],
  ['0', '10', '0'],
  ['0', '0', '10']
]
v1String = [
  ['10'],
  ['0'],
  ['0']
]
// Arrays that will hold the string version of matrices and vectors.
// Used for populating modal when editing a matrix or vector.
// Needed because we don't want to display evaluated trig functions.
// E.g we want to show cos(45) and not 0.71
var matricesStringFormat = [m1String, m2String];
var vectorsStringFormat = [v1String];

// Store the result equation. Used for copying to clipboard.
var resultEqtn;

// only show equations once they are rendered
// URL for mathjax script loaded from CDN
var mjaxURL  = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML,Safe.js';
// load mathjax script
$.getScript(mjaxURL, function() {
    // mathjax successfully loaded, let it render
    showOutput();
});


$(document).ready(function() {
  $('#add-matrix-from-input').click(addMatrix);
  $('#add-vector-from-input').click(addVector);
  $('.dismiss-eqtn').on("click", dismissEquation);
  $('.edit-eqtn').on("click", populateModalForEditing);
  $('.matrix-row input').on('keyup bind cut copy paste', validateInput);
  $('#matrix-modal').on('hidden.bs.modal', resetModalMatrices);
  $('#vector-modal').on('hidden.bs.modal', resetModalMatrices);

  $('#copy-eqtn').click(function() {
    $('#dummy-textarea').select();
    try {
      var successful = document.execCommand('copy');
      if (successful) {
        $('#copy-eqtn').trigger('copied', TXT_COPIED_PRIVATE);
      } else {
        $('#copy-eqtn').trigger('copied', TXT_COPIED_FAIL);
      }
    } catch (err) {
      $('#copy-eqtn').trigger('copied', TXT_COPIED_FAIL);
    }
  });

  $('[data-toggle="tooltip"]').on('copied', function(event, message) {
    $(this).attr('title', message)
      .tooltip('_fixTitle')
      .tooltip('show')
      .attr('title', TXT_COPY)
      .tooltip('_fixTitle');
  });
});


/**
 * Add a new matrix to the calculation
 */
function addMatrix() {
  // inputs get evaluated as math
  matrixArrayMath = getMatrix(true);
  // inputs remain as strings for display
  matrixArrayString = getMatrix(false);
  matricesStringFormat.push(matrixArrayString);
  matrix = mathjs.matrix(matrixArrayMath); // convert to mathjs matrix so we can do calculations
  currentMatricesOrder.push(matrix);
  matrixString = formatMatrix(matrixArrayString, ROW_TEMPLATE);
  appendInput('matrix', matrixString);
  showOutput();
}


/**
 * Add a new vector to the calculation
 */
function addVector() {
  // inputs get evaluated as math
  vectorArrayMath = [
    [mathjs.eval($('#vector-row-0').val())],
    [mathjs.eval($('#vector-row-1').val())],
    [mathjs.eval($('#vector-row-2').val())]
  ];
  // inputs remain as strings for display
  vectorArrayString = [
    [$('#vector-row-0').val()],
    [$('#vector-row-1').val()],
    [$('#vector-row-2').val()]
  ];
  vectorsStringFormat.push(vectorArrayString);
  vector = mathjs.matrix(vectorArrayMath); // convert to mathjs matrix so we can do caluclations
  currentVectorsOrder.push(vector);
  vectorString = sprintf(
    MATRIX_TEMPLATE,
    vectorArrayString[0],
    vectorArrayString[1],
    vectorArrayString[2]
  );
  appendInput('vector', vectorString);
  showOutput();
}


/**
 * Appends either a new matrix or vector to the DOM
 */
function appendInput(type, inputHtml) {
  var $newContainerDiv = $("<div>").addClass('draggable content border rounded m-1 center-block');
  var $newInputDiv = $("<div>").addClass('invisible ' + type);
  var $closeButton = $('<button type="button" class="close dismiss-eqtn" aria-label="Close">');
  $closeButton.append($('<span aria-hidden="true">&times;</span>'));
  var $editButton = $('<button type="button" class="close edit-eqtn" aria-label="Edit">');
  $editButton.append(PENCIL_SVG.clone());
  $newContainerDiv.append($closeButton);
  $newContainerDiv.append($editButton);
  $newInputDiv.html(inputHtml);
  $newContainerDiv.append($newInputDiv);
  $('#' + type + '-input-container').append($newContainerDiv);
  // add event handlers for close and edit buttons
  $closeButton.on("click", dismissEquation);
  $editButton.on("click", populateModalForEditing);
  if (type == 'vector') {
    var vectorNum = currentVectorsOrder.length - 1;
    $closeButton.attr('id', 'close-vector-' + vectorNum);
    $editButton.attr('id', 'edit-vector-' + vectorNum);
    $editButton.attr('data-toggle', 'modal');
    $editButton.attr('data-target', '#vector-modal');
    $newInputDiv.attr('id', 'vector-' + vectorNum);
    $newInputDiv.attr('data-vector-order', currentVectorsOrder.length - 1);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'vector-' + vectorNum]); // typeset the new vector
  } else {
    var matrixNum = currentMatricesOrder.length - 1;
    $closeButton.attr('id', 'close-matrix-' + matrixNum);
    $editButton.attr('id', 'edit-matrix-' + matrixNum);
    $editButton.attr('data-toggle', 'modal');
    $editButton.attr('data-target', '#matrix-modal');
    $newInputDiv.attr('id', 'matrix-' + matrixNum);
    $newInputDiv.attr('data-matrix-order', currentMatricesOrder.length - 1);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'matrix-' + matrixNum]); // typeset the new matrix
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

  $('#vector-row-0').val(0);
  $('#vector-row-1').val(0);
  $('#vector-row-2').val(0);

  // remove red borders on inputs that had errors and enable add button
  $('.matrix-row input').removeClass('input-error');
  $('.add-from-input').prop('disabled', false);

  // make add button the default and hide edit button
  $("#add-matrix-from-input").removeClass("d-none");
  $("#update-matrix").addClass("d-none");
  $("#add-vector-from-input").removeClass("d-none");
  $("#update-vector").addClass("d-none");
  // change title back to add a matrix/vector
  $('#matrix-modal-title').html(gettext("Add a matrix"));
  $('#vector-modal-title').html(gettext("Add a vector"));
}


/**
 * Calculates result of matrix multiplication and vector addition.
 * Returns array containing result matrix and vector.
 */
function calculateOutput() {
  var matrixResult = mathjs.identity(3);
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
      // remove the first vector in array
      v.shift();
      // replace the new first element in array with result
      v[0] = result;
    }
  }
}


/**
 * Displays the output of calculations
 */
function showOutput() {
  // hide output container while mathjax renders.
  $('#output-container').addClass('invisible');
  var result = calculateOutput();
  var matrix = result[0];
  var vector = result[1];
  var matrixRows = matrixToArray(matrix);
  var vectorRows = matrixToArray(vector);

  // update global result variable
  resultEqtn = matrixRows.toString() + ',v,' + vectorRows.toString();
  $("#dummy-textarea").val(resultEqtn);

  matrixString = formatMatrix(matrixRows, ROW_TEMPLATE);
  vectorString = sprintf(MATRIX_TEMPLATE, vectorRows[0], vectorRows[1], vectorRows[2]);
  $('#matrix-output').html(matrixString);
  $('#vector-output').html(vectorString);

  MathJax.Hub.Queue(["Typeset", MathJax.Hub, "output-container"]); // typeset calculated result
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
  drake.on('drop', (eqtn, target_container, source_container, sibling) => {
    var eqtnDiv = $(eqtn.children[2]);
    if (sibling == null) {
      // eqtn has been inserted last
      if (eqtnDiv.hasClass('matrix')) {
        var siblingOrder = currentMatricesOrder.length - 1; // because it's last in order
        var siblingDiv = $("div").find("[data-matrix-order='" + siblingOrder + "']");
      } else {
        var siblingOrder = currentVectorsOrder.length - 1; // because it's last in order
        var siblingDiv = $("div").find("[data-vector-order='" + siblingOrder + "']");
      }
    } else {
      // Get the matrix/vector it is being swapped with
      var siblingDiv = $(sibling.children[2]);
      if (eqtnDiv.hasClass('matrix')) {
        var siblingOrder = siblingDiv.attr('data-matrix-order');
      } else {
        var siblingOrder = siblingDiv.attr('data-vector-order');
      }
    }
    // swap
    if (eqtnDiv.hasClass('matrix')) {
      var matrixOrder = eqtnDiv.attr('data-matrix-order');

      // swapping in the array that holds mathjs objects
      var tmp = currentMatricesOrder[matrixOrder];
      currentMatricesOrder[matrixOrder] = currentMatricesOrder[siblingOrder];
      currentMatricesOrder[siblingOrder] = tmp;
      // swapping in the array that holds string objects
      var tmp = matricesStringFormat[matrixOrder];
      matricesStringFormat[matrixOrder] = matricesStringFormat[siblingOrder];
      matricesStringFormat[siblingOrder] = tmp;
      // swap data-order attributes
      eqtnDiv.attr('data-matrix-order', siblingOrder);
      siblingDiv.attr('data-matrix-order', matrixOrder);
    } else {
      // vector
      var vectorOrder = eqtnDiv.attr('data-vector-order');

      // swapping in the array that holds mathjs objects
      var tmp = currentVectorsOrder[vectorOrder];
      currentVectorsOrder[vectorOrder] = currentVectorsOrder[siblingOrder];
      currentVectorsOrder[siblingOrder] = tmp;
      // swapping in the array that holds string objects
      var tmp = vectorsStringFormat[matrixOrder];
      vectorsStringFormat[matrixOrder] = vectorsStringFormat[siblingOrder];
      vectorsStringFormat[siblingOrder] = tmp;
      // swap data-order attributes
      eqtnDiv.attr('data-vector-order', siblingOrder);
      siblingDiv.attr('data-vector-order', vectorOrder);
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
      $('#copy-eqtn').removeClass('d-none');
  });
}


/**
 * Removes equation and updates output to match
 */
function dismissEquation() {
  eqtnToRemove = $(this).next().next(); // div of matrix/vector to remove
  if (eqtnToRemove.hasClass('matrix')) {
    orderIndex = eqtnToRemove.attr('data-matrix-order');
    // remove from order array
    currentMatricesOrder.splice(orderIndex, 1);
    // remove from string array
    matricesStringFormat.splice(orderIndex, 1);
    // remove DOM element
    eqtnToRemove.parent().remove();
    // update data-order attributes
    $('div[data-matrix-order]').each(function() {
      order = $(this).attr('data-matrix-order');
      if (order > orderIndex) {
        newOrder = order - 1;
        $(this).attr('data-matrix-order', newOrder);
      }
    });
  } else { //vector
    orderIndex = eqtnToRemove.attr('data-vector-order');
    // remove from order array
    currentVectorsOrder.splice(orderIndex, 1);
    // remove from string array
    vectorsStringFormat.splice(orderIndex, 1);
    // remove DOM element
    eqtnToRemove.parent().remove();
    // update data-order attributes
    $('div[data-vector-order]').each(function() {
      order = $(this).attr('data-vector-order');
      if (order > orderIndex) {
        newOrder = order - 1;
        $(this).attr('data-vector-order', newOrder);
      }
    });
  }
  // re-calculate and show output
  showOutput();
}


/**
 * Populates modal with values of matrix/vector that is to be edited
 */
function populateModalForEditing() {
  eqtnToEdit = $(this).next(); // div of matrix/vector to edit
  if (eqtnToEdit.hasClass('matrix')) {
    $('#matrix-modal-title').html(gettext("Update matrix"));
    // replace add button with edit button in modal
    $("#add-matrix-from-input").addClass("d-none");
    $("#update-matrix").removeClass("d-none");
    orderIndex = eqtnToEdit.attr('data-matrix-order');
    // get matrix in string form
    matrix = matricesStringFormat[orderIndex];
    // populate modal values
    $('#matrix-row-0-col-0').val(matrix[0][0]);
    $('#matrix-row-0-col-1').val(matrix[0][1]);
    $('#matrix-row-0-col-2').val(matrix[0][2]);
  
    $('#matrix-row-1-col-0').val(matrix[1][0]);
    $('#matrix-row-1-col-1').val(matrix[1][1]);
    $('#matrix-row-1-col-2').val(matrix[1][2]);
  
    $('#matrix-row-2-col-0').val(matrix[2][0]);
    $('#matrix-row-2-col-1').val(matrix[2][1]);
    $('#matrix-row-2-col-2').val(matrix[2][2]);

    // add event listener to edit button
    $('#update-matrix').click(function() {
      updateEquation(eqtnToEdit, orderIndex);
    });
  } else {
    $('#vector-modal-title').html(gettext("Update vector"));
    $("#add-vector-from-input").addClass("d-none");
    $("#update-vector").removeClass("d-none");
    orderIndex = eqtnToEdit.attr('data-vector-order');
    // get matrix in string form
    vector = vectorsStringFormat[orderIndex];
    // populate modal values
    $('#vector-row-0').val(vector[0]);
    $('#vector-row-1').val(vector[1]);
    $('#vector-row-2').val(vector[2]);
    // add event listener to edit button
    $('#update-vector').click(function() {
      updateEquation(eqtnToEdit, orderIndex);
    });
  }
}


/**
 * Updates matrix/vector with new values
 */
function updateEquation(eqtnDiv, orderIndex) {
  if (eqtnDiv.hasClass('matrix')) {
    // inputs get evaluated as math
    matrixArrayMath = getMatrix(true);
    // inputs remain as strings for display
    matrixArrayString = getMatrix(false);
    matricesStringFormat[orderIndex] = matrixArrayString;
    // convert to mathjs matrix so we can do calculations
    matrix = mathjs.matrix(matrixArrayMath);
    currentMatricesOrder[orderIndex] = matrix;
    matrixString = formatMatrix(matrixArrayString, ROW_TEMPLATE);
    // hide div until math has been typeset
    eqtnDiv.addClass("d-none")
    eqtnDiv.html(matrixString);
  } else {
    // inputs get evaluated as math
    vectorArrayMath = [
      [mathjs.eval($('#vector-row-0').val())],
      [mathjs.eval($('#vector-row-1').val())],
      [mathjs.eval($('#vector-row-2').val())]
    ];
    // inputs remain as strings for display
    vectorArrayString = [
      [$('#vector-row-0').val()],
      [$('#vector-row-1').val()],
      [$('#vector-row-2').val()]
    ];
    vectorsStringFormat[orderIndex] = vectorArrayString;
    // convert to mathjs matrix so we can do caluclations
    vector = mathjs.matrix(vectorArrayMath);
    currentVectorsOrder[orderIndex] = vector;
    vectorString = sprintf(
      MATRIX_TEMPLATE,
      vectorArrayString[0],
      vectorArrayString[1],
      vectorArrayString[2]
    );
    // hide div until math has been typeset
    eqtnDiv.addClass("d-none")
    eqtnDiv.html(vectorString);
  }
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, eqtnDiv[0]]); // typeset the updated equation
  eqtnDiv.removeClass("d-none");
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
  if (success) {
    $(this).removeClass('input-error');
  }
  // if there are no input erros, enable add button
  if ($('.input-error').length == 0) {
    $('.add-from-input').prop('disabled', false);
  }
}

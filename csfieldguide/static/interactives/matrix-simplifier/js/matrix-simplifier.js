const dragula = require('./../../../../node_modules/dragula/dragula');
const mathjs = require('mathjs');
const sprintf = require('sprintf-js').sprintf;
const vsprintf = require('sprintf-js').vsprintf;

const ROW_TEMPLATE = "%s & %s & %s";
const MATRIX_TEMPLATE = "\\begin{bmatrix} %s \\\\ %s \\\\ %s \\end{bmatrix}";

m1 = mathjs.matrix([[1,0,0],[0,1,0],[0,0,1]]);
m2 = mathjs.matrix([[3,0,0],[0,3,0],[0,0,3]]);
m3 = mathjs.matrix([[1,0,0],[0,1,0],[0,0,1]]);

v1 = mathjs.matrix([[1], [0], [0]]);

var matrices = [m1, m2, m3];
var vectors = [v1];


$(document).ready(function() {
  $('#add-matrix-from-input').click(addMatrix);
  $('#add-vector-from-input').click(addVector);
  console.log(matrices);
  console.log(vectors);
});


function addMatrix() {
  matrixArray = getMatrix();
  matrix = mathjs.matrix(matrixArray);
  matrices.push(matrix);
  matrixString = formatMatrix(matrixArray);
  $('#matrix-1').html(matrixString);
  // Request re-render. Taken from https://stackoverflow.com/questions/32239378/using-mathjax-in-an-updating-sequence-in-javascript
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'matrix-1']);
  showOutput()
}


function getMatrix() {
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

  return [row0, row1, row2];
}


function formatMatrix(matrix) {
  row0 = vsprintf(ROW_TEMPLATE, matrix[0]);
  row1 = vsprintf(ROW_TEMPLATE, matrix[1]);
  row2 = vsprintf(ROW_TEMPLATE, matrix[2]);

  return sprintf(MATRIX_TEMPLATE, row0, row1, row2);
}


function addVector() {
  vectorArray = [
    [$('#vector-row-0').val()], 
    [$('#vector-row-1').val()], 
    [$('#vector-row-2').val()]
  ];
  vector = mathjs.matrix(vectorArray);
  vectors.push(vector);
  vectorString = sprintf(MATRIX_TEMPLATE, vectorArray[0], vectorArray[1], vectorArray[2]);
  $('#vector-2').html(vectorString);
  // Request re-render. Taken from https://stackoverflow.com/questions/32239378/using-mathjax-in-an-updating-sequence-in-javascript
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'vector-2']);
  showOutput()
}


/* Set the matrices to the default values */
function resetMatrices() {
  // reset to default values of matrices
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
}


function showOutput() {
  var result = calculateOutput();
  console.log(result);
  var matrix = result[0];
  var vector = result[1];
  console.log(vector);

  var vectorRows = [
    mathjs.subset(vector, mathjs.index(0)),
    mathjs.subset(vector, mathjs.index(1)),
    mathjs.subset(vector, mathjs.index(2)),
  ];

  matrixString = formatMatrix(matrix);
  vectorString = sprintf(MATRIX_TEMPLATE, vectorRows[0], vectorRows[1], vectorRows[2]);

  $('#matrix-output').html(matrixString);
  $('#vector-output').html(vectorString);
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'matrix-output']);
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'vector-output']);
}


function calculateOutput() {
  var matrixResult = mathjs.zeros(3, 3);
  var vectorResult = mathjs.zeros(3, 1);

  if (matrices.length == 1) {
    matrixResult = matrices[0];
  } else if (matrices.length > 1) {
    // 2 or more matrices
    matricesCopy = matrices; // copy list for recursive multiplying in place
    matrixResult = multiplyMatrices(matricesCopy);
  }

  if (vectors.length == 1) {
    vectorResult = vectors[0];
  } else if (vectors.length > 1) {
    // 2 or more vectors
    vectorsCopy = vectors; // copy list for recursive adding in place
    vectorResult = addVectors(vectorsCopy);
  }

  return [matrixResult, vectorResult];

}


function multiplyMatrices(m) {
  console.log('hello');
  var multiply = true;
  while (multiply) {
    console.log(m);
    if (m.length == 2) {
      multiply = false;
      return mathjs.multiply(m[0], m[1]);
    } else {
      result = mathjs.multiply(m[0], m[1]);
      // remove the first matrix in array
      console.log(m);
      m.shift();
      console.log(m);
      // replace the new first element in array with result
      m[0] = result;
      console.log(m);
    }
  }
}


function addVectors(v) {
  var add = true;
  while (add) {
    console.log(v);
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
 * Defines draging and button handlers
 */
$(function() {
  var matrix_list = $('.containers').toArray();
  var drake = dragula(matrix_list, {
    accepts: function(el, target, source, sibling) {
      // Don't allow dragging of vectors to matrices container and vice versa
      return target.parentNode.id === source.parentNode.id;
    }
  });
  drake.on('drag', function(el, source) {
    scrollable = false;
  });
  drake.on('drop', (matrix, target_container, source_container) => {
    // If an matrix is dragged on top of another matrix..
    if (target_container.children.length == 2) {
      swap(matrix, target_container, source_container);
    }
    scrollable = true;
  });
});


/**
* Swaps the matrix in the target container and the matrix in the source container
*/
function swap(matrix, target_container, source_container) {
  // save the original matrix in target_container to a temp var
  temp = target_container.children[0];
  // matrix is original matrix in source_container. Swap the matrices.
  target_container.appendChild(matrix);
  source_container.appendChild(temp);
}

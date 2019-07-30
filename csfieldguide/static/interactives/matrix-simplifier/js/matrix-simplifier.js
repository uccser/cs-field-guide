const mathjs = require('mathjs');
const sprintf = require('sprintf-js').sprintf;
const vsprintf = require('sprintf-js').vsprintf;

const ROW_TEMPLATE = "%s & %s & %s";
const MATRIX_TEMPLATE = "\\begin{bmatrix} %s \\\\ %s \\\\ %s \\end{bmatrix}";

$(document).ready(function() {
  $('#add-matrix-from-input').click(addMatrix);
  $('#add-vector-from-input').click(addVector);
});


function addMatrix() {
  matrixArray = getMatrix();
  matrix = mathjs.matrix(matrixArray);
  matrixString = formatMatrix(matrixArray);
  $('#matrix-1').html(matrixString);
  // Request re-render. Taken from https://stackoverflow.com/questions/32239378/using-mathjax-in-an-updating-sequence-in-javascript
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'matrix-1']);
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
    $('#vector-row-0').val(), 
    $('#vector-row-1').val(), 
    $('#vector-row-2').val()
  ];
  vector = mathjs.matrix(vectorArray);
  vectorString = sprintf(MATRIX_TEMPLATE, vectorArray[0], vectorArray[1], vectorArray[2]);
  $('#matrix-2').html(vectorString);
  // Request re-render. Taken from https://stackoverflow.com/questions/32239378/using-mathjax-in-an-updating-sequence-in-javascript
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'matrix-2']);
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
}

const dragula = require('./../../../../node_modules/dragula/dragula');
const mathjs = require('mathjs');
const sprintf = require('sprintf-js').sprintf;
const vsprintf = require('sprintf-js').vsprintf;

const ROW_TEMPLATE = "%s & %s & %s";
const MATRIX_TEMPLATE = "\\begin{bmatrix} %s \\\\ %s \\\\ %s \\end{bmatrix}";

var matrices = [];
var vectors = [];

$(document).ready(function() {
  $('#add-matrix-from-input').click(addMatrix);
  $('#add-vector-from-input').click(addVector);
});


function addMatrix() {
  matrixArray = getMatrix();
  matrix = mathjs.matrix(matrixArray);
  matrices.push(matrix);
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
  vectors.push(vector);
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

  $('#vector-row-0').val(1),
  $('#vector-row-1').val(0),
  $('#vector-row-2').val(0)
}


function calculateOutput() {

}


/**
 * Defines draging and button handlers
 */
$(function() {
  var matrix_list = $('.containers').toArray();
  var drake = dragula(matrix_list, {
    accepts: function(el, target, source) {
      // Don't allow dragging of vectors to matrices container and vice versa
      if (target.parentNode.id !== source.parentNode.id) {
        false;
      }
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

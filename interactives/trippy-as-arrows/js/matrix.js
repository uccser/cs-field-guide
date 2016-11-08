
/* Sets up order of matrix operations and moves the arrow to new position
 */
function matrixOperations() {
    // commonly accepted order is scale -> rotate -> translate
    scale();
    translate();
    updateArrow();
}


/* Scale the arrow according to the user's inputted matrix
 */
function scale() {
    // NTS make version for single input, this function can be for scale button only...or delete scale button since it is redundant?
    var point = null;
    var newMatrix = [];

    dimensions.scaleMatrix[0] = parseFloat(document.getElementById('matrix-scale-row-0-col-0').value);
    dimensions.scaleMatrix[1] = parseFloat(document.getElementById('matrix-scale-row-0-col-1').value);
    dimensions.scaleMatrix[2] = parseFloat(document.getElementById('matrix-scale-row-1-col-0').value);
    dimensions.scaleMatrix[3] = parseFloat(document.getElementById('matrix-scale-row-1-col-1').value);


    for (var i = 0; i < 7; i++) { // 7 points on arrow

        var newPoint = new Point();
        var currPoint = dimensions.startPosition[i];

        newPoint.x = ((currPoint.x - dimensions.xIntercept)/dimensions.squareSize) * dimensions.scaleMatrix[0] + ((currPoint.y - dimensions.yIntercept)/dimensions.squareSize) * dimensions.scaleMatrix[1] * -1;
        newPoint.y = ((currPoint.x - dimensions.xIntercept)/dimensions.squareSize) * dimensions.scaleMatrix[2] + ((currPoint.y - dimensions.yIntercept)/dimensions.squareSize) * dimensions.scaleMatrix[3] * -1;

        newPoint.x = (newPoint.x * dimensions.squareSize) + dimensions.xIntercept;
        newPoint.y = (newPoint.y * dimensions.squareSize * -1) + dimensions.yIntercept;

        dimensions.currentPosition[i] = newPoint;
    }

}


/* Translate the arrow according to the user's inputted matrix
 */
function translate() {
    var newMatrix = [];
    var point = null;

    dimensions.translateMatrix[0] = parseFloat(document.getElementById('matrix-translate-row-0-col-0').value) * dimensions.squareSize;
    dimensions.translateMatrix[1] = parseFloat(document.getElementById('matrix-translate-row-1-col-0').value) * dimensions.squareSize;


    for (var i = 0; i < 7; i++) { // 7 points on arrow

        var newPoint = new Point();

        point = dimensions.currentPosition[i];

        newPoint.x = point.x + dimensions.translateMatrix[0];
        newPoint.y = point.y - dimensions.translateMatrix[1];

        dimensions.currentPosition[i] = newPoint;

    }
}


/* Move the arrow back to the start position and set the matrices to the default values
 */
function resetMatrices() {

    // place the arrow back in the start position
    drawArrow();

    // reset to default values of matrices
    document.getElementById('matrix-scale-row-0-col-0').value = 1;
    document.getElementById('matrix-scale-row-0-col-1').value = 0;
    document.getElementById('matrix-scale-row-1-col-0').value = 0;
    document.getElementById('matrix-scale-row-1-col-1').value = 1;

    document.getElementById('matrix-translate-row-0-col-0').value = 0;
    document.getElementById('matrix-translate-row-1-col-0').value = 0;

}

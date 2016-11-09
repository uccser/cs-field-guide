
/* Sets up order of matrix operations and moves the arrow to new position
 */
function matrixOperations() {

    var productMatrix = dimensions.startPosition;
    var count = 0;
    var matrixElements = document.getElementById('matrices').children;

    for (var i = 0; i < matrixElements.length; i++) {
        var element = matrixElements[i];

        if (element.style.display == 'block') {
            if (element.id.indexOf('scale') != -1) {
                productMatrix = scale(element.id.slice(7,8), productMatrix); // nasty hard coding
            } else {
                productMatrix = translate(element.id.slice(7,8), productMatrix);
            }
            count += 1;
        }

    }

    updateArrow();
}


/* Scale the arrow according to the user's inputted matrix
 */
function scale(id, productMatrix) {

    dimensions.scaleMatrix[0] = parseFloat(document.getElementById('matrix-' + id + '-scale-row-0-col-0').value);
    dimensions.scaleMatrix[1] = parseFloat(document.getElementById('matrix-' + id + '-scale-row-0-col-1').value);
    dimensions.scaleMatrix[2] = parseFloat(document.getElementById('matrix-' + id + '-scale-row-1-col-0').value);
    dimensions.scaleMatrix[3] = parseFloat(document.getElementById('matrix-' + id + '-scale-row-1-col-1').value);

    for (var i = 0; i < 7; i++) { // 7 points on arrow

        var newPoint = new Point();
        var currPoint = productMatrix[i];

        newPoint.x = ((currPoint.x - dimensions.xIntercept)/dimensions.squareSize) * dimensions.scaleMatrix[0] + ((currPoint.y - dimensions.yIntercept)/dimensions.squareSize) * dimensions.scaleMatrix[1] * -1;
        newPoint.y = ((currPoint.x - dimensions.xIntercept)/dimensions.squareSize) * dimensions.scaleMatrix[2] + ((currPoint.y - dimensions.yIntercept)/dimensions.squareSize) * dimensions.scaleMatrix[3] * -1;

        newPoint.x = (newPoint.x * dimensions.squareSize) + dimensions.xIntercept;
        newPoint.y = (newPoint.y * dimensions.squareSize * -1) + dimensions.yIntercept;

        dimensions.currentPosition[i] = newPoint;
    }
    return dimensions.currentPosition;

}


/* Translate the arrow according to the user's inputted matrix
 */
function translate(id, productMatrix) {

    dimensions.translateMatrix[0] = parseFloat(document.getElementById('matrix-' + id + '-translate-row-0-col-0').value) * dimensions.squareSize;
    dimensions.translateMatrix[1] = parseFloat(document.getElementById('matrix-' + id + '-translate-row-1-col-0').value) * dimensions.squareSize;

    for (var i = 0; i < 7; i++) { // 7 points on arrow

        var newPoint = new Point();
        var currPoint = productMatrix[i];

        newPoint.x = currPoint.x + dimensions.translateMatrix[0];
        newPoint.y = currPoint.y - dimensions.translateMatrix[1];

        dimensions.currentPosition[i] = newPoint;

    }

    return dimensions.currentPosition;
}


/* Move the arrow back to the start position and set the matrices to the default values
 */
function resetMatrices() {

    // place the arrow back in the start position
    drawArrow();

    // reset to default values of matrices
    document.getElementById('matrix-a-scale-row-0-col-0').value = 1;
    document.getElementById('matrix-a-scale-row-0-col-1').value = 0;
    document.getElementById('matrix-a-scale-row-1-col-0').value = 0;
    document.getElementById('matrix-a-scale-row-1-col-1').value = 1;

    document.getElementById('matrix-a-translate-row-0-col-0').value = 0;
    document.getElementById('matrix-a-translate-row-1-col-0').value = 0;

    document.getElementById('matrix-b-scale-row-0-col-0').value = 1;
    document.getElementById('matrix-b-scale-row-0-col-1').value = 0;
    document.getElementById('matrix-b-scale-row-1-col-0').value = 0;
    document.getElementById('matrix-b-scale-row-1-col-1').value = 1;

    document.getElementById('matrix-b-translate-row-0-col-0').value = 0;
    document.getElementById('matrix-b-translate-row-1-col-0').value = 0;

}

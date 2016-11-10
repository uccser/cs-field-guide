
/* Sets up order of matrix operations and moves the arrow to new position
 */
function matrixOperations() {

    var productMatrix = configSettings.startPosition;
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

    currentState.scaleMatrix[0] = parseFloat(document.getElementById('matrix-' + id + '-scale-row-0-col-0').value);
    currentState.scaleMatrix[1] = parseFloat(document.getElementById('matrix-' + id + '-scale-row-0-col-1').value);
    currentState.scaleMatrix[2] = parseFloat(document.getElementById('matrix-' + id + '-scale-row-1-col-0').value);
    currentState.scaleMatrix[3] = parseFloat(document.getElementById('matrix-' + id + '-scale-row-1-col-1').value);

    for (var i = 0; i < 7; i++) { // 7 points on arrow

        var newPoint = new Point();
        var currPoint = productMatrix[i];

        newPoint.x = ((currPoint.x - interfaceSettings.xIntercept)/interfaceSettings.squareSize) * currentState.scaleMatrix[0] + ((currPoint.y - interfaceSettings.yIntercept)/interfaceSettings.squareSize) * currentState.scaleMatrix[1] * -1;
        newPoint.y = ((currPoint.x - interfaceSettings.xIntercept)/interfaceSettings.squareSize) * currentState.scaleMatrix[2] + ((currPoint.y - interfaceSettings.yIntercept)/interfaceSettings.squareSize) * currentState.scaleMatrix[3] * -1;

        newPoint.x = (newPoint.x * interfaceSettings.squareSize) + interfaceSettings.xIntercept;
        newPoint.y = (newPoint.y * interfaceSettings.squareSize * -1) + interfaceSettings.yIntercept;

        currentState.currentPosition[i] = newPoint;
    }
    return currentState.currentPosition;

}


/* Translate the arrow according to the user's inputted matrix
 */
function translate(id, productMatrix) {

    currentState.translateMatrix[0] = parseFloat(document.getElementById('matrix-' + id + '-translate-row-0-col-0').value) * interfaceSettings.squareSize;
    currentState.translateMatrix[1] = parseFloat(document.getElementById('matrix-' + id + '-translate-row-1-col-0').value) * interfaceSettings.squareSize;

    for (var i = 0; i < 7; i++) { // 7 points on arrow

        var newPoint = new Point();
        var currPoint = productMatrix[i];

        newPoint.x = currPoint.x + currentState.translateMatrix[0];
        newPoint.y = currPoint.y - currentState.translateMatrix[1];

        currentState.currentPosition[i] = newPoint;

    }

    return currentState.currentPosition;
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

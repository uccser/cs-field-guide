function matrixTab(matrixInputBox) {
    checkForValidInput(matrixInputBox);

    // round floats to two decimal places
    var num = matrixInputBox.value;
    if (num.indexOf('.') != -1) { //is a float
        num = parseFloat(num).toFixed(2);
    }
    matrixInputBox.value = num;

    if (currentState.instantUpdate == true) {
        matrixOperations();
    }
}


/* Sets up order of matrix operations and moves the arrow to new position
 */
function matrixOperations(test) {
    var matrixElements = document.getElementById('matrices').children;
    var productMatrix = [];
    for (var i = 0; i < 7; i++) {
        var newPoint = new Point();
        newPoint.x = configSettings.START_POSITION[i].x + interfaceSettings.xIntercept - interfaceSettings.initialXIntercept;
        newPoint.y = configSettings.START_POSITION[i].y + interfaceSettings.yIntercept - interfaceSettings.initialYIntercept;
        productMatrix[i] = newPoint;
    }

    for (var i = 0; i < matrixElements.length; i++) {
        var element = matrixElements[i];

        if (element.style.display == 'block') {
            if (element.id.indexOf('scale') != -1) {
                productMatrix = scale(element.id.split('-')[1], productMatrix); // nasty hard coding
            } else {
                productMatrix = translate(element.id.split('-')[1], productMatrix);
            }
        }
    }

    drawArrow();
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

        newPoint.x = currPoint.x + currentState.translateMatrix[0];// + interfaceSettings.xIntercept;
        newPoint.y = currPoint.y - currentState.translateMatrix[1];// + interfaceSettings.yIntercept;

        currentState.currentPosition[i] = newPoint;
    }
    return currentState.currentPosition;
}


/* Move the arrow back to the start position and set the matrices to the default values
 */
function resetMatrices() {
    // place the arrow back in the start position
    reset();

    // reset to default values of matrices
    document.getElementById('matrix-first-scale-row-0-col-0').value = 1;
    document.getElementById('matrix-first-scale-row-0-col-1').value = 0;
    document.getElementById('matrix-first-scale-row-1-col-0').value = 0;
    document.getElementById('matrix-first-scale-row-1-col-1').value = 1;

    document.getElementById('matrix-first-translate-row-0-col-0').value = 0;
    document.getElementById('matrix-first-translate-row-1-col-0').value = 0;

    document.getElementById('matrix-second-scale-row-0-col-0').value = 1;
    document.getElementById('matrix-second-scale-row-0-col-1').value = 0;
    document.getElementById('matrix-second-scale-row-1-col-0').value = 0;
    document.getElementById('matrix-second-scale-row-1-col-1').value = 1;

    document.getElementById('matrix-second-translate-row-0-col-0').value = 0;
    document.getElementById('matrix-second-translate-row-1-col-0').value = 0;
}

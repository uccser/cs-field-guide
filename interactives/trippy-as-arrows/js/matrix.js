/* Uses matrix multiplication to calculate new position of each point on the arrow
 * Triggered when user clicks "Scale" button under input matrix
 */
function useMatrixToScale() {
    // NTS make version for single input, this function can be for scale button only...or delete scale button since it is redundant?
    var point = null;
    var newMatrix = [];
    var same = true;

    newMatrix[0] = parseInt(document.getElementById('matrix-row-0-col-0').value);
    newMatrix[1] = parseInt(document.getElementById('matrix-row-0-col-1').value);
    newMatrix[2] = parseInt(document.getElementById('matrix-row-1-col-0').value);
    newMatrix[3] = parseInt(document.getElementById('matrix-row-1-col-1').value);

    for (var i = 0; i < 4; i++) { // 4 values in 2x2 matrix
        if (dimensions.scaleMatrix[i] != newMatrix[i]) {
            dimensions.scaleMatrix[i] = newMatrix[i];
            same = false;
        }
    }

    if (same == false) {

        for (var i = 0; i < 7; i++) { // 7 points on arrow

            var newPoint = new Point();
            var currPoint = dimensions.startPosition[i];

            newPoint.x = ((currPoint.x - dimensions.xIntercept)/dimensions.squareSize) * dimensions.scaleMatrix[0] + ((currPoint.y - dimensions.yIntercept)/dimensions.squareSize) * dimensions.scaleMatrix[1] * -1;
            newPoint.y = ((currPoint.x - dimensions.xIntercept)/dimensions.squareSize) * dimensions.scaleMatrix[2] + ((currPoint.y - dimensions.yIntercept)/dimensions.squareSize) * dimensions.scaleMatrix[3] * -1;

            newPoint.x = (newPoint.x * dimensions.squareSize) + dimensions.xIntercept;
            newPoint.y = (newPoint.y * dimensions.squareSize * -1) + dimensions.yIntercept;

            dimensions.currentPosition[i] = newPoint;
        }
        updateArrow();

    }

}

/* BUG
 * matrix scale and translate are getting in the way of each other
 * translate shouldn't change back to normal arrow shape if it's already been scaled
 */

/* Uses matrix addition to calculate new position of each point on the arrow
 * Triggered user clicks "Translate" button under input matrix
 */
function useMatrixToTranslate() {

    var newMatrix = [];
    var point = null;
    var same = true;

    newMatrix[0] = parseInt(document.getElementById('matrix-translate-row-0-col-0').value) * dimensions.squareSize;
    newMatrix[1] = parseInt(document.getElementById('matrix-translate-row-1-col-0').value) * dimensions.squareSize;

    if (dimensions.translateMatrix[0] != newMatrix[0]) {
        dimensions.translateMatrix[0] = newMatrix[0];
        same = false;
    }
    if (dimensions.translateMatrix[1] != newMatrix[1]) {
        dimensions.translateMatrix[1] = newMatrix[1];
        same = false;
    }

    if (same == false) {
        for (var i = 0; i < 7; i++) { // 7 points on arrow

            var newPoint = new Point();

            point = dimensions.currentPosition[i];

            newPoint.x = point.x + dimensions.translateMatrix[0];
            newPoint.y = point.y - dimensions.translateMatrix[1];

            dimensions.currentPosition[i] = newPoint;

        }
        updateArrow();
    }

}

/* Put the corresponding coordinate into each of the input boxes
 * Offsets the real value of the coordinate to give impression that centre of grid is position (0,0)
 * */
function updateInputBoxes(points) {

    var inputId = '';

    // uses index to determine which input box to reference
    for (var i = 0; i < 7; i++) { // 7 points on arrow

        inputId = 'p' + i + '-input-x';
        document.getElementById(inputId).value = (points[i].x - dimensions.xIntercept) / dimensions.squareSize;
        inputId = 'p' + i + '-input-y';
        document.getElementById(inputId).value = ((points[i].y - dimensions.yIntercept) / dimensions.squareSize) * -1;

    }

}


/* Gets new coordinates from *all* input boxes
 * Triggered when use clicks "update" button
 */
function getNewCoordinates() {

    var inputId = '';

    for (var i = 0; i < 7; i++) { // 7 points on arrow

        var newPoint = new Point();

        // Offsets the real value of the coordinate to give impression that centre of grid is position (0,0)
        inputId = 'p' + i + '-input-x';
        newPoint.x = (parseInt(document.getElementById(inputId).value) * dimensions.squareSize) + dimensions.xIntercept;
        inputId = 'p' + i + '-input-y';
        newPoint.y = (parseInt(document.getElementById(inputId).value) * -1 * dimensions.squareSize) + dimensions.yIntercept;

        dimensions.currentPosition[i] = newPoint;

    }

    updateArrow();

}


/* Gets new coordinate from single input box
 * Triggered when the user deslects a coordinate input box
 */
function getNewCoordinate(input) {

    // uses id of input element to find index in points array and if it is x or y that changed
    var index = input.id.slice(1,2);
    var newValue = parseInt(input.value) * dimensions.squareSize;

    // Offsets the real value of the coordinate to give impression that centre of grid is position (0,0)
    var coord = input.id.slice(9);
    if (coord == 'x') {
        newValue += dimensions.xIntercept;
    } else {
        newValue *= -1;
        newValue += dimensions.yIntercept;
    }

    // if the value is has changed, update the arrow
    if (dimensions.currentPosition[index][coord] != newValue) {
        dimensions.currentPosition[index][coord] = newValue;
        updateArrow();
    }


}



/* Highlights a point on the arrow
 * Input: id of input row hovered over by mouse
 * */
function highlight(row) {
    circle = document.getElementById(row);
    circle.style.fill = '#FF7043';
}

/* Resets colour of point on the arrow
 * Input: id of input row hovered over by mouse
 * */
function removeHighlight(row) {
    circle = document.getElementById(row);
    circle.style.fill = '#000';
}





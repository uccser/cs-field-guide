/* Put the corresponding coordinate into each of the input boxes
 * Offsets the real value of the coordinate to give impression that centre of grid is position (0,0)
 * */
function updateInputBoxes(points) {
    var inputId = '';

    // uses index to determine which input box to reference
    for (var i = 0; i < 7; i++) { // 7 points on arrow
        inputId = 'p' + i + '-input-x';
        document.getElementById(inputId).value = (points[i].x - interfaceSettings.xIntercept) / interfaceSettings.squareSize;
        inputId = 'p' + i + '-input-y';
        document.getElementById(inputId).value = ((points[i].y - interfaceSettings.yIntercept) / interfaceSettings.squareSize) * -1;
    }
}


function coordTab(inputBox) {
    checkForValidInput(inputBox);
    if (currentState.instantUpdate == true) {
        getNewCoordinates();
    }
    removeHighlight(inputBox);
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
        newPoint.x = (parseInt(document.getElementById(inputId).value) * interfaceSettings.squareSize) + interfaceSettings.xIntercept;
        inputId = 'p' + i + '-input-y';
        newPoint.y = (parseInt(document.getElementById(inputId).value) * -1 * interfaceSettings.squareSize) + interfaceSettings.yIntercept;

        currentState.currentPosition[i] = newPoint;
    }
    drawArrow();
}


/* Highlights a point on the arrow
 * Input: id of input row hovered over by mouse
 * */
function highlight(element) {
    circle = document.getElementById(element.parentNode.getAttribute("node-id"));
    circle.style.fill = '#FF7043';
}


/* Resets colour of point on the arrow
 * Input: id of input row hovered over by mouse
 * */
function removeHighlight(element) {
    circle = document.getElementById(element.parentNode.getAttribute("node-id"));
    circle.style.fill = '#000';
}

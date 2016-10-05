
/* NTS
 * Reacting to updating inputs:
 *   - should react on tab
 *   - react on button click
 *   - be able to to choose tab/button click
 *   - button only on mobile?
 */

// NTS I should split this into multiple files...

/* NTS
 * - specify in url which concept the interactive is demonstrating
 * - uses this to decide which config file to load
 */

// NTS needs to be able to handle sin() cos() functions
// NTS should react to tabbing through matrix input
// TODO function to convert between coord spaces?

/* Global variable is a dictionary of variables relating to size and position of grid and arrow */
var dimensions = {};

/* Class for generating new points */
function Point(x, y) {
    this.x = x;
    this.y = y;
}


////////////////////////////////////////////////////////////

/* On load get config and build the grid and both arrows */
window.onload = function(event) {

    loadJSON(function(response) {
        var config = JSON.parse(response);
        loadModules(config);
    });

    calculateAllTheThings();

}

/* Rebuilds dynamic on window resize */
window.onresize = function(event) {
    // NTS means that the JSON file is being loaded potentially many times
    // TODO should figure out how to do this without having to reload the json file

    loadJSON(function(response) {
        var config = JSON.parse(response);
        loadModules(config);
    });

    calculateAllTheThings();
}

////////////////////////////////////////////////////////////

// JSON magic

/* Loads JSON config file */
function loadJSON(callback, thing) {

    // Get json file name from url
    var url = window.location.search.replace('?', '');
    const params = new URLSearchParams(url); // pulls out value of each parameter
    var filename = 'config/' + params.get('input') + '.json';

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json"); // tells the browser what type of file it is
    xobj.open('GET', filename);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") { // where 4 = DONE and 200 = successful request
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}


////////////////////////////////////////////////////////////

function loadModules(config) {

    if (config['type'] == 'matrix') {
        // show matrix elements
        document.getElementById('matrices').style.display = 'block';
    } else if (config['type'] == 'coordinates') {
        // show coordinate elements
        document.getElementById('coordinates').style.display = 'block';
    }
    document.getElementById('task').innerHTML = config['task'];
    drawTargetArrow(config['target']);

}


////////////////////////////////////////////////////////////

/* Calculate size of grid and arrow and save to global variable */
// TODO should probably change the name of this function
function calculateAllTheThings() {

    var container = document.getElementById('container');
    //var polygon = document.getElementsByTagName('polygon')[0]; // the svg arrow
    var polygon = document.getElementById('dynamic-polygon');
    var target_polygon = document.getElementById('target-polygon');

    var squareSize = 20;
    var arrowWidth = 3;
    var arrowHeight = 8;

    // offset used to center arrow in grid
    var offset = (arrowHeight / 2) * squareSize;

    // width settings
    var windowWidth = window.innerWidth;
    var xNumSquares = Math.floor(windowWidth / squareSize);
    var xIntercept = Math.floor(xNumSquares / 2) * squareSize;
    var containerWidth = xIntercept * 2;

    // height settings
    var windowHeight = window.innerHeight;
    var yNumSquares = Math.floor(windowHeight / squareSize);
    var yIntercept = Math.floor(yNumSquares / 2) * squareSize;
    var containerHeight = yIntercept * 2;

    // restricts dimensions of container to match whole squares in grid
    container.style.width = containerWidth + 'px';
    container.style.height = containerHeight + 'px';

    // WTF dynamically sets topMargin because CSS doesn't want to CSS...
    var topMargin = (windowHeight - containerHeight) / 2;
    container.style.marginTop = topMargin + 'px';


    dimensions = {
        CONTAINER:       container,
        POLYGON:         polygon,
        TARGET_POLYGON:  target_polygon,
        containerWidth:  containerWidth,
        containerHeight: containerHeight,
        squareSize:      squareSize,
        xNumSquares:     xNumSquares,
        xIntercept:      xIntercept,
        yNumSquares:     yNumSquares,
        yIntercept:      yIntercept,
        arrowWidth:      arrowWidth,
        arrowHeight:     arrowHeight,
        offset:          offset,
        startPosition:   [],
        currentPosition: [],
        targetPosition:  [],
        scaleMatrix:     [0, 0],
        translateMatrix: [1, 0, 0, 1]
    };

    drawBackground();
    drawArrow();

}


/*
 * Draws the grid background by building css string
 */
function drawBackground() {

    var backgroundSizeFormat = dimensions.xIntercept + 'px ' + dimensions.yIntercept + 'px, ' +
        dimensions.xIntercept + 'px ' + dimensions.yIntercept + 'px, '
        + dimensions.squareSize + 'px ' + dimensions.squareSize + 'px, '
        + dimensions.squareSize + 'px ' + dimensions.squareSize + 'px';

    // Apply the background styling to the container element
    container.style.backgroundSize = backgroundSizeFormat; // WTF why did this not have to get container though dimensions.CONTAINER??

}


/* Draws arrow shape
 * Used on load and when "reset" button is clicked
 */
function drawArrow() {
    /*
     * Points of arrow referenced according to diagram below
     *         p0
     *         /\
     *        /  \
     *       /    \
     *      /      \
     *  p1 /__p2  __\p6
     *        |  |p5
     *        |  |
     *        |  |
     *        |__|
     *       p3  p4
     */

    /* For each of the 7 points on the arrow:
     *     - Create a new Point object
     *     - Assign (x,y) coordinate
     */
    var p0 = new Point();
    p0.x = dimensions.xIntercept;
    p0.y = dimensions.yIntercept - dimensions.offset;

    var p1 = new Point();
    p1.x = dimensions.xIntercept - (dimensions.arrowWidth * dimensions.squareSize);
    p1.y = dimensions.yIntercept + (dimensions.arrowWidth * dimensions.squareSize) - dimensions.offset;

    var p2 = new Point();
    p2.x = dimensions.xIntercept - dimensions.squareSize;
    p2.y = dimensions.yIntercept + (dimensions.arrowWidth * dimensions.squareSize) - dimensions.offset;

    var p3 = new Point();
    p3.x = dimensions.xIntercept - dimensions.squareSize;
    p3.y = dimensions.yIntercept + (dimensions.arrowHeight * dimensions.squareSize) - dimensions.offset;

    var p4 = new Point();
    p4.x = dimensions.xIntercept + dimensions.squareSize;
    p4.y = dimensions.yIntercept + (dimensions.arrowHeight * dimensions.squareSize) - dimensions.offset;

    var p5 = new Point();
    p5.x = dimensions.xIntercept + dimensions.squareSize;
    p5.y = dimensions.yIntercept + (dimensions.arrowWidth * dimensions.squareSize) - dimensions.offset;

    var p6 = new Point();
    p6.x = dimensions.xIntercept + (dimensions.arrowWidth * dimensions.squareSize);
    p6.y = dimensions.yIntercept + (dimensions.arrowWidth * dimensions.squareSize) - dimensions.offset;

    dimensions.startPosition = [p0, p1, p2, p3, p4, p5, p6];
    dimensions.currentPosition = [p0, p1, p2, p3, p4, p5, p6];

    updateArrow();
    updateInputBoxes(dimensions.startPosition);

}


/* Draws arrow shape
 * Used on load and when "reset" button is clicked
 */
function drawTargetArrow(points) {

    var point;
    var xPos = 0;
    var yPos = 1;

    points = points.split(' ');

    for (var i = 0; i < 7; i++) { // 7 points on an arrow, each with x and y value

        point = dimensions.TARGET_POLYGON.points.getItem(i);
        point.x = (points[xPos] * dimensions.squareSize) + dimensions.xIntercept;
        // have to multiply by -1 becuase y axis is reversed in the svg coordinate space
        point.y = (points[yPos] * dimensions.squareSize * -1) + dimensions.yIntercept;

        dimensions.targetPosition.push(point);

        xPos += 2;
        yPos += 2;

    }

}


/* Updates each coordinate in the arrow */
function updateArrow() {

    var point;
    var circle;

    for (var i = 0; i < 7; i++) { // 7 points on an arrow

        point = dimensions.POLYGON.points.getItem(i);
        point.x = dimensions.currentPosition[i].x;
        point.y = dimensions.currentPosition[i].y;

        circle = document.getElementById('c' + i);
        circle.setAttribute('cx', dimensions.currentPosition[i].x + 'px');
        circle.setAttribute('cy', dimensions.currentPosition[i].y + 'px');

    }

}


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





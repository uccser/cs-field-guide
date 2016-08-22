
// TODO set container width/height from within js

// TODO when hover over x/y inputs, light up corresponding point on arrow
// NTS maybe use additional svgs of small circles that sit on top of each point (only show when hovered)

var dimensions;

/* Class for generating new points */
function Point(x, y) {
    this.x = x;
    this.y = y;
}


////////////////////////////////////////////////////////////

/* On load and resize build the grid and arrow */
window.onload = function(event) {
    calculateAllTheThings();
}

window.onresize = function(event) {
    calculateAllTheThings();
}

////////////////////////////////////////////////////////////


/* Calculate size of grid and arrow and save to global variable */
function calculateAllTheThings() {

    var container = document.getElementById('container');
    var polygon = document.getElementsByTagName('polygon')[0]; // the svg arrow

    var squareSize = 20;
    var arrowWidth = 3;
    var arrowHeight = 8;

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
        containerWidth:  containerWidth,
        containerHeight: containerHeight,
        squareSize:      squareSize,
        xNumSquares:     xNumSquares,
        xIntercept:      xIntercept,
        yNumSquares:     yNumSquares,
        yIntercept:      yIntercept,
        arrowWidth:      arrowWidth,
        arrowHeight:     arrowHeight,
    };

    drawBackground();
    drawArrow();

}


/*
 * Draws the grid background by building css string
 * TODO needs to update on window resize
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

    // offset used to center arrow in grid
    var offset = (dimensions.arrowHeight / 2) * dimensions.squareSize;


    /* For each of the 7 points on the arrow:
     *     - Create a new Point object
     *     - Assign (x,y) coordinate
     */
    var p0 = new Point();
    p0.x = dimensions.xIntercept;
    p0.y = dimensions.yIntercept - offset;

    var p1 = new Point();
    p1.x = dimensions.xIntercept - (dimensions.arrowWidth * dimensions.squareSize);
    p1.y = dimensions.yIntercept + (dimensions.arrowWidth * dimensions.squareSize) - offset;

    var p2 = new Point();
    p2.x = dimensions.xIntercept - dimensions.squareSize;
    p2.y = dimensions.yIntercept + (dimensions.arrowWidth * dimensions.squareSize) - offset;

    var p3 = new Point();
    p3.x = dimensions.xIntercept - dimensions.squareSize;
    p3.y = dimensions.yIntercept + (dimensions.arrowHeight * dimensions.squareSize) - offset;

    var p4 = new Point();
    p4.x = dimensions.xIntercept + dimensions.squareSize;
    p4.y = dimensions.yIntercept + (dimensions.arrowHeight * dimensions.squareSize) - offset;

    var p5 = new Point();
    p5.x = dimensions.xIntercept + dimensions.squareSize;
    p5.y = dimensions.yIntercept + (dimensions.arrowWidth * dimensions.squareSize) - offset;

    var p6 = new Point();
    p6.x = dimensions.xIntercept + (dimensions.arrowWidth * dimensions.squareSize);
    p6.y = dimensions.yIntercept + (dimensions.arrowWidth * dimensions.squareSize) - offset;

    var newPoints = [p0, p1, p2, p3, p4, p5, p6];

    updateArrow(newPoints);
    updateInputBoxes(newPoints);

}


/* Updates each coordinate in the arrow */
function updateArrow(newPoints) {
    // TODO for input boxes, might just be able to link each input to corresponding point on the arrow
    // (rather than updating all of them)

    var point;

    for (var i = 0; i < newPoints.length; i++) {

        point = dimensions.POLYGON.points.getItem(i);
        point.x = newPoints[i].x;
        point.y = newPoints[i].y;

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
        document.getElementById(inputId).value = points[i].x - dimensions.xIntercept;
        inputId = 'p' + i + '-input-y';
        document.getElementById(inputId).value = points[i].y - dimensions.yIntercept;

    }

}


/* Gets new coordinates from input boxes
 * Offsets the real value of the coordinate to give impression that centre of grid is position (0,0)
 */
function getNewCoordinates() {

    var inputId = '';
    var newPoints = [];

    for (var i = 0; i < 7; i++) { // 7 points on arrow

        var newPoint = new Point();

        inputId = 'p' + i + '-input-x';
        newPoint.x = parseInt(document.getElementById(inputId).value) + dimensions.xIntercept;
        inputId = 'p' + i + '-input-y';
        newPoint.y = parseInt(document.getElementById(inputId).value) + dimensions.yIntercept;

        newPoints.push(newPoint);

    }

    updateArrow(newPoints);

}



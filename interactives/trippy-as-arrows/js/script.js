
// TODO set container width/height from within js

// TODO when hover over x/y inputs, light up corresponding point on arrow
// NTS maybe use additional svgs of small circles that sit on top of each point (only show when hovered)
// NTS passing around dimensions variable - might as well be global?

var dimensions;

/* Point class for generating new points */
function Point(x, y) {
    this.x = x;
    this.y = y;
}


window.onload = function() {
    var container = document.getElementById('container'); // NTS is it more efficient to do this, or to access it directly everytime?...
    var polygon = document.getElementsByTagName('polygon')[0]; // the svg arrow
    var squareSize = 20;

    var containerWidth = container.offsetWidth;
    var xNumSquares = Math.floor(containerWidth / squareSize);
    var xIntercept = Math.floor(xNumSquares / 2) * squareSize;

    var containerHeight = container.offsetHeight;
    var yNumSquares = Math.floor(containerHeight / squareSize);
    var yIntercept = Math.floor(yNumSquares / 2) * squareSize;

    var arrowWidth = 3;
    var arrowHeight = 8;
    var offset = (arrowHeight / 2) * squareSize;


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
        offset:          offset
    };
    // NTS there must be a better way to do this - onload?
    drawBackground();
    drawArrow();

}


/*
 * Draws the graph background
 * TODO needs to update on window resize
 */
function drawBackground() {

    // Buid the css string for creating the grid background
    var backgroundSizeFormat = dimensions.xIntercept + 'px ' + dimensions.yIntercept + 'px, ' +
        dimensions.xIntercept + 'px ' + dimensions.yIntercept + 'px, '
        + dimensions.squareSize + 'px ' + dimensions.squareSize + 'px, '
        + dimensions.squareSize + 'px ' + dimensions.squareSize + 'px';

    // Apply the background styling to the container element
    container.style.backgroundSize = backgroundSizeFormat;
}


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

    var newPoints = [p0, p1, p2, p3, p4, p5, p6];

    updateArrow(newPoints);
    updateInputBoxes(newPoints);

}


/* Updates each coordinate in the arrow */
// TODO for input boxes, might just be able to link each input to corresponding point on the arrow
// (rather than updating all of them)
function updateArrow(newPoints) {

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
    for (var i = 0; i < points.length; i++) {
        inputId = 'p' + i + '-input-x';
        document.getElementById(inputId).value = points[i].x - dimensions.xIntercept;
        inputId = 'p' + i + '-input-y';
        document.getElementById(inputId).value = points[i].y - dimensions.yIntercept;
    }

}

/* TODO rename */
function updateButton() {

    var inputId = '';
    var newPoints = [];

    for (var i = 0; i < 7; i++) { // 7 points on arrow
        var newPoint = new Point();
        inputId = 'p' + i + '-input-x';
        newPoint.x = parseInt(document.getElementById(inputId).value) + dimensions.xIntercept;
        inputId = 'p' + i + '-input-y';
        newPoint.y = parseInt(document.getElementById(inputId).value) + dimensions.yIntercept;

        console.log(newPoint);
        newPoints.push(newPoint);
    }

    console.log(newPoints);
    updateArrow(newPoints);

}



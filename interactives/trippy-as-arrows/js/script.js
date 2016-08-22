
// TODO set container width/height from within js

// TODO when hover over x/y inputs, light up corresponding point on arrow
// NTS maybe use additional svgs of small circles that sit on top of each point (only show when hovered)
// NTS passing around dimensions variable - might as well be global?



window.onload = function() {
    var container = document.getElementById('container'); // NTS is it more efficient to do this, or to access it directly everytime?...
    var squareSize = 20;

    var containerWidth = container.offsetWidth;
    var xNumSquares = Math.floor(containerWidth / squareSize);
    var xIntercept = Math.floor(xNumSquares / 2) * squareSize;

    var containerHeight = container.offsetHeight;
    var yNumSquares = Math.floor(containerHeight / squareSize);
    var yIntercept = Math.floor(yNumSquares / 2) * squareSize;


    var dimensions = {
        CONTAINER:       container, // only constant
        containerWidth:  containerWidth,
        containerHeight: containerHeight,
        squareSize:      squareSize,
        xNumSquares:     xNumSquares,
        xIntercept:      xIntercept,
        yNumSquares:     yNumSquares,
        yIntercept:      yIntercept
    };
    // NTS there must be a better way to do this - onload?
    drawBackground(dimensions);
    drawArrow(dimensions);

}


/*
 * Draws the graph background
 * TODO needs to update on window resize
 */
function drawBackground(dimensions) {

    // Buid the css string for creating the grid background
    var backgroundSizeFormat = dimensions.xIntercept + 'px ' + dimensions.yIntercept + 'px, ' +
        dimensions.xIntercept + 'px ' + dimensions.yIntercept + 'px, '
        + dimensions.squareSize + 'px ' + dimensions.squareSize + 'px, '
        + dimensions.squareSize + 'px ' + dimensions.squareSize + 'px';

    // Apply the background styling to the container element
    container.style.backgroundSize = backgroundSizeFormat;
}


function drawArrow(dimensions) {
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
    // TODO manipulate numbers as if center is (0,0) - i.e. needs negative values

    var polygon = document.getElementsByTagName('polygon')[0]; // the svg arrow

    // arbitrary values, possible belong in dimensions dictionary
    var arrowWidth = 3;
    var arrowHeight = 8;
    var offset = arrowHeight / 2;

    var p0 = polygon.points.getItem(0);
    p0.x = dimensions.xIntercept;
    p0.y = dimensions.yIntercept - offset * dimensions.squareSize;

    var p1 = polygon.points.getItem(1);
    p1.x = dimensions.xIntercept - (arrowWidth * dimensions.squareSize);
    p1.y = dimensions.yIntercept + (arrowWidth * dimensions.squareSize) - offset * dimensions.squareSize;

    var p2 = polygon.points.getItem(2);
    p2.x = dimensions.xIntercept - dimensions.squareSize;
    p2.y = dimensions.yIntercept + (arrowWidth * dimensions.squareSize) - offset * dimensions.squareSize;

    var p3 = polygon.points.getItem(3);
    p3.x = dimensions.xIntercept - dimensions.squareSize;
    p3.y = dimensions.yIntercept + (arrowHeight * dimensions.squareSize) - offset * dimensions.squareSize;

    var p4 = polygon.points.getItem(4);
    p4.x = dimensions.xIntercept + dimensions.squareSize;
    p4.y = dimensions.yIntercept + (arrowHeight * dimensions.squareSize) - offset * dimensions.squareSize;

    var p5 = polygon.points.getItem(5);
    p5.x = dimensions.xIntercept + dimensions.squareSize;
    p5.y = dimensions.yIntercept + (arrowWidth * dimensions.squareSize) - offset * dimensions.squareSize;

    var p6 = polygon.points.getItem(6);
    p6.x = dimensions.xIntercept + (arrowWidth * dimensions.squareSize);
    p6.y = dimensions.yIntercept + (arrowWidth * dimensions.squareSize) - offset * dimensions.squareSize;

    updateInputBoxes([p0, p1, p2, p3, p4, p5, p6]); // NTS maybe this list should be a variable

}


function updateInputBoxes(points) {

    var inputId = '';

    // uses index to determine which input box to reference
    for (var i = 0; i < points.length; i++) {
        inputId = 'p' + i + '-input-x';
        document.getElementById(inputId).value = points[i].x;
        inputId = 'p' + i + '-input-y';
        document.getElementById(inputId).value = points[i].y;
    }

}



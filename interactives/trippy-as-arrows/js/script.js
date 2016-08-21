//var ctx = document.getElementById('canvas').getContext('2d');

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

    var polygon = document.getElementsByTagName('polygon')[0]; // the svg arrow
    var points = polygon.getAttribute('points'); // gets all points in form of string

    // chosen these values at random, possible below in dimensions dictionary
    var arrowWidth = 2.5;
    var arrowHeight = 7;

    var points = polygon.points; // object containing all points, length of list and number of points

    points.getItem(0).x = dimensions.xIntercept;
    points.getItem(0).y = dimensions.yIntercept;

    points.getItem(1).x = dimensions.xIntercept - (arrowWidth * dimensions.squareSize);
    points.getItem(1).y = dimensions.yIntercept + (arrowWidth * dimensions.squareSize);

    points.getItem(2).x = dimensions.xIntercept - dimensions.squareSize;
    points.getItem(2).y = dimensions.yIntercept + (arrowWidth * dimensions.squareSize);

    points.getItem(3).x = dimensions.xIntercept - dimensions.squareSize;
    points.getItem(3).y = dimensions.yIntercept + (arrowHeight * dimensions.squareSize);

    points.getItem(4).x = dimensions.xIntercept + dimensions.squareSize;
    points.getItem(4).y = dimensions.yIntercept + (arrowHeight * dimensions.squareSize);

    points.getItem(5).x = dimensions.xIntercept + dimensions.squareSize;
    points.getItem(5).y = dimensions.yIntercept + (arrowWidth * dimensions.squareSize);

    points.getItem(6).x = dimensions.xIntercept + (arrowWidth * dimensions.squareSize);
    points.getItem(6).y = dimensions.yIntercept + (arrowWidth * dimensions.squareSize);

}


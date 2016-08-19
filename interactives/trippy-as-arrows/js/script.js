//var ctx = document.getElementById('canvas').getContext('2d');

// TODO set container width/height from within js

// TODO when hover over x/y inputs, light up corresponding point on arrow
// NTS maybe use additional svgs of small circles that sit on top of each point (only show when hovered)



window.onload = function() {
    var container = document.getElementById('container'); // NTS is it more efficient to do this, or to access it directly everytime?...
    var squareSize = 20;

    var containerWidth = container.offsetWidth;
    var xNumSquares = Math.floor(containerWidth / squareSize);
    var xMidPoint = Math.floor(xNumSquares / 2);
    var xIntercept = xMidPoint * squareSize;

    var containerHeight = container.offsetHeight;
    var yNumSquares = Math.floor(containerHeight / squareSize);
    var yMidPoint = Math.floor(yNumSquares / 2);
    var yIntercept = yMidPoint * squareSize;


    var dimensions = {
        CONTAINER:       container, // only constant
        containerWidth:  containerWidth,
        containerHeight: containerHeight,
        squareSize:      squareSize,
        xNumSquares:     xNumSquares,
        xMidPoint:       xMidPoint,
        xIntercept:      xIntercept,
        yNumSquares:     yNumSquares,
        yMidPoint:       yMidPoint,
        yIntercept:      yIntercept
    };
    // NTS there must be a better way to do this - onload?
    drawBackground(dimensions);
    drawArrow();

}


/*
 * Draws the graph background
 * TODO needs to update on window resize
 */
function drawBackground(dimensions) {
    // NTS WORKINGHERE
    console.log(dimensions);

    // Buid the string for creating the grid background
    var backgroundSizeFormat = xIntercept + 'px ' + yIntercept + 'px, ' + xIntercept + 'px ' + yIntercept + 'px, ' + squareSize + 'px ' + squareSize + 'px, ' + squareSize + 'px ' + squareSize + 'px';

    // Apply the background styling to the container element
    container.style.backgroundSize = backgroundSizeFormat;
}


function drawArrow() {
    /*
     * Points of arrow referenced according to diagram below
     *         p1
     *         /\
     *        /  \
     *       /    \
     *      /      \
     *  p2 /__p3  __\p7
     *        |  |p6
     *        |  |
     *        |  |
     *        |__|
     *       p4  p5
    */

    /* NTS can access points in polygon with
     * var p = polygon.points
     * p.getItem(index of point)
     * p.x = new value
     * p.y = new value
     */
    /* TODO
     * find points in relative coord space
     * build arrow
     */


}


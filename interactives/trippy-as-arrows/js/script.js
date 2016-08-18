//var ctx = document.getElementById('canvas').getContext('2d');

// TODO set container width/height from within js

/* NTS this is gross code
 * should go in a function or something
 */
var container = document.getElementById('container'); // NTS is it more efficient to do this, or to access it directly everytime?...
var squareSize = 20;

var containerWidth = container.offsetWidth;

var numSquares = Math.floor(containerWidth / squareSize);
var midPoint = Math.floor(numSquares / 2);
var xIntercept = midPoint * squareSize;

var containerHeight = container.offsetHeight;
numSquares = Math.floor(containerHeight / squareSize);
midPoint = Math.floor(numSquares / 2);
yIntercept = midPoint * squareSize;

/* end gross code */

// NTS there must be a better way to do this - onload?
drawBackground();
drawArrow();

/*
 * Draws the graph background
 * TODO needs to update on window resize
 */
function drawBackground() {

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


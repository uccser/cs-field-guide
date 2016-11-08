
/* NTS
 * Reacting to updating inputs:
 *   - should react on tab
 *   - react on button click
 *   - be able to to choose tab/button click
 *   - button only on mobile?
 */


// NTS needs to be able to handle sin() cos() functions
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
    // TODO there has got to be a better way to do this....there's a lot of nesting here...

    var scale_a = false;
    var translate_a = false;

    if (config['type'] == 'matrix') {
        // show matrix elements
        var parentDiv = document.getElementById('matrices');
        parentDiv.style.display = 'block';
        modules = config['modules'];
        for (var i = 0; i < modules.length; i++) {
            newModule = document.getElementById('matrix-' +  modules[i]);
            newModule.style.display = 'block';
            parentDiv.appendChild(newModule);
        }
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
        translateMatrix: [0, 0]
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



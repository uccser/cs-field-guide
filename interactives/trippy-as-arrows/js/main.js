
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
var interfaceSettings = {};
var configSettings = {};
var currentState = {};

/* Class for generating new points */
function Point(x, y) {
    this.x = x;
    this.y = y;
}


////////////////////////////////////////////////////////////

/* On load get config and build the grid and both arrows */
window.onload = function(event) {
    calculateAllTheThings();

    get('config/matrix-rotate.json').then(function(response) {
        var config = JSON.parse(response);
        loadModules(config);
    }, function(error) {
      console.error("Failed!", error);
    });

}


/* Rebuilds dynamic on window resize */
window.onresize = function(event) {
    // NTS means that the JSON file is being loaded potentially many times
    // TODO should figure out how to do this without having to reload the json file

    calculateAllTheThings();

    get('config/matrix-rotate.json').then(function(response) {
        var config = JSON.parse(response);
        loadModules(config);
    }, function(error) {
      console.error("Failed!", error);
    });

}

////////////////////////////////////////////////////////////

// JSON magic

function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}


////////////////////////////////////////////////////////////

function loadModules(config) {

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

    interfaceSettings = {
        CONTAINER:       container,
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
    };

    configSettings = {
        POLYGON:         polygon,
        TARGET_POLYGON:  target_polygon,
        startPosition:   [],
        targetPosition:  [],
    };

    currentState = {
        currentPosition: [],
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

    var backgroundSizeFormat = interfaceSettings.xIntercept + 'px ' + interfaceSettings.yIntercept + 'px, ' +
        interfaceSettings.xIntercept + 'px ' + interfaceSettings.yIntercept + 'px, '
        + interfaceSettings.squareSize + 'px ' + interfaceSettings.squareSize + 'px, '
        + interfaceSettings.squareSize + 'px ' + interfaceSettings.squareSize + 'px';

    // Apply the background styling to the container element
    container.style.backgroundSize = backgroundSizeFormat; // WTF why did this not have to get container though interfaceSettings.CONTAINER??

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
    p0.x = interfaceSettings.xIntercept;
    p0.y = interfaceSettings.yIntercept - interfaceSettings.offset;

    var p1 = new Point();
    p1.x = interfaceSettings.xIntercept - (interfaceSettings.arrowWidth * interfaceSettings.squareSize);
    p1.y = interfaceSettings.yIntercept + (interfaceSettings.arrowWidth * interfaceSettings.squareSize) - interfaceSettings.offset;

    var p2 = new Point();
    p2.x = interfaceSettings.xIntercept - interfaceSettings.squareSize;
    p2.y = interfaceSettings.yIntercept + (interfaceSettings.arrowWidth * interfaceSettings.squareSize) - interfaceSettings.offset;

    var p3 = new Point();
    p3.x = interfaceSettings.xIntercept - interfaceSettings.squareSize;
    p3.y = interfaceSettings.yIntercept + (interfaceSettings.arrowHeight * interfaceSettings.squareSize) - interfaceSettings.offset;

    var p4 = new Point();
    p4.x = interfaceSettings.xIntercept + interfaceSettings.squareSize;
    p4.y = interfaceSettings.yIntercept + (interfaceSettings.arrowHeight * interfaceSettings.squareSize) - interfaceSettings.offset;

    var p5 = new Point();
    p5.x = interfaceSettings.xIntercept + interfaceSettings.squareSize;
    p5.y = interfaceSettings.yIntercept + (interfaceSettings.arrowWidth * interfaceSettings.squareSize) - interfaceSettings.offset;

    var p6 = new Point();
    p6.x = interfaceSettings.xIntercept + (interfaceSettings.arrowWidth * interfaceSettings.squareSize);
    p6.y = interfaceSettings.yIntercept + (interfaceSettings.arrowWidth * interfaceSettings.squareSize) - interfaceSettings.offset;

    configSettings.startPosition = [p0, p1, p2, p3, p4, p5, p6];
    currentState.currentPosition = [p0, p1, p2, p3, p4, p5, p6];

    updateArrow();
    updateInputBoxes(configSettings.startPosition);

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

        point = configSettings.TARGET_POLYGON.points.getItem(i);
        point.x = (points[xPos] * interfaceSettings.squareSize) + interfaceSettings.xIntercept;
        // have to multiply by -1 becuase y axis is reversed in the svg coordinate space
        point.y = (points[yPos] * interfaceSettings.squareSize * -1) + interfaceSettings.yIntercept;

        configSettings.targetPosition.push(point);

        xPos += 2;
        yPos += 2;

    }

}


/* Updates each coordinate in the arrow */
function updateArrow() {

    var point;
    var circle;

    for (var i = 0; i < 7; i++) { // 7 points on an arrow

        point = configSettings.POLYGON.points.getItem(i);
        point.x = currentState.currentPosition[i].x;
        point.y = currentState.currentPosition[i].y;

        circle = document.getElementById('c' + i);
        circle.setAttribute('cx', currentState.currentPosition[i].x + 'px');
        circle.setAttribute('cy', currentState.currentPosition[i].y + 'px');

    }

}



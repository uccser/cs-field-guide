
/* NTS
 * Reacting to updating inputs:
 *   - should react on tab
 *   - react on button click
 *   - be able to to choose tab/button click
 *   - button only on mobile?
 */

// NTS should probably s/arrow/polygon for consistency and robustness

// NTS needs to be able to handle sin() cos() functions? - security issue...
// TODO function to convert between coord spaces?

/* Global variable is a dictionary of variables relating to size and position of grid and arrow */
var interfaceSettings = {
    POLYGON:         null,
    TARGET_POLYGON:  null,
    CONTAINER:       null,
    containerWidth:  0,
    containerHeight: 0,
    squareSize:      0,
    xNumSquares:     0,
    xIntercept:      0,
    yNumSquares:     0,
    yIntercept:      0,
    arrowWidth:      0,
    arrowHeight:     0,
    offset:          0
};

/* Settings retrieved from config file */
var configSettings = {
    FILE:            '',
    TARGET_POSITION_STRING: '',
    START_POSITION:  [],
    TARGET_POSITION: [],
    TASK:            '',
    MODULES:         []
};

/* Setting related to current state of the arrow */
var currentState = {
    currentPosition: [],
    scaleMatrix:     [0, 0],
    translateMatrix: [0, 0]
};

/* Class for point objects */
function Point(x, y) {
    this.x = x;
    this.y = y;
}


////////////////////////////////////////////////////////////

/* On load get config and build the grid and both arrows */
window.onload = function(event) {

    setUpInterface();

    // gets name of config file according to url parameter
    var url = window.location.search.replace('?', '');
    const params = new URLSearchParams(url); // pulls out the value of each parameter
    var filename = 'config/' + params.get('input') + '.json';

    // load the json file and assemble the interface
    get(filename).then(function(response) {
        var config = JSON.parse(response);
        saveConfig(filename, config);
        loadModules(config);
        drawArrow();
        drawTargetArrow();
    }, function(error) {
      console.error("Failed!", error);
    });

}


/* Rebuilds grid and arrows on window resize */
window.onresize = function(event) {

    // recalculates size of grid and redraws arrow and target arrow
    setUpInterface();
    drawArrow();
    drawTargetArrow();

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

/* Saves information from config file that is used later */
function saveConfig(filename, config) {

    configSettings.FILE = filename;
    configSettings.TARGET_POSITION_STRING = config['target'];
    configSettings.TASK = config['task'];
    configSettings.MODULES = config['modules'];
}

/* Figures out which input elements to show */
function loadModules(config) {

    if (config['type'] == 'matrix') {
        // show matrix elements
        var parentDiv = document.getElementById('matrices');
        parentDiv.style.display = 'block';
        modules = configSettings.MODULES;
        for (var i = 0; i < modules.length; i++) {
            newModule = document.getElementById('matrix-' +  modules[i]);
            newModule.style.display = 'block';
            parentDiv.appendChild(newModule);
        }
    } else if (config['type'] == 'coordinates') {
        // show coordinate elements
        document.getElementById('coordinates').style.display = 'block';
    }
    document.getElementById('task').innerHTML = configSettings.TASK;

}

////////////////////////////////////////////////////////////

/* Uses the window size to calculate the grid size and position */
function setUpInterface() {

    var container = document.getElementById('container');
    var polygon = document.getElementById('dynamic-polygon');
    var targetPolygon = document.getElementById('target-polygon');

    // arbitrary numbers that seem to work well
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

    interfaceSettings.POLYGON = polygon;
    interfaceSettings.TARGET_POLYGON = targetPolygon;
    interfaceSettings.CONTAINER = container;
    interfaceSettings.containerWidth = containerWidth;
    interfaceSettings.containerHeight = containerHeight;
    interfaceSettings.squareSize = squareSize;
    interfaceSettings.xNumSquares = xNumSquares;
    interfaceSettings.xIntercept = xIntercept;
    interfaceSettings.yNumSquares = yNumSquares;
    interfaceSettings.yIntercept = yIntercept;
    interfaceSettings.arrowWidth = arrowWidth;
    interfaceSettings.arrowHeight = arrowHeight;
    interfaceSettings.offset = offset;

    drawBackground();

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

    configSettings.START_POSITION = [p0, p1, p2, p3, p4, p5, p6];
    currentState.currentPosition = [p0, p1, p2, p3, p4, p5, p6];

    updateArrow();
    updateInputBoxes(configSettings.START_POSITION);

}


/* Draws arrow shape
 * Used on load and when "reset" button is clicked
 */
function drawTargetArrow() {

    var point;
    var xPos = 0;
    var yPos = 1;

    points = configSettings.TARGET_POSITION_STRING.split(' ');

    for (var i = 0; i < 7; i++) { // 7 points on an arrow, each with x and y value

        point = interfaceSettings.TARGET_POLYGON.points.getItem(i);
        point.x = (points[xPos] * interfaceSettings.squareSize) + interfaceSettings.xIntercept;
        // have to multiply by -1 becuase y axis is reversed in the svg coordinate space
        point.y = (points[yPos] * interfaceSettings.squareSize * -1) + interfaceSettings.yIntercept;

        configSettings.TARGET_POSITION.push(point);

        xPos += 2;
        yPos += 2;

    }

}


/* Updates each coordinate in the arrow */
function updateArrow() {

    var point;
    var circle;

    for (var i = 0; i < 7; i++) { // 7 points on an arrow

        point = interfaceSettings.POLYGON.points.getItem(i);
        point.x = currentState.currentPosition[i].x;
        point.y = currentState.currentPosition[i].y;

        circle = document.getElementById('c' + i);
        circle.setAttribute('cx', currentState.currentPosition[i].x + 'px');
        circle.setAttribute('cy', currentState.currentPosition[i].y + 'px');

    }

}



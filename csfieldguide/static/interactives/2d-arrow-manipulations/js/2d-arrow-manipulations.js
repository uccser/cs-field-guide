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
    initialXIntercept: 0,
    yNumSquares:     0,
    yIntercept:      0,
    initialYIntercept: 0,
    arrowWidth:      0,
    arrowHeight:     0,
    offset:          0
};

/* Settings retrieved from config file */
var configSettings = {
    FILE:            '',
    START_POSITION_STRING: '0 4 -3 1 -1 1 -1 -4 1 -4 1 1 3 1',
    TARGET_POSITION_STRING: '',
    START_POSITION:  [],
    TARGET_POSITION: [],
    TYPE:            '',
    TITLE:           '',
    TASK:            '',
    MODULES:         []
};

/* Setting related to current state of the arrow */
var currentState = {
    instantUpdate:   true,
    currentPosition: [],
    scaleMatrix:     [0, 0],
    translateMatrix: [0, 0]
};

/* Class for point objects */
function Point(x, y) {
    this.x = x;
    this.y = y;
}


// ########################################################################## //
/* Functions related to setting up the interface */

/* On load; get config, build the grid and both arrows, then register button
 * handler functions
 */
$(document).ready(function() {
    setUpInterface();

    var configFile = getUrlParameter('config') || "coord-translate";
    assembleInterface(configFile);

    $('#get-new-coordinates-button').on('click', function() {
        getNewCoordinates();
    });
    $('#reset-coordinates-button').on('click', function() {
        reset();
    });
    $('#matrix-operations-button').on('click', function() {
        matrixOperations();
    });
    $('#reset-matrices-button').on('click', function() {
        resetMatrices();
    });
    registerNodeHighlights();
    registerOnBlurEvents();
});


/* Registers the events related to when the user deselects a specific text field */
function registerOnBlurEvents() {
    $('#p0-input-x').on('blur', function () {
        coordTab('c0', 'x');
    });
    $('#p0-input-y').on('blur', function () {
        coordTab('c0', 'y');
    });
    $('#p1-input-x').on('blur', function () {
        coordTab('c1', 'x');
    });
    $('#p1-input-y').on('blur', function () {
        coordTab('c1', 'y');
    });
    $('#p2-input-x').on('blur', function () {
        coordTab('c2', 'x');
    });
    $('#p2-input-y').on('blur', function () {
        coordTab('c2', 'y');
    });
    $('#p3-input-x').on('blur', function () {
        coordTab('c3', 'x');
    });
    $('#p3-input-y').on('blur', function () {
        coordTab('c3', 'y');
    });
    $('#p4-input-x').on('blur', function () {
        coordTab('c4', 'x');
    });
    $('#p4-input-y').on('blur', function () {
        coordTab('c4', 'y');
    });
    $('#p5-input-x').on('blur', function () {
        coordTab('c5', 'x');
    });
    $('#p5-input-y').on('blur', function () {
        coordTab('c5', 'y');
    });
    $('#p6-input-x').on('blur', function () {
        coordTab('c6', 'x');
    });
    $('#p6-input-y').on('blur', function () {
        coordTab('c6', 'y');
    });
    $('#p7-input-x').on('blur', function () {
        coordTab('c7', 'x');
    });
    $('#p7-input-y').on('blur', function () {
        coordTab('c7', 'y');
    });

    $('#matrix-first-scale-row-0-col-0').on('blur', function () {
        matrixTab('#matrix-first-scale-row-0-col-0');
    });
    $('#matrix-first-scale-row-0-col-1').on('blur', function () {
        matrixTab('#matrix-first-scale-row-0-col-1');
    });
    $('#matrix-first-scale-row-1-col-0').on('blur', function () {
        matrixTab('#matrix-first-scale-row-1-col-0');
    });
    $('#matrix-first-scale-row-1-col-1').on('blur', function () {
        matrixTab('#matrix-first-scale-row-1-col-1');
    });
    $('#matrix-first-translate-row-0-col-0').on('blur', function () {
        matrixTab('#matrix-first-translate-row-0-col-0');
    });
    $('#matrix-first-translate-row-1-col-0').on('blur', function () {
        matrixTab('#matrix-first-translate-row-1-col-0');
    });
    $('#matrix-second-scale-row-0-col-0').on('blur', function () {
        matrixTab('#matrix-first-scale-row-0-col-0');
    });
    $('#matrix-second-scale-row-0-col-1').on('blur', function () {
        matrixTab('#matrix-first-scale-row-0-col-1');
    });
    $('#matrix-second-scale-row-1-col-0').on('blur', function () {
        matrixTab('#matrix-first-scale-row-1-col-0');
    });
    $('#matrix-second-scale-row-1-col-1').on('blur', function () {
        matrixTab('#matrix-first-scale-row-1-col-1');
    });
    $('#matrix-second-translate-row-0-col-0').on('blur', function () {
        matrixTab('#matrix-first-translate-row-0-col-0');
    });
    $('#matrix-second-translate-row-1-col-0').on('blur', function () {
        matrixTab('#matrix-first-translate-row-1-col-0');
    });
}


/* Registers the node highlighting radio buttons for coordinate manipulations */
function registerNodeHighlights() {
    $('#c0-check').on('click', function () {
        setHighlight('c0');
    });
    $('#c1-check').on('click', function () {
        setHighlight('c1');
    });
    $('#c2-check').on('click', function () {
        setHighlight('c2');
    });
    $('#c3-check').on('click', function () {
        setHighlight('c3');
    });
    $('#c4-check').on('click', function () {
        setHighlight('c4');
    });
    $('#c5-check').on('click', function () {
        setHighlight('c5');
    });
    $('#c6-check').on('click', function () {
        setHighlight('c6');
    });
}


/* Rebuilds grid and arrows on window resize */
window.onresize = function(event) {
    // recalculates size of grid and redraws arrow and target arrow
    setUpInterface();
    setUpInitialTargetArrowPosition();
    drawTargetArrow();
    if (configSettings.TYPE == 'matrix') {
        matrixOperations();
    } else {
        getNewCoordinates();
    }
}

/* on reset button click, draw the dynamic arrow in it's start position */
function reset() { 
    setUpInitialDynamicArrowPosition();
    drawArrow();
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
    configSettings.TYPE = config['type'];
    configSettings.TITLE = config['title'];
    configSettings.TASK = config['task'];
    configSettings.MODULES = config['modules'];
    if (config['start'] != undefined) {
        configSettings.START_POSITION_STRING = config['start'];
    }
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
        document.getElementById('matrix-buttons').style.display = 'block';
    } else if (config['type'] == 'coordinates') {
        // show coordinate elements
        document.getElementById('coordinates').style.display = 'block';
        document.getElementById('coord-buttons').style.display = 'block';
    }
    document.getElementById('title').innerHTML = configSettings.TITLE;
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

    // Position x label, the y label is done automatically
    document.getElementById('x-label').style.marginTop = (containerHeight / 2) - 50 + 'px';

    // WTF dynamically sets topMargin because CSS doesn't want to CSS...
    //var topMargin = (windowHeight - containerHeight) / 2;
    //container.style.marginTop = topMargin + 'px';

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

    if (interfaceSettings.initialXIntercept == 0) {
        interfaceSettings.initialXIntercept = xIntercept;
        interfaceSettings.initialYIntercept = yIntercept;
    }

    drawBackground();
}


/* Assembles the interface based on the given config */
function assembleInterface(configFile) {
    var filename = base_path + "interactives/2d-arrow-manipulations/config/" + configFile + ".json";
    // load the json file and assemble the interface
    get(filename).then(function(response) {
        var config = JSON.parse(response);
        saveConfig(filename, config);
        loadModules(config);
        setUpInitialDynamicArrowPosition();
        setUpInitialTargetArrowPosition();
        drawArrow();
        drawTargetArrow();
    }, function(error) {
        console.error("Failed!", error);
    });
}

/* Draws the grid background by building css string */
function drawBackground() {
    var backgroundSizeFormat = interfaceSettings.xIntercept + 'px ' + interfaceSettings.yIntercept + 'px, ' +
        interfaceSettings.xIntercept + 'px ' + interfaceSettings.yIntercept + 'px, '
        + interfaceSettings.squareSize + 'px ' + interfaceSettings.squareSize + 'px, '
        + interfaceSettings.squareSize + 'px ' + interfaceSettings.squareSize + 'px';

    // Apply the background styling to the container element
    container.style.backgroundSize = backgroundSizeFormat; // WTF why did this not have to get container though interfaceSettings.CONTAINER??
}


// ########################################################################## //
/* Functions related to manipulating the arrows */

/* Creates and draws both the user's and target arrow */
function setUpInitialDynamicArrowPosition() {
    // create the user's arrow
    var arrowShape = generateArrowShape(configSettings.START_POSITION_STRING);
    // takes a copy of arrowShape list because otherwise pointers get in the way with updating the arrow
    configSettings.START_POSITION = arrowShape.slice(0);
    currentState.currentPosition = arrowShape.slice(0);
    updateInputBoxes(configSettings.START_POSITION);
}


function setUpInitialTargetArrowPosition() {
    configSettings.TARGET_POSITION = generateArrowShape(configSettings.TARGET_POSITION_STRING);
}


/* Translates string of coordinates into list of points with x and y attributes that fit in the svg coordinate space */
function generateArrowShape(pointString) {
    var xPos = 0;
    var yPos = 1;
    var arrow = [];
    var points = pointString.split(' ');

    for (var i = 0; i < 7; i++) { // 7 points on an arrow, each with x and y value

        //point = interfaceSettings.POLYGON.points.getItem(i);
        var point = new Point();
        point.x = (points[xPos] * interfaceSettings.squareSize) + interfaceSettings.xIntercept;
        // have to multiply by -1 becuase y axis is reversed in the svg coordinate space
        point.y = (points[yPos] * interfaceSettings.squareSize * -1) + interfaceSettings.yIntercept;

        arrow.push(point);

        xPos += 2;
        yPos += 2;
    }
    return arrow;
}


/* Draws arrow shape */
function drawTargetArrow() {
    var point;

    for (var i = 0; i < 7; i++) { // 7 points on an arrow, each with x and y value

        point = interfaceSettings.TARGET_POLYGON.points.getItem(i);
        point.x = configSettings.TARGET_POSITION[i].x;
        point.y = configSettings.TARGET_POSITION[i].y;
    }
}


/* Updates each coordinate in the arrow */
function drawArrow() {
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
    checkForMatch();
}


/* Sets the boolean for instantUpdate based on the appropriate checkbox.
 * Returns the boolean
 */
function instantUpdateToggle() {
    currentState.instantUpdate = $('#instant-update-check').is(':checked');
    return currentState.instantUpdate;
}


function checkForValidInput(id) {
    var value = $(id).val();
    if (isNaN(value) || value == '') { // does not contain a valid number
        document.getElementById(id).classList.add('invalid');
        return false;
    } else {
        $document.getElementById(id).classList.remove('invalid');
        document.getElementById(id).classList.add('');
        return true;
    }
}


/* checks if arrow position matches target position */
function checkForMatch() {
    var match = true;
    for (var i = 0; i < 7; i++) { // 7 points on arrow
        if ((Math.round(currentState.currentPosition[i].x * 100) / 100) != (Math.round(configSettings.TARGET_POSITION[i].x * 100) / 100)) {
            match = false;
            break;
        }
        if ((Math.round(currentState.currentPosition[i].y * 100) / 100) != (Math.round(configSettings.TARGET_POSITION[i].y * 100) / 100)) {
            match = false;
            break;
        }
    }
    if (match) {
        interfaceSettings.POLYGON.style.fill = '#4CAF50';
    } else {
        interfaceSettings.POLYGON.style.fill = '#FF9800';//'#008000';
    }
}


// ########################################################################## //
/* Functions relating to manipulation by coordinates */

/* Put the corresponding coordinate into each of the input boxes
 * Offsets the real value of the coordinate to give impression that centre of grid is position (0,0)
 */
function updateInputBoxes (points) {
    var inputId = '';

    // uses index to determine which input box to reference
    for (var i = 0; i < 7; i++) { // 7 points on arrow
        inputId = 'p' + i + '-input-x';
        document.getElementById(inputId).value = (points[i].x - interfaceSettings.xIntercept) / interfaceSettings.squareSize;
        inputId = 'p' + i + '-input-y';
        document.getElementById(inputId).value = ((points[i].y - interfaceSettings.yIntercept) / interfaceSettings.squareSize) * -1;
    }
}


function coordTab(node, x_or_y) {
    var id = '#p' + node.split('')[1] + '-input-' + x_or_y;
    checkForValidInput(id);
    if (instantUpdateToggle() == true) {
        getNewCoordinates();
    }
}


/* Gets new coordinates from *all* input boxes
 * Triggered when user clicks "update" button
 */
function getNewCoordinates() {
    var inputId = '';

    for (var i = 0; i < 7; i++) { // 7 points on arrow
        var newPoint = new Point();

        // Offsets the real value of the coordinate to give impression that centre of grid is position (0,0)
        inputId = 'p' + i + '-input-x';
        newPoint.x = (parseInt(document.getElementById(inputId).value) * interfaceSettings.squareSize) + interfaceSettings.xIntercept;
        inputId = 'p' + i + '-input-y';
        newPoint.y = (parseInt(document.getElementById(inputId).value) * -1 * interfaceSettings.squareSize) + interfaceSettings.yIntercept;

        currentState.currentPosition[i] = newPoint;
    }
    drawArrow();
}


/* Highlights a point on the arrow
 * Input: id of selected point
 */
function highlight(node) {
    circle = document.getElementById(node);
    circle.style.fill = '#FF1493';
}


/* Resets colour of point on the arrow
 * Input: id of selected point
 */
function removeHighlight(node) {
    circle = document.getElementById(node);
    circle.style.fill = '#000';
}


/* Sets the given node to be the only one highlighted */
function setHighlight(node) {
    var id = node + '-check';
    clearHighlights(id);
    highlight(node);
}


/* Clears all highlighted nodes except the one with the id given */
function clearHighlights(id) {
    var nextId;
    for (i=0; i<7; i++) { // there are 7 vertices in an arrow
        nextId = 'c' + i + '-check';
        if (nextId != id) {
            document.getElementById(nextId).classList.remove('active');
            removeHighlight('c' + i);
        }
    }
}


// ########################################################################## //
/* Functions relating to manipulation by matrices */

function matrixTab(id) {
    checkForValidInput(id);

    // round floats to two decimal places
    var num = $(id).val();
    if (num.indexOf('.') != -1) { //is a float
        num = parseFloat(num).toFixed(2);
    }
    $(id).val(num);

    if (instantUpdateToggle() == true) {
        matrixOperations();
    }
}


/* Sets up order of matrix operations and moves the arrow to new position */
function matrixOperations(test) {
    var matrixElements = document.getElementById('matrices').children;
    var productMatrix = [];
    for (var i = 0; i < 7; i++) {
        var newPoint = new Point();
        newPoint.x = configSettings.START_POSITION[i].x + interfaceSettings.xIntercept - interfaceSettings.initialXIntercept;
        newPoint.y = configSettings.START_POSITION[i].y + interfaceSettings.yIntercept - interfaceSettings.initialYIntercept;
        productMatrix[i] = newPoint;
    }

    for (var i = 0; i < matrixElements.length; i++) {
        var element = matrixElements[i];

        if (element.style.display == 'block') {
            if (element.id.indexOf('scale') != -1) {
                productMatrix = scale(element.id.split('-')[1], productMatrix); // nasty hard coding
            } else {
                productMatrix = translate(element.id.split('-')[1], productMatrix);
            }
        }
    }

    drawArrow();
}


/* Scale the arrow according to the user's inputted matrix */
function scale(id, productMatrix) {
    currentState.scaleMatrix[0] = parseFloat(document.getElementById('matrix-' + id + '-scale-row-0-col-0').value);
    currentState.scaleMatrix[1] = parseFloat(document.getElementById('matrix-' + id + '-scale-row-0-col-1').value);
    currentState.scaleMatrix[2] = parseFloat(document.getElementById('matrix-' + id + '-scale-row-1-col-0').value);
    currentState.scaleMatrix[3] = parseFloat(document.getElementById('matrix-' + id + '-scale-row-1-col-1').value);

    for (var i = 0; i < 7; i++) { // 7 points on arrow
        var newPoint = new Point();
        var currPoint = productMatrix[i];

        newPoint.x = ((currPoint.x - interfaceSettings.xIntercept)/interfaceSettings.squareSize) * currentState.scaleMatrix[0] + ((currPoint.y - interfaceSettings.yIntercept)/interfaceSettings.squareSize) * currentState.scaleMatrix[1] * -1;
        newPoint.y = ((currPoint.x - interfaceSettings.xIntercept)/interfaceSettings.squareSize) * currentState.scaleMatrix[2] + ((currPoint.y - interfaceSettings.yIntercept)/interfaceSettings.squareSize) * currentState.scaleMatrix[3] * -1;

        newPoint.x = (newPoint.x * interfaceSettings.squareSize) + interfaceSettings.xIntercept;
        newPoint.y = (newPoint.y * interfaceSettings.squareSize * -1) + interfaceSettings.yIntercept;
        currentState.currentPosition[i] = newPoint;
    }
    return currentState.currentPosition;
}


/* Translate the arrow according to the user's inputted matrix */
function translate(id, productMatrix) {
    currentState.translateMatrix[0] = parseFloat(document.getElementById('matrix-' + id + '-translate-row-0-col-0').value) * interfaceSettings.squareSize;
    currentState.translateMatrix[1] = parseFloat(document.getElementById('matrix-' + id + '-translate-row-1-col-0').value) * interfaceSettings.squareSize;

    for (var i = 0; i < 7; i++) { // 7 points on arrow
        var newPoint = new Point();
        var currPoint = productMatrix[i];

        newPoint.x = currPoint.x + currentState.translateMatrix[0];// + interfaceSettings.xIntercept;
        newPoint.y = currPoint.y - currentState.translateMatrix[1];// + interfaceSettings.yIntercept;

        currentState.currentPosition[i] = newPoint;
    }
    return currentState.currentPosition;
}


/* Move the arrow back to the start position and set the matrices to the default values */
function resetMatrices() {
    // place the arrow back in the start position
    reset();

    // reset to default values of matrices
    $('#matrix-first-scale-row-0-col-0').val(1);
    $('#matrix-first-scale-row-0-col-1').val(0);
    $('#matrix-first-scale-row-1-col-0').val(0);
    $('#matrix-first-scale-row-1-col-1').val(1);

    $('#matrix-first-translate-row-0-col-0').val(0);
    $('#matrix-first-translate-row-1-col-0').val(0);

    $('#matrix-second-scale-row-0-col-0').val(1);
    $('#matrix-second-scale-row-0-col-1').val(0);
    $('#matrix-second-scale-row-1-col-0').val(0);
    $('#matrix-second-scale-row-1-col-1').val(1);

    $('#matrix-second-translate-row-0-col-0').val(0);
    $('#matrix-second-translate-row-1-col-0').val(0);
}


// ########################################################################## //
/* Functions by a third party */

/* Created by Virendra
 * www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
 */
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split("&"),
        sParameterName,
        i;

    for (i=0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split("=");

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

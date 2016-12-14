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
// constants becaue they are set once when the config file is loaded
var configSettings = {
    FILE:            '',
    START_POSITION_STRING: '0 4 -3 1 -1 1 -1 -4 1 -4 1 1 3 1',
    TARGET_POSITION_STRING: '',
    START_POSITION:  [],
    TARGET_POSITION: [],
    TITLE:           '',
    TASK:            '',
    MODULES:         []
};

/* Setting related to current state of the arrow */
var currentState = {
    instantUpdate:   true,
    currentPosition: [],
    scaleMatrix:     [0, 0],
    translateMatrix: [0, 0],
    distanceFromYIntercept: 0,
    distanceFromXIntercept: 0
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
    var filename = 'config/' + params.get('config') + '.json';

    // load the json file and assemble the interface
    get(filename).then(function(response) {
        var config = JSON.parse(response);
        saveConfig(filename, config);
        loadModules(config);
        drawBothArrows();
    }, function(error) {
      console.error("Failed!", error);
    });
}


/* Rebuilds grid and arrows on window resize */
window.onresize = function(event) {
    // recalculates size of grid and redraws arrow and target arrow
    setUpInterface();
    //drawBothArrows();
    var xOffset = interfaceSettings.yIntercept - currentState.currentPosition[0].x;
    var yOffset = 0;
    realignDynamicArrow(xOffset, yOffset);

    configSettings.TARGET_POSITION = generateArrowShape(configSettings.TARGET_POSITION_STRING);
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
    configSettings.TITLE = config['title'];
    configSettings.TASK = config['task'];
    configSettings.MODULES = config['modules'];
    if (config['start'] != undefined) {
        configSettings.START_POSITION_STRING = config['start'];
    }
    configSettings.START_POSITION = generateArrowShape(configSettings.START_POSITION_STRING);
    currentState.currentPosition = configSettings.START_POSITION.slice(0);
    currentState.distanceFromXIntercept = interfaceSettings.xIntercept - currentState.currentPosition[0].x;
    currentState.distanceFromYIntercept = interfaceSettings.yIntercept - currentState.currentPosition[0].y;
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

    // place y and x labels to edge of grid
    document.getElementById('y-label').style.marginLeft = (containerWidth / 2) + 5 + 'px';
    document.getElementById('x-label').style.marginTop = (containerHeight / 2) - 5 + 'px';

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


//TODO move this to the one place it is called
/* Creates and draws both the user's and target arrow */
function drawBothArrows() {
    updateInputBoxes(currentState.currentPosition);

    // create the target arrow
    configSettings.TARGET_POSITION = generateArrowShape(configSettings.TARGET_POSITION_STRING);

    updateArrow(false);
    drawTargetArrow();
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
function updateArrow(screenResize) {
    var point;
    var circle;

    for (var i = 0; i < 7; i++) { // 7 points on an arrow
        point = interfaceSettings.POLYGON.points.getItem(i);
        point.x = currentState.currentPosition[i].x;
        point.y = currentState.currentPosition[i].y;

        circle = document.getElementById('c' + i);
        circle.setAttribute('cx', point.x + 'px');//currentState.currentPosition[i].x + 'px');
        circle.setAttribute('cy', point.y + 'px'); //currentState.currentPosition[i].y + 'px');
    }

    if (screenResize == false) {
    currentState.distanceFromXIntercept = interfaceSettings.xIntercept - currentState.currentPosition[0].x;
    currentState.distanceFromYIntercept = interfaceSettings.yIntercept - currentState.currentPosition[0].y;
    }

    checkForMatch();

}


function realignDynamicArrow(xOffset, yOffset) {

    console.log(currentState.distanceFromXIntercept);
    console.log(currentState.currentPosition[0].x);

    for (var i = 0; i < 7; i++) {
        point = interfaceSettings.POLYGON.points.getItem(i);
        console.log(currentState.currentPosition[i].x);
        point.x = currentState.currentPosition[i].x + currentState.distanceFromXIntercept;// + xOffset;
        point.y = currentState.currentPosition[i].y + currentState.distanceFromYIntercept;// + yOffset;
        console.log(point.x);

        circle = document.getElementById('c' + i);
        circle.setAttribute('cx', point.x + 'px');//currentState.currentPosition[i].x + 'px');
        circle.setAttribute('cy', point.y + 'px'); //currentState.currentPosition[i].y + 'px');
    }

    updateArrow(true);
    updateInputBoxes(currentState.currentPosition);
}


function instantUpdateToggle(checkbox) {
    if (checkbox.checked == true) {
        currentState.instantUpdate = true;
    } else {
        currentState.instantUpdate = false;
    }
}


function checkForValidInput(inputBox) {
    if (isNaN(inputBox.value) || inputBox.value == '') { // does not contain a valid number
        inputBox.className += 'invalid';
    } else {
        inputBox.className = '';
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

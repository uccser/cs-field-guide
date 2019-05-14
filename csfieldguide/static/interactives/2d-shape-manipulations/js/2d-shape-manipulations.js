var urlParameters = require('../../../js/third-party/url-parameters.js');

// ########################################################################## //
/* Configs (in alphabetical order) */

var coord_scale = {
    "type":     "coordinates",
    "title":    gettext("Scaling"),
    "task":     gettext("Try multiplying the original coordinates by 2. What is the effect of this transform?<br>What would happen if you multiply each value by 10? How about 0.5? What if you only multiply the x values?"),
    "target":   "-4 6 -4 2 0 2 -4 -8 0 -8 4 2 4 6"
}

var coord_scale_translate = {
    "type":     "coordinates",
    "title":    gettext("Combining Scaling and Translation Challenge"),
    "task":     gettext("Try to get the opaque shape to match up with the translucent one.<br>Hint: you may like to use expressions like 2*(2+1) or fractions like 1/5."),
    "target":   "3 10 3 6 7 6 3 -4 7 -4 11 6 11 10"
}

var coord_swap = {
    "type":     "coordinates",
    "title":    gettext("Swapping Coordinates"),
    "task":     gettext("What happens if you swap the x and y value for each coordinate?"),
    "target":   "3 -2 1 -2 1 0 -4 -2 -4 0 1 2 3 2"
}

var coord_translate = {
    "type":     "coordinates",
    "title":    gettext("Translating"),
    "task":     gettext("Try adding 2 to all the x points, and 3 to all the y points. What effect does this have on the original shape? <br>What happens if you subtract 3 from each of the original coordinates?"),
    "target":   "0 6 0 4 2 4 0 -1 2 -1 4 4 4 6"
}

var matrix_rotate = {
    "type":     "matrix",
    "title":    gettext("Matrix Rotation"),
    "task":     gettext("Rotate and translate the shape to the target position. You can use the Trig Function Calculator interactive to calculate exact values, use an accuracy of 2 decimal places."),
    "target":   "-0.55 5.71 0.87 4.29 2.29 5.71 4.42 0.74 5.84 2.16 3.71 7.13 2.29 8.55",
    "modules": ["first-scale", "first-translate"]
}

var matrix_rotate_scale_translate = {
    "type":     "matrix",
    "title":    gettext("Combining Translation, Scaling and Rotation"),
    "task":     gettext("Try moving the shape to the target position by using the two multiplication matrices (one to scale and one to rotate) then translating."),
    "target":   "11 8 9 8 9 4 4 8 4 4 9 0 11 0",
    "modules": ["first-scale", "second-scale", "first-translate"]
}

var matrix_rotate_scale_translate_2 = {
    "type":     "matrix",
    "title":    gettext("Multiple Transformation Challenge"),
    "task":     gettext("Try moving the shape to the target position by using the two multiplication matrices (one to scale and one to rotate) then translating."),
    "target":   "-11.1 -6.08 -8.26 -8.92 -5.42 -6.08 -1.16 -16.02 1.68 -13.18 -2.58 -3.24 -5.42 -0.4",
    "modules": ["first-scale", "second-scale", "first-translate"]
}

var matrix_rotate_translate = {
    "type":     "matrix",
    "title":    gettext("Using Translation to Simplify Rotation"),
    "task":     gettext("To move the shape to the new position, you'll have to translate the tip to the origin, apply the rotation, then translate it back."),
    "start":    "5 12 5 10 7 10 5 5 7 5 9 10 9 12",
    "target":   "5 12 6.42 10.58 7.84 12 9.97 7.03 11.39 8.45 9.26 13.42 7.84 14.84",
    "modules": ["first-translate", "first-scale", "second-translate"]
}

var matrix_scale = {
    "type":     "matrix",
    "title":    gettext("2D Scaling"),
    "task":     gettext("Try replacing the 1s with 2s in the multiplication matrix."),
    "target":   "-4 6 -4 2 0 2 -4 -8 0 -8 4 2 4 6",
    "modules": ["first-scale"]
}

var matrix_scale_translate = {
    "type":     "matrix",
    "title":    gettext("Scaling and Translation Challenge"),
    "task":     gettext("Use both scaling and translation to move the shape to the target position."),
    "target":   "5 0 5 -4 9 -4 5 -14 9 -14 13 -4 13 0",
    "modules": ["first-scale", "first-translate"]
}

var matrix_scale_translate_2 = {
    "type":     "matrix",
    "title":    gettext("Translation before Scaling"),
    "task":     gettext("This time, the order of translation and scaling has been swapped. Try to transform the shape to the target position. The order in which operations happen makes a difference!"),
    "target":   "5 0 5 -4 9 -4 5 -14 9 -14 13 -4 13 0",
    "modules": ["first-translate", "first-scale"]
}

var matrix_scale_translate_3 = {
    "type":     "matrix",
    "title":    gettext("Using Translation to Simplify Scaling"),
    "task":     gettext("This time the top left tip of the shape is at<br>(12, 12), so you should translate it to the origin, scale it, then translate it back."),
    "start":    "12 12 12 10 14 10 12 5 14 5 16 10 16 12",
    "target":   "12 12 12 8 16 8 12 -2 16 -2 20 8 20 12",
    "modules": ["first-translate", "first-scale", "second-translate"]
}

var matrix_single = {
    "type":     "matrix",
    "title":    gettext("Single Matrix"),
    "task":     gettext("Try putting in the final matrix here and see if it does scale by 2 and rotate by 45 degrees."),
    "target":   "1.4 7 -1.4 4.2 1.4 1.4 -8.4 -2.8 -5.6 -5.6 4.2 -1.4 7 1.4",
    "modules": ["first-scale"]
}

var matrix_translate = {
    "type":     "matrix",
    "title":    gettext("Translation"),
    "task":     gettext("Use the translation matrix to move the shape to its target position."),
    "target":   "7 -4 7 -6 9 -6 7 -11 9 -11 11 -6 11 -4",
    "modules": ["first-translate"]
}


// ########################################################################## //
/* Other Globals */

/* Global variable is a dictionary of variables relating to size and position of grid and shape */
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
    shapeWidth:      0,
    shapeHeight:     0,
    offset:          0
};

/* Settings retrieved from config to be used this time */
var configSettings = {
    FILE:            '',
    START_POSITION_STRING: '-2 3 -2 1 0 1 -2 -4 0 -4 2 1 2 3',
    TARGET_POSITION_STRING: '',
    START_POSITION:  [],
    TARGET_POSITION: [],
    TYPE:            '',
    TITLE:           '',
    TASK:            '',
    MODULES:         []
};

/* Setting related to current state of the shape */
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

/* On load; get config, build the grid and both shapes, then register button
 * handler functions
 */
$(document).ready(function() {
    setUpInterface();

    var showIndex = urlParameters.getUrlParameter('showIndex');

    var config = urlParameters.getUrlParameter('config') || null;
    if (showIndex || config == null) {
        document.getElementById('config-dropdown').classList.remove('d-none');
    }

    if (config != null) {
        assembleInterface(config);
    } else {
        assembleInterface("coord-translate");
    }

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
    registerOnFocusEvents();
    registerOnBlurEvents();
    registerEnterHandler();
});


/* registers the events related to when elements are selected */
function registerOnFocusEvents() {
    $('#p0-input-x').focus(function() {
        setHighlight('c0');
    });
    $('#p0-input-y').focus(function() {
        setHighlight('c0');
    });
    $('#p1-input-x').focus(function() {
        setHighlight('c1');
    });
    $('#p1-input-y').focus(function() {
        setHighlight('c1');
    });
    $('#p2-input-x').focus(function() {
        setHighlight('c2');
    });
    $('#p2-input-y').focus(function() {
        setHighlight('c2');
    });
    $('#p3-input-x').focus(function() {
        setHighlight('c3');
    });
    $('#p3-input-y').focus(function() {
        setHighlight('c3');
    });
    $('#p4-input-x').focus(function() {
        setHighlight('c4');
    });
    $('#p4-input-y').focus(function() {
        setHighlight('c4');
    });
    $('#p5-input-x').focus(function() {
        setHighlight('c5');
    });
    $('#p5-input-y').focus(function() {
        setHighlight('c5');
    });
    $('#p6-input-x').focus(function() {
        setHighlight('c6');
    });
    $('#p6-input-y').focus(function() {
        setHighlight('c6');
    });
}


/* Registers the events related to when the user deselects a specific text field */
function registerOnBlurEvents() {
    $('#p0-input-x').on('blur', function() {
        coordTab('c0', 'x');
    });
    $('#p0-input-y').on('blur', function() {
        coordTab('c0', 'y');
    });
    $('#p1-input-x').on('blur', function() {
        coordTab('c1', 'x');
    });
    $('#p1-input-y').on('blur', function() {
        coordTab('c1', 'y');
    });
    $('#p2-input-x').on('blur', function() {
        coordTab('c2', 'x');
    });
    $('#p2-input-y').on('blur', function() {
        coordTab('c2', 'y');
    });
    $('#p3-input-x').on('blur', function() {
        coordTab('c3', 'x');
    });
    $('#p3-input-y').on('blur', function() {
        coordTab('c3', 'y');
    });
    $('#p4-input-x').on('blur', function() {
        coordTab('c4', 'x');
    });
    $('#p4-input-y').on('blur', function() {
        coordTab('c4', 'y');
    });
    $('#p5-input-x').on('blur', function() {
        coordTab('c5', 'x');
    });
    $('#p5-input-y').on('blur', function() {
        coordTab('c5', 'y');
    });
    $('#p6-input-x').on('blur', function() {
        coordTab('c6', 'x');
    });
    $('#p6-input-y').on('blur', function() {
        coordTab('c6', 'y');
    });

    $('#matrix-first-scale-row-0-col-0').on('blur', function() {
        matrixTab('matrix-first-scale-row-0-col-0');
    });
    $('#matrix-first-scale-row-0-col-1').on('blur', function() {
        matrixTab('matrix-first-scale-row-0-col-1');
    });
    $('#matrix-first-scale-row-1-col-0').on('blur', function() {
        matrixTab('matrix-first-scale-row-1-col-0');
    });
    $('#matrix-first-scale-row-1-col-1').on('blur', function() {
        matrixTab('matrix-first-scale-row-1-col-1');
    });
    $('#matrix-first-translate-row-0-col-0').on('blur', function() {
        matrixTab('matrix-first-translate-row-0-col-0');
    });
    $('#matrix-first-translate-row-1-col-0').on('blur', function() {
        matrixTab('matrix-first-translate-row-1-col-0');
    });
    $('#matrix-second-scale-row-0-col-0').on('blur', function() {
        matrixTab('matrix-second-scale-row-0-col-0');
    });
    $('#matrix-second-scale-row-0-col-1').on('blur', function() {
        matrixTab('matrix-second-scale-row-0-col-1');
    });
    $('#matrix-second-scale-row-1-col-0').on('blur', function() {
        matrixTab('matrix-second-scale-row-1-col-0');
    });
    $('#matrix-second-scale-row-1-col-1').on('blur', function() {
        matrixTab('matrix-second-scale-row-1-col-1');
    });
    $('#matrix-second-translate-row-0-col-0').on('blur', function() {
        matrixTab('matrix-second-translate-row-0-col-0');
    });
    $('#matrix-second-translate-row-1-col-0').on('blur', function() {
        matrixTab('matrix-second-translate-row-1-col-0');
    });
}


/* Registers the handler function for when the user presses return */
// Solution from https://stackoverflow.com/questions/979662/how-to-detect-pressing-enter-on-keyboard-using-jquery
function registerEnterHandler() {
    $(document).on('keypress', function(key) {
        if(key.which == 13) {
            // Enter was pressed
            runEnterHandler();
        }
    });
}


/* If the currently active element is an input box, updates the shape and activates the next input box */
function runEnterHandler() {
    var activeElement = document.activeElement;
    var id = activeElement.id;
    var nextElementId = '';
    var elementVariable1;
    var elementVariable2;
    if (id.includes('-input-')) {
        // Element is a coordinate input
        // pN-input-V Where N is the node and V is x or y
        elementVariable1 = parseInt(id.substring(1, 2));    // N
        elementVariable2 = id.substring(9);                 // V

        var nextNode = elementVariable2 == 'x' ? elementVariable1 + 0 : elementVariable1 + 1;
        if (nextNode > 6) {
            nextNode = 0;
        }
        var nextAxis = elementVariable2 == 'x' ? 'y' : 'x';
        nextElementId = '#p' + nextNode + '-input-' + nextAxis;

        coordTab('c' + elementVariable1, elementVariable2);
        $(nextElementId).focus();

    } else if (id.includes('-row-')) {
        // Element is a matrix input
        // matrix-NAME-TYPE-row-X-col-Y Where NAME, TYPE specify which matrix it is, and (X,Y) is the box's location within the matrix
        if (id.includes('first')) {
            elementVariable1 = ['first', (id.includes('scale') ? 'scale' : 'translate')];
        } else {
            elementVariable1 = ['second', (id.includes('scale') ? 'scale' : 'translate')]
        }

        var indexRow = id.indexOf('row-');
        var indexCol = id.indexOf('col-');
        // The 4 and 5 here is to get the character immediately after the substring 'row-'/'col-'
        elementVariable2 = [id.substring(indexRow + 4, indexRow + 5), id.substring(indexCol + 4, indexCol + 5)]

        var nextBox = [parseInt(elementVariable2[0]), parseInt(elementVariable2[1])];
        if (elementVariable1[1] == 'scale') {
            // The matrix is 2x2
            nextBox[0] = nextBox[1] == 0 ? nextBox[0] : nextBox[0] + 1;
            if (nextBox[0] > 1) {
                nextBox[0] = 0;
            }
            nextBox[1] = nextBox[1] == 0 ? 1 : 0;
        } else {
            // The matrix is 2x1
            nextBox[0] = nextBox[0] == 0 ? 1 : 0;
        }
        nextElementId = '#matrix-' + elementVariable1[0] + '-' + elementVariable1[1] + '-row-' + nextBox[0] + '-col-' + nextBox[1];

        matrixTab(id);
        $(nextElementId).focus();
    }
}


/* Rebuilds grid and shapes on window resize */
window.onresize = function(event) {
    // recalculates size of grid and redraws shape and target shape
    setUpInterface();
    setUpInitialTargetShapePosition();
    drawTargetShape();
    if (configSettings.TYPE == 'matrix') {
        matrixOperations();
    } else {
        getNewCoordinates();
    }
}

/* on reset button click, draw the dynamic shape in its start position */
function reset() {
    setUpInitialDynamicShapePosition();
    drawShape();
    for (var i=0; i < 7; i++) {
        checkForValidInput('p' + i + '-input-x');
        checkForValidInput('p' + i + '-input-y');
    }
}

/* Saves information from config that is used later */
function saveConfig(config) {
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
    var shapeWidth = 3;
    var shapeHeight = 8;

    // offset used to center shape in grid
    var offset = (shapeHeight / 2) * squareSize;

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
    interfaceSettings.shapeWidth = shapeWidth;
    interfaceSettings.shapeHeight = shapeHeight;
    interfaceSettings.offset = offset;

    if (interfaceSettings.initialXIntercept == 0) {
        interfaceSettings.initialXIntercept = xIntercept;
        interfaceSettings.initialYIntercept = yIntercept;
    }

    drawBackground();
}


/* Assembles the interface based on the given config */
function assembleInterface(config) {
    switch(config) {
        case("coord-scale"):
            config = coord_scale; break;
        case("coord-scale-translate"):
            config = coord_scale_translate; break;
        case("coord-swap"):
            config = coord_swap; break;
        case("coord-translate"):
            config = coord_translate; break;
        case("matrix-rotate"):
            config = matrix_rotate; break;
        case("matrix-rotate-translate"):
            config = matrix_rotate_translate; break;
        case("matrix-rotate-scale-translate"):
            config = matrix_rotate_scale_translate; break;
        case("matrix-rotate-scale-translate-2"):
            config = matrix_rotate_scale_translate_2; break;
        case("matrix-rotate-translate"):
            config = matrix_rotate_translate; break;
        case("matrix-scale"):
            config = matrix_scale; break;
        case("matrix-scale-translate"):
            config = matrix_scale_translate; break;
        case("matrix-scale-translate-2"):
            config = matrix_scale_translate_2; break;
        case("matrix-scale-translate-3"):
            config = matrix_scale_translate_3; break;
        case("matrix-single"):
            config = matrix_single; break;
        case("matrix-translate"):
            config = matrix_translate; break;
        default:
            config = coord_translate;
            document.getElementById('config-dropdown').classList.remove('d-none'); break;
    }
    saveConfig(config);
    loadModules(config);
    setUpInitialDynamicShapePosition();
    setUpInitialTargetShapePosition();
    drawShape();
    drawTargetShape();
}

/* Draws the grid background by building css string */
function drawBackground() {
    var backgroundSizeFormat = interfaceSettings.xIntercept + 'px ' + interfaceSettings.yIntercept + 'px, ' +
        interfaceSettings.xIntercept + 'px ' + interfaceSettings.yIntercept + 'px, '
        + interfaceSettings.squareSize + 'px ' + interfaceSettings.squareSize + 'px, '
        + interfaceSettings.squareSize + 'px ' + interfaceSettings.squareSize + 'px';

    // Apply the background styling to the container element
    container.style.backgroundSize = backgroundSizeFormat;
}


// ########################################################################## //
/* Functions related to manipulating the shapes */

/* Creates and draws the dynamic shape */
function setUpInitialDynamicShapePosition() {
    // create the user's shape
    var shapeShape = generateShapeShape(configSettings.START_POSITION_STRING);
    // takes a copy of shapeShape list because otherwise pointers get in the way with updating the shape
    configSettings.START_POSITION = shapeShape.slice(0);
    currentState.currentPosition = shapeShape.slice(0);
    updateInputBoxes(configSettings.START_POSITION);
}


/* Creates and draws the target shape */
function setUpInitialTargetShapePosition() {
    configSettings.TARGET_POSITION = generateShapeShape(configSettings.TARGET_POSITION_STRING);
}


/* Translates string of coordinates into list of points with x and y attributes that fit in the svg coordinate space */
function generateShapeShape(pointString) {
    var xPos = 0;
    var yPos = 1;
    var shape = [];
    var points = pointString.split(' ');

    for (var i = 0; i < 7; i++) { // 7 points on an shape, each with x and y value

        var point = new Point();
        point.x = (points[xPos] * interfaceSettings.squareSize) + interfaceSettings.xIntercept;
        // have to multiply by -1 becuase y axis is reversed in the svg coordinate space
        point.y = (points[yPos] * interfaceSettings.squareSize * -1) + interfaceSettings.yIntercept;

        shape.push(point);

        xPos += 2;
        yPos += 2;
    }
    return shape;
}


/* Draws shape shape */
function drawTargetShape() {
    var point;

    for (var i = 0; i < 7; i++) { // 7 points on an shape, each with x and y value

        point = interfaceSettings.TARGET_POLYGON.points.getItem(i);
        point.x = configSettings.TARGET_POSITION[i].x;
        point.y = configSettings.TARGET_POSITION[i].y;
    }
}


/* Updates each coordinate in the shape */
function drawShape() {
    var point;
    var circle;

    for (var i = 0; i < 7; i++) { // 7 points on an shape
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
function instantUpdateCheck() {
    currentState.instantUpdate = $('#instant-update-check').is(':checked');
    return currentState.instantUpdate;
}


/* Returns true if the input with the given id is valid
 * false otherwise
 */
function checkForValidInput(id) {
    var value = document.getElementById(id).value;
    if (isNaN(value) || value == '') { // does not contain a valid number
        document.getElementById(id).classList.add('invalid');
        return false;
    } else {
        document.getElementById(id).classList.remove('invalid');
        return true;
    }
}


/* checks if shape position matches target position */
function checkForMatch() {
    var match = true;
    for (var i = 0; i < 7; i++) { // 7 points on shape
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
    for (var i = 0; i < 7; i++) { // 7 points on shape
        inputId = 'p' + i + '-input-x';
        document.getElementById(inputId).value = (points[i].x - interfaceSettings.xIntercept) / interfaceSettings.squareSize;
        inputId = 'p' + i + '-input-y';
        document.getElementById(inputId).value = ((points[i].y - interfaceSettings.yIntercept) / interfaceSettings.squareSize) * -1;
    }
}


/* Updates the input box based on its validity
 * Updates the dynamic shape if instant update is checked
 */
function coordTab(node, x_or_y) {
    var id = 'p' + node.split('')[1] + '-input-' + x_or_y;
    checkForValidInput(id);
    if (instantUpdateCheck()) {
        getNewCoordinates();
    }
}


/* Gets new coordinates from *all* input boxes
 * Triggered when user clicks "update" button
 */
function getNewCoordinates() {
    var inputId = '';

    for (var i = 0; i < 7; i++) { // 7 points on shape
        var newPoint = new Point();

        // Offsets the real value of the coordinate to give impression that centre of grid is position (0,0)
        inputId = 'p' + i + '-input-x';
        newPoint.x = (parseInt(document.getElementById(inputId).value) * interfaceSettings.squareSize) + interfaceSettings.xIntercept;
        inputId = 'p' + i + '-input-y';
        newPoint.y = (parseInt(document.getElementById(inputId).value) * -1 * interfaceSettings.squareSize) + interfaceSettings.yIntercept;

        currentState.currentPosition[i] = newPoint;
    }
    drawShape();
}


/* Highlights a point on the shape
 * Input: id of selected point
 */
function highlight(node) {
    circle = document.getElementById(node);
    circle.style.fill = '#FF1493';
}


/* Resets colour of point on the shape
 * Input: id of selected point
 */
function removeHighlight(node) {
    circle = document.getElementById(node);
    circle.style.fill = '#000';
}


/* Sets the given node to be the only one highlighted */
function setHighlight(node) {
    clearHighlights();
    highlight(node);
}


/* Clears all highlighted nodes */
function clearHighlights() {
    for (i=0; i<7; i++) { // there are 7 vertices in an shape
        removeHighlight('c' + i);
    }
}


// ########################################################################## //
/* Functions relating to manipulation by matrices */

/* Updates the input box based on its validity
 * Updates the dynamic shape if instant update is checked
 */
function matrixTab(id) {
    checkForValidInput(id);

    // round floats to two decimal places
    var num = $('#' + id).val();
    if (num.indexOf('.') != -1) { //is a float
        num = parseFloat(num).toFixed(2);
    }
    $('#' + id).val(num);

    if (instantUpdateCheck()) {
        matrixOperations();
    }
}


/* Sets up order of matrix operations and moves the shape to new position */
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

    drawShape();
}


/* Scale the shape according to the user's inputted matrix */
function scale(id, productMatrix) {
    currentState.scaleMatrix[0] = parseFloat(document.getElementById('matrix-' + id + '-scale-row-0-col-0').value);
    currentState.scaleMatrix[1] = parseFloat(document.getElementById('matrix-' + id + '-scale-row-0-col-1').value);
    currentState.scaleMatrix[2] = parseFloat(document.getElementById('matrix-' + id + '-scale-row-1-col-0').value);
    currentState.scaleMatrix[3] = parseFloat(document.getElementById('matrix-' + id + '-scale-row-1-col-1').value);

    for (var i = 0; i < 7; i++) { // 7 points on shape
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


/* Translate the shape according to the user's inputted matrix */
function translate(id, productMatrix) {
    currentState.translateMatrix[0] = parseFloat(document.getElementById('matrix-' + id + '-translate-row-0-col-0').value) * interfaceSettings.squareSize;
    currentState.translateMatrix[1] = parseFloat(document.getElementById('matrix-' + id + '-translate-row-1-col-0').value) * interfaceSettings.squareSize;

    for (var i = 0; i < 7; i++) { // 7 points on shape
        var newPoint = new Point();
        var currPoint = productMatrix[i];

        newPoint.x = currPoint.x + currentState.translateMatrix[0];// + interfaceSettings.xIntercept;
        newPoint.y = currPoint.y - currentState.translateMatrix[1];// + interfaceSettings.yIntercept;

        currentState.currentPosition[i] = newPoint;
    }
    return currentState.currentPosition;
}


/* Move the shape back to the start position and set the matrices to the default values */
function resetMatrices() {
    // place the shape back in the start position
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

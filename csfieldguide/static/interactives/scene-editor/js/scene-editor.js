/** Parts of this file are heavily adapted from https://github.com/mrdoob/three.js/blob/dev/examples/webgl_materials_envmaps.html */

global.THREE = require('three');
const { create, all } = require('mathjs');
const mathjs = create(all, {});
const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls.js');

const detector = require('../../../js/third-party/threejs/Detector.js');
const sprintf = require('sprintf-js').sprintf;
const urlParameters = require('../../../js/third-party/url-parameters.js');
const TeapotGeometry = require('../../../js/third-party/threejs/TeapotGeometry.js')(THREE);

const CANVAS_MAX_HEIGHT = 500; // Pixels
const image_base_path = base_static_path + 'interactives/scene-editor/img/bridge-';
const SCALE = 100; // Multiplier for translation distances

const ROW_TEMPLATE = "%s & %s & %s";
const MATRIX_TEMPLATE = "\\begin{bmatrix} %s \\\\ %s \\\\ %s \\end{bmatrix}";

const SCENE_SIZE = 10000;
const AXIS_LINE_THICKNESS = 4;
const CAMERA_FACTOR_FROM_NEW_OBJECT = 1.4;
const COLOUR_AXIS_X = 0xFF0000;
const COLOUR_AXIS_Y = 0x00FF00;
const COLOUR_AXIS_Z = 0x0000FF;

var container_element_parent;
var container_element;
var controls, camera, scene, renderer;
var suspect = null; // The object that the next transform will apply to
var screenObjectIds = {};
var screenObjectTransforms = {};

var numSpheres = 0;
var numCubes = 0;
var numCones = 0;
var numTeapots = 0;
var ID = 0;

var mode;
var isStartingShape;

// check that the browser is webgl compatible
if (! detector.Detector.webgl) detector.Detector.addGetWebGLMessage();

///////////////////////////////////////////////////////////////////////////////////////////

/**
* Below is adapted from https://mathjs.org/examples/browser/angle_configuration.html.html
* This is used to configure mathjs to accept degrees as input for trig functions.
*/

let replacements = {};

// the trigonometric functions that we are configuring to handle inputs of degrees instead of radians
const fns1 = [
    'sin', 'cos', 'tan', 'sec', 'cot', 'csc',
    'asin', 'acos', 'atan', 'atan2', 'acot', 'acsc', 'asec',
    'sinh', 'cosh', 'tanh', 'sech', 'coth', 'csch',
    'asinh', 'acosh', 'atanh', 'acoth', 'acsch', 'asech',
];

fns1.forEach(function(name) {
    const fn = mathjs[name]; // the original function

    const fnNumber = function (x) {
        // convert from degrees to radians
        return fn(x * (Math.PI / 180));
    }

    // create a typed-function which check the input types
    replacements[name] = mathjs.typed(name, {
        'number': fnNumber,
        'Array | Matrix': function (x) {
            return mathjs.map(x, fnNumber);
        }
    });
});

// import all replacements into math.js, override existing trigonometric functions
mathjs.import(replacements, {override: true});

/////////////////////////////// End of adapted file ///////////////////////////////

$(document).ready(function () {
    // Set globals
    container_element = document.getElementById('scene');
    container_element_parent = document.getElementById('scene-parent');

    rescaleCanvas();
    init();
    animate();
    rescaleCanvas();

    // mode = transform | translation | multiple | (default) scene-creation
    mode = urlParameters.getUrlParameter('mode');
    if (mode == "transform") {
        $("#matrix-container").removeClass('d-none');
        $("#eqtn-title").html(gettext('Transformation:'));
        $("#equation-container").removeClass('d-none');
    } else if (mode == "translation") {
        $("#vector-container").removeClass('d-none');
        $("#eqtn-title").html(gettext('Translation:'));
        $("#equation-container").removeClass('d-none');
        $("#paste-hint").addClass('d-none');
    } else if (mode == "multiple") {
        $("#matrix-container").removeClass('d-none');
        $(".plus-sign").removeClass('d-none');
        $("#vector-container").removeClass('d-none');
        $("#eqtn-title").html(gettext('Multiple matrices and vectors:'));
        $("#equation-container").removeClass('d-none').addClass('col-md-8');
        $("#applied-container").removeClass('d-none');
    } else {
        mode = "scene-creation";
        $("#object-container").removeClass('d-none');
        $("#matrix-container").removeClass('d-none').addClass('offset-1 d-inline');
        $(".plus-sign").removeClass('d-none').addClass('d-inline');
        $("#vector-container").removeClass('d-none').addClass('d-inline');
        $("#equation-container").removeClass('d-none').addClass('col-md-8');
        $("#eqtn-title").addClass('d-none');
        $("#scene-creation-title-area").removeClass('d-none');
        $("#delete-button").removeClass('d-none');
        $("#apply-delete-btn-container").addClass('offset-1');
        $("#paste-hint").addClass('offset-1');
    }

    $("#selectable-objects").on('change', switchFocus);
    $("#colour-input").on('input', recolourHashBox);

    $("#add-object").click(newObject);
    $("#apply-transformation").click(applyTransformation);
    $("#delete-button").click(deleteSuspect);

    $('.matrix-row input').on('keyup bind cut copy', function() {
        validateInput($(this));
    });
    $('.vector-row input').on('keyup bind cut copy', function() {
        validateInput($(this));
    });

    $("#colour-input").val('');
    $("#name-input").val('');

    $('.matrix-row input').on('paste', function() {
        var inputDiv = $(this)
        setTimeout(function() {
            populateInputsFromPaste(inputDiv);
        }, 0);
    });
    $('.vector-row input').on('paste', function() {
        var inputDiv = $(this)
        setTimeout(function() {
            populateInputsFromPaste(inputDiv);
        }, 0);
    });
});


/**
* Creates the new scene; skybox, lighting, camera and the initial object
*/
function init() {
    // Cameras
    camera = new THREE.PerspectiveCamera( 70, 16 / 9, 1, SCENE_SIZE * 10 );
    camera.position.set( 1500, 1000, 1500 );
    camera.lookAt( new THREE.Vector3(0, 0, 0) );

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Lights
    var ambient = new THREE.AmbientLight( 0xffffff, 0.9 );
    scene.add( ambient );
    var sunlight = new THREE.DirectionalLight( 0xffffff, 1 );
    sunlight.position.set(50, 100, 300); // Approximate vector towards sun in background image
    scene.add( sunlight );

    // Textures
    const loader = new THREE.CubeTextureLoader();
    const textureCube = loader.load([
        image_base_path + 'posx.jpg',
        image_base_path + 'negx.jpg',
        image_base_path + 'posy.jpg',
        image_base_path + 'negy.jpg',
        image_base_path + 'posz.jpg',
        image_base_path + 'negz.jpg',
    ]);
    textureCube.format = THREE.RGBAFormat;
    textureCube.mapping = THREE.CubeReflectionMapping;
    textureCube.encoding = THREE.sRGBEncoding;

    // Skybox
    scene.background = textureCube;

    // Initial object
    isStartingShape = true;
    var material = new THREE.MeshLambertMaterial( { envMap: textureCube } );
    addObject('teapot', material, '');

    //
    renderer = new THREE.WebGLRenderer();
    renderer.autoClear = false;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(container_element.offsetWidth, container_element.offsetHeight);
    container_element.appendChild( renderer.domElement );

    //
    controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 500;
    controls.maxDistance = SCENE_SIZE;
    controls.enablePan = false;
    controls.keys = {}; // Disable keyboard input

    // Grid
    var size = SCENE_SIZE;
    var divisions = 10;
    var colorCenterLine = 0xffffff;
    var colorGrid = 0xffffff;
    var gridHelper = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
    scene.add( gridHelper );

    // Axes
    addAxes(size);

    window.addEventListener( 'resize', rescaleCanvas, false );
}

/**
* Sets the canvas size appropriately, keeping an aspect ratio of 16:9
*/
function rescaleCanvas() {
    // The canvas is the only thing in this div, but leave some padding
    var width = container_element_parent.offsetWidth * 0.95;
    var height = width * 9 / 16;

    if (height >= CANVAS_MAX_HEIGHT) {
        height = CANVAS_MAX_HEIGHT;
        width = height / 9 * 16;
    }
    container_element.style.width = width + 'px';
    container_element.style.height = height + 'px';

    if (renderer) {
        renderer.setSize(width, height);
    }
}

/**
* Animation loop for the scene
*/
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

/**
* Adds lines to show the axes in the scene
* Code adapted from:
* https://soledadpenades.com/articles/three-js-tutorials/drawing-the-coordinate-axes/
* Updated using:
* https://sbcode.net/threejs/geometry-to-buffergeometry/
*/
function buildAxis( line_start, line_end, colorHex, dashed ) {
    let points = [
        line_start.clone(),
        line_end.clone(),
    ]
    let geometry = new THREE.BufferGeometry().setFromPoints(points);

    var material;
    if(dashed) {
        material = new THREE.LineDashedMaterial(
            {
                linewidth: AXIS_LINE_THICKNESS,
                color: colorHex,
                dashSize: AXIS_LINE_THICKNESS * 30,
                gapSize: AXIS_LINE_THICKNESS * 50,
            }
            );
        } else {
            material = new THREE.LineBasicMaterial(
                {
                    linewidth: AXIS_LINE_THICKNESS,
                    color: colorHex
                }
                );
            }

            let line = new THREE.Line(geometry, material);
            line.computeLineDistances();
            return line;
        }

/**
* Creates axes in the scene
*/
function addAxes(size) {
    // positive X axis
    var posX = buildAxis(
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( size, 0, 0 ),
        COLOUR_AXIS_X,
        false
    );
    // negative X axis
    var negX = buildAxis(
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( -size, 0, 0 ),
        COLOUR_AXIS_X,
        true // ... we want this axis to be dashed
    );

    // positive Y axis
    var posY = buildAxis(
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( 0, size, 0 ),
        COLOUR_AXIS_Y,
        false
    );
    // negative Y axis
    var negY = buildAxis(
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( 0, -size, 0 ),
        COLOUR_AXIS_Y,
        true // ... we want this axis to be dashed
    );

    // positive Z axis
    var posZ = buildAxis(
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( 0, 0, size ),
        COLOUR_AXIS_Z,
        false
    );
    // negative Z axis
    var negZ = buildAxis(
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( 0, 0, -size ),
        COLOUR_AXIS_Z,
        true // ... we want this axis to be dashed
    );

    scene.add( posX );
    scene.add( negX );
    scene.add( posY );
    scene.add( negY );
    scene.add( posZ );
    scene.add( negZ );
}

/**
* Parses user input for the type, name and colour of a new object, then adds it to the scene
*/
function newObject() {
    var objectType = $("#object-selection :selected").val();
    var name = $("#name-input").val();
    var colour = '0x' + $("#colour-input").val();
    if (colour == '0x') {
        colour = getRandomInt(0, 0xFFFFFF);
    } else {
        // This does not behave the same way as for HTML codes unless it is 6 digits
        colour = parseInt(colour);
        $("#colour-input").val(sixCharHex(colour)); // Show the real code for what was entered
    }
    var material = new THREE.MeshLambertMaterial( {color: colour} );
    addObject(objectType, material, name);
    $("#name-input").val('');
    updateTargetButtons();
};

/**
* Creates a new object in the scene with the following parameters:
*
* @param {*} type     Shape type; cube, cone, sphere etc
* @param {*} material A three.js material for the new object
* @param {*} name     A name for the dropdown menu; if this is an empty
*                     string a unique name will be generated,
*                     if null then the object is not intended for the user
*                     and will not be added to the list of selectable objects
*
* If the name already exists, this function will be called recursively with a
* plus symbol (+) appended to the name as a new name
*/
function addObject(type, material, name) {
    if (name in screenObjectIds) {
        // Object with that name/ID already exists
        addObject(type, material, name + '+');
        return;
    }
    var object;
    var geometry;
    switch (type) {
        case "sphere":
            geometry = new THREE.SphereGeometry( 200, 48, 24 );
            object = new THREE.Mesh( geometry, material );
            scene.add( object );
            numSpheres += 1;
            if (name == '') {
                object.name = gettext('Sphere ') + numSpheres;
            } else {
                object.name = name;
            }
            break;

        case "cube":
            geometry = new THREE.BoxGeometry(400, 400, 400 );
            object = new THREE.Mesh( geometry, material );
            scene.add( object );
            numCubes += 1;
            if (name == '') {
                object.name = gettext('Cube ') + numCubes;
            } else {
                object.name = name;
            }
            break;

        case "cone":
            geometry = new THREE.ConeGeometry( 200, 400, 32 );
            object = new THREE.Mesh( geometry, material );
            scene.add( object );
            numCones += 1;
            if (name == '') {
                object.name = gettext('Cone ') + numCones;
            } else {
                object.name = name;
            }
            break;

        case "teapot":
            geometry = new TeapotGeometry( 200 );
            object = new THREE.Mesh( geometry, material );
            scene.add( object );
            numTeapots += 1;
            if (name == '') {
                object.name = gettext('Teapot ') + numTeapots;
            } else {
                object.name = name;
            }
            break;
        default:
    return; // Not a valid shape
    }
    screenObjectIds[object.name] = 'obj' + (uniqueId());
    screenObjectTransforms[object.name] = [null, null];

    $("#selectable-objects").append("<option id='" + screenObjectIds[object.name] + "'>" + object.name + "</option>");

    if (!isStartingShape) {
        applyRandomTranslation(object);
    } else {
        isStartingShape = false;
    }
    setSuspect(object);
}

/**

* Shape is randomly shifted by a translation matrix.
*/
function applyRandomTranslation(object) {
    resetObject(object);
    var max = 10;
    var matrix4 = new THREE.Matrix4();

    var x = Math.floor(Math.random() * max) * posOrNegative();
    var y = Math.floor(Math.random() * max) * posOrNegative();
    var z = Math.floor(Math.random() * max) * posOrNegative();

    matrix4.makeTranslation(x * SCALE, y * SCALE, z * SCALE);
    object.applyMatrix4(matrix4);
    screenObjectTransforms[object.name] = [null, [x, y, z]];
}

/**
* Returns either 1 or -1 at random
*/
function posOrNegative() {
    return Math.random() < 0.5 ? -1 : 1;
}

/**
* Applies the user-submitted transform and/or translation to the suspect object
* in the scene
*/
function applyTransformation() {
    // Applied matrices need to be 4x4
    var matrix4 = new THREE.Matrix4();
    var transformMatrix;
    var translationVector;
    if (mode != "multiple") {
        resetObject(suspect);
    }

    if (mode == "transform") {
        // matrix only
        transformMatrix = getMatrix();
        matrix4.makeBasis(transformMatrix[0], transformMatrix[1], transformMatrix[2]);
        suspect.applyMatrix4(matrix4);

    } else if (mode == "translation") {
        // vector only
        translationVector = getVector();
        matrix4.makeTranslation(translationVector[0], translationVector[1], translationVector[2]);
        suspect.applyMatrix4(matrix4);

    } else if (mode == "multiple") {
        // One matrix and vector, but additive
        transformMatrix = getMatrix();
        translationVector = getVector();
        matrix4.makeBasis(transformMatrix[0], transformMatrix[1], transformMatrix[2]);
        if (!matrix4.equals(new THREE.Matrix4().identity())) {
            // Matrix is not the identity matrix (so there is a transform)
            suspect.applyMatrix4(matrix4);
            addAppliedTransform(getMatrix(true));
        }
        matrix4.makeTranslation(translationVector[0], translationVector[1], translationVector[2]);
        if (!matrix4.equals(new THREE.Matrix4().identity())) {
            // Matrix is not the identity matrix (so there is a translation)
            suspect.applyMatrix4(matrix4);
            addAppliedVector(getVector(true));
        }
        fillMatrices(true);

    } else if (mode == "scene-creation") {
        // one matrix and vector
        transformMatrix = getMatrix();
        translationVector = getVector();
        matrix4.makeBasis(transformMatrix[0], transformMatrix[1], transformMatrix[2]);
        suspect.applyMatrix4(matrix4);
        matrix4.makeTranslation(translationVector[0], translationVector[1], translationVector[2]);
        suspect.applyMatrix4(matrix4);
        screenObjectTransforms[suspect.name] = [getMatrix(true), getVector(true)];
    }
}

/**
* Ensures the given object is selected (in the dropdown) if applicable
* and sets up for the user to apply matrices to it
*/
function setSuspect(object) {
    if (suspect != null) {
        $("#" + screenObjectIds[suspect.name]).attr("selected", false);
    }
    suspect = object;
    $("#" + screenObjectIds[object.name]).attr("selected", true);

    if (mode != "multiple") {
        fillMatrices();
    }

    if (mode == "scene-creation") {
        $('#object-identifier').css({color: "#" + object.material.color.getHexString()});
    }
}

/**
* Removes the suspect from the scene, sets the most recently added object as the new suspect
*/
function deleteSuspect() {
    if (suspect === null) {
        return;
    }
    // Need to remove from: ID list, transforms list, user-facing selector, scene
    var name = suspect.name;
    $("#" + screenObjectIds[name]).remove();
    delete screenObjectIds[name];
    delete screenObjectTransforms[name];
    scene.remove(suspect);
    if ($("#selectable-objects > option").length > 0) {
        $("#selectable-objects").val($("#selectable-objects > option").last().val());
        switchFocus();
    } else {
        suspect = null;
    }
    updateTargetButtons();
}

/**
 * Update availability of apply and delete buttons.
 */
function updateTargetButtons() {
    if (suspect === null) {
        $('#apply-transformation').prop('disabled', true);
        $('#delete-button').prop('disabled', true);
    } else {
        $('#apply-transformation').prop('disabled', false);
        $('#delete-button').prop('disabled', false);
    }
}


/**
* Called when the user selects an object to focus on.
* Sets the selected object as the suspect
*/
function switchFocus() {
    var name = $("#selectable-objects").val();
    var object = scene.getObjectByName( name );
    setSuspect(object);
}

/**
* Returns an integer it hasn't returned before
* i.e. (the integer it returned last time + 1)
*/
function uniqueId() {
    ID++;
    return ID;
}

/**
* Sets the transform matrices in the interactive to the values used to transform the currently selected object.
* Only needed for scene-creation mode
*
* If isReset, the matrices will be returned to their original status' (identity matrices) instead
*/
function fillMatrices(isReset) {
    var transform = screenObjectTransforms[suspect.name][0];
    if (transform != null && !isReset) {
        // Transform to be added
        $('#matrix-row-0-col-0').val(transform[0][0]);
        $('#matrix-row-0-col-1').val(transform[0][1]);
        $('#matrix-row-0-col-2').val(transform[0][2]);

        $('#matrix-row-1-col-0').val(transform[1][0]);
        $('#matrix-row-1-col-1').val(transform[1][1]);
        $('#matrix-row-1-col-2').val(transform[1][2]);

        $('#matrix-row-2-col-0').val(transform[2][0]);
        $('#matrix-row-2-col-1').val(transform[2][1]);
        $('#matrix-row-2-col-2').val(transform[2][2]);
    } else {
        $('#matrix-row-0-col-0').val(1);
        $('#matrix-row-0-col-1').val(0);
        $('#matrix-row-0-col-2').val(0);

        $('#matrix-row-1-col-0').val(0);
        $('#matrix-row-1-col-1').val(1);
        $('#matrix-row-1-col-2').val(0);

        $('#matrix-row-2-col-0').val(0);
        $('#matrix-row-2-col-1').val(0);
        $('#matrix-row-2-col-2').val(1);

    }

    var translation = screenObjectTransforms[suspect.name][1];
    if (translation != null && !isReset) {
        // Translation to be added
        $('#vector-row-0').val(translation[0]);
        $('#vector-row-1').val(translation[1]);
        $('#vector-row-2').val(translation[2]);
    } else {
        $('#vector-row-0').val(0);
        $('#vector-row-1').val(0);
        $('#vector-row-2').val(0);
    }

    // Run the error-check
    $('.matrix-row input').trigger('keyup');
    $('.vector-row input').trigger('keyup');
}

/**
* Adds the given new matrix to the list of applied matrices, formatted appropriately with MathJax
*/
function addAppliedTransform(matrixStr) {
    var row1 = sprintf(ROW_TEMPLATE, matrixStr[0][0], matrixStr[1][0], matrixStr[2][0]);
    var row2 = sprintf(ROW_TEMPLATE, matrixStr[0][1], matrixStr[1][1], matrixStr[2][1]);
    var row3 = sprintf(ROW_TEMPLATE, matrixStr[0][2], matrixStr[1][2], matrixStr[2][2]);
    var newDiv = sprintf(MATRIX_TEMPLATE, row1, row2, row3);
    $("#applied-matrices").append(newDiv);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "applied-matrices"]); // typeset calculated result
}

/**
* Adds the given new vector to the list of applied matrices, formatted appropriately with MathJax
*/
function addAppliedVector(vectorStr) {
    var newDiv = sprintf(MATRIX_TEMPLATE, vectorStr[0], vectorStr[1], vectorStr[2]);
    $("#applied-matrices").append(newDiv);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "applied-matrices"]); // typeset calculated result
}

/**
* Sets the given object to the position [0, 0, 0], and removes any other tranformations
*/
function resetObject(object) {
    object.position.set( 0, 0, 0 );
    object.rotation.set( 0, 0, 0 );
    object.scale.set( 1, 1, 1 );
    object.updateMatrix();
}

/**
* Returns a list of Vector3 objects, each being a column of the user-submitted matrix
* If evalAsString is true, the values will be left as strings and a list of lists will be returned
*/
function getMatrix(evalAsString) {
    var col0, col1, col2;
    if (evalAsString) {
        col0 = [
            $('#matrix-row-0-col-0').val(),
            $('#matrix-row-1-col-0').val(),
            $('#matrix-row-2-col-0').val()
        ];

        col1 = [
            $('#matrix-row-0-col-1').val(),
            $('#matrix-row-1-col-1').val(),
            $('#matrix-row-2-col-1').val()
        ];

        col2 = [
            $('#matrix-row-0-col-2').val(),
            $('#matrix-row-1-col-2').val(),
            $('#matrix-row-2-col-2').val()
        ];

    } else {
        col0 = new THREE.Vector3(
            mathjs.evaluate($('#matrix-row-0-col-0').val()),
            mathjs.evaluate($('#matrix-row-1-col-0').val()),
            mathjs.evaluate($('#matrix-row-2-col-0').val())
        );

        col1 = new THREE.Vector3(
            mathjs.evaluate($('#matrix-row-0-col-1').val()),
            mathjs.evaluate($('#matrix-row-1-col-1').val()),
            mathjs.evaluate($('#matrix-row-2-col-1').val())
        );

        col2 = new THREE.Vector3(
            mathjs.evaluate($('#matrix-row-0-col-2').val()),
            mathjs.evaluate($('#matrix-row-1-col-2').val()),
            mathjs.evaluate($('#matrix-row-2-col-2').val())
            );
        }

    return [col0, col1, col2];
}

/**
* Returns a list of three values, the x, y & z components of the user-submitted vector
* If evalAsString is true, the values will be left as strings
*/
function getVector(evalAsString) {
    if (evalAsString) {
        return [
            $('#vector-row-0').val(),
            $('#vector-row-1').val(),
            $('#vector-row-2').val()
        ];
    }
    return [
        mathjs.evaluate($('#vector-row-0').val()) * SCALE,
        mathjs.evaluate($('#vector-row-1').val()) * SCALE,
        mathjs.evaluate($('#vector-row-2').val()) * SCALE
    ];
}

/**
* Sets the colour of the prepended '#' box to the hexadecimal colour code entered in the input
* Matches the behaviour of the colour chosen when the new object is created
* i.e. assumes the code is zero-extended to 6 characters, rather than
* following standard html colour code rules (such as that 3-digit codes are okay)
*/
function recolourHashBox() {
    var newColour = $("#colour-input").val();
    if (newColour == '') {
        $('#colour-input-label').css('background-color', '');
    } else {
        // sixCharHex to match the behaviour of the actual object
        $('#colour-input-label').css('background-color', '#' + sixCharHex(parseInt(newColour, 16)));
    }
}

/**
* Returns the string of an integer as a zero-extended 6-character hexadecimal value
* If the number is small, zeros will be appended to the front.
* If the number is too big, a larger than 6-character string will be returned
*/
function sixCharHex(num) {
    num = isNaN(num) ? 0 : num;
    var returnString = num.toString(16);
    if (returnString.length < 6) {
        return "0".repeat(6 - returnString.length) + returnString;
    } else {
        return returnString;
    }
}

/**
* Returns a random number between min and max _inclusive_
* From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
*/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
* Checks user input as they are typing into the matrices or if content is pasted in.
* Highlights input box red if the input is invalid and disables the apply button.
*/
function validateInput(inputDiv) {
    input = $(inputDiv).val();
    var success = false;
    try {
        inputEvaluated = mathjs.evaluate(input);
        mathjs.number(inputEvaluated);
        success = true;
    }
    catch {
        inputDiv.addClass('input-error');
        $('#apply-transformation').prop('disabled', true);
    }
    if (success) {
        inputDiv.removeClass('input-error');
    }
    // if there are no input errors, enable apply button
    if ($('.input-error').length == 0) {
        $('#apply-transformation').prop('disabled', false);
    }
}


/**
* Called on a paste event. Handles populating inputs copied from matrix simplifier
* or simply validates pasted input if it appears it hasn't been copied from
* matrix simplifier.
*/
function populateInputsFromPaste(inputDiv) {
    pastedData = inputDiv.val();
    // update both matrix and vector
    if (pastedData.includes('m,') && pastedData.includes(',v,')) {
        // likely to be copied from matrix-simplifier
        // Paste data into input boxes
        pastedData = pastedData.replace('m,', '');
        eqtnData = pastedData.split(',v,'); // splits into matrix and vector values
        matrixData = eqtnData[0].split(',');
        vectorData = eqtnData[1].split(',');

        $('#matrix-row-0-col-0').val(matrixData[0]);
        $('#matrix-row-0-col-1').val(matrixData[1]);
        $('#matrix-row-0-col-2').val(matrixData[2]);

        $('#matrix-row-1-col-0').val(matrixData[3]);
        $('#matrix-row-1-col-1').val(matrixData[4]);
        $('#matrix-row-1-col-2').val(matrixData[5]);

        $('#matrix-row-2-col-0').val(matrixData[6]);
        $('#matrix-row-2-col-1').val(matrixData[7]);
        $('#matrix-row-2-col-2').val(matrixData[8]);

        $('#vector-row-0').val(vectorData[0]);
        $('#vector-row-1').val(vectorData[1]);
        $('#vector-row-2').val(vectorData[2]);
    } else if (pastedData.includes('m,')) {
        // only update matrix
        pastedData = pastedData.replace('m,', '');
        matrixData = pastedData.split(',');

        $('#matrix-row-0-col-0').val(matrixData[0]);
        $('#matrix-row-0-col-1').val(matrixData[1]);
        $('#matrix-row-0-col-2').val(matrixData[2]);

        $('#matrix-row-1-col-0').val(matrixData[3]);
        $('#matrix-row-1-col-1').val(matrixData[4]);
        $('#matrix-row-1-col-2').val(matrixData[5]);

        $('#matrix-row-2-col-0').val(matrixData[6]);
        $('#matrix-row-2-col-1').val(matrixData[7]);
        $('#matrix-row-2-col-2').val(matrixData[8]);
    } else if (pastedData.includes('v,')) {
        // only update vector
        pastedData = pastedData.replace('v,', '');
        vectorData = pastedData.split(',');
        $('#vector-row-0').val(vectorData[0]);
        $('#vector-row-1').val(vectorData[1]);
        $('#vector-row-2').val(vectorData[2]);
    }
    // Run the error-check
    $('.matrix-row input').trigger('keyup');
    $('.vector-row input').trigger('keyup');
}

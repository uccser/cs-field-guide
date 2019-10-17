/** Parts of this file are heavily adapted from https://github.com/mrdoob/three.js/blob/dev/examples/webgl_materials_envmaps.html */

const THREE = require('three');
const mathjs = require('mathjs');
const OrbitControls = require('three-orbit-controls')(THREE);
const detector = require('../../../js/third-party/threejs/Detector.js');
const sprintf = require('sprintf-js').sprintf;
const urlParameters = require('../../../js/third-party/url-parameters.js');
const TeapotBufferGeometry = require('../../../js/third-party/threejs/TeapotBufferGeometry.js')(THREE);

const image_base_path = base_static_path + 'interactives/scene-editor/img/bridge-';
const SCALE = 100; // Multiplier for translation distances
const CAMERA_POINTERID = "thisobjectmarksthepointthecameraorbitsaround" // Longer than 20 characters as 20 is the limit for user input

const ROW_TEMPLATE = "%s & %s & %s";
const MATRIX_TEMPLATE = "\\begin{bmatrix} %s \\\\ %s \\\\ %s \\end{bmatrix}";

const COLOUR_AXIS_X = 0xFF0000;
const COLOUR_AXIS_Y = 0x00FF00;
const COLOUR_AXIS_Z = 0x0000FF;

var controls, camera, scene, renderer;
var cameraCube, sceneCube;
var textureCube;
var cubeMesh;
var cameraPointer;
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

// only show equations once they are rendered
// URL for mathjax script loaded from CDN
var mjaxURL  = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML,Safe.js';
// load mathjax script
$.getScript(mjaxURL);

rescaleCanvas();
init();
animate();
rescaleCanvas();

$(document).ready(function () {
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
  camera = new THREE.PerspectiveCamera( 70, 16 / 9, 1, 100000 );
  camera.position.set( 1000, 500, 1000 );
  cameraCube = new THREE.PerspectiveCamera( 70, 16 / 9, 1, 100000 );
  camera.lookAt( new THREE.Vector3(0, 0, 0) );
  // Scene
  scene = new THREE.Scene();
  sceneCube = new THREE.Scene();
  // Lights
  var ambient = new THREE.AmbientLight( 0xffffff, 0.3 );
  scene.add( ambient );
  var sunlight = new THREE.DirectionalLight( 0xffffff, 1 )
  sunlight.position.set(50, 100, 300); // Approximate vector towards sun in background image
  scene.add( sunlight );
  // Textures
  var urls = [ 
    image_base_path + "posx.jpg", image_base_path + "negx.jpg",
    image_base_path + "posy.jpg", image_base_path + "negy.jpg",
    image_base_path + "posz.jpg", image_base_path + "negz.jpg" 
  ];
  textureCube = new THREE.CubeTextureLoader().load( urls );
  textureCube.format = THREE.RGBFormat;
  textureCube.mapping = THREE.CubeReflectionMapping;
  textureCube.encoding = THREE.sRGBEncoding;

  var cubeShader = THREE.ShaderLib[ "cube" ];
  var cubeMaterial = new THREE.ShaderMaterial( {
    fragmentShader: cubeShader.fragmentShader,
    vertexShader: cubeShader.vertexShader,
    uniforms: cubeShader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  } );
  cubeMaterial.uniforms[ "tCube" ].value = textureCube;
  Object.defineProperty( cubeMaterial, 'map', {
    get: function () {
      return this.uniforms.tCube.value;
    }
  } );
  // Skybox
  cubeMesh = new THREE.Mesh( new THREE.BoxBufferGeometry( 100, 100, 100 ), cubeMaterial );
  sceneCube.add( cubeMesh );
  // Initial object
  isStartingShape = true;
  var material = new THREE.MeshLambertMaterial( { envMap: textureCube } );
  addObject('teapot', material, '');
  // Camera orbit pointer
  addObject('tinyaxis', null, null);
  cameraPointer = scene.getObjectByName( CAMERA_POINTERID )
  //
  renderer = new THREE.WebGLRenderer();
  renderer.autoClear = false;
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  var container = document.getElementById('scene');
  container.appendChild( renderer.domElement );
  renderer.gammaOutput = true;
  //
  controls = new OrbitControls( camera, renderer.domElement );
  controls.minDistance = 500;
  controls.maxDistance = 10000;
  controls.keys = {}; // Disable keyboard input
  // Grid
  var size = 10000;
  var divisions = 10;
  var colorCenterLine = 0xffffff;
  var colorGrid = 0xffffff;
  var gridHelper = new THREE.GridHelper( size, divisions, colorCenterLine, colorGrid );
  scene.add( gridHelper );
  // Axes
  addAxes(size);

  window.addEventListener( 'resize', rescaleCanvas, false );
}

/**
 * Sets the canvas size appropriately, keeping an aspect ratio of 16:9
 */
function rescaleCanvas() {
  var canvas = $('#scene'); // canvas is the only thing in this div
  canvas.width(window.innerWidth - (window.innerWidth / 10)); // Leave some padding
  canvas.height(canvas.width() * 9 / 16);
}

/**
 * Animation loop for the scene
 */
function animate() {
  requestAnimationFrame( animate );
  var cameraTarget = controls.target;
  cameraPointer.position.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);
  var distance = camera.position.distanceTo(cameraTarget);
  var scaleFactor = distance / (500 * SCALE); // Keep a constant size relative to the user
  cameraPointer.scale.set( scaleFactor, scaleFactor, scaleFactor );
  render();
}

/**
 * Renders the scene during the animation loop
 */
function render() {
  cameraCube.rotation.copy( camera.rotation );
  renderer.render( sceneCube, cameraCube );
  renderer.render( scene, camera );
}

/**
 * Adds lines to show the axes in the scene
 * Code taken from https://soledadpenades.com/articles/three-js-tutorials/drawing-the-coordinate-axes/
 */
function buildAxis( src, dst, colorHex, dashed ) {
  var geom = new THREE.Geometry();
  var mat;

  if(dashed) {
    mat = new THREE.LineDashedMaterial({ linewidth: 5, color: colorHex, dashSize: 25, gapSize: 50 });
  } else {
    mat = new THREE.LineBasicMaterial({ linewidth: 5, color: colorHex });
  }

  geom.vertices.push( src.clone() );
  geom.vertices.push( dst.clone() );

  var axis = new THREE.Line( geom, mat, THREE.LineSegments );
  axis.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

  return axis;
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
    // TODO: nicer solution
    addObject(type, material, name + '+');
    return;
  }
  var object;
  var geometry;
  switch (type) {
    case "sphere":
      geometry = new THREE.SphereBufferGeometry( 200, 48, 24 );
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
      geometry = new THREE.BoxBufferGeometry(400, 400, 400 );
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
      geometry = new THREE.ConeBufferGeometry( 200, 400, 32 );
      object = new THREE.Mesh( geometry, material );
      scene.add( object );
      numCones += 1;
      if (name == '') {
        object.name = gettext('Cone ') + numCones;
      } else {
        object.name = name;
      }
      break;
    case "tinyaxis":
      name = null; // Name should always be null for this object as it will never be presented for user-manipulation
      object = createTinyaxisMesh();
      scene.add( object );
      break;
    case "teapot":
      geometry = new TeapotBufferGeometry( 200 );
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
  if (name == null) {
    object.name = CAMERA_POINTERID;
  }
  screenObjectIds[object.name] = 'obj' + (uniqueId());
  screenObjectTransforms[object.name] = [null, null];
  if (name != null) {
    $("#selectable-objects").append("<option id='" + screenObjectIds[object.name] + "'>" + object.name + "</option>");
    applyRandomTranslation(object);
    setSuspect(object);
  }
}

/**
 * The initial shape is left alone.
 * Any subsequent shape is randomly shifted by a translation matrix 
 */
function applyRandomTranslation(object) {
  if (!isStartingShape) {
    // Not the starting shape, so do move
    resetObject(object);
    var max = 30;
    var matrix4 = new THREE.Matrix4();

    var x = Math.floor(Math.random() * Math.floor(max)) * posOrNegative();
    var y = Math.floor(Math.random() * Math.floor(max)) * posOrNegative();
    var z = Math.floor(Math.random() * Math.floor(max)) * posOrNegative();

    matrix4.makeTranslation(x * SCALE, y * SCALE, z * SCALE);
    object.applyMatrix(matrix4);
    screenObjectTransforms[object.name] = [null, [x, y, z]];
  } else {
    isStartingShape = false;
  }
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
    suspect.applyMatrix(matrix4);

  } else if (mode == "translation") {
    // vector only
    translationVector = getVector();
    matrix4.makeTranslation(translationVector[0], translationVector[1], translationVector[2]);
    suspect.applyMatrix(matrix4);

  } else if (mode == "multiple") {
    // One matrix and vector, but additive
    transformMatrix = getMatrix();
    translationVector = getVector();
    matrix4.makeBasis(transformMatrix[0], transformMatrix[1], transformMatrix[2]);
    if (!matrix4.equals(new THREE.Matrix4().identity())) {
      // Matrix is not the identity matrix (so there is a transform)
      suspect.applyMatrix(matrix4);
      addAppliedTransform(getMatrix(true));
    }
    matrix4.makeTranslation(translationVector[0], translationVector[1], translationVector[2]);
    if (!matrix4.equals(new THREE.Matrix4().identity())) {
      // Matrix is not the identity matrix (so there is a translation)
      suspect.applyMatrix(matrix4);
      addAppliedVector(getVector(true));
    }
    fillMatrices(true);

  } else if (mode == "scene-creation") {
    // one matrix and vector
    transformMatrix = getMatrix();
    translationVector = getVector();
    matrix4.makeBasis(transformMatrix[0], transformMatrix[1], transformMatrix[2]);
    suspect.applyMatrix(matrix4);
    matrix4.makeTranslation(translationVector[0], translationVector[1], translationVector[2]);
    suspect.applyMatrix(matrix4);
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
      mathjs.eval($('#matrix-row-0-col-0').val()),
      mathjs.eval($('#matrix-row-1-col-0').val()),
      mathjs.eval($('#matrix-row-2-col-0').val())
    );

    col1 = new THREE.Vector3(
      mathjs.eval($('#matrix-row-0-col-1').val()),
      mathjs.eval($('#matrix-row-1-col-1').val()),
      mathjs.eval($('#matrix-row-2-col-1').val())
    );

    col2 = new THREE.Vector3(
      mathjs.eval($('#matrix-row-0-col-2').val()),
      mathjs.eval($('#matrix-row-1-col-2').val()),
      mathjs.eval($('#matrix-row-2-col-2').val())
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
    mathjs.eval($('#vector-row-0').val()) * SCALE,
    mathjs.eval($('#vector-row-1').val()) * SCALE,
    mathjs.eval($('#vector-row-2').val()) * SCALE
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
    inputEvaluated = mathjs.eval(input);
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
 * Returns the Mesh for a little xyz axis, to show the position the camera is orbiting
 */
function createTinyaxisMesh() {
  var diameter = 50
  var baseLength = 2000 + diameter;
  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    // central cube
    new THREE.Vector3(-1 * diameter, diameter, diameter),           // 0
    new THREE.Vector3(diameter, diameter, diameter),                // 1
    new THREE.Vector3(-1 * diameter, diameter, -1 * diameter),      // 2
    new THREE.Vector3(diameter, diameter, -1 * diameter),           // 3
    new THREE.Vector3(-1 * diameter, -1 * diameter, diameter),      // 4
    new THREE.Vector3(diameter, -1 * diameter, diameter),           // 5
    new THREE.Vector3(-1 * diameter, -1 * diameter, -1 * diameter), // 6
    new THREE.Vector3(diameter, -1 * diameter, -1 * diameter),      // 7

    // Z-axis branch ([0, 1, 4, 5] to [8, 9, 10, 11])
    new THREE.Vector3(-1 * diameter, diameter, baseLength),         // 8
    new THREE.Vector3(diameter, diameter, baseLength),              // 9
    new THREE.Vector3(-1 * diameter, -1 * diameter, baseLength),    // 10
    new THREE.Vector3(diameter, -1 * diameter, baseLength),         // 11

    // x-axis branch ([1, 3, 5, 7] to [12, 13, 14, 15])
    new THREE.Vector3(baseLength, diameter, diameter),              // 12
    new THREE.Vector3(baseLength, diameter, -1 * diameter),         // 13
    new THREE.Vector3(baseLength, -1 * diameter, diameter),         // 14
    new THREE.Vector3(baseLength, -1 * diameter, -1 * diameter),    // 15

    // y-axis branch ([0, 1, 2, 3] to [16, 17, 18, 19])
    new THREE.Vector3(-1 * diameter, baseLength, diameter),         // 16
    new THREE.Vector3(diameter, baseLength, diameter),              // 17
    new THREE.Vector3(-1 * diameter, baseLength, -1 * diameter),    // 18
    new THREE.Vector3(diameter, baseLength, -1 * diameter),         // 19
  )
  geometry.faces.push(
    // Outward faces of the central cube (as triangles)
    new THREE.Face3(2, 3, 7),   // -z facing
    new THREE.Face3(2, 7, 6),
    new THREE.Face3(0, 2, 6),   // -x facing
    new THREE.Face3(0, 6, 4),
    new THREE.Face3(5, 4, 6),   // -y facing
    new THREE.Face3(5, 6, 7),

    // Outward faces of the z-axis branch
    new THREE.Face3(9, 8, 10),  // +z facing
    new THREE.Face3(9, 10, 11),
    new THREE.Face3(1, 9, 11),  // +x facing
    new THREE.Face3(1, 11, 5),
    new THREE.Face3(8, 0, 4),   // -x facing
    new THREE.Face3(8, 4, 10),
    new THREE.Face3(1, 0, 8),   // +y facing
    new THREE.Face3(1, 8, 9),
    new THREE.Face3(11, 10, 4), // -y facing
    new THREE.Face3(11, 4, 5),

    // Outward faces of the x-axis branch
    new THREE.Face3(13, 12, 14), // +x facing
    new THREE.Face3(13, 14, 15),
    new THREE.Face3(12, 1, 5),   // +z facing
    new THREE.Face3(12, 5, 14),
    new THREE.Face3(3, 13, 15),  // -z facing
    new THREE.Face3(3, 15, 7),
    new THREE.Face3(13, 3, 1),   // +y facing
    new THREE.Face3(13, 1, 12),
    new THREE.Face3(7, 15, 14),  // -y facing
    new THREE.Face3(7, 14, 5),

    // Outward faces of y-axis branch
    new THREE.Face3(19, 18, 16), // +y facing
    new THREE.Face3(19, 16, 17),
    new THREE.Face3(17, 16, 0),  // +z facing
    new THREE.Face3(17, 0, 1),
    new THREE.Face3(18, 19, 3),  // -z facing
    new THREE.Face3(18, 3, 2),
    new THREE.Face3(19, 17, 1),  // +x facing
    new THREE.Face3(19, 1, 3),
    new THREE.Face3(16, 18, 2),  // -x facing
    new THREE.Face3(16, 2, 0),
  )
  var len = geometry.faces.length;
  for (var i=0; i < len; i+=2) {
    if (i < 6) {
      // Central cube faces
      if (i < 1) {
        // -z face
        geometry.faces[i].color = geometry.faces[i + 1].color = new THREE.Color(COLOUR_AXIS_Z);
      } else if (i < 3) {
        // -x face
        geometry.faces[i].color = geometry.faces[i + 1].color = new THREE.Color(COLOUR_AXIS_X);
      } else {
        // -y face
        geometry.faces[i].color = geometry.faces[i + 1].color = new THREE.Color(COLOUR_AXIS_Y);
      }
    } else if (i < 16) {
      // z-axis branch
      geometry.faces[i].color = geometry.faces[i + 1].color = new THREE.Color(COLOUR_AXIS_Z);
    } else if (i < 26) {
      // x-axis branch
      geometry.faces[i].color = geometry.faces[i + 1].color = new THREE.Color(COLOUR_AXIS_X);
    } else {
      // y-axis branch
      geometry.faces[i].color = geometry.faces[i + 1].color = new THREE.Color(COLOUR_AXIS_Y);
    }
  }

  var material = new THREE.MeshBasicMaterial( {vertexColors: THREE.FaceColors} );
  var object = new THREE.Mesh( geometry, material );
  return object;
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

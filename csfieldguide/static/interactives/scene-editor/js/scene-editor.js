/** Parts of this file are heavily adapted from https://github.com/mrdoob/three.js/blob/dev/examples/webgl_materials_envmaps.html */

const THREE = require('three');
const mathjs = require('mathjs');
const OrbitControls = require('three-orbit-controls')(THREE);
const detector = require('../../../js/third-party/threejs/Detector.js');
const sprintf = require('sprintf-js').sprintf;
const urlParameters = require('../../../js/third-party/url-parameters.js');

const image_base_path = base_static_path + 'interactives/scene-editor/img/bridge-';
const SCALE = 100; // Multiplier for translation distances

const ROW_TEMPLATE = "%s & %s & %s";
const MATRIX_TEMPLATE = "\\begin{bmatrix} %s \\\\ %s \\\\ %s \\end{bmatrix}";

var controls, camera, scene, renderer;
var cameraCube, sceneCube;
var textureCube;
var cubeMesh;
var suspect = null; // The object that the next transform will apply to
var screenObjectIds = {};
var screenObjectTransforms = {};

var numSpheres = 0;
var numCubes = 0;
var numCones = 0;
var ID = 0;

var mode;
var isStartingShape;

// check that the browser is webgl compatible
if (! detector.Detector.webgl) detector.Detector.addGetWebGLMessage();

// only show equations once they are rendered
// URL for mathjax script loaded from CDN
var mjaxURL  = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML,Safe.js';
// load mathjax script
$.getScript(mjaxURL, function() {
    // mathjax successfully loaded, let it render
    //showOutput();
});

init();
animate();

$(document).ready(function () {
  // mode = transform | translation | multiple | (default) scene-creation
  mode = urlParameters.getUrlParameter('mode');
  if (mode == "transform") {
    $("#matrix-container").removeClass('d-none');
    $("#eqtn-title").html(gettext('Transformation for sphere:'));
    $("#equation-container").removeClass('d-none');
  } else if (mode == "translation") {
    $("#vector-container").removeClass('d-none');
    $("#eqtn-title").html(gettext('Translation for sphere:'));
    $("#equation-container").removeClass('d-none');
  } else if (mode == "multiple") {
    $("#matrix-container").removeClass('d-none');
    $(".plus-sign").removeClass('d-none');
    $("#vector-container").removeClass('d-none');
    $("#eqtn-title").html(gettext('Multiple matrices and vectors:'));
    $("#equation-container").removeClass('col-12 d-none').addClass('col-8');
    $("#applied-container").removeClass('d-none');
  } else {
    mode = "scene-creation";
    $("#object-container").removeClass('d-none');
    $("#matrix-container").removeClass('d-none').addClass('offset-1 d-inline');
    $(".plus-sign").removeClass('d-none').addClass('d-inline');
    $("#vector-container").removeClass('d-none').addClass('d-inline');
    $("#equation-container").removeClass('col-12 d-none').addClass('col-8');
    $("#eqtn-title").addClass('d-none');
    $("#scene-creation-title-area").removeClass('d-none');
  }

  $("#selectable-objects").on('change', switchFocus);
  $("#colour-input").on('input', recolourHashBox);

  $("#add-object").click(newObject);
  $("#apply-transformation").click(applyTransformation);

  $("#colour-input").val('');
  $("#name-input").val('');
});

function init() {
  // Cameras
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
  camera.position.set( 1000, 500, 1000 );
  cameraCube = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
  // Scene
  scene = new THREE.Scene();
  sceneCube = new THREE.Scene();
  // Lights
  var ambient = new THREE.AmbientLight( 0xffffff );
  scene.add( ambient );
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
  // Sphere object
  isStartingShape = true;
  sphereMaterial = new THREE.MeshLambertMaterial( { envMap: textureCube } );
  addObject('sphere', sphereMaterial, '');
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
  controls.enablePan = false; // Disables some wacky behaviour from panning while forced to look at the origin

  // Grid
  var size = 10000;
  var divisions = 10;
  var colorCenterLine = 0xffffff;
  var colorGrid = 0xffffff;
  var gridHelper = new THREE.GridHelper( size, divisions, colorCenterLine, colorGrid );
  scene.add( gridHelper );
  // Axes
  addAxes(size);

  window.addEventListener( 'resize', onWindowResize, false );
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  cameraCube.aspect = window.innerWidth / window.innerHeight;
  cameraCube.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}


//
function animate() {
  requestAnimationFrame( animate );
  render();
}


function render() {
  camera.lookAt( scene.position );
  cameraCube.rotation.copy( camera.rotation );
  renderer.render( sceneCube, cameraCube );
  renderer.render( scene, camera );
}


// code taken from https://soledadpenades.com/articles/three-js-tutorials/drawing-the-coordinate-axes/
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


function addAxes(size) {
  // positive X axis
  var posX = buildAxis(
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( size, 0, 0 ),
    0xFF0000,
    false
  );
  // negative X axis
  var negX = buildAxis(
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( -size, 0, 0 ),
    0xFF0000,
    true // ... we want this axis to be dashed
  );

  // positive Y axis
  var posY = buildAxis(
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 0, size, 0 ),
    0x00FF00,
    false
  );
  // negative Y axis
  var negY = buildAxis(
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 0, -size, 0 ),
    0x00FF00,
    true // ... we want this axis to be dashed
  );

  // positive Z axis
  var posZ = buildAxis(
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 0, 0, size ),
    0x0000FF,
    false
  );
  // negative Z axis
  var negZ = buildAxis(
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 0, 0, -size ),
    0x0000FF,
    true // ... we want this axis to be dashed
  );

  scene.add( posX );
  scene.add( negX );
  scene.add( posY );
  scene.add( negY );
  scene.add( posZ );
  scene.add( negZ );
}

function newObject() {
  var objectType = $("#object-selection :selected").val();
  var name = $("#name-input").val();
  var colour = '0x' + $("#colour-input").val();
  if (colour == '0x') {
    colour = getRandomInt(0, 0xFFFFFF);
  } else {
    colour = parseInt(colour);
    $("#colour-input").val(sixCharHex(colour)); // Show the real code for what was entered
  }
  var material = new THREE.MeshLambertMaterial( {color: colour} );
  addObject(objectType, material, name);
  $("#name-input").val('');
};

function addObject(type, givenMaterial, name) {
  if (name in screenObjectIds) {
    // Object with that name/ID already exists
    // TODO: nicer solution
    addObject(type, givenMaterial, name + '+');
    return;
  }
  switch (type) {
    case "sphere":
      var geometry = new THREE.SphereBufferGeometry( 200, 48, 24 );
      var sphere = new THREE.Mesh( geometry, givenMaterial );
      scene.add( sphere );
      numSpheres += 1;
      if (name == '') {
        sphere.name = gettext('Sphere ') + numSpheres;
      } else {
        sphere.name = name;
      }
      screenObjectIds[sphere.name] = 'obj' + (uniqueId());
      screenObjectTransforms[sphere.name] = [null, null];
      $("#selectable-objects").append("<option id='" + screenObjectIds[sphere.name]+ "'>" + sphere.name + "</option>");
      applyRandomTranslation(sphere);
      setSuspect(sphere);
      break;

    case "cube":
      var geometry = new THREE.BoxBufferGeometry(400, 400, 400 );
      var cube = new THREE.Mesh( geometry, givenMaterial );
      scene.add( cube );
      numCubes += 1;
      if (name == '') {
        cube.name = gettext('Cube ') + numCubes;
      } else {
        cube.name = name;
      }
      screenObjectIds[cube.name] = 'obj' + (uniqueId());
      screenObjectTransforms[cube.name] = [null, null];
      $("#selectable-objects").append("<option id='" + screenObjectIds[cube.name] + "'>" + cube.name + "</option>");
      applyRandomTranslation(cube);
      setSuspect(cube);
      break;

    case "cone":
      var geometry = new THREE.ConeBufferGeometry( 200, 400, 32 );
      var cone = new THREE.Mesh( geometry, givenMaterial );
      scene.add( cone );
      numCones += 1;
      if (name == '') {
        cone.name = gettext('Cone ') + numCones;
      } else {
        cone.name = name;
      }
      screenObjectIds[cone.name] = 'obj' + (uniqueId());
      screenObjectTransforms[cone.name] = [null, null];
      $("#selectable-objects").append("<option id='" + screenObjectIds[cone.name] + "'>" + cone.name + "</option>");
      applyRandomTranslation(cone);
      setSuspect(cone);
      break;
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

    var x = Math.floor(Math.random() * Math.floor(max)) * posOrNegative() * SCALE;
    var y = Math.floor(Math.random() * Math.floor(max)) * posOrNegative() * SCALE;
    var z = Math.floor(Math.random() * Math.floor(max)) * posOrNegative() * SCALE;

    matrix4.makeTranslation(x, y, z);
    object.applyMatrix(matrix4);
    screenObjectTransforms[object.name] = [null, [x, y, z]];
  } else {
    isStartingShape = false;
  }
}


// returns either 1 or -1
function posOrNegative() {
  return Math.random() < 0.5 ? -1 : 1;
}


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
    // multiple matrices and vectors
    transformMatrix = getMatrix();
    translationVector = getVector();
    matrix4.makeBasis(transformMatrix[0], transformMatrix[1], transformMatrix[2]);
    if (!matrix4.equals(new THREE.Matrix4().identity())) {
      // Matrix is not the identity matrix (so there is a transform)
      suspect.applyMatrix(matrix4);
      addAppliedTransform(transformMatrix);
    }
    matrix4.makeTranslation(translationVector[0], translationVector[1], translationVector[2]);
    if (!matrix4.equals(new THREE.Matrix4().identity())) {
      // Matrix is not the identity matrix (so there is a translation)
      suspect.applyMatrix(matrix4);
      addAppliedVector(translationVector);
    }
    fillMatrices(true);

  } else if (mode == "scene-creation") {
    // one matrix and vector
    transformMatrix = getMatrix();
    translationVector = getVector();
    screenObjectTransforms[suspect.name] = [transformMatrix, translationVector];
    matrix4.makeBasis(transformMatrix[0], transformMatrix[1], transformMatrix[2]);
    suspect.applyMatrix(matrix4);
    matrix4.makeTranslation(translationVector[0], translationVector[1], translationVector[2]);
    suspect.applyMatrix(matrix4);

  }
}

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
    $('#object-identifier').css({color: "#" + object.material.color.getHexString()}).html("&#x25D9;");
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
 * Returns an integer it hasn't returned before.
 */
function uniqueId() {
  ID++;
  return ID;
}

/**
 * Sets the transform matrices in the interactive to the values used to transform the currently selected object.
 * Unavailable in multple transformations mode, but only needed for scene-creation mode
 * 
 * If isReset, the matrices will be returned to their original status'
 */
function fillMatrices(isReset) {
  var transform = screenObjectTransforms[suspect.name][0];
  if (transform != null && !isReset) {
    // Transform to be added
    $('#matrix-row-0-col-0').val(transform[0].x);
    $('#matrix-row-0-col-1').val(transform[0].y);
    $('#matrix-row-0-col-2').val(transform[0].z);

    $('#matrix-row-1-col-0').val(transform[1].x);
    $('#matrix-row-1-col-1').val(transform[1].y);
    $('#matrix-row-1-col-2').val(transform[1].z);

    $('#matrix-row-2-col-0').val(transform[2].x);
    $('#matrix-row-2-col-1').val(transform[2].y);
    $('#matrix-row-2-col-2').val(transform[2].z);
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
    $('#vector-row-0').val(translation[0] / SCALE);
    $('#vector-row-1').val(translation[1] / SCALE);
    $('#vector-row-2').val(translation[2] / SCALE);
  } else {
    $('#vector-row-0').val(0);
    $('#vector-row-1').val(0);
    $('#vector-row-2').val(0);
  }
}

function addAppliedTransform(matrix) {
  var row1 = sprintf(ROW_TEMPLATE, matrix[0].x, matrix[1].x, matrix[2].x);
  var row2 = sprintf(ROW_TEMPLATE, matrix[0].y, matrix[1].y, matrix[2].y);
  var row3 = sprintf(ROW_TEMPLATE, matrix[0].z, matrix[1].z, matrix[2].z);
  var newDiv = sprintf(MATRIX_TEMPLATE, row1, row2, row3);
  $("#applied-container").append(newDiv);
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, "applied-container"]); // typeset calculated result
}

function addAppliedVector(vector) {
  var newDiv = sprintf(MATRIX_TEMPLATE, vector[0] / SCALE, vector[1] / SCALE, vector[2] / SCALE);
  $("#applied-container").append(newDiv);
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, "applied-container"]); // typeset calculated result
}

function resetObject(object) {
  object.position.set( 0, 0, 0 );
  object.rotation.set( 0, 0, 0 );
  object.scale.set( 1, 1, 1 );
  object.updateMatrix();
}

function getMatrix() {
  var col0 = new THREE.Vector3(
    mathjs.eval($('#matrix-row-0-col-0').val()),
    mathjs.eval($('#matrix-row-1-col-0').val()),
    mathjs.eval($('#matrix-row-2-col-0').val()),
  );

  var col1 = new THREE.Vector3(
    mathjs.eval($('#matrix-row-0-col-1').val()),
    mathjs.eval($('#matrix-row-1-col-1').val()),
    mathjs.eval($('#matrix-row-2-col-1').val()),
  );

  var col2 = new THREE.Vector3(
    mathjs.eval($('#matrix-row-0-col-2').val()),
    mathjs.eval($('#matrix-row-1-col-2').val()),
    mathjs.eval($('#matrix-row-2-col-2').val()),
  );

  return [col0, col1, col2];
}

/**
 * 
 */
function getVector() {
  return [
    mathjs.eval($('#vector-row-0').val()) * SCALE,
    mathjs.eval($('#vector-row-1').val()) * SCALE,
    mathjs.eval($('#vector-row-2').val()) * SCALE
  ];
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
  var returnString = num.toString(16);
  if (returnString.length < 6) {
    return "0".repeat(6 - returnString.length) + returnString;
  } else {
    return returnString;
  }
}

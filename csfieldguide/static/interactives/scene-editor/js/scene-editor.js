/** Parts of this file are heavily adapted from https://github.com/mrdoob/three.js/blob/dev/examples/webgl_materials_envmaps.html */

const THREE = require('three');
const mathjs = require('mathjs');
const OrbitControls = require('three-orbit-controls')(THREE);
const detector = require('../../../js/third-party/threejs/Detector.js');
var urlParameters = require('../../../js/third-party/url-parameters.js');

const image_base_path = base_static_path + 'interactives/scene-editor/img/bridge-';
const SCALE = 100; // Multiplier for translation distances

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

var mode;

// check that the browser is webgl compatible
if (! detector.Detector.webgl) detector.Detector.addGetWebGLMessage();

init();
animate();

$(document).ready(function () {
  // mode = transform | translation | multiple | scene-creation
  mode = urlParameters.getUrlParameter('mode');
  if (mode == "transform") {
    $("#matrix-container").removeClass('d-none');
    $("#eqtn-title").html(gettext('Transformation for sphere'));
    $("#equation-container").removeClass('d-none');
  } else if (mode == "translation") {
    $("#vector-container").removeClass('d-none');
    $("#eqtn-title").html(gettext('Translation for sphere'));
    $("#equation-container").removeClass('d-none');
  } else if (mode == "multiple") {
    $("#matrix-container").removeClass('d-none');
    $(".plus-sign").removeClass('d-none');
    $("#vector-container").removeClass('d-none');
    $("#eqtn-title").html(gettext('Multiple matrices and vectors'));
    $("#equation-container").removeClass('d-none');
  } else if (mode == "scene-creation") {
    $("#object-container").removeClass('d-none');
    $("#matrix-container").removeClass('d-none').addClass('offset-1 d-inline');
    $(".plus-sign").removeClass('d-none').addClass('d-inline');
    $("#vector-container").removeClass('d-none').addClass('d-inline');
    $("#equation-container").removeClass('col-12 d-none').addClass('col-8');
    $("#eqtn-title").addClass('d-none');
    $("#scene-creation-title-area").removeClass('d-none');
  }

  $("#selectable-objects").on('change', switchFocus);
  $("#add-object").click(function() {
    var objectType = $("#object-selection :selected").val();
    var colour = '0x' + $("#colour-input").val();
    // Some of this is from hex-background-colour
    var valid_codes = /^(0x([0-9a-fA-F])+)$/; // If it is at least 1 hex number that's fine
    if (!valid_codes.test(colour)) {
      colour = getRandomInt(0, 0xFFFFFF);
    } else {
      colour = parseInt(colour);
    }
    var material = new THREE.MeshLambertMaterial( {color: colour} );
    addObject(objectType, material);
  });

  $("#apply-transformation").click(function() {
    applyTransformation();
  });
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
  // var geometry = new THREE.SphereBufferGeometry( 200.0, 48, 24 );
  sphereMaterial = new THREE.MeshLambertMaterial( { envMap: textureCube } );
  // sphere = new THREE.Mesh( geometry, sphereMaterial );
  // scene.add( sphere );
  // sphere.name = "Sphere 1";
  // setSuspect(sphere);
  addObject('sphere', sphereMaterial);
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
  controls.enablePan = false; // Disables some wacky behaviour from panning while forced to look at the origin (via camera.lookAt)

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


function addObject(type, givenMaterial) {
  switch (type) {
    case "sphere":
      var geometry = new THREE.SphereBufferGeometry( 200, 48, 24 );
      var material = new THREE.MeshLambertMaterial( {color: 0x03fcf4} );
      if (givenMaterial) {
        var sphere = new THREE.Mesh( geometry, givenMaterial );
      } else {
        var sphere = new THREE.Mesh( geometry, material );
      }
      scene.add( sphere );
      numSpheres += 1;
      sphere.name = gettext('Sphere ') + numSpheres;
      screenObjectIds[sphere.name] = 'obj' + (getNumObjects());
      screenObjectTransforms[sphere.name] = [null, null];
      $("#selectable-objects").append("<option id='" + screenObjectIds[sphere.name]+ "'>" + sphere.name + "</option>");
      applyRandomTranslation(sphere);
      setSuspect(sphere);
      break;

    case "cube":
      var geometry = new THREE.BoxBufferGeometry(400, 400, 400 );
      var material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
      var cube = new THREE.Mesh( geometry, material );
      scene.add( cube );
      numCubes += 1;
      cube.name = gettext('Cube ') + numCubes;
      screenObjectIds[cube.name] = 'obj' + (getNumObjects());
      screenObjectTransforms[cube.name] = [null, null];
      $("#selectable-objects").append("<option id='" + screenObjectIds[cube.name] + "'>" + cube.name + "</option>");
      applyRandomTranslation(cube);
      setSuspect(cube);
      break;

    case "cone":
      var geometry = new THREE.ConeBufferGeometry( 200, 400, 32 );
      var material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
      var cone = new THREE.Mesh( geometry, material );
      scene.add( cone );
      numCones += 1;
      cone.name = gettext('Cone ') + numCones;
      screenObjectIds[cone.name] = 'obj' + (getNumObjects());
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
  if (screenObjectIds[object.name] != "obj1") {
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
  resetObject(suspect);

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
}

/**
 * Called when the user selects an object to focus on.
 * Sets the selected object as the suspect
 */
function switchFocus() {
  var name = $("#selectable-objects").val(); // This is object.name
  var object = scene.getObjectByName( name );
  setSuspect(object);
}

/**
 * Returns the number of objects in the scene.
 * This is used to ID objects, which is fine for now because objects can't be removed,
 * but be careful if this is to be modified in future.
 */
function getNumObjects() {
  return numCones + numCubes + numSpheres;
}

/**
 * Sets the transform matrices in the interactive to the values used to transform the currently selected object.
 * Unavailable in multple transformations mode, but only needed for scene-creation mode
 */
function fillMatrices() {
  var transform = screenObjectTransforms[suspect.name][0];
  if (transform != null) {
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
  if (translation != null) {
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

function resetObject(object) {
  object.position.set( 0, 0, 0 );
  object.rotation.set( 0, 0, 0 );
  object.scale.set( 1, 1, 1 );
  object.updateMatrix();
}

function getMatrix() {
  var row0 = new THREE.Vector3(
    mathjs.eval($('#matrix-row-0-col-0').val()),
    mathjs.eval($('#matrix-row-0-col-1').val()),
    mathjs.eval($('#matrix-row-0-col-2').val()),
  );

  var row1 = new THREE.Vector3(
    mathjs.eval($('#matrix-row-1-col-0').val()),
    mathjs.eval($('#matrix-row-1-col-1').val()),
    mathjs.eval($('#matrix-row-1-col-2').val()),
  );

  var row2 = new THREE.Vector3(
    mathjs.eval($('#matrix-row-2-col-0').val()),
    mathjs.eval($('#matrix-row-2-col-1').val()),
    mathjs.eval($('#matrix-row-2-col-2').val()),
  );

  return [row0, row1, row2];
}


function getVector() {
  return [
    [mathjs.eval($('#vector-row-0').val()) * SCALE],
    [mathjs.eval($('#vector-row-1').val()) * SCALE],
    [mathjs.eval($('#vector-row-2').val()) * SCALE]
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

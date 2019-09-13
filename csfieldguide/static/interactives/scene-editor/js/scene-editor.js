const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);
const detector = require('../../../js/third-party/threejs/Detector.js');
var urlParameters = require('../../../js/third-party/url-parameters.js');

const image_base_path = base_static_path + 'interactives/scene-editor/img/bridge-';
var controls, camera, scene, renderer;
var cameraCube, sceneCube;
var textureCube;
var cubeMesh;

var numSpheres = 1;
var numCubes = 0;
var numCones = 0;

// check that the browser is webgl compatible
if (! detector.Detector.webgl) detector.Detector.addGetWebGLMessage();

init();
animate();

$(document).ready(function () {
  // mode = transform | translation | multiple | scene-creation
  var mode = urlParameters.getUrlParameter('mode');
  if (mode == "transform") {
    $("#matrix-container").removeClass('d-none');
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
  }

  $("#selectable-objects").selectable();
  $("#add-object").click(function() {
    objectType = $("#object-selection :selected").val();
    addObject(objectType);
  });

  $("#apply-transformation").click(function() {
    applyTransformation(mode);
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
  var geometry = new THREE.SphereBufferGeometry( 200.0, 48, 24 );
  sphereMaterial = new THREE.MeshLambertMaterial( { envMap: textureCube } );
  sphereMesh = new THREE.Mesh( geometry, sphereMaterial );
  scene.add( sphereMesh );
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
  controls.maxDistance = 2500;

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


function addObject(type) {
  switch (type) {
    case "sphere":
      var geometry = new THREE.SphereBufferGeometry( 200, 48, 24 );
      var material = new THREE.MeshLambertMaterial( {color: 0x03fcf4} );
      var sphere = new THREE.Mesh( geometry, material );
      scene.add( sphere );
      var pos = getRandomPos(5000);
      sphere.position.set(pos[0], pos[1], pos[2]);
      numSpheres += 1;
      $("#selectable-objects").append("<li class='object border rounded p-2 mb-1 center-block'>" + gettext('Sphere ') + numSpheres + "</li>");
      break;

    case "cube":
      var geometry = new THREE.BoxBufferGeometry( 500, 500, 500 );
      var material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
      var cube = new THREE.Mesh( geometry, material );
      scene.add( cube );
      var pos = getRandomPos(5000);
      cube.position.set(pos[0], pos[1], pos[2]);
      numCubes += 1;
      $("#selectable-objects").append("<li class='object border rounded p-2 mb-1 center-block'>" + gettext('Cube ') + numCubes + "</li>");
      break;

    case "cone":
      var geometry = new THREE.ConeBufferGeometry( 200, 400, 32 );
      var material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
      var cone = new THREE.Mesh( geometry, material );
      scene.add( cone );
      var pos = getRandomPos(5000);
      cone.position.set(pos[0], pos[1], pos[2]);
      numCones += 1;
      $("#selectable-objects").append("<li class='object border rounded p-2 mb-1 center-block'>" + gettext('Cone ') + numCones + "</li>");
      break;
  }
}


function getRandomPos(max) {
  var x = Math.floor(Math.random() * Math.floor(max)) * posOrNegative();
  var y = Math.floor(Math.random() * Math.floor(max)) * posOrNegative();
  var z = Math.floor(Math.random() * Math.floor(max)) * posOrNegative();

  return [x, y, z];
}


// returns either 1 or -1
function posOrNegative() {
  return Math.random() < 0.5 ? -1 : 1;
}


function applyTransformation(mode) {
  if (mode == "transform") {
    // matrix only
    var matrix = getMatrix();
    // use matrix4 makeBasis as needs to be 4x4
  } else if (mode == "translation") {
    // vector only
    var vector = getVector();
    // use matrix4 makeTranslation
  } else if (mode == "multiple") {
    // multiple vectors and matrices
  } else if (mode == "scene-creation") {
    // one marix and one vector. Multiple objects (applied to just one of those objects)
  }
}


function getMatrix() {
  row0 = [
    mathjs.eval($('#matrix-row-0-col-0').val()),
    mathjs.eval($('#matrix-row-0-col-1').val()),
    mathjs.eval($('#matrix-row-0-col-2').val()),
  ];

  row1 = [
    mathjs.eval($('#matrix-row-1-col-0').val()),
    mathjs.eval($('#matrix-row-1-col-1').val()),
    mathjs.eval($('#matrix-row-1-col-2').val()),
  ];

  row2 = [
    mathjs.eval($('#matrix-row-2-col-0').val()),
    mathjs.eval($('#matrix-row-2-col-1').val()),
    mathjs.eval($('#matrix-row-2-col-2').val()),
  ];

  return [row0, row1, row2];
}


function getVector() {
  return [
    [mathjs.eval($('#vector-row-0').val())],
    [mathjs.eval($('#vector-row-1').val())],
    [mathjs.eval($('#vector-row-2').val())]
  ];
}

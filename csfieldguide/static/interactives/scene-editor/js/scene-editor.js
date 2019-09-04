var THREE = require('three');
var detector = require('../../../js/third-party/threejs/Detector.js');

// check that the browser is webgl compatible
if (! detector.Detector.webgl) detector.Detector.addGetWebGLMessage();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
var container = document.getElementById('scene');
container.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

camera.position.z = 5;
camera.position.y = 120 * Math.PI / 180;

var animate = function () {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );
};

animate();

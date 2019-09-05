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

var geometry = new THREE.ConeGeometry( 0.5, 1.5, 8 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var cone = new THREE.Mesh( geometry, material );
scene.add( cone );
var axesHelper = new THREE.AxesHelper( 10 );
scene.add( axesHelper );
var size = 10;
var divisions = 10;

var gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

camera.position.z = 5;
camera.position.y = 1;
camera.position.x = 1;

var animate = function () {
  requestAnimationFrame( animate );

  cone.rotation.x += 0.01;
  cone.rotation.y += 0.01;

  renderer.render( scene, camera );
};

animate();

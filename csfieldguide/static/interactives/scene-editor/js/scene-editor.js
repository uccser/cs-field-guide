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

var geometry = new THREE.ConeBufferGeometry( 0.5, 1.5, 8 );
var material = new THREE.MeshPhongMaterial( {color: 0xeb4034} );
var cone = new THREE.Mesh( geometry, material );
scene.add( cone );

var pointLight = new THREE.PointLight( {decay: 2});
pointLight.position.set( 5, 5, 0 );
scene.add( pointLight );

var pointLight2 = new THREE.PointLight( {decay: 2});
pointLight2.position.set( -5, -5, 0 );
scene.add( pointLight2 );

var pointLight3 = new THREE.PointLight( {decay: 2});
pointLight3.position.set( 0, 0, 5 );
scene.add( pointLight3 );

// var pointLight4 = new THREE.PointLight( {decay: 2});
// pointLight4.position.set( 0, 5, 0 );
// scene.add( pointLight4 );

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

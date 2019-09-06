var THREE = require('three');
var detector = require('../../../js/third-party/threejs/Detector.js');

// check that the browser is webgl compatible
if (! detector.Detector.webgl) detector.Detector.addGetWebGLMessage();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 15000 );
camera.position.x = 100;
camera.position.y = 100;
camera.position.z = 500;
camera.lookAt(new THREE.Vector3(0,0,0));

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
var container = document.getElementById('scene');
container.appendChild( renderer.domElement );

var geometry = new THREE.CubeGeometry( 100, 100, 100 );
var material = new THREE.MeshLambertMaterial( {color: 0xeb4034} );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var light = new THREE.PointLight( 0xff2200 );
light.position.set( 100, 100, 100 );
scene.add( light );
var light = new THREE.AmbientLight( 0x111111 );
scene.add( light );

var axesHelper = new THREE.AxesHelper( 500 );
scene.add( axesHelper );

var size = 50;
var divisions = 20;
var gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

var animate = function () {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );
};

animate();

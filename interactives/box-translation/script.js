

var stats;
var container = document.getElementById( 'container' );
var camera, scene, renderer;
var cube, plane;
var targetRotation = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();


function init() {

    var info = document.createElement( 'div' );
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    container.appendChild( info );

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.y = 150;
    camera.position.z = 500;

    scene = new THREE.Scene();

    //Cube

    var geometry = new THREE.BoxGeometry( 200, 200, 200 );

    var materials = [
		new THREE.MeshBasicMaterial({
		   map: new THREE.TextureLoader().load( 'square1.jpg' )
		}),
		new THREE.MeshBasicMaterial({
		   map: new THREE.TextureLoader().load( 'square2.jpg' )
		}),
		new THREE.MeshBasicMaterial({
		   map: new THREE.TextureLoader().load( 'square3.jpg' )
		}),
		new THREE.MeshBasicMaterial({
		   map: new THREE.TextureLoader().load( 'square4.jpg' )
		}),
		new THREE.MeshBasicMaterial({
		   map: new THREE.TextureLoader().load( 'square5.jpg' )
		}),
		new THREE.MeshBasicMaterial({
		   map: new THREE.TextureLoader().load( 'square6.jpg' )
		})
	];

    //for ( var i = 0; i < geometry.faces.length; i += 2 ) {
        //console.log(i);

        // random colour
        //var hex = Math.random() * 0xffffff;
        //var hex = colours[i/2];
        //geometry.faces[ i ].color.setHex( hex );
        //geometry.faces[ i + 1 ].color.setHex( hex );

        // set colour
        //geometry.faces[ i ].color.setStyle( "#6aadd1" );
        //geometry.faces[ i + 1 ].color.setStyle( "#6aadd1" );

    //}

    // lego man
    //var texture = new THREE.TextureLoader().load( 'good_cop.jpg' );
    //var material = new THREE.MeshBasicMaterial( { map: texture } );

    //var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );

    cube = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
    cube.position.y = 150;
    scene.add( cube );


    // Plane
    // TODO: INVESTIGATE WHAT THIS IS

    var geometry = new THREE.PlaneBufferGeometry( 200, 200 );
    geometry.rotateX( - Math.PI / 2 );

    var material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, overdraw: 0.5 } );

    plane = new THREE.Mesh( geometry, material );
    scene.add( plane );

    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor( 0xf0f0f0 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild( stats.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

    //listeners for keypress
    document.addEventListener( 'keydown', function(){

        switch (event.keyCode) {
            // case 32: //space bar
            case 13:
                //cube.position.y = 200;
                //cube.position.x = 200;
                moveBox();
                break;
        }}, false);

    document.getElementById( 'x-coordinate' ).value = cube.position.x;
    document.getElementById( 'y-coordinate' ).value = cube.position.y;
    document.getElementById( 'z-coordinate' ).value = cube.position.z;

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function animate() {

    requestAnimationFrame(animate);

    camera.lookAt(cube.position);
    render();
    stats.update();

    TWEEN.update();

}

function render() {

    plane.rotation.y = cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.05;
    renderer.render( scene, camera );

}


function moveBox() {

    var x_pos = 0 + parseInt(document.getElementById( 'x-coordinate' ).value);
    var y_pos = 0 + parseInt(document.getElementById( 'y-coordinate' ).value);
    var z_pos = 0 + parseInt(document.getElementById( 'z-coordinate' ).value);

    var target = { x: x_pos, y: y_pos, z: z_pos };


    TWEEN.removeAll();
    new TWEEN.Tween( cube.position )
        .to( target )
        .easing ( TWEEN.Easing.Elastic.Out )
        .onUpdate( render )
        .start();

}



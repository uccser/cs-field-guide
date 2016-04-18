
var stats;
var container = document.getElementById( 'container' );
var camera, scene, renderer;
var cube, hiddenObject;
var targetRotation = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var code = { 1: null, 2: null, 3: null };
var boxSymbols = {}


init();
animate();

function init() {

    var info = document.createElement( 'div' );
    info.style.position = 'absolute';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.innerHTML = 'Created using <a href="http://threejs.org" target="_blank">three.js</a>'
    container.appendChild( info );

    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000000 );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 700;

    scene = new THREE.Scene();

    ////////////////////////////// background //////////////////////////////

    var textureLoader = new THREE.TextureLoader();
    // loads the 6 background pictures (px = positive x, nx = negative x, etc)
    var materials = [
        new THREE.MeshBasicMaterial( { map: textureLoader.load( 'images/px.jpg' ) } ), // right
        new THREE.MeshBasicMaterial( { map: textureLoader.load( 'images/nx.jpg' ) } ), // left
        new THREE.MeshBasicMaterial( { map: textureLoader.load( 'images/py.jpg' ) } ), // top
        new THREE.MeshBasicMaterial( { map: textureLoader.load( 'images/ny.jpg' ) } ), // bottom
        new THREE.MeshBasicMaterial( { map: textureLoader.load( 'images/pz.jpg' ) } ), // back
        new THREE.MeshBasicMaterial( { map: textureLoader.load( 'images/nz.jpg' ) } )  // front
    ];
    // creates a mesh, covered with the background pictures
    // mesh is in shape of a cube, which camera/smaller cube is inside
    skyboxMesh = new THREE.Mesh( new THREE.BoxGeometry( 10000, 10000, 10000, 7, 7, 7 ), new THREE.MultiMaterial( materials ) );
    skyboxMesh.scale.x = - 1; // stretches out background
    // adds the skybox to the scene
    scene.add( skyboxMesh );

    ////////////////////////////////////////////////////////////////////////


    //Cube

    // creates a box with sides of length 200
    var geometry = new THREE.BoxGeometry( 200, 200, 200 );

    // list of possible box symbols
    var symbols = [ 'images/square2.png', 'images/square3.png', 'images/square4.png',
        'images/square5.png', 'images/square6.png', 'images/square7.png', 'images/square8.png' ];

    // randomly decides which symbol to put on each side of the box
    // means that different box is loaded each time
    var default_symbol = symbols.splice(Math.floor(Math.random()*symbols.length), 1);
    var left_side = symbols.splice(Math.floor(Math.random()*symbols.length), 1);
    var right_side = symbols.splice(Math.floor(Math.random()*symbols.length), 1);
    var bottom_side = symbols.splice(Math.floor(Math.random()*symbols.length), 1);

    // this symbol will be on 3 sides of the box
    boxSymbols["default_symbol"] = default_symbol[0];
    // unique symbols for the other 3 sides
    boxSymbols["left_side"] = left_side[0];
    boxSymbols["right_side"] = right_side[0];
    boxSymbols["bottom_side"] = bottom_side[0];

    // loads all the symbols for the box
    var materials = [
        new THREE.MeshBasicMaterial({
           map: new THREE.TextureLoader().load( right_side )
        }),
        new THREE.MeshBasicMaterial({
           map: new THREE.TextureLoader().load( left_side )
        }),
        new THREE.MeshBasicMaterial({
           map: new THREE.TextureLoader().load( default_symbol ) // top, non-coded side
        }),
        new THREE.MeshBasicMaterial({
           map: new THREE.TextureLoader().load( bottom_side )
        }),
        new THREE.MeshBasicMaterial({
           map: new THREE.TextureLoader().load( default_symbol ) // front, non-coded side
        }),
        new THREE.MeshBasicMaterial({
           map: new THREE.TextureLoader().load( default_symbol ) // back, non-coded side
        })
    ];

    // put the loaded materials onto the cube object
    cube = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );

    // add the cube to the scene
    scene.add( cube );

    cube.material.materials[4].map = new THREE.TextureLoader().load( 'images/grayscale_square6.png', undefined, function() {
        cube.material.materials[4].map.needsUpdate = true;
        // TODO potential memory leak since not removing old image. check this.
    });

    /////////////////////////////// hiddenObject ////////////////////////////////

    var ambient = new THREE.AmbientLight( 0x444444 );
    scene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 ).normalize();
    scene.add( directionalLight );


    var loader = new THREE.ObjectLoader();
    // wrapped in function so we can access the object file
    function createObject( objectFile ) {
        var container = new THREE.Object3D();
        loader.load( objectFile, function ( object ) {
            container.add( object );
        });
        return container;
    }

    hiddenObject = createObject( 'teapot.json' );
    hiddenObject.scale.set( 50, 50, 50);
    // scene.add( hiddenObject );

    /////////////////////////////////////////////////////////////////////


    // canvas renderer puts lines on every object - do not know if this can be disabled or not
    //renderer = new THREE.CanvasRenderer();
    // supposedly better performance than the CanvasRenderer. Have not researched this in depth.
    renderer = new THREE.WebGLRenderer();
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
            case 13: // enter/return key
                moveBox();
                break;
        }}, false);

    // sets the initial values of the x/y/z-coordinate text input boxes
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

    renderer.render( scene, camera );

}

function submitCode() {
    /* triggered when the user clicks the "submit" button
     * checks each selected symbol for if it matches what is on the box
     */

    if ( code[1] == boxSymbols['left_side'] ) {
        if ( code[2] == boxSymbols['bottom_side'] ) {
            if ( code[3] == boxSymbols['right_side'] ) {
                end();
            }
        }
    }
}


// hides the cube and show the object inside when the user enters the correct code
function end() {
    // reset cube to start position
    document.getElementById( 'x-coordinate' ).value = 0;
    document.getElementById( 'y-coordinate' ).value = 0;
    document.getElementById( 'z-coordinate' ).value = 0;

    moveBox();

    // move camera (zoom in)
    var target = { x: 0, y: 0, z: 350 };
    new TWEEN.Tween( camera.position )
        .to( target )
        .easing ( TWEEN.Easing.Elastic.Out )
        .onUpdate( render )
        .start();

    // gradually fades cube
    for (face in cube.material.materials) {
        cube.material.materials[face].transparent = true;
    }

    var opacity = 1;
    fadeCube( opacity );
    window.setTimeout( function () {
        window.setInterval( function () {
            scene.add( hiddenObject );
            if ( opacity > 0 ) {
                opacity = opacity - 0.05;
                fadeCube( opacity );
            } else {
                clearInterval();
            }
        }, 75);
    }, 1500);

}


// adjusts the cube's opacity
function fadeCube( opacity ) {
    for (face in cube.material.materials) {
        cube.material.materials[face].opacity = opacity;
    }
}

function clearCode() {
    /* triggered when the user clicks the "clear" button
     * set the selected codes to ../images/question marks and clear the dictionary
     */

    document.getElementById( 'first-symbol' ).src = 'images/question_mark.png';
    document.getElementById( 'second-symbol' ).src = 'images/question_mark.png';
    document.getElementById( 'third-symbol' ).src = 'images/question_mark.png';
    code[1] = null;
    code[2] = null;
    code[3] = null;
}


function symbolClick(id) {
    /* When a symbol is clicked, add it to the first empty spot
     * (where "spot" refers to the boxes with ../images/question marks in them)
     * and update the dictionary mapping the three sides to the selected symbols
     * Input:
     *   - id: relates to a particular symbol (each symbol's file name contains a number in 1-8)
     */

    var img_src = 'images/square' + id + '.png';
    if ( code[1] == null ) {
        code[1] = img_src;
        document.getElementById( 'first-symbol' ).src = img_src;
    } else if ( code[2] == null ) {
        code[2] = img_src;
        document.getElementById( 'second-symbol' ).src = img_src;
    } else if ( code[3] == null ) {
        code[3] = img_src;
        document.getElementById( 'third-symbol' ).src = img_src;
    }

}

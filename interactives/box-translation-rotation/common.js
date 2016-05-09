
var stats;
var container = document.getElementById( 'container' );
var camera, scene, renderer;
var cube, hiddenObject;
var targetRotation = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var code = { 1: null, 2: null, 3: null };
var boxSymbols = {}
var selectedSymbolId;
var x_pos;
var y_pos;
var z_pos;
var rotateObject = false;

// TODO investigate window.onload = init;
init();
onWindowResize();
animate();


function init() {

    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000000 );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 500;

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
    // numbers correspond to file names, e.g. "square1.png"
    var symbols = [ '1', '2', '3', '4', '5', '6', '7', '8' ];

    // randomly decides which symbol to put on each side of the box
    // means that different box is loaded each time
    var default_symbol = symbols.splice(Math.floor(Math.random()*symbols.length), 1);
    var left_side = symbols.splice(Math.floor(Math.random()*symbols.length), 1);
    var right_side = symbols.splice(Math.floor(Math.random()*symbols.length), 1);
    var bottom_side = symbols.splice(Math.floor(Math.random()*symbols.length), 1);

    // this symbol will be on 3 sides of the box
    boxSymbols['default_symbol'] = default_symbol[0];
    // unique symbols for the other 3 sides
    boxSymbols['left_side'] = left_side[0];
    boxSymbols['right_side'] = right_side[0];
    boxSymbols['bottom_side'] = bottom_side[0];

    // loads all the symbols for the box
    var materials = [
        new THREE.MeshBasicMaterial({
           map: new THREE.TextureLoader().load( 'images/grayscale_square' + right_side + '.png' )
        }),
        new THREE.MeshBasicMaterial({
            // non grey scale becuase this is the first symbol the user needs to find
           map: new THREE.TextureLoader().load( 'images/square' + left_side + '.png' )
        }),
        new THREE.MeshBasicMaterial({
           map: new THREE.TextureLoader().load( 'images/grayscale_square' + default_symbol + '.png' ) // top, non-coded side
        }),
        new THREE.MeshBasicMaterial({
           map: new THREE.TextureLoader().load( 'images/grayscale_square' + bottom_side + '.png' )
        }),
        new THREE.MeshBasicMaterial({
           map: new THREE.TextureLoader().load( 'images/grayscale_square' + default_symbol + '.png' ) // front, non-coded side
        }),
        new THREE.MeshBasicMaterial({
           map: new THREE.TextureLoader().load( 'images/grayscale_square' + default_symbol + '.png' ) // back, non-coded side
        })
    ];

    // put the loaded materials onto the cube object
    cube = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );

    // add the cube to the scene
    scene.add( cube );


    /////////////////////////////// hiddenObject ////////////////////////////////

    var ambient = new THREE.AmbientLight( 0x444444 );
    scene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 ).normalize();
    scene.add( directionalLight );


    var loader = new THREE.ObjectLoader();
    // wrapped in function so we can access the object later
    function createObject( objectFile ) {
        var container = new THREE.Object3D();
        loader.load( objectFile, function ( object ) {
            container.add( object );
        });
        return container;
    }

    hiddenObject = createObject( 'teapot.json' );
    hiddenObject.scale.set( 50, 50, 50);
    hiddenObject.position.set( 0, -150, 0 );

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
    document.addEventListener( 'keydown', function( event ) {
        switch (event.keyCode) {
            case 13: // enter/return key
                updateCoords();
                moveBox();
                break;
        }}, false);


    // sets the initial values of the x/y/z-coordinate text input boxes
    document.getElementById( 'desk-x-coordinate' ).value = cube.position.x;
    document.getElementById( 'desk-y-coordinate' ).value = cube.position.y;
    document.getElementById( 'desk-z-coordinate' ).value = cube.position.z;
    document.getElementById( 'mob-x-coordinate' ).value = cube.position.x;
    document.getElementById( 'mob-y-coordinate' ).value = cube.position.y;
    document.getElementById( 'mob-z-coordinate' ).value = cube.position.z;

    // uses regex to check if the user is on mobile
    // if mobile then switches input to buttons rather than text entry
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        document.getElementById( 'desktop-coord' ).style.display = 'none';
        document.getElementById( 'mobile-coord' ).style.display = 'inline';
    }


}


function onWindowResize() {

    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    // check for small screen
    if ( screenWidth < 650 ) {
        // sets to mobile layout
        document.getElementById( 'user-input' ).className = 'mob-layout';
    }

    windowHalfX = screenWidth / 2;
    windowHalfY = screenHeight / 2;

    camera.aspect = screenWidth / screenHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( screenWidth, screenHeight );
    // renderer.setSize( window.innerWidth, 226 );

}


function animate() {

    requestAnimationFrame(animate);

    camera.lookAt(cube.position);

    if ( rotateObject ) {
        //hiddenObject.rotation.x += 0.005;
        hiddenObject.rotation.y += 0.01;
    }

    render();
    stats.update();

    TWEEN.update();

}

function animateHiddenObject() {

    requestAnimationFrame(animate);

    camera.lookAt(hiddenObject.position);


    render();
    stats.update();

    TWEEN.update();

}

function render() {

    renderer.render( scene, camera );

}


//triggered when user clicks +/- in mobile browser
//change the x/y/z coordinate and move the box
//TODO decide when to multiply by 10
function updateCoords(axis, change) {

    if ( change == '-' ) {
        if ( axis == 'x' ) {
            x_pos -= 5;
            document.getElementById( 'mob-x-coordinate' ).value = x_pos;
        } else if ( axis == 'y' ) {
            y_pos -= 5;
            document.getElementById( 'mob-y-coordinate' ).value = y_pos;
        } else {
            z_pos -= 5;
            document.getElementById( 'mob-z-coordinate' ).value = z_pos;
        }
        moveBox();
    } else if ( change == '+' ) {
        if ( axis == 'x' ) {
            x_pos += 5;
            document.getElementById( 'mob-x-coordinate' ).value = x_pos;
        } else if ( axis == 'y' ) {
            y_pos += 5;
            document.getElementById( 'mob-y-coordinate' ).value = y_pos;
        } else {
            z_pos += 5;
            document.getElementById( 'mob-z-coordinate' ).value = z_pos;
        }
        moveBox();
    } else { // must be input box from desktop
        // get each coordinate value from the input box
        // using 0 makes the value be set relative to start position, rather than previous position
        x_pos = 0 + parseInt(document.getElementById( 'desk-x-coordinate' ).value);
        y_pos = 0 + parseInt(document.getElementById( 'desk-y-coordinate' ).value);
        z_pos = 0 + parseInt(document.getElementById( 'desk-z-coordinate' ).value);
    }
}


function submitSymbol() {
    /* triggered when the user clicks the "submit" button
     * checks the selected symbol for if it matches the coloured symbol on the box
     * changes clicked symbol back to grey on the row of buttons
     */

    document.getElementById(selectedSymbolId).src = 'images/grayscale_square' + selectedSymbolId + '.png';

    var img_src = 'images/square' + selectedSymbolId + '.png';

    if ( code[1] == null ) {
        code[1] = selectedSymbolId;
        document.getElementById( 'first-symbol' ).src = img_src;
        // replace left with grayscale
        updateSide( 1,  boxSymbols['left_side'], false );
        // replace bottom with colour
        updateSide( 3,  boxSymbols['bottom_side'], true );
    } else if ( code[2] == null ) {
        code[2] = selectedSymbolId;
        document.getElementById( 'second-symbol' ).src = img_src;
        // replace bottom with grayscale
        updateSide( 3,  boxSymbols['bottom_side'], false );
        // replace right with colour
        updateSide( 0,  boxSymbols['right_side'], true );
    } else if ( code[3] == null ) {
        code[3] = selectedSymbolId;
        document.getElementById( 'third-symbol' ).src = img_src;
    }

}


function updateSide( side, currentImg, coloured) {
    var format = '';
    if ( coloured == false ) {
        format = 'grayscale_';
    }
    cube.material.materials[side].map = new THREE.TextureLoader().load(
            'images/' + format + 'square' + currentImg + '.png',
            undefined,
            function() {
                cube.material.materials[side].map.needsUpdate = true;
                // TODO potential memory leak since not removing old image. check this.
            }
    );
}

function submitCode() {
    /* triggered when the user clicks the "Check Code" button
     * checks each selected symbol for if it matches what is on the box
     */

    // reset cube to start position TODO not "start" pos anymore
    document.getElementById( 'x-coordinate' ).value = 0;
    document.getElementById( 'y-coordinate' ).value = -10;
    document.getElementById( 'z-coordinate' ).value = 0;
    moveBox();

    if ( code[1] == boxSymbols['left_side'] ) {
        if ( code[2] == boxSymbols['bottom_side'] ) {
            if ( code[3] == boxSymbols['right_side'] ) {
                end();
                return;
            }
        }
    }

    // if the code was not correct
    // tell the user their code was incorrect
    incorrect();
    // clear the code for them to start over
    clearCode();
}


// tell the user their code is incorrect, and shake the box!
function incorrect() {
    var target;
    var count = 0;
    var x_pos = 20;
    var timer = 0;

    window.setTimeout( function () {
        function run() {
            if ( count == 10 ) {
                clearInterval( timer );
            } else {
                target = { x: x_pos, y: 0, z: 0 };
                // move the box on the next animation loop
                TWEEN.removeAll();
                new TWEEN.Tween( cube.position )
                    .to( target )
                    .easing ( TWEEN.Easing.Elastic.Out )
                    .onUpdate( render )
                    .start();
                TWEEN.update();

                x_pos = x_pos - ( 2 * x_pos );
                count += 1;
                timer = setTimeout( run, 50 );
            }
        }
        timer = setTimeout( run, 50 );
    }, 500 );

}


// hides the cube and show the object inside when the user enters the correct code
function end() {

    // colour every side of the cube
    updateSide( 1,  boxSymbols['left_side'], true );
    updateSide( 2,  boxSymbols['default_symbol'], true );
    updateSide( 3,  boxSymbols['bottom_side'], true );
    updateSide( 4,  boxSymbols['default_symbol'], true );
    updateSide( 5,  boxSymbols['default_symbol'], true );

    // move camera (zoom in)
    var target = { x: 0, y: 0, z: 350 };
    new TWEEN.Tween( camera.position )
        .to( target )
        .easing ( TWEEN.Easing.Elastic.Out )
        .onUpdate( render )
        .start();


    // gradually fades cube
    for ( face in cube.material.materials ) {
        cube.material.materials[face].transparent = true;
    }

    var timer = 0;
    var opacity = 1;
    fadeCube( opacity );

    rotateObject = true;

    window.setTimeout( function () {
        scene.add( hiddenObject );
        function run() {
            if ( opacity <= 0 ) {
                clearInterval( timer );
            } else {
                opacity = opacity - 0.05;
                fadeCube( opacity );
                timer = setTimeout( run, 75 );
            }
        }
        timer = setTimeout( run, 75 );
    }, 1500 );

    // TODO remove cube from scene - scene.removeObject( cube ); (?)

}


// adjusts the cube's opacity
function fadeCube( opacity ) {
    for (face in cube.material.materials) {
        cube.material.materials[face].opacity = opacity;
    }
}


function clearCode() {
    /* triggered when the user clicks the "clear" button or the wrong code is submitted
     * set the selected codes to ../images/question marks and clear the dictionary
     */

    selectedSymbolId = code[1];

    document.getElementById( 'first-symbol' ).src = 'images/question_mark.jpg';
    document.getElementById( 'second-symbol' ).src = 'images/question_mark.jpg';
    document.getElementById( 'third-symbol' ).src = 'images/question_mark.jpg';
    code[1] = null;
    code[2] = null;
    code[3] = null;

    // replace left with colour
    updateSide( 1,  boxSymbols['left_side'], true );
    // replace bottom with grayscale
    updateSide( 3,  boxSymbols['bottom_side'], false );
    // replace right with colour
    updateSide( 0,  boxSymbols['right_side'], false );

}


function symbolClick(id) {
    /* When a symbol is clicked, add it to the first empty spot
     * (where "spot" refers to the boxes with ../images/question marks in them)
     * and update the dictionary mapping the three sides to the selected symbols
     * Input:
     *   - id: relates to a particular symbol (each symbol's file name contains a number in 1-8)
     */
    selectedSymbolId = id;

    for (var i = 1; i <= 8; i++) {
        if (i == id) {
            document.getElementById(i).src = 'images/square' + i + '.png';
        } else {
            document.getElementById(i).src = 'images/grayscale_square' + i + '.png';
        }
    }

}

function emptyCheck() {

    if ( isNaN( x_pos ) ) {
        x_pos = 0;
        document.getElementById( 'x-coordinate' ).value = x_pos;
    } else if ( isNaN( y_pos ) ) {
        y_pos = 0;
        document.getElementById( 'y-coordinate' ).value = y_pos;
    } else if ( isNaN( z_pos) ){
        z_pos = 0;
        document.getElementById( 'z-coordinate' ).value = z_pos;
    }

}

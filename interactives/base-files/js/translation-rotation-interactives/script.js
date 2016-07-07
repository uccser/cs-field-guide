/**
 * Common source code for the box translation and rotation interactives
 */

var imgPath = '../base-files/img/translation-rotation-interactives-images/';
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
var difference = 10;


init();
onWindowResize();
animate();

/**
 * Creates all the required objects for the scene
 */
function init() {

    // check that the browser is webgl compatible
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    // create a camera object
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000000 );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 500; // this sets it back from the cube object (to be created in this function)

    // create a new scene
    scene = new THREE.Scene();

    ////////////////////////////// background //////////////////////////////

    var textureLoader = new THREE.TextureLoader();
    // loads the 6 background pictures (px = positive x, nx = negative x, etc)
    var materials = [
        new THREE.MeshBasicMaterial( { map: textureLoader.load( imgPath + 'px.jpg' ) } ), // right
        new THREE.MeshBasicMaterial( { map: textureLoader.load( imgPath + 'nx.jpg' ) } ), // left
        new THREE.MeshBasicMaterial( { map: textureLoader.load( imgPath + 'py.jpg' ) } ), // top
        new THREE.MeshBasicMaterial( { map: textureLoader.load( imgPath + 'ny.jpg' ) } ), // bottom
        new THREE.MeshBasicMaterial( { map: textureLoader.load( imgPath + 'pz.jpg' ) } ), // back
        new THREE.MeshBasicMaterial( { map: textureLoader.load( imgPath + 'nz.jpg' ) } )  // front
    ];
    // creates a mesh, covered with the background pictures
    // mesh is in shape of a cube, which camera/smaller cube is inside
    skyboxMesh = new THREE.Mesh( new THREE.BoxGeometry( 10000, 10000, 10000, 7, 7, 7 ), new THREE.MultiMaterial( materials ) );
    skyboxMesh.scale.x = - 1; // stretches out background
    // adds the skybox to the scene
    scene.add( skyboxMesh );


    /////////////////////////////// box ////////////////////////////////


    // creates a box with sides of length 200
    var geometry = new THREE.BoxGeometry( 200, 200, 200 );

    // list of possible box symbols
    // numbers correspond to file names, e.g. "square1.png"
    var symbols = [ '1', '2', '3', '4', '5', '6', '7', '8' ];

    // randomly decides which symbol to put on each side of the box
    // means that different box is loaded each time
    var top_side = symbols.splice(Math.floor(Math.random()*symbols.length), 1);
    var back_side = symbols.splice(Math.floor(Math.random()*symbols.length), 1);
    var front_side = symbols.splice(Math.floor(Math.random()*symbols.length), 1);
    var left_side = symbols.splice(Math.floor(Math.random()*symbols.length), 1);
    var right_side = symbols.splice(Math.floor(Math.random()*symbols.length), 1);
    var bottom_side = symbols.splice(Math.floor(Math.random()*symbols.length), 1);

    // saved in a dictionary because we need to access them later to check user's selection
    boxSymbols['top_side'] = top_side[0];
    boxSymbols['back_side'] = back_side[0];
    boxSymbols['front_side'] = front_side[0];
    boxSymbols['left_side'] = left_side[0];
    boxSymbols['right_side'] = right_side[0];
    boxSymbols['bottom_side'] = bottom_side[0];


    // loads all the symbols for the box
    var materials = [
        new THREE.MeshBasicMaterial({
           map: new THREE.TextureLoader().load( imgPath + 'grayscale_square' + right_side + '.png' )
        }),
        new THREE.MeshBasicMaterial({
            // non grey scale becuase this is the first symbol the user needs to find
           map: new THREE.TextureLoader().load( imgPath + 'square' + left_side + '.png' )
        }),
        new THREE.MeshBasicMaterial({
           map: new THREE.TextureLoader().load( imgPath + 'grayscale_square' + top_side + '.png' ) // top, non-coded side
        }),
        new THREE.MeshBasicMaterial({
           map: new THREE.TextureLoader().load( imgPath + 'grayscale_square' + bottom_side + '.png' )
        }),
        new THREE.MeshBasicMaterial({
           map: new THREE.TextureLoader().load( imgPath + 'grayscale_square' + front_side + '.png' ) // front, non-coded side
        }),
        new THREE.MeshBasicMaterial({
           map: new THREE.TextureLoader().load( imgPath + 'grayscale_square' + back_side + '.png' ) // back, non-coded side
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

    hiddenObject = createObject( '../base-files/js/translation-rotation-interactives/teapot.json' ); // any json object should work
    hiddenObject.scale.set( 50, 50, 50);
    hiddenObject.position.set( 0, -100, 0 );
    // does not add the hiddenObject to the scene until later (when the user "unlocks" the box)

    /////////////////////////////////////////////////////////////////////


    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xf0f0f0 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

    //listeners for keypress
    document.addEventListener( 'keydown', function( event ) {
        switch (event.keyCode) {
            case 13: // enter/return key
                updateCoords();
                break;
        }}, false);

    // records the current cube position
    x_pos = cube.position.x;
    y_pos = cube.position.y;
    z_pos = cube.position.z;


    // sets the initial values of the x/y/z-coordinate text input boxes
    document.getElementById( 'desk-x-coordinate' ).value = x_pos;
    document.getElementById( 'desk-y-coordinate' ).value = y_pos;
    document.getElementById( 'desk-z-coordinate' ).value = z_pos;
    document.getElementById( 'mob-x-coordinate' ).value = x_pos;
    document.getElementById( 'mob-y-coordinate' ).value = y_pos;
    document.getElementById( 'mob-z-coordinate' ).value = z_pos;

    // uses regex to check if the user is on mobile
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // if mobile then switches input to buttons rather than text entry
        document.getElementById( 'desktop-coord' ).style.display = 'none';
        document.getElementById( 'mobile-coord' ).style.display = 'inline';
    }


}


/**
 * Adjust the scene accordingly if the user changes the size of the window
 */
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

}


/**
 * Animation loop so that the scene keeps updating
 */
function animate() {

    requestAnimationFrame(animate);

    // makes the camera follow the box around the scene
    camera.lookAt(cube.position);

    if ( rotateObject ) {
        //hiddenObject.rotation.x += 0.005;
        hiddenObject.rotation.y += 0.01;
    }

    render();

    TWEEN.update();

}


function render() {

    renderer.render( scene, camera );

}


/**
 * triggered when the user changes the coordinates of the box
 * change the x/y/z coordinate and move the box
 * Input:
     - axis is a string, either 'x', 'y' or 'z'\
     - change is a string, either '-' or '+'
     - axis and change come from the mobile version of the page (input buttons)
 */
function updateCoords(axis, change) {

    if ( change == '-' ) {
        if ( axis == 'x' ) {
            x_pos = ( x_pos - difference );
            document.getElementById( 'mob-x-coordinate' ).value = x_pos;
        } else if ( axis == 'y' ) {
            y_pos = ( y_pos - difference );
            document.getElementById( 'mob-y-coordinate' ).value = y_pos;
        } else {
            z_pos = ( z_pos - difference );
            document.getElementById( 'mob-z-coordinate' ).value = z_pos;
        }
    } else if ( change == '+' ) {
        if ( axis == 'x' ) {
            x_pos = ( x_pos + difference );
            document.getElementById( 'mob-x-coordinate' ).value = x_pos;
        } else if ( axis == 'y' ) {
            y_pos = ( y_pos + difference );
            document.getElementById( 'mob-y-coordinate' ).value = y_pos;
        } else {
            z_pos = ( z_pos + difference );
            document.getElementById( 'mob-z-coordinate' ).value = z_pos;
        }
    } else { // else the parameters were not given and it must be input box from desktop browser
        // get each coordinate value from the input box
        // using 0 makes the value be set relative to start position, rather than previous position
        x_pos = ( 0 + parseInt(document.getElementById( 'desk-x-coordinate' ).value) );
        y_pos = ( 0 + parseInt(document.getElementById( 'desk-y-coordinate' ).value) );
        z_pos = ( 0 + parseInt(document.getElementById( 'desk-z-coordinate' ).value) );
    }
    moveBox();
}


/**
 * triggered when the user clicks the "submit" button
 * checks the selected symbol for if it matches the coloured symbol on the box
 * changes clicked symbol back to grey on the row of buttons
 */
function submitSymbol() {

    // checks that the user has selected a symbol
    if ( selectedSymbolId == undefined ) {
        return;
    }

    document.getElementById(selectedSymbolId).src = imgPath + 'grayscale_square' + selectedSymbolId + '.png';

    var img_src = imgPath + 'square' + selectedSymbolId + '.png';

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

    selectedSymbolId = undefined;


}


/*
 * changes the picture on the given side of the box
 * Input:
     - side: numbered side of the cube to change
     - currentImg: integer (given as string) corresponding to number used in file names
     - coloured: boolean value indicating whether to use grayscale or coloured image
 */
function updateSide( side, currentImg, coloured) {
    var format = '';
    if ( coloured == false ) {
        format = 'grayscale_';
    }
    cube.material.materials[side].map = new THREE.TextureLoader().load(
            imgPath + format + 'square' + currentImg + '.png',
            undefined,
            function() {
                cube.material.materials[side].map.needsUpdate = true;
                // TODO potential memory leak since not removing old image. check this.
            }
    );
}


/**
 * triggered when the user clicks the "Check Code" button
 * checks each selected symbol for if it matches what is on the box
 */
function submitCode() {

    // ,move box back to central position
    x_pos = 0;
    y_pos = -10;
    z_pos = 0;
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


/**
 * shake the box!
 */
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


/**
 * hides the cube and show the object inside when the user enters the correct code
 */
function end() {

    // hide the user input div to give more screen space
    document.getElementById( 'user-input' ).style.display = 'none';

    // colour every side of the cube
    updateSide( 0,  boxSymbols['right_side'], true );
    updateSide( 1,  boxSymbols['left_side'], true );
    updateSide( 2,  boxSymbols['top_side'], true );
    updateSide( 3,  boxSymbols['bottom_side'], true );
    updateSide( 4,  boxSymbols['front_side'], true );
    updateSide( 5,  boxSymbols['back_side'], true );

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

}


/**
 * sets each side of the cube to a given opacity
 */
function fadeCube( opacity ) {
    for (face in cube.material.materials) {
        cube.material.materials[face].opacity = opacity;
    }
}


/**
 * triggered when the user clicks the "clear" button or the wrong code is submitted
 * set the selected codes to question marks and clear the dictionary
 */
function clearCode() {


    selectedSymbolId = code[1];

    document.getElementById( 'first-symbol' ).src = imgPath + 'question_mark.jpg';
    document.getElementById( 'second-symbol' ).src =  imgPath + 'question_mark.jpg';
    document.getElementById( 'third-symbol' ).src =  imgPath + 'question_mark.jpg';
    code[1] = null;
    code[2] = null;
    code[3] = null;

    // replace left with colour
    updateSide( 1,  boxSymbols['left_side'], true );
    // replace bottom with grayscale
    updateSide( 3,  boxSymbols['bottom_side'], false );
    // replace right with colour
    updateSide( 0,  boxSymbols['right_side'], false );

    // reset to start position
    x_pos = 0;
    y_pos = 0;
    z_pos = 0;

    document.getElementById( 'desk-x-coordinate' ).value = x_pos;
    document.getElementById( 'desk-y-coordinate' ).value = y_pos;
    document.getElementById( 'desk-z-coordinate' ).value = z_pos;
    document.getElementById( 'mob-x-coordinate' ).value = x_pos;
    document.getElementById( 'mob-y-coordinate' ).value = y_pos;
    document.getElementById( 'mob-z-coordinate' ).value = z_pos;

    moveBox();

}


/*
 * When a symbol is clicked, add it to the first empty spot
 * (where "spot" refers to the boxes with question marks in them)
 * and update the dictionary mapping the three sides to the selected symbols
 * Input:
 *   - id: relates to a particular symbol (each symbol's file name contains a number in 1-8)
 */
function symbolClick(id) {

    selectedSymbolId = id;

    for (var i = 1; i <= 8; i++) {
        if (i == id) {
            document.getElementById(i).src = imgPath + 'square' + i + '.png';
        } else {
            document.getElementById(i).src = imgPath + 'grayscale_square' + i + '.png';
        }
    }

}


/**
 * check that a value was given for the cube's position
 * if not, set it to 0 and update the entry boxes for the user
 */
function emptyCheck() {

    if ( isNaN( x_pos ) ) {
        x_pos = 0;
        document.getElementById( 'desk-x-coordinate' ).value = x_pos;
        document.getElementById( 'mob-x-coordinate' ).value = x_pos;
    } else if ( isNaN( y_pos ) ) {
        y_pos = 0;
        document.getElementById( 'desk-y-coordinate' ).value = y_pos;
        document.getElementById( 'mob-y-coordinate' ).value = y_pos;
    } else if ( isNaN( z_pos) ){
        z_pos = 0;
        document.getElementById( 'desk-z-coordinate' ).value = z_pos;
        document.getElementById( 'mob-z-coordinate' ).value = z_pos;
    }

}





/**
 * Common source code for the box translation and rotation interactives
 */

var THREE = require('three');
var detector = require('../third-party/threejs/Detector.js');
var TWEEN = require('@tweenjs/tween.js');

var container = document.getElementById('container');
var camera, scene, renderer;
var cube;
var code = { 1: null, 2: null, 3: null };
var boxSymbols = {}
var selectedSymbolId;
var x_pos;
var y_pos;
var z_pos;
var rotateObject = false;
var difference = 10;
var scale = 10;
var isTranslationInter = true;

$(document).ready(function() {
    init();
    initHandlers();
    onWindowResize();
    animate();
});

/**
 * Creates all the required objects for the scene
 */
function init() {

    // Is this the translation or rotation interactive?
    isTranslationInter = container.classList.contains('box-translation');

    // check that the browser is webgl compatible
    if (! detector.Detector.webgl) detector.Detector.addGetWebGLMessage();

    // create a camera object
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 500; // this sets it back from the cube object (to be created in this function)

    // create a new scene
    scene = new THREE.Scene();

    ///////////////////////////////// background //////////////////////////////

    var textureLoader = new THREE.CubeTextureLoader();
    textureLoader.setPath(imgPath);
    // loads the 6 background pictures (px = positive x, nx = negative x, etc)
    scene.background = textureLoader.load([
        'px.jpg', 'nx.jpg',
        'py.jpg', 'ny.jpg',
        'pz.jpg', 'nz.jpg'
    ]);

    //////////////////////////////////// box /////////////////////////////////////

    buildCube();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    // records the current cube position
    x_pos = cube.position.x;
    y_pos = cube.position.y;
    z_pos = cube.position.z;


    // sets the initial values of the x/y/z-coordinate text input boxes
    document.getElementById('desk-x-coordinate').value = x_pos;
    document.getElementById('desk-y-coordinate').value = y_pos;
    document.getElementById('desk-z-coordinate').value = z_pos;
    document.getElementById('mob-x-coordinate').value = x_pos;
    document.getElementById('mob-y-coordinate').value = y_pos;
    document.getElementById('mob-z-coordinate').value = z_pos;

    clearCode();


}


/**
 * creates cube geometry and adds it to the scene
 */
function buildCube() {

    // creates a box with sides of length 200
    var geometry = new THREE.BoxGeometry(200, 200, 200);

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

    // saved in a dictionary because we need to access them later to compare with user's selection
    boxSymbols['top_side'] = top_side[0];
    boxSymbols['back_side'] = back_side[0];
    boxSymbols['front_side'] = front_side[0];
    boxSymbols['left_side'] = left_side[0];
    boxSymbols['right_side'] = right_side[0];
    boxSymbols['bottom_side'] = bottom_side[0];


    // loads all the symbols for the box
    var symbolLoader = new THREE.TextureLoader();
    symbolLoader.setPath(boxImgPath);
    var materials = [
        new THREE.MeshBasicMaterial({
           map: symbolLoader.load('square' + right_side + '-256px-grayscale.png')
        }),
        new THREE.MeshBasicMaterial({
            // non grey scale becuase this is the first symbol the user needs to find
           map: symbolLoader.load('square' + left_side + '-256px.png')
        }),
        new THREE.MeshBasicMaterial({
           map: symbolLoader.load('square' + top_side + '-256px-grayscale.png') // top, non-coded side
        }),
        new THREE.MeshBasicMaterial({
           map: symbolLoader.load('square' + bottom_side + '-256px-grayscale.png')
        }),
        new THREE.MeshBasicMaterial({
           map: symbolLoader.load('square' + front_side + '-256px-grayscale.png') // front, non-coded side
        }),
        new THREE.MeshBasicMaterial({
           map: symbolLoader.load('square' + back_side + '-256px-grayscale.png') // back, non-coded side
        })
    ];

    // put the loaded materials onto the cube object
    cube = new THREE.Mesh(geometry, materials);

    // add the cube to the scene
    scene.add(cube);

}


/**
 * Adjust the scene accordingly if the user changes the size of the window
 */
function onWindowResize() {

    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    windowHalfX = screenWidth / 2;
    windowHalfY = screenHeight / 2;

    camera.aspect = screenWidth / screenHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(screenWidth, screenHeight);

}


/**
 * Animation loop so that the scene keeps updating
 */
function animate() {

    requestAnimationFrame(animate);
    TWEEN.update();

    // makes the camera follow the box around the scene
    camera.lookAt(cube.position);

    if (rotateObject) {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.01;
    }

    render();

}


/**
 * Display the given scene with the given camera
 */
function render() {
    renderer.render(scene, camera);
}


/**
 * triggered when the user changes the coordinates of the box
 * change the x/y/z coordinate and move the box
 * Input:
     - axis is a string, either 'x', 'y' or 'z'
     - change is a string, either '-' or '+'
     - axis and change come from the mobile version of the page (input buttons)
 */
function updateCoords(axis, change) {

    if (axis == 'x') {
        if (change == '-') {
            x_pos = (x_pos - difference);
        } else if (change == '+') {
            x_pos = (x_pos + difference);
        } else { // else the parameters were not given and it must be input box from desktop browser
            // using 0 makes the value be set relative to start position, rather than previous position
            var value = parseInt(document.getElementById('desk-x-coordinate').value);
            if (isNaN(value) || value == null) {
                x_pos = 0;
            } else {
                x_pos = value;
            }
        }
        x_pos = limiter(x_pos);
        document.getElementById('mob-x-coordinate').value = x_pos;
        document.getElementById('desk-x-coordinate').value = x_pos;
    } else if (axis == 'y') {
        if (change == '-') {
            y_pos = (y_pos - difference);
        } else if (change == '+') {
            y_pos = (y_pos + difference);
        } else {
            var value = parseInt(document.getElementById('desk-y-coordinate').value);
            if (isNaN(value) || value == null) {
                y_pos = 0;
            } else {
                y_pos = value;
            }
        }
        y_pos = limiter(y_pos);
        document.getElementById('mob-y-coordinate').value = y_pos;
        document.getElementById('desk-y-coordinate').value = y_pos;
    } else {
        if (change == '-') {
            z_pos = (z_pos - difference);
        } else if (change == '+') {
            z_pos = (z_pos + difference);
        } else {
            var value = parseInt(document.getElementById('desk-z-coordinate').value);
            if (isNaN(value) || value == null) {
                z_pos = 0;
            } else {
                z_pos = value;
            }
        }
        z_pos = limiter(z_pos);
        document.getElementById('mob-z-coordinate').value = z_pos;
        document.getElementById('desk-z-coordinate').value = z_pos;
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
    if (selectedSymbolId == undefined) {
        return;
    }

    document.getElementById(selectedSymbolId).src = boxImgPath + 'square' + selectedSymbolId + '-256px-grayscale.png';

    var img_src = boxImgPath + 'square' + selectedSymbolId + '-256px.png';

    if (code[1] == null) {
        code[1] = selectedSymbolId;
        document.getElementById('first-symbol').src = img_src;
        // replace left with grayscale
        updateSide(1,  boxSymbols['left_side'], false);
        // replace bottom with colour
        updateSide(3,  boxSymbols['bottom_side'], true);
    } else if (code[2] == null) {
        code[2] = selectedSymbolId;
        document.getElementById('second-symbol').src = img_src;
        // replace bottom with grayscale
        updateSide(3,  boxSymbols['bottom_side'], false);
        // replace right with colour
        updateSide(0,  boxSymbols['right_side'], true);
    } else if (code[3] == null) {
        code[3] = selectedSymbolId;
        document.getElementById('third-symbol').src = img_src;
    }

    selectedSymbolId = undefined;


}


/**
 * changes the picture on the given side of the box
 * Input:
     - side: numbered side of the cube to change
     - currentImg: integer (given as string) corresponding to number used in file names
     - coloured: boolean value indicating whether to use grayscale or coloured image
 */
function updateSide(side, currentImg, coloured) {
    var format = '';
    if (coloured == false) {
        format = '-grayscale';
    }
    cube.material[side].map = new THREE.TextureLoader().load(
            boxImgPath + 'square' + currentImg + '-256px' + format + '.png',
            undefined,
            function() {
                cube.material[side].map.needsUpdate = true;
                // TODO potential memory leak since not removing old image. check this.
            }
   );
}


/**
 * triggered when the user clicks the "Check Code" button
 * checks each selected symbol for if it matches what is on the box
 */
function submitCode() {


    if (code[1] == boxSymbols['left_side']) {
        if (code[2] == boxSymbols['bottom_side']) {
            if (code[3] == boxSymbols['right_side']) {
                end();
                return;
            }
        }
    }

    // if the code was not correct
    // tell the user their code was incorrect
    incorrect();
}


/**
 * shake the box!
 */
function incorrect() {

    updateCoords(); //checks for if user clicks "Check Code" without changing coordinates

    var target;
    var count = 0;
    var timer = 0;
    var shift = 20;
    if (isTranslationInter) {
        x_pos *= scale;
        y_pos *= scale;
        z_pos *= scale;
    } else {
        x_pos = 0;
        y_pos = 0;
        z_pos = 0;
    }
    var start_pos = x_pos;
    x_pos += shift;

    window.setTimeout(function () {
        function run() {
            if (count == 10) {
                clearInterval(timer);
                // clear the code for the user to start over
                clearCode();
            } else {
                if (count == 9) {
                    x_pos = start_pos;
                }
                target = { x: x_pos, y: y_pos, z: z_pos };
                // move the box on the next animation loop
                TWEEN.removeAll();
                new TWEEN.Tween(cube.position)
                    .to(target)
                    .easing (TWEEN.Easing.Elastic.Out)
                    .start();
                TWEEN.update();

                if (x_pos == start_pos + shift) {
                    x_pos = start_pos - shift;
                } else {
                    x_pos = start_pos + shift;
                }

                count += 1;
                timer = setTimeout(run, 50);
            }
        }
        timer = setTimeout(run, 50);
    }, 50);

}


/**
 * Shows the cube in full colour when the user enters the correct code
 */
function end() {

    // hide the user input div to give more screen space
    document.getElementById('user-input').style.display = 'none';

    document.getElementById('restart-button').style.display = 'block';

    // colour every side of the cube
    updateSide(0,  boxSymbols['right_side'], true);
    updateSide(1,  boxSymbols['left_side'], true);
    updateSide(2,  boxSymbols['top_side'], true);
    updateSide(3,  boxSymbols['bottom_side'], true);
    updateSide(4,  boxSymbols['front_side'], true);
    updateSide(5,  boxSymbols['back_side'], true);

    // move box back to central position
    x_pos = 0;
    y_pos = -10;
    z_pos = 0;
    moveBox();

    // move camera (zoom in)
    var target = { x: 0, y: 0, z: 350 };
    new TWEEN.Tween(camera.position)
        .to(target, 2000)
        .easing (TWEEN.Easing.Elastic.Out)
        .start();

    // Start rotating the object
    rotateObject = true;

}


/**
 * triggered when the user clicks the "clear" button or the wrong code is submitted
 * un-set the selected codes and clear the dictionary
 */
function clearCode() {

    // reset to start position
    x_pos = 0;
    y_pos = 0;
    z_pos = 0;

    document.getElementById('desk-x-coordinate').value = x_pos;
    document.getElementById('desk-y-coordinate').value = y_pos;
    document.getElementById('desk-z-coordinate').value = z_pos;
    document.getElementById('mob-x-coordinate').value = x_pos;
    document.getElementById('mob-y-coordinate').value = y_pos;
    document.getElementById('mob-z-coordinate').value = z_pos;

    moveBox();

    selectedSymbolId = code[1];

    document.getElementById('first-symbol').src = imgPath + 'question-1.png';
    document.getElementById('second-symbol').src =  imgPath + 'question-2.png';
    document.getElementById('third-symbol').src =  imgPath + 'question-3.png';
    code[1] = null;
    code[2] = null;
    code[3] = null;

    // replace left with colour
    updateSide(1,  boxSymbols['left_side'], true);
    // replace bottom with grayscale
    updateSide(3,  boxSymbols['bottom_side'], false);
    // replace right with grayscale
    updateSide(0,  boxSymbols['right_side'], false);


}


/**
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
            document.getElementById(i).src = boxImgPath + 'square' + i + '-256px.png';
        } else {
            document.getElementById(i).src = boxImgPath + 'square' + i + '-256px-grayscale.png';
        }
    }

}

/**
 * triggered when the user clicks outside an input box
 * updates the cube's position to match the coordinates set by the user
 */
function moveBox() {

    emptyCheck(x_pos, y_pos, z_pos);

    if (isTranslationInter) {
        // use the coordinates to set a new target for the box
        var target = {
            x: x_pos * scale,
            y: y_pos * scale,
            z: z_pos * scale
        };

        // move the box on the next animation loop
        TWEEN.removeAll();
        new TWEEN.Tween(cube.position)
            .to(target, 1000)
            .easing(TWEEN.Easing.Back.Out)
            .start();
    } else {
        // sets target rotations
        // values are converted to radians (divide by 180 and multiply by Pi)
        var target = {
            x: (x_pos/180) * Math.PI,
            y: (y_pos/180) * Math.PI,
            z: (z_pos/180) * Math.PI
        };

        // rotate the box on the next animation loop
        TWEEN.removeAll();
        new TWEEN.Tween(cube.rotation)
            .to(target, 2000)
            .easing (TWEEN.Easing.Elastic.Out)
            .onUpdate(render)
            .start();
    }

}

/**
 * triggered when user types input
 * Ensures user input stays within reasonable bounds
 */
function limiter(pos) {
    if (isTranslationInter) {
        if (pos < -360) {
            return -360;
        } else if (pos > 360) {
            return 360;
        }
        return pos;
    } else {
        // Ensure value is in the range [0, 360]
        if (pos < 0) {
            return (360 - (Math.abs(pos) % 360));
        }
        return pos % 360;
    }

}

/**
 * check that a value was given for the cube's position
 * if not, set it to 0 and update the entry boxes for the user
 */
function emptyCheck(x_pos, y_pos, z_pos) {

    if (isNaN(x_pos)) {
        x_pos = 0;
        document.getElementById('desk-x-coordinate').value = x_pos;
        document.getElementById('mob-x-coordinate').value = x_pos;
    } else if (isNaN(y_pos)) {
        y_pos = 0;
        document.getElementById('desk-y-coordinate').value = y_pos;
        document.getElementById('mob-y-coordinate').value = y_pos;
    } else if (isNaN(z_pos)){
        z_pos = 0;
        document.getElementById('desk-z-coordinate').value = z_pos;
        document.getElementById('mob-z-coordinate').value = z_pos;
    }

}

/**
 * triggered when user clicks "Restart" button after correctly guessing code
 */
function reset() {

    // hide restart button
    document.getElementById('restart-button').style.display = 'none';
    document.getElementById('user-input').style.display = 'block';

    // Stop rotating the cube
    rotateObject = false;

    clearCode();

    // rebuilds the cube
    //   - the sides of the cube have to be randomly selected again and set to be visible again
    //     therefore it is easier to just rebuild the cube than edit every side
    scene.remove(cube);
    buildCube();

    // move camera (zoom out)
    var target = { x: 0, y: 0, z: 500 };
    new TWEEN.Tween(camera.position)
        .to(target)
        .easing (TWEEN.Easing.Elastic.Out)
        .onUpdate(render)
        .start();
}



/**
 * If an input box is focused, updates the box from the value in it and focuses on the next box
 */
function runEnterHandler() {
    var activeElement = document.activeElement;
    var id = activeElement.id;

    switch(id) {
        case('desk-x-coordinate'):
            updateCoords('x', null);
            $('#desk-y-coordinate').focus();
            break;
        case('desk-y-coordinate'):
            updateCoords('y', null);
            $('#desk-z-coordinate').focus();
            break;
        case('desk-z-coordinate'):
            updateCoords('z', null);
            $('#desk-x-coordinate').focus();
            break;
    }
}

/**
 * Initialises interface related handler functions
 */
function initHandlers() {
    $('#restart-button').on('click', function() {
        reset();
    });
    $('#desk-x-coordinate').on('click', function() {
        updateCoords('x');
    });
    $('#desk-y-coordinate').on('click', function() {
        updateCoords('y');
    });
    $('#desk-z-coordinate').on('click', function() {
        updateCoords('z');
    });
    $('#mob-x-n').on('click', function() {
        updateCoords('x', '-');
    });
    $('#mob-x-p').on('click', function() {
        updateCoords('x', '+');
    });
    $('#mob-y-n').on('click', function() {
        updateCoords('y', '-');
    });
    $('#mob-y-p').on('click', function() {
        updateCoords('y', '+');
    });
    $('#mob-z-n').on('click', function() {
        updateCoords('z', '-');
    });
    $('#mob-z-p').on('click', function() {
        updateCoords('z', '+');
    });
    $('#1').on('click', function() {
        symbolClick('1');
    });
    $('#2').on('click', function() {
        symbolClick('2');
    });
    $('#3').on('click', function() {
        symbolClick('3');
    });
    $('#4').on('click', function() {
        symbolClick('4');
    });
    $('#5').on('click', function() {
        symbolClick('5');
    });
    $('#6').on('click', function() {
        symbolClick('6');
    });
    $('#7').on('click', function() {
        symbolClick('7');
    });
    $('#8').on('click', function() {
        symbolClick('8');
    });
    $('#submit-symbol').on('click', function() {
        submitSymbol();
    });
    $('#clear-code').on('click', function() {
        clearCode();
    });
    $('#submit-code').on('click', function() {
        submitCode();
    });

    $('#desk-x-coordinate').on('blur', function() {
        updateCoords('x', null);
    });
    $('#desk-y-coordinate').on('blur', function() {
        updateCoords('y', null);
    });
    $('#desk-z-coordinate').on('blur', function() {
        updateCoords('z', null);
    });
    
    $(document).on('keypress', function(key) {
        if(key.which == 13) {
            // Enter was pressed
            runEnterHandler();
        }
    });
}



var stats;
var container = document.getElementById( 'container' );
var camera, scene, renderer;
var cube, plane;
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
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    container.appendChild( info );

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.y = 150;
    camera.position.z = 500;

    scene = new THREE.Scene();

    //Cube

    // creates a box with sides of length 200
    var geometry = new THREE.BoxGeometry( 200, 200, 200 );

    // list of possible box symbols
    var symbols = [ 'square2.jpg', 'square3.jpg', 'square4.jpg',
        'square5.jpg', 'square6.jpg', 'square7.jpg', 'square8.jpg' ];

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
    // set the cube's initial position
    cube.position.y = 150;

    // add the cube to the scene
    scene.add( cube );

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

    // TODO probably useful for the box rotation interactive
    // rotates the plane to match the cube
    //plane.rotation.y = cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.05;
    renderer.render( scene, camera );

}


function moveBox() {
    /* triggered when the user hits the "enter" (or "return") key
     * updates the cube's position to match the the coordinates inputted by the user
     */

    // get each coordinate value from the input box */
    var x_pos = 0 + parseInt(document.getElementById( 'x-coordinate' ).value);
    var y_pos = 0 + parseInt(document.getElementById( 'y-coordinate' ).value);
    var z_pos = 0 + parseInt(document.getElementById( 'z-coordinate' ).value);

    // use the coordinates to set a new target for the box
    var target = { x: x_pos, y: y_pos, z: z_pos };

    // move the box on the next animation loop
    TWEEN.removeAll();
    new TWEEN.Tween( cube.position )
        .to( target )
        .easing ( TWEEN.Easing.Elastic.Out )
        .onUpdate( render )
        .start();

}


function submitCode() {
    /* triggered when the user clicks the "submit" button
     * checks each selected symbol for if it matches what is on the box
     */

    if ( code[1] == boxSymbols['left_side'] ) {
        if ( code[2] == boxSymbols['bottom_side'] ) {
            if ( code[3] == boxSymbols['right_side'] ) {
                console.log("correct");
            }
        }
    }
}


function clearCode() {
    /* triggered when the user clicks the "clear" button
     * set the selected codes to question marks and clear the dictionary
     */

    document.getElementById( 'first-symbol' ).src = 'question_mark.jpg';
    document.getElementById( 'second-symbol' ).src = 'question_mark.jpg';
    document.getElementById( 'third-symbol' ).src = 'question_mark.jpg';
    code[1] = null;
    code[2] = null;
    code[3] = null;
}


function symbolClick(id) {
    /* When a symbol is clicked, add it to the first empty spot
     * (where "spot" refers to the boxes with question marks in them)
     * and update the dictionary mapping the three sides to the selected symbols
     * Input:
     *   - id: relates to a particular symbol (each symbol's file name contains a number in 1-8)
     */

    var img_src = 'square' + id + '.jpg';
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

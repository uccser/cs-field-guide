document.title = 'Graphics Translation - CSFG';

// change transformation title to 'Translation'
document.getElementById( 'transformation-title' ).innerHTML = 'Translation';

function moveBox() {
    /* triggered when the user hits the "enter" (or "return") key
     * updates the cube's position to match the the coordinates inputted by the user
     */

    // get each coordinate value from the input box
    // using 0 makes the value be set relative to start position, rather than previous position
    var x_pos = 10 * ( 0 + parseInt(document.getElementById( 'x-coordinate' ).value) );
    var y_pos = 10 * ( 0 + parseInt(document.getElementById( 'y-coordinate' ).value) );
    var z_pos = 10 * ( 0 + parseInt(document.getElementById( 'z-coordinate' ).value) );

    // use the coordinates to set a new target for the box
    var target = { x: x_pos, y: y_pos, z: z_pos };

    // move the box on the next animation loop
    TWEEN.removeAll();
    new TWEEN.Tween( cube.position )
        .to( target, 2000 )
        .easing( TWEEN.Easing.Elastic.Out )
        .onUpdate( render )
        .start();

}

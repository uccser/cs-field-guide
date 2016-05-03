document.title = 'Graphics Translation - CSFG';

function moveBox() {
    /* triggered when the user hits the "enter" (or "return") key
     * updates the cube's position to match the the coordinates inputted by the user
     */

    // get each coordinate value from the input box
    // using 0 makes the value be set relative to start position, rather than previous position
    x_pos = 10 * ( 0 + parseInt(document.getElementById( 'x-coordinate' ).value) );
    y_pos = 10 * ( 0 + parseInt(document.getElementById( 'y-coordinate' ).value) );
    z_pos = 10 * ( 0 + parseInt(document.getElementById( 'z-coordinate' ).value) );

    emptyCheck();

    // use the coordinates to set a new target for the box
    var target = { x: x_pos, y: y_pos, z: z_pos };

    // move the box on the next animation loop
    TWEEN.removeAll();
    new TWEEN.Tween( cube.position )
        .to( target, 1000 )
        .easing( TWEEN.Easing.Back.InOut )
        .onUpdate( render )
        .start();

}

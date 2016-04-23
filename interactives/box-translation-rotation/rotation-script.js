document.title = 'Graphics Rotation - CSFG';

// change transformation title to 'Rotation'
document.getElementById( 'transformation-title' ).innerHTML = 'Rotation';

function moveBox() {
    /* triggered when the user hits the "enter" (or "return") key
     * rotates the cube to match the the values inputted by the user
     */

    // get each value from the input box */
    var x_pos = 0 + parseInt(document.getElementById( 'x-coordinate' ).value);
    var y_pos = 0 + parseInt(document.getElementById( 'y-coordinate' ).value);
    var z_pos = 0 + parseInt(document.getElementById( 'z-coordinate' ).value);

    // sets target rotations
    // values are converted to radians
    var target = { x: ( x_pos/360 ) * Math.PI,
            y: ( y_pos/360 ) * Math.PI,
            z: ( z_pos/360 ) * Math.PI
    };

    // rotate the box on the next animation loop
    TWEEN.removeAll();
    new TWEEN.Tween( cube.rotation )
        .to( target, 2000 )
        .easing ( TWEEN.Easing.Elastic.Out )
        .onUpdate( render )
        .start();

}

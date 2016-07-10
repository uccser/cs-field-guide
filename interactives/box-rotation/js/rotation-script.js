scale = 1;

function moveBox() {
    /* triggered when the user hits the "enter" (or "return") key
     * rotates the cube to match the the values inputted by the user
     */

    emptyCheck();

    // sets target rotations
    // values are converted to radians (divide by 360 and multiply by 2 Pi)
    var target = {
        x: ( x_pos/180 ) * Math.PI,
        y: ( y_pos/180 ) * Math.PI,
        z: ( z_pos/180 ) * Math.PI
    };

    // rotate the box on the next animation loop
    TWEEN.removeAll();
    new TWEEN.Tween( cube.rotation )
        .to( target, 2000 )
        .easing ( TWEEN.Easing.Elastic.Out )
        .onUpdate( render )
        .start();

}


/*
 * triggered when user types input
 */
function limiter( pos ) {

    // takes the mod360 of the given input (to match 360 degree revolution)
    return pos%360;

}


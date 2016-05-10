document.title = 'Graphics Rotation - CSFG';

difference = 10;

function moveBox() {
    /* triggered when the user hits the "enter" (or "return") key
     * rotates the cube to match the the values inputted by the user
     */

    emptyCheck();

    // sets target rotations
    // values are converted to radians
    var target = { x: ( x_pos/360 ) * Math.PI,
            y: ( y_pos/360 ) * Math.PI,
            z: ( z_pos/360 ) * Math.PI
    };

    console.log(target);

    // rotate the box on the next animation loop
    TWEEN.removeAll();
    new TWEEN.Tween( cube.rotation )
        .to( target, 2000 )
        .easing ( TWEEN.Easing.Elastic.Out )
        .onUpdate( render )
        .start();

}

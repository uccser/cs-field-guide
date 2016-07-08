scale = 10;

function moveBox() {
    /* triggered when the user hits the "enter" (or "return") key
     * updates the cube's position to match the the coordinates inputted by the user
     */

    emptyCheck();

    // use the coordinates to set a new target for the box
    var target = {
        x: x_pos * scale,
        y: y_pos * scale,
        z: z_pos * scale
    };

    // move the box on the next animation loop
    TWEEN.removeAll();
    new TWEEN.Tween( cube.position )
        .to( target, 1000 )
        .easing( TWEEN.Easing.Back.InOut )
        .onUpdate( render )
        .start();

}

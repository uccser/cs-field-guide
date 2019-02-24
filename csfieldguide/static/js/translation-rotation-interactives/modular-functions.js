module.exports = {
    /**
     * check that a value was given for the cube's position
     * if not, set it to 0 and update the entry boxes for the user
     */
    emptyCheck: function(x_pos, y_pos, z_pos) {

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

    },


    /**
     * triggered when user clicks "Restart" button after correctly guessing code
     */
    reset: function() {

        // hide restart button
        document.getElementById( 'restart-button' ).style.display = 'none';
        document.getElementById( 'user-input' ).style.display = 'block';

        // hide the teapot
        scene.remove( hiddenObject );

        clearCode();

        // rebuilds the cube
        //   - the sides of the cube have to be randomly selected again and set to be visible again
        //     therefore it is easier to just rebuild the cube than edit every side
        scene.remove( cube );
        buildCube();

        // move camera (zoom out)
        var target = { x: 0, y: 0, z: 500 };
        new TWEEN.Tween( camera.position )
            .to( target )
            .easing ( TWEEN.Easing.Elastic.Out )
            .onUpdate( render )
            .start();
    }
}
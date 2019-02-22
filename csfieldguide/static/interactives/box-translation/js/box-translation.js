var commonFunctions = require('../../../js/translation-rotation-interactives/common-functions.js');
//var TWEEN = require('tweenjs');
var THREE = require('three');

scale = 10;

module.exports = {

    moveBox: function(x_pos, y_pos, z_pos) {
        /* triggered when the user hits the "enter" (or "return") key
        * updates the cube's position to match the coordinates inputted by the user
        */

        commonFunctions.emptyCheck(x_pos, y_pos, z_pos);

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

    },


    /*
    * triggered when user types input
    * ensures that input is within (-360, 360)
    */
    limiter: function( pos ) {

        if ( pos < -360 ) {
            return -360;
        } else if ( pos > 360 ) {
            return 360;
        }
        return pos;

    }
}

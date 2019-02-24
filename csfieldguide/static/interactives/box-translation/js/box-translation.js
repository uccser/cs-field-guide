var commonFunctions = require('../../../js/translation-rotation-interactives/modular-functions.js');
var TWEEN = require('@tweenjs/tween.js');

scale = 10;

module.exports = {


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

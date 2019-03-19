/**
 * 
 */
var urlParameters = require('../../../js/third-party/url-parameters.js');

/*require('../../../interactives/packet-attack/js/packetattack')
var PHASER = require('phaser-ce');
var MOMENT = require('moment');
var MOMENT_DURATION_FORMAT = require('moment-duration-format');
var LODASH_COMPAT = require('lodash-compat');*/

$(document).ready(function() {
    alert(urlParameters.getUrlParameter("hello"));
});

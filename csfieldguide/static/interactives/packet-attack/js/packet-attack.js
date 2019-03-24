/**
 * 
 */
require('phaser');
var urlParameters = require('../../../js/third-party/url-parameters.js');
var GAME = require('./game.js');

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#AAAAAA',
    parent: 'interactive-packet-attack',
    scene: [GAME.GameScene]
}

$(document).ready(function() {
    var game = new Phaser.Game(config);
});

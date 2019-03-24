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
}

$(document).ready(function() {
    var game = new Phaser.Game(config);
    game.scene.add('gameScreen', GAME.GameScene, true, { x: 400, y: 300 });
    game.scene.add('gameUI', GAME.UIScene, true, { x: 400, y: 300 });
});

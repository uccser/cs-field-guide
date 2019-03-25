/**
 * 
 */
require('phaser');
var urlParameters = require('../../../js/third-party/url-parameters.js');
var GAME = require('./game.js');
var INFO = require('./info.js');

// Game config
var gameScene = new GAME.GameScene({ level: 0 });
var uiScene = new GAME.UIScene({ level: 0 });
var infoScene = new INFO.Information({ level: 0, paneType: INFO.InfoPaneType.START });

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#AAAAAA',
    parent: 'interactive-packet-attack',
    scene: [infoScene, uiScene, gameScene]
}

$(document).ready(function() {
    var game = new Phaser.Game(config);
});

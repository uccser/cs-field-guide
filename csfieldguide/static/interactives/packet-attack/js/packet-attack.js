/**
 * 
 */
require('phaser');
var urlParameters = require('../../../js/third-party/url-parameters.js');
var GAME = require('./game.js');
var INFO = require('./info.js');

var gameScene = new GAME.GameScene();
var uiScene = new GAME.UIScene();
var infoScene = new INFO.Information({ paneType: INFO.InfoPaneType.START });

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#AAAAAA',
    parent: 'interactive-packet-attack',
    scene: gameScene
}

$(document).ready(function() {
    var skip = urlParameters.getUrlParameter('start');
    if (skip) {
        infoScene.setStartLevel(skip);
    } else {
        infoScene.setStartLevel(1);
    }

    var game = new Phaser.Game(config);
    game.scene.add('UIScene', uiScene, true);
    game.scene.add('Information', infoScene, true);
});

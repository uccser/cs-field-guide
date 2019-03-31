/**
 * 
 */
require('phaser');
var urlParameters = require('../../../js/third-party/url-parameters.js');
var GAME = require('./game.js');
var INFO = require('./info.js');
var CONFIG = require('./config.js');

var gameScene = new GAME.GameScene();
var uiScene = new GAME.UIScene();
var infoScene = new INFO.Information({ paneType: INFO.InfoPaneType.START });

var urlMode = false;

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
    if (skip == 0 || skip == "custom") {
        setupCustomLevel(0);
        infoScene.setUrlMode();
        urlMode = true;
        infoScene.setStartLevel(0);
    } else if (skip) {
        infoScene.setStartLevel(skip);
    } else {
        infoScene.setStartLevel(1);
    }


    var game = new Phaser.Game(config);
    game.scene.add('UIScene', uiScene, true);
    game.scene.add('Information', infoScene, true);
});

function setupCustomLevel(number) {

    var urlLevel = {
        setMessage: urlParameters.getUrlParameter("message"),
        setPacketsHaveShields: urlParameters.getUrlParameter("shields") == "true",
        setPacketsHaveNumbers: urlParameters.getUrlParameter("numbers") == "true",
        setAcksNacksEnabled: urlParameters.getUrlParameter("acksnacks") == "true",
        setTimeoutsEnabled: urlParameters.getUrlParameter("timeouts") == "true",
        setDelays: parseInt(urlParameters.getUrlParameter("delays")),
        setCorrupts: parseInt(urlParameters.getUrlParameter("corrupts")),
        setKills: parseInt(urlParameters.getUrlParameter("kills")),
    };

    CONFIG.setCustomLevel(number, urlLevel);
}

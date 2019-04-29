/**
 * Packet Attack
 * 
 * Creates and executes the game
 */

require('phaser');
var urlParameters = require('../../../js/third-party/url-parameters.js');
var GAME = require('./game.js');
var INFO = require('./information.js');
var CONFIG = require('./config.js');

$(document).ready(function() {
    //The canvas doesn't wait for fonts to be loaded, so if we load the game immediately
    //no text is displayed.
    $('#start-button').on('click', function() {
        $('#start-screen').hide();
        run();
    });
});

/**
 * Builds and executes the game.
 * No assets are loaded until the user presses start, but this is the simplest
 * method of ensuring the game font is always loaded first and is therefore visible
 */
function run() {
    var gameScene = new GAME.GameScene();
    var uiScene = new GAME.UIScene();
    var infoScene = new INFO.Information({ paneType: INFO.InfoPaneType.BEFORE_LEVEL });
    
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: '#AAAAAA',
        parent: 'interactive-packet-attack',
        scene: gameScene
    }

    var skip = urlParameters.getUrlParameter('start');
    if (skip == 0 || skip == "custom") {
        setupCustomLevel();
        infoScene.setUrlMode();
        infoScene.setStartLevel(0);
    } else if (skip) {
        infoScene.setStartLevel(skip);
    } else {
        infoScene.setStartLevel(1);
    }

    var game = new Phaser.Game(config);
    game.scene.add('UIScene', uiScene, true);
    game.scene.add('Information', infoScene, true);
}

/**
 * Overwrites values for the custom Level 0 based on URL parameters
 */
function setupCustomLevel() {

    var urlLevel = {
        setMessage: urlParameters.getUrlParameter("message"),
        setPacketsHaveShields: urlParameters.getUrlParameter("shields") == "true",
        setPacketsHaveNumbers: urlParameters.getUrlParameter("numbers") == "true",
        setAcksNacksEnabled: urlParameters.getUrlParameter("acksnacks") == "true",
        setTimeoutsEnabled: urlParameters.getUrlParameter("timeouts") == "true",
        setDelays: parseInt(urlParameters.getUrlParameter("delays")),
        setCorrupts: parseInt(urlParameters.getUrlParameter("corrupts")),
        setKills: parseInt(urlParameters.getUrlParameter("kills")),
        setCanAttackAcksNacks: urlParameters.getUrlParameter("attackreplies") == "true"
    };

    CONFIG.setCustomLevel(0, urlLevel);
}

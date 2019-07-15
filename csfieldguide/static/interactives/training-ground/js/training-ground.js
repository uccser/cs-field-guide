/**
 * trAIning ground
 * 
 * Creates and executes the game
 */

require('phaser');
var GAME = require('./game.js');

var game;
var numSimulations;
var numSticks;
var aiSensitivity;

$(document).ready(function() {
  //The canvas doesn't wait for fonts to be loaded, so if we load the game immediately
  //no text is displayed.
  $('#start-button').on('click', function() {
    $('#start-screen').hide();
    numSimulations = $('#num-simulations-select').val();
    console.log(numSimulations);
    numSticks = $('#num-sticks-select').val();
    console.log(numSticks);
    aiSensitivity = $('#sensitivity-select').val();
    console.log(aiSensitivity);
    run();
  });
});

/**
 * Builds and executes the game.
 * No assets are loaded until the user presses start, but this is the simplest
 * method of ensuring the game font is always loaded first and is therefore visible
 */
function run() {
  var gameParameters = {
    numSimulations: numSimulations,
    numSticks: numSticks,
    aiSensitivity: aiSensitivity
  }

  var gameScene = new GAME.GameScene(gameParameters);
  var uiScene = new GAME.UIScene();

  var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    backgroundColor: '#111111',
    parent: 'interactive-training-ground',
    scene: gameScene
  }
  
  game = new Phaser.Game(config);
  game.scene.add('UIScene', uiScene, true);
}

function reset() {
  //game.destroy() or something
  $('#num-simulations-select').val("0");
  $('#num-sticks-select').val("17");
  $('#sensitivity-select').val("5");
  $('#start-screen').show();
}

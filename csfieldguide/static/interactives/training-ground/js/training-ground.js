/**
 * trAIning ground
 * 
 * Creates and executes the game
 */

require('phaser');

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
  var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gameDiv');

  // load the game states:
  game.state.add('load', loadState);
  game.state.add('menu', menuState);
  game.state.add('play', playState);
  game.state.add('howtoplay', instructionState);

  // start with the load state:
  game.state.start('load');
}
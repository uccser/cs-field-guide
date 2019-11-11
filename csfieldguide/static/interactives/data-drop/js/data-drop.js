
require('phaser');
//var urlParameters = require('../../../js/third-party/url-parameters.js');
var GAME = require('./game.js');

$(document).ready(function() {
  var gameScene = new GAME.GameScene();
  var uiScene = new GAME.UIScene();
  
  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true
      }
    },
    backgroundColor: '#AAAAAA',
    parent: 'data-drop-game',
    scene: gameScene
  }

  var game = new Phaser.Game(config);
  game.scene.add('UIScene', uiScene, true);
});
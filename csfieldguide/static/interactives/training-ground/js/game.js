/**
 * trAIning ground
 * 
 * Main Gameplay Classes
 */

require('phaser');
var AI = require('./ai.js');
var PHASER_BUTTON = require('./phaser-button.js');

/**
 * Gameplay element.
 * Handles all stick, table and AI processing.
 */
class GameScene extends Phaser.Scene {

  constructor(config) {
    super({ key: 'GameScene'});

    this.initialSimulations = config.numSimulations;
    this.initialSticks = config.numSticks;
    this.initialSensitivity = config.aiSensitivity;
  }

  /**
   * Initialises all required variables, handlers, and relevant global registry values
   */
  init() {
    this.ai = new AI.AI();
    this.sticks = this.add.group();
  }

  /**
   * Loads all required base images
   */
  preload() {
    console.log('Loading base images...');

    this.load.image('stick', base + 'interactives/training-ground/assets/sprites/stick.png')
  }

  /**
   * Creates the GameScene, adds the preloaded background element and other assets
   */
  create() {
    this.createSticks();
    this.removeSticks(3);
    this.removeSticks(3);
    this.removeSticks(3);
  }

  createSticks() {
    this.sticks.clear();

    var sticksToAdd = this.initialSticks;
  
    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 7; x++) {
        if(sticksToAdd > 0) {
          this.sticks.create(85 + (x * 60), 110 + (y * 130), 'stick').setScale(0.5);
          //stick = sticks.create(40 + (x * 60), 50 + (y * 130), 'stick_key', null, 7*x + y +1);
        }
        sticksToAdd--
      }
    }
  }

  removeSticks(num) {
    var allSticks = this.sticks.getChildren();
    if (num > allSticks.length) {
      num = allSticks.length();
    }
    for(var i=0; i < num; i++) {
      allSticks[0].destroy();
    }
  }
}

/**
 * Game UI element.
 * Handles all button handling and other UI related tasks.
 */
class UIScene extends Phaser.Scene {

  constructor() {
    super({ key: 'UIScene' });
  }

  /**
   * Initialises all required variables and handlers
   */
  init() {
  }

  /**
   * Loads all required base images
   */
  preload() {
    this.load.spritesheet('button_number', base + 'interactives/training-ground/assets/buttons/button_green.png', {frameWidth: 100, frameHeight: 50});
    this.load.spritesheet('button_quit', base + 'interactives/training-ground/assets/buttons/button_red.png', {frameWidth: 100, frameHeight: 50});
    this.load.spritesheet('button_rematchOrSimulate', base + 'interactives/training-ground/assets/buttons/button_blue.png', {frameWidth: 100, frameHeight: 50});
  }

  /**
   * Builds the UI with all elements
   */
  create() {

    var buttonConfig = {
      'scene': this,
      'key': 'button_number',
      'up': 1,
      'over':0,
      'down':2,
      'x': 55,
      'y': 495,
      'text': "1",
      'textConfig': {
        font: '20px Arial',
        fill: '#ffffff',
        align: 'center',
      }
    }

    this.button_1 = new PHASER_BUTTON.PhaserTextButton(buttonConfig)

    buttonConfig.text = "2";
    buttonConfig.x = 160;
    
    this.button_2 = new PHASER_BUTTON.PhaserTextButton(buttonConfig)

    buttonConfig.text = "3";
    buttonConfig.x = 265;

    this.button_3 = new PHASER_BUTTON.PhaserTextButton(buttonConfig)

    buttonConfig.key = 'button_rematchOrSimulate';
    buttonConfig.text = gettext("Simulate");
    buttonConfig.x = 160;

    this.button_rematch = new PHASER_BUTTON.PhaserTextButton(buttonConfig);

    buttonConfig.text = gettext("Rematch");
    buttonConfig.x = 450;

    this.button_simulate = new PHASER_BUTTON.PhaserTextButton(buttonConfig);

    buttonConfig.key = 'button_quit';
    buttonConfig.text = gettext("Quit");
    buttonConfig.y =  555;

    this.button_quit = new PHASER_BUTTON.PhaserTextButton(buttonConfig);
  }
}

module.exports = {
  GameScene,
  UIScene
};

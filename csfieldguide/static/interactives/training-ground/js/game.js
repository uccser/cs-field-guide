/**
 * Packet Attack
 * 
 * Main Gameplay Classes
 */

require('phaser');
var AI = require('./ai.js');
var PHASER_BUTTONS = require('./phaser-buttons.js');

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
    this.load.spritesheet('button_1', base + 'interactives/training-ground/assets/buttons/button_1.png', {frameWidth: 100, frameHeight: 50});
    this.load.spritesheet('button_2', base + 'interactives/training-ground/assets/buttons/button_2.png', {frameWidth: 100, frameHeight: 50});
    this.load.spritesheet('button_3', base + 'interactives/training-ground/assets/buttons/button_3.png', {frameWidth: 100, frameHeight: 50});
    this.load.spritesheet('button_quit', base + 'interactives/training-ground/assets/buttons/button_red.png', {frameWidth: 100, frameHeight: 50});
    this.load.spritesheet('button_rematchOrSimulate', base + 'interactives/training-ground/assets/buttons/button_blue.png', {frameWidth: 100, frameHeight: 50});
  }

  /**
   * Builds the UI with all elements
   */
  create() {
    var buttonConfig = {
      'scene': this,
      'key': 'button_1',
      'up': 1,
      'over':0,
      'down':2,
      'x': 55,
      'y': 495
    }

    this.button_1 = new PHASER_BUTTONS.PhaserButton(buttonConfig)

    buttonConfig.key = 'button_2';
    buttonConfig.x = 160;
    
    this.button_2 = new PHASER_BUTTONS.PhaserButton(buttonConfig)

    buttonConfig.key = 'button_3';
    buttonConfig.x = 265;

    this.button_3 = new PHASER_BUTTONS.PhaserButton(buttonConfig)

    var textButtonConfig = {
      'scene': this,
      'key': 'button_quit',
      'up': 1,
      'over':0,
      'down':2,
      'x': 450,
      'y': 565,
      'text': "Quit",
      'textConfig': {
        font: '20px Arial',
        fill: '#ffffff',
        align: 'center',
      }
    }

    this.button_quit = new PHASER_BUTTONS.PhaserTextButton(textButtonConfig);

    textButtonConfig.key = 'button_rematchOrSimulate';
    textButtonConfig.text = 'Rematch';
    textButtonConfig.y = 505;

    this.button_rematch = new PHASER_BUTTONS.PhaserTextButton(textButtonConfig);

    textButtonConfig.text = 'Simulate';
    textButtonConfig.x = 160;
    textButtonConfig.y = 495;

    this.button_simulate = new PHASER_BUTTONS.PhaserTextButton(textButtonConfig);
  }
}

module.exports = {
  GameScene,
  UIScene
};

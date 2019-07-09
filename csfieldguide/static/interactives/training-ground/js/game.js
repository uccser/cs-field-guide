/**
 * Packet Attack
 * 
 * Main Gameplay Classes
 */

require('phaser');
var AI = require('./ai.js');

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
  }

  /**
   * Builds the UI with all elements
   */
  create() {
  }
}

module.exports = {
  GameScene,
  UIScene
};

require('phaser');

/**
 * Gameplay element.
 * Handles all Packet processing, including creation, timers, ACKs & NACKs, resending, etc.
 */
class GameScene extends Phaser.Scene {

  constructor() {
    super({ key: 'GameScene'});
  }

  /**
   * Initialises all required variables, handlers, and relevant global registry values
   */
  init() {
  }

  /**
   * Loads all required base images and sprites
   */
  preload() {
  }

  /**
   * Creates the GameScene, adds the preloaded background element and animations
   */
  create() {
  }

  /**
   * Handler function for a registry update.
   * If a handler is defined for the given key, apply the set handler for that key.
   */
  registryUpdate(parent, key, data) {
    if (this.handlers[key]) {
      this.handlers[key](this, data);
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
  }

  /**
   * Builds the UI with all elements
   */
  create() {
  }

  /**
   * Handler function for a registry update.
   * If a handler is defined for the given key, apply the set handler for that key.
   */
  registryUpdate(parent, key, data) {
    if (this.handlers[key]) {
      this.handlers[key](this, data);
    }
  }
}

module.exports = {
  GameScene,
  UIScene
};

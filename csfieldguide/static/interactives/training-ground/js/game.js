/**
 * trAIning ground
 * 
 * Main Gameplay Classes
 */

require('phaser');
var AI = require('./ai.js');
var PHASER_BUTTON = require('./phaser-button.js');

var TXT_REMAINING = gettext("Remaining sticks:");
var TXT_PLAYED = gettext("Games played:");
var TXT_TURN = gettext("Your turn.");

const TURNS = {
  'NONE': 0,
  'PLAYER': 1,
  'AI': 2
}

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
    this.handlers = {
      'remainingSticks': this.updateRemainingSticks,
      'whosTurn': this.updateWhosTurn
    };

    this.registry.events.on('changedata', this.registryUpdate, this);

    this.ai = new AI.AI(this, this.initialSticks, this.initialSensitivity);
    this.ai.init();
    this.sticks = this.add.group();

    // Set initial registry to impossible values, so assigning the start values triggers a registry change
    this.registry.set('remainingSticks', -1);
    this.registry.set('gamesPlayed', -1);
    this.registry.set('sticksChosen', -1);
    this.registry.set('whosTurn', TURNS.NONE);
  }

  /**
   * Loads all required base images
   */
  preload() {
    console.log('Loading base images...');

    this.load.image('stick', base + 'interactives/training-ground/assets/sprites/stick.png')
  }

  /**
   * Creates the GameScene, adds the stick assets and other parameters.
   * Is called after the UIScene loads important data
   */
  lateCreate() {
    this.createSticks();
    this.registry.set('remainingSticks', this.initialSticks);
    this.registry.set('gamesPlayed', 0);
  }

  createSticks() {
    this.sticks.clear();

    var sticksToAdd = this.initialSticks;
  
    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 7; x++) {
        if(sticksToAdd > 0) {
          this.sticks.create(85 + (x * 60), 110 + (y * 130), 'stick').setScale(0.5);
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

  /**
   * Handler function for a registry update.
   * If a handler is defined for the given key, apply the set handler for that key.
   */
  registryUpdate(parent, key, data) {
    if (this.handlers[key]) {
      this.handlers[key](this, data);
    }
  }

  updateRemainingSticks(scene, numSticks) {
    console.log('updating remaining sticks');
    scene.removeSticks(scene.sticks.getLength() - numSticks);
  }

  updateWhosTurn(scene, turn) {
    if (turn == TURNS.AI) {
      scene.ai.takeTurn();
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
    this.handlers = {
      'remainingSticks': this.updateRemainingSticks,
      'gamesPlayed': this.updateGamesPlayed,
      'sticksChosen': this.concludeAiTurn,
      'whosTurn': this.updateWhosTurn
    };

    this.registry.events.on('changedata', this.registryUpdate, this);
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

    var txtConfig = {
      font: '20px Arial',
      fill: '#ffffff'
    }

    this.remainingSticksText = this.add.text(10, 10, TXT_REMAINING, txtConfig);
    this.gamesPlayedText = this.add.text(300, 10, TXT_PLAYED, txtConfig);
    this.statusText = this.add.text(70, 440, 'Placeholder text.', txtConfig);
    this.turn = TURNS.NONE;

    this.scene.get('GameScene').lateCreate()

    var buttonConfig = {
      'scene': this,
      'key': 'button_number',
      'up': 1,
      'over':0,
      'down':2,
      'x': 120,
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
    buttonConfig.x = 230;
    
    this.button_2 = new PHASER_BUTTON.PhaserTextButton(buttonConfig)

    buttonConfig.text = "3";
    buttonConfig.x = 340;

    this.button_3 = new PHASER_BUTTON.PhaserTextButton(buttonConfig)

    buttonConfig.key = 'button_rematchOrSimulate';
    buttonConfig.text = gettext("Simulate");
    buttonConfig.x = 230;

    this.button_simulate = new PHASER_BUTTON.PhaserTextButton(buttonConfig);

    buttonConfig.text = gettext("Rematch");
    buttonConfig.x = 450;

    this.button_rematch = new PHASER_BUTTON.PhaserTextButton(buttonConfig);

    buttonConfig.key = 'button_quit';
    buttonConfig.text = gettext("Quit");
    buttonConfig.y =  555;

    this.button_quit = new PHASER_BUTTON.PhaserTextButton(buttonConfig);

    this.disableEndButtons();

    this.registry.set('whosTurn', TURNS.AI);
  }

  disableChoiceButtons() {
    this.button_1.disable();
    this.button_2.disable();
    this.button_3.disable();
  }

  enableChoiceButtons() {
    this.button_1.enable();
    this.button_2.enable();
    this.button_3.enable();
  }

  disableEndButtons() {
    this.button_simulate.disable();
    this.button_rematch.disable();
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

  updateRemainingSticks(scene, numSticks) {
    scene.remainingSticksText.setText(TXT_REMAINING + " " + numSticks);
  }

  updateGamesPlayed(scene, numGames) {
    scene.gamesPlayedText.setText(TXT_PLAYED + " " + numGames);
  }

  updateWhosTurn(scene, turn) {
    scene.turn = turn;
    if (scene.turn == TURNS.PLAYER) {
      scene.enableChoiceButtons();
    } else if (scene.turn == TURNS.AI) {
      scene.disableChoiceButtons();
    }
  }

  concludeAiTurn(scene, sticksChosen) {
    console.log('stugf');
    if (scene.turn == TURNS.AI) {
      var format = ngettext("Nathaniel chose 1 stick.", "Nathaniel chose %(num_sticks)s sticks.", sticksChosen);
      var numChosenText = interpolate(format, {'num_sticks': sticksChosen}, true);
      scene.statusText.setText(numChosenText + " " + TXT_TURN);
      scene.registry.set('whosTurn', TURNS.PLAYER);
    }
  }
}

module.exports = {
  GameScene,
  UIScene
};

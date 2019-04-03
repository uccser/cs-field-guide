/**
 * Packet Attack
 * 
 * Game Information class
 */

require('phaser');

var CONFIG = require('./config.js');
var BUTTON = require('./phaserButton.js');

// Internationalisation text //

var TXT_START = gettext("START");

// End //

var InfoPaneType = {
    FAIL: 0,
    PROCEED: 1,
    BEFORE_LEVEL: 2,
    START: 3,
    END: 4
  }

/**
 * Game Information.
 * This is the scene that displays at the very beginning of the game,
 * and before every level with a description of what's to come
 */
class Information extends Phaser.Scene {

  constructor(config) {
    super({ key: 'Information' });

    this.paneType = config.paneType;
    this.urlMode = false;
  }

  /**
   * Loads all required base images
   */
  preload() {
    console.log('Loading base Info images');
    this.load.image('blurred-bg', base + 'interactives/packet-attack/assets/blurredBackground.png');
    this.load.image('startButton', base + 'interactives/packet-attack/assets/startButton.png');
  }

  /**
   * Initialises relevant registry values
   */
  init() {
    this.registry.set('level', null);
  }

  /**
   * Loads the Information Scene on screen
   */
  create() {
    console.log('creating Info screen');
    this.gameScene = this.scene.get('GameScene');

    var buttonConfig = {
      scene: this,
      x: 400,
      y: 500,
      imageKey: 'startButton',
      buttonSize: [203, 122],
      text: TXT_START,
      textConfig: {
          font: '40px Open Sans',
          fill: '#007f0d',
          align: 'center',
        }
      }

    this.add.image(400, 300, 'blurred-bg');
    this.button = new BUTTON.PhaserButton(buttonConfig);
    this.button.setInteractive({ useHandCursor: true });
    this.createText();

    this.button.on('pointerdown', this.startLevel);
  }

  /**
   * Initialises the text to be displayed in the Scene, including title, subtitle
   * and description text
   */
  createText() {
    var config = {
      font: '40px Open Sans',
      fill: '#000000',
      wordWrap: { width: 790 },
      align: 'center',
    }

    var titleText = this.add.text(400, 0, "Packet Attack", config);
    titleText.setOrigin(0.5, 0);

    config.font = '28px Open Sans';


    var subTitleText = this.add.text(400, 50, "Information", config);
    subTitleText.setOrigin(0.5, 0);

    this.information = this.add.text(400, 100, this.generateFeedback(), config);
    this.information.setOrigin(0.5, 0);
  }

  /**
   * Prepares the canvas for the next game, as appropriate
   */
  startLevel() {
    if (this.scene.paneType == InfoPaneType.FAIL && this.scene.level.levelNumber >= CONFIG.FINAL_LEVEL) {
      this.scene.setPaneType(InfoPaneType.END);
    } else if (this.scene.paneType == InfoPaneType.START) {
      this.scene.setLevel(this.scene.level.levelNumber);
      this.scene.setPaneType(InfoPaneType.BEFORE_LEVEL);
    } else if (this.scene.paneType == InfoPaneType.PROCEED) {
      if (!this.scene.urlMode) {
        this.scene.setLevel(this.scene.level.levelNumber + 1);
      }
      this.scene.setPaneType(InfoPaneType.BEFORE_LEVEL);
    } else {
      this.scene.button.disableInteractive();
      this.scene.sendBackward();
      this.scene.gameScene.play();
    }
  }

  /**
   * Returns the Information scene to the front and allows interaction with its button
   */
  resumeInfo() {
    this.bringForward();
    this.button.setInteractive({ useHandCursor: true });
  }

  /**
   * Brings the info panel to the front, so that it and not the game is rendered
   */
  bringForward() {
    this.scene.bringToTop();
  }

  /**
   * Sends the info panel to the back, so that the game and not it is rendered
   */
  sendBackward() {
    this.scene.sendToBack();
  }

  /**
   * Sets the info screen to display the given pane type
   */
  setPaneType(pane) {
    this.paneType = pane;
    this.updateText();
  }

  /**
   * Sets all scenes to run the given level
   */
  setLevel(level) {
    this.registry.set('level', level);
    this.level = CONFIG.LEVELS[level];
  }

  /**
   * Sets the level to be used in the game, called when the game is first set up
   */
  setStartLevel(level) {
    this.level = CONFIG.LEVELS[level];
  }

  /**
   * Sets the game to be running a custom URL-Parameter-defined level
   */
  setUrlMode() {
    this.urlMode = true;
  }

  /**
   * Generates feedback text to be displayed, depending on where the user is in the game
   */
  generateFeedback() {
    var text = "";
    switch(this.paneType) {
      case InfoPaneType.FAIL:
        text = "You let the message get through!\nTry again.\n         ";
        break;
      case InfoPaneType.PROCEED:
        if (this.urlMode) {
          text = "Awesome!\nYou stopped the message being delivered.\nClick 'start' to repeat this custom level.";
        } else {
          text = "Awesome!\nYou stopped the message being delivered.\nClick 'start' to move to the next level.";
        }
        break;
      case InfoPaneType.BEFORE_LEVEL:
        if (this.urlMode) {
          text = "Welcome to this custom level!\n";
        } else {
          text = "Welcome to Level " + this.level.levelNumber + "!\n";
        }
        text += "In this level:\n"
            + (this.level.message.length > 1 ? "The left pipe is using many creatures to communicate\n" : "")
            + (this.level.packetsHaveShields ? "The creatures have shields to protect from corruption\n" : "")
            + (this.level.packetsHaveNumbers ? "The creatures have numbers\n" : "")
            + (this.level.acksNacksEnabled ? "The right pipe sends creatures back with results, green is good, red is bad\n" : "")
            + (this.level.canAttackAcksNacks ? "but the responses are also vulnerable to your attack!" : "")
            + (this.level.timeoutsEnabled ? "If the left pipe doesn't get a response, it will resend a creature\n" : "")
            + (this.level.levelNumber == 1 ? "There are no defenses!" : "");
        break;
      case InfoPaneType.START:
        text = "Welcome to Packet Attack. In this game, your job is to attack the packet creatures and stop messages being delivered.\nYou pass a level if the received message is any different from the one sent.\nWhile a creature is in the danger zone (indicated by the yellow and grey area) you may attack by clicking the command buttons.\nGood luck!"
        break;
      case InfoPaneType.END:
        text = "This level is actually impossible to beat\nThe system can handle anything you throw at it!\nThank you for playing!\n\n\n\n\nClick 'start' if you want to try this level again";
        break;
    }
    return text;
  }

  /**
   * Updates the description text as required
   */
  updateText() {
    this.information.setText(this.generateFeedback());
  }
}

module.exports = {
  Information,
  InfoPaneType
};

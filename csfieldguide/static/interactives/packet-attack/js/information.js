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

var TXT_TITLE = CONFIG.TITLE;
var TXT_INFORMATION = gettext("Information");

var TXT_FAIL = gettext("You let the message get through!") + '\n' + gettext("Try again.");

var TXT_PASS = gettext("Awesome!") + '\n' + gettext("You stopped the message being delivered.");
var TXT_REPEAT_CUSTOM = gettext("Click 'start' to repeat this custom level.")
var TXT_NEXT_LEVEL = gettext("Click 'start' to move to the next level.");

var TXT_WELCOME_TO_CUSTOM = gettext("Welcome to this custom level!");
var TXT_WELCOME_TO_LEVEL = gettext("Welcome to level");
var TXT_IN_THIS_LEVEL = gettext("In this level:");
var TXT_MULTIPACKET = gettext("The left pipe is using many creatures to communicate");
var TXT_SHIELDED = gettext("The creatures have shields to protect from corruption");
var TXT_NUMBERED = gettext("The creatures have numbers to protect packet order");
var TXT_ACKSNACKS = gettext("The right pipe sends creatures back with results, green is good, red is bad");
var TXT_ATTACK_ACKSNACKS = gettext("But the responses are also vulnerable to your attack!");
var TXT_TIMEOUTS = gettext("If the left pipe doesn't get a response, it will resend a creature");
var TXT_NO_DEFENCE = gettext("There are no defenses!");

/**
 * To allow custom fonts to be loaded, the Introduction screen has been moved
 * outside the game itself.
 * 
 * The underlying code remains in case it is needed again in future.
 * Just uncomment the part below and set the Information Scene to launch at
 * InfoPaneType.START
 */
var TXT_INTRODUCTION = "";
// var TXT_INTRODUCTION = gettext("Welcome to Packet Attack.")
//               + '\n' + gettext("In this game, your job is to attack the packet creatures and stop messages being delivered.")
//               + '\n' + gettext("You pass a level if the received message is any different from the one sent.")
//               + '\n' + gettext("While a creature is in the danger zone (indicated by the yellow and grey area) you may attack by clicking the command buttons.")
//               + '\n' + gettext("Good luck!");

var TXT_IMPOSSIBLE = gettext("This level is actually impossible to beat")
            + '\n' + gettext("The system can handle anything you throw at it!")
            + '\n' + gettext("Thank you for playing!")
            + '\n\n\n\n'
            + '\n' + gettext("Click 'start' if you want to try this level again")
            + '\n' + gettext("Or refresh the page if you want to start from the beginning");

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
    this.level = null;
  }

  /**
   * Loads all required base images
   */
  preload() {
    console.log('Loading base Info images');
    this.load.image('blurred-bg', base + 'interactives/packet-attack/assets/blurredBackground.png');
    this.load.image('startButton', base + 'interactives/packet-attack/assets/startButton.png');
    this.load.image('replayButton', base + 'interactives/packet-attack/assets/replayButton.png');
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
    this.registry.set('level', this.level.levelNumber);

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
    this.replayButton = this.add.image(100, 500, 'replayButton').setAlpha(0);
    this.button.setInteractive({ useHandCursor: true });
    this.createText();

    this.button.on('pointerdown', this.startLevel);
    this.replayButton.on('pointerdown', this.replayLevel);
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

    var titleText = this.add.text(400, 0, TXT_TITLE, config);
    titleText.setOrigin(0.5, 0);

    config.font = '28px Open Sans';


    var subTitleText = this.add.text(400, 50, TXT_INFORMATION, config);
    subTitleText.setOrigin(0.5, 0);

    this.information = this.add.text(400, 100, this.generateFeedback(), config);
    this.information.setOrigin(0.5, 0);
  }

  /**
   * Prepares the canvas for the next game, as appropriate
   */
  startLevel() {
    this.scene.hideReplayButton();
    if (this.scene.paneType == InfoPaneType.FAIL && this.scene.level.levelNumber >= CONFIG.FINAL_LEVEL) {
      this.scene.setPaneType(InfoPaneType.END);
    } else if (this.scene.paneType == InfoPaneType.START) {
      this.scene.setLevel(this.scene.level.levelNumber);
      this.scene.setPaneType(InfoPaneType.BEFORE_LEVEL);
    } else if (this.scene.paneType == InfoPaneType.PROCEED) {
      if (!this.scene.urlMode) {
        var nextLevel = this.scene.level.levelNumber + 1;
        if (nextLevel > CONFIG.FINAL_LEVEL) {
          nextLevel = 1;
        }
        this.scene.setLevel(nextLevel);
      }
      this.scene.setPaneType(InfoPaneType.BEFORE_LEVEL);
    } else {
      this.scene.button.disableInteractive();
      this.scene.sendBackward();
      this.scene.gameScene.play();
    }
  }

  /**
   * Prepares the canvas to replay the same level
   */
  replayLevel() {
    this.scene.hideReplayButton();
    this.scene.button.disableInteractive();
    this.scene.sendBackward();
    this.scene.gameScene.play();
  }

  /**
   * Returns the Information scene to the front and allows interaction with its button(s)
   */
  resumeInfo() {
    this.bringForward();
    if (this.paneType == InfoPaneType.PROCEED && !this.urlMode) {
      this.showReplayButton();
    }
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
   * Displays the replay button, and allows it to be clicked
   */
  showReplayButton() {
    this.replayButton.setAlpha(1);
    this.replayButton.setInteractive({ useHandCursor: true })
  }

  /**
   * Makes the replay button transparent, and disallows it to be clicked
   */
  hideReplayButton() {
    this.replayButton.setAlpha(0);
    this.replayButton.disableInteractive();
  }

  /**
   * Generates feedback text to be displayed, depending on where the user is in the game
   */
  generateFeedback() {
    var text = "";
    switch(this.paneType) {
      case InfoPaneType.FAIL:
        text = TXT_FAIL;
        break;
      case InfoPaneType.PROCEED:
        if (this.urlMode) {
          text = TXT_PASS + '\n' + TXT_REPEAT_CUSTOM;
        } else {
          text = TXT_PASS + '\n' + TXT_NEXT_LEVEL;
        }
        break;
      case InfoPaneType.BEFORE_LEVEL:
        if (this.urlMode) {
          text = TXT_WELCOME_TO_CUSTOM + '\n';
        } else {
          text = TXT_WELCOME_TO_LEVEL + ' ' + this.level.levelNumber + '!\n';
        }
        text += TXT_IN_THIS_LEVEL + '\n'
            + (this.level.message.length > 1 ? TXT_MULTIPACKET + '\n' : '')
            + (this.level.packetsHaveShields ? TXT_SHIELDED + '\n' : '')
            + (this.level.packetsHaveNumbers ? TXT_NUMBERED + '\n' : '')
            + (this.level.acksNacksEnabled ? TXT_ACKSNACKS + '\n' : '')
            + (this.level.canAttackAcksNacks ? TXT_ATTACK_ACKSNACKS + '\n' : '')
            + (this.level.timeoutsEnabled ? TXT_TIMEOUTS + '\n' : '')
            + (this.level.levelNumber == 1 ? TXT_NO_DEFENCE : '');
        break;
      case InfoPaneType.START:
        text = TXT_INTRODUCTION;
        break;
      case InfoPaneType.END:
        text = TXT_IMPOSSIBLE;
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

require('phaser');

var CONFIG = require('./config.js');

var InfoPaneType = {
    FAIL: 0,
    PROCEED: 1,
    BEFORE_LEVEL: 2,
    START: 3,
    END: 4
  }

/**
 * Game Information
 */
class Information extends Phaser.Scene {

    constructor(config) {
        super({ key: 'Information' });

        this.paneType = config.paneType;
        this.levelNum = config.level;
        this.level = CONFIG.LEVELS[this.levelNum];
    }

    preload() {
        this.load.image('blurred-bg', base + 'interactives/packet-attack/assets/blurredBackground.png');
        this.load.image('start_button', base + 'interactives/packet-attack/assets/startButton.png');
    }

    create() {
        this.add.image(400, 300, 'blurred-bg');
        this.button = this.add.image(400, 500, 'start_button').setInteractive();
        this.createText();

        this.bringForward();

        this.input.on('pointerup', this.sendBackward);

        this.gameScene = this.scene.get('GameScene');
    }

    /**
     * Brings the info panel to the front, so that it and not the game is rendered
     */
    bringForward() {
        this.scene.bringToTop();
    }

    /**
     * Sends the info panel to the back, so that the game and not it is rendered
     * 
     * In actuality it brings the other two panels to the front,
     * as this.scene.sendToBack() is apparently not a function
     */
    sendBackward() {
        this.gameScene.bringForward();
    }

    setPaneType(pane) {
        this.removeText();
        this.paneType = pane;
        this.createText();
    }

    generateFeedback() {

        var text = "";
        switch(this.paneType){
          case InfoPaneType.FAIL:
            text = "Sorry! \n You let the message get through. \n Try again. \n         ";
            break;
          case InfoPaneType.PROCEED:
            if (this.urlmode) {
              text = "Awesome! \n You stopped the messages being delivered. \n Click 'Start' to repeat this custom level!";
            } else {
              text = "Awesome! \n You stopped the messages being delivered. \n Click 'Start' to move to the next level!";
            }
            break;
          case InfoPaneType.BEFORE_LEVEL:
            text = "Welcome to Level " + this.level.levelNumber + "! \n" + "In this level:  \n"
                                                                             + (this.level.numberOfPackets > 1 ? "The left pipe is using many creatures to communicate \n" : "")
                                                                             + (this.level.packetsHaveShields ? "The creatures have shields \n" : "")
                                                                             + (this.level.packetsHaveNumbers ? "The creatures have numbers \n" : "")
                                                                             + (this.level.acksNacksEnabled ? "The right pipe sends creatures back with results, green is good, red is bad\n" : "")
                                                                             + (this.level.timeoutsEnabled ? "Resending of unconfirmed creatures \n" : "")
                                                                             + (this.level.levelNumber == 1 ? "There are no defenses, have fun!" : "");
            break;
          case InfoPaneType.START:
            text = "Welcome to Packet Attack. In this game, your job is to attack the packet creatures and stop messages being delivered. You pass a level by stopping at least one creature. When a creature enters the danger zone (indicated by the yellow and grey area) you may attack by clicking the command buttons. Good luck!"
            break;
          case InfoPaneType.END:
              text = "This level is actually impossible to beat. \n The system can handle anything you throw at it! \n Thank you for playing.\n Total Score: " + this.game.score.toString();
              //this.button.visible = false;
              //this.game.score = 0; //Reset score.
              break;
        }
        return text;
    }

    /**
     * TODO
     * Removes all text from the Scene
     */
    removeText() {

    }

    createText() {
        //Set up text
  
        var titleText = this.add.text(400, 0, "Packet Attack");
        titleText.fontSize = 40;
        titleText.fill = '#000000';
        titleText.wordWrap = true;
        titleText.wordWrapWidth = 800;
        titleText.align = 'center';
        titleText.font = 'Open Sans';
        //titleText.anchor.setTo(0.5, 0);
  
  
        var subTitleText = this.add.text(400, 50, "Information");
        subTitleText.fontSize = 30;
        subTitleText.fill = '#000000';
        subTitleText.wordWrap = true;
        subTitleText.wordWrapWidth = 800;
        subTitleText.align = 'center';
        subTitleText.font = 'Open Sans';
        //subTitleText.anchor.setTo(0.5, 0);
  
        var information = this.add.text(400, 100, this.generateFeedback());
        information.font = 'Open Sans';
        information.wordWrap = true;
        information.wordWrapWidth = 800;
        information.align = 'center';
        information.fontSize = 30;
        information.fill = '#000000';
        //information.anchor.setTo(0.5, 0);
    }
}

module.exports = {
    Information,
    InfoPaneType
};

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
    }

    preload() {
        console.log('preloading Info screen');
        this.load.image('blurred-bg', base + 'interactives/packet-attack/assets/blurredBackground.png');
        this.load.image('startButton', base + 'interactives/packet-attack/assets/startButton.png');
    }

    init() {
        this.registry.set('level', null);
        this.registry.events.on('changedata', function() {console.log('registry')});
    }

    create() {
        console.log('creating Info screen');
        this.gameScene = this.scene.get('GameScene');

        this.add.image(400, 300, 'blurred-bg');
        this.button = this.add.image(400, 500, 'startButton').setInteractive({ useHandCursor: true });
        this.createText();

        this.button.on('pointerdown', this.startLevel);
    }

    /**
     * 
     */
    startLevel() {
        if (this.scene.paneType == InfoPaneType.START) {
            this.scene.setLevel(1);
            this.scene.level = CONFIG.LEVELS[1];
            this.scene.setPaneType(InfoPaneType.BEFORE_LEVEL);
            console.log('setting level to 1');
        } else {
            this.scene.button.disableInteractive();
            this.scene.sendBackward();
            this.scene.gameScene.play();
        }
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
     * Sets the info screen to display the given level
     */
    setLevel(level) {
        this.registry.set('level', level);
        console.log('registry set to level ' + level);
    }

    generateFeedback() {

        var text = "";
        switch(this.paneType){
          case InfoPaneType.FAIL:
            text = "You let the message get through!\nTry again.\n         ";
            break;
          case InfoPaneType.PROCEED:
            if (this.urlmode) {
              text = "Awesome!\nYou stopped the messages being delivered.\nClick 'Start' to repeat this custom level.";
            } else {
              text = "Awesome!\nYou stopped the messages being delivered.\nClick 'Start' to move to the next level.";
            }
            break;
          case InfoPaneType.BEFORE_LEVEL:
            text = "Welcome to Level " + this.level.levelNumber + "!\n"
                    + "In this level:\n"
                    + (this.level.numberOfPackets > 1 ? "The left pipe is using many creatures to communicate\n" : "")
                    + (this.level.packetsHaveShields ? "The creatures have shields\n" : "")
                    + (this.level.packetsHaveNumbers ? "The creatures have numbers\n" : "")
                    + (this.level.acksNacksEnabled ? "The right pipe sends creatures back with results, green is good, red is bad\n" : "")
                    + (this.level.timeoutsEnabled ? "If the left pipe doesn't get a response, it will resend a creature\n" : "")
                    + (this.level.levelNumber == 1 ? "There are no defenses!" : "");
            break;
          case InfoPaneType.START:
            text = "Welcome to Packet Attack. In this game, your job is to attack the packet creatures and stop messages being delivered.\nYou pass a level if the received message is any different from the one sent.\nWhile a creature is in the danger zone (indicated by the yellow and grey area) you may attack by clicking the command buttons.\nGood luck!"
            break;
          case InfoPaneType.END:
              text = "This level is actually impossible to beat.\nThe system can handle anything you throw at it!\nThank you for playing.\nTotal Score: " + this.registry.get('score');
              //this.button.visible = false;
              //this.game.score = 0; //Reset score.
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

    createText() {
        //Set up text

        var config = {
            font: '40px Open Sans',
            fill: '#000000',
            wordWrap: { width: 790 },
            align: 'center',
        }
  
        var titleText = this.add.text(400, 0, "Packet Attack", config);
        titleText.setOrigin(0.5, 0);

        config.font = '30px';
  
  
        var subTitleText = this.add.text(400, 50, "Information", config);
        subTitleText.setOrigin(0.5, 0);
  
        this.information = this.add.text(400, 100, this.generateFeedback(), config);
        this.information.setOrigin(0.5, 0);
    }
}

module.exports = {
    Information,
    InfoPaneType
};

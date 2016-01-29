var InfoPaneType = {
  FAIL: 0,
  PROCEED: 1,
  BEFORE_LEVEL: 2,
  START: 3,
  END: 4
}
var info;

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {
    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() {
      game.time.events.add(Phaser.Timer.SECOND, info.createText(), this);
       },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Open Sans']
    }
  };

function Information(game, type, levelData) {

    this.game = game;
    this.pane = null;
    this.paneType = type;
    this.levelData = levelData;
    this.button = null;

    this.preload = function() {
      this.game.load.image('infobg', './assets/blurredBackground.png');
      this.game.load.image('start_button', 'assets/startButton.png');
      info = this;
      //  Load the Google WebFont Loader script
    }

    this.create = function() {
      this.game.add.image(0, 0, 'infobg');
      //Set up buttons
      this.button = this.game.add.button(300, 430, 'start_button', this.startPressed, this, 2, 1, 0);
      this.createText();
    }

    this.update = function() {}

    this.startPressed = function(button){
      switch(this.paneType){
        case InfoPaneType.FAIL:
          this.game.state.start(this.levelData.levelNumber.toString());
          break;
        case InfoPaneType.PROCEED:
          var key = this.levelData.levelNumber;
          key ++;
          key = key.toString() + "i";

          if (this.game.urlmode) {
            this.game.state.start('Xi');
            return;
          }
          else {
            this.game.state.start(key);
          }
          break;
        case InfoPaneType.BEFORE_LEVEL:
          this.game.state.start(this.levelData.levelNumber.toString());
          break;
        case InfoPaneType.START:
          this.game.state.start(levelData.levelNumber.toString() + "i");
          break;
        case InfoPaneType.END:
          this.game.state.start('0i');
          break;

      }
    }

    this.generateFeedback = function() {

    var text = "";
    switch(this.paneType){
      case InfoPaneType.FAIL:
        text = "Sorry! \n You let the message get through. \n Try again. \n         ";
        break;
      case InfoPaneType.PROCEED:
        if (this.game.urlmode) {
          text = "Awesome! \n You stopped the messages being delivered. \n Click 'Start' to repeat this custom level!";
        } else {
          text = "Awesome! \n You stopped the messages being delivered. \n Click 'Start' to move to the next level!";
        }
        break;
      case InfoPaneType.BEFORE_LEVEL:
        text = "Welcome to Level " + this.levelData.levelNumber + "! \n" + "In this level:  \n"
                                                                         + (this.levelData.numberOfPackets > 1 ? "The left pipe is using many creatures to communicate \n" : "")
                                                                         + (this.levelData.packetsHaveShields ? "The creatures have shields \n" : "")
                                                                         + (this.levelData.packetsHaveNumbers ? "The creatures have numbers \n" : "")
                                                                         + (this.levelData.acksNacksEnabled ? "The right pipe sends creatures back with results, green is good, red is bad\n" : "")
                                                                         + (this.levelData.timeoutsEnabled ? "Resending of unconfirmed creatures \n" : "")
                                                                         + (this.levelData.levelNumber == 1 ? "There are no defenses, have fun!" : "");
        break;
      case InfoPaneType.START:
        text = "Welcome to Packet Attack. In this game, your job is to attack the packet creatures and stop messages being delivered. You pass a level by stopping at least one creature. When a creature enters the danger zone (indicated by the yellow and grey area) you may attack by clicking the command buttons. Good luck!"
        break;
      case InfoPaneType.END:
          text = "This level is actually impossible to beat. \n The system can handle anything you throw at it! \n Thank you for playing.\n Total Score: " + this.game.score.toString();
          //this.button.visible = false;
          this.game.score = 0; //Reset score.
          break;
      break;
    }
    return text;
    }

    this.createText = function() {
      //Set up text

      var titleText = this.game.add.text(400, 0, "Packet Attack");
      titleText.fontSize = 40;
      titleText.fill = '#000000';
      titleText.wordWrap = true;
      titleText.wordWrapWidth = 800;
      titleText.align = 'center';
      titleText.font = 'Open Sans';
      titleText.anchor.setTo(0.5, 0);


      var subTitleText = this.game.add.text(400, 50, "Information");
      subTitleText.fontSize = 30;
      subTitleText.fill = '#000000';
      subTitleText.wordWrap = true;
      subTitleText.wordWrapWidth = 800;
      subTitleText.align = 'center';
      subTitleText.font = 'Open Sans';
      subTitleText.anchor.setTo(0.5, 0);

      var information = this.game.add.text(400, 100, this.generateFeedback());
      information.font = 'Open Sans';
      information.wordWrap = true;
      information.wordWrapWidth = 800;
      information.align = 'center';
      information.fontSize = 30;
      information.fill = '#000000';
      information.anchor.setTo(0.5, 0);
    }
}

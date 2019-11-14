require('phaser');

const BOUNDARY_LEFT  = 320;
const BOUNDARY_RIGHT = 790;
const SPACING = (BOUNDARY_RIGHT - BOUNDARY_LEFT) / 5; // For four equi-distant drop points
const MAX_OFFSET = SPACING * 0.8;                     // For variation in the drop points

const BALLS_PER_IMG = 10;

const DROP = [
  BOUNDARY_LEFT + 1 * SPACING,
  BOUNDARY_LEFT + 2 * SPACING,
  BOUNDARY_LEFT + 3 * SPACING,
  BOUNDARY_LEFT + 4 * SPACING
];

const IMAGE_SIZE = [1000, 444];
const SCALES = {
  CUP:   0.1,
  BALL:  0.025,
  IMAGE: 0.3
};
const COVER_SIZE = [IMAGE_SIZE[0] * SCALES.IMAGE, Math.ceil(IMAGE_SIZE[1] * SCALES.IMAGE)];
const SHIFT = Math.ceil(COVER_SIZE[1] / (BALLS_PER_IMG));

const YPOS = {
  KIWI:    10,
  PINGU:   153,
  COOK:    296,
  DOLPHIN: 439
}

const COLOURS = [ // In order of the images they reveal. Also used to key dictionaries
  'green',
  'purple',
  'red',
  'blue',
];

const FREQ = 2000; // (ms) Time between sets of ball drops
const STEP = 100;  // (ms) Time between individual ball drops per set

const TITLE = gettext("DATA DROP");
const DESCRIPTION = gettext("Use the arrow keys to move your CPU left and right.\n\n\
Process the balls of data to reveal images.\n\n\
How does the volume of data affect your performance?\n\n\n\n\
Press ENTER to start.");

/**
 * Gameplay element.
 */
class GameScene extends Phaser.Scene {

  constructor() {
    super({ key: 'GameScene'});
  }

  /**
   * Initialises all required variables, handlers, and relevant global registry values
   */
  init() {
    var scene = this;

    this.level = 0;
    this.registry.set('level', this.level);

    this.ballQueue = [];

    this.proportions = {};
    this.proportions[COLOURS[0]] = [0, null]; // Caught, out of
    this.proportions[COLOURS[1]] = [0, null];
    this.proportions[COLOURS[2]] = [0, null];
    this.proportions[COLOURS[3]] = [0, null];
    this.registry.set('proportions', this.proportions);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.enterKey = this.input.keyboard.addKey('ENTER');
    this.enterKey.on('down', function() { scene.runEnterHandler() });
  }

  /**
   * Loads all required base images
   */
  preload() {
    this.load.image('cook', base + 'interactives/data-drop/assets/cook.jpg');
    this.load.image('dolphin', base + 'interactives/data-drop/assets/dolphin.jpg');
    this.load.image('kiwi', base + 'interactives/data-drop/assets/kiwi.jpg');
    this.load.image('penguin', base + 'interactives/data-drop/assets/penguin.jpg');
    this.load.image('data-green', base + 'interactives/data-drop/assets/data-packet-green.png');
    this.load.image('data-blue', base + 'interactives/data-drop/assets/data-packet-blue.png');
    this.load.image('data-purple', base + 'interactives/data-drop/assets/data-packet-purple.png');
    this.load.image('data-red', base + 'interactives/data-drop/assets/data-packet-red.png');
    this.load.image('cup', base + 'interactives/data-drop/assets/pixel-cup.png');
    this.load.image('pixel', base + 'interactives/data-drop/assets/black-pixel.png');
  }

  /**
   * Creates the GameScene
   */
  create() {
    var scene = this;

    this.scenery = {};
    this.scenery[COLOURS[0]] = [     // [image, cover]
      this.add.image(10, YPOS.KIWI, 'kiwi').setOrigin(0, 0).setScale(SCALES.IMAGE),
      this.add.image(10, YPOS.KIWI, 'pixel').setOrigin(0, 0).setScale(COVER_SIZE[0], COVER_SIZE[1])
    ]
    this.scenery[COLOURS[1]] = [
      this.add.image(10, YPOS.PINGU, 'penguin').setOrigin(0, 0).setScale(SCALES.IMAGE),
      this.add.image(10, YPOS.PINGU, 'pixel').setOrigin(0, 0).setScale(COVER_SIZE[0], COVER_SIZE[1])
    ]
    this.scenery[COLOURS[2]] = [
      this.add.image(10, YPOS.COOK, 'cook').setOrigin(0, 0).setScale(SCALES.IMAGE),
      this.add.image(10, YPOS.COOK, 'pixel').setOrigin(0, 0).setScale(COVER_SIZE[0], COVER_SIZE[1])
    ]
    this.scenery[COLOURS[3]] = [
      this.add.image(10, YPOS.DOLPHIN, 'dolphin').setOrigin(0, 0).setScale(SCALES.IMAGE),
      this.add.image(10, YPOS.DOLPHIN, 'pixel').setOrigin(0, 0).setScale(COVER_SIZE[0], COVER_SIZE[1])
    ]

    this.cup = this.physics.add.image(555, 550, 'cup').setScale(SCALES.CUP);

    this.cupBoundary = this.physics.add.staticGroup();
    this.cupBoundary.create(BOUNDARY_LEFT, 550, 'pixel');
    this.cupBoundary.create(BOUNDARY_RIGHT, 550, 'pixel');
    this.cupBoundary.create(0, 610, 'pixel').setOrigin(0, 0).setScale(800, 1).refreshBody(); // Floor

    this.physics.add.collider(this.cup, this.cupBoundary);

    this.datas = this.physics.add.group();
    this.physics.add.collider(this.cupBoundary, this.datas, function(bound, data) { scene.dataMiss(data) });
    this.physics.add.overlap(this.cup, this.datas, function(cup, data) { scene.dataHit(data) });

    this.isPreGame = true;
    this.preGame();
  }

  /**
   * Keyboard controls for the cup
   */
  update() {
    if (this.cursors.left.isDown) {
      this.cup.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
      this.cup.setVelocityX(150);
    } else {
      this.cup.setVelocityX(0);
    }
  }

  /**
   * Runs an animation of dropping balls behind the start screen
   */
  preGame() {
    var scene = this;
    if (scene.isPreGame) {
      setTimeout(function() { scene.preGame() }, 1000);
      var offset = getRandomInteger(-1 * MAX_OFFSET, MAX_OFFSET);
      var positionX = offset + DROP[getRandomInteger(0, DROP.length - 1)];
      var name = 'data-' + COLOURS[getRandomInteger(0, COLOURS.length - 1)];
      scene.dropBall(positionX, name);
    }
  }

  nextLevel() {
    this.level++;
    this.registry.set('level', this.level);
    if (this.level <= 4) {
      this.resetProportions();
      this.setNullProportions();
      this.resetCovers();
      this.startLevel();
    }
  }

  resetProportions() {
    this.proportions[COLOURS[0]] = [0, 0];
    this.proportions[COLOURS[1]] = [0, 0];
    this.proportions[COLOURS[2]] = [0, 0];
    this.proportions[COLOURS[3]] = [0, 0];
  }

  setNullProportions() {
    switch (this.level) {
      case 1:
        this.proportions[COLOURS[2]][1] = null;
      case 2:
        this.proportions[COLOURS[1]][1] = null;
      case 3:
        this.proportions[COLOURS[3]][1] = null;
      default:
        break;
    }
  }

  /**
   * 
   * 
   * The game logic assumes that level number == number of images to reveal.
   * Changing that will be difficult
   */
  startLevel() {
    this.registry.set('proportions', this.proportions);
    var ballTypes = [];
    var localBallQueue = [];
    switch (this.level) {
      case 4:
        ballTypes.push(COLOURS[3]);
      case 3:
        ballTypes.push(COLOURS[1]);
      case 2:
        ballTypes.push(COLOURS[2]);
      case 1:
        ballTypes.push(COLOURS[0]);
      default:
        break;
    }
    for (var i=0; i < BALLS_PER_IMG; i++) {
      for (var x=0; x < ballTypes.length; x++) {
        localBallQueue.push('data-' + ballTypes[x]);
      }
    }
    shuffle(localBallQueue);
    this.ballQueue = localBallQueue;
    this.releaseBalls(0);
  }

  releaseBalls(num) {
    var scene = this;
    if (num < this.ballQueue.length) {
      setTimeout(function() { scene.releaseBalls(num + scene.level) }, FREQ);
      var delay = this.level > 2 ? STEP : STEP * 2;
      var offset = getRandomInteger(-1 * MAX_OFFSET, MAX_OFFSET);
      this.releaseBallSet(offset, delay, num, num + scene.level);
    }
    else {
      setTimeout(function() { scene.nextLevel() }, 10000);
    }
  }

  releaseBallSet(offset, delay, next, end) {
    var scene = this;
    if (next < end) {
      setTimeout(function() { scene.releaseBallSet(offset, delay, next + 1, end) }, delay);
      var positionX = offset + DROP[getRandomInteger(0, DROP.length - 1)];
      scene.dropBall(positionX, scene.ballQueue[next]);
    }
  }

  /**
   * Drops a new coloured ball with the given key at the given position
   */
  dropBall(xPosition, key) {
    this.datas.create(xPosition, -100, key).setScale(SCALES.BALL).setVelocityY(100).setAngularVelocity(-100);
  }

  /**
   * The given data ball has fallen out of the 'world'; destroys it
   */
  dataMiss(data) {
    if (!this.isPreGame) {
      var colour = data.texture.key.split('data-')[1]; // item 0 is "", 1 is the colour
      this.proportions[colour][1]++;
      this.registry.set('proportions', this.proportions);
    }
    data.destroy();
  }

  /**
   * The given data ball has hit the cup; deals with it appropriately
   */
  dataHit(data) {
    if (!this.isPreGame) {
      var colour = data.texture.key.split('data-')[1]; // item 0 is "", 1 is the colour
      this.shiftCover(colour);
      this.caught(colour);
    }
    data.destroy();
  }

  /**
   * Reveals a bit more of the image being covered
   */
  shiftCover(colour) {
    this.scenery[colour][1].setY(this.scenery[colour][1].y + SHIFT);
  }

  /**
   * 
   */
  caught(colour) {
    this.proportions[colour][0]++;
    this.proportions[colour][1]++;
    this.registry.set('proportions', this.proportions);
  }

  resetCovers() {
    this.scenery[COLOURS[0]][1].setY(YPOS.KIWI);
    this.scenery[COLOURS[1]][1].setY(YPOS.PINGU);
    this.scenery[COLOURS[2]][1].setY(YPOS.COOK);
    this.scenery[COLOURS[3]][1].setY(YPOS.DOLPHIN);
  }

  runEnterHandler() {
    if (!this.isPreGame) { // Should never be true but deal with just in case
      return;
    }
    this.enterKey.enabled = false;
    this.isPreGame = false;
    this.datas.clear(true, true); // Remove all existing balls
    this.nextLevel();
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

    this.title;
    this.description;
    this.levelText;

    this.handlers = {
      'level': this.setLevel,
      'proportions': this.setProportions,
    }

    this.registry.events.on('changedata', this.registryUpdate, this);
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
    this.title = this.add.text(400, 10, TITLE, { fontSize: '80px', fill: '#fff' }).setOrigin(0.5, 0);
    this.description = this.add.text(10, 100, DESCRIPTION);
    this.levelText = this.add.text(555, 200, '', { fontSize: '200px', fill: '#fff' }).setAlpha(0.2).setOrigin(0.5, 0);

    this.proportionsText = {};
    var pos = [10 + (IMAGE_SIZE[0] * SCALES.IMAGE) / 2, YPOS.KIWI + (IMAGE_SIZE[1] * SCALES.IMAGE) / 2];
    this.proportionsText[COLOURS[0]] = this.add.text(pos[0], pos[1], '', { fontSize: '40px', fill: '#fff' }).setAlpha(0.5).setOrigin(0.5, 0.5);
    pos[1] = YPOS.PINGU   + (IMAGE_SIZE[1] * SCALES.IMAGE) / 2;
    this.proportionsText[COLOURS[1]] = this.add.text(pos[0], pos[1], '', { fontSize: '40px', fill: '#fff' }).setAlpha(0.5).setOrigin(0.5, 0.5);
    pos[1] = YPOS.COOK    + (IMAGE_SIZE[1] * SCALES.IMAGE) / 2;
    this.proportionsText[COLOURS[2]] = this.add.text(pos[0], pos[1], '', { fontSize: '40px', fill: '#fff' }).setAlpha(0.5).setOrigin(0.5, 0.5);
    pos[1] = YPOS.DOLPHIN + (IMAGE_SIZE[1] * SCALES.IMAGE) / 2;
    this.proportionsText[COLOURS[3]] = this.add.text(pos[0], pos[1], '', { fontSize: '40px', fill: '#fff' }).setAlpha(0.5).setOrigin(0.5, 0.5);

    this.setLevel(this, 0);
  }

  setLevel(scene, levelNumber) {
    scene.emptyProportionsText();
    if (levelNumber == 0) {
      scene.title.setVisible(true);
      scene.description.setVisible(true);
      scene.levelText.setText('');
    } else {
      scene.title.setVisible(false);
      scene.description.setVisible(false);
      scene.levelText.setText(levelNumber);
    }
  }

  setProportions(scene, props) {
    if (props[COLOURS[0]][1] != null) {
      scene.proportionsText[COLOURS[0]].setText(props[COLOURS[0]][0] + ' / ' + props[COLOURS[0]][1]);
    }
    if (props[COLOURS[1]][1] != null) {
      scene.proportionsText[COLOURS[1]].setText(props[COLOURS[1]][0] + ' / ' + props[COLOURS[1]][1]);
    }
    if (props[COLOURS[2]][1] != null) {
      scene.proportionsText[COLOURS[2]].setText(props[COLOURS[2]][0] + ' / ' + props[COLOURS[2]][1]);
    }
    if (props[COLOURS[3]][1] != null) {
      scene.proportionsText[COLOURS[3]].setText(props[COLOURS[3]][0] + ' / ' + props[COLOURS[3]][1]);
    }
  }

  emptyProportionsText() {
    this.proportionsText[COLOURS[0]].setText('');
    this.proportionsText[COLOURS[1]].setText('');
    this.proportionsText[COLOURS[2]].setText('');
    this.proportionsText[COLOURS[3]].setText('');
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

/**
 * Returns a random integer between min and max inclusive.
 * From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Fisher-Yates shuffle function from http://bost.ocks.org/mike/shuffle/
 */
function shuffle(array) {
  var counter = array.length, temp, index;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

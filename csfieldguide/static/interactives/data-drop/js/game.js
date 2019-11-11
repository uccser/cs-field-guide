require('phaser');

const BOUNDARY_LEFT = 320;
const BOUNDARY_RIGHT = 790;
const SPACING = (BOUNDARY_RIGHT - BOUNDARY_LEFT) / 5; // For four equi-distant drop points
const MAX_OFFSET = SPACING * 0.8;                     // For variation in the drop points

const DROP = [
  BOUNDARY_LEFT + 1 * SPACING,
  BOUNDARY_LEFT + 2 * SPACING,
  BOUNDARY_LEFT + 3 * SPACING,
  BOUNDARY_LEFT + 4 * SPACING
];

const IMAGE_SIZE = [1000, 444];
const SCALES = {
  CUP: 0.1,
  BALL: 0.025,
  IMAGE: 0.3
};
const COVER_SIZE = [IMAGE_SIZE[0] * SCALES.IMAGE, Math.ceil(IMAGE_SIZE[1] * SCALES.IMAGE)];
const SHIFT = Math.ceil(COVER_SIZE[1] / 10);

const COLOURS = [
  'green',
  'red',
  'blue',
  'purple'
];

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
    var scene = this; // For inline functions only

    this.level = 0;


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
    var scene = this; // For inline functions only

    this.kiwi = [
      this.add.image(10, 10, 'kiwi').setOrigin(0, 0).setScale(SCALES.IMAGE),
      this.add.image(10, 10, 'pixel').setOrigin(0, 0).setScale(COVER_SIZE[0], COVER_SIZE[1])
    ]
    this.penguin = [
      this.add.image(10, 153, 'penguin').setOrigin(0, 0).setScale(SCALES.IMAGE),
      this.add.image(10, 153, 'pixel').setOrigin(0, 0).setScale(COVER_SIZE[0], COVER_SIZE[1])
    ]
    this.cook = [
      this.add.image(10, 296, 'cook').setOrigin(0, 0).setScale(SCALES.IMAGE),
      this.add.image(10, 296, 'pixel').setOrigin(0, 0).setScale(COVER_SIZE[0], COVER_SIZE[1])
    ]
    this.dolphin = [
      this.add.image(10, 439, 'dolphin').setOrigin(0, 0).setScale(SCALES.IMAGE),
      this.add.image(10, 439, 'pixel').setOrigin(0, 0).setScale(COVER_SIZE[0], COVER_SIZE[1])
    ]
    this.cup = this.physics.add.image(555, 550, 'cup').setScale(SCALES.CUP);

    //this.cover = this.add.image(10, 10, 'pixel').setOrigin(0, 0).setScale(300, 580);

    this.cupBoundary = this.physics.add.staticGroup();
    this.cupBoundary.create(BOUNDARY_LEFT, 550, 'pixel');
    this.cupBoundary.create(BOUNDARY_RIGHT, 550, 'pixel');
    this.cupBoundary.create(0, 610, 'pixel').setOrigin(0, 0).setScale(800, 1).refreshBody(); // Floor

    this.physics.add.collider(this.cup, this.cupBoundary);

    this.datas = this.physics.add.group();
    this.physics.add.collider(this.datas, this.cupBoundary, this.dataMiss);
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
      setTimeout(function() { scene.preGame() }, 1500);
      var offset = getRandomInteger(-1 * MAX_OFFSET, MAX_OFFSET);
      var positionX = offset + DROP[getRandomInteger(0, DROP.length - 1)];
      var colour = 'data-' + COLOURS[getRandomInteger(0, COLOURS.length - 1)];
      scene.dropBall(positionX, colour);
    }
  }

  /**
   * Drops a new coloured ball
   */
  dropBall(xPosition, name) {
    this.datas.create(xPosition, -100, name).setScale(SCALES.BALL).setVelocityY(100).setAngularVelocity(-100);
  }

  /**
   * The given data ball has fallen out of the 'world'; destroys it
   */
  dataMiss(data) {
    data.destroy();
  }

  /**
   * The given data ball has hit the cup; deals with it appropriately
   */
  dataHit(data) {
    if (this.isPreGame) {
      data.destroy();
    } else {
      var key = data.texture.key;
      this.shiftCover(key);
    }
  }

  /**
   * Reveals a bit more of the image being covered
   */
  shiftCover(key) {
    if (key == 'data-green') {
      this.kiwi[1].setY(this.kiwi[1].y + SHIFT);
    } else if (key == 'data-purple') {
      this.penguin[1].setY(this.penguin[1].y + SHIFT);
    } else if (key == 'data-red') {
      this.cook[1].setY(this.cook[1].y + SHIFT);
    } else if (key == 'data-blue') {
      this.dolphin[1].setY(this.dolphin[1].y + SHIFT);
    }
  }

  runEnterHandler() {
    if (!this.isPreGame) { // Should never be true but deal with just in case
      return;
    }
    this.enterKey.enabled = false;
    this.isPreGame = false;
    this.datas.clear(true, true); // Remove all existing balls
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
    this.title = this.add.text(400, 10, TITLE, { fontSize: '32pt', fill: '#fff' }).setOrigin(0.5, 0);
    this.description = this.add.text(10, 100, DESCRIPTION);
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

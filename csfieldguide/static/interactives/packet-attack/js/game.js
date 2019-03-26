require('phaser');

var CONFIG = require('./config.js');

/**
 * Gameplay
 */
class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'GameScene'});
    }

    preload() {
        console.log('Loading base images...');
        this.load.image('bg', base + 'interactives/packet-attack/assets/background.png');
        this.load.image('stun', base + 'interactives/packet-attack/assets/leftButton.png');
        this.load.image('zap', base + 'interactives/packet-attack/assets/middleButton.png');
        this.load.image('confuse', base + 'interactives/packet-attack/assets/rightButton.png');

        this.load.spritesheet('packet', base + 'interactives/packet-attack/assets/bluePacketSprites.png', { frameWidth: 100, frameHeight: 100, endFrame: 8 });
        this.load.spritesheet('ack', base + 'interactives/packet-attack/assets/greenPacketSprites.png', { frameWidth: 100, frameHeight: 100, endFrame: 8 });
        this.load.spritesheet('nack', base + 'interactives/packet-attack/assets/redPacketSprites.png', { frameWidth: 100, frameHeight: 100, endFrame: 8 });
        this.load.spritesheet('shield', base + 'interactives/packet-attack/assets/shieldedBluePacketSprites.png', { frameWidth: 100, frameHeight: 100, endFrame: 8 });

        this.load.image('pipes', base + 'interactives/packet-attack/assets/pipes.png');
        this.load.image('pause', base + 'interactives/packet-attack/assets/leftGreenButton.png');
        this.load.image('play', base + 'interactives/packet-attack/assets/rightGreenButton.png');
        console.log('Done');
    }

    create() {
        console.log('Adding base images...');
        this.add.image(400, 300, 'bg');

		var stun = this.add.image(215, 520, 'stun').setInteractive();
		var zap = this.add.image(400, 520, 'zap').setInteractive();
		var confuse = this.add.image(590, 520, 'confuse').setInteractive();
        var pause = this.add.image(600, 450, 'pause').setInteractive();

        this.add.image(400, 300, 'pipes');
        console.log('Done');
    }

    /**
     * Resets the game with the given level
     */
    setLevel(levelNumber) {
        this.clear();
        this.levelNum = levelNumber;
        this.level = CONFIG.LEVELS[this.levelNum];
        this.create();
    }

    /**
     * Brings this and the UI to the front so, that it and not the info panel is rendered
     */
    bringForward() {
        this.scene.bringToTop();
        this.scene.bringToTop('UIScene');
    }

    /**
     * TODO
     * Safely ends the Scene
     */
    shutdown()
    {
        this.clear();
    }

    /**
     * TODO
     * Removes all elements from the Scene
     */
    clear() {
        
    }
}

/**
 * Game UI
 */
class UIScene extends Phaser.Scene {

    constructor() {
        super({ key: 'UIScene' });
    }

    init() {
        console.log('init');
        this.handlers = {
            'level': this.setLevel
        }

        this.score = 0;
        this.levelNum;
        this.levelText;

        this.registry.events.on('changedata', this.registryUpdate, this);
    }

    create() {
        console.log('creating UI');
        this.levelText = this.add.text(10, 10, 'Level: ', { font: '48px Arial', fill: '#000000' })
        //this.gameScene = this.scene.get('GameScene');

        this.registry.set('score', this.score);
    }

    registryUpdate(parent, key, data) {
        console.log('registry changed');
        if (this.handlers[key]) {
            this.handlers[key](this, data);
        }
    }

    setLevel(scene, level) {
        scene.levelNum = level;
        scene.levelText.setText('Level: ' + scene.levelNum);
        console.log('UI: set level to ' + level);
    }
}

module.exports = {
    GameScene,
    UIScene
};

require('phaser');

var CONFIG = require('./config.js');

/**
 * Gameplay
 */
class GameScene extends Phaser.Scene {

    constructor(config) {
        super({ key: 'GameScene'});
        
        this.levelNum = config.level;
        this.level = CONFIG.LEVELS[this.levelNum];
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
        let ui = this.scene.get('UIScene');
        ui.bringForward();
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

    constructor(config) {
        super({ key: 'UIScene' });

        this.levelNum = config.level;
        this.level = CONFIG.LEVELS[this.levelNum];

        this.score = 0;
    }

    create() {
        this.add.text(10, 10, 'Score: 0', { font: '48px Arial', fill: '#000000' })
        this.gameScene = this.scene.get('GameScene');

        this.registry.set('score', this.score);
    }

    bringForward() {
        this.scene.bringToTop();
    }
}

module.exports = {
    GameScene,
    UIScene
};

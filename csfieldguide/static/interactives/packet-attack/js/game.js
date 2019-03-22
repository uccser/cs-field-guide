require('phaser');

var GameScene = new Phaser.Class({
    
    Extends: Phaser.Scene,

    initialize:
    
    function GameScene() {
        Phaser.Scene.call(this, { key: 'GameScene' });
    },

    preload: function() {
        this.load.image('bg', '../assets/background.png');
        this.load.image('stun', 'assets/leftButton.png');
        this.load.image('zap', 'assets/middleButton.png');
        this.load.image('confuse', 'assets/rightButton.png');
            this.load.spritesheet('packet', 'assets/bluePacketSprites.png', 100, 100, 8);
            this.load.spritesheet('ack', 'assets/greenPacketSprites.png', 100, 100, 8);
            this.load.spritesheet('nack', 'assets/redPacketSprites.png', 100, 100, 8);
            this.load.spritesheet('shield', 'assets/shieldedBluePacketSprites.png', 100, 100, 8);
        this.load.image('pipes', 'assets/pipes.png');
        this.load.image('pause', 'assets/leftGreenButton.png');
        this.load.image('play', 'assets/rightGreenButton.png');
    },

    create: function() {
        this.add.image(400, 300, 'bg');

		this.add.button(125, 490, 'stun');

		this.add.button(320, 490, 'zap');

		this.add.button(500, 490, 'confuse');

		this.add.button(570, 430, 'pause');
    },

    shutdown: function ()
    {
        this.input.mouse.shutdown();
    }
});

var UIScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialise:

    function UIScene() {
        Phaser.Scene.call(this, { key: 'UIScene', active: true });

        this.score = 0;
    },

    create: function() {
        this.add.text(10, 10, 'Score: 0', { font: '48px Arial', fill: '#000000' })
    }
});

module.exports = {
    GameScene,
    UIScene
};

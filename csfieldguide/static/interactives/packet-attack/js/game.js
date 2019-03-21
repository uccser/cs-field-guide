require('phaser');

var GameScene = new Phaser.Class({
    
    Extends: Phaser.Scene,

    initialize:
    
    function GameScene() {
        Phaser.Scene.call(this, { key: 'GameScene' });
    },

    preload: function() {
        this.load.image('background', 'assets/background.png');
        // this.load.image('stun', 'assets/leftButton.png');
        // this.load.image('zap', 'assets/middleButton.png');
        // this.load.image('confuse', 'assets/rightButton.png');
        //     this.load.spritesheet('packet', 'assets/bluePacketSprites.png', 100, 100, 8);
        //     this.load.spritesheet('ack', 'assets/greenPacketSprites.png', 100, 100, 8);
        //     this.load.spritesheet('nack', 'assets/redPacketSprites.png', 100, 100, 8);
        //     this.load.spritesheet('shield', 'assets/shieldedBluePacketSprites.png', 100, 100, 8);
        // this.load.image('pipes', 'assets/pipes.png');
        // this.load.image('pause', 'assets/leftGreenButton.png');
        // this.load.image('play', 'assets/rightGreenButton.png');
    },

    create: function() {
        this.add.image(400, 300, 'background');
    }
});

module.exports = {
    GameScene
};

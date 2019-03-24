require('phaser');

/**
 * Game Information
 */
class Information extends Phaser.Scene {

    constructor(config) {
        super(config);
    }

    preload() {
        this.load.image('blurred-bg', base + 'interactives/packet-attack/assets/blurredBackground.png');
    }

    create() {
        this.add.image(400, 300, 'blurred-bg');
    }
}

module.exports = {
    Information
};

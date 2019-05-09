/**
 * Packet Attack
 * 
 * PhaserButton Class for an implementation of Buttons in Phaser 3
 */

require('phaser');

/**
 * The main Buttons of Packet Attack - ones that require text
 */
class PhaserButton extends Phaser.GameObjects.Container {
    
    constructor(config) {

        super(config.scene, config.x, config.y);

        this.scene = config.scene;
        this.imageKey = config.imageKey;
        this.text = config.text;
        this.textConfig = config.textConfig;
        this.size = config.buttonSize;

        this.image = this.scene.add.image(0, 0, this.imageKey);
        
        this.text = this.scene.add.text(0, 0, this.text, this.textConfig);
        this.text.setOrigin(0.5, 0.5);
        
        this.setSize(this.size[0], this.size[1]);

        this.add([this.image, this.text]);

        this.scene.add.existing(this);
    }
}

module.exports = {
    PhaserButton
}

/**
 * trAIning ground
 * 
 * PhaserTextButton class for an implementation of spritesheet Buttons with text in Phaser 3
 * 
 * PhaserButton class for an implementation of spritesheet Buttons in Phaser 3
 */

require('phaser');

/**
 * trAIning ground button with a spritesheet and text
 */
class PhaserTextButton extends Phaser.GameObjects.Container {
    
  constructor(config) {

    super(config.scene, config.x, config.y);

    this.config = config;
    this.scene = config.scene;
    this.sprite = new Phaser.GameObjects.Sprite(config.scene, 0, 0, config.key, config.up);
    this.text = this.scene.add.text(0, 0, config.text, config.textConfig);
    this.text.setOrigin(0.5, 0.5);

    this.add([this.sprite, this.text]);

    config.scene.add.existing(this);

    this.setSize(this.sprite.width, this.sprite.height);

    this.setInteractive({ useHandCursor: true });
    this.on('pointerdown', this.onDown, this);
    this.on('pointerup', this.onOver, this);
    this.on('pointerover', this.onOver, this);
    this.on('pointerout', this.onUp, this);
  }
	
  onDown() {
    this.sprite.setFrame(this.config.down);
  }

  onOver() {
    this.sprite.setFrame(this.config.over);
  }

  onUp() {
    this.sprite.setFrame(this.config.up);
  }
}

module.exports = {
  PhaserTextButton
}

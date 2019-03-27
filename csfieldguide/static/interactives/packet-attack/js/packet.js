require('phaser');

const minDanger = 350;
const maxDanger = 450;

var PacketStatuses = {
    // keep to one digit or things will break as they're interpreted as strings with length 1
    started: 1,
    finished: 2,
    destroyed: 3
}

var PacketTypes = {
    packet: 1,
    ack: 2,
    nack: 3
}

class Packet extends Phaser.GameObjects.Container {
    constructor(config) {

        super(config.scene, config.x, config.y);

        this.key = config.key;
        this.scene = config.scene;
        this.number = config.number;
        this.type = config.packetType;
        this.char = config.char;
        this.hasShield = config.hasShield;
        this.isAlive = true;
        this.isZapped = false;
        this.wasStunned = false;
        this.animation = config.animation;


        var textConfig = {
            font: '30px Open Sans',
            fill: '#FFFFFF',
            align: 'center',
        }

        this.sprite = this.scene.add.sprite(0, 0, this.key).play(this.animation);
        this.text = this.scene.add.text(5, -5, this.char, textConfig);
        this.text.setOrigin(0.5, 0.5);

        this.add([this.sprite, this.text]);

        this.scene.add.existing(this);
    }

    checkInDanger() {
        return (this.x > minDanger && this.y < maxDanger);
    }

    runTween() {
        var tweenConfig = {
            targets: this,
            x: 800,
            ease: 'linear',
            duration: 8000,
            delay: this.number * 1500,
            repeat: 0,
            onComplete: this.onCompleteHandler
        }

        this.tween = this.scene.tweens.add(tweenConfig);
        this.scene.registry.set('newActivePacket', this);
    }

    onCompleteHandler(tween, targets) {
        console.log('handling');
        targets[0].scene.registry.set('newInactivePacket', targets[0]);
    }

    corrupt() {
        this.char = null;
        this.text.setText('?');
    }

    delay() {
        this.tween.stop();

        var xDiff = -1 * this.x;

        var newTweenConfig = {
            target: this,
            x: xDiff,
            ease: 'linear',
            duration: 500,
        }

        this.scene.tweens.add(newTweenConfig);
        setTimeout(this.runTween, 750);
    }

    kill() {

    }
}

module.exports = {
    Packet,
    PacketTypes,
    PacketStatuses
};

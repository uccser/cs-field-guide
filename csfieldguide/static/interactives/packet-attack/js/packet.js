require('phaser');

const minDanger = 350;
const maxDanger = 450;

// keep to one digit or things will break as they're interpreted as strings with length 1
var PacketStatuses = {
    STARTED: 1,
    FINISHED: 2,
    DESTROYED: 3
}

var PacketTypes = {
    SENT: 1,
    ACK: 2,
    NACK: 3
}

class Packet extends Phaser.GameObjects.Container {
    constructor(config) {

        super(config.scene, config.x, config.y);

        this.key = config.key;
        this.scene = config.scene;
        this.number = config.number;
        this.type = config.packetType;
        this.char = config.char;
        this.isOrdered = config.isOrdered;
        this.hasShield = config.hasShield;
        this.animation = config.animation;
        this.backupAnimation = config.backupAnimation;
        this.delayed = false;


        var textConfig = {
            font: '30px Open Sans',
            fill: '#FFFFFF',
            align: 'center',
        }

        this.sprite = this.scene.add.sprite(0, 0, this.key).play(this.animation);
        var dispText;
        if (this.isOrdered) {
            dispText = this.number.toString() + ":" + this.char;
        } else {
            dispText = this.char;
        }
        this.text = this.scene.add.text(5, -5, dispText, textConfig);
        this.text.setOrigin(0.5, 0.5);

        this.add([this.sprite, this.text]);

        this.scene.add.existing(this);
    }

    checkInDanger() {
        return (this.x > minDanger && this.x < maxDanger);
    }

    /**
     * The delay is set this way because we want one on each packet so they set off in sequence,
     * but a different one on packets that are delayed
     */
    runTween(givenDelay) {
        var tweenConfig = {
            targets: this,
            x: 800,
            ease: 'linear',
            duration: 8000,
            delay: givenDelay,
            repeat: 0,
            onComplete: this.onCompleteHandler
        }

        this.tween = this.scene.tweens.add(tweenConfig);
    }

    onCompleteHandler(tween, targets) {
        console.log('handling');
        targets[0].scene.registry.set('newInactivePacket', targets[0]);
    }

    corrupt() {
        if (this.hasShield) {
            this.hasShield = false;
            this.sprite.anims.stop();
            this.sprite.anims.remove(this.animation);
            this.sprite.play(this.backupAnimation);
        } else {
            this.char = '?';
            var dispText;
            if (this.isOrdered) {
                dispText = this.number.toString() + ":" + this.char;
            } else {
                dispText = this.char;
            }
            this.text.setText(dispText);
        }
    }

    delay() {
        this.tween.stop();

        var newTweenConfig = {
            targets: this,
            x: 0,
            ease: 'linear',
            duration: 500,
            onComplete: this.delayCompleteHandler
        }

        this.tween = this.scene.tweens.add(newTweenConfig);
    }

    delayCompleteHandler(tween, targets) {
        // Also sets a delay so that it sets off between packets
        // Here 'packet.scene' refers to the GameScene the packet belongs to
        var packet = targets[0];
        var delay = 2500;
        if (packet.delayed) {
            delay -= 500;
        }
        packet.runTween(delay);
        packet.delayed = true;
    }

    kill() {
        this.tween.stop();
        this.scene.registry.set('newDestroyedPacket', this);
        this.destroy();
    }
}

module.exports = {
    Packet,
    PacketTypes,
    PacketStatuses
};

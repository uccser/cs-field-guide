/**
 * Packet Attack
 * 
 * Packet Class and relevant variables
 */

require('phaser');

const minDanger = 350;
const maxDanger = 450;

// Keep to one digit or things will break
// Statuses are interpreted as strings with length 1 for simplicity
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

/**
 * The main GameObject of Packet Attack
 */
class Packet extends Phaser.GameObjects.Container {
    
    constructor(config) {
        // Here 'this.scene' refers to the GameScene the Packet belongs to

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
        this.delayed = 0;
        this.isCorrupt = false;

        var textConfig = {
            font: '30px Open Sans',
            fill: '#FFFFFF',
            align: 'center',
        }

        this.sprite = this.scene.add.sprite(0, 0, this.key).play(this.animation);
        var dispText;
        if (this.isOrdered) {
            dispText = this.number.toString() + ':' + this.char;
        } else {
            dispText = this.char;
        }
        this.text = this.scene.add.text(2, -5, dispText, textConfig);
        this.text.setOrigin(0.5, 0.5);

        this.add([this.sprite, this.text]);

        this.scene.add.existing(this);
    }

    /**
     * Returns true if the Packet is within the 'danger zone', false otherwise
     */
    checkInDanger() {
        return (this.x > minDanger && this.x < maxDanger);
    }

    /**
     * Sets off the Packet after the given delay.
     * If reverse is false, the packet will 'exit' the left pipe and 'enter' the right.
     * If reverse is true, the reverse will happen.
     * 
     * The delay is set this way because we want one on each packet so they set off in sequence,
     * but a different one on packets that are delayed
     */
    runTween(givenDelay, reverse) {
        var tweenConfig = {
            targets: this,
            x: reverse ? 0 : 800,
            ease: 'linear',
            duration: 8000,
            delay: givenDelay,
            repeat: 0,
            onComplete: this.onCompleteHandler
        }

        this.tween = this.scene.tweens.add(tweenConfig);
    }

    /**
     * Handler function for when a Packet successfully completes its tween
     * Sets the registry to say a Packet has arrived
     */
    onCompleteHandler(tween, targets) {
        console.log('handling');
        targets[0].scene.registry.set('newInactivePacket', targets[0]);
    }

    /**
     * Sets the Packet as corrupted - the receiver won't understand what it is sending
     */
    corrupt() {
        if (this.hasShield) {
            this.hasShield = false;
            this.sprite.anims.stop();
            this.sprite.anims.remove(this.animation);
            this.sprite.play(this.backupAnimation);
        } else {
            this.isCorrupt = true;
            var dispText;
            if (this.isOrdered) {
                dispText = this.number.toString() + ':?';
            } else {
                dispText = '?';
            }
            this.text.setText(dispText);
        }
    }

    /**
     * Sends the packet back to the start
     */
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

    /**
     * Handler for when the Packet finishes its tween back to the start.
     * Sets it off again from the beginning, with a delay that prevents it overlapping other packets
     * 
     * KNOWN ISSUE:
     * Packets X and X+3(n-1) will overlap if X is delayed n times and X+3(n-1) once
     */
    /*
     * REASONING:
     * Packets are released every two seconds, and reach the center of the danger
     * zone after four seconds.
     * If Packet X is delayed, it will resume its animation from the start
     * after one second.
     * This will put it one second ahead of packet X+3.
     * If packet X is delayed a second time, it will resume its animation
     * from the start after two seconds.
     * The extra second is to prevent it overlapping packet X+5.
     * This results in packet X taking the same space as packet X+3 would if it
     * were also delayed.
     * 
     * The overlap will only occur after (a minimum of) three specific delays
     * (packet X twice, then packet X+3) so for now it is safe not to worry about.
     */
    delayCompleteHandler(tween, targets) {
        // Also sets a delay so that it sets off between packets
        var packet = targets[0];
        packet.delayed++;
        var delay = 500;
        if (packet.delayed > 1) {
            // Prevent overlap with other non-delayed packets
            delay += 1000;
        }
        packet.runTween(delay);
    }

    /**
     * Destroys the packet
     * TODO: Add an animation for this
     */
    kill() {
        this.tween.stop();
        this.scene.registry.set('newDestroyedPacket', this);
        this.destroy(); // Destroys the container, not the variables assigned to the class
    }
}

module.exports = {
    Packet,
    PacketTypes,
    PacketStatuses
};

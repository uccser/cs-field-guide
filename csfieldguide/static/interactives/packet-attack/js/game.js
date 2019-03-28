require('phaser');

var CONFIG = require('./config.js');
var PACKET = require('./packet.js');
var INFO = require('./info.js');

/**
 * Gameplay
 */
class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'GameScene'});
    }

    init() {
        this.receivedMessage;
        this.sendChars;
        this.receivedPackets;
        this.level;
        this.activePackets = [];
        this.unansweredPacketNumbers = [];
        this.activeAcks = [];
        this.activeNacks = [];
        this.receivedAcks = [];

        this.timers = [];
        this.allPackets = [];

        this.handlers = {
            'level': this.setLevel,
            'newActivePacket': this.packetSent,
            'newInactivePacket': this.packetReceived,
            'newDestroyedPacket': this.packetDestroyed,
            'delay': this.delay,
            'kill': this.kill,
            'corrupt': this.corrupt
        }

        this.registry.events.on('changedata', this.registryUpdate, this);

        this.registry.set('newInactivePacket', null);
        this.registry.set('newActivePacket', null);
        this.registry.set('newDestroyedPacket', null);
        this.registry.set('receivedMessage', '');
        this.registry.set('score', 0);
        this.registry.set('delay', false);
        this.registry.set('kill', false);
        this.registry.set('corrupt', false);
    }

    preload() {
        console.log('Loading base images...');
        this.load.image('bg', base + 'interactives/packet-attack/assets/background.png');

        this.load.spritesheet('packet', base + 'interactives/packet-attack/assets/bluePacketSprites.png', { frameWidth: 100, frameHeight: 100, endFrame: 8 });
        this.load.spritesheet('ack', base + 'interactives/packet-attack/assets/greenPacketSprites.png', { frameWidth: 100, frameHeight: 100, endFrame: 8 });
        this.load.spritesheet('nack', base + 'interactives/packet-attack/assets/redPacketSprites.png', { frameWidth: 100, frameHeight: 100, endFrame: 8 });
        this.load.spritesheet('shield', base + 'interactives/packet-attack/assets/shieldedBluePacketSprites.png', { frameWidth: 100, frameHeight: 100, endFrame: 8 });
        console.log('Done');
    }

    create() {
        console.log('Adding base images...');
        this.add.image(400, 300, 'bg');

        var animationConfig = {
            key: 'packetBaseAnim',
            frames: this.anims.generateFrameNumbers('packet', { start: 0, end: 7 }),
            frameRate: 20,
            repeat: -1
        }
        this.anims.create(animationConfig);

        animationConfig.key = 'packetShieldAnim';
        animationConfig.frames = this.anims.generateFrameNumbers('shield', { start: 0, end: 7 });
        this.anims.create(animationConfig);

        animationConfig.key = 'packetAckAnim';
        animationConfig.frames = this.anims.generateFrameNumbers('ack', { start: 0, end: 7 });
        this.anims.create(animationConfig);

        animationConfig.key = 'packetNackAnim';
        animationConfig.frames = this.anims.generateFrameNumbers('nack', { start: 0, end: 7 });
        this.anims.create(animationConfig);

        
        console.log('Done');
    }

    recreate() {
        this.receivedMessage = '';
        this.sendChars = this.level.message.split('');
        this.receivedPackets = [];

        for (var i=0; i < this.sendChars.length; i++) {
            var key = 'packet: ' + i;
            console.log('adding packet ' + key);
            var delay = 2000 * i;

            var packetConfig = {
                key: key,
                packetType: PACKET.PacketTypes.SENT,
                number: i,
                scene: this,
                x: 0,
                y: 220,
                char: this.sendChars[i],
                isOrdered: this.level.packetsHaveNumbers,
                hasShield: this.level.packetsHaveShields,
                animation: this.level.packetsHaveShields ? 'packetShieldAnim' : 'packetBaseAnim',
                backupAnimation: 'packetBaseAnim'
            }

            var packet = new PACKET.Packet(packetConfig);
            packet.runTween(delay);
            this.registry.set('newActivePacket', packet);
            var timer = this.time.delayedCall(delay + CONFIG.TIMEOUT, this.timerEnd, [packet], this);
            this.unansweredPacketNumbers.push(packet.number);
            this.allPackets.push(packet);
            this.timers.push(timer);
        }
    }

    registryUpdate(parent, key, data) {
        console.log('registry changed');
        if (this.handlers[key]) {
            this.handlers[key](this, data);
        }
    }

    /**
     * Sets the scene with the given level
     */
    setLevel(scene, levelNumber) {
        scene.level = CONFIG.LEVELS[levelNumber];
    }

    timerEnd(packet) {

        if (this.level.timeoutsEnabled && this.unansweredPacketNumbers.indexOf(packet.number) >= 0) {
            console.log(packet.key + " missing!");
            this.resendPacket(packet);
        }

        this.runEndCheck();
    }

    packetSent(scene, packet) {
        if (packet.type == PACKET.PacketTypes.SENT) {
            scene.activePackets.push(packet);
        } else if (packet.type == PACKET.PacketTypes.ACK) {
            scene.activeAcks.push(packet);
        } else if (packet.type == PACKET.PacketTypes.NACK) {
            scene.activeNacks.push(packet);
        } else {
            console.log('unrecognised packet sent');
            return;
        }
        console.log(packet.key + " sent");
    }

    /**
     * 
     */
    /*
     * Packets are added and removed almost always in a FIFO queue
     * so perhaps this could be better optimised
     */
    packetReceived(scene, packet) {
        var index;
        if (packet.type == PACKET.PacketTypes.SENT) {
            index = scene.activePackets.indexOf(packet);
            scene.activePackets.splice(index, 1);
            scene.interpretNewPacket(packet);

        } else if (packet.type == PACKET.PacketTypes.ACK) {
            index = scene.activeAcks.indexOf(packet);
            scene.activeAcks.splice(index, 1);
            index = scene.unansweredPacketNumbers.indexOf(packet.number);
            scene.unansweredPacketNumbers.splice(index, 1);
            scene.receivedAcks.push(packet.number);

        } else if (packet.type == PACKET.PacketTypes.NACK) {
            index = scene.activeNacks.indexOf(packet);
            scene.activeNacks.splice(index, 1);
            scene.resendPacket(packet);
            console.log('resending packet');

        } else {
            console.log('received packet of strange type');
        }
        scene.updateReceivedMessage();
        scene.runEndCheck();
    }

    packetDestroyed(scene, packet) {
        var index = scene.activePackets.indexOf(packet)
        if (index < 0 ) {
            console.log(packet.key + " failed removal");
        } else {
            scene.activePackets.splice(index, 1);
            console.log(packet.key + " destroyed successfully");
        }
        scene.runEndCheck();
    }

    updateReceivedMessage() {
        var message = [];
        if (this.level.packetsHaveNumbers) {
            for (var j=0; j < this.level.message.length; j++) {
                message.push('');
            }
        }
        var packet;
        for (var i=0; i < this.receivedPackets.length; i++) {
            packet = this.receivedPackets[i];
            if (this.level.packetsHaveNumbers) {
                if (packet.isCorrupt) {
                    message[packet.number] = '?';
                } else {
                    message[packet.number] = packet.char;
                }
            } else {
                if (packet.isCorrupt) {
                    message.push('?');
                } else {
                    message.push(packet.char);
                }
            }
        }
        message = message.join('');
        this.receivedMessage = message;
        this.registry.set('receivedMessage', message);
    }

    interpretNewPacket(packet) {
        if (this.level.acksNacksEnabled) {
            if (packet.isCorrupt) {
                this.sendNack(packet);
                return;
            } else {
                this.sendAck(packet);
            }
        }
        this.receivedPackets.push(packet);
    }

    sendNack(packet) {
        var packetConfig = {
            key: packet.key + "NACK",
            packetType: PACKET.PacketTypes.NACK,
            number: packet.number,
            scene: this,
            x: 800,
            y: 310,
            char: '?',
            isOrdered: this.level.packetsHaveNumbers,
            animation: 'packetNackAnim'
        }

        var newPacket = new PACKET.Packet(packetConfig);
        newPacket.runTween(500, true);
        this.registry.set('newActivePacket', newPacket);
        this.allPackets.push(newPacket);
    }

    sendAck(packet) {
        var packetConfig = {
            key: packet.key + "ACK",
            packetType: PACKET.PacketTypes.ACK,
            number: packet.number,
            scene: this,
            x: 800,
            y: 310,
            char: packet.char,
            isOrdered: this.level.packetsHaveNumbers,
            animation: 'packetAckAnim'
        }

        var newPacket = new PACKET.Packet(packetConfig);
        newPacket.runTween(500, true);
        this.registry.set('newActivePacket', newPacket);
        this.allPackets.push(newPacket);
    }

    resendPacket(packet) {
        var char = this.level.message.split('')[packet.number];
        var packetConfig = {
            key: packet.key + "RESEND",
            packetType: PACKET.PacketTypes.SENT,
            number: packet.number,
            scene: this,
            x: 0,
            y: 220,
            char: char,
            isOrdered: this.level.packetsHaveNumbers,
            hasShield: this.level.packetsHaveShields,
            animation: this.level.packetsHaveShields ? 'packetShieldAnim' : 'packetBaseAnim',
            backupAnimation: 'packetBaseAnim'
        }

        var newPacket = new PACKET.Packet(packetConfig);
        newPacket.runTween(0);
        var timer = this.time.delayedCall(CONFIG.TIMEOUT, this.timerEnd, [newPacket], this);
        this.registry.set('newActivePacket', newPacket);
        this.allPackets.push(newPacket);
        this.timers.push(timer);
    }

    delay(scene, doDelay) {
        var packet;
        if (doDelay) {
            for (var i=0; i < scene.activePackets.length; i++) {
                packet = scene.activePackets[i];
                if (packet.checkInDanger()) {
                    if (packet.type == PACKET.PacketTypes.SENT || scene.level.canAttackAcksNacks) {
                        packet.delay();
                        break;
                    }
                }
            }
        }
    }

    kill(scene, doKill) {
        var packet;
        if (doKill) {
            for (var i=0; i < scene.activePackets.length; i++) {
                packet = scene.activePackets[i];
                if (packet.checkInDanger()) {
                    if (packet.type == PACKET.PacketTypes.SENT || scene.level.canAttackAcksNacks) {
                        packet.kill();
                        break;
                    }
                }
            }
        }
    }

    corrupt(scene, doCorrupt) {
        var packet;
        if (doCorrupt) {
            for (var i=0; i < scene.activePackets.length; i++) {
                packet = scene.activePackets[i];
                if (packet.checkInDanger()) {
                    if (packet.type == PACKET.PacketTypes.SENT || scene.level.canAttackAcksNacks) {
                        packet.corrupt();
                        break;
                    }
                }
            }
        }
    }

    /**
     * Checks for further active packets and inprogress timers
     * Ends the level if there is none
     */
    runEndCheck() {
        if (this.activePackets.length <= 0
            && this.activeAcks.length <= 0
            && this.activeNacks.length <= 0
            && this.noActiveTimersCheck()) {
            this.endLevel();
        }
    }

    noActiveTimersCheck() {
        if (!this.level.timeoutsEnabled) {
            return true;
        }
        for (var i=0; i < this.timers.length; i++) {
            if (this.timers[i].getElapsed() < CONFIG.TIMEOUT) {
                return false;
            }
        }
        return true;
    }

    endLevel() {
        var info = this.scene.get('Information');
        if (this.receivedMessage != this.level.message) {
            info.setPaneType(INFO.InfoPaneType.PROCEED);
        } else {
            info.setPaneType(INFO.InfoPaneType.FAIL);
        }
        this.scene.get('UIScene').stopButtons();
        this.clear();
        info.resumeInfo();
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
     * Empties all elements from the Scene
     */
    clear() {
        this.clearPacketArray(this.allPackets);
        this.allPackets = [];
        this.activePackets = [];
        this.unansweredPacketNumbers = [];
        this.activeAcks = [];
        this.activeNacks = [];
        this.receivedAcks = [];

        for (var i=0; i < this.timers.length; i++) {
            this.timers[i].remove();
        }
        this.timers = [];

        this.sendChars = [];
        this.receivedMessage = '';
        this.registry.set('receivedMessage', '');
    }

    /**
     * Destroys any remaining packets to prevent memory leaks
     */
    clearPacketArray(array) {
        for (var i=0; i < array.length; i++) {
            array[i].destroy();
        }
    }

    /**
     * Play the game
     */
    play() {
        this.scene.get('UIScene').startButtons();
        this.recreate();
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
            'level': this.setLevel,
            'receivedMessage': this.updateReceivedMessage
        }

        this.registry.events.on('changedata', this.registryUpdate, this);

        this.paused = false;
    }

    preload() {
        this.load.image('pause', base + 'interactives/packet-attack/assets/leftGreenButton.png');
        this.load.image('play', base + 'interactives/packet-attack/assets/rightGreenButton.png');
        this.load.image('delay', base + 'interactives/packet-attack/assets/leftButton.png');
        this.load.image('corrupt', base + 'interactives/packet-attack/assets/middleButton.png');
        this.load.image('kill', base + 'interactives/packet-attack/assets/rightButton.png');
        this.load.image('pipes', base + 'interactives/packet-attack/assets/pipes.png');
    }

    create() {
        console.log('creating UI');

        this.playpause = this.add.sprite(600, 450, 'pause');
        this.playpause.on('pointerdown', this.togglePause);

        this.delay = this.add.image(215, 520, 'delay');
        this.delay.on('pointerdown', this.alertDelay);
        this.delay.on('pointerout', this.unAlertDelay);
        this.delay.on('pointerup', this.unAlertDelay);

		this.corrupt = this.add.image(400, 520, 'corrupt');
        this.corrupt.on('pointerdown', this.alertCorrupt);
        this.corrupt.on('pointerout', this.unAlertCorrupt);
        this.corrupt.on('pointerup', this.unAlertCorrupt);

        this.kill = this.add.image(590, 520, 'kill');
        this.kill.on('pointerdown', this.alertKill);
        this.kill.on('pointerout', this.unAlertKill);
        this.kill.on('pointerup', this.unAlertKill);

        this.pipes = this.add.image(400, 300, 'pipes'); // Image needed above the packets

        var config = {
            font: '40px Open Sans',
            fill: '#000000',
            align: 'center',
        }
        this.titleText = this.add.text(400, 0, "Packet Attack", config);
        this.titleText.setOrigin(0.5, 0);

        config.font = '25px';
        this.levelText = this.add.text(400, 50, '', config);
        this.levelText.setOrigin(0.5, 0);
        this.sendText = this.add.text(20, 10, '', config);
        this.receivedText = this.add.text(780, 10, 'Received:', config);
        this.receivedText.setOrigin(1, 0); // Position the text by its top right corner
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
        scene.levelMessage = CONFIG.LEVELS[level].message;
        scene.sendText.setText('Sending:\n' + scene.levelMessage);
        console.log('UI: set level to ' + level);
    }

    updateReceivedMessage(scene, message) {
        scene.receivedText.setText('Received:\n' + message);
    }

    alertDelay() {
        this.scene.registry.set('delay', true);
    }

    unAlertDelay() {
        this.scene.registry.set('delay', false);
    }

    alertKill() {
        this.scene.registry.set('kill', true);
    }

    unAlertKill() {
        this.scene.registry.set('kill', false);
    }

    alertCorrupt() {
        this.scene.registry.set('corrupt', true);
    }

    unAlertCorrupt() {
        this.scene.registry.set('corrupt', false);
    }

    togglePause() {
        if (this.scene.paused) {
            this.scene.scene.resume('GameScene');
            this.scene.playpause.setTexture('pause');
            this.scene.paused = false;
            console.log('resumed');
        } else {
            this.scene.scene.pause('GameScene');
            this.scene.playpause.setTexture('play');
            this.scene.paused = true;
            console.log('paused');
        }
    }

    stopButtons() {
        this.playpause.disableInteractive();
        this.delay.disableInteractive();
        this.corrupt.disableInteractive();
        this.kill.disableInteractive();
    }

    startButtons() {
        this.playpause.setInteractive({ useHandCursor: true });
        this.delay.setInteractive({ useHandCursor: true });
        this.corrupt.setInteractive({ useHandCursor: true });
        this.kill.setInteractive({ useHandCursor: true });
    }
}

module.exports = {
    GameScene,
    UIScene
};

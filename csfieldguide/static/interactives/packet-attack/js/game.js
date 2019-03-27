require('phaser');

var CONFIG = require('./config.js');
var PACKET = require('./packet.js');

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

        this.handlers = {
            'level': this.setLevel,
            'newActivePacket': this.packetSent,
            'newInactivePacket': this.packetReceived,
            'newDestroyedPacket': this.packetDestroyed,
            'stun': this.stun,
            'zap': this.zap,
            'confuse': this.confuse
        }

        this.registry.events.on('changedata', this.registryUpdate, this);

        this.registry.set('newInactivePacket', null);
        this.registry.set('newActivePacket', null);
        this.registry.set('newDestroyedPacket', null);
        this.registry.set('receivedMessage', '');
        this.registry.set('score', 0);
        this.registry.set('stun', false);
        this.registry.set('zap', false);
        this.registry.set('confuse', false);
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
        
        console.log('Done');
    }

    recreate() {
        this.receivedMessage = '';
        this.sendChars = this.level.message.split('');
        this.receivedPackets = [];

        var packetAnimConfig = {
            key: 'packetAnim',
            frames: this.anims.generateFrameNumbers('packet', { start: 0, end: 7 }),
            frameRate: 20,
            repeat: -1
        }
        this.anims.create(packetAnimConfig);

        for (var i=0; i < this.sendChars.length; i++) {
            var key = 'packet: ' + i;
            console.log('adding packet ' + key);

            var packetConfig = {
                key: key,
                type: PACKET.PacketTypes.packet,
                number: i,
                scene: this,
                x: 0,
                y: 220,
                char: this.sendChars[i],
                animation: 'packetAnim'
            }

            var packet = new PACKET.Packet(packetConfig);
            packet.runTween(packet.number * 1500);
        }
    }

    registryUpdate(parent, key, data) {
        console.log('registry changed');
        if (this.handlers[key]) {
            this.handlers[key](this, data);
        }
    }

    /**
     * Resets the game with the given level
     */
    setLevel(scene, levelNumber) {
        scene.level = CONFIG.LEVELS[levelNumber];
    }

    packetSent(scene, packet) {
        scene.activePackets.push(packet);
        console.log(packet.key + " sent");
    }

    /**
     * Packets are added and removed almost always in a FIFO queue
     * so perhaps this could be better optimised
     */
    packetReceived(scene, packet) {
        var index = scene.activePackets.indexOf(packet)
        if (index < 0 ) {
            console.log(packet.key + " failed removal");
        } else {
            scene.activePackets.splice(index, 1);
            scene.receivedPackets.push(packet);
            scene.updateReceivedMessage();
            console.log(packet.key + " received successfully");
        }
    }

    packetDestroyed(scene, packet) {
        var index = scene.activePackets.indexOf(packet)
        if (index < 0 ) {
            console.log(packet.key + " failed removal");
        } else {
            scene.activePackets.splice(index, 1);
            console.log(packet.key + " destroyed successfully");
        }
    }

    updateReceivedMessage() {
        var message = "";
        for (var i=0; i < this.receivedPackets.length; i++) {
            message += this.receivedPackets[i].char;
        }
        this.receivedMessage = message;
        this.registry.set('receivedMessage', message);
    }

    stun(scene, doStun) {
        var packet;
        if (doStun) {
            for (var i=0; i < scene.activePackets.length; i++) {
                if (scene.activePackets[i].checkInDanger()) {
                    packet = scene.activePackets[i];
                    packet.delay();
                    break;
                }
            }
        }
    }

    zap(scene, doZap) {
        var packet;
        if (doZap) {
            for (var i=0; i < scene.activePackets.length; i++) {
                if (scene.activePackets[i].checkInDanger()) {
                    packet = scene.activePackets[i];
                    packet.kill();
                    break;
                }
            }
        }
    }

    confuse(scene, doConfuse) {
        var packet;
        if (doConfuse) {
            for (var i=0; i < scene.activePackets.length; i++) {
                if (scene.activePackets[i].checkInDanger()) {
                    packet = scene.activePackets[i];
                    packet.corrupt();
                    break;
                }
            }
        }
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
        this.clearPacketArray(this.activePackets);
        this.activePackets = [];

        this.clearPacketArray(this.receivedPackets);
        this.receivedPackets = [];

        this.sendChars = [];
    }

    clearPacketArray(array) {
        for (var i=0; i < array.length; i++) {
            array[i].destroy();
        }
    }

    /**
     * Play the game
     */
    play() {
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
        this.load.image('stun', base + 'interactives/packet-attack/assets/leftButton.png');
        this.load.image('confuse', base + 'interactives/packet-attack/assets/middleButton.png');
        this.load.image('zap', base + 'interactives/packet-attack/assets/rightButton.png');
        this.load.image('pipes', base + 'interactives/packet-attack/assets/pipes.png');
    }

    create() {
        console.log('creating UI');

        this.playpause = this.add.sprite(600, 450, 'pause').setInteractive({ useHandCursor: true });
        this.playpause.on('pointerdown', this.togglePause);

        var stun = this.add.image(215, 520, 'stun').setInteractive({ useHandCursor: true });
        stun.on('pointerdown', this.alertStun);
        stun.on('pointerout', this.unAlertStun);
        stun.on('pointerup', this.unAlertStun);

		var confuse = this.add.image(400, 520, 'confuse').setInteractive({ useHandCursor: true });
        confuse.on('pointerdown', this.alertConfuse);
        confuse.on('pointerout', this.unAlertConfuse);
        confuse.on('pointerup', this.unAlertConfuse);

        var zap = this.add.image(590, 520, 'zap').setInteractive({ useHandCursor: true });
        zap.on('pointerdown', this.alertZap);
        zap.on('pointerout', this.unAlertZap);
        zap.on('pointerup', this.unAlertZap);

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

    alertStun() {
        this.scene.registry.set('stun', true);
    }

    unAlertStun() {
        this.scene.registry.set('stun', false);
    }

    alertZap() {
        this.scene.registry.set('zap', true);
    }

    unAlertZap() {
        this.scene.registry.set('zap', false);
    }

    alertConfuse() {
        this.scene.registry.set('confuse', true);
    }

    unAlertConfuse() {
        this.scene.registry.set('confuse', false);
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
}

module.exports = {
    GameScene,
    UIScene
};

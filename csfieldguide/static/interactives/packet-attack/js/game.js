/**
 * Packet Attack
 * 
 * Main Gameplay Classes
 */

require('phaser');

var CONFIG = require('./config.js');
var PACKET = require('./packet.js');
var INFO = require('./information.js');
var BUTTON = require('./phaserButton.js');

const KEY_SEND = "SEND";
const KEY_ACK = "ACK";
const KEY_NACK = "NACK";

// Internationalisation text //

var TXT_COMMANDS = gettext("COMMANDS");
var TXT_DELAY = gettext("DELAY");
var TXT_CORRUPT = gettext("CORRUPT");
var TXT_KILL = gettext("KILL");

var TXT_USES = gettext("Uses:");

var TXT_SENDING = gettext("Sending:");
var TXT_RECEIVED = gettext("Received:");

var TXT_TITLE = CONFIG.TITLE;
var TXT_LEVEL = gettext("Level:");

// End //

/**
 * Gameplay element.
 * Handles all Packet processing, including creation, timers, ACKs & NACKs, resending, etc.
 */
class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'GameScene'});
    }

    /**
     * Initialises all required variables, handlers, and relevant global registry values
     */
    init() {
        this.receivedMessage;
        this.sendChars;
        this.receivedPackets;
        this.level;
        this.allPackets = [];
        this.activePackets = [];
        this.unansweredPacketNumbers = [];
        this.activeAcks = [];
        this.activeNacks = [];
        this.receivedAcks = [];
        this.timers = [];
        this.remainingDelays;
        this.remainingCorrupts;
        this.remainingKills;
        this.resentPackets = 0;

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
        this.registry.set('remainingDelays', -1);
        this.registry.set('remainingCorrupts', -1);
        this.registry.set('remainingKills', -1);
    }

    /**
     * Loads all required base images and sprites
     */
    preload() {
        console.log('Loading base images...');
        this.load.image('bg', base + 'interactives/packet-attack/assets/background.png');

        this.load.spritesheet('packet', base + 'interactives/packet-attack/assets/bluePacketSprites.png', { frameWidth: 100, frameHeight: 100, endFrame: 8 });
        this.load.spritesheet('ack', base + 'interactives/packet-attack/assets/greenPacketSprites.png', { frameWidth: 100, frameHeight: 100, endFrame: 8 });
        this.load.spritesheet('nack', base + 'interactives/packet-attack/assets/redPacketSprites.png', { frameWidth: 100, frameHeight: 100, endFrame: 8 });
        this.load.spritesheet('shield', base + 'interactives/packet-attack/assets/shieldedBluePacketSprites.png', { frameWidth: 100, frameHeight: 100, endFrame: 8 });
        this.load.spritesheet('packetDeath', base + 'interactives/packet-attack/assets/bluePacketExplosionSprites.png', { frameWidth: 100, frameHeight: 100, endFrame: 8 });
        this.load.spritesheet('ackDeath', base + 'interactives/packet-attack/assets/greenPacketExplosionSprites.png', { frameWidth: 100, frameHeight: 100, endFrame: 8 });
        this.load.spritesheet('nackDeath', base + 'interactives/packet-attack/assets/redPacketExplosionSprites.png', { frameWidth: 100, frameHeight: 100, endFrame: 8 });
    }

    /**
     * Creates the GameScene, adds the preloaded background element and animations
     */
    create() {
        console.log('Adding base images and animations');
        this.add.image(400, 300, 'bg');

        var animationConfig = {
            key: 'packetBaseAnim',
            frames: this.anims.generateFrameNumbers('packet', { start: 0, end: 7 }),
            frameRate: 20,
            repeat: -1 //Do forever
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

        animationConfig.key = 'packetDeathAnim';
        animationConfig.repeat = 0;
        animationConfig.hideOnComplete = true;
        animationConfig.frames = this.anims.generateFrameNumbers('packetDeath', { start: 0, end: 7 });
        this.anims.create(animationConfig);

        animationConfig.key = 'ackDeathAnim';
        animationConfig.frames = this.anims.generateFrameNumbers('ackDeath', { start: 0, end: 7 });
        this.anims.create(animationConfig);

        animationConfig.key = 'nackDeathAnim';
        animationConfig.frames = this.anims.generateFrameNumbers('nackDeath', { start: 0, end: 7 });
        this.anims.create(animationConfig);
    }

    /**
     * Adds secondary information to the Scene, including all packets for the initial message.
     * This is to be rerun at the start of each level
     */
    recreate() {
        this.receivedMessage = '';
        this.sendChars = this.level.message.split('');
        this.receivedPackets = [];

        this.remainingDelays = this.level.delays;
        this.remainingCorrupts = this.level.corrupts;
        this.remainingKills = this.level.kills;
        this.registry.set('remainingDelays', this.remainingDelays);
        this.registry.set('remainingCorrupts', this.remainingCorrupts);
        this.registry.set('remainingKills', this.remainingKills);

        for (var i=0; i < this.sendChars.length; i++) {
            var key = 'packet: ' + i;
            console.log('adding packet ' + key);
            var delay = 2000 * i;

            var packetConfig = {
                key: key + KEY_SEND,
                packetType: PACKET.PacketTypes.SENT,
                number: i,
                scene: this,
                x: 0,
                y: 220,
                char: this.sendChars[i],
                isOrdered: this.level.packetsHaveNumbers,
                hasShield: this.level.packetsHaveShields,
                animation: this.level.packetsHaveShields ? 'packetShieldAnim' : 'packetBaseAnim',
                backupAnimation: 'packetBaseAnim',
                killAnimation: 'packetDeathAnim'
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

    /**
     * Handler function for a registry update.
     * If a handler is defined for the given key, apply the set handler for that key.
     */
    registryUpdate(parent, key, data) {
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

    /**
     * Handler function for the time up event for a specific Packet.
     * If timeouts are enabled and the packet hasn't been successful, resend it
     */
    timerEnd(packet) {

        if (this.level.timeoutsEnabled) {
            if (this.unansweredPacketNumbers.indexOf(packet.number) >= 0) {
                if (!packet.isCorrupt || !this.level.acksNacksEnabled) {
                    // Corrupted packets will have been NACKed and resent already by the time the timer ends
                    console.log(packet.key + " missing!");
                    this.resendPacket(packet);
                }
            }
        }

        this.runEndCheck();
    }

    /**
     * Handler function for a 'newActivePacket' registry change.
     * Adds it to one of the arrays of sent packets, depending on its type
     */
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
     * Handler function for a 'newInactivePacket' registry change.
     * Deals with the received packet depending on its type and the level config
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

    /**
     * Handler function for a 'newDestroyedPacket' registry change.
     * Removes the packet from the appropriate array
     */
    packetDestroyed(scene, packet) {
        var index;
        if (packet.type == PACKET.PacketTypes.ACK) {
            index = scene.activeAcks.indexOf(packet)
            scene.activeAcks.splice(index, 1);
        } else if (packet.type == PACKET.PacketTypes.NACK) {
            index = scene.activeNacks.indexOf(packet)
            scene.activeNacks.splice(index, 1);
        } else {
            index = scene.activePackets.indexOf(packet)
            scene.activePackets.splice(index, 1);
        }
        scene.runEndCheck();
    }

    /**
     * Recreates the received message based on received packets and the level config
     */
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
                    if (message[packet.number] == '') {
                        // We don't want to overwrite good data
                        message[packet.number] = '?';
                    }
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

    /**
     * Interprets a new properly received packet.
     * Sends an ACK or NACK if required, then adds it to the array of received Packets
     */
    interpretNewPacket(packet) {
        if (this.level.acksNacksEnabled) {
            if (this.level.packetsHaveNumbers && this.alreadyReceived(packet.number)) {
                this.sendAck(packet);
                return;
            } else if (packet.isCorrupt) {
                this.sendNack(packet);
                return;
            } else {
                this.sendAck(packet);
            }
        }
        this.receivedPackets.push(packet);
    }

    /**
     * Returns true if a Packet with the given number has already been received successfully.
     * false otherwise
     */
    alreadyReceived(number) {
        for (var i=0; i < this.receivedPackets.length; i++) {
            if (this.receivedPackets[i].number == number) {
                return true;
            }
        }
        return false;
    }

    /**
     * Sends a NACK-type Packet from the receiver to the sender.
     * This is to say the received packet was corrupted
     */
    sendNack(packet) {
        var packetConfig = {
            key: packet.key + KEY_NACK,
            packetType: PACKET.PacketTypes.NACK,
            number: packet.number,
            scene: this,
            x: 800,
            y: 310,
            char: '?',
            isOrdered: this.level.packetsHaveNumbers,
            animation: 'packetNackAnim',
            killAnimation: 'nackDeathAnim'
        }

        var newPacket = new PACKET.Packet(packetConfig);
        newPacket.runTween(500, true);
        this.registry.set('newActivePacket', newPacket);
        this.allPackets.push(newPacket);
    }

    /**
     * Sends an ACK-type Packet from the receiver to the sender.
     * This is to say the received packet is valid
     */
    sendAck(packet) {
        var packetConfig = {
            key: packet.key + KEY_ACK,
            packetType: PACKET.PacketTypes.ACK,
            number: packet.number,
            scene: this,
            x: 800,
            y: 310,
            char: packet.char,
            isOrdered: this.level.packetsHaveNumbers,
            animation: 'packetAckAnim',
            killAnimation: 'ackDeathAnim'
        }

        var newPacket = new PACKET.Packet(packetConfig);
        newPacket.runTween(500, true);
        this.registry.set('newActivePacket', newPacket);
        this.allPackets.push(newPacket);
    }

    /**
     * Resends a previously sent Packet from the sender to the receiver.
     * If packets don't have numbers in the level config this is just a resend
     * of each character in sequence, TODO: Exclude characters that have been ACKed.
     */
    resendPacket(packet) {
        var split = this.sendChars;
        var char = this.level.packetsHaveNumbers ? split[packet.number] : split[this.resentPackets % split.length];

        var packetConfig = {
            key: packet.key + KEY_SEND,
            packetType: PACKET.PacketTypes.SENT,
            number: this.level.packetsHaveNumbers ? packet.number: this.resentPackets++,
            scene: this,
            x: 0,
            y: 220,
            char: char,
            isOrdered: this.level.packetsHaveNumbers,
            hasShield: this.level.packetsHaveShields,
            animation: this.level.packetsHaveShields ? 'packetShieldAnim' : 'packetBaseAnim',
            backupAnimation: 'packetBaseAnim',
            killAnimation: 'packetDeathAnim'
        }

        var newPacket = new PACKET.Packet(packetConfig);
        newPacket.runTween(0);
        var timer = this.time.delayedCall(CONFIG.TIMEOUT, this.timerEnd, [newPacket], this);
        this.registry.set('newActivePacket', newPacket);
        this.allPackets.push(newPacket);
        this.timers.push(timer);
    }

    /**
     * Handler function for a 'delay' registry change.
     * If doDelay is false or the user doesn't have enough delays to do, does nothing.
     * Otherwise, finds the affected Packet and runs its delay method.
     * Will try to attack sent packets first.
     * If none are applicable and the level config allows it: will then try to attack ACKs, then NACKs
     */
    delay(scene, doDelay) {
        if (doDelay && scene.remainingDelays > 0) {
            if (!scene.doCommand(PACKET.PacketCommands.DELAY, scene, scene.activePackets) && scene.level.canAttackAcksNacks) {
                if (!scene.doCommand(PACKET.PacketCommands.DELAY, scene, scene.activeAcks)) {
                    scene.doCommand(PACKET.PacketCommands.DELAY, scene, scene.activeNacks);
                }
            }
        }
    }
    
    /**
     * Handler function for a 'corrupt' registry change.
     * If doCorrupt is false or the user doesn't have enough corrupts to do, does nothing.
     * Otherwise, finds the affected Packet and runs its corrupt method.
     * Will attack sent packets first. If none are applicable: will attack ACKs, then NACKs
     */
    corrupt(scene, doCorrupt) {
        if (doCorrupt && scene.remainingCorrupts > 0) {
            if (!scene.doCommand(PACKET.PacketCommands.CORRUPT, scene, scene.activePackets) && scene.level.canAttackAcksNacks) {
                if (!scene.doCommand(PACKET.PacketCommands.CORRUPT, scene, scene.activeAcks)) {
                    scene.doCommand(PACKET.PacketCommands.CORRUPT, scene, scene.activeNacks);
                }
            }
        }
    }

    /**
     * Handler function for a 'kill' registry change.
     * If doKill is false or the user doesn't have enough kills to do, does nothing.
     * Otherwise, finds the affected Packet and runs its kill method.
     * Will attack sent packets first. If none are applicable: will attack ACKs, then NACKs
     */
    kill(scene, doKill) {
        if (doKill && scene.remainingKills > 0) {
            if (!scene.doCommand(PACKET.PacketCommands.KILL, scene, scene.activePackets) && scene.level.canAttackAcksNacks) {
                if (!scene.doCommand(PACKET.PacketCommands.KILL, scene, scene.activeAcks)) {
                    scene.doCommand(PACKET.PacketCommands.KILL, scene, scene.activeNacks);
                }
            }
        }
    }

    /**
     * Executes the given command on the first packet in the given packetList
     * that is currently in the 'danger zone'.
     * Returns true if an applicable packet was found, false otherwise
     */
    doCommand(command, scene, packetList) {
        var packet;
        for (var i=0; i < packetList.length; i++) {
            packet = packetList[i];
            if (packet.checkInDanger() && !packet.killed) {
                if (command == PACKET.PacketCommands.DELAY) {
                    packet.delay();
                    scene.remainingDelays--;
                    scene.registry.set('remainingDelays', scene.remainingDelays);
                } else if (command == PACKET.PacketCommands.CORRUPT) {
                    packet.corrupt();
                    scene.remainingCorrupts--;
                    scene.registry.set('remainingCorrupts', scene.remainingCorrupts);
                } else {
                    packet.kill();
                    scene.remainingKills--;
                    scene.registry.set('remainingKills', scene.remainingKills);
                }
                return true; // Don't attack more than one Packet
            }
        }
        return false;
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
                if (this.level.acksNacksEnabled) {
                    // Don't need a delay
                    this.endLevel();
                } else {
                    // Need a delay to show the final result
                    var scene = this;
                    setTimeout(function() {scene.endLevel();}, 1000);
                }
        }
    }

    /**
     * Checks for remaining active timers.
     * Returns true if there is none or timeouts are not enabled, false otherwise
     */
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

    /**
     * Ends the current level: prevents further input and clears level-specific information from the Scene
     */
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
     * Empties all elements and hidden variables from the Scene, ready for the next run
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
        this.resentPackets = 0;
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
     * Starts the game
     */
    play() {
        this.scene.get('UIScene').startButtons();
        this.recreate();
    }
}

/**
 * Game UI element.
 * Handles all button handling and other UI related tasks.
 */
class UIScene extends Phaser.Scene {

    constructor() {
        super({ key: 'UIScene' });
    }

    /**
     * Initialises all required variables and handlers
     */
    init() {
        this.handlers = {
            'level': this.setLevel,
            'receivedMessage': this.updateReceivedMessage,
            'remainingDelays': this.updateDelays,
            'remainingCorrupts': this.updateCorrupts,
            'remainingKills': this.updateKills
        }

        this.registry.events.on('changedata', this.registryUpdate, this);

        this.paused = false;
    }

    /**
     * Loads all required base images
     */
    preload() {
        console.log('loading UI images');
        this.load.image('pause', base + 'interactives/packet-attack/assets/pauseButton.png');
        this.load.image('play', base + 'interactives/packet-attack/assets/playButton.png');
        this.load.image('delay', base + 'interactives/packet-attack/assets/leftButton.png');
        this.load.image('corrupt', base + 'interactives/packet-attack/assets/middleButton.png');
        this.load.image('kill', base + 'interactives/packet-attack/assets/rightButton.png');
        this.load.image('pipes', base + 'interactives/packet-attack/assets/pipes.png');
    }

    /**
     * Builds the UI with all elements
     */
    create() {
        console.log('creating UI');

        var textConfig = {
            font: '40px Open Sans',
            fill: '#000000',
            align: 'center',
        }
        this.titleText = this.add.text(400, 0, TXT_TITLE, textConfig);
        this.titleText.setOrigin(0.5, 0);

        textConfig.font = '36px Open Sans';
        this.commandsText = this.add.text(400, 450, TXT_COMMANDS, textConfig)
        this.commandsText.setOrigin(0.5, 0.5);

        textConfig.font = '20px Open Sans';
        this.levelText = this.add.text(400, 50, TXT_LEVEL, textConfig);
        this.levelText.setOrigin(0.5, 0);
        this.sendText = this.add.text(20, 10, TXT_SENDING, textConfig);
        this.receivedText = this.add.text(780, 10, TXT_RECEIVED, textConfig);
        this.receivedText.setOrigin(1, 0);

        this.playpause = this.add.sprite(600, 450, 'pause');
        this.playpause.on('pointerdown', this.togglePause);

        var buttonTextConfig = {
            font: '24px Open Sans',
            fill: '#db3300',
            align: 'center',
        };

        var delayButtonConfig = {
            scene: this,
            x: 215,
            y: 520,
            imageKey: 'delay',
            buttonSize: [170, 63],
            text: TXT_DELAY,
            textConfig: buttonTextConfig 
        }
        this.delay = new BUTTON.PhaserButton(delayButtonConfig);
        this.delay.on('pointerdown', this.alertDelay);
        this.delay.on('pointerout', this.unAlertDelay);
        this.delay.on('pointerup', this.unAlertDelay);
        this.delayRemainder = this.add.text(215, 580, TXT_USES, textConfig);
        this.delayRemainder.setOrigin(0.5, 0.5);

        var corruptButtonConfig = {
            scene: this,
            x: 400,
            y: 520,
            imageKey: 'corrupt',
            buttonSize: [167, 68],
            text: TXT_CORRUPT,
            textConfig: buttonTextConfig 
        }
        this.corrupt = new BUTTON.PhaserButton(corruptButtonConfig);
        this.corrupt.on('pointerdown', this.alertCorrupt);
        this.corrupt.on('pointerout', this.unAlertCorrupt);
        this.corrupt.on('pointerup', this.unAlertCorrupt);
        this.corruptRemainder = this.add.text(400, 580, TXT_USES, textConfig);
        this.corruptRemainder.setOrigin(0.5, 0.5);

        var killButtonConfig = {
            scene: this,
            x: 590,
            y: 520,
            imageKey: 'kill',
            buttonSize: [179, 60],
            text: TXT_KILL,
            textConfig: buttonTextConfig 
        }
        this.kill = new BUTTON.PhaserButton(killButtonConfig);
        this.kill.on('pointerdown', this.alertKill);
        this.kill.on('pointerout', this.unAlertKill);
        this.kill.on('pointerup', this.unAlertKill);
        this.killRemainder = this.add.text(590, 580, TXT_USES, textConfig);
        this.killRemainder.setOrigin(0.5, 0.5);

        this.pipes = this.add.image(400, 300, 'pipes'); // Image needed above the packets
    }

    /**
     * Handler function for a registry update.
     * If a handler is defined for the given key, apply the set handler for that key.
     */
    registryUpdate(parent, key, data) {
        if (this.handlers[key]) {
            this.handlers[key](this, data);
        }
    }

    /**
     * Handler function for a 'level' registry update.
     * Updates the UI to present the given level
     */
    setLevel(scene, level) {
        scene.levelNum = level;
        scene.levelText.setText(TXT_LEVEL + ' ' + scene.levelNum);
        scene.levelMessage = CONFIG.LEVELS[level].message;
        scene.sendText.setText(TXT_SENDING + '\n' + scene.levelMessage);
    }

    /**
     * Handler function for a 'receivedMessage' registry update.
     * Updates the UI to present the given message
     */
    updateReceivedMessage(scene, message) {
        scene.receivedText.setText(TXT_RECEIVED + '\n' + message);
    }

    /**
     * Handler function for a 'remainingDelays' registry update.
     * Updates the UI to present the number of remaining delays, and disables
     * the delay button if appropriate
     */
    updateDelays(scene, number) {
        scene.delayRemainder.setText(TXT_USES + ' ' + number);

        if (number <=0) {
            scene.delay.alpha = 0.5;
            scene.delay.disableInteractive();
        } else {
            scene.delay.alpha = 1;
            scene.delay.setInteractive({ useHandCursor: true });
        }
    }

    /**
     * Handler function for a 'remainingCorrupts' registry update.
     * Updates the UI to present the number of remaining corrupts, and disables
     * the corrupt button if appropriate
     */
    updateCorrupts(scene, number) {
        scene.corruptRemainder.setText(TXT_USES + ' ' + number);

        if (number <=0) {
            scene.corrupt.alpha = 0.5;
            scene.corrupt.disableInteractive();
        } else {
            scene.corrupt.alpha = 1;
            scene.corrupt.setInteractive({ useHandCursor: true });
        }
    }

    /**
     * Handler function for a 'remainingKills' registry update.
     * Updates the UI to present the number of remaining kills, and disables
     * the kill button if appropriate
     */
    updateKills(scene, number) {
        scene.killRemainder.setText(TXT_USES + ' ' + number);

        if (number <=0) {
            scene.kill.alpha = 0.5;
            scene.kill.disableInteractive();
        } else {
            scene.kill.alpha = 1;
            scene.kill.setInteractive({ useHandCursor: true });
        }
    }

    /**
     * Sets the registry to alert that a delay needs to be handled
     */
    alertDelay() {
        this.scene.registry.set('delay', true);
    }

    /**
     * Resets the delay registry so that it can be run again
     */
    unAlertDelay() {
        this.scene.registry.set('delay', false);
    }

    /**
     * Sets the registry to alert that a corrupt needs to be handled
     */
    alertCorrupt() {
        this.scene.registry.set('corrupt', true);
    }

    /**
     * Resets the corrupt registry so that it can be run again
     */
    unAlertCorrupt() {
        this.scene.registry.set('corrupt', false);
    }

    /**
     * Sets the registry to alert that a kill needs to be handled
     */
    alertKill() {
        this.scene.registry.set('kill', true);
    }

    /**
     * Resets the kill registry so that it can be run again
     */
    unAlertKill() {
        this.scene.registry.set('kill', false);
    }

    /**
     * Toggles the GameScene scene pause.
     * This does not affect the UIScene, so buttons (like the resume button) can still be pressed
     */
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

    /**
     * Renders all UI buttons unclickable
     */
    stopButtons() {
        this.playpause.disableInteractive();
        this.delay.disableInteractive();
        this.corrupt.disableInteractive();
        this.kill.disableInteractive();
    }

    /**
     * Renders all UI buttons clickable
     */
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

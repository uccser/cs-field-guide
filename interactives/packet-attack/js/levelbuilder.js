var RIGHT_POST_POS = 670;
var DIST_BETWEEN_PACKETS = 200;

function LevelBuilder(levelData) {

	this.packetGroup = null;
	this.packets = [];
	this.messageStatus = [];
	this.acksNacksGroup = null;
	this.acksNacks = [];
	this.messageTimers = [];
	this.failCount = 0;
	this.pipes = null;
	this.fullMessage = "HELLOTHERE";
	this.recMessage = null;
	this.nDelayLeft = null;
	this.nCorrupLeft = null;
	this.nKillLeft = null;
	this.score = null;
	this.playPauseButton = null;
	this.startTime = null;

	this.preload = function() {
		//Load some heavy graphics
    	levelData.game.load.image("background", "assets/background.png");
    	levelData.game.load.image('stun', 'assets/leftButton.png');
    	levelData.game.load.image('zap', 'assets/middleButton.png');
    	levelData.game.load.image('confuse', 'assets/rightButton.png');
			levelData.game.load.spritesheet('packet', 'assets/bluePacketSprites.png', 100, 100, 8);
			levelData.game.load.spritesheet('ack', 'assets/greenPacketSprites.png', 100, 100, 8);
			levelData.game.load.spritesheet('nack', 'assets/redPacketSprites.png', 100, 100, 8);
			levelData.game.load.spritesheet('shield', 'assets/shieldedBluePacketSprites.png', 100, 100, 8);
			levelData.game.load.image('pipes', 'assets/pipes.png');
			levelData.game.load.image('pause', 'assets/leftGreenButton.png');
	    levelData.game.load.image('play', 'assets/rightGreenButton.png');
	};

	this.create = function() {
		//Set the background
		background = levelData.game.add.sprite(0, 0, "background");
		this.pipes  = levelData.game.add.sprite(0, 0, "pipes");

		//Make Level title text
		var titleText = this.game.add.text(400, 0, "Packet Attack");
		titleText.fontSize = 40;
		titleText.fill = '#000000';
		titleText.wordWrap = true;
		titleText.wordWrapWidth = 800;
		titleText.align = 'center';
		titleText.font = 'Open Sans';
		titleText.anchor.setTo(0.5, 0);

		if (!this.game.urlmode){
			var subTitleText = this.game.add.text(400, 45, "Level: " + levelData.levelNumber.toString());
			subTitleText.fontSize = 30;
			subTitleText.fill = '#000000';
			subTitleText.wordWrap = true;
			subTitleText.wordWrapWidth = 800;
			subTitleText.align = 'center';
			subTitleText.font = 'Open Sans';
			subTitleText.anchor.setTo(0.5, 0);

			this.score = this.game.add.text(5, 85, "Score: " + levelData.game.score.toString());
			this.score.fontSize = 30;
			this.score.fill = '#000000';
			this.score.wordWrap = true;
			this.score.wordWrapWidth = 800;
			this.score.align = 'center';
			this.score.font = 'Open Sans';
			this.score.anchor.setTo(0, 0);
	   	}

		//message to send text
		var sendingText = this.game.add.text(5, 5, "Sending: \n" + this.fullMessage.slice(0, levelData.numberOfPackets));
		sendingText.fontSize = 30;
		sendingText.fill = '#000000';
		sendingText.wordWrap = true;
		sendingText.wordWrapWidth = 800;
		sendingText.align = 'center';
		sendingText.font = 'Open Sans';

		var recText = this.game.add.text(600, 5, "Received:");
		recText.fontSize = 30;
		recText.fill = '#000000';
		recText.wordWrap = true;
		recText.wordWrapWidth = 800;
		recText.align = 'center';
		recText.font = 'Open Sans';

		if(!levelData.packetsHaveNumbers) {
			this.recMessage = this.game.add.text(600, 45, "");
		} else {
			this.recMessage = this.game.add.text(600, 45, Array(levelData.numberOfPackets+1).join("-"));
		}

		this.recMessage.fontSize = 30;
		this.recMessage.fill = '#000000';
		this.recMessage.wordWrap = true;
		this.recMessage.wordWrapWidth = 800;
		this.recMessage.align = 'center';
		this.recMessage.font = 'Open Sans';

		this.messageStatus = new Array(levelData.numberOfPackets);

		//Make Buttons
		var stun = levelData.game.add.button(125, 490, 'stun', stunPressed, this, 2, 1, 0);
		stun.clickCount = levelData.stuns;

		var zap = levelData.game.add.button(320, 490, 'zap', zapPressed, this, 2, 1, 0);
		zap.clickCount = levelData.zaps;

		var confuse = levelData.game.add.button(500, 490, 'confuse', killPressed, this, 2, 1, 0);
		confuse.clickCount = levelData.confuses;

		this.playPauseButton = levelData.game.add.button(570, 430, 'pause', pausePlayPressed, this, 2, 1, 0);

		//Turn off buttons that have 0 or fewer clicks left.
		if(stun.clickCount <= 0){
			stun.input.enabled = false;
    		stun.alpha = 0.5;
		}
		if(zap.clickCount <= 0){
			zap.input.enabled = false;
    		zap.alpha = 0.5;
		}
		if(confuse.clickCount <= 0){
			confuse.input.enabled = false;
    		confuse.alpha = 0.5;
		}

		//make text under buttons
		this.nDelayLeft = this.game.add.text(200, 560, levelData.stuns.toString() + " left");
		this.nDelayLeft.fontSize = 20;
		this.nDelayLeft.fill = '#FFFFFF';
		this.nDelayLeft.align = 'center';
		this.nDelayLeft.font = 'Open Sans';
		this.nDelayLeft.anchor.setTo(0.5, 0);

		this.nCorrupLeft = this.game.add.text(400, 560, levelData.zaps.toString() + " left");
		this.nCorrupLeft.fontSize = 20;
		this.nCorrupLeft.fill = '#FFFFFF';
		this.nCorrupLeft.align = 'center';
		this.nCorrupLeft.font = 'Open Sans';
		this.nCorrupLeft.anchor.setTo(0.5, 0);

		this.nKillLeft = this.game.add.text(600, 560, levelData.confuses.toString() + " left");
		this.nKillLeft.fontSize = 20;
		this.nKillLeft.fill = '#FFFFFF';
		this.nKillLeft.align = 'center';
		this.nKillLeft.font = 'Open Sans';
		this.nKillLeft.anchor.setTo(0.5, 0);

    	levelData.game.time.advancedTiming = true;

		//Pause - 310  560
		//Play - 420 560

		levelData.game.input.onDown.add(pausePlayPressed, this);

		//Make Packets
	    this.packetGroup = levelData.game.add.group(); //Packets go in thier own group
	    this.acksNacksGroup = levelData.game.add.group(); //Acks and Nacks go in thier own group

    	for (var i = 0; i < levelData.numberOfPackets; i ++) {
      		var packet = this.packetMaker('packet', i, levelData.game, this.packetGroup, 100 - (i * DIST_BETWEEN_PACKETS), 160);
      		packet.body.velocity.x = 100;
      		this.packets.push(packet);

      		if (levelData.timeoutsEnabled) {
      			this.messageTimers.push(new Date());
      		}

		}

		this.pipes.bringToTop();
		this.startTime = moment();
	}

	this.updateReceivedText = function(packet){
		var str  = this.recMessage.text.split("");
		if(!packet.isAlive) {return;}
		if (levelData.packetsHaveNumbers) {//Then index into the list
			str[packet.number] = packet.children[0].text.substr(packet.children[0].text.length-1);
			this.recMessage.text = str.join("");
		}
		else {
			this.recMessage.text += packet.children[0].text;
		}
	}

	this.update = function(){ //Called every frame
		//console.log(levelData.game.time.fps);
		//Checking for end of level
		if (this.packets.length == 0 && this.acksNacks.length == 0 && !areWaitingOnTimeouts(this.messageTimers)){
			result = true;
			for (var i = 0; i < levelData.numberOfPackets; i ++){
				result = result && this.messageStatus[i];
			}
			if (!result){ //Something went wrong, you win!

    			levelData.game.time.events.add(Phaser.Timer.SECOND * 1.5, function(){
					var information = new Information(this.game, InfoPaneType.PROCEED, levelData);
					levelData.game.state.add('information', information);
					levelData.game.state.start('information');
    			}, this);

			} else { //Fail, the message got there, and you loose.
				levelData.game.time.events.add(Phaser.Timer.SECOND * 1.5, function(){
  					this.failCount ++;
					var information = new Information(this.game, (levelData.levelNumber === 7 ? InfoPaneType.END : InfoPaneType.FAIL), levelData);
  					levelData.game.state.add('information', information);
  					levelData.game.state.start('information');
    			}, this);
			}
		}


		//So here's where the game logic goes. Basically, it's something like this.
		//A packet is part of a message. A valid packet is not dead, not zapped, and in order (if it matters).
		//So every time a packet goes to the receiver, we process it, then remove it.
		//Optionally, acks and nacks are sent, or order is noted as not correct.

		//We always deal with the first packet in the queue, and then remove it once we've proceecced it.

		if (this.packets.length > 0) {

			var packet = _.max(this.packets, function(packet) {return packet.body.x}); //pick off the packet wit the biggest x coordinate value.

			if (!packet.isAlive && (packet.x >= RIGHT_POST_POS || packet.y >= 500)) { //Dead packets fall off the screen, so we cant use x val to check finished.

				this.messageStatus[packet.number] = false; //Set a false entry for succcess array.
				this.updateReceivedText(packet);
				_.remove(this.packets, packet);
				this.game.score += 5;
				if (!levelData.game.urlmode) {
					this.score.text = "Score: " + levelData.game.score.toString();
				}
			} else if (packet.x >= RIGHT_POST_POS) {//arrived, may be zapped or delayed.
				if (packet.isZapped) {
					this.messageStatus[packet.number] = false;
					if (levelData.acksNacksEnabled) {
						//console.log("Sending NACK for packet " + packet.number.toString());
						sendNackAck(packet.number, false, this);
					}

					levelData.game.score += 10;

				}
				else if (packet.wasStunned && levelData.numberOfPackets > 1 && !levelData.packetsHaveNumbers) { //The packet became out of order
					this.messageStatus[packet.number] = false;

					if (levelData.acksNacksEnabled) {
						//console.log("Sending NACK for packet " + packet.number.toString());
						sendNackAck(packet.number, false, this);
					}

					levelData.game.score += 10;

				} else { //Packet is fine
					this.messageStatus[packet.number] = true;

					if (levelData.timeoutsEnabled) {
						this.messageTimers[packet.number] = null;
					}
					if (levelData.acksNacksEnabled) {
						//console.log("Sending ACK for packet " + packet.number.toString());
						sendNackAck(packet.number, true, this);
					}
				}

				this.updateReceivedText(packet);
				_.remove(this.packets, packet);
				if (!levelData.game.urlmode) {
					this.score.text = "Score: " + levelData.game.score.toString();
				}

			} else { //Packet is still travelling
				if (packet.wasStunned) {
					this.messageStatus[packet.number] = false;
				};
			}
		}

		//Deal with Acks and Nacks
		if (this.acksNacks.length > 0) {
			var ackOrNack = _.max(this.acksNacks, function(packet) {return packet.body.x});

			if (ackOrNack.x <= 130) {
				if (this.messageStatus[ackOrNack.number] == true) {
					//Stop a timer for a timeout..
				} else {
					//Resend message
					var packet = this.packetMaker('packet', ackOrNack.number, levelData.game, this.packetGroup, 130, 160);
      				packet.body.velocity.x = 100;
      				this.packets.push(packet);
			      	if (levelData.timeoutsEnabled) {
      					this.messageTimers.push(new Date());
      				}
				}
				_.remove(this.acksNacks, ackOrNack);
			}
		}

		//Timeouts
		if (levelData.timeoutsEnabled) {
			for (var i = 0; i < levelData.numberOfPackets; i++) {
				var time = this.messageTimers[i];
				if (!time) {
					continue; //The packet has been delivered.
				}
				if (this.messageStatus[i] == false) { //if the message didnt get there
					var now = new Date();
					if ((now-time)/1000 > 25) { //and more than 25 seconds has passed,
						//Resend message
						var packet = this.packetMaker('packet', i, levelData.game, this.packetGroup, 130 - (i * DIST_BETWEEN_PACKETS), 160);
      					packet.body.velocity.x = 100;
      					this.packets.push(packet);
      					levelData.game.score += 20;
				      	if (levelData.timeoutsEnabled) {
      						this.messageTimers[i] = new Date();
      					}
					}
				}
			}
		}
	}

	//Helper Functions
	function isInDangerZone(xVal){
    	return (xVal >= 350 && xVal <= 450 )
	}

	function tryDisableButton(button) {
	    button.clickCount --;
	    if (button.clickCount <= 0){
    		button.input.enabled = false;
    		button.alpha = 0.5;
	    }
	}

	function areWaitingOnTimeouts(timers){
		for (var i = 0; i < levelData.numberOfPackets; i++){
			if (timers[i] != null) { // There's a timer still going.
				return true;
			}
		}
		return false;
	}

	//Packet Maker

	this.packetMaker = function(image_key, number, game, group, x, y){
	    //Makes the sprite
	    game.load.image(image_key, 'assets/' + image_key);

	    //Adds it to the group
	    var packet;
	    if (group !== this.acksNacksGroup) { //We dont want the acks and nacks to get shields
	    	packet = group.create(x, y, (levelData.packetsHaveShields ? "shield" : image_key));
	    } else {
	    	packet = group.create(x, y, image_key);
	    }

	    game.physics.enable(packet, Phaser.Physics.ARCADE);

	    packet.animations.add('flying', [0, 1, 2, 3, 4, 5, 6, 7], 25, true);
       	packet.animations.play('flying');

	    //Dynamic properties on the srpite
	    packet.number = number;
	    packet.hasShield = levelData.packetsHaveShields;
	    packet.isAlive = true;
	    packet.isZapped = false;
	    packet.wasStunned = false;

		//Make the label (if required)
	    if(levelData.packetsHaveNumbers) {
	    	if (packet.isAck) {
	    		packet.addChild(game.add.text(15, 25, packet.number.toString() + ":" + this.fullMessage.charAt(packet.number),  {font: "30px Open Sans", align: "center:", fill: "#FFFFFF"}));
	    	}
	    	else if (image_key == 'nack') { //have no data on nack
	    		packet.addChild(game.add.text(30, 25, packet.number.toString() + ": ?",  {font: "30px Open Sans", align: "center:", fill: "#FFFFFF"}));
	    	}
	    	else {
	    		packet.addChild(game.add.text(30, 25, packet.number.toString() + ":" + this.fullMessage.charAt(packet.number),  {font: "30px Open Sans", align: "center:", fill: "#FFFFFF"}));

	    	}
	    }
	    else {
	    	packet.addChild(game.add.text(40, 25, this.fullMessage.charAt(packet.number),  {font: "30px Open Sans", align: "center:", fill: "#FFFFFF"}));
	    }
	    return packet;
	}

	function sendNackAck(number, isAck, context){
			var packet;
			if (isAck) {
				packet = context.packetMaker('ack', number, levelData.game, context.acksNacksGroup, RIGHT_POST_POS , 250);
			}
			else {
				packet = context.packetMaker('nack', number, levelData.game, context.acksNacksGroup, RIGHT_POST_POS, 250);
			}
      		packet.body.velocity.x = -100;
      		context.acksNacks.push(packet);
	}

	//Button Click Handlers
	function stunPressed (button) { //Delay button
		//console.log("Stun!");
		var i; // the robots in group variable of i
		for (i = 0; i < this.packetGroup.length; i++) {
			var packet = this.packetGroup.getAt(i);
			if (isInDangerZone(packet.body.x+50)) {
				//if (levelData.packetsHaveNumbers) {
				//this.packets.splice(i, 1);
				//this.packets.splice(i + 2, 0, packet);
				//}
				if (packet.wasStunned) {
					levelData.game.add.tween(packet).to({ x: packet.x - 500 }, 1000, Phaser.Easing.Cubic.Out, true, 0);
				}
				else {
					levelData.game.add.tween(packet).to({ x: packet.x - 400 }, 1000, Phaser.Easing.Cubic.Out, true, 0);

				}

				//packet.x -= 300;
				tryDisableButton(button);
				this.nDelayLeft.text = button.clickCount.toString() + " left";
				packet.wasStunned = true;
				break; //Dont let two packets get hurt.

			}
		}
		if (levelData.canAttackAcksNacks) {
			for (i = 0; i < this.acksNacksGroup.length; i++) {
				var packet = this.acksNacksGroup.getAt(i);
				if (isInDangerZone(packet.body.x+50)) {
					//if (levelData.packetsHaveNumbers) {
					//this.packets.splice(i, 1);
					//this.packets.splice(i + 2, 0, packet);
					//}
					if (packet.wasStunned) {
						levelData.game.add.tween(packet).to({ x: packet.x + 500 }, 1000, Phaser.Easing.Cubic.Out, true, 0);
					}
					else {
						levelData.game.add.tween(packet).to({ x: packet.x + 400 }, 1000, Phaser.Easing.Cubic.Out, true, 0);

					}
					tryDisableButton(button);
					this.nDelayLeft.text = button.clickCount.toString() + " left";
					packet.wasStunned = true;
					break; //Dont let two packets get hurt.
				}
			}
		}
	}

	function zapPressed (button) { //Corrupt Button
		//console.log("Zap!");
		var i;
		for (i = 0; i < this.packetGroup.length; i++) {
			var packet = this.packetGroup.getAt(i);
			if (isInDangerZone(packet.body.x+50)) {
				if (packet.hasShield) { //If it has a shield, remove it, otherwise its zapped.
					packet.hasShield = false;
					packet.loadTexture('packet');
			        packet.animations.add('flying', [0, 1, 2, 3, 4, 5, 6, 7], 25, true);
        			packet.animations.play('flying');
				}
				else {
					packet.isZapped = true;
					packet.removeChildren();
					packet.addChild(this.game.add.text(40, 22, "?",  {font: "35px Open Sans", align: "center:", fill: "#FFFFFF"}));
				}
				tryDisableButton(button);
				this.nCorrupLeft.text = button.clickCount.toString() + " left";
				break; //Dont let two packets get hurt.
			}
		}

		if (levelData.canAttackAcksNacks) {
			for(i = 0; i < this.acksNacksGroup.length; i++) {
				var packet = this.acksNacksGroup.getAt(i);
				if (isInDangerZone(packet.body.x+50)) {
					if (packet.hasShield) { //If it has a shield, remove it, otherwise it's zapped.
						packet.hasShield = false;
						packet.loadTexture('packet');
				        packet.animations.add('flying', [0, 1, 2, 3, 4, 5, 6, 7], 25, true);
	        			packet.animations.play('flying');
					}
					else {
						packet.isZapped = true;
						packet.removeChildren();
						packet.addChild(this.game.add.text(40, 22, "?",  {font: "35px Open Sans", align: "center:", fill: "#FFFFFF"}));
					}
					tryDisableButton(button);
					this.nCorrupLeft.text = button.clickCount.toString() + " left";
					break; //Dont let two packets get hurt.
				}
			}
		}
	}

	function killPressed (button) {
		//console.log("Confuse!");
		var i;

		for(i = 0; i < this.packetGroup.length; i++) {
			var packet = this.packetGroup.getAt(i);
			if (isInDangerZone(packet.body.x+50)) {
				packet.body.velocity.x = (Math.random() * 100) + 50;
				packet.body.velocity.y = (Math.random() * 100) + 50;
				packet.isAlive = false;
				tryDisableButton(button);
				this.nKillLeft.text = button.clickCount.toString() + " left";
				break; //Dont let two packets get killed.
				//TODO:, make the scene collide, add some bounce. that'd look cooooool
			}
		}

		if (levelData.canAttackAcksNacks) {
			for(i = 0; i < this.acksNacksGroup.length; i++) {
				var packet = this.acksNacksGroup.getAt(i);
				if (isInDangerZone(packet.body.x+50)) {
					packet.body.velocity.x = (Math.random() * 100) + 50;
					packet.body.velocity.y = (Math.random() * 100) + 50;
					packet.isAlive = false;
					tryDisableButton(button);
					this.nKillLeft.text = button.clickCount.toString() + " left";
					break; //Dont let two packets get killed.
					//TODO:, make the scene collide, add some bounce. that'd look cooooool
				}
			}
		}
	}

	function pausePlayPressed(event) {
		// Coordinates of button - 570, 430
		// Yes, this is silly, but it's neccessary when the game loop is paused with Phaser.
		if (event.x > 570 && event.x < (570 + 70) && event.y > 430 && event.y < 430 + 41) {
			if (levelData.game.paused) {
				levelData.game.paused = false;
				this.playPauseButton.loadTexture('pause');
			}
			else {
				levelData.game.paused = true;
				this.playPauseButton.loadTexture('play');
			}
		}
	}
}

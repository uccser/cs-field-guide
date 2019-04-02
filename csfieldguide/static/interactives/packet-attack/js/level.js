/**
 * Packet Attack
 * 
 * Level class builder
 */

 function Level(levelNumber) {

	//Defaults
	this.message = "LONDON";
	
	//Packet abilities - ALL n packets will have the same abilities. 
	this.packetsHaveShields = false; 
	this.packetsHaveNumbers = false;

	//System abilities
	this.acksNacksEnabled = false;
	this.timeoutsEnabled = false;
	this.canAttackAcksNacks = false;

	//User attacks on the packets
	this.delays = 1;
	this.kills = 1;
	this.corrupts = 1;

	this.levelNumber = levelNumber;

	// Setters - Additional checks can be added. 
	this.setMsg = function(text) {
		this.message = text;
		return this; // Setters return this so that the settings can be chained.
	}

	this.setDelays = function(delays) {
		this.delays = delays;
		return this;
	}

	this.setKills = function(kills) {
		this.kills = kills;
		return this;
	}

	this.setCorrupts = function(corrupts) {
		this.corrupts = corrupts;
		return this;
	}

	this.setPacketsHaveShields = function(packetsHaveShields) {
		this.packetsHaveShields = packetsHaveShields;
		return this;
	}

	this.setPacketsHaveNumbers = function(packetsHaveNumbers) {
		this.packetsHaveNumbers = packetsHaveNumbers;
		return this;
	}

	this.setAcksNacksEnabled = function(acksNacksEnabled) {
		this.acksNacksEnabled = acksNacksEnabled;
		return this;
	}

	this.setTimeoutsEnabled = function(timeoutsEnabled) {
		// NOTE: This will create a neverending supply of packets if acks aren't enabled
		this.timeoutsEnabled = timeoutsEnabled;
		return this;
	}

	this.setCanAttackAcksNacks = function(canAttackAcksNacks) {
		// This will create a strange message on the start level screen if acks
		// & nacks aren't enabled
		if (canAttackAcksNacks) {
			this.setAcksNacksEnabled(true);
		}
		this.canAttackAcksNacks = canAttackAcksNacks;
		return this;
	}
}

module.exports = {
    Level
};

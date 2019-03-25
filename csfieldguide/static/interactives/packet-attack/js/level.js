function Level(levelNumber){

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
	this.stuns = 1;
	this.zaps = 1;
	this.confuses = 1;

	this.levelNumber = levelNumber;

	// Setters - Additional checks can be added. 
	this.setMsg = function(text){
		this.message = text;
		return this; //Setters return this, so the settings can be chained.
	}

	this.setStuns = function(stuns){
		this.stuns = stuns;
		return this;
	}

	this.setZaps = function(zaps){
		this.zaps = zaps;
		return this;
	}

	this.setConfuses = function(confuses){
		this.confuses = confuses;
		return this;
	}

	this.setPacketsHaveShields = function(packetsHaveShields){
		this.packetsHaveShields = packetsHaveShields;
		return this;
	}

	this.setPacketsHaveNumbers = function(packetsHaveNumbers){
		this.packetsHaveNumbers = packetsHaveNumbers;
		return this;
	}

	this.setAcksNacksEnabled = function(acksNacksEnabled){
		this.acksNacksEnabled = acksNacksEnabled;
		return this;
	}

	this.setTimeoutsEnabled = function(timeoutsEnabled){
		this.timeoutsEnabled = timeoutsEnabled;
		return this;
	}

	this.setCanAttackAcksNacks = function(canAttackAcksNacks){
		this.canAttackAcksNacks = canAttackAcksNacks;
		return this;
	}
}

module.exports = {
    Level
};

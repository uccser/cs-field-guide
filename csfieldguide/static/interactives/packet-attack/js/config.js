var LEVEL = require('./level.js');

var SENDTEXT = gettext("HELLO");
const TIMEOUT = 20000;

// Level configs
var LEVELS = [
    new LEVEL.Level(0), // A level of default values, used only in URL mode
    new LEVEL.Level(1)
                    .setMsg(SENDTEXT[0]),
    new LEVEL.Level(2)
                    .setMsg(SENDTEXT), // Multiple Packets
    new LEVEL.Level(3)
                    .setMsg(SENDTEXT)
                    .setPacketsHaveShields(true) // Confuse wont work since shields are enabled
                    .setKills(0),
    new LEVEL.Level(4)
                    .setMsg(SENDTEXT)
                    .setPacketsHaveNumbers(true) // Delay wont work since packets are ordered
                    .setKills(0),
    new LEVEL.Level(5)
                    .setMsg(SENDTEXT)
                    .setPacketsHaveNumbers(true)
                    .setPacketsHaveShields(true),
    new LEVEL.Level(6)
                    .setMsg(SENDTEXT)
                    .setPacketsHaveNumbers(true)
                    .setAcksNacksEnabled(true)
                    //.setPacketsHaveShields(true)
                    .setCorrupts(2),
    new LEVEL.Level(7)
                    .setMsg(SENDTEXT)
                    .setPacketsHaveNumbers(true)
                    .setAcksNacksEnabled(true)
                    .setPacketsHaveShields(true)
                    .setTimeoutsEnabled(true)
                    .setCorrupts(2)
                    .setDelays(2)
                    .setKills(2)
]

var FINAL_LEVEL = LEVELS.length - 1;

/**
 * 
 * @param {0} level should always be zero
 */
function setCustomLevel(level, config) {
    if (config.setMessage) {
        LEVELS[level].setMsg(config.setMessage);
    }

    LEVELS[level].setPacketsHaveShields(config.setPacketsHaveShields);
    LEVELS[level].setPacketsHaveNumbers(config.setPacketsHaveNumbers);
    LEVELS[level].setAcksNacksEnabled(config.setAcksNacksEnabled);
    LEVELS[level].setTimeoutsEnabled(config.setTimeoutsEnabled);

    if (config.setDelays) {
        LEVELS[level].setDelays(config.setDelays);
    }
    if (config.setCorrupts) {
        LEVELS[level].setCorrupts(config.setCorrupts);
    }
    if (config.setKills) {
        LEVELS[level].setKills(config.setKills);
    }
}

module.exports = {
    LEVELS,
    setCustomLevel,
    FINAL_LEVEL,
    TIMEOUT
};

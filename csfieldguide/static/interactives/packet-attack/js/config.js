var LEVEL = require('./level.js');

var SENDTEXT = gettext("HELLOTHERE");

// Level configs
var LEVELS = [
    new LEVEL.Level(0), // A level of default values, used only in the level creator
    new LEVEL.Level(1)
                    .setMsg(SENDTEXT[0]),
    new LEVEL.Level(2)
                    .setMsg(SENDTEXT), // Multiple Packets
    new LEVEL.Level(3)
                    .setMsg(SENDTEXT)
                    .setPacketsHaveShields(true), // Kill/Zap wont work since sheilds are enabled
    new LEVEL.Level(4)
                    .setMsg(SENDTEXT)
                    .setPacketsHaveNumbers(true), // Delay/Stun wont work since packets are ordered
    new LEVEL.Level(5)
                    .setMsg(SENDTEXT)
                    .setPacketsHaveNumbers(true)
                    .setPacketsHaveShields(true),
    new LEVEL.Level(6)
                    .setMsg(SENDTEXT)
                    .setPacketsHaveNumbers(true)
                    .setAcksNacksEnabled(true)
                    //.setPacketsHaveShields(true)
                    .setConfuses(2),
    new LEVEL.Level(7)
                    .setMsg(SENDTEXT)
                    .setPacketsHaveNumbers(true)
                    .setAcksNacksEnabled(true)
                    .setPacketsHaveShields(true)
                    .setConfuses(2)
                    .setTimeoutsEnabled(true)
                    .setStuns(2)
                    .setZaps(2)
]

module.exports = {
    LEVELS
};

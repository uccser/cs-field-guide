/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
"use strict";
const SHA256 = require('crypto-js/sha256');
const Hex = require('crypto-js/enc-hex');

$("#interactive-sha2-button").click(function() {
    // Hopefully the logic is self-explanatory
    const text = $("#interactive-sha2-plaintext").val();
    // Base64 is entirely renderable characters (unlike ASCII or UNICODE))
    const hash = SHA256(text).toString(Hex);
    return $("#interactive-sha2-hash").html(hash);
});

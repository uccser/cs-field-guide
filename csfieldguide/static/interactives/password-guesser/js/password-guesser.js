const SHA256 = require('crypto-js/sha256');
const Hex = require('crypto-js/enc-hex');

$(document).ready(function() {
  $('#pg-submit-button').click(function() {
    checkGuess();
  });
});

/**
 * Concatenates the guessed password with the given salt, hashes the result,
 * and checks it against hashed passwords on the table.
 * 
 * The salt is interpreted as a string (despite being hex) but that does not affect
 * anything negatively
 */
function checkGuess() {
  var guess = $('#pg-password-guess').val().replace(/\s/g, '');
  var salt = $('#pg-password-salt').val().replace(/\s/g, '');
  var hash = SHA256(guess + salt).toString(Hex).toUpperCase();
  $('#pg-calculated-hash').html(hash);
}

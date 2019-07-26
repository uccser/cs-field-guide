const SHA256 = require('crypto-js/sha256');
const Hex = require('crypto-js/enc-hex');

var hashTable = {
  '#row_A': '',
  '#row_B': '',
  '#row_C': '',
  '#row_D': '',
  '#row_E': '',
  '#row_F': ''
}

$(document).ready(function() {
  for (var row in hashTable) {
    hashTable[row] = $(row).children('.hash').html().replace(/\s/g, '');
  }

  $('#pg-submit-button').click(function() {
    checkGuess();
  });

  $('.pg-img').click(function() {
    var salt = $(this).parent().html().trim().substring(0, 16); // Get the 16 character salt
    $('#pg-password-salt').val(salt);
  })
});

/**
 * Concatenates the guessed password with the given salt, hashes the result,
 * and checks it against hashed passwords on the table.
 * 
 * The salt is interpreted as a string (despite being hex) but that does not affect
 * anything negatively
 */
function checkGuess() {
  unhighlight('#pg-calculated-hash');

  var guess = $('#pg-password-guess').val().replace(/\s/g, '');
  var salt = $('#pg-password-salt').val().replace(/\s/g, '');
  var hash = SHA256(guess + salt).toString(Hex).toUpperCase();
  $('#pg-calculated-hash').html(hash);

  for (var row in hashTable) {
    if (hashTable[row] == hash) {
      highlight('#pg-calculated-hash');
      highlight(row);
    } else {
      unhighlight (row);
    }
  }
}

function highlight(row) {
  $(row).addClass('highlight');
}

function unhighlight(row) {
  $(row).removeClass('highlight');
}

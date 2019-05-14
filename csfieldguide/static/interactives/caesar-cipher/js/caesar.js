/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
"use strict";
require('es5-shim');
require('es6-shim');

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//# ------ Caesar Cipher --------------

const shift = function(character, rotation) {
    if (rotation == null) { rotation = 3; }
    /* This shifts a character by rotation characters using the standard
        caesar cipher
    */
    const index = ALPHABET.indexOf(character);
    const new_index = __mod__((index + rotation), ALPHABET.length);
    return ALPHABET[__mod__((index + rotation), ALPHABET.length)];
};

const encrypt = function(text, rotation) {
    if (rotation == null) { rotation = 3; }
    /* Encrypts a piece of text using the Caesar Cipher */
    let result = '';
    for (let char of Array.from(text)) {
        if (Array.from(ALPHABET).includes(char)) {
            result += shift(char, rotation);
        } else {
            result += char;
        }
    }
    return result;
};

const decrypt = function(text, rotation) {
    if (rotation == null) { rotation = 3; }
    /* Decrypts a piece of text using the Caesar Cipher that was encrypted
        using a given rotation
    */
    return encrypt(text, -rotation);
};

//# -------------- Normal jQuery interactivity stuff ---------------


const $keyInput = $("#interactive-caesar-key-input");
const $encryptButton = $("#interactive-caesar-encrypt");
const $decryptButton = $("#interactive-caesar-decrypt");
const $plaintext = $("#interactive-caesar-plaintext");
const $ciphertext = $("#interactive-caesar-ciphertext");

$plaintext.on('input', () =>
    /* Ensure plaintext is always uppercase */
    $plaintext.val($plaintext.val().toUpperCase())
);

$ciphertext.on('input', () =>
    /* Ensure ciphertext is always uppercase */
    $ciphertext.val($ciphertext.val().toUpperCase())
);

$keyInput.on('input', () =>
    /* Filter all non non-numeric keys */
    $keyInput.val($keyInput.val().replace(/[^0-9]/g, ''))
);

$encryptButton.on('click', function() {
    const key = Number($keyInput.val());
    return $ciphertext.val(encrypt($plaintext.val(), key));
});

$decryptButton.on('click', function() {
    const key = Number($keyInput.val());
    return $plaintext.val(decrypt($ciphertext.val(), key));
});

function __mod__(a, b) {
  a = +a;
  b = +b;
  return (a % b + b) % b;
}

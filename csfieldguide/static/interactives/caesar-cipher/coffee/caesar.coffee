"use strict"
require('es5-shim')
require('es6-shim')
require('jquery-text-input')

ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

## ------ Caesar Cipher --------------

shift = (character, rotation=3) ->
    ### This shifts a character by rotation characters using the standard
        caesar cipher
    ###
    index = ALPHABET.indexOf(character)
    new_index = (index + rotation) %% ALPHABET.length
    return ALPHABET[(index + rotation) %% ALPHABET.length]

encrypt = (text, rotation=3) ->
    ### Encrypts a piece of text using the Caesar Cipher ###
    result = ''
    for char in text
        if char in ALPHABET
            result += shift(char, rotation)
        else
            result += char
    return result

decrypt = (text, rotation=3) ->
    ### Decrypts a piece of text using the Caesar Cipher that was encrypted
        using a given rotation
    ###
    return encrypt(text, -rotation)

## -------------- Normal jQuery interactivity stuff ---------------


$keyInput = $("#interactive-caesar-key-input")
$encryptButton = $("#interactive-caesar-encrypt")
$decryptButton = $("#interactive-caesar-decrypt")
$plaintext = $("#interactive-caesar-plaintext")
$ciphertext = $("#interactive-caesar-ciphertext")

$plaintext.on 'textInput', ->
    ### Ensure plaintext is always uppercase ###
    $plaintext.val $plaintext.val().toUpperCase()

$ciphertext.on 'textInput', ->
    ### Ensure ciphertext is always uppercase ###
    $ciphertext.val $ciphertext.val().toUpperCase()

$keyInput.on 'textInput', ->
    ### Filter all non non-numeric keys ###
    $keyInput.val $keyInput.val.replace(/[^0-9]/g, '')

$encryptButton.on 'click', ->
    key = Number $keyInput.val()
    $ciphertext.val encrypt($plaintext.val(), key)

$decryptButton.on 'click', ->
    key = Number $keyInput.val()
    $plaintext.val decrypt($ciphertext.val(), key)

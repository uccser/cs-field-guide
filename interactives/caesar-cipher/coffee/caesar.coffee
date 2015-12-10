"use strict"
require('es5-shim')
require('es6-shim')
Observable = require('zen-observable')

ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
keyCodes =
    BACKSPACE: 8,
    COMMA: 188,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    NUMPAD_ADD: 107,
    NUMPAD_DECIMAL: 110,
    NUMPAD_DIVIDE: 111,
    NUMPAD_ENTER: 108,
    NUMPAD_MULTIPLY: 106,
    NUMPAD_SUBTRACT: 109,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38

eventStream = (selector="document", events="click", holdoff=false) ->
    ### Returns an Observable which can be subscribed to for the given events
        on a given element, if holdoff is true then wait until previous event
        is processed before waiting for next one
    ###
    return new Observable (subscriber) ->
        if holdoff
            handler = (event) ->
                subscriber.next?(event)
                $(selector).one events, handler
            $(selector).one events, handler
        else
            handler = (event) ->
                subscriber.next(event)
            $(selector).on events, handler
        return ->
            $selector.off('event')

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


eventStream("#interactive-caesar-encrypt").subscribe
    next: ->
        key = Number $('#interactive-caesar-key-input').val()
        original = $("#interactive-caesar-plaintext").val().toUpperCase()
        $('#interactive-caesar-plaintext').val(original)
        $('#interactive-caesar-ciphertext').val encrypt(original, key)

eventStream("#interactive-caesar-decrypt").subscribe
    next: ->
        key = Number $("#interactive-caesar-key-input").val()
        original = $("#interactive-caesar-ciphertext").val().toUpperCase()
        $('#interactive-caesar-ciphertext').val(original)
        $('#interactive-caesar-plaintext').val decrypt(original, key)

### This endlessly gets button presses and either encrypts or decrypts
        depending on which button was pressed
    ###
###
    while true
        yield singleEvent(
            '#interactive-caesar-encrypt, #interactive-caesar-decrypt',
            'click'
        )
        key = Number($('#interactive-caesar-key-input').val())
        if $(event.target).attr('id') is "interactive-caesar-encrypt"
            original = $('#interactive-caesar-plaintext').val().toUpperCase()
            $('#interactive-caesar-plaintext').val(original)
            $('#interactive-caesar-ciphertext').val(encrypt(original, key))
        else
            original = $('#interactive-caesar-ciphertext').val().toUpperCase()
            $('#interactive-caesar-ciphertext').val(original)
            $('#interactive-caesar-plaintext').val(decrypt(original, key))
###

"use strict"
require('es6-shim')
textEncoding = require('text-encoding')
window.TextEncoder ?= textEncoding.TextEncoder # This is a TextEncoder shim

$button = $("#interactive-unicode-length-button")
$text = $("#interactive-unicode-length-text")

$utf8 = $("#interactive-unicode-length-utf8")
$utf16 = $("#interactive-unicode-length-utf16")
$utf32 = $("#interactive-unicode-length-utf32")

bitLength = (text, encoding='utf-8') ->
    ### Returns the bit length of some string given some encoding ###
    encoder = new TextEncoder encoding, {
        NONSTANDARD_allowLegacyEncoding: true
    }
    return encoder.encode(text).length * 8

$button.on 'click', ->
    $utf8.val bitLength($text.val(), 'utf-8')
    $utf16.val bitLength($text.val(), 'utf-16le')
    # TextEncoder doesn't support UTF-32 so just calculate it
    $utf32.val Array.from($text.val()).length * 32

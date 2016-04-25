"use strict"
require('string.fromcodepoint')

$decimal = $("#interactive-unicode-chars-decimal")
$char = $("#interactive-unicode-chars-char")

$decimal.keypress (event) ->
    unless /\d/.exec(String.fromCodePoint(event.keyCode))?
        event.preventDefault()

$decimal.keyup ->
    $char.val String.fromCodePoint(Number($decimal.val()))


$char.keypress (event) ->
    unless Array.from($char.val()).length is 0
        event.preventDefault()

$char.keyup ->
    $decimal.val $char.val().codePointAt(0)

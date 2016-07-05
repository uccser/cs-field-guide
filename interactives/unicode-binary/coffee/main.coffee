"use strict"
require('string.fromcodepoint')
require('jquery-text-input')
s = require('underscore.string')
URI = require('urijs')

validModes = ['utf8', 'utf16', 'utf32']

query = URI.parse(decodeURIComponent(window.location.href)).query
MODE = (URI.parseQuery(query).mode ? 'utf8').toLowerCase()

if MODE not in validModes
    # Ensure the mode is an actualy encoding
    alert 'Mode must be in #{validModes}'

byteify = (binaryString) ->
    ### Splits a binary string up into bytes seperated by spaces ###
    bytes = (binaryString[i*8...(i+1)*8] for i in [0...binaryString.length//8])
    return bytes.join(' ')

toUTF8 = (number) ->
    ### Converts a code point into a utf8 binary string ###
    number = number.toString('2')
    bitLength = number.length
    if bitLength < 8
        # If its 7 bits or less then utf8 is equivalent to 7-bit ASCII
        return s(number).lpad(8, '0').value()
    else
        # Make of the form
        # 110xxxxx 10xxxxxx for 11 bits
        # 1110xxxx 10xxxxxx 10xxxxxx for 16 bits
        # etc
        oneBits = Math.ceil( (bitLength-1)/5 )
        padded = s(number).lpad(oneBits*5+1, '0').value()
        firstSegmentLength = 8-oneBits-1 # How many bits of the
                                         # code point are in the first
                                         # byte of the string
        result = '1'.repeat(oneBits) + '0' + padded[0...firstSegmentLength]
        for sixBits in padded[firstSegmentLength...].match(/.{1,6}/g)
            result += '10' + sixBits
        return result

toUTF16 = (number) ->
    ### Converts a number to a utf16 binary string ###
    if 0x0 <= number <= 0xD7FF or 0xE000 <= number <= 0xFFFF
        # In these code point ranges we simply encode directly to 16 bits
        return s.lpad(number.toString('2'), 16, '0')
    else if 0x10000 <= number
        # Else use the algorithm for converting to 32 bit surrogate pairs
        shifted = number - 0x10000
        bits = s.lpad(shifted.toString('2'), 20, '0')
        left = (parseInt(bits[0...10], 2) + 0xD800).toString('2')
        right = (parseInt(bits[10...20], 2) + 0xDC00).toString('2')
        return left + right

toUTF32 = (number) ->
    ### Converts a number into a UTF32 bit string ###
    return s.lpad(number.toString('2'), 32, '0')

### -------------- jQuery Event Code ---------------- ###

$decimal = $("#interactive-unicode-binary-decimal")
$char = $("#interactive-unicode-binary-char")
$binary = $('#interactive-unicode-binary-binary')

updateBinary = (number) ->
    ### Updates the binary element with changes ###
    $binary.val byteify switch MODE
        when 'utf8' then toUTF8(number)
        when 'utf16' then toUTF16(number)
        when 'utf32' then toUTF32(number)


cleanDecimal = ->
    ### Cleans any non-numeric values out of the decimal element ###
    $decimal.val $decimal.val().replace(/[^0-9]/g, '')

$decimal.on 'textInput', ->
    ### Anytime there's input or any change in the box just remove all non
        numeric characters
    ###
    if $decimal.val() is ''
        $char.val('')
        $binary.val('')
        return

    $decimal.val $decimal.val().replace(/[^0-9]/g, '')

    number = Number $decimal.val()
    if 0xD800 <= number <= 0xDFFF
        $char.val("Characters in the range 55296 to 57343 are reserved for UTF16 encoding")
        $binary.val('')
        return
    try
        char = String.fromCodePoint(number)
    catch err
        $char.val("Decimal value of range")
        $binary.val('')
        return

    $char.val(String.fromCodePoint(number))
    updateBinary(number)

$char.on 'textInput', ->
    ### Considers only the last codepoint entered ###
    if $char.val() is ''
        $decimal.val('')
        $binary.val('')
        return

    chars = Array.from($char.val())
    $char.val chars[chars.length-1]
    $decimal.val $char.val().codePointAt(0)
    updateBinary(Number $decimal.val())

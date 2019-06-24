"use strict";
let left;
require('string.fromcodepoint');
const s = require('underscore.string');
const URI = require('urijs');

const validModes = ['utf8', 'utf16', 'utf32'];

const { query } = URI.parse(decodeURIComponent(window.location.href));
const MODE = ((left = URI.parseQuery(query).mode) != null ? left : 'utf8').toLowerCase();

if (!Array.from(validModes).includes(MODE)) {
    // Ensure the mode is an actualy encoding
    alert('Mode must be in #{validModes}');
} else if (MODE !== 'utf8') {
  $("#interactive-unicode-binary-mode").text(MODE.substr(-2));
}

const byteify = function(binaryString) {
    /* Splits a binary string up into bytes seperated by spaces */
    const bytes = (__range__(0, Math.floor(binaryString.length/8), false).map((i) => binaryString.slice(i*8, (i+1)*8)));
    return bytes.join(' ');
};

const toUTF8 = function(number) {
    /* Converts a code point into a utf8 binary string */
    number = number.toString('2');
    const bitLength = number.length;
    if (bitLength < 8) {
        // If its 7 bits or less then utf8 is equivalent to 7-bit ASCII
        return s(number).lpad(8, '0').value();
    } else {
        // Make of the form
        // 110xxxxx 10xxxxxx for 11 bits
        // 1110xxxx 10xxxxxx 10xxxxxx for 16 bits
        // etc
        const oneBits = Math.ceil( (bitLength-1)/5 );
        const padded = s(number).lpad((oneBits*5)+1, '0').value();
        const firstSegmentLength = 8-oneBits-1; // How many bits of the
                                         // code point are in the first
                                         // byte of the string
        let result = '1'.repeat(oneBits) + '0' + padded.slice(0, firstSegmentLength);
        for (let sixBits of Array.from(padded.slice(firstSegmentLength).match(/.{1,6}/g))) {
            result += `10${sixBits}`;
        }
        return result;
    }
};

const toUTF16 = function(number) {
    /* Converts a number to a utf16 binary string */
    if ((0x0 <= number && number <= 0xD7FF) || (0xE000 <= number && number <= 0xFFFF)) {
        // In these code point ranges we simply encode directly to 16 bits
        return s.lpad(number.toString('2'), 16, '0');
    } else if (0x10000 <= number) {
        // Else use the algorithm for converting to 32 bit surrogate pairs
        const shifted = number - 0x10000;
        const bits = s.lpad(shifted.toString('2'), 20, '0');
        left = (parseInt(bits.slice(0, 10), 2) + 0xD800).toString('2');
        const right = (parseInt(bits.slice(10, 20), 2) + 0xDC00).toString('2');
        return left + right;
    }
};

const toUTF32 = number =>
    /* Converts a number into a UTF32 bit string */
    s.lpad(number.toString('2'), 32, '0')
;

/* -------------- jQuery Event Code ---------------- */

const $decimal = $("#interactive-unicode-binary-decimal");
const $char = $("#interactive-unicode-binary-char");
const $binary = $('#interactive-unicode-binary-binary');

const updateBinary = number =>
    /* Updates the binary element with changes */
    $binary.val(byteify((() => { switch (MODE) {
        case 'utf8': return toUTF8(number);
        case 'utf16': return toUTF16(number);
        case 'utf32': return toUTF32(number);

    } })())
    )
;

const cleanDecimal = () =>
    /* Cleans any non-numeric values out of the decimal element */
    $decimal.val($decimal.val().replace(/[^0-9]/g, ''))
;

$decimal.on('input', function() {
    /* Anytime there's input or any change in the box just remove all non
        numeric characters
    */
    if ($decimal.val() === '') {
        $char.val('');
        $binary.val('');
        return;
    }

    $decimal.val($decimal.val().replace(/[^0-9]/g, ''));

    const number = Number($decimal.val());
    if (0xD800 <= number && number <= 0xDFFF) {
        $char.val("Characters in the range 55296 to 57343 are reserved for UTF16 encoding");
        $binary.val('');
        return;
    }
    try {
        const char = String.fromCodePoint(number);
    } catch (err) {
        $char.val("Decimal value out of range");
        $binary.val('');
        return;
    }

    $char.val(String.fromCodePoint(number));
    return updateBinary(number);
});

$char.on('input', function() {
    /* Considers only the last codepoint entered */
    if ($char.val() === '') {
        $decimal.val('');
        $binary.val('');
        return;
    }

    const chars = Array.from($char.val());
    $char.val(chars[chars.length-1]);
    $decimal.val($char.val().codePointAt(0));
    return updateBinary(Number($decimal.val()));
});

function __range__(left, right, inclusive) {
  let range = [];
  let ascending = left < right;
  let end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}

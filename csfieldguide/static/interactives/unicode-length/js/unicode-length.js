$(document).ready(function () {
  $("#interactive-unicode-length-button").on('click', function() {
    var text = $("#interactive-unicode-length-text").val();
    numUTF8BitsUsed = utf8BitsUsed(text);
    numUTF16BitsUsed = utf16BitsUsed(text);
    $("#interactive-unicode-length-utf8").html(getUnicodeLengthText(numUTF8BitsUsed));
    $("#interactive-unicode-length-utf16").html(getUnicodeLengthText(numUTF16BitsUsed));
    $("#interactive-unicode-length-utf32").html(getUnicodeLengthText(text.length * 32));
  });
});

function getUnicodeLengthText(numBitsUsed) {
    format = gettext("%(num_bits_used)s bits");
    unicode_length_text = interpolate(format, {"num_bits_used": numBitsUsed}, true);
    return unicode_length_text;
}

function utf16BitsUsed(str) {
    var total_bits = 0;
    for (var i = 0; i < str.length; i++) {
        char = str[i];
        var code = char.charCodeAt(0);
        if (code >= 0x00 && code <= 0xD7FF) {
            total_bits += 16;
        } else if (code >= 0xD800 && code <= 0xDBFF) {
            // High surrogate
            total_bits += 16;
            // The next code unit must be the low surrogate
            i++;
            code = str.charCodeAt(i);
            if (code >= 0xDC00 && code <= 0xDFFF) {
                // Low surrogate
                total_bits += 16;
            }
        }
    }
    return total_bits;
}

function utf8BitsUsed(str) {
    var total_bits = 0;
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        if (code <= 0x7F) {
          total_bits += 8;
        } else if (code <= 0x7FF) {
          total_bits += 16;
        } else if (code >= 0xD800 && code <= 0xDBFF) {
            // High surrogate
            total_bits += 16;
            // The next code point must be the low surrogate
            i++;
            code = str.charCodeAt(i);
            if (code >= 0xDC00 && code <= 0xDFFF) {
                // Low surrogate
                total_bits += 16;
            }
        } else if (code < 0xFFFF) {
          total_bits += 24;
        } else {
          total_bits += 32;
        }
    }
    return total_bits;
}

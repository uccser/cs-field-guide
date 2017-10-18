function bitLength(text, utf_encoding) {
  // Returns the bit length of an string for the given UTF encoding
  var bits = 0;
  for (var i=text.length-1; i>=0; i--) {
    var character_code = text.charCodeAt(i);

    if (utf_encoding == 8 && character_code >= 0x0000 && character_code <= 0x007F) {
      bits += 8;
    } else if (utf_encoding == 8 && character_code >= 0x0080 && character_code <= 0x07FF) {
      bits += 16;
    } else if (utf_encoding == 8 && character_code >= 0x0800 && character_code <= 0xFFFF) {
      bits += 24;
    } else if (utf_encoding == 16 && character_code >= 0x0000 && character_code <= 0xFFFF) {
      bits += 16;
    } else {
      bits += 32;
    }

    // Trail surrogate: https://github.com/jagracey/Awesome-Unicode#utf-16-surrogate-pairs
    if (character_code >= 0xDC00 && character_code <= 0xDFFF) {
      i--;
    }
  }
  return bits;
}

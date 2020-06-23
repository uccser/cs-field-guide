/**
 * A fake lzss encoding algorithm. Not as efficient as the real thing, but gives the same result
 */

var slidingWindow;
var stringToMatch;
var numCharacters = 1;
// set the min and max match length
const MIN_LENGTH = 2;
var MAX_LENGTH = 16;

var encodedMessage = [];

function compressText(message) {
  message = message.split('');

  for (var i = 0; i < message.length; i++) {
    message[i] = message[i].replace(/[\r\n]+/g, null);
    message[i] = message[i].replace(/[\s]+/g, "\u2423");
  }

  // initialise sliding window and initial encoded message
  slidingWindow = message.slice(0, MIN_LENGTH);
  encodedMessage = message.slice(0, MIN_LENGTH);

  message.splice(0, MIN_LENGTH);

  // read in string to length of max match
  stringToMatch = message.splice(0, MAX_LENGTH);
  while (stringToMatch.length > 0) {

    // STEP 3 search for longest matching string in sliding window
    var matchOffset;
    var longestMatchOffset;
    var longestMatchLength = 0;
    var currentMatchLength = 0;

    for (var i = 0; i < slidingWindow.length; i++) {
      // get next character in sliding window
      windowCharacter = slidingWindow[i];

      if (stringToMatch[0] == null) { // meaning is newline character
        // add newline character to sliding window and remove from message. TODO: Consider encoding as a normal character
        var newlineCharacter = stringToMatch.slice(0, 1);
        slidingWindow.push(newlineCharacter);
        stringToMatch.splice(0, 1);
        // put next character on string to match
        stringToMatch.push(message.splice(0, 1)[0]);
        // add newline to output
        encodedMessage.push(newlineCharacter);
      }

      if (windowCharacter == stringToMatch[0]) {
        // record the current position as the start of the match in the sw
        matchOffset = i;
        currentMatchLength = 1;
        var nextWindowCharacterIndex = i;

        for (var j = 1; j < stringToMatch.length; j++) {
          // work out what the next characters are    
          nextWindowCharacterIndex = nextWindowCharacterIndex + 1;
          var nextWindowCharacter = slidingWindow[nextWindowCharacterIndex];
          var nextSearchCharacter = stringToMatch[j];

          if (nextSearchCharacter == 'null') {
            break
          }

          // if the next characters match, increase the length of the match
          if (nextWindowCharacter == nextSearchCharacter) {
            currentMatchLength += 1;
          } else {
            break;
          }
        }

        // work out if best match so far
        if (currentMatchLength > longestMatchLength) {
          longestMatchLength = currentMatchLength;
          longestMatchOffset = matchOffset;
        }
      }
    }

    // STEP 4 write result to output
    if (longestMatchLength >= MIN_LENGTH) {
      numCharacters = longestMatchLength;
      var matchedCharacters = stringToMatch.splice(0, longestMatchLength);
      for (var k = 0; k < matchedCharacters.length; k++) {
        slidingWindow.push(matchedCharacters[k]);
      }
      encodedMessage.push([longestMatchOffset, longestMatchLength]);
    } else {
      numCharacters = 1;
      var unencodedSymbol = stringToMatch.splice(0, 1)[0];
      encodedMessage.push(unencodedSymbol);
      slidingWindow.push(unencodedSymbol);
    }

    // prepare the next string to check
    var charactersToAdd = message.splice(0, numCharacters);
    if (charactersToAdd.length > 0) {
      for (var l = 0; l < numCharacters; l++) {
        var nextCharacterToAdd = charactersToAdd[l];
        if (nextCharacterToAdd != undefined) {
          stringToMatch.push(nextCharacterToAdd);
        }
      }
    }
  }
  console.log(slidingWindow);
  console.log(encodedMessage);
  return encodedMessage;
}

module.exports = {
  compressText,
}

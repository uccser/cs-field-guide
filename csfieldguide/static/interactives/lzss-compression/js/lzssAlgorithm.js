/**
 * A fake lzss encoding algorithm. Not as efficient as the real thing, but gives the same result
 */

var slidingWindow = 0;
var stringToMatch = [];
var numCharacters = 1;
// set the min and max match length
const MIN_LENGTH = 2;
var MAX_LENGTH = 16;

var encodedMessage = [];

const newlineCharacter = ':n'; // This is fine because it's the only element in the split message array that can possibly be more than 1 character

function compressText(message) {
  message = message.split('');

  for (var i = 0; i < message.length; i++) {
    message[i] = message[i].replace(/[\r\n]+/g, newlineCharacter);
    message[i] = message[i].replace(/[\s]+/g, "\u2423");
  }

  // initialise sliding window and initial encoded message
  // simplify the sliding window to just 'everything until an index' for simplicity
  // as this interactive won't be used with masses of text
  slidingWindow = MIN_LENGTH;
  encodedMessage = message.slice(0, MIN_LENGTH);

  // read in string to length of max match
  stringToMatch = message.slice(slidingWindow, slidingWindow + MAX_LENGTH);
  while (stringToMatch.length > 0) {

    // search for longest matching string that starts within the sliding window
    var matchOffset;
    var longestMatchOffset;
    var longestMatchLength = 0;
    var currentMatchLength = 0;

    for (var i = 0; i < slidingWindow; i++) {
      // get next character in sliding window
      windowCharacter = message[i];

      if (stringToMatch[0] == newlineCharacter) {
        // add newline character to sliding window and remove from message.
        // TODO: Consider encoding as a normal character - though Wikipedia seems to imply what's implemented is accurate
        slidingWindow++;
        stringToMatch.splice(0, 1);
        // put next character on string to match
        stringToMatch.push(message[slidingWindow + MAX_LENGTH]);
        // add newline to output
        encodedMessage.push(newlineCharacter);
      }

      if (windowCharacter == stringToMatch[0]) {
        // record the current position as the start of the match in the sw
        matchOffset = i;
        currentMatchLength = 1;
        var nextMessageCharacterIndex = i;

        for (var j = 1; j < stringToMatch.length; j++) {
          // work out what the next characters are    
          nextMessageCharacterIndex++;
          var nextMessageCharacter = message[nextMessageCharacterIndex];
          var nextSearchCharacter = stringToMatch[j];

          if (nextSearchCharacter == newlineCharacter) {
            break
          }

          // if the next characters match, increase the length of the match
          if (nextMessageCharacter == nextSearchCharacter) {
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

    // write result to output
    if (longestMatchLength >= MIN_LENGTH) {
      numCharacters = longestMatchLength;
      encodedMessage.push([longestMatchOffset, longestMatchLength]);
      stringToMatch.splice(0, longestMatchLength);
      slidingWindow += longestMatchLength;
    } else {
      numCharacters = 1;
      encodedMessage.push(stringToMatch[0]);
      stringToMatch.splice(0, 1);
      slidingWindow++;
    }

    // prepare the next string to check
    stringToMatch = message.slice(slidingWindow, slidingWindow + MAX_LENGTH);
  }
  return encodedMessage;
}

module.exports = {
  compressText,
}

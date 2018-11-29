var sliding_window;
var string_to_match;
var num_characters = 1;
// set the min and max match length
var min_match_length = 2;
var max_match_length = 5;
var encoded_message = []; // TODO doesn't need to be global


function compress() {
    var message = document.getElementById('message-to-decode').value;
    compressText(message);
    drawEncodedMessage(encoded_message);
}

function drawEncodedMessage(encoded_message) {
    var compressed_text_div = document.getElementById('interactive-lzss-compressed-text');

    // create a child div for first line
    var lineDiv = document.createElement('div');
    lineDiv.classList.add('interactive-lzss-encoded-line');

    for (var i = 0; i < encoded_message.length; i++) {
        var string = encoded_message[i];
        
        if (string.length == 1) { // i.e. just a single character
            if (string == 'null') {
                compressed_text_div.append(lineDiv);
                
                // TODO this is repeated code
                var lineDiv = document.createElement('div');
                lineDiv.classList.add('interactive-lzss-encoded-line');
                continue;
            }
            // add child div for character to line
            var characterDiv = document.createElement('div');
            characterDiv.classList.add('interactive-lzss-encoded-character');
            characterDiv.innerHTML = encoded_message[i];
            lineDiv.append(characterDiv);

        } else { // a reference
            // console.log('pass');
            var characterDiv = document.createElement('div');
            characterDiv.classList.add('interactive-lzss-encoded-character');
            characterDiv.innerHTML = '(' + string + ')';
            lineDiv.append(characterDiv);
        }
    }
    compressed_text_div.append(lineDiv);
}

function compressText(message) {
    // message = message.replace(/[\r\n]+/g, '');
    message = message.split('');

    for (var i = 0; i < message.length; i++) {
        message[i] = message[i].replace(/[\r\n]+/g, null);
    }

    // initialise sliding window and initial encoded message
    sliding_window = message.slice(0, 6);
    encoded_message = message.slice(0, 6);

    message.splice(0, 6);

    // read in string to length of max match
    string_to_match = message.splice(0, max_match_length);

    while (true) {
        if (string_to_match.length > 0) {

            // STEP 3 search for longest matching string in sliding window
            var match_offset;
            var longest_match_offset;
            var longest_match_length = 0;
            var current_length_of_match = 0;

            for (var i = 0; i < sliding_window.length; i++) {
                // get next character in sliding window
                sw_character = sliding_window[i];

                // TODO REPEATED CODE
                if (string_to_match[0] == 'null') {
                    newline_character = string_to_match.slice(0, 1);
                    sliding_window.push(newline_character);
                    string_to_match.push(message.splice(0,1));
                    encoded_message.push(newline_character);
                    string_to_match.splice(0,1);
                }
                ///

                if (sw_character == string_to_match[0]) {
                    // record the current position as the start of the match in the sw
                    match_offset = i;
                    current_length_of_match = 1;
                    var next_sw_character_index = i;

                    for (var j = 1; j < string_to_match.length; j++) {
                        // work out what the next characters are    
                        next_sw_character_index = next_sw_character_index + 1;
                        var next_sw_character = sliding_window[next_sw_character_index];
                        var next_search_character = string_to_match[j];

                        if (string_to_match[j] == 'null') {
                            break
                        }

                        // if the next characters match, increase the length of the match
                        if (next_sw_character == next_search_character) {
                            current_length_of_match += 1;
                        } else {
                            break;
                        }
                    }

                    // work out if best match so far
                    if (current_length_of_match > longest_match_length) {
                        longest_match_length = current_length_of_match;
                        longest_match_offset = match_offset;
                    }
                }
            }

            // STEP 4 write result to output
            if (longest_match_length >= min_match_length) {
                num_characters = longest_match_length;
                var matched_characters = string_to_match.splice(0, longest_match_length);
                for (var i = 0; i < longest_match_length; i++) {
                    sliding_window.push(matched_characters[i]);
                }
                encoded_message.push([longest_match_offset, longest_match_length]);
            } else {
                num_characters = 1;
                unencoded_symbol = string_to_match.splice(0, 1)[0];
                encoded_message.push(unencoded_symbol);
                sliding_window.push(unencoded_symbol);
            }

            // prepare the next string to check
            characters_to_add = message.splice(0, num_characters);
            if (characters_to_add.length > 0) {
                for (var i = 0; i < num_characters; i++) {
                    next_character_to_add = characters_to_add[i];
                    if (next_character_to_add != undefined) {
                        string_to_match.push(characters_to_add[i]);
                    }
                }
            }

        } else {
            break;
        }
    }
}

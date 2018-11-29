var sliding_window;
var string_to_match;
var num_characters = 1;
// set the min and max match length
var min_match_length = 2;
var max_match_length = 5;
var encoded_message = [];


function compress() {
    var message = document.getElementById('message-to-decode').value;
    compressText(message);

    var compressed_text_div = document.getElementById('interactive-lzss-compressed-text');
    compressed_text_div.innerHTML = encoded_message.join('');
}

function compressText(message) {

    // var message = 'i am sam sam i am that sam-i-am that sam-i-am';
    // var message = 'i am sam sam i am';
    // var message = 'I am Sam, Sam I am. That Sam-I-am! That Sam-I-am! I do not like that Sam-I-am! Do you like green eggs and ham? I do not like them, Sam-I-am. I do not like green eggs and ham.';

    // message = message.replace(/[\r\n]+/g, '');
    message = message.split('');

    // initialise sliding window and initial encoded message
    sliding_window = message.slice(0, 6);
    encoded_message = message.slice(0, 6);

    message.splice(0, 6);

    // read in string to length of max match
    string_to_match = message.splice(0, max_match_length);

    while (true) {
        if (string_to_match.length > 0) {

            // repeat();
            // STEP 3 search for longest matching string in sliding window
            var match_offset;
            var longest_match_offset;
            var longest_match_length = 0;
            var current_length_of_match = 0;

            for (var i = 0; i < sliding_window.length; i++) {
                // get next character in sliding window
                sw_character = sliding_window[i];

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

                        // if the next characters match, increase the length of the match
                        if (next_sw_character == next_search_character) {
                            current_length_of_match += 1;
                        } else {
                            break;
                        } // TODO add check to make sure not greater than longest match length
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
                var reference = '(' + longest_match_offset + ', ' + longest_match_length + ')';
                encoded_message.push(reference);
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

    console.log(encoded_message);
}

    // for each sw_character in sliding window
        // if sw_character == first character in string
            // start_match_index = index of sw_character
            // end_match_index = index of sw_character
            // length_of_match = 1
            // for search_character in string
                // next_sw_character_index = starting_match_index + 1
                // if next_sw_character == search_character:
                    // increment end index
                    // increment length of match
                // else
                    // break
            // if length is longer than last match, record as longest match

    // STEP 4
    // if match found that is greater than or equal to the min allowable match length
        // write encoded flag, the offset and length to output
    // else:
        // write unencoded flag, and first unencoded symbol to encoded output

    // shift a copy of the symbols written to the encoded output from the unencoded string to the sw

    // read in a number of symbols from the unencoded input equal to the number of symbols written in step 4

    // repeat from step 3 until entire input has been encoded

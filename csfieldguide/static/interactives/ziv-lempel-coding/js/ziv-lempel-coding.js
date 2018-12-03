var sliding_window;
var string_to_match;
var num_characters = 1;
// set the min and max match length
var min_match_length = 2;
var max_match_length = 5;
var encoded_message = []; // TODO doesn't need to be global
var start_index;
var end_index;


function compress() {
    var message = document.getElementById('message-to-decode').value;
    compressText(message);
    drawEncodedMessage(encoded_message);
}

function newLineDiv() {
    var line_div = document.createElement('div');
    line_div.classList.add('interactive-lzss-encoded-line');
    return line_div;
}

function drawEncodedMessage(encoded_message) {
    var compressed_text_div = document.getElementById('interactive-lzss-compressed-text');

    // create new div for first line of the message
    var line_div = newLineDiv();

    var index = 0;
    for (var i = 0; i < encoded_message.length; i++) {
        var string = encoded_message[i];
        
        if (string.length == 1) { // i.e. just a single character
        
            if (string == 'null') {
                // indicates a new line charactor so appead the div to the parent
                compressed_text_div.append(line_div);
                // make a new div for the next line
                var line_div = newLineDiv();
                continue;
            }
            // add child div for character to line
            var character_div = document.createElement('div');
            character_div.classList.add('interactive-lzss-encoded-character');
            character_div.innerHTML = encoded_message[i];
            character_div.setAttribute('data-index', index);
            line_div.append(character_div);
            index += 1;
        
        } else { // a reference
        
            var num_encoded_characters = parseInt(string[1]);
            var fragment = document.createDocumentFragment();
            
            for (var j = 0; j < num_encoded_characters; j++) {
                var placeholder_input = document.createElement('input'); 
                placeholder_input.classList.add('interactive-lzss-placeholder-box');
                placeholder_input.setAttribute('data-index', index);
                placeholder_input.maxLength = 1;
                placeholder_input.addEventListener('mousemove', function(event) {
                    highlightReference(event);
                });
                placeholder_input.addEventListener('mouseleave', function(event) {
                    unhighlightReference(event);
                });
                placeholder_input.addEventListener('keyup', function(event) {
                    autoTab(event);
                });
                fragment.appendChild(placeholder_input);
                index += 1;
            }

            var reference_div = document.createElement('div');
            reference_div.classList.add('interactive-lzss-reference');

            var start_reference_index = parseInt(string[0]);
            reference_div.setAttribute('data-start-index', start_reference_index);
            reference_div.setAttribute('data-end-index', start_reference_index+num_encoded_characters);

            reference_div.appendChild(fragment);
            reference_div.addEventListener('mousemove', function(event) {
                highlightReference(event);
            });
            reference_div.addEventListener('mouseleave', function(event) {
                unhighlightReference(event);
            });
            
            line_div.append(reference_div);
        }
    }
    compressed_text_div.append(line_div);
}

function getIndexes(selected_reference) {
    /* Helper function to get start and end index data values for
     * div hovered over.
     */
    start_index = selected_reference.dataset.startIndex;
    end_index = selected_reference.dataset.endIndex;
}

function highlightReference(event) {
    var selected_reference = event.target;
    if (event.target.classList[0] == 'interactive-lzss-placeholder-box') {
        selected_reference = event.srcElement.parentElement;
    }
    getIndexes(selected_reference);
    for (var i = start_index; i < end_index; i++) {
        var character_div = document.querySelectorAll('[data-index="' + i.toString() + '"]')[0];
        character_div.classList.add('highlight');
    }
    selected_reference.classList.add('selected');
}

function unhighlightReference(event) {
    var selected_reference = event.target;
    getIndexes(selected_reference);
    for (var i = start_index; i <= end_index; i++) {
        var character_div = document.querySelectorAll('[data-index="' + i.toString() + '"]')[0];
        character_div.classList.remove('highlight');
    }
    selected_reference.classList.remove('selected');
}

function autoTab(event) {
    var placholder_element = event.srcElement;
    if (placholder_element.value.length == placholder_element.maxLength) {
        var placeholder_index = parseInt(placholder_element.dataset.index);
        var element;
        var input_elements = document.getElementsByTagName('input');
        for (var i = 0; i < input_elements.length; i++) {
            element = input_elements[i];
            var index = parseInt(element.dataset.index);
            if (index > placeholder_index) {
                break;
            }
        }
        element.focus();
    }
}

function compressText(message) {
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

                if (string_to_match[0] == 'null') {
                    newline_character = string_to_match.slice(0, 1);
                    sliding_window.push(newline_character);
                    string_to_match.push(message.splice(0,1));
                    encoded_message.push(newline_character);
                    string_to_match.splice(0,1);
                }

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

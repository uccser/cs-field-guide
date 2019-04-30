var output = [];
var codes = [];
const SHORT_MESSAGE = gettext(`Pease porridge hot, pease porridge cold,
Pease porridge in the pot, nine days old;
Some like it hot, some like it cold,
Some like it in the pot, nine days old.`);
const LONG_MESSAGE = gettext(`Twinkle, twinkle, little star,
How I wonder what you are!
Up above the world so high,
Like a diamond in the sky.
When this blazing sun is gone,
When he nothing shines upon,
Then you show your little light,
Twinkle, twinkle, through the night.
Then the traveller in the dark
Thanks you for your tiny spark;
He could not see where to go,
If you did not twinkle so.
In the dark blue sky you keep,
And often through my curtains peep,
For you never shut your eye
Till the sun is in the sky.
As your bright and tiny spark
Lights the traveller in the dark,
Though I know not what you are,
Twinkle, twinkle, little star.`);

// Set the default message
window.onload = function() {
    document.getElementById('lzw-compression-compress-button').addEventListener('click', compress, false);

    var url_string = window.location.href;
    var url = new URL(url_string);
    var message_length = url.searchParams.get('message-length');
    var message_div = document.getElementById('lzw-compression-input');
    if (message_length == 'short') {
        message_div.value = SHORT_MESSAGE;
    } else if (message_length == 'long') {
        message_div.value = LONG_MESSAGE;
    }
}

// Generate the dictionary and compressed message output
function compress() {
    output = [];
    codes = [];
    compressText();
    outputEncodedMessage();
    outputDictionary();
}

// Runs the LZW algorithm
function compressText() {
    var string_to_encode = document.getElementById('lzw-compression-input').value;

    // replace new line characters
    string_to_encode = string_to_encode.split('');
    for (var i = 0; i < string_to_encode.length; i++) {
        string_to_encode[i] = string_to_encode[i].replace(/[\r\n]+/g, null);
    }
    
    var current_sequence = '';

    // set up initial dictionary
    for (var i = 0; i < string_to_encode.length; i++) {
        var character = string_to_encode[i];
        if (character != 'null') {
            if (codes.indexOf(character) == -1) {
                codes.push(character);
            }
        }
    }

    // encode the string
    for (var i = 0; i <= string_to_encode.length; i++) {
        var current_character = string_to_encode[i];

        if (current_sequence != 'null') { // is not new line character
            var next_sequence = current_sequence + current_character;
            if (codes.indexOf(next_sequence) != -1) { // already in dictionary
                current_sequence = next_sequence; // add to the string and try again
            } else {
                if (current_character != undefined) {
                    // check if null in list
                    var newline_index = next_sequence.indexOf('null');
                    if (newline_index != -1) {
                        next_sequence = next_sequence.slice(0, newline_index);
                    }
                    codes.push(next_sequence);
                }
                
                output.push(codes.indexOf(current_sequence));
                current_sequence = current_character;
            }
        } else { // is new line character
            output.push('null');
            current_sequence = current_character;
        }
    }
}

// Display the encoded message
function outputEncodedMessage() {
    var encoded_message_div = document.getElementById('lzw-compression-encoded-text');
    encoded_message_div.innerHTML = '';
    var encoded_message_fragment = document.createDocumentFragment();
    
    // start by creating div for first line
    var line_div = document.createElement('div');
    line_div.classList.add('lzss-encoded-line');

    if (output.length > 0 && output[0] != -1) {
        // for each code
        var character_position = 0;
        for (var i = 0; i < output.length; i++) {
            var code_section_div = document.createElement('div');
            code_section_div.classList.add('lzw-code-section');
            var code_section_fragment = document.createDocumentFragment();

            var code = output[i];

            if (code == 'null') { // new line character
                encoded_message_fragment.appendChild(line_div);
                line_div = document.createElement('div');
                line_div.classList.add('lzw-encoded-line');
            } else {
                var code_length = codes[code].length;

                var code_div = document.createElement('div');
                code_div.classList.add('lzw-code');
                code_div.setAttribute('data-reference-index', code);
                
                for (var j = 0; j < code_length; j++) {
                    var placeholder_input = document.createElement('input');
                    placeholder_input.classList.add('lzw-placeholder-box');
                    placeholder_input.maxLength = 1;
                    placeholder_input.setAttribute('data-character-position', character_position);
                    placeholder_input.addEventListener('keyup', function(event) {
                        autoTab(event);
                    });
                    code_div.appendChild(placeholder_input);
                    character_position += 1;
                }

                var code_index_div = document.createElement('p');
                code_index_div.innerHTML = code;
                code_div.appendChild(code_index_div);

                code_div.addEventListener('mousemove', function(event) {
                    changeHighlight(event, true);
                });
                code_div.addEventListener('mouseleave', function(event) {
                    changeHighlight(event, false);
                });
                code_div.addEventListener('focus', function(event) {
                    changeHighlight(event, true);
                });
                code_div.addEventListener('focusout', function(event) {
                    changeHighlight(event, false);
                });

                line_div.appendChild(code_div);
            }
        }
    }
    encoded_message_fragment.appendChild(line_div);
    encoded_message_div.appendChild(encoded_message_fragment);
}


// Highlights the corresponding dictionary entry when the user hovers over an encoded character
function changeHighlight(event, highlight) {
    var selected_reference;
    if (event.nodeName == 'INPUT') { // event was changing focus to next input box
        selected_reference = event.parentElement;
    } else {
        selected_reference = event.target;
        if (event.target.nodeName == 'P' || event.target.nodeName == 'INPUT') {
            selected_reference = event.srcElement.parentElement;
        }
    }
    var code_index = parseInt(selected_reference.dataset.referenceIndex);
    var code_div = document.querySelectorAll('[data-index="' + code_index.toString() + '"]')[0];
    var code_div_top_position = code_div.offsetTop;
    
    if (highlight == true) {
        code_div.classList.add('highlight');
        selected_reference.classList.add('selected');
        document.getElementById('lzw-compression-dictionary').scrollTop = code_div_top_position - 60;
    } else {
        code_div.classList.remove('highlight');
        selected_reference.classList.remove('selected');
    }
}

// Add each of the dictionary entries to the page
function makeDictionaryEntryElements(start_index, end_index, element) {
    var fragment = document.createDocumentFragment();
    for (var i = start_index; i < end_index; i++) {
        // create dictionary entry element
        var dictionary_entry = document.createElement('div');
        dictionary_entry.classList.add('lzw-dictionary-entry');
        dictionary_entry.setAttribute('data-index', i);
        
        // create code element
        var code_element = document.createElement('p');
        code_element.innerHTML = i;
        code_element.classList.add('lzw-dictionary-code');
        
        // create value element
        var value_element = document.createElement('p');
        value_element.innerHTML = codes[i].replace(/\s+/g, '_');
        value_element.classList.add('lzw-dictionary-value');
        
        // add code and value to parent div
        dictionary_entry.appendChild(code_element);
        dictionary_entry.appendChild(value_element);
        fragment.append(dictionary_entry);
    }
    element.appendChild(fragment);
};


// Display the dictionary built by LZW in 3 columns
function outputDictionary() {
    var col1_dictionary_div = document.getElementById('lzw-compression-dictionary-col-1');
    var col2_dictionary_div = document.getElementById('lzw-compression-dictionary-col-2');
    var col3_dictionary_div = document.getElementById('lzw-compression-dictionary-col-3');
    col1_dictionary_div.innerHTML = '';
    col2_dictionary_div.innerHTML = '';
    col3_dictionary_div.innerHTML = '';
    
    var index_interval = codes.length/3;
    var first_split_index = Math.round(index_interval);
    var second_split_index = Math.round(index_interval)*2;
    makeDictionaryEntryElements(0, first_split_index, col1_dictionary_div);
    makeDictionaryEntryElements(first_split_index, second_split_index, col2_dictionary_div);
    makeDictionaryEntryElements(second_split_index, codes.length, col3_dictionary_div);
}

// Autotab to next input box when decoding
function autoTab(event) {
    // get current input box
    var current_placeholder_element = event.srcElement;

    // if reached maximum number of characters that are allowed in the input box
    if (current_placeholder_element.value.length == current_placeholder_element.maxLength) {
        // get number of placeholder box (not reference index for dictionary)
        var current_placeholder_index = parseInt(current_placeholder_element.dataset.characterPosition);
        var next_element;
        // get all the input elements and iterate through them
        var input_elements = document.getElementsByTagName('input');
        for (var i = 0; i < input_elements.length; i++) {
            element = input_elements[i];
            var index = parseInt(element.dataset.characterPosition);
            // if the index of the element is greater than the current placeholder index,
            //    then it must be the next input box
            if (index > current_placeholder_index) {
                break;
            }
        }
        // move the cursor focus to the next element
        element.focus();
        changeHighlight(event, false);
        changeHighlight(element, true);
    }
}

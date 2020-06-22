const lzssAlgorithm = require('./lzssAlgorithm.js');

var encoded_message = [];
var start_index;
var end_index;
var placeholder_message = gettext(`Pease porridge hot, pease porridge cold,
Pease porridge in the pot, nine days old;
Some like it hot, some like it cold,
Some like it in the pot, nine days old.`);


// Set placeholder message
window.onload = function() {
    var message_div = document.getElementById('message-to-encode');
    message_div.value = placeholder_message;
    document.getElementById('lzss-compression-compress-button').addEventListener('click', compress, false);  
}

// Compress the message and display the encoded message
function compress() {
    var message = document.getElementById('message-to-encode').value;
    // clear any existed encoded message
    document.getElementById('lzss-compression-compressed-text').innerHTML = '';
    encoded_message = lzssAlgorithm.compressText(message);
    drawEncodedMessage(encoded_message);
}

// Create a new div
function newLineDiv() {
    var line_div = document.createElement('div');
    line_div.classList.add('lzss-compression-encoded-line');
    return line_div;
}

// Output the encoded message
function drawEncodedMessage(encoded_message) {
    var compressed_text_div = document.getElementById('lzss-compression-compressed-text');

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
                index += 1;
                continue;
            }
            // add child div for character to line
            var character_div = document.createElement('div');
            character_div.classList.add('lzss-compression-encoded-character');
            character_div.innerHTML = encoded_message[i];
            character_div.setAttribute('data-index', index);
            line_div.append(character_div);
            index += 1;
        
        } else { // a reference
        
            var num_encoded_characters = parseInt(string[1]);
            var fragment = document.createDocumentFragment();
            
            for (var j = 0; j < num_encoded_characters; j++) {
                var placeholder_input = document.createElement('input'); 
                placeholder_input.classList.add('lzss-compression-placeholder-box');
                placeholder_input.setAttribute('data-index', index);
                placeholder_input.maxLength = 1;
                placeholder_input.addEventListener('mousemove', function(event) {
                    changeHighlight(event, true);
                });
                placeholder_input.addEventListener('mouseleave', function(event) {
                    changeHighlight(event, false);
                });
                placeholder_input.addEventListener('keyup', function(event) {
                    autoTab(event);
                });
                fragment.appendChild(placeholder_input);
                index += 1;
            }

            var reference_div = document.createElement('div');
            reference_div.classList.add('lzss-compression-reference');

            var start_reference_index = parseInt(string[0]);
            var end_reference_index = start_reference_index + num_encoded_characters;

            reference_div.setAttribute('data-start-index', start_reference_index);
            reference_div.setAttribute('data-end-index', end_reference_index);

            reference_div.appendChild(fragment);
            reference_div.addEventListener('mousemove', function(event) {
                changeHighlight(event, true);
            });
            reference_div.addEventListener('mouseleave', function(event) {
                changeHighlight(event, false);
            });
            reference_div.addEventListener('focus', function(event) {
                changeHighlight(event, true);
            });
            reference_div.addEventListener('focusout', function(event) {
                changeHighlight(event, false);
            });
            
            line_div.append(reference_div);
        }
    }
    compressed_text_div.append(line_div);
}

// Get the start and end index of the given reference
function getIndexes(selected_reference) {
    /* Helper function to get start and end index data values for
     * div hovered over.
     */
    start_index = parseInt(selected_reference.dataset.startIndex);
    end_index = parseInt(selected_reference.dataset.endIndex);
}

// Highlight the corresponding reference
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
    getIndexes(selected_reference);
    for (var i = start_index; i < end_index; i++) {
        var character_div = document.querySelectorAll('[data-index="' + i.toString() + '"]')[0];
        if (highlight == true) {
            character_div.classList.add('highlight');
        } else {
            character_div.classList.remove('highlight');
        }
    }
    if (highlight == true) {
        selected_reference.classList.add('selected');
    } else {
        selected_reference.classList.remove('selected');
    }
}

// Autotab to the next input box once the current box has a character in it
function autoTab(event) {
    var placeholder_element = event.srcElement;

    if (placeholder_element.value.length == placeholder_element.maxLength) {
        var placeholder_index = parseInt(placeholder_element.dataset.index);
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
        changeHighlight(event, false);
        changeHighlight(element, true);
    }
}

var codes = ['P', 'e', 's', 'e', 'p', 'o', 'ease', 'x'];
var message_characters = [];
// var message_characters = [
//  {
//      Character: 'P',
//      CodeIndex: 0
//  }
// ];

window.onload = function() {
    readInputMessage();
    populateDictionary();
    addInputRowToDictionary();
    highlightCodedCharacters();
}

// highlight the characters that have a corresponding code in the dictionary
function highlightCodedCharacters() {
    
    // clear the existing references
    for (var i = 0; i < message_characters.length; i++) {
        message_characters[i].CodeIndex = false;
    }

    // stable sort the codes by length
    var ordered_codes = codes.slice()
    ordered_codes.sort(function (a, b) {
        if (a.length === b.length)
            return a.position - b.position;
        if (b.length < a.length)
            return -1;
            return 1;
    });

    console.log(codes);
    console.log(ordered_codes);

    // highlight the substrings of the message that occur in the dictionary
    // uses the longest code first

    for (var i = 0; i < ordered_codes.length; i++) {
        var code = ordered_codes[i];
        for (var j = 0; j < message_characters.length - 1; j++) {
            var code_match = false;
            var next_message_character_index = j + 1;
            // if the character has already been matched, the move on to the next
            if (message_characters[j].CodeIndex !== false) {
                continue;
            }
            // if the first character of the code matches the current character in the message
            if (code[0] == message_characters[j].Character) {
                // check the rest of the code matches the following characters
                if (code.length > 1) {
                    for (var k = 1; k < code.length; k++) {
                        // get the next code and message characters
                        var next_code_character = code[k];
                        var next_message_character = message_characters[next_message_character_index];
                        // if a character in the message is already coded, move on
                        if (next_message_character.CodeIndex != false) {
                            break;
                        }
                        // if they match, then iterate to the next characters
                        if (next_code_character == next_message_character.Character) {
                            next_message_character_index += 1;
                            // if they match and have reached the end of the code, then record that a match was found!
                            if ((next_message_character_index - j) == code.length) {
                                code_match = true;
                            }
                        } else {
                            break;
                        }
                    }
                } else { // if the code is one character long, then we know we have found a match
                        code_match = true;
                }
            }
            // before searching for the next occurance, mark the characters in the message
            //     with which code index they correspond to
            if (code_match == true) {
                for (var l = 0; l < code.length; l++) {
                    var character_index = l + j;
                    message_characters[character_index].CodeIndex = codes.indexOf(code);
                    // interface
                    var character_element = document.querySelectorAll('[data-character-index="' + character_index.toString() + '"]')[0];
                    character_element.classList.add('highlight');
                }
            }
        }
    }
}


function highlightDictionaryEntry(event, highlight) {
    // get message character element and index to get dictionary entry index
    var message_character_element = event.srcElement;
    var message_character_index = message_character_element.getAttribute('data-character-index');
    var dictionary_entry_index = message_characters[message_character_index].CodeIndex;
    // if there is a corresponding code in the dictionary then highlight it
    if (dictionary_entry_index !== false) {
        var dictionary_entry_element = document.querySelectorAll('[data-code-index="' + dictionary_entry_index.toString() + '"]')[0];
        if (highlight === true) {
            dictionary_entry_element.classList.add('highlight');
        } else {
            dictionary_entry_element.classList.remove('highlight');
        }
    }
}


// transfer the inputted message into individual element for each character
function readInputMessage() {
    var message = document.getElementById('interactive-compression-dictionary-input').value.split('');
    var fragment = document.createDocumentFragment();

    var line_div = document.createElement('div');
    line_div.classList.add('interactive-compression-dictionary-output-line');
    
    for (var i = 0; i < message.length; i++) {
        var character = message[i];
        var new_message_character = {
            Character: character,
            CodeIndex: false
        }
        message_characters.push(new_message_character);
        if (character.indexOf('\n') != -1) { // is a new line character
            // append the line div and create a new one
            fragment.appendChild(line_div);
            var line_div = document.createElement('div');
            line_div.classList.add('interactive-compression-dictionary-output-line');
        } else {
            var character_element = document.createElement('p');
            character_element.innerHTML = message[i];
            character_element.classList.add('interactive-compression-dictionary-message-character');
            character_element.setAttribute('data-character-index', i);
            character_element.addEventListener('mousemove', function(event) {
                highlightDictionaryEntry(event, true);
            });
            character_element.addEventListener('mouseleave', function(event) {
                highlightDictionaryEntry(event, false);
            });
        line_div.append(character_element);
        }
    }
    fragment.appendChild(line_div);
    document.getElementById('interactive-compression-dictionary-output').appendChild(fragment);
}


function updateDictionary() {
    // get the new value entered by the user
    var new_entry_value = document.getElementById('interactive-compression-dictionary-user-dictionary-value-input').value;
    codes.push(new_entry_value);
    // increase the index of the entry node
    var entry_node = document.getElementById('interactive-compression-dictionary-user-dictionary-entry-input');
    entry_node.dataset.index = codes.length;
    entry_node.firstChild.innerHTML = codes.length;
    // create a new element for the new dictionary entry
    var next_index = codes.length - 1;
    var new_dictionary_element = createDictionaryElement(next_index, new_entry_value);
    document.getElementById('interactive-compression-dictionary-user-dictionary-column-1').insertBefore(new_dictionary_element, entry_node);

    highlightCodedCharacters();
}


function addInputRowToDictionary() {
    var i = codes.length;

    // create space for next entry
    var dictionary_entry = document.createElement('div');
    dictionary_entry.classList.add('interactive-compression-dictionary-user-dictionary-entry');
    dictionary_entry.id = 'interactive-compression-dictionary-user-dictionary-entry-input';
    dictionary_entry.setAttribute('data-code-index', i);
    // create code element
    var code_element = document.createElement('p');
    code_element.innerHTML = i;
    code_element.classList.add('interactive-compression-dictionary-user-dictionary-code');
    // create value element
    var value_element = document.createElement('input');
    value_element.id = 'interactive-compression-dictionary-user-dictionary-value-input';
    value_element.addEventListener("change", updateDictionary);
    dictionary_entry.appendChild(code_element);
    dictionary_entry.appendChild(value_element);

    document.getElementById('interactive-compression-dictionary-user-dictionary-column-1').appendChild(dictionary_entry);
}


// populate the interface with the dictionary entries
function populateDictionary() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < codes.length; i++) {
        var new_dictionary_element = createDictionaryElement(i, codes[i]);
        fragment.append(new_dictionary_element);
    }

    document.getElementById('interactive-compression-dictionary-user-dictionary-column-1').appendChild(fragment);
};


function createDictionaryElement(index, value) {
    // create dictionary entry element
    var dictionary_entry = document.createElement('div');
    dictionary_entry.classList.add('interactive-compression-dictionary-user-dictionary-entry');
    dictionary_entry.setAttribute('data-code-index', index);
    
    // create code element
    var code_element = document.createElement('p');
    code_element.innerHTML = index;
    code_element.classList.add('interactive-compression-dictionary-user-dictionary-code');
    
    // create value element
    var value_element = document.createElement('p');
    value_element.innerHTML = value;
    value_element.classList.add('interactive-compression-dictionary-user-dictionary-value');
    
    // add code and value to parent div
    dictionary_entry.appendChild(code_element);
    dictionary_entry.appendChild(value_element);

    return dictionary_entry;
}

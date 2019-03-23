var codes = ['P', 'e', 's', 'e', 'p', 'o'];
var message_characters = [];


window.onload = function() {
    readInputMessage();
    populateDictionary();
    highlightCodedCharacters();
}


// highlight the characters that have a corresponding code in the dictionary
function highlightCodedCharacters() {
    // version for only single characters in dictionary

    // for each entry in the dictionary
    for (var i = 0; i < codes.length; i++) {
        for (var j = 0; j < message_characters.length; j++) {
            // console.log(codes[i], message_characters[j]);
            var code = codes[i];
            var character = message_characters[j];
            if (code == character) {
                var code_div = document.querySelectorAll('[data-index="' + j.toString() + '"]')[0];
                code_div.classList.add('highlight');
            }
        //  // if character == entry
        //      // highlight the character
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
        message_characters.push(character);
        if (character.indexOf('\n') != -1) { // is a new line character
            // append the line div and create a new one
            fragment.appendChild(line_div);
            var line_div = document.createElement('div');
            line_div.classList.add('interactive-compression-dictionary-output-line');
        } else {
            var character_element = document.createElement('p');
            character_element.innerHTML = message[i];
            character_element.classList.add('interactive-compression-dictionary-message-character');
            character_element.setAttribute('data-index', i);
            line_div.append(character_element);
        }
    }
    fragment.appendChild(line_div);
    document.getElementById('interactive-compression-dictionary-output').appendChild(fragment);

}

// populate the dictionary with some example entries
function populateDictionary() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < codes.length; i++) {
        // create dictionary entry element
        var dictionary_entry = document.createElement('div');
        dictionary_entry.classList.add('interactive-compression-dictionary-user-dictionary-entry');
        dictionary_entry.setAttribute('data-index', i);
        
        // create code element
        var code_element = document.createElement('p');
        code_element.innerHTML = i;
        code_element.classList.add('interactive-compression-dictionary-user-dictionary-code');
        
        // create value element
        var value_element = document.createElement('p');
        value_element.innerHTML = codes[i];
        value_element.classList.add('interactive-compression-dictionary-user-dictionary-value');
        
        // add code and value to parent div
        dictionary_entry.appendChild(code_element);
        dictionary_entry.appendChild(value_element);
        fragment.append(dictionary_entry);
    }
    document.getElementsByClassName('interactive-compression-dictionary-user-dictionary-column')[0].appendChild(fragment);
};

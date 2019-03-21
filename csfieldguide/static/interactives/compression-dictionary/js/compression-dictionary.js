var codes = [
	// 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
	// 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
	// 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
	// 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ,'I',
	// 'J', 'K', 'L' ,'M', 'N', 'O', 'P', 'Q', 'R',
	// 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
	'P', 'e', 's', 'e', 'p', 'o'
];



window.onload = function() {
	readInputMessage();
	populateDictionary();
	highlightCodedCharacters();
}


// transfer the inputted message into individual element for each character
function readInputMessage() {

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
    highlightCodedCharacters();
};


// highlight the characters that have a corresponding code in the dictionary
function highlightCodedCharacters() {

}

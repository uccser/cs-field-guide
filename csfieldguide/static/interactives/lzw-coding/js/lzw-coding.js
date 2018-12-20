var output = [];
var codes = [];

function compress() {
	output = [];
	codes = [];
	compressText();
	outputEncodedMessage();
	outputDictionary();
}

// LZW algorithm
function compressText() {
	var string_to_encode = document.getElementById('interactive-lzw-coding-input').value;

	// replace new line characters
	string_to_encode = string_to_encode.split('');
    for (var i = 0; i < string_to_encode.length; i++) {
        string_to_encode[i] = string_to_encode[i].replace(/[\r\n]+/g, null);
    }
	
	var current_sequence = "";

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

// display the encoded message
function outputEncodedMessage() {
	var encoded_message_div = document.getElementById('interactive-lzw-coding-encoded-text');
	encoded_message_div.innerHTML = '';
	var encoded_message_fragment = document.createDocumentFragment();
	
	// start by creating div for first line
	var line_div = document.createElement('div');
	line_div.classList.add('interactive-lzss-encoded-line');

	// for each code
	var character_position = 0;
	for (var i = 0; i < output.length; i++) {
		var code_section_div = document.createElement('div');
		code_section_div.classList.add('interactive-lzw-code-section');
		var code_section_fragment = document.createDocumentFragment();

		var code = output[i];

		if (code == 'null') { // new line character
			encoded_message_fragment.appendChild(line_div);
			line_div = document.createElement('div');
    		line_div.classList.add('interactive-lzw-encoded-line');
		} else {
			var code_length = codes[code].length;

			var code_div = document.createElement('div');
			code_div.classList.add('interactive-lzw-code');
			code_div.setAttribute('data-reference-index', code);
			
			for (var j = 0; j < code_length; j++) {
				var placeholder_input = document.createElement('input');
				placeholder_input.classList.add('interactive-lzw-placeholder-box');
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

	        line_div.appendChild(code_div);
			// code_section_fragment.appendChild(code_div);
			// encoded_message_fragment.appendChild(code_section_fragment);
		}
	}
	encoded_message_fragment.appendChild(line_div);
	encoded_message_div.appendChild(encoded_message_fragment);
}


function changeHighlight(event, highlight) {	
    var selected_reference = event.target;
    if (event.target.nodeName == 'P' || event.target.nodeName == 'INPUT') {
        selected_reference = event.srcElement.parentElement;
    }
    var code_index = parseInt(selected_reference.dataset.referenceIndex);
    var code_div = document.querySelectorAll('[data-index="' + code_index.toString() + '"]')[0];
    if (highlight == true) {
	    code_div.classList.add('highlight');
	    selected_reference.classList.add('selected');
	} else {
		code_div.classList.remove('highlight');
   		selected_reference.classList.remove('selected');
	}
}


// display the dictionary built by LZW
function outputDictionary() {
	var dictionary_div = document.getElementById('interactive-lzw-coding-dictionary');
	dictionary_div.innerHTML = '';
	var fragment = document.createDocumentFragment();
	
	for (var i = 0; i < codes.length; i++) {
		// create dictionary entry element
		var dictionary_entry = document.createElement('div');
		dictionary_entry.classList.add('interactive-lzw-dictionary-entry');
		dictionary_entry.setAttribute('data-index', i);
		
		// create code element
		var code_element = document.createElement('p');
		code_element.innerHTML = i;
		code_element.classList.add('interactive-lzw-dictionary-code');
		
		// create value element
		var value_element = document.createElement('p');
		value_element.innerHTML = codes[i];
		value_element.classList.add('interactive-lzw-dictionary-value');
		
		// add code and value to parent div
		dictionary_entry.appendChild(code_element);
		dictionary_entry.appendChild(value_element);
		fragment.append(dictionary_entry);
	}
	dictionary_div.appendChild(fragment);
}

function autoTab(event) {
    var placeholder_element = event.srcElement;

    if (placeholder_element.value.length == placeholder_element.maxLength) {
        var placeholder_index = parseInt(placeholder_element.dataset.characterPosition);
        var element;
        var input_elements = document.getElementsByTagName('input');
        for (var i = 0; i < input_elements.length; i++) {
            element = input_elements[i];
            var index = parseInt(element.dataset.characterPosition);
            if (index > placeholder_index) {
                break;
            }
        }
        element.focus();
    }
}

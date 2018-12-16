var output = [];
var codes = [];

function compress() {
	compressText();
	outputEncodedMessage();
	outputDictionary();
}

function compressText() {
	// var string_to_encode = 'IAMSAMSAMIAM';
	var string_to_encode = document.getElementById('interactive-lzw-coding-input').value;
	var current_sequence = "";

	// set up initial dictionary
	for (var i = 0; i < string_to_encode.length; i++) {
		var character = string_to_encode[i];
		if (codes.indexOf(character) == -1) {
			codes.push(character);
		}
	}

	// encode the string
	for (var i = 0; i <= string_to_encode.length; i++) {
		var current_character = string_to_encode[i];
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
	}
}

// display the encoded message
function outputEncodedMessage() {
	var encoded_message_div = document.getElementById('interactive-lzw-coding-encoded-text');
	var encoded_message_fragment = document.createDocumentFragment();
	
	// for each code
	for (var i = 0; i < output.length; i++) {
		var code_section_div = document.createElement('div');
		code_section_div.classList.add('interactive-lzw-code-section');
		var code_section_fragment = document.createDocumentFragment();

		var code = output[i];
		var code_length = codes[code].length;

		var code_div = document.createElement('div');
		code_div.classList.add('interactive-lzw-code');
		
		for (var j = 0; j < code_length; j++) {
			var placeholder_input = document.createElement('input');
			placeholder_input.classList.add('interactive-lzw-placeholder-box');
			code_div.appendChild(placeholder_input);
		}

		code_section_fragment.appendChild(code_div);
		encoded_message_fragment.appendChild(code_section_fragment);
	}
	encoded_message_div.appendChild(encoded_message_fragment);
}

// display the dictionary built by LZW
function outputDictionary() {
	var dictionary_div = document.getElementById('interactive-lzw-coding-dictionary');
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < codes.length; i++) {
		var dictionary_code = document.createElement('div');
		dictionary_code.classList.add('interactive-lzw-dictionary-entry');
		// create code element
		var code_element = document.createElement('p');
		code_element.innerHTML = i;
		code_element.classList.add('interactive-lzw-dictionary-code');
		// create value element
		var value_element = document.createElement('p');
		value_element.innerHTML = codes[i];
		value_element.classList.add('interactive-lzw-dictionary-value');
		// add code and value to parent div
		dictionary_code.appendChild(code_element);
		dictionary_code.appendChild(value_element);
		fragment.append(dictionary_code);
	}
	dictionary_div.appendChild(fragment);
}

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

function outputEncodedMessage() {
	var encoded_message_div = document.getElementById('interactive-lzw-coding-encoded-text');
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < output.length; i++) {
		var placeholder_input = document.createElement('input');
		placeholder_input.classList.add('interactive-lzw-placeholder-box');
		placeholder_input.value = output[i];
		fragment.appendChild(placeholder_input);
	}
	encoded_message_div.appendChild(fragment);
}

function outputDictionary() {
	var dictionary_div = document.getElementById('interactive-lzw-coding-dictionary');
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < codes.length; i++) {
		var dictionary_code = document.createElement('div');
		dictionary_code.classList.add('interactive-lzw-dictionary-entry');
		
		var code_element = document.createElement('p');
		code_element.innerHTML = i;
		code_element.classList.add('interactive-lzw-dictionary-code');

		var value_element = document.createElement('p');
		value_element.innerHTML = codes[i];
		value_element.classList.add('interactive-lzw-dictionary-value');
		
		dictionary_code.appendChild(code_element);
		dictionary_code.appendChild(value_element);
		fragment.append(dictionary_code);
	}
	dictionary_div.appendChild(fragment);
}

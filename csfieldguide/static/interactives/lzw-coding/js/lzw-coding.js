function compress() {
	var string_to_encode = "IAMSAMSAMIAM";
	var codes = [];
	var current_sequence = "";
	var output = [];

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

	console.log(codes);
	console.log(output);

}

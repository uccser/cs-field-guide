window.onload = function() {
	console.log('cats');
	var test_string = `
	I am Sam, 
	Sam I am.
	That Sam-I-am! That Sam-I-am!
	I do not like that Sam-I-am! 
	Do you like green eggs and ham?
	I do not like them, Sam-I-am.
	I do not like green eggs and ham.
	`;
	console.log(test_string);
	// create a character dictionary
	// for each character in the string
		// update the latest location of that character in the dictionary
		// next string = charcter + next character
		// if next string not in dictionary
			// add next string to dictionary
		// else
			// add next character
			// repeat as long as next character not in dictionary

	/*
	for each character in the text
		string = character
		addToDict(string)

	function addToDict:
		if string not in dictionary
			add that string to the dictionary
		else
			string = string + next character
	*/
}

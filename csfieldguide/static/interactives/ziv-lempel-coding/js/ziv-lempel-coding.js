window.onload = function() {
	var string = `
I am Sam, 
Sam I am.
That Sam-I-am! That Sam-I-am!
I do not like that Sam-I-am! 
Do you like green eggs and ham?
I do not like them, Sam-I-am.
I do not like green eggs and ham.
	`;
	console.log(string);
	console.log(string.replace(/\n/g, ""));
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

	var positions = {}
	var c = string[0];
	var index = 0;
	while (index < string.length) {
		index += 1;

	}
}



var string = `i am sam sam i am that sam-i-am that sam-i-am`;
// var string = `iamsamsamiamthatsam-i-amthatsam-i-am`;

string = string.replace(/[\r\n]+/g, '');
string = string.split('');
console.log(string);

// var positions = {};
positions = []
for (var i = 0; i < string.length; i++){
//   positions[string[i]] = i;
    var char = string[i];
    if (positions.indexOf(char) == -1) {
        positions.push(char);
    }
}

// var p = string.splice(0, 1)[0]; // first character
var p = string[0];
var index = 1;

// while (string.length > 0) {
while (index < string.length) {
    
    // var c = string.splice(0,1);
    var c = string[index];
    var next_string = p + c;

    // if next_string already in dictionary
    // if (positions.hasOwnProperty(next_string)) {
    if (positions.indexOf(next_string) != -1) {
        p = next_string;
    } else {
        // positions[next_string] = index;
        positions.push(next_string);
        p = c;
    }

    index += 1;
}

// for (var i = 0; i < string.length; i++){
//   positions[string[i]] = i;
// }
// var p = string[0];
// var index = 0;
// while (index < string.length) {
//     var c = string[index+1];
//     var next_string = p + c;
//     if (positions.hasOwnProperty(next_string)) {
//         p = next_string;
//     } else {
//       positions[next_string] = index;
//       p = c;
//     }
//     index += 1;
// }

console.log(positions);


  /*     PSEUDOCODE
  1     Initialize table with single character strings
  2     P = first input character
  3     WHILE not end of input stream
  4          C = next input character
  5          IF P + C is in the string table
  6            P = P + C
  7          ELSE
  8            output the code for P
  9          add P + C to the string table
  10           P = C
  11         END WHILE
  12    output code for P
  */

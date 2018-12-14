var string_to_encode = "IAMSAMSAMIAM";

var codes = [];
var w = "";
var output = [];

// set up initial dictionary
for (var i = 0; i < string_to_encode.length; i++) {
	var character = string_to_encode[i];
	if (codes.indexOf(character) == -1) {
		codes.push(character);
	}
}

console.log(codes);

// encode the string
for (var i = 0; i <= string_to_encode.length; i++) {
	var k = string_to_encode[i];
	var wk = w + k;
	if (codes.indexOf(wk) != -1) { // already in dictionary
		w = wk; // add to the string and try again
	} else {
		console.log(wk);
		if (k != undefined) {
			codes.push(wk);
		}
		output.push(codes.indexOf(w));
		w = k;
	}
}

console.log(codes);
console.log(output);

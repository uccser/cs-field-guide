var lempilZivSS = {};

testString = "abracadabra"
$(document).ready(function(){
    $('#testText').html(testString);
    })



function lzssEncode(stringToEncode) {
//make string to encode an array
	var arrayToEncode = stringToEncode.split("");

	var currentReadString;
	var currentMatchString;

	var howManyForward;
	var howManyBack;

	//stringIndex is going forward through string to encode, matchIndex is going backwards through string
	//only need to start at the third character, compression will only start then

	console.log("string to decode is: " + stringToEncode);
	for (var stringIndex = 2; stringIndex < stringToEncode.length; stringIndex++) {
		console.log("currently encoding character " + stringToEncode[stringIndex] + ", index " + stringIndex);
		currentReadString = stringToEncode[stringIndex]
		currentMatchString = stringToEncode[stringIndex - 1]

		longestMatch = "";
		indexOfLongestMatchStart = -1;

		//this loop will eventually take us back to the start of the string
		for (var matchIndex = stringIndex - 1; matchIndex >= 0; matchIndex--) {
			howManyForward = 1;
			currentReadString = stringToEncode.slice(stringIndex, (stringIndex + 1))
			currentMatchString = stringToEncode.slice(matchIndex, (matchIndex+ 1))
			console.log("	currently at position " + matchIndex +", currentReadString is " + currentReadString + ", currentMatchString is " + currentMatchString);

			while (currentReadString === currentMatchString) {
				console.log("		currentReadString " + currentReadString + " and currentMatchString " + currentMatchString + " matched! howManyForward is now: " + howManyForward);


				if (currentMatchString.length > longestMatch.length) {
					longestMatch = currentMatchString
					indexOfLongestMatchStart = matchIndex;
				}

				currentReadString = stringToEncode.slice(stringIndex, (stringIndex + howManyForward + 1))
				currentMatchString = stringToEncode.slice(matchIndex, (matchIndex + howManyForward + 1))
				
				if ((stringIndex + howManyForward) < stringToEncode.length) {
					howManyForward++;
				}
				
				
			}
		}

		if (indexOfLongestMatchStart == -1) {
			console.log("No match found, not encoding");
		} else {
		console.log("character " + stringToEncode[stringIndex] + ", index " + stringIndex + " encoded. longestMatch is " + longestMatch);
		console.log("encode next " + longestMatch.length + " characters starting from " + indexOfLongestMatchStart);

		}

		console.log("");
		}
		
	}









lzssEncode(testString);
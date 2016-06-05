var lempilZivSS = {};

/*testString = "abcxxxxxxabcxxxxxxxabcd"
$(document).ready(function(){
    $('#testText').html(testString);
    })
*/
//file input stuff
window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		var testText = document.getElementById('testText');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					testText.innerHTML = reader.result;
					lzssEncode(reader.result);
				}

				reader.readAsText(file);



			} else {
				fileDisplayArea.innerText = "File not supported!"
			}
		});
}



function lzssEncode(stringToEncode, slidingWindowLength) {
//make string to encode an array
	var arrayToEncode = stringToEncode.split("");

	var currentReadString;
	var currentMatchString;

	var howManyForward;

	var stringToReturn = stringToEncode.slice(0,2);

	//stringIndex is going forward through string to encode, matchIndex is going backwards through string
	//only need to start at the third character, compression will only start then


	console.log("string to decode is: " + stringToEncode);
	for (var stringIndex = 2; stringIndex < stringToEncode.length;) {
		console.log("currently encoding character " + stringToEncode[stringIndex] + ", index " + stringIndex);
		currentReadString = stringToEncode[stringIndex]
		currentMatchString = stringToEncode[stringIndex - 1]

		longestMatch = "";
		indexOfLongestMatchStart = -1;

		//stop looking back when we either hit the start of the string or 
		for (matchIndex = stringIndex - 1; (((matchIndex >= 0) && ((stringIndex - matchIndex) < slidingWindowLength))); matchIndex--) {
			console.log("gone back " + String(stringIndex - matchIndex) + " characters");
			howManyForward = 1;
			currentReadString = stringToEncode.slice(stringIndex, (stringIndex + 1))
			currentMatchString = stringToEncode.slice(matchIndex, (matchIndex + 1))
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
		//if nothing to encode
		console.log("matchIndex is " + matchIndex);
		if ((indexOfLongestMatchStart == -1) || (longestMatch.length < 3)) {
			console.log("No match found, not encoding");
			stringToReturn += stringToEncode[stringIndex];
			stringIndex++

		} else { // if something to encode, add <stepsBack, noCharacters> pair and skip forward that many characters in the string to encode
			console.log("character " + stringToEncode[stringIndex] + ", index " + stringIndex + " encoded. longestMatch is " + longestMatch);
			console.log("encode next " + longestMatch.length + " characters starting from " + indexOfLongestMatchStart);
			console.log("stringIndex is " + stringIndex + " and matchIndex is " + matchIndex);
			stringToReturn += ("<" + ((stringIndex - indexOfLongestMatchStart)) + "," + longestMatch.length + ">");
			stringIndex += (longestMatch.length);

		}

		console.log("");
		}

	$('#testText').html(stringToEncode);
	$('#encodedText').html(stringToReturn);
	stringToReturn;


		
	}

//for testing purposes, having the random string just consist of abc's makes it likely for some encoding to actually be done.
function randomABCGenerator(length) {
	randomABCString = "";
	for (var i=0; i < length; i++) {
		randomInt = getRandomInt(0, 4).p;
		if (randomInt == 0) {
			randomABCString += "a";
		} else if (randomInt == 1) {
			randomABCString += "b";
		} else if (randomInt == 2) {
			randomABCString += "c";
		} else if (randomInt == 3) {
			randomABCString += "d";
		} else {
			randomABCString += "e";
		}
		
	}

	return randomABCString;
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTestStringFromFile() {
	alert("we in function!");
	jQuery.get('testString.txt', function(data) {
    	alert(data);
	});
}

function testLongStringTime(lengthOfStringToTest) {
	stringToTest = randomABCGenerator(lengthOfStringToTest) //length of teststring
	timeStart = performance.now();
	lzssEncode(stringToTest);
	timeEnd = performance.now();
	console.log("Call to lzssEncode with " + lengthOfStringToTest + "characters took " + (timeEnd - timeStart) + " milliseconds.")


}






//lzssEncode(testString);
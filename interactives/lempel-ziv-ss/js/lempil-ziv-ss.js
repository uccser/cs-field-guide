var lempilZivSS = {};
this.slidingWindow = 2000;
this.textBeforeBits = 0;
this.textAfterBits = 0;	
this.sizeOfCharacterInBits = 8
this.sizeOfLZSSPairInBits = 16

/*testString = "abcxxxxxxabcxxxxxxxabcd"
$(document).ready(function(){
    $('#testText').html(testString);
    })
*/
//file input stuff
window.onload = function() {
	//########### File Input things#################
		var fileInput = document.getElementById('fileInput');
		var testText = document.getElementById('testText');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					/*
						timeStart = performance.now();
						lzssEncode(reader.result, slidingWindow);
						timeEnd = performance.now();
						console.log("Call to lzssEncode with .txt file with length " + reader.result.length + " took " + (timeEnd - timeStart) + " milliseconds with sliding window of " + slidingWindow);
						console.log("Text before encoding was " + textBeforeBits + " bits, and after it was " + textAfterBits + "bits which is a " + ((textAfterBits / textBeforeBits) * 100) + "% compression");
					
 					*/
					//###execution time testing purposes, encodes string with many different sliding windows and outputs time taken
					
					var slidingWindows = [100, 500, 1000, 2000, 4000, 10000]

					for (var i = 0; i < slidingWindows.length; i++) {
					
						timeStart = performance.now();
						lzssEncode(reader.result, slidingWindows[i]);
						timeEnd = performance.now();
						console.log("Call to lzssEncode with .txt file with length " + reader.result.length + " took " + (timeEnd - timeStart) + " milliseconds with sliding window of " + slidingWindows[i]);
						console.log("Text before encoding was " + textBeforeBits + " bits, and after it was " + textAfterBits + "bits which is a " + ((textAfterBits / textBeforeBits)) + "% compression");
 						console.log("");
					}
					
					//###########################################################
				}

				reader.readAsText(file);



			} else {
				fileDisplayArea.innerText = "File not supported!"
			}
		});
	//##############################################

	//########## Encode Button ##################


}

function encodeTextArea() {
	var textInTextArea = document.getElementById("text-to-encode-textarea").value;
	lzssEncode(textInTextArea, slidingWindow);
}

function lzssEncode(stringToEncode, slidingWindowLength) {
//make string to encode an array
	textBeforeBits = 0;
	textAfterBits = 0;	
	$('#encodedText').empty();
	var arrayToEncode = stringToEncode.split("");
	var currentReadString;
	var currentMatchString;
	var howManyForward;
	var stringToReturn = stringToEncode.slice(0,2);
	//console.log("string to decode is: " + stringToEncode);
	for (var stringIndex = 0 ; stringIndex < stringToEncode.length;) {
		//console.log("currently encoding character " + stringToEncode[stringIndex] + ", index " + stringIndex);
		currentReadString = stringToEncode[stringIndex]
		currentMatchString = stringToEncode[stringIndex - 1]
		longestMatch = "";
		indexOfLongestMatchStart = -1;
		//stop looking back when we either hit the start of the string or we're at edge of sliding window
		for (matchIndex = stringIndex - 1; (((matchIndex >= 0) && ((stringIndex - matchIndex) < slidingWindowLength))); matchIndex--) {
			//console.log("gone back " + String(stringIndex - matchIndex) + " characters");
			howManyForward = 1;
			currentReadString = stringToEncode.slice(stringIndex, (stringIndex + 1))
			currentMatchString = stringToEncode.slice(matchIndex, (matchIndex + 1))
			//console.log("	currently at position " + matchIndex +", currentReadString is " + currentReadString + ", currentMatchString is " + currentMatchString);
			while ((currentReadString === currentMatchString) && longestMatch.length < 16) {
				//console.log("		currentReadString " + currentReadString + " and currentMatchString " + currentMatchString + " matched! howManyForward is now: " + howManyForward);
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
		//console.log("matchIndex is " + matchIndex);
		if ((indexOfLongestMatchStart == -1) || (longestMatch.length < 3)) {
			//console.log("No match found, not encoding");
			$('#encodedText').append(stringToEncode[stringIndex]);
			//console.log("appended " + stringToEncode[stringIndex]);
			stringIndex++
			textAfterBits += sizeOfCharacterInBits // add one character's worth of bits

		} else { // if something to encode, add <stepsBack, noCharacters> pair and skip forward that many characters in the string to encode
			//console.log("character " + stringToEncode[stringIndex] + ", index " + stringIndex + " encoded. longestMatch is " + longestMatch);
			//console.log("encode next " + longestMatch.length + " characters starting from " + indexOfLongestMatchStart);
			//console.log("stringIndex is " + stringIndex + " and matchIndex is " + matchIndex);
			$('#encodedText').append("<span style='color:red;'>" + "<" + ((stringIndex - indexOfLongestMatchStart)) + "," + longestMatch.length + ">" + "</span>")
			//$('#encodedText').append( "<span style="color:blue">" + "<"((stringIndex - indexOfLongestMatchStart)) + "," + longestMatch.length + ">" + "</span");
			stringIndex += (longestMatch.length);
			textAfterBits += sizeOfLZSSPairInBits //add one pair's worth of bits

		}

		//console.log("");
		}


	$('#testText').html(stringToEncode);
	//$('#encodedText').html(stringToReturn);
	textBeforeBits = $('#testText').text().length * sizeOfCharacterInBits;	

	//stringToReturn;


		
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
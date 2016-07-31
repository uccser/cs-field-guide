var lempilZivSS = {};
this.slidingWindow = 2000;
this.textBeforeBits = 0;
this.textAfterBits = 0;	
this.sizeOfCharacterInBits = 8;
this.sizeOfLZSSPairInBits = 16;

this.encodedTextList = [];
this.allMatchObjects = [];

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
					
						timeStart = performance.now();
						lzssEncode(reader.result, slidingWindow);
						timeEnd = performance.now();
						//console.log("Call to lzssEncode with .txt file with length " + reader.result.length + " took " + (timeEnd - timeStart) + " milliseconds with sliding window of " + slidingWindow);
						//console.log("Text before encoding was " + textBeforeBits + " bits, and after it was " + textAfterBits + "bits which is a " + ((textAfterBits / textBeforeBits) * 100) + "% compression");
					
 					
 					/*
					//###execution time testing purposes, encodes string with many different sliding windows and outputs time taken
					
					var slidingWindows = [100, 500, 1000, 2000, 4000, 10000]

					for (var i = 0; i < slidingWindows.length; i++) {
					
						timeStart = performance.now();
						lzssEncode(reader.result, slidingWindows[i]);
						timeEnd = performance.now();
						//console.log("Call to lzssEncode with .txt file with length " + reader.result.length + " took " + (timeEnd - timeStart) + " milliseconds with sliding window of " + slidingWindows[i]);
						//console.log("Text before encoding was " + textBeforeBits + " bits, and after it was " + textAfterBits + "bits which is a " + ((textAfterBits / textBeforeBits)) + "% compression");
 						//console.log("");
					}
					*/
					
					//###########################################################
				}

				reader.readAsText(file);



			} else {
				fileDisplayArea.innerText = "File not supported!"
			}
		});
}

$(document).on('blur', 'input', function() {
	for (var i = 0; i < allMatchObjects.length; i++) {
		console.log(allMatchObjects[i].inputElement)
		if (allMatchObjects[i].inputElement == event.target) {
			console.log("text in this input should be " + allMatchObjects[i].validationString);
			console.log("text in the input actually is " + event.target.value);
			if (event.target.value == allMatchObjects[i].validationString) {
				console.log("Correct!");
			} else {
				console.log("incorrect!");
			}			
		}
	}
	console.log(event.target);

});

function encodeTextArea() {
	var textInTextArea = document.getElementById("text-to-encode-textarea").value;
	lzssEncode(textInTextArea, slidingWindow);
}

function lzssEncode(stringToEncode, slidingWindowLength) {
//make string to encode an array
	encodedTextList = [];
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
			encodedTextList.push(stringToEncode[stringIndex]); //for encoded text array things
			//console.log("appended " + stringToEncode[stringIndex]);
			stringIndex++
			textAfterBits += sizeOfCharacterInBits // add one character's worth of bits

		} else { // if something to encode, add <stepsBack, noCharacters> pair and skip forward that many characters in the string to encode
			//console.log("character " + stringToEncode[stringIndex] + ", index " + stringIndex + " encoded. longestMatch is " + longestMatch);
			//console.log("encode next " + longestMatch.length + " characters starting from " + indexOfLongestMatchStart);
			//console.log("stringIndex is " + stringIndex + " and matchIndex is " + matchIndex);
			$('#encodedText').append("<span style='color:red;'>" + "<" + ((stringIndex - indexOfLongestMatchStart)) + "," + longestMatch.length + ">" + "</span>")
			//$('#encodedText').append( "<span style="color:blue">" + "<"((stringIndex - indexOfLongestMatchStart)) + "," + longestMatch.length + ">" + "</span");

			//stuff for the encoded text array things
			var thisPairList = [(stringIndex - indexOfLongestMatchStart), longestMatch.length];
			encodedTextList.push(thisPairList);
			//////

			stringIndex += (longestMatch.length);
			textAfterBits += sizeOfLZSSPairInBits //add one pair's worth of bits



		}

		//console.log("");
	}

	$('#testText').html(stringToEncode);
	textBeforeBits = $('#testText').text().length * sizeOfCharacterInBits;	

	parseEncodedTextList(encodedTextList, stringToEncode.split(''));

}

function parseEncodedTextList(encodedTextList, rawTextList) {
	console.log(encodedTextList);
	console.log(rawTextList);


	var encodedTextListIterator = 0;

	var matchNumber = 0; //used to assign id to each match object

	for (var i = 0; i < rawTextList.length;) {
		current = rawTextList[i];
		if (encodedTextList[encodedTextListIterator] instanceof Array) {
			current = encodedTextList[encodedTextListIterator]
			matchLength = current[1];
			matchString = rawTextList.slice((i - current[0]), (i - current[0] + current[1])).join('');
			//console.log("Match text here should be " + matchString);


			newMatchObject = createMatchObject(current, matchString, matchNumber)
			matchNumber += 1;
			i += (matchLength);
			encodedTextListIterator += 1;

			$('#interactive-displayed-text').append(newMatchObject.divWithInput	);





		} else {
			$('#interactive-displayed-text').append(current);
			i++
			encodedTextListIterator += 1;
		}
		//console.log(current);
		//if encodedTextList[i[]]
	}
}

//each MatchObject will have a stepsBack, toEncode, what the text should say (for validation) and a div with a input inside it
function createMatchObject(matchArray, matchString, matchNumber) {

	var iDiv = document.createElement('div');
	iDiv.className = "interactive-input";
	iDiv.style.width = matchLength + "ch";
	iDiv.id = "matchDiv" + matchNumber;

	var input = document.createElement("INPUT");
	input.setAttribute("type", "text");
	input.setAttribute("maxLength", matchArray[1]);
	input.setAttribute("size", matchArray[1]);

	iDiv.appendChild(input)

	var matchObject = {
		matchNumber: matchNumber,
		stepsBack: matchArray[0],
		toEncode: matchArray[1],
		validationString: matchString,
		inputElement: input,
		divWithInput: iDiv
	}
	allMatchObjects.push(matchObject);

	return matchObject



}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function testLongStringTime(lengthOfStringToTest) {
	stringToTest = randomABCGenerator(lengthOfStringToTest) //length of teststring
	timeStart = performance.now();
	lzssEncode(stringToTest);
	timeEnd = performance.now();
	//console.log("Call to lzssEncode with " + lengthOfStringToTest + "characters took " + (timeEnd - timeStart) + " milliseconds.")


}






//lzssEncode(testString);
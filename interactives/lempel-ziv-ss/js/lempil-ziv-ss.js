var lempilZivSS = {};

// 'GLOBALS'
this.slidingWindow = 2000;
this.textBeforeBits = 0;
this.textAfterBits = 0;	
this.sizeOfCharacterInBits = 8;
this.sizeOfLZSSPairInBits = 16;
this.redHighlight = 'rgba(200, 0, 0, 0.2)';
this.greenHighlight = 'rgba(0, 200, 0, 0.2)';
this.blueHighlight = 'rgba(0, 0, 200, 0.2)';

this.levelTwoString = "I am Sam\nSam I am\n\nThat Sam-I-am!\nThat Sam-I-am!\n\nI do not like\nthat Sam-I-am!";
this.quickTestString = "I am Sam\nSam I am";
this.levelOneString = "Would you like them\nin a house?\nWould you like them\nwith a mouse?\n\nI do not like them\nin a house.\nI do not like them\nwith a mouse."

this.difficultyLevel = 1;
this.newLineRegex = /[^\x20-\x7E]/; //for newlines and other non-printable characters



/*
	var matchObject = {
		positionInString: positionInString,
		matchNumber: matchNumber,
		stepsBack: matchArray[0],
		toEncode: matchString.length,
		validationString: matchString,
		inputElement: input,
		//divWithInput: iDiv
	}*/

this.allMatchObjects = [];


//file input stuff
window.onload = function() {
	jsPlumb.setContainer(document.getElementById('interactive-displayed-text'));

	//########### File Input things#################
		// var fileInput = document.getElementById('fileInput');
		// var testText = document.getElementById('testText');

		// fileInput.addEventListener('change', function(e) {
		// 	var file = fileInput.files[0];
		// 	var textType = /text.*/;

		// 	if (file.type.match(textType)) {
		// 		var reader = new FileReader();

		// 		reader.onload = function(e) {
					
		// 				timeStart = performance.now();
		// 				lzssEncode(reader.result, slidingWindow);
		// 				timeEnd = performance.now();
		// 				//console.log("Call to lzssEncode with .txt file with length " + reader.result.length + " took " + (timeEnd - timeStart) + " milliseconds with sliding window of " + slidingWindow);
		// 				//console.log("Text before encoding was " + textBeforeBits + " bits, and after it was " + textAfterBits + "bits which is a " + ((textAfterBits / textBeforeBits) * 100) + "% compression");
					
 					
 					
		// 			//###execution time testing purposes, encodes string with many different sliding windows and outputs time taken
					
		// 			var slidingWindows = [100, 500, 1000, 2000, 4000, 10000]

		// 			for (var i = 0; i < slidingWindows.length; i++) {
					
		// 				timeStart = performance.now();
		// 				lzssEncode(reader.result, slidingWindows[i]);
		// 				timeEnd = performance.now();
		// 				//console.log("Call to lzssEncode with .txt file with length " + reader.result.length + " took " + (timeEnd - timeStart) + " milliseconds with sliding window of " + slidingWindows[i]);
		// 				//console.log("Text before encoding was " + textBeforeBits + " bits, and after it was " + textAfterBits + "bits which is a " + ((textAfterBits / textBeforeBits)) + "% compression");
 	// 					//console.log("");
		// 			}
					
					
		// 			//###########################################################
		// 		}

		// 		reader.readAsText(file);



		// 	} else {
		// 		fileDisplayArea.innerText = "File not supported!";
		// 	}
		// });


	//generate SVG element that covers whole page that will be used to draw arrows on

	//draw = SVG('drawing');

	lzssEncode(levelOneString, slidingWindow);



}

/*################## THINGS TO DO WITH THE INPUTS ############################### */

//mouseover and show index TODO:
$(document).on("mouseenter", ".highlight-square, .highlight-div-in-input", function() {
	var currentIndex = (event.target.id).match(/\d+$/)[0];
	//console.log(currentIndex);
	$('#index-counter').text("index: " + currentIndex);
	//console.log(event.target.id)
});

//checking inputs on change for validation
$(document).on('blur', 'input', function() {
	var allCorrect = true;
	for (var i = 0; i < allMatchObjects.length; i++) {

		//console.log(allMatchObjects[i].inputElement)
		if (allMatchObjects[i].inputElement == event.target) {
			//console.log("text in this input should be " + allMatchObjects[i].validationString);
			//console.log("text in the input actually is " + event.target.value);
			if (allMatchObjects[i].inputElement.value == allMatchObjects[i].validationString) {
				$(this).removeClass('input-incorrect');
				$(this).addClass('input-correct');
			} else {
				$(this).removeClass('input-correct');
				$(this).addClass('input-incorrect');
			}			
		}

		if (allMatchObjects[i].inputElement.value != allMatchObjects[i].validationString) {
			allCorrect = false;
		}
	}

	if (allCorrect == true) {
		//console.log("next button should show now!")
		$('#next-button').show()
	}
	//console.log(event.target);

});

//on mouseover an input, highlight what should go in the input
$(document).on('focus', '.interactive-input', function() {
	var correctMatchObject;
	for (var i = 0; i < allMatchObjects.length; i++) {
		if (allMatchObjects[i].inputElement == event.target) {
			correctMatchObject = allMatchObjects[i]; // this is the one we want 'coordinates' from
			//console.log(correctMatchObject)
		}
	}


	var startOfHighlighting = (correctMatchObject.positionInString - correctMatchObject.stepsBack);
	var endOfHighlighting = (startOfHighlighting + correctMatchObject.toEncode) - 1;

	if (difficultyLevel == 1) {
		levelOneHighlight(startOfHighlighting, endOfHighlighting, correctMatchObject, event.target);
	} else if (difficultyLevel == 2) {
		jsPlumb.detachEveryConnection();
		levelTwoHighlight(startOfHighlighting, endOfHighlighting, correctMatchObject);
	}
	
	//});
	//jsPlumb.repaintEverything()

})




function jsPlumbBox(startOfHighlighting, endOfHighlighting) {

	//direction defining - these all have a little bit of anchor offset applied
	var topLeft = [0,0,0,0,-3,-3];
	var bottomLeft = [0,1,0,0,-3,3];
	var topRight = [1,0,0, 0,3,-3];
	var bottomRight = [1,1,0,0,3,3];

	

	//bottom line
	jsPlumb.connect({
		connector: 'Straight',
		endpoint:'Blank',
		paintStyle:{ strokeStyle: "black", lineWidth:2 },
		source: 'highlight' + startOfHighlighting,
		target: 'highlight' + (endOfHighlighting),
		anchors: [bottomLeft, bottomRight]
	})

	//top line
	jsPlumb.connect({
		connector: 'Straight',
		endpoint:'Blank',
		paintStyle:{ strokeStyle: "black", lineWidth:2 },
		source: 'highlight' + startOfHighlighting,
		target: 'highlight' + (endOfHighlighting),
		anchors: [topLeft, topRight]
	})

	//left line
	jsPlumb.connect({
		connector: 'Straight',
		endpoint:'Blank',
		paintStyle:{ strokeStyle: "black", lineWidth:2 },
		source: 'highlight' + startOfHighlighting,
		target: 'highlight' + startOfHighlighting,
		anchors: [topLeft, bottomLeft] 
	})

	//right line
	jsPlumb.connect({
		connector: 'Straight',
		endpoint:'Blank',
		paintStyle:{ strokeStyle: "black", lineWidth:2 },
		source: 'highlight' + (endOfHighlighting),
		target: 'highlight' + (endOfHighlighting),
		anchors: [topRight, bottomRight]
	})

}

function jsPlumbUnderline(startOfHighlighting, endOfHighlighting) {
	var bottomLeft = [0,1,0,0,-3,3];
	var bottomRight = [1,1,0,0,3,3];

	//console.log("startOfHighlighting is: " + startOfHighlighting + " and endOfHighlighting is: " + endOfHighlighting)

	//bottom line
	jsPlumb.connect({
		connector: 'Straight',
		endpoint:'Blank',
		paintStyle:{ strokeStyle: "black", lineWidth:2 },
		source: 'highlight' + startOfHighlighting,
		target: 'highlight' + (endOfHighlighting),
		anchors: [bottomLeft, bottomRight]
	})

}


$(document).on('focusout', '.interactive-input', function() {
	jsPlumb.detachEveryConnection();
	for (var i = 0; i < allMatchObjects.length; i++) {
		if (allMatchObjects[i].inputElement == event.target) {
			var correctMatchObject = allMatchObjects[i]; // this is the one we want 'coordinates' from
		}
	}
	var startOfHighlighting = (correctMatchObject.positionInString - correctMatchObject.stepsBack);
	var endOfHighlighting = (startOfHighlighting + correctMatchObject.toEncode);
	$('.highlight-square').slice(startOfHighlighting, endOfHighlighting).removeClass('highlighted');
})

function levelOneHighlight(startOfHighlighting, endOfHighlighting, correctMatchObject, sourceInput) {
	$('.highlight-square').slice(startOfHighlighting, endOfHighlighting + 1).addClass('highlighted');

	var middleOfHighlighting = ~~((endOfHighlighting + startOfHighlighting) / 2);
	var endElement = $('#highlight' + endOfHighlighting); 
	var startInputElement = $(event.target);
	var pairString = "<" + correctMatchObject.stepsBack + "," + correctMatchObject.toEncode + ">";
	//console.log(endMiddleElement)

	// arrow from input to highlighting
    jsPlumb.connect({
		source:'highlight' + ((correctMatchObject.positionInString) + ~~(correctMatchObject.toEncode / 2)),
		target:'highlight' + middleOfHighlighting,
		connector:'Straight',
		anchors: ['TopCenter', 'Bottom'],
		paintStyle:{ strokeStyle:"blue", lineWidth:4 },
        overlays:[ 
            ["Arrow" , { width:15, length:15, location:1 }],
            ["Label" , {label:pairString, id:"label", labelStyle: {fillStyle:"white", font:"75% Courier New", color:'red', borderWidth:'1', borderStyle:'blue'}}]
        ],
		endpoint:'Blank'
	});

	//draw box around highlighted elements
	//console.log("startOfHighlighting: " + startOfHighlighting + " endOfHighlighting: " + endOfHighlighting);
	jsPlumbBox(startOfHighlighting, endOfHighlighting);
}

function changeToLevelTwo() {
	difficultyLevel = 2;
	jsPlumb.detachEveryConnection();
	lzssEncode(levelTwoString, slidingWindow);
	//console.log(rawTextList);
	//console.log(encodedTextList);
	//console.log("Level two!");
}

function levelTwoHighlight(startOfHighlighting, endOfHighlighting, correctMatchObject) {
	var middleOfHighlighting = ~~((endOfHighlighting + startOfHighlighting) / 2);

	$('.highlight-square').slice(startOfHighlighting, endOfHighlighting + 1).addClass('highlighted');	
	var pairString = "<" + correctMatchObject.stepsBack + "," + correctMatchObject.toEncode + ">";


    jsPlumb.connect({
		source:'highlight' + ((correctMatchObject.positionInString) + ~~(correctMatchObject.toEncode / 2)),
		target:'highlight' + middleOfHighlighting,
		connector:'Straight',
		anchors: ['TopCenter', 'Bottom'],
		paintStyle:{ strokeStyle:"blue", lineWidth:0.05 },
        overlays:[ 
            //["Arrow" , { width:10, length:10, location:1 }],
            ["Label" , {label:pairString, id:"label",color:'red', location:0.1, labelStyle: {fillStyle:"white", font:"75% Courier New", color: 'red'}}]
        ],
		endpoint:'Blank'
	});

	jsPlumbUnderline(startOfHighlighting, endOfHighlighting);
}
/*######################################### #######################################*/


function encodeTextArea() {
	var textInTextArea = document.getElementById("text-to-encode-textarea").value;
	lzssEncode(textInTextArea, slidingWindow);
}

function lzssEncode(rawStringToEncode, slidingWindowLength) {

	//var stringToEncode = rawStringToEncode.replace(/[^\x20-\x7E]+/g, " "); // replace non-printable characters (newline, tab, etc.) with space
	var stringToEncode = rawStringToEncode;
//make string to encode an array
	var encodedTextList = [];
	var textBeforeBits = 0;
	var textAfterBits = 0;	
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

		//console.log("currentReadString is " + currentReadString);
		

		//stop looking back when we either hit the start of the string or we're at edge of sliding window
			for (matchIndex = stringIndex - 1; (((matchIndex > 0) && ((stringIndex - matchIndex) < slidingWindowLength))); matchIndex--) {
				if ((stringToEncode[stringIndex - matchIndex].match(newLineRegex) != null)) {

					//console.log(stringToEncode[matchIndex]);
					//console.log("newline found on way back!");
					//continue;
				} else {
					//console.log("gone back " + String(stringIndex - matchIndex) + " characters");
					howManyForward = 1;
					currentReadString = stringToEncode.slice(stringIndex, (stringIndex + 1))
					currentMatchString = stringToEncode.slice(matchIndex, (matchIndex + 1))
					//console.log("	currently at position " + matchIndex +", currentReadString is " + currentReadString + ", currentMatchString is " + currentMatchString);
					while ((currentReadString === currentMatchString) && longestMatch.length < 16) {
						if (currentReadString.match(newLineRegex)) {
							//console.log("there's a newline in this match string!!! do something about it!!!");
							break;
						}
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
			}

			//if nothing to encode
			//console.log("matchIndex is " + matchIndex);
			if ((indexOfLongestMatchStart == -1) || (longestMatch.length < 3)) {
				//console.log("No long enough found, not encoding, appended '" + stringToEncode[stringIndex] + "'");
				//console.log("");
				$('#encodedText').append(stringToEncode[stringIndex]);
				encodedTextList.push(stringToEncode[stringIndex]); //for encoded text array things
				stringIndex++
				textAfterBits += sizeOfCharacterInBits // add one character's worth of bits

			} else if (stringToEncode[stringIndex].match(newLineRegex)) {
				//console.log("character was a newline, just going to add a newline to encodedText, a newline to encodedTextList, increment stringIndex, and not do anything else");
				//console.log("");
				$('#encodedText').append(stringToEncode[stringIndex]);
				encodedTextList.push(stringToEncode[stringIndex]);
				stringIndex++


				} else {
	 // if something to encode, add <stepsBack, noCharacters> pair and skip forward that many characters in the string to encode
				//console.log("character " + stringToEncode[stringIndex] + ", index " + stringIndex + " encoded. longestMatch is " + longestMatch);
				//console.log("encode next " + longestMatch.length + " characters starting from " + indexOfLongestMatchStart);
				//console.log("stringIndex is " + stringIndex + " and matchIndex is " + matchIndex);
				//console.log("");

				//take out new lines

				$('#encodedText').append("<span style='color:red;'>" + "<" + ((stringIndex - indexOfLongestMatchStart)) + "," + longestMatch.length + ">" + "</span>")
				//$('#encodedText').append( "<span style="color:blue">" + "<"((stringIndex - indexOfLongestMatchStart)) + "," + longestMatch.length + ">" + "</span");

				//stuff for the encoded text array things
				var thisPairList = [(stringIndex - indexOfLongestMatchStart), longestMatch.length, rawStringToEncode.slice((stringIndex - indexOfLongestMatchStart), ((stringIndex - indexOfLongestMatchStart) + longestMatch.length + 1))];
				encodedTextList.push(thisPairList);
				//////

				stringIndex += (longestMatch.length);
				textAfterBits += sizeOfLZSSPairInBits //add one pair's worth of bits
			}


			
		}	
		

		//console.log("");
	

	$('#testText').html(stringToEncode);
	textBeforeBits = $('#testText').text().length * sizeOfCharacterInBits;	

	parseEncodedTextList(encodedTextList, stringToEncode.split(''));

}

function parseEncodedTextList(encodedTextList, rawTextList) {
	$('#interactive-displayed-text').empty();
	console.log(encodedTextList);
	var encodedTextListIterator = 0;

	var matchNumber = 0; //used to assign id to each match object
	var howManyAcross = 0;
	var howManyDown = 0; // for creating net divs to now how many em across and down the div needs to be placed

	var numberOfCharactersThisLine = 0;

	for (var i = 0; i < rawTextList.length;) {
		current = rawTextList[i];



		//if it's a match pair
		if (encodedTextList[encodedTextListIterator] instanceof Array) {


			current = encodedTextList[encodedTextListIterator]
			
			matchString = rawTextList.slice((i - current[0]), (i - current[0] + current[1])).join('');
			matchString = matchString.replace(/(\r\n|\n|\r)/gm,"");;
			//console.log(matchString);
			matchLength = matchString.length;
			//newMatchObject = createMatchObject(i, current, matchString, matchNumber)

			//console.log("Match text here should be " + matchString);

			//create a div that's as wide as the input
			var inputDiv = document.createElement("DIV");
			inputDiv.className += "input-highlight-container-div";
			inputDiv.setAttribute("style","width:" + matchLength + "ch");
			inputDiv.id = 'inputDiv' + matchNumber;

			for (var j = 0; j < matchLength; j++) {
				var highlightDiv = document.createElement("DIV");
				highlightDiv.id = "highlight" + (i + j);
				highlightDiv.className += 'highlight-div-in-input'
				highlightDiv.className += ' highlight-square';
				highlightDiv.setAttribute("style", "left:" + (j) + "ch");
				//highlightDiv.style.background = greenHighlight

				inputDiv.appendChild(highlightDiv);


	
			}
			$('#interactive-displayed-text').append(inputDiv);

			//create the input form
			newMatchObject = createMatchObject(i, current, matchString, matchNumber)
			matchNumber += 1;
			
			encodedTextListIterator += 1;


			inputDiv.appendChild(newMatchObject.inputElement);




			i += (matchLength);
			numberOfCharactersThisLine += (matchLength);

		} else {
			encodedTextListIterator += 1;

			highlightDiv = createHighlightDiv(i, howManyAcross, howManyDown);
			//console.log("howManyAcross is: " + howManyAcross + " and howManyDown is: " + howManyDown);
			howManyAcross += 1;
			highlightDiv.innerHTML = current;
			netDiv = document.createElement("DIV");
			//$(netSpan).append(netDiv);
			var containerDiv = document.createElement("DIV");
			containerDiv.id = ("container" + i);
			//$(containerDiv).css('display', 'inline');
			//$(containerDiv).css('position', 'relative');

			$('#interactive-displayed-text').append(highlightDiv);


			//$(containerDiv).append(highlightDiv);

			//create index holding div and pu in container div too
			//createIndexHoldingDiv(i, containerDiv)


			i++;
			numberOfCharactersThisLine++;

			if (current.match(newLineRegex)) {
			//($'#interactive-displayed-text').append('\n');

				for (var j = 0; j < numberOfCharactersThisLine; j++) {
			    	var indexSpan = document.createElement("SPAN");
			    	indexSpan.className += "index-holding-span";
			    	indexSpan.innerHTML = (i + j);
			    	$('#interactive-displayed-text').append(indexSpan);
				}
				var br = document.createElement('br');

				$('#interactive-displayed-text').append(br);
		
			numberOfCharactersThisLine = 0;
			}

		}
	}
}

function makeIndexTrackerLine(numberOfCharacters) {
	for (var i = 0; i < numberOfCharacters; i++) {
		
	}
	var oneCharacterSpan = document.createElement("SPAN");


	

}


function createHighlightDiv(divIndex) {

	var highlightDiv = document.createElement("DIV");
	
	//highlightDiv.className = "highlight" + divIndex;
	highlightDiv.className += " highlight-square"
	highlightDiv.id = "highlight" + divIndex;

	$('containerDiv').append(highlightDiv);

	$(highlightDiv).css('display', 'inline');
	//$(highlightDiv).css('position', 'absolute');
	//$(highlightDiv).css('top', '0');



	/*"debug"
	if ((divIndex % 2) == 0) {
		netSpan.style.background = redHighlight;
	} else {
		netSpan.style.background = blueHighlight;
	}
	*/

	return highlightDiv;
}

function createInputHighlightDiv() {

}

//each MatchObject will have a stepsBack, toEncode, what the text should say (for validation) and a div with a input inside it
function createMatchObject(positionInString, matchArray, matchString, matchNumber) {

	var input = document.createElement("INPUT");

	input.setAttribute("maxLength", matchString.length);
	input.setAttribute("size", matchString.length);
	input.className += 'interactive-input';
	input.id = 'input' + matchNumber;

	//iDiv.appendChild(input)

	var matchObject = {
		positionInString: positionInString,
		matchNumber: matchNumber,
		stepsBack: matchArray[0],
		toEncode: matchString.length,
		validationString: matchString,
		inputElement: input,
		//divWithInput: iDiv
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
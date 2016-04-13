//onload make array of 5 random ints
//TODO: work out how to put number holding divs 'under' the box divs, then make them slide up
this.randomInts = [];
this.largest = 0;
this.numberOfBoxes = 15
this.boxes = []

$(document).ready(function(){
	generateRandomNumbers();
	createBoxObjects();
	createBoxElements();
	console.log(boxes);
	console.log(randomInts)

	//createBoxes();
	//createIntHoldingDivs();


	$(".intHoldingDiv").click(function() {
		console.log("intHoldingDiv clicked!");
	})

	// makes number fade in then out
	$(".box").click(function() {
		for (var i = 0; i < (boxes.length); i++) { 
			if (document.getElementById('box' + i) ==  event.target) {
				$('#intHoldingDiv' + i).fadeIn(1000).delay(1000).fadeOut(1000);
				boxes[i].revealed_times += 1;
				console.log(boxes[i])

			}
		}
			
	})
})
function generateRandomNumbers() {
		for (var i = 0; i < (numberOfBoxes); i++) {
		var currentInt = getRandomInt(1, 100);
		randomInts[i] = currentInt;
	}
	//assign largest of the 5 random ints to largest
	largest = Math.max.apply(Math, randomInts);
}

function createBoxElements() {
	for (var i = 0; i < (boxes.length); i++) {
		var boxObject; //JS object that will hold the id, int and both elements
		var currentBox = boxes[i]

		//"container" div
		var iContainer = document.createElement('div');
		iContainer.id = ('boxContainer' + i);
		iContainer.className = 'boxContainer';
		document.getElementById('box_holder_div').appendChild(iContainer);

		//"box (covering the div holding number"
		var boxDiv = document.createElement('div');
		boxDiv.id = ('box' + i);
		boxDiv.className = 'box';
		currentBox.divElement = boxDiv;
		iContainer.appendChild(boxDiv);

		//divs that hold the numbers
		var intHoldingDiv = document.createElement('div');
		intHoldingDiv.id = ('intHoldingDiv' + i);
		intHoldingDiv.className = 'intHoldingDiv';
		intHoldingDiv.innerHTML = currentBox.boxInt;
		currentBox.intHoldingDivElement = intHoldingDiv;
		iContainer.appendChild(intHoldingDiv);
	}
}	

//creates the JS objects with just the id and the random int, leaving space for the HTML elements
function createBoxObjects() {
	for (var i = 0; i < numberOfBoxes; i++) {
		var boxObject = {
			boxNumber: i,
			divElement: null,
			boxInt: randomInts[i],
			intHoldingDivElement: null,
			revealed_times: 0
		}
		boxes[i] = boxObject;
	}
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function validateForm() {
    var x = document.forms["myForm"]["submittedInt"].value;
	var box_revealed_more_than_once = false;
	var box_revealed_no_times = false;


    //if form value is a number
	if (!(isNaN(x))) 
	{
		if (parseInt(x) == largest) { // correct answer
			for (var i = 0; i < (boxes.length); i++) {
				if (boxes[i].revealed_times > 1) {
					box_revealed_more_than_once = true;
				} else if (boxes[i].revealed_times == 0) {
					box_revealed_no_times = true;
				}
			}

			//after checking how many times each box has been revealed...
			if (box_revealed_no_times) {
				alert("Correct! But you missed a box... Got lucky this time!");
			} else if (box_revealed_more_than_once) {
				alert("Correct! But you could've been more efficient...");
			} else {
				alert("Correct! You've found how to complete this challenge the most efficient way!");
			}

			return false; //will use alerts for now to sort out logic	 
		} else {
			alert("Incorrect!");
			return false;
		}
	}
	//must not be a number if we're here
	alert("Must input numbers");
	return false;
}


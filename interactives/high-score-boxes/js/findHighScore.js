//onload make array of 5 random ints
//TODO: work out how to put number holding divs 'under' the box divs, then make them slide up
this.randomInts = [];
this.largest = 0;
this.numberOfBoxes = 15
this.boxes = []

$(document).ready(function(){
	generateRandomNumbers();
	createBoxObjects();
	console.log(boxes);
	createBoxElements();
	//createBoxes();
	//createIntHoldingDivs();


	//initialises onclick
	$(".intHoldingDiv").click(function() {
		console.log("intHoldingDiv clicked!");

	})

	$(".box").click(function() {
		console.log("box clicked!");
	})
})


/*
function onLoadFunction() {
	for (var i = 4; i >= 0; i--) {
		var currentInt = getRandomInt(1, 100);
		randomInts[i] = currentInt;
	}
	//assign largest of the 5 random ints to largest
	largest = Math.max.apply(Math, randomInts);
	createBoxes();
	console.log((randomInts.toString() + " " + largest.toString()));
	console.log(boxes);
	}
*/
function generateRandomNumbers() {
		for (var i = 0; i < (numberOfBoxes); i++) {
		var currentInt = getRandomInt(1, 100);
		randomInts[i] = currentInt;
	}
	//assign largest of the 5 random ints to largest
	largest = Math.max.apply(Math, randomInts);
}

function createBoxElements() {
	console.log('we in createBoxElements!')
	for (var i = 0; i < (boxes.length); i++) {
		console.log('i is currently ' + i);
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

function createIntHoldingDivs() {
	for (var i = 0; i < (numberOfBoxes); i++) {
		var intHoldingDiv = document.createElement('div');
		intHoldingDiv.id = ("int_holder_div" + i);
		intHoldingDiv.className = "intHoldingDiv"
		intHoldingDiv.innerHTML = boxes[i].boxInt;
		boxes[i].intHoldingDivElement = intHoldingDiv;
		document.getElementById('box' + i).appendChild(intHoldingDiv);
	}

}
//creates the JS objects with just the id and the random int, leaving space for the HTML elements
function createBoxObjects() {
	for (var i = 0; i < numberOfBoxes; i++) {
		var boxObject = {
			boxNumber: i,
			divElement: null,
			boxInt: randomInts[i],
			intHoldingDivElement: null
		}
		boxes[i] = boxObject;
	}
}

/*
function addOnMouseClicks(boxes) {
	for (var i = 0; i < boxes.length; i++) {
		console.log(boxes[i].element)
		boxes[i].element.onmouseover=function(){
			console.log(boxes[i]);
			boxes[i].element.innerHTML = boxes[i].boxInt;
		}
	}
}
*/

function getBoxObjectFromBoxId(boxId) {
	//TODO: this
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function boxMouseOver(boxElement) {
	for (var i = 0; i < boxes.length; i++) {
		if (boxes[i].element === boxElement) {
			boxes[i].element.innerHTML = boxes[i].boxInt;
		}	    
	}
}

function boxMouseOut(boxElement) 
{
	for (var i = 0; i < boxes.length; i++) {
		if (boxes[i].element === boxElement) {
			boxes[i].element.innerHTML = "This is BOX " + boxes[i].boxNumber;
		}	    
	}
}

function validateForm() {
    var x = document.forms["myForm"]["submittedInt"].value;

    //if form value is a number
	if (!(isNaN(x))) 
	{
		if (parseInt(x) == largest) {
			return true;	 
		} else {
			alert("Incorrect!");
			return false;
		}
	}

	
	//must not be a number if we're here
	alert("Must input numbers");
	return false;
}


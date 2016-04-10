//onload make array of 5 random ints
//TODO: work out how to put number holding divs 'under' the box divs, then make them slide up
var randomInts = [];
var largest = 0;
var numberOfBoxes = 15
var boxes = []

$(document).ready(function(){
	generateRandomNumbers();
	createBoxElements();
	createBoxes();
	createIntHoldingDivs();
	console.log((randomInts.toString() + " " + largest.toString()));
	console.log(boxes);

	$(".box").click(function() {
	console.log("box clicked!");
	for (var i = 0; i < boxes.length; i++) {
n		if (boxes[i].element === event.target) {
			console.log("element matched!");
			event.target.innerHTML = boxes[i].boxInt;
			$("#int_holder_div" + i).slideUp("slow");
						}	    
	}

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
		for (var i = 0; i < (numberOfBoxes); i++) {

		var iDiv = document.createElement('div');
		iDiv.id = ('box' + i);
		iDiv.className = 'box';
		//iDiv.innerHTML = 'REEEEEE';

		document.getElementById('box_holder_div').appendChild(iDiv);
	}
}	

function createIntHoldingDivs() {
	for (var i = 0; i < (numberOfBoxes); i++) {
		var intHoldingDiv = document.createElement('div');
		intHoldingDiv.id = ("int_holder_div" + i);
		intHoldingDiv.innerHTML = boxes[i].boxInt;
		boxes[i].intHoldingDivElement = intHoldingDiv;
		document.getElementById('box' + i).appendChild(intHoldingDiv);
	}

}
function createBoxes() {
	for (var i = 0; i < numberOfBoxes; i++) {
		var boxObject = {
			boxNumber: i,
			element: document.getElementById('box' + i),
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


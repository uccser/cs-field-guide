//onload make array of 5 random ints

var randomInts = [];
var boxes = [];
var largest = 0;
var numberOfBoxes = 15

$(document).ready(function(){
	for (var i = 0; i < (numberOfBoxes); i++) {
		var currentInt = getRandomInt(1, 100);
		randomInts[i] = currentInt;
	}
	//assign largest of the 5 random ints to largest
	largest = Math.max.apply(Math, randomInts);
	createBoxes();
	console.log((randomInts.toString() + " " + largest.toString()));
	console.log(boxes);
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

function createBoxElements() {


}
function createBoxes() {
	for (i = 0; i < numberOfBoxes; i++) {
		var boxObject = {
			boxNumber: i,
			element: document.getElementById('box' + i),
			boxInt: randomInts[i]
		}
		boxes[i] = boxObject;
	}
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


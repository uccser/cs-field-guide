var HighScoreBoxes = {};
HighScoreBoxes.randomInts = [];
HighScoreBoxes.largestNumber = 0;
HighScoreBoxes.numberOfBoxes = 11;
HighScoreBoxes.boxes = [];
HighScoreBoxes.gameStarted = false;
HighScoreBoxes.secondsTaken = 0;
HighScoreBoxes.timerVar;
HighScoreBoxes.availableBoxImages = 15;

$(document).ready(function(){
    // Setup interactive on load
    resetHighScoreBoxes();

	$('#restart-button').click(function() {
		$('#boxes-container').empty();
		HighScoreBoxes.secondsTaken = 0;
		HighScoreBoxes.gameStarted = false;
		if (typeof HighScoreBoxes.timerVar !== 'undefined') {
			clearTimeout(HighScoreBoxes.timerVar);
		}
        resetHighScoreBoxes();
	});

    $('#submit-button').on('click', function(){
      processInput();
    });

    $('#boxes-container').on('click', '.box', function(event) {
        $box = $(this);
        // Stop all box animations
    	$('.box').finish();
        box_number = $box.attr('id').substring(3)
        $(this).fadeOut(1000, function(){
            $(this).fadeIn(1000);
            $(this).addClass('clicked');
        });
    	HighScoreBoxes.boxes[box_number].revealed_times += 1;

    	//to start timer only if it hasn't started yet
    	if (!HighScoreBoxes.gameStarted) {
			HighScoreBoxes.gameStarted = true;
			HighScoreBoxes.timerVar = setInterval(incrementTimer, 1000);
    	}
    });
});


function resetHighScoreBoxes() {
    generateRandomNumbers();
    createBoxObjects();
    createBoxElements();
    $('#restart-button').hide();
    $('#completion-message').html('');
    $('#interactive-high-score-boxes-input').val('');
}


// Increment timer value by 1
function incrementTimer() {
	HighScoreBoxes.secondsTaken += 1;
}


// Create random numbers for boxes
function generateRandomNumbers() {
	var intervals = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
	shuffle(intervals);
	var twoIntervals = intervals.slice(0, 2);
	twoIntervals.sort();

	for (var i = 0; i < (HighScoreBoxes.numberOfBoxes); i++) {
		var currentInt = getRandomInt(twoIntervals[0], twoIntervals[1]);
		while (HighScoreBoxes.randomInts.indexOf(currentInt) != -1) {
			var currentInt = getRandomInt(twoIntervals[0], twoIntervals[1]);
		}
		HighScoreBoxes.randomInts[i] = currentInt;
	}

	HighScoreBoxes.largestNumber = Math.max.apply(Math, HighScoreBoxes.randomInts);
}


// Create box elements inside container
function createBoxElements() {
	var box_images = Array.apply(null, Array(HighScoreBoxes.availableBoxImages)).map(function (_, i) {return i;});
	shuffle(box_images);
	for (var i = 0; i < (HighScoreBoxes.numberOfBoxes); i++) {
		var currentboxObject = HighScoreBoxes.boxes[i]

		// Box container
		var box_container = document.createElement('div');
		box_container.draggable = false;
		box_container.id = ('boxContainer' + i);
		box_container.className = 'boxContainer';
		document.getElementById('boxes-container').appendChild(box_container);

		//clearing a random direction's margin for the messy look
		randomIntForMargin = getRandomInt(0, 10);

		if (randomIntForMargin <= 4) {
			box_container.style.paddingLeft = (randomIntForMargin / 2) + 'rem';
        }
		else {
			box_container.style.paddingRight = ((randomIntForMargin - 4) / 2) + 'rem';
        }

		// Box image (covering a number)
		var box_image = document.createElement('img');
		box_image.id = 'box' + i;
		box_image.className = 'box';
        box_image.draggable = false;
		box_image.src = colourful_box_images[i];
		currentboxObject.divElement = box_image;

		//divs that hold the numbers
		var box_number = document.createElement('div');
		box_number.className = 'box_number';
        box_number.draggable = false;
		box_number.innerHTML = currentboxObject.boxInt;
		currentboxObject.intHoldingDivElement = box_number;

        // Append elements to box container
        box_container.appendChild(box_image);
		box_container.appendChild(box_number);
	}
}

// Creates JS objects for storing box data
function createBoxObjects() {
	for (var i = 0; i < HighScoreBoxes.numberOfBoxes; i++) {
		var boxObject = {
			boxNumber: i,
			divElement: null,
			boxInt: HighScoreBoxes.randomInts[i],
			intHoldingDivElement: null,
			revealed_times: 0
		}
		HighScoreBoxes.boxes[i] = boxObject;
	}
}


// Process submitted user answer
function processInput() {
    var user_answer = document.getElementById('interactive-high-score-boxes-input').value;
	var box_revealed_more_than_once = false;
	var box_revealed_no_times = false;
    var $feedback = $('#completion-message');

    //if form value is a number
	if (!(isNaN(user_answer))) {
		if (parseInt(user_answer) == HighScoreBoxes.largestNumber) { // correct answer
			for (var i = 0; i < (HighScoreBoxes.boxes.length); i++) {
				if (HighScoreBoxes.boxes[i].revealed_times > 1) {
					box_revealed_more_than_once = true;
				} else if (HighScoreBoxes.boxes[i].revealed_times == 0) {
					box_revealed_no_times = true;
				}
			}

			//after checking how many times each box has been revealed...
			if (box_revealed_no_times) {
				$feedback.html(gettext('Correct! But you missed a box... You got lucky this time!'));
			} else if (box_revealed_more_than_once) {
				$feedback.html(gettext("Correct! But you could've been more efficient..."));
			} else {
				format = gettext("Correct! You've found how to complete this challenge the most efficient way!\nYour time was %(seconds_taken)s seconds.");
				feedback_text = interpolate(format, {"seconds_taken": HighScoreBoxes.secondsTaken}, true);
				$feedback.html(feedback_text);
			}
            $('#restart-button').show();
		} else {
			$feedback.html(gettext('Incorrect!'));
			$('#restart-button').show();
		}
	} else {
        // Submitted value is not a number
        $feedback.html(gettext('Inputted value must be a whole number'));
    }
}


// ULTILITY FUNCTIONS

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

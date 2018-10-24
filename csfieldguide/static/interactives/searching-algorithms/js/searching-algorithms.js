var starting_num_guesses;
var num_guesses;
var target;
var start_level;
var end_level;
var current_level;
var num_boxes;
var sorted;
var found = false;

var preset_levels = {
	1: {
		"num-boxes": 5,
		"sorted": "Random",
		"num-guesses": 6
	},
	2: {
		"num-boxes": 9,
		"sorted": "Random",
		"num-guesses": 10
	},
	3: {
		"num-boxes": 9,
		"sorted": "Sorted",
		"num-guesses": 5
	},
	4: {
		"num-boxes": 25,
		"sorted": "Sorted",
		"num-guesses": 5
	}
}

window.addEventListener("DOMContentLoaded", function() {
	document.getElementById('interactive-searching-algorithms-next-level').addEventListener("click", nextLevel);
	document.getElementById('interactive-searching-algorithms-restart-level').addEventListener("click", loadLevel);
	document.getElementById('interactive-searching-algorithms-restart-start-level').addEventListener("click", goToStartLevel);
	var url_string = window.location.href;
	setInterfaceParameters(url_string);
	setUpInterface();
});


function setInterfaceParameters(url_string) {
	var url = new URL(url_string);

	start_level = url.searchParams.get('start-level');
	end_level = url.searchParams.get('end-level');

	num_boxes = url.searchParams.get('num-boxes'); // get num boxes parameter
	sorted = url.searchParams.get('sorted'); // get sorted/not sorted parameter
	starting_num_guesses = url.searchParams.get('num-guesses'); // get num guesses parameter

    // if start level and end level given, set the level parameters
    if (start_level != null && end_level != null) {
    	setNextLevelParameters(start_level);
    } else if (num_boxes != null && sorted != null && starting_num_guesses != null) { // else use the settings from the url parameters
	    num_guesses = starting_num_guesses;
    } else {
		start_level = 1;
		end_level = 4;
		setNextLevelParameters(start_level);
	}

    current_level = start_level;

    if (sorted == 'true') {
    	sorted = gettext('Sorted');
    } else if (sorted == 'false') {
    	sorted = gettext('Random');
    }
}


function setNextLevelParameters(level) {
	// set the parameters for the next level
	num_boxes = preset_levels[level]['num-boxes']; // get num boxes parameter
    sorted = preset_levels[level]['sorted']; // get sorted/not sorted parameter
    starting_num_guesses = preset_levels[level]['num-guesses']; // get num guesses parameter
    num_guesses = starting_num_guesses;
}


function setUpInterface() {
	// fill in the rules
	document.getElementById('interactive-searching-algorithms-num-boxes').innerText = num_boxes;
	document.getElementById('interactive-searching-algorithms-num-guesses').innerText = num_guesses;
	document.getElementById('interactive-searching-algorithms-order').innerText = sorted;
	document.getElementById('interactive-searching-algorithms-num-guesses-used').innerText = 0;

	var found_text = document.getElementById('interactive-searching-algorithms-found');
	if (found_text.classList.contains('show-message')) {
		found_text.classList.remove('show-message');
		found_text.classList.add('hide-message');
	}
	var no_guesses = document.getElementById('interactive-searching-algorithms-no-guesses');
	if (no_guesses.classList.contains('show-message')) {
		no_guesses.classList.remove('show-message');
		no_guesses.classList.add('hide-message');
	}
	var next_level_button = document.getElementById('interactive-searching-algorithms-next-level');
	next_level_button.classList.remove('show-message');
	next_level_button.classList.add('hide-message');

	var rules_div = document.getElementById('interactive-searching-algorithms-default-rules');
	rules_div.classList.remove('hide-message');
	rules_div.classList.add('show-message');

	target = Math.floor(Math.random() * Math.floor(num_boxes));
	// create box elements and assign random weights
	var box_div = document.getElementById('interactive-searching-algorithms-boxes');
	// remove any existing boxes
	while (box_div.firstChild) {
		box_div.removeChild(box_div.firstChild);
	}

	var weight_list = []
	for (var i = 0; i < num_boxes; i++) {
		weight_list.push(Math.floor(Math.random() * Math.floor(999)) + 1);
	}
	if (sorted == "Sorted") {
		weight_list.sort();
	}

	for (var i = 0; i < num_boxes; i++) {
		var weight = weight_list[i];
		var random_square_number = Math.floor(Math.random() * Math.floor(15));
		var src_string = colourful_box_images[random_square_number];

		var img_div = document.createElement('div');

		var img_weight = document.createElement('p');
		img_weight.classList.add('interactive-searching-algorithms-box-weight');
		img_weight.innerText = weight;

		var img_number = document.createElement('p');
		img_number.classList.add('interactive-searching-algorithms-box-number');
		img_number.innerText = gettext('Box') + ' ' + (i+1);

		var img_element = document.createElement('img');
		img_element.setAttribute('src', src_string);
		img_element.setAttribute('data-weight', weight);
		img_element.addEventListener("click", fadeBox);

		img_div.appendChild(img_element);
		img_div.appendChild(img_weight);
		img_div.appendChild(img_number);
		box_div.appendChild(img_div);

		if (i == target) {
			target = weight;
		}
	}

	document.getElementById('interactive-searching-algorithms-target').innerText = target;
}


function fadeBox(event) {
	var clicked_box = event.srcElement;
	clicked_box.classList.add('fade'); // fade clicked box

	var box_weight = clicked_box.nextElementSibling;
	box_weight.classList.add('show'); // show weight of clicked box

	decreaseGuessCount();
	if (target == box_weight.innerText) {
		found = true;
		// hide rules
		document.getElementById('interactive-searching-algorithms-default-rules').classList.remove('show-message');
		document.getElementById('interactive-searching-algorithms-default-rules').classList.add('hide-message');
		// show winning message
		var num_guesses_used = starting_num_guesses - num_guesses;
		document.getElementById('interactive-searching-algorithms-found').classList.remove('hide-message');
		document.getElementById('interactive-searching-algorithms-found').classList.add('show-message');
		document.getElementById('interactive-searching-algorithms-num-guesses-used').innerText = num_guesses_used;
		// disable boxes
		disableBoxes();
		// show next button
		console.log(current_level);
		console.log(end_level);
		if (current_level < end_level) {
			document.getElementById('interactive-searching-algorithms-next-level').classList.remove('hide-message');
			document.getElementById('interactive-searching-algorithms-next-level').classList.add('show-message');
		}
	}
}

function disableBoxes() {
	var box_divs = document.getElementById('interactive-searching-algorithms-boxes').children;
	for (var i = 0; i < box_divs.length; i++) {
		box_divs[i].children[0].removeEventListener("click", fadeBox);
	}
}


function loadLevel(level) {
	found = false;
	setNextLevelParameters(current_level);
	setUpInterface();
}

function nextLevel() {
	current_level = parseInt(current_level) + 1;
	loadLevel();
}


function goToStartLevel() {
	current_level = start_level;
	loadLevel();
}


function decreaseGuessCount() {
	num_guesses -= 1;
	if (num_guesses == 0 && found == false) { // if no more guesses then hide the rules and display no guesses left message
		var default_rules = document.getElementById('interactive-searching-algorithms-default-rules');
		default_rules.classList.add('hide-message');
		default_rules.classList.remove('show-message');
		document.getElementById('interactive-searching-algorithms-no-guesses').classList.add('show-message');
		disableBoxes();
	} else {
		document.getElementById('interactive-searching-algorithms-num-guesses').innerText = num_guesses;
	}
}

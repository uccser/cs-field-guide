var starting_num_guesses;
var num_guesses;
var target_position;
var target_weight;
var start_level;
var end_level;
var current_level;
var num_boxes;
var sorted;
var found = false;
var levels_set_from_params = false;

var preset_levels = [
    {
        "num-boxes": 5,
        "sorted": "random",
        "num-guesses": 6
    },
    {
        "num-boxes": 9,
        "sorted": "random",
        "num-guesses": 10
    },
    {
        "num-boxes": 9,
        "sorted": "sorted",
        "num-guesses": 5
    },
    {
        "num-boxes": 25,
        "sorted": "sorted",
        "num-guesses": 5
    },
    {
        "num-boxes": 49,
        "sorted": "sorted",
        "num-guesses": 6
    },
];

window.addEventListener("DOMContentLoaded", function() {
    document.getElementById('next-level').addEventListener("click", nextLevel);
    document.getElementById('restart-level').addEventListener("click", loadLevel);
    document.getElementById('restart-start-level').addEventListener("click", goToStartLevel);
    var url_string = window.location.href;
    setInterfaceParameters(url_string);
    setUpInterface();
});


function setInterfaceParameters(url_string) {
    var min_level = 0;
    var max_level = preset_levels.length - 1; // because levels start at 0
    var url = new URL(url_string);

    start_level = url.searchParams.get('start-level');
    end_level = url.searchParams.get('end-level');

    num_boxes = url.searchParams.get('num-boxes');
    sorted = url.searchParams.get('sorted');
    starting_num_guesses = url.searchParams.get('num-guesses');

    // if start level and end level given and are valid, set the level parameters
    if (start_level < min_level) {
        console.log('Start level paramater cannot be less than 0. Reverting to default.');
        start_level = min_level;
    }
    if (end_level > max_level) {
        console.log('Start level paramater invalid. Reverting to default.');
        end_level = max_level;
    }
    if (start_level != null && end_level != null) {
        setLevelParameters(start_level);
    } else if (num_boxes != null && sorted != null && starting_num_guesses != null) { // use the settings from the url parameters
        num_guesses = starting_num_guesses;
        levels_set_from_params = true;
    } else { // no parameters given
        start_level = min_level;
        end_level = max_level;
        setLevelParameters(start_level);
    }

    current_level = start_level;
    if (sorted == 'true') {
        sorted = gettext('sorted');
    } else if (sorted == 'false') {
        sorted = gettext('random');
    }
}


function setLevelParameters(level) {
    // If using preset levels
    if (level != null) {
        num_boxes = preset_levels[level]['num-boxes'];
        sorted = preset_levels[level]['sorted'];
        starting_num_guesses = preset_levels[level]['num-guesses'];
        num_guesses = starting_num_guesses;
    } else {
        num_guesses = starting_num_guesses;
    }
}


function setUpInterface() {
    // fill in the rules
    document.getElementById('num-boxes').innerText = num_boxes;
    document.getElementById('order').innerText = sorted;
    var format = ngettext('You have <span id="num-guesses">1</span> guess to find it.', 'You have <span id="num-guesses">%(num_guesses)s</span> guesses to find it.', num_guesses);
    var num_guesses_text = interpolate(format, {"num_guesses": num_guesses}, true);
    document.getElementById('num-guesses-text').innerHTML = num_guesses_text;
    elementVisible(document.getElementById('num-guesses-text'), true);

    var restart_start_level = document.getElementById('restart-start-level-container');
    if (start_level == null || current_level == start_level) {
        elementVisible(restart_start_level, false);
    } else {
        elementVisible(restart_start_level, true);
    }

    var found_text = document.getElementById('found');
    if (found_text.classList.contains('show-message')) {
        elementVisible(found_text, false);
    }
    var no_guesses = document.getElementById('no-guesses');
    if (no_guesses.classList.contains('show-message')) {
        elementVisible(no_guesses, false);
    }
    var next_level_div = document.getElementById('next-level-container');
    elementVisible(next_level_div, false);

    target_position = Math.floor(Math.random() * Math.floor(num_boxes));
    // create box elements and assign random weights
    var box_div = document.getElementById('boxes');
    // remove any existing boxes
    while (box_div.firstChild) {
        box_div.removeChild(box_div.firstChild);
    }

    for (var i = 0; i < num_boxes; i++) {
        var weight_list = getWeightList(num_boxes);
    }

    if (sorted == "sorted") {
        weight_list.sort(sortNumber);
    }

    createBoxes(box_div, weight_list, target_position);
}

function elementVisible(element, show_element) {
    if (show_element) {
        element.classList.remove('hide-message');
        element.classList.add('show-message');
    } else {
        element.classList.remove('show-message');
        element.classList.add('hide-message');
    }
}

function getWeightList(num_boxes) {
    range = Math.floor(Math.random() * 899) + 100; // returns random integer between 100 and 899
    start_range = Math.floor(Math.random() * (999 - range)); // returns random integer between 1 and 999 - range
    end_range = start_range + range; // this will be the array of numbers we will shuffle and pick from

    array = customRange(start_range, end_range);
    shuffledArray = shuffle(array);
    return shuffledArray.slice(0, num_boxes);
}

function customRange(start, end) {
    var num_array = [];
    for (var i = start; i <= end; i++) {
        num_array.push(i);
    }
    return num_array;
}

function createBoxes(box_div, weight_list, target_position) {
    for (var i = 0; i < num_boxes; i++) {
        var weight = weight_list[i];
        var random_square_number = Math.floor(Math.random() * Math.floor(15));
        var src_string = colourful_box_images[random_square_number];

        var img_div = document.createElement('div');

        var img_weight = document.createElement('p');
        img_weight.classList.add('box-weight');
        img_weight.innerText = weight;

        var img_number = document.createElement('p');
        img_number.classList.add('box-number');
        img_number.innerHTML = gettext('Box') + '<br><span>' + (i+1) + '</span>';

        var img_element = document.createElement('img');
        img_element.setAttribute('src', src_string);
        img_element.setAttribute('data-weight', weight);
        img_element.addEventListener("click", fadeBox);

        img_div.appendChild(img_element);
        img_div.appendChild(img_weight);
        img_div.appendChild(img_number);
        box_div.appendChild(img_div);

        if (i == target_position) {
            target_weight = weight;
        }
    }
    document.getElementById('target').innerText = target_weight;
}

function fadeBox(event) {
    var clicked_box = event.srcElement;
    clicked_box.removeEventListener("click", fadeBox);
    clicked_box.classList.add('fade');

    var box_weight = clicked_box.nextElementSibling;
    box_weight.classList.add('show'); // show weight of clicked box

    decreaseGuessCount();
    if (box_weight.innerText == target_weight) {
        found = true;
        elementVisible(document.getElementById('num-guesses-text'), false);
        elementVisible(document.getElementById('no-guesses'), false);

        // show winning message
        var num_guesses_used = starting_num_guesses - num_guesses;
        format = gettext('Number of guesses used: %(num_guesses)s');
        num_guesses_used_text = interpolate(format, {'num_guesses': num_guesses_used}, true);
        document.getElementById('num-guesses-used').innerText = num_guesses_used_text;
        disableBoxes();
        elementVisible(document.getElementById('found'), true);

        // show next button
        if (current_level < end_level && !levels_set_from_params) {
            elementVisible(document.getElementById('next-level-container'), true);
        }
    }
}

function disableBoxes() {
    var box_divs = document.getElementById('boxes').children;
    for (var i = 0; i < box_divs.length; i++) {
        box_divs[i].children[0].removeEventListener("click", fadeBox);
    }
}

function loadLevel() {
    found = false;
    setLevelParameters(current_level);
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
    var num_guesses_text = document.getElementById('num-guesses-text');
    if (num_guesses == 0 && found == false) {
        elementVisible(document.getElementById('no-guesses'), true);
        elementVisible(num_guesses_text, false);
        disableBoxes();
    } else {
        var format = ngettext('You have <span id="num-guesses">1</span> guess to find it.', 'You have <span id="num-guesses">%(num_guesses)s</span> guesses to find it.', num_guesses);
        var text = interpolate(format, {"num_guesses": num_guesses}, true);
        num_guesses_text.innerHTML = text;
    }
}

function sortNumber(a, b) {
    return a - b;
}

// shuffle function adapted from https://bost.ocks.org/mike/shuffle
function shuffle(array) {
    var element_index = array.length;
    var random_index;
    var current_element

    while (element_index) {
        // Pick a remaining element
        random_index = Math.floor(Math.random() * element_index--);

        // And swap it with the current element
        current_element = array[element_index];
        array[element_index] = array[random_index];
        array[random_index] = current_element;
    }

    return array;
}

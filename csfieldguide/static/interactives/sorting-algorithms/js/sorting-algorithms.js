const dragula = require('./../../../../node_modules/dragula/dragula');

// globals
var comparisons = 0;
var last_left_image;
var last_right_image;
var empty_weight = -1;
const data_weights = [0, 1, 2, 3, 4, 5, 6, 7]; // weights of the images, used for comparisons

window.onload = function() {
    var images_to_sort = document.getElementsByClassName('sorting-boxes');
    // shuffle the weights and assign them to each image
    var shuffled_weights = shuffle(data_weights);
    for (var i = 0; i < images_to_sort.length; i++) {
        var image = images_to_sort[i];
        image.dataset.weight = shuffled_weights[i];
    }
    var url_string = window.location.href;
    var url = new URL(url_string);
    var method = url.searchParams.get("method");
    var button = document.getElementById("toggle-second-row");
    button.innerText = gettext('Show second row of boxes');
    if (method == 'quick') {
        toggleSecondRow();
    }
}

/** 
 * shuffle function adapted from https://bost.ocks.org/mike/shuffle
 */
function shuffle(array) {
    var element_index = array.length;
    var random_index;
    var current_element;

    while (element_index) {
        // Pick a remaining element
        random_index = Math.floor(Math.random() * element_index--);

        // And swap it with the current element
        current_element = array[element_index];
        array[element_index] = array[random_index ];
        array[random_index ] = current_element;
    }

    return array;
}

/**
 * Defines draging and button handlers
 */
$(function() {
    var image_list = $('.dashed-box').toArray();
    var drake = dragula(image_list);
    drake.on('drop', (image, target_container, source_container) => {
        // If an image is dragged on top of another image..
        if (target_container.children.length == 2) {
            swap(image, target_container, source_container);
        }
        document.getElementById('check-order-result-text-feedback').innerHTML = "<br>";
        compareWeights();
    });
    $('#check-sorted-button').on('click', function () {
        checkOrder();
    });
    $('#toggle-second-row').on('click', function () {
        toggleSecondRow();
    });
    $('#reset-button').on('click', function () {
        reset();
    });
});

/**
 * Swaps the image in the target container and the image in the source container
 */
function swap(image, target_container, source_container) {
    // save the original image in target_container to a temp var
    temp = target_container.children[0];
    // image is original image in source_container. Swap the images.
    target_container.appendChild(image);
    source_container.appendChild(temp);
}

/**
 * Does the comparison between items in the two weight containers
 */
function compareWeights() {
    var left_weight_div = document.getElementById('left-weight-content');
    var right_weight_div = document.getElementById('right-weight-content');
    var left_weight = getDataWeight(left_weight_div);
    var right_weight = getDataWeight(right_weight_div);

    // check if left and right are empty
    if (left_weight == empty_weight && right_weight == empty_weight) {
        rotateIndicator('up');
    } else {
        if (left_weight > right_weight) { // left is heavier
            rotateIndicator('left');
        } else if (right_weight > left_weight) { // right is heavier
            rotateIndicator('right');
        }
        if (left_weight != empty_weight && right_weight != empty_weight) {
            countComparisons();
        }
    }
}

/**
 * Rotates the arrow appropriately
 */
function rotateIndicator(direction) {
    // point to the heaviest box
    indicator = document.getElementById('scale');
    if (direction == 'left') {
        indicator.classList.remove('point-up');
        indicator.classList.remove('point-right');
        indicator.classList.add('point-left');
    } else if (direction == 'up') {
        indicator.classList.remove('point-left');
        indicator.classList.remove('point-right');
        indicator.classList.add('point-up');
    } else { //right
        indicator.classList.remove('point-up');
        indicator.classList.remove('point-left');
        indicator.classList.add('point-right');
    }
}

/**
 * Increases the number of comparisons by 1 if it isn't the comparison made immediately previous
 */
function countComparisons() {
    left_image = document.getElementById('left-weight-content').children[0];
    right_image = document.getElementById('right-weight-content').children[0];
    if ((left_image != last_left_image) || (right_image != last_right_image)) {
        comparisons += 1
        fmts = gettext('Number Of Comparisons: %(comparisons)s');
        s = interpolate(fmts, {comparisons: comparisons}, true);
        document.getElementById('comparison-counter-text').innerText = s;
        last_left_image = left_image;
        last_right_image = right_image;
    }
}

/**
 * Displays a message depending on the order of images in the sorted image row
 */
function checkOrder() {
    var ordered_boxes_row = document.getElementById('sorting-algorithms-interactive-item-sorted-row');
    if (ordered_boxes_row.getElementsByTagName("img").length != 8) {
        s = gettext('You need to sort all the boxes before checking!');
        $('#check-order-result-text-feedback').html(s);
    } else {
        var ordered_boxes = ordered_boxes_row.children;
        var sorted = true;
        for (var i = 0; i < ordered_boxes.length; i++) {
            element = ordered_boxes[i];
            var weight = getDataWeight(element);
            if (weight != i) {
                sorted = false;
            }
        }
        if (sorted) {
            s = colour(gettext('The boxes are in order, congratulations!'), true);
            $('#check-order-result-text-feedback').html(s);
        } else {
            s = colour(gettext('The boxes are not in order, try again!'), false);
            $('#check-order-result-text-feedback').html(s);
        }
    }
}

/**
 * Toggles the display of a second row of boxes, useful for quick/merge sort etc
 */
function toggleSecondRow() {
    var row = document.getElementById('sorting-algorithms-interactive-item-unsorted-row-2');
    var button = document.getElementById('toggle-second-row');
    row.classList.toggle('d-flex');
    if (row.classList.contains('d-flex')) {
        s = gettext('Hide second row of boxes');
    } else {
        s = gettext('Show second row of boxes');
        var images_to_move = row.getElementsByTagName('img');
        var empty_boxes = $('#sorting-algorithms-interactive-item-unsorted-row-1 > div:not(:has(*))').toArray();
        while (images_to_move.length > 0) {
            empty_boxes[0].appendChild(images_to_move[0]);
            empty_boxes.shift();
        }
    }
    button.innerText = s;
}

/**
 * Returns the weight associated with the given element(image)
 */
function getDataWeight(element) {
    var data_weight = empty_weight;
    // If the box is not empty
    if (element.hasChildNodes()) {
        data_weight = element.children[0].dataset.weight;
    }
    return data_weight;
}

/**
 * Returns text, but included in a <span> element with class=correct or incorrect
 * depending on the boolean isGood
 */
function colour(text, isGood) {
    return '<span class="' + ((isGood)? 'correct':'incorrect') + '">' + text + '</span>';
}

/**
 * Returns all images to their original locations, weights intact, and resets
 * the number of comparisons made
 */
function reset() {
    resetRow = document.getElementById('sorting-algorithms-interactive-item-unsorted-row-1').children;
    for (var i=0; i < resetRow.length; i++) {
        $("#img-" + i).appendTo(resetRow[i]);
    }

    comparisons = 0;
    last_left_image = null;
    last_right_image = null;
    var fmts = gettext('Number Of Comparisons: %(comparisons)s');
    var s = interpolate(fmts, {comparisons: comparisons}, true);
    document.getElementById('comparison-counter-text').innerText = s;
    $('#check-order-result-text-feedback').html('<br>');
}

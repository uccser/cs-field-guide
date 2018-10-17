const dragula = require('./../../../../node_modules/dragula/dragula');

// globals
var comparisons = 0;
var last_left_image;
var last_right_image;

window.onload = function() {
    var images_to_sort = document.getElementsByClassName('to-sort');
    const data_weights = [1, 2, 3, 4, 5, 6, 7, 8];
    var shuffled_weights = shuffle(data_weights);
    for (var i = 0; i < images_to_sort.length; i++) {
        var image = images_to_sort[i];
        image.dataset.weight = shuffled_weights[i];
    }
    var url_string = window.location.href;
    var url = new URL(url_string);
    var method = url.searchParams.get("method");
    if (method != 'quick') {
        document.getElementById('sorting-algorithms-interactive-item-unsorted-row-2').style.display = 'none';
    }
}

// shuffle function adapted from https://bost.ocks.org/mike/shuffle
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

$(function() {
    var image_list = [];
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    for (var i = 0; i < alphabet.length; i++) {
        image_list.push(document.getElementById('box-' + alphabet[i]));
    }
    var drake = dragula(image_list);
    drake.on('drop', (target, source) => {
        console.log(source.children.length);
        if (source.children.length == 2) { // means an element has been dropped in this div
            swap(target, source);
        } else if (source.children.length == 1) {
            var source_div_id = source.id.slice(0, 5);
            var target_div_id = target.id.slice(0, 5);
            var target = document.getElementById(target_div_id);
            console.log(source.children[0]);
            console.log(source_div_id);
            console.log(target_div_id);
            var source = document.getElementById(source_div_id);
            target.appendChild(source.children[0]);
            var tmp_id = target.id;
            target.id = source.id;
            source.id = tmp_id;
        }
        compareWeights();
    });
    $('#check-sorted-button').on('click', function () {
        checkOrder();
    });
});

function swap(target, source) {
    // get id of moved image
    var moved_img_id = target.id;
    
    // get the div that the moved image came from
    var target_div_id = moved_img_id.slice(0, 5);
    var target = document.getElementById(target_div_id);
    
    // figure out which image needs to be moved
    var img_to_move;
    if (source.children[0].id != moved_img_id) {
        img_to_move = source.children[0];
    } else if (source.children[1].id != moved_img_id) {
        img_to_move = source.children[1];
    }

    target.appendChild(img_to_move);

    var tmp_id = target.id;
    target.id = source.id;
    source.id = tmp_id;
}

function compareWeights() {
    var left_weight_div = document.getElementsByClassName('left-weight-content')[0];
    var right_weight_div = document.getElementsByClassName('right-weight-content')[0];
    console.log(left_weight_div);
    var left_weight = getDataWeight(left_weight_div);
    var right_weight = getDataWeight(right_weight_div);

    // check if both are placeholder images
    if (left_weight == 0 && right_weight == 0) {
        rotateIndicator('middle');
    } else {
        if (left_weight > right_weight) { // left is heavier
            rotateIndicator('left');
        } else if (right_weight > left_weight) { // right is heavier
            rotateIndicator('right');
        }
        if (left_weight != 0 && right_weight != 0) {
            countComparisons();
        }
    }
}

function rotateIndicator(direction) {
    indicator = document.getElementById('scale');
    if (direction == 'left') {
        indicator.classList.remove('middle');
        indicator.classList.remove('rotate-right');
        indicator.classList.add('rotate-left');
    } else if (direction == 'middle') {
        indicator.classList.remove('rotate-left');
        indicator.classList.remove('rotate-right');
        indicator.classList.add('middle');
    } else { //right
        indicator.classList.remove('middle');
        indicator.classList.remove('rotate-left');
        indicator.classList.add('rotate-right');
    }
}


function countComparisons() {
    left_image = document.getElementsByClassName('left-weight-content')[0].children[0];
    right_image = document.getElementsByClassName('right-weight-content')[0].children[0];
    if ((left_image != last_left_image) || (right_image != last_right_image)) {
        comparisons += 1
        document.getElementById('comparison-counter-number').innerText = comparisons;
        last_left_image = left_image;
        last_right_image = right_image;
    }
}

function checkOrder() {
    var ordered_boxes = document.getElementsByClassName('ordered-box-content');
    var sorted = true;
    var weights = []
    for (var i = 0; i < ordered_boxes.length; i++) {
        element = ordered_boxes[i];
        var weight = getDataWeight(element);
        if (weight > 0) {
            weights.push(weight);
        }
    }
    if (weights.length < 8) {
        sorted = false;
    } else {
        var previous_weight = weights[0];
        for (var i = 0; i < weights.length; i++) {
            var weight = weights[i];
            if (parseInt(weight) < parseInt(previous_weight)) {
                sorted = false
            }
            previous_weight = weight;
        }
    }
    if (sorted) {
        document.getElementById('check-order-result-text-correct').style.display = 'block';
        document.getElementById('check-order-result-text-incorrect').style.display = 'none';
    } else {
        document.getElementById('check-order-result-text-correct').style.display = 'none';
        document.getElementById('check-order-result-text-incorrect').style.display = 'block';
    }
}

function getDataWeight(element) {
    var data_weight = 0;
    // If the box is not empty
    if (element.hasChildNodes()) {
        data_weight = element.children[0].dataset.weight;
    }

    return data_weight;
}

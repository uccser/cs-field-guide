// globals
var comparisons = 0;
var last_left_image;
var last_right_image;

window.onload = function() {
    var images_to_sort = document.getElementsByClassName('to-sort');
    for (var i = 0; i < images_to_sort.length; i++) {
        var image = images_to_sort[i];
        // generate random weight between 1 and 100 (inclusive)
        image.dataset.weight = Math.floor(Math.random() * Math.floor(100)) + 1;
    }
    var url_string = window.location.href;
    var url = new URL(url_string);
    var method = url.searchParams.get("method");
    if (method == null) {
        document.getElementById('sorting-algorithms-interactive-item-unsorted-row-2').style.display = 'none';
    }
}

$(function() {
    var drake = dragula([
        document.getElementById('box-a'),
        document.getElementById('box-b'),
        document.getElementById('box-c'),
        document.getElementById('box-d'),
        document.getElementById('box-e'),
        document.getElementById('box-f'),
        document.getElementById('box-g'),
        document.getElementById('box-h'),
        document.getElementById('box-i'),
        document.getElementById('box-j'),
        document.getElementById('box-k'),
        document.getElementById('box-l'),
        document.getElementById('box-m'),
        document.getElementById('box-n'),
        document.getElementById('box-o'),
        document.getElementById('box-p'),
        document.getElementById('box-q'),
        document.getElementById('box-r'),
        document.getElementById('box-s'),
        document.getElementById('box-t'),
        document.getElementById('box-u'),
        document.getElementById('box-v'),
        document.getElementById('box-w'),
        document.getElementById('box-x'),
        document.getElementById('box-y'),
        document.getElementById('box-z')
    ]);

    drake.on('drop', (target, source) => {
        if (source.children.length == 2) { // means an element has been dropped in this div 
            swap(target, source);
        }
        compareWeights();
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
    var left_weight_div = document.getElementsByClassName('left-weight')[0];
    var right_weight_div = document.getElementsByClassName('right-weight')[0];
    var left_weight = left_weight_div.children[0].dataset.weight;
    var right_weight = right_weight_div.children[0].dataset.weight;

    // check if both are placeholder images
    if (left_weight == 0 && right_weight == 0) {
        left_weight_div.parentElement.style.borderColor = 'red';
        right_weight_div.parentElement.style.borderColor = 'red'; 
    } else {
        // set heavier weight to have blue outline
        // (nothing changes for when they have the same weight)
        if (left_weight > right_weight) { // left is heavier
            left_weight_div.parentElement.style.borderColor = 'blue';
            right_weight_div.parentElement.style.borderColor = 'red';
        } else if (right_weight > left_weight) { // right is heavier
            left_weight_div.parentElement.style.borderColor = 'red'
            right_weight_div.parentElement.style.borderColor = 'blue'
        }
        if (left_weight != 0 && right_weight != 0) {
            countComparisons();
        }
    }
}

function countComparisons() {
    left_image = document.getElementsByClassName('left-weight')[0].children[0];
    right_image = document.getElementsByClassName('right-weight')[0].children[0];
    if ((left_image != last_left_image) || (right_image != last_right_image)) {
        comparisons += 1
        document.getElementById('comparison-counter').innerHTML = 'Number Of Comparisons: ' + comparisons.toString()
        last_left_image = left_image;
        last_right_image = right_image;
    }
}

function checkOrder() {
    var ordered_boxes = document.getElementsByClassName('ordered-box');
    var weights = []
    for (var i = 0; i < ordered_boxes.length; i++) {
        weights.push(ordered_boxes[i].children[0].dataset.weight);
    }

    var previous_weight = weights[0];
    var sorted = true
    for (var i = 0; i < weights.length; i++) {
        var weight = weights[i];
        if (weight < previous_weight) {
            sorted = false
        }
        previous_weight = weight;
    }

    if (sorted) {
        document.getElementById('check-order-result-text-correct').style.display = 'block';
        document.getElementById('check-order-result-text-incorrect').style.display = 'none';
    } else {
        document.getElementById('check-order-result-text-correct').style.display = 'none';
        document.getElementById('check-order-result-text-incorrect').style.display = 'block';
    }
}

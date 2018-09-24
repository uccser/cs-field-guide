console.log('sorting algorithms');

window.onload = function() {
    var images_to_sort = document.getElementsByClassName('to-sort');
    for (var i = 0; i < images_to_sort.length; i++) {
        var image = images_to_sort[i];
        image.dataset.weight = Math.floor(Math.random() * Math.floor(100));
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
        console.log(target);
        console.log(source);
        if (source.children.length == 2) { // means an element has been dropped in this div 
            swap(target, source);
        }
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
        console.log('correct');
        document.getElementById('check-order-result-text-correct').style.display = 'block';
        document.getElementById('check-order-result-text-incorrect').style.display = 'none';
    } else {
        console.log('incorrect')
        document.getElementById('check-order-result-text-correct').style.display = 'none';
        document.getElementById('check-order-result-text-incorrect').style.display = 'block';
    }
    console.log('check order')
}

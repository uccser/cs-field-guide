console.log('sorting algorithms');

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

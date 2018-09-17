console.log('sorting algorithms');

$(function() {
    var drake = dragula([
        document.getElementById('box-1'),
        document.getElementById('box-2'),
        document.getElementById('box-3'),
        document.getElementById('box-4'),
        document.getElementById('box-5'),
        document.getElementById('box-6'),
        document.getElementById('box-7'),
        document.getElementById('box-8')
    ]);

    drake.on('drop', (target, source) => {
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

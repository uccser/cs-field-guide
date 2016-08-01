var ctx = document.getElementById("canvas").getContext("2d");

var square_size = 40;

// set width and height
// take mod square_size to match dimensions of each square in the grid (removes trailing lines)
// set width of canvas to be 75% of the width of the page to leave room for instructions
var base_width = window.innerWidth * 0.75;
var width = base_width - (base_width % square_size);
var base_height = window.innerHeight * 0.95;
var height = base_height - (base_height % square_size);

window.onresize = function(event) {
    // figure out a way to redraw canvas
    // just calling draw function is too slow
    // some optimisation required
    window.requestAnimationFrame(draw);
}


function draw() {

    ctx.canvas.width = width;
    ctx.canvas.height = height;

    for (var x = 0; x <= width; x+= square_size) {
        for (y = 0; y <= height; y += square_size) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }

    drawArrow();

}


function drawArrow() {

    // create new space to draw
    ctx.beginPath();

    var x = width / 2;
    // taking mod of height ensures that the arrow starts exactly on a line
    var y = (height / 3) - ((height / 3) % square_size);

    var arrow_width = 2.5;
    var arrow_height = 7;

    ctx.moveTo(x, y);
    ctx.lineTo(x - (arrow_width * square_size), y + (arrow_width * square_size));
    ctx.lineTo(x - (square_size), y + (arrow_width * square_size));
    ctx.lineTo(x - (square_size), y + (arrow_height * square_size));
    ctx.lineTo(x + (square_size), y + (arrow_height * square_size));
    ctx.lineTo(x + (square_size), y + (arrow_width * square_size));
    ctx.lineTo(x + (arrow_width * square_size), y + (arrow_width * square_size));
    ctx.moveTo(x, y);

    // fill arrow with colour
    ctx.fillStyle = "#3F51B5";
    ctx.fill();

}

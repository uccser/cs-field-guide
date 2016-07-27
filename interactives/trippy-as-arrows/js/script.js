var ctx = document.getElementById("canvas").getContext("2d");
var width = window.innerWidth;
var height = window.innerHeight;

window.onresize = function(event) {
    // figure out a way to redraw canvas
    // just calling draw function is too slow
    // some optimisation required
}

function draw() {
    console.log(window.innerWidth);
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    for (var x = 0; x <= width; x+= 20) {
        for (y = 0; y <= height; y += 20) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }

}


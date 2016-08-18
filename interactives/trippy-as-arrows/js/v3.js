//var ctx = document.getElementById("canvas").getContext("2d");

//TODO convert to style guide -camel case not snake case

var square_size = 40;
var base_width = window.innerWidth * 0.75;
var width = base_width - (base_width % square_size);
var base_height = window.innerHeight * 0.95;
var height = base_height - (base_height % square_size);

// TODO there must be a better way to do this - onload?
drawBackground();
test();

function drawBackground() {
    //document.body.style.backgroundSize = "50% 50%, 50% 50%, 10px 10px, 10px 10px";
    var square_size = 20;
    var base_width = window.innerWidth;
    //var width = base_width - (base_width % square_size);
    var width = (base_width - (base_width % 20)) / 2;
    console.log(width);

    var background_size_format = width + "px " + width + "px, " + width + "px " + width + "px, " + square_size + "px " + square_size + "px, " + square_size + "px " + square_size + "px";
    document.body.style.backgroundSize = background_size_format;
}



/* Draws the arrow and places in the middle of the grid */
function drawArrow() {
    /*
     * Points of arrow referenced according to diagram below
     *         p1
     *         /\
     *        /  \
     *       /    \
     *      /      \
     *  p2 /__p3  __\p7
     *        |  |p6
     *        |  |
     *        |  |
     *        |__|
     *       p4  p5
    */

    // create new space to draw
    ctx.beginPath();

    var x = width / 2;
    // taking mod of height ensures that the arrow starts exactly on a line
    var y = (height / 3) - ((height / 3) % square_size);

    var arrow_width = 2.5;
    var arrow_height = 7;

    var coordinates = {
        "p1": [x, y],
        "p2": [x - (arrow_width * square_size), y + (arrow_width * square_size)],
        "p3": [x - (square_size), y + (arrow_width * square_size)],
        "p4": [x - (square_size), y + (arrow_height * square_size)],
        "p5": [x + (square_size), y + (arrow_height * square_size)],
        "p6": [x + (square_size), y + (arrow_width * square_size)],
        "p7": [x + (arrow_width * square_size), y + (arrow_width * square_size)]
    }

    ctx.moveTo(coordinates["p1"][0], coordinates["p1"][1]);
    ctx.lineTo(coordinates["p2"][0], coordinates["p2"][1]);
    ctx.lineTo(coordinates["p3"][0], coordinates["p3"][1]);
    ctx.lineTo(coordinates["p4"][0], coordinates["p4"][1]);
    ctx.lineTo(coordinates["p5"][0], coordinates["p5"][1]);
    ctx.lineTo(coordinates["p6"][0], coordinates["p6"][1]);
    ctx.lineTo(coordinates["p7"][0], coordinates["p7"][1]);
    ctx.moveTo(coordinates["p1"][0], coordinates["p1"][1]);

    // Show value in input box
    // x values
    document.getElementById('p1-input-x').value = coordinates["p1"][0];
    document.getElementById('p2-input-x').value = coordinates["p2"][0];
    document.getElementById('p3-input-x').value = coordinates["p3"][0];
    document.getElementById('p4-input-x').value = coordinates["p4"][0];
    document.getElementById('p5-input-x').value = coordinates["p5"][0];
    document.getElementById('p6-input-x').value = coordinates["p6"][0];
    document.getElementById('p7-input-x').value = coordinates["p7"][0];
    // y values
    document.getElementById('p1-input-y').value = coordinates["p1"][1];
    document.getElementById('p2-input-y').value = coordinates["p2"][1];
    document.getElementById('p3-input-y').value = coordinates["p3"][1];
    document.getElementById('p4-input-y').value = coordinates["p4"][1];
    document.getElementById('p5-input-y').value = coordinates["p5"][1];
    document.getElementById('p6-input-y').value = coordinates["p6"][1];
    document.getElementById('p7-input-y').value = coordinates["p7"][1];


}


function test() {
     var graph = Viva.Graph.graph();
         nodePositions = [
             {x : -80, y: 0},
             {x : 0, y: -80},
             {x : 80, y: 0},
             {x : -25, y: 0},
             {x : 25, y: 0},
             {x : -25, y : 150},
             {x : 25, y : 150}]; // predefined node positions
         layout = Viva.Graph.Layout.constant(graph);

         renderer = Viva.Graph.View.renderer(graph, {
                        layout     : layout, // use our custom 'constant' layout
                    });
         nodesCount = nodePositions.length; // convinience variables.
     // Add nodes
     for(i = 0; i < nodesCount; ++i) {
         graph.addNode(i, nodePositions[i]);
     }
     // and make them connected

     graph.addLink(0,1);
     graph.addLink(1,2);
     graph.addLink(2,4);
     graph.addLink(4,6);
     graph.addLink(6,5);
     graph.addLink(5,3);
     graph.addLink(3,0);

     // set custom node placement callback for layout.
     // if you don't do this, constant layout performs random positioning.
     layout.placeNode(function(node) {
         // node.id - points to its position but you can do your
         // random logic here. E.g. read from specific node.data
         // attributes. This callback is expected to return object {x : .. , y : .. }
         return nodePositions[node.id];
     });

     // TODO working here
     var graphics = Viva.Graph.View.svgGraphics();
     graphics.node(function(node) {
         var ui = Viva.Graph.svg("rect");
         uni.addEventListener('click', function() {
             layout.pinNode(node, !layout.isNodePinned(node));
         });
         return ui;
     });

     renderer.run();
}

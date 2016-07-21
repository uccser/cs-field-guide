function onLoad() {
    var graph = Viva.Graph.graph(),
        nodePositions = [{x : -80, y: 0}, {x : 0, y: -80}, {x : 80, y: 0}, {x : -25, y: 0}, {x : 25, y: 0},
        {x : -25, y : 150}, {x : 25, y : 150}], // predefined node positions
        layout = Viva.Graph.Layout.constant(graph),
        renderer = Viva.Graph.View.renderer(graph, {
                       layout     : layout, // use our custom 'constant' layout
                   }),
        i, nodesCount = nodePositions.length; // convinience variables.
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
    renderer.run();
}

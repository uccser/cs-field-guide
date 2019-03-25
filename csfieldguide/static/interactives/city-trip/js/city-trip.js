// TODO: Make it a closed loop graph
// TODO: Some nodes are still half overlapping
// TODO: Rename all of the stupid variables I impulsively named
// TODO: Add comments

const cytoscape = require('cytoscape');
const noOverlap = require('cytoscape-no-overlap');
const automove = require('cytoscape-automove');
const itertools = require('itertools');

cytoscape.use(noOverlap);
cytoscape.use(automove);

$(document).ready(function() {

  var slider = $('#num-cities');
  var output = $("#slider-text");
  var numberOfCities = Number(slider.val());
  var cities = Array.from(Array(numberOfCities), (x, index) => index + 1);
  var elementsData = generateNodesAndEdgesData(cities);
  output.html(numberOfCities);

  var cy = cytoscape({
    container: $('#cy'),
    elements: elementsData,
    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#007bff',
          'label': 'data(id)'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#99ccff'
        }
      },
    ],
    layout: {
      name: "random",
      avoidOverlap: true
    }
  });

  var layout = cy.layout({
    name: "random",
    avoidOverlap: true
  });

  cy.nodes().noOverlap({ padding: 5 });

  var gContainer = $('#cy');
  cy.mount(gContainer);

  var cy2 = cytoscape({
    container: $('#cy2'),
    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#28a745',
          'label': 'data(id)'
        }
      },
    
      {
        selector: 'edge',
        style: {
          'line-color': '#99cc99'
        }
      }
    ]
  });
  cy2.mount($('#cy2'));
  cy2.add(cy.elements().clone());
  setGraphOptions(cy);
  setGraphOptions(cy2);
  cy2.nodes().ungrabify();

  var initialPathDistance = pathDistance(cy.edges());
  updateRouteStats();

  slider.on('input', function() {
    cy.nodes().grabify();
    newNumberOfCities = Number(slider.val());
    cities = Array.from(Array(newNumberOfCities), (x, index) => index + 1);
    addOrRemoveNodes(cy, cy2, layout, numberOfCities, newNumberOfCities);
    setGraphOptions(cy); // potentially improve?
    numberOfCities = newNumberOfCities;
    output.html(numberOfCities);
    initialPathDistance = pathDistance(cy.edges());
    updateRouteStats();
  });

  $('#start').click(function() {
    cy.nodes().ungrabify();
    permutationsWithoutInverse(cy, cy2, cities, initialPathDistance);
  });

  $('#stop').click(function() {
    cy.nodes().grabify();
    // quit execution of path finding
  });

  // Generate a new graph layout and make sure the best route graph matches
  $('#generate-map').click(function () {
    cy.nodes().grabify();
    cy2.remove(cy2.elements());
    refreshLayout(cy, layout);
    cy2.add(cy.elements().clone());
    setGraphOptions(cy2);
    cy2.nodes().ungrabify();
    initialPathDistance = pathDistance(cy.edges());
    updateRouteStats();
  });

  // Updates the trial route and best route info along with their corresponding distances
  function updateRouteStats() {
    $('#trial-route').html(cities.toString());
    $('#trial-distance').html(initialPathDistance);
    $('#best-route-so-far').html(cities.toString());
    $('#best-route-distance').html(initialPathDistance);
  };

  // Updates best route graph to match the initial graph when a user drags a node on the initial graph
  // Might need to look at how to improve this instead of wiping and cloning a new graph...
  cy.on('dragfreeon', 'nodes', function(evt) {
    cy2.remove(cy2.elements());
    cy2.add(cy.elements().clone());
    cy2.nodes().ungrabify();
    initialPathDistance = pathDistance(cy.edges());
    updateRouteStats();
  })
});


function setGraphOptions(cyGraph) {
  cyGraph.fit();
  cyGraph.userPanningEnabled(false);
  cyGraph.automove({
    nodesMatching: cyGraph.nodes(),
    reposition: 'viewport'
  });
}


function generateNodesAndEdgesData(nodes) {
  var mapData = [];
  // generate nodes (cities) for city map
  for (var c = 0; c < nodes.length; c++) {
    nodeData = {
      data: { id: nodes[c].toString() }
    };
    mapData.push(nodeData);
  }
  // generate edges (roads) between nodes (cities)
  for (var e = 0; e < nodes.length - 1; e++) {
    sourceNode = nodes[e].toString();
    targetNode = nodes[e+1].toString();
    edgeID = 'e' + sourceNode + targetNode;
    edgeData = {
      data: { id: edgeID, source: sourceNode, target: targetNode}
    }
    mapData.push(edgeData);
  }

  return mapData;
}


// Adds or removes nodes when user alters number of nodes via slider input
function addOrRemoveNodes(cy, cy2, layout, oldNumCities, newNumCities) {
  // Lock existing nodes so their layout doesn't change once refreshLayout is called
  cy.nodes().lock();
  var difference = Math.abs(newNumCities - oldNumCities);
  if (oldNumCities < newNumCities) {
    // Add nodes
    var previousNodeID = oldNumCities.toString();
    for (var n = 1; n < difference + 1; n++) {
      // Create node
      currentNodeID = (oldNumCities + n).toString();
      newNode = {
        data: { id: currentNodeID },
        classes: 'nodesToAdd'
      };
      cy.add(newNode);

      // Create edge
      edgeID = 'e' + previousNodeID + currentNodeID;
      newEdge = {
        data: { id: edgeID, source: previousNodeID, target: currentNodeID },
        classes: 'edgesToAdd'
      };
      cy.add(newEdge);

      // Make sure layout is still random and nodes can't overlap when dragged
      refreshLayout(cy, layout);
      cy.nodes().noOverlap({ padding: 5 });
      previousNodeID = currentNodeID;
      cy.nodes().lock();
    }
    // Update best route graph to match
    cy2.add(cy.$('.nodesToAdd').clone());
    cy2.add(cy.$('.edgesToAdd').clone());
    setGraphOptions(cy2);
    cy2.nodes().ungrabify();
  } else if (oldNumCities > newNumCities) {
    // Remove nodes
    cy.nodes().unlock();
    for (var n = 0; n < difference; n++) {
      // Remove nodes and update best route graph to match
      nodeToRemove = cy.$('#' + (oldNumCities - n).toString());
      cy.remove( nodeToRemove );
      nodeToRemoveCy2 = cy2.$('#' + (oldNumCities - n).toString());
      cy2.remove( nodeToRemoveCy2 );
    }
  }
  cy.nodes().unlock();
}


// Make sure the layout is still random after new nodes have been added
function refreshLayout(cy, layout) {
  layout.stop();
  layout = cy.elements().makeLayout({
    name: "random",
    avoidOverlap: true
  });
  layout.run();
}


// Draw the new path and calculate it's distance
// Updates frontend text if new best route found
// Returns distance of the new path and if it is the best route so far or not
function testNewPath(cy, cy2, oldPath, newPath, bestRouteDistance) {
  $('#trial-route').html(newPath.toString());
  // Number of nodes (cities) remains the same between paths
  var numCities = oldPath.length;
  var newEdgeConfig = new Set();
  for (var j = 0; j < numCities - 1; j++) {
    var newEdgeID = newPath[j].toString() + newPath[j+1].toString();
    newEdgeConfig.add(newEdgeID);
  }

  findEdgeDifferences(cy, oldPath, newEdgeConfig, numCities);

  var totalDistance = pathDistance(cy.edges());
  $('#trial-distance').html(totalDistance);
  // Check if we have found a new best route
  if (totalDistance < bestRouteDistance) {
    previousBestRoute = $('#best-route-so-far').html().split(',');
    findEdgeDifferences(cy2, previousBestRoute, newEdgeConfig, numCities);
    $('#best-route-so-far').html(newPath.toString());
    $('#best-route-distance').html(totalDistance);
    return {distance: totalDistance, isBestRoute: true};
  } else {
    return {distance: totalDistance, isBestRoute: false};
  }
}


// Finds the edge differences between two paths and draws the new path by calling changePaths
function findEdgeDifferences(cyGraph, oldPath, newEdgeConfig, numCities) {
  // Number of nodes (cities) remains the same between paths;
  var oldEdgeConfig = new Set();
  for (var i = 0; i < numCities - 1; i++) {
    var edgeID = cyGraph.elements('edge')[i].data('id');
    // Edge IDs are saved like 'e12' so strip 'e'
    var edgeIDStr = edgeID.substring(1);
    oldEdgeConfig.add(edgeIDStr);
  }

  var edgesToRemove = setDifference(oldEdgeConfig, newEdgeConfig);
  var edgesToAdd = setDifference(newEdgeConfig, oldEdgeConfig);
  var edgesToKeep = setDifference(oldEdgeConfig, edgesToRemove);

  // Draw the next path
  changePaths(cyGraph, edgesToKeep, edgesToAdd);
}


// Draws the path
function changePaths(cy, edgesToKeep, edgesToAdd) {
  var edgesToKeepStr = '';
  // Make array because sets are not iterable
  var edgesToKeepArr = Array.from(edgesToKeep);
  for (var i = 0; i < edgesToKeepArr.length - 1; i++) {
    edgesToKeepStr += '#e' + edgesToKeepArr[i] + ', ';
  }
  edgesToKeepStr += '#e' + edgesToKeepArr[i];
  cy.remove(cy.edges().difference(edgesToKeepStr)); 

  edgesToAdd.forEach(addEdge);
  function addEdge(value) {
    edgeID = 'e' + value;
    newEdge = {
      data: { id: edgeID, source: value[0], target: value[1] }
    };
    cy.add(newEdge);
  }
}


// Calulate a\b 
// E.g if a = {1,2,3,4} and b = {5,4,3,2} this function would return {1}
function setDifference(a, b) {
  var aMinusB = new Set([...a].filter(x => !b.has(x)));
  return aMinusB;
}


// Calculates permutations without inverse permutations
// E.g if [1,2,3] exists in the array then [3,2,1] will not be added (they are essentially the same path)
async function permutationsWithoutInverse(cy, cy2, cities, bestRouteDistance) {
  var len = cities.length;
  var paths = [...itertools.permutations(cities)];
  var pathsWithoutInverse = [];
  // Push the path already shown to the user (initial path)
  pathsWithoutInverse.push(cities);
  var previousPath = cities;
  for (var i = 1; i < paths.length; i++) {
    path = paths[i];
    if (path[0] <= path[len-1]) {
      pathsWithoutInverse.push(path);
      // Draw graph here
      pathData = testNewPath(cy, cy2, previousPath, path, bestRouteDistance); 
      await sleep(200);
      if (pathData.isBestRoute) {
        bestRouteDistance = pathData.distance;
      }
      previousPath = path;
    }
  }
  cy.nodes().grabify();
}


// Pass in 2 positions and use (x,y) coords to calc distance
// Uses pythagoras
function distanceBetweenCities(edgeStartPos, edgeEndPos) {
  var a = Math.abs(edgeStartPos.x - edgeEndPos.x);
  var b = Math.abs(edgeStartPos.y - edgeEndPos.y);

  var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

  return c;
}


// Gets total distance of the path
function pathDistance(edges) {
  var distance = 0;
  for (var i = 0; i < edges.length; i++) {
    var edge = edges[i];
    distance += distanceBetweenCities(edge.sourceEndpoint(), edge.targetEndpoint());
  }

  return Math.round(distance);
}


// JavaScript sleep function taken from 
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// TODO: Make it a closed loop graph
// TODO: Some nodes are still half overlapping
// TODO: Rename all of the stupid variables I impulsively named
// TODO: Add comments

const cytoscape = require('cytoscape');
const noOverlap = require('cytoscape-no-overlap');
const itertools = require('itertools');

cytoscape.use(noOverlap);

$(document).ready(function() {

  var slider = $('#num-cities');
  var output = $("#slider-text");
  var numberOfCities = Number(slider.val());
  var nodes = Array.from(Array(numberOfCities), (x, index) => index + 1);
  var elementsData = generateNodesAndEdgesData(nodes);
  output.html(numberOfCities);

  var cy = cytoscape({
    container: $('#cy'),
    elements: elementsData,
    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#666',
          'label': 'data(id)'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle'
        }
      }
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
    container: $('#cy2')
  });
  cy2.mount($('#cy2'));
  cy2.add(cy.elements().clone());
  console.log(cy2);

  var initialPathDistance = pathDistance(cy.edges());
  $('#best-route-so-far').html(nodes.toString());
  $('#best-route-distance').html(initialPathDistance);

  slider.on('input', function() {
    newNumberOfCities = Number(slider.val());
    nodes = Array.from(Array(newNumberOfCities), (x, index) => index + 1);
    addOrRemoveNodes(cy, layout, numberOfCities, newNumberOfCities);
    numberOfCities = newNumberOfCities;
    output.html(numberOfCities);
    initialPathDistance = pathDistance(cy.edges());
    $('#best-route-so-far').html(nodes.toString());
    $('#best-route-distance').html(initialPathDistance);
  });

  $('#start').click(function() {
    permutationsWithoutInverse(cy, nodes, initialPathDistance);
  });

  $('#generate-map').click(function () {
    refreshLayout(cy, layout);
  });
});


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
function addOrRemoveNodes(cy, layout, oldNumCities, newNumCities) {
  // need to resize after nodes added
  cy.nodes().lock();
  var difference = Math.abs(newNumCities - oldNumCities);
  if (oldNumCities < newNumCities) {
    var previousNodeID = oldNumCities.toString();
    for (var n = 1; n < difference + 1; n++) {
      currentNodeID = (oldNumCities + n).toString();
      newNode = {
        data: { id: currentNodeID }
      };
      cy.add(newNode);
      edgeID = 'e' + previousNodeID + currentNodeID;
      newEdge = {
        data: { id: edgeID, source: previousNodeID, target: currentNodeID }
      };
      cy.add(newEdge);
      refreshLayout(cy, layout);
      cy.nodes().noOverlap({ padding: 5 });
      previousNodeID = currentNodeID;
      cy.nodes().lock();
    }
  } else if (oldNumCities > newNumCities) {
    cy.nodes().unlock();
    for (var n = 0; n < difference; n++) {
      nodeToRemove = cy.$('#' + (oldNumCities - n).toString());
      cy.remove( nodeToRemove );
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
function testNewPath(cy, oldPath, newPath, bestRouteDistance) {
  $('#trial-route').html(newPath.toString());
  // Number of nodes (cities) remains the same between paths
  var numCities = oldPath.length;
  var oldEdgeConfig = new Set();
  var newEdgeConfig = new Set();
  for (var i = 0; i < numCities - 1; i++) {
    var edgeID = cy.elements('edge')[i].data('id');
    // Edge IDs are saved like 'e12' so strip 'e'
    var edgeIDStr = edgeID.substring(1);
    oldEdgeConfig.add(edgeIDStr);
  }

  for (var j = 0; j < numCities - 1; j++) {
    var newEdgeID = newPath[j].toString() + newPath[j+1].toString();
    newEdgeConfig.add(newEdgeID);
  }

  var edgesToRemove = setDifference(oldEdgeConfig, newEdgeConfig);
  var edgesToAdd = setDifference(newEdgeConfig, oldEdgeConfig);
  var edgesToKeep = setDifference(oldEdgeConfig, edgesToRemove);
  // Draw the next path
  changePaths(cy, edgesToKeep, edgesToAdd);

  var totalDistance = pathDistance(cy.edges());
  $('#trial-distance').html(totalDistance);
  // Check if we have found a new best route
  if (totalDistance < bestRouteDistance) {
    $('#best-route-so-far').html(newPath.toString());
    $('#best-route-distance').html(totalDistance);
    return {distance: totalDistance, isBestRoute: true};
  } else {
    return {distance: totalDistance, isBestRoute: false};
  }
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
async function permutationsWithoutInverse(cy, cities, bestRouteDistance) {
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
      pathData = testNewPath(cy, previousPath, path, bestRouteDistance); 
      await sleep(200);
      if (pathData.isBestRoute) {
        bestRouteDistance = pathData.distance;
      }
      previousPath = path;
    }
  }
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


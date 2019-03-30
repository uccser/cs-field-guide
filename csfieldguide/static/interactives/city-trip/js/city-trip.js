// TODO: Some nodes are still half overlapping
// TODO: Rename all of the stupid variables I impulsively named
// TODO: Add comments
// TODO: Add distance scale to frontend
// TODO: Show execution time
// issue: nodes can lie on edges ( visual issue )

const cytoscape = require('cytoscape');
const noOverlap = require('cytoscape-no-overlap');
const automove = require('cytoscape-automove');
const itertools = require('itertools');
const Mathjs = require('mathjs');

cytoscape.use(noOverlap);
cytoscape.use(automove);
var stopPathFinding = false;

$(document).ready(function() {

  updateStatus("ready to go!", 'status-ready');
  var slider = $('#num-cities');
  var output = $("#slider-text");
  var numberOfCities = Number(slider.val());
  var cities = Array.from(Array(numberOfCities), (x, index) => index + 1);
  var startingCity = cities[Math.floor(Math.random()*(cities.length - 1))];
  intermediateCities = cities.filter(function(city) {
    return city !== startingCity;
  });
  citiesLoop = addOriginCityToPath(startingCity, intermediateCities);
  output.html(numberOfCities);

  var cy = cytoscape({
    container: $('#cy'),
    elements: initialiseGraph(cities, citiesLoop),
    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#007bff',
          'label': 'data(id)',
          'text-valign': 'center',
          'color': '#fff'
        }
      },

      {
        selector: 'edge',
        style: {
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
  setGraphOptions(cy);
  cy.mount($('#cy'));

  var cy2 = cytoscape({
    container: $('#cy2'),
    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#28a745',
          'label': 'data(id)',
          'text-valign': 'center',
          'color': '#fff'
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
  setGraphOptions(cy2);
  cy2.nodes().ungrabify();

  var pathDistance = getPathDistance(cy.edges());
  updateRouteStats();

  slider.on('input', function() {
    cy.nodes().grabify();
    newNumberOfCities = Number(slider.val());
    cities = Array.from(Array(newNumberOfCities), (x, index) => index + 1);
    //startingCity = cities[Math.floor(Math.random()*cities.length)];
    intermediateCities = cities.filter(function(city) {
      return city !== startingCity;
    });
    citiesLoop = addOriginCityToPath(startingCity, intermediateCities);
    console.log(cy.edges());
    addOrRemoveNodes(cy, cy2, layout, numberOfCities, newNumberOfCities, startingCity.toString());
    setGraphOptions(cy); // potentially improve?
    numberOfCities = newNumberOfCities;
    output.html(numberOfCities);
    pathDistance = getPathDistance(cy.edges());
    updateRouteStats();
    updateStatus("ready to go!", 'status-ready');
  });

  $('#start').click(function() {
    cy.nodes().ungrabify();
    stopPathFinding = false;
    updateStatus("running", 'status-running');
    permutationsWithoutInverse(cy, cy2, cities, pathDistance, startingCity);
    calculateTimeTaken(numberOfCities);
  });

  $('#stop').click(function() {
    cy.nodes().grabify();
    // quit execution of path finding
    stopPathFinding = true;
    updateStatus("stopped", 'status-stopped');
  });

  // Generate a new graph layout and make sure the best route graph matches
  $('#generate-map').click(function () {
    cy.nodes().grabify();
    cy2.remove(cy2.elements());
    refreshLayout(cy, layout);
    cy2.add(cy.elements().clone());
    setGraphOptions(cy2);
    cy2.nodes().ungrabify();
    pathDistance = getPathDistance(cy.edges());
    updateRouteStats();
    updateStatus("ready to go!", 'status-ready');
  });

  // Updates the trial route and best route info along with their corresponding distances
  function updateRouteStats() {
    $('#trial-route').html(citiesLoop.toString());
    $('#trial-distance').html(pathDistance);
    $('#best-route-so-far').html(citiesLoop.toString());
    $('#best-route-distance').html(pathDistance);
  };

  // Updates best route graph to match the initial graph when a user drags a node on the initial graph
  // Might need to look at how to improve this instead of wiping and cloning a new graph...
  cy.on('dragfreeon', 'nodes', function(evt) {
    cy2.remove(cy2.elements());
    cy2.add(cy.elements().clone());
    cy2.nodes().ungrabify();
    pathDistance = getPathDistance(cy.edges());
    updateRouteStats();
  });
});


function updateStatus(statusText, currentClass) {
  var status = $("#status");
  status.html(statusText);
  status.removeClass();
  status.addClass(currentClass);
};


function setGraphOptions(cyGraph) {
  cyGraph.fit();
  cyGraph.userPanningEnabled(false);
  cyGraph.automove({
    nodesMatching: cyGraph.nodes(),
    reposition: 'viewport'
  });
}


function initialiseGraph(nodes, cityLoop) {
  var graphData = [];
  // generate nodes (cities) for city map
  for (node of nodes) {
    nodeData = {
      data: { id: node.toString() }
    };
    graphData.push(nodeData);
  }
  // generate edges (roads) between nodes (cities)
  console.log(cityLoop);
  for (var i = 0; i < cityLoop.length - 1; i++) {
    sourceNode = cityLoop[i].toString();
    targetNode = cityLoop[i+1].toString();
    edgeID = 'e' + sourceNode + targetNode;
    edgeData = {
      data: { id: edgeID, source: sourceNode, target: targetNode}
    }
    graphData.push(edgeData);
  }
  // for (var e = 0; e < nodes.length; e++) {
  //   sourceNode = nodes[e].toString();
  //   if (e == nodes.length - 1) {
  //     targetNode = '1';
  //   } else {
  //     targetNode = nodes[e+1].toString();
  //   }
  //   edgeID = 'e' + sourceNode + targetNode;
  //   edgeData = {
  //     data: { id: edgeID, source: sourceNode, target: targetNode}
  //   }
  //   graphData.push(edgeData);
  // }

  return graphData;
}


function addEdge(cyGraph, sourceNodeId, targetNodeId) {
  edgeID = 'e' + sourceNodeId + targetNodeId;
  newEdge = {
    data: { id: edgeID, source: sourceNodeId, target: targetNodeId },
    classes: 'edgesToAdd'
  };
  cyGraph.add(newEdge);
}


// Adds or removes nodes when user alters number of nodes via slider input
function addOrRemoveNodes(cy, cy2, layout, oldNumCities, newNumCities, startNode) {
  // Lock existing nodes so their layout doesn't change once refreshLayout is called
  cy.nodes().lock();
  var difference = Math.abs(newNumCities - oldNumCities);
  if (oldNumCities < newNumCities) {
    // Remove edge that closes the loop
    // console.log(cy.edges());
    previousNodeID = oldNumCities.toString();
    cy.remove(cy.$('#e' + previousNodeID + startNode));
    console.log(cy.edges());
    cy2.remove(cy2.$('#e' + previousNodeID + startNode));
    // Add nodes
    addNodes(cy, oldNumCities, difference, startNode);
    // Make sure layout is still random and nodes can't overlap when dragged
    refreshLayout(cy, layout);
    //previousNodeID = currentNodeID;
    cy.nodes().lock();
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
      removeNodes(cy, cy2, layout, newNumCities, oldNumCities, n, startNode);
      setGraphOptions(cy2);
    }
  }
  cy.nodes().unlock();
}


function addNodes(cy, oldNumCities, difference, startNode) {
  var previousNodeID = oldNumCities.toString();
  for (var n = 1; n <= difference; n++) {
    // Create node
    currentNodeID = (oldNumCities + n).toString();
    newNode = {
      data: { id: currentNodeID },
      classes: 'nodesToAdd'
    };
    cy.add(newNode);

    // Create edge
    console.log(previousNodeID);
    console.log(currentNodeID);
    addEdge(cy, previousNodeID, currentNodeID);
  }
  // Create edge that closes the loop
  addEdge(cy, currentNodeID, startNode);
}


function removeNodes(cy, cy2, layout, newNumCities, oldNumCities, n, startNode) {
  if (stopPathFinding) {
    // If removing nodes after clicking 'stop' have to reset graph because some edges between nodes don't exist.
    // (will be part way through path finding)
    cy.remove(cy.elements());
    // Create blue graph
    var nodes = Array.from(Array(newNumCities), (x, index) => index + 1);
    cy.add(initialiseGraph(nodes));
    refreshLayout(cy, layout);
    // Copy blue graph to over to best route graph
    cy2.remove(cy2.elements());
    cy2.add(cy.elements().clone());
    cy2.nodes().ungrabify();
    // Only need to redraw entire graph on first removal of node after clicking 'stop'
    stopPathFinding = false;
  } else {
    // Here we know that path finding has not begun, so we know upon removing nodes that the right edges exist.
    // Can simply remove the last node one by one
    nodeToRemove = cy.$('#' + (oldNumCities - n).toString());
    cy.remove( nodeToRemove );
    // Update best route graph to match
    nodeToRemoveCy2 = cy2.$('#' + (oldNumCities - n).toString());
    cy2.remove( nodeToRemoveCy2 );

    // Add in edge that closes the loop
    addEdge(cy, newNumCities, startNode);
    addEdge(cy2, newNumCities, startNode);
  }
}


// Make sure the layout is still random after new nodes have been added
function refreshLayout(cy, layout) {
  layout.stop();
  layout = cy.elements().makeLayout({
    name: "random",
    avoidOverlap: true
  });
  layout.run();
  cy.nodes().noOverlap({ padding: 5 });
}


// Draw the new path and calculate it's distance
// Updates frontend text if new best route found
// Returns distance of the new path and if it is the best route so far or not
function testNewPath(cy, cy2, newPath, bestRouteDistance, startNode) {
  $('#trial-route').html(newPath.toString());
  // Number of nodes (cities) remains the same between paths
  // Minus one because we include the start node twice (it is also the end node)
  var numCities = newPath.length - 1;
  var newEdgeConfig = new Set();
  for (var j = 0; j < numCities; j++) {
    var newEdgeID = newPath[j].toString() + newPath[j+1].toString();
    console.log(newEdgeID);
    newEdgeConfig.add(newEdgeID);
  }

  findEdgeDifferences(cy, newEdgeConfig, numCities, startNode);

  var totalDistance = getPathDistance(cy.edges());
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
function findEdgeDifferences(cyGraph, newEdgeConfig, numCities, startNode) {
  console.log(numCities);
  // Remove edge that closes the loop
  var lastNodeID = numCities.toString();
  cyGraph.remove(cyGraph.$('#e' + lastNodeID + startNode));
  // Number of nodes (cities) remains the same between paths;
  var oldEdgeConfig = new Set();
  for (var i = 0; i < numCities; i++) {
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
  var edgesToKeepArr = Array.from(edgesToKeep);
  console.log('edgesToAdd');
  console.log(edgesToAdd);
  console.log('edges to keep arr');
  console.log(edgesToKeepArr);
  for (var i = 0; i < edgesToKeepArr.length - 1; i++) {
    edgesToKeepStr += '#e' + edgesToKeepArr[i] + ', ';
  }
  if (edgesToKeepArr.length > 0) {
    edgesToKeepStr += '#e' + edgesToKeepArr[i];
  }

  console.log('edgs to keep str');
  console.log(edgesToKeepStr);
  console.log(cy.edges().difference(edgesToKeepStr));
  console.log('end');
  cy.remove(cy.edges().difference(edgesToKeepStr));

  for (let edgeId of edgesToAdd) {
    addEdge(cy, edgeId[0], edgeId[1]);
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
// async function permutationsWithoutInverse(cy, cy2, cities, bestRouteDistance) {
//   var len = cities.length;
//   var paths = [...itertools.permutations(cities)];
//   var pathsWithoutInverse = [];
//   // Push the path already shown to the user (initial path)
//   pathsWithoutInverse.push(cities);
//   var previousPath = cities;
//   for (var i = 1; i < paths.length; i++) {
//     if (stopPathFinding) {
//       break;
//     }
//     path = paths[i];
//     if (path[0] <= path[len-1]) {
//       pathsWithoutInverse.push(path);
//       // Draw graph here
//       pathData = testNewPath(cy, cy2, previousPath, path, bestRouteDistance); 
//       await sleep(20);
//       if (pathData.isBestRoute) {
//         bestRouteDistance = pathData.distance;
//       }
//       previousPath = path;
//     }
//   }
//   updateStatus("complete!", 'status-complete');
//   cy.nodes().grabify();
// }


function addOriginCityToPath(originCity, cities) {
  // Add origin city to start of route
  temp = [originCity].concat(cities);
  // Add origin city to end of route and return
  return temp.concat(originCity);
}


async function permutationsWithoutInverse(cy, cy2, cities, bestRouteDistance, startingCity) {
  var len = cities.length;
  cities = cities.filter(function(city) {
    return city !== startingCity;
  });
  var paths = [...itertools.permutations(cities)];
  var pathsWithoutInverse = [];
  // Push the path already shown to the user (initial path)
  pathsWithoutInverse.push(cities);
  //var previousPath = addOriginCityToPath(startingCity, cities);
  for (var i = 1; i < paths.length; i++) {
    if (stopPathFinding) {
      break;
    }
    path = paths[i];

    if (path[0] <= path[len-3]) {
      pathsWithoutInverse.push(path);
      pathWithStartingCity = addOriginCityToPath(startingCity, path);
      // Draw graph here
      pathData = testNewPath(cy, cy2, pathWithStartingCity, bestRouteDistance, startingCity.toString());
      await sleep(20);
      if (pathData.isBestRoute) {
        bestRouteDistance = pathData.distance;
      }
      //previousPath = pathWithStartingCity;
    }
  }
  updateStatus("complete!", 'status-complete');
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
function getPathDistance(edges) {
  var distance = 0;
  for (var i = 0; i < edges.length; i++) {
    var edge = edges[i];
    var sourceNode = edge.source();
    var targetNode = edge.target();
    distance += distanceBetweenCities(sourceNode.position(), targetNode.position());
  }

  return Math.round(distance);
}


function calculateTimeTaken(cities) {
  // can only have whole integers for number of items
  // console.log(cities);
  // cities = Mathjs.bignumber(Math.round(cities));
  // console.log(cities); 

  numPaths = Mathjs.factorial(cities - 1) / 2;
  seconds = Mathjs.divide(numPaths, 10);

  var now = new Date();
  completionTime = new Date(now.getTime() + (seconds * 1000) + (numPaths * 20));
  // predictedCompletionTime.setSeconds(predictedCompletionTime.getTime().getSeconds() + seconds * 1000);
  // console.log(predictedCompletionTime);
  
  var x = setInterval(function() {
    var now = new Date().getTime();
    
    var runningTimeLeft = (completionTime.getTime() - now) / 1000;

    if (runningTimeLeft < 0) {
      clearInterval(x);
    }

    var years = Math.floor(runningTimeLeft / 31536000);
    var days = Math.floor((runningTimeLeft % 31536000) / 86400);
    var hours = Math.floor((runningTimeLeft % 86400) / 3600);
    var minutes = Math.floor((runningTimeLeft % 3600) / 60);
    var seconds = Math.floor(runningTimeLeft % 60);

    $('#num-years').html(years);
    $('#num-days').html(days);
    $('#num-hours').html(hours);
    $('#num-minutes').html(minutes);
    $('#num-seconds').html(seconds);

  }, 20);
}




// JavaScript sleep function taken from 
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

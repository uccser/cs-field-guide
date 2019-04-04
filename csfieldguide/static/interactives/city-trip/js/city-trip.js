// TODO: Some nodes are still half overlapping
// TODO: Rename all of the stupid variables I impulsively named
// TODO: Add comments
// TODO: Add distance scale to frontend
// TODO: Show execution time
// issue: nodes can lie on edges ( visual issue )

const cytoscape = require('cytoscape');
const noOverlap = require('cytoscape-no-overlap');
const automove = require('cytoscape-automove');
const Mathjs = require('mathjs');

cytoscape.use(noOverlap);
cytoscape.use(automove);
var stopPathFinding = false;
var stoppedMidExecution = false;

$(document).ready(function() {

  updateStatus("ready to go!", 'status-ready');
  var output = $("#num-cities");
  var numberOfCities = 3;
  var maxCities = 27;
  var minCities = 3;
  var cities = Array.from(Array(numberOfCities), (x, index) => index + 1);
  var startingCity = 1;
  updateCitiesLoop();
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
          'color': '#fff',
          'height': 30,
          'width': 30
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
      avoidOverlap: true,
      fit: false
    }
  });

  var layout = cy.layout({
    name: "random",
    avoidOverlap: true,
    fit: false
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
          'color': '#fff',
          'height': 30,
          'width': 30
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
  runningTimeLeft = calculateRunningTime(numberOfCities);
  formatTime(runningTimeLeft);
  updateRouteStats();


  $('#add-city').click(function() {
    cy.nodes().lock();
    cy.nodes().grabify();
    addNode(cy, cy2, layout, numberOfCities, startingCity);
    // Make sure layout is still random and nodes can't overlap when dragged
    refreshLayout(cy, layout);
    setGraphOptions(cy);
    cy.nodes().unlock();
    // Update best route graph to match
    cy2.add(cy.$('.nodesToAdd').clone());
    cy2.add(cy.$('.edgesToAdd').clone());
    setGraphOptions(cy2);
    cy2.nodes().ungrabify();
  
    numberOfCities += 1;
    output.html(numberOfCities);
    cities.push(numberOfCities);
    updateCitiesLoop();
    pathDistance = getPathDistance(cy.edges());
    updateRouteStats();
    runningTimeLeft = calculateRunningTime(numberOfCities);
    formatTime(runningTimeLeft);
    $('#start').removeClass('d-none');
    $('#reset').addClass('d-none');
    updateStatus("ready to go!", 'status-ready');
    if (numberOfCities == maxCities) {
      $('#add-city').prop('disabled', true);
    }
    if (numberOfCities > minCities) {
      $('#remove-city').prop('disabled', false);
    }
  })

  $('#remove-city').click(function() {
    cy.nodes().unlock();
    cy.nodes().grabify();
    removeNode(cy, cy2, layout, numberOfCities, startingCity);
    setGraphOptions(cy);
    pathDistance = getPathDistance(cy.edges());
    updateRouteStats();

    numberOfCities -= 1;
    output.html(numberOfCities);
    cities.pop();
    updateCitiesLoop();
    pathDistance = getPathDistance(cy.edges());
    updateRouteStats()
    runningTimeLeft = calculateRunningTime(numberOfCities);
    formatTime(runningTimeLeft);
    $('#start').removeClass('d-none');
    $('#reset').addClass('d-none');
    updateStatus("ready to go!", 'status-ready');
    if (numberOfCities == minCities) {
      $('#remove-city').prop('disabled', true);
    }
    if (numberOfCities < maxCities) {
      $('#add-city').prop('disabled', false);
    }
  })

  $('#start').click(function() {
    cy.nodes().ungrabify();
    stopPathFinding = false;
    toggleButtons(false);
    $('#stop').removeClass('d-none');
    updateStatus("running", 'status-running');
    var intCities = cities.filter(function(city) {
      return city !== startingCity;
    });
    var k = intCities.length;
    permutations(cy, cy2, intCities, pathDistance, startingCity, k);
    // start timer
    completionTime = calculateRunningTime(cities.length);
    startTimer(completionTime);
  });


  $('#stop').click(function() {
    cy.nodes().ungrabify();
    // quit execution of path finding
    stopPathFinding = true;
    stoppedMidExecution = true;
    updateStatus("stopped", 'status-stopped');
    toggleButtons(false);
    $('#stop').addClass('d-none');
    $('#reset').removeClass('d-none');
  });

  $('#reset').click(function() {
    resetGraph(cy, cy2, numberOfCities, layout);
    stoppedMidExecution = false;
    toggleButtons(true);
    updateStatus("ready to go!", 'status-ready');
    runningTimeLeft = calculateRunningTime(numberOfCities);
    formatTime(runningTimeLeft);
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
    runningTimeLeft = calculateRunningTime(numberOfCities);
    formatTime(runningTimeLeft);
    $('#start').removeClass('d-none');
    updateStatus("ready to go!", 'status-ready');
  });

  // Updates the trial route and best route info along with their corresponding distances
  function updateRouteStats() {
    $('#trial-route').html(citiesLoop.toString());
    $('#trial-distance').html(pathDistance);
    $('#best-route-so-far').html(citiesLoop.toString());
    $('#best-route-distance').html(pathDistance);
  };

  function updateCitiesLoop() {
    intermediateCities = cities.filter(function(city) {
      return city !== startingCity;
    });
    citiesLoop = addOriginCityToPath(startingCity, intermediateCities);
  }

  function toggleButtons(isResetDisplayed) {
    if (isResetDisplayed) {
      $('#add-city').removeClass('d-none');
      $('#remove-city').removeClass('d-none');
      $('#generate-map').removeClass('d-none');
      $('#start').removeClass('d-none');
      $('#reset').addClass('d-none');
    } else {
      $('#add-city').addClass('d-none');
      $('#remove-city').addClass('d-none');
      $('#generate-map').addClass('d-none');
      $('#start').addClass('d-none');
    }
  }

  // Updates best route graph to match the initial graph when a user drags a node on the initial graph
  // Might need to look at how to improve this instead of wiping and cloning a new graph...
  cy.on('dragfreeon', 'nodes', function(evt) {
    cy2.remove(cy2.elements());
    cy2.add(cy.elements().clone());
    setGraphOptions(cy2)
    cy2.nodes().ungrabify();
    pathDistance = getPathDistance(cy.edges());
    updateRouteStats();
    $('#start').removeClass('d-none');
    $('#stop').removeClass('d-none');
    $('#reset').addClass('d-none');
  });
});


function updateStatus(statusText, currentClass) {
  var status = $("#status");
  status.html(statusText);
  status.removeClass();
  status.addClass(currentClass);
};


function setGraphOptions(cyGraph) {
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
  for (var i = 0; i < cityLoop.length - 1; i++) {
    sourceNode = cityLoop[i].toString();
    targetNode = cityLoop[i+1].toString();
    edgeID = sourceNode + '-' + targetNode;
    edgeData = {
      data: { id: edgeID, source: sourceNode, target: targetNode}
    }
    graphData.push(edgeData);
  }

  return graphData;
}


function addEdge(cyGraph, sourceNodeId, targetNodeId) {
  edgeID = sourceNodeId + '-' + targetNodeId;
  newEdge = {
    data: { id: edgeID, source: sourceNodeId, target: targetNodeId },
    classes: 'edgesToAdd'
  };
  cyGraph.add(newEdge);
}


function addNode(cy, cy2, layout, oldNumCities, startNode) {
  if (stopPathFinding) {
    // Once path finding has been interrupted we need to reset the graph because some edges between nodes don't exist
    newNumCities = oldNumCities + 1;
    resetGraph(cy, cy2, newNumCities, layout);
    stopPathFinding = false;
  } else {
    var previousNodeID = oldNumCities.toString();
    // Remove edge that closes the loop
    cy.remove(cy.$('#' + previousNodeID + '-' + startNode));
    cy2.remove(cy2.$('#' + previousNodeID + '-' + startNode));
    // Create node
    currentNodeID = (oldNumCities + 1).toString();
    newNode = {
      data: { id: currentNodeID },
      classes: 'nodesToAdd'
    };
    cy.add(newNode);
    addEdge(cy, previousNodeID, currentNodeID);
    // Create edge that closes the loop
    addEdge(cy, currentNodeID, startNode);
  }
}


function resetGraph(cy, cy2, newNumCities, layout) {
  cy.remove(cy.elements());
  // Create blue graph
  var nodes = Array.from(Array(newNumCities), (x, index) => index + 1);
  intermediateNodess = nodes.filter(function(node) {
    return node !== 1;
  });
  var cityLoop = addOriginCityToPath(1, intermediateNodess);
  cy.add(initialiseGraph(nodes, cityLoop));
  refreshLayout(cy, layout);
  setGraphOptions(cy);
  // Copy blue graph to over to best route graph
  cy2.remove(cy2.elements());
  cy2.add(cy.elements().clone());
  cy2.nodes().ungrabify();
}


function removeNode(cy, cy2, layout, numberOfCities, startNode) {
  var newNumCities = numberOfCities - 1;
  // Once path finding has been interrupted we need to reset the graph because some edges between nodes don't exist
  if (stopPathFinding) {
    resetGraph(cy, cy2, newNumCities, layout);
    stopPathFinding = false;
  } else {
    nodeToRemove = cy.$('#' + (numberOfCities).toString());
    cy.remove( nodeToRemove );
    // Update best route graph to match
    nodeToRemoveCy2 = cy2.$('#' + (numberOfCities).toString());
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
    avoidOverlap: true,
    fit: false
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
    var newEdgeID = newPath[j].toString() + '-' + newPath[j+1].toString();
    newEdgeConfig.add(newEdgeID);
  }

  findEdgeDifferences(cy, newEdgeConfig, numCities, startNode);

  var totalDistance = getPathDistance(cy.edges());
  $('#trial-distance').html(totalDistance);
  // Check if we have found a new best route
  if (totalDistance < bestRouteDistance) {
    previousBestRoute = $('#best-route-so-far').html().split(',');
    findEdgeDifferences(cy2, newEdgeConfig, numCities, numCities);
    $('#best-route-so-far').html(newPath.toString());
    $('#best-route-distance').html(totalDistance);
    return {distance: totalDistance, isBestRoute: true};
  } else {
    return {distance: totalDistance, isBestRoute: false};
  }
}


// Finds the edge differences between two paths and draws the new path by calling changePaths
function findEdgeDifferences(cyGraph, newEdgeConfig, numCities, startNode) {
  // Remove edge that closes the loop
  var lastNodeID = numCities.toString();
  cyGraph.remove(cyGraph.$('#' + lastNodeID + '-' + startNode));
  // Number of nodes (cities) remains the same between paths;
  var oldEdgeConfig = new Set();
  for (var i = 0; i < numCities - 1; i++) {
    var edgeID = cyGraph.elements('edge')[i].data('id');
    oldEdgeConfig.add(edgeID);
  }

  var edgesToRemove = setDifference(oldEdgeConfig, newEdgeConfig);
  var edgesToAdd = setDifference(newEdgeConfig, oldEdgeConfig);
  var edgesToKeep = setDifference(oldEdgeConfig, edgesToRemove);
  // Draw the next path;
  changePaths(cyGraph, edgesToKeep, edgesToAdd);
}


// Draws the path
function changePaths(cy, edgesToKeep, edgesToAdd) {
  var edgesToKeepStr = '';
  var edgesToKeepArr = Array.from(edgesToKeep);
  for (var i = 0; i < edgesToKeepArr.length - 1; i++) {
    edgesToKeepStr += '#' + edgesToKeepArr[i] + ', ';
  }
  if (edgesToKeepArr.length > 0) {
    edgesToKeepStr += '#' + edgesToKeepArr[i];
  }
  cy.remove(cy.edges().difference(edgesToKeepStr));

  for (let edgeId of edgesToAdd) {
    edgeNodes = edgeId.split('-');
    var sourceNode = edgeNodes[0];
    var targetNode = edgeNodes[1];
    addEdge(cy, sourceNode, targetNode);
  }
}


// Calulate a\b 
// E.g if a = {1,2,3,4} and b = {5,4,3,2} this function would return {1}
function setDifference(a, b) {
  var aMinusB = new Set([...a].filter(x => !b.has(x)));
  return aMinusB;
}


function addOriginCityToPath(originCity, cities) {
  // Add origin city to start of route
  temp = [originCity].concat(cities);
  // Add origin city to end of route and return
  return temp.concat(originCity);
}


function swap(A, i, j) {
  [A[i], A[j]] = [A[j], A[i]];
  return A;
}


async function permutations(cy, cy2, intCities, bestRouteDistance, startingCity, k) {
  c = new Array(k).fill(0);
  pathWithStartingCity = addOriginCityToPath(startingCity, intCities);

  // Draw graph here
  pathData = testNewPath(cy, cy2, pathWithStartingCity, bestRouteDistance, startingCity.toString());
  await sleep(100);
  if (pathData.isBestRoute) {
    bestRouteDistance = pathData.distance;
  }
  var i = 0;
  while (i < k) {
    if (stopPathFinding == true) {
      stoppedMidExecution = true;
      break;
    } 
    if (c[i] < i) {
      if (i % 2 == 0) {
        swap(intCities, 0, i);
      } else {
        swap(intCities, c[i], i);
      }
      if (intCities[0] <= intCities[k-1]) {
        pathWithStartingCity = addOriginCityToPath(startingCity, intCities);
        // Draw graph here
        pathData = testNewPath(cy, cy2, pathWithStartingCity, bestRouteDistance, startingCity.toString());
        await sleep(100);
        if (pathData.isBestRoute) {
          bestRouteDistance = pathData.distance;
        }
      }
      c[i] += 1;
      i = 0;
    } else {
      c[i] = 0;
      i += 1;
    }
  }
  if (stoppedMidExecution == false) {
    updateStatus("complete!", 'status-complete');
    $('#start').removeClass('d-none');
    $('#add-city').removeClass('d-none');
    $('#remove-city').removeClass('d-none');
    $('#generate-map').removeClass('d-none');
    $('#stop').addClass('d-none');
  }
  stopPathFinding = true;
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

  distance = Mathjs.divide(distance, 100);

  return Math.round(distance);
}


function showTimeUnit(unit, value) {
  unitPlural = unit + 's';
  unitElement = $('#num-' + unitPlural);
  if (value > 0 || unit == 'second') {
    var format = ngettext('1 ' + unit, '%(value)s ' + unitPlural + ' ', value);
    var timeUnitText = interpolate(format, {"value": value.toLocaleString()}, true);
    unitElement.html(timeUnitText);
    unitElement.removeClass('d-none');
  } else {
    unitElement.addClass('d-none');
  }
}


function formatTime(runningTimeLeft) {
  var years = Math.floor(runningTimeLeft / 31536000);
  var months = Math.floor((runningTimeLeft % 31536000) / 2628000);
  var days = Math.floor((runningTimeLeft % 2628000) / 86400);
  var hours = Math.floor((runningTimeLeft % 86400) / 3600);
  var minutes = Math.floor((runningTimeLeft % 3600) / 60);
  var seconds = (runningTimeLeft % 60).toFixed(1);

  showTimeUnit('year', years);
  showTimeUnit('month', months);
  showTimeUnit('day', days);
  showTimeUnit('hour', hours);
  showTimeUnit('minute', minutes);
  showTimeUnit('second', seconds);
}


function startTimer(seconds) {
  var x = setInterval(function() {
    seconds = seconds - 0.1;
    if (stopPathFinding || seconds < 0) {
      clearInterval(x);
    } else {
      formatTime(seconds);
    }
  }, 100);
}


function calculateRunningTime(cities) {
  factorialTemp = Mathjs.factorial(cities - 1);
  numPaths = Mathjs.divide(factorialTemp, 2);
  seconds = Mathjs.divide(numPaths, 10);

  return seconds;
}


// JavaScript sleep function taken from 
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const cytoscape = require('cytoscape');
const noOverlap = require('cytoscape-no-overlap');
const automove = require('cytoscape-automove');
const Mathjs = require('mathjs');
const ha = require('./heapsAlgorithm.js')

cytoscape.use(noOverlap);
cytoscape.use(automove);
var stopPathFinding = false;
var stoppedMidExecution = false; // true when the stop button is pressed during path finding
var bestRouteDistance;
var trialRouteDistance;

const STATUS_COMPLETE = gettext("complete!");
const STATUS_READY = gettext("ready to go!");
const STATUS_STOPPED = gettext("stopped");
const STATUS_RUNNING = gettext("running");

const TIME_UNITS = {
  'year': 31536000,
  'month': 2628000,
  'day': 86400,
  'hour': 3600,
  'minute': 60
};

$(document).ready(function() {

  updateStatus(STATUS_READY, 'status-ready');
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

  runningTimeLeft = calculateRunningTime(numberOfCities);
  displayInitialtime(runningTimeLeft);
  updateRouteStats();

  $('#add-city').click(function() {
    cy.nodes().lock();
    cy.nodes().grabify();
    addNode(cy, cy2, layout, numberOfCities, startingCity);
  
    numberOfCities += 1;
    output.html(numberOfCities);
    cities.push(numberOfCities);
    updateCitiesLoop();
    updateRouteStats();
    runningTimeLeft = calculateRunningTime(numberOfCities);
    displayInitialtime(runningTimeLeft);
    $('#start').removeClass('d-none');
    $('#reset').addClass('d-none');
    updateStatus(STATUS_READY, 'status-ready');
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

    cities.pop();
    numberOfCities -= 1;
    output.html(numberOfCities);
    updateCitiesLoop();
    updateRouteStats()
    runningTimeLeft = calculateRunningTime(numberOfCities);
    displayInitialtime(runningTimeLeft);
    $('#start').removeClass('d-none');
    $('#reset').addClass('d-none');
    updateStatus(STATUS_READY, 'status-ready');
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
    updateStatus(STATUS_RUNNING, 'status-running');
    var intermediateCities = cities.filter(function(city) {
      return city !== startingCity;
    });
    seconds = calculateRunningTime(cities.length);
    ha.initHeapsAlgorithm(intermediateCities);
    beginPathFinding(cy, cy2, intermediateCities, startingCity, seconds);
  });


  $('#stop').click(function() {
    cy.nodes().ungrabify();
    // quit execution of path finding
    stopPathFinding = true;
    stoppedMidExecution = true;
    updateStatus(STATUS_STOPPED, 'status-stopped');
    toggleButtons(false);
    $('#stop').addClass('d-none');
    $('#reset').removeClass('d-none');
  });

  $('#reset').click(function() {
    resetGraph(cy, cy2, numberOfCities, layout);
    stoppedMidExecution = false;
    toggleButtons(true);
    updateStatus(STATUS_READY, 'status-ready');
    updateRouteStats();
    runningTimeLeft = calculateRunningTime(numberOfCities);
    displayInitialtime(runningTimeLeft);
  });

  /** Generates a new graph layout and make sure the best route graph matches */
  $('#generate-map').click(function () {
    cy.nodes().grabify();
    cy2.remove(cy2.elements());
    refreshLayout(cy, layout);
    cy2.add(cy.elements().clone());
    setGraphOptions(cy2);
    cy2.nodes().ungrabify();
    runningTimeLeft = calculateRunningTime(numberOfCities);
    displayInitialtime(runningTimeLeft);
    updateRouteStats();
    $('#start').removeClass('d-none');
    updateStatus(STATUS_READY, 'status-ready');
  });

  /** Updates best route graph to match the initial graph when a user drags a node on the initial graph */
  cy.on('dragfreeon', 'nodes', function(evt) {
    cy2.remove(cy2.elements());
    cy2.add(cy.elements().clone());
    setGraphOptions(cy2)
    cy2.nodes().ungrabify();
    updateRouteStats();
    $('#start').removeClass('d-none');
    $('#stop').removeClass('d-none');
    $('#reset').addClass('d-none');
  });

  /** Updates the trial route and best route info along with their corresponding distances. */
  function updateRouteStats() {
    trialRouteDistance = getPathDistance(cy.edges()); // update global
    bestRouteDistance = trialRouteDistance; // update global
    $('#trial-route').html(citiesLoop.toString());
    $('#trial-distance').html(trialRouteDistance.toFixed(2));
    $('#best-route-so-far').html(citiesLoop.toString());
    $('#best-route-distance').html(bestRouteDistance.toFixed(2));
  };

  /** E.g if cities = [1,2,3] and startingCity is 1 then:
   *  intermediateCities = [2,3] and citiesLoop = [1,2,3,1] */
  function updateCitiesLoop() {
    intermediateCities = cities.filter(function(city) {
      return city !== startingCity;
    });
    citiesLoop = addStartingCityToPath(startingCity, intermediateCities);
  }

  /** If the reset button has been clicked show the user the buttons that
   *  can alter the graph. Otherwise hide the buttons that can alter the graph. */
  function toggleButtons(resetHasBeenClicked) {
    if (resetHasBeenClicked) {
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
});


/** Shows the current status of the algorithm. */
function updateStatus(statusText, currentClass) {
  var status = $("#status");
  status.html(statusText);
  status.removeClass();
  status.addClass(currentClass);
};


/** User cannot pan the graph and keep graph within the viewport. */
function setGraphOptions(cyGraph) {
  cyGraph.userPanningEnabled(false);
  cyGraph.automove({
    nodesMatching: cyGraph.nodes(),
    reposition: 'viewport'
  });
}


/** Creates the nodes and edges for the graph, appends them to an array and return. */
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


/** Adds an edge to the graph. */
function addEdge(cyGraph, sourceNodeId, targetNodeId) {
  edgeID = sourceNodeId + '-' + targetNodeId;
  newEdge = {
    data: { id: edgeID, source: sourceNodeId, target: targetNodeId },
    classes: 'edgesToAdd'
  };
  cyGraph.add(newEdge);
}


/** Adds a node to the graph */
function addNode(cy, cy2, layout, oldNumCities, startNode) {
  newNumCities = oldNumCities + 1;
  if (stopPathFinding) {
    // Once path finding has been interrupted we need to reset the graph because some edges between nodes don't exist
    resetGraph(cy, cy2, newNumCities, layout);
    stopPathFinding = false;
  } else {
    var previousNodeID = oldNumCities.toString();
    // Remove edge that closes the loop
    cy.remove(cy.$('#' + previousNodeID + '-' + startNode));
    cy2.remove(cy2.$('#' + previousNodeID + '-' + startNode));
    // Create node
    currentNodeID = (newNumCities).toString();
    newNode = {
      data: { id: currentNodeID }
    };
    cy.add(newNode);
    addEdge(cy, previousNodeID, currentNodeID);
    // Create edge that closes the loop
    addEdge(cy, currentNodeID, startNode);
    // Make sure layout is still random and nodes can't overlap when dragged
    refreshLayout(cy, layout);
    setGraphOptions(cy);
    cy.nodes().unlock();
    // Update best route graph to match
    cy2.add(cy.elements().clone());
    setGraphOptions(cy2);
    cy2.nodes().ungrabify();
  }
}


/** Clears the current graph and generates a new one. */
function resetGraph(cy, cy2, newNumCities, layout) {
  cy.remove(cy.elements());
  cy2.remove(cy2.elements());
  // Create trial route graph
  var nodes = Array.from(Array(newNumCities), (x, index) => index + 1);
  intermediateNodess = nodes.filter(function(node) {
    return node !== 1;
  });
  var cityLoop = addStartingCityToPath(1, intermediateNodess);
  cy.add(initialiseGraph(nodes, cityLoop));
  refreshLayout(cy, layout);
  setGraphOptions(cy);
  // Copy trial route graph to over to best route graph
  cy2.add(cy.elements().clone());
  cy2.nodes().ungrabify();
}


/** Removes a node from the graph. */
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


/** Makes sure the layout is still random after new nodes have been added. */
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


/** Draws the new path (through findEdgeDifferences and changePaths functions),
 *  and calculates it's distance.
 *  Updates frontend text for trial routes and if new best route found. */
function testNewPath(cy, cy2, newPath, startNode) {
  $('#trial-route').html(newPath.toString());
  // Minus one because we include the start node twice (it is also the end node)
  var numCities = newPath.length - 1;
  var newEdgeConfig = new Set();
  for (var j = 0; j < numCities; j++) {
    var newEdgeID = newPath[j].toString() + '-' + newPath[j+1].toString();
    newEdgeConfig.add(newEdgeID);
  }

  findEdgeDifferences(cy, newEdgeConfig, numCities, startNode);

  trialRouteDistance = getPathDistance(cy.edges());
  $('#trial-distance').html(trialRouteDistance.toFixed(2));
  // Check if we have found a new best route
  if (trialRouteDistance < bestRouteDistance) {
    previousBestRoute = $('#best-route-so-far').html().split(',');
    // show the best path on the best route graph
    findEdgeDifferences(cy2, newEdgeConfig, numCities, numCities);
    $('#best-route-so-far').html(newPath.toString());
    $('#best-route-distance').html(trialRouteDistance.toFixed(2));
    bestRouteDistance = trialRouteDistance;
  }
}


/** Finds the edge differences between two paths 
 *  and draws the new path by calling changePaths */
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


/** Draws the path */
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


/** Calulate a\b 
 *  E.g if a = {1,2,3,4} and b = {5,4,3,2} this function would return {1} */
function setDifference(a, b) {
  var aMinusB = new Set([...a].filter(x => !b.has(x)));
  return aMinusB;
}


/** E.g if the startingCity is 1 and cities is [2,3] return [1,2,3,1] */
function addStartingCityToPath(startingCity, cities) {
  // Add origin city to start of route
  temp = [startingCity].concat(cities);
  // Add origin city to end of route and return
  return temp.concat(startingCity);
}


 /** Start timer and begin finding permutations by calling methods in heapsAlgorithm.js. */
function beginPathFinding(cy, cy2, intermediateCities, startingCity, seconds) {
  // if permutations to do
  if (stopPathFinding == false) {
    // start timer
    timer = setTimeout(function() {beginPathFinding(cy, cy2, intermediateCities, startingCity, seconds);}, 100);
    seconds = seconds - 0.1;
    formatTime(seconds);
    computeAndDisplayNextRoute(cy, cy2, intermediateCities, startingCity);
  } else {
    clearTimeout(timer);
  }
  if (stopPathFinding && !stoppedMidExecution) {
    // Making sure we have iterated over all paths before showing complete message
    updateStatus(STATUS_COMPLETE, 'status-complete');
    $('#start').removeClass('d-none');
    $('#add-city').removeClass('d-none');
    $('#remove-city').removeClass('d-none');
    $('#generate-map').removeClass('d-none');
    $('#stop').addClass('d-none');
  }
}


/** Get the next permutation from heapsAlgorithm.js and render the graph 
 *  by calling testNewPath. */
function computeAndDisplayNextRoute(cy, cy2, intermediateCities, startingCity) {
  intermediateCities = ha.getNextPermutation();
  if (intermediateCities) {
    pathWithStartingCity = addStartingCityToPath(startingCity, intermediateCities);
    testNewPath(cy, cy2, pathWithStartingCity, startingCity.toString()); // render graph
  } else {
    stopPathFinding = true;
  }
}


/** Pass in 2 positions and use (x,y) coords to calc distance. */
function distanceBetweenCities(edgeStartPos, edgeEndPos) {
  var a = Math.abs(edgeStartPos.x - edgeEndPos.x);
  var b = Math.abs(edgeStartPos.y - edgeEndPos.y);
  var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

  return c;
}


/** Returns total distance of the path. */
function getPathDistance(edges) {
  var distance = 0;
  for (var i = 0; i < edges.length; i++) {
    var edge = edges[i];
    var sourceNode = edge.source();
    var targetNode = edge.target();
    distance += distanceBetweenCities(sourceNode.position(), targetNode.position());
  }
  distance = Mathjs.divide(distance, 100);

  return distance;
}


/** Formats the time into years,months,days,hours,minutes,seconds string. */
function showTimeUnit(unit, value) {
  unitPlural = unit + 's';
  unitElement = $('#num-' + unitPlural);
  // We still want to show 0 seconds as it is the smallest unit of time shown
  if (value > 0 || unit == 'second') {
    var format = ngettext('1 ' + unit, '%(value)s ' + unitPlural + ' ', value);
    var timeUnitText = interpolate(format, {"value": value.toLocaleString()}, true);
    unitElement.html(timeUnitText);
    unitElement.removeClass('d-none');
  } else {
    unitElement.addClass('d-none');
  }
}


/** Calculates how many years,months,days.. etc there are in runningTimeLeft.
 *  runningTimeLeft is given in seconds. */

// globals for time
var timer_vals = {
  'year': 0,
  'month': 0,
  'day': 0,
  'hour': 0,
  'minute': 0,
};

function formatTime(runningTimeLeft) {
  runningTimeLeft = Mathjs.bignumber(runningTimeLeft);
  // runningTimeLeft is in seconds
  if (runningTimeLeft < 0) {
    runningTimeLeft = 0;
    showTimeUnit('second', runningTimeLeft.toFixed(1));
  } else {
    var remainder = runningTimeLeft;
    console.log(remainder);
    if (timer_vals['month'] <= 0) {
      remainder = calculateTimeUnits(remainder, TIME_UNITS['year'], 'year');
      months = remainder;
    }
    if (timer_vals['day'] <= 0) {
      remainder = calculateTimeUnits(remainder, TIME_UNITS['month'], 'month');
      days = remainder;
    }
    if (timer_vals['hour'] <= 0) {
      remainder = calculateTimeUnits(remainder, TIME_UNITS['day'], 'day');
      hours = remainder;
    }
    if (timer_vals['minute'] <= 0) {
      remainder = calculateTimeUnits(remainder, TIME_UNITS['hour'], 'hour');
      minutes = remainder;
    }

    remainder = calculateTimeUnits(remainder, TIME_UNITS['minute'], 'minute');
    seconds = remainder;

    showTimeUnit('second', remainder.toFixed(1));
  }
}


function displayInitialtime(runTime) {
  remainder = runTime;
  for (var timeUnit in TIME_UNITS) {
    remainder = calculateTimeUnits(remainder, TIME_UNITS[timeUnit], timeUnit);
  }
  showTimeUnit('second', remainder.toFixed(1));
}


function calculateTimeUnits(seconds, secondsInUnitOfTime, unit) {
  var timeInGivenUnit = Math.floor(Mathjs.bignumber(Mathjs.divide(seconds, secondsInUnitOfTime)));
  timer_vals[unit] = timeInGivenUnit;
  showTimeUnit(unit, timeInGivenUnit);
  var remainder = Mathjs.bignumber(Mathjs.mod(seconds, secondsInUnitOfTime));
  return remainder;
}


/** Calculates how many seconds it will take for the algorithm to finish. */
function calculateRunningTime(cities) {
  factorialTemp = Mathjs.factorial(cities - 1);
  numPaths = Mathjs.divide(factorialTemp, 2);
  seconds = Mathjs.divide(numPaths, 10);

  return seconds;
}

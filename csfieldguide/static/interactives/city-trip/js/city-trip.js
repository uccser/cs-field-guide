// TODO: Make it a closed loop graph
// TODO: Some nodes are still half overlapping
// TODO: Rename all of the stupid variables I impulsively named

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

  slider.on('input', function() {
    newNumberOfCities = Number(slider.val());
    // elementsData = generateNodesAndEdgesData(nodes);
    nodes = Array.from(Array(newNumberOfCities), (x, index) => index + 1);
    addOrRemoveNodes(cy, layout, numberOfCities, newNumberOfCities);
    pths = generatePermutations(nodes);
    pwr = removeReversePaths(pths);
    yo = testPaths(cy, pwr, numberOfCities, newNumberOfCities);
    numberOfCities = newNumberOfCities;
    output.html(numberOfCities);
  });


  $('#start').click(function() {
    // numCitiesArray = [...Array(numberOfCities).keys()];
    // paths = generatePermutations(numCitiesArray);
    // pathsWithoutReversePaths = removeReversePaths(paths);
    // console.log(paths);
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


function addOrRemoveNodes(cy, layout, oldNumCities, newNumCities) {
  // what happens if difference is 0?
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


function refreshLayout(cy, layout) {
  layout.stop();
  layout = cy.elements().makeLayout({
    name: "random",
    avoidOverlap: true
  });
  layout.run();
}


// Below function needs modifying
// Shouldn't need to compare old nodes to new nodes as the nodes are static
// when comparing paths
function testPaths(cy, paths, oldNumCities, newNumCities) {
  oldEdgeConfig = new Set();
  newEdgeConfig = new Set();
  for (s = 0; s < oldNumCities; s++) {
    edgeIdee = cy.elements('edge')[s].data('id');
    // Edge IDs are saved like 'e12' so strip 'e'
    edgeIdeeStr = edgeIdee.substring(1);
    oldEdgeConfig.add(edgeIdeeStr);
  }

  for (t = 0; t < newNumCities - 1; t++) {
    path = paths[t].split(',');
    newEdgeID = path[t] + path[t+1];
    newEdgeConfig.add(newEdgeID);
  }
  console.log(oldEdgeConfig);
  console.log(newEdgeConfig);
  edgesToRemove = setDifference(oldEdgeConfig, newEdgeConfig);
  console.log(edgesToRemove);
  edgesToAdd = setDifference(newEdgeConfig, oldEdgeConfig);
  console.log(edgesToAdd);
  // TODO: Make remove edge and add edge functions outside of this function
  edgesToKeep = setDifference(oldEdgeConfig, edgesToRemove);
  var edgesToKeepStr = '';
  edgesToKeepArr = Array.from(edgesToKeep);
  for (var v = 0; v < edgesToKeepArr.length - 1; v++) {
    edgesToKeepStr += '#e' + edgesToKeepArr[v] + ', ';
  }
  edgesToKeepStr += '#e' + edgesToKeepArr[v];
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
// e.g if a = {1,2,3,4} and b = {5,4,3,2} this function would return {1}
function setDifference(a, b) {
  aMinusB = new Set([...a].filter(x => !b.has(x)));
  return aMinusB;
}

a = [1,2,3,4];
result = permutationsWithoutInverse(a);
console.log(result);

function permutationsWithoutInverse(cities) {
  var len = cities.length;
  var paths = [...itertools.permutations(cities)];
  console.log(paths);
  var pathsWithoutInverse = [];
  for (var z = 0; z < paths.length; z++) {
    path = paths[z];
    console.log(path[0]);
    console.log(path[len-1]);
    if (path[0] <= path[len-1]) {
      pathsWithoutInverse.push(path);
    }
  }
  return pathsWithoutInverse;
}


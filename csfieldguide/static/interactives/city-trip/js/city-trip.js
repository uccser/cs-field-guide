const cytoscape = require('cytoscape');

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
      name: 'grid',
      rows: 1
    }
  });

  var layout = cy.layout({
    name: 'random'
  });

  var gContainer = $('#cy');
  cy.mount(gContainer);

  slider.on('input', function() {
    newNumberOfCities = Number(slider.val());
    // nodes = Array.from(Array(numberOfCities), (x, index) => index + 1);
    // elementsData = generateNodesAndEdgesData(nodes);
    alterGraph(cy, layout, numberOfCities, newNumberOfCities)
    numberOfCities = newNumberOfCities;
    console.log(cy.elements());
    output.html(numberOfCities);
  });


  $('#start').click(function() {
    // numCitiesArray = [...Array(numberOfCities).keys()];
    // paths = generatePermutations(numCitiesArray);
    // pathsWithoutReversePaths = removeReversePaths(paths);
    // console.log(paths);
  });

  $('#generate-map').click(function () {
    layout.run()
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


function alterGraph(cy, layout, oldNumCities, newNumCities) {
  // what happens if difference is 0?
  // need to resize after nodes added
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
    }
  } else if (oldNumCities > newNumCities) {
    for (var n = 0; n < difference; n++) {
      nodeToRemove = cy.$('#' + (oldNumCities - n).toString());
      cy.remove( nodeToRemove );
    }
  }
  layout.run();
}


// below functions taken from 
// www.reddit.com/r/javascript/comments/5k270h/all_possible_routes_traveling_salesman_problem_in/
// Generates all possible paths between cities
function generatePermutations(Arr) {
  var permutations = [];
  var A = Arr.slice();

  function swap(a, b) {
    var tmp = A[a];
    A[a] = A[b];
    A[b] = tmp;
  }

  function generate(n, A) {
    if (n == 1) {
      permutations.push(A.slice());
      // have to update visually as each permutation created so user sees something (takes forever to compute for large numbers)
      // generate graph visualisation of path
      // calculate distance
      // check if shorter, update variable if so
    } else {
      for (var i = 0; i <= n-1; i++) {
        generate(n-1, A);
        swap(n % 2 == 0 ? i : 0, n-1);
      }
    }
  }
  generate(A.length, A);
  return permutations;
}


function removeReversePaths(perms) {
  var pathsWithoutReverse = [];
  var pathToTest;

  for (var j = 0; j < perms.length; j++) {
    pathToTest = perms[j];
    isReversePath = testForReversePath(pathToTest, pathsWithoutReverse);

    if (!isReversePath) {
      pathsWithoutReverse.push(pathToTest.toString());
    }
  }

  return pathsWithoutReverse;
}


function testForReversePath(path, pathsArray) {
  reversePath = path.slice().reverse();
  reversePathString = reversePath.toString();

  return pathsArray.indexOf(reversePathString) !== -1;
}

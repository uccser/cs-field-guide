const cytoscape = require('cytoscape');

$(document).ready(function() {
  var cy = cytoscape({
    container: $('#cy'),
    elements: [
      {
        data: { id: 'a' }
      },
      {
        data: { id: 'b' }
      },
      {
        data: { id: 'c' }
      },
      {
        data: { id: 'ab', source: 'a', target: 'b' }
      },
      {
        data: { id: 'bc', source: 'b', target: 'c' }
      }
    ],
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
  var slider = $('#num-cities');
  var output = $("#slider-text");
  var numberOfCities = Number(slider.val());
  output.html(numberOfCities);
  
  slider.on('input', function() {
    numberOfCities = Number(slider.val());
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

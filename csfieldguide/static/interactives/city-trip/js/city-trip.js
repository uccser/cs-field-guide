$(document).ready(function() {
  var slider = $('#num-cities');
  var output = $("#slider-text");
  numberOfCities = slider.val();
  output.html(numberOfCities);
  
  slider.on('input', function() {
    numberOfCities = slider.val();
    output.html(numberOfCities);
  });

  $('#generate-map').click(function() {
    generateMap(Number(numberOfCities));
  });
});



// below function taken from 
// www.reddit.com/r/javascript/comments/5k270h/all_possible_routes_traveling_salesman_problem_in/
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


function removeReverseDuplicates(perms) {
  var permsWithoutReverse = [];
  var pathToTest;

  for (var j = 0; j < perms.length; j++) {
    pathToTest = perms[j];
    isReverseDuplicate = testForDuplicate(pathToTest, permsWithoutReverse);

    if (!isReverseDuplicate) {
      permsWithoutReverse.push(pathToTest.toString());
    }
  }

  return permsWithoutReverse;
}


function testForDuplicate(path, pathsArray) {
  reversePath = path.slice().reverse();
  reversePathString = reversePath.toString();

  return pathsArray.indexOf(reversePathString) !== -1;
}


function generateMap(numCities) {
  console.log(numCities);
  pingu = [...Array(numCities).keys()];
  console.log(pingu);
  p = generatePermutations(pingu);
  console.log(p);
  noDups = removeReverseDuplicates(p);
  console.log(noDups);
}

// p = generatePermutations([1,2,3]);
// console.log(p);

// console.log(removeReverseDuplicates(p));

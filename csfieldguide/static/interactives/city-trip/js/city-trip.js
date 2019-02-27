$(document).ready(function() {
  var slider = $('#num-cities');
  var output = $("#slider-text");
  output.html(slider.val());
  
  slider.on('input', function() {
    output.html(slider.val());
  });
});



// below functions taken from 
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
  // permutations = removeReverseDuplicates(permutations);
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
  console.log(reversePath);
  reversePathString = reversePath.toString();

  return pathsArray.indexOf(reversePathString) !== -1;
}


p = generatePermutations([1,2,3]);
console.log(p);

console.log(removeReverseDuplicates(p));

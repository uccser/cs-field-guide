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
  return permutations;
}


function generateCityRoutes(cities) {
  var perms = generatePermutations(cities.slice(1));
  for (var i = 0; i < perms.length; i++) {
    perms[i].unshift(cities[0]);
    perms[i].push(cities[0]);
  }
  return perms;
}

console.log(generatePermutations([1,2,3]));
$(document).ready(function() {
  var slider = $('#num-cities');
  var output = $("#slider-text");
  output.innerHTML = slider.value;
  
  slider.oninput = function() {
    output.innerHTML = this.value;
  } 
});

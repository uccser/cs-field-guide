$(document).ready(function() {
  var slider = $('#num-cities');
  var output = $("#slider-text");
  output.html(slider.val());
  
  slider.on('input', function() {
    output.html(slider.val());
  });
});

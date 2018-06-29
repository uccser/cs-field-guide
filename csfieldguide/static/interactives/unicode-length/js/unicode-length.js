$(document).ready(function () {
  $("#interactive-unicode-length-button").on('click', function() {
    var text = $("#interactive-unicode-length-text").val();
    $("#interactive-unicode-length-utf8").html(bitLength(text, 8) + " bits");
    $("#interactive-unicode-length-utf16").html(bitLength(text, 16) + " bits");
    $("#interactive-unicode-length-utf32").html(text.length * 32 + " bits");
  });
});

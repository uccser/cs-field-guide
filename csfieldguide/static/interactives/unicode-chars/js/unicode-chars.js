require('string.fromcodepoint');

var $decimal = $("#interactive-unicode-chars-decimal");
var $char = $("#interactive-unicode-chars-char");
var $errorText = $("#interactive-unicode-chars-error");

$(document).ready(function() {
  $char.val('');
  $decimal.val('');
  $errorText.addClass("d-none");
});

$decimal.keypress(function(event) {
  if (/\d/.exec(String.fromCodePoint(event.keyCode)) == null) {
    return event.preventDefault();
  }
});

$decimal.keyup(function() {
  try {
    $errorText.addClass("d-none");
    return $char.val(String.fromCodePoint(Number($decimal.val())));
  } catch(err) {
    $char.val('');
    $errorText.removeClass("d-none");
  }
});

$char.keypress(function() {
  return $char.val($char.val()[$char.val().length]);
});

$char.keyup(function() {
  $errorText.addClass("d-none");
  return $decimal.val($char.val().codePointAt(0));
});

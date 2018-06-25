var $decimal = $("#interactive-unicode-chars-decimal");
var $char = $("#interactive-unicode-chars-char");

$decimal.keypress(function(event) {
  if (/\d/.exec(String.fromCodePoint(event.keyCode)) == null) {
    return event.preventDefault();
  }
});

$decimal.keyup(function() {
  return $char.val(String.fromCodePoint(Number($decimal.val())));
});

$char.keypress(function(event) {
  if (Array.from($char.val()).length !== 0) {
    return event.preventDefault();
  }
});

$char.keyup(function() {
  return $decimal.val($char.val().codePointAt(0));
});

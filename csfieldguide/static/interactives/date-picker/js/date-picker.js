$(document).ready(function(){
  setupYearSelect();

  $("#interactive-date-picker select").change(function() {
    var $message = $("#interactive-date-picker-feedback");
    var $day = $("#interactive-date-picker-day").val();
    var $month = $("#interactive-date-picker-month").val();
    var $year = $("#interactive-date-picker-year").val();
    var shortMonths = ["2","4","6","9","11"];

    if ($day == 31 && jQuery.inArray($month, shortMonths) != -1) {
      $message.removeClass("invisible");
    } else if ($month == 2 && $day == 30) {
      $message.removeClass("invisible");
    } else if ($month == 2 && $day == 29 && $year % 400 == 0) {
      $message.addClass("invisible");
    } else if ($month == 2 && $day == 29 && $year % 4 == 0) {
      $message.addClass("invisible");
    } else if ($month == 2 && $day == 29 && $year % 100 != 0) {
      $message.removeClass("invisible");
    } else {
      $message.addClass("invisible");
    }
  });
});

function setupYearSelect() {
  var maxYear = new Date().getFullYear(), years = [];
  var minYear = maxYear - 79;
  var selectYear = $("#interactive-date-picker-year");

  for (var i = maxYear; i >= minYear; i--) {
    selectYear.append($("<option>", {value: i, text: i}))
  }
}

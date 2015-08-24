$(document).ready(function(){
    setupYearSelect();

    $(".interactive-date-picker").change(function() {
          var $message = $("#interactive-date-picker-feedback");
          var $day = $("#interactive-date-picker-day").val();
          var $month = $("#interactive-date-picker-month").val();
          var $year = $("#interactive-date-picker-year").val();
          var shortMonths = ["2","4","6","9","11"];

          if ($day == 31 && jQuery.inArray($month, shortMonths) != -1) {
              $message.html("Do you realise that's not a real date?");
          } else if ($month == 2 && $day == 30) {
              $message.html("Do you realise that's not a real date?");
          } else if ($month == 2 && $day == 29 && $year % 400 == 0) {
              $message.html("<br>");
          } else if ($month == 2 && $day == 29 && $year % 4 == 0) {
              $message.html("<br>");
          } else if ($month == 2 && $day == 29 && $year % 100 != 0) {
              $message.html("Do you realise that's not a real date?");
          } else {
              $message.html("<br>");
          }
      });
});

function setupYearSelect() {
    var maxYear = new Date().getFullYear(), years = [],
        minYear = maxYear - 79,
        selectYear = $("#interactive-date-picker-year");

    for (var i = maxYear; i >= minYear; i--) {
        selectYear.append($("<option>", {value: i, text: i}))
    }
}

/**
 * Checksum number calculator
 * For use in CS Field Guide
 * Created by Hayley van Waas, University of Canterbury
 * Modified by Jack Morgan, University of Canterbury
 */


$(document).ready(function () {
   $("#interactive-checksum-calculator-multiply").click(function() {
     var $feedback = $("#interactive-checksum-calculator-multiply-feedback");
     var $controls = $("#interactive-checksum-calculator-calculation-controls");
     var $number_text = $("#interactive-checksum-calculator-number-input").val();
     var $multiplier_text = $("#interactive-checksum-calculator-multiplier-input").val();

     if ($number_text.length == 0 || $multiplier_text.length == 0) {
       $feedback.text(gettext("Boxes must not be empty!"));
       $controls.hide()
     } else if ($number_text.length > $multiplier_text.length) {
       $feedback.text(gettext("You have more numbers than multipliers! Check your checksum digit isn't included."));
       $controls.hide()
     } else if ($multiplier_text.length > $number_text.length) {
       $feedback.text(gettext("You have more multipliers than numbers!"));
       $controls.hide()
     } else {
       $feedback.text("");
       $controls.show()
       $("#interactive-checksum-calculator-calculation-controls").show();
       var digits = $.map($number_text.split(''), function(value){return parseInt(value, 10);});
       var multipliers = $.map($multiplier_text.split(''), function(value){return parseInt(value, 10);});
       var sums = [];
       for (var i = 0; i < digits.length; i++){
           sums.push(digits[i] * multipliers[i]);
       }
       var $target_div = $("#interactive-checksum-calculator-sums");
       $target_div.html("");
       for (var i = 0; i < sums.length; i++){
           $target_div.append($("<div>" + sums[i] + "</div>"));
       }
     }
   });

   // Responds to "Calculate" button click
   $("#interactive-checksum-calculator-calculate").click(function() {
     var $feedback = $("#interactive-checksum-calculator-sum-feedback");
     var $total = $("#interactive-checksum-calculator-total-input").val();
     var $mod = $("#interactive-checksum-calculator-modulo-input").val();
     var $result_elements = $("#interactive-checksum-calculator-result");
     if ($total.length == 0 || $mod.length == 0) {
       $feedback.text(gettext('Boxes must not be empty!'));
       $result_elements.hide()
     } else if ($total == 0 || $mod == 0) {
       $feedback.text(gettext("Numbers must not be 0!"));
       $result_elements.hide()
     } else {
       $feedback.text("");
       var remainder = $total % $mod;
       $("#interactive-checksum-calculator-remainder").val(remainder);
       $result_elements.show()
     }
   });

   // Responds to "Reset" button click
   $("#interactive-checksum-calculator-reset").click(function() {
     $("#interactive-checksum-calculator-number-input").val('');
     $("#interactive-checksum-calculator-multiplier-input").val('');
     $("#interactive-checksum-calculator-total-input").val('');
     $("#interactive-checksum-calculator-modulo-input").val('');
     $("#interactive-checksum-calculator-calculation-controls").hide()
     $("#interactive-checksum-calculator-result").hide()
     $("#interactive-checksum-calculator-sum-feedback").text('');
     $("#interactive-checksum-calculator-sums").html("");
   });
});

$(function() {
  $('.interactive-checksum-calculator-number-type').on('keydown', function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
})

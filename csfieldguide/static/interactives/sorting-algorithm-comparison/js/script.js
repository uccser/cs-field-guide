$(document).ready(function(){
	// Run the animations when the interactive is clicked
	$("#interactive-sorting-algorithm-comparison img").click(function () {
	  $('#sorting-algorithm-comparison-selection-sort').attr("src", $('#sorting-algorithm-comparison-selection-sort-animation').attr("src"));
	  $('#sorting-algorithm-comparison-quick-sort').attr("src", $('#sorting-algorithm-comparison-quick-sort-animation').attr("src"));
	});
});

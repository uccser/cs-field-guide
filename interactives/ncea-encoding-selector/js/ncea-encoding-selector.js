$(document).ready(function(){
  $('#interactive-ncea-encoding-selector').on('click', '.selectable-item', function(event) {
    $selectable_item = $(this);
    $selectable_item.toggleClass("selected");
  });
});

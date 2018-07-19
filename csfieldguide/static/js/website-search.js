require('multiple-select');

$(document).ready(function() {
  $('#models-filter').multipleSelect({
    selectAll: false,
    width: '100%',
    placeholder: "Show all types",
  });

  // Clear form button.
  $('#clear-form').click(function(){
    $('#id_q').val('');
    $('#models-filter').multipleSelect('uncheckAll');
  });
});

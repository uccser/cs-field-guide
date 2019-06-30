$(document).ready(function () {
  $('#interactive-action-menu').on('click', '.dropdown-item', function(event) {
    $('#interactive-action-menu-feedback').text($(this).data('feedback'));
  });
});

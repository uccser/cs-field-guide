$(document).ready(function () {
  $('#interactive-available-menu-items').on('click', '.dropdown-item', function(event) {
    alert($(this).data('feedback'));
  });
});

$(document).ready(function() {
  $('#submit').on('click', submit);
  $('#peek-selector').change(toggle);
  toggle();
});

/**
 * Attempts to open the Sorting Algorithms interactive in a new tab with user-selected parameters
 */
function submit() {
  var url = base;
  
  url += '?data=' + $('#data-selector').val();
  
  if ($('#peek-selector').is(':checked')) {
    url += '&peek=true';
  }

  window.open(url, '_blank'); // Attempt to open URL in a new tab.
}

/**
 * Toggles between showing the open and closed eye depending on whether the checkbox is checked
 */
function toggle() {
  if ($('#peek-selector').is(':checked')) {
    $('#eye-closed').addClass('d-none');
    $('#eye-open').removeClass('d-none');
  } else {
    $('#eye-open').addClass('d-none');
    $('#eye-closed').removeClass('d-none');
  }
}

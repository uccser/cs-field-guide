$(document).ready(function() {
   $('#submit').on('click', function() {
      var url = base;
      
      url += '?data=' + $('#data-selector').val();
      
      if ($('#peek-selector').is(':checked')) {
        url += '&peek=true';
      }

      window.open(url, '_blank'); // Attempt to open URL in a new tab.
   });
});

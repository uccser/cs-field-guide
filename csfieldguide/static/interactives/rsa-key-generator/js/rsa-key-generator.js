require('jsencrypt');

$(document).ready(function(){
    $("#interactive-rsa-key-generator-generate").click(function() {
      // Get key size
      var key_size = parseInt($('#interactive-rsa-key-generator-key-size').val());

      // Create keys
      var crypt = new JSEncrypt({default_key_size: key_size});
      crypt.getKey();
      $('#interactive-rsa-key-generator-public-key').val(removeHeaders(crypt.getPublicKey()));
      $('#interactive-rsa-key-generator-private-key').val(removeHeaders(crypt.getPrivateKey()));

      // Enable copy buttons for use
      $('.interactive-rsa-key-generator-button').removeClass("disabled");

      $('[data-toggle="tooltip"]').tooltip();
    });

    $("#interactive-rsa-key-generator-copy-public").click(function() {
      $('#interactive-rsa-key-generator-public-key').select();
      var popover_message = '';
      try {
        var successful = document.execCommand('copy');
        if (successful) {
          $('#interactive-rsa-key-generator-copy-public').trigger('copied', 'Public key copied');
        } else {
          $('#interactive-rsa-key-generator-copy-public').trigger('copied', 'Oops, unable to copy. Please copy manually.');
        }
      } catch (err) {
        $('#interactive-rsa-key-generator-copy-public').trigger('copied', 'Oops, unable to copy. Please copy manually.');
      }
    });

    $("#interactive-rsa-key-generator-copy-private").click(function() {
      $('#interactive-rsa-key-generator-private-key').select();
      var popover_message = '';
      try {
        var successful = document.execCommand('copy');
        if (successful) {
          $('#interactive-rsa-key-generator-copy-private').trigger('copied', 'Private key copied');
        } else {
          $('#interactive-rsa-key-generator-copy-private').trigger('copied', 'Oops, unable to copy. Please copy manually.');
        }
      } catch (err) {
        $('#interactive-rsa-key-generator-copy-private').trigger('copied', 'Oops, unable to copy. Please copy manually.');
      }
    });

    $('[data-toggle="tooltip"]').on('copied', function(event, message) {
      $(this).attr('title', message)
          .tooltip('_fixTitle')
          .tooltip('show')
          .attr('title', "Copy to Clipboard")
          .tooltip('_fixTitle');
    });
});

function removeHeaders(text) {
  var lines = text.split('\n');
  lines.splice(0, 1);
  lines.splice(-1, 1);
  return lines.join('\n');
}

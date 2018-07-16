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

      $('[data-toggle="popover"]').popover();
    });

    $("#interactive-rsa-key-generator-copy-public").click(function() {
      $('#interactive-rsa-key-generator-public-key').select();
      var popover_message = '';
      try {
        var successful = document.execCommand('copy');
        if (successful) {
          popover_message = 'Public key copied';
        } else {
          popover_message = 'Oops, unable to copy. Please copy manually.';
        }
      } catch (err) {
        popover_message = 'Oops, unable to copy';
      }

      $('#interactive-rsa-key-generator-copy-public').attr('data-content', popover_message);
    });

    $("#interactive-rsa-key-generator-copy-private").click(function() {
      $('#interactive-rsa-key-generator-private-key').select();
      var popover_message = '';
      try {
        var successful = document.execCommand('copy');
        if (successful) {
          popover_message = 'Private key copied';
        } else {
          popover_message = 'Oops, unable to copy. Please copy manually.';
        }
      } catch (err) {
        popover_message = 'Oops, unable to copy';
      }

      $('#interactive-rsa-key-generator-copy-private').attr('data-content', popover_message);
    });
});

function removeHeaders(text) {
  var lines = text.split('\n');
  lines.splice(0, 1);
  lines.splice(-1, 1);
  return lines.join('\n');
}

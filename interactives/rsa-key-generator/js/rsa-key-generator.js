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
      $('.interactive-rsa-key-generator-button').prop("disabled", false);
    });

    $("#interactive-rsa-key-generator-copy-public").click(function() {
      $('#interactive-rsa-key-generator-public-key').select();
      try {
        var successful = document.execCommand('copy');
        if (successful) {
          Materialize.toast('Public key copied', 2000);
        } else {
          Materialize.toast('Oops, unable to copy. Please copy manually.', 2000);
        }
      } catch (err) {
        Materialize.toast('Oops, unable to copy', 2000);
      }
    });

    $("#interactive-rsa-key-generator-copy-private").click(function() {
      $('#interactive-rsa-key-generator-private-key').select();
      try {
        var successful = document.execCommand('copy');
        if (successful) {
          Materialize.toast('Private key copied', 2000);
        } else {
          Materialize.toast('Oops, unable to copy. Please copy manually.', 2000);
        }
      } catch (err) {
        Materialize.toast('Oops, unable to copy', 2000);
      }
    });
});

function removeHeaders(text) {
  var lines = text.split('\n');
  lines.splice(0, 1);
  lines.splice(-1, 1);
  return lines.join('\n');
}

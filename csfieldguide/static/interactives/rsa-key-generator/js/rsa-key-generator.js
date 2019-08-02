const nodeRSA = require('node-rsa');

var TXT_COPY = gettext("Copy to clipboard");
var TXT_COPIED_PUBLIC = gettext("Public key copied");
var TXT_COPIED_PRIVATE = gettext("Private key copied");
var TXT_COPIED_FAIL = gettext("Oops, unable to copy. Please copy manually");

$(document).ready(function(){
  $('#interactive-rsa-key-generator-public-key').val("");
  $('#interactive-rsa-key-generator-private-key').val("");
  $('#interactive-rsa-key-generator-key-size').val('512');
  $('#interactive-rsa-key-generator-key-format').val('components');

    $("#interactive-rsa-key-generator-generate").click(function() {

      // Get key size
      var key_size = parseInt($('#interactive-rsa-key-generator-key-size').val());

      // Create keys
      var crypt = new nodeRSA();
      crypt.generateKeyPair(key_size);

      var format = $('#interactive-rsa-key-generator-key-format').val();
      if (format == 'components') {
        var components = crypt.exportKey('components-private-pem');
        $('#interactive-rsa-key-generator-public-key').val(formatPublicComponents(components));
        $('#interactive-rsa-key-generator-private-key').val(formatPrivateComponents(components));
      } else  if (format == 'pkcs1') {
        $('#interactive-rsa-key-generator-public-key').val(crypt.exportKey('pkcs1-public-pem'));
        $('#interactive-rsa-key-generator-private-key').val(crypt.exportKey('pkcs1-private-pem'));
      } else {
        $('#interactive-rsa-key-generator-public-key').val(crypt.exportKey('pkcs8-public-pem'));
        $('#interactive-rsa-key-generator-private-key').val(crypt.exportKey('pkcs8-private-pem'));
      }

      // Enable buttons for use
      $('.interactive-rsa-key-generator-button').removeClass("disabled").prop('disabled', false);

      $('[data-toggle="tooltip"]').tooltip();
    });

    $('#interactive-rsa-key-generator-copy-public').click(function() {
      $('#interactive-rsa-key-generator-public-key').select();
      try {
        var successful = document.execCommand('copy');
        if (successful) {
          $('#interactive-rsa-key-generator-copy-public').trigger('copied', TXT_COPIED_PUBLIC);
        } else {
          $('#interactive-rsa-key-generator-copy-public').trigger('copied', TXT_COPIED_FAIL);
        }
      } catch (err) {
        $('#interactive-rsa-key-generator-copy-public').trigger('copied', TXT_COPIED_FAIL);
      }
    });

    $('#interactive-rsa-key-generator-copy-private').click(function() {
      $('#interactive-rsa-key-generator-private-key').select();
      try {
        var successful = document.execCommand('copy');
        if (successful) {
          $('#interactive-rsa-key-generator-copy-private').trigger('copied', TXT_COPIED_PRIVATE);
        } else {
          $('#interactive-rsa-key-generator-copy-private').trigger('copied', TXT_COPIED_FAIL);
        }
      } catch (err) {
        $('#interactive-rsa-key-generator-copy-private').trigger('copied', TXT_COPIED_FAIL);
      }
    });

    $('[data-toggle="tooltip"]').on('copied', function(event, message) {
      $(this).attr('title', message)
          .tooltip('_fixTitle')
          .tooltip('show')
          .attr('title', TXT_COPY)
          .tooltip('_fixTitle');
    });
});

function formatPublicComponents(components) {
  var returnText = "e:\n"
                 + parseHex([components.e]) + "\n\n"
                 + "n:\n"
                 + parseHex(components.n);

  return returnText;
}

function formatPrivateComponents(components) {
  var returnText = "p:\n"
                 + parseHex(components.p) + "\n\n"
                 + "q:\n"
                 + parseHex(components.q) + "\n\n"
                 + "d:\n"
                 + parseHex(components.d);

  return returnText;
}

function parseHex(list) {
  var length = list.length;
  returnString = "";
  for (var i=0; i < length; i++) {
    returnString += list[i].toString(16);
  }
  return returnString.toUpperCase();
}

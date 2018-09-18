require('jsencrypt');

var RSAEncrypt = {};

$(document).ready(function(){
    if (getUrlParameter('mode') == 'decrypt') {
      setDecryptionText();
      RSAEncrypt.mode = 'decrypt';
    } else {
      RSAEncrypt.mode = 'encrypt';
    }

    $("#interactive-rsa-jsencrypt-process").click(function() {
      var crypt = new JSEncrypt();
      var input_text = $('#interactive-rsa-jsencrypt-input-text').val();
      if (RSAEncrypt.mode == 'encrypt') {
        crypt.setPublicKey($('#interactive-rsa-jsencrypt-key').val());
        var encrypted = crypt.encrypt(input_text);
        if (encrypted) {
          $('#interactive-rsa-jsencrypt-output-text').val(encrypted);
        } else {
          $('#interactive-rsa-jsencrypt-output-text').val(gettext('Error in encryption!'));
        }
      } else {
        crypt.setPrivateKey($('#interactive-rsa-jsencrypt-key').val());
        var decrypted = crypt.decrypt(input_text);
        if (decrypted) {
          $('#interactive-rsa-jsencrypt-output-text').val(decrypted);
        } else {
          $('#interactive-rsa-jsencrypt-output-text').val(gettext('Error in decryption!'));
        }
      }
    });
});

function setDecryptionText() {
  $('#interactive-rsa-jsencrypt-mode').text(gettext('Decrypter'));
  $('#interactive-rsa-jsencrypt-process').text(gettext('Decrypt'));
  $('#interactive-rsa-jsencrypt-input-type').text(gettext('Cipher'));
  $('#interactive-rsa-jsencrypt-output-type').text(gettext('Plain'));
};

// From jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

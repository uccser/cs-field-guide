var RSAEncrypt = {};

$(document).ready(function(){
    if (getUrlParameter('mode') == 'decrypt') {
      setDecryptionText();
      RSAEncrypt.mode = 'decrypt';
    } else {
      RSAEncrypt.mode = 'encrypt';
    }

    $("#interactive-rsa-no-padding-process").click(function() {
      var crypt = new JSEncrypt();
      var input_text = $('#interactive-rsa-no-padding-input-text').val();
      if (RSAEncrypt.mode == 'encrypt') {
        crypt.setPublicKey($('#interactive-rsa-no-padding-key').val());
        var encrypted = crypt.encrypt(input_text);
        if (encrypted) {
          $('#interactive-rsa-no-padding-output-text').val(encrypted);
        } else {
          $('#interactive-rsa-no-padding-output-text').val('Error in encryption!');
        }
      } else {
        crypt.setPrivateKey($('#interactive-rsa-no-padding-key').val());
        var decrypted = crypt.decrypt(input_text);
        if (decrypted) {
          $('#interactive-rsa-no-padding-output-text').val(decrypted);
        } else {
          $('#interactive-rsa-no-padding-output-text').val('Error in decryption!');
        }
      }
    });
});

function setDecryptionText() {
  $('#interactive-rsa-no-padding-mode').text('Decrypter');
  $('#interactive-rsa-no-padding-process').text('Decrypt');
  $('#interactive-rsa-no-padding-input-type').text('Cipher');
  $('#interactive-rsa-no-padding-output-type').text('Plain');
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

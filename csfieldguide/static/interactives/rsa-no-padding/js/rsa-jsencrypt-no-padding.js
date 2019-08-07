
var urlParameters = require('../../../js/third-party/url-parameters.js');
var RSAEncrypt = {};

$(document).ready(function(){
    if (urlParameters.getUrlParameter('mode') == 'decrypt') {
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
          $('#interactive-rsa-no-padding-output-text').val(gettext('Error in encryption!'));
        }
      } else {
        crypt.setPrivateKey($('#interactive-rsa-no-padding-key').val());
        var decrypted = crypt.decrypt(input_text);
        if (decrypted) {
          $('#interactive-rsa-no-padding-output-text').val(decrypted);
        } else {
          $('#interactive-rsa-no-padding-output-text').val(gettext('Error in decryption!'));
        }
      }
    });
});

function setDecryptionText() {
  $('#interactive-rsa-no-padding-mode').text(gettext('Decrypter'));
  $('#interactive-rsa-no-padding-process').text(gettext('Decrypt'));
  $('#interactive-rsa-no-padding-input-type').text(gettext('Cipher'));
  $('#interactive-rsa-no-padding-output-type').text(gettext('Plain'));
};

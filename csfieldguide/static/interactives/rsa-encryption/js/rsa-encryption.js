const nodeRSA = require('node-rsa');

var isPublicKey;
var isPkcs;
var isPadded;

var Key;
var Message;

var TXT_AUTOSWITCH_PKCS_PUBLIC = gettext("Detected a public PKCS key; mode and format scheme set appropriately.");
var TXT_AUTOSWITCH_PKCS_PRIVATE = gettext("Detected a private PKCS key; mode and format scheme set appropriately.");
var TXT_AUTOSWITCH_COMPONENTS_PUBLIC = gettext("Detected a public key in the components format; mode and format scheme set appropriately.");
var TXT_AUTOSWITCH_COMPONENTS_PRIVATE = gettext("Detected a private key in the components format; mode and format scheme set appropriately.");
var TXT_AUTOSWITCH_PUBLIC = gettext("Detected a public key, mode changed to public key encryption.");
var TXT_AUTOSWITCH_PRIVATE = gettext("Detected a private key, mode changed to private key encryption.");
var TXT_SUCCESS = gettext("Encryption successful!");
var TXT_KEY_ERROR = gettext("Detected a problem with the given key, ensure it is entered exactly as it was given.");

$(document).ready(function() {
  init();

  $('#rsa-encryption-key-type').change(interpretEncryptionType);
  $('#rsa-encryption-key-format').change(interpretEncryptionFormat);
  $('#rsa-encryption-key-padding').change(interpretEncryptionPadding);

  $('#rsa-encryption-components-box').on('paste', function() {
    $('#rsa-encryption-autoswitch-text').html("");
    // If we run this immediately it happens before the content is actually pasted
    setTimeout(interpretKeyComponents, 1);
  });
  $('#rsa-encryption-key').on('paste', function() {
    $('#rsa-encryption-autoswitch-text').html("");
    // If we run this immediately it happens before the content is actually pasted
    setTimeout(interpretKeyPkcs, 1);
  });

  $('#rsa-encryption-button').click(encrypt);


  // We only want users to paste content into the components box
  // Adapted from https://stackoverflow.com/a/2904944
  var ctrlDown = false;
  var ctrlKey = 17; // Windows
  var cmdKey = 91;  // Mac
  var vKey = 86;
  $('#rsa-encryption-components-box').keydown(function(e) {
    if (e.keyCode == ctrlKey || e.keyCode == cmdKey) {
      ctrlDown = true;
    } else if (!(ctrlDown && e.keyCode == vKey)) {
      e.preventDefault();
    }
  });
  $(document).keyup(function(e) {
    if (e.keyCode == ctrlKey || e.keyCode == cmdKey) {
      ctrlDown = false;
    }
  });
});

/**
 * Prepare the interactive as it should be on page load
 */
function init() {
  Key = "";
  Message = "";

  $('#rsa-encryption-components-box').val("");
  $('#rsa-encryption-key').val("");
  $('#rsa-encryption-autoswitch-text').html("");
  $('#rsa-encryption-status-text').html("");
  $('#rsa-encryption-plaintext').val("");
  $('#rsa-encryption-ciphertext').val("");
  $('#rsa-encryption-key-e').val("");
  $('#rsa-encryption-key-n').val("");
  $('#rsa-encryption-key-p').val("");
  $('#rsa-encryption-key-q').val("");
  $('#rsa-encryption-key-d').val("");

  $('#rsa-encryption-key-type').val('public');
  interpretEncryptionType();
  // Default to PKCS (even though the generator defaults to Components).
  // This is to reduce the complexity of what the user sees initially.
  // Mode errors are fixed automatically anyway
  $('#rsa-encryption-key-format').val('pkcs');
  interpretEncryptionFormat();
  $('#rsa-encryption-key-padding').val('padding');
  interpretEncryptionPadding();
}

//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--
                            // INTERFACE  LOGIC //
//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--
// (Mostly to auto-detect and fix mode errors)

/**
 * Decides whether to use Public or Private key encryption
 */
function interpretEncryptionType() {
  var wasPublicKey = isPublicKey;
  isPublicKey = $('#rsa-encryption-key-type').val() == 'public';
  if (wasPublicKey != isPublicKey) {
    changeEncryptionType();
  }
  $('#rsa-encryption-autoswitch-text').html("");
}

/**
 * Decides whether to interpret PKCS or Components key type
 */
function interpretEncryptionFormat() {
  var wasPkcs = isPkcs;
  isPkcs = $('#rsa-encryption-key-format').val() == 'pkcs';
  if (wasPkcs != isPkcs) {
    changeEncryptionFormat();
  }
  $('#rsa-encryption-autoswitch-text').html("");
}

/**
 * Decides whether or not to add padding to the encrypted message
 */
function interpretEncryptionPadding() {
  isPadded = $('#rsa-encryption-key-padding').val() == 'padding';
}

/**
 * Called when a change in the encryption type (Public or Private key encryption) is detected.
 * Replaces the variables used in the components scheme, no visible change for PKCS scheme
 */
function changeEncryptionType() {
  $('#rsa-encryption-key-e').val("");
  $('#rsa-encryption-key-n').val("");
  $('#rsa-encryption-key-p').val("");
  $('#rsa-encryption-key-q').val("");
  $('#rsa-encryption-key-d').val("");

  if (isPublicKey) {
    $('#rsa-encryption-private-key-components').addClass('d-none');
    $('#rsa-encryption-public-key-components').removeClass('d-none');
  } else {
    $('#rsa-encryption-public-key-components').addClass('d-none');
    $('#rsa-encryption-private-key-components').removeClass('d-none');
  }
}

/**
 * Called when a change in the encryption key format type (PKCS or Components) is detected.
 * Replaces the input boxes used for entering the key
 */
function changeEncryptionFormat() {
  $('#rsa-encryption-key-e').val("");
  $('#rsa-encryption-key-n').val("");
  $('#rsa-encryption-key-p').val("");
  $('#rsa-encryption-key-q').val("");
  $('#rsa-encryption-key-d').val("");
  $('#rsa-encryption-key').val("");

  if (isPkcs) {
    $('#rsa-encryption-key-components').addClass('d-none');
    $('#rsa-encryption-key').removeClass('d-none');
  } else {
    $('#rsa-encryption-key').addClass('d-none');
    $('#rsa-encryption-key-components').removeClass('d-none');
  }
}

/**
 * Interprets what was just pasted into the key components box
 * 
 * There is no reason to run this other than on a paste event - if the user wants
 * to type it out they can just do so into the individual component boxes.
 */
function interpretKeyComponents() {
  var pastedContent = $('#rsa-encryption-components-box').val().trim();
  $('#rsa-encryption-components-box').val("");
  if (pastedContent.startsWith('--')) {
    if (pastedContent.includes('PUBLIC')) {
      // Likely pasted a PUBLIC PKCS key
      $('#rsa-encryption-key-format').val('pkcs');
      interpretEncryptionFormat();
      $('#rsa-encryption-key-type').val('public');
      interpretEncryptionType();
      $('#rsa-encryption-autoswitch-text').html(TXT_AUTOSWITCH_PKCS_PUBLIC);
    } else {
      // Likely pasted a PRIVATE PKCS key
      $('#rsa-encryption-key-format').val('pkcs');
      interpretEncryptionFormat();
      $('#rsa-encryption-key-type').val('private');
      interpretEncryptionType();
      $('#rsa-encryption-autoswitch-text').html(TXT_AUTOSWITCH_PKCS_PRIVATE);
    }
    $('#rsa-encryption-key').val(pastedContent);
  } else {
    if (isPublicKey) {
      if (pastedContent.startsWith("p:")) {
        // Likely pasted a PRIVATE key
        $('#rsa-encryption-key-type').val('private');
        interpretEncryptionType();
        $('#rsa-encryption-autoswitch-text').html(TXT_AUTOSWITCH_PRIVATE);
        $('#rsa-encryption-components-box').val(pastedContent);
        setTimeout(interpretKeyComponents, 1); // Try again
      } else {
        parsePublicKeyComponents(pastedContent);
      }
    } else /* !isPublicKey */ {
      if (pastedContent.startsWith("e:")) {
        // Likely pasted a PUBLIC key
        $('#rsa-encryption-key-type').val('public');
        interpretEncryptionType();
        $('#rsa-encryption-autoswitch-text').html(TXT_AUTOSWITCH_PUBLIC);
        $('#rsa-encryption-components-box').val(pastedContent);
        setTimeout(interpretKeyComponents, 1); // Try again
      } else {
        parsePrivateKeyComponents(pastedContent);
      }
    }
  }
}

/**
 * Splits the given text and fills the component inputs appropriately.
 * TODO show a warning for a period if it fails in some way
 */
function parsePublicKeyComponents(text) {
  var textComponents = text.split('\n');
  var keyComponents = {};
  // The component is the text after the identifier
  keyComponents.e = textComponents[textComponents.indexOf("e:") + 1];
  keyComponents.n = textComponents[textComponents.indexOf("n:") + 1];

  $('#rsa-encryption-key-e').val(keyComponents.e);
  $('#rsa-encryption-key-n').val(keyComponents.n);
}

/**
 * Splits the given text and fills the component inputs appropriately.
 * TODO show a warning for a period if it fails in some way
 */
function parsePrivateKeyComponents(text) {
  var textComponents = text.split('\n');
  var keyComponents = {};
  // The component is the text after the identifier
  keyComponents.p = textComponents[textComponents.indexOf("p:") + 1];
  keyComponents.q = textComponents[textComponents.indexOf("q:") + 1];
  keyComponents.d = textComponents[textComponents.indexOf("d:") + 1];

  $('#rsa-encryption-key-p').val(keyComponents.p);
  $('#rsa-encryption-key-q').val(keyComponents.q);
  $('#rsa-encryption-key-d').val(keyComponents.d);
}

/**
 * Checks for and resolves any mode error
 * (pasted a Components key instead of PKCS, or a private/public key instead of public/private)
 */
function interpretKeyPkcs() {
  var pastedContent = $('#rsa-encryption-key').val().trim();
  if (pastedContent.startsWith("e:")) {
    // Likely pasted a PUBLIC Components key
    $('#rsa-encryption-key-format').val('components');
    interpretEncryptionFormat();
    $('#rsa-encryption-key-type').val('public');
    interpretEncryptionType();
    $('#rsa-encryption-components-box').val(pastedContent);
    interpretKeyComponents();
    $('#rsa-encryption-autoswitch-text').html(TXT_AUTOSWITCH_COMPONENTS_PUBLIC);
    $('#rsa-encryption-key').val("");
  } else if (pastedContent.startsWith("p:")) {
    // Likely pasted a PRIVATE Components key
    $('#rsa-encryption-key-format').val('components');
    interpretEncryptionFormat();
    $('#rsa-encryption-key-type').val('private');
    interpretEncryptionType();
    $('#rsa-encryption-components-box').val(pastedContent);
    interpretKeyComponents();
    $('#rsa-encryption-autoswitch-text').html(TXT_AUTOSWITCH_COMPONENTS_PRIVATE);
    $('#rsa-encryption-key').val("");
  } else if (!isPublicKey && pastedContent.includes("PUBLIC")) {
    // Likely pasted a PUBLIC key
    $('#rsa-encryption-key-type').val('public');
    interpretEncryptionType();
    $('#rsa-encryption-autoswitch-text').html(TXT_AUTOSWITCH_PUBLIC);
  } else if (isPublicKey && pastedContent.includes("PRIVATE")) {
    // Likely pasted a PRIVATE key
    $('#rsa-encryption-key-type').val('private');
    interpretEncryptionType();
    $('#rsa-encryption-autoswitch-text').html(TXT_AUTOSWITCH_PRIVATE);
  }
}

//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--
                            // ENCRYPTION LOGIC //
//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--

/**
 * Takes the text in the input box, encrypts it with the key and prints it to the output box
 */
function encrypt() {
  $('#rsa-encryption-status-text').html("");
  $('#rsa-encryption-autoswitch-text').html("");
  if (isPkcs) {
    // If the user typed in the key then the mode-error checking hasn't been done, so repeat just in case.
    interpretKeyPkcs();
  }
  // The previous statement could have changed this value so check again
  if (isPkcs) {
    try {
      Key = new nodeRSA($('#rsa-encryption-key').val().trim());
    } catch (error) {
      $('#rsa-encryption-status-text').html('<span class="text-danger">' + TXT_KEY_ERROR + '</span>');
      console.log(error);
      return;
    }
  } else {
    Key = new nodeRSA();
    var components = {};
    if (isPublicKey) {
      components.e = parseInt($('#rsa-encryption-key-e').val().trim(), 16),
      components.n = $('#rsa-encryption-key-n').val().trim().split(' ').join('').toLowerCase();
      Key.importKey({
        n: Buffer.from(components.n, 'hex'),
        e: components.e
      }, 'components-public');
    } else {
      components.p = $('#rsa-encryption-key-p').val().trim().split(' ').join('').toLowerCase();
      components.q = $('#rsa-encryption-key-q').val().trim().split(' ').join('').toLowerCase();
      components.d = $('#rsa-encryption-key-d').val().trim().split(' ').join('').toLowerCase();
      console.log(components.d);
      Key.importKey({
        d: Buffer.from(components.d, 'hex'),
        p: Buffer.from(components.p, 'hex'),
        q: Buffer.from(components.q, 'hex')
      }, 'components');
    }
    console.log(Key);
  }
  Message = $('#rsa-encryption-plaintext').val();
  if (isPadded) {
    // We can use the included JS library for encryption
    libraryEncrypt();
  } else {
    // We have to encrypt it manually
    manualEncrypt();
  }
}

/**
 * Encrypts the message using the included JS library, with appropriate padding
 */
function libraryEncrypt() {

}

/**
 * Encrypts the message using the RSA formula, without any additional padding
 */
function manualEncrypt() {

}

/**
 * Takes a string of space-separated hexadecimal numbers and returns a list of the integers it represents
 */
function parseHexNumbers(text) {
  var vals = text.trim().split(' ');
  for (var i=0; i < vals.length; i++) {
    vals[i] = parseInt(vals[i], 16);
  }
  return vals;
}

/**
 * This and rsa-encryption.js are nearly identical.
 * Ensure changes to this are made to that file also if appropriate
 */

const nodeRSA = require('node-rsa');
const constants = require('constants'); // native node.js module
// JS now supports big integers natively but not for more than a year (as at the time of writing)
const bigInt = require('big-integer');

var isPublicKey;
var isPkcs;
var isPadded;

var Key;
var Message;

var TXT_AUTOSWITCH_PKCS_PUBLIC = gettext("Detected a public PKCS key; mode and format scheme set appropriately.");
var TXT_AUTOSWITCH_PKCS_PRIVATE = gettext("Detected a private PKCS key; mode and format scheme set appropriately.");
var TXT_AUTOSWITCH_COMPONENTS_PUBLIC = gettext("Detected a public key in the components format; mode and format scheme set appropriately.");
var TXT_AUTOSWITCH_COMPONENTS_PRIVATE = gettext("Detected a private key in the components format; mode and format scheme set appropriately.");
var TXT_AUTOSWITCH_PUBLIC = gettext("Detected a public key, mode changed to public key decryption.");
var TXT_AUTOSWITCH_PRIVATE = gettext("Detected a private key, mode changed to private key decryption.");
var TXT_SUCCESS = gettext("Decryption successful!");
var TXT_KEY_ERROR = gettext("Detected a problem with the given key, ensure it is entered exactly as it was given.");
var TXT_P_ERROR = gettext("Detected a problem with the given 'p' component, ensure it is entered exactly as it was given.");
var TXT_Q_ERROR = gettext("Detected a problem with the given 'q' component, ensure it is entered exactly as it was given.");
var TXT_D_ERROR = gettext("Detected a problem with the given 'd' component, ensure it is entered exactly as it was given.");
var TXT_DECRYPT_ERROR = gettext("Decryption failed! There is a problem with the given key or data.");
var TXT_ERROR_UNKNOWN = gettext("Decryption failed! Cause unidentified.");

$(document).ready(function() {
  init();

  $('#rsa-decryption-key-type').change(interpretDecryptionType);
  $('#rsa-decryption-key-format').change(interpretDecryptionFormat);
  $('#rsa-decryption-key-padding').change(interpretDecryptionPadding);

  $('#rsa-decryption-components-box').on('paste', function() {
    $('#rsa-decryption-autoswitch-text').html("");
    // If we run this immediately it happens before the content is actually pasted
    setTimeout(interpretKeyComponents, 1);
  });
  $('#rsa-decryption-key').on('paste', function() {
    $('#rsa-decryption-autoswitch-text').html("");
    // If we run this immediately it happens before the content is actually pasted
    setTimeout(interpretKeyPkcs, 1);
  });

  $('#rsa-decryption-button').click(decrypt);


  // We only want users to paste content into the components box
  // Adapted from https://stackoverflow.com/a/2904944
  var ctrlDown = false;
  var ctrlKey = 17; // Windows
  var cmdKey = 91;  // Mac
  var vKey = 86;
  $('#rsa-decryption-components-box').keydown(function(e) {
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

  $('#rsa-decryption-components-box').val("");
  $('#rsa-decryption-key').val("");
  $('#rsa-decryption-autoswitch-text').html("");
  $('#rsa-decryption-status-text').html("");
  $('#rsa-decryption-ciphertext').val("");
  $('#rsa-decryption-plaintext').val("");
  $('#rsa-decryption-key-e').val("");
  $('#rsa-decryption-key-n').val("");
  $('#rsa-decryption-key-p').val("");
  $('#rsa-decryption-key-q').val("");
  $('#rsa-decryption-key-d').val("");

  $('#rsa-decryption-key-type').val('public');
  interpretDecryptionType();
  // Default to PKCS (even though the generator defaults to Components).
  // This is to reduce the complexity of what the user sees initially.
  // Mode errors are fixed automatically anyway
  $('#rsa-decryption-key-format').val('pkcs');
  interpretDecryptionFormat();
  $('#rsa-decryption-key-padding').val('padding');
  interpretDecryptionPadding();
}

//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--
                            // INTERFACE  LOGIC //
//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--
// (Mostly to auto-detect and fix mode errors)

/**
 * Decides whether to use Public or Private key decryption
 */
function interpretDecryptionType() {
  var wasPublicKey = isPublicKey;
  isPublicKey = $('#rsa-decryption-key-type').val() == 'public';
  if (wasPublicKey != isPublicKey) {
    changeDecryptionType();
  }
  $('#rsa-decryption-autoswitch-text').html("");
}

/**
 * Decides whether to interpret PKCS or Components key type
 */
function interpretDecryptionFormat() {
  var wasPkcs = isPkcs;
  isPkcs = $('#rsa-decryption-key-format').val() == 'pkcs';
  if (wasPkcs != isPkcs) {
    changeDecryptionFormat();
  }
  $('#rsa-decryption-autoswitch-text').html("");
}

/**
 * Decides whether or not to add padding to the decrypted message
 */
function interpretDecryptionPadding() {
  isPadded = $('#rsa-decryption-key-padding').val() == 'padding';
}

/**
 * Called when a change in the decryption type (Public or Private key decryption) is detected.
 * Replaces the variables used in the components scheme, no visible change for PKCS scheme
 */
function changeDecryptionType() {
  $('#rsa-decryption-key-e').val("");
  $('#rsa-decryption-key-n').val("");
  $('#rsa-decryption-key-p').val("");
  $('#rsa-decryption-key-q').val("");
  $('#rsa-decryption-key-d').val("");

  if (isPublicKey) {
    $('#rsa-decryption-private-key-components').addClass('d-none');
    $('#rsa-decryption-public-key-components').removeClass('d-none');
  } else {
    $('#rsa-decryption-public-key-components').addClass('d-none');
    $('#rsa-decryption-private-key-components').removeClass('d-none');
  }
}

/**
 * Called when a change in the decryption key format type (PKCS or Components) is detected.
 * Replaces the input boxes used for entering the key
 */
function changeDecryptionFormat() {
  $('#rsa-decryption-key-e').val("");
  $('#rsa-decryption-key-n').val("");
  $('#rsa-decryption-key-p').val("");
  $('#rsa-decryption-key-q').val("");
  $('#rsa-decryption-key-d').val("");
  $('#rsa-decryption-key').val("");

  if (isPkcs) {
    $('#rsa-decryption-key-components').addClass('d-none');
    $('#rsa-decryption-key').removeClass('d-none');
  } else {
    $('#rsa-decryption-key').addClass('d-none');
    $('#rsa-decryption-key-components').removeClass('d-none');
  }
}

/**
 * Interprets what was just pasted into the key components box
 * 
 * There is no reason to run this other than on a paste event - if the user wants
 * to type it out they can just do so into the individual component boxes.
 */
function interpretKeyComponents() {
  var pastedContent = $('#rsa-decryption-components-box').val().trim();
  $('#rsa-decryption-components-box').val("");
  if (pastedContent.startsWith('--')) {
    if (pastedContent.includes('PUBLIC')) {
      // Likely pasted a PUBLIC PKCS key
      $('#rsa-decryption-key-format').val('pkcs');
      interpretDecryptionFormat();
      $('#rsa-decryption-key-type').val('public');
      interpretDecryptionType();
      $('#rsa-decryption-autoswitch-text').html(TXT_AUTOSWITCH_PKCS_PUBLIC);
    } else {
      // Likely pasted a PRIVATE PKCS key
      $('#rsa-decryption-key-format').val('pkcs');
      interpretDecryptionFormat();
      $('#rsa-decryption-key-type').val('private');
      interpretDecryptionType();
      $('#rsa-decryption-autoswitch-text').html(TXT_AUTOSWITCH_PKCS_PRIVATE);
    }
    $('#rsa-decryption-key').val(pastedContent);
  } else {
    if (isPublicKey) {
      if (pastedContent.startsWith("p:")) {
        // Likely pasted a PRIVATE key
        $('#rsa-decryption-key-type').val('private');
        interpretDecryptionType();
        $('#rsa-decryption-autoswitch-text').html(TXT_AUTOSWITCH_PRIVATE);
        $('#rsa-decryption-components-box').val(pastedContent);
        setTimeout(interpretKeyComponents, 1); // Try again
      } else {
        parsePublicKeyComponents(pastedContent);
      }
    } else /* !isPublicKey */ {
      if (pastedContent.startsWith("e:")) {
        // Likely pasted a PUBLIC key
        $('#rsa-decryption-key-type').val('public');
        interpretDecryptionType();
        $('#rsa-decryption-autoswitch-text').html(TXT_AUTOSWITCH_PUBLIC);
        $('#rsa-decryption-components-box').val(pastedContent);
        setTimeout(interpretKeyComponents, 1); // Try again
      } else {
        parsePrivateKeyComponents(pastedContent);
      }
    }
  }
}

/**
 * Splits the given text and fills the component inputs appropriately.
 */
function parsePublicKeyComponents(text) {
  var textComponents = text.split('\n');
  var keyComponents = {};
  // The component is the text after the identifier
  keyComponents.e = textComponents[textComponents.indexOf("e:") + 1];
  keyComponents.n = textComponents[textComponents.indexOf("n:") + 1];

  $('#rsa-decryption-key-e').val(keyComponents.e);
  $('#rsa-decryption-key-n').val(keyComponents.n);
}

/**
 * Splits the given text and fills the component inputs appropriately.
 */
function parsePrivateKeyComponents(text) {
  var textComponents = text.split('\n');
  var keyComponents = {};
  // The component is the text after the identifier
  keyComponents.p = textComponents[textComponents.indexOf("p:") + 1];
  keyComponents.q = textComponents[textComponents.indexOf("q:") + 1];
  keyComponents.d = textComponents[textComponents.indexOf("d:") + 1];

  $('#rsa-decryption-key-p').val(keyComponents.p);
  $('#rsa-decryption-key-q').val(keyComponents.q);
  $('#rsa-decryption-key-d').val(keyComponents.d);
}

/**
 * Checks for and resolves any mode error
 * (entered a Components key instead of PKCS, or a private/public key instead of public/private)
 */
function interpretKeyPkcs() {
  var pastedContent = $('#rsa-decryption-key').val().trim();
  if (pastedContent.startsWith("e:")) {
    // Likely pasted a PUBLIC Components key
    $('#rsa-decryption-key-format').val('components');
    interpretDecryptionFormat();
    $('#rsa-decryption-key-type').val('public');
    interpretDecryptionType();
    $('#rsa-decryption-components-box').val(pastedContent);
    interpretKeyComponents();
    $('#rsa-decryption-autoswitch-text').html(TXT_AUTOSWITCH_COMPONENTS_PUBLIC);
    $('#rsa-decryption-key').val("");
  } else if (pastedContent.startsWith("p:")) {
    // Likely pasted a PRIVATE Components key
    $('#rsa-decryption-key-format').val('components');
    interpretDecryptionFormat();
    $('#rsa-decryption-key-type').val('private');
    interpretDecryptionType();
    $('#rsa-decryption-components-box').val(pastedContent);
    interpretKeyComponents();
    $('#rsa-decryption-autoswitch-text').html(TXT_AUTOSWITCH_COMPONENTS_PRIVATE);
    $('#rsa-decryption-key').val("");
  } else if (!isPublicKey && pastedContent.includes("PUBLIC")) {
    // Likely pasted a PUBLIC key
    $('#rsa-decryption-key-type').val('public');
    interpretDecryptionType();
    $('#rsa-decryption-autoswitch-text').html(TXT_AUTOSWITCH_PUBLIC);
  } else if (isPublicKey && pastedContent.includes("PRIVATE")) {
    // Likely pasted a PRIVATE key
    $('#rsa-decryption-key-type').val('private');
    interpretDecryptionType();
    $('#rsa-decryption-autoswitch-text').html(TXT_AUTOSWITCH_PRIVATE);
  }
}

//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--
                            // DECRYPTION LOGIC //
//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--

/**
 * Takes the text in the input box, decrypts it with the key and prints it to the output box
 */
function decrypt() {
  $('#rsa-decryption-status-text').html("");
  $('#rsa-decryption-autoswitch-text').html("");
  if (isPkcs) {
    // If the user typed in the key then the mode-error checking hasn't been done, so repeat just in case.
    interpretKeyPkcs();
  }
  // The previous statement could have changed this value so check again
  if (isPkcs) {
    try {
      Key = new nodeRSA($('#rsa-decryption-key').val().trim());
    } catch (error) {
      $('#rsa-decryption-status-text').html('<span class="text-danger">' + TXT_KEY_ERROR + '</span>');
      return;
    }
  } else {
    Key = new nodeRSA();
    var components = {};
    if (isPublicKey) {
      components.e = parseInt($('#rsa-decryption-key-e').val().trim(), 16),
      components.n = $('#rsa-decryption-key-n').val().trim().split(' ').join('').toLowerCase();
      try {
        Key.importKey({
          n: Buffer.from(components.n, 'hex'),
          e: components.e
        }, 'components-public');
      } catch (error) {
        $('#rsa-decryption-status-text').html('<span class="text-danger">' + TXT_KEY_ERROR + '</span>');
        return;
      }
    } else {
      try {
        components = getPrivateComponents();
      } catch (error) {
        if (error == "P_ERROR") {
          $('#rsa-decryption-status-text').html('<span class="text-danger">' + TXT_P_ERROR + '</span>');
        } else if (error == "Q_ERROR") {
          $('#rsa-decryption-status-text').html('<span class="text-danger">' + TXT_Q_ERROR + '</span>');
        } else if (error == "D_ERROR") {
          $('#rsa-decryption-status-text').html('<span class="text-danger">' + TXT_D_ERROR + '</span>');
        } else {
          $('#rsa-decryption-status-text').html('<span class="text-danger">' + TXT_ERROR_UNKNOWN + '</span>');
          console.log(error); // If the user is tech-savvy enough maybe they can see what's wrong themselves
        }
        return;
      }
      try {
        Key.importKey(components, 'components');
      } catch (error) {
        $('#rsa-decryption-status-text').html('<span class="text-danger">' + TXT_KEY_ERROR + '</span>');
        return;
      }
    }
  }
  Message = $('#rsa-decryption-ciphertext').val().trim();
  if (isPadded) {
    Key.setOptions({
      encryptionScheme: 'pkcs1'
    });
  } else {
    Key.setOptions({
      encryptionScheme: {
        scheme: 'pkcs1',
        padding: constants.RSA_NO_PADDING
      }
    });
  }
  libraryDecrypt();
}

/**
 * Returns a dictionary of the 8 required components to form a private key in our decryption library, in the format required by it:
 * [n, e, d, p, q, dmp1, dmq1, coeff]
 * d, p & q are entered by the user, e is left as default, the rest can be calculated.
 * Unsure if these calculated values get used at all during the process, as only d, p & q are required for decryption
 */
function getPrivateComponents() {
  // Data has had a lot of changes: Buffer(?) as string -> bigInt -> calculations -> string -> hex -> Buffer
  // There is no perceivable delay but the efficiency could be investigated further in future
  
  var defaultE = 65537; // TODO: calculate e also (we can't assume this is true for people who don't use the key generator)

  // User entered values
  var strP = $('#rsa-decryption-key-p').val().trim().split(' ').join('').toLowerCase();
  var strQ = $('#rsa-decryption-key-q').val().trim().split(' ').join('').toLowerCase();
  var strD = $('#rsa-decryption-key-d').val().trim().split(' ').join('').toLowerCase();

  // Error control
  try {
    var intP = new bigInt(strP, 16);
  } catch (error) {
    throw "P_ERROR";
  }
  try {
    var intQ = new bigInt(strQ, 16);
  } catch (error) {
    throw "Q_ERROR";
  }
  try {
    var intD = new bigInt(strD, 16);
  } catch (error) {
    throw "D_ERROR";
  }

  // Calculate remaining values
  var intN = intP.times(intQ);
  var intDmp1 = intD.mod(intP - 1);
  var intDmq1 = intD.mod(intQ - 1);
  var intCoeff = modInverse(intQ, intP);

  // Format appropriately for use
  components = {
    n: Buffer.from(intN.toString(16), 'hex'),
    e: defaultE,
    d: Buffer.from(strD, 'hex'),
    p: Buffer.from(strP, 'hex'),
    q: Buffer.from(strQ, 'hex'),
    dmp1: Buffer.from(intDmp1.toString(16), 'hex'),
    dmq1: Buffer.from(intDmq1.toString(16), 'hex'),
    coeff: Buffer.from(intCoeff.toString(16), 'hex')
  }

  return components;
}

/**
 * Decrypts the message using the included JS library, with appropriate padding.
 * Padding scheme is pkcs1 type (library limitation) or none - as defined by the user
 */
function libraryDecrypt() {
  var decryptedData;
  try {
    if (!isPkcs) {
      // Need to use base64 data for decryption
      Message = Buffer.from(Message, 'hex').toString('base64');
    }
    if (isPublicKey) {
      decryptedData = Key.decryptPublic(Message);
    } else {
      decryptedData = Key.decrypt(Message);
    }
    $('#rsa-decryption-plaintext').val(decryptedData);
    $('#rsa-decryption-status-text').html('<span class="text-success">' + TXT_SUCCESS + '</span>');
  } catch (error) {
    $('#rsa-decryption-status-text').html('<span class="text-danger">' + TXT_DECRYPT_ERROR + '</span>');
    return;
  }
}

//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--
                            //   OTHER  LOGIC   //
//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--//--
// (Functions copied from a third party)

/**
 * Calculates the modular multiplicative inverse of two values.
 * Copied directly from Dipu on stackoverflow: https://stackoverflow.com/a/51562038
 */
function modInverse(a, m) {
  // validate inputs
  [a, m] = [Number(a), Number(m)]
  if (Number.isNaN(a) || Number.isNaN(m)) {
    return NaN // invalid input
  }
  a = (a % m + m) % m
  if (!a || m < 2) {
    return NaN // invalid input
  }
  // find the gcd
  const s = []
  let b = m
  while(b) {
    [a, b] = [b, a % b]
    s.push({a, b})
  }
  if (a !== 1) {
    return NaN // inverse does not exist
  }
  // find the inverse
  let x = 1
  let y = 0
  for(let i = s.length - 2; i >= 0; --i) {
    [x, y] = [y,  x - y * Math.floor(s[i].a / s[i].b)]
  }
  return (y % m + m) % m
}

/**
 * Module for all the passwords used in Password Guesser.
 * 
 * Passwords are stored in dictionaries of lists, where each list is two or three items:
 * [the password or encryption , salt [, encryption with salt]]
 * The id of each password is a person's name
 * 
 * Language-specific passwords are stored as plaintext and encrypted at runtime
 * The remainder are encrypted in advance
 */

/**
 * Passwords that are language specific
 * stored as plaintext
 * 
 * Medium difficulty
 */
var LanguagePasswords = {
  a: [gettext("Maths")],
  b: [gettext("History")],
  c: [gettext("Chemistry")],
  d: [gettext("Art")],
};

/**
 * Passwords that are one specific sequence of characters
 * encrypted in advance
 * 
 * Easy-medium difficulty
 */
var WordPasswords = {
  a: ["5994471ABB01112AFCC18159F6CC74B4F511B99806DA59B3CAF5A9C173CACFC5", "469D78373399A5A3", "BEE193B127243F10B719707205236F5CABCAF4FC79F1E44DC07E6D9440237BB0"], // 12345
  a: ["5994471ABB01112AFCC18159F6CC74B4F511B99806DA59B3CAF5A9C173CACFC5", "D7C1CF8AA07427A5", "50572ED876DF1DF49296CEA5CB8EACD4AFC06C28F196F329098EB7019A164088"], // 12345
  a: ["65E84BE33532FB784C48129675F9EFF3A682B27168C0EA744B2CF58EE02337C5", ], // qwerty
  a: ["04F8996DA763B7A969B1028EE3007569EAF3A635486DDAB211D512C85B9DF8FB", ], // user
  b: ["8C6976E5B5410415BDE908BD4DEE15DFB167A9C873FC4BB8A81F6F2AB448A918", ], // admin
  c: ["97C94EBE5D767A353B77F3C0CE2D429741F2E8C99473C3C150E2FAA3D14C9DA6", ], // Pa$$w0rd
  c: ["B5C5FA751BFE75D18F266DBB7C11C4EC5A3A4E788AB64217821FB490642488B3", ], // H0m3wOr/
  d: ["2F3F3C491C80D04480C6FDDF8BC6E1BCB6E93A22FE542E688F5C61563C0E9A97", ], // 0xC0FFEE
};

/**
 * Passwords that are specific groups of words
 * encrypted in advance
 * 
 * Hard difficulty
 */
var SentencePasswords = {
  a: ["676284665E1B7D1AF201B10AF48322C871F6AF9BFDBF5ED968623A7D3D329D6F", "6B98DF3661AA993E", "440DD0452F2AB97B5C7CB8EBF9FB21282D74C29AFFE01DA536C34E371AED741F"], // Ireallylikebread
};

module.exports = {
  LanguagePasswords,
  WordPasswords,
  SentencePasswords,
};